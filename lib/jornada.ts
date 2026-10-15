/**
 * Regras do método Ducks confirmadas em conversa com professores.
 * Estrela = presença em aula REALIZADA que trabalhou a habilidade/casa.
 * Estrela NÃO mede domínio, nota técnica ou conclusão de missão.
 */
export type SituacaoAulaJornada = "PREVISTA" | "REALIZADA" | "CANCELADA";
export type SituacaoPresencaJornada = "PRESENTE" | "FALTA" | "JUSTIFICADA";

export interface AulaJornada {
  id: string;
  situacao: SituacaoAulaJornada;
  casasTrabalhadas: number[];
}

export interface RegistroPresencaJornada {
  aulaId: string;
  alunoId: string;
  situacao: SituacaoPresencaJornada;
}

/** Conta no máximo uma estrela por aluno, aula e casa, independentemente de duplicações na entrada. */
export function estrelasPorCasa(
  alunoId: string,
  aulas: readonly AulaJornada[],
  presencas: readonly RegistroPresencaJornada[],
): Record<number, number> {
  const presentes = new Set(
    presencas
      .filter((p) => p.alunoId === alunoId && p.situacao === "PRESENTE")
      .map((p) => p.aulaId),
  );
  const resultado: Record<number, number> = {};
  const pares = new Set<string>();
  for (const aula of aulas) {
    if (aula.situacao !== "REALIZADA" || !presentes.has(aula.id)) continue;
    for (const casa of aula.casasTrabalhadas) {
      if (!Number.isInteger(casa) || casa < 1 || casa > 27) continue;
      const par = `${aula.id}:${casa}`;
      if (pares.has(par)) continue;
      pares.add(par);
      resultado[casa] = (resultado[casa] ?? 0) + 1;
    }
  }
  return resultado;
}

/** Apenas dados fictícios para visualizar o funcionamento das estrelas. */
export const aulasDeExemplo: AulaJornada[] = [
  { id: "ex-1", situacao: "REALIZADA", casasTrabalhadas: [7] },
  { id: "ex-2", situacao: "REALIZADA", casasTrabalhadas: [7, 3] },
  { id: "ex-3", situacao: "REALIZADA", casasTrabalhadas: [7] },
  { id: "ex-4", situacao: "CANCELADA", casasTrabalhadas: [7] },
];
export const presencasDeExemplo: RegistroPresencaJornada[] = [
  { aulaId: "ex-1", alunoId: "a1", situacao: "PRESENTE" },
  { aulaId: "ex-2", alunoId: "a1", situacao: "FALTA" },
  { aulaId: "ex-3", alunoId: "a1", situacao: "PRESENTE" },
  { aulaId: "ex-4", alunoId: "a1", situacao: "PRESENTE" },
];
export const TOTAL_CASAS_JORNADA = 27;
