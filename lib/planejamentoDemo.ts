/** Dinâmicas fictícias; as missões são importadas do currículo publicado pela Ducks. */
import { MODULOS_PUBLICADOS } from "./catalogoJornada.ts";
export interface DinamicaDemo {
  id: string;
  nome: string;
  objetivo: string;
  duracao: number;
  programas: readonly ("KIDS_01" | "KIDS_02")[];
  materiais: string;
}

export const dinamicasDemo: DinamicaDemo[] = [
  { id: "circuito", nome: "Circuito de movimentos", objetivo: "Mobilidade e coordenação", duracao: 10, programas: ["KIDS_01", "KIDS_02"], materiais: "Cones e tatame" },
  { id: "animais", nome: "Desafio dos animais", objetivo: "Agilidade e consciência corporal", duracao: 8, programas: ["KIDS_01"], materiais: "Nenhum" },
  { id: "duplas", nome: "Percurso em duplas", objetivo: "Cooperação e equilíbrio", duracao: 12, programas: ["KIDS_01", "KIDS_02"], materiais: "Cones" },
  { id: "reflexo", nome: "Jogo dos reflexos", objetivo: "Atenção e tomada de decisão", duracao: 10, programas: ["KIDS_02"], materiais: "Bolas macias" },
];

export const missoesDemo = MODULOS_PUBLICADOS.flatMap((modulo) =>
  modulo.missoes.map((missao) => ({
    id: missao.id,
    titulo: `Missão ${missao.numero} · ${missao.nome}`,
    numero: missao.numero,
    moduloId: modulo.id,
    tema: missao.tema,
  })),
);

export type StatusPlano = "PLANEJADA" | "REALIZADA" | "CANCELADA";
export interface PlanoDemo {
  id: string;
  turmaId: string;
  missaoId: string;
  dinamicaId: string;
  periodo: string;
  situacao: StatusPlano;
  criadaEm: string;
  realizadaEm?: string;
}

export const PLANEJAMENTO_STORAGE = "ducks-planejamento-pedagogico-demo-v1";

export function historicoDinamica(turmaId: string, dinamicaId: string, planos: readonly PlanoDemo[]) {
  return planos
    .filter((p) => p.turmaId === turmaId && p.dinamicaId === dinamicaId && p.situacao === "REALIZADA")
    .sort((a, b) => (b.realizadaEm ?? "").localeCompare(a.realizadaEm ?? ""));
}

export function podeAssociarDinamica(
  planos: readonly PlanoDemo[],
  turmaId: string,
  missaoId: string,
  periodo: string,
) {
  return !planos.some(
    (p) => p.turmaId === turmaId && p.missaoId === missaoId && p.periodo === periodo && p.situacao === "PLANEJADA",
  );
}
