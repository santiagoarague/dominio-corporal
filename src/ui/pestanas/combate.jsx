// La pestana Combate: lo que antes era un bloque de App.
import {
  za,
  golpesNecesarios,
  $o,
  repsCombate,
  sy,
  iy,
  y2,
  g2,
  v2,
  p2,
  m2,
  repsCombateSuave,
} from "../../logica/combate.js";
import { sdcNSets } from "../../logica/series.js";
import { BarraXp, Tarjeta } from "../base.jsx";
import { IconoUbicacion, IconoCorazon, IconoTrofeo } from "../iconos.jsx";

export function PestanaCombate({
  aplicar,
  combat,
  combCancelar,
  combElegir,
  combPrep,
  combReintentar,
  combSegundos,
  combSegundosMax,
  combSiguiente,
  combVentana,
  modalidad,
  profile,
  progress,
  sdcCombChips,
  sdcCombSer,
  sdcGolpe,
  setCombPrep,
  setCombSegundos,
  setCombSegundosMax,
}) {
  let f = za(combat.villainIndex),
    d = golpesNecesarios(f);
  return (
    <>
      <Tarjeta accent={f.isBoss ? "#ffb84f" : "#ff5c7a"} style={{ marginBottom: 16 }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <div
              className="text-xs uppercase"
              style={{ letterSpacing: 2, color: f.isBoss ? "#ffb84f" : "#ff5c7a" }}
            >
              {f.isBoss ? "JEFE · DOS PATRONES ENCADENADOS" : `Terreno #${f.index + 1}`}
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 22,
                color: "#e8ecf7",
                fontWeight: 700,
              }}
            >
              {f.name}
            </div>
          </div>
          <IconoUbicacion size={28} color={f.isBoss ? "#ffb84f" : "#ff5c7a"} />
        </div>
        {combat.villainCurrentHP !== null && (
          <>
            <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
              Terreno que falta
            </div>
            <BarraXp
              value={combat.villainCurrentHP}
              max={d}
              color={f.isBoss ? "#ffb84f" : "#ff5c7a"}
            />
          </>
        )}
        <div className="flex items-center gap-1 mt-3">
          {[1, 2, 3].map((m) => (
            <IconoCorazon
              key={m}
              size={16}
              color={m <= combat.lives ? "#ff5c7a" : "#2a3148"}
              fill={m <= combat.lives ? "#ff5c7a" : "none"}
            />
          ))}
          <span className="text-xs ml-1" style={{ color: "#9aa4bd" }}>
            {combat.villainsDefeated || 0} terrenos recuperados
          </span>
        </div>
      </Tarjeta>
      {combat.phase === "choosing" && (
        <Tarjeta accent="#ff5c7a" style={{ marginBottom: 16 }}>
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              color: "#e8ecf7",
              fontWeight: 700,
            }}
            className="mb-2"
          >
            Elegí tu ataque
          </div>
          <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
            No podés repetir la categoría que usaste en el terreno anterior.
          </div>
          {["upper_front", "upper_back", "lower"].map((m) => {
            let N = m === combat.lastExercise;
            return (
              <button
                key={m}
                onClick={() => !N && combElegir(m)}
                disabled={N}
                className="w-full py-3 text-sm mb-2 disabled:opacity-30"
                style={{
                  background: N ? "rgba(255,255,255,0.03)" : "rgba(255,92,122,0.1)",
                  border: "1px solid " + (N ? "rgba(255,255,255,0.1)" : "#ff5c7a"),
                  color: N ? "#5a6178" : "#ff5c7a",
                }}
              >
                {iy[m]}
              </button>
            );
          })}
        </Tarjeta>
      )}
      {combat.phase === "decision" && (
        <Tarjeta accent="#ffb84f" style={{ marginBottom: 16 }}>
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              color: "#ffb84f",
              fontWeight: 700,
            }}
            className="mb-1"
          >
            Decisión táctica
          </div>
          <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
            Perdiste un corazón. Te quedan {combat.lives}. ¿Cómo seguís?
          </div>
          <button
            onClick={() => aplicar((m) => y2(m))}
            className="w-full text-left px-3 py-2 mb-2"
            style={{ background: "rgba(255,92,122,0.08)", border: "1px solid #ff5c7a" }}
          >
            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
              Reintentar
            </div>
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              Mismo ejercicio, misma exigencia. Si volvés a fallar, perdés otro corazón.
            </div>
          </button>
          <button
            onClick={() => aplicar((m) => g2(m))}
            className="w-full text-left px-3 py-2 mb-2"
            style={{ background: "rgba(255,184,79,0.08)", border: "1px solid #ffb84f" }}
          >
            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
              Ajuste de carga
            </div>
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              −20% de repeticiones en el mismo tiempo. Tus golpes harán un 30% menos de daño.
            </div>
          </button>
          {!f.isBoss && (
            <>
              <div className="text-xs mt-3 mb-1" style={{ color: "#9aa4bd" }}>
                Cambio táctico de patrón (perdés un 15% del terreno):
              </div>
              {["upper_front", "upper_back", "lower"].map((m) =>
                m === combat.lastExercise || m === combat.exercise ? null : (
                  <button
                    key={m}
                    onClick={() => aplicar((_) => v2(_, m))}
                    className="w-full py-2 text-sm mb-2"
                    style={{
                      background: "rgba(124,92,255,0.1)",
                      border: "1px solid #7c5cff",
                      color: "#b9a5ff",
                    }}
                  >
                    {iy[m]}
                  </button>
                ),
              )}
            </>
          )}
        </Tarjeta>
      )}
      {combat.phase === "resting" &&
        !combPrep &&
        !combVentana &&
        (() => {
          let sdcCr = f.isBoss
              ? 0
              : Math.max(
                  1,
                  Math.round(
                    repsCombate(
                      progress.rank,
                      profile.classification,
                      combat.exercise,
                      profile.focusProfile,
                      modalidad,
                      profile.testResults,
                    ) * (combat.loadFactor || 1),
                  ),
                ),
            sdcCs = f.isBoss ? p2() : m2(sdcCr);
          return (
            <Tarjeta accent="#ff5c7a" style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontFamily: "Chakra Petch, sans-serif",
                  color: "#e8ecf7",
                  fontWeight: 700,
                }}
                className="mb-2"
              >
                Cuando estés listo
              </div>
              {f.isBoss ? (
                <div className="text-sm" style={{ color: "#e8ecf7" }}>
                  <div style={{ color: "#ffb84f", fontWeight: 700 }}>
                    Superserie enlazada · sin descanso
                  </div>
                  {(combat.bossCats || $o(combat.lastExercise)).map((m, N) => (
                    <div key={m} className="mt-1">
                      Fase {N + 1}:{" "}
                      {repsCombateSuave(
                        progress.rank,
                        profile.classification,
                        profile.focusProfile,
                        m,
                        modalidad,
                        profile.testResults,
                      )}{" "}
                      × {sy(progress.rank, profile.classification, m, modalidad)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm" style={{ color: "#e8ecf7" }}>
                  {sdcCr} × {sy(progress.rank, profile.classification, combat.exercise, modalidad)}
                  {(combat.loadFactor || 1) < 1 && (
                    <div className="text-xs mt-1" style={{ color: "#ffb84f" }}>
                      Carga recalibrada · daño reducido
                    </div>
                  )}
                </div>
              )}
              <div className="text-xs mt-2 mb-3" style={{ color: "#9aa4bd" }}>
                Vas a tener {sdcCs} segundos para completarlo. El reloj arranca cuando toques
                Empezar, no antes.
              </div>
              <button
                onClick={() => {
                  let sdcCd = f.isBoss ? 20 : 12;
                  (setCombSegundosMax(sdcCd), setCombSegundos(sdcCd), setCombPrep(!0));
                }}
                className="w-full py-3 text-sm"
                style={{ background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 }}
              >
                Empezar
              </button>
            </Tarjeta>
          );
        })()}
      {combat.phase === "resting" && combPrep && (
        <Tarjeta accent="#ff5c7a" style={{ marginBottom: 16 }}>
          <div className="text-center">
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              Prepárate...
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 40,
                color: "#ff5c7a",
              }}
            >
              {combSegundos}
            </div>
            <button
              onClick={() => setCombSegundos(0)}
              className="text-xs underline mt-2"
              style={{ color: "#9aa4bd" }}
            >
              Comenzar ahora
            </button>
          </div>
        </Tarjeta>
      )}
      {combVentana && (
        <Tarjeta accent="#ff5c7a" style={{ marginBottom: 16 }}>
          <div className="text-center mb-3">
            <div className="text-sm" style={{ color: "#e8ecf7" }}>
              {f.isBoss ? (
                <>
                  <div style={{ color: "#ffb84f", fontWeight: 700 }}>
                    Superserie enlazada · sin descanso
                  </div>
                  {(combat.bossCats || $o(combat.lastExercise)).map((m, N) => (
                    <div key={m} className="mt-1">
                      Fase {N + 1}:{" "}
                      {repsCombateSuave(
                        progress.rank,
                        profile.classification,
                        profile.focusProfile,
                        m,
                        modalidad,
                        profile.testResults,
                      )}{" "}
                      × {sy(progress.rank, profile.classification, m, modalidad)}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {Math.max(
                    1,
                    Math.round(
                      repsCombate(
                        progress.rank,
                        profile.classification,
                        combat.exercise,
                        profile.focusProfile,
                        modalidad,
                        profile.testResults,
                      ) * (combat.loadFactor || 1),
                    ),
                  )}{" "}
                  × {sy(progress.rank, profile.classification, combat.exercise, modalidad)}
                  {(combat.loadFactor || 1) < 1 && (
                    <div className="text-xs mt-1" style={{ color: "#ffb84f" }}>
                      Carga recalibrada · daño reducido
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 36,
              color: combSegundos <= 5 ? "#ff5c7a" : "#e8ecf7",
              textAlign: "center",
            }}
          >
            {combSegundos}s
          </div>
          <BarraXp value={combSegundos} max={combSegundosMax} color="#ff5c7a" />
          {(() => {
            let fs = f.isBoss
                ? (combat.bossCats || $o(combat.lastExercise)).map((m) =>
                    repsCombateSuave(
                      progress.rank,
                      profile.classification,
                      profile.focusProfile,
                      m,
                      modalidad,
                      profile.testResults,
                    ),
                  )
                : [
                    Math.max(
                      1,
                      Math.round(
                        repsCombate(
                          progress.rank,
                          profile.classification,
                          combat.exercise,
                          profile.focusProfile,
                          modalidad,
                          profile.testResults,
                        ) * (combat.loadFactor || 1),
                      ),
                    ),
                  ],
              listo = fs.every((rq, ix) => (sdcCombSer[ix] || 0) >= sdcNSets(rq));
            return (
              <>
                {fs.map((rq, ix) => (
                  <div key={ix} className="mt-3">
                    {f.isBoss && (
                      <div className="text-xs mb-1" style={{ color: "#ffb84f" }}>
                        Fase {ix + 1}
                      </div>
                    )}
                    {sdcCombChips(ix, rq)}
                  </div>
                ))}
                <button
                  onClick={sdcGolpe}
                  disabled={!listo}
                  className="w-full py-3 text-sm mt-3 disabled:opacity-40"
                  style={{ background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 }}
                >
                  {listo ? "GOLPEAR" : "Marcá las series para golpear"}
                </button>
              </>
            );
          })()}
          <button
            onClick={combCancelar}
            className="w-full py-2 text-xs mt-2"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#e8ecf7",
              fontWeight: 600,
            }}
          >
            Cancelar (sin perder vida)
          </button>
        </Tarjeta>
      )}
      {combat.phase === "victory" && (
        <Tarjeta accent="#3ecf8e" style={{ marginBottom: 16 }}>
          <div className="text-center">
            <IconoTrofeo size={32} color="#3ecf8e" style={{ margin: "0 auto" }} />
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                color: "#3ecf8e",
                fontWeight: 700,
              }}
              className="mt-2"
            >
              ¡Victoria!
            </div>
            <div className="text-sm mt-1" style={{ color: "#e8ecf7" }}>
              Recuperaste {f.name}
            </div>
          </div>
          <button
            onClick={combSiguiente}
            className="w-full py-3 text-sm mt-4"
            style={{ background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
          >
            Continuar al siguiente villano
          </button>
        </Tarjeta>
      )}
      {combat.phase === "defeat" && (
        <Tarjeta accent="#ff5c7a" style={{ marginBottom: 16 }}>
          <div className="text-center">
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 20,
                color: "#ff5c7a",
                fontWeight: 700,
              }}
            >
              Te quedaste sin vidas
            </div>
            <div className="text-sm mt-1" style={{ color: "#9aa4bd" }}>
              {f.name} sigue activa, pero no perdiste el daño que ya le hiciste. Recuperá el aliento
              e intentalo de nuevo.
            </div>
          </div>
          <button
            onClick={combReintentar}
            className="w-full py-3 text-sm mt-4"
            style={{ background: "#ff5c7a", color: "#0a0e1a", fontWeight: 700 }}
          >
            Reintentar
          </button>
        </Tarjeta>
      )}
    </>
  );
}
