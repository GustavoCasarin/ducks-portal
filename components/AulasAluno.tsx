"use client";

import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import { alunoDemo } from "@/lib/alunoDemo";
import { useRegistrosDemo } from "@/lib/registros-store";
import PortalPage from "@/components/PortalPage";

export default function AulasAluno() {
  const dados = useRegistrosDemo();
  const aulas = dados.aulas.filter((a) => a.turmaId === alunoDemo.turmaId && a.presencas.a1)
    .sort((a, b) => b.data.localeCompare(a.data));
  const presencas = aulas.filter((a) => a.presencas.a1 === "PRESENTE").length;
  const percentual = aulas.length ? Math.round(presencas / aulas.length * 100) : null;
  return (
    <PortalPage titulo="Minhas Aulas" descricao="Confira as aulas registradas e a frequência nesta demonstração.">
      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-400"/><h2 className="text-sm font-bold uppercase">Presenças registradas</h2></div>
        <p className="text-3xl font-extrabold text-emerald-400">{percentual === null ? "—" : `${percentual}%`}</p>
        <p className="mt-1 text-xs text-zinc-400">{presencas} de {aulas.length} aulas demonstrativas registradas.</p>
        <p className="mt-2 text-xs text-zinc-500">Este indicador não é o Grau Verde oficial: regras de reposição, justificativas e matrículas ainda precisam ser validadas.</p>
      </section>
      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase"><CalendarDays className="h-5 w-5 text-[#FF6B00]"/> Histórico de aulas</h2>
        {aulas.length === 0 ? <div className="mt-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/70 p-6 text-center">
          <Clock3 className="mx-auto mb-3 h-6 w-6 text-zinc-500"/><p className="text-sm font-bold">Nenhuma aula registrada</p><p className="mt-2 text-xs text-zinc-400">Faça uma chamada em Aula de Hoje para ver a presença nesta página.</p>
        </div> : <div className="mt-4 space-y-2">{aulas.map((a) => <div key={a.data} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-3">
          <div><p className="text-sm font-semibold">{new Date(`${a.data}T12:00:00`).toLocaleDateString("pt-BR")}</p><p className="text-xs text-zinc-500">{a.carimbo?.alunoIds.includes("a1") ? "Com carimbo registrado" : "Sem carimbo"}</p></div>
          <span className={`text-xs font-bold ${a.presencas.a1 === "PRESENTE" ? "text-emerald-400" : "text-rose-400"}`}>{a.presencas.a1 === "PRESENTE" ? "Presente" : "Falta"}</span>
        </div>)}</div>}
      </section>
      <p className="text-xs text-zinc-500">Registros fictícios salvos somente neste navegador, sem sincronização entre aparelhos.</p>
    </PortalPage>
  );
}
