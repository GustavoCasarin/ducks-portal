# Método Ducks — regras consolidadas após conversas com o professor

> Estado: **regras de presença/estrelinhas confirmadas**. As 27 casas por programa foram fornecidas pela Ducks; exemplos de missões e dinâmicas continuam fictícios e seus catálogos oficiais ainda precisam ser validados. Não aplicar migração nem usar dados reais antes da autenticação, autorização e revisão LGPD.

## 1. Estrutura curricular

- **Módulo**: ciclo de cerca de 1 mês, normalmente com 4 missões semanais.
- **Missão**: aproximadamente 1 semana, trabalhada em 2 aulas (8 aulas/módulo).
- **Dinâmica**: brincadeira/atividade associada à missão e opcionalmente às habilidades; idealmente uma por semana (aula sim, aula não). As dinâmicas testadas ficam num catálogo, com histórico de utilização por turma e período letivo.
- **Casa**: uma das **27 habilidades/competências** do percurso anual (como equilíbrio, rolamento, raspagem e espírito de equipe — títulos e numeração oficiais de Kids 01 e Kids 02 recebidos, em `docs/catalogo-27-casas.md`). **Uma casa não é igual a uma missão.** Uma habilidade pode ser abordada em mais de um módulo ou missão.
- **Estrela**: confirmação de **presença/participação** na aula que trabalhou a habilidade daquela casa, **não** domínio técnico nem aprovação.
- **Carimbo do Passaporte**: recurso separado para conteúdos de idiomas e linguagem de combate, cujos critérios ainda serão definidos.
- **PMA**: avaliação técnica/comportamental separada, com pesos a validar oficialmente.

## 2. Regra confirmada das estrelas

Uma estrela aparece na casa X de um aluno **se, e somente se**:

1. A aula foi efetivamente realizada;
2. O professor confirmou presença (`Presenca.situacao = PRESENTE`) para aquele aluno naquela aula;
3. A habilidade X consta entre as habilidades trabalhadas na aula (`AulaHabilidade`).

**Uma estrela, no máximo, por aluno + aula + casa**, mesmo se houver mais de uma dinâmica associada à habilidade. Faltas, faltas justificadas, aulas apenas previstas e aulas canceladas não geram estrela. Presença corrigida para falta remove o efeito da estrela (derivação, não cópia gravada).

**Não persistir `EstrelaAluno` como registro redundante** nesta etapa: calcular a contagem a partir de `Presenca`, `Aula.situacao` e `AulaHabilidade`. Se, no futuro, forem necessárias premiações especiais com regras diferentes, serão modeladas separadamente.

Exemplo: numa turma fictícia, a Aula 1 aborda Mobilidade e o aluno está presente => +1 estrela em Mobilidade. Na Aula 2 ele falta => não ganha estrela. Na Aula 3 ele está presente e Mobilidade é trabalhada de novo => +1 estrela. Total = 2 estrelas, sem implicar domínio.

No banco real, as consultas devem checar autorização de responsável/professor e matrículas válidas na data da aula. Reposições, justificativas e o cálculo do **Grau Verde** precisam de política específica: estrelas não substituem automaticamente o percentual de frequência.

## 3. Banco de dinâmicas

- Uma dinâmica continua disponível no banco após sua utilização; apenas o histórico é incrementado.
- **Planejada** e **Realizada** são estados diferentes: cancelar um planejamento não marca uso.
- O histórico pode ser filtrado por programa, turma e período letivo.
- A dinâmica pode trabalhar uma ou mais habilidades (`DinamicaHabilidade`).
- O planejamento é associado à missão da semana; quando a aplicação for confirmada, ficará vinculada também à aula efetivamente realizada.
- O catálogo tem dados descritivos (objetivos, duração, materiais, programas recomendados). Hoje usamos exemplos inventados; o catálogo oficial precisa vir da academia.
- Uma sugestão futura de recomendação pode priorizar dinâmicas não utilizadas recentemente naquela turma, sem proibir repetições intencionais.

## 4. O que ainda depende de definição

- Os nomes e a ordem das 27 casas por programa foram recebidos; validar grafias finais e marcos de graduação antes de aplicar migrações.
- Critérios de avaliação de domínio técnico, distintos das estrelas.
- Como medir PMA, converter avaliações em Graus Coloridos e conceder faixas.
- Procedimento de correção de chamadas, suspensão e reposições de aulas.
- Como a academia define início/fim do módulo com feriados e ausências.
- Se cada missão exige uma única dinâmica ou pode ter mais; a modelagem permite várias, a interface de exemplo limita a uma planejada por vez.

## 5. Protótipo desta etapa

- `/professor/planejamento`: escolher turma, missão e dinâmica; planejar/confirmar/cancelar, mostrar histórico de uso. Somente dados fictícios e `localStorage` do navegador.
- `/trilha`: catálogo oficial Kids 01/02, diferenças da casa 12, marcos após 4/9/14/23/27 e estrelas demonstrativas derivadas de presença (sem progressão artificial por casa numérica).
- Nenhuma das ações deste protótipo modifica banco real ou acessa dados pessoais.

## 6. Sequência sugerida de implementação real

1. Confirmar eventuais grafias do catálogo de 27 casas (`docs/catalogo-27-casas.md`) e coletar o catálogo de dinâmicas com os professores.
2. Integrar Supabase Auth e aplicar autorização por papel/turma e responsável/aluno.
3. Criar migrações das entidades curriculares em ambiente de testes.
4. Persistir aulas, habilidades efetivamente trabalhadas, presenças e histórico das dinâmicas.
5. Consultar estrelas por presença confirmada (derivação), sem misturar com PMA.
6. Implementar testes de regras, auditoria de edições e autorização, antes de produção.
