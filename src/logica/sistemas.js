// Sistemas que se abren con el nivel.
import { ve } from "../datos/rangos.js";
import { M } from "./partida.js";

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

export { $e, My, ye, yt, _y };
