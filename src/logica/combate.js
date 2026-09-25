// Combate: terrenos, rondas y golpes.
import { multImpulso } from "./tienda.js";
import { revisarLogros, avisoCarga } from "../datos/logros.js";
import { anotarDia, volumen, nombreEjercicio, fechaHoy } from "./rutina.js";
import { subirNiveles, clonar } from "./partida.js";

var terrenosComunes = ["Zona Dormida", "Tramo Rígido", "Lado Corto"],
  terrenosDificiles = ["Bisagra Trabada", "Eslabón Flojo"],
  terrenosJefe = ["El Techo", "El Punto Muerto", "La Inercia"],
  sufijosTerreno = ["", " persistente", " de años", " de siempre", " de raíz"],
  nombresTren = {
    upper_front: "Tren Superior Anterior",
    upper_back: "Tren Superior Posterior",
    lower: "Tren Inferior",
  },
  grupoDeTren = { upper_front: "pushup", upper_back: "back", lower: "squat" },
  xpTerrenoBase = 15,
  multXpJefe = 3,
  victoriasConXp = 5;
function terreno(e) {
  let a = (e + 1) % 5 === 0,
    l = Math.floor(e / 15),
    n = sufijosTerreno[Math.min(l, sufijosTerreno.length - 1)],
    o;
  return (
    a
      ? (o = terrenosJefe[Math.floor(e / 5) % terrenosJefe.length])
      : e < 10
        ? (o = terrenosComunes[e % terrenosComunes.length])
        : (o = terrenosDificiles[e % terrenosDificiles.length]),
    { name: o + n, isBoss: a, tier: l, index: e }
  );
}
function trenesJefe(e) {
  return ["upper_front", "upper_back", "lower"].filter((n) => n !== e).slice(0, 2);
}
function golpesNecesarios(e) {
  return e.isBoss
    ? Math.min(8, 4 + Math.floor(e.index / 10))
    : Math.min(5, 2 + Math.floor(e.index / 6));
}
function xpTerreno(e) {
  let a = xpTerrenoBase + e.index * 3;
  return e.isBoss ? Math.round(a * multXpJefe) : a;
}
function repsCombate(e, a, l, n, o, tr) {
  let s = grupoDeTren[l];
  return volumen(e, a, n, o, tr)[s];
}
function ejercicioDeTren(e, a, l, n) {
  let o = grupoDeTren[l];
  return nombreEjercicio(e, a, o, n);
}
function segundosVentana(e) {
  return e * 3 + 15;
}
function repsCombateSuave(e, a, l, n, o, tr) {
  return Math.max(3, Math.round(repsCombate(e, a, n, l, o, tr) * 0.8));
}
function segundosVentanaJefe() {
  return 150;
}
function combateInicial() {
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
function elegirTren(e, a) {
  let l = clonar(e),
    n = l.combat;
  if (a === n.lastExercise) return { state: l, notices: [] };
  let o = terreno(n.villainIndex);
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
function reintentarRonda(e) {
  let a = clonar(e);
  return (
    (a.combat.phase = "resting"),
    (a.combat.roundId = (a.combat.roundId || 0) + 1),
    { state: a, notices: [] }
  );
}
function ajustarCarga(e) {
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
function cambiarTren(e, a) {
  let l = clonar(e),
    n = l.combat,
    o = terreno(n.villainIndex);
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
function golpear(e) {
  let a = clonar(e),
    l = [],
    n = a.combat,
    o = terreno(n.villainIndex);
  if (((n.villainCurrentHP -= n.damageFactor || 1), n.villainCurrentHP <= 0.001)) {
    ((n.phase = "victory"), (n.villainsDefeated = (n.villainsDefeated || 0) + 1));
    let r = fechaHoy();
    if (
      ((!n.todayDefeated || n.todayDefeated.date !== r) &&
        (n.todayDefeated = { date: r, count: 0 }),
      (n.todayDefeated.count += 1),
      n.todayDefeated.count <= victoriasConXp)
    ) {
      let p = xpTerreno(o);
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
function siguienteTerreno(e) {
  let a = clonar(e),
    l = a.combat,
    n = terreno(l.villainIndex);
  ((l.lastExercise = n.isBoss ? null : l.exercise),
    (l.exercise = null),
    (l.villainIndex += 1),
    (l.villainCurrentHP = null),
    (l.loadFactor = 1),
    (l.damageFactor = 1));
  let o = terreno(l.villainIndex);
  return (
    o.isBoss
      ? ((l.bossCats = trenesJefe(l.lastExercise)),
        (l.villainCurrentHP = golpesNecesarios(o)),
        (l.lives = 3),
        (l.phase = "resting"),
        (l.roundId = (l.roundId || 0) + 1))
      : ((l.bossCats = null), (l.phase = "choosing")),
    { state: a, notices: [] }
  );
}
function reintentarSinVidas(e) {
  let a = clonar(e);
  return (
    (a.combat.phase = "resting"),
    (a.combat.roundId = (a.combat.roundId || 0) + 1),
    { state: a, notices: [] }
  );
}
var rondasPrimal = 3,
  segundosPrimalPorRango = { E: 30, D: 35, C: 40, B: 45, A: 50, S: 55, Z: 60 };
function segundosRondaPrimal(e) {
  return segundosPrimalPorRango[e] || 40;
}

export {
  terrenosComunes,
  terrenosDificiles,
  terrenosJefe,
  sufijosTerreno,
  nombresTren,
  grupoDeTren,
  xpTerrenoBase,
  multXpJefe,
  victoriasConXp,
  terreno,
  trenesJefe,
  golpesNecesarios,
  xpTerreno,
  repsCombate,
  ejercicioDeTren,
  segundosVentana,
  repsCombateSuave,
  segundosVentanaJefe,
  combateInicial,
  elegirTren,
  reintentarRonda,
  ajustarCarga,
  cambiarTren,
  golpear,
  perderVida,
  siguienteTerreno,
  reintentarSinVidas,
  rondasPrimal,
  segundosPrimalPorRango,
  segundosRondaPrimal,
};
