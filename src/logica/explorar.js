// Explorar (km y terrenos) y las travesias del dia.
import { ay } from "../datos/rangos.js";

function l2(e) {
  let a = ay[0];
  for (let l of ay) e >= l.minKm && (a = l);
  return a;
}
var n2 = 8,
  Ny = 0.03;
function o2(e) {
  return 1 + (e.exploration.relics || []).length * Ny;
}
var Po = [
  { name: "La Manzana", endKm: 10 },
  { name: "El Barrio", endKm: 25 },
  { name: "Los Bordes", endKm: 50 },
  { name: "La Ruta", endKm: 90 },
  { name: "El Aliento Largo", endKm: 150 },
  { name: "La Distancia", endKm: 250 },
  { name: "Tu Propio Mapa", endKm: 400 },
];
function i2(e) {
  return e === 0 ? 0 : Po[e - 1].endKm;
}
function s2(e) {
  for (let a = 0; a < Po.length; a++) if (e < Po[a].endKm) return a;
  return Po.length - 1;
}
var pt = [
    {
      km: 1,
      sector: 0,
      name: "La Primera Cuadra",
      relic: "El Primer Paso",
      text: "La distancia más difícil de todas: la que va de la puerta a la vereda.",
      lore: "Nadie te ve salir. Es la única parte del camino que se hace entera con la cabeza.",
    },
    {
      km: 3,
      sector: 0,
      name: "La Subida de Siempre",
      relic: "Aliento Corto",
      text: "Esa pendiente que hacés todos los días sin pensarla.",
      lore: "Hoy llegaste arriba hablando. La cuesta no cambió.",
    },
    {
      km: 5,
      sector: 0,
      name: "La Vuelta Completa",
      relic: "La Manzana Entera",
      text: "Diste la vuelta entera sin cortar por el medio.",
      lore: "Cortar por el medio era más rápido. Dejó de tener sentido.",
    },
    {
      km: 10,
      sector: 0,
      name: "El Semáforo Largo",
      relic: "Paciencia",
      text: "El cruce donde siempre te toca esperar.",
      lore: "Antes aprovechabas para recuperar el aire. Ahora te impacienta.",
    },
    {
      km: 13,
      sector: 1,
      name: "La Plaza a las Siete",
      relic: "El Turno de la Mañana",
      text: "Hay gente a esta hora. Siempre la hubo.",
      lore: "Son los mismos todos los días. Nadie se saluda. Todos se reconocen.",
    },
    {
      km: 17,
      sector: 1,
      name: "El Perro de la Esquina",
      relic: "Saludo Sin Palabras",
      text: "Ladra los primeros días. Después deja de ladrar.",
      lore: "No te aceptó: te incorporó al paisaje, que es distinto y cuesta más.",
    },
    {
      km: 21,
      sector: 1,
      name: "La Panadería Abierta",
      relic: "Olor a las Seis",
      text: "Trabajan de noche para que a la mañana haya pan.",
      lore: "Pasás por la puerta y el olor te ordena el hambre. Todavía no entraste.",
    },
    {
      km: 25,
      sector: 1,
      name: "El Último Farol",
      relic: "Borde del Barrio",
      text: "Después de este farol la vereda deja de estar iluminada.",
      lore: "Volviste. Y ya sabés que la próxima vez vas a seguir un poco más.",
    },
    {
      km: 30,
      sector: 2,
      name: "La Avenida",
      relic: "Ruido de Fondo",
      text: "Cuatro carriles y nadie caminando.",
      lore: "Hay partes de la ciudad hechas para pasar, no para estar. Nunca las habías pisado.",
    },
    {
      km: 36,
      sector: 2,
      name: "El Puente",
      relic: "Vista Larga",
      text: "Desde acá se ve de dónde viniste.",
      lore: "Es menos de lo que se sentía. Y más de lo que creías que ibas a hacer.",
    },
    {
      km: 43,
      sector: 2,
      name: "El Descampado",
      relic: "Silencio Sin Techo",
      text: "Un terreno sin construir en el medio de todo.",
      lore: "El pasto te llega a la rodilla, pero hay un sendero marcado. Del ancho de una sola persona.",
    },
    {
      km: 50,
      sector: 2,
      name: "El Final del Mapa Conocido",
      relic: "Primera Vez Acá",
      text: "Hasta acá llegabas en auto. Nunca a pie.",
      lore: "La misma distancia, recorrida distinto, es otro lugar.",
    },
    {
      km: 58,
      sector: 3,
      name: "El Camino de Tierra",
      relic: "Polvo en los Cordones",
      text: "El asfalto se termina y sigue habiendo camino.",
      lore: "El piso deja de ser parejo. Tus tobillos aprenden algo que la vereda nunca les enseñó.",
    },
    {
      km: 68,
      sector: 3,
      name: "La Estación Vacía",
      relic: "Horario Viejo",
      text: "El tren dejó de pasar hace años. El andén sigue ahí.",
      lore: "Hay un banco gastado justo en el medio. Alguien lo usó mucho después del último tren.",
    },
    {
      km: 78,
      sector: 3,
      name: "La Lluvia a Mitad de Camino",
      relic: "Ropa Pesada",
      text: "Salió el día bien y a los veinte minutos no.",
      lore: "Volver era más largo que seguir. Es la primera vez que esa cuenta te da a favor.",
    },
    {
      km: 90,
      sector: 3,
      name: "La Hora Sin Nadie",
      relic: "La Calle Entera",
      text: "Ese rato en que la ciudad no es de nadie.",
      lore: "Escuchás tus propios pasos. No los habías escuchado nunca.",
    },
    {
      km: 100,
      sector: 4,
      name: "Los Cien",
      relic: "Número Redondo",
      text: "Cien kilómetros. A pie. Vos.",
      lore: "No los hiciste de una. Por eso cuentan.",
    },
    {
      km: 115,
      sector: 4,
      name: "El Segundo Aire",
      relic: "El Segundo Aire",
      text: "El punto donde estabas por parar y no paraste.",
      lore: "No apareció de la nada: estaba esperando del otro lado de querer parar.",
    },
    {
      km: 130,
      sector: 4,
      name: "La Cuesta que Ya No Es Cuesta",
      relic: "Pendiente Vencida",
      text: "La misma subida del kilómetro 3.",
      lore: "Llegaste arriba sin registrarla. Tuviste que volver a mirarla para acordarte de que era difícil.",
    },
    {
      km: 150,
      sector: 4,
      name: "El Kilómetro Aburrido",
      relic: "Cabeza Quieta",
      text: "No duele, no cuesta, no pasa nada. Solo hay que seguir.",
      lore: "Resulta que este es el difícil, y nadie lo cuenta.",
    },
    {
      km: 170,
      sector: 5,
      name: "El Cuerpo que Avisa",
      relic: "Señal Temprana",
      text: "Una molestia chica, mucho antes de ser un problema.",
      lore: "Aprendiste a distinguirla del cansancio. Eso no se explica: se camina.",
    },
    {
      km: 195,
      sector: 5,
      name: "El Día que No Querías",
      relic: "Fui Igual",
      text: "Todo decía que no. Fuiste.",
      lore: "No fue tu mejor día. Fue el que más contó.",
    },
    {
      km: 220,
      sector: 5,
      name: "La Distancia Sin Nombre",
      relic: "Ya No Cuento",
      text: "Dejaste de mirar cuánto falta.",
      lore: "El número seguía ahí. Dejó de ser la pregunta.",
    },
    {
      km: 250,
      sector: 5,
      name: "El Lugar de Siempre, de Nuevo",
      relic: "Ojo Nuevo",
      text: "Volviste a la primera cuadra.",
      lore: "Es idéntica. Cambió todo.",
    },
    {
      km: 290,
      sector: 6,
      name: "Más Allá de lo que Planeaste",
      relic: "Sin Plan",
      text: "Saliste sin saber hasta dónde.",
      lore: "Es la primera vez que no hacía falta saberlo.",
    },
    {
      km: 340,
      sector: 6,
      name: "La Distancia que Te Queda Chica",
      relic: "Medida Vieja",
      text: "Lo que antes era un día entero ahora es una salida.",
      lore: "El camino no se acortó. Lo hiciste vos.",
    },
    {
      km: 400,
      sector: 6,
      name: "Horizonte Propio",
      relic: "Marca del Caminante",
      text: "No hay nada acá salvo lo que trajiste.",
      lore: "Escribís tu nombre. Es la primera entrada del Códice que escribís vos.",
    },
  ],
  u2 = 0.6,
  Ed = { E: 40, D: 50, C: 65, B: 80, A: 100, S: 125, Z: 150 };
var sdcPortales = [
  { n: "La Guardia", c: "30 minutos de boxeo sombra", on: 180, off: 60 },
  { n: "El Rebote", c: "20 minutos de salto a la cuerda" },
  { n: "La Chispa", c: "30 minutos de cardio HIIT", on: 30, off: 30 },
  { n: "El Largo", c: "20 minutos de carrera continua" },
  { n: "La Cuesta", c: "25 minutos de subir y bajar escaleras" },
  { n: "La Soltura", c: "25 minutos de baile intenso" },
  { n: "La Rueda", c: "30 minutos de bicicleta" },
  { n: "El Motor", c: "15 minutos de burpees y jumping jacks intercalados", on: 45, off: 45 },
  { n: "El Ancla", c: "20 minutos de planchas y sostenes alternados", on: 45, off: 30 },
  { n: "La Ráfaga", c: "20 minutos de sprints cortos con pausa", on: 20, off: 40 },
];
function ai(e) {
  if (Math.random() > u2)
    return { available: !1, completed: !1, name: null, challengeText: null, rewardXP: null };
  let p = sdcPortales[Math.floor(Math.random() * sdcPortales.length)];
  return { available: !0, completed: !1, name: p.n, challengeText: p.c, rewardXP: Ed[e] };
}

export { l2, n2, Ny, o2, Po, i2, s2, pt, u2, Ed, sdcPortales, ai };
