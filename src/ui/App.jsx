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
import { colorRango, nivelUmbral, vd, rangos } from "../datos/rangos.js";
import { Ed, travesiaDelDia, l2, nodosExplorar, sdcPortales } from "../logica/explorar.js";
import {
  $o,
  Ad,
  N2,
  S2,
  Ws,
  b2,
  dd,
  h2,
  repsCombate,
  m2,
  p2,
  golpesNecesarios,
  repsCombateSuave,
  perderVida,
  za,
} from "../logica/combate.js";
import { A2, E2, movimientosPrimal, cy, ou } from "../logica/primal.js";
import { tienda, comprar, sesionesPrimalHoy } from "../logica/tienda.js";
import { sdcEstPaso, sdcEstTotal } from "../logica/estiramiento.js";
import { O2 } from "../logica/atributos.js";
import { guia } from "../datos/guia.js";
import { Al } from "../datos/salud.js";
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
  guardarPartida,
  clonar,
  registrarEstiramiento,
  cargarPartida,
  descartarTramos,
  consolidarKm,
  registrarRutina,
  m5,
  completarTravesia,
  sdcCruzar,
  usarDescanso,
  xy,
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
import { sdcBeep, sdcNSets, sdcSplit, sdcVib } from "../logica/series.js";
import { colorProgreso } from "./cuerpo.jsx";
import { diasConstancia } from "./constancia.jsx";
import { DibujoMascota, Plegable, k5 } from "./tarjetas.jsx";
import { sdcRespaldoOk } from "../logica/respaldo.js";
import { sdcWakeSi } from "./pantalla.js";
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
  function avisar(x) {
    queueMicrotask(() => sdcSetAvisos(x));
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
    [combTexto, setCombTexto] = useState(""),
    [primalMov, setPrimalMov] = useState(null),
    [primalRonda, setPrimalRonda] = useState(1),
    [primalFase, setPrimalFase] = useState("idle"),
    [primalSegundos, setPrimalSegundos] = useState(0),
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
    [fraseMascota, setFraseMascota] = useState(() => A2(fechaHoy())),
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
    atributos = O2(player),
    nivelMaxAtributo = Math.max(10, ...grupos.map((f) => atributos.levels[f])),
    metaSemanaGrupo = (f) => Math.max(1, (metaDia[f] || 1) * metaSemana),
    ratioMapa = (f) =>
      modoMapa === "hoy"
        ? (repsHoy[f] || 0) / (sdcMt[f] || 1)
        : modoMapa === "semana"
          ? ((week.reps && week.reps[f]) || 0) / metaSemanaGrupo(f)
          : atributos.levels[f] / nivelMaxAtributo,
    coloresMapa = {
      squat: colorProgreso(ratioMapa("squat")),
      pushup: colorProgreso(ratioMapa("pushup")),
      back: colorProgreso(ratioMapa("back")),
      abs: colorProgreso(ratioMapa("abs")),
    },
    kmTotales = exploration.lifetimeKm || 0,
    rangoCaminante = l2(kmTotales),
    nodoActual = exploration.unlockedIndex >= 0 ? nodosExplorar[exploration.unlockedIndex] : null,
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
    ),
    derrotadosHoy =
      combat.todayDefeated && combat.todayDefeated.date === fechaHoy()
        ? combat.todayDefeated.count
        : 0;
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
        var mk = sdcMarca(player, sdcMarcaK(modalidad, modo));
        mk && !today.completed && !(today.doneModalities || []).includes(modalidad)
          ? (sdcSetSer(mk.ser || { squat: 0, pushup: 0, back: 0, abs: 0 }),
            sdcSetAjuste(mk.aj || {}),
            sdcSetModOk(!!mk.mok),
            sdcSetKgS(mk.kg || {}))
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
      let ep = avisos.find((t) => sdcTier(t) === "epic");
      if (!ep) {
        sdcUltEpic && sdcSetUltEpic("");
        return;
      }
      if (ep === sdcUltEpic) return;
      (sdcSetUltEpic(ep),
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
      let f = setTimeout(() => sdcSetFlota(null), 1200);
      return () => clearTimeout(f);
    }, [sdcFlota]),
    useEffect(() => {
      if (!estirando) return;
      let f = setInterval(
        () => setEstSegundos(Math.floor(((sdcEstPz || Date.now()) - sdcEstIni) / 1e3)),
        300,
      );
      return () => clearInterval(f);
    }, [estirando, sdcEstIni, sdcEstPz]),
    useEffect(() => {
      if (!estirando) return;
      let tt = sdcEstTotal(sdcEstPasos);
      if (estSegundos >= tt) {
        (setEstirando(!1),
          sdcBeep(880, 200),
          setTimeout(() => sdcBeep(1175, 340), 210),
          sdcVib([40, 60, 140]),
          aplicar((d) =>
            sdcPasosHook(
              registrarEstiramiento(d, sdcEstPasos.length, sdcEstPasos.length),
              sdcEstPasos,
              sdcEstPasos.length,
            ),
          ),
          avisar((d) => [...d, "Rutina de estiramiento completada."]));
        return;
      }
      let p = sdcEstPaso(sdcEstPasos, estSegundos),
        fs = p.index * 2 + (p.prep > 0 ? 0 : 1);
      p.prep > 0 &&
        !sdcEstPz &&
        sdcEstOk < p.index &&
        sdcPasoEspera(sdcEstPasos, p.index, sdcPasosV(player)) &&
        sdcSetEstPz(sdcEstIni + sdcEstDesde(sdcEstPasos, p.index) * 1e3);
      fs > sdcEstIdx &&
        (sdcSetEstIdx(fs),
        p.prep > 0 ? (sdcBeep(520, 120), sdcVib(18)) : (sdcBeep(760, 140), sdcVib(22)));
    }, [estirando, estSegundos]),
    useEffect(() => {
      if (pestana !== "combat") {
        (setCombPrep(!1), setCombVentana(!1));
        return;
      }
      if (combat.phase === "resting") {
        let d = za(combat.villainIndex).isBoss ? 20 : 12;
        (setCombSegundosMax(d), setCombSegundos(d), setCombPrep(!1), setCombVentana(!1));
      }
    }, [combat.roundId, pestana]),
    useEffect(() => {
      if (!combPrep) return;
      if (combSegundos <= 0) {
        setCombPrep(!1);
        let d = za(combat.villainIndex),
          m = d.isBoss
            ? repsCombateSuave(
                progress.rank,
                profile.classification,
                profile.focusProfile,
                (combat.bossCats || $o(combat.lastExercise))[0],
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
          N = d.isBoss ? p2() : m2(m);
        (setCombSegundosMax(N), setCombSegundos(N), setCombTexto(""), setCombVentana(!0));
        return;
      }
      let f = setTimeout(() => setCombSegundos((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [combPrep, combSegundos]),
    useEffect(() => {
      if (!combVentana) return;
      if (combSegundos <= 0) {
        (setCombVentana(!1), aplicar((d) => perderVida(d)));
        return;
      }
      let f = setTimeout(() => setCombSegundos((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [combVentana, combSegundos]),
    useEffect(() => {
      if (primalFase !== "active") return;
      if (primalSegundos <= 0) {
        (sdcBeep(520, 160), sdcVib(18));
        if (primalRonda < dd) (setPrimalFase("resting"), setPrimalSegundos(cy));
        else {
          let d = primalMov;
          (setPrimalFase("idle"), setPrimalMov(null), setPrimalRonda(1), aplicar((m) => E2(m, d)));
        }
        return;
      }
      let f = setTimeout(() => setPrimalSegundos((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [primalFase, primalSegundos]),
    useEffect(() => {
      if (primalFase !== "resting") return;
      if (primalSegundos <= 0) {
        (sdcBeep(760, 160),
          sdcVib(22),
          setPrimalRonda((d) => d + 1),
          setPrimalFase("active"),
          setPrimalSegundos(Ws(progress.rank)));
        return;
      }
      let f = setTimeout(() => setPrimalSegundos((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [primalFase, primalSegundos]),
    sdcWakeSi(
      !!combPrep ||
        !!combVentana ||
        !!estirando ||
        primalFase === "active" ||
        primalFase === "resting",
    ));
  function primalElegir(f) {
    (setPrimalMov(f), setPrimalRonda(0), setPrimalFase("listo"));
  }
  function sdcPrimalYa() {
    (sdcBeep(660, 100),
      sdcVib(22),
      setPrimalRonda(0),
      setPrimalSegundos(10),
      setPrimalFase("resting"));
  }
  function primalCancelar() {
    (setPrimalFase("idle"), setPrimalMov(null), setPrimalRonda(1));
  }
  function guardarReprueba() {
    let f = Math.max(0, parseInt(repSentadillas || "0", 10)),
      d = Math.max(0, parseInt(repFlexiones || "0", 10)),
      m = Math.max(0, parseInt(repAbdominales || "0", 10)),
      bq = Math.max(0, parseInt(sdcRbk || "0", 10));
    (aplicar((N) => guardarPrueba(N, f, d, m, bq, 5)),
      setRepruebaAbierta(!1),
      setRepSentadillas(""),
      setRepFlexiones(""),
      setRepAbdominales(""),
      sdcSetRbk(""));
  }
  function bkDescargar() {
    try {
      let t = JSON.stringify(player),
        bl = new Blob([t], { type: "application/json" }),
        u2 = URL.createObjectURL(bl),
        el = document.createElement("a");
      ((el.href = u2),
        (el.download = "dominio-corporal-" + fechaHoy() + ".json"),
        document.body.appendChild(el),
        el.click(),
        document.body.removeChild(el),
        setTimeout(() => URL.revokeObjectURL(u2), 1e3),
        sdcRespaldoOk(),
        avisar((d) => [...d, "Respaldo descargado como archivo."]));
    } catch (x) {
      avisar((d) => [...d, "No se pudo descargar el archivo."]);
    }
  }
  function bkCargar(ev) {
    let f = ev.target.files && ev.target.files[0];
    if (!f) return;
    let r = new FileReader();
    ((r.onload = () => {
      (setRespaldoTexto(String(r.result || "")),
        avisar((d) => [...d, "Archivo cargado. Tocá Restaurar para aplicarlo."]));
    }),
      (r.onerror = () => avisar((d) => [...d, "No se pudo leer el archivo."])),
      r.readAsText(f),
      (ev.target.value = ""));
  }
  function copiarRespaldo() {
    let f = JSON.stringify(player);
    navigator.clipboard && navigator.clipboard.writeText
      ? navigator.clipboard
          .writeText(f)
          .then(() => (sdcRespaldoOk(), avisar((d) => [...d, "Respaldo copiado al portapapeles."])))
          .catch(() =>
            avisar((d) => [
              ...d,
              "No se pudo copiar automáticamente. Tocá el cuadro de texto y selecciona todo para copiarlo a mano.",
            ]),
          )
      : avisar((d) => [...d, "Tocá el cuadro de texto y selecciona todo para copiarlo a mano."]);
  }
  function restaurarRespaldo() {
    try {
      let f = JSON.parse(respaldoTexto.trim());
      if (!f || !f.profile || !f.progress) throw new Error("formato inválido");
      let { state: d } = cargarPartida(f);
      (setPlayer(d), guardarPartida(d), avisar(["¡Progreso restaurado desde el respaldo!"]));
    } catch (f) {
      avisar((d) => [
        ...d,
        "Ese respaldo no es válido. Revisá que copiaste todo el texto completo.",
      ]);
    }
    (setRespaldoTexto(""), setConfirmarRestaurar(!1));
  }
  function aplicar(f) {
    setPlayer((d) => {
      let { state: m, notices: N } = f(d);
      return (N && N.length && avisar((_) => [..._, ...N]), guardarPartida(m), m);
    });
  }
  function combElegir(f) {
    aplicar((d) => b2(d, f));
  }
  function combGolpeTexto() {
    combTexto.trim().toLowerCase() === "hecho" &&
      (setCombVentana(!1), aplicar((f) => h2(f)), setCombTexto(""));
  }
  function combCancelar() {
    (setCombVentana(!1), setCombTexto(""), sdcSetCombSer({}));
    let d = za(combat.villainIndex).isBoss ? 20 : 12;
    (setCombSegundosMax(d), setCombSegundos(d), setCombPrep(!1));
  }
  function combSiguiente() {
    aplicar((f) => S2(f));
  }
  function combReintentar() {
    aplicar((f) => N2(f));
  }
  function sdcRepsSerie(g, k) {
    let t = metaSesion[g] || 0,
      pl = sdcSplit(t, sdcNSets(t)),
      aj = sdcAjuste[g] || {};
    return aj[k] !== void 0 ? aj[k] : pl[k] || 0;
  }
  function sdcRepsHechas() {
    let g = ["squat", "pushup", "back", "abs"],
      o = {};
    for (let k of g) {
      let d = sdcSer[k] || 0,
        s = 0;
      for (let j = 0; j < d; j++) s += sdcRepsSerie(k, j);
      o[k] = s;
    }
    return o;
  }
  function sdcTotalHechas() {
    let h = sdcRepsHechas();
    return h.squat + h.pushup + h.back + h.abs;
  }
  function sdcTotalMeta() {
    return (
      (metaSesion.squat || 0) +
      (metaSesion.pushup || 0) +
      (metaSesion.back || 0) +
      (metaSesion.abs || 0)
    );
  }
  function sdcAjustar(g, k, v) {
    let nx = { ...sdcAjuste, [g]: { ...(sdcAjuste[g] || {}), [k]: Math.max(0, v) } };
    (sdcSetAjuste(nx), sdcMarcaOk(sdcSer, nx, sdcModOk), sdcVib(6));
  }
  function sdcCelebra() {
    (sdcBeep(523, 120),
      setTimeout(() => sdcBeep(659, 120), 120),
      setTimeout(() => sdcBeep(784, 240), 240),
      sdcVib([30, 40, 70]));
  }
  function sdcMarcaOk(ser, aj, mok) {
    setPlayer(function (N) {
      var _ = clonar(N);
      if (_.today) {
        var kk = sdcMarcaK(modalidad, modo);
        _.today.marcas || (_.today.marcas = {});
        var pv = _.today.marcas[kk] || {};
        _.today.marcas[kk] = { ser: ser, aj: aj, mok: !!mok, kg: pv.kg };
      }
      return (guardarPartida(_), _);
    });
  }
  function sdcSerie(g, k) {
    let pv = sdcSer[g] || 0,
      nx = { ...sdcSer, [g]: k };
    (sdcSetSer(nx), sdcMarcaOk(nx, sdcAjuste, sdcModOk));
    if (k > pv) {
      let gn = 0;
      for (let j = pv; j < k; j++) gn += sdcRepsSerie(g, j);
      (sdcBeep(660, 80),
        setTimeout(() => sdcBeep(880, 110), 85),
        sdcVib(18),
        sdcSetFlota({ n: gn, id: Date.now() }),
        sdcSetDesc(
          Math.min(180, Math.round((descansoBase[profile.focusProfile] || 60) + gn * 1.5)),
        ),
        sdcSetDescIni(Date.now()),
        setDescansando(!0));
    } else sdcVib(8);
  }
  function sdcGolpe() {
    (setCombVentana(!1), aplicar((f) => h2(f)), setCombTexto(""), sdcSetCombSer({}));
  }
  function sdcCombTocar(fa, k) {
    let pv = sdcCombSer[fa] || 0;
    sdcSetCombSer((d) => ({ ...d, [fa]: k }));
    k > pv ? (sdcBeep(700, 70), setTimeout(() => sdcBeep(920, 100), 75), sdcVib(16)) : sdcVib(6);
  }
  function sdcCombChips(fa, rq) {
    let n = sdcNSets(rq),
      pl = sdcSplit(rq, n),
      d = sdcCombSer[fa] || 0;
    return (
      <div className="flex gap-2">
        {pl.map((r, k) => (
          <button
            key={k}
            onClick={() => sdcCombTocar(fa, d === k + 1 ? k : k + 1)}
            className="sdc-chip flex-1 py-3"
            aria-label={
              "Combate, serie " + (k + 1) + " de " + n + (k < d ? ", hecha" : ", pendiente")
            }
            style={{
              background: k < d ? "#ff5c7a" : "rgba(255,255,255,0.04)",
              border: "1px solid " + (k < d ? "#ff5c7a" : "rgba(255,255,255,0.18)"),
              color: k < d ? "#0a0e1a" : "#8a93ad",
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              minHeight: 48,
            }}
          >
            {k < d ? "✓ " + r : r}
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
  function sdcKgVer(g, k) {
    var lo = sdcKgS[g] || {},
      pe = sdcGymSer(player)[g] || {},
      j;
    for (j = k; j >= 1; j--) {
      if (lo[j] !== void 0) return lo[j];
      if (pe[j] !== void 0 && pe[j] !== null && pe[j] !== "") return sdcKgTxt(pe[j]);
    }
    if (lo[0] !== void 0) return lo[0];
    var pv = (sdcGymUlt(player)[sdcEjNom(g)] || {}).kgs;
    if (pv && pv[k] > 0) return sdcKgTxt(pv[k]);
    if (pv && pv[0] > 0) return sdcKgTxt(pv[0]);
    return "";
  }
  function sdcKgNum(g, k) {
    return Math.max(0, parseFloat(String(sdcKgVer(g, k)).replace(",", ".")) || 0);
  }
  function sdcKgSet(g, k, val) {
    sdcSetKgS(function (d) {
      var o = Object.assign({}, d);
      o[g] = Object.assign({}, o[g] || {});
      o[g][k] = val;
      return o;
    });
    var num = Math.max(0, parseFloat(String(val || "").replace(",", ".")) || 0);
    setPlayer(function (N) {
      var _ = clonar(N);
      (_.gymWeights || (_.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        k === 0
          ? (_.gymWeights[g] = num)
          : (_.gymSerieKg || (_.gymSerieKg = {}),
            _.gymSerieKg[g] || (_.gymSerieKg[g] = {}),
            (_.gymSerieKg[g][k] = num)));
      if (_.today) {
        var kk = sdcMarcaK(modalidad, modo);
        (_.today.marcas || (_.today.marcas = {}),
          _.today.marcas[kk] || (_.today.marcas[kk] = {}),
          _.today.marcas[kk].kg || (_.today.marcas[kk].kg = {}),
          _.today.marcas[kk].kg[g] || (_.today.marcas[kk].kg[g] = {}),
          (_.today.marcas[kk].kg[g][k] = val));
      }
      return (guardarPartida(_), _);
    });
  }
  function sdcEjNom(g) {
    var x = ejercicioDe(g, progress.rank, modalidad);
    return (x && x.name) || "";
  }
  function sdcKgUsar(g, kg) {
    var n = sdcNSets(metaSesion[g] || 0),
      k;
    for (k = 0; k < n; k++) sdcKgSet(g, k, sdcKgTxt(kg));
  }
  function sdcGymVol() {
    var gs = ["squat", "pushup", "back", "abs"],
      o = {},
      x,
      g,
      n,
      hh,
      vol,
      mx,
      k,
      kg,
      rp,
      li;
    for (x = 0; x < 4; x++) {
      g = gs[x];
      n = sdcNSets(metaSesion[g] || 0);
      hh = Math.min(sdcSer[g] || 0, n);
      vol = 0;
      mx = 0;
      li = [];
      for (k = 0; k < n; k++) {
        kg = sdcKgNum(g, k);
        li.push(kg);
        if (k < hh) {
          rp = sdcRepsSerie(g, k) || 0;
          vol += kg * rp;
          if (kg > mx) mx = kg;
        }
      }
      o[g] = { vol: Math.round(vol), max: mx, kgs: li, nom: sdcEjNom(g) };
    }
    return o;
  }
  function registrar() {
    let h = sdcRepsHechas(),
      gv = modalidad === "gym" ? sdcGymVol() : null;
    (sdcCelebra(),
      aplicar((f) =>
        sdcDeshacerHook(
          f,
          sdcMetaHook(sdcPrimerasHook(registrarRutina(f, modo, h, sdcModOk, gv), h), metaDia),
        ),
      ));
  }
  function tomarDescanso() {
    setPlayer((f) => {
      let { state: d, notices: m } = usarDescanso(f);
      return (m && m.length && avisar((N) => [...N, ...m]), guardarPartida(d), d);
    });
  }
  function cruzarUmbral() {
    setPlayer((f) => {
      let { state: d, notices: m } = sdcCruzar(f);
      return (m && m.length && avisar((N) => [...N, ...m]), guardarPartida(d), d);
    });
  }
  function elegirModalidad(f) {
    setPlayer((d) => {
      let m = clonar(d);
      return ((m.today.modality = f), guardarPartida(m), m);
    });
  }
  function irTienda() {
    setPlayer((d) => {
      let m = clonar(d);
      return (
        m.ui || (m.ui = { collapsed: {} }),
        (m.ui.collapsed.tienda = !m.ui.collapsed.tienda),
        guardarPartida(m),
        m
      );
    });
  }
  function mmNueva(f) {
    (setPlayer((d) => {
      let m = clonar(d);
      return (
        (m.today.modality = f),
        (m.today.completed = !1),
        (m.today.mode = "pending"),
        (m.today.fullCompletion = !1),
        (m.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        delete m.undoSnapshot,
        guardarPartida(m),
        m
      );
    }),
      avisar((d) => [
        ...d,
        `Nueva sesión: ${(modalidades.find((r) => r.id === f) || modalidades[0]).name}. Al completarla ganás un bono por combinar estilos.`,
      ]));
  }
  function sdcPonerJuego(f) {
    setPlayer((d) => {
      let m = clonar(d);
      return ((m.profile.tituloSet = f), guardarPartida(m), m);
    });
  }
  function sdcCamRitmo(v) {
    setPlayer((d) => {
      let m = clonar(d);
      return ((m.profile.ritmoKmH = v), guardarPartida(m), m);
    });
  }
  function sdcCamEmpezar() {
    setPlayer((d) => {
      let m = clonar(d);
      return (
        (m.exploration = m.exploration || {}),
        (m.exploration.walkStart = Date.now()),
        guardarPartida(m),
        m
      );
    });
  }
  function sdcCamCancelar() {
    setPlayer((d) => {
      let m = clonar(d);
      return (m.exploration && (m.exploration.walkStart = 0), guardarPartida(m), m);
    });
  }
  function sdcCamListo(km) {
    (setPlayer((d) => {
      let m = clonar(d);
      return (m.exploration && (m.exploration.walkStart = 0), guardarPartida(m), m);
    }),
      setKmTexto(String(km).replace(".", ",")),
      avisar((d) => [
        ...d,
        "Salida terminada. Puse " +
          String(km).replace(".", ",") +
          " km en el campo: corregilo si hace falta y tocá + Tramo.",
      ]));
  }
  function sdcTravEmpezar() {
    setPlayer((d) => {
      let m = clonar(d);
      return (
        (m.dungeon = m.dungeon || {}),
        (m.dungeon.startedAt = Date.now() + 1e4),
        guardarPartida(m),
        m
      );
    });
  }
  function sdcTravCancelar() {
    setPlayer((d) => {
      let m = clonar(d);
      return (m.dungeon && (m.dungeon.startedAt = 0), guardarPartida(m), m);
    });
  }
  function sdcPrimeraManual() {
    var t = null;
    try {
      t = window.prompt("¿Qué pudiste hacer hoy que antes no podías?");
    } catch (x) {}
    if (!t || !String(t).trim()) return;
    var tx = String(t).trim().slice(0, 120);
    (setPlayer((d) => {
      let m = clonar(d);
      return (sdcPrimeraAdd(m, tx, "escrita"), guardarPartida(m), m);
    }),
      avisar((d) => [...d, "Primera vez: " + tx + ". Queda anotado."]));
  }
  function sdcResponderPodia(nm, v) {
    setPlayer((d) => {
      let m = clonar(d),
        o2 = {},
        k,
        src = sdcPodia(m);
      for (k in src) o2[k] = src[k];
      return ((o2[nm] = v), (m.podia = o2), guardarPartida(m), m);
    });
  }
  function ponerModalidades(f) {
    setPlayer((d) => {
      let m = clonar(d);
      return ((m.profile.modalities = f.length ? f : ["bodyweight"]), guardarPartida(m), m);
    });
  }
  function alternarModalidad(f) {
    let d = modalidadesDe(profile),
      m = d.includes(f) ? d.filter((N) => N !== f) : [...d, f];
    if (!m.length) {
      avisar((N) => [...N, "Debes mantener al menos un método activo."]);
      return;
    }
    ponerModalidades(m);
  }
  function deshacerRegistro() {
    (setConfirmarDeshacer(!1), aplicar((f) => sdcDeshacer(f)), setMetaSesion({ ...metaDia }));
  }
  function ponerKg(f, d) {
    let m = Math.max(0, parseFloat((d || "0").replace(",", ".")) || 0);
    setPlayer((N) => {
      let _ = clonar(N);
      return (
        _.gymWeights || (_.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        (_.gymWeights[f] = m),
        guardarPartida(_),
        _
      );
    });
  }
  function ponerPesoCorporal(f) {
    let d = Math.max(0, parseFloat((f || "0").replace(",", ".")) || 0);
    setPlayer((m) => {
      let N = clonar(m);
      return ((N.profile.bodyWeight = d), guardarPartida(N), N);
    });
  }
  function alternarDesbloqueo() {
    setPlayer((f) => {
      let d = clonar(f);
      return (
        (d.unlockAll = !d.unlockAll),
        d.unlockAll && (d.seenUnlocks = sistemas.map((m) => m.id)),
        guardarPartida(d),
        d
      );
    });
  }
  function alternarSistema(f) {
    setPlayer((d) => {
      let m = clonar(d);
      return (
        m.disabled || (m.disabled = []),
        (m.disabled = m.disabled.includes(f)
          ? m.disabled.filter((N) => N !== f)
          : [...m.disabled, f]),
        guardarPartida(m),
        m
      );
    });
  }
  function ponerMetaSemanal(f) {
    (setPlayer((d) => {
      let m = clonar(d);
      return ((m.profile.weeklyGoal = f), guardarPartida(m), m);
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
      ...categoriasLogros.map((f) => "ach-" + f),
    ],
    todoPlegado = plegablesTodos.every((f) => ui && ui.collapsed && ui.collapsed[f]);
  function alternarTodo() {
    setPlayer((f) => {
      let d = clonar(f);
      (d.skills || (d.skills = {}),
        d.care || (d.care = { today: { date: fechaHoy(), done: [] }, lifetime: 0 }),
        d.neuro || (d.neuro = Al()),
        d.unlockAll === void 0 && (d.unlockAll = !1),
        d.disabled || (d.disabled = []),
        d.seenUnlocks ||
          (d.seenUnlocks = sistemas.filter((N) => sistemaAbierto(d, N.id)).map((N) => N.id)),
        d.ui || (d.ui = { collapsed: {} }));
      let m = !todoPlegado;
      return (
        plegablesTodos.forEach((N) => {
          d.ui.collapsed[N] = m;
        }),
        guardarPartida(d),
        d
      );
    });
  }
  function alternarPlegable(f, act) {
    setPlayer((d) => {
      let m = clonar(d);
      return (
        m.skills || (m.skills = {}),
        m.care || (m.care = { today: { date: fechaHoy(), done: [] }, lifetime: 0 }),
        m.neuro || (m.neuro = Al()),
        m.unlockAll === void 0 && (m.unlockAll = !1),
        m.disabled || (m.disabled = []),
        m.seenUnlocks ||
          (m.seenUnlocks = sistemas.filter((N) => sistemaAbierto(m, N.id)).map((N) => N.id)),
        m.ui || (m.ui = { collapsed: {} }),
        (m.ui.collapsed[f] = act !== void 0 ? !act : !m.ui.collapsed[f]),
        guardarPartida(m),
        m
      );
    });
  }
  let plegado = (f) => !!(ui && ui.collapsed && ui.collapsed[f]);
  useEffect(() => {
    let f = {
      combat: "combat",
      primal: "primal",
      exploration: "exploration",
      achievements: "achievements",
    }[pestana];
    f && !sistemaActivo(player, f) && setPestana("training");
  }, [pestana, progress.level, progress.rank, player.unlockAll]);
  function cerrarResumenSemana() {
    setPlayer((f) => {
      let d = clonar(f);
      return (d.lastWeekSummary && (d.lastWeekSummary.seen = !0), guardarPartida(d), d);
    });
  }
  function comprarItem(f) {
    aplicar((d) => comprar(d, f));
  }
  function terminarTravesia() {
    setPlayer((f) => {
      let { state: d, notices: m } = completarTravesia(f);
      return (m && m.length && avisar((N) => [...N, ...m]), guardarPartida(d), d);
    });
  }
  function cerrarAviso(f) {
    avisar((d) => d.filter((m, N) => N !== f));
  }
  function reiniciarTodo() {
    ((async () => {
      try {
        let f = await window.claude.use("db");
        f && (await f.doc("player/state").delete());
      } catch (f) {
        console.error("No se pudo borrar el progreso", f);
      }
    })(),
      setPlayer(null));
  }
  useEffect(() => {
    (async () => setHayPuntoRetorno(!!(await xy())))();
  }, []);
  function guardarPuntoRetorno() {
    (async () => {
      let f = await m5(player);
      (setHayPuntoRetorno(f),
        avisar((d) => [
          ...d,
          f
            ? "Punto de retorno guardado. Ya podés probar sin miedo."
            : "No se pudo guardar el punto de retorno.",
        ]));
    })();
  }
  function volverPuntoRetorno() {
    (async () => {
      let f = await xy();
      if (!f) {
        avisar((N) => [...N, "No hay ningún punto de retorno guardado."]);
        return;
      }
      let { state: d, notices: m } = cargarPartida(f);
      (setPlayer(d),
        guardarPartida(d),
        setCombPrep(!1),
        setCombVentana(!1),
        setPrimalFase("idle"),
        avisar(["Volviste a tu progreso guardado.", ...(m || [])]));
    })();
  }
  function saltarRango(f) {
    (setPlayer((d) => {
      let m = clonar(d),
        N = rangos.indexOf(f);
      return (
        (m.progress.rank = f),
        (m.progress.level = N === 0 ? 1 : nivelUmbral[rangos[N - 1]]),
        (m.progress.currentXP = 0),
        (m.ascension.pending = !1),
        (m.today.rank = f),
        (m.today.completed = !1),
        (m.today.fullCompletion = !1),
        (m.today.mode = "pending"),
        (m.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        guardarPartida(m),
        m
      );
    }),
      avisar((d) => [...d, `[Prueba] Saltaste al rango ${f} para ver sus ejercicios.`]));
  }
  function forzarUmbral() {
    (setPlayer((f) => {
      let d = clonar(f),
        m = nivelUmbral[d.progress.rank];
      return (
        m && ((d.progress.level = m), (d.ascension.pending = !0)),
        (d.umbralForzado = d.progress.rank),
        (d.today.completed = !0),
        (d.today.fullCompletion = !0),
        (d.today.rank = d.progress.rank),
        guardarPartida(d),
        d
      );
    }),
      avisar((f) => [
        ...f,
        "[Prueba] Umbral forzado disponible y día marcado como completo al 100%.",
      ]));
  }
  function sumarXp(f) {
    setPlayer((d) => {
      let m = clonar(d);
      m.progress.currentXP += f;
      let N = [];
      return (
        (m = subirNiveles(m, N)),
        guardarPartida(m),
        N.length && avisar((_) => [..._, ...N]),
        m
      );
    });
  }
  function fallarAyer() {
    setPlayer((f) => {
      let d = clonar(f),
        m = new Date(d.today.date + "T00:00:00");
      (m.setDate(m.getDate() - 1), (d.today.date = fechaLocal(m)), (d.today.completed = !1));
      let { state: N, notices: _ } = cargarPartida(d);
      return (guardarPartida(N), _.length && avisar((X) => [...X, ..._]), N);
    });
  }
  function reiniciarHoy() {
    setPlayer((f) => {
      let d = clonar(f);
      return (
        (d.today.completed = !1),
        (d.today.fullCompletion = !1),
        (d.today.mode = "pending"),
        (d.today.rank = d.progress.rank),
        (d.today.reps = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        (d.today.stretchDone = !1),
        guardarPartida(d),
        d
      );
    });
  }
  function sumarKm() {
    let f = Math.max(0, parseFloat((kmTexto || "0").replace(",", ".")) || 0);
    f &&
      (setPlayer((d) => {
        let { state: m } = sumarTramo(d, f);
        return (guardarPartida(m), m);
      }),
      setKmTexto(""));
  }
  function sumarPasos() {
    let f = Math.max(0, parseInt((pasosTexto || "0").replace(/\D/g, ""), 10) || 0);
    if (!f) return;
    let d = Math.round(((f * vd) / 1e3) * 100) / 100;
    d <= 0 ||
      (setPlayer((m) => {
        let { state: N } = sumarTramo(m, d);
        return (guardarPartida(N), N);
      }),
      setPasosTexto(""));
  }
  function descartarTramosHoy() {
    setPlayer((f) => {
      let { state: d, notices: m } = descartarTramos(f);
      return (m && m.length && avisar((N) => [...N, ...m]), guardarPartida(d), d);
    });
  }
  function consolidarKmHoy() {
    setPlayer((f) => {
      let { state: d, notices: m, found: N } = consolidarKm(f);
      return (
        m && m.length && avisar((_) => [..._, ...m]),
        N && N.length && setHallazgos(N),
        guardarPartida(d),
        d
      );
    });
  }
  function sumarKmDePrueba(f) {
    setPlayer((d) => {
      let m = sumarTramo(d, f),
        { state: N, notices: _, found: X } = consolidarKm(m.state);
      return (
        _ && _.length && avisar((de) => [...de, ..._]),
        X && X.length && setHallazgos(X),
        guardarPartida(N),
        N
      );
    });
  }
  function forzarTravesia() {
    (setPlayer((f) => {
      let d = clonar(f);
      return (
        (d.dungeon = { date: d.today.date, ...travesiaDelDia(d.progress.rank) }),
        d.dungeon.available ||
          (d.dungeon = {
            date: d.today.date,
            available: !0,
            completed: !1,
            name: sdcPortales[0].n,
            challengeText: sdcPortales[0].c,
            rewardXP: Ed[d.progress.rank],
          }),
        guardarPartida(d),
        d
      );
    }),
      avisar((f) => [...f, "[Prueba] Travesía forzada disponible."]));
  }
  function ponerRacha(f) {
    setPlayer((d) => {
      let m = clonar(d);
      ((m.streak.current = f), (m.streak.best = Math.max(m.streak.best || 0, f)));
      let N = revisarLogros(m);
      return (
        N.notices.length && avisar((_) => [..._, ...N.notices]),
        guardarPartida(N.state),
        N.state
      );
    });
  }
  function desbloquearLogros() {
    (setPlayer((f) => {
      let d = clonar(f);
      return ((d.achievements = logros.map((m) => m.id)), guardarPartida(d), d);
    }),
      avisar((f) => [...f, "[Prueba] Todos los logros desbloqueados."]));
  }
  function saltarAlJefe() {
    (setPlayer((f) => {
      let d = clonar(f);
      return (
        (d.combat.villainIndex = 4),
        (d.combat.lastExercise = null),
        (d.combat.exercise = null),
        (d.combat.lives = 3),
        (d.combat.loadFactor = 1),
        (d.combat.damageFactor = 1),
        (d.combat.bossCats = $o(null)),
        (d.combat.villainCurrentHP = golpesNecesarios(za(4))),
        (d.combat.phase = "resting"),
        (d.combat.roundId = (d.combat.roundId || 0) + 1),
        guardarPartida(d),
        d
      );
    }),
      setCombPrep(!1),
      setCombVentana(!1),
      avisar((f) => [...f, `[Prueba] Saltaste al primer Jefe (${za(4).name}).`]));
  }
  function reiniciarCombate() {
    (setPlayer((f) => {
      let d = clonar(f);
      return ((d.combat = Ad()), guardarPartida(d), d);
    }),
      setCombPrep(!1),
      setCombVentana(!1),
      avisar((f) => [...f, "[Prueba] Combate reiniciado desde el primer enemigo."]));
  }
  function desbloquearPrimal() {
    (setPlayer((f) => {
      let d = clonar(f);
      d.primal.unlockedCount < movimientosPrimal.length &&
        ((d.primal.unlockedCount += 1), (d.primal.masteryProgress = 0));
      let m = revisarLogros(d);
      return (
        m.notices.length && avisar((N) => [...N, ...m.notices]),
        guardarPartida(m.state),
        m.state
      );
    }),
      avisar((f) => [...f, "[Prueba] Desbloqueado el siguiente movimiento de Instinto Primal."]));
  }
  function reiniciarContadorPrimal() {
    (setPlayer((f) => {
      let d = clonar(f);
      return ((d.primal.today = { date: fechaHoy(), count: 0 }), guardarPartida(d), d);
    }),
      avisar((f) => [...f, "[Prueba] Contador diario de Instinto Primal reiniciado."]));
  }
  function forzarAvisoCarga() {
    setPlayer((f) => {
      let d = clonar(f);
      d.primal.today = { date: fechaHoy(), count: 8 };
      let m = avisoCarga(d);
      return (
        m.notices.length
          ? avisar((N) => [...N, ...m.notices])
          : avisar((N) => [
              ...N,
              '[Prueba] Ya se mostró el aviso hoy, usa "reiniciar contador diario" primero.',
            ]),
        guardarPartida(m.state),
        m.state
      );
    });
  }
  let estMin = String(Math.floor(estSegundos / 60)).padStart(2, "0"),
    estSeg = String(estSegundos % 60).padStart(2, "0");
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
              let cb = sdcCalibre(profile);
              return cb ? (
                <div
                  className="text-xs mt-1"
                  style={{
                    color: "#ffb84f",
                    fontFamily: "Chakra Petch, sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  {cb}
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
              let f = sistemas.find((d) => !sistemaAbierto(player, d.id));
              return f ? (
                <span>
                  Próximo: <b style={{ color: "#9aa4bd" }}>{f.name}</b> en Nv. {f.level}
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
              onClick={() => setHallazgos((f) => f.slice(1))}
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
              color={k5(progress.rank)}
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
            onClick={() => setFraseMascota(ou[Math.floor(Math.random() * ou.length)])}
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
              return guia.map((m) => {
                let sdcAb = !!sdcTema[m.title],
                  sdcNu = m.g !== sdcGv;
                sdcGv = m.g;
                return (
                  <div key={m.title}>
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
                        {m.g}
                      </div>
                    ) : null}
                    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <button
                        onClick={() => sdcSetTema((d) => ({ ...d, [m.title]: !d[m.title] }))}
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
                          {m.title}
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
                          {m.text}
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
              {tienda.map((m) => {
                let N = dominion.points >= m.cost;
                return (
                  <div
                    key={m.id}
                    className="py-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div style={{ flex: 1 }}>
                        <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                          {m.name}
                        </div>
                        <div className="text-xs" style={{ color: "#9aa4bd" }}>
                          {m.desc}
                        </div>
                      </div>
                      <button
                        onClick={() => comprarItem(m.id)}
                        disabled={!N}
                        className="py-2 px-3 text-xs disabled:opacity-40"
                        style={{
                          background: N ? "#7c5cff" : "rgba(255,255,255,0.05)",
                          border: "1px solid #7c5cff",
                          color: N ? "#0a0e1a" : "#9aa4bd",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.cost} PD
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
          let f = [
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
          ].filter((d) => d.on);
          return (
            <div className="grid grid-cols-3 gap-1 mb-4">
              {f.map((d) => {
                let m = d.icon,
                  N = pestana === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setPestana(d.id)}
                    className="flex items-center justify-center gap-1 py-2 text-xs"
                    style={{
                      minHeight: 48,
                      background: N ? d.color : "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: N ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    }}
                  >
                    {createElement(m, { size: 13 })} {d.label}
                  </button>
                );
              })}
            </div>
          );
        })()}
        {pestana === "training" && (
          <PestanaEntreno
            alternarPlegable={alternarPlegable}
            aplicar={aplicar}
            ascension={ascension}
            atributos={atributos}
            avisar={avisar}
            bkDescargar={bkDescargar}
            cambiandoMeta={cambiandoMeta}
            cerrarResumenSemana={cerrarResumenSemana}
            colorDelRango={colorDelRango}
            coloresMapa={coloresMapa}
            confirmarDeshacer={confirmarDeshacer}
            cruzarUmbral={cruzarUmbral}
            descansando={descansando}
            descansoBase={descansoBase}
            deshacerRegistro={deshacerRegistro}
            diaElegido={diaElegido}
            diasGrilla={diasGrilla}
            dungeon={dungeon}
            elegirModalidad={elegirModalidad}
            estirando={estirando}
            estSegundos={estSegundos}
            grupos={grupos}
            lastTrained={lastTrained}
            lastWeekSummary={lastWeekSummary}
            lifetimeReps={lifetimeReps}
            metaDia={metaDia}
            metaSemana={metaSemana}
            metaSemanaGrupo={metaSemanaGrupo}
            metaSesion={metaSesion}
            metronomoOn={metronomoOn}
            mmNueva={mmNueva}
            modalidad={modalidad}
            modo={modo}
            modoMapa={modoMapa}
            player={player}
            plegado={plegado}
            ponerMetaSemanal={ponerMetaSemanal}
            profile={profile}
            progress={progress}
            rangoDeHoy={rangoDeHoy}
            ratiosHoy={ratiosHoy}
            registrar={registrar}
            repsHoy={repsHoy}
            sdcAjustar={sdcAjustar}
            sdcAjuste={sdcAjuste}
            sdcConfDesc={sdcConfDesc}
            sdcDesc={sdcDesc}
            sdcDescIni={sdcDescIni}
            sdcEjNom={sdcEjNom}
            sdcEstOk={sdcEstOk}
            sdcEstPasos={sdcEstPasos}
            sdcEstPz={sdcEstPz}
            sdcKgSet={sdcKgSet}
            sdcKgUsar={sdcKgUsar}
            sdcKgVer={sdcKgVer}
            sdcMarcaOk={sdcMarcaOk}
            sdcMarcarTodo={sdcMarcarTodo}
            sdcModOk={sdcModOk}
            sdcMt={sdcMt}
            sdcResponderPodia={sdcResponderPodia}
            sdcSer={sdcSer}
            sdcSerie={sdcSerie}
            sdcSetConfDesc={sdcSetConfDesc}
            sdcSetEstIdx={sdcSetEstIdx}
            sdcSetEstIni={sdcSetEstIni}
            sdcSetEstOk={sdcSetEstOk}
            sdcSetEstPasos={sdcSetEstPasos}
            sdcSetEstPz={sdcSetEstPz}
            sdcSetModOk={sdcSetModOk}
            sdcTotalHechas={sdcTotalHechas}
            sdcTotalMeta={sdcTotalMeta}
            sdcTravCancelar={sdcTravCancelar}
            sdcTravEmpezar={sdcTravEmpezar}
            sesionesSemana={sesionesSemana}
            setCambiandoMeta={setCambiandoMeta}
            setConfirmarDeshacer={setConfirmarDeshacer}
            setDescansando={setDescansando}
            setDiaElegido={setDiaElegido}
            setEstirando={setEstirando}
            setEstSegundos={setEstSegundos}
            setMetaSesion={setMetaSesion}
            setMetronomoOn={setMetronomoOn}
            setModo={setModo}
            setModoMapa={setModoMapa}
            setPestana={setPestana}
            setVistaCuerpo={setVistaCuerpo}
            setZonaElegida={setZonaElegida}
            streak={streak}
            terminarTravesia={terminarTravesia}
            today={today}
            tomarDescanso={tomarDescanso}
            ui={ui}
            vistaCuerpo={vistaCuerpo}
            week={week}
            zonaElegida={zonaElegida}
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
