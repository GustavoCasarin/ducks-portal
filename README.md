# Ducks BJJ Portal — A Jornada do Guerreiro

Portal mobile-first para acompanhar a evolução técnica e comportamental dos alunos da Ducks Jiu-Jitsu.

## Tecnologias

- Next.js com App Router
- React e TypeScript
- Tailwind CSS 4
- Lucide React

## Requisitos

- Node.js compatível com a versão do Next.js definida em `package.json`
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000 no navegador.

## Verificações

```bash
npm run lint
npm run build
```

## Estado atual

As quatro rotas do portal (`/`, `/jornada`, `/passaporte`, `/aulas`) têm navegação funcional. A antiga `/trilha` redireciona para `/jornada`. A Jornada mostra os Módulos 1 e 2 e as missões oficiais 1 a 8 do Notion, com resumos para os pais. Módulos 3 e 4 aparecem como *Em desenvolvimento*.

A missão atual é definida por **turma** em `/professor/jornada` e aparece em `/jornada` e no Dashboard do Aluno. Esta integração é somente demonstrativa via `localStorage`, no mesmo navegador e origem. Banco de dados, autenticação e API ainda **não** estão integrados.

## Próximos passos sugeridos

1. Definir e implementar regras de acesso para responsáveis, professores e administradores.
2. Integrar Prisma e PostgreSQL/Supabase.
3. Implementar autenticação e substituir os dados de demonstração por dados reais.
4. Cadastrar missões, calendário e carimbos oficiais do método.

## Painel do Professor — demonstração

Acesse **`/professor`** (ou o link no rodapé do dashboard) para testar:

- Seleção de turma Kids 01 / Kids 02.
- Chamada em lote: marcar todos presentes, desmarcar faltantes e concluir uma prévia.
- Seleção de conteúdo/carimbo do dia para os presentes.
- Avaliação PMA mensal com quatro sliders e cálculo demonstrativo.

**Importante:** o painel utiliza exclusivamente dados fictícios em `lib/professorDemo.ts`. Seu estado existe **somente na memória do navegador**, desaparece após recarregar a página e não é enviado aos responsáveis. A rota ainda é pública e precisa de autenticação/autorização antes de utilizar dados reais.

O arquivo `prisma/schema.prisma` e o documento `docs/modelagem-e-regras.md` são **propostas de modelagem**, ainda não aplicadas a banco algum. Os pesos do PMA e os critérios de progressão precisam ser confirmados com a Ducks antes da implementação do backend.

## Proposta pedagógica validada (protótipo)

Conforme explicação dos professores da Ducks, os módulos costumam ter **4 missões de 2 aulas**. As **27 casas são habilidades**; uma **estrela significa presença** em aula realizada que trabalhou a habilidade, nunca domínio técnico. Veja [regras do método](docs/metodo-ducks-validado.md).

- `/professor/planejamento` — banco fictício de dinâmicas e planejamento semanal, com estados planejada/realizada/cancelada e histórico local por turma.
- `/jornada` — catálogo curricular e indicação de missão atual da turma (sem estrelas, aprovação ou progresso individual).
- `/professor/jornada` — professor escolhe módulo e missão atuais da turma, com persistência local para demonstração.
- `/trilha` — redirecionamento para o novo menu.
- `/professor/planejamento` — o Banco de Dinâmicas agora oferece as mesmas missões oficiais publicadas.
- `prisma/schema.prisma` — **proposta revisada**, ainda sem migrações ou conexão real.

**Nunca cadastrar alunos reais nesse protótipo público.** O planejamento está somente no `localStorage` deste navegador e não sincroniza com o painel de chamadas. Para implementar isso no servidor serão necessários Supabase Auth, autorizações e validação da academia.

### Testes das regras

```bash
npm run test:logic
```

O teste de lógica utiliza o suporte a TypeScript do Node.js 22+. Para instalar/rodar o projeto normalmente, seguem válidos os requisitos oficiais do Next.js.

### Currículo da Jornada — Módulos e Missões

O currículo oficial do Notion é compartilhado por Kids 01 e Kids 02. Apenas os **Módulos 1 e 2** estão publicados no protótipo: os módulos 3 e 4 já possuem rascunhos no Notion, mas **não** são apresentados como conteúdo final.

| Módulo | Tema | Missões |
|---|---|---|
| 1 | Postura no Tatame | 1: O Mergulho da Águia; 2: O Pulo do Gato; 3: O Peso do Elefante; 4: O Trono do Leão |
| 2 | Do Controle para as Costas | 5: O Amasso do Touro Sentado; 6: A Armadilha do Macaco; 7: O Giro do Tatu; 8: O Abraço do Polvo |

Fonte: [Ducks Jiu-Jitsu no Notion](https://app.notion.com/p/22a20685058c820f9a668142894202af). Os nomes, temas e objetivos pedagógicos vieram dos bancos do Notion. Os resumos familiares foram **adaptados em linguagem acessível** e devem ser revisados pela academia antes da produção.

A antiga Trilha das 27 Casas e seu catálogo permanecem em `lib/catalogoTrilhas.ts` e `docs/catalogo-27-casas.md` somente como referência histórica; não são o menu do MVP. A casa 12 é **4 apoios** para os dois programas.

### Futuro backend

`prisma/schema.prisma` é uma **proposta**, não uma migração aplicada. A relação `Turma.missaoAtualId` permitirá que pais vejam o planejamento da turma matriculada, respeitando permissões de responsáveis e professores. Não armazenar dados reais no protótipo público.
