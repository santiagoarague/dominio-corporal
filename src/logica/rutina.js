// La rutina del dia: modalidad, ejercicio, volumen, calibre y fechas.
import { hashDia } from "./primal.js";
import { ejerciciosGym, ejerciciosFlow, factorRango, ejerciciosPeso } from "../datos/ejercicios.js";
import { clonar } from "./partida.js";
import { sdcCalT } from "./extras.js";

function modalidadesDe(e) {
  let a = (e && e.modalities) || ["bodyweight"];
  return a.length ? a : ["bodyweight"];
}
function modalidadDelDia(e, a, l) {
  let n = modalidadesDe(e);
  if (l && n.includes(l)) return l;
  if (n.length === 1) return n[0];
  let o = hashDia(a || fechaHoy(), n.length);
  return n[o];
}
function tablaEjercicios(e) {
  return e === "gym" ? ejerciciosGym : e === "flow" ? ejerciciosFlow : null;
}
var baseClase = {
  principiante: { squat: 12, pushup: 8, back: 8, abs: 12 },
  intermedio: { squat: 18, pushup: 12, back: 10, abs: 18 },
  avanzado: { squat: 24, pushup: 16, back: 14, abs: 24 },
};
function ejercicioDe(e, a, l, fx) {
  var n = tablaEjercicios(l),
    o = n && n[e] && n[e][a] ? n[e][a] : null;
  if (!o) {
    var b = ejerciciosPeso[e] || ejerciciosPeso.squat;
    o = b[a] || b.C;
  }
  if (!o) return { name: "", repFactor: 1, alt: "" };
  if (!Array.isArray(o)) return o;
  if (o.length < 2) return o[0] || { name: "", repFactor: 1, alt: "" };
  return o[
    hashDia(
      String(fx || fechaHoy()) + "|" + e + "|" + a + "|" + String(l || "bodyweight"),
      o.length,
    )
  ];
}
var pruebaUmbral = {
  E: { rounds: 3, pct: 0.6, note: "Cadencia controlada, sin prisa." },
  D: { rounds: 3, pct: 0.7, note: "Sin descanso entre ejercicios." },
  C: { rounds: 4, pct: 0.7, note: "Superserie: encadena los cuatro patrones." },
  B: { rounds: 4, pct: 0.75, note: "Descanso máximo de 30 s entre rondas." },
  A: { rounds: 5, pct: 0.75, note: "Descanso máximo de 15 s entre rondas." },
  S: { rounds: 5, pct: 0.8, note: "Sin cortes. La prueba del Dominio Total." },
};
var enfoques = [
    {
      id: "fuerza",
      name: "Ganancia Muscular / Fuerza Máxima",
      repMult: 0.65,
      xpMult: 1.5,
      streakBonus: 0,
      ajuste: "Repeticiones base bajas, multiplicador de XP alto por serie completada.",
      ventaja: "Mayor ganancia de atributos de Fuerza y progresión en ejercicios complejos.",
      desventaja: "Menor margen de error técnico y mayor exigencia en tiempos de descanso.",
    },
    {
      id: "resistencia",
      name: "Resistencia / Acondicionamiento Físico",
      repMult: 1.4,
      xpMult: 0.72,
      streakBonus: 0,
      ajuste: "Repeticiones base altas, mayor volumen total de entrenamiento.",
      ventaja: "Aumento rápido del atributo de Resistencia y mayor gasto energético por sesión.",
      desventaja: "Genera mayor fatiga muscular acumulada durante la semana.",
    },
    {
      id: "salud",
      name: "Salud / Movilidad & Control Motriz",
      repMult: 1,
      xpMult: 1,
      streakBonus: 0.15,
      ajuste: "Repeticiones moderadas, bonificación de XP (+15%) por racha de días constantes.",
      ventaja: "Menor riesgo de sobrecarga, recuperación más rápida y sostenible a largo plazo.",
      desventaja: "Ritmo de incremento de fuerza máxima más pausado.",
    },
  ],
  rachaBonoSalud = 3,
  metaSemanalDefecto = 3;
function anotarDia(e, a) {
  let l = e.today.date;
  return (
    e.week.sessionDates || (e.week.sessionDates = []),
    e.week.reps || (e.week.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    e.dayLog || (e.dayLog = {}),
    e.dayLog[l] || (e.dayLog[l] = { acts: [], reps: null, xp: 0 }),
    a && !e.dayLog[l].acts.includes(a) && e.dayLog[l].acts.push(a),
    e.week.sessionDates.includes(l) ||
      (e.week.sessionDates.push(l),
      (e.week.trained = e.week.sessionDates.length),
      e.streak.missed >= 3 &&
        (e.maxComebackStreak = Math.max(e.maxComebackStreak || 0, e.streak.missed)),
      (e.streak.missed = 0),
      (e.streak.current += 1),
      (e.streak.best = Math.max(e.streak.best || 0, e.streak.current)),
      e.history[l] || (e.history[l] = "partial")),
    e
  );
}
function metaSemanal(e) {
  return (e.profile && e.profile.weeklyGoal) || metaSemanalDefecto;
}
function diasRestantesSemana(e) {
  let l = new Date(e + "T00:00:00").getDay();
  return 7 - (l === 0 ? 6 : l - 1);
}
function enfoqueDe(e) {
  return enfoques.find((a) => a.id === e) || enfoques[2];
}
var mejoraMinimaZ = 1.01,
  diasParaBajarZ = 7;
function metaDelDia(e, a) {
  let l = a || e.progress.rank,
    n = modalidadDelDia(e.profile, e.today && e.today.date, e.today && e.today.modality),
    o = volumen(l, e.profile.classification, e.profile.focusProfile, n, e.profile.testResults);
  if (l !== "Z") return o;
  let s = e.records || {},
    u = {};
  for (let c of Object.keys(o)) {
    let r = s[c] || 0;
    u[c] = r > 0 ? Math.max(o[c], Math.ceil(r * mejoraMinimaZ), r + 1) : o[c];
  }
  return u;
}
function sdcPuntaje(p) {
  var t = p && p.testResults;
  if (!t) return 0;
  return puntajePrueba(
    Number(t.squat) || 0,
    Number(t.pushup) || 0,
    Number(t.abs) || 0,
    Number(t.back) || 0,
  );
}
function sdcCalibre(p) {
  var t = p && p.testResults;
  if (!t) return null;
  var sq = Number(t.squat) || 0,
    pu = Number(t.pushup) || 0,
    ab = Number(t.abs) || 0,
    bk = Number(t.back) || 0;
  if (!sq && !pu && !ab && !bk) return null;
  var b = bandaCalibre(sq, pu, ab, bk, sdcRitmoF(p));
  return b ? sdcCalT(bandasCalibre.indexOf(b), p) : null;
}
var sdcModBase = {
  gym: { squat: 50, pushup: 45, back: 45, abs: 50 },
  flow: { squat: 40, pushup: 36, back: 36, abs: 40 },
};
function sdcBase(tr, cl, mod) {
  var mb = sdcModBase[mod];
  if (mb) return mb;
  var b = baseClase[cl] || baseClase.intermedio;
  if (!tr) return b;
  var K = 1.15,
    sq = Number(tr.squat) || 0,
    pu = Number(tr.pushup) || 0,
    ab = Number(tr.abs) || 0,
    bk = Number(tr.back) || 0;
  if (!sq && !pu && !ab) return b;
  var cp = function (v) {
    return Math.min(v, 340);
  };
  return {
    squat: Math.max(b.squat, cp(Math.round(sq * K))),
    pushup: Math.max(b.pushup, cp(Math.round(pu * K))),
    back: Math.max(b.back, cp(Math.round((bk > 0 ? bk : pu * 0.85) * K))),
    abs: Math.max(b.abs, cp(Math.round(ab * K))),
  };
}
function volumen(e, a, l, n, tr) {
  let o = enfoqueDe(l).repMult,
    s = factorRango[e] || 1,
    u = sdcBase(tr, a, n),
    c = {};
  for (let r of Object.keys(u))
    c[r] = Math.max(1, Math.round(u[r] * s * ejercicioDe(r, e, n).repFactor * o));
  return c;
}
function multEnfoque(e) {
  let a = enfoqueDe(e.profile.focusProfile),
    l = a.xpMult;
  return (a.streakBonus && e.streak.current >= rachaBonoSalud && (l *= 1 + a.streakBonus), l);
}
function costoNivel(e) {
  return e < 50 ? 45 + e * 3 : 5 * e - 55;
}
function xpTotal(e, a) {
  let l = a;
  for (let n = 1; n < e; n++) l += costoNivel(n);
  return l;
}
function fechaLocal(d) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
}
function fechaHoy() {
  return fechaLocal(new Date());
}
function inicioSemana(e) {
  let a = new Date(e + "T00:00:00"),
    l = a.getDay(),
    n = (l === 0 ? -6 : 1) - l;
  return (a.setDate(a.getDate() + n), fechaLocal(a));
}
var bandasCalibre = [
  {
    min: 0,
    max: 29,
    rank: "E",
    classification: "principiante",
    label: "Principiante Base",
    focus: "Acondicionamiento y movilidad",
  },
  {
    min: 30,
    max: 66,
    rank: "D",
    classification: "principiante",
    label: "Principiante Consolidado",
    focus: "Control motor y fuerza básica",
  },
  {
    min: 67,
    max: 114,
    rank: "C",
    classification: "intermedio",
    label: "Intermedio Inicial",
    focus: "Volumen e intensidad moderada",
  },
  {
    min: 115,
    max: 168,
    rank: "B",
    classification: "intermedio",
    label: "Intermedio Avanzado",
    focus: "Patrones biomecánicos complejos",
  },
  {
    min: 169,
    max: 216,
    rank: "A",
    classification: "avanzado",
    label: "Avanzado",
    focus: "Calistenia / Flow de alto impacto",
  },
  {
    min: 217,
    max: 1 / 0,
    rank: "S",
    classification: "avanzado",
    label: "Élite / Dominio Total",
    focus: "Variaciones unilaterales y máxima exigencia",
  },
];
var sdcNiveles = [
  { t: "Recién empiezo", d: "Menos de 5 flexiones seguidas.", sq: 8, pu: 4, ab: 8, bk: 2 },
  { t: "Me muevo, pero sin plan", d: "Unas 8 flexiones seguidas.", sq: 15, pu: 8, ab: 14, bk: 5 },
  { t: "Entreno de a ratos", d: "Unas 14 flexiones seguidas.", sq: 25, pu: 14, ab: 24, bk: 9 },
  { t: "Entreno seguido", d: "Unas 22 flexiones seguidas.", sq: 35, pu: 22, ab: 34, bk: 14 },
  { t: "Entreno hace años", d: "Unas 30 flexiones seguidas.", sq: 45, pu: 30, ab: 42, bk: 19 },
  { t: "Alto rendimiento", d: "40 flexiones seguidas o más.", sq: 60, pu: 40, ab: 55, bk: 25 },
];
function puntajePrueba(e, a, l, k) {
  return 2 * a + e + l + 2 * (k || 0);
}
function bandaCalibre(e, a, l, k, ff) {
  let n = puntajePrueba(e, a, l, k);
  return bandasCalibre[sdcBandaIx(n, ff || 1)];
}
var sdcRitmoK = 0.6;
function sdcRitmoF(p) {
  return p && p.testResults && p.testResults.ritmo === 5 ? sdcRitmoK : 1;
}
function sdcBandaMin(k, f) {
  return Math.round(bandasCalibre[k].min * (f || 1));
}
function sdcBandaIx(n, f) {
  var r = 0,
    k;
  for (k = 0; k < bandasCalibre.length; k++) n >= sdcBandaMin(k, f) && (r = k);
  return r;
}
function claseCalibre(e, a, l, k, ff) {
  return bandaCalibre(e, a, l, k, ff).classification;
}
function guardarPrueba(e, a, l, n, k, rt) {
  let o = clonar(e),
    s = claseCalibre(a, l, n, k, rt === 5 ? sdcRitmoK : 1),
    u = o.profile.classification;
  ((o.profile.classification = s),
    (o.profile.testResults = rt
      ? { squat: a, pushup: l, abs: n, back: k || 0, ritmo: rt }
      : { squat: a, pushup: l, abs: n, back: k || 0 }));
  let c = [
    u === s
      ? `Prueba de aptitud actualizada. Seguís en ${s}.`
      : `¡Prueba de aptitud actualizada! Pasaste de ${u} a ${s}.`,
  ];
  return { state: o, notices: c };
}
function nombreEjercicio(e, a, l, n) {
  return ejercicioDe(l, e, n).name;
}
function alternativaEjercicio(e, a, l) {
  return ejercicioDe(a, e, l).alt;
}
function sdcGuia(e, a, l) {
  var x = ejercicioDe(a, e, l);
  return x && (x.pos || x.mov || x.err) ? x : null;
}

export {
  modalidadesDe,
  modalidadDelDia,
  tablaEjercicios,
  baseClase,
  ejercicioDe,
  pruebaUmbral,
  enfoques,
  rachaBonoSalud,
  metaSemanalDefecto,
  anotarDia,
  metaSemanal,
  diasRestantesSemana,
  enfoqueDe,
  mejoraMinimaZ,
  diasParaBajarZ,
  metaDelDia,
  sdcPuntaje,
  sdcCalibre,
  sdcModBase,
  sdcBase,
  volumen,
  multEnfoque,
  costoNivel,
  xpTotal,
  fechaLocal,
  fechaHoy,
  inicioSemana,
  bandasCalibre,
  sdcNiveles,
  puntajePrueba,
  bandaCalibre,
  sdcRitmoK,
  sdcRitmoF,
  sdcBandaMin,
  sdcBandaIx,
  claseCalibre,
  guardarPrueba,
  nombreEjercicio,
  alternativaEjercicio,
  sdcGuia,
};
