// Legible de los 13 a los 70 y pico: ninguna letra bajo 14 px, nada tocable bajo
// 44 px, contraste 4,5:1 (también lo bloqueado) y nada que se salga por el costado,
// en cada pestaña con todos los sistemas abiertos, a 375 y a 320 px de ancho.
import { test, expect } from "@playwright/test";

const boton = (page, texto) => page.getByRole("button", { name: texto, exact: true });

// Mide lo que se ve en #root. Los botones deshabilitados quedan fuera del contraste
// (se leen a 3:1, a propósito más apagados) y `v1.0` también: es la entrada
// escondida al panel de pruebas.
const MEDIR = () => {
  const vis = (el) => {
    const r = el.getBoundingClientRect(),
      s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
  };
  const rgba = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0, 0];
    const p = m[1].split(",").map(Number);
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  };
  const lum = ([r, g, b]) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const mezclar = (a, b) => [0, 1, 2].map((i) => a[i] * a[3] + b[i] * (1 - a[3]));
  const fondo = (el) => {
    const capas = [];
    for (let e = el; e; e = e.parentElement) {
      const c = rgba(getComputedStyle(e).backgroundColor);
      if (c[3] > 0) capas.push(c);
      if (c[3] >= 1) break;
    }
    let base = [10, 14, 26];
    for (let i = capas.length - 1; i >= 0; i--) base = mezclar(capas[i], base);
    return base;
  };
  const opacidad = (el) => {
    let o = 1;
    for (let e = el; e; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity);
    return o;
  };
  const malos = [];
  const w = document.createTreeWalker(document.getElementById("root"), NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const tx = n.textContent.replace(/\s+/g, " ").trim(),
      el = n.parentElement;
    if (!tx || !el || el.closest("svg") || el.tagName === "STYLE" || !vis(el)) continue;
    const s = getComputedStyle(el);
    if (parseFloat(s.fontSize) < 14) malos.push(`letra ${s.fontSize}: ${tx}`);
    if (el.closest("button:disabled") || tx === "v1.0") continue;
    const bg = fondo(el),
      c = rgba(s.color),
      fg = mezclar([c[0], c[1], c[2], c[3] * opacidad(el)], bg),
      a = lum(fg),
      b = lum(bg),
      cr = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    if (cr < 4.5) malos.push(`contraste ${cr.toFixed(2)}: ${tx}`);
  }
  for (const el of document.querySelectorAll("#root button, #root input, #root a")) {
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect(),
      nombre = (el.innerText || el.getAttribute("aria-label") || el.title || el.tagName).trim();
    // Los días de Constancia: siete por fila, 40 px de alto y el ancho que entre.
    const dia = el.title && /^\d{4}-\d{2}-\d{2}$/.test(el.title);
    if (r.height < (dia ? 40 : 44) || (!dia && r.width < 44))
      malos.push(`toque ${Math.round(r.width)}x${Math.round(r.height)}: ${nombre}`);
    if (r.right > window.innerWidth + 1) malos.push(`se sale por el costado: ${nombre}`);
  }
  if (document.documentElement.scrollWidth > window.innerWidth)
    malos.push(`la página se desplaza de costado: ${document.documentElement.scrollWidth}px`);
  return [...new Set(malos)];
};

for (const ancho of [375, 320]) {
  test(`legible a ${ancho} px: letra, toques, contraste y ancho`, async ({ page }) => {
    await page.setViewportSize({ width: ancho, height: 800 });
    await page.clock.install({ time: new Date("2026-09-24T10:00:00-03:00") });
    await page.goto("/");
    await boton(page, "Continuar").click();
    await boton(page, "Saltar y empezar con valores por defecto").click();
    await expect(page.getByText("Rutina de hoy")).toBeVisible();
    const problemas = {};
    const medir = async (donde) => {
      const m = await page.evaluate(MEDIR);
      if (m.length) problemas[donde] = m;
    };
    await medir("Entreno, primer día");
    await boton(page, "Perfil").click();
    await page.getByRole("button", { name: /Sistemas del juego/ }).click();
    await boton(page, "Desbloquear todo ahora").click();
    await boton(page, "Entreno").click();
    // El botón alterna: si algo está abierto dice Minimizar todo.
    const minimizar = boton(page, "Minimizar todo");
    if (await minimizar.count()) await minimizar.click();
    await boton(page, "Expandir todo").click();
    for (const t of ["Entreno", "Combate", "Primal", "Explorar", "Logros", "Perfil"]) {
      await boton(page, t).click();
      await medir(t);
    }
    for (const t of ["Skills", "Articul.", "Neuro"]) {
      await boton(page, "Primal").click();
      await boton(page, t).click();
      await medir("Primal · " + t);
    }
    await boton(page, "¿Cómo funciona?").click();
    await medir("Guía");
    expect(problemas).toEqual({});
  });
}
