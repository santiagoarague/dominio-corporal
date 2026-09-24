// Calendario de Constancia.
import { i } from "../react.js";
import { zd } from "./iconos.js";
import { fechaLocal } from "../logica/rutina.js";
import { sdcAnimoFrase } from "./animo.js";

function h5({ items: e }) {
  return i.default.createElement(
    "div",
    { className: "grid grid-cols-2 gap-x-3 gap-y-1 mt-3" },
    e.map((a) =>
      i.default.createElement(
        "div",
        { key: a.label, className: "flex items-center gap-2 text-xs", style: { color: "#9aa4bd" } },
        i.default.createElement("span", {
          style: {
            width: 10,
            height: 10,
            background: a.color,
            border: a.borde || "none",
            display: "inline-block",
            flexShrink: 0,
          },
        }),
        a.label,
      ),
    ),
  );
}
var bt = {
  full: "#3ecf8e",
  partial: "#ffb84f",
  rest: "#4f9dff",
  shield: "#7c5cff",
  skipped: "#46506b",
  missed: "#ff5c7a",
  pending: "#2a3148",
  empty: "#161b2e",
};
function diasConstancia(e, a, l, n) {
  let o = [],
    s = new Date(a + "T00:00:00");
  for (let u = n - 1; u >= 0; u--) {
    let c = new Date(s);
    c.setDate(c.getDate() - u);
    let r = fechaLocal(c),
      p = (e || {})[r];
    (!p && r === a && (p = l), o.push({ date: r, status: p || "empty" }));
  }
  let sdcI = 0;
  while (sdcI < o.length - 1 && o[sdcI].status === "empty") sdcI++;
  return o.slice(sdcI);
}
function S5({ days: e, onPick: a, selected: l }) {
  return i.default.createElement(
    "div",
    { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 } },
    e.map((n) =>
      i.default.createElement("button", {
        key: n.date,
        onClick: () => a && a(n.date),
        title: n.date,
        style: {
          height: 18,
          padding: 0,
          background: bt[n.status] || bt.empty,
          border:
            l === n.date
              ? "2px solid #ffffff"
              : n.status === "pending"
                ? "1px dashed rgba(255,255,255,0.3)"
                : "1px solid rgba(255,255,255,0.06)",
        },
      }),
    ),
  );
}
var N5 = {
  full: "Rutina completa",
  partial: "Sesión parcial",
  rest: "Día de descanso",
  shield: "Protegido por escudo",
  skipped: "Sin entrenar (dentro de meta)",
  missed: "Fuera de meta",
  pending: "Hoy, aún pendiente",
  empty: "Sin registro",
};
function C5({ date: e, status: a, log: l, onClose: n, onLog: sol, animo: an }) {
  let [cf, scf] = (0, i.useState)(!1);
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
        e,
      ),
      i.default.createElement(
        "button",
        { onClick: n, "aria-label": "Cerrar" },
        i.default.createElement(zd, { size: 14, color: "#9aa4bd" }),
      ),
    ),
    i.default.createElement(
      "div",
      { className: "text-xs mb-2", style: { color: bt[a] || "#8a93ad" } },
      N5[a] || "Sin registro",
    ),
    l && l.acts && l.acts.length > 0
      ? i.default.createElement(
          i.default.Fragment,
          null,
          i.default.createElement(
            "div",
            { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
            "Actividades: ",
            l.acts
              .map(function (jx) {
                return jx === "Mazmorra" ? "Travesía" : jx;
              })
              .join(" · "),
          ),
          l.reps &&
            i.default.createElement(
              "div",
              { className: "text-xs", style: { color: "#9aa4bd" } },
              "Reps: ",
              l.reps.squat || 0,
              " piernas · ",
              l.reps.pushup || 0,
              " empuje · ",
              l.reps.back || 0,
              " tracción · ",
              l.reps.abs || 0,
              " core",
            ),
          l.xp > 0 &&
            i.default.createElement(
              "div",
              { className: "text-xs mt-1", style: { color: "#3ecf8e" } },
              "+",
              l.xp,
              " XP ese día",
            ),
        )
      : i.default.createElement(
          "div",
          { className: "text-xs", style: { color: "#7a83a0" } },
          "No hay actividades registradas.",
        ),
    an && an.antes
      ? i.default.createElement(
          "div",
          { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
          "Llegaste ",
          sdcAnimoFrase(an.antes),
          an.despues ? " · te fuiste " + sdcAnimoFrase(an.despues) : "",
        )
      : null,
    sol
      ? cf
        ? i.default.createElement(
            "div",
            { className: "mt-3" },
            i.default.createElement(
              "div",
              { className: "text-xs mb-2", style: { color: "#9aa4bd" } },
              "Se anota como sesión hecha, sin XP.",
            ),
            i.default.createElement(
              "button",
              {
                onClick: () => {
                  (scf(!1), sol(e));
                },
                className: "w-full py-2 text-xs",
                style: { background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700, minHeight: 44 },
              },
              "Sí, entrené ese día",
            ),
            i.default.createElement(
              "button",
              {
                onClick: () => scf(!1),
                className: "w-full py-2 text-xs mt-1",
                style: {
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#9aa4bd",
                  minHeight: 44,
                },
              },
              "Cancelar",
            ),
          )
        : i.default.createElement(
            "button",
            {
              onClick: () => scf(!0),
              className: "w-full py-2 text-xs mt-3",
              style: {
                background: "rgba(62,207,142,0.1)",
                border: "1px solid #3ecf8e",
                color: "#3ecf8e",
                fontWeight: 600,
                minHeight: 44,
              },
            },
            "Entrené este día y me olvidé de anotarlo",
          )
      : null,
  );
}

export { h5, bt, diasConstancia, S5, N5, C5 };
