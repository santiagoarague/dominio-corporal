// Primera vez: presentacion y prueba inicial.
import { useState } from "react";
import { IconoFlecha } from "./iconos.jsx";
import { colorRango } from "../datos/rangos.js";
import { modalidades } from "../datos/ejercicios.js";
import {
  enfoques,
  claseCalibre,
  puntajePrueba,
  sdcNiveles,
  sdcRitmoK,
  bandasCalibre,
  bandaCalibre,
} from "../logica/rutina.js";
import { Tarjeta } from "./base.jsx";
import { sdcCalF, sdcCalT, sdcRango } from "../logica/extras.js";
import { DibujoMascota } from "./tarjetas.jsx";
import { Bienvenida } from "./intro.jsx";
import { PruebaAptitud } from "./prueba.jsx";

function Inicio({ onFinish: e, onLoadBackup: a }) {
  let [l, n] = useState(!1),
    [o, s] = useState(0),
    [u, c] = useState(""),
    [r, p] = useState("salud"),
    [v, x] = useState(["bodyweight"]),
    [y, S] = useState(3),
    [E, T] = useState(""),
    [A, g] = useState(""),
    [b, h] = useState(""),
    [C, D] = useState(0),
    [H, z] = useState(!1),
    [q, U] = useState(""),
    [Y, B] = useState(""),
    J = [
      {
        key: "sq",
        label: "Sentadillas",
        hint: "De pie, bajá hasta que los muslos queden paralelos al suelo. Espalda recta.",
      },
      {
        key: "pu",
        label: "Flexiones",
        hint: "Cuerpo en línea recta. Si necesitás, apoyá las rodillas: cuenta igual.",
      },
      {
        key: "ab",
        label: "Abdominales",
        hint: "Subí con el abdomen, sin tirar del cuello. Bajá controlado.",
      },
      {
        key: "bk",
        label: "Remo invertido",
        hint: "Bajo una mesa firme, cuerpo recto, tirá hasta tocar el borde con el pecho. Sin mesa: superman en el suelo, 1 rep = 3 segundos arriba.",
      },
    ],
    [De, On] = useState("dog"),
    [Aa, Va] = useState(""),
    [sdcBk, sdcSetBk] = useState(""),
    [sdcRitOnb, sdcSetRitOnb] = useState(!1),
    ja = Math.max(0, parseInt(E || "0", 10)),
    Ba = Math.max(0, parseInt(A || "0", 10)),
    fa = Math.max(0, parseInt(b || "0", 10)),
    sdcBkN = Math.max(0, parseInt(sdcBk || "0", 10)),
    Tl = claseCalibre(ja, Ba, fa, sdcBkN),
    Ud = Tl === "principiante" ? "Principiante" : Tl === "intermedio" ? "Intermedio" : "Avanzado";
  return l ? (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#0a0e1a" }}
    >
      <div className="w-full" style={{ maxWidth: 380 }}>
        <div className="text-center mb-6">
          <div className="text-xs uppercase" style={{ letterSpacing: 2, color: "#4f9dff" }}>
            Empecemos por conocerte
          </div>
          <h1
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 26,
              color: "#e8ecf7",
              fontWeight: 700,
            }}
          >
            Dominio Corporal
          </h1>
        </div>
        {o === 0 && (
          <Tarjeta accent="#4f9dff">
            <div className="text-sm mb-3" style={{ color: "#9aa4bd" }}>
              Antes de empezar
            </div>
            <label className="block text-xs mb-1" style={{ color: "#9aa4bd" }}>
              ¿Cómo te llamas?
            </label>
            <input
              value={u}
              onChange={(j) => c(j.target.value)}
              placeholder="Tu nombre"
              className="w-full mb-4 px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              }}
            />
            <button
              disabled={!u.trim()}
              onClick={() => s(5)}
              className="w-full flex items-center justify-center gap-1 py-3 text-sm disabled:opacity-40"
              style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
            >
              Continuar <IconoFlecha size={16} />
            </button>
            <div className="text-center text-xs my-3" style={{ color: "#7a83a0" }}>
              o
            </div>
            {H ? (
              <>
                <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
                  Pega aquí tu respaldo y recuperarás tu progreso sin repetir la calibración.
                </div>
                <textarea
                  value={q}
                  onChange={(j) => {
                    (U(j.target.value), B(""));
                  }}
                  placeholder="Pega aquí tu texto de respaldo"
                  rows={4}
                  className="w-full mb-2 px-2 py-2 text-xs"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e8ecf7",
                    resize: "none",
                  }}
                />
                {Y && (
                  <div className="text-xs mb-2" style={{ color: "#ff5c7a" }}>
                    {Y}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      (z(!1), U(""), B(""));
                    }}
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
                    disabled={!q.trim()}
                    onClick={() => {
                      a(q) || B("Ese respaldo no es válido. Revisá que copiaste todo el texto.");
                    }}
                    className="flex-1 py-3 text-sm disabled:opacity-40"
                    style={{ background: "#7c5cff", color: "#0a0e1a", fontWeight: 700 }}
                  >
                    Cargar
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => z(!0)}
                  className="w-full py-3 text-sm mb-2"
                  style={{
                    background: "rgba(124,92,255,0.12)",
                    border: "1px solid #7c5cff",
                    color: "#b9a5ff",
                    fontWeight: 600,
                  }}
                >
                  Cargar partida guardada
                </button>
                <button
                  onClick={() =>
                    e({
                      name: u.trim() || "Atleta",
                      focusProfile: "salud",
                      modalities: ["bodyweight"],
                      weeklyGoal: 3,
                      classification: "principiante",
                      startRank: "E",
                      testResults: { squat: 15, pushup: 10, abs: 15, back: 6 },
                      pet: { type: "dog", name: "" },
                    })
                  }
                  className="w-full py-2 text-xs"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#9aa4bd",
                  }}
                >
                  Saltar y empezar con valores por defecto
                </button>
              </>
            )}
          </Tarjeta>
        )}
        {o === 5 && (
          <Tarjeta accent="#4f9dff">
            <div className="text-sm mb-1" style={{ color: "#9aa4bd" }}>
              Métodos de entrenamiento
            </div>
            <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
              Elegí uno, varios o todos. Podrás cambiarlo cuando quieras desde tu Perfil.
            </div>
            {modalidades.map((j) => {
              let Se = v.includes(j.id);
              return (
                <button
                  key={j.id}
                  onClick={() =>
                    x((gt) =>
                      Se ? (gt.length > 1 ? gt.filter((oi) => oi !== j.id) : gt) : [...gt, j.id],
                    )
                  }
                  className="w-full text-left px-3 py-2 mb-2"
                  style={{
                    background: Se ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                    border: Se ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        display: "inline-block",
                        flexShrink: 0,
                        border: "1px solid " + (Se ? "#4f9dff" : "rgba(255,255,255,0.3)"),
                        background: Se ? "#4f9dff" : "transparent",
                      }}
                    />
                    <span className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                      {j.name}
                    </span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                    {j.desc}
                  </div>
                </button>
              );
            })}
            <button
              onClick={() => x(modalidades.map((j) => j.id))}
              className="w-full py-2 text-xs mb-3"
              style={{
                background: "rgba(255,184,79,0.1)",
                border: "1px solid #ffb84f",
                color: "#ffb84f",
                fontWeight: 600,
              }}
            >
              SELECCIONAR TODOS (Atleta Híbrido)
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => s(0)}
                className="flex-1 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#e8ecf7",
                  fontWeight: 600,
                }}
              >
                Atrás
              </button>
              <button
                onClick={() => s(4)}
                className="flex-1 flex items-center justify-center gap-1 py-3 text-sm"
                style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
              >
                Continuar <IconoFlecha size={16} />
              </button>
            </div>
          </Tarjeta>
        )}
        {o === 4 && (
          <Tarjeta accent="#3ecf8e">
            <div className="text-sm mb-1" style={{ color: "#9aa4bd" }}>
              Perfiles de Enfoque Biomecánico
            </div>
            <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
              Elegí cómo querés que se calibre tu carga y tu progresión.
            </div>
            {enfoques.map((j) => {
              let Se = r === j.id;
              return (
                <button
                  key={j.id}
                  onClick={() => p(j.id)}
                  className="w-full text-left px-3 py-2 mb-2"
                  style={{
                    background: Se ? "rgba(62,207,142,0.12)" : "rgba(255,255,255,0.03)",
                    border: Se ? "1px solid #3ecf8e" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                    {j.name}
                  </div>
                  {Se && (
                    <div className="mt-2">
                      <div className="text-xs" style={{ color: "#9aa4bd" }}>
                        <b style={{ color: "#4f9dff" }}>Ajuste:</b> {j.ajuste}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                        <b style={{ color: "#3ecf8e" }}>Ventaja:</b> {j.ventaja}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                        <b style={{ color: "#ff5c7a" }}>Desventaja:</b> {j.desventaja}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => s(5)}
                className="flex-1 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#e8ecf7",
                  fontWeight: 600,
                }}
              >
                Atrás
              </button>
              <button
                onClick={() => s(6)}
                className="flex-1 flex items-center justify-center gap-1 py-3 text-sm"
                style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
              >
                Continuar <IconoFlecha size={16} />
              </button>
            </div>
          </Tarjeta>
        )}
        {o === 6 && (
          <Tarjeta accent="#3ecf8e">
            <div className="text-sm mb-1" style={{ color: "#9aa4bd" }}>
              Tu compromiso semanal
            </div>
            <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
              ¿Cuántas sesiones querés hacer por semana? Tu racha solo se corta si ya no podés
              alcanzar esa meta, no por saltarte un día suelto.
            </div>
            <div className="grid grid-cols-7 gap-1 mb-3">
              {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                <button
                  key={j}
                  onClick={() => S(j)}
                  className="py-3 text-sm"
                  style={{
                    background: y === j ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                    border: "1px solid " + (y === j ? "#3ecf8e" : "rgba(255,255,255,0.15)"),
                    color: y === j ? "#0a0e1a" : "#9aa4bd",
                    fontWeight: 700,
                  }}
                >
                  {j}
                </button>
              ))}
            </div>
            <div className="text-xs mb-3" style={{ color: "#7a83a0" }}>
              {y <= 2
                ? "Ritmo suave: ideal para empezar sin romperte."
                : y <= 4
                  ? "Ritmo equilibrado: el más sostenible a largo plazo."
                  : "Ritmo exigente: asegúrate de descansar bien."}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => s(4)}
                className="flex-1 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#e8ecf7",
                  fontWeight: 600,
                }}
              >
                Atrás
              </button>
              <button
                onClick={() => s(1)}
                className="flex-1 flex items-center justify-center gap-1 py-3 text-sm"
                style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
              >
                Continuar <IconoFlecha size={16} />
              </button>
            </div>
          </Tarjeta>
        )}
        {o === 1 &&
          (C < J.length ? (
            <>
              <Tarjeta accent="#ffb84f" style={{ marginBottom: 12 }}>
                <div className="text-sm mb-1" style={{ color: "#ffb84f", fontWeight: 700 }}>
                  Punto de Partida ({C + 1}/{J.length})
                </div>
                <div className="text-xs" style={{ color: "#9aa4bd" }}>
                  Máximas repeticiones seguidas, siguiendo la cadencia del metrónomo.
                </div>
              </Tarjeta>
              <PruebaAptitud
                key={J[C].key}
                exercise={J[C]}
                onFinish={(j) => {
                  sdcSetRitOnb(!0);
                  let Se = J[C].key;
                  (Se === "sq" && T(String(j)),
                    Se === "pu" && g(String(j)),
                    Se === "ab" && h(String(j)),
                    Se === "bk" && sdcSetBk(String(j)),
                    D((gt) => gt + 1));
                }}
              />
              {C === 0 && (
                <Tarjeta accent="#4f9dff" style={{ marginTop: 12 }}>
                  <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                    ¿Ya conocés tus números?
                  </div>
                  <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                    Anotalos aquí y te saltás la prueba con cadencia.
                  </div>
                  {[
                    { lb: "Sentadillas", vl: E, st: T },
                    { lb: "Flexiones", vl: A, st: g },
                    { lb: "Abdominales", vl: b, st: h },
                    { lb: "Remo invertido", vl: sdcBk, st: sdcSetBk },
                  ].map((mn) => (
                    <div key={mn.lb} className="flex justify-between items-center gap-2 mb-2">
                      <span className="text-xs" style={{ color: "#9aa4bd" }}>
                        {mn.lb}
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={mn.vl}
                        onChange={(ev) => {
                          (sdcSetRitOnb(!1), mn.st(ev.target.value));
                        }}
                        placeholder="0"
                        className="px-2 py-2 text-sm text-center"
                        style={{
                          width: 90,
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "#e8ecf7",
                        }}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => D(J.length)}
                    disabled={!(E || A || b || sdcBk)}
                    className="w-full py-2 text-xs mt-2 disabled:opacity-40"
                    style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
                  >
                    Usar estos números
                  </button>
                </Tarjeta>
              )}
              {C === 0 && (
                <Tarjeta accent="#3ecf8e" style={{ marginTop: 12 }}>
                  <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                    Prefiero no ir al máximo
                  </div>
                  <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                    Elegí la frase que más se te parezca. La app calcula tu volumen sin que tengas
                    que llegar al fallo, y siempre podés hacer la prueba después desde tu Perfil.
                  </div>
                  {sdcNiveles.map(function (jn) {
                    return (
                      <button
                        key={jn.t}
                        onClick={function () {
                          (T(String(jn.sq)),
                            g(String(jn.pu)),
                            h(String(jn.ab)),
                            sdcSetBk(String(jn.bk)),
                            sdcSetRitOnb(!1),
                            D(J.length));
                        }}
                        className="w-full text-left px-3 py-2 mb-2"
                        style={{
                          minHeight: 44,
                          background: "rgba(62,207,142,0.08)",
                          border: "1px solid rgba(62,207,142,0.3)",
                        }}
                      >
                        <div className="text-xs" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                          {jn.t}
                        </div>
                        <div className="text-xs" style={{ color: "#9aa4bd" }}>
                          {jn.d}
                        </div>
                      </button>
                    );
                  })}
                </Tarjeta>
              )}
              <div className="text-center mt-3">
                <button
                  onClick={() => {
                    (D(0), s(6));
                  }}
                  className="text-xs underline"
                  style={{ color: "#9aa4bd" }}
                >
                  Volver
                </button>
              </div>
            </>
          ) : (
            <Tarjeta accent="#ffb84f">
              <div className="text-sm mb-3" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                Punto de Partida registrado
              </div>
              <div className="flex justify-between text-sm mb-1" style={{ color: "#9aa4bd" }}>
                <span>Sentadillas</span>
                <span style={{ color: "#e8ecf7" }}>{ja}</span>
              </div>
              <div className="flex justify-between text-sm mb-1" style={{ color: "#9aa4bd" }}>
                <span>Flexiones (×2)</span>
                <span style={{ color: "#e8ecf7" }}>{Ba}</span>
              </div>
              <div className="flex justify-between text-sm mb-1" style={{ color: "#9aa4bd" }}>
                <span>Abdominales</span>
                <span style={{ color: "#e8ecf7" }}>{fa}</span>
              </div>
              <div className="flex justify-between text-sm mb-3" style={{ color: "#9aa4bd" }}>
                <span>Remo invertido (×2)</span>
                <span style={{ color: "#e8ecf7" }}>{sdcBkN}</span>
              </div>
              <div
                className="flex justify-between text-sm mb-4"
                style={{ color: "#ffb84f", fontWeight: 700 }}
              >
                <span>Puntaje</span>
                <span>{puntajePrueba(ja, Ba, fa, sdcBkN)} pts</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => D(0)}
                  className="flex-1 py-3 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    color: "#e8ecf7",
                    fontWeight: 600,
                  }}
                >
                  Repetir
                </button>
                <button
                  onClick={() => s(2)}
                  className="flex-1 flex items-center justify-center gap-1 py-3 text-sm"
                  style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
                >
                  Continuar <IconoFlecha size={16} />
                </button>
              </div>
            </Tarjeta>
          ))}
        {o === 2 && (
          <Tarjeta accent="#ffb84f">
            <div className="text-sm mb-1" style={{ color: "#9aa4bd" }}>
              Un compañero se acerca
            </div>
            <div className="text-xs mb-4" style={{ color: "#9aa4bd" }}>
              Te acompañará en tu camino con consejos de entrenamiento y salud.
            </div>
            <div className="flex justify-center mb-4">
              <DibujoMascota type={De} size={90} color="#ffb84f" />
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => On("dog")}
                className="flex-1 py-3 text-sm"
                style={{
                  background: De === "dog" ? "rgba(255,184,79,0.15)" : "rgba(255,255,255,0.03)",
                  border: De === "dog" ? "1px solid #ffb84f" : "1px solid rgba(255,255,255,0.1)",
                  color: "#e8ecf7",
                }}
              >
                🐶 Perro
              </button>
              <button
                onClick={() => On("cat")}
                className="flex-1 py-3 text-sm"
                style={{
                  background: De === "cat" ? "rgba(255,184,79,0.15)" : "rgba(255,255,255,0.03)",
                  border: De === "cat" ? "1px solid #ffb84f" : "1px solid rgba(255,255,255,0.1)",
                  color: "#e8ecf7",
                }}
              >
                🐱 Gato
              </button>
            </div>
            <label className="block text-xs mb-1" style={{ color: "#9aa4bd" }}>
              ¿Cómo se llama?
            </label>
            <input
              value={Aa}
              onChange={(j) => Va(j.target.value)}
              placeholder="Nombre de tu compañero"
              className="w-full mb-4 px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => s(1)}
                className="flex-1 py-3 text-sm"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#e8ecf7",
                  fontWeight: 600,
                }}
              >
                Atrás
              </button>
              <button
                disabled={!Aa.trim()}
                onClick={() => s(3)}
                className="flex-1 flex items-center justify-center gap-1 py-3 text-sm disabled:opacity-40"
                style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
              >
                Continuar <IconoFlecha size={16} />
              </button>
            </div>
          </Tarjeta>
        )}
        {o === 3 &&
          (() => {
            let j = bandaCalibre(ja, Ba, fa, sdcBkN, sdcRitOnb ? sdcRitmoK : 1),
              Se = colorRango["E"];
            return (
              <Tarjeta accent={Se}>
                <div className="text-center mb-4">
                  <div className="text-xs uppercase" style={{ letterSpacing: 2, color: "#9aa4bd" }}>
                    Calibración completa
                  </div>
                  <div
                    style={{
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 36,
                      color: Se,
                      fontWeight: 700,
                    }}
                  >
                    {sdcRango("E", { modalities: v })}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                    {sdcCalT(bandasCalibre.indexOf(j), { modalities: v })} ·{" "}
                    {puntajePrueba(ja, Ba, fa, sdcBkN)} pts
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                    Enfoque: {sdcCalF(bandasCalibre.indexOf(j), { modalities: v })}
                  </div>
                </div>
                <div className="text-sm mb-2" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                  Bienvenido, {u}. Esto es tuyo.
                </div>
                <div className="text-sm mb-4" style={{ color: "#9aa4bd" }}>
                  Todos empiezan en {sdcRango("E", { modalities: v })}. Tu prueba no fija el rango:
                  define el volumen de tu rutina. Cuantas más repeticiones hagas, más XP ganarás y
                  más rápido avanzarás.
                </div>
                <div
                  className="flex items-center gap-2 mb-4 p-3"
                  style={{
                    background: "rgba(255,184,79,0.08)",
                    border: "1px solid rgba(255,184,79,0.3)",
                  }}
                >
                  <DibujoMascota type={De} size={40} color="#ffb84f" />
                  <div className="text-xs" style={{ color: "#e8ecf7" }}>
                    <b>{Aa}</b> te acompañará y te dará consejos en el camino.
                  </div>
                </div>
                <button
                  onClick={() =>
                    e({
                      name: u.trim(),
                      focusProfile: r,
                      modalities: v,
                      weeklyGoal: y,
                      classification: j.classification,
                      startRank: "E",
                      testResults: sdcRitOnb
                        ? { squat: ja, pushup: Ba, abs: fa, back: sdcBkN, ritmo: 5 }
                        : { squat: ja, pushup: Ba, abs: fa, back: sdcBkN },
                      pet: { type: De, name: Aa.trim() },
                    })
                  }
                  className="w-full py-3 text-sm"
                  style={{ background: Se, color: "#0a0e1a", fontWeight: 700, letterSpacing: 1 }}
                >
                  INICIAR DOMINIO CORPORAL
                </button>
              </Tarjeta>
            );
          })()}
      </div>
    </div>
  ) : (
    <Bienvenida onDone={() => n(!0)} />
  );
}

export { Inicio };
