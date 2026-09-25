// Pestana Perfil: prueba de aptitud, metodos, sistemas, numeros, primeras veces y respaldo.
import { useState } from "react";
import {
  fechaHoy,
  enfoqueDe,
  modalidadesDe,
  sdcCalibre,
  puntajePrueba,
  sdcPuntaje,
  sdcRitmoF,
  sdcBandaIx,
  bandasCalibre,
  sdcBandaMin,
} from "../../logica/rutina.js";
import { sistemas, sistemaActivo, sistemaAbierto } from "../../logica/sistemas.js";
import { modalidades } from "../../datos/ejercicios.js";
import {
  listaAtributos,
  valorAtributo,
  progresoAtributo,
  nivelAtributo,
} from "../../logica/atributos.js";
import { movimientosPrimal } from "../../logica/primal.js";
import { logros, sdcAnimoCuenta } from "../../datos/logros.js";
import { sdcPrimeras, sdcJuego, sdcCalF, sdcCalT, sdcKgTxt } from "../../logica/extras.js";
import { sdcTitulos } from "../../datos/rangos.js";
import { BarraXp, Tarjeta } from "../base.jsx";
import { Plegable } from "../tarjetas.jsx";
import { IconoPersona, IconoCandado } from "../iconos.jsx";
import { PruebaAptitud } from "../prueba.jsx";

// "Hoy pude algo que antes no podía": un campo dentro de la tarjeta, en vez del
// cuadro del navegador (window.prompt). Se abre al tocar el boton y se cierra al anotar.
function AnotarPrimera({ onAnotar }) {
  let [abierto, setAbierto] = useState(false),
    [texto, setTexto] = useState(""),
    listo = texto.trim().length > 0,
    cerrar = () => (setTexto(""), setAbierto(false)),
    anotar = () => listo && (onAnotar(texto), cerrar()),
    secundario = {
      minHeight: 44,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#e8ecf7",
      fontWeight: 600,
    };
  if (!abierto)
    return (
      <button
        onClick={() => setAbierto(true)}
        className="w-full py-2 text-xs mb-3"
        style={{
          minHeight: 44,
          background: "rgba(176,132,245,0.12)",
          border: "1px solid #b084f5",
          color: "#e8ecf7",
          fontWeight: 600,
        }}
      >
        Hoy pude algo que antes no podía
      </button>
    );
  return (
    <div className="mb-3">
      <input
        type="text"
        value={texto}
        autoFocus
        maxLength={120}
        onChange={(evento) => setTexto(evento.target.value)}
        onKeyDown={(evento) => evento.key === "Enter" && anotar()}
        placeholder="¿Qué pudiste hacer hoy que antes no podías?"
        aria-label="Qué pudiste hacer hoy que antes no podías"
        className="w-full px-3 py-2 text-sm"
        style={{
          minHeight: 44,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid #b084f5",
          color: "#e8ecf7",
        }}
      />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={anotar}
          disabled={!listo}
          className="py-2 text-sm disabled:opacity-40"
          style={{
            minHeight: 44,
            background: "#b084f5",
            border: "1px solid #b084f5",
            color: "#0a0e1a",
            fontWeight: 700,
          }}
        >
          Anotar
        </button>
        <button onClick={cerrar} className="py-2 text-sm" style={secundario}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export function PestanaPerfil({
  achievements,
  alternarDesbloqueo,
  alternarModalidad,
  alternarPlegable,
  alternarSistema,
  bkCargar,
  bkDescargar,
  combat,
  confirmarRestaurar,
  copiarRespaldo,
  dungeonsCleared,
  guardarReprueba,
  kmTotales,
  lifetimeReps,
  modalidad,
  player,
  plegado,
  ponerPesoCorporal,
  ponerModalidades,
  primal,
  profile,
  progress,
  repAbdominales,
  repFlexiones,
  repruebaAbierta,
  repruebaEjercicios,
  repruebaPaso,
  repSentadillas,
  respaldoTexto,
  restaurarRespaldo,
  sdcPonerJuego,
  sdcPrimeraManual,
  sdcRbk,
  sdcSetRbk,
  setConfirmarRestaurar,
  setRepAbdominales,
  setRepFlexiones,
  setRepruebaAbierta,
  setRepruebaPaso,
  setRepSentadillas,
  setRespaldoTexto,
  ui,
}) {
  let diasDesde = Math.max(
    1,
    Math.floor(
      (new Date(fechaHoy() + "T00:00:00") - new Date(profile.createdDate + "T00:00:00")) / 864e5,
    ) + 1,
  );
  return (
    <>
      <Tarjeta accent="#4f9dff" style={{ marginBottom: 16 }}>
        <div className="flex items-center gap-2 mb-1">
          <IconoPersona size={20} color="#4f9dff" />
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 20,
              color: "#e8ecf7",
              fontWeight: 700,
            }}
          >
            {profile.name}
          </div>
        </div>
        <div className="text-xs" style={{ color: "#9aa4bd" }}>
          Entrenando desde el {profile.createdDate} · Día {diasDesde}
        </div>
        <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
          Enfoque: {enfoqueDe(profile.focusProfile).name}
        </div>
        <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
          Clasificación: {profile.classification}
        </div>
      </Tarjeta>
      <Plegable
        id="sistemas"
        title="Sistemas del juego"
        accent="#ffb84f"
        style={{ marginBottom: 16 }}
        collapsed={
          ui && ui.collapsed && ui.collapsed.sistemas !== void 0 ? plegado("sistemas") : !0
        }
        onToggle={alternarPlegable}
        right={`${sistemas.filter((sistema) => sistemaActivo(player, sistema.id)).length + 1}/${sistemas.length + 1}`}
      >
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Se abren al subir de nivel. Podés abrirlos todos o apagar los que no uses.
        </div>
        <button
          onClick={alternarDesbloqueo}
          className="w-full py-3 text-sm mb-3"
          style={{
            background: player.unlockAll ? "#ffb84f" : "rgba(255,184,79,0.1)",
            border: "1px solid #ffb84f",
            color: player.unlockAll ? "#0a0e1a" : "#ffb84f",
            fontWeight: 700,
          }}
        >
          {player.unlockAll ? "Desbloqueo total ACTIVO" : "Desbloquear todo ahora"}
        </button>
        <div
          className="flex items-center justify-between py-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
              Rutina del día
            </div>
            <div className="text-xs" style={{ color: "#8a93ad" }}>
              El núcleo. Siempre activo.
            </div>
          </div>
          <span className="text-xs" style={{ color: "#3ecf8e" }}>
            Base
          </span>
        </div>
        {sistemas.map((sistema) => {
          let abierto = sistemaAbierto(player, sistema.id),
            apagado = (player.disabled || []).includes(sistema.id),
            activo = sistemaActivo(player, sistema.id);
          return (
            <div
              key={sistema.id}
              className="flex items-center justify-between gap-2 py-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div style={{ flex: 1 }}>
                <div
                  className="text-sm"
                  style={{ color: activo ? "#e8ecf7" : "#8a93ad", fontWeight: 600 }}
                >
                  {sistema.name}
                </div>
                <div className="text-xs" style={{ color: "#8a93ad" }}>
                  {abierto ? sistema.why : `Se abre en el nivel ${sistema.level}`}
                </div>
              </div>
              {abierto ? (
                <button
                  onClick={() => alternarSistema(sistema.id)}
                  className="py-2 px-3 text-xs"
                  style={{
                    background: apagado ? "rgba(255,255,255,0.05)" : "rgba(62,207,142,0.12)",
                    border: "1px solid " + (apagado ? "rgba(255,255,255,0.2)" : "#3ecf8e"),
                    color: apagado ? "#9aa4bd" : "#3ecf8e",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {apagado ? "Apagado" : "Activo"}
                </button>
              ) : (
                <IconoCandado size={16} color="#8a93ad" />
              )}
            </div>
          );
        })}
      </Plegable>
      <Plegable
        id="metodos"
        title="Métodos de entrenamiento"
        accent="#4f9dff"
        style={{ marginBottom: 16 }}
        collapsed={ui && ui.collapsed && ui.collapsed.metodos !== void 0 ? plegado("metodos") : !0}
        onToggle={alternarPlegable}
        right={(modalidades.find((mod) => mod.id === modalidad) || modalidades[0]).name}
      >
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Activa o desactiva modalidades cuando quieras. Con varias activas elegís cuál usar cada
          día en la Rutina. Hoy:{" "}
          <b style={{ color: "#4f9dff" }}>
            {(modalidades.find((mod) => mod.id === modalidad) || modalidades[0]).name}
          </b>
          .
        </div>
        {modalidades.map((mod) => {
          let activa = modalidadesDe(profile).includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => alternarModalidad(mod.id)}
              className="w-full text-left px-3 py-2 mb-2"
              style={{
                background: activa ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                border: activa ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  style={{
                    width: 16,
                    height: 16,
                    display: "inline-block",
                    flexShrink: 0,
                    border: "1px solid " + (activa ? "#4f9dff" : "rgba(255,255,255,0.3)"),
                    background: activa ? "#4f9dff" : "transparent",
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
          onClick={() => ponerModalidades(modalidades.map((mod) => mod.id))}
          className="w-full py-2 text-xs"
          style={{
            background: "rgba(255,184,79,0.1)",
            border: "1px solid #ffb84f",
            color: "#ffb84f",
            fontWeight: 600,
          }}
        >
          SELECCIONAR TODOS (Atleta Híbrido)
        </button>
        {modalidadesDe(profile).length > 1 && (
          <div className="mt-3">
            <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
              Cómo se llaman tus rangos. Es solo el nombre: no cambia tu progreso ni tus
              repeticiones.
            </div>
            <div className="grid grid-cols-3 gap-1">
              {modalidadesDe(profile).map(function (mod) {
                var elegido = sdcJuego(profile) === mod,
                  datos =
                    modalidades.find(function (otra) {
                      return otra.id === mod;
                    }) || modalidades[0];
                return (
                  <button
                    key={mod}
                    onClick={function () {
                      sdcPonerJuego(mod);
                    }}
                    className="py-2 text-xs"
                    style={{
                      minHeight: 44,
                      background: elegido ? "rgba(79,157,255,0.14)" : "rgba(255,255,255,0.03)",
                      border: elegido ? "1px solid #4f9dff" : "1px solid rgba(255,255,255,0.1)",
                      color: elegido ? "#e8ecf7" : "#9aa4bd",
                    }}
                  >
                    <div style={{ fontFamily: "Chakra Petch, sans-serif", fontWeight: 700 }}>
                      {(sdcTitulos[mod] || {})[progress.rank] || ""}
                    </div>
                    <div style={{ fontSize: 14, color: "#8a93ad" }}>{datos.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Plegable>
      <Plegable
        id="numeros"
        title="Tus números"
        accent="#b084f5"
        style={{ marginBottom: 16 }}
        collapsed={ui && ui.collapsed && ui.collapsed.numeros !== void 0 ? plegado("numeros") : !0}
        onToggle={alternarPlegable}
        right={
          (
            lifetimeReps.squat +
            lifetimeReps.pushup +
            lifetimeReps.back +
            lifetimeReps.abs
          ).toLocaleString("es") + " reps"
        }
      >
        {(() => {
          let cuenta = sdcAnimoCuenta(player);
          if (!cuenta.no && !cuenta.ambas) return null;
          let fila = (etiqueta, valor) => (
            <div className="flex justify-between text-sm mb-1">
              <span style={{ color: "#9aa4bd" }}>{etiqueta}</span>
              <span style={{ color: "#e8ecf7" }}>{valor}</span>
            </div>
          );
          return (
            <div
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: 12,
                marginBottom: 12,
              }}
            >
              <div
                className="text-xs uppercase mb-2"
                style={{ letterSpacing: 2, color: "#8a93ad" }}
              >
                CÓMO LLEGÁS Y CÓMO TE VAS
              </div>
              {fila("Días que no querías", cuenta.no)}
              {fila("Entrenaste igual", cuenta.vino)}
              {fila("Terminaste mejor de lo que llegaste", cuenta.mejor + " de " + cuenta.ambas)}
            </div>
          );
        })()}
        <div className="text-xs uppercase mb-2" style={{ letterSpacing: 2, color: "#8a93ad" }}>
          ATRIBUTOS
        </div>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          No se compran: suben solos con lo que entrenás.
        </div>
        {listaAtributos.map((atributo) => {
          let valor = valorAtributo(player, atributo),
            progreso = progresoAtributo(valor);
          return (
            <div key={atributo.key} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: atributo.color, fontWeight: 600 }}>{atributo.name}</span>
                <span style={{ color: "#e8ecf7" }}>Nv. {nivelAtributo(valor)}</span>
              </div>
              <BarraXp value={progreso.cur} max={progreso.need} color={atributo.color} />
            </div>
          );
        })}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 12,
            marginTop: 4,
          }}
        >
          <div className="text-xs uppercase mb-2" style={{ letterSpacing: 2, color: "#8a93ad" }}>
            REPETICIONES DE POR VIDA
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Sentadillas</span>
              <span style={{ color: "#e8ecf7" }}>{lifetimeReps.squat.toLocaleString("es")}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Flexiones</span>
              <span style={{ color: "#e8ecf7" }}>{lifetimeReps.pushup.toLocaleString("es")}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Espalda</span>
              <span style={{ color: "#e8ecf7" }}>{lifetimeReps.back.toLocaleString("es")}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Abdominales</span>
              <span style={{ color: "#e8ecf7" }}>{lifetimeReps.abs.toLocaleString("es")}</span>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 12,
            marginTop: 12,
          }}
        >
          <div className="text-xs uppercase mb-2" style={{ letterSpacing: 2, color: "#8a93ad" }}>
            HAZAÑAS
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Travesías completadas</span>
              <span style={{ color: "#e8ecf7" }}>{dungeonsCleared}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Terrenos recuperados</span>
              <span style={{ color: "#e8ecf7" }}>{combat.villainsDefeated}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Movimientos de Instinto Primal</span>
              <span style={{ color: "#e8ecf7" }}>
                {primal.unlockedCount}/{movimientosPrimal.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Distancia recorrida</span>
              <span style={{ color: "#e8ecf7" }}>{kmTotales.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Logros</span>
              <span style={{ color: "#e8ecf7" }}>
                {achievements.length}/{logros.length}
              </span>
            </div>
            {(player.lifetimeVolumeKg || 0) > 0 ? (
              <div className="flex justify-between">
                <span style={{ color: "#9aa4bd" }}>Kilos movidos en el gimnasio</span>
                <span style={{ color: "#e8ecf7" }}>
                  {(player.lifetimeVolumeKg || 0).toLocaleString("es")} kg
                </span>
              </div>
            ) : null}
          </div>
          {modalidadesDe(profile).includes("gym") || profile.bodyWeight > 0 ? (
            <div className="mt-3">
              <div className="flex items-center justify-between gap-2 text-sm">
                <label htmlFor="sdcPesoCorporal" style={{ color: "#9aa4bd" }}>
                  Tu peso corporal
                </label>
                <input
                  id="sdcPesoCorporal"
                  type="text"
                  inputMode="decimal"
                  defaultValue={profile.bodyWeight > 0 ? sdcKgTxt(profile.bodyWeight) : ""}
                  onBlur={(evento) => ponerPesoCorporal(evento.target.value)}
                  onKeyDown={(evento) => evento.key === "Enter" && evento.target.blur()}
                  placeholder="kg"
                  className="px-1 py-2 text-center text-xs"
                  style={{
                    width: 80,
                    minHeight: 44,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e8ecf7",
                  }}
                />
              </div>
              <div className="text-xs mt-1" style={{ color: "#8a93ad" }}>
                En kilos. Lo usan los logros Tu Propio Peso, Uno y Medio y Doble Cuerpo.
              </div>
            </div>
          ) : null}
        </div>
      </Plegable>
      <Plegable
        id="aptitud"
        title="Prueba de aptitud"
        accent="#ffb84f"
        style={{ marginBottom: 16 }}
        collapsed={ui && ui.collapsed && ui.collapsed.aptitud !== void 0 ? plegado("aptitud") : !0}
        onToggle={alternarPlegable}
        right={sdcCalibre(profile) || profile.classification}
      >
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Clasificación actual: {profile.classification}. Repetirla no cambia tu rango ni tu
          progreso, solo ajusta el volumen de tu rutina y tu calibre.
        </div>
        {(() => {
          let puntaje = sdcPuntaje(profile),
            factor = sdcRitmoF(profile),
            banda = sdcBandaIx(puntaje, factor),
            siguiente = banda < bandasCalibre.length - 1 ? bandasCalibre[banda + 1] : null;
          return (
            <div className="mb-3">
              <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
                Tu puntaje: <b style={{ color: "#ffb84f", fontSize: 14 }}>{puntaje} pts</b>
                <div style={{ color: "#8a93ad", marginTop: 2 }}>
                  sentadillas + 2×flexiones + 2×remo + abdominales
                </div>
                {sdcCalibre(profile) ? (
                  <div style={{ color: "#8a93ad", marginTop: 2 }}>
                    Enfoque: {sdcCalF(banda, profile)}
                  </div>
                ) : null}
              </div>
              {bandasCalibre.map((datosBanda, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 px-2 py-1 mb-1"
                  style={{
                    background: i === banda ? "rgba(255,184,79,0.12)" : "transparent",
                    border: "1px solid " + (i === banda ? "#ffb84f" : "rgba(255,255,255,0.06)"),
                  }}
                >
                  <span
                    className="text-xs"
                    style={{
                      color: i === banda ? "#ffe2b0" : i < banda ? "#8a93ad" : "#8a93ad",
                      fontWeight: i === banda ? 700 : 400,
                    }}
                  >
                    {i < banda ? "✓ " : i === banda ? "● " : ""}
                    {sdcCalT(i, profile)}
                  </span>
                  <span className="text-xs" style={{ color: "#8a93ad", whiteSpace: "nowrap" }}>
                    {i === bandasCalibre.length - 1
                      ? sdcBandaMin(i, factor) + "+"
                      : sdcBandaMin(i, factor) + "–" + (sdcBandaMin(i + 1, factor) - 1)}
                  </span>
                </div>
              ))}
              {siguiente ? (
                <div className="text-xs mt-2" style={{ color: "#3ecf8e" }}>
                  Te faltan {sdcBandaMin(banda + 1, factor) - puntaje} pts para{" "}
                  {sdcCalT(banda + 1, profile)}.
                </div>
              ) : (
                <div className="text-xs mt-2" style={{ color: "#ffb84f" }}>
                  Estás en el calibre más alto.
                </div>
              )}
            </div>
          );
        })()}
        {repruebaAbierta ? (
          repruebaPaso < repruebaEjercicios.length ? (
            <>
              <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
                Punto de Partida ({repruebaPaso + 1}/{repruebaEjercicios.length}) · sigue la
                cadencia del metrónomo.
              </div>
              <PruebaAptitud
                key={"re-" + repruebaEjercicios[repruebaPaso].key}
                exercise={repruebaEjercicios[repruebaPaso]}
                onFinish={(reps) => {
                  let clave = repruebaEjercicios[repruebaPaso].key;
                  (clave === "sq" && setRepSentadillas(String(reps)),
                    clave === "pu" && setRepFlexiones(String(reps)),
                    clave === "ab" && setRepAbdominales(String(reps)),
                    clave === "bk" && sdcSetRbk(String(reps)),
                    setRepruebaPaso((previo) => previo + 1));
                }}
              />
              <button
                onClick={() => setRepruebaAbierta(!1)}
                className="w-full py-2 text-xs mt-2"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#e8ecf7",
                  fontWeight: 600,
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-between text-sm mb-1" style={{ color: "#9aa4bd" }}>
                <span>Sentadillas</span>
                <span style={{ color: "#e8ecf7" }}>{repSentadillas || 0}</span>
              </div>
              <div className="flex justify-between text-sm mb-1" style={{ color: "#9aa4bd" }}>
                <span>Flexiones (×2)</span>
                <span style={{ color: "#e8ecf7" }}>{repFlexiones || 0}</span>
              </div>
              <div className="flex justify-between text-sm mb-1" style={{ color: "#9aa4bd" }}>
                <span>Remo invertido (×2)</span>
                <span style={{ color: "#e8ecf7" }}>{sdcRbk || 0}</span>
              </div>
              <div className="flex justify-between text-sm mb-2" style={{ color: "#9aa4bd" }}>
                <span>Abdominales</span>
                <span style={{ color: "#e8ecf7" }}>{repAbdominales || 0}</span>
              </div>
              <div
                className="flex justify-between text-sm mb-3"
                style={{ color: "#ffb84f", fontWeight: 700 }}
              >
                <span>Puntaje</span>
                <span>
                  {puntajePrueba(
                    parseInt(repSentadillas || "0", 10),
                    parseInt(repFlexiones || "0", 10),
                    parseInt(repAbdominales || "0", 10),
                    parseInt(sdcRbk || "0", 10),
                  )}{" "}
                  pts
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setRepruebaPaso(0)}
                  className="flex-1 py-2 text-xs"
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
                  onClick={guardarReprueba}
                  className="flex-1 py-2 text-xs"
                  style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
                >
                  Guardar
                </button>
              </div>
            </>
          )
        ) : (
          <button
            onClick={() => {
              (setRepruebaPaso(0),
                setRepSentadillas(""),
                setRepFlexiones(""),
                setRepAbdominales(""),
                setRepruebaAbierta(!0));
            }}
            className="w-full py-3 text-sm"
            style={{
              background: "rgba(255,184,79,0.1)",
              border: "1px solid #ffb84f",
              color: "#ffb84f",
            }}
          >
            Repetir Punto de Partida
          </button>
        )}
      </Plegable>
      <Plegable
        id="primeras"
        title="Primeras veces"
        accent="#b084f5"
        style={{ marginBottom: 16 }}
        collapsed={
          ui && ui.collapsed && ui.collapsed.primeras !== void 0 ? plegado("primeras") : !0
        }
        onToggle={alternarPlegable}
        right={String(sdcPrimeras(player).length)}
      >
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          El día que hacés algo que antes no podías, queda acá. No se borra nunca.
        </div>
        <AnotarPrimera onAnotar={sdcPrimeraManual} />
        {sdcPrimeras(player).length === 0 ? (
          <div className="text-xs" style={{ color: "#8a93ad" }}>
            Todavía no hay ninguna. Van a aparecer solas.
          </div>
        ) : (
          sdcPrimeras(player).map(function (primera, i) {
            return (
              <div
                key={i}
                className="py-2 px-2 mb-1"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-xs" style={{ color: "#e8ecf7" }}>
                  {primera.texto}
                </div>
                <div className="text-xs" style={{ color: "#8a93ad" }}>
                  {primera.fecha +
                    (primera.origen === "escrita" ? " · lo anotaste vos" : " · primera vez")}
                </div>
              </div>
            );
          })
        )}
      </Plegable>
      <Plegable
        id="respaldo"
        title="Respaldo de tu progreso"
        accent="#4f9dff"
        style={{ marginBottom: 16 }}
        collapsed={
          ui && ui.collapsed && ui.collapsed.respaldo !== void 0 ? plegado("respaldo") : !0
        }
        onToggle={alternarPlegable}
      >
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Tu progreso ya se guarda solo en este dispositivo. Usá esto para tener una copia de
          seguridad o pasar tu progreso a otro dispositivo.
        </div>
        <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
          Exportar — copia este texto y guárdalo en un lugar seguro:
        </div>
        <textarea
          readOnly={!0}
          value={JSON.stringify(player)}
          onClick={(evento) => evento.target.select()}
          rows={3}
          className="w-full mb-2 px-2 py-2 text-xs"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#9aa4bd",
            resize: "none",
          }}
        />
        <button
          onClick={copiarRespaldo}
          className="w-full py-2 text-xs mb-2"
          style={{
            background: "rgba(79,157,255,0.1)",
            border: "1px solid #4f9dff",
            color: "#4f9dff",
          }}
        >
          Copiar respaldo
        </button>
        <button
          onClick={bkDescargar}
          className="w-full py-2 text-xs mb-4"
          style={{ background: "#4f9dff", color: "#0a0e1a", fontWeight: 700 }}
        >
          Descargar archivo
        </button>
        <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
          Restaurar desde un respaldo:
        </div>
        <textarea
          value={respaldoTexto}
          onChange={(evento) => setRespaldoTexto(evento.target.value)}
          placeholder="Pega aquí tu texto de respaldo"
          rows={3}
          className="w-full mb-2 px-2 py-2 text-xs"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#e8ecf7",
            resize: "none",
          }}
        />
        <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
          o carga el archivo que descargaste:
        </div>
        <input
          type="file"
          accept="application/json,.json"
          onChange={bkCargar}
          className="w-full mb-2 text-xs"
          style={{ color: "#9aa4bd" }}
        />
        {confirmarRestaurar ? (
          <div className="text-xs text-center" style={{ color: "#9aa4bd" }}>
            ¿Seguro? Esto reemplaza tu progreso actual.{" "}
            <button onClick={restaurarRespaldo} className="underline" style={{ color: "#ff5c7a" }}>
              Sí, restaurar
            </button>{" "}
            <button onClick={() => setConfirmarRestaurar(!1)} className="underline">
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmarRestaurar(!0)}
            disabled={!respaldoTexto.trim()}
            className="w-full py-2 text-xs disabled:opacity-40"
            style={{
              background: "rgba(255,92,122,0.1)",
              border: "1px solid #ff5c7a",
              color: "#ff5c7a",
            }}
          >
            Restaurar
          </button>
        )}
      </Plegable>
    </>
  );
}
