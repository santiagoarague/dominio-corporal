// Senales de alarma, regla del dolor, cuidado articular y neuromotor.
import { multImpulso } from "../logica/tienda.js";
import { sistemas, sistemaAbierto } from "../logica/sistemas.js";
import { revisarLogros } from "./logros.js";
import { anotarDia, fechaHoy } from "../logica/rutina.js";
import { subirNiveles, clonar } from "../logica/partida.js";

var alarmas = [
    "Dolor agudo, punzante o que aparece de golpe",
    "Dolor que te despierta por la noche",
    "Hinchazón, calor o deformidad visible en la articulación",
    "Pérdida de fuerza o de movilidad que no mejora",
    "Hormigueo, entumecimiento o dolor que baja por el brazo o la pierna",
    "Dolor tras una caída, golpe o torsión brusca",
    "Molestia que lleva más de 6 semanas sin mejorar",
  ],
  reglaDolor =
    "Regla del dolor: una molestia leve (hasta 3 sobre 10) que no empeora al día siguiente es aceptable. Si sube de ahí, reduce el rango, la carga o el tiempo. El dolor no es la señal de que está funcionando.",
  cuidadoArticular = [
    {
      id: "hombro",
      zone: "Hombro",
      common: "Tendinopatía del manguito rotador y dolor al elevar el brazo",
      context:
        "Suele aparecer por mucho empuje (flexiones, press) sin trabajo de rotadores ni escápula. El objetivo es dar carga progresiva al tendón y devolver control a la escápula.",
      exercises: [
        {
          name: "Isométrico de rotación externa",
          how: "Codo pegado al costado a 90°, empuja contra una pared o marco hacia fuera sin moverte.",
          dose: "5 × 30 s · 30 s de descanso",
          why: "Los isométricos suelen calmar el dolor del tendón y le dan carga sin movimiento.",
        },
        {
          name: "Rotación externa con banda",
          how: "Banda a la altura del codo, gira el antebrazo hacia fuera manteniendo el codo fijo al costado.",
          dose: "3 × 12 lento (3 s de vuelta)",
          why: "Fortalece infraespinoso y redondo menor, los que suelen quedarse atrás.",
        },
        {
          name: "Deslizamiento en pared (wall slide)",
          how: "Antebrazos en la pared, sube y baja manteniendo contacto, sin encoger los hombros.",
          dose: "3 × 10",
          why: "Reeduca el ritmo escápulo-humeral: la escápula debe rotar, no solo el brazo.",
        },
        {
          name: "Face pull o remo alto",
          how: "Con banda a la altura de la cara, tira separando las manos y juntando escápulas.",
          dose: "3 × 15",
          why: "Equilibra el exceso de empuje con trabajo de espalda alta.",
        },
      ],
    },
    {
      id: "codo",
      zone: "Codo",
      common: "Epicondilitis (codo de tenista) y epitrocleitis (codo de golfista)",
      context:
        "Muy común en dominadas, remos y trabajo de agarre. El tendón no está roto: está poco tolerante a la carga. Se trata cargándolo despacio, no reposando del todo.",
      exercises: [
        {
          name: "Isométrico de muñeca",
          how: "Antebrazo apoyado, sujeta un peso ligero y aguanta la muñeca en extensión sin moverla.",
          dose: "5 × 30 s",
          why: "Calma el dolor y prepara el tendón para la fase excéntrica.",
        },
        {
          name: "Excéntrico de extensores",
          how: "Sube la muñeca con la otra mano y baja sola en 4 segundos con peso ligero.",
          dose: "3 × 15 muy lento",
          why: "La fase excéntrica lenta es la que mejor remodela el tendón.",
        },
        {
          name: "Excéntrico de flexores",
          how: "Lo mismo pero con la palma hacia arriba, para el lado interno del codo.",
          dose: "3 × 15 muy lento",
          why: "Para el codo de golfista, cara interna.",
        },
        {
          name: "Agarre progresivo",
          how: "Aprieta una pelota blanda o toalla enrollada y mantén.",
          dose: "3 × 20 s",
          why: "Reconstruye tolerancia al agarre, que es lo que dispara el dolor.",
        },
      ],
    },
    {
      id: "muneca",
      zone: "Muñeca",
      common: "Dolor al apoyar peso (pino, bestia, flexiones)",
      context:
        "La muñeca no está preparada para cargar en extensión completa. Se gana con preparación específica, no evitándola.",
      exercises: [
        {
          name: "Movilidad en cuadrupedia",
          how: "Manos en el suelo, desplaza el peso adelante y atrás, luego círculos suaves.",
          dose: "2 min antes de entrenar",
          why: "Prepara el tejido antes de cargar.",
        },
        {
          name: "Apoyo en dorso de la mano",
          how: "En cuadrupedia, apoya el dorso de las manos y carga suavemente.",
          dose: "3 × 20 s",
          why: "Trabaja el rango contrario, que casi nadie entrena.",
        },
        {
          name: "Extensores de muñeca con banda",
          how: "Banda sobre el dorso de los dedos, ábrelos contra la resistencia.",
          dose: "3 × 15",
          why: "Equilibra la musculatura flexora dominante.",
        },
        {
          name: "Apoyo progresivo en puños",
          how: "Haz las flexiones o el beast hold sobre puños hasta ganar tolerancia.",
          dose: "Sustituye el apoyo habitual",
          why: "Permite seguir entrenando mientras la muñeca mejora.",
        },
      ],
    },
    {
      id: "lumbar",
      zone: "Lumbar",
      common: "Dolor lumbar inespecífico y rigidez al levantarte",
      context:
        "Casi siempre mejora con movimiento, no con reposo. La clave es rigidez del core en cargas y movilidad de cadera, para que la lumbar deje de compensar.",
      exercises: [
        {
          name: "Bird dog",
          how: "En cuadrupedia, extiende brazo y pierna opuestos sin que la cadera rote.",
          dose: "3 × 8 por lado, 3 s arriba",
          why: "Anti-rotación: enseña a la columna a quedarse quieta mientras te mueves.",
        },
        {
          name: "Plancha lateral",
          how: "De lado, apoya antebrazo y rodillas o pies, cadera elevada y alineada.",
          dose: "3 × 20-30 s por lado",
          why: "Refuerza el cuadrado lumbar y los oblicuos.",
        },
        {
          name: "Puente de glúteos",
          how: "Tumbado, eleva la cadera apretando glúteos sin arquear la lumbar.",
          dose: "3 × 15",
          why: "Si el glúteo no trabaja, la lumbar hace su trabajo.",
        },
        {
          name: "Gato-vaca y 90/90",
          how: "Movilidad suave de columna y rotación de cadera sentado.",
          dose: "2 min",
          why: "Devuelve movilidad a cadera y torácica para descargar la zona lumbar.",
        },
      ],
    },
    {
      id: "cadera",
      zone: "Cadera",
      common: "Pinzamiento, rigidez y dolor en la ingle al bajar en sentadilla",
      context:
        "Suele mezclarse falta de movilidad con poco control del glúteo. Trabaja ambos, no solo estirar.",
      exercises: [
        {
          name: "Rotaciones 90/90",
          how: "Sentado con ambas rodillas a 90°, gira de un lado al otro sin usar las manos.",
          dose: "3 × 8 por lado",
          why: "Gana rotación interna y externa, lo primero que se pierde.",
        },
        {
          name: "Estiramiento de flexores en zancada",
          how: "Rodilla trasera en el suelo, mete la pelvis y aprieta el glúteo del lado que estiras.",
          dose: "3 × 30 s por lado",
          why: "Estar sentado acorta el psoas y bascula la pelvis.",
        },
        {
          name: "Abducción tumbado de lado",
          how: "De lado, eleva la pierna de arriba con la punta ligeramente hacia abajo.",
          dose: "3 × 15 por lado",
          why: "Activa el glúteo medio, clave para la estabilidad de rodilla y cadera.",
        },
        {
          name: "Sentadilla profunda sostenida",
          how: "Baja a cuclillas completas y aguanta, usando los codos para abrir rodillas.",
          dose: "3 × 30 s",
          why: "Recupera el rango completo que la vida sedentaria elimina.",
        },
      ],
    },
    {
      id: "rodilla",
      zone: "Rodilla",
      common: "Tendinopatía rotuliana (rodilla del saltador) y dolor femoropatelar",
      context:
        "El tendón rotuliano responde muy bien a carga lenta y progresiva. Evitar sentadillas del todo suele empeorarlo a medio plazo.",
      exercises: [
        {
          name: "Sentadilla isométrica en pared",
          how: "Espalda en la pared, rodillas a 60-90°, aguanta.",
          dose: "5 × 45 s",
          why: "Reduce el dolor del tendón y mantiene la fuerza del cuádriceps.",
        },
        {
          name: "Sentadilla lenta a caja",
          how: "Baja en 4 segundos hasta sentarte y sube normal.",
          dose: "3 × 8",
          why: "Carga controlada y progresiva sobre el tendón.",
        },
        {
          name: "Extensión terminal (step-down)",
          how: "De pie en un escalón, baja lentamente el otro pie hasta rozar el suelo.",
          dose: "3 × 10 por pierna",
          why: "Trabaja el control excéntrico donde suele doler.",
        },
        {
          name: "Fortalecer glúteo e isquios",
          how: "Puente de glúteos y curl nórdico asistido o peso muerto a una pierna.",
          dose: "3 × 10",
          why: "Una cadena posterior débil sobrecarga la rodilla.",
        },
      ],
    },
    {
      id: "cuello",
      zone: "Cuello",
      common: "Rigidez cervical y tensión por postura y pantallas",
      context: "No es solo el cuello: suele venir de una torácica rígida y una escápula dormida.",
      exercises: [
        {
          name: "Retracción cervical (chin tuck)",
          how: "Sin mover la cabeza arriba o abajo, lleva el mentón hacia atrás haciendo doble papada.",
          dose: "3 × 10, 3 s cada una",
          why: "Activa los flexores profundos, que sostienen la cabeza.",
        },
        {
          name: "Extensión torácica sobre rodillo",
          how: "Rodillo o toalla enrollada bajo la espalda alta, abre el pecho sin arquear la lumbar.",
          dose: "2 min",
          why: "Si la torácica no extiende, el cuello lo compensa.",
        },
        {
          name: "Retracción escapular",
          how: "Junta las escápulas y bájalas, sin encoger los hombros.",
          dose: "3 × 12, 3 s",
          why: "Descarga los trapecios superiores, siempre sobrecargados.",
        },
        {
          name: "Movilidad cervical suave",
          how: "Rotaciones e inclinaciones lentas, sin llegar al dolor.",
          dose: "2 min",
          why: "Mantiene el rango sin provocar.",
        },
      ],
    },
    {
      id: "tobillo",
      zone: "Tobillo y Aquiles",
      common: "Tendinopatía de Aquiles y falta de dorsiflexión",
      context:
        "Poca movilidad de tobillo arruina sentadillas y pistols, y sobrecarga el Aquiles y la rodilla.",
      exercises: [
        {
          name: "Isométrico de gemelo",
          how: "De puntillas sobre ambos pies, aguanta arriba.",
          dose: "5 × 30 s",
          why: "Calma el tendón y mantiene la fuerza.",
        },
        {
          name: "Elevación de talón excéntrica",
          how: "Sube con dos pies, baja con uno en 4 segundos desde un escalón.",
          dose: "3 × 12 por pierna",
          why: "El protocolo excéntrico clásico para el Aquiles.",
        },
        {
          name: "Movilidad de dorsiflexión",
          how: "Rodilla hacia la pared con el talón clavado, busca tocar sin levantarlo.",
          dose: "3 × 10 por lado",
          why: "Gana el rango necesario para sentadilla profunda.",
        },
        {
          name: "Equilibrio a una pierna",
          how: "Aguanta sobre un pie, luego con los ojos cerrados.",
          dose: "3 × 30 s por lado",
          why: "Recupera la propiocepción tras cualquier esguince.",
        },
      ],
    },
  ],
  xpCuidado = 20;
function registrarCuidado(actual, id) {
  let partida = clonar(actual),
    avisos = [],
    hoy = fechaHoy();
  if (
    (partida.care || (partida.care = { today: { date: hoy, done: [] }, lifetime: 0 }),
    partida.neuro || (partida.neuro = neuroInicial()),
    partida.unlockAll === void 0 && (partida.unlockAll = !1),
    partida.disabled || (partida.disabled = []),
    partida.seenUnlocks ||
      (partida.seenUnlocks = sistemas
        .filter((sis) => sistemaAbierto(partida, sis.id))
        .map((sis) => sis.id)),
    partida.care.today.date !== hoy && (partida.care.today = { date: hoy, done: [] }),
    partida.care.today.done.includes(id))
  )
    return { state: partida, notices: ["Ya registraste este protocolo hoy."] };
  (partida.care.today.done.push(id), (partida.care.lifetime = (partida.care.lifetime || 0) + 1));
  let xp = Math.round(xpCuidado * multImpulso(partida));
  (partida.streak.flexBuff && (xp = Math.round(xp * 1.1)),
    (partida.progress.currentXP += xp),
    (partida.today.xpEarned = (partida.today.xpEarned || 0) + xp));
  let protocolo = cuidadoArticular.find((prot) => prot.id === id);
  (avisos.push(`Cuidado articular registrado: ${protocolo ? protocolo.zone : id}. +${xp} XP.`),
    (partida = subirNiveles(partida, avisos)));
  let conLogros = revisarLogros(partida);
  return { state: conLogros.state, notices: [...avisos, ...conLogros.notices] };
}
var senalesReaccion = [
    { label: "IZQUIERDA", action: "Desplázate un paso lateral a tu izquierda", color: "#4f9dff" },
    { label: "DERECHA", action: "Desplázate un paso lateral a tu derecha", color: "#3ecf8e" },
    { label: "ABAJO", action: "Bajá a posición de bestia y volvé", color: "#ffb84f" },
    { label: "SALTA", action: "Salto vertical con recepción suave", color: "#ff5c7a" },
    { label: "GIRA", action: "Media vuelta sobre vos mismo", color: "#b084f5" },
  ],
  movimientosSecuencia = [
    "Bestia",
    "Cangrejo",
    "Escorpión",
    "Cambio por debajo",
    "Patada cruzada",
    "Sentadilla",
    "Plancha",
    "Salto",
  ],
  sostenesDual = [
    "Plancha frontal",
    "Sentadilla en pared",
    "A cuatro patas con las rodillas flotando",
    "Plancha lateral",
    "Boca arriba con hombros y piernas despegados",
  ],
  tareasMentales = [
    "Cuenta hacia atrás de 7 en 7 desde 300, en voz alta",
    "Di nombres de animales sin repetir, uno por segundo",
    "Recita el alfabeto al revés",
    "Di los meses del año en orden inverso",
    "Nombra ciudades por cada letra del abecedario",
  ],
  patronesCruzados = [
    "Mano derecha toca rodilla izquierda, luego mano izquierda toca rodilla derecha",
    "Codo derecho a rodilla izquierda, alternando, sin parar",
    "Mano derecha toca talón izquierdo por detrás, alternando",
    "Rodilla al pecho alternando + palmada por debajo del muslo",
  ],
  xpNeuromotor = 15,
  bpmRitmo = [60, 72, 84, 96, 108, 120];
function neuroInicial() {
  return {
    bestSpeedLevel: 0,
    reactionDrills: 0,
    bestSequence: 0,
    bestDualSec: 0,
    bestBpm: 0,
    sessions: 0,
  };
}
function registrarNeuromotor(actual, tipo, valor, anotar) {
  let partida = clonar(actual),
    avisos = [];
  (partida.neuro || (partida.neuro = neuroInicial()),
    partida.unlockAll === void 0 && (partida.unlockAll = !1),
    partida.disabled || (partida.disabled = []),
    partida.seenUnlocks ||
      (partida.seenUnlocks = sistemas
        .filter((sis) => sistemaAbierto(partida, sis.id))
        .map((sis) => sis.id)));
  let marca = !1;
  (tipo === "reaction"
    ? (valor > (partida.neuro.bestSpeedLevel || 0) &&
        ((partida.neuro.bestSpeedLevel = valor), (marca = !0)),
      (partida.neuro.reactionDrills = (partida.neuro.reactionDrills || 0) + 1))
    : tipo === "sequence"
      ? valor > partida.neuro.bestSequence && ((partida.neuro.bestSequence = valor), (marca = !0))
      : tipo === "dual"
        ? valor > partida.neuro.bestDualSec && ((partida.neuro.bestDualSec = valor), (marca = !0))
        : tipo === "coord" &&
          valor > partida.neuro.bestBpm &&
          ((partida.neuro.bestBpm = valor), (marca = !0)),
    (partida.neuro.sessions = (partida.neuro.sessions || 0) + 1));
  let xp = Math.round(xpNeuromotor * multImpulso(partida));
  ((partida.progress.currentXP += xp),
    (partida.today.xpEarned = (partida.today.xpEarned || 0) + xp),
    avisos.push(
      marca ? `¡Nueva marca personal! +${xp} XP.` : `Sesión neuromotora registrada. +${xp} XP.`,
    ),
    anotar && (partida = anotarDia(partida, "Neuromotor")),
    (partida = subirNiveles(partida, avisos)));
  let conLogros = revisarLogros(partida);
  return { state: conLogros.state, notices: [...avisos, ...conLogros.notices] };
}

export {
  alarmas,
  reglaDolor,
  cuidadoArticular,
  xpCuidado,
  registrarCuidado,
  senalesReaccion,
  movimientosSecuencia,
  sostenesDual,
  tareasMentales,
  patronesCruzados,
  xpNeuromotor,
  bpmRitmo,
  neuroInicial,
  registrarNeuromotor,
};
