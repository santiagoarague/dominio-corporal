// La pantalla no se apaga en medio de la rutina: desde la primera serie marcada
// hasta registrarla, y tampoco cuando termina un descanso. Un wakeLock falso
// cuenta cuantos bloqueos hay activos.
import { test, expect } from "@playwright/test";

const boton = (page, texto) => page.getByRole("button", { name: texto, exact: true });

test("la pantalla queda encendida toda la sesion, no solo en el descanso", async ({ page }) => {
  await page.addInitScript(() => {
    window.__bloqueos = 0;
    Object.defineProperty(navigator, "wakeLock", {
      value: {
        request: async () => {
          window.__bloqueos++;
          let suelto = false;
          return {
            addEventListener() {},
            release: () => {
              if (!suelto) ((suelto = true), window.__bloqueos--);
            },
          };
        },
      },
    });
  });
  const bloqueos = () => page.evaluate(() => window.__bloqueos);

  await page.goto("/");
  await boton(page, "Continuar").click();
  await boton(page, "Saltar y empezar con valores por defecto").click();
  await expect(page.getByText("Rutina de hoy")).toBeVisible();
  await boton(page, "Hoy no").click();
  expect(await bloqueos()).toBe(0);

  // Primera serie: empieza la sesion y el descanso.
  await page
    .getByRole("button", { name: /^Marcar serie 1 de / })
    .first()
    .click();
  await expect(boton(page, "Saltar →")).toBeVisible();
  await expect.poll(bloqueos).toBe(1);

  // Termina el descanso: antes, eso apagaba la pantalla aunque la sesion siguiera.
  await boton(page, "Saltar →").click();
  await expect(boton(page, "Saltar →")).toHaveCount(0);
  await page.waitForTimeout(300);
  expect(await bloqueos()).toBe(1);

  // Registrada la rutina, la pantalla ya se puede apagar.
  await boton(page, "MARCAR TODAS").click();
  await page.getByRole("button", { name: /^Completar rutina/ }).click();
  await expect(page.getByText("Subiste a nivel 2.")).toBeVisible();
  await expect.poll(bloqueos).toBe(0);
});
