// Texto maquina de escribir y pantallas de intro.
import { i } from "../react.js";

function gd({ text: e, speed: a = 45, onDone: l, style: n, showCursor: o }) {
  let [s, u] = (0, i.useState)("");
  return (
    (0, i.useEffect)(() => {
      u("");
      let c = 0,
        r = setInterval(() => {
          ((c += 1), u(e.slice(0, c)), c >= e.length && (clearInterval(r), l && l()));
        }, a);
      return () => clearInterval(r);
    }, [e]),
    i.default.createElement(
      "div",
      { style: n },
      s,
      o &&
        i.default.createElement(
          "span",
          { style: { animation: "sdcBlink 1s step-end infinite" } },
          "▊",
        ),
    )
  );
}
function z5({ onDone: e }) {
  let [a, l] = (0, i.useState)(0);
  return i.default.createElement(
    "div",
    {
      className: "min-h-screen flex flex-col items-center justify-center px-4",
      style: { background: "#0a0e1a" },
    },
    i.default.createElement(
      "div",
      { className: "w-full", style: { maxWidth: 380, fontFamily: "'Chakra Petch', monospace" } },
      i.default.createElement(gd, {
        text: "Nadie te contó de qué es capaz tu cuerpo.",
        speed: 38,
        showCursor: a === 0,
        onDone: () => l(1),
        style: { color: "#e8ecf7", fontSize: 19, marginBottom: 14, letterSpacing: 0.5 },
      }),
      a >= 1 &&
        i.default.createElement(gd, {
          text: "Ni vos lo sabés todavía.",
          speed: 38,
          showCursor: a === 1,
          onDone: () => l(2),
          style: { color: "#9aa4bd", fontSize: 16, marginBottom: 14 },
        }),
      a >= 2 &&
        i.default.createElement(gd, {
          text: "Vamos a averiguarlo.",
          speed: 45,
          showCursor: a === 2,
          onDone: () => l(3),
          style: { color: "#ffb84f", fontSize: 17, lineHeight: 1.5 },
        }),
      a >= 3 &&
        i.default.createElement(
          "button",
          {
            onClick: e,
            className: "w-full py-3 text-sm",
            style: {
              marginTop: 28,
              background: "#4f9dff",
              color: "#0a0e1a",
              fontWeight: 700,
              letterSpacing: 1,
            },
          },
          "Continuar",
        ),
    ),
  );
}

export { gd, z5 };
