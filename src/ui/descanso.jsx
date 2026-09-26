// Barra de descanso.
import { useState, useEffect } from "react";
import { sdcEstMMSS } from "../logica/estiramiento.js";
import { BarraXp } from "./base.jsx";
import { sdcVib } from "../logica/series.js";
import { pitido } from "./prueba.jsx";
import { usePantallaEncendida } from "./pantalla.js";

// onRelajar: abre Relajate (el compañero) sin cortar el descanso.
function BarraDescanso({ seconds, onSkip, ini, onRelajar }) {
  let [tic, setTic] = useState(0),
    quedan = Math.max(0, seconds - Math.floor((Date.now() - (ini || Date.now())) / 1e3));
  usePantallaEncendida();
  useEffect(() => {
    if (quedan <= 0) {
      (pitido(880, 200), sdcVib([40, 60, 40]), onSkip());
      return;
    }
    let espera = setTimeout(() => setTic((previo) => previo + 1), 250);
    return () => clearTimeout(espera);
  }, [tic, ini]);
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
            <div className="text-xs" style={{ color: "#9aa4bd", letterSpacing: 1 }}>
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
              {sdcEstMMSS(quedan)}
            </div>
          </div>
          {onRelajar && (
            <button
              onClick={onRelajar}
              data-pista="relajar"
              style={{
                marginLeft: "auto",
                minHeight: 44,
                padding: "0 10px",
                fontSize: 15,
                whiteSpace: "nowrap",
                background: "rgba(95,211,181,0.12)",
                border: "1px solid #5fd3b5",
                color: "#5fd3b5",
                fontWeight: 700,
              }}
            >
              Relajate
            </button>
          )}
          <button
            onClick={onSkip}
            style={{
              minHeight: 44,
              padding: onRelajar ? "0 10px" : "0 18px",
              fontSize: onRelajar ? 15 : void 0,
              whiteSpace: "nowrap",
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
          <BarraXp value={seconds - quedan} max={seconds} color="#ffb84f" />
        </div>
      </div>
    </div>
  );
}

export { BarraDescanso };
