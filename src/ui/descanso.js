// Barra de descanso.
import { i } from "../react.js";
import { sdcEstMMSS } from "../logica/estiramiento.js";
import { qa } from "./base.js";
import { sdcVib } from "../logica/series.js";
import { pitido } from "./prueba.js";
import { sdcWakeUse } from "./pantalla.js";

function T5({ seconds: e, onSkip: a, ini: t0 }) {
  let [n, tk] = (0, i.useState)(0),
    l = Math.max(0, e - Math.floor((Date.now() - (t0 || Date.now())) / 1e3));
  sdcWakeUse();
  (0, i.useEffect)(() => {
    if (l <= 0) {
      (pitido(880, 200), sdcVib([40, 60, 40]), a());
      return;
    }
    let o = setTimeout(() => tk((x) => x + 1), 250);
    return () => clearTimeout(o);
  }, [n, t0]);
  return i.default.createElement(
    "div",
    {
      style: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: "rgba(10,14,26,0.97)",
        borderTop: "2px solid #ffb84f",
        paddingBottom: "env(safe-area-inset-bottom)",
      },
    },
    i.default.createElement(
      "div",
      { className: "mx-auto", style: { maxWidth: 420, padding: "10px 16px 12px" } },
      i.default.createElement(
        "div",
        { className: "flex items-center justify-between gap-3" },
        i.default.createElement(
          "div",
          null,
          i.default.createElement(
            "div",
            { className: "text-xs", style: { color: "#9aa4bd", letterSpacing: 2 } },
            "DESCANSO",
          ),
          i.default.createElement(
            "div",
            {
              style: {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 32,
                color: "#ffb84f",
                lineHeight: 1.1,
              },
            },
            sdcEstMMSS(l),
          ),
        ),
        i.default.createElement(
          "button",
          {
            onClick: a,
            style: {
              minHeight: 44,
              padding: "0 18px",
              background: "rgba(255,184,79,0.12)",
              border: "1px solid #ffb84f",
              color: "#ffb84f",
              fontWeight: 700,
            },
          },
          "Saltar →",
        ),
      ),
      i.default.createElement(
        "div",
        { className: "mt-2" },
        i.default.createElement(qa, { value: e - l, max: e, color: "#ffb84f" }),
      ),
    ),
  );
}

export { T5 };
