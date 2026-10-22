"use client";

import { useSyncExternalStore } from "react";
import { REGISTROS_INICIAIS, type RegistrosDemo } from "./registrosDemo";

const CHAVE = "ducks-registros-unificados-demo-v1";
const EVENTO = "ducks-registros-demo-alterados";
const INICIAL = JSON.stringify(REGISTROS_INICIAIS);

function snapshot() {
  try { return window.localStorage.getItem(CHAVE) ?? INICIAL; }
  catch { return INICIAL; }
}
function snapshotServidor() { return INICIAL; }
function assinar(callback: () => void) {
  const aoMudar = (event: StorageEvent) => { if (event.key === CHAVE || event.key === null) callback(); };
  window.addEventListener("storage", aoMudar);
  window.addEventListener(EVENTO, callback);
  return () => { window.removeEventListener("storage", aoMudar); window.removeEventListener(EVENTO, callback); };
}
function interpretar(raw: string): RegistrosDemo {
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("avaliacoes" in value) || !("aulas" in value)) return REGISTROS_INICIAIS;
    const data = value as RegistrosDemo;
    if (!Array.isArray(data.avaliacoes) || !Array.isArray(data.aulas)) return REGISTROS_INICIAIS;
    return data;
  } catch { return REGISTROS_INICIAIS; }
}
export function useRegistrosDemo(): RegistrosDemo {
  return interpretar(useSyncExternalStore(assinar, snapshot, snapshotServidor));
}
export function atualizarRegistrosDemo(fn: (dados: RegistrosDemo) => RegistrosDemo): void {
  const novo = fn(interpretar(snapshot()));
  window.localStorage.setItem(CHAVE, JSON.stringify(novo));
  window.dispatchEvent(new Event(EVENTO));
}
export function reiniciarRegistrosDemo(): void {
  window.localStorage.removeItem(CHAVE);
  window.dispatchEvent(new Event(EVENTO));
}
