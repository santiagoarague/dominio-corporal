// Barra de descanso.
import { useState, useEffect } from "react";
import { sdcEstMMSS } from "../logica/estiramiento.js";
import { BarraXp } from "./base.jsx";
import { sdcVib } from "../logica/series.js";
import { pitido } from "./prueba.jsx";
import { usePantallaEncendida } from "./pantalla.js";

function BarraDescanso({ seconds: e, onSkip: a, ini: t0 }) {
  let [n, tk] = useState(0),
    l = Math.max(0, e - Math.floor((Date.now() - (t0 || Date.now())) / 1e3));
  usePantallaEncendida();
  useEffect(() => {
    if (l <= 0) {
      (pitido(880, 200), sdcVib([40, 60, 40]), a());
      return;
    }
    let o = setTimeout(() => tk((x) => x + 1), 250);
    return () => clearTimeout(o);
  }, [n, t0]);
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: "rgba(10,14,26,0.97)",
        borderTop: "2px solid #ffb84f",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 420, padding: "10px 16px 12px" }}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs" style={{ color: "#9aa4bd", letterSpacing: 2 }}>
              DESCANSO
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 32,
                color: "#ffb84f",
                lineHeight: 1.1,
              }}
            >
              {sdcEstMMSS(l)}
            </div>
          </div>
          <button
            onClick={a}
            style={{
              minHeight: 44,
              padding: "0 18px",
              background: "rgba(255,184,79,0.12)",
              border: "1px solid #ffb84f",
              color: "#ffb84f",
              fontWeight: 700,
            }}
          >
            Saltar →
          </button>
        </div>
        <div className="mt-2">
          <BarraXp value={e - l} max={e} color="#ffb84f" />
        </div>
      </div>
    </div>
  );
}

export { BarraDescanso };
