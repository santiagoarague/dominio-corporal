// El compañero: el que se asoma con algo para contar, la elección entre perro, gato y
// cara (al empezar y en Perfil) y lo que pasa al tocar "Mostrame".
import { useState, useEffect, useRef } from "react";
import { DibujoMascota } from "./tarjetas.jsx";
import { pistas } from "../datos/pistas.js";
import {
  companeroListo,
  elegirPista,
  anotarCompanero,
  anotarPistaVista,
} from "../logica/pistas.js";
import { fechaHoy } from "../logica/rutina.js";
import { sonidoCompanero, sdcVib } from "../logica/series.js";

var tiposCompanero = [
    ["dog", "🐶 Perro"],
    ["cat", "🐱 Gato"],
    ["face", "🙂 Cara"],
  ],
  // Cuánto espera para asomarse: en el descanso, que se levante el dedo de la serie
  // recién marcada; en el resumen, que pasen los avisos.
  esperaAsomarse = { descanso: 3000, resumen: 4000 },
  seVaSolo = 20000,
  // Lo que ocupa la barra de descanso, para quedar justo arriba.
  sobreDescanso = 118;

// El botón del que habla una pista, si se ve en pantalla.
function objetivoPista(id) {
  for (let el of document.querySelectorAll('[data-pista="' + id + '"]'))
    if (el.getClientRects().length) return el;
  return null;
}
function mostrarPista(id) {
  let el = objetivoPista(id);
  if (!el) return;
  let quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  (el.scrollIntoView({ block: "center", behavior: quieto ? "auto" : "smooth" }),
    el.classList.add("sdc-luz"),
    setTimeout(() => el.classList.remove("sdc-luz"), 4500));
}

// Se asoma una vez por sesión (logica/pistas.js), quieto en una esquina y arriba de
// la barra de descanso. Tocarlo abre lo que tiene para contar; si nadie lo toca se va
// solo a los 20 s, o cuando termina el descanso. No tapa nada ni obliga a nada.
// momento: "descanso", "resumen" o null. callado: no suena (el metrónomo está sonando).
function Companero({ player, setPlayer, momento, clave, callado, color }) {
  let [asomado, setAsomado] = useState(null),
    [abierto, setAbierto] = useState(!1),
    ultima = useRef(player),
    listo = !!momento && companeroListo(player, clave, fechaHoy()),
    pet = (player.profile && player.profile.pet) || {},
    nombre = pet.name || "Tu compañero";
  ultima.current = player;
  useEffect(() => {
    if (!listo || asomado) return;
    let espera = setTimeout(() => {
      let enPantalla = pistas.filter((pista) => objetivoPista(pista.id)).map((pista) => pista.id);
      (setAsomado({ ...elegirPista(ultima.current, momento, enPantalla, fechaHoy()), momento }),
        setAbierto(!1),
        callado || sonidoCompanero(),
        setPlayer((previa) => anotarCompanero(previa, clave)));
    }, esperaAsomarse[momento]);
    return () => clearTimeout(espera);
  }, [listo, momento, clave]);
  useEffect(() => {
    if (!asomado || abierto) return;
    if (asomado.momento !== momento) {
      setAsomado(null);
      return;
    }
    let espera = setTimeout(() => setAsomado(null), seVaSolo);
    return () => clearTimeout(espera);
  }, [asomado, abierto, momento]);
  if (!asomado) return null;
  let abajo =
    "calc(" + (momento === "descanso" ? sobreDescanso : 16) + "px + env(safe-area-inset-bottom))";
  if (!abierto)
    return (
      <button
        onClick={() => {
          (setAbierto(!0),
            sdcVib(8),
            asomado.id && setPlayer((previa) => anotarPistaVista(previa, asomado.id, fechaHoy())));
        }}
        className="sdc-asoma flex items-center gap-2"
        aria-label={nombre + " quiere contarte algo"}
        style={{
          position: "fixed",
          left: 12,
          bottom: abajo,
          zIndex: 60,
          background: "transparent",
          padding: 0,
        }}
      >
        <span
          className="sdc-menea"
          style={{
            display: "block",
            width: 64,
            height: 64,
            padding: 5,
            borderRadius: "50%",
            background: "#161b2e",
            border: "2px solid " + color,
            boxShadow: "0 4px 18px rgba(0,0,0,.55)",
          }}
        >
          <DibujoMascota type={pet.type || "dog"} size={50} color={color} gesto="curioso" />
        </span>
        <span
          style={{
            background: "#e8ecf7",
            color: "#0a0e1a",
            fontWeight: 700,
            fontSize: 16,
            padding: "6px 12px",
            boxShadow: "0 4px 18px rgba(0,0,0,.55)",
          }}
        >
          ¡Psst!
        </span>
      </button>
    );
  return (
    <div
      role="dialog"
      aria-label={nombre}
      className="sdc-rise"
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: abajo,
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 14,
          background: "#12182b",
          border: "1px solid " + color,
          boxShadow: "0 8px 30px rgba(0,0,0,.6)",
          pointerEvents: "auto",
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <DibujoMascota type={pet.type || "dog"} size={44} color={color} />
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#e8ecf7",
            }}
          >
            {nombre}
          </div>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.5, color: "#e8ecf7" }}>{asomado.texto}</div>
        <div className="flex gap-2 mt-3">
          {asomado.id && !asomado.sinBoton && (
            <button
              onClick={() => {
                let id = asomado.id;
                (setAsomado(null), mostrarPista(id));
              }}
              className="flex-1 text-sm"
              style={{ minHeight: 44, background: color, color: "#0a0e1a", fontWeight: 700 }}
            >
              Mostrame
            </button>
          )}
          <button
            onClick={() => setAsomado(null)}
            className="flex-1 text-sm"
            style={{
              minHeight: 44,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#e8ecf7",
              fontWeight: 600,
            }}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

function OpcionesCompanero({ tipo, onTipo }) {
  return (
    <div className="flex gap-2">
      {tiposCompanero.map(([id, texto]) => (
        <button
          key={id}
          onClick={() => onTipo(id)}
          className="flex-1 py-3 text-sm"
          style={{
            background: tipo === id ? "rgba(255,184,79,0.15)" : "rgba(255,255,255,0.03)",
            border: tipo === id ? "1px solid #ffb84f" : "1px solid rgba(255,255,255,0.1)",
            color: "#e8ecf7",
            whiteSpace: "nowrap",
          }}
        >
          {texto}
        </button>
      ))}
    </div>
  );
}

// En Perfil: quién te acompaña, y cambiarlo.
function EditarCompanero({ pet, color, onGuardar }) {
  let actual = pet || {},
    [editando, setEditando] = useState(!1),
    [tipo, setTipo] = useState(actual.type || "dog"),
    [nombre, setNombre] = useState(actual.name || "");
  if (!editando)
    return (
      <div
        className="flex items-center gap-3 mt-3 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <DibujoMascota type={actual.type || "dog"} size={40} color={color} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="text-xs" style={{ color: "#9aa4bd" }}>
            Tu compañero
          </div>
          <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
            {actual.name || "Sin nombre"}
          </div>
        </div>
        <button
          onClick={() => {
            (setTipo(actual.type || "dog"), setNombre(actual.name || ""), setEditando(!0));
          }}
          className="text-xs underline"
          style={{ color: "#ffb84f", padding: "0 8px" }}
        >
          Cambiar
        </button>
      </div>
    );
  return (
    <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex justify-center mb-3">
        <DibujoMascota type={tipo} size={64} color={color} />
      </div>
      <OpcionesCompanero tipo={tipo} onTipo={setTipo} />
      <label className="block text-xs mt-3 mb-1" style={{ color: "#9aa4bd" }}>
        ¿Cómo se llama? (si querés)
      </label>
      <input
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
        placeholder="Nombre de tu compañero"
        className="w-full px-3 py-2 text-sm"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#e8ecf7",
        }}
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setEditando(!1)}
          className="flex-1 py-3 text-sm"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.28)",
            color: "#e8ecf7",
            fontWeight: 600,
          }}
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            (onGuardar(tipo, nombre), setEditando(!1));
          }}
          className="flex-1 py-3 text-sm"
          style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

export { Companero, OpcionesCompanero, EditarCompanero, objetivoPista };
