import type { Metadata } from "next";
import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import PortalPage from "@/components/PortalPage";
import { alunoDemo } from "@/lib/alunoDemo";

export const metadata: Metadata = { title: "Aulas | Ducks BJJ" };

export default function AulasPage() {
  return (
    <PortalPage titulo="Minhas Aulas" descricao="Acompanhe a frequência e os futuros registros de aula.">
      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="mb-3 flex items-center gap-2">
          <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-emerald-400" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Grau Verde · Frequência</h2>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-emerald-400">{alunoDemo.grausColoridos.frequencia}%</span>
          <span className="pb-1 text-xs text-zinc-500">valor ilustrativo</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800" role="progressbar" aria-label="Frequência de exemplo" aria-valuemin={0} aria-valuemax={100} aria-valuenow={alunoDemo.grausColoridos.frequencia}>
          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${alunoDemo.grausColoridos.frequencia}%` }} />
        </div>
        <p className="mt-3 text-xs text-zinc-400">A presença será atualizada quando o professor registrar a chamada no painel.</p>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Calendário e histórico</h2>
        </div>
        <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/70 p-6 text-center">
          <Clock3 aria-hidden="true" className="mx-auto mb-3 h-6 w-6 text-zinc-500" />
          <p className="text-sm font-semibold text-zinc-200">Nenhuma aula cadastrada ainda</p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">Datas, horários, presenças e carimbos aparecerão aqui após a integração com o painel do professor.</p>
        </div>
      </section>
    </PortalPage>
  );
}
