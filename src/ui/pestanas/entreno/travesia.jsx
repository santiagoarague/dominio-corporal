// La travesia del dia: el desafio, el cronometro que la acompana y el cierre.
import { sistemaActivo } from "../../../logica/sistemas.js";
import { sdcTravRitmo, sdcTravMin, CronoTravesia } from "../../travesia.jsx";
import { Tarjeta } from "../../base.jsx";
import { IconoEspadas } from "../../iconos.jsx";

export function TarjetaTravesia({
  dungeon,
  player,
  sdcTravCancelar,
  sdcTravEmpezar,
  terminarTravesia,
}) {
  return (
    sistemaActivo(player, "dungeon") &&
    dungeon.available &&
    !dungeon.completed && (
      <Tarjeta accent="#ff5c7a" style={{ marginBottom: 16 }}>
        <div className="flex items-center gap-2 mb-2">
          <IconoEspadas color="#ff5c7a" size={18} />
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              color: "#ff5c7a",
              fontWeight: 700,
            }}
          >
            Travesía de hoy
          </div>
        </div>
        <div
          style={{
            fontFamily: "Chakra Petch, sans-serif",
            color: "#e8ecf7",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {dungeon.name}
        </div>
        <div className="text-sm mt-2 mb-2" style={{ color: "#e8ecf7" }}>
          Desafío: {dungeon.challengeText}
        </div>
        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
          Recompensa: +{dungeon.rewardXP} XP
        </div>
        {(function () {
          var ini = (player.dungeon && player.dungeon.startedAt) || 0,
            rit = sdcTravRitmo(dungeon.name);
          if (!ini)
            return (
              <>
                <button
                  onClick={sdcTravEmpezar}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm"
                  style={{
                    minHeight: 48,
                    background: "#ff5c7a",
                    color: "#0a0e1a",
                    fontWeight: 700,
                  }}
                >
                  <IconoEspadas size={16} /> Empezar la travesía
                </button>
                <button
                  onClick={terminarTravesia}
                  className="w-full text-xs underline mt-2"
                  style={{ minHeight: 44, color: "#9aa4bd" }}
                >
                  Ya la hice, sin el teléfono
                </button>
              </>
            );
          return (
            <CronoTravesia
              inicio={ini}
              mins={sdcTravMin(dungeon.challengeText)}
              on={rit.on}
              off={rit.off}
              onCancel={sdcTravCancelar}
              onListo={terminarTravesia}
            />
          );
        })()}
      </Tarjeta>
    )
  );
}
