import test from "node:test";
import assert from "node:assert/strict";
import {
  casaPorNumero,
  casasDoPrograma,
  marcoAposCasa,
  marcosDoPrograma,
  TOTAL_CASAS_OFICIAIS,
} from "../lib/catalogoTrilhas.ts";

for (const programa of ["KIDS_01", "KIDS_02"]) {
  test(`${programa}: 27 casas numeradas, sem posições ausentes`, () => {
    const casas = casasDoPrograma(programa);
    assert.equal(TOTAL_CASAS_OFICIAIS, 27);
    assert.equal(casas.length, 27);
    assert.deepEqual(casas.map(({ numero }) => numero), Array.from({ length: 27 }, (_, i) => i + 1));
    assert.ok(casas.every(({ nome }) => nome.trim().length > 0));
    assert.equal(casaPorNumero(programa, 28), undefined);
  });

  test(`${programa}: marcos ficam APÓS 4, 9, 14, 23 e 27`, () => {
    const marcos = marcosDoPrograma(programa);
    assert.deepEqual(marcos.map(({ aposCasa }) => aposCasa), [4, 9, 14, 23, 27]);
    assert.deepEqual(marcos.map(({ tipo }) => tipo), [
      "GRAU_COLORIDO", "GRAU_COLORIDO", "GRAU_TECNICO", "GRAU_TECNICO", "TROCA_FAIXA",
    ]);
    assert.equal(marcoAposCasa(programa, 3), undefined);
  });
}

test("Kids 01 e Kids 02 compartilham as 27 habilidades", () => {
  const k1 = casasDoPrograma("KIDS_01");
  const k2 = casasDoPrograma("KIDS_02");
  assert.deepEqual(k1, k2);
  assert.equal(k1[11].nome, "4 apoios");
  assert.equal(k2[11].nome, "4 apoios");
});

test("as casas repetidas Livre criação preservam números distintos", () => {
  for (const programa of ["KIDS_01", "KIDS_02"]) {
    assert.deepEqual(casasDoPrograma(programa).filter((c) => c.nome === "Livre criação").map((c) => c.numero), [14, 15, 25]);
  }
});

test("Atenção e Respeito invertem entre Kids 01 e Kids 02", () => {
  assert.equal(marcoAposCasa("KIDS_01", 4)?.titulo, "Atenção");
  assert.equal(marcoAposCasa("KIDS_01", 9)?.titulo, "Respeito");
  assert.equal(marcoAposCasa("KIDS_02", 4)?.titulo, "Respeito");
  assert.equal(marcoAposCasa("KIDS_02", 9)?.titulo, "Atenção");
});

test("marcos de grau técnico e troca de faixa são referências, não presença", () => {
  for (const programa of ["KIDS_01", "KIDS_02"]) {
    assert.equal(marcoAposCasa(programa, 14)?.tipo, "GRAU_TECNICO");
    assert.equal(marcoAposCasa(programa, 23)?.tipo, "GRAU_TECNICO");
    assert.equal(marcoAposCasa(programa, 27)?.tipo, "TROCA_FAIXA");
  }
});
