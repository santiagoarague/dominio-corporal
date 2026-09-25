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
  // El ejercicio de cada dia rota con la fecha, y con el la meta: los numeros de
  // abajo son los de un jueves. El reloj arranca ahi y despues corre normal.
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });

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
  expect((await partida(page)).animo[hoy]).toMatchObject({
    antes: 2,
    cuerpo: "cargado",
    modo: "recovery",
  });
});

test("funciona sin conexión después de la primera visita", async ({ page, context }) => {
  await empezarConValoresPorDefecto(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((r) =>
        navigator.serviceWorker.addEventListener("controllerchange", r, { once: true }),
      );
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

test("Primeras veces: se anota a mano desde la tarjeta, sin cuadro del navegador", async ({
  page,
}) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  // Si la app volviera a usar window.prompt, la prueba lo detecta.
  page.on("dialog", (d) => {
    errores.push("abrio un cuadro del navegador: " + d.message());
    d.dismiss();
  });

  await empezarConValoresPorDefecto(page);
  await boton(page, "Perfil").click();
  await page.getByRole("button", { name: /Primeras veces/ }).click();

  // Cancelar no anota nada.
  await boton(page, "Hoy pude algo que antes no podía").click();
  await page.getByLabel("Qué pudiste hacer hoy que antes no podías").fill("algo");
  await boton(page, "Cancelar").click();
  expect((await partida(page)).primeras || []).toEqual([]);

  // Vacio no se puede anotar; con texto, si, y el campo se cierra.
  await boton(page, "Hoy pude algo que antes no podía").click();
  await expect(boton(page, "Anotar")).toBeDisabled();
  await page
    .getByLabel("Qué pudiste hacer hoy que antes no podías")
    .fill("  Colgarme 20 segundos de la barra  ");
  await page.getByLabel("Qué pudiste hacer hoy que antes no podías").press("Enter");
  await expect(
    page.getByText("Primera vez: Colgarme 20 segundos de la barra. Queda anotado."),
  ).toBeVisible();
  await expect(boton(page, "Hoy pude algo que antes no podía")).toBeVisible();

  await expect.poll(async () => ((await partida(page)).primeras || []).length).toBe(1);
  const [p] = (await partida(page)).primeras;
  expect(p.texto).toBe("Colgarme 20 segundos de la barra");
  expect(p.origen).toBe("escrita");
  expect(errores).toEqual([]);
});

// El campo se perdio una vez al borrar la tarjeta que lo tenia, y con el tres
// logros del gimnasio quedaron imposibles.
test("el peso corporal se anota en Tus números cuando entrenás en el gimnasio", async ({
  page,
}) => {
  await empezarConValoresPorDefecto(page);
  await boton(page, "Perfil").click();
  await page.getByRole("button", { name: /^Tus números/ }).click();
  await expect(page.getByLabel("Tu peso corporal")).toHaveCount(0);

  await page.getByRole("button", { name: /^Métodos de entrenamiento/ }).click();
  await page.getByRole("button", { name: /^Fuerza de Acero/ }).click();
  const campo = page.getByLabel("Tu peso corporal");
  await campo.fill("72,5");
  await campo.press("Enter");
  await expect.poll(async () => (await partida(page)).profile.bodyWeight).toBe(72.5);

  await page.reload();
  await boton(page, "Perfil").click();
  await expect(page.getByLabel("Tu peso corporal")).toHaveValue("72,5");
});

test("cada serie se desmarca sola, y Desmarcar todas limpia todo", async ({ page }) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  // Reloj quieto: una fila completa se pliega a los 1,2 s, y aca se desmarca despues.
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
  await page.clock.pauseAt(new Date("2026-09-24T10:00:01-03:00"));
  await page.goto("/");
  await page.clock.runFor(60_000);
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await boton(page, "Hoy no").click();

  // La primera fila: tres series, marcadas una por una (la pendiente es la de −/+).
  const fila = page
    .locator("div.py-2")
    .filter({ has: page.locator(".sdc-chip") })
    .first();
  for (const n of [1, 2, 3])
    await fila.getByRole("button", { name: new RegExp(`^Marcar serie ${n} de 3`) }).click();
  let ser = (await partida(page)).today.marcas["bodyweight|normal"].ser.squat;
  expect(ser).toEqual([true, true, true]);

  // Desmarcar solo la primera: las otras dos siguen hechas.
  await fila.getByRole("button", { name: "Serie 1 de 3, hecha" }).click();
  await expect(fila.getByRole("button", { name: "Serie 2 de 3, hecha" })).toBeVisible();
  await expect(fila.getByRole("button", { name: "Serie 3 de 3, hecha" })).toBeVisible();
  await expect(fila.getByRole("button", { name: /^Marcar serie 1 de 3/ })).toBeVisible();
  ser = (await partida(page)).today.marcas["bodyweight|normal"].ser.squat;
  expect(ser).toEqual([false, true, true]);

  // Desmarcar todas: nada marcado en ningún ejercicio, y el botón se apaga.
  await boton(page, "DESMARCAR TODAS").click();
  await expect(fila.getByText(/^Llevás 0 de/)).toBeVisible();
  await expect(boton(page, "DESMARCAR TODAS")).toBeDisabled();
  const marcas = (await partida(page)).today.marcas["bodyweight|normal"].ser;
  expect(Object.values(marcas).flat().filter(Boolean)).toEqual([]);
  expect(errores).toEqual([]);
});
