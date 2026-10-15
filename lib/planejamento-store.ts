"use client";

import { useSyncExternalStore } from "react";
import { PLANEJAMENTO_STORAGE, type PlanoDemo } from "@/lib/planejamentoDemo";

const vazio: PlanoDemo[] = [];
let atual: PlanoDemo[] = vazio;
let inicializado = false;
const assinantes = new Set<() => void>();

function avisoMudanca() {
  for (const assinante of assinantes) assinante();
}

function lerStorage(): PlanoDemo[] {
  try {
    const bruto = window.localStorage.getItem(PLANEJAMENTO_STORAGE);
    if (!bruto) return [];
    const parsed: unknown = JSON.parse(bruto);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((p): p is PlanoDemo =>
      typeof p === "object" && p !== null &&
      typeof p.id === "string" && typeof p.turmaId === "string" &&
      typeof p.missaoId === "string" && typeof p.dinamicaId === "string" &&
      typeof p.periodo === "string" && typeof p.criadaEm === "string" &&
      ["PLANEJADA", "REALIZADA", "CANCELADA"].includes(p.situacao),
    );
  } catch {
    return [];
  }
}

function hidratar() {
  if (inicializado || typeof window === "undefined") return;
  atual = lerStorage();
  inicializado = true;
}

function snapshot() {
  hidratar();
  return atual;
}

function snapshotServidor() {
  return vazio;
}

function storageMudou(evento: StorageEvent) {
  if (evento.key === PLANEJAMENTO_STORAGE || evento.key === null) {
    atual = lerStorage();
    inicializado = true;
    avisoMudanca();
  }
}

function subscribe(callback: () => void) {
  assinantes.add(callback);
  if (assinantes.size === 1) window.addEventListener("storage", storageMudou);
  return () => {
    assinantes.delete(callback);
    if (assinantes.size === 0) window.removeEventListener("storage", storageMudou);
  };
}

export function usePlanosDemo(): PlanoDemo[] {
  return useSyncExternalStore(subscribe, snapshot, snapshotServidor);
}

export function atualizarPlanosDemo(transformar: (planos: PlanoDemo[]) => PlanoDemo[]): void {
  hidratar();
  const proximo = transformar(atual);
  window.localStorage.setItem(PLANEJAMENTO_STORAGE, JSON.stringify(proximo));
  atual = proximo;
  avisoMudanca();
}

export function limparPlanosDemo(): void {
  window.localStorage.removeItem(PLANEJAMENTO_STORAGE);
  atual = [];
  inicializado = true;
  avisoMudanca();
}
