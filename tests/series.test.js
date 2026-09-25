// Series, metronomo y como se ven los avisos.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { J, fijarFecha, soltarFecha, jugadorNuevo, registrar } from "./ayuda.js";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

describe("series", () => {
  it("3 series desde 6 reps, 2 desde 3, si no 1", () => {
    expect(J.sdcNSets(1)).toBe(1);
    expect(J.sdcNSets(2)).toBe(1);
    expect(J.sdcNSets(3)).toBe(2);
    expect(J.sdcNSets(5)).toBe(2);
    expect(J.sdcNSets(6)).toBe(3);
    expect(J.sdcNSets(200)).toBe(3);
  });

  it("ninguna serie vale 0, suman el total y van de mayor a menor", () => {
    for (let t = 1; t <= 400; t++) {
      const s = J.sdcSplit(t, J.sdcNSets(t));
      expect(
        s.reduce((a, b) => a + b, 0),
        `total ${t}`,
      ).toBe(t);
      expect(Math.min(...s), `total ${t}: ${s}`).toBeGreaterThanOrEqual(1);
      for (let k = 1; k < s.length; k++)
        expect(s[k], `total ${t}: ${s}`).toBeLessThanOrEqual(s[k - 1]);
    }
  });

  it("sdcSuma cuenta las reps de las primeras k series", () => {
    expect(J.sdcSplit(30, 3)).toEqual([12, 10, 8]);
    expect(J.sdcSuma(30, 3, 0)).toBe(0);
    expect(J.sdcSuma(30, 3, 2)).toBe(22);
    expect(J.sdcSuma(30, 3, 3)).toBe(30);
  });
});

describe("reloj del sostén", () => {
  const ini = 1_000_000;
  const en = (s, pausa = 0) => J.sdcSostenEstado(ini, pausa, 10, 12, ini + s * 1000);

  it("primero 10 s para ponerse en posición, sin contar sostén", () => {
    expect(J.sdcSostenPrep).toBe(10);
    expect(en(0)).toEqual({ fase: "prep", quedan: 10, hecho: 0 });
    expect(en(7.2)).toEqual({ fase: "prep", quedan: 3, hecho: 0 });
  });

  it("después cuenta el sostén hasta el total y termina", () => {
    expect(en(10)).toEqual({ fase: "sosten", quedan: 12, hecho: 0 });
    expect(en(17.5)).toEqual({ fase: "sosten", quedan: 5, hecho: 7 });
    expect(en(22)).toEqual({ fase: "fin", quedan: 0, hecho: 12 });
    expect(en(300)).toEqual({ fase: "fin", quedan: 0, hecho: 12 });
  });

  it("en pausa se congela: cuenta hasta el momento en que se pausó", () => {
    const pausa = ini + 15_000;
    expect(en(15, pausa)).toEqual(en(60, pausa));
    expect(en(60, pausa)).toEqual({ fase: "sosten", quedan: 7, hecho: 5 });
  });
});

describe("metronomo segun el modificador del dia", () => {
  const normal = { b: 2, p: 1, s: 2 };
  const buscar = (mod, n) => J.sdcMods[mod].find((m) => m.n === n);

  it("Tempo baja en 3 segundos, en peso corporal y en gimnasio", () => {
    expect(J.sdcTempoMod(buscar("bodyweight", "Tempo"))).toEqual({ b: 3, p: 1, s: 2 });
    expect(J.sdcTempoMod(buscar("gym", "Tempo"))).toEqual({ b: 3, p: 1, s: 2 });
  });

  it("Control del flow va a mitad de velocidad", () => {
    expect(J.sdcTempoMod(buscar("flow", "Control"))).toEqual({ b: 4, p: 1, s: 4 });
  });

  it("Drop set y Carga alta no tocan el metronomo aunque digan 'baja'", () => {
    expect(J.sdcTempoMod(buscar("gym", "Drop set"))).toEqual(normal);
    expect(J.sdcTempoMod(buscar("gym", "Carga alta"))).toEqual(normal);
  });

  it("solo tres de los dieciocho modificadores cambian el tempo", () => {
    const todos = Object.values(J.sdcMods).flat();
    expect(todos).toHaveLength(18);
    const cambian = todos.filter(
      (m) => JSON.stringify(J.sdcTempoMod(m)) !== JSON.stringify(normal),
    );
    expect(cambian.map((m) => m.n).sort()).toEqual(["Control", "Tempo", "Tempo"]);
  });
});

describe("avisos: sdcTier clasifica por el texto", () => {
  it("clasifica los textos que importan", () => {
    expect(J.sdcTier("Subiste a nivel 2.")).toBe("epic");
    expect(J.sdcTier("¡Cruzaste a Eje!")).toBe("epic");
    expect(J.sdcTier("Primera vez: 10 dominadas.")).toBe("epic");
    expect(J.sdcTier("Volviste al último rango. Las metas vuelven a salir de tus récords.")).toBe(
      "epic",
    );
    expect(J.sdcTier("Sesión corta (20%). Conservas tu XP, pero la racha vuelve a empezar.")).toBe(
      "bad",
    );
    expect(J.sdcTier('¡Travesía completada! "El Motor" +40 XP.')).toBe("good");
    expect(J.sdcTier("+25 XP: nueva marca de carga. Prensa 60 → 65 kg")).toBe("good");
    expect(J.sdcTier("Logros: 7 logros desbloqueados (+9 PD).")).toBe("good");
  });

  // Si alguien cambia el texto de un aviso sin cambiar sdcTier, un premio se
  // ve como una linea gris. Esta prueba usa los avisos reales del juego.
  it("los avisos reales de una primera rutina se clasifican bien", () => {
    const { notices } = registrar(jugadorNuevo());
    const tier = (prefijo) => J.sdcTier(notices.find((n) => n.startsWith(prefijo)));
    expect(tier("Subiste a nivel")).toBe("epic");
    expect(tier("¡Rutina completa!")).toBe("good");
    expect(tier("+3 Puntos de Dominio")).toBe("good");
    expect(tier("🏆 Logro desbloqueado")).toBe("good");
  });
});
