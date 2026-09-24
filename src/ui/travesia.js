// Cronometro de travesia.
import { i } from "../react.js";
import { IconoCheck } from "./iconos.js";
import { sdcPortales } from "../logica/explorar.js";
import { BarraXp } from "./base.js";
import { pitido } from "./prueba.js";
import { sdcWakeUse } from "./pantalla.js";

function sdcTravMin(t) {
  var m = /(\d+)\s*minutos/.exec(String(t || ""));
  return m ? parseInt(m[1], 10) : 20;
}
function sdcTravRitmo(n) {
  for (var q = 0; q < sdcPortales.length; q++) if (sdcPortales[q].n === n) return sdcPortales[q];
  return {};
}
function CronoTravesia({ inicio: e, mins: a, on: l, off: n, onCancel: o, onListo: s }) {
  let [u1, c] = (0, i.useState)(Math.floor((Date.now() - e) / 1e3)),
    u = Math.max(0, u1);
  sdcWakeUse();
  (0, i.useEffect)(() => {
    let t = setInterval(() => c(Math.floor((Date.now() - e) / 1e3)), 500);
    return () => clearInterval(t);
  }, [e]);
  let pre = Math.max(0, Math.ceil((e - Date.now()) / 1e3)),
    tot = a * 60,
    listo = u >= tot,
    rest = Math.max(0, tot - u),
    ci = l && n ? l + n : 0,
    fu = ci ? u % ci < l : !1,
    fase = ci ? Math.floor(u / ci) * 2 + (fu ? 0 : 1) : Math.floor(u / 300),
    mm = String(Math.floor(rest / 60)).padStart(2, "0"),
    ss = String(rest % 60).padStart(2, "0");
  return (
    (0, i.useEffect)(() => {
      u > 0 && !listo && pitido(ci ? (fu ? 880 : 440) : 660, ci ? 170 : 120);
    }, [fase]),
    (0, i.useEffect)(() => {
      listo && pitido(990, 340);
    }, [listo]),
    (0, i.useEffect)(() => {
      pre === 0 && u < 2 && pitido(880, 180);
    }, [pre > 0]),
    i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "div",
        {
          className: "text-center py-3 mb-2",
          style: {
            border: "1px solid " + (listo ? "#3ecf8e55" : "#ff5c7a55"),
            background: listo ? "rgba(62,207,142,0.06)" : "rgba(255,92,122,0.06)",
          },
        },
        i.default.createElement(
          "div",
          { className: "text-xs", style: { color: "#9aa4bd" } },
          pre > 0 ? "PONETE EN POSICIÓN" : listo ? "Travesía cumplida" : "Te falta",
        ),
        i.default.createElement(
          "div",
          {
            style: {
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 40,
              color: pre > 0 ? "#ffb84f" : listo ? "#3ecf8e" : "#ff5c7a",
            },
          },
          pre > 0 ? pre : listo ? "¡Listo!" : mm + ":" + ss,
        ),
        ci && !listo && !pre
          ? i.default.createElement(
              "div",
              {
                style: {
                  fontFamily: "Chakra Petch, sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: fu ? "#ffb84f" : "#9aa4bd",
                },
              },
              fu ? "FUERTE" : "SUAVE",
            )
          : null,
      ),
      i.default.createElement(BarraXp, {
        value: u,
        max: tot,
        color: listo ? "#3ecf8e" : "#ff5c7a",
      }),
      listo
        ? i.default.createElement(
            "button",
            {
              onClick: s,
              className: "w-full flex items-center justify-center gap-2 py-3 text-sm mt-3",
              style: { minHeight: 48, background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 },
            },
            i.default.createElement(IconoCheck, { size: 16 }),
            " Completar travesía",
          )
        : i.default.createElement(
            "button",
            {
              onClick: o,
              className: "w-full text-xs underline mt-3",
              style: { minHeight: 44, color: "#9aa4bd" },
            },
            "Cancelar",
          ),
    )
  );
}

export { sdcTravMin, sdcTravRitmo, CronoTravesia };
