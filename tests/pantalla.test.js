// La pantalla encendida es un solo bloqueo para toda la app: se cuenta cuantas
// partes lo piden y recien se suelta cuando no queda ninguna.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { J } from "./ayuda.js";

let activos, pedidos, ultimo;
beforeEach(() => {
  activos = 0;
  pedidos = 0;
  vi.stubGlobal("navigator", {
    wakeLock: {
      request: async () => {
        pedidos++;
        activos++;
        let suelto = false;
        const oyentes = [];
        ultimo = {
          addEventListener: (_, f) => oyentes.push(f),
          release: () => {
            if (suelto) return;
            suelto = true;
            activos--;
            oyentes.forEach((f) => f());
          },
        };
        return ultimo;
      },
    },
  });
});
afterEach(() => vi.unstubAllGlobals());
const esperar = () => new Promise((r) => setTimeout(r, 0));

describe("pantalla encendida", () => {
  it("si dos partes la piden y una la suelta, sigue encendida", async () => {
    J.sdcWakeOn(); // la sesion de la rutina
    J.sdcWakeOn(); // el descanso entre series
    await esperar();
    expect(activos).toBe(1);
    expect(pedidos).toBe(1);

    J.sdcWakeOff(); // termina el descanso
    await esperar();
    expect(activos).toBe(1);

    J.sdcWakeOff(); // se registra la rutina
    await esperar();
    expect(activos).toBe(0);
  });

  it("si se suelta antes de que el navegador conteste, no queda encendida", async () => {
    J.sdcWakeOn();
    J.sdcWakeOff();
    await esperar();
    expect(activos).toBe(0);
  });

  it("al volver a la app la pide de nuevo, sin sumar otro pedido", async () => {
    J.sdcWakeOn();
    await esperar();
    expect(activos).toBe(1);

    ultimo.release(); // el navegador la suelta al ocultarse la app
    expect(activos).toBe(0);
    J.sdcWakePedir(); // al volver, lo que hace el aviso de visibilidad
    J.sdcWakePedir();
    await esperar();
    expect(activos).toBe(1);
    expect(pedidos).toBe(2);

    J.sdcWakeOff(); // un solo pedido: con soltarlo una vez alcanza
    await esperar();
    expect(activos).toBe(0);
  });
});
