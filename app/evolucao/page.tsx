import type { Metadata } from "next";
import EvolucaoAluno from "@/components/EvolucaoAluno";

export const metadata: Metadata = { title: "Minha Evolução PMA | Ducks BJJ" };
export default function Page() { return <EvolucaoAluno />; }
