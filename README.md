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

As quatro rotas do portal (`/`, `/trilha`, `/passaporte`, `/aulas`) têm navegação funcional. Os dados compartilhados de demonstração ficam em `lib/alunoDemo.ts`; as telas de Trilha, Passaporte e Aulas ainda são protótipos sem registros reais. Banco de dados, autenticação, API e painel do professor ainda não foram integrados.

## Próximos passos sugeridos

1. Definir e implementar regras de acesso para responsáveis, professores e administradores.
2. Integrar Prisma e PostgreSQL/Supabase.
3. Implementar autenticação e substituir os dados de demonstração por dados reais.
4. Cadastrar missões, calendário e carimbos oficiais do método.
