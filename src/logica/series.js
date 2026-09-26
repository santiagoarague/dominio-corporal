// Series, sonido y vibracion.
import { sistemaActivo } from "./sistemas.js";
import { modalidadesDe } from "./rutina.js";
import { pitido } from "../ui/prueba.jsx";

function sdcSegs(alt) {
  if (!alt) return 0;
  var coincide = String(alt).match(/(?:^|[^(])1\s*rep\s*(?:=|por cada)\s*(\d+)\s*(?:s\b|segundo)/i);
  return coincide ? parseInt(coincide[1], 10) : 0;
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
function sdcCatAbierta(partida, cat) {
  var sistema = sdcCatSis[cat];
  if (sistema) return sistemaActivo(partida, sistema);
  var modalidad = sdcCatMod[cat];
  if (modalidad) return modalidadesDe(partida.profile).indexOf(modalidad) >= 0;
  return !0;
}
function sdcNSets(total) {
  return total >= 6 ? 3 : total >= 3 ? 2 : 1;
}
function sdcSplit(total, series) {
  if (series <= 1) return [total];
  let pesos = series === 2 ? [0.55, 0.45] : [0.4, 0.33, 0.27],
    partes = [],
    acumulado = 0;
  for (let indice = 0; indice < series - 1; indice++) {
    let parte = Math.max(1, Math.round(total * pesos[indice]));
    (partes.push(parte), (acumulado += parte));
  }
  return (partes.push(Math.max(0, total - acumulado)), partes);
}
// El reloj de un sostén: prep segundos para ponerse en posición y después el
// sostén, contados desde ini y congelados en pausa (el momento en que se pausó).
var sdcSostenPrep = 10;
function sdcSostenEstado(ini, pausa, prep, total, ahora) {
  var transcurrido = Math.max(0, ((pausa || ahora) - ini) / 1e3);
  if (transcurrido < prep)
    return { fase: "prep", quedan: Math.ceil(prep - transcurrido), hecho: 0 };
  var hecho = transcurrido - prep;
  if (hecho >= total) return { fase: "fin", quedan: 0, hecho: total };
  return { fase: "sosten", quedan: Math.ceil(total - hecho), hecho: Math.floor(hecho) };
}
// Las series marcadas de un ejercicio, una por una: n verdaderos o falsos. Antes
// se guardaba solo cuántas (siempre las primeras), y un número se sigue leyendo así.
function sdcMarcadas(valor, n) {
  var marcadas = [];
  for (var i = 0; i < n; i++) marcadas.push(Array.isArray(valor) ? !!valor[i] : i < (valor || 0));
  return marcadas;
}
function sdcSuma(total, series, hasta) {
  let partes = sdcSplit(total, series),
    suma = 0;
  for (let indice = 0; indice < hasta && indice < partes.length; indice++) suma += partes[indice];
  return suma;
}
function sdcBeep(hz, ms, hasta, tipo) {
  try {
    pitido(hz, ms, hasta, tipo);
  } catch (err) {}
}
// Los sonidos del Instinto Primal, agudos y largos para oirse en el suelo, con el
// telefono lejos: tic de cuenta, aviso de preparacion, arranque de ronda, fin de
// ronda (dos notas que bajan) y fin de la sesion (tres que suben).
function sdcPrimalSon(tipo) {
  if (tipo === "tic") return (sdcBeep(1047, 90), sdcVib(15));
  if (tipo === "prepara")
    return (sdcBeep(880, 160), setTimeout(() => sdcBeep(880, 160), 220), sdcVib(40));
  if (tipo === "arranca") return (sdcBeep(1319, 340), sdcVib(80));
  if (tipo === "fin")
    return (sdcBeep(1175, 240), setTimeout(() => sdcBeep(784, 360), 260), sdcVib([150, 80, 150]));
  (sdcBeep(1047, 160),
    setTimeout(() => sdcBeep(1319, 160), 180),
    setTimeout(() => sdcBeep(1568, 380), 360),
    sdcVib([40, 60, 140]));
}
// El compañero que se asoma: dos silbidos cortos que suben ("fiu-fiú"), más agudos y
// rápidos que cualquier señal del entrenamiento, para que no se confunda con ninguna.
function sonidoCompanero() {
  (sdcBeep(1250, 90, 1900), setTimeout(() => sdcBeep(1250, 130, 2300), 150));
}
function sdcVib(patron) {
  try {
    navigator.vibrate && navigator.vibrate(patron);
  } catch (err) {}
}

export {
  sonidoCompanero,
  sdcPrimalSon,
  sdcSostenPrep,
  sdcSostenEstado,
  sdcMarcadas,
  sdcSegs,
  sdcCatMod,
  sdcCatSis,
  sdcCatAbierta,
  sdcNSets,
  sdcSplit,
  sdcSuma,
  sdcBeep,
  sdcVib,
};
