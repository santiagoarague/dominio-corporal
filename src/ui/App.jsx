// La app: el estado de la partida, los efectos y los manejadores, y lo que rodea a las
// pestanas (cabecera, avisos, tienda, guia, barra de pestanas). Cada pestana esta en pestanas/
// y recibe como props las variables de App que usa.
import { useState, useEffect, createElement } from "react";
import {
  IconoPasos,
  IconoDestello,
  IconoPesa,
  IconoPata,
  IconoEspadas,
  IconoTrofeo,
  IconoFlecha,
  IconoPersona,
} from "./iconos.jsx";
import { colorRango, nivelUmbral, metrosPorPaso, rangos } from "../datos/rangos.js";
import {
  xpTravesia,
  travesiaDelDia,
  caminanteDe,
  nodosExplorar,
  sdcPortales,
} from "../logica/explorar.js";
import {
  trenesJefe,
  combateInicial,
  reintentarSinVidas,
  siguienteTerreno,
  segundosRondaPrimal,
  elegirTren,
  rondasPrimal,
  golpear,
  repsCombate,
  segundosVentana,
  segundosVentanaJefe,
  golpesNecesarios,
  repsCombateSuave,
  perderVida,
  terreno,
} from "../logica/combate.js";
import {
  consejoDelDia,
  registrarPrimal,
  movimientosPrimal,
  descansoPrimal,
  consejos,
  sdcPrimalPrep,
  sdcPrimalTic,
} from "../logica/primal.js";
import { tienda, comprar, sesionesPrimalHoy } from "../logica/tienda.js";
import { sdcEstPaso, sdcEstTotal } from "../logica/estiramiento.js";
import { nivelesZonas } from "../logica/atributos.js";
import { guia } from "../datos/guia.js";
import { neuroInicial } from "../datos/salud.js";
import { sistemas, sistemaActivo, sistemaAbierto } from "../logica/sistemas.js";
import { logros, revisarLogros, avisoCarga, categoriasLogros } from "../datos/logros.js";
import { modalidades } from "../datos/ejercicios.js";
import {
  modalidadDelDia,
  metaDelDia,
  fechaLocal,
  ejercicioDe,
  metaSemanal,
  guardarPrueba,
  costoNivel,
  modalidadesDe,
  sdcCalibre,
  fechaHoy,
} from "../logica/rutina.js";
import {
  subirNiveles,
  clonar,
  registrarEstiramiento,
  cargarPartida,
  descartarTramos,
  consolidarKm,
  registrarRutina,
  escribirPuntoRetorno,
  completarTravesia,
  sdcCruzar,
  usarDescanso,
  leerPuntoRetorno,
  sumarTramo,
} from "../logica/partida.js";
import { Tarjeta, BarraXp } from "./base.jsx";
import {
  sdcDeshacer,
  sdcDeshacerHook,
  sdcGymSer,
  sdcGymUlt,
  sdcHoyMeta,
  sdcHoyReps,
  sdcKgTxt,
  sdcMarca,
  sdcMarcaK,
  sdcMetaHook,
  sdcPodia,
  sdcPrimeraAdd,
  sdcPrimerasHook,
  sdcRango,
  sdcSumaReps,
  sdcTier,
} from "../logica/extras.js";
import { Avisos } from "./avisos.jsx";
import { sdcBeep, sdcNSets, sdcSplit, sdcVib, sdcPrimalSon } from "../logica/series.js";
import { colorProgreso } from "./cuerpo.jsx";
import { diasConstancia } from "./constancia.jsx";
import { DibujoMascota, Plegable, colorDeRango } from "./tarjetas.jsx";
import { sdcRespaldoOk } from "../logica/respaldo.js";
import { usePantallaSi } from "./pantalla.js";
import { sdcEstDesde, sdcPasoEspera, sdcPasosHook, sdcPasosV } from "./calentamiento.jsx";
import { sdcAnimoHoy } from "./animo.jsx";
import { PestanaLogros } from "./pestanas/logros.jsx";
import { PestanaExplorar } from "./pestanas/explorar.jsx";
import { PestanaCombate } from "./pestanas/combate.jsx";
import { PestanaPrimal } from "./pestanas/primal.jsx";
import { PestanaEntreno } from "./pestanas/entreno.jsx";
import { PestanaPerfil } from "./pestanas/perfil.jsx";
import { PanelPruebas } from "./pestanas/pruebas.jsx";

var sdcDevN = 0;
function App({ player, setPlayer, initialNotices }) {
  // Los avisos se agregan en una microtarea. Muchas actualizaciones de la
  // partida, setPlayer(d => ...), los agregan desde adentro, y React ejecuta esa
  // funcion mientras dibuja Raiz: actualizar App en ese momento es justo lo
  // que React no permite ("Cannot update a component while rendering").
  function avisar(cambio) {
    queueMicrotask(() => sdcSetAvisos(cambio));
  }
  let [avisos, sdcSetAvisos] = useState(initialNotices || []),
    {
      profile,
      progress,
      today,
      week,
      streak,
      ascension,
      exploration,
      dungeon,
      achievements,
      history,
      lifetimeReps,
      combat,
      primal,
      dungeonsCleared,
      lastTrained,
      dominion,
      lastWeekSummary,
      ui,
    } = player,
    colorDelRango = colorRango[progress.rank],
    nivelDelUmbral = nivelUmbral[progress.rank],
    costoDelNivel = costoNivel(progress.level),
    rangoDeHoy = (today.completed && today.rank) || progress.rank,
    modalidad = modalidadDelDia(profile, today.date, today.modality),
    metaDia = metaDelDia(player, rangoDeHoy),
    [modo, setModo] = useState(() =>
      sdcAnimoHoy(player).modo === "recovery" ? "recovery" : "normal",
    ),
    [metaSesion, setMetaSesion] = useState({ ...metaDia }),
    [sdcSer, sdcSetSer] = useState({ squat: 0, pushup: 0, back: 0, abs: 0 }),
    [sdcFlota, sdcSetFlota] = useState(null),
    [sdcUltEpic, sdcSetUltEpic] = useState(""),
    [sdcDesc, sdcSetDesc] = useState(0),
    [sdcDescIni, sdcSetDescIni] = useState(0),
    [sdcAjuste, sdcSetAjuste] = useState({}),
    [sdcConfDesc, sdcSetConfDesc] = useState(!1),
    [sdcModOk, sdcSetModOk] = useState(!1),
    [sdcCombSer, sdcSetCombSer] = useState({}),
    [sdcTema, sdcSetTema] = useState({
      "Tu rutina de hoy": 1,
      "Cómo se anota lo que hacés": 1,
      "Niveles y XP": 1,
    }),
    [sdcEstPasos, sdcSetEstPasos] = useState([]),
    [sdcEstIdx, sdcSetEstIdx] = useState(0),
    [sdcEstIni, sdcSetEstIni] = useState(0),
    [sdcEstPz, sdcSetEstPz] = useState(0),
    [sdcEstOk, sdcSetEstOk] = useState(-1),
    [sdcKgS, sdcSetKgS] = useState({}),
    [estirando, setEstirando] = useState(!1),
    [estSegundos, setEstSegundos] = useState(300),
    [confirmarReinicio, setConfirmarReinicio] = useState(!1),
    [panelPruebas, setPanelPruebas] = useState(!1),
    [hayPuntoRetorno, setHayPuntoRetorno] = useState(!1),
    [vistaCuerpo, setVistaCuerpo] = useState("front"),
    [modoMapa, setModoMapa] = useState("desarrollo"),
    [seccionPrimal, setSeccionPrimal] = useState("movs"),
    [habilidadAbierta, setHabilidadAbierta] = useState(null),
    [cuidadoAbierto, setCuidadoAbierto] = useState(null),
    [neuroAbierto, setNeuroAbierto] = useState(null),
    [zonaElegida, setZonaElegida] = useState(null),
    [pestana, setPestana] = useState("training"),
    [kmTexto, setKmTexto] = useState(""),
    [pasosTexto, setPasosTexto] = useState(""),
    [verTodoMapa, setVerTodoMapa] = useState(!1),
    [cambiandoMeta, setCambiandoMeta] = useState(!1),
    [diaElegido, setDiaElegido] = useState(null),
    [confirmarDeshacer, setConfirmarDeshacer] = useState(!1),
    [hallazgos, setHallazgos] = useState([]),
    [combPrep, setCombPrep] = useState(!1),
    [combVentana, setCombVentana] = useState(!1),
    [combSegundos, setCombSegundos] = useState(0),
    [combSegundosMax, setCombSegundosMax] = useState(0),
    [primalMov, setPrimalMov] = useState(null),
    [primalRonda, setPrimalRonda] = useState(1),
    [primalFase, setPrimalFase] = useState("idle"),
    [primalSegundos, setPrimalSegundos] = useState(0),
    [primalFin, setPrimalFin] = useState(0),
    [primalPausa, setPrimalPausa] = useState(0),
    [repruebaAbierta, setRepruebaAbierta] = useState(!1),
    [repruebaPaso, setRepruebaPaso] = useState(0),
    repruebaEjercicios = [
      {
        key: "sq",
        label: "Sentadillas",
        hint: "De pie, bajá hasta que los muslos queden paralelos al suelo.",
      },
      { key: "pu", label: "Flexiones", hint: "Cuerpo en línea recta. Podés apoyar las rodillas." },
      { key: "ab", label: "Abdominales", hint: "Subí con el abdomen, sin tirar del cuello." },
      {
        key: "bk",
        label: "Remo invertido",
        hint: "Bajo una mesa firme, cuerpo recto, tirá hasta tocar el borde con el pecho. Sin mesa: superman en el suelo.",
      },
    ],
    [repSentadillas, setRepSentadillas] = useState(""),
    [repFlexiones, setRepFlexiones] = useState(""),
    [repAbdominales, setRepAbdominales] = useState(""),
    [sdcRbk, sdcSetRbk] = useState(""),
    [fraseMascota, setFraseMascota] = useState(() => consejoDelDia(fechaHoy())),
    [respaldoTexto, setRespaldoTexto] = useState(""),
    [confirmarRestaurar, setConfirmarRestaurar] = useState(!1),
    [metronomoOn, setMetronomoOn] = useState(!1),
    [descansando, setDescansando] = useState(!1),
    descansoBase = { fuerza: 90, resistencia: 45, salud: 60 },
    metaSemana = metaSemanal(player),
    sdcYa = today.completed || (today.doneModalities || []).includes(modalidad),
    repsHoy = sdcYa ? sdcHoyReps(player) : sdcSumaReps(sdcHoyReps(player), sdcRepsHechas()),
    sdcMt = sdcYa ? sdcHoyMeta(player, metaDia) : sdcSumaReps(sdcHoyMeta(player, null), metaDia),
    ratiosHoy = {
      squat: (repsHoy.squat || 0) / (sdcMt.squat || 1),
      pushup: (repsHoy.pushup || 0) / (sdcMt.pushup || 1),
      back: (repsHoy.back || 0) / (sdcMt.back || 1),
      abs: (repsHoy.abs || 0) / (sdcMt.abs || 1),
    },
    grupos = ["squat", "pushup", "back", "abs"],
    atributos = nivelesZonas(player),
    nivelMaxAtributo = Math.max(10, ...grupos.map((grupo) => atributos.levels[grupo])),
    metaSemanaGrupo = (grupo) => Math.max(1, (metaDia[grupo] || 1) * metaSemana),
    ratioMapa = (grupo) =>
      modoMapa === "hoy"
        ? (repsHoy[grupo] || 0) / (sdcMt[grupo] || 1)
        : modoMapa === "semana"
          ? ((week.reps && week.reps[grupo]) || 0) / metaSemanaGrupo(grupo)
          : atributos.levels[grupo] / nivelMaxAtributo,
    coloresMapa = {
      squat: colorProgreso(ratioMapa("squat")),
      pushup: colorProgreso(ratioMapa("pushup")),
      back: colorProgreso(ratioMapa("back")),
      abs: colorProgreso(ratioMapa("abs")),
    },
    kmTotales = exploration.lifetimeKm || 0,
    rangoCaminante = caminanteDe(kmTotales),
    nodoSiguiente = nodosExplorar[exploration.unlockedIndex + 1] || null,
    primalHechasHoy = primal.today.date === fechaHoy() ? primal.today.count : 0,
    primalSesionesHoy = sesionesPrimalHoy(player),
    sesionesSemana = week.trained || 0,
    diasGrilla = diasConstancia(
      history,
      today.date,
      today.completed
        ? today.mode === "rest"
          ? "rest"
          : today.fullCompletion
            ? "full"
            : "partial"
        : (week.sessionDates || []).includes(today.date)
          ? "partial"
          : "pending",
      28,
    );
  (useEffect(() => {
    (setMetaSesion(
      modo === "recovery"
        ? {
            squat: Math.round(metaDia.squat * 0.5),
            pushup: Math.round(metaDia.pushup * 0.5),
            back: Math.round(metaDia.back * 0.5),
            abs: Math.round(metaDia.abs * 0.5),
          }
        : { ...metaDia },
    ),
      (function () {
        var marca = sdcMarca(player, sdcMarcaK(modalidad, modo));
        marca && !today.completed && !(today.doneModalities || []).includes(modalidad)
          ? (sdcSetSer(marca.ser || { squat: 0, pushup: 0, back: 0, abs: 0 }),
            sdcSetAjuste(marca.aj || {}),
            sdcSetModOk(!!marca.mok),
            sdcSetKgS(marca.kg || {}))
          : (sdcSetSer({ squat: 0, pushup: 0, back: 0, abs: 0 }),
            sdcSetAjuste({}),
            sdcSetModOk(!1),
            sdcSetKgS({}));
      })(),
      sdcSetConfDesc(!1));
  }, [modo, progress.rank, modalidad]),
    useEffect(() => {
      if (!avisos || !avisos.length) {
        sdcUltEpic && sdcSetUltEpic("");
        return;
      }
      let epico = avisos.find((texto) => sdcTier(texto) === "epic");
      if (!epico) {
        sdcUltEpic && sdcSetUltEpic("");
        return;
      }
      if (epico === sdcUltEpic) return;
      (sdcSetUltEpic(epico),
        sdcBeep(523, 140),
        setTimeout(() => sdcBeep(659, 140), 150),
        setTimeout(() => sdcBeep(784, 140), 300),
        setTimeout(() => sdcBeep(1047, 340), 450),
        sdcVib([40, 60, 40, 60, 140]));
    }, [avisos, sdcUltEpic]),
    useEffect(() => {
      sdcSetCombSer({});
    }, [combat.villainIndex, combat.exercise, combat.phase]),
    useEffect(() => {
      if (!sdcFlota) return;
      let espera = setTimeout(() => sdcSetFlota(null), 1200);
      return () => clearTimeout(espera);
    }, [sdcFlota]),
    useEffect(() => {
      if (!estirando) return;
      let reloj = setInterval(
        () => setEstSegundos(Math.floor(((sdcEstPz || Date.now()) - sdcEstIni) / 1e3)),
        300,
      );
      return () => clearInterval(reloj);
    }, [estirando, sdcEstIni, sdcEstPz]),
    useEffect(() => {
      if (!estirando) return;
      let total = sdcEstTotal(sdcEstPasos);
      if (estSegundos >= total) {
        (setEstirando(!1),
          sdcBeep(880, 200),
          setTimeout(() => sdcBeep(1175, 340), 210),
          sdcVib([40, 60, 140]),
          aplicar((partida) =>
            sdcPasosHook(
              registrarEstiramiento(partida, sdcEstPasos.length, sdcEstPasos.length),
              sdcEstPasos,
              sdcEstPasos.length,
            ),
          ),
          avisar((previos) => [...previos, "Rutina de estiramiento completada."]));
        return;
      }
      let paso = sdcEstPaso(sdcEstPasos, estSegundos),
        fase = paso.index * 2 + (paso.prep > 0 ? 0 : 1);
      paso.prep > 0 &&
        !sdcEstPz &&
        sdcEstOk < paso.index &&
        sdcPasoEspera(sdcEstPasos, paso.index, sdcPasosV(player)) &&
        sdcSetEstPz(sdcEstIni + sdcEstDesde(sdcEstPasos, paso.index) * 1e3);
      fase > sdcEstIdx &&
        (sdcSetEstIdx(fase),
        paso.prep > 0 ? (sdcBeep(520, 120), sdcVib(18)) : (sdcBeep(760, 140), sdcVib(22)));
    }, [estirando, estSegundos]),
    useEffect(() => {
      if (pestana !== "combat") {
        (setCombPrep(!1), setCombVentana(!1));
        return;
      }
      if (combat.phase === "resting") {
        let segs = terreno(combat.villainIndex).isBoss ? 20 : 12;
        (setCombSegundosMax(segs), setCombSegundos(segs), setCombPrep(!1), setCombVentana(!1));
      }
    }, [combat.roundId, pestana]),
    useEffect(() => {
      if (!combPrep) return;
      if (combSegundos <= 0) {
        setCombPrep(!1);
        let actual = terreno(combat.villainIndex),
          reps = actual.isBoss
            ? repsCombateSuave(
                progress.rank,
                profile.classification,
                profile.focusProfile,
                (combat.bossCats || trenesJefe(combat.lastExercise))[0],
                modalidad,
                profile.testResults,
              )
            : Math.max(
                1,
                Math.round(
                  repsCombate(
                    progress.rank,
                    profile.classification,
                    combat.exercise,
                    profile.focusProfile,
                    modalidad,
                    profile.testResults,
                  ) * (combat.loadFactor || 1),
                ),
              ),
          segs = actual.isBoss ? segundosVentanaJefe() : segundosVentana(reps);
        (setCombSegundosMax(segs), setCombSegundos(segs), setCombVentana(!0));
        return;
      }
      let espera = setTimeout(() => setCombSegundos((previo) => previo - 1), 1e3);
      return () => clearTimeout(espera);
    }, [combPrep, combSegundos]),
    useEffect(() => {
      if (!combVentana) return;
      if (combSegundos <= 0) {
        (setCombVentana(!1), aplicar((partida) => perderVida(partida)));
        return;
      }
      let espera = setTimeout(() => setCombSegundos((previo) => previo - 1), 1e3);
      return () => clearTimeout(espera);
    }, [combVentana, combSegundos]),
    useEffect(() => {
      if (primalFase !== "active") return;
      if (primalSegundos <= 0) {
        if (primalRonda < rondasPrimal)
          (sdcPrimalSon("fin"),
            setPrimalFase("resting"),
            setPrimalSegundos(descansoPrimal),
            setPrimalFin(Date.now() + descansoPrimal * 1e3));
        else {
          let mov = primalMov;
          (sdcPrimalSon("listo"),
            setPrimalFase("idle"),
            setPrimalMov(null),
            setPrimalRonda(1),
            aplicar((partida) => registrarPrimal(partida, mov)));
        }
        return;
      }
      sdcPrimalTic(primalFase, primalSegundos) && sdcPrimalSon("tic");
    }, [primalFase, primalSegundos]),
    useEffect(() => {
      if (primalFase !== "resting") return;
      if (primalSegundos <= 0) {
        (sdcPrimalSon("arranca"),
          setPrimalRonda((previo) => previo + 1),
          setPrimalFase("active"),
          setPrimalSegundos(segundosRondaPrimal(progress.rank)),
          setPrimalFin(Date.now() + segundosRondaPrimal(progress.rank) * 1e3));
        return;
      }
      primalRonda > 0 && primalSegundos === sdcPrimalPrep
        ? sdcPrimalSon("prepara")
        : sdcPrimalTic(primalFase, primalSegundos) && sdcPrimalSon("tic");
    }, [primalFase, primalSegundos]),
    // El reloj del Primal sale de una marca de tiempo (primalFin), no de restar un
    // segundo por vez: si el telefono frena los temporizadores, no se atrasa. En
    // pausa no corre; al seguir, primalFin se corre lo que duro la pausa.
    useEffect(() => {
      if ((primalFase !== "active" && primalFase !== "resting") || primalPausa) return;
      let reloj = setInterval(() => {
        let quedan = Math.max(0, Math.ceil((primalFin - Date.now()) / 1e3));
        setPrimalSegundos((previo) => (previo === quedan ? previo : quedan));
      }, 250);
      return () => clearInterval(reloj);
    }, [primalFase, primalFin, primalPausa]),
    // La pantalla no se apaga mientras corre algo con reloj, ni en medio de la
    // rutina: desde la primera serie marcada hasta registrarla, en Entreno.
    usePantallaSi(
      !!combPrep ||
        !!combVentana ||
        !!estirando ||
        primalFase === "active" ||
        primalFase === "resting" ||
        (pestana === "training" && !today.completed && sdcTotalHechas() > 0),
    ));
  function primalElegir(indice) {
    (setPrimalMov(indice), setPrimalRonda(0), setPrimalFase("listo"));
  }
  function sdcPrimalYa() {
    (sdcBeep(660, 100),
      sdcVib(22),
      setPrimalRonda(0),
      setPrimalSegundos(10),
      setPrimalFin(Date.now() + 1e4),
      setPrimalPausa(0),
      setPrimalFase("resting"));
  }
  function primalCancelar() {
    (setPrimalFase("idle"), setPrimalMov(null), setPrimalRonda(1), setPrimalPausa(0));
  }
  function primalPausar() {
    setPrimalPausa(Date.now());
  }
  function primalSeguir() {
    let desde = primalPausa;
    (setPrimalFin((previo) => previo + (Date.now() - desde)), setPrimalPausa(0));
  }
  function guardarReprueba() {
    let sentadillas = Math.max(0, parseInt(repSentadillas || "0", 10)),
      flexiones = Math.max(0, parseInt(repFlexiones || "0", 10)),
      abdominales = Math.max(0, parseInt(repAbdominales || "0", 10)),
      remo = Math.max(0, parseInt(sdcRbk || "0", 10));
    (aplicar((partida) => guardarPrueba(partida, sentadillas, flexiones, abdominales, remo, 5)),
      setRepruebaAbierta(!1),
      setRepSentadillas(""),
      setRepFlexiones(""),
      setRepAbdominales(""),
      sdcSetRbk(""));
  }
  function bkDescargar() {
    try {
      let json = JSON.stringify(player),
        blob = new Blob([json], { type: "application/json" }),
        url = URL.createObjectURL(blob),
        enlace = document.createElement("a");
      ((enlace.href = url),
        (enlace.download = "dominio-corporal-" + fechaHoy() + ".json"),
        document.body.appendChild(enlace),
        enlace.click(),
        document.body.removeChild(enlace),
        setTimeout(() => URL.revokeObjectURL(url), 1e3),
        sdcRespaldoOk(),
        avisar((previos) => [...previos, "Respaldo descargado como archivo."]));
    } catch (err) {
      avisar((previos) => [...previos, "No se pudo descargar el archivo."]);
    }
  }
  function bkCargar(evento) {
    let archivo = evento.target.files && evento.target.files[0];
    if (!archivo) return;
    let lector = new FileReader();
    ((lector.onload = () => {
      (setRespaldoTexto(String(lector.result || "")),
        avisar((previos) => [...previos, "Archivo cargado. Tocá Restaurar para aplicarlo."]));
    }),
      (lector.onerror = () => avisar((previos) => [...previos, "No se pudo leer el archivo."])),
      lector.readAsText(archivo),
      (evento.target.value = ""));
  }
  function copiarRespaldo() {
    let json = JSON.stringify(player);
    navigator.clipboard && navigator.clipboard.writeText
      ? navigator.clipboard
          .writeText(json)
          .then(
            () => (
              sdcRespaldoOk(),
              avisar((previos) => [...previos, "Respaldo copiado al portapapeles."])
            ),
          )
          .catch(() =>
            avisar((previos) => [
              ...previos,
              "No se pudo copiar automáticamente. Tocá el cuadro de texto y selecciona todo para copiarlo a mano.",
            ]),
          )
      : avisar((previos) => [
          ...previos,
          "Tocá el cuadro de texto y selecciona todo para copiarlo a mano.",
        ]);
  }
  function restaurarRespaldo() {
    try {
      let datos = JSON.parse(respaldoTexto.trim());
      if (!datos || !datos.profile || !datos.progress) throw new Error("formato inválido");
      let { state: partida } = cargarPartida(datos);
      (setPlayer(partida), avisar(["¡Progreso restaurado desde el respaldo!"]));
    } catch (err) {
      avisar((previos) => [
        ...previos,
        "Ese respaldo no es válido. Revisá que copiaste todo el texto completo.",
      ]);
    }
    (setRespaldoTexto(""), setConfirmarRestaurar(!1));
  }
  function aplicar(reductor) {
    setPlayer((previa) => {
      let { state: partida, notices: nuevos } = reductor(previa);
      return (nuevos && nuevos.length && avisar((previos) => [...previos, ...nuevos]), partida);
    });
  }
  function combElegir(tren) {
    aplicar((partida) => elegirTren(partida, tren));
  }
  function combCancelar() {
    (setCombVentana(!1), sdcSetCombSer({}));
    let segs = terreno(combat.villainIndex).isBoss ? 20 : 12;
    (setCombSegundosMax(segs), setCombSegundos(segs), setCombPrep(!1));
  }
  function combSiguiente() {
    aplicar((partida) => siguienteTerreno(partida));
  }
  function combReintentar() {
    aplicar((partida) => reintentarSinVidas(partida));
  }
  function sdcRepsSerie(grupo, serie) {
    let meta = metaSesion[grupo] || 0,
      partes = sdcSplit(meta, sdcNSets(meta)),
      ajustes = sdcAjuste[grupo] || {};
    return ajustes[serie] !== void 0 ? ajustes[serie] : partes[serie] || 0;
  }
  function sdcRepsHechas() {
    let lista = ["squat", "pushup", "back", "abs"],
      hechas = {};
    for (let grupo of lista) {
      let marcadas = sdcSer[grupo] || 0,
        suma = 0;
      for (let serie = 0; serie < marcadas; serie++) suma += sdcRepsSerie(grupo, serie);
      hechas[grupo] = suma;
    }
    return hechas;
  }
  function sdcTotalHechas() {
    let hechas = sdcRepsHechas();
    return hechas.squat + hechas.pushup + hechas.back + hechas.abs;
  }
  function sdcTotalMeta() {
    return (
      (metaSesion.squat || 0) +
      (metaSesion.pushup || 0) +
      (metaSesion.back || 0) +
      (metaSesion.abs || 0)
    );
  }
  function sdcAjustar(grupo, serie, reps) {
    let nuevo = {
      ...sdcAjuste,
      [grupo]: { ...(sdcAjuste[grupo] || {}), [serie]: Math.max(0, reps) },
    };
    (sdcSetAjuste(nuevo), sdcMarcaOk(sdcSer, nuevo, sdcModOk), sdcVib(6));
  }
  function sdcCelebra() {
    (sdcBeep(523, 120),
      setTimeout(() => sdcBeep(659, 120), 120),
      setTimeout(() => sdcBeep(784, 240), 240),
      sdcVib([30, 40, 70]));
  }
  function sdcMarcaOk(ser, ajustes, mok) {
    setPlayer(function (previa) {
      var partida = clonar(previa);
      if (partida.today) {
        var clave = sdcMarcaK(modalidad, modo);
        partida.today.marcas || (partida.today.marcas = {});
        var anterior = partida.today.marcas[clave] || {};
        partida.today.marcas[clave] = { ser: ser, aj: ajustes, mok: !!mok, kg: anterior.kg };
      }
      return partida;
    });
  }
  function sdcSerie(grupo, marcadas) {
    let antes = sdcSer[grupo] || 0,
      nuevo = { ...sdcSer, [grupo]: marcadas };
    (sdcSetSer(nuevo), sdcMarcaOk(nuevo, sdcAjuste, sdcModOk));
    if (marcadas > antes) {
      let ganadas = 0;
      for (let serie = antes; serie < marcadas; serie++) ganadas += sdcRepsSerie(grupo, serie);
      (sdcBeep(660, 80),
        setTimeout(() => sdcBeep(880, 110), 85),
        sdcVib(18),
        sdcSetFlota({ n: ganadas, id: Date.now() }),
        sdcSetDesc(
          Math.min(180, Math.round((descansoBase[profile.focusProfile] || 60) + ganadas * 1.5)),
        ),
        sdcSetDescIni(Date.now()),
        setDescansando(!0));
    } else sdcVib(8);
  }
  function sdcGolpe() {
    (setCombVentana(!1), aplicar((partida) => golpear(partida)), sdcSetCombSer({}));
  }
  function sdcCombTocar(fase, marcadas) {
    let antes = sdcCombSer[fase] || 0;
    sdcSetCombSer((previo) => ({ ...previo, [fase]: marcadas }));
    marcadas > antes
      ? (sdcBeep(700, 70), setTimeout(() => sdcBeep(920, 100), 75), sdcVib(16))
      : sdcVib(6);
  }
  function sdcCombChips(fase, reps) {
    let nSeries = sdcNSets(reps),
      partes = sdcSplit(reps, nSeries),
      marcadas = sdcCombSer[fase] || 0;
    return (
      <div className="flex gap-2">
        {partes.map((repsSerie, i) => (
          <button
            key={i}
            onClick={() => sdcCombTocar(fase, marcadas === i + 1 ? i : i + 1)}
            className="sdc-chip flex-1 py-3"
            aria-label={
              "Combate, serie " +
              (i + 1) +
              " de " +
              nSeries +
              (i < marcadas ? ", hecha" : ", pendiente")
            }
            style={{
              background: i < marcadas ? "#ff5c7a" : "rgba(255,255,255,0.04)",
              border: "1px solid " + (i < marcadas ? "#ff5c7a" : "rgba(255,255,255,0.18)"),
              color: i < marcadas ? "#0a0e1a" : "#8a93ad",
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              minHeight: 48,
            }}
          >
            {i < marcadas ? "✓ " + repsSerie : repsSerie}
          </button>
        ))}
      </div>
    );
  }
  function sdcMarcarTodo() {
    let tod = {
      squat: sdcNSets(metaSesion.squat || 0),
      pushup: sdcNSets(metaSesion.pushup || 0),
      back: sdcNSets(metaSesion.back || 0),
      abs: sdcNSets(metaSesion.abs || 0),
    };
    (sdcSetSer(tod),
      sdcMarcaOk(tod, sdcAjuste, sdcModOk),
      sdcCelebra(),
      sdcSetFlota({ n: sdcTotalMeta() - sdcTotalHechas(), id: Date.now() }));
  }
  function sdcKgVer(grupo, serie) {
    var escritos = sdcKgS[grupo] || {},
      guardados = sdcGymSer(player)[grupo] || {},
      i;
    for (i = serie; i >= 1; i--) {
      if (escritos[i] !== void 0) return escritos[i];
      if (guardados[i] !== void 0 && guardados[i] !== null && guardados[i] !== "")
        return sdcKgTxt(guardados[i]);
    }
    if (escritos[0] !== void 0) return escritos[0];
    var ultima = (sdcGymUlt(player)[sdcEjNom(grupo)] || {}).kgs;
    if (ultima && ultima[serie] > 0) return sdcKgTxt(ultima[serie]);
    if (ultima && ultima[0] > 0) return sdcKgTxt(ultima[0]);
    return "";
  }
  function sdcKgNum(grupo, serie) {
    return Math.max(0, parseFloat(String(sdcKgVer(grupo, serie)).replace(",", ".")) || 0);
  }
  function sdcKgSet(grupo, serie, val) {
    sdcSetKgS(function (previo) {
      var nuevo = Object.assign({}, previo);
      nuevo[grupo] = Object.assign({}, nuevo[grupo] || {});
      nuevo[grupo][serie] = val;
      return nuevo;
    });
    var num = Math.max(0, parseFloat(String(val || "").replace(",", ".")) || 0);
    setPlayer(function (previa) {
      var partida = clonar(previa);
      (partida.gymWeights || (partida.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        serie === 0
          ? (partida.gymWeights[grupo] = num)
          : (partida.gymSerieKg || (partida.gymSerieKg = {}),
            partida.gymSerieKg[grupo] || (partida.gymSerieKg[grupo] = {}),
            (partida.gymSerieKg[grupo][serie] = num)));
      if (partida.today) {
        var clave = sdcMarcaK(modalidad, modo);
        (partida.today.marcas || (partida.today.marcas = {}),
          partida.today.marcas[clave] || (partida.today.marcas[clave] = {}),
          partida.today.marcas[clave].kg || (partida.today.marcas[clave].kg = {}),
          partida.today.marcas[clave].kg[grupo] || (partida.today.marcas[clave].kg[grupo] = {}),
          (partida.today.marcas[clave].kg[grupo][serie] = val));
      }
      return partida;
    });
  }
  function sdcEjNom(grupo) {
    var ej = ejercicioDe(grupo, progress.rank, modalidad);
    return (ej && ej.name) || "";
  }
  function sdcKgUsar(grupo, kg) {
    var nSeries = sdcNSets(metaSesion[grupo] || 0),
      serie;
    for (serie = 0; serie < nSeries; serie++) sdcKgSet(grupo, serie, sdcKgTxt(kg));
  }
  function sdcGymVol() {
    var lista = ["squat", "pushup", "back", "abs"],
      vols = {},
      i,
      grupo,
      nSeries,
      hechas,
      vol,
      maximo,
      serie,
      kg,
      reps,
      kgs;
    for (i = 0; i < 4; i++) {
      grupo = lista[i];
      nSeries = sdcNSets(metaSesion[grupo] || 0);
      hechas = Math.min(sdcSer[grupo] || 0, nSeries);
      vol = 0;
      maximo = 0;
      kgs = [];
      for (serie = 0; serie < nSeries; serie++) {
        kg = sdcKgNum(grupo, serie);
        kgs.push(kg);
        if (serie < hechas) {
          reps = sdcRepsSerie(grupo, serie) || 0;
          vol += kg * reps;
          if (kg > maximo) maximo = kg;
        }
      }
      vols[grupo] = { vol: Math.round(vol), max: maximo, kgs, nom: sdcEjNom(grupo) };
    }
    return vols;
  }
  function registrar() {
    let hechas = sdcRepsHechas(),
      gvol = modalidad === "gym" ? sdcGymVol() : null;
    (sdcCelebra(),
      aplicar((partida) =>
        sdcDeshacerHook(
          partida,
          sdcMetaHook(
            sdcPrimerasHook(registrarRutina(partida, modo, hechas, sdcModOk, gvol), hechas),
            metaDia,
          ),
        ),
      ));
  }
  function tomarDescanso() {
    setPlayer((previa) => {
      let { state: partida, notices: nuevos } = usarDescanso(previa);
      return (nuevos && nuevos.length && avisar((previos) => [...previos, ...nuevos]), partida);
    });
  }
  function cruzarUmbral() {
    setPlayer((previa) => {
      let { state: partida, notices: nuevos } = sdcCruzar(previa);
      return (nuevos && nuevos.length && avisar((previos) => [...previos, ...nuevos]), partida);
    });
  }
  function elegirModalidad(mod) {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.today.modality = mod), partida);
    });
  }
  function irTienda() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        partida.ui || (partida.ui = { collapsed: {} }),
        (partida.ui.collapsed.tienda = !partida.ui.collapsed.tienda),
        partida
      );
    });
  }
  function mmNueva(mod) {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        (partida.today.modality = mod),
        (partida.today.completed = !1),
        (partida.today.mode = "pending"),
        (partida.today.fullCompletion = !1),
        (partida.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        delete partida.undoSnapshot,
        partida
      );
    }),
      avisar((previos) => [
        ...previos,
        `Nueva sesión: ${(modalidades.find((opcion) => opcion.id === mod) || modalidades[0]).name}. Al completarla ganás un bono por combinar estilos.`,
      ]));
  }
  function sdcPonerJuego(mod) {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.profile.tituloSet = mod), partida);
    });
  }
  function sdcCamRitmo(kmh) {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.profile.ritmoKmH = kmh), partida);
    });
  }
  function sdcCamEmpezar() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        (partida.exploration = partida.exploration || {}),
        (partida.exploration.walkStart = Date.now()),
        partida
      );
    });
  }
  function sdcCamCancelar() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (partida.exploration && (partida.exploration.walkStart = 0), partida);
    });
  }
  function sdcCamListo(km) {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return (partida.exploration && (partida.exploration.walkStart = 0), partida);
    }),
      setKmTexto(String(km).replace(".", ",")),
      avisar((previos) => [
        ...previos,
        "Salida terminada. Puse " +
          String(km).replace(".", ",") +
          " km en el campo: corregilo si hace falta y tocá + Tramo.",
      ]));
  }
  function sdcTravEmpezar() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        (partida.dungeon = partida.dungeon || {}),
        (partida.dungeon.startedAt = Date.now() + 1e4),
        partida
      );
    });
  }
  function sdcTravCancelar() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (partida.dungeon && (partida.dungeon.startedAt = 0), partida);
    });
  }
  function sdcPrimeraManual(texto) {
    if (!texto || !String(texto).trim()) return;
    var limpio = String(texto).trim().slice(0, 120);
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return (sdcPrimeraAdd(partida, limpio, "escrita"), partida);
    }),
      avisar((previos) => [...previos, "Primera vez: " + limpio + ". Queda anotado."]));
  }
  function sdcResponderPodia(nombre, podia) {
    setPlayer((previa) => {
      let partida = clonar(previa),
        copia = {},
        clave,
        src = sdcPodia(partida);
      for (clave in src) copia[clave] = src[clave];
      return ((copia[nombre] = podia), (partida.podia = copia), partida);
    });
  }
  function ponerModalidades(mods) {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.profile.modalities = mods.length ? mods : ["bodyweight"]), partida);
    });
  }
  function alternarModalidad(mod) {
    let activas = modalidadesDe(profile),
      nuevas = activas.includes(mod) ? activas.filter((otra) => otra !== mod) : [...activas, mod];
    if (!nuevas.length) {
      avisar((previos) => [...previos, "Debes mantener al menos un método activo."]);
      return;
    }
    ponerModalidades(nuevas);
  }
  function deshacerRegistro() {
    (setConfirmarDeshacer(!1),
      aplicar((partida) => sdcDeshacer(partida)),
      setMetaSesion({ ...metaDia }));
  }
  function ponerPesoCorporal(texto) {
    let peso = Math.max(0, parseFloat((texto || "0").replace(",", ".")) || 0);
    setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.profile.bodyWeight = peso), partida);
    });
  }
  function alternarDesbloqueo() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        (partida.unlockAll = !partida.unlockAll),
        partida.unlockAll && (partida.seenUnlocks = sistemas.map((sis) => sis.id)),
        partida
      );
    });
  }
  function alternarSistema(id) {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        partida.disabled || (partida.disabled = []),
        (partida.disabled = partida.disabled.includes(id)
          ? partida.disabled.filter((otro) => otro !== id)
          : [...partida.disabled, id]),
        partida
      );
    });
  }
  function ponerMetaSemanal(dias) {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.profile.weeklyGoal = dias), partida);
    }),
      setCambiandoMeta(!1));
  }
  let plegablesTodos = [
      "calentamiento",
      "racha",
      "mapa",
      "primeras",
      "rutina",
      "stretch",
      "mapaSector",
      "codice",
      "metodos",
      "numeros",
      "aptitud",
      "respaldo",
      "primalLista",
      ...categoriasLogros.map((cat) => "ach-" + cat),
    ],
    todoPlegado = plegablesTodos.every((id) => ui && ui.collapsed && ui.collapsed[id]);
  function alternarTodo() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      (partida.skills || (partida.skills = {}),
        partida.care || (partida.care = { today: { date: fechaHoy(), done: [] }, lifetime: 0 }),
        partida.neuro || (partida.neuro = neuroInicial()),
        partida.unlockAll === void 0 && (partida.unlockAll = !1),
        partida.disabled || (partida.disabled = []),
        partida.seenUnlocks ||
          (partida.seenUnlocks = sistemas
            .filter((sis) => sistemaAbierto(partida, sis.id))
            .map((sis) => sis.id)),
        partida.ui || (partida.ui = { collapsed: {} }));
      let plegar = !todoPlegado;
      return (
        plegablesTodos.forEach((id) => {
          partida.ui.collapsed[id] = plegar;
        }),
        partida
      );
    });
  }
  function alternarPlegable(id, act) {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        partida.skills || (partida.skills = {}),
        partida.care || (partida.care = { today: { date: fechaHoy(), done: [] }, lifetime: 0 }),
        partida.neuro || (partida.neuro = neuroInicial()),
        partida.unlockAll === void 0 && (partida.unlockAll = !1),
        partida.disabled || (partida.disabled = []),
        partida.seenUnlocks ||
          (partida.seenUnlocks = sistemas
            .filter((sis) => sistemaAbierto(partida, sis.id))
            .map((sis) => sis.id)),
        partida.ui || (partida.ui = { collapsed: {} }),
        (partida.ui.collapsed[id] = act !== void 0 ? !act : !partida.ui.collapsed[id]),
        partida
      );
    });
  }
  let plegado = (id) => !!(ui && ui.collapsed && ui.collapsed[id]);
  useEffect(() => {
    let sistema = {
      combat: "combat",
      primal: "primal",
      exploration: "exploration",
      achievements: "achievements",
    }[pestana];
    sistema && !sistemaActivo(player, sistema) && setPestana("training");
  }, [pestana, progress.level, progress.rank, player.unlockAll]);
  function cerrarResumenSemana() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (partida.lastWeekSummary && (partida.lastWeekSummary.seen = !0), partida);
    });
  }
  function comprarItem(id) {
    aplicar((partida) => comprar(partida, id));
  }
  function terminarTravesia() {
    setPlayer((previa) => {
      let { state: partida, notices: nuevos } = completarTravesia(previa);
      return (nuevos && nuevos.length && avisar((previos) => [...previos, ...nuevos]), partida);
    });
  }
  function cerrarAviso(indice) {
    avisar((previos) => previos.filter((aviso, i) => i !== indice));
  }
  function reiniciarTodo() {
    ((async () => {
      try {
        let db = await window.claude.use("db");
        db && (await db.doc("player/state").delete());
      } catch (err) {
        console.error("No se pudo borrar el progreso", err);
      }
    })(),
      setPlayer(null));
  }
  useEffect(() => {
    (async () => setHayPuntoRetorno(!!(await leerPuntoRetorno())))();
  }, []);
  function guardarPuntoRetorno() {
    (async () => {
      let ok = await escribirPuntoRetorno(player);
      (setHayPuntoRetorno(ok),
        avisar((previos) => [
          ...previos,
          ok
            ? "Punto de retorno guardado. Ya podés probar sin miedo."
            : "No se pudo guardar el punto de retorno.",
        ]));
    })();
  }
  function volverPuntoRetorno() {
    (async () => {
      let guardada = await leerPuntoRetorno();
      if (!guardada) {
        avisar((previos) => [...previos, "No hay ningún punto de retorno guardado."]);
        return;
      }
      let { state: partida, notices: nuevos } = cargarPartida(guardada);
      (setPlayer(partida),
        setCombPrep(!1),
        setCombVentana(!1),
        setPrimalFase("idle"),
        avisar(["Volviste a tu progreso guardado.", ...(nuevos || [])]));
    })();
  }
  function saltarRango(rango) {
    (setPlayer((previa) => {
      let partida = clonar(previa),
        indice = rangos.indexOf(rango);
      return (
        (partida.progress.rank = rango),
        (partida.progress.level = indice === 0 ? 1 : nivelUmbral[rangos[indice - 1]]),
        (partida.progress.currentXP = 0),
        (partida.ascension.pending = !1),
        (partida.today.rank = rango),
        (partida.today.completed = !1),
        (partida.today.fullCompletion = !1),
        (partida.today.mode = "pending"),
        (partida.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        partida
      );
    }),
      avisar((previos) => [
        ...previos,
        `[Prueba] Saltaste al rango ${rango} para ver sus ejercicios.`,
      ]));
  }
  function forzarUmbral() {
    (setPlayer((previa) => {
      let partida = clonar(previa),
        nivel = nivelUmbral[partida.progress.rank];
      return (
        nivel && ((partida.progress.level = nivel), (partida.ascension.pending = !0)),
        (partida.umbralForzado = partida.progress.rank),
        (partida.today.completed = !0),
        (partida.today.fullCompletion = !0),
        (partida.today.rank = partida.progress.rank),
        partida
      );
    }),
      avisar((previos) => [
        ...previos,
        "[Prueba] Umbral forzado disponible y día marcado como completo al 100%.",
      ]));
  }
  function sumarXp(xp) {
    setPlayer((previa) => {
      let partida = clonar(previa);
      partida.progress.currentXP += xp;
      let nuevos = [];
      return (
        (partida = subirNiveles(partida, nuevos)),
        nuevos.length && avisar((previos) => [...previos, ...nuevos]),
        partida
      );
    });
  }
  function fallarAyer() {
    setPlayer((previa) => {
      let partida = clonar(previa),
        fecha = new Date(partida.today.date + "T00:00:00");
      (fecha.setDate(fecha.getDate() - 1),
        (partida.today.date = fechaLocal(fecha)),
        (partida.today.completed = !1));
      let { state: cargada, notices: nuevos } = cargarPartida(partida);
      return (nuevos.length && avisar((previos) => [...previos, ...nuevos]), cargada);
    });
  }
  function reiniciarHoy() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        (partida.today.completed = !1),
        (partida.today.fullCompletion = !1),
        (partida.today.mode = "pending"),
        (partida.today.rank = partida.progress.rank),
        (partida.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        (partida.today.stretchDone = !1),
        partida
      );
    });
  }
  function sumarKm() {
    let distancia = Math.max(0, parseFloat((kmTexto || "0").replace(",", ".")) || 0);
    distancia &&
      (setPlayer((previa) => {
        let { state: partida } = sumarTramo(previa, distancia);
        return partida;
      }),
      setKmTexto(""));
  }
  function sumarPasos() {
    let pasos = Math.max(0, parseInt((pasosTexto || "0").replace(/\D/g, ""), 10) || 0);
    if (!pasos) return;
    let distancia = Math.round(((pasos * metrosPorPaso) / 1e3) * 100) / 100;
    distancia <= 0 ||
      (setPlayer((previa) => {
        let { state: partida } = sumarTramo(previa, distancia);
        return partida;
      }),
      setPasosTexto(""));
  }
  function descartarTramosHoy() {
    setPlayer((previa) => {
      let { state: partida, notices: nuevos } = descartarTramos(previa);
      return (nuevos && nuevos.length && avisar((previos) => [...previos, ...nuevos]), partida);
    });
  }
  function consolidarKmHoy() {
    setPlayer((previa) => {
      let { state: partida, notices: nuevos, found: hallados } = consolidarKm(previa);
      return (
        nuevos && nuevos.length && avisar((previos) => [...previos, ...nuevos]),
        hallados && hallados.length && setHallazgos(hallados),
        partida
      );
    });
  }
  function sumarKmDePrueba(distancia) {
    setPlayer((previa) => {
      let conTramo = sumarTramo(previa, distancia),
        { state: partida, notices: nuevos, found: hallados } = consolidarKm(conTramo.state);
      return (
        nuevos && nuevos.length && avisar((previos) => [...previos, ...nuevos]),
        hallados && hallados.length && setHallazgos(hallados),
        partida
      );
    });
  }
  function forzarTravesia() {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        (partida.dungeon = { date: partida.today.date, ...travesiaDelDia(partida.progress.rank) }),
        partida.dungeon.available ||
          (partida.dungeon = {
            date: partida.today.date,
            available: !0,
            completed: !1,
            name: sdcPortales[0].n,
            challengeText: sdcPortales[0].c,
            rewardXP: xpTravesia[partida.progress.rank],
          }),
        partida
      );
    }),
      avisar((previos) => [...previos, "[Prueba] Travesía forzada disponible."]));
  }
  function ponerRacha(dias) {
    setPlayer((previa) => {
      let partida = clonar(previa);
      ((partida.streak.current = dias),
        (partida.streak.best = Math.max(partida.streak.best || 0, dias)));
      let revisado = revisarLogros(partida);
      return (
        revisado.notices.length && avisar((previos) => [...previos, ...revisado.notices]),
        revisado.state
      );
    });
  }
  function desbloquearLogros() {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.achievements = logros.map((logro) => logro.id)), partida);
    }),
      avisar((previos) => [...previos, "[Prueba] Todos los logros desbloqueados."]));
  }
  function saltarAlJefe() {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return (
        (partida.combat.villainIndex = 4),
        (partida.combat.lastExercise = null),
        (partida.combat.exercise = null),
        (partida.combat.lives = 3),
        (partida.combat.loadFactor = 1),
        (partida.combat.damageFactor = 1),
        (partida.combat.bossCats = trenesJefe(null)),
        (partida.combat.villainCurrentHP = golpesNecesarios(terreno(4))),
        (partida.combat.phase = "resting"),
        (partida.combat.roundId = (partida.combat.roundId || 0) + 1),
        partida
      );
    }),
      setCombPrep(!1),
      setCombVentana(!1),
      avisar((previos) => [...previos, `[Prueba] Saltaste al primer Jefe (${terreno(4).name}).`]));
  }
  function reiniciarCombate() {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.combat = combateInicial()), partida);
    }),
      setCombPrep(!1),
      setCombVentana(!1),
      avisar((previos) => [...previos, "[Prueba] Combate reiniciado desde el primer enemigo."]));
  }
  function desbloquearPrimal() {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      partida.primal.unlockedCount < movimientosPrimal.length &&
        ((partida.primal.unlockedCount += 1), (partida.primal.masteryProgress = 0));
      let revisado = revisarLogros(partida);
      return (
        revisado.notices.length && avisar((previos) => [...previos, ...revisado.notices]),
        revisado.state
      );
    }),
      avisar((previos) => [
        ...previos,
        "[Prueba] Desbloqueado el siguiente movimiento de Instinto Primal.",
      ]));
  }
  function reiniciarContadorPrimal() {
    (setPlayer((previa) => {
      let partida = clonar(previa);
      return ((partida.primal.today = { date: fechaHoy(), count: 0 }), partida);
    }),
      avisar((previos) => [...previos, "[Prueba] Contador diario de Instinto Primal reiniciado."]));
  }
  function forzarAvisoCarga() {
    setPlayer((previa) => {
      let partida = clonar(previa);
      partida.primal.today = { date: fechaHoy(), count: 8 };
      let aviso = avisoCarga(partida);
      return (
        aviso.notices.length
          ? avisar((previos) => [...previos, ...aviso.notices])
          : avisar((previos) => [
              ...previos,
              '[Prueba] Ya se mostró el aviso hoy, usa "reiniciar contador diario" primero.',
            ]),
        aviso.state
      );
    });
  }
  return (
    <div className="min-h-screen px-4 py-6" style={{ background: "#0a0e1a" }}>
      <div className="mx-auto" style={{ maxWidth: 420 }}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase" style={{ letterSpacing: 2, color: "#4f9dff" }}>
              Dominio Corporal
            </div>
            <div className="text-sm" style={{ color: "#9aa4bd" }}>
              Bienvenido de vuelta, {profile.name}
            </div>
            {(() => {
              let calibre = sdcCalibre(profile);
              return calibre ? (
                <div
                  className="text-xs mt-1"
                  style={{
                    color: "#ffb84f",
                    fontFamily: "Chakra Petch, sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  {calibre}
                </div>
              ) : null;
            })()}
          </div>
          <button
            onClick={irTienda}
            title="Puntos de Dominio"
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 58,
              padding: "7px 10px",
              background: "rgba(124,92,255,0.15)",
              border: "1px solid #7c5cff",
              color: "#b9a5ff",
              fontFamily: "Chakra Petch, sans-serif",
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700 }}>{dominion.points}</span>
            <span style={{ fontSize: 10, letterSpacing: 1 }}>PD</span>
          </button>
        </div>
        <div className="mb-4" style={{ position: "relative" }}>
          <div className="text-xs mb-1 flex items-center justify-between">
            <span
              style={{
                color: colorDelRango,
                fontFamily: "Chakra Petch, sans-serif",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              NV. {progress.level} · {sdcRango(progress.rank, profile)}
            </span>
            <span style={{ color: "#9aa4bd" }}>
              {today.completed ? progress.currentXP : progress.currentXP + sdcTotalHechas()} /{" "}
              {costoDelNivel} XP
            </span>
          </div>
          <BarraXp
            value={today.completed ? progress.currentXP : progress.currentXP + sdcTotalHechas()}
            max={costoDelNivel}
            color={colorDelRango}
          />
          {sdcFlota && sdcFlota.n > 0 && (
            <div
              key={sdcFlota.id}
              className="sdc-pop"
              style={{
                position: "absolute",
                right: 0,
                top: -6,
                pointerEvents: "none",
                color: colorDelRango,
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                textShadow: "0 0 12px " + colorDelRango,
              }}
            >
              +{sdcFlota.n} XP
            </div>
          )}
          <div
            className="text-xs mt-1 flex items-center justify-between gap-2"
            style={{ color: "#7a83a0" }}
          >
            <span>
              {nivelDelUmbral
                ? "Umbral: " + Math.min(progress.level, nivelDelUmbral) + "/" + nivelDelUmbral
                : ""}
            </span>
            {(() => {
              let proximo = sistemas.find((sis) => !sistemaAbierto(player, sis.id));
              return proximo ? (
                <span>
                  Próximo: <b style={{ color: "#9aa4bd" }}>{proximo.name}</b> en Nv. {proximo.level}
                </span>
              ) : null;
            })()}
          </div>
          {streak.flexBuff && (
            <div className="text-xs mt-1" style={{ color: "#ffb84f" }}>
              Buff de Flexibilidad activo (+10% XP)
            </div>
          )}
        </div>
        {hallazgos.length > 0 && (
          <Tarjeta accent="#ffb84f" style={{ marginBottom: 16 }}>
            <div className="text-xs uppercase mb-1" style={{ letterSpacing: 2, color: "#ffb84f" }}>
              Hallazgo
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                color: "#e8ecf7",
                fontWeight: 700,
              }}
            >
              {hallazgos[0].name}
            </div>
            <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
              {hallazgos[0].text}
            </div>
            <div
              className="mt-3 p-3"
              style={{
                background: "rgba(255,184,79,0.08)",
                border: "1px solid rgba(255,184,79,0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <IconoDestello size={14} color="#ffb84f" />
                <div className="text-sm" style={{ color: "#ffb84f", fontWeight: 700 }}>
                  {hallazgos[0].relic}
                </div>
              </div>
              <div className="text-xs" style={{ color: "#e8ecf7" }}>
                {hallazgos[0].lore}
              </div>
            </div>
            <button
              onClick={() => setHallazgos((previo) => previo.slice(1))}
              className="w-full py-3 text-sm mt-3"
              style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
            >
              {hallazgos.length > 1
                ? `Siguiente hallazgo (${hallazgos.length - 1} más)`
                : "Archivar en el Códice"}
            </button>
          </Tarjeta>
        )}
        <Avisos notices={avisos} onDismiss={cerrarAviso} onDismissAll={() => avisar([])} />
        <Tarjeta accent="#ffb84f" style={{ marginBottom: 16 }}>
          <div className="w-full flex items-center mb-2" style={{ justifyContent: "flex-end" }}>
            <button
              onClick={() => alternarPlegable("ayuda")}
              style={{
                cursor: "pointer",
                background: "transparent",
                color: "#4f9dff",
                border: "1px solid #4f9dff",
                height: 44,
                padding: "0 14px",
                fontWeight: 700,
                lineHeight: 1,
                fontSize: 13,
              }}
            >
              ¿Cómo funciona?
            </button>
          </div>
          <div className="flex items-center gap-3">
            <DibujoMascota
              type={profile.pet ? profile.pet.type : "dog"}
              size={48}
              color={colorDeRango(progress.rank)}
              rank={progress.rank}
            />
            <div>
              <div
                style={{
                  fontFamily: "Chakra Petch, sans-serif",
                  color: "#e8ecf7",
                  fontWeight: 700,
                }}
              >
                {profile.pet && profile.pet.name ? profile.pet.name : "Tu compañero"}
              </div>
              <div className="text-xs" style={{ color: "#9aa4bd" }}>
                {fraseMascota}
              </div>
            </div>
          </div>
          <button
            onClick={() => setFraseMascota(consejos[Math.floor(Math.random() * consejos.length)])}
            className="text-xs underline"
            style={{
              color: "#ffb84f",
              display: "inline-block",
              padding: "15px 8px",
              margin: "-7px -8px -15px -8px",
            }}
          >
            Otro consejo
          </button>
        </Tarjeta>
        {ui && ui.collapsed && ui.collapsed.ayuda && (
          <Plegable
            id="ayuda"
            title="¿Cómo funciona?"
            accent="#8a93ad"
            style={{ marginBottom: 16 }}
            collapsed={!1}
            onToggle={alternarPlegable}
            right={`${guia.length} temas`}
          >
            <div style={{ fontSize: 14, lineHeight: 1.5, color: "#9aa4bd" }}>
              Tocá cualquier tema para leerlo. Si recién empezás, los tres primeros son los que
              importan.
            </div>
            {(() => {
              let sdcGv = "";
              return guia.map((tema) => {
                let sdcAb = !!sdcTema[tema.title],
                  sdcNu = tema.g !== sdcGv;
                sdcGv = tema.g;
                return (
                  <div key={tema.title}>
                    {sdcNu ? (
                      <div
                        className="text-xs uppercase"
                        style={{
                          letterSpacing: 2,
                          color: "#7a83a0",
                          marginTop: 16,
                          marginBottom: 2,
                          paddingTop: 12,
                          borderTop: "1px solid rgba(255,255,255,0.14)",
                        }}
                      >
                        {tema.g}
                      </div>
                    ) : null}
                    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <button
                        onClick={() =>
                          sdcSetTema((previo) => ({ ...previo, [tema.title]: !previo[tema.title] }))
                        }
                        className="w-full flex items-center justify-between text-left"
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: "14px 0",
                          color: "inherit",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 16,
                            lineHeight: 1.3,
                            color: sdcAb ? "#e8ecf7" : "#b6c0d8",
                            fontWeight: 600,
                          }}
                        >
                          {tema.title}
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            flexShrink: 0,
                            transform: sdcAb ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform .2s",
                          }}
                        >
                          <IconoFlecha size={16} color="#7a83a0" />
                        </span>
                      </button>
                      {sdcAb ? (
                        <div
                          style={{
                            fontSize: 15,
                            lineHeight: 1.65,
                            color: "#c8d0e4",
                            paddingBottom: 16,
                            paddingRight: 2,
                          }}
                        >
                          {tema.text}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              });
            })()}
          </Plegable>
        )}
        {ui && ui.collapsed && ui.collapsed.tienda && (
          <Plegable
            id="tienda"
            title="Puntos de Dominio"
            accent="#7c5cff"
            style={{ marginBottom: 16 }}
            collapsed={!1}
            onToggle={alternarPlegable}
            right={`${dominion.points} PD`}
          >
            <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
              Ganás 3 puntos el día que completás tu rutina al 100%, o 1 punto si llegás al menos a
              la mitad. Solo cuenta la primera sesión de cada día: los estilos extra dan XP, pero no
              más puntos.
            </div>
            {dominion.shields > 0 && (
              <div className="text-xs mb-2" style={{ color: "#7c5cff" }}>
                Escudos de Racha disponibles: {dominion.shields}
              </div>
            )}
            {dominion.xpBuffDate === fechaHoy() && (
              <div className="text-xs mb-2" style={{ color: "#ffb84f" }}>
                {"Impulso de XP activo hoy (+" +
                  Math.round(((dominion.xpBuffMult || 1.25) - 1) * 100) +
                  "%)."}
              </div>
            )}
            <div className="mt-2">
              {tienda.map((item) => {
                let alcanza = dominion.points >= item.cost;
                return (
                  <div
                    key={item.id}
                    className="py-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div style={{ flex: 1 }}>
                        <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                          {item.name}
                        </div>
                        <div className="text-xs" style={{ color: "#9aa4bd" }}>
                          {item.desc}
                        </div>
                      </div>
                      <button
                        onClick={() => comprarItem(item.id)}
                        disabled={!alcanza}
                        className="py-2 px-3 text-xs disabled:opacity-40"
                        style={{
                          background: alcanza ? "#7c5cff" : "rgba(255,255,255,0.05)",
                          border: "1px solid #7c5cff",
                          color: alcanza ? "#0a0e1a" : "#9aa4bd",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.cost} PD
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Plegable>
        )}
        <div className="flex justify-end mb-2">
          <button
            onClick={alternarTodo}
            className="text-xs"
            style={{ color: "#9aa4bd", padding: "15px 8px", margin: "-15px -8px" }}
          >
            {todoPlegado ? "Expandir todo" : "Minimizar todo"}
          </button>
        </div>
        {(() => {
          let tabs = [
            { id: "training", label: "Entreno", icon: IconoPesa, color: colorDelRango, on: !0 },
            {
              id: "combat",
              label: "Combate",
              icon: IconoEspadas,
              color: "#ff5c7a",
              on: sistemaActivo(player, "combat"),
            },
            {
              id: "primal",
              label: "Primal",
              icon: IconoPata,
              color: "#3ecf8e",
              on: sistemaActivo(player, "primal"),
            },
            {
              id: "exploration",
              label: "Explorar",
              icon: IconoPasos,
              color: "#7c5cff",
              on: sistemaActivo(player, "exploration"),
            },
            {
              id: "achievements",
              label: "Logros",
              icon: IconoTrofeo,
              color: "#ffb84f",
              on: sistemaActivo(player, "achievements"),
            },
            { id: "profile", label: "Perfil", icon: IconoPersona, color: "#4f9dff", on: !0 },
          ].filter((tab) => tab.on);
          return (
            <div className="grid grid-cols-3 gap-1 mb-4">
              {tabs.map((tab) => {
                let IconoTab = tab.icon,
                  activa = pestana === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPestana(tab.id)}
                    className="flex items-center justify-center gap-1 py-2 text-xs"
                    style={{
                      minHeight: 48,
                      background: activa ? tab.color : "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: activa ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    }}
                  >
                    {createElement(IconoTab, { size: 13 })} {tab.label}
                  </button>
                );
              })}
            </div>
          );
        })()}
        {pestana === "training" && (
          <PestanaEntreno
            propsRutina={{
              colorDelRango,
              confirmarDeshacer,
              descansando,
              descansoBase,
              deshacerRegistro,
              elegirModalidad,
              metaDia,
              metronomoOn,
              mmNueva,
              modo,
              registrar,
              sdcAjustar,
              sdcAjuste,
              sdcConfDesc,
              sdcDesc,
              sdcDescIni,
              sdcEjNom,
              sdcKgSet,
              sdcKgUsar,
              sdcKgVer,
              sdcMarcaOk,
              sdcMarcarTodo,
              sdcModOk,
              sdcSer,
              sdcSerie,
              sdcSetConfDesc,
              sdcSetModOk,
              sdcTotalMeta,
              setConfirmarDeshacer,
              setDescansando,
              setMetaSesion,
              setMetronomoOn,
              setPestana,
            }}
            propsCuerpo={{
              atributos,
              coloresMapa,
              grupos,
              lastTrained,
              metaSemanaGrupo,
              modoMapa,
              rangoDeHoy,
              ratiosHoy,
              repsHoy,
              sdcMt,
              setModoMapa,
              setVistaCuerpo,
              setZonaElegida,
              vistaCuerpo,
              zonaElegida,
            }}
            propsEstiramiento={{
              estirando,
              estSegundos,
              sdcEstOk,
              sdcEstPasos,
              sdcEstPz,
              sdcSetEstIdx,
              sdcSetEstIni,
              sdcSetEstOk,
              sdcSetEstPasos,
              sdcSetEstPz,
              setEstirando,
              setEstSegundos,
            }}
            propsConstancia={{
              cambiandoMeta,
              diaElegido,
              diasGrilla,
              ponerMetaSemanal,
              sesionesSemana,
              setCambiandoMeta,
              setDiaElegido,
              streak,
            }}
            propsTravesia={{ sdcTravCancelar, sdcTravEmpezar, terminarTravesia }}
            propsUmbral={{ ascension, cruzarUmbral }}
            alternarPlegable={alternarPlegable}
            aplicar={aplicar}
            avisar={avisar}
            bkDescargar={bkDescargar}
            cerrarResumenSemana={cerrarResumenSemana}
            dungeon={dungeon}
            lastWeekSummary={lastWeekSummary}
            lifetimeReps={lifetimeReps}
            metaSemana={metaSemana}
            metaSesion={metaSesion}
            modalidad={modalidad}
            player={player}
            plegado={plegado}
            profile={profile}
            progress={progress}
            sdcResponderPodia={sdcResponderPodia}
            sdcTotalHechas={sdcTotalHechas}
            setModo={setModo}
            today={today}
            tomarDescanso={tomarDescanso}
            ui={ui}
            week={week}
          />
        )}
        {pestana === "combat" && (
          <PestanaCombate
            aplicar={aplicar}
            combat={combat}
            combCancelar={combCancelar}
            combElegir={combElegir}
            combPrep={combPrep}
            combReintentar={combReintentar}
            combSegundos={combSegundos}
            combSegundosMax={combSegundosMax}
            combSiguiente={combSiguiente}
            combVentana={combVentana}
            modalidad={modalidad}
            profile={profile}
            progress={progress}
            sdcCombChips={sdcCombChips}
            sdcCombSer={sdcCombSer}
            sdcGolpe={sdcGolpe}
            setCombPrep={setCombPrep}
            setCombSegundos={setCombSegundos}
            setCombSegundosMax={setCombSegundosMax}
          />
        )}
        {pestana === "primal" && (
          <PestanaPrimal
            alternarPlegable={alternarPlegable}
            aplicar={aplicar}
            cuidadoAbierto={cuidadoAbierto}
            habilidadAbierta={habilidadAbierta}
            neuroAbierto={neuroAbierto}
            player={player}
            plegado={plegado}
            primal={primal}
            primalCancelar={primalCancelar}
            primalElegir={primalElegir}
            primalFase={primalFase}
            primalHechasHoy={primalHechasHoy}
            primalMov={primalMov}
            primalRonda={primalRonda}
            primalSegundos={primalSegundos}
            primalSesionesHoy={primalSesionesHoy}
            progress={progress}
            sdcPrimalYa={sdcPrimalYa}
            primalPausa={primalPausa}
            primalPausar={primalPausar}
            primalSeguir={primalSeguir}
            seccionPrimal={seccionPrimal}
            setCuidadoAbierto={setCuidadoAbierto}
            setHabilidadAbierta={setHabilidadAbierta}
            setNeuroAbierto={setNeuroAbierto}
            setSeccionPrimal={setSeccionPrimal}
            ui={ui}
          />
        )}
        {pestana === "exploration" && (
          <PestanaExplorar
            alternarPlegable={alternarPlegable}
            consolidarKmHoy={consolidarKmHoy}
            descartarTramosHoy={descartarTramosHoy}
            exploration={exploration}
            kmTexto={kmTexto}
            kmTotales={kmTotales}
            nodoSiguiente={nodoSiguiente}
            pasosTexto={pasosTexto}
            player={player}
            plegado={plegado}
            rangoCaminante={rangoCaminante}
            sdcCamCancelar={sdcCamCancelar}
            sdcCamEmpezar={sdcCamEmpezar}
            sdcCamListo={sdcCamListo}
            sdcCamRitmo={sdcCamRitmo}
            setKmTexto={setKmTexto}
            setPasosTexto={setPasosTexto}
            setVerTodoMapa={setVerTodoMapa}
            sumarKm={sumarKm}
            sumarPasos={sumarPasos}
            ui={ui}
            verTodoMapa={verTodoMapa}
          />
        )}
        {pestana === "achievements" && (
          <PestanaLogros
            achievements={achievements}
            alternarPlegable={alternarPlegable}
            player={player}
            plegado={plegado}
            ui={ui}
          />
        )}
        {pestana === "profile" && (
          <PestanaPerfil
            achievements={achievements}
            alternarDesbloqueo={alternarDesbloqueo}
            alternarModalidad={alternarModalidad}
            alternarPlegable={alternarPlegable}
            alternarSistema={alternarSistema}
            bkCargar={bkCargar}
            bkDescargar={bkDescargar}
            combat={combat}
            confirmarRestaurar={confirmarRestaurar}
            copiarRespaldo={copiarRespaldo}
            dungeonsCleared={dungeonsCleared}
            guardarReprueba={guardarReprueba}
            kmTotales={kmTotales}
            lifetimeReps={lifetimeReps}
            modalidad={modalidad}
            player={player}
            plegado={plegado}
            ponerPesoCorporal={ponerPesoCorporal}
            ponerModalidades={ponerModalidades}
            primal={primal}
            profile={profile}
            progress={progress}
            repAbdominales={repAbdominales}
            repFlexiones={repFlexiones}
            repruebaAbierta={repruebaAbierta}
            repruebaEjercicios={repruebaEjercicios}
            repruebaPaso={repruebaPaso}
            repSentadillas={repSentadillas}
            respaldoTexto={respaldoTexto}
            restaurarRespaldo={restaurarRespaldo}
            sdcPonerJuego={sdcPonerJuego}
            sdcPrimeraManual={sdcPrimeraManual}
            sdcRbk={sdcRbk}
            sdcSetRbk={sdcSetRbk}
            setConfirmarRestaurar={setConfirmarRestaurar}
            setRepAbdominales={setRepAbdominales}
            setRepFlexiones={setRepFlexiones}
            setRepruebaAbierta={setRepruebaAbierta}
            setRepruebaPaso={setRepruebaPaso}
            setRepSentadillas={setRepSentadillas}
            setRespaldoTexto={setRespaldoTexto}
            ui={ui}
          />
        )}
        {pestana === "profile" && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                if (panelPruebas) {
                  (setPanelPruebas(!1), (sdcDevN = 0));
                  return;
                }
                ((sdcDevN += 1), sdcDevN >= 5 && ((sdcDevN = 0), setPanelPruebas(!0)));
              }}
              className="text-xs"
              style={{ color: panelPruebas ? "#9aa4bd" : "#333a4d" }}
            >
              {panelPruebas ? "Ocultar panel de pruebas" : "v1.0"}
            </button>
            <a
              href="./privacidad.html"
              target="_blank"
              rel="noopener"
              className="text-xs underline"
              style={{ color: "#7a83a0", marginLeft: 14 }}
            >
              Privacidad
            </a>
          </div>
        )}
        {panelPruebas && pestana === "profile" && (
          <PanelPruebas
            desbloquearLogros={desbloquearLogros}
            desbloquearPrimal={desbloquearPrimal}
            fallarAyer={fallarAyer}
            forzarAvisoCarga={forzarAvisoCarga}
            forzarTravesia={forzarTravesia}
            forzarUmbral={forzarUmbral}
            guardarPuntoRetorno={guardarPuntoRetorno}
            hayPuntoRetorno={hayPuntoRetorno}
            ponerRacha={ponerRacha}
            progress={progress}
            reiniciarCombate={reiniciarCombate}
            reiniciarContadorPrimal={reiniciarContadorPrimal}
            reiniciarHoy={reiniciarHoy}
            saltarAlJefe={saltarAlJefe}
            saltarRango={saltarRango}
            sumarKmDePrueba={sumarKmDePrueba}
            sumarXp={sumarXp}
            volverPuntoRetorno={volverPuntoRetorno}
          />
        )}
        <div className="text-center mt-4">
          {confirmarReinicio ? (
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              ¿Seguro? Esto borra todo tu progreso.{" "}
              <button
                onClick={reiniciarTodo}
                className="underline"
                style={{ color: "#ff5c7a", display: "inline-block", padding: "15px 12px" }}
              >
                Sí, reiniciar
              </button>{" "}
              <button
                onClick={() => setConfirmarReinicio(!1)}
                className="underline"
                style={{ display: "inline-block", padding: "15px 12px" }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmarReinicio(!0)}
              className="text-xs"
              style={{
                color: "#9aa4bd",
                display: "inline-block",
                padding: "15px 8px",
                margin: "-15px -8px",
              }}
            >
              Reiniciar todo mi progreso
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { sdcDevN, App };
