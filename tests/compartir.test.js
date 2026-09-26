// Compartir mi semana: lo que dice la imagen.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { J, jugadorNuevo, fijarFecha, soltarFecha } from "./ayuda.js";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

describe("compartir mi semana", () => {
  it("la semana, también entre dos meses", () => {
    expect(J.rangoSemana("2026-09-21", "2026-09-27")).toBe("21 al 27 de septiembre");
    expect(J.rangoSemana("2026-09-28", "2026-10-04")).toBe("28 de septiembre al 4 de octubre");
  });

  it("los siete días con su estado, las sesiones, las reps, la racha y el nivel", () => {
    const e = jugadorNuevo({ name: "Santi", weeklyGoal: 3 });
    e.week.sessionDates = ["2026-09-21", "2026-09-22"];
    e.week.trained = 2;
    e.week.reps = { squat: 20, pushup: 10, back: 5, abs: 15 };
    e.history = { "2026-09-21": "full", "2026-09-22": "partial", "2026-09-23": "skipped" };
    e.streak.current = 2;
    const d = J.datosSemana(e, "2026-09-24");
    expect(d.dias.map((dia) => dia.estado)).toEqual([
      "full",
      "partial",
      "skipped",
      "pending",
      "futuro",
      "futuro",
      "futuro",
    ]);
    expect(d).toMatchObject({
      nombre: "Santi",
      rango: "21 al 27 de septiembre",
      sesiones: 2,
      meta: 3,
      reps: 50,
      racha: 2,
      nivel: 1,
    });
  });
});
