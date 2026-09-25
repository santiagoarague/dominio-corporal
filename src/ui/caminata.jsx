// Cronometro de caminata.
import { useState, useEffect } from "react";
import { usePantallaEncendida } from "./pantalla.js";

var sdcRitmos = [
  { t: "Caminata tranquila", v: 4 },
  { t: "Caminata ligera", v: 5.5 },
  { t: "Trote suave", v: 8 },
  { t: "Corriendo", v: 10 },
];
function CronoCaminata({ inicio, kmh, onCancel, onListo }) {
  let [transcurrido, setTranscurrido] = useState(
    Math.max(0, Math.floor((Date.now() - inicio) / 1e3)),
  );
  usePantallaEncendida();
  useEffect(() => {
    let reloj = setInterval(
      () => setTranscurrido(Math.max(0, Math.floor((Date.now() - inicio) / 1e3))),
      500,
    );
    return () => clearInterval(reloj);
  }, [inicio]);
  let km = Math.round((transcurrido / 3600) * kmh * 100) / 100,
    minutos = String(Math.floor(transcurrido / 60)).padStart(2, "0"),
    segundos = String(transcurrido % 60).padStart(2, "0");
  return (
    <div className="mb-3">
      <div
        className="text-center py-3 mb-2"
        style={{ border: "1px solid #7c5cff55", background: "rgba(124,92,255,0.06)" }}
      >
        <div className="text-xs" style={{ color: "#9aa4bd" }}>
          Salida en curso
        </div>
        <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 38, color: "#b9a5ff" }}>
          {minutos + ":" + segundos}
        </div>
        <div className="text-xs" style={{ color: "#9aa4bd" }}>
          {"≈ " +
            km.toFixed(2).replace(".", ",") +
            " km a " +
            String(kmh).replace(".", ",") +
            " km/h"}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onListo(km)}
          className="py-2 text-xs"
          style={{
            minHeight: 44,
            background: "rgba(124,92,255,0.15)",
            border: "1px solid #7c5cff",
            color: "#e8ecf7",
            fontWeight: 600,
          }}
        >
          Terminar
        </button>
        <button
          onClick={onCancel}
          className="py-2 text-xs"
          style={{
            minHeight: 44,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#9aa4bd",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export { sdcRitmos, CronoCaminata };
