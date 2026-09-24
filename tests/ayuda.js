// Utilidades compartidas por las pruebas: un jugador nuevo como el que deja
// "Saltar y empezar con valores por defecto", y registrar una rutina igual que
// lo hace el boton "Completar rutina".
import { vi } from "vitest";
import * as J from "../src/juego.js";

export { J };

export const PERFIL_SALTAR = {
  name: "Atleta",
  focusProfile: "salud",
  modalities: ["bodyweight"],
  weeklyGoal: 3,
  classification: "principiante",
  startRank: "E",
  testResults: { squat: 15, pushup: 10, abs: 15, back: 6 },
  pet: { type: "dog", name: "" },
};

// Jueves 24/09/2026 al mediodia, hora argentina.
export const HOY = new Date(2026, 8, 24, 12, 0, 0);

export function fijarFecha(d = HOY) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(d);
}

export function soltarFecha() {
  vi.useRealTimers();
}

export function jugadorNuevo(perfil = {}) {
  return J.crearPartida({ ...PERFIL_SALTAR, ...perfil });
}

// Un jugador en un rango y nivel concretos, con el dia ya en ese rango.
export function jugadorEn(rango, nivel = 1, perfil = {}) {
  const e = jugadorNuevo({ ...perfil, startRank: rango });
  e.progress.level = nivel;
  return e;
}

export function meta(e) {
  return J.metaDelDia(e);
}

export function suma(r) {
  return (r.squat || 0) + (r.pushup || 0) + (r.back || 0) + (r.abs || 0);
}

// Lo que hace pg(): i5 con las reps hechas, sin reclamar el modificador.
export function registrar(e, reps = meta(e), { modo = "normal", modificador = false } = {}) {
  return J.registrarRutina(e, modo, reps, modificador, null);
}

// Una fraccion de la meta, grupo por grupo.
export function parte(e, f) {
  const m = meta(e);
  const r = {};
  for (const g of Object.keys(m)) r[g] = Math.floor(m[g] * f);
  return r;
}

// Lo que hace mmNueva(): abre otra sesion del dia con otra modalidad.
export function nuevaSesion(e, modalidad) {
  const m = J.clonar(e);
  m.today.modality = modalidad;
  m.today.completed = false;
  m.today.mode = "pending";
  m.today.fullCompletion = false;
  m.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 };
  delete m.undoSnapshot;
  return m;
}
