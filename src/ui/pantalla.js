// Pantalla encendida (wake lock).
import { i } from "../react.js";

var sdcWL = null;
function sdcWakeOn() {
  try {
    navigator.wakeLock &&
      !sdcWL &&
      navigator.wakeLock
        .request("screen")
        .then(function (w) {
          ((sdcWL = w),
            w.addEventListener("release", function () {
              sdcWL = null;
            }));
        })
        .catch(function () {});
  } catch (x) {}
}
function sdcWakeOff() {
  try {
    sdcWL && sdcWL.release();
  } catch (x) {}
  sdcWL = null;
}
function sdcWakeUse() {
  (0, i.useEffect)(() => {
    sdcWakeOn();
    let x = () => {
      document.visibilityState === "visible" && sdcWakeOn();
    };
    return (
      document.addEventListener("visibilitychange", x),
      () => {
        (document.removeEventListener("visibilitychange", x), sdcWakeOff());
      }
    );
  }, []);
}
function sdcWakeSi(on) {
  (0, i.useEffect)(() => {
    if (!on) return;
    sdcWakeOn();
    let x = () => {
      document.visibilityState === "visible" && sdcWakeOn();
    };
    return (
      document.addEventListener("visibilitychange", x),
      () => {
        (document.removeEventListener("visibilitychange", x), sdcWakeOff());
      }
    );
  }, [on]);
}

export { sdcWL, sdcWakeOn, sdcWakeOff, sdcWakeUse, sdcWakeSi };
