'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PortalNavigation from '@/components/PortalNavigation';
import { alunoDemo } from '@/lib/alunoDemo';
import {
    Award,
    Flame,
    Volume2,
    ChevronRight,
    User,
    CheckCircle2,
    Compass,
    GraduationCap,
} from 'lucide-react';

export default function DashboardAluno() {
    const aluno = alunoDemo;

    return (
        <div className="min-h-screen bg-[#0F0F11] text-zinc-100 pb-24 font-sans max-w-md mx-auto relative border-x border-zinc-800">

            {/* 1. CABEÇALHO DO PERFIL */}
            <header className="p-5 bg-[#18181B] border-b border-zinc-800 rounded-b-2xl shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-[#FF6B00] flex items-center justify-center overflow-hidden">
                            {aluno.fotoUrl ? (
                                <Image src={aluno.fotoUrl} alt={aluno.nome} width={56} height={56} unoptimized className="h-full w-full object-cover" />
                            ) : (
                                <User className="w-7 h-7 text-zinc-400" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white leading-tight">{aluno.nome}</h1>
                            <p className="text-xs text-[#FF6B00] font-medium">{aluno.programa}</p>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1 bg-zinc-900 border border-zinc-700 rounded-full text-[10px] text-zinc-300">
                                <span className="w-2 h-2 rounded-full bg-zinc-200 border border-zinc-500"></span>
                                Faixa {aluno.faixa}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Status</span>
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Ativo
                        </span>
                    </div>
                </div>
            </header>

            <main className="p-4 space-y-5">

                {/* 2. CARD DE STATUS PMA (PROGRESSO MÁXIMO ATUAL) */}
                <section className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B00]/5 rounded-full blur-xl pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-[#FF6B00]" />
                            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-200">Termômetro PMA</h2>
                        </div>
                        <span className="text-[11px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">Mês Atual</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800/80 text-center">
                        <div>
                            <span className="block text-[10px] text-zinc-400 font-medium">Comportamento</span>
                            <span className="text-lg font-extrabold text-amber-400">{aluno.pma.comportamental.toFixed(1)}</span>
                        </div>
                        <div className="border-x border-zinc-800">
                            <span className="block text-[10px] text-zinc-400 font-medium">Técnico</span>
                            <span className="text-lg font-extrabold text-blue-400">{aluno.pma.tecnico.toFixed(1)}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-zinc-400 font-medium">PMA Geral</span>
                            <span className="text-lg font-extrabold text-[#FF6B00]">{aluno.pma.geral.toFixed(2)}</span>
                        </div>
                    </div>
                </section>

                {/* 3. PAINEL DOS 4 GRAUS COLORIDOS (COMPORTAMENTAL) */}
                <section className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-200 flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#FF6B00]" />
                            Graus Coloridos
                        </h2>
                        <span className="text-[11px] text-zinc-400">Requisito de Faixa</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Atenção - Vermelho */}
                        <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="font-semibold text-red-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Atenção
                                </span>
                                <span className="font-bold text-zinc-300">{aluno.grausColoridos.atencao}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${aluno.grausColoridos.atencao}%` }}></div>
                            </div>
                        </div>

                        {/* Disciplina - Amarelo */}
                        <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="font-semibold text-amber-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> Disciplina
                                </span>
                                <span className="font-bold text-zinc-300">{aluno.grausColoridos.disciplina}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${aluno.grausColoridos.disciplina}%` }}></div>
                            </div>
                        </div>

                        {/* Respeito - Azul */}
                        <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="font-semibold text-blue-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Respeito
                                </span>
                                <span className="font-bold text-zinc-300">{aluno.grausColoridos.respeito}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${aluno.grausColoridos.respeito}%` }}></div>
                            </div>
                        </div>

                        {/* Frequência - Verde */}
                        <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Frequência
                                </span>
                                <span className="font-bold text-zinc-300">{aluno.grausColoridos.frequencia}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${aluno.grausColoridos.frequencia}%` }}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. A TRILHA DAS 27 CASAS (CARD RESUMO) */}
                <Link href="/trilha" aria-label="Abrir Trilha das 27 Casas" className="block bg-[#18181B] border border-zinc-800 rounded-2xl p-4 shadow-sm hover:border-orange-500/40 focus-visible:outline-2 focus-visible:outline-[#FF6B00] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Compass className="w-5 h-5 text-[#FF6B00]" />
                            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-200">Trilha das 27 Casas</h2>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-500" />
                    </div>

                    <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] uppercase text-[#FF6B00] font-bold tracking-wider">Casa Atual</span>
                            <h3 className="text-base font-extrabold text-white">Casa {aluno.casaAtual.numero}: {aluno.casaAtual.nome}</h3>
                            <p className="text-xs text-zinc-400">{aluno.casaAtual.modulo}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00] text-[#FF6B00] flex items-center justify-center font-bold text-sm">
                            {aluno.casaAtual.numero}/27
                        </div>
                    </div>
                </Link>

                {/* 5. FRASE-ÂNCORA DO MÓDULO */}
                <section className="bg-gradient-to-br from-zinc-900 to-[#18181B] border border-amber-500/20 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-500/20">
                            Palavra-Âncora: {aluno.fraseAncora.palavraChave}
                        </span>
                        <button
                            type="button"
                            aria-label="Ouvir a frase-âncora em inglês"
                            title="Ouvir a frase-âncora"
                            onClick={() => {
                                if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
                                    const fala = new SpeechSynthesisUtterance(aluno.fraseAncora.ingles);
                                    fala.lang = "en-US";
                                    window.speechSynthesis.cancel();
                                    window.speechSynthesis.speak(fala);
                                }
                            }}
                            className="rounded-full bg-zinc-800 p-2 text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#FF6B00]"
                        >
                            <Volume2 aria-hidden="true" className="w-4 h-4 text-amber-400" />
                        </button>
                    </div>

                    <p className="text-sm font-semibold italic text-zinc-200 mt-1">
                        &ldquo;{aluno.fraseAncora.ingles}&rdquo;
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                        &ldquo;{aluno.fraseAncora.portugues}&rdquo;
                    </p>
                </section>

                <Link href="/professor" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 p-3 text-xs font-bold text-zinc-400 transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00]">
                    <GraduationCap aria-hidden="true" className="h-4 w-4" /> Prévia demonstrativa: Painel do Professor
                </Link>
            </main>

            <PortalNavigation />

        </div>
    );
}
