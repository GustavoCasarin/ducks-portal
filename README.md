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

As quatro rotas do portal (`/`, `/trilha`, `/passaporte`, `/aulas`) têm navegação funcional. Os dados compartilhados de demonstração ficam em `lib/alunoDemo.ts`; as telas de Trilha, Passaporte e Aulas ainda são protótipos sem registros reais. Banco de dados, autenticação e API ainda não estão integrados. O Painel do Professor já existe como demonstração isolada.

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
- `/trilha` — demonstração das 27 casas com estrelas calculadas a partir de presenças fictícias.
- `prisma/schema.prisma` — **proposta revisada**, ainda sem migrações ou conexão real.

**Nunca cadastrar alunos reais nesse protótipo público.** O planejamento está somente no `localStorage` deste navegador e não sincroniza com o painel de chamadas. Para implementar isso no servidor serão necessários Supabase Auth, autorizações e validação da academia.

### Testes das regras

```bash
npm run test:logic
```

O teste de lógica utiliza o suporte a TypeScript do Node.js 22+. Para instalar/rodar o projeto normalmente, seguem válidos os requisitos oficiais do Next.js.

### Catálogo das 27 casas (Kids 01 e Kids 02)

Os nomes oficiais e marcos após as casas **04, 09, 14, 23 e 27** estão em [`docs/catalogo-27-casas.md`](docs/catalogo-27-casas.md) e `lib/catalogoTrilhas.ts`. A casa **12** é *Vapores* em Kids 01 e *4 apoios* em Kids 02; Atenção e Respeito aparecem em posições invertidas. A página `/trilha` permite pré-visualizar ambos os currículos, sem atribuir ao aluno demonstrativo a frequência de outro programa. As estrelinhas são contagens fictícias de **presença**, sem concessão automática de grau ou faixa.
