// Prueba de aptitud y el pitido (Ie).
import { useState, useEffect } from "react";
import { Tarjeta } from "./base.jsx";
import { sdcWakeUse } from "./pantalla.js";

var E5 = 2e3,
  A5 = 1e3;
function pitido(e, a) {
  try {
    let l = window.AudioContext || window.webkitAudioContext;
    if (!l) return;
    pitido._ctx || (pitido._ctx = new l());
    let n = pitido._ctx;
    n.state === "suspended" && n.resume();
    let o = n.createOscillator(),
      s = n.createGain();
    ((o.frequency.value = e),
      (o.type = "sine"),
      s.gain.setValueAtTime(0.18, n.currentTime),
      s.gain.exponentialRampToValueAtTime(0.001, n.currentTime + a / 1e3),
      o.connect(s),
      s.connect(n.destination),
      o.start(),
      o.stop(n.currentTime + a / 1e3));
  } catch (l) {}
}
function PruebaAptitud({ exercise: e, onFinish: a }) {
  let [l, n] = useState("idle"),
    [o, s] = useState(10),
    [u, c] = useState("down"),
    [r, p] = useState(0);
  (sdcWakeUse(),
    useEffect(() => {
      if (l !== "countdown") return;
      if (o <= 0) {
        (pitido(880, 180), c("down"), n("running"));
        return;
      }
      o <= 3 && pitido(520, 120);
      let x = setTimeout(() => s((y) => y - 1), 1e3);
      return () => clearTimeout(x);
    }, [l, o]),
    useEffect(() => {
      if (l !== "running") return;
      if (u === "down") {
        pitido(440, 140);
        let y = setTimeout(() => c("hold"), 2e3);
        return () => clearTimeout(y);
      }
      if (u === "hold") {
        pitido(560, 120);
        let y = setTimeout(() => c("up"), 1e3);
        return () => clearTimeout(y);
      }
      pitido(660, 140);
      let x = setTimeout(() => {
        (p((y) => y + 1), c("down"));
      }, 2e3);
      return () => clearTimeout(x);
    }, [l, u, r]));
  let v =
    l === "countdown" ? "#ffb84f" : u === "down" ? "#4f9dff" : u === "hold" ? "#ffb84f" : "#3ecf8e";
  return (
    <Tarjeta accent={v}>
      <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
        {e.label}
      </div>
      <div className="mb-3" style={{ fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" }}>
        {e.hint}
      </div>
      {l === "idle" && (
        <>
          <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
            Mismo ritmo que el metrónomo de la rutina: 2 s de bajada, 1 s de pausa y 2 s de subida.
            Solo cuentan las repeticiones que completes con él. Cuando ya no puedas seguir el ritmo,
            detené la prueba.
          </div>
          <button
            onClick={() => {
              (s(10), p(0), n("countdown"));
            }}
            className="w-full py-3 text-sm"
            style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
          >
            Comenzar
          </button>
        </>
      )}
      {l === "countdown" && (
        <div className="text-center py-4">
          <div
            className="text-xs uppercase"
            style={{ letterSpacing: 2, color: "#ffb84f", fontWeight: 700 }}
          >
            PONETE EN POSICIÓN
          </div>
          <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 52, color: v }}>
            {o || "¡YA!"}
          </div>
        </div>
      )}
      {l === "running" && (
        <>
          <div className="text-center py-2">
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 40,
                color: v,
                letterSpacing: 2,
              }}
            >
              {u === "down" ? "BAJA" : u === "hold" ? "PAUSA" : "SUBE"}
            </div>
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              {u === "hold" ? "1 segundo" : "2 segundos"}
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 34,
                color: "#e8ecf7",
                marginTop: 10,
              }}
            >
              {r} reps
            </div>
          </div>
          <button
            onClick={() => {
              (n("idle"), a(r));
            }}
            className="w-full py-3 text-sm mt-2"
            style={{ background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 }}
          >
            No puedo más — detener
          </button>
        </>
      )}
    </Tarjeta>
  );
}

export { E5, A5, pitido, PruebaAptitud };
