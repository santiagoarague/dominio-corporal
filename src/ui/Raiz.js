// Raiz: carga la partida y elige entre inicio y app.
import { i } from "../react.js";
import { K, ei, n5, p5 } from "../logica/partida.js";
import { j5 } from "./Inicio.js";
import { B5 } from "./App.js";

function w5() {
  let [e, a] = (0, i.useState)(!0),
    [l, n] = (0, i.useState)(null),
    [o, s] = (0, i.useState)([]);
  (0, i.useEffect)(() => {
    (async () => {
      let r = await p5();
      if (r) {
        let { state: p, notices: v } = ei(r);
        (n(p), s(v || []), K(p));
      }
      a(!1);
    })();
  }, []);
  function u(r) {
    let p = n5(r);
    (n(p), K(p));
  }
  function c(r) {
    try {
      let p = JSON.parse(r.trim());
      if (!p || !p.profile || !p.progress) return !1;
      let { state: v, notices: x } = ei(p);
      return (n(v), s(x || []), K(v), !0);
    } catch (p) {
      return !1;
    }
  }
  return i.default.createElement(
    "div",
    null,
    i.default.createElement(
      "style",
      null,
      `
        * { box-sizing: border-box; }
        @keyframes sdcBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes sdcPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        input:focus, button:focus { outline: 2px solid #4f9dff; outline-offset: 1px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `,
    ),
    e
      ? i.default.createElement(
          "div",
          {
            className: "min-h-screen flex items-center justify-center",
            style: { background: "#0a0e1a", color: "#9aa4bd" },
          },
          "Cargando...",
        )
      : l
        ? i.default.createElement(B5, { player: l, setPlayer: n, initialNotices: o })
        : i.default.createElement(j5, { onFinish: u, onLoadBackup: c }),
  );
}

export { w5 };
