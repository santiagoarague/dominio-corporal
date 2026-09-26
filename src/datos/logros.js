// Logros y su revision (da).
import { rangos } from "./rangos.js";
import { nodosExplorar } from "../logica/explorar.js";
import { movimientosPrimal } from "../logica/primal.js";
import { dominioInicial } from "../logica/tienda.js";
import { listaAtributos, nivelAtributo, valorAtributo } from "../logica/atributos.js";
import { habilidades, pasosHabilidad, habilidadesCompletas } from "./guia.js";
import { fechaLocal, fechaHoy } from "../logica/rutina.js";
import { clonar } from "../logica/partida.js";

var categoriasLogros = [
    "Rutina del Día",
    "Repeticiones",
    "Marcas personales",
    "Gimnasio",
    "Modalidades",
    "Combate",
    "Exploración",
    "Modo Primal",
    "Skills",
    "Neuromotor",
    "Persistencia",
    "Días que no querías",
  ],
  ordenDificultad = ["E", "D", "C", "B", "A", "S", "Z"],
  sdcDific = {
    E: "FÁCIL",
    D: "ACCESIBLE",
    C: "EXIGENTE",
    B: "DIFÍCIL",
    A: "MUY DIFÍCIL",
    S: "PARA POCOS",
    Z: "EXCEPCIONAL",
  },
  logros = [
    {
      id: "e_first",
      tier: "E",
      category: "Rutina del Día",
      name: "Primer Día",
      desc: "Completá tu primera rutina",
      check: (partida) =>
        partida.lifetimeReps.squat +
          partida.lifetimeReps.pushup +
          partida.lifetimeReps.back +
          partida.lifetimeReps.abs >
        0,
    },
    {
      id: "e_full",
      tier: "E",
      category: "Rutina del Día",
      name: "Cuatro Patrones",
      desc: "Completá los 4 patrones en un mismo día",
      check: (partida) => (partida.week.fullDays || 0) >= 1 || partida.lastFullDate != null,
    },
    {
      id: "e_stretch",
      tier: "E",
      category: "Persistencia",
      name: "Primer Respiro",
      desc: "Completá tu primera rutina de estiramiento",
      check: (partida) => (partida.lifetimeStretch || 0) >= 1,
    },
    {
      id: "e_primal",
      tier: "E",
      category: "Modo Primal",
      name: "Instinto Despierto",
      desc: "Completá tu primera sesión Primal",
      check: (partida) => (partida.lifetimePrimal || 0) >= 1,
    },
    {
      id: "e_step",
      tier: "E",
      category: "Exploración",
      name: "Primera Expedición",
      desc: "Concluí tu primera expedición",
      check: (partida) => (partida.exploration.lifetimeKm || 0) > 0,
    },
    {
      id: "e_combat",
      tier: "E",
      category: "Combate",
      name: "Primer Contacto",
      desc: "Recuperá tu primer terreno",
      check: (partida) => (partida.combat.villainsDefeated || 0) >= 1,
    },
    {
      id: "d_streak3",
      tier: "D",
      category: "Persistencia",
      name: "Tres Días",
      desc: "Alcanzá una racha de 3 días",
      check: (partida) => partida.streak.current >= 3,
    },
    {
      id: "d_km5",
      tier: "D",
      category: "Exploración",
      name: "Cinco Kilómetros",
      desc: "Acumulá 5 km recorridos",
      check: (partida) => (partida.exploration.lifetimeKm || 0) >= 5,
    },
    {
      id: "d_place1",
      tier: "D",
      category: "Exploración",
      name: "Primer Sector",
      desc: "Descubrí tu primer lugar",
      check: (partida) => partida.exploration.unlockedIndex >= 0,
    },
    {
      id: "d_vol100",
      tier: "D",
      category: "Rutina del Día",
      name: "Cien Repeticiones",
      desc: "100 reps totales de por vida",
      check: (partida) =>
        partida.lifetimeReps.squat +
          partida.lifetimeReps.pushup +
          partida.lifetimeReps.back +
          partida.lifetimeReps.abs >=
        100,
    },
    {
      id: "d_dungeon1",
      tier: "D",
      category: "Combate",
      name: "Primera Travesía",
      desc: "Completá tu primera travesía",
      check: (partida) => (partida.dungeonsCleared || 0) >= 1,
    },
    {
      id: "d_primal3",
      tier: "D",
      category: "Modo Primal",
      name: "Tres Patrones",
      desc: "Descubrí 3 movimientos Primal",
      check: (partida) => partida.primal.unlockedCount >= 3,
    },
    {
      id: "d_rank",
      tier: "C",
      category: "Rutina del Día",
      name: "Primer Umbral",
      desc: "Cruzá tu primer umbral",
      check: (partida) => rangos.indexOf(partida.progress.rank) >= rangos.indexOf("D"),
    },
    {
      id: "c_streak7",
      tier: "C",
      category: "Persistencia",
      name: "Semana de Hierro",
      desc: "Alcanzá una racha de 7 días",
      check: (partida) => partida.streak.current >= 7,
    },
    {
      id: "c_vol500",
      tier: "C",
      category: "Rutina del Día",
      name: "Quinientas",
      desc: "500 reps totales de por vida",
      check: (partida) =>
        partida.lifetimeReps.squat +
          partida.lifetimeReps.pushup +
          partida.lifetimeReps.back +
          partida.lifetimeReps.abs >=
        500,
    },
    {
      id: "c_squat250",
      tier: "C",
      category: "Rutina del Día",
      name: "Base de Piernas",
      desc: "250 reps de piernas",
      check: (partida) => partida.lifetimeReps.squat >= 250,
    },
    {
      id: "c_push150",
      tier: "C",
      category: "Rutina del Día",
      name: "Base de Empuje",
      desc: "150 reps de empuje",
      check: (partida) => partida.lifetimeReps.pushup >= 150,
    },
    {
      id: "c_combat5",
      tier: "C",
      category: "Combate",
      name: "Terreno Ganado",
      desc: "Recuperá 3 terrenos",
      check: (partida) => (partida.combat.villainsDefeated || 0) >= 3,
    },
    {
      id: "c_boss1",
      tier: "C",
      category: "Combate",
      name: "Primer Bloqueo Roto",
      desc: "Superá tu primer Jefe",
      check: (partida) => (partida.combat.villainsDefeated || 0) >= 5,
    },
    {
      id: "c_km20",
      tier: "C",
      category: "Exploración",
      name: "Piernas Hechas",
      desc: "Acumulá 20 km recorridos",
      check: (partida) => (partida.exploration.lifetimeKm || 0) >= 20,
    },
    {
      id: "c_primal6",
      tier: "C",
      category: "Modo Primal",
      name: "Repertorio Motriz",
      desc: "Descubrí 6 movimientos Primal",
      check: (partida) => partida.primal.unlockedCount >= 6,
    },
    {
      id: "c_stretch10",
      tier: "C",
      category: "Persistencia",
      name: "Tejido Flexible",
      desc: "10 rutinas de estiramiento",
      check: (partida) => (partida.lifetimeStretch || 0) >= 10,
    },
    {
      id: "c_rank",
      tier: "B",
      category: "Rutina del Día",
      name: "Segundo Umbral",
      desc: "Cruzá tu segundo umbral",
      check: (partida) => rangos.indexOf(partida.progress.rank) >= rangos.indexOf("C"),
    },
    {
      id: "b_streak14",
      tier: "B",
      category: "Persistencia",
      name: "Catorce Sin Fallar",
      desc: "Alcanzá una racha de 14 días",
      check: (partida) => partida.streak.current >= 14,
    },
    {
      id: "b_vol1500",
      tier: "B",
      category: "Rutina del Día",
      name: "Mil Quinientas",
      desc: "1500 reps totales de por vida",
      check: (partida) =>
        partida.lifetimeReps.squat +
          partida.lifetimeReps.pushup +
          partida.lifetimeReps.back +
          partida.lifetimeReps.abs >=
        1500,
    },
    {
      id: "b_back500",
      tier: "B",
      category: "Rutina del Día",
      name: "Espalda de Roble",
      desc: "500 reps de tracción",
      check: (partida) => partida.lifetimeReps.back >= 500,
    },
    {
      id: "b_abs750",
      tier: "B",
      category: "Rutina del Día",
      name: "Núcleo Firme",
      desc: "750 reps de core",
      check: (partida) => partida.lifetimeReps.abs >= 750,
    },
    {
      id: "b_combat15",
      tier: "B",
      category: "Combate",
      name: "Terreno Firme",
      desc: "Recuperá 15 terrenos",
      check: (partida) => (partida.combat.villainsDefeated || 0) >= 15,
    },
    {
      id: "b_dungeon10",
      tier: "B",
      category: "Combate",
      name: "Fondo",
      desc: "Completá 10 travesías",
      check: (partida) => (partida.dungeonsCleared || 0) >= 10,
    },
    {
      id: "b_km50",
      tier: "B",
      category: "Exploración",
      name: "Kilometrero",
      desc: "Acumulá 50 km recorridos",
      check: (partida) => (partida.exploration.lifetimeKm || 0) >= 50,
    },
    {
      id: "b_place6",
      tier: "B",
      category: "Exploración",
      name: "Medio Mapa",
      desc: "Descubrí 6 sectores",
      check: (partida) => partida.exploration.unlockedIndex >= 5,
    },
    {
      id: "b_primal12",
      tier: "B",
      category: "Modo Primal",
      name: "Flujo Intermedio",
      desc: "Descubrí 12 movimientos Primal",
      check: (partida) => partida.primal.unlockedCount >= 12,
    },
    {
      id: "b_primal50",
      tier: "B",
      category: "Modo Primal",
      name: "Cincuenta Sesiones",
      desc: "50 sesiones Primal completadas",
      check: (partida) => (partida.lifetimePrimal || 0) >= 50,
    },
    {
      id: "b_rank",
      tier: "A",
      category: "Rutina del Día",
      name: "Tercer Umbral",
      desc: "Cruzá tu tercer umbral",
      check: (partida) => rangos.indexOf(partida.progress.rank) >= rangos.indexOf("B"),
    },
    {
      id: "a_wstreak4",
      tier: "B",
      category: "Persistencia",
      name: "Mes Cumplido",
      desc: "4 semanas seguidas alcanzando tu meta",
      check: (partida) => (partida.weeklyStreak || 0) >= 4,
    },
    {
      id: "a_vol5000",
      tier: "A",
      category: "Rutina del Día",
      name: "Cinco Mil",
      desc: "5000 reps totales de por vida",
      check: (partida) =>
        partida.lifetimeReps.squat +
          partida.lifetimeReps.pushup +
          partida.lifetimeReps.back +
          partida.lifetimeReps.abs >=
        5e3,
    },
    {
      id: "a_squat2000",
      tier: "A",
      category: "Rutina del Día",
      name: "Piernas de Acero",
      desc: "2000 reps de piernas",
      check: (partida) => partida.lifetimeReps.squat >= 2e3,
    },
    {
      id: "a_push1500",
      tier: "A",
      category: "Rutina del Día",
      name: "Empuje de Titán",
      desc: "1500 reps de empuje",
      check: (partida) => partida.lifetimeReps.pushup >= 1500,
    },
    {
      id: "a_unilateral",
      tier: "S",
      category: "Rutina del Día",
      name: "Dominio Unilateral",
      desc: "Llegá al quinto rango",
      check: (partida) => rangos.indexOf(partida.progress.rank) >= rangos.indexOf("A"),
    },
    {
      id: "a_combat40",
      tier: "A",
      category: "Combate",
      name: "Territorio Propio",
      desc: "Recuperá 40 terrenos",
      check: (partida) => (partida.combat.villainsDefeated || 0) >= 40,
    },
    {
      id: "a_dungeon30",
      tier: "A",
      category: "Combate",
      name: "Aguante",
      desc: "Completá 30 travesías",
      check: (partida) => (partida.dungeonsCleared || 0) >= 30,
    },
    {
      id: "a_km100",
      tier: "A",
      category: "Exploración",
      name: "Fondista",
      desc: "Acumulá 100 km recorridos",
      check: (partida) => (partida.exploration.lifetimeKm || 0) >= 100,
    },
    {
      id: "a_primal18",
      tier: "A",
      category: "Modo Primal",
      name: "Flujo Avanzado",
      desc: "Descubrí 18 movimientos Primal",
      check: (partida) => partida.primal.unlockedCount >= 18,
    },
    {
      id: "a_attr10",
      tier: "A",
      category: "Persistencia",
      name: "Atributo Consolidado",
      desc: "Llevá un atributo a Nivel 10",
      check: (partida) =>
        listaAtributos.some((atr) => nivelAtributo(valorAtributo(partida, atr)) >= 10),
    },
    {
      id: "s_wstreak12",
      tier: "A",
      category: "Persistencia",
      name: "Trimestre de Hierro",
      desc: "12 semanas seguidas alcanzando tu meta",
      check: (partida) => (partida.weeklyStreak || 0) >= 12,
    },
    {
      id: "s_vol15000",
      tier: "S",
      category: "Rutina del Día",
      name: "Quince Mil",
      desc: "15000 reps totales de por vida",
      check: (partida) =>
        partida.lifetimeReps.squat +
          partida.lifetimeReps.pushup +
          partida.lifetimeReps.back +
          partida.lifetimeReps.abs >=
        15e3,
    },
    {
      id: "s_rank",
      tier: "S",
      category: "Rutina del Día",
      name: "Élite Confirmada",
      desc: "Llegá al sexto rango",
      check: (partida) => rangos.indexOf(partida.progress.rank) >= rangos.indexOf("S"),
    },
    {
      id: "s_combat100",
      tier: "S",
      category: "Combate",
      name: "Centenar Recuperado",
      desc: "Recuperá 100 terrenos",
      check: (partida) => (partida.combat.villainsDefeated || 0) >= 100,
    },
    {
      id: "s_dungeon75",
      tier: "S",
      category: "Combate",
      name: "Segundo Viento",
      desc: "Completá 75 travesías",
      check: (partida) => (partida.dungeonsCleared || 0) >= 75,
    },
    {
      id: "s_place_all",
      tier: "S",
      category: "Exploración",
      name: "Fin del Mapa",
      desc: "Descubrí todos los sectores conocidos",
      check: (partida) => partida.exploration.unlockedIndex >= nodosExplorar.length - 1,
    },
    {
      id: "s_km200",
      tier: "S",
      category: "Exploración",
      name: "Paso Largo",
      desc: "Acumulá 200 km recorridos",
      check: (partida) => (partida.exploration.lifetimeKm || 0) >= 200,
    },
    {
      id: "s_primal_all",
      tier: "S",
      category: "Modo Primal",
      name: "Maestro Ancestral",
      desc: "Descubrí todos los movimientos Primal",
      check: (partida) => partida.primal.unlockedCount >= movimientosPrimal.length,
    },
    {
      id: "s_primal200",
      tier: "S",
      category: "Modo Primal",
      name: "Doscientas Sesiones",
      desc: "200 sesiones Primal completadas",
      check: (partida) => (partida.lifetimePrimal || 0) >= 200,
    },
    {
      id: "s_attr20",
      tier: "S",
      category: "Persistencia",
      name: "Atributo Élite",
      desc: "Llevá un atributo a Nivel 20",
      check: (partida) =>
        listaAtributos.some((atr) => nivelAtributo(valorAtributo(partida, atr)) >= 20),
    },
    {
      id: "z_rank",
      tier: "Z",
      category: "Rutina del Día",
      name: "Trascendencia",
      desc: "Llegá al último rango",
      check: (partida) => rangos.indexOf(partida.progress.rank) >= rangos.indexOf("Z"),
    },
    {
      id: "z_pr_squat",
      tier: "C",
      category: "Rutina del Día",
      name: "PR de Piernas",
      desc: "Récord personal de 60+ reps de piernas en una sesión",
      check: (partida) => partida.records && partida.records.squat >= 60,
    },
    {
      id: "z_pr_push",
      tier: "C",
      category: "Rutina del Día",
      name: "PR de Empuje",
      desc: "Récord personal de 40+ reps de empuje en una sesión",
      check: (partida) => partida.records && partida.records.pushup >= 40,
    },
    {
      id: "z_pr_back",
      tier: "B",
      category: "Rutina del Día",
      name: "PR de Tracción",
      desc: "Récord personal de 30+ reps de tracción en una sesión",
      check: (partida) => partida.records && partida.records.back >= 30,
    },
    {
      id: "z_pr_abs",
      tier: "C",
      category: "Rutina del Día",
      name: "PR de Core",
      desc: "Récord personal de 60+ reps de core en una sesión",
      check: (partida) => partida.records && partida.records.abs >= 60,
    },
    {
      id: "z_wstreak26",
      tier: "S",
      category: "Persistencia",
      name: "Medio Año Intacto",
      desc: "26 semanas seguidas alcanzando tu meta",
      check: (partida) => (partida.weeklyStreak || 0) >= 26,
    },
    {
      id: "z_wstreak52",
      tier: "Z",
      category: "Persistencia",
      name: "Constancia Absoluta",
      desc: "Un año entero alcanzando tu meta semanal",
      check: (partida) => (partida.weeklyStreak || 0) >= 52,
    },
    {
      id: "z_combat250",
      tier: "Z",
      category: "Combate",
      name: "Nada Sin Relevar",
      desc: "Recuperá 250 terrenos",
      check: (partida) => (partida.combat.villainsDefeated || 0) >= 250,
    },
    {
      id: "z_attr30",
      tier: "Z",
      category: "Persistencia",
      name: "Atributo Trascendente",
      desc: "Llevá un atributo a Nivel 30",
      check: (partida) =>
        listaAtributos.some((atr) => nivelAtributo(valorAtributo(partida, atr)) >= 30),
    },
    {
      id: "z_hybrid",
      tier: "B",
      category: "Rutina del Día",
      name: "Atleta Híbrido",
      desc: "Entrená con los tres métodos el mismo día",
      check: (partida) => ((partida.today && partida.today.doneModalities) || []).length >= 3,
    },
    {
      id: "neuro_1",
      tier: "E",
      category: "Neuromotor",
      name: "Primer Reflejo",
      desc: "Completá tu primera sesión neuromotora",
      check: (partida) => ((partida.neuro && partida.neuro.sessions) || 0) >= 1,
    },
    {
      id: "neuro_react",
      tier: "C",
      category: "Neuromotor",
      name: "Reacción Afilada",
      desc: "Completá un drill de reacción a ritmo Rápido",
      check: (partida) => ((partida.neuro && partida.neuro.bestSpeedLevel) || 0) >= 3,
    },
    {
      id: "neuro_seq6",
      tier: "B",
      category: "Neuromotor",
      name: "Memoria Motriz",
      desc: "Recordá una secuencia de 6 movimientos",
      check: (partida) => ((partida.neuro && partida.neuro.bestSequence) || 0) >= 6,
    },
    {
      id: "neuro_dual120",
      tier: "B",
      category: "Neuromotor",
      name: "Mente y Cuerpo",
      desc: "2 minutos de doble tarea sin romper",
      check: (partida) => ((partida.neuro && partida.neuro.bestDualSec) || 0) >= 120,
    },
    {
      id: "neuro_seq9",
      tier: "A",
      category: "Neuromotor",
      name: "Cadena Larga",
      desc: "Recordá una secuencia de 9 movimientos",
      check: (partida) => ((partida.neuro && partida.neuro.bestSequence) || 0) >= 9,
    },
    {
      id: "neuro_bpm",
      tier: "S",
      category: "Neuromotor",
      name: "Ritmo Cruzado",
      desc: "Coordinación contralateral a 120 bpm",
      check: (partida) => ((partida.neuro && partida.neuro.bestBpm) || 0) >= 120,
    },
    {
      id: "neuro_50",
      tier: "A",
      category: "Neuromotor",
      name: "Sistema Nervioso Entrenado",
      desc: "50 sesiones neuromotoras",
      check: (partida) => ((partida.neuro && partida.neuro.sessions) || 0) >= 50,
    },
    {
      id: "care_1",
      tier: "E",
      category: "Persistencia",
      name: "Mantenimiento",
      desc: "Completá tu primer protocolo articular",
      check: (partida) => ((partida.care && partida.care.lifetime) || 0) >= 1,
    },
    {
      id: "care_20",
      tier: "C",
      category: "Persistencia",
      name: "Articulaciones Sanas",
      desc: "20 protocolos articulares completados",
      check: (partida) => ((partida.care && partida.care.lifetime) || 0) >= 20,
    },
    {
      id: "care_100",
      tier: "A",
      category: "Persistencia",
      name: "Cuerpo a Prueba",
      desc: "100 protocolos articulares completados",
      check: (partida) => ((partida.care && partida.care.lifetime) || 0) >= 100,
    },
    {
      id: "skill_step1",
      tier: "E",
      category: "Skills",
      name: "Primer Paso Técnico",
      desc: "Dominá el primer paso de cualquier skill",
      check: (partida) => habilidades.some((hab) => pasosHabilidad(partida, hab.id).some(Boolean)),
    },
    {
      id: "skill_1",
      tier: "C",
      category: "Skills",
      name: "Movimiento Raro",
      desc: "Aprendé tu primera skill completa",
      check: (partida) => habilidadesCompletas(partida) >= 1,
    },
    {
      id: "skill_3",
      tier: "B",
      category: "Skills",
      name: "Repertorio Extraño",
      desc: "Aprendé 3 skills completas",
      check: (partida) => habilidadesCompletas(partida) >= 3,
    },
    {
      id: "skill_6",
      tier: "A",
      category: "Skills",
      name: "Coleccionista de Movimiento",
      desc: "Aprendé 6 skills completas",
      check: (partida) => habilidadesCompletas(partida) >= 6,
    },
    {
      id: "skill_all",
      tier: "Z",
      category: "Skills",
      name: "Maestro del Movimiento",
      desc: "Aprendé todas las skills",
      check: (partida) => habilidadesCompletas(partida) >= habilidades.length,
    },
    {
      id: "gym_10k",
      tier: "C",
      category: "Gimnasio",
      name: "Diez Toneladas",
      desc: "10.000 kg sumando todas tus series",
      check: (partida) => (partida.lifetimeVolumeKg || 0) >= 1e4,
    },
    {
      id: "gym_100k",
      tier: "B",
      category: "Gimnasio",
      name: "Cincuenta Toneladas",
      desc: "50.000 kg sumando todas tus series",
      check: (partida) => (partida.lifetimeVolumeKg || 0) >= 5e4,
    },
    {
      id: "gym_bw1",
      tier: "B",
      category: "Gimnasio",
      name: "Tu Propio Peso",
      desc: "Levantá tu peso corporal en un ejercicio",
      check: (partida) =>
        partida.profile.bodyWeight > 0 &&
        Math.max(...Object.values(partida.bestLiftKg || { 0: 0 })) >= partida.profile.bodyWeight,
    },
    {
      id: "gym_bw15",
      tier: "A",
      category: "Gimnasio",
      name: "Uno y Medio",
      desc: "Levantá 1,5× tu peso corporal",
      check: (partida) =>
        partida.profile.bodyWeight > 0 &&
        Math.max(...Object.values(partida.bestLiftKg || { 0: 0 })) >=
          partida.profile.bodyWeight * 1.5,
    },
    {
      id: "gym_bw2",
      tier: "S",
      category: "Gimnasio",
      name: "Doble Cuerpo",
      desc: "Levantá 2× tu peso corporal",
      check: (partida) =>
        partida.profile.bodyWeight > 0 &&
        Math.max(...Object.values(partida.bestLiftKg || { 0: 0 })) >=
          partida.profile.bodyWeight * 2,
    },
    {
      id: "resilience_3",
      tier: "D",
      category: "Persistencia",
      name: "El Regreso",
      desc: "Volvé a entrenar tras fallar 3+ días seguidos",
      check: (partida) => partida.maxComebackStreak >= 3,
    },
    {
      id: "resilience_7",
      tier: "C",
      category: "Persistencia",
      name: "Fénix",
      desc: "Volvé a entrenar tras fallar 7+ días seguidos",
      check: (partida) => partida.maxComebackStreak >= 7,
    },
    {
      id: "rep_squat_100",
      tier: "E",
      category: "Repeticiones",
      name: "Cimiento",
      desc: "100 reps de piernas de por vida",
      check: (partida) => partida.lifetimeReps.squat >= 100,
    },
    {
      id: "rep_squat_500",
      tier: "D",
      category: "Repeticiones",
      name: "Pilar",
      desc: "500 reps de piernas de por vida",
      check: (partida) => partida.lifetimeReps.squat >= 500,
    },
    {
      id: "rep_squat_1000",
      tier: "D",
      category: "Repeticiones",
      name: "Columna",
      desc: "1000 reps de piernas de por vida",
      check: (partida) => partida.lifetimeReps.squat >= 1000,
    },
    {
      id: "rep_squat_2500",
      tier: "C",
      category: "Repeticiones",
      name: "Titán de Piernas",
      desc: "2500 reps de piernas de por vida",
      check: (partida) => partida.lifetimeReps.squat >= 2500,
    },
    {
      id: "rep_squat_5000",
      tier: "B",
      category: "Repeticiones",
      name: "Montaña",
      desc: "5000 reps de piernas de por vida",
      check: (partida) => partida.lifetimeReps.squat >= 5000,
    },
    {
      id: "rep_squat_10000",
      tier: "A",
      category: "Repeticiones",
      name: "Coloso",
      desc: "10000 reps de piernas de por vida",
      check: (partida) => partida.lifetimeReps.squat >= 10000,
    },
    {
      id: "rep_squat_25000",
      tier: "S",
      category: "Repeticiones",
      name: "Atlas",
      desc: "25000 reps de piernas de por vida",
      check: (partida) => partida.lifetimeReps.squat >= 25000,
    },
    {
      id: "rep_pushup_100",
      tier: "E",
      category: "Repeticiones",
      name: "Primer Empuje",
      desc: "100 reps de empuje de por vida",
      check: (partida) => partida.lifetimeReps.pushup >= 100,
    },
    {
      id: "rep_pushup_250",
      tier: "E",
      category: "Repeticiones",
      name: "Muro",
      desc: "250 reps de empuje de por vida",
      check: (partida) => partida.lifetimeReps.pushup >= 250,
    },
    {
      id: "rep_pushup_500",
      tier: "D",
      category: "Repeticiones",
      name: "Ariete",
      desc: "500 reps de empuje de por vida",
      check: (partida) => partida.lifetimeReps.pushup >= 500,
    },
    {
      id: "rep_pushup_1000",
      tier: "D",
      category: "Repeticiones",
      name: "Yunque",
      desc: "1000 reps de empuje de por vida",
      check: (partida) => partida.lifetimeReps.pushup >= 1000,
    },
    {
      id: "rep_pushup_2500",
      tier: "C",
      category: "Repeticiones",
      name: "Martillo",
      desc: "2500 reps de empuje de por vida",
      check: (partida) => partida.lifetimeReps.pushup >= 2500,
    },
    {
      id: "rep_pushup_5000",
      tier: "B",
      category: "Repeticiones",
      name: "Fuerza Bruta",
      desc: "5000 reps de empuje de por vida",
      check: (partida) => partida.lifetimeReps.pushup >= 5000,
    },
    {
      id: "rep_pushup_10000",
      tier: "A",
      category: "Repeticiones",
      name: "Prensa",
      desc: "10000 reps de empuje de por vida",
      check: (partida) => partida.lifetimeReps.pushup >= 10000,
    },
    {
      id: "rep_pushup_25000",
      tier: "S",
      category: "Repeticiones",
      name: "Titán de Empuje",
      desc: "25000 reps de empuje de por vida",
      check: (partida) => partida.lifetimeReps.pushup >= 25000,
    },
    {
      id: "rep_back_100",
      tier: "D",
      category: "Repeticiones",
      name: "Primer Tirón",
      desc: "100 reps de tracción de por vida",
      check: (partida) => partida.lifetimeReps.back >= 100,
    },
    {
      id: "rep_back_250",
      tier: "D",
      category: "Repeticiones",
      name: "Garra",
      desc: "250 reps de tracción de por vida",
      check: (partida) => partida.lifetimeReps.back >= 250,
    },
    {
      id: "rep_back_1000",
      tier: "C",
      category: "Repeticiones",
      name: "Cadena",
      desc: "1000 reps de tracción de por vida",
      check: (partida) => partida.lifetimeReps.back >= 1000,
    },
    {
      id: "rep_back_2500",
      tier: "B",
      category: "Repeticiones",
      name: "Ancla",
      desc: "2500 reps de tracción de por vida",
      check: (partida) => partida.lifetimeReps.back >= 2500,
    },
    {
      id: "rep_back_5000",
      tier: "A",
      category: "Repeticiones",
      name: "Polea",
      desc: "5000 reps de tracción de por vida",
      check: (partida) => partida.lifetimeReps.back >= 5000,
    },
    {
      id: "rep_back_10000",
      tier: "S",
      category: "Repeticiones",
      name: "Grúa",
      desc: "10000 reps de tracción de por vida",
      check: (partida) => partida.lifetimeReps.back >= 10000,
    },
    {
      id: "rep_back_25000",
      tier: "Z",
      category: "Repeticiones",
      name: "Torre",
      desc: "25000 reps de tracción de por vida",
      check: (partida) => partida.lifetimeReps.back >= 25000,
    },
    {
      id: "rep_abs_100",
      tier: "E",
      category: "Repeticiones",
      name: "Núcleo Vivo",
      desc: "100 reps de core de por vida",
      check: (partida) => partida.lifetimeReps.abs >= 100,
    },
    {
      id: "rep_abs_250",
      tier: "E",
      category: "Repeticiones",
      name: "Coraza",
      desc: "250 reps de core de por vida",
      check: (partida) => partida.lifetimeReps.abs >= 250,
    },
    {
      id: "rep_abs_500",
      tier: "D",
      category: "Repeticiones",
      name: "Blindaje",
      desc: "500 reps de core de por vida",
      check: (partida) => partida.lifetimeReps.abs >= 500,
    },
    {
      id: "rep_abs_1000",
      tier: "D",
      category: "Repeticiones",
      name: "Fortaleza",
      desc: "1000 reps de core de por vida",
      check: (partida) => partida.lifetimeReps.abs >= 1000,
    },
    {
      id: "rep_abs_2500",
      tier: "C",
      category: "Repeticiones",
      name: "Acero Central",
      desc: "2500 reps de core de por vida",
      check: (partida) => partida.lifetimeReps.abs >= 2500,
    },
    {
      id: "rep_abs_5000",
      tier: "B",
      category: "Repeticiones",
      name: "Bastión",
      desc: "5000 reps de core de por vida",
      check: (partida) => partida.lifetimeReps.abs >= 5000,
    },
    {
      id: "rep_abs_10000",
      tier: "A",
      category: "Repeticiones",
      name: "Fuste",
      desc: "10000 reps de core de por vida",
      check: (partida) => partida.lifetimeReps.abs >= 10000,
    },
    {
      id: "rep_abs_25000",
      tier: "S",
      category: "Repeticiones",
      name: "Eje",
      desc: "25000 reps de core de por vida",
      check: (partida) => partida.lifetimeReps.abs >= 25000,
    },
    {
      id: "pr_squat_25",
      tier: "E",
      category: "Marcas personales",
      name: "Piernas de Hierro",
      desc: "25 reps de piernas en una sola sesión",
      check: (partida) => partida.records && partida.records.squat >= 25,
    },
    {
      id: "pr_squat_40",
      tier: "D",
      category: "Marcas personales",
      name: "Piernas Indomables",
      desc: "40 reps de piernas en una sola sesión",
      check: (partida) => partida.records && partida.records.squat >= 40,
    },
    {
      id: "pr_pushup_15",
      tier: "E",
      category: "Marcas personales",
      name: "Empuje Firme",
      desc: "15 reps de empuje en una sola sesión",
      check: (partida) => partida.records && partida.records.pushup >= 15,
    },
    {
      id: "pr_pushup_25",
      tier: "D",
      category: "Marcas personales",
      name: "Empuje Imparable",
      desc: "25 reps de empuje en una sola sesión",
      check: (partida) => partida.records && partida.records.pushup >= 25,
    },
    {
      id: "pr_back_8",
      tier: "E",
      category: "Marcas personales",
      name: "Tracción Real",
      desc: "8 reps de tracción en una sola sesión",
      check: (partida) => partida.records && partida.records.back >= 8,
    },
    {
      id: "pr_back_18",
      tier: "D",
      category: "Marcas personales",
      name: "Espalda de Acero",
      desc: "18 reps de tracción en una sola sesión",
      check: (partida) => partida.records && partida.records.back >= 18,
    },
    {
      id: "pr_abs_25",
      tier: "E",
      category: "Marcas personales",
      name: "Core Encendido",
      desc: "25 reps de core en una sola sesión",
      check: (partida) => partida.records && partida.records.abs >= 25,
    },
    {
      id: "pr_abs_40",
      tier: "D",
      category: "Marcas personales",
      name: "Core Inquebrantable",
      desc: "40 reps de core en una sola sesión",
      check: (partida) => partida.records && partida.records.abs >= 40,
    },
    {
      id: "gymv_500",
      tier: "E",
      category: "Gimnasio",
      name: "Primeros Kilos",
      desc: "500 kg sumando todas tus series",
      check: (partida) => (partida.lifetimeVolumeKg || 0) >= 500,
    },
    {
      id: "gymv_2500",
      tier: "D",
      category: "Gimnasio",
      name: "Carga Ligera",
      desc: "2.500 kg sumando todas tus series",
      check: (partida) => (partida.lifetimeVolumeKg || 0) >= 2500,
    },
    {
      id: "gymv_250000",
      tier: "A",
      category: "Gimnasio",
      name: "Ciento Cincuenta Toneladas",
      desc: "150.000 kg sumando todas tus series",
      check: (partida) => (partida.lifetimeVolumeKg || 0) >= 15e4,
    },
    {
      id: "gymk_20",
      tier: "E",
      category: "Gimnasio",
      name: "Primera Barra",
      desc: "Levantá 20 kg en cualquier ejercicio",
      check: (partida) => Math.max(0, ...Object.values(partida.bestLiftKg || {})) >= 20,
    },
    {
      id: "gymk_40",
      tier: "D",
      category: "Gimnasio",
      name: "Carga Real",
      desc: "Levantá 40 kg en cualquier ejercicio",
      check: (partida) => Math.max(0, ...Object.values(partida.bestLiftKg || {})) >= 40,
    },
    {
      id: "gymk_60",
      tier: "C",
      category: "Gimnasio",
      name: "Peso Serio",
      desc: "Levantá 60 kg en cualquier ejercicio",
      check: (partida) => Math.max(0, ...Object.values(partida.bestLiftKg || {})) >= 60,
    },
    {
      id: "gymk_100",
      tier: "B",
      category: "Gimnasio",
      name: "Tres Dígitos",
      desc: "Levantá 100 kg en cualquier ejercicio",
      check: (partida) => Math.max(0, ...Object.values(partida.bestLiftKg || {})) >= 100,
    },
    {
      id: "mod_bodyweight_10",
      tier: "E",
      category: "Modalidades",
      name: "Constante en el Cuerpo",
      desc: "10 sesiones de peso corporal",
      check: (partida) => ((partida.lifetimeModalities || {}).bodyweight || 0) >= 10,
    },
    {
      id: "mod_bodyweight_50",
      tier: "C",
      category: "Modalidades",
      name: "Cincuenta a Pulso",
      desc: "50 sesiones de peso corporal",
      check: (partida) => ((partida.lifetimeModalities || {}).bodyweight || 0) >= 50,
    },
    {
      id: "mod_bodyweight_200",
      tier: "A",
      category: "Modalidades",
      name: "Doscientas sin Hierro",
      desc: "200 sesiones de peso corporal",
      check: (partida) => ((partida.lifetimeModalities || {}).bodyweight || 0) >= 200,
    },
    {
      id: "mod_gym_10",
      tier: "E",
      category: "Modalidades",
      name: "Primer Ciclo de Hierro",
      desc: "10 sesiones de gimnasio",
      check: (partida) => ((partida.lifetimeModalities || {}).gym || 0) >= 10,
    },
    {
      id: "mod_gym_50",
      tier: "C",
      category: "Modalidades",
      name: "Cincuenta bajo la Barra",
      desc: "50 sesiones de gimnasio",
      check: (partida) => ((partida.lifetimeModalities || {}).gym || 0) >= 50,
    },
    {
      id: "mod_gym_200",
      tier: "A",
      category: "Modalidades",
      name: "Doscientas de Hierro",
      desc: "200 sesiones de gimnasio",
      check: (partida) => ((partida.lifetimeModalities || {}).gym || 0) >= 200,
    },
    {
      id: "mod_flow_10",
      tier: "E",
      category: "Modalidades",
      name: "Primeros Flujos",
      desc: "10 sesiones de flow",
      check: (partida) => ((partida.lifetimeModalities || {}).flow || 0) >= 10,
    },
    {
      id: "mod_flow_50",
      tier: "C",
      category: "Modalidades",
      name: "Cincuenta Fluidas",
      desc: "50 sesiones de flow",
      check: (partida) => ((partida.lifetimeModalities || {}).flow || 0) >= 50,
    },
    {
      id: "mod_flow_200",
      tier: "A",
      category: "Modalidades",
      name: "Doscientas en Movimiento",
      desc: "200 sesiones de flow",
      check: (partida) => ((partida.lifetimeModalities || {}).flow || 0) >= 200,
    },
    {
      id: "animo_vino",
      tier: "D",
      category: "Días que no querías",
      name: "Viniste igual",
      desc: "Entrená un día que llegaste sin ganas o con pocas ganas",
      check: (partida) => sdcAnimoCuenta(partida).vino >= 1,
    },
    {
      id: "animo_envion",
      tier: "D",
      category: "Días que no querías",
      name: "El envión",
      desc: "Llegá sin ganas o con pocas ganas y terminá con ganas o a full",
      check: (partida) => sdcAnimoCuenta(partida).envion >= 1,
    },
    {
      id: "animo_vino5",
      tier: "C",
      category: "Días que no querías",
      name: "Cinco días que no querías",
      desc: "Entrená 5 días que llegaste sin ganas o con pocas ganas",
      check: (partida) => sdcAnimoCuenta(partida).vino >= 5,
    },
    {
      id: "animo_mejor10",
      tier: "C",
      category: "Días que no querías",
      name: "Te cambió el día",
      desc: "Terminá mejor de lo que llegaste 10 veces",
      check: (partida) => sdcAnimoCuenta(partida).mejor >= 10,
    },
    {
      id: "animo_vino20",
      tier: "B",
      category: "Días que no querías",
      name: "Veinte días que no querías",
      desc: "Entrená 20 días que llegaste sin ganas o con pocas ganas",
      check: (partida) => sdcAnimoCuenta(partida).vino >= 20,
    },
    {
      id: "animo_mejor50",
      tier: "B",
      category: "Días que no querías",
      name: "Entrenar te cambia el día",
      desc: "Terminá mejor de lo que llegaste 50 veces",
      check: (partida) => sdcAnimoCuenta(partida).mejor >= 50,
    },
    {
      id: "animo_vino50",
      tier: "A",
      category: "Días que no querías",
      name: "Cincuenta días que no querías",
      desc: "Entrená 50 días que llegaste sin ganas o con pocas ganas",
      check: (partida) => sdcAnimoCuenta(partida).vino >= 50,
    },
  ];
function sdcAnimo(partida) {
  return (partida && partida.animo) || {};
}
function sdcAnimoCuenta(partida) {
  var animo = sdcAnimo(partida),
    historia = (partida && partida.history) || {},
    fecha,
    dia,
    cuenta = { no: 0, vino: 0, envion: 0, mejor: 0, ambas: 0, noResp: 0, noMejor: 0 };
  for (fecha in animo) {
    dia = animo[fecha];
    if (!dia || !dia.antes) continue;
    if (dia.antes <= 2) {
      cuenta.no++;
      (historia[fecha] === "full" || historia[fecha] === "partial") && cuenta.vino++;
      dia.despues >= 4 && cuenta.envion++;
      dia.despues && (cuenta.noResp++, dia.despues > dia.antes && cuenta.noMejor++);
    }
    dia.despues && (cuenta.ambas++, dia.despues > dia.antes && cuenta.mejor++);
  }
  return cuenta;
}
function revisarLogros(actual) {
  let partida = clonar(actual),
    avisos = [];
  partida.achievements || (partida.achievements = []);
  partida.dominion || (partida.dominion = dominioInicial());
  let pd = { E: 1, D: 1, C: 2, B: 2, A: 3, S: 4, Z: 5 },
    nuevos = 0,
    pdNuevos = 0;
  for (let logro of logros)
    if (!partida.achievements.includes(logro.id) && logro.check(partida)) {
      partida.achievements.push(logro.id);
      let pdLogro = pd[logro.tier] || 1;
      ((partida.dominion.points = (partida.dominion.points || 0) + pdLogro),
        (nuevos += 1),
        (pdNuevos += pdLogro),
        avisos.push(`🏆 Logro desbloqueado: ${logro.name} (+${pdLogro} PD)`));
    }
  return (
    nuevos > 5 &&
      (avisos = [
        `🏆 ${nuevos} logros desbloqueados de golpe (+${pdNuevos} PD). Los tenés en la pestaña Logros.`,
      ]),
    { state: partida, notices: avisos }
  );
}
function cargaDelDia(partida) {
  let hoy = fechaHoy(),
    carga = 0;
  return (
    partida.today.date === hoy &&
      partida.today.completed &&
      partida.today.mode !== "rest" &&
      (carga += partida.today.fullCompletion ? 2 : 1),
    partida.dungeon.date === hoy && partida.dungeon.completed && (carga += 2),
    partida.primal.today.date === hoy && (carga += partida.primal.today.count),
    partida.combat.todayDefeated &&
      partida.combat.todayDefeated.date === hoy &&
      (carga += partida.combat.todayDefeated.count),
    carga
  );
}
function nivelCarga(carga) {
  return carga >= 8 ? "Muy Alto" : carga >= 5 ? "Alto" : carga >= 3 ? "Moderado" : "Ligero";
}
function avisoCarga(actual) {
  let partida = clonar(actual),
    avisos = [],
    hoy = fechaHoy();
  return (
    nivelCarga(cargaDelDia(partida)) === "Muy Alto" &&
      partida.loadWarnedDate !== hoy &&
      ((partida.loadWarnedDate = hoy),
      avisos.push(
        "Hoy le diste durísimo a tu cuerpo. Considerá parar por hoy y dejar que descanse — mañana el plan sigue en pie.",
      )),
    { state: partida, notices: avisos }
  );
}
function ultimos60Dias(historia, hoy) {
  let limite = new Date(hoy + "T00:00:00");
  limite.setDate(limite.getDate() - 60);
  let desde = fechaLocal(limite),
    recientes = {};
  for (let fecha of Object.keys(historia || {}))
    fecha >= desde && (recientes[fecha] = historia[fecha]);
  return recientes;
}

export {
  categoriasLogros,
  ordenDificultad,
  sdcDific,
  logros,
  sdcAnimo,
  sdcAnimoCuenta,
  revisarLogros,
  cargaDelDia,
  nivelCarga,
  avisoCarga,
  ultimos60Dias,
};
