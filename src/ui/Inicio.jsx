// Primera vez: presentacion y prueba inicial.
import { useState } from "react";
import { IconoFlecha } from "./iconos.jsx";
import { colorRango } from "../datos/rangos.js";
import { modalidades } from "../datos/ejercicios.js";
import {
  enfoques,
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

function Inicio({ onFinish, onLoadBackup }) {
  let [introVista, setIntroVista] = useState(!1),
    [paso, setPaso] = useState(0),
    [nombre, setNombre] = useState(""),
    [enfoque, setEnfoque] = useState("salud"),
    [mods, setMods] = useState(["bodyweight"]),
    [meta, setMeta] = useState(3),
    [sentadillas, setSentadillas] = useState(""),
    [flexiones, setFlexiones] = useState(""),
    [abdominales, setAbdominales] = useState(""),
    [pruebaPaso, setPruebaPaso] = useState(0),
    [restaurando, setRestaurando] = useState(!1),
    [respaldo, setRespaldo] = useState(""),
    [errorRespaldo, setErrorRespaldo] = useState(""),
    ejerciciosPrueba = [
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
    [mascota, setMascota] = useState("dog"),
    [nombreMascota, setNombreMascota] = useState(""),
    [sdcBk, sdcSetBk] = useState(""),
    [sdcRitOnb, sdcSetRitOnb] = useState(!1),
    nSentadillas = Math.max(0, parseInt(sentadillas || "0", 10)),
    nFlexiones = Math.max(0, parseInt(flexiones || "0", 10)),
    nAbdominales = Math.max(0, parseInt(abdominales || "0", 10)),
    sdcBkN = Math.max(0, parseInt(sdcBk || "0", 10));
  return introVista ? (
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
        {paso === 0 && (
          <Tarjeta accent="#4f9dff">
            <div className="text-sm mb-3" style={{ color: "#9aa4bd" }}>
              Antes de empezar
            </div>
            <label className="block text-xs mb-1" style={{ color: "#9aa4bd" }}>
              ¿Cómo te llamas?
            </label>
            <input
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              placeholder="Tu nombre"
              className="w-full mb-4 px-3 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              }}
            />
            <button
              disabled={!nombre.trim()}
              onClick={() => setPaso(5)}
              className="w-full flex items-center justify-center gap-1 py-3 text-sm disabled:opacity-40"
              style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
            >
              Continuar <IconoFlecha size={16} />
            </button>
            <div className="text-center text-xs my-3" style={{ color: "#8a93ad" }}>
              o
            </div>
            {restaurando ? (
              <>
                <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
                  Pega aquí tu respaldo y recuperarás tu progreso sin repetir la calibración.
                </div>
                <textarea
                  value={respaldo}
                  onChange={(evento) => {
                    (setRespaldo(evento.target.value), setErrorRespaldo(""));
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
                {errorRespaldo && (
                  <div className="text-xs mb-2" style={{ color: "#ff5c7a" }}>
                    {errorRespaldo}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      (setRestaurando(!1), setRespaldo(""), setErrorRespaldo(""));
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
                    disabled={!respaldo.trim()}
                    onClick={() => {
                      onLoadBackup(respaldo) ||
                        setErrorRespaldo(
                          "Ese respaldo no es válido. Revisá que copiaste todo el texto.",
                        );
                    }}
                    className="flex-1 py-3 text-sm disabled:opacity-40"
                    style={{ background: "#9278ff", color: "#0a0e1a", fontWeight: 700 }}
                  >
                    Cargar
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setRestaurando(!0)}
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
                    onFinish({
                      name: nombre.trim() || "Atleta",
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
        {paso === 5 && (
          <Tarjeta accent="#4f9dff">
            <div className="text-sm mb-1" style={{ color: "#9aa4bd" }}>
              Métodos de entrenamiento
            </div>
            <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
              Elegí uno, varios o todos. Podrás cambiarlo cuando quieras desde tu Perfil.
            </div>
            {modalidades.map((mod) => {
              let elegida = mods.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() =>
                    setMods((previas) =>
                      elegida
                        ? previas.length > 1
                          ? previas.filter((id) => id !== mod.id)
                          : previas
                        : [...previas, mod.id],
                    )
                  }
                  className="w-full text-left px-3 py-2 mb-2"
                  style={{
                    background: elegida ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                    border: elegida ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        display: "inline-block",
                        flexShrink: 0,
                        border: "1px solid " + (elegida ? "#4f9dff" : "rgba(255,255,255,0.3)"),
                        background: elegida ? "#4f9dff" : "transparent",
                      }}
                    />
                    <span className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                      {mod.name}
                    </span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                    {mod.desc}
                  </div>
                </button>
              );
            })}
            <button
              onClick={() => setMods(modalidades.map((mod) => mod.id))}
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
                onClick={() => setPaso(0)}
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
                onClick={() => setPaso(4)}
                className="flex-1 flex items-center justify-center gap-1 py-3 text-sm"
                style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
              >
                Continuar <IconoFlecha size={16} />
              </button>
            </div>
          </Tarjeta>
        )}
        {paso === 4 && (
          <Tarjeta accent="#3ecf8e">
            <div className="text-sm mb-1" style={{ color: "#9aa4bd" }}>
              Perfiles de Enfoque Biomecánico
            </div>
            <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
              Elegí cómo querés que se calibre tu carga y tu progresión.
            </div>
            {enfoques.map((opcion) => {
              let elegido = enfoque === opcion.id;
              return (
                <button
                  key={opcion.id}
                  onClick={() => setEnfoque(opcion.id)}
                  className="w-full text-left px-3 py-2 mb-2"
                  style={{
                    background: elegido ? "rgba(62,207,142,0.12)" : "rgba(255,255,255,0.03)",
                    border: elegido ? "1px solid #3ecf8e" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                    {opcion.name}
                  </div>
                  {elegido && (
                    <div className="mt-2">
                      <div className="text-xs" style={{ color: "#9aa4bd" }}>
                        <b style={{ color: "#4f9dff" }}>Ajuste:</b> {opcion.ajuste}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                        <b style={{ color: "#3ecf8e" }}>Ventaja:</b> {opcion.ventaja}
                      </div>
                      <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                        <b style={{ color: "#ff5c7a" }}>Desventaja:</b> {opcion.desventaja}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setPaso(5)}
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
                onClick={() => setPaso(6)}
                className="flex-1 flex items-center justify-center gap-1 py-3 text-sm"
                style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
              >
                Continuar <IconoFlecha size={16} />
              </button>
            </div>
          </Tarjeta>
        )}
        {paso === 6 && (
          <Tarjeta accent="#3ecf8e">
            <div className="text-sm mb-1" style={{ color: "#9aa4bd" }}>
              Tu compromiso semanal
            </div>
            <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
              ¿Cuántas sesiones querés hacer por semana? Tu racha solo se corta si ya no podés
              alcanzar esa meta, no por saltarte un día suelto.
            </div>
            <div className="grid grid-cols-7 gap-1 mb-3">
              {[1, 2, 3, 4, 5, 6, 7].map((dias) => (
                <button
                  key={dias}
                  onClick={() => setMeta(dias)}
                  className="py-3 text-sm"
                  style={{
                    background: meta === dias ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                    border: "1px solid " + (meta === dias ? "#3ecf8e" : "rgba(255,255,255,0.15)"),
                    color: meta === dias ? "#0a0e1a" : "#9aa4bd",
                    fontWeight: 700,
                  }}
                >
                  {dias}
                </button>
              ))}
            </div>
            <div className="text-xs mb-3" style={{ color: "#8a93ad" }}>
              {meta <= 2
                ? "Ritmo suave: ideal para empezar sin romperte."
                : meta <= 4
                  ? "Ritmo equilibrado: el más sostenible a largo plazo."
                  : "Ritmo exigente: asegúrate de descansar bien."}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPaso(4)}
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
                onClick={() => setPaso(1)}
                className="flex-1 flex items-center justify-center gap-1 py-3 text-sm"
                style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
              >
                Continuar <IconoFlecha size={16} />
              </button>
            </div>
          </Tarjeta>
        )}
        {paso === 1 &&
          (pruebaPaso < ejerciciosPrueba.length ? (
            <>
              <Tarjeta accent="#ffb84f" style={{ marginBottom: 12 }}>
                <div className="text-sm mb-1" style={{ color: "#ffb84f", fontWeight: 700 }}>
                  Punto de Partida ({pruebaPaso + 1}/{ejerciciosPrueba.length})
                </div>
                <div className="text-xs" style={{ color: "#9aa4bd" }}>
                  Máximas repeticiones seguidas, siguiendo la cadencia del metrónomo.
                </div>
              </Tarjeta>
              <PruebaAptitud
                key={ejerciciosPrueba[pruebaPaso].key}
                exercise={ejerciciosPrueba[pruebaPaso]}
                onFinish={(reps) => {
                  sdcSetRitOnb(!0);
                  let clave = ejerciciosPrueba[pruebaPaso].key;
                  (clave === "sq" && setSentadillas(String(reps)),
                    clave === "pu" && setFlexiones(String(reps)),
                    clave === "ab" && setAbdominales(String(reps)),
                    clave === "bk" && sdcSetBk(String(reps)),
                    setPruebaPaso((previo) => previo + 1));
                }}
              />
              {pruebaPaso === 0 && (
                <Tarjeta accent="#4f9dff" style={{ marginTop: 12 }}>
                  <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                    ¿Ya conocés tus números?
                  </div>
                  <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                    Anotalos aquí y te saltás la prueba con cadencia.
                  </div>
                  {[
                    { lb: "Sentadillas", vl: sentadillas, st: setSentadillas },
                    { lb: "Flexiones", vl: flexiones, st: setFlexiones },
                    { lb: "Abdominales", vl: abdominales, st: setAbdominales },
                    { lb: "Remo invertido", vl: sdcBk, st: sdcSetBk },
                  ].map((campo) => (
                    <div key={campo.lb} className="flex justify-between items-center gap-2 mb-2">
                      <span className="text-xs" style={{ color: "#9aa4bd" }}>
                        {campo.lb}
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={campo.vl}
                        onChange={(evento) => {
                          (sdcSetRitOnb(!1), campo.st(evento.target.value));
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
                    onClick={() => setPruebaPaso(ejerciciosPrueba.length)}
                    disabled={!(sentadillas || flexiones || abdominales || sdcBk)}
                    className="w-full py-2 text-xs mt-2 disabled:opacity-40"
                    style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
                  >
                    Usar estos números
                  </button>
                </Tarjeta>
              )}
              {pruebaPaso === 0 && (
                <Tarjeta accent="#3ecf8e" style={{ marginTop: 12 }}>
                  <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                    Prefiero no ir al máximo
                  </div>
                  <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                    Elegí la frase que más se te parezca. La app calcula tu volumen sin que tengas
                    que llegar al fallo, y siempre podés hacer la prueba después desde tu Perfil.
                  </div>
                  {sdcNiveles.map(function (nivel) {
                    return (
                      <button
                        key={nivel.t}
                        onClick={function () {
                          (setSentadillas(String(nivel.sq)),
                            setFlexiones(String(nivel.pu)),
                            setAbdominales(String(nivel.ab)),
                            sdcSetBk(String(nivel.bk)),
                            sdcSetRitOnb(!1),
                            setPruebaPaso(ejerciciosPrueba.length));
                        }}
                        className="w-full text-left px-3 py-2 mb-2"
                        style={{
                          minHeight: 44,
                          background: "rgba(62,207,142,0.08)",
                          border: "1px solid rgba(62,207,142,0.3)",
                        }}
                      >
                        <div className="text-xs" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                          {nivel.t}
                        </div>
                        <div className="text-xs" style={{ color: "#9aa4bd" }}>
                          {nivel.d}
                        </div>
                      </button>
                    );
                  })}
                </Tarjeta>
              )}
              <div className="text-center mt-3">
                <button
                  onClick={() => {
                    (setPruebaPaso(0), setPaso(6));
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
                <span style={{ color: "#e8ecf7" }}>{nSentadillas}</span>
              </div>
              <div className="flex justify-between text-sm mb-1" style={{ color: "#9aa4bd" }}>
                <span>Flexiones (×2)</span>
                <span style={{ color: "#e8ecf7" }}>{nFlexiones}</span>
              </div>
              <div className="flex justify-between text-sm mb-1" style={{ color: "#9aa4bd" }}>
                <span>Abdominales</span>
                <span style={{ color: "#e8ecf7" }}>{nAbdominales}</span>
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
                <span>{puntajePrueba(nSentadillas, nFlexiones, nAbdominales, sdcBkN)} pts</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPruebaPaso(0)}
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
                  onClick={() => setPaso(2)}
                  className="flex-1 flex items-center justify-center gap-1 py-3 text-sm"
                  style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
                >
                  Continuar <IconoFlecha size={16} />
                </button>
              </div>
            </Tarjeta>
          ))}
        {paso === 2 && (
          <Tarjeta accent="#ffb84f">
            <div className="text-sm mb-1" style={{ color: "#9aa4bd" }}>
              Un compañero se acerca
            </div>
            <div className="text-xs mb-4" style={{ color: "#9aa4bd" }}>
              Te acompañará en tu camino con consejos de entrenamiento y salud.
            </div>
            <div className="flex justify-center mb-4">
              <DibujoMascota type={mascota} size={90} color="#ffb84f" />
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMascota("dog")}
                className="flex-1 py-3 text-sm"
                style={{
                  background:
                    mascota === "dog" ? "rgba(255,184,79,0.15)" : "rgba(255,255,255,0.03)",
                  border:
                    mascota === "dog" ? "1px solid #ffb84f" : "1px solid rgba(255,255,255,0.1)",
                  color: "#e8ecf7",
                }}
              >
                🐶 Perro
              </button>
              <button
                onClick={() => setMascota("cat")}
                className="flex-1 py-3 text-sm"
                style={{
                  background:
                    mascota === "cat" ? "rgba(255,184,79,0.15)" : "rgba(255,255,255,0.03)",
                  border:
                    mascota === "cat" ? "1px solid #ffb84f" : "1px solid rgba(255,255,255,0.1)",
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
              value={nombreMascota}
              onChange={(evento) => setNombreMascota(evento.target.value)}
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
                onClick={() => setPaso(1)}
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
                disabled={!nombreMascota.trim()}
                onClick={() => setPaso(3)}
                className="flex-1 flex items-center justify-center gap-1 py-3 text-sm disabled:opacity-40"
                style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
              >
                Continuar <IconoFlecha size={16} />
              </button>
            </div>
          </Tarjeta>
        )}
        {paso === 3 &&
          (() => {
            let banda = bandaCalibre(
                nSentadillas,
                nFlexiones,
                nAbdominales,
                sdcBkN,
                sdcRitOnb ? sdcRitmoK : 1,
              ),
              color = colorRango["E"];
            return (
              <Tarjeta accent={color}>
                <div className="text-center mb-4">
                  <div className="text-xs uppercase" style={{ letterSpacing: 2, color: "#9aa4bd" }}>
                    Calibración completa
                  </div>
                  <div
                    style={{
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 36,
                      color,
                      fontWeight: 700,
                    }}
                  >
                    {sdcRango("E", { modalities: mods })}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                    {sdcCalT(bandasCalibre.indexOf(banda), { modalities: mods })} ·{" "}
                    {puntajePrueba(nSentadillas, nFlexiones, nAbdominales, sdcBkN)} pts
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                    Enfoque: {sdcCalF(bandasCalibre.indexOf(banda), { modalities: mods })}
                  </div>
                </div>
                <div className="text-sm mb-2" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                  Bienvenido, {nombre}. Esto es tuyo.
                </div>
                <div className="text-sm mb-4" style={{ color: "#9aa4bd" }}>
                  Todos empiezan en {sdcRango("E", { modalities: mods })}. Tu prueba no fija el
                  rango: define el volumen de tu rutina. Cuantas más repeticiones hagas, más XP
                  ganarás y más rápido avanzarás.
                </div>
                <div
                  className="flex items-center gap-2 mb-4 p-3"
                  style={{
                    background: "rgba(255,184,79,0.08)",
                    border: "1px solid rgba(255,184,79,0.3)",
                  }}
                >
                  <DibujoMascota type={mascota} size={40} color="#ffb84f" />
                  <div className="text-xs" style={{ color: "#e8ecf7" }}>
                    <b>{nombreMascota}</b> te acompañará y te dará consejos en el camino.
                  </div>
                </div>
                <button
                  onClick={() =>
                    onFinish({
                      name: nombre.trim(),
                      focusProfile: enfoque,
                      modalities: mods,
                      weeklyGoal: meta,
                      classification: banda.classification,
                      startRank: "E",
                      testResults: sdcRitOnb
                        ? {
                            squat: nSentadillas,
                            pushup: nFlexiones,
                            abs: nAbdominales,
                            back: sdcBkN,
                            ritmo: 5,
                          }
                        : {
                            squat: nSentadillas,
                            pushup: nFlexiones,
                            abs: nAbdominales,
                            back: sdcBkN,
                          },
                      pet: { type: mascota, name: nombreMascota.trim() },
                    })
                  }
                  className="w-full py-3 text-sm"
                  style={{ background: color, color: "#0a0e1a", fontWeight: 700, letterSpacing: 1 }}
                >
                  INICIAR DOMINIO CORPORAL
                </button>
              </Tarjeta>
            );
          })()}
      </div>
    </div>
  ) : (
    <Bienvenida onDone={() => setIntroVista(!0)} />
  );
}

export { Inicio };
