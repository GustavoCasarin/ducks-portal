import type { Metadata } from "next";
import JornadaProfessor from "@/components/JornadaProfessor";

export const metadata: Metadata = { title: "Missão da Turma | Ducks BJJ" };

export default function ProfessorJornadaPage() {
  return <JornadaProfessor />;
}
