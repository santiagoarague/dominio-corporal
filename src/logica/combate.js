// Combate: terrenos, rondas y golpes.
import { multImpulso } from "./tienda.js";
import { revisarLogros, avisoCarga } from "../datos/logros.js";
import { anotarDia, volumen, nombreEjercicio, fechaHoy } from "./rutina.js";
import { subirNiveles, clonar } from "./partida.js";

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
function golpesNecesarios(e) {
  return e.isBoss
    ? Math.min(8, 4 + Math.floor(e.index / 10))
    : Math.min(5, 2 + Math.floor(e.index / 6));
}
function f2(e) {
  let a = c2 + e.index * 3;
  return e.isBoss ? Math.round(a * r2) : a;
}
function repsCombate(e, a, l, n, o, tr) {
  let s = Cy[l];
  return volumen(e, a, n, o, tr)[s];
}
function sy(e, a, l, n) {
  let o = Cy[l];
  return nombreEjercicio(e, a, o, n);
}
function m2(e) {
  return e * 3 + 15;
}
function repsCombateSuave(e, a, l, n, o, tr) {
  return Math.max(3, Math.round(repsCombate(e, a, n, l, o, tr) * 0.8));
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
    todayDefeated: { date: fechaHoy(), count: 0 },
    loadFactor: 1,
    damageFactor: 1,
    bossCats: null,
  };
}
function b2(e, a) {
  let l = clonar(e),
    n = l.combat;
  if (a === n.lastExercise) return { state: l, notices: [] };
  let o = za(n.villainIndex);
  return (
    (n.exercise = a),
    (n.villainCurrentHP = golpesNecesarios(o)),
    (n.lives = 3),
    (n.loadFactor = 1),
    (n.damageFactor = 1),
    (n.phase = "resting"),
    (n.roundId = (n.roundId || 0) + 1),
    { state: l, notices: [] }
  );
}
function y2(e) {
  let a = clonar(e);
  return (
    (a.combat.phase = "resting"),
    (a.combat.roundId = (a.combat.roundId || 0) + 1),
    { state: a, notices: [] }
  );
}
function g2(e) {
  let a = clonar(e),
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
  let l = clonar(e),
    n = l.combat,
    o = za(n.villainIndex);
  if (a === n.lastExercise || a === n.exercise) return { state: l, notices: [] };
  let s = golpesNecesarios(o),
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
  let a = clonar(e),
    l = [],
    n = a.combat,
    o = za(n.villainIndex);
  if (((n.villainCurrentHP -= n.damageFactor || 1), n.villainCurrentHP <= 0.001)) {
    ((n.phase = "victory"), (n.villainsDefeated = (n.villainsDefeated || 0) + 1));
    let r = fechaHoy();
    if (
      ((!n.todayDefeated || n.todayDefeated.date !== r) &&
        (n.todayDefeated = { date: r, count: 0 }),
      (n.todayDefeated.count += 1),
      n.todayDefeated.count <= d2)
    ) {
      let p = f2(o);
      ((a.progress.currentXP += Math.round((a.streak.flexBuff ? p * 1.1 : p) * multImpulso(a))),
        (a.today.xpEarned = (a.today.xpEarned || 0) + p),
        l.push(`¡Recuperaste ${o.name}! +${p} XP.`),
        (a = anotarDia(a, "Combate")));
    } else
      l.push(
        `¡Recuperaste ${o.name}! Ya ganaste tu XP máxima de combate hoy, pero la victoria sigue contando para tu progreso.`,
      );
    a = subirNiveles(a, l);
  } else ((n.phase = "resting"), (n.roundId = (n.roundId || 0) + 1));
  let s = revisarLogros(a),
    u = { state: s.state, notices: [...l, ...s.notices] },
    c = avisoCarga(u.state);
  return { state: c.state, notices: [...u.notices, ...c.notices] };
}
function perderVida(e) {
  let a = clonar(e),
    l = a.combat;
  return (
    (l.lives -= 1),
    l.lives <= 0 ? ((l.lives = 3), (l.phase = "defeat")) : (l.phase = "decision"),
    { state: a, notices: [] }
  );
}
function S2(e) {
  let a = clonar(e),
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
        (l.villainCurrentHP = golpesNecesarios(o)),
        (l.lives = 3),
        (l.phase = "resting"),
        (l.roundId = (l.roundId || 0) + 1))
      : ((l.bossCats = null), (l.phase = "choosing")),
    { state: a, notices: [] }
  );
}
function N2(e) {
  let a = clonar(e);
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

export {
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
  golpesNecesarios,
  f2,
  repsCombate,
  sy,
  m2,
  repsCombateSuave,
  p2,
  Ad,
  b2,
  y2,
  g2,
  v2,
  h2,
  perderVida,
  S2,
  N2,
  dd,
  C2,
  Ws,
};
