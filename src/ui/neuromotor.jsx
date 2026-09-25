// Ejercicios neuromotores.
import { useState, useEffect } from "react";
import {
  bpmRitmo,
  patronesCruzados,
  senalesReaccion,
  sostenesDual,
  movimientosSecuencia,
  tareasMentales,
} from "../datos/salud.js";
import { pitido } from "./prueba.jsx";

var velocidadesReaccion = [
    { id: "lento", name: "Lento", min: 3500, max: 7e3, level: 1 },
    { id: "medio", name: "Medio", min: 2e3, max: 4500, level: 2 },
    { id: "rapido", name: "Rápido", min: 1200, max: 2800, level: 3 },
  ],
  senalesPorPrueba = 15;
function Reaccion({ onDone }) {
  let [fase, setFase] = useState("idle"),
    [velocidad, setVelocidad] = useState(velocidadesReaccion[1]),
    [senal, setSenal] = useState(null),
    [cuenta, setCuenta] = useState(0),
    [cuentaAtras, setCuentaAtras] = useState(3);
  return (
    useEffect(() => {
      if (fase !== "countdown") return;
      if (cuentaAtras <= 0) {
        (setCuenta(0), setSenal(null), setFase("gap"));
        return;
      }
      cuentaAtras <= 3 && pitido(520, 110);
      let espera = setTimeout(() => setCuentaAtras((previa) => previa - 1), 1e3);
      return () => clearTimeout(espera);
    }, [fase, cuentaAtras]),
    useEffect(() => {
      if (fase !== "gap") return;
      let hueco = velocidad.min + Math.random() * (velocidad.max - velocidad.min),
        espera = setTimeout(() => {
          (setSenal(senalesReaccion[Math.floor(Math.random() * senalesReaccion.length)]),
            pitido(900, 130),
            setFase("signal"));
        }, hueco);
      return () => clearTimeout(espera);
    }, [fase, cuenta]),
    useEffect(() => {
      if (fase !== "signal") return;
      let espera = setTimeout(() => {
        let siguiente = cuenta + 1;
        (setCuenta(siguiente),
          setSenal(null),
          siguiente >= senalesPorPrueba
            ? (pitido(1100, 250), setFase("done"), onDone(velocidad.level))
            : setFase("gap"));
      }, 2200);
      return () => clearTimeout(espera);
    }, [fase]),
    fase === "idle" ? (
      <>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          {senalesPorPrueba} señales con huecos impredecibles. No tenés que tocar nada: dejá el
          teléfono apoyado, atendé a la pantalla y al sonido, y ejecutá cada orden con el cuerpo.
        </div>
        <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
          Ritmo
        </div>
        <div className="grid grid-cols-3 gap-1 mb-3">
          {velocidadesReaccion.map((vel) => (
            <button
              key={vel.id}
              onClick={() => setVelocidad(vel)}
              className="py-2 text-xs"
              style={{
                background: velocidad.id === vel.id ? "#4f9dff" : "rgba(255,255,255,0.03)",
                border:
                  "1px solid " + (velocidad.id === vel.id ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                color: velocidad.id === vel.id ? "#0a0e1a" : "#8a93ad",
                fontWeight: 600,
              }}
            >
              {vel.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            (setCuentaAtras(10), setFase("countdown"));
          }}
          className="w-full py-3 text-sm"
          style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
        >
          Empezar
        </button>
      </>
    ) : fase === "countdown" ? (
      <div className="text-center py-6">
        <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 48, color: "#4f9dff" }}>
          {cuentaAtras || "¡YA!"}
        </div>
        <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
          Apoyá el teléfono y colocate
        </div>
      </div>
    ) : fase === "done" ? (
      <div className="text-center">
        <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 24, color: "#3ecf8e" }}>
          Drill completado
        </div>
        <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
          {senalesPorPrueba} señales a ritmo {velocidad.name}
        </div>
        <button
          onClick={() => setFase("idle")}
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
          background: fase === "signal" && senal ? senal.color : "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "30px 12px",
          transition: "background .1s",
        }}
      >
        {fase === "signal" && senal ? (
          <>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 34,
                color: "#0a0e1a",
                letterSpacing: 2,
              }}
            >
              {senal.label}
            </div>
            <div className="text-xs mt-1" style={{ color: "#0a0e1a" }}>
              {senal.action}
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
        <div className="text-xs mt-3" style={{ color: fase === "signal" ? "#0a0e1a" : "#5a6178" }}>
          {cuenta} / {senalesPorPrueba}
        </div>
      </div>
    )
  );
}
function Secuencia({ onDone }) {
  let [fase, setFase] = useState("idle"),
    [cadena, setCadena] = useState([]),
    [mostrado, setMostrado] = useState(0),
    [largo, setLargo] = useState(3),
    armarCadena = (cantidad) => {
      let lista = [];
      for (let i = 0; i < cantidad; i++)
        lista.push(movimientosSecuencia[Math.floor(Math.random() * movimientosSecuencia.length)]);
      return lista;
    };
  useEffect(() => {
    if (fase !== "show") return;
    if (mostrado >= cadena.length) {
      let espera = setTimeout(() => setFase("execute"), 700);
      return () => clearTimeout(espera);
    }
    pitido(600, 80);
    let espera = setTimeout(() => setMostrado((previo) => previo + 1), 950);
    return () => clearTimeout(espera);
  }, [fase, mostrado, cadena.length]);
  let empezar = (cantidad) => {
    (setCadena(armarCadena(cantidad)), setMostrado(0), setFase("show"));
  };
  return fase === "idle" ? (
    <>
      <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
        Vas a ver una cadena de movimientos, uno a uno. Memorizala, ejecutala completa con tu cuerpo
        y después comprobá si acertaste. Cada ronda añade uno más.
      </div>
      <button
        onClick={() => {
          (setLargo(3), empezar(3));
        }}
        className="w-full py-3 text-sm"
        style={{ background: "#b084f5", color: "#0a0e1a", fontWeight: 700 }}
      >
        Empezar en 3
      </button>
    </>
  ) : fase === "show" ? (
    <div className="text-center py-4">
      <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
        Memorizá · {mostrado} de {cadena.length}
      </div>
      <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 30, color: "#b084f5" }}>
        {mostrado > 0 ? cadena[mostrado - 1] : "..."}
      </div>
    </div>
  ) : fase === "execute" ? (
    <div className="text-center py-4">
      <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 22, color: "#e8ecf7" }}>
        Ejecuta la secuencia
      </div>
      <div className="text-xs mt-1 mb-4" style={{ color: "#9aa4bd" }}>
        {cadena.length} movimientos, de memoria y en orden. Sin mirar.
      </div>
      <button
        onClick={() => setFase("reveal")}
        className="w-full py-3 text-sm"
        style={{ background: "#b084f5", color: "#0a0e1a", fontWeight: 700 }}
      >
        Ya la hice
      </button>
    </div>
  ) : fase === "reveal" ? (
    <>
      <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
        Esta era la secuencia:
      </div>
      {cadena.map((mov, i) => (
        <div
          key={i}
          className="text-sm py-1"
          style={{ color: "#e8ecf7", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {i + 1}. {mov}
        </div>
      ))}
      <div className="text-xs mt-3 mb-2" style={{ color: "#9aa4bd" }}>
        ¿La hiciste entera y en orden?
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            (onDone(largo - 1), setFase("idle"));
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
          onClick={() => setFase("win")}
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
        Correcto · {largo} movimientos
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => {
            (onDone(largo), setFase("idle"));
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
            let siguiente = largo + 1;
            (setLargo(siguiente), empezar(siguiente));
          }}
          className="flex-1 py-2 text-xs"
          style={{ background: "#b084f5", color: "#0a0e1a", fontWeight: 700 }}
        >
          Subir a {largo + 1}
        </button>
      </div>
    </div>
  );
}
function TareaDual({ onDone }) {
  let [fase, setFase] = useState("idle"),
    [segundos, setSegundos] = useState(0),
    [sosten, setSosten] = useState(sostenesDual[0]),
    [tarea, setTarea] = useState(tareasMentales[0]);
  return (
    useEffect(() => {
      if (fase !== "run") return;
      let espera = setTimeout(() => setSegundos((previo) => previo + 1), 1e3);
      return () => clearTimeout(espera);
    }, [fase, segundos]),
    fase === "idle" ? (
      <>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Sostén una posición isométrica mientras resuelves una tarea mental en voz alta. Para
          cuando se rompa la postura o pierdas el hilo.
        </div>
        <button
          onClick={() => {
            (setSosten(sostenesDual[Math.floor(Math.random() * sostenesDual.length)]),
              setTarea(tareasMentales[Math.floor(Math.random() * tareasMentales.length)]),
              setSegundos(0),
              setFase("run"));
          }}
          className="w-full py-3 text-sm"
          style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
        >
          Empezar
        </button>
      </>
    ) : fase === "run" ? (
      <div className="text-center">
        <div className="text-xs" style={{ color: "#9aa4bd" }}>
          Posición
        </div>
        <div style={{ fontFamily: "Chakra Petch, sans-serif", fontSize: 20, color: "#e8ecf7" }}>
          {sosten}
        </div>
        <div className="text-xs mt-2" style={{ color: "#9aa4bd" }}>
          Tarea mental
        </div>
        <div className="text-sm" style={{ color: "#3ecf8e" }}>
          {tarea}
        </div>
        <div
          style={{
            fontFamily: "Chakra Petch, sans-serif",
            fontSize: 40,
            color: "#3ecf8e",
            marginTop: 8,
          }}
        >
          {Math.floor(segundos / 60)}:{String(segundos % 60).padStart(2, "0")}
        </div>
        <button
          onClick={() => {
            (setFase("idle"), onDone(segundos));
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
function Ritmo({ onDone }) {
  let [fase, setFase] = useState("idle"),
    [nivel, setNivel] = useState(0),
    [segundos, setSegundos] = useState(30),
    [patron, setPatron] = useState(patronesCruzados[0]),
    [golpe, setGolpe] = useState(!1),
    bpm = bpmRitmo[nivel];
  return (
    useEffect(() => {
      if (fase !== "run") return;
      if (segundos <= 0) {
        (setFase("done"), onDone(bpm));
        return;
      }
      let espera = setTimeout(() => setSegundos((previo) => previo - 1), 1e3);
      return () => clearTimeout(espera);
    }, [fase, segundos]),
    useEffect(() => {
      if (fase !== "run") return;
      let intervalo = 6e4 / bpm,
        reloj = setInterval(() => {
          (setGolpe((previo) => !previo), pitido(700, 60));
        }, intervalo);
      return () => clearInterval(reloj);
    }, [fase, bpm]),
    fase === "idle" ? (
      <>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Patrón cruzado al ritmo del metrónomo, 30 segundos por nivel. Si aguantás limpio, subí el
          tempo.
        </div>
        <button
          onClick={() => {
            (setPatron(patronesCruzados[Math.floor(Math.random() * patronesCruzados.length)]),
              setSegundos(30),
              setFase("run"));
          }}
          className="w-full py-3 text-sm"
          style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
        >
          Empezar a {bpm} bpm
        </button>
      </>
    ) : fase === "run" ? (
      <div className="text-center">
        <div className="text-xs" style={{ color: "#9aa4bd" }}>
          {bpm} bpm
        </div>
        <div className="text-sm mb-2" style={{ color: "#e8ecf7" }}>
          {patron}
        </div>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            margin: "0 auto",
            background: golpe ? "#ffb84f" : "rgba(255,184,79,0.15)",
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
          {segundos}s
        </div>
        <button
          onClick={() => {
            (setFase("idle"), onDone(nivel > 0 ? bpmRitmo[nivel - 1] : 0));
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
          Nivel superado a {bpm} bpm
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              (setNivel(0), setFase("idle"));
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
          {nivel < bpmRitmo.length - 1 && (
            <button
              onClick={() => {
                (setNivel(nivel + 1), setSegundos(30), setFase("run"));
              }}
              className="flex-1 py-2 text-xs"
              style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
            >
              Subir a {bpmRitmo[nivel + 1]} bpm
            </button>
          )}
        </div>
      </div>
    )
  );
}

export { velocidadesReaccion, senalesPorPrueba, Reaccion, Secuencia, TareaDual, Ritmo };
