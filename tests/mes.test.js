// Resumen del mes: lo que hiciste en el mes que terminó, contra el de antes.
import { describe, it, expect } from "vitest";
import { J, jugadorNuevo } from "./ayuda.js";

function conDias(e) {
  e.dayLog = {
    "2026-08-10": {
      acts: ["Rutina parcial"],
      reps: { squat: 10, pushup: 5, back: 3, abs: 7 },
      xp: 40,
    },
    "2026-09-01": {
      acts: ["Rutina completa"],
      reps: { squat: 12, pushup: 9, back: 6, abs: 8 },
      xp: 66,
    },
    "2026-09-02": { acts: ["Travesía"], reps: null, xp: 0 },
    "2026-09-03": {
      acts: ["Rutina completa"],
      reps: { squat: 12, pushup: 9, back: 6, abs: 8 },
      xp: 70,
    },
    "2026-09-04": { acts: [], reps: null, xp: 0 },
    "2026-10-01": {
      acts: ["Rutina parcial"],
      reps: { squat: 6, pushup: 4, back: 3, abs: 4 },
      xp: 30,
    },
  };
  e.primeras = [
    { fecha: "2026-09-03", texto: "Flexiones completas", origen: "declarada" },
    { fecha: "2026-08-20", texto: "Dominada", origen: "escrita" },
  ];
  return e;
}

describe("resumen del mes", () => {
  it("el mes anterior, también entre años", () => {
    expect(J.claveMesAnterior("2026-10-02")).toBe("2026-09");
    expect(J.claveMesAnterior("2026-01-05")).toBe("2025-12");
    expect(J.nombreMes("2026-09")).toBe("septiembre");
  });

  it("cuenta días con alguna sesión, días perfectos, reps, XP y primeras veces", () => {
    const e = conDias(jugadorNuevo());
    expect(J.resumenMes(e, "2026-09")).toEqual({
      clave: "2026-09",
      dias: 3,
      perfectos: 2,
      reps: 70,
      xp: 136,
      primeras: 1,
    });
    expect(J.resumenMes(e, "2026-08")).toMatchObject({ dias: 1, reps: 25, primeras: 1 });
  });

  it("sale los primeros 10 días del mes nuevo, hasta que lo cerrás", () => {
    const e = conDias(jugadorNuevo());
    expect(J.tocaResumenMes(e, "2026-10-03").clave).toBe("2026-09");
    expect(J.tocaResumenMes(e, "2026-10-10").clave).toBe("2026-09");
    expect(J.tocaResumenMes(e, "2026-10-11")).toBeNull();
    const cerrado = J.cerrarResumenMes(e, "2026-09");
    expect(cerrado.ui.resumenMesVisto).toBe("2026-09");
    expect(J.tocaResumenMes(cerrado, "2026-10-03")).toBeNull();
  });

  it("un mes sin nada que resumir no sale", () => {
    const e = conDias(jugadorNuevo());
    expect(J.tocaResumenMes(e, "2026-12-02")).toBeNull();
  });
});
