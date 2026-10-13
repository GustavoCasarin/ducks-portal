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

O dashboard do aluno é um protótipo de interface com dados de demonstração definidos em `components/DashboardAluno.tsx`. Banco de dados, autenticação, API e painel do professor ainda não foram integrados.

## Próximos passos sugeridos

1. Construir as telas e navegação de Trilha, Passaporte e Aulas.
2. Definir regras de acesso para responsáveis, professores e administradores.
3. Integrar Prisma e PostgreSQL/Supabase.
4. Implementar autenticação e substituir os dados de demonstração por dados reais.
