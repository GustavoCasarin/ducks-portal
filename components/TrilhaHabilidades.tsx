"use client";

import { Fragment, useState } from "react";
import { Award, BookOpenCheck, Info, Medal, Star, Target } from "lucide-react";
import {
  casaPorNumero,
  casasDoPrograma,
  marcoAposCasa,
  type MarcoTrilha,
  type ProgramaTrilha,
} from "@/lib/catalogoTrilhas";
import { aulasDeExemplo, estrelasPorCasa, presencasDeExemplo } from "@/lib/jornada";

interface Props {
  programaAluno: ProgramaTrilha;
}

function Marco({ marco }: { marco: MarcoTrilha }) {
  const ehTrocaFaixa = marco.tipo === "TROCA_FAIXA";
  const ehTecnico = marco.tipo === "GRAU_TECNICO";
  const Icone = ehTrocaFaixa ? Award : ehTecnico ? Medal : BookOpenCheck;
  return (
    <div
      className={`col-span-3 my-1 flex items-center gap-3 rounded-xl border px-3 py-3 ${ehTrocaFaixa ? "border-orange-500/40 bg-orange-500/10" : "border-zinc-700 bg-zinc-900/80"}`}
      aria-label={`Marco após a casa ${marco.aposCasa}: ${marco.tipo === "GRAU_COLORIDO" ? "Grau Colorido " : ""}${marco.titulo}`}
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${ehTrocaFaixa ? "bg-orange-500/15 text-[#FF6B00]" : "bg-zinc-800 text-amber-400"}`}>
        <Icone aria-hidden="true" className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Marco após a casa {marco.aposCasa}</p>
        <p className="text-sm font-bold text-zinc-100">{marco.tipo === "GRAU_COLORIDO" ? `Grau Colorido · ${marco.titulo}` : marco.titulo}</p>
      </div>
    </div>
  );
}

export default function TrilhaHabilidades({ programaAluno }: Props) {
  const [programa, setPrograma] = useState<ProgramaTrilha>(programaAluno);
  const [selecionada, setSelecionada] = useState(1);
  const apenasPrevia = programa !== programaAluno;
  // Na demonstração, só exibimos a presença fictícia para o programa do aluno.
  const estrelas: Record<number, number> = apenasPrevia ? {} : estrelasPorCasa("a1", aulasDeExemplo, presencasDeExemplo);
  const total = Object.values(estrelas).reduce((acum, quant) => acum + quant, 0);
  const casas = casasDoPrograma(programa);
  const detalhe = casaPorNumero(programa, selecionada);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-200">Programa da trilha</h2>
        <div role="group" aria-label="Selecionar currículo para visualização" className="mt-3 grid grid-cols-2 gap-2">
          {(["KIDS_01", "KIDS_02"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={programa === item}
              onClick={() => { setPrograma(item); setSelecionada(1); }}
              className={`min-h-11 rounded-xl border px-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00] ${programa === item ? "border-[#FF6B00] bg-[#FF6B00]/15 text-orange-300" : "border-zinc-700 bg-zinc-900 text-zinc-400"}`}
            >
              {item === "KIDS_01" ? "Kids 01" : "Kids 02"}
              {item === programaAluno ? " · aluno" : " · prévia"}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-400">{apenasPrevia ? "Você está visualizando outro currículo, sem registros de presença associados." : "Currículo do aluno demonstrativo. Estrelas exibidas são fictícias."}</p>
      </section>

      <section className="rounded-2xl border border-amber-500/20 bg-[#18181B] p-4">
        <div className="flex items-start gap-3">
          <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <h2 className="text-sm font-bold text-amber-300">Estrelinhas são presença, não aprovação</h2>
            <p className="mt-1 text-xs leading-relaxed text-zinc-300">Uma estrela indica presença em aula realizada que trabalhou aquela casa. Os marcos de graus e troca de faixa são referências do currículo: nenhuma graduação é concedida automaticamente por estrelas.</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide"><Target aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" /> As 27 casas</h2>
            <p className="mt-1 text-xs text-zinc-400">Selecione uma casa para ver seus registros.</p>
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-amber-500/10 px-3 py-2 text-amber-400" aria-label={`${total} estrelinhas de presença demonstrativas`}>
            <Star aria-hidden="true" className="h-5 w-5 fill-current" />
            <span className="text-xl font-black">{total}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2" aria-label={`Trilha de 27 casas para ${programa === "KIDS_01" ? "Kids 01" : "Kids 02"}`}>
          {casas.map((casa) => {
            const quantidade = estrelas[casa.numero] ?? 0;
            const ativa = selecionada === casa.numero;
            const marco = marcoAposCasa(programa, casa.numero);
            return (
              <Fragment key={casa.numero}>
                <button
                  type="button"
                  aria-pressed={ativa}
                  aria-label={`Casa ${casa.numero}, ${casa.nome}, ${quantidade} estrela(s) de presença`}
                  onClick={() => setSelecionada(casa.numero)}
                  className={`flex min-h-28 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00] ${ativa ? "border-[#FF6B00] bg-orange-500/10" : quantidade ? "border-amber-500/35 bg-amber-500/5" : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"}`}
                >
                  <span className="text-[10px] font-bold text-zinc-400">Casa {casa.numero}</span>
                  <span className="text-xs font-bold leading-snug text-zinc-100">{casa.nome}</span>
                  <span className={`mt-1 inline-flex items-center gap-1 text-xs font-bold ${quantidade ? "text-amber-400" : "text-zinc-500"}`}>
                    <Star aria-hidden="true" className={`h-4 w-4 ${quantidade ? "fill-current" : ""}`} /> {quantidade}
                  </span>
                </button>
                {marco && <Marco marco={marco} />}
              </Fragment>
            );
          })}
        </div>
      </section>

      {detalhe && <section aria-live="polite" className="rounded-2xl border border-orange-500/25 bg-[#18181B] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#FF6B00]">Casa {detalhe.numero} · Detalhes</p>
        <h2 className="mt-1 text-lg font-extrabold">{detalhe.nome}</h2>
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-amber-300"><Star aria-hidden="true" className="h-4 w-4 fill-current" /> {estrelas[detalhe.numero] ?? 0} estrela(s) de presença</p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">Os detalhes de aulas e as avaliações de domínio técnico aparecerão após a integração ao banco. Por enquanto, os números são demonstrativos.</p>
      </section>}
    </div>
  );
}
