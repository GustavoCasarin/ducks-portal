"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Library, BookOpenCheck, CalendarCheck2, Check, CheckCheck, ChevronDown,
  CircleAlert, ClipboardCheck, ClipboardList, Flame, GraduationCap, Medal,
  RotateCcw, Save, ShieldAlert, Sparkles, Users, X,
} from "lucide-react";
import { calcularPMA, type NotasPMA } from "@/lib/pma";
import { conteudosDiaDemo, turmasDemo } from "@/lib/professorDemo";

type Aba = "chamada" | "carimbo" | "avaliacao";
type EstadoPresenca = "presente" | "falta";

const abas: { id: Aba; titulo: string; icone: typeof Users }[] = [
  { id: "chamada", titulo: "Chamada", icone: ClipboardCheck },
  { id: "carimbo", titulo: "Carimbo do dia", icone: Medal },
  { id: "avaliacao", titulo: "PMA mensal", icone: Flame },
];
const padrao: NotasPMA = { atencao: 7, disciplina: 7, respeito: 7, tecnica: 7 };
const campos: { chave: keyof NotasPMA; titulo: string; cor: string }[] = [
  { chave: "atencao", titulo: "Atenção", cor: "accent-red-500" },
  { chave: "disciplina", titulo: "Disciplina", cor: "accent-amber-400" },
  { chave: "respeito", titulo: "Respeito", cor: "accent-blue-500" },
  { chave: "tecnica", titulo: "Técnica", cor: "accent-[#FF6B00]" },
];

export default function ProfessorDashboard() {
  const [turmaId, setTurmaId] = useState(turmasDemo[0].id);
  const [aba, setAba] = useState<Aba>("chamada");
  const [presencas, setPresencas] = useState<Record<string, EstadoPresenca>>({});
  const [chamadaPronta, setChamadaPronta] = useState<Record<string, boolean>>({});
  const [conteudoId, setConteudoId] = useState<string>(conteudosDiaDemo[0].id);
  const [carimbos, setCarimbos] = useState<Record<string, { conteudo: string; alunos: string[] }>>({});
  const [alunoId, setAlunoId] = useState(turmasDemo[0].alunos[0].id);
  const [rascunhos, setRascunhos] = useState<Record<string, NotasPMA>>({});
  const [avaliacoes, setAvaliacoes] = useState<Record<string, NotasPMA>>({});
  const [mensagem, setMensagem] = useState("");

  const turma = turmasDemo.find((item) => item.id === turmaId) ?? turmasDemo[0];
  const aluno = turma.alunos.find((item) => item.id === alunoId) ?? turma.alunos[0];
  const notas = rascunhos[aluno.id] ?? padrao;
  const pma = calcularPMA(notas);
  const presentes = turma.alunos.filter((item) => presencas[item.id] === "presente");
  const faltas = turma.alunos.filter((item) => presencas[item.id] === "falta").length;
  const naoMarcados = turma.alunos.length - presentes.length - faltas;
  const pronto = chamadaPronta[turmaId] ?? false;
  const carimbo = carimbos[turmaId];
  const conteudoAtual = conteudosDiaDemo.find((item) => item.id === conteudoId) ?? conteudosDiaDemo[0];

  function selecionarTurma(nova: string) {
    const proxima = turmasDemo.find((item) => item.id === nova);
    if (!proxima) return;
    setTurmaId(proxima.id);
    setAlunoId(proxima.alunos[0].id);
    setMensagem("");
  }

  function marcarTodos() {
    setPresencas((atual) => ({
      ...atual,
      ...Object.fromEntries(turma.alunos.map((item) => [item.id, "presente" as const])),
    }));
    setChamadaPronta((atual) => ({ ...atual, [turmaId]: false }));
    setMensagem("Todos marcados como presentes. Desmarque os alunos que faltaram.");
  }

  function alternarPresenca(id: string) {
    setPresencas((atual) => ({ ...atual, [id]: atual[id] === "presente" ? "falta" : "presente" }));
    setChamadaPronta((atual) => ({ ...atual, [turmaId]: false }));
    setMensagem("");
  }

  function prepararChamada() {
    if (naoMarcados > 0) {
      setMensagem("Marque todos os alunos antes de concluir a prévia de chamada.");
      return;
    }
    setChamadaPronta((atual) => ({ ...atual, [turmaId]: true }));
    setMensagem("Prévia de chamada concluída nesta sessão. Nada foi enviado ao banco.");
  }

  function atribuirCarimbo() {
    if (!presentes.length) {
      setMensagem("Marque pelo menos um aluno presente na chamada antes de atribuir carimbos.");
      return;
    }
    setCarimbos((atual) => ({
      ...atual,
      [turmaId]: { conteudo: conteudoId, alunos: presentes.map((item) => item.id) },
    }));
    setMensagem(`Carimbo demonstrativo atribuído a ${presentes.length} aluno(s). Sem gravação real.`);
  }

  function atualizarNota(chave: keyof NotasPMA, valor: number) {
    setRascunhos((atual) => ({ ...atual, [aluno.id]: { ...(atual[aluno.id] ?? padrao), [chave]: valor } }));
    setMensagem("");
  }

  function prepararAvaliacao() {
    setAvaliacoes((atual) => ({ ...atual, [aluno.id]: { ...notas } }));
    setMensagem(`Avaliação demonstrativa de ${aluno.nome} preparada. Nenhum dado foi salvo no servidor.`);
  }

  return (
    <div className="min-h-screen bg-[#0F0F11] font-sans text-zinc-100">
      <header className="border-b border-zinc-800 bg-[#18181B]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF6B00] text-black"><GraduationCap aria-hidden="true" className="h-6 w-6" /></div>
            <div><p className="text-xs font-black tracking-[0.2em] text-[#FF6B00]">DUCKS JIU-JITSU</p><p className="text-base font-bold">Painel do Professor</p></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/professor/planejamento" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#FF6B00] px-3 text-sm font-bold text-black hover:bg-orange-400">
              <Library aria-hidden="true" className="h-4 w-4" /> Banco de Dinâmicas
            </Link>
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-700 px-3 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Portal do aluno
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 pb-14 sm:px-6">
        <div role="note" className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-amber-100">
          <ShieldAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div><p className="text-sm font-bold">Modo demonstração · acesso sem autenticação</p>
            <p className="mt-1 text-xs leading-relaxed text-amber-100/75">Todos os nomes e registros são fictícios. As ações existem apenas na memória desta aba e serão perdidas ao recarregar a página. Não há sincronização com o portal dos pais.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">Operação em aula · 64 minutos</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Sua turma, em poucos toques.</h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">Faça a chamada, defina o conteúdo do dia e prepare avaliações mensais de cada aluno.</p>
          </div>
          <div className="relative min-w-64">
            <label htmlFor="turma" className="mb-2 block text-xs font-semibold text-zinc-400">Turma selecionada</label>
            <select id="turma" value={turmaId} onChange={(e) => selecionarTurma(e.target.value)} className="min-h-12 w-full appearance-none rounded-xl border border-zinc-700 bg-[#18181B] px-4 pr-10 text-sm font-bold text-white focus:outline-2 focus:outline-[#FF6B00]">
              {turmasDemo.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute bottom-4 right-3 h-4 w-4 text-zinc-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { titulo: "Alunos", valor: turma.alunos.length, icone: Users, cor: "text-white" },
            { titulo: "Presentes", valor: presentes.length, icone: CheckCheck, cor: "text-emerald-400" },
            { titulo: "Faltas", valor: faltas, icone: X, cor: "text-rose-400" },
            { titulo: "Por conferir", valor: naoMarcados, icone: ClipboardList, cor: "text-amber-400" },
          ].map(({ titulo, valor, icone: Icone, cor }) => (
            <div key={titulo} className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
              <div className="flex items-center justify-between text-zinc-400"><span className="text-xs font-semibold">{titulo}</span><Icone aria-hidden="true" className="h-4 w-4" /></div>
              <p className={`mt-3 text-3xl font-black tabular-nums ${cor}`}>{valor}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-[#18181B]">
          <div className="flex flex-wrap gap-2 border-b border-zinc-800 p-3" role="tablist" aria-label="Operações do professor">
            {abas.map(({ id, titulo, icone: Icone }) => (
              <button key={id} role="tab" id={`tab-${id}`} aria-controls={`painel-${id}`} aria-selected={aba === id} onClick={() => { setAba(id); setMensagem(""); }} className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-colors sm:text-sm ${aba === id ? "bg-[#FF6B00] text-black" : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"}`}>
                <Icone aria-hidden="true" className="h-4 w-4 shrink-0" />{titulo}
              </button>
            ))}
          </div>

          {mensagem && <div role="status" className="mx-4 mt-4 flex items-start gap-2 rounded-xl border border-orange-500/25 bg-orange-500/5 p-3 text-xs text-orange-200"><CircleAlert aria-hidden="true" className="h-4 w-4 shrink-0" />{mensagem}</div>}

          {aba === "chamada" && <section id="painel-chamada" role="tabpanel" aria-labelledby="tab-chamada" className="space-y-5 p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="text-lg font-extrabold">Chamada rápida</h2><p className="mt-1 text-xs text-zinc-400">{turma.horario} · {turma.duracaoMinutos} min · {turma.programa.replace("_", " ")}</p></div>
              <button onClick={marcarTodos} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-extrabold text-zinc-950 hover:bg-emerald-400"><CheckCheck aria-hidden="true" className="h-4 w-4" /> Marcar todos presentes</button>
            </div>
            <p className="rounded-xl bg-zinc-900 p-3 text-xs text-zinc-400">Toque em <strong className="text-emerald-400">Marcar todos presentes</strong> e altere apenas quem faltou. Nenhum registro é enviado ao servidor.</p>
            <div className="divide-y divide-zinc-800 overflow-hidden rounded-xl border border-zinc-800">
              {turma.alunos.map((item) => {
                const status = presencas[item.id];
                const isPresente = status === "presente";
                return <div key={item.id} className="flex items-center justify-between gap-3 bg-zinc-900/50 px-3 py-3 sm:px-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-[#FF6B00]">{item.nome.split(" ").slice(0, 2).map((parte) => parte[0]).join("")}</div>
                    <div className="min-w-0"><p className="truncate text-sm font-semibold">{item.nome}</p><p className="text-xs text-zinc-500">Faixa {item.faixa}</p></div>
                  </div>
                  <button type="button" onClick={() => alternarPresenca(item.id)} aria-pressed={isPresente} aria-label={`${item.nome}: ${status === "presente" ? "presente" : status === "falta" ? "falta" : "não marcado"}. Alterar presença.`} className={`inline-flex min-h-11 min-w-28 shrink-0 items-center justify-center gap-1 rounded-xl border px-3 text-xs font-bold ${status === "presente" ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400" : status === "falta" ? "border-rose-500/30 bg-rose-500/10 text-rose-300" : "border-zinc-700 bg-zinc-800 text-zinc-300"}`}>
                    {status === "presente" ? <Check aria-hidden="true" className="h-4 w-4" /> : status === "falta" ? <X aria-hidden="true" className="h-4 w-4" /> : <RotateCcw aria-hidden="true" className="h-4 w-4" />}
                    {status === "presente" ? "Presente" : status === "falta" ? "Faltou" : "Pendente"}
                  </button>
                </div>;
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div><p className="text-sm font-bold">{pronto ? "Prévia concluída" : "Resumo da chamada"}</p><p className="text-xs text-zinc-400">{presentes.length} presentes · {faltas} faltas · {naoMarcados} pendentes</p></div>
              <button onClick={prepararChamada} disabled={naoMarcados > 0} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B00] px-4 text-sm font-extrabold text-black disabled:cursor-not-allowed disabled:opacity-40"><CalendarCheck2 aria-hidden="true" className="h-4 w-4" /> Concluir prévia</button>
            </div>
          </section>}

          {aba === "carimbo" && <section id="painel-carimbo" role="tabpanel" aria-labelledby="tab-carimbo" className="space-y-5 p-4 sm:p-6">
            <div><h2 className="text-lg font-extrabold">Carimbo do dia</h2><p className="mt-1 text-xs text-zinc-400">Selecione uma missão ou palavra para a turma. Conteúdos ilustrativos.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {conteudosDiaDemo.map((item) => <button type="button" key={item.id} aria-pressed={conteudoId === item.id} onClick={() => { setConteudoId(item.id); setMensagem(""); }} className={`min-h-28 rounded-xl border p-4 text-left transition-colors ${conteudoId === item.id ? "border-[#FF6B00] bg-orange-500/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"}`}>
                <div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#FF6B00]">{item.categoria}</span>{conteudoId === item.id && <Check aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" />}</div>
                <p className="mt-2 text-sm font-bold">{item.nome}</p><p className="mt-1 text-xs text-zinc-500">{item.descricao}</p>
              </button>)}
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm font-bold">Conteúdo selecionado: <span className="text-[#FF6B00]">{conteudoAtual.nome}</span></p>
              <p className="mt-1 text-xs text-zinc-400">{presentes.length} aluno(s) marcado(s) como presentes receberão o carimbo de demonstração.</p>
              <button onClick={atribuirCarimbo} disabled={presentes.length === 0} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B00] px-4 text-sm font-extrabold text-black disabled:cursor-not-allowed disabled:opacity-40"><BookOpenCheck aria-hidden="true" className="h-4 w-4" /> Atribuir carimbo (prévia)</button>
              {carimbo && <p className="mt-3 text-xs text-emerald-400"><Check aria-hidden="true" className="mr-1 inline h-4 w-4" />Prévia atual: {carimbo.alunos.length} aluno(s), conteúdo {conteudosDiaDemo.find((item) => item.id === carimbo.conteudo)?.nome}.</p>}
            </div>
          </section>}

          {aba === "avaliacao" && <section id="painel-avaliacao" role="tabpanel" aria-labelledby="tab-avaliacao" className="space-y-5 p-4 sm:p-6">
            <div><h2 className="text-lg font-extrabold">Avaliação mensal PMA</h2><p className="mt-1 text-xs text-zinc-400">Quatro notas rápidas, de 1 a 10. Fórmula provisória para visualização.</p></div>
            <div>
              <label htmlFor="aluno-avaliacao" className="mb-2 block text-xs font-semibold text-zinc-400">Aluno a avaliar</label>
              <select id="aluno-avaliacao" value={aluno.id} onChange={(e) => { setAlunoId(e.target.value); setMensagem(""); }} className="min-h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-sm font-bold text-white focus:outline-2 focus:outline-[#FF6B00]">
                {turma.alunos.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {campos.map(({ chave, titulo, cor }) => <div key={chave} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="mb-4 flex items-center justify-between"><label htmlFor={`nota-${chave}`} className="text-sm font-bold">{titulo}</label><span className="text-2xl font-black tabular-nums text-[#FF6B00]">{notas[chave]}</span></div>
                <input id={`nota-${chave}`} type="range" min="1" max="10" step="1" value={notas[chave]} onChange={(e) => atualizarNota(chave, Number(e.target.value))} className={`w-full cursor-pointer ${cor}`} />
                <div className="mt-1 flex justify-between text-xs text-zinc-500"><span>1</span><span>10</span></div>
              </div>)}
            </div>
            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
              <div className="mb-4 flex items-center gap-2 text-[#FF6B00]"><Sparkles aria-hidden="true" className="h-5 w-5" /><h3 className="text-sm font-bold uppercase tracking-wide">PMA calculado · prévia</h3></div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[{ titulo: "Comportamental", nota: pma.comportamental }, { titulo: "Técnico", nota: pma.tecnico }, { titulo: "Geral", nota: pma.geral }].map((item) => <div key={item.titulo} className="rounded-lg bg-zinc-900 p-3"><p className="text-[10px] text-zinc-400">{item.titulo}</p><p className="mt-1 text-2xl font-black tabular-nums text-white">{item.nota.toFixed(2)}</p></div>)}
              </div>
              <p className="mt-3 text-xs text-zinc-400">Comportamental = média de Atenção, Disciplina e Respeito. Geral = média do Comportamental e Técnico. Pesos sujeitos à validação da Ducks.</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-zinc-400">{avaliacoes[aluno.id] ? "Existe uma avaliação preparada nesta sessão." : "Nenhuma avaliação preparada para este aluno."}</p>
              <button onClick={prepararAvaliacao} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B00] px-4 text-sm font-extrabold text-black"><Save aria-hidden="true" className="h-4 w-4" /> Preparar avaliação (prévia)</button>
            </div>
          </section>}
        </div>
        <p className="flex items-center gap-2 text-xs text-zinc-500"><CircleAlert aria-hidden="true" className="h-4 w-4 shrink-0" /> Esta rota é pública apenas para teste de interface. Antes de produção, deve ser protegida por autenticação e autorização de professor.</p>
      </main>
    </div>
  );
}
