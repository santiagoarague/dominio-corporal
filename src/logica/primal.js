// Instinto Primal y utilidades que lo rodean (Dd es el hash del dia).
import { Ka, Sd } from "./tienda.js";
import { da, ni } from "../datos/logros.js";
import { Dl, ue } from "./rutina.js";
import { Ea, M } from "./partida.js";

var cy = 15,
  k2 = 5,
  xd = 2,
  z2 = 20,
  Oa = [
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
      desc: "Crawl bajo con el pecho cerca del suelo, llevando la rodilla hacia el codo externo en cada paso.",
    },
    {
      name: "Cocodrilo",
      desc: "Plancha ancha y baja, avanzando con push-ups controlados hacia adelante.",
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
      name: "Skater Lateral",
      desc: "Saltos laterales alternando piernas, tocando el suelo detrás con la mano opuesta.",
    },
    {
      name: "Bestia",
      desc: "Desde posición de bestia (rodillas flotando sobre el suelo), alcanza el techo alternando brazos.",
    },
    {
      name: "Araña",
      desc: "Crawl llevando la rodilla hacia el codo del mismo lado, rotando la cadera.",
    },
    {
      name: "Escorpión",
      desc: "Desde posición de bestia, mete una pierna por debajo del cuerpo hacia el lado contrario.",
    },
    {
      name: "Shuffle Rítmico",
      desc: "Desplazamiento lateral tipo baile con sentadilla ligera en cada cambio de dirección.",
    },
    {
      name: "High Knees al Ritmo",
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
      name: "Burpee Flow",
      desc: "Burpee combinado con un salto lateral antes de bajar a la siguiente repetición.",
    },
    {
      name: "Sombra de Combate",
      desc: "Boxeo sombra dinámico combinado con desplazamiento lateral constante.",
    },
    {
      name: "Flujo Encadenado",
      desc: "Secuencia continua combinando bestia, escorpión y cambio bajo sin pausas.",
    },
    {
      name: "Beast Hold",
      desc: "Sostén en cuadrupedia con rodillas a un centímetro del suelo, espalda plana y core activo.",
    },
    {
      name: "Movilidad 90/90",
      desc: "Sentado con ambas rodillas a 90°, rota de un lado al otro sin usar las manos.",
    },
    {
      name: "Underswitch",
      desc: "Desde posición de bestia, pasa una pierna por debajo del cuerpo y rota hacia el lado opuesto.",
    },
    {
      name: "Kickthrough",
      desc: "Desde bestia, patea una pierna cruzada por debajo mientras levantas la mano contraria.",
    },
  ];
function ky() {
  return { unlockedCount: 1, masteryProgress: 0, today: { date: ue(), count: 0 } };
}
function E2(e, a) {
  let l = M(e),
    n = [],
    o = ue();
  if (
    (l.primal.today.date !== o && (l.primal.today = { date: o, count: 0 }),
    l.primal.today.count >= Sd(l))
  )
    return {
      state: l,
      notices: [`Ya alcanzaste tu máximo de ${Sd(l)} movimientos hoy en Instinto Primal.`],
    };
  ((l.primal.today.count += 1),
    (l.lifetimePrimal = (l.lifetimePrimal || 0) + 1),
    (l.week.primal = (l.week.primal || 0) + 1),
    (l = Dl(l, "Instinto Primal")));
  let s = z2;
  (l.streak.flexBuff && (s = Math.round(s * 1.1)),
    (s = Math.round(s * Ka(l))),
    (l.progress.currentXP += s),
    (l.today.xpEarned = (l.today.xpEarned || 0) + s),
    n.push(`+${s} XP por practicar ${Oa[a].name}.`),
    a === l.primal.unlockedCount - 1 &&
      ((l.primal.masteryProgress += 1),
      l.primal.masteryProgress >= xd &&
        l.primal.unlockedCount < Oa.length &&
        ((l.primal.unlockedCount += 1),
        (l.primal.masteryProgress = 0),
        n.push(`¡Nuevo movimiento descubierto! ${Oa[l.primal.unlockedCount - 1].name}`))),
    (l = Ea(l, n)));
  let u = da(l),
    c = { state: u.state, notices: [...n, ...u.notices] },
    r = ni(c.state);
  return { state: r.state, notices: [...c.notices, ...r.notices] };
}
var ou = [
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
  ],
  Js = {
    squat:
      "Si la sentadilla completa es muy exigente, apóyate en una silla o pared, o reduce la profundidad. La forma correcta importa más que el rango completo.",
    pushup:
      "Si no llegas a las repeticiones completas, apoya las rodillas en el suelo. Sigues trabajando el mismo movimiento con menos carga.",
    back: "Si te cuesta mantener la posición, reduce cuánto elevas el pecho y las piernas, o sostén por menos tiempo. La técnica limpia vale más que la altura.",
    abs: "Si sientes tensión en el cuello, cruza los brazos sobre el pecho en vez de apoyar las manos detrás de la cabeza.",
  };
function Dd(e, a) {
  let l = 0;
  for (let n = 0; n < e.length; n++) l = (l * 31 + e.charCodeAt(n)) >>> 0;
  return l % a;
}
function A2(e) {
  return ou[Dd(e, ou.length)];
}
var D2 = [
    '{name} te espera en la puerta: "Un día no define tu camino. ¿Volvemos hoy?"',
    '{name} te da un empujoncito: "Lo importante no es no fallar nunca, es volver siempre."',
    '{name} te mira con cariño: "Ayer no cuenta más que hoy. Vamos de nuevo."',
  ],
  T2 = [
    '{name} te anima: "Cualquier esfuerzo cuenta más que quedarte quieto. Mañana con más fuerza."',
    '{name} asiente: "Hoy fue un día difícil, y está bien. Lo que importa es que apareciste."',
  ];
function zy(e, a, l) {
  return e[Dd(a, e.length)].replace("{name}", l || "Tu compañero");
}

export { cy, k2, xd, z2, Oa, ky, E2, ou, Js, Dd, A2, D2, T2, zy };
