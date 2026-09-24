// Cronometro de caminata.
import { i } from "../react.js";
import { sdcWakeUse } from "./pantalla.js";

var sdcRitmos = [
  { t: "Caminata tranquila", v: 4 },
  { t: "Caminata ligera", v: 5.5 },
  { t: "Trote suave", v: 8 },
  { t: "Corriendo", v: 10 },
];
function CronoCaminata({ inicio: e, kmh: a, onCancel: l, onListo: n }) {
  let [o, s] = (0, i.useState)(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
  sdcWakeUse();
  (0, i.useEffect)(() => {
    let t = setInterval(() => s(Math.max(0, Math.floor((Date.now() - e) / 1e3))), 500);
    return () => clearInterval(t);
  }, [e]);
  let km = Math.round((o / 3600) * a * 100) / 100,
    mm = String(Math.floor(o / 60)).padStart(2, "0"),
    ss = String(o % 60).padStart(2, "0");
  return i.default.createElement(
    "div",
    { className: "mb-3" },
    i.default.createElement(
      "div",
      {
        className: "text-center py-3 mb-2",
        style: { border: "1px solid #7c5cff55", background: "rgba(124,92,255,0.06)" },
      },
      i.default.createElement(
        "div",
        { className: "text-xs", style: { color: "#9aa4bd" } },
        "Salida en curso",
      ),
      i.default.createElement(
        "div",
        { style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 38, color: "#b9a5ff" } },
        mm + ":" + ss,
      ),
      i.default.createElement(
        "div",
        { className: "text-xs", style: { color: "#9aa4bd" } },
        "≈ " + km.toFixed(2).replace(".", ",") + " km a " + String(a).replace(".", ",") + " km/h",
      ),
    ),
    i.default.createElement(
      "div",
      { className: "grid grid-cols-2 gap-2" },
      i.default.createElement(
        "button",
        {
          onClick: () => n(km),
          className: "py-2 text-xs",
          style: {
            minHeight: 44,
            background: "rgba(124,92,255,0.15)",
            border: "1px solid #7c5cff",
            color: "#e8ecf7",
            fontWeight: 600,
          },
        },
        "Terminar",
      ),
      i.default.createElement(
        "button",
        {
          onClick: l,
          className: "py-2 text-xs",
          style: {
            minHeight: 44,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#9aa4bd",
          },
        },
        "Cancelar",
      ),
    ),
  );
}

export { sdcRitmos, CronoCaminata };
