// Resumen del mes: al empezar un mes, Entreno muestra lo que hiciste en el anterior y
// lo compara con el de antes. Se calcula del dayLog, que nunca se recorta (history
// guarda solo 60 días): un día cuenta como entrenado si anotó alguna sesión.
// ui.resumenMesVisto guarda el último mes que el jugador ya cerró con «Entendido».
import { sdcPrimeras } from "./extras.js";
import { clonar } from "./partida.js";

var nombresMes = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
// "2026-10-02" -> "2026-09"; "2026-01-05" -> "2025-12".
function claveMesAnterior(fecha) {
  let anio = +fecha.slice(0, 4),
    mes = +fecha.slice(5, 7) - 1;
  mes < 1 && ((mes = 12), (anio -= 1));
  return anio + "-" + String(mes).padStart(2, "0");
}
function nombreMes(clave) {
  return nombresMes[+clave.slice(5, 7) - 1] || clave;
}
function resumenMes(partida, clave) {
  let registro = partida.dayLog || {},
    resumen = { clave, dias: 0, perfectos: 0, reps: 0, xp: 0, primeras: 0 };
  for (let fecha of Object.keys(registro)) {
    if (fecha.slice(0, 7) !== clave) continue;
    let dia = registro[fecha] || {},
      actividades = dia.acts || [];
    actividades.length && (resumen.dias += 1);
    actividades.includes("Rutina completa") && (resumen.perfectos += 1);
    let reps = dia.reps || {};
    resumen.reps += (reps.squat || 0) + (reps.pushup || 0) + (reps.back || 0) + (reps.abs || 0);
    resumen.xp += dia.xp || 0;
  }
  resumen.primeras = sdcPrimeras(partida).filter(
    (primera) => primera.fecha && primera.fecha.slice(0, 7) === clave,
  ).length;
  return resumen;
}
// El resumen del mes que terminó, en los primeros diasResumenMes días del mes nuevo,
// si hubo algo que resumir y todavía no lo cerraste. Más tarde ya no es noticia.
var diasResumenMes = 10;
function tocaResumenMes(partida, hoy) {
  if (+hoy.slice(8, 10) > diasResumenMes) return null;
  let clave = claveMesAnterior(hoy);
  if (partida.ui && partida.ui.resumenMesVisto === clave) return null;
  let resumen = resumenMes(partida, clave);
  return resumen.dias ? resumen : null;
}
function cerrarResumenMes(original, clave) {
  let partida = clonar(original);
  partida.ui = partida.ui || { collapsed: {} };
  return ((partida.ui.resumenMesVisto = clave), partida);
}

export { claveMesAnterior, nombreMes, resumenMes, tocaResumenMes, cerrarResumenMes };
