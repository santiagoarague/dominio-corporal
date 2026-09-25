// La partida: crear, cargar, registrar, deshacer, niveles, misiones, Umbral.
import { nivelUmbral, metrosPorPaso, rangos } from "../datos/rangos.js";
import { travesiaDelDia, xpPorKm, multReliquias, nodosExplorar } from "./explorar.js";
import { trenesJefe, combateInicial, terreno } from "./combate.js";
import { frasesVolver, frasesDiaDificil, primalInicial, fraseMascota } from "./primal.js";
import { dominioInicial, multImpulso, sdcMascota, sdcModDia, sdcPerk, sdcRacha } from "./tienda.js";
import { neuroInicial } from "../datos/salud.js";
import { sistemas, avisarSistemasNuevos, sistemaActivo, sistemaAbierto } from "./sistemas.js";
import { ultimos60Dias, revisarLogros, avisoCarga } from "../datos/logros.js";
import { modalidades } from "../datos/ejercicios.js";
import {
  inicioSemana,
  anotarDia,
  modalidadDelDia,
  metaDelDia,
  ejercicioDe,
  metaSemanal,
  diasParaBajarZ,
  pruebaUmbral,
  sdcGymXp,
  volumen,
  xpTotal,
  costoNivel,
  metaSemanalDefecto,
  modalidadesDe,
  diasRestantesSemana,
  multEnfoque,
  fechaHoy,
} from "./rutina.js";
import { sdcRango } from "./extras.js";
import { diasEntre } from "../ui/cuerpo.jsx";

function clonar(e) {
  return JSON.parse(JSON.stringify(e));
}
function crearPartida(e) {
  let a = fechaHoy();
  return {
    profile: { ...e, createdDate: a, weeklyGoal: e.weeklyGoal || metaSemanalDefecto },
    progress: { rank: e.startRank || "E", level: 1, currentXP: 0 },
    today: {
      date: a,
      mode: "pending",
      modality: null,
      rank: e.startRank || "E",
      reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
      stretchDone: !1,
      completed: !1,
      fullCompletion: !1,
      xpEarned: 0,
      doneModalities: [],
    },
    week: {
      weekStart: inicioSemana(a),
      restDayUsed: !1,
      stretchCount: 0,
      trained: 0,
      fullDays: 0,
      xp: 0,
      dungeons: 0,
      primal: 0,
      sessionDates: [],
      reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
      modalities: { bodyweight: 0, gym: 0, flow: 0 },
    },
    dayLog: {},
    lastWeekSummary: null,
    streak: { missed: 0, current: 0, best: 0, flexBuff: !1 },
    ascension: { pending: !1 },
    exploration: {
      lifetimeKm: 0,
      pendingKm: 0,
      today: { date: a, km: 0 },
      unlockedIndex: -1,
      relics: [],
    },
    dungeon: { date: a, ...travesiaDelDia(e.startRank || "E") },
    history: {},
    month: misVacio(misMes(a)),
    missions: {
      weekKey: "",
      monthKey: "",
      weekly: null,
      monthly: null,
      weeklyDone: !1,
      monthlyDone: !1,
    },
    lifetimeReps: { squat: 0, pushup: 0, back: 0, abs: 0 },
    lastTrained: { squat: null, pushup: null, back: null, abs: null },
    lifetimeModalities: { bodyweight: 0, gym: 0, flow: 0 },
    dungeonsCleared: 0,
    maxComebackStreak: 0,
    achievements: [],
    combat: combateInicial(),
    primal: primalInicial(),
    loadWarnedDate: null,
    ui: { collapsed: {} },
    skills: {},
    care: { today: { date: a, done: [] }, lifetime: 0 },
    neuro: neuroInicial(),
    unlockAll: !1,
    disabled: [],
    seenUnlocks: [],
    weeklyStreak: 0,
    bestWeeklyStreak: 0,
    dominion: dominioInicial(),
    records: { squat: 0, pushup: 0, back: 0, abs: 0 },
    gymWeights: { squat: 0, pushup: 0, back: 0, abs: 0 },
    lifetimeVolumeKg: 0,
    bestLiftKg: { squat: 0, pushup: 0, back: 0, abs: 0 },
    lastFullDate: null,
    zDemoted: !1,
    lifetimePrimal: 0,
    lifetimeStretch: 0,
  };
}
function subirNiveles(e, a) {
  for (;;) {
    let l = nivelUmbral[e.progress.rank];
    if (l && e.progress.level >= l) {
      e.ascension.pending = !0;
      break;
    }
    let n = costoNivel(e.progress.level);
    if (e.progress.currentXP >= n) {
      ((e.progress.currentXP -= n),
        (e.progress.level += 1),
        a.push(`Subiste a nivel ${e.progress.level}.`));
      let o = avisarSistemasNuevos(e);
      ((e = o.state), o.notices.forEach((s) => a.push(s)));
    } else break;
  }
  return e;
}
function cargarPartida(e) {
  let a = clonar(e),
    l = [],
    n = fechaHoy();
  (a.exploration ||
    (a.exploration = {
      lifetimeKm: 0,
      pendingKm: 0,
      today: { date: n, km: 0 },
      unlockedIndex: -1,
      relics: [],
    }),
    a.exploration.lifetimeKm === void 0 &&
      ((a.exploration.lifetimeKm =
        Math.round((((a.exploration.lifetimeSteps || 0) * metrosPorPaso) / 1e3) * 100) / 100),
      (a.exploration.pendingKm = 0),
      (a.exploration.today = { date: n, km: 0 }),
      (a.exploration.relics = []),
      delete a.exploration.lifetimeSteps),
    a.exploration.relics || (a.exploration.relics = []),
    a.exploration.pendingKm === void 0 && (a.exploration.pendingKm = 0),
    a.dungeon || (a.dungeon = { date: n, ...travesiaDelDia(a.progress.rank) }),
    a.today.rank || (a.today.rank = a.progress.rank),
    a.today.fullCompletion === void 0 && (a.today.fullCompletion = !1),
    a.streak.current === void 0 && (a.streak.current = 0),
    a.streak.best === void 0 && (a.streak.best = 0),
    a.history || (a.history = {}),
    a.lifetimeReps || (a.lifetimeReps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.lastTrained || (a.lastTrained = { squat: null, pushup: null, back: null, abs: null }),
    a.dungeonsCleared === void 0 && (a.dungeonsCleared = 0),
    a.maxComebackStreak === void 0 && (a.maxComebackStreak = 0),
    a.achievements || (a.achievements = []),
    a.combat || (a.combat = combateInicial()),
    a.combat.roundId === void 0 && (a.combat.roundId = 0),
    a.combat.loadFactor === void 0 && (a.combat.loadFactor = 1),
    a.combat.damageFactor === void 0 && (a.combat.damageFactor = 1),
    terreno(a.combat.villainIndex).isBoss &&
      !a.combat.bossCats &&
      (a.combat.bossCats = trenesJefe(a.combat.lastExercise)),
    a.primal || (a.primal = primalInicial()),
    a.loadWarnedDate === void 0 && (a.loadWarnedDate = null),
    a.skills || (a.skills = {}),
    a.care || (a.care = { today: { date: n, done: [] }, lifetime: 0 }),
    a.neuro || (a.neuro = neuroInicial()),
    a.unlockAll === void 0 && (a.unlockAll = !1),
    a.disabled || (a.disabled = []),
    a.seenUnlocks ||
      (a.seenUnlocks = sistemas.filter((s) => sistemaAbierto(a, s.id)).map((s) => s.id)),
    a.ui || (a.ui = { collapsed: {} }),
    a.ui.collapsed || (a.ui.collapsed = {}),
    a.ui.collapsed.ayuda === void 0 && (a.ui.collapsed.ayuda = !1),
    a.ui.ayudaAuto === void 0 && ((a.ui.ayudaAuto = 1), (a.ui.collapsed.ayuda = !1)),
    a.dominion || (a.dominion = dominioInicial()),
    a.dominion.perks || (a.dominion.perks = []),
    a.lifetimeModalities || (a.lifetimeModalities = { bodyweight: 0, gym: 0, flow: 0 }),
    a.records || (a.records = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.gymWeights || (a.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.lifetimeVolumeKg === void 0 && (a.lifetimeVolumeKg = 0),
    a.bestLiftKg || (a.bestLiftKg = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.lastFullDate === void 0 && (a.lastFullDate = null),
    a.zDemoted === void 0 && (a.zDemoted = !1),
    a.lifetimePrimal === void 0 && (a.lifetimePrimal = 0),
    a.lifetimeStretch === void 0 && (a.lifetimeStretch = 0),
    a.week.sessionDates || (a.week.sessionDates = []),
    a.week.reps || (a.week.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    a.dayLog || (a.dayLog = {}),
    a.week.trained === void 0 &&
      ((a.week.trained = 0),
      (a.week.fullDays = 0),
      (a.week.xp = 0),
      (a.week.dungeons = 0),
      (a.week.primal = 0)),
    a.lastWeekSummary === void 0 && (a.lastWeekSummary = null),
    a.combat.todayDefeated || (a.combat.todayDefeated = { date: n, count: 0 }),
    a.profile.createdDate || (a.profile.createdDate = n),
    a.profile.pet || (a.profile.pet = { type: "dog", name: "Rocky" }),
    a.profile.focusProfile || (a.profile.focusProfile = "salud"),
    (!a.profile.modalities || !a.profile.modalities.length) &&
      (a.profile.modalities = ["bodyweight"]),
    a.profile.weeklyGoal || (a.profile.weeklyGoal = metaSemanalDefecto),
    a.weeklyStreak === void 0 && (a.weeklyStreak = 0),
    a.bestWeeklyStreak === void 0 && (a.bestWeeklyStreak = 0));
  let o = inicioSemana(n);
  if (a.week.weekStart !== o) {
    a.week.stretchCount >= 2
      ? ((a.streak.flexBuff = !0),
        l.push("Buff de Flexibilidad activo esta semana: +10% XP por haber estirado 2+ veces."))
      : (a.streak.flexBuff = !1);
    let s = (a.week.trained || 0) >= metaSemanal(a);
    (s
      ? ((a.weeklyStreak = (a.weeklyStreak || 0) + 1),
        (a.bestWeeklyStreak = Math.max(a.bestWeeklyStreak || 0, a.weeklyStreak)),
        l.push(
          `Semana cumplida: ${a.week.trained} de ${metaSemanal(a)} sesiones. Racha semanal: ${a.weeklyStreak}.`,
        ))
      : ((a.week.trained || 0) > 0 || a.weeklyStreak > 0) &&
        ((a.weeklyStreak = 0),
        l.push(
          `Cerraste la semana con ${a.week.trained || 0} de ${metaSemanal(a)} sesiones. La racha semanal vuelve a empezar.`,
        )),
      (a.lastWeekSummary = {
        metGoal: s,
        goal: metaSemanal(a),
        weekStart: a.week.weekStart,
        trained: a.week.trained || 0,
        fullDays: a.week.fullDays || 0,
        xp: a.week.xp || 0,
        dungeons: a.week.dungeons || 0,
        primal: a.week.primal || 0,
        stretches: a.week.stretchCount || 0,
        seen: !1,
      }),
      (a.week = {
        weekStart: o,
        restDayUsed: !1,
        stretchCount: 0,
        trained: 0,
        fullDays: 0,
        xp: 0,
        dungeons: 0,
        primal: 0,
        sessionDates: [],
        reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
        modalities: { bodyweight: 0, gym: 0, flow: 0 },
      }));
  }
  if (a.today.date !== n) {
    if (
      !a.today.completed &&
      !(a.week.sessionDates || []).includes(a.today.date) &&
      a.dominion.shields > 0
    )
      ((a.dominion.shields -= 1),
        (a.history[a.today.date] = "shield"),
        l.push(
          `Un Escudo de Racha absorbió el día ${a.today.date}: tu racha sigue intacta. Te quedan ${a.dominion.shields}.`,
        ));
    else if (!a.today.completed && !(a.week.sessionDates || []).includes(a.today.date)) {
      let s = metaSemanal(a),
        u = a.week.trained || 0,
        c = Math.max(0, diasRestantesSemana(a.today.date) - 1),
        r = u + c >= s;
      if (((a.streak.current = 0), r))
        ((a.history[a.today.date] = "skipped"),
          l.push(
            `Día de descanso no planificado. Seguís en camino: ${u}/${s} sesiones esta semana, te quedan ${c} días.`,
          ));
      else {
        ((a.streak.missed += 1), (a.history[a.today.date] = "missed"));
        (l.push(
          `Ya no podés alcanzar tus ${s} sesiones esta semana. La racha vuelve a empezar, pero tu XP queda intacta.`,
        ),
          l.push(fraseMascota(frasesVolver, a.today.date, a.profile.pet && a.profile.pet.name)));
      }
    }
    ((a.today = {
      date: n,
      mode: "pending",
      modality: null,
      rank: a.progress.rank,
      reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
      stretchDone: !1,
      completed: !1,
      fullCompletion: !1,
      xpEarned: 0,
      doneModalities: [],
    }),
      (a.history = ultimos60Dias(a.history, n)));
  }
  if (a.progress.rank === "Z" && a.lastFullDate) {
    let s = diasEntre(a.lastFullDate, n);
    s !== null &&
      s >= diasParaBajarZ &&
      ((a.progress.rank = "S"),
      (a.zDemoted = !0),
      l.push(
        `Llevás ${s} días sin una rutina completa: bajás al rango anterior hasta tu próximo día perfecto.`,
      ));
  }
  return (
    a.dungeon.date !== n &&
      ((a.dungeon = { date: n, ...travesiaDelDia(a.progress.rank) }),
      a.dungeon.available && l.push(`Travesía de hoy: ${a.dungeon.name}`)),
    (a = misRevisar(a, l)),
    (a = subirNiveles(a, l)),
    { state: a, notices: l }
  );
}
function nivelDesdeXp(e) {
  let a = 1,
    l = Math.max(0, e);
  for (; l >= costoNivel(a);) ((l -= costoNivel(a)), (a += 1));
  return { level: a, currentXP: l };
}
var misGrupos = {
  squat: "piernas y glúteos",
  pushup: "pecho y hombros",
  back: "espalda",
  abs: "core",
};
function misMes(d) {
  return d.slice(0, 7);
}
function misVacio(k) {
  return {
    key: k,
    reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
    sessions: 0,
    modalities: { bodyweight: 0, gym: 0, flow: 0 },
  };
}
function misPeorGrupo(e) {
  let hoy = fechaHoy(),
    peor = "back",
    dias = -1;
  for (let g of ["squat", "pushup", "back", "abs"]) {
    let lt = e.lastTrained && e.lastTrained[g],
      d = lt ? diasEntre(lt, hoy) : 999;
    if (d > dias) {
      dias = d;
      peor = g;
    }
  }
  return peor;
}
function misGenerar(e, amb) {
  let g = misPeorGrupo(e),
    u = metaDelDia(e),
    base = Math.max(3, u[g] || 5),
    meta = metaSemanal(e),
    act = modalidadesDe(e.profile);
  if (amb === "week") {
    let sin = act.filter((m) => !(e.week.modalities && e.week.modalities[m]));
    if (act.length > 1 && sin.length)
      return { kind: "modality", modality: sin[0], target: 2, xp: 120, pd: 2 };
    return { kind: "reps", group: g, target: Math.round(base * meta * 1.5), xp: 120, pd: 2 };
  }
  let sinMes = act.filter((m) => !(e.month && e.month.modalities && e.month.modalities[m]));
  if (act.length > 1 && sinMes.length)
    return { kind: "modality", modality: sinMes[0], target: 5, xp: 500, pd: 5 };
  return { kind: "reps", group: g, target: Math.round(base * meta * 6), xp: 500, pd: 5 };
}
function misProgreso(e, m, amb) {
  let c = amb === "week" ? e.week : e.month;
  if (!c || !m) return 0;
  return m.kind === "reps"
    ? (c.reps && c.reps[m.group]) || 0
    : (c.modalities && c.modalities[m.modality]) || 0;
}
function misTexto(m, amb) {
  if (!m) return "";
  let p = amb === "week" ? "esta semana" : "este mes";
  return m.kind === "reps"
    ? `Lo que menos tocaste: ${misGrupos[m.group]}. ${m.target} repeticiones ${p} y eso cambia.`
    : `Todavía no sabés qué te hace ${(modalidades.find((r) => r.id === m.modality) || modalidades[0]).name}. Entrená con eso ${m.target} veces ${p}.`;
}
function misRevisar(e, notas) {
  e.week.modalities || (e.week.modalities = { bodyweight: 0, gym: 0, flow: 0 });
  e.month || (e.month = misVacio(misMes(fechaHoy())));
  e.missions ||
    (e.missions = {
      weekKey: "",
      monthKey: "",
      weekly: null,
      monthly: null,
      weeklyDone: !1,
      monthlyDone: !1,
    });
  let hoy = fechaHoy(),
    sem = inicioSemana(hoy),
    mes = misMes(hoy);
  if (e.month.key !== mes) e.month = misVacio(mes);
  if (!sistemaActivo(e, "missions")) return e;
  if (e.missions.weekKey !== sem) {
    ((e.missions.weekKey = sem),
      (e.missions.weekly = misGenerar(e, "week")),
      (e.missions.weeklyDone = !1));
  }
  if (e.missions.monthKey !== mes) {
    ((e.missions.monthKey = mes),
      (e.missions.monthly = misGenerar(e, "month")),
      (e.missions.monthlyDone = !1));
  }
  for (let amb of ["week", "month"]) {
    let kk = amb === "week" ? "weekly" : "monthly",
      dk = amb === "week" ? "weeklyDone" : "monthlyDone",
      m = e.missions[kk];
    if (m && !e.missions[dk] && misProgreso(e, m, amb) >= m.target) {
      ((e.missions[dk] = !0),
        (e.progress.currentXP += m.xp),
        (e.dominion.points += m.pd),
        notas.push(
          `Misión ${amb === "week" ? "semanal" : "mensual"} completada: +${m.xp} XP y +${m.pd} PD.`,
        ));
    }
  }
  return e;
}
function registrarRutina(original, modo, repsSesion, modificadorOk, gvol) {
  let snap = {
      records: clonar(original.records || {}),
      lastTrained: clonar(original.lastTrained || {}),
      bestLiftKg: clonar(original.bestLiftKg || {}),
      volume: original.lifetimeVolumeKg || 0,
      today: clonar(original.today),
      history: original.history[original.today.date] || null,
      dayLog:
        original.dayLog && original.dayLog[original.today.date]
          ? clonar(original.dayLog[original.today.date])
          : null,
      streakBest: original.streak.best,
      streakMissed: original.streak.missed,
      lastFullDate: original.lastFullDate,
      zDemoted: original.zDemoted,
      maxComeback: original.maxComebackStreak,
      pdBefore: original.dominion.points,
      hadSession: (original.week.sessionDates || []).includes(original.today.date),
    },
    partida = clonar(original),
    avisos = [],
    metaHoy = metaDelDia(partida),
    metaTotal = metaHoy.squat + metaHoy.pushup + metaHoy.back + metaHoy.abs,
    repsTotal = repsSesion.squat + repsSesion.pushup + (repsSesion.back || 0) + repsSesion.abs,
    pct = metaTotal > 0 ? repsTotal / metaTotal : 0,
    xp = repsTotal;
  // En gimnasio las reps ya no suben con el rango (volumen), asi que cada rep vale
  // segun el rango y el ejercicio (sdcGymXp): una rutina completa paga lo mismo que
  // cuando subian.
  modalidadDelDia(partida.profile, partida.today.date, partida.today.modality) === "gym" &&
    (xp = Math.round(
      ["squat", "pushup", "back", "abs"].reduce(
        (suma, grupo) => suma + (repsSesion[grupo] || 0) * sdcGymXp(grupo, partida.progress.rank),
        0,
      ),
    ));
  let marcasCarga = [];
  if (modalidadDelDia(partida.profile, partida.today.date, partida.today.modality) === "gym")
    for (let grupo of ["squat", "pushup", "back", "abs"]) {
      let gv = gvol && gvol[grupo],
        kgMax = gv && gv.max > 0 ? gv.max : (partida.gymWeights && partida.gymWeights[grupo]) || 0,
        repsGrupo = repsSesion[grupo] || 0,
        volKg = gv && gv.vol > 0 ? gv.vol : kgMax * repsGrupo;
      if (kgMax > 0 && volKg > 0) {
        partida.lifetimeVolumeKg = Math.round((partida.lifetimeVolumeKg || 0) + volKg);
        kgMax > (partida.bestLiftKg[grupo] || 0) && (partida.bestLiftKg[grupo] = kgMax);
        let nombre = gv && gv.nom;
        if (nombre) {
          partida.gymUlt || (partida.gymUlt = {});
          let mejorKg = (partida.gymUlt[nombre] && partida.gymUlt[nombre].best) || 0;
          kgMax > mejorKg &&
            mejorKg > 0 &&
            marcasCarga.push({ nom: nombre, kg: kgMax, pv: mejorKg });
          partida.gymUlt[nombre] = {
            kgs: gv.kgs,
            fecha: partida.today.date,
            best: Math.max(mejorKg, kgMax),
            pct: metaHoy[grupo] > 0 ? Math.min(1.5, repsGrupo / metaHoy[grupo]) : 1,
          };
        }
      }
    }
  for (let grupo of ["squat", "pushup", "back", "abs"]) {
    let hechas = repsSesion[grupo] || 0;
    ((partida.lifetimeReps[grupo] += hechas),
      (partida.week.reps[grupo] = (partida.week.reps[grupo] || 0) + hechas),
      partida.month && (partida.month.reps[grupo] = (partida.month.reps[grupo] || 0) + hechas),
      hechas > 0 && (partida.lastTrained[grupo] = partida.today.date));
  }
  let hayRecord = !1;
  for (let grupo of ["squat", "pushup", "back", "abs"]) {
    let hechas = repsSesion[grupo] || 0;
    hechas > (partida.records[grupo] || 0) &&
      ((partida.records[grupo] = hechas),
      (partida.lifetimeReps[grupo] || 0) > hechas && (hayRecord = !0));
  }
  (() => {
    let pd =
      (partida.today.doneModalities || []).length > 0 ? 0 : pct >= 1 ? 3 : pct >= 0.5 ? 1 : 0;
    pd > 0 && ((partida.dominion.points += pd), avisos.push(`+${pd} Puntos de Dominio.`));
  })();
  let sesionesPrevias = (partida.today.doneModalities || []).length;
  let yaFull = partida.history[partida.today.date] === "full";
  // El bono por rutina completa es igual para los tres enfoques: si se
  // multiplicaba por el xpMult, fuerza (1.5) cobraba ~20% mas que salud por
  // menos reps cuando la meta es chica.
  let bono = pct >= 1 ? 30 : 0;
  if (pct >= 1)
    ((xp += 30),
      (partida = anotarDia(partida, "Rutina completa")),
      yaFull ||
        ((partida.history[partida.today.date] = "full"),
        (partida.lastFullDate = partida.today.date),
        (partida.week.fullDays = (partida.week.fullDays || 0) + 1)),
      partida.zDemoted &&
        ((partida.zDemoted = !1),
        (partida.progress.rank = "Z"),
        avisos.push("Volviste al último rango. Las metas vuelven a salir de tus récords.")),
      avisos.push(
        "¡Rutina completa! +30 XP de bono por constancia. Hoy es un día perfecto: si tenés un Umbral pendiente, podés cruzarlo.",
      ));
  else if (pct >= 0.5)
    ((partida = anotarDia(partida, "Rutina parcial")),
      yaFull || (partida.history[partida.today.date] = "partial"),
      avisos.push("Rutina parcial registrada. Sin bono de constancia, sin penalización."));
  else if (sesionesPrevias > 0)
    avisos.push("Sesión extra demasiado corta. Sin bono, sin penalización.");
  else {
    ((partida.streak.missed += 1),
      (partida.streak.current = 0),
      (partida.history[partida.today.date] = "missed"));
    (avisos.push(
      `Sesión corta (${Math.round(pct * 100)}%). Conservas tu XP, pero la racha vuelve a empezar.`,
    ),
      avisos.push(
        fraseMascota(
          frasesDiaDificil,
          partida.today.date,
          partida.profile.pet && partida.profile.pet.name,
        ),
      ));
  }
  ((xp = Math.round((xp - bono) * multEnfoque(partida)) + bono),
    (xp = Math.round(xp * sdcRacha(partida))),
    (xp = Math.round(xp * sdcPerk(partida))),
    (() => {
      if (!modificadorOk) return;
      let modDia = sdcModDia(
        modalidadDelDia(partida.profile, partida.today.date, partida.today.modality),
        partida.today.date,
      );
      modDia &&
        ((xp = Math.round(xp * (1 + modDia.x))),
        avisos.push(`Modificador ${modDia.n}: +${Math.round(modDia.x * 100)}% XP.`));
    })(),
    (() => {
      let racha = (partida.streak && partida.streak.current) || 0;
      racha >= 3 &&
        avisos.push(
          `Racha de ${racha} ${racha === 1 ? "día" : "días"}: +${Math.round((sdcRacha(partida) - 1) * 100)}% XP.`,
        );
    })(),
    partida.streak.flexBuff && (xp = Math.round(xp * 1.1)),
    (xp = Math.round(xp * multImpulso(partida))),
    sesionesPrevias > 0 &&
      ((xp = Math.round(xp * (1 + 0.25 * sesionesPrevias))),
      avisos.push(`Bono por combinar estilos: +${25 * sesionesPrevias}% XP.`)),
    (() => {
      if (!marcasCarga.length) return;
      let xpMarcas = 25 * marcasCarga.length;
      xp += xpMarcas;
      let detalle = marcasCarga
        .map((marca) => marca.nom + " " + marca.pv + " → " + marca.kg + " kg")
        .join(" · ");
      avisos.push(`+${xpMarcas} XP: nueva marca de carga. ${detalle}`);
    })(),
    (partida.progress.currentXP += xp),
    (partida = subirNiveles(partida, avisos)),
    (partida.today.completed = !0),
    (partida.today.doneModalities = [...(partida.today.doneModalities || [])]),
    ((modalidad) => {
      (partida.today.doneModalities.includes(modalidad) ||
        partida.today.doneModalities.push(modalidad),
        partida.lifetimeModalities ||
          (partida.lifetimeModalities = { bodyweight: 0, gym: 0, flow: 0 }),
        (partida.lifetimeModalities[modalidad] = (partida.lifetimeModalities[modalidad] || 0) + 1),
        partida.week.modalities &&
          (partida.week.modalities[modalidad] = (partida.week.modalities[modalidad] || 0) + 1),
        partida.month &&
          (partida.month.modalities[modalidad] = (partida.month.modalities[modalidad] || 0) + 1));
    })(modalidadDelDia(partida.profile, partida.today.date, partida.today.modality)),
    (partida.today.mode = modo),
    (partida.today.reps = repsSesion),
    (partida.today.fullCompletion = pct >= 1),
    (partida.today.rank = partida.progress.rank),
    (partida.today.xpEarned = (partida.today.xpEarned || 0) + xp),
    (partida.week.xp = (partida.week.xp || 0) + xp),
    pct >= 0.5 && avisos.push(sdcMascota(partida, pct, hayRecord)),
    partida.dayLog[partida.today.date] &&
      ((partida.dayLog[partida.today.date].reps = ((previas) => ({
        squat: (previas.squat || 0) + (repsSesion.squat || 0),
        pushup: (previas.pushup || 0) + (repsSesion.pushup || 0),
        back: (previas.back || 0) + (repsSesion.back || 0),
        abs: (previas.abs || 0) + (repsSesion.abs || 0),
      }))(partida.dayLog[partida.today.date].reps || {})),
      (partida.dayLog[partida.today.date].xp = (partida.dayLog[partida.today.date].xp || 0) + xp)));
  ((partida = misRevisar(partida, avisos)), (partida = subirNiveles(partida, avisos)));
  let conLogros = revisarLogros(partida),
    conAvisos = { state: conLogros.state, notices: [...avisos, ...conLogros.notices] },
    conCarga = avisoCarga(conAvisos.state),
    final = conCarga.state;
  return (
    (final.undoSnapshot = {
      date: final.today.date,
      snap: snap,
      xp: xp,
      pd: final.dominion.points - snap.pdBefore,
      reps: {
        squat: repsSesion.squat || 0,
        pushup: repsSesion.pushup || 0,
        back: repsSesion.back || 0,
        abs: repsSesion.abs || 0,
      },
      fullDay: pct >= 1,
    }),
    { state: final, notices: [...conAvisos.notices, ...conCarga.notices] }
  );
}
function deshacerRegistroBase(e) {
  let a = clonar(e),
    l = a.undoSnapshot;
  if (!l || l.date !== a.today.date || !l.snap)
    return { state: a, notices: ["No hay nada que deshacer hoy."] };
  let n = l.date,
    o = l.snap,
    s = xpTotal(a.progress.level, a.progress.currentXP) - (l.xp || 0),
    u = nivelDesdeXp(s);
  ((a.progress.level = u.level),
    (a.progress.currentXP = u.currentXP),
    (a.week.xp = Math.max(0, (a.week.xp || 0) - (l.xp || 0))),
    (a.dominion.points = Math.max(0, a.dominion.points - (l.pd || 0))));
  for (let r of ["squat", "pushup", "back", "abs"])
    ((a.lifetimeReps[r] = Math.max(0, a.lifetimeReps[r] - (l.reps[r] || 0))),
      (a.week.reps[r] = Math.max(0, (a.week.reps[r] || 0) - (l.reps[r] || 0))));
  ((a.records = clonar(o.records)),
    (a.lastTrained = clonar(o.lastTrained)),
    (a.bestLiftKg = clonar(o.bestLiftKg)),
    (a.lifetimeVolumeKg = o.volume),
    (a.lastFullDate = o.lastFullDate),
    (a.zDemoted = o.zDemoted),
    (a.maxComebackStreak = o.maxComeback),
    (a.streak.missed = o.streakMissed),
    l.fullDay && (a.week.fullDays = Math.max(0, (a.week.fullDays || 0) - 1)));
  let c = ((a.dayLog[n] && a.dayLog[n].acts) || []).filter(
    (r) => r !== "Rutina completa" && r !== "Rutina parcial",
  );
  return (
    c.length === 0
      ? ((a.week.sessionDates = (a.week.sessionDates || []).filter((r) => r !== n)),
        (a.week.trained = a.week.sessionDates.length),
        o.hadSession ||
          ((a.streak.current = Math.max(0, a.streak.current - 1)), (a.streak.best = o.streakBest)),
        o.history ? (a.history[n] = o.history) : delete a.history[n],
        o.dayLog ? (a.dayLog[n] = o.dayLog) : delete a.dayLog[n])
      : ((a.dayLog[n] = {
          acts: c,
          reps: null,
          xp: Math.max(0, ((a.dayLog[n] && a.dayLog[n].xp) || 0) - (l.xp || 0)),
        }),
        (a.history[n] = "partial")),
    (a.today = clonar(o.today)),
    delete a.undoSnapshot,
    { state: a, notices: ["Rutina deshecha. Lo que hiciste aparte se conserva."] }
  );
}
function usarDescanso(e) {
  let a = clonar(e),
    l = a.streak.missed;
  ((a.today.mode = "rest"),
    (a.today.completed = !0),
    (a.today.fullCompletion = !1),
    (a.week.restDayUsed = !0),
    l >= 3 && (a.maxComebackStreak = Math.max(a.maxComebackStreak || 0, l)),
    (a.streak.missed = 0),
    (a.history[a.today.date] = "rest"));
  let n = ["Día de descanso registrado. Sin XP, sin penalización."],
    o = revisarLogros(a);
  return { state: o.state, notices: [...n, ...o.notices] };
}
function registrarEstiramiento(e, hh, tt) {
  let a = clonar(e),
    l = [];
  if (a.today.stretchDone) return { state: a, notices: l };
  let fr = tt && tt > 0 ? Math.max(0, Math.min(1, (hh || 0) / tt)) : 1;
  if (fr < 0.34)
    return {
      state: a,
      notices: [
        "Estiramiento cortado muy temprano. Sin XP, pero sin penalización: volvé cuando quieras.",
      ],
    };
  ((a.today.stretchDone = !0), (a.lifetimeStretch = (a.lifetimeStretch || 0) + 1));
  let ent = fr >= 0.999;
  ent && (a.week.stretchCount += 1);
  let n = Math.round(25 * fr);
  (a.streak.flexBuff && (n = Math.round(n * 1.1)),
    (n = Math.round(n * multImpulso(a))),
    (a.progress.currentXP += n),
    (a.today.xpEarned = (a.today.xpEarned || 0) + n),
    l.push(
      ent
        ? `+${n} XP por estiramiento. Llevás ${a.week.stretchCount}/2 esta semana.`
        : `+${n} XP por lo que alcanzaste a estirar. Para que cuente en tu semana hay que llegar al final.`,
    ),
    (a = subirNiveles(a, l)));
  let o = revisarLogros(a);
  return { state: o.state, notices: [...l, ...o.notices] };
}
function completarTravesia(e) {
  let a = clonar(e),
    l = [];
  if (!a.dungeon.available || a.dungeon.completed) return { state: a, notices: l };
  ((a.dungeon.completed = !0),
    (a.dungeonsCleared = (a.dungeonsCleared || 0) + 1),
    (a.week.dungeons = (a.week.dungeons || 0) + 1),
    (a = anotarDia(a, "Travesía")));
  let n = a.dungeon.rewardXP;
  (a.streak.flexBuff && (n = Math.round(n * 1.1)),
    (n = Math.round(n * multImpulso(a))),
    (a.progress.currentXP += n),
    (a.today.xpEarned = (a.today.xpEarned || 0) + n),
    l.push(`¡Travesía completada! "${a.dungeon.name}" +${n} XP.`),
    (a = subirNiveles(a, l)));
  let o = revisarLogros(a),
    s = { state: o.state, notices: [...l, ...o.notices] },
    u = avisoCarga(s.state);
  return { state: u.state, notices: [...s.notices, ...u.notices] };
}
function cruzarUmbralBase(e) {
  let a = clonar(e),
    l = [];
  if (!a.ascension.pending) return { state: a, notices: l };
  if (!(a.today.completed && a.today.fullCompletion)) return { state: a, notices: l };
  let n = rangos.indexOf(a.progress.rank);
  if (n < rangos.length - 1) {
    ((a.progress.rank = rangos[n + 1]),
      (a.ascension.pending = !1),
      (a = subirNiveles(a, l)),
      l.push(`¡Cruzaste a ${sdcRango(a.progress.rank, a.profile)}!`));
    let s = avisarSistemasNuevos(a);
    ((a = s.state), s.notices.forEach((u) => l.push(u)));
  }
  let o = revisarLogros(a);
  return { state: o.state, notices: [...l, ...o.notices] };
}
// El Umbral pide, ademas del nivel, un minimo de rutinas completas en el
// rango: el nivel se puede apurar (racha, impulsos, varias sesiones por dia,
// XP de otros sistemas) y el cuerpo necesita semanas con los ejercicios nuevos.
// Crece con el rango porque los ultimos duran anos. A quien hace rutinas
// completas no lo frena: aun entrenando todos los dias junta mas en cada rango.
var sdcUmbralMin = { E: 24, D: 36, C: 48, B: 60, A: 72, S: 84 };
function sdcUmbralMinDe(r) {
  return sdcUmbralMin[r] || 0;
}
function sdcRangoSig(r) {
  var k = rangos.indexOf(r);
  return k >= 0 && k < rangos.length - 1 ? rangos[k + 1] : null;
}
// Dias con rutina completa desde que empezo el rango actual. El dia en que se
// cruza cuenta para el rango anterior. Una partida de antes de esta regla no
// sabe cuando empezo su rango y cuenta toda su historia.
function sdcRangoCompletas(e) {
  var d = e.rangoDesde,
    desde = d && d.rank === e.progress.rank ? d.date : "",
    h = e.history || {},
    n = 0,
    f;
  for (f in h) if (h[f] === "full" && f > desde) n++;
  return n;
}
function sdcUmbralFalta(e) {
  if (e.umbralForzado === e.progress.rank) return 0;
  return Math.max(0, sdcUmbralMinDe(e.progress.rank) - sdcRangoCompletas(e));
}
// La prueba es una rutina completa del rango que viene (sus ejercicios y su
// volumen), repartida en las rondas del rango que se deja: prueba justo lo que
// se va a hacer cada dia despues de cruzar. Antes cada ronda era el 60-80% de esa
// rutina, y la prueba sumaba entre 2 y 6 rutinas encima de la del dia.
function sdcUmbralPrueba(e, mod) {
  var r = e.progress.rank,
    sig = sdcRangoSig(r) || r,
    p = e.profile,
    o = pruebaUmbral[r] || pruebaUmbral.C,
    v = volumen(sig, p.classification, p.focusProfile, mod, p.testResults),
    reps = {},
    nombres = {},
    g;
  for (g in v) {
    reps[g] = Math.max(1, Math.round(v[g] / o.rounds));
    nombres[g] = ejercicioDe(g, sig, mod, e.today && e.today.date).name;
  }
  return { rounds: o.rounds, note: o.note, reps: reps, nombres: nombres, rango: sig };
}
function sdcFaltanTxt(n) {
  return (
    (n === 1 ? "Te falta 1 rutina completa" : "Te faltan " + n + " rutinas completas") +
    " en este rango para cruzar el Umbral."
  );
}
function sdcCruzar(e) {
  var falta = e.ascension && e.ascension.pending ? sdcUmbralFalta(e) : 0;
  if (falta > 0) return { state: clonar(e), notices: [sdcFaltanTxt(falta)] };
  var antes = e.progress.rank,
    r = cruzarUmbralBase(e);
  if (r.state.progress.rank !== antes) {
    r.state.rangoDesde = { rank: r.state.progress.rank, date: r.state.today.date };
    delete r.state.umbralForzado;
  }
  return r;
}
function sumarTramo(e, a) {
  let l = clonar(e);
  if (!a || a <= 0) return { state: l, notices: [] };
  let n = fechaHoy();
  return (
    l.exploration.today.date !== n && (l.exploration.today = { date: n, km: 0 }),
    (l.exploration.pendingKm = Math.round((l.exploration.pendingKm + a) * 100) / 100),
    { state: l, notices: [] }
  );
}
function descartarTramos(e) {
  let a = clonar(e);
  return (
    (a.exploration.pendingKm = 0),
    { state: a, notices: ["Tramos sin consolidar descartados."] }
  );
}
function consolidarKm(e) {
  let a = clonar(e),
    l = [],
    n = a.exploration.pendingKm || 0;
  if (n <= 0) return { state: a, notices: ["No registraste ningún tramo todavía."], found: [] };
  let o = fechaHoy();
  (a.exploration.today.date !== o && (a.exploration.today = { date: o, km: 0 }),
    (a.exploration.today.km = Math.round((a.exploration.today.km + n) * 100) / 100),
    (a.exploration.lifetimeKm = Math.round((a.exploration.lifetimeKm + n) * 100) / 100),
    (a.exploration.pendingKm = 0));
  let s = [];
  nodosExplorar.forEach((r, p) => {
    a.exploration.lifetimeKm >= r.km &&
      p > a.exploration.unlockedIndex &&
      ((a.exploration.unlockedIndex = p),
      a.exploration.relics.includes(r.relic) || a.exploration.relics.push(r.relic),
      s.push(r));
  });
  let u = Math.round(n * xpPorKm * multReliquias(a));
  (a.streak.flexBuff && (u = Math.round(u * 1.1)),
    (u = Math.round(u * multImpulso(a))),
    (a.progress.currentXP += u),
    (a.today.xpEarned = (a.today.xpEarned || 0) + u),
    s.length &&
      ((a.dominion.points += s.length),
      l.push(`+${s.length} Punto${s.length === 1 ? "" : "s"} de Dominio por hallazgo.`)),
    l.push(`Expedición concluida: ${n} km · +${u} XP.`),
    (a = anotarDia(a, "Expedición")),
    (a = subirNiveles(a, l)));
  let c = revisarLogros(a);
  return { state: c.state, notices: [...l, ...c.notices], found: s };
}
async function escribirPuntoRetorno(e) {
  try {
    let a = await window.claude.use("db");
    return a ? (await a.doc("player/snapshot").set(e), !0) : !1;
  } catch (a) {
    return !1;
  }
}
async function leerPuntoRetorno() {
  try {
    let e = await window.claude.use("db");
    if (!e) return null;
    let a = await e.doc("player/snapshot").get();
    return a.exists ? a.data() : null;
  } catch (e) {
    return null;
  }
}
async function leerPartida() {
  try {
    let e = await window.claude.use("db");
    if (!e) return null;
    let a = await e.doc("player/state").get();
    return a.exists ? a.data() : null;
  } catch (e) {
    return (console.error("Error cargando progreso", e), null);
  }
}
async function guardarPartida(e) {
  try {
    let a = await window.claude.use("db");
    if (!a) return;
    await a.doc("player/state").set(e);
  } catch (a) {
    console.error("No se pudo guardar el progreso", a);
  }
}

export {
  clonar,
  crearPartida,
  subirNiveles,
  cargarPartida,
  nivelDesdeXp,
  misGrupos,
  misMes,
  misVacio,
  misPeorGrupo,
  misGenerar,
  misProgreso,
  misTexto,
  misRevisar,
  registrarRutina,
  deshacerRegistroBase,
  usarDescanso,
  registrarEstiramiento,
  completarTravesia,
  cruzarUmbralBase,
  sdcUmbralMin,
  sdcUmbralMinDe,
  sdcRangoSig,
  sdcRangoCompletas,
  sdcUmbralFalta,
  sdcUmbralPrueba,
  sdcFaltanTxt,
  sdcCruzar,
  sumarTramo,
  descartarTramos,
  consolidarKm,
  escribirPuntoRetorno,
  leerPuntoRetorno,
  leerPartida,
  guardarPartida,
};
