import test from "node:test";
import assert from "node:assert/strict";
import {
  MODULOS_EM_DESENVOLVIMENTO, MODULOS_PUBLICADOS, moduloPublicado, missaoPublicada, validarMissaoAtual,
} from "../lib/catalogoJornada.ts";

test("somente Módulos 1 e 2 ficam publicados na Jornada", () => {
  assert.deepEqual(MODULOS_PUBLICADOS.map((m) => m.id), [1, 2]);
  assert.deepEqual(MODULOS_EM_DESENVOLVIMENTO.map((m) => m.id), [3, 4]);
  assert.equal(moduloPublicado(3), undefined);
  assert.equal(moduloPublicado(4), undefined);
});

test("cada módulo publicado contém exatamente quatro missões em ordem", () => {
  for (const modulo of MODULOS_PUBLICADOS) {
    assert.equal(modulo.missoes.length, 4);
    assert.deepEqual(modulo.missoes.map((m) => m.numeroNoModulo), [1,2,3,4]);
    assert.ok(modulo.missoes.every((m) => m.moduloId === modulo.id));
    assert.ok(modulo.missoes.every((m) => m.resumoFamilia.length >= 40));
    assert.ok(modulo.missoes.every((m) => m.fonteNotion.startsWith("https://app.notion.com/")));
  }
});

test("missões oficiais de 1 a 8 possuem títulos distintos e IDs estáveis", () => {
  const miss = MODULOS_PUBLICADOS.flatMap((m) => m.missoes);
  assert.deepEqual(miss.map((m) => m.numero), [1,2,3,4,5,6,7,8]);
  assert.equal(new Set(miss.map((m) => m.id)).size, 8);
  assert.equal(missaoPublicada("missao-7")?.nome, "O Giro do Tatu");
  assert.equal(missaoPublicada("missao-8")?.nome, "O Abraço do Polvo");
});

test("seleção atual aceita apenas missões publicadas, sem atribuição individual", () => {
  assert.equal(validarMissaoAtual("missao-1")?.moduloId, 1);
  assert.equal(validarMissaoAtual("missao-8")?.moduloId, 2);
  assert.equal(validarMissaoAtual("missao-9"), null);
  assert.equal(validarMissaoAtual("missao-100"), null);
  assert.equal(validarMissaoAtual(null), null);
});

test("Kids 01 e Kids 02 usam um catálogo pedagógico único", () => {
  assert.equal(MODULOS_PUBLICADOS.length, 2);
  assert.ok(MODULOS_PUBLICADOS.every((m) => !Object.hasOwn(m, "programa")));
});
