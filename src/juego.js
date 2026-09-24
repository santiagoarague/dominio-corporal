// Dominio Corporal: el codigo del juego.
//
// Nacio como el bundle minificado que vivia dentro de index.html (etiqueta
// v1-html), sin React adentro y formateado. Los nombres de una o dos letras son
// los del minificador; CLAUDE.md es el mapa. Todo lo del primer nivel se exporta
// al final para que las pruebas de tests/ puedan usarlo; la app se monta en
// main.js.
import React from "react";
import * as ReactDOMClient from "react-dom/client";

// El bundle importaba React con el ayudante __toESM de esbuild, que deja el
// modulo en .default y copia sus exportaciones al primer nivel. El juego usa
// las dos formas: i.default.createElement e i.useState.
const i = { ...React, default: React };
const Sy = ReactDOMClient;
function Ae({ size: e = 16, style: a, children: l }) {
  return i.default.createElement("svg", { width: e, height: e, viewBox: "0 0 24 24", style: a }, l);
}
function Ph({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", {
      d: "M12 2 C8 8 6 11 6 15 a6 6 0 0 0 12 0 c0 -2 -1 -4 -2 -5 c0 2 -1 3 -2 3 c1 -3 -1 -7 -2 -11 Z",
      fill: a,
    }),
  );
}
function Vs({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", { d: "M7 4 h10 v4 a5 5 0 0 1 -10 0 Z", fill: a }),
    i.default.createElement("path", { d: "M9 13 h6 v3 h-6 Z", fill: a }),
    i.default.createElement("rect", { x: "7", y: "16", width: "10", height: "2", fill: a }),
    i.default.createElement("path", {
      d: "M7 5 H4 a1 1 0 0 0 -1 1 v1 a3 3 0 0 0 3 3",
      stroke: a,
      strokeWidth: "1.5",
      fill: "none",
    }),
    i.default.createElement("path", {
      d: "M17 5 H20 a1 1 0 0 1 1 1 v1 a3 3 0 0 1 -3 3",
      stroke: a,
      strokeWidth: "1.5",
      fill: "none",
    }),
  );
}
function $h({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", { d: "M20 14 A8 8 0 1 1 10 4 A6 6 0 0 0 20 14 Z", fill: a }),
  );
}
function Nl({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", {
      d: "M12 3 L13.5 9 L19 10.5 L13.5 12 L12 18 L10.5 12 L5 10.5 L10.5 9 Z",
      fill: a,
    }),
  );
}
function Pb({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("rect", { x: "1", y: "9", width: "3", height: "6", fill: a }),
    i.default.createElement("rect", { x: "20", y: "9", width: "3", height: "6", fill: a }),
    i.default.createElement("rect", { x: "5", y: "7", width: "2.5", height: "10", fill: a }),
    i.default.createElement("rect", { x: "16.5", y: "7", width: "2.5", height: "10", fill: a }),
    i.default.createElement("rect", { x: "7.5", y: "11", width: "9", height: "2", fill: a }),
  );
}
function Ih({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("rect", { x: "10.5", y: "3", width: "3", height: "18", fill: a }),
    i.default.createElement("rect", { x: "3", y: "10.5", width: "18", height: "3", fill: a }),
  );
}
function Rh({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("rect", { x: "3", y: "10.5", width: "18", height: "3", fill: a }),
  );
}
function Mn({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", {
      d: "M4 12 L9 17 L20 5",
      stroke: a,
      strokeWidth: "2.5",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  );
}
function zd({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", {
      d: "M5 5 L19 19 M19 5 L5 19",
      stroke: a,
      strokeWidth: "2.5",
      strokeLinecap: "round",
    }),
  );
}
function $b({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", { d: "M13 2 L4 14 h6 l-1 8 l9 -12 h-6 Z", fill: a }),
  );
}
function e2({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9",
      stroke: a,
      strokeWidth: "2",
      fill: "none",
    }),
    i.default.createElement("path", {
      d: "M12 7 V12 L16 14",
      stroke: a,
      strokeWidth: "2",
      fill: "none",
      strokeLinecap: "round",
    }),
  );
}
function Za({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", {
      d: "M9 4 L16 12 L9 20",
      stroke: a,
      strokeWidth: "2.5",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  );
}
function a2({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", {
      d: "M12 22 C12 22 5 14 5 9 a7 7 0 0 1 14 0 C19 14 12 22 12 22 Z",
      fill: a,
    }),
    i.default.createElement("circle", { cx: "12", cy: "9", r: "2.5", fill: "#0a0e1a" }),
  );
}
function Ko({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("rect", {
      x: "5",
      y: "11",
      width: "14",
      height: "10",
      rx: "1",
      fill: a,
    }),
    i.default.createElement("path", {
      d: "M8 11 V7 a4 4 0 0 1 8 0 v4",
      stroke: a,
      strokeWidth: "2",
      fill: "none",
    }),
  );
}
function Ib({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("ellipse", { cx: "8", cy: "7", rx: "3", ry: "4", fill: a }),
    i.default.createElement("ellipse", { cx: "16", cy: "16", rx: "3", ry: "4", fill: a }),
  );
}
function Vo({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", {
      d: "M3 21 L14 10 M11 7 L17 13 M17 3 L21 7 L14 14",
      stroke: a,
      strokeWidth: "2",
      fill: "none",
      strokeLinecap: "round",
    }),
    i.default.createElement("path", {
      d: "M21 21 L10 10 M13 7 L7 13 M7 3 L3 7 L10 14",
      stroke: a,
      strokeWidth: "2",
      fill: "none",
      strokeLinecap: "round",
    }),
  );
}
function Rb({ size: e = 16, color: a = "currentColor", fill: l = "none" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("path", {
      d: "M12 21 C12 21 3 14.5 3 8.5 A4.5 4.5 0 0 1 12 6 A4.5 4.5 0 0 1 21 8.5 C21 14.5 12 21 12 21 Z",
      fill: l === "none" ? "none" : a,
      stroke: a,
      strokeWidth: "2",
    }),
  );
}
function t2({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("circle", { cx: "12", cy: "10", r: "8", fill: a }),
    i.default.createElement("circle", { cx: "9", cy: "10", r: "1.5", fill: "#0a0e1a" }),
    i.default.createElement("circle", { cx: "15", cy: "10", r: "1.5", fill: "#0a0e1a" }),
    i.default.createElement("rect", { x: "9", y: "15", width: "6", height: "4", fill: a }),
    i.default.createElement("rect", { x: "9.5", y: "19", width: "1.2", height: "2", fill: a }),
    i.default.createElement("rect", { x: "13.3", y: "19", width: "1.2", height: "2", fill: a }),
  );
}
function Qs({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("circle", { cx: "12", cy: "15", r: "4", fill: a }),
    i.default.createElement("circle", { cx: "6", cy: "10", r: "2", fill: a }),
    i.default.createElement("circle", { cx: "18", cy: "10", r: "2", fill: a }),
    i.default.createElement("circle", { cx: "9", cy: "5", r: "1.8", fill: a }),
    i.default.createElement("circle", { cx: "15", cy: "5", r: "1.8", fill: a }),
  );
}
function ey({ size: e = 16, color: a = "currentColor" }) {
  return i.default.createElement(
    Ae,
    { size: e },
    i.default.createElement("circle", { cx: "12", cy: "8", r: "4", fill: a }),
    i.default.createElement("path", { d: "M4 21 a8 8 0 0 1 16 0 Z", fill: a }),
  );
}
var ve = ["E", "D", "C", "B", "A", "S", "Z"],
  au = { E: 50, D: 100, C: 140, B: 180, A: 220, S: 260 },
  Cl = {
    E: "#7b8290",
    D: "#8b93a8",
    C: "#3ecf8e",
    B: "#4f9dff",
    A: "#b084f5",
    S: "#ffb84f",
    Z: "#ff5c7a",
  },
  zl = {
    E: "Rango E",
    D: "Rango D",
    C: "Rango C",
    B: "Rango B",
    A: "Rango A",
    S: "Rango S",
    Z: "Rango Z",
  },
  sdcTitulos = {
    bodyweight: {
      E: "Suelo",
      D: "Eje",
      C: "Recorrido",
      B: "Palanca",
      A: "Lado",
      S: "Sostén",
      Z: "Oficio",
    },
    gym: { E: "Barra", D: "Disco", C: "Forma", B: "Carga", A: "Tope", S: "Máxima", Z: "Hierro" },
    flow: {
      E: "Gateo",
      D: "Apoyo",
      C: "Giro",
      B: "Enlace",
      A: "Inversión",
      S: "Quietud",
      Z: "Vuelo",
    },
  },
  sdcDescs = {
    bodyweight: {
      E: "Regresión base — el suelo te ayuda",
      D: "Control motor inicial — rango parcial asistido",
      C: "Patrón estándar — rango completo de movimiento",
      B: "Intensificación — declinado, desequilibrio y pausas",
      A: "Alta fuerza relativa — unilateral progresivo",
      S: "Dominio motriz — unilateral estricto e isometría",
      Z: "Variantes compuestas — las metas salen de tus récords",
    },
    gym: {
      E: "Aprendes el gesto — la barra sola, sin carga",
      D: "Primera carga real — técnica antes que peso",
      C: "Rango completo bajo carga — sin acortar el recorrido",
      B: "Progresión de peso — el mismo gesto, más caro",
      A: "Cerca del máximo — series cortas y pesadas",
      S: "Trabajo máximo — control absoluto de la carga",
      Z: "Tus propias variantes — las metas salen de tus récords",
    },
    flow: {
      E: "Contacto con el suelo — gateo y apoyos básicos",
      D: "Dónde va el peso — apoyos firmes y conscientes",
      C: "Rotación completa — el rango entero de la articulación",
      B: "Encadenar sin apoyar — el movimiento no se corta",
      A: "Inversión — el peso pasa a las manos",
      S: "Sostenes largos — quedarte quieto es lo difícil",
      Z: "Secuencias propias — las metas salen de tus récords",
    },
  },
  vd = 0.75,
  ay = [
    { name: "Primeros Pasos", minKm: 0 },
    { name: "Caminante", minKm: 5 },
    { name: "Piernas Hechas", minKm: 20 },
    { name: "Kilometrero", minKm: 50 },
    { name: "Fondista", minKm: 100 },
    { name: "Paso Largo", minKm: 200 },
    { name: "Sin Distancia", minKm: 350 },
  ];
function l2(e) {
  let a = ay[0];
  for (let l of ay) e >= l.minKm && (a = l);
  return a;
}
var n2 = 8,
  Ny = 0.03;
function o2(e) {
  return 1 + (e.exploration.relics || []).length * Ny;
}
var Po = [
  { name: "La Manzana", endKm: 10 },
  { name: "El Barrio", endKm: 25 },
  { name: "Los Bordes", endKm: 50 },
  { name: "La Ruta", endKm: 90 },
  { name: "El Aliento Largo", endKm: 150 },
  { name: "La Distancia", endKm: 250 },
  { name: "Tu Propio Mapa", endKm: 400 },
];
function i2(e) {
  return e === 0 ? 0 : Po[e - 1].endKm;
}
function s2(e) {
  for (let a = 0; a < Po.length; a++) if (e < Po[a].endKm) return a;
  return Po.length - 1;
}
var pt = [
    {
      km: 1,
      sector: 0,
      name: "La Primera Cuadra",
      relic: "El Primer Paso",
      text: "La distancia más difícil de todas: la que va de la puerta a la vereda.",
      lore: "Nadie te ve salir. Es la única parte del camino que se hace entera con la cabeza.",
    },
    {
      km: 3,
      sector: 0,
      name: "La Subida de Siempre",
      relic: "Aliento Corto",
      text: "Esa pendiente que hacés todos los días sin pensarla.",
      lore: "Hoy llegaste arriba hablando. La cuesta no cambió.",
    },
    {
      km: 5,
      sector: 0,
      name: "La Vuelta Completa",
      relic: "La Manzana Entera",
      text: "Diste la vuelta entera sin cortar por el medio.",
      lore: "Cortar por el medio era más rápido. Dejó de tener sentido.",
    },
    {
      km: 10,
      sector: 0,
      name: "El Semáforo Largo",
      relic: "Paciencia",
      text: "El cruce donde siempre te toca esperar.",
      lore: "Antes aprovechabas para recuperar el aire. Ahora te impacienta.",
    },
    {
      km: 13,
      sector: 1,
      name: "La Plaza a las Siete",
      relic: "El Turno de la Mañana",
      text: "Hay gente a esta hora. Siempre la hubo.",
      lore: "Son los mismos todos los días. Nadie se saluda. Todos se reconocen.",
    },
    {
      km: 17,
      sector: 1,
      name: "El Perro de la Esquina",
      relic: "Saludo Sin Palabras",
      text: "Ladra los primeros días. Después deja de ladrar.",
      lore: "No te aceptó: te incorporó al paisaje, que es distinto y cuesta más.",
    },
    {
      km: 21,
      sector: 1,
      name: "La Panadería Abierta",
      relic: "Olor a las Seis",
      text: "Trabajan de noche para que a la mañana haya pan.",
      lore: "Pasás por la puerta y el olor te ordena el hambre. Todavía no entraste.",
    },
    {
      km: 25,
      sector: 1,
      name: "El Último Farol",
      relic: "Borde del Barrio",
      text: "Después de este farol la vereda deja de estar iluminada.",
      lore: "Volviste. Y ya sabés que la próxima vez vas a seguir un poco más.",
    },
    {
      km: 30,
      sector: 2,
      name: "La Avenida",
      relic: "Ruido de Fondo",
      text: "Cuatro carriles y nadie caminando.",
      lore: "Hay partes de la ciudad hechas para pasar, no para estar. Nunca las habías pisado.",
    },
    {
      km: 36,
      sector: 2,
      name: "El Puente",
      relic: "Vista Larga",
      text: "Desde acá se ve de dónde viniste.",
      lore: "Es menos de lo que se sentía. Y más de lo que creías que ibas a hacer.",
    },
    {
      km: 43,
      sector: 2,
      name: "El Descampado",
      relic: "Silencio Sin Techo",
      text: "Un terreno sin construir en el medio de todo.",
      lore: "El pasto te llega a la rodilla, pero hay un sendero marcado. Del ancho de una sola persona.",
    },
    {
      km: 50,
      sector: 2,
      name: "El Final del Mapa Conocido",
      relic: "Primera Vez Acá",
      text: "Hasta acá llegabas en auto. Nunca a pie.",
      lore: "La misma distancia, recorrida distinto, es otro lugar.",
    },
    {
      km: 58,
      sector: 3,
      name: "El Camino de Tierra",
      relic: "Polvo en los Cordones",
      text: "El asfalto se termina y sigue habiendo camino.",
      lore: "El piso deja de ser parejo. Tus tobillos aprenden algo que la vereda nunca les enseñó.",
    },
    {
      km: 68,
      sector: 3,
      name: "La Estación Vacía",
      relic: "Horario Viejo",
      text: "El tren dejó de pasar hace años. El andén sigue ahí.",
      lore: "Hay un banco gastado justo en el medio. Alguien lo usó mucho después del último tren.",
    },
    {
      km: 78,
      sector: 3,
      name: "La Lluvia a Mitad de Camino",
      relic: "Ropa Pesada",
      text: "Salió el día bien y a los veinte minutos no.",
      lore: "Volver era más largo que seguir. Es la primera vez que esa cuenta te da a favor.",
    },
    {
      km: 90,
      sector: 3,
      name: "La Hora Sin Nadie",
      relic: "La Calle Entera",
      text: "Ese rato en que la ciudad no es de nadie.",
      lore: "Escuchás tus propios pasos. No los habías escuchado nunca.",
    },
    {
      km: 100,
      sector: 4,
      name: "Los Cien",
      relic: "Número Redondo",
      text: "Cien kilómetros. A pie. Vos.",
      lore: "No los hiciste de una. Por eso cuentan.",
    },
    {
      km: 115,
      sector: 4,
      name: "El Segundo Aire",
      relic: "El Segundo Aire",
      text: "El punto donde estabas por parar y no paraste.",
      lore: "No apareció de la nada: estaba esperando del otro lado de querer parar.",
    },
    {
      km: 130,
      sector: 4,
      name: "La Cuesta que Ya No Es Cuesta",
      relic: "Pendiente Vencida",
      text: "La misma subida del kilómetro 3.",
      lore: "Llegaste arriba sin registrarla. Tuviste que volver a mirarla para acordarte de que era difícil.",
    },
    {
      km: 150,
      sector: 4,
      name: "El Kilómetro Aburrido",
      relic: "Cabeza Quieta",
      text: "No duele, no cuesta, no pasa nada. Solo hay que seguir.",
      lore: "Resulta que este es el difícil, y nadie lo cuenta.",
    },
    {
      km: 170,
      sector: 5,
      name: "El Cuerpo que Avisa",
      relic: "Señal Temprana",
      text: "Una molestia chica, mucho antes de ser un problema.",
      lore: "Aprendiste a distinguirla del cansancio. Eso no se explica: se camina.",
    },
    {
      km: 195,
      sector: 5,
      name: "El Día que No Querías",
      relic: "Fui Igual",
      text: "Todo decía que no. Fuiste.",
      lore: "No fue tu mejor día. Fue el que más contó.",
    },
    {
      km: 220,
      sector: 5,
      name: "La Distancia Sin Nombre",
      relic: "Ya No Cuento",
      text: "Dejaste de mirar cuánto falta.",
      lore: "El número seguía ahí. Dejó de ser la pregunta.",
    },
    {
      km: 250,
      sector: 5,
      name: "El Lugar de Siempre, de Nuevo",
      relic: "Ojo Nuevo",
      text: "Volviste a la primera cuadra.",
      lore: "Es idéntica. Cambió todo.",
    },
    {
      km: 290,
      sector: 6,
      name: "Más Allá de lo que Planeaste",
      relic: "Sin Plan",
      text: "Saliste sin saber hasta dónde.",
      lore: "Es la primera vez que no hacía falta saberlo.",
    },
    {
      km: 340,
      sector: 6,
      name: "La Distancia que Te Queda Chica",
      relic: "Medida Vieja",
      text: "Lo que antes era un día entero ahora es una salida.",
      lore: "El camino no se acortó. Lo hiciste vos.",
    },
    {
      km: 400,
      sector: 6,
      name: "Horizonte Propio",
      relic: "Marca del Caminante",
      text: "No hay nada acá salvo lo que trajiste.",
      lore: "Escribís tu nombre. Es la primera entrada del Códice que escribís vos.",
    },
  ],
  u2 = 0.6,
  Ed = { E: 40, D: 50, C: 65, B: 80, A: 100, S: 125, Z: 150 };
var sdcPortales = [
  { n: "La Guardia", c: "30 minutos de boxeo sombra", on: 180, off: 60 },
  { n: "El Rebote", c: "20 minutos de salto a la cuerda" },
  { n: "La Chispa", c: "30 minutos de cardio HIIT", on: 30, off: 30 },
  { n: "El Largo", c: "20 minutos de carrera continua" },
  { n: "La Cuesta", c: "25 minutos de subir y bajar escaleras" },
  { n: "La Soltura", c: "25 minutos de baile intenso" },
  { n: "La Rueda", c: "30 minutos de bicicleta" },
  { n: "El Motor", c: "15 minutos de burpees y jumping jacks intercalados", on: 45, off: 45 },
  { n: "El Ancla", c: "20 minutos de planchas y sostenes alternados", on: 45, off: 30 },
  { n: "La Ráfaga", c: "20 minutos de sprints cortos con pausa", on: 20, off: 40 },
];
function ai(e) {
  if (Math.random() > u2)
    return { available: !1, completed: !1, name: null, challengeText: null, rewardXP: null };
  let p = sdcPortales[Math.floor(Math.random() * sdcPortales.length)];
  return { available: !0, completed: !1, name: p.n, challengeText: p.c, rewardXP: Ed[e] };
}
var ty = ["Zona Dormida", "Tramo Rígido", "Lado Corto"],
  ly = ["Bisagra Trabada", "Eslabón Flojo"],
  ny = ["El Techo", "El Punto Muerto", "La Inercia"],
  oy = ["", " persistente", " de años", " de siempre", " de raíz"],
  iy = {
    upper_front: "Tren Superior Anterior",
    upper_back: "Tren Superior Posterior",
    lower: "Tren Inferior",
  },
  Cy = { upper_front: "pushup", upper_back: "back", lower: "squat" },
  c2 = 15,
  r2 = 3,
  d2 = 5;
function za(e) {
  let a = (e + 1) % 5 === 0,
    l = Math.floor(e / 15),
    n = oy[Math.min(l, oy.length - 1)],
    o;
  return (
    a
      ? (o = ny[Math.floor(e / 5) % ny.length])
      : e < 10
        ? (o = ty[e % ty.length])
        : (o = ly[e % ly.length]),
    { name: o + n, isBoss: a, tier: l, index: e }
  );
}
function $o(e) {
  return ["upper_front", "upper_back", "lower"].filter((n) => n !== e).slice(0, 2);
}
function ti(e) {
  return e.isBoss
    ? Math.min(8, 4 + Math.floor(e.index / 10))
    : Math.min(5, 2 + Math.floor(e.index / 6));
}
function f2(e) {
  let a = c2 + e.index * 3;
  return e.isBoss ? Math.round(a * r2) : a;
}
function hd(e, a, l, n, o, tr) {
  let s = Cy[l];
  return jd(e, a, n, o, tr)[s];
}
function sy(e, a, l, n) {
  let o = Cy[l];
  return kl(e, a, o, n);
}
function m2(e) {
  return e * 3 + 15;
}
function uy(e, a, l, n, o, tr) {
  return Math.max(3, Math.round(hd(e, a, n, l, o, tr) * 0.8));
}
function p2() {
  return 150;
}
function Ad() {
  return {
    villainIndex: 0,
    villainCurrentHP: null,
    exercise: null,
    lastExercise: null,
    lives: 3,
    phase: "choosing",
    villainsDefeated: 0,
    roundId: 0,
    todayDefeated: { date: ue(), count: 0 },
    loadFactor: 1,
    damageFactor: 1,
    bossCats: null,
  };
}
function b2(e, a) {
  let l = M(e),
    n = l.combat;
  if (a === n.lastExercise) return { state: l, notices: [] };
  let o = za(n.villainIndex);
  return (
    (n.exercise = a),
    (n.villainCurrentHP = ti(o)),
    (n.lives = 3),
    (n.loadFactor = 1),
    (n.damageFactor = 1),
    (n.phase = "resting"),
    (n.roundId = (n.roundId || 0) + 1),
    { state: l, notices: [] }
  );
}
function y2(e) {
  let a = M(e);
  return (
    (a.combat.phase = "resting"),
    (a.combat.roundId = (a.combat.roundId || 0) + 1),
    { state: a, notices: [] }
  );
}
function g2(e) {
  let a = M(e),
    l = a.combat;
  return (
    (l.loadFactor = Math.max(0.4, (l.loadFactor || 1) * 0.8)),
    (l.damageFactor = Math.max(0.3, (l.damageFactor || 1) * 0.7)),
    (l.phase = "resting"),
    (l.roundId = (l.roundId || 0) + 1),
    {
      state: a,
      notices: [
        "Carga recalibrada: -20% de repeticiones, pero tus golpes harán un 30% menos de daño.",
      ],
    }
  );
}
function v2(e, a) {
  let l = M(e),
    n = l.combat,
    o = za(n.villainIndex);
  if (a === n.lastExercise || a === n.exercise) return { state: l, notices: [] };
  let s = ti(o),
    u = s * 0.15;
  return (
    (n.villainCurrentHP = Math.min(s, n.villainCurrentHP + u)),
    (n.exercise = a),
    (n.loadFactor = 1),
    (n.damageFactor = 1),
    (n.phase = "resting"),
    (n.roundId = (n.roundId || 0) + 1),
    { state: l, notices: ["Retirada táctica: perdiste un 15% del terreno ganado."] }
  );
}
function h2(e) {
  let a = M(e),
    l = [],
    n = a.combat,
    o = za(n.villainIndex);
  if (((n.villainCurrentHP -= n.damageFactor || 1), n.villainCurrentHP <= 0.001)) {
    ((n.phase = "victory"), (n.villainsDefeated = (n.villainsDefeated || 0) + 1));
    let r = ue();
    if (
      ((!n.todayDefeated || n.todayDefeated.date !== r) &&
        (n.todayDefeated = { date: r, count: 0 }),
      (n.todayDefeated.count += 1),
      n.todayDefeated.count <= d2)
    ) {
      let p = f2(o);
      ((a.progress.currentXP += Math.round((a.streak.flexBuff ? p * 1.1 : p) * Ka(a))),
        (a.today.xpEarned = (a.today.xpEarned || 0) + p),
        l.push(`¡Recuperaste ${o.name}! +${p} XP.`),
        (a = Dl(a, "Combate")));
    } else
      l.push(
        `¡Recuperaste ${o.name}! Ya ganaste tu XP máxima de combate hoy, pero la victoria sigue contando para tu progreso.`,
      );
    a = Ea(a, l);
  } else ((n.phase = "resting"), (n.roundId = (n.roundId || 0) + 1));
  let s = da(a),
    u = { state: s.state, notices: [...l, ...s.notices] },
    c = ni(u.state);
  return { state: c.state, notices: [...u.notices, ...c.notices] };
}
function x2(e) {
  let a = M(e),
    l = a.combat;
  return (
    (l.lives -= 1),
    l.lives <= 0 ? ((l.lives = 3), (l.phase = "defeat")) : (l.phase = "decision"),
    { state: a, notices: [] }
  );
}
function S2(e) {
  let a = M(e),
    l = a.combat,
    n = za(l.villainIndex);
  ((l.lastExercise = n.isBoss ? null : l.exercise),
    (l.exercise = null),
    (l.villainIndex += 1),
    (l.villainCurrentHP = null),
    (l.loadFactor = 1),
    (l.damageFactor = 1));
  let o = za(l.villainIndex);
  return (
    o.isBoss
      ? ((l.bossCats = $o(l.lastExercise)),
        (l.villainCurrentHP = ti(o)),
        (l.lives = 3),
        (l.phase = "resting"),
        (l.roundId = (l.roundId || 0) + 1))
      : ((l.bossCats = null), (l.phase = "choosing")),
    { state: a, notices: [] }
  );
}
function N2(e) {
  let a = M(e);
  return (
    (a.combat.phase = "resting"),
    (a.combat.roundId = (a.combat.roundId || 0) + 1),
    { state: a, notices: [] }
  );
}
var dd = 3,
  C2 = { E: 30, D: 35, C: 40, B: 45, A: 50, S: 55, Z: 60 };
function Ws(e) {
  return C2[e] || 40;
}
var cy = 15,
  k2 = 5,
  xd = 2,
  z2 = 20,
  Oa = [
    {
      name: "Oso",
      desc: "Camina en 4 apoyos con las rodillas cerca del suelo sin tocarlo, alternando brazo y pierna opuesta.",
    },
    {
      name: "Pato",
      desc: "Sentadilla profunda caminando hacia adelante, manteniendo el torso lo más erguido posible.",
    },
    {
      name: "Cangrejo",
      desc: "Apoya manos y pies con la cadera elevada y camina hacia atrás o hacia los lados.",
    },
    {
      name: "Oruga",
      desc: "Desde de pie, camina las manos hacia adelante hasta plancha y regresa caminando los pies hacia ellas.",
    },
    {
      name: "Lagartija",
      desc: "Crawl bajo con el pecho cerca del suelo, llevando la rodilla hacia el codo externo en cada paso.",
    },
    {
      name: "Cocodrilo",
      desc: "Plancha ancha y baja, avanzando con push-ups controlados hacia adelante.",
    },
    {
      name: "Rana",
      desc: "Sentadilla profunda con salto explosivo hacia adelante, aterrizando suave.",
    },
    {
      name: "Mono",
      desc: "Desde posición agachada, salta lateralmente alcanzando el suelo con ambas manos.",
    },
    {
      name: "Canguro",
      desc: "Saltos explosivos hacia adelante llevando las rodillas hacia el pecho.",
    },
    {
      name: "Skater Lateral",
      desc: "Saltos laterales alternando piernas, tocando el suelo detrás con la mano opuesta.",
    },
    {
      name: "Bestia",
      desc: "Desde posición de bestia (rodillas flotando sobre el suelo), alcanza el techo alternando brazos.",
    },
    {
      name: "Araña",
      desc: "Crawl llevando la rodilla hacia el codo del mismo lado, rotando la cadera.",
    },
    {
      name: "Escorpión",
      desc: "Desde posición de bestia, mete una pierna por debajo del cuerpo hacia el lado contrario.",
    },
    {
      name: "Shuffle Rítmico",
      desc: "Desplazamiento lateral tipo baile con sentadilla ligera en cada cambio de dirección.",
    },
    {
      name: "High Knees al Ritmo",
      desc: "Rodillas altas rápidas alternando con cambios de dirección cada pocos segundos.",
    },
    {
      name: "Cambio Bajo",
      desc: "Transición rotando bajo el cuerpo entre bestia y sentado lateral, sin tocar el suelo con la cadera.",
    },
    {
      name: "Puente de Cangrejo",
      desc: "Desde cangrejo, eleva la cadera y alcanza hacia atrás con un brazo, alternando.",
    },
    {
      name: "Burpee Flow",
      desc: "Burpee combinado con un salto lateral antes de bajar a la siguiente repetición.",
    },
    {
      name: "Sombra de Combate",
      desc: "Boxeo sombra dinámico combinado con desplazamiento lateral constante.",
    },
    {
      name: "Flujo Encadenado",
      desc: "Secuencia continua combinando bestia, escorpión y cambio bajo sin pausas.",
    },
    {
      name: "Beast Hold",
      desc: "Sostén en cuadrupedia con rodillas a un centímetro del suelo, espalda plana y core activo.",
    },
    {
      name: "Movilidad 90/90",
      desc: "Sentado con ambas rodillas a 90°, rota de un lado al otro sin usar las manos.",
    },
    {
      name: "Underswitch",
      desc: "Desde posición de bestia, pasa una pierna por debajo del cuerpo y rota hacia el lado opuesto.",
    },
    {
      name: "Kickthrough",
      desc: "Desde bestia, patea una pierna cruzada por debajo mientras levantas la mano contraria.",
    },
  ];
function ky() {
  return { unlockedCount: 1, masteryProgress: 0, today: { date: ue(), count: 0 } };
}
function E2(e, a) {
  let l = M(e),
    n = [],
    o = ue();
  if (
    (l.primal.today.date !== o && (l.primal.today = { date: o, count: 0 }),
    l.primal.today.count >= Sd(l))
  )
    return {
      state: l,
      notices: [`Ya alcanzaste tu máximo de ${Sd(l)} movimientos hoy en Instinto Primal.`],
    };
  ((l.primal.today.count += 1),
    (l.lifetimePrimal = (l.lifetimePrimal || 0) + 1),
    (l.week.primal = (l.week.primal || 0) + 1),
    (l = Dl(l, "Instinto Primal")));
  let s = z2;
  (l.streak.flexBuff && (s = Math.round(s * 1.1)),
    (s = Math.round(s * Ka(l))),
    (l.progress.currentXP += s),
    (l.today.xpEarned = (l.today.xpEarned || 0) + s),
    n.push(`+${s} XP por practicar ${Oa[a].name}.`),
    a === l.primal.unlockedCount - 1 &&
      ((l.primal.masteryProgress += 1),
      l.primal.masteryProgress >= xd &&
        l.primal.unlockedCount < Oa.length &&
        ((l.primal.unlockedCount += 1),
        (l.primal.masteryProgress = 0),
        n.push(`¡Nuevo movimiento descubierto! ${Oa[l.primal.unlockedCount - 1].name}`))),
    (l = Ea(l, n)));
  let u = da(l),
    c = { state: u.state, notices: [...n, ...u.notices] },
    r = ni(c.state);
  return { state: r.state, notices: [...c.notices, ...r.notices] };
}
var ou = [
    "No te olvides de hidratarte antes y después de entrenar.",
    "Un calentamiento de 5 minutos reduce el riesgo de lesiones.",
    "Los músculos crecen en el descanso, no solo en el esfuerzo. Tu día de descanso es parte del plan, no una excepción.",
    "Si un ejercicio se siente demasiado fácil, es buena señal — estás listo para más.",
    "Mejor 10 repeticiones con buena técnica que 20 apuradas.",
    "Dormir bien es tan importante como entrenar bien.",
    "El dolor agudo o punzante no es normal. Si algo duele mal, pará y descansá.",
    "Entrenar un poco todos los días vale más que entrenar mucho una sola vez.",
    "Respirá: exhalá en el esfuerzo, inhalá en el regreso.",
    "Si te sentís muy cansado, el Modo Recuperación existe justo para eso — usalo sin culpa.",
    "Estirar después de entrenar ayuda a tu cuerpo a recuperarse mejor.",
    "Progresar no siempre se ve como hacer más — a veces es hacerlo mejor.",
    "Tu cuerpo de hoy no es tu cuerpo de mañana. Sé paciente con vos mismo.",
    "Antes de aumentar la dificultad, asegurate de dominar la técnica actual.",
    "Un buen calzado y una superficie estable evitan muchas lesiones innecesarias.",
  ],
  Js = {
    squat:
      "Si la sentadilla completa es muy exigente, apóyate en una silla o pared, o reduce la profundidad. La forma correcta importa más que el rango completo.",
    pushup:
      "Si no llegas a las repeticiones completas, apoya las rodillas en el suelo. Sigues trabajando el mismo movimiento con menos carga.",
    back: "Si te cuesta mantener la posición, reduce cuánto elevas el pecho y las piernas, o sostén por menos tiempo. La técnica limpia vale más que la altura.",
    abs: "Si sientes tensión en el cuello, cruza los brazos sobre el pecho en vez de apoyar las manos detrás de la cabeza.",
  };
function Dd(e, a) {
  let l = 0;
  for (let n = 0; n < e.length; n++) l = (l * 31 + e.charCodeAt(n)) >>> 0;
  return l % a;
}
function A2(e) {
  return ou[Dd(e, ou.length)];
}
var D2 = [
    '{name} te espera en la puerta: "Un día no define tu camino. ¿Volvemos hoy?"',
    '{name} te da un empujoncito: "Lo importante no es no fallar nunca, es volver siempre."',
    '{name} te mira con cariño: "Ayer no cuenta más que hoy. Vamos de nuevo."',
  ],
  T2 = [
    '{name} te anima: "Cualquier esfuerzo cuenta más que quedarte quieto. Mañana con más fuerza."',
    '{name} asiente: "Hoy fue un día difícil, y está bien. Lo que importa es que apareciste."',
  ];
function zy(e, a, l) {
  return e[Dd(a, e.length)].replace("{name}", l || "Tu compañero");
}
var Ey = [
  {
    id: "primal",
    cost: 4,
    name: "Sesión Extra Primal",
    desc: "Una sesión más de Instinto Primal hoy (6 en vez de 5).",
  },
  {
    id: "reroll",
    cost: 5,
    name: "Cambiar de travesía",
    desc: "Cambia la travesía de hoy por otra.",
  },
  {
    id: "rest",
    cost: 6,
    name: "Día de Descanso Extra",
    desc: "Recuperá el día de descanso que ya gastaste esta semana.",
  },
  {
    id: "flex",
    cost: 8,
    name: "Impulso de Constancia",
    desc: "+10% de XP durante el resto de la semana.",
  },
  {
    id: "xpbuff",
    cost: 12,
    name: "Impulso de XP",
    desc: "+25% de XP en todo lo que hagas durante el resto del día.",
  },
  {
    id: "shield",
    cost: 14,
    name: "Escudo de Racha",
    desc: "Protege un día fallado: tu racha sigue viva. Se consume solo.",
  },
  {
    id: "bigbuff",
    cost: 20,
    name: "Impulso Mayor de XP",
    desc: "+50% de XP durante el resto del día. Sustituye al impulso normal.",
  },
  {
    id: "memoria",
    cost: 40,
    name: "Memoria",
    desc: "Permanente: +5% de XP en todo, para siempre.",
  },
  {
    id: "nucleo",
    cost: 90,
    name: "Núcleo Reforzado",
    desc: "Permanente: sube el bono anterior a +10% de XP en todo.",
  },
];
function Ay() {
  return {
    points: 0,
    shields: 0,
    perks: [],
    xpBuffDate: null,
    extraPrimal: { date: ue(), count: 0 },
  };
}
var sdcMods = {
  bodyweight: [
    { n: "Tempo", d: "Baja en 3 segundos cada repetición, sin rebote abajo.", x: 0.2 },
    { n: "Densidad", d: "Descansos a la mitad entre series.", x: 0.25 },
    { n: "Sin pausa", d: "Encadena los cuatro patrones sin descanso entre ellos.", x: 0.3 },
    { n: "Pausa abajo", d: "Un segundo detenido en el punto más bajo de cada repetición.", x: 0.2 },
    { n: "Unilateral", d: "Donde el ejercicio lo permita, hazlo a un lado por vez.", x: 0.25 },
    { n: "Media extra", d: "Termina cada serie con 3 repeticiones a medio rango.", x: 0.2 },
  ],
  gym: [
    { n: "Tempo", d: "Baja el peso en 3 segundos y no lo sueltes arriba.", x: 0.2 },
    {
      n: "Serie al fallo",
      d: "Lleva la última serie de cada ejercicio hasta el fallo técnico.",
      x: 0.25,
    },
    { n: "Drop set", d: "En la última serie baja el peso y sigue sin descansar.", x: 0.25 },
    { n: "Carga alta", d: "Sube el peso y baja las repeticiones de cada serie.", x: 0.2 },
    { n: "Descanso corto", d: "45 segundos entre series, cronometrados.", x: 0.25 },
    { n: "Pausa estirado", d: "Un segundo detenido en el punto de mayor estiramiento.", x: 0.2 },
  ],
  flow: [
    { n: "Sostén largo", d: "Mantén cada posición un 50% más de lo que marca la serie.", x: 0.25 },
    { n: "Transiciones", d: "Encadena los movimientos sin apoyar rodillas ni cadera.", x: 0.3 },
    { n: "Control", d: "Mitad de velocidad en todo el recorrido.", x: 0.2 },
    { n: "Respiración", d: "Cuatro segundos inhalando y cuatro exhalando en cada ciclo.", x: 0.2 },
    { n: "Amplitud", d: "Busca el rango máximo de cada articulación, sin forzar.", x: 0.25 },
    { n: "Silencio", d: "Que ningún apoyo haga ruido: cada contacto controlado.", x: 0.25 },
  ],
};
function sdcModDia(m, f) {
  var l = sdcMods[m] || sdcMods.bodyweight;
  return l[Dd(String(f || ue()) + "|" + String(m || "bodyweight"), l.length)];
}
var sdcPetPR = [
    '{name} da vueltas sin parar: "¡Ese número no lo habías tocado nunca!"',
    '{name} te empuja la mano con la cabeza: "Marca nueva. La vi."',
  ],
  sdcPetRacha = [
    '{name} apoya la cabeza en tu pierna: "{d} días seguidos. Ya te sigo el ritmo."',
    '{name} te mira fijo: "{d} días. Esto ya no es casualidad."',
  ],
  sdcPetFull = [
    '{name} te mira con orgullo: "Cuatro de cuatro. Así se hace."',
    '{name} se estira a tu lado: "Rutina entera. Nada que reprochar hoy."',
  ],
  sdcPetParcial = [
    '{name} levanta la cabeza: "Algo es algo. Mañana vamos por más."',
    '{name} te mira de reojo: "No fue tu mejor día, pero apareciste."',
  ];
function sdcMascota(o, p, pr) {
  var nm = (o.profile && o.profile.pet && o.profile.pet.name) || "Tu compañero",
    d = (o.streak && o.streak.current) || 0,
    k = pr ? "pr" : d >= 7 ? "ra" : p >= 1 ? "fu" : "pa",
    l = pr ? sdcPetPR : d >= 7 ? sdcPetRacha : p >= 1 ? sdcPetFull : sdcPetParcial;
  return l[Dd(String(o.today.date) + "|" + k, l.length)].replace("{name}", nm).replace("{d}", d);
}
function sdcRacha(e) {
  let d = (e.streak && e.streak.current) || 0;
  return 1 + Math.min(0.3, d * 0.02);
}
function sdcPerk(e) {
  let p = (e.dominion && e.dominion.perks) || [];
  return p.indexOf("nucleo") >= 0 ? 1.1 : p.indexOf("memoria") >= 0 ? 1.05 : 1;
}
function Ka(e) {
  return e.dominion && e.dominion.xpBuffDate === ue() ? e.dominion.xpBuffMult || 1.25 : 1;
}
function Sd(e) {
  let a = e.dominion && e.dominion.extraPrimal,
    l = a && a.date === ue() ? a.count : 0;
  return k2 + l;
}
function M2(e, a) {
  let l = M(e),
    n = [],
    o = Ey.find((u) => u.id === a);
  if (!o) return { state: l, notices: n };
  if (l.dominion.points < o.cost)
    return { state: l, notices: ["No tenés suficientes Puntos de Dominio."] };
  let s = ue();
  if (a === "reroll") {
    if (l.dungeon.completed) return { state: l, notices: ["Ya completaste la travesía de hoy."] };
    ((l.dungeon = { date: s, ...ai(l.progress.rank) }),
      l.dungeon.available ||
        (l.dungeon = {
          date: s,
          available: !0,
          completed: !1,
          name: sdcPortales[0].n,
          challengeText: sdcPortales[0].c,
          rewardXP: Ed[l.progress.rank],
        }),
      n.push(`Nueva travesía: ${l.dungeon.name}.`));
  } else if (a === "primal")
    ((!l.dominion.extraPrimal || l.dominion.extraPrimal.date !== s) &&
      (l.dominion.extraPrimal = { date: s, count: 0 }),
      (l.dominion.extraPrimal.count += 1),
      n.push("Sesión extra de Instinto Primal desbloqueada para hoy."));
  else if (a === "xpbuff") {
    if (l.dominion.xpBuffDate === s)
      return { state: l, notices: ["Ya tenés el Impulso de XP activo hoy."] };
    ((l.dominion.xpBuffDate = s),
      (l.dominion.xpBuffMult = 1.25),
      n.push("Impulso de XP activo: +25% por el resto del día."));
  } else if (a === "rest") {
    if (!l.week.restDayUsed)
      return { state: l, notices: ["Todavía no gastaste tu día de descanso de esta semana."] };
    ((l.week.restDayUsed = !1),
      n.push("Día de descanso recuperado: podés volver a usarlo esta semana."));
  } else if (a === "flex") {
    if (l.streak.flexBuff)
      return { state: l, notices: ["Ya tenés el Impulso de Constancia activo."] };
    ((l.streak.flexBuff = !0),
      n.push("Impulso de Constancia activo: +10% de XP el resto de la semana."));
  } else if (a === "bigbuff") {
    if (l.dominion.xpBuffDate === s && l.dominion.xpBuffMult === 1.5)
      return { state: l, notices: ["Ya tenés el Impulso Mayor activo hoy."] };
    ((l.dominion.xpBuffDate = s),
      (l.dominion.xpBuffMult = 1.5),
      n.push("Impulso Mayor activo: +50% de XP por el resto del día."));
  } else if (a === "memoria" || a === "nucleo") {
    l.dominion.perks || (l.dominion.perks = []);
    if (l.dominion.perks.indexOf(a) >= 0) return { state: l, notices: ["Ya tenés esa mejora."] };
    if (a === "nucleo" && l.dominion.perks.indexOf("memoria") < 0)
      return { state: l, notices: ["Primero necesitás la Memoria."] };
    (l.dominion.perks.push(a),
      n.push(
        a === "memoria"
          ? "Memoria instalada: +5% de XP para siempre."
          : "Núcleo Reforzado: tu bono permanente sube a +10% de XP.",
      ));
  } else
    a === "shield" &&
      ((l.dominion.shields += 1), n.push(`Escudo de Racha listo (tenés ${l.dominion.shields}).`));
  return ((l.dominion.points -= o.cost), { state: l, notices: n });
}
var Pt = [
  {
    name: "Movilidad de cuello",
    desc: "Gira la cabeza lento de lado a lado y luego oreja a hombro. Sin forzar.",
    seconds: 25,
  },
  {
    name: "Círculos de hombros",
    desc: "Hombros hacia atrás en círculos amplios. Pecho abierto.",
    seconds: 25,
  },
  {
    name: "Apertura de pecho",
    desc: "Manos entrelazadas atrás, estira los brazos y saca el pecho.",
    seconds: 25,
    corta: 1,
  },
  {
    name: "Gato-vaca",
    desc: "En cuadrupedia, alterna arquear y redondear la espalda al ritmo de tu respiración.",
    seconds: 35,
    pr: 8,
  },
  {
    name: "Isquiotibiales",
    desc: "De pie o sentado, alcanza el pie con la espalda larga. Sin rebotar.",
    seconds: 30,
    lados: 1,
    corta: 1,
    pr: 8,
  },
  {
    name: "Flexor de cadera",
    desc: "Zancada con la rodilla trasera en el suelo, empuja la cadera adelante.",
    seconds: 30,
    lados: 1,
    corta: 1,
    pr: 8,
  },
  {
    name: "Cuádriceps",
    desc: "De pie, lleva el talón al glúteo. Rodillas juntas.",
    seconds: 25,
    lados: 1,
    pr: 8,
  },
  {
    name: "Torsión sentado",
    desc: "Sentado, rota el torso mirando por encima del hombro.",
    seconds: 25,
    lados: 1,
    pr: 8,
  },
  {
    name: "Postura del niño",
    desc: "Rodillas abiertas, cadera a los talones, brazos extendidos. Respira hondo.",
    seconds: 35,
    corta: 1,
    pr: 8,
  },
];
function sdcEstLista(corta) {
  var l = [],
    k,
    s;
  for (k = 0; k < Pt.length; k++) {
    s = Pt[k];
    if (corta && !s.corta) continue;
    if (s.lados) {
      l.push({ name: s.name, desc: s.desc, seconds: s.seconds, lado: "lado derecho", prep: s.pr });
      l.push({ name: s.name, desc: s.desc, seconds: s.seconds, lado: "lado izquierdo" });
    } else l.push({ name: s.name, desc: s.desc, seconds: s.seconds, lado: null, prep: s.pr });
  }
  l.length && (l[0].prep = 10);
  return l;
}
var sdcEstPrep = 5;
function sdcEstTotal(l) {
  var t = 0,
    k;
  for (k = 0; k < (l || []).length; k++) t += (l[k].prep || sdcEstPrep) + l[k].seconds;
  return t;
}
function sdcEstPaso(l, e) {
  var a = 0,
    k,
    pr,
    fn;
  for (k = 0; k < l.length; k++) {
    pr = a + (l[k].prep || sdcEstPrep);
    fn = pr + l[k].seconds;
    if (e < pr) return { index: k, left: l[k].seconds, prep: pr - e };
    if (e < fn) return { index: k, left: fn - e, prep: 0 };
    a = fn;
  }
  return { index: l.length - 1, left: 0, prep: 0 };
}
function sdcEstMMSS(s) {
  s = Math.max(0, Math.round(s));
  return String(Math.floor(s / 60)) + ":" + String(s % 60).padStart(2, "0");
}
var sdcFlexNiv = [
  { n: 1, t: "A las rodillas" },
  { n: 2, t: "A media pantorrilla" },
  { n: 3, t: "A los tobillos" },
  { n: 4, t: "A los dedos de los pies" },
  { n: 5, t: "Palmas apoyadas en el piso" },
];
function sdcFlexTxt(n) {
  for (var k = 0; k < sdcFlexNiv.length; k++) if (sdcFlexNiv[k].n === n) return sdcFlexNiv[k].t;
  return "";
}
function sdcFlex(e) {
  return (e && e.flex) || {};
}
function sdcFlexToca(e) {
  var f = sdcFlex(e);
  if (!f.fecha) return !0;
  var d = Math.round((new Date(ue() + "T00:00:00") - new Date(f.fecha + "T00:00:00")) / 864e5);
  return d >= 7;
}
function sdcFlexSet(e, n) {
  var a = M(e),
    f = sdcFlex(a),
    pr = f.mejor || 0,
    hoy = ue(),
    l = [];
  a.flex = {
    nivel: n,
    fecha: hoy,
    primero: f.primero || n,
    mejor: Math.max(pr, n),
    historial: (f.historial || []).concat([{ fecha: hoy, nivel: n }]).slice(-40),
  };
  if (pr && n > pr) {
    sdcPrimeraAdd(
      a,
      "Flexibilidad: llegás " +
        sdcFlexTxt(n).toLowerCase() +
        ". Antes llegabas " +
        sdcFlexTxt(pr).toLowerCase() +
        ".",
      "medida",
    );
    l.push("Primera vez: llegás " + sdcFlexTxt(n).toLowerCase() + ".");
  } else
    l.push(
      pr
        ? "Alcance anotado. Te lo vuelvo a preguntar en una semana."
        : "Alcance anotado: este es tu punto de partida. Te lo vuelvo a preguntar en una semana.",
    );
  return { state: a, notices: l };
}
var Io = [
  {
    key: "fuerza",
    name: "Fuerza",
    color: "#ff5c7a",
    zones: ["pushup", "back"],
    calc: (e) =>
      e.lifetimeReps.pushup * 2 + e.lifetimeReps.back * 2.5 + (e.combat.villainsDefeated || 0) * 10,
  },
  {
    key: "resistencia",
    name: "Resistencia",
    color: "#4f9dff",
    zones: ["squat"],
    calc: (e) =>
      e.lifetimeReps.squat + (e.exploration.lifetimeKm || 0) * 20 + (e.dungeonsCleared || 0) * 30,
  },
  {
    key: "movilidad",
    name: "Movilidad",
    color: "#3ecf8e",
    zones: [],
    calc: (e) =>
      (e.lifetimePrimal || 0) * 25 +
      (e.lifetimeStretch || 0) * 20 +
      (e.primal.unlockedCount || 1) * 15,
  },
  {
    key: "control",
    name: "Control",
    color: "#b084f5",
    zones: ["abs"],
    calc: (e) =>
      e.lifetimeReps.abs * 1.5 +
      (e.streak.best || 0) * 20 +
      (e.records ? Object.values(e.records).reduce((a, l) => a + l, 0) * 2 : 0) +
      ((e.neuro && e.neuro.sessions) || 0) * 20 +
      ((e.neuro && e.neuro.bestSequence) || 0) * 15,
  },
];
function tu(e, a) {
  return Math.floor(a.calc(e));
}
function Ro(e) {
  return Math.floor(Math.sqrt(e / 60)) + 1;
}
function q2(e) {
  let a = Ro(e),
    l = Math.pow(a - 1, 2) * 60,
    n = Math.pow(a, 2) * 60;
  return { cur: e - l, need: n - l };
}
function O2(e) {
  let a = ["squat", "pushup", "back", "abs"],
    l = {};
  a.forEach((u) => {
    l[u] = Bd(e.lifetimeReps[u] || 0);
  });
  let n = a[0],
    o = a[0];
  a.forEach((u) => {
    (l[u] > l[n] && (n = u), l[u] < l[o] && (o = u));
  });
  let s = l[n] - l[o];
  return { hi: n, lo: o, gap: s, levels: l };
}
function ry(e) {
  return Io.filter((a) => a.zones.includes(e))
    .map((a) => a.name)
    .join(" y ");
}
var j2 = [
    {
      g: "PARA EMPEZAR",
      title: "Tu rutina de hoy",
      text: "Cada día la app te arma una rutina con cuatro ejercicios, uno por cada zona grande del cuerpo: piernas, empuje (pecho, hombros y brazos), tracción (espalda) y core (la zona del abdomen). A esas cuatro las llamamos patrones, y así van a aparecer nombradas en todo el juego. Cada patrón tiene su número de repeticiones para hoy, y no hace falta que las hagas todas seguidas ni a una hora fija. Si no conocés un ejercicio, tocá ¿Cómo se hace? debajo del nombre: ahí están la posición de arranque, el movimiento y el error que más se comete. La primera vez que te toca un ejercicio nuevo se abre solo, y a partir de la segunda queda cerrado. Arriba de la rutina está el Calentamiento: unos siete minutos guiados que suben el pulso, aflojan las articulaciones y terminan con pocas repeticiones suaves de tus cuatro ejercicios de hoy. La primera vez que te toca cada movimiento, el reloj espera a que toques Listo.",
    },
    {
      g: "PARA EMPEZAR",
      title: "Cómo se anota lo que hacés",
      text: "Las repeticiones de cada patrón vienen partidas en dos o tres series, y cada serie es un botón. Tocalo apenas terminás esa serie, no al final de todo: la app suena, vibra, te suma la XP y te arranca el descanso, que queda fijo abajo de la pantalla. Cuando terminás todas las series de un ejercicio, se pliega: tocalo para abrirlo de nuevo. Si una serie te salió más corta de lo pedido, tocá el − N + de la serie que queda pendiente y anotá lo que hiciste de verdad. Lo que se guarda es lo que hiciste, no lo que decía la meta. Si entrenás en gimnasio, debajo de las series vas a ver un campo de kilos para cada una: podés subir el peso serie a serie, y la próxima vez la app te recuerda lo que usaste la última.",
    },
    {
      g: "PARA EMPEZAR",
      title: "Tu semana",
      text: "Vos elegís cuántas sesiones querés hacer por semana. Cuenta como sesión la rutina, una travesía, ganar un combate, una sesión de Instinto Primal o terminar una expedición: cualquiera de ellas marca el día como entrenado. Tu racha solo se corta si te salteás tantos días que ya no te alcanza para llegar a la meta. Un día suelto sin entrenar no cuesta nada, y nunca perdés XP. Abajo de la meta están los cuadraditos de tus últimos días, cada uno con el color del tipo de día que fue; tocá cualquiera para ver qué hiciste.",
    },
    {
      g: "PARA EMPEZAR",
      title: "Si hoy no podés",
      text: "Hay tres salidas y ninguna te castiga. Modo Recuperación: hacés la mitad de las repeticiones, cuenta como entrenar y te mantiene la racha; está para los días en que llegás fundido. Día de descanso: uno por semana, el día que vos quieras, no da XP pero te conserva la racha y no cuenta como falta. Escudo de Racha: se compra con Puntos de Dominio y se gasta solo cuando hace falta, absorbiendo un día fallado sin que se corte nada. Y antes de entrenar la app te pregunta cómo llegás: si llegás sin ganas, te propone empezar por el calentamiento y hacer la rutina en Recuperación, y al terminar te pregunta cómo te vas. Con el tiempo vas a ver cuántas veces terminaste mejor de lo que llegaste. Si tocaste la cara que no era, «Cambiar respuesta» la corrige: la de llegada hasta que marcás la primera serie, la de salida en el resumen de la rutina. Se apaga en Perfil, en Sistemas del juego.",
    },
    {
      g: "CÓMO PROGRESÁS",
      title: "Niveles y XP",
      text: "XP son los puntos que vas juntando. Todo lo que hacés da XP: la rutina, las travesías, el combate, el Instinto Primal, las expediciones, el calentamiento y el estiramiento. Cuando se llena la barra de arriba, subís un nivel. Cada nivel cuesta un poco más que el anterior, así que al principio subís seguido y después se va espaciando. Nunca perdés XP. Subir de nivel además abre sistemas nuevos: Combate, Travesías, Explorar y el resto van apareciendo solos. Arriba de todo siempre dice cuál es el próximo y a qué nivel llega.",
    },
    {
      g: "CÓMO PROGRESÁS",
      title: "Los rangos y el Umbral",
      text: "El rango es tu etapa, y hay siete. Cambia dos cosas: qué versión de cada ejercicio te toca (de la más asistida a la más difícil) y cuántas repeticiones hacés. Todo el mundo empieza en el primero: la prueba inicial ajusta cuántas repeticiones hacés, no el rango. Para pasar al siguiente rango hay que llegar a cierto nivel y superar el Umbral, una prueba que aparece sola y encadena varias rondas de los cuatro patrones; solo podés darla un día en el que hayas completado tu rutina al 100%. En el séptimo y último rango el objetivo diario deja de salir de una tabla: es superar tu propio récord por lo menos un 1%, y si pasás siete días sin una rutina completa bajás al anterior hasta que vuelvas.",
    },
    {
      g: "CÓMO PROGRESÁS",
      title: "Tu calibre",
      text: "Es lo que dice abajo de tu nombre: Principiante, Intermedio, Avanzado y así. Sale de la prueba de aptitud y no es lo mismo que el rango. El rango es lo que ganás entrenando; el calibre es lo que medís hoy. Solo sirve para ajustar cuántas repeticiones te toca hacer. Podés repetir la prueba cuando quieras desde tu Perfil, y repetirla no te cambia el rango ni te borra nada.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Combate",
      text: "Elegís con qué patrón atacar y la app te dice cuántas repeticiones vas a hacer y cuántos segundos vas a tener. El reloj arranca recién cuando tocás Empezar, nunca antes. Marcás cada serie igual que en la rutina y después golpeás. Si se te termina el tiempo perdés un corazón y elegís cómo seguir: reintentar igual, bajar la carga (menos repeticiones, pero tus golpes pegan más flojo) o cambiar de patrón. Cada cinco terrenos aparece un jefe, que encadena dos patrones sin descanso.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Travesías",
      text: "Una sesión larga de cardio, distinta cada día. Tocás Empezar, tenés diez segundos para ubicarte y la app corre el tiempo con vos, con la pantalla despierta. En las que van por intervalos (boxeo, HIIT, sprints, burpees, planchas) te marca FUERTE y SUAVE con un pitido; en las continuas te avisa cada cinco minutos. Recién cuando se cumple el tiempo podés completarla. Si saliste sin el teléfono, hay un enlace abajo para registrarla igual.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Instinto Primal",
      text: "Movimientos de control y coordinación en el suelo, en tres rondas cronometradas. El reloj arranca cuando tocás Empezar, con diez segundos para ubicarte. Hasta cinco sesiones por día. Si practicás dos veces el movimiento más nuevo que tengas, se te abre el siguiente.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Explorar",
      text: "Cuenta los kilómetros que caminás o corrés. Podés salir con la app: te cuenta el tiempo y estima la distancia según el ritmo que elijas, y al volver la corregís si hace falta. También podés anotar tramos a mano, en kilómetros o en pasos. Cuando juntás los kilómetros que pide una expedición se te revelan lugares del mapa, y cada uno deja una reliquia que queda guardada en el Códice y te suma un 3% de XP de exploración.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Estiramiento",
      text: "Dos rutinas guiadas: una corta de menos de cuatro minutos para después de entrenar y una completa de siete y medio. La app te va diciendo qué hacer, cuánto aguantar y cuándo cambiar de lado. Antes de cada posición tenés unos segundos para acomodarte, con el nombre de la que viene ya en pantalla: un pitido grave para que te prepares y uno agudo para empezar. La primera vez que te toca una posición, el reloj espera a que toques Listo, y podés pausar cuando quieras. La pantalla no se apaga. Estirar dos veces por semana te da +10% de XP la semana siguiente. Y una vez por semana te pregunta hasta dónde llegás sentado con las piernas estiradas y lo compara con cuando empezaste.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Primeras veces",
      text: "La app anota el día que hacés algo que antes no podías: tu primera flexión, tu primera dominada, llegar más lejos estirando. Primero te pregunta una sola vez si alguna vez hiciste cada movimiento. Si respondés que nunca pudiste, el día que lo logres queda anotado, con fecha, y no se borra nunca. También podés escribir a mano cualquier cosa que la app no pueda ver.",
    },
    {
      g: "LOS SISTEMAS",
      title: "El mapa de tu cuerpo",
      text: "Es la figura que está arriba de todo en Entreno. Cada zona se pinta más fuerte cuanto más la entrenaste, así que de un vistazo ves qué estás descuidando. Tocá cualquier zona para ver su nivel, tus repeticiones de por vida en ese patrón y cuántos días lleva sin estímulo.",
    },
    {
      g: "LO DEMÁS",
      title: "Las tres modalidades",
      text: "Son las tres formas de entrenar que entiende la app: peso corporal (solo con tu cuerpo), gimnasio (con pesas y máquinas) y flow (movimiento en el suelo, movilidad y control). Podés tener varias activas y elegir cada día con cuál entrenás. Si una modalidad no cubre alguno de los cuatro patrones, para ese patrón se usa la versión de peso corporal.",
    },
    {
      g: "LO DEMÁS",
      title: "Puntos de Dominio",
      text: "Son la moneda del juego. Ganás 3 el día que completás tu rutina al 100%, o 1 si llegás al menos a la mitad; cuenta solo la primera sesión de cada día. También los dan las misiones, cada reliquia nueva y los 147 logros, que se desbloquean solos apenas cumplís la condición: no hace falta que los vayas a buscar. Se gastan en la tienda, que se abre tocando el número violeta de arriba a la derecha: hay cosas que duran un día y dos mejoras que son para siempre.",
    },
    {
      g: "LO DEMÁS",
      title: "El metrónomo",
      text: "Es el pitido que marca el ritmo de cada repetición: bajás, pausás abajo y subís. Está para que no aceleres, y es el mismo ritmo de la prueba de aptitud. Si el modificador del día pide otro ritmo, el metrónomo se ajusta solo. No cuenta repeticiones ni sabe cuándo terminaste: eso lo marcás vos tocando cada serie. En los ejercicios de sostén, como la plancha, no aplica: ahí lo que importa son los segundos, no el sube y baja.",
    },
    {
      g: "LO DEMÁS",
      title: "Guardá tu progreso",
      text: "Esto es importante. Todo lo tuyo se guarda en este teléfono y en ningún otro lado. No hay cuenta ni servidor: nadie ve tus datos, pero tampoco hay una copia esperándote si perdés el teléfono o borrás los datos del navegador. Andá a Perfil, abrí Respaldo de tu progreso, copiá el texto y guardalo donde quieras (un mail a vos mismo alcanza). Con ese texto recuperás todo, o lo pasás a un teléfono nuevo.",
    },
  ],
  El = [
    {
      id: "handstand",
      name: "Pino (Handstand)",
      family: "Calistenia",
      level: "Intermedio",
      what: "Sostenerte invertido sobre las manos con el cuerpo alineado.",
      why: "Construye fuerza de hombros, control escapular y una conciencia corporal que se transfiere a todo lo demás.",
      steps: [
        {
          name: "Plancha de hombros en pared",
          how: "De espaldas a la pared, manos en el suelo, pies apoyados en la pared a la altura de la cadera. Aguanta manteniendo el core apretado.",
          cue: "Costillas hacia dentro, sin arquear la lumbar.",
        },
        {
          name: "Wall walk",
          how: "Desde plancha, camina los pies por la pared mientras acercas las manos, hasta quedar casi vertical de cara a la pared. Baja con control.",
          cue: "Mira entre las manos, no al suelo.",
        },
        {
          name: "Pino de cara a la pared",
          how: "Sube y aguanta con el pecho hacia la pared, manos a un palmo del rodapié.",
          cue: "Aprieta glúteos y estira las puntas hacia el techo.",
        },
        {
          name: "Pino libre con toques",
          how: "De cara a la pared, despega un pie, luego el otro, aguantando segundos sueltos.",
          cue: "Corrige con los dedos de las manos, no con la espalda.",
        },
        {
          name: "Pino libre",
          how: "Entra con una patada controlada lejos de la pared y sostén.",
          cue: "Si te pasas, sal girando hacia un lado; nunca caigas de espalda.",
        },
      ],
      regression:
        "Si te duelen las muñecas, trabaja primero en puños o paraletas y haz movilidad de muñeca antes.",
      mistake: "Arquear la lumbar en banana. Es la causa número uno de perder el equilibrio.",
    },
    {
      id: "pistol",
      name: "Pistol Squat",
      family: "Calistenia",
      level: "Intermedio",
      what: "Sentadilla completa a una sola pierna con la otra extendida al frente.",
      why: "Fuerza unilateral real, movilidad de tobillo y control de rodilla. Delata cualquier desequilibrio entre piernas.",
      steps: [
        {
          name: "Sentadilla a caja alta",
          how: "A una pierna, siéntate en una superficie alta y levántate sin impulso.",
          cue: "Talón clavado en el suelo todo el recorrido.",
        },
        {
          name: "Bajar la caja",
          how: "Repite bajando la altura progresivamente cada semana.",
          cue: "Controla la bajada 3 segundos.",
        },
        {
          name: "Pistol asistida",
          how: "Sujétate de un marco o anilla y baja completo, usando las manos lo mínimo.",
          cue: "La pierna libre estirada, sin tocar el suelo.",
        },
        {
          name: "Negativa completa",
          how: "Baja sola y controlada hasta abajo, levántate con ayuda.",
          cue: "Si te desplomas, aún no es tu altura.",
        },
        {
          name: "Pistol completa",
          how: "Baja y sube sin apoyo ni impulso.",
          cue: "Brazos al frente como contrapeso.",
        },
      ],
      regression: "Sin movilidad de tobillo, eleva el talón sobre un disco fino mientras la ganas.",
      mistake: "Dejar caer la rodilla hacia dentro. Mantenla alineada con el pie.",
    },
    {
      id: "lsit",
      name: "L-Sit",
      family: "Calistenia",
      level: "Intermedio",
      what: "Sostenerte con las manos y las piernas extendidas al frente formando una L.",
      why: "Core comprimido, triceps y flexores de cadera. Base para V-sit y manna.",
      steps: [
        {
          name: "Soporte con piernas flexionadas",
          how: "Sobre paraletas o libros, sostén el cuerpo con rodillas al pecho.",
          cue: "Hombros hacia abajo, lejos de las orejas.",
        },
        {
          name: "Una pierna extendida",
          how: "Extiende una pierna manteniendo la otra flexionada. Alterna.",
          cue: "No dejes que la cadera se hunda.",
        },
        {
          name: "L-sit en paralelas bajas",
          how: "Ambas piernas extendidas, con la altura suficiente para que no rocen.",
          cue: "Empuja el suelo hacia abajo con las manos.",
        },
        {
          name: "L-sit en el suelo",
          how: "Mismo gesto con las manos planas en el suelo.",
          cue: "Requiere más compresión: aguanta menos tiempo pero limpio.",
        },
        {
          name: "L-sit sostenido 20 s",
          how: "Acumula tiempo hasta sostener 20 segundos seguidos.",
          cue: "Respira. No aguantes el aire.",
        },
      ],
      regression:
        "Trabaja compresión sentado: piernas estiradas en el suelo, intenta despegar los talones.",
      mistake: "Encoger los hombros. Deprime las escápulas antes de despegar.",
    },
    {
      id: "muscleup",
      name: "Muscle-Up",
      family: "Calistenia",
      level: "Avanzado",
      what: "Pasar de colgado a apoyo sobre la barra en un solo movimiento.",
      why: "Une tracción explosiva y empuje. Es el puente entre dominadas y fondos.",
      steps: [
        {
          name: "Dominadas al pecho",
          how: "Domina llevando el esternón a la barra, no solo la barbilla.",
          cue: "Codos hacia atrás y abajo.",
        },
        {
          name: "Fondos en barra",
          how: "Sobre la barra en apoyo, baja y sube con control.",
          cue: "Muñecas por encima de la barra desde el inicio.",
        },
        {
          name: "Transición con banda",
          how: "Con una banda asistiendo, practica el paso de tracción a apoyo.",
          cue: "Cuando llegues arriba, mete las muñecas rápido.",
        },
        {
          name: "Muscle-up con impulso",
          how: "Permite un balanceo controlado para pasar la transición.",
          cue: "Tira hacia ti, no hacia arriba.",
        },
        {
          name: "Muscle-up estricto",
          how: "Sin balanceo, desde colgado muerto.",
          cue: "Agarre falso ayuda mucho en la transición.",
        },
      ],
      regression:
        "Si no llegas al pecho en dominadas, acumula primero 10 dominadas estrictas limpias.",
      mistake: "Intentarlo sin base de dominadas. Te llevarás un golpe y ningún progreso.",
    },
    {
      id: "frontlever",
      name: "Front Lever",
      family: "Calistenia",
      level: "Avanzado",
      what: "Colgado de la barra, cuerpo horizontal y rígido mirando arriba.",
      why: "Máxima tensión de dorsal y core en cadena posterior. Un estático de referencia.",
      steps: [
        {
          name: "Dominada con escápulas",
          how: "Colgado, baja los hombros sin doblar los codos. Sostén 5 segundos.",
          cue: "Ese es el punto de partida de toda la progresión.",
        },
        {
          name: "Tuck lever",
          how: "Sube las rodillas al pecho y deja el torso horizontal.",
          cue: "Espalda redonda, cadera a la altura de los hombros.",
        },
        {
          name: "Advanced tuck",
          how: "Abre el ángulo de cadera manteniendo rodillas flexionadas.",
          cue: "Lumbar plana, no arqueada.",
        },
        {
          name: "Una pierna extendida",
          how: "Extiende una pierna y mantén la otra recogida. Alterna lados.",
          cue: "Aprieta el glúteo de la pierna extendida.",
        },
        {
          name: "Front lever completo",
          how: "Ambas piernas extendidas, cuerpo en línea.",
          cue: "Tira de la barra hacia tus pies, no hacia abajo.",
        },
      ],
      regression: "Trabaja remos invertidos horizontales pesados si el tuck ya te cuesta.",
      mistake: "Saltar de tuck a completo. Cada etapa necesita semanas, no días.",
    },
    {
      id: "dragonflag",
      name: "Dragon Flag",
      family: "Calistenia",
      level: "Avanzado",
      what: "Tumbado, elevar todo el cuerpo rígido apoyando solo los hombros.",
      why: "El ejercicio de core anti-extensión más brutal sin equipo.",
      steps: [
        {
          name: "Hollow hold",
          how: "Tumbado, lumbar pegada al suelo, brazos y piernas despegados. Sostén.",
          cue: "Si la lumbar se despega, acerca rodillas.",
        },
        {
          name: "Negativa con rodillas",
          how: "Sube el cuerpo, baja lento con rodillas flexionadas.",
          cue: "Agárrate fuerte detrás de la cabeza.",
        },
        {
          name: "Negativa con una pierna",
          how: "Baja con una pierna extendida y la otra flexionada.",
          cue: "Baja en 5 segundos.",
        },
        {
          name: "Negativa completa",
          how: "Ambas piernas extendidas, bajada lenta y controlada.",
          cue: "Cuerpo en una sola línea rígida.",
        },
        {
          name: "Dragon flag completo",
          how: "Sube y baja sin perder la línea.",
          cue: "El movimiento sale de la cadera, no del impulso.",
        },
      ],
      regression: "Si la lumbar se arquea, vuelve al hollow hold hasta sostener 45 segundos.",
      mistake: "Usar impulso para subir. Anula todo el trabajo.",
    },
    {
      id: "bridge",
      name: "Puente Completo",
      family: "Movilidad",
      level: "Intermedio",
      what: "Arco completo apoyando manos y pies, pecho abierto.",
      why: "Extensión de columna, apertura de hombros y cadera. Antídoto para estar sentado todo el día.",
      steps: [
        {
          name: "Puente de glúteos",
          how: "Tumbado, pies apoyados, eleva la cadera y aprieta arriba.",
          cue: "Costillas abajo, no arquees la lumbar.",
        },
        {
          name: "Puente de hombros elevado",
          how: "Mismo gesto con los pies en una superficie elevada.",
          cue: "Sostén 20 segundos.",
        },
        {
          name: "Puente sobre la cabeza",
          how: "Manos junto a las orejas, empuja hasta apoyar la coronilla.",
          cue: "Para aquí si los hombros protestan.",
        },
        {
          name: "Puente con codos estirados",
          how: "Empuja hasta estirar los brazos completamente.",
          cue: "Reparte el arco: hombros y cadera, no solo lumbar.",
        },
        {
          name: "Puente caminando",
          how: "En el puente, camina manos y pies acercándolos.",
          cue: "Respira profundo dentro de la postura.",
        },
      ],
      regression: "Trabaja movilidad de hombros con un palo antes de intentar el puente alto.",
      mistake: "Forzar solo desde la lumbar. Si te pellizca, falta apertura de hombro.",
    },
    {
      id: "crow",
      name: "Postura del Cuervo",
      family: "Animal Flow",
      level: "Principiante",
      what: "Equilibrio sobre las manos apoyando las rodillas en los triceps.",
      why: "Primera toma de contacto con el equilibrio sobre manos. Menos intimidante que el pino.",
      steps: [
        {
          name: "Cuclillas profundas",
          how: "Ponte en cuclillas con los pies juntos y las manos en el suelo delante.",
          cue: "Talones pueden despegarse al principio.",
        },
        {
          name: "Cargar peso",
          how: "Inclínate adelante pasando peso a las manos, sin despegar los pies.",
          cue: "Codos ligeramente flexionados, dedos agarrando el suelo.",
        },
        {
          name: "Un pie arriba",
          how: "Despega un pie apoyando la rodilla en el triceps.",
          cue: "Mira un punto medio metro delante de las manos.",
        },
        {
          name: "Dos pies arriba",
          how: "Despega ambos pies y sostén unos segundos.",
          cue: "Redondea la espalda, no la mantengas plana.",
        },
        {
          name: "Cuervo 30 segundos",
          how: "Acumula hasta sostener medio minuto estable.",
          cue: "Pon un cojín delante mientras aprendes.",
        },
      ],
      regression: "Si te caes de cara, baja más la cadera y mira más adelante.",
      mistake: "Mirar a los pies. La cabeza dirige el equilibrio.",
    },
    {
      id: "shrimp",
      name: "Shrimp Squat",
      family: "Calistenia",
      level: "Intermedio",
      what: "Sentadilla a una pierna con la otra flexionada atrás, sujeta con la mano.",
      why: "Alternativa a la pistol con menos exigencia de tobillo y más de cuádriceps.",
      steps: [
        {
          name: "Zancada inversa profunda",
          how: "Paso atrás bajando la rodilla hasta rozar el suelo.",
          cue: "Torso erguido.",
        },
        {
          name: "Shrimp asistida a caja",
          how: "Sujeta el pie trasero y baja hasta sentarte en una caja.",
          cue: "La rodilla trasera busca el suelo, no el lateral.",
        },
        {
          name: "Shrimp con apoyo de mano",
          how: "Baja tocando el suelo con la mano libre para estabilizar.",
          cue: "Usa la mano lo mínimo.",
        },
        {
          name: "Shrimp tocando rodilla",
          how: "Baja hasta que la rodilla trasera roce el suelo, sin apoyo.",
          cue: "Sube empujando con el talón.",
        },
        {
          name: "Shrimp completa",
          how: "Serie de 5 por pierna con control total.",
          cue: "Sin rebote abajo.",
        },
      ],
      regression: "Si pierdes el equilibrio, hazla junto a una pared y toca con los dedos.",
      mistake: "Inclinar el torso hacia delante para compensar falta de fuerza.",
    },
    {
      id: "beastflow",
      name: "Transición Beast-Crab",
      family: "Animal Flow",
      level: "Principiante",
      what: "Pasar fluido de la posición de bestia a la de cangrejo y volver, sin pausas.",
      why: "Coordinación, rotación de columna y control en el suelo. La base de todo el flow.",
      steps: [
        {
          name: "Beast hold",
          how: "Cuadrupedia con rodillas a un centímetro del suelo. Sostén 20 segundos.",
          cue: "Espalda plana como una mesa.",
        },
        {
          name: "Crab hold",
          how: "Sentado, manos detrás, eleva la cadera. Sostén 20 segundos.",
          cue: "Dedos de las manos hacia los pies o hacia fuera, lo que respete tu hombro.",
        },
        {
          name: "Underswitch lento",
          how: "Desde beast, pasa una pierna por debajo y gira hasta crab. Para y vuelve.",
          cue: "La cadera no toca el suelo en ningún momento.",
        },
        {
          name: "Transición completa",
          how: "Encadena beast → crab → beast sin detenerte.",
          cue: "Respira en el punto medio.",
        },
        {
          name: "Flow continuo",
          how: "Encadena 10 transiciones alternando lados sin parar.",
          cue: "Busca silencio: si suenas, falta control.",
        },
      ],
      regression: "Si la cadera cae, haz la transición apoyando la rodilla y ve subiéndola.",
      mistake: "Ir rápido. En flow, lento es difícil; rápido es trampa.",
    },
  ],
  B2 = 15,
  w2 = 80,
  dy = 3;
function Td(e, a) {
  return ((e.skills && e.skills[a]) || { steps: [] }).steps || [];
}
function U2(e, a) {
  let l = El.find((o) => o.id === a),
    n = Td(e, a);
  return l && n.filter(Boolean).length >= l.steps.length;
}
function L2(e, a, l) {
  let n = M(e),
    o = [],
    s = El.find((v) => v.id === a);
  if (!s) return { state: n, notices: o };
  (n.skills || (n.skills = {}),
    n.care || (n.care = { today: { date: ue(), done: [] }, lifetime: 0 }),
    n.neuro || (n.neuro = Al()),
    n.unlockAll === void 0 && (n.unlockAll = !1),
    n.disabled || (n.disabled = []),
    n.seenUnlocks || (n.seenUnlocks = $e.filter((v) => yt(n, v.id)).map((v) => v.id)),
    n.skills[a] || (n.skills[a] = { steps: new Array(s.steps.length).fill(!1) }));
  let u = n.skills[a].steps;
  for (; u.length < s.steps.length;) u.push(!1);
  let c = u.filter(Boolean).length >= s.steps.length;
  if (((u[l] = !u[l]), u[l])) {
    let v = Math.round(B2 * Ka(n));
    ((n.progress.currentXP += v),
      (n.today.xpEarned = (n.today.xpEarned || 0) + v),
      o.push(`Paso dominado: ${s.steps[l].name}. +${v} XP.`),
      (n = Ea(n, o)));
  }
  if (u.filter(Boolean).length >= s.steps.length && !c) {
    let v = Math.round(w2 * Ka(n));
    ((n.progress.currentXP += v),
      (n.today.xpEarned = (n.today.xpEarned || 0) + v),
      (n.dominion.points += dy),
      o.push(`¡Skill aprendida: ${s.name}! +${v} XP y +${dy} Puntos de Dominio.`),
      (n = Ea(n, o)));
  }
  let p = da(n);
  return { state: p.state, notices: [...o, ...p.notices] };
}
function Wo(e) {
  return El.filter((a) => U2(e, a.id)).length;
}
var H2 = [
    "Dolor agudo, punzante o que aparece de golpe",
    "Dolor que te despierta por la noche",
    "Hinchazón, calor o deformidad visible en la articulación",
    "Pérdida de fuerza o de movilidad que no mejora",
    "Hormigueo, entumecimiento o dolor que baja por el brazo o la pierna",
    "Dolor tras una caída, golpe o torsión brusca",
    "Molestia que lleva más de 6 semanas sin mejorar",
  ],
  X2 =
    "Regla del dolor: una molestia leve (hasta 3 sobre 10) que no empeora al día siguiente es aceptable. Si sube de ahí, reduce el rango, la carga o el tiempo. El dolor no es la señal de que está funcionando.",
  Dy = [
    {
      id: "hombro",
      zone: "Hombro",
      common: "Tendinopatía del manguito rotador y dolor al elevar el brazo",
      context:
        "Suele aparecer por mucho empuje (flexiones, press) sin trabajo de rotadores ni escápula. El objetivo es dar carga progresiva al tendón y devolver control a la escápula.",
      exercises: [
        {
          name: "Isométrico de rotación externa",
          how: "Codo pegado al costado a 90°, empuja contra una pared o marco hacia fuera sin moverte.",
          dose: "5 × 30 s · 30 s de descanso",
          why: "Los isométricos suelen calmar el dolor del tendón y le dan carga sin movimiento.",
        },
        {
          name: "Rotación externa con banda",
          how: "Banda a la altura del codo, gira el antebrazo hacia fuera manteniendo el codo fijo al costado.",
          dose: "3 × 12 lento (3 s de vuelta)",
          why: "Fortalece infraespinoso y redondo menor, los que suelen quedarse atrás.",
        },
        {
          name: "Deslizamiento en pared (wall slide)",
          how: "Antebrazos en la pared, sube y baja manteniendo contacto, sin encoger los hombros.",
          dose: "3 × 10",
          why: "Reeduca el ritmo escápulo-humeral: la escápula debe rotar, no solo el brazo.",
        },
        {
          name: "Face pull o remo alto",
          how: "Con banda a la altura de la cara, tira separando las manos y juntando escápulas.",
          dose: "3 × 15",
          why: "Equilibra el exceso de empuje con trabajo de espalda alta.",
        },
      ],
    },
    {
      id: "codo",
      zone: "Codo",
      common: "Epicondilitis (codo de tenista) y epitrocleitis (codo de golfista)",
      context:
        "Muy común en dominadas, remos y trabajo de agarre. El tendón no está roto: está poco tolerante a la carga. Se trata cargándolo despacio, no reposando del todo.",
      exercises: [
        {
          name: "Isométrico de muñeca",
          how: "Antebrazo apoyado, sujeta un peso ligero y aguanta la muñeca en extensión sin moverla.",
          dose: "5 × 30 s",
          why: "Calma el dolor y prepara el tendón para la fase excéntrica.",
        },
        {
          name: "Excéntrico de extensores",
          how: "Sube la muñeca con la otra mano y baja sola en 4 segundos con peso ligero.",
          dose: "3 × 15 muy lento",
          why: "La fase excéntrica lenta es la que mejor remodela el tendón.",
        },
        {
          name: "Excéntrico de flexores",
          how: "Lo mismo pero con la palma hacia arriba, para el lado interno del codo.",
          dose: "3 × 15 muy lento",
          why: "Para el codo de golfista, cara interna.",
        },
        {
          name: "Agarre progresivo",
          how: "Aprieta una pelota blanda o toalla enrollada y mantén.",
          dose: "3 × 20 s",
          why: "Reconstruye tolerancia al agarre, que es lo que dispara el dolor.",
        },
      ],
    },
    {
      id: "muneca",
      zone: "Muñeca",
      common: "Dolor al apoyar peso (pino, bestia, flexiones)",
      context:
        "La muñeca no está preparada para cargar en extensión completa. Se gana con preparación específica, no evitándola.",
      exercises: [
        {
          name: "Movilidad en cuadrupedia",
          how: "Manos en el suelo, desplaza el peso adelante y atrás, luego círculos suaves.",
          dose: "2 min antes de entrenar",
          why: "Prepara el tejido antes de cargar.",
        },
        {
          name: "Apoyo en dorso de la mano",
          how: "En cuadrupedia, apoya el dorso de las manos y carga suavemente.",
          dose: "3 × 20 s",
          why: "Trabaja el rango contrario, que casi nadie entrena.",
        },
        {
          name: "Extensores de muñeca con banda",
          how: "Banda sobre el dorso de los dedos, ábrelos contra la resistencia.",
          dose: "3 × 15",
          why: "Equilibra la musculatura flexora dominante.",
        },
        {
          name: "Apoyo progresivo en puños",
          how: "Haz las flexiones o el beast hold sobre puños hasta ganar tolerancia.",
          dose: "Sustituye el apoyo habitual",
          why: "Permite seguir entrenando mientras la muñeca mejora.",
        },
      ],
    },
    {
      id: "lumbar",
      zone: "Lumbar",
      common: "Dolor lumbar inespecífico y rigidez al levantarte",
      context:
        "Casi siempre mejora con movimiento, no con reposo. La clave es rigidez del core en cargas y movilidad de cadera, para que la lumbar deje de compensar.",
      exercises: [
        {
          name: "Bird dog",
          how: "En cuadrupedia, extiende brazo y pierna opuestos sin que la cadera rote.",
          dose: "3 × 8 por lado, 3 s arriba",
          why: "Anti-rotación: enseña a la columna a quedarse quieta mientras te mueves.",
        },
        {
          name: "Plancha lateral",
          how: "De lado, apoya antebrazo y rodillas o pies, cadera elevada y alineada.",
          dose: "3 × 20-30 s por lado",
          why: "Refuerza el cuadrado lumbar y los oblicuos.",
        },
        {
          name: "Puente de glúteos",
          how: "Tumbado, eleva la cadera apretando glúteos sin arquear la lumbar.",
          dose: "3 × 15",
          why: "Si el glúteo no trabaja, la lumbar hace su trabajo.",
        },
        {
          name: "Gato-vaca y 90/90",
          how: "Movilidad suave de columna y rotación de cadera sentado.",
          dose: "2 min",
          why: "Devuelve movilidad a cadera y torácica para descargar la zona lumbar.",
        },
      ],
    },
    {
      id: "cadera",
      zone: "Cadera",
      common: "Pinzamiento, rigidez y dolor en la ingle al bajar en sentadilla",
      context:
        "Suele mezclarse falta de movilidad con poco control del glúteo. Trabaja ambos, no solo estirar.",
      exercises: [
        {
          name: "Rotaciones 90/90",
          how: "Sentado con ambas rodillas a 90°, gira de un lado al otro sin usar las manos.",
          dose: "3 × 8 por lado",
          why: "Gana rotación interna y externa, lo primero que se pierde.",
        },
        {
          name: "Estiramiento de flexores en zancada",
          how: "Rodilla trasera en el suelo, mete la pelvis y aprieta el glúteo del lado que estiras.",
          dose: "3 × 30 s por lado",
          why: "Estar sentado acorta el psoas y bascula la pelvis.",
        },
        {
          name: "Abducción tumbado de lado",
          how: "De lado, eleva la pierna de arriba con la punta ligeramente hacia abajo.",
          dose: "3 × 15 por lado",
          why: "Activa el glúteo medio, clave para la estabilidad de rodilla y cadera.",
        },
        {
          name: "Sentadilla profunda sostenida",
          how: "Baja a cuclillas completas y aguanta, usando los codos para abrir rodillas.",
          dose: "3 × 30 s",
          why: "Recupera el rango completo que la vida sedentaria elimina.",
        },
      ],
    },
    {
      id: "rodilla",
      zone: "Rodilla",
      common: "Tendinopatía rotuliana (rodilla del saltador) y dolor femoropatelar",
      context:
        "El tendón rotuliano responde muy bien a carga lenta y progresiva. Evitar sentadillas del todo suele empeorarlo a medio plazo.",
      exercises: [
        {
          name: "Sentadilla isométrica en pared",
          how: "Espalda en la pared, rodillas a 60-90°, aguanta.",
          dose: "5 × 45 s",
          why: "Reduce el dolor del tendón y mantiene la fuerza del cuádriceps.",
        },
        {
          name: "Sentadilla lenta a caja",
          how: "Baja en 4 segundos hasta sentarte y sube normal.",
          dose: "3 × 8",
          why: "Carga controlada y progresiva sobre el tendón.",
        },
        {
          name: "Extensión terminal (step-down)",
          how: "De pie en un escalón, baja lentamente el otro pie hasta rozar el suelo.",
          dose: "3 × 10 por pierna",
          why: "Trabaja el control excéntrico donde suele doler.",
        },
        {
          name: "Fortalecer glúteo e isquios",
          how: "Puente de glúteos y curl nórdico asistido o peso muerto a una pierna.",
          dose: "3 × 10",
          why: "Una cadena posterior débil sobrecarga la rodilla.",
        },
      ],
    },
    {
      id: "cuello",
      zone: "Cuello",
      common: "Rigidez cervical y tensión por postura y pantallas",
      context: "No es solo el cuello: suele venir de una torácica rígida y una escápula dormida.",
      exercises: [
        {
          name: "Retracción cervical (chin tuck)",
          how: "Sin mover la cabeza arriba o abajo, lleva el mentón hacia atrás haciendo doble papada.",
          dose: "3 × 10, 3 s cada una",
          why: "Activa los flexores profundos, que sostienen la cabeza.",
        },
        {
          name: "Extensión torácica sobre rodillo",
          how: "Rodillo o toalla enrollada bajo la espalda alta, abre el pecho sin arquear la lumbar.",
          dose: "2 min",
          why: "Si la torácica no extiende, el cuello lo compensa.",
        },
        {
          name: "Retracción escapular",
          how: "Junta las escápulas y bájalas, sin encoger los hombros.",
          dose: "3 × 12, 3 s",
          why: "Descarga los trapecios superiores, siempre sobrecargados.",
        },
        {
          name: "Movilidad cervical suave",
          how: "Rotaciones e inclinaciones lentas, sin llegar al dolor.",
          dose: "2 min",
          why: "Mantiene el rango sin provocar.",
        },
      ],
    },
    {
      id: "tobillo",
      zone: "Tobillo y Aquiles",
      common: "Tendinopatía de Aquiles y falta de dorsiflexión",
      context:
        "Poca movilidad de tobillo arruina sentadillas y pistols, y sobrecarga el Aquiles y la rodilla.",
      exercises: [
        {
          name: "Isométrico de gemelo",
          how: "De puntillas sobre ambos pies, aguanta arriba.",
          dose: "5 × 30 s",
          why: "Calma el tendón y mantiene la fuerza.",
        },
        {
          name: "Elevación de talón excéntrica",
          how: "Sube con dos pies, baja con uno en 4 segundos desde un escalón.",
          dose: "3 × 12 por pierna",
          why: "El protocolo excéntrico clásico para el Aquiles.",
        },
        {
          name: "Movilidad de dorsiflexión",
          how: "Rodilla hacia la pared con el talón clavado, busca tocar sin levantarlo.",
          dose: "3 × 10 por lado",
          why: "Gana el rango necesario para sentadilla profunda.",
        },
        {
          name: "Equilibrio a una pierna",
          how: "Aguanta sobre un pie, luego con los ojos cerrados.",
          dose: "3 × 30 s por lado",
          why: "Recupera la propiocepción tras cualquier esguince.",
        },
      ],
    },
  ],
  Ty = 20;
function Y2(e, a) {
  let l = M(e),
    n = [],
    o = ue();
  if (
    (l.care || (l.care = { today: { date: o, done: [] }, lifetime: 0 }),
    l.neuro || (l.neuro = Al()),
    l.unlockAll === void 0 && (l.unlockAll = !1),
    l.disabled || (l.disabled = []),
    l.seenUnlocks || (l.seenUnlocks = $e.filter((r) => yt(l, r.id)).map((r) => r.id)),
    l.care.today.date !== o && (l.care.today = { date: o, done: [] }),
    l.care.today.done.includes(a))
  )
    return { state: l, notices: ["Ya registraste este protocolo hoy."] };
  (l.care.today.done.push(a), (l.care.lifetime = (l.care.lifetime || 0) + 1));
  let s = Math.round(Ty * Ka(l));
  (l.streak.flexBuff && (s = Math.round(s * 1.1)),
    (l.progress.currentXP += s),
    (l.today.xpEarned = (l.today.xpEarned || 0) + s));
  let u = Dy.find((r) => r.id === a);
  (n.push(`Cuidado articular registrado: ${u ? u.zone : a}. +${s} XP.`), (l = Ea(l, n)));
  let c = da(l);
  return { state: c.state, notices: [...n, ...c.notices] };
}
var fy = [
    { label: "IZQUIERDA", action: "Desplázate un paso lateral a tu izquierda", color: "#4f9dff" },
    { label: "DERECHA", action: "Desplázate un paso lateral a tu derecha", color: "#3ecf8e" },
    { label: "ABAJO", action: "Bajá a posición de bestia y volvé", color: "#ffb84f" },
    { label: "SALTA", action: "Salto vertical con recepción suave", color: "#ff5c7a" },
    { label: "GIRA", action: "Media vuelta sobre vos mismo", color: "#b084f5" },
  ],
  my = [
    "Bestia",
    "Cangrejo",
    "Escorpión",
    "Underswitch",
    "Kickthrough",
    "Sentadilla",
    "Plancha",
    "Salto",
  ],
  md = ["Plancha frontal", "Sentadilla en pared", "Beast hold", "Plancha lateral", "Hollow hold"],
  pd = [
    "Cuenta hacia atrás de 7 en 7 desde 300, en voz alta",
    "Di nombres de animales sin repetir, uno por segundo",
    "Recita el alfabeto al revés",
    "Di los meses del año en orden inverso",
    "Nombra ciudades por cada letra del abecedario",
  ],
  bd = [
    "Mano derecha toca rodilla izquierda, luego mano izquierda toca rodilla derecha",
    "Codo derecho a rodilla izquierda, alternando, sin parar",
    "Mano derecha toca talón izquierdo por detrás, alternando",
    "Rodilla al pecho alternando + palmada por debajo del muslo",
  ],
  G2 = 15,
  Fs = [60, 72, 84, 96, 108, 120];
function Al() {
  return {
    bestSpeedLevel: 0,
    reactionDrills: 0,
    bestSequence: 0,
    bestDualSec: 0,
    bestBpm: 0,
    sessions: 0,
  };
}
function Ps(e, a, l, n) {
  let o = M(e),
    s = [];
  (o.neuro || (o.neuro = Al()),
    o.unlockAll === void 0 && (o.unlockAll = !1),
    o.disabled || (o.disabled = []),
    o.seenUnlocks || (o.seenUnlocks = $e.filter((p) => yt(o, p.id)).map((p) => p.id)));
  let u = !1;
  (a === "reaction"
    ? (l > (o.neuro.bestSpeedLevel || 0) && ((o.neuro.bestSpeedLevel = l), (u = !0)),
      (o.neuro.reactionDrills = (o.neuro.reactionDrills || 0) + 1))
    : a === "sequence"
      ? l > o.neuro.bestSequence && ((o.neuro.bestSequence = l), (u = !0))
      : a === "dual"
        ? l > o.neuro.bestDualSec && ((o.neuro.bestDualSec = l), (u = !0))
        : a === "coord" && l > o.neuro.bestBpm && ((o.neuro.bestBpm = l), (u = !0)),
    (o.neuro.sessions = (o.neuro.sessions || 0) + 1));
  let c = Math.round(G2 * Ka(o));
  ((o.progress.currentXP += c),
    (o.today.xpEarned = (o.today.xpEarned || 0) + c),
    s.push(u ? `¡Nueva marca personal! +${c} XP.` : `Sesión neuromotora registrada. +${c} XP.`),
    n && (o = Dl(o, "Neuromotor")),
    (o = Ea(o, s)));
  let r = da(o);
  return { state: r.state, notices: [...s, ...r.notices] };
}
var $e = [
  {
    id: "exploration",
    name: "Explorar",
    level: 3,
    rank: "E",
    why: "Tus pasos ahora cuentan. El mapa se ha abierto.",
    tab: "exploration",
  },
  {
    id: "achievements",
    name: "Logros",
    level: 1,
    rank: "E",
    why: "Desde ahora queda registrado todo lo que conseguís.",
    tab: "achievements",
  },
  {
    id: "animo",
    name: "Cómo llegás",
    level: 1,
    rank: "E",
    why: "Antes de entrenar te pregunta cómo llegás y, al terminar, cómo te vas.",
    tab: null,
  },
  {
    id: "care",
    name: "Articulaciones",
    level: 8,
    rank: "E",
    why: "Tu cuerpo ya acumula carga: toca aprender a cuidarlo.",
    tab: null,
  },
  {
    id: "missions",
    name: "Misiones",
    level: 10,
    rank: "E",
    why: "Aparecen objetivos según lo que estés descuidando.",
    tab: null,
  },
  {
    id: "primal",
    name: "Instinto Primal",
    level: 12,
    rank: "E",
    why: "Tu control motor es suficiente para despertar el instinto.",
    tab: "primal",
  },
  {
    id: "combat",
    name: "Combate",
    level: 15,
    rank: "E",
    why: "Tu cuerpo tiene zonas que todavía no responden. Ya podés ir a buscarlas.",
    tab: "combat",
  },
  {
    id: "dungeon",
    name: "Travesías",
    level: 20,
    rank: "E",
    why: "Tu cuerpo ya aguanta esfuerzos largos. Empiezan las travesías.",
    tab: null,
  },
  {
    id: "skills",
    name: "Skills",
    level: 25,
    rank: "E",
    why: "Tu base permite empezar a aprender movimientos raros.",
    tab: null,
  },
  {
    id: "neuro",
    name: "Neuromotor",
    level: 30,
    rank: "E",
    why: "Se abre el entrenamiento de reflejos y memoria motriz.",
    tab: null,
  },
];
function My(e, a) {
  return ve.indexOf(e) >= ve.indexOf(a);
}
function ye(e, a) {
  if (e.disabled && e.disabled.includes(a)) return !1;
  if (e.unlockAll) return !0;
  let l = $e.find((n) => n.id === a);
  return l ? e.progress.level >= l.level && My(e.progress.rank, l.rank) : !0;
}
function yt(e, a) {
  if (e.unlockAll) return !0;
  let l = $e.find((n) => n.id === a);
  return l ? e.progress.level >= l.level && My(e.progress.rank, l.rank) : !0;
}
function _y(e) {
  let a = M(e),
    l = [];
  a.seenUnlocks || (a.seenUnlocks = []);
  for (let n of $e)
    yt(a, n.id) &&
      !a.seenUnlocks.includes(n.id) &&
      (a.seenUnlocks.push(n.id), l.push(`Nuevo sistema desbloqueado: ${n.name}. ${n.why}`));
  return { state: a, notices: l };
}
var py = [
    "Rutina del Día",
    "Repeticiones",
    "Marcas personales",
    "Gimnasio",
    "Modalidades",
    "Combate",
    "Exploración",
    "Modo Primal",
    "Skills",
    "Neuromotor",
    "Persistencia",
    "Días que no querías",
  ],
  Z2 = ["E", "D", "C", "B", "A", "S", "Z"],
  sdcDific = {
    E: "FÁCIL",
    D: "ACCESIBLE",
    C: "EXIGENTE",
    B: "DIFÍCIL",
    A: "MUY DIFÍCIL",
    S: "PARA POCOS",
    Z: "EXCEPCIONAL",
  },
  Jo = [
    {
      id: "e_first",
      tier: "E",
      category: "Rutina del Día",
      name: "Primer Día",
      desc: "Completá tu primera rutina",
      check: (e) =>
        e.lifetimeReps.squat + e.lifetimeReps.pushup + e.lifetimeReps.back + e.lifetimeReps.abs > 0,
    },
    {
      id: "e_full",
      tier: "E",
      category: "Rutina del Día",
      name: "Cuatro Patrones",
      desc: "Completá los 4 patrones en un mismo día",
      check: (e) => (e.week.fullDays || 0) >= 1 || e.lastFullDate != null,
    },
    {
      id: "e_stretch",
      tier: "E",
      category: "Persistencia",
      name: "Primer Respiro",
      desc: "Completá tu primera rutina de estiramiento",
      check: (e) => (e.lifetimeStretch || 0) >= 1,
    },
    {
      id: "e_primal",
      tier: "E",
      category: "Modo Primal",
      name: "Instinto Despierto",
      desc: "Completá tu primera sesión Primal",
      check: (e) => (e.lifetimePrimal || 0) >= 1,
    },
    {
      id: "e_step",
      tier: "E",
      category: "Exploración",
      name: "Primera Expedición",
      desc: "Concluí tu primera expedición",
      check: (e) => (e.exploration.lifetimeKm || 0) > 0,
    },
    {
      id: "e_combat",
      tier: "E",
      category: "Combate",
      name: "Primer Contacto",
      desc: "Recuperá tu primer terreno",
      check: (e) => (e.combat.villainsDefeated || 0) >= 1,
    },
    {
      id: "d_streak3",
      tier: "D",
      category: "Persistencia",
      name: "Tres Días",
      desc: "Alcanzá una racha de 3 días",
      check: (e) => e.streak.current >= 3,
    },
    {
      id: "d_km5",
      tier: "D",
      category: "Exploración",
      name: "Cinco Kilómetros",
      desc: "Acumulá 5 km recorridos",
      check: (e) => (e.exploration.lifetimeKm || 0) >= 5,
    },
    {
      id: "d_place1",
      tier: "D",
      category: "Exploración",
      name: "Primer Sector",
      desc: "Descubrí tu primer lugar",
      check: (e) => e.exploration.unlockedIndex >= 0,
    },
    {
      id: "d_vol100",
      tier: "D",
      category: "Rutina del Día",
      name: "Cien Repeticiones",
      desc: "100 reps totales de por vida",
      check: (e) =>
        e.lifetimeReps.squat + e.lifetimeReps.pushup + e.lifetimeReps.back + e.lifetimeReps.abs >=
        100,
    },
    {
      id: "d_dungeon1",
      tier: "D",
      category: "Combate",
      name: "Primera Travesía",
      desc: "Completá tu primera travesía",
      check: (e) => (e.dungeonsCleared || 0) >= 1,
    },
    {
      id: "d_primal3",
      tier: "D",
      category: "Modo Primal",
      name: "Tres Patrones",
      desc: "Descubrí 3 movimientos Primal",
      check: (e) => e.primal.unlockedCount >= 3,
    },
    {
      id: "d_rank",
      tier: "C",
      category: "Rutina del Día",
      name: "Primer Umbral",
      desc: "Cruzá tu primer umbral",
      check: (e) => ve.indexOf(e.progress.rank) >= ve.indexOf("D"),
    },
    {
      id: "c_streak7",
      tier: "C",
      category: "Persistencia",
      name: "Semana de Hierro",
      desc: "Alcanzá una racha de 7 días",
      check: (e) => e.streak.current >= 7,
    },
    {
      id: "c_vol500",
      tier: "C",
      category: "Rutina del Día",
      name: "Quinientas",
      desc: "500 reps totales de por vida",
      check: (e) =>
        e.lifetimeReps.squat + e.lifetimeReps.pushup + e.lifetimeReps.back + e.lifetimeReps.abs >=
        500,
    },
    {
      id: "c_squat250",
      tier: "C",
      category: "Rutina del Día",
      name: "Base de Piernas",
      desc: "250 reps de piernas",
      check: (e) => e.lifetimeReps.squat >= 250,
    },
    {
      id: "c_push150",
      tier: "C",
      category: "Rutina del Día",
      name: "Base de Empuje",
      desc: "150 reps de empuje",
      check: (e) => e.lifetimeReps.pushup >= 150,
    },
    {
      id: "c_combat5",
      tier: "C",
      category: "Combate",
      name: "Terreno Ganado",
      desc: "Recuperá 3 terrenos",
      check: (e) => (e.combat.villainsDefeated || 0) >= 3,
    },
    {
      id: "c_boss1",
      tier: "C",
      category: "Combate",
      name: "Primer Bloqueo Roto",
      desc: "Superá tu primer Jefe",
      check: (e) => (e.combat.villainsDefeated || 0) >= 5,
    },
    {
      id: "c_km20",
      tier: "C",
      category: "Exploración",
      name: "Piernas Hechas",
      desc: "Acumulá 20 km recorridos",
      check: (e) => (e.exploration.lifetimeKm || 0) >= 20,
    },
    {
      id: "c_primal6",
      tier: "C",
      category: "Modo Primal",
      name: "Repertorio Motriz",
      desc: "Descubrí 6 movimientos Primal",
      check: (e) => e.primal.unlockedCount >= 6,
    },
    {
      id: "c_stretch10",
      tier: "C",
      category: "Persistencia",
      name: "Tejido Flexible",
      desc: "10 rutinas de estiramiento",
      check: (e) => (e.lifetimeStretch || 0) >= 10,
    },
    {
      id: "c_rank",
      tier: "B",
      category: "Rutina del Día",
      name: "Segundo Umbral",
      desc: "Cruzá tu segundo umbral",
      check: (e) => ve.indexOf(e.progress.rank) >= ve.indexOf("C"),
    },
    {
      id: "b_streak14",
      tier: "B",
      category: "Persistencia",
      name: "Catorce Sin Fallar",
      desc: "Alcanzá una racha de 14 días",
      check: (e) => e.streak.current >= 14,
    },
    {
      id: "b_vol1500",
      tier: "B",
      category: "Rutina del Día",
      name: "Mil Quinientas",
      desc: "1500 reps totales de por vida",
      check: (e) =>
        e.lifetimeReps.squat + e.lifetimeReps.pushup + e.lifetimeReps.back + e.lifetimeReps.abs >=
        1500,
    },
    {
      id: "b_back500",
      tier: "B",
      category: "Rutina del Día",
      name: "Espalda de Roble",
      desc: "500 reps de tracción",
      check: (e) => e.lifetimeReps.back >= 500,
    },
    {
      id: "b_abs750",
      tier: "B",
      category: "Rutina del Día",
      name: "Núcleo Firme",
      desc: "750 reps de core",
      check: (e) => e.lifetimeReps.abs >= 750,
    },
    {
      id: "b_combat15",
      tier: "B",
      category: "Combate",
      name: "Terreno Firme",
      desc: "Recuperá 15 terrenos",
      check: (e) => (e.combat.villainsDefeated || 0) >= 15,
    },
    {
      id: "b_dungeon10",
      tier: "B",
      category: "Combate",
      name: "Fondo",
      desc: "Completá 10 travesías",
      check: (e) => (e.dungeonsCleared || 0) >= 10,
    },
    {
      id: "b_km50",
      tier: "B",
      category: "Exploración",
      name: "Kilometrero",
      desc: "Acumulá 50 km recorridos",
      check: (e) => (e.exploration.lifetimeKm || 0) >= 50,
    },
    {
      id: "b_place6",
      tier: "B",
      category: "Exploración",
      name: "Medio Mapa",
      desc: "Descubrí 6 sectores",
      check: (e) => e.exploration.unlockedIndex >= 5,
    },
    {
      id: "b_primal12",
      tier: "B",
      category: "Modo Primal",
      name: "Flujo Intermedio",
      desc: "Descubrí 12 movimientos Primal",
      check: (e) => e.primal.unlockedCount >= 12,
    },
    {
      id: "b_primal50",
      tier: "B",
      category: "Modo Primal",
      name: "Cincuenta Sesiones",
      desc: "50 sesiones Primal completadas",
      check: (e) => (e.lifetimePrimal || 0) >= 50,
    },
    {
      id: "b_rank",
      tier: "A",
      category: "Rutina del Día",
      name: "Tercer Umbral",
      desc: "Cruzá tu tercer umbral",
      check: (e) => ve.indexOf(e.progress.rank) >= ve.indexOf("B"),
    },
    {
      id: "a_wstreak4",
      tier: "B",
      category: "Persistencia",
      name: "Mes Cumplido",
      desc: "4 semanas seguidas alcanzando tu meta",
      check: (e) => (e.weeklyStreak || 0) >= 4,
    },
    {
      id: "a_vol5000",
      tier: "A",
      category: "Rutina del Día",
      name: "Cinco Mil",
      desc: "5000 reps totales de por vida",
      check: (e) =>
        e.lifetimeReps.squat + e.lifetimeReps.pushup + e.lifetimeReps.back + e.lifetimeReps.abs >=
        5e3,
    },
    {
      id: "a_squat2000",
      tier: "A",
      category: "Rutina del Día",
      name: "Piernas de Acero",
      desc: "2000 reps de piernas",
      check: (e) => e.lifetimeReps.squat >= 2e3,
    },
    {
      id: "a_push1500",
      tier: "A",
      category: "Rutina del Día",
      name: "Empuje de Titán",
      desc: "1500 reps de empuje",
      check: (e) => e.lifetimeReps.pushup >= 1500,
    },
    {
      id: "a_unilateral",
      tier: "S",
      category: "Rutina del Día",
      name: "Dominio Unilateral",
      desc: "Llegá al quinto rango",
      check: (e) => ve.indexOf(e.progress.rank) >= ve.indexOf("A"),
    },
    {
      id: "a_combat40",
      tier: "A",
      category: "Combate",
      name: "Territorio Propio",
      desc: "Recuperá 40 terrenos",
      check: (e) => (e.combat.villainsDefeated || 0) >= 40,
    },
    {
      id: "a_dungeon30",
      tier: "A",
      category: "Combate",
      name: "Aguante",
      desc: "Completá 30 travesías",
      check: (e) => (e.dungeonsCleared || 0) >= 30,
    },
    {
      id: "a_km100",
      tier: "A",
      category: "Exploración",
      name: "Fondista",
      desc: "Acumulá 100 km recorridos",
      check: (e) => (e.exploration.lifetimeKm || 0) >= 100,
    },
    {
      id: "a_primal18",
      tier: "A",
      category: "Modo Primal",
      name: "Flujo Avanzado",
      desc: "Descubrí 18 movimientos Primal",
      check: (e) => e.primal.unlockedCount >= 18,
    },
    {
      id: "a_attr10",
      tier: "A",
      category: "Persistencia",
      name: "Atributo Consolidado",
      desc: "Llevá un atributo a Nivel 10",
      check: (e) => Io.some((a) => Ro(tu(e, a)) >= 10),
    },
    {
      id: "s_wstreak12",
      tier: "A",
      category: "Persistencia",
      name: "Trimestre de Hierro",
      desc: "12 semanas seguidas alcanzando tu meta",
      check: (e) => (e.weeklyStreak || 0) >= 12,
    },
    {
      id: "s_vol15000",
      tier: "S",
      category: "Rutina del Día",
      name: "Quince Mil",
      desc: "15000 reps totales de por vida",
      check: (e) =>
        e.lifetimeReps.squat + e.lifetimeReps.pushup + e.lifetimeReps.back + e.lifetimeReps.abs >=
        15e3,
    },
    {
      id: "s_rank",
      tier: "S",
      category: "Rutina del Día",
      name: "Élite Confirmada",
      desc: "Llegá al sexto rango",
      check: (e) => ve.indexOf(e.progress.rank) >= ve.indexOf("S"),
    },
    {
      id: "s_combat100",
      tier: "S",
      category: "Combate",
      name: "Centenar Recuperado",
      desc: "Recuperá 100 terrenos",
      check: (e) => (e.combat.villainsDefeated || 0) >= 100,
    },
    {
      id: "s_dungeon75",
      tier: "S",
      category: "Combate",
      name: "Segundo Viento",
      desc: "Completá 75 travesías",
      check: (e) => (e.dungeonsCleared || 0) >= 75,
    },
    {
      id: "s_place_all",
      tier: "S",
      category: "Exploración",
      name: "Fin del Mapa",
      desc: "Descubrí todos los sectores conocidos",
      check: (e) => e.exploration.unlockedIndex >= pt.length - 1,
    },
    {
      id: "s_km200",
      tier: "S",
      category: "Exploración",
      name: "Paso Largo",
      desc: "Acumulá 200 km recorridos",
      check: (e) => (e.exploration.lifetimeKm || 0) >= 200,
    },
    {
      id: "s_primal_all",
      tier: "S",
      category: "Modo Primal",
      name: "Maestro Ancestral",
      desc: "Descubrí todos los movimientos Primal",
      check: (e) => e.primal.unlockedCount >= Oa.length,
    },
    {
      id: "s_primal200",
      tier: "S",
      category: "Modo Primal",
      name: "Doscientas Sesiones",
      desc: "200 sesiones Primal completadas",
      check: (e) => (e.lifetimePrimal || 0) >= 200,
    },
    {
      id: "s_attr20",
      tier: "S",
      category: "Persistencia",
      name: "Atributo Élite",
      desc: "Llevá un atributo a Nivel 20",
      check: (e) => Io.some((a) => Ro(tu(e, a)) >= 20),
    },
    {
      id: "z_rank",
      tier: "Z",
      category: "Rutina del Día",
      name: "Trascendencia",
      desc: "Llegá al último rango",
      check: (e) => ve.indexOf(e.progress.rank) >= ve.indexOf("Z"),
    },
    {
      id: "z_pr_squat",
      tier: "C",
      category: "Rutina del Día",
      name: "PR de Piernas",
      desc: "Récord personal de 60+ reps de piernas en una sesión",
      check: (e) => e.records && e.records.squat >= 60,
    },
    {
      id: "z_pr_push",
      tier: "C",
      category: "Rutina del Día",
      name: "PR de Empuje",
      desc: "Récord personal de 40+ reps de empuje en una sesión",
      check: (e) => e.records && e.records.pushup >= 40,
    },
    {
      id: "z_pr_back",
      tier: "B",
      category: "Rutina del Día",
      name: "PR de Tracción",
      desc: "Récord personal de 30+ reps de tracción en una sesión",
      check: (e) => e.records && e.records.back >= 30,
    },
    {
      id: "z_pr_abs",
      tier: "C",
      category: "Rutina del Día",
      name: "PR de Core",
      desc: "Récord personal de 60+ reps de core en una sesión",
      check: (e) => e.records && e.records.abs >= 60,
    },
    {
      id: "z_wstreak26",
      tier: "S",
      category: "Persistencia",
      name: "Medio Año Intacto",
      desc: "26 semanas seguidas alcanzando tu meta",
      check: (e) => (e.weeklyStreak || 0) >= 26,
    },
    {
      id: "z_wstreak52",
      tier: "Z",
      category: "Persistencia",
      name: "Constancia Absoluta",
      desc: "Un año entero alcanzando tu meta semanal",
      check: (e) => (e.weeklyStreak || 0) >= 52,
    },
    {
      id: "z_combat250",
      tier: "Z",
      category: "Combate",
      name: "Nada Sin Relevar",
      desc: "Recuperá 250 terrenos",
      check: (e) => (e.combat.villainsDefeated || 0) >= 250,
    },
    {
      id: "z_attr30",
      tier: "Z",
      category: "Persistencia",
      name: "Atributo Trascendente",
      desc: "Llevá un atributo a Nivel 30",
      check: (e) => Io.some((a) => Ro(tu(e, a)) >= 30),
    },
    {
      id: "z_hybrid",
      tier: "B",
      category: "Rutina del Día",
      name: "Atleta Híbrido",
      desc: "Entrená con los tres métodos el mismo día",
      check: (e) => ((e.today && e.today.doneModalities) || []).length >= 3,
    },
    {
      id: "neuro_1",
      tier: "E",
      category: "Neuromotor",
      name: "Primer Reflejo",
      desc: "Completá tu primera sesión neuromotora",
      check: (e) => ((e.neuro && e.neuro.sessions) || 0) >= 1,
    },
    {
      id: "neuro_react",
      tier: "C",
      category: "Neuromotor",
      name: "Reacción Afilada",
      desc: "Completá un drill de reacción a ritmo Rápido",
      check: (e) => ((e.neuro && e.neuro.bestSpeedLevel) || 0) >= 3,
    },
    {
      id: "neuro_seq6",
      tier: "B",
      category: "Neuromotor",
      name: "Memoria Motriz",
      desc: "Recordá una secuencia de 6 movimientos",
      check: (e) => ((e.neuro && e.neuro.bestSequence) || 0) >= 6,
    },
    {
      id: "neuro_dual120",
      tier: "B",
      category: "Neuromotor",
      name: "Mente y Cuerpo",
      desc: "2 minutos de doble tarea sin romper",
      check: (e) => ((e.neuro && e.neuro.bestDualSec) || 0) >= 120,
    },
    {
      id: "neuro_seq9",
      tier: "A",
      category: "Neuromotor",
      name: "Cadena Larga",
      desc: "Recordá una secuencia de 9 movimientos",
      check: (e) => ((e.neuro && e.neuro.bestSequence) || 0) >= 9,
    },
    {
      id: "neuro_bpm",
      tier: "S",
      category: "Neuromotor",
      name: "Ritmo Cruzado",
      desc: "Coordinación contralateral a 120 bpm",
      check: (e) => ((e.neuro && e.neuro.bestBpm) || 0) >= 120,
    },
    {
      id: "neuro_50",
      tier: "A",
      category: "Neuromotor",
      name: "Sistema Nervioso Entrenado",
      desc: "50 sesiones neuromotoras",
      check: (e) => ((e.neuro && e.neuro.sessions) || 0) >= 50,
    },
    {
      id: "care_1",
      tier: "E",
      category: "Persistencia",
      name: "Mantenimiento",
      desc: "Completá tu primer protocolo articular",
      check: (e) => ((e.care && e.care.lifetime) || 0) >= 1,
    },
    {
      id: "care_20",
      tier: "C",
      category: "Persistencia",
      name: "Articulaciones Sanas",
      desc: "20 protocolos articulares completados",
      check: (e) => ((e.care && e.care.lifetime) || 0) >= 20,
    },
    {
      id: "care_100",
      tier: "A",
      category: "Persistencia",
      name: "Cuerpo a Prueba",
      desc: "100 protocolos articulares completados",
      check: (e) => ((e.care && e.care.lifetime) || 0) >= 100,
    },
    {
      id: "skill_step1",
      tier: "E",
      category: "Skills",
      name: "Primer Paso Técnico",
      desc: "Dominá el primer paso de cualquier skill",
      check: (e) => El.some((a) => Td(e, a.id).some(Boolean)),
    },
    {
      id: "skill_1",
      tier: "C",
      category: "Skills",
      name: "Movimiento Raro",
      desc: "Aprendé tu primera skill completa",
      check: (e) => Wo(e) >= 1,
    },
    {
      id: "skill_3",
      tier: "B",
      category: "Skills",
      name: "Repertorio Extraño",
      desc: "Aprendé 3 skills completas",
      check: (e) => Wo(e) >= 3,
    },
    {
      id: "skill_6",
      tier: "A",
      category: "Skills",
      name: "Coleccionista de Movimiento",
      desc: "Aprendé 6 skills completas",
      check: (e) => Wo(e) >= 6,
    },
    {
      id: "skill_all",
      tier: "Z",
      category: "Skills",
      name: "Maestro del Movimiento",
      desc: "Aprendé todas las skills",
      check: (e) => Wo(e) >= El.length,
    },
    {
      id: "gym_10k",
      tier: "C",
      category: "Gimnasio",
      name: "Diez Toneladas",
      desc: "10.000 kg sumando todas tus series",
      check: (e) => (e.lifetimeVolumeKg || 0) >= 1e4,
    },
    {
      id: "gym_100k",
      tier: "B",
      category: "Gimnasio",
      name: "Cincuenta Toneladas",
      desc: "50.000 kg sumando todas tus series",
      check: (e) => (e.lifetimeVolumeKg || 0) >= 5e4,
    },
    {
      id: "gym_bw1",
      tier: "B",
      category: "Gimnasio",
      name: "Tu Propio Peso",
      desc: "Levantá tu peso corporal en un ejercicio",
      check: (e) =>
        e.profile.bodyWeight > 0 &&
        Math.max(...Object.values(e.bestLiftKg || { 0: 0 })) >= e.profile.bodyWeight,
    },
    {
      id: "gym_bw15",
      tier: "A",
      category: "Gimnasio",
      name: "Uno y Medio",
      desc: "Levantá 1,5× tu peso corporal",
      check: (e) =>
        e.profile.bodyWeight > 0 &&
        Math.max(...Object.values(e.bestLiftKg || { 0: 0 })) >= e.profile.bodyWeight * 1.5,
    },
    {
      id: "gym_bw2",
      tier: "S",
      category: "Gimnasio",
      name: "Doble Cuerpo",
      desc: "Levantá 2× tu peso corporal",
      check: (e) =>
        e.profile.bodyWeight > 0 &&
        Math.max(...Object.values(e.bestLiftKg || { 0: 0 })) >= e.profile.bodyWeight * 2,
    },
    {
      id: "resilience_3",
      tier: "D",
      category: "Persistencia",
      name: "El Regreso",
      desc: "Volvé a entrenar tras fallar 3+ días seguidos",
      check: (e) => e.maxComebackStreak >= 3,
    },
    {
      id: "resilience_7",
      tier: "C",
      category: "Persistencia",
      name: "Fénix",
      desc: "Volvé a entrenar tras fallar 7+ días seguidos",
      check: (e) => e.maxComebackStreak >= 7,
    },
    {
      id: "rep_squat_100",
      tier: "E",
      category: "Repeticiones",
      name: "Cimiento",
      desc: "100 reps de piernas de por vida",
      check: (e) => e.lifetimeReps.squat >= 100,
    },
    {
      id: "rep_squat_500",
      tier: "D",
      category: "Repeticiones",
      name: "Pilar",
      desc: "500 reps de piernas de por vida",
      check: (e) => e.lifetimeReps.squat >= 500,
    },
    {
      id: "rep_squat_1000",
      tier: "D",
      category: "Repeticiones",
      name: "Columna",
      desc: "1000 reps de piernas de por vida",
      check: (e) => e.lifetimeReps.squat >= 1000,
    },
    {
      id: "rep_squat_2500",
      tier: "C",
      category: "Repeticiones",
      name: "Titán de Piernas",
      desc: "2500 reps de piernas de por vida",
      check: (e) => e.lifetimeReps.squat >= 2500,
    },
    {
      id: "rep_squat_5000",
      tier: "B",
      category: "Repeticiones",
      name: "Montaña",
      desc: "5000 reps de piernas de por vida",
      check: (e) => e.lifetimeReps.squat >= 5000,
    },
    {
      id: "rep_squat_10000",
      tier: "A",
      category: "Repeticiones",
      name: "Coloso",
      desc: "10000 reps de piernas de por vida",
      check: (e) => e.lifetimeReps.squat >= 10000,
    },
    {
      id: "rep_squat_25000",
      tier: "S",
      category: "Repeticiones",
      name: "Atlas",
      desc: "25000 reps de piernas de por vida",
      check: (e) => e.lifetimeReps.squat >= 25000,
    },
    {
      id: "rep_pushup_100",
      tier: "E",
      category: "Repeticiones",
      name: "Primer Empuje",
      desc: "100 reps de empuje de por vida",
      check: (e) => e.lifetimeReps.pushup >= 100,
    },
    {
      id: "rep_pushup_250",
      tier: "E",
      category: "Repeticiones",
      name: "Muro",
      desc: "250 reps de empuje de por vida",
      check: (e) => e.lifetimeReps.pushup >= 250,
    },
    {
      id: "rep_pushup_500",
      tier: "D",
      category: "Repeticiones",
      name: "Ariete",
      desc: "500 reps de empuje de por vida",
      check: (e) => e.lifetimeReps.pushup >= 500,
    },
    {
      id: "rep_pushup_1000",
      tier: "D",
      category: "Repeticiones",
      name: "Yunque",
      desc: "1000 reps de empuje de por vida",
      check: (e) => e.lifetimeReps.pushup >= 1000,
    },
    {
      id: "rep_pushup_2500",
      tier: "C",
      category: "Repeticiones",
      name: "Martillo",
      desc: "2500 reps de empuje de por vida",
      check: (e) => e.lifetimeReps.pushup >= 2500,
    },
    {
      id: "rep_pushup_5000",
      tier: "B",
      category: "Repeticiones",
      name: "Fuerza Bruta",
      desc: "5000 reps de empuje de por vida",
      check: (e) => e.lifetimeReps.pushup >= 5000,
    },
    {
      id: "rep_pushup_10000",
      tier: "A",
      category: "Repeticiones",
      name: "Prensa",
      desc: "10000 reps de empuje de por vida",
      check: (e) => e.lifetimeReps.pushup >= 10000,
    },
    {
      id: "rep_pushup_25000",
      tier: "S",
      category: "Repeticiones",
      name: "Titán de Empuje",
      desc: "25000 reps de empuje de por vida",
      check: (e) => e.lifetimeReps.pushup >= 25000,
    },
    {
      id: "rep_back_100",
      tier: "D",
      category: "Repeticiones",
      name: "Primer Tirón",
      desc: "100 reps de tracción de por vida",
      check: (e) => e.lifetimeReps.back >= 100,
    },
    {
      id: "rep_back_250",
      tier: "D",
      category: "Repeticiones",
      name: "Garra",
      desc: "250 reps de tracción de por vida",
      check: (e) => e.lifetimeReps.back >= 250,
    },
    {
      id: "rep_back_1000",
      tier: "C",
      category: "Repeticiones",
      name: "Cadena",
      desc: "1000 reps de tracción de por vida",
      check: (e) => e.lifetimeReps.back >= 1000,
    },
    {
      id: "rep_back_2500",
      tier: "B",
      category: "Repeticiones",
      name: "Ancla",
      desc: "2500 reps de tracción de por vida",
      check: (e) => e.lifetimeReps.back >= 2500,
    },
    {
      id: "rep_back_5000",
      tier: "A",
      category: "Repeticiones",
      name: "Polea",
      desc: "5000 reps de tracción de por vida",
      check: (e) => e.lifetimeReps.back >= 5000,
    },
    {
      id: "rep_back_10000",
      tier: "S",
      category: "Repeticiones",
      name: "Grúa",
      desc: "10000 reps de tracción de por vida",
      check: (e) => e.lifetimeReps.back >= 10000,
    },
    {
      id: "rep_back_25000",
      tier: "Z",
      category: "Repeticiones",
      name: "Torre",
      desc: "25000 reps de tracción de por vida",
      check: (e) => e.lifetimeReps.back >= 25000,
    },
    {
      id: "rep_abs_100",
      tier: "E",
      category: "Repeticiones",
      name: "Núcleo Vivo",
      desc: "100 reps de core de por vida",
      check: (e) => e.lifetimeReps.abs >= 100,
    },
    {
      id: "rep_abs_250",
      tier: "E",
      category: "Repeticiones",
      name: "Coraza",
      desc: "250 reps de core de por vida",
      check: (e) => e.lifetimeReps.abs >= 250,
    },
    {
      id: "rep_abs_500",
      tier: "D",
      category: "Repeticiones",
      name: "Blindaje",
      desc: "500 reps de core de por vida",
      check: (e) => e.lifetimeReps.abs >= 500,
    },
    {
      id: "rep_abs_1000",
      tier: "D",
      category: "Repeticiones",
      name: "Fortaleza",
      desc: "1000 reps de core de por vida",
      check: (e) => e.lifetimeReps.abs >= 1000,
    },
    {
      id: "rep_abs_2500",
      tier: "C",
      category: "Repeticiones",
      name: "Acero Central",
      desc: "2500 reps de core de por vida",
      check: (e) => e.lifetimeReps.abs >= 2500,
    },
    {
      id: "rep_abs_5000",
      tier: "B",
      category: "Repeticiones",
      name: "Bastión",
      desc: "5000 reps de core de por vida",
      check: (e) => e.lifetimeReps.abs >= 5000,
    },
    {
      id: "rep_abs_10000",
      tier: "A",
      category: "Repeticiones",
      name: "Fuste",
      desc: "10000 reps de core de por vida",
      check: (e) => e.lifetimeReps.abs >= 10000,
    },
    {
      id: "rep_abs_25000",
      tier: "S",
      category: "Repeticiones",
      name: "Eje",
      desc: "25000 reps de core de por vida",
      check: (e) => e.lifetimeReps.abs >= 25000,
    },
    {
      id: "pr_squat_25",
      tier: "E",
      category: "Marcas personales",
      name: "Piernas de Hierro",
      desc: "25 reps de piernas en una sola sesión",
      check: (e) => e.records && e.records.squat >= 25,
    },
    {
      id: "pr_squat_40",
      tier: "D",
      category: "Marcas personales",
      name: "Piernas Indomables",
      desc: "40 reps de piernas en una sola sesión",
      check: (e) => e.records && e.records.squat >= 40,
    },
    {
      id: "pr_pushup_15",
      tier: "E",
      category: "Marcas personales",
      name: "Empuje Firme",
      desc: "15 reps de empuje en una sola sesión",
      check: (e) => e.records && e.records.pushup >= 15,
    },
    {
      id: "pr_pushup_25",
      tier: "D",
      category: "Marcas personales",
      name: "Empuje Imparable",
      desc: "25 reps de empuje en una sola sesión",
      check: (e) => e.records && e.records.pushup >= 25,
    },
    {
      id: "pr_back_8",
      tier: "E",
      category: "Marcas personales",
      name: "Tracción Real",
      desc: "8 reps de tracción en una sola sesión",
      check: (e) => e.records && e.records.back >= 8,
    },
    {
      id: "pr_back_18",
      tier: "D",
      category: "Marcas personales",
      name: "Espalda de Acero",
      desc: "18 reps de tracción en una sola sesión",
      check: (e) => e.records && e.records.back >= 18,
    },
    {
      id: "pr_abs_25",
      tier: "E",
      category: "Marcas personales",
      name: "Core Encendido",
      desc: "25 reps de core en una sola sesión",
      check: (e) => e.records && e.records.abs >= 25,
    },
    {
      id: "pr_abs_40",
      tier: "D",
      category: "Marcas personales",
      name: "Core Inquebrantable",
      desc: "40 reps de core en una sola sesión",
      check: (e) => e.records && e.records.abs >= 40,
    },
    {
      id: "gymv_500",
      tier: "E",
      category: "Gimnasio",
      name: "Primeros Kilos",
      desc: "500 kg sumando todas tus series",
      check: (e) => (e.lifetimeVolumeKg || 0) >= 500,
    },
    {
      id: "gymv_2500",
      tier: "D",
      category: "Gimnasio",
      name: "Carga Ligera",
      desc: "2.500 kg sumando todas tus series",
      check: (e) => (e.lifetimeVolumeKg || 0) >= 2500,
    },
    {
      id: "gymv_250000",
      tier: "A",
      category: "Gimnasio",
      name: "Ciento Cincuenta Toneladas",
      desc: "150.000 kg sumando todas tus series",
      check: (e) => (e.lifetimeVolumeKg || 0) >= 15e4,
    },
    {
      id: "gymk_20",
      tier: "E",
      category: "Gimnasio",
      name: "Primera Barra",
      desc: "Levantá 20 kg en cualquier ejercicio",
      check: (e) => Math.max(0, ...Object.values(e.bestLiftKg || {})) >= 20,
    },
    {
      id: "gymk_40",
      tier: "D",
      category: "Gimnasio",
      name: "Carga Real",
      desc: "Levantá 40 kg en cualquier ejercicio",
      check: (e) => Math.max(0, ...Object.values(e.bestLiftKg || {})) >= 40,
    },
    {
      id: "gymk_60",
      tier: "C",
      category: "Gimnasio",
      name: "Peso Serio",
      desc: "Levantá 60 kg en cualquier ejercicio",
      check: (e) => Math.max(0, ...Object.values(e.bestLiftKg || {})) >= 60,
    },
    {
      id: "gymk_100",
      tier: "B",
      category: "Gimnasio",
      name: "Tres Dígitos",
      desc: "Levantá 100 kg en cualquier ejercicio",
      check: (e) => Math.max(0, ...Object.values(e.bestLiftKg || {})) >= 100,
    },
    {
      id: "mod_bodyweight_10",
      tier: "E",
      category: "Modalidades",
      name: "Constante en el Cuerpo",
      desc: "10 sesiones de peso corporal",
      check: (e) => ((e.lifetimeModalities || {}).bodyweight || 0) >= 10,
    },
    {
      id: "mod_bodyweight_50",
      tier: "C",
      category: "Modalidades",
      name: "Cincuenta a Pulso",
      desc: "50 sesiones de peso corporal",
      check: (e) => ((e.lifetimeModalities || {}).bodyweight || 0) >= 50,
    },
    {
      id: "mod_bodyweight_200",
      tier: "A",
      category: "Modalidades",
      name: "Doscientas sin Hierro",
      desc: "200 sesiones de peso corporal",
      check: (e) => ((e.lifetimeModalities || {}).bodyweight || 0) >= 200,
    },
    {
      id: "mod_gym_10",
      tier: "E",
      category: "Modalidades",
      name: "Primer Ciclo de Hierro",
      desc: "10 sesiones de gimnasio",
      check: (e) => ((e.lifetimeModalities || {}).gym || 0) >= 10,
    },
    {
      id: "mod_gym_50",
      tier: "C",
      category: "Modalidades",
      name: "Cincuenta bajo la Barra",
      desc: "50 sesiones de gimnasio",
      check: (e) => ((e.lifetimeModalities || {}).gym || 0) >= 50,
    },
    {
      id: "mod_gym_200",
      tier: "A",
      category: "Modalidades",
      name: "Doscientas de Hierro",
      desc: "200 sesiones de gimnasio",
      check: (e) => ((e.lifetimeModalities || {}).gym || 0) >= 200,
    },
    {
      id: "mod_flow_10",
      tier: "E",
      category: "Modalidades",
      name: "Primeros Flujos",
      desc: "10 sesiones de flow",
      check: (e) => ((e.lifetimeModalities || {}).flow || 0) >= 10,
    },
    {
      id: "mod_flow_50",
      tier: "C",
      category: "Modalidades",
      name: "Cincuenta Fluidas",
      desc: "50 sesiones de flow",
      check: (e) => ((e.lifetimeModalities || {}).flow || 0) >= 50,
    },
    {
      id: "mod_flow_200",
      tier: "A",
      category: "Modalidades",
      name: "Doscientas en Movimiento",
      desc: "200 sesiones de flow",
      check: (e) => ((e.lifetimeModalities || {}).flow || 0) >= 200,
    },
    {
      id: "animo_vino",
      tier: "D",
      category: "Días que no querías",
      name: "Viniste igual",
      desc: "Entrená un día que llegaste sin ganas o con pocas ganas",
      check: (e) => sdcAnimoCuenta(e).vino >= 1,
    },
    {
      id: "animo_envion",
      tier: "D",
      category: "Días que no querías",
      name: "El envión",
      desc: "Llegá sin ganas o con pocas ganas y terminá con ganas o a full",
      check: (e) => sdcAnimoCuenta(e).envion >= 1,
    },
    {
      id: "animo_vino5",
      tier: "C",
      category: "Días que no querías",
      name: "Cinco días que no querías",
      desc: "Entrená 5 días que llegaste sin ganas o con pocas ganas",
      check: (e) => sdcAnimoCuenta(e).vino >= 5,
    },
    {
      id: "animo_mejor10",
      tier: "C",
      category: "Días que no querías",
      name: "Te cambió el día",
      desc: "Terminá mejor de lo que llegaste 10 veces",
      check: (e) => sdcAnimoCuenta(e).mejor >= 10,
    },
    {
      id: "animo_vino20",
      tier: "B",
      category: "Días que no querías",
      name: "Veinte días que no querías",
      desc: "Entrená 20 días que llegaste sin ganas o con pocas ganas",
      check: (e) => sdcAnimoCuenta(e).vino >= 20,
    },
    {
      id: "animo_mejor50",
      tier: "B",
      category: "Días que no querías",
      name: "Entrenar te cambia el día",
      desc: "Terminá mejor de lo que llegaste 50 veces",
      check: (e) => sdcAnimoCuenta(e).mejor >= 50,
    },
    {
      id: "animo_vino50",
      tier: "A",
      category: "Días que no querías",
      name: "Cincuenta días que no querías",
      desc: "Entrená 50 días que llegaste sin ganas o con pocas ganas",
      check: (e) => sdcAnimoCuenta(e).vino >= 50,
    },
  ];
function sdcAnimo(e) {
  return (e && e.animo) || {};
}
function sdcAnimoCuenta(e) {
  var v = sdcAnimo(e),
    h = (e && e.history) || {},
    k,
    x,
    r = { no: 0, vino: 0, envion: 0, mejor: 0, ambas: 0, noResp: 0, noMejor: 0 };
  for (k in v) {
    x = v[k];
    if (!x || !x.antes) continue;
    if (x.antes <= 2) {
      r.no++;
      (h[k] === "full" || h[k] === "partial") && r.vino++;
      x.despues >= 4 && r.envion++;
      x.despues && (r.noResp++, x.despues > x.antes && r.noMejor++);
    }
    x.despues && (r.ambas++, x.despues > x.antes && r.mejor++);
  }
  return r;
}
function da(e) {
  let a = M(e),
    l = [];
  a.achievements || (a.achievements = []);
  a.dominion || (a.dominion = Ay());
  let pd = { E: 1, D: 1, C: 2, B: 2, A: 3, S: 4, Z: 5 },
    sdcN = 0,
    sdcPd = 0;
  for (let n of Jo)
    if (!a.achievements.includes(n.id) && n.check(a)) {
      a.achievements.push(n.id);
      let g = pd[n.tier] || 1;
      ((a.dominion.points = (a.dominion.points || 0) + g),
        (sdcN += 1),
        (sdcPd += g),
        l.push(`🏆 Logro desbloqueado: ${n.name} (+${g} PD)`));
    }
  return (
    sdcN > 5 &&
      (l = [
        `🏆 ${sdcN} logros desbloqueados de golpe (+${sdcPd} PD). Los tenés en la pestaña Logros.`,
      ]),
    { state: a, notices: l }
  );
}
function K2(e) {
  let a = ue(),
    l = 0;
  return (
    e.today.date === a &&
      e.today.completed &&
      e.today.mode !== "rest" &&
      (l += e.today.fullCompletion ? 2 : 1),
    e.dungeon.date === a && e.dungeon.completed && (l += 2),
    e.primal.today.date === a && (l += e.primal.today.count),
    e.combat.todayDefeated &&
      e.combat.todayDefeated.date === a &&
      (l += e.combat.todayDefeated.count),
    l
  );
}
function V2(e) {
  return e >= 8 ? "Muy Alto" : e >= 5 ? "Alto" : e >= 3 ? "Moderado" : "Ligero";
}
function ni(e) {
  let a = M(e),
    l = [],
    n = ue();
  return (
    V2(K2(a)) === "Muy Alto" &&
      a.loadWarnedDate !== n &&
      ((a.loadWarnedDate = n),
      l.push(
        "Hoy le diste durísimo a tu cuerpo. Considera parar por hoy y dejar que descanse — mañana el plan sigue en pie.",
      )),
    { state: a, notices: l }
  );
}
function Q2(e, a) {
  let l = new Date(a + "T00:00:00");
  l.setDate(l.getDate() - 60);
  let n = __fechaLocal(l),
    o = {};
  for (let s of Object.keys(e || {})) s >= n && (o[s] = e[s]);
  return o;
}
var W2 = { E: 0.6, D: 0.8, C: 1, B: 1.25, A: 1.5, S: 2, Z: 2 },
  J2 = {
    E: "Regresión base — menor carga gravitacional",
    D: "Control motor inicial — rango parcial asistido",
    C: "Patrón estándar — rango completo de movimiento",
    B: "Intensificación — declinado, desequilibrio y pausas",
    A: "Alta fuerza relativa — unilateral progresivo / explosivo",
    S: "Dominio motriz — unilateral estricto / isometría compleja",
    Z: "Variantes compuestas — récord personal",
  },
  by = {
    pushup: {
      label: "Empuje",
      E: [
        {
          name: "Flexiones con manos elevadas",
          pos: "Manos en una mesa o el borde de una cama, brazos estirados, cuerpo recto de la cabeza a los talones.",
          mov: "Baja el pecho hasta rozar la superficie y empuja hasta estirar los brazos.",
          err: "Si la cadera se hunde, aprieta glúteos y abdomen antes de bajar.",
          repFactor: 1,
          alt: "Apoya las manos en una mesa o pared: cuanto más alto, más fácil.",
        },
        {
          name: "Flexiones contra la pared",
          pos: "De pie frente a la pared, manos apoyadas a la altura del pecho, un paso hacia atrás.",
          mov: "Dobla los codos hasta acercar el pecho a la pared y empuja hasta estirar.",
          err: "Si es muy fácil, aleja más los pies: el cuerpo tiene que quedar inclinado, no vertical.",
          repFactor: 1.3,
          alt: "De pie frente a la pared, manos a la altura del pecho. Cuanto más lejos los pies, más difícil.",
        },
        {
          name: "Flexiones con manos en el borde de la cama",
          pos: "Manos en el borde al ancho de los hombros, pies atrás, cuerpo en una línea.",
          mov: "Baja el pecho hasta el borde y empuja hasta estirar los brazos.",
          err: "Si la superficie se mueve, busca una firme: una mesa o un escalón.",
          repFactor: 1.1,
          alt: "Cualquier superficie firme a la altura de la cadera sirve.",
        },
      ],
      D: [
        {
          name: "Flexiones sobre rodillas",
          pos: "Boca abajo, rodillas apoyadas, manos bajo los hombros, cuerpo recto de rodilla a cabeza.",
          mov: "Baja hasta que el pecho quede a un palmo del suelo y empuja.",
          err: "Si la cadera queda atrás, adelanta el cuerpo hasta tener los hombros sobre las manos.",
          repFactor: 1,
          alt: "Rodillas apoyadas, cuerpo recto desde rodilla a hombro.",
        },
        {
          name: "Flexiones negativas",
          pos: "En plancha alta, manos bajo los hombros, cuerpo recto.",
          mov: "Baja en 4 segundos hasta el suelo y vuelve arriba apoyando las rodillas.",
          err: "Si te caes de golpe a mitad de camino, empieza desde más arriba, con las manos elevadas.",
          repFactor: 0.7,
          alt: "Baja en 4 segundos y sube apoyando las rodillas.",
        },
        {
          name: "Flexiones sobre rodillas con pausa abajo",
          pos: "Rodillas apoyadas, manos bajo los hombros, cuerpo recto de rodilla a cabeza.",
          mov: "Baja hasta un palmo del suelo, aguanta un segundo sin apoyar y sube.",
          err: "Si en la pausa los codos se abren a los costados, acércalos al cuerpo.",
          repFactor: 0.85,
          alt: "Un segundo detenido a un palmo del suelo.",
        },
      ],
      C: [
        {
          name: "Flexiones estrictas",
          pos: "Plancha alta, manos bajo los hombros, cuerpo recto de la cabeza a los talones.",
          mov: "Baja hasta rozar el suelo con el pecho y empuja hasta estirar los brazos.",
          err: "Si la cadera sube o baja antes que el pecho, aprieta el abdomen y muévete en bloque.",
          repFactor: 1,
          alt: "Si no llegas, baja a rodillas a mitad de la serie.",
        },
        {
          name: "Flexiones con pausa abajo",
          pos: "Plancha alta, cuerpo recto, codos a unos 45 grados del torso.",
          mov: "Baja hasta rozar el suelo, aguanta un segundo sin apoyar y sube.",
          err: "Si pierdes la línea en la pausa, acorta el rango antes que la posición.",
          repFactor: 0.85,
          alt: "Un segundo detenido abajo. Si no llegas, apoya las rodillas.",
        },
        {
          name: "Flexiones con manos anchas",
          pos: "Plancha alta con las manos algo más abiertas que los hombros.",
          mov: "Baja con los codos a 45 grados hasta rozar el suelo y empuja.",
          err: "Si el hombro molesta, cierra el agarre: demasiado ancho carga la articulación.",
          repFactor: 0.95,
          alt: "Manos algo más abiertas que los hombros, codos a 45 grados.",
        },
      ],
      B: [
        {
          name: "Flexiones declinadas o en diamante",
          pos: "Declinadas: pies sobre una silla, manos en el suelo. Diamante: manos juntas bajo el pecho.",
          mov: "Baja el pecho hasta las manos y empuja hasta estirar.",
          err: "En diamante, los codos van pegados al cuerpo: si se abren, pierdes el tríceps.",
          repFactor: 0.8,
          alt: "Sin silla: haz la versión diamante en el suelo, con las manos juntas bajo el pecho.",
        },
        {
          name: "Flexiones en pica",
          pos: "Manos y pies en el suelo, cadera bien alta, cuerpo en forma de V invertida.",
          mov: "Baja la cabeza hacia el suelo entre las manos y empuja hasta estirar los brazos.",
          err: "Si bajas hacia adelante en vez de hacia abajo, acerca los pies a las manos.",
          repFactor: 0.8,
          alt: "Cadera alta, cabeza hacia el suelo entre las manos. Pies en el suelo si no tienes dónde elevarlos.",
        },
        {
          name: "Flexiones pseudo planche",
          pos: "Plancha alta con las manos a la altura de la cintura y los dedos apuntando a los pies.",
          mov: "Baja manteniendo los hombros por delante de las manos y empuja.",
          err: "Si la muñeca molesta, gira las manos hacia afuera o apoya los puños.",
          repFactor: 0.7,
          alt: "Manos a la altura de la cintura y dedos hacia los pies. Apoya las rodillas si es demasiado.",
        },
      ],
      A: [
        {
          name: "Flexiones arqueras",
          pos: "Plancha alta con las manos bien separadas, más abiertas que en una flexión normal.",
          mov: "Baja hacia un lado doblando ese brazo mientras el otro se estira, y vuelve al centro.",
          err: "Si el brazo estirado se dobla, estás bajando demasiado: acorta el recorrido.",
          repFactor: 0.5,
          alt: "Cuenta las reps por lado. Sin banda: apoya la mano estirada sobre un libro y baja solo lo que controles.",
        },
        {
          name: "Flexiones en pica elevada",
          pos: "Pies sobre una silla o la cama, manos en el suelo, cadera alta y casi vertical.",
          mov: "Baja la cabeza hacia el suelo entre las manos y empuja.",
          err: "Si la lumbar se arquea, baja la altura de los pies.",
          repFactor: 0.55,
          alt: "Pies sobre una silla o la cama. Sin nada donde elevarlos, hazlas en el suelo con la cadera bien alta.",
        },
        {
          name: "Flexiones a una mano asistidas",
          pos: "Pies bien separados, una mano en el suelo bajo el hombro y la otra sobre un libro grueso.",
          mov: "Baja cargando el peso en la mano de abajo y empuja.",
          err: "Si el torso rota, abre más los pies antes de sacar peso de la mano de apoyo.",
          repFactor: 0.4,
          alt: "Una mano en el suelo, la otra sobre un libro grueso. Cuenta las reps por lado.",
        },
      ],
      S: [
        {
          name: "Flexiones en pino (HSPU) o a una mano",
          pos: "Pino contra la pared, manos a un palmo del rodapié, cuerpo estirado.",
          mov: "Baja hasta rozar el suelo con la cabeza y empuja hasta estirar los brazos.",
          err: "Si la lumbar se arquea, aprieta glúteos y abdomen antes de bajar.",
          repFactor: 0.35,
          alt: "Pino contra la pared. Alternativa: flexiones a una mano con pies abiertos.",
        },
        {
          name: "Negativas de pino contra la pared",
          pos: "Pino contra la pared, brazos estirados, cuerpo en línea.",
          mov: "Baja en 5 segundos hasta tocar el suelo con la cabeza y sal apoyando los pies.",
          err: "Si te vas de cabeza, mete la barbilla y baja más lento desde el principio.",
          repFactor: 0.3,
          alt: "Sube al pino con la pared y baja en 5 segundos hasta tocar la cabeza.",
        },
        {
          name: "Flexiones a una mano con pies abiertos",
          pos: "Una mano en el suelo bajo el pecho, la otra en la espalda, pies bien separados.",
          mov: "Baja el pecho hacia la mano de apoyo y empuja hasta estirar.",
          err: "Si el hombro se va hacia adelante, aprieta la escápula antes de bajar.",
          repFactor: 0.3,
          alt: "Pies bien separados para repartir el peso. Cuenta las reps por lado.",
        },
      ],
      Z: [
        {
          name: "Flexiones en pino libres a tempo lento",
          pos: "Pino libre lejos de la pared, cuerpo en una sola línea.",
          mov: "Baja en 3 segundos hasta rozar el suelo con la cabeza y empuja con control.",
          err: "Si pierdes el equilibrio hacia adelante, corrige con los dedos, nunca con la espalda.",
          repFactor: 0.3,
          alt: "Transferencias a planche como progresión.",
        },
        {
          name: "Flexiones a una mano estrictas",
          pos: "Una mano bajo el pecho, la otra en la espalda, pies juntos.",
          mov: "Baja el pecho hasta el suelo sin rotar la cadera y empuja.",
          err: "Si la cadera gira, separa un poco los pies antes que perder la línea.",
          repFactor: 0.25,
          alt: "Pies juntos, sin rotar la cadera. Cuenta las reps por lado.",
        },
        {
          name: "Planche lean a flexión",
          pos: "Plancha alta con las manos a la altura de la cadera y los dedos hacia los pies.",
          mov: "Inclínate hasta que los hombros pasen las manos, baja lo que controles y vuelve.",
          err: "Si la cadera se hunde, inclínate menos: la línea vale más que el recorrido.",
          repFactor: 0.25,
          alt: "Inclínate hasta que los hombros pasen las manos y haz el recorrido que controles.",
        },
      ],
    },
    back: {
      label: "Tracción",
      E: [
        {
          name: "Jalones en puerta con toalla",
          pos: "De pie frente a una puerta abierta, una toalla pasada por el picaporte, un extremo en cada mano.",
          mov: "Inclínate hacia atrás con los brazos estirados y tira hasta acercar el pecho a la puerta.",
          err: "Si tiras solo con los brazos, junta primero las escápulas y después dobla los codos.",
          repFactor: 1,
          alt: "Sin puerta ni barra: superman boca abajo en el suelo (1 rep = 3 s) o remo con una mochila cargada.",
        },
        {
          name: "Superman en el suelo",
          pos: "Boca abajo, brazos estirados adelante, piernas juntas.",
          mov: "Despega pecho, brazos y piernas del suelo a la vez y aguanta 3 segundos.",
          err: "Si te molesta la lumbar, sube menos y mira al suelo, no al frente.",
          repFactor: 1,
          alt: "Boca abajo, despega pecho y piernas. 1 rep = 3 segundos arriba.",
        },
        {
          name: "Remo con mochila cargada",
          pos: "De pie, torso inclinado a 45 grados, espalda recta, la mochila colgando de las manos.",
          mov: "Tira de la mochila hacia el ombligo con los codos pegados al cuerpo y baja con control.",
          err: "Si la espalda se redondea, sube el torso hasta que puedas mantenerla recta.",
          repFactor: 1,
          alt: "Llena una mochila con libros o botellas. Torso inclinado a 45 grados, codos pegados. Sin mochila: un bolso, una funda de almohada con libros o un bidón de agua.",
        },
      ],
      D: [
        {
          name: "Remos invertidos con pies apoyados",
          pos: "Boca arriba debajo de una mesa firme, manos en el borde, talones en el suelo, cuerpo recto.",
          mov: "Tira hasta tocar el borde con el pecho y baja hasta estirar los brazos.",
          err: "Si la cadera se cae, aprieta glúteos: el cuerpo va en una sola línea.",
          repFactor: 1,
          alt: "Bajo una mesa firme. Sin mesa ni puerta: remo con mochila cargada, torso a 45°.",
        },
        {
          name: "Remo a un brazo con mochila",
          pos: "Una rodilla y una mano apoyadas en una silla, la otra mano sosteniendo la mochila.",
          mov: "Tira de la mochila hasta la cadera con el codo pegado al cuerpo y baja estirando.",
          err: "Si el torso gira para ayudar, baja el peso hasta que quede quieto.",
          repFactor: 0.9,
          alt: "Una rodilla y una mano en una silla, la mochila en la otra mano. Cuenta las reps por lado. Sin mochila: un bidón de agua de 5 litros o un bolso bien cargado.",
        },
        {
          name: "Remo invertido con pausa arriba",
          pos: "Boca arriba bajo una mesa, manos en el borde, cuerpo recto y talones apoyados.",
          mov: "Tira hasta que el pecho toque el borde, aguanta un segundo y baja.",
          err: "Si no llegas a tocar, camina los pies hacia adentro para quedar más vertical.",
          repFactor: 0.85,
          alt: "Un segundo con el pecho pegado a la mesa o la toalla. Sin mesa ni puerta: remo con mochila, un segundo arriba apretando las escápulas.",
        },
      ],
      C: [
        {
          name: "Remos invertidos horizontales",
          pos: "Boca arriba bajo una mesa, pies adelantados para que el cuerpo quede casi paralelo al suelo.",
          mov: "Tira hasta tocar el borde con el pecho y baja hasta estirar los brazos.",
          err: "Cuanto más horizontal, más pesa: si no completas las reps, acerca los pies.",
          repFactor: 1,
          alt: "Cuerpo más horizontal = más difícil. Sin mesa: remo a una mano con mochila pesada.",
        },
        {
          name: "Dominadas negativas",
          pos: "Colgado de la barra con la barbilla ya por encima, llegando con un salto.",
          mov: "Baja en 5 segundos hasta quedar con los brazos estirados del todo.",
          err: "Si te caes de golpe a mitad, frena antes: empieza la bajada más lento.",
          repFactor: 0.5,
          alt: "Sube con un salto y baja en 5 segundos. Sin barra: remo invertido bajando lento.",
        },
        {
          name: "Remo invertido a tempo",
          pos: "Boca arriba bajo una mesa, manos en el borde, cuerpo recto.",
          mov: "Sube en 1 segundo y baja en 3, sin soltar la tensión abajo.",
          err: "Si el ritmo se te escapa, cuenta en voz alta: el tempo es el ejercicio.",
          repFactor: 0.8,
          alt: "Sube en 1 segundo, baja en 3. Sin mesa: remo con mochila al mismo ritmo.",
        },
      ],
      B: [
        {
          name: "Dominadas (pronadas o supinadas)",
          pos: "Colgado de la barra con los brazos estirados, manos al ancho de los hombros.",
          mov: "Tira hasta pasar la barbilla por encima de la barra y baja hasta estirar del todo.",
          err: "Si te balanceas, aprieta glúteos y abdomen para que el cuerpo no se mueva.",
          repFactor: 0.6,
          alt: "Sin barra: remos invertidos con pies elevados. Sin mesa: remo a una mano con mochila pesada.",
        },
        {
          name: "Remos invertidos con pies elevados",
          pos: "Boca arriba bajo una mesa, pies sobre una silla, cuerpo recto y horizontal.",
          mov: "Tira hasta tocar el borde con el pecho y baja estirando los brazos.",
          err: "Si la cadera se hunde, aprieta glúteos antes de empezar a tirar.",
          repFactor: 0.8,
          alt: "Pies sobre una silla, cuerpo por debajo de la mesa o la barra. Sin mesa: remo a una mano con la mochila bien cargada, torso casi paralelo al piso.",
        },
        {
          name: "Dominadas asistidas con los pies",
          pos: "Colgado de una barra baja con los pies apoyados en el suelo por delante.",
          mov: "Tira con la espalda y ayuda lo mínimo con las piernas hasta pasar la barbilla.",
          err: "Si las piernas hacen todo el trabajo, baja el apoyo o estira más las rodillas.",
          repFactor: 0.8,
          alt: "Barra baja o anillas, pies en el suelo ayudando lo mínimo. Sin barra: remo invertido bien horizontal.",
        },
      ],
      A: [
        {
          name: "Dominadas arqueras",
          pos: "Colgado con las manos bien separadas, más abiertas que en una dominada normal.",
          mov: "Tira hacia una mano mientras el otro brazo se estira, y baja al centro.",
          err: "Si el brazo estirado se dobla mucho, no subas tanto de ese lado.",
          repFactor: 0.4,
          alt: "Sin barra: remos invertidos a una mano asistidos.",
        },
        {
          name: "Dominadas con pausa arriba",
          pos: "Colgado de la barra con los brazos estirados.",
          mov: "Sube hasta pasar la barbilla, aguanta dos segundos arriba y baja con control.",
          err: "Si en la pausa los hombros suben a las orejas, bájalos y junta las escápulas.",
          repFactor: 0.45,
          alt: "Dos segundos con la barbilla sobre la barra. Sin barra: remo invertido con pausa en el pecho.",
        },
        {
          name: "Remo invertido a una mano",
          pos: "Boca arriba bajo una mesa, una sola mano en el borde, la otra al costado del cuerpo.",
          mov: "Tira hasta acercar ese lado del pecho al borde y baja estirando.",
          err: "Si el torso rota, acerca los pies hasta poder mantenerlo de frente.",
          repFactor: 0.4,
          alt: "Bajo una mesa, una sola mano, la otra al costado. Cuenta las reps por lado. Sin mesa: remo a una mano con mochila pesada, bajando en 3 segundos.",
        },
      ],
      S: [
        {
          name: "Dominadas al pecho o muscle-ups",
          pos: "Colgado de la barra, brazos estirados, cuerpo apretado y sin balanceo.",
          mov: "Tira hasta que la barra toque el pecho, o sigue por encima si vas al muscle-up.",
          err: "Si necesitas patear para llegar, quédate en la dominada al pecho.",
          repFactor: 0.3,
          alt: "Chest-to-bar estricto. Muscle-up si lo dominas. Sin barra: remo invertido bajo una mesa, pies elevados, tocando el borde con el pecho.",
        },
        {
          name: "Dominadas explosivas",
          pos: "Colgado con los brazos estirados y el cuerpo quieto.",
          mov: "Tira lo más rápido que puedas hasta que la barra llegue al pecho o más abajo.",
          err: "Si la explosión sale de la cadera, frena: el impulso tiene que salir de la espalda.",
          repFactor: 0.3,
          alt: "Sube hasta que la barra llegue al pecho o más abajo. Sin barra: remo invertido explosivo.",
        },
        {
          name: "Remo en front lever agrupado",
          pos: "Colgado con las rodillas al pecho y el torso horizontal, mirando al techo.",
          mov: "Tira hasta acercar el pecho a la barra sin bajar la cadera y vuelve.",
          err: "Si la cadera se cae, agrúpate más: primero la posición, después el remo.",
          repFactor: 0.3,
          alt: "Colgado con las rodillas al pecho y el torso horizontal, tira hasta la barra. Sin barra: remo invertido bajo una mesa con las rodillas al pecho y los pies en el aire.",
        },
      ],
      Z: [
        {
          name: "Dominadas unilaterales / transiciones en barra",
          pos: "Colgado de una mano, la otra tomando la muñeca o la barra a un costado.",
          mov: "Tira con el brazo principal hasta subir la barbilla, ayudando lo mínimo con el otro.",
          err: "Si el hombro se va hacia adelante, baja: esa posición es donde se lesiona.",
          repFactor: 0.25,
          alt: "Progresión a una mano con asistencia mínima. Sin barra: remo invertido a una mano bajo una mesa, bajando en 5 segundos.",
        },
        {
          name: "Muscle-up estricto",
          pos: "Colgado muerto, brazos estirados, cuerpo quieto. Agarre falso si te ayuda.",
          mov: "Tira hasta el pecho y pasa por encima de la barra girando las muñecas, sin balanceo.",
          err: "Si necesitas patear, todavía no: suma dominadas al pecho y fondos.",
          repFactor: 0.25,
          alt: "Sin balanceo, desde colgado muerto. Agarre falso si te ayuda. Sin barra: remo invertido explosivo bajo una mesa firme, hasta despegar las manos.",
        },
        {
          name: "Remo en front lever completo",
          pos: "Colgado con el cuerpo horizontal y recto, de la cabeza a los pies.",
          mov: "Tira hasta acercar el pecho a la barra sin perder la línea y vuelve estirando.",
          err: "Si la cadera se hunde, agrupa una pierna antes que romper la línea.",
          repFactor: 0.2,
          alt: "Cuerpo horizontal y recto, tira hasta la barra sin perder la línea. Sin barra: remo invertido a una mano con los pies sobre una silla.",
        },
      ],
    },
    squat: {
      label: "Piernas",
      E: [
        {
          name: "Sentadillas a silla",
          pos: "De pie delante de una silla, pies al ancho de los hombros, punteras algo hacia afuera.",
          mov: "Baja llevando la cadera atrás hasta sentarte y levántate sin impulso.",
          err: "Si te dejas caer, baja más lento: la silla marca el fondo, no te frena.",
          repFactor: 1,
          alt: "Sin silla: sentadilla parcial de espaldas a la pared, bajando solo lo que controles.",
        },
        {
          name: "Puente de glúteos",
          pos: "Boca arriba, rodillas dobladas, pies apoyados al ancho de la cadera, brazos al costado.",
          mov: "Sube la cadera hasta alinear rodillas, cadera y hombros, aprieta arriba y baja.",
          err: "Si sientes la lumbar y no el glúteo, no subas tanto y mete un poco la pelvis.",
          repFactor: 1.2,
          alt: "Tumbado boca arriba, pies apoyados, sube la cadera y aprieta arriba.",
        },
        {
          name: "Sentadilla parcial con apoyo",
          pos: "De pie sujetándote del marco de una puerta con las dos manos, pies al ancho de los hombros.",
          mov: "Baja hasta donde no duela usando las manos para ayudarte y sube.",
          err: "Si las rodillas se juntan hacia adentro, empuja los pies contra el suelo al subir.",
          repFactor: 1.2,
          alt: "Sujétate del marco de una puerta y baja solo hasta donde no duela.",
        },
      ],
      D: [
        {
          name: "Sentadillas libres con pausa abajo",
          pos: "De pie, pies al ancho de los hombros, brazos adelante para equilibrar.",
          mov: "Baja hasta donde controles, aguanta un segundo abajo y sube.",
          err: "Si los talones se despegan, separa un poco más los pies o abre las punteras.",
          repFactor: 1,
          alt: "Pausa de 1 segundo en el punto más bajo.",
        },
        {
          name: "Sentadilla sumo",
          pos: "De pie con los pies bien separados y las punteras hacia afuera.",
          mov: "Baja entre los talones con el pecho arriba y sube apretando los glúteos.",
          err: "Si las rodillas caen hacia adentro, ábrelas en la dirección de las punteras.",
          repFactor: 1,
          alt: "Pies bien separados y puntas hacia fuera, baja entre los talones.",
        },
        {
          name: "Subidas a un escalón",
          pos: "De pie frente a un escalón, una silla firme o el borde de la cama.",
          mov: "Sube apoyando un pie entero y empujando con esa pierna, y baja con control.",
          err: "Si te impulsas con la pierna de abajo, elige un escalón más bajo.",
          repFactor: 0.8,
          alt: "Un escalón, una silla firme o el borde de la cama. Cuenta las reps por pierna.",
        },
      ],
      C: [
        {
          name: "Sentadillas profundas",
          pos: "De pie, pies al ancho de los hombros, punteras algo hacia afuera, pecho arriba.",
          mov: "Baja hasta que la cadera pase por debajo de la rodilla y sube.",
          err: "Si la lumbar se curva abajo, para justo antes de ese punto.",
          repFactor: 1,
          alt: "Talones en el suelo, pecho arriba, cadera bajo la rodilla.",
        },
        {
          name: "Zancadas en el lugar",
          pos: "De pie, un pie un paso adelante y el otro atrás, torso vertical.",
          mov: "Baja recto hasta que la rodilla de atrás quede a un dedo del suelo y sube.",
          err: "Si pierdes el equilibrio, separa un poco los pies hacia los costados.",
          repFactor: 0.8,
          alt: "Rodilla trasera a un dedo del suelo. Cuenta las reps por pierna.",
        },
        {
          name: "Puente de glúteos a una pierna",
          pos: "Boca arriba, un pie apoyado y la otra pierna estirada al frente.",
          mov: "Sube la cadera con la pierna de apoyo hasta alinear rodilla, cadera y hombro.",
          err: "Si la cadera se inclina hacia un lado, sube menos y mantén las dos caderas parejas.",
          repFactor: 0.7,
          alt: "Una pierna estirada al frente, sube la cadera con la otra. Cuenta las reps por pierna.",
        },
      ],
      B: [
        {
          name: "Zancadas alternadas o búlgaras",
          pos: "Zancada: de pie, un paso al frente. Búlgara: el pie de atrás sobre una silla.",
          mov: "Baja recto hasta que el muslo de adelante quede paralelo al suelo y sube.",
          err: "Si la rodilla de adelante pasa mucho el pie, aleja más el pie de atrás.",
          repFactor: 0.8,
          alt: "Cuenta las reps por pierna. Pie trasero en una silla para búlgaras.",
        },
        {
          name: "Sentadilla con salto",
          pos: "De pie, pies al ancho de los hombros, rodillas blandas.",
          mov: "Baja a media sentadilla y salta, cayendo suave sobre la planta del pie.",
          err: "Si el aterrizaje suena, estás cayendo rígido: dobla las rodillas al caer.",
          repFactor: 0.7,
          alt: "Recepción suave, rodillas blandas. Si molesta algo, haz sentadillas profundas rápidas.",
        },
        {
          name: "Peso muerto a una pierna",
          pos: "De pie sobre una pierna, la otra algo atrás, rodilla de apoyo casi recta.",
          mov: "Baja el torso mientras la pierna libre sube atrás, hasta sentir tirón en el isquio.",
          err: "Si la espalda se redondea, baja menos: el movimiento sale de la cadera.",
          repFactor: 0.7,
          alt: "Sin peso: baja el torso mientras la pierna libre sube atrás. Cuenta las reps por pierna.",
        },
      ],
      A: [
        {
          name: "Sentadillas cosacas",
          pos: "De pie con los pies bien separados, punteras hacia afuera.",
          mov: "Baja sobre una pierna estirando la otra al costado y vuelve al centro.",
          err: "Si el talón de la pierna que baja se despega, apoya las manos y baja menos.",
          repFactor: 0.5,
          alt: "Laterales profundas alternando. Apóyate con las manos si hace falta.",
        },
        {
          name: "Shrimp squat asistida",
          pos: "De pie sobre una pierna, la otra doblada atrás y sujeta con la mano del mismo lado.",
          mov: "Baja hasta rozar el suelo con la rodilla de atrás, tocando con la mano libre, y sube.",
          err: "Si te caes hacia atrás, adelanta un poco el pie de apoyo.",
          repFactor: 0.45,
          alt: "Sujeta el pie de atrás y baja hasta rozar la rodilla en el suelo, tocando con una mano. Cuenta por pierna.",
        },
        {
          name: "Sentadilla a una pierna a caja alta",
          pos: "De pie sobre una pierna frente a una silla alta, la otra estirada al frente.",
          mov: "Baja hasta sentarte en la silla con una sola pierna y levántate sin impulso.",
          err: "Si te ayudas con la pierna libre, súbela más y mantenla estirada.",
          repFactor: 0.5,
          alt: "Siéntate en una silla alta con una sola pierna y levántate sin impulso. Cuenta por pierna.",
        },
      ],
      S: [
        {
          name: "Pistol squats (asistidas o libres)",
          pos: "De pie sobre una pierna, la otra estirada al frente, brazos adelante.",
          mov: "Baja hasta el fondo manteniendo la pierna libre en el aire y sube.",
          err: "Si el talón se despega, apoya una mano en la pared antes que levantar el pie.",
          repFactor: 0.35,
          alt: "Sin marco: apoya una mano en la pared, o haz búlgaras con el pie trasero elevado. Cuenta por pierna.",
        },
        {
          name: "Shrimp squat completa",
          pos: "De pie sobre una pierna, la otra doblada atrás, sin sujetarla y sin apoyar las manos.",
          mov: "Baja hasta que la rodilla de atrás toque el suelo y sube sin apoyar las manos.",
          err: "Si necesitas tocar el suelo con la mano, vuelve a la versión asistida.",
          repFactor: 0.35,
          alt: "Sin apoyo de manos, rodilla trasera al suelo. Cuenta las reps por pierna.",
        },
        {
          name: "Sentadilla a una pierna a caja baja",
          pos: "De pie sobre una pierna frente a algo bajo: una silla, un escalón, una pila de libros.",
          mov: "Baja hasta sentarte con una sola pierna y levántate sin impulso.",
          err: "Si rebotas al sentarte, la superficie es muy baja para hoy.",
          repFactor: 0.35,
          alt: "Cada semana una superficie más baja. Cuenta las reps por pierna. Sirve una silla, un escalón o una pila de libros, cada vez más baja.",
        },
      ],
      Z: [
        {
          name: "Dragon squats / pistol con 4s de bajada",
          pos: "De pie sobre una pierna, la otra estirada al frente.",
          mov: "Baja en 4 segundos hasta el fondo y sube con control.",
          err: "Si en la bajada el torso se derrumba, acorta el recorrido antes que el tempo.",
          repFactor: 0.3,
          alt: "Tempo estricto: 4 segundos de descenso.",
        },
        {
          name: "Pistol con salto",
          pos: "De pie sobre una pierna, la otra estirada al frente.",
          mov: "Baja al fondo y sube tan fuerte que el pie despegue del suelo.",
          err: "Si caes con la rodilla hacia adentro, suma pistols normales antes de saltar.",
          repFactor: 0.25,
          alt: "Sube explosivo hasta despegar del suelo. Cuenta las reps por pierna.",
        },
        {
          name: "Shrimp squat con tempo lento",
          pos: "De pie sobre una pierna, la otra doblada atrás, sin apoyo de manos.",
          mov: "Baja en 4 segundos hasta que la rodilla toque el suelo y sube.",
          err: "Si el último segundo se te va de golpe, baja el rango y conserva el tempo.",
          repFactor: 0.25,
          alt: "Cuatro segundos de bajada, sin apoyar las manos. Cuenta las reps por pierna.",
        },
      ],
    },
    abs: {
      label: "Core",
      E: [
        {
          name: "Plancha sobre rodillas / deadbug asistido",
          pos: "Antebrazos y rodillas en el suelo, codos bajo los hombros, cuerpo recto de rodilla a cabeza.",
          mov: "Aguanta la posición apretando abdomen y glúteos, contando 3 segundos por repetición.",
          err: "Si la cadera sube, bájala hasta que la espalda quede plana.",
          repFactor: 1,
          alt: "Cuenta 1 rep por cada 3 segundos de sostén.",
        },
        {
          name: "Elevación de rodillas tumbado",
          pos: "Boca arriba, manos al costado, lumbar pegada al suelo.",
          mov: "Sube las rodillas hacia el pecho y bájalas sin que la espalda se despegue.",
          err: "Si la lumbar se arquea, baja menos las piernas.",
          repFactor: 1.1,
          alt: "Boca arriba, lumbar pegada al suelo, sube las rodillas al pecho.",
        },
        {
          name: "Bicho muerto con pies apoyados",
          pos: "Boca arriba, rodillas dobladas y pies apoyados, lumbar pegada al suelo.",
          mov: "Baja un talón hasta rozar el suelo y vuelve, alternando lados.",
          err: "Si la espalda se despega, baja el talón menos y vuelve antes.",
          repFactor: 1,
          alt: "Boca arriba, baja un talón al suelo y vuelve. Alterna lados.",
        },
      ],
      D: [
        {
          name: "Deadbug controlado",
          pos: "Boca arriba, brazos al techo y rodillas sobre la cadera a 90 grados.",
          mov: "Estira a la vez un brazo y la pierna contraria, rozando el suelo, y vuelve.",
          err: "Si la lumbar se despega, no estires del todo: el suelo manda.",
          repFactor: 1,
          alt: "Espalda pegada al suelo, alterna brazo y pierna opuesta.",
        },
        {
          name: "Plancha lateral sobre rodillas",
          pos: "De costado, apoyado en un antebrazo con el codo bajo el hombro y las rodillas dobladas.",
          mov: "Sube la cadera hasta alinear hombro, cadera y rodilla, y aguanta 3 segundos por repetición.",
          err: "Si la cadera se va hacia atrás, llévala adelante hasta quedar de perfil.",
          repFactor: 0.9,
          alt: "Cuenta 1 rep por cada 3 segundos por lado.",
        },
        {
          name: "Bird dog",
          pos: "En cuadrupedia, manos bajo los hombros y rodillas bajo la cadera, espalda plana.",
          mov: "Estira a la vez un brazo y la pierna contraria hasta la horizontal y vuelve.",
          err: "Si la cadera rota, sube menos la pierna: la espalda no se mueve.",
          repFactor: 1,
          alt: "En cuadrupedia, estira brazo y pierna opuestos sin que la cadera rote.",
        },
      ],
      C: [
        {
          name: "Plancha estricta / elevación de rodillas",
          pos: "Antebrazos y puntas de los pies en el suelo, codos bajo los hombros, cuerpo en línea.",
          mov: "Aguanta apretando abdomen y glúteos, contando 3 segundos por repetición.",
          err: "Si la cadera sube, eso es descanso y no plancha: bájala hasta la línea.",
          repFactor: 1,
          alt: "En plancha, cuenta 1 rep por cada 3 segundos.",
        },
        {
          name: "Plancha lateral",
          pos: "De costado, apoyado en un antebrazo con el codo bajo el hombro, pies uno sobre el otro.",
          mov: "Sube la cadera hasta alinear hombro, cadera y tobillo y aguanta 3 segundos por repetición.",
          err: "Si la cadera se cae, apoya la rodilla de abajo y mantén la línea.",
          repFactor: 0.8,
          alt: "Cuenta 1 rep por cada 3 segundos por lado.",
        },
        {
          name: "Escaladores lentos",
          pos: "Plancha alta, manos bajo los hombros, cuerpo recto.",
          mov: "Lleva una rodilla al pecho con control y vuelve, alternando piernas.",
          err: "Si la cadera sube con cada rodilla, ve más lento y deja los hombros sobre las manos.",
          repFactor: 1,
          alt: "En plancha, lleva una rodilla al pecho con control. Alterna.",
        },
      ],
      B: [
        {
          name: "Elevaciones de rodillas colgado o en suelo",
          pos: "Colgado de la barra con los brazos estirados y el cuerpo quieto.",
          mov: "Sube las rodillas hasta la altura de la cadera y bájalas con control.",
          err: "Si te balanceas, para en cada repetición antes de subir otra vez.",
          repFactor: 0.8,
          alt: "Sin barra: elevaciones de piernas tumbado.",
        },
        {
          name: "Hollow rocks",
          pos: "Boca arriba, brazos junto a las orejas y piernas estiradas, lumbar pegada al suelo.",
          mov: "Despega hombros y piernas y mécete adelante y atrás sin perder esa posición.",
          err: "Si la lumbar se despega, dobla las rodillas o baja los brazos.",
          repFactor: 0.8,
          alt: "En posición de barco, mécete sin que la lumbar se despegue.",
        },
        {
          name: "Rueda abdominal con toalla",
          pos: "De rodillas, un trapo bajo cada mano y los brazos estirados hacia el suelo.",
          mov: "Desliza las manos hacia adelante todo lo que controles y vuelve tirando del abdomen.",
          err: "Si la lumbar se arquea, no vayas tan lejos: la cadera no se hunde.",
          repFactor: 0.7,
          alt: "De rodillas, desliza dos trapos por el piso hacia delante y vuelve. Sobre alfombra los trapos no deslizan: de rodillas, lleva las manos lo más adelante que controles y vuelve sin que la cadera baje.",
        },
      ],
      A: [
        {
          name: "Hollow body hold / elevaciones de piernas",
          pos: "Boca arriba, brazos junto a las orejas y piernas estiradas, lumbar pegada al suelo.",
          mov: "Despega hombros y piernas unos centímetros y aguanta 3 segundos por repetición.",
          err: "Si la lumbar se levanta, sube las piernas: cuanto más bajas, más difícil.",
          repFactor: 0.6,
          alt: "En hollow hold, cuenta 1 rep por cada 3 segundos.",
        },
        {
          name: "Elevaciones de piernas colgado",
          pos: "Colgado de la barra, brazos estirados, piernas juntas y rectas.",
          mov: "Sube las piernas rectas hasta la horizontal y bájalas con control.",
          err: "Si necesitas impulso, dobla las rodillas hasta poder hacerlo sin balanceo.",
          repFactor: 0.5,
          alt: "Sin barra: elevaciones tumbado con las piernas rectas y la lumbar pegada.",
        },
        {
          name: "Plancha con apoyo de tres puntos",
          pos: "Plancha sobre antebrazos, cuerpo en línea, pies algo separados.",
          mov: "Despega un brazo o una pierna y aguanta 3 segundos por repetición, alternando.",
          err: "Si la cadera rota al despegar, separa más los pies y despega menos.",
          repFactor: 0.6,
          alt: "En plancha, despega un brazo o una pierna. 1 rep = 3 segundos.",
        },
      ],
      S: [
        {
          name: "L-sit / elevaciones estrictas a la barra",
          pos: "Sentado en el suelo, manos al lado de la cadera, brazos estirados empujando el suelo.",
          mov: "Despega la cadera y las piernas rectas del suelo y aguanta 3 segundos por repetición.",
          err: "Si las piernas no despegan, sube primero las rodillas y estira de a poco.",
          repFactor: 0.5,
          alt: "L-sit en el suelo o paraletas: 1 rep = 3 segundos.",
        },
        {
          name: "Toes to bar",
          pos: "Colgado de la barra, brazos estirados, cuerpo quieto.",
          mov: "Sube los pies hasta tocar la barra con las puntas y baja con control.",
          err: "Si te balanceas, para entre repeticiones: el impulso no cuenta.",
          repFactor: 0.4,
          alt: "Sin barra: elevaciones tumbado llevando los pies por encima de la cabeza.",
        },
        {
          name: "Negativa de dragon flag",
          pos: "Boca arriba, sujeto a la pata de un sillón o al marco de la cama, detrás de la cabeza.",
          mov: "Sube el cuerpo recto apoyado en los hombros y baja en 5 segundos sin doblar la cadera.",
          err: "Si la cadera se dobla al bajar, agrupa las rodillas y baja más corto.",
          repFactor: 0.4,
          alt: "Agárrate detrás de la cabeza y baja el cuerpo recto en 5 segundos. Sujétate a la pata de un sillón o al marco de la cama. Sin nada firme: hollow hold bajando las piernas hasta donde la lumbar siga pegada.",
        },
      ],
      Z: [
        {
          name: "Dragon flag / V-sit",
          pos: "Boca arriba, sujeto detrás de la cabeza, cuerpo recto apoyado solo en los hombros.",
          mov: "Baja el cuerpo en línea hasta rozar el suelo y súbelo sin doblar la cadera.",
          err: "Si la lumbar se arquea, el peso se te fue a la espalda: agrupa y vuelve a empezar.",
          repFactor: 0.4,
          alt: "Control total en la bajada. 1 rep = 1 repetición completa. Sin nada firme donde agarrarte, haz el V-sit: misma exigencia, sin anclaje.",
        },
        {
          name: "V-sit sostenido",
          pos: "Sentado, manos al lado de la cadera, brazos estirados empujando el suelo.",
          mov: "Sube las piernas rectas por encima de la cadera y aguanta 3 segundos por repetición.",
          err: "Si la espalda se redondea, baja las piernas hasta poder mantener el pecho arriba.",
          repFactor: 0.35,
          alt: "Piernas por encima de la cadera con los brazos rectos. 1 rep = 3 segundos.",
        },
        {
          name: "Rueda abdominal de pie",
          pos: "De pie con las piernas rectas, inclinado hacia adelante, un trapo bajo cada mano en el suelo.",
          mov: "Desliza las manos hacia adelante hasta casi tocar el suelo con el cuerpo y vuelve.",
          err: "Si la lumbar se arquea, no vayas tan lejos: para antes de perder la línea.",
          repFactor: 0.3,
          alt: "Sin rueda: dos trapos en el suelo, de pie, deslizando hacia delante. Sobre alfombra: desde plancha alta, camina las manos hacia adelante hasta donde la lumbar no se arquee.",
        },
      ],
    },
  },
  ra = [
    { id: "bodyweight", name: "Calistenia", desc: "Peso corporal, isométricos y control motor." },
    {
      id: "gym",
      name: "Fuerza de Acero",
      desc: "Gimnasio: pesas libres, máquinas y multiarticulares.",
    },
    {
      id: "flow",
      name: "Movilidad & Primal Flow",
      desc: "Patrones primal, animal flow y control articular.",
    },
  ],
  F2 = {
    pushup: {
      E: [
        {
          name: "Press de pecho en máquina",
          pos: "Sentado, espalda pegada al respaldo, las manos a la altura del pecho y no del cuello.",
          mov: "Empuja hasta casi estirar los brazos y vuelve con control hasta sentir el pecho estirado.",
          err: "Si los hombros se van hacia adelante al volver, no dejes ir tanto las manos.",
          repFactor: 1,
          alt: "Carga ligera, enfócate en el recorrido completo. Sin máquina: press banca con mancuernas, carga ligera.",
        },
        {
          name: "Press de hombro en máquina",
          pos: "Sentado, espalda apoyada en el respaldo, las manos a la altura de las orejas.",
          mov: "Empuja hacia arriba hasta casi estirar los brazos y baja con control.",
          err: "Si la lumbar se arquea, aprieta el abdomen y pega bien la espalda al respaldo.",
          repFactor: 1,
          alt: "Si la máquina está ocupada: press sentado con mancuernas ligeras.",
        },
        {
          name: "Press de pecho en polea de pie",
          pos: "De pie de espaldas a la polea, un pie adelante, las manijas a la altura del pecho.",
          mov: "Empuja las manijas al frente hasta juntar las manos y vuelve sin perder la tensión.",
          err: "Si el torso se va hacia adelante, adelanta más el pie de apoyo.",
          repFactor: 1,
          alt: "Un paso adelante para tensión constante. Sin poleas: mancuernas en banco plano.",
        },
      ],
      D: [
        {
          name: "Press banca con mancuernas",
          pos: "Acostado en un banco plano, pies firmes en el suelo, mancuernas a la altura del pecho.",
          mov: "Empuja hasta casi juntarlas arriba y baja hasta sentir el pecho estirado.",
          err: "Si los codos se abren a 90 grados, ciérralos a unos 45 del cuerpo.",
          repFactor: 1,
          alt: "Carga que te deje 2 reps de margen.",
        },
        {
          name: "Press inclinado con mancuernas",
          pos: "Banco a 30 grados, espalda apoyada, mancuernas a la altura del pecho alto.",
          mov: "Empuja hacia arriba y baja con control hasta el pecho.",
          err: "Si sientes más el hombro que el pecho, baja la inclinación del banco.",
          repFactor: 1,
          alt: "Banco a 30 grados. Más inclinación carga más el hombro.",
        },
        {
          name: "Fondos en máquina asistida",
          pos: "De pie o de rodillas en la plataforma, manos en las barras, brazos estirados y codos blandos.",
          mov: "Baja doblando los codos hasta que el brazo quede paralelo al suelo y empuja.",
          err: "Si el hombro molesta abajo, no bajes tanto: el rango se gana con el tiempo.",
          repFactor: 1,
          alt: "Sin máquina: fondos entre dos bancos con los pies apoyados.",
        },
      ],
      C: [
        {
          name: "Press banca con barra",
          pos: "Acostado con los ojos bajo la barra, escápulas juntas, pies firmes y seguros puestos.",
          mov: "Baja la barra hasta rozar el pecho a la altura del pezón y empuja hasta estirar.",
          err: "Si rebotas la barra en el pecho, usa menos carga: ese rebote no lo levantaste.",
          repFactor: 1,
          alt: "Usa seguros o un compañero si vas al fallo.",
        },
        {
          name: "Press inclinado con barra",
          pos: "Banco a 30 grados, escápulas juntas, barra sobre el pecho alto.",
          mov: "Baja hasta rozar la clavícula y empuja hasta estirar los brazos.",
          err: "Si la barra baja al esternón, estás haciendo un press plano a medias.",
          repFactor: 1,
          alt: "Banco a 30 grados, barra a la clavícula.",
        },
        {
          name: "Fondos en paralelas",
          pos: "Sostenido en las paralelas con los brazos estirados y los hombros lejos de las orejas.",
          mov: "Baja hasta que el brazo quede paralelo al suelo y empuja hasta estirar.",
          err: "Si los hombros suben a las orejas, bájalos antes de empezar cada repetición.",
          repFactor: 0.9,
          alt: "Torso algo inclinado para el pecho, vertical para el tríceps. Sin paralelas: fondos entre dos bancos con los pies apoyados.",
        },
      ],
      B: [
        {
          name: "Press militar de pie",
          pos: "De pie, barra apoyada en las clavículas, pies al ancho de la cadera, abdomen y glúteos apretados.",
          mov: "Empuja la barra sobre la cabeza pasando la cara y termina con la barra sobre la oreja.",
          err: "Si arqueas la lumbar para llegar, baja la carga: esa curva no la aguanta la espalda.",
          repFactor: 0.8,
          alt: "Core apretado, sin arquear la lumbar.",
        },
        {
          name: "Press banca con pausa en el pecho",
          pos: "Acostado con las escápulas juntas y los seguros puestos, barra sobre el pecho.",
          mov: "Baja hasta apoyar en el pecho, aguanta un segundo sin soltar la tensión y empuja.",
          err: "Si el pecho se hunde en la pausa, perdiste la posición: menos carga.",
          repFactor: 0.8,
          alt: "Un segundo apoyado en el pecho, sin rebote.",
        },
        {
          name: "Fondos en paralelas con lastre",
          pos: "Con el lastre colgando, sostenido en las paralelas y con los brazos estirados.",
          mov: "Baja hasta que el brazo quede paralelo al suelo y empuja hasta estirar.",
          err: "Si el lastre te balancea, aprieta las piernas y baja más lento.",
          repFactor: 0.7,
          alt: "Cinturón de lastre o una mancuerna entre los pies. Sin paralelas: fondos entre dos bancos con un disco sobre los muslos.",
        },
      ],
      A: [
        {
          name: "Press inclinado pesado",
          pos: "Banco a 30 grados, escápulas juntas, con seguros o con alguien que te cuide.",
          mov: "Series cortas bajando hasta el pecho alto y empujando con la técnica intacta.",
          err: "Si la barra se frena a mitad de camino, esa serie ya terminó.",
          repFactor: 0.6,
          alt: "Series cortas con carga alta.",
        },
        {
          name: "Press banca pesado con pausa",
          pos: "Acostado, escápulas juntas, pies firmes y seguros puestos siempre.",
          mov: "Baja la barra al pecho, aguanta dos segundos y empuja hasta estirar.",
          err: "Nunca hagas esto sin seguros: la pausa es justo donde una serie se cae.",
          repFactor: 0.55,
          alt: "Dos segundos en el pecho. Siempre con seguros.",
        },
        {
          name: "Press militar con mancuernas pesadas",
          pos: "De pie o sentado con respaldo, mancuernas a la altura de las orejas.",
          mov: "Empuja hacia arriba hasta casi juntarlas y baja con control.",
          err: "Si la lumbar se arquea, siéntate con respaldo antes que seguir de pie.",
          repFactor: 0.6,
          alt: "De pie o sentado con respaldo si la lumbar se arquea.",
        },
      ],
      S: [
        {
          name: "Press militar pesado / push press",
          pos: "De pie, barra en las clavículas, pies al ancho de la cadera.",
          mov: "Estricto: solo brazos. Push press: una flexión corta de rodillas y empuja aprovechando ese impulso.",
          err: "Si el impulso sale de la espalda y no de las piernas, no es un push press.",
          repFactor: 0.45,
          alt: "Técnica estricta antes que carga.",
        },
        {
          name: "Press banca pesado en series de 5",
          pos: "Acostado, escápulas juntas, seguros puestos y el agarre marcado siempre igual.",
          mov: "Cinco repeticiones controladas, con descanso largo entre series.",
          err: "Si la quinta repetición cambia la trayectoria, la próxima serie va con menos.",
          repFactor: 0.4,
          alt: "Descanso largo entre series. Nunca sin seguros.",
        },
        {
          name: "Fondos lastrados pesados",
          pos: "Con el lastre colgando, sostenido en las paralelas con los brazos estirados.",
          mov: "Baja hasta el paralelo y empuja hasta estirar, sin balancearte.",
          err: "Sube el lastre solo cuando el rango completo salga limpio, nunca antes.",
          repFactor: 0.4,
          alt: "Sube el lastre solo cuando el rango completo esté limpio. Sin cinturón de lastre: una mancuerna entre los pies o una mochila con discos.",
        },
      ],
      Z: [
        {
          name: "Press pesado con tempo 4s",
          pos: "Acostado en el banco con los seguros puestos, o de pie con la barra en las clavículas.",
          mov: "Baja en 4 segundos contados y empuja a velocidad normal.",
          err: "Si el último segundo se acelera, baja la carga: el tempo es el ejercicio.",
          repFactor: 0.35,
          alt: "4 segundos de descenso controlado.",
        },
        {
          name: "Press banca con pausa larga",
          pos: "Acostado, escápulas juntas y apretadas, seguros puestos.",
          mov: "Baja al pecho, aguanta tres segundos sin soltar la tensión de la espalda y empuja.",
          err: "Si en la pausa te relajas, la barra se hunde y salir cuesta el doble.",
          repFactor: 0.3,
          alt: "Tres segundos apoyado, sin perder la tensión de la espalda.",
        },
        {
          name: "Press militar estricto pesado",
          pos: "De pie, barra en las clavículas, piernas rectas y rodillas bloqueadas.",
          mov: "Empuja la barra sobre la cabeza sin flexionar las rodillas en ningún momento.",
          err: "Si necesitas impulso de piernas, baja la carga: ya dejó de ser estricto.",
          repFactor: 0.3,
          alt: "Sin ayuda de piernas. Si necesitas impulso, baja la carga.",
        },
      ],
    },
    back: {
      E: [
        {
          name: "Jalón al pecho en polea",
          pos: "Sentado con los muslos trabados bajo el rodillo, agarre ancho y brazos estirados arriba.",
          mov: "Lleva la barra al pecho bajando los codos hacia las costillas y sube con control.",
          err: "Si te echas muy atrás para llegar, baja la carga: el torso casi no se mueve.",
          repFactor: 1,
          alt: "Lleva la barra al pecho, codos abajo. Sin polea: dominadas asistidas con banda, o remo con mancuerna a una mano.",
        },
        {
          name: "Remo en máquina",
          pos: "Sentado con el pecho apoyado en la almohadilla, manos en las manijas y brazos estirados.",
          mov: "Tira hacia atrás juntando las escápulas y vuelve sin soltar del todo.",
          err: "Si el pecho se despega de la almohadilla, la espalda baja hace el trabajo.",
          repFactor: 1,
          alt: "Pecho apoyado si la máquina lo permite. Sin máquina: remo sentado en polea.",
        },
        {
          name: "Jalón en polea con agarre neutro",
          pos: "Sentado con los muslos trabados, agarre en paralelo con las palmas enfrentadas.",
          mov: "Tira hasta el pecho bajando los codos pegados al cuerpo y sube con control.",
          err: "Si tiras solo con los brazos, baja primero los hombros y después dobla los codos.",
          repFactor: 1,
          alt: "Agarre en paralelo, más cómodo para el hombro. Sin polea: dominadas con agarre neutro asistidas, o remo con mancuernas en banco inclinado.",
        },
      ],
      D: [
        {
          name: "Remo sentado en polea",
          pos: "Sentado con los pies en la plataforma, rodillas algo dobladas y espalda recta.",
          mov: "Tira la manija al ombligo juntando las escápulas y vuelve estirando los brazos.",
          err: "Si el torso se mece adelante y atrás, fíjalo: solo se mueven los brazos.",
          repFactor: 1,
          alt: "Espalda recta, escápulas juntas. Sin polea: remo con mancuernas sentado en un banco, torso a 45 grados.",
        },
        {
          name: "Remo con mancuernas a dos manos",
          pos: "De pie, torso inclinado a 45 grados, espalda recta, una mancuerna en cada mano.",
          mov: "Tira las mancuernas al abdomen con los codos pegados y baja estirando los brazos.",
          err: "Si el torso sube al tirar, baja la carga y mantén el ángulo quieto.",
          repFactor: 1,
          alt: "Torso a 45 grados, codos pegados al cuerpo.",
        },
        {
          name: "Pullover en polea",
          pos: "De pie frente a la polea alta, brazos casi rectos y la barra a la altura de la cara.",
          mov: "Baja la barra hasta los muslos con los brazos casi rectos y vuelve arriba.",
          err: "Si doblas los codos se convierte en un jalón y el dorsal deja de trabajar.",
          repFactor: 1,
          alt: "Brazos casi rectos, el movimiento sale del dorsal. Sin polea: pullover con mancuerna.",
        },
      ],
      C: [
        {
          name: "Remo con barra",
          pos: "De pie con la barra a la altura de la rodilla, torso a 45 grados y espalda recta.",
          mov: "Tira la barra al ombligo con los codos pegados y baja hasta estirar los brazos.",
          err: "Si la espalda se redondea o el torso sube, baja la carga: ahí se lesiona.",
          repFactor: 1,
          alt: "Torso a 45°, sin tirón lumbar.",
        },
        {
          name: "Dominadas asistidas en máquina",
          pos: "De rodillas o de pie sobre la plataforma, manos en la barra y brazos estirados.",
          mov: "Tira hasta pasar la barbilla y baja hasta estirar del todo.",
          err: "Cuanto más peso pones en la máquina, más te ayuda: bájalo de a poco.",
          repFactor: 1,
          alt: "Sin máquina: dominadas con banda elástica.",
        },
        {
          name: "Remo en T",
          pos: "De pie a horcajadas sobre la barra, torso inclinado y manos en el agarre en V.",
          mov: "Tira hacia el pecho juntando las escápulas y baja estirando los brazos.",
          err: "Si te enderezas para subir el peso, el dorsal deja de trabajar.",
          repFactor: 0.9,
          alt: "Sin barra T: barra en una esquina con una toalla, o remo con mancuerna.",
        },
      ],
      B: [
        {
          name: "Remo con mancuerna a una mano",
          pos: "Una rodilla y una mano apoyadas en el banco, la otra mano con la mancuerna colgando.",
          mov: "Tira la mancuerna a la cadera con el codo pegado y baja estirando el brazo.",
          err: "Si el torso gira para ayudar, baja el peso hasta que quede quieto.",
          repFactor: 0.7,
          alt: "Cuenta las reps por lado.",
        },
        {
          name: "Dominadas",
          pos: "Colgado de la barra con los brazos estirados, manos al ancho de los hombros.",
          mov: "Tira hasta pasar la barbilla por encima de la barra y baja hasta estirar del todo.",
          err: "Si te balanceas, aprieta glúteos y abdomen: el cuerpo no se mueve.",
          repFactor: 0.6,
          alt: "Sin barra: jalón al pecho con la carga más alta que controles.",
        },
        {
          name: "Remo Pendlay",
          pos: "Torso paralelo al suelo, barra apoyada en el piso, espalda recta.",
          mov: "Tira la barra al abdomen de forma explosiva y devuélvela al suelo en cada repetición.",
          err: "Si el torso sube al tirar no es Pendlay: quédate paralelo al suelo.",
          repFactor: 0.8,
          alt: "Cada repetición arranca con la barra en el suelo, sin usar la lumbar.",
        },
      ],
      A: [
        {
          name: "Dominadas lastradas",
          pos: "Con el lastre colgando, colgado de la barra con los brazos estirados.",
          mov: "Tira hasta pasar la barbilla y baja con control hasta estirar del todo.",
          err: "Si el rango se acorta con el lastre puesto, todavía es demasiado peso.",
          repFactor: 0.45,
          alt: "Añade poco peso y sube el rango completo. Sin cinturón de lastre: una mancuerna entre los pies o una mochila con discos.",
        },
        {
          name: "Remo con barra pesado",
          pos: "Torso a 45 grados, espalda recta, agarre firme y abdomen apretado.",
          mov: "Tira la barra al ombligo con los codos pegados y baja controlando.",
          err: "Si la espalda baja se redondea, es demasiado: ahí se rompe un disco.",
          repFactor: 0.6,
          alt: "Torso firme. Si la espalda baja se redondea, es demasiado.",
        },
        {
          name: "Dominadas supinadas lastradas",
          pos: "Colgado con las palmas hacia ti, manos al ancho de los hombros y el lastre puesto.",
          mov: "Tira hasta pasar la barbilla y baja hasta estirar del todo.",
          err: "Si el codo molesta, abre un poco el agarre o vuelve al agarre pronado.",
          repFactor: 0.45,
          alt: "Agarre supino, más bíceps y menos hombro. Sin cinturón de lastre: una mancuerna entre los pies o una mochila con discos.",
        },
      ],
      S: [
        {
          name: "Dominadas lastradas pesadas",
          pos: "Lastre alto colgando, colgado de la barra con los brazos estirados.",
          mov: "Series cortas tirando hasta pasar la barbilla y bajando con control.",
          err: "Descansa lo que haga falta: con lastre alto una serie apurada sale mal.",
          repFactor: 0.3,
          alt: "Series cortas, descanso amplio. Sin cinturón de lastre: una mancuerna entre los pies o una mochila con discos.",
        },
        {
          name: "Remo Pendlay pesado",
          pos: "Torso paralelo al suelo, barra en el piso, espalda recta y abdomen apretado.",
          mov: "Tira la barra al abdomen sin mover el torso y devuélvela al suelo.",
          err: "Si tienes que tirar con la cadera, baja la carga.",
          repFactor: 0.4,
          alt: "Sin balanceo. Si tienes que tirar con la cadera, baja la carga.",
        },
        {
          name: "Dominadas a una mano asistidas",
          pos: "Colgado de una mano, la otra tomando la muñeca o una toalla colgada de la barra.",
          mov: "Tira con el brazo principal hasta la barbilla, ayudando lo mínimo con el otro.",
          err: "Si el hombro se va hacia adelante, baja: ahí es donde se lesiona.",
          repFactor: 0.3,
          alt: "La otra mano en la muñeca o en una toalla colgada. Cuenta por lado.",
        },
      ],
      Z: [
        {
          name: "Remo pesado / dominada lastrada con tempo",
          pos: "Barra cargada con el torso a 45 grados, o colgado de la barra con lastre.",
          mov: "Sube a velocidad normal y baja en 3 segundos contados, sin soltar la tensión abajo.",
          err: "Si la bajada se acelera al final, baja la carga: el control es el ejercicio.",
          repFactor: 0.25,
          alt: "Control absoluto en la bajada. Sin cinturón de lastre: una mancuerna entre los pies o una mochila con discos.",
        },
        {
          name: "Dominada lastrada con pausa arriba",
          pos: "Colgado con lastre, brazos estirados y cuerpo quieto.",
          mov: "Sube hasta pasar la barbilla, aguanta dos segundos arriba y baja con control.",
          err: "Si en la pausa los hombros suben a las orejas, bájalos y junta las escápulas.",
          repFactor: 0.25,
          alt: "Dos segundos con la barbilla por encima de la barra. Sin cinturón de lastre: una mancuerna entre los pies o una mochila con discos.",
        },
        {
          name: "Remo con barra pesado a tempo",
          pos: "Torso a 45 grados, espalda recta, barra cargada y abdomen apretado.",
          mov: "Tira la barra al ombligo y baja en 3 segundos contados hasta estirar los brazos.",
          err: "Si el torso se levanta para aguantar la bajada, baja la carga.",
          repFactor: 0.3,
          alt: "Tres segundos de bajada en cada repetición.",
        },
      ],
    },
    squat: {
      E: [
        {
          name: "Prensa de piernas",
          pos: "Sentado en la prensa, espalda y cadera pegadas al respaldo, pies en la plataforma al ancho de los hombros.",
          mov: "Baja la plataforma doblando las rodillas hasta unos 90 grados y empuja sin estirar del todo.",
          err: "Si la cadera se despega del respaldo abajo, no bajes tanto: ahí se carga la lumbar.",
          repFactor: 1,
          alt: "Rodillas alineadas con los pies. Sin prensa: sentadilla goblet con mancuerna, o sentadilla a caja.",
        },
        {
          name: "Extensión de cuádriceps en máquina",
          pos: "Sentado, espalda apoyada, el rodillo sobre el empeine y la rodilla alineada con el eje de la máquina.",
          mov: "Estira las rodillas hasta arriba, aprieta un segundo y baja con control.",
          err: "Si la cadera salta del asiento para ayudar, baja la carga.",
          repFactor: 1.1,
          alt: "Sin máquina: sentadilla a caja con una mancuerna ligera.",
        },
        {
          name: "Curl femoral en máquina",
          pos: "Boca abajo o sentado según la máquina, el rodillo justo encima del talón.",
          mov: "Dobla las rodillas llevando el talón al glúteo y vuelve sin soltar del todo.",
          err: "Si la cadera se levanta de la camilla, baja la carga y aprieta el abdomen.",
          repFactor: 1.1,
          alt: "Sin máquina: peso muerto rumano con mancuernas ligeras.",
        },
      ],
      D: [
        {
          name: "Sentadilla goblet con mancuerna",
          pos: "De pie, una mancuerna sostenida con las dos manos contra el pecho, pies al ancho de los hombros.",
          mov: "Baja con el pecho arriba hasta que los codos pasen por dentro de las rodillas y sube.",
          err: "Si el pecho se va hacia adelante, usa menos peso: la mancuerna es el contrapeso.",
          repFactor: 1,
          alt: "Pecho arriba, baja controlado.",
        },
        {
          name: "Sentadilla en máquina Smith",
          pos: "Barra sobre los trapecios, pies algo adelantados respecto de la barra.",
          mov: "Baja hasta que el muslo quede paralelo al suelo y sube empujando con los pies.",
          err: "Si la rodilla molesta, adelanta más los pies: la barra no te deja corregir sobre la marcha.",
          repFactor: 1,
          alt: "Pies algo adelantados. Sin Smith: sentadilla goblet.",
        },
        {
          name: "Hip thrust con barra",
          pos: "Sentado en el suelo con la espalda alta apoyada en un banco y la barra sobre la cadera con una almohadilla.",
          mov: "Empuja con los talones hasta alinear rodillas, cadera y hombros, aprieta arriba y baja.",
          err: "Si arqueas la lumbar arriba, mete la barbilla al pecho y la pelvis hacia dentro.",
          repFactor: 1,
          alt: "Espalda alta apoyada en un banco, barbilla al pecho. Sin barra: una mancuerna pesada sobre la cadera, o puente de glúteos a una pierna.",
        },
      ],
      C: [
        {
          name: "Sentadilla con barra",
          pos: "Barra sobre los trapecios, dentro del rack y con los seguros puestos, pies al ancho de los hombros.",
          mov: "Baja llevando la cadera atrás hasta que el muslo pase de paralelo y sube.",
          err: "Si la espalda baja se redondea al final, para justo antes: eso es lo que lesiona.",
          repFactor: 1,
          alt: "Usa los seguros del rack.",
        },
        {
          name: "Peso muerto rumano",
          pos: "De pie con la barra a la altura del muslo, rodillas casi rectas, espalda recta.",
          mov: "Lleva la cadera atrás bajando la barra pegada a la pierna hasta sentir tirón en el isquio.",
          err: "Si la barra se separa de la pierna, la espalda hace el trabajo: acércala otra vez.",
          repFactor: 1,
          alt: "Rodillas casi fijas, la cadera va atrás. Espalda recta siempre.",
        },
        {
          name: "Prensa a una pierna",
          pos: "Sentado en la prensa, un solo pie en el centro de la plataforma y el otro apoyado al costado.",
          mov: "Baja hasta unos 90 grados y empuja, sin bloquear la rodilla arriba.",
          err: "Si la cadera se inclina hacia un lado, baja la carga hasta mantenerla pareja.",
          repFactor: 0.8,
          alt: "Cuenta las reps por pierna. Sin prensa: zancada con mancuernas.",
        },
      ],
      B: [
        {
          name: "Zancadas con mancuernas",
          pos: "De pie, una mancuerna en cada mano, brazos al costado.",
          mov: "Da un paso al frente y baja hasta que la rodilla de atrás quede a un dedo del suelo, y vuelve.",
          err: "Si te vas de lado, separa un poco los pies: no caminas sobre una línea.",
          repFactor: 0.8,
          alt: "Cuenta las reps por pierna.",
        },
        {
          name: "Sentadilla búlgara con mancuernas",
          pos: "De pie con el empeine de atrás sobre un banco y el pie de adelante a un paso largo.",
          mov: "Baja recto hasta que el muslo de adelante quede paralelo al suelo y sube.",
          err: "Si la rodilla de adelante pasa mucho el pie, aleja más el pie de atrás.",
          repFactor: 0.7,
          alt: "Pie trasero en un banco. Cuenta las reps por pierna.",
        },
        {
          name: "Peso muerto convencional",
          pos: "De pie con los pies bajo la barra, agarre por fuera de las rodillas, pecho arriba y espalda recta.",
          mov: "Empuja el suelo con los pies y sube la barra pegada a la pierna hasta quedar de pie.",
          err: "Si la cadera sube antes que el pecho, la espalda hace todo el trabajo: baja la carga.",
          repFactor: 0.8,
          alt: "Barra pegada a las piernas, empuja el suelo con los pies.",
        },
      ],
      A: [
        {
          name: "Sentadilla frontal / peso muerto",
          pos: "Frontal: barra sobre los deltoides delanteros y codos altos. Peso muerto: barra en el suelo y agarre firme.",
          mov: "Baja con el torso vertical y sube, o levanta la barra empujando el suelo con los pies.",
          err: "Si los codos caen en la frontal, la barra se va adelante: usa menos peso.",
          repFactor: 0.55,
          alt: "Carga alta, técnica intacta.",
        },
        {
          name: "Hip thrust pesado",
          pos: "Espalda alta apoyada en un banco, barra con almohadilla sobre la cadera, pies firmes.",
          mov: "Sube hasta alinear rodillas, cadera y hombros, aguanta un segundo apretando el glúteo y baja.",
          err: "Si no sientes el glúteo, acerca los pies al cuerpo.",
          repFactor: 0.6,
          alt: "Pausa de un segundo arriba, glúteo apretado.",
        },
        {
          name: "Sentadilla búlgara pesada",
          pos: "Empeine de atrás sobre un banco, mancuernas pesadas en las manos o barra sobre la espalda.",
          mov: "Baja recto hasta que el muslo de adelante quede paralelo al suelo y sube.",
          err: "Si pierdes el equilibrio, baja la carga: con peso alto un traspié es una lesión.",
          repFactor: 0.5,
          alt: "Cuenta las reps por pierna. Sube la carga solo si no pierdes el equilibrio.",
        },
      ],
      S: [
        {
          name: "Sentadilla pesada / peso muerto pesado",
          pos: "Dentro del rack con los seguros a la altura del fondo, o la barra en el suelo con el agarre listo.",
          mov: "Series cortas de fuerza máxima, bajando y subiendo con la técnica intacta.",
          err: "Si la técnica cambia en la última repetición, esa serie ya terminó.",
          repFactor: 0.4,
          alt: "Series de fuerza máxima.",
        },
        {
          name: "Sentadilla frontal pesada",
          pos: "Barra sobre los deltoides delanteros, codos bien altos, dedos apenas debajo de la barra.",
          mov: "Baja con el torso vertical hasta el fondo y sube empujando el suelo con los pies.",
          err: "Si no llegas al agarre, usa correas o agarre cruzado, pero no bajes los codos.",
          repFactor: 0.4,
          alt: "Codos altos. Si no llegas al agarre, usa correas o agarre cruzado.",
        },
        {
          name: "Peso muerto rumano pesado",
          pos: "De pie con la barra a la altura del muslo, rodillas casi rectas, espalda recta.",
          mov: "Lleva la cadera atrás con la barra pegada a la pierna, solo hasta donde la espalda siga recta.",
          err: "Si buscas más rango doblando la espalda, cambiaste el ejercicio por otro peor.",
          repFactor: 0.45,
          alt: "Baja solo hasta donde la espalda siga recta.",
        },
      ],
      Z: [
        {
          name: "Sentadilla pesada con tempo 4s",
          pos: "Barra sobre los trapecios, dentro del rack y con los seguros puestos.",
          mov: "Baja en 4 segundos contados hasta el fondo y sube a velocidad normal.",
          err: "Si el último segundo se te va de golpe, baja la carga: el tempo es el ejercicio.",
          repFactor: 0.3,
          alt: "Descenso de 4 segundos bajo carga.",
        },
        {
          name: "Peso muerto con pausa bajo la rodilla",
          pos: "De pie con los pies bajo la barra, espalda recta y pecho arriba.",
          mov: "Sube hasta media canilla, aguanta dos segundos ahí y sigue hasta quedar de pie.",
          err: "Si en la pausa la espalda se redondea, corta la serie: esa es la posición peligrosa.",
          repFactor: 0.3,
          alt: "Dos segundos detenido a media canilla, sin redondear.",
        },
        {
          name: "Sentadilla frontal pesada a tempo",
          pos: "Barra sobre los deltoides delanteros, codos altos, seguros del rack puestos.",
          mov: "Baja en 3 segundos contados y sube sin rebotar abajo.",
          err: "Si rebotas para salir del fondo, el tempo no sirvió de nada.",
          repFactor: 0.3,
          alt: "Tres segundos de bajada, sin rebote abajo.",
        },
      ],
    },
    abs: {
      E: [
        {
          name: "Crunch en máquina",
          pos: "Sentado con la espalda apoyada y las manos en las manijas, a la altura del pecho.",
          mov: "Acerca las costillas a la cadera curvando la columna y vuelve con control.",
          err: "Si tiras con los brazos o el cuello, baja la carga: el movimiento es del abdomen.",
          repFactor: 1,
          alt: "Carga ligera, sin tirar del cuello. Sin máquina: crunch en el suelo abrazando un disco contra el pecho.",
        },
        {
          name: "Plancha frontal",
          pos: "Antebrazos y puntas de los pies en el suelo, codos bajo los hombros, cuerpo en línea.",
          mov: "Aguanta apretando abdomen y glúteos, contando 3 segundos por repetición.",
          err: "Si la cadera sube, eso es descanso y no plancha: bájala hasta la línea.",
          repFactor: 0.67,
          alt: "1 rep = 3 segundos de sostén.",
        },
        {
          name: "Pallof press en polea",
          pos: "De pie de costado a la polea, la manija con las dos manos contra el pecho, pies firmes.",
          mov: "Estira los brazos al frente aguantando sin que el torso rote, y vuelve al pecho.",
          err: "Si el torso gira, aléjate de la polea o baja la carga.",
          repFactor: 1,
          alt: "De lado a la polea, saca los brazos sin que el torso rote. Sin polea: banda elástica atada a un poste, o plancha tocando el hombro contrario.",
        },
      ],
      D: [
        {
          name: "Plancha con disco",
          pos: "Plancha sobre los antebrazos con un disco apoyado en la espalda alta.",
          mov: "Aguanta la línea apretando abdomen y glúteos, 3 segundos por repetición.",
          err: "Si la lumbar se hunde con el disco puesto, sácalo: la línea vale más.",
          repFactor: 0.46,
          alt: "1 rep = 3 segundos de sostén. Sin disco: una mochila cargada apoyada en la espalda alta.",
        },
        {
          name: "Crunch en polea de rodillas",
          pos: "De rodillas frente a la polea alta, la cuerda al lado de la cara y los codos doblados.",
          mov: "Curva la columna llevando los codos hacia los muslos y vuelve con control.",
          err: "Si te doblas por la cadera es una reverencia, no un crunch: mueve solo la columna.",
          repFactor: 1,
          alt: "El movimiento es de columna, no de cadera. Sin polea: crunch en el suelo.",
        },
        {
          name: "Elevación de rodillas en paralelas",
          pos: "Apoyado en los antebrazos en la torre de paralelas, espalda contra el respaldo.",
          mov: "Sube las rodillas hasta la altura de la cadera y bájalas con control.",
          err: "Si te balanceas, para en cada repetición antes de volver a subir.",
          repFactor: 0.9,
          alt: "Sin paralelas: elevación de rodillas colgado de la barra.",
        },
      ],
      C: [
        {
          name: "Rueda abdominal de rodillas",
          pos: "De rodillas con la rueda bajo los hombros y los brazos estirados.",
          mov: "Rueda hacia adelante todo lo que controles y vuelve tirando del abdomen.",
          err: "Si la lumbar se arquea, no vayas tan lejos: la cadera no se hunde.",
          repFactor: 1,
          alt: "No dejes caer la cadera. Sin rueda: una barra con discos que giren, o dos trapos bajo las manos.",
        },
        {
          name: "Elevaciones de piernas colgado",
          pos: "Colgado de la barra, brazos estirados, piernas juntas y rectas.",
          mov: "Sube las piernas rectas hasta la horizontal y bájalas con control.",
          err: "Si necesitas impulso, dobla las rodillas hasta poder hacerlo sin balanceo.",
          repFactor: 0.8,
          alt: "Sin barra: elevaciones tumbado con la lumbar pegada al suelo.",
        },
        {
          name: "Plancha lateral con disco",
          pos: "De costado sobre un antebrazo, codo bajo el hombro, un disco sobre la cadera de arriba.",
          mov: "Sube la cadera hasta alinear hombro, cadera y tobillo y aguanta 3 segundos por repetición.",
          err: "Si la cadera se cae con el disco, sácalo y mantén la línea limpia.",
          repFactor: 0.33,
          alt: "1 rep = 3 segundos por lado. Sin disco: una mochila cargada apoyada en la cadera.",
        },
      ],
      B: [
        {
          name: "Elevaciones colgado con lastre",
          pos: "Colgado de la barra con un lastre entre los pies o en los tobillos.",
          mov: "Sube las piernas hasta la horizontal y bájalas con control, sin balanceo.",
          err: "Si el lastre te hace balancear, baja el peso antes que perder el control.",
          repFactor: 0.7,
          alt: "Sin balanceo.",
        },
        {
          name: "Rueda abdominal de rodillas con lastre",
          pos: "De rodillas con la rueda bajo los hombros y un disco o chaleco en la espalda.",
          mov: "Rueda hacia adelante lo que controles y vuelve tirando del abdomen.",
          err: "Si la cadera baja, quita el lastre: con peso encima la lumbar paga el error.",
          repFactor: 0.7,
          alt: "Disco en la espalda o chaleco. La cadera no baja. Sin rueda: barra con discos que giren y un disco en la espalda.",
        },
        {
          name: "Crunch en polea pesado",
          pos: "De rodillas frente a la polea alta, la cuerda al lado de la cara.",
          mov: "Curva la columna con rango corto llevando los codos hacia los muslos y vuelve.",
          err: "Si tiras con los brazos, suelta carga: el abdomen tiene que sentirlo.",
          repFactor: 0.8,
          alt: "Carga alta y rango corto, sin tirón de brazos. Sin polea: crunch en el suelo con un disco detrás de la cabeza.",
        },
      ],
      A: [
        {
          name: "Pallof press pesado",
          pos: "De pie de costado a la polea con carga alta, manija contra el pecho, base firme.",
          mov: "Estira los brazos al frente y aguanta 3 segundos por repetición sin rotar.",
          err: "Si la cadera se abre hacia la polea, baja la carga: es anti-rotación, no un press.",
          repFactor: 0.18,
          alt: "Anti-rotación: 1 rep = 3 s de tensión. Sin polea: banda gruesa atada a un poste, la misma tensión.",
        },
        {
          name: "Toes to bar lastrado",
          pos: "Colgado de la barra con lastre en los tobillos, brazos estirados y cuerpo quieto.",
          mov: "Sube los pies hasta tocar la barra y baja con control.",
          err: "Si te balanceas, para entre repeticiones: el impulso no cuenta.",
          repFactor: 0.5,
          alt: "Sin lastre: toes to bar estricto, sin balanceo.",
        },
        {
          name: "Plancha con lastre",
          pos: "Plancha sobre los antebrazos con un disco en la espalda alta, cuerpo en línea.",
          mov: "Aguanta apretando abdomen y glúteos, 3 segundos por repetición.",
          err: "Si la lumbar se hunde, el disco está mal puesto o es demasiado.",
          repFactor: 0.18,
          alt: "Disco en la espalda alta. 1 rep = 3 segundos. Sin disco: una mochila bien cargada.",
        },
      ],
      S: [
        {
          name: "Rueda abdominal de pie",
          pos: "De pie con las piernas rectas, inclinado hacia adelante y la rueda en el suelo.",
          mov: "Rueda hacia adelante hasta casi tocar el suelo con el cuerpo y vuelve.",
          err: "Si la lumbar se arquea, para antes: esta versión no perdona.",
          repFactor: 0.45,
          alt: "Progresión máxima de anti-extensión. Sin rueda: una barra con discos que giren, de pie.",
        },
        {
          name: "Elevaciones a la barra con lastre",
          pos: "Colgado de la barra con lastre en los tobillos y el cuerpo quieto.",
          mov: "Sube los pies hasta tocar la barra sin impulso y baja con control.",
          err: "Sube el lastre de a poco: el agarre suele fallar antes que el abdomen.",
          repFactor: 0.4,
          alt: "Pies a la barra, sin impulso. Sube el lastre de a poco.",
        },
        {
          name: "Dragon flag",
          pos: "Acostado en un banco, sujeto detrás de la cabeza al respaldo o a los soportes del rack.",
          mov: "Sube el cuerpo recto apoyado en los hombros y bájalo en línea sin doblar la cadera.",
          err: "Si la cadera se dobla, agrupa las rodillas y baja más corto.",
          repFactor: 0.45,
          alt: "Agárrate detrás de la cabeza y mantén el cuerpo en una sola línea. Sujétate al respaldo de un banco o a los soportes del rack.",
        },
      ],
      Z: [
        {
          name: "Rueda de pie con tempo",
          pos: "De pie con las piernas rectas, inclinado, la rueda en el suelo bajo los hombros.",
          mov: "Rueda hacia adelante lo más lento que controles y vuelve igual de lento.",
          err: "Si la vuelta sale de golpe, acorta el recorrido y conserva el tempo.",
          repFactor: 0.35,
          alt: "Máximo tiempo bajo tensión. Sin rueda: barra con discos, bajando lo más lento que controles.",
        },
        {
          name: "Dragon flag con lastre",
          pos: "Acostado en un banco, sujeto detrás de la cabeza, tobilleras o un disco entre los pies.",
          mov: "Sube el cuerpo recto y bájalo en línea con control total.",
          err: "Si la lumbar se arquea al bajar, quita el lastre antes de seguir.",
          repFactor: 0.3,
          alt: "Tobilleras o un disco entre los pies. Control total en la bajada.",
        },
        {
          name: "Rueda de pie desde una elevación",
          pos: "De pie con los pies en un escalón, inclinado hacia adelante y la rueda en el suelo.",
          mov: "Rueda hacia adelante aprovechando el recorrido extra y vuelve.",
          err: "Si no puedes volver sin apoyar, baja del escalón: esta es la versión más larga.",
          repFactor: 0.3,
          alt: "Los pies en un escalón para alargar el recorrido. Sin rueda: barra con discos y los pies en un escalón.",
        },
      ],
    },
  },
  P2 = {
    squat: {
      E: [
        {
          name: "Sentadilla profunda con apoyo (sostén)",
          pos: "De pie frente a algo firme donde sujetarte, pies al ancho de los hombros y punteras algo hacia afuera.",
          mov: "Baja hasta el fondo, con la cadera cerca de los talones, y aguanta ahí.",
          err: "Si los talones se despegan, apoya algo fino debajo o separa un poco más los pies.",
          repFactor: 1,
          alt: "1 rep = 3 segundos en la posición baja.",
        },
        {
          name: "Ginga de capoeira",
          pos: "De pie, pies al ancho de los hombros, rodillas blandas y una mano suelta delante de la cara.",
          mov: "Lleva un pie atrás en diagonal doblando las dos rodillas, vuelve al centro y repite con el otro.",
          err: "Si el cuerpo queda rígido, baja el centro de gravedad: la ginga se hace en semicuclillas.",
          repFactor: 1,
          alt: "El paso base: un pie atrás en diagonal y vuelta al centro, alternando sin parar. 1 rep = 1 ciclo completo.",
        },
        {
          name: "Sentadilla profunda con balanceo",
          pos: "En el fondo de una sentadilla profunda, talones en el suelo y codos por dentro de las rodillas.",
          mov: "Mece el peso de un pie al otro sin levantarte del fondo.",
          err: "Si te levantas para pasar de un lado al otro, la cadera deja de trabajar.",
          repFactor: 1,
          alt: "Abajo del todo, mece el peso de un pie al otro sin levantarte.",
        },
      ],
      D: [
        {
          name: "Movilidad de cadera 90/90",
          pos: "Sentado en el suelo, una pierna doblada al frente y la otra al costado, las dos a 90 grados.",
          mov: "Gira las dos rodillas al otro lado hasta invertir la posición, sin usar las manos.",
          err: "Si necesitas las manos, abre más el ángulo entre las piernas antes de girar.",
          repFactor: 1,
          alt: "Rotación completa sin usar las manos.",
        },
        {
          name: "Negativa de capoeira",
          pos: "En cuclillas con los talones apoyados y una mano en el suelo al costado.",
          mov: "Estira una pierna al costado bajando el torso, y vuelve a cuclillas. Alterna lados.",
          err: "Si la cadera toca el suelo, el peso está en la pierna equivocada: cárgalo en la doblada.",
          repFactor: 0.9,
          alt: "Desde cuclillas, una pierna estirada al costado y el torso bajo, apoyando una mano. Cuenta las reps por lado.",
        },
        {
          name: "Toprock: paso indio",
          pos: "De pie, pies al ancho de la cadera, rodillas blandas y el peso en la planta del pie.",
          mov: "Cruza un pie por delante del otro y vuelve a abrir, alternando al ritmo.",
          err: "Si pisas con el talón pierdes el rebote: el toprock vive en la planta.",
          repFactor: 1,
          alt: "De pie, cruza y abre alternando al ritmo. 1 rep = 1 ciclo.",
        },
      ],
      C: [
        {
          name: "Sentadilla cosaca de movilidad",
          pos: "De pie con los pies bien separados y las punteras algo hacia afuera.",
          mov: "Baja sobre una pierna estirando la otra al costado, y pasa al otro lado con control.",
          err: "Si el talón de la pierna que baja se despega, apoya las manos delante y baja menos.",
          repFactor: 1,
          alt: "Alterna lados con control.",
        },
        {
          name: "Rolê",
          pos: "En la negativa: cuclillas con una pierna estirada al costado y una mano en el suelo.",
          mov: "Rueda bajo hacia el otro lado pasando el peso por las manos, sin apoyar la cadera.",
          err: "Si te sientas al pasar, el rolê se corta: la cadera va despegada todo el recorrido.",
          repFactor: 0.9,
          alt: "Rodada baja de lado a lado pasando por la negativa, sin apoyar la cadera. Cuenta las reps por lado.",
        },
        {
          name: "2-step de footwork",
          pos: "En cuclillas bajas con las dos manos y un pie en el suelo, la otra pierna estirada.",
          mov: "Cruza la pierna estirada por delante y vuelve, alternando el apoyo.",
          err: "Si te sientas, sube la cadera: el peso va repartido entre las manos y el pie.",
          repFactor: 1,
          alt: "Manos y un pie en el suelo, la otra pierna cruza y vuelve. 1 rep = 1 ciclo.",
        },
      ],
      B: [
        {
          name: "Crab reach (puente de cangrejo)",
          pos: "Sentado con las manos detrás y los pies apoyados, cadera despegada del suelo.",
          mov: "Suelta una mano y llévala por encima de la cabeza abriendo el pecho al techo, y vuelve.",
          err: "Si la cadera baja al soltar la mano, empuja más con los pies y con el hombro de apoyo.",
          repFactor: 0.8,
          alt: "Abre el pecho al techo en cada rep.",
        },
        {
          name: "6-step de footwork",
          pos: "En cuclillas bajas con las dos manos en el suelo y el peso repartido entre manos y pies.",
          mov: "Da seis pasos en círculo alrededor de las manos, pasando una pierna por delante y otra por detrás.",
          err: "Si apoyas las rodillas, subiste demasiado la cadera: quédate bajo.",
          repFactor: 0.8,
          alt: "El círculo básico de breakdance sobre las manos. 1 rep = 1 vuelta completa.",
        },
        {
          name: "Sentadilla cosaca con paso",
          pos: "De pie con los pies bien separados y las punteras algo hacia afuera.",
          mov: "Baja sobre una pierna y desplázate al otro lado sin subir en ningún momento.",
          err: "Si te levantas para cruzar, se vuelven dos cosacas sueltas.",
          repFactor: 0.7,
          alt: "Baja a un lado y desplázate al otro sin subir. Cuenta las reps por lado.",
        },
      ],
      A: [
        {
          name: "Underswitch",
          pos: "En posición de bestia: cuadrupedia con las rodillas flotando a un palmo del suelo.",
          mov: "Pasa una pierna por debajo del cuerpo hasta quedar de cangrejo, y vuelve por el mismo camino.",
          err: "Si la cadera toca el suelo al pasar, sube más el hombro del lado que se abre.",
          repFactor: 0.6,
          alt: "Pasa la pierna por debajo con fluidez.",
        },
        {
          name: "CC de footwork",
          pos: "En cuclillas bajas con las dos manos en el suelo y una pierna estirada.",
          mov: "Barre el suelo con la pierna estirada dibujando un arco y cambia el apoyo. Alterna lados.",
          err: "Si la pierna se dobla al barrer, acorta el arco antes que perder la línea.",
          repFactor: 0.5,
          alt: "Variante del 6-step con la pierna estirada barriendo el suelo. Cuenta las reps por lado.",
        },
        {
          name: "Sentadilla a una pierna con rotación",
          pos: "De pie sobre una pierna con la otra estirada al frente, brazos adelante.",
          mov: "Baja a una pierna y sal girando el cuerpo hacia el costado de la pierna libre.",
          err: "Si pierdes el equilibrio en el giro, baja menos y gira desde más arriba.",
          repFactor: 0.5,
          alt: "Baja a una pierna y sal girando hacia el costado. Cuenta las reps por lado.",
        },
      ],
      S: [
        {
          name: "Kickthrough continuo",
          pos: "En posición de bestia, rodillas flotando y hombros sobre las manos.",
          mov: "Saca una pierna cruzada por debajo del cuerpo, gira la cadera y vuelve, alternando sin parar.",
          err: "Si la cadera toca el suelo, sube el hombro contrario y acorta la patada.",
          repFactor: 0.5,
          alt: "Sin tocar el suelo con la cadera.",
        },
        {
          name: "Macaco",
          pos: "En cuclillas con los pies apoyados y una mano en el suelo detrás de la cadera, dedos hacia ti.",
          mov: "Empuja con las piernas y pasa la cadera por encima de ese hombro, cayendo del otro lado.",
          err: "Si el peso te cae en la muñeca, gira más la mano hacia afuera y mira al suelo.",
          repFactor: 0.4,
          alt: "Desde cuclillas, una mano atrás y el cuerpo pasa por encima del hombro. Cuenta las reps por lado.",
        },
        {
          name: "6-step con cambios de dirección",
          pos: "En cuclillas bajas con las manos en el suelo, ya en movimiento.",
          mov: "Haz el círculo completo y cambia el sentido sin detenerte entre una vuelta y la siguiente.",
          err: "Si necesitas parar para cambiar, vas más rápido de lo que controlas.",
          repFactor: 0.45,
          alt: "Cambia el sentido del círculo sin detenerte. 1 rep = 1 vuelta.",
        },
      ],
      Z: [
        {
          name: "Secuencia de flow enlazada",
          pos: "En el suelo, en la posición de arranque de la primera transición que elijas.",
          mov: "Encadena las transiciones que ya dominas sin pausa entre una y la siguiente.",
          err: "Si te detienes a pensar la que viene, acorta la secuencia hasta que salga sola.",
          repFactor: 0.4,
          alt: "Encadena sin pausas entre transiciones.",
        },
        {
          name: "Ginga, aú y macaco enlazados",
          pos: "De pie en ginga, con espacio libre a los dos costados.",
          mov: "Desde la ginga sal a la rueda lateral, cae y entra directo al macaco.",
          err: "Si necesitas acomodarte entre un elemento y el otro, el enlace todavía no está.",
          repFactor: 0.35,
          alt: "Tres elementos sin parar entre uno y otro. 1 rep = 1 pasada completa.",
        },
        {
          name: "Footwork continuo a ritmo",
          pos: "En cuclillas bajas con las manos en el suelo y el peso repartido.",
          mov: "Mantén el círculo girando al ritmo, sin apoyar rodillas ni cadera.",
          err: "Si apoyas la rodilla para descansar, esa vuelta no cuenta.",
          repFactor: 0.35,
          alt: "Mantén el círculo sin apoyar rodillas ni cadera. 1 rep = 1 vuelta.",
        },
      ],
    },
    pushup: {
      E: [
        {
          name: "Traslado de peso en cuadrupedia",
          pos: "Manos y rodillas en el suelo, manos bajo los hombros y rodillas bajo la cadera.",
          mov: "Lleva el peso adelante hasta que los hombros pasen las muñecas, y vuelve.",
          err: "Si la muñeca molesta, reparte el peso en toda la palma y no solo en el talón de la mano.",
          repFactor: 1,
          alt: "Manos y rodillas en el suelo, lleva el peso adelante sobre las manos y vuelve. 1 rep = 1 ciclo.",
        },
        {
          name: "Movilidad de muñecas apoyado",
          pos: "De rodillas con las palmas en el suelo y los dedos apuntando hacia las rodillas.",
          mov: "Haz círculos y traslados de peso sobre las palmas, y después sobre el dorso de las manos.",
          err: "Si duele, saca peso: esto prepara todo lo que viene y no se fuerza.",
          repFactor: 1.1,
          alt: "Círculos y traslados sobre las palmas, también sobre el dorso. Es la preparación de todo lo que viene después.",
        },
        {
          name: "Queda de rins asistida",
          pos: "De costado, una mano en el suelo y el codo de ese brazo clavado en el hueso de la cadera.",
          mov: "Reparte el peso entre esa mano y ese codo y aguanta, con los pies todavía ayudando.",
          err: "Si el codo resbala, búscalo más arriba: tiene que quedar trabado en la cresta de la cadera.",
          repFactor: 0.9,
          alt: "De costado, el codo clavado en la cadera y el peso repartido entre mano y codo. 1 rep = 3 segundos por lado.",
        },
      ],
      D: [
        {
          name: "Flexión de oso",
          pos: "En posición de bestia: cuadrupedia con las rodillas a un palmo del suelo.",
          mov: "Baja el pecho doblando los codos y empuja hasta estirar, sin apoyar las rodillas.",
          err: "Si las rodillas tocan el suelo, súbelas antes de bajar el pecho.",
          repFactor: 1,
          alt: "En posición de bestia, con las rodillas a un palmo del suelo, baja el pecho y sube.",
        },
        {
          name: "Fondo de cangrejo",
          pos: "Sentado con las manos detrás, dedos hacia los pies, cadera despegada del suelo.",
          mov: "Dobla los codos bajando la cadera casi hasta el suelo y empuja hasta estirar.",
          err: "Si el hombro molesta, gira las manos un poco hacia afuera.",
          repFactor: 1,
          alt: "Sentado, manos detrás y cadera despegada, dobla los codos y sube.",
        },
        {
          name: "Perro boca abajo a plancha",
          pos: "Manos y pies en el suelo con la cadera bien alta, cuerpo en forma de V invertida.",
          mov: "Pasa el peso adelante hasta quedar en plancha alta y vuelve a subir la cadera.",
          err: "Si la lumbar se hunde en la plancha, aprieta glúteos antes de pasar adelante.",
          repFactor: 1,
          alt: "Cadera alta y luego cuerpo recto, pasando el peso a las manos. 1 rep = 1 ciclo.",
        },
      ],
      C: [
        {
          name: "Aú asistido (rueda con apoyo)",
          pos: "De pie de costado con las piernas separadas y una mano ya apuntando al suelo.",
          mov: "Apoya una mano y después la otra pasando las piernas dobladas por arriba, y cae del otro lado.",
          err: "Si te caes hacia adelante, mira las manos al pasar y no al frente.",
          repFactor: 0.8,
          alt: "La rueda lateral de capoeira, pasando por la pared o con las piernas dobladas. Cuenta las reps por lado.",
        },
        {
          name: "Baby freeze asistido",
          pos: "En cuclillas con una mano en el suelo y el codo de esa mano clavado en el costado del abdomen.",
          mov: "Carga el peso sobre ese codo y la cabeza, con un pie todavía apoyado, y aguanta.",
          err: "Si te vas hacia adelante, baja más la cadera y acerca la cabeza a las manos.",
          repFactor: 0.46,
          alt: "Codo clavado en el costado y la cabeza como tercer apoyo, con un pie en el suelo. 1 rep = 3 segundos.",
        },
        {
          name: "Pino contra la pared (bananeira)",
          pos: "De espaldas a la pared, en plancha alta con los pies apoyados en el rodapié.",
          mov: "Camina los pies por la pared y las manos hacia ella hasta quedar casi vertical, y aguanta.",
          err: "Si la lumbar se arquea, aprieta glúteos y abdomen: el cuerpo va en una línea.",
          repFactor: 0.46,
          alt: "De espaldas a la pared, sube caminando los pies. 1 rep = 3 segundos.",
        },
      ],
      B: [
        {
          name: "Aú (rueda lateral completa)",
          pos: "De pie de costado con las piernas bien separadas y los brazos arriba.",
          mov: "Apoya una mano y después la otra pasando por la vertical con las piernas estiradas, y cae de pie.",
          err: "Si las piernas se doblan estás pasando bajo: apunta a que pasen por encima de la cabeza.",
          repFactor: 0.7,
          alt: "Piernas estiradas y paso limpio por la vertical. Cuenta las reps por lado.",
        },
        {
          name: "Baby freeze",
          pos: "Una mano en el suelo con el codo clavado en el costado del abdomen, la otra mano apoyada y la cabeza como tercer punto.",
          mov: "Despega los dos pies y aguanta el equilibrio sobre codo, mano y cabeza.",
          err: "Si te caes hacia adelante baja más la cadera; si te caes hacia atrás, súbela.",
          repFactor: 0.33,
          alt: "Sin apoyo de pies, solo codo, mano y cabeza. 1 rep = 3 segundos.",
        },
        {
          name: "Wall walk hacia el pino",
          pos: "En plancha alta de espaldas a la pared, con los pies apoyados en el rodapié.",
          mov: "Camina los pies por la pared hacia arriba y las manos hacia la pared, hasta quedar con el pecho cerca.",
          err: "Si la lumbar se arquea al subir, para ahí y baja: no sigas caminando las manos.",
          repFactor: 0.7,
          alt: "De frente a la pared, camina los pies hacia arriba y las manos hacia la pared.",
        },
      ],
      A: [
        {
          name: "Queda de rins",
          pos: "De costado, una mano en el suelo y el codo de ese brazo clavado en la cresta de la cadera.",
          mov: "Pasa todo el peso a esa mano y ese codo, despega los pies y aguanta.",
          err: "Si apoyas la cabeza todavía no es queda de rins: baja el tiempo antes que la calidad.",
          repFactor: 0.25,
          alt: "Todo el peso en la mano y el codo, sin apoyar la cabeza. 1 rep = 3 segundos por lado.",
        },
        {
          name: "Pino de cara a la pared",
          pos: "De espaldas a la pared, en plancha, caminando hasta quedar vertical con el pecho hacia la pared.",
          mov: "Deja las manos a un palmo del rodapié, estira las puntas al techo y aguanta.",
          err: "Si la lumbar se arquea, aprieta glúteos y mete las costillas hacia dentro.",
          repFactor: 0.25,
          alt: "Pecho hacia la pared y manos a un palmo del rodapié. 1 rep = 3 segundos.",
        },
        {
          name: "Elbow freeze",
          pos: "En cuclillas con las dos manos en el suelo y los dos codos clavados en el abdomen.",
          mov: "Pasa el peso adelante hasta despegar los pies y aguanta el cuerpo horizontal.",
          err: "Si los codos resbalan, búscalos más adentro, contra el hueso de la cadera.",
          repFactor: 0.25,
          alt: "Los dos codos clavados en el abdomen, cuerpo horizontal. 1 rep = 3 segundos.",
        },
      ],
      S: [
        {
          name: "Pino libre (bananeira)",
          pos: "De pie con una pierna adelantada y los brazos arriba junto a las orejas, lejos de la pared.",
          mov: "Apoya las manos y patea con la pierna de atrás hasta la vertical, y aguanta.",
          err: "Si te pasas, sal girando hacia un costado: nunca aguantes una caída de espaldas.",
          repFactor: 0.16,
          alt: "Entrada con patada controlada lejos de la pared. 1 rep = 3 segundos.",
        },
        {
          name: "Flexión en pino contra la pared",
          pos: "En pino contra la pared, manos a un palmo del rodapié y el cuerpo estirado.",
          mov: "Baja hasta rozar el suelo con la cabeza y empuja hasta estirar los brazos.",
          err: "Si no llegas a subir, haz solo la bajada lenta: la fuerza viene de ahí.",
          repFactor: 0.4,
          alt: "Baja hasta rozar la cabeza y sube. Si no llegas, haz solo la bajada.",
        },
        {
          name: "Aú batido",
          pos: "De pie de costado con las piernas separadas y los brazos arriba.",
          mov: "Haz la rueda con las piernas juntas y frena un instante en la vertical antes de caer.",
          err: "Si no puedes frenar arriba, todavía te falta pino: practica el sostén contra la pared.",
          repFactor: 0.4,
          alt: "Rueda con las piernas juntas y pausa arriba. Cuenta las reps por lado.",
        },
      ],
      Z: [
        {
          name: "Pino libre con caminata",
          pos: "En pino libre, cuerpo en una sola línea y la mirada entre las manos.",
          mov: "Da pasos cortos con las manos sin perder la línea del cuerpo.",
          err: "Si la cadera se va hacia un lado, para y recupera la vertical antes de seguir.",
          repFactor: 0.35,
          alt: "Camina sobre las manos sin perder la línea. 1 rep = 1 paso.",
        },
        {
          name: "Flexión en pino libre",
          pos: "En pino libre lejos de la pared, cuerpo estirado y hombros abiertos.",
          mov: "Baja con control hasta rozar el suelo con la cabeza y empuja hasta estirar.",
          err: "Si pierdes el equilibrio hacia adelante, corrige con los dedos, nunca con la espalda.",
          repFactor: 0.3,
          alt: "Sin pared. Control total en la bajada.",
        },
        {
          name: "Molino (windmill): progresión",
          pos: "Sentado en el suelo apoyado en un hombro, piernas abiertas en V y manos listas para apoyar.",
          mov: "Gira las piernas abiertas pasando el peso de un hombro a la espalda y al otro hombro.",
          err: "Si la cabeza golpea el suelo, mete la barbilla y practica sobre una superficie blanda.",
          repFactor: 0.3,
          alt: "Desde la espalda, gira las piernas abiertas pasando por los hombros. 1 rep = 1 vuelta.",
        },
      ],
    },
    back: {
      E: [
        {
          name: "Retracción escapular colgado",
          pos: "Colgado de la barra con los brazos estirados y los hombros sueltos junto a las orejas.",
          mov: "Baja los hombros alejándolos de las orejas sin doblar los codos, y vuelve a soltarlos.",
          err: "Si doblas los codos ya es una dominada: el movimiento es solo de escápulas.",
          repFactor: 1,
          alt: "Colgado de la barra, sube y baja los hombros sin doblar los codos. Sin barra: boca abajo en el suelo, despega el pecho juntando las escápulas.",
        },
        {
          name: "Arrastre con trapos",
          pos: "Boca abajo con un trapo bajo cada mano y los brazos estirados adelante.",
          mov: "Tira del piso con una mano y con la otra para arrastrar el cuerpo hacia adelante.",
          err: "Si empujas con los pies el dorsal deja de trabajar: que las piernas vayan muertas.",
          repFactor: 1,
          alt: "Boca abajo, un trapo bajo cada mano, tira del suelo para avanzar. 1 rep = 1 brazada. Sin trapos o sobre alfombra: arrastre de comando, tirando con los codos.",
        },
        {
          name: "Colgarse pasivo",
          pos: "Colgado de la barra con los brazos estirados y todo el cuerpo relajado.",
          mov: "Deja que el peso te estire la espalda y los hombros, y aguanta.",
          err: "Si el agarre falla antes que la espalda, baja, sacude las manos y vuelve a colgarte.",
          repFactor: 0.8,
          alt: "Hombros sueltos, deja que la espalda se estire. 1 rep = 3 segundos. Sin barra: cuélgate del marco de una puerta con los pies apoyados.",
        },
      ],
      D: [
        {
          name: "Colgarse activo",
          pos: "Colgado de la barra con los brazos estirados y los hombros junto a las orejas.",
          mov: "Baja los hombros y llévalos atrás sin doblar los codos, y aguanta.",
          err: "Si el pecho se hunde, saca el esternón: la espalda se aprieta, no se encoge.",
          repFactor: 0.8,
          alt: "Hombros abajo y atrás sin doblar los codos. 1 rep = 3 segundos. Sin barra: en el marco de una puerta con los pies apoyados, deja caer el peso y baja los hombros.",
        },
        {
          name: "Arrastre de comando",
          pos: "Boca abajo apoyado en los antebrazos, con las piernas estiradas y sueltas.",
          mov: "Avanza clavando un codo en el suelo y tirando del cuerpo, alternando brazos.",
          err: "Si te ayudas con las rodillas el dorsal deja de tirar: deja las piernas muertas.",
          repFactor: 1,
          alt: "Boca abajo sobre los antebrazos, avanza tirando con los codos. 1 rep = 1 brazada.",
        },
        {
          name: "Rolê con tracción de brazo",
          pos: "En la negativa: cuclillas con una pierna estirada al costado y una mano en el suelo.",
          mov: "Rueda hacia el otro lado tirando del suelo con la mano de apoyo, no empujando.",
          err: "Si empujas en vez de tirar, el ejercicio deja de ser de espalda.",
          repFactor: 0.9,
          alt: "En la rodada baja, tira del suelo con la mano de apoyo. Cuenta las reps por lado.",
        },
      ],
      C: [
        {
          name: "Macaco asistido",
          pos: "En cuclillas con una mano en el suelo detrás de la cadera y la otra al costado para ayudar.",
          mov: "Tira del suelo con la mano de atrás para pasar la cadera por encima de ese hombro.",
          err: "Si el hombro se va hacia adelante, acerca más la mano al cuerpo antes de tirar.",
          repFactor: 0.7,
          alt: "Desde cuclillas, una mano atrás; tira del suelo para pasar la cadera por encima del hombro, ayudándote con la otra mano. Cuenta las reps por lado.",
        },
        {
          name: "Balanceo colgado",
          pos: "Colgado de la barra con los brazos estirados y el cuerpo quieto.",
          mov: "Inicia el balanceo desde la espalda, abriendo y cerrando el hombro.",
          err: "Si pateas con las piernas, el impulso no sale de donde tiene que salir.",
          repFactor: 0.7,
          alt: "El impulso sale de la espalda, no de las piernas. 1 rep = 1 balanceo completo. Sin barra: arrastre de foca, tirando fuerte con los dos brazos a la vez.",
        },
        {
          name: "Arrastre de foca",
          pos: "Boca abajo con las manos en el suelo junto al pecho y las piernas estiradas y sueltas.",
          mov: "Tira del suelo con los dos brazos a la vez para avanzar, arrastrando las piernas.",
          err: "Si la cadera se levanta, bájala: tiene que ir arrastrando todo el tiempo.",
          repFactor: 0.9,
          alt: "Piernas muertas, avanzas solo con los brazos. 1 rep = 1 brazada.",
        },
      ],
      B: [
        {
          name: "Macaco",
          pos: "En cuclillas con una mano en el suelo detrás de la cadera, dedos hacia ti, la otra mano libre.",
          mov: "Empuja con las piernas y tira del suelo pasando la cadera por encima de ese hombro.",
          err: "Si necesitas la segunda mano, vuelve unas semanas al macaco asistido.",
          repFactor: 0.55,
          alt: "Sin ayuda de la segunda mano. Cuenta las reps por lado.",
        },
        {
          name: "Skin the cat agrupado",
          pos: "Colgado de la barra con los brazos estirados y las rodillas al pecho.",
          mov: "Pasa las rodillas entre los brazos y sigue bajando por detrás hasta donde el hombro aguante.",
          err: "Si el hombro tira fuerte, para y vuelve: este es el movimiento donde más se rompe un hombro.",
          repFactor: 0.5,
          alt: "Colgado, pasa las rodillas entre los brazos y baja por detrás. Sin barra: rodada hacia atrás agrupada en el suelo.",
        },
        {
          name: "Tracción a la barra desde el suelo",
          pos: "Boca arriba bajo una barra baja, manos en la barra y talones en el suelo.",
          mov: "Tira hasta que el pecho toque la barra y baja hasta estirar los brazos.",
          err: "Si la cadera se cae, aprieta glúteos: el cuerpo va en una sola línea.",
          repFactor: 0.5,
          alt: "Barra baja, pies apoyados, tira hasta el pecho. Sin barra: arrastre con trapos tirando fuerte. Sobre alfombra, donde los trapos no deslizan: arrastre de comando cuesta arriba.",
        },
      ],
      A: [
        {
          name: "Skin the cat completo",
          pos: "Colgado de la barra con los brazos estirados y las piernas juntas y rectas.",
          mov: "Pasa las piernas estiradas entre los brazos y baja por detrás hasta donde el hombro aguante.",
          err: "Baja solo hasta donde controles la vuelta: si no puedes volver, bajaste de más.",
          repFactor: 0.4,
          alt: "Piernas estiradas al pasar. Baja solo hasta donde el hombro aguante. Sin barra: rodada hacia atrás con las piernas estiradas, frenando con los brazos.",
        },
        {
          name: "Macaco alto",
          pos: "En cuclillas con una mano en el suelo detrás de la cadera, dedos hacia ti.",
          mov: "Pasa la cadera por encima de la línea del hombro, más alto que en el macaco normal.",
          err: "Si la cadera no sube, empuja más fuerte con las piernas al arrancar.",
          repFactor: 0.4,
          alt: "Cadera por encima de la línea del hombro. Cuenta las reps por lado.",
        },
        {
          name: "Escalada en la barra",
          pos: "Colgado de una barra larga con los brazos estirados y el cuerpo quieto.",
          mov: "Avanza soltando una mano por vez y trasladándola al costado.",
          err: "Si te balanceas al soltar, aprieta el abdomen y avanza más corto.",
          repFactor: 0.4,
          alt: "Colgado, avanza de mano en mano. 1 rep = 1 traslado. Sin barra: arrastre de comando cuesta arriba.",
        },
      ],
      S: [
        {
          name: "Front lever agrupado",
          pos: "Colgado de la barra con las rodillas al pecho y los brazos estirados.",
          mov: "Lleva el torso a la horizontal mirando al techo y aguanta.",
          err: "Si la cadera se cae, agrúpate más: primero la posición y después el tiempo.",
          repFactor: 0.3,
          alt: "Rodillas al pecho y torso horizontal. 1 rep = 3 segundos. Sin barra: boca abajo, despega pecho y piernas y lleva los brazos atrás como si remaras. 1 rep = 3 segundos.",
        },
        {
          name: "Macaco a una mano asistido",
          pos: "En cuclillas con una mano en el suelo detrás de la cadera y la otra apenas rozando el piso.",
          mov: "Pasa la cadera por encima del hombro cargando casi todo el peso en la mano de atrás.",
          err: "Si la segunda mano empuja, quítale peso hasta que solo roce.",
          repFactor: 0.3,
          alt: "La segunda mano apenas roza el suelo. Cuenta las reps por lado.",
        },
        {
          name: "Colgarse a una mano",
          pos: "Colgado de la barra con una mano, la otra tomando esa muñeca.",
          mov: "Deja el peso en el brazo principal y aguanta.",
          err: "Si el hombro se va hacia arriba, bájalo: colgarse muerto de un brazo lesiona.",
          repFactor: 0.3,
          alt: "La otra mano en la muñeca. 1 rep = 3 segundos por lado. Sin barra: del marco de una puerta a una mano, con los pies apoyados sacándoles peso.",
        },
      ],
      Z: [
        {
          name: "Front lever completo",
          pos: "Colgado de la barra con las piernas juntas y rectas y los brazos estirados.",
          mov: "Sube el cuerpo hasta la horizontal en una sola línea y aguanta.",
          err: "Si la cadera se hunde, agrupa una pierna antes que romper la línea.",
          repFactor: 0.25,
          alt: "Cuerpo en una sola línea. 1 rep = 3 segundos. Sin barra: arrastre de foca con los pies sobre una silla, tirando solo con los brazos.",
        },
        {
          name: "Macaco a una mano",
          pos: "En cuclillas con una sola mano en el suelo detrás de la cadera, la otra libre.",
          mov: "Pasa la cadera por encima de ese hombro sin ningún apoyo extra.",
          err: "Si el hombro se abre demasiado, acerca la mano al cuerpo antes de empujar.",
          repFactor: 0.25,
          alt: "Sin apoyo de la segunda mano. Cuenta las reps por lado.",
        },
        {
          name: "Skin the cat a front lever",
          pos: "Colgado de la barra con las piernas estiradas, listo para pasarlas por detrás.",
          mov: "Sal del skin the cat frenando justo en la horizontal, sin apoyar nada.",
          err: "Si pasas de largo, todavía no tienes el front lever: quédate en el skin the cat.",
          repFactor: 0.25,
          alt: "Sal del skin the cat directo a la horizontal, sin apoyar. 1 rep = 1 pasada. Sin barra: rodada atrás con las piernas estiradas, frenando en horizontal sobre los antebrazos.",
        },
      ],
    },
    abs: {
      E: [
        {
          name: "Beast hold",
          pos: "Cuadrupedia con las manos bajo los hombros y las rodillas bajo la cadera.",
          mov: "Despega las rodillas un palmo del suelo y aguanta.",
          err: "Si la cadera sube, bájala: la espalda queda plana como una mesa.",
          repFactor: 1,
          alt: "1 rep = 3 segundos con rodillas flotando.",
        },
        {
          name: "Crab hold (posición de cangrejo)",
          pos: "Sentado con las manos detrás, dedos hacia los pies, y los pies apoyados.",
          mov: "Sube la cadera hasta alinearla con hombros y rodillas y aguanta.",
          err: "Si el hombro molesta, gira las manos hacia afuera o acércalas al cuerpo.",
          repFactor: 1,
          alt: "Sentado, manos detrás y cadera arriba, alineada con hombros y rodillas. 1 rep = 3 segundos.",
        },
        {
          name: "Rodada agrupada adelante y atrás",
          pos: "Sentado en el suelo abrazando las rodillas contra el pecho, espalda redondeada.",
          mov: "Mécete hacia atrás y vuelve adelante sin golpear la espalda.",
          err: "Si la espalda golpea, agrúpate más: la columna tiene que quedar redonda.",
          repFactor: 1,
          alt: "Sentado, abraza las rodillas y mécete sin golpear la espalda. 1 rep = 1 ciclo.",
        },
      ],
      D: [
        {
          name: "Deadbug con control articular",
          pos: "Boca arriba, brazos al techo y rodillas sobre la cadera a 90 grados.",
          mov: "Estira a la vez un brazo y la pierna contraria rozando el suelo, y vuelve con control.",
          err: "Si la lumbar se despega, no estires del todo: el suelo manda.",
          repFactor: 1,
          alt: "Lumbar pegada al suelo.",
        },
        {
          name: "Beast hold levantando una mano",
          pos: "En posición de bestia, rodillas flotando y pies algo separados.",
          mov: "Despega una mano unos centímetros y aguanta sin que la cadera rote.",
          err: "Si la cadera gira, separa más los pies antes de despegar la mano.",
          repFactor: 0.57,
          alt: "Sin que la cadera rote. 1 rep = 3 segundos por lado.",
        },
        {
          name: "Ginga baja en el suelo",
          pos: "En cuclillas bajas con las manos listas para apoyar y los talones cerca del suelo.",
          mov: "Cambia de lado llevando un pie atrás en diagonal, sin subir de las cuclillas.",
          err: "Si te levantas para cambiar, perdiste la posición baja, que es justo lo que trabaja.",
          repFactor: 1,
          alt: "La base de capoeira pero en cuclillas, cambiando de lado sin subir. 1 rep = 1 ciclo.",
        },
      ],
      C: [
        {
          name: "Bear crawl (caminata de oso)",
          pos: "En posición de bestia, rodillas a un palmo del suelo y hombros sobre las manos.",
          mov: "Avanza moviendo a la vez la mano y el pie contrarios.",
          err: "Si la cadera se balancea de lado a lado, da pasos más cortos.",
          repFactor: 1,
          alt: "1 rep = 1 paso con brazo y pierna opuestos.",
        },
        {
          name: "Crab walk hacia atrás",
          pos: "En posición de cangrejo, con la cadera alta y las manos detrás.",
          mov: "Avanza de espaldas moviendo mano y pie contrarios, sin bajar la cadera.",
          err: "Si la cadera baja, el glúteo dejó de trabajar: súbela y sigue.",
          repFactor: 0.9,
          alt: "Cadera alta, avanza de espaldas. 1 rep = 1 paso.",
        },
        {
          name: "Rodada lateral controlada",
          pos: "Boca arriba con los brazos junto a las orejas y las piernas estiradas.",
          mov: "Gira hasta quedar boca abajo sin usar las manos ni tomar impulso.",
          err: "Si necesitas impulso, empieza el giro desde una pierna y deja que el cuerpo siga.",
          repFactor: 1,
          alt: "Boca arriba, gira a boca abajo sin usar manos ni impulso. 1 rep = 1 vuelta.",
        },
      ],
      B: [
        {
          name: "Crab walk",
          pos: "En posición de cangrejo, cadera alta y alineada con hombros y rodillas.",
          mov: "Camina en cualquier dirección manteniendo la cadera arriba todo el recorrido.",
          err: "Si la cadera baja aunque sea un paso, para y súbela antes de seguir.",
          repFactor: 0.8,
          alt: "Cadera alta todo el recorrido.",
        },
        {
          name: "Underswitch lento",
          pos: "En posición de bestia, con las rodillas flotando.",
          mov: "Pasa una pierna por debajo del cuerpo hasta quedar de cangrejo y vuelve, sin tocar el suelo.",
          err: "Si la cadera toca, el ejercicio se reinicia: ve más lento antes que más lejos.",
          repFactor: 0.8,
          alt: "Desde bestia, pasa una pierna por debajo hasta cangrejo y vuelve, sin que la cadera toque el suelo.",
        },
        {
          name: "Kickthrough (patada cruzada)",
          pos: "En posición de bestia, rodillas flotando y pies algo separados.",
          mov: "Saca una pierna cruzada por debajo del cuerpo abriendo la cadera, y vuelve. Alterna lados.",
          err: "Si el hombro contrario se hunde, empuja el suelo con esa mano al patear.",
          repFactor: 0.8,
          alt: "Desde bestia, saca una pierna cruzada por debajo del cuerpo. Cuenta las reps por lado.",
        },
      ],
      A: [
        {
          name: "Scorpion reach",
          pos: "En posición de bestia, rodillas flotando y hombros sobre las manos.",
          mov: "Lleva una pierna atrás y arriba cruzando por encima del cuerpo, girando hasta abrir el pecho.",
          err: "Si la lumbar se aplasta, sube menos la pierna y gira desde la cadera.",
          repFactor: 0.6,
          alt: "Rotación completa desde posición de bestia.",
        },
        {
          name: "Baby freeze sostenido",
          pos: "Codo clavado en el costado del abdomen, la otra mano apoyada y la cabeza como tercer punto.",
          mov: "Aguanta el equilibrio con los dos pies despegados del suelo.",
          err: "Si el codo resbala, clávalo más arriba, contra el hueso de la cadera.",
          repFactor: 0.22,
          alt: "1 rep = 3 segundos. Si te caes hacia delante, baja más la cadera.",
        },
        {
          name: "Queda de rins sostenida",
          pos: "De costado, con el codo clavado en la cresta de la cadera y la mano en el suelo.",
          mov: "Aguanta todo el peso en esa mano y ese codo.",
          err: "Si el hombro de apoyo se hunde, empuja el suelo y aléjalo de la oreja.",
          repFactor: 0.22,
          alt: "1 rep = 3 segundos por lado.",
        },
      ],
      S: [
        {
          name: "Transiciones de flow en suelo",
          pos: "En posición de bestia, con espacio libre alrededor.",
          mov: "Encadena bestia, escorpión y cambio bajo sin parar entre uno y otro.",
          err: "Si necesitas reacomodarte entre transiciones, ve más lento hasta que salgan pegadas.",
          repFactor: 0.5,
          alt: "Encadena bestia, escorpión y cambio bajo.",
        },
        {
          name: "6-step continuo",
          pos: "En cuclillas bajas con las manos en el suelo y el peso repartido.",
          mov: "Haz el círculo completo de seis pasos sin apoyar las rodillas.",
          err: "Si apoyas la rodilla, sube la cadera y acorta el paso.",
          repFactor: 0.45,
          alt: "El círculo completo sin apoyar rodillas. 1 rep = 1 vuelta.",
        },
        {
          name: "Shoulder freeze",
          pos: "Sentado en el suelo con un hombro apoyado y las dos manos listas para sostener.",
          mov: "Sube las piernas hasta quedar invertido, con el peso entre el hombro y las manos.",
          err: "Si el cuello carga el peso, pásalo al hombro: la cabeza no sostiene nada.",
          repFactor: 0.15,
          alt: "Peso repartido entre hombro y manos, cuerpo invertido. 1 rep = 3 segundos.",
        },
      ],
      Z: [
        {
          name: "Flow completo sin pausas",
          pos: "En el suelo, en la posición de arranque de tu secuencia.",
          mov: "Encadena una secuencia larga de transiciones sin una sola pausa.",
          err: "Si cortas para pensar, acorta la secuencia: la fluidez importa más que el largo.",
          repFactor: 0.4,
          alt: "Secuencia larga de control total.",
        },
        {
          name: "Footwork enlazado con freeze",
          pos: "En cuclillas bajas con las manos en el suelo, ya girando el footwork.",
          mov: "Entra a un freeze desde el círculo, aguanta y vuelve al footwork sin cortar el ritmo.",
          err: "Si paras antes de entrar al freeze, el enlace no existe: la entrada sale del giro.",
          repFactor: 0.35,
          alt: "Entra y sale de un freeze sin cortar el ritmo. 1 rep = 1 pasada.",
        },
        {
          name: "Macaco a queda de rins enlazados",
          pos: "En cuclillas con una mano en el suelo detrás de la cadera.",
          mov: "Haz el macaco y al caer entra directo a la queda de rins, sin apoyar la cadera.",
          err: "Si la cadera toca entre uno y otro, practica la caída del macaco por separado.",
          repFactor: 0.35,
          alt: "Sin apoyar la cadera entre uno y otro. Cuenta las reps por lado.",
        },
      ],
    },
  };
function qn(e) {
  let a = (e && e.modalities) || ["bodyweight"];
  return a.length ? a : ["bodyweight"];
}
function Md(e, a, l) {
  let n = qn(e);
  if (l && n.includes(l)) return l;
  if (n.length === 1) return n[0];
  let o = Dd(a || ue(), n.length);
  return n[o];
}
function $2(e) {
  return e === "gym" ? F2 : e === "flow" ? P2 : null;
}
var yy = {
  principiante: { squat: 12, pushup: 8, back: 8, abs: 12 },
  intermedio: { squat: 18, pushup: 12, back: 10, abs: 18 },
  avanzado: { squat: 24, pushup: 16, back: 14, abs: 24 },
};
function _d(e, a, l, fx) {
  var n = $2(l),
    o = n && n[e] && n[e][a] ? n[e][a] : null;
  if (!o) {
    var b = by[e] || by.squat;
    o = b[a] || b.C;
  }
  if (!o) return { name: "", repFactor: 1, alt: "" };
  if (!Array.isArray(o)) return o;
  if (o.length < 2) return o[0] || { name: "", repFactor: 1, alt: "" };
  return o[Dd(String(fx || ue()) + "|" + e + "|" + a + "|" + String(l || "bodyweight"), o.length)];
}
var gy = {
  E: { rounds: 3, pct: 0.6, note: "Cadencia controlada, sin prisa." },
  D: { rounds: 3, pct: 0.7, note: "Sin descanso entre ejercicios." },
  C: { rounds: 4, pct: 0.7, note: "Superserie: encadena los cuatro patrones." },
  B: { rounds: 4, pct: 0.75, note: "Descanso máximo de 30 s entre rondas." },
  A: { rounds: 5, pct: 0.75, note: "Descanso máximo de 15 s entre rondas." },
  S: { rounds: 5, pct: 0.8, note: "Sin cortes. La prueba del Dominio Total." },
};
function I2(e, a, l, n, tr) {
  let o = gy[e] || gy.C,
    s = jd(e, a, l, n, tr),
    u = {};
  for (let c of Object.keys(s)) u[c] = Math.max(1, Math.round(s[c] * o.pct));
  return { rounds: o.rounds, note: o.note, reps: u };
}
var Nd = [
    {
      id: "fuerza",
      name: "Ganancia Muscular / Fuerza Máxima",
      repMult: 0.65,
      xpMult: 1.5,
      streakBonus: 0,
      ajuste: "Repeticiones base bajas, multiplicador de XP alto por serie completada.",
      ventaja: "Mayor ganancia de atributos de Fuerza y progresión en ejercicios complejos.",
      desventaja: "Menor margen de error técnico y mayor exigencia en tiempos de descanso.",
    },
    {
      id: "resistencia",
      name: "Resistencia / Acondicionamiento Físico",
      repMult: 1.4,
      xpMult: 0.8,
      streakBonus: 0,
      ajuste: "Repeticiones base altas, mayor volumen total de entrenamiento.",
      ventaja: "Aumento rápido del atributo de Resistencia y mayor gasto energético por sesión.",
      desventaja: "Genera mayor fatiga muscular acumulada durante la semana.",
    },
    {
      id: "salud",
      name: "Salud / Movilidad & Control Motriz",
      repMult: 1,
      xpMult: 1,
      streakBonus: 0.15,
      ajuste: "Repeticiones moderadas, bonificación de XP (+15%) por racha de días constantes.",
      ventaja: "Menor riesgo de sobrecarga, recuperación más rápida y sostenible a largo plazo.",
      desventaja: "Ritmo de incremento de fuerza máxima más pausado.",
    },
  ],
  R2 = 3,
  qd = 3;
function Dl(e, a) {
  let l = e.today.date;
  return (
    e.week.sessionDates || (e.week.sessionDates = []),
    e.week.reps || (e.week.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    e.dayLog || (e.dayLog = {}),
    e.dayLog[l] || (e.dayLog[l] = { acts: [], reps: null, xp: 0 }),
    a && !e.dayLog[l].acts.includes(a) && e.dayLog[l].acts.push(a),
    e.week.sessionDates.includes(l) ||
      (e.week.sessionDates.push(l),
      (e.week.trained = e.week.sessionDates.length),
      e.streak.missed >= 3 &&
        (e.maxComebackStreak = Math.max(e.maxComebackStreak || 0, e.streak.missed)),
      (e.streak.missed = 0),
      (e.streak.current += 1),
      (e.streak.best = Math.max(e.streak.best || 0, e.streak.current)),
      e.history[l] || (e.history[l] = "partial")),
    e
  );
}
function _n(e) {
  return (e.profile && e.profile.weeklyGoal) || qd;
}
function qy(e) {
  let l = new Date(e + "T00:00:00").getDay();
  return 7 - (l === 0 ? 6 : l - 1);
}
function Od(e) {
  return Nd.find((a) => a.id === e) || Nd[2];
}
var e5 = 1.01,
  a5 = 7;
function Oy(e, a) {
  let l = a || e.progress.rank,
    n = Md(e.profile, e.today && e.today.date, e.today && e.today.modality),
    o = jd(l, e.profile.classification, e.profile.focusProfile, n, e.profile.testResults);
  if (l !== "Z") return o;
  let s = e.records || {},
    u = {};
  for (let c of Object.keys(o)) {
    let r = s[c] || 0;
    u[c] = r > 0 ? Math.max(o[c], Math.ceil(r * e5), r + 1) : o[c];
  }
  return u;
}
function sdcPuntaje(p) {
  var t = p && p.testResults;
  if (!t) return 0;
  return iu(Number(t.squat) || 0, Number(t.pushup) || 0, Number(t.abs) || 0, Number(t.back) || 0);
}
function sdcCalibre(p) {
  var t = p && p.testResults;
  if (!t) return null;
  var sq = Number(t.squat) || 0,
    pu = Number(t.pushup) || 0,
    ab = Number(t.abs) || 0,
    bk = Number(t.back) || 0;
  if (!sq && !pu && !ab && !bk) return null;
  var b = wy(sq, pu, ab, bk, sdcRitmoF(p));
  return b ? sdcCalT(vy.indexOf(b), p) : null;
}
var sdcModBase = {
  gym: { squat: 50, pushup: 45, back: 45, abs: 50 },
  flow: { squat: 40, pushup: 36, back: 36, abs: 40 },
};
function sdcBase(tr, cl, mod) {
  var mb = sdcModBase[mod];
  if (mb) return mb;
  var b = yy[cl] || yy.intermedio;
  if (!tr) return b;
  var K = 1.15,
    sq = Number(tr.squat) || 0,
    pu = Number(tr.pushup) || 0,
    ab = Number(tr.abs) || 0,
    bk = Number(tr.back) || 0;
  if (!sq && !pu && !ab) return b;
  var cp = function (v) {
    return Math.min(v, 340);
  };
  return {
    squat: Math.max(b.squat, cp(Math.round(sq * K))),
    pushup: Math.max(b.pushup, cp(Math.round(pu * K))),
    back: Math.max(b.back, cp(Math.round((bk > 0 ? bk : pu * 0.85) * K))),
    abs: Math.max(b.abs, cp(Math.round(ab * K))),
  };
}
function jd(e, a, l, n, tr) {
  let o = Od(l).repMult,
    s = W2[e] || 1,
    u = sdcBase(tr, a, n),
    c = {};
  for (let r of Object.keys(u))
    c[r] = Math.max(1, Math.round(u[r] * s * _d(r, e, n).repFactor * o));
  return c;
}
function t5(e) {
  let a = Od(e.profile.focusProfile),
    l = a.xpMult;
  return (a.streakBonus && e.streak.current >= R2 && (l *= 1 + a.streakBonus), l);
}
function li(e) {
  return e < 50 ? 45 + e * 3 : 5 * e - 55;
}
function jy(e, a) {
  let l = a;
  for (let n = 1; n < e; n++) l += li(n);
  return l;
}
function __fechaLocal(d) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
}
function ue() {
  return __fechaLocal(new Date());
}
function By(e) {
  let a = new Date(e + "T00:00:00"),
    l = a.getDay(),
    n = (l === 0 ? -6 : 1) - l;
  return (a.setDate(a.getDate() + n), __fechaLocal(a));
}
var vy = [
  {
    min: 0,
    max: 29,
    rank: "E",
    classification: "principiante",
    label: "Principiante Base",
    focus: "Acondicionamiento y movilidad",
  },
  {
    min: 30,
    max: 66,
    rank: "D",
    classification: "principiante",
    label: "Principiante Consolidado",
    focus: "Control motor y fuerza básica",
  },
  {
    min: 67,
    max: 114,
    rank: "C",
    classification: "intermedio",
    label: "Intermedio Inicial",
    focus: "Volumen e intensidad moderada",
  },
  {
    min: 115,
    max: 168,
    rank: "B",
    classification: "intermedio",
    label: "Intermedio Avanzado",
    focus: "Patrones biomecánicos complejos",
  },
  {
    min: 169,
    max: 216,
    rank: "A",
    classification: "avanzado",
    label: "Avanzado",
    focus: "Calistenia / Flow de alto impacto",
  },
  {
    min: 217,
    max: 1 / 0,
    rank: "S",
    classification: "avanzado",
    label: "Élite / Dominio Total",
    focus: "Variaciones unilaterales y máxima exigencia",
  },
];
var sdcNiveles = [
  { t: "Recién empiezo", d: "Menos de 5 flexiones seguidas.", sq: 8, pu: 4, ab: 8, bk: 2 },
  { t: "Me muevo, pero sin plan", d: "Unas 8 flexiones seguidas.", sq: 15, pu: 8, ab: 14, bk: 5 },
  { t: "Entreno de a ratos", d: "Unas 14 flexiones seguidas.", sq: 25, pu: 14, ab: 24, bk: 9 },
  { t: "Entreno seguido", d: "Unas 22 flexiones seguidas.", sq: 35, pu: 22, ab: 34, bk: 14 },
  { t: "Entreno hace años", d: "Unas 30 flexiones seguidas.", sq: 45, pu: 30, ab: 42, bk: 19 },
  { t: "Alto rendimiento", d: "40 flexiones seguidas o más.", sq: 60, pu: 40, ab: 55, bk: 25 },
];
function iu(e, a, l, k) {
  return 2 * a + e + l + 2 * (k || 0);
}
function wy(e, a, l, k, ff) {
  let n = iu(e, a, l, k);
  return vy[sdcBandaIx(n, ff || 1)];
}
var sdcRitmoK = 0.6;
function sdcRitmoF(p) {
  return p && p.testResults && p.testResults.ritmo === 5 ? sdcRitmoK : 1;
}
function sdcBandaMin(k, f) {
  return Math.round(vy[k].min * (f || 1));
}
function sdcBandaIx(n, f) {
  var r = 0,
    k;
  for (k = 0; k < vy.length; k++) n >= sdcBandaMin(k, f) && (r = k);
  return r;
}
function Uy(e, a, l, k, ff) {
  return wy(e, a, l, k, ff).classification;
}
function l5(e, a, l, n, k, rt) {
  let o = M(e),
    s = Uy(a, l, n, k, rt === 5 ? sdcRitmoK : 1),
    u = o.profile.classification;
  ((o.profile.classification = s),
    (o.profile.testResults = rt
      ? { squat: a, pushup: l, abs: n, back: k || 0, ritmo: rt }
      : { squat: a, pushup: l, abs: n, back: k || 0 }));
  let c = [
    u === s
      ? `Prueba de aptitud actualizada. Seguís en ${s}.`
      : `¡Prueba de aptitud actualizada! Pasaste de ${u} a ${s}.`,
  ];
  return { state: o, notices: c };
}
function kl(e, a, l, n) {
  return _d(l, e, n).name;
}
function $s(e, a, l) {
  return _d(a, e, l).alt;
}
function sdcGuia(e, a, l) {
  var x = _d(a, e, l);
  return x && (x.pos || x.mov || x.err) ? x : null;
}
function M(e) {
  return JSON.parse(JSON.stringify(e));
}
function n5(e) {
  let a = ue();
  return {
    profile: { ...e, createdDate: a, weeklyGoal: e.weeklyGoal || qd },
    progress: { rank: e.startRank || "E", level: 1, currentXP: 0 },
    today: {
      date: a,
      mode: "pending",
      modality: null,
      rank: e.startRank || "E",
      reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
      stretchDone: !1,
      completed: !1,
      fullCompletion: !1,
      xpEarned: 0,
      doneModalities: [],
    },
    week: {
      weekStart: By(a),
      restDayUsed: !1,
      stretchCount: 0,
      trained: 0,
      fullDays: 0,
      xp: 0,
      dungeons: 0,
      primal: 0,
      sessionDates: [],
      reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
      modalities: { bodyweight: 0, gym: 0, flow: 0 },
    },
    dayLog: {},
    lastWeekSummary: null,
    streak: { missed: 0, current: 0, best: 0, flexBuff: !1 },
    ascension: { pending: !1 },
    exploration: {
      lifetimeKm: 0,
      pendingKm: 0,
      today: { date: a, km: 0 },
      unlockedIndex: -1,
      relics: [],
    },
    dungeon: { date: a, ...ai(e.startRank || "E") },
    history: {},
    month: misVacio(misMes(a)),
    missions: {
      weekKey: "",
      monthKey: "",
      weekly: null,
      monthly: null,
      weeklyDone: !1,
      monthlyDone: !1,
    },
    lifetimeReps: { squat: 0, pushup: 0, back: 0, abs: 0 },
    lastTrained: { squat: null, pushup: null, back: null, abs: null },
    lifetimeModalities: { bodyweight: 0, gym: 0, flow: 0 },
    dungeonsCleared: 0,
    maxComebackStreak: 0,
    achievements: [],
    combat: Ad(),
    primal: ky(),
    loadWarnedDate: null,
    ui: { collapsed: {} },
    skills: {},
    care: { today: { date: a, done: [] }, lifetime: 0 },
    neuro: Al(),
    unlockAll: !1,
    disabled: [],
    seenUnlocks: [],
    weeklyStreak: 0,
    bestWeeklyStreak: 0,
    dominion: Ay(),
    records: { squat: 0, pushup: 0, back: 0, abs: 0 },
    gymWeights: { squat: 0, pushup: 0, back: 0, abs: 0 },
    lifetimeVolumeKg: 0,
    bestLiftKg: { squat: 0, pushup: 0, back: 0, abs: 0 },
    lastFullDate: null,
    zDemoted: !1,
    lifetimePrimal: 0,
    lifetimeStretch: 0,
  };
}
function Ea(e, a) {
  for (;;) {
    let l = au[e.progress.rank];
    if (l && e.progress.level >= l) {
      e.ascension.pending = !0;
      break;
    }
    let n = li(e.progress.level);
    if (e.progress.currentXP >= n) {
      ((e.progress.currentXP -= n),
        (e.progress.level += 1),
        a.push(`Subiste a nivel ${e.progress.level}.`));
      let o = _y(e);
      ((e = o.state), o.notices.forEach((s) => a.push(s)));
    } else break;
  }
  return e;
}
function ei(e) {
  let a = M(e),
    l = [],
    n = ue();
  (a.exploration ||
    (a.exploration = {
      lifetimeKm: 0,
      pendingKm: 0,
      today: { date: n, km: 0 },
      unlockedIndex: -1,
      relics: [],
    }),
    a.exploration.lifetimeKm === void 0 &&
      ((a.exploration.lifetimeKm =
        Math.round((((a.exploration.lifetimeSteps || 0) * vd) / 1e3) * 100) / 100),
      (a.exploration.pendingKm = 0),
      (a.exploration.today = { date: n, km: 0 }),
      (a.exploration.relics = []),
      delete a.exploration.lifetimeSteps),
    a.exploration.relics || (a.exploration.relics = []),
    a.exploration.pendingKm === void 0 && (a.exploration.pendingKm = 0),
    a.dungeon || (a.dungeon = { date: n, ...ai(a.progress.rank) }),
    a.today.rank || (a.today.rank = a.progress.rank),
    a.today.fullCompletion === void 0 && (a.today.fullCompletion = !1),
    a.streak.current === void 0 && (a.streak.current = 0),
    a.streak.best === void 0 && (a.streak.best = 0),
    a.history || (a.history = {}),
    a.lifetimeReps || (a.lifetimeReps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.lastTrained || (a.lastTrained = { squat: null, pushup: null, back: null, abs: null }),
    a.dungeonsCleared === void 0 && (a.dungeonsCleared = 0),
    a.maxComebackStreak === void 0 && (a.maxComebackStreak = 0),
    a.achievements || (a.achievements = []),
    a.combat || (a.combat = Ad()),
    a.combat.roundId === void 0 && (a.combat.roundId = 0),
    a.combat.loadFactor === void 0 && (a.combat.loadFactor = 1),
    a.combat.damageFactor === void 0 && (a.combat.damageFactor = 1),
    za(a.combat.villainIndex).isBoss &&
      !a.combat.bossCats &&
      (a.combat.bossCats = $o(a.combat.lastExercise)),
    a.primal || (a.primal = ky()),
    a.loadWarnedDate === void 0 && (a.loadWarnedDate = null),
    a.skills || (a.skills = {}),
    a.care || (a.care = { today: { date: n, done: [] }, lifetime: 0 }),
    a.neuro || (a.neuro = Al()),
    a.unlockAll === void 0 && (a.unlockAll = !1),
    a.disabled || (a.disabled = []),
    a.seenUnlocks || (a.seenUnlocks = $e.filter((s) => yt(a, s.id)).map((s) => s.id)),
    a.ui || (a.ui = { collapsed: {} }),
    a.ui.collapsed || (a.ui.collapsed = {}),
    a.ui.collapsed.ayuda === void 0 && (a.ui.collapsed.ayuda = !1),
    a.ui.ayudaAuto === void 0 && ((a.ui.ayudaAuto = 1), (a.ui.collapsed.ayuda = !1)),
    a.dominion || (a.dominion = Ay()),
    a.dominion.perks || (a.dominion.perks = []),
    a.lifetimeModalities || (a.lifetimeModalities = { bodyweight: 0, gym: 0, flow: 0 }),
    a.records || (a.records = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.gymWeights || (a.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.lifetimeVolumeKg === void 0 && (a.lifetimeVolumeKg = 0),
    a.bestLiftKg || (a.bestLiftKg = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.lastFullDate === void 0 && (a.lastFullDate = null),
    a.zDemoted === void 0 && (a.zDemoted = !1),
    a.lifetimePrimal === void 0 && (a.lifetimePrimal = 0),
    a.lifetimeStretch === void 0 && (a.lifetimeStretch = 0),
    a.week.sessionDates || (a.week.sessionDates = []),
    a.week.reps || (a.week.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.dayLog || (a.dayLog = {}),
    a.week.trained === void 0 &&
      ((a.week.trained = 0),
      (a.week.fullDays = 0),
      (a.week.xp = 0),
      (a.week.dungeons = 0),
      (a.week.primal = 0)),
    a.lastWeekSummary === void 0 && (a.lastWeekSummary = null),
    a.combat.todayDefeated || (a.combat.todayDefeated = { date: n, count: 0 }),
    a.profile.createdDate || (a.profile.createdDate = n),
    a.profile.pet || (a.profile.pet = { type: "dog", name: "Rocky" }),
    a.profile.focusProfile || (a.profile.focusProfile = "salud"),
    (!a.profile.modalities || !a.profile.modalities.length) &&
      (a.profile.modalities = ["bodyweight"]),
    a.profile.weeklyGoal || (a.profile.weeklyGoal = qd),
    a.weeklyStreak === void 0 && (a.weeklyStreak = 0),
    a.bestWeeklyStreak === void 0 && (a.bestWeeklyStreak = 0));
  let o = By(n);
  if (a.week.weekStart !== o) {
    a.week.stretchCount >= 2
      ? ((a.streak.flexBuff = !0),
        l.push("Buff de Flexibilidad activo esta semana: +10% XP por haber estirado 2+ veces."))
      : (a.streak.flexBuff = !1);
    let s = (a.week.trained || 0) >= _n(a);
    (s
      ? ((a.weeklyStreak = (a.weeklyStreak || 0) + 1),
        (a.bestWeeklyStreak = Math.max(a.bestWeeklyStreak || 0, a.weeklyStreak)),
        l.push(
          `Semana cumplida: ${a.week.trained} de ${_n(a)} sesiones. Racha semanal: ${a.weeklyStreak}.`,
        ))
      : ((a.week.trained || 0) > 0 || a.weeklyStreak > 0) &&
        ((a.weeklyStreak = 0),
        l.push(
          `Cerraste la semana con ${a.week.trained || 0} de ${_n(a)} sesiones. La racha semanal vuelve a empezar.`,
        )),
      (a.lastWeekSummary = {
        metGoal: s,
        goal: _n(a),
        weekStart: a.week.weekStart,
        trained: a.week.trained || 0,
        fullDays: a.week.fullDays || 0,
        xp: a.week.xp || 0,
        dungeons: a.week.dungeons || 0,
        primal: a.week.primal || 0,
        stretches: a.week.stretchCount || 0,
        seen: !1,
      }),
      (a.week = {
        weekStart: o,
        restDayUsed: !1,
        stretchCount: 0,
        trained: 0,
        fullDays: 0,
        xp: 0,
        dungeons: 0,
        primal: 0,
        sessionDates: [],
        reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
        modalities: { bodyweight: 0, gym: 0, flow: 0 },
      }));
  }
  if (a.today.date !== n) {
    if (
      !a.today.completed &&
      !(a.week.sessionDates || []).includes(a.today.date) &&
      a.dominion.shields > 0
    )
      ((a.dominion.shields -= 1),
        (a.history[a.today.date] = "shield"),
        l.push(
          `Un Escudo de Racha absorbió el día ${a.today.date}: tu racha sigue intacta. Te quedan ${a.dominion.shields}.`,
        ));
    else if (!a.today.completed && !(a.week.sessionDates || []).includes(a.today.date)) {
      let s = _n(a),
        u = a.week.trained || 0,
        c = Math.max(0, qy(a.today.date) - 1),
        r = u + c >= s;
      if (((a.streak.current = 0), r))
        ((a.history[a.today.date] = "skipped"),
          l.push(
            `Día de descanso no planificado. Seguís en camino: ${u}/${s} sesiones esta semana, te quedan ${c} días.`,
          ));
      else {
        ((a.streak.missed += 1), (a.history[a.today.date] = "missed"));
        (l.push(
          `Ya no podés alcanzar tus ${s} sesiones esta semana. La racha vuelve a empezar, pero tu XP queda intacta.`,
        ),
          l.push(zy(D2, a.today.date, a.profile.pet && a.profile.pet.name)));
      }
    }
    ((a.today = {
      date: n,
      mode: "pending",
      modality: null,
      rank: a.progress.rank,
      reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
      stretchDone: !1,
      completed: !1,
      fullCompletion: !1,
      xpEarned: 0,
      doneModalities: [],
    }),
      (a.history = Q2(a.history, n)));
  }
  if (a.progress.rank === "Z" && a.lastFullDate) {
    let s = wd(a.lastFullDate, n);
    s !== null &&
      s >= a5 &&
      ((a.progress.rank = "S"),
      (a.zDemoted = !0),
      l.push(
        `Llevás ${s} días sin una rutina completa: bajás al rango anterior hasta tu próximo día perfecto.`,
      ));
  }
  return (
    a.dungeon.date !== n &&
      ((a.dungeon = { date: n, ...ai(a.progress.rank) }),
      a.dungeon.available && l.push(`Travesía de hoy: ${a.dungeon.name}`)),
    (a = misRevisar(a, l)),
    (a = Ea(a, l)),
    { state: a, notices: l }
  );
}
function o5(e) {
  let a = 1,
    l = Math.max(0, e);
  for (; l >= li(a);) ((l -= li(a)), (a += 1));
  return { level: a, currentXP: l };
}
var misGrupos = {
  squat: "piernas y glúteos",
  pushup: "pecho y hombros",
  back: "espalda",
  abs: "core",
};
function misMes(d) {
  return d.slice(0, 7);
}
function misVacio(k) {
  return {
    key: k,
    reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
    sessions: 0,
    modalities: { bodyweight: 0, gym: 0, flow: 0 },
  };
}
function misPeorGrupo(e) {
  let hoy = ue(),
    peor = "back",
    dias = -1;
  for (let g of ["squat", "pushup", "back", "abs"]) {
    let lt = e.lastTrained && e.lastTrained[g],
      d = lt ? wd(lt, hoy) : 999;
    if (d > dias) {
      dias = d;
      peor = g;
    }
  }
  return peor;
}
function misGenerar(e, amb) {
  let g = misPeorGrupo(e),
    u = Oy(e),
    base = Math.max(3, u[g] || 5),
    meta = _n(e),
    act = qn(e.profile);
  if (amb === "week") {
    let sin = act.filter((m) => !(e.week.modalities && e.week.modalities[m]));
    if (act.length > 1 && sin.length)
      return { kind: "modality", modality: sin[0], target: 2, xp: 120, pd: 2 };
    return { kind: "reps", group: g, target: Math.round(base * meta * 1.5), xp: 120, pd: 2 };
  }
  let sinMes = act.filter((m) => !(e.month && e.month.modalities && e.month.modalities[m]));
  if (act.length > 1 && sinMes.length)
    return { kind: "modality", modality: sinMes[0], target: 5, xp: 500, pd: 5 };
  return { kind: "reps", group: g, target: Math.round(base * meta * 6), xp: 500, pd: 5 };
}
function misProgreso(e, m, amb) {
  let c = amb === "week" ? e.week : e.month;
  if (!c || !m) return 0;
  return m.kind === "reps"
    ? (c.reps && c.reps[m.group]) || 0
    : (c.modalities && c.modalities[m.modality]) || 0;
}
function misTexto(m, amb) {
  if (!m) return "";
  let p = amb === "week" ? "esta semana" : "este mes";
  return m.kind === "reps"
    ? `Lo que menos tocaste: ${misGrupos[m.group]}. ${m.target} repeticiones ${p} y eso cambia.`
    : `Todavía no sabés qué te hace ${(ra.find((r) => r.id === m.modality) || ra[0]).name}. Entrená con eso ${m.target} veces ${p}.`;
}
function misRevisar(e, notas) {
  e.week.modalities || (e.week.modalities = { bodyweight: 0, gym: 0, flow: 0 });
  e.month || (e.month = misVacio(misMes(ue())));
  e.missions ||
    (e.missions = {
      weekKey: "",
      monthKey: "",
      weekly: null,
      monthly: null,
      weeklyDone: !1,
      monthlyDone: !1,
    });
  let hoy = ue(),
    sem = By(hoy),
    mes = misMes(hoy);
  if (e.month.key !== mes) e.month = misVacio(mes);
  if (!ye(e, "missions")) return e;
  if (e.missions.weekKey !== sem) {
    ((e.missions.weekKey = sem),
      (e.missions.weekly = misGenerar(e, "week")),
      (e.missions.weeklyDone = !1));
  }
  if (e.missions.monthKey !== mes) {
    ((e.missions.monthKey = mes),
      (e.missions.monthly = misGenerar(e, "month")),
      (e.missions.monthlyDone = !1));
  }
  for (let amb of ["week", "month"]) {
    let kk = amb === "week" ? "weekly" : "monthly",
      dk = amb === "week" ? "weeklyDone" : "monthlyDone",
      m = e.missions[kk];
    if (m && !e.missions[dk] && misProgreso(e, m, amb) >= m.target) {
      ((e.missions[dk] = !0),
        (e.progress.currentXP += m.xp),
        (e.dominion.points += m.pd),
        notas.push(
          `Misión ${amb === "week" ? "semanal" : "mensual"} completada: +${m.xp} XP y +${m.pd} PD.`,
        ));
    }
  }
  return e;
}
function i5(e, a, l, mok, gvol) {
  let n = {
      records: M(e.records || {}),
      lastTrained: M(e.lastTrained || {}),
      bestLiftKg: M(e.bestLiftKg || {}),
      volume: e.lifetimeVolumeKg || 0,
      today: M(e.today),
      history: e.history[e.today.date] || null,
      dayLog: e.dayLog && e.dayLog[e.today.date] ? M(e.dayLog[e.today.date]) : null,
      streakBest: e.streak.best,
      streakMissed: e.streak.missed,
      lastFullDate: e.lastFullDate,
      zDemoted: e.zDemoted,
      maxComeback: e.maxComebackStreak,
      pdBefore: e.dominion.points,
      hadSession: (e.week.sessionDates || []).includes(e.today.date),
    },
    o = M(e),
    s = [],
    u = Oy(o),
    c = u.squat + u.pushup + u.back + u.abs,
    r = l.squat + l.pushup + (l.back || 0) + l.abs,
    p = c > 0 ? r / c : 0,
    v = r;
  let sdcPRb = [];
  if (Md(o.profile, o.today.date, o.today.modality) === "gym")
    for (let b of ["squat", "pushup", "back", "abs"]) {
      let gb = gvol && gvol[b],
        h = gb && gb.max > 0 ? gb.max : (o.gymWeights && o.gymWeights[b]) || 0,
        C = l[b] || 0,
        vv = gb && gb.vol > 0 ? gb.vol : h * C;
      if (h > 0 && vv > 0) {
        o.lifetimeVolumeKg = Math.round((o.lifetimeVolumeKg || 0) + vv);
        h > (o.bestLiftKg[b] || 0) && (o.bestLiftKg[b] = h);
        let nm = gb && gb.nom;
        if (nm) {
          o.gymUlt || (o.gymUlt = {});
          let pr = (o.gymUlt[nm] && o.gymUlt[nm].best) || 0;
          h > pr && pr > 0 && sdcPRb.push({ nom: nm, kg: h, pv: pr });
          o.gymUlt[nm] = {
            kgs: gb.kgs,
            fecha: o.today.date,
            best: Math.max(pr, h),
            pct: u[b] > 0 ? Math.min(1.5, C / u[b]) : 1,
          };
        }
      }
    }
  let y = 0;
  for (let b of ["squat", "pushup", "back", "abs"]) {
    let h = l[b] || 0;
    ((o.lifetimeReps[b] += h),
      (o.week.reps[b] = (o.week.reps[b] || 0) + h),
      o.month && (o.month.reps[b] = (o.month.reps[b] || 0) + h),
      h > 0 && (o.lastTrained[b] = o.today.date),
      h >= u[b] && (y += 1));
  }
  let sdcPR = !1;
  for (let b of ["squat", "pushup", "back", "abs"]) {
    let h = l[b] || 0;
    h > (o.records[b] || 0) && ((o.records[b] = h), (o.lifetimeReps[b] || 0) > h && (sdcPR = !0));
  }
  (() => {
    let pd = (o.today.doneModalities || []).length > 0 ? 0 : p >= 1 ? 3 : p >= 0.5 ? 1 : 0;
    pd > 0 && ((o.dominion.points += pd), s.push(`+${pd} Puntos de Dominio.`));
  })();
  let S = o.streak.missed;
  let nSes = (o.today.doneModalities || []).length;
  let yaFull = o.history[o.today.date] === "full";
  if (p >= 1)
    ((v += 30),
      (o = Dl(o, "Rutina completa")),
      yaFull ||
        ((o.history[o.today.date] = "full"),
        (o.lastFullDate = o.today.date),
        (o.week.fullDays = (o.week.fullDays || 0) + 1)),
      o.zDemoted &&
        ((o.zDemoted = !1),
        (o.progress.rank = "Z"),
        s.push("Volviste al último rango. Las metas vuelven a salir de tus récords.")),
      s.push(
        "¡Rutina completa! +30 XP de bono por constancia. Hoy es un día perfecto: si tenés un Umbral pendiente, podés cruzarlo.",
      ));
  else if (p >= 0.5)
    ((o = Dl(o, "Rutina parcial")),
      yaFull || (o.history[o.today.date] = "partial"),
      s.push("Rutina parcial registrada. Sin bono de constancia, sin penalización."));
  else if (nSes > 0) s.push("Sesión extra demasiado corta. Sin bono, sin penalización.");
  else {
    ((o.streak.missed += 1), (o.streak.current = 0), (o.history[o.today.date] = "missed"));
    (s.push(
      `Sesión corta (${Math.round(p * 100)}%). Conservas tu XP, pero la racha vuelve a empezar.`,
    ),
      s.push(zy(T2, o.today.date, o.profile.pet && o.profile.pet.name)));
  }
  ((v = Math.round(v * t5(o))),
    (v = Math.round(v * sdcRacha(o))),
    (v = Math.round(v * sdcPerk(o))),
    (() => {
      if (!mok) return;
      let mm = sdcModDia(Md(o.profile, o.today.date, o.today.modality), o.today.date);
      mm &&
        ((v = Math.round(v * (1 + mm.x))),
        s.push(`Modificador ${mm.n}: +${Math.round(mm.x * 100)}% XP.`));
    })(),
    (() => {
      let d = (o.streak && o.streak.current) || 0;
      d >= 3 &&
        s.push(
          `Racha de ${d} ${d === 1 ? "día" : "días"}: +${Math.round((sdcRacha(o) - 1) * 100)}% XP.`,
        );
    })(),
    o.streak.flexBuff && (v = Math.round(v * 1.1)),
    (v = Math.round(v * Ka(o))),
    nSes > 0 &&
      ((v = Math.round(v * (1 + 0.25 * nSes))),
      s.push(`Bono por combinar estilos: +${25 * nSes}% XP.`)),
    (() => {
      if (!sdcPRb.length) return;
      let bn = 25 * sdcPRb.length;
      v += bn;
      let dt = sdcPRb.map((x) => x.nom + " " + x.pv + " → " + x.kg + " kg").join(" · ");
      s.push(`+${bn} XP: nueva marca de carga. ${dt}`);
    })(),
    (o.progress.currentXP += v),
    (o = Ea(o, s)),
    (o.today.completed = !0),
    (o.today.doneModalities = [...(o.today.doneModalities || [])]),
    ((md) => {
      (o.today.doneModalities.includes(md) || o.today.doneModalities.push(md),
        o.lifetimeModalities || (o.lifetimeModalities = { bodyweight: 0, gym: 0, flow: 0 }),
        (o.lifetimeModalities[md] = (o.lifetimeModalities[md] || 0) + 1),
        o.week.modalities && (o.week.modalities[md] = (o.week.modalities[md] || 0) + 1),
        o.month && (o.month.modalities[md] = (o.month.modalities[md] || 0) + 1));
    })(Md(o.profile, o.today.date, o.today.modality)),
    (o.today.mode = a),
    (o.today.reps = l),
    (o.today.fullCompletion = p >= 1),
    (o.today.rank = o.progress.rank),
    (o.today.xpEarned = (o.today.xpEarned || 0) + v),
    (o.week.xp = (o.week.xp || 0) + v),
    p >= 0.5 && s.push(sdcMascota(o, p, sdcPR)),
    o.dayLog[o.today.date] &&
      ((o.dayLog[o.today.date].reps = ((pr) => ({
        squat: (pr.squat || 0) + (l.squat || 0),
        pushup: (pr.pushup || 0) + (l.pushup || 0),
        back: (pr.back || 0) + (l.back || 0),
        abs: (pr.abs || 0) + (l.abs || 0),
      }))(o.dayLog[o.today.date].reps || {})),
      (o.dayLog[o.today.date].xp = (o.dayLog[o.today.date].xp || 0) + v)));
  ((o = misRevisar(o, s)), (o = Ea(o, s)));
  let E = da(o),
    T = { state: E.state, notices: [...s, ...E.notices] },
    A = ni(T.state),
    g = A.state;
  return (
    (g.undoSnapshot = {
      date: g.today.date,
      snap: n,
      xp: v,
      pd: g.dominion.points - n.pdBefore,
      reps: { squat: l.squat || 0, pushup: l.pushup || 0, back: l.back || 0, abs: l.abs || 0 },
      fullDay: p >= 1,
    }),
    { state: g, notices: [...T.notices, ...A.notices] }
  );
}
function s5(e) {
  let a = M(e),
    l = a.undoSnapshot;
  if (!l || l.date !== a.today.date || !l.snap)
    return { state: a, notices: ["No hay nada que deshacer hoy."] };
  let n = l.date,
    o = l.snap,
    s = jy(a.progress.level, a.progress.currentXP) - (l.xp || 0),
    u = o5(s);
  ((a.progress.level = u.level),
    (a.progress.currentXP = u.currentXP),
    (a.week.xp = Math.max(0, (a.week.xp || 0) - (l.xp || 0))),
    (a.dominion.points = Math.max(0, a.dominion.points - (l.pd || 0))));
  for (let r of ["squat", "pushup", "back", "abs"])
    ((a.lifetimeReps[r] = Math.max(0, a.lifetimeReps[r] - (l.reps[r] || 0))),
      (a.week.reps[r] = Math.max(0, (a.week.reps[r] || 0) - (l.reps[r] || 0))));
  ((a.records = M(o.records)),
    (a.lastTrained = M(o.lastTrained)),
    (a.bestLiftKg = M(o.bestLiftKg)),
    (a.lifetimeVolumeKg = o.volume),
    (a.lastFullDate = o.lastFullDate),
    (a.zDemoted = o.zDemoted),
    (a.maxComebackStreak = o.maxComeback),
    (a.streak.missed = o.streakMissed),
    l.fullDay && (a.week.fullDays = Math.max(0, (a.week.fullDays || 0) - 1)));
  let c = ((a.dayLog[n] && a.dayLog[n].acts) || []).filter(
    (r) => r !== "Rutina completa" && r !== "Rutina parcial",
  );
  return (
    c.length === 0
      ? ((a.week.sessionDates = (a.week.sessionDates || []).filter((r) => r !== n)),
        (a.week.trained = a.week.sessionDates.length),
        o.hadSession ||
          ((a.streak.current = Math.max(0, a.streak.current - 1)), (a.streak.best = o.streakBest)),
        o.history ? (a.history[n] = o.history) : delete a.history[n],
        o.dayLog ? (a.dayLog[n] = o.dayLog) : delete a.dayLog[n])
      : ((a.dayLog[n] = {
          acts: c,
          reps: null,
          xp: Math.max(0, ((a.dayLog[n] && a.dayLog[n].xp) || 0) - (l.xp || 0)),
        }),
        (a.history[n] = "partial")),
    (a.today = M(o.today)),
    delete a.undoSnapshot,
    { state: a, notices: ["Rutina deshecha. Lo que hiciste aparte se conserva."] }
  );
}
function u5(e) {
  let a = M(e),
    l = a.streak.missed;
  ((a.today.mode = "rest"),
    (a.today.completed = !0),
    (a.today.fullCompletion = !1),
    (a.week.restDayUsed = !0),
    l >= 3 && (a.maxComebackStreak = Math.max(a.maxComebackStreak || 0, l)),
    (a.streak.missed = 0),
    (a.history[a.today.date] = "rest"));
  let n = ["Día de descanso registrado. Sin XP, sin penalización."],
    o = da(a);
  return { state: o.state, notices: [...n, ...o.notices] };
}
function c5(e, hh, tt) {
  let a = M(e),
    l = [];
  if (a.today.stretchDone) return { state: a, notices: l };
  let fr = tt && tt > 0 ? Math.max(0, Math.min(1, (hh || 0) / tt)) : 1;
  if (fr < 0.34)
    return {
      state: a,
      notices: [
        "Estiramiento cortado muy temprano. Sin XP, pero sin penalización: volvé cuando quieras.",
      ],
    };
  ((a.today.stretchDone = !0), (a.lifetimeStretch = (a.lifetimeStretch || 0) + 1));
  let ent = fr >= 0.999;
  ent && (a.week.stretchCount += 1);
  let n = Math.round(25 * fr);
  (a.streak.flexBuff && (n = Math.round(n * 1.1)),
    (n = Math.round(n * Ka(a))),
    (a.progress.currentXP += n),
    (a.today.xpEarned = (a.today.xpEarned || 0) + n),
    l.push(
      ent
        ? `+${n} XP por estiramiento. Llevás ${a.week.stretchCount}/2 esta semana.`
        : `+${n} XP por lo que alcanzaste a estirar. Para que cuente en tu semana hay que llegar al final.`,
    ),
    (a = Ea(a, l)));
  let o = da(a);
  return { state: o.state, notices: [...l, ...o.notices] };
}
function r5(e) {
  let a = M(e),
    l = [];
  if (!a.dungeon.available || a.dungeon.completed) return { state: a, notices: l };
  ((a.dungeon.completed = !0),
    (a.dungeonsCleared = (a.dungeonsCleared || 0) + 1),
    (a.week.dungeons = (a.week.dungeons || 0) + 1),
    (a = Dl(a, "Travesía")));
  let n = a.dungeon.rewardXP;
  (a.streak.flexBuff && (n = Math.round(n * 1.1)),
    (n = Math.round(n * Ka(a))),
    (a.progress.currentXP += n),
    (a.today.xpEarned = (a.today.xpEarned || 0) + n),
    l.push(`¡Travesía completada! "${a.dungeon.name}" +${n} XP.`),
    (a = Ea(a, l)));
  let o = da(a),
    s = { state: o.state, notices: [...l, ...o.notices] },
    u = ni(s.state);
  return { state: u.state, notices: [...s.notices, ...u.notices] };
}
function d5(e) {
  let a = M(e),
    l = [];
  if (!a.ascension.pending) return { state: a, notices: l };
  if (!(a.today.completed && a.today.fullCompletion)) return { state: a, notices: l };
  let n = ve.indexOf(a.progress.rank);
  if (n < ve.length - 1) {
    ((a.progress.rank = ve[n + 1]),
      (a.ascension.pending = !1),
      (a = Ea(a, l)),
      l.push(`¡Cruzaste a ${sdcRango(a.progress.rank, a.profile)}!`));
    let s = _y(a);
    ((a = s.state), s.notices.forEach((u) => l.push(u)));
  }
  let o = da(a);
  return { state: o.state, notices: [...l, ...o.notices] };
}
function yd(e, a) {
  let l = M(e);
  if (!a || a <= 0) return { state: l, notices: [] };
  let n = ue();
  return (
    l.exploration.today.date !== n && (l.exploration.today = { date: n, km: 0 }),
    (l.exploration.pendingKm = Math.round((l.exploration.pendingKm + a) * 100) / 100),
    { state: l, notices: [] }
  );
}
function f5(e) {
  let a = M(e);
  return (
    (a.exploration.pendingKm = 0),
    { state: a, notices: ["Tramos sin consolidar descartados."] }
  );
}
function hy(e) {
  let a = M(e),
    l = [],
    n = a.exploration.pendingKm || 0;
  if (n <= 0) return { state: a, notices: ["No registraste ningún tramo todavía."], found: [] };
  let o = ue();
  (a.exploration.today.date !== o && (a.exploration.today = { date: o, km: 0 }),
    (a.exploration.today.km = Math.round((a.exploration.today.km + n) * 100) / 100),
    (a.exploration.lifetimeKm = Math.round((a.exploration.lifetimeKm + n) * 100) / 100),
    (a.exploration.pendingKm = 0));
  let s = [];
  pt.forEach((r, p) => {
    a.exploration.lifetimeKm >= r.km &&
      p > a.exploration.unlockedIndex &&
      ((a.exploration.unlockedIndex = p),
      a.exploration.relics.includes(r.relic) || a.exploration.relics.push(r.relic),
      s.push(r));
  });
  let u = Math.round(n * n2 * o2(a));
  (a.streak.flexBuff && (u = Math.round(u * 1.1)),
    (u = Math.round(u * Ka(a))),
    (a.progress.currentXP += u),
    (a.today.xpEarned = (a.today.xpEarned || 0) + u),
    s.length &&
      ((a.dominion.points += s.length),
      l.push(`+${s.length} Punto${s.length === 1 ? "" : "s"} de Dominio por hallazgo.`)),
    l.push(`Expedición concluida: ${n} km · +${u} XP.`),
    (a = Dl(a, "Expedición")),
    (a = Ea(a, l)));
  let c = da(a);
  return { state: c.state, notices: [...l, ...c.notices], found: s };
}
async function m5(e) {
  try {
    let a = await window.claude.use("db");
    return a ? (await a.doc("player/snapshot").set(e), !0) : !1;
  } catch (a) {
    return !1;
  }
}
async function xy() {
  try {
    let e = await window.claude.use("db");
    if (!e) return null;
    let a = await e.doc("player/snapshot").get();
    return a.exists ? a.data() : null;
  } catch (e) {
    return null;
  }
}
async function p5() {
  try {
    let e = await window.claude.use("db");
    if (!e) return null;
    let a = await e.doc("player/state").get();
    return a.exists ? a.data() : null;
  } catch (e) {
    return (console.error("Error cargando progreso", e), null);
  }
}
async function K(e) {
  try {
    let a = await window.claude.use("db");
    if (!a) return;
    await a.doc("player/state").set(e);
  } catch (a) {
    console.error("No se pudo guardar el progreso", a);
  }
}
function Q({ children: e, accent: a = "#4f9dff", style: l = {} }) {
  return i.default.createElement(
    "div",
    {
      className: "relative border",
      style: {
        borderColor: a + "55",
        background: "linear-gradient(180deg, rgba(18,24,43,0.9), rgba(10,14,26,0.9))",
        ...l,
      },
    },
    i.default.createElement("span", {
      className: "absolute w-3 h-3 border-t-2 border-l-2",
      style: { top: -1, left: -1, borderColor: a },
    }),
    i.default.createElement("span", {
      className: "absolute w-3 h-3 border-t-2 border-r-2",
      style: { top: -1, right: -1, borderColor: a },
    }),
    i.default.createElement("span", {
      className: "absolute w-3 h-3 border-b-2 border-l-2",
      style: { bottom: -1, left: -1, borderColor: a },
    }),
    i.default.createElement("span", {
      className: "absolute w-3 h-3 border-b-2 border-r-2",
      style: { bottom: -1, right: -1, borderColor: a },
    }),
    i.default.createElement("div", { className: "p-4" }, e),
  );
}
function qa({ value: e, max: a, color: l }) {
  let n = a > 0 ? Math.min(100, (e / a) * 100) : 100;
  return i.default.createElement(
    "div",
    {
      className: "w-full h-2 overflow-hidden",
      style: { background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" },
    },
    i.default.createElement("div", {
      className: "h-full transition-all duration-500",
      style: { width: n + "%", background: `linear-gradient(90deg, ${l}, #ffffff66)` },
    }),
  );
}
function sdcPodia(e) {
  return (e && e.podia) || {};
}
function sdcVistos(e) {
  return (e && e.vistos) || {};
}
function sdcPrimeras(e) {
  return (e && e.primeras) || [];
}
function sdcPrimeraAdd(e, tx, og) {
  var l = sdcPrimeras(e).slice();
  l.unshift({ fecha: ue(), texto: tx, origen: og });
  if (l.length > 120) l.length = 120;
  e.primeras = l;
  return e;
}
function sdcPrimerasHook(r, rp) {
  if (!r || !r.state) return r;
  var e = r.state,
    gs = ["squat", "pushup", "back", "abs"],
    md = Md(e.profile, e.today.date, e.today.modality),
    src = sdcPodia(e),
    pd = {},
    k;
  for (k in src) pd[k] = src[k];
  var hubo = !1,
    vs = {},
    sv = sdcVistos(e),
    hv = !1;
  for (k in sv) vs[k] = sv[k];
  for (var q = 0; q < gs.length; q++) {
    var g = gs[q];
    if (!rp || !(rp[g] > 0)) continue;
    var ex = _d(g, e.progress.rank, md);
    if (!ex || !ex.name) continue;
    vs[ex.name] || ((vs[ex.name] = !0), (hv = !0));
    if (pd[ex.name] !== !1) continue;
    pd[ex.name] = !0;
    hubo = !0;
    sdcPrimeraAdd(e, ex.name, "declarada");
    r.notices = r.notices || [];
    r.notices.push("Primera vez: " + ex.name + ". Antes no podías.");
  }
  if (hubo) e.podia = pd;
  if (hv) e.vistos = vs;
  return r;
}
function sdcJuego(p) {
  var j = p && p.tituloSet;
  if (j && sdcTitulos[j]) return j;
  var m = (p && p.modalities) || [];
  for (var k = 0; k < m.length; k++) if (sdcTitulos[m[k]]) return m[k];
  return "bodyweight";
}
function sdcRango(r, p) {
  var t = sdcTitulos[sdcJuego(p)];
  return (t && t[r]) || zl[r] || String(r);
}
function sdcDescRango(r, p) {
  var t = sdcDescs[sdcJuego(p)];
  return (t && t[r]) || J2[r] || "";
}
var sdcCalTit = {
    bodyweight: [
      "Primeros apoyos",
      "Base firme",
      "Aguante propio",
      "Trabajo largo",
      "Fuerza relativa",
      "Fuera de la tabla",
    ],
    gym: [
      "Primeros pesos",
      "Base para cargar",
      "Aguante entre series",
      "Sesión larga",
      "Carga alta",
      "Fuera de la tabla",
    ],
    flow: [
      "Primeras posiciones",
      "Piso firme",
      "Aguante continuo",
      "Tránsito largo",
      "Control fino",
      "Fuera de la tabla",
    ],
  },
  sdcCalFoco = {
    bodyweight: [
      "Acondicionamiento y movilidad",
      "Control motor y fuerza básica",
      "Volumen e intensidad moderada",
      "Series largas y variantes más difíciles",
      "Progresiones unilaterales",
      "Unilateral estricto e isometría",
    ],
    gym: [
      "Recorrido y técnica antes que carga",
      "Series cortas con carga conservadora",
      "Más series por sesión y progresión semanal",
      "Volumen alto con descansos bien usados",
      "Pocas repeticiones, mucha exigencia",
      "Carga máxima y descansos largos",
    ],
    flow: [
      "Movilidad y apoyo en el suelo",
      "Control motor y transiciones simples",
      "Encadenar sin frenar",
      "Secuencias largas y sostenes",
      "Inversiones y trabajo unilateral",
      "Secuencias completas sin cortes",
    ],
  };
function sdcCalT(i, p) {
  var t = sdcCalTit[sdcJuego(p)];
  return (t && t[i]) || (vy[i] && vy[i].label) || "";
}
function sdcCalF(i, p) {
  var t = sdcCalFoco[sdcJuego(p)];
  return (t && t[i]) || (vy[i] && vy[i].focus) || "";
}
function sdcRachaCalc(e) {
  var h = (e && e.history) || {},
    hoy = ue(),
    d = new Date(hoy + "T00:00:00"),
    n = 0,
    k,
    f,
    s;
  for (k = 0; k < 400; k++) {
    f = __fechaLocal(d);
    s = h[f];
    if (f === hoy && !s) {
      d.setDate(d.getDate() - 1);
      continue;
    }
    if (s === "full" || s === "partial") n++;
    else if (s !== "rest" && s !== "shield") break;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
function sdcDiaPasado(e, f) {
  var a = M(e),
    l = [],
    hoy = ue();
  if (!f || f >= hoy) return { state: a, notices: l };
  var s = a.history[f];
  if (s && s !== "skipped" && s !== "missed")
    return { state: a, notices: ["Ese día ya estaba registrado."] };
  ((a.history[f] = "partial"),
    a.dayLog || (a.dayLog = {}),
    a.dayLog[f] || (a.dayLog[f] = { acts: [], reps: null, xp: 0 }),
    a.dayLog[f].acts.includes("Anotado después") || a.dayLog[f].acts.push("Anotado después"),
    a.week.sessionDates || (a.week.sessionDates = []),
    f >= a.week.weekStart &&
      !a.week.sessionDates.includes(f) &&
      (a.week.sessionDates.push(f), (a.week.trained = a.week.sessionDates.length)));
  var nr = sdcRachaCalc(a);
  return (
    nr > (a.streak.current || 0) &&
      ((a.streak.current = nr), (a.streak.best = Math.max(a.streak.best || 0, nr))),
    l.push("Anotado: entrenaste el " + f + ". Cuenta como día entrenado, sin XP."),
    { state: a, notices: l }
  );
}
function sdcMarcaK(md, mo) {
  return String(md) + "|" + String(mo);
}
function sdcMarca(e, k) {
  var t = e && e.today;
  if (!t) return null;
  var m = t.marcas && t.marcas[k];
  if (m) return m;
  var o = t.marca;
  return o && sdcMarcaK(o.mod, o.mode) === k ? o : null;
}
function sdcHoyReps(e) {
  var t = e && e.today;
  if (!t) return { squat: 0, pushup: 0, back: 0, abs: 0 };
  var d = e.dayLog && e.dayLog[t.date],
    r = d && d.reps;
  return r || t.reps || { squat: 0, pushup: 0, back: 0, abs: 0 };
}
function sdcHoyMeta(e, f) {
  var t = e && e.today,
    d = t && e.dayLog && e.dayLog[t.date],
    m = d && d.meta;
  return m || f || { squat: 0, pushup: 0, back: 0, abs: 0 };
}
function sdcSumaReps(a, b) {
  var g = ["squat", "pushup", "back", "abs"],
    o = {},
    k;
  for (k = 0; k < g.length; k++) o[g[k]] = ((a && a[g[k]]) || 0) + ((b && b[g[k]]) || 0);
  return o;
}
function sdcDeshacerHook(ant, r) {
  if (!r || !r.state || !r.state.undoSnapshot || !ant) return r;
  r.state.undoSnapshot.ach = (ant.achievements || []).slice();
  return r;
}
function sdcDeshacer(e) {
  var u = e && e.undoSnapshot,
    r = s5(e);
  if (!u || !u.snap || !e.today || u.date !== e.today.date) return r;
  var a = r.state,
    rp = u.reps || {},
    md = Md(a.profile, a.today.date, a.today.modality);
  a.month &&
    a.month.reps &&
    ["squat", "pushup", "back", "abs"].forEach(function (g) {
      a.month.reps[g] = Math.max(0, (a.month.reps[g] || 0) - (rp[g] || 0));
    });
  [a.lifetimeModalities, a.week && a.week.modalities, a.month && a.month.modalities].forEach(
    function (m) {
      m && m[md] > 0 && (m[md] -= 1);
    },
  );
  u.ach && (a.achievements = u.ach.slice());
  return r;
}
function sdcMetaHook(r, mt) {
  if (!r || !r.state || !mt) return r;
  var e = r.state,
    t = e.today,
    d = t && e.dayLog && e.dayLog[t.date];
  if (d) d.meta = sdcSumaReps(d.meta, mt);
  return r;
}
function sdcIncKg(kg, g) {
  var k = Number(kg) || 0;
  if (g === "squat") return k >= 40 ? 5 : 2.5;
  return k >= 20 ? 2.5 : 1;
}
function sdcSugKg(e, g, nom) {
  if (!nom) return null;
  var u = ((e && e.gymUlt) || {})[nom];
  if (!u || !u.kgs || !u.kgs.length) return null;
  var mx = 0,
    i;
  for (i = 0; i < u.kgs.length; i++) if (u.kgs[i] > mx) mx = u.kgs[i];
  if (mx <= 0) return null;
  var pc = u.pct === void 0 ? 1 : u.pct;
  return pc >= 0.999
    ? { kg: Math.round((mx + sdcIncKg(mx, g)) * 10) / 10, sube: !0 }
    : { kg: mx, sube: !1 };
}
function sdcGymSer(e) {
  return (e && e.gymSerieKg) || {};
}
function sdcGymUlt(e) {
  return (e && e.gymUlt) || {};
}
function sdcKgTxt(v) {
  var n = Number(v) || 0;
  return String(Math.round(n * 10) / 10).replace(".", ",");
}
function sdcTier(s) {
  var t = String(s || "");
  if (
    t.indexOf("Primera vez:") >= 0 ||
    t.indexOf("Cruzaste a") >= 0 ||
    t.indexOf("Subiste a nivel") >= 0 ||
    t.indexOf("Volviste al último rango") >= 0
  )
    return "epic";
  if (
    t.indexOf("Sesión corta") >= 0 ||
    t.indexOf("Ya no podés alcanzar") >= 0 ||
    t.indexOf("vuelve a empezar") >= 0
  )
    return "bad";
  if (
    t.indexOf("Logro desbloqueado") >= 0 ||
    t.indexOf("logros desbloqueados") >= 0 ||
    t.indexOf("Nuevo sistema desbloqueado") >= 0 ||
    t.indexOf("Recuperaste") >= 0 ||
    t.indexOf("Rutina completa") >= 0 ||
    t.indexOf("completada") >= 0 ||
    t.indexOf("Bono") >= 0 ||
    t.charAt(0) === "+"
  )
    return "good";
  return "info";
}
var sdcEstilo = {
  epic: { background: "rgba(255,184,79,0.16)", border: "2px solid #ffb84f", color: "#ffe2b0" },
  good: {
    background: "rgba(62,207,142,0.10)",
    border: "1px solid rgba(62,207,142,0.45)",
    color: "#bdf0d9",
  },
  bad: {
    background: "rgba(255,92,122,0.10)",
    border: "1px solid rgba(255,92,122,0.45)",
    color: "#ffc4ce",
  },
  info: {
    background: "rgba(79,157,255,0.08)",
    border: "1px solid rgba(79,157,255,0.35)",
    color: "#cfe0ff",
  },
};
var sdcOrden = { epic: 0, good: 1, bad: 2, info: 3 };
function b5({ notices: e, onDismiss: a, onDismissAll: d }) {
  if (!e || e.length === 0) return null;
  var li = e.map(function (t, k) {
    return { t: t, k: k, g: sdcTier(t) };
  });
  li.sort(function (x, y) {
    return sdcOrden[x.g] - sdcOrden[y.g] || x.k - y.k;
  });
  return i.default.createElement(
    "div",
    { className: "mb-4" },
    i.default.createElement(
      "div",
      { className: "space-y-2" },
      li.map(function (it) {
        var ep = it.g === "epic",
          st = sdcEstilo[it.g];
        return i.default.createElement(
          "div",
          {
            key: it.k,
            className:
              "sdc-rise flex items-start justify-between gap-2 px-3 " + (ep ? "py-3" : "py-2"),
            style: { background: st.background, border: st.border, color: st.color },
          },
          i.default.createElement(
            "span",
            {
              style: ep
                ? {
                    fontFamily: "Chakra Petch, sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }
                : { fontSize: 14 },
            },
            it.t,
          ),
          i.default.createElement(
            "button",
            {
              onClick: function () {
                a(it.k);
              },
              className: "opacity-60",
              "aria-label": "Cerrar",
            },
            i.default.createElement(zd, { size: 14 }),
          ),
        );
      }),
    ),
    e.length > 1 &&
      d &&
      i.default.createElement(
        "button",
        {
          onClick: d,
          className: "w-full py-2 text-xs mt-2",
          style: {
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#9aa4bd",
          },
        },
        "Cerrar todo (",
        e.length,
        ")",
      ),
  );
}
function sdcSegs(al) {
  if (!al) return 0;
  var m = String(al).match(/(?:^|[^(])1\s*rep\s*(?:=|por cada)\s*(\d+)\s*(?:s\b|segundo)/i);
  return m ? parseInt(m[1], 10) : 0;
}
var sdcCatMod = { Gimnasio: "gym" };
var sdcCatSis = {
  Exploración: "exploration",
  "Modo Primal": "primal",
  Combate: "combat",
  Skills: "skills",
  Neuromotor: "neuro",
  "Días que no querías": "animo",
};
function sdcCatAbierta(st, cat) {
  var s = sdcCatSis[cat];
  if (s) return ye(st, s);
  var m = sdcCatMod[cat];
  if (m) return qn(st.profile).indexOf(m) >= 0;
  return !0;
}
var sdcDevN = 0;
function sdcNSets(t) {
  return t >= 6 ? 3 : t >= 3 ? 2 : 1;
}
function sdcSplit(t, n) {
  if (n <= 1) return [t];
  let w = n === 2 ? [0.55, 0.45] : [0.4, 0.33, 0.27],
    a = [],
    ac = 0;
  for (let k = 0; k < n - 1; k++) {
    let v = Math.max(1, Math.round(t * w[k]));
    (a.push(v), (ac += v));
  }
  return (a.push(Math.max(0, t - ac)), a);
}
function sdcSuma(t, n, k) {
  let a = sdcSplit(t, n),
    s = 0;
  for (let j = 0; j < k && j < a.length; j++) s += a[j];
  return s;
}
function sdcBeep(hz, ms) {
  try {
    Ie(hz, ms);
  } catch (e) {}
}
function sdcVib(p) {
  try {
    navigator.vibrate && navigator.vibrate(p);
  } catch (e) {}
}
function sdcGuiaLin(t, v) {
  return v
    ? i.default.createElement(
        "div",
        { style: { marginBottom: 5 } },
        i.default.createElement("span", { style: { color: "#ffb84f", fontWeight: 700 } }, t, ": "),
        v,
      )
    : null;
}
function Is({
  label: e,
  value: a,
  base: l,
  min: n,
  max: o,
  onChange: s,
  tip: u,
  weight: c,
  onWeight: r,
  done: sd,
  onSet: so,
  accent: sa,
  aj: sj,
  onAj: soa,
  kgv: skg,
  kgPrev: spv,
  sug: ssug,
  guia: sgu,
  abrir: sab,
}) {
  let p = Math.max(1, Math.round(l * 0.1)),
    [sv, x] = (0, i.useState)(null),
    v = sv === null ? !!sab : sv,
    sn = sdcNSets(a),
    sp = sdcSplit(a, sn),
    sf = function (k, v) {
      return sj && sj[k] !== void 0 ? sj[k] : v;
    },
    sh = sp.reduce(function (ac, vv, kk) {
      return kk < (sd || 0) ? ac + sf(kk, vv) : ac;
    }, 0),
    sc = sa || "#4f9dff",
    sl = (sd || 0) >= sn && a > 0,
    sg = sdcSegs(u),
    [sdcAbre, sdcSetAbre] = (0, i.useState)(!1),
    [sdcCierra, sdcSetCierra] = (0, i.useState)(() => !!(sl && so));
  (0, i.useEffect)(
    function () {
      (x(null), sdcSetAbre(!1));
    },
    [e],
  );
  (0, i.useEffect)(
    function () {
      if (sl && so) {
        if (sdcCierra) return;
        var t = setTimeout(function () {
          sdcSetCierra(!0);
        }, 1200);
        return function () {
          clearTimeout(t);
        };
      }
      (sdcCierra && sdcSetCierra(!1), sdcAbre && sdcSetAbre(!1));
    },
    [sl],
  );
  if (sl && so && sdcCierra && !sdcAbre)
    return i.default.createElement(
      "button",
      {
        onClick: function () {
          sdcSetAbre(!0);
        },
        className: "w-full flex items-center justify-between gap-2 py-2 text-left",
        style: {
          minHeight: 48,
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        },
      },
      i.default.createElement(
        "span",
        { className: "flex items-center gap-2 text-sm", style: { color: "#9aa4bd" } },
        i.default.createElement(Mn, { size: 16, color: "#3ecf8e" }),
        e,
      ),
      i.default.createElement(
        "span",
        {
          className: "flex items-center gap-1 text-xs",
          style: { color: "#3ecf8e", whiteSpace: "nowrap" },
        },
        sg > 0 ? sh * sg + " s" : sh + " reps",
        i.default.createElement(Za, { size: 12, color: "#5a6178" }),
      ),
    );
  return i.default.createElement(
    "div",
    { className: "py-2", style: { borderBottom: "1px solid rgba(255,255,255,0.06)" } },
    sl && so && sdcCierra && sdcAbre
      ? i.default.createElement(
          "button",
          {
            onClick: function () {
              sdcSetAbre(!1);
            },
            className: "w-full flex items-center gap-2 text-xs mb-1 text-left",
            style: { minHeight: 36, background: "transparent", border: "none", color: "#3ecf8e" },
          },
          i.default.createElement(Mn, { size: 12, color: "#3ecf8e" }),
          "Hecho · ocultar",
        )
      : null,
    i.default.createElement(
      "div",
      { className: "flex items-center justify-between gap-3" },
      i.default.createElement(
        "div",
        null,
        i.default.createElement(
          "div",
          { className: "flex items-center gap-1" },
          i.default.createElement("span", { className: "text-sm", style: { color: "#e8ecf7" } }, e),
        ),
        i.default.createElement(
          "div",
          { className: "flex items-center gap-2 text-xs", style: { color: "#9aa4bd" } },
          i.default.createElement(
            "span",
            null,
            "Meta: ",
            a,
            " reps",
            sg > 0 ? " · " + a * sg + "s de sostén" : "",
          ),
          (u || sgu) &&
            i.default.createElement(
              "button",
              {
                onClick: () => x(!v),
                className: "text-xs",
                style: {
                  color: "#ffb84f",
                  whiteSpace: "nowrap",
                  padding: "15px 8px",
                  margin: "-15px -8px",
                },
                "aria-label": "Cómo se hace",
              },
              sgu ? "¿Cómo se hace?" : "💡 alternativa",
            ),
        ),
      ),
      i.default.createElement(
        "div",
        { className: "flex items-center gap-2" },
        i.default.createElement(
          "button",
          {
            onClick: () => s(Math.max(n, a - p)),
            className: "flex items-center justify-center",
            style: {
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            },
            "aria-label": "Bajar meta",
          },
          i.default.createElement(Rh, { size: 14, color: "#e8ecf7" }),
        ),
        i.default.createElement(
          "div",
          {
            className: "text-center",
            style: {
              width: 36,
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 18,
              color: "#e8ecf7",
            },
          },
          a,
        ),
        i.default.createElement(
          "button",
          {
            onClick: () => s(Math.min(o, a + p)),
            className: "flex items-center justify-center",
            style: {
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            },
            "aria-label": "Subir meta",
          },
          i.default.createElement(Ih, { size: 14, color: "#e8ecf7" }),
        ),
      ),
    ),
    so &&
      i.default.createElement(
        "div",
        { className: "flex gap-2 mt-2" },
        sp.map(function (sr, sk) {
          var ef = sf(sk, sr),
            hc = sk < (sd || 0),
            sx = sk === (sd || 0) && !!soa,
            cu =
              sg > 0
                ? i.default.createElement(
                    "div",
                    null,
                    i.default.createElement("div", null, hc ? "✓ " + ef : ef),
                    i.default.createElement(
                      "div",
                      { style: { fontSize: 11, fontWeight: 400, opacity: 0.8 } },
                      ef * sg,
                      "s",
                    ),
                  )
                : hc
                  ? "✓ " + ef
                  : ef;
          if (sx)
            return i.default.createElement(
              "div",
              {
                key: sk,
                className: "sdc-chip flex-1 flex items-stretch",
                style: {
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: "rgba(255,255,255,0.04)",
                  minHeight: 48,
                },
              },
              i.default.createElement(
                "button",
                {
                  onClick: function () {
                    soa(sk, ef - 1);
                  },
                  style: { width: 28, color: "#9aa4bd", fontSize: 17 },
                  "aria-label": "Una repetición menos en la serie " + (sk + 1),
                },
                "−",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: function () {
                    so(sk + 1);
                  },
                  className: "flex-1",
                  "aria-label": "Marcar serie " + (sk + 1) + " de " + sn + " con " + ef + " reps",
                  style: {
                    fontFamily: "Chakra Petch, sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#e8ecf7",
                  },
                },
                cu,
              ),
              i.default.createElement(
                "button",
                {
                  onClick: function () {
                    soa(sk, ef + 1);
                  },
                  style: { width: 28, color: "#9aa4bd", fontSize: 17 },
                  "aria-label": "Una repetición más en la serie " + (sk + 1),
                },
                "+",
              ),
            );
          return i.default.createElement(
            "button",
            {
              key: sk,
              onClick: function () {
                so(sd === sk + 1 ? sk : sk + 1);
              },
              className: "sdc-chip flex-1 py-3",
              "aria-label": "Serie " + (sk + 1) + " de " + sn + (hc ? ", hecha" : ", pendiente"),
              style: {
                background: hc ? sc : "rgba(255,255,255,0.04)",
                border: "1px solid " + (hc ? sc : "rgba(255,255,255,0.18)"),
                color: hc ? "#0a0e1a" : "#8a93ad",
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 16,
                fontWeight: 700,
                minHeight: 48,
              },
            },
            cu,
          );
        }),
      ),
    r &&
      i.default.createElement(
        i.default.Fragment,
        null,
        i.default.createElement(
          "div",
          { className: "flex gap-2 mt-2" },
          sp.map(function (sr, sk) {
            return i.default.createElement("input", {
              key: sk,
              type: "text",
              inputMode: "decimal",
              value: skg ? skg(sk) : "",
              onChange: (y) => r(sk, y.target.value.replace(/[^0-9.,]/g, "")),
              placeholder: "kg",
              className: "flex-1 px-1 py-2 text-center text-xs",
              style: {
                width: 0,
                minWidth: 0,
                minHeight: 44,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
              "aria-label": "Kilos de la serie " + (sk + 1) + " de " + sn,
            });
          }),
        ),
        i.default.createElement(
          "div",
          { className: "text-xs mt-1", style: { color: "#7a83a0" } },
          spv && spv.length
            ? i.default.createElement(
                i.default.Fragment,
                null,
                "La última vez: ",
                spv.map(sdcKgTxt).join(" · "),
                " kg",
              )
            : "Kilos de cada serie. Podés subirlos serie a serie.",
        ),
        ssug && ssug.s
          ? i.default.createElement(
              "button",
              {
                onClick: () => ssug.fn(ssug.s.kg),
                className: "text-xs text-left",
                style: {
                  display: "block",
                  width: "100%",
                  color: "#3ecf8e",
                  fontWeight: 600,
                  padding: "12px 0",
                  minHeight: 44,
                  marginBottom: -6,
                },
              },
              ssug.s.sube
                ? "Hoy probá " + sdcKgTxt(ssug.s.kg) + " kg →"
                : "Repetí " + sdcKgTxt(ssug.s.kg) + " kg y cerralo →",
            )
          : null,
      ),
    so &&
      i.default.createElement(
        "div",
        { className: "text-xs mt-1", style: { color: sl ? "#3ecf8e" : "#5a6178" } },
        sl
          ? "✓ Series hechas · " + sh + " reps" + (sg > 0 ? " (" + sh * sg + "s)" : "")
          : "Llevás " + sh + " de " + a + " reps" + (sg > 0 ? " (" + sh * sg + "s)" : ""),
      ),
    v &&
      (u || sgu) &&
      i.default.createElement(
        "div",
        {
          className: "mt-2 p-2",
          style: {
            fontSize: 14,
            lineHeight: 1.5,
            color: "#c8d0e4",
            background: "rgba(255,184,79,0.08)",
            border: "1px solid rgba(255,184,79,0.25)",
          },
        },
        sgu
          ? i.default.createElement(
              i.default.Fragment,
              null,
              sdcGuiaLin("Posición", sgu.pos),
              sdcGuiaLin("Movimiento", sgu.mov),
              sdcGuiaLin("Error común", sgu.err),
            )
          : null,
        u
          ? i.default.createElement(
              "div",
              { style: { color: "#9aa4bd", marginTop: sgu ? 6 : 0 } },
              u,
            )
          : null,
      ),
  );
}
function Rs(e) {
  let a = [42, 49, 72],
    l = [255, 107, 74],
    n = Math.max(0, Math.min(1, e || 0)),
    o = Math.round(a[0] + (l[0] - a[0]) * n),
    s = Math.round(a[1] + (l[1] - a[1]) * n),
    u = Math.round(a[2] + (l[2] - a[2]) * n);
  return `rgb(${o},${s},${u})`;
}
var Fo = {
  pushup: { label: "Pecho y hombros", muscles: "Pectoral, deltoides, tríceps" },
  back: { label: "Espalda", muscles: "Dorsal ancho, trapecio, bíceps" },
  squat: { label: "Piernas y glúteos", muscles: "Cuádriceps, isquios, glúteo" },
  abs: { label: "Core", muscles: "Recto abdominal, oblicuos, transverso" },
};
function Bd(e) {
  return Math.floor(Math.sqrt((e || 0) / 25)) + 1;
}
function y5(e) {
  let a = Bd(e),
    l = Math.pow(a - 1, 2) * 25,
    n = Math.pow(a, 2) * 25;
  return { cur: (e || 0) - l, need: n - l, next: n };
}
function wd(e, a) {
  return e ? Math.round((new Date(a + "T00:00:00") - new Date(e + "T00:00:00")) / 864e5) : null;
}
function g5({ view: e, colors: a, glow: l, ratios: n, selected: o, onSelect: s }) {
  let u = "#161b2e",
    c = "#2a3148",
    r = (p) => ({
      fill: a[p],
      stroke: o === p ? "#ffffff" : c,
      strokeWidth: o === p ? 2 : 1,
      onClick: () => s(o === p ? null : p),
      style: {
        cursor: "pointer",
        animation: n && n[p] >= 1 ? "sdcPulse 1.6s ease-in-out infinite" : "none",
      },
    }),
    sdcMir = "translate(200,0) scale(-1,1)",
    sdcSim = (d, p) => i.default.createElement("path", { d: d, ...r(p) }),
    sdcPar = (d, p) =>
      i.default.createElement(
        "g",
        null,
        i.default.createElement("path", { d: d, ...r(p) }),
        i.default.createElement("path", { d: d, transform: sdcMir, ...r(p) }),
      ),
    sdcIne = (d, dob) =>
      dob
        ? i.default.createElement(
            "g",
            null,
            i.default.createElement("path", { d: d, fill: u, stroke: c, strokeWidth: "1" }),
            i.default.createElement("path", {
              d: d,
              transform: sdcMir,
              fill: u,
              stroke: c,
              strokeWidth: "1",
            }),
          )
        : i.default.createElement("path", { d: d, fill: u, stroke: c, strokeWidth: "1" });
  return i.default.createElement(
    "svg",
    {
      viewBox: "0 0 200 300",
      style: {
        width: "100%",
        maxWidth: 200,
        margin: "0 auto",
        display: "block",
        filter: l ? "drop-shadow(0 0 8px rgba(62,207,142,0.65))" : "none",
      },
    },
    sdcIne("M100,8 L113,17 L115,35 L107,48 L93,48 L85,35 L87,17 Z"),
    sdcIne("M94,47 L106,47 L107,58 L93,58 Z"),
    e === "front"
      ? i.default.createElement(
          i.default.Fragment,
          null,
          sdcIne("M89,57 L111,57 L119,67 L81,67 Z"),
          sdcPar("M84,58 L74,61 L64,72 L62,88 L76,84 L84,70 Z", "pushup"),
          sdcPar("M88,62 L99,60 L99,92 L83,89 L84,72 Z", "pushup"),
          sdcPar("M62,90 L76,86 L74,120 L60,116 Z", "pushup"),
          sdcPar(
            "M88,96 L99,96 L99,108 L87,108 Z M87,110 L99,110 L99,122 L88,122 Z M88,124 L99,124 L99,136 L89,136 Z",
            "abs",
          ),
          sdcPar("M83,93 L87,94 L89,138 L83,127 Z", "abs"),
          sdcIne("M88,139 L112,139 L114,150 L86,150 Z"),
          sdcPar("M86,150 L99,150 L99,208 L82,204 L83,166 Z", "squat"),
        )
      : i.default.createElement(
          i.default.Fragment,
          null,
          sdcSim("M89,57 L111,57 L120,69 L100,77 L80,69 Z", "back"),
          sdcPar("M84,58 L74,61 L64,72 L62,88 L76,84 L84,70 Z", "pushup"),
          sdcPar("M83,71 L99,75 L99,112 L85,104 L80,85 Z", "back"),
          sdcSim("M89,114 L111,114 L109,137 L91,137 Z", "back"),
          sdcPar("M62,90 L76,86 L74,120 L60,116 Z", "pushup"),
          sdcPar("M84,139 L99,139 L99,162 L82,159 Z", "squat"),
          sdcPar("M83,163 L99,163 L99,208 L85,205 Z", "squat"),
        ),
    sdcPar("M60,122 L74,126 L72,156 L61,154 Z", "pushup"),
    sdcIne("M61,158 L72,160 L71,170 L62,168 Z", 1),
    sdcIne("M87,209 L99,209 L99,216 L86,216 Z", 1),
    sdcPar("M87,217 L99,217 L98,264 L89,264 Z", "squat"),
    sdcIne("M89,266 L98,266 L99,276 L79,276 L79,270 Z", 1),
  );
}
function v5({
  zoneKey: e,
  rank: a,
  classification: l,
  lifetime: n,
  target: o,
  doneToday: s,
  lastTrained: u,
  today: c,
  modality: r,
  onClose: p,
}) {
  let v = Fo[e],
    x = Bd(n),
    y = y5(n),
    S = wd(u, c);
  return i.default.createElement(
    "div",
    {
      className: "mt-3 p-3",
      style: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)" },
    },
    i.default.createElement(
      "div",
      { className: "flex items-center justify-between mb-1" },
      i.default.createElement(
        "div",
        { style: { fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 } },
        v.label,
      ),
      i.default.createElement(
        "button",
        { onClick: p, className: "text-xs", style: { color: "#9aa4bd" }, "aria-label": "Cerrar" },
        i.default.createElement(zd, { size: 14, color: "#9aa4bd" }),
      ),
    ),
    i.default.createElement(
      "div",
      { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
      v.muscles,
    ),
    ry(e) &&
      i.default.createElement(
        "div",
        { className: "text-xs mb-2", style: { color: "#b084f5" } },
        "Alimenta: ",
        ry(e),
      ),
    i.default.createElement(
      "div",
      { className: "text-xs mb-1", style: { color: "#e8ecf7" } },
      "Ejercicio: ",
      kl(a, l, e, r),
    ),
    i.default.createElement(
      "div",
      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
      "Hoy: ",
      s,
      " / ",
      o,
      " reps",
    ),
    i.default.createElement(
      "div",
      { className: "flex justify-between text-xs mb-1", style: { color: "#9aa4bd" } },
      i.default.createElement("span", null, "Desarrollo · Nivel ", x),
      i.default.createElement("span", null, y.cur, " / ", y.need),
    ),
    i.default.createElement(qa, { value: y.cur, max: y.need, color: "#3ecf8e" }),
    i.default.createElement(
      "div",
      { className: "text-xs mt-2", style: { color: "#9aa4bd" } },
      n.toLocaleString("es"),
      " reps de por vida · ",
      S === null
        ? "sin estímulo registrado"
        : S === 0
          ? "entrenado hoy"
          : S === 1
            ? "último estímulo: ayer"
            : `último estímulo: hace ${S} días`,
    ),
    S !== null &&
      S >= 3 &&
      i.default.createElement(
        "div",
        { className: "text-xs mt-2", style: { color: "#ffb84f" } },
        "Esta zona lleva ",
        S,
        " días sin estímulo.",
      ),
  );
}
function h5({ items: e }) {
  return i.default.createElement(
    "div",
    { className: "grid grid-cols-2 gap-x-3 gap-y-1 mt-3" },
    e.map((a) =>
      i.default.createElement(
        "div",
        { key: a.label, className: "flex items-center gap-2 text-xs", style: { color: "#9aa4bd" } },
        i.default.createElement("span", {
          style: {
            width: 10,
            height: 10,
            background: a.color,
            border: a.borde || "none",
            display: "inline-block",
            flexShrink: 0,
          },
        }),
        a.label,
      ),
    ),
  );
}
var bt = {
  full: "#3ecf8e",
  partial: "#ffb84f",
  rest: "#4f9dff",
  shield: "#7c5cff",
  skipped: "#46506b",
  missed: "#ff5c7a",
  pending: "#2a3148",
  empty: "#161b2e",
};
function x5(e, a, l, n) {
  let o = [],
    s = new Date(a + "T00:00:00");
  for (let u = n - 1; u >= 0; u--) {
    let c = new Date(s);
    c.setDate(c.getDate() - u);
    let r = __fechaLocal(c),
      p = (e || {})[r];
    (!p && r === a && (p = l), o.push({ date: r, status: p || "empty" }));
  }
  let sdcI = 0;
  while (sdcI < o.length - 1 && o[sdcI].status === "empty") sdcI++;
  return o.slice(sdcI);
}
function S5({ days: e, onPick: a, selected: l }) {
  return i.default.createElement(
    "div",
    { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 } },
    e.map((n) =>
      i.default.createElement("button", {
        key: n.date,
        onClick: () => a && a(n.date),
        title: n.date,
        style: {
          height: 18,
          padding: 0,
          background: bt[n.status] || bt.empty,
          border:
            l === n.date
              ? "2px solid #ffffff"
              : n.status === "pending"
                ? "1px dashed rgba(255,255,255,0.3)"
                : "1px solid rgba(255,255,255,0.06)",
        },
      }),
    ),
  );
}
var N5 = {
  full: "Rutina completa",
  partial: "Sesión parcial",
  rest: "Día de descanso",
  shield: "Protegido por escudo",
  skipped: "Sin entrenar (dentro de meta)",
  missed: "Fuera de meta",
  pending: "Hoy, aún pendiente",
  empty: "Sin registro",
};
function C5({ date: e, status: a, log: l, onClose: n, onLog: sol, animo: an }) {
  let [cf, scf] = (0, i.useState)(!1);
  return i.default.createElement(
    "div",
    {
      className: "mt-3 p-3",
      style: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)" },
    },
    i.default.createElement(
      "div",
      { className: "flex items-center justify-between mb-1" },
      i.default.createElement(
        "div",
        { style: { fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 } },
        e,
      ),
      i.default.createElement(
        "button",
        { onClick: n, "aria-label": "Cerrar" },
        i.default.createElement(zd, { size: 14, color: "#9aa4bd" }),
      ),
    ),
    i.default.createElement(
      "div",
      { className: "text-xs mb-2", style: { color: bt[a] || "#8a93ad" } },
      N5[a] || "Sin registro",
    ),
    l && l.acts && l.acts.length > 0
      ? i.default.createElement(
          i.default.Fragment,
          null,
          i.default.createElement(
            "div",
            { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
            "Actividades: ",
            l.acts
              .map(function (jx) {
                return jx === "Mazmorra" ? "Travesía" : jx;
              })
              .join(" · "),
          ),
          l.reps &&
            i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#9aa4bd" } },
              "Reps: ",
              l.reps.squat || 0,
              " piernas · ",
              l.reps.pushup || 0,
              " empuje · ",
              l.reps.back || 0,
              " tracción · ",
              l.reps.abs || 0,
              " core",
            ),
          l.xp > 0 &&
            i.default.createElement(
              "div",
              { className: "text-xs mt-1", style: { color: "#3ecf8e" } },
              "+",
              l.xp,
              " XP ese día",
            ),
        )
      : i.default.createElement(
          "div",
          { className: "text-xs", style: { color: "#7a83a0" } },
          "No hay actividades registradas.",
        ),
    an && an.antes
      ? i.default.createElement(
          "div",
          { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
          "Llegaste ",
          sdcAnimoFrase(an.antes),
          an.despues ? " · te fuiste " + sdcAnimoFrase(an.despues) : "",
        )
      : null,
    sol
      ? cf
        ? i.default.createElement(
            "div",
            { className: "mt-3" },
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
              "Se anota como sesión hecha, sin XP.",
            ),
            i.default.createElement(
              "button",
              {
                onClick: () => {
                  (scf(!1), sol(e));
                },
                className: "w-full py-2 text-xs",
                style: { background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700, minHeight: 44 },
              },
              "Sí, entrené ese día",
            ),
            i.default.createElement(
              "button",
              {
                onClick: () => scf(!1),
                className: "w-full py-2 text-xs mt-1",
                style: {
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#9aa4bd",
                  minHeight: 44,
                },
              },
              "Cancelar",
            ),
          )
        : i.default.createElement(
            "button",
            {
              onClick: () => scf(!0),
              className: "w-full py-2 text-xs mt-3",
              style: {
                background: "rgba(62,207,142,0.1)",
                border: "1px solid #3ecf8e",
                color: "#3ecf8e",
                fontWeight: 600,
                minHeight: 44,
              },
            },
            "Entrené este día y me olvidé de anotarlo",
          )
      : null,
  );
}
function ge({
  id: e,
  title: a,
  accent: l,
  collapsed: n,
  onToggle: o,
  right: s,
  children: u,
  style: c,
}) {
  let r = !n;
  return i.default.createElement(
    Q,
    { accent: l, style: c },
    i.default.createElement(
      "button",
      {
        onClick: () => o(e, !!n),
        className: "w-full flex items-center justify-between",
        style: { background: "transparent", border: "none", padding: "12px 0", margin: "-12px 0" },
      },
      i.default.createElement(
        "div",
        { className: "flex items-center gap-2" },
        i.default.createElement(
          "span",
          {
            style: {
              display: "inline-block",
              transform: r ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform .2s",
            },
          },
          i.default.createElement(Za, { size: 14, color: "#9aa4bd" }),
        ),
        i.default.createElement(
          "span",
          { style: { fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 } },
          a,
        ),
      ),
      i.default.createElement("span", { className: "text-xs", style: { color: "#9aa4bd" } }, s),
    ),
    r && i.default.createElement("div", { className: "mt-3" }, u),
  );
}
function Qo({ icon: e, label: a, status: l, done: n, onClick: o }) {
  return i.default.createElement(
    "button",
    {
      onClick: o,
      className: "w-full flex items-center justify-between py-2 px-2 mb-1 text-left",
      style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" },
    },
    i.default.createElement(
      "div",
      { className: "flex items-center gap-2" },
      i.default.createElement(e, { size: 14, color: n ? "#3ecf8e" : "#8a93ad" }),
      i.default.createElement("span", { className: "text-sm", style: { color: "#e8ecf7" } }, a),
    ),
    i.default.createElement(
      "span",
      { className: "text-xs", style: { color: n ? "#3ecf8e" : "#8a93ad" } },
      l,
    ),
  );
}
function k5(e) {
  return Cl[e] || "#ffb84f";
}
function Cd({ type: e, size: a = 56, color: l = "#ffb84f", rank: n }) {
  let o = n && ["A", "S", "Z"].includes(n),
    s = n && ["S", "Z"].includes(n),
    u = { width: a, height: a, display: "block", filter: s ? `drop-shadow(0 0 6px ${l})` : "none" },
    c = o
      ? i.default.createElement("path", {
          d: "M32,6 L40,16 L50,4 L60,16 L68,6 L66,22 L34,22 Z",
          fill: l,
          opacity: "0.95",
        })
      : null;
  return e === "cat"
    ? i.default.createElement(
        "svg",
        { viewBox: "0 0 100 100", style: u },
        i.default.createElement("path", { d: "M25,38 L33,10 L45,32 Z", fill: l }),
        i.default.createElement("path", { d: "M75,38 L67,10 L55,32 Z", fill: l }),
        c,
        i.default.createElement("circle", { cx: "50", cy: "55", r: "28", fill: l }),
        i.default.createElement("circle", { cx: "40", cy: "52", r: "4", fill: "#161b2e" }),
        i.default.createElement("circle", { cx: "60", cy: "52", r: "4", fill: "#161b2e" }),
        i.default.createElement("path", { d: "M46,62 L54,62 L50,67 Z", fill: "#161b2e" }),
        i.default.createElement("path", {
          d: "M50,67 Q50,71 44,71",
          stroke: "#161b2e",
          strokeWidth: "2",
          fill: "none",
        }),
        i.default.createElement("path", {
          d: "M50,67 Q50,71 56,71",
          stroke: "#161b2e",
          strokeWidth: "2",
          fill: "none",
        }),
        i.default.createElement("line", {
          x1: "14",
          y1: "58",
          x2: "30",
          y2: "60",
          stroke: "#161b2e",
          strokeWidth: "1.5",
        }),
        i.default.createElement("line", {
          x1: "14",
          y1: "65",
          x2: "30",
          y2: "65",
          stroke: "#161b2e",
          strokeWidth: "1.5",
        }),
        i.default.createElement("line", {
          x1: "86",
          y1: "58",
          x2: "70",
          y2: "60",
          stroke: "#161b2e",
          strokeWidth: "1.5",
        }),
        i.default.createElement("line", {
          x1: "86",
          y1: "65",
          x2: "70",
          y2: "65",
          stroke: "#161b2e",
          strokeWidth: "1.5",
        }),
      )
    : i.default.createElement(
        "svg",
        { viewBox: "0 0 100 100", style: u },
        i.default.createElement("ellipse", {
          cx: "21",
          cy: "46",
          rx: "11",
          ry: "19",
          transform: "rotate(-15 21 46)",
          fill: l,
        }),
        i.default.createElement("ellipse", {
          cx: "79",
          cy: "46",
          rx: "11",
          ry: "19",
          transform: "rotate(15 79 46)",
          fill: l,
        }),
        c,
        i.default.createElement("circle", { cx: "50", cy: "55", r: "27", fill: l }),
        i.default.createElement("ellipse", {
          cx: "50",
          cy: "66",
          rx: "15",
          ry: "11",
          fill: "#ffe0b3",
        }),
        i.default.createElement("circle", { cx: "41", cy: "50", r: "4", fill: "#161b2e" }),
        i.default.createElement("circle", { cx: "59", cy: "50", r: "4", fill: "#161b2e" }),
        i.default.createElement("ellipse", {
          cx: "50",
          cy: "63",
          rx: "4",
          ry: "3",
          fill: "#161b2e",
        }),
        i.default.createElement("path", {
          d: "M50,66 Q50,70 44,71",
          stroke: "#161b2e",
          strokeWidth: "2",
          fill: "none",
        }),
        i.default.createElement("path", {
          d: "M50,66 Q50,70 56,71",
          stroke: "#161b2e",
          strokeWidth: "2",
          fill: "none",
        }),
        i.default.createElement("path", {
          d: "M43,73 Q50,78 57,73",
          stroke: "#161b2e",
          strokeWidth: "1.5",
          fill: "none",
        }),
      );
}
function gd({ text: e, speed: a = 45, onDone: l, style: n, showCursor: o }) {
  let [s, u] = (0, i.useState)("");
  return (
    (0, i.useEffect)(() => {
      u("");
      let c = 0,
        r = setInterval(() => {
          ((c += 1), u(e.slice(0, c)), c >= e.length && (clearInterval(r), l && l()));
        }, a);
      return () => clearInterval(r);
    }, [e]),
    i.default.createElement(
      "div",
      { style: n },
      s,
      o &&
        i.default.createElement(
          "span",
          { style: { animation: "sdcBlink 1s step-end infinite" } },
          "▊",
        ),
    )
  );
}
function z5({ onDone: e }) {
  let [a, l] = (0, i.useState)(0);
  return i.default.createElement(
    "div",
    {
      className: "min-h-screen flex flex-col items-center justify-center px-4",
      style: { background: "#0a0e1a" },
    },
    i.default.createElement(
      "div",
      { className: "w-full", style: { maxWidth: 380, fontFamily: "'Chakra Petch', monospace" } },
      i.default.createElement(gd, {
        text: "Nadie te contó de qué es capaz tu cuerpo.",
        speed: 38,
        showCursor: a === 0,
        onDone: () => l(1),
        style: { color: "#e8ecf7", fontSize: 19, marginBottom: 14, letterSpacing: 0.5 },
      }),
      a >= 1 &&
        i.default.createElement(gd, {
          text: "Ni vos lo sabés todavía.",
          speed: 38,
          showCursor: a === 1,
          onDone: () => l(2),
          style: { color: "#9aa4bd", fontSize: 16, marginBottom: 14 },
        }),
      a >= 2 &&
        i.default.createElement(gd, {
          text: "Vamos a averiguarlo.",
          speed: 45,
          showCursor: a === 2,
          onDone: () => l(3),
          style: { color: "#ffb84f", fontSize: 17, lineHeight: 1.5 },
        }),
      a >= 3 &&
        i.default.createElement(
          "button",
          {
            onClick: e,
            className: "w-full py-3 text-sm",
            style: {
              marginTop: 28,
              background: "#4f9dff",
              color: "#0a0e1a",
              fontWeight: 700,
              letterSpacing: 1,
            },
          },
          "Continuar",
        ),
    ),
  );
}
var E5 = 2e3,
  A5 = 1e3;
function Ie(e, a) {
  try {
    let l = window.AudioContext || window.webkitAudioContext;
    if (!l) return;
    Ie._ctx || (Ie._ctx = new l());
    let n = Ie._ctx;
    n.state === "suspended" && n.resume();
    let o = n.createOscillator(),
      s = n.createGain();
    ((o.frequency.value = e),
      (o.type = "sine"),
      s.gain.setValueAtTime(0.18, n.currentTime),
      s.gain.exponentialRampToValueAtTime(0.001, n.currentTime + a / 1e3),
      o.connect(s),
      s.connect(n.destination),
      o.start(),
      o.stop(n.currentTime + a / 1e3));
  } catch (l) {}
}
function Ly({ exercise: e, onFinish: a }) {
  let [l, n] = (0, i.useState)("idle"),
    [o, s] = (0, i.useState)(10),
    [u, c] = (0, i.useState)("down"),
    [r, p] = (0, i.useState)(0);
  (sdcWakeUse(),
    (0, i.useEffect)(() => {
      if (l !== "countdown") return;
      if (o <= 0) {
        (Ie(880, 180), c("down"), n("running"));
        return;
      }
      o <= 3 && Ie(520, 120);
      let x = setTimeout(() => s((y) => y - 1), 1e3);
      return () => clearTimeout(x);
    }, [l, o]),
    (0, i.useEffect)(() => {
      if (l !== "running") return;
      if (u === "down") {
        Ie(440, 140);
        let y = setTimeout(() => c("hold"), 2e3);
        return () => clearTimeout(y);
      }
      if (u === "hold") {
        Ie(560, 120);
        let y = setTimeout(() => c("up"), 1e3);
        return () => clearTimeout(y);
      }
      Ie(660, 140);
      let x = setTimeout(() => {
        (p((y) => y + 1), c("down"));
      }, 2e3);
      return () => clearTimeout(x);
    }, [l, u, r]));
  let v =
    l === "countdown" ? "#ffb84f" : u === "down" ? "#4f9dff" : u === "hold" ? "#ffb84f" : "#3ecf8e";
  return i.default.createElement(
    Q,
    { accent: v },
    i.default.createElement(
      "div",
      { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
      e.label,
    ),
    i.default.createElement(
      "div",
      { className: "mb-3", style: { fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" } },
      e.hint,
    ),
    l === "idle" &&
      i.default.createElement(
        i.default.Fragment,
        null,
        i.default.createElement(
          "div",
          { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
          "Mismo ritmo que el metrónomo de la rutina: 2 s de bajada, 1 s de pausa y 2 s de subida. Solo cuentan las repeticiones que completes con él. Cuando ya no puedas seguir el ritmo, detené la prueba.",
        ),
        i.default.createElement(
          "button",
          {
            onClick: () => {
              (s(10), p(0), n("countdown"));
            },
            className: "w-full py-3 text-sm",
            style: { background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 },
          },
          "Comenzar",
        ),
      ),
    l === "countdown" &&
      i.default.createElement(
        "div",
        { className: "text-center py-4" },
        i.default.createElement(
          "div",
          {
            className: "text-xs uppercase",
            style: { letterSpacing: 2, color: "#ffb84f", fontWeight: 700 },
          },
          "PONETE EN POSICIÓN",
        ),
        i.default.createElement(
          "div",
          { style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 52, color: v } },
          o || "¡YA!",
        ),
      ),
    l === "running" &&
      i.default.createElement(
        i.default.Fragment,
        null,
        i.default.createElement(
          "div",
          { className: "text-center py-2" },
          i.default.createElement(
            "div",
            {
              style: {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 40,
                color: v,
                letterSpacing: 2,
              },
            },
            u === "down" ? "BAJA" : u === "hold" ? "PAUSA" : "SUBE",
          ),
          i.default.createElement(
            "div",
            { className: "text-xs", style: { color: "#9aa4bd" } },
            u === "hold" ? "1 segundo" : "2 segundos",
          ),
          i.default.createElement(
            "div",
            {
              style: {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 34,
                color: "#e8ecf7",
                marginTop: 10,
              },
            },
            r,
            " reps",
          ),
        ),
        i.default.createElement(
          "button",
          {
            onClick: () => {
              (n("idle"), a(r));
            },
            className: "w-full py-3 text-sm mt-2",
            style: { background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 },
          },
          "No puedo más — detener",
        ),
      ),
  );
}
function sdcTempoMod(mo) {
  var b = 2,
    p = 1,
    s = 2,
    d = mo && mo.d ? String(mo.d) : "",
    m = d.match(/baja(?:\s+el\s+peso)?\s+en\s+(\d+)\s*segundos?/i);
  m && (b = Math.max(1, Math.min(8, parseInt(m[1], 10))));
  /mitad de velocidad/i.test(d) && ((b *= 2), (s *= 2));
  return { b: b, p: p, s: s };
}
function D5({ active: e, tempo: tm }) {
  let t = tm && tm.b ? tm : { b: 2, p: 1, s: 2 },
    [a, l] = (0, i.useState)("down");
  if (
    ((0, i.useEffect)(() => {
      if (!e) return;
      let s = (a === "down" ? t.b : a === "hold" ? t.p : t.s) * 1e3;
      Ie(a === "down" ? 440 : a === "hold" ? 560 : 660, 120);
      let u = setTimeout(() => l((c) => (c === "down" ? "hold" : c === "hold" ? "up" : "down")), s);
      return () => clearTimeout(u);
    }, [e, a, t.b, t.p, t.s]),
    !e)
  )
    return null;
  let n =
      a === "down"
        ? "BAJA (" + t.b + "s)"
        : a === "hold"
          ? "PAUSA (" + t.p + "s)"
          : "SUBE (" + t.s + "s)",
    o = a === "down" ? "#4f9dff" : a === "hold" ? "#ffb84f" : "#3ecf8e";
  return i.default.createElement(
    "div",
    {
      className: "text-center py-2 mb-2",
      style: { border: "1px solid " + o + "55", background: "rgba(255,255,255,0.03)" },
    },
    i.default.createElement(
      "div",
      {
        style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 24, color: o, letterSpacing: 1 },
      },
      n,
    ),
  );
}
function sdcRespDias(k) {
  try {
    var v = localStorage.getItem(k);
    if (!v) return null;
    var d = Math.round((Date.parse(ue()) - Date.parse(v)) / 864e5);
    return isFinite(d) ? d : null;
  } catch (x) {
    return null;
  }
}
function sdcRespaldoOk() {
  try {
    (localStorage.setItem("dominio-corporal:ultimoRespaldo", ue()),
      localStorage.removeItem("dominio-corporal:respaldoPospuesto"));
  } catch (x) {}
}
function sdcRespaldoPosponer() {
  try {
    localStorage.setItem("dominio-corporal:respaldoPospuesto", ue());
  } catch (x) {}
}
function sdcAvisaRespaldo(e) {
  try {
    if (Object.keys((e && e.history) || {}).length < 10) return !1;
    var p = sdcRespDias("dominio-corporal:respaldoPospuesto");
    if (p !== null && p < 7) return !1;
    var d = sdcRespDias("dominio-corporal:ultimoRespaldo");
    return d === null || d >= 30;
  } catch (x) {
    return !1;
  }
}
var sdcWL = null;
function sdcWakeOn() {
  try {
    navigator.wakeLock &&
      !sdcWL &&
      navigator.wakeLock
        .request("screen")
        .then(function (w) {
          ((sdcWL = w),
            w.addEventListener("release", function () {
              sdcWL = null;
            }));
        })
        .catch(function () {});
  } catch (x) {}
}
function sdcWakeOff() {
  try {
    sdcWL && sdcWL.release();
  } catch (x) {}
  sdcWL = null;
}
function sdcWakeUse() {
  (0, i.useEffect)(() => {
    sdcWakeOn();
    let x = () => {
      document.visibilityState === "visible" && sdcWakeOn();
    };
    return (
      document.addEventListener("visibilitychange", x),
      () => {
        (document.removeEventListener("visibilitychange", x), sdcWakeOff());
      }
    );
  }, []);
}
function sdcWakeSi(on) {
  (0, i.useEffect)(() => {
    if (!on) return;
    sdcWakeOn();
    let x = () => {
      document.visibilityState === "visible" && sdcWakeOn();
    };
    return (
      document.addEventListener("visibilitychange", x),
      () => {
        (document.removeEventListener("visibilitychange", x), sdcWakeOff());
      }
    );
  }, [on]);
}
var sdcRitmos = [
  { t: "Caminata tranquila", v: 4 },
  { t: "Caminata ligera", v: 5.5 },
  { t: "Trote suave", v: 8 },
  { t: "Corriendo", v: 10 },
];
function sdcCamCrono({ inicio: e, kmh: a, onCancel: l, onListo: n }) {
  let [o, s] = (0, i.useState)(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
  sdcWakeUse();
  (0, i.useEffect)(() => {
    let t = setInterval(() => s(Math.max(0, Math.floor((Date.now() - e) / 1e3))), 500);
    return () => clearInterval(t);
  }, [e]);
  let km = Math.round((o / 3600) * a * 100) / 100,
    mm = String(Math.floor(o / 60)).padStart(2, "0"),
    ss = String(o % 60).padStart(2, "0");
  return i.default.createElement(
    "div",
    { className: "mb-3" },
    i.default.createElement(
      "div",
      {
        className: "text-center py-3 mb-2",
        style: { border: "1px solid #7c5cff55", background: "rgba(124,92,255,0.06)" },
      },
      i.default.createElement(
        "div",
        { className: "text-xs", style: { color: "#9aa4bd" } },
        "Salida en curso",
      ),
      i.default.createElement(
        "div",
        { style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 38, color: "#b9a5ff" } },
        mm + ":" + ss,
      ),
      i.default.createElement(
        "div",
        { className: "text-xs", style: { color: "#9aa4bd" } },
        "≈ " + km.toFixed(2).replace(".", ",") + " km a " + String(a).replace(".", ",") + " km/h",
      ),
    ),
    i.default.createElement(
      "div",
      { className: "grid grid-cols-2 gap-2" },
      i.default.createElement(
        "button",
        {
          onClick: () => n(km),
          className: "py-2 text-xs",
          style: {
            minHeight: 44,
            background: "rgba(124,92,255,0.15)",
            border: "1px solid #7c5cff",
            color: "#e8ecf7",
            fontWeight: 600,
          },
        },
        "Terminar",
      ),
      i.default.createElement(
        "button",
        {
          onClick: l,
          className: "py-2 text-xs",
          style: {
            minHeight: 44,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#9aa4bd",
          },
        },
        "Cancelar",
      ),
    ),
  );
}
var sdcCalorFases = ["PULSO", "MOVILIDAD", "ACTIVACIÓN", "ENSAYO"];
var sdcCalorPasos = [
  {
    f: 1,
    name: "Trote en el lugar",
    desc: "Trote corto y suave, con los brazos sueltos. Tiene que dejarte hablar sin jadear.",
    seconds: 40,
    pr: 10,
  },
  {
    f: 1,
    name: "Saltos de tijera",
    desc: "Abre y cierra piernas y brazos a un ritmo cómodo. Sin impacto: un paso al costado en lugar del salto.",
    seconds: 30,
  },
  {
    f: 2,
    name: "Círculos de brazos",
    desc: "Brazos estirados a los costados, círculos cada vez más amplios. A mitad de tiempo, cambia de sentido.",
    seconds: 20,
  },
  {
    f: 2,
    name: "Círculos de cadera",
    desc: "Pies al ancho de los hombros y manos en la cintura. Dibuja círculos grandes con la cadera y, a mitad de tiempo, cambia de sentido.",
    seconds: 20,
  },
  {
    f: 2,
    name: "Balanceo de pierna",
    desc: "De costado a una pared, con una mano apoyada. Balancea la pierna libre adelante y atrás, cada vez un poco más alto, sin forzar el final.",
    seconds: 15,
    lados: 1,
    pr: 8,
  },
  {
    f: 2,
    name: "Muñecas",
    desc: "En cuatro apoyos, manos bajo los hombros. Lleva el peso adelante y atrás sobre las palmas, despacio y sin despegarlas del suelo.",
    seconds: 20,
    pr: 8,
  },
];
var sdcCalorPuente = {
    name: "Puente de glúteos",
    desc: "Boca arriba, rodillas dobladas y pies apoyados. Sube la cadera apretando los glúteos, pausa un segundo arriba y baja lento.",
    ev: /puente de gl/i,
  },
  sdcCalorEscap = {
    name: "Flexiones escapulares",
    desc: "En plancha con los brazos estirados. Sin doblar los codos, deja que el pecho baje un poco juntando los omóplatos y después empuja el suelo para separarlos.",
    ev: /escapular/i,
  },
  sdcCalorDead = {
    name: "Deadbug",
    desc: "Boca arriba, brazos hacia el techo y rodillas dobladas en el aire. Estira un brazo y la pierna contraria sin despegar la zona lumbar del suelo, vuelve y alterna.",
    ev: /dead ?bug|bicho muerto/i,
  },
  sdcCalorHollow = {
    name: "Hollow con rodillas dobladas",
    desc: "Boca arriba con la zona lumbar pegada al suelo. Despega un poco los hombros y los pies, con las rodillas dobladas, y sostén respirando.",
    ev: /hollow/i,
  };
var sdcCalorAct = {
  squat: [
    sdcCalorPuente,
    {
      name: "Sentadilla lenta",
      desc: "Pies al ancho de los hombros. Baja en tres segundos hasta donde llegues con la espalda larga y sube a ritmo normal.",
    },
  ],
  pushup: [
    sdcCalorEscap,
    {
      name: "Toques de hombro en plancha",
      desc: "En plancha con los brazos estirados. Toca con una mano el hombro contrario y alterna, sin que la cadera se balancee.",
    },
  ],
  back: [
    {
      name: "Y boca abajo",
      desc: "Boca abajo, brazos estirados por encima de la cabeza formando una Y, pulgares hacia el techo. Levanta los brazos del suelo juntando los omóplatos y baja lento.",
    },
  ],
  abs: [sdcCalorDead, sdcCalorHollow],
};
var sdcCalorActF = {
  squat: [
    {
      name: "Cuclillas con balanceo",
      desc: "Baja a cuclillas profundas, pies al ancho de los hombros y talones en el suelo si se puede. Pasa el peso de un pie al otro sin levantarte.",
      ev: /profunda|cuclillas/i,
    },
    sdcCalorPuente,
  ],
  pushup: [
    {
      name: "Balanceo en bestia",
      desc: "En cuatro apoyos con las rodillas a un palmo del suelo, sin apoyarlas: esa es la bestia. Lleva los hombros por delante de las manos y vuelve, despacio.",
      ev: /bestia|beast|cuadrupedia|\boso\b/i,
    },
    sdcCalorEscap,
  ],
  abs: [sdcCalorHollow, sdcCalorDead],
};
function sdcCalor(e) {
  return (e && e.today && e.today.calentamiento) || {};
}
function sdcCalorLista(mod, rk) {
  var l = [],
    k,
    s,
    g,
    op,
    nm,
    j,
    a,
    gs = ["squat", "pushup", "back", "abs"];
  for (k = 0; k < sdcCalorPasos.length; k++) {
    s = sdcCalorPasos[k];
    if (s.lados) {
      l.push({
        f: s.f,
        name: s.name,
        desc: s.desc,
        seconds: s.seconds,
        lado: "lado derecho",
        prep: s.pr,
      });
      l.push({ f: s.f, name: s.name, desc: s.desc, seconds: s.seconds, lado: "lado izquierdo" });
    } else
      l.push({ f: s.f, name: s.name, desc: s.desc, seconds: s.seconds, lado: null, prep: s.pr });
  }
  for (k = 0; k < gs.length; k++) {
    g = gs[k];
    op = (mod === "flow" && sdcCalorActF[g]) || sdcCalorAct[g];
    nm = (_d(g, rk, mod) || {}).name || "";
    a = op[0];
    for (j = 0; j < op.length; j++)
      if (!op[j].ev || !op[j].ev.test(nm)) {
        a = op[j];
        break;
      }
    l.push({ f: 3, name: a.name, desc: a.desc, seconds: 20, lado: null, prep: 8 });
  }
  return l;
}
function sdcCalorEnsayo(e, mod, mt) {
  var gs = ["squat", "pushup", "back", "abs"],
    l = [],
    k,
    g,
    x,
    t,
    pr,
    sg,
    n,
    tx,
    sk,
    kg,
    rk = e.progress.rank;
  for (k = 0; k < gs.length; k++) {
    g = gs[k];
    t = Math.max(0, Math.round((mt && mt[g]) || 0));
    if (!t) continue;
    x = _d(g, rk, mod) || {};
    if (!x.name) continue;
    pr = sdcSplit(t, sdcNSets(t))[0] || t;
    sg = sdcSegs($s(rk, g, mod) || Js[g]);
    if (sg > 0) {
      n = Math.max(5, Math.min(15, Math.round((pr * sg) / 15) * 5));
      tx = n + " segundos, " + (mod === "gym" ? "sin carga extra" : "sin llegar al temblor");
    } else if (mod === "gym") {
      n = Math.max(4, Math.min(8, Math.round(pr * 0.6)));
      sk = sdcSugKg(e, g, x.name);
      kg = sk && sk.kg ? sk.kg / 2 : 0;
      if (kg > 0) {
        var pa = sdcIncKg(kg, g);
        kg = Math.round(kg / pa) * pa;
      }
      tx =
        n +
        " repeticiones con la mitad del peso" +
        (kg > 0 ? " (≈ " + sdcKgTxt(kg) + " kg)" : " que vas a usar");
    } else {
      n = Math.max(pr >= 5 ? 2 : 1, Math.min(6, Math.round(pr * 0.4)));
      tx = n + (n === 1 ? " repetición suave" : " repeticiones suaves");
    }
    l.push({ g: g, name: x.name, dosis: tx, sost: sg > 0 });
  }
  return l;
}
function sdcEstDesde(l, k) {
  var a = 0,
    j;
  for (j = 0; j < k && j < l.length; j++) a += (l[j].prep || sdcEstPrep) + l[j].seconds;
  return a;
}
function sdcPasosV(e) {
  return (e && e.pasosVistos) || {};
}
function sdcPasoEspera(l, k, v) {
  var s = l && l[k];
  if (!s) return !1;
  if (k > 0 && l[k - 1].name === s.name) return !1;
  return !(v && v[s.name]);
}
function sdcPasosMarcar(a, l, n) {
  if (!a || !l) return a;
  var v = {},
    q,
    o = a.pasosVistos || {},
    j;
  for (q in o) v[q] = o[q];
  for (j = 0; j < n && j < l.length; j++) v[l[j].name] = 1;
  a.pasosVistos = v;
  return a;
}
function sdcPasosHook(r, l, n) {
  r && r.state && sdcPasosMarcar(r.state, l, n);
  return r;
}
function sdcPasoVista({
  ls: ls,
  p: p,
  cab: cab,
  col: col,
  esp: esp,
  pz: pz,
  fin: fn,
  resto: rs,
  onListo: oL,
  onYa: oY,
  onPausa: oP,
  onSeguir: oS,
  onTerminar: oT,
}) {
  let s = ls[p.index],
    m = ls[p.index + 1],
    pr = p.prep > 0,
    cc = esp || pr ? "#ffb84f" : col,
    bSec = {
      minHeight: 44,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#e8ecf7",
      fontWeight: 600,
    },
    bPri = {
      minHeight: 48,
      background: col,
      border: "1px solid " + col,
      color: "#0a0e1a",
      fontWeight: 700,
    },
    et = esp
      ? "LEÉ Y PONETE EN POSICIÓN"
      : pz
        ? "EN PAUSA"
        : pr
          ? p.index === 0
            ? "PONETE EN POSICIÓN"
            : "PREPARATE"
          : null;
  return i.default.createElement(
    "div",
    null,
    cab,
    i.default.createElement(
      "div",
      { className: "text-center" },
      et
        ? i.default.createElement(
            "div",
            {
              className: "text-xs uppercase",
              style: {
                letterSpacing: 2,
                color: pz && !esp ? "#9aa4bd" : "#ffb84f",
                fontWeight: 700,
                marginTop: 2,
              },
            },
            et,
          )
        : null,
      i.default.createElement(
        "div",
        {
          style: {
            fontFamily: "Chakra Petch, sans-serif",
            fontSize: 20,
            color: "#e8ecf7",
            fontWeight: 700,
          },
        },
        s.name,
      ),
      s.lado
        ? i.default.createElement(
            "div",
            { className: "text-sm", style: { color: cc, fontWeight: 700 } },
            s.lado,
          )
        : null,
      i.default.createElement(
        "div",
        {
          className: "mt-1",
          style: { fontSize: esp ? 15 : 14, lineHeight: 1.5, color: "#c8d0e4" },
        },
        s.desc,
      ),
      esp
        ? null
        : i.default.createElement(
            "div",
            {
              style: {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 34,
                color: pz ? "#7a83a0" : cc,
                marginTop: 6,
              },
            },
            pr ? p.prep : p.left,
            "s",
          ),
    ),
    esp
      ? null
      : i.default.createElement(qa, {
          value: pr ? (s.prep || sdcEstPrep) - p.prep : s.seconds - p.left,
          max: pr ? s.prep || sdcEstPrep : s.seconds,
          color: pz ? "#5a6178" : cc,
        }),
    i.default.createElement(
      "div",
      { className: "text-xs mt-2 text-center", style: { color: "#7a83a0" } },
      m ? (m.name === s.name ? "Ahora el otro lado" : "Sigue: " + m.name) : fn,
      rs,
    ),
    esp
      ? i.default.createElement(
          "button",
          { onClick: oL, className: "w-full mt-3 py-3 text-sm", style: bPri },
          "Listo, empezar →",
        )
      : pz
        ? i.default.createElement(
            "button",
            { onClick: oS, className: "w-full mt-3 py-3 text-sm", style: bPri },
            "Seguir →",
          )
        : pr
          ? i.default.createElement(
              "button",
              {
                onClick: oY,
                className: "w-full mt-3 py-2 text-sm",
                style: {
                  minHeight: 44,
                  background: "rgba(255,184,79,0.12)",
                  border: "1px solid #ffb84f",
                  color: "#ffb84f",
                  fontWeight: 700,
                },
              },
              "Ya estoy →",
            )
          : null,
    esp || pz
      ? i.default.createElement(
          "button",
          { onClick: oT, className: "w-full mt-2 py-2 text-sm", style: bSec },
          "Terminar acá",
        )
      : i.default.createElement(
          "div",
          { className: "grid grid-cols-2 gap-2 mt-2" },
          i.default.createElement(
            "button",
            { onClick: oP, className: "py-2 text-sm", style: bSec },
            "Pausa",
          ),
          i.default.createElement(
            "button",
            { onClick: oT, className: "py-2 text-sm", style: bSec },
            "Terminar acá",
          ),
        ),
  );
}
function sdcCalorCorre(c, mod, tt) {
  return c.ini > 0 && c.mod === mod && (c.pz || Date.now()) - c.ini < (tt + 1200) * 1e3;
}
function sdcCalorT(c) {
  return Math.max(0, Math.floor(((c.pz || Date.now()) - c.ini) / 1e3));
}
function sdcCalorIni(e, mod) {
  var a = M(e),
    c = sdcCalor(a);
  a.today.calentamiento = {
    mod: mod,
    ini: Date.now(),
    pot: 0,
    xp: !!c.xp,
    hecho: !!c.hecho,
    pz: 0,
    ok: -1,
  };
  return { state: a, notices: [] };
}
function sdcCalorPrep(e, s) {
  var a = M(e),
    c = a.today.calentamiento;
  c && c.ini && !c.pz && (c.ini -= s * 1e3);
  return { state: a, notices: [] };
}
function sdcCalorPausa(e) {
  var a = M(e),
    c = a.today.calentamiento;
  c && c.ini && !c.pz && (c.pz = Date.now());
  return { state: a, notices: [] };
}
function sdcCalorSeguir(e) {
  var a = M(e),
    c = a.today.calentamiento;
  c && c.ini && c.pz && ((c.ini += Date.now() - c.pz), (c.pz = 0));
  return { state: a, notices: [] };
}
function sdcCalorEspera(e, w) {
  var a = M(e),
    c = a.today.calentamiento;
  c && c.ini && !c.pz && (c.pz = w);
  return { state: a, notices: [] };
}
function sdcCalorListo(e, k, d0) {
  var a = M(e),
    c = a.today.calentamiento;
  c && c.ini && ((c.ini = Date.now() - d0 * 1e3), (c.pz = 0), (c.ok = k));
  return { state: a, notices: [] };
}
function sdcCalorPot(e) {
  var a = M(e),
    c = a.today.calentamiento;
  c && c.ini && (c.pot = (c.pot || 0) + 1);
  return { state: a, notices: [] };
}
function sdcCalorFin(e, hh, tt, ls) {
  var a = M(e),
    c = sdcCalor(a),
    l = [],
    fr,
    n,
    o;
  if (!c.ini) return { state: a, notices: l };
  fr = tt > 0 ? Math.max(0, Math.min(1, (hh || 0) / tt)) : 1;
  a.today.calentamiento = {
    mod: c.mod,
    ini: 0,
    pot: 0,
    xp: !!c.xp,
    hecho: !!c.hecho || fr >= 0.34,
  };
  sdcPasosMarcar(a, ls, Math.min(hh || 0, ls ? ls.length : 0));
  if (fr < 0.34)
    return {
      state: a,
      notices: [
        "Calentamiento cortado muy temprano, sin XP. Si vas a entrenar igual, hacé las primeras series más livianas.",
      ],
    };
  if (c.xp)
    return { state: a, notices: ["Calentamiento hecho. La XP de hoy ya la habías sumado."] };
  a.today.calentamiento.xp = !0;
  n = Math.round(10 * fr);
  a.streak.flexBuff && (n = Math.round(n * 1.1));
  n = Math.round(n * Ka(a));
  a.progress.currentXP += n;
  a.today.xpEarned = (a.today.xpEarned || 0) + n;
  l.push(
    fr >= 0.999
      ? "+" + n + " XP por calentar. Ahora sí, la rutina."
      : "+" + n + " XP por lo que alcanzaste a calentar.",
  );
  a = Ea(a, l);
  o = da(a);
  return { state: o.state, notices: l.concat(o.notices) };
}
function sdcCalorDer(e, mod, mt) {
  var c = sdcCalor(e),
    ls = sdcCalorLista(mod, e.progress.rank),
    tt = sdcEstTotal(ls);
  if (sdcCalorCorre(c, mod, tt)) return "en curso";
  if (c.hecho) return "hecho ✓";
  return (
    "≈ " + Math.max(1, Math.round((tt + sdcCalorEnsayo(e, mod, mt).length * 20) / 60)) + " min"
  );
}
function sdcCalorCard({ st: e, mod: B, metas: mt, Ne: Ne, onModo: om, sinSeries: ss }) {
  let [, tk] = (0, i.useState)(0),
    [ul, sul] = (0, i.useState)(-1),
    c = sdcCalor(e),
    ls = sdcCalorLista(B, e.progress.rank),
    en = sdcCalorEnsayo(e, B, mt),
    tt = sdcEstTotal(ls),
    tot = ls.length + en.length,
    corre = sdcCalorCorre(c, B, tt),
    t = corre ? sdcCalorT(c) : 0,
    k = c.pot || 0,
    enE = corre && t >= tt,
    p = corre && !enE ? sdcEstPaso(ls, t) : null,
    ok = c.ok === void 0 ? -1 : c.ok,
    esp = !!(p && p.prep > 0 && ok < p.index && sdcPasoEspera(ls, p.index, sdcPasosV(e))),
    fs = !corre ? -1 : enE ? 1e3 + k : p.index * 2 + (p.prep > 0 ? 0 : 1),
    ac = "#ff8f5a",
    fin = (hh) => Ne((d) => sdcCalorFin(d, hh, tot, ls)),
    arr = () => {
      (sdcBeep(660, 120), sdcVib(22), Ne((d) => sdcCalorIni(d, B)));
    },
    bSec = {
      minHeight: 44,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#e8ecf7",
      fontWeight: 600,
    };
  sdcWakeSi(corre);
  (0, i.useEffect)(() => {
    if (!corre) return;
    let x = setInterval(() => tk((n) => n + 1), 300);
    return () => clearInterval(x);
  }, [corre, c.ini, c.pz]);
  (0, i.useEffect)(() => {
    if (fs < 0) return;
    if (ul < 0 || fs < ul) {
      sul(fs);
      return;
    }
    if (fs === ul) return;
    sul(fs);
    fs === 1e3
      ? (sdcBeep(880, 160), sdcVib([30, 50, 30]))
      : fs < 1e3 &&
        (p && p.prep > 0 ? (sdcBeep(520, 120), sdcVib(18)) : (sdcBeep(760, 140), sdcVib(22)));
  }, [fs]);
  (0, i.useEffect)(() => {
    esp && !c.pz && Ne((d) => sdcCalorEspera(d, c.ini + sdcEstDesde(ls, p.index) * 1e3));
  }, [esp, c.pz]);
  (0, i.useEffect)(() => {
    corre &&
      enE &&
      k >= en.length &&
      (sdcBeep(880, 200),
      setTimeout(() => sdcBeep(1175, 340), 210),
      sdcVib([40, 60, 140]),
      fin(tot));
  }, [corre, enE, k, en.length]);
  let cab = (f, n) =>
    i.default.createElement(
      "div",
      { className: "flex items-center justify-between mb-1" },
      i.default.createElement(
        "span",
        { className: "text-xs", style: { letterSpacing: 2, color: ac, fontWeight: 700 } },
        f,
        " · ",
        sdcCalorFases[f - 1],
      ),
      i.default.createElement(
        "span",
        { className: "text-xs", style: { color: "#9aa4bd" } },
        "Paso ",
        n,
        " de ",
        tot,
      ),
    );
  if (!corre) {
    if (c.hecho)
      return i.default.createElement(
        "div",
        null,
        i.default.createElement(
          "div",
          { className: "flex items-center gap-2 text-sm", style: { color: "#3ecf8e" } },
          i.default.createElement(Mn, { size: 16 }),
          " Calentaste hoy",
        ),
        i.default.createElement(sdcAnimoAhora, {
          st: e,
          Ne: Ne,
          onModo: om || function () {},
          sinSeries: ss,
        }),
        i.default.createElement(
          "div",
          { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
          "Si más tarde entrenás otra vez, conviene repetirlo.",
        ),
        i.default.createElement(
          "button",
          {
            onClick: arr,
            className: "w-full mt-2 py-2 text-xs",
            style: {
              minHeight: 44,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#9aa4bd",
            },
          },
          "Calentar de nuevo (sin XP)",
        ),
      );
    return i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "button",
        {
          onClick: arr,
          className: "w-full py-3 px-3 text-sm text-left",
          style: {
            background: "rgba(255,143,90,0.12)",
            border: "1px solid " + ac,
            color: ac,
            fontWeight: 700,
          },
        },
        i.default.createElement(
          "div",
          { className: "flex items-center justify-between" },
          i.default.createElement(
            "span",
            { style: { display: "inline-flex", alignItems: "center", gap: 8 } },
            i.default.createElement(Ph, { size: 16 }),
            "Empezar",
          ),
          i.default.createElement(
            "span",
            { className: "text-xs", style: { whiteSpace: "nowrap" } },
            "≈ ",
            Math.max(1, Math.round((tt + en.length * 20) / 60)),
            " min · ",
            tot,
            " pasos",
          ),
        ),
        i.default.createElement(
          "div",
          { className: "text-xs mt-1", style: { color: "#9aa4bd", fontWeight: 400 } },
          "Pulso, movilidad, activación y un ensayo suave de tus ejercicios de hoy",
        ),
      ),
      i.default.createElement(
        "div",
        { className: "text-xs mt-2", style: { color: "#7a83a0" } },
        "Da 10 XP una vez por día.",
      ),
    );
  }
  if (!enE)
    return i.default.createElement(sdcPasoVista, {
      ls: ls,
      p: p,
      cab: cab(ls[p.index].f, p.index + 1),
      col: ac,
      esp: esp,
      pz: !!c.pz && !esp,
      fin: en.length ? "Sigue: el ensayo de tus ejercicios" : "Último paso",
      resto: en.length
        ? " · " + sdcEstMMSS(tt - t) + " hasta el ensayo"
        : " · queda " + sdcEstMMSS(tt - t),
      onListo: () => {
        let d0 = sdcEstDesde(ls, p.index) + Math.max(0, (ls[p.index].prep || sdcEstPrep) - 3);
        (sdcBeep(660, 100), Ne((d) => sdcCalorListo(d, p.index, d0)));
      },
      onYa: () => Ne((d) => sdcCalorPrep(d, p.prep)),
      onPausa: () => Ne((d) => sdcCalorPausa(d)),
      onSeguir: () => Ne((d) => sdcCalorSeguir(d)),
      onTerminar: () => fin(p.index),
    });
  if (k < en.length) {
    let x = en[k],
      gy = B === "gym",
      sig = () => {
        (sdcBeep(760, 120), sdcVib(22), Ne((d) => sdcCalorPot(d)));
      };
    return i.default.createElement(
      "div",
      null,
      cab(4, ls.length + k + 1),
      i.default.createElement(
        "div",
        { className: "text-center" },
        i.default.createElement(
          "div",
          {
            className: "text-xs uppercase",
            style: { letterSpacing: 2, color: "#9aa4bd", marginTop: 2 },
          },
          "Ejercicio ",
          k + 1,
          " de ",
          en.length,
          " · el mismo de tu rutina",
        ),
        i.default.createElement(
          "div",
          {
            style: {
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 20,
              color: "#e8ecf7",
              fontWeight: 700,
            },
          },
          x.name,
        ),
        i.default.createElement(
          "div",
          {
            style: {
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 18,
              color: ac,
              fontWeight: 700,
              marginTop: 4,
            },
          },
          x.dosis,
        ),
        i.default.createElement(
          "div",
          { className: "mt-1", style: { fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" } },
          x.sost
            ? "En la posición exacta y sin apurarte: es un ensayo, no una serie."
            : "Con todo el recorrido y lejos del cansancio: es un ensayo, no una serie.",
          gy ? " Si la máquina está ocupada, hazlo justo antes de su primera serie." : "",
        ),
      ),
      i.default.createElement(
        "button",
        {
          onClick: sig,
          className: "w-full mt-3 py-3 text-sm",
          style: {
            minHeight: 48,
            background: ac,
            border: "1px solid " + ac,
            color: "#0a0e1a",
            fontWeight: 700,
          },
        },
        k + 1 < en.length ? "Hecho →" : "Hecho, terminar",
      ),
      gy
        ? i.default.createElement(
            "button",
            {
              onClick: sig,
              className: "w-full mt-2 py-2 text-xs",
              style: {
                minHeight: 44,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#9aa4bd",
              },
            },
            "Lo hago antes de su primera serie",
          )
        : null,
      i.default.createElement(
        "button",
        { onClick: () => fin(ls.length + k), className: "w-full mt-2 py-2 text-sm", style: bSec },
        "Terminar acá",
      ),
    );
  }
  return null;
}
var sdcAnimoEsc = [
  { n: 1, t: "Sin ganas", f: "sin ganas" },
  { n: 2, t: "Pocas ganas", f: "con pocas ganas" },
  { n: 3, t: "Normal", f: "normal" },
  { n: 4, t: "Con ganas", f: "con ganas" },
  { n: 5, t: "A full", f: "a full" },
];
var sdcAnimoCuerpo = [
  { k: "cansancio", t: "Cansancio" },
  { k: "cargado", t: "Músculos cargados" },
  { k: "dolor", t: "Me duele algo" },
  { k: "bien", t: "Bien" },
];
var sdcAnimoTx = { fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" },
  sdcAnimoB2 = {
    minHeight: 44,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#e8ecf7",
    fontWeight: 600,
  },
  sdcAnimoB1 = {
    minHeight: 48,
    background: "#4f9dff",
    border: "1px solid #4f9dff",
    color: "#0a0e1a",
    fontWeight: 700,
  },
  sdcAnimoTit = {
    fontFamily: "Chakra Petch, sans-serif",
    fontSize: 16,
    color: "#e8ecf7",
    fontWeight: 700,
  },
  sdcAnimoEvBox = {
    background: "rgba(62,207,142,0.1)",
    border: "1px solid rgba(62,207,142,0.4)",
    color: "#bdf0d9",
  };
function sdcAnimoHoy(e) {
  return e && e.today ? sdcAnimo(e)[e.today.date] || {} : {};
}
function sdcAnimoOn(e) {
  return ye(e, "animo");
}
function sdcAnimoOtra(f) {
  return i.default.createElement(
    "button",
    {
      onClick: f,
      className: "text-xs",
      style: {
        color: "#7a83a0",
        minHeight: 40,
        padding: "0 4px",
        marginLeft: "auto",
        flexShrink: 0,
        background: "transparent",
        border: "none",
        textDecoration: "underline",
      },
    },
    "Cambiar respuesta",
  );
}
function sdcAnimoFrase(n) {
  var x = sdcAnimoEsc[(n || 3) - 1];
  return x ? x.f : "";
}
function sdcAnimoPut(e, cp) {
  var a = M(e),
    d = a.today.date,
    m = {},
    k,
    v = sdcAnimo(a),
    o,
    h = {},
    ks;
  for (k in v) m[k] = v[k];
  o = m[d] || {};
  for (k in o) h[k] = o[k];
  for (k in cp) h[k] = cp[k];
  m[d] = h;
  a.seenUnlocks && a.seenUnlocks.indexOf("animo") < 0 && a.seenUnlocks.push("animo");
  ks = Object.keys(m).sort();
  for (k = 0; k < ks.length - 400; k++) delete m[ks[k]];
  a.animo = m;
  return a;
}
function sdcAnimoSet(e, cp) {
  return { state: sdcAnimoPut(e, cp), notices: [] };
}
function sdcAnimoSetDa(e, cp) {
  var o = da(sdcAnimoPut(e, cp));
  return { state: o.state, notices: o.notices };
}
function sdcAnimoCalor(e, B) {
  var r = sdcCalorIni(sdcAnimoPut(e, { ack: 1 }), B),
    a = r.state;
  a.ui = a.ui || { collapsed: {} };
  a.ui.collapsed = a.ui.collapsed || {};
  a.ui.collapsed.calentamiento = !1;
  return r;
}
function sdcAbrirCard(e, id) {
  var a = M(e);
  a.ui = a.ui || { collapsed: {} };
  a.ui.collapsed = a.ui.collapsed || {};
  a.ui.collapsed[id] = !1;
  return { state: a, notices: [] };
}
function sdcAnimoEvid(e) {
  var v = sdcAnimo(e),
    hoy = e.today.date,
    ks = Object.keys(v)
      .filter(function (k) {
        var x = v[k];
        return k < hoy && x && x.antes && x.antes <= 2 && x.despues;
      })
      .sort()
      .slice(-5),
    m = 0;
  ks.forEach(function (k) {
    v[k].despues > v[k].antes && m++;
  });
  return { n: ks.length, m: m };
}
function sdcCargaRacha(e) {
  var v = sdcAnimo(e),
    ks = Object.keys(v)
      .filter(function (k) {
        return v[k] && v[k].carga;
      })
      .sort()
      .slice(-3),
    c,
    j;
  if (ks.length < 3) return null;
  c = v[ks[0]].carga;
  for (j = 1; j < 3; j++) if (v[ks[j]].carga !== c) return null;
  return c === "justa" ? null : c;
}
function sdcCara({ n: n, size: s, color: c }) {
  var bo = [
    "M8 16.6 Q12 12.6 16 16.6",
    "M8.5 16 Q12 14.3 15.5 16",
    "M8.5 15.2 L15.5 15.2",
    "M8.5 14.4 Q12 17.6 15.5 14.4",
    "M7.5 13.4 H16.5 Q12 20.2 7.5 13.4 Z",
  ][(n || 3) - 1];
  return i.default.createElement(
    "svg",
    { width: s || 26, height: s || 26, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
    i.default.createElement("circle", { cx: 12, cy: 12, r: 9.5, stroke: c, strokeWidth: 1.8 }),
    i.default.createElement("circle", { cx: 9, cy: 10, r: 1.2, fill: c }),
    i.default.createElement("circle", { cx: 15, cy: 10, r: 1.2, fill: c }),
    i.default.createElement("path", {
      d: bo,
      stroke: c,
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: n === 5 ? c : "none",
    }),
  );
}
function sdcCaras({ sel: sl, onPick: op }) {
  return i.default.createElement(
    "div",
    { style: { display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 4 } },
    sdcAnimoEsc.map(function (x) {
      var on = sl === x.n,
        cc = on ? "#4f9dff" : "#c8d0e4";
      return i.default.createElement(
        "button",
        {
          key: x.n,
          onClick: function () {
            (sdcBeep(560 + x.n * 60, 70), sdcVib(12), op(x.n));
          },
          "aria-pressed": on,
          style: {
            minHeight: 66,
            padding: "6px 2px",
            background: on ? "rgba(79,157,255,0.15)" : "rgba(255,255,255,0.03)",
            border: "1px solid " + (on ? "#4f9dff" : "rgba(255,255,255,0.12)"),
            color: cc,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 4,
            paddingTop: 8,
          },
        },
        i.default.createElement(sdcCara, { n: x.n, size: 26, color: cc }),
        i.default.createElement(
          "span",
          {
            style: {
              fontSize: 11,
              lineHeight: 1.2,
              textAlign: "center",
              minHeight: 27,
              display: "flex",
              alignItems: "center",
            },
          },
          x.t,
        ),
      );
    }),
  );
}
function sdcAnimoAntes({ st: e, Ne: Ne, mod: B, onModo: om, descLibre: dl, onDescanso: odc }) {
  let [cf, scf] = (0, i.useState)(!1),
    h = sdcAnimoHoy(e),
    cambiar = i.default.createElement(
      "button",
      {
        onClick: () => {
          (scf(!1),
            h.modo && om("normal"),
            Ne((d) => sdcAnimoSet(d, { antes: 0, cuerpo: 0, modo: 0, ack: 0 })));
        },
        className: "text-xs",
        style: {
          color: "#7a83a0",
          minHeight: 40,
          padding: "0 4px",
          background: "transparent",
          border: "none",
          textDecoration: "underline",
        },
      },
      "Cambiar respuesta",
    );
  if (!h.antes)
    return i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "div",
        { className: "flex items-center justify-between mb-2" },
        i.default.createElement("span", { style: sdcAnimoTit }, "¿Cómo llegás hoy?"),
        i.default.createElement(
          "button",
          {
            onClick: () => Ne((d) => sdcAnimoSet(d, { no: 1 })),
            className: "text-xs",
            style: {
              color: "#7a83a0",
              minHeight: 40,
              padding: "0 4px",
              background: "transparent",
              border: "none",
            },
          },
          "Hoy no",
        ),
      ),
      i.default.createElement(sdcCaras, {
        sel: 0,
        onPick: (n) => Ne((d) => sdcAnimoSet(d, { antes: n })),
      }),
    );
  if (h.antes >= 3 || h.ack)
    return i.default.createElement(
      "div",
      { className: "flex items-center gap-2", style: sdcAnimoTx },
      i.default.createElement(sdcCara, { n: h.antes, size: 22, color: "#c8d0e4" }),
      "Llegás " + sdcAnimoFrase(h.antes) + ".",
      i.default.createElement("span", { style: { marginLeft: "auto" } }, cambiar),
    );
  if (!h.cuerpo)
    return i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "div",
        { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
        "Llegás ",
        sdcAnimoFrase(h.antes),
        ".",
      ),
      i.default.createElement("div", { className: "mb-2", style: sdcAnimoTit }, "¿Y el cuerpo?"),
      i.default.createElement(
        "div",
        { className: "grid grid-cols-2 gap-2" },
        sdcAnimoCuerpo.map((x) =>
          i.default.createElement(
            "button",
            {
              key: x.k,
              onClick: () => {
                (sdcVib(12),
                  x.k !== "dolor" && om("recovery"),
                  Ne((d) =>
                    sdcAnimoSet(
                      d,
                      x.k !== "dolor" ? { cuerpo: x.k, modo: "recovery" } : { cuerpo: x.k },
                    ),
                  ));
              },
              className: "py-2 text-sm",
              style: sdcAnimoB2,
            },
            x.t,
          ),
        ),
      ),
      i.default.createElement("div", { className: "text-right" }, cambiar),
    );
  if (h.cuerpo === "dolor")
    return i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "div",
        { className: "mb-1", style: sdcAnimoTit },
        "Hoy el cuerpo primero",
      ),
      i.default.createElement(
        "div",
        { className: "mb-3", style: sdcAnimoTx },
        "Si es un dolor agudo o punzante, no entrenes esa zona hoy. ",
        X2,
      ),
      dl
        ? cf
          ? i.default.createElement(
              "div",
              { className: "mb-2" },
              i.default.createElement(
                "div",
                { className: "text-xs mb-2", style: { color: "#ffb84f" } },
                "El día de descanso no da XP y solo tenés uno por semana.",
              ),
              i.default.createElement(
                "div",
                { className: "grid grid-cols-2 gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      (scf(!1), odc());
                    },
                    className: "py-2 text-sm",
                    style: sdcAnimoB1,
                  },
                  "Sí, descansar",
                ),
                i.default.createElement(
                  "button",
                  { onClick: () => scf(!1), className: "py-2 text-sm", style: sdcAnimoB2 },
                  "Mejor no",
                ),
              ),
            )
          : i.default.createElement(
              "button",
              { onClick: () => scf(!0), className: "w-full py-2 text-sm mb-2", style: sdcAnimoB2 },
              "Usar mi día de descanso",
            )
        : null,
      i.default.createElement(
        "button",
        {
          onClick: () => {
            (om("recovery"), Ne((d) => sdcAnimoSet(d, { modo: "recovery", ack: 1 })));
          },
          className: "w-full py-2 text-sm",
          style: sdcAnimoB2,
        },
        "Entrenar suave, sin esa zona",
      ),
      i.default.createElement("div", { className: "text-right" }, cambiar),
    );
  let ev = sdcAnimoEvid(e);
  return i.default.createElement(
    "div",
    null,
    i.default.createElement(
      "div",
      { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
      "Llegás ",
      sdcAnimoFrase(h.antes),
      ".",
    ),
    i.default.createElement(
      "div",
      { className: "mb-2", style: sdcAnimoTit },
      "Hoy alcanza con empezar",
    ),
    i.default.createElement(
      "div",
      { style: sdcAnimoTx },
      "Hacé el calentamiento y la rutina en Recuperación, con la mitad de las repeticiones. Si después del calentamiento te vino el envión, pasás a la normal.",
    ),
    ev.n >= 3 && ev.m >= 2
      ? i.default.createElement(
          "div",
          { className: "mt-2 p-2 text-sm", style: sdcAnimoEvBox },
          "Las últimas ",
          ev.n,
          " veces que llegaste así, en ",
          ev.m,
          " terminaste mejor.",
        )
      : null,
    i.default.createElement(
      "button",
      {
        onClick: () => {
          (sdcBeep(660, 100), Ne((d) => sdcAnimoCalor(d, B)));
        },
        className: "w-full mt-3 py-3 text-sm",
        style: sdcAnimoB1,
      },
      "Empezar calentamiento",
    ),
    i.default.createElement(
      "button",
      {
        onClick: () => Ne((d) => sdcAnimoSet(d, { ack: 1 })),
        className: "w-full mt-2 py-2 text-sm",
        style: sdcAnimoB2,
      },
      "Ir directo a la rutina",
    ),
    i.default.createElement("div", { className: "text-right" }, cambiar),
  );
}
function sdcAnimoAhora({ st: e, Ne: Ne, onModo: om, sinSeries: ss }) {
  let h = sdcAnimoHoy(e),
    bx = { border: "1px solid rgba(79,157,255,0.35)", background: "rgba(79,157,255,0.06)" };
  if (
    !sdcAnimoOn(e) ||
    !h.antes ||
    h.antes > 2 ||
    h.cuerpo === "dolor" ||
    h.ahoraOk ||
    !ss ||
    (e.today.doneModalities || []).length
  )
    return null;
  if (!h.ahora)
    return i.default.createElement(
      "div",
      { className: "mt-3 p-2", style: bx },
      i.default.createElement("div", { className: "mb-2", style: sdcAnimoTit }, "¿Y ahora?"),
      i.default.createElement(sdcCaras, {
        sel: 0,
        onPick: (n) =>
          Ne((d) => {
            let r = sdcAnimoSet(d, n <= 2 ? { ahora: n, ahoraOk: 1 } : { ahora: n });
            n <= 2 && (r.notices = ["Seguí en Recuperación: con eso alcanza."]);
            return r;
          }),
      }),
    );
  return i.default.createElement(
    "div",
    { className: "mt-3 p-2", style: bx },
    i.default.createElement(
      "div",
      { className: "mb-2", style: sdcAnimoTx },
      "Te vino el envión. ¿Hacés la rutina normal?",
    ),
    i.default.createElement(
      "div",
      { className: "grid grid-cols-2 gap-2" },
      i.default.createElement(
        "button",
        {
          onClick: () => {
            (om("normal"), Ne((d) => sdcAnimoSet(d, { modo: "normal", ahoraOk: 1 })));
          },
          className: "py-2 text-sm",
          style: sdcAnimoB1,
        },
        "Normal",
      ),
      i.default.createElement(
        "button",
        {
          onClick: () => Ne((d) => sdcAnimoSet(d, { ahoraOk: 1 })),
          className: "py-2 text-sm",
          style: sdcAnimoB2,
        },
        "Sigo en Recuperación",
      ),
    ),
  );
}
function sdcAnimoDespues({ st: e, Ne: Ne, onPrueba: op }) {
  let h = sdcAnimoHoy(e),
    bx = { marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" };
  if (h.no) return null;
  let delta = h.despues
    ? h.antes
      ? "Llegaste " +
        sdcAnimoFrase(h.antes) +
        " y te vas " +
        (h.despues === h.antes ? "igual" : sdcAnimoFrase(h.despues)) +
        "."
      : "Te vas " + sdcAnimoFrase(h.despues) + "."
    : "";
  if (!h.despues)
    return i.default.createElement(
      "div",
      { style: bx },
      i.default.createElement("div", { className: "mb-2", style: sdcAnimoTit }, "¿Cómo te vas?"),
      i.default.createElement(sdcCaras, {
        sel: 0,
        onPick: (n) => Ne((d) => sdcAnimoSetDa(d, { despues: n })),
      }),
    );
  if (!h.carga)
    return i.default.createElement(
      "div",
      { style: bx },
      i.default.createElement(
        "div",
        { className: "mb-2 flex items-center gap-2", style: sdcAnimoTx },
        delta,
        sdcAnimoOtra(() => Ne((d) => sdcAnimoSet(d, { despues: 0, carga: 0 }))),
      ),
      i.default.createElement(
        "div",
        { className: "mb-2", style: sdcAnimoTit },
        "¿Cómo te quedó la rutina?",
      ),
      i.default.createElement(
        "div",
        { className: "grid grid-cols-3 gap-2" },
        [
          ["corta", "Corta"],
          ["justa", "Justa"],
          ["mucha", "Mucha"],
        ].map((x) =>
          i.default.createElement(
            "button",
            {
              key: x[0],
              onClick: () => {
                (sdcVib(12), Ne((d) => sdcAnimoSet(d, { carga: x[0] })));
              },
              className: "py-2 text-sm",
              style: sdcAnimoB2,
            },
            x[1],
          ),
        ),
      ),
    );
  let ct = sdcAnimoCuenta(e),
    cr = sdcCargaRacha(e);
  return i.default.createElement(
    "div",
    { style: bx },
    i.default.createElement(
      "div",
      { className: "flex items-center gap-2", style: sdcAnimoTx },
      i.default.createElement(sdcCara, {
        n: h.despues,
        size: 22,
        color: h.antes && h.despues > h.antes ? "#3ecf8e" : "#c8d0e4",
      }),
      delta,
      sdcAnimoOtra(() => Ne((d) => sdcAnimoSet(d, { despues: 0, carga: 0 }))),
    ),
    h.antes && h.antes <= 2 && ct.noResp >= 2
      ? i.default.createElement(
          "div",
          { className: "mt-2 p-2 text-sm", style: sdcAnimoEvBox },
          "Días que no querías: ",
          ct.noResp,
          ". En ",
          ct.noMejor,
          " terminaste mejor.",
        )
      : null,
    cr
      ? i.default.createElement(
          "div",
          { className: "mt-2" },
          i.default.createElement(
            "div",
            { style: sdcAnimoTx },
            "Las últimas 3 veces la rutina te quedó ",
            cr,
            ". Repetí la prueba de aptitud para ajustarla.",
          ),
          i.default.createElement(
            "button",
            { onClick: op, className: "w-full mt-2 py-2 text-sm", style: sdcAnimoB2 },
            "Ir a la prueba de aptitud",
          ),
        )
      : null,
  );
}
function sdcTravMin(t) {
  var m = /(\d+)\s*minutos/.exec(String(t || ""));
  return m ? parseInt(m[1], 10) : 20;
}
function sdcTravRitmo(n) {
  for (var q = 0; q < sdcPortales.length; q++) if (sdcPortales[q].n === n) return sdcPortales[q];
  return {};
}
function sdcTravCrono({ inicio: e, mins: a, on: l, off: n, onCancel: o, onListo: s }) {
  let [u1, c] = (0, i.useState)(Math.floor((Date.now() - e) / 1e3)),
    u = Math.max(0, u1);
  sdcWakeUse();
  (0, i.useEffect)(() => {
    let t = setInterval(() => c(Math.floor((Date.now() - e) / 1e3)), 500);
    return () => clearInterval(t);
  }, [e]);
  let pre = Math.max(0, Math.ceil((e - Date.now()) / 1e3)),
    tot = a * 60,
    listo = u >= tot,
    rest = Math.max(0, tot - u),
    ci = l && n ? l + n : 0,
    fu = ci ? u % ci < l : !1,
    fase = ci ? Math.floor(u / ci) * 2 + (fu ? 0 : 1) : Math.floor(u / 300),
    mm = String(Math.floor(rest / 60)).padStart(2, "0"),
    ss = String(rest % 60).padStart(2, "0");
  return (
    (0, i.useEffect)(() => {
      u > 0 && !listo && Ie(ci ? (fu ? 880 : 440) : 660, ci ? 170 : 120);
    }, [fase]),
    (0, i.useEffect)(() => {
      listo && Ie(990, 340);
    }, [listo]),
    (0, i.useEffect)(() => {
      pre === 0 && u < 2 && Ie(880, 180);
    }, [pre > 0]),
    i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "div",
        {
          className: "text-center py-3 mb-2",
          style: {
            border: "1px solid " + (listo ? "#3ecf8e55" : "#ff5c7a55"),
            background: listo ? "rgba(62,207,142,0.06)" : "rgba(255,92,122,0.06)",
          },
        },
        i.default.createElement(
          "div",
          { className: "text-xs", style: { color: "#9aa4bd" } },
          pre > 0 ? "PONETE EN POSICIÓN" : listo ? "Travesía cumplida" : "Te falta",
        ),
        i.default.createElement(
          "div",
          {
            style: {
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 40,
              color: pre > 0 ? "#ffb84f" : listo ? "#3ecf8e" : "#ff5c7a",
            },
          },
          pre > 0 ? pre : listo ? "¡Listo!" : mm + ":" + ss,
        ),
        ci && !listo && !pre
          ? i.default.createElement(
              "div",
              {
                style: {
                  fontFamily: "Chakra Petch, sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: fu ? "#ffb84f" : "#9aa4bd",
                },
              },
              fu ? "FUERTE" : "SUAVE",
            )
          : null,
      ),
      i.default.createElement(qa, { value: u, max: tot, color: listo ? "#3ecf8e" : "#ff5c7a" }),
      listo
        ? i.default.createElement(
            "button",
            {
              onClick: s,
              className: "w-full flex items-center justify-center gap-2 py-3 text-sm mt-3",
              style: { minHeight: 48, background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 },
            },
            i.default.createElement(Mn, { size: 16 }),
            " Completar travesía",
          )
        : i.default.createElement(
            "button",
            {
              onClick: o,
              className: "w-full text-xs underline mt-3",
              style: { minHeight: 44, color: "#9aa4bd" },
            },
            "Cancelar",
          ),
    )
  );
}
function T5({ seconds: e, onSkip: a, ini: t0 }) {
  let [n, tk] = (0, i.useState)(0),
    l = Math.max(0, e - Math.floor((Date.now() - (t0 || Date.now())) / 1e3));
  sdcWakeUse();
  (0, i.useEffect)(() => {
    if (l <= 0) {
      (Ie(880, 200), sdcVib([40, 60, 40]), a());
      return;
    }
    let o = setTimeout(() => tk((x) => x + 1), 250);
    return () => clearTimeout(o);
  }, [n, t0]);
  return i.default.createElement(
    "div",
    {
      style: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: "rgba(10,14,26,0.97)",
        borderTop: "2px solid #ffb84f",
        paddingBottom: "env(safe-area-inset-bottom)",
      },
    },
    i.default.createElement(
      "div",
      { className: "mx-auto", style: { maxWidth: 420, padding: "10px 16px 12px" } },
      i.default.createElement(
        "div",
        { className: "flex items-center justify-between gap-3" },
        i.default.createElement(
          "div",
          null,
          i.default.createElement(
            "div",
            { className: "text-xs", style: { color: "#9aa4bd", letterSpacing: 2 } },
            "DESCANSO",
          ),
          i.default.createElement(
            "div",
            {
              style: {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 32,
                color: "#ffb84f",
                lineHeight: 1.1,
              },
            },
            sdcEstMMSS(l),
          ),
        ),
        i.default.createElement(
          "button",
          {
            onClick: a,
            style: {
              minHeight: 44,
              padding: "0 18px",
              background: "rgba(255,184,79,0.12)",
              border: "1px solid #ffb84f",
              color: "#ffb84f",
              fontWeight: 700,
            },
          },
          "Saltar →",
        ),
      ),
      i.default.createElement(
        "div",
        { className: "mt-2" },
        i.default.createElement(qa, { value: e - l, max: e, color: "#ffb84f" }),
      ),
    ),
  );
}
var kd = [
    { id: "lento", name: "Lento", min: 3500, max: 7e3, level: 1 },
    { id: "medio", name: "Medio", min: 2e3, max: 4500, level: 2 },
    { id: "rapido", name: "Rápido", min: 1200, max: 2800, level: 3 },
  ],
  eu = 15;
function M5({ onDone: e }) {
  let [a, l] = (0, i.useState)("idle"),
    [n, o] = (0, i.useState)(kd[1]),
    [s, u] = (0, i.useState)(null),
    [c, r] = (0, i.useState)(0),
    [p, v] = (0, i.useState)(3);
  return (
    (0, i.useEffect)(() => {
      if (a !== "countdown") return;
      if (p <= 0) {
        (r(0), u(null), l("gap"));
        return;
      }
      p <= 3 && Ie(520, 110);
      let x = setTimeout(() => v((y) => y - 1), 1e3);
      return () => clearTimeout(x);
    }, [a, p]),
    (0, i.useEffect)(() => {
      if (a !== "gap") return;
      let x = n.min + Math.random() * (n.max - n.min),
        y = setTimeout(() => {
          (u(fy[Math.floor(Math.random() * fy.length)]), Ie(900, 130), l("signal"));
        }, x);
      return () => clearTimeout(y);
    }, [a, c]),
    (0, i.useEffect)(() => {
      if (a !== "signal") return;
      let x = setTimeout(() => {
        let y = c + 1;
        (r(y), u(null), y >= eu ? (Ie(1100, 250), l("done"), e(n.level)) : l("gap"));
      }, 2200);
      return () => clearTimeout(x);
    }, [a]),
    a === "idle"
      ? i.default.createElement(
          i.default.Fragment,
          null,
          i.default.createElement(
            "div",
            { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
            eu,
            " señales con huecos impredecibles. No tenés que tocar nada: dejá el teléfono apoyado, atendé a la pantalla y al sonido, y ejecutá cada orden con el cuerpo.",
          ),
          i.default.createElement(
            "div",
            { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
            "Ritmo",
          ),
          i.default.createElement(
            "div",
            { className: "grid grid-cols-3 gap-1 mb-3" },
            kd.map((x) =>
              i.default.createElement(
                "button",
                {
                  key: x.id,
                  onClick: () => o(x),
                  className: "py-2 text-xs",
                  style: {
                    background: n.id === x.id ? "#4f9dff" : "rgba(255,255,255,0.03)",
                    border: "1px solid " + (n.id === x.id ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                    color: n.id === x.id ? "#0a0e1a" : "#8a93ad",
                    fontWeight: 600,
                  },
                },
                x.name,
              ),
            ),
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => {
                (v(10), l("countdown"));
              },
              className: "w-full py-3 text-sm",
              style: { background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 },
            },
            "Empezar",
          ),
        )
      : a === "countdown"
        ? i.default.createElement(
            "div",
            { className: "text-center py-6" },
            i.default.createElement(
              "div",
              { style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 48, color: "#4f9dff" } },
              p || "¡YA!",
            ),
            i.default.createElement(
              "div",
              { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
              "Apoyá el teléfono y colocate",
            ),
          )
        : a === "done"
          ? i.default.createElement(
              "div",
              { className: "text-center" },
              i.default.createElement(
                "div",
                {
                  style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 24, color: "#3ecf8e" },
                },
                "Drill completado",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                eu,
                " señales a ritmo ",
                n.name,
              ),
              i.default.createElement(
                "button",
                {
                  onClick: () => l("idle"),
                  className: "w-full py-2 text-xs mt-3",
                  style: {
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    color: "#e8ecf7",
                    fontWeight: 600,
                  },
                },
                "Otra vez",
              ),
            )
          : i.default.createElement(
              "div",
              {
                className: "text-center",
                style: {
                  background: a === "signal" && s ? s.color : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "30px 12px",
                  transition: "background .1s",
                },
              },
              a === "signal" && s
                ? i.default.createElement(
                    i.default.Fragment,
                    null,
                    i.default.createElement(
                      "div",
                      {
                        style: {
                          fontFamily: "Chakra Petch, sans-serif",
                          fontSize: 34,
                          color: "#0a0e1a",
                          letterSpacing: 2,
                        },
                      },
                      s.label,
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-1", style: { color: "#0a0e1a" } },
                      s.action,
                    ),
                  )
                : i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 22,
                        color: "#7a83a0",
                      },
                    },
                    "· · ·",
                  ),
              i.default.createElement(
                "div",
                {
                  className: "text-xs mt-3",
                  style: { color: a === "signal" ? "#0a0e1a" : "#5a6178" },
                },
                c,
                " / ",
                eu,
              ),
            )
  );
}
function _5({ onDone: e }) {
  let [a, l] = (0, i.useState)("idle"),
    [n, o] = (0, i.useState)([]),
    [s, u] = (0, i.useState)(0),
    [c, r] = (0, i.useState)(3),
    p = (x) => {
      let y = [];
      for (let S = 0; S < x; S++) y.push(my[Math.floor(Math.random() * my.length)]);
      return y;
    };
  (0, i.useEffect)(() => {
    if (a !== "show") return;
    if (s >= n.length) {
      let y = setTimeout(() => l("execute"), 700);
      return () => clearTimeout(y);
    }
    Ie(600, 80);
    let x = setTimeout(() => u((y) => y + 1), 950);
    return () => clearTimeout(x);
  }, [a, s, n.length]);
  let v = (x) => {
    (o(p(x)), u(0), l("show"));
  };
  return a === "idle"
    ? i.default.createElement(
        i.default.Fragment,
        null,
        i.default.createElement(
          "div",
          { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
          "Vas a ver una cadena de movimientos, uno a uno. Memorizala, ejecutala completa con tu cuerpo y después comprobá si acertaste. Cada ronda añade uno más.",
        ),
        i.default.createElement(
          "button",
          {
            onClick: () => {
              (r(3), v(3));
            },
            className: "w-full py-3 text-sm",
            style: { background: "#b084f5", color: "#0a0e1a", fontWeight: 700 },
          },
          "Empezar en 3",
        ),
      )
    : a === "show"
      ? i.default.createElement(
          "div",
          { className: "text-center py-4" },
          i.default.createElement(
            "div",
            { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
            "Memorizá · ",
            s,
            " de ",
            n.length,
          ),
          i.default.createElement(
            "div",
            { style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 30, color: "#b084f5" } },
            s > 0 ? n[s - 1] : "...",
          ),
        )
      : a === "execute"
        ? i.default.createElement(
            "div",
            { className: "text-center py-4" },
            i.default.createElement(
              "div",
              { style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 22, color: "#e8ecf7" } },
              "Ejecuta la secuencia",
            ),
            i.default.createElement(
              "div",
              { className: "text-xs mt-1 mb-4", style: { color: "#9aa4bd" } },
              n.length,
              " movimientos, de memoria y en orden. Sin mirar.",
            ),
            i.default.createElement(
              "button",
              {
                onClick: () => l("reveal"),
                className: "w-full py-3 text-sm",
                style: { background: "#b084f5", color: "#0a0e1a", fontWeight: 700 },
              },
              "Ya la hice",
            ),
          )
        : a === "reveal"
          ? i.default.createElement(
              i.default.Fragment,
              null,
              i.default.createElement(
                "div",
                { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                "Esta era la secuencia:",
              ),
              n.map((x, y) =>
                i.default.createElement(
                  "div",
                  {
                    key: y,
                    className: "text-sm py-1",
                    style: { color: "#e8ecf7", borderBottom: "1px solid rgba(255,255,255,0.06)" },
                  },
                  y + 1,
                  ". ",
                  x,
                ),
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mt-3 mb-2", style: { color: "#9aa4bd" } },
                "¿La hiciste entera y en orden?",
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      (e(c - 1), l("idle"));
                    },
                    className: "flex-1 py-3 text-sm",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "No del todo",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => l("win"),
                    className: "flex-1 py-3 text-sm",
                    style: { background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Sí, correcta",
                ),
              ),
            )
          : i.default.createElement(
              "div",
              { className: "text-center" },
              i.default.createElement(
                "div",
                {
                  style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 22, color: "#3ecf8e" },
                },
                "Correcto · ",
                c,
                " movimientos",
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2 mt-3" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      (e(c), l("idle"));
                    },
                    className: "flex-1 py-2 text-xs",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Guardar y salir",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      let x = c + 1;
                      (r(x), v(x));
                    },
                    className: "flex-1 py-2 text-xs",
                    style: { background: "#b084f5", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Subir a ",
                  c + 1,
                ),
              ),
            );
}
function q5({ onDone: e }) {
  let [a, l] = (0, i.useState)("idle"),
    [n, o] = (0, i.useState)(0),
    [s, u] = (0, i.useState)(md[0]),
    [c, r] = (0, i.useState)(pd[0]);
  return (
    (0, i.useEffect)(() => {
      if (a !== "run") return;
      let p = setTimeout(() => o((v) => v + 1), 1e3);
      return () => clearTimeout(p);
    }, [a, n]),
    a === "idle"
      ? i.default.createElement(
          i.default.Fragment,
          null,
          i.default.createElement(
            "div",
            { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
            "Sostén una posición isométrica mientras resuelves una tarea mental en voz alta. Para cuando se rompa la postura o pierdas el hilo.",
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => {
                (u(md[Math.floor(Math.random() * md.length)]),
                  r(pd[Math.floor(Math.random() * pd.length)]),
                  o(0),
                  l("run"));
              },
              className: "w-full py-3 text-sm",
              style: { background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 },
            },
            "Empezar",
          ),
        )
      : a === "run"
        ? i.default.createElement(
            "div",
            { className: "text-center" },
            i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#9aa4bd" } },
              "Posición",
            ),
            i.default.createElement(
              "div",
              { style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 20, color: "#e8ecf7" } },
              s,
            ),
            i.default.createElement(
              "div",
              { className: "text-xs mt-2", style: { color: "#9aa4bd" } },
              "Tarea mental",
            ),
            i.default.createElement(
              "div",
              { className: "text-sm", style: { color: "#3ecf8e" } },
              c,
            ),
            i.default.createElement(
              "div",
              {
                style: {
                  fontFamily: "Chakra Petch, sans-serif",
                  fontSize: 40,
                  color: "#3ecf8e",
                  marginTop: 8,
                },
              },
              Math.floor(n / 60),
              ":",
              String(n % 60).padStart(2, "0"),
            ),
            i.default.createElement(
              "button",
              {
                onClick: () => {
                  (l("idle"), e(n));
                },
                className: "w-full py-3 text-sm mt-2",
                style: { background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 },
              },
              "He roto la postura",
            ),
          )
        : null
  );
}
function O5({ onDone: e }) {
  let [a, l] = (0, i.useState)("idle"),
    [n, o] = (0, i.useState)(0),
    [s, u] = (0, i.useState)(30),
    [c, r] = (0, i.useState)(bd[0]),
    [p, v] = (0, i.useState)(!1),
    x = Fs[n];
  return (
    (0, i.useEffect)(() => {
      if (a !== "run") return;
      if (s <= 0) {
        (l("done"), e(x));
        return;
      }
      let y = setTimeout(() => u((S) => S - 1), 1e3);
      return () => clearTimeout(y);
    }, [a, s]),
    (0, i.useEffect)(() => {
      if (a !== "run") return;
      let y = 6e4 / x,
        S = setInterval(() => {
          (v((E) => !E), Ie(700, 60));
        }, y);
      return () => clearInterval(S);
    }, [a, x]),
    a === "idle"
      ? i.default.createElement(
          i.default.Fragment,
          null,
          i.default.createElement(
            "div",
            { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
            "Patrón cruzado al ritmo del metrónomo, 30 segundos por nivel. Si aguantás limpio, subí el tempo.",
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => {
                (r(bd[Math.floor(Math.random() * bd.length)]), u(30), l("run"));
              },
              className: "w-full py-3 text-sm",
              style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
            },
            "Empezar a ",
            x,
            " bpm",
          ),
        )
      : a === "run"
        ? i.default.createElement(
            "div",
            { className: "text-center" },
            i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#9aa4bd" } },
              x,
              " bpm",
            ),
            i.default.createElement(
              "div",
              { className: "text-sm mb-2", style: { color: "#e8ecf7" } },
              c,
            ),
            i.default.createElement("div", {
              style: {
                width: 60,
                height: 60,
                borderRadius: "50%",
                margin: "0 auto",
                background: p ? "#ffb84f" : "rgba(255,184,79,0.15)",
                border: "2px solid #ffb84f",
                transition: "background .08s",
              },
            }),
            i.default.createElement(
              "div",
              {
                style: {
                  fontFamily: "Chakra Petch, sans-serif",
                  fontSize: 30,
                  color: "#ffb84f",
                  marginTop: 8,
                },
              },
              s,
              "s",
            ),
            i.default.createElement(
              "button",
              {
                onClick: () => {
                  (l("idle"), e(n > 0 ? Fs[n - 1] : 0));
                },
                className: "w-full py-2 text-xs mt-2",
                style: {
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#e8ecf7",
                  fontWeight: 600,
                },
              },
              "No puedo seguir el ritmo",
            ),
          )
        : i.default.createElement(
            "div",
            { className: "text-center" },
            i.default.createElement(
              "div",
              { style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 22, color: "#3ecf8e" } },
              "Nivel superado a ",
              x,
              " bpm",
            ),
            i.default.createElement(
              "div",
              { className: "flex gap-2 mt-3" },
              i.default.createElement(
                "button",
                {
                  onClick: () => {
                    (o(0), l("idle"));
                  },
                  className: "flex-1 py-2 text-xs",
                  style: {
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    color: "#e8ecf7",
                    fontWeight: 600,
                  },
                },
                "Salir",
              ),
              n < Fs.length - 1 &&
                i.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      (o(n + 1), u(30), l("run"));
                    },
                    className: "flex-1 py-2 text-xs",
                    style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Subir a ",
                  Fs[n + 1],
                  " bpm",
                ),
            ),
          )
  );
}
function j5({ onFinish: e, onLoadBackup: a }) {
  let [l, n] = (0, i.useState)(!1),
    [o, s] = (0, i.useState)(0),
    [u, c] = (0, i.useState)(""),
    [r, p] = (0, i.useState)("salud"),
    [v, x] = (0, i.useState)(["bodyweight"]),
    [y, S] = (0, i.useState)(3),
    [E, T] = (0, i.useState)(""),
    [A, g] = (0, i.useState)(""),
    [b, h] = (0, i.useState)(""),
    [C, D] = (0, i.useState)(0),
    [H, z] = (0, i.useState)(!1),
    [q, U] = (0, i.useState)(""),
    [Y, B] = (0, i.useState)(""),
    J = [
      {
        key: "sq",
        label: "Sentadillas",
        hint: "De pie, bajá hasta que los muslos queden paralelos al suelo. Espalda recta.",
      },
      {
        key: "pu",
        label: "Flexiones",
        hint: "Cuerpo en línea recta. Si necesitás, apoyá las rodillas: cuenta igual.",
      },
      {
        key: "ab",
        label: "Abdominales",
        hint: "Subí con el abdomen, sin tirar del cuello. Bajá controlado.",
      },
      {
        key: "bk",
        label: "Remo invertido",
        hint: "Bajo una mesa firme, cuerpo recto, tirá hasta tocar el borde con el pecho. Sin mesa: superman en el suelo, 1 rep = 3 segundos arriba.",
      },
    ],
    [De, On] = (0, i.useState)("dog"),
    [Aa, Va] = (0, i.useState)(""),
    [sdcBk, sdcSetBk] = (0, i.useState)(""),
    [sdcRitOnb, sdcSetRitOnb] = (0, i.useState)(!1),
    ja = Math.max(0, parseInt(E || "0", 10)),
    Ba = Math.max(0, parseInt(A || "0", 10)),
    fa = Math.max(0, parseInt(b || "0", 10)),
    sdcBkN = Math.max(0, parseInt(sdcBk || "0", 10)),
    Tl = Uy(ja, Ba, fa, sdcBkN),
    Ud = Tl === "principiante" ? "Principiante" : Tl === "intermedio" ? "Intermedio" : "Avanzado";
  return l
    ? i.default.createElement(
        "div",
        {
          className: "min-h-screen flex flex-col items-center justify-center px-4",
          style: { background: "#0a0e1a" },
        },
        i.default.createElement(
          "div",
          { className: "w-full", style: { maxWidth: 380 } },
          i.default.createElement(
            "div",
            { className: "text-center mb-6" },
            i.default.createElement(
              "div",
              { className: "text-xs uppercase", style: { letterSpacing: 2, color: "#4f9dff" } },
              "Empecemos por conocerte",
            ),
            i.default.createElement(
              "h1",
              {
                style: {
                  fontFamily: "Chakra Petch, sans-serif",
                  fontSize: 26,
                  color: "#e8ecf7",
                  fontWeight: 700,
                },
              },
              "Dominio Corporal",
            ),
          ),
          o === 0 &&
            i.default.createElement(
              Q,
              { accent: "#4f9dff" },
              i.default.createElement(
                "div",
                { className: "text-sm mb-3", style: { color: "#9aa4bd" } },
                "Antes de empezar",
              ),
              i.default.createElement(
                "label",
                { className: "block text-xs mb-1", style: { color: "#9aa4bd" } },
                "¿Cómo te llamas?",
              ),
              i.default.createElement("input", {
                value: u,
                onChange: (j) => c(j.target.value),
                placeholder: "Tu nombre",
                className: "w-full mb-4 px-3 py-2 text-sm",
                style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e8ecf7",
                },
              }),
              i.default.createElement(
                "button",
                {
                  disabled: !u.trim(),
                  onClick: () => s(5),
                  className:
                    "w-full flex items-center justify-center gap-1 py-3 text-sm disabled:opacity-40",
                  style: { background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 },
                },
                "Continuar ",
                i.default.createElement(Za, { size: 16 }),
              ),
              i.default.createElement(
                "div",
                { className: "text-center text-xs my-3", style: { color: "#7a83a0" } },
                "o",
              ),
              H
                ? i.default.createElement(
                    i.default.Fragment,
                    null,
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "Pega aquí tu respaldo y recuperarás tu progreso sin repetir la calibración.",
                    ),
                    i.default.createElement("textarea", {
                      value: q,
                      onChange: (j) => {
                        (U(j.target.value), B(""));
                      },
                      placeholder: "Pega aquí tu texto de respaldo",
                      rows: 4,
                      className: "w-full mb-2 px-2 py-2 text-xs",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#e8ecf7",
                        resize: "none",
                      },
                    }),
                    Y &&
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-2", style: { color: "#ff5c7a" } },
                        Y,
                      ),
                    i.default.createElement(
                      "div",
                      { className: "flex gap-2" },
                      i.default.createElement(
                        "button",
                        {
                          onClick: () => {
                            (z(!1), U(""), B(""));
                          },
                          className: "flex-1 py-3 text-sm",
                          style: {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.28)",
                            color: "#e8ecf7",
                            fontWeight: 600,
                          },
                        },
                        "Cancelar",
                      ),
                      i.default.createElement(
                        "button",
                        {
                          disabled: !q.trim(),
                          onClick: () => {
                            a(q) ||
                              B("Ese respaldo no es válido. Revisá que copiaste todo el texto.");
                          },
                          className: "flex-1 py-3 text-sm disabled:opacity-40",
                          style: { background: "#7c5cff", color: "#0a0e1a", fontWeight: 700 },
                        },
                        "Cargar",
                      ),
                    ),
                  )
                : i.default.createElement(
                    i.default.Fragment,
                    null,
                    i.default.createElement(
                      "button",
                      {
                        onClick: () => z(!0),
                        className: "w-full py-3 text-sm mb-2",
                        style: {
                          background: "rgba(124,92,255,0.12)",
                          border: "1px solid #7c5cff",
                          color: "#b9a5ff",
                          fontWeight: 600,
                        },
                      },
                      "Cargar partida guardada",
                    ),
                    i.default.createElement(
                      "button",
                      {
                        onClick: () =>
                          e({
                            name: u.trim() || "Atleta",
                            focusProfile: "salud",
                            modalities: ["bodyweight"],
                            weeklyGoal: 3,
                            classification: "principiante",
                            startRank: "E",
                            testResults: { squat: 15, pushup: 10, abs: 15, back: 6 },
                            pet: { type: "dog", name: "" },
                          }),
                        className: "w-full py-2 text-xs",
                        style: {
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "#9aa4bd",
                        },
                      },
                      "Saltar y empezar con valores por defecto",
                    ),
                  ),
            ),
          o === 5 &&
            i.default.createElement(
              Q,
              { accent: "#4f9dff" },
              i.default.createElement(
                "div",
                { className: "text-sm mb-1", style: { color: "#9aa4bd" } },
                "Métodos de entrenamiento",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Elegí uno, varios o todos. Podrás cambiarlo cuando quieras desde tu Perfil.",
              ),
              ra.map((j) => {
                let Se = v.includes(j.id);
                return i.default.createElement(
                  "button",
                  {
                    key: j.id,
                    onClick: () =>
                      x((gt) =>
                        Se ? (gt.length > 1 ? gt.filter((oi) => oi !== j.id) : gt) : [...gt, j.id],
                      ),
                    className: "w-full text-left px-3 py-2 mb-2",
                    style: {
                      background: Se ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                      border: Se ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
                    },
                  },
                  i.default.createElement(
                    "div",
                    { className: "flex items-center gap-2" },
                    i.default.createElement("span", {
                      style: {
                        width: 16,
                        height: 16,
                        display: "inline-block",
                        flexShrink: 0,
                        border: "1px solid " + (Se ? "#4f9dff" : "rgba(255,255,255,0.3)"),
                        background: Se ? "#4f9dff" : "transparent",
                      },
                    }),
                    i.default.createElement(
                      "span",
                      { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                      j.name,
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                    j.desc,
                  ),
                );
              }),
              i.default.createElement(
                "button",
                {
                  onClick: () => x(ra.map((j) => j.id)),
                  className: "w-full py-2 text-xs mb-3",
                  style: {
                    background: "rgba(255,184,79,0.1)",
                    border: "1px solid #ffb84f",
                    color: "#ffb84f",
                    fontWeight: 600,
                  },
                },
                "SELECCIONAR TODOS (Atleta Híbrido)",
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => s(0),
                    className: "flex-1 py-3 text-sm",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Atrás",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => s(4),
                    className: "flex-1 flex items-center justify-center gap-1 py-3 text-sm",
                    style: { background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Continuar ",
                  i.default.createElement(Za, { size: 16 }),
                ),
              ),
            ),
          o === 4 &&
            i.default.createElement(
              Q,
              { accent: "#3ecf8e" },
              i.default.createElement(
                "div",
                { className: "text-sm mb-1", style: { color: "#9aa4bd" } },
                "Perfiles de Enfoque Biomecánico",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Elegí cómo querés que se calibre tu carga y tu progresión.",
              ),
              Nd.map((j) => {
                let Se = r === j.id;
                return i.default.createElement(
                  "button",
                  {
                    key: j.id,
                    onClick: () => p(j.id),
                    className: "w-full text-left px-3 py-2 mb-2",
                    style: {
                      background: Se ? "rgba(62,207,142,0.12)" : "rgba(255,255,255,0.03)",
                      border: Se ? "1px solid #3ecf8e" : "1px solid rgba(255,255,255,0.1)",
                    },
                  },
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    j.name,
                  ),
                  Se &&
                    i.default.createElement(
                      "div",
                      { className: "mt-2" },
                      i.default.createElement(
                        "div",
                        { className: "text-xs", style: { color: "#9aa4bd" } },
                        i.default.createElement("b", { style: { color: "#4f9dff" } }, "Ajuste:"),
                        " ",
                        j.ajuste,
                      ),
                      i.default.createElement(
                        "div",
                        { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                        i.default.createElement("b", { style: { color: "#3ecf8e" } }, "Ventaja:"),
                        " ",
                        j.ventaja,
                      ),
                      i.default.createElement(
                        "div",
                        { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                        i.default.createElement(
                          "b",
                          { style: { color: "#ff5c7a" } },
                          "Desventaja:",
                        ),
                        " ",
                        j.desventaja,
                      ),
                    ),
                );
              }),
              i.default.createElement(
                "div",
                { className: "flex gap-2 mt-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => s(5),
                    className: "flex-1 py-3 text-sm",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Atrás",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => s(6),
                    className: "flex-1 flex items-center justify-center gap-1 py-3 text-sm",
                    style: { background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Continuar ",
                  i.default.createElement(Za, { size: 16 }),
                ),
              ),
            ),
          o === 6 &&
            i.default.createElement(
              Q,
              { accent: "#3ecf8e" },
              i.default.createElement(
                "div",
                { className: "text-sm mb-1", style: { color: "#9aa4bd" } },
                "Tu compromiso semanal",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "¿Cuántas sesiones querés hacer por semana? Tu racha solo se corta si ya no podés alcanzar esa meta, no por saltarte un día suelto.",
              ),
              i.default.createElement(
                "div",
                { className: "grid grid-cols-7 gap-1 mb-3" },
                [1, 2, 3, 4, 5, 6, 7].map((j) =>
                  i.default.createElement(
                    "button",
                    {
                      key: j,
                      onClick: () => S(j),
                      className: "py-3 text-sm",
                      style: {
                        background: y === j ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                        border: "1px solid " + (y === j ? "#3ecf8e" : "rgba(255,255,255,0.15)"),
                        color: y === j ? "#0a0e1a" : "#9aa4bd",
                        fontWeight: 700,
                      },
                    },
                    j,
                  ),
                ),
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#7a83a0" } },
                y <= 2
                  ? "Ritmo suave: ideal para empezar sin romperte."
                  : y <= 4
                    ? "Ritmo equilibrado: el más sostenible a largo plazo."
                    : "Ritmo exigente: asegúrate de descansar bien.",
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => s(4),
                    className: "flex-1 py-3 text-sm",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Atrás",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => s(1),
                    className: "flex-1 flex items-center justify-center gap-1 py-3 text-sm",
                    style: { background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Continuar ",
                  i.default.createElement(Za, { size: 16 }),
                ),
              ),
            ),
          o === 1 &&
            (C < J.length
              ? i.default.createElement(
                  i.default.Fragment,
                  null,
                  i.default.createElement(
                    Q,
                    { accent: "#ffb84f", style: { marginBottom: 12 } },
                    i.default.createElement(
                      "div",
                      { className: "text-sm mb-1", style: { color: "#ffb84f", fontWeight: 700 } },
                      "Punto de Partida (",
                      C + 1,
                      "/",
                      J.length,
                      ")",
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs", style: { color: "#9aa4bd" } },
                      "Máximas repeticiones seguidas, siguiendo la cadencia del metrónomo.",
                    ),
                  ),
                  i.default.createElement(Ly, {
                    key: J[C].key,
                    exercise: J[C],
                    onFinish: (j) => {
                      sdcSetRitOnb(!0);
                      let Se = J[C].key;
                      (Se === "sq" && T(String(j)),
                        Se === "pu" && g(String(j)),
                        Se === "ab" && h(String(j)),
                        Se === "bk" && sdcSetBk(String(j)),
                        D((gt) => gt + 1));
                    },
                  }),
                  C === 0 &&
                    i.default.createElement(
                      Q,
                      { accent: "#4f9dff", style: { marginTop: 12 } },
                      i.default.createElement(
                        "div",
                        { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
                        "¿Ya conocés tus números?",
                      ),
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                        "Anotalos aquí y te saltás la prueba con cadencia.",
                      ),
                      [
                        { lb: "Sentadillas", vl: E, st: T },
                        { lb: "Flexiones", vl: A, st: g },
                        { lb: "Abdominales", vl: b, st: h },
                        { lb: "Remo invertido", vl: sdcBk, st: sdcSetBk },
                      ].map((mn) =>
                        i.default.createElement(
                          "div",
                          { key: mn.lb, className: "flex justify-between items-center gap-2 mb-2" },
                          i.default.createElement(
                            "span",
                            { className: "text-xs", style: { color: "#9aa4bd" } },
                            mn.lb,
                          ),
                          i.default.createElement("input", {
                            type: "number",
                            inputMode: "numeric",
                            min: "0",
                            value: mn.vl,
                            onChange: (ev) => {
                              (sdcSetRitOnb(!1), mn.st(ev.target.value));
                            },
                            placeholder: "0",
                            className: "px-2 py-2 text-sm text-center",
                            style: {
                              width: 90,
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              color: "#e8ecf7",
                            },
                          }),
                        ),
                      ),
                      i.default.createElement(
                        "button",
                        {
                          onClick: () => D(J.length),
                          disabled: !(E || A || b || sdcBk),
                          className: "w-full py-2 text-xs mt-2 disabled:opacity-40",
                          style: { background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 },
                        },
                        "Usar estos números",
                      ),
                    ),
                  C === 0 &&
                    i.default.createElement(
                      Q,
                      { accent: "#3ecf8e", style: { marginTop: 12 } },
                      i.default.createElement(
                        "div",
                        { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
                        "Prefiero no ir al máximo",
                      ),
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                        "Elegí la frase que más se te parezca. La app calcula tu volumen sin que tengas que llegar al fallo, y siempre podés hacer la prueba después desde tu Perfil.",
                      ),
                      sdcNiveles.map(function (jn) {
                        return i.default.createElement(
                          "button",
                          {
                            key: jn.t,
                            onClick: function () {
                              (T(String(jn.sq)),
                                g(String(jn.pu)),
                                h(String(jn.ab)),
                                sdcSetBk(String(jn.bk)),
                                sdcSetRitOnb(!1),
                                D(J.length));
                            },
                            className: "w-full text-left px-3 py-2 mb-2",
                            style: {
                              minHeight: 44,
                              background: "rgba(62,207,142,0.08)",
                              border: "1px solid rgba(62,207,142,0.3)",
                            },
                          },
                          i.default.createElement(
                            "div",
                            { className: "text-xs", style: { color: "#e8ecf7", fontWeight: 600 } },
                            jn.t,
                          ),
                          i.default.createElement(
                            "div",
                            { className: "text-xs", style: { color: "#9aa4bd" } },
                            jn.d,
                          ),
                        );
                      }),
                    ),
                  i.default.createElement(
                    "div",
                    { className: "text-center mt-3" },
                    i.default.createElement(
                      "button",
                      {
                        onClick: () => {
                          (D(0), s(6));
                        },
                        className: "text-xs underline",
                        style: { color: "#9aa4bd" },
                      },
                      "Volver",
                    ),
                  ),
                )
              : i.default.createElement(
                  Q,
                  { accent: "#ffb84f" },
                  i.default.createElement(
                    "div",
                    { className: "text-sm mb-3", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Punto de Partida registrado",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between text-sm mb-1", style: { color: "#9aa4bd" } },
                    i.default.createElement("span", null, "Sentadillas"),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, ja),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between text-sm mb-1", style: { color: "#9aa4bd" } },
                    i.default.createElement("span", null, "Flexiones (×2)"),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, Ba),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between text-sm mb-1", style: { color: "#9aa4bd" } },
                    i.default.createElement("span", null, "Abdominales"),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, fa),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between text-sm mb-3", style: { color: "#9aa4bd" } },
                    i.default.createElement("span", null, "Remo invertido (×2)"),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, sdcBkN),
                  ),
                  i.default.createElement(
                    "div",
                    {
                      className: "flex justify-between text-sm mb-4",
                      style: { color: "#ffb84f", fontWeight: 700 },
                    },
                    i.default.createElement("span", null, "Puntaje"),
                    i.default.createElement("span", null, iu(ja, Ba, fa, sdcBkN), " pts"),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex gap-2" },
                    i.default.createElement(
                      "button",
                      {
                        onClick: () => D(0),
                        className: "flex-1 py-3 text-sm",
                        style: {
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.28)",
                          color: "#e8ecf7",
                          fontWeight: 600,
                        },
                      },
                      "Repetir",
                    ),
                    i.default.createElement(
                      "button",
                      {
                        onClick: () => s(2),
                        className: "flex-1 flex items-center justify-center gap-1 py-3 text-sm",
                        style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                      },
                      "Continuar ",
                      i.default.createElement(Za, { size: 16 }),
                    ),
                  ),
                )),
          o === 2 &&
            i.default.createElement(
              Q,
              { accent: "#ffb84f" },
              i.default.createElement(
                "div",
                { className: "text-sm mb-1", style: { color: "#9aa4bd" } },
                "Un compañero se acerca",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-4", style: { color: "#9aa4bd" } },
                "Te acompañará en tu camino con consejos de entrenamiento y salud.",
              ),
              i.default.createElement(
                "div",
                { className: "flex justify-center mb-4" },
                i.default.createElement(Cd, { type: De, size: 90, color: "#ffb84f" }),
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2 mb-4" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => On("dog"),
                    className: "flex-1 py-3 text-sm",
                    style: {
                      background: De === "dog" ? "rgba(255,184,79,0.15)" : "rgba(255,255,255,0.03)",
                      border:
                        De === "dog" ? "1px solid #ffb84f" : "1px solid rgba(255,255,255,0.1)",
                      color: "#e8ecf7",
                    },
                  },
                  "🐶 Perro",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => On("cat"),
                    className: "flex-1 py-3 text-sm",
                    style: {
                      background: De === "cat" ? "rgba(255,184,79,0.15)" : "rgba(255,255,255,0.03)",
                      border:
                        De === "cat" ? "1px solid #ffb84f" : "1px solid rgba(255,255,255,0.1)",
                      color: "#e8ecf7",
                    },
                  },
                  "🐱 Gato",
                ),
              ),
              i.default.createElement(
                "label",
                { className: "block text-xs mb-1", style: { color: "#9aa4bd" } },
                "¿Cómo se llama?",
              ),
              i.default.createElement("input", {
                value: Aa,
                onChange: (j) => Va(j.target.value),
                placeholder: "Nombre de tu compañero",
                className: "w-full mb-4 px-3 py-2 text-sm",
                style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e8ecf7",
                },
              }),
              i.default.createElement(
                "div",
                { className: "flex gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => s(1),
                    className: "flex-1 py-3 text-sm",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Atrás",
                ),
                i.default.createElement(
                  "button",
                  {
                    disabled: !Aa.trim(),
                    onClick: () => s(3),
                    className:
                      "flex-1 flex items-center justify-center gap-1 py-3 text-sm disabled:opacity-40",
                    style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Continuar ",
                  i.default.createElement(Za, { size: 16 }),
                ),
              ),
            ),
          o === 3 &&
            (() => {
              let j = wy(ja, Ba, fa, sdcBkN, sdcRitOnb ? sdcRitmoK : 1),
                Se = Cl["E"];
              return i.default.createElement(
                Q,
                { accent: Se },
                i.default.createElement(
                  "div",
                  { className: "text-center mb-4" },
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase",
                      style: { letterSpacing: 2, color: "#9aa4bd" },
                    },
                    "Calibración completa",
                  ),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 36,
                        color: Se,
                        fontWeight: 700,
                      },
                    },
                    sdcRango("E", { modalities: v }),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                    sdcCalT(vy.indexOf(j), { modalities: v }),
                    " · ",
                    iu(ja, Ba, fa, sdcBkN),
                    " pts",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                    "Enfoque: ",
                    sdcCalF(vy.indexOf(j), { modalities: v }),
                  ),
                ),
                i.default.createElement(
                  "div",
                  { className: "text-sm mb-2", style: { color: "#e8ecf7", fontWeight: 600 } },
                  "Bienvenido, ",
                  u,
                  ". Esto es tuyo.",
                ),
                i.default.createElement(
                  "div",
                  { className: "text-sm mb-4", style: { color: "#9aa4bd" } },
                  "Todos empiezan en ",
                  sdcRango("E", { modalities: v }),
                  ". Tu prueba no fija el rango: define el volumen de tu rutina. Cuantas más repeticiones hagas, más XP ganarás y más rápido avanzarás.",
                ),
                i.default.createElement(
                  "div",
                  {
                    className: "flex items-center gap-2 mb-4 p-3",
                    style: {
                      background: "rgba(255,184,79,0.08)",
                      border: "1px solid rgba(255,184,79,0.3)",
                    },
                  },
                  i.default.createElement(Cd, { type: De, size: 40, color: "#ffb84f" }),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#e8ecf7" } },
                    i.default.createElement("b", null, Aa),
                    " te acompañará y te dará consejos en el camino.",
                  ),
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () =>
                      e({
                        name: u.trim(),
                        focusProfile: r,
                        modalities: v,
                        weeklyGoal: y,
                        classification: j.classification,
                        startRank: "E",
                        testResults: sdcRitOnb
                          ? { squat: ja, pushup: Ba, abs: fa, back: sdcBkN, ritmo: 5 }
                          : { squat: ja, pushup: Ba, abs: fa, back: sdcBkN },
                        pet: { type: De, name: Aa.trim() },
                      }),
                    className: "w-full py-3 text-sm",
                    style: { background: Se, color: "#0a0e1a", fontWeight: 700, letterSpacing: 1 },
                  },
                  "INICIAR DOMINIO CORPORAL",
                ),
              );
            })(),
        ),
      )
    : i.default.createElement(z5, { onDone: () => n(!0) });
}
function B5({ player: e, setPlayer: a, initialNotices: l }) {
  let [n, o] = (0, i.useState)(l || []),
    {
      profile: s,
      progress: u,
      today: c,
      week: r,
      streak: p,
      ascension: v,
      exploration: x,
      dungeon: y,
      achievements: S,
      history: E,
      lifetimeReps: T,
      combat: A,
      primal: g,
      dungeonsCleared: b,
      lastTrained: h,
      dominion: C,
      lastWeekSummary: D,
      ui: H,
    } = e,
    z = Cl[u.rank],
    q = au[u.rank],
    U = li(u.level),
    Y = (c.completed && c.rank) || u.rank,
    B = Md(s, c.date, c.modality),
    J = Oy(e, Y),
    [De, On] = (0, i.useState)(() => (sdcAnimoHoy(e).modo === "recovery" ? "recovery" : "normal")),
    [Aa, Va] = (0, i.useState)({ ...J }),
    [sdcSer, sdcSetSer] = (0, i.useState)({ squat: 0, pushup: 0, back: 0, abs: 0 }),
    [sdcFlota, sdcSetFlota] = (0, i.useState)(null),
    [sdcUltEpic, sdcSetUltEpic] = (0, i.useState)(""),
    [sdcDesc, sdcSetDesc] = (0, i.useState)(0),
    [sdcDescIni, sdcSetDescIni] = (0, i.useState)(0),
    [sdcAjuste, sdcSetAjuste] = (0, i.useState)({}),
    [sdcConfDesc, sdcSetConfDesc] = (0, i.useState)(!1),
    [sdcModOk, sdcSetModOk] = (0, i.useState)(!1),
    [sdcCombSer, sdcSetCombSer] = (0, i.useState)({}),
    [sdcTema, sdcSetTema] = (0, i.useState)({
      "Tu rutina de hoy": 1,
      "Cómo se anota lo que hacés": 1,
      "Niveles y XP": 1,
    }),
    [sdcEstPasos, sdcSetEstPasos] = (0, i.useState)([]),
    [sdcEstIdx, sdcSetEstIdx] = (0, i.useState)(0),
    [sdcEstIni, sdcSetEstIni] = (0, i.useState)(0),
    [sdcEstPz, sdcSetEstPz] = (0, i.useState)(0),
    [sdcEstOk, sdcSetEstOk] = (0, i.useState)(-1),
    [sdcKgS, sdcSetKgS] = (0, i.useState)({}),
    [ja, Ba] = (0, i.useState)(!1),
    [fa, Tl] = (0, i.useState)(300),
    [Ud, j] = (0, i.useState)(!1),
    [Se, gt] = (0, i.useState)(!1),
    [oi, Ld] = (0, i.useState)(!1),
    [jn, Hd] = (0, i.useState)("front"),
    [ma, Hy] = (0, i.useState)("desarrollo"),
    [He, ii] = (0, i.useState)("movs"),
    [Xy, Yy] = (0, i.useState)(null),
    [Gy, Zy] = (0, i.useState)(null),
    [Ky, Vy] = (0, i.useState)(null),
    [vt, su] = (0, i.useState)(null),
    [Da, $t] = (0, i.useState)("training"),
    [Xd, Yd] = (0, i.useState)(""),
    [Ml, Gd] = (0, i.useState)(""),
    [uu, Qy] = (0, i.useState)(!1),
    [Wy, Zd] = (0, i.useState)(!1),
    [Bn, Kd] = (0, i.useState)(null),
    [Jy, cu] = (0, i.useState)(!1),
    [It, ru] = (0, i.useState)([]),
    [du, _l] = (0, i.useState)(!1),
    [fu, ht] = (0, i.useState)(!1),
    [xt, ql] = (0, i.useState)(0),
    [Fy, mu] = (0, i.useState)(0),
    [Vd, si] = (0, i.useState)(""),
    [pu, bu] = (0, i.useState)(null),
    [Qd, ui] = (0, i.useState)(1),
    [Qa, Ol] = (0, i.useState)("idle"),
    [jl, wn] = (0, i.useState)(0),
    [Py, yu] = (0, i.useState)(!1),
    [Un, gu] = (0, i.useState)(0),
    ci = [
      {
        key: "sq",
        label: "Sentadillas",
        hint: "De pie, bajá hasta que los muslos queden paralelos al suelo.",
      },
      { key: "pu", label: "Flexiones", hint: "Cuerpo en línea recta. Podés apoyar las rodillas." },
      { key: "ab", label: "Abdominales", hint: "Subí con el abdomen, sin tirar del cuello." },
      {
        key: "bk",
        label: "Remo invertido",
        hint: "Bajo una mesa firme, cuerpo recto, tirá hasta tocar el borde con el pecho. Sin mesa: superman en el suelo.",
      },
    ],
    [vu, hu] = (0, i.useState)(""),
    [xu, Su] = (0, i.useState)(""),
    [Nu, Cu] = (0, i.useState)(""),
    [sdcRbk, sdcSetRbk] = (0, i.useState)(""),
    [$y, Iy] = (0, i.useState)(() => A2(ue())),
    [ku, Wd] = (0, i.useState)(""),
    [Ry, zu] = (0, i.useState)(!1),
    [Ln, eg] = (0, i.useState)(!1),
    [Jd, Fd] = (0, i.useState)(!1),
    ag = { fuerza: 90, resistencia: 45, salud: 60 },
    Re = _n(e),
    sdcYa = c.completed || (c.doneModalities || []).includes(B),
    Rt = sdcYa ? sdcHoyReps(e) : sdcSumaReps(sdcHoyReps(e), sdcRepsHechas()),
    sdcMt = sdcYa ? sdcHoyMeta(e, J) : sdcSumaReps(sdcHoyMeta(e, null), J),
    tg = {
      squat: (Rt.squat || 0) / (sdcMt.squat || 1),
      pushup: (Rt.pushup || 0) / (sdcMt.pushup || 1),
      back: (Rt.back || 0) / (sdcMt.back || 1),
      abs: (Rt.abs || 0) / (sdcMt.abs || 1),
    },
    Hn = ["squat", "pushup", "back", "abs"],
    Wa = O2(e),
    lg = Math.max(10, ...Hn.map((f) => Wa.levels[f])),
    Pd = (f) => Math.max(1, (J[f] || 1) * Re),
    ri = (f) =>
      ma === "hoy"
        ? (Rt[f] || 0) / (sdcMt[f] || 1)
        : ma === "semana"
          ? ((r.reps && r.reps[f]) || 0) / Pd(f)
          : Wa.levels[f] / lg,
    $d = {
      squat: Rs(ri("squat")),
      pushup: Rs(ri("pushup")),
      back: Rs(ri("back")),
      abs: Rs(ri("abs")),
    },
    el = x.lifetimeKm || 0,
    ng = l2(el),
    L5 = x.unlockedIndex >= 0 ? pt[x.unlockedIndex] : null,
    di = pt[x.unlockedIndex + 1] || null,
    Xn = g.today.date === ue() ? g.today.count : 0,
    Yn = Sd(e),
    al = r.trained || 0,
    Id = x5(
      E,
      c.date,
      c.completed
        ? c.mode === "rest"
          ? "rest"
          : c.fullCompletion
            ? "full"
            : "partial"
        : (r.sessionDates || []).includes(c.date)
          ? "partial"
          : "pending",
      28,
    ),
    fi = A.todayDefeated && A.todayDefeated.date === ue() ? A.todayDefeated.count : 0;
  ((0, i.useEffect)(() => {
    (Va(
      De === "recovery"
        ? {
            squat: Math.round(J.squat * 0.5),
            pushup: Math.round(J.pushup * 0.5),
            back: Math.round(J.back * 0.5),
            abs: Math.round(J.abs * 0.5),
          }
        : { ...J },
    ),
      (function () {
        var mk = sdcMarca(e, sdcMarcaK(B, De));
        mk && !c.completed && !(c.doneModalities || []).includes(B)
          ? (sdcSetSer(mk.ser || { squat: 0, pushup: 0, back: 0, abs: 0 }),
            sdcSetAjuste(mk.aj || {}),
            sdcSetModOk(!!mk.mok),
            sdcSetKgS(mk.kg || {}))
          : (sdcSetSer({ squat: 0, pushup: 0, back: 0, abs: 0 }),
            sdcSetAjuste({}),
            sdcSetModOk(!1),
            sdcSetKgS({}));
      })(),
      sdcSetConfDesc(!1));
  }, [De, u.rank, B]),
    (0, i.useEffect)(() => {
      if (!n || !n.length) {
        sdcUltEpic && sdcSetUltEpic("");
        return;
      }
      let ep = n.find((t) => sdcTier(t) === "epic");
      if (!ep) {
        sdcUltEpic && sdcSetUltEpic("");
        return;
      }
      if (ep === sdcUltEpic) return;
      (sdcSetUltEpic(ep),
        sdcBeep(523, 140),
        setTimeout(() => sdcBeep(659, 140), 150),
        setTimeout(() => sdcBeep(784, 140), 300),
        setTimeout(() => sdcBeep(1047, 340), 450),
        sdcVib([40, 60, 40, 60, 140]));
    }, [n, sdcUltEpic]),
    (0, i.useEffect)(() => {
      sdcSetCombSer({});
    }, [A.villainIndex, A.exercise, A.phase]),
    (0, i.useEffect)(() => {
      if (!sdcFlota) return;
      let f = setTimeout(() => sdcSetFlota(null), 1200);
      return () => clearTimeout(f);
    }, [sdcFlota]),
    (0, i.useEffect)(() => {
      if (!ja) return;
      let f = setInterval(() => Tl(Math.floor(((sdcEstPz || Date.now()) - sdcEstIni) / 1e3)), 300);
      return () => clearInterval(f);
    }, [ja, sdcEstIni, sdcEstPz]),
    (0, i.useEffect)(() => {
      if (!ja) return;
      let tt = sdcEstTotal(sdcEstPasos);
      if (fa >= tt) {
        (Ba(!1),
          sdcBeep(880, 200),
          setTimeout(() => sdcBeep(1175, 340), 210),
          sdcVib([40, 60, 140]),
          Ne((d) =>
            sdcPasosHook(
              c5(d, sdcEstPasos.length, sdcEstPasos.length),
              sdcEstPasos,
              sdcEstPasos.length,
            ),
          ),
          o((d) => [...d, "Rutina de estiramiento completada."]));
        return;
      }
      let p = sdcEstPaso(sdcEstPasos, fa),
        fs = p.index * 2 + (p.prep > 0 ? 0 : 1);
      p.prep > 0 &&
        !sdcEstPz &&
        sdcEstOk < p.index &&
        sdcPasoEspera(sdcEstPasos, p.index, sdcPasosV(e)) &&
        sdcSetEstPz(sdcEstIni + sdcEstDesde(sdcEstPasos, p.index) * 1e3);
      fs > sdcEstIdx &&
        (sdcSetEstIdx(fs),
        p.prep > 0 ? (sdcBeep(520, 120), sdcVib(18)) : (sdcBeep(760, 140), sdcVib(22)));
    }, [ja, fa]),
    (0, i.useEffect)(() => {
      if (Da !== "combat") {
        (_l(!1), ht(!1));
        return;
      }
      if (A.phase === "resting") {
        let d = za(A.villainIndex).isBoss ? 20 : 12;
        (mu(d), ql(d), _l(!1), ht(!1));
      }
    }, [A.roundId, Da]),
    (0, i.useEffect)(() => {
      if (!du) return;
      if (xt <= 0) {
        _l(!1);
        let d = za(A.villainIndex),
          m = d.isBoss
            ? uy(
                u.rank,
                s.classification,
                s.focusProfile,
                (A.bossCats || $o(A.lastExercise))[0],
                B,
                s.testResults,
              )
            : Math.max(
                1,
                Math.round(
                  hd(u.rank, s.classification, A.exercise, s.focusProfile, B, s.testResults) *
                    (A.loadFactor || 1),
                ),
              ),
          N = d.isBoss ? p2() : m2(m);
        (mu(N), ql(N), si(""), ht(!0));
        return;
      }
      let f = setTimeout(() => ql((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [du, xt]),
    (0, i.useEffect)(() => {
      if (!fu) return;
      if (xt <= 0) {
        (ht(!1), Ne((d) => x2(d)));
        return;
      }
      let f = setTimeout(() => ql((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [fu, xt]),
    (0, i.useEffect)(() => {
      if (Qa !== "active") return;
      if (jl <= 0) {
        (sdcBeep(520, 160), sdcVib(18));
        if (Qd < dd) (Ol("resting"), wn(cy));
        else {
          let d = pu;
          (Ol("idle"), bu(null), ui(1), Ne((m) => E2(m, d)));
        }
        return;
      }
      let f = setTimeout(() => wn((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [Qa, jl]),
    (0, i.useEffect)(() => {
      if (Qa !== "resting") return;
      if (jl <= 0) {
        (sdcBeep(760, 160), sdcVib(22), ui((d) => d + 1), Ol("active"), wn(Ws(u.rank)));
        return;
      }
      let f = setTimeout(() => wn((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [Qa, jl]),
    sdcWakeSi(!!du || !!fu || !!ja || Qa === "active" || Qa === "resting"));
  function og(f) {
    (bu(f), ui(0), Ol("listo"));
  }
  function sdcPrimalYa() {
    (sdcBeep(660, 100), sdcVib(22), ui(0), wn(10), Ol("resting"));
  }
  function ig() {
    (Ol("idle"), bu(null), ui(1));
  }
  function sg() {
    let f = Math.max(0, parseInt(vu || "0", 10)),
      d = Math.max(0, parseInt(xu || "0", 10)),
      m = Math.max(0, parseInt(Nu || "0", 10)),
      bq = Math.max(0, parseInt(sdcRbk || "0", 10));
    (Ne((N) => l5(N, f, d, m, bq, 5)), yu(!1), hu(""), Su(""), Cu(""), sdcSetRbk(""));
  }
  function bkDescargar() {
    try {
      let t = JSON.stringify(e),
        bl = new Blob([t], { type: "application/json" }),
        u2 = URL.createObjectURL(bl),
        el = document.createElement("a");
      ((el.href = u2),
        (el.download = "dominio-corporal-" + ue() + ".json"),
        document.body.appendChild(el),
        el.click(),
        document.body.removeChild(el),
        setTimeout(() => URL.revokeObjectURL(u2), 1e3),
        sdcRespaldoOk(),
        o((d) => [...d, "Respaldo descargado como archivo."]));
    } catch (x) {
      o((d) => [...d, "No se pudo descargar el archivo."]);
    }
  }
  function bkCargar(ev) {
    let f = ev.target.files && ev.target.files[0];
    if (!f) return;
    let r = new FileReader();
    ((r.onload = () => {
      (Wd(String(r.result || "")),
        o((d) => [...d, "Archivo cargado. Tocá Restaurar para aplicarlo."]));
    }),
      (r.onerror = () => o((d) => [...d, "No se pudo leer el archivo."])),
      r.readAsText(f),
      (ev.target.value = ""));
  }
  function ug() {
    let f = JSON.stringify(e);
    navigator.clipboard && navigator.clipboard.writeText
      ? navigator.clipboard
          .writeText(f)
          .then(() => (sdcRespaldoOk(), o((d) => [...d, "Respaldo copiado al portapapeles."])))
          .catch(() =>
            o((d) => [
              ...d,
              "No se pudo copiar automáticamente. Tocá el cuadro de texto y selecciona todo para copiarlo a mano.",
            ]),
          )
      : o((d) => [...d, "Tocá el cuadro de texto y selecciona todo para copiarlo a mano."]);
  }
  function cg() {
    try {
      let f = JSON.parse(ku.trim());
      if (!f || !f.profile || !f.progress) throw new Error("formato inválido");
      let { state: d } = ei(f);
      (a(d), K(d), o(["¡Progreso restaurado desde el respaldo!"]));
    } catch (f) {
      o((d) => [...d, "Ese respaldo no es válido. Revisá que copiaste todo el texto completo."]);
    }
    (Wd(""), zu(!1));
  }
  function Ne(f) {
    a((d) => {
      let { state: m, notices: N } = f(d);
      return (N && N.length && o((_) => [..._, ...N]), K(m), m);
    });
  }
  function rg(f) {
    Ne((d) => b2(d, f));
  }
  function Rd() {
    Vd.trim().toLowerCase() === "hecho" && (ht(!1), Ne((f) => h2(f)), si(""));
  }
  function dg() {
    (ht(!1), si(""), sdcSetCombSer({}));
    let d = za(A.villainIndex).isBoss ? 20 : 12;
    (mu(d), ql(d), _l(!1));
  }
  function fg() {
    Ne((f) => S2(f));
  }
  function mg() {
    Ne((f) => N2(f));
  }
  function sdcRepsSerie(g, k) {
    let t = Aa[g] || 0,
      pl = sdcSplit(t, sdcNSets(t)),
      aj = sdcAjuste[g] || {};
    return aj[k] !== void 0 ? aj[k] : pl[k] || 0;
  }
  function sdcRepsHechas() {
    let g = ["squat", "pushup", "back", "abs"],
      o = {};
    for (let k of g) {
      let d = sdcSer[k] || 0,
        s = 0;
      for (let j = 0; j < d; j++) s += sdcRepsSerie(k, j);
      o[k] = s;
    }
    return o;
  }
  function sdcTotalHechas() {
    let h = sdcRepsHechas();
    return h.squat + h.pushup + h.back + h.abs;
  }
  function sdcTotalMeta() {
    return (Aa.squat || 0) + (Aa.pushup || 0) + (Aa.back || 0) + (Aa.abs || 0);
  }
  function sdcAjustar(g, k, v) {
    let nx = { ...sdcAjuste, [g]: { ...(sdcAjuste[g] || {}), [k]: Math.max(0, v) } };
    (sdcSetAjuste(nx), sdcMarcaOk(sdcSer, nx, sdcModOk), sdcVib(6));
  }
  function sdcCelebra() {
    (sdcBeep(523, 120),
      setTimeout(() => sdcBeep(659, 120), 120),
      setTimeout(() => sdcBeep(784, 240), 240),
      sdcVib([30, 40, 70]));
  }
  function sdcMarcaOk(ser, aj, mok) {
    a(function (N) {
      var _ = M(N);
      if (_.today) {
        var kk = sdcMarcaK(B, De);
        _.today.marcas || (_.today.marcas = {});
        var pv = _.today.marcas[kk] || {};
        _.today.marcas[kk] = { ser: ser, aj: aj, mok: !!mok, kg: pv.kg };
      }
      return (K(_), _);
    });
  }
  function sdcSerie(g, k) {
    let pv = sdcSer[g] || 0,
      nx = { ...sdcSer, [g]: k };
    (sdcSetSer(nx), sdcMarcaOk(nx, sdcAjuste, sdcModOk));
    if (k > pv) {
      let gn = 0;
      for (let j = pv; j < k; j++) gn += sdcRepsSerie(g, j);
      (sdcBeep(660, 80),
        setTimeout(() => sdcBeep(880, 110), 85),
        sdcVib(18),
        sdcSetFlota({ n: gn, id: Date.now() }),
        sdcSetDesc(Math.min(180, Math.round((ag[s.focusProfile] || 60) + gn * 1.5))),
        sdcSetDescIni(Date.now()),
        Fd(!0));
    } else sdcVib(8);
  }
  function sdcGolpe() {
    (ht(!1), Ne((f) => h2(f)), si(""), sdcSetCombSer({}));
  }
  function sdcCombTocar(fa, k) {
    let pv = sdcCombSer[fa] || 0;
    sdcSetCombSer((d) => ({ ...d, [fa]: k }));
    k > pv ? (sdcBeep(700, 70), setTimeout(() => sdcBeep(920, 100), 75), sdcVib(16)) : sdcVib(6);
  }
  function sdcCombChips(fa, rq) {
    let n = sdcNSets(rq),
      pl = sdcSplit(rq, n),
      d = sdcCombSer[fa] || 0;
    return i.default.createElement(
      "div",
      { className: "flex gap-2" },
      pl.map((r, k) =>
        i.default.createElement(
          "button",
          {
            key: k,
            onClick: () => sdcCombTocar(fa, d === k + 1 ? k : k + 1),
            className: "sdc-chip flex-1 py-3",
            "aria-label":
              "Combate, serie " + (k + 1) + " de " + n + (k < d ? ", hecha" : ", pendiente"),
            style: {
              background: k < d ? "#ff5c7a" : "rgba(255,255,255,0.04)",
              border: "1px solid " + (k < d ? "#ff5c7a" : "rgba(255,255,255,0.18)"),
              color: k < d ? "#0a0e1a" : "#8a93ad",
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              minHeight: 48,
            },
          },
          k < d ? "✓ " + r : r,
        ),
      ),
    );
  }
  function sdcMarcarTodo() {
    let tod = {
      squat: sdcNSets(Aa.squat || 0),
      pushup: sdcNSets(Aa.pushup || 0),
      back: sdcNSets(Aa.back || 0),
      abs: sdcNSets(Aa.abs || 0),
    };
    (sdcSetSer(tod),
      sdcMarcaOk(tod, sdcAjuste, sdcModOk),
      sdcCelebra(),
      sdcSetFlota({ n: sdcTotalMeta() - sdcTotalHechas(), id: Date.now() }));
  }
  function sdcKgVer(g, k) {
    var lo = sdcKgS[g] || {},
      pe = sdcGymSer(e)[g] || {},
      j;
    for (j = k; j >= 1; j--) {
      if (lo[j] !== void 0) return lo[j];
      if (pe[j] !== void 0 && pe[j] !== null && pe[j] !== "") return sdcKgTxt(pe[j]);
    }
    if (lo[0] !== void 0) return lo[0];
    var pv = (sdcGymUlt(e)[sdcEjNom(g)] || {}).kgs;
    if (pv && pv[k] > 0) return sdcKgTxt(pv[k]);
    if (pv && pv[0] > 0) return sdcKgTxt(pv[0]);
    return "";
  }
  function sdcKgNum(g, k) {
    return Math.max(0, parseFloat(String(sdcKgVer(g, k)).replace(",", ".")) || 0);
  }
  function sdcKgSet(g, k, val) {
    sdcSetKgS(function (d) {
      var o = Object.assign({}, d);
      o[g] = Object.assign({}, o[g] || {});
      o[g][k] = val;
      return o;
    });
    var num = Math.max(0, parseFloat(String(val || "").replace(",", ".")) || 0);
    a(function (N) {
      var _ = M(N);
      (_.gymWeights || (_.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        k === 0
          ? (_.gymWeights[g] = num)
          : (_.gymSerieKg || (_.gymSerieKg = {}),
            _.gymSerieKg[g] || (_.gymSerieKg[g] = {}),
            (_.gymSerieKg[g][k] = num)));
      if (_.today) {
        var kk = sdcMarcaK(B, De);
        (_.today.marcas || (_.today.marcas = {}),
          _.today.marcas[kk] || (_.today.marcas[kk] = {}),
          _.today.marcas[kk].kg || (_.today.marcas[kk].kg = {}),
          _.today.marcas[kk].kg[g] || (_.today.marcas[kk].kg[g] = {}),
          (_.today.marcas[kk].kg[g][k] = val));
      }
      return (K(_), _);
    });
  }
  function sdcEjNom(g) {
    var x = _d(g, u.rank, B);
    return (x && x.name) || "";
  }
  function sdcKgUsar(g, kg) {
    var n = sdcNSets(Aa[g] || 0),
      k;
    for (k = 0; k < n; k++) sdcKgSet(g, k, sdcKgTxt(kg));
  }
  function sdcGymVol() {
    var gs = ["squat", "pushup", "back", "abs"],
      o = {},
      x,
      g,
      n,
      hh,
      vol,
      mx,
      k,
      kg,
      rp,
      li;
    for (x = 0; x < 4; x++) {
      g = gs[x];
      n = sdcNSets(Aa[g] || 0);
      hh = Math.min(sdcSer[g] || 0, n);
      vol = 0;
      mx = 0;
      li = [];
      for (k = 0; k < n; k++) {
        kg = sdcKgNum(g, k);
        li.push(kg);
        if (k < hh) {
          rp = sdcRepsSerie(g, k) || 0;
          vol += kg * rp;
          if (kg > mx) mx = kg;
        }
      }
      o[g] = { vol: Math.round(vol), max: mx, kgs: li, nom: sdcEjNom(g) };
    }
    return o;
  }
  function pg() {
    let h = sdcRepsHechas(),
      gv = B === "gym" ? sdcGymVol() : null;
    (sdcCelebra(),
      Ne((f) =>
        sdcDeshacerHook(f, sdcMetaHook(sdcPrimerasHook(i5(f, De, h, sdcModOk, gv), h), J)),
      ));
  }
  function bg() {
    a((f) => {
      let { state: d, notices: m } = u5(f);
      return (m && m.length && o((N) => [...N, ...m]), K(d), d);
    });
  }
  function yg() {
    a((f) => {
      let { state: d, notices: m } = d5(f);
      return (m && m.length && o((N) => [...N, ...m]), K(d), d);
    });
  }
  function gg(f) {
    a((d) => {
      let m = M(d);
      return ((m.today.modality = f), K(m), m);
    });
  }
  function irTienda() {
    a((d) => {
      let m = M(d);
      return (
        m.ui || (m.ui = { collapsed: {} }),
        (m.ui.collapsed.tienda = !m.ui.collapsed.tienda),
        K(m),
        m
      );
    });
  }
  function mmNueva(f) {
    (a((d) => {
      let m = M(d);
      return (
        (m.today.modality = f),
        (m.today.completed = !1),
        (m.today.mode = "pending"),
        (m.today.fullCompletion = !1),
        (m.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        delete m.undoSnapshot,
        K(m),
        m
      );
    }),
      o((d) => [
        ...d,
        `Nueva sesión: ${(ra.find((r) => r.id === f) || ra[0]).name}. Al completarla ganás un bono por combinar estilos.`,
      ]));
  }
  function sdcPonerJuego(f) {
    a((d) => {
      let m = M(d);
      return ((m.profile.tituloSet = f), K(m), m);
    });
  }
  function sdcCamRitmo(v) {
    a((d) => {
      let m = M(d);
      return ((m.profile.ritmoKmH = v), K(m), m);
    });
  }
  function sdcCamEmpezar() {
    a((d) => {
      let m = M(d);
      return (
        (m.exploration = m.exploration || {}),
        (m.exploration.walkStart = Date.now()),
        K(m),
        m
      );
    });
  }
  function sdcCamCancelar() {
    a((d) => {
      let m = M(d);
      return (m.exploration && (m.exploration.walkStart = 0), K(m), m);
    });
  }
  function sdcCamListo(km) {
    (a((d) => {
      let m = M(d);
      return (m.exploration && (m.exploration.walkStart = 0), K(m), m);
    }),
      Yd(String(km).replace(".", ",")),
      o((d) => [
        ...d,
        "Salida terminada. Puse " +
          String(km).replace(".", ",") +
          " km en el campo: corregilo si hace falta y tocá + Tramo.",
      ]));
  }
  function sdcTravEmpezar() {
    a((d) => {
      let m = M(d);
      return ((m.dungeon = m.dungeon || {}), (m.dungeon.startedAt = Date.now() + 1e4), K(m), m);
    });
  }
  function sdcTravCancelar() {
    a((d) => {
      let m = M(d);
      return (m.dungeon && (m.dungeon.startedAt = 0), K(m), m);
    });
  }
  function sdcPrimeraManual() {
    var t = null;
    try {
      t = window.prompt("¿Qué pudiste hacer hoy que antes no podías?");
    } catch (x) {}
    if (!t || !String(t).trim()) return;
    var tx = String(t).trim().slice(0, 120);
    (a((d) => {
      let m = M(d);
      return (sdcPrimeraAdd(m, tx, "escrita"), K(m), m);
    }),
      o((d) => [...d, "Primera vez: " + tx + ". Queda anotado."]));
  }
  function sdcResponderPodia(nm, v) {
    a((d) => {
      let m = M(d),
        o2 = {},
        k,
        src = sdcPodia(m);
      for (k in src) o2[k] = src[k];
      return ((o2[nm] = v), (m.podia = o2), K(m), m);
    });
  }
  function ef(f) {
    a((d) => {
      let m = M(d);
      return ((m.profile.modalities = f.length ? f : ["bodyweight"]), K(m), m);
    });
  }
  function vg(f) {
    let d = qn(s),
      m = d.includes(f) ? d.filter((N) => N !== f) : [...d, f];
    if (!m.length) {
      o((N) => [...N, "Debes mantener al menos un método activo."]);
      return;
    }
    ef(m);
  }
  function hg() {
    (cu(!1), Ne((f) => sdcDeshacer(f)), Va({ ...J }));
  }
  function mi(f, d) {
    let m = Math.max(0, parseFloat((d || "0").replace(",", ".")) || 0);
    a((N) => {
      let _ = M(N);
      return (
        _.gymWeights || (_.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        (_.gymWeights[f] = m),
        K(_),
        _
      );
    });
  }
  function xg(f) {
    let d = Math.max(0, parseFloat((f || "0").replace(",", ".")) || 0);
    a((m) => {
      let N = M(m);
      return ((N.profile.bodyWeight = d), K(N), N);
    });
  }
  function Sg() {
    a((f) => {
      let d = M(f);
      return (
        (d.unlockAll = !d.unlockAll),
        d.unlockAll && (d.seenUnlocks = $e.map((m) => m.id)),
        K(d),
        d
      );
    });
  }
  function Ng(f) {
    a((d) => {
      let m = M(d);
      return (
        m.disabled || (m.disabled = []),
        (m.disabled = m.disabled.includes(f)
          ? m.disabled.filter((N) => N !== f)
          : [...m.disabled, f]),
        K(m),
        m
      );
    });
  }
  function Cg(f) {
    (a((d) => {
      let m = M(d);
      return ((m.profile.weeklyGoal = f), K(m), m);
    }),
      Zd(!1));
  }
  let af = [
      "calentamiento",
      "racha",
      "mapa",
      "primeras",
      "rutina",
      "stretch",
      "mapaSector",
      "codice",
      "metodos",
      "numeros",
      "aptitud",
      "respaldo",
      "primalLista",
      ...py.map((f) => "ach-" + f),
    ],
    tf = af.every((f) => H && H.collapsed && H.collapsed[f]);
  function kg() {
    a((f) => {
      let d = M(f);
      (d.skills || (d.skills = {}),
        d.care || (d.care = { today: { date: ue(), done: [] }, lifetime: 0 }),
        d.neuro || (d.neuro = Al()),
        d.unlockAll === void 0 && (d.unlockAll = !1),
        d.disabled || (d.disabled = []),
        d.seenUnlocks || (d.seenUnlocks = $e.filter((N) => yt(d, N.id)).map((N) => N.id)),
        d.ui || (d.ui = { collapsed: {} }));
      let m = !tf;
      return (
        af.forEach((N) => {
          d.ui.collapsed[N] = m;
        }),
        K(d),
        d
      );
    });
  }
  function fe(f, act) {
    a((d) => {
      let m = M(d);
      return (
        m.skills || (m.skills = {}),
        m.care || (m.care = { today: { date: ue(), done: [] }, lifetime: 0 }),
        m.neuro || (m.neuro = Al()),
        m.unlockAll === void 0 && (m.unlockAll = !1),
        m.disabled || (m.disabled = []),
        m.seenUnlocks || (m.seenUnlocks = $e.filter((N) => yt(m, N.id)).map((N) => N.id)),
        m.ui || (m.ui = { collapsed: {} }),
        (m.ui.collapsed[f] = act !== void 0 ? !act : !m.ui.collapsed[f]),
        K(m),
        m
      );
    });
  }
  let me = (f) => !!(H && H.collapsed && H.collapsed[f]);
  (0, i.useEffect)(() => {
    let f = {
      combat: "combat",
      primal: "primal",
      exploration: "exploration",
      achievements: "achievements",
    }[Da];
    f && !ye(e, f) && $t("training");
  }, [Da, u.level, u.rank, e.unlockAll]);
  function zg() {
    a((f) => {
      let d = M(f);
      return (d.lastWeekSummary && (d.lastWeekSummary.seen = !0), K(d), d);
    });
  }
  function Eg(f) {
    Ne((d) => M2(d, f));
  }
  function Ag() {
    a((f) => {
      let { state: d, notices: m } = r5(f);
      return (m && m.length && o((N) => [...N, ...m]), K(d), d);
    });
  }
  function Dg(f) {
    o((d) => d.filter((m, N) => N !== f));
  }
  function Tg() {
    ((async () => {
      try {
        let f = await window.claude.use("db");
        f && (await f.doc("player/state").delete());
      } catch (f) {
        console.error("No se pudo borrar el progreso", f);
      }
    })(),
      a(null));
  }
  (0, i.useEffect)(() => {
    (async () => Ld(!!(await xy())))();
  }, []);
  function Mg() {
    (async () => {
      let f = await m5(e);
      (Ld(f),
        o((d) => [
          ...d,
          f
            ? "Punto de retorno guardado. Ya podés probar sin miedo."
            : "No se pudo guardar el punto de retorno.",
        ]));
    })();
  }
  function _g() {
    (async () => {
      let f = await xy();
      if (!f) {
        o((N) => [...N, "No hay ningún punto de retorno guardado."]);
        return;
      }
      let { state: d, notices: m } = ei(f);
      (a(d),
        K(d),
        _l(!1),
        ht(!1),
        Ol("idle"),
        o(["Volviste a tu progreso guardado.", ...(m || [])]));
    })();
  }
  function qg(f) {
    (a((d) => {
      let m = M(d),
        N = ve.indexOf(f);
      return (
        (m.progress.rank = f),
        (m.progress.level = N === 0 ? 1 : au[ve[N - 1]]),
        (m.progress.currentXP = 0),
        (m.ascension.pending = !1),
        (m.today.rank = f),
        (m.today.completed = !1),
        (m.today.fullCompletion = !1),
        (m.today.mode = "pending"),
        (m.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        K(m),
        m
      );
    }),
      o((d) => [...d, `[Prueba] Saltaste al rango ${f} para ver sus ejercicios.`]));
  }
  function Og() {
    (a((f) => {
      let d = M(f),
        m = au[d.progress.rank];
      return (
        m && ((d.progress.level = m), (d.ascension.pending = !0)),
        (d.today.completed = !0),
        (d.today.fullCompletion = !0),
        (d.today.rank = d.progress.rank),
        K(d),
        d
      );
    }),
      o((f) => [...f, "[Prueba] Umbral forzado disponible y día marcado como completo al 100%."]));
  }
  function jg(f) {
    a((d) => {
      let m = M(d);
      m.progress.currentXP += f;
      let N = [];
      return ((m = Ea(m, N)), K(m), N.length && o((_) => [..._, ...N]), m);
    });
  }
  function Bg() {
    a((f) => {
      let d = M(f),
        m = new Date(d.today.date + "T00:00:00");
      (m.setDate(m.getDate() - 1), (d.today.date = __fechaLocal(m)), (d.today.completed = !1));
      let { state: N, notices: _ } = ei(d);
      return (K(N), _.length && o((X) => [...X, ..._]), N);
    });
  }
  function wg() {
    a((f) => {
      let d = M(f);
      return (
        (d.today.completed = !1),
        (d.today.fullCompletion = !1),
        (d.today.mode = "pending"),
        (d.today.rank = d.progress.rank),
        (d.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        (d.today.stretchDone = !1),
        K(d),
        d
      );
    });
  }
  function Ug() {
    let f = Math.max(0, parseFloat((Xd || "0").replace(",", ".")) || 0);
    f &&
      (a((d) => {
        let { state: m } = yd(d, f);
        return (K(m), m);
      }),
      Yd(""));
  }
  function Lg() {
    let f = Math.max(0, parseInt((Ml || "0").replace(/\D/g, ""), 10) || 0);
    if (!f) return;
    let d = Math.round(((f * vd) / 1e3) * 100) / 100;
    d <= 0 ||
      (a((m) => {
        let { state: N } = yd(m, d);
        return (K(N), N);
      }),
      Gd(""));
  }
  function Hg() {
    a((f) => {
      let { state: d, notices: m } = f5(f);
      return (m && m.length && o((N) => [...N, ...m]), K(d), d);
    });
  }
  function Xg() {
    a((f) => {
      let { state: d, notices: m, found: N } = hy(f);
      return (m && m.length && o((_) => [..._, ...m]), N && N.length && ru(N), K(d), d);
    });
  }
  function Yg(f) {
    a((d) => {
      let m = yd(d, f),
        { state: N, notices: _, found: X } = hy(m.state);
      return (_ && _.length && o((de) => [...de, ..._]), X && X.length && ru(X), K(N), N);
    });
  }
  function Gg() {
    (a((f) => {
      let d = M(f);
      return (
        (d.dungeon = { date: d.today.date, ...ai(d.progress.rank) }),
        d.dungeon.available ||
          (d.dungeon = {
            date: d.today.date,
            available: !0,
            completed: !1,
            name: sdcPortales[0].n,
            challengeText: sdcPortales[0].c,
            rewardXP: Ed[d.progress.rank],
          }),
        K(d),
        d
      );
    }),
      o((f) => [...f, "[Prueba] Travesía forzada disponible."]));
  }
  function Zg(f) {
    a((d) => {
      let m = M(d);
      ((m.streak.current = f), (m.streak.best = Math.max(m.streak.best || 0, f)));
      let N = da(m);
      return (N.notices.length && o((_) => [..._, ...N.notices]), K(N.state), N.state);
    });
  }
  function Kg() {
    (a((f) => {
      let d = M(f);
      return ((d.achievements = Jo.map((m) => m.id)), K(d), d);
    }),
      o((f) => [...f, "[Prueba] Todos los logros desbloqueados."]));
  }
  function Vg() {
    (a((f) => {
      let d = M(f);
      return (
        (d.combat.villainIndex = 4),
        (d.combat.lastExercise = null),
        (d.combat.exercise = null),
        (d.combat.lives = 3),
        (d.combat.loadFactor = 1),
        (d.combat.damageFactor = 1),
        (d.combat.bossCats = $o(null)),
        (d.combat.villainCurrentHP = ti(za(4))),
        (d.combat.phase = "resting"),
        (d.combat.roundId = (d.combat.roundId || 0) + 1),
        K(d),
        d
      );
    }),
      _l(!1),
      ht(!1),
      o((f) => [...f, `[Prueba] Saltaste al primer Jefe (${za(4).name}).`]));
  }
  function Qg() {
    (a((f) => {
      let d = M(f);
      return ((d.combat = Ad()), K(d), d);
    }),
      _l(!1),
      ht(!1),
      o((f) => [...f, "[Prueba] Combate reiniciado desde el primer enemigo."]));
  }
  function Wg() {
    (a((f) => {
      let d = M(f);
      d.primal.unlockedCount < Oa.length &&
        ((d.primal.unlockedCount += 1), (d.primal.masteryProgress = 0));
      let m = da(d);
      return (m.notices.length && o((N) => [...N, ...m.notices]), K(m.state), m.state);
    }),
      o((f) => [...f, "[Prueba] Desbloqueado el siguiente movimiento de Instinto Primal."]));
  }
  function Jg() {
    (a((f) => {
      let d = M(f);
      return ((d.primal.today = { date: ue(), count: 0 }), K(d), d);
    }),
      o((f) => [...f, "[Prueba] Contador diario de Instinto Primal reiniciado."]));
  }
  function Fg() {
    a((f) => {
      let d = M(f);
      d.primal.today = { date: ue(), count: 8 };
      let m = ni(d);
      return (
        m.notices.length
          ? o((N) => [...N, ...m.notices])
          : o((N) => [
              ...N,
              '[Prueba] Ya se mostró el aviso hoy, usa "reiniciar contador diario" primero.',
            ]),
        K(m.state),
        m.state
      );
    });
  }
  let Pg = String(Math.floor(fa / 60)).padStart(2, "0"),
    $g = String(fa % 60).padStart(2, "0");
  return i.default.createElement(
    "div",
    { className: "min-h-screen px-4 py-6", style: { background: "#0a0e1a" } },
    i.default.createElement(
      "div",
      { className: "mx-auto", style: { maxWidth: 420 } },
      i.default.createElement(
        "div",
        { className: "mb-4 flex items-center justify-between gap-3" },
        i.default.createElement(
          "div",
          null,
          i.default.createElement(
            "div",
            { className: "text-xs uppercase", style: { letterSpacing: 2, color: "#4f9dff" } },
            "Dominio Corporal",
          ),
          i.default.createElement(
            "div",
            { className: "text-sm", style: { color: "#9aa4bd" } },
            "Bienvenido de vuelta, ",
            s.name,
          ),
          (() => {
            let cb = sdcCalibre(s);
            return cb
              ? i.default.createElement(
                  "div",
                  {
                    className: "text-xs mt-1",
                    style: {
                      color: "#ffb84f",
                      fontFamily: "Chakra Petch, sans-serif",
                      fontWeight: 700,
                      letterSpacing: 1,
                    },
                  },
                  cb,
                )
              : null;
          })(),
        ),
        i.default.createElement(
          "button",
          {
            onClick: irTienda,
            title: "Puntos de Dominio",
            style: {
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 58,
              padding: "7px 10px",
              background: "rgba(124,92,255,0.15)",
              border: "1px solid #7c5cff",
              color: "#b9a5ff",
              fontFamily: "Chakra Petch, sans-serif",
              lineHeight: 1.1,
            },
          },
          i.default.createElement("span", { style: { fontSize: 18, fontWeight: 700 } }, C.points),
          i.default.createElement("span", { style: { fontSize: 10, letterSpacing: 1 } }, "PD"),
        ),
      ),
      i.default.createElement(
        "div",
        { className: "mb-4", style: { position: "relative" } },
        i.default.createElement(
          "div",
          { className: "text-xs mb-1 flex items-center justify-between" },
          i.default.createElement(
            "span",
            {
              style: {
                color: z,
                fontFamily: "Chakra Petch, sans-serif",
                fontWeight: 700,
                letterSpacing: 1,
              },
            },
            "NV. ",
            u.level,
            " · ",
            sdcRango(u.rank, s),
          ),
          i.default.createElement(
            "span",
            { style: { color: "#9aa4bd" } },
            c.completed ? u.currentXP : u.currentXP + sdcTotalHechas(),
            " / ",
            U,
            " XP",
          ),
        ),
        i.default.createElement(qa, {
          value: c.completed ? u.currentXP : u.currentXP + sdcTotalHechas(),
          max: U,
          color: z,
        }),
        sdcFlota &&
          sdcFlota.n > 0 &&
          i.default.createElement(
            "div",
            {
              key: sdcFlota.id,
              className: "sdc-pop",
              style: {
                position: "absolute",
                right: 0,
                top: -6,
                pointerEvents: "none",
                color: z,
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                textShadow: "0 0 12px " + z,
              },
            },
            "+",
            sdcFlota.n,
            " XP",
          ),
        i.default.createElement(
          "div",
          {
            className: "text-xs mt-1 flex items-center justify-between gap-2",
            style: { color: "#7a83a0" },
          },
          i.default.createElement(
            "span",
            null,
            q ? "Umbral: " + Math.min(u.level, q) + "/" + q : "",
          ),
          (() => {
            let f = $e.find((d) => !yt(e, d.id));
            return f
              ? i.default.createElement(
                  "span",
                  null,
                  "Próximo: ",
                  i.default.createElement("b", { style: { color: "#9aa4bd" } }, f.name),
                  " en Nv. ",
                  f.level,
                )
              : null;
          })(),
        ),
        p.flexBuff &&
          i.default.createElement(
            "div",
            { className: "text-xs mt-1", style: { color: "#ffb84f" } },
            "Buff de Flexibilidad activo (+10% XP)",
          ),
      ),
      It.length > 0 &&
        i.default.createElement(
          Q,
          { accent: "#ffb84f", style: { marginBottom: 16 } },
          i.default.createElement(
            "div",
            { className: "text-xs uppercase mb-1", style: { letterSpacing: 2, color: "#ffb84f" } },
            "Hallazgo",
          ),
          i.default.createElement(
            "div",
            {
              style: {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                color: "#e8ecf7",
                fontWeight: 700,
              },
            },
            It[0].name,
          ),
          i.default.createElement(
            "div",
            { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
            It[0].text,
          ),
          i.default.createElement(
            "div",
            {
              className: "mt-3 p-3",
              style: {
                background: "rgba(255,184,79,0.08)",
                border: "1px solid rgba(255,184,79,0.3)",
              },
            },
            i.default.createElement(
              "div",
              { className: "flex items-center gap-2 mb-1" },
              i.default.createElement(Nl, { size: 14, color: "#ffb84f" }),
              i.default.createElement(
                "div",
                { className: "text-sm", style: { color: "#ffb84f", fontWeight: 700 } },
                It[0].relic,
              ),
            ),
            i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#e8ecf7" } },
              It[0].lore,
            ),
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => ru((f) => f.slice(1)),
              className: "w-full py-3 text-sm mt-3",
              style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
            },
            It.length > 1 ? `Siguiente hallazgo (${It.length - 1} más)` : "Archivar en el Códice",
          ),
        ),
      i.default.createElement(b5, { notices: n, onDismiss: Dg, onDismissAll: () => o([]) }),
      i.default.createElement(
        Q,
        { accent: "#ffb84f", style: { marginBottom: 16 } },
        i.default.createElement(
          "div",
          { className: "w-full flex items-center mb-2", style: { justifyContent: "flex-end" } },
          i.default.createElement(
            "button",
            {
              onClick: () => fe("ayuda"),
              style: {
                cursor: "pointer",
                background: "transparent",
                color: "#4f9dff",
                border: "1px solid #4f9dff",
                height: 44,
                padding: "0 14px",
                fontWeight: 700,
                lineHeight: 1,
                fontSize: 13,
              },
            },
            "¿Cómo funciona?",
          ),
        ),
        i.default.createElement(
          "div",
          { className: "flex items-center gap-3" },
          i.default.createElement(Cd, {
            type: s.pet ? s.pet.type : "dog",
            size: 48,
            color: k5(u.rank),
            rank: u.rank,
          }),
          i.default.createElement(
            "div",
            null,
            i.default.createElement(
              "div",
              {
                style: {
                  fontFamily: "Chakra Petch, sans-serif",
                  color: "#e8ecf7",
                  fontWeight: 700,
                },
              },
              s.pet && s.pet.name ? s.pet.name : "Tu compañero",
            ),
            i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#9aa4bd" } },
              $y,
            ),
          ),
        ),
        i.default.createElement(
          "button",
          {
            onClick: () => Iy(ou[Math.floor(Math.random() * ou.length)]),
            className: "text-xs underline",
            style: {
              color: "#ffb84f",
              display: "inline-block",
              padding: "15px 8px",
              margin: "-7px -8px -15px -8px",
            },
          },
          "Otro consejo",
        ),
      ),
      H &&
        H.collapsed &&
        H.collapsed.ayuda &&
        i.default.createElement(
          ge,
          {
            id: "ayuda",
            title: "¿Cómo funciona?",
            accent: "#8a93ad",
            style: { marginBottom: 16 },
            collapsed: !1,
            onToggle: fe,
            right: `${j2.length} temas`,
          },
          i.default.createElement(
            "div",
            { style: { fontSize: 14, lineHeight: 1.5, color: "#9aa4bd" } },
            "Tocá cualquier tema para leerlo. Si recién empezás, los tres primeros son los que importan.",
          ),
          (() => {
            let sdcGv = "";
            return j2.map((m) => {
              let sdcAb = !!sdcTema[m.title],
                sdcNu = m.g !== sdcGv;
              sdcGv = m.g;
              return i.default.createElement(
                "div",
                { key: m.title },
                sdcNu
                  ? i.default.createElement(
                      "div",
                      {
                        className: "text-xs uppercase",
                        style: {
                          letterSpacing: 2,
                          color: "#7a83a0",
                          marginTop: 16,
                          marginBottom: 2,
                          paddingTop: 12,
                          borderTop: "1px solid rgba(255,255,255,0.14)",
                        },
                      },
                      m.g,
                    )
                  : null,
                i.default.createElement(
                  "div",
                  { style: { borderBottom: "1px solid rgba(255,255,255,0.06)" } },
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => sdcSetTema((d) => ({ ...d, [m.title]: !d[m.title] })),
                      className: "w-full flex items-center justify-between text-left",
                      style: {
                        background: "transparent",
                        border: "none",
                        padding: "14px 0",
                        color: "inherit",
                        gap: 10,
                      },
                    },
                    i.default.createElement(
                      "span",
                      {
                        style: {
                          fontSize: 16,
                          lineHeight: 1.3,
                          color: sdcAb ? "#e8ecf7" : "#b6c0d8",
                          fontWeight: 600,
                        },
                      },
                      m.title,
                    ),
                    i.default.createElement(
                      "span",
                      {
                        style: {
                          display: "inline-block",
                          flexShrink: 0,
                          transform: sdcAb ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform .2s",
                        },
                      },
                      i.default.createElement(Za, { size: 16, color: "#7a83a0" }),
                    ),
                  ),
                  sdcAb
                    ? i.default.createElement(
                        "div",
                        {
                          style: {
                            fontSize: 15,
                            lineHeight: 1.65,
                            color: "#c8d0e4",
                            paddingBottom: 16,
                            paddingRight: 2,
                          },
                        },
                        m.text,
                      )
                    : null,
                ),
              );
            });
          })(),
        ),
      H &&
        H.collapsed &&
        H.collapsed.tienda &&
        i.default.createElement(
          ge,
          {
            id: "tienda",
            title: "Puntos de Dominio",
            accent: "#7c5cff",
            style: { marginBottom: 16 },
            collapsed: !1,
            onToggle: fe,
            right: `${C.points} PD`,
          },
          i.default.createElement(
            "div",
            { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
            "Ganás 3 puntos el día que completás tu rutina al 100%, o 1 punto si llegás al menos a la mitad. Solo cuenta la primera sesión de cada día: los estilos extra dan XP, pero no más puntos.",
          ),
          C.shields > 0 &&
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#7c5cff" } },
              "Escudos de Racha disponibles: ",
              C.shields,
            ),
          C.xpBuffDate === ue() &&
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#ffb84f" } },
              "Impulso de XP activo hoy (+" +
                Math.round(((C.xpBuffMult || 1.25) - 1) * 100) +
                "%).",
            ),
          i.default.createElement(
            "div",
            { className: "mt-2" },
            Ey.map((m) => {
              let N = C.points >= m.cost;
              return i.default.createElement(
                "div",
                {
                  key: m.id,
                  className: "py-2",
                  style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
                },
                i.default.createElement(
                  "div",
                  { className: "flex items-center justify-between gap-2" },
                  i.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    i.default.createElement(
                      "div",
                      { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                      m.name,
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs", style: { color: "#9aa4bd" } },
                      m.desc,
                    ),
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => Eg(m.id),
                      disabled: !N,
                      className: "py-2 px-3 text-xs disabled:opacity-40",
                      style: {
                        background: N ? "#7c5cff" : "rgba(255,255,255,0.05)",
                        border: "1px solid #7c5cff",
                        color: N ? "#0a0e1a" : "#9aa4bd",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      },
                    },
                    m.cost,
                    " PD",
                  ),
                ),
              );
            }),
          ),
        ),
      i.default.createElement(
        "div",
        { className: "flex justify-end mb-2" },
        i.default.createElement(
          "button",
          {
            onClick: kg,
            className: "text-xs",
            style: { color: "#9aa4bd", padding: "15px 8px", margin: "-15px -8px" },
          },
          tf ? "Expandir todo" : "Minimizar todo",
        ),
      ),
      (() => {
        let f = [
          { id: "training", label: "Entreno", icon: Pb, color: z, on: !0 },
          { id: "combat", label: "Combate", icon: Vo, color: "#ff5c7a", on: ye(e, "combat") },
          { id: "primal", label: "Primal", icon: Qs, color: "#3ecf8e", on: ye(e, "primal") },
          {
            id: "exploration",
            label: "Explorar",
            icon: Ib,
            color: "#7c5cff",
            on: ye(e, "exploration"),
          },
          {
            id: "achievements",
            label: "Logros",
            icon: Vs,
            color: "#ffb84f",
            on: ye(e, "achievements"),
          },
          { id: "profile", label: "Perfil", icon: ey, color: "#4f9dff", on: !0 },
        ].filter((d) => d.on);
        return i.default.createElement(
          "div",
          { className: "grid grid-cols-3 gap-1 mb-4" },
          f.map((d) => {
            let m = d.icon,
              N = Da === d.id;
            return i.default.createElement(
              "button",
              {
                key: d.id,
                onClick: () => $t(d.id),
                className: "flex items-center justify-center gap-1 py-2 text-xs",
                style: {
                  minHeight: 48,
                  background: N ? d.color : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: N ? "#0a0e1a" : "#8a93ad",
                  fontWeight: 600,
                },
              },
              i.default.createElement(m, { size: 13 }),
              " ",
              d.label,
            );
          }),
        );
      })(),
      Da === "training" &&
        i.default.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column" } },
          sdcAvisaRespaldo(e) &&
            i.default.createElement(
              Q,
              { accent: "#ffb84f", style: { marginBottom: 16, order: -3 } },
              i.default.createElement(
                "div",
                { className: "text-sm mb-1", style: { color: "#ffb84f", fontWeight: 700 } },
                "Hacé un respaldo",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Tu progreso vive solo en este dispositivo. Si borrás los datos del navegador o cambiás de teléfono se pierde todo: no hay copia en ningún servidor.",
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => bkDescargar(),
                    className: "flex-1 py-3 text-xs",
                    style: {
                      minHeight: 48,
                      background: "#ffb84f",
                      color: "#0a0e1a",
                      fontWeight: 700,
                    },
                  },
                  "Descargar respaldo",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      (sdcRespaldoPosponer(),
                        o((d) => [...d, "Te vuelvo a recordar lo del respaldo en una semana."]));
                    },
                    className: "py-3 px-3 text-xs",
                    style: {
                      minHeight: 48,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#9aa4bd",
                    },
                  },
                  "Más tarde",
                ),
              ),
            ),
          D &&
            !D.seen &&
            i.default.createElement(
              Q,
              { accent: "#ffb84f", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Chakra Petch, sans-serif",
                    color: "#ffb84f",
                    fontWeight: 700,
                  },
                  className: "mb-2",
                },
                "Informe de la semana anterior",
              ),
              i.default.createElement(
                "div",
                { className: "grid grid-cols-2 gap-2 text-sm mb-3" },
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement(
                    "span",
                    { style: { color: "#9aa4bd" } },
                    "Días entrenados",
                  ),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.trained),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement(
                    "span",
                    { style: { color: "#9aa4bd" } },
                    "Días perfectos",
                  ),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.fullDays),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement("span", { style: { color: "#9aa4bd" } }, "XP ganada"),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.xp),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Travesías"),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.dungeons),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Primal"),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.primal),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Estiramientos"),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.stretches),
                ),
              ),
              i.default.createElement(
                "button",
                {
                  onClick: zg,
                  className: "w-full py-2 text-xs",
                  style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                },
                "Entendido",
              ),
            ),
          i.default.createElement(
            ge,
            {
              id: "racha",
              title: "Constancia",
              accent: "#3ecf8e",
              style: { marginBottom: 16 },
              collapsed: H && H.collapsed && H.collapsed.racha !== void 0 ? me("racha") : !0,
              onToggle: fe,
              right: `${al}/${Re} esta semana`,
            },
            i.default.createElement(
              "div",
              { className: "flex items-center justify-between mb-2" },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2" },
                i.default.createElement(Ph, { size: 18, color: al >= Re ? "#ff5c7a" : "#5a6178" }),
                i.default.createElement(
                  "div",
                  null,
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    al,
                    " de ",
                    Re,
                    " sesiones",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Racha semanal: ",
                    e.weeklyStreak || 0,
                    " · récord ",
                    e.bestWeeklyStreak || 0,
                  ),
                ),
              ),
              i.default.createElement(
                "button",
                {
                  onClick: () => Zd((f) => !f),
                  className: "text-xs underline",
                  style: { color: "#9aa4bd" },
                },
                "Cambiar meta",
              ),
            ),
            i.default.createElement(qa, { value: Math.min(al, Re), max: Re, color: "#3ecf8e" }),
            i.default.createElement(
              "div",
              { className: "text-xs mt-2", style: { color: "#9aa4bd" } },
              al >= Re
                ? "Meta semanal cumplida. Todo lo que entrenes de más es ganancia."
                : `Te quedan ${qy(c.date)} días para completar ${Re - al} ${Re - al === 1 ? "sesión" : "sesiones"}.`,
            ),
            Wy &&
              i.default.createElement(
                "div",
                {
                  className: "mt-3 p-2",
                  style: {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  },
                },
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                  "¿Cuántas sesiones querés hacer por semana? Solo se corta tu racha si ya no podés alcanzarla.",
                ),
                i.default.createElement(
                  "div",
                  { className: "grid grid-cols-7 gap-1" },
                  [1, 2, 3, 4, 5, 6, 7].map((f) =>
                    i.default.createElement(
                      "button",
                      {
                        key: f,
                        onClick: () => Cg(f),
                        className: "py-2 text-xs",
                        style: {
                          background: Re === f ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                          border: "1px solid " + (Re === f ? "#3ecf8e" : "rgba(255,255,255,0.15)"),
                          color: Re === f ? "#0a0e1a" : "#9aa4bd",
                          fontWeight: 700,
                        },
                      },
                      f,
                    ),
                  ),
                ),
              ),
            i.default.createElement(
              "div",
              { className: "mt-3" },
              i.default.createElement(
                "div",
                { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                "Racha diaria: ",
                p.current,
                " día",
                p.current === 1 ? "" : "s",
                " · récord ",
                p.best,
              ),
              i.default.createElement(S5, {
                days: Id,
                onPick: (f) => Kd((d) => (d === f ? null : f)),
                selected: Bn,
              }),
              Bn &&
                i.default.createElement(C5, {
                  date: Bn,
                  status: (Id.find((f) => f.date === Bn) || {}).status,
                  log: (e.dayLog || {})[Bn],
                  animo: sdcAnimo(e)[Bn],
                  onClose: () => Kd(null),
                  onLog: (function () {
                    var sq = (Id.find((f) => f.date === Bn) || {}).status;
                    return Bn < ue() && (sq === "empty" || sq === "skipped" || sq === "missed")
                      ? function (fx) {
                          (Ne((dd) => sdcDiaPasado(dd, fx)), Kd(null));
                        }
                      : null;
                  })(),
                }),
              (() => {
                let sdcLeg = [
                  { label: "Completo", color: bt.full, k: "full" },
                  { label: "Parcial", color: bt.partial, k: "partial" },
                  { label: "Descanso", color: bt.rest, k: "rest" },
                  { label: "Sin entrenar", color: bt.skipped, k: "skipped" },
                  { label: "Escudo", color: bt.shield, k: "shield" },
                  { label: "Fuera de meta", color: bt.missed, k: "missed" },
                  {
                    label: "Hoy",
                    color: bt.pending,
                    k: "pending",
                    borde: "1px dashed rgba(255,255,255,0.3)",
                  },
                  {
                    label: "Sin registro",
                    color: bt.empty,
                    k: "empty",
                    borde: "1px solid rgba(255,255,255,0.12)",
                  },
                ].filter((sdcZ) => Id.some((sdcD) => sdcD.status === sdcZ.k));
                return sdcLeg.length ? i.default.createElement(h5, { items: sdcLeg }) : null;
              })(),
            ),
            ye(e, "missions") &&
              e.missions &&
              i.default.createElement(
                "div",
                { className: "mt-3" },
                ["week", "month"].map((amb) => {
                  let m = amb === "week" ? e.missions.weekly : e.missions.monthly;
                  if (!m) return null;
                  let hecho = amb === "week" ? e.missions.weeklyDone : e.missions.monthlyDone,
                    pr = Math.min(m.target, misProgreso(e, m, amb)),
                    pct = Math.round((pr / m.target) * 100);
                  return i.default.createElement(
                    "div",
                    {
                      key: amb,
                      className: "mb-2 p-2",
                      style: {
                        background: "rgba(255,255,255,0.03)",
                        border:
                          "1px solid " +
                          (hecho ? "rgba(62,207,142,0.35)" : "rgba(255,184,79,0.25)"),
                      },
                    },
                    i.default.createElement(
                      "div",
                      { className: "flex justify-between text-xs mb-1" },
                      i.default.createElement(
                        "span",
                        { style: { color: hecho ? "#3ecf8e" : "#ffb84f", fontWeight: 700 } },
                        amb === "week" ? "Misión semanal" : "Misión mensual",
                      ),
                      i.default.createElement(
                        "span",
                        { style: { color: "#9aa4bd" } },
                        hecho ? "Completada" : pr + " / " + m.target,
                      ),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-1", style: { color: "#e8ecf7" } },
                      misTexto(m, amb),
                    ),
                    i.default.createElement(
                      "div",
                      { style: { height: 4, background: "#161b2e" } },
                      i.default.createElement("div", {
                        style: {
                          height: 4,
                          width: pct + "%",
                          background: hecho ? "#3ecf8e" : "#ffb84f",
                          transition: "width .3s",
                        },
                      }),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-1", style: { color: "#7a83a0" } },
                      "Recompensa: +" + m.xp + " XP y +" + m.pd + " PD",
                    ),
                  );
                }),
              ),
          ),
          ye(e, "dungeon") &&
            y.available &&
            !y.completed &&
            i.default.createElement(
              Q,
              { accent: "#ff5c7a", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2 mb-2" },
                i.default.createElement(Vo, { color: "#ff5c7a", size: 18 }),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      color: "#ff5c7a",
                      fontWeight: 700,
                    },
                  },
                  "Travesía de hoy",
                ),
              ),
              i.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Chakra Petch, sans-serif",
                    color: "#e8ecf7",
                    fontWeight: 700,
                    fontSize: 18,
                  },
                },
                y.name,
              ),
              i.default.createElement(
                "div",
                { className: "text-sm mt-2 mb-2", style: { color: "#e8ecf7" } },
                "Desafío: ",
                y.challengeText,
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Recompensa: +",
                y.rewardXP,
                " XP",
              ),
              (function () {
                var ini = (e.dungeon && e.dungeon.startedAt) || 0,
                  rit = sdcTravRitmo(y.name);
                if (!ini)
                  return i.default.createElement(
                    i.default.Fragment,
                    null,
                    i.default.createElement(
                      "button",
                      {
                        onClick: sdcTravEmpezar,
                        className: "w-full flex items-center justify-center gap-2 py-3 text-sm",
                        style: {
                          minHeight: 48,
                          background: "#ff5c7a",
                          color: "#0a0e1a",
                          fontWeight: 700,
                        },
                      },
                      i.default.createElement(Vo, { size: 16 }),
                      " Empezar la travesía",
                    ),
                    i.default.createElement(
                      "button",
                      {
                        onClick: Ag,
                        className: "w-full text-xs underline mt-2",
                        style: { minHeight: 44, color: "#9aa4bd" },
                      },
                      "Ya la hice, sin el teléfono",
                    ),
                  );
                return i.default.createElement(sdcTravCrono, {
                  inicio: ini,
                  mins: sdcTravMin(y.challengeText),
                  on: rit.on,
                  off: rit.off,
                  onCancel: sdcTravCancelar,
                  onListo: Ag,
                });
              })(),
            ),
          ye(e, "dungeon") &&
            y.available &&
            y.completed &&
            i.default.createElement(
              Q,
              { accent: "#ff5c7a", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2 text-sm", style: { color: "#ff5c7a" } },
                i.default.createElement(Mn, { size: 16 }),
                " Travesía completada: ",
                y.name,
                " (+",
                y.rewardXP,
                " XP)",
              ),
            ),
          ye(e, "dungeon") &&
            !y.available &&
            i.default.createElement(
              "div",
              { className: "text-xs text-center mb-4", style: { color: "#7a83a0" } },
              "Hoy no hay travesía. Volvé mañana.",
            ),
          v.pending &&
            i.default.createElement(
              Q,
              { accent: "#ffb84f", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2 mb-2" },
                i.default.createElement(Nl, { color: "#ffb84f", size: 18 }),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      color: "#ffb84f",
                      fontWeight: 700,
                    },
                  },
                  "Umbral disponible",
                ),
              ),
              (() => {
                let f = I2(u.rank, s.classification, s.focusProfile, B, s.testResults);
                return i.default.createElement(
                  "div",
                  { className: "mb-3" },
                  i.default.createElement(
                    "div",
                    { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
                    f.rounds,
                    " rondas encadenadas:",
                  ),
                  ["squat", "pushup", "back", "abs"].map((d) =>
                    i.default.createElement(
                      "div",
                      { key: d, className: "text-sm", style: { color: "#9aa4bd" } },
                      f.reps[d],
                      " × ",
                      kl(u.rank, s.classification, d, B),
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-2", style: { color: "#ffb84f" } },
                    f.note,
                  ),
                );
              })(),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Realiza este desafío en la vida real y luego confírmalo aquí.",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: yg,
                  disabled: !(c.completed && c.fullCompletion),
                  className:
                    "w-full flex items-center justify-center gap-2 py-3 text-sm disabled:opacity-40",
                  style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                },
                i.default.createElement(Mn, { size: 16 }),
                " Crucé el Umbral",
              ),
              !(c.completed && c.fullCompletion) &&
                i.default.createElement(
                  "div",
                  { className: "text-xs mt-2 text-center", style: { color: "#9aa4bd" } },
                  "Completá tu rutina al 100% hoy para poder cruzar tu Umbral.",
                ),
            ),
          (function () {
            var gs = ["squat", "pushup", "back", "abs"],
              pd = sdcPodia(e),
              pend = null;
            for (var q = 0; q < gs.length; q++) {
              var ex = _d(gs[q], u.rank, B);
              if (ex && ex.name && pd[ex.name] === void 0) {
                pend = ex.name;
                break;
              }
            }
            if (!pend) return null;
            return i.default.createElement(
              Q,
              { accent: "#b084f5", style: { marginBottom: 16, order: -1 } },
              i.default.createElement(
                "div",
                {
                  className: "text-xs uppercase mb-1",
                  style: { letterSpacing: 2, color: "#b084f5" },
                },
                "Una pregunta",
              ),
              i.default.createElement(
                "div",
                { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 700 } },
                "¿Alguna vez hiciste " + pend + "?",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Te lo pregunto una sola vez. Si nunca pudiste, el día que lo hagas queda anotado como una primera vez.",
              ),
              i.default.createElement(
                "div",
                { className: "grid grid-cols-2 gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: function () {
                      sdcResponderPodia(pend, !1);
                    },
                    className: "py-2 text-xs",
                    style: {
                      minHeight: 44,
                      background: "rgba(176,132,245,0.15)",
                      border: "1px solid #b084f5",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Nunca pude",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: function () {
                      sdcResponderPodia(pend, !0);
                    },
                    className: "py-2 text-xs",
                    style: {
                      minHeight: 44,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#9aa4bd",
                    },
                  },
                  "Ya podía",
                ),
              ),
            );
          })(),
          i.default.createElement(
            ge,
            {
              id: "mapa",
              title: "Tu cuerpo",
              accent: "#5a6178",
              style: { marginBottom: 16, order: c.completed ? -4 : -2 },
              collapsed: H && H.collapsed && H.collapsed.mapa !== void 0 ? me("mapa") : !1,
              onToggle: fe,
              right:
                ma === "desarrollo"
                  ? `Nv. medio ${Math.round(Hn.reduce((f, d) => f + Wa.levels[d], 0) / 4)}`
                  : ma === "semana"
                    ? `${Math.round((Hn.reduce((f, d) => f + Math.min(1, ((r.reps && r.reps[d]) || 0) / Pd(d)), 0) / 4) * 100)}% semana`
                    : "hoy",
            },
            i.default.createElement(
              "div",
              { className: "grid grid-cols-3 gap-1 mb-2" },
              [
                ["desarrollo", "Desarrollo"],
                ["semana", "Semana"],
                ["hoy", "Hoy"],
              ].map(([f, d]) =>
                i.default.createElement(
                  "button",
                  {
                    key: f,
                    onClick: () => Hy(f),
                    className: "py-2 text-xs",
                    style: {
                      background: ma === f ? "#ff6b4a" : "rgba(255,255,255,0.03)",
                      border: "1px solid " + (ma === f ? "#ff6b4a" : "rgba(255,255,255,0.12)"),
                      color: ma === f ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    },
                  },
                  d,
                ),
              ),
            ),
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#7a83a0" } },
              ma === "desarrollo"
                ? "Cuánto construiste en cada patrón desde que empezaste. No se reinicia nunca."
                : ma === "semana"
                  ? "Qué trabajaste esta semana frente a tu meta de " + Re + " sesiones."
                  : "Progreso de la rutina de hoy.",
            ),
            i.default.createElement(
              "div",
              { className: "flex items-center justify-end mb-2" },
              i.default.createElement(
                "div",
                { className: "flex gap-1" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => Hd("front"),
                    className: "px-2 py-1 text-xs",
                    style: {
                      background: jn === "front" ? "rgba(255,255,255,0.1)" : "transparent",
                      color: jn === "front" ? "#e8ecf7" : "#5a6178",
                      border: "1px solid rgba(255,255,255,0.12)",
                    },
                  },
                  "Frente",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => Hd("back"),
                    className: "px-2 py-1 text-xs",
                    style: {
                      background: jn === "back" ? "rgba(255,255,255,0.1)" : "transparent",
                      color: jn === "back" ? "#e8ecf7" : "#5a6178",
                      border: "1px solid rgba(255,255,255,0.12)",
                    },
                  },
                  "Espalda",
                ),
              ),
            ),
            i.default.createElement(g5, {
              view: jn,
              colors: $d,
              glow: c.stretchDone,
              ratios: ma === "hoy" ? tg : null,
              selected: vt,
              onSelect: su,
            }),
            i.default.createElement(
              "div",
              { className: "grid grid-cols-2 gap-x-3 gap-y-1 mt-3" },
              Hn.map((f) =>
                i.default.createElement(
                  "button",
                  {
                    key: f,
                    onClick: () => su(vt === f ? null : f),
                    className: "flex items-center justify-between text-xs py-1",
                    style: { background: "transparent", border: "none" },
                  },
                  i.default.createElement(
                    "span",
                    { className: "flex items-center gap-2", style: { color: "#9aa4bd" } },
                    i.default.createElement("span", {
                      style: {
                        width: 10,
                        height: 10,
                        background: $d[f],
                        display: "inline-block",
                        flexShrink: 0,
                      },
                    }),
                    Fo[f].label.split(" ")[0],
                  ),
                  i.default.createElement(
                    "span",
                    { style: { color: "#e8ecf7" } },
                    ma === "desarrollo"
                      ? "Nv. " + Wa.levels[f]
                      : ma === "semana"
                        ? (r.reps && r.reps[f]) || 0
                        : (Rt[f] || 0) + "/" + (sdcMt[f] || 0),
                  ),
                ),
              ),
            ),
            Wa.gap >= 2 &&
              i.default.createElement(
                "div",
                {
                  className: "text-xs mt-3 p-2",
                  style: {
                    color: "#ffb84f",
                    background: "rgba(255,184,79,0.08)",
                    border: "1px solid rgba(255,184,79,0.25)",
                  },
                },
                "Desequilibrio detectado: tu ",
                Fo[Wa.hi].label.toLowerCase(),
                " va ",
                Wa.gap,
                " niveles por delante de tu ",
                Fo[Wa.lo].label.toLowerCase(),
                ". Prioriza ese patrón para emparejarlo.",
              ),
            (() => {
              let f = Hn.map((d) => ({ k: d, d: wd(h ? h[d] : null, c.date) })).filter(
                (d) => d.d === null || d.d >= 4,
              );
              return !f.length || Wa.gap >= 2
                ? null
                : i.default.createElement(
                    "div",
                    {
                      className: "text-xs mt-3 p-2",
                      style: {
                        color: "#9aa4bd",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      },
                    },
                    "Sin estímulo reciente: ",
                    f.map((d) => Fo[d.k].label.toLowerCase()).join(", "),
                    ".",
                  );
            })(),
            vt &&
              i.default.createElement(v5, {
                zoneKey: vt,
                rank: Y,
                classification: s.classification,
                lifetime: T[vt] || 0,
                target: sdcMt[vt] || 0,
                doneToday: Rt[vt] || 0,
                lastTrained: h ? h[vt] : null,
                today: c.date,
                modality: B,
                onClose: () => su(null),
              }),
            c.stretchDone &&
              i.default.createElement(
                "div",
                { className: "flex items-center gap-1 mt-2 text-xs", style: { color: "#3ecf8e" } },
                i.default.createElement(Nl, { size: 12 }),
                " Brillo de recuperación activo por tu estiramiento de hoy",
              ),
          ),
          sdcAnimoOn(e) &&
            !c.completed &&
            !(c.doneModalities || []).length &&
            sdcTotalHechas() === 0 &&
            !sdcCalor(e).ini &&
            !sdcCalor(e).hecho &&
            (function (h) {
              return !h.no;
            })(sdcAnimoHoy(e)) &&
            i.default.createElement(
              Q,
              { accent: "#4f9dff", style: { marginBottom: 16, order: -6 } },
              i.default.createElement(sdcAnimoAntes, {
                st: e,
                Ne: Ne,
                mod: B,
                onModo: On,
                descLibre: !r.restDayUsed,
                onDescanso: bg,
              }),
            ),
          !c.completed &&
            i.default.createElement(
              ge,
              {
                id: "calentamiento",
                title: "Calentamiento",
                accent: "#ff8f5a",
                style: { marginBottom: 16, order: -5 },
                collapsed:
                  H && H.collapsed && H.collapsed.calentamiento !== void 0
                    ? me("calentamiento")
                    : !1,
                onToggle: fe,
                right: sdcCalorDer(e, B, Aa),
              },
              i.default.createElement(sdcCalorCard, {
                st: e,
                mod: B,
                metas: Aa,
                Ne: Ne,
                onModo: On,
                sinSeries: sdcTotalHechas() === 0,
              }),
            ),
          c.completed
            ? i.default.createElement(
                Q,
                { accent: z, style: { marginBottom: 16, order: -1 } },
                sdcAnimoOn(e) &&
                  c.mode !== "rest" &&
                  i.default.createElement(sdcAnimoDespues, {
                    st: e,
                    Ne: Ne,
                    onPrueba: () => {
                      ($t("profile"), Ne((d) => sdcAbrirCard(d, "aptitud")));
                    },
                  }),
                i.default.createElement(
                  "div",
                  { className: "flex items-center gap-2 mb-1" },
                  i.default.createElement(Mn, { size: 16, color: z }),
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Misión de hoy completada",
                  ),
                ),
                i.default.createElement(
                  "div",
                  { className: "text-xs", style: { color: "#9aa4bd" } },
                  "Modo: ",
                  c.mode === "normal"
                    ? "Normal"
                    : c.mode === "recovery"
                      ? "Recuperación"
                      : c.mode === "rest"
                        ? "Descanso"
                        : "Prueba",
                  " · +",
                  c.xpEarned,
                  " XP hoy",
                ),
                c.fullCompletion &&
                  i.default.createElement(
                    "div",
                    {
                      className: "flex items-center gap-1 mt-2 text-xs",
                      style: { color: "#ffb84f" },
                    },
                    i.default.createElement(Nl, { size: 12 }),
                    " Día perfecto — hoy podés cruzar tu Umbral si está disponible",
                  ),
                (() => {
                  let rp = c.reps || {},
                    rc = e.records || {},
                    wk = (r && r.reps) || {},
                    gs = [
                      ["squat", "Piernas"],
                      ["pushup", "Empuje"],
                      ["back", "Tracción"],
                      ["abs", "Core"],
                    ],
                    tot = gs.reduce((ac, g) => ac + (rp[g[0]] || 0), 0);
                  if (!tot) return null;
                  let sem = gs.reduce((ac, g) => ac + (wk[g[0]] || 0), 0);
                  return i.default.createElement(
                    "div",
                    {
                      className: "mt-3 pt-3",
                      style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
                    },
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "Lo que hiciste hoy: ",
                      i.default.createElement("b", { style: { color: "#e8ecf7" } }, tot, " reps"),
                    ),
                    gs.map((g) => {
                      let v = rp[g[0]] || 0,
                        mx = rc[g[0]] || 0,
                        pr = v > 0 && v >= mx && (T[g[0]] || 0) > v;
                      return i.default.createElement(
                        "div",
                        { key: g[0], className: "flex items-center justify-between text-xs mb-1" },
                        i.default.createElement(
                          "span",
                          { style: { color: pr ? "#ffb84f" : "#8a93ad" } },
                          g[1],
                          pr ? " ★ récord" : "",
                        ),
                        i.default.createElement(
                          "span",
                          { style: { color: "#e8ecf7" } },
                          v,
                          i.default.createElement(
                            "span",
                            { style: { color: "#7a83a0" } },
                            " / ",
                            mx,
                            " máx",
                          ),
                        ),
                      );
                    }),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-2", style: { color: "#7a83a0" } },
                      "Esta semana: ",
                      sem,
                      " reps en ",
                      r.trained || 0,
                      " ",
                      (r.trained || 0) === 1 ? "sesión" : "sesiones",
                    ),
                  );
                })(),
                (() => {
                  let hechas = c.doneModalities || [],
                    restan = qn(s).filter((id) => !hechas.includes(id));
                  if (!restan.length) return null;
                  return i.default.createElement(
                    "div",
                    { className: "mt-3" },
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "Añade otro estilo hoy y esa sesión te dará +" +
                        25 * hechas.length +
                        "% de XP:",
                    ),
                    i.default.createElement(
                      "div",
                      { className: "flex gap-2" },
                      restan.map((id) =>
                        i.default.createElement(
                          "button",
                          {
                            key: id,
                            onClick: () => mmNueva(id),
                            className: "flex-1 py-2 text-xs",
                            style: {
                              background: "rgba(79,157,255,0.12)",
                              border: "1px solid #4f9dff",
                              color: "#4f9dff",
                              fontWeight: 600,
                            },
                          },
                          "+ ",
                          id === "bodyweight"
                            ? "Peso corporal"
                            : id === "gym"
                              ? "Gimnasio"
                              : "Flow",
                        ),
                      ),
                    ),
                  );
                })(),
                e.undoSnapshot &&
                  e.undoSnapshot.date === c.date &&
                  (Jy
                    ? i.default.createElement(
                        "div",
                        { className: "text-xs text-center mt-3", style: { color: "#9aa4bd" } },
                        "Se revertirá el XP, los puntos y los récords de esta rutina.",
                        " ",
                        i.default.createElement(
                          "button",
                          { onClick: hg, className: "underline", style: { color: "#ff5c7a" } },
                          "Sí, deshacer",
                        ),
                        " ",
                        i.default.createElement(
                          "button",
                          { onClick: () => cu(!1), className: "underline" },
                          "Cancelar",
                        ),
                      )
                    : i.default.createElement(
                        "button",
                        {
                          onClick: () => cu(!0),
                          className: "w-full py-2 text-xs mt-3",
                          style: {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.28)",
                            color: "#e8ecf7",
                            fontWeight: 600,
                          },
                        },
                        "Deshacer registro de hoy",
                      )),
              )
            : i.default.createElement(
                ge,
                {
                  id: "rutina",
                  title: "Rutina de hoy",
                  accent: z,
                  style: { marginBottom: 16, order: -4 },
                  collapsed: me("rutina"),
                  onToggle: fe,
                  right: `${(ra.find((f) => f.id === B) || ra[0]).name}`,
                },
                i.default.createElement(
                  "div",
                  { className: "flex mb-3", style: { border: "1px solid rgba(255,255,255,0.12)" } },
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => On("normal"),
                      className: "flex-1 py-2 text-xs",
                      style: {
                        background: De === "normal" ? z : "transparent",
                        color: De === "normal" ? "#0a0e1a" : "#8a93ad",
                        fontWeight: 600,
                        minHeight: 44,
                      },
                    },
                    "Normal",
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => On("recovery"),
                      className: "flex-1 py-2 text-xs",
                      style: {
                        background: De === "recovery" ? z : "transparent",
                        color: De === "recovery" ? "#0a0e1a" : "#8a93ad",
                        fontWeight: 600,
                        minHeight: 44,
                      },
                    },
                    "Recuperación",
                  ),
                ),
                qn(s).length > 1
                  ? i.default.createElement(
                      "div",
                      { className: "mb-2" },
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                        "¿Con qué entrenás hoy?",
                      ),
                      i.default.createElement(
                        "div",
                        { className: "grid grid-cols-3 gap-1" },
                        qn(s).map((f) => {
                          let d = ra.find((N) => N.id === f),
                            m = B === f;
                          return i.default.createElement(
                            "button",
                            {
                              key: f,
                              onClick: () => gg(f),
                              className: "py-2 text-xs",
                              style: {
                                background: m ? "#4f9dff" : "rgba(255,255,255,0.03)",
                                border: "1px solid " + (m ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                                color: m ? "#0a0e1a" : "#8a93ad",
                                fontWeight: 600,
                              },
                            },
                            d.id === "bodyweight"
                              ? "Peso corporal"
                              : d.id === "gym"
                                ? "Gimnasio"
                                : "Flow",
                          );
                        }),
                      ),
                    )
                  : i.default.createElement(
                      "div",
                      { className: "text-xs mb-1", style: { color: "#4f9dff" } },
                      "Modalidad de hoy: ",
                      (ra.find((f) => f.id === B) || ra[0]).name,
                    ),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#7a83a0" } },
                  sdcDescRango(u.rank, s),
                ),
                (() => {
                  let mm = sdcModDia(B, c.date);
                  if (!mm) return null;
                  return i.default.createElement(
                    "div",
                    {
                      className: "p-2 mb-2",
                      style: {
                        background: sdcModOk ? "rgba(62,207,142,0.12)" : "rgba(124,92,255,0.10)",
                        border: "1px solid " + (sdcModOk ? "#3ecf8e" : "#7c5cff"),
                      },
                    },
                    i.default.createElement(
                      "div",
                      {
                        className: "text-xs",
                        style: {
                          color: sdcModOk ? "#3ecf8e" : "#b9a5ff",
                          fontFamily: "Chakra Petch, sans-serif",
                          fontWeight: 700,
                          letterSpacing: 1,
                        },
                      },
                      "HOY · ",
                      mm.n,
                      " · +",
                      Math.round(mm.x * 100),
                      "% XP",
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                      mm.d,
                    ),
                    i.default.createElement(
                      "button",
                      {
                        onClick: () => {
                          let nv = !sdcModOk;
                          (sdcSetModOk(nv), sdcMarcaOk(sdcSer, sdcAjuste, nv));
                        },
                        className: "w-full py-2 text-xs mt-2",
                        style: {
                          background: sdcModOk ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                          border: "1px solid " + (sdcModOk ? "#3ecf8e" : "rgba(255,255,255,0.2)"),
                          color: sdcModOk ? "#0a0e1a" : "#8a93ad",
                          fontWeight: 600,
                          minHeight: 44,
                        },
                      },
                      sdcModOk ? "✓ Lo cumplí" : "Marcar que lo cumplí",
                    ),
                  );
                })(),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                  "Tocá cada serie cuando la termines. Solo cuenta lo que marcás, y el descanso empieza automáticamente.",
                ),
                i.default.createElement(
                  "div",
                  { className: "grid grid-cols-2 gap-2 mb-3" },
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => eg((f) => !f),
                      className: "py-2 text-xs",
                      style: {
                        background: Ln ? "rgba(79,157,255,0.15)" : "rgba(255,255,255,0.03)",
                        border: "1px solid " + (Ln ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                        color: Ln ? "#4f9dff" : "#8a93ad",
                        minHeight: 44,
                      },
                    },
                    "Metrónomo ",
                    Ln ? "ON" : "OFF",
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: sdcMarcarTodo,
                      className: "py-2 text-xs",
                      style: {
                        background: "rgba(255,184,79,0.1)",
                        border: "1px solid #ffb84f",
                        color: "#ffb84f",
                        minHeight: 44,
                      },
                    },
                    "MARCAR TODAS",
                  ),
                ),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#7a83a0" } },
                  "El metrónomo marca el tempo de cada repetición con un pitido, para que no aceleres. No cuenta reps: eso lo marcás vos al tocar cada serie.",
                ),
                i.default.createElement(D5, {
                  active: Ln,
                  tempo: sdcTempoMod(sdcModDia(B, c.date)),
                }),
                Jd &&
                  i.default.createElement(T5, {
                    seconds: sdcDesc || ag[s.focusProfile] || 60,
                    ini: sdcDescIni,
                    onSkip: () => Fd(!1),
                  }),
                i.default.createElement(Is, {
                  label: kl(u.rank, s.classification, "squat", B),
                  value: Aa.squat,
                  base: J.squat,
                  min: 0,
                  max: Math.round(De === "recovery" ? J.squat * 0.5 : J.squat * 1.5),
                  onChange: (f) => Va((d) => ({ ...d, squat: f })),
                  tip: $s(u.rank, "squat", B) || Js.squat,
                  guia: sdcGuia(u.rank, "squat", B),
                  abrir: !sdcVistos(e)[sdcEjNom("squat")],
                  weight: void 0,
                  onWeight: B === "gym" ? (k, f) => sdcKgSet("squat", k, f) : void 0,
                  kgv: B === "gym" ? (k) => sdcKgVer("squat", k) : void 0,
                  kgPrev: B === "gym" ? (sdcGymUlt(e)[sdcEjNom("squat")] || {}).kgs || null : null,
                  sug:
                    B === "gym"
                      ? {
                          s: sdcSugKg(e, "squat", sdcEjNom("squat")),
                          fn: (k) => sdcKgUsar("squat", k),
                        }
                      : null,
                  done: sdcSer.squat,
                  onSet: (f) => sdcSerie("squat", f),
                  accent: z,
                  aj: sdcAjuste.squat,
                  onAj: (k, v) => sdcAjustar("squat", k, v),
                }),
                i.default.createElement(Is, {
                  label: kl(u.rank, s.classification, "pushup", B),
                  value: Aa.pushup,
                  base: J.pushup,
                  min: 0,
                  max: Math.round(De === "recovery" ? J.pushup * 0.5 : J.pushup * 1.5),
                  onChange: (f) => Va((d) => ({ ...d, pushup: f })),
                  tip: $s(u.rank, "pushup", B) || Js.pushup,
                  guia: sdcGuia(u.rank, "pushup", B),
                  abrir: !sdcVistos(e)[sdcEjNom("pushup")],
                  weight: void 0,
                  onWeight: B === "gym" ? (k, f) => sdcKgSet("pushup", k, f) : void 0,
                  kgv: B === "gym" ? (k) => sdcKgVer("pushup", k) : void 0,
                  kgPrev: B === "gym" ? (sdcGymUlt(e)[sdcEjNom("pushup")] || {}).kgs || null : null,
                  sug:
                    B === "gym"
                      ? {
                          s: sdcSugKg(e, "pushup", sdcEjNom("pushup")),
                          fn: (k) => sdcKgUsar("pushup", k),
                        }
                      : null,
                  done: sdcSer.pushup,
                  onSet: (f) => sdcSerie("pushup", f),
                  accent: z,
                  aj: sdcAjuste.pushup,
                  onAj: (k, v) => sdcAjustar("pushup", k, v),
                }),
                i.default.createElement(Is, {
                  label: kl(u.rank, s.classification, "back", B),
                  value: Aa.back,
                  base: J.back,
                  min: 0,
                  max: Math.round(De === "recovery" ? J.back * 0.5 : J.back * 1.5),
                  onChange: (f) => Va((d) => ({ ...d, back: f })),
                  tip: $s(u.rank, "back", B) || Js.back,
                  guia: sdcGuia(u.rank, "back", B),
                  abrir: !sdcVistos(e)[sdcEjNom("back")],
                  weight: void 0,
                  onWeight: B === "gym" ? (k, f) => sdcKgSet("back", k, f) : void 0,
                  kgv: B === "gym" ? (k) => sdcKgVer("back", k) : void 0,
                  kgPrev: B === "gym" ? (sdcGymUlt(e)[sdcEjNom("back")] || {}).kgs || null : null,
                  sug:
                    B === "gym"
                      ? {
                          s: sdcSugKg(e, "back", sdcEjNom("back")),
                          fn: (k) => sdcKgUsar("back", k),
                        }
                      : null,
                  done: sdcSer.back,
                  onSet: (f) => sdcSerie("back", f),
                  accent: z,
                  aj: sdcAjuste.back,
                  onAj: (k, v) => sdcAjustar("back", k, v),
                }),
                i.default.createElement(Is, {
                  label: kl(u.rank, s.classification, "abs", B),
                  value: Aa.abs,
                  base: J.abs,
                  min: 0,
                  max: Math.round(De === "recovery" ? J.abs * 0.5 : J.abs * 1.5),
                  onChange: (f) => Va((d) => ({ ...d, abs: f })),
                  tip: $s(u.rank, "abs", B) || Js.abs,
                  guia: sdcGuia(u.rank, "abs", B),
                  abrir: !sdcVistos(e)[sdcEjNom("abs")],
                  weight: void 0,
                  onWeight: B === "gym" ? (k, f) => sdcKgSet("abs", k, f) : void 0,
                  kgv: B === "gym" ? (k) => sdcKgVer("abs", k) : void 0,
                  kgPrev: B === "gym" ? (sdcGymUlt(e)[sdcEjNom("abs")] || {}).kgs || null : null,
                  sug:
                    B === "gym"
                      ? { s: sdcSugKg(e, "abs", sdcEjNom("abs")), fn: (k) => sdcKgUsar("abs", k) }
                      : null,
                  done: sdcSer.abs,
                  onSet: (f) => sdcSerie("abs", f),
                  accent: z,
                  aj: sdcAjuste.abs,
                  onAj: (k, v) => sdcAjustar("abs", k, v),
                }),
                i.default.createElement(
                  "button",
                  {
                    onClick: pg,
                    className: "w-full py-3 text-sm mt-4",
                    style: { background: z, color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Completar rutina · ",
                  sdcTotalHechas(),
                  "/",
                  sdcTotalMeta(),
                  " reps",
                ),
                i.default.createElement("div", { style: { height: 22 } }),
                sdcConfDesc
                  ? i.default.createElement(
                      "div",
                      {
                        className: "p-2",
                        style: { border: "1px solid #ffb84f", background: "rgba(255,184,79,0.08)" },
                      },
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-2", style: { color: "#ffb84f" } },
                        "El día de descanso no da XP y solo tenés uno por semana. ¿Seguro?",
                      ),
                      i.default.createElement(
                        "div",
                        { className: "flex gap-2" },
                        i.default.createElement(
                          "button",
                          {
                            onClick: () => {
                              (sdcSetConfDesc(!1), bg());
                            },
                            className: "flex-1 py-2 text-xs",
                            style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                          },
                          "Sí, usarlo",
                        ),
                        i.default.createElement(
                          "button",
                          {
                            onClick: () => sdcSetConfDesc(!1),
                            className: "flex-1 py-2 text-xs",
                            style: {
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              color: "#e8ecf7",
                            },
                          },
                          "Cancelar",
                        ),
                      ),
                    )
                  : i.default.createElement(
                      "button",
                      {
                        onClick: () => sdcSetConfDesc(!0),
                        disabled: r.restDayUsed,
                        className: "w-full py-2 text-xs disabled:opacity-30",
                        style: {
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#9aa4bd",
                        },
                      },
                      r.restDayUsed
                        ? "Día de descanso ya usado esta semana"
                        : "Usar mi día de descanso",
                    ),
              ),
          i.default.createElement(
            ge,
            {
              id: "stretch",
              title: "Estiramiento",
              accent: "#3ecf8e",
              collapsed: me("stretch"),
              onToggle: fe,
              right: `${r.stretchCount}/2 esta semana`,
            },
            i.default.createElement(
              "div",
              { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
              "Es lo que más rápido cambia de todo lo que hacés acá: en pocas semanas llegás más lejos y lo notás en el cuerpo. Dos veces por semana te dan +10% de XP la semana siguiente.",
            ),
            (() => {
              let fx = sdcFlex(e);
              if (!fx.nivel) return null;
              return i.default.createElement(
                "div",
                {
                  className: "mb-3 p-2",
                  style: {
                    background: "rgba(62,207,142,0.08)",
                    border: "1px solid rgba(62,207,142,0.3)",
                  },
                },
                i.default.createElement(
                  "div",
                  {
                    className: "text-xs uppercase mb-1",
                    style: { letterSpacing: 2, color: "#3ecf8e" },
                  },
                  "TU ALCANCE",
                ),
                i.default.createElement(
                  "div",
                  { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                  sdcFlexTxt(fx.nivel),
                ),
                fx.primero && fx.primero < fx.nivel
                  ? i.default.createElement(
                      "div",
                      { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                      "Cuando empezaste llegabas ",
                      sdcFlexTxt(fx.primero).toLowerCase(),
                      ".",
                    )
                  : null,
              );
            })(),
            sdcFlexToca(e) && !ja && !c.stretchDone
              ? i.default.createElement(
                  "div",
                  {
                    className: "mb-3 p-2",
                    style: {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    },
                  },
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase mb-1",
                      style: { letterSpacing: 2, color: "#9aa4bd" },
                    },
                    "UNA VEZ POR SEMANA",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Sentado con las piernas estiradas, ¿hasta dónde llegás?",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                    "Sin rebotar, hasta donde llegues sin dolor.",
                  ),
                  sdcFlexNiv.map((fx) =>
                    i.default.createElement(
                      "button",
                      {
                        key: fx.n,
                        onClick: () => Ne((d) => sdcFlexSet(d, fx.n)),
                        className: "w-full text-left px-3 py-2 mb-1 text-sm",
                        style: {
                          background: "rgba(62,207,142,0.08)",
                          border: "1px solid rgba(62,207,142,0.4)",
                          color: "#e8ecf7",
                        },
                      },
                      fx.t,
                    ),
                  ),
                )
              : null,
            c.stretchDone
              ? i.default.createElement(
                  "div",
                  { className: "flex items-center gap-2 text-sm", style: { color: "#3ecf8e" } },
                  i.default.createElement(Mn, { size: 16 }),
                  " Estiramiento de hoy completado",
                )
              : ja
                ? (() => {
                    let ps = sdcEstPasos,
                      tt = sdcEstTotal(ps),
                      p = sdcEstPaso(ps, fa),
                      esp =
                        p.prep > 0 &&
                        sdcEstOk < p.index &&
                        sdcPasoEspera(ps, p.index, sdcPasosV(e));
                    return i.default.createElement(sdcPasoVista, {
                      ls: ps,
                      p: p,
                      cab: i.default.createElement(
                        "div",
                        { className: "text-xs text-center mb-1", style: { color: "#9aa4bd" } },
                        "Paso ",
                        p.index + 1,
                        " de ",
                        ps.length,
                      ),
                      col: "#3ecf8e",
                      esp: esp,
                      pz: !!sdcEstPz && !esp,
                      fin: "Último estiramiento",
                      resto: " · queda " + sdcEstMMSS(tt - fa),
                      onListo: () => {
                        let d0 =
                          sdcEstDesde(ps, p.index) +
                          Math.max(0, (ps[p.index].prep || sdcEstPrep) - 3);
                        (sdcBeep(660, 100),
                          sdcSetEstOk(p.index),
                          sdcSetEstPz(0),
                          sdcSetEstIni(Date.now() - d0 * 1e3),
                          Tl(d0));
                      },
                      onYa: () => {
                        let q = p.prep;
                        (sdcSetEstIni((v) => v - q * 1e3), Tl(fa + q));
                      },
                      onPausa: () => sdcSetEstPz(Date.now()),
                      onSeguir: () => {
                        let dd = Date.now() - sdcEstPz;
                        (sdcSetEstIni((v) => v + dd), sdcSetEstPz(0));
                      },
                      onTerminar: () => {
                        let hh = p.index;
                        (Ba(!1),
                          sdcSetEstPz(0),
                          Ne((N) => sdcPasosHook(c5(N, hh, ps.length), ps, hh)));
                      },
                    });
                  })()
                : i.default.createElement(
                    i.default.Fragment,
                    null,
                    [
                      { c: 1, lb: "Corta", su: "Lo que más se agradece justo después de entrenar" },
                      { c: 0, lb: "Completa", su: "Todo el cuerpo, de la cabeza a las caderas" },
                    ].map((op) => {
                      let ls = sdcEstLista(op.c),
                        tt = sdcEstTotal(ls);
                      return i.default.createElement(
                        "button",
                        {
                          key: op.lb,
                          onClick: () => {
                            (sdcSetEstPasos(ls),
                              sdcSetEstIdx(0),
                              sdcSetEstPz(0),
                              sdcSetEstOk(-1),
                              sdcSetEstIni(Date.now()),
                              Tl(0),
                              Ba(!0));
                          },
                          className: "w-full py-3 px-3 text-sm mb-2 text-left",
                          style: {
                            background: "rgba(62,207,142,0.12)",
                            border: "1px solid #3ecf8e",
                            color: "#3ecf8e",
                            fontWeight: 700,
                          },
                        },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center justify-between" },
                          i.default.createElement(
                            "span",
                            { style: { display: "inline-flex", alignItems: "center", gap: 8 } },
                            i.default.createElement(e2, { size: 16 }),
                            op.lb,
                          ),
                          i.default.createElement(
                            "span",
                            { className: "text-xs" },
                            sdcEstMMSS(tt),
                            " · ",
                            ls.length,
                            " pasos",
                          ),
                        ),
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs mt-1",
                            style: { color: "#9aa4bd", fontWeight: 400 },
                          },
                          op.su,
                        ),
                      );
                    }),
                    i.default.createElement(
                      "div",
                      { className: "text-xs", style: { color: "#7a83a0" } },
                      "Antes de cada posición tenés unos segundos para acomodarte, con el nombre de la que viene ya en pantalla. La primera vez que te toca una, el reloj espera a que toques Listo. Un sonido grave avisa que te prepares y uno agudo que empieces, y la pantalla no se apaga.",
                    ),
                  ),
          ),
        ),
      Da === "combat" &&
        (() => {
          let f = za(A.villainIndex),
            d = ti(f);
          return i.default.createElement(
            i.default.Fragment,
            null,
            i.default.createElement(
              Q,
              { accent: f.isBoss ? "#ffb84f" : "#ff5c7a", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center justify-between mb-2" },
                i.default.createElement(
                  "div",
                  null,
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase",
                      style: { letterSpacing: 2, color: f.isBoss ? "#ffb84f" : "#ff5c7a" },
                    },
                    f.isBoss ? "JEFE · DOS PATRONES ENCADENADOS" : `Terreno #${f.index + 1}`,
                  ),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 22,
                        color: "#e8ecf7",
                        fontWeight: 700,
                      },
                    },
                    f.name,
                  ),
                ),
                i.default.createElement(a2, { size: 28, color: f.isBoss ? "#ffb84f" : "#ff5c7a" }),
              ),
              A.villainCurrentHP !== null &&
                i.default.createElement(
                  i.default.Fragment,
                  null,
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                    "Terreno que falta",
                  ),
                  i.default.createElement(qa, {
                    value: A.villainCurrentHP,
                    max: d,
                    color: f.isBoss ? "#ffb84f" : "#ff5c7a",
                  }),
                ),
              i.default.createElement(
                "div",
                { className: "flex items-center gap-1 mt-3" },
                [1, 2, 3].map((m) =>
                  i.default.createElement(Rb, {
                    key: m,
                    size: 16,
                    color: m <= A.lives ? "#ff5c7a" : "#2a3148",
                    fill: m <= A.lives ? "#ff5c7a" : "none",
                  }),
                ),
                i.default.createElement(
                  "span",
                  { className: "text-xs ml-1", style: { color: "#9aa4bd" } },
                  A.villainsDefeated || 0,
                  " terrenos recuperados",
                ),
              ),
            ),
            A.phase === "choosing" &&
              i.default.createElement(
                Q,
                { accent: "#ff5c7a", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      color: "#e8ecf7",
                      fontWeight: 700,
                    },
                    className: "mb-2",
                  },
                  "Elegí tu ataque",
                ),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                  "No podés repetir la categoría que usaste en el terreno anterior.",
                ),
                ["upper_front", "upper_back", "lower"].map((m) => {
                  let N = m === A.lastExercise;
                  return i.default.createElement(
                    "button",
                    {
                      key: m,
                      onClick: () => !N && rg(m),
                      disabled: N,
                      className: "w-full py-3 text-sm mb-2 disabled:opacity-30",
                      style: {
                        background: N ? "rgba(255,255,255,0.03)" : "rgba(255,92,122,0.1)",
                        border: "1px solid " + (N ? "rgba(255,255,255,0.1)" : "#ff5c7a"),
                        color: N ? "#5a6178" : "#ff5c7a",
                      },
                    },
                    iy[m],
                  );
                }),
              ),
            A.phase === "decision" &&
              i.default.createElement(
                Q,
                { accent: "#ffb84f", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      color: "#ffb84f",
                      fontWeight: 700,
                    },
                    className: "mb-1",
                  },
                  "Decisión táctica",
                ),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                  "Perdiste un corazón. Te quedan ",
                  A.lives,
                  ". ¿Cómo seguís?",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => Ne((m) => y2(m)),
                    className: "w-full text-left px-3 py-2 mb-2",
                    style: { background: "rgba(255,92,122,0.08)", border: "1px solid #ff5c7a" },
                  },
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Reintentar",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Mismo ejercicio, misma exigencia. Si volvés a fallar, perdés otro corazón.",
                  ),
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => Ne((m) => g2(m)),
                    className: "w-full text-left px-3 py-2 mb-2",
                    style: { background: "rgba(255,184,79,0.08)", border: "1px solid #ffb84f" },
                  },
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Ajuste de carga",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "−20% de repeticiones en el mismo tiempo. Tus golpes harán un 30% menos de daño.",
                  ),
                ),
                !f.isBoss &&
                  i.default.createElement(
                    i.default.Fragment,
                    null,
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-3 mb-1", style: { color: "#9aa4bd" } },
                      "Cambio táctico de patrón (perdés un 15% del terreno):",
                    ),
                    ["upper_front", "upper_back", "lower"].map((m) =>
                      m === A.lastExercise || m === A.exercise
                        ? null
                        : i.default.createElement(
                            "button",
                            {
                              key: m,
                              onClick: () => Ne((_) => v2(_, m)),
                              className: "w-full py-2 text-sm mb-2",
                              style: {
                                background: "rgba(124,92,255,0.1)",
                                border: "1px solid #7c5cff",
                                color: "#b9a5ff",
                              },
                            },
                            iy[m],
                          ),
                    ),
                  ),
              ),
            A.phase === "resting" &&
              !du &&
              !fu &&
              (() => {
                let sdcCr = f.isBoss
                    ? 0
                    : Math.max(
                        1,
                        Math.round(
                          hd(
                            u.rank,
                            s.classification,
                            A.exercise,
                            s.focusProfile,
                            B,
                            s.testResults,
                          ) * (A.loadFactor || 1),
                        ),
                      ),
                  sdcCs = f.isBoss ? p2() : m2(sdcCr);
                return i.default.createElement(
                  Q,
                  { accent: "#ff5c7a", style: { marginBottom: 16 } },
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        color: "#e8ecf7",
                        fontWeight: 700,
                      },
                      className: "mb-2",
                    },
                    "Cuando estés listo",
                  ),
                  f.isBoss
                    ? i.default.createElement(
                        "div",
                        { className: "text-sm", style: { color: "#e8ecf7" } },
                        i.default.createElement(
                          "div",
                          { style: { color: "#ffb84f", fontWeight: 700 } },
                          "Superserie enlazada · sin descanso",
                        ),
                        (A.bossCats || $o(A.lastExercise)).map((m, N) =>
                          i.default.createElement(
                            "div",
                            { key: m, className: "mt-1" },
                            "Fase ",
                            N + 1,
                            ": ",
                            uy(u.rank, s.classification, s.focusProfile, m, B, s.testResults),
                            " × ",
                            sy(u.rank, s.classification, m, B),
                          ),
                        ),
                      )
                    : i.default.createElement(
                        "div",
                        { className: "text-sm", style: { color: "#e8ecf7" } },
                        sdcCr,
                        " × ",
                        sy(u.rank, s.classification, A.exercise, B),
                        (A.loadFactor || 1) < 1 &&
                          i.default.createElement(
                            "div",
                            { className: "text-xs mt-1", style: { color: "#ffb84f" } },
                            "Carga recalibrada · daño reducido",
                          ),
                      ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-2 mb-3", style: { color: "#9aa4bd" } },
                    "Vas a tener ",
                    sdcCs,
                    " segundos para completarlo. El reloj arranca cuando toques Empezar, no antes.",
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => {
                        let sdcCd = f.isBoss ? 20 : 12;
                        (mu(sdcCd), ql(sdcCd), _l(!0));
                      },
                      className: "w-full py-3 text-sm",
                      style: { background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 },
                    },
                    "Empezar",
                  ),
                );
              })(),
            A.phase === "resting" &&
              du &&
              i.default.createElement(
                Q,
                { accent: "#ff5c7a", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  { className: "text-center" },
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Prepárate...",
                  ),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 40,
                        color: "#ff5c7a",
                      },
                    },
                    xt,
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => ql(0),
                      className: "text-xs underline mt-2",
                      style: { color: "#9aa4bd" },
                    },
                    "Comenzar ahora",
                  ),
                ),
              ),
            fu &&
              i.default.createElement(
                Q,
                { accent: "#ff5c7a", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  { className: "text-center mb-3" },
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7" } },
                    f.isBoss
                      ? i.default.createElement(
                          i.default.Fragment,
                          null,
                          i.default.createElement(
                            "div",
                            { style: { color: "#ffb84f", fontWeight: 700 } },
                            "Superserie enlazada · sin descanso",
                          ),
                          (A.bossCats || $o(A.lastExercise)).map((m, N) =>
                            i.default.createElement(
                              "div",
                              { key: m, className: "mt-1" },
                              "Fase ",
                              N + 1,
                              ": ",
                              uy(u.rank, s.classification, s.focusProfile, m, B, s.testResults),
                              " × ",
                              sy(u.rank, s.classification, m, B),
                            ),
                          ),
                        )
                      : i.default.createElement(
                          i.default.Fragment,
                          null,
                          Math.max(
                            1,
                            Math.round(
                              hd(
                                u.rank,
                                s.classification,
                                A.exercise,
                                s.focusProfile,
                                B,
                                s.testResults,
                              ) * (A.loadFactor || 1),
                            ),
                          ),
                          " × ",
                          sy(u.rank, s.classification, A.exercise, B),
                          (A.loadFactor || 1) < 1 &&
                            i.default.createElement(
                              "div",
                              { className: "text-xs mt-1", style: { color: "#ffb84f" } },
                              "Carga recalibrada · daño reducido",
                            ),
                        ),
                  ),
                ),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 36,
                      color: xt <= 5 ? "#ff5c7a" : "#e8ecf7",
                      textAlign: "center",
                    },
                  },
                  xt,
                  "s",
                ),
                i.default.createElement(qa, { value: xt, max: Fy, color: "#ff5c7a" }),
                (() => {
                  let fs = f.isBoss
                      ? (A.bossCats || $o(A.lastExercise)).map((m) =>
                          uy(u.rank, s.classification, s.focusProfile, m, B, s.testResults),
                        )
                      : [
                          Math.max(
                            1,
                            Math.round(
                              hd(
                                u.rank,
                                s.classification,
                                A.exercise,
                                s.focusProfile,
                                B,
                                s.testResults,
                              ) * (A.loadFactor || 1),
                            ),
                          ),
                        ],
                    listo = fs.every((rq, ix) => (sdcCombSer[ix] || 0) >= sdcNSets(rq));
                  return i.default.createElement(
                    i.default.Fragment,
                    null,
                    fs.map((rq, ix) =>
                      i.default.createElement(
                        "div",
                        { key: ix, className: "mt-3" },
                        f.isBoss &&
                          i.default.createElement(
                            "div",
                            { className: "text-xs mb-1", style: { color: "#ffb84f" } },
                            "Fase ",
                            ix + 1,
                          ),
                        sdcCombChips(ix, rq),
                      ),
                    ),
                    i.default.createElement(
                      "button",
                      {
                        onClick: sdcGolpe,
                        disabled: !listo,
                        className: "w-full py-3 text-sm mt-3 disabled:opacity-40",
                        style: { background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 },
                      },
                      listo ? "GOLPEAR" : "Marcá las series para golpear",
                    ),
                  );
                })(),
                i.default.createElement(
                  "button",
                  {
                    onClick: dg,
                    className: "w-full py-2 text-xs mt-2",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Cancelar (sin perder vida)",
                ),
              ),
            A.phase === "victory" &&
              i.default.createElement(
                Q,
                { accent: "#3ecf8e", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  { className: "text-center" },
                  i.default.createElement(Vs, {
                    size: 32,
                    color: "#3ecf8e",
                    style: { margin: "0 auto" },
                  }),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 20,
                        color: "#3ecf8e",
                        fontWeight: 700,
                      },
                      className: "mt-2",
                    },
                    "¡Victoria!",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-sm mt-1", style: { color: "#e8ecf7" } },
                    "Recuperaste ",
                    f.name,
                  ),
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: fg,
                    className: "w-full py-3 text-sm mt-4",
                    style: { background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Continuar al siguiente villano",
                ),
              ),
            A.phase === "defeat" &&
              i.default.createElement(
                Q,
                { accent: "#ff5c7a", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  { className: "text-center" },
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 20,
                        color: "#ff5c7a",
                        fontWeight: 700,
                      },
                    },
                    "Te quedaste sin vidas",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-sm mt-1", style: { color: "#9aa4bd" } },
                    f.name,
                    " sigue activa, pero no perdiste el daño que ya le hiciste. Recuperá el aliento e intentalo de nuevo.",
                  ),
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: mg,
                    className: "w-full py-3 text-sm mt-4",
                    style: { background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Reintentar",
                ),
              ),
          );
        })(),
      Da === "primal" &&
        (() => {
          let f = g.unlockedCount - 1;
          return i.default.createElement(
            i.default.Fragment,
            null,
            i.default.createElement(
              "div",
              {
                className:
                  "grid gap-1 mb-4 grid-cols-" +
                  (1 +
                    (ye(e, "skills") ? 1 : 0) +
                    (ye(e, "care") ? 1 : 0) +
                    (ye(e, "neuro") ? 1 : 0)),
              },
              i.default.createElement(
                "button",
                {
                  onClick: () => ii("movs"),
                  className: "py-2 text-xs",
                  style: {
                    background: He === "movs" ? "#3ecf8e" : "rgba(255,255,255,0.03)",
                    border: "1px solid " + (He === "movs" ? "#3ecf8e" : "rgba(255,255,255,0.12)"),
                    color: He === "movs" ? "#0a0e1a" : "#8a93ad",
                    fontWeight: 600,
                  },
                },
                "Movimientos",
              ),
              ye(e, "skills") &&
                i.default.createElement(
                  "button",
                  {
                    onClick: () => ii("skills"),
                    className: "py-2 text-xs",
                    style: {
                      background: He === "skills" ? "#b084f5" : "rgba(255,255,255,0.03)",
                      border:
                        "1px solid " + (He === "skills" ? "#b084f5" : "rgba(255,255,255,0.12)"),
                      color: He === "skills" ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    },
                  },
                  "Skills",
                ),
              ye(e, "care") &&
                i.default.createElement(
                  "button",
                  {
                    onClick: () => ii("care"),
                    className: "py-2 text-xs",
                    style: {
                      background: He === "care" ? "#4f9dff" : "rgba(255,255,255,0.03)",
                      border: "1px solid " + (He === "care" ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                      color: He === "care" ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    },
                  },
                  "Articul.",
                ),
              ye(e, "neuro") &&
                i.default.createElement(
                  "button",
                  {
                    onClick: () => ii("neuro"),
                    className: "py-2 text-xs",
                    style: {
                      background: He === "neuro" ? "#ff6b4a" : "rgba(255,255,255,0.03)",
                      border:
                        "1px solid " + (He === "neuro" ? "#ff6b4a" : "rgba(255,255,255,0.12)"),
                      color: He === "neuro" ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    },
                  },
                  "Neuro",
                ),
            ),
            He === "neuro" &&
              ye(e, "neuro") &&
              (() => {
                let d = e.neuro || {
                    bestSpeedLevel: 0,
                    bestSequence: 0,
                    bestDualSec: 0,
                    bestBpm: 0,
                    sessions: 0,
                  },
                  m = [
                    {
                      id: "reaction",
                      name: "Reacción",
                      accent: "#4f9dff",
                      best: d.bestSpeedLevel
                        ? (kd.find((N) => N.level === d.bestSpeedLevel) || {}).name
                        : "—",
                      desc: "Señales impredecibles sin tocar la pantalla. Solo atención y cuerpo.",
                    },
                    {
                      id: "sequence",
                      name: "Secuencia motriz",
                      accent: "#b084f5",
                      best: d.bestSequence ? d.bestSequence + " movs" : "—",
                      desc: "Memorizá una cadena, ejecutala de memoria y comprobá.",
                    },
                    {
                      id: "dual",
                      name: "Doble tarea",
                      accent: "#3ecf8e",
                      best: d.bestDualSec
                        ? Math.floor(d.bestDualSec / 60) +
                          ":" +
                          String(d.bestDualSec % 60).padStart(2, "0")
                        : "—",
                      desc: "Isométrico sostenido mientras resuelves una tarea mental.",
                    },
                    {
                      id: "coord",
                      name: "Coordinación cruzada",
                      accent: "#ffb84f",
                      best: d.bestBpm ? d.bestBpm + " bpm" : "—",
                      desc: "Patrones contralaterales al ritmo del metrónomo.",
                    },
                  ];
                return i.default.createElement(
                  i.default.Fragment,
                  null,
                  i.default.createElement(
                    Q,
                    { accent: "#ff6b4a", style: { marginBottom: 16 } },
                    i.default.createElement(
                      "div",
                      { className: "flex items-center justify-between mb-1" },
                      i.default.createElement(
                        "div",
                        null,
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs uppercase",
                            style: { letterSpacing: 2, color: "#ff6b4a" },
                          },
                          "Neuromotor",
                        ),
                        i.default.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "Chakra Petch, sans-serif",
                              fontSize: 20,
                              color: "#e8ecf7",
                              fontWeight: 700,
                            },
                          },
                          d.sessions || 0,
                          " sesiones",
                        ),
                      ),
                      i.default.createElement($b, { size: 24, color: "#ff6b4a" }),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "La pantalla da el estímulo, tu cuerpo responde. Reflejos, memoria de movimiento y coordinación. Alimenta tu atributo Control.",
                    ),
                    i.default.createElement(
                      "div",
                      {
                        className: "text-xs p-2",
                        style: {
                          color: "#9aa4bd",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        },
                      },
                      "Tus marcas sirven para compararte con vos mismo. Esto entrena atención y control motor, no tu inteligencia general.",
                    ),
                  ),
                  m.map((N) => {
                    let _ = Ky === N.id;
                    return i.default.createElement(
                      Q,
                      { key: N.id, accent: N.accent, style: { marginBottom: 12 } },
                      i.default.createElement(
                        "button",
                        {
                          onClick: () => Vy(_ ? null : N.id),
                          className: "w-full text-left",
                          style: { background: "transparent", border: "none", padding: 0 },
                        },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center justify-between" },
                          i.default.createElement(
                            "div",
                            { className: "flex items-center gap-2" },
                            i.default.createElement(
                              "span",
                              {
                                style: {
                                  display: "inline-block",
                                  transform: _ ? "rotate(90deg)" : "rotate(0deg)",
                                  transition: "transform .2s",
                                },
                              },
                              i.default.createElement(Za, { size: 14, color: "#9aa4bd" }),
                            ),
                            i.default.createElement(
                              "div",
                              null,
                              i.default.createElement(
                                "div",
                                {
                                  className: "text-sm",
                                  style: { color: "#e8ecf7", fontWeight: 600 },
                                },
                                N.name,
                              ),
                              i.default.createElement(
                                "div",
                                { className: "text-xs", style: { color: "#7a83a0" } },
                                N.desc,
                              ),
                            ),
                          ),
                          i.default.createElement(
                            "div",
                            {
                              className: "text-xs",
                              style: { color: N.accent, whiteSpace: "nowrap" },
                            },
                            N.best,
                          ),
                        ),
                      ),
                      _ &&
                        i.default.createElement(
                          "div",
                          { className: "mt-3" },
                          N.id === "reaction" &&
                            i.default.createElement(M5, {
                              onDone: (X) => Ne((de) => Ps(de, "reaction", X, !1)),
                            }),
                          N.id === "sequence" &&
                            i.default.createElement(_5, {
                              onDone: (X) => Ne((de) => Ps(de, "sequence", X, !1)),
                            }),
                          N.id === "dual" &&
                            i.default.createElement(q5, {
                              onDone: (X) => Ne((de) => Ps(de, "dual", X, X >= 45)),
                            }),
                          N.id === "coord" &&
                            i.default.createElement(O5, {
                              onDone: (X) => Ne((de) => Ps(de, "coord", X, !1)),
                            }),
                        ),
                    );
                  }),
                );
              })(),
            He === "care" &&
              ye(e, "care") &&
              (() => {
                let d = e.care && e.care.today.date === ue() ? e.care.today.done : [];
                return i.default.createElement(
                  i.default.Fragment,
                  null,
                  i.default.createElement(
                    Q,
                    { accent: "#4f9dff", style: { marginBottom: 16 } },
                    i.default.createElement(
                      "div",
                      { className: "flex items-center justify-between mb-1" },
                      i.default.createElement(
                        "div",
                        null,
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs uppercase",
                            style: { letterSpacing: 2, color: "#4f9dff" },
                          },
                          "Cuidado articular",
                        ),
                        i.default.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "Chakra Petch, sans-serif",
                              fontSize: 20,
                              color: "#e8ecf7",
                              fontWeight: 700,
                            },
                          },
                          (e.care && e.care.lifetime) || 0,
                          " protocolos hechos",
                        ),
                      ),
                      i.default.createElement(Rb, { size: 24, color: "#4f9dff" }),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                      "Trabajo preventivo y de mantenimiento para las articulaciones que más sufren entrenando. Da XP y no tiene penalización: úsalo los días que lo necesites.",
                    ),
                    i.default.createElement(
                      "div",
                      {
                        className: "text-xs p-2 mb-2",
                        style: {
                          color: "#ffb84f",
                          background: "rgba(255,184,79,0.08)",
                          border: "1px solid rgba(255,184,79,0.3)",
                        },
                      },
                      "Esto no sustituye a un diagnóstico. Si ya tienes una lesión, consúltalo con un fisioterapeuta o médico antes de seguir cualquier protocolo.",
                    ),
                    i.default.createElement(
                      "div",
                      {
                        className: "text-xs p-2",
                        style: {
                          color: "#9aa4bd",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        },
                      },
                      X2,
                    ),
                  ),
                  i.default.createElement(
                    ge,
                    {
                      id: "banderas",
                      title: "Cuándo parar y consultar",
                      accent: "#ff5c7a",
                      style: { marginBottom: 16 },
                      collapsed:
                        H && H.collapsed && H.collapsed.banderas !== void 0 ? me("banderas") : !0,
                      onToggle: fe,
                      right: "señales de alarma",
                    },
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "Si aparece cualquiera de estas, deja el protocolo y busca valoración profesional:",
                    ),
                    H2.map((m) =>
                      i.default.createElement(
                        "div",
                        { key: m, className: "flex items-start gap-2 py-1" },
                        i.default.createElement("span", { style: { color: "#ff5c7a" } }, "•"),
                        i.default.createElement(
                          "span",
                          { className: "text-xs", style: { color: "#e8ecf7" } },
                          m,
                        ),
                      ),
                    ),
                  ),
                  Dy.map((m) => {
                    let N = Gy === m.id,
                      _ = d.includes(m.id);
                    return i.default.createElement(
                      Q,
                      { key: m.id, accent: _ ? "#3ecf8e" : "#5a6178", style: { marginBottom: 12 } },
                      i.default.createElement(
                        "button",
                        {
                          onClick: () => Zy(N ? null : m.id),
                          className: "w-full text-left",
                          style: { background: "transparent", border: "none", padding: 0 },
                        },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center justify-between" },
                          i.default.createElement(
                            "div",
                            { className: "flex items-center gap-2" },
                            i.default.createElement(
                              "span",
                              {
                                style: {
                                  display: "inline-block",
                                  transform: N ? "rotate(90deg)" : "rotate(0deg)",
                                  transition: "transform .2s",
                                },
                              },
                              i.default.createElement(Za, { size: 14, color: "#9aa4bd" }),
                            ),
                            i.default.createElement(
                              "div",
                              null,
                              i.default.createElement(
                                "div",
                                {
                                  className: "text-sm",
                                  style: { color: "#e8ecf7", fontWeight: 600 },
                                },
                                m.zone,
                              ),
                              i.default.createElement(
                                "div",
                                { className: "text-xs", style: { color: "#7a83a0" } },
                                m.common,
                              ),
                            ),
                          ),
                          _ && i.default.createElement(Mn, { size: 16, color: "#3ecf8e" }),
                        ),
                      ),
                      N &&
                        i.default.createElement(
                          "div",
                          { className: "mt-3" },
                          i.default.createElement(
                            "div",
                            { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                            m.context,
                          ),
                          m.exercises.map((X, de) =>
                            i.default.createElement(
                              "div",
                              {
                                key: X.name,
                                className: "py-2",
                                style: { borderTop: "1px solid rgba(255,255,255,0.07)" },
                              },
                              i.default.createElement(
                                "div",
                                { className: "flex items-center justify-between" },
                                i.default.createElement(
                                  "div",
                                  {
                                    className: "text-sm",
                                    style: { color: "#e8ecf7", fontWeight: 600 },
                                  },
                                  de + 1,
                                  ". ",
                                  X.name,
                                ),
                                i.default.createElement(
                                  "div",
                                  {
                                    className: "text-xs",
                                    style: { color: "#4f9dff", whiteSpace: "nowrap" },
                                  },
                                  X.dose,
                                ),
                              ),
                              i.default.createElement(
                                "div",
                                { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                                X.how,
                              ),
                              i.default.createElement(
                                "div",
                                { className: "text-xs mt-1", style: { color: "#7a83a0" } },
                                "Para qué: ",
                                X.why,
                              ),
                            ),
                          ),
                          i.default.createElement(
                            "button",
                            {
                              onClick: () => Ne((X) => Y2(X, m.id)),
                              disabled: _,
                              className: "w-full py-3 text-sm mt-3 disabled:opacity-40",
                              style: {
                                background: _ ? "rgba(255,255,255,0.05)" : "#4f9dff",
                                color: _ ? "#9aa4bd" : "#0a0e1a",
                                fontWeight: 700,
                              },
                            },
                            _ ? "Registrado hoy" : "Registrar protocolo (+" + Ty + " XP)",
                          ),
                        ),
                    );
                  }),
                );
              })(),
            He === "skills" &&
              ye(e, "skills") &&
              i.default.createElement(
                i.default.Fragment,
                null,
                i.default.createElement(
                  Q,
                  { accent: "#b084f5", style: { marginBottom: 16 } },
                  i.default.createElement(
                    "div",
                    { className: "flex items-center justify-between mb-1" },
                    i.default.createElement(
                      "div",
                      null,
                      i.default.createElement(
                        "div",
                        {
                          className: "text-xs uppercase",
                          style: { letterSpacing: 2, color: "#b084f5" },
                        },
                        "Skills",
                      ),
                      i.default.createElement(
                        "div",
                        {
                          style: {
                            fontFamily: "Chakra Petch, sans-serif",
                            fontSize: 20,
                            color: "#e8ecf7",
                            fontWeight: 700,
                          },
                        },
                        Wo(e),
                        " / ",
                        El.length,
                        " aprendidas",
                      ),
                    ),
                    i.default.createElement(Nl, { size: 24, color: "#b084f5" }),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Movimientos raros que se aprenden sin reloj. Marcá cada paso cuando lo domines de verdad: no hay prisa ni penalización por tardar semanas.",
                  ),
                ),
                El.map((d) => {
                  let m = Td(e, d.id),
                    N = m.filter(Boolean).length,
                    _ = N >= d.steps.length,
                    X = Xy === d.id;
                  return i.default.createElement(
                    Q,
                    { key: d.id, accent: _ ? "#3ecf8e" : "#5a6178", style: { marginBottom: 12 } },
                    i.default.createElement(
                      "button",
                      {
                        onClick: () => Yy(X ? null : d.id),
                        className: "w-full text-left",
                        style: { background: "transparent", border: "none", padding: 0 },
                      },
                      i.default.createElement(
                        "div",
                        { className: "flex items-center justify-between" },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center gap-2" },
                          i.default.createElement(
                            "span",
                            {
                              style: {
                                display: "inline-block",
                                transform: X ? "rotate(90deg)" : "rotate(0deg)",
                                transition: "transform .2s",
                              },
                            },
                            i.default.createElement(Za, { size: 14, color: "#9aa4bd" }),
                          ),
                          i.default.createElement(
                            "div",
                            null,
                            i.default.createElement(
                              "div",
                              {
                                className: "text-sm",
                                style: { color: "#e8ecf7", fontWeight: 600 },
                              },
                              d.name,
                            ),
                            i.default.createElement(
                              "div",
                              { className: "text-xs", style: { color: "#7a83a0" } },
                              d.family,
                              " · ",
                              d.level,
                            ),
                          ),
                        ),
                        i.default.createElement(
                          "div",
                          { className: "text-xs", style: { color: _ ? "#3ecf8e" : "#8a93ad" } },
                          _ ? "Aprendida" : `${N}/${d.steps.length}`,
                        ),
                      ),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "mt-2" },
                      i.default.createElement(qa, {
                        value: N,
                        max: d.steps.length,
                        color: _ ? "#3ecf8e" : "#b084f5",
                      }),
                    ),
                    X &&
                      i.default.createElement(
                        "div",
                        { className: "mt-3" },
                        i.default.createElement(
                          "div",
                          { className: "text-xs mb-1", style: { color: "#e8ecf7" } },
                          d.what,
                        ),
                        i.default.createElement(
                          "div",
                          { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                          d.why,
                        ),
                        d.steps.map((de, te) => {
                          let Bl = !!m[te];
                          return i.default.createElement(
                            "div",
                            {
                              key: de.name,
                              className: "py-2",
                              style: { borderTop: "1px solid rgba(255,255,255,0.07)" },
                            },
                            i.default.createElement(
                              "button",
                              {
                                onClick: () => Ne((wl) => L2(wl, d.id, te)),
                                className: "w-full text-left flex items-start gap-2",
                                style: { background: "transparent", border: "none", padding: 0 },
                              },
                              i.default.createElement(
                                "span",
                                {
                                  style: {
                                    width: 16,
                                    height: 16,
                                    flexShrink: 0,
                                    marginTop: 2,
                                    border:
                                      "1px solid " + (Bl ? "#3ecf8e" : "rgba(255,255,255,0.3)"),
                                    background: Bl ? "#3ecf8e" : "transparent",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                },
                                Bl && i.default.createElement(Mn, { size: 12, color: "#0a0e1a" }),
                              ),
                              i.default.createElement(
                                "span",
                                null,
                                i.default.createElement(
                                  "span",
                                  {
                                    className: "text-sm",
                                    style: {
                                      color: Bl ? "#8a93ad" : "#e8ecf7",
                                      fontWeight: 600,
                                      textDecoration: Bl ? "line-through" : "none",
                                    },
                                  },
                                  te + 1,
                                  ". ",
                                  de.name,
                                ),
                                i.default.createElement(
                                  "span",
                                  {
                                    className: "text-xs",
                                    style: { color: "#9aa4bd", display: "block", marginTop: 2 },
                                  },
                                  de.how,
                                ),
                                i.default.createElement(
                                  "span",
                                  {
                                    className: "text-xs",
                                    style: { color: "#4f9dff", display: "block", marginTop: 2 },
                                  },
                                  "Clave: ",
                                  de.cue,
                                ),
                              ),
                            ),
                          );
                        }),
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs mt-3 p-2",
                            style: {
                              color: "#3ecf8e",
                              background: "rgba(62,207,142,0.07)",
                              border: "1px solid rgba(62,207,142,0.25)",
                            },
                          },
                          i.default.createElement("b", null, "Si te atascas:"),
                          " ",
                          d.regression,
                        ),
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs mt-2 p-2",
                            style: {
                              color: "#ff5c7a",
                              background: "rgba(255,92,122,0.07)",
                              border: "1px solid rgba(255,92,122,0.25)",
                            },
                          },
                          i.default.createElement("b", null, "Error común:"),
                          " ",
                          d.mistake,
                        ),
                      ),
                  );
                }),
              ),
            He === "movs" &&
              i.default.createElement(
                i.default.Fragment,
                null,
                i.default.createElement(
                  Q,
                  { accent: "#3ecf8e", style: { marginBottom: 16 } },
                  i.default.createElement(
                    "div",
                    { className: "flex items-center justify-between mb-2" },
                    i.default.createElement(
                      "div",
                      null,
                      i.default.createElement(
                        "div",
                        {
                          className: "text-xs uppercase",
                          style: { letterSpacing: 2, color: "#3ecf8e" },
                        },
                        "Instinto Primal",
                      ),
                      i.default.createElement(
                        "div",
                        {
                          style: {
                            fontFamily: "Chakra Petch, sans-serif",
                            fontSize: 22,
                            color: "#e8ecf7",
                            fontWeight: 700,
                          },
                        },
                        g.unlockedCount,
                        " / ",
                        Oa.length,
                        " movimientos",
                      ),
                    ),
                    i.default.createElement(Qs, { size: 26, color: "#3ecf8e" }),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Hoy: ",
                    Xn,
                    "/",
                    Yn,
                    " sesiones",
                  ),
                ),
                Qa !== "idle"
                  ? i.default.createElement(
                      Q,
                      { accent: "#3ecf8e", style: { marginBottom: 16 } },
                      i.default.createElement(
                        "div",
                        { className: "text-center mb-2" },
                        i.default.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "Chakra Petch, sans-serif",
                              color: "#e8ecf7",
                              fontWeight: 700,
                              fontSize: 18,
                            },
                          },
                          Oa[pu].name,
                        ),
                        i.default.createElement(
                          "div",
                          {
                            className: "mt-1",
                            style: { fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" },
                          },
                          Oa[pu].desc,
                        ),
                      ),
                      Qa === "listo"
                        ? i.default.createElement(
                            i.default.Fragment,
                            null,
                            i.default.createElement(
                              "div",
                              {
                                className: "text-center text-xs mb-3",
                                style: { color: "#9aa4bd" },
                              },
                              dd,
                              " rondas de ",
                              Ws(u.rank),
                              " segundos.",
                            ),
                            i.default.createElement(
                              "button",
                              {
                                onClick: sdcPrimalYa,
                                className: "w-full py-3 text-sm",
                                style: {
                                  minHeight: 48,
                                  background: "#3ecf8e",
                                  border: "1px solid #3ecf8e",
                                  color: "#0a0e1a",
                                  fontWeight: 700,
                                },
                              },
                              "Empezar",
                            ),
                          )
                        : i.default.createElement(
                            i.default.Fragment,
                            null,
                            i.default.createElement(
                              "div",
                              {
                                className: "text-center text-xs mb-1",
                                style:
                                  Qd === 0
                                    ? { color: "#ffb84f", fontWeight: 700, letterSpacing: 2 }
                                    : { color: "#9aa4bd" },
                              },
                              Qd === 0
                                ? "PONETE EN POSICIÓN"
                                : "Ronda " +
                                    Qd +
                                    "/" +
                                    dd +
                                    " · " +
                                    (Qa === "active" ? "En marcha" : "Descanso"),
                            ),
                            i.default.createElement(
                              "div",
                              {
                                style: {
                                  fontFamily: "Chakra Petch, sans-serif",
                                  fontSize: 48,
                                  textAlign: "center",
                                  color: Qa === "active" ? "#3ecf8e" : "#ffb84f",
                                },
                              },
                              jl,
                              "s",
                            ),
                            i.default.createElement(qa, {
                              value: jl,
                              max: Qa === "active" ? Ws(u.rank) : Qd === 0 ? 10 : cy,
                              color: Qa === "active" ? "#3ecf8e" : "#ffb84f",
                            }),
                          ),
                      i.default.createElement(
                        "button",
                        {
                          onClick: ig,
                          className: "w-full py-2 text-xs mt-4",
                          style: {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.28)",
                            color: "#e8ecf7",
                            fontWeight: 600,
                          },
                        },
                        "Cancelar",
                      ),
                    )
                  : i.default.createElement(
                      ge,
                      {
                        id: "primalLista",
                        title: "Elegí un movimiento",
                        accent: "#3ecf8e",
                        style: { marginBottom: 16 },
                        collapsed: me("primalLista"),
                        onToggle: fe,
                        right: `${g.unlockedCount}/${Oa.length}`,
                      },
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                        dd,
                        " rondas de ",
                        Ws(u.rank),
                        " segundos. Dominá el más nuevo ",
                        xd,
                        " veces para descubrir el siguiente.",
                      ),
                      Xn >= Yn &&
                        i.default.createElement(
                          "div",
                          { className: "text-xs mb-3", style: { color: "#ffb84f" } },
                          "Ya completaste tus ",
                          Yn,
                          " sesiones de hoy. Volvé mañana.",
                        ),
                      Oa.map((d, m) => {
                        let N = m < g.unlockedCount,
                          _ = m === f,
                          X = !N || Xn >= Yn;
                        return i.default.createElement(
                          "button",
                          {
                            key: d.name,
                            onClick: () => !X && og(m),
                            disabled: X,
                            className: "w-full text-left py-2 px-3 mb-2 disabled:opacity-40",
                            style: {
                              background: N ? "rgba(62,207,142,0.08)" : "rgba(255,255,255,0.03)",
                              border: "1px solid " + (N ? "#3ecf8e55" : "rgba(255,255,255,0.1)"),
                            },
                          },
                          i.default.createElement(
                            "div",
                            { className: "flex items-center gap-2" },
                            N
                              ? i.default.createElement(Qs, { size: 16, color: "#3ecf8e" })
                              : i.default.createElement(Ko, { size: 16, color: "#7a83a0" }),
                            i.default.createElement(
                              "div",
                              {
                                className: "text-sm",
                                style: {
                                  color: N ? "#e8ecf7" : "#5a6178",
                                  fontWeight: N ? 600 : 400,
                                },
                              },
                              d.name,
                            ),
                            _ &&
                              i.default.createElement(
                                "span",
                                { className: "text-xs ml-auto", style: { color: "#ffb84f" } },
                                g.masteryProgress,
                                "/",
                                xd,
                              ),
                          ),
                          N &&
                            i.default.createElement(
                              "div",
                              { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                              d.desc,
                            ),
                        );
                      }),
                    ),
              ),
          );
        })(),
      Da === "exploration" &&
        (() => {
          let f = s2(el),
            d = Po[f],
            m = i2(f),
            N = Math.max(0, Math.min(el - m, d.endKm - m)),
            _ = d.endKm - m,
            X = Math.round((N / _) * 100),
            de = pt.filter((te) => te.sector === f);
          return i.default.createElement(
            i.default.Fragment,
            null,
            i.default.createElement(
              Q,
              { accent: "#7c5cff", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center justify-between mb-2" },
                i.default.createElement(
                  "div",
                  null,
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase",
                      style: { letterSpacing: 2, color: "#7c5cff" },
                    },
                    "Sector ",
                    f + 1,
                  ),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 20,
                        color: "#e8ecf7",
                        fontWeight: 700,
                      },
                    },
                    d.name,
                  ),
                ),
                i.default.createElement(Ib, { size: 26, color: "#7c5cff" }),
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-1 flex justify-between", style: { color: "#9aa4bd" } },
                i.default.createElement("span", null, "Progreso del sector"),
                i.default.createElement("span", null, X, "% · ", N.toFixed(1), " / ", _, " km"),
              ),
              i.default.createElement(qa, { value: N, max: _, color: "#7c5cff" }),
              i.default.createElement(
                "div",
                { className: "text-xs mt-3", style: { color: "#9aa4bd" } },
                el.toFixed(1),
                " km totales · ",
                ng.name,
              ),
              di &&
                i.default.createElement(
                  "div",
                  { className: "text-xs mt-1", style: { color: "#7a83a0" } },
                  "Próximo nodo: ",
                  di.name,
                  " a ",
                  di.km,
                  " km (faltan ",
                  (di.km - el).toFixed(1),
                  ")",
                ),
            ),
            i.default.createElement(
              Q,
              { accent: "#7c5cff", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Chakra Petch, sans-serif",
                    color: "#e8ecf7",
                    fontWeight: 700,
                  },
                  className: "mb-2",
                },
                "Expedición en curso",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Registrá tramos a lo largo del día. Los kilómetros se consolidan al concluir la expedición.",
              ),
              (function () {
                var ws = (e.exploration && e.exploration.walkStart) || 0,
                  kmh = (e.profile && e.profile.ritmoKmH) || 5;
                if (ws)
                  return i.default.createElement(sdcCamCrono, {
                    inicio: ws,
                    kmh: kmh,
                    onCancel: sdcCamCancelar,
                    onListo: sdcCamListo,
                  });
                return i.default.createElement(
                  "div",
                  {
                    className: "mb-3 p-2",
                    style: {
                      background: "rgba(124,92,255,0.06)",
                      border: "1px solid rgba(124,92,255,0.25)",
                    },
                  },
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Salir a caminar",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                    "La app cuenta el tiempo y estima los kilómetros a tu ritmo. Al terminar los podés corregir.",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "grid grid-cols-2 gap-1 mb-2" },
                    sdcRitmos.map(function (jr) {
                      var sel = Math.abs(kmh - jr.v) < 0.01;
                      return i.default.createElement(
                        "button",
                        {
                          key: jr.t,
                          onClick: function () {
                            sdcCamRitmo(jr.v);
                          },
                          className: "py-2 text-xs",
                          style: {
                            minHeight: 44,
                            background: sel ? "rgba(124,92,255,0.2)" : "rgba(255,255,255,0.03)",
                            border: sel ? "1px solid #7c5cff" : "1px solid rgba(255,255,255,0.12)",
                            color: sel ? "#e8ecf7" : "#9aa4bd",
                          },
                        },
                        jr.t,
                      );
                    }),
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: sdcCamEmpezar,
                      className: "w-full py-2 text-xs",
                      style: {
                        minHeight: 44,
                        background: "#7c5cff",
                        color: "#0a0e1a",
                        fontWeight: 700,
                      },
                    },
                    "Empezar la salida",
                  ),
                );
              })(),
              i.default.createElement(
                "div",
                { className: "flex gap-2 mb-2" },
                i.default.createElement("input", {
                  type: "text",
                  inputMode: "decimal",
                  value: Xd,
                  onChange: (te) => Yd(te.target.value.replace(/[^0-9.,]/g, "")),
                  placeholder: "Km del tramo",
                  className: "px-3 py-2 text-sm",
                  style: {
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e8ecf7",
                  },
                }),
                i.default.createElement(
                  "button",
                  {
                    onClick: Ug,
                    className: "px-3 py-2 text-sm",
                    style: {
                      background: "rgba(124,92,255,0.15)",
                      border: "1px solid #7c5cff",
                      color: "#b9a5ff",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    },
                  },
                  "+ Tramo",
                ),
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2 mb-2" },
                i.default.createElement("input", {
                  type: "text",
                  inputMode: "numeric",
                  value: Ml,
                  onChange: (te) => Gd(te.target.value.replace(/[^0-9]/g, "")),
                  placeholder: "o pasos dados",
                  className: "px-3 py-2 text-sm",
                  style: {
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e8ecf7",
                  },
                }),
                i.default.createElement(
                  "button",
                  {
                    onClick: Lg,
                    className: "px-3 py-2 text-sm",
                    style: {
                      background: "rgba(124,92,255,0.15)",
                      border: "1px solid #7c5cff",
                      color: "#b9a5ff",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    },
                  },
                  "+ Pasos",
                ),
              ),
              Ml &&
                parseInt(Ml, 10) > 0 &&
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#7a83a0" } },
                  parseInt(Ml, 10).toLocaleString("es"),
                  " pasos ≈ ",
                  ((parseInt(Ml, 10) * vd) / 1e3).toFixed(2),
                  " km",
                ),
              i.default.createElement(
                "div",
                {
                  className: "text-center py-2 mb-2",
                  style: {
                    background: "rgba(124,92,255,0.06)",
                    border: "1px solid rgba(124,92,255,0.25)",
                  },
                },
                i.default.createElement(
                  "div",
                  { className: "text-xs", style: { color: "#9aa4bd" } },
                  "Tramos sin consolidar",
                ),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 28,
                      color: "#b9a5ff",
                    },
                  },
                  (x.pendingKm || 0).toFixed(1),
                  " km",
                ),
              ),
              i.default.createElement(
                "button",
                {
                  onClick: Xg,
                  disabled: !(x.pendingKm > 0),
                  className: "w-full py-3 text-sm disabled:opacity-40",
                  style: { background: "#7c5cff", color: "#0a0e1a", fontWeight: 700 },
                },
                "Concluir Expedición",
              ),
              x.pendingKm > 0 &&
                i.default.createElement(
                  "button",
                  {
                    onClick: Hg,
                    className: "w-full py-2 text-xs mt-2",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Descartar tramos",
                ),
              i.default.createElement(
                "div",
                { className: "text-xs mt-2 text-center", style: { color: "#7a83a0" } },
                "Hoy llevás ",
                (x.today.date === ue() ? x.today.km : 0).toFixed(1),
                " km consolidados",
              ),
            ),
            i.default.createElement(
              ge,
              {
                id: "mapaSector",
                title: "Mapa del sector",
                accent: "#5a6178",
                style: { marginBottom: 16 },
                collapsed: me("mapaSector"),
                onToggle: fe,
                right: uu ? "todo" : "sector",
              },
              i.default.createElement(
                "div",
                { className: "flex items-center justify-end mb-3" },
                i.default.createElement(
                  "div",
                  { className: "flex gap-1" },
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => Qy((te) => !te),
                      className: "px-2 py-1 text-xs",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#9aa4bd",
                      },
                    },
                    uu ? "Ver sector" : "Ver todo",
                  ),
                ),
              ),
              (uu ? pt : de).map((te) => {
                let wl = pt.indexOf(te) <= x.unlockedIndex,
                  Ig = Math.max(0, te.km - el);
                return i.default.createElement(
                  "div",
                  {
                    key: te.name,
                    className: "flex items-start gap-2 py-2",
                    style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                  },
                  wl
                    ? i.default.createElement(a2, { size: 16, color: "#7c5cff" })
                    : i.default.createElement(Ko, { size: 16, color: "#7a83a0" }),
                  i.default.createElement(
                    "div",
                    null,
                    i.default.createElement(
                      "div",
                      {
                        className: "text-sm",
                        style: { color: wl ? "#e8ecf7" : "#5a6178", fontWeight: wl ? 600 : 400 },
                      },
                      te.name,
                      " ",
                      i.default.createElement(
                        "span",
                        { className: "text-xs", style: { color: "#7a83a0" } },
                        "· ",
                        te.km,
                        " km",
                      ),
                    ),
                    wl
                      ? i.default.createElement(
                          "div",
                          { className: "text-xs", style: { color: "#9aa4bd" } },
                          te.text,
                        )
                      : i.default.createElement(
                          "div",
                          { className: "text-xs", style: { color: "#7a83a0" } },
                          "Bloqueado — faltan ",
                          Ig.toFixed(1),
                          " km",
                        ),
                  ),
                );
              }),
            ),
            i.default.createElement(
              ge,
              {
                id: "codice",
                title: "Códice",
                accent: "#ffb84f",
                style: { marginBottom: 16 },
                collapsed: H && H.collapsed && H.collapsed.codice !== void 0 ? me("codice") : !0,
                onToggle: fe,
                right: `${(x.relics || []).length} / ${pt.length} · +${Math.round((x.relics || []).length * Ny * 100)}% XP`,
              },
              (x.relics || []).length === 0
                ? i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#7a83a0" } },
                    "Aún no hallaste ninguna reliquia. Caminá y concluí expediciones para llenar el Códice.",
                  )
                : pt
                    .filter((te) => (x.relics || []).includes(te.relic))
                    .map((te) =>
                      i.default.createElement(
                        "div",
                        {
                          key: te.relic,
                          className: "py-2",
                          style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                        },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center gap-2" },
                          i.default.createElement(Nl, { size: 14, color: "#ffb84f" }),
                          i.default.createElement(
                            "div",
                            { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                            te.relic,
                          ),
                        ),
                        i.default.createElement(
                          "div",
                          { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                          te.lore,
                        ),
                        i.default.createElement(
                          "div",
                          { className: "text-xs mt-1", style: { color: "#7a83a0" } },
                          "Hallada en ",
                          te.name,
                          " · ",
                          te.km,
                          " km",
                        ),
                      ),
                    ),
            ),
          );
        })(),
      Da === "achievements" &&
        i.default.createElement(
          i.default.Fragment,
          null,
          i.default.createElement(
            Q,
            { accent: "#ffb84f", style: { marginBottom: 16 } },
            i.default.createElement(
              "div",
              { className: "flex items-center justify-between" },
              i.default.createElement(
                "div",
                null,
                i.default.createElement(
                  "div",
                  { className: "text-xs uppercase", style: { letterSpacing: 2, color: "#ffb84f" } },
                  "Logros",
                ),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 22,
                      color: "#e8ecf7",
                      fontWeight: 700,
                    },
                  },
                  S.length,
                  " / ",
                  Jo.length,
                ),
              ),
              i.default.createElement(Vs, { size: 26, color: "#ffb84f" }),
            ),
          ),
          py.map((f) => {
            let d = Jo.filter((N) => N.category === f);
            if (!d.length) return null;
            let m = d.filter((N) => S.includes(N.id)).length;
            return i.default.createElement(
              ge,
              {
                key: f,
                id: "ach-" + f,
                title: f,
                accent: "#5a6178",
                style: { marginBottom: 16 },
                collapsed:
                  H && H.collapsed && H.collapsed["ach-" + f] !== void 0
                    ? me("ach-" + f)
                    : !sdcCatAbierta(e, f),
                onToggle: fe,
                right: `${m}/${d.length}`,
              },
              Z2.map((N) => {
                let _ = d.filter((X) => X.tier === N);
                return _.length
                  ? i.default.createElement(
                      "div",
                      { key: N, className: "mb-2" },
                      i.default.createElement(
                        "div",
                        {
                          className: "text-xs mb-1",
                          style: { color: Cl[N], letterSpacing: 1, fontWeight: 700 },
                        },
                        sdcDific[N] || N,
                      ),
                      _.map((X) => {
                        let de = S.includes(X.id);
                        return i.default.createElement(
                          "div",
                          {
                            key: X.id,
                            className: "flex items-start gap-2 py-2",
                            style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                          },
                          de
                            ? i.default.createElement(Vs, { size: 16, color: "#ffb84f" })
                            : i.default.createElement(Ko, { size: 16, color: "#7a83a0" }),
                          i.default.createElement(
                            "div",
                            null,
                            i.default.createElement(
                              "div",
                              {
                                className: "text-sm",
                                style: {
                                  color: de ? "#e8ecf7" : "#5a6178",
                                  fontWeight: de ? 600 : 400,
                                },
                              },
                              X.name,
                            ),
                            i.default.createElement(
                              "div",
                              {
                                className: "text-xs",
                                style: { color: de ? "#8a93ad" : "#5a6178" },
                              },
                              X.desc,
                            ),
                          ),
                        );
                      }),
                    )
                  : null;
              }),
            );
          }),
        ),
      Da === "profile" &&
        (() => {
          let f = Math.max(
              1,
              Math.floor(
                (new Date(ue() + "T00:00:00") - new Date(s.createdDate + "T00:00:00")) / 864e5,
              ) + 1,
            ),
            d = jy(u.level, u.currentXP);
          return i.default.createElement(
            i.default.Fragment,
            null,
            i.default.createElement(
              Q,
              { accent: "#4f9dff", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2 mb-1" },
                i.default.createElement(ey, { size: 20, color: "#4f9dff" }),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 20,
                      color: "#e8ecf7",
                      fontWeight: 700,
                    },
                  },
                  s.name,
                ),
              ),
              i.default.createElement(
                "div",
                { className: "text-xs", style: { color: "#9aa4bd" } },
                "Entrenando desde el ",
                s.createdDate,
                " · Día ",
                f,
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                "Enfoque: ",
                Od(s.focusProfile).name,
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                "Clasificación: ",
                s.classification,
              ),
            ),
            i.default.createElement(
              ge,
              {
                id: "sistemas",
                title: "Sistemas del juego",
                accent: "#ffb84f",
                style: { marginBottom: 16 },
                collapsed:
                  H && H.collapsed && H.collapsed.sistemas !== void 0 ? me("sistemas") : !0,
                onToggle: fe,
                right: `${$e.filter((m) => ye(e, m.id)).length + 1}/${$e.length + 1}`,
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Los sistemas se abren solos a medida que subís de nivel. Podés abrirlos todos de golpe o apagar los que no uses.",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: Sg,
                  className: "w-full py-3 text-sm mb-3",
                  style: {
                    background: e.unlockAll ? "#ffb84f" : "rgba(255,184,79,0.1)",
                    border: "1px solid #ffb84f",
                    color: e.unlockAll ? "#0a0e1a" : "#ffb84f",
                    fontWeight: 700,
                  },
                },
                e.unlockAll ? "Desbloqueo total ACTIVO" : "Desbloquear todo ahora",
              ),
              i.default.createElement(
                "div",
                {
                  className: "flex items-center justify-between py-2",
                  style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
                },
                i.default.createElement(
                  "div",
                  null,
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Rutina del día",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#7a83a0" } },
                    "El núcleo. Siempre activo.",
                  ),
                ),
                i.default.createElement(
                  "span",
                  { className: "text-xs", style: { color: "#3ecf8e" } },
                  "Base",
                ),
              ),
              $e.map((m) => {
                let N = yt(e, m.id),
                  _ = (e.disabled || []).includes(m.id),
                  X = ye(e, m.id);
                return i.default.createElement(
                  "div",
                  {
                    key: m.id,
                    className: "flex items-center justify-between gap-2 py-2",
                    style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
                  },
                  i.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    i.default.createElement(
                      "div",
                      {
                        className: "text-sm",
                        style: { color: X ? "#e8ecf7" : "#5a6178", fontWeight: 600 },
                      },
                      m.name,
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs", style: { color: "#7a83a0" } },
                      N ? m.why : `Se abre en el nivel ${m.level}`,
                    ),
                  ),
                  N
                    ? i.default.createElement(
                        "button",
                        {
                          onClick: () => Ng(m.id),
                          className: "py-2 px-3 text-xs",
                          style: {
                            background: _ ? "rgba(255,255,255,0.05)" : "rgba(62,207,142,0.12)",
                            border: "1px solid " + (_ ? "rgba(255,255,255,0.2)" : "#3ecf8e"),
                            color: _ ? "#9aa4bd" : "#3ecf8e",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          },
                        },
                        _ ? "Apagado" : "Activo",
                      )
                    : i.default.createElement(Ko, { size: 16, color: "#7a83a0" }),
                );
              }),
            ),
            i.default.createElement(
              ge,
              {
                id: "metodos",
                title: "Métodos de entrenamiento",
                accent: "#4f9dff",
                style: { marginBottom: 16 },
                collapsed: H && H.collapsed && H.collapsed.metodos !== void 0 ? me("metodos") : !0,
                onToggle: fe,
                right: (ra.find((m) => m.id === B) || ra[0]).name,
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Activa o desactiva modalidades cuando quieras. Con varias activas elegís cuál usar cada día en la Rutina. Hoy: ",
                i.default.createElement(
                  "b",
                  { style: { color: "#4f9dff" } },
                  (ra.find((m) => m.id === B) || ra[0]).name,
                ),
                ".",
              ),
              ra.map((m) => {
                let N = qn(s).includes(m.id);
                return i.default.createElement(
                  "button",
                  {
                    key: m.id,
                    onClick: () => vg(m.id),
                    className: "w-full text-left px-3 py-2 mb-2",
                    style: {
                      background: N ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                      border: N ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
                    },
                  },
                  i.default.createElement(
                    "div",
                    { className: "flex items-center gap-2" },
                    i.default.createElement("span", {
                      style: {
                        width: 16,
                        height: 16,
                        display: "inline-block",
                        flexShrink: 0,
                        border: "1px solid " + (N ? "#4f9dff" : "rgba(255,255,255,0.3)"),
                        background: N ? "#4f9dff" : "transparent",
                      },
                    }),
                    i.default.createElement(
                      "span",
                      { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                      m.name,
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                    m.desc,
                  ),
                );
              }),
              i.default.createElement(
                "button",
                {
                  onClick: () => ef(ra.map((m) => m.id)),
                  className: "w-full py-2 text-xs",
                  style: {
                    background: "rgba(255,184,79,0.1)",
                    border: "1px solid #ffb84f",
                    color: "#ffb84f",
                    fontWeight: 600,
                  },
                },
                "SELECCIONAR TODOS (Atleta Híbrido)",
              ),
              qn(s).length > 1 &&
                i.default.createElement(
                  "div",
                  { className: "mt-3" },
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                    "Cómo se llaman tus rangos. Es solo el nombre: no cambia tu progreso ni tus repeticiones.",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "grid grid-cols-3 gap-1" },
                    qn(s).map(function (jm) {
                      var jN = sdcJuego(s) === jm,
                        jT =
                          ra.find(function (jR) {
                            return jR.id === jm;
                          }) || ra[0];
                      return i.default.createElement(
                        "button",
                        {
                          key: jm,
                          onClick: function () {
                            sdcPonerJuego(jm);
                          },
                          className: "py-2 text-xs",
                          style: {
                            minHeight: 44,
                            background: jN ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                            border: jN ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
                            color: jN ? "#e8ecf7" : "#9aa4bd",
                          },
                        },
                        i.default.createElement(
                          "div",
                          { style: { fontFamily: "Chakra Petch, sans-serif", fontWeight: 700 } },
                          (sdcTitulos[jm] || {})[u.rank] || "",
                        ),
                        i.default.createElement(
                          "div",
                          { style: { fontSize: 10, color: "#7a83a0" } },
                          jT.name,
                        ),
                      );
                    }),
                  ),
                ),
            ),
            i.default.createElement(
              ge,
              {
                id: "numeros",
                title: "Tus números",
                accent: "#b084f5",
                style: { marginBottom: 16 },
                collapsed: H && H.collapsed && H.collapsed.numeros !== void 0 ? me("numeros") : !0,
                onToggle: fe,
                right: (T.squat + T.pushup + T.back + T.abs).toLocaleString("es") + " reps",
              },
              (() => {
                let ct = sdcAnimoCuenta(e);
                if (!ct.no && !ct.ambas) return null;
                let fila = (t, v) =>
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between text-sm mb-1" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, t),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, v),
                  );
                return i.default.createElement(
                  "div",
                  {
                    style: {
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      paddingBottom: 12,
                      marginBottom: 12,
                    },
                  },
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase mb-2",
                      style: { letterSpacing: 2, color: "#7a83a0" },
                    },
                    "CÓMO LLEGÁS Y CÓMO TE VAS",
                  ),
                  fila("Días que no querías", ct.no),
                  fila("Entrenaste igual", ct.vino),
                  fila("Terminaste mejor de lo que llegaste", ct.mejor + " de " + ct.ambas),
                );
              })(),
              i.default.createElement(
                "div",
                {
                  className: "text-xs uppercase mb-2",
                  style: { letterSpacing: 2, color: "#7a83a0" },
                },
                "ATRIBUTOS",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "No se compran: suben solos con lo que entrenás.",
              ),
              Io.map((m) => {
                let N = tu(e, m),
                  _ = q2(N);
                return i.default.createElement(
                  "div",
                  { key: m.key, className: "mb-3" },
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between text-sm mb-1" },
                    i.default.createElement(
                      "span",
                      { style: { color: m.color, fontWeight: 600 } },
                      m.name,
                    ),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, "Nv. ", Ro(N)),
                  ),
                  i.default.createElement(qa, { value: _.cur, max: _.need, color: m.color }),
                );
              }),
              i.default.createElement(
                "div",
                {
                  style: {
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: 12,
                    marginTop: 4,
                  },
                },
                i.default.createElement(
                  "div",
                  {
                    className: "text-xs uppercase mb-2",
                    style: { letterSpacing: 2, color: "#7a83a0" },
                  },
                  "REPETICIONES DE POR VIDA",
                ),
                i.default.createElement(
                  "div",
                  { className: "grid grid-cols-2 gap-2 text-sm" },
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Sentadillas"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      T.squat.toLocaleString("es"),
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Flexiones"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      T.pushup.toLocaleString("es"),
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Espalda"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      T.back.toLocaleString("es"),
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Abdominales"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      T.abs.toLocaleString("es"),
                    ),
                  ),
                ),
              ),
              i.default.createElement(
                "div",
                {
                  style: {
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: 12,
                    marginTop: 12,
                  },
                },
                i.default.createElement(
                  "div",
                  {
                    className: "text-xs uppercase mb-2",
                    style: { letterSpacing: 2, color: "#7a83a0" },
                  },
                  "HAZAÑAS",
                ),
                i.default.createElement(
                  "div",
                  { className: "space-y-1 text-sm" },
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement(
                      "span",
                      { style: { color: "#9aa4bd" } },
                      "Travesías completadas",
                    ),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, b),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement(
                      "span",
                      { style: { color: "#9aa4bd" } },
                      "Terrenos recuperados",
                    ),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      A.villainsDefeated,
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement(
                      "span",
                      { style: { color: "#9aa4bd" } },
                      "Movimientos de Instinto Primal",
                    ),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      g.unlockedCount,
                      "/",
                      Oa.length,
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement(
                      "span",
                      { style: { color: "#9aa4bd" } },
                      "Distancia recorrida",
                    ),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      el.toFixed(1),
                      " km",
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Logros"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      S.length,
                      "/",
                      Jo.length,
                    ),
                  ),
                  (e.lifetimeVolumeKg || 0) > 0
                    ? i.default.createElement(
                        "div",
                        { className: "flex justify-between" },
                        i.default.createElement(
                          "span",
                          { style: { color: "#9aa4bd" } },
                          "Kilos movidos en el gimnasio",
                        ),
                        i.default.createElement(
                          "span",
                          { style: { color: "#e8ecf7" } },
                          (e.lifetimeVolumeKg || 0).toLocaleString("es"),
                          " kg",
                        ),
                      )
                    : null,
                ),
              ),
            ),
            i.default.createElement(
              ge,
              {
                id: "aptitud",
                title: "Prueba de aptitud",
                accent: "#ffb84f",
                style: { marginBottom: 16 },
                collapsed: H && H.collapsed && H.collapsed.aptitud !== void 0 ? me("aptitud") : !0,
                onToggle: fe,
                right: sdcCalibre(s) || s.classification,
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Clasificación actual: ",
                s.classification,
                ". Repetirla no cambia tu rango ni tu progreso, solo ajusta el volumen de tu rutina y tu calibre.",
              ),
              (() => {
                let pt = sdcPuntaje(s),
                  ff = sdcRitmoF(s),
                  ix = sdcBandaIx(pt, ff),
                  sg = ix < vy.length - 1 ? vy[ix + 1] : null;
                return i.default.createElement(
                  "div",
                  { className: "mb-3" },
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                    "Tu puntaje: ",
                    i.default.createElement(
                      "b",
                      { style: { color: "#ffb84f", fontSize: 14 } },
                      pt,
                      " pts",
                    ),
                    i.default.createElement(
                      "div",
                      { style: { color: "#7a83a0", marginTop: 2 } },
                      "sentadillas + 2×flexiones + 2×remo + abdominales",
                    ),
                    sdcCalibre(s)
                      ? i.default.createElement(
                          "div",
                          { style: { color: "#7a83a0", marginTop: 2 } },
                          "Enfoque: ",
                          sdcCalF(ix, s),
                        )
                      : null,
                  ),
                  vy.map((v, k) =>
                    i.default.createElement(
                      "div",
                      {
                        key: k,
                        className: "flex items-center justify-between gap-2 px-2 py-1 mb-1",
                        style: {
                          background: k === ix ? "rgba(255,184,79,0.12)" : "transparent",
                          border: "1px solid " + (k === ix ? "#ffb84f" : "rgba(255,255,255,0.06)"),
                        },
                      },
                      i.default.createElement(
                        "span",
                        {
                          className: "text-xs",
                          style: {
                            color: k === ix ? "#ffe2b0" : k < ix ? "#5a6178" : "#8a93ad",
                            fontWeight: k === ix ? 700 : 400,
                          },
                        },
                        k < ix ? "✓ " : k === ix ? "● " : "",
                        sdcCalT(k, s),
                      ),
                      i.default.createElement(
                        "span",
                        { className: "text-xs", style: { color: "#7a83a0", whiteSpace: "nowrap" } },
                        k === vy.length - 1
                          ? sdcBandaMin(k, ff) + "+"
                          : sdcBandaMin(k, ff) + "–" + (sdcBandaMin(k + 1, ff) - 1),
                      ),
                    ),
                  ),
                  sg
                    ? i.default.createElement(
                        "div",
                        { className: "text-xs mt-2", style: { color: "#3ecf8e" } },
                        "Te faltan ",
                        sdcBandaMin(ix + 1, ff) - pt,
                        " pts para ",
                        sdcCalT(ix + 1, s),
                        ".",
                      )
                    : i.default.createElement(
                        "div",
                        { className: "text-xs mt-2", style: { color: "#ffb84f" } },
                        "Estás en el calibre más alto.",
                      ),
                );
              })(),
              Py
                ? Un < ci.length
                  ? i.default.createElement(
                      i.default.Fragment,
                      null,
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                        "Punto de Partida (",
                        Un + 1,
                        "/",
                        ci.length,
                        ") · sigue la cadencia del metrónomo.",
                      ),
                      i.default.createElement(Ly, {
                        key: "re-" + ci[Un].key,
                        exercise: ci[Un],
                        onFinish: (m) => {
                          let N = ci[Un].key;
                          (N === "sq" && hu(String(m)),
                            N === "pu" && Su(String(m)),
                            N === "ab" && Cu(String(m)),
                            N === "bk" && sdcSetRbk(String(m)),
                            gu((_) => _ + 1));
                        },
                      }),
                      i.default.createElement(
                        "button",
                        {
                          onClick: () => yu(!1),
                          className: "w-full py-2 text-xs mt-2",
                          style: {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.28)",
                            color: "#e8ecf7",
                            fontWeight: 600,
                          },
                        },
                        "Cancelar",
                      ),
                    )
                  : i.default.createElement(
                      i.default.Fragment,
                      null,
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-1",
                          style: { color: "#9aa4bd" },
                        },
                        i.default.createElement("span", null, "Sentadillas"),
                        i.default.createElement("span", { style: { color: "#e8ecf7" } }, vu || 0),
                      ),
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-1",
                          style: { color: "#9aa4bd" },
                        },
                        i.default.createElement("span", null, "Flexiones (×2)"),
                        i.default.createElement("span", { style: { color: "#e8ecf7" } }, xu || 0),
                      ),
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-1",
                          style: { color: "#9aa4bd" },
                        },
                        i.default.createElement("span", null, "Remo invertido (×2)"),
                        i.default.createElement(
                          "span",
                          { style: { color: "#e8ecf7" } },
                          sdcRbk || 0,
                        ),
                      ),
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-2",
                          style: { color: "#9aa4bd" },
                        },
                        i.default.createElement("span", null, "Abdominales"),
                        i.default.createElement("span", { style: { color: "#e8ecf7" } }, Nu || 0),
                      ),
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-3",
                          style: { color: "#ffb84f", fontWeight: 700 },
                        },
                        i.default.createElement("span", null, "Puntaje"),
                        i.default.createElement(
                          "span",
                          null,
                          iu(
                            parseInt(vu || "0", 10),
                            parseInt(xu || "0", 10),
                            parseInt(Nu || "0", 10),
                            parseInt(sdcRbk || "0", 10),
                          ),
                          " pts",
                        ),
                      ),
                      i.default.createElement(
                        "div",
                        { className: "flex gap-2" },
                        i.default.createElement(
                          "button",
                          {
                            onClick: () => gu(0),
                            className: "flex-1 py-2 text-xs",
                            style: {
                              background: "rgba(255,255,255,0.08)",
                              border: "1px solid rgba(255,255,255,0.28)",
                              color: "#e8ecf7",
                              fontWeight: 600,
                            },
                          },
                          "Repetir",
                        ),
                        i.default.createElement(
                          "button",
                          {
                            onClick: sg,
                            className: "flex-1 py-2 text-xs",
                            style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                          },
                          "Guardar",
                        ),
                      ),
                    )
                : i.default.createElement(
                    "button",
                    {
                      onClick: () => {
                        (gu(0), hu(""), Su(""), Cu(""), yu(!0));
                      },
                      className: "w-full py-3 text-sm",
                      style: {
                        background: "rgba(255,184,79,0.1)",
                        border: "1px solid #ffb84f",
                        color: "#ffb84f",
                      },
                    },
                    "Repetir Punto de Partida",
                  ),
            ),
            i.default.createElement(
              ge,
              {
                id: "primeras",
                title: "Primeras veces",
                accent: "#b084f5",
                style: { marginBottom: 16 },
                collapsed:
                  H && H.collapsed && H.collapsed.primeras !== void 0 ? me("primeras") : !0,
                onToggle: fe,
                right: String(sdcPrimeras(e).length),
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "El día que hacés algo que antes no podías, queda acá. No se borra nunca.",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: sdcPrimeraManual,
                  className: "w-full py-2 text-xs mb-3",
                  style: {
                    minHeight: 44,
                    background: "rgba(176,132,245,0.12)",
                    border: "1px solid #b084f5",
                    color: "#e8ecf7",
                    fontWeight: 600,
                  },
                },
                "Hoy pude algo que antes no podía",
              ),
              sdcPrimeras(e).length === 0
                ? i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#7a83a0" } },
                    "Todavía no hay ninguna. Van a aparecer solas.",
                  )
                : sdcPrimeras(e).map(function (jp, ji) {
                    return i.default.createElement(
                      "div",
                      {
                        key: ji,
                        className: "py-2 px-2 mb-1",
                        style: {
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        },
                      },
                      i.default.createElement(
                        "div",
                        { className: "text-xs", style: { color: "#e8ecf7" } },
                        jp.texto,
                      ),
                      i.default.createElement(
                        "div",
                        { className: "text-xs", style: { color: "#7a83a0" } },
                        jp.fecha +
                          (jp.origen === "escrita" ? " · lo anotaste vos" : " · primera vez"),
                      ),
                    );
                  }),
            ),
            i.default.createElement(
              ge,
              {
                id: "respaldo",
                title: "Respaldo de tu progreso",
                accent: "#4f9dff",
                style: { marginBottom: 16 },
                collapsed:
                  H && H.collapsed && H.collapsed.respaldo !== void 0 ? me("respaldo") : !0,
                onToggle: fe,
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Tu progreso ya se guarda solo en este dispositivo. Usá esto para tener una copia de seguridad o pasar tu progreso a otro dispositivo.",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                "Exportar — copia este texto y guárdalo en un lugar seguro:",
              ),
              i.default.createElement("textarea", {
                readOnly: !0,
                value: JSON.stringify(e),
                onClick: (m) => m.target.select(),
                rows: 3,
                className: "w-full mb-2 px-2 py-2 text-xs",
                style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#9aa4bd",
                  resize: "none",
                },
              }),
              i.default.createElement(
                "button",
                {
                  onClick: ug,
                  className: "w-full py-2 text-xs mb-2",
                  style: {
                    background: "rgba(79,157,255,0.1)",
                    border: "1px solid #4f9dff",
                    color: "#4f9dff",
                  },
                },
                "Copiar respaldo",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: bkDescargar,
                  className: "w-full py-2 text-xs mb-4",
                  style: { background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 },
                },
                "Descargar archivo",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                "Restaurar desde un respaldo:",
              ),
              i.default.createElement("textarea", {
                value: ku,
                onChange: (m) => Wd(m.target.value),
                placeholder: "Pega aquí tu texto de respaldo",
                rows: 3,
                className: "w-full mb-2 px-2 py-2 text-xs",
                style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e8ecf7",
                  resize: "none",
                },
              }),
              i.default.createElement(
                "div",
                { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                "o carga el archivo que descargaste:",
              ),
              i.default.createElement("input", {
                type: "file",
                accept: "application/json,.json",
                onChange: bkCargar,
                className: "w-full mb-2 text-xs",
                style: { color: "#9aa4bd" },
              }),
              Ry
                ? i.default.createElement(
                    "div",
                    { className: "text-xs text-center", style: { color: "#9aa4bd" } },
                    "¿Seguro? Esto reemplaza tu progreso actual.",
                    " ",
                    i.default.createElement(
                      "button",
                      { onClick: cg, className: "underline", style: { color: "#ff5c7a" } },
                      "Sí, restaurar",
                    ),
                    " ",
                    i.default.createElement(
                      "button",
                      { onClick: () => zu(!1), className: "underline" },
                      "Cancelar",
                    ),
                  )
                : i.default.createElement(
                    "button",
                    {
                      onClick: () => zu(!0),
                      disabled: !ku.trim(),
                      className: "w-full py-2 text-xs disabled:opacity-40",
                      style: {
                        background: "rgba(255,92,122,0.1)",
                        border: "1px solid #ff5c7a",
                        color: "#ff5c7a",
                      },
                    },
                    "Restaurar",
                  ),
            ),
          );
        })(),
      Da === "profile" &&
        i.default.createElement(
          "div",
          { className: "text-center mt-8" },
          i.default.createElement(
            "button",
            {
              onClick: () => {
                if (Se) {
                  (gt(!1), (sdcDevN = 0));
                  return;
                }
                ((sdcDevN += 1), sdcDevN >= 5 && ((sdcDevN = 0), gt(!0)));
              },
              className: "text-xs",
              style: { color: Se ? "#9aa4bd" : "#333a4d" },
            },
            Se ? "Ocultar panel de pruebas" : "v1.0",
          ),
          i.default.createElement(
            "a",
            {
              href: "./privacidad.html",
              target: "_blank",
              rel: "noopener",
              className: "text-xs underline",
              style: { color: "#7a83a0", marginLeft: 14 },
            },
            "Privacidad",
          ),
        ),
      Se &&
        Da === "profile" &&
        i.default.createElement(
          Q,
          { accent: "#5a6178", style: { marginTop: 12, borderStyle: "dashed" } },
          i.default.createElement(
            "div",
            { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
            "Solo para probar. Estos botones cambian tu progreso al instante, sin esperar a mañana.",
          ),
          i.default.createElement(
            "div",
            {
              className: "mb-3 p-2",
              style: { border: "1px solid #3ecf8e55", background: "rgba(62,207,142,0.06)" },
            },
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#3ecf8e" } },
              "Guardá tu progreso real antes de probar cosas, y volvé a él cuando termines.",
            ),
            i.default.createElement(
              "button",
              {
                onClick: Mg,
                className: "w-full py-2 text-xs mb-2",
                style: {
                  background: "rgba(62,207,142,0.12)",
                  border: "1px solid #3ecf8e",
                  color: "#3ecf8e",
                  fontWeight: 600,
                },
              },
              "Guardar punto de retorno",
            ),
            i.default.createElement(
              "button",
              {
                onClick: _g,
                disabled: !oi,
                className: "w-full py-2 text-xs disabled:opacity-40",
                style: {
                  background: "#3ecf8e",
                  border: "1px solid #3ecf8e",
                  color: "#0a0e1a",
                  fontWeight: 700,
                },
              },
              "Volver a mi progreso",
            ),
            !oi &&
              i.default.createElement(
                "div",
                { className: "text-xs mt-2", style: { color: "#9aa4bd" } },
                "Aún no guardaste ningún punto de retorno.",
              ),
          ),
          i.default.createElement(
            "div",
            { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
            "Saltar a un rango (para ver sus ejercicios y reps):",
          ),
          i.default.createElement(
            "div",
            { className: "grid grid-cols-3 gap-2 mb-3" },
            ve.map((f) =>
              i.default.createElement(
                "button",
                {
                  key: f,
                  onClick: () => qg(f),
                  className: "py-2 text-xs",
                  style: {
                    background: u.rank === f ? Cl[f] + "22" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${Cl[f]}88`,
                    color: Cl[f],
                    fontWeight: 700,
                  },
                },
                f,
              ),
            ),
          ),
          i.default.createElement(
            "button",
            {
              onClick: Og,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,184,79,0.1)",
                border: "1px solid #ffb84f",
                color: "#ffb84f",
              },
            },
            "Forzar Umbral disponible ahora",
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => jg(200),
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
            },
            "Añadir 200 XP",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Bg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,92,122,0.1)",
                border: "1px solid #ff5c7a",
                color: "#ff5c7a",
              },
            },
            "Simular que fallé el día de ayer",
          ),
          i.default.createElement(
            "button",
            {
              onClick: wg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
            },
            "Reiniciar el día de hoy (repetir rutina)",
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => Yg(5),
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(124,92,255,0.1)",
                border: "1px solid #7c5cff",
                color: "#7c5cff",
              },
            },
            "Exploración: añadir 5 km de golpe",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Gg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,92,122,0.1)",
                border: "1px solid #ff5c7a",
                color: "#ff5c7a",
              },
            },
            "Forzar travesía de hoy",
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => Zg(10),
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(62,207,142,0.1)",
                border: "1px solid #3ecf8e",
                color: "#3ecf8e",
              },
            },
            "Forzar racha a 10 días",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Kg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,184,79,0.1)",
                border: "1px solid #ffb84f",
                color: "#ffb84f",
              },
            },
            "Desbloquear todos los logros",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Vg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,92,122,0.1)",
                border: "1px solid #ff5c7a",
                color: "#ff5c7a",
              },
            },
            "Combate: saltar al primer Jefe",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Qg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
            },
            "Combate: reiniciar desde el primer enemigo",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Wg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(62,207,142,0.1)",
                border: "1px solid #3ecf8e",
                color: "#3ecf8e",
              },
            },
            "Primal: desbloquear siguiente movimiento",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Jg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
            },
            "Primal: reiniciar contador diario",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Fg,
              className: "w-full py-2 text-xs",
              style: {
                background: "rgba(255,92,122,0.1)",
                border: "1px solid #ff5c7a",
                color: "#ff5c7a",
              },
            },
            "Forzar aviso de sobrecarga",
          ),
        ),
      i.default.createElement(
        "div",
        { className: "text-center mt-4" },
        Ud
          ? i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#9aa4bd" } },
              "¿Seguro? Esto borra todo tu progreso.",
              " ",
              i.default.createElement(
                "button",
                {
                  onClick: Tg,
                  className: "underline",
                  style: { color: "#ff5c7a", display: "inline-block", padding: "15px 12px" },
                },
                "Sí, reiniciar",
              ),
              " ",
              i.default.createElement(
                "button",
                {
                  onClick: () => j(!1),
                  className: "underline",
                  style: { display: "inline-block", padding: "15px 12px" },
                },
                "Cancelar",
              ),
            )
          : i.default.createElement(
              "button",
              {
                onClick: () => j(!0),
                className: "text-xs",
                style: {
                  color: "#9aa4bd",
                  display: "inline-block",
                  padding: "15px 8px",
                  margin: "-15px -8px",
                },
              },
              "Reiniciar todo mi progreso",
            ),
      ),
    ),
  );
}
function w5() {
  let [e, a] = (0, i.useState)(!0),
    [l, n] = (0, i.useState)(null),
    [o, s] = (0, i.useState)([]);
  (0, i.useEffect)(() => {
    (async () => {
      let r = await p5();
      if (r) {
        let { state: p, notices: v } = ei(r);
        (n(p), s(v || []), K(p));
      }
      a(!1);
    })();
  }, []);
  function u(r) {
    let p = n5(r);
    (n(p), K(p));
  }
  function c(r) {
    try {
      let p = JSON.parse(r.trim());
      if (!p || !p.profile || !p.progress) return !1;
      let { state: v, notices: x } = ei(p);
      return (n(v), s(x || []), K(v), !0);
    } catch (p) {
      return !1;
    }
  }
  return i.default.createElement(
    "div",
    null,
    i.default.createElement(
      "style",
      null,
      `
        * { box-sizing: border-box; }
        @keyframes sdcBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes sdcPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        input:focus, button:focus { outline: 2px solid #4f9dff; outline-offset: 1px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `,
    ),
    e
      ? i.default.createElement(
          "div",
          {
            className: "min-h-screen flex items-center justify-center",
            style: { background: "#0a0e1a", color: "#9aa4bd" },
          },
          "Cargando...",
        )
      : l
        ? i.default.createElement(B5, { player: l, setPlayer: n, initialNotices: o })
        : i.default.createElement(j5, { onFinish: u, onLoadBackup: c }),
  );
}
export {
  Ae,
  Ph,
  Vs,
  $h,
  Nl,
  Pb,
  Ih,
  Rh,
  Mn,
  zd,
  $b,
  e2,
  Za,
  a2,
  Ko,
  Ib,
  Vo,
  Rb,
  t2,
  Qs,
  ey,
  ve,
  au,
  Cl,
  zl,
  sdcTitulos,
  sdcDescs,
  vd,
  ay,
  l2,
  n2,
  Ny,
  o2,
  Po,
  i2,
  s2,
  pt,
  u2,
  Ed,
  sdcPortales,
  ai,
  ty,
  ly,
  ny,
  oy,
  iy,
  Cy,
  c2,
  r2,
  d2,
  za,
  $o,
  ti,
  f2,
  hd,
  sy,
  m2,
  uy,
  p2,
  Ad,
  b2,
  y2,
  g2,
  v2,
  h2,
  x2,
  S2,
  N2,
  dd,
  C2,
  Ws,
  cy,
  k2,
  xd,
  z2,
  Oa,
  ky,
  E2,
  ou,
  Js,
  Dd,
  A2,
  D2,
  T2,
  zy,
  Ey,
  Ay,
  sdcMods,
  sdcModDia,
  sdcPetPR,
  sdcPetRacha,
  sdcPetFull,
  sdcPetParcial,
  sdcMascota,
  sdcRacha,
  sdcPerk,
  Ka,
  Sd,
  M2,
  Pt,
  sdcEstLista,
  sdcEstPrep,
  sdcEstTotal,
  sdcEstPaso,
  sdcEstMMSS,
  sdcFlexNiv,
  sdcFlexTxt,
  sdcFlex,
  sdcFlexToca,
  sdcFlexSet,
  Io,
  tu,
  Ro,
  q2,
  O2,
  ry,
  j2,
  El,
  B2,
  w2,
  dy,
  Td,
  U2,
  L2,
  Wo,
  H2,
  X2,
  Dy,
  Ty,
  Y2,
  fy,
  my,
  md,
  pd,
  bd,
  G2,
  Fs,
  Al,
  Ps,
  $e,
  My,
  ye,
  yt,
  _y,
  py,
  Z2,
  sdcDific,
  Jo,
  sdcAnimo,
  sdcAnimoCuenta,
  da,
  K2,
  V2,
  ni,
  Q2,
  W2,
  J2,
  by,
  ra,
  F2,
  P2,
  qn,
  Md,
  $2,
  yy,
  _d,
  gy,
  I2,
  Nd,
  R2,
  qd,
  Dl,
  _n,
  qy,
  Od,
  e5,
  a5,
  Oy,
  sdcPuntaje,
  sdcCalibre,
  sdcModBase,
  sdcBase,
  jd,
  t5,
  li,
  jy,
  __fechaLocal,
  ue,
  By,
  vy,
  sdcNiveles,
  iu,
  wy,
  sdcRitmoK,
  sdcRitmoF,
  sdcBandaMin,
  sdcBandaIx,
  Uy,
  l5,
  kl,
  $s,
  sdcGuia,
  M,
  n5,
  Ea,
  ei,
  o5,
  misGrupos,
  misMes,
  misVacio,
  misPeorGrupo,
  misGenerar,
  misProgreso,
  misTexto,
  misRevisar,
  i5,
  s5,
  u5,
  c5,
  r5,
  d5,
  yd,
  f5,
  hy,
  m5,
  xy,
  p5,
  K,
  Q,
  qa,
  sdcPodia,
  sdcVistos,
  sdcPrimeras,
  sdcPrimeraAdd,
  sdcPrimerasHook,
  sdcJuego,
  sdcRango,
  sdcDescRango,
  sdcCalTit,
  sdcCalFoco,
  sdcCalT,
  sdcCalF,
  sdcRachaCalc,
  sdcDiaPasado,
  sdcMarcaK,
  sdcMarca,
  sdcHoyReps,
  sdcHoyMeta,
  sdcSumaReps,
  sdcDeshacerHook,
  sdcDeshacer,
  sdcMetaHook,
  sdcIncKg,
  sdcSugKg,
  sdcGymSer,
  sdcGymUlt,
  sdcKgTxt,
  sdcTier,
  sdcEstilo,
  sdcOrden,
  b5,
  sdcSegs,
  sdcCatMod,
  sdcCatSis,
  sdcCatAbierta,
  sdcDevN,
  sdcNSets,
  sdcSplit,
  sdcSuma,
  sdcBeep,
  sdcVib,
  sdcGuiaLin,
  Is,
  Rs,
  Fo,
  Bd,
  y5,
  wd,
  g5,
  v5,
  h5,
  bt,
  x5,
  S5,
  N5,
  C5,
  ge,
  Qo,
  k5,
  Cd,
  gd,
  z5,
  E5,
  A5,
  Ie,
  Ly,
  sdcTempoMod,
  D5,
  sdcRespDias,
  sdcRespaldoOk,
  sdcRespaldoPosponer,
  sdcAvisaRespaldo,
  sdcWL,
  sdcWakeOn,
  sdcWakeOff,
  sdcWakeUse,
  sdcWakeSi,
  sdcRitmos,
  sdcCamCrono,
  sdcCalorFases,
  sdcCalorPasos,
  sdcCalorPuente,
  sdcCalorEscap,
  sdcCalorDead,
  sdcCalorHollow,
  sdcCalorAct,
  sdcCalorActF,
  sdcCalor,
  sdcCalorLista,
  sdcCalorEnsayo,
  sdcEstDesde,
  sdcPasosV,
  sdcPasoEspera,
  sdcPasosMarcar,
  sdcPasosHook,
  sdcPasoVista,
  sdcCalorCorre,
  sdcCalorT,
  sdcCalorIni,
  sdcCalorPrep,
  sdcCalorPausa,
  sdcCalorSeguir,
  sdcCalorEspera,
  sdcCalorListo,
  sdcCalorPot,
  sdcCalorFin,
  sdcCalorDer,
  sdcCalorCard,
  sdcAnimoEsc,
  sdcAnimoCuerpo,
  sdcAnimoTx,
  sdcAnimoB2,
  sdcAnimoB1,
  sdcAnimoTit,
  sdcAnimoEvBox,
  sdcAnimoHoy,
  sdcAnimoOn,
  sdcAnimoOtra,
  sdcAnimoFrase,
  sdcAnimoPut,
  sdcAnimoSet,
  sdcAnimoSetDa,
  sdcAnimoCalor,
  sdcAbrirCard,
  sdcAnimoEvid,
  sdcCargaRacha,
  sdcCara,
  sdcCaras,
  sdcAnimoAntes,
  sdcAnimoAhora,
  sdcAnimoDespues,
  sdcTravMin,
  sdcTravRitmo,
  sdcTravCrono,
  T5,
  kd,
  eu,
  M5,
  _5,
  q5,
  O5,
  j5,
  B5,
  w5,
};
