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
function valorAtributo(e, a) {
  return Math.floor(a.calc(e));
}
function nivelAtributo(e) {
  return Math.floor(Math.sqrt(e / 60)) + 1;
}
function progresoAtributo(e) {
  let a = nivelAtributo(e),
    l = Math.pow(a - 1, 2) * 60,
    n = Math.pow(a, 2) * 60;
  return { cur: e - l, need: n - l };
}
function nivelesZonas(e) {
  let a = ["squat", "pushup", "back", "abs"],
    l = {};
  a.forEach((u) => {
    l[u] = nivelZona(e.lifetimeReps[u] || 0);
  });
  let n = a[0],
    o = a[0];
  a.forEach((u) => {
    (l[u] > l[n] && (n = u), l[u] < l[o] && (o = u));
  });
  let s = l[n] - l[o];
  return { hi: n, lo: o, gap: s, levels: l };
}
function atributosDeZona(e) {
  return listaAtributos
    .filter((a) => a.zones.includes(e))
    .map((a) => a.name)
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
