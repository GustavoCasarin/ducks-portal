"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChartNoAxesCombined, Info, TrendingUp } from "lucide-react";
import { alunoDemo } from "@/lib/alunoDemo";
import { calcularPMA } from "@/lib/pma";
import { avaliacoesDeAluno, variacaoPMA } from "@/lib/registrosDemo";
import { useRegistrosDemo } from "@/lib/registros-store";

type Metrica = "geral" | "tecnico" | "comportamental";
const metricaInfo: { id: Metrica; titulo: string; cor: string }[] = [
  { id: "geral", titulo: "PMA Geral", cor: "#ff6b00" },
  { id: "tecnico", titulo: "Técnico", cor: "#60a5fa" },
  { id: "comportamental", titulo: "Comportamento", cor: "#fbbf24" },
];
function mesNome(mes: string, longo = false) {
  const [ano, numero] = mes.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { month: longo ? "long" : "short", year: longo ? "numeric" : undefined })
    .format(new Date(ano, numero - 1, 1));
}
function mostrar(valor: number) { return valor.toFixed(2).replace(".", ","); }

export default function EvolucaoAluno() {
  const registros = useRegistrosDemo();
  const historico = avaliacoesDeAluno(registros, "a1"); // aluno demonstrativo do portal atual
  const [metrica, setMetrica] = useState<Metrica>("geral");
  const [competenciaSelecionada, setCompetenciaSelecionada] = useState<string | null>(null);
  const ultimo = historico.at(-1);
  const anterior = historico.at(-2);
  const delta = ultimo ? variacaoPMA(ultimo, anterior) : null;
  const detalhe = historico.find((x) => x.competencia === competenciaSelecionada) ?? ultimo;
  const dados = historico.map((item) => ({ competencia: item.competencia, ...calcularPMA(item.notas) }));
  const serie = metricaInfo.find((m) => m.id === metrica)!;
  const pontos = dados.map((d, i) => ({ x: dados.length === 1 ? 170 : 30 + i * 280 / (dados.length - 1), y: 150 - d[metrica] * 12, valor: d[metrica] }));

  return (
    <div className="min-h-screen bg-[#0F0F11] pb-16 text-zinc-100">
      <header className="border-b border-zinc-800 bg-[#18181B] px-4 py-5">
        <div className="mx-auto max-w-xl">
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 text-sm text-orange-400"><ArrowLeft className="h-4 w-4" /> Voltar ao início</Link>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#FF6B00]">DUCKS · PORTAL DO ALUNO</p>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-extrabold"><ChartNoAxesCombined className="h-6 w-6 text-[#FF6B00]"/> Minha evolução PMA</h1>
          <p className="mt-2 text-sm text-zinc-400">Avaliações mensais de {alunoDemo.nome} · notas de 1 a 10</p>
        </div>
      </header>
      <main className="mx-auto max-w-xl space-y-4 px-4 py-5">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-100">
          <strong>Demonstração com dados fictícios.</strong> Pesos do PMA ainda dependem de validação da academia. As avaliações ficam somente neste navegador.
        </div>
        {!ultimo ? (
          <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-6 text-center text-zinc-300">Ainda não há avaliações mensais. Quando o professor registrar o primeiro PMA, o histórico aparecerá aqui.</div>
        ) : (
          <>
            <section className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
                <p className="text-xs text-zinc-400">PMA Geral · {mesNome(ultimo.competencia)}</p>
                <p className="mt-1 text-3xl font-extrabold tabular-nums text-[#FF6B00]">{mostrar(calcularPMA(ultimo.notas).geral)}</p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
                <p className="text-xs text-zinc-400">Comparação mensal</p>
                <p className="mt-1 flex items-center gap-1 text-2xl font-bold tabular-nums">
                  {delta === null ? "—" : `${delta > 0 ? "+" : ""}${mostrar(delta)}`}
                  {delta !== null && delta > 0 && <TrendingUp className="h-4 w-4 text-emerald-400" />}
                </p>
                <p className="text-[11px] text-zinc-500">{delta === null ? "Sem mês anterior" : `vs. ${mesNome(anterior!.competencia)}`}</p>
              </div>
            </section>
            <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
              <h2 className="text-sm font-bold">Evolução ao longo dos meses</h2>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Escolher indicador do gráfico">
                {metricaInfo.map((m) => (
                  <button key={m.id} type="button" aria-pressed={metrica === m.id} onClick={() => setMetrica(m.id)}
                    className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-bold ${metrica === m.id ? "border-orange-500 bg-orange-500/10 text-white" : "border-zinc-700 text-zinc-400"}`}>
                    {m.titulo}
                  </button>
                ))}
              </div>
              <svg viewBox="0 0 340 190" role="img" aria-label={`Gráfico ${serie.titulo}: ${dados.map((d) => `${mesNome(d.competencia)} ${mostrar(d[metrica])}`).join(", ")}`} className="mt-3 w-full">
                {[0, 5, 10].map((n) => <g key={n}>
                  <line x1="30" y1={150 - n * 12} x2="310" y2={150 - n * 12} stroke="#3f3f46" strokeDasharray="3 4" />
                  <text x="23" y={154 - n * 12} fill="#a1a1aa" fontSize="10" textAnchor="end">{n}</text>
                </g>)}
                {pontos.length > 1 && <polyline fill="none" stroke={serie.cor} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"
                  points={pontos.map((p) => `${p.x},${p.y}`).join(" ")} />}
                {pontos.map((p, i) => <g key={dados[i].competencia}>
                  <circle cx={p.x} cy={p.y} r="4.5" fill={serie.cor} stroke="#18181b" strokeWidth="2" />
                  <text x={p.x} y="170" fill="#d4d4d8" fontSize="10" textAnchor="middle">{mesNome(dados[i].competencia)}</text>
                </g>)}
              </svg>
              <p className="text-xs text-zinc-500"><Info className="mr-1 inline h-3 w-3" /> Mudanças na nota não são, isoladamente, medidas de sucesso ou regressão.</p>
            </section>
            <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
              <h2 className="text-sm font-bold">Histórico de avaliações</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {[...historico].reverse().map((item) => <button key={item.competencia} type="button" onClick={() => setCompetenciaSelecionada(item.competencia)}
                  aria-pressed={detalhe?.competencia === item.competencia}
                  className={`min-h-10 rounded-lg border px-3 text-xs ${detalhe?.competencia === item.competencia ? "border-[#FF6B00] text-orange-300" : "border-zinc-700 text-zinc-400"}`}>
                  {mesNome(item.competencia, true)}
                </button>)}
              </div>
              {detalhe && <div className="mt-4 space-y-3 rounded-xl bg-zinc-900 p-4">
                <p className="font-bold">{mesNome(detalhe.competencia, true)}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {(["atencao", "disciplina", "respeito", "tecnica"] as const).map((key) => <div key={key} className="flex justify-between gap-2 border-b border-zinc-800 pb-2">
                    <span className="capitalize text-zinc-400">{key === "tecnica" ? "Técnica" : key === "atencao" ? "Atenção" : key === "disciplina" ? "Disciplina" : "Respeito"}</span>
                    <strong>{detalhe.notas[key]}</strong>
                  </div>)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div><p className="text-zinc-500">Comport.</p><strong className="text-amber-400">{mostrar(calcularPMA(detalhe.notas).comportamental)}</strong></div>
                  <div><p className="text-zinc-500">Técnico</p><strong className="text-blue-400">{mostrar(calcularPMA(detalhe.notas).tecnico)}</strong></div>
                  <div><p className="text-zinc-500">Geral</p><strong className="text-orange-400">{mostrar(calcularPMA(detalhe.notas).geral)}</strong></div>
                </div>
                {detalhe.observacao && <div><p className="text-xs font-bold text-zinc-300">Observação do professor</p><p className="mt-1 text-sm text-zinc-400">{detalhe.observacao}</p></div>}
              </div>}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
