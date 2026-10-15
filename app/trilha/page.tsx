import type { Metadata } from "next";
import PortalPage from "@/components/PortalPage";
import TrilhaHabilidades from "@/components/TrilhaHabilidades";
import { alunoDemo } from "@/lib/alunoDemo";

export const metadata: Metadata = { title: "27 Casas de Habilidades | Ducks BJJ" };

export default function TrilhaPage() {
  return (
    <PortalPage titulo="Minhas 27 Casas" descricao="Habilidades oficiais da Ducks e registro de presença nas aulas.">
      <TrilhaHabilidades programaAluno={alunoDemo.programaCodigo} />
    </PortalPage>
  );
}
