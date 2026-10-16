/**
 * Catálogo de 27 casas fornecido pela Ducks para Kids 01 e Kids 02.
 * As casas representam habilidades/conteúdos trabalhados; NÃO são missões.
 * Presença (estrela) e graduação (marco) são conceitos independentes.
 */
export type ProgramaTrilha = "KIDS_01" | "KIDS_02";

export interface CasaTrilha {
  numero: number;
  nome: string;
}

export type TipoMarcoTrilha = "GRAU_COLORIDO" | "GRAU_TECNICO" | "TROCA_FAIXA";

export interface MarcoTrilha {
  aposCasa: number;
  tipo: TipoMarcoTrilha;
  titulo: string;
}

const NOMES_KIDS_01 = [
  "Equilíbrio",
  "Rolamento",
  "Coordenação",
  "Raciocínio",
  "Espírito",
  "Pegadas",
  "Guarda fechada",
  "Guarda aberta",
  "Guarda sentada",
  "100 kg",
  "Montada",
  "4 apoios",
  "Costas",
  "Livre criação",
  "Livre criação",
  "Espírito de equipe",
  "Raspagem tesourinha",
  "Queda Tai-Otoshi",
  "Joelho na barriga",
  "Guarda aranha",
  "Raspagem tripé",
  "Queda com 1 perna",
  "Queda com 2 pernas",
  "Ataque de braço",
  "Livre criação",
  "História Princesa Ana",
  "O Rei da Mesa",
] as const;

// O catálogo das casas foi preservado apenas como referência histórica do método.
const NOMES_KIDS_02 = NOMES_KIDS_01;

function enumerarCasas(nomes: readonly string[]): readonly CasaTrilha[] {
  return nomes.map((nome, index) => ({ numero: index + 1, nome }));
}

const CASAS: Record<ProgramaTrilha, readonly CasaTrilha[]> = {
  KIDS_01: enumerarCasas(NOMES_KIDS_01),
  KIDS_02: enumerarCasas(NOMES_KIDS_02),
};

const MARCOS: Record<ProgramaTrilha, readonly MarcoTrilha[]> = {
  KIDS_01: [
    { aposCasa: 4, tipo: "GRAU_COLORIDO", titulo: "Atenção" },
    { aposCasa: 9, tipo: "GRAU_COLORIDO", titulo: "Respeito" },
    { aposCasa: 14, tipo: "GRAU_TECNICO", titulo: "Grau Técnico" },
    { aposCasa: 23, tipo: "GRAU_TECNICO", titulo: "Grau Técnico" },
    { aposCasa: 27, tipo: "TROCA_FAIXA", titulo: "Troca de Faixa" },
  ],
  KIDS_02: [
    { aposCasa: 4, tipo: "GRAU_COLORIDO", titulo: "Respeito" },
    { aposCasa: 9, tipo: "GRAU_COLORIDO", titulo: "Atenção" },
    { aposCasa: 14, tipo: "GRAU_TECNICO", titulo: "Grau Técnico" },
    { aposCasa: 23, tipo: "GRAU_TECNICO", titulo: "Grau Técnico" },
    { aposCasa: 27, tipo: "TROCA_FAIXA", titulo: "Troca de Faixa" },
  ],
};

export const TOTAL_CASAS_OFICIAIS = 27;

export function casasDoPrograma(programa: ProgramaTrilha): readonly CasaTrilha[] {
  return CASAS[programa];
}

export function marcosDoPrograma(programa: ProgramaTrilha): readonly MarcoTrilha[] {
  return MARCOS[programa];
}

export function casaPorNumero(programa: ProgramaTrilha, numero: number): CasaTrilha | undefined {
  return CASAS[programa].find((casa) => casa.numero === numero);
}

export function marcoAposCasa(programa: ProgramaTrilha, numero: number): MarcoTrilha | undefined {
  return MARCOS[programa].find((marco) => marco.aposCasa === numero);
}
