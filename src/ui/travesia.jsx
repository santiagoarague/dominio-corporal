// Cronometro de travesia.
import { useState, useEffect } from "react";
import { IconoCheck } from "./iconos.jsx";
import { sdcPortales } from "../logica/explorar.js";
import { BarraXp } from "./base.jsx";
import { pitido } from "./prueba.jsx";
import { usePantallaEncendida } from "./pantalla.js";

function sdcTravMin(texto) {
  var coincide = /(\d+)\s*minutos/.exec(String(texto || ""));
  return coincide ? parseInt(coincide[1], 10) : 20;
}
function sdcTravRitmo(nombre) {
  for (var i = 0; i < sdcPortales.length; i++)
    if (sdcPortales[i].n === nombre) return sdcPortales[i];
  return {};
}
function CronoTravesia({ inicio, mins, on, off, onCancel, onListo }) {
  let [transcurridoCrudo, setTranscurridoCrudo] = useState(Math.floor((Date.now() - inicio) / 1e3)),
    transcurrido = Math.max(0, transcurridoCrudo);
  usePantallaEncendida();
  useEffect(() => {
    let reloj = setInterval(
      () => setTranscurridoCrudo(Math.floor((Date.now() - inicio) / 1e3)),
      500,
    );
    return () => clearInterval(reloj);
  }, [inicio]);
  let pre = Math.max(0, Math.ceil((inicio - Date.now()) / 1e3)),
    tot = mins * 60,
    listo = transcurrido >= tot,
    rest = Math.max(0, tot - transcurrido),
    ciclo = on && off ? on + off : 0,
    fuerte = ciclo ? transcurrido % ciclo < on : !1,
    fase = ciclo
      ? Math.floor(transcurrido / ciclo) * 2 + (fuerte ? 0 : 1)
      : Math.floor(transcurrido / 300),
    minutos = String(Math.floor(rest / 60)).padStart(2, "0"),
    segundos = String(rest % 60).padStart(2, "0");
  return (
    useEffect(() => {
      transcurrido > 0 && !listo && pitido(ciclo ? (fuerte ? 880 : 440) : 660, ciclo ? 170 : 120);
    }, [fase]),
    useEffect(() => {
      listo && pitido(990, 340);
    }, [listo]),
    useEffect(() => {
      pre === 0 && transcurrido < 2 && pitido(880, 180);
    }, [pre > 0]),
    (
      <div>
        <div
          className="text-center py-3 mb-2"
          style={{
            border: "1px solid " + (listo ? "#3ecf8e55" : "#ff5c7a55"),
            background: listo ? "rgba(62,207,142,0.06)" : "rgba(255,92,122,0.06)",
          }}
        >
          <div className="text-xs" style={{ color: "#9aa4bd" }}>
            {pre > 0 ? "PONETE EN POSICIÓN" : listo ? "Travesía cumplida" : "Te falta"}
          </div>
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 40,
              color: pre > 0 ? "#ffb84f" : listo ? "#3ecf8e" : "#ff5c7a",
            }}
          >
            {pre > 0 ? pre : listo ? "¡Listo!" : minutos + ":" + segundos}
          </div>
          {ciclo && !listo && !pre ? (
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                color: fuerte ? "#ffb84f" : "#9aa4bd",
              }}
            >
              {fuerte ? "FUERTE" : "SUAVE"}
            </div>
          ) : null}
        </div>
        <BarraXp value={transcurrido} max={tot} color={listo ? "#3ecf8e" : "#ff5c7a"} />
        {listo ? (
          <button
            onClick={onListo}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm mt-3"
            style={{ minHeight: 48, background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
          >
            <IconoCheck size={16} /> Completar travesía
          </button>
        ) : (
          <button
            onClick={onCancel}
            className="w-full text-xs underline mt-3"
            style={{ minHeight: 44, color: "#9aa4bd" }}
          >
            Cancelar
          </button>
        )}
      </div>
    )
  );
}

export { sdcTravMin, sdcTravRitmo, CronoTravesia };
