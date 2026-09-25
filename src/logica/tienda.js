// Tienda de PD, modificadores del dia, mascota y multiplicadores de XP.
import { xpTravesia, travesiaDelDia, sdcPortales } from "./explorar.js";
import { hashDia, sesionesPrimalBase } from "./primal.js";
import { fechaHoy } from "./rutina.js";
import { clonar } from "./partida.js";

var tienda = [
  {
    id: "primal",
    cost: 4,
    name: "Sesión Extra Primal",
    desc: "Una sesión más de Instinto Primal hoy (6 en vez de 5).",
  },
  {
    id: "reroll",
    cost: 5,
    name: "Cambiar de travesía",
    desc: "Cambia la travesía de hoy por otra.",
  },
  {
    id: "rest",
    cost: 6,
    name: "Día de Descanso Extra",
    desc: "Recuperá el día de descanso que ya gastaste esta semana.",
  },
  {
    id: "flex",
    cost: 8,
    name: "Impulso de Constancia",
    desc: "+10% de XP durante el resto de la semana.",
  },
  {
    id: "xpbuff",
    cost: 12,
    name: "Impulso de XP",
    desc: "+25% de XP en todo lo que hagas durante el resto del día.",
  },
  {
    id: "shield",
    cost: 14,
    name: "Escudo de Racha",
    desc: "Protege un día fallado: tu racha sigue viva. Se consume solo.",
  },
  {
    id: "bigbuff",
    cost: 20,
    name: "Impulso Mayor de XP",
    desc: "+50% de XP durante el resto del día. Sustituye al impulso normal.",
  },
  {
    id: "memoria",
    cost: 40,
    name: "Memoria",
    desc: "Permanente: +5% de XP en todo, para siempre.",
  },
  {
    id: "nucleo",
    cost: 90,
    name: "Núcleo Reforzado",
    desc: "Permanente: sube el bono anterior a +10% de XP en todo.",
  },
];
function dominioInicial() {
  return {
    points: 0,
    shields: 0,
    perks: [],
    xpBuffDate: null,
    extraPrimal: { date: fechaHoy(), count: 0 },
  };
}
var sdcMods = {
  bodyweight: [
    { n: "Tempo", d: "Baja en 3 segundos cada repetición, sin rebote abajo.", x: 0.2 },
    { n: "Densidad", d: "Descansos a la mitad entre series.", x: 0.25 },
    { n: "Sin pausa", d: "Encadena los cuatro patrones sin descanso entre ellos.", x: 0.3 },
    { n: "Pausa abajo", d: "Un segundo detenido en el punto más bajo de cada repetición.", x: 0.2 },
    { n: "Unilateral", d: "Donde el ejercicio lo permita, hazlo a un lado por vez.", x: 0.25 },
    { n: "Media extra", d: "Termina cada serie con 3 repeticiones a medio rango.", x: 0.2 },
  ],
  gym: [
    { n: "Tempo", d: "Baja el peso en 3 segundos y no lo sueltes arriba.", x: 0.2 },
    {
      n: "Serie al fallo",
      d: "Lleva la última serie de cada ejercicio hasta el fallo técnico.",
      x: 0.25,
    },
    { n: "Drop set", d: "En la última serie baja el peso y sigue sin descansar.", x: 0.25 },
    { n: "Carga alta", d: "Sube el peso y baja las repeticiones de cada serie.", x: 0.2 },
    { n: "Descanso corto", d: "45 segundos entre series, cronometrados.", x: 0.25 },
    { n: "Pausa estirado", d: "Un segundo detenido en el punto de mayor estiramiento.", x: 0.2 },
  ],
  flow: [
    { n: "Sostén largo", d: "Mantén cada posición un 50% más de lo que marca la serie.", x: 0.25 },
    { n: "Transiciones", d: "Encadena los movimientos sin apoyar rodillas ni cadera.", x: 0.3 },
    { n: "Control", d: "Mitad de velocidad en todo el recorrido.", x: 0.2 },
    { n: "Respiración", d: "Cuatro segundos inhalando y cuatro exhalando en cada ciclo.", x: 0.2 },
    { n: "Amplitud", d: "Busca el rango máximo de cada articulación, sin forzar.", x: 0.25 },
    { n: "Silencio", d: "Que ningún apoyo haga ruido: cada contacto controlado.", x: 0.25 },
  ],
};
function sdcModDia(modalidad, fecha) {
  var lista = sdcMods[modalidad] || sdcMods.bodyweight;
  return lista[
    hashDia(String(fecha || fechaHoy()) + "|" + String(modalidad || "bodyweight"), lista.length)
  ];
}
var sdcPetPR = [
    '{name} da vueltas sin parar: "¡Ese número no lo habías tocado nunca!"',
    '{name} te empuja la mano con la cabeza: "Marca nueva. La vi."',
  ],
  sdcPetRacha = [
    '{name} apoya la cabeza en tu pierna: "{d} días seguidos. Ya te sigo el ritmo."',
    '{name} te mira fijo: "{d} días. Esto ya no es casualidad."',
  ],
  sdcPetFull = [
    '{name} te mira con orgullo: "Cuatro de cuatro. Así se hace."',
    '{name} se estira a tu lado: "Rutina entera. Nada que reprochar hoy."',
  ],
  sdcPetParcial = [
    '{name} levanta la cabeza: "Algo es algo. Mañana vamos por más."',
    '{name} te mira de reojo: "No fue tu mejor día, pero apareciste."',
  ];
function sdcMascota(partida, pct, hayRecord) {
  var nombre =
      (partida.profile && partida.profile.pet && partida.profile.pet.name) || "Tu compañero",
    racha = (partida.streak && partida.streak.current) || 0,
    clave = hayRecord ? "pr" : racha >= 7 ? "ra" : pct >= 1 ? "fu" : "pa",
    frases = hayRecord
      ? sdcPetPR
      : racha >= 7
        ? sdcPetRacha
        : pct >= 1
          ? sdcPetFull
          : sdcPetParcial;
  return frases[hashDia(String(partida.today.date) + "|" + clave, frases.length)]
    .replace("{name}", nombre)
    .replace("{d}", racha);
}
function sdcRacha(partida) {
  let racha = (partida.streak && partida.streak.current) || 0;
  return 1 + Math.min(0.3, racha * 0.02);
}
function sdcPerk(partida) {
  let perks = (partida.dominion && partida.dominion.perks) || [];
  return perks.indexOf("nucleo") >= 0 ? 1.1 : perks.indexOf("memoria") >= 0 ? 1.05 : 1;
}
function multImpulso(partida) {
  return partida.dominion && partida.dominion.xpBuffDate === fechaHoy()
    ? partida.dominion.xpBuffMult || 1.25
    : 1;
}
function sesionesPrimalHoy(partida) {
  let extra = partida.dominion && partida.dominion.extraPrimal,
    extraHoy = extra && extra.date === fechaHoy() ? extra.count : 0;
  return sesionesPrimalBase + extraHoy;
}
function comprar(actual, id) {
  let partida = clonar(actual),
    avisos = [],
    item = tienda.find((it) => it.id === id);
  if (!item) return { state: partida, notices: avisos };
  if (partida.dominion.points < item.cost)
    return { state: partida, notices: ["No tenés suficientes Puntos de Dominio."] };
  let hoy = fechaHoy();
  if (id === "reroll") {
    if (partida.dungeon.completed)
      return { state: partida, notices: ["Ya completaste la travesía de hoy."] };
    ((partida.dungeon = { date: hoy, ...travesiaDelDia(partida.progress.rank) }),
      partida.dungeon.available ||
        (partida.dungeon = {
          date: hoy,
          available: !0,
          completed: !1,
          name: sdcPortales[0].n,
          challengeText: sdcPortales[0].c,
          rewardXP: xpTravesia[partida.progress.rank],
        }),
      avisos.push(`Nueva travesía: ${partida.dungeon.name}.`));
  } else if (id === "primal")
    ((!partida.dominion.extraPrimal || partida.dominion.extraPrimal.date !== hoy) &&
      (partida.dominion.extraPrimal = { date: hoy, count: 0 }),
      (partida.dominion.extraPrimal.count += 1),
      avisos.push("Sesión extra de Instinto Primal desbloqueada para hoy."));
  else if (id === "xpbuff") {
    if (partida.dominion.xpBuffDate === hoy)
      return { state: partida, notices: ["Ya tenés el Impulso de XP activo hoy."] };
    ((partida.dominion.xpBuffDate = hoy),
      (partida.dominion.xpBuffMult = 1.25),
      avisos.push("Impulso de XP activo: +25% por el resto del día."));
  } else if (id === "rest") {
    if (!partida.week.restDayUsed)
      return {
        state: partida,
        notices: ["Todavía no gastaste tu día de descanso de esta semana."],
      };
    ((partida.week.restDayUsed = !1),
      avisos.push("Día de descanso recuperado: podés volver a usarlo esta semana."));
  } else if (id === "flex") {
    if (partida.streak.flexBuff)
      return { state: partida, notices: ["Ya tenés el Impulso de Constancia activo."] };
    ((partida.streak.flexBuff = !0),
      avisos.push("Impulso de Constancia activo: +10% de XP el resto de la semana."));
  } else if (id === "bigbuff") {
    if (partida.dominion.xpBuffDate === hoy && partida.dominion.xpBuffMult === 1.5)
      return { state: partida, notices: ["Ya tenés el Impulso Mayor activo hoy."] };
    ((partida.dominion.xpBuffDate = hoy),
      (partida.dominion.xpBuffMult = 1.5),
      avisos.push("Impulso Mayor activo: +50% de XP por el resto del día."));
  } else if (id === "memoria" || id === "nucleo") {
    partida.dominion.perks || (partida.dominion.perks = []);
    if (partida.dominion.perks.indexOf(id) >= 0)
      return { state: partida, notices: ["Ya tenés esa mejora."] };
    if (id === "nucleo" && partida.dominion.perks.indexOf("memoria") < 0)
      return { state: partida, notices: ["Primero necesitás la Memoria."] };
    (partida.dominion.perks.push(id),
      avisos.push(
        id === "memoria"
          ? "Memoria instalada: +5% de XP para siempre."
          : "Núcleo Reforzado: tu bono permanente sube a +10% de XP.",
      ));
  } else
    id === "shield" &&
      ((partida.dominion.shields += 1),
      avisos.push(`Escudo de Racha listo (tenés ${partida.dominion.shields}).`));
  return ((partida.dominion.points -= item.cost), { state: partida, notices: avisos });
}

export {
  tienda,
  dominioInicial,
  sdcMods,
  sdcModDia,
  sdcPetPR,
  sdcPetRacha,
  sdcPetFull,
  sdcPetParcial,
  sdcMascota,
  sdcRacha,
  sdcPerk,
  multImpulso,
  sesionesPrimalHoy,
  comprar,
};
