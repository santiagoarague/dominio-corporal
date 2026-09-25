// El Umbral: la prueba con los ejercicios del rango siguiente y las rutinas completas que faltan para cruzar.
import {
  sdcUmbralFalta,
  sdcRangoCompletas,
  sdcUmbralMinDe,
  sdcFaltanTxt,
  sdcUmbralPrueba,
} from "../../../logica/partida.js";
import { sdcRango } from "../../../logica/extras.js";
import { Tarjeta } from "../../base.jsx";
import { IconoCheck, IconoDestello } from "../../iconos.jsx";

export function TarjetaUmbral({ ascension, cruzarUmbral, modalidad, player, profile, today }) {
  return (
    ascension.pending && (
      <Tarjeta accent="#ffb84f" style={{ marginBottom: 16 }}>
        <div className="flex items-center gap-2 mb-2">
          <IconoDestello color="#ffb84f" size={18} />
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              color: "#ffb84f",
              fontWeight: 700,
            }}
          >
            Umbral disponible
          </div>
        </div>
        {(() => {
          let prueba = sdcUmbralPrueba(player, modalidad);
          return (
            <div className="mb-3">
              <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                {prueba.rounds} rondas encadenadas con los ejercicios de{" "}
                {sdcRango(prueba.rango, profile)}. En cada ronda:
              </div>
              {["squat", "pushup", "back", "abs"].map((grupo) => (
                <div key={grupo} className="text-sm" style={{ color: "#9aa4bd" }}>
                  {prueba.reps[grupo]} × {prueba.nombres[grupo]}
                </div>
              ))}
              <div className="text-xs mt-2" style={{ color: "#ffb84f" }}>
                {prueba.note}
              </div>
            </div>
          );
        })()}
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Hacela de verdad y confirmala acá. Si no te sale, seguí en este rango.
        </div>
        <div
          className="text-xs mb-3"
          style={{ color: sdcUmbralFalta(player) > 0 ? "#ffb84f" : "#3ecf8e" }}
        >
          Rutinas completas en este rango:{" "}
          {Math.min(sdcRangoCompletas(player), sdcUmbralMinDe(player.progress.rank))} de{" "}
          {sdcUmbralMinDe(player.progress.rank)}.
        </div>
        <button
          onClick={cruzarUmbral}
          disabled={!(today.completed && today.fullCompletion) || sdcUmbralFalta(player) > 0}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm disabled:opacity-40"
          style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
        >
          <IconoCheck size={16} /> Crucé el Umbral
        </button>
        {sdcUmbralFalta(player) > 0 ? (
          <div className="text-xs mt-2 text-center" style={{ color: "#9aa4bd" }}>
            {sdcFaltanTxt(sdcUmbralFalta(player))}
          </div>
        ) : (
          !(today.completed && today.fullCompletion) && (
            <div className="text-xs mt-2 text-center" style={{ color: "#9aa4bd" }}>
              Completá tu rutina al 100% hoy para poder cruzar tu Umbral.
            </div>
          )
        )}
      </Tarjeta>
    )
  );
}
