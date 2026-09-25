// La rutina del dia: modalidad, ejercicio, volumen, calibre y fechas.
import { hashDia } from "./primal.js";
import { ejerciciosGym, ejerciciosFlow, factorRango, ejerciciosPeso } from "../datos/ejercicios.js";
import { clonar } from "./partida.js";
import { sdcCalT } from "./extras.js";
import { sdcSegs } from "./series.js";

function modalidadesDe(perfil) {
  let lista = (perfil && perfil.modalities) || ["bodyweight"];
  return lista.length ? lista : ["bodyweight"];
}
function modalidadDelDia(perfil, fecha, elegida) {
  let activas = modalidadesDe(perfil);
  if (elegida && activas.includes(elegida)) return elegida;
  if (activas.length === 1) return activas[0];
  let indice = hashDia(fecha || fechaHoy(), activas.length);
  return activas[indice];
}
function tablaEjercicios(modalidad) {
  return modalidad === "gym" ? ejerciciosGym : modalidad === "flow" ? ejerciciosFlow : null;
}
var baseClase = {
  principiante: { squat: 12, pushup: 8, back: 8, abs: 12 },
  intermedio: { squat: 18, pushup: 12, back: 10, abs: 18 },
  avanzado: { squat: 24, pushup: 16, back: 14, abs: 24 },
};
function ejercicioDe(grupo, rango, modalidad, fecha) {
  var tabla = tablaEjercicios(modalidad),
    entrada = tabla && tabla[grupo] && tabla[grupo][rango] ? tabla[grupo][rango] : null;
  if (!entrada) {
    var delPeso = ejerciciosPeso[grupo] || ejerciciosPeso.squat;
    entrada = delPeso[rango] || delPeso.C;
  }
  if (!entrada) return { name: "", repFactor: 1, alt: "" };
  if (!Array.isArray(entrada)) return entrada;
  if (entrada.length < 2) return entrada[0] || { name: "", repFactor: 1, alt: "" };
  return entrada[
    hashDia(
      String(fecha || fechaHoy()) +
        "|" +
        grupo +
        "|" +
        rango +
        "|" +
        String(modalidad || "bodyweight"),
      entrada.length,
    )
  ];
}
// Rondas y reglas de la prueba del Umbral, segun el rango que se deja. La prueba
// reparte en esas rondas una rutina completa del rango que viene (sdcUmbralPrueba).
var pruebaUmbral = {
  E: { rounds: 3, note: "Cadencia controlada, sin prisa." },
  D: { rounds: 3, note: "Sin descanso entre ejercicios." },
  C: { rounds: 4, note: "Superserie: encadena los cuatro patrones." },
  B: { rounds: 4, note: "Descanso máximo de 30 s entre rondas." },
  A: { rounds: 5, note: "Descanso máximo de 15 s entre rondas." },
  S: { rounds: 5, note: "Sin cortes. La prueba del Dominio Total." },
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
function anotarDia(partida, actividad) {
  let fecha = partida.today.date;
  return (
    partida.week.sessionDates || (partida.week.sessionDates = []),
    partida.week.reps || (partida.week.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
    partida.dayLog || (partida.dayLog = {}),
    partida.dayLog[fecha] || (partida.dayLog[fecha] = { acts: [], reps: null, xp: 0 }),
    actividad &&
      !partida.dayLog[fecha].acts.includes(actividad) &&
      partida.dayLog[fecha].acts.push(actividad),
    partida.week.sessionDates.includes(fecha) ||
      (partida.week.sessionDates.push(fecha),
      (partida.week.trained = partida.week.sessionDates.length),
      partida.streak.missed >= 3 &&
        (partida.maxComebackStreak = Math.max(
          partida.maxComebackStreak || 0,
          partida.streak.missed,
        )),
      (partida.streak.missed = 0),
      (partida.streak.current += 1),
      (partida.streak.best = Math.max(partida.streak.best || 0, partida.streak.current)),
      partida.history[fecha] || (partida.history[fecha] = "partial")),
    partida
  );
}
function metaSemanal(partida) {
  return (partida.profile && partida.profile.weeklyGoal) || metaSemanalDefecto;
}
function diasRestantesSemana(fecha) {
  let diaSemana = new Date(fecha + "T00:00:00").getDay();
  return 7 - (diaSemana === 0 ? 6 : diaSemana - 1);
}
function enfoqueDe(id) {
  return enfoques.find((enf) => enf.id === id) || enfoques[2];
}
var mejoraMinimaZ = 1.01,
  diasParaBajarZ = 7;
function metaDelDia(partida, rangoPedido) {
  let rango = rangoPedido || partida.progress.rank,
    modalidad = modalidadDelDia(
      partida.profile,
      partida.today && partida.today.date,
      partida.today && partida.today.modality,
    ),
    vol = volumen(
      rango,
      partida.profile.classification,
      partida.profile.focusProfile,
      modalidad,
      partida.profile.testResults,
    );
  if (rango !== "Z") return vol;
  let records = partida.records || {},
    meta = {};
  for (let grupo of Object.keys(vol)) {
    let record = records[grupo] || 0;
    meta[grupo] =
      record > 0 ? Math.max(vol[grupo], Math.ceil(record * mejoraMinimaZ), record + 1) : vol[grupo];
  }
  return meta;
}
function sdcPuntaje(perfil) {
  var prueba = perfil && perfil.testResults;
  if (!prueba) return 0;
  return puntajePrueba(
    Number(prueba.squat) || 0,
    Number(prueba.pushup) || 0,
    Number(prueba.abs) || 0,
    Number(prueba.back) || 0,
  );
}
function sdcCalibre(perfil) {
  var prueba = perfil && perfil.testResults;
  if (!prueba) return null;
  var sq = Number(prueba.squat) || 0,
    pu = Number(prueba.pushup) || 0,
    ab = Number(prueba.abs) || 0,
    bk = Number(prueba.back) || 0;
  if (!sq && !pu && !ab && !bk) return null;
  var banda = bandaCalibre(sq, pu, ab, bk, sdcRitmoF(perfil));
  return banda ? sdcCalT(bandasCalibre.indexOf(banda), perfil) : null;
}
var sdcModBase = {
  gym: { squat: 50, pushup: 45, back: 45, abs: 50 },
  flow: { squat: 40, pushup: 36, back: 36, abs: 40 },
};
function sdcBase(prueba, clase, mod) {
  var fija = sdcModBase[mod];
  if (fija) return fija;
  var piso = baseClase[clase] || baseClase.intermedio;
  if (!prueba) return piso;
  var margen = 1.15,
    sq = Number(prueba.squat) || 0,
    pu = Number(prueba.pushup) || 0,
    ab = Number(prueba.abs) || 0,
    bk = Number(prueba.back) || 0;
  if (!sq && !pu && !ab) return piso;
  var tope = function (valor) {
    return Math.min(valor, 340);
  };
  return {
    squat: Math.max(piso.squat, tope(Math.round(sq * margen))),
    pushup: Math.max(piso.pushup, tope(Math.round(pu * margen))),
    back: Math.max(piso.back, tope(Math.round((bk > 0 ? bk : pu * 0.85) * margen))),
    abs: Math.max(piso.abs, tope(Math.round(ab * margen))),
  };
}
function volumen(rango, clase, enfoque, modalidad, prueba) {
  let repMult = enfoqueDe(enfoque).repMult,
    factor = factorRango[rango] || 1,
    base = sdcBase(prueba, clase, modalidad),
    vol = {};
  for (let grupo of Object.keys(base)) {
    let ej = ejercicioDe(grupo, rango, modalidad),
      mult = sdcGymFijo(ej, modalidad) ? factorRango.E : factor * ej.repFactor;
    vol[grupo] = Math.max(1, Math.round(base[grupo] * mult * repMult));
  }
  return vol;
}
// En el gimnasio lo que sube con el rango es el ejercicio y la carga, no las
// repeticiones: cada serie queda en el rango del enfoque (salud 12/10/8, fuerza
// 8/7/5, resistencia 17/14/11) en todos los rangos. Los sostenes siguen la
// formula comun, porque sus reps son segundos y repFactor los calibra.
function sdcGymFijo(ej, mod) {
  return mod === "gym" && !!ej && !sdcSegs(ej.alt);
}
// Lo que vale en XP cada rep de gimnasio de ese patron: lo necesario para que
// una rutina completa pague lo mismo que cuando las reps subian con el rango.
function sdcGymXp(grupo, rank) {
  let ej = ejercicioDe(grupo, rank, "gym");
  return sdcGymFijo(ej, "gym") ? ((factorRango[rank] || 1) * ej.repFactor) / factorRango.E : 1;
}
function multEnfoque(partida) {
  let enf = enfoqueDe(partida.profile.focusProfile),
    mult = enf.xpMult;
  return (
    enf.streakBonus && partida.streak.current >= rachaBonoSalud && (mult *= 1 + enf.streakBonus),
    mult
  );
}
function costoNivel(nivel) {
  return nivel < 50 ? 45 + nivel * 3 : 5 * nivel - 55;
}
function xpTotal(nivel, xpActual) {
  let total = xpActual;
  for (let nivelPrevio = 1; nivelPrevio < nivel; nivelPrevio++) total += costoNivel(nivelPrevio);
  return total;
}
function fechaLocal(momento) {
  return new Date(momento.getTime() - momento.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
}
function fechaHoy() {
  return fechaLocal(new Date());
}
function inicioSemana(fecha) {
  let dia = new Date(fecha + "T00:00:00"),
    diaSemana = dia.getDay(),
    hastaLunes = (diaSemana === 0 ? -6 : 1) - diaSemana;
  return (dia.setDate(dia.getDate() + hastaLunes), fechaLocal(dia));
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
function puntajePrueba(sentadillas, flexiones, abdominales, remo) {
  return 2 * flexiones + sentadillas + abdominales + 2 * (remo || 0);
}
function bandaCalibre(sentadillas, flexiones, abdominales, remo, factor) {
  let puntos = puntajePrueba(sentadillas, flexiones, abdominales, remo);
  return bandasCalibre[sdcBandaIx(puntos, factor || 1)];
}
var sdcRitmoK = 0.6;
function sdcRitmoF(perfil) {
  return perfil && perfil.testResults && perfil.testResults.ritmo === 5 ? sdcRitmoK : 1;
}
function sdcBandaMin(indice, factor) {
  return Math.round(bandasCalibre[indice].min * (factor || 1));
}
function sdcBandaIx(puntos, factor) {
  var elegida = 0,
    indice;
  for (indice = 0; indice < bandasCalibre.length; indice++)
    puntos >= sdcBandaMin(indice, factor) && (elegida = indice);
  return elegida;
}
function claseCalibre(sentadillas, flexiones, abdominales, remo, factor) {
  return bandaCalibre(sentadillas, flexiones, abdominales, remo, factor).classification;
}
function guardarPrueba(actual, sentadillas, flexiones, abdominales, remo, ritmo) {
  let partida = clonar(actual),
    nueva = claseCalibre(sentadillas, flexiones, abdominales, remo, ritmo === 5 ? sdcRitmoK : 1),
    anterior = partida.profile.classification;
  ((partida.profile.classification = nueva),
    (partida.profile.testResults = ritmo
      ? { squat: sentadillas, pushup: flexiones, abs: abdominales, back: remo || 0, ritmo: ritmo }
      : { squat: sentadillas, pushup: flexiones, abs: abdominales, back: remo || 0 }));
  let avisos = [
    anterior === nueva
      ? `Prueba de aptitud actualizada. Seguís en ${nueva}.`
      : `¡Prueba de aptitud actualizada! Pasaste de ${anterior} a ${nueva}.`,
  ];
  return { state: partida, notices: avisos };
}
function nombreEjercicio(rango, clase, grupo, modalidad) {
  return ejercicioDe(grupo, rango, modalidad).name;
}
function alternativaEjercicio(rango, grupo, modalidad) {
  return ejercicioDe(grupo, rango, modalidad).alt;
}
function sdcGuia(rango, grupo, modalidad) {
  var ej = ejercicioDe(grupo, rango, modalidad);
  return ej && (ej.pos || ej.mov || ej.err) ? ej : null;
}

export {
  modalidadesDe,
  modalidadDelDia,
  tablaEjercicios,
  baseClase,
  ejercicioDe,
  pruebaUmbral,
  sdcGymFijo,
  sdcGymXp,
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
