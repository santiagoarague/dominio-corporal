// Cuanto dura cada impulso de XP. Estas pruebas son la respuesta exacta a
// "¿cuanto duran los buffos?": si alguien cambia una duracion, fallan.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { J, fijarFecha, soltarFecha, jugadorNuevo, registrar } from "./ayuda.js";

beforeEach(() => fijarFecha());
afterEach(() => soltarFecha());

function conPuntos(pd = 500) {
  const e = jugadorNuevo();
  e.dominion.points = pd;
  return e;
}
const comprar = (e, id) => J.comprar(e, id).state;
// Abrir la app otro dia: ei hace el cambio de dia y de semana.
function abrirEl(e, dia, mes = 8) {
  fijarFecha(new Date(2026, mes, dia, 12, 0, 0));
  return J.cargarPartida(e).state;
}

describe("Impulso de XP (12 PD) e Impulso Mayor (20 PD)", () => {
  it("+25% hasta la medianoche del dia de compra, no 24 horas", () => {
    const e = comprar(conPuntos(), "xpbuff");
    expect(J.multImpulso(e)).toBe(1.25);
    fijarFecha(new Date(2026, 8, 24, 23, 59, 0));
    expect(J.multImpulso(e)).toBe(1.25);
    fijarFecha(new Date(2026, 8, 25, 0, 1, 0));
    expect(J.multImpulso(e)).toBe(1);
  });

  it("el Mayor da +50% el mismo dia y reemplaza al normal", () => {
    let e = comprar(conPuntos(), "xpbuff");
    e = comprar(e, "bigbuff");
    expect(J.multImpulso(e)).toBe(1.5);
    expect(J.comprar(e, "xpbuff").notices[0]).toMatch(/Ya tenés/);
  });

  it("multiplica la XP de la rutina de ese dia", () => {
    const sin = registrar(conPuntos()).state.today.xpEarned;
    const con = registrar(comprar(conPuntos(), "bigbuff")).state.today.xpEarned;
    expect(con).toBe(Math.round(sin * 1.5));
  });
});

describe("Impulso de Constancia (8 PD) y buff de Flexibilidad", () => {
  it("el comprado dura hasta el domingo: comprado el jueves, son 4 dias", () => {
    let e = comprar(conPuntos(), "flex");
    expect(e.streak.flexBuff).toBe(true);
    e = abrirEl(e, 27); // domingo
    expect(e.streak.flexBuff).toBe(true);
    e = abrirEl(e, 28); // lunes: semana nueva
    expect(e.streak.flexBuff).toBe(false);
  });

  it("estirar completo 2 veces en una semana da +10% toda la semana siguiente", () => {
    let e = conPuntos();
    e.week.stretchCount = 2;
    e = abrirEl(e, 28); // lunes
    expect(e.streak.flexBuff).toBe(true);
    e = abrirEl(e, 4, 9); // domingo 4 de octubre
    expect(e.streak.flexBuff).toBe(true);
    e = abrirEl(e, 5, 9); // lunes siguiente, sin estirar
    expect(e.streak.flexBuff).toBe(false);
  });

  it("los dos son la misma marca: no se suman y no se puede comprar si ya esta", () => {
    let e = conPuntos();
    e.streak.flexBuff = true;
    expect(J.comprar(e, "flex").notices[0]).toMatch(/Ya tenés/);
    expect(J.comprar(e, "flex").state.dominion.points).toBe(500);
  });
});

describe("mejoras permanentes", () => {
  it("Memoria +5% y Nucleo Reforzado +10%, para siempre", () => {
    let e = comprar(conPuntos(), "memoria");
    expect(J.sdcPerk(e)).toBe(1.05);
    expect(J.comprar(conPuntos(), "nucleo").notices[0]).toMatch(/Memoria/);
    e = comprar(e, "nucleo");
    expect(J.sdcPerk(e)).toBe(1.1);
    e = abrirEl(e, 24, 11);
    expect(J.sdcPerk(e)).toBe(1.1);
  });
});

describe("racha", () => {
  it("+2% por dia seguido, con techo de +30% a los 15 dias", () => {
    const e = jugadorNuevo();
    for (const [dias, mult] of [
      [0, 1],
      [1, 1.02],
      [10, 1.2],
      [15, 1.3],
      [40, 1.3],
    ]) {
      e.streak.current = dias;
      expect(J.sdcRacha(e)).toBeCloseTo(mult, 10);
    }
  });
});
