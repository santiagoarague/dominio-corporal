// Recordatorio de respaldo.
import { fechaHoy } from "./rutina.js";

function sdcRespDias(clave) {
  try {
    var valor = localStorage.getItem(clave);
    if (!valor) return null;
    var dias = Math.round((Date.parse(fechaHoy()) - Date.parse(valor)) / 864e5);
    return isFinite(dias) ? dias : null;
  } catch (err) {
    return null;
  }
}
function sdcRespaldoOk() {
  try {
    (localStorage.setItem("dominio-corporal:ultimoRespaldo", fechaHoy()),
      localStorage.removeItem("dominio-corporal:respaldoPospuesto"));
  } catch (err) {}
}
function sdcRespaldoPosponer() {
  try {
    localStorage.setItem("dominio-corporal:respaldoPospuesto", fechaHoy());
  } catch (err) {}
}
function sdcAvisaRespaldo(partida) {
  try {
    if (Object.keys((partida && partida.history) || {}).length < 10) return !1;
    var pospuesto = sdcRespDias("dominio-corporal:respaldoPospuesto");
    if (pospuesto !== null && pospuesto < 7) return !1;
    var dias = sdcRespDias("dominio-corporal:ultimoRespaldo");
    return dias === null || dias >= 30;
  } catch (err) {
    return !1;
  }
}

export { sdcRespDias, sdcRespaldoOk, sdcRespaldoPosponer, sdcAvisaRespaldo };
