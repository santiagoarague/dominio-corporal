// Instinto Primal y utilidades que lo rodean (Dd es el hash del dia).
import { multImpulso, sesionesPrimalHoy } from "./tienda.js";
import { revisarLogros, avisoCarga } from "../datos/logros.js";
import { anotarDia, fechaHoy } from "./rutina.js";
import { subirNiveles, clonar } from "./partida.js";

var descansoPrimal = 15,
  sesionesPrimalBase = 5,
  vecesParaDominar = 2,
  xpPrimal = 20,
  movimientosPrimal = [
    {
      name: "Oso",
      desc: "Camina en 4 apoyos con las rodillas cerca del suelo sin tocarlo, alternando brazo y pierna opuesta.",
    },
    {
      name: "Pato",
      desc: "Sentadilla profunda caminando hacia adelante, manteniendo el torso lo más erguido posible.",
    },
    {
      name: "Cangrejo",
      desc: "Apoya manos y pies con la cadera elevada y camina hacia atrás o hacia los lados.",
    },
    {
      name: "Oruga",
      desc: "Desde de pie, camina las manos hacia adelante hasta plancha y regresa caminando los pies hacia ellas.",
    },
    {
      name: "Lagartija",
      desc: "Gateo bajo con el pecho cerca del suelo, llevando la rodilla hacia el codo externo en cada paso.",
    },
    {
      name: "Cocodrilo",
      desc: "Plancha ancha y baja, avanzando con flexiones controladas hacia adelante.",
    },
    {
      name: "Rana",
      desc: "Sentadilla profunda con salto explosivo hacia adelante, aterrizando suave.",
    },
    {
      name: "Mono",
      desc: "Desde posición agachada, salta lateralmente alcanzando el suelo con ambas manos.",
    },
    {
      name: "Canguro",
      desc: "Saltos explosivos hacia adelante llevando las rodillas hacia el pecho.",
    },
    {
      name: "Patinador lateral",
      desc: "Saltos laterales alternando piernas, tocando el suelo detrás con la mano opuesta.",
    },
    {
      name: "Bestia",
      desc: "Desde posición de bestia (rodillas flotando sobre el suelo), alcanza el techo alternando brazos.",
    },
    {
      name: "Araña",
      desc: "Gateo llevando la rodilla hacia el codo del mismo lado, rotando la cadera.",
    },
    {
      name: "Escorpión",
      desc: "Desde posición de bestia, mete una pierna por debajo del cuerpo hacia el lado contrario.",
    },
    {
      name: "Paso lateral al ritmo",
      desc: "Desplazamiento lateral tipo baile con sentadilla ligera en cada cambio de dirección.",
    },
    {
      name: "Rodillas arriba al ritmo",
      desc: "Rodillas altas rápidas alternando con cambios de dirección cada pocos segundos.",
    },
    {
      name: "Cambio Bajo",
      desc: "Transición rotando bajo el cuerpo entre bestia y sentado lateral, sin tocar el suelo con la cadera.",
    },
    {
      name: "Puente de Cangrejo",
      desc: "Desde cangrejo, eleva la cadera y alcanza hacia atrás con un brazo, alternando.",
    },
    {
      name: "Burpee con salto lateral",
      desc: "Burpee combinado con un salto lateral antes de bajar a la siguiente repetición.",
    },
    {
      name: "Sombra de Combate",
      desc: "Golpes de boxeo al aire, en movimiento, con desplazamiento lateral constante.",
    },
    {
      name: "Flujo Encadenado",
      desc: "Secuencia continua combinando bestia, escorpión y cambio bajo sin pausas.",
    },
    {
      name: "Bestia quieta",
      desc: "Sostén a cuatro patas con las rodillas a un centímetro del suelo, la espalda plana y el abdomen apretado.",
    },
    {
      name: "Movilidad 90/90",
      desc: "Sentado con ambas rodillas a 90°, rota de un lado al otro sin usar las manos.",
    },
    {
      name: "Cambio por debajo",
      desc: "Desde posición de bestia, pasa una pierna por debajo del cuerpo y rota hacia el lado opuesto.",
    },
    {
      name: "Patada cruzada",
      desc: "Desde bestia, patea una pierna cruzada por debajo mientras levantas la mano contraria.",
    },
  ];
function primalInicial() {
  return { unlockedCount: 1, masteryProgress: 0, today: { date: fechaHoy(), count: 0 } };
}
function registrarPrimal(actual, indice) {
  let partida = clonar(actual),
    avisos = [],
    hoy = fechaHoy();
  if (
    (partida.primal.today.date !== hoy && (partida.primal.today = { date: hoy, count: 0 }),
    partida.primal.today.count >= sesionesPrimalHoy(partida))
  )
    return {
      state: partida,
      notices: [
        `Ya alcanzaste tu máximo de ${sesionesPrimalHoy(partida)} movimientos hoy en Instinto Primal.`,
      ],
    };
  ((partida.primal.today.count += 1),
    (partida.lifetimePrimal = (partida.lifetimePrimal || 0) + 1),
    (partida.week.primal = (partida.week.primal || 0) + 1),
    (partida = anotarDia(partida, "Instinto Primal")));
  let xp = xpPrimal;
  (partida.streak.flexBuff && (xp = Math.round(xp * 1.1)),
    (xp = Math.round(xp * multImpulso(partida))),
    (partida.progress.currentXP += xp),
    (partida.today.xpEarned = (partida.today.xpEarned || 0) + xp),
    avisos.push(`+${xp} XP por practicar ${movimientosPrimal[indice].name}.`),
    indice === partida.primal.unlockedCount - 1 &&
      ((partida.primal.masteryProgress += 1),
      partida.primal.masteryProgress >= vecesParaDominar &&
        partida.primal.unlockedCount < movimientosPrimal.length &&
        ((partida.primal.unlockedCount += 1),
        (partida.primal.masteryProgress = 0),
        avisos.push(
          `¡Nuevo movimiento descubierto! ${movimientosPrimal[partida.primal.unlockedCount - 1].name}`,
        ))),
    (partida = subirNiveles(partida, avisos)));
  let conLogros = revisarLogros(partida),
    conAvisos = { state: conLogros.state, notices: [...avisos, ...conLogros.notices] },
    conCarga = avisoCarga(conAvisos.state);
  return { state: conCarga.state, notices: [...conAvisos.notices, ...conCarga.notices] };
}
var consejos = [
  "No te olvides de hidratarte antes y después de entrenar.",
  "Un calentamiento de 5 minutos reduce el riesgo de lesiones.",
  "Los músculos crecen en el descanso, no solo en el esfuerzo. Tu día de descanso es parte del plan, no una excepción.",
  "Si un ejercicio se siente demasiado fácil, es buena señal — estás listo para más.",
  "Mejor 10 repeticiones con buena técnica que 20 apuradas.",
  "Dormir bien es tan importante como entrenar bien.",
  "El dolor agudo o punzante no es normal. Si algo duele mal, pará y descansá.",
  "Entrenar un poco todos los días vale más que entrenar mucho una sola vez.",
  "Respirá: exhalá en el esfuerzo, inhalá en el regreso.",
  "Si te sentís muy cansado, el Modo Recuperación existe justo para eso — usalo sin culpa.",
  "Estirar después de entrenar ayuda a tu cuerpo a recuperarse mejor.",
  "Progresar no siempre se ve como hacer más — a veces es hacerlo mejor.",
  "Tu cuerpo de hoy no es tu cuerpo de mañana. Sé paciente con vos mismo.",
  "Antes de aumentar la dificultad, asegurate de dominar la técnica actual.",
  "Un buen calzado y una superficie estable evitan muchas lesiones innecesarias.",
];
function hashDia(texto, opciones) {
  let hash = 0;
  for (let indice = 0; indice < texto.length; indice++)
    hash = (hash * 31 + texto.charCodeAt(indice)) >>> 0;
  return hash % opciones;
}
function consejoDelDia(fecha) {
  return consejos[hashDia(fecha, consejos.length)];
}
var frasesVolver = [
    '{name} te espera en la puerta: "Un día no define tu camino. ¿Volvemos hoy?"',
    '{name} te da un empujoncito: "Lo importante no es no fallar nunca, es volver siempre."',
    '{name} te mira con cariño: "Ayer no cuenta más que hoy. Vamos de nuevo."',
  ],
  frasesDiaDificil = [
    '{name} te anima: "Cualquier esfuerzo cuenta más que quedarte quieto. Mañana con más fuerza."',
    '{name} asiente: "Hoy fue un día difícil, y está bien. Lo que importa es que apareciste."',
  ];
function fraseMascota(frases, fecha, nombre) {
  return frases[hashDia(fecha, frases.length)].replace("{name}", nombre || "Tu compañero");
}

// Que muestra la sesion en cada segundo. El descanso entre rondas (cy) termina
// con sdcPrimalPrep segundos de preparacion: la ronda que viene se anuncia antes
// de arrancar, como en todo lo guiado. La ronda 0 es la cuenta antes de la primera.
var sdcPrimalPrep = 5;
function sdcPrimalEtapa(fase, ronda, seg) {
  if (fase === "resting")
    return ronda === 0 ? "posicion" : seg <= sdcPrimalPrep ? "prepara" : "descanso";
  return fase === "active" ? "ronda" : fase;
}
// La cuenta 3-2-1 suena antes de que arranque una ronda y antes de que termine.
function sdcPrimalTic(fase, seg) {
  return (fase === "resting" || fase === "active") && seg >= 1 && seg <= 3;
}

export {
  descansoPrimal,
  sesionesPrimalBase,
  vecesParaDominar,
  xpPrimal,
  movimientosPrimal,
  primalInicial,
  registrarPrimal,
  consejos,
  hashDia,
  consejoDelDia,
  frasesVolver,
  frasesDiaDificil,
  fraseMascota,
  sdcPrimalPrep,
  sdcPrimalEtapa,
  sdcPrimalTic,
};
