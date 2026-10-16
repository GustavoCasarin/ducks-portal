# Trilha oficial das 27 casas — Kids 01 e Kids 02

Informações fornecidas pela Ducks para codificação no portal. Esta relação define **nomes e ordem de habilidades/conteúdos**, não o calendário das missões semanais. A estrelinha marca presença em aula realizada que trabalhou aquela casa, **não** domínio técnico, progressão automática de grau ou autorização de troca de faixa.

| Casa | Kids 01 | Kids 02 |
|---:|---|---|
| 01 | Equilíbrio | Equilíbrio |
| 02 | Rolamento | Rolamento |
| 03 | Coordenação | Coordenação |
| 04 | Raciocínio | Raciocínio |
| 05 | Espírito | Espírito |
| 06 | Pegadas | Pegadas |
| 07 | Guarda fechada | Guarda fechada |
| 08 | Guarda aberta | Guarda aberta |
| 09 | Guarda sentada | Guarda sentada |
| 10 | 100 kg | 100 kg |
| 11 | Montada | Montada |
| 12 | 4 apoios | 4 apoios |
| 13 | Costas | Costas |
| 14 | Livre criação | Livre criação |
| 15 | Livre criação | Livre criação |
| 16 | Espírito de equipe | Espírito de equipe |
| 17 | Raspagem tesourinha | Raspagem tesourinha |
| 18 | Queda Tai-Otoshi | Queda Tai-Otoshi |
| 19 | Joelho na barriga | Joelho na barriga |
| 20 | Guarda aranha | Guarda aranha |
| 21 | Raspagem tripé | Raspagem tripé |
| 22 | Queda com 1 perna | Queda com 1 perna |
| 23 | Queda com 2 pernas | Queda com 2 pernas |
| 24 | Ataque de braço | Ataque de braço |
| 25 | Livre criação | Livre criação |
| 26 | História Princesa Ana | História Princesa Ana |
| 27 | O Rei da Mesa | O Rei da Mesa |

## Marcos visuais da trilha

| Posição | Kids 01 | Kids 02 |
|---|---|---|
| Após 04 | Grau Colorido **Atenção** | Grau Colorido **Respeito** |
| Após 09 | Grau Colorido **Respeito** | Grau Colorido **Atenção** |
| Após 14 | **Grau Técnico** | **Grau Técnico** |
| Após 23 | **Grau Técnico** | **Grau Técnico** |
| Após 27 | **Troca de Faixa** | **Troca de Faixa** |

## Regras importantes para a implementação

- As três casas `Livre criação` são **casas diferentes** (14, 15 e 25). Não usar nome como identificador único; usar `programa + numero`.
- O marco vem **depois** da casa correspondente e não substitui uma das 27 casas.
- Estrelinhas dependem de `Aula REALIZADA` + `Presenca PRESENTE` + `AulaHabilidade`; marcos pedagógicos não alteram esse cálculo.
- A lista de marcos define somente onde eles aparecem. **Critérios e confirmação de concessão** continuam dependentes da academia; não registrar grau automaticamente por completar aulas/casas.
- As 27 casas não equivalem às quatro missões de cada módulo. Uma mesma casa pode ser trabalhada em diferentes aulas e missões.
- O catálogo é gerenciado por programa e número em `lib/catalogoTrilhas.ts`, compatível com a restrição `@@unique([programa, numero])` de `CasaHabilidade` no schema Prisma proposto.
- Correção confirmada posteriormente: a casa 12 é `4 apoios` em ambos os programas.
- **Histórico:** a visualização das 27 casas deixou de ser o menu de pais do MVP. O menu atual é **Minha Jornada**, com módulos e missões.
- Os nomes oficiais **não** implicam que já existam avaliações reais. As estrelas da tela atual são fictícias.
