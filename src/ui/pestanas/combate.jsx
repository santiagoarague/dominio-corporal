// Pestana Combate: elegir patron, preparacion, ventana de ataque y resultado.
import {
  terreno,
  golpesNecesarios,
  trenesJefe,
  repsCombate,
  ejercicioDeTren,
  nombresTren,
  reintentarRonda,
  ajustarCarga,
  cambiarTren,
  segundosVentanaJefe,
  segundosVentana,
  repsCombateSuave,
} from "../../logica/combate.js";
import { sdcMarcadas, sdcNSets } from "../../logica/series.js";
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
  let terrenoActual = terreno(combat.villainIndex),
    golpes = golpesNecesarios(terrenoActual);
  return (
    <>
      <Tarjeta accent={terrenoActual.isBoss ? "#ffb84f" : "#ff5c7a"} style={{ marginBottom: 16 }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <div
              className="text-xs uppercase"
              style={{ letterSpacing: 2, color: terrenoActual.isBoss ? "#ffb84f" : "#ff5c7a" }}
            >
              {terrenoActual.isBoss
                ? "JEFE · DOS PATRONES ENCADENADOS"
                : `Terreno #${terrenoActual.index + 1}`}
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 22,
                color: "#e8ecf7",
                fontWeight: 700,
              }}
            >
              {terrenoActual.name}
            </div>
          </div>
          <IconoUbicacion size={28} color={terrenoActual.isBoss ? "#ffb84f" : "#ff5c7a"} />
        </div>
        {combat.villainCurrentHP !== null && (
          <>
            <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
              Terreno que falta
            </div>
            <BarraXp
              value={combat.villainCurrentHP}
              max={golpes}
              color={terrenoActual.isBoss ? "#ffb84f" : "#ff5c7a"}
            />
          </>
        )}
        <div className="flex items-center gap-1 mt-3">
          {[1, 2, 3].map((vida) => (
            <IconoCorazon
              key={vida}
              size={16}
              color={vida <= combat.lives ? "#ff5c7a" : "#2a3148"}
              fill={vida <= combat.lives ? "#ff5c7a" : "none"}
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
          {["upper_front", "upper_back", "lower"].map((tren) => {
            let usado = tren === combat.lastExercise;
            return (
              <button
                key={tren}
                onClick={() => !usado && combElegir(tren)}
                disabled={usado}
                className="w-full py-3 text-sm mb-2 disabled:opacity-30"
                style={{
                  background: usado ? "rgba(255,255,255,0.03)" : "rgba(255,92,122,0.1)",
                  border: "1px solid " + (usado ? "rgba(255,255,255,0.1)" : "#ff5c7a"),
                  color: usado ? "#8a93ad" : "#ff5c7a",
                }}
              >
                {nombresTren[tren]}
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
            onClick={() => aplicar((partida) => reintentarRonda(partida))}
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
            onClick={() => aplicar((partida) => ajustarCarga(partida))}
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
          {!terrenoActual.isBoss && (
            <>
              <div className="text-xs mt-3 mb-1" style={{ color: "#9aa4bd" }}>
                Cambio táctico de patrón (perdés un 15% del terreno):
              </div>
              {["upper_front", "upper_back", "lower"].map((tren) =>
                tren === combat.lastExercise || tren === combat.exercise ? null : (
                  <button
                    key={tren}
                    onClick={() => aplicar((partida) => cambiarTren(partida, tren))}
                    className="w-full py-2 text-sm mb-2"
                    style={{
                      background: "rgba(124,92,255,0.1)",
                      border: "1px solid #7c5cff",
                      color: "#b9a5ff",
                    }}
                  >
                    {nombresTren[tren]}
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
          let sdcCr = terrenoActual.isBoss
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
            sdcCs = terrenoActual.isBoss ? segundosVentanaJefe() : segundosVentana(sdcCr);
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
              {terrenoActual.isBoss ? (
                <div className="text-sm" style={{ color: "#e8ecf7" }}>
                  <div style={{ color: "#ffb84f", fontWeight: 700 }}>
                    Superserie enlazada · sin descanso
                  </div>
                  {(combat.bossCats || trenesJefe(combat.lastExercise)).map((tren, i) => (
                    <div key={tren} className="mt-1">
                      Fase {i + 1}:{" "}
                      {repsCombateSuave(
                        progress.rank,
                        profile.classification,
                        profile.focusProfile,
                        tren,
                        modalidad,
                        profile.testResults,
                      )}{" "}
                      × {ejercicioDeTren(progress.rank, profile.classification, tren, modalidad)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm" style={{ color: "#e8ecf7" }}>
                  {sdcCr} ×{" "}
                  {ejercicioDeTren(
                    progress.rank,
                    profile.classification,
                    combat.exercise,
                    modalidad,
                  )}
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
                  let sdcCd = terrenoActual.isBoss ? 20 : 12;
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
              {terrenoActual.isBoss ? (
                <>
                  <div style={{ color: "#ffb84f", fontWeight: 700 }}>
                    Superserie enlazada · sin descanso
                  </div>
                  {(combat.bossCats || trenesJefe(combat.lastExercise)).map((tren, i) => (
                    <div key={tren} className="mt-1">
                      Fase {i + 1}:{" "}
                      {repsCombateSuave(
                        progress.rank,
                        profile.classification,
                        profile.focusProfile,
                        tren,
                        modalidad,
                        profile.testResults,
                      )}{" "}
                      × {ejercicioDeTren(progress.rank, profile.classification, tren, modalidad)}
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
                  ×{" "}
                  {ejercicioDeTren(
                    progress.rank,
                    profile.classification,
                    combat.exercise,
                    modalidad,
                  )}
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
            let fases = terrenoActual.isBoss
                ? (combat.bossCats || trenesJefe(combat.lastExercise)).map((tren) =>
                    repsCombateSuave(
                      progress.rank,
                      profile.classification,
                      profile.focusProfile,
                      tren,
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
              listo = fases.every((reps, i) =>
                sdcMarcadas(sdcCombSer[i], sdcNSets(reps)).every(Boolean),
              );
            return (
              <>
                {fases.map((reps, i) => (
                  <div key={i} className="mt-3">
                    {terrenoActual.isBoss && (
                      <div className="text-xs mb-1" style={{ color: "#ffb84f" }}>
                        Fase {i + 1}
                      </div>
                    )}
                    {sdcCombChips(i, reps)}
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
              Recuperaste {terrenoActual.name}
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
              {terrenoActual.name} sigue activa, pero no perdiste el daño que ya le hiciste.
              Recuperá el aliento e intentalo de nuevo.
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
