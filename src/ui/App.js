// La app: todas las pestanas.
import { i } from "../react.js";
import {
  IconoRayo,
  IconoPasos,
  IconoCandado,
  IconoCheck,
  IconoDestello,
  IconoPesa,
  IconoLlama,
  IconoPata,
  IconoCorazon,
  IconoEspadas,
  IconoTrofeo,
  IconoFlecha,
  IconoUbicacion,
  IconoReloj,
  IconoPersona,
} from "./iconos.js";
import { colorRango, nivelUmbral, sdcTitulos, vd, rangos } from "../datos/rangos.js";
import {
  Ed,
  Ny,
  sectores,
  travesiaDelDia,
  i2,
  l2,
  nodosExplorar,
  s2,
  sdcPortales,
} from "../logica/explorar.js";
import {
  $o,
  Ad,
  N2,
  S2,
  Ws,
  b2,
  dd,
  g2,
  h2,
  repsCombate,
  iy,
  m2,
  p2,
  sy,
  golpesNecesarios,
  repsCombateSuave,
  v2,
  perderVida,
  y2,
  za,
} from "../logica/combate.js";
import { A2, E2, regresiones, movimientosPrimal, cy, ou, xd } from "../logica/primal.js";
import { tienda, comprar, sesionesPrimalHoy, sdcModDia } from "../logica/tienda.js";
import {
  sdcEstLista,
  sdcEstMMSS,
  sdcEstPaso,
  sdcEstPrep,
  sdcEstTotal,
  sdcFlex,
  sdcFlexNiv,
  sdcFlexSet,
  sdcFlexToca,
  sdcFlexTxt,
} from "../logica/estiramiento.js";
import { Io, O2, Ro, q2, tu } from "../logica/atributos.js";
import { habilidades, marcarPasoHabilidad, Td, Wo, guia } from "../datos/guia.js";
import { Al, cuidadoArticular, alarmas, Ps, Ty, reglaDolor, Y2 } from "../datos/salud.js";
import { sistemas, sistemaActivo, sistemaAbierto } from "../logica/sistemas.js";
import {
  logros,
  ordenDificultad,
  revisarLogros,
  avisoCarga,
  categoriasLogros,
  sdcAnimo,
  sdcAnimoCuenta,
  sdcDific,
} from "../datos/logros.js";
import { modalidades } from "../datos/ejercicios.js";
import {
  alternativaEjercicio,
  modalidadDelDia,
  enfoqueDe,
  metaDelDia,
  fechaLocal,
  ejercicioDe,
  metaSemanal,
  puntajePrueba,
  xpTotal,
  nombreEjercicio,
  guardarPrueba,
  costoNivel,
  modalidadesDe,
  diasRestantesSemana,
  sdcBandaIx,
  sdcBandaMin,
  sdcCalibre,
  sdcGuia,
  sdcPuntaje,
  sdcRitmoF,
  fechaHoy,
  bandasCalibre,
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
  misProgreso,
  misTexto,
  completarTravesia,
  sdcCruzar,
  sdcFaltanTxt,
  sdcRangoCompletas,
  sdcUmbralFalta,
  sdcUmbralMin,
  sdcUmbralPrueba,
  usarDescanso,
  xy,
  sumarTramo,
} from "../logica/partida.js";
import { Tarjeta, BarraXp } from "./base.js";
import {
  sdcCalF,
  sdcCalT,
  sdcDescRango,
  sdcDeshacer,
  sdcDeshacerHook,
  sdcDiaPasado,
  sdcGymSer,
  sdcGymUlt,
  sdcHoyMeta,
  sdcHoyReps,
  sdcJuego,
  sdcKgTxt,
  sdcMarca,
  sdcMarcaK,
  sdcMetaHook,
  sdcPodia,
  sdcPrimeraAdd,
  sdcPrimeras,
  sdcPrimerasHook,
  sdcRango,
  sdcSugKg,
  sdcSumaReps,
  sdcTier,
  sdcVistos,
} from "../logica/extras.js";
import { Avisos } from "./avisos.js";
import { sdcBeep, sdcCatAbierta, sdcNSets, sdcSplit, sdcVib } from "../logica/series.js";
import { FilaEjercicio } from "./ejercicio.js";
import { gruposCuerpo, colorProgreso, FiguraCuerpo, PanelZonas, wd } from "./cuerpo.js";
import {
  DetalleDia,
  GrillaConstancia,
  bt,
  LeyendaConstancia,
  diasConstancia,
} from "./constancia.js";
import { DibujoMascota, Plegable, k5 } from "./tarjetas.js";
import { PruebaAptitud } from "./prueba.js";
import { Metronomo, sdcTempoMod } from "./metronomo.js";
import { sdcAvisaRespaldo, sdcRespaldoOk, sdcRespaldoPosponer } from "../logica/respaldo.js";
import { sdcWakeSi } from "./pantalla.js";
import { CronoCaminata, sdcRitmos } from "./caminata.js";
import {
  sdcCalor,
  Calentamiento,
  sdcCalorDer,
  sdcEstDesde,
  sdcPasoEspera,
  PasoGuiado,
  sdcPasosHook,
  sdcPasosV,
} from "./calentamiento.js";
import { sdcAbrirCard, AnimoAntes, AnimoDespues, sdcAnimoHoy, sdcAnimoOn } from "./animo.js";
import { CronoTravesia, sdcTravMin, sdcTravRitmo } from "./travesia.js";
import { BarraDescanso } from "./descanso.js";
import { Reaccion, Ritmo, Secuencia, kd, TareaDual } from "./neuromotor.js";

var sdcDevN = 0;
function App({ player: e, setPlayer: a, initialNotices: l }) {
  let [n, o] = (0, i.useState)(l || []),
    {
      profile: s,
      progress: u,
      today: c,
      week: r,
      streak: p,
      ascension: v,
      exploration: x,
      dungeon: y,
      achievements: S,
      history: E,
      lifetimeReps: T,
      combat: A,
      primal: g,
      dungeonsCleared: b,
      lastTrained: h,
      dominion: C,
      lastWeekSummary: D,
      ui: H,
    } = e,
    z = colorRango[u.rank],
    q = nivelUmbral[u.rank],
    U = costoNivel(u.level),
    Y = (c.completed && c.rank) || u.rank,
    B = modalidadDelDia(s, c.date, c.modality),
    J = metaDelDia(e, Y),
    [De, On] = (0, i.useState)(() => (sdcAnimoHoy(e).modo === "recovery" ? "recovery" : "normal")),
    [Aa, Va] = (0, i.useState)({ ...J }),
    [sdcSer, sdcSetSer] = (0, i.useState)({ squat: 0, pushup: 0, back: 0, abs: 0 }),
    [sdcFlota, sdcSetFlota] = (0, i.useState)(null),
    [sdcUltEpic, sdcSetUltEpic] = (0, i.useState)(""),
    [sdcDesc, sdcSetDesc] = (0, i.useState)(0),
    [sdcDescIni, sdcSetDescIni] = (0, i.useState)(0),
    [sdcAjuste, sdcSetAjuste] = (0, i.useState)({}),
    [sdcConfDesc, sdcSetConfDesc] = (0, i.useState)(!1),
    [sdcModOk, sdcSetModOk] = (0, i.useState)(!1),
    [sdcCombSer, sdcSetCombSer] = (0, i.useState)({}),
    [sdcTema, sdcSetTema] = (0, i.useState)({
      "Tu rutina de hoy": 1,
      "Cómo se anota lo que hacés": 1,
      "Niveles y XP": 1,
    }),
    [sdcEstPasos, sdcSetEstPasos] = (0, i.useState)([]),
    [sdcEstIdx, sdcSetEstIdx] = (0, i.useState)(0),
    [sdcEstIni, sdcSetEstIni] = (0, i.useState)(0),
    [sdcEstPz, sdcSetEstPz] = (0, i.useState)(0),
    [sdcEstOk, sdcSetEstOk] = (0, i.useState)(-1),
    [sdcKgS, sdcSetKgS] = (0, i.useState)({}),
    [ja, Ba] = (0, i.useState)(!1),
    [fa, Tl] = (0, i.useState)(300),
    [Ud, j] = (0, i.useState)(!1),
    [Se, gt] = (0, i.useState)(!1),
    [oi, Ld] = (0, i.useState)(!1),
    [jn, Hd] = (0, i.useState)("front"),
    [ma, Hy] = (0, i.useState)("desarrollo"),
    [He, ii] = (0, i.useState)("movs"),
    [Xy, Yy] = (0, i.useState)(null),
    [Gy, Zy] = (0, i.useState)(null),
    [Ky, Vy] = (0, i.useState)(null),
    [vt, su] = (0, i.useState)(null),
    [Da, $t] = (0, i.useState)("training"),
    [Xd, Yd] = (0, i.useState)(""),
    [Ml, Gd] = (0, i.useState)(""),
    [uu, Qy] = (0, i.useState)(!1),
    [Wy, Zd] = (0, i.useState)(!1),
    [Bn, Kd] = (0, i.useState)(null),
    [Jy, cu] = (0, i.useState)(!1),
    [It, ru] = (0, i.useState)([]),
    [du, _l] = (0, i.useState)(!1),
    [fu, ht] = (0, i.useState)(!1),
    [xt, ql] = (0, i.useState)(0),
    [Fy, mu] = (0, i.useState)(0),
    [Vd, si] = (0, i.useState)(""),
    [pu, bu] = (0, i.useState)(null),
    [Qd, ui] = (0, i.useState)(1),
    [Qa, Ol] = (0, i.useState)("idle"),
    [jl, wn] = (0, i.useState)(0),
    [Py, yu] = (0, i.useState)(!1),
    [Un, gu] = (0, i.useState)(0),
    ci = [
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
    [vu, hu] = (0, i.useState)(""),
    [xu, Su] = (0, i.useState)(""),
    [Nu, Cu] = (0, i.useState)(""),
    [sdcRbk, sdcSetRbk] = (0, i.useState)(""),
    [$y, Iy] = (0, i.useState)(() => A2(fechaHoy())),
    [ku, Wd] = (0, i.useState)(""),
    [Ry, zu] = (0, i.useState)(!1),
    [Ln, eg] = (0, i.useState)(!1),
    [Jd, Fd] = (0, i.useState)(!1),
    ag = { fuerza: 90, resistencia: 45, salud: 60 },
    Re = metaSemanal(e),
    sdcYa = c.completed || (c.doneModalities || []).includes(B),
    Rt = sdcYa ? sdcHoyReps(e) : sdcSumaReps(sdcHoyReps(e), sdcRepsHechas()),
    sdcMt = sdcYa ? sdcHoyMeta(e, J) : sdcSumaReps(sdcHoyMeta(e, null), J),
    tg = {
      squat: (Rt.squat || 0) / (sdcMt.squat || 1),
      pushup: (Rt.pushup || 0) / (sdcMt.pushup || 1),
      back: (Rt.back || 0) / (sdcMt.back || 1),
      abs: (Rt.abs || 0) / (sdcMt.abs || 1),
    },
    Hn = ["squat", "pushup", "back", "abs"],
    Wa = O2(e),
    lg = Math.max(10, ...Hn.map((f) => Wa.levels[f])),
    Pd = (f) => Math.max(1, (J[f] || 1) * Re),
    ri = (f) =>
      ma === "hoy"
        ? (Rt[f] || 0) / (sdcMt[f] || 1)
        : ma === "semana"
          ? ((r.reps && r.reps[f]) || 0) / Pd(f)
          : Wa.levels[f] / lg,
    $d = {
      squat: colorProgreso(ri("squat")),
      pushup: colorProgreso(ri("pushup")),
      back: colorProgreso(ri("back")),
      abs: colorProgreso(ri("abs")),
    },
    el = x.lifetimeKm || 0,
    ng = l2(el),
    L5 = x.unlockedIndex >= 0 ? nodosExplorar[x.unlockedIndex] : null,
    di = nodosExplorar[x.unlockedIndex + 1] || null,
    Xn = g.today.date === fechaHoy() ? g.today.count : 0,
    Yn = sesionesPrimalHoy(e),
    al = r.trained || 0,
    Id = diasConstancia(
      E,
      c.date,
      c.completed
        ? c.mode === "rest"
          ? "rest"
          : c.fullCompletion
            ? "full"
            : "partial"
        : (r.sessionDates || []).includes(c.date)
          ? "partial"
          : "pending",
      28,
    ),
    fi = A.todayDefeated && A.todayDefeated.date === fechaHoy() ? A.todayDefeated.count : 0;
  ((0, i.useEffect)(() => {
    (Va(
      De === "recovery"
        ? {
            squat: Math.round(J.squat * 0.5),
            pushup: Math.round(J.pushup * 0.5),
            back: Math.round(J.back * 0.5),
            abs: Math.round(J.abs * 0.5),
          }
        : { ...J },
    ),
      (function () {
        var mk = sdcMarca(e, sdcMarcaK(B, De));
        mk && !c.completed && !(c.doneModalities || []).includes(B)
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
  }, [De, u.rank, B]),
    (0, i.useEffect)(() => {
      if (!n || !n.length) {
        sdcUltEpic && sdcSetUltEpic("");
        return;
      }
      let ep = n.find((t) => sdcTier(t) === "epic");
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
    }, [n, sdcUltEpic]),
    (0, i.useEffect)(() => {
      sdcSetCombSer({});
    }, [A.villainIndex, A.exercise, A.phase]),
    (0, i.useEffect)(() => {
      if (!sdcFlota) return;
      let f = setTimeout(() => sdcSetFlota(null), 1200);
      return () => clearTimeout(f);
    }, [sdcFlota]),
    (0, i.useEffect)(() => {
      if (!ja) return;
      let f = setInterval(() => Tl(Math.floor(((sdcEstPz || Date.now()) - sdcEstIni) / 1e3)), 300);
      return () => clearInterval(f);
    }, [ja, sdcEstIni, sdcEstPz]),
    (0, i.useEffect)(() => {
      if (!ja) return;
      let tt = sdcEstTotal(sdcEstPasos);
      if (fa >= tt) {
        (Ba(!1),
          sdcBeep(880, 200),
          setTimeout(() => sdcBeep(1175, 340), 210),
          sdcVib([40, 60, 140]),
          Ne((d) =>
            sdcPasosHook(
              registrarEstiramiento(d, sdcEstPasos.length, sdcEstPasos.length),
              sdcEstPasos,
              sdcEstPasos.length,
            ),
          ),
          o((d) => [...d, "Rutina de estiramiento completada."]));
        return;
      }
      let p = sdcEstPaso(sdcEstPasos, fa),
        fs = p.index * 2 + (p.prep > 0 ? 0 : 1);
      p.prep > 0 &&
        !sdcEstPz &&
        sdcEstOk < p.index &&
        sdcPasoEspera(sdcEstPasos, p.index, sdcPasosV(e)) &&
        sdcSetEstPz(sdcEstIni + sdcEstDesde(sdcEstPasos, p.index) * 1e3);
      fs > sdcEstIdx &&
        (sdcSetEstIdx(fs),
        p.prep > 0 ? (sdcBeep(520, 120), sdcVib(18)) : (sdcBeep(760, 140), sdcVib(22)));
    }, [ja, fa]),
    (0, i.useEffect)(() => {
      if (Da !== "combat") {
        (_l(!1), ht(!1));
        return;
      }
      if (A.phase === "resting") {
        let d = za(A.villainIndex).isBoss ? 20 : 12;
        (mu(d), ql(d), _l(!1), ht(!1));
      }
    }, [A.roundId, Da]),
    (0, i.useEffect)(() => {
      if (!du) return;
      if (xt <= 0) {
        _l(!1);
        let d = za(A.villainIndex),
          m = d.isBoss
            ? repsCombateSuave(
                u.rank,
                s.classification,
                s.focusProfile,
                (A.bossCats || $o(A.lastExercise))[0],
                B,
                s.testResults,
              )
            : Math.max(
                1,
                Math.round(
                  repsCombate(
                    u.rank,
                    s.classification,
                    A.exercise,
                    s.focusProfile,
                    B,
                    s.testResults,
                  ) * (A.loadFactor || 1),
                ),
              ),
          N = d.isBoss ? p2() : m2(m);
        (mu(N), ql(N), si(""), ht(!0));
        return;
      }
      let f = setTimeout(() => ql((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [du, xt]),
    (0, i.useEffect)(() => {
      if (!fu) return;
      if (xt <= 0) {
        (ht(!1), Ne((d) => perderVida(d)));
        return;
      }
      let f = setTimeout(() => ql((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [fu, xt]),
    (0, i.useEffect)(() => {
      if (Qa !== "active") return;
      if (jl <= 0) {
        (sdcBeep(520, 160), sdcVib(18));
        if (Qd < dd) (Ol("resting"), wn(cy));
        else {
          let d = pu;
          (Ol("idle"), bu(null), ui(1), Ne((m) => E2(m, d)));
        }
        return;
      }
      let f = setTimeout(() => wn((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [Qa, jl]),
    (0, i.useEffect)(() => {
      if (Qa !== "resting") return;
      if (jl <= 0) {
        (sdcBeep(760, 160), sdcVib(22), ui((d) => d + 1), Ol("active"), wn(Ws(u.rank)));
        return;
      }
      let f = setTimeout(() => wn((d) => d - 1), 1e3);
      return () => clearTimeout(f);
    }, [Qa, jl]),
    sdcWakeSi(!!du || !!fu || !!ja || Qa === "active" || Qa === "resting"));
  function og(f) {
    (bu(f), ui(0), Ol("listo"));
  }
  function sdcPrimalYa() {
    (sdcBeep(660, 100), sdcVib(22), ui(0), wn(10), Ol("resting"));
  }
  function ig() {
    (Ol("idle"), bu(null), ui(1));
  }
  function sg() {
    let f = Math.max(0, parseInt(vu || "0", 10)),
      d = Math.max(0, parseInt(xu || "0", 10)),
      m = Math.max(0, parseInt(Nu || "0", 10)),
      bq = Math.max(0, parseInt(sdcRbk || "0", 10));
    (Ne((N) => guardarPrueba(N, f, d, m, bq, 5)), yu(!1), hu(""), Su(""), Cu(""), sdcSetRbk(""));
  }
  function bkDescargar() {
    try {
      let t = JSON.stringify(e),
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
        o((d) => [...d, "Respaldo descargado como archivo."]));
    } catch (x) {
      o((d) => [...d, "No se pudo descargar el archivo."]);
    }
  }
  function bkCargar(ev) {
    let f = ev.target.files && ev.target.files[0];
    if (!f) return;
    let r = new FileReader();
    ((r.onload = () => {
      (Wd(String(r.result || "")),
        o((d) => [...d, "Archivo cargado. Tocá Restaurar para aplicarlo."]));
    }),
      (r.onerror = () => o((d) => [...d, "No se pudo leer el archivo."])),
      r.readAsText(f),
      (ev.target.value = ""));
  }
  function ug() {
    let f = JSON.stringify(e);
    navigator.clipboard && navigator.clipboard.writeText
      ? navigator.clipboard
          .writeText(f)
          .then(() => (sdcRespaldoOk(), o((d) => [...d, "Respaldo copiado al portapapeles."])))
          .catch(() =>
            o((d) => [
              ...d,
              "No se pudo copiar automáticamente. Tocá el cuadro de texto y selecciona todo para copiarlo a mano.",
            ]),
          )
      : o((d) => [...d, "Tocá el cuadro de texto y selecciona todo para copiarlo a mano."]);
  }
  function cg() {
    try {
      let f = JSON.parse(ku.trim());
      if (!f || !f.profile || !f.progress) throw new Error("formato inválido");
      let { state: d } = cargarPartida(f);
      (a(d), guardarPartida(d), o(["¡Progreso restaurado desde el respaldo!"]));
    } catch (f) {
      o((d) => [...d, "Ese respaldo no es válido. Revisá que copiaste todo el texto completo."]);
    }
    (Wd(""), zu(!1));
  }
  function Ne(f) {
    a((d) => {
      let { state: m, notices: N } = f(d);
      return (N && N.length && o((_) => [..._, ...N]), guardarPartida(m), m);
    });
  }
  function rg(f) {
    Ne((d) => b2(d, f));
  }
  function Rd() {
    Vd.trim().toLowerCase() === "hecho" && (ht(!1), Ne((f) => h2(f)), si(""));
  }
  function dg() {
    (ht(!1), si(""), sdcSetCombSer({}));
    let d = za(A.villainIndex).isBoss ? 20 : 12;
    (mu(d), ql(d), _l(!1));
  }
  function fg() {
    Ne((f) => S2(f));
  }
  function mg() {
    Ne((f) => N2(f));
  }
  function sdcRepsSerie(g, k) {
    let t = Aa[g] || 0,
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
    return (Aa.squat || 0) + (Aa.pushup || 0) + (Aa.back || 0) + (Aa.abs || 0);
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
    a(function (N) {
      var _ = clonar(N);
      if (_.today) {
        var kk = sdcMarcaK(B, De);
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
        sdcSetDesc(Math.min(180, Math.round((ag[s.focusProfile] || 60) + gn * 1.5))),
        sdcSetDescIni(Date.now()),
        Fd(!0));
    } else sdcVib(8);
  }
  function sdcGolpe() {
    (ht(!1), Ne((f) => h2(f)), si(""), sdcSetCombSer({}));
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
    return i.default.createElement(
      "div",
      { className: "flex gap-2" },
      pl.map((r, k) =>
        i.default.createElement(
          "button",
          {
            key: k,
            onClick: () => sdcCombTocar(fa, d === k + 1 ? k : k + 1),
            className: "sdc-chip flex-1 py-3",
            "aria-label":
              "Combate, serie " + (k + 1) + " de " + n + (k < d ? ", hecha" : ", pendiente"),
            style: {
              background: k < d ? "#ff5c7a" : "rgba(255,255,255,0.04)",
              border: "1px solid " + (k < d ? "#ff5c7a" : "rgba(255,255,255,0.18)"),
              color: k < d ? "#0a0e1a" : "#8a93ad",
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              minHeight: 48,
            },
          },
          k < d ? "✓ " + r : r,
        ),
      ),
    );
  }
  function sdcMarcarTodo() {
    let tod = {
      squat: sdcNSets(Aa.squat || 0),
      pushup: sdcNSets(Aa.pushup || 0),
      back: sdcNSets(Aa.back || 0),
      abs: sdcNSets(Aa.abs || 0),
    };
    (sdcSetSer(tod),
      sdcMarcaOk(tod, sdcAjuste, sdcModOk),
      sdcCelebra(),
      sdcSetFlota({ n: sdcTotalMeta() - sdcTotalHechas(), id: Date.now() }));
  }
  function sdcKgVer(g, k) {
    var lo = sdcKgS[g] || {},
      pe = sdcGymSer(e)[g] || {},
      j;
    for (j = k; j >= 1; j--) {
      if (lo[j] !== void 0) return lo[j];
      if (pe[j] !== void 0 && pe[j] !== null && pe[j] !== "") return sdcKgTxt(pe[j]);
    }
    if (lo[0] !== void 0) return lo[0];
    var pv = (sdcGymUlt(e)[sdcEjNom(g)] || {}).kgs;
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
    a(function (N) {
      var _ = clonar(N);
      (_.gymWeights || (_.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        k === 0
          ? (_.gymWeights[g] = num)
          : (_.gymSerieKg || (_.gymSerieKg = {}),
            _.gymSerieKg[g] || (_.gymSerieKg[g] = {}),
            (_.gymSerieKg[g][k] = num)));
      if (_.today) {
        var kk = sdcMarcaK(B, De);
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
    var x = ejercicioDe(g, u.rank, B);
    return (x && x.name) || "";
  }
  function sdcKgUsar(g, kg) {
    var n = sdcNSets(Aa[g] || 0),
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
      n = sdcNSets(Aa[g] || 0);
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
  function pg() {
    let h = sdcRepsHechas(),
      gv = B === "gym" ? sdcGymVol() : null;
    (sdcCelebra(),
      Ne((f) =>
        sdcDeshacerHook(
          f,
          sdcMetaHook(sdcPrimerasHook(registrarRutina(f, De, h, sdcModOk, gv), h), J),
        ),
      ));
  }
  function bg() {
    a((f) => {
      let { state: d, notices: m } = usarDescanso(f);
      return (m && m.length && o((N) => [...N, ...m]), guardarPartida(d), d);
    });
  }
  function yg() {
    a((f) => {
      let { state: d, notices: m } = sdcCruzar(f);
      return (m && m.length && o((N) => [...N, ...m]), guardarPartida(d), d);
    });
  }
  function gg(f) {
    a((d) => {
      let m = clonar(d);
      return ((m.today.modality = f), guardarPartida(m), m);
    });
  }
  function irTienda() {
    a((d) => {
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
    (a((d) => {
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
      o((d) => [
        ...d,
        `Nueva sesión: ${(modalidades.find((r) => r.id === f) || modalidades[0]).name}. Al completarla ganás un bono por combinar estilos.`,
      ]));
  }
  function sdcPonerJuego(f) {
    a((d) => {
      let m = clonar(d);
      return ((m.profile.tituloSet = f), guardarPartida(m), m);
    });
  }
  function sdcCamRitmo(v) {
    a((d) => {
      let m = clonar(d);
      return ((m.profile.ritmoKmH = v), guardarPartida(m), m);
    });
  }
  function sdcCamEmpezar() {
    a((d) => {
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
    a((d) => {
      let m = clonar(d);
      return (m.exploration && (m.exploration.walkStart = 0), guardarPartida(m), m);
    });
  }
  function sdcCamListo(km) {
    (a((d) => {
      let m = clonar(d);
      return (m.exploration && (m.exploration.walkStart = 0), guardarPartida(m), m);
    }),
      Yd(String(km).replace(".", ",")),
      o((d) => [
        ...d,
        "Salida terminada. Puse " +
          String(km).replace(".", ",") +
          " km en el campo: corregilo si hace falta y tocá + Tramo.",
      ]));
  }
  function sdcTravEmpezar() {
    a((d) => {
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
    a((d) => {
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
    (a((d) => {
      let m = clonar(d);
      return (sdcPrimeraAdd(m, tx, "escrita"), guardarPartida(m), m);
    }),
      o((d) => [...d, "Primera vez: " + tx + ". Queda anotado."]));
  }
  function sdcResponderPodia(nm, v) {
    a((d) => {
      let m = clonar(d),
        o2 = {},
        k,
        src = sdcPodia(m);
      for (k in src) o2[k] = src[k];
      return ((o2[nm] = v), (m.podia = o2), guardarPartida(m), m);
    });
  }
  function ef(f) {
    a((d) => {
      let m = clonar(d);
      return ((m.profile.modalities = f.length ? f : ["bodyweight"]), guardarPartida(m), m);
    });
  }
  function vg(f) {
    let d = modalidadesDe(s),
      m = d.includes(f) ? d.filter((N) => N !== f) : [...d, f];
    if (!m.length) {
      o((N) => [...N, "Debes mantener al menos un método activo."]);
      return;
    }
    ef(m);
  }
  function hg() {
    (cu(!1), Ne((f) => sdcDeshacer(f)), Va({ ...J }));
  }
  function mi(f, d) {
    let m = Math.max(0, parseFloat((d || "0").replace(",", ".")) || 0);
    a((N) => {
      let _ = clonar(N);
      return (
        _.gymWeights || (_.gymWeights = { squat: 0, pushup: 0, back: 0, abs: 0 }),
        (_.gymWeights[f] = m),
        guardarPartida(_),
        _
      );
    });
  }
  function xg(f) {
    let d = Math.max(0, parseFloat((f || "0").replace(",", ".")) || 0);
    a((m) => {
      let N = clonar(m);
      return ((N.profile.bodyWeight = d), guardarPartida(N), N);
    });
  }
  function Sg() {
    a((f) => {
      let d = clonar(f);
      return (
        (d.unlockAll = !d.unlockAll),
        d.unlockAll && (d.seenUnlocks = sistemas.map((m) => m.id)),
        guardarPartida(d),
        d
      );
    });
  }
  function Ng(f) {
    a((d) => {
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
  function Cg(f) {
    (a((d) => {
      let m = clonar(d);
      return ((m.profile.weeklyGoal = f), guardarPartida(m), m);
    }),
      Zd(!1));
  }
  let af = [
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
    tf = af.every((f) => H && H.collapsed && H.collapsed[f]);
  function kg() {
    a((f) => {
      let d = clonar(f);
      (d.skills || (d.skills = {}),
        d.care || (d.care = { today: { date: fechaHoy(), done: [] }, lifetime: 0 }),
        d.neuro || (d.neuro = Al()),
        d.unlockAll === void 0 && (d.unlockAll = !1),
        d.disabled || (d.disabled = []),
        d.seenUnlocks ||
          (d.seenUnlocks = sistemas.filter((N) => sistemaAbierto(d, N.id)).map((N) => N.id)),
        d.ui || (d.ui = { collapsed: {} }));
      let m = !tf;
      return (
        af.forEach((N) => {
          d.ui.collapsed[N] = m;
        }),
        guardarPartida(d),
        d
      );
    });
  }
  function fe(f, act) {
    a((d) => {
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
  let me = (f) => !!(H && H.collapsed && H.collapsed[f]);
  (0, i.useEffect)(() => {
    let f = {
      combat: "combat",
      primal: "primal",
      exploration: "exploration",
      achievements: "achievements",
    }[Da];
    f && !sistemaActivo(e, f) && $t("training");
  }, [Da, u.level, u.rank, e.unlockAll]);
  function zg() {
    a((f) => {
      let d = clonar(f);
      return (d.lastWeekSummary && (d.lastWeekSummary.seen = !0), guardarPartida(d), d);
    });
  }
  function Eg(f) {
    Ne((d) => comprar(d, f));
  }
  function Ag() {
    a((f) => {
      let { state: d, notices: m } = completarTravesia(f);
      return (m && m.length && o((N) => [...N, ...m]), guardarPartida(d), d);
    });
  }
  function Dg(f) {
    o((d) => d.filter((m, N) => N !== f));
  }
  function Tg() {
    ((async () => {
      try {
        let f = await window.claude.use("db");
        f && (await f.doc("player/state").delete());
      } catch (f) {
        console.error("No se pudo borrar el progreso", f);
      }
    })(),
      a(null));
  }
  (0, i.useEffect)(() => {
    (async () => Ld(!!(await xy())))();
  }, []);
  function Mg() {
    (async () => {
      let f = await m5(e);
      (Ld(f),
        o((d) => [
          ...d,
          f
            ? "Punto de retorno guardado. Ya podés probar sin miedo."
            : "No se pudo guardar el punto de retorno.",
        ]));
    })();
  }
  function _g() {
    (async () => {
      let f = await xy();
      if (!f) {
        o((N) => [...N, "No hay ningún punto de retorno guardado."]);
        return;
      }
      let { state: d, notices: m } = cargarPartida(f);
      (a(d),
        guardarPartida(d),
        _l(!1),
        ht(!1),
        Ol("idle"),
        o(["Volviste a tu progreso guardado.", ...(m || [])]));
    })();
  }
  function qg(f) {
    (a((d) => {
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
      o((d) => [...d, `[Prueba] Saltaste al rango ${f} para ver sus ejercicios.`]));
  }
  function Og() {
    (a((f) => {
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
      o((f) => [...f, "[Prueba] Umbral forzado disponible y día marcado como completo al 100%."]));
  }
  function jg(f) {
    a((d) => {
      let m = clonar(d);
      m.progress.currentXP += f;
      let N = [];
      return ((m = subirNiveles(m, N)), guardarPartida(m), N.length && o((_) => [..._, ...N]), m);
    });
  }
  function Bg() {
    a((f) => {
      let d = clonar(f),
        m = new Date(d.today.date + "T00:00:00");
      (m.setDate(m.getDate() - 1), (d.today.date = fechaLocal(m)), (d.today.completed = !1));
      let { state: N, notices: _ } = cargarPartida(d);
      return (guardarPartida(N), _.length && o((X) => [...X, ..._]), N);
    });
  }
  function wg() {
    a((f) => {
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
  function Ug() {
    let f = Math.max(0, parseFloat((Xd || "0").replace(",", ".")) || 0);
    f &&
      (a((d) => {
        let { state: m } = sumarTramo(d, f);
        return (guardarPartida(m), m);
      }),
      Yd(""));
  }
  function Lg() {
    let f = Math.max(0, parseInt((Ml || "0").replace(/\D/g, ""), 10) || 0);
    if (!f) return;
    let d = Math.round(((f * vd) / 1e3) * 100) / 100;
    d <= 0 ||
      (a((m) => {
        let { state: N } = sumarTramo(m, d);
        return (guardarPartida(N), N);
      }),
      Gd(""));
  }
  function Hg() {
    a((f) => {
      let { state: d, notices: m } = descartarTramos(f);
      return (m && m.length && o((N) => [...N, ...m]), guardarPartida(d), d);
    });
  }
  function Xg() {
    a((f) => {
      let { state: d, notices: m, found: N } = consolidarKm(f);
      return (
        m && m.length && o((_) => [..._, ...m]),
        N && N.length && ru(N),
        guardarPartida(d),
        d
      );
    });
  }
  function Yg(f) {
    a((d) => {
      let m = sumarTramo(d, f),
        { state: N, notices: _, found: X } = consolidarKm(m.state);
      return (
        _ && _.length && o((de) => [...de, ..._]),
        X && X.length && ru(X),
        guardarPartida(N),
        N
      );
    });
  }
  function Gg() {
    (a((f) => {
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
      o((f) => [...f, "[Prueba] Travesía forzada disponible."]));
  }
  function Zg(f) {
    a((d) => {
      let m = clonar(d);
      ((m.streak.current = f), (m.streak.best = Math.max(m.streak.best || 0, f)));
      let N = revisarLogros(m);
      return (N.notices.length && o((_) => [..._, ...N.notices]), guardarPartida(N.state), N.state);
    });
  }
  function Kg() {
    (a((f) => {
      let d = clonar(f);
      return ((d.achievements = logros.map((m) => m.id)), guardarPartida(d), d);
    }),
      o((f) => [...f, "[Prueba] Todos los logros desbloqueados."]));
  }
  function Vg() {
    (a((f) => {
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
      _l(!1),
      ht(!1),
      o((f) => [...f, `[Prueba] Saltaste al primer Jefe (${za(4).name}).`]));
  }
  function Qg() {
    (a((f) => {
      let d = clonar(f);
      return ((d.combat = Ad()), guardarPartida(d), d);
    }),
      _l(!1),
      ht(!1),
      o((f) => [...f, "[Prueba] Combate reiniciado desde el primer enemigo."]));
  }
  function Wg() {
    (a((f) => {
      let d = clonar(f);
      d.primal.unlockedCount < movimientosPrimal.length &&
        ((d.primal.unlockedCount += 1), (d.primal.masteryProgress = 0));
      let m = revisarLogros(d);
      return (m.notices.length && o((N) => [...N, ...m.notices]), guardarPartida(m.state), m.state);
    }),
      o((f) => [...f, "[Prueba] Desbloqueado el siguiente movimiento de Instinto Primal."]));
  }
  function Jg() {
    (a((f) => {
      let d = clonar(f);
      return ((d.primal.today = { date: fechaHoy(), count: 0 }), guardarPartida(d), d);
    }),
      o((f) => [...f, "[Prueba] Contador diario de Instinto Primal reiniciado."]));
  }
  function Fg() {
    a((f) => {
      let d = clonar(f);
      d.primal.today = { date: fechaHoy(), count: 8 };
      let m = avisoCarga(d);
      return (
        m.notices.length
          ? o((N) => [...N, ...m.notices])
          : o((N) => [
              ...N,
              '[Prueba] Ya se mostró el aviso hoy, usa "reiniciar contador diario" primero.',
            ]),
        guardarPartida(m.state),
        m.state
      );
    });
  }
  let Pg = String(Math.floor(fa / 60)).padStart(2, "0"),
    $g = String(fa % 60).padStart(2, "0");
  return i.default.createElement(
    "div",
    { className: "min-h-screen px-4 py-6", style: { background: "#0a0e1a" } },
    i.default.createElement(
      "div",
      { className: "mx-auto", style: { maxWidth: 420 } },
      i.default.createElement(
        "div",
        { className: "mb-4 flex items-center justify-between gap-3" },
        i.default.createElement(
          "div",
          null,
          i.default.createElement(
            "div",
            { className: "text-xs uppercase", style: { letterSpacing: 2, color: "#4f9dff" } },
            "Dominio Corporal",
          ),
          i.default.createElement(
            "div",
            { className: "text-sm", style: { color: "#9aa4bd" } },
            "Bienvenido de vuelta, ",
            s.name,
          ),
          (() => {
            let cb = sdcCalibre(s);
            return cb
              ? i.default.createElement(
                  "div",
                  {
                    className: "text-xs mt-1",
                    style: {
                      color: "#ffb84f",
                      fontFamily: "Chakra Petch, sans-serif",
                      fontWeight: 700,
                      letterSpacing: 1,
                    },
                  },
                  cb,
                )
              : null;
          })(),
        ),
        i.default.createElement(
          "button",
          {
            onClick: irTienda,
            title: "Puntos de Dominio",
            style: {
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
            },
          },
          i.default.createElement("span", { style: { fontSize: 18, fontWeight: 700 } }, C.points),
          i.default.createElement("span", { style: { fontSize: 10, letterSpacing: 1 } }, "PD"),
        ),
      ),
      i.default.createElement(
        "div",
        { className: "mb-4", style: { position: "relative" } },
        i.default.createElement(
          "div",
          { className: "text-xs mb-1 flex items-center justify-between" },
          i.default.createElement(
            "span",
            {
              style: {
                color: z,
                fontFamily: "Chakra Petch, sans-serif",
                fontWeight: 700,
                letterSpacing: 1,
              },
            },
            "NV. ",
            u.level,
            " · ",
            sdcRango(u.rank, s),
          ),
          i.default.createElement(
            "span",
            { style: { color: "#9aa4bd" } },
            c.completed ? u.currentXP : u.currentXP + sdcTotalHechas(),
            " / ",
            U,
            " XP",
          ),
        ),
        i.default.createElement(BarraXp, {
          value: c.completed ? u.currentXP : u.currentXP + sdcTotalHechas(),
          max: U,
          color: z,
        }),
        sdcFlota &&
          sdcFlota.n > 0 &&
          i.default.createElement(
            "div",
            {
              key: sdcFlota.id,
              className: "sdc-pop",
              style: {
                position: "absolute",
                right: 0,
                top: -6,
                pointerEvents: "none",
                color: z,
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                textShadow: "0 0 12px " + z,
              },
            },
            "+",
            sdcFlota.n,
            " XP",
          ),
        i.default.createElement(
          "div",
          {
            className: "text-xs mt-1 flex items-center justify-between gap-2",
            style: { color: "#7a83a0" },
          },
          i.default.createElement(
            "span",
            null,
            q ? "Umbral: " + Math.min(u.level, q) + "/" + q : "",
          ),
          (() => {
            let f = sistemas.find((d) => !sistemaAbierto(e, d.id));
            return f
              ? i.default.createElement(
                  "span",
                  null,
                  "Próximo: ",
                  i.default.createElement("b", { style: { color: "#9aa4bd" } }, f.name),
                  " en Nv. ",
                  f.level,
                )
              : null;
          })(),
        ),
        p.flexBuff &&
          i.default.createElement(
            "div",
            { className: "text-xs mt-1", style: { color: "#ffb84f" } },
            "Buff de Flexibilidad activo (+10% XP)",
          ),
      ),
      It.length > 0 &&
        i.default.createElement(
          Tarjeta,
          { accent: "#ffb84f", style: { marginBottom: 16 } },
          i.default.createElement(
            "div",
            { className: "text-xs uppercase mb-1", style: { letterSpacing: 2, color: "#ffb84f" } },
            "Hallazgo",
          ),
          i.default.createElement(
            "div",
            {
              style: {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                color: "#e8ecf7",
                fontWeight: 700,
              },
            },
            It[0].name,
          ),
          i.default.createElement(
            "div",
            { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
            It[0].text,
          ),
          i.default.createElement(
            "div",
            {
              className: "mt-3 p-3",
              style: {
                background: "rgba(255,184,79,0.08)",
                border: "1px solid rgba(255,184,79,0.3)",
              },
            },
            i.default.createElement(
              "div",
              { className: "flex items-center gap-2 mb-1" },
              i.default.createElement(IconoDestello, { size: 14, color: "#ffb84f" }),
              i.default.createElement(
                "div",
                { className: "text-sm", style: { color: "#ffb84f", fontWeight: 700 } },
                It[0].relic,
              ),
            ),
            i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#e8ecf7" } },
              It[0].lore,
            ),
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => ru((f) => f.slice(1)),
              className: "w-full py-3 text-sm mt-3",
              style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
            },
            It.length > 1 ? `Siguiente hallazgo (${It.length - 1} más)` : "Archivar en el Códice",
          ),
        ),
      i.default.createElement(Avisos, { notices: n, onDismiss: Dg, onDismissAll: () => o([]) }),
      i.default.createElement(
        Tarjeta,
        { accent: "#ffb84f", style: { marginBottom: 16 } },
        i.default.createElement(
          "div",
          { className: "w-full flex items-center mb-2", style: { justifyContent: "flex-end" } },
          i.default.createElement(
            "button",
            {
              onClick: () => fe("ayuda"),
              style: {
                cursor: "pointer",
                background: "transparent",
                color: "#4f9dff",
                border: "1px solid #4f9dff",
                height: 44,
                padding: "0 14px",
                fontWeight: 700,
                lineHeight: 1,
                fontSize: 13,
              },
            },
            "¿Cómo funciona?",
          ),
        ),
        i.default.createElement(
          "div",
          { className: "flex items-center gap-3" },
          i.default.createElement(DibujoMascota, {
            type: s.pet ? s.pet.type : "dog",
            size: 48,
            color: k5(u.rank),
            rank: u.rank,
          }),
          i.default.createElement(
            "div",
            null,
            i.default.createElement(
              "div",
              {
                style: {
                  fontFamily: "Chakra Petch, sans-serif",
                  color: "#e8ecf7",
                  fontWeight: 700,
                },
              },
              s.pet && s.pet.name ? s.pet.name : "Tu compañero",
            ),
            i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#9aa4bd" } },
              $y,
            ),
          ),
        ),
        i.default.createElement(
          "button",
          {
            onClick: () => Iy(ou[Math.floor(Math.random() * ou.length)]),
            className: "text-xs underline",
            style: {
              color: "#ffb84f",
              display: "inline-block",
              padding: "15px 8px",
              margin: "-7px -8px -15px -8px",
            },
          },
          "Otro consejo",
        ),
      ),
      H &&
        H.collapsed &&
        H.collapsed.ayuda &&
        i.default.createElement(
          Plegable,
          {
            id: "ayuda",
            title: "¿Cómo funciona?",
            accent: "#8a93ad",
            style: { marginBottom: 16 },
            collapsed: !1,
            onToggle: fe,
            right: `${guia.length} temas`,
          },
          i.default.createElement(
            "div",
            { style: { fontSize: 14, lineHeight: 1.5, color: "#9aa4bd" } },
            "Tocá cualquier tema para leerlo. Si recién empezás, los tres primeros son los que importan.",
          ),
          (() => {
            let sdcGv = "";
            return guia.map((m) => {
              let sdcAb = !!sdcTema[m.title],
                sdcNu = m.g !== sdcGv;
              sdcGv = m.g;
              return i.default.createElement(
                "div",
                { key: m.title },
                sdcNu
                  ? i.default.createElement(
                      "div",
                      {
                        className: "text-xs uppercase",
                        style: {
                          letterSpacing: 2,
                          color: "#7a83a0",
                          marginTop: 16,
                          marginBottom: 2,
                          paddingTop: 12,
                          borderTop: "1px solid rgba(255,255,255,0.14)",
                        },
                      },
                      m.g,
                    )
                  : null,
                i.default.createElement(
                  "div",
                  { style: { borderBottom: "1px solid rgba(255,255,255,0.06)" } },
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => sdcSetTema((d) => ({ ...d, [m.title]: !d[m.title] })),
                      className: "w-full flex items-center justify-between text-left",
                      style: {
                        background: "transparent",
                        border: "none",
                        padding: "14px 0",
                        color: "inherit",
                        gap: 10,
                      },
                    },
                    i.default.createElement(
                      "span",
                      {
                        style: {
                          fontSize: 16,
                          lineHeight: 1.3,
                          color: sdcAb ? "#e8ecf7" : "#b6c0d8",
                          fontWeight: 600,
                        },
                      },
                      m.title,
                    ),
                    i.default.createElement(
                      "span",
                      {
                        style: {
                          display: "inline-block",
                          flexShrink: 0,
                          transform: sdcAb ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform .2s",
                        },
                      },
                      i.default.createElement(IconoFlecha, { size: 16, color: "#7a83a0" }),
                    ),
                  ),
                  sdcAb
                    ? i.default.createElement(
                        "div",
                        {
                          style: {
                            fontSize: 15,
                            lineHeight: 1.65,
                            color: "#c8d0e4",
                            paddingBottom: 16,
                            paddingRight: 2,
                          },
                        },
                        m.text,
                      )
                    : null,
                ),
              );
            });
          })(),
        ),
      H &&
        H.collapsed &&
        H.collapsed.tienda &&
        i.default.createElement(
          Plegable,
          {
            id: "tienda",
            title: "Puntos de Dominio",
            accent: "#7c5cff",
            style: { marginBottom: 16 },
            collapsed: !1,
            onToggle: fe,
            right: `${C.points} PD`,
          },
          i.default.createElement(
            "div",
            { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
            "Ganás 3 puntos el día que completás tu rutina al 100%, o 1 punto si llegás al menos a la mitad. Solo cuenta la primera sesión de cada día: los estilos extra dan XP, pero no más puntos.",
          ),
          C.shields > 0 &&
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#7c5cff" } },
              "Escudos de Racha disponibles: ",
              C.shields,
            ),
          C.xpBuffDate === fechaHoy() &&
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#ffb84f" } },
              "Impulso de XP activo hoy (+" +
                Math.round(((C.xpBuffMult || 1.25) - 1) * 100) +
                "%).",
            ),
          i.default.createElement(
            "div",
            { className: "mt-2" },
            tienda.map((m) => {
              let N = C.points >= m.cost;
              return i.default.createElement(
                "div",
                {
                  key: m.id,
                  className: "py-2",
                  style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
                },
                i.default.createElement(
                  "div",
                  { className: "flex items-center justify-between gap-2" },
                  i.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    i.default.createElement(
                      "div",
                      { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                      m.name,
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs", style: { color: "#9aa4bd" } },
                      m.desc,
                    ),
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => Eg(m.id),
                      disabled: !N,
                      className: "py-2 px-3 text-xs disabled:opacity-40",
                      style: {
                        background: N ? "#7c5cff" : "rgba(255,255,255,0.05)",
                        border: "1px solid #7c5cff",
                        color: N ? "#0a0e1a" : "#9aa4bd",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      },
                    },
                    m.cost,
                    " PD",
                  ),
                ),
              );
            }),
          ),
        ),
      i.default.createElement(
        "div",
        { className: "flex justify-end mb-2" },
        i.default.createElement(
          "button",
          {
            onClick: kg,
            className: "text-xs",
            style: { color: "#9aa4bd", padding: "15px 8px", margin: "-15px -8px" },
          },
          tf ? "Expandir todo" : "Minimizar todo",
        ),
      ),
      (() => {
        let f = [
          { id: "training", label: "Entreno", icon: IconoPesa, color: z, on: !0 },
          {
            id: "combat",
            label: "Combate",
            icon: IconoEspadas,
            color: "#ff5c7a",
            on: sistemaActivo(e, "combat"),
          },
          {
            id: "primal",
            label: "Primal",
            icon: IconoPata,
            color: "#3ecf8e",
            on: sistemaActivo(e, "primal"),
          },
          {
            id: "exploration",
            label: "Explorar",
            icon: IconoPasos,
            color: "#7c5cff",
            on: sistemaActivo(e, "exploration"),
          },
          {
            id: "achievements",
            label: "Logros",
            icon: IconoTrofeo,
            color: "#ffb84f",
            on: sistemaActivo(e, "achievements"),
          },
          { id: "profile", label: "Perfil", icon: IconoPersona, color: "#4f9dff", on: !0 },
        ].filter((d) => d.on);
        return i.default.createElement(
          "div",
          { className: "grid grid-cols-3 gap-1 mb-4" },
          f.map((d) => {
            let m = d.icon,
              N = Da === d.id;
            return i.default.createElement(
              "button",
              {
                key: d.id,
                onClick: () => $t(d.id),
                className: "flex items-center justify-center gap-1 py-2 text-xs",
                style: {
                  minHeight: 48,
                  background: N ? d.color : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: N ? "#0a0e1a" : "#8a93ad",
                  fontWeight: 600,
                },
              },
              i.default.createElement(m, { size: 13 }),
              " ",
              d.label,
            );
          }),
        );
      })(),
      Da === "training" &&
        i.default.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column" } },
          sdcAvisaRespaldo(e) &&
            i.default.createElement(
              Tarjeta,
              { accent: "#ffb84f", style: { marginBottom: 16, order: -3 } },
              i.default.createElement(
                "div",
                { className: "text-sm mb-1", style: { color: "#ffb84f", fontWeight: 700 } },
                "Hacé un respaldo",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Tu progreso vive solo en este dispositivo. Si borrás los datos del navegador o cambiás de teléfono se pierde todo: no hay copia en ningún servidor.",
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => bkDescargar(),
                    className: "flex-1 py-3 text-xs",
                    style: {
                      minHeight: 48,
                      background: "#ffb84f",
                      color: "#0a0e1a",
                      fontWeight: 700,
                    },
                  },
                  "Descargar respaldo",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      (sdcRespaldoPosponer(),
                        o((d) => [...d, "Te vuelvo a recordar lo del respaldo en una semana."]));
                    },
                    className: "py-3 px-3 text-xs",
                    style: {
                      minHeight: 48,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#9aa4bd",
                    },
                  },
                  "Más tarde",
                ),
              ),
            ),
          D &&
            !D.seen &&
            i.default.createElement(
              Tarjeta,
              { accent: "#ffb84f", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Chakra Petch, sans-serif",
                    color: "#ffb84f",
                    fontWeight: 700,
                  },
                  className: "mb-2",
                },
                "Informe de la semana anterior",
              ),
              i.default.createElement(
                "div",
                { className: "grid grid-cols-2 gap-2 text-sm mb-3" },
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement(
                    "span",
                    { style: { color: "#9aa4bd" } },
                    "Días entrenados",
                  ),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.trained),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement(
                    "span",
                    { style: { color: "#9aa4bd" } },
                    "Días perfectos",
                  ),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.fullDays),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement("span", { style: { color: "#9aa4bd" } }, "XP ganada"),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.xp),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Travesías"),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.dungeons),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Primal"),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.primal),
                ),
                i.default.createElement(
                  "div",
                  { className: "flex justify-between" },
                  i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Estiramientos"),
                  i.default.createElement("span", { style: { color: "#e8ecf7" } }, D.stretches),
                ),
              ),
              i.default.createElement(
                "button",
                {
                  onClick: zg,
                  className: "w-full py-2 text-xs",
                  style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                },
                "Entendido",
              ),
            ),
          i.default.createElement(
            Plegable,
            {
              id: "racha",
              title: "Constancia",
              accent: "#3ecf8e",
              style: { marginBottom: 16 },
              collapsed: H && H.collapsed && H.collapsed.racha !== void 0 ? me("racha") : !0,
              onToggle: fe,
              right: `${al}/${Re} esta semana`,
            },
            i.default.createElement(
              "div",
              { className: "flex items-center justify-between mb-2" },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2" },
                i.default.createElement(IconoLlama, {
                  size: 18,
                  color: al >= Re ? "#ff5c7a" : "#5a6178",
                }),
                i.default.createElement(
                  "div",
                  null,
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    al,
                    " de ",
                    Re,
                    " sesiones",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Racha semanal: ",
                    e.weeklyStreak || 0,
                    " · récord ",
                    e.bestWeeklyStreak || 0,
                  ),
                ),
              ),
              i.default.createElement(
                "button",
                {
                  onClick: () => Zd((f) => !f),
                  className: "text-xs underline",
                  style: { color: "#9aa4bd" },
                },
                "Cambiar meta",
              ),
            ),
            i.default.createElement(BarraXp, {
              value: Math.min(al, Re),
              max: Re,
              color: "#3ecf8e",
            }),
            i.default.createElement(
              "div",
              { className: "text-xs mt-2", style: { color: "#9aa4bd" } },
              al >= Re
                ? "Meta semanal cumplida. Todo lo que entrenes de más es ganancia."
                : `Te quedan ${diasRestantesSemana(c.date)} días para completar ${Re - al} ${Re - al === 1 ? "sesión" : "sesiones"}.`,
            ),
            Wy &&
              i.default.createElement(
                "div",
                {
                  className: "mt-3 p-2",
                  style: {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  },
                },
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                  "¿Cuántas sesiones querés hacer por semana? Solo se corta tu racha si ya no podés alcanzarla.",
                ),
                i.default.createElement(
                  "div",
                  { className: "grid grid-cols-7 gap-1" },
                  [1, 2, 3, 4, 5, 6, 7].map((f) =>
                    i.default.createElement(
                      "button",
                      {
                        key: f,
                        onClick: () => Cg(f),
                        className: "py-2 text-xs",
                        style: {
                          background: Re === f ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                          border: "1px solid " + (Re === f ? "#3ecf8e" : "rgba(255,255,255,0.15)"),
                          color: Re === f ? "#0a0e1a" : "#9aa4bd",
                          fontWeight: 700,
                        },
                      },
                      f,
                    ),
                  ),
                ),
              ),
            i.default.createElement(
              "div",
              { className: "mt-3" },
              i.default.createElement(
                "div",
                { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                "Racha diaria: ",
                p.current,
                " día",
                p.current === 1 ? "" : "s",
                " · récord ",
                p.best,
              ),
              i.default.createElement(GrillaConstancia, {
                days: Id,
                onPick: (f) => Kd((d) => (d === f ? null : f)),
                selected: Bn,
              }),
              Bn &&
                i.default.createElement(DetalleDia, {
                  date: Bn,
                  status: (Id.find((f) => f.date === Bn) || {}).status,
                  log: (e.dayLog || {})[Bn],
                  animo: sdcAnimo(e)[Bn],
                  onClose: () => Kd(null),
                  onLog: (function () {
                    var sq = (Id.find((f) => f.date === Bn) || {}).status;
                    return Bn < fechaHoy() &&
                      (sq === "empty" || sq === "skipped" || sq === "missed")
                      ? function (fx) {
                          (Ne((dd) => sdcDiaPasado(dd, fx)), Kd(null));
                        }
                      : null;
                  })(),
                }),
              (() => {
                let sdcLeg = [
                  { label: "Completo", color: bt.full, k: "full" },
                  { label: "Parcial", color: bt.partial, k: "partial" },
                  { label: "Descanso", color: bt.rest, k: "rest" },
                  { label: "Sin entrenar", color: bt.skipped, k: "skipped" },
                  { label: "Escudo", color: bt.shield, k: "shield" },
                  { label: "Fuera de meta", color: bt.missed, k: "missed" },
                  {
                    label: "Hoy",
                    color: bt.pending,
                    k: "pending",
                    borde: "1px dashed rgba(255,255,255,0.3)",
                  },
                  {
                    label: "Sin registro",
                    color: bt.empty,
                    k: "empty",
                    borde: "1px solid rgba(255,255,255,0.12)",
                  },
                ].filter((sdcZ) => Id.some((sdcD) => sdcD.status === sdcZ.k));
                return sdcLeg.length
                  ? i.default.createElement(LeyendaConstancia, { items: sdcLeg })
                  : null;
              })(),
            ),
            sistemaActivo(e, "missions") &&
              e.missions &&
              i.default.createElement(
                "div",
                { className: "mt-3" },
                ["week", "month"].map((amb) => {
                  let m = amb === "week" ? e.missions.weekly : e.missions.monthly;
                  if (!m) return null;
                  let hecho = amb === "week" ? e.missions.weeklyDone : e.missions.monthlyDone,
                    pr = Math.min(m.target, misProgreso(e, m, amb)),
                    pct = Math.round((pr / m.target) * 100);
                  return i.default.createElement(
                    "div",
                    {
                      key: amb,
                      className: "mb-2 p-2",
                      style: {
                        background: "rgba(255,255,255,0.03)",
                        border:
                          "1px solid " +
                          (hecho ? "rgba(62,207,142,0.35)" : "rgba(255,184,79,0.25)"),
                      },
                    },
                    i.default.createElement(
                      "div",
                      { className: "flex justify-between text-xs mb-1" },
                      i.default.createElement(
                        "span",
                        { style: { color: hecho ? "#3ecf8e" : "#ffb84f", fontWeight: 700 } },
                        amb === "week" ? "Misión semanal" : "Misión mensual",
                      ),
                      i.default.createElement(
                        "span",
                        { style: { color: "#9aa4bd" } },
                        hecho ? "Completada" : pr + " / " + m.target,
                      ),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-1", style: { color: "#e8ecf7" } },
                      misTexto(m, amb),
                    ),
                    i.default.createElement(
                      "div",
                      { style: { height: 4, background: "#161b2e" } },
                      i.default.createElement("div", {
                        style: {
                          height: 4,
                          width: pct + "%",
                          background: hecho ? "#3ecf8e" : "#ffb84f",
                          transition: "width .3s",
                        },
                      }),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-1", style: { color: "#7a83a0" } },
                      "Recompensa: +" + m.xp + " XP y +" + m.pd + " PD",
                    ),
                  );
                }),
              ),
          ),
          sistemaActivo(e, "dungeon") &&
            y.available &&
            !y.completed &&
            i.default.createElement(
              Tarjeta,
              { accent: "#ff5c7a", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2 mb-2" },
                i.default.createElement(IconoEspadas, { color: "#ff5c7a", size: 18 }),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      color: "#ff5c7a",
                      fontWeight: 700,
                    },
                  },
                  "Travesía de hoy",
                ),
              ),
              i.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Chakra Petch, sans-serif",
                    color: "#e8ecf7",
                    fontWeight: 700,
                    fontSize: 18,
                  },
                },
                y.name,
              ),
              i.default.createElement(
                "div",
                { className: "text-sm mt-2 mb-2", style: { color: "#e8ecf7" } },
                "Desafío: ",
                y.challengeText,
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Recompensa: +",
                y.rewardXP,
                " XP",
              ),
              (function () {
                var ini = (e.dungeon && e.dungeon.startedAt) || 0,
                  rit = sdcTravRitmo(y.name);
                if (!ini)
                  return i.default.createElement(
                    i.default.Fragment,
                    null,
                    i.default.createElement(
                      "button",
                      {
                        onClick: sdcTravEmpezar,
                        className: "w-full flex items-center justify-center gap-2 py-3 text-sm",
                        style: {
                          minHeight: 48,
                          background: "#ff5c7a",
                          color: "#0a0e1a",
                          fontWeight: 700,
                        },
                      },
                      i.default.createElement(IconoEspadas, { size: 16 }),
                      " Empezar la travesía",
                    ),
                    i.default.createElement(
                      "button",
                      {
                        onClick: Ag,
                        className: "w-full text-xs underline mt-2",
                        style: { minHeight: 44, color: "#9aa4bd" },
                      },
                      "Ya la hice, sin el teléfono",
                    ),
                  );
                return i.default.createElement(CronoTravesia, {
                  inicio: ini,
                  mins: sdcTravMin(y.challengeText),
                  on: rit.on,
                  off: rit.off,
                  onCancel: sdcTravCancelar,
                  onListo: Ag,
                });
              })(),
            ),
          sistemaActivo(e, "dungeon") &&
            y.available &&
            y.completed &&
            i.default.createElement(
              Tarjeta,
              { accent: "#ff5c7a", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2 text-sm", style: { color: "#ff5c7a" } },
                i.default.createElement(IconoCheck, { size: 16 }),
                " Travesía completada: ",
                y.name,
                " (+",
                y.rewardXP,
                " XP)",
              ),
            ),
          sistemaActivo(e, "dungeon") &&
            !y.available &&
            i.default.createElement(
              "div",
              { className: "text-xs text-center mb-4", style: { color: "#7a83a0" } },
              "Hoy no hay travesía. Volvé mañana.",
            ),
          v.pending &&
            i.default.createElement(
              Tarjeta,
              { accent: "#ffb84f", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2 mb-2" },
                i.default.createElement(IconoDestello, { color: "#ffb84f", size: 18 }),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      color: "#ffb84f",
                      fontWeight: 700,
                    },
                  },
                  "Umbral disponible",
                ),
              ),
              (() => {
                let f = sdcUmbralPrueba(e, B);
                return i.default.createElement(
                  "div",
                  { className: "mb-3" },
                  i.default.createElement(
                    "div",
                    { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
                    f.rounds,
                    " rondas encadenadas, con los ejercicios de ",
                    sdcRango(f.rango, s),
                    ":",
                  ),
                  ["squat", "pushup", "back", "abs"].map((d) =>
                    i.default.createElement(
                      "div",
                      { key: d, className: "text-sm", style: { color: "#9aa4bd" } },
                      f.reps[d],
                      " × ",
                      f.nombres[d],
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-2", style: { color: "#ffb84f" } },
                    f.note,
                  ),
                );
              })(),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Hacela de verdad y después confirmala acá. Si no te salen, todavía no cruces: seguí entrenando en este rango.",
              ),
              i.default.createElement(
                "div",
                {
                  className: "text-xs mb-3",
                  style: { color: sdcUmbralFalta(e) > 0 ? "#ffb84f" : "#3ecf8e" },
                },
                "Rutinas completas en este rango: ",
                Math.min(sdcRangoCompletas(e), sdcUmbralMin),
                " de ",
                sdcUmbralMin,
                ".",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: yg,
                  disabled: !(c.completed && c.fullCompletion) || sdcUmbralFalta(e) > 0,
                  className:
                    "w-full flex items-center justify-center gap-2 py-3 text-sm disabled:opacity-40",
                  style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                },
                i.default.createElement(IconoCheck, { size: 16 }),
                " Crucé el Umbral",
              ),
              sdcUmbralFalta(e) > 0
                ? i.default.createElement(
                    "div",
                    { className: "text-xs mt-2 text-center", style: { color: "#9aa4bd" } },
                    sdcFaltanTxt(sdcUmbralFalta(e)),
                  )
                : !(c.completed && c.fullCompletion) &&
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-2 text-center", style: { color: "#9aa4bd" } },
                      "Completá tu rutina al 100% hoy para poder cruzar tu Umbral.",
                    ),
            ),
          (function () {
            var gs = ["squat", "pushup", "back", "abs"],
              pd = sdcPodia(e),
              pend = null;
            for (var q = 0; q < gs.length; q++) {
              var ex = ejercicioDe(gs[q], u.rank, B);
              if (ex && ex.name && pd[ex.name] === void 0) {
                pend = ex.name;
                break;
              }
            }
            if (!pend) return null;
            return i.default.createElement(
              Tarjeta,
              { accent: "#b084f5", style: { marginBottom: 16, order: -1 } },
              i.default.createElement(
                "div",
                {
                  className: "text-xs uppercase mb-1",
                  style: { letterSpacing: 2, color: "#b084f5" },
                },
                "Una pregunta",
              ),
              i.default.createElement(
                "div",
                { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 700 } },
                "¿Alguna vez hiciste " + pend + "?",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Te lo pregunto una sola vez. Si nunca pudiste, el día que lo hagas queda anotado como una primera vez.",
              ),
              i.default.createElement(
                "div",
                { className: "grid grid-cols-2 gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: function () {
                      sdcResponderPodia(pend, !1);
                    },
                    className: "py-2 text-xs",
                    style: {
                      minHeight: 44,
                      background: "rgba(176,132,245,0.15)",
                      border: "1px solid #b084f5",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Nunca pude",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: function () {
                      sdcResponderPodia(pend, !0);
                    },
                    className: "py-2 text-xs",
                    style: {
                      minHeight: 44,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#9aa4bd",
                    },
                  },
                  "Ya podía",
                ),
              ),
            );
          })(),
          i.default.createElement(
            Plegable,
            {
              id: "mapa",
              title: "Tu cuerpo",
              accent: "#5a6178",
              style: { marginBottom: 16, order: c.completed ? -4 : -2 },
              collapsed: H && H.collapsed && H.collapsed.mapa !== void 0 ? me("mapa") : !1,
              onToggle: fe,
              right:
                ma === "desarrollo"
                  ? `Nv. medio ${Math.round(Hn.reduce((f, d) => f + Wa.levels[d], 0) / 4)}`
                  : ma === "semana"
                    ? `${Math.round((Hn.reduce((f, d) => f + Math.min(1, ((r.reps && r.reps[d]) || 0) / Pd(d)), 0) / 4) * 100)}% semana`
                    : "hoy",
            },
            i.default.createElement(
              "div",
              { className: "grid grid-cols-3 gap-1 mb-2" },
              [
                ["desarrollo", "Desarrollo"],
                ["semana", "Semana"],
                ["hoy", "Hoy"],
              ].map(([f, d]) =>
                i.default.createElement(
                  "button",
                  {
                    key: f,
                    onClick: () => Hy(f),
                    className: "py-2 text-xs",
                    style: {
                      background: ma === f ? "#ff6b4a" : "rgba(255,255,255,0.03)",
                      border: "1px solid " + (ma === f ? "#ff6b4a" : "rgba(255,255,255,0.12)"),
                      color: ma === f ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    },
                  },
                  d,
                ),
              ),
            ),
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#7a83a0" } },
              ma === "desarrollo"
                ? "Cuánto construiste en cada patrón desde que empezaste. No se reinicia nunca."
                : ma === "semana"
                  ? "Qué trabajaste esta semana frente a tu meta de " + Re + " sesiones."
                  : "Progreso de la rutina de hoy.",
            ),
            i.default.createElement(
              "div",
              { className: "flex items-center justify-end mb-2" },
              i.default.createElement(
                "div",
                { className: "flex gap-1" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => Hd("front"),
                    className: "px-2 py-1 text-xs",
                    style: {
                      background: jn === "front" ? "rgba(255,255,255,0.1)" : "transparent",
                      color: jn === "front" ? "#e8ecf7" : "#5a6178",
                      border: "1px solid rgba(255,255,255,0.12)",
                    },
                  },
                  "Frente",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => Hd("back"),
                    className: "px-2 py-1 text-xs",
                    style: {
                      background: jn === "back" ? "rgba(255,255,255,0.1)" : "transparent",
                      color: jn === "back" ? "#e8ecf7" : "#5a6178",
                      border: "1px solid rgba(255,255,255,0.12)",
                    },
                  },
                  "Espalda",
                ),
              ),
            ),
            i.default.createElement(FiguraCuerpo, {
              view: jn,
              colors: $d,
              glow: c.stretchDone,
              ratios: ma === "hoy" ? tg : null,
              selected: vt,
              onSelect: su,
            }),
            i.default.createElement(
              "div",
              { className: "grid grid-cols-2 gap-x-3 gap-y-1 mt-3" },
              Hn.map((f) =>
                i.default.createElement(
                  "button",
                  {
                    key: f,
                    onClick: () => su(vt === f ? null : f),
                    className: "flex items-center justify-between text-xs py-1",
                    style: { background: "transparent", border: "none" },
                  },
                  i.default.createElement(
                    "span",
                    { className: "flex items-center gap-2", style: { color: "#9aa4bd" } },
                    i.default.createElement("span", {
                      style: {
                        width: 10,
                        height: 10,
                        background: $d[f],
                        display: "inline-block",
                        flexShrink: 0,
                      },
                    }),
                    gruposCuerpo[f].label.split(" ")[0],
                  ),
                  i.default.createElement(
                    "span",
                    { style: { color: "#e8ecf7" } },
                    ma === "desarrollo"
                      ? "Nv. " + Wa.levels[f]
                      : ma === "semana"
                        ? (r.reps && r.reps[f]) || 0
                        : (Rt[f] || 0) + "/" + (sdcMt[f] || 0),
                  ),
                ),
              ),
            ),
            Wa.gap >= 2 &&
              i.default.createElement(
                "div",
                {
                  className: "text-xs mt-3 p-2",
                  style: {
                    color: "#ffb84f",
                    background: "rgba(255,184,79,0.08)",
                    border: "1px solid rgba(255,184,79,0.25)",
                  },
                },
                "Desequilibrio detectado: tu ",
                gruposCuerpo[Wa.hi].label.toLowerCase(),
                " va ",
                Wa.gap,
                " niveles por delante de tu ",
                gruposCuerpo[Wa.lo].label.toLowerCase(),
                ". Prioriza ese patrón para emparejarlo.",
              ),
            (() => {
              let f = Hn.map((d) => ({ k: d, d: wd(h ? h[d] : null, c.date) })).filter(
                (d) => d.d === null || d.d >= 4,
              );
              return !f.length || Wa.gap >= 2
                ? null
                : i.default.createElement(
                    "div",
                    {
                      className: "text-xs mt-3 p-2",
                      style: {
                        color: "#9aa4bd",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      },
                    },
                    "Sin estímulo reciente: ",
                    f.map((d) => gruposCuerpo[d.k].label.toLowerCase()).join(", "),
                    ".",
                  );
            })(),
            vt &&
              i.default.createElement(PanelZonas, {
                zoneKey: vt,
                rank: Y,
                classification: s.classification,
                lifetime: T[vt] || 0,
                target: sdcMt[vt] || 0,
                doneToday: Rt[vt] || 0,
                lastTrained: h ? h[vt] : null,
                today: c.date,
                modality: B,
                onClose: () => su(null),
              }),
            c.stretchDone &&
              i.default.createElement(
                "div",
                { className: "flex items-center gap-1 mt-2 text-xs", style: { color: "#3ecf8e" } },
                i.default.createElement(IconoDestello, { size: 12 }),
                " Brillo de recuperación activo por tu estiramiento de hoy",
              ),
          ),
          sdcAnimoOn(e) &&
            !c.completed &&
            !(c.doneModalities || []).length &&
            sdcTotalHechas() === 0 &&
            !sdcCalor(e).ini &&
            !sdcCalor(e).hecho &&
            (function (h) {
              return !h.no;
            })(sdcAnimoHoy(e)) &&
            i.default.createElement(
              Tarjeta,
              { accent: "#4f9dff", style: { marginBottom: 16, order: -6 } },
              i.default.createElement(AnimoAntes, {
                st: e,
                Ne: Ne,
                mod: B,
                onModo: On,
                descLibre: !r.restDayUsed,
                onDescanso: bg,
              }),
            ),
          !c.completed &&
            i.default.createElement(
              Plegable,
              {
                id: "calentamiento",
                title: "Calentamiento",
                accent: "#ff8f5a",
                style: { marginBottom: 16, order: -5 },
                collapsed:
                  H && H.collapsed && H.collapsed.calentamiento !== void 0
                    ? me("calentamiento")
                    : !1,
                onToggle: fe,
                right: sdcCalorDer(e, B, Aa),
              },
              i.default.createElement(Calentamiento, {
                st: e,
                mod: B,
                metas: Aa,
                Ne: Ne,
                onModo: On,
                sinSeries: sdcTotalHechas() === 0,
              }),
            ),
          c.completed
            ? i.default.createElement(
                Tarjeta,
                { accent: z, style: { marginBottom: 16, order: -1 } },
                sdcAnimoOn(e) &&
                  c.mode !== "rest" &&
                  i.default.createElement(AnimoDespues, {
                    st: e,
                    Ne: Ne,
                    onPrueba: () => {
                      ($t("profile"), Ne((d) => sdcAbrirCard(d, "aptitud")));
                    },
                  }),
                i.default.createElement(
                  "div",
                  { className: "flex items-center gap-2 mb-1" },
                  i.default.createElement(IconoCheck, { size: 16, color: z }),
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Misión de hoy completada",
                  ),
                ),
                i.default.createElement(
                  "div",
                  { className: "text-xs", style: { color: "#9aa4bd" } },
                  "Modo: ",
                  c.mode === "normal"
                    ? "Normal"
                    : c.mode === "recovery"
                      ? "Recuperación"
                      : c.mode === "rest"
                        ? "Descanso"
                        : "Prueba",
                  " · +",
                  c.xpEarned,
                  " XP hoy",
                ),
                c.fullCompletion &&
                  i.default.createElement(
                    "div",
                    {
                      className: "flex items-center gap-1 mt-2 text-xs",
                      style: { color: "#ffb84f" },
                    },
                    i.default.createElement(IconoDestello, { size: 12 }),
                    " Día perfecto — hoy podés cruzar tu Umbral si está disponible",
                  ),
                (() => {
                  let rp = c.reps || {},
                    rc = e.records || {},
                    wk = (r && r.reps) || {},
                    gs = [
                      ["squat", "Piernas"],
                      ["pushup", "Empuje"],
                      ["back", "Tracción"],
                      ["abs", "Core"],
                    ],
                    tot = gs.reduce((ac, g) => ac + (rp[g[0]] || 0), 0);
                  if (!tot) return null;
                  let sem = gs.reduce((ac, g) => ac + (wk[g[0]] || 0), 0);
                  return i.default.createElement(
                    "div",
                    {
                      className: "mt-3 pt-3",
                      style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
                    },
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "Lo que hiciste hoy: ",
                      i.default.createElement("b", { style: { color: "#e8ecf7" } }, tot, " reps"),
                    ),
                    gs.map((g) => {
                      let v = rp[g[0]] || 0,
                        mx = rc[g[0]] || 0,
                        pr = v > 0 && v >= mx && (T[g[0]] || 0) > v;
                      return i.default.createElement(
                        "div",
                        { key: g[0], className: "flex items-center justify-between text-xs mb-1" },
                        i.default.createElement(
                          "span",
                          { style: { color: pr ? "#ffb84f" : "#8a93ad" } },
                          g[1],
                          pr ? " ★ récord" : "",
                        ),
                        i.default.createElement(
                          "span",
                          { style: { color: "#e8ecf7" } },
                          v,
                          i.default.createElement(
                            "span",
                            { style: { color: "#7a83a0" } },
                            " / ",
                            mx,
                            " máx",
                          ),
                        ),
                      );
                    }),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-2", style: { color: "#7a83a0" } },
                      "Esta semana: ",
                      sem,
                      " reps en ",
                      r.trained || 0,
                      " ",
                      (r.trained || 0) === 1 ? "sesión" : "sesiones",
                    ),
                  );
                })(),
                (() => {
                  let hechas = c.doneModalities || [],
                    restan = modalidadesDe(s).filter((id) => !hechas.includes(id));
                  if (!restan.length) return null;
                  return i.default.createElement(
                    "div",
                    { className: "mt-3" },
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "Añade otro estilo hoy y esa sesión te dará +" +
                        25 * hechas.length +
                        "% de XP:",
                    ),
                    i.default.createElement(
                      "div",
                      { className: "flex gap-2" },
                      restan.map((id) =>
                        i.default.createElement(
                          "button",
                          {
                            key: id,
                            onClick: () => mmNueva(id),
                            className: "flex-1 py-2 text-xs",
                            style: {
                              background: "rgba(79,157,255,0.12)",
                              border: "1px solid #4f9dff",
                              color: "#4f9dff",
                              fontWeight: 600,
                            },
                          },
                          "+ ",
                          id === "bodyweight"
                            ? "Peso corporal"
                            : id === "gym"
                              ? "Gimnasio"
                              : "Flow",
                        ),
                      ),
                    ),
                  );
                })(),
                e.undoSnapshot &&
                  e.undoSnapshot.date === c.date &&
                  (Jy
                    ? i.default.createElement(
                        "div",
                        { className: "text-xs text-center mt-3", style: { color: "#9aa4bd" } },
                        "Se revertirá el XP, los puntos y los récords de esta rutina.",
                        " ",
                        i.default.createElement(
                          "button",
                          { onClick: hg, className: "underline", style: { color: "#ff5c7a" } },
                          "Sí, deshacer",
                        ),
                        " ",
                        i.default.createElement(
                          "button",
                          { onClick: () => cu(!1), className: "underline" },
                          "Cancelar",
                        ),
                      )
                    : i.default.createElement(
                        "button",
                        {
                          onClick: () => cu(!0),
                          className: "w-full py-2 text-xs mt-3",
                          style: {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.28)",
                            color: "#e8ecf7",
                            fontWeight: 600,
                          },
                        },
                        "Deshacer registro de hoy",
                      )),
              )
            : i.default.createElement(
                Plegable,
                {
                  id: "rutina",
                  title: "Rutina de hoy",
                  accent: z,
                  style: { marginBottom: 16, order: -4 },
                  collapsed: me("rutina"),
                  onToggle: fe,
                  right: `${(modalidades.find((f) => f.id === B) || modalidades[0]).name}`,
                },
                i.default.createElement(
                  "div",
                  { className: "flex mb-3", style: { border: "1px solid rgba(255,255,255,0.12)" } },
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => On("normal"),
                      className: "flex-1 py-2 text-xs",
                      style: {
                        background: De === "normal" ? z : "transparent",
                        color: De === "normal" ? "#0a0e1a" : "#8a93ad",
                        fontWeight: 600,
                        minHeight: 44,
                      },
                    },
                    "Normal",
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => On("recovery"),
                      className: "flex-1 py-2 text-xs",
                      style: {
                        background: De === "recovery" ? z : "transparent",
                        color: De === "recovery" ? "#0a0e1a" : "#8a93ad",
                        fontWeight: 600,
                        minHeight: 44,
                      },
                    },
                    "Recuperación",
                  ),
                ),
                modalidadesDe(s).length > 1
                  ? i.default.createElement(
                      "div",
                      { className: "mb-2" },
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                        "¿Con qué entrenás hoy?",
                      ),
                      i.default.createElement(
                        "div",
                        { className: "grid grid-cols-3 gap-1" },
                        modalidadesDe(s).map((f) => {
                          let d = modalidades.find((N) => N.id === f),
                            m = B === f;
                          return i.default.createElement(
                            "button",
                            {
                              key: f,
                              onClick: () => gg(f),
                              className: "py-2 text-xs",
                              style: {
                                background: m ? "#4f9dff" : "rgba(255,255,255,0.03)",
                                border: "1px solid " + (m ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                                color: m ? "#0a0e1a" : "#8a93ad",
                                fontWeight: 600,
                              },
                            },
                            d.id === "bodyweight"
                              ? "Peso corporal"
                              : d.id === "gym"
                                ? "Gimnasio"
                                : "Flow",
                          );
                        }),
                      ),
                    )
                  : i.default.createElement(
                      "div",
                      { className: "text-xs mb-1", style: { color: "#4f9dff" } },
                      "Modalidad de hoy: ",
                      (modalidades.find((f) => f.id === B) || modalidades[0]).name,
                    ),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#7a83a0" } },
                  sdcDescRango(u.rank, s),
                ),
                (() => {
                  let mm = sdcModDia(B, c.date);
                  if (!mm) return null;
                  return i.default.createElement(
                    "div",
                    {
                      className: "p-2 mb-2",
                      style: {
                        background: sdcModOk ? "rgba(62,207,142,0.12)" : "rgba(124,92,255,0.10)",
                        border: "1px solid " + (sdcModOk ? "#3ecf8e" : "#7c5cff"),
                      },
                    },
                    i.default.createElement(
                      "div",
                      {
                        className: "text-xs",
                        style: {
                          color: sdcModOk ? "#3ecf8e" : "#b9a5ff",
                          fontFamily: "Chakra Petch, sans-serif",
                          fontWeight: 700,
                          letterSpacing: 1,
                        },
                      },
                      "HOY · ",
                      mm.n,
                      " · +",
                      Math.round(mm.x * 100),
                      "% XP",
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                      mm.d,
                    ),
                    i.default.createElement(
                      "button",
                      {
                        onClick: () => {
                          let nv = !sdcModOk;
                          (sdcSetModOk(nv), sdcMarcaOk(sdcSer, sdcAjuste, nv));
                        },
                        className: "w-full py-2 text-xs mt-2",
                        style: {
                          background: sdcModOk ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                          border: "1px solid " + (sdcModOk ? "#3ecf8e" : "rgba(255,255,255,0.2)"),
                          color: sdcModOk ? "#0a0e1a" : "#8a93ad",
                          fontWeight: 600,
                          minHeight: 44,
                        },
                      },
                      sdcModOk ? "✓ Lo cumplí" : "Marcar que lo cumplí",
                    ),
                  );
                })(),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                  "Tocá cada serie cuando la termines. Solo cuenta lo que marcás, y el descanso empieza automáticamente.",
                ),
                i.default.createElement(
                  "div",
                  { className: "grid grid-cols-2 gap-2 mb-3" },
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => eg((f) => !f),
                      className: "py-2 text-xs",
                      style: {
                        background: Ln ? "rgba(79,157,255,0.15)" : "rgba(255,255,255,0.03)",
                        border: "1px solid " + (Ln ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                        color: Ln ? "#4f9dff" : "#8a93ad",
                        minHeight: 44,
                      },
                    },
                    "Metrónomo ",
                    Ln ? "ON" : "OFF",
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: sdcMarcarTodo,
                      className: "py-2 text-xs",
                      style: {
                        background: "rgba(255,184,79,0.1)",
                        border: "1px solid #ffb84f",
                        color: "#ffb84f",
                        minHeight: 44,
                      },
                    },
                    "MARCAR TODAS",
                  ),
                ),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#7a83a0" } },
                  "El metrónomo marca el tempo de cada repetición con un pitido, para que no aceleres. No cuenta reps: eso lo marcás vos al tocar cada serie.",
                ),
                i.default.createElement(Metronomo, {
                  active: Ln,
                  tempo: sdcTempoMod(sdcModDia(B, c.date)),
                }),
                Jd &&
                  i.default.createElement(BarraDescanso, {
                    seconds: sdcDesc || ag[s.focusProfile] || 60,
                    ini: sdcDescIni,
                    onSkip: () => Fd(!1),
                  }),
                i.default.createElement(FilaEjercicio, {
                  label: nombreEjercicio(u.rank, s.classification, "squat", B),
                  value: Aa.squat,
                  base: J.squat,
                  min: 0,
                  max: Math.round(De === "recovery" ? J.squat * 0.5 : J.squat * 1.5),
                  onChange: (f) => Va((d) => ({ ...d, squat: f })),
                  tip: alternativaEjercicio(u.rank, "squat", B) || regresiones.squat,
                  guia: sdcGuia(u.rank, "squat", B),
                  abrir: !sdcVistos(e)[sdcEjNom("squat")],
                  weight: void 0,
                  onWeight: B === "gym" ? (k, f) => sdcKgSet("squat", k, f) : void 0,
                  kgv: B === "gym" ? (k) => sdcKgVer("squat", k) : void 0,
                  kgPrev: B === "gym" ? (sdcGymUlt(e)[sdcEjNom("squat")] || {}).kgs || null : null,
                  sug:
                    B === "gym"
                      ? {
                          s: sdcSugKg(e, "squat", sdcEjNom("squat")),
                          fn: (k) => sdcKgUsar("squat", k),
                        }
                      : null,
                  done: sdcSer.squat,
                  onSet: (f) => sdcSerie("squat", f),
                  accent: z,
                  aj: sdcAjuste.squat,
                  onAj: (k, v) => sdcAjustar("squat", k, v),
                }),
                i.default.createElement(FilaEjercicio, {
                  label: nombreEjercicio(u.rank, s.classification, "pushup", B),
                  value: Aa.pushup,
                  base: J.pushup,
                  min: 0,
                  max: Math.round(De === "recovery" ? J.pushup * 0.5 : J.pushup * 1.5),
                  onChange: (f) => Va((d) => ({ ...d, pushup: f })),
                  tip: alternativaEjercicio(u.rank, "pushup", B) || regresiones.pushup,
                  guia: sdcGuia(u.rank, "pushup", B),
                  abrir: !sdcVistos(e)[sdcEjNom("pushup")],
                  weight: void 0,
                  onWeight: B === "gym" ? (k, f) => sdcKgSet("pushup", k, f) : void 0,
                  kgv: B === "gym" ? (k) => sdcKgVer("pushup", k) : void 0,
                  kgPrev: B === "gym" ? (sdcGymUlt(e)[sdcEjNom("pushup")] || {}).kgs || null : null,
                  sug:
                    B === "gym"
                      ? {
                          s: sdcSugKg(e, "pushup", sdcEjNom("pushup")),
                          fn: (k) => sdcKgUsar("pushup", k),
                        }
                      : null,
                  done: sdcSer.pushup,
                  onSet: (f) => sdcSerie("pushup", f),
                  accent: z,
                  aj: sdcAjuste.pushup,
                  onAj: (k, v) => sdcAjustar("pushup", k, v),
                }),
                i.default.createElement(FilaEjercicio, {
                  label: nombreEjercicio(u.rank, s.classification, "back", B),
                  value: Aa.back,
                  base: J.back,
                  min: 0,
                  max: Math.round(De === "recovery" ? J.back * 0.5 : J.back * 1.5),
                  onChange: (f) => Va((d) => ({ ...d, back: f })),
                  tip: alternativaEjercicio(u.rank, "back", B) || regresiones.back,
                  guia: sdcGuia(u.rank, "back", B),
                  abrir: !sdcVistos(e)[sdcEjNom("back")],
                  weight: void 0,
                  onWeight: B === "gym" ? (k, f) => sdcKgSet("back", k, f) : void 0,
                  kgv: B === "gym" ? (k) => sdcKgVer("back", k) : void 0,
                  kgPrev: B === "gym" ? (sdcGymUlt(e)[sdcEjNom("back")] || {}).kgs || null : null,
                  sug:
                    B === "gym"
                      ? {
                          s: sdcSugKg(e, "back", sdcEjNom("back")),
                          fn: (k) => sdcKgUsar("back", k),
                        }
                      : null,
                  done: sdcSer.back,
                  onSet: (f) => sdcSerie("back", f),
                  accent: z,
                  aj: sdcAjuste.back,
                  onAj: (k, v) => sdcAjustar("back", k, v),
                }),
                i.default.createElement(FilaEjercicio, {
                  label: nombreEjercicio(u.rank, s.classification, "abs", B),
                  value: Aa.abs,
                  base: J.abs,
                  min: 0,
                  max: Math.round(De === "recovery" ? J.abs * 0.5 : J.abs * 1.5),
                  onChange: (f) => Va((d) => ({ ...d, abs: f })),
                  tip: alternativaEjercicio(u.rank, "abs", B) || regresiones.abs,
                  guia: sdcGuia(u.rank, "abs", B),
                  abrir: !sdcVistos(e)[sdcEjNom("abs")],
                  weight: void 0,
                  onWeight: B === "gym" ? (k, f) => sdcKgSet("abs", k, f) : void 0,
                  kgv: B === "gym" ? (k) => sdcKgVer("abs", k) : void 0,
                  kgPrev: B === "gym" ? (sdcGymUlt(e)[sdcEjNom("abs")] || {}).kgs || null : null,
                  sug:
                    B === "gym"
                      ? { s: sdcSugKg(e, "abs", sdcEjNom("abs")), fn: (k) => sdcKgUsar("abs", k) }
                      : null,
                  done: sdcSer.abs,
                  onSet: (f) => sdcSerie("abs", f),
                  accent: z,
                  aj: sdcAjuste.abs,
                  onAj: (k, v) => sdcAjustar("abs", k, v),
                }),
                i.default.createElement(
                  "button",
                  {
                    onClick: pg,
                    className: "w-full py-3 text-sm mt-4",
                    style: { background: z, color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Completar rutina · ",
                  sdcTotalHechas(),
                  "/",
                  sdcTotalMeta(),
                  " reps",
                ),
                i.default.createElement("div", { style: { height: 22 } }),
                sdcConfDesc
                  ? i.default.createElement(
                      "div",
                      {
                        className: "p-2",
                        style: { border: "1px solid #ffb84f", background: "rgba(255,184,79,0.08)" },
                      },
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-2", style: { color: "#ffb84f" } },
                        "El día de descanso no da XP y solo tenés uno por semana. ¿Seguro?",
                      ),
                      i.default.createElement(
                        "div",
                        { className: "flex gap-2" },
                        i.default.createElement(
                          "button",
                          {
                            onClick: () => {
                              (sdcSetConfDesc(!1), bg());
                            },
                            className: "flex-1 py-2 text-xs",
                            style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                          },
                          "Sí, usarlo",
                        ),
                        i.default.createElement(
                          "button",
                          {
                            onClick: () => sdcSetConfDesc(!1),
                            className: "flex-1 py-2 text-xs",
                            style: {
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              color: "#e8ecf7",
                            },
                          },
                          "Cancelar",
                        ),
                      ),
                    )
                  : i.default.createElement(
                      "button",
                      {
                        onClick: () => sdcSetConfDesc(!0),
                        disabled: r.restDayUsed,
                        className: "w-full py-2 text-xs disabled:opacity-30",
                        style: {
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#9aa4bd",
                        },
                      },
                      r.restDayUsed
                        ? "Día de descanso ya usado esta semana"
                        : "Usar mi día de descanso",
                    ),
              ),
          i.default.createElement(
            Plegable,
            {
              id: "stretch",
              title: "Estiramiento",
              accent: "#3ecf8e",
              collapsed: me("stretch"),
              onToggle: fe,
              right: `${r.stretchCount}/2 esta semana`,
            },
            i.default.createElement(
              "div",
              { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
              "Es lo que más rápido cambia de todo lo que hacés acá: en pocas semanas llegás más lejos y lo notás en el cuerpo. Dos veces por semana te dan +10% de XP la semana siguiente.",
            ),
            (() => {
              let fx = sdcFlex(e);
              if (!fx.nivel) return null;
              return i.default.createElement(
                "div",
                {
                  className: "mb-3 p-2",
                  style: {
                    background: "rgba(62,207,142,0.08)",
                    border: "1px solid rgba(62,207,142,0.3)",
                  },
                },
                i.default.createElement(
                  "div",
                  {
                    className: "text-xs uppercase mb-1",
                    style: { letterSpacing: 2, color: "#3ecf8e" },
                  },
                  "TU ALCANCE",
                ),
                i.default.createElement(
                  "div",
                  { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                  sdcFlexTxt(fx.nivel),
                ),
                fx.primero && fx.primero < fx.nivel
                  ? i.default.createElement(
                      "div",
                      { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                      "Cuando empezaste llegabas ",
                      sdcFlexTxt(fx.primero).toLowerCase(),
                      ".",
                    )
                  : null,
              );
            })(),
            sdcFlexToca(e) && !ja && !c.stretchDone
              ? i.default.createElement(
                  "div",
                  {
                    className: "mb-3 p-2",
                    style: {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    },
                  },
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase mb-1",
                      style: { letterSpacing: 2, color: "#9aa4bd" },
                    },
                    "UNA VEZ POR SEMANA",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-sm mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Sentado con las piernas estiradas, ¿hasta dónde llegás?",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                    "Sin rebotar, hasta donde llegues sin dolor.",
                  ),
                  sdcFlexNiv.map((fx) =>
                    i.default.createElement(
                      "button",
                      {
                        key: fx.n,
                        onClick: () => Ne((d) => sdcFlexSet(d, fx.n)),
                        className: "w-full text-left px-3 py-2 mb-1 text-sm",
                        style: {
                          background: "rgba(62,207,142,0.08)",
                          border: "1px solid rgba(62,207,142,0.4)",
                          color: "#e8ecf7",
                        },
                      },
                      fx.t,
                    ),
                  ),
                )
              : null,
            c.stretchDone
              ? i.default.createElement(
                  "div",
                  { className: "flex items-center gap-2 text-sm", style: { color: "#3ecf8e" } },
                  i.default.createElement(IconoCheck, { size: 16 }),
                  " Estiramiento de hoy completado",
                )
              : ja
                ? (() => {
                    let ps = sdcEstPasos,
                      tt = sdcEstTotal(ps),
                      p = sdcEstPaso(ps, fa),
                      esp =
                        p.prep > 0 &&
                        sdcEstOk < p.index &&
                        sdcPasoEspera(ps, p.index, sdcPasosV(e));
                    return i.default.createElement(PasoGuiado, {
                      ls: ps,
                      p: p,
                      cab: i.default.createElement(
                        "div",
                        { className: "text-xs text-center mb-1", style: { color: "#9aa4bd" } },
                        "Paso ",
                        p.index + 1,
                        " de ",
                        ps.length,
                      ),
                      col: "#3ecf8e",
                      esp: esp,
                      pz: !!sdcEstPz && !esp,
                      fin: "Último estiramiento",
                      resto: " · queda " + sdcEstMMSS(tt - fa),
                      onListo: () => {
                        let d0 =
                          sdcEstDesde(ps, p.index) +
                          Math.max(0, (ps[p.index].prep || sdcEstPrep) - 3);
                        (sdcBeep(660, 100),
                          sdcSetEstOk(p.index),
                          sdcSetEstPz(0),
                          sdcSetEstIni(Date.now() - d0 * 1e3),
                          Tl(d0));
                      },
                      onYa: () => {
                        let q = p.prep;
                        (sdcSetEstIni((v) => v - q * 1e3), Tl(fa + q));
                      },
                      onPausa: () => sdcSetEstPz(Date.now()),
                      onSeguir: () => {
                        let dd = Date.now() - sdcEstPz;
                        (sdcSetEstIni((v) => v + dd), sdcSetEstPz(0));
                      },
                      onTerminar: () => {
                        let hh = p.index;
                        (Ba(!1),
                          sdcSetEstPz(0),
                          Ne((N) => sdcPasosHook(registrarEstiramiento(N, hh, ps.length), ps, hh)));
                      },
                    });
                  })()
                : i.default.createElement(
                    i.default.Fragment,
                    null,
                    [
                      { c: 1, lb: "Corta", su: "Lo que más se agradece justo después de entrenar" },
                      { c: 0, lb: "Completa", su: "Todo el cuerpo, de la cabeza a las caderas" },
                    ].map((op) => {
                      let ls = sdcEstLista(op.c),
                        tt = sdcEstTotal(ls);
                      return i.default.createElement(
                        "button",
                        {
                          key: op.lb,
                          onClick: () => {
                            (sdcSetEstPasos(ls),
                              sdcSetEstIdx(0),
                              sdcSetEstPz(0),
                              sdcSetEstOk(-1),
                              sdcSetEstIni(Date.now()),
                              Tl(0),
                              Ba(!0));
                          },
                          className: "w-full py-3 px-3 text-sm mb-2 text-left",
                          style: {
                            background: "rgba(62,207,142,0.12)",
                            border: "1px solid #3ecf8e",
                            color: "#3ecf8e",
                            fontWeight: 700,
                          },
                        },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center justify-between" },
                          i.default.createElement(
                            "span",
                            { style: { display: "inline-flex", alignItems: "center", gap: 8 } },
                            i.default.createElement(IconoReloj, { size: 16 }),
                            op.lb,
                          ),
                          i.default.createElement(
                            "span",
                            { className: "text-xs" },
                            sdcEstMMSS(tt),
                            " · ",
                            ls.length,
                            " pasos",
                          ),
                        ),
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs mt-1",
                            style: { color: "#9aa4bd", fontWeight: 400 },
                          },
                          op.su,
                        ),
                      );
                    }),
                    i.default.createElement(
                      "div",
                      { className: "text-xs", style: { color: "#7a83a0" } },
                      "Antes de cada posición tenés unos segundos para acomodarte, con el nombre de la que viene ya en pantalla. La primera vez que te toca una, el reloj espera a que toques Listo. Un sonido grave avisa que te prepares y uno agudo que empieces, y la pantalla no se apaga.",
                    ),
                  ),
          ),
        ),
      Da === "combat" &&
        (() => {
          let f = za(A.villainIndex),
            d = golpesNecesarios(f);
          return i.default.createElement(
            i.default.Fragment,
            null,
            i.default.createElement(
              Tarjeta,
              { accent: f.isBoss ? "#ffb84f" : "#ff5c7a", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center justify-between mb-2" },
                i.default.createElement(
                  "div",
                  null,
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase",
                      style: { letterSpacing: 2, color: f.isBoss ? "#ffb84f" : "#ff5c7a" },
                    },
                    f.isBoss ? "JEFE · DOS PATRONES ENCADENADOS" : `Terreno #${f.index + 1}`,
                  ),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 22,
                        color: "#e8ecf7",
                        fontWeight: 700,
                      },
                    },
                    f.name,
                  ),
                ),
                i.default.createElement(IconoUbicacion, {
                  size: 28,
                  color: f.isBoss ? "#ffb84f" : "#ff5c7a",
                }),
              ),
              A.villainCurrentHP !== null &&
                i.default.createElement(
                  i.default.Fragment,
                  null,
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                    "Terreno que falta",
                  ),
                  i.default.createElement(BarraXp, {
                    value: A.villainCurrentHP,
                    max: d,
                    color: f.isBoss ? "#ffb84f" : "#ff5c7a",
                  }),
                ),
              i.default.createElement(
                "div",
                { className: "flex items-center gap-1 mt-3" },
                [1, 2, 3].map((m) =>
                  i.default.createElement(IconoCorazon, {
                    key: m,
                    size: 16,
                    color: m <= A.lives ? "#ff5c7a" : "#2a3148",
                    fill: m <= A.lives ? "#ff5c7a" : "none",
                  }),
                ),
                i.default.createElement(
                  "span",
                  { className: "text-xs ml-1", style: { color: "#9aa4bd" } },
                  A.villainsDefeated || 0,
                  " terrenos recuperados",
                ),
              ),
            ),
            A.phase === "choosing" &&
              i.default.createElement(
                Tarjeta,
                { accent: "#ff5c7a", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      color: "#e8ecf7",
                      fontWeight: 700,
                    },
                    className: "mb-2",
                  },
                  "Elegí tu ataque",
                ),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                  "No podés repetir la categoría que usaste en el terreno anterior.",
                ),
                ["upper_front", "upper_back", "lower"].map((m) => {
                  let N = m === A.lastExercise;
                  return i.default.createElement(
                    "button",
                    {
                      key: m,
                      onClick: () => !N && rg(m),
                      disabled: N,
                      className: "w-full py-3 text-sm mb-2 disabled:opacity-30",
                      style: {
                        background: N ? "rgba(255,255,255,0.03)" : "rgba(255,92,122,0.1)",
                        border: "1px solid " + (N ? "rgba(255,255,255,0.1)" : "#ff5c7a"),
                        color: N ? "#5a6178" : "#ff5c7a",
                      },
                    },
                    iy[m],
                  );
                }),
              ),
            A.phase === "decision" &&
              i.default.createElement(
                Tarjeta,
                { accent: "#ffb84f", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      color: "#ffb84f",
                      fontWeight: 700,
                    },
                    className: "mb-1",
                  },
                  "Decisión táctica",
                ),
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                  "Perdiste un corazón. Te quedan ",
                  A.lives,
                  ". ¿Cómo seguís?",
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => Ne((m) => y2(m)),
                    className: "w-full text-left px-3 py-2 mb-2",
                    style: { background: "rgba(255,92,122,0.08)", border: "1px solid #ff5c7a" },
                  },
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Reintentar",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Mismo ejercicio, misma exigencia. Si volvés a fallar, perdés otro corazón.",
                  ),
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: () => Ne((m) => g2(m)),
                    className: "w-full text-left px-3 py-2 mb-2",
                    style: { background: "rgba(255,184,79,0.08)", border: "1px solid #ffb84f" },
                  },
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Ajuste de carga",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "−20% de repeticiones en el mismo tiempo. Tus golpes harán un 30% menos de daño.",
                  ),
                ),
                !f.isBoss &&
                  i.default.createElement(
                    i.default.Fragment,
                    null,
                    i.default.createElement(
                      "div",
                      { className: "text-xs mt-3 mb-1", style: { color: "#9aa4bd" } },
                      "Cambio táctico de patrón (perdés un 15% del terreno):",
                    ),
                    ["upper_front", "upper_back", "lower"].map((m) =>
                      m === A.lastExercise || m === A.exercise
                        ? null
                        : i.default.createElement(
                            "button",
                            {
                              key: m,
                              onClick: () => Ne((_) => v2(_, m)),
                              className: "w-full py-2 text-sm mb-2",
                              style: {
                                background: "rgba(124,92,255,0.1)",
                                border: "1px solid #7c5cff",
                                color: "#b9a5ff",
                              },
                            },
                            iy[m],
                          ),
                    ),
                  ),
              ),
            A.phase === "resting" &&
              !du &&
              !fu &&
              (() => {
                let sdcCr = f.isBoss
                    ? 0
                    : Math.max(
                        1,
                        Math.round(
                          repsCombate(
                            u.rank,
                            s.classification,
                            A.exercise,
                            s.focusProfile,
                            B,
                            s.testResults,
                          ) * (A.loadFactor || 1),
                        ),
                      ),
                  sdcCs = f.isBoss ? p2() : m2(sdcCr);
                return i.default.createElement(
                  Tarjeta,
                  { accent: "#ff5c7a", style: { marginBottom: 16 } },
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        color: "#e8ecf7",
                        fontWeight: 700,
                      },
                      className: "mb-2",
                    },
                    "Cuando estés listo",
                  ),
                  f.isBoss
                    ? i.default.createElement(
                        "div",
                        { className: "text-sm", style: { color: "#e8ecf7" } },
                        i.default.createElement(
                          "div",
                          { style: { color: "#ffb84f", fontWeight: 700 } },
                          "Superserie enlazada · sin descanso",
                        ),
                        (A.bossCats || $o(A.lastExercise)).map((m, N) =>
                          i.default.createElement(
                            "div",
                            { key: m, className: "mt-1" },
                            "Fase ",
                            N + 1,
                            ": ",
                            repsCombateSuave(
                              u.rank,
                              s.classification,
                              s.focusProfile,
                              m,
                              B,
                              s.testResults,
                            ),
                            " × ",
                            sy(u.rank, s.classification, m, B),
                          ),
                        ),
                      )
                    : i.default.createElement(
                        "div",
                        { className: "text-sm", style: { color: "#e8ecf7" } },
                        sdcCr,
                        " × ",
                        sy(u.rank, s.classification, A.exercise, B),
                        (A.loadFactor || 1) < 1 &&
                          i.default.createElement(
                            "div",
                            { className: "text-xs mt-1", style: { color: "#ffb84f" } },
                            "Carga recalibrada · daño reducido",
                          ),
                      ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-2 mb-3", style: { color: "#9aa4bd" } },
                    "Vas a tener ",
                    sdcCs,
                    " segundos para completarlo. El reloj arranca cuando toques Empezar, no antes.",
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => {
                        let sdcCd = f.isBoss ? 20 : 12;
                        (mu(sdcCd), ql(sdcCd), _l(!0));
                      },
                      className: "w-full py-3 text-sm",
                      style: { background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 },
                    },
                    "Empezar",
                  ),
                );
              })(),
            A.phase === "resting" &&
              du &&
              i.default.createElement(
                Tarjeta,
                { accent: "#ff5c7a", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  { className: "text-center" },
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Prepárate...",
                  ),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 40,
                        color: "#ff5c7a",
                      },
                    },
                    xt,
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => ql(0),
                      className: "text-xs underline mt-2",
                      style: { color: "#9aa4bd" },
                    },
                    "Comenzar ahora",
                  ),
                ),
              ),
            fu &&
              i.default.createElement(
                Tarjeta,
                { accent: "#ff5c7a", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  { className: "text-center mb-3" },
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7" } },
                    f.isBoss
                      ? i.default.createElement(
                          i.default.Fragment,
                          null,
                          i.default.createElement(
                            "div",
                            { style: { color: "#ffb84f", fontWeight: 700 } },
                            "Superserie enlazada · sin descanso",
                          ),
                          (A.bossCats || $o(A.lastExercise)).map((m, N) =>
                            i.default.createElement(
                              "div",
                              { key: m, className: "mt-1" },
                              "Fase ",
                              N + 1,
                              ": ",
                              repsCombateSuave(
                                u.rank,
                                s.classification,
                                s.focusProfile,
                                m,
                                B,
                                s.testResults,
                              ),
                              " × ",
                              sy(u.rank, s.classification, m, B),
                            ),
                          ),
                        )
                      : i.default.createElement(
                          i.default.Fragment,
                          null,
                          Math.max(
                            1,
                            Math.round(
                              repsCombate(
                                u.rank,
                                s.classification,
                                A.exercise,
                                s.focusProfile,
                                B,
                                s.testResults,
                              ) * (A.loadFactor || 1),
                            ),
                          ),
                          " × ",
                          sy(u.rank, s.classification, A.exercise, B),
                          (A.loadFactor || 1) < 1 &&
                            i.default.createElement(
                              "div",
                              { className: "text-xs mt-1", style: { color: "#ffb84f" } },
                              "Carga recalibrada · daño reducido",
                            ),
                        ),
                  ),
                ),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 36,
                      color: xt <= 5 ? "#ff5c7a" : "#e8ecf7",
                      textAlign: "center",
                    },
                  },
                  xt,
                  "s",
                ),
                i.default.createElement(BarraXp, { value: xt, max: Fy, color: "#ff5c7a" }),
                (() => {
                  let fs = f.isBoss
                      ? (A.bossCats || $o(A.lastExercise)).map((m) =>
                          repsCombateSuave(
                            u.rank,
                            s.classification,
                            s.focusProfile,
                            m,
                            B,
                            s.testResults,
                          ),
                        )
                      : [
                          Math.max(
                            1,
                            Math.round(
                              repsCombate(
                                u.rank,
                                s.classification,
                                A.exercise,
                                s.focusProfile,
                                B,
                                s.testResults,
                              ) * (A.loadFactor || 1),
                            ),
                          ),
                        ],
                    listo = fs.every((rq, ix) => (sdcCombSer[ix] || 0) >= sdcNSets(rq));
                  return i.default.createElement(
                    i.default.Fragment,
                    null,
                    fs.map((rq, ix) =>
                      i.default.createElement(
                        "div",
                        { key: ix, className: "mt-3" },
                        f.isBoss &&
                          i.default.createElement(
                            "div",
                            { className: "text-xs mb-1", style: { color: "#ffb84f" } },
                            "Fase ",
                            ix + 1,
                          ),
                        sdcCombChips(ix, rq),
                      ),
                    ),
                    i.default.createElement(
                      "button",
                      {
                        onClick: sdcGolpe,
                        disabled: !listo,
                        className: "w-full py-3 text-sm mt-3 disabled:opacity-40",
                        style: { background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 },
                      },
                      listo ? "GOLPEAR" : "Marcá las series para golpear",
                    ),
                  );
                })(),
                i.default.createElement(
                  "button",
                  {
                    onClick: dg,
                    className: "w-full py-2 text-xs mt-2",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Cancelar (sin perder vida)",
                ),
              ),
            A.phase === "victory" &&
              i.default.createElement(
                Tarjeta,
                { accent: "#3ecf8e", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  { className: "text-center" },
                  i.default.createElement(IconoTrofeo, {
                    size: 32,
                    color: "#3ecf8e",
                    style: { margin: "0 auto" },
                  }),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 20,
                        color: "#3ecf8e",
                        fontWeight: 700,
                      },
                      className: "mt-2",
                    },
                    "¡Victoria!",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-sm mt-1", style: { color: "#e8ecf7" } },
                    "Recuperaste ",
                    f.name,
                  ),
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: fg,
                    className: "w-full py-3 text-sm mt-4",
                    style: { background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Continuar al siguiente villano",
                ),
              ),
            A.phase === "defeat" &&
              i.default.createElement(
                Tarjeta,
                { accent: "#ff5c7a", style: { marginBottom: 16 } },
                i.default.createElement(
                  "div",
                  { className: "text-center" },
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 20,
                        color: "#ff5c7a",
                        fontWeight: 700,
                      },
                    },
                    "Te quedaste sin vidas",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-sm mt-1", style: { color: "#9aa4bd" } },
                    f.name,
                    " sigue activa, pero no perdiste el daño que ya le hiciste. Recuperá el aliento e intentalo de nuevo.",
                  ),
                ),
                i.default.createElement(
                  "button",
                  {
                    onClick: mg,
                    className: "w-full py-3 text-sm mt-4",
                    style: { background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 },
                  },
                  "Reintentar",
                ),
              ),
          );
        })(),
      Da === "primal" &&
        (() => {
          let f = g.unlockedCount - 1;
          return i.default.createElement(
            i.default.Fragment,
            null,
            i.default.createElement(
              "div",
              {
                className:
                  "grid gap-1 mb-4 grid-cols-" +
                  (1 +
                    (sistemaActivo(e, "skills") ? 1 : 0) +
                    (sistemaActivo(e, "care") ? 1 : 0) +
                    (sistemaActivo(e, "neuro") ? 1 : 0)),
              },
              i.default.createElement(
                "button",
                {
                  onClick: () => ii("movs"),
                  className: "py-2 text-xs",
                  style: {
                    background: He === "movs" ? "#3ecf8e" : "rgba(255,255,255,0.03)",
                    border: "1px solid " + (He === "movs" ? "#3ecf8e" : "rgba(255,255,255,0.12)"),
                    color: He === "movs" ? "#0a0e1a" : "#8a93ad",
                    fontWeight: 600,
                  },
                },
                "Movimientos",
              ),
              sistemaActivo(e, "skills") &&
                i.default.createElement(
                  "button",
                  {
                    onClick: () => ii("skills"),
                    className: "py-2 text-xs",
                    style: {
                      background: He === "skills" ? "#b084f5" : "rgba(255,255,255,0.03)",
                      border:
                        "1px solid " + (He === "skills" ? "#b084f5" : "rgba(255,255,255,0.12)"),
                      color: He === "skills" ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    },
                  },
                  "Skills",
                ),
              sistemaActivo(e, "care") &&
                i.default.createElement(
                  "button",
                  {
                    onClick: () => ii("care"),
                    className: "py-2 text-xs",
                    style: {
                      background: He === "care" ? "#4f9dff" : "rgba(255,255,255,0.03)",
                      border: "1px solid " + (He === "care" ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                      color: He === "care" ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    },
                  },
                  "Articul.",
                ),
              sistemaActivo(e, "neuro") &&
                i.default.createElement(
                  "button",
                  {
                    onClick: () => ii("neuro"),
                    className: "py-2 text-xs",
                    style: {
                      background: He === "neuro" ? "#ff6b4a" : "rgba(255,255,255,0.03)",
                      border:
                        "1px solid " + (He === "neuro" ? "#ff6b4a" : "rgba(255,255,255,0.12)"),
                      color: He === "neuro" ? "#0a0e1a" : "#8a93ad",
                      fontWeight: 600,
                    },
                  },
                  "Neuro",
                ),
            ),
            He === "neuro" &&
              sistemaActivo(e, "neuro") &&
              (() => {
                let d = e.neuro || {
                    bestSpeedLevel: 0,
                    bestSequence: 0,
                    bestDualSec: 0,
                    bestBpm: 0,
                    sessions: 0,
                  },
                  m = [
                    {
                      id: "reaction",
                      name: "Reacción",
                      accent: "#4f9dff",
                      best: d.bestSpeedLevel
                        ? (kd.find((N) => N.level === d.bestSpeedLevel) || {}).name
                        : "—",
                      desc: "Señales impredecibles sin tocar la pantalla. Solo atención y cuerpo.",
                    },
                    {
                      id: "sequence",
                      name: "Secuencia motriz",
                      accent: "#b084f5",
                      best: d.bestSequence ? d.bestSequence + " movs" : "—",
                      desc: "Memorizá una cadena, ejecutala de memoria y comprobá.",
                    },
                    {
                      id: "dual",
                      name: "Doble tarea",
                      accent: "#3ecf8e",
                      best: d.bestDualSec
                        ? Math.floor(d.bestDualSec / 60) +
                          ":" +
                          String(d.bestDualSec % 60).padStart(2, "0")
                        : "—",
                      desc: "Isométrico sostenido mientras resuelves una tarea mental.",
                    },
                    {
                      id: "coord",
                      name: "Coordinación cruzada",
                      accent: "#ffb84f",
                      best: d.bestBpm ? d.bestBpm + " bpm" : "—",
                      desc: "Patrones contralaterales al ritmo del metrónomo.",
                    },
                  ];
                return i.default.createElement(
                  i.default.Fragment,
                  null,
                  i.default.createElement(
                    Tarjeta,
                    { accent: "#ff6b4a", style: { marginBottom: 16 } },
                    i.default.createElement(
                      "div",
                      { className: "flex items-center justify-between mb-1" },
                      i.default.createElement(
                        "div",
                        null,
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs uppercase",
                            style: { letterSpacing: 2, color: "#ff6b4a" },
                          },
                          "Neuromotor",
                        ),
                        i.default.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "Chakra Petch, sans-serif",
                              fontSize: 20,
                              color: "#e8ecf7",
                              fontWeight: 700,
                            },
                          },
                          d.sessions || 0,
                          " sesiones",
                        ),
                      ),
                      i.default.createElement(IconoRayo, { size: 24, color: "#ff6b4a" }),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "La pantalla da el estímulo, tu cuerpo responde. Reflejos, memoria de movimiento y coordinación. Alimenta tu atributo Control.",
                    ),
                    i.default.createElement(
                      "div",
                      {
                        className: "text-xs p-2",
                        style: {
                          color: "#9aa4bd",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        },
                      },
                      "Tus marcas sirven para compararte con vos mismo. Esto entrena atención y control motor, no tu inteligencia general.",
                    ),
                  ),
                  m.map((N) => {
                    let _ = Ky === N.id;
                    return i.default.createElement(
                      Tarjeta,
                      { key: N.id, accent: N.accent, style: { marginBottom: 12 } },
                      i.default.createElement(
                        "button",
                        {
                          onClick: () => Vy(_ ? null : N.id),
                          className: "w-full text-left",
                          style: { background: "transparent", border: "none", padding: 0 },
                        },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center justify-between" },
                          i.default.createElement(
                            "div",
                            { className: "flex items-center gap-2" },
                            i.default.createElement(
                              "span",
                              {
                                style: {
                                  display: "inline-block",
                                  transform: _ ? "rotate(90deg)" : "rotate(0deg)",
                                  transition: "transform .2s",
                                },
                              },
                              i.default.createElement(IconoFlecha, { size: 14, color: "#9aa4bd" }),
                            ),
                            i.default.createElement(
                              "div",
                              null,
                              i.default.createElement(
                                "div",
                                {
                                  className: "text-sm",
                                  style: { color: "#e8ecf7", fontWeight: 600 },
                                },
                                N.name,
                              ),
                              i.default.createElement(
                                "div",
                                { className: "text-xs", style: { color: "#7a83a0" } },
                                N.desc,
                              ),
                            ),
                          ),
                          i.default.createElement(
                            "div",
                            {
                              className: "text-xs",
                              style: { color: N.accent, whiteSpace: "nowrap" },
                            },
                            N.best,
                          ),
                        ),
                      ),
                      _ &&
                        i.default.createElement(
                          "div",
                          { className: "mt-3" },
                          N.id === "reaction" &&
                            i.default.createElement(Reaccion, {
                              onDone: (X) => Ne((de) => Ps(de, "reaction", X, !1)),
                            }),
                          N.id === "sequence" &&
                            i.default.createElement(Secuencia, {
                              onDone: (X) => Ne((de) => Ps(de, "sequence", X, !1)),
                            }),
                          N.id === "dual" &&
                            i.default.createElement(TareaDual, {
                              onDone: (X) => Ne((de) => Ps(de, "dual", X, X >= 45)),
                            }),
                          N.id === "coord" &&
                            i.default.createElement(Ritmo, {
                              onDone: (X) => Ne((de) => Ps(de, "coord", X, !1)),
                            }),
                        ),
                    );
                  }),
                );
              })(),
            He === "care" &&
              sistemaActivo(e, "care") &&
              (() => {
                let d = e.care && e.care.today.date === fechaHoy() ? e.care.today.done : [];
                return i.default.createElement(
                  i.default.Fragment,
                  null,
                  i.default.createElement(
                    Tarjeta,
                    { accent: "#4f9dff", style: { marginBottom: 16 } },
                    i.default.createElement(
                      "div",
                      { className: "flex items-center justify-between mb-1" },
                      i.default.createElement(
                        "div",
                        null,
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs uppercase",
                            style: { letterSpacing: 2, color: "#4f9dff" },
                          },
                          "Cuidado articular",
                        ),
                        i.default.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "Chakra Petch, sans-serif",
                              fontSize: 20,
                              color: "#e8ecf7",
                              fontWeight: 700,
                            },
                          },
                          (e.care && e.care.lifetime) || 0,
                          " protocolos hechos",
                        ),
                      ),
                      i.default.createElement(IconoCorazon, { size: 24, color: "#4f9dff" }),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                      "Trabajo preventivo y de mantenimiento para las articulaciones que más sufren entrenando. Da XP y no tiene penalización: úsalo los días que lo necesites.",
                    ),
                    i.default.createElement(
                      "div",
                      {
                        className: "text-xs p-2 mb-2",
                        style: {
                          color: "#ffb84f",
                          background: "rgba(255,184,79,0.08)",
                          border: "1px solid rgba(255,184,79,0.3)",
                        },
                      },
                      "Esto no sustituye a un diagnóstico. Si ya tienes una lesión, consúltalo con un fisioterapeuta o médico antes de seguir cualquier protocolo.",
                    ),
                    i.default.createElement(
                      "div",
                      {
                        className: "text-xs p-2",
                        style: {
                          color: "#9aa4bd",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        },
                      },
                      reglaDolor,
                    ),
                  ),
                  i.default.createElement(
                    Plegable,
                    {
                      id: "banderas",
                      title: "Cuándo parar y consultar",
                      accent: "#ff5c7a",
                      style: { marginBottom: 16 },
                      collapsed:
                        H && H.collapsed && H.collapsed.banderas !== void 0 ? me("banderas") : !0,
                      onToggle: fe,
                      right: "señales de alarma",
                    },
                    i.default.createElement(
                      "div",
                      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                      "Si aparece cualquiera de estas, deja el protocolo y busca valoración profesional:",
                    ),
                    alarmas.map((m) =>
                      i.default.createElement(
                        "div",
                        { key: m, className: "flex items-start gap-2 py-1" },
                        i.default.createElement("span", { style: { color: "#ff5c7a" } }, "•"),
                        i.default.createElement(
                          "span",
                          { className: "text-xs", style: { color: "#e8ecf7" } },
                          m,
                        ),
                      ),
                    ),
                  ),
                  cuidadoArticular.map((m) => {
                    let N = Gy === m.id,
                      _ = d.includes(m.id);
                    return i.default.createElement(
                      Tarjeta,
                      { key: m.id, accent: _ ? "#3ecf8e" : "#5a6178", style: { marginBottom: 12 } },
                      i.default.createElement(
                        "button",
                        {
                          onClick: () => Zy(N ? null : m.id),
                          className: "w-full text-left",
                          style: { background: "transparent", border: "none", padding: 0 },
                        },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center justify-between" },
                          i.default.createElement(
                            "div",
                            { className: "flex items-center gap-2" },
                            i.default.createElement(
                              "span",
                              {
                                style: {
                                  display: "inline-block",
                                  transform: N ? "rotate(90deg)" : "rotate(0deg)",
                                  transition: "transform .2s",
                                },
                              },
                              i.default.createElement(IconoFlecha, { size: 14, color: "#9aa4bd" }),
                            ),
                            i.default.createElement(
                              "div",
                              null,
                              i.default.createElement(
                                "div",
                                {
                                  className: "text-sm",
                                  style: { color: "#e8ecf7", fontWeight: 600 },
                                },
                                m.zone,
                              ),
                              i.default.createElement(
                                "div",
                                { className: "text-xs", style: { color: "#7a83a0" } },
                                m.common,
                              ),
                            ),
                          ),
                          _ && i.default.createElement(IconoCheck, { size: 16, color: "#3ecf8e" }),
                        ),
                      ),
                      N &&
                        i.default.createElement(
                          "div",
                          { className: "mt-3" },
                          i.default.createElement(
                            "div",
                            { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                            m.context,
                          ),
                          m.exercises.map((X, de) =>
                            i.default.createElement(
                              "div",
                              {
                                key: X.name,
                                className: "py-2",
                                style: { borderTop: "1px solid rgba(255,255,255,0.07)" },
                              },
                              i.default.createElement(
                                "div",
                                { className: "flex items-center justify-between" },
                                i.default.createElement(
                                  "div",
                                  {
                                    className: "text-sm",
                                    style: { color: "#e8ecf7", fontWeight: 600 },
                                  },
                                  de + 1,
                                  ". ",
                                  X.name,
                                ),
                                i.default.createElement(
                                  "div",
                                  {
                                    className: "text-xs",
                                    style: { color: "#4f9dff", whiteSpace: "nowrap" },
                                  },
                                  X.dose,
                                ),
                              ),
                              i.default.createElement(
                                "div",
                                { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                                X.how,
                              ),
                              i.default.createElement(
                                "div",
                                { className: "text-xs mt-1", style: { color: "#7a83a0" } },
                                "Para qué: ",
                                X.why,
                              ),
                            ),
                          ),
                          i.default.createElement(
                            "button",
                            {
                              onClick: () => Ne((X) => Y2(X, m.id)),
                              disabled: _,
                              className: "w-full py-3 text-sm mt-3 disabled:opacity-40",
                              style: {
                                background: _ ? "rgba(255,255,255,0.05)" : "#4f9dff",
                                color: _ ? "#9aa4bd" : "#0a0e1a",
                                fontWeight: 700,
                              },
                            },
                            _ ? "Registrado hoy" : "Registrar protocolo (+" + Ty + " XP)",
                          ),
                        ),
                    );
                  }),
                );
              })(),
            He === "skills" &&
              sistemaActivo(e, "skills") &&
              i.default.createElement(
                i.default.Fragment,
                null,
                i.default.createElement(
                  Tarjeta,
                  { accent: "#b084f5", style: { marginBottom: 16 } },
                  i.default.createElement(
                    "div",
                    { className: "flex items-center justify-between mb-1" },
                    i.default.createElement(
                      "div",
                      null,
                      i.default.createElement(
                        "div",
                        {
                          className: "text-xs uppercase",
                          style: { letterSpacing: 2, color: "#b084f5" },
                        },
                        "Skills",
                      ),
                      i.default.createElement(
                        "div",
                        {
                          style: {
                            fontFamily: "Chakra Petch, sans-serif",
                            fontSize: 20,
                            color: "#e8ecf7",
                            fontWeight: 700,
                          },
                        },
                        Wo(e),
                        " / ",
                        habilidades.length,
                        " aprendidas",
                      ),
                    ),
                    i.default.createElement(IconoDestello, { size: 24, color: "#b084f5" }),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Movimientos raros que se aprenden sin reloj. Marcá cada paso cuando lo domines de verdad: no hay prisa ni penalización por tardar semanas.",
                  ),
                ),
                habilidades.map((d) => {
                  let m = Td(e, d.id),
                    N = m.filter(Boolean).length,
                    _ = N >= d.steps.length,
                    X = Xy === d.id;
                  return i.default.createElement(
                    Tarjeta,
                    { key: d.id, accent: _ ? "#3ecf8e" : "#5a6178", style: { marginBottom: 12 } },
                    i.default.createElement(
                      "button",
                      {
                        onClick: () => Yy(X ? null : d.id),
                        className: "w-full text-left",
                        style: { background: "transparent", border: "none", padding: 0 },
                      },
                      i.default.createElement(
                        "div",
                        { className: "flex items-center justify-between" },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center gap-2" },
                          i.default.createElement(
                            "span",
                            {
                              style: {
                                display: "inline-block",
                                transform: X ? "rotate(90deg)" : "rotate(0deg)",
                                transition: "transform .2s",
                              },
                            },
                            i.default.createElement(IconoFlecha, { size: 14, color: "#9aa4bd" }),
                          ),
                          i.default.createElement(
                            "div",
                            null,
                            i.default.createElement(
                              "div",
                              {
                                className: "text-sm",
                                style: { color: "#e8ecf7", fontWeight: 600 },
                              },
                              d.name,
                            ),
                            i.default.createElement(
                              "div",
                              { className: "text-xs", style: { color: "#7a83a0" } },
                              d.family,
                              " · ",
                              d.level,
                            ),
                          ),
                        ),
                        i.default.createElement(
                          "div",
                          { className: "text-xs", style: { color: _ ? "#3ecf8e" : "#8a93ad" } },
                          _ ? "Aprendida" : `${N}/${d.steps.length}`,
                        ),
                      ),
                    ),
                    i.default.createElement(
                      "div",
                      { className: "mt-2" },
                      i.default.createElement(BarraXp, {
                        value: N,
                        max: d.steps.length,
                        color: _ ? "#3ecf8e" : "#b084f5",
                      }),
                    ),
                    X &&
                      i.default.createElement(
                        "div",
                        { className: "mt-3" },
                        i.default.createElement(
                          "div",
                          { className: "text-xs mb-1", style: { color: "#e8ecf7" } },
                          d.what,
                        ),
                        i.default.createElement(
                          "div",
                          { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                          d.why,
                        ),
                        d.steps.map((de, te) => {
                          let Bl = !!m[te];
                          return i.default.createElement(
                            "div",
                            {
                              key: de.name,
                              className: "py-2",
                              style: { borderTop: "1px solid rgba(255,255,255,0.07)" },
                            },
                            i.default.createElement(
                              "button",
                              {
                                onClick: () => Ne((wl) => marcarPasoHabilidad(wl, d.id, te)),
                                className: "w-full text-left flex items-start gap-2",
                                style: { background: "transparent", border: "none", padding: 0 },
                              },
                              i.default.createElement(
                                "span",
                                {
                                  style: {
                                    width: 16,
                                    height: 16,
                                    flexShrink: 0,
                                    marginTop: 2,
                                    border:
                                      "1px solid " + (Bl ? "#3ecf8e" : "rgba(255,255,255,0.3)"),
                                    background: Bl ? "#3ecf8e" : "transparent",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                },
                                Bl &&
                                  i.default.createElement(IconoCheck, {
                                    size: 12,
                                    color: "#0a0e1a",
                                  }),
                              ),
                              i.default.createElement(
                                "span",
                                null,
                                i.default.createElement(
                                  "span",
                                  {
                                    className: "text-sm",
                                    style: {
                                      color: Bl ? "#8a93ad" : "#e8ecf7",
                                      fontWeight: 600,
                                      textDecoration: Bl ? "line-through" : "none",
                                    },
                                  },
                                  te + 1,
                                  ". ",
                                  de.name,
                                ),
                                i.default.createElement(
                                  "span",
                                  {
                                    className: "text-xs",
                                    style: { color: "#9aa4bd", display: "block", marginTop: 2 },
                                  },
                                  de.how,
                                ),
                                i.default.createElement(
                                  "span",
                                  {
                                    className: "text-xs",
                                    style: { color: "#4f9dff", display: "block", marginTop: 2 },
                                  },
                                  "Clave: ",
                                  de.cue,
                                ),
                              ),
                            ),
                          );
                        }),
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs mt-3 p-2",
                            style: {
                              color: "#3ecf8e",
                              background: "rgba(62,207,142,0.07)",
                              border: "1px solid rgba(62,207,142,0.25)",
                            },
                          },
                          i.default.createElement("b", null, "Si te atascas:"),
                          " ",
                          d.regression,
                        ),
                        i.default.createElement(
                          "div",
                          {
                            className: "text-xs mt-2 p-2",
                            style: {
                              color: "#ff5c7a",
                              background: "rgba(255,92,122,0.07)",
                              border: "1px solid rgba(255,92,122,0.25)",
                            },
                          },
                          i.default.createElement("b", null, "Error común:"),
                          " ",
                          d.mistake,
                        ),
                      ),
                  );
                }),
              ),
            He === "movs" &&
              i.default.createElement(
                i.default.Fragment,
                null,
                i.default.createElement(
                  Tarjeta,
                  { accent: "#3ecf8e", style: { marginBottom: 16 } },
                  i.default.createElement(
                    "div",
                    { className: "flex items-center justify-between mb-2" },
                    i.default.createElement(
                      "div",
                      null,
                      i.default.createElement(
                        "div",
                        {
                          className: "text-xs uppercase",
                          style: { letterSpacing: 2, color: "#3ecf8e" },
                        },
                        "Instinto Primal",
                      ),
                      i.default.createElement(
                        "div",
                        {
                          style: {
                            fontFamily: "Chakra Petch, sans-serif",
                            fontSize: 22,
                            color: "#e8ecf7",
                            fontWeight: 700,
                          },
                        },
                        g.unlockedCount,
                        " / ",
                        movimientosPrimal.length,
                        " movimientos",
                      ),
                    ),
                    i.default.createElement(IconoPata, { size: 26, color: "#3ecf8e" }),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#9aa4bd" } },
                    "Hoy: ",
                    Xn,
                    "/",
                    Yn,
                    " sesiones",
                  ),
                ),
                Qa !== "idle"
                  ? i.default.createElement(
                      Tarjeta,
                      { accent: "#3ecf8e", style: { marginBottom: 16 } },
                      i.default.createElement(
                        "div",
                        { className: "text-center mb-2" },
                        i.default.createElement(
                          "div",
                          {
                            style: {
                              fontFamily: "Chakra Petch, sans-serif",
                              color: "#e8ecf7",
                              fontWeight: 700,
                              fontSize: 18,
                            },
                          },
                          movimientosPrimal[pu].name,
                        ),
                        i.default.createElement(
                          "div",
                          {
                            className: "mt-1",
                            style: { fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" },
                          },
                          movimientosPrimal[pu].desc,
                        ),
                      ),
                      Qa === "listo"
                        ? i.default.createElement(
                            i.default.Fragment,
                            null,
                            i.default.createElement(
                              "div",
                              {
                                className: "text-center text-xs mb-3",
                                style: { color: "#9aa4bd" },
                              },
                              dd,
                              " rondas de ",
                              Ws(u.rank),
                              " segundos.",
                            ),
                            i.default.createElement(
                              "button",
                              {
                                onClick: sdcPrimalYa,
                                className: "w-full py-3 text-sm",
                                style: {
                                  minHeight: 48,
                                  background: "#3ecf8e",
                                  border: "1px solid #3ecf8e",
                                  color: "#0a0e1a",
                                  fontWeight: 700,
                                },
                              },
                              "Empezar",
                            ),
                          )
                        : i.default.createElement(
                            i.default.Fragment,
                            null,
                            i.default.createElement(
                              "div",
                              {
                                className: "text-center text-xs mb-1",
                                style:
                                  Qd === 0
                                    ? { color: "#ffb84f", fontWeight: 700, letterSpacing: 2 }
                                    : { color: "#9aa4bd" },
                              },
                              Qd === 0
                                ? "PONETE EN POSICIÓN"
                                : "Ronda " +
                                    Qd +
                                    "/" +
                                    dd +
                                    " · " +
                                    (Qa === "active" ? "En marcha" : "Descanso"),
                            ),
                            i.default.createElement(
                              "div",
                              {
                                style: {
                                  fontFamily: "Chakra Petch, sans-serif",
                                  fontSize: 48,
                                  textAlign: "center",
                                  color: Qa === "active" ? "#3ecf8e" : "#ffb84f",
                                },
                              },
                              jl,
                              "s",
                            ),
                            i.default.createElement(BarraXp, {
                              value: jl,
                              max: Qa === "active" ? Ws(u.rank) : Qd === 0 ? 10 : cy,
                              color: Qa === "active" ? "#3ecf8e" : "#ffb84f",
                            }),
                          ),
                      i.default.createElement(
                        "button",
                        {
                          onClick: ig,
                          className: "w-full py-2 text-xs mt-4",
                          style: {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.28)",
                            color: "#e8ecf7",
                            fontWeight: 600,
                          },
                        },
                        "Cancelar",
                      ),
                    )
                  : i.default.createElement(
                      Plegable,
                      {
                        id: "primalLista",
                        title: "Elegí un movimiento",
                        accent: "#3ecf8e",
                        style: { marginBottom: 16 },
                        collapsed: me("primalLista"),
                        onToggle: fe,
                        right: `${g.unlockedCount}/${movimientosPrimal.length}`,
                      },
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                        dd,
                        " rondas de ",
                        Ws(u.rank),
                        " segundos. Dominá el más nuevo ",
                        xd,
                        " veces para descubrir el siguiente.",
                      ),
                      Xn >= Yn &&
                        i.default.createElement(
                          "div",
                          { className: "text-xs mb-3", style: { color: "#ffb84f" } },
                          "Ya completaste tus ",
                          Yn,
                          " sesiones de hoy. Volvé mañana.",
                        ),
                      movimientosPrimal.map((d, m) => {
                        let N = m < g.unlockedCount,
                          _ = m === f,
                          X = !N || Xn >= Yn;
                        return i.default.createElement(
                          "button",
                          {
                            key: d.name,
                            onClick: () => !X && og(m),
                            disabled: X,
                            className: "w-full text-left py-2 px-3 mb-2 disabled:opacity-40",
                            style: {
                              background: N ? "rgba(62,207,142,0.08)" : "rgba(255,255,255,0.03)",
                              border: "1px solid " + (N ? "#3ecf8e55" : "rgba(255,255,255,0.1)"),
                            },
                          },
                          i.default.createElement(
                            "div",
                            { className: "flex items-center gap-2" },
                            N
                              ? i.default.createElement(IconoPata, { size: 16, color: "#3ecf8e" })
                              : i.default.createElement(IconoCandado, {
                                  size: 16,
                                  color: "#7a83a0",
                                }),
                            i.default.createElement(
                              "div",
                              {
                                className: "text-sm",
                                style: {
                                  color: N ? "#e8ecf7" : "#5a6178",
                                  fontWeight: N ? 600 : 400,
                                },
                              },
                              d.name,
                            ),
                            _ &&
                              i.default.createElement(
                                "span",
                                { className: "text-xs ml-auto", style: { color: "#ffb84f" } },
                                g.masteryProgress,
                                "/",
                                xd,
                              ),
                          ),
                          N &&
                            i.default.createElement(
                              "div",
                              { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                              d.desc,
                            ),
                        );
                      }),
                    ),
              ),
          );
        })(),
      Da === "exploration" &&
        (() => {
          let f = s2(el),
            d = sectores[f],
            m = i2(f),
            N = Math.max(0, Math.min(el - m, d.endKm - m)),
            _ = d.endKm - m,
            X = Math.round((N / _) * 100),
            de = nodosExplorar.filter((te) => te.sector === f);
          return i.default.createElement(
            i.default.Fragment,
            null,
            i.default.createElement(
              Tarjeta,
              { accent: "#7c5cff", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center justify-between mb-2" },
                i.default.createElement(
                  "div",
                  null,
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase",
                      style: { letterSpacing: 2, color: "#7c5cff" },
                    },
                    "Sector ",
                    f + 1,
                  ),
                  i.default.createElement(
                    "div",
                    {
                      style: {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 20,
                        color: "#e8ecf7",
                        fontWeight: 700,
                      },
                    },
                    d.name,
                  ),
                ),
                i.default.createElement(IconoPasos, { size: 26, color: "#7c5cff" }),
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-1 flex justify-between", style: { color: "#9aa4bd" } },
                i.default.createElement("span", null, "Progreso del sector"),
                i.default.createElement("span", null, X, "% · ", N.toFixed(1), " / ", _, " km"),
              ),
              i.default.createElement(BarraXp, { value: N, max: _, color: "#7c5cff" }),
              i.default.createElement(
                "div",
                { className: "text-xs mt-3", style: { color: "#9aa4bd" } },
                el.toFixed(1),
                " km totales · ",
                ng.name,
              ),
              di &&
                i.default.createElement(
                  "div",
                  { className: "text-xs mt-1", style: { color: "#7a83a0" } },
                  "Próximo nodo: ",
                  di.name,
                  " a ",
                  di.km,
                  " km (faltan ",
                  (di.km - el).toFixed(1),
                  ")",
                ),
            ),
            i.default.createElement(
              Tarjeta,
              { accent: "#7c5cff", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "Chakra Petch, sans-serif",
                    color: "#e8ecf7",
                    fontWeight: 700,
                  },
                  className: "mb-2",
                },
                "Expedición en curso",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Registrá tramos a lo largo del día. Los kilómetros se consolidan al concluir la expedición.",
              ),
              (function () {
                var ws = (e.exploration && e.exploration.walkStart) || 0,
                  kmh = (e.profile && e.profile.ritmoKmH) || 5;
                if (ws)
                  return i.default.createElement(CronoCaminata, {
                    inicio: ws,
                    kmh: kmh,
                    onCancel: sdcCamCancelar,
                    onListo: sdcCamListo,
                  });
                return i.default.createElement(
                  "div",
                  {
                    className: "mb-3 p-2",
                    style: {
                      background: "rgba(124,92,255,0.06)",
                      border: "1px solid rgba(124,92,255,0.25)",
                    },
                  },
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-1", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Salir a caminar",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                    "La app cuenta el tiempo y estima los kilómetros a tu ritmo. Al terminar los podés corregir.",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "grid grid-cols-2 gap-1 mb-2" },
                    sdcRitmos.map(function (jr) {
                      var sel = Math.abs(kmh - jr.v) < 0.01;
                      return i.default.createElement(
                        "button",
                        {
                          key: jr.t,
                          onClick: function () {
                            sdcCamRitmo(jr.v);
                          },
                          className: "py-2 text-xs",
                          style: {
                            minHeight: 44,
                            background: sel ? "rgba(124,92,255,0.2)" : "rgba(255,255,255,0.03)",
                            border: sel ? "1px solid #7c5cff" : "1px solid rgba(255,255,255,0.12)",
                            color: sel ? "#e8ecf7" : "#9aa4bd",
                          },
                        },
                        jr.t,
                      );
                    }),
                  ),
                  i.default.createElement(
                    "button",
                    {
                      onClick: sdcCamEmpezar,
                      className: "w-full py-2 text-xs",
                      style: {
                        minHeight: 44,
                        background: "#7c5cff",
                        color: "#0a0e1a",
                        fontWeight: 700,
                      },
                    },
                    "Empezar la salida",
                  ),
                );
              })(),
              i.default.createElement(
                "div",
                { className: "flex gap-2 mb-2" },
                i.default.createElement("input", {
                  type: "text",
                  inputMode: "decimal",
                  value: Xd,
                  onChange: (te) => Yd(te.target.value.replace(/[^0-9.,]/g, "")),
                  placeholder: "Km del tramo",
                  className: "px-3 py-2 text-sm",
                  style: {
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e8ecf7",
                  },
                }),
                i.default.createElement(
                  "button",
                  {
                    onClick: Ug,
                    className: "px-3 py-2 text-sm",
                    style: {
                      background: "rgba(124,92,255,0.15)",
                      border: "1px solid #7c5cff",
                      color: "#b9a5ff",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    },
                  },
                  "+ Tramo",
                ),
              ),
              i.default.createElement(
                "div",
                { className: "flex gap-2 mb-2" },
                i.default.createElement("input", {
                  type: "text",
                  inputMode: "numeric",
                  value: Ml,
                  onChange: (te) => Gd(te.target.value.replace(/[^0-9]/g, "")),
                  placeholder: "o pasos dados",
                  className: "px-3 py-2 text-sm",
                  style: {
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e8ecf7",
                  },
                }),
                i.default.createElement(
                  "button",
                  {
                    onClick: Lg,
                    className: "px-3 py-2 text-sm",
                    style: {
                      background: "rgba(124,92,255,0.15)",
                      border: "1px solid #7c5cff",
                      color: "#b9a5ff",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    },
                  },
                  "+ Pasos",
                ),
              ),
              Ml &&
                parseInt(Ml, 10) > 0 &&
                i.default.createElement(
                  "div",
                  { className: "text-xs mb-2", style: { color: "#7a83a0" } },
                  parseInt(Ml, 10).toLocaleString("es"),
                  " pasos ≈ ",
                  ((parseInt(Ml, 10) * vd) / 1e3).toFixed(2),
                  " km",
                ),
              i.default.createElement(
                "div",
                {
                  className: "text-center py-2 mb-2",
                  style: {
                    background: "rgba(124,92,255,0.06)",
                    border: "1px solid rgba(124,92,255,0.25)",
                  },
                },
                i.default.createElement(
                  "div",
                  { className: "text-xs", style: { color: "#9aa4bd" } },
                  "Tramos sin consolidar",
                ),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 28,
                      color: "#b9a5ff",
                    },
                  },
                  (x.pendingKm || 0).toFixed(1),
                  " km",
                ),
              ),
              i.default.createElement(
                "button",
                {
                  onClick: Xg,
                  disabled: !(x.pendingKm > 0),
                  className: "w-full py-3 text-sm disabled:opacity-40",
                  style: { background: "#7c5cff", color: "#0a0e1a", fontWeight: 700 },
                },
                "Concluir Expedición",
              ),
              x.pendingKm > 0 &&
                i.default.createElement(
                  "button",
                  {
                    onClick: Hg,
                    className: "w-full py-2 text-xs mt-2",
                    style: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      color: "#e8ecf7",
                      fontWeight: 600,
                    },
                  },
                  "Descartar tramos",
                ),
              i.default.createElement(
                "div",
                { className: "text-xs mt-2 text-center", style: { color: "#7a83a0" } },
                "Hoy llevás ",
                (x.today.date === fechaHoy() ? x.today.km : 0).toFixed(1),
                " km consolidados",
              ),
            ),
            i.default.createElement(
              Plegable,
              {
                id: "mapaSector",
                title: "Mapa del sector",
                accent: "#5a6178",
                style: { marginBottom: 16 },
                collapsed: me("mapaSector"),
                onToggle: fe,
                right: uu ? "todo" : "sector",
              },
              i.default.createElement(
                "div",
                { className: "flex items-center justify-end mb-3" },
                i.default.createElement(
                  "div",
                  { className: "flex gap-1" },
                  i.default.createElement(
                    "button",
                    {
                      onClick: () => Qy((te) => !te),
                      className: "px-2 py-1 text-xs",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#9aa4bd",
                      },
                    },
                    uu ? "Ver sector" : "Ver todo",
                  ),
                ),
              ),
              (uu ? nodosExplorar : de).map((te) => {
                let wl = nodosExplorar.indexOf(te) <= x.unlockedIndex,
                  Ig = Math.max(0, te.km - el);
                return i.default.createElement(
                  "div",
                  {
                    key: te.name,
                    className: "flex items-start gap-2 py-2",
                    style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                  },
                  wl
                    ? i.default.createElement(IconoUbicacion, { size: 16, color: "#7c5cff" })
                    : i.default.createElement(IconoCandado, { size: 16, color: "#7a83a0" }),
                  i.default.createElement(
                    "div",
                    null,
                    i.default.createElement(
                      "div",
                      {
                        className: "text-sm",
                        style: { color: wl ? "#e8ecf7" : "#5a6178", fontWeight: wl ? 600 : 400 },
                      },
                      te.name,
                      " ",
                      i.default.createElement(
                        "span",
                        { className: "text-xs", style: { color: "#7a83a0" } },
                        "· ",
                        te.km,
                        " km",
                      ),
                    ),
                    wl
                      ? i.default.createElement(
                          "div",
                          { className: "text-xs", style: { color: "#9aa4bd" } },
                          te.text,
                        )
                      : i.default.createElement(
                          "div",
                          { className: "text-xs", style: { color: "#7a83a0" } },
                          "Bloqueado — faltan ",
                          Ig.toFixed(1),
                          " km",
                        ),
                  ),
                );
              }),
            ),
            i.default.createElement(
              Plegable,
              {
                id: "codice",
                title: "Códice",
                accent: "#ffb84f",
                style: { marginBottom: 16 },
                collapsed: H && H.collapsed && H.collapsed.codice !== void 0 ? me("codice") : !0,
                onToggle: fe,
                right: `${(x.relics || []).length} / ${nodosExplorar.length} · +${Math.round((x.relics || []).length * Ny * 100)}% XP`,
              },
              (x.relics || []).length === 0
                ? i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#7a83a0" } },
                    "Aún no hallaste ninguna reliquia. Caminá y concluí expediciones para llenar el Códice.",
                  )
                : nodosExplorar
                    .filter((te) => (x.relics || []).includes(te.relic))
                    .map((te) =>
                      i.default.createElement(
                        "div",
                        {
                          key: te.relic,
                          className: "py-2",
                          style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                        },
                        i.default.createElement(
                          "div",
                          { className: "flex items-center gap-2" },
                          i.default.createElement(IconoDestello, { size: 14, color: "#ffb84f" }),
                          i.default.createElement(
                            "div",
                            { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                            te.relic,
                          ),
                        ),
                        i.default.createElement(
                          "div",
                          { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                          te.lore,
                        ),
                        i.default.createElement(
                          "div",
                          { className: "text-xs mt-1", style: { color: "#7a83a0" } },
                          "Hallada en ",
                          te.name,
                          " · ",
                          te.km,
                          " km",
                        ),
                      ),
                    ),
            ),
          );
        })(),
      Da === "achievements" &&
        i.default.createElement(
          i.default.Fragment,
          null,
          i.default.createElement(
            Tarjeta,
            { accent: "#ffb84f", style: { marginBottom: 16 } },
            i.default.createElement(
              "div",
              { className: "flex items-center justify-between" },
              i.default.createElement(
                "div",
                null,
                i.default.createElement(
                  "div",
                  { className: "text-xs uppercase", style: { letterSpacing: 2, color: "#ffb84f" } },
                  "Logros",
                ),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 22,
                      color: "#e8ecf7",
                      fontWeight: 700,
                    },
                  },
                  S.length,
                  " / ",
                  logros.length,
                ),
              ),
              i.default.createElement(IconoTrofeo, { size: 26, color: "#ffb84f" }),
            ),
          ),
          categoriasLogros.map((f) => {
            let d = logros.filter((N) => N.category === f);
            if (!d.length) return null;
            let m = d.filter((N) => S.includes(N.id)).length;
            return i.default.createElement(
              Plegable,
              {
                key: f,
                id: "ach-" + f,
                title: f,
                accent: "#5a6178",
                style: { marginBottom: 16 },
                collapsed:
                  H && H.collapsed && H.collapsed["ach-" + f] !== void 0
                    ? me("ach-" + f)
                    : !sdcCatAbierta(e, f),
                onToggle: fe,
                right: `${m}/${d.length}`,
              },
              ordenDificultad.map((N) => {
                let _ = d.filter((X) => X.tier === N);
                return _.length
                  ? i.default.createElement(
                      "div",
                      { key: N, className: "mb-2" },
                      i.default.createElement(
                        "div",
                        {
                          className: "text-xs mb-1",
                          style: { color: colorRango[N], letterSpacing: 1, fontWeight: 700 },
                        },
                        sdcDific[N] || N,
                      ),
                      _.map((X) => {
                        let de = S.includes(X.id);
                        return i.default.createElement(
                          "div",
                          {
                            key: X.id,
                            className: "flex items-start gap-2 py-2",
                            style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                          },
                          de
                            ? i.default.createElement(IconoTrofeo, { size: 16, color: "#ffb84f" })
                            : i.default.createElement(IconoCandado, { size: 16, color: "#7a83a0" }),
                          i.default.createElement(
                            "div",
                            null,
                            i.default.createElement(
                              "div",
                              {
                                className: "text-sm",
                                style: {
                                  color: de ? "#e8ecf7" : "#5a6178",
                                  fontWeight: de ? 600 : 400,
                                },
                              },
                              X.name,
                            ),
                            i.default.createElement(
                              "div",
                              {
                                className: "text-xs",
                                style: { color: de ? "#8a93ad" : "#5a6178" },
                              },
                              X.desc,
                            ),
                          ),
                        );
                      }),
                    )
                  : null;
              }),
            );
          }),
        ),
      Da === "profile" &&
        (() => {
          let f = Math.max(
              1,
              Math.floor(
                (new Date(fechaHoy() + "T00:00:00") - new Date(s.createdDate + "T00:00:00")) /
                  864e5,
              ) + 1,
            ),
            d = xpTotal(u.level, u.currentXP);
          return i.default.createElement(
            i.default.Fragment,
            null,
            i.default.createElement(
              Tarjeta,
              { accent: "#4f9dff", style: { marginBottom: 16 } },
              i.default.createElement(
                "div",
                { className: "flex items-center gap-2 mb-1" },
                i.default.createElement(IconoPersona, { size: 20, color: "#4f9dff" }),
                i.default.createElement(
                  "div",
                  {
                    style: {
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 20,
                      color: "#e8ecf7",
                      fontWeight: 700,
                    },
                  },
                  s.name,
                ),
              ),
              i.default.createElement(
                "div",
                { className: "text-xs", style: { color: "#9aa4bd" } },
                "Entrenando desde el ",
                s.createdDate,
                " · Día ",
                f,
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                "Enfoque: ",
                enfoqueDe(s.focusProfile).name,
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                "Clasificación: ",
                s.classification,
              ),
            ),
            i.default.createElement(
              Plegable,
              {
                id: "sistemas",
                title: "Sistemas del juego",
                accent: "#ffb84f",
                style: { marginBottom: 16 },
                collapsed:
                  H && H.collapsed && H.collapsed.sistemas !== void 0 ? me("sistemas") : !0,
                onToggle: fe,
                right: `${sistemas.filter((m) => sistemaActivo(e, m.id)).length + 1}/${sistemas.length + 1}`,
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Los sistemas se abren solos a medida que subís de nivel. Podés abrirlos todos de golpe o apagar los que no uses.",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: Sg,
                  className: "w-full py-3 text-sm mb-3",
                  style: {
                    background: e.unlockAll ? "#ffb84f" : "rgba(255,184,79,0.1)",
                    border: "1px solid #ffb84f",
                    color: e.unlockAll ? "#0a0e1a" : "#ffb84f",
                    fontWeight: 700,
                  },
                },
                e.unlockAll ? "Desbloqueo total ACTIVO" : "Desbloquear todo ahora",
              ),
              i.default.createElement(
                "div",
                {
                  className: "flex items-center justify-between py-2",
                  style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
                },
                i.default.createElement(
                  "div",
                  null,
                  i.default.createElement(
                    "div",
                    { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                    "Rutina del día",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#7a83a0" } },
                    "El núcleo. Siempre activo.",
                  ),
                ),
                i.default.createElement(
                  "span",
                  { className: "text-xs", style: { color: "#3ecf8e" } },
                  "Base",
                ),
              ),
              sistemas.map((m) => {
                let N = sistemaAbierto(e, m.id),
                  _ = (e.disabled || []).includes(m.id),
                  X = sistemaActivo(e, m.id);
                return i.default.createElement(
                  "div",
                  {
                    key: m.id,
                    className: "flex items-center justify-between gap-2 py-2",
                    style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
                  },
                  i.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    i.default.createElement(
                      "div",
                      {
                        className: "text-sm",
                        style: { color: X ? "#e8ecf7" : "#5a6178", fontWeight: 600 },
                      },
                      m.name,
                    ),
                    i.default.createElement(
                      "div",
                      { className: "text-xs", style: { color: "#7a83a0" } },
                      N ? m.why : `Se abre en el nivel ${m.level}`,
                    ),
                  ),
                  N
                    ? i.default.createElement(
                        "button",
                        {
                          onClick: () => Ng(m.id),
                          className: "py-2 px-3 text-xs",
                          style: {
                            background: _ ? "rgba(255,255,255,0.05)" : "rgba(62,207,142,0.12)",
                            border: "1px solid " + (_ ? "rgba(255,255,255,0.2)" : "#3ecf8e"),
                            color: _ ? "#9aa4bd" : "#3ecf8e",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          },
                        },
                        _ ? "Apagado" : "Activo",
                      )
                    : i.default.createElement(IconoCandado, { size: 16, color: "#7a83a0" }),
                );
              }),
            ),
            i.default.createElement(
              Plegable,
              {
                id: "metodos",
                title: "Métodos de entrenamiento",
                accent: "#4f9dff",
                style: { marginBottom: 16 },
                collapsed: H && H.collapsed && H.collapsed.metodos !== void 0 ? me("metodos") : !0,
                onToggle: fe,
                right: (modalidades.find((m) => m.id === B) || modalidades[0]).name,
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Activa o desactiva modalidades cuando quieras. Con varias activas elegís cuál usar cada día en la Rutina. Hoy: ",
                i.default.createElement(
                  "b",
                  { style: { color: "#4f9dff" } },
                  (modalidades.find((m) => m.id === B) || modalidades[0]).name,
                ),
                ".",
              ),
              modalidades.map((m) => {
                let N = modalidadesDe(s).includes(m.id);
                return i.default.createElement(
                  "button",
                  {
                    key: m.id,
                    onClick: () => vg(m.id),
                    className: "w-full text-left px-3 py-2 mb-2",
                    style: {
                      background: N ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                      border: N ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
                    },
                  },
                  i.default.createElement(
                    "div",
                    { className: "flex items-center gap-2" },
                    i.default.createElement("span", {
                      style: {
                        width: 16,
                        height: 16,
                        display: "inline-block",
                        flexShrink: 0,
                        border: "1px solid " + (N ? "#4f9dff" : "rgba(255,255,255,0.3)"),
                        background: N ? "#4f9dff" : "transparent",
                      },
                    }),
                    i.default.createElement(
                      "span",
                      { className: "text-sm", style: { color: "#e8ecf7", fontWeight: 600 } },
                      m.name,
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
                    m.desc,
                  ),
                );
              }),
              i.default.createElement(
                "button",
                {
                  onClick: () => ef(modalidades.map((m) => m.id)),
                  className: "w-full py-2 text-xs",
                  style: {
                    background: "rgba(255,184,79,0.1)",
                    border: "1px solid #ffb84f",
                    color: "#ffb84f",
                    fontWeight: 600,
                  },
                },
                "SELECCIONAR TODOS (Atleta Híbrido)",
              ),
              modalidadesDe(s).length > 1 &&
                i.default.createElement(
                  "div",
                  { className: "mt-3" },
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                    "Cómo se llaman tus rangos. Es solo el nombre: no cambia tu progreso ni tus repeticiones.",
                  ),
                  i.default.createElement(
                    "div",
                    { className: "grid grid-cols-3 gap-1" },
                    modalidadesDe(s).map(function (jm) {
                      var jN = sdcJuego(s) === jm,
                        jT =
                          modalidades.find(function (jR) {
                            return jR.id === jm;
                          }) || modalidades[0];
                      return i.default.createElement(
                        "button",
                        {
                          key: jm,
                          onClick: function () {
                            sdcPonerJuego(jm);
                          },
                          className: "py-2 text-xs",
                          style: {
                            minHeight: 44,
                            background: jN ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                            border: jN ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
                            color: jN ? "#e8ecf7" : "#9aa4bd",
                          },
                        },
                        i.default.createElement(
                          "div",
                          { style: { fontFamily: "Chakra Petch, sans-serif", fontWeight: 700 } },
                          (sdcTitulos[jm] || {})[u.rank] || "",
                        ),
                        i.default.createElement(
                          "div",
                          { style: { fontSize: 10, color: "#7a83a0" } },
                          jT.name,
                        ),
                      );
                    }),
                  ),
                ),
            ),
            i.default.createElement(
              Plegable,
              {
                id: "numeros",
                title: "Tus números",
                accent: "#b084f5",
                style: { marginBottom: 16 },
                collapsed: H && H.collapsed && H.collapsed.numeros !== void 0 ? me("numeros") : !0,
                onToggle: fe,
                right: (T.squat + T.pushup + T.back + T.abs).toLocaleString("es") + " reps",
              },
              (() => {
                let ct = sdcAnimoCuenta(e);
                if (!ct.no && !ct.ambas) return null;
                let fila = (t, v) =>
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between text-sm mb-1" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, t),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, v),
                  );
                return i.default.createElement(
                  "div",
                  {
                    style: {
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      paddingBottom: 12,
                      marginBottom: 12,
                    },
                  },
                  i.default.createElement(
                    "div",
                    {
                      className: "text-xs uppercase mb-2",
                      style: { letterSpacing: 2, color: "#7a83a0" },
                    },
                    "CÓMO LLEGÁS Y CÓMO TE VAS",
                  ),
                  fila("Días que no querías", ct.no),
                  fila("Entrenaste igual", ct.vino),
                  fila("Terminaste mejor de lo que llegaste", ct.mejor + " de " + ct.ambas),
                );
              })(),
              i.default.createElement(
                "div",
                {
                  className: "text-xs uppercase mb-2",
                  style: { letterSpacing: 2, color: "#7a83a0" },
                },
                "ATRIBUTOS",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "No se compran: suben solos con lo que entrenás.",
              ),
              Io.map((m) => {
                let N = tu(e, m),
                  _ = q2(N);
                return i.default.createElement(
                  "div",
                  { key: m.key, className: "mb-3" },
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between text-sm mb-1" },
                    i.default.createElement(
                      "span",
                      { style: { color: m.color, fontWeight: 600 } },
                      m.name,
                    ),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, "Nv. ", Ro(N)),
                  ),
                  i.default.createElement(BarraXp, { value: _.cur, max: _.need, color: m.color }),
                );
              }),
              i.default.createElement(
                "div",
                {
                  style: {
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: 12,
                    marginTop: 4,
                  },
                },
                i.default.createElement(
                  "div",
                  {
                    className: "text-xs uppercase mb-2",
                    style: { letterSpacing: 2, color: "#7a83a0" },
                  },
                  "REPETICIONES DE POR VIDA",
                ),
                i.default.createElement(
                  "div",
                  { className: "grid grid-cols-2 gap-2 text-sm" },
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Sentadillas"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      T.squat.toLocaleString("es"),
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Flexiones"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      T.pushup.toLocaleString("es"),
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Espalda"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      T.back.toLocaleString("es"),
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Abdominales"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      T.abs.toLocaleString("es"),
                    ),
                  ),
                ),
              ),
              i.default.createElement(
                "div",
                {
                  style: {
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: 12,
                    marginTop: 12,
                  },
                },
                i.default.createElement(
                  "div",
                  {
                    className: "text-xs uppercase mb-2",
                    style: { letterSpacing: 2, color: "#7a83a0" },
                  },
                  "HAZAÑAS",
                ),
                i.default.createElement(
                  "div",
                  { className: "space-y-1 text-sm" },
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement(
                      "span",
                      { style: { color: "#9aa4bd" } },
                      "Travesías completadas",
                    ),
                    i.default.createElement("span", { style: { color: "#e8ecf7" } }, b),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement(
                      "span",
                      { style: { color: "#9aa4bd" } },
                      "Terrenos recuperados",
                    ),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      A.villainsDefeated,
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement(
                      "span",
                      { style: { color: "#9aa4bd" } },
                      "Movimientos de Instinto Primal",
                    ),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      g.unlockedCount,
                      "/",
                      movimientosPrimal.length,
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement(
                      "span",
                      { style: { color: "#9aa4bd" } },
                      "Distancia recorrida",
                    ),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      el.toFixed(1),
                      " km",
                    ),
                  ),
                  i.default.createElement(
                    "div",
                    { className: "flex justify-between" },
                    i.default.createElement("span", { style: { color: "#9aa4bd" } }, "Logros"),
                    i.default.createElement(
                      "span",
                      { style: { color: "#e8ecf7" } },
                      S.length,
                      "/",
                      logros.length,
                    ),
                  ),
                  (e.lifetimeVolumeKg || 0) > 0
                    ? i.default.createElement(
                        "div",
                        { className: "flex justify-between" },
                        i.default.createElement(
                          "span",
                          { style: { color: "#9aa4bd" } },
                          "Kilos movidos en el gimnasio",
                        ),
                        i.default.createElement(
                          "span",
                          { style: { color: "#e8ecf7" } },
                          (e.lifetimeVolumeKg || 0).toLocaleString("es"),
                          " kg",
                        ),
                      )
                    : null,
                ),
              ),
            ),
            i.default.createElement(
              Plegable,
              {
                id: "aptitud",
                title: "Prueba de aptitud",
                accent: "#ffb84f",
                style: { marginBottom: 16 },
                collapsed: H && H.collapsed && H.collapsed.aptitud !== void 0 ? me("aptitud") : !0,
                onToggle: fe,
                right: sdcCalibre(s) || s.classification,
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Clasificación actual: ",
                s.classification,
                ". Repetirla no cambia tu rango ni tu progreso, solo ajusta el volumen de tu rutina y tu calibre.",
              ),
              (() => {
                let pt = sdcPuntaje(s),
                  ff = sdcRitmoF(s),
                  ix = sdcBandaIx(pt, ff),
                  sg = ix < bandasCalibre.length - 1 ? bandasCalibre[ix + 1] : null;
                return i.default.createElement(
                  "div",
                  { className: "mb-3" },
                  i.default.createElement(
                    "div",
                    { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                    "Tu puntaje: ",
                    i.default.createElement(
                      "b",
                      { style: { color: "#ffb84f", fontSize: 14 } },
                      pt,
                      " pts",
                    ),
                    i.default.createElement(
                      "div",
                      { style: { color: "#7a83a0", marginTop: 2 } },
                      "sentadillas + 2×flexiones + 2×remo + abdominales",
                    ),
                    sdcCalibre(s)
                      ? i.default.createElement(
                          "div",
                          { style: { color: "#7a83a0", marginTop: 2 } },
                          "Enfoque: ",
                          sdcCalF(ix, s),
                        )
                      : null,
                  ),
                  bandasCalibre.map((v, k) =>
                    i.default.createElement(
                      "div",
                      {
                        key: k,
                        className: "flex items-center justify-between gap-2 px-2 py-1 mb-1",
                        style: {
                          background: k === ix ? "rgba(255,184,79,0.12)" : "transparent",
                          border: "1px solid " + (k === ix ? "#ffb84f" : "rgba(255,255,255,0.06)"),
                        },
                      },
                      i.default.createElement(
                        "span",
                        {
                          className: "text-xs",
                          style: {
                            color: k === ix ? "#ffe2b0" : k < ix ? "#5a6178" : "#8a93ad",
                            fontWeight: k === ix ? 700 : 400,
                          },
                        },
                        k < ix ? "✓ " : k === ix ? "● " : "",
                        sdcCalT(k, s),
                      ),
                      i.default.createElement(
                        "span",
                        { className: "text-xs", style: { color: "#7a83a0", whiteSpace: "nowrap" } },
                        k === bandasCalibre.length - 1
                          ? sdcBandaMin(k, ff) + "+"
                          : sdcBandaMin(k, ff) + "–" + (sdcBandaMin(k + 1, ff) - 1),
                      ),
                    ),
                  ),
                  sg
                    ? i.default.createElement(
                        "div",
                        { className: "text-xs mt-2", style: { color: "#3ecf8e" } },
                        "Te faltan ",
                        sdcBandaMin(ix + 1, ff) - pt,
                        " pts para ",
                        sdcCalT(ix + 1, s),
                        ".",
                      )
                    : i.default.createElement(
                        "div",
                        { className: "text-xs mt-2", style: { color: "#ffb84f" } },
                        "Estás en el calibre más alto.",
                      ),
                );
              })(),
              Py
                ? Un < ci.length
                  ? i.default.createElement(
                      i.default.Fragment,
                      null,
                      i.default.createElement(
                        "div",
                        { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
                        "Punto de Partida (",
                        Un + 1,
                        "/",
                        ci.length,
                        ") · sigue la cadencia del metrónomo.",
                      ),
                      i.default.createElement(PruebaAptitud, {
                        key: "re-" + ci[Un].key,
                        exercise: ci[Un],
                        onFinish: (m) => {
                          let N = ci[Un].key;
                          (N === "sq" && hu(String(m)),
                            N === "pu" && Su(String(m)),
                            N === "ab" && Cu(String(m)),
                            N === "bk" && sdcSetRbk(String(m)),
                            gu((_) => _ + 1));
                        },
                      }),
                      i.default.createElement(
                        "button",
                        {
                          onClick: () => yu(!1),
                          className: "w-full py-2 text-xs mt-2",
                          style: {
                            background: "rgba(255,255,255,0.08)",
                            border: "1px solid rgba(255,255,255,0.28)",
                            color: "#e8ecf7",
                            fontWeight: 600,
                          },
                        },
                        "Cancelar",
                      ),
                    )
                  : i.default.createElement(
                      i.default.Fragment,
                      null,
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-1",
                          style: { color: "#9aa4bd" },
                        },
                        i.default.createElement("span", null, "Sentadillas"),
                        i.default.createElement("span", { style: { color: "#e8ecf7" } }, vu || 0),
                      ),
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-1",
                          style: { color: "#9aa4bd" },
                        },
                        i.default.createElement("span", null, "Flexiones (×2)"),
                        i.default.createElement("span", { style: { color: "#e8ecf7" } }, xu || 0),
                      ),
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-1",
                          style: { color: "#9aa4bd" },
                        },
                        i.default.createElement("span", null, "Remo invertido (×2)"),
                        i.default.createElement(
                          "span",
                          { style: { color: "#e8ecf7" } },
                          sdcRbk || 0,
                        ),
                      ),
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-2",
                          style: { color: "#9aa4bd" },
                        },
                        i.default.createElement("span", null, "Abdominales"),
                        i.default.createElement("span", { style: { color: "#e8ecf7" } }, Nu || 0),
                      ),
                      i.default.createElement(
                        "div",
                        {
                          className: "flex justify-between text-sm mb-3",
                          style: { color: "#ffb84f", fontWeight: 700 },
                        },
                        i.default.createElement("span", null, "Puntaje"),
                        i.default.createElement(
                          "span",
                          null,
                          puntajePrueba(
                            parseInt(vu || "0", 10),
                            parseInt(xu || "0", 10),
                            parseInt(Nu || "0", 10),
                            parseInt(sdcRbk || "0", 10),
                          ),
                          " pts",
                        ),
                      ),
                      i.default.createElement(
                        "div",
                        { className: "flex gap-2" },
                        i.default.createElement(
                          "button",
                          {
                            onClick: () => gu(0),
                            className: "flex-1 py-2 text-xs",
                            style: {
                              background: "rgba(255,255,255,0.08)",
                              border: "1px solid rgba(255,255,255,0.28)",
                              color: "#e8ecf7",
                              fontWeight: 600,
                            },
                          },
                          "Repetir",
                        ),
                        i.default.createElement(
                          "button",
                          {
                            onClick: sg,
                            className: "flex-1 py-2 text-xs",
                            style: { background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 },
                          },
                          "Guardar",
                        ),
                      ),
                    )
                : i.default.createElement(
                    "button",
                    {
                      onClick: () => {
                        (gu(0), hu(""), Su(""), Cu(""), yu(!0));
                      },
                      className: "w-full py-3 text-sm",
                      style: {
                        background: "rgba(255,184,79,0.1)",
                        border: "1px solid #ffb84f",
                        color: "#ffb84f",
                      },
                    },
                    "Repetir Punto de Partida",
                  ),
            ),
            i.default.createElement(
              Plegable,
              {
                id: "primeras",
                title: "Primeras veces",
                accent: "#b084f5",
                style: { marginBottom: 16 },
                collapsed:
                  H && H.collapsed && H.collapsed.primeras !== void 0 ? me("primeras") : !0,
                onToggle: fe,
                right: String(sdcPrimeras(e).length),
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "El día que hacés algo que antes no podías, queda acá. No se borra nunca.",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: sdcPrimeraManual,
                  className: "w-full py-2 text-xs mb-3",
                  style: {
                    minHeight: 44,
                    background: "rgba(176,132,245,0.12)",
                    border: "1px solid #b084f5",
                    color: "#e8ecf7",
                    fontWeight: 600,
                  },
                },
                "Hoy pude algo que antes no podía",
              ),
              sdcPrimeras(e).length === 0
                ? i.default.createElement(
                    "div",
                    { className: "text-xs", style: { color: "#7a83a0" } },
                    "Todavía no hay ninguna. Van a aparecer solas.",
                  )
                : sdcPrimeras(e).map(function (jp, ji) {
                    return i.default.createElement(
                      "div",
                      {
                        key: ji,
                        className: "py-2 px-2 mb-1",
                        style: {
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        },
                      },
                      i.default.createElement(
                        "div",
                        { className: "text-xs", style: { color: "#e8ecf7" } },
                        jp.texto,
                      ),
                      i.default.createElement(
                        "div",
                        { className: "text-xs", style: { color: "#7a83a0" } },
                        jp.fecha +
                          (jp.origen === "escrita" ? " · lo anotaste vos" : " · primera vez"),
                      ),
                    );
                  }),
            ),
            i.default.createElement(
              Plegable,
              {
                id: "respaldo",
                title: "Respaldo de tu progreso",
                accent: "#4f9dff",
                style: { marginBottom: 16 },
                collapsed:
                  H && H.collapsed && H.collapsed.respaldo !== void 0 ? me("respaldo") : !0,
                onToggle: fe,
              },
              i.default.createElement(
                "div",
                { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
                "Tu progreso ya se guarda solo en este dispositivo. Usá esto para tener una copia de seguridad o pasar tu progreso a otro dispositivo.",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                "Exportar — copia este texto y guárdalo en un lugar seguro:",
              ),
              i.default.createElement("textarea", {
                readOnly: !0,
                value: JSON.stringify(e),
                onClick: (m) => m.target.select(),
                rows: 3,
                className: "w-full mb-2 px-2 py-2 text-xs",
                style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#9aa4bd",
                  resize: "none",
                },
              }),
              i.default.createElement(
                "button",
                {
                  onClick: ug,
                  className: "w-full py-2 text-xs mb-2",
                  style: {
                    background: "rgba(79,157,255,0.1)",
                    border: "1px solid #4f9dff",
                    color: "#4f9dff",
                  },
                },
                "Copiar respaldo",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: bkDescargar,
                  className: "w-full py-2 text-xs mb-4",
                  style: { background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 },
                },
                "Descargar archivo",
              ),
              i.default.createElement(
                "div",
                { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                "Restaurar desde un respaldo:",
              ),
              i.default.createElement("textarea", {
                value: ku,
                onChange: (m) => Wd(m.target.value),
                placeholder: "Pega aquí tu texto de respaldo",
                rows: 3,
                className: "w-full mb-2 px-2 py-2 text-xs",
                style: {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#e8ecf7",
                  resize: "none",
                },
              }),
              i.default.createElement(
                "div",
                { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
                "o carga el archivo que descargaste:",
              ),
              i.default.createElement("input", {
                type: "file",
                accept: "application/json,.json",
                onChange: bkCargar,
                className: "w-full mb-2 text-xs",
                style: { color: "#9aa4bd" },
              }),
              Ry
                ? i.default.createElement(
                    "div",
                    { className: "text-xs text-center", style: { color: "#9aa4bd" } },
                    "¿Seguro? Esto reemplaza tu progreso actual.",
                    " ",
                    i.default.createElement(
                      "button",
                      { onClick: cg, className: "underline", style: { color: "#ff5c7a" } },
                      "Sí, restaurar",
                    ),
                    " ",
                    i.default.createElement(
                      "button",
                      { onClick: () => zu(!1), className: "underline" },
                      "Cancelar",
                    ),
                  )
                : i.default.createElement(
                    "button",
                    {
                      onClick: () => zu(!0),
                      disabled: !ku.trim(),
                      className: "w-full py-2 text-xs disabled:opacity-40",
                      style: {
                        background: "rgba(255,92,122,0.1)",
                        border: "1px solid #ff5c7a",
                        color: "#ff5c7a",
                      },
                    },
                    "Restaurar",
                  ),
            ),
          );
        })(),
      Da === "profile" &&
        i.default.createElement(
          "div",
          { className: "text-center mt-8" },
          i.default.createElement(
            "button",
            {
              onClick: () => {
                if (Se) {
                  (gt(!1), (sdcDevN = 0));
                  return;
                }
                ((sdcDevN += 1), sdcDevN >= 5 && ((sdcDevN = 0), gt(!0)));
              },
              className: "text-xs",
              style: { color: Se ? "#9aa4bd" : "#333a4d" },
            },
            Se ? "Ocultar panel de pruebas" : "v1.0",
          ),
          i.default.createElement(
            "a",
            {
              href: "./privacidad.html",
              target: "_blank",
              rel: "noopener",
              className: "text-xs underline",
              style: { color: "#7a83a0", marginLeft: 14 },
            },
            "Privacidad",
          ),
        ),
      Se &&
        Da === "profile" &&
        i.default.createElement(
          Tarjeta,
          { accent: "#5a6178", style: { marginTop: 12, borderStyle: "dashed" } },
          i.default.createElement(
            "div",
            { className: "text-xs mb-3", style: { color: "#9aa4bd" } },
            "Solo para probar. Estos botones cambian tu progreso al instante, sin esperar a mañana.",
          ),
          i.default.createElement(
            "div",
            {
              className: "mb-3 p-2",
              style: { border: "1px solid #3ecf8e55", background: "rgba(62,207,142,0.06)" },
            },
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#3ecf8e" } },
              "Guardá tu progreso real antes de probar cosas, y volvé a él cuando termines.",
            ),
            i.default.createElement(
              "button",
              {
                onClick: Mg,
                className: "w-full py-2 text-xs mb-2",
                style: {
                  background: "rgba(62,207,142,0.12)",
                  border: "1px solid #3ecf8e",
                  color: "#3ecf8e",
                  fontWeight: 600,
                },
              },
              "Guardar punto de retorno",
            ),
            i.default.createElement(
              "button",
              {
                onClick: _g,
                disabled: !oi,
                className: "w-full py-2 text-xs disabled:opacity-40",
                style: {
                  background: "#3ecf8e",
                  border: "1px solid #3ecf8e",
                  color: "#0a0e1a",
                  fontWeight: 700,
                },
              },
              "Volver a mi progreso",
            ),
            !oi &&
              i.default.createElement(
                "div",
                { className: "text-xs mt-2", style: { color: "#9aa4bd" } },
                "Aún no guardaste ningún punto de retorno.",
              ),
          ),
          i.default.createElement(
            "div",
            { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
            "Saltar a un rango (para ver sus ejercicios y reps):",
          ),
          i.default.createElement(
            "div",
            { className: "grid grid-cols-3 gap-2 mb-3" },
            rangos.map((f) =>
              i.default.createElement(
                "button",
                {
                  key: f,
                  onClick: () => qg(f),
                  className: "py-2 text-xs",
                  style: {
                    background: u.rank === f ? colorRango[f] + "22" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${colorRango[f]}88`,
                    color: colorRango[f],
                    fontWeight: 700,
                  },
                },
                f,
              ),
            ),
          ),
          i.default.createElement(
            "button",
            {
              onClick: Og,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,184,79,0.1)",
                border: "1px solid #ffb84f",
                color: "#ffb84f",
              },
            },
            "Forzar Umbral disponible ahora",
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => jg(200),
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
            },
            "Añadir 200 XP",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Bg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,92,122,0.1)",
                border: "1px solid #ff5c7a",
                color: "#ff5c7a",
              },
            },
            "Simular que fallé el día de ayer",
          ),
          i.default.createElement(
            "button",
            {
              onClick: wg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
            },
            "Reiniciar el día de hoy (repetir rutina)",
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => Yg(5),
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(124,92,255,0.1)",
                border: "1px solid #7c5cff",
                color: "#7c5cff",
              },
            },
            "Exploración: añadir 5 km de golpe",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Gg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,92,122,0.1)",
                border: "1px solid #ff5c7a",
                color: "#ff5c7a",
              },
            },
            "Forzar travesía de hoy",
          ),
          i.default.createElement(
            "button",
            {
              onClick: () => Zg(10),
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(62,207,142,0.1)",
                border: "1px solid #3ecf8e",
                color: "#3ecf8e",
              },
            },
            "Forzar racha a 10 días",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Kg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,184,79,0.1)",
                border: "1px solid #ffb84f",
                color: "#ffb84f",
              },
            },
            "Desbloquear todos los logros",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Vg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,92,122,0.1)",
                border: "1px solid #ff5c7a",
                color: "#ff5c7a",
              },
            },
            "Combate: saltar al primer Jefe",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Qg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
            },
            "Combate: reiniciar desde el primer enemigo",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Wg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(62,207,142,0.1)",
                border: "1px solid #3ecf8e",
                color: "#3ecf8e",
              },
            },
            "Primal: desbloquear siguiente movimiento",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Jg,
              className: "w-full py-2 text-xs mb-2",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
            },
            "Primal: reiniciar contador diario",
          ),
          i.default.createElement(
            "button",
            {
              onClick: Fg,
              className: "w-full py-2 text-xs",
              style: {
                background: "rgba(255,92,122,0.1)",
                border: "1px solid #ff5c7a",
                color: "#ff5c7a",
              },
            },
            "Forzar aviso de sobrecarga",
          ),
        ),
      i.default.createElement(
        "div",
        { className: "text-center mt-4" },
        Ud
          ? i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#9aa4bd" } },
              "¿Seguro? Esto borra todo tu progreso.",
              " ",
              i.default.createElement(
                "button",
                {
                  onClick: Tg,
                  className: "underline",
                  style: { color: "#ff5c7a", display: "inline-block", padding: "15px 12px" },
                },
                "Sí, reiniciar",
              ),
              " ",
              i.default.createElement(
                "button",
                {
                  onClick: () => j(!1),
                  className: "underline",
                  style: { display: "inline-block", padding: "15px 12px" },
                },
                "Cancelar",
              ),
            )
          : i.default.createElement(
              "button",
              {
                onClick: () => j(!0),
                className: "text-xs",
                style: {
                  color: "#9aa4bd",
                  display: "inline-block",
                  padding: "15px 8px",
                  margin: "-15px -8px",
                },
              },
              "Reiniciar todo mi progreso",
            ),
      ),
    ),
  );
}

export { sdcDevN, App };
