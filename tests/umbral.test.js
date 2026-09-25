// El Umbral: nivel, 24 rutinas completas en el rango y una prueba con los
// ejercicios del rango que viene.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { J, fijarFecha, soltarFecha, jugadorEn } from "./ayuda.js";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

// n dias con rutina completa, terminando ayer.
function conCompletas(e, n, desde = new Date(2026, 8, 23)) {
  const d = new Date(desde);
  for (let k = 0; k < n; k++) {
    e.history[J.fechaLocal(d)] = "full";
    d.setDate(d.getDate() - 1);
  }
  return e;
}

function enElUmbral(rango = "E", completas = 0) {
  const e = conCompletas(jugadorEn(rango, J.nivelUmbral[rango]), completas);
  e.ascension.pending = true;
  e.today.completed = true;
  e.today.fullCompletion = true;
  e.history[e.today.date] = "full";
  return e;
}

describe("rutinas completas en el rango", () => {
  it("una partida vieja, sin fecha de inicio del rango, cuenta toda su historia", () => {
    const e = conCompletas(jugadorEn("E"), 10);
    e.history["2026-09-01"] = "partial";
    expect(J.sdcRangoCompletas(e)).toBe(10);
  });

  it("despues de cruzar cuenta solo lo hecho en el rango nuevo, y el dia del cruce no", () => {
    const e = conCompletas(jugadorEn("D"), 30);
    e.rangoDesde = { rank: "D", date: "2026-09-20" };
    expect(J.sdcRangoCompletas(e)).toBe(3); // 21, 22 y 23
  });

  it("si el rango cambio por otro camino, vuelve a contar toda la historia", () => {
    const e = conCompletas(jugadorEn("S"), 5);
    e.rangoDesde = { rank: "Z", date: "2026-09-22" };
    expect(J.sdcRangoCompletas(e)).toBe(5);
  });
});

describe("cruzar el Umbral", () => {
  it(`con menos de ${24} rutinas completas en el rango no cruza, aunque el dia este al 100%`, () => {
    expect(J.sdcUmbralMinDe("E")).toBe(24);
    const r = J.sdcCruzar(enElUmbral("E", 10)); // 10 + hoy = 11
    expect(r.state.progress.rank).toBe("E");
    expect(r.state.ascension.pending).toBe(true);
    expect(r.notices).toEqual([
      "Te faltan 13 rutinas completas en este rango para cruzar el Umbral.",
    ]);
  });

  it("el aviso usa el singular cuando falta una", () => {
    expect(J.sdcCruzar(enElUmbral("E", 22)).notices).toEqual([
      "Te falta 1 rutina completa en este rango para cruzar el Umbral.",
    ]);
  });

  it("con las 24 cruza y el rango nuevo empieza a contar de cero", () => {
    const r = J.sdcCruzar(enElUmbral("E", 23));
    expect(r.state.progress.rank).toBe("D");
    expect(r.state.rangoDesde).toEqual({ rank: "D", date: "2026-09-24" });
    expect(J.sdcRangoCompletas(r.state)).toBe(0);
    expect(r.notices.some((n) => n.startsWith("¡Cruzaste a"))).toBe(true);
  });

  it("sin la rutina de hoy al 100% no cruza aunque tenga las 24", () => {
    const e = enElUmbral("E", 30);
    e.today.fullCompletion = false;
    expect(J.sdcCruzar(e).state.progress.rank).toBe("E");
  });

  it("el minimo crece con el rango: 24, 36, 48, 60, 72 y 84; el ultimo no tiene Umbral", () => {
    expect(["E", "D", "C", "B", "A", "S", "Z"].map(J.sdcUmbralMinDe)).toEqual([
      24, 36, 48, 60, 72, 84, 0,
    ]);
    const e = enElUmbral("D", 30); // 30 + hoy = 31 de 36
    expect(J.sdcUmbralFalta(e)).toBe(5);
    expect(J.sdcCruzar(e).state.progress.rank).toBe("D");
  });

  it("el atajo del panel de pruebas salta el minimo solo para ese rango", () => {
    const e = enElUmbral("E", 0);
    e.umbralForzado = "E";
    const r = J.sdcCruzar(e);
    expect(r.state.progress.rank).toBe("D");
    expect(r.state.umbralForzado).toBeUndefined();
  });
});

describe("la prueba del Umbral usa el rango que viene", () => {
  for (const [rango, sig] of [
    ["E", "D"],
    ["C", "B"],
    ["S", "Z"],
  ])
    it(`${rango} → ${sig}: una rutina de ${sig} repartida en las rondas de ${rango}`, () => {
      const e = jugadorEn(rango, J.nivelUmbral[rango]);
      const p = J.sdcUmbralPrueba(e, "bodyweight");
      expect(p.rango).toBe(sig);
      expect(p.rounds).toBe(J.pruebaUmbral[rango].rounds);
      const vol = J.volumen(
        sig,
        e.profile.classification,
        e.profile.focusProfile,
        "bodyweight",
        e.profile.testResults,
      );
      for (const g of ["squat", "pushup", "back", "abs"]) {
        expect(p.nombres[g]).toBe(J.ejercicioDe(g, sig, "bodyweight", e.today.date).name);
        expect(p.reps[g]).toBe(Math.max(1, Math.round(vol[g] / p.rounds)));
      }
      // En total, una rutina del rango que viene (salvo redondeo), no varias.
      const total = ["squat", "pushup", "back", "abs"].reduce(
        (t, g) => t + p.reps[g] * p.rounds,
        0,
      );
      const rutina = ["squat", "pushup", "back", "abs"].reduce((t, g) => t + vol[g], 0);
      expect(Math.abs(total - rutina)).toBeLessThanOrEqual(2 * p.rounds);
    });

  it("los ejercicios no son los del rango actual", () => {
    const e = jugadorEn("E", 50);
    const p = J.sdcUmbralPrueba(e, "bodyweight");
    const actuales = ["squat", "pushup", "back", "abs"].map(
      (g) => J.ejercicioDe(g, "E", "bodyweight", e.today.date).name,
    );
    expect(Object.values(p.nombres)).not.toEqual(actuales);
  });
});
