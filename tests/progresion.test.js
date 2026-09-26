// XP, niveles, Umbral y lo que paga una rutina.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  J,
  fijarFecha,
  soltarFecha,
  jugadorNuevo,
  jugadorEn,
  meta,
  registrar,
  parte,
  suma,
  nuevaSesion,
} from "./ayuda.js";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

describe("curva de XP", () => {
  it("el nivel 1 cuesta 48 XP", () => {
    expect(J.costoNivel(1)).toBe(48);
  });

  it("no salta al cruzar el nivel 50 (antes iba de 192 a 375)", () => {
    expect(J.costoNivel(49)).toBe(192);
    expect(J.costoNivel(50)).toBe(195);
  });

  it("siempre sube", () => {
    for (let n = 1; n < 400; n++) expect(J.costoNivel(n + 1)).toBeGreaterThan(J.costoNivel(n));
  });

  it("la escalera de Umbrales es la de CLAUDE.md", () => {
    expect(J.nivelUmbral).toEqual({ E: 50, D: 100, C: 140, B: 180, A: 220, S: 260 });
    expect(J.rangos.join("")).toBe("EDCBASZ");
  });
});

describe("Ea: subir de nivel", () => {
  it("sube varios niveles de una vez si alcanza la XP", () => {
    const e = jugadorNuevo();
    e.progress.currentXP = J.costoNivel(1) + J.costoNivel(2) + 5;
    const avisos = [];
    const r = J.subirNiveles(e, avisos);
    expect(r.progress.level).toBe(3);
    expect(r.progress.currentXP).toBe(5);
    expect(avisos).toEqual(expect.arrayContaining(["Subiste a nivel 2.", "Subiste a nivel 3."]));
  });

  it("se detiene en el Umbral y lo marca pendiente, sin gastar la XP que sobra", () => {
    const e = jugadorEn("E", 49);
    e.progress.currentXP = 10000;
    const r = J.subirNiveles(e, []);
    expect(r.progress.level).toBe(50);
    expect(r.ascension.pending).toBe(true);
    expect(r.progress.currentXP).toBe(10000 - J.costoNivel(49));
  });
});

describe("cruzar el Umbral", () => {
  function listoParaCruzar(completo) {
    const e = jugadorEn("E", 50);
    e.ascension.pending = true;
    e.today.completed = completo;
    e.today.fullCompletion = completo;
    return e;
  }

  it("con la rutina de hoy al 100% pasa al rango siguiente", () => {
    const r = J.cruzarUmbralBase(listoParaCruzar(true));
    expect(r.state.progress.rank).toBe("D");
    expect(r.state.ascension.pending).toBe(false);
    expect(r.notices.some((n) => n.startsWith("¡Cruzaste a"))).toBe(true);
  });

  it("sin la rutina completa no pasa", () => {
    const r = J.cruzarUmbralBase(listoParaCruzar(false));
    expect(r.state.progress.rank).toBe("E");
    expect(r.state.ascension.pending).toBe(true);
  });
});

describe("la primera rutina", () => {
  it("con los valores por defecto: meta, XP, nivel, PD y logros exactos", () => {
    const e = jugadorNuevo();
    expect(meta(e)).toEqual({ squat: 12, pushup: 8, back: 5, abs: 10 });
    const { state: s } = registrar(e);
    expect(s.today.xpEarned).toBe(66);
    expect(s.progress).toEqual({ rank: "E", level: 2, currentXP: 18 });
    expect(s.dominion.points).toBe(5);
    expect(s.achievements).toEqual(["e_first", "e_full"]);
    expect(s.history[s.today.date]).toBe("full");
    expect(s.streak.current).toBe(1);
  });

  // La recompensa mas barata y la que mas carga lleva: cualquier cambio a li,
  // al bono de +30 o al modelo de volumen tiene que conservarla.
  const clases = ["principiante", "intermedio", "avanzado"];
  const enfoques = ["fuerza", "resistencia", "salud"];
  const modalidades = ["bodyweight", "gym", "flow"];
  const pruebas = [
    undefined,
    { squat: 0, pushup: 0, abs: 0, back: 0 },
    { squat: 15, pushup: 10, abs: 15, back: 6 },
    { squat: 80, pushup: 45, abs: 70, back: 25 },
  ];
  for (const modalities of modalidades)
    for (const classification of clases)
      for (const focusProfile of enfoques)
        it(`sube a nivel 2 · ${modalities} · ${classification} · ${focusProfile}`, () => {
          for (const testResults of pruebas) {
            const e = jugadorNuevo({
              modalities: [modalities],
              classification,
              focusProfile,
              testResults,
            });
            const { state: s } = registrar(e);
            expect(s.progress.level, JSON.stringify(testResults)).toBeGreaterThanOrEqual(2);
          }
        });
});

describe("sin castigo", () => {
  // La misma partida abierta N dias despues (HOY es jueves 24/09).
  function alOtroDia(e, dias = 1) {
    fijarFecha(new Date(2026, 8, 24 + dias, 12));
    return J.cargarPartida(e);
  }

  it("una sesion corta no quita XP, no corta la racha en el acto y no es falta", () => {
    const e = jugadorNuevo();
    e.progress.currentXP = 40;
    e.streak.current = 5;
    const { state: s, notices } = registrar(e, parte(e, 0.2));
    // Con la racha intacta puede subir de nivel: se compara la XP total.
    expect(J.xpTotal(s.progress.level, s.progress.currentXP)).toBeGreaterThan(J.xpTotal(1, 40));
    expect(s.streak.current).toBe(5);
    expect(s.streak.missed).toBe(0);
    expect(s.history[s.today.date]).toBeUndefined();
    const aviso = notices.find((n) => n.startsWith("Sesión corta"));
    expect(aviso).toBeTruthy();
    expect(J.sdcTier(aviso)).toBe("info");
  });

  it("al otro dia queda igual que no haber entrenado, no peor", () => {
    const e = jugadorNuevo();
    e.streak.current = 5;
    const corta = registrar(e, parte(e, 0.2)).state;
    const nada = alOtroDia(e).state;
    const conCorta = alOtroDia(corta).state;
    expect(nada.history["2026-09-24"]).toBe("skipped");
    expect(conCorta.history["2026-09-24"]).toBe("skipped");
    expect(conCorta.streak.current).toBe(nada.streak.current);
    expect(conCorta.streak.missed).toBe(nada.streak.missed);
  });

  it("otra sesion el mismo dia hace que el dia cuente", () => {
    const e = jugadorNuevo();
    e.streak.current = 5;
    const corta = registrar(e, parte(e, 0.2)).state;
    const otra = nuevaSesion(corta, "flow");
    const { state: s } = registrar(otra, parte(otra, 0.6));
    expect(s.today.corta).toBeUndefined();
    expect(s.streak.current).toBe(6);
    const manana = alOtroDia(s).state;
    expect(manana.history["2026-09-24"]).toBe("partial");
    expect(manana.streak.current).toBe(6);
  });

  it("deshacer devuelve la racha diaria que habia antes", () => {
    const e = jugadorNuevo();
    e.streak.current = 5;
    const corta = J.deshacerRegistroBase(registrar(e, parte(e, 0.2)).state).state;
    expect(corta.streak.current).toBe(5);
    expect(corta.today.corta).toBeUndefined();
    const completa = J.deshacerRegistroBase(registrar(e).state).state;
    expect(completa.streak.current).toBe(5);
  });

  it("un domingo sin rutina con la semana cumplida no es falta", () => {
    fijarFecha(new Date(2026, 8, 27, 12));
    const e = jugadorNuevo({ weeklyGoal: 3 });
    e.week.sessionDates = ["2026-09-21", "2026-09-22", "2026-09-23"];
    e.week.trained = 3;
    fijarFecha(new Date(2026, 8, 28, 12));
    const { state: s, notices } = J.cargarPartida(e);
    expect(s.history["2026-09-27"]).toBe("skipped");
    expect(s.streak.missed).toBe(0);
    expect(notices.some((n) => n.startsWith("Semana cumplida"))).toBe(true);
    expect(notices.some((n) => n.startsWith("Ya no podés alcanzar"))).toBe(false);
  });

  it("un domingo sin rutina con la semana sin cumplir si es falta", () => {
    fijarFecha(new Date(2026, 8, 27, 12));
    const e = jugadorNuevo({ weeklyGoal: 3 });
    e.week.sessionDates = ["2026-09-21"];
    e.week.trained = 1;
    fijarFecha(new Date(2026, 8, 28, 12));
    const { state: s, notices } = J.cargarPartida(e);
    expect(s.history["2026-09-27"]).toBe("missed");
    expect(s.streak.missed).toBe(1);
    expect(notices.some((n) => n.startsWith("Ya no podés alcanzar"))).toBe(true);
  });

  it("una rutina parcial (50% o mas) da 1 PD y cuenta como dia entrenado", () => {
    const e = jugadorNuevo();
    const { state: s } = registrar(e, parte(e, 0.6));
    expect(s.history[s.today.date]).toBe("partial");
    expect(s.streak.current).toBe(1);
    expect(s.dominion.points).toBeGreaterThanOrEqual(1);
  });

  it("la XP base es lo que hiciste: nunca paga menos que las reps", () => {
    const e = jugadorNuevo({ focusProfile: "salud" });
    const m = meta(e);
    const { state: s } = registrar(e);
    expect(s.today.xpEarned).toBeGreaterThanOrEqual(suma(m));
  });
});

describe("los tres enfoques pagan parecido por el mismo trabajo", () => {
  function xpPorEnfoque(modalidad, rango) {
    const out = {};
    for (const f of ["fuerza", "resistencia", "salud"]) {
      const e = jugadorEn(rango, 10, {
        focusProfile: f,
        modalities: [modalidad],
        classification: "intermedio",
      });
      out[f] = registrar(e).state.today.xpEarned;
    }
    return out;
  }
  const brecha = (x) => Math.max(...Object.values(x)) / Math.min(...Object.values(x));

  // El bono de +30 no se multiplica por el enfoque (con fuerza a 1.5 cobraba
  // ~20% mas en peso corporal) y resistencia paga 1.4 × 0.72 ≈ 1 por rep.
  for (const modalidad of ["bodyweight", "gym", "flow"])
    for (const rango of ["E", "C", "S"])
      it(`${modalidad} ${rango}: la diferencia es menor al 5%`, () => {
        expect(brecha(xpPorEnfoque(modalidad, rango))).toBeLessThan(1.05);
      });

  it("el bono por rutina completa es el mismo para los tres", () => {
    for (const f of ["fuerza", "resistencia", "salud"]) {
      const e = jugadorEn("C", 10, { focusProfile: f });
      const completa = registrar(e).state.today.xpEarned;
      const casi = registrar(e, parte(e, 0.99)).state.today.xpEarned;
      expect(completa - casi, f).toBeGreaterThanOrEqual(30);
      expect(completa - casi, f).toBeLessThan(30 + 10);
    }
  });
});
