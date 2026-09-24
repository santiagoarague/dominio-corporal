// Tarjeta plegable y botones de sistemas.
import { i } from "../react.js";
import { IconoFlecha } from "./iconos.js";
import { colorRango } from "../datos/rangos.js";
import { Tarjeta } from "./base.js";

function Plegable({
  id: e,
  title: a,
  accent: l,
  collapsed: n,
  onToggle: o,
  right: s,
  children: u,
  style: c,
}) {
  let r = !n;
  return i.default.createElement(
    Tarjeta,
    { accent: l, style: c },
    i.default.createElement(
      "button",
      {
        onClick: () => o(e, !!n),
        className: "w-full flex items-center justify-between",
        style: { background: "transparent", border: "none", padding: "12px 0", margin: "-12px 0" },
      },
      i.default.createElement(
        "div",
        { className: "flex items-center gap-2" },
        i.default.createElement(
          "span",
          {
            style: {
              display: "inline-block",
              transform: r ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform .2s",
            },
          },
          i.default.createElement(IconoFlecha, { size: 14, color: "#9aa4bd" }),
        ),
        i.default.createElement(
          "span",
          { style: { fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 } },
          a,
        ),
      ),
      i.default.createElement("span", { className: "text-xs", style: { color: "#9aa4bd" } }, s),
    ),
    r && i.default.createElement("div", { className: "mt-3" }, u),
  );
}
function BotonSistema({ icon: e, label: a, status: l, done: n, onClick: o }) {
  return i.default.createElement(
    "button",
    {
      onClick: o,
      className: "w-full flex items-center justify-between py-2 px-2 mb-1 text-left",
      style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" },
    },
    i.default.createElement(
      "div",
      { className: "flex items-center gap-2" },
      i.default.createElement(e, { size: 14, color: n ? "#3ecf8e" : "#8a93ad" }),
      i.default.createElement("span", { className: "text-sm", style: { color: "#e8ecf7" } }, a),
    ),
    i.default.createElement(
      "span",
      { className: "text-xs", style: { color: n ? "#3ecf8e" : "#8a93ad" } },
      l,
    ),
  );
}
function k5(e) {
  return colorRango[e] || "#ffb84f";
}
function DibujoMascota({ type: e, size: a = 56, color: l = "#ffb84f", rank: n }) {
  let o = n && ["A", "S", "Z"].includes(n),
    s = n && ["S", "Z"].includes(n),
    u = { width: a, height: a, display: "block", filter: s ? `drop-shadow(0 0 6px ${l})` : "none" },
    c = o
      ? i.default.createElement("path", {
          d: "M32,6 L40,16 L50,4 L60,16 L68,6 L66,22 L34,22 Z",
          fill: l,
          opacity: "0.95",
        })
      : null;
  return e === "cat"
    ? i.default.createElement(
        "svg",
        { viewBox: "0 0 100 100", style: u },
        i.default.createElement("path", { d: "M25,38 L33,10 L45,32 Z", fill: l }),
        i.default.createElement("path", { d: "M75,38 L67,10 L55,32 Z", fill: l }),
        c,
        i.default.createElement("circle", { cx: "50", cy: "55", r: "28", fill: l }),
        i.default.createElement("circle", { cx: "40", cy: "52", r: "4", fill: "#161b2e" }),
        i.default.createElement("circle", { cx: "60", cy: "52", r: "4", fill: "#161b2e" }),
        i.default.createElement("path", { d: "M46,62 L54,62 L50,67 Z", fill: "#161b2e" }),
        i.default.createElement("path", {
          d: "M50,67 Q50,71 44,71",
          stroke: "#161b2e",
          strokeWidth: "2",
          fill: "none",
        }),
        i.default.createElement("path", {
          d: "M50,67 Q50,71 56,71",
          stroke: "#161b2e",
          strokeWidth: "2",
          fill: "none",
        }),
        i.default.createElement("line", {
          x1: "14",
          y1: "58",
          x2: "30",
          y2: "60",
          stroke: "#161b2e",
          strokeWidth: "1.5",
        }),
        i.default.createElement("line", {
          x1: "14",
          y1: "65",
          x2: "30",
          y2: "65",
          stroke: "#161b2e",
          strokeWidth: "1.5",
        }),
        i.default.createElement("line", {
          x1: "86",
          y1: "58",
          x2: "70",
          y2: "60",
          stroke: "#161b2e",
          strokeWidth: "1.5",
        }),
        i.default.createElement("line", {
          x1: "86",
          y1: "65",
          x2: "70",
          y2: "65",
          stroke: "#161b2e",
          strokeWidth: "1.5",
        }),
      )
    : i.default.createElement(
        "svg",
        { viewBox: "0 0 100 100", style: u },
        i.default.createElement("ellipse", {
          cx: "21",
          cy: "46",
          rx: "11",
          ry: "19",
          transform: "rotate(-15 21 46)",
          fill: l,
        }),
        i.default.createElement("ellipse", {
          cx: "79",
          cy: "46",
          rx: "11",
          ry: "19",
          transform: "rotate(15 79 46)",
          fill: l,
        }),
        c,
        i.default.createElement("circle", { cx: "50", cy: "55", r: "27", fill: l }),
        i.default.createElement("ellipse", {
          cx: "50",
          cy: "66",
          rx: "15",
          ry: "11",
          fill: "#ffe0b3",
        }),
        i.default.createElement("circle", { cx: "41", cy: "50", r: "4", fill: "#161b2e" }),
        i.default.createElement("circle", { cx: "59", cy: "50", r: "4", fill: "#161b2e" }),
        i.default.createElement("ellipse", {
          cx: "50",
          cy: "63",
          rx: "4",
          ry: "3",
          fill: "#161b2e",
        }),
        i.default.createElement("path", {
          d: "M50,66 Q50,70 44,71",
          stroke: "#161b2e",
          strokeWidth: "2",
          fill: "none",
        }),
        i.default.createElement("path", {
          d: "M50,66 Q50,70 56,71",
          stroke: "#161b2e",
          strokeWidth: "2",
          fill: "none",
        }),
        i.default.createElement("path", {
          d: "M43,73 Q50,78 57,73",
          stroke: "#161b2e",
          strokeWidth: "1.5",
          fill: "none",
        }),
      );
}

export { Plegable, BotonSistema, k5, DibujoMascota };
