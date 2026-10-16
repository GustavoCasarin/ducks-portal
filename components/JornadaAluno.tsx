"use client";

import { useState } from "react";
import { BookOpenText, ChevronDown, CircleDot, Clock3, Info, Layers3, Target } from "lucide-react";
import {
  MODULOS_EM_DESENVOLVIMENTO, MODULOS_PUBLICADOS,
  type MissaoCurricular,
} from "@/lib/catalogoJornada";
import { useMissaoAtualDaTurma } from "@/lib/jornada-turma-store";

export default function JornadaAluno({ turmaId }: { turmaId: string }) {
  const atual = useMissaoAtualDaTurma(turmaId);
  // Antes da primeira interação, abre a missão atual da turma (quando definida).
  // Depois, respeita a escolha de expansão feita pelo responsável.
  const [moduloSelecionado, setModuloSelecionado] = useState<number | null | undefined>(undefined);
  const [missaoSelecionada, setMissaoSelecionada] = useState<string | null | undefined>(undefined);
  const moduloAberto = moduloSelecionado === undefined ? (atual?.moduloId ?? 1) : moduloSelecionado;
  const missaoAberta = missaoSelecionada === undefined ? (atual?.id ?? null) : missaoSelecionada;

  return (
    <div className="space-y-4">
      <section aria-label="O que a turma está aprendendo" className="rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/15 to-[#18181B] p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
          <CircleDot aria-hidden="true" className="h-4 w-4" /> Conteúdo atual da turma
        </div>
        {atual ? (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-zinc-300">Módulo {atual.moduloId} · Missão {atual.numeroNoModulo} de 4</p>
            <h2 className="text-xl font-extrabold text-white">{atual.nome}</h2>
            <p className="text-sm leading-relaxed text-zinc-300">{atual.resumoFamilia}</p>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            <h2 className="text-base font-bold text-white">Missão atual ainda não definida</h2>
            <p className="text-sm leading-relaxed text-zinc-300">Assim que o professor informar a missão da turma, ela aparecerá aqui. Enquanto isso, você pode conhecer os módulos abaixo.</p>
          </div>
        )}
      </section>

      <div className="flex items-center gap-2 px-1 text-sm font-bold text-zinc-200">
        <Layers3 aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" /> Conheça os módulos
      </div>

      {MODULOS_PUBLICADOS.map((modulo) => {
        const ativo = atual?.moduloId === modulo.id;
        const aberto = moduloAberto === modulo.id;
        return (
          <section key={modulo.id} className={`overflow-hidden rounded-2xl border bg-[#18181B] ${ativo ? "border-[#FF6B00]/60" : "border-zinc-800"}`}>
            <button type="button" aria-expanded={aberto} aria-controls={`conteudo-modulo-${modulo.id}`}
              onClick={() => setModuloSelecionado(aberto ? null : modulo.id)}
              className="flex w-full items-start justify-between gap-3 p-4 text-left focus-visible:outline-2 focus-visible:outline-[#FF6B00]">
              <span className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6B00]/15 text-lg font-black text-[#FF6B00]">{modulo.id}</span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Módulo {modulo.id}</span>
                  <span className="mt-1 block text-base font-bold text-white">{modulo.nome}</span>
                  <span className="mt-1 block text-xs text-zinc-400">4 missões · aproximadamente 1 mês</span>
                  {ativo && <span className="mt-2 inline-block rounded-full bg-orange-500/15 px-2 py-1 text-[11px] font-bold text-orange-300">Módulo atual da turma</span>}
                </span>
              </span>
              <ChevronDown aria-hidden="true" className={`mt-2 h-5 w-5 shrink-0 text-zinc-400 transition-transform ${aberto ? "rotate-180" : ""}`} />
            </button>
            {aberto && (
              <div id={`conteudo-modulo-${modulo.id}`} className="space-y-4 border-t border-zinc-800 p-4">
                <p className="text-sm leading-relaxed text-zinc-300">{modulo.descricaoFamilia}</p>
                <p className="rounded-lg bg-zinc-900 p-3 text-xs leading-relaxed text-zinc-400"><strong className="text-zinc-200">Tema do módulo:</strong> {modulo.tema}</p>
                <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-zinc-300"><Target aria-hidden="true" className="h-4 w-4 text-[#FF6B00]" /> Missões deste módulo</h3>
                <div className="space-y-2">
                  {modulo.missoes.map((missao) => (
                    <MissaoCard key={missao.id} missao={missao} atual={atual?.id === missao.id}
                      aberto={missaoAberta === missao.id}
                      alternar={() => setMissaoSelecionada(missaoAberta === missao.id ? null : missao.id)} />
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })}

      <section className="space-y-2" aria-label="Módulos em desenvolvimento">
        {MODULOS_EM_DESENVOLVIMENTO.map(({ id }) => (
          <div key={id} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-[#18181B] p-4">
            <div>
              <p className="font-bold text-zinc-300">Módulo {id}</p>
              <p className="mt-1 text-xs text-zinc-500">Conteúdo em desenvolvimento pela Ducks</p>
            </div>
            <span className="shrink-0 rounded-lg bg-zinc-800 px-2 py-1 text-[10px] font-bold text-zinc-400">Em breve</span>
          </div>
        ))}
      </section>

      <p className="flex gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-xs leading-relaxed text-zinc-400">
        <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        A missão atual indica o planejamento da turma, não uma conquista ou avaliação individual. Esta prévia usa apenas dados fictícios salvos neste navegador.
      </p>
    </div>
  );
}

function MissaoCard({ missao, atual, aberto, alternar }: {
  missao: MissaoCurricular;
  atual: boolean;
  aberto: boolean;
  alternar: () => void;
}) {
  return (
    <div className={`rounded-xl border ${atual ? "border-orange-500/50 bg-orange-500/5" : "border-zinc-800 bg-zinc-900/70"}`}>
      <button type="button" aria-expanded={aberto} aria-controls={`detalhe-${missao.id}`}
        onClick={alternar}
        className="flex w-full items-center justify-between gap-3 p-3 text-left focus-visible:outline-2 focus-visible:outline-[#FF6B00]">
        <span className="flex items-center gap-3">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${atual ? "bg-[#FF6B00] text-black" : "bg-zinc-800 text-zinc-300"}`}>{missao.numeroNoModulo}</span>
          <span>
            <span className="block text-sm font-bold text-zinc-100">{missao.nome}</span>
            <span className="mt-0.5 block text-[11px] text-zinc-400">{atual ? "Em andamento na turma" : "Conhecer missão"}</span>
          </span>
        </span>
        <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${aberto ? "rotate-180" : ""}`} />
      </button>
      {aberto && (
        <div id={`detalhe-${missao.id}`} className="space-y-3 border-t border-zinc-800 p-3">
          <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400"><Clock3 aria-hidden="true" className="h-3.5 w-3.5" /> Duas aulas previstas</div>
          <p className="text-sm leading-relaxed text-zinc-200">{missao.resumoFamilia}</p>
          <div className="rounded-lg border border-zinc-800 bg-[#18181B] p-3">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-orange-400"><BookOpenText aria-hidden="true" className="h-4 w-4" /> O que será trabalhado</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-300">{missao.tema}</p>
          </div>
        </div>
      )}
    </div>
  );
}
