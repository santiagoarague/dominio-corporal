// Pestana Primal: movimientos de Instinto Primal, skills, cuidado articular y neuromotor.
import { sistemaActivo } from "../../logica/sistemas.js";
import { Wo, habilidades, Td, marcarPasoHabilidad } from "../../datos/guia.js";
import { movimientosPrimal, cy, xd, sdcPrimalEtapa } from "../../logica/primal.js";
import { dd, Ws } from "../../logica/combate.js";
import { kd, Reaccion, Secuencia, TareaDual, Ritmo } from "../neuromotor.jsx";
import { Ps, reglaDolor, alarmas, cuidadoArticular, Ty, Y2 } from "../../datos/salud.js";
import { fechaHoy } from "../../logica/rutina.js";
import { BarraXp, Tarjeta } from "../base.jsx";
import {
  IconoDestello,
  IconoFlecha,
  IconoCheck,
  IconoRayo,
  IconoCorazon,
  IconoPata,
  IconoCandado,
} from "../iconos.jsx";
import { Plegable } from "../tarjetas.jsx";

export function PestanaPrimal({
  alternarPlegable,
  aplicar,
  cuidadoAbierto,
  habilidadAbierta,
  neuroAbierto,
  player,
  plegado,
  primal,
  primalCancelar,
  primalElegir,
  primalFase,
  primalHechasHoy,
  primalMov,
  primalRonda,
  primalSegundos,
  primalSesionesHoy,
  progress,
  sdcPrimalYa,
  primalPausa,
  primalPausar,
  primalSeguir,
  seccionPrimal,
  setCuidadoAbierto,
  setHabilidadAbierta,
  setNeuroAbierto,
  setSeccionPrimal,
  ui,
}) {
  let f = primal.unlockedCount - 1;
  return (
    <>
      <div
        className={
          "grid gap-1 mb-4 grid-cols-" +
          (1 +
            (sistemaActivo(player, "skills") ? 1 : 0) +
            (sistemaActivo(player, "care") ? 1 : 0) +
            (sistemaActivo(player, "neuro") ? 1 : 0))
        }
      >
        <button
          onClick={() => setSeccionPrimal("movs")}
          className="py-2 text-xs"
          style={{
            background: seccionPrimal === "movs" ? "#3ecf8e" : "rgba(255,255,255,0.03)",
            border:
              "1px solid " + (seccionPrimal === "movs" ? "#3ecf8e" : "rgba(255,255,255,0.12)"),
            color: seccionPrimal === "movs" ? "#0a0e1a" : "#8a93ad",
            fontWeight: 600,
          }}
        >
          Movimientos
        </button>
        {sistemaActivo(player, "skills") && (
          <button
            onClick={() => setSeccionPrimal("skills")}
            className="py-2 text-xs"
            style={{
              background: seccionPrimal === "skills" ? "#b084f5" : "rgba(255,255,255,0.03)",
              border:
                "1px solid " + (seccionPrimal === "skills" ? "#b084f5" : "rgba(255,255,255,0.12)"),
              color: seccionPrimal === "skills" ? "#0a0e1a" : "#8a93ad",
              fontWeight: 600,
            }}
          >
            Skills
          </button>
        )}
        {sistemaActivo(player, "care") && (
          <button
            onClick={() => setSeccionPrimal("care")}
            className="py-2 text-xs"
            style={{
              background: seccionPrimal === "care" ? "#4f9dff" : "rgba(255,255,255,0.03)",
              border:
                "1px solid " + (seccionPrimal === "care" ? "#4f9dff" : "rgba(255,255,255,0.12)"),
              color: seccionPrimal === "care" ? "#0a0e1a" : "#8a93ad",
              fontWeight: 600,
            }}
          >
            Articul.
          </button>
        )}
        {sistemaActivo(player, "neuro") && (
          <button
            onClick={() => setSeccionPrimal("neuro")}
            className="py-2 text-xs"
            style={{
              background: seccionPrimal === "neuro" ? "#ff6b4a" : "rgba(255,255,255,0.03)",
              border:
                "1px solid " + (seccionPrimal === "neuro" ? "#ff6b4a" : "rgba(255,255,255,0.12)"),
              color: seccionPrimal === "neuro" ? "#0a0e1a" : "#8a93ad",
              fontWeight: 600,
            }}
          >
            Neuro
          </button>
        )}
      </div>
      {seccionPrimal === "neuro" &&
        sistemaActivo(player, "neuro") &&
        (() => {
          let d = player.neuro || {
              bestSpeedLevel: 0,
              bestSequence: 0,
              bestDualSec: 0,
              bestBpm: 0,
              sessions: 0,
            },
            m = [
              {
                id: "reaction",
                name: "Reacción",
                accent: "#4f9dff",
                best: d.bestSpeedLevel
                  ? (kd.find((N) => N.level === d.bestSpeedLevel) || {}).name
                  : "—",
                desc: "Señales impredecibles sin tocar la pantalla. Solo atención y cuerpo.",
              },
              {
                id: "sequence",
                name: "Secuencia motriz",
                accent: "#b084f5",
                best: d.bestSequence ? d.bestSequence + " movs" : "—",
                desc: "Memorizá una cadena, ejecutala de memoria y comprobá.",
              },
              {
                id: "dual",
                name: "Doble tarea",
                accent: "#3ecf8e",
                best: d.bestDualSec
                  ? Math.floor(d.bestDualSec / 60) +
                    ":" +
                    String(d.bestDualSec % 60).padStart(2, "0")
                  : "—",
                desc: "Isométrico sostenido mientras resuelves una tarea mental.",
              },
              {
                id: "coord",
                name: "Coordinación cruzada",
                accent: "#ffb84f",
                best: d.bestBpm ? d.bestBpm + " bpm" : "—",
                desc: "Patrones contralaterales al ritmo del metrónomo.",
              },
            ];
          return (
            <>
              <Tarjeta accent="#ff6b4a" style={{ marginBottom: 16 }}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div
                      className="text-xs uppercase"
                      style={{ letterSpacing: 2, color: "#ff6b4a" }}
                    >
                      Neuromotor
                    </div>
                    <div
                      style={{
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 20,
                        color: "#e8ecf7",
                        fontWeight: 700,
                      }}
                    >
                      {d.sessions || 0} sesiones
                    </div>
                  </div>
                  <IconoRayo size={24} color="#ff6b4a" />
                </div>
                <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
                  La pantalla da el estímulo, tu cuerpo responde. Reflejos, memoria de movimiento y
                  coordinación. Alimenta tu atributo Control.
                </div>
                <div
                  className="text-xs p-2"
                  style={{
                    color: "#9aa4bd",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Tus marcas sirven para compararte con vos mismo. Esto entrena atención y control
                  motor, no tu inteligencia general.
                </div>
              </Tarjeta>
              {m.map((N) => {
                let _ = neuroAbierto === N.id;
                return (
                  <Tarjeta key={N.id} accent={N.accent} style={{ marginBottom: 12 }}>
                    <button
                      onClick={() => setNeuroAbierto(_ ? null : N.id)}
                      className="w-full text-left"
                      style={{ background: "transparent", border: "none", padding: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            style={{
                              display: "inline-block",
                              transform: _ ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform .2s",
                            }}
                          >
                            <IconoFlecha size={14} color="#9aa4bd" />
                          </span>
                          <div>
                            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                              {N.name}
                            </div>
                            <div className="text-xs" style={{ color: "#7a83a0" }}>
                              {N.desc}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs" style={{ color: N.accent, whiteSpace: "nowrap" }}>
                          {N.best}
                        </div>
                      </div>
                    </button>
                    {_ && (
                      <div className="mt-3">
                        {N.id === "reaction" && (
                          <Reaccion onDone={(X) => aplicar((de) => Ps(de, "reaction", X, !1))} />
                        )}
                        {N.id === "sequence" && (
                          <Secuencia onDone={(X) => aplicar((de) => Ps(de, "sequence", X, !1))} />
                        )}
                        {N.id === "dual" && (
                          <TareaDual onDone={(X) => aplicar((de) => Ps(de, "dual", X, X >= 45))} />
                        )}
                        {N.id === "coord" && (
                          <Ritmo onDone={(X) => aplicar((de) => Ps(de, "coord", X, !1))} />
                        )}
                      </div>
                    )}
                  </Tarjeta>
                );
              })}
            </>
          );
        })()}
      {seccionPrimal === "care" &&
        sistemaActivo(player, "care") &&
        (() => {
          let d =
            player.care && player.care.today.date === fechaHoy() ? player.care.today.done : [];
          return (
            <>
              <Tarjeta accent="#4f9dff" style={{ marginBottom: 16 }}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div
                      className="text-xs uppercase"
                      style={{ letterSpacing: 2, color: "#4f9dff" }}
                    >
                      Cuidado articular
                    </div>
                    <div
                      style={{
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 20,
                        color: "#e8ecf7",
                        fontWeight: 700,
                      }}
                    >
                      {(player.care && player.care.lifetime) || 0} protocolos hechos
                    </div>
                  </div>
                  <IconoCorazon size={24} color="#4f9dff" />
                </div>
                <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                  Trabajo preventivo y de mantenimiento para las articulaciones que más sufren
                  entrenando. Da XP y no tiene penalización: úsalo los días que lo necesites.
                </div>
                <div
                  className="text-xs p-2 mb-2"
                  style={{
                    color: "#ffb84f",
                    background: "rgba(255,184,79,0.08)",
                    border: "1px solid rgba(255,184,79,0.3)",
                  }}
                >
                  Esto no sustituye a un diagnóstico. Si ya tienes una lesión, consúltalo con un
                  fisioterapeuta o médico antes de seguir cualquier protocolo.
                </div>
                <div
                  className="text-xs p-2"
                  style={{
                    color: "#9aa4bd",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {reglaDolor}
                </div>
              </Tarjeta>
              <Plegable
                id="banderas"
                title="Cuándo parar y consultar"
                accent="#ff5c7a"
                style={{ marginBottom: 16 }}
                collapsed={
                  ui && ui.collapsed && ui.collapsed.banderas !== void 0 ? plegado("banderas") : !0
                }
                onToggle={alternarPlegable}
                right="señales de alarma"
              >
                <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
                  Si aparece cualquiera de estas, deja el protocolo y busca valoración profesional:
                </div>
                {alarmas.map((m) => (
                  <div key={m} className="flex items-start gap-2 py-1">
                    <span style={{ color: "#ff5c7a" }}>•</span>
                    <span className="text-xs" style={{ color: "#e8ecf7" }}>
                      {m}
                    </span>
                  </div>
                ))}
              </Plegable>
              {cuidadoArticular.map((m) => {
                let N = cuidadoAbierto === m.id,
                  _ = d.includes(m.id);
                return (
                  <Tarjeta
                    key={m.id}
                    accent={_ ? "#3ecf8e" : "#5a6178"}
                    style={{ marginBottom: 12 }}
                  >
                    <button
                      onClick={() => setCuidadoAbierto(N ? null : m.id)}
                      className="w-full text-left"
                      style={{ background: "transparent", border: "none", padding: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            style={{
                              display: "inline-block",
                              transform: N ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform .2s",
                            }}
                          >
                            <IconoFlecha size={14} color="#9aa4bd" />
                          </span>
                          <div>
                            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                              {m.zone}
                            </div>
                            <div className="text-xs" style={{ color: "#7a83a0" }}>
                              {m.common}
                            </div>
                          </div>
                        </div>
                        {_ && <IconoCheck size={16} color="#3ecf8e" />}
                      </div>
                    </button>
                    {N && (
                      <div className="mt-3">
                        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                          {m.context}
                        </div>
                        {m.exercises.map((X, de) => (
                          <div
                            key={X.name}
                            className="py-2"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                          >
                            <div className="flex items-center justify-between">
                              <div
                                className="text-sm"
                                style={{ color: "#e8ecf7", fontWeight: 600 }}
                              >
                                {de + 1}. {X.name}
                              </div>
                              <div
                                className="text-xs"
                                style={{ color: "#4f9dff", whiteSpace: "nowrap" }}
                              >
                                {X.dose}
                              </div>
                            </div>
                            <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                              {X.how}
                            </div>
                            <div className="text-xs mt-1" style={{ color: "#7a83a0" }}>
                              Para qué: {X.why}
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => aplicar((X) => Y2(X, m.id))}
                          disabled={_}
                          className="w-full py-3 text-sm mt-3 disabled:opacity-40"
                          style={{
                            background: _ ? "rgba(255,255,255,0.05)" : "#4f9dff",
                            color: _ ? "#9aa4bd" : "#0a0e1a",
                            fontWeight: 700,
                          }}
                        >
                          {_ ? "Registrado hoy" : "Registrar protocolo (+" + Ty + " XP)"}
                        </button>
                      </div>
                    )}
                  </Tarjeta>
                );
              })}
            </>
          );
        })()}
      {seccionPrimal === "skills" && sistemaActivo(player, "skills") && (
        <>
          <Tarjeta accent="#b084f5" style={{ marginBottom: 16 }}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <div className="text-xs uppercase" style={{ letterSpacing: 2, color: "#b084f5" }}>
                  Skills
                </div>
                <div
                  style={{
                    fontFamily: "Chakra Petch, sans-serif",
                    fontSize: 20,
                    color: "#e8ecf7",
                    fontWeight: 700,
                  }}
                >
                  {Wo(player)} / {habilidades.length} aprendidas
                </div>
              </div>
              <IconoDestello size={24} color="#b084f5" />
            </div>
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              Movimientos raros que se aprenden sin reloj. Marcá cada paso cuando lo domines de
              verdad: no hay prisa ni penalización por tardar semanas.
            </div>
          </Tarjeta>
          {habilidades.map((d) => {
            let m = Td(player, d.id),
              N = m.filter(Boolean).length,
              _ = N >= d.steps.length,
              X = habilidadAbierta === d.id;
            return (
              <Tarjeta key={d.id} accent={_ ? "#3ecf8e" : "#5a6178"} style={{ marginBottom: 12 }}>
                <button
                  onClick={() => setHabilidadAbierta(X ? null : d.id)}
                  className="w-full text-left"
                  style={{ background: "transparent", border: "none", padding: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          display: "inline-block",
                          transform: X ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform .2s",
                        }}
                      >
                        <IconoFlecha size={14} color="#9aa4bd" />
                      </span>
                      <div>
                        <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                          {d.name}
                        </div>
                        <div className="text-xs" style={{ color: "#7a83a0" }}>
                          {d.family} · {d.level}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: _ ? "#3ecf8e" : "#8a93ad" }}>
                      {_ ? "Aprendida" : `${N}/${d.steps.length}`}
                    </div>
                  </div>
                </button>
                <div className="mt-2">
                  <BarraXp value={N} max={d.steps.length} color={_ ? "#3ecf8e" : "#b084f5"} />
                </div>
                {X && (
                  <div className="mt-3">
                    <div className="text-xs mb-1" style={{ color: "#e8ecf7" }}>
                      {d.what}
                    </div>
                    <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                      {d.why}
                    </div>
                    {d.steps.map((de, te) => {
                      let Bl = !!m[te];
                      return (
                        <div
                          key={de.name}
                          className="py-2"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          <button
                            onClick={() => aplicar((wl) => marcarPasoHabilidad(wl, d.id, te))}
                            className="w-full text-left flex items-start gap-2"
                            style={{
                              background: "transparent",
                              border: "none",
                              padding: 0,
                            }}
                          >
                            <span
                              style={{
                                width: 16,
                                height: 16,
                                flexShrink: 0,
                                marginTop: 2,
                                border: "1px solid " + (Bl ? "#3ecf8e" : "rgba(255,255,255,0.3)"),
                                background: Bl ? "#3ecf8e" : "transparent",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {Bl && <IconoCheck size={12} color="#0a0e1a" />}
                            </span>
                            <span>
                              <span
                                className="text-sm"
                                style={{
                                  color: Bl ? "#8a93ad" : "#e8ecf7",
                                  fontWeight: 600,
                                  textDecoration: Bl ? "line-through" : "none",
                                }}
                              >
                                {te + 1}. {de.name}
                              </span>
                              <span
                                className="text-xs"
                                style={{
                                  color: "#9aa4bd",
                                  display: "block",
                                  marginTop: 2,
                                }}
                              >
                                {de.how}
                              </span>
                              <span
                                className="text-xs"
                                style={{
                                  color: "#4f9dff",
                                  display: "block",
                                  marginTop: 2,
                                }}
                              >
                                Clave: {de.cue}
                              </span>
                            </span>
                          </button>
                        </div>
                      );
                    })}
                    <div
                      className="text-xs mt-3 p-2"
                      style={{
                        color: "#3ecf8e",
                        background: "rgba(62,207,142,0.07)",
                        border: "1px solid rgba(62,207,142,0.25)",
                      }}
                    >
                      <b>Si te atascas:</b> {d.regression}
                    </div>
                    <div
                      className="text-xs mt-2 p-2"
                      style={{
                        color: "#ff5c7a",
                        background: "rgba(255,92,122,0.07)",
                        border: "1px solid rgba(255,92,122,0.25)",
                      }}
                    >
                      <b>Error común:</b> {d.mistake}
                    </div>
                  </div>
                )}
              </Tarjeta>
            );
          })}
        </>
      )}
      {seccionPrimal === "movs" && (
        <>
          <Tarjeta accent="#3ecf8e" style={{ marginBottom: 16 }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs uppercase" style={{ letterSpacing: 2, color: "#3ecf8e" }}>
                  Instinto Primal
                </div>
                <div
                  style={{
                    fontFamily: "Chakra Petch, sans-serif",
                    fontSize: 22,
                    color: "#e8ecf7",
                    fontWeight: 700,
                  }}
                >
                  {primal.unlockedCount} / {movimientosPrimal.length} movimientos
                </div>
              </div>
              <IconoPata size={26} color="#3ecf8e" />
            </div>
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              Hoy: {primalHechasHoy}/{primalSesionesHoy} sesiones
            </div>
          </Tarjeta>
          {primalFase !== "idle" ? (
            <Tarjeta accent="#3ecf8e" style={{ marginBottom: 16 }}>
              <div className="text-center mb-2">
                <div
                  style={{
                    fontFamily: "Chakra Petch, sans-serif",
                    color: "#e8ecf7",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {movimientosPrimal[primalMov].name}
                </div>
                <div className="mt-1" style={{ fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" }}>
                  {movimientosPrimal[primalMov].desc}
                </div>
              </div>
              {primalFase === "listo" ? (
                <>
                  <div className="text-center text-xs mb-3" style={{ color: "#9aa4bd" }}>
                    {dd} rondas de {Ws(progress.rank)} segundos.
                  </div>
                  <button
                    onClick={sdcPrimalYa}
                    className="w-full py-3 text-sm"
                    style={{
                      minHeight: 48,
                      background: "#3ecf8e",
                      border: "1px solid #3ecf8e",
                      color: "#0a0e1a",
                      fontWeight: 700,
                    }}
                  >
                    Empezar
                  </button>
                </>
              ) : (
                <>
                  {(() => {
                    let et = sdcPrimalEtapa(primalFase, primalRonda, primalSegundos),
                      aviso = et === "posicion" || et === "prepara";
                    return (
                      <div
                        className="text-center text-xs mb-1"
                        style={
                          primalPausa
                            ? { color: "#9aa4bd", fontWeight: 700, letterSpacing: 2 }
                            : aviso
                              ? { color: "#ffb84f", fontWeight: 700, letterSpacing: 2 }
                              : { color: "#9aa4bd" }
                        }
                      >
                        {primalPausa
                          ? "EN PAUSA"
                          : et === "posicion"
                            ? "PONETE EN POSICIÓN"
                            : et === "prepara"
                              ? "PREPARATE · RONDA " + (primalRonda + 1) + "/" + dd
                              : et === "descanso"
                                ? "Ronda " + primalRonda + "/" + dd + " terminada · Descanso"
                                : "Ronda " + primalRonda + "/" + dd + " · En marcha"}
                      </div>
                    );
                  })()}
                  <div
                    style={{
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 48,
                      textAlign: "center",
                      color: primalPausa
                        ? "#5a6178"
                        : primalFase === "active"
                          ? "#3ecf8e"
                          : "#ffb84f",
                    }}
                  >
                    {primalSegundos}s
                  </div>
                  <BarraXp
                    value={primalSegundos}
                    max={primalFase === "active" ? Ws(progress.rank) : primalRonda === 0 ? 10 : cy}
                    color={
                      primalPausa ? "#5a6178" : primalFase === "active" ? "#3ecf8e" : "#ffb84f"
                    }
                  />
                  {primalPausa ? (
                    <button
                      onClick={primalSeguir}
                      className="w-full mt-4 py-3 text-sm"
                      style={{
                        minHeight: 48,
                        background: "#3ecf8e",
                        border: "1px solid #3ecf8e",
                        color: "#0a0e1a",
                        fontWeight: 700,
                      }}
                    >
                      Seguir →
                    </button>
                  ) : (
                    <button
                      onClick={primalPausar}
                      className="w-full mt-4 py-2 text-sm"
                      style={{
                        minHeight: 44,
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.28)",
                        color: "#e8ecf7",
                        fontWeight: 600,
                      }}
                    >
                      Pausa
                    </button>
                  )}
                </>
              )}
              <button
                onClick={primalCancelar}
                className="w-full py-2 text-xs mt-4"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#e8ecf7",
                  fontWeight: 600,
                }}
              >
                Cancelar
              </button>
            </Tarjeta>
          ) : (
            <Plegable
              id="primalLista"
              title="Elegí un movimiento"
              accent="#3ecf8e"
              style={{ marginBottom: 16 }}
              collapsed={plegado("primalLista")}
              onToggle={alternarPlegable}
              right={`${primal.unlockedCount}/${movimientosPrimal.length}`}
            >
              <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                {dd} rondas de {Ws(progress.rank)} segundos. Dominá el más nuevo {xd} veces para
                descubrir el siguiente.
              </div>
              {primalHechasHoy >= primalSesionesHoy && (
                <div className="text-xs mb-3" style={{ color: "#ffb84f" }}>
                  Ya completaste tus {primalSesionesHoy} sesiones de hoy. Volvé mañana.
                </div>
              )}
              {movimientosPrimal.map((d, m) => {
                let N = m < primal.unlockedCount,
                  _ = m === f,
                  X = !N || primalHechasHoy >= primalSesionesHoy;
                return (
                  <button
                    key={d.name}
                    onClick={() => !X && primalElegir(m)}
                    disabled={X}
                    className="w-full text-left py-2 px-3 mb-2 disabled:opacity-40"
                    style={{
                      background: N ? "rgba(62,207,142,0.08)" : "rgba(255,255,255,0.03)",
                      border: "1px solid " + (N ? "#3ecf8e55" : "rgba(255,255,255,0.1)"),
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {N ? (
                        <IconoPata size={16} color="#3ecf8e" />
                      ) : (
                        <IconoCandado size={16} color="#7a83a0" />
                      )}
                      <div
                        className="text-sm"
                        style={{
                          color: N ? "#e8ecf7" : "#5a6178",
                          fontWeight: N ? 600 : 400,
                        }}
                      >
                        {d.name}
                      </div>
                      {_ && (
                        <span className="text-xs ml-auto" style={{ color: "#ffb84f" }}>
                          {primal.masteryProgress}/{xd}
                        </span>
                      )}
                    </div>
                    {N && (
                      <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                        {d.desc}
                      </div>
                    )}
                  </button>
                );
              })}
            </Plegable>
          )}
        </>
      )}
    </>
  );
}
