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

test("Ajustar series: cada serie con su + y su −, y Marcar todas suma el plan", async ({
  page,
}) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
  await page.clock.pauseAt(new Date("2026-09-24T10:00:01-03:00"));
  await page.goto("/");
  await page.clock.runFor(60_000);
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await boton(page, "Hoy no").click();

  // Ese jueves la primera fila son 12 reps en 5, 4 y 3. Plan: 7, 7 y 2.
  const fila = page
    .locator("div.py-2")
    .filter({ has: page.locator(".sdc-chip") })
    .first();
  const fichas = fila.locator(".sdc-chip");
  await expect(fichas).toHaveText(["−5+", "4", "3"]);
  await fila.getByRole("button", { name: "Ajustar series" }).click();
  const tocar = async (nombre, veces) => {
    for (let k = 0; k < veces; k++) await fila.getByRole("button", { name: nombre }).click();
  };
  await tocar("Una repetición más en la serie 1", 2);
  await tocar("Una repetición más en la serie 2", 3);
  await tocar("Una repetición menos en la serie 3", 1);
  await expect(fichas).toHaveText(["7", "7", "2"]);
  await fila.getByRole("button", { name: "Listo" }).click();
  await expect(fichas).toHaveText(["−7+", "7", "2"]);

  // La meta no cambia; lo marcado suma lo que planeaste.
  await boton(page, "MARCAR TODAS").click();
  await expect(page.getByText("+39 XP", { exact: true })).toBeVisible();
  const marca = (await partida(page)).today.marcas["bodyweight|normal"];
  expect(marca.aj.squat).toEqual({ 0: 7, 1: 7, 2: 2 });
  expect(marca.ser.squat).toEqual([true, true, true]);
  await expect(
    page.getByRole("button", { name: /^Completar rutina · 39\/35 reps$/ }),
  ).toBeVisible();
  expect(errores).toEqual([]);
});

test("dos toques antes de que la pantalla se redibuje no se pisan", async ({ page }) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
  await page.clock.pauseAt(new Date("2026-09-24T10:00:01-03:00"));
  await page.goto("/");
  await page.clock.runFor(60_000);
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await boton(page, "Hoy no").click();
  const fila = page
    .locator("div.py-2")
    .filter({ has: page.locator(".sdc-chip") })
    .first();
  await fila.getByRole("button", { name: "Ajustar series" }).click();

  // Dentro del mismo tick: dos + a la serie 1 y uno a la serie 2 (5, 4, 3 -> 7, 5, 3).
  await fila.evaluate((f) => {
    const mas = (n) => f.querySelector(`[aria-label="Una repetición más en la serie ${n}"]`);
    (mas(1).click(), mas(1).click(), mas(2).click());
  });
  await expect(fila.locator(".sdc-chip")).toHaveText(["7", "5", "3"]);

  // Y dos series marcadas en el mismo tick quedan las dos.
  await fila.evaluate((f) => {
    const fichas = f.querySelectorAll(".sdc-chip");
    (fichas[0].click(), fichas[2].click());
  });
  await expect(fila.getByRole("button", { name: "Serie 1 de 3, hecha" })).toBeVisible();
  await expect(fila.getByRole("button", { name: "Serie 3 de 3, hecha" })).toBeVisible();
  const marca = (await partida(page)).today.marcas["bodyweight|normal"];
  expect(marca.aj.squat).toEqual({ 0: 7, 1: 5 });
  expect(marca.ser.squat).toEqual([true, false, true]);
  expect(errores).toEqual([]);
});

test("combate: cada serie se marca sola y GOLPEAR espera a todas", async ({ page }) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
  await page.clock.pauseAt(new Date("2026-09-24T10:00:01-03:00"));
  await page.goto("/");
  await page.clock.runFor(60_000);
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await boton(page, "Perfil").click();
  await page.getByRole("button", { name: /Sistemas del juego/ }).click();
  await boton(page, "Desbloquear todo ahora").click();
  await boton(page, "Combate").click();
  await boton(page, "Tren Inferior").click();
  await boton(page, "Empezar").click();
  await boton(page, "Comenzar ahora").click();

  const serie = (n, estado) =>
    page.getByRole("button", { name: new RegExp(`^Combate, serie ${n} de [0-9]+, ${estado}$`) });
  const golpear = page.getByRole("button", { name: /^(GOLPEAR|Marcá las series para golpear)$/ });
  const todas = page.getByRole("button", { name: /^Combate, serie \d+ de \d+/ });
  await expect(todas.first()).toBeVisible();
  const total = await todas.count();
  expect(total).toBeGreaterThan(1);
  // Marcar la última sola no marca las anteriores.
  await serie(total, "pendiente").click();
  await expect(serie(total, "hecha")).toBeVisible();
  await expect(serie(1, "pendiente")).toBeVisible();
  await expect(golpear).toBeDisabled();
  for (let n = 1; n < total; n++) await serie(n, "pendiente").click();
  await expect(golpear).toBeEnabled();
  // Desmarcar la primera deja las demás y vuelve a pedirla.
  await serie(1, "hecha").click();
  await expect(serie(total, "hecha")).toBeVisible();
  await expect(golpear).toBeDisabled();
  expect(errores).toEqual([]);
});

test("el compañero se asoma en el descanso, cuenta algo y Mostrame lleva al botón", async ({
  page,
}) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
  await page.clock.pauseAt(new Date("2026-09-24T10:00:01-03:00"));
  await page.goto("/");
  await page.clock.runFor(60_000);
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await boton(page, "Hoy no").click();
  const fila = page
    .locator("div.py-2")
    .filter({ has: page.locator(".sdc-chip") })
    .first();
  const asomado = page.getByRole("button", { name: "Tu compañero quiere contarte algo" });

  // El primer día no sale.
  await fila.getByRole("button", { name: /^Marcar serie 1 de 3/ }).click();
  await page.clock.runFor(5000);
  await expect(page.getByText("DESCANSO", { exact: true })).toBeVisible();
  await expect(asomado).toHaveCount(0);

  // Con un día entrenado antes, sí: a los 3 s del descanso.
  await page.evaluate((k) => {
    const s = JSON.parse(localStorage.getItem(k));
    s.history["2026-09-22"] = "full";
    localStorage.setItem(k, JSON.stringify(s));
  }, CLAVE);
  await page.reload();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await page.clock.runFor(5000);
  await fila.getByRole("button", { name: /^Marcar serie 2 de 3/ }).click();
  await page.clock.runFor(1000);
  await expect(asomado).toHaveCount(0);
  await page.clock.runFor(2500);
  await expect(asomado).toBeVisible();
  let s = await partida(page);
  expect(s.pistas.sesion).toBe("2026-09-24|bodyweight");
  expect(s.seenUnlocks).toContain("companero");

  // Tocarlo cuenta lo primero que no usaste: desmarcar una serie.
  await asomado.click();
  const globo = page.getByRole("dialog", { name: "Tu compañero" });
  await expect(globo).toContainText("tocala de nuevo y se desmarca");
  expect((await partida(page)).pistas.vistas).toEqual({ desmarcar: "2026-09-24" });

  // Mostrame ilumina la serie marcada; tocarla la desmarca y lo anota como usado.
  await globo.getByRole("button", { name: "Mostrame" }).click();
  await expect(globo).toHaveCount(0);
  const hecha = fila.getByRole("button", { name: "Serie 1 de 3, hecha" });
  await expect(hecha).toHaveClass(/sdc-luz/);
  await hecha.click();
  await expect(fila.getByRole("button", { name: "Serie 2 de 3, hecha" })).toBeVisible();
  s = await partida(page);
  expect(s.pistas.usadas).toEqual({ desmarcar: "2026-09-24" });
  expect(s.today.marcas["bodyweight|normal"].ser.squat).toEqual([false, true, false]);

  // Una vez por sesión: otro descanso no lo trae de nuevo.
  await fila.getByRole("button", { name: /^Marcar serie 1 de 3/ }).click();
  await page.clock.runFor(5000);
  await expect(asomado).toHaveCount(0);
  expect(errores).toEqual([]);
});

test("el compañero se cambia en Perfil, también por una cara", async ({ page }) => {
  await empezarConValoresPorDefecto(page);
  await boton(page, "Perfil").click();
  await boton(page, "Cambiar").click();
  await boton(page, "🙂 Cara").click();
  await page.getByPlaceholder("Nombre de tu compañero").fill("Sol");
  await boton(page, "Guardar").click();
  await expect(page.getByText("Sol", { exact: true }).first()).toBeVisible();
  expect((await partida(page)).profile.pet).toEqual({ type: "face", name: "Sol" });
});

test("¿Cuánto mejoraste?: a las cuatro semanas propone la prueba y Perfil compara", async ({
  page,
}) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
  await page.clock.pauseAt(new Date("2026-09-24T10:00:01-03:00"));
  await page.goto("/");
  await page.clock.runFor(60_000);
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  const medida = { squat: 15, pushup: 10, abs: 15, back: 6, ritmo: 5 };
  await page.evaluate(
    ([k, m]) => {
      const s = JSON.parse(localStorage.getItem(k));
      s.profile.testResults = m;
      s.pruebas = [{ fecha: "2026-08-20", ...m }];
      localStorage.setItem(k, JSON.stringify(s));
    },
    [CLAVE, medida],
  );
  await page.reload();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await page.clock.runFor(5000);

  // 35 días después: la propone arriba, antes de entrenar.
  await expect(
    page.getByText("Pasaron 5 semanas desde tu última prueba de aptitud."),
  ).toBeVisible();
  await boton(page, "Hacer la prueba").click();
  await expect(page.getByText(/^Punto de Partida \(1\/4\)/)).toBeVisible();

  // Más tarde la guarda una semana.
  await boton(page, "Entreno").click();
  await boton(page, "Más tarde").first().click();
  await expect(page.getByText("¿Cuánto mejoraste?")).toHaveCount(0);
  expect((await partida(page)).ui.pruebaPospuesta).toBe("2026-09-24");

  // Con dos pruebas, Perfil muestra la primera contra la última.
  await page.evaluate(
    ([k, m]) => {
      const s = JSON.parse(localStorage.getItem(k));
      const nueva = { fecha: "2026-09-20", squat: 20, pushup: 12, abs: 18, back: 8, ritmo: 5 };
      s.pruebas = [{ fecha: "2026-08-20", ...m }, nueva];
      s.profile.testResults = nueva;
      localStorage.setItem(k, JSON.stringify(s));
    },
    [CLAVE, medida],
  );
  await page.reload();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await page.clock.runFor(5000);
  // La tarjeta quedó abierta desde «Hacer la prueba».
  await boton(page, "Perfil").click();
  await expect(page.getByText("¿Cuánto mejoraste?")).toBeVisible();
  await expect(page.getByText("Tu última prueba fue hace 4 días.")).toBeVisible();
  const fila = page.locator("div.text-xs", { hasText: /^Sentadillas/ }).first();
  await expect(fila).toHaveText("Sentadillas1520+5");
  expect(errores).toEqual([]);
});

test("Relajate: desde el descanso, respirar, salir y se cierra solo al terminar", async ({
  page,
}) => {
  const errores = [];
  page.on("pageerror", (e) => errores.push(e.message));
  await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
  await page.clock.pauseAt(new Date("2026-09-24T10:00:01-03:00"));
  await page.goto("/");
  await page.clock.runFor(60_000);
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await boton(page, "Hoy no").click();
  const pasar = async (ms) => {
    for (let t = 0; t < ms; t += 100) {
      await page.clock.runFor(100);
      await page.waitForTimeout(5);
    }
  };
  const fila = page
    .locator("div.py-2")
    .filter({ has: page.locator(".sdc-chip") })
    .first();
  await fila.getByRole("button", { name: /^Marcar serie 1 de 3/ }).click();
  await boton(page, "Relajate").click();
  const pantalla = page.getByRole("dialog", { name: "Relajate" });
  await expect(pantalla).toBeVisible();
  await expect(pantalla.getByText("DESCANSO", { exact: true })).toBeVisible();
  await expect(boton(page, "Jugar")).toHaveAttribute("aria-pressed", "true");

  // Tocar al compañero no rompe nada, y Respirar guía inhalar y exhalar.
  await pasar(1000);
  await pantalla.locator('[data-relax="companero"]').click();
  await boton(page, "Respirar").click();
  await pasar(1000);
  await expect(pantalla.getByText(/^Inhalá… [1-4]$/)).toBeVisible();
  await pasar(3500);
  await expect(pantalla.getByText(/^Exhalá… [1-6]$/)).toBeVisible();

  // Salir vuelve a la rutina con el descanso andando.
  await boton(page, "Salir").click();
  await expect(pantalla).toHaveCount(0);
  await expect(page.getByText("DESCANSO", { exact: true })).toBeVisible();

  // Abierto otra vez, se cierra solo cuando el descanso termina.
  await boton(page, "Relajate").click();
  await expect(pantalla).toBeVisible();
  await page.clock.runFor(200_000);
  await pasar(1000);
  await expect(pantalla).toHaveCount(0);
  await expect(page.getByText("DESCANSO", { exact: true })).toHaveCount(0);

  // Tocando al compañero de arriba se abre sin descanso.
  await page.getByRole("button", { name: "Relajate con tu compañero" }).click();
  await expect(pantalla).toBeVisible();
  await expect(pantalla.getByText("DESCANSO", { exact: true })).toHaveCount(0);
  await boton(page, "Salir").click();
  await expect(pantalla).toHaveCount(0);
  expect(errores).toEqual([]);
});
