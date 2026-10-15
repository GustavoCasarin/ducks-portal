import test from "node:test";
import assert from "node:assert/strict";
import { estrelasPorCasa } from "../lib/jornada.ts";
import { podeAssociarDinamica, historicoDinamica } from "../lib/planejamentoDemo.ts";

test("só presença em aula realizada gera estrela na casa trabalhada", () => {
  const aulas = [
    { id: "a1", situacao: "REALIZADA", casasTrabalhadas: [7] },
    { id: "a2", situacao: "REALIZADA", casasTrabalhadas: [7] },
    { id: "a3", situacao: "CANCELADA", casasTrabalhadas: [7] },
    { id: "a4", situacao: "PREVISTA", casasTrabalhadas: [7] },
  ];
  const presencas = [
    { aulaId: "a1", alunoId: "x", situacao: "PRESENTE" },
    { aulaId: "a2", alunoId: "x", situacao: "FALTA" },
    { aulaId: "a3", alunoId: "x", situacao: "PRESENTE" },
    { aulaId: "a4", alunoId: "x", situacao: "PRESENTE" },
  ];
  assert.deepEqual(estrelasPorCasa("x", aulas, presencas), { 7: 1 });
});

test("presença em aula com duas habilidades gera uma estrela em cada casa", () => {
  const aulas = [{ id: "a1", situacao: "REALIZADA", casasTrabalhadas: [3, 7, 7] }];
  const presencas = [{ aulaId: "a1", alunoId: "x", situacao: "PRESENTE" }];
  assert.deepEqual(estrelasPorCasa("x", aulas, presencas), { 3: 1, 7: 1 });
});

test("corrigir a presença para falta remove a estrela derivada", () => {
  const aulas = [{ id: "a1", situacao: "REALIZADA", casasTrabalhadas: [7] }];
  assert.equal(estrelasPorCasa("x", aulas, [{ aulaId: "a1", alunoId: "x", situacao: "PRESENTE" }])[7], 1);
  assert.deepEqual(estrelasPorCasa("x", aulas, [{ aulaId: "a1", alunoId: "x", situacao: "FALTA" }]), {});
});

test("faltas justificadas não geram estrelas", () => {
  const aulas = [{ id: "a1", situacao: "REALIZADA", casasTrabalhadas: [7] }];
  assert.deepEqual(estrelasPorCasa("x", aulas, [{ aulaId: "a1", alunoId: "x", situacao: "JUSTIFICADA" }]), {});
});

test("não gera estrelas por presença de outro aluno", () => {
  assert.deepEqual(estrelasPorCasa("x", [{ id: "a1", situacao: "REALIZADA", casasTrabalhadas: [7] }], [{ aulaId: "a1", alunoId: "y", situacao: "PRESENTE" }]), {});
});

test("não aceita números fora das 27 casas", () => {
  assert.deepEqual(estrelasPorCasa("x", [{ id: "a1", situacao: "REALIZADA", casasTrabalhadas: [0, 28, 3.3, 7] }], [{ aulaId: "a1", alunoId: "x", situacao: "PRESENTE" }]), { 7: 1 });
});

test("bloqueia segunda dinâmica planejada na mesma missão, turma e período", () => {
  const planos = [{ id: "p1", turmaId: "t", missaoId: "m", periodo: "2026.2", dinamicaId: "d1", situacao: "PLANEJADA", criadaEm: "2026-10-15" }];
  assert.equal(podeAssociarDinamica(planos, "t", "m", "2026.2"), false);
  assert.equal(podeAssociarDinamica(planos, "t", "outra", "2026.2"), true);
  assert.equal(podeAssociarDinamica(planos, "outra", "m", "2026.2"), true);
});

test("dinâmica cancelada permite novo planejamento", () => {
  const planos = [{ id: "p1", turmaId: "t", missaoId: "m", periodo: "2026.2", dinamicaId: "d1", situacao: "CANCELADA", criadaEm: "2026-10-15" }];
  assert.equal(podeAssociarDinamica(planos, "t", "m", "2026.2"), true);
});

test("histórico de dinâmica conta apenas execuções confirmadas da turma", () => {
  const planos = [
    { id: "p1", turmaId: "t", missaoId: "m1", periodo: "2026.2", dinamicaId: "d", situacao: "PLANEJADA", criadaEm: "2026-01-01" },
    { id: "p2", turmaId: "t", missaoId: "m2", periodo: "2026.2", dinamicaId: "d", situacao: "REALIZADA", criadaEm: "2026-01-01", realizadaEm: "2026-09-01" },
    { id: "p3", turmaId: "outra", missaoId: "m3", periodo: "2026.2", dinamicaId: "d", situacao: "REALIZADA", criadaEm: "2026-01-01", realizadaEm: "2026-10-01" },
    { id: "p4", turmaId: "t", missaoId: "m4", periodo: "2026.2", dinamicaId: "d", situacao: "REALIZADA", criadaEm: "2026-01-01", realizadaEm: "2026-10-02" },
  ];
  assert.deepEqual(historicoDinamica("t", "d", planos).map((p) => p.id), ["p4", "p2"]);
});
