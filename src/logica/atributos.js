// Atributos del jugador.
import { nivelZona } from "../ui/cuerpo.jsx";

var listaAtributos = [
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
function valorAtributo(partida, atributo) {
  return Math.floor(atributo.calc(partida));
}
function nivelAtributo(puntos) {
  return Math.floor(Math.sqrt(puntos / 60)) + 1;
}
function progresoAtributo(puntos) {
  let nivel = nivelAtributo(puntos),
    desde = Math.pow(nivel - 1, 2) * 60,
    hasta = Math.pow(nivel, 2) * 60;
  return { cur: puntos - desde, need: hasta - desde };
}
function nivelesZonas(partida) {
  let grupos = ["squat", "pushup", "back", "abs"],
    niveles = {};
  grupos.forEach((grupo) => {
    niveles[grupo] = nivelZona(partida.lifetimeReps[grupo] || 0);
  });
  let alto = grupos[0],
    bajo = grupos[0];
  grupos.forEach((grupo) => {
    (niveles[grupo] > niveles[alto] && (alto = grupo),
      niveles[grupo] < niveles[bajo] && (bajo = grupo));
  });
  let brecha = niveles[alto] - niveles[bajo];
  return { hi: alto, lo: bajo, gap: brecha, levels: niveles };
}
function atributosDeZona(zona) {
  return listaAtributos
    .filter((atr) => atr.zones.includes(zona))
    .map((atr) => atr.name)
    .join(" y ");
}

export {
  listaAtributos,
  valorAtributo,
  nivelAtributo,
  progresoAtributo,
  nivelesZonas,
  atributosDeZona,
};
