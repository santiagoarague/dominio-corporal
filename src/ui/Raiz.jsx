// Raiz: carga la partida y elige entre inicio y app.
import { useState, useEffect } from "react";
import { guardarPartida, cargarPartida, crearPartida, leerPartida } from "../logica/partida.js";
import { Inicio } from "./Inicio.jsx";
import { App } from "./App.jsx";

function Raiz() {
  let [e, a] = useState(!0),
    [l, n] = useState(null),
    [o, s] = useState([]);
  useEffect(() => {
    (async () => {
      let r = await leerPartida();
      if (r) {
        let { state: p, notices: v } = cargarPartida(r);
        (n(p), s(v || []));
      }
      a(!1);
    })();
  }, []);
  // La partida se guarda en un solo lugar: cada vez que cambia. App, Inicio y la
  // carga de un respaldo solo la reemplazan con n(...), asi que ningun cambio
  // puede quedar sin guardar. Reiniciar todo la deja en null y no guarda nada.
  useEffect(() => {
    l && guardarPartida(l);
  }, [l]);
  function u(r) {
    let p = crearPartida(r);
    n(p);
  }
  function c(r) {
    try {
      let p = JSON.parse(r.trim());
      if (!p || !p.profile || !p.progress) return !1;
      let { state: v, notices: x } = cargarPartida(p);
      return (n(v), s(x || []), !0);
    } catch (p) {
      return !1;
    }
  }
  return (
    <div>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes sdcBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes sdcPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        input:focus, button:focus { outline: 2px solid #4f9dff; outline-offset: 1px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>
      {e ? (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#0a0e1a", color: "#9aa4bd" }}
        >
          Cargando...
        </div>
      ) : l ? (
        <App player={l} setPlayer={n} initialNotices={o} />
      ) : (
        <Inicio onFinish={u} onLoadBackup={c} />
      )}
    </div>
  );
}

export { Raiz };
