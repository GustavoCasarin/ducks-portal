import type { Metadata } from "next";
import ProfessorDashboard from "@/components/ProfessorDashboard";

export const metadata: Metadata = {
  title: "Painel do Professor | Ducks BJJ",
  description: "Demonstração do painel de chamada, carimbos e avaliações PMA.",
};

export default function ProfessorPage() {
  return <ProfessorDashboard />;
}
