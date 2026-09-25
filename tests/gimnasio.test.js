// En el gimnasio las reps no suben con el rango: lo que sube es el ejercicio y la
// carga. Y el XP de una rutina completa es el mismo que cuando subian.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { J, fijarFecha, soltarFecha, jugadorEn, registrar } from "./ayuda.js";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

const RANGOS = ["E", "D", "C", "B", "A", "S"];
const GRUPOS = ["squat", "pushup", "back", "abs"];
const FOCOS = ["fuerza", "salud", "resistencia"];
const base = J.sdcBase(null, "principiante", "gym");
const repMult = (f) => J.enfoques.find((x) => x.id === f).repMult;
// Lo que pedia la formula de antes: el rango multiplicaba las reps.
const antes = (g, r, f) =>
  Math.max(
    1,
    Math.round(base[g] * J.factorRango[r] * J.ejercicioDe(g, r, "gym").repFactor * repMult(f)),
  );
const volumen = (r, f) => J.volumen(r, "principiante", f, "gym", null);

describe("gimnasio: las reps de tu enfoque en todos los rangos", () => {
  for (const f of FOCOS)
    it(`${f}: el mismo numero de reps del primer rango al sexto en los ejercicios dinamicos`, () => {
      for (const r of RANGOS)
        for (const g of GRUPOS) {
          const ej = J.ejercicioDe(g, r, "gym");
          if (!J.sdcGymFijo(ej, "gym")) continue;
          expect(volumen(r, f)[g]).toBe(
            Math.max(1, Math.round(base[g] * J.factorRango.E * repMult(f))),
          );
        }
    });

  it("salud hace series de 12/10/8 en piernas, tambien con barra en los rangos altos", () => {
    for (const r of RANGOS) {
      if (!J.sdcGymFijo(J.ejercicioDe("squat", r, "gym"), "gym")) continue;
      const v = volumen(r, "salud").squat;
      expect(J.sdcSplit(v, J.sdcNSets(v))).toEqual([12, 10, 8]);
    }
  });

  it("los sostenes (planchas, pallof) siguen como antes: sus reps son segundos", () => {
    let vistos = 0;
    for (const r of ["E", "D", "C", "B", "A", "S", "Z"])
      for (const g of GRUPOS)
        for (const ej of [].concat(J.ejerciciosGym[g][r])) {
          if (!J.sdcSegs(ej.alt)) continue;
          vistos++;
          expect(J.sdcGymFijo(ej, "gym")).toBe(false);
        }
    expect(vistos).toBeGreaterThan(0);
  });

  it("peso corporal y flow no cambian", () => {
    for (const mod of ["bodyweight", "flow"])
      for (const r of RANGOS)
        for (const g of GRUPOS) expect(J.sdcGymFijo(J.ejercicioDe(g, r, mod), mod)).toBe(false);
  });
});

describe("gimnasio: una rutina completa paga lo mismo que antes", () => {
  for (const f of FOCOS)
    it(`${f}: las reps de hoy, valoradas por sdcGymXp, dan las reps de antes`, () => {
      for (const r of RANGOS) {
        const v = volumen(r, f);
        let hoy = 0,
          viejo = 0;
        for (const g of GRUPOS) {
          hoy += v[g] * J.sdcGymXp(g, r);
          viejo += antes(g, r, f);
        }
        // Solo difieren por el redondeo de cada patron.
        expect(Math.abs(hoy - viejo) / viejo).toBeLessThan(0.05);
      }
    });

  it("registrar la rutina completa en el tercer rango da el XP de las reps de antes", () => {
    const e = jugadorEn("C", 101, { modalities: ["gym"] });
    const meta = J.metaDelDia(e);
    const antesXp = J.xpTotal(e.progress.level, e.progress.currentXP);
    const d = registrar(e, meta).state;
    const ganado = J.xpTotal(d.progress.level, d.progress.currentXP) - antesXp;
    const viejo = GRUPOS.reduce((t, g) => t + antes(g, "C", "salud"), 0);
    // XP = (reps valoradas + 30 de bono) x racha del primer dia; sin otros multiplicadores.
    const esperado = Math.round(Math.round(viejo + 30) * J.sdcRacha(d));
    expect(Math.abs(ganado - esperado)).toBeLessThanOrEqual(Math.ceil(esperado * 0.05));
    expect(GRUPOS.reduce((t, g) => t + meta[g], 0)).toBeLessThan(viejo);
  });
});
