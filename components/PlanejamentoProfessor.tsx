"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, BookOpenCheck, CheckCircle2, Clock3, History, Library,
  Plus, RefreshCcw, ShieldAlert, Sparkles, XCircle,
} from "lucide-react";
import { turmasDemo } from "@/lib/professorDemo";
import { MODULOS_PUBLICADOS } from "@/lib/catalogoJornada";
import { useMissaoAtualDaTurma } from "@/lib/jornada-turma-store";
import {
  dinamicasDemo, historicoDinamica, missoesDemo, podeAssociarDinamica,
  type PlanoDemo,
} from "@/lib/planejamentoDemo";
import { atualizarPlanosDemo, limparPlanosDemo, usePlanosDemo } from "@/lib/planejamento-store";

const PERIODO = "2026.2-demo";

export default function PlanejamentoProfessor() {
  const [turmaId, setTurmaId] = useState(turmasDemo[0].id);
  const [missaoId, setMissaoId] = useState<string>(missoesDemo[0].id);
  const [dinamicaId, setDinamicaId] = useState(dinamicasDemo[0].id);
  const planos = usePlanosDemo();
  const [aviso, setAviso] = useState("");

  const turma = turmasDemo.find((t) => t.id === turmaId) ?? turmasDemo[0];
  const missaoAtualDaTurma = useMissaoAtualDaTurma(turmaId);
  const missaoEscolhida = missoesDemo.find((m) => m.id === missaoId) ?? missoesDemo[0];
  const [moduloId, setModuloId] = useState(missaoEscolhida.moduloId);
  const missoesDoModulo = missoesDemo.filter((item) => item.moduloId === moduloId);
  const missao = missoesDemo.find((m) => m.id === missaoId) ?? missoesDemo[0];
  const banco = dinamicasDemo.filter((d) => d.programas.includes(turma.programa));
  const selecionada = banco.find((d) => d.id === dinamicaId);
  const planosContexto = useMemo(() => planos.filter(
    (p) => p.turmaId === turmaId && p.missaoId === missaoId && p.periodo === PERIODO,
  ), [planos, turmaId, missaoId]);
  const ativa = planosContexto.find((p) => p.situacao === "PLANEJADA");

  function alterarTurma(id: string) {
    setTurmaId(id);
    setModuloId(1);
    setMissaoId(missoesDemo[0].id);
    const proxima = turmasDemo.find((t) => t.id === id);
    const primeira = dinamicasDemo.find((d) => d.programas.includes(proxima?.programa ?? "KIDS_01"));
    if (primeira) setDinamicaId(primeira.id);
    setAviso("");
  }

  function associar() {
    if (!selecionada || !podeAssociarDinamica(planos, turmaId, missaoId, PERIODO)) return;
    const novo: PlanoDemo = {
      id: crypto.randomUUID(),
      turmaId, missaoId, dinamicaId, periodo: PERIODO,
      situacao: "PLANEJADA", criadaEm: new Date().toISOString(),
    };
    try {
      atualizarPlanosDemo((anteriores) => [...anteriores, novo]);
      setAviso(`“${selecionada.nome}” foi associada à ${missao.titulo} como PLANEJADA, não realizada.`);
    } catch {
      setAviso("Não foi possível salvar o planejamento neste navegador.");
    }
  }

  function atualizarPlano(id: string, situacao: "REALIZADA" | "CANCELADA") {
    try {
      atualizarPlanosDemo((anteriores) => anteriores.map((p) => p.id === id && p.situacao === "PLANEJADA"
        ? { ...p, situacao, realizadaEm: situacao === "REALIZADA" ? new Date().toISOString() : undefined }
        : p));
      setAviso(situacao === "REALIZADA" ? "Realização confirmada no histórico demonstrativo." : "Planejamento cancelado. A dinâmica continua no catálogo.");
    } catch {
      setAviso("Não foi possível atualizar o planejamento neste navegador.");
    }
  }

  function reiniciar() {
    if (!window.confirm("Apagar somente o histórico fictício de dinâmicas deste navegador?")) return;
    try {
      limparPlanosDemo();
      setAviso("Histórico demonstrativo reiniciado.");
    } catch {
      setAviso("Não foi possível apagar os registros deste navegador.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F11] pb-12 text-zinc-100">
      <header className="border-b border-zinc-800 bg-[#18181B] px-4 py-5">
        <div className="mx-auto max-w-5xl">
          <Link href="/professor" className="inline-flex min-h-11 items-center gap-2 text-sm text-orange-400 hover:text-orange-300">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Voltar ao painel
          </Link>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#FF6B00]">DUCKS · PLANEJAMENTO PEDAGÓGICO</p>
          <h1 className="mt-1 text-2xl font-extrabold">Banco de Dinâmicas</h1>
          <p className="mt-2 text-sm text-zinc-400">Escolha uma atividade para a missão da semana. Planejamento e execução têm históricos separados.</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-5 px-4 py-6">
        <section role="note" className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-200">
          <ShieldAlert aria-hidden="true" className="h-5 w-5 shrink-0" />
          <p><strong>Modo demonstração.</strong> As missões 1 a 8 seguem o catálogo do Notion; alunos e dinâmicas são fictícios. O histórico fica somente neste navegador, sem autenticação ou sincronização com o Supabase.</p>
        </section>

        <section className="grid gap-3 rounded-2xl border border-zinc-800 bg-[#18181B] p-4 sm:grid-cols-3">
          <div>
            <label htmlFor="turma-plano" className="mb-2 block text-xs font-semibold text-zinc-400">Turma</label>
            <select id="turma-plano" value={turmaId} onChange={(e) => alterarTurma(e.target.value)} className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm">
              {turmasDemo.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="modulo-plano" className="mb-2 block text-xs font-semibold text-zinc-400">Módulo</label>
            <select id="modulo-plano" value={moduloId} onChange={(e) => {
              const novo = Number(e.target.value);
              setModuloId(novo);
              setMissaoId(missoesDemo.find((m) => m.moduloId === novo)?.id ?? missoesDemo[0].id);
              setAviso("");
            }} className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm">
              {MODULOS_PUBLICADOS.map((item) => <option key={item.id} value={item.id}>Módulo {item.id} · {item.nome}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="missao-plano" className="mb-2 block text-xs font-semibold text-zinc-400">Missão (2 aulas)</label>
            <select id="missao-plano" value={missaoId} onChange={(e) => { setMissaoId(e.target.value); setAviso(""); }} className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 text-sm">
              {missoesDoModulo.map((m) => <option key={m.id} value={m.id}>{m.titulo}</option>)}
            </select>
          </div>
        </section>

        {missaoAtualDaTurma && <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 text-xs text-orange-200">
          <span>Missão atual desta turma: <strong>{missaoAtualDaTurma.nome}</strong></span>
          <button type="button" onClick={() => { setModuloId(missaoAtualDaTurma.moduloId); setMissaoId(missaoAtualDaTurma.id); setAviso(""); }} className="min-h-9 rounded-lg border border-orange-500/40 px-3 font-bold">Planejar esta missão</button>
        </div>}

        <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div><h2 className="flex items-center gap-2 text-lg font-bold"><Library aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" /> Dinâmicas disponíveis</h2><p className="mt-1 text-xs text-zinc-400">Filtro pelo programa {turma.programa.replace("_", " ")}. O catálogo nunca é esvaziado após o uso.</p></div>
            <span className="rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-bold text-[#FF6B00]">{banco.length} opções ilustrativas</span>
          </div>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="sr-only">Selecione uma dinâmica para associar à missão</legend>
            {banco.map((d) => {
              const historico = historicoDinamica(turmaId, d.id, planos);
              const marcada = dinamicaId === d.id;
              return <label key={d.id} className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${marcada ? "border-[#FF6B00] bg-[#FF6B00]/10" : "border-zinc-700 bg-zinc-900"}`}>
                <input type="radio" name="dinamica" checked={marcada} onChange={() => setDinamicaId(d.id)} className="mt-1 accent-orange-500" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{d.nome}</span>
                  <span className="mt-1 block text-xs text-zinc-400">{d.objetivo} · {d.duracao} min</span>
                  <span className="mt-1 block text-xs text-zinc-500">Materiais: {d.materiais}</span>
                  <span className={`mt-2 block text-xs ${historico.length ? "text-amber-300" : "text-emerald-400"}`}>
                    {historico.length ? `${historico.length} utilização(ões) confirmada(s) nesta turma` : "Ainda não realizada nesta turma"}
                  </span>
                </span>
              </label>;
            })}
          </fieldset>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-zinc-400">Missão: {missao.titulo}</span>
            <button type="button" onClick={associar} disabled={!!ativa || !selecionada} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B00] px-4 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-40">
              <Plus aria-hidden="true" className="h-4 w-4" /> Associar à missão
            </button>
          </div>
          {aviso && <p role="status" className="mt-3 rounded-lg border border-orange-500/20 bg-orange-500/5 p-3 text-xs text-orange-200">{aviso}</p>}
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><BookOpenCheck aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" /> Aplicação na semana</h2>
          {ativa ? (
            <div className="space-y-3 rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
              <p className="text-xs font-bold uppercase text-orange-300">Planejada · ainda não realizada</p>
              <p className="text-base font-bold">{dinamicasDemo.find((d) => d.id === ativa.dinamicaId)?.nome}</p>
              <p className="text-xs text-zinc-400">Confirmar a realização só depois da aula. Cancelar permite escolher outra dinâmica.</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => atualizarPlano(ativa.id, "REALIZADA")} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-500 px-4 text-xs font-bold text-black"><CheckCircle2 className="h-4 w-4" /> Confirmar realização</button>
                <button type="button" onClick={() => atualizarPlano(ativa.id, "CANCELADA")} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-600 px-4 text-xs font-bold"><XCircle className="h-4 w-4" /> Cancelar</button>
              </div>
            </div>
          ) : <p className="rounded-xl border border-dashed border-zinc-700 p-4 text-sm text-zinc-400">Nenhuma dinâmica pendente para esta missão. Selecione uma no catálogo acima.</p>}
          <div className="mt-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold"><History aria-hidden="true" className="h-4 w-4" /> Histórico desta missão</h3>
            {planosContexto.length === 0 ? <p className="text-xs text-zinc-500">Sem registros de demonstração ainda.</p> :
              <div className="space-y-2">{[...planosContexto].reverse().map((p) => <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-zinc-900 p-3 text-xs"><span>{dinamicasDemo.find((d) => d.id === p.dinamicaId)?.nome}</span><span className={p.situacao === "REALIZADA" ? "text-emerald-400" : p.situacao === "CANCELADA" ? "text-zinc-500" : "text-amber-300"}>{p.situacao.toLowerCase()}</span></div>)}</div>}
          </div>
        </section>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500"><span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> Contexto demonstrativo: semestre 2026.2</span><button type="button" onClick={reiniciar} className="inline-flex min-h-11 items-center gap-2 text-zinc-400 hover:text-zinc-200"><RefreshCcw className="h-4 w-4" /> Reiniciar dados fictícios</button></div>
        <p className="flex items-start gap-2 text-xs text-zinc-500"><Sparkles className="mt-0.5 h-4 w-4 shrink-0" /> Associar uma dinâmica à missão não altera automaticamente a missão atual da turma. Essa indicação é definida em “Missão da turma”, no Painel do Professor.</p>
      </main>
    </div>
  );
}
