// ¿Cuánto mejoraste?: cada prueba queda con su fecha y se compara con la anterior.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { J, jugadorNuevo, fijarFecha, soltarFecha } from "./ayuda.js";

const MEDIDA = { squat: 15, pushup: 10, abs: 15, back: 6, ritmo: 5 };
const HOY = "2026-09-24";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

// Un día N días despues de HOY (jueves 24/09/2026), como texto.
function mas(dias) {
  const d = new Date(2026, 8, 24 + dias, 12);
  return J.fechaLocal(d);
}

describe("la historia de pruebas", () => {
  it("la prueba del inicio queda con fecha solo si la midió la app", () => {
    expect(jugadorNuevo({ testResults: MEDIDA }).pruebas).toEqual([{ fecha: HOY, ...MEDIDA }]);
    const saltado = jugadorNuevo();
    expect(saltado.pruebas).toBeUndefined();
    // Sin lista, se arma con la prueba que haya, sin fecha.
    expect(J.historialPruebas(saltado)).toEqual([{ fecha: null, ...saltado.profile.testResults }]);
  });

  it("repetirla la anota con fecha y dice cuánto mejoraste", () => {
    const e = jugadorNuevo({ testResults: MEDIDA });
    const { state: s, notices } = J.guardarPruebaConHistoria(e, 20, 12, 18, 8, 5, mas(30));
    expect(s.pruebas).toHaveLength(2);
    expect(s.pruebas[1]).toEqual({
      fecha: mas(30),
      squat: 20,
      pushup: 12,
      abs: 18,
      back: 8,
      ritmo: 5,
    });
    expect(s.profile.testResults).toMatchObject({ squat: 20, pushup: 12, abs: 18, back: 8 });
    const aviso = notices.find((n) => n.startsWith("¡Mejoraste!"));
    expect(aviso).toBe("¡Mejoraste! Tu puntaje pasó de 62 a 78 (+16).");
    expect(J.sdcTier(aviso)).toBe("good");
  });

  it("si bajó, lo dice sin festejar", () => {
    const e = jugadorNuevo({ testResults: MEDIDA });
    const { notices } = J.guardarPruebaConHistoria(e, 12, 9, 15, 6, 5, mas(30));
    const aviso = notices.find((n) => n.startsWith("Tu puntaje pasó"));
    expect(aviso).toBe("Tu puntaje pasó de 62 a 57.");
    expect(J.sdcTier(aviso)).toBe("info");
  });

  it("no compara con otro ritmo ni con los valores por defecto", () => {
    const e = jugadorNuevo();
    const { state: s, notices } = J.guardarPruebaConHistoria(e, 20, 12, 18, 8, 5, mas(30));
    expect(notices.some((n) => n.includes("puntaje pasó"))).toBe(false);
    expect(J.primeraYUltima(s)).toBeNull();
  });

  it("una partida vieja compara contra la prueba que tenía, sin fecha", () => {
    const e = jugadorNuevo({ testResults: MEDIDA });
    delete e.pruebas;
    const { state: s } = J.guardarPruebaConHistoria(e, 20, 12, 18, 8, 5, mas(30));
    const par = J.primeraYUltima(s);
    expect(par.primera.fecha).toBeNull();
    expect(J.compararPruebas(par.primera, par.ultima).dif).toBe(16);
  });

  it("compara la primera con la última", () => {
    let e = jugadorNuevo({ testResults: MEDIDA });
    e = J.guardarPruebaConHistoria(e, 18, 11, 16, 7, 5, mas(30)).state;
    e = J.guardarPruebaConHistoria(e, 24, 14, 20, 9, 5, mas(60)).state;
    const par = J.primeraYUltima(e);
    expect(par.primera.fecha).toBe(HOY);
    expect(par.ultima.fecha).toBe(mas(60));
    const cambio = J.compararPruebas(par.primera, par.ultima);
    expect(cambio.grupos.map((g) => g.dif)).toEqual([9, 4, 3, 5]);
    // sentadillas + 2×flexiones + abdominales + 2×remo: 9 + 8 + 5 + 6.
    expect(cambio.dif).toBe(28);
  });
});

describe("cuándo la propone", () => {
  it("a las cuatro semanas de la última, y Más tarde la guarda una semana", () => {
    const e = jugadorNuevo({ testResults: MEDIDA });
    expect(J.tocaRepetirPrueba(e, mas(27))).toBe(false);
    expect(J.tocaRepetirPrueba(e, mas(28))).toBe(true);
    const pospuesta = J.posponerPrueba(e, mas(28));
    expect(J.tocaRepetirPrueba(pospuesta, mas(34))).toBe(false);
    expect(J.tocaRepetirPrueba(pospuesta, mas(35))).toBe(true);
  });

  it("repetirla vuelve a contar desde cero", () => {
    const e = J.guardarPruebaConHistoria(
      jugadorNuevo({ testResults: MEDIDA }),
      20,
      12,
      18,
      8,
      5,
      mas(30),
    ).state;
    expect(J.tocaRepetirPrueba(e, mas(40))).toBe(false);
    expect(J.diasDesdePrueba(e, mas(40))).toBe(10);
  });

  it("sin fecha, cuenta desde el día en que empezaste", () => {
    const e = jugadorNuevo();
    expect(J.diasDesdePrueba(e, mas(28))).toBe(28);
    expect(J.tocaRepetirPrueba(e, mas(28))).toBe(true);
  });
});
