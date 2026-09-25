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
function terreno(indice) {
  let esJefe = (indice + 1) % 5 === 0,
    tramo = Math.floor(indice / 15),
    sufijo = sufijosTerreno[Math.min(tramo, sufijosTerreno.length - 1)],
    nombre;
  return (
    esJefe
      ? (nombre = terrenosJefe[Math.floor(indice / 5) % terrenosJefe.length])
      : indice < 10
        ? (nombre = terrenosComunes[indice % terrenosComunes.length])
        : (nombre = terrenosDificiles[indice % terrenosDificiles.length]),
    { name: nombre + sufijo, isBoss: esJefe, tier: tramo, index: indice }
  );
}
function trenesJefe(ultimo) {
  return ["upper_front", "upper_back", "lower"].filter((tren) => tren !== ultimo).slice(0, 2);
}
function golpesNecesarios(objetivo) {
  return objetivo.isBoss
    ? Math.min(8, 4 + Math.floor(objetivo.index / 10))
    : Math.min(5, 2 + Math.floor(objetivo.index / 6));
}
function xpTerreno(objetivo) {
  let xp = xpTerrenoBase + objetivo.index * 3;
  return objetivo.isBoss ? Math.round(xp * multXpJefe) : xp;
}
function repsCombate(rango, clase, tren, enfoque, modalidad, prueba) {
  let grupo = grupoDeTren[tren];
  return volumen(rango, clase, enfoque, modalidad, prueba)[grupo];
}
function ejercicioDeTren(rango, clase, tren, modalidad) {
  let grupo = grupoDeTren[tren];
  return nombreEjercicio(rango, clase, grupo, modalidad);
}
function segundosVentana(reps) {
  return reps * 3 + 15;
}
function repsCombateSuave(rango, clase, enfoque, tren, modalidad, prueba) {
  return Math.max(3, Math.round(repsCombate(rango, clase, tren, enfoque, modalidad, prueba) * 0.8));
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
function elegirTren(actual, tren) {
  let partida = clonar(actual),
    comb = partida.combat;
  if (tren === comb.lastExercise) return { state: partida, notices: [] };
  let objetivo = terreno(comb.villainIndex);
  return (
    (comb.exercise = tren),
    (comb.villainCurrentHP = golpesNecesarios(objetivo)),
    (comb.lives = 3),
    (comb.loadFactor = 1),
    (comb.damageFactor = 1),
    (comb.phase = "resting"),
    (comb.roundId = (comb.roundId || 0) + 1),
    { state: partida, notices: [] }
  );
}
function reintentarRonda(actual) {
  let partida = clonar(actual);
  return (
    (partida.combat.phase = "resting"),
    (partida.combat.roundId = (partida.combat.roundId || 0) + 1),
    { state: partida, notices: [] }
  );
}
function ajustarCarga(actual) {
  let partida = clonar(actual),
    comb = partida.combat;
  return (
    (comb.loadFactor = Math.max(0.4, (comb.loadFactor || 1) * 0.8)),
    (comb.damageFactor = Math.max(0.3, (comb.damageFactor || 1) * 0.7)),
    (comb.phase = "resting"),
    (comb.roundId = (comb.roundId || 0) + 1),
    {
      state: partida,
      notices: [
        "Carga recalibrada: -20% de repeticiones, pero tus golpes harán un 30% menos de daño.",
      ],
    }
  );
}
function cambiarTren(actual, tren) {
  let partida = clonar(actual),
    comb = partida.combat,
    objetivo = terreno(comb.villainIndex);
  if (tren === comb.lastExercise || tren === comb.exercise) return { state: partida, notices: [] };
  let golpes = golpesNecesarios(objetivo),
    recupera = golpes * 0.15;
  return (
    (comb.villainCurrentHP = Math.min(golpes, comb.villainCurrentHP + recupera)),
    (comb.exercise = tren),
    (comb.loadFactor = 1),
    (comb.damageFactor = 1),
    (comb.phase = "resting"),
    (comb.roundId = (comb.roundId || 0) + 1),
    { state: partida, notices: ["Retirada táctica: perdiste un 15% del terreno ganado."] }
  );
}
function golpear(actual) {
  let partida = clonar(actual),
    avisos = [],
    comb = partida.combat,
    objetivo = terreno(comb.villainIndex);
  if (((comb.villainCurrentHP -= comb.damageFactor || 1), comb.villainCurrentHP <= 0.001)) {
    ((comb.phase = "victory"), (comb.villainsDefeated = (comb.villainsDefeated || 0) + 1));
    let hoy = fechaHoy();
    if (
      ((!comb.todayDefeated || comb.todayDefeated.date !== hoy) &&
        (comb.todayDefeated = { date: hoy, count: 0 }),
      (comb.todayDefeated.count += 1),
      comb.todayDefeated.count <= victoriasConXp)
    ) {
      let xp = xpTerreno(objetivo);
      ((partida.progress.currentXP += Math.round(
        (partida.streak.flexBuff ? xp * 1.1 : xp) * multImpulso(partida),
      )),
        (partida.today.xpEarned = (partida.today.xpEarned || 0) + xp),
        avisos.push(`¡Recuperaste ${objetivo.name}! +${xp} XP.`),
        (partida = anotarDia(partida, "Combate")));
    } else
      avisos.push(
        `¡Recuperaste ${objetivo.name}! Ya ganaste tu XP máxima de combate hoy, pero la victoria sigue contando para tu progreso.`,
      );
    partida = subirNiveles(partida, avisos);
  } else ((comb.phase = "resting"), (comb.roundId = (comb.roundId || 0) + 1));
  let conLogros = revisarLogros(partida),
    conAvisos = { state: conLogros.state, notices: [...avisos, ...conLogros.notices] },
    conCarga = avisoCarga(conAvisos.state);
  return { state: conCarga.state, notices: [...conAvisos.notices, ...conCarga.notices] };
}
function perderVida(actual) {
  let partida = clonar(actual),
    comb = partida.combat;
  return (
    (comb.lives -= 1),
    comb.lives <= 0 ? ((comb.lives = 3), (comb.phase = "defeat")) : (comb.phase = "decision"),
    { state: partida, notices: [] }
  );
}
function siguienteTerreno(actual) {
  let partida = clonar(actual),
    comb = partida.combat,
    dejado = terreno(comb.villainIndex);
  ((comb.lastExercise = dejado.isBoss ? null : comb.exercise),
    (comb.exercise = null),
    (comb.villainIndex += 1),
    (comb.villainCurrentHP = null),
    (comb.loadFactor = 1),
    (comb.damageFactor = 1));
  let proximo = terreno(comb.villainIndex);
  return (
    proximo.isBoss
      ? ((comb.bossCats = trenesJefe(comb.lastExercise)),
        (comb.villainCurrentHP = golpesNecesarios(proximo)),
        (comb.lives = 3),
        (comb.phase = "resting"),
        (comb.roundId = (comb.roundId || 0) + 1))
      : ((comb.bossCats = null), (comb.phase = "choosing")),
    { state: partida, notices: [] }
  );
}
function reintentarSinVidas(actual) {
  let partida = clonar(actual);
  return (
    (partida.combat.phase = "resting"),
    (partida.combat.roundId = (partida.combat.roundId || 0) + 1),
    { state: partida, notices: [] }
  );
}
var rondasPrimal = 3,
  segundosPrimalPorRango = { E: 30, D: 35, C: 40, B: 45, A: 50, S: 55, Z: 60 };
function segundosRondaPrimal(rango) {
  return segundosPrimalPorRango[rango] || 40;
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
