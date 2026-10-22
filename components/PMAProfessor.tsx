"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChartNoAxesCombined, ShieldAlert } from "lucide-react";
import { turmasDemo } from "@/lib/professorDemo";
import { calcularPMA, type NotasPMA } from "@/lib/pma";
import { avaliacoesDeAluno, competenciaValida, guardarAvaliacao } from "@/lib/registrosDemo";
import { atualizarRegistrosDemo, useRegistrosDemo } from "@/lib/registros-store";

const PADRAO: NotasPMA = { atencao: 7, disciplina: 7, respeito: 7, tecnica: 7 };
const CHAVES: { key: keyof NotasPMA; label: string }[] = [
  { key: "atencao", label: "Atenção" }, { key: "disciplina", label: "Disciplina" },
  { key: "respeito", label: "Respeito" }, { key: "tecnica", label: "Técnica" },
];
function mesAtual() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; }

export default function PMAProfessor() {
  const [turmaId, setTurmaId] = useState(turmasDemo[0].id);
  const turma = turmasDemo.find((x) => x.id === turmaId) ?? turmasDemo[0];
  const [alunoId, setAlunoId] = useState(turma.alunos[0].id);
  const [mes, setMes] = useState(mesAtual);
  const [rascunho, setRascunho] = useState<NotasPMA | null>(null);
  const [notaTexto, setNotaTexto] = useState<string | null>(null);
  const [aviso, setAviso] = useState("");
  const registros = useRegistrosDemo();
  const anterior = avaliacoesDeAluno(registros, alunoId).find((a) => a.competencia === mes);
  const notas = rascunho ?? anterior?.notas ?? PADRAO;
  const observacao = notaTexto ?? anterior?.observacao ?? "";
  const resultado = calcularPMA(notas);

  function salvar() {
    if (!competenciaValida(mes) || mes > mesAtual()) { setAviso("Escolha um mês válido que não esteja no futuro."); return; }
    if (anterior && !window.confirm(`Já existe uma avaliação demonstrativa de ${mes}. Substituir os valores desse mês?`)) return;
    try {
      atualizarRegistrosDemo((base) => guardarAvaliacao(base, {
        alunoId, competencia: mes, notas: { ...notas }, observacao: observacao.trim(), registradaEm: new Date().toISOString(),
      }));
      setRascunho(null); setNotaTexto(null);
      setAviso("Avaliação demonstrativa salva neste navegador. O histórico do aluno foi atualizado.");
    } catch { setAviso("Não foi possível salvar. Confira notas e armazenamento local."); }
  }
  return <div className="min-h-screen bg-[#0F0F11] text-zinc-100">
    <header className="border-b border-zinc-800 bg-[#18181B] px-4 py-5"><div className="mx-auto max-w-2xl">
      <Link href="/professor" className="inline-flex min-h-10 items-center gap-2 text-sm text-orange-400"><ArrowLeft className="h-4 w-4" /> Aula de Hoje</Link>
      <h1 className="mt-3 flex items-center gap-2 text-2xl font-extrabold"><ChartNoAxesCombined className="text-orange-400" /> Avaliação mensal PMA</h1>
      <p className="mt-1 text-sm text-zinc-400">Avalie individualmente uma vez por mês. O histórico anterior permanece consultável.</p>
    </div></header>
    <main className="mx-auto max-w-2xl space-y-4 px-4 py-6 pb-16">
      <p className="flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-100"><ShieldAlert className="h-4 w-4 shrink-0" /> Modo demonstração, com critérios provisórios. Todos os nomes e notas são fictícios.</p>
      <section className="space-y-4 rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs text-zinc-300">Turma
            <select className="mt-2 min-h-11 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-white" value={turmaId} onChange={(e) => { const t = turmasDemo.find((x) => x.id === e.target.value)!; setTurmaId(t.id); setAlunoId(t.alunos[0].id); setRascunho(null); setNotaTexto(null); setAviso(""); }}>
              {turmasDemo.map((x) => <option key={x.id} value={x.id}>{x.nome}</option>)}
            </select>
          </label>
          <label className="text-xs text-zinc-300">Aluno
            <select className="mt-2 min-h-11 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-white" value={alunoId} onChange={(e) => { setAlunoId(e.target.value); setRascunho(null); setNotaTexto(null); setAviso(""); }}>
              {turma.alunos.map((x) => <option key={x.id} value={x.id}>{x.nome}</option>)}
            </select>
          </label>
          <label className="text-xs text-zinc-300">Competência (mês)
            <input aria-label="Mês da avaliação" type="month" max={mesAtual()} value={mes} onChange={(e) => { setMes(e.target.value); setRascunho(null); setNotaTexto(null); setAviso(""); }} className="mt-2 min-h-11 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-white" />
          </label>
        </div>
        {anterior && <p className="rounded-lg bg-zinc-900 p-3 text-xs text-amber-300">Já existe uma avaliação deste mês. Ao salvar novamente, a prévia mensal será substituída, sem criar outro ponto no gráfico.</p>}
        <div className="grid gap-3 sm:grid-cols-2">
          {CHAVES.map(({ key, label }) => <label key={key} className="rounded-xl bg-zinc-900 p-4 text-sm font-bold">
            <span className="flex justify-between"><span>{label}</span><strong className="text-orange-400">{notas[key]}</strong></span>
            <input aria-label={`Nota de ${label}`} type="range" min="1" max="10" step="1" value={notas[key]} onChange={(e) => setRascunho((p) => ({ ...(p ?? notas), [key]: Number(e.target.value) }))} className="mt-4 w-full accent-orange-500" />
          </label>)}
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-zinc-900 p-4 text-center text-xs">
          <div><p className="text-zinc-500">Comport.</p><strong className="text-amber-400">{resultado.comportamental.toFixed(2)}</strong></div>
          <div><p className="text-zinc-500">Técnico</p><strong className="text-blue-400">{resultado.tecnico.toFixed(2)}</strong></div>
          <div><p className="text-zinc-500">Geral</p><strong className="text-orange-400">{resultado.geral.toFixed(2)}</strong></div>
        </div>
        <label className="block text-sm text-zinc-300">Observação opcional (até 280 caracteres)
          <textarea maxLength={280} rows={3} value={observacao} onChange={(e) => setNotaTexto(e.target.value)} placeholder="Contexto da avaliação, sem comparação com outras crianças" className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white" />
        </label>
        <button type="button" onClick={salvar} className="min-h-12 w-full rounded-xl bg-[#FF6B00] px-4 font-bold text-black">Salvar avaliação do mês</button>
        {aviso && <p role="status" className="text-sm text-orange-300">{aviso}</p>}
      </section>
      <p className="text-xs text-zinc-500">As notas e médias são ilustrativas; pesos e critérios oficiais do PMA ainda precisam ser aprovados pela Ducks.</p>
    </main>
  </div>;
}
