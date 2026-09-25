// Pestana Primal: movimientos de Instinto Primal, skills, cuidado articular y neuromotor.
import { sistemaActivo } from "../../logica/sistemas.js";
import {
  habilidadesCompletas,
  habilidades,
  pasosHabilidad,
  marcarPasoHabilidad,
} from "../../datos/guia.js";
import {
  movimientosPrimal,
  descansoPrimal,
  vecesParaDominar,
  sdcPrimalEtapa,
} from "../../logica/primal.js";
import { rondasPrimal, segundosRondaPrimal } from "../../logica/combate.js";
import { velocidadesReaccion, Reaccion, Secuencia, TareaDual, Ritmo } from "../neuromotor.jsx";
import {
  registrarNeuromotor,
  reglaDolor,
  alarmas,
  cuidadoArticular,
  xpCuidado,
  registrarCuidado,
} from "../../datos/salud.js";
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
  let masNuevo = primal.unlockedCount - 1;
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
          let neuro = player.neuro || {
              bestSpeedLevel: 0,
              bestSequence: 0,
              bestDualSec: 0,
              bestBpm: 0,
              sessions: 0,
            },
            pruebas = [
              {
                id: "reaction",
                name: "Reacción",
                accent: "#4f9dff",
                best: neuro.bestSpeedLevel
                  ? (
                      velocidadesReaccion.find(
                        (velocidad) => velocidad.level === neuro.bestSpeedLevel,
                      ) || {}
                    ).name
                  : "—",
                desc: "Señales impredecibles sin tocar la pantalla. Solo atención y cuerpo.",
              },
              {
                id: "sequence",
                name: "Secuencia motriz",
                accent: "#b084f5",
                best: neuro.bestSequence ? neuro.bestSequence + " movs" : "—",
                desc: "Memorizá una cadena, ejecutala de memoria y comprobá.",
              },
              {
                id: "dual",
                name: "Doble tarea",
                accent: "#3ecf8e",
                best: neuro.bestDualSec
                  ? Math.floor(neuro.bestDualSec / 60) +
                    ":" +
                    String(neuro.bestDualSec % 60).padStart(2, "0")
                  : "—",
                desc: "Isométrico sostenido mientras resuelves una tarea mental.",
              },
              {
                id: "coord",
                name: "Coordinación cruzada",
                accent: "#ffb84f",
                best: neuro.bestBpm ? neuro.bestBpm + " bpm" : "—",
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
                      {neuro.sessions || 0} sesiones
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
              {pruebas.map((prueba) => {
                let abierta = neuroAbierto === prueba.id;
                return (
                  <Tarjeta key={prueba.id} accent={prueba.accent} style={{ marginBottom: 12 }}>
                    <button
                      onClick={() => setNeuroAbierto(abierta ? null : prueba.id)}
                      className="w-full text-left"
                      style={{ background: "transparent", border: "none", padding: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            style={{
                              display: "inline-block",
                              transform: abierta ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform .2s",
                            }}
                          >
                            <IconoFlecha size={14} color="#9aa4bd" />
                          </span>
                          <div>
                            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                              {prueba.name}
                            </div>
                            <div className="text-xs" style={{ color: "#7a83a0" }}>
                              {prueba.desc}
                            </div>
                          </div>
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: prueba.accent, whiteSpace: "nowrap" }}
                        >
                          {prueba.best}
                        </div>
                      </div>
                    </button>
                    {abierta && (
                      <div className="mt-3">
                        {prueba.id === "reaction" && (
                          <Reaccion
                            onDone={(resultado) =>
                              aplicar((partida) =>
                                registrarNeuromotor(partida, "reaction", resultado, !1),
                              )
                            }
                          />
                        )}
                        {prueba.id === "sequence" && (
                          <Secuencia
                            onDone={(resultado) =>
                              aplicar((partida) =>
                                registrarNeuromotor(partida, "sequence", resultado, !1),
                              )
                            }
                          />
                        )}
                        {prueba.id === "dual" && (
                          <TareaDual
                            onDone={(resultado) =>
                              aplicar((partida) =>
                                registrarNeuromotor(partida, "dual", resultado, resultado >= 45),
                              )
                            }
                          />
                        )}
                        {prueba.id === "coord" && (
                          <Ritmo
                            onDone={(resultado) =>
                              aplicar((partida) =>
                                registrarNeuromotor(partida, "coord", resultado, !1),
                              )
                            }
                          />
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
          let hechosHoy =
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
                {alarmas.map((alarma) => (
                  <div key={alarma} className="flex items-start gap-2 py-1">
                    <span style={{ color: "#ff5c7a" }}>•</span>
                    <span className="text-xs" style={{ color: "#e8ecf7" }}>
                      {alarma}
                    </span>
                  </div>
                ))}
              </Plegable>
              {cuidadoArticular.map((protocolo) => {
                let abierto = cuidadoAbierto === protocolo.id,
                  hecho = hechosHoy.includes(protocolo.id);
                return (
                  <Tarjeta
                    key={protocolo.id}
                    accent={hecho ? "#3ecf8e" : "#5a6178"}
                    style={{ marginBottom: 12 }}
                  >
                    <button
                      onClick={() => setCuidadoAbierto(abierto ? null : protocolo.id)}
                      className="w-full text-left"
                      style={{ background: "transparent", border: "none", padding: 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            style={{
                              display: "inline-block",
                              transform: abierto ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform .2s",
                            }}
                          >
                            <IconoFlecha size={14} color="#9aa4bd" />
                          </span>
                          <div>
                            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                              {protocolo.zone}
                            </div>
                            <div className="text-xs" style={{ color: "#7a83a0" }}>
                              {protocolo.common}
                            </div>
                          </div>
                        </div>
                        {hecho && <IconoCheck size={16} color="#3ecf8e" />}
                      </div>
                    </button>
                    {abierto && (
                      <div className="mt-3">
                        <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                          {protocolo.context}
                        </div>
                        {protocolo.exercises.map((ejercicio, i) => (
                          <div
                            key={ejercicio.name}
                            className="py-2"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                          >
                            <div className="flex items-center justify-between">
                              <div
                                className="text-sm"
                                style={{ color: "#e8ecf7", fontWeight: 600 }}
                              >
                                {i + 1}. {ejercicio.name}
                              </div>
                              <div
                                className="text-xs"
                                style={{ color: "#4f9dff", whiteSpace: "nowrap" }}
                              >
                                {ejercicio.dose}
                              </div>
                            </div>
                            <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                              {ejercicio.how}
                            </div>
                            <div className="text-xs mt-1" style={{ color: "#7a83a0" }}>
                              Para qué: {ejercicio.why}
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() =>
                            aplicar((partida) => registrarCuidado(partida, protocolo.id))
                          }
                          disabled={hecho}
                          className="w-full py-3 text-sm mt-3 disabled:opacity-40"
                          style={{
                            background: hecho ? "rgba(255,255,255,0.05)" : "#4f9dff",
                            color: hecho ? "#9aa4bd" : "#0a0e1a",
                            fontWeight: 700,
                          }}
                        >
                          {hecho ? "Registrado hoy" : "Registrar protocolo (+" + xpCuidado + " XP)"}
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
                  {habilidadesCompletas(player)} / {habilidades.length} aprendidas
                </div>
              </div>
              <IconoDestello size={24} color="#b084f5" />
            </div>
            <div className="text-xs" style={{ color: "#9aa4bd" }}>
              Movimientos raros que se aprenden sin reloj. Marcá cada paso cuando lo domines de
              verdad: no hay prisa ni penalización por tardar semanas.
            </div>
          </Tarjeta>
          {habilidades.map((habilidad) => {
            let pasos = pasosHabilidad(player, habilidad.id),
              hechos = pasos.filter(Boolean).length,
              completa = hechos >= habilidad.steps.length,
              abierta = habilidadAbierta === habilidad.id;
            return (
              <Tarjeta
                key={habilidad.id}
                accent={completa ? "#3ecf8e" : "#5a6178"}
                style={{ marginBottom: 12 }}
              >
                <button
                  onClick={() => setHabilidadAbierta(abierta ? null : habilidad.id)}
                  className="w-full text-left"
                  style={{ background: "transparent", border: "none", padding: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          display: "inline-block",
                          transform: abierta ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform .2s",
                        }}
                      >
                        <IconoFlecha size={14} color="#9aa4bd" />
                      </span>
                      <div>
                        <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
                          {habilidad.name}
                        </div>
                        <div className="text-xs" style={{ color: "#7a83a0" }}>
                          {habilidad.family} · {habilidad.level}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: completa ? "#3ecf8e" : "#8a93ad" }}>
                      {completa ? "Aprendida" : `${hechos}/${habilidad.steps.length}`}
                    </div>
                  </div>
                </button>
                <div className="mt-2">
                  <BarraXp
                    value={hechos}
                    max={habilidad.steps.length}
                    color={completa ? "#3ecf8e" : "#b084f5"}
                  />
                </div>
                {abierta && (
                  <div className="mt-3">
                    <div className="text-xs mb-1" style={{ color: "#e8ecf7" }}>
                      {habilidad.what}
                    </div>
                    <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
                      {habilidad.why}
                    </div>
                    {habilidad.steps.map((paso, i) => {
                      let marcado = !!pasos[i];
                      return (
                        <div
                          key={paso.name}
                          className="py-2"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          <button
                            onClick={() =>
                              aplicar((partida) => marcarPasoHabilidad(partida, habilidad.id, i))
                            }
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
                                border:
                                  "1px solid " + (marcado ? "#3ecf8e" : "rgba(255,255,255,0.3)"),
                                background: marcado ? "#3ecf8e" : "transparent",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {marcado && <IconoCheck size={12} color="#0a0e1a" />}
                            </span>
                            <span>
                              <span
                                className="text-sm"
                                style={{
                                  color: marcado ? "#8a93ad" : "#e8ecf7",
                                  fontWeight: 600,
                                  textDecoration: marcado ? "line-through" : "none",
                                }}
                              >
                                {i + 1}. {paso.name}
                              </span>
                              <span
                                className="text-xs"
                                style={{
                                  color: "#9aa4bd",
                                  display: "block",
                                  marginTop: 2,
                                }}
                              >
                                {paso.how}
                              </span>
                              <span
                                className="text-xs"
                                style={{
                                  color: "#4f9dff",
                                  display: "block",
                                  marginTop: 2,
                                }}
                              >
                                Clave: {paso.cue}
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
                      <b>Si te atascas:</b> {habilidad.regression}
                    </div>
                    <div
                      className="text-xs mt-2 p-2"
                      style={{
                        color: "#ff5c7a",
                        background: "rgba(255,92,122,0.07)",
                        border: "1px solid rgba(255,92,122,0.25)",
                      }}
                    >
                      <b>Error común:</b> {habilidad.mistake}
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
                    {rondasPrimal} rondas de {segundosRondaPrimal(progress.rank)} segundos.
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
                    let etapa = sdcPrimalEtapa(primalFase, primalRonda, primalSegundos),
                      aviso = etapa === "posicion" || etapa === "prepara";
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
                          : etapa === "posicion"
                            ? "PONETE EN POSICIÓN"
                            : etapa === "prepara"
                              ? "PREPARATE · RONDA " + (primalRonda + 1) + "/" + rondasPrimal
                              : etapa === "descanso"
                                ? "Ronda " +
                                  primalRonda +
                                  "/" +
                                  rondasPrimal +
                                  " terminada · Descanso"
                                : "Ronda " + primalRonda + "/" + rondasPrimal + " · En marcha"}
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
                    max={
                      primalFase === "active"
                        ? segundosRondaPrimal(progress.rank)
                        : primalRonda === 0
                          ? 10
                          : descansoPrimal
                    }
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
                {rondasPrimal} rondas de {segundosRondaPrimal(progress.rank)} segundos. Dominá el
                más nuevo {vecesParaDominar} veces para descubrir el siguiente.
              </div>
              {primalHechasHoy >= primalSesionesHoy && (
                <div className="text-xs mb-3" style={{ color: "#ffb84f" }}>
                  Ya completaste tus {primalSesionesHoy} sesiones de hoy. Volvé mañana.
                </div>
              )}
              {movimientosPrimal.map((mov, i) => {
                let abierto = i < primal.unlockedCount,
                  esNuevo = i === masNuevo,
                  bloqueado = !abierto || primalHechasHoy >= primalSesionesHoy;
                return (
                  <button
                    key={mov.name}
                    onClick={() => !bloqueado && primalElegir(i)}
                    disabled={bloqueado}
                    className="w-full text-left py-2 px-3 mb-2 disabled:opacity-40"
                    style={{
                      background: abierto ? "rgba(62,207,142,0.08)" : "rgba(255,255,255,0.03)",
                      border: "1px solid " + (abierto ? "#3ecf8e55" : "rgba(255,255,255,0.1)"),
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {abierto ? (
                        <IconoPata size={16} color="#3ecf8e" />
                      ) : (
                        <IconoCandado size={16} color="#7a83a0" />
                      )}
                      <div
                        className="text-sm"
                        style={{
                          color: abierto ? "#e8ecf7" : "#5a6178",
                          fontWeight: abierto ? 600 : 400,
                        }}
                      >
                        {mov.name}
                      </div>
                      {esNuevo && (
                        <span className="text-xs ml-auto" style={{ color: "#ffb84f" }}>
                          {primal.masteryProgress}/{vecesParaDominar}
                        </span>
                      )}
                    </div>
                    {abierto && (
                      <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                        {mov.desc}
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
