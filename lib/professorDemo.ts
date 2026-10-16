/** Exclusivamente para demonstração local, sem vínculo com alunos reais. */
export interface AlunoTurmaDemo {
  id: string;
  nome: string;
  faixa: string;
}

export interface TurmaDemo {
  id: string;
  nome: string;
  programa: "KIDS_01" | "KIDS_02";
  horario: string;
  duracaoMinutos: number;
  alunos: AlunoTurmaDemo[];
}

export const turmasDemo: TurmaDemo[] = [
  {
    id: "kids-01-demo",
    nome: "Kids 01 · Turma A",
    programa: "KIDS_01",
    horario: "Seg. e Qua. · 17h30",
    duracaoMinutos: 64,
    alunos: [
      { id: "a1", nome: "Joãozinho Casarin", faixa: "Branca e Cinza" },
      { id: "a2", nome: "Ana Oliveira", faixa: "Branca" },
      { id: "a3", nome: "Pedro Lima", faixa: "Branca e Cinza" },
      { id: "a4", nome: "Lia Martins", faixa: "Cinza" },
      { id: "a5", nome: "Rafael Costa", faixa: "Branca" },
      { id: "a6", nome: "Clara Souza", faixa: "Branca" },
    ],
  },
  {
    id: "kids-02-demo",
    nome: "Kids 02 · Turma B",
    programa: "KIDS_02",
    horario: "Ter. e Qui. · 18h45",
    duracaoMinutos: 64,
    alunos: [
      { id: "b1", nome: "Gabriel Rocha", faixa: "Cinza" },
      { id: "b2", nome: "Marina Alves", faixa: "Branca e Cinza" },
      { id: "b3", nome: "Enzo Ferreira", faixa: "Branca" },
      { id: "b4", nome: "Isabela Pinto", faixa: "Cinza e Preta" },
      { id: "b5", nome: "Miguel Santos", faixa: "Branca" },
    ],
  },
];

export const conteudosDiaDemo = [
  { id: "tatu", nome: "O Giro do Tatu", categoria: "Missão técnica", descricao: "Referência à Missão 7 do Módulo 2. Não altera a jornada." },
  { id: "aguia", nome: "Águia / Eagle", categoria: "Habilidade animal", descricao: "Vocabulário em cinco idiomas." },
  { id: "persistencia", nome: "Persistência / Persistence", categoria: "Palavra-âncora", descricao: "Eu ainda não consigo — mas posso aprender." },
  { id: "equilibrio", nome: "Equilíbrio", categoria: "Linguagem de combate", descricao: "Conteúdo ilustrativo, ainda não oficializado." },
] as const;
