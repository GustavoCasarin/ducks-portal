/** Regras puras do MVP demonstrativo. Não utilizar informações de crianças reais. */
import { calcularPMA, type NotasPMA } from "./pma.ts";

export type SituacaoDemo = "PRESENTE" | "FALTA";
export interface AvaliacaoDemo {
  alunoId: string;
  competencia: string; // YYYY-MM
  notas: NotasPMA;
  observacao: string;
  registradaEm: string;
}
export interface AulaDemo {
  turmaId: string;
  data: string; // YYYY-MM-DD local da turma
  presencas: Record<string, SituacaoDemo>;
  carimbo?: { conteudoId: string; alunoIds: string[] };
  planoRealizadoId?: string;
}
export interface RegistrosDemo { avaliacoes: AvaliacaoDemo[]; aulas: AulaDemo[] }

/** Série inteiramente fictícia para demonstrar quatro avaliações e o gráfico. */
export const REGISTROS_INICIAIS: RegistrosDemo = {
  avaliacoes: [
    { alunoId: "a1", competencia: "2026-07", notas: { atencao: 6, disciplina: 6, respeito: 7, tecnica: 6 }, observacao: "Início do acompanhamento demonstrativo.", registradaEm: "2026-07-30T12:00:00.000Z" },
    { alunoId: "a1", competencia: "2026-08", notas: { atencao: 7, disciplina: 7, respeito: 7, tecnica: 7 }, observacao: "Participação regular nas atividades em dupla.", registradaEm: "2026-08-29T12:00:00.000Z" },
    { alunoId: "a1", competencia: "2026-09", notas: { atencao: 8, disciplina: 7, respeito: 9, tecnica: 8 }, observacao: "Maior atenção ao planejamento da missão.", registradaEm: "2026-09-29T12:00:00.000Z" },
    { alunoId: "a1", competencia: "2026-10", notas: { atencao: 9, disciplina: 8, respeito: 8, tecnica: 8 }, observacao: "Boa cooperação com os colegas.", registradaEm: "2026-10-16T12:00:00.000Z" },
  ],
  aulas: [],
};

export function competenciaValida(competencia: string) {
  return /^20\d{2}-(0[1-9]|1[0-2])$/.test(competencia);
}
export function dataValida(data: string) {
  if (!/^20\d{2}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/.test(data)) return false;
  const d = new Date(`${data}T12:00:00.000Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === data;
}
export function guardarAvaliacao(
  base: RegistrosDemo, avaliacao: AvaliacaoDemo,
): RegistrosDemo {
  if (!avaliacao.alunoId || !competenciaValida(avaliacao.competencia)) throw new Error("Competência inválida.");
  if (avaliacao.observacao.length > 280) throw new Error("Observação longa demais.");
  calcularPMA(avaliacao.notas); // Rejeita notas inválidas antes de salvar
  const atualizadas = base.avaliacoes.filter((item) =>
    !(item.alunoId === avaliacao.alunoId && item.competencia === avaliacao.competencia));
  return { ...base, avaliacoes: [...atualizadas, avaliacao] };
}
export function avaliacoesDeAluno(base: RegistrosDemo, alunoId: string): AvaliacaoDemo[] {
  return base.avaliacoes.filter((x) => x.alunoId === alunoId && competenciaValida(x.competencia))
    .sort((a, b) => a.competencia.localeCompare(b.competencia));
}
export function variacaoPMA(atual: AvaliacaoDemo, anterior?: AvaliacaoDemo) {
  if (!anterior) return null;
  return Math.round((calcularPMA(atual.notas).geral - calcularPMA(anterior.notas).geral) * 100) / 100;
}
export function registrarChamada(
  base: RegistrosDemo, turmaId: string, data: string, alunosDaTurma: readonly string[],
  presencas: Record<string, SituacaoDemo>,
): RegistrosDemo {
  if (!turmaId || !dataValida(data) || alunosDaTurma.length === 0 || new Set(alunosDaTurma).size !== alunosDaTurma.length) {
    throw new Error("Dados da aula inválidos.");
  }
  if (Object.keys(presencas).length !== alunosDaTurma.length || !alunosDaTurma.every((id) =>
    presencas[id] === "PRESENTE" || presencas[id] === "FALTA")) throw new Error("É necessário conferir todos os alunos da turma.");
  const anterior = base.aulas.find((a) => a.turmaId === turmaId && a.data === data);
  const mesmaChamada = anterior && JSON.stringify(anterior.presencas) === JSON.stringify(presencas);
  const aula: AulaDemo = {
    turmaId, data, presencas: { ...presencas },
    carimbo: mesmaChamada ? anterior.carimbo : undefined,
    planoRealizadoId: anterior?.planoRealizadoId,
  };
  return { ...base, aulas: [...base.aulas.filter((a) => !(a.turmaId === turmaId && a.data === data)), aula] };
}
export function registrarCarimbo(
  base: RegistrosDemo, turmaId: string, data: string, conteudoId: string,
): RegistrosDemo {
  if (!conteudoId) throw new Error("Selecione o conteúdo.");
  let encontrada = false;
  const aulas = base.aulas.map((a) => {
    if (a.turmaId !== turmaId || a.data !== data) return a;
    const presentes = Object.entries(a.presencas).filter(([, s]) => s === "PRESENTE").map(([id]) => id);
    if (!presentes.length) throw new Error("Não há alunos presentes para receber o carimbo.");
    encontrada = true;
    return { ...a, carimbo: { conteudoId, alunoIds: presentes } };
  });
  if (!encontrada) throw new Error("Salve a chamada antes de atribuir carimbos.");
  return { ...base, aulas };
}
/** Frequência da demonstração: somente aulas com chamada salva para o aluno naquele mês.
 * Não aplica as regras oficiais de reposição, faltas justificadas ou matrícula parcial.
 */
export function resumoFrequenciaMensal(
  base: RegistrosDemo, turmaId: string, alunoId: string, competencia: string,
): { presentes: number; aulasRegistradas: number; percentual: number | null } {
  if (!turmaId || !alunoId || !competenciaValida(competencia)) {
    throw new Error("Turma, aluno ou competência inválida.");
  }
  const chamadas = base.aulas.filter((aula) =>
    aula.turmaId === turmaId &&
    aula.data.startsWith(`${competencia}-`) &&
    dataValida(aula.data) &&
    (aula.presencas[alunoId] === "PRESENTE" || aula.presencas[alunoId] === "FALTA"),
  );
  const presentes = chamadas.filter((aula) => aula.presencas[alunoId] === "PRESENTE").length;
  return {
    presentes,
    aulasRegistradas: chamadas.length,
    percentual: chamadas.length ? Math.round((presentes / chamadas.length) * 100) : null,
  };
}

export function vincularPlanoRealizado(base: RegistrosDemo, turmaId: string, data: string, planoId: string): RegistrosDemo {
  if (!planoId || !base.aulas.some((a) => a.turmaId === turmaId && a.data === data)) throw new Error("É necessário salvar a chamada primeiro.");
  return { ...base, aulas: base.aulas.map((a) => a.turmaId === turmaId && a.data === data ? { ...a, planoRealizadoId: planoId } : a) };
}
