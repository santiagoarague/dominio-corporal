// Lo que se oye: los tres sonidos del metronomo y los avisos del Instinto Primal.
// Un AudioContext falso anota cada tono (frecuencia, deslizamiento y timbre).
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { J } from "./ayuda.js";

let tonos;
function oidoFalso() {
  tonos = [];
  const nodo = () => ({ connect() {} });
  class Ctx {
    constructor() {
      this.currentTime = 0;
      this.state = "running";
      this.destination = nodo();
    }
    createGain() {
      return { ...nodo(), gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} } };
    }
    createOscillator() {
      const t = { desde: 0, hasta: null, tipo: "sine" };
      return {
        ...nodo(),
        frequency: {
          setValueAtTime: (f) => (t.desde = f),
          exponentialRampToValueAtTime: (f) => (t.hasta = f),
        },
        set type(v) {
          t.tipo = v;
        },
        start: () => tonos.push(t),
        stop() {},
      };
    }
  }
  vi.stubGlobal("window", { AudioContext: Ctx });
  vi.stubGlobal("navigator", { vibrate() {} });
  delete J.pitido._ctx;
}

beforeEach(() => {
  vi.useFakeTimers();
  oidoFalso();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const oir = (fn) => {
  tonos = [];
  fn();
  vi.advanceTimersByTime(1000);
  return tonos;
};

describe("metronomo: baja, pausa y sube suenan distinto", () => {
  it("baja con un tono que cae y sube con uno que sube", () => {
    const [baja] = oir(() => J.sdcSonidoFase("down"));
    const [sube] = oir(() => J.sdcSonidoFase("up"));
    expect(baja.hasta).toBeLessThan(baja.desde);
    expect(sube.hasta).toBeGreaterThan(sube.desde);
  });

  it("la pausa es un doble tic con otro timbre, sin deslizamiento", () => {
    const pausa = oir(() => J.sdcSonidoFase("hold"));
    expect(pausa).toHaveLength(2);
    for (const t of pausa) {
      expect(t.tipo).toBe("triangle");
      expect(t.hasta).toBeNull();
    }
    const [baja] = oir(() => J.sdcSonidoFase("down"));
    expect(pausa[0].desde).toBeGreaterThan(Math.max(baja.desde, baja.hasta));
  });

  it("todo por encima de 600 Hz, donde el parlante de un telefono se oye", () => {
    for (const f of ["down", "hold", "up"])
      for (const t of oir(() => J.sdcSonidoFase(f)))
        expect(Math.min(t.desde, t.hasta || 1e9)).toBeGreaterThan(600);
  });
});

describe("Instinto Primal: cada ronda avisa cuando arranca y cuando termina", () => {
  it("fin de ronda: dos notas que bajan; fin de sesion: tres que suben", () => {
    const fin = oir(() => J.sdcPrimalSon("fin"));
    expect(fin).toHaveLength(2);
    expect(fin[1].desde).toBeLessThan(fin[0].desde);
    const listo = oir(() => J.sdcPrimalSon("listo"));
    expect(listo).toHaveLength(3);
    expect(listo[2].desde).toBeGreaterThan(listo[0].desde);
  });

  it("los avisos no se parecen entre si", () => {
    const firma = (t) =>
      oir(() => J.sdcPrimalSon(t))
        .map((x) => x.desde)
        .join("-");
    const firmas = ["tic", "prepara", "arranca", "fin", "listo"].map(firma);
    expect(new Set(firmas).size).toBe(5);
  });

  // Recorre una sesion segundo a segundo con las mismas transiciones que App:
  // cuenta inicial de 10 s, tres rondas, y cy segundos de descanso entre rondas.
  it("entre rondas: descanso, 5 s de preparacion anunciada y la cuenta 3-2-1", () => {
    const linea = [];
    const tramo = (fase, ronda, desde) => {
      for (let s = desde; s >= 1; s--)
        linea.push({
          fase,
          ronda,
          s,
          etapa: J.sdcPrimalEtapa(fase, ronda, s),
          tic: J.sdcPrimalTic(fase, s),
        });
    };
    tramo("resting", 0, 10);
    for (let r = 1; r <= 3; r++) {
      tramo("active", r, 30);
      if (r < 3) tramo("resting", r, J.descansoPrimal);
    }
    const de = (fase, ronda) => linea.filter((x) => x.fase === fase && x.ronda === ronda);

    expect(de("resting", 0).every((x) => x.etapa === "posicion")).toBe(true);
    for (const r of [1, 2]) {
      const d = de("resting", r);
      expect(d.filter((x) => x.etapa === "descanso")).toHaveLength(
        J.descansoPrimal - J.sdcPrimalPrep,
      );
      expect(d.filter((x) => x.etapa === "prepara").map((x) => x.s)).toEqual([5, 4, 3, 2, 1]);
    }
    for (const [fase, ronda] of [
      ["resting", 0],
      ["active", 1],
      ["resting", 1],
      ["active", 3],
    ])
      expect(
        de(fase, ronda)
          .filter((x) => x.tic)
          .map((x) => x.s),
      ).toEqual([3, 2, 1]);
    expect(J.sdcPrimalPrep).toBe(5);
  });
});

describe("el compañero se anuncia con un sonido que no es de ninguna señal", () => {
  it("dos silbidos que suben, más agudos que el metrónomo y el Primal", () => {
    const silbo = oir(() => J.sonidoCompanero());
    expect(silbo).toHaveLength(2);
    for (const t of silbo) expect(t.hasta).toBeGreaterThan(t.desde);
    let masAgudo = 0;
    for (const f of ["down", "hold", "up"])
      for (const t of oir(() => J.sdcSonidoFase(f)))
        masAgudo = Math.max(masAgudo, t.desde, t.hasta || 0);
    for (const s of ["tic", "prepara", "arranca", "fin", "listo"])
      for (const t of oir(() => J.sdcPrimalSon(s))) masAgudo = Math.max(masAgudo, t.desde);
    for (const t of silbo) expect(t.hasta).toBeGreaterThan(masAgudo);
    expect(Math.min(...silbo.map((t) => t.desde))).toBeGreaterThan(700);
  });
});

describe("sin sonido", () => {
  it("con pitido.silencio no suena nada: ni el metrónomo, ni el Primal, ni el compañero", () => {
    J.pitido.silencio = true;
    try {
      expect(oir(() => J.sdcSonidoFase("down"))).toHaveLength(0);
      expect(oir(() => J.sdcPrimalSon("fin"))).toHaveLength(0);
      expect(oir(() => J.sonidoCompanero())).toHaveLength(0);
    } finally {
      J.pitido.silencio = false;
    }
    expect(oir(() => J.sdcSonidoFase("down"))).toHaveLength(1);
  });
});
