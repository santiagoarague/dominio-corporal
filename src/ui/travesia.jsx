// Cronometro de travesia.
import { useState, useEffect } from "react";
import { IconoCheck } from "./iconos.jsx";
import { sdcPortales } from "../logica/explorar.js";
import { BarraXp } from "./base.jsx";
import { pitido } from "./prueba.jsx";
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
  let [u1, c] = useState(Math.floor((Date.now() - e) / 1e3)),
    u = Math.max(0, u1);
  sdcWakeUse();
  useEffect(() => {
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
    useEffect(() => {
      u > 0 && !listo && pitido(ci ? (fu ? 880 : 440) : 660, ci ? 170 : 120);
    }, [fase]),
    useEffect(() => {
      listo && pitido(990, 340);
    }, [listo]),
    useEffect(() => {
      pre === 0 && u < 2 && pitido(880, 180);
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
            {pre > 0 ? pre : listo ? "¡Listo!" : mm + ":" + ss}
          </div>
          {ci && !listo && !pre ? (
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                color: fu ? "#ffb84f" : "#9aa4bd",
              }}
            >
              {fu ? "FUERTE" : "SUAVE"}
            </div>
          ) : null}
        </div>
        <BarraXp value={u} max={tot} color={listo ? "#3ecf8e" : "#ff5c7a"} />
        {listo ? (
          <button
            onClick={s}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm mt-3"
            style={{ minHeight: 48, background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
          >
            <IconoCheck size={16} /> Completar travesía
          </button>
        ) : (
          <button
            onClick={o}
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
