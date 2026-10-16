/**
 * Currículo compartilhado dos programas Kids 01 e Kids 02.
 * Fonte: Notion da Ducks Jiu-Jitsu, bancos Módulos e Missões (16/10/2026).
 * Apenas os Módulos 1 e 2 foram considerados revisados pela academia para o MVP.
 * As descrições para famílias são resumos editoriais dos campos oficiais;
 * não descrevem avaliação de domínio nem desempenho individual do aluno.
 */
export interface MissaoCurricular {
  id: string;
  numero: number;
  numeroNoModulo: number;
  moduloId: number;
  nome: string;
  resumoFamilia: string;
  objetivoPedagogico: string;
  tema: string;
  fonteNotion: string;
}

export interface ModuloCurricular {
  id: number;
  nome: string;
  tema: string;
  descricaoFamilia: string;
  objetivoGeral: string;
  fonteNotion: string;
  missoes: readonly MissaoCurricular[];
}

export interface ModuloEmDesenvolvimento {
  id: number;
  situacao: "EM_DESENVOLVIMENTO";
}

export const MODULOS_EM_DESENVOLVIMENTO: readonly ModuloEmDesenvolvimento[] = [
  { id: 3, situacao: "EM_DESENVOLVIMENTO" },
  { id: 4, situacao: "EM_DESENVOLVIMENTO" },
];

export const MODULOS_PUBLICADOS: readonly ModuloCurricular[] = [
  {
    id: 1,
    nome: "Postura no Tatame",
    tema: "Postura dentro do tatame: do próprio corpo ao primeiro contato",
    descricaoFamilia: "A turma aprende a se equilibrar, se movimentar com segurança, seguir regras e cooperar. É o primeiro contato com as pegadas e as posições de guarda no jiu-jitsu.",
    objetivoGeral: "Equilíbrio, lateralidade, coordenação, raciocínio rápido e compreensão das regras, culminando no primeiro contato físico controlado (pegadas) e na primeira posição de guarda (Guarda Fechada). Kids 2 trabalha os mesmos elementos com maior exigência técnica e de sustentação.",
    fonteNotion: "https://app.notion.com/5f620685058c83ef82248187d3828251",
    missoes: [
      {
        id: "missao-1", numero: 1, numeroNoModulo: 1, moduloId: 1,
        nome: "O Mergulho da Águia",
        resumoFamilia: "Equilíbrio e quedas seguras são a base para aprender as primeiras pegadas e entrar nas posições de guarda com cuidado.",
        objetivoPedagogico: "Desenvolver equilíbrio e queda segura como pré-requisitos de qualquer disputa futura.",
        tema: "Pegada de gola e manga, puxando para guarda aberta e guarda fechada (Kids 2: com resistência leve do parceiro e maior exigência de tempo)",
        fonteNotion: "https://app.notion.com/55d20685058c82dead2901cb7338b4c3",
      },
      {
        id: "missao-2", numero: 2, numeroNoModulo: 2, moduloId: 1,
        nome: "O Pulo do Gato",
        resumoFamilia: "A criança treina coordenação e decisões rápidas ao passar da guarda para uma posição de controle lateral.",
        objetivoPedagogico: "Desenvolver coordenação motora e velocidade de decisão, fechando o primeiro checkpoint técnico da trilha.",
        tema: "Saindo da guarda fechada, passagem de guarda paralela, entrada no 100kg 3",
        fonteNotion: "https://app.notion.com/5ac20685058c8275806f81c46eaa2ad0",
      },
      {
        id: "missao-3", numero: 3, numeroNoModulo: 3, moduloId: 1,
        nome: "O Peso do Elefante",
        resumoFamilia: "Aprender a controlar a posição em dupla, com respeito pelo colega, avançando da passagem de guarda para a montada.",
        objetivoPedagogico: "Introduzir contato físico controlado em dupla, com cuidado pelo colega.",
        tema: "Aperfeiçoamento da passagem e do 100kg 3, avanço para a montada",
        fonteNotion: "https://app.notion.com/47320685058c83cebe37016627928b63",
      },
      {
        id: "missao-4", numero: 4, numeroNoModulo: 4, moduloId: 1,
        nome: "O Trono do Leão",
        resumoFamilia: "A turma reúne os movimentos do mês em uma sequência e participa de uma avaliação de técnica, raciocínio e atitudes no tatame.",
        objetivoPedagogico: "Fechar a cadeia técnica do mês e realizar a avaliação final do Módulo 1 em 3 blocos: (1) técnica — demonstração da cadeia completa; (2) verbal — leitura F.O.F.A. aplicada em combate leve (Força, Oportunidade, Fraqueza, Ameaça); (3) comportamental — mais apresentação do Desafio do Mês (Postura / Caça às Frutas). Os três blocos alimentam o Cartão de Frequência oficial (itens técnicos: Técnica, Equilíbrio, Postura, Execução, Força; itens comportamentais: Disciplina, Concentração, Confiança, Persistência).",
        tema: "Consolidar a montada, adversário derruba com uma ponte, o ciclo recomeça",
        fonteNotion: "https://app.notion.com/c8e20685058c820d8bd381049d2c2dd9",
      },
    ],
  },
  {
    id: 2,
    nome: "Do Controle para as Costas",
    tema: "Do 100kg 3 ao controle de costas (seat belt): uma cadeia técnica complexa, decomposta em fios simples ao longo do mês.",
    descricaoFamilia: "O objetivo é aprender uma sequência de controle: sair da posição lateral, usar ganchos e rolamentos e chegar às costas do colega com estratégia.",
    objetivoGeral: "Avançar a partir do 100kg 3 até o controle total das costas do adversário (seat belt), decompondo uma técnica complexa em fios simples ao longo do mês (palavra do mês: Complexo), reforçando o F.O.F.A. antes de cada combate controlado.",
    fonteNotion: "https://app.notion.com/03620685058c83a483a2814e831bbcb6",
    missoes: [
      {
        id: "missao-5", numero: 5, numeroNoModulo: 1, moduloId: 2,
        nome: "O Amasso do Touro Sentado",
        resumoFamilia: "Treinar pressão e equilíbrio de base para manter o controle lateral, sem depender apenas de força.",
        objetivoPedagogico: "Desenvolver pressão e controle de base a partir do 100kg 3, iniciando a cadeia técnica do mês.",
        tema: "A partir do 100kg 3, ré pressionando o adversário, puxada da perna de fora",
        fonteNotion: "https://app.notion.com/bc620685058c82fc83f101b838179cdd",
      },
      {
        id: "missao-6", numero: 6, numeroNoModulo: 2, moduloId: 2,
        nome: "A Armadilha do Macaco",
        resumoFamilia: "Usar o gancho de perna no momento certo para perceber que planejar uma ação pode ser mais importante do que agir depressa.",
        objetivoPedagogico: "Desenvolver o uso de recursos guardados (gancho de perna) no momento certo, aplicando o Planejamento.",
        tema: "Gancho na perna de fora do oponente, puxada da perna do adversário",
        fonteNotion: "https://app.notion.com/57a20685058c83ae94d881aadbd20b3a",
      },
      {
        id: "missao-7", numero: 7, numeroNoModulo: 3, moduloId: 2,
        nome: "O Giro do Tatu",
        resumoFamilia: "Aprender a recuperar a posição com pegadas precisas e um rolamento pelo ombro, exercitando persistência e autocontrole.",
        objetivoPedagogico: "Desenvolver a recuperação de posição após ser projetado, unindo precisão de pegada e rolamento.",
        tema: "Cotovelo no chão, pegada na calça, rolamento pelo ombro",
        fonteNotion: "https://app.notion.com/dae20685058c829aa29a8124f68fac6c",
      },
      {
        id: "missao-8", numero: 8, numeroNoModulo: 4, moduloId: 2,
        nome: "O Abraço do Polvo",
        resumoFamilia: "Juntar os movimentos do mês, chegar ao controle das costas e revisar o que a turma aprendeu.",
        objetivoPedagogico: "Fechar a cadeia técnica do mês com o controle total das costas, consolidando Planejamento e Complexo.",
        tema: "Fechar a cadeia do 100kg 3 ao seat belt (costas controladas)",
        fonteNotion: "https://app.notion.com/dc020685058c83a5852881a0b19e1979",
      },
    ],
  },
];

export function moduloPublicado(id: number): ModuloCurricular | undefined {
  return MODULOS_PUBLICADOS.find((modulo) => modulo.id === id);
}

export function missaoPublicada(id: string): MissaoCurricular | undefined {
  return MODULOS_PUBLICADOS.flatMap((modulo) => modulo.missoes).find((missao) => missao.id === id);
}

/** Identificador válido para a missão da turma, sem progresso individual. */
export function validarMissaoAtual(missaoId: string | null): MissaoCurricular | null {
  return missaoId ? (missaoPublicada(missaoId) ?? null) : null;
}
