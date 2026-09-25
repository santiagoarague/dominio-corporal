// Varias sesiones por dia, deshacer el registro y anotar un dia olvidado.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  J,
  fijarFecha,
  soltarFecha,
  jugadorNuevo,
  meta,
  registrar,
  nuevaSesion,
  suma,
} from "./ayuda.js";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

describe("dos modalidades el mismo dia", () => {
  function dosSesiones() {
    const e0 = jugadorNuevo({ modalities: ["bodyweight", "flow"] });
    // Sin elegir, Md rota la modalidad del dia segun la fecha.
    e0.today.modality = "bodyweight";
    const r1 = registrar(e0);
    const e1 = nuevaSesion(r1.state, "flow");
    const r2 = registrar(e1);
    return { e0, r1, e1, r2 };
  }

  it("la contabilidad del dia se hace solo en la primera", () => {
    const { r1, r2 } = dosSesiones();
    const a = r1.state;
    const b = r2.state;
    const pdDeSesion = (avisos) => avisos.some((n) => /^\+\d+ Puntos de Dominio\.$/.test(n));
    expect(pdDeSesion(r1.notices)).toBe(true);
    expect(pdDeSesion(r2.notices)).toBe(false);
    expect(b.week.trained).toBe(a.week.trained);
    expect(b.week.fullDays).toBe(a.week.fullDays);
    expect(b.streak.current).toBe(a.streak.current);
    expect(b.history[b.today.date]).toBe("full");
  });

  it("la segunda paga el bono por combinar estilos", () => {
    const { r2 } = dosSesiones();
    expect(r2.notices).toContain("Bono por combinar estilos: +25% XP.");
    expect(r2.state.today.doneModalities).toEqual(["bodyweight", "flow"]);
  });

  it("'hoy' suma las dos sesiones, no solo la ultima", () => {
    const { e0, e1, r2 } = dosSesiones();
    const hoy = J.sdcHoyReps(r2.state);
    expect(suma(hoy)).toBe(suma(meta(e0)) + suma(meta(e1)));
    expect(suma(r2.state.today.reps)).toBe(suma(meta(e1)));
  });
});

describe("deshacer el registro de hoy", () => {
  // Lo que hace el juego: registrar pasa por sdcDeshacerHook, deshacer por sdcDeshacer.
  const registrarComoElJuego = (e) => J.sdcDeshacerHook(e, registrar(e));

  it("vuelve al estado de antes de registrar", () => {
    const e0 = jugadorNuevo();
    const r = registrarComoElJuego(e0);
    const u = J.sdcDeshacer(r.state).state;
    expect(u.progress).toEqual(e0.progress);
    expect(u.dominion.points).toBe(e0.dominion.points);
    expect(u.lifetimeReps).toEqual(e0.lifetimeReps);
    expect(u.week.reps).toEqual(e0.week.reps);
    expect(u.month.reps).toEqual(e0.month.reps);
    expect(u.history[u.today.date]).toBeUndefined();
    expect(u.streak.current).toBe(0);
    expect(u.today.completed).toBe(false);
  });

  it("no infla contadores ni pierde PD al registrar, deshacer y volver a registrar", () => {
    let e = jugadorNuevo();
    const una = registrarComoElJuego(e).state;
    for (let k = 0; k < 3; k++) e = J.sdcDeshacer(registrarComoElJuego(e).state).state;
    const otra = registrarComoElJuego(e).state;
    expect(otra.month.reps).toEqual(una.month.reps);
    expect(otra.month.modalities).toEqual(una.month.modalities);
    expect(otra.week.modalities).toEqual(una.week.modalities);
    expect(otra.lifetimeModalities).toEqual(una.lifetimeModalities);
    expect(otra.dominion.points).toBe(una.dominion.points);
    expect(otra.achievements).toEqual(una.achievements);
    expect(otra.progress).toEqual(una.progress);
  });

  it("sin nada registrado hoy no toca nada", () => {
    const e = jugadorNuevo();
    const r = J.sdcDeshacer(e);
    expect(r.notices).toEqual(["No hay nada que deshacer hoy."]);
    expect(r.state.progress).toEqual(e.progress);
  });
});

describe("anotar un dia que te olvidaste", () => {
  it("lo cuenta como entrenado, sin XP", () => {
    const e = jugadorNuevo();
    const r = J.sdcDiaPasado(e, "2026-09-23");
    expect(r.state.history["2026-09-23"]).toBe("partial");
    expect(r.state.dayLog["2026-09-23"].acts).toContain("Anotado después");
    expect(r.state.progress).toEqual(e.progress);
    expect(r.state.week.sessionDates).toContain("2026-09-23");
  });

  it("la racha se recalcula y nunca baja", () => {
    const e = jugadorNuevo();
    e.history = { "2026-09-21": "full", "2026-09-22": "full" };
    e.streak.current = 2;
    const r = J.sdcDiaPasado(e, "2026-09-23");
    expect(r.state.streak.current).toBe(3);

    const alto = jugadorNuevo();
    alto.streak.current = 9;
    expect(J.sdcDiaPasado(alto, "2026-09-20").state.streak.current).toBe(9);
  });

  it("no pisa un dia ya registrado ni acepta hoy o el futuro", () => {
    const e = jugadorNuevo();
    e.history = { "2026-09-23": "full" };
    expect(J.sdcDiaPasado(e, "2026-09-23").state.history["2026-09-23"]).toBe("full");
    expect(J.sdcDiaPasado(e, "2026-09-24").state.history["2026-09-24"]).toBeUndefined();
  });
});
