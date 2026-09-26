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

test("Instinto Primal: la pausa congela el reloj y el reloj no se atrasa", async ({ page }) => {
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
  const quedan = (s) => expect(page.getByText(s + "s", { exact: true })).toBeVisible();

  // 10 s de cuenta y 5 de ronda: quedan 25 de los 30.
  await pasar(page, 15_500);
  await quedan(25);

  // En pausa no corre, por mucho que pase.
  await boton(page, "Pausa").click();
  await expect(page.getByText("EN PAUSA")).toBeVisible();
  await pasar(page, 20_000);
  await quedan(25);
  await boton(page, "Seguir →").click();
  await pasar(page, 5_000);
  await quedan(20);

  // Un telefono que frena los temporizadores: 12 s de golpe, sin dibujar en el
  // medio. Restando de a un segundo, el reloj avanzaba uno; ahora avanza los 12.
  await page.clock.runFor(12_000);
  await pasar(page, 300);
  await quedan(8);
  expect(errores).toEqual([]);
});

// El ejercicio de core del primer rango ese jueves es un sostén: 10 reps de 3 s,
// en series de 4, 3 y 3.
const partida = (page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem("dominio-corporal:player/state")));

test("sostén: 10 s para ponerse, 3-2-1, arranque, y al terminar marca la serie", async ({
  page,
}) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await empezar(page);
  await boton(page, "Hoy no").click();
  await boton(page, "Sostener 12 s").click();
  const t0 = await ahora(page);
  const frec = (xs) => xs.map((x) => x.desde);
  await expect(page.getByText("Ponete en posición")).toBeVisible();

  await pasar(page, 10_500);
  await expect(page.getByText("Sostené", { exact: true })).toBeVisible();
  let t = await tonosDesde(page, t0);
  expect(frec(t.filter((x) => x.ms >= 5500 && x.ms < 10_500))).toEqual([1047, 1047, 1047, 1319]);

  // 12 s de sostén: 3-2-1, el fin (dos notas que bajan) y el sonido de la serie marcada.
  await pasar(page, 12_000);
  t = await tonosDesde(page, t0 + 17_500);
  expect(frec(t)).toEqual([1047, 1047, 1047, 1175, 660, 880, 784]);
  await expect(page.getByRole("button", { name: "Serie 1 de 3, hecha" })).toBeVisible();
  await expect(page.getByText("DESCANSO", { exact: true })).toBeVisible();
  await expect(boton(page, "Sostener 9 s")).toBeVisible();
  expect((await partida(page)).today.marcas["bodyweight|normal"].ser.abs).toEqual([
    true,
    false,
    false,
  ]);
  expect(errores).toEqual([]);
});

test("sostén: la pausa congela el reloj y Terminé antes anota lo que sostuviste", async ({
  page,
}) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await empezar(page);
  await boton(page, "Hoy no").click();
  await boton(page, "Sostener 12 s").click();
  await boton(page, "Ya estoy →").click();
  await pasar(page, 4_200);
  await boton(page, "Pausa").click();
  await pasar(page, 20_000);
  await expect(page.getByText("En pausa")).toBeVisible();
  await boton(page, "Seguir →").click();
  await pasar(page, 3_000);
  // 7 s sostenidos de los 12: 2 reps de 3 s, y la serie queda marcada con 2.
  await boton(page, "Terminé antes").click();
  await pasar(page, 500);
  await expect(page.getByRole("button", { name: "Serie 1 de 3, hecha" })).toHaveText(/✓ 2/);
  const marca = (await partida(page)).today.marcas["bodyweight|normal"];
  expect(marca.ser.abs).toEqual([true, false, false]);
  expect(marca.aj.abs).toEqual({ 0: 2 });
  expect(errores).toEqual([]);
});

test("el parlante de arriba calla toda la app y queda guardado", async ({ page }) => {
  await empezar(page);
  await boton(page, "Hoy no").click();
  const fila = page
    .locator("div.py-2")
    .filter({ has: page.locator(".sdc-chip") })
    .first();
  let t0 = await ahora(page);
  await fila.getByRole("button", { name: /^Marcar serie 1 de 3/ }).click();
  await pasar(page, 300);
  expect((await tonosDesde(page, t0)).length).toBeGreaterThan(0);

  await boton(page, "Silenciar sonidos").click();
  await expect(boton(page, "Activar sonidos")).toBeVisible();
  t0 = await ahora(page);
  await fila.getByRole("button", { name: /^Marcar serie 2 de 3/ }).click();
  await page.getByRole("button", { name: /^Metrónomo OFF/ }).click();
  await pasar(page, 3_000);
  expect(await tonosDesde(page, t0)).toEqual([]);

  // Se guarda y sobrevive a recargar.
  const s = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("dominio-corporal:player/state")),
  );
  expect(s.ui.silencio).toBe(true);
  await page.reload();
  await page.clock.runFor(5_000);
  await expect(boton(page, "Activar sonidos")).toBeVisible();
});
