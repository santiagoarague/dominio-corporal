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
      .then(function (w) {
        sdcWakePend = !1;
        if (sdcWakeN <= 0) return void w.release();
        sdcWL = w;
        w.addEventListener("release", function () {
          sdcWL === w && (sdcWL = null);
        });
      })
      .catch(function () {
        sdcWakePend = !1;
      });
  } catch (x) {
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
  } catch (x) {}
  sdcWL = null;
}
function usePantallaEncendida() {
  useEffect(() => {
    sdcWakeOn();
    let x = () => {
      document.visibilityState === "visible" && sdcWakePedir();
    };
    return (
      document.addEventListener("visibilitychange", x),
      () => {
        (document.removeEventListener("visibilitychange", x), sdcWakeOff());
      }
    );
  }, []);
}
function usePantallaSi(on) {
  useEffect(() => {
    if (!on) return;
    sdcWakeOn();
    let x = () => {
      document.visibilityState === "visible" && sdcWakePedir();
    };
    return (
      document.addEventListener("visibilitychange", x),
      () => {
        (document.removeEventListener("visibilitychange", x), sdcWakeOff());
      }
    );
  }, [on]);
}

export { sdcWL, sdcWakeOn, sdcWakeOff, sdcWakePedir, usePantallaEncendida, usePantallaSi };
