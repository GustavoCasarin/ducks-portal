'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PortalNavigation from '@/components/PortalNavigation';
import { alunoDemo } from '@/lib/alunoDemo';
import ResumoJornada from '@/components/ResumoJornada';
import { useRegistrosDemo } from '@/lib/registros-store';
import { avaliacoesDeAluno, resumoFrequenciaMensal } from '@/lib/registrosDemo';
import { calcularPMA } from '@/lib/pma';
import {
    CalendarCheck2,
    CalendarDays,
    Flame,
    Volume2,
    User,
    CheckCircle2,
    GraduationCap,
} from 'lucide-react';

export default function DashboardAluno() {
    const aluno = alunoDemo;
    const registros = useRegistrosDemo();
    const ultimaAvaliacao = avaliacoesDeAluno(registros, aluno.id).at(-1);
    const pmaAtual = ultimaAvaliacao ? calcularPMA(ultimaAvaliacao.notas) : aluno.pma;
    const hoje = new Date();
    const competenciaAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
    const frequencia = resumoFrequenciaMensal(registros, aluno.turmaId, aluno.id, competenciaAtual);
    const mesReferencia = hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

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
                        <span className="text-[11px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">{ultimaAvaliacao ? `Ref. ${ultimaAvaliacao.competencia}` : "Sem avaliação"}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800/80 text-center">
                        <div>
                            <span className="block text-[10px] text-zinc-400 font-medium">Comportamento</span>
                            <span className="text-lg font-extrabold text-amber-400">{pmaAtual.comportamental.toFixed(1)}</span>
                        </div>
                        <div className="border-x border-zinc-800">
                            <span className="block text-[10px] text-zinc-400 font-medium">Técnico</span>
                            <span className="text-lg font-extrabold text-blue-400">{pmaAtual.tecnico.toFixed(1)}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-zinc-400 font-medium">PMA Geral</span>
                            <span className="text-lg font-extrabold text-[#FF6B00]">{pmaAtual.geral.toFixed(2)}</span>
                        </div>
                    </div>
                    <Link href="/evolucao" className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/10 text-xs font-bold text-orange-300 hover:bg-orange-500/20">
                        Ver histórico e evolução do PMA →
                    </Link>
                    <p className="mt-2 text-[10px] text-zinc-500">Dados fictícios · Critérios de cálculo ainda provisórios</p>
                </section>

                {/* 3. FREQUÊNCIA DO MÊS — DERIVADA DAS CHAMADAS DO MVP DEMONSTRATIVO */}
                <section aria-label="Resumo de frequência" className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4 shadow-sm space-y-3">
                    <div className="flex items-start justify-between gap-3">
                        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-200">
                            <CalendarCheck2 aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" />
                            Meu Treinamento
                        </h2>
                        <span className="text-[11px] text-zinc-400 capitalize">{mesReferencia}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-3">
                            <span className="block text-[11px] text-zinc-400">Frequência registrada</span>
                            <span className="mt-1 block text-2xl font-extrabold text-emerald-400">
                                {frequencia.percentual === null ? '—' : `${frequencia.percentual}%`}
                            </span>
                            <span className="mt-1 block text-[10px] text-zinc-500">Das chamadas deste mês</span>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-3">
                            <span className="block text-[11px] text-zinc-400">Aulas frequentadas</span>
                            <span className="mt-1 block text-2xl font-extrabold text-white">
                                {frequencia.presentes}<span className="text-sm font-semibold text-zinc-500"> / {frequencia.aulasRegistradas}</span>
                            </span>
                            <span className="mt-1 block text-[10px] text-zinc-500">Aulas com chamada salva</span>
                        </div>
                    </div>
                    {frequencia.aulasRegistradas === 0 && (
                        <p className="rounded-lg border border-dashed border-zinc-700 p-3 text-xs text-zinc-400">
                            Ainda não há chamadas registradas para este aluno neste mês.
                        </p>
                    )}
                    <Link href="/aulas" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 text-xs font-bold text-zinc-200 transition-colors hover:border-[#FF6B00] hover:text-[#FF6B00]">
                        <CalendarDays aria-hidden="true" className="h-4 w-4" /> Ver histórico de aulas →
                    </Link>
                    <p className="text-[10px] leading-relaxed text-zinc-500">
                        Prévia com dados fictícios do navegador. Não representa grau, graduação nem a frequência oficial da academia.
                    </p>
                </section>

                {/* 4. CURRÍCULO DA TURMA (MÓDULOS E MISSÕES) */}
                <ResumoJornada turmaId={aluno.turmaId} />

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
