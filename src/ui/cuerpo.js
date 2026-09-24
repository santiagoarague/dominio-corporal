// El cuerpo: figura y panel de zonas.
import { i } from "../react.js";
import { IconoCerrar } from "./iconos.js";
import { ry } from "../logica/atributos.js";
import { nombreEjercicio } from "../logica/rutina.js";
import { BarraXp } from "./base.js";

function colorProgreso(e) {
  let a = [42, 49, 72],
    l = [255, 107, 74],
    n = Math.max(0, Math.min(1, e || 0)),
    o = Math.round(a[0] + (l[0] - a[0]) * n),
    s = Math.round(a[1] + (l[1] - a[1]) * n),
    u = Math.round(a[2] + (l[2] - a[2]) * n);
  return `rgb(${o},${s},${u})`;
}
var gruposCuerpo = {
  pushup: { label: "Pecho y hombros", muscles: "Pectoral, deltoides, tríceps" },
  back: { label: "Espalda", muscles: "Dorsal ancho, trapecio, bíceps" },
  squat: { label: "Piernas y glúteos", muscles: "Cuádriceps, isquios, glúteo" },
  abs: { label: "Core", muscles: "Recto abdominal, oblicuos, transverso" },
};
function Bd(e) {
  return Math.floor(Math.sqrt((e || 0) / 25)) + 1;
}
function y5(e) {
  let a = Bd(e),
    l = Math.pow(a - 1, 2) * 25,
    n = Math.pow(a, 2) * 25;
  return { cur: (e || 0) - l, need: n - l, next: n };
}
function wd(e, a) {
  return e ? Math.round((new Date(a + "T00:00:00") - new Date(e + "T00:00:00")) / 864e5) : null;
}
function FiguraCuerpo({ view: e, colors: a, glow: l, ratios: n, selected: o, onSelect: s }) {
  let u = "#161b2e",
    c = "#2a3148",
    r = (p) => ({
      fill: a[p],
      stroke: o === p ? "#ffffff" : c,
      strokeWidth: o === p ? 2 : 1,
      onClick: () => s(o === p ? null : p),
      style: {
        cursor: "pointer",
        animation: n && n[p] >= 1 ? "sdcPulse 1.6s ease-in-out infinite" : "none",
      },
    }),
    sdcMir = "translate(200,0) scale(-1,1)",
    sdcSim = (d, p) => i.default.createElement("path", { d: d, ...r(p) }),
    sdcPar = (d, p) =>
      i.default.createElement(
        "g",
        null,
        i.default.createElement("path", { d: d, ...r(p) }),
        i.default.createElement("path", { d: d, transform: sdcMir, ...r(p) }),
      ),
    sdcIne = (d, dob) =>
      dob
        ? i.default.createElement(
            "g",
            null,
            i.default.createElement("path", { d: d, fill: u, stroke: c, strokeWidth: "1" }),
            i.default.createElement("path", {
              d: d,
              transform: sdcMir,
              fill: u,
              stroke: c,
              strokeWidth: "1",
            }),
          )
        : i.default.createElement("path", { d: d, fill: u, stroke: c, strokeWidth: "1" });
  return i.default.createElement(
    "svg",
    {
      viewBox: "0 0 200 300",
      style: {
        width: "100%",
        maxWidth: 200,
        margin: "0 auto",
        display: "block",
        filter: l ? "drop-shadow(0 0 8px rgba(62,207,142,0.65))" : "none",
      },
    },
    sdcIne("M100,8 L113,17 L115,35 L107,48 L93,48 L85,35 L87,17 Z"),
    sdcIne("M94,47 L106,47 L107,58 L93,58 Z"),
    e === "front"
      ? i.default.createElement(
          i.default.Fragment,
          null,
          sdcIne("M89,57 L111,57 L119,67 L81,67 Z"),
          sdcPar("M84,58 L74,61 L64,72 L62,88 L76,84 L84,70 Z", "pushup"),
          sdcPar("M88,62 L99,60 L99,92 L83,89 L84,72 Z", "pushup"),
          sdcPar("M62,90 L76,86 L74,120 L60,116 Z", "pushup"),
          sdcPar(
            "M88,96 L99,96 L99,108 L87,108 Z M87,110 L99,110 L99,122 L88,122 Z M88,124 L99,124 L99,136 L89,136 Z",
            "abs",
          ),
          sdcPar("M83,93 L87,94 L89,138 L83,127 Z", "abs"),
          sdcIne("M88,139 L112,139 L114,150 L86,150 Z"),
          sdcPar("M86,150 L99,150 L99,208 L82,204 L83,166 Z", "squat"),
        )
      : i.default.createElement(
          i.default.Fragment,
          null,
          sdcSim("M89,57 L111,57 L120,69 L100,77 L80,69 Z", "back"),
          sdcPar("M84,58 L74,61 L64,72 L62,88 L76,84 L84,70 Z", "pushup"),
          sdcPar("M83,71 L99,75 L99,112 L85,104 L80,85 Z", "back"),
          sdcSim("M89,114 L111,114 L109,137 L91,137 Z", "back"),
          sdcPar("M62,90 L76,86 L74,120 L60,116 Z", "pushup"),
          sdcPar("M84,139 L99,139 L99,162 L82,159 Z", "squat"),
          sdcPar("M83,163 L99,163 L99,208 L85,205 Z", "squat"),
        ),
    sdcPar("M60,122 L74,126 L72,156 L61,154 Z", "pushup"),
    sdcIne("M61,158 L72,160 L71,170 L62,168 Z", 1),
    sdcIne("M87,209 L99,209 L99,216 L86,216 Z", 1),
    sdcPar("M87,217 L99,217 L98,264 L89,264 Z", "squat"),
    sdcIne("M89,266 L98,266 L99,276 L79,276 L79,270 Z", 1),
  );
}
function PanelZonas({
  zoneKey: e,
  rank: a,
  classification: l,
  lifetime: n,
  target: o,
  doneToday: s,
  lastTrained: u,
  today: c,
  modality: r,
  onClose: p,
}) {
  let v = gruposCuerpo[e],
    x = Bd(n),
    y = y5(n),
    S = wd(u, c);
  return i.default.createElement(
    "div",
    {
      className: "mt-3 p-3",
      style: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)" },
    },
    i.default.createElement(
      "div",
      { className: "flex items-center justify-between mb-1" },
      i.default.createElement(
        "div",
        { style: { fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 } },
        v.label,
      ),
      i.default.createElement(
        "button",
        { onClick: p, className: "text-xs", style: { color: "#9aa4bd" }, "aria-label": "Cerrar" },
        i.default.createElement(IconoCerrar, { size: 14, color: "#9aa4bd" }),
      ),
    ),
    i.default.createElement(
      "div",
      { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
      v.muscles,
    ),
    ry(e) &&
      i.default.createElement(
        "div",
        { className: "text-xs mb-2", style: { color: "#b084f5" } },
        "Alimenta: ",
        ry(e),
      ),
    i.default.createElement(
      "div",
      { className: "text-xs mb-1", style: { color: "#e8ecf7" } },
      "Ejercicio: ",
      nombreEjercicio(a, l, e, r),
    ),
    i.default.createElement(
      "div",
      { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
      "Hoy: ",
      s,
      " / ",
      o,
      " reps",
    ),
    i.default.createElement(
      "div",
      { className: "flex justify-between text-xs mb-1", style: { color: "#9aa4bd" } },
      i.default.createElement("span", null, "Desarrollo · Nivel ", x),
      i.default.createElement("span", null, y.cur, " / ", y.need),
    ),
    i.default.createElement(BarraXp, { value: y.cur, max: y.need, color: "#3ecf8e" }),
    i.default.createElement(
      "div",
      { className: "text-xs mt-2", style: { color: "#9aa4bd" } },
      n.toLocaleString("es"),
      " reps de por vida · ",
      S === null
        ? "sin estímulo registrado"
        : S === 0
          ? "entrenado hoy"
          : S === 1
            ? "último estímulo: ayer"
            : `último estímulo: hace ${S} días`,
    ),
    S !== null &&
      S >= 3 &&
      i.default.createElement(
        "div",
        { className: "text-xs mt-2", style: { color: "#ffb84f" } },
        "Esta zona lleva ",
        S,
        " días sin estímulo.",
      ),
  );
}

export { colorProgreso, gruposCuerpo, Bd, y5, wd, FiguraCuerpo, PanelZonas };
