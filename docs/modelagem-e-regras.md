# Ducks BJJ — modelagem e regras propostas (rascunho)

Este documento descreve **uma proposta técnica**, ainda sujeita à aprovação do método pedagógico Ducks. Nenhuma migração ou conexão com banco foi executada.

## Fluxo do MVP

1. Um `Usuario` autenticado pelo Supabase recebe papel `RESPONSAVEL`, `PROFESSOR` ou `ADMIN`. Seu `authUserId` corresponde ao ID de `auth.users` (sem senha no Prisma).
2. Responsáveis acessam somente alunos vinculados por `VinculoResponsavel`.
3. Professores acessam apenas turmas vinculadas por `ProfessorTurma`, seus alunos matriculados e aulas autorizadas.
4. `Aula` contém data, turma e conteúdo pedagógico do dia. `Presenca` é única por (`aulaId`, `alunoId`); chamada múltipla deve usar transação/`upsert` no backend.
5. O carimbo do passaporte é uma conquista de aluno vinculada à aula e ao conteúdo (`ConquistaPassaporte`). Não duplicar carimbos da mesma aula e conteúdo.
6. `AvaliacaoPMA` mantém as quatro notas e os três resultados. O backend recalcula os resultados antes de persistir e verifica o acesso do professor.
7. `MissaoTrilha` define as 27 casas por programa; `ProgressoMissao` registra o avanço do aluno.
8. `ProgressoGraus` guarda os quatro percentuais e a versão da regra aplicada. Não é fonte de verdade isolada; frequência precisa ser derivada das aulas válidas.

## Regras provisórias que precisam de validação

- Notas de `Atenção`, `Disciplina`, `Respeito` e `Técnica`: inteiros entre 1 e 10. A aplicação deve rejeitar valores fora desse intervalo tanto no cliente quanto no servidor.
- **PMA comportamental** = média de Atenção, Disciplina e Respeito.
- **PMA técnico** = nota Técnica.
- **PMA geral** = média entre PMA comportamental não arredondado e PMA técnico (arredondada para 2 casas decimais).
- A frequência não entra no PMA demonstrativo. O denominador oficial (aulas previstas, reposições, justificativas, matrículas parciais) ainda precisa ser definido.
- Os critérios para transformar notas em Graus Coloridos, para concluir uma casa e para troca de faixa **não estão definidos**: não adotar fórmulas arbitrárias em produção.
- Como são 27 casas por programa, certificar se Kids 01 e Kids 02 compartilham missões antes de alimentar o banco.

## Segurança e dados de crianças

- O painel em `/professor` **não possui autenticação** e não pode receber dados reais nem ser publicado como painel utilizável antes da proteção por sessão, papel e autorização de turma/aluno.
- Não usar usuários, e-mails, nomes de alunos ou documentos reais em `lib/*Demo.ts`.
- Nunca enviar `service_role`, senha, token ou `DATABASE_URL` ao cliente; variáveis secretas ficam apenas no servidor.
- As políticas RLS, validação do professor/responsável no servidor, gestão de consentimento/responsáveis, retenção e finalidade LGPD devem ser estabelecidas antes de produção.
- No PostgreSQL, considerar índices adicionais e `CHECK` constraints para intervalos `[0,100]` e `[1,10]`, pois os tipos Prisma `Int` não os asseguram.

## Próxima integração

1. Validar essas regras com a Ducks.
2. Criar o projeto Supabase e configurar `.env.local` (não versionado).
3. Instalar versões compatíveis do Prisma Client/CLI; validar `prisma/schema.prisma` e gerar migração inicial em ambiente **de desenvolvimento**.
4. Implementar autenticação e autorização *antes* de expor dados reais ou permitir persistência.
5. Criar Server Actions/API com verificação de permissões e transações para chamada, carimbos e PMA.
6. Conectar as telas do professor e dos responsáveis a consultas autenticadas.
