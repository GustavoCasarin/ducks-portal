import type { Metadata } from "next";
import { BookOpen, Languages, Stamp } from "lucide-react";
import PortalPage from "@/components/PortalPage";
import { alunoDemo } from "@/lib/alunoDemo";

export const metadata: Metadata = { title: "Passaporte Digital | Ducks BJJ" };

const idiomas = [
  { sigla: "EN", nome: "Inglês", termo: "Eagle" },
  { sigla: "ES", nome: "Espanhol", termo: "Águila" },
  { sigla: "IT", nome: "Italiano", termo: "Aquila" },
  { sigla: "FR", nome: "Francês", termo: "Aigle" },
  { sigla: "DE", nome: "Alemão", termo: "Adler" },
];

export default function PassaportePage() {
  return (
    <PortalPage titulo="Passaporte Digital" descricao="Descobertas de idiomas e linguagem de combate em cada etapa.">
      <section className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
        <div className="mb-2 flex items-center gap-2">
          <Languages aria-hidden="true" className="h-5 w-5 text-[#FF6B00]" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Habilidades animais</h2>
        </div>
        <p className="text-xs text-zinc-400">Exemplo de vocabulário: Águia em cinco idiomas.</p>
        <div className="mt-4 space-y-2">
          {idiomas.map(({ sigla, nome, termo }) => (
            <div key={sigla} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-xs font-extrabold text-[#FF6B00]">{sigla}</span>
              <div>
                <p className="text-xs text-zinc-400">{nome}</p>
                <p className="text-sm font-bold">{termo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
          <BookOpen aria-hidden="true" className="mb-2 h-5 w-5 text-[#FF6B00]" />
          <h2 className="text-sm font-bold">Palavra-âncora</h2>
          <p className="mt-2 text-xs text-zinc-400">{alunoDemo.fraseAncora.palavraChave}</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4">
          <Stamp aria-hidden="true" className="mb-2 h-5 w-5 text-[#FF6B00]" />
          <h2 className="text-sm font-bold">Carimbos</h2>
          <p className="mt-2 text-xs text-zinc-400">Aguardando registros do professor</p>
        </div>
      </section>
      <p className="px-1 text-xs leading-relaxed text-zinc-500">
        Conteúdo demonstrativo: estas palavras não representam conquistas já registradas. O passaporte será preenchido pelos carimbos reais após a integração com as aulas.
      </p>
    </PortalPage>
  );
}
