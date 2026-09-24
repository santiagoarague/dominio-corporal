// Tienda de PD, modificadores del dia, mascota y multiplicadores de XP.
import { Ed, ai, sdcPortales } from "./explorar.js";
import { Dd, k2 } from "./primal.js";
import { ue } from "./rutina.js";
import { M } from "./partida.js";

var Ey = [
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
function Ay() {
  return {
    points: 0,
    shields: 0,
    perks: [],
    xpBuffDate: null,
    extraPrimal: { date: ue(), count: 0 },
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
function sdcModDia(m, f) {
  var l = sdcMods[m] || sdcMods.bodyweight;
  return l[Dd(String(f || ue()) + "|" + String(m || "bodyweight"), l.length)];
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
function sdcMascota(o, p, pr) {
  var nm = (o.profile && o.profile.pet && o.profile.pet.name) || "Tu compañero",
    d = (o.streak && o.streak.current) || 0,
    k = pr ? "pr" : d >= 7 ? "ra" : p >= 1 ? "fu" : "pa",
    l = pr ? sdcPetPR : d >= 7 ? sdcPetRacha : p >= 1 ? sdcPetFull : sdcPetParcial;
  return l[Dd(String(o.today.date) + "|" + k, l.length)].replace("{name}", nm).replace("{d}", d);
}
function sdcRacha(e) {
  let d = (e.streak && e.streak.current) || 0;
  return 1 + Math.min(0.3, d * 0.02);
}
function sdcPerk(e) {
  let p = (e.dominion && e.dominion.perks) || [];
  return p.indexOf("nucleo") >= 0 ? 1.1 : p.indexOf("memoria") >= 0 ? 1.05 : 1;
}
function Ka(e) {
  return e.dominion && e.dominion.xpBuffDate === ue() ? e.dominion.xpBuffMult || 1.25 : 1;
}
function Sd(e) {
  let a = e.dominion && e.dominion.extraPrimal,
    l = a && a.date === ue() ? a.count : 0;
  return k2 + l;
}
function M2(e, a) {
  let l = M(e),
    n = [],
    o = Ey.find((u) => u.id === a);
  if (!o) return { state: l, notices: n };
  if (l.dominion.points < o.cost)
    return { state: l, notices: ["No tenés suficientes Puntos de Dominio."] };
  let s = ue();
  if (a === "reroll") {
    if (l.dungeon.completed) return { state: l, notices: ["Ya completaste la travesía de hoy."] };
    ((l.dungeon = { date: s, ...ai(l.progress.rank) }),
      l.dungeon.available ||
        (l.dungeon = {
          date: s,
          available: !0,
          completed: !1,
          name: sdcPortales[0].n,
          challengeText: sdcPortales[0].c,
          rewardXP: Ed[l.progress.rank],
        }),
      n.push(`Nueva travesía: ${l.dungeon.name}.`));
  } else if (a === "primal")
    ((!l.dominion.extraPrimal || l.dominion.extraPrimal.date !== s) &&
      (l.dominion.extraPrimal = { date: s, count: 0 }),
      (l.dominion.extraPrimal.count += 1),
      n.push("Sesión extra de Instinto Primal desbloqueada para hoy."));
  else if (a === "xpbuff") {
    if (l.dominion.xpBuffDate === s)
      return { state: l, notices: ["Ya tenés el Impulso de XP activo hoy."] };
    ((l.dominion.xpBuffDate = s),
      (l.dominion.xpBuffMult = 1.25),
      n.push("Impulso de XP activo: +25% por el resto del día."));
  } else if (a === "rest") {
    if (!l.week.restDayUsed)
      return { state: l, notices: ["Todavía no gastaste tu día de descanso de esta semana."] };
    ((l.week.restDayUsed = !1),
      n.push("Día de descanso recuperado: podés volver a usarlo esta semana."));
  } else if (a === "flex") {
    if (l.streak.flexBuff)
      return { state: l, notices: ["Ya tenés el Impulso de Constancia activo."] };
    ((l.streak.flexBuff = !0),
      n.push("Impulso de Constancia activo: +10% de XP el resto de la semana."));
  } else if (a === "bigbuff") {
    if (l.dominion.xpBuffDate === s && l.dominion.xpBuffMult === 1.5)
      return { state: l, notices: ["Ya tenés el Impulso Mayor activo hoy."] };
    ((l.dominion.xpBuffDate = s),
      (l.dominion.xpBuffMult = 1.5),
      n.push("Impulso Mayor activo: +50% de XP por el resto del día."));
  } else if (a === "memoria" || a === "nucleo") {
    l.dominion.perks || (l.dominion.perks = []);
    if (l.dominion.perks.indexOf(a) >= 0) return { state: l, notices: ["Ya tenés esa mejora."] };
    if (a === "nucleo" && l.dominion.perks.indexOf("memoria") < 0)
      return { state: l, notices: ["Primero necesitás la Memoria."] };
    (l.dominion.perks.push(a),
      n.push(
        a === "memoria"
          ? "Memoria instalada: +5% de XP para siempre."
          : "Núcleo Reforzado: tu bono permanente sube a +10% de XP.",
      ));
  } else
    a === "shield" &&
      ((l.dominion.shields += 1), n.push(`Escudo de Racha listo (tenés ${l.dominion.shields}).`));
  return ((l.dominion.points -= o.cost), { state: l, notices: n });
}

export {
  Ey,
  Ay,
  sdcMods,
  sdcModDia,
  sdcPetPR,
  sdcPetRacha,
  sdcPetFull,
  sdcPetParcial,
  sdcMascota,
  sdcRacha,
  sdcPerk,
  Ka,
  Sd,
  M2,
};
