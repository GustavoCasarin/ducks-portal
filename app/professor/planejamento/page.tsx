import type { Metadata } from "next";
import PlanejamentoProfessor from "@/components/PlanejamentoProfessor";

export const metadata: Metadata = {
  title: "Planejamento Semanal | Ducks BJJ",
  description: "Protótipo do banco de dinâmicas e planejamento por missão.",
};

export default function PlanejamentoPage() {
  return <PlanejamentoProfessor />;
}
