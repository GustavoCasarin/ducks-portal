"use client";

import Link from "next/link";
import { BookOpenText, ChevronRight } from "lucide-react";
import { useMissaoAtualDaTurma } from "@/lib/jornada-turma-store";

export default function ResumoJornada({ turmaId }: { turmaId: string }) {
  const missao = useMissaoAtualDaTurma(turmaId);
  return (
    <Link href="/jornada" aria-label="Abrir Minha Jornada de Aprendizagem"
      className="block rounded-2xl border border-zinc-800 bg-[#18181B] p-4 shadow-sm transition-colors hover:border-orange-500/40 focus-visible:outline-2 focus-visible:outline-[#FF6B00]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-200"><BookOpenText aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" /> Minha Jornada</h2>
        <ChevronRight aria-hidden="true" className="h-5 w-5 text-zinc-500" />
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
        <span className="text-[10px] font-bold uppercase tracking-wide text-[#FF6B00]">Missão atual da turma</span>
        {missao ? (
          <>
            <h3 className="mt-1 text-base font-extrabold text-white">{missao.nome}</h3>
            <p className="mt-1 text-xs text-zinc-400">Módulo {missao.moduloId} · Missão {missao.numeroNoModulo} de 4</p>
          </>
        ) : (
          <>
            <h3 className="mt-1 text-sm font-bold text-white">Aguardando definição do professor</h3>
            <p className="mt-1 text-xs text-zinc-400">Conheça as missões e o que a turma aprenderá.</p>
          </>
        )}
      </div>
    </Link>
  );
}
