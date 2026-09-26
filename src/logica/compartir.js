// Lo que dice la imagen de «Compartir mi semana»: todo sale de la partida, y la
// imagen se arma en el teléfono (ui/compartir.jsx). Nada se manda a ningún lado:
// el jugador elige a qué app mandarla, o la descarga.
import { metaSemanal, fechaLocal } from "./rutina.js";
import { sdcRango } from "./extras.js";
import { nombreMes } from "./mes.js";

function sumarDias(fecha, dias) {
  let dia = new Date(fecha + "T00:00:00");
  return (dia.setDate(dia.getDate() + dias), fechaLocal(dia));
}
// "21 al 27 de septiembre" o "28 de septiembre al 4 de octubre".
function rangoSemana(desde, hasta) {
  let dia = (fecha) => +fecha.slice(8, 10),
    mes = (fecha) => nombreMes(fecha.slice(0, 7));
  return mes(desde) === mes(hasta)
    ? dia(desde) + " al " + dia(hasta) + " de " + mes(hasta)
    : dia(desde) + " de " + mes(desde) + " al " + dia(hasta) + " de " + mes(hasta);
}
function datosSemana(partida, hoy) {
  let semana = partida.week || {},
    desde = semana.weekStart,
    historia = partida.history || {},
    sesiones = semana.sessionDates || [],
    reps = semana.reps || {},
    dias = [];
  for (let i = 0; i < 7; i++) {
    let fecha = sumarDias(desde, i),
      estado =
        fecha > hoy
          ? "futuro"
          : historia[fecha] ||
            (sesiones.includes(fecha) ? "partial" : fecha === hoy ? "pending" : "empty");
    dias.push({ fecha, estado });
  }
  return {
    nombre: (partida.profile && partida.profile.name) || "",
    rango: rangoSemana(desde, sumarDias(desde, 6)),
    desde,
    dias,
    sesiones: semana.trained || 0,
    meta: metaSemanal(partida),
    reps: (reps.squat || 0) + (reps.pushup || 0) + (reps.back || 0) + (reps.abs || 0),
    racha: (partida.streak && partida.streak.current) || 0,
    nivel: partida.progress.level,
    titulo: sdcRango(partida.progress.rank, partida.profile),
  };
}

export { datosSemana, rangoSemana };
