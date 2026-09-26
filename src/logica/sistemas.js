// Sistemas que se abren con el nivel.
import { rangos } from "../datos/rangos.js";
import { clonar } from "./partida.js";

var sistemas = [
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
    id: "companero",
    name: "Tu compañero",
    level: 1,
    rank: "E",
    why: "De vez en cuando se asoma para mostrarte algo de la app que todavía no usaste.",
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
function rangoAlcanza(rango, minimo) {
  return rangos.indexOf(rango) >= rangos.indexOf(minimo);
}
function sistemaActivo(partida, id) {
  if (partida.disabled && partida.disabled.includes(id)) return !1;
  if (partida.unlockAll) return !0;
  let sistema = sistemas.find((sis) => sis.id === id);
  return sistema
    ? partida.progress.level >= sistema.level && rangoAlcanza(partida.progress.rank, sistema.rank)
    : !0;
}
function sistemaAbierto(partida, id) {
  if (partida.unlockAll) return !0;
  let sistema = sistemas.find((sis) => sis.id === id);
  return sistema
    ? partida.progress.level >= sistema.level && rangoAlcanza(partida.progress.rank, sistema.rank)
    : !0;
}
function avisarSistemasNuevos(actual) {
  let partida = clonar(actual),
    avisos = [];
  partida.seenUnlocks || (partida.seenUnlocks = []);
  for (let sistema of sistemas)
    sistemaAbierto(partida, sistema.id) &&
      !partida.seenUnlocks.includes(sistema.id) &&
      (partida.seenUnlocks.push(sistema.id),
      avisos.push(`Nuevo sistema desbloqueado: ${sistema.name}. ${sistema.why}`));
  return { state: partida, notices: avisos };
}

export { sistemas, rangoAlcanza, sistemaActivo, sistemaAbierto, avisarSistemasNuevos };
