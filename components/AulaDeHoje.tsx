"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpenText, CalendarCheck2, ChartNoAxesCombined, Check, ClipboardCheck, Library, Medal, ShieldAlert, Users, X } from "lucide-react";
import { turmasDemo, conteudosDiaDemo } from "@/lib/professorDemo";
import { useMissaoAtualDaTurma } from "@/lib/jornada-turma-store";
import { dinamicasDemo, type PlanoDemo } from "@/lib/planejamentoDemo";
import { atualizarPlanosDemo, usePlanosDemo } from "@/lib/planejamento-store";
import { registrarChamada, registrarCarimbo, vincularPlanoRealizado, type SituacaoDemo } from "@/lib/registrosDemo";
import { atualizarRegistrosDemo, useRegistrosDemo } from "@/lib/registros-store";

function hojeLocal() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function mesmo(a: Record<string, SituacaoDemo>, b?: Record<string, SituacaoDemo>) {
  return !!b && Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((id) => a[id] === b[id]);
}

export default function AulaDeHoje() {
  const [turmaId, setTurmaId] = useState(turmasDemo[0].id);
  const [data, setData] = useState(hojeLocal);
  const [rascunhos, setRascunhos] = useState<Record<string, Record<string, SituacaoDemo>>>({});
  const [conteudoId, setConteudoId] = useState<string>(conteudosDiaDemo[0].id);
  const [mensagem, setMensagem] = useState("");
  const turma = turmasDemo.find((x) => x.id === turmaId) ?? turmasDemo[0];
  const dados = useRegistrosDemo();
  const planos = usePlanosDemo();
  const missao = useMissaoAtualDaTurma(turmaId);
  const atual = dados.aulas.find((a) => a.turmaId === turmaId && a.data === data);
  const chave = `${turmaId}:${data}`;
  const presencas = rascunhos[chave] ?? atual?.presencas ?? {};
  const salva = mesmo(presencas, atual?.presencas);
  const presentes = turma.alunos.filter((x) => presencas[x.id] === "PRESENTE");
  const faltas = turma.alunos.filter((x) => presencas[x.id] === "FALTA");
  const pendentes = turma.alunos.length - presentes.length - faltas.length;
  const plano = [...planos].reverse().find((p) => p.turmaId === turmaId && p.missaoId === missao?.id && p.situacao === "PLANEJADA");
  const planoDaAula = planos.find((p) => p.id === atual?.planoRealizadoId);
  const dinamica = plano ? dinamicasDemo.find((d) => d.id === plano.dinamicaId) : null;

  function todosPresentes() {
    setRascunhos((old) => ({ ...old, [chave]: Object.fromEntries(turma.alunos.map((x) => [x.id, "PRESENTE" as const])) }));
    setMensagem("Chamada marcada. Ajuste as faltas e clique em Salvar chamada.");
  }
  function alternar(id: string) {
    setRascunhos((old) => ({ ...old, [chave]: { ...presencas, [id]: presencas[id] === "PRESENTE" ? "FALTA" : "PRESENTE" } }));
    setMensagem("");
  }
  function salvarChamada() {
    try {
      atualizarRegistrosDemo((r) => registrarChamada(r, turmaId, data, turma.alunos.map((x) => x.id), presencas));
      setMensagem(atual && !mesmo(presencas, atual.presencas)
        ? "Chamada corrigida. Para evitar inconsistências, o carimbo anterior dessa aula foi apagado: confirme o conteúdo novamente."
        : "Chamada salva nesta demonstração; veja as presenças em /aulas neste navegador.");
    } catch (e) { setMensagem(e instanceof Error ? e.message : "Não foi possível salvar a chamada."); }
  }
  function salvarCarimbo() {
    if (!salva) { setMensagem("Salve a chamada antes do carimbo."); return; }
    try {
      atualizarRegistrosDemo((r) => registrarCarimbo(r, turmaId, data, conteudoId));
      setMensagem(`Carimbo salvo para ${presentes.length} aluno(s) presente(s), somente na demonstração.`);
    } catch (e) { setMensagem(e instanceof Error ? e.message : "Não foi possível registrar carimbos."); }
  }
  function confirmarDinamica(pl: PlanoDemo) {
    if (!salva) { setMensagem("Salve a chamada antes de registrar a dinâmica realizada."); return; }
    try {
      // Primeiro confirma a realização no histórico existente do Banco de Dinâmicas.
      atualizarPlanosDemo((anteriores) => anteriores.map((p) => p.id === pl.id && p.situacao === "PLANEJADA"
        ? { ...p, situacao: "REALIZADA", realizadaEm: new Date().toISOString() } : p));
      atualizarRegistrosDemo((r) => vincularPlanoRealizado(r, turmaId, data, pl.id));
      setMensagem("Dinâmica marcada como realizada e vinculada a esta aula demonstrativa.");
    } catch { setMensagem("Não foi possível confirmar a dinâmica neste navegador."); }
  }

  return <div className="min-h-screen bg-[#0F0F11] pb-16 text-zinc-100">
    <header className="border-b border-zinc-800 bg-[#18181B] px-4 py-5"><div className="mx-auto max-w-5xl">
      <p className="text-xs font-black tracking-[0.2em] text-[#FF6B00]">DUCKS JIU-JITSU · PROFESSOR</p>
      <h1 className="mt-1 text-2xl font-extrabold">Aula de Hoje</h1>
      <p className="mt-2 text-sm text-zinc-400">Uma rotina rápida: chamada, dinâmica realizada e carimbo. PMA permanece mensal.</p>
      <nav aria-label="Ferramentas do professor" className="mt-4 flex flex-wrap gap-2 text-xs">
        <Link href="/professor/jornada" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zinc-700 px-3 text-zinc-200"><BookOpenText className="h-4 w-4 text-orange-400" /> Missão da turma</Link>
        <Link href="/professor/planejamento" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zinc-700 px-3 text-zinc-200"><Library className="h-4 w-4 text-orange-400" /> Banco de Dinâmicas</Link>
        <Link href="/professor/avaliacoes" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-orange-500/50 px-3 text-orange-300"><ChartNoAxesCombined className="h-4 w-4" /> Avaliação PMA mensal</Link>
        <Link href="/" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-zinc-700 px-3 text-zinc-400">Portal dos pais</Link>
      </nav>
    </div></header>
    <main className="mx-auto max-w-5xl space-y-4 px-4 py-6">
      <p className="flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-100"><ShieldAlert className="h-4 w-4 shrink-0" /> Demonstração pública sem autenticação. Alunos e carimbos são fictícios. Os registros ficam apenas neste navegador; não use dados reais.</p>
      <section className="grid gap-3 rounded-2xl border border-zinc-800 bg-[#18181B] p-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-zinc-300"><Users className="mr-1 inline h-4 w-4 text-orange-400" /> Turma
          <select value={turmaId} onChange={(e) => { setTurmaId(e.target.value); setMensagem(""); }} className="mt-2 min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-white">
            {turmasDemo.map((x) => <option key={x.id} value={x.id}>{x.nome}</option>)}
          </select>
        </label>
        <label className="text-xs font-bold text-zinc-300"><CalendarCheck2 className="mr-1 inline h-4 w-4 text-orange-400" /> Data da aula
          <input type="date" value={data} max={hojeLocal()} onChange={(e) => { setData(e.target.value); setMensagem(""); }} className="mt-2 min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-white" />
        </label>
        <div className="sm:col-span-2 rounded-xl bg-zinc-900 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-400">Missão da turma</p>
          {missao ? <><p className="mt-1 font-bold">{missao.nome}</p><p className="text-xs text-zinc-400">Módulo {missao.moduloId} · Missão {missao.numeroNoModulo} de 4</p></>
            : <p className="mt-1 text-sm text-zinc-400">Ainda não definida. <Link className="font-bold text-orange-400 underline" href="/professor/jornada">Definir missão</Link></p>}
        </div>
      </section>
      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="flex items-center justify-between gap-2"><h2 className="flex items-center gap-2 font-bold"><ClipboardCheck className="h-5 w-5 text-[#FF6B00]" /> 1. Chamada rápida</h2>
          <span className={`text-xs ${salva ? "text-emerald-400" : "text-amber-300"}`}>{salva ? "Salva" : "Pendente"}</span></div>
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-zinc-900 p-3 text-center text-xs">
          <div><strong className="block text-lg text-emerald-400">{presentes.length}</strong> Presentes</div>
          <div><strong className="block text-lg text-rose-400">{faltas.length}</strong> Faltas</div>
          <div><strong className="block text-lg text-amber-400">{pendentes}</strong> A conferir</div>
        </div>
        <button type="button" onClick={todosPresentes} className="mt-3 min-h-11 w-full rounded-lg border border-orange-500/60 bg-orange-500/10 text-sm font-bold text-orange-300">Marcar todos presentes</button>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {turma.alunos.map((a) => <button type="button" key={a.id} onClick={() => alternar(a.id)}
            aria-label={`${a.nome}, ${presencas[a.id] === "PRESENTE" ? "presente" : presencas[a.id] === "FALTA" ? "ausente" : "não conferido"}: alterar presença`}
            className="flex min-h-12 items-center justify-between gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-left text-sm">
            <span className="font-medium">{a.nome}</span>
            {presencas[a.id] === "PRESENTE" ? <span className="inline-flex gap-1 text-emerald-400"><Check className="h-4 w-4" /> Presente</span> : presencas[a.id] === "FALTA" ? <span className="inline-flex gap-1 text-rose-400"><X className="h-4 w-4" /> Falta</span> : <span className="text-amber-300">Pendente</span>}
          </button>)}
        </div>
        <button type="button" disabled={salva || pendentes !== 0 || !data || data > hojeLocal()} onClick={salvarChamada}
          className="mt-4 min-h-12 w-full rounded-xl bg-[#FF6B00] px-3 font-bold text-black disabled:cursor-not-allowed disabled:opacity-40">{atual ? "Salvar correção da chamada" : "Salvar chamada"}</button>
      </section>
      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <h2 className="flex items-center gap-2 font-bold"><Library className="h-5 w-5 text-[#FF6B00]" /> 2. Dinâmica da aula</h2>
        {planoDaAula ? <p className="mt-3 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">Realizada nesta aula: {dinamicasDemo.find((x) => x.id === planoDaAula.dinamicaId)?.nome ?? "Dinâmica"}.</p>
          : plano && dinamica ? <div className="mt-3 space-y-3"><p className="text-sm text-zinc-300">Planejada: <strong>{dinamica.nome}</strong> ({dinamica.duracao} min)</p>
            <button type="button" disabled={!salva} onClick={() => confirmarDinamica(plano)} className="min-h-11 rounded-lg border border-orange-500/60 px-4 text-sm font-bold text-orange-300 disabled:opacity-40">Confirmar realização</button></div>
          : <p className="mt-2 text-sm text-zinc-400">Nenhuma dinâmica pendente para a missão atual. Planeje no <Link className="text-orange-400 underline" href="/professor/planejamento">Banco de Dinâmicas</Link>. Você pode concluir a chamada sem dinâmica.</p>}
      </section>
      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <h2 className="flex items-center gap-2 font-bold"><Medal className="h-5 w-5 text-[#FF6B00]" /> 3. Carimbo do dia</h2>
        <p className="mt-2 text-sm text-zinc-400">Selecione um conteúdo efetivamente trabalhado. Somente alunos presentes recebem o carimbo.</p>
        <label className="mt-3 block text-xs text-zinc-300">Conteúdo ou palavra-âncora
          <select value={conteudoId} onChange={(e) => setConteudoId(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm text-white">
            {conteudosDiaDemo.map((x) => <option key={x.id} value={x.id}>{x.nome}</option>)}
          </select>
        </label>
        {atual?.carimbo && <p className="mt-3 text-xs text-emerald-400">Já registrado: {conteudosDiaDemo.find((x) => x.id === atual.carimbo?.conteudoId)?.nome} · {atual.carimbo.alunoIds.length} aluno(s).</p>}
        <button type="button" onClick={salvarCarimbo} disabled={!salva || presentes.length === 0} className="mt-3 min-h-12 w-full rounded-xl bg-[#FF6B00] px-3 font-bold text-black disabled:opacity-40">{atual?.carimbo ? "Atualizar carimbo da aula" : "Registrar carimbo"}</button>
      </section>
      {mensagem && <p role="status" className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4 text-sm text-orange-300">{mensagem}</p>}
      <p className="text-xs text-zinc-500">No protótipo, a alteração da chamada cancela os carimbos desta aula para impedir dados divergentes. A integração segura com banco e histórico de alterações será feita depois.</p>
    </main>
  </div>;
}
