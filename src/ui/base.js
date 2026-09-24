// Tarjeta simple y barra de XP.
import { i } from "../react.js";

function Tarjeta({ children: e, accent: a = "#4f9dff", style: l = {} }) {
  return i.default.createElement(
    "div",
    {
      className: "relative border",
      style: {
        borderColor: a + "55",
        background: "linear-gradient(180deg, rgba(18,24,43,0.9), rgba(10,14,26,0.9))",
        ...l,
      },
    },
    i.default.createElement("span", {
      className: "absolute w-3 h-3 border-t-2 border-l-2",
      style: { top: -1, left: -1, borderColor: a },
    }),
    i.default.createElement("span", {
      className: "absolute w-3 h-3 border-t-2 border-r-2",
      style: { top: -1, right: -1, borderColor: a },
    }),
    i.default.createElement("span", {
      className: "absolute w-3 h-3 border-b-2 border-l-2",
      style: { bottom: -1, left: -1, borderColor: a },
    }),
    i.default.createElement("span", {
      className: "absolute w-3 h-3 border-b-2 border-r-2",
      style: { bottom: -1, right: -1, borderColor: a },
    }),
    i.default.createElement("div", { className: "p-4" }, e),
  );
}
function BarraXp({ value: e, max: a, color: l }) {
  let n = a > 0 ? Math.min(100, (e / a) * 100) : 100;
  return i.default.createElement(
    "div",
    {
      className: "w-full h-2 overflow-hidden",
      style: { background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" },
    },
    i.default.createElement("div", {
      className: "h-full transition-all duration-500",
      style: { width: n + "%", background: `linear-gradient(90deg, ${l}, #ffffff66)` },
    }),
  );
}

export { Tarjeta, BarraXp };
