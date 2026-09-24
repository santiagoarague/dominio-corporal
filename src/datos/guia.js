// La guia (¿Como funciona?) y las habilidades.
import { multImpulso } from "../logica/tienda.js";
import { Al } from "./salud.js";
import { sistemas, sistemaAbierto } from "../logica/sistemas.js";
import { revisarLogros } from "./logros.js";
import { fechaHoy } from "../logica/rutina.js";
import { subirNiveles, clonar } from "../logica/partida.js";

var guia = [
    {
      g: "PARA EMPEZAR",
      title: "Tu rutina de hoy",
      text: "Cada día la app te arma una rutina con cuatro ejercicios, uno por cada zona grande del cuerpo: piernas, empuje (pecho, hombros y brazos), tracción (espalda) y core (la zona del abdomen). A esas cuatro las llamamos patrones, y así van a aparecer nombradas en todo el juego. Cada patrón tiene su número de repeticiones para hoy, y no hace falta que las hagas todas seguidas ni a una hora fija. Si no conocés un ejercicio, tocá ¿Cómo se hace? debajo del nombre: ahí están la posición de arranque, el movimiento y el error que más se comete. La primera vez que te toca un ejercicio nuevo se abre solo, y a partir de la segunda queda cerrado. Arriba de la rutina está el Calentamiento: unos siete minutos guiados que suben el pulso, aflojan las articulaciones y terminan con pocas repeticiones suaves de tus cuatro ejercicios de hoy. La primera vez que te toca cada movimiento, el reloj espera a que toques Listo.",
    },
    {
      g: "PARA EMPEZAR",
      title: "Cómo se anota lo que hacés",
      text: "Las repeticiones de cada patrón vienen partidas en dos o tres series, y cada serie es un botón. Tocalo apenas terminás esa serie, no al final de todo: la app suena, vibra, te suma la XP y te arranca el descanso, que queda fijo abajo de la pantalla. Cuando terminás todas las series de un ejercicio, se pliega: tocalo para abrirlo de nuevo. Si una serie te salió más corta de lo pedido, tocá el − N + de la serie que queda pendiente y anotá lo que hiciste de verdad. Lo que se guarda es lo que hiciste, no lo que decía la meta. Si entrenás en gimnasio, debajo de las series vas a ver un campo de kilos para cada una: podés subir el peso serie a serie, y la próxima vez la app te recuerda lo que usaste la última.",
    },
    {
      g: "PARA EMPEZAR",
      title: "Tu semana",
      text: "Vos elegís cuántas sesiones querés hacer por semana. Cuenta como sesión la rutina, una travesía, ganar un combate, una sesión de Instinto Primal o terminar una expedición: cualquiera de ellas marca el día como entrenado. Tu racha solo se corta si te salteás tantos días que ya no te alcanza para llegar a la meta. Un día suelto sin entrenar no cuesta nada, y nunca perdés XP. Abajo de la meta están los cuadraditos de tus últimos días, cada uno con el color del tipo de día que fue; tocá cualquiera para ver qué hiciste.",
    },
    {
      g: "PARA EMPEZAR",
      title: "Si hoy no podés",
      text: "Hay tres salidas y ninguna te castiga. Modo Recuperación: hacés la mitad de las repeticiones, cuenta como entrenar y te mantiene la racha; está para los días en que llegás fundido. Día de descanso: uno por semana, el día que vos quieras, no da XP pero te conserva la racha y no cuenta como falta. Escudo de Racha: se compra con Puntos de Dominio y se gasta solo cuando hace falta, absorbiendo un día fallado sin que se corte nada. Y antes de entrenar la app te pregunta cómo llegás: si llegás sin ganas, te propone empezar por el calentamiento y hacer la rutina en Recuperación, y al terminar te pregunta cómo te vas. Con el tiempo vas a ver cuántas veces terminaste mejor de lo que llegaste. Si tocaste la cara que no era, «Cambiar respuesta» la corrige: la de llegada hasta que marcás la primera serie, la de salida en el resumen de la rutina. Se apaga en Perfil, en Sistemas del juego.",
    },
    {
      g: "CÓMO PROGRESÁS",
      title: "Niveles y XP",
      text: "XP son los puntos que vas juntando. Todo lo que hacés da XP: la rutina, las travesías, el combate, el Instinto Primal, las expediciones, el calentamiento y el estiramiento. Cuando se llena la barra de arriba, subís un nivel. Cada nivel cuesta un poco más que el anterior, así que al principio subís seguido y después se va espaciando. Nunca perdés XP. Subir de nivel además abre sistemas nuevos: Combate, Travesías, Explorar y el resto van apareciendo solos. Arriba de todo siempre dice cuál es el próximo y a qué nivel llega.",
    },
    {
      g: "CÓMO PROGRESÁS",
      title: "Los rangos y el Umbral",
      text: "El rango es tu etapa, y hay siete. Cambia dos cosas: qué versión de cada ejercicio te toca (de la más asistida a la más difícil) y cuántas repeticiones hacés. Todo el mundo empieza en el primero: la prueba inicial ajusta cuántas repeticiones hacés, no el rango. Para pasar al siguiente rango hay que llegar a cierto nivel, sumar 24 rutinas completas en ese rango y superar el Umbral, una prueba que aparece sola y encadena varias rondas de los cuatro patrones con los ejercicios del rango que viene; solo podés darla un día en el que hayas completado tu rutina al 100%. En el séptimo y último rango el objetivo diario deja de salir de una tabla: es superar tu propio récord por lo menos un 1%, y si pasás siete días sin una rutina completa bajás al anterior hasta que vuelvas.",
    },
    {
      g: "CÓMO PROGRESÁS",
      title: "Tu calibre",
      text: "Es lo que dice abajo de tu nombre: Principiante, Intermedio, Avanzado y así. Sale de la prueba de aptitud y no es lo mismo que el rango. El rango es lo que ganás entrenando; el calibre es lo que medís hoy. Solo sirve para ajustar cuántas repeticiones te toca hacer. Podés repetir la prueba cuando quieras desde tu Perfil, y repetirla no te cambia el rango ni te borra nada.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Combate",
      text: "Elegís con qué patrón atacar y la app te dice cuántas repeticiones vas a hacer y cuántos segundos vas a tener. El reloj arranca recién cuando tocás Empezar, nunca antes. Marcás cada serie igual que en la rutina y después golpeás. Si se te termina el tiempo perdés un corazón y elegís cómo seguir: reintentar igual, bajar la carga (menos repeticiones, pero tus golpes pegan más flojo) o cambiar de patrón. Cada cinco terrenos aparece un jefe, que encadena dos patrones sin descanso.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Travesías",
      text: "Una sesión larga de cardio, distinta cada día. Tocás Empezar, tenés diez segundos para ubicarte y la app corre el tiempo con vos, con la pantalla despierta. En las que van por intervalos (boxeo, HIIT, sprints, burpees, planchas) te marca FUERTE y SUAVE con un pitido; en las continuas te avisa cada cinco minutos. Recién cuando se cumple el tiempo podés completarla. Si saliste sin el teléfono, hay un enlace abajo para registrarla igual.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Instinto Primal",
      text: "Movimientos de control y coordinación en el suelo, en tres rondas cronometradas. El reloj arranca cuando tocás Empezar, con diez segundos para ubicarte. Hasta cinco sesiones por día. Si practicás dos veces el movimiento más nuevo que tengas, se te abre el siguiente.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Explorar",
      text: "Cuenta los kilómetros que caminás o corrés. Podés salir con la app: te cuenta el tiempo y estima la distancia según el ritmo que elijas, y al volver la corregís si hace falta. También podés anotar tramos a mano, en kilómetros o en pasos. Cuando juntás los kilómetros que pide una expedición se te revelan lugares del mapa, y cada uno deja una reliquia que queda guardada en el Códice y te suma un 3% de XP de exploración.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Estiramiento",
      text: "Dos rutinas guiadas: una corta de menos de cuatro minutos para después de entrenar y una completa de siete y medio. La app te va diciendo qué hacer, cuánto aguantar y cuándo cambiar de lado. Antes de cada posición tenés unos segundos para acomodarte, con el nombre de la que viene ya en pantalla: un pitido grave para que te prepares y uno agudo para empezar. La primera vez que te toca una posición, el reloj espera a que toques Listo, y podés pausar cuando quieras. La pantalla no se apaga. Estirar dos veces por semana te da +10% de XP la semana siguiente. Y una vez por semana te pregunta hasta dónde llegás sentado con las piernas estiradas y lo compara con cuando empezaste.",
    },
    {
      g: "LOS SISTEMAS",
      title: "Primeras veces",
      text: "La app anota el día que hacés algo que antes no podías: tu primera flexión, tu primera dominada, llegar más lejos estirando. Primero te pregunta una sola vez si alguna vez hiciste cada movimiento. Si respondés que nunca pudiste, el día que lo logres queda anotado, con fecha, y no se borra nunca. También podés escribir a mano cualquier cosa que la app no pueda ver.",
    },
    {
      g: "LOS SISTEMAS",
      title: "El mapa de tu cuerpo",
      text: "Es la figura que está arriba de todo en Entreno. Cada zona se pinta más fuerte cuanto más la entrenaste, así que de un vistazo ves qué estás descuidando. Tocá cualquier zona para ver su nivel, tus repeticiones de por vida en ese patrón y cuántos días lleva sin estímulo.",
    },
    {
      g: "LO DEMÁS",
      title: "Las tres modalidades",
      text: "Son las tres formas de entrenar que entiende la app: peso corporal (solo con tu cuerpo), gimnasio (con pesas y máquinas) y flow (movimiento en el suelo, movilidad y control). Podés tener varias activas y elegir cada día con cuál entrenás. Si una modalidad no cubre alguno de los cuatro patrones, para ese patrón se usa la versión de peso corporal.",
    },
    {
      g: "LO DEMÁS",
      title: "Puntos de Dominio",
      text: "Son la moneda del juego. Ganás 3 el día que completás tu rutina al 100%, o 1 si llegás al menos a la mitad; cuenta solo la primera sesión de cada día. También los dan las misiones, cada reliquia nueva y los 147 logros, que se desbloquean solos apenas cumplís la condición: no hace falta que los vayas a buscar. Se gastan en la tienda, que se abre tocando el número violeta de arriba a la derecha: hay cosas que duran un día y dos mejoras que son para siempre.",
    },
    {
      g: "LO DEMÁS",
      title: "El metrónomo",
      text: "Es el pitido que marca el ritmo de cada repetición: bajás, pausás abajo y subís. Está para que no aceleres, y es el mismo ritmo de la prueba de aptitud. Si el modificador del día pide otro ritmo, el metrónomo se ajusta solo. No cuenta repeticiones ni sabe cuándo terminaste: eso lo marcás vos tocando cada serie. En los ejercicios de sostén, como la plancha, no aplica: ahí lo que importa son los segundos, no el sube y baja.",
    },
    {
      g: "LO DEMÁS",
      title: "Guardá tu progreso",
      text: "Esto es importante. Todo lo tuyo se guarda en este teléfono y en ningún otro lado. No hay cuenta ni servidor: nadie ve tus datos, pero tampoco hay una copia esperándote si perdés el teléfono o borrás los datos del navegador. Andá a Perfil, abrí Respaldo de tu progreso, copiá el texto y guardalo donde quieras (un mail a vos mismo alcanza). Con ese texto recuperás todo, o lo pasás a un teléfono nuevo.",
    },
  ],
  habilidades = [
    {
      id: "handstand",
      name: "Pino (Handstand)",
      family: "Calistenia",
      level: "Intermedio",
      what: "Sostenerte invertido sobre las manos con el cuerpo alineado.",
      why: "Construye fuerza de hombros, control escapular y una conciencia corporal que se transfiere a todo lo demás.",
      steps: [
        {
          name: "Plancha de hombros en pared",
          how: "De espaldas a la pared, manos en el suelo, pies apoyados en la pared a la altura de la cadera. Aguanta manteniendo el core apretado.",
          cue: "Costillas hacia dentro, sin arquear la lumbar.",
        },
        {
          name: "Wall walk",
          how: "Desde plancha, camina los pies por la pared mientras acercas las manos, hasta quedar casi vertical de cara a la pared. Baja con control.",
          cue: "Mira entre las manos, no al suelo.",
        },
        {
          name: "Pino de cara a la pared",
          how: "Sube y aguanta con el pecho hacia la pared, manos a un palmo del rodapié.",
          cue: "Aprieta glúteos y estira las puntas hacia el techo.",
        },
        {
          name: "Pino libre con toques",
          how: "De cara a la pared, despega un pie, luego el otro, aguantando segundos sueltos.",
          cue: "Corrige con los dedos de las manos, no con la espalda.",
        },
        {
          name: "Pino libre",
          how: "Entra con una patada controlada lejos de la pared y sostén.",
          cue: "Si te pasas, sal girando hacia un lado; nunca caigas de espalda.",
        },
      ],
      regression:
        "Si te duelen las muñecas, trabaja primero en puños o paraletas y haz movilidad de muñeca antes.",
      mistake: "Arquear la lumbar en banana. Es la causa número uno de perder el equilibrio.",
    },
    {
      id: "pistol",
      name: "Pistol Squat",
      family: "Calistenia",
      level: "Intermedio",
      what: "Sentadilla completa a una sola pierna con la otra extendida al frente.",
      why: "Fuerza unilateral real, movilidad de tobillo y control de rodilla. Delata cualquier desequilibrio entre piernas.",
      steps: [
        {
          name: "Sentadilla a caja alta",
          how: "A una pierna, siéntate en una superficie alta y levántate sin impulso.",
          cue: "Talón clavado en el suelo todo el recorrido.",
        },
        {
          name: "Bajar la caja",
          how: "Repite bajando la altura progresivamente cada semana.",
          cue: "Controla la bajada 3 segundos.",
        },
        {
          name: "Pistol asistida",
          how: "Sujétate de un marco o anilla y baja completo, usando las manos lo mínimo.",
          cue: "La pierna libre estirada, sin tocar el suelo.",
        },
        {
          name: "Negativa completa",
          how: "Baja sola y controlada hasta abajo, levántate con ayuda.",
          cue: "Si te desplomas, aún no es tu altura.",
        },
        {
          name: "Pistol completa",
          how: "Baja y sube sin apoyo ni impulso.",
          cue: "Brazos al frente como contrapeso.",
        },
      ],
      regression: "Sin movilidad de tobillo, eleva el talón sobre un disco fino mientras la ganas.",
      mistake: "Dejar caer la rodilla hacia dentro. Mantenla alineada con el pie.",
    },
    {
      id: "lsit",
      name: "L-Sit",
      family: "Calistenia",
      level: "Intermedio",
      what: "Sostenerte con las manos y las piernas extendidas al frente formando una L.",
      why: "Core comprimido, triceps y flexores de cadera. Base para V-sit y manna.",
      steps: [
        {
          name: "Soporte con piernas flexionadas",
          how: "Sobre paraletas o libros, sostén el cuerpo con rodillas al pecho.",
          cue: "Hombros hacia abajo, lejos de las orejas.",
        },
        {
          name: "Una pierna extendida",
          how: "Extiende una pierna manteniendo la otra flexionada. Alterna.",
          cue: "No dejes que la cadera se hunda.",
        },
        {
          name: "L-sit en paralelas bajas",
          how: "Ambas piernas extendidas, con la altura suficiente para que no rocen.",
          cue: "Empuja el suelo hacia abajo con las manos.",
        },
        {
          name: "L-sit en el suelo",
          how: "Mismo gesto con las manos planas en el suelo.",
          cue: "Requiere más compresión: aguanta menos tiempo pero limpio.",
        },
        {
          name: "L-sit sostenido 20 s",
          how: "Acumula tiempo hasta sostener 20 segundos seguidos.",
          cue: "Respira. No aguantes el aire.",
        },
      ],
      regression:
        "Trabaja compresión sentado: piernas estiradas en el suelo, intenta despegar los talones.",
      mistake: "Encoger los hombros. Deprime las escápulas antes de despegar.",
    },
    {
      id: "muscleup",
      name: "Muscle-Up",
      family: "Calistenia",
      level: "Avanzado",
      what: "Pasar de colgado a apoyo sobre la barra en un solo movimiento.",
      why: "Une tracción explosiva y empuje. Es el puente entre dominadas y fondos.",
      steps: [
        {
          name: "Dominadas al pecho",
          how: "Domina llevando el esternón a la barra, no solo la barbilla.",
          cue: "Codos hacia atrás y abajo.",
        },
        {
          name: "Fondos en barra",
          how: "Sobre la barra en apoyo, baja y sube con control.",
          cue: "Muñecas por encima de la barra desde el inicio.",
        },
        {
          name: "Transición con banda",
          how: "Con una banda asistiendo, practica el paso de tracción a apoyo.",
          cue: "Cuando llegues arriba, mete las muñecas rápido.",
        },
        {
          name: "Muscle-up con impulso",
          how: "Permite un balanceo controlado para pasar la transición.",
          cue: "Tira hacia ti, no hacia arriba.",
        },
        {
          name: "Muscle-up estricto",
          how: "Sin balanceo, desde colgado muerto.",
          cue: "Agarre falso ayuda mucho en la transición.",
        },
      ],
      regression:
        "Si no llegas al pecho en dominadas, acumula primero 10 dominadas estrictas limpias.",
      mistake: "Intentarlo sin base de dominadas. Te llevarás un golpe y ningún progreso.",
    },
    {
      id: "frontlever",
      name: "Front Lever",
      family: "Calistenia",
      level: "Avanzado",
      what: "Colgado de la barra, cuerpo horizontal y rígido mirando arriba.",
      why: "Máxima tensión de dorsal y core en cadena posterior. Un estático de referencia.",
      steps: [
        {
          name: "Dominada con escápulas",
          how: "Colgado, baja los hombros sin doblar los codos. Sostén 5 segundos.",
          cue: "Ese es el punto de partida de toda la progresión.",
        },
        {
          name: "Tuck lever",
          how: "Sube las rodillas al pecho y deja el torso horizontal.",
          cue: "Espalda redonda, cadera a la altura de los hombros.",
        },
        {
          name: "Advanced tuck",
          how: "Abre el ángulo de cadera manteniendo rodillas flexionadas.",
          cue: "Lumbar plana, no arqueada.",
        },
        {
          name: "Una pierna extendida",
          how: "Extiende una pierna y mantén la otra recogida. Alterna lados.",
          cue: "Aprieta el glúteo de la pierna extendida.",
        },
        {
          name: "Front lever completo",
          how: "Ambas piernas extendidas, cuerpo en línea.",
          cue: "Tira de la barra hacia tus pies, no hacia abajo.",
        },
      ],
      regression: "Trabaja remos invertidos horizontales pesados si el tuck ya te cuesta.",
      mistake: "Saltar de tuck a completo. Cada etapa necesita semanas, no días.",
    },
    {
      id: "dragonflag",
      name: "Dragon Flag",
      family: "Calistenia",
      level: "Avanzado",
      what: "Tumbado, elevar todo el cuerpo rígido apoyando solo los hombros.",
      why: "El ejercicio de core anti-extensión más brutal sin equipo.",
      steps: [
        {
          name: "Hollow hold",
          how: "Tumbado, lumbar pegada al suelo, brazos y piernas despegados. Sostén.",
          cue: "Si la lumbar se despega, acerca rodillas.",
        },
        {
          name: "Negativa con rodillas",
          how: "Sube el cuerpo, baja lento con rodillas flexionadas.",
          cue: "Agárrate fuerte detrás de la cabeza.",
        },
        {
          name: "Negativa con una pierna",
          how: "Baja con una pierna extendida y la otra flexionada.",
          cue: "Baja en 5 segundos.",
        },
        {
          name: "Negativa completa",
          how: "Ambas piernas extendidas, bajada lenta y controlada.",
          cue: "Cuerpo en una sola línea rígida.",
        },
        {
          name: "Dragon flag completo",
          how: "Sube y baja sin perder la línea.",
          cue: "El movimiento sale de la cadera, no del impulso.",
        },
      ],
      regression: "Si la lumbar se arquea, vuelve al hollow hold hasta sostener 45 segundos.",
      mistake: "Usar impulso para subir. Anula todo el trabajo.",
    },
    {
      id: "bridge",
      name: "Puente Completo",
      family: "Movilidad",
      level: "Intermedio",
      what: "Arco completo apoyando manos y pies, pecho abierto.",
      why: "Extensión de columna, apertura de hombros y cadera. Antídoto para estar sentado todo el día.",
      steps: [
        {
          name: "Puente de glúteos",
          how: "Tumbado, pies apoyados, eleva la cadera y aprieta arriba.",
          cue: "Costillas abajo, no arquees la lumbar.",
        },
        {
          name: "Puente de hombros elevado",
          how: "Mismo gesto con los pies en una superficie elevada.",
          cue: "Sostén 20 segundos.",
        },
        {
          name: "Puente sobre la cabeza",
          how: "Manos junto a las orejas, empuja hasta apoyar la coronilla.",
          cue: "Para aquí si los hombros protestan.",
        },
        {
          name: "Puente con codos estirados",
          how: "Empuja hasta estirar los brazos completamente.",
          cue: "Reparte el arco: hombros y cadera, no solo lumbar.",
        },
        {
          name: "Puente caminando",
          how: "En el puente, camina manos y pies acercándolos.",
          cue: "Respira profundo dentro de la postura.",
        },
      ],
      regression: "Trabaja movilidad de hombros con un palo antes de intentar el puente alto.",
      mistake: "Forzar solo desde la lumbar. Si te pellizca, falta apertura de hombro.",
    },
    {
      id: "crow",
      name: "Postura del Cuervo",
      family: "Animal Flow",
      level: "Principiante",
      what: "Equilibrio sobre las manos apoyando las rodillas en los triceps.",
      why: "Primera toma de contacto con el equilibrio sobre manos. Menos intimidante que el pino.",
      steps: [
        {
          name: "Cuclillas profundas",
          how: "Ponte en cuclillas con los pies juntos y las manos en el suelo delante.",
          cue: "Talones pueden despegarse al principio.",
        },
        {
          name: "Cargar peso",
          how: "Inclínate adelante pasando peso a las manos, sin despegar los pies.",
          cue: "Codos ligeramente flexionados, dedos agarrando el suelo.",
        },
        {
          name: "Un pie arriba",
          how: "Despega un pie apoyando la rodilla en el triceps.",
          cue: "Mira un punto medio metro delante de las manos.",
        },
        {
          name: "Dos pies arriba",
          how: "Despega ambos pies y sostén unos segundos.",
          cue: "Redondea la espalda, no la mantengas plana.",
        },
        {
          name: "Cuervo 30 segundos",
          how: "Acumula hasta sostener medio minuto estable.",
          cue: "Pon un cojín delante mientras aprendes.",
        },
      ],
      regression: "Si te caes de cara, baja más la cadera y mira más adelante.",
      mistake: "Mirar a los pies. La cabeza dirige el equilibrio.",
    },
    {
      id: "shrimp",
      name: "Shrimp Squat",
      family: "Calistenia",
      level: "Intermedio",
      what: "Sentadilla a una pierna con la otra flexionada atrás, sujeta con la mano.",
      why: "Alternativa a la pistol con menos exigencia de tobillo y más de cuádriceps.",
      steps: [
        {
          name: "Zancada inversa profunda",
          how: "Paso atrás bajando la rodilla hasta rozar el suelo.",
          cue: "Torso erguido.",
        },
        {
          name: "Shrimp asistida a caja",
          how: "Sujeta el pie trasero y baja hasta sentarte en una caja.",
          cue: "La rodilla trasera busca el suelo, no el lateral.",
        },
        {
          name: "Shrimp con apoyo de mano",
          how: "Baja tocando el suelo con la mano libre para estabilizar.",
          cue: "Usa la mano lo mínimo.",
        },
        {
          name: "Shrimp tocando rodilla",
          how: "Baja hasta que la rodilla trasera roce el suelo, sin apoyo.",
          cue: "Sube empujando con el talón.",
        },
        {
          name: "Shrimp completa",
          how: "Serie de 5 por pierna con control total.",
          cue: "Sin rebote abajo.",
        },
      ],
      regression: "Si pierdes el equilibrio, hazla junto a una pared y toca con los dedos.",
      mistake: "Inclinar el torso hacia delante para compensar falta de fuerza.",
    },
    {
      id: "beastflow",
      name: "Transición Beast-Crab",
      family: "Animal Flow",
      level: "Principiante",
      what: "Pasar fluido de la posición de bestia a la de cangrejo y volver, sin pausas.",
      why: "Coordinación, rotación de columna y control en el suelo. La base de todo el flow.",
      steps: [
        {
          name: "Beast hold",
          how: "Cuadrupedia con rodillas a un centímetro del suelo. Sostén 20 segundos.",
          cue: "Espalda plana como una mesa.",
        },
        {
          name: "Crab hold",
          how: "Sentado, manos detrás, eleva la cadera. Sostén 20 segundos.",
          cue: "Dedos de las manos hacia los pies o hacia fuera, lo que respete tu hombro.",
        },
        {
          name: "Underswitch lento",
          how: "Desde beast, pasa una pierna por debajo y gira hasta crab. Para y vuelve.",
          cue: "La cadera no toca el suelo en ningún momento.",
        },
        {
          name: "Transición completa",
          how: "Encadena beast → crab → beast sin detenerte.",
          cue: "Respira en el punto medio.",
        },
        {
          name: "Flow continuo",
          how: "Encadena 10 transiciones alternando lados sin parar.",
          cue: "Busca silencio: si suenas, falta control.",
        },
      ],
      regression: "Si la cadera cae, haz la transición apoyando la rodilla y ve subiéndola.",
      mistake: "Ir rápido. En flow, lento es difícil; rápido es trampa.",
    },
  ],
  B2 = 15,
  w2 = 80,
  dy = 3;
function Td(e, a) {
  return ((e.skills && e.skills[a]) || { steps: [] }).steps || [];
}
function U2(e, a) {
  let l = habilidades.find((o) => o.id === a),
    n = Td(e, a);
  return l && n.filter(Boolean).length >= l.steps.length;
}
function marcarPasoHabilidad(e, a, l) {
  let n = clonar(e),
    o = [],
    s = habilidades.find((v) => v.id === a);
  if (!s) return { state: n, notices: o };
  (n.skills || (n.skills = {}),
    n.care || (n.care = { today: { date: fechaHoy(), done: [] }, lifetime: 0 }),
    n.neuro || (n.neuro = Al()),
    n.unlockAll === void 0 && (n.unlockAll = !1),
    n.disabled || (n.disabled = []),
    n.seenUnlocks ||
      (n.seenUnlocks = sistemas.filter((v) => sistemaAbierto(n, v.id)).map((v) => v.id)),
    n.skills[a] || (n.skills[a] = { steps: new Array(s.steps.length).fill(!1) }));
  let u = n.skills[a].steps;
  for (; u.length < s.steps.length;) u.push(!1);
  let c = u.filter(Boolean).length >= s.steps.length;
  if (((u[l] = !u[l]), u[l])) {
    let v = Math.round(B2 * multImpulso(n));
    ((n.progress.currentXP += v),
      (n.today.xpEarned = (n.today.xpEarned || 0) + v),
      o.push(`Paso dominado: ${s.steps[l].name}. +${v} XP.`),
      (n = subirNiveles(n, o)));
  }
  if (u.filter(Boolean).length >= s.steps.length && !c) {
    let v = Math.round(w2 * multImpulso(n));
    ((n.progress.currentXP += v),
      (n.today.xpEarned = (n.today.xpEarned || 0) + v),
      (n.dominion.points += dy),
      o.push(`¡Skill aprendida: ${s.name}! +${v} XP y +${dy} Puntos de Dominio.`),
      (n = subirNiveles(n, o)));
  }
  let p = revisarLogros(n);
  return { state: p.state, notices: [...o, ...p.notices] };
}
function Wo(e) {
  return habilidades.filter((a) => U2(e, a.id)).length;
}

export { guia, habilidades, B2, w2, dy, Td, U2, marcarPasoHabilidad, Wo };
