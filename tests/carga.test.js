// ei: cargar una partida. Es donde se rompen las partidas viejas.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { J, fijarFecha, soltarFecha, jugadorNuevo, registrar } from "./ayuda.js";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

describe("cargar una partida", () => {
  it("una partida recien jugada se carga igual", () => {
    const s = registrar(jugadorNuevo()).state;
    const c = J.ei(s).state;
    expect(c.progress).toEqual(s.progress);
    expect(c.history).toEqual(s.history);
    expect(c.dominion.points).toBe(s.dominion.points);
  });

  it("sobrevive a JSON (la partida vive como texto en localStorage)", () => {
    const s = registrar(jugadorNuevo()).state;
    const c = J.ei(JSON.parse(JSON.stringify(s))).state;
    expect(c.progress).toEqual(s.progress);
  });

  it("una partida vieja, sin los campos nuevos, carga y los completa", () => {
    const s = registrar(jugadorNuevo()).state;
    delete s.lifetimeModalities;
    delete s.dominion.perks;
    delete s.vistos;
    delete s.animo;
    delete s.skills;
    delete s.care;
    delete s.neuro;
    delete s.disabled;
    delete s.seenUnlocks;
    const c = J.ei(s).state;
    expect(c.dominion.perks).toEqual([]);
    expect(c.lifetimeModalities).toBeDefined();
    expect(c.care.today.date).toBe("2026-09-24");
    expect(c.progress).toEqual(s.progress);
  });

  it("al cambiar de dia cierra el anterior y abre uno nuevo", () => {
    const s = registrar(jugadorNuevo()).state;
    fijarFecha(new Date(2026, 8, 25, 9, 0, 0));
    const c = J.ei(s).state;
    expect(c.today.date).toBe("2026-09-25");
    expect(c.today.completed).toBe(false);
    expect(c.history["2026-09-24"]).toBe("full");
  });
});

describe("rellenar care sin una variable que no existe", () => {
  // L2, kg y fe usaban `t`, que no esta declarada: una partida sin `care`
  // tiraba ReferenceError al tocar un paso de habilidad.
  it("L2 funciona con una partida sin care", () => {
    const s = jugadorNuevo();
    delete s.care;
    const id = J.El[0].id;
    const r = J.L2(s, id, 0);
    expect(r.state.care.today.date).toBe("2026-09-24");
  });
});

describe("fechas", () => {
  it("el dia es el de Argentina, no el de UTC (a las 22 h ya es mañana en UTC)", () => {
    const noche = new Date(2026, 8, 24, 22, 30, 0);
    expect(noche.toISOString().slice(0, 10)).toBe("2026-09-25");
    expect(J.__fechaLocal(noche)).toBe("2026-09-24");
  });

  it("la semana empieza el lunes", () => {
    expect(J.By("2026-09-24")).toBe("2026-09-21");
    expect(J.By("2026-09-21")).toBe("2026-09-21");
    expect(J.By("2026-09-27")).toBe("2026-09-21");
  });
});
