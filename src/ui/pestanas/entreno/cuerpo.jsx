// Tu cuerpo: la figura coloreada por avance (desarrollo, hoy o semana) y el panel de cada zona.
import { gruposCuerpo, diasEntre, FiguraCuerpo, PanelZonas } from "../../cuerpo.jsx";
import { IconoDestello } from "../../iconos.jsx";
import { Plegable } from "../../tarjetas.jsx";

export function TarjetaCuerpo({
  alternarPlegable,
  atributos,
  coloresMapa,
  grupos,
  lastTrained,
  lifetimeReps,
  metaSemana,
  metaSemanaGrupo,
  modalidad,
  modoMapa,
  plegado,
  profile,
  rangoDeHoy,
  ratiosHoy,
  repsHoy,
  sdcMt,
  setModoMapa,
  setVistaCuerpo,
  setZonaElegida,
  today,
  ui,
  vistaCuerpo,
  week,
  zonaElegida,
}) {
  return (
    <Plegable
      id="mapa"
      title="Tu cuerpo"
      accent="#5a6178"
      style={{ marginBottom: 16, order: today.completed ? -4 : -2 }}
      collapsed={ui && ui.collapsed && ui.collapsed.mapa !== void 0 ? plegado("mapa") : !1}
      onToggle={alternarPlegable}
      right={
        modoMapa === "desarrollo"
          ? `Nv. medio ${Math.round(grupos.reduce((suma, grupo) => suma + atributos.levels[grupo], 0) / 4)}`
          : modoMapa === "semana"
            ? `${Math.round((grupos.reduce((suma, grupo) => suma + Math.min(1, ((week.reps && week.reps[grupo]) || 0) / metaSemanaGrupo(grupo)), 0) / 4) * 100)}% semana`
            : "hoy"
      }
    >
      <div className="grid grid-cols-3 gap-1 mb-2">
        {[
          ["desarrollo", "Desarrollo"],
          ["semana", "Semana"],
          ["hoy", "Hoy"],
        ].map(([modo, etiqueta]) => (
          <button
            key={modo}
            onClick={() => setModoMapa(modo)}
            className="py-2 text-xs"
            style={{
              background: modoMapa === modo ? "#ff6b4a" : "rgba(255,255,255,0.03)",
              border: "1px solid " + (modoMapa === modo ? "#ff6b4a" : "rgba(255,255,255,0.12)"),
              color: modoMapa === modo ? "#0a0e1a" : "#8a93ad",
              fontWeight: 600,
            }}
          >
            {etiqueta}
          </button>
        ))}
      </div>
      <div className="text-xs mb-2" style={{ color: "#8a93ad" }}>
        {modoMapa === "desarrollo"
          ? "Cuánto construiste en cada patrón desde que empezaste. No se reinicia nunca."
          : modoMapa === "semana"
            ? "Qué trabajaste esta semana frente a tu meta de " + metaSemana + " sesiones."
            : "Progreso de la rutina de hoy."}
      </div>
      <div className="flex items-center justify-end mb-2">
        <div className="flex gap-1">
          <button
            onClick={() => setVistaCuerpo("front")}
            className="px-2 py-1 text-xs"
            style={{
              background: vistaCuerpo === "front" ? "rgba(255,255,255,0.1)" : "transparent",
              color: vistaCuerpo === "front" ? "#e8ecf7" : "#8a93ad",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            Frente
          </button>
          <button
            onClick={() => setVistaCuerpo("back")}
            className="px-2 py-1 text-xs"
            style={{
              background: vistaCuerpo === "back" ? "rgba(255,255,255,0.1)" : "transparent",
              color: vistaCuerpo === "back" ? "#e8ecf7" : "#8a93ad",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            Espalda
          </button>
        </div>
      </div>
      <FiguraCuerpo
        view={vistaCuerpo}
        colors={coloresMapa}
        glow={today.stretchDone}
        ratios={modoMapa === "hoy" ? ratiosHoy : null}
        selected={zonaElegida}
        onSelect={setZonaElegida}
      />
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3">
        {grupos.map((grupo) => (
          <button
            key={grupo}
            onClick={() => setZonaElegida(zonaElegida === grupo ? null : grupo)}
            className="flex items-center justify-between text-xs py-1"
            style={{ background: "transparent", border: "none" }}
          >
            <span className="flex items-center gap-2" style={{ color: "#9aa4bd" }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: coloresMapa[grupo],
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {gruposCuerpo[grupo].label.split(" ")[0]}
            </span>
            <span style={{ color: "#e8ecf7" }}>
              {modoMapa === "desarrollo"
                ? "Nv. " + atributos.levels[grupo]
                : modoMapa === "semana"
                  ? (week.reps && week.reps[grupo]) || 0
                  : (repsHoy[grupo] || 0) + "/" + (sdcMt[grupo] || 0)}
            </span>
          </button>
        ))}
      </div>
      {atributos.gap >= 2 && (
        <div
          className="text-xs mt-3 p-2"
          style={{
            color: "#ffb84f",
            background: "rgba(255,184,79,0.08)",
            border: "1px solid rgba(255,184,79,0.25)",
          }}
        >
          Desequilibrio detectado: tu {gruposCuerpo[atributos.hi].label.toLowerCase()} va{" "}
          {atributos.gap} niveles por delante de tu {gruposCuerpo[atributos.lo].label.toLowerCase()}
          . Prioriza ese patrón para emparejarlo.
        </div>
      )}
      {(() => {
        let olvidados = grupos
          .map((grupo) => ({
            k: grupo,
            d: diasEntre(lastTrained ? lastTrained[grupo] : null, today.date),
          }))
          .filter((item) => item.d === null || item.d >= 4);
        return !olvidados.length || atributos.gap >= 2 ? null : (
          <div
            className="text-xs mt-3 p-2"
            style={{
              color: "#9aa4bd",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Sin estímulo reciente:{" "}
            {olvidados.map((item) => gruposCuerpo[item.k].label.toLowerCase()).join(", ")}.
          </div>
        );
      })()}
      {zonaElegida && (
        <PanelZonas
          zoneKey={zonaElegida}
          rank={rangoDeHoy}
          classification={profile.classification}
          lifetime={lifetimeReps[zonaElegida] || 0}
          target={sdcMt[zonaElegida] || 0}
          doneToday={repsHoy[zonaElegida] || 0}
          lastTrained={lastTrained ? lastTrained[zonaElegida] : null}
          today={today.date}
          modality={modalidad}
          onClose={() => setZonaElegida(null)}
        />
      )}
      {today.stretchDone && (
        <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "#3ecf8e" }}>
          <IconoDestello size={12} /> Brillo de recuperación activo por tu estiramiento de hoy
        </div>
      )}
    </Plegable>
  );
}
