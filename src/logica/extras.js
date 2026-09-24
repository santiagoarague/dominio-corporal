// Primeras veces, titulos, racha, marcas de series, gimnasio y avisos.
import { sdcDescs, sdcTitulos, nombresRango } from "../datos/rangos.js";
import { descRango } from "../datos/ejercicios.js";
import { modalidadDelDia, fechaLocal, ejercicioDe, fechaHoy, bandasCalibre } from "./rutina.js";
import { clonar, deshacerRegistroBase } from "./partida.js";

function sdcPodia(e) {
  return (e && e.podia) || {};
}
function sdcVistos(e) {
  return (e && e.vistos) || {};
}
function sdcPrimeras(e) {
  return (e && e.primeras) || [];
}
function sdcPrimeraAdd(e, tx, og) {
  var l = sdcPrimeras(e).slice();
  l.unshift({ fecha: fechaHoy(), texto: tx, origen: og });
  if (l.length > 120) l.length = 120;
  e.primeras = l;
  return e;
}
function sdcPrimerasHook(r, rp) {
  if (!r || !r.state) return r;
  var e = r.state,
    gs = ["squat", "pushup", "back", "abs"],
    md = modalidadDelDia(e.profile, e.today.date, e.today.modality),
    src = sdcPodia(e),
    pd = {},
    k;
  for (k in src) pd[k] = src[k];
  var hubo = !1,
    vs = {},
    sv = sdcVistos(e),
    hv = !1;
  for (k in sv) vs[k] = sv[k];
  for (var q = 0; q < gs.length; q++) {
    var g = gs[q];
    if (!rp || !(rp[g] > 0)) continue;
    var ex = ejercicioDe(g, e.progress.rank, md);
    if (!ex || !ex.name) continue;
    vs[ex.name] || ((vs[ex.name] = !0), (hv = !0));
    if (pd[ex.name] !== !1) continue;
    pd[ex.name] = !0;
    hubo = !0;
    sdcPrimeraAdd(e, ex.name, "declarada");
    r.notices = r.notices || [];
    r.notices.push("Primera vez: " + ex.name + ". Antes no podías.");
  }
  if (hubo) e.podia = pd;
  if (hv) e.vistos = vs;
  return r;
}
function sdcJuego(p) {
  var j = p && p.tituloSet;
  if (j && sdcTitulos[j]) return j;
  var m = (p && p.modalities) || [];
  for (var k = 0; k < m.length; k++) if (sdcTitulos[m[k]]) return m[k];
  return "bodyweight";
}
function sdcRango(r, p) {
  var t = sdcTitulos[sdcJuego(p)];
  return (t && t[r]) || nombresRango[r] || String(r);
}
function sdcDescRango(r, p) {
  var t = sdcDescs[sdcJuego(p)];
  return (t && t[r]) || descRango[r] || "";
}
var sdcCalTit = {
    bodyweight: [
      "Primeros apoyos",
      "Base firme",
      "Aguante propio",
      "Trabajo largo",
      "Fuerza relativa",
      "Fuera de la tabla",
    ],
    gym: [
      "Primeros pesos",
      "Base para cargar",
      "Aguante entre series",
      "Sesión larga",
      "Carga alta",
      "Fuera de la tabla",
    ],
    flow: [
      "Primeras posiciones",
      "Piso firme",
      "Aguante continuo",
      "Tránsito largo",
      "Control fino",
      "Fuera de la tabla",
    ],
  },
  sdcCalFoco = {
    bodyweight: [
      "Acondicionamiento y movilidad",
      "Control motor y fuerza básica",
      "Volumen e intensidad moderada",
      "Series largas y variantes más difíciles",
      "Progresiones unilaterales",
      "Unilateral estricto e isometría",
    ],
    gym: [
      "Recorrido y técnica antes que carga",
      "Series cortas con carga conservadora",
      "Más series por sesión y progresión semanal",
      "Volumen alto con descansos bien usados",
      "Pocas repeticiones, mucha exigencia",
      "Carga máxima y descansos largos",
    ],
    flow: [
      "Movilidad y apoyo en el suelo",
      "Control motor y transiciones simples",
      "Encadenar sin frenar",
      "Secuencias largas y sostenes",
      "Inversiones y trabajo unilateral",
      "Secuencias completas sin cortes",
    ],
  };
function sdcCalT(i, p) {
  var t = sdcCalTit[sdcJuego(p)];
  return (t && t[i]) || (bandasCalibre[i] && bandasCalibre[i].label) || "";
}
function sdcCalF(i, p) {
  var t = sdcCalFoco[sdcJuego(p)];
  return (t && t[i]) || (bandasCalibre[i] && bandasCalibre[i].focus) || "";
}
function sdcRachaCalc(e) {
  var h = (e && e.history) || {},
    hoy = fechaHoy(),
    d = new Date(hoy + "T00:00:00"),
    n = 0,
    k,
    f,
    s;
  for (k = 0; k < 400; k++) {
    f = fechaLocal(d);
    s = h[f];
    if (f === hoy && !s) {
      d.setDate(d.getDate() - 1);
      continue;
    }
    if (s === "full" || s === "partial") n++;
    else if (s !== "rest" && s !== "shield") break;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
function sdcDiaPasado(e, f) {
  var a = clonar(e),
    l = [],
    hoy = fechaHoy();
  if (!f || f >= hoy) return { state: a, notices: l };
  var s = a.history[f];
  if (s && s !== "skipped" && s !== "missed")
    return { state: a, notices: ["Ese día ya estaba registrado."] };
  ((a.history[f] = "partial"),
    a.dayLog || (a.dayLog = {}),
    a.dayLog[f] || (a.dayLog[f] = { acts: [], reps: null, xp: 0 }),
    a.dayLog[f].acts.includes("Anotado después") || a.dayLog[f].acts.push("Anotado después"),
    a.week.sessionDates || (a.week.sessionDates = []),
    f >= a.week.weekStart &&
      !a.week.sessionDates.includes(f) &&
      (a.week.sessionDates.push(f), (a.week.trained = a.week.sessionDates.length)));
  var nr = sdcRachaCalc(a);
  return (
    nr > (a.streak.current || 0) &&
      ((a.streak.current = nr), (a.streak.best = Math.max(a.streak.best || 0, nr))),
    l.push("Anotado: entrenaste el " + f + ". Cuenta como día entrenado, sin XP."),
    { state: a, notices: l }
  );
}
function sdcMarcaK(md, mo) {
  return String(md) + "|" + String(mo);
}
function sdcMarca(e, k) {
  var t = e && e.today;
  if (!t) return null;
  var m = t.marcas && t.marcas[k];
  if (m) return m;
  var o = t.marca;
  return o && sdcMarcaK(o.mod, o.mode) === k ? o : null;
}
function sdcHoyReps(e) {
  var t = e && e.today;
  if (!t) return { squat: 0, pushup: 0, back: 0, abs: 0 };
  var d = e.dayLog && e.dayLog[t.date],
    r = d && d.reps;
  return r || t.reps || { squat: 0, pushup: 0, back: 0, abs: 0 };
}
function sdcHoyMeta(e, f) {
  var t = e && e.today,
    d = t && e.dayLog && e.dayLog[t.date],
    m = d && d.meta;
  return m || f || { squat: 0, pushup: 0, back: 0, abs: 0 };
}
function sdcSumaReps(a, b) {
  var g = ["squat", "pushup", "back", "abs"],
    o = {},
    k;
  for (k = 0; k < g.length; k++) o[g[k]] = ((a && a[g[k]]) || 0) + ((b && b[g[k]]) || 0);
  return o;
}
function sdcDeshacerHook(ant, r) {
  if (!r || !r.state || !r.state.undoSnapshot || !ant) return r;
  r.state.undoSnapshot.ach = (ant.achievements || []).slice();
  return r;
}
function sdcDeshacer(e) {
  var u = e && e.undoSnapshot,
    r = deshacerRegistroBase(e);
  if (!u || !u.snap || !e.today || u.date !== e.today.date) return r;
  var a = r.state,
    rp = u.reps || {},
    md = modalidadDelDia(a.profile, a.today.date, a.today.modality);
  a.month &&
    a.month.reps &&
    ["squat", "pushup", "back", "abs"].forEach(function (g) {
      a.month.reps[g] = Math.max(0, (a.month.reps[g] || 0) - (rp[g] || 0));
    });
  [a.lifetimeModalities, a.week && a.week.modalities, a.month && a.month.modalities].forEach(
    function (m) {
      m && m[md] > 0 && (m[md] -= 1);
    },
  );
  u.ach && (a.achievements = u.ach.slice());
  return r;
}
function sdcMetaHook(r, mt) {
  if (!r || !r.state || !mt) return r;
  var e = r.state,
    t = e.today,
    d = t && e.dayLog && e.dayLog[t.date];
  if (d) d.meta = sdcSumaReps(d.meta, mt);
  return r;
}
function sdcIncKg(kg, g) {
  var k = Number(kg) || 0;
  if (g === "squat") return k >= 40 ? 5 : 2.5;
  return k >= 20 ? 2.5 : 1;
}
function sdcSugKg(e, g, nom) {
  if (!nom) return null;
  var u = ((e && e.gymUlt) || {})[nom];
  if (!u || !u.kgs || !u.kgs.length) return null;
  var mx = 0,
    i;
  for (i = 0; i < u.kgs.length; i++) if (u.kgs[i] > mx) mx = u.kgs[i];
  if (mx <= 0) return null;
  var pc = u.pct === void 0 ? 1 : u.pct;
  return pc >= 0.999
    ? { kg: Math.round((mx + sdcIncKg(mx, g)) * 10) / 10, sube: !0 }
    : { kg: mx, sube: !1 };
}
function sdcGymSer(e) {
  return (e && e.gymSerieKg) || {};
}
function sdcGymUlt(e) {
  return (e && e.gymUlt) || {};
}
function sdcKgTxt(v) {
  var n = Number(v) || 0;
  return String(Math.round(n * 10) / 10).replace(".", ",");
}
function sdcTier(s) {
  var t = String(s || "");
  if (
    t.indexOf("Primera vez:") >= 0 ||
    t.indexOf("Cruzaste a") >= 0 ||
    t.indexOf("Subiste a nivel") >= 0 ||
    t.indexOf("Volviste al último rango") >= 0
  )
    return "epic";
  if (
    t.indexOf("Sesión corta") >= 0 ||
    t.indexOf("Ya no podés alcanzar") >= 0 ||
    t.indexOf("vuelve a empezar") >= 0
  )
    return "bad";
  if (
    t.indexOf("Logro desbloqueado") >= 0 ||
    t.indexOf("logros desbloqueados") >= 0 ||
    t.indexOf("Nuevo sistema desbloqueado") >= 0 ||
    t.indexOf("Recuperaste") >= 0 ||
    t.indexOf("Rutina completa") >= 0 ||
    t.indexOf("completada") >= 0 ||
    t.indexOf("Bono") >= 0 ||
    t.charAt(0) === "+"
  )
    return "good";
  return "info";
}
var sdcEstilo = {
  epic: { background: "rgba(255,184,79,0.16)", border: "2px solid #ffb84f", color: "#ffe2b0" },
  good: {
    background: "rgba(62,207,142,0.10)",
    border: "1px solid rgba(62,207,142,0.45)",
    color: "#bdf0d9",
  },
  bad: {
    background: "rgba(255,92,122,0.10)",
    border: "1px solid rgba(255,92,122,0.45)",
    color: "#ffc4ce",
  },
  info: {
    background: "rgba(79,157,255,0.08)",
    border: "1px solid rgba(79,157,255,0.35)",
    color: "#cfe0ff",
  },
};
var sdcOrden = { epic: 0, good: 1, bad: 2, info: 3 };

export {
  sdcPodia,
  sdcVistos,
  sdcPrimeras,
  sdcPrimeraAdd,
  sdcPrimerasHook,
  sdcJuego,
  sdcRango,
  sdcDescRango,
  sdcCalTit,
  sdcCalFoco,
  sdcCalT,
  sdcCalF,
  sdcRachaCalc,
  sdcDiaPasado,
  sdcMarcaK,
  sdcMarca,
  sdcHoyReps,
  sdcHoyMeta,
  sdcSumaReps,
  sdcDeshacerHook,
  sdcDeshacer,
  sdcMetaHook,
  sdcIncKg,
  sdcSugKg,
  sdcGymSer,
  sdcGymUlt,
  sdcKgTxt,
  sdcTier,
  sdcEstilo,
  sdcOrden,
};
