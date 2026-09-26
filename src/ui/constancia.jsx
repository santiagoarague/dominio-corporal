// Calendario de Constancia.
import { useState } from "react";
import { IconoCerrar } from "./iconos.jsx";
import { fechaLocal } from "../logica/rutina.js";
import { sdcAnimoFrase } from "./animo.jsx";

function LeyendaConstancia({ items }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-xs"
          style={{ color: "#9aa4bd" }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              background: item.color,
              border: item.borde || "none",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
}
var coloresEstado = {
  full: "#3ecf8e",
  partial: "#ffb84f",
  rest: "#4f9dff",
  shield: "#7c5cff",
  skipped: "#46506b",
  missed: "#ff5c7a",
  pending: "#2a3148",
  empty: "#161b2e",
};
function diasConstancia(historial, hoy, estadoHoy, cantidad) {
  let dias = [],
    base = new Date(hoy + "T00:00:00");
  for (let atras = cantidad - 1; atras >= 0; atras--) {
    let fecha = new Date(base);
    fecha.setDate(fecha.getDate() - atras);
    let clave = fechaLocal(fecha),
      estado = (historial || {})[clave];
    (!estado && clave === hoy && (estado = estadoHoy),
      dias.push({ date: clave, status: estado || "empty" }));
  }
  let desde = 0;
  while (desde < dias.length - 1 && dias[desde].status === "empty") desde++;
  return dias.slice(desde);
}
function GrillaConstancia({ days, onPick, selected }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
      {days.map((dia) => (
        <button
          key={dia.date}
          onClick={() => onPick && onPick(dia.date)}
          data-pista="constancia"
          title={dia.date}
          style={{
            height: 40,
            minWidth: 0,
            padding: 0,
            background: coloresEstado[dia.status] || coloresEstado.empty,
            border:
              selected === dia.date
                ? "2px solid #ffffff"
                : dia.status === "pending"
                  ? "1px dashed rgba(255,255,255,0.3)"
                  : "1px solid rgba(255,255,255,0.06)",
          }}
        />
      ))}
    </div>
  );
}
var nombresEstado = {
  full: "Rutina completa",
  partial: "Sesión parcial",
  rest: "Día de descanso",
  shield: "Protegido por escudo",
  skipped: "Sin entrenar (dentro de meta)",
  missed: "Fuera de meta",
  pending: "Hoy, aún pendiente",
  empty: "Sin registro",
};
function DetalleDia({ date, status, log, onClose, onLog, animo }) {
  let [confirmando, setConfirmando] = useState(!1);
  return (
    <div
      className="mt-3 p-3"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <div style={{ fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 }}>
          {date}
        </div>
        <button onClick={onClose} aria-label="Cerrar">
          <IconoCerrar size={14} color="#9aa4bd" />
        </button>
      </div>
      <div className="text-xs mb-2" style={{ color: coloresEstado[status] || "#8a93ad" }}>
        {nombresEstado[status] || "Sin registro"}
      </div>
      {log && log.acts && log.acts.length > 0 ? (
        <>
          <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
            Actividades:{" "}
            {log.acts
              .map(function (act) {
                return act === "Mazmorra" ? "Travesía" : act;
              })
              .join(" · ")}
          </div>
          {log.reps && (
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              Reps: {log.reps.squat || 0} piernas · {log.reps.pushup || 0} empuje ·{" "}
              {log.reps.back || 0} tracción · {log.reps.abs || 0} core
            </div>
          )}
          {log.xp > 0 && (
            <div className="text-xs mt-1" style={{ color: "#3ecf8e" }}>
              +{log.xp} XP ese día
            </div>
          )}
        </>
      ) : (
        <div className="text-xs" style={{ color: "#8a93ad" }}>
          No hay actividades registradas.
        </div>
      )}
      {animo && animo.antes ? (
        <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
          Llegaste {sdcAnimoFrase(animo.antes)}
          {animo.despues ? " · te fuiste " + sdcAnimoFrase(animo.despues) : ""}
        </div>
      ) : null}
      {onLog ? (
        confirmando ? (
          <div className="mt-3">
            <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
              Se anota como sesión hecha, sin XP.
            </div>
            <button
              onClick={() => {
                (setConfirmando(!1), onLog(date));
              }}
              className="w-full py-2 text-xs"
              style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700, minHeight: 44 }}
            >
              Sí, entrené ese día
            </button>
            <button
              onClick={() => setConfirmando(!1)}
              className="w-full py-2 text-xs mt-1"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#9aa4bd",
                minHeight: 44,
              }}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmando(!0)}
            className="w-full py-2 text-xs mt-3"
            style={{
              background: "rgba(62,207,142,0.1)",
              border: "1px solid #3ecf8e",
              color: "#3ecf8e",
              fontWeight: 600,
              minHeight: 44,
            }}
          >
            Entrené este día y me olvidé de anotarlo
          </button>
        )
      ) : null}
    </div>
  );
}

export {
  LeyendaConstancia,
  coloresEstado,
  diasConstancia,
  GrillaConstancia,
  nombresEstado,
  DetalleDia,
};
