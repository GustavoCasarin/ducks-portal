/** Critério provisório do protótipo. Confirmar pesos com a metodologia Ducks. */
export interface NotasPMA {
  atencao: number;
  disciplina: number;
  respeito: number;
  tecnica: number;
}

export interface ResultadoPMA {
  comportamental: number;
  tecnico: number;
  geral: number;
}

const arredondar = (valor: number) => Math.round(valor * 100) / 100;

/** Calcula a prévia de PMA; a regra oficial deverá ser validada antes de produção. */
export function calcularPMA(notas: NotasPMA): ResultadoPMA {
  const valores = Object.values(notas);
  if (valores.some((valor) => !Number.isFinite(valor) || valor < 1 || valor > 10)) {
    throw new RangeError("As notas do PMA devem estar entre 1 e 10.");
  }

  const comportamental = (notas.atencao + notas.disciplina + notas.respeito) / 3;
  const tecnico = notas.tecnica;
  return {
    comportamental: arredondar(comportamental),
    tecnico: arredondar(tecnico),
    geral: arredondar((comportamental + tecnico) / 2),
  };
}
