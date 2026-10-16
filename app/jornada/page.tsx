import type { Metadata } from "next";
import PortalPage from "@/components/PortalPage";
import JornadaAluno from "@/components/JornadaAluno";
import { alunoDemo } from "@/lib/alunoDemo";

export const metadata: Metadata = { title: "Minha Jornada | Ducks BJJ" };

export default function JornadaPage() {
  return (
    <PortalPage titulo="Minha Jornada" descricao="Entenda os módulos e as missões que sua turma está aprendendo no tatame.">
      <JornadaAluno turmaId={alunoDemo.turmaId} />
    </PortalPage>
  );
}
