// Panel de pruebas, al pie de Perfil tras cinco toques en v1.0: saltar de rango, sumar XP,
// forzar Umbral y travesia, y reiniciar combate, Primal o el dia.
import { rangos, colorRango } from "../../datos/rangos.js";
import { Tarjeta } from "../base.jsx";

export function PanelPruebas({
  desbloquearLogros,
  desbloquearPrimal,
  fallarAyer,
  forzarAvisoCarga,
  forzarTravesia,
  forzarUmbral,
  guardarPuntoRetorno,
  hayPuntoRetorno,
  ponerRacha,
  progress,
  reiniciarCombate,
  reiniciarContadorPrimal,
  reiniciarHoy,
  saltarAlJefe,
  saltarRango,
  sumarKmDePrueba,
  sumarXp,
  volverPuntoRetorno,
}) {
  return (
    <Tarjeta accent="#5a6178" style={{ marginTop: 12, borderStyle: "dashed" }}>
      <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
        Solo para probar. Estos botones cambian tu progreso al instante, sin esperar a mañana.
      </div>
      <div
        className="mb-3 p-2"
        style={{ border: "1px solid #3ecf8e55", background: "rgba(62,207,142,0.06)" }}
      >
        <div className="text-xs mb-2" style={{ color: "#3ecf8e" }}>
          Guardá tu progreso real antes de probar cosas, y volvé a él cuando termines.
        </div>
        <button
          onClick={guardarPuntoRetorno}
          className="w-full py-2 text-xs mb-2"
          style={{
            background: "rgba(62,207,142,0.12)",
            border: "1px solid #3ecf8e",
            color: "#3ecf8e",
            fontWeight: 600,
          }}
        >
          Guardar punto de retorno
        </button>
        <button
          onClick={volverPuntoRetorno}
          disabled={!hayPuntoRetorno}
          className="w-full py-2 text-xs disabled:opacity-40"
          style={{
            background: "#3ecf8e",
            border: "1px solid #3ecf8e",
            color: "#0a0e1a",
            fontWeight: 700,
          }}
        >
          Volver a mi progreso
        </button>
        {!hayPuntoRetorno && (
          <div className="text-xs mt-2" style={{ color: "#9aa4bd" }}>
            Aún no guardaste ningún punto de retorno.
          </div>
        )}
      </div>
      <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
        Saltar a un rango (para ver sus ejercicios y reps):
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {rangos.map((f) => (
          <button
            key={f}
            onClick={() => saltarRango(f)}
            className="py-2 text-xs"
            style={{
              background: progress.rank === f ? colorRango[f] + "22" : "rgba(255,255,255,0.05)",
              border: `1px solid ${colorRango[f]}88`,
              color: colorRango[f],
              fontWeight: 700,
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <button
        onClick={forzarUmbral}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,184,79,0.1)",
          border: "1px solid #ffb84f",
          color: "#ffb84f",
        }}
      >
        Forzar Umbral disponible ahora
      </button>
      <button
        onClick={() => sumarXp(200)}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#e8ecf7",
        }}
      >
        Añadir 200 XP
      </button>
      <button
        onClick={fallarAyer}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,92,122,0.1)",
          border: "1px solid #ff5c7a",
          color: "#ff5c7a",
        }}
      >
        Simular que fallé el día de ayer
      </button>
      <button
        onClick={reiniciarHoy}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#e8ecf7",
        }}
      >
        Reiniciar el día de hoy (repetir rutina)
      </button>
      <button
        onClick={() => sumarKmDePrueba(5)}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(124,92,255,0.1)",
          border: "1px solid #7c5cff",
          color: "#7c5cff",
        }}
      >
        Exploración: añadir 5 km de golpe
      </button>
      <button
        onClick={forzarTravesia}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,92,122,0.1)",
          border: "1px solid #ff5c7a",
          color: "#ff5c7a",
        }}
      >
        Forzar travesía de hoy
      </button>
      <button
        onClick={() => ponerRacha(10)}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(62,207,142,0.1)",
          border: "1px solid #3ecf8e",
          color: "#3ecf8e",
        }}
      >
        Forzar racha a 10 días
      </button>
      <button
        onClick={desbloquearLogros}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,184,79,0.1)",
          border: "1px solid #ffb84f",
          color: "#ffb84f",
        }}
      >
        Desbloquear todos los logros
      </button>
      <button
        onClick={saltarAlJefe}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,92,122,0.1)",
          border: "1px solid #ff5c7a",
          color: "#ff5c7a",
        }}
      >
        Combate: saltar al primer Jefe
      </button>
      <button
        onClick={reiniciarCombate}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#e8ecf7",
        }}
      >
        Combate: reiniciar desde el primer enemigo
      </button>
      <button
        onClick={desbloquearPrimal}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(62,207,142,0.1)",
          border: "1px solid #3ecf8e",
          color: "#3ecf8e",
        }}
      >
        Primal: desbloquear siguiente movimiento
      </button>
      <button
        onClick={reiniciarContadorPrimal}
        className="w-full py-2 text-xs mb-2"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#e8ecf7",
        }}
      >
        Primal: reiniciar contador diario
      </button>
      <button
        onClick={forzarAvisoCarga}
        className="w-full py-2 text-xs"
        style={{
          background: "rgba(255,92,122,0.1)",
          border: "1px solid #ff5c7a",
          color: "#ff5c7a",
        }}
      >
        Forzar aviso de sobrecarga
      </button>
    </Tarjeta>
  );
}
