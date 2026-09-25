// Metronomo.
import { useState, useEffect } from "react";
import { sdcSonidoFase } from "./prueba.jsx";

function sdcTempoMod(modificador) {
  var baja = 2,
    pausa = 1,
    sube = 2,
    texto = modificador && modificador.d ? String(modificador.d) : "",
    coincide = texto.match(/baja(?:\s+el\s+peso)?\s+en\s+(\d+)\s*segundos?/i);
  coincide && (baja = Math.max(1, Math.min(8, parseInt(coincide[1], 10))));
  /mitad de velocidad/i.test(texto) && ((baja *= 2), (sube *= 2));
  return { b: baja, p: pausa, s: sube };
}
function Metronomo({ active, tempo }) {
  let ritmo = tempo && tempo.b ? tempo : { b: 2, p: 1, s: 2 },
    [fase, setFase] = useState("down");
  if (
    (useEffect(() => {
      if (!active) return;
      let ms = (fase === "down" ? ritmo.b : fase === "hold" ? ritmo.p : ritmo.s) * 1e3;
      sdcSonidoFase(fase);
      let espera = setTimeout(
        () => setFase((previa) => (previa === "down" ? "hold" : previa === "hold" ? "up" : "down")),
        ms,
      );
      return () => clearTimeout(espera);
    }, [active, fase, ritmo.b, ritmo.p, ritmo.s]),
    !active)
  )
    return null;
  let etiqueta =
      fase === "down"
        ? "BAJA (" + ritmo.b + "s)"
        : fase === "hold"
          ? "PAUSA (" + ritmo.p + "s)"
          : "SUBE (" + ritmo.s + "s)",
    color = fase === "down" ? "#4f9dff" : fase === "hold" ? "#ffb84f" : "#3ecf8e";
  return (
    <div
      className="text-center py-2 mb-2"
      style={{ border: "1px solid " + color + "55", background: "rgba(255,255,255,0.03)" }}
    >
      <div
        style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 24, color, letterSpacing: 1 }}
      >
        {etiqueta}
      </div>
    </div>
  );
}

export { sdcTempoMod, Metronomo };
