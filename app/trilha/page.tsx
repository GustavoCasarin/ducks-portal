import type { Metadata } from "next";
import { Compass, LockKeyhole, MapPinned } from "lucide-react";
import PortalPage from "@/components/PortalPage";
import { alunoDemo, TOTAL_CASAS } from "@/lib/alunoDemo";

export const metadata: Metadata = { title: "Trilha das 27 Casas | Ducks BJJ" };

export default function TrilhaPage() {
  const casaAtual = alunoDemo.casaAtual.numero;
  const casas = Array.from({ length: TOTAL_CASAS }, (_, index) => index + 1);

  return (
    <PortalPage titulo="Trilha das 27 Casas" descricao="Cada casa representa uma etapa da jornada no tatame.">
      <section className="rounded-2xl border border-orange-500/30 bg-[#18181B] p-4">
        <div className="mb-3 flex items-center gap-2 text-[#FF6B00]">
          <MapPinned aria-hidden="true" className="h-5 w-5" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Missão atual</h2>
        </div>
        <p className="text-xl font-extrabold">Casa {casaAtual}: {alunoDemo.casaAtual.nome}</p>
        <p className="mt-1 text-xs text-zinc-400">{alunoDemo.casaAtual.modulo}</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800" role="progressbar" aria-label="Trilha percorrida, exemplo demonstrativo" aria-valuemin={0} aria-valuemax={TOTAL_CASAS} aria-valuenow={casaAtual - 1}>
          <div className="h-full rounded-full bg-[#FF6B00]" style={{ width: `${((casaAtual - 1) / TOTAL_CASAS) * 100}%` }} />
        </div>
        <p className="mt-2 text-xs text-zinc-400">{casaAtual - 1} casas anteriores · casa {casaAtual} em andamento</p>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="mb-4 flex items-center gap-2">
          <Compass aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Mapa da jornada</h2>
        </div>
        <div className="grid grid-cols-3 gap-2" aria-label="27 casas da trilha">
          {casas.map((numero) => {
            const anterior = numero < casaAtual;
            const atual = numero === casaAtual;
            const estado = anterior ? "Percorrida" : atual ? "Em andamento" : "Bloqueada";
            return (
              <div
                key={numero}
                aria-label={`Casa ${numero}: ${estado}`}
                className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-xl border p-2 text-center ${atual ? "border-[#FF6B00] bg-[#FF6B00]/15 text-orange-300" : anterior ? "border-emerald-700/40 bg-emerald-500/5 text-emerald-300" : "border-zinc-800 bg-zinc-900 text-zinc-500"}`}
              >
                {numero > casaAtual ? <LockKeyhole aria-hidden="true" className="h-4 w-4" /> : <span className="text-lg font-extrabold">{numero}</span>}
                <span className="text-[10px] font-semibold">Casa {numero}</span>
                <span className="text-[10px]">{estado}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">
          Visualização demonstrativa. Os nomes e os critérios das demais missões serão cadastrados quando o método completo estiver integrado.
        </p>
      </section>
    </PortalPage>
  );
}
