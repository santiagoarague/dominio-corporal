// Raiz: carga la partida y elige entre inicio y app.
import { useState, useEffect } from "react";
import { guardarPartida, cargarPartida, crearPartida, leerPartida } from "../logica/partida.js";
import { Inicio } from "./Inicio.jsx";
import { App } from "./App.jsx";

function Raiz() {
  let [cargando, setCargando] = useState(!0),
    [player, setPlayer] = useState(null),
    [avisos, setAvisos] = useState([]);
  useEffect(() => {
    (async () => {
      let guardada = await leerPartida();
      if (guardada) {
        let { state: partida, notices: nuevos } = cargarPartida(guardada);
        (setPlayer(partida), setAvisos(nuevos || []));
      }
      setCargando(!1);
    })();
  }, []);
  // La partida se guarda en un solo lugar: cada vez que cambia. App, Inicio y la
  // carga de un respaldo solo la reemplazan con setPlayer(...), asi que ningun cambio
  // puede quedar sin guardar. Reiniciar todo la deja en null y no guarda nada.
  useEffect(() => {
    player && guardarPartida(player);
  }, [player]);
  function empezar(datos) {
    let partida = crearPartida(datos);
    setPlayer(partida);
  }
  function cargarRespaldo(texto) {
    try {
      let datos = JSON.parse(texto.trim());
      if (!datos || !datos.profile || !datos.progress) return !1;
      let { state: partida, notices: nuevos } = cargarPartida(datos);
      return (setPlayer(partida), setAvisos(nuevos || []), !0);
    } catch (err) {
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
      {cargando ? (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#0a0e1a", color: "#9aa4bd" }}
        >
          Cargando...
        </div>
      ) : player ? (
        <App player={player} setPlayer={setPlayer} initialNotices={avisos} />
      ) : (
        <Inicio onFinish={empezar} onLoadBackup={cargarRespaldo} />
      )}
    </div>
  );
}

export { Raiz };
