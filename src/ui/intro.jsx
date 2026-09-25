// Texto maquina de escribir y pantallas de intro.
import { useState, useEffect } from "react";

function MaquinaEscribir({ text, speed = 45, onDone, style, showCursor }) {
  let [escrito, setEscrito] = useState("");
  return (
    useEffect(() => {
      setEscrito("");
      let letras = 0,
        reloj = setInterval(() => {
          ((letras += 1),
            setEscrito(text.slice(0, letras)),
            letras >= text.length && (clearInterval(reloj), onDone && onDone()));
        }, speed);
      return () => clearInterval(reloj);
    }, [text]),
    (
      <div style={style}>
        {escrito}
        {showCursor && <span style={{ animation: "sdcBlink 1s step-end infinite" }}>▊</span>}
      </div>
    )
  );
}
function Bienvenida({ onDone }) {
  let [paso, setPaso] = useState(0);
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0a0e1a" }}
    >
      <div className="w-full" style={{ maxWidth: 380, fontFamily: "'Chakra Petch', monospace" }}>
        <MaquinaEscribir
          text="Nadie te contó de qué es capaz tu cuerpo."
          speed={38}
          showCursor={paso === 0}
          onDone={() => setPaso(1)}
          style={{ color: "#e8ecf7", fontSize: 19, marginBottom: 14, letterSpacing: 0.5 }}
        />
        {paso >= 1 && (
          <MaquinaEscribir
            text="Ni vos lo sabés todavía."
            speed={38}
            showCursor={paso === 1}
            onDone={() => setPaso(2)}
            style={{ color: "#9aa4bd", fontSize: 16, marginBottom: 14 }}
          />
        )}
        {paso >= 2 && (
          <MaquinaEscribir
            text="Vamos a averiguarlo."
            speed={45}
            showCursor={paso === 2}
            onDone={() => setPaso(3)}
            style={{ color: "#ffb84f", fontSize: 17, lineHeight: 1.5 }}
          />
        )}
        {paso >= 3 && (
          <button
            onClick={onDone}
            className="w-full py-3 text-sm"
            style={{
              marginTop: 28,
              background: "#4f9dff",
              color: "#0a0e1a",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}

export { MaquinaEscribir, Bienvenida };
