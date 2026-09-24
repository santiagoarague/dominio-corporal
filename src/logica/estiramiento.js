// Estiramiento guiado y chequeo de flexibilidad.
import { fechaHoy } from "./rutina.js";
import { clonar } from "./partida.js";
import { sdcPrimeraAdd } from "./extras.js";

var estiramientos = [
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
  for (k = 0; k < estiramientos.length; k++) {
    s = estiramientos[k];
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
  var d = Math.round(
    (new Date(fechaHoy() + "T00:00:00") - new Date(f.fecha + "T00:00:00")) / 864e5,
  );
  return d >= 7;
}
function sdcFlexSet(e, n) {
  var a = clonar(e),
    f = sdcFlex(a),
    pr = f.mejor || 0,
    hoy = fechaHoy(),
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

export {
  estiramientos,
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
};
