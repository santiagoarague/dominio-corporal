// Cada modalidad tiene titulo y descripcion para los siete rangos: sdcRango y
// sdcDescRango no necesitan respaldo (antes caian en nombresRango y descRango).
import { describe, it, expect } from "vitest";
import { J } from "./ayuda.js";

const SETS = ["bodyweight", "gym", "flow"];

describe("titulos de rango por modalidad", () => {
  for (const set of SETS)
    it(`${set}: titulo y descripcion en los siete rangos`, () => {
      expect(J.rangos).toEqual(["E", "D", "C", "B", "A", "S", "Z"]);
      for (const r of J.rangos) {
        expect(typeof J.sdcTitulos[set][r]).toBe("string");
        expect(J.sdcTitulos[set][r].length).toBeGreaterThan(0);
        expect(typeof J.sdcDescs[set][r]).toBe("string");
        expect(J.sdcDescs[set][r].length).toBeGreaterThan(0);
      }
    });

  it("sdcJuego siempre elige un conjunto que existe", () => {
    const perfiles = [
      null,
      {},
      { modalities: [] },
      { modalities: ["gym"] },
      { modalities: ["flow", "gym"], tituloSet: "gym" },
      { modalities: ["bodyweight"], tituloSet: "inexistente" },
    ];
    for (const p of perfiles) expect(SETS).toContain(J.sdcJuego(p));
  });

  it("sdcRango y sdcDescRango leen el conjunto de la modalidad", () => {
    expect(J.sdcRango("E", { modalities: ["gym"] })).toBe("Barra");
    expect(J.sdcRango("Z", { modalities: ["flow"] })).toBe("Vuelo");
    expect(J.sdcDescRango("E", { modalities: ["bodyweight"] })).toBe(
      "Regresión base — el suelo te ayuda",
    );
  });
});
