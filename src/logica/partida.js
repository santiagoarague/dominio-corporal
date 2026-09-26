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

function clonar(valor) {
  return JSON.parse(JSON.stringify(valor));
}
function crearPartida(perfil) {
  let hoy = fechaHoy();
  return {
    profile: { ...perfil, createdDate: hoy, weeklyGoal: perfil.weeklyGoal || metaSemanalDefecto },
    progress: { rank: perfil.startRank || "E", level: 1, currentXP: 0 },
    today: {
      date: hoy,
      mode: "pending",
      modality: null,
      rank: perfil.startRank || "E",
      reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
      stretchDone: !1,
      completed: !1,
      fullCompletion: !1,
      xpEarned: 0,
      doneModalities: [],
    },
    week: {
      weekStart: inicioSemana(hoy),
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
      today: { date: hoy, km: 0 },
      unlockedIndex: -1,
      relics: [],
    },
    dungeon: { date: hoy, ...travesiaDelDia(perfil.startRank || "E") },
    history: {},
    month: misVacio(misMes(hoy)),
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
    care: { today: { date: hoy, done: [] }, lifetime: 0 },
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
function subirNiveles(partida, avisos) {
  for (;;) {
    let umbral = nivelUmbral[partida.progress.rank];
    if (umbral && partida.progress.level >= umbral) {
      partida.ascension.pending = !0;
      break;
    }
    let costo = costoNivel(partida.progress.level);
    if (partida.progress.currentXP >= costo) {
      ((partida.progress.currentXP -= costo),
        (partida.progress.level += 1),
        avisos.push(`Subiste a nivel ${partida.progress.level}.`));
      let conSistemas = avisarSistemasNuevos(partida);
      ((partida = conSistemas.state), conSistemas.notices.forEach((aviso) => avisos.push(aviso)));
    } else break;
  }
  return partida;
}
function cargarPartida(guardada) {
  let partida = clonar(guardada),
    avisos = [],
    hoy = fechaHoy();
  (partida.exploration ||
    (partida.exploration = {
      lifetimeKm: 0,
      pendingKm: 0,
      today: { date: hoy, km: 0 },
      unlockedIndex: -1,
      relics: [],
    }),
    partida.exploration.lifetimeKm === void 0 &&
      ((partida.exploration.lifetimeKm =
        Math.round((((partida.exploration.lifetimeSteps || 0) * metrosPorPaso) / 1e3) * 100) / 100),
      (partida.exploration.pendingKm = 0),
      (partida.exploration.today = { date: hoy, km: 0 }),
      (partida.exploration.relics = []),
      delete partida.exploration.lifetimeSteps),
    partida.exploration.relics || (partida.exploration.relics = []),
    partida.exploration.pendingKm === void 0 && (partida.exploration.pendingKm = 0),
    partida.dungeon || (partida.dungeon = { date: hoy, ...travesiaDelDia(partida.progress.rank) }),
    partida.today.rank || (partida.today.rank = partida.progress.rank),
    partida.today.fullCompletion === void 0 && (partida.today.fullCompletion = !1),
    partida.streak.current === void 0 && (partida.streak.current = 0),
    partida.streak.best === void 0 && (partida.streak.best = 0),
    partida.history || (partida.history = {}),
    partida.lifetimeReps || (partida.lifetimeReps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    partida.lastTrained ||
      (partida.lastTrained = { squat: null, pushup: null, back: null, abs: null }),
    partida.dungeonsCleared === void 0 && (partida.dungeonsCleared = 0),
    partida.maxComebackStreak === void 0 && (partida.maxComebackStreak = 0),
    partida.achievements || (partida.achievements = []),
    partida.combat || (partida.combat = combateInicial()),
    partida.combat.roundId === void 0 && (partida.combat.roundId = 0),
    partida.combat.loadFactor === void 0 && (partida.combat.loadFactor = 1),
    partida.combat.damageFactor === void 0 && (partida.combat.damageFactor = 1),
    terreno(partida.combat.villainIndex).isBoss &&
      !partida.combat.bossCats &&
      (partida.combat.bossCats = trenesJefe(partida.combat.lastExercise)),
    partida.primal || (partida.primal = primalInicial()),
    partida.loadWarnedDate === void 0 && (partida.loadWarnedDate = null),
    partida.skills || (partida.skills = {}),
    partida.care || (partida.care = { today: { date: hoy, done: [] }, lifetime: 0 }),
    partida.neuro || (partida.neuro = neuroInicial()),
    partida.unlockAll === void 0 && (partida.unlockAll = !1),
    partida.disabled || (partida.disabled = []),
    partida.seenUnlocks ||
      (partida.seenUnlocks = sistemas
        .filter((sis) => sistemaAbierto(partida, sis.id))
        .map((sis) => sis.id)),
    partida.ui || (partida.ui = { collapsed: {} }),
    partida.ui.collapsed || (partida.ui.collapsed = {}),
    partida.ui.collapsed.ayuda === void 0 && (partida.ui.collapsed.ayuda = !1),
    partida.ui.ayudaAuto === void 0 &&
      ((partida.ui.ayudaAuto = 1), (partida.ui.collapsed.ayuda = !1)),
    partida.dominion || (partida.dominion = dominioInicial()),
    partida.dominion.perks || (partida.dominion.perks = []),
    partida.lifetimeModalities || (partida.lifetimeModalities = { bodyweight: 0, gym: 0, flow: 0 }),
    partida.records || (partida.records = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    partida.gymWeights || (partida.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    partida.lifetimeVolumeKg === void 0 && (partida.lifetimeVolumeKg = 0),
    partida.bestLiftKg || (partida.bestLiftKg = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    partida.lastFullDate === void 0 && (partida.lastFullDate = null),
    partida.zDemoted === void 0 && (partida.zDemoted = !1),
    partida.lifetimePrimal === void 0 && (partida.lifetimePrimal = 0),
    partida.lifetimeStretch === void 0 && (partida.lifetimeStretch = 0),
    partida.week.sessionDates || (partida.week.sessionDates = []),
    partida.week.reps || (partida.week.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    partida.dayLog || (partida.dayLog = {}),
    partida.week.trained === void 0 &&
      ((partida.week.trained = 0),
      (partida.week.fullDays = 0),
      (partida.week.xp = 0),
      (partida.week.dungeons = 0),
      (partida.week.primal = 0)),
    partida.lastWeekSummary === void 0 && (partida.lastWeekSummary = null),
    partida.combat.todayDefeated || (partida.combat.todayDefeated = { date: hoy, count: 0 }),
    partida.profile.createdDate || (partida.profile.createdDate = hoy),
    partida.profile.pet || (partida.profile.pet = { type: "dog", name: "Rocky" }),
    partida.profile.focusProfile || (partida.profile.focusProfile = "salud"),
    (!partida.profile.modalities || !partida.profile.modalities.length) &&
      (partida.profile.modalities = ["bodyweight"]),
    partida.profile.weeklyGoal || (partida.profile.weeklyGoal = metaSemanalDefecto),
    partida.weeklyStreak === void 0 && (partida.weeklyStreak = 0),
    partida.bestWeeklyStreak === void 0 && (partida.bestWeeklyStreak = 0));
  // El día que termina se evalúa antes de cerrar la semana, con los números de su propia
  // semana: al revés, un domingo sin rutina se medía contra la semana nueva (0 sesiones)
  // y quedaba como falta aunque la semana estuviera cumplida.
  if (partida.today.date !== hoy) {
    // Un día con solo una sesión corta (today.corta) se evalúa como un día sin entrenar.
    let sinSesion =
      (!partida.today.completed || partida.today.corta) &&
      !(partida.week.sessionDates || []).includes(partida.today.date);
    if (sinSesion && partida.dominion.shields > 0)
      ((partida.dominion.shields -= 1),
        (partida.history[partida.today.date] = "shield"),
        avisos.push(
          `Un Escudo de Racha absorbió el día ${partida.today.date}: tu racha sigue intacta. Te quedan ${partida.dominion.shields}.`,
        ));
    else if (sinSesion) {
      let metaSem = metaSemanal(partida),
        hechas = partida.week.trained || 0,
        quedan = Math.max(0, diasRestantesSemana(partida.today.date) - 1),
        alcanza = hechas + quedan >= metaSem;
      if (((partida.streak.current = 0), alcanza))
        ((partida.history[partida.today.date] = "skipped"),
          hechas < metaSem &&
            avisos.push(
              `Día de descanso no planificado. Seguís en camino: ${hechas}/${metaSem} sesiones esta semana, te quedan ${quedan} días.`,
            ));
      else {
        ((partida.streak.missed += 1), (partida.history[partida.today.date] = "missed"));
        (avisos.push(
          `Ya no podés alcanzar tus ${metaSem} sesiones esta semana. La racha vuelve a empezar, pero tu XP queda intacta.`,
        ),
          avisos.push(
            fraseMascota(
              frasesVolver,
              partida.today.date,
              partida.profile.pet && partida.profile.pet.name,
              partida.profile.pet && partida.profile.pet.type,
            ),
          ));
      }
    }
    ((partida.today = {
      date: hoy,
      mode: "pending",
      modality: null,
      rank: partida.progress.rank,
      reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
      stretchDone: !1,
      completed: !1,
      fullCompletion: !1,
      xpEarned: 0,
      doneModalities: [],
    }),
      (partida.history = ultimos60Dias(partida.history, hoy)));
  }
  let semana = inicioSemana(hoy);
  if (partida.week.weekStart !== semana) {
    partida.week.stretchCount >= 2
      ? ((partida.streak.flexBuff = !0),
        avisos.push(
          "Buff de Flexibilidad activo esta semana: +10% XP por haber estirado 2+ veces.",
        ))
      : (partida.streak.flexBuff = !1);
    let cumplida = (partida.week.trained || 0) >= metaSemanal(partida);
    (cumplida
      ? ((partida.weeklyStreak = (partida.weeklyStreak || 0) + 1),
        (partida.bestWeeklyStreak = Math.max(partida.bestWeeklyStreak || 0, partida.weeklyStreak)),
        avisos.push(
          `Semana cumplida: ${partida.week.trained} de ${metaSemanal(partida)} sesiones. Racha semanal: ${partida.weeklyStreak}.`,
        ))
      : ((partida.week.trained || 0) > 0 || partida.weeklyStreak > 0) &&
        ((partida.weeklyStreak = 0),
        avisos.push(
          `Cerraste la semana con ${partida.week.trained || 0} de ${metaSemanal(partida)} sesiones. La racha semanal vuelve a empezar.`,
        )),
      (partida.lastWeekSummary = {
        metGoal: cumplida,
        goal: metaSemanal(partida),
        weekStart: partida.week.weekStart,
        trained: partida.week.trained || 0,
        fullDays: partida.week.fullDays || 0,
        xp: partida.week.xp || 0,
        dungeons: partida.week.dungeons || 0,
        primal: partida.week.primal || 0,
        stretches: partida.week.stretchCount || 0,
        seen: !1,
      }),
      (partida.week = {
        weekStart: semana,
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
  if (partida.progress.rank === "Z" && partida.lastFullDate) {
    let dias = diasEntre(partida.lastFullDate, hoy);
    dias !== null &&
      dias >= diasParaBajarZ &&
      ((partida.progress.rank = "S"),
      (partida.zDemoted = !0),
      avisos.push(
        `Llevás ${dias} días sin una rutina completa: bajás al rango anterior hasta tu próximo día perfecto.`,
      ));
  }
  return (
    partida.dungeon.date !== hoy &&
      ((partida.dungeon = { date: hoy, ...travesiaDelDia(partida.progress.rank) }),
      partida.dungeon.available && avisos.push(`Travesía de hoy: ${partida.dungeon.name}`)),
    (partida = misRevisar(partida, avisos)),
    (partida = subirNiveles(partida, avisos)),
    { state: partida, notices: avisos }
  );
}
function nivelDesdeXp(xpAcumulada) {
  let nivel = 1,
    resto = Math.max(0, xpAcumulada);
  for (; resto >= costoNivel(nivel);) ((resto -= costoNivel(nivel)), (nivel += 1));
  return { level: nivel, currentXP: resto };
}
var misGrupos = {
  squat: "piernas y glúteos",
  pushup: "pecho y hombros",
  back: "espalda",
  abs: "core",
};
function misMes(fecha) {
  return fecha.slice(0, 7);
}
function misVacio(clave) {
  return {
    key: clave,
    reps: { squat: 0, pushup: 0, back: 0, abs: 0 },
    sessions: 0,
    modalities: { bodyweight: 0, gym: 0, flow: 0 },
  };
}
function misPeorGrupo(partida) {
  let hoy = fechaHoy(),
    peor = "back",
    dias = -1;
  for (let grupo of ["squat", "pushup", "back", "abs"]) {
    let ultima = partida.lastTrained && partida.lastTrained[grupo],
      hace = ultima ? diasEntre(ultima, hoy) : 999;
    if (hace > dias) {
      dias = hace;
      peor = grupo;
    }
  }
  return peor;
}
function misGenerar(partida, ambito) {
  let grupo = misPeorGrupo(partida),
    metaHoy = metaDelDia(partida),
    base = Math.max(3, metaHoy[grupo] || 5),
    meta = metaSemanal(partida),
    activas = modalidadesDe(partida.profile);
  if (ambito === "week") {
    let sin = activas.filter((mod) => !(partida.week.modalities && partida.week.modalities[mod]));
    if (activas.length > 1 && sin.length)
      return { kind: "modality", modality: sin[0], target: 2, xp: 120, pd: 2 };
    return { kind: "reps", group: grupo, target: Math.round(base * meta * 1.5), xp: 120, pd: 2 };
  }
  let sinMes = activas.filter(
    (mod) => !(partida.month && partida.month.modalities && partida.month.modalities[mod]),
  );
  if (activas.length > 1 && sinMes.length)
    return { kind: "modality", modality: sinMes[0], target: 5, xp: 500, pd: 5 };
  return { kind: "reps", group: grupo, target: Math.round(base * meta * 6), xp: 500, pd: 5 };
}
function misProgreso(partida, mision, ambito) {
  let contador = ambito === "week" ? partida.week : partida.month;
  if (!contador || !mision) return 0;
  return mision.kind === "reps"
    ? (contador.reps && contador.reps[mision.group]) || 0
    : (contador.modalities && contador.modalities[mision.modality]) || 0;
}
function misTexto(mision, ambito) {
  if (!mision) return "";
  let cuando = ambito === "week" ? "esta semana" : "este mes";
  return mision.kind === "reps"
    ? `Lo que menos tocaste: ${misGrupos[mision.group]}. ${mision.target} repeticiones ${cuando} y eso cambia.`
    : `Todavía no sabés qué te hace ${(modalidades.find((mod) => mod.id === mision.modality) || modalidades[0]).name}. Entrená con eso ${mision.target} veces ${cuando}.`;
}
function misRevisar(partida, avisos) {
  partida.week.modalities || (partida.week.modalities = { bodyweight: 0, gym: 0, flow: 0 });
  partida.month || (partida.month = misVacio(misMes(fechaHoy())));
  partida.missions ||
    (partida.missions = {
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
  if (partida.month.key !== mes) partida.month = misVacio(mes);
  if (!sistemaActivo(partida, "missions")) return partida;
  if (partida.missions.weekKey !== sem) {
    ((partida.missions.weekKey = sem),
      (partida.missions.weekly = misGenerar(partida, "week")),
      (partida.missions.weeklyDone = !1));
  }
  if (partida.missions.monthKey !== mes) {
    ((partida.missions.monthKey = mes),
      (partida.missions.monthly = misGenerar(partida, "month")),
      (partida.missions.monthlyDone = !1));
  }
  for (let ambito of ["week", "month"]) {
    let clave = ambito === "week" ? "weekly" : "monthly",
      claveHecha = ambito === "week" ? "weeklyDone" : "monthlyDone",
      mision = partida.missions[clave];
    if (
      mision &&
      !partida.missions[claveHecha] &&
      misProgreso(partida, mision, ambito) >= mision.target
    ) {
      ((partida.missions[claveHecha] = !0),
        (partida.progress.currentXP += mision.xp),
        (partida.dominion.points += mision.pd),
        avisos.push(
          `Misión ${ambito === "week" ? "semanal" : "mensual"} completada: +${mision.xp} XP y +${mision.pd} PD.`,
        ));
    }
  }
  return partida;
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
      streakCurrent: original.streak.current,
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
    // Menos de la mitad no cuenta como día entrenado, pero tampoco castiga: el día queda
    // como si no hubieras entrenado (se decide al cambiar el día, y otra sesión lo salva).
    // Antes lo marcaba como falta y cortaba la racha en el acto, peor que no hacer nada.
    partida.today.corta = !0;
    (avisos.push(
      `Sesión corta (${Math.round(pct * 100)}%): la XP es tuya, pero hace falta la mitad de la rutina para que el día cuente como entrenado.`,
    ),
      avisos.push(
        fraseMascota(
          frasesDiaDificil,
          partida.today.date,
          partida.profile.pet && partida.profile.pet.name,
          partida.profile.pet && partida.profile.pet.type,
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
    pct >= 0.5 && delete partida.today.corta,
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
function deshacerRegistroBase(actual) {
  let partida = clonar(actual),
    deshacer = partida.undoSnapshot;
  if (!deshacer || deshacer.date !== partida.today.date || !deshacer.snap)
    return { state: partida, notices: ["No hay nada que deshacer hoy."] };
  let fecha = deshacer.date,
    snap = deshacer.snap,
    xpQueda = xpTotal(partida.progress.level, partida.progress.currentXP) - (deshacer.xp || 0),
    nivel = nivelDesdeXp(xpQueda);
  ((partida.progress.level = nivel.level),
    (partida.progress.currentXP = nivel.currentXP),
    (partida.week.xp = Math.max(0, (partida.week.xp || 0) - (deshacer.xp || 0))),
    (partida.dominion.points = Math.max(0, partida.dominion.points - (deshacer.pd || 0))));
  for (let grupo of ["squat", "pushup", "back", "abs"])
    ((partida.lifetimeReps[grupo] = Math.max(
      0,
      partida.lifetimeReps[grupo] - (deshacer.reps[grupo] || 0),
    )),
      (partida.week.reps[grupo] = Math.max(
        0,
        (partida.week.reps[grupo] || 0) - (deshacer.reps[grupo] || 0),
      )));
  ((partida.records = clonar(snap.records)),
    (partida.lastTrained = clonar(snap.lastTrained)),
    (partida.bestLiftKg = clonar(snap.bestLiftKg)),
    (partida.lifetimeVolumeKg = snap.volume),
    (partida.lastFullDate = snap.lastFullDate),
    (partida.zDemoted = snap.zDemoted),
    (partida.maxComebackStreak = snap.maxComeback),
    (partida.streak.missed = snap.streakMissed),
    deshacer.fullDay && (partida.week.fullDays = Math.max(0, (partida.week.fullDays || 0) - 1)));
  let otrasActs = ((partida.dayLog[fecha] && partida.dayLog[fecha].acts) || []).filter(
    (act) => act !== "Rutina completa" && act !== "Rutina parcial",
  );
  return (
    otrasActs.length === 0
      ? ((partida.week.sessionDates = (partida.week.sessionDates || []).filter(
          (fechaSesion) => fechaSesion !== fecha,
        )),
        (partida.week.trained = partida.week.sessionDates.length),
        snap.hadSession ||
          ((partida.streak.current =
            snap.streakCurrent !== void 0
              ? snap.streakCurrent
              : Math.max(0, partida.streak.current - 1)),
          (partida.streak.best = snap.streakBest)),
        snap.history ? (partida.history[fecha] = snap.history) : delete partida.history[fecha],
        snap.dayLog ? (partida.dayLog[fecha] = snap.dayLog) : delete partida.dayLog[fecha])
      : ((partida.dayLog[fecha] = {
          acts: otrasActs,
          reps: null,
          xp: Math.max(
            0,
            ((partida.dayLog[fecha] && partida.dayLog[fecha].xp) || 0) - (deshacer.xp || 0),
          ),
        }),
        (partida.history[fecha] = "partial")),
    (partida.today = clonar(snap.today)),
    delete partida.undoSnapshot,
    { state: partida, notices: ["Rutina deshecha. Lo que hiciste aparte se conserva."] }
  );
}
function usarDescanso(actual) {
  let partida = clonar(actual),
    fallados = partida.streak.missed;
  ((partida.today.mode = "rest"),
    (partida.today.completed = !0),
    (partida.today.fullCompletion = !1),
    (partida.week.restDayUsed = !0),
    fallados >= 3 &&
      (partida.maxComebackStreak = Math.max(partida.maxComebackStreak || 0, fallados)),
    (partida.streak.missed = 0),
    (partida.history[partida.today.date] = "rest"));
  let avisos = ["Día de descanso registrado. Sin XP, sin penalización."],
    conLogros = revisarLogros(partida);
  return { state: conLogros.state, notices: [...avisos, ...conLogros.notices] };
}
function registrarEstiramiento(actual, hechos, total) {
  let partida = clonar(actual),
    avisos = [];
  if (partida.today.stretchDone) return { state: partida, notices: avisos };
  let fraccion = total && total > 0 ? Math.max(0, Math.min(1, (hechos || 0) / total)) : 1;
  if (fraccion < 0.34)
    return {
      state: partida,
      notices: [
        "Estiramiento cortado muy temprano. Sin XP, pero sin penalización: volvé cuando quieras.",
      ],
    };
  ((partida.today.stretchDone = !0),
    (partida.lifetimeStretch = (partida.lifetimeStretch || 0) + 1));
  let entera = fraccion >= 0.999;
  entera && (partida.week.stretchCount += 1);
  let xp = Math.round(25 * fraccion);
  (partida.streak.flexBuff && (xp = Math.round(xp * 1.1)),
    (xp = Math.round(xp * multImpulso(partida))),
    (partida.progress.currentXP += xp),
    (partida.today.xpEarned = (partida.today.xpEarned || 0) + xp),
    avisos.push(
      entera
        ? `+${xp} XP por estiramiento. Llevás ${partida.week.stretchCount}/2 esta semana.`
        : `+${xp} XP por lo que alcanzaste a estirar. Para que cuente en tu semana hay que llegar al final.`,
    ),
    (partida = subirNiveles(partida, avisos)));
  let conLogros = revisarLogros(partida);
  return { state: conLogros.state, notices: [...avisos, ...conLogros.notices] };
}
function completarTravesia(actual) {
  let partida = clonar(actual),
    avisos = [];
  if (!partida.dungeon.available || partida.dungeon.completed)
    return { state: partida, notices: avisos };
  ((partida.dungeon.completed = !0),
    (partida.dungeonsCleared = (partida.dungeonsCleared || 0) + 1),
    (partida.week.dungeons = (partida.week.dungeons || 0) + 1),
    (partida = anotarDia(partida, "Travesía")));
  let xp = partida.dungeon.rewardXP;
  (partida.streak.flexBuff && (xp = Math.round(xp * 1.1)),
    (xp = Math.round(xp * multImpulso(partida))),
    (partida.progress.currentXP += xp),
    (partida.today.xpEarned = (partida.today.xpEarned || 0) + xp),
    avisos.push(`¡Travesía completada! "${partida.dungeon.name}" +${xp} XP.`),
    (partida = subirNiveles(partida, avisos)));
  let conLogros = revisarLogros(partida),
    conAvisos = { state: conLogros.state, notices: [...avisos, ...conLogros.notices] },
    conCarga = avisoCarga(conAvisos.state);
  return { state: conCarga.state, notices: [...conAvisos.notices, ...conCarga.notices] };
}
function cruzarUmbralBase(actual) {
  let partida = clonar(actual),
    avisos = [];
  if (!partida.ascension.pending) return { state: partida, notices: avisos };
  if (!(partida.today.completed && partida.today.fullCompletion))
    return { state: partida, notices: avisos };
  let indice = rangos.indexOf(partida.progress.rank);
  if (indice < rangos.length - 1) {
    ((partida.progress.rank = rangos[indice + 1]),
      (partida.ascension.pending = !1),
      (partida = subirNiveles(partida, avisos)),
      avisos.push(`¡Cruzaste a ${sdcRango(partida.progress.rank, partida.profile)}!`));
    let conSistemas = avisarSistemasNuevos(partida);
    ((partida = conSistemas.state), conSistemas.notices.forEach((aviso) => avisos.push(aviso)));
  }
  let conLogros = revisarLogros(partida);
  return { state: conLogros.state, notices: [...avisos, ...conLogros.notices] };
}
// El Umbral pide, ademas del nivel, un minimo de rutinas completas en el
// rango: el nivel se puede apurar (racha, impulsos, varias sesiones por dia,
// XP de otros sistemas) y el cuerpo necesita semanas con los ejercicios nuevos.
// Crece con el rango porque los ultimos duran anos. A quien hace rutinas
// completas no lo frena: aun entrenando todos los dias junta mas en cada rango.
var sdcUmbralMin = { E: 24, D: 36, C: 48, B: 60, A: 72, S: 84 };
function sdcUmbralMinDe(rango) {
  return sdcUmbralMin[rango] || 0;
}
function sdcRangoSig(rango) {
  var indice = rangos.indexOf(rango);
  return indice >= 0 && indice < rangos.length - 1 ? rangos[indice + 1] : null;
}
// Dias con rutina completa desde que empezo el rango actual. El dia en que se
// cruza cuenta para el rango anterior. Una partida de antes de esta regla no
// sabe cuando empezo su rango y cuenta toda su historia.
function sdcRangoCompletas(partida) {
  var inicio = partida.rangoDesde,
    desde = inicio && inicio.rank === partida.progress.rank ? inicio.date : "",
    historia = partida.history || {},
    cuenta = 0,
    fecha;
  for (fecha in historia) if (historia[fecha] === "full" && fecha > desde) cuenta++;
  return cuenta;
}
function sdcUmbralFalta(partida) {
  if (partida.umbralForzado === partida.progress.rank) return 0;
  return Math.max(0, sdcUmbralMinDe(partida.progress.rank) - sdcRangoCompletas(partida));
}
// La prueba es una rutina completa del rango que viene (sus ejercicios y su
// volumen), repartida en las rondas del rango que se deja: prueba justo lo que
// se va a hacer cada dia despues de cruzar. Antes cada ronda era el 60-80% de esa
// rutina, y la prueba sumaba entre 2 y 6 rutinas encima de la del dia.
function sdcUmbralPrueba(partida, mod) {
  var rango = partida.progress.rank,
    sig = sdcRangoSig(rango) || rango,
    perfil = partida.profile,
    prueba = pruebaUmbral[rango] || pruebaUmbral.C,
    vol = volumen(sig, perfil.classification, perfil.focusProfile, mod, perfil.testResults),
    reps = {},
    nombres = {},
    grupo;
  for (grupo in vol) {
    reps[grupo] = Math.max(1, Math.round(vol[grupo] / prueba.rounds));
    nombres[grupo] = ejercicioDe(grupo, sig, mod, partida.today && partida.today.date).name;
  }
  return { rounds: prueba.rounds, note: prueba.note, reps: reps, nombres: nombres, rango: sig };
}
function sdcFaltanTxt(faltan) {
  return (
    (faltan === 1 ? "Te falta 1 rutina completa" : "Te faltan " + faltan + " rutinas completas") +
    " en este rango para cruzar el Umbral."
  );
}
function sdcCruzar(partida) {
  var falta = partida.ascension && partida.ascension.pending ? sdcUmbralFalta(partida) : 0;
  if (falta > 0) return { state: clonar(partida), notices: [sdcFaltanTxt(falta)] };
  var antes = partida.progress.rank,
    resultado = cruzarUmbralBase(partida);
  if (resultado.state.progress.rank !== antes) {
    resultado.state.rangoDesde = {
      rank: resultado.state.progress.rank,
      date: resultado.state.today.date,
    };
    delete resultado.state.umbralForzado;
  }
  return resultado;
}
function sumarTramo(actual, km) {
  let partida = clonar(actual);
  if (!km || km <= 0) return { state: partida, notices: [] };
  let hoy = fechaHoy();
  return (
    partida.exploration.today.date !== hoy && (partida.exploration.today = { date: hoy, km: 0 }),
    (partida.exploration.pendingKm = Math.round((partida.exploration.pendingKm + km) * 100) / 100),
    { state: partida, notices: [] }
  );
}
function descartarTramos(actual) {
  let partida = clonar(actual);
  return (
    (partida.exploration.pendingKm = 0),
    { state: partida, notices: ["Tramos sin consolidar descartados."] }
  );
}
function consolidarKm(actual) {
  let partida = clonar(actual),
    avisos = [],
    km = partida.exploration.pendingKm || 0;
  if (km <= 0)
    return { state: partida, notices: ["No registraste ningún tramo todavía."], found: [] };
  let hoy = fechaHoy();
  (partida.exploration.today.date !== hoy && (partida.exploration.today = { date: hoy, km: 0 }),
    (partida.exploration.today.km = Math.round((partida.exploration.today.km + km) * 100) / 100),
    (partida.exploration.lifetimeKm =
      Math.round((partida.exploration.lifetimeKm + km) * 100) / 100),
    (partida.exploration.pendingKm = 0));
  let hallazgos = [];
  nodosExplorar.forEach((nodo, indice) => {
    partida.exploration.lifetimeKm >= nodo.km &&
      indice > partida.exploration.unlockedIndex &&
      ((partida.exploration.unlockedIndex = indice),
      partida.exploration.relics.includes(nodo.relic) ||
        partida.exploration.relics.push(nodo.relic),
      hallazgos.push(nodo));
  });
  let xp = Math.round(km * xpPorKm * multReliquias(partida));
  (partida.streak.flexBuff && (xp = Math.round(xp * 1.1)),
    (xp = Math.round(xp * multImpulso(partida))),
    (partida.progress.currentXP += xp),
    (partida.today.xpEarned = (partida.today.xpEarned || 0) + xp),
    hallazgos.length &&
      ((partida.dominion.points += hallazgos.length),
      avisos.push(
        `+${hallazgos.length} Punto${hallazgos.length === 1 ? "" : "s"} de Dominio por hallazgo.`,
      )),
    avisos.push(`Expedición concluida: ${km} km · +${xp} XP.`),
    (partida = anotarDia(partida, "Expedición")),
    (partida = subirNiveles(partida, avisos)));
  let conLogros = revisarLogros(partida);
  return { state: conLogros.state, notices: [...avisos, ...conLogros.notices], found: hallazgos };
}
async function escribirPuntoRetorno(partida) {
  try {
    let db = await window.claude.use("db");
    return db ? (await db.doc("player/snapshot").set(partida), !0) : !1;
  } catch (err) {
    return !1;
  }
}
async function leerPuntoRetorno() {
  try {
    let db = await window.claude.use("db");
    if (!db) return null;
    let doc = await db.doc("player/snapshot").get();
    return doc.exists ? doc.data() : null;
  } catch (err) {
    return null;
  }
}
async function leerPartida() {
  try {
    let db = await window.claude.use("db");
    if (!db) return null;
    let doc = await db.doc("player/state").get();
    return doc.exists ? doc.data() : null;
  } catch (err) {
    return (console.error("Error cargando progreso", err), null);
  }
}
async function guardarPartida(partida) {
  try {
    let db = await window.claude.use("db");
    if (!db) return;
    await db.doc("player/state").set(partida);
  } catch (err) {
    console.error("No se pudo guardar el progreso", err);
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
