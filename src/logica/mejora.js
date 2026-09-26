// ¿Cuánto mejoraste? Cada prueba de aptitud queda guardada con su fecha en
// partida.pruebas, y la app compara la última con la anterior y con la primera.
// Sin migración: si una partida no tiene la lista, historialPruebas la arma con
// profile.testResults, sin fecha (no se sabe cuándo se hizo).
// Solo se comparan pruebas con el mismo ritmo: las de antes del ritmo del metrónomo
// (sin ritmo: 5), las escritas a mano y los valores por defecto medían otra cosa.
import { puntajePrueba, guardarPrueba } from "./rutina.js";
import { clonar } from "./partida.js";
import { diasEntre } from "../ui/cuerpo.jsx";

var diasParaRepetir = 28,
  diasPospuesta = 7,
  gruposPrueba = ["squat", "pushup", "back", "abs"];

function historialPruebas(partida) {
  if (Array.isArray(partida.pruebas)) return partida.pruebas;
  let medida = partida.profile && partida.profile.testResults;
  return medida ? [{ fecha: null, ...medida }] : [];
}
function puntajeDe(prueba) {
  return puntajePrueba(prueba.squat || 0, prueba.pushup || 0, prueba.abs || 0, prueba.back || 0);
}
// Días desde la última prueba. La que no tiene fecha se cuenta desde el día en que
// empezaste, que es lo más temprano que pudo ser.
function diasDesdePrueba(partida, hoy) {
  let historia = historialPruebas(partida),
    ultima = historia[historia.length - 1];
  if (!ultima) return null;
  let desde = ultima.fecha || (partida.profile && partida.profile.createdDate);
  return desde ? diasEntre(desde, hoy) : null;
}
function tocaRepetirPrueba(partida, hoy) {
  let pospuesta = partida.ui && partida.ui.pruebaPospuesta;
  if (pospuesta && diasEntre(pospuesta, hoy) < diasPospuesta) return !1;
  let dias = diasDesdePrueba(partida, hoy);
  return dias !== null && dias >= diasParaRepetir;
}
function posponerPrueba(original, hoy) {
  let partida = clonar(original);
  partida.ui = partida.ui || { collapsed: {} };
  return ((partida.ui.pruebaPospuesta = hoy), partida);
}
// null si no se pueden comparar (falta una o se midieron con distinto ritmo).
function compararPruebas(antes, ahora) {
  if (!antes || !ahora || (antes.ritmo || 0) !== (ahora.ritmo || 0)) return null;
  return {
    grupos: gruposPrueba.map((grupo) => ({
      grupo,
      antes: antes[grupo] || 0,
      ahora: ahora[grupo] || 0,
      dif: (ahora[grupo] || 0) - (antes[grupo] || 0),
    })),
    antes: puntajeDe(antes),
    ahora: puntajeDe(ahora),
    dif: puntajeDe(ahora) - puntajeDe(antes),
  };
}
// La primera y la última prueba comparables entre sí (mismo ritmo que la última).
function primeraYUltima(partida) {
  let historia = historialPruebas(partida),
    ultima = historia[historia.length - 1];
  if (!ultima || historia.length < 2) return null;
  let primera = historia.find((prueba) => (prueba.ritmo || 0) === (ultima.ritmo || 0));
  return primera && primera !== ultima ? { primera, ultima } : null;
}
// Lo que hace el botón Guardar de la prueba: la guarda como siempre (guardarPrueba no
// cambia) y además la anota con fecha y dice cuánto cambió respecto de la anterior.
function guardarPruebaConHistoria(original, sentadillas, flexiones, abdominales, remo, ritmo, hoy) {
  let anterior = historialPruebas(original),
    previa = anterior[anterior.length - 1],
    resultado = guardarPrueba(original, sentadillas, flexiones, abdominales, remo, ritmo),
    partida = resultado.state,
    nueva = {
      fecha: hoy,
      squat: sentadillas,
      pushup: flexiones,
      abs: abdominales,
      back: remo || 0,
      ritmo: ritmo || 0,
    },
    avisos = [...resultado.notices];
  partida.pruebas = [...anterior, nueva].slice(-24);
  let cambio = compararPruebas(previa, nueva);
  cambio &&
    avisos.push(
      cambio.dif > 0
        ? `¡Mejoraste! Tu puntaje pasó de ${cambio.antes} a ${cambio.ahora} (+${cambio.dif}).`
        : `Tu puntaje pasó de ${cambio.antes} a ${cambio.ahora}.`,
    );
  return { state: partida, notices: avisos };
}

export {
  diasParaRepetir,
  historialPruebas,
  puntajeDe,
  diasDesdePrueba,
  tocaRepetirPrueba,
  posponerPrueba,
  compararPruebas,
  primeraYUltima,
  guardarPruebaConHistoria,
};
