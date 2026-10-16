# Minha Jornada — alteração de escopo do MVP

**Fonte pedagógica:** Notion da Ducks Jiu-Jitsu (bancos `Módulos` e `Missões`, consultados em 16/10/2026).

## Decisões validadas com a academia

1. O antigo menu das **27 casas** deixa de ser a experiência dos pais. A rota `/trilha` redireciona para `/jornada`.
2. O responsável consulta a descrição de cada módulo e missão, incluindo o tema e o objetivo pedagógico em linguagem acessível.
3. A única informação de andamento no MVP é **qual missão e módulo a turma está trabalhando**. Não há aprovação ou conclusão individual nessa tela.
4. Kids 01 e Kids 02 compartilham o **mesmo currículo de módulos e missões**. O professor adapta como trabalha a técnica no tatame; não duplicar missões por programa.
5. Cada módulo tem quatro missões semanais, geralmente duas aulas por missão.
6. Somente os Módulos 1 e 2 estão considerados completos para publicação. Os módulos 3 e 4 existem como rascunhos no Notion, mas aparecem apenas com a indicação `Em desenvolvimento`.

## Catálogo da versão demonstrativa

| Módulo | Título | Missões |
|---|---|---|
| 1 | Postura no Tatame | 1 O Mergulho da Águia; 2 O Pulo do Gato; 3 O Peso do Elefante; 4 O Trono do Leão |
| 2 | Do Controle para as Costas | 5 O Amasso do Touro Sentado; 6 A Armadilha do Macaco; 7 O Giro do Tatu; 8 O Abraço do Polvo |

`lib/catalogoJornada.ts` possui o conteúdo dos módulos, temas, objetivos e resumos familiares. **Os títulos, temas e objetivos pedagógicos são do Notion.** As frases para os pais são resumos editados a partir desses campos e precisam de revisão final pela academia.

## Demonstração operacional

1. Acesse `/professor/jornada` e selecione a turma fictícia.
2. Escolha um dos módulos e uma missão, depois clique em **Definir missão da turma**.
3. Acesse `/jornada` ou `/` no **mesmo navegador** para conferir a atualização para o aluno fictício da turma Kids 01.
4. A seleção permanece após recarregar a página, mas é local ao navegador (`localStorage`). Não compartilha informações entre dispositivos.
5. Em `/professor/planejamento`, o Banco de Dinâmicas já utiliza as mesmas missões, mas associar uma dinâmica **não** altera automaticamente a missão atual da turma.

## Próxima integração real

- Adicionar `Turma.missaoAtualId` (previsto em `prisma/schema.prisma`) e os campos descritivos de módulo/missão com status de publicação.
- Proteger operações: apenas professor autorizado da turma poderá alterar `missaoAtualId`; responsável autenticado consultará apenas turmas de alunos vinculados e matriculados.
- Importar **apenas** conteúdos publicados e aprovados no Notion para banco de desenvolvimento; não expor campos internos de planejamento do professor.
- Registrar autor/data da alteração e validar `missaoAtualId` contra o catálogo publicado no servidor.
- Testar regras e atualizações em ambiente controlado antes de disponibilizar a dados reais de menores de idade.

## Referências do Notion

- [Página principal Ducks Jiu-Jitsu](https://app.notion.com/p/22a20685058c820f9a668142894202af)
- [Módulo 1](https://app.notion.com/5f620685058c83ef82248187d3828251)
- [Módulo 2](https://app.notion.com/03620685058c83a483a2814e831bbcb6)
- Os links de cada missão estão em `lib/catalogoJornada.ts`.
