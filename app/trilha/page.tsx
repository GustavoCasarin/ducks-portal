import type { Metadata } from "next";
import { CalendarCheck2, Info, Star, Target } from "lucide-react";
import PortalPage from "@/components/PortalPage";
import {
  aulasDeExemplo, estrelasPorCasa, presencasDeExemplo, TOTAL_CASAS_JORNADA,
} from "@/lib/jornada";

export const metadata: Metadata = { title: "27 Casas de Habilidades | Ducks BJJ" };

export default function TrilhaPage() {
  const estrelas = estrelasPorCasa("a1", aulasDeExemplo, presencasDeExemplo);
  const total = Object.values(estrelas).reduce((soma, valor) => soma + valor, 0);
  const casas = Array.from({ length: TOTAL_CASAS_JORNADA }, (_, i) => i + 1);

  return (
    <PortalPage titulo="Minhas 27 Casas" descricao="Um mapa das habilidades trabalhadas durante as aulas.">
      <section className="rounded-2xl border border-amber-500/20 bg-[#18181B] p-4">
        <div className="flex items-start gap-3">
          <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <p className="text-sm font-bold text-amber-300">O que significa a estrelinha?</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-300">Uma estrela significa que o aluno esteve presente em uma aula realizada que trabalhou aquela habilidade. Não significa aprovação, domínio da técnica ou conclusão de missão.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide"><CalendarCheck2 aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" /> Meu diário de presença</h2>
            <p className="mt-1 text-xs text-zinc-400">Registros ilustrativos de Joãozinho Casarin</p>
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-amber-500/10 px-3 py-2 text-amber-400">
            <Star aria-hidden="true" className="h-5 w-5 fill-current" />
            <span className="text-xl font-black">{total}</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500">As aulas e as habilidades abaixo são exemplos fictícios. O catálogo oficial das 27 casas será fornecido pela Ducks.</p>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="mb-4 flex items-center gap-2"><Target aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" /><h2 className="text-sm font-bold uppercase tracking-wide">Mapa das 27 habilidades</h2></div>
        <div className="grid grid-cols-3 gap-2" aria-label="Mapa de 27 casas e presenças demonstrativas">
          {casas.map((numero) => {
            const quantidade = estrelas[numero] ?? 0;
            const nome = numero === 7 ? "Mobilidade (exemplo)" : `Habilidade ${numero}`;
            return (
              <div key={numero} className={`flex min-h-28 flex-col items-center justify-center gap-1 rounded-xl border px-1 py-3 text-center ${quantidade ? "border-amber-500/35 bg-amber-500/5" : "border-zinc-800 bg-zinc-900"}`} aria-label={`Casa ${numero}, ${nome}, ${quantidade} estrelinha(s) de presença`}>
                <span className="text-[10px] font-bold text-zinc-400">Casa {numero}</span>
                <span className={`text-xs font-bold ${quantidade ? "text-amber-200" : "text-zinc-300"}`}>{nome}</span>
                <span className={`mt-1 inline-flex items-center gap-1 text-xs font-bold ${quantidade ? "text-amber-400" : "text-zinc-500"}`}>
                  <Star aria-hidden="true" className={`h-4 w-4 ${quantidade ? "fill-current" : ""}`} /> {quantidade}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">As casas não ficam bloqueadas em ordem numérica: uma habilidade pode ser trabalhada em diferentes módulos e missões ao longo do ano. A evolução técnica continua sendo avaliada separadamente.</p>
      </section>
    </PortalPage>
  );
}
