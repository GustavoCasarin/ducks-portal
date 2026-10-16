"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, BookOpenText, CheckCircle2, CircleAlert, Save, ShieldAlert, Users } from "lucide-react";
import { MODULOS_PUBLICADOS, missaoPublicada } from "@/lib/catalogoJornada";
import { definirMissaoAtualDaTurma, useMissaoAtualDaTurma } from "@/lib/jornada-turma-store";
import { turmasDemo } from "@/lib/professorDemo";

export default function JornadaProfessor() {
  const [turmaId, setTurmaId] = useState(turmasDemo[0].id);
  const atual = useMissaoAtualDaTurma(turmaId);
  const [rascunhos, setRascunhos] = useState<Record<string, string>>({});
  const [aviso, setAviso] = useState("");
  const missaoId = rascunhos[turmaId] ?? atual?.id ?? "missao-1";
  const selecionada = missaoPublicada(missaoId);
  const moduloId = selecionada?.moduloId ?? 1;
  const modulo = MODULOS_PUBLICADOS.find((item) => item.id === moduloId) ?? MODULOS_PUBLICADOS[0];

  function mudarModulo(id: number) {
    const novo = MODULOS_PUBLICADOS.find((item) => item.id === id);
    if (!novo) return;
    setRascunhos((antes) => ({ ...antes, [turmaId]: novo.missoes[0].id }));
    setAviso("");
  }

  function salvar() {
    try {
      definirMissaoAtualDaTurma(turmaId, missaoId);
      setAviso("Missão atual desta turma registrada na demonstração. Confira no Portal do Aluno, neste mesmo navegador.");
    } catch {
      setAviso("Não foi possível salvar. Verifique se o navegador permite armazenamento local.");
    }
  }

  function limpar() {
    try {
      definirMissaoAtualDaTurma(turmaId, null);
      setAviso("Seleção da missão atual removida desta turma.");
    } catch {
      setAviso("Não foi possível remover a seleção neste navegador.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F11] text-zinc-100">
      <header className="border-b border-zinc-800 bg-[#18181B] px-4 py-5">
        <div className="mx-auto max-w-3xl">
          <Link href="/professor" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Voltar ao painel</Link>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#FF6B00]">DUCKS · PLANEJAMENTO DA TURMA</p>
          <h1 className="mt-1 text-2xl font-extrabold">Missão atual da turma</h1>
          <p className="mt-2 text-sm text-zinc-400">Selecione o módulo e a missão trabalhados com a turma inteira. A seleção não avalia nem altera o progresso individual dos alunos.</p>
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-5 px-4 py-6 pb-14">
        <div role="note" className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-100">
          <ShieldAlert aria-hidden="true" className="h-5 w-5 shrink-0" /> <p><strong>Modo demonstração, sem autenticação.</strong> A missão é salva apenas neste navegador. Não há sincronização entre dispositivos ou gravação no banco de dados.</p>
        </div>
        <section className="space-y-4 rounded-2xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6">
          <div>
            <label htmlFor="turma-jornada" className="mb-2 flex items-center gap-2 text-xs font-bold text-zinc-300"><Users aria-hidden="true" className="h-4 w-4 text-orange-400" /> Turma</label>
            <select id="turma-jornada" value={turmaId} onChange={(e) => { setTurmaId(e.target.value); setAviso(""); }} className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-white">
              {turmasDemo.map((turma) => <option key={turma.id} value={turma.id}>{turma.nome}</option>)}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="modulo-jornada" className="mb-2 block text-xs font-bold text-zinc-300">Módulo atual</label>
              <select id="modulo-jornada" value={moduloId} onChange={(e) => mudarModulo(Number(e.target.value))} className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-white">
                {MODULOS_PUBLICADOS.map((item) => <option key={item.id} value={item.id}>Módulo {item.id} · {item.nome}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="missao-jornada" className="mb-2 block text-xs font-bold text-zinc-300">Missão trabalhada</label>
              <select id="missao-jornada" value={missaoId} onChange={(e) => { setRascunhos((antes) => ({ ...antes, [turmaId]: e.target.value })); setAviso(""); }} className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-white">
                {modulo.missoes.map((item) => <option key={item.id} value={item.id}>Missão {item.numeroNoModulo} · {item.nome}</option>)}
              </select>
            </div>
          </div>
          {selecionada && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#FF6B00]"><BookOpenText aria-hidden="true" className="h-4 w-4" /> Visão que os pais receberão</p>
              <h2 className="mt-2 text-base font-extrabold">{selecionada.nome}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{selecionada.resumoFamilia}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={salvar} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#FF6B00] px-4 text-sm font-extrabold text-black hover:bg-orange-400"><Save aria-hidden="true" className="h-4 w-4" /> Definir missão da turma</button>
            {atual && <button type="button" onClick={limpar} className="min-h-12 rounded-xl border border-zinc-700 px-4 text-sm text-zinc-300 hover:border-zinc-500">Limpar seleção</button>}
          </div>
          {aviso && <p role="status" className="text-sm text-orange-300">{aviso}</p>}
        </section>
        <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
          <p className="flex items-center gap-2 text-sm font-bold"><CheckCircle2 aria-hidden="true" className="h-5 w-5 text-emerald-400" /> Missão atualmente registrada</p>
          <p className="mt-2 text-sm text-zinc-300">{atual ? `Módulo ${atual.moduloId} · Missão ${atual.numeroNoModulo}: ${atual.nome}` : "Nenhuma missão definida para esta turma."}</p>
          <Link href="/jornada" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#FF6B00] hover:text-orange-300">Conferir a visão dos pais <span aria-hidden="true">→</span></Link>
          {turmaId !== "kids-01-demo" && <p className="mt-2 text-xs text-zinc-500">A prévia pública usa o aluno fictício da Kids 01. Para Kids 02, a seleção fica salva por turma, mas aparecerá quando houver um aluno demonstrativo daquela turma.</p>}
        </section>
        <p className="flex gap-2 text-xs leading-relaxed text-zinc-500"><CircleAlert aria-hidden="true" className="h-4 w-4 shrink-0" /> Apenas os módulos 1 e 2 estão disponíveis. Módulos posteriores aguardam a revisão pedagógica da academia.</p>
      </main>
    </div>
  );
}
