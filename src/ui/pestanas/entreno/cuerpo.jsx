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
          ? `Nv. medio ${Math.round(grupos.reduce((f, d) => f + atributos.levels[d], 0) / 4)}`
          : modoMapa === "semana"
            ? `${Math.round((grupos.reduce((f, d) => f + Math.min(1, ((week.reps && week.reps[d]) || 0) / metaSemanaGrupo(d)), 0) / 4) * 100)}% semana`
            : "hoy"
      }
    >
      <div className="grid grid-cols-3 gap-1 mb-2">
        {[
          ["desarrollo", "Desarrollo"],
          ["semana", "Semana"],
          ["hoy", "Hoy"],
        ].map(([f, d]) => (
          <button
            key={f}
            onClick={() => setModoMapa(f)}
            className="py-2 text-xs"
            style={{
              background: modoMapa === f ? "#ff6b4a" : "rgba(255,255,255,0.03)",
              border: "1px solid " + (modoMapa === f ? "#ff6b4a" : "rgba(255,255,255,0.12)"),
              color: modoMapa === f ? "#0a0e1a" : "#8a93ad",
              fontWeight: 600,
            }}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="text-xs mb-2" style={{ color: "#7a83a0" }}>
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
              color: vistaCuerpo === "front" ? "#e8ecf7" : "#5a6178",
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
              color: vistaCuerpo === "back" ? "#e8ecf7" : "#5a6178",
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
        {grupos.map((f) => (
          <button
            key={f}
            onClick={() => setZonaElegida(zonaElegida === f ? null : f)}
            className="flex items-center justify-between text-xs py-1"
            style={{ background: "transparent", border: "none" }}
          >
            <span className="flex items-center gap-2" style={{ color: "#9aa4bd" }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  background: coloresMapa[f],
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {gruposCuerpo[f].label.split(" ")[0]}
            </span>
            <span style={{ color: "#e8ecf7" }}>
              {modoMapa === "desarrollo"
                ? "Nv. " + atributos.levels[f]
                : modoMapa === "semana"
                  ? (week.reps && week.reps[f]) || 0
                  : (repsHoy[f] || 0) + "/" + (sdcMt[f] || 0)}
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
        let f = grupos
          .map((d) => ({ k: d, d: diasEntre(lastTrained ? lastTrained[d] : null, today.date) }))
          .filter((d) => d.d === null || d.d >= 4);
        return !f.length || atributos.gap >= 2 ? null : (
          <div
            className="text-xs mt-3 p-2"
            style={{
              color: "#9aa4bd",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Sin estímulo reciente: {f.map((d) => gruposCuerpo[d.k].label.toLowerCase()).join(", ")}.
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
