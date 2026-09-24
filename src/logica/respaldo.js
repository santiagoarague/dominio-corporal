// Recordatorio de respaldo.
import { fechaHoy } from "./rutina.js";

function sdcRespDias(k) {
  try {
    var v = localStorage.getItem(k);
    if (!v) return null;
    var d = Math.round((Date.parse(fechaHoy()) - Date.parse(v)) / 864e5);
    return isFinite(d) ? d : null;
  } catch (x) {
    return null;
  }
}
function sdcRespaldoOk() {
  try {
    (localStorage.setItem("dominio-corporal:ultimoRespaldo", fechaHoy()),
      localStorage.removeItem("dominio-corporal:respaldoPospuesto"));
  } catch (x) {}
}
function sdcRespaldoPosponer() {
  try {
    localStorage.setItem("dominio-corporal:respaldoPospuesto", fechaHoy());
  } catch (x) {}
}
function sdcAvisaRespaldo(e) {
  try {
    if (Object.keys((e && e.history) || {}).length < 10) return !1;
    var p = sdcRespDias("dominio-corporal:respaldoPospuesto");
    if (p !== null && p < 7) return !1;
    var d = sdcRespDias("dominio-corporal:ultimoRespaldo");
    return d === null || d >= 30;
  } catch (x) {
    return !1;
  }
}

export { sdcRespDias, sdcRespaldoOk, sdcRespaldoPosponer, sdcAvisaRespaldo };
