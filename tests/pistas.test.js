// El compañero que se asoma: cuándo sale, qué cuenta y qué deja de contar.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { J, jugadorNuevo, fijarFecha, soltarFecha } from "./ayuda.js";

const HOY = "2026-09-24";
const CLAVE = HOY + "|bodyweight";

// Un jugador que ya entrenó otro día: el primer día el compañero no sale.
function veterano() {
  const e = jugadorNuevo();
  e.history = { "2026-09-22": "full" };
  return e;
}
const ids = J.pistas.map((p) => p.id);

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

describe("cuándo se asoma", () => {
  it("el primer día no sale, desde el segundo sí", () => {
    expect(J.companeroListo(jugadorNuevo(), CLAVE, HOY)).toBe(false);
    const hoyNomas = jugadorNuevo();
    hoyNomas.history = { [HOY]: "full" };
    expect(J.companeroListo(hoyNomas, CLAVE, HOY)).toBe(false);
    expect(J.companeroListo(veterano(), CLAVE, HOY)).toBe(true);
  });

  it("una vez por sesión: otra modalidad el mismo día es otra sesión", () => {
    const e = J.anotarCompanero(veterano(), CLAVE);
    expect(J.companeroListo(e, CLAVE, HOY)).toBe(false);
    expect(J.companeroListo(e, HOY + "|flow", HOY)).toBe(true);
    expect(J.companeroListo(e, "2026-09-25|bodyweight", "2026-09-25")).toBe(true);
  });

  it("se apaga en Sistemas del juego", () => {
    const e = veterano();
    e.disabled = ["companero"];
    expect(J.companeroListo(e, CLAVE, HOY)).toBe(false);
  });

  it("asomarse lo da por conocido: no llega después como sistema nuevo", () => {
    const e = J.anotarCompanero(veterano(), CLAVE);
    const { notices } = J.avisarSistemasNuevos(e);
    expect(notices.some((n) => n.includes("Tu compañero"))).toBe(false);
  });
});

describe("qué cuenta", () => {
  it("lo primero de la lista que está en pantalla y va con el momento", () => {
    const e = veterano();
    expect(J.elegirPista(e, "descanso", ids, HOY).id).toBe("desmarcar");
    expect(J.elegirPista(e, "descanso", ["guia", "ajustar"], HOY).id).toBe("ajustar");
    expect(J.elegirPista(e, "resumen", ids, HOY).id).toBe("estirar");
    // Lo del descanso no sale en el resumen, ni al revés.
    expect(J.elegirPista(e, "resumen", ["ajustar", "guia"], HOY).id).toBe("recuperacion");
    expect(J.elegirPista(e, "descanso", ["estirar", "minimizar"], HOY).id).toBe("minimizar");
  });

  it("no cuenta lo que ya usaste ni lo que ya te contó", () => {
    let e = J.anotarPistaUsada(veterano(), "desmarcar", HOY);
    e = J.anotarPistaVista(e, "ajustar", HOY);
    expect(J.elegirPista(e, "descanso", ids, HOY).id).toBe("relajar");
  });

  it("lo que la partida ya dice usado tampoco", () => {
    const e = veterano();
    e.week.stretchCount = 1;
    expect(J.elegirPista(e, "resumen", ids, HOY).id).toBe("constancia");
    e.today.mode = "recovery";
    expect(J.elegirPista(e, "resumen", ["guia"], HOY).id).toBe("guia");
  });

  it("sin nada nuevo, un consejo de entrenamiento distinto del de la tarjeta", () => {
    const e = veterano();
    for (const p of J.pistas) e.pistas = J.anotarPistaUsada(e, p.id, HOY).pistas;
    for (let d = 1; d <= 30; d++) {
      const fecha = "2026-10-" + String(d).padStart(2, "0");
      const pista = J.elegirPista(e, "descanso", ids, fecha);
      expect(pista.id).toBe(null);
      expect(J.consejos).toContain(pista.texto);
      expect(pista.texto).not.toBe(J.consejoDelDia(fecha));
    }
  });

  it("anotar lo ya anotado devuelve la misma partida: no se guarda de nuevo", () => {
    const e = J.anotarPistaUsada(veterano(), "ajustar", HOY);
    expect(J.anotarPistaUsada(e, "ajustar", "2026-09-30")).toBe(e);
  });

  it("cada pista tiene su botón marcado con data-pista en la app", () => {
    let fuente = "";
    const leer = (dir) => {
      for (const f of readdirSync(dir)) {
        const ruta = join(dir, f);
        if (statSync(ruta).isDirectory()) leer(ruta);
        else if (f.endsWith(".jsx")) fuente += readFileSync(ruta, "utf8");
      }
    };
    leer(new URL("../src/ui", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1"));
    for (const id of ids)
      expect(
        fuente.includes('data-pista="' + id + '"') ||
          fuente.includes('pista="' + id + '"') ||
          fuente.includes('"' + id + '" : void 0'),
        id,
      ).toBe(true);
  });

  it("los textos entran en una lectura: una o dos oraciones cortas", () => {
    for (const p of J.pistas) {
      expect(p.texto.length, p.id).toBeLessThanOrEqual(140);
      expect(p.texto.split(/[.?!:] /).length, p.id).toBeLessThanOrEqual(3);
    }
  });
});

describe("la cara no hace gestos de animal", () => {
  const cuerpo = /cabeza|puerta|empujoncito|vueltas|estira|pierna|mano/;

  it("las frases de volver y de día difícil", () => {
    for (let d = 1; d <= 20; d++) {
      const fecha = "2026-10-" + String(d).padStart(2, "0");
      for (const frases of [J.frasesVolver, J.frasesDiaDificil]) {
        expect(J.fraseMascota(frases, fecha, "Sol", "face")).not.toMatch(cuerpo);
        expect(J.fraseMascota(frases, fecha, "Rocky", "dog")).toBe(
          J.fraseMascota(frases, fecha, "Rocky"),
        );
      }
    }
  });

  it("las frases del final de la rutina", () => {
    const e = veterano();
    e.profile.pet = { type: "face", name: "Sol" };
    for (let d = 1; d <= 20; d++) {
      e.today.date = "2026-10-" + String(d).padStart(2, "0");
      for (const [racha, pct, record] of [
        [0, 1, true],
        [8, 1, false],
        [0, 1, false],
        [0, 0.6, false],
      ]) {
        e.streak.current = racha;
        const frase = J.sdcMascota(e, pct, record);
        expect(frase).toMatch(/^Sol /);
        expect(frase).not.toMatch(cuerpo);
      }
    }
  });
});
