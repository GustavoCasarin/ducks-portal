"use client";

import { BookOpen, Languages, Stamp } from "lucide-react";
import PortalPage from "@/components/PortalPage";
import { alunoDemo } from "@/lib/alunoDemo";
import { conteudosDiaDemo } from "@/lib/professorDemo";
import { useRegistrosDemo } from "@/lib/registros-store";
const idiomas = [
  { sigla: "EN", nome: "Inglês", termo: "Eagle" }, { sigla: "ES", nome: "Espanhol", termo: "Águila" },
  { sigla: "IT", nome: "Italiano", termo: "Aquila" }, { sigla: "FR", nome: "Francês", termo: "Aigle" },
  { sigla: "DE", nome: "Alemão", termo: "Adler" },
];
export default function PassaporteAluno() {
  const dados = useRegistrosDemo();
  const carimbos = dados.aulas.filter((a) => a.turmaId === alunoDemo.turmaId && a.carimbo?.alunoIds.includes("a1"))
    .sort((a, b) => b.data.localeCompare(a.data));
  return <PortalPage titulo="Passaporte Digital" descricao="Vocabulário e carimbos das atividades trabalhadas.">
    <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
      <div className="mb-2 flex items-center gap-2"><Languages className="h-5 w-5 text-[#FF6B00]"/><h2 className="text-sm font-bold uppercase">Habilidades animais</h2></div>
      <p className="text-xs text-zinc-400">Exemplo ilustrativo de vocabulário: Águia em cinco idiomas, não é uma conquista registrada.</p>
      <div className="mt-4 space-y-2">{idiomas.map((x) => <div key={x.sigla} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-xs font-extrabold text-[#FF6B00]">{x.sigla}</span>
        <div><p className="text-xs text-zinc-400">{x.nome}</p><p className="text-sm font-bold">{x.termo}</p></div>
      </div>)}</div>
    </section>
    <section className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4"><BookOpen className="mb-2 h-5 w-5 text-[#FF6B00]"/><h2 className="text-sm font-bold">Palavra-âncora</h2><p className="mt-2 text-xs text-zinc-400">{alunoDemo.fraseAncora.palavraChave}</p></div>
      <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4"><Stamp className="mb-2 h-5 w-5 text-[#FF6B00]"/><h2 className="text-sm font-bold">Carimbos de exemplo</h2><p className="mt-2 text-2xl font-bold text-orange-400">{carimbos.length}</p></div>
    </section>
    <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
      <h2 className="text-sm font-bold">Carimbos registrados na demonstração</h2>
      {carimbos.length === 0 ? <p className="mt-2 text-xs text-zinc-400">Aguardando a chamada e o carimbo do professor.</p> : <div className="mt-3 space-y-2">{carimbos.map((a) => <div key={a.data} className="rounded-lg bg-zinc-900 p-3">
        <p className="text-sm font-semibold text-orange-300">{conteudosDiaDemo.find((c) => c.id === a.carimbo?.conteudoId)?.nome ?? "Conteúdo demonstrativo"}</p>
        <p className="mt-1 text-xs text-zinc-500">Aula de {new Date(`${a.data}T12:00:00`).toLocaleDateString("pt-BR")}</p>
      </div>)}</div>}
    </section>
    <p className="text-xs text-zinc-500">Carimbos fictícios e locais; o catálogo e o histórico oficial serão integrados ao banco depois da autenticação.</p>
  </PortalPage>;
}
