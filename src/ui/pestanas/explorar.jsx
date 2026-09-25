// Pestana Explorar: kilometros, tramos, caminata cronometrada y el mapa de nodos.
import { s2, sectores, i2, nodosExplorar, Ny } from "../../logica/explorar.js";
import { vd } from "../../datos/rangos.js";
import { fechaHoy } from "../../logica/rutina.js";
import { sdcRitmos, CronoCaminata } from "../caminata.jsx";
import { BarraXp, Tarjeta } from "../base.jsx";
import { IconoDestello, IconoUbicacion, IconoCandado, IconoPasos } from "../iconos.jsx";
import { Plegable } from "../tarjetas.jsx";

export function PestanaExplorar({
  alternarPlegable,
  consolidarKmHoy,
  descartarTramosHoy,
  exploration,
  kmTexto,
  kmTotales,
  nodoSiguiente,
  pasosTexto,
  player,
  plegado,
  rangoCaminante,
  sdcCamCancelar,
  sdcCamEmpezar,
  sdcCamListo,
  sdcCamRitmo,
  setKmTexto,
  setPasosTexto,
  setVerTodoMapa,
  sumarKm,
  sumarPasos,
  ui,
  verTodoMapa,
}) {
  let f = s2(kmTotales),
    d = sectores[f],
    m = i2(f),
    N = Math.max(0, Math.min(kmTotales - m, d.endKm - m)),
    _ = d.endKm - m,
    X = Math.round((N / _) * 100),
    de = nodosExplorar.filter((te) => te.sector === f);
  return (
    <>
      <Tarjeta accent="#7c5cff" style={{ marginBottom: 16 }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs uppercase" style={{ letterSpacing: 2, color: "#7c5cff" }}>
              Sector {f + 1}
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                color: "#e8ecf7",
                fontWeight: 700,
              }}
            >
              {d.name}
            </div>
          </div>
          <IconoPasos size={26} color="#7c5cff" />
        </div>
        <div className="text-xs mb-1 flex justify-between" style={{ color: "#9aa4bd" }}>
          <span>Progreso del sector</span>
          <span>
            {X}% · {N.toFixed(1)} / {_} km
          </span>
        </div>
        <BarraXp value={N} max={_} color="#7c5cff" />
        <div className="text-xs mt-3" style={{ color: "#9aa4bd" }}>
          {kmTotales.toFixed(1)} km totales · {rangoCaminante.name}
        </div>
        {nodoSiguiente && (
          <div className="text-xs mt-1" style={{ color: "#7a83a0" }}>
            Próximo nodo: {nodoSiguiente.name} a {nodoSiguiente.km} km (faltan{" "}
            {(nodoSiguiente.km - kmTotales).toFixed(1)})
          </div>
        )}
      </Tarjeta>
      <Tarjeta accent="#7c5cff" style={{ marginBottom: 16 }}>
        <div
          style={{
            fontFamily: "Chakra Petch, sans-serif",
            color: "#e8ecf7",
            fontWeight: 700,
          }}
          className="mb-2"
        >
          Expedición en curso
        </div>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Registrá tramos a lo largo del día. Los kilómetros se consolidan al concluir la
          expedición.
        </div>
        {(function () {
          var ws = (player.exploration && player.exploration.walkStart) || 0,
            kmh = (player.profile && player.profile.ritmoKmH) || 5;
          if (ws)
            return (
              <CronoCaminata
                inicio={ws}
                kmh={kmh}
                onCancel={sdcCamCancelar}
                onListo={sdcCamListo}
              />
            );
          return (
            <div
              className="mb-3 p-2"
              style={{
                background: "rgba(124,92,255,0.06)",
                border: "1px solid rgba(124,92,255,0.25)",
              }}
            >
              <div className="text-xs mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                Salir a caminar
              </div>
              <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
                La app cuenta el tiempo y estima los kilómetros a tu ritmo. Al terminar los podés
                corregir.
              </div>
              <div className="grid grid-cols-2 gap-1 mb-2">
                {sdcRitmos.map(function (jr) {
                  var sel = Math.abs(kmh - jr.v) < 0.01;
                  return (
                    <button
                      key={jr.t}
                      onClick={function () {
                        sdcCamRitmo(jr.v);
                      }}
                      className="py-2 text-xs"
                      style={{
                        minHeight: 44,
                        background: sel ? "rgba(124,92,255,0.2)" : "rgba(255,255,255,0.03)",
                        border: sel ? "1px solid #7c5cff" : "1px solid rgba(255,255,255,0.12)",
                        color: sel ? "#e8ecf7" : "#9aa4bd",
                      }}
                    >
                      {jr.t}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={sdcCamEmpezar}
                className="w-full py-2 text-xs"
                style={{
                  minHeight: 44,
                  background: "#7c5cff",
                  color: "#0a0e1a",
                  fontWeight: 700,
                }}
              >
                Empezar la salida
              </button>
            </div>
          );
        })()}
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            inputMode="decimal"
            value={kmTexto}
            onChange={(te) => setKmTexto(te.target.value.replace(/[^0-9.,]/g, ""))}
            placeholder="Km del tramo"
            className="px-3 py-2 text-sm"
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#e8ecf7",
            }}
          />
          <button
            onClick={sumarKm}
            className="px-3 py-2 text-sm"
            style={{
              background: "rgba(124,92,255,0.15)",
              border: "1px solid #7c5cff",
              color: "#b9a5ff",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            + Tramo
          </button>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            inputMode="numeric"
            value={pasosTexto}
            onChange={(te) => setPasosTexto(te.target.value.replace(/[^0-9]/g, ""))}
            placeholder="o pasos dados"
            className="px-3 py-2 text-sm"
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#e8ecf7",
            }}
          />
          <button
            onClick={sumarPasos}
            className="px-3 py-2 text-sm"
            style={{
              background: "rgba(124,92,255,0.15)",
              border: "1px solid #7c5cff",
              color: "#b9a5ff",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            + Pasos
          </button>
        </div>
        {pasosTexto && parseInt(pasosTexto, 10) > 0 && (
          <div className="text-xs mb-2" style={{ color: "#7a83a0" }}>
            {parseInt(pasosTexto, 10).toLocaleString("es")} pasos ≈{" "}
            {((parseInt(pasosTexto, 10) * vd) / 1e3).toFixed(2)} km
          </div>
        )}
        <div
          className="text-center py-2 mb-2"
          style={{
            background: "rgba(124,92,255,0.06)",
            border: "1px solid rgba(124,92,255,0.25)",
          }}
        >
          <div className="text-xs" style={{ color: "#9aa4bd" }}>
            Tramos sin consolidar
          </div>
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 28,
              color: "#b9a5ff",
            }}
          >
            {(exploration.pendingKm || 0).toFixed(1)} km
          </div>
        </div>
        <button
          onClick={consolidarKmHoy}
          disabled={!(exploration.pendingKm > 0)}
          className="w-full py-3 text-sm disabled:opacity-40"
          style={{ background: "#7c5cff", color: "#0a0e1a", fontWeight: 700 }}
        >
          Concluir Expedición
        </button>
        {exploration.pendingKm > 0 && (
          <button
            onClick={descartarTramosHoy}
            className="w-full py-2 text-xs mt-2"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#e8ecf7",
              fontWeight: 600,
            }}
          >
            Descartar tramos
          </button>
        )}
        <div className="text-xs mt-2 text-center" style={{ color: "#7a83a0" }}>
          Hoy llevás {(exploration.today.date === fechaHoy() ? exploration.today.km : 0).toFixed(1)}{" "}
          km consolidados
        </div>
      </Tarjeta>
      <Plegable
        id="mapaSector"
        title="Mapa del sector"
        accent="#5a6178"
        style={{ marginBottom: 16 }}
        collapsed={plegado("mapaSector")}
        onToggle={alternarPlegable}
        right={verTodoMapa ? "todo" : "sector"}
      >
        <div className="flex items-center justify-end mb-3">
          <div className="flex gap-1">
            <button
              onClick={() => setVerTodoMapa((te) => !te)}
              className="px-2 py-1 text-xs"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#9aa4bd",
              }}
            >
              {verTodoMapa ? "Ver sector" : "Ver todo"}
            </button>
          </div>
        </div>
        {(verTodoMapa ? nodosExplorar : de).map((te) => {
          let wl = nodosExplorar.indexOf(te) <= exploration.unlockedIndex,
            Ig = Math.max(0, te.km - kmTotales);
          return (
            <div
              key={te.name}
              className="flex items-start gap-2 py-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {wl ? (
                <IconoUbicacion size={16} color="#7c5cff" />
              ) : (
                <IconoCandado size={16} color="#7a83a0" />
              )}
              <div>
                <div
                  className="text-sm"
                  style={{
                    color: wl ? "#e8ecf7" : "#5a6178",
                    fontWeight: wl ? 600 : 400,
                  }}
                >
                  {te.name}{" "}
                  <span className="text-xs" style={{ color: "#7a83a0" }}>
                    · {te.km} km
                  </span>
                </div>
                {wl ? (
                  <div className="text-xs" style={{ color: "#9aa4bd" }}>
                    {te.text}
                  </div>
                ) : (
                  <div className="text-xs" style={{ color: "#7a83a0" }}>
                    Bloqueado — faltan {Ig.toFixed(1)} km
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Plegable>
      <Plegable
        id="codice"
        title="Códice"
        accent="#ffb84f"
        style={{ marginBottom: 16 }}
        collapsed={ui && ui.collapsed && ui.collapsed.codice !== void 0 ? plegado("codice") : !0}
        onToggle={alternarPlegable}
        right={`${(exploration.relics || []).length} / ${nodosExplorar.length} · +${Math.round((exploration.relics || []).length * Ny * 100)}% XP`}
      >
        {(exploration.relics || []).length === 0 ? (
          <div className="text-xs" style={{ color: "#7a83a0" }}>
            Aún no hallaste ninguna reliquia. Caminá y concluí expediciones para llenar el Códice.
          </div>
        ) : (
          nodosExplorar
            .filter((te) => (exploration.relics || []).includes(te.relic))
            .map((te) => (
              <div
                key={te.relic}
                className="py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <IconoDestello size={14} color="#ffb84f" />
                  <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                    {te.relic}
                  </div>
                </div>
                <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                  {te.lore}
                </div>
                <div className="text-xs mt-1" style={{ color: "#7a83a0" }}>
                  Hallada en {te.name} · {te.km} km
                </div>
              </div>
            ))
        )}
      </Plegable>
    </>
  );
}
