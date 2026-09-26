// Constancia: la meta semanal, la racha y la grilla de dias, con el detalle de cada dia.
import { diasRestantesSemana, fechaHoy } from "../../../logica/rutina.js";
import { sdcAnimo } from "../../../datos/logros.js";
import { sistemaActivo } from "../../../logica/sistemas.js";
import { sdcDiaPasado } from "../../../logica/extras.js";
import {
  coloresEstado,
  GrillaConstancia,
  DetalleDia,
  LeyendaConstancia,
} from "../../constancia.jsx";
import { misProgreso, misTexto } from "../../../logica/partida.js";
import { Plegable } from "../../tarjetas.jsx";
import { IconoLlama } from "../../iconos.jsx";
import { BarraXp } from "../../base.jsx";

export function TarjetaConstancia({
  alternarPlegable,
  aplicar,
  cambiandoMeta,
  diaElegido,
  diasGrilla,
  metaSemana,
  player,
  plegado,
  ponerMetaSemanal,
  sesionesSemana,
  setCambiandoMeta,
  setDiaElegido,
  streak,
  today,
  ui,
}) {
  return (
    <Plegable
      id="racha"
      pista="constancia"
      title="Constancia"
      accent="#3ecf8e"
      style={{ marginBottom: 16 }}
      collapsed={ui && ui.collapsed && ui.collapsed.racha !== void 0 ? plegado("racha") : !0}
      onToggle={alternarPlegable}
      right={`${sesionesSemana}/${metaSemana} esta semana`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <IconoLlama size={18} color={sesionesSemana >= metaSemana ? "#ff5c7a" : "#8a93ad"} />
          <div>
            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
              {sesionesSemana} de {metaSemana} sesiones
            </div>
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              Racha semanal: {player.weeklyStreak || 0} · récord {player.bestWeeklyStreak || 0}
            </div>
          </div>
        </div>
        <button
          onClick={() => setCambiandoMeta((abierto) => !abierto)}
          className="text-xs underline"
          style={{ color: "#9aa4bd" }}
        >
          Cambiar meta
        </button>
      </div>
      <BarraXp value={Math.min(sesionesSemana, metaSemana)} max={metaSemana} color="#3ecf8e" />
      <div className="text-xs mt-2" style={{ color: "#9aa4bd" }}>
        {sesionesSemana >= metaSemana
          ? "Meta semanal cumplida. Todo lo que entrenes de más es ganancia."
          : `Te quedan ${diasRestantesSemana(today.date)} días para completar ${metaSemana - sesionesSemana} ${metaSemana - sesionesSemana === 1 ? "sesión" : "sesiones"}.`}
      </div>
      {cambiandoMeta && (
        <div
          className="mt-3 p-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
            ¿Cuántas sesiones querés hacer por semana? Solo se corta tu racha si ya no podés
            alcanzarla.
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((dias) => (
              <button
                key={dias}
                onClick={() => ponerMetaSemanal(dias)}
                className="py-2 text-xs"
                style={{
                  background: metaSemana === dias ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                  border:
                    "1px solid " + (metaSemana === dias ? "#3ecf8e" : "rgba(255,255,255,0.15)"),
                  color: metaSemana === dias ? "#0a0e1a" : "#9aa4bd",
                  fontWeight: 700,
                }}
              >
                {dias}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3">
        <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
          Racha diaria: {streak.current} día{streak.current === 1 ? "" : "s"} · récord {streak.best}
        </div>
        <GrillaConstancia
          days={diasGrilla}
          onPick={(fecha) => setDiaElegido((elegido) => (elegido === fecha ? null : fecha))}
          selected={diaElegido}
        />
        {diaElegido && (
          <DetalleDia
            date={diaElegido}
            status={(diasGrilla.find((dia) => dia.date === diaElegido) || {}).status}
            log={(player.dayLog || {})[diaElegido]}
            animo={sdcAnimo(player)[diaElegido]}
            onClose={() => setDiaElegido(null)}
            onLog={(function () {
              var estado = (diasGrilla.find((dia) => dia.date === diaElegido) || {}).status;
              return diaElegido < fechaHoy() &&
                (estado === "empty" || estado === "skipped" || estado === "missed")
                ? function (fecha) {
                    (aplicar((partida) => sdcDiaPasado(partida, fecha)), setDiaElegido(null));
                  }
                : null;
            })()}
          />
        )}
        {(() => {
          let sdcLeg = [
            { label: "Completo", color: coloresEstado.full, k: "full" },
            { label: "Parcial", color: coloresEstado.partial, k: "partial" },
            { label: "Descanso", color: coloresEstado.rest, k: "rest" },
            { label: "Sin entrenar", color: coloresEstado.skipped, k: "skipped" },
            { label: "Escudo", color: coloresEstado.shield, k: "shield" },
            { label: "Fuera de meta", color: coloresEstado.missed, k: "missed" },
            {
              label: "Hoy",
              color: coloresEstado.pending,
              k: "pending",
              borde: "1px dashed rgba(255,255,255,0.3)",
            },
            {
              label: "Sin registro",
              color: coloresEstado.empty,
              k: "empty",
              borde: "1px solid rgba(255,255,255,0.12)",
            },
          ].filter((sdcZ) => diasGrilla.some((sdcD) => sdcD.status === sdcZ.k));
          return sdcLeg.length ? <LeyendaConstancia items={sdcLeg} /> : null;
        })()}
      </div>
      {sistemaActivo(player, "missions") && player.missions && (
        <div className="mt-3">
          {["week", "month"].map((amb) => {
            let mision = amb === "week" ? player.missions.weekly : player.missions.monthly;
            if (!mision) return null;
            let hecho = amb === "week" ? player.missions.weeklyDone : player.missions.monthlyDone,
              progreso = Math.min(mision.target, misProgreso(player, mision, amb)),
              pct = Math.round((progreso / mision.target) * 100);
            return (
              <div
                key={amb}
                className="mb-2 p-2"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border:
                    "1px solid " + (hecho ? "rgba(62,207,142,0.35)" : "rgba(255,184,79,0.25)"),
                }}
              >
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: hecho ? "#3ecf8e" : "#ffb84f", fontWeight: 700 }}>
                    {amb === "week" ? "Misión semanal" : "Misión mensual"}
                  </span>
                  <span style={{ color: "#9aa4bd" }}>
                    {hecho ? "Completada" : progreso + " / " + mision.target}
                  </span>
                </div>
                <div className="text-xs mb-1" style={{ color: "#e8ecf7" }}>
                  {misTexto(mision, amb)}
                </div>
                <div style={{ height: 4, background: "#161b2e" }}>
                  <div
                    style={{
                      height: 4,
                      width: pct + "%",
                      background: hecho ? "#3ecf8e" : "#ffb84f",
                      transition: "width .3s",
                    }}
                  />
                </div>
                <div className="text-xs mt-1" style={{ color: "#8a93ad" }}>
                  {"Recompensa: +" + mision.xp + " XP y +" + mision.pd + " PD"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Plegable>
  );
}
