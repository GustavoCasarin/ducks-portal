import test from "node:test";
import assert from "node:assert/strict";
import {
  REGISTROS_INICIAIS, avaliacoesDeAluno, guardarAvaliacao, variacaoPMA,
  registrarChamada, registrarCarimbo, vincularPlanoRealizado,
  competenciaValida, dataValida, resumoFrequenciaMensal,
} from "../lib/registrosDemo.ts";
import { calcularPMA } from "../lib/pma.ts";

const vazio = { avaliacoes: [], aulas: [] };
const notas = { atencao: 9, disciplina: 8, respeito: 8, tecnica: 8 };
const a = { alunoId: "a1", competencia: "2026-09", notas, observacao: "Atenção maior", registradaEm: "2026-09-01T00:00:00.000Z" };

test("histórico demonstrativo tem quatro competências únicas e cronológicas", () => {
  const lista = avaliacoesDeAluno(REGISTROS_INICIAIS, "a1");
  assert.equal(lista.length, 4);
  assert.deepEqual(lista.map(x => x.competencia), ["2026-07", "2026-08", "2026-09", "2026-10"]);
  assert.equal(avaliacoesDeAluno(REGISTROS_INICIAIS, "b1").length, 0);
});
test("atualizar avaliação mensal não duplica o mesmo mês", () => {
  const uma = guardarAvaliacao(vazio, a);
  const nova = guardarAvaliacao(uma, { ...a, notas: { ...notas, tecnica: 10 } });
  assert.equal(nova.avaliacoes.length, 1);
  assert.equal(nova.avaliacoes[0].notas.tecnica, 10);
});
test("rejeita valores e competências inválidas", () => {
  assert.equal(competenciaValida("2026-13"), false);
  assert.equal(competenciaValida("2026-10"), true);
  assert.throws(() => guardarAvaliacao(vazio, { ...a, competencia: "2026-00" }));
  assert.throws(() => guardarAvaliacao(vazio, { ...a, notas: { ...notas, tecnica: 11 } }));
  assert.throws(() => guardarAvaliacao(vazio, { ...a, observacao: "x".repeat(281) }));
});
test("média PMA e diferença mensal derivam das notas", () => {
  assert.equal(calcularPMA(a.notas).geral, 8.17);
  const antes = { ...a, notas: { atencao: 6, disciplina: 6, respeito: 6, tecnica: 6 } };
  assert.equal(variacaoPMA(a, antes), 2.17);
  assert.equal(variacaoPMA(a), null);
});
test("chamada exige todos os alunos e data real", () => {
  assert.equal(dataValida("2026-02-29"), false);
  assert.equal(dataValida("2026-02-28"), true);
  assert.throws(() => registrarChamada(vazio, "turma", "2026-10-19", ["a1", "a2"], { a1: "PRESENTE" }));
  assert.throws(() => registrarChamada(vazio, "turma", "2026-10-19", ["a1", "a2"], { a1: "PRESENTE", a2: "FALTA", outsider: "PRESENTE" }));
});
test("chamada salva é idempotente por turma e data", () => {
  const base = registrarChamada(vazio, "turma1", "2026-10-19", ["a1", "a2"], { a1: "PRESENTE", a2: "FALTA" });
  const igual = registrarChamada(base, "turma1", "2026-10-19", ["a1", "a2"], { a1: "PRESENTE", a2: "FALTA" });
  assert.equal(igual.aulas.length, 1);
});
test("carimbo só é gerado aos presentes, nunca aos ausentes", () => {
  const base = registrarChamada(vazio, "turma1", "2026-10-19", ["a1", "a2"], { a1: "PRESENTE", a2: "FALTA" });
  const pronto = registrarCarimbo(base, "turma1", "2026-10-19", "tatu");
  assert.deepEqual(pronto.aulas[0].carimbo.alunoIds, ["a1"]);
});
test("carimbo exige chamada salva e pelo menos um presente", () => {
  assert.throws(() => registrarCarimbo(vazio, "t1", "2026-10-19", "tatu"));
  const vazioNaTurma = registrarChamada(vazio, "t1", "2026-10-19", ["a1"], { a1: "FALTA" });
  assert.throws(() => registrarCarimbo(vazioNaTurma, "t1", "2026-10-19", "tatu"));
});
test("correção de falta apaga carimbo antigo e mantém o registro da aula", () => {
  const base = registrarCarimbo(registrarChamada(vazio, "t1", "2026-10-19", ["a1", "a2"], { a1: "PRESENTE", a2: "PRESENTE" }), "t1", "2026-10-19", "tatu");
  const corrigido = registrarChamada(base, "t1", "2026-10-19", ["a1", "a2"], { a1: "PRESENTE", a2: "FALTA" });
  assert.equal(corrigido.aulas.length, 1);
  assert.equal(corrigido.aulas[0].carimbo, undefined);
});
test("repetir a mesma chamada preserva o carimbo", () => {
  const p = { a1: "PRESENTE", a2: "FALTA" };
  const base = registrarCarimbo(registrarChamada(vazio, "t1", "2026-10-19", ["a1", "a2"], p), "t1", "2026-10-19", "tatu");
  const repetido = registrarChamada(base, "t1", "2026-10-19", ["a1", "a2"], p);
  assert.deepEqual(repetido.aulas[0].carimbo.alunoIds, ["a1"]);
});
test("dinâmica realizada só vincula em aula já registrada", () => {
  assert.throws(() => vincularPlanoRealizado(vazio, "t1", "2026-10-19", "plano"));
  const base = registrarChamada(vazio, "t1", "2026-10-19", ["a1"], { a1: "PRESENTE" });
  assert.equal(vincularPlanoRealizado(base, "t1", "2026-10-19", "plano").aulas[0].planoRealizadoId, "plano");
});

// A frequência é participação nas aulas registradas, não progressão de graus.
test("frequência sem chamadas mostra ausência de dados, nunca 0% inventado", () => {
  assert.deepEqual(resumoFrequenciaMensal(vazio, "turma", "a1", "2026-10"), {
    presentes: 0, aulasRegistradas: 0, percentual: null,
  });
});
test("frequência soma apenas chamadas do aluno, turma e mês especificados", () => {
  let registros = registrarChamada(vazio, "t1", "2026-10-05", ["a1", "a2"], { a1: "PRESENTE", a2: "FALTA" });
  registros = registrarChamada(registros, "t1", "2026-10-07", ["a1", "a2"], { a1: "FALTA", a2: "PRESENTE" });
  registros = registrarChamada(registros, "t1", "2026-10-09", ["a1", "a2"], { a1: "PRESENTE", a2: "FALTA" });
  registros = registrarChamada(registros, "t2", "2026-10-10", ["a1"], { a1: "PRESENTE" });
  registros = registrarChamada(registros, "t1", "2026-09-30", ["a1", "a2"], { a1: "PRESENTE", a2: "PRESENTE" });
  assert.deepEqual(resumoFrequenciaMensal(registros, "t1", "a1", "2026-10"), {
    presentes: 2, aulasRegistradas: 3, percentual: 67,
  });
  assert.deepEqual(resumoFrequenciaMensal(registros, "t1", "a2", "2026-10"), {
    presentes: 1, aulasRegistradas: 3, percentual: 33,
  });
  assert.deepEqual(resumoFrequenciaMensal(registros, "t1", "a1", "2026-09"), {
    presentes: 1, aulasRegistradas: 1, percentual: 100,
  });
});
test("corrigir chamada atualiza a frequência sem duplicar aula", () => {
  const base = registrarChamada(vazio, "t1", "2026-10-19", ["a1"], { a1: "FALTA" });
  assert.equal(resumoFrequenciaMensal(base, "t1", "a1", "2026-10").percentual, 0);
  const corrigido = registrarChamada(base, "t1", "2026-10-19", ["a1"], { a1: "PRESENTE" });
  assert.deepEqual(resumoFrequenciaMensal(corrigido, "t1", "a1", "2026-10"), {
    presentes: 1, aulasRegistradas: 1, percentual: 100,
  });
});
test("frequência rejeita competência ou identificação inválida", () => {
  assert.throws(() => resumoFrequenciaMensal(vazio, "t1", "a1", "2026-13"));
  assert.throws(() => resumoFrequenciaMensal(vazio, "", "a1", "2026-10"));
});
