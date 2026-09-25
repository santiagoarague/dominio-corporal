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
  var pasos = [],
    indice,
    est;
  for (indice = 0; indice < estiramientos.length; indice++) {
    est = estiramientos[indice];
    if (corta && !est.corta) continue;
    if (est.lados) {
      pasos.push({
        name: est.name,
        desc: est.desc,
        seconds: est.seconds,
        lado: "lado derecho",
        prep: est.pr,
      });
      pasos.push({ name: est.name, desc: est.desc, seconds: est.seconds, lado: "lado izquierdo" });
    } else
      pasos.push({
        name: est.name,
        desc: est.desc,
        seconds: est.seconds,
        lado: null,
        prep: est.pr,
      });
  }
  pasos.length && (pasos[0].prep = 10);
  return pasos;
}
var sdcEstPrep = 5;
function sdcEstTotal(pasos) {
  var total = 0,
    indice;
  for (indice = 0; indice < (pasos || []).length; indice++)
    total += (pasos[indice].prep || sdcEstPrep) + pasos[indice].seconds;
  return total;
}
function sdcEstPaso(pasos, transcurrido) {
  var inicio = 0,
    indice,
    finPrep,
    fin;
  for (indice = 0; indice < pasos.length; indice++) {
    finPrep = inicio + (pasos[indice].prep || sdcEstPrep);
    fin = finPrep + pasos[indice].seconds;
    if (transcurrido < finPrep)
      return { index: indice, left: pasos[indice].seconds, prep: finPrep - transcurrido };
    if (transcurrido < fin) return { index: indice, left: fin - transcurrido, prep: 0 };
    inicio = fin;
  }
  return { index: pasos.length - 1, left: 0, prep: 0 };
}
function sdcEstMMSS(segundos) {
  segundos = Math.max(0, Math.round(segundos));
  return String(Math.floor(segundos / 60)) + ":" + String(segundos % 60).padStart(2, "0");
}
var sdcFlexNiv = [
  { n: 1, t: "A las rodillas" },
  { n: 2, t: "A media pantorrilla" },
  { n: 3, t: "A los tobillos" },
  { n: 4, t: "A los dedos de los pies" },
  { n: 5, t: "Palmas apoyadas en el piso" },
];
function sdcFlexTxt(nivel) {
  for (var indice = 0; indice < sdcFlexNiv.length; indice++)
    if (sdcFlexNiv[indice].n === nivel) return sdcFlexNiv[indice].t;
  return "";
}
function sdcFlex(partida) {
  return (partida && partida.flex) || {};
}
function sdcFlexToca(partida) {
  var flex = sdcFlex(partida);
  if (!flex.fecha) return !0;
  var dias = Math.round(
    (new Date(fechaHoy() + "T00:00:00") - new Date(flex.fecha + "T00:00:00")) / 864e5,
  );
  return dias >= 7;
}
function sdcFlexSet(actual, nivel) {
  var partida = clonar(actual),
    flex = sdcFlex(partida),
    mejor = flex.mejor || 0,
    hoy = fechaHoy(),
    avisos = [];
  partida.flex = {
    nivel: nivel,
    fecha: hoy,
    primero: flex.primero || nivel,
    mejor: Math.max(mejor, nivel),
    historial: (flex.historial || []).concat([{ fecha: hoy, nivel: nivel }]).slice(-40),
  };
  if (mejor && nivel > mejor) {
    sdcPrimeraAdd(
      partida,
      "Flexibilidad: llegás " +
        sdcFlexTxt(nivel).toLowerCase() +
        ". Antes llegabas " +
        sdcFlexTxt(mejor).toLowerCase() +
        ".",
      "medida",
    );
    avisos.push("Primera vez: llegás " + sdcFlexTxt(nivel).toLowerCase() + ".");
  } else
    avisos.push(
      mejor
        ? "Alcance anotado. Te lo vuelvo a preguntar en una semana."
        : "Alcance anotado: este es tu punto de partida. Te lo vuelvo a preguntar en una semana.",
    );
  return { state: partida, notices: avisos };
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
