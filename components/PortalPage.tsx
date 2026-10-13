import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PortalNavigation from "@/components/PortalNavigation";

interface PortalPageProps {
  titulo: string;
  descricao: string;
  children: ReactNode;
}

export default function PortalPage({ titulo, descricao, children }: PortalPageProps) {
  return (
    <div className="relative mx-auto min-h-screen max-w-md border-x border-zinc-800 bg-[#0F0F11] pb-28 font-sans text-zinc-100">
      <header className="rounded-b-2xl border-b border-zinc-800 bg-[#18181B] p-5 shadow-lg">
        <Link href="/" className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#FF6B00] hover:text-orange-300">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Voltar ao início
        </Link>
        <h1 className="text-xl font-extrabold tracking-tight">{titulo}</h1>
        <p className="mt-1 text-sm text-zinc-400">{descricao}</p>
      </header>
      <main className="space-y-5 p-4">{children}</main>
      <PortalNavigation />
    </div>
  );
}
