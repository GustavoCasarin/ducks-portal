# Entrega demonstrativa: Histórico PMA + Aula de Hoje

**Status:** protótipo local, com dados inteiramente fictícios. Acesso público, sem login. Não cadastrar alunos reais.

## Motivação e decisões

1. O Termômetro PMA sozinho mostra apenas uma nota; o relatório mensal ajuda pais a comparar avaliações anteriores e ver quatro indicadores (Atenção, Disciplina, Respeito e Técnica).
2. O professor precisa completar a aula em poucos toques. A tela `/professor` agora centraliza chamada, confirmação de dinâmica e carimbo, nessa ordem.
3. O PMA mensal continua em `/professor/avaliacoes`, separado da operação diária. Não acrescenta tarefa a cada aula.
4. O currículo é o mesmo para Kids 01 e Kids 02, e a missão atual continua sendo **da turma**, nunca um indicador de conclusão individual.
5. Concessões de graus, troca de faixa e PMA têm critérios **provisórios**; o histórico não equivale a uma comprovação de domínio ou evolução clínica/educacional.

## Páginas

- `/professor`: Aula de Hoje. Selecionar turma e data, marcar todos presentes, alterar faltantes, salvar chamada, confirmar dinâmica planejada, lançar carimbo aos presentes.
- `/professor/avaliacoes`: selecionar turma, aluno e competência (mês); atribuir 4 notas de 1 a 10; salvar observação opcional de até 280 caracteres. Um registro por aluno e competência; atualizar exige confirmação.
- `/evolucao`: dados da demonstração do aluno fictício, gráfico mensal de PMA Geral, Técnico ou Comportamental, comparação com o mês anterior e detalhamento de notas e observação.
- `/`: Termômetro PMA mostra o último registro demonstrativo e link para o histórico. O antigo card percentual de Graus Coloridos foi substituído por **Meu Treinamento**, com frequência mensal derivada das chamadas demonstrativas.
- `/aulas`: histórico de presença com percentual **apenas das aulas lançadas nesta demonstração**, separado do Grau Verde oficial.
- `/passaporte`: carimbos fictícios ligados às aulas nas quais o aluno demonstrativo estava presente.
- `/professor/planejamento`: mesma lista de dinâmicas/planejamento do MVP anterior. A Aula de Hoje confirma um plano escolhido para a missão atual; é possível concluir a chamada sem dinâmica.

## Fonte de verdade temporária

- `lib/registrosDemo.ts` mantém **funções puras** e um histórico inicial **100% inventado** para demonstrar os gráficos (julho a outubro de 2026, aluno fictício `a1`).
- `lib/registros-store.ts` usa `localStorage` e `useSyncExternalStore` para compartilhar estado entre telas e abas da mesma origem; não existe servidor, login ou sincronização entre navegadores.
- `lib/planejamento-store.ts` continua sendo o armazenamento de exemplo para planos e dinâmicas; `lib/jornada-turma-store.ts` é a missão atual da turma. Esses armazenamentos continuam separados do PMA e das chamadas reais até a integração ao banco.

## Regras demonstrativas relevantes

- Chamada exige status de **todos** os alunos cadastrados na turma; chave única `turmaId + data` evita duplicar a mesma aula.
- Se o professor corrige presenças da aula, carimbos anteriores são invalidados até nova confirmação. Nenhum aluno ausente recebe carimbo.
- Uma dinâmica planejada é marcada como realizada somente quando confirmada; não é removida do catálogo. O registro da aula referencia o plano realizado.
- Avaliação mensal é única por `alunoId + competencia`. Substituição da prévia do mesmo mês não duplica ponto no gráfico; em produção será exigido histórico/auditoria de correções.
- Cálculo provisório: Comportamental = média de Atenção, Disciplina e Respeito; Técnico = nota técnica; Geral = média não arredondada do Comportamental e Técnico. Esta fórmula NÃO foi homologada pela Ducks.
- Diferenças numéricas mensais são informativas; notas menores não significam necessariamente regressão da criança.

## Teste manual antes do Pull Request

1. Rode `npm run test:logic`, `npm run lint`, `npx tsc --noEmit`, `npm run build` (o build pode precisar do compilador SWC para o SO).
2. Em `/professor/jornada`, escolha a Missão 7 para Kids 01. No Banco de Dinâmicas, planeje uma atividade nessa missão.
3. Abra `/professor`, mantenha a turma Kids 01 e a data de hoje, marque todos presentes, altere um como falta e salve.
4. Confirme a dinâmica planejada e lance um carimbo do dia. Veja `/aulas` e `/passaporte` para o aluno fictício `a1` no **mesmo navegador**.
5. Volte ao professor, corrija a chamada para deixar `a1` como ausente; os carimbos da aula devem ser apagados até nova confirmação.
6. Em `/professor/avaliacoes`, selecione `Joãozinho Casarin` e o mês corrente, modifique notas e salve; confira `/evolucao` e o Termômetro PMA em `/`.
7. Volte e atualize o mesmo mês, confirmando que o histórico mostra somente um registro nessa competência.

## Antes de conectar o Supabase

- Exigir login por sessão e autorização **no servidor** por papel, turma e vínculo de responsável; seguir LGPD (crianças), consentimento/base legal e retenção mínima.
- Revisar as regras e pesos PMA com a academia, versionar a regra e auditar toda alteração de nota.
- Usar transações para chamada/carimbos, garantir idempotência e isolamento entre turmas e alunos.
- Homologar tipos de carimbo e critérios de frequência antes de exibir indicadores oficiais.
- Implementar a integração com Prisma + PostgreSQL, rodar migrações apenas no ambiente correto e validar as regras com testes reais de permissão.
