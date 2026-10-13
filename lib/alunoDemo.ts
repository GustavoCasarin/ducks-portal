/** Dados fictícios enquanto o portal não estiver integrado ao banco de dados. */
export const alunoDemo = {
  nome: "Joãozinho Casarin",
  faixa: "Branca e Cinza",
  programa: "Kids 01 (5 a 8 anos)",
  fotoUrl: null as string | null,
  pma: { comportamental: 8.5, tecnico: 8.0, geral: 8.25 },
  grausColoridos: { atencao: 80, disciplina: 90, respeito: 100, frequencia: 85 },
  casaAtual: {
    numero: 7,
    nome: "O Giro do Tatu",
    modulo: "Módulo 2 - Controle e Transição",
  },
  fraseAncora: {
    ingles: "I can't yet, but if I set my mind into it I will.",
    portugues: "Ainda não consigo, mas se eu me dedicar, eu vou conseguir.",
    palavraChave: "Persistência / Persistence",
  },
};

export const TOTAL_CASAS = 27;
