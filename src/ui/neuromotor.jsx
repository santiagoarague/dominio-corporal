// Ejercicios neuromotores.
import { useState, useEffect } from "react";
import { Fs, bd, fy, md, my, pd } from "../datos/salud.js";
import { pitido } from "./prueba.jsx";

var kd = [
    { id: "lento", name: "Lento", min: 3500, max: 7e3, level: 1 },
    { id: "medio", name: "Medio", min: 2e3, max: 4500, level: 2 },
    { id: "rapido", name: "Rápido", min: 1200, max: 2800, level: 3 },
  ],
  eu = 15;
function Reaccion({ onDone: e }) {
  let [a, l] = useState("idle"),
    [n, o] = useState(kd[1]),
    [s, u] = useState(null),
    [c, r] = useState(0),
    [p, v] = useState(3);
  return (
    useEffect(() => {
      if (a !== "countdown") return;
      if (p <= 0) {
        (r(0), u(null), l("gap"));
        return;
      }
      p <= 3 && pitido(520, 110);
      let x = setTimeout(() => v((y) => y - 1), 1e3);
      return () => clearTimeout(x);
    }, [a, p]),
    useEffect(() => {
      if (a !== "gap") return;
      let x = n.min + Math.random() * (n.max - n.min),
        y = setTimeout(() => {
          (u(fy[Math.floor(Math.random() * fy.length)]), pitido(900, 130), l("signal"));
        }, x);
      return () => clearTimeout(y);
    }, [a, c]),
    useEffect(() => {
      if (a !== "signal") return;
      let x = setTimeout(() => {
        let y = c + 1;
        (r(y), u(null), y >= eu ? (pitido(1100, 250), l("done"), e(n.level)) : l("gap"));
      }, 2200);
      return () => clearTimeout(x);
    }, [a]),
    a === "idle" ? (
      <>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          {eu} señales con huecos impredecibles. No tenés que tocar nada: dejá el teléfono apoyado,
          atendé a la pantalla y al sonido, y ejecutá cada orden con el cuerpo.
        </div>
        <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
          Ritmo
        </div>
        <div className="grid grid-cols-3 gap-1 mb-3">
          {kd.map((x) => (
            <button
              key={x.id}
              onClick={() => o(x)}
              className="py-2 text-xs"
              style={{
                background: n.id === x.id ? "#4f9dff" : "rgba(255,255,255,0.03)",
                border: "1px solid " + (n.id === x.id ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                color: n.id === x.id ? "#0a0e1a" : "#8a93ad",
                fontWeight: 600,
              }}
            >
              {x.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            (v(10), l("countdown"));
          }}
          className="w-full py-3 text-sm"
          style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
        >
          Empezar
        </button>
      </>
    ) : a === "countdown" ? (
      <div className="text-center py-6">
        <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 48, color: "#4f9dff" }}>
          {p || "¡YA!"}
        </div>
        <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
          Apoyá el teléfono y colocate
        </div>
      </div>
    ) : a === "done" ? (
      <div className="text-center">
        <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 24, color: "#3ecf8e" }}>
          Drill completado
        </div>
        <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
          {eu} señales a ritmo {n.name}
        </div>
        <button
          onClick={() => l("idle")}
          className="w-full py-2 text-xs mt-3"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.28)",
            color: "#e8ecf7",
            fontWeight: 600,
          }}
        >
          Otra vez
        </button>
      </div>
    ) : (
      <div
        className="text-center"
        style={{
          background: a === "signal" && s ? s.color : "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "30px 12px",
          transition: "background .1s",
        }}
      >
        {a === "signal" && s ? (
          <>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 34,
                color: "#0a0e1a",
                letterSpacing: 2,
              }}
            >
              {s.label}
            </div>
            <div className="text-xs mt-1" style={{ color: "#0a0e1a" }}>
              {s.action}
            </div>
          </>
        ) : (
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 22,
              color: "#7a83a0",
            }}
          >
            · · ·
          </div>
        )}
        <div className="text-xs mt-3" style={{ color: a === "signal" ? "#0a0e1a" : "#5a6178" }}>
          {c} / {eu}
        </div>
      </div>
    )
  );
}
function Secuencia({ onDone: e }) {
  let [a, l] = useState("idle"),
    [n, o] = useState([]),
    [s, u] = useState(0),
    [c, r] = useState(3),
    p = (x) => {
      let y = [];
      for (let S = 0; S < x; S++) y.push(my[Math.floor(Math.random() * my.length)]);
      return y;
    };
  useEffect(() => {
    if (a !== "show") return;
    if (s >= n.length) {
      let y = setTimeout(() => l("execute"), 700);
      return () => clearTimeout(y);
    }
    pitido(600, 80);
    let x = setTimeout(() => u((y) => y + 1), 950);
    return () => clearTimeout(x);
  }, [a, s, n.length]);
  let v = (x) => {
    (o(p(x)), u(0), l("show"));
  };
  return a === "idle" ? (
    <>
      <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
        Vas a ver una cadena de movimientos, uno a uno. Memorizala, ejecutala completa con tu cuerpo
        y después comprobá si acertaste. Cada ronda añade uno más.
      </div>
      <button
        onClick={() => {
          (r(3), v(3));
        }}
        className="w-full py-3 text-sm"
        style={{ background: "#b084f5", color: "#0a0e1a", fontWeight: 700 }}
      >
        Empezar en 3
      </button>
    </>
  ) : a === "show" ? (
    <div className="text-center py-4">
      <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
        Memorizá · {s} de {n.length}
      </div>
      <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 30, color: "#b084f5" }}>
        {s > 0 ? n[s - 1] : "..."}
      </div>
    </div>
  ) : a === "execute" ? (
    <div className="text-center py-4">
      <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 22, color: "#e8ecf7" }}>
        Ejecuta la secuencia
      </div>
      <div className="text-xs mt-1 mb-4" style={{ color: "#9aa4bd" }}>
        {n.length} movimientos, de memoria y en orden. Sin mirar.
      </div>
      <button
        onClick={() => l("reveal")}
        className="w-full py-3 text-sm"
        style={{ background: "#b084f5", color: "#0a0e1a", fontWeight: 700 }}
      >
        Ya la hice
      </button>
    </div>
  ) : a === "reveal" ? (
    <>
      <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
        Esta era la secuencia:
      </div>
      {n.map((x, y) => (
        <div
          key={y}
          className="text-sm py-1"
          style={{ color: "#e8ecf7", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {y + 1}. {x}
        </div>
      ))}
      <div className="text-xs mt-3 mb-2" style={{ color: "#9aa4bd" }}>
        ¿La hiciste entera y en orden?
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            (e(c - 1), l("idle"));
          }}
          className="flex-1 py-3 text-sm"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.28)",
            color: "#e8ecf7",
            fontWeight: 600,
          }}
        >
          No del todo
        </button>
        <button
          onClick={() => l("win")}
          className="flex-1 py-3 text-sm"
          style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
        >
          Sí, correcta
        </button>
      </div>
    </>
  ) : (
    <div className="text-center">
      <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 22, color: "#3ecf8e" }}>
        Correcto · {c} movimientos
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            (e(c), l("idle"));
          }}
          className="flex-1 py-2 text-xs"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.28)",
            color: "#e8ecf7",
            fontWeight: 600,
          }}
        >
          Guardar y salir
        </button>
        <button
          onClick={() => {
            let x = c + 1;
            (r(x), v(x));
          }}
          className="flex-1 py-2 text-xs"
          style={{ background: "#b084f5", color: "#0a0e1a", fontWeight: 700 }}
        >
          Subir a {c + 1}
        </button>
      </div>
    </div>
  );
}
function TareaDual({ onDone: e }) {
  let [a, l] = useState("idle"),
    [n, o] = useState(0),
    [s, u] = useState(md[0]),
    [c, r] = useState(pd[0]);
  return (
    useEffect(() => {
      if (a !== "run") return;
      let p = setTimeout(() => o((v) => v + 1), 1e3);
      return () => clearTimeout(p);
    }, [a, n]),
    a === "idle" ? (
      <>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Sostén una posición isométrica mientras resuelves una tarea mental en voz alta. Para
          cuando se rompa la postura o pierdas el hilo.
        </div>
        <button
          onClick={() => {
            (u(md[Math.floor(Math.random() * md.length)]),
              r(pd[Math.floor(Math.random() * pd.length)]),
              o(0),
              l("run"));
          }}
          className="w-full py-3 text-sm"
          style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
        >
          Empezar
        </button>
      </>
    ) : a === "run" ? (
      <div className="text-center">
        <div className="text-xs" style={{ color: "#9aa4bd" }}>
          Posición
        </div>
        <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 20, color: "#e8ecf7" }}>
          {s}
        </div>
        <div className="text-xs mt-2" style={{ color: "#9aa4bd" }}>
          Tarea mental
        </div>
        <div className="text-sm" style={{ color: "#3ecf8e" }}>
          {c}
        </div>
        <div
          style={{
            fontFamily: "Chakra Petch, sans-serif",
            fontSize: 40,
            color: "#3ecf8e",
            marginTop: 8,
          }}
        >
          {Math.floor(n / 60)}:{String(n % 60).padStart(2, "0")}
        </div>
        <button
          onClick={() => {
            (l("idle"), e(n));
          }}
          className="w-full py-3 text-sm mt-2"
          style={{ background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 }}
        >
          He roto la postura
        </button>
      </div>
    ) : null
  );
}
function Ritmo({ onDone: e }) {
  let [a, l] = useState("idle"),
    [n, o] = useState(0),
    [s, u] = useState(30),
    [c, r] = useState(bd[0]),
    [p, v] = useState(!1),
    x = Fs[n];
  return (
    useEffect(() => {
      if (a !== "run") return;
      if (s <= 0) {
        (l("done"), e(x));
        return;
      }
      let y = setTimeout(() => u((S) => S - 1), 1e3);
      return () => clearTimeout(y);
    }, [a, s]),
    useEffect(() => {
      if (a !== "run") return;
      let y = 6e4 / x,
        S = setInterval(() => {
          (v((E) => !E), pitido(700, 60));
        }, y);
      return () => clearInterval(S);
    }, [a, x]),
    a === "idle" ? (
      <>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Patrón cruzado al ritmo del metrónomo, 30 segundos por nivel. Si aguantás limpio, subí el
          tempo.
        </div>
        <button
          onClick={() => {
            (r(bd[Math.floor(Math.random() * bd.length)]), u(30), l("run"));
          }}
          className="w-full py-3 text-sm"
          style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
        >
          Empezar a {x} bpm
        </button>
      </>
    ) : a === "run" ? (
      <div className="text-center">
        <div className="text-xs" style={{ color: "#9aa4bd" }}>
          {x} bpm
        </div>
        <div className="text-sm mb-2" style={{ color: "#e8ecf7" }}>
          {c}
        </div>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            margin: "0 auto",
            background: p ? "#ffb84f" : "rgba(255,184,79,0.15)",
            border: "2px solid #ffb84f",
            transition: "background .08s",
          }}
        />
        <div
          style={{
            fontFamily: "Chakra Petch, sans-serif",
            fontSize: 30,
            color: "#ffb84f",
            marginTop: 8,
          }}
        >
          {s}s
        </div>
        <button
          onClick={() => {
            (l("idle"), e(n > 0 ? Fs[n - 1] : 0));
          }}
          className="w-full py-2 text-xs mt-2"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.28)",
            color: "#e8ecf7",
            fontWeight: 600,
          }}
        >
          No puedo seguir el ritmo
        </button>
      </div>
    ) : (
      <div className="text-center">
        <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 22, color: "#3ecf8e" }}>
          Nivel superado a {x} bpm
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              (o(0), l("idle"));
            }}
            className="flex-1 py-2 text-xs"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#e8ecf7",
              fontWeight: 600,
            }}
          >
            Salir
          </button>
          {n < Fs.length - 1 && (
            <button
              onClick={() => {
                (o(n + 1), u(30), l("run"));
              }}
              className="flex-1 py-2 text-xs"
              style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
            >
              Subir a {Fs[n + 1]} bpm
            </button>
          )}
        </div>
      </div>
    )
  );
}

export { kd, eu, Reaccion, Secuencia, TareaDual, Ritmo };
