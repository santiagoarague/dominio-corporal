// Primeras veces, titulos, racha, marcas de series, gimnasio y avisos.
import { sdcDescs, sdcTitulos } from "../datos/rangos.js";
import { modalidadDelDia, fechaLocal, ejercicioDe, fechaHoy, bandasCalibre } from "./rutina.js";
import { clonar, deshacerRegistroBase } from "./partida.js";

function sdcPodia(partida) {
  return (partida && partida.podia) || {};
}
function sdcVistos(partida) {
  return (partida && partida.vistos) || {};
}
function sdcPrimeras(partida) {
  return (partida && partida.primeras) || [];
}
function sdcPrimeraAdd(partida, texto, origen) {
  var lista = sdcPrimeras(partida).slice();
  lista.unshift({ fecha: fechaHoy(), texto: texto, origen: origen });
  if (lista.length > 120) lista.length = 120;
  partida.primeras = lista;
  return partida;
}
function sdcPrimerasHook(resultado, repsSesion) {
  if (!resultado || !resultado.state) return resultado;
  var partida = resultado.state,
    grupos = ["squat", "pushup", "back", "abs"],
    modalidad = modalidadDelDia(partida.profile, partida.today.date, partida.today.modality),
    podiaAntes = sdcPodia(partida),
    podia = {},
    clave;
  for (clave in podiaAntes) podia[clave] = podiaAntes[clave];
  var hubo = !1,
    vistos = {},
    vistosAntes = sdcVistos(partida),
    hayVisto = !1;
  for (clave in vistosAntes) vistos[clave] = vistosAntes[clave];
  for (var indice = 0; indice < grupos.length; indice++) {
    var grupo = grupos[indice];
    if (!repsSesion || !(repsSesion[grupo] > 0)) continue;
    var ej = ejercicioDe(grupo, partida.progress.rank, modalidad);
    if (!ej || !ej.name) continue;
    vistos[ej.name] || ((vistos[ej.name] = !0), (hayVisto = !0));
    if (podia[ej.name] !== !1) continue;
    podia[ej.name] = !0;
    hubo = !0;
    sdcPrimeraAdd(partida, ej.name, "declarada");
    resultado.notices = resultado.notices || [];
    resultado.notices.push("Primera vez: " + ej.name + ". Antes no podías.");
  }
  if (hubo) partida.podia = podia;
  if (hayVisto) partida.vistos = vistos;
  return resultado;
}
function sdcJuego(perfil) {
  var elegido = perfil && perfil.tituloSet;
  if (elegido && sdcTitulos[elegido]) return elegido;
  var mods = (perfil && perfil.modalities) || [];
  for (var indice = 0; indice < mods.length; indice++)
    if (sdcTitulos[mods[indice]]) return mods[indice];
  return "bodyweight";
}
function sdcRango(rango, perfil) {
  var titulos = sdcTitulos[sdcJuego(perfil)];
  return (titulos && titulos[rango]) || String(rango);
}
function sdcDescRango(rango, perfil) {
  var descs = sdcDescs[sdcJuego(perfil)];
  return (descs && descs[rango]) || "";
}
var sdcCalTit = {
    bodyweight: [
      "Primeros apoyos",
      "Base firme",
      "Aguante propio",
      "Trabajo largo",
      "Fuerza relativa",
      "Fuera de la tabla",
    ],
    gym: [
      "Primeros pesos",
      "Base para cargar",
      "Aguante entre series",
      "Sesión larga",
      "Carga alta",
      "Fuera de la tabla",
    ],
    flow: [
      "Primeras posiciones",
      "Piso firme",
      "Aguante continuo",
      "Tránsito largo",
      "Control fino",
      "Fuera de la tabla",
    ],
  },
  sdcCalFoco = {
    bodyweight: [
      "Acondicionamiento y movilidad",
      "Control motor y fuerza básica",
      "Volumen e intensidad moderada",
      "Series largas y variantes más difíciles",
      "Progresiones unilaterales",
      "Unilateral estricto e isometría",
    ],
    gym: [
      "Recorrido y técnica antes que carga",
      "Series cortas con carga conservadora",
      "Más series por sesión y progresión semanal",
      "Volumen alto con descansos bien usados",
      "Pocas repeticiones, mucha exigencia",
      "Carga máxima y descansos largos",
    ],
    flow: [
      "Movilidad y apoyo en el suelo",
      "Control motor y transiciones simples",
      "Encadenar sin frenar",
      "Secuencias largas y sostenes",
      "Inversiones y trabajo unilateral",
      "Secuencias completas sin cortes",
    ],
  };
function sdcCalT(banda, perfil) {
  var titulos = sdcCalTit[sdcJuego(perfil)];
  return (titulos && titulos[banda]) || (bandasCalibre[banda] && bandasCalibre[banda].label) || "";
}
function sdcCalF(banda, perfil) {
  var focos = sdcCalFoco[sdcJuego(perfil)];
  return (focos && focos[banda]) || (bandasCalibre[banda] && bandasCalibre[banda].focus) || "";
}
function sdcRachaCalc(partida) {
  var historia = (partida && partida.history) || {},
    hoy = fechaHoy(),
    dia = new Date(hoy + "T00:00:00"),
    racha = 0,
    vuelta,
    fecha,
    estado;
  for (vuelta = 0; vuelta < 400; vuelta++) {
    fecha = fechaLocal(dia);
    estado = historia[fecha];
    if (fecha === hoy && !estado) {
      dia.setDate(dia.getDate() - 1);
      continue;
    }
    if (estado === "full" || estado === "partial") racha++;
    else if (estado !== "rest" && estado !== "shield") break;
    dia.setDate(dia.getDate() - 1);
  }
  return racha;
}
function sdcDiaPasado(actual, fecha) {
  var partida = clonar(actual),
    avisos = [],
    hoy = fechaHoy();
  if (!fecha || fecha >= hoy) return { state: partida, notices: avisos };
  var estado = partida.history[fecha];
  if (estado && estado !== "skipped" && estado !== "missed")
    return { state: partida, notices: ["Ese día ya estaba registrado."] };
  ((partida.history[fecha] = "partial"),
    partida.dayLog || (partida.dayLog = {}),
    partida.dayLog[fecha] || (partida.dayLog[fecha] = { acts: [], reps: null, xp: 0 }),
    partida.dayLog[fecha].acts.includes("Anotado después") ||
      partida.dayLog[fecha].acts.push("Anotado después"),
    partida.week.sessionDates || (partida.week.sessionDates = []),
    fecha >= partida.week.weekStart &&
      !partida.week.sessionDates.includes(fecha) &&
      (partida.week.sessionDates.push(fecha),
      (partida.week.trained = partida.week.sessionDates.length)));
  var racha = sdcRachaCalc(partida);
  return (
    racha > (partida.streak.current || 0) &&
      ((partida.streak.current = racha),
      (partida.streak.best = Math.max(partida.streak.best || 0, racha))),
    avisos.push("Anotado: entrenaste el " + fecha + ". Cuenta como día entrenado, sin XP."),
    { state: partida, notices: avisos }
  );
}
function sdcMarcaK(modalidad, modo) {
  return String(modalidad) + "|" + String(modo);
}
function sdcMarca(partida, clave) {
  var hoy = partida && partida.today;
  if (!hoy) return null;
  var marca = hoy.marcas && hoy.marcas[clave];
  if (marca) return marca;
  var vieja = hoy.marca;
  return vieja && sdcMarcaK(vieja.mod, vieja.mode) === clave ? vieja : null;
}
function sdcHoyReps(partida) {
  var hoy = partida && partida.today;
  if (!hoy) return { squat: 0, pushup: 0, back: 0, abs: 0 };
  var registro = partida.dayLog && partida.dayLog[hoy.date],
    reps = registro && registro.reps;
  return reps || hoy.reps || { squat: 0, pushup: 0, back: 0, abs: 0 };
}
function sdcHoyMeta(partida, respaldo) {
  var hoy = partida && partida.today,
    registro = hoy && partida.dayLog && partida.dayLog[hoy.date],
    meta = registro && registro.meta;
  return meta || respaldo || { squat: 0, pushup: 0, back: 0, abs: 0 };
}
function sdcSumaReps(unas, otras) {
  var grupos = ["squat", "pushup", "back", "abs"],
    suma = {},
    indice;
  for (indice = 0; indice < grupos.length; indice++)
    suma[grupos[indice]] =
      ((unas && unas[grupos[indice]]) || 0) + ((otras && otras[grupos[indice]]) || 0);
  return suma;
}
function sdcDeshacerHook(antes, resultado) {
  if (!resultado || !resultado.state || !resultado.state.undoSnapshot || !antes) return resultado;
  resultado.state.undoSnapshot.ach = (antes.achievements || []).slice();
  return resultado;
}
function sdcDeshacer(actual) {
  var snapshot = actual && actual.undoSnapshot,
    resultado = deshacerRegistroBase(actual);
  if (!snapshot || !snapshot.snap || !actual.today || snapshot.date !== actual.today.date)
    return resultado;
  var partida = resultado.state,
    reps = snapshot.reps || {},
    modalidad = modalidadDelDia(partida.profile, partida.today.date, partida.today.modality);
  partida.month &&
    partida.month.reps &&
    ["squat", "pushup", "back", "abs"].forEach(function (grupo) {
      partida.month.reps[grupo] = Math.max(
        0,
        (partida.month.reps[grupo] || 0) - (reps[grupo] || 0),
      );
    });
  [
    partida.lifetimeModalities,
    partida.week && partida.week.modalities,
    partida.month && partida.month.modalities,
  ].forEach(function (contador) {
    contador && contador[modalidad] > 0 && (contador[modalidad] -= 1);
  });
  snapshot.ach && (partida.achievements = snapshot.ach.slice());
  return resultado;
}
function sdcMetaHook(resultado, meta) {
  if (!resultado || !resultado.state || !meta) return resultado;
  var partida = resultado.state,
    hoy = partida.today,
    registro = hoy && partida.dayLog && partida.dayLog[hoy.date];
  if (registro) registro.meta = sdcSumaReps(registro.meta, meta);
  return resultado;
}
function sdcIncKg(kg, grupo) {
  var kilos = Number(kg) || 0;
  if (grupo === "squat") return kilos >= 40 ? 5 : 2.5;
  return kilos >= 20 ? 2.5 : 1;
}
function sdcSugKg(partida, grupo, nom) {
  if (!nom) return null;
  var ultima = ((partida && partida.gymUlt) || {})[nom];
  if (!ultima || !ultima.kgs || !ultima.kgs.length) return null;
  var maxKg = 0,
    indice;
  for (indice = 0; indice < ultima.kgs.length; indice++)
    if (ultima.kgs[indice] > maxKg) maxKg = ultima.kgs[indice];
  if (maxKg <= 0) return null;
  var pct = ultima.pct === void 0 ? 1 : ultima.pct;
  return pct >= 0.999
    ? { kg: Math.round((maxKg + sdcIncKg(maxKg, grupo)) * 10) / 10, sube: !0 }
    : { kg: maxKg, sube: !1 };
}
function sdcGymSer(partida) {
  return (partida && partida.gymSerieKg) || {};
}
function sdcGymUlt(partida) {
  return (partida && partida.gymUlt) || {};
}
function sdcKgTxt(valor) {
  var numero = Number(valor) || 0;
  return String(Math.round(numero * 10) / 10).replace(".", ",");
}
function sdcTier(aviso) {
  var texto = String(aviso || "");
  if (
    texto.indexOf("Primera vez:") >= 0 ||
    texto.indexOf("Cruzaste a") >= 0 ||
    texto.indexOf("Subiste a nivel") >= 0 ||
    texto.indexOf("Volviste al último rango") >= 0
  )
    return "epic";
  if (texto.indexOf("Ya no podés alcanzar") >= 0 || texto.indexOf("vuelve a empezar") >= 0)
    return "bad";
  if (
    texto.indexOf("Logro desbloqueado") >= 0 ||
    texto.indexOf("logros desbloqueados") >= 0 ||
    texto.indexOf("Nuevo sistema desbloqueado") >= 0 ||
    texto.indexOf("Recuperaste") >= 0 ||
    texto.indexOf("Rutina completa") >= 0 ||
    texto.indexOf("completada") >= 0 ||
    texto.indexOf("Bono") >= 0 ||
    texto.charAt(0) === "+"
  )
    return "good";
  return "info";
}
var sdcEstilo = {
  epic: { background: "rgba(255,184,79,0.16)", border: "2px solid #ffb84f", color: "#ffe2b0" },
  good: {
    background: "rgba(62,207,142,0.10)",
    border: "1px solid rgba(62,207,142,0.45)",
    color: "#bdf0d9",
  },
  bad: {
    background: "rgba(255,92,122,0.10)",
    border: "1px solid rgba(255,92,122,0.45)",
    color: "#ffc4ce",
  },
  info: {
    background: "rgba(79,157,255,0.08)",
    border: "1px solid rgba(79,157,255,0.35)",
    color: "#cfe0ff",
  },
};
var sdcOrden = { epic: 0, good: 1, bad: 2, info: 3 };

export {
  sdcPodia,
  sdcVistos,
  sdcPrimeras,
  sdcPrimeraAdd,
  sdcPrimerasHook,
  sdcJuego,
  sdcRango,
  sdcDescRango,
  sdcCalTit,
  sdcCalFoco,
  sdcCalT,
  sdcCalF,
  sdcRachaCalc,
  sdcDiaPasado,
  sdcMarcaK,
  sdcMarca,
  sdcHoyReps,
  sdcHoyMeta,
  sdcSumaReps,
  sdcDeshacerHook,
  sdcDeshacer,
  sdcMetaHook,
  sdcIncKg,
  sdcSugKg,
  sdcGymSer,
  sdcGymUlt,
  sdcKgTxt,
  sdcTier,
  sdcEstilo,
  sdcOrden,
};
