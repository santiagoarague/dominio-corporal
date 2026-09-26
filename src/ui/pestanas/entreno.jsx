// Pestana Entreno: rutina de hoy, calentamiento, mapa del cuerpo, constancia, estiramiento,
// travesia y Umbral. Las variables de App que usa llegan como props.
import { sdcAvisaRespaldo, sdcRespaldoPosponer } from "../../logica/respaldo.js";
import {
  claveMesAnterior,
  nombreMes,
  resumenMes,
  tocaResumenMes,
  cerrarResumenMes,
} from "../../logica/mes.js";
import {
  tocaRepetirPrueba,
  diasDesdePrueba,
  historialPruebas,
  posponerPrueba,
} from "../../logica/mejora.js";
import { ejercicioDe } from "../../logica/rutina.js";
import { sistemaActivo } from "../../logica/sistemas.js";
import { sdcAnimoOn, sdcAnimoHoy, AnimoAntes } from "../animo.jsx";
import { sdcCalor, sdcCalorDer, Calentamiento } from "../calentamiento.jsx";
import { sdcPodia } from "../../logica/extras.js";
import { Tarjeta } from "../base.jsx";
import { IconoCheck } from "../iconos.jsx";
import { Plegable } from "../tarjetas.jsx";
import { TarjetaRutina } from "./entreno/rutina.jsx";
import { TarjetaEstiramiento } from "./entreno/estiramiento.jsx";
import { TarjetaConstancia } from "./entreno/constancia.jsx";
import { TarjetaCuerpo } from "./entreno/cuerpo.jsx";
import { TarjetaTravesia } from "./entreno/travesia.jsx";
import { TarjetaUmbral } from "./entreno/umbral.jsx";

// El mes que terminó, comparado con el de antes (si ese tuvo algo).
function ResumenMes({ mes, antes, onCerrar }) {
  let hayAntes = antes.dias > 0,
    numero = (n) => n.toLocaleString("es-AR"),
    filas = [
      ["Días entrenados", mes.dias, antes.dias],
      ["Días perfectos", mes.perfectos, antes.perfectos],
      ["Repeticiones", mes.reps, antes.reps],
      ["XP de tus rutinas", mes.xp, antes.xp],
      ["Primeras veces", mes.primeras, antes.primeras],
    ].filter((fila) => fila[1] || fila[2]),
    columnas = { display: "grid", gridTemplateColumns: "1fr auto 56px", columnGap: 12 };
  return (
    <Tarjeta accent="#9278ff" style={{ marginBottom: 16 }}>
      <div
        className="mb-1"
        style={{ fontFamily: "Chakra Petch, sans-serif", color: "#b9a5ff", fontWeight: 700 }}
      >
        Tu mes: {nombreMes(mes.clave)}
      </div>
      {hayAntes ? (
        <div className="text-xs mb-2" style={{ color: "#8a93ad" }}>
          Comparado con {nombreMes(antes.clave)}
        </div>
      ) : null}
      {filas.map(([nombre, ahora, previo]) => {
        let dif = ahora - previo;
        return (
          <div key={nombre} className="text-sm mb-1" style={columnas}>
            <span style={{ color: "#9aa4bd" }}>{nombre}</span>
            <span style={{ color: "#e8ecf7", textAlign: "right" }}>{numero(ahora)}</span>
            <span
              className="text-xs"
              style={{
                textAlign: "right",
                alignSelf: "center",
                fontWeight: 700,
                color: dif > 0 ? "#3ecf8e" : "#9aa4bd",
              }}
            >
              {hayAntes ? (dif > 0 ? "+" + numero(dif) : dif < 0 ? "−" + numero(-dif) : "=") : ""}
            </span>
          </div>
        );
      })}
      <button
        onClick={onCerrar}
        className="w-full py-2 text-xs mt-2"
        style={{ background: "#9278ff", color: "#0a0e1a", fontWeight: 700 }}
      >
        Entendido
      </button>
    </Tarjeta>
  );
}

export function PestanaEntreno({
  alternarPlegable,
  aplicar,
  avisar,
  bkDescargar,
  cerrarResumenSemana,
  dungeon,
  irAPrueba,
  lastWeekSummary,
  lifetimeReps,
  metaSemana,
  metaSesion,
  modalidad,
  player,
  plegado,
  profile,
  progress,
  sdcResponderPodia,
  sdcTotalHechas,
  setModo,
  today,
  tomarDescanso,
  ui,
  week,
  propsRutina,
  propsCuerpo,
  propsEstiramiento,
  propsConstancia,
  propsTravesia,
  propsUmbral,
}) {
  let pruebas = historialPruebas(player),
    conFecha = pruebas.length && pruebas[pruebas.length - 1].fecha;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {tocaRepetirPrueba(player, today.date) &&
        !today.completed &&
        !(today.doneModalities || []).length &&
        sdcTotalHechas() === 0 && (
          <Tarjeta accent="#3ecf8e" style={{ marginBottom: 16, order: -7 }}>
            <div className="text-sm mb-1" style={{ color: "#3ecf8e", fontWeight: 700 }}>
              ¿Cuánto mejoraste?
            </div>
            <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
              {conFecha
                ? "Pasaron " +
                  Math.floor(diasDesdePrueba(player, today.date) / 7) +
                  " semanas desde tu última prueba de aptitud."
                : "Hace un tiempo que no hacés la prueba de aptitud."}{" "}
              Repetila hoy, antes de entrenar, y compará.
            </div>
            <div className="flex gap-2">
              <button
                onClick={irAPrueba}
                className="flex-1 py-3 text-xs"
                style={{ minHeight: 48, background: "#3ecf8e", color: "#0a0e1a", fontWeight: 700 }}
              >
                Hacer la prueba
              </button>
              <button
                onClick={() =>
                  aplicar((partida) => ({
                    state: posponerPrueba(partida, today.date),
                    notices: ["Te recuerdo la prueba en una semana."],
                  }))
                }
                className="py-3 px-3 text-xs"
                style={{
                  minHeight: 48,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#9aa4bd",
                }}
              >
                Más tarde
              </button>
            </div>
          </Tarjeta>
        )}
      {sdcAvisaRespaldo(player) && (
        <Tarjeta accent="#ffb84f" style={{ marginBottom: 16, order: -3 }}>
          <div className="text-sm mb-1" style={{ color: "#ffb84f", fontWeight: 700 }}>
            Hacé un respaldo
          </div>
          <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
            Tu progreso vive solo en este dispositivo. Si borrás los datos del navegador o cambiás
            de teléfono se pierde todo: no hay copia en ningún servidor.
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => bkDescargar()}
              className="flex-1 py-3 text-xs"
              style={{
                minHeight: 48,
                background: "#ffb84f",
                color: "#0a0e1a",
                fontWeight: 700,
              }}
            >
              Descargar respaldo
            </button>
            <button
              onClick={() => {
                (sdcRespaldoPosponer(),
                  avisar((previos) => [
                    ...previos,
                    "Te vuelvo a recordar lo del respaldo en una semana.",
                  ]));
              }}
              className="py-3 px-3 text-xs"
              style={{
                minHeight: 48,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#9aa4bd",
              }}
            >
              Más tarde
            </button>
          </div>
        </Tarjeta>
      )}
      {(() => {
        let mes = tocaResumenMes(player, today.date);
        return mes ? (
          <ResumenMes
            mes={mes}
            antes={resumenMes(player, claveMesAnterior(mes.clave + "-01"))}
            onCerrar={() =>
              aplicar((partida) => ({ state: cerrarResumenMes(partida, mes.clave), notices: [] }))
            }
          />
        ) : null;
      })()}
      {lastWeekSummary && !lastWeekSummary.seen && (
        <Tarjeta accent="#ffb84f" style={{ marginBottom: 16 }}>
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              color: "#ffb84f",
              fontWeight: 700,
            }}
            className="mb-2"
          >
            Informe de la semana anterior
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Días entrenados</span>
              <span style={{ color: "#e8ecf7" }}>{lastWeekSummary.trained}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Días perfectos</span>
              <span style={{ color: "#e8ecf7" }}>{lastWeekSummary.fullDays}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>XP ganada</span>
              <span style={{ color: "#e8ecf7" }}>{lastWeekSummary.xp}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Travesías</span>
              <span style={{ color: "#e8ecf7" }}>{lastWeekSummary.dungeons}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Primal</span>
              <span style={{ color: "#e8ecf7" }}>{lastWeekSummary.primal}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#9aa4bd" }}>Estiramientos</span>
              <span style={{ color: "#e8ecf7" }}>{lastWeekSummary.stretches}</span>
            </div>
          </div>
          <button
            onClick={cerrarResumenSemana}
            className="w-full py-2 text-xs"
            style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
          >
            Entendido
          </button>
        </Tarjeta>
      )}
      <TarjetaConstancia
        {...propsConstancia}
        alternarPlegable={alternarPlegable}
        aplicar={aplicar}
        metaSemana={metaSemana}
        player={player}
        plegado={plegado}
        today={today}
        ui={ui}
      />
      <TarjetaTravesia {...propsTravesia} dungeon={dungeon} player={player} />
      {sistemaActivo(player, "dungeon") && dungeon.available && dungeon.completed && (
        <Tarjeta accent="#ff5c7a" style={{ marginBottom: 16 }}>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#ff5c7a" }}>
            <IconoCheck size={16} /> Travesía completada: {dungeon.name} (+{dungeon.rewardXP} XP)
          </div>
        </Tarjeta>
      )}
      {sistemaActivo(player, "dungeon") && !dungeon.available && (
        <div className="text-xs text-center mb-4" style={{ color: "#8a93ad" }}>
          Hoy no hay travesía. Volvé mañana.
        </div>
      )}
      <TarjetaUmbral
        {...propsUmbral}
        modalidad={modalidad}
        player={player}
        profile={profile}
        today={today}
      />
      {(function () {
        var grupos = ["squat", "pushup", "back", "abs"],
          podia = sdcPodia(player),
          pend = null;
        for (var i = 0; i < grupos.length; i++) {
          var ej = ejercicioDe(grupos[i], progress.rank, modalidad);
          if (ej && ej.name && podia[ej.name] === void 0) {
            pend = ej.name;
            break;
          }
        }
        if (!pend) return null;
        return (
          <Tarjeta accent="#b084f5" style={{ marginBottom: 16, order: -1 }}>
            <div className="text-xs uppercase mb-1" style={{ letterSpacing: 2, color: "#b084f5" }}>
              Una pregunta
            </div>
            <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 700 }}>
              {"¿Alguna vez hiciste " + pend + "?"}
            </div>
            <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
              Si nunca pudiste, el día que lo logres queda anotado.
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={function () {
                  sdcResponderPodia(pend, !1);
                }}
                className="py-2 text-xs"
                style={{
                  minHeight: 44,
                  background: "rgba(176,132,245,0.15)",
                  border: "1px solid #b084f5",
                  color: "#e8ecf7",
                  fontWeight: 600,
                }}
              >
                Nunca pude
              </button>
              <button
                onClick={function () {
                  sdcResponderPodia(pend, !0);
                }}
                className="py-2 text-xs"
                style={{
                  minHeight: 44,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#9aa4bd",
                }}
              >
                Ya podía
              </button>
            </div>
          </Tarjeta>
        );
      })()}
      <TarjetaCuerpo
        {...propsCuerpo}
        alternarPlegable={alternarPlegable}
        lifetimeReps={lifetimeReps}
        metaSemana={metaSemana}
        modalidad={modalidad}
        plegado={plegado}
        profile={profile}
        today={today}
        ui={ui}
        week={week}
      />
      {sdcAnimoOn(player) &&
        !today.completed &&
        !(today.doneModalities || []).length &&
        sdcTotalHechas() === 0 &&
        !sdcCalor(player).ini &&
        !sdcCalor(player).hecho &&
        (function (animo) {
          return !animo.no;
        })(sdcAnimoHoy(player)) && (
          <Tarjeta accent="#4f9dff" style={{ marginBottom: 16, order: -6 }}>
            <AnimoAntes
              player={player}
              aplicar={aplicar}
              mod={modalidad}
              onModo={setModo}
              descLibre={!week.restDayUsed}
              onDescanso={tomarDescanso}
            />
          </Tarjeta>
        )}
      {!today.completed && (
        <Plegable
          id="calentamiento"
          title="Calentamiento"
          accent="#ff8f5a"
          style={{ marginBottom: 16, order: -5 }}
          collapsed={
            ui && ui.collapsed && ui.collapsed.calentamiento !== void 0
              ? plegado("calentamiento")
              : !1
          }
          onToggle={alternarPlegable}
          right={sdcCalorDer(player, modalidad, metaSesion)}
        >
          <Calentamiento
            player={player}
            mod={modalidad}
            metas={metaSesion}
            aplicar={aplicar}
            onModo={setModo}
            sinSeries={sdcTotalHechas() === 0}
          />
        </Plegable>
      )}
      <TarjetaRutina
        {...propsRutina}
        alternarPlegable={alternarPlegable}
        aplicar={aplicar}
        lifetimeReps={lifetimeReps}
        metaSesion={metaSesion}
        modalidad={modalidad}
        player={player}
        plegado={plegado}
        profile={profile}
        progress={progress}
        sdcTotalHechas={sdcTotalHechas}
        setModo={setModo}
        today={today}
        tomarDescanso={tomarDescanso}
        week={week}
      />
      <TarjetaEstiramiento
        {...propsEstiramiento}
        alternarPlegable={alternarPlegable}
        aplicar={aplicar}
        player={player}
        plegado={plegado}
        today={today}
        week={week}
      />
    </div>
  );
}
