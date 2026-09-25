// Pantalla encendida (wake lock).
import { useEffect } from "react";

// El bloqueo es uno solo para toda la app, y varias partes lo piden a la vez (el
// descanso, la sesion, el Primal...). Por eso se cuenta: cada sdcWakeOn suma un
// pedido, cada sdcWakeOff lo resta, y la pantalla recien se libera cuando no
// queda ninguno. Antes, la primera parte que soltaba lo apagaba para todas.
var sdcWL = null,
  sdcWakeN = 0,
  sdcWakePend = !1;
function sdcWakePedir() {
  try {
    if (!navigator.wakeLock || sdcWL || sdcWakePend || sdcWakeN <= 0) return;
    sdcWakePend = !0;
    navigator.wakeLock
      .request("screen")
      .then(function (bloqueo) {
        sdcWakePend = !1;
        if (sdcWakeN <= 0) return void bloqueo.release();
        sdcWL = bloqueo;
        bloqueo.addEventListener("release", function () {
          sdcWL === bloqueo && (sdcWL = null);
        });
      })
      .catch(function () {
        sdcWakePend = !1;
      });
  } catch (err) {
    sdcWakePend = !1;
  }
}
function sdcWakeOn() {
  sdcWakeN++;
  sdcWakePedir();
}
function sdcWakeOff() {
  sdcWakeN = Math.max(0, sdcWakeN - 1);
  if (sdcWakeN > 0) return;
  try {
    sdcWL && sdcWL.release();
  } catch (err) {}
  sdcWL = null;
}
function usePantallaEncendida() {
  useEffect(() => {
    sdcWakeOn();
    let alVolver = () => {
      document.visibilityState === "visible" && sdcWakePedir();
    };
    return (
      document.addEventListener("visibilitychange", alVolver),
      () => {
        (document.removeEventListener("visibilitychange", alVolver), sdcWakeOff());
      }
    );
  }, []);
}
function usePantallaSi(on) {
  useEffect(() => {
    if (!on) return;
    sdcWakeOn();
    let alVolver = () => {
      document.visibilityState === "visible" && sdcWakePedir();
    };
    return (
      document.addEventListener("visibilitychange", alVolver),
      () => {
        (document.removeEventListener("visibilitychange", alVolver), sdcWakeOff());
      }
    );
  }, [on]);
}

export { sdcWL, sdcWakeOn, sdcWakeOff, sdcWakePedir, usePantallaEncendida, usePantallaSi };
