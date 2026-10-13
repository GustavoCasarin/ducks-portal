"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarDays, Compass, House } from "lucide-react";

const itens = [
  { href: "/", rotulo: "Início", icone: House },
  { href: "/trilha", rotulo: "Trilha", icone: Compass },
  { href: "/passaporte", rotulo: "Passaporte", icone: BookOpen },
  { href: "/aulas", rotulo: "Aulas", icone: CalendarDays },
];

export default function PortalNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal do portal do aluno"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-md items-center justify-between border-t border-zinc-800 bg-[#18181B]/95 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-md"
    >
      {itens.map(({ href, rotulo, icone: Icone }) => {
        const ativo = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={ativo ? "page" : undefined}
            className={`flex min-h-11 min-w-16 flex-col items-center justify-center gap-1 rounded-lg px-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B00] ${ativo ? "font-bold text-[#FF6B00]" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            <Icone aria-hidden="true" className="h-5 w-5" />
            <span className="text-[11px]">{rotulo}</span>
          </Link>
        );
      })}
    </nav>
  );
}
