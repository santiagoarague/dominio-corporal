// Lo que se oye en la app compilada: un AudioContext falso anota cada tono con
// la hora del reloj de la prueba, que solo avanza cuando la prueba lo pide.
import { test, expect } from "@playwright/test";

const boton = (page, texto) => page.getByRole("button", { name: texto, exact: true });

const OIDO = () => {
  window.__tonos = [];
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
        start: () => window.__tonos.push({ ...t, ms: Date.now() }),
        stop() {},
      };
    }
  }
  window.AudioContext = Ctx;
};

// Avanza el reloj de a 100 ms: cada fase agenda el temporizador de la siguiente
// recien cuando React vuelve a dibujar, y eso no pasa dentro de un solo runFor.
async function pasar(page, ms) {
  for (let t = 0; t < ms; t += 100) {
    await page.clock.runFor(Math.min(100, ms - t));
    await page.waitForTimeout(10);
  }
}

async function empezar(page) {
  await page.addInitScript(OIDO);
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
  await page.clock.pauseAt(new Date("2026-09-24T10:00:01-03:00"));
  await page.goto("/");
  await page.clock.runFor(60_000);
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
}

// Tonos desde la marca `desde`, con el tiempo relativo a ella.
async function tonosDesde(page, desde) {
  const t = await page.evaluate(() => window.__tonos);
  return t.filter((x) => x.ms >= desde).map((x) => ({ ...x, ms: x.ms - desde }));
}
const ahora = (page) => page.evaluate(() => Date.now());

test("metronomo: baja cae, la pausa es un doble tic y sube sube", async ({ page }) => {
  await empezar(page);
  const t0 = await ahora(page);
  await page.getByRole("button", { name: /^Metrónomo OFF/ }).click();
  await pasar(page, 5_500);
  const t = await tonosDesde(page, t0);

  // Un ciclo 2-1-2: baja en 0 s, pausa en 2 s (dos tics), sube en 3 s, baja otra vez en 5 s.
  const baja = t.find((x) => x.ms < 1000);
  const pausa = t.filter((x) => x.ms >= 2000 && x.ms < 3000);
  const sube = t.find((x) => x.ms >= 3000 && x.ms < 4000);
  expect(baja.hasta).toBeLessThan(baja.desde);
  expect(pausa).toHaveLength(2);
  expect(pausa.every((x) => x.tipo === "triangle" && x.hasta === null)).toBe(true);
  expect(sube.hasta).toBeGreaterThan(sube.desde);
  expect(t.some((x) => x.ms >= 5000 && x.hasta < x.desde)).toBe(true);
});

test("Instinto Primal: fin de ronda, preparacion de 5 s y arranque se oyen y se leen", async ({
  page,
}) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await empezar(page);

  await boton(page, "Perfil").click();
  await page.getByRole("button", { name: /Sistemas del juego/ }).click();
  await boton(page, "Desbloquear todo ahora").click();
  await boton(page, "Primal").click();
  await boton(page, "Movimientos").click();
  await page.getByRole("button", { name: /^Oso/ }).first().click();
  await boton(page, "Empezar").click();
  const t0 = await ahora(page);
  const frec = (xs) => xs.map((x) => x.desde);

  // Cuenta inicial de 10 s: 3-2-1 y arranque.
  await pasar(page, 10_500);
  await expect(page.getByText("Ronda 1/3 · En marcha")).toBeVisible();
  let t = await tonosDesde(page, t0);
  expect(frec(t.filter((x) => x.ms >= 6500 && x.ms < 10_500))).toEqual([1047, 1047, 1047, 1319]);

  // La ronda (30 s en el primer rango): 3-2-1 y dos notas que bajan al terminar.
  await pasar(page, 30_000);
  await expect(page.getByText("Ronda 1/3 terminada · Descanso")).toBeVisible();
  t = await tonosDesde(page, t0 + 36_500);
  expect(frec(t)).toEqual([1047, 1047, 1047, 1175, 784]);

  // Descanso de 15 s: a los 10 s se anuncia la ronda siguiente, con su propio aviso.
  await pasar(page, 10_000);
  await expect(page.getByText("PREPARATE · RONDA 2/3")).toBeVisible();
  t = await tonosDesde(page, t0 + 41_000);
  expect(frec(t)).toEqual([880, 880]);

  await pasar(page, 5_000);
  await expect(page.getByText("Ronda 2/3 · En marcha")).toBeVisible();
  t = await tonosDesde(page, t0 + 51_000);
  expect(frec(t)).toEqual([1047, 1047, 1047, 1319]);

  expect(errores).toEqual([]);
});
