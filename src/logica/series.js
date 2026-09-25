// Series, sonido y vibracion.
import { sistemaActivo } from "./sistemas.js";
import { modalidadesDe } from "./rutina.js";
import { pitido } from "../ui/prueba.jsx";

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
  if (s) return sistemaActivo(st, s);
  var m = sdcCatMod[cat];
  if (m) return modalidadesDe(st.profile).indexOf(m) >= 0;
  return !0;
}
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
function sdcBeep(hz, ms, hasta, tipo) {
  try {
    pitido(hz, ms, hasta, tipo);
  } catch (e) {}
}
// Los sonidos del Instinto Primal, agudos y largos para oirse en el suelo, con el
// telefono lejos: tic de cuenta, aviso de preparacion, arranque de ronda, fin de
// ronda (dos notas que bajan) y fin de la sesion (tres que suben).
function sdcPrimalSon(t) {
  if (t === "tic") return (sdcBeep(1047, 90), sdcVib(15));
  if (t === "prepara")
    return (sdcBeep(880, 160), setTimeout(() => sdcBeep(880, 160), 220), sdcVib(40));
  if (t === "arranca") return (sdcBeep(1319, 340), sdcVib(80));
  if (t === "fin")
    return (sdcBeep(1175, 240), setTimeout(() => sdcBeep(784, 360), 260), sdcVib([150, 80, 150]));
  (sdcBeep(1047, 160),
    setTimeout(() => sdcBeep(1319, 160), 180),
    setTimeout(() => sdcBeep(1568, 380), 360),
    sdcVib([40, 60, 140]));
}
function sdcVib(p) {
  try {
    navigator.vibrate && navigator.vibrate(p);
  } catch (e) {}
}

export {
  sdcPrimalSon,
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
