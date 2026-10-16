"use client";

import { useSyncExternalStore } from "react";
import { validarMissaoAtual } from "@/lib/catalogoJornada";

/** Somente conteúdo fictício do MVP; não contém identificação de alunos reais. */
const STORAGE_KEY = "ducks-missoes-atuais-por-turma-demo-v1";
const EVENT_NAME = "ducks-missoes-atuais-demo-atualizadas";

type MissoesPorTurma = Record<string, string>;

function lerRegistros(): MissoesPorTurma {
  if (typeof window === "undefined") return {};
  try {
    const json: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (typeof json !== "object" || json === null || Array.isArray(json)) return {};
    return Object.fromEntries(Object.entries(json).filter(([turma, missao]) =>
      typeof turma === "string" && typeof missao === "string" && Boolean(validarMissaoAtual(missao)),
    ));
  } catch {
    return {};
  }
}

function ouvirAlteracoes(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

const snapshotServidor = () => null;

/** O professor altera a missão de uma turma; o responsável lê o mesmo estado local. */
export function useMissaoAtualDaTurma(turmaId: string) {
  const id = useSyncExternalStore(
    ouvirAlteracoes,
    () => lerRegistros()[turmaId] ?? null,
    snapshotServidor,
  );
  return validarMissaoAtual(id);
}

export function definirMissaoAtualDaTurma(turmaId: string, missaoId: string | null): void {
  if (!turmaId || (missaoId !== null && !validarMissaoAtual(missaoId))) {
    throw new Error("Turma ou missão inválida para o catálogo publicado.");
  }
  const proximo = lerRegistros();
  if (missaoId === null) delete proximo[turmaId];
  else proximo[turmaId] = missaoId;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(proximo));
  window.dispatchEvent(new Event(EVENT_NAME));
}
