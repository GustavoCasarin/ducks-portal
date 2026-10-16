import { redirect } from "next/navigation";

/** Compatibilidade com links salvos da antiga tela de 27 casas. */
export default function TrilhaLegadaPage() {
  redirect("/jornada");
}
