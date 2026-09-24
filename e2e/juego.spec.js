// El recorrido de un jugador nuevo, de punta a punta, sobre la app compilada.
import { test, expect } from "@playwright/test";

const CLAVE = "dominio-corporal:player/state";

async function partida(page) {
  return page.evaluate((k) => JSON.parse(localStorage.getItem(k)), CLAVE);
}

// Los clics por texto exacto: con refs o coordenadas, un scroll a destiempo
// puede tocar "Usar mi día de descanso" (ver CLAUDE.md).
const boton = (page, texto) => page.getByRole("button", { name: texto, exact: true });

async function empezarConValoresPorDefecto(page) {
  await page.goto("/");
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
}

test("primera rutina: sube a nivel 2, se guarda y se puede deshacer", async ({ page }) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));

  await empezarConValoresPorDefecto(page);
  await boton(page, "Hoy no").click();
  await boton(page, "MARCAR TODAS").click();
  await page.getByRole("button", { name: /^Completar rutina · 35\/35 reps$/ }).click();
  await expect(page.getByText("Subiste a nivel 2.")).toBeVisible();

  let s = await partida(page);
  expect(s.progress).toEqual({ rank: "E", level: 2, currentXP: 18 });
  expect(s.dominion.points).toBe(5);
  expect(s.achievements).toEqual(["e_first", "e_full"]);

  await page.reload();
  await expect(page.getByText(/^NV\. 2 · /)).toBeVisible();

  await boton(page, "Deshacer registro de hoy").click();
  const confirmar = page.getByRole("button", { name: /^(Sí, deshacer|Confirmar)/ });
  if (await confirmar.count()) await confirmar.first().click();
  await expect.poll(async () => (await partida(page)).progress.level).toBe(1);
  s = await partida(page);
  expect(s.dominion.points).toBe(0);
  expect(s.achievements).toEqual([]);
  expect(s.month.reps).toEqual({ squat: 0, pushup: 0, back: 0, abs: 0 });

  expect(errores).toEqual([]);
});

test("la respuesta de Cómo llegás se puede cambiar", async ({ page }) => {
  await empezarConValoresPorDefecto(page);
  await expect(page.getByText("¿Cómo llegás hoy?")).toBeVisible();
  await boton(page, "Normal").first().click();
  await expect(page.getByText("Llegás normal.")).toBeVisible();

  await boton(page, "Cambiar respuesta").click();
  await boton(page, "Pocas ganas").click();
  await boton(page, "Músculos cargados").click();
  await expect(page.getByText("Hoy alcanza con empezar")).toBeVisible();

  const hoy = (await partida(page)).today.date;
  expect((await partida(page)).animo[hoy]).toMatchObject({ antes: 2, cuerpo: "cargado", modo: "recovery" });
});

test("funciona sin conexión después de la primera visita", async ({ page, context }) => {
  await empezarConValoresPorDefecto(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((r) => navigator.serviceWorker.addEventListener("controllerchange", r, { once: true }));
    }
  });
  // Lo que el service worker guardo tiene que incluir el bundle con hash.
  const guardados = await page.evaluate(async () => {
    const out = [];
    for (const k of await caches.keys()) {
      const c = await caches.open(k);
      for (const r of await c.keys()) out.push(new URL(r.url).pathname);
    }
    return out;
  });
  expect(guardados.some((p) => /\/assets\/.+\.js$/.test(p))).toBe(true);

  // Sin red: toda peticion al servidor falla, tambien las del service worker.
  // (context.setOffline no sirve aca: con Edge la recarga ni llega al worker.)
  await context.route("**/*", (route) => route.abort("internetdisconnected"));
  await page.reload();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
});
