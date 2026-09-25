// Prueba de aptitud y el pitido.
import { useState, useEffect } from "react";
import { Tarjeta } from "./base.jsx";
import { usePantallaEncendida } from "./pantalla.js";

// pitido(hz, ms) suena un tono que se apaga solo. Con hasta, el tono se desliza
// de hz a hasta; con tipo, cambia el timbre ("triangle" suena mas seco que "sine").
function pitido(hz, ms, hasta, tipo) {
  try {
    let Contexto = window.AudioContext || window.webkitAudioContext;
    if (!Contexto) return;
    pitido._ctx || (pitido._ctx = new Contexto());
    let ctx = pitido._ctx;
    ctx.state === "suspended" && ctx.resume();
    let osc = ctx.createOscillator(),
      ganancia = ctx.createGain();
    (osc.frequency.setValueAtTime(hz, ctx.currentTime),
      hasta && osc.frequency.exponentialRampToValueAtTime(hasta, ctx.currentTime + ms / 1e3),
      (osc.type = tipo || "sine"),
      ganancia.gain.setValueAtTime(0.18, ctx.currentTime),
      ganancia.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ms / 1e3),
      osc.connect(ganancia),
      ganancia.connect(ctx.destination),
      osc.start(),
      osc.stop(ctx.currentTime + ms / 1e3));
  } catch (err) {}
}
// Los tres sonidos del ciclo baja-pausa-sube, compartidos por el metronomo y la
// prueba de aptitud. Baja: un tono que cae. Sube: uno que sube. Pausa: un doble
// tic seco, mas agudo y con otro timbre, para que no se confunda con los otros dos.
// Todos por encima de 690 Hz: el parlante de un telefono casi no da tonos graves.
function sdcSonidoFase(fase) {
  if (fase === "down") return pitido(1047, 220, 698);
  if (fase === "up") return pitido(698, 220, 1047);
  (pitido(1568, 45, 0, "triangle"), setTimeout(() => pitido(1568, 45, 0, "triangle"), 110));
}
function PruebaAptitud({ exercise, onFinish }) {
  let [estado, setEstado] = useState("idle"),
    [cuenta, setCuenta] = useState(10),
    [fase, setFase] = useState("down"),
    [reps, setReps] = useState(0);
  (usePantallaEncendida(),
    useEffect(() => {
      if (estado !== "countdown") return;
      if (cuenta <= 0) {
        (pitido(880, 180), setFase("down"), setEstado("running"));
        return;
      }
      cuenta <= 3 && pitido(520, 120);
      let espera = setTimeout(() => setCuenta((previo) => previo - 1), 1e3);
      return () => clearTimeout(espera);
    }, [estado, cuenta]),
    useEffect(() => {
      if (estado !== "running") return;
      if (fase === "down") {
        sdcSonidoFase("down");
        let espera = setTimeout(() => setFase("hold"), 2e3);
        return () => clearTimeout(espera);
      }
      if (fase === "hold") {
        sdcSonidoFase("hold");
        let espera = setTimeout(() => setFase("up"), 1e3);
        return () => clearTimeout(espera);
      }
      sdcSonidoFase("up");
      let espera = setTimeout(() => {
        (setReps((previo) => previo + 1), setFase("down"));
      }, 2e3);
      return () => clearTimeout(espera);
    }, [estado, fase, reps]));
  let color =
    estado === "countdown"
      ? "#ffb84f"
      : fase === "down"
        ? "#4f9dff"
        : fase === "hold"
          ? "#ffb84f"
          : "#3ecf8e";
  return (
    <Tarjeta accent={color}>
      <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
        {exercise.label}
      </div>
      <div className="mb-3" style={{ fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" }}>
        {exercise.hint}
      </div>
      {estado === "idle" && (
        <>
          <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
            Mismo ritmo que el metrónomo de la rutina: 2 s de bajada, 1 s de pausa y 2 s de subida.
            Solo cuentan las repeticiones que completes con él. Cuando ya no puedas seguir el ritmo,
            detené la prueba.
          </div>
          <button
            onClick={() => {
              (setCuenta(10), setReps(0), setEstado("countdown"));
            }}
            className="w-full py-3 text-sm"
            style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
          >
            Comenzar
          </button>
        </>
      )}
      {estado === "countdown" && (
        <div className="text-center py-4">
          <div
            className="text-xs uppercase"
            style={{ letterSpacing: 2, color: "#ffb84f", fontWeight: 700 }}
          >
            PONETE EN POSICIÓN
          </div>
          <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 52, color }}>
            {cuenta || "¡YA!"}
          </div>
        </div>
      )}
      {estado === "running" && (
        <>
          <div className="text-center py-2">
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 40,
                color,
                letterSpacing: 2,
              }}
            >
              {fase === "down" ? "BAJA" : fase === "hold" ? "PAUSA" : "SUBE"}
            </div>
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              {fase === "hold" ? "1 segundo" : "2 segundos"}
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 34,
                color: "#e8ecf7",
                marginTop: 10,
              }}
            >
              {reps} reps
            </div>
          </div>
          <button
            onClick={() => {
              (setEstado("idle"), onFinish(reps));
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

export { pitido, sdcSonidoFase, PruebaAptitud };
