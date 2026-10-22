import type { Metadata } from "next";
import AulaDeHoje from "@/components/AulaDeHoje";

export const metadata: Metadata = {
  title: "Aula de Hoje | Ducks BJJ",
  description: "Demonstração unificada da rotina de chamada, dinâmicas e carimbos.",
};
export default function ProfessorPage() { return <AulaDeHoje />; }
