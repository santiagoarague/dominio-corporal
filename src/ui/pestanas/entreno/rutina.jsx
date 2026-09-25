// Rutina de hoy: las cuatro filas con sus series, el metronomo, el descanso y el registro; ya registrada, el resumen del dia.
import { sdcAnimoOn, sdcAbrirCard, AnimoDespues } from "../../animo.jsx";
import { modalidades } from "../../../datos/ejercicios.js";
import {
  modalidadesDe,
  nombreEjercicio,
  alternativaEjercicio,
  sdcGuia,
} from "../../../logica/rutina.js";
import { sdcDescRango, sdcVistos, sdcGymUlt, sdcSugKg } from "../../../logica/extras.js";
import { sdcTempoMod, Metronomo } from "../../metronomo.jsx";
import { sdcModDia } from "../../../logica/tienda.js";
import { regresiones } from "../../../logica/primal.js";
import { Tarjeta } from "../../base.jsx";
import { Plegable } from "../../tarjetas.jsx";
import { IconoCheck, IconoDestello } from "../../iconos.jsx";
import { BarraDescanso } from "../../descanso.jsx";
import { FilaEjercicio } from "../../ejercicio.jsx";

export function TarjetaRutina({
  alternarPlegable,
  aplicar,
  colorDelRango,
  confirmarDeshacer,
  descansando,
  descansoBase,
  deshacerRegistro,
  elegirModalidad,
  lifetimeReps,
  metaDia,
  metaSesion,
  metronomoOn,
  mmNueva,
  modalidad,
  modo,
  player,
  plegado,
  profile,
  progress,
  registrar,
  sdcAjustar,
  sdcAjuste,
  sdcConfDesc,
  sdcDesc,
  sdcDescIni,
  sdcEjNom,
  sdcKgSet,
  sdcKgUsar,
  sdcKgVer,
  sdcMarcaOk,
  sdcMarcarTodo,
  sdcModOk,
  sdcSer,
  sdcSerie,
  sdcSetConfDesc,
  sdcSetModOk,
  sdcTotalHechas,
  sdcTotalMeta,
  setConfirmarDeshacer,
  setDescansando,
  setMetaSesion,
  setMetronomoOn,
  setModo,
  setPestana,
  today,
  tomarDescanso,
  week,
}) {
  return today.completed ? (
    <Tarjeta accent={colorDelRango} style={{ marginBottom: 16, order: -1 }}>
      {sdcAnimoOn(player) && today.mode !== "rest" && (
        <AnimoDespues
          player={player}
          aplicar={aplicar}
          onPrueba={() => {
            (setPestana("profile"), aplicar((partida) => sdcAbrirCard(partida, "aptitud")));
          }}
        />
      )}
      <div className="flex items-center gap-2 mb-1">
        <IconoCheck size={16} color={colorDelRango} />
        <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
          Misión de hoy completada
        </div>
      </div>
      <div className="text-xs" style={{ color: "#9aa4bd" }}>
        Modo:{" "}
        {today.mode === "normal"
          ? "Normal"
          : today.mode === "recovery"
            ? "Recuperación"
            : today.mode === "rest"
              ? "Descanso"
              : "Prueba"}{" "}
        · +{today.xpEarned} XP hoy
      </div>
      {today.fullCompletion && (
        <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "#ffb84f" }}>
          <IconoDestello size={12} /> Día perfecto — hoy podés cruzar tu Umbral si está disponible
        </div>
      )}
      {(() => {
        let repsSesion = today.reps || {},
          records = player.records || {},
          semana = (week && week.reps) || {},
          filas = [
            ["squat", "Piernas"],
            ["pushup", "Empuje"],
            ["back", "Tracción"],
            ["abs", "Core"],
          ],
          tot = filas.reduce((suma, fila) => suma + (repsSesion[fila[0]] || 0), 0);
        if (!tot) return null;
        let sem = filas.reduce((suma, fila) => suma + (semana[fila[0]] || 0), 0);
        return (
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
              Lo que hiciste hoy: <b style={{ color: "#e8ecf7" }}>{tot} reps</b>
            </div>
            {filas.map((fila) => {
              let reps = repsSesion[fila[0]] || 0,
                mejor = records[fila[0]] || 0,
                esRecord = reps > 0 && reps >= mejor && (lifetimeReps[fila[0]] || 0) > reps;
              return (
                <div key={fila[0]} className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: esRecord ? "#ffb84f" : "#8a93ad" }}>
                    {fila[1]}
                    {esRecord ? " ★ récord" : ""}
                  </span>
                  <span style={{ color: "#e8ecf7" }}>
                    {reps}
                    <span style={{ color: "#7a83a0" }}> / {mejor} máx</span>
                  </span>
                </div>
              );
            })}
            <div className="text-xs mt-2" style={{ color: "#7a83a0" }}>
              Esta semana: {sem} reps en {week.trained || 0}{" "}
              {(week.trained || 0) === 1 ? "sesión" : "sesiones"}
            </div>
          </div>
        );
      })()}
      {(() => {
        let hechas = today.doneModalities || [],
          restan = modalidadesDe(profile).filter((mod) => !hechas.includes(mod));
        if (!restan.length) return null;
        return (
          <div className="mt-3">
            <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
              {"Añade otro estilo hoy y esa sesión te dará +" + 25 * hechas.length + "% de XP:"}
            </div>
            <div className="flex gap-2">
              {restan.map((mod) => (
                <button
                  key={mod}
                  onClick={() => mmNueva(mod)}
                  className="flex-1 py-2 text-xs"
                  style={{
                    background: "rgba(79,157,255,0.12)",
                    border: "1px solid #4f9dff",
                    color: "#4f9dff",
                    fontWeight: 600,
                  }}
                >
                  + {mod === "bodyweight" ? "Peso corporal" : mod === "gym" ? "Gimnasio" : "Flow"}
                </button>
              ))}
            </div>
          </div>
        );
      })()}
      {player.undoSnapshot &&
        player.undoSnapshot.date === today.date &&
        (confirmarDeshacer ? (
          <div className="text-xs text-center mt-3" style={{ color: "#9aa4bd" }}>
            Se revertirá el XP, los puntos y los récords de esta rutina.{" "}
            <button onClick={deshacerRegistro} className="underline" style={{ color: "#ff5c7a" }}>
              Sí, deshacer
            </button>{" "}
            <button onClick={() => setConfirmarDeshacer(!1)} className="underline">
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmarDeshacer(!0)}
            className="w-full py-2 text-xs mt-3"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#e8ecf7",
              fontWeight: 600,
            }}
          >
            Deshacer registro de hoy
          </button>
        ))}
    </Tarjeta>
  ) : (
    <Plegable
      id="rutina"
      title="Rutina de hoy"
      accent={colorDelRango}
      style={{ marginBottom: 16, order: -4 }}
      collapsed={plegado("rutina")}
      onToggle={alternarPlegable}
      right={`${(modalidades.find((mod) => mod.id === modalidad) || modalidades[0]).name}`}
    >
      <div className="flex mb-3" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
        <button
          onClick={() => setModo("normal")}
          className="flex-1 py-2 text-xs"
          style={{
            background: modo === "normal" ? colorDelRango : "transparent",
            color: modo === "normal" ? "#0a0e1a" : "#8a93ad",
            fontWeight: 600,
            minHeight: 44,
          }}
        >
          Normal
        </button>
        <button
          onClick={() => setModo("recovery")}
          className="flex-1 py-2 text-xs"
          style={{
            background: modo === "recovery" ? colorDelRango : "transparent",
            color: modo === "recovery" ? "#0a0e1a" : "#8a93ad",
            fontWeight: 600,
            minHeight: 44,
          }}
        >
          Recuperación
        </button>
      </div>
      {modalidadesDe(profile).length > 1 ? (
        <div className="mb-2">
          <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
            ¿Con qué entrenás hoy?
          </div>
          <div className="grid grid-cols-3 gap-1">
            {modalidadesDe(profile).map((mod) => {
              let datos = modalidades.find((otra) => otra.id === mod),
                activa = modalidad === mod;
              return (
                <button
                  key={mod}
                  onClick={() => elegirModalidad(mod)}
                  className="py-2 text-xs"
                  style={{
                    background: activa ? "#4f9dff" : "rgba(255,255,255,0.03)",
                    border: "1px solid " + (activa ? "#4f9dff" : "rgba(255,255,255,0.12)"),
                    color: activa ? "#0a0e1a" : "#8a93ad",
                    fontWeight: 600,
                  }}
                >
                  {datos.id === "bodyweight"
                    ? "Peso corporal"
                    : datos.id === "gym"
                      ? "Gimnasio"
                      : "Flow"}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-xs mb-1" style={{ color: "#4f9dff" }}>
          Modalidad de hoy:{" "}
          {(modalidades.find((mod) => mod.id === modalidad) || modalidades[0]).name}
        </div>
      )}
      <div className="text-xs mb-2" style={{ color: "#7a83a0" }}>
        {sdcDescRango(progress.rank, profile)}
      </div>
      {(() => {
        let modDia = sdcModDia(modalidad, today.date);
        if (!modDia) return null;
        return (
          <div
            className="p-2 mb-2"
            style={{
              background: sdcModOk ? "rgba(62,207,142,0.12)" : "rgba(124,92,255,0.10)",
              border: "1px solid " + (sdcModOk ? "#3ecf8e" : "#7c5cff"),
            }}
          >
            <div
              className="text-xs"
              style={{
                color: sdcModOk ? "#3ecf8e" : "#b9a5ff",
                fontFamily: "Chakra Petch, sans-serif",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              HOY · {modDia.n} · +{Math.round(modDia.x * 100)}% XP
            </div>
            <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
              {modDia.d}
            </div>
            <button
              onClick={() => {
                let pendiente = !sdcModOk;
                (sdcSetModOk(pendiente), sdcMarcaOk(sdcSer, sdcAjuste, pendiente));
              }}
              className="w-full py-2 text-xs mt-2"
              style={{
                background: sdcModOk ? "#3ecf8e" : "rgba(255,255,255,0.05)",
                border: "1px solid " + (sdcModOk ? "#3ecf8e" : "rgba(255,255,255,0.2)"),
                color: sdcModOk ? "#0a0e1a" : "#8a93ad",
                fontWeight: 600,
                minHeight: 44,
              }}
            >
              {sdcModOk ? "✓ Lo cumplí" : "Marcar que lo cumplí"}
            </button>
          </div>
        );
      })()}
      <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
        Tocá cada serie cuando la termines. Solo cuenta lo que marcás, y el descanso empieza
        automáticamente.
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          onClick={() => setMetronomoOn((encendido) => !encendido)}
          className="py-2 text-xs"
          style={{
            background: metronomoOn ? "rgba(79,157,255,0.15)" : "rgba(255,255,255,0.03)",
            border: "1px solid " + (metronomoOn ? "#4f9dff" : "rgba(255,255,255,0.12)"),
            color: metronomoOn ? "#4f9dff" : "#8a93ad",
            minHeight: 44,
          }}
        >
          Metrónomo {metronomoOn ? "ON" : "OFF"}
        </button>
        <button
          onClick={sdcMarcarTodo}
          className="py-2 text-xs"
          style={{
            background: "rgba(255,184,79,0.1)",
            border: "1px solid #ffb84f",
            color: "#ffb84f",
            minHeight: 44,
          }}
        >
          MARCAR TODAS
        </button>
      </div>
      <div className="text-xs mb-2" style={{ color: "#7a83a0" }}>
        El metrónomo marca el tempo de cada repetición con un pitido, para que no aceleres. No
        cuenta reps: eso lo marcás vos al tocar cada serie.
      </div>
      <Metronomo active={metronomoOn} tempo={sdcTempoMod(sdcModDia(modalidad, today.date))} />
      {descansando && (
        <BarraDescanso
          seconds={sdcDesc || descansoBase[profile.focusProfile] || 60}
          ini={sdcDescIni}
          onSkip={() => setDescansando(!1)}
        />
      )}
      <FilaEjercicio
        label={nombreEjercicio(progress.rank, profile.classification, "squat", modalidad)}
        value={metaSesion.squat}
        base={metaDia.squat}
        min={0}
        max={Math.round(modo === "recovery" ? metaDia.squat * 0.5 : metaDia.squat * 1.5)}
        onChange={(valor) => setMetaSesion((previa) => ({ ...previa, squat: valor }))}
        tip={alternativaEjercicio(progress.rank, "squat", modalidad) || regresiones.squat}
        guia={sdcGuia(progress.rank, "squat", modalidad)}
        abrir={!sdcVistos(player)[sdcEjNom("squat")]}
        onWeight={modalidad === "gym" ? (serie, texto) => sdcKgSet("squat", serie, texto) : void 0}
        kgv={modalidad === "gym" ? (serie) => sdcKgVer("squat", serie) : void 0}
        kgPrev={
          modalidad === "gym" ? (sdcGymUlt(player)[sdcEjNom("squat")] || {}).kgs || null : null
        }
        sug={
          modalidad === "gym"
            ? {
                s: sdcSugKg(player, "squat", sdcEjNom("squat")),
                fn: (kg) => sdcKgUsar("squat", kg),
              }
            : null
        }
        done={sdcSer.squat}
        onSet={(marcadas) => sdcSerie("squat", marcadas)}
        accent={colorDelRango}
        aj={sdcAjuste.squat}
        onAj={(serie, reps) => sdcAjustar("squat", serie, reps)}
      />
      <FilaEjercicio
        label={nombreEjercicio(progress.rank, profile.classification, "pushup", modalidad)}
        value={metaSesion.pushup}
        base={metaDia.pushup}
        min={0}
        max={Math.round(modo === "recovery" ? metaDia.pushup * 0.5 : metaDia.pushup * 1.5)}
        onChange={(valor) => setMetaSesion((previa) => ({ ...previa, pushup: valor }))}
        tip={alternativaEjercicio(progress.rank, "pushup", modalidad) || regresiones.pushup}
        guia={sdcGuia(progress.rank, "pushup", modalidad)}
        abrir={!sdcVistos(player)[sdcEjNom("pushup")]}
        onWeight={modalidad === "gym" ? (serie, texto) => sdcKgSet("pushup", serie, texto) : void 0}
        kgv={modalidad === "gym" ? (serie) => sdcKgVer("pushup", serie) : void 0}
        kgPrev={
          modalidad === "gym" ? (sdcGymUlt(player)[sdcEjNom("pushup")] || {}).kgs || null : null
        }
        sug={
          modalidad === "gym"
            ? {
                s: sdcSugKg(player, "pushup", sdcEjNom("pushup")),
                fn: (kg) => sdcKgUsar("pushup", kg),
              }
            : null
        }
        done={sdcSer.pushup}
        onSet={(marcadas) => sdcSerie("pushup", marcadas)}
        accent={colorDelRango}
        aj={sdcAjuste.pushup}
        onAj={(serie, reps) => sdcAjustar("pushup", serie, reps)}
      />
      <FilaEjercicio
        label={nombreEjercicio(progress.rank, profile.classification, "back", modalidad)}
        value={metaSesion.back}
        base={metaDia.back}
        min={0}
        max={Math.round(modo === "recovery" ? metaDia.back * 0.5 : metaDia.back * 1.5)}
        onChange={(valor) => setMetaSesion((previa) => ({ ...previa, back: valor }))}
        tip={alternativaEjercicio(progress.rank, "back", modalidad) || regresiones.back}
        guia={sdcGuia(progress.rank, "back", modalidad)}
        abrir={!sdcVistos(player)[sdcEjNom("back")]}
        onWeight={modalidad === "gym" ? (serie, texto) => sdcKgSet("back", serie, texto) : void 0}
        kgv={modalidad === "gym" ? (serie) => sdcKgVer("back", serie) : void 0}
        kgPrev={
          modalidad === "gym" ? (sdcGymUlt(player)[sdcEjNom("back")] || {}).kgs || null : null
        }
        sug={
          modalidad === "gym"
            ? {
                s: sdcSugKg(player, "back", sdcEjNom("back")),
                fn: (kg) => sdcKgUsar("back", kg),
              }
            : null
        }
        done={sdcSer.back}
        onSet={(marcadas) => sdcSerie("back", marcadas)}
        accent={colorDelRango}
        aj={sdcAjuste.back}
        onAj={(serie, reps) => sdcAjustar("back", serie, reps)}
      />
      <FilaEjercicio
        label={nombreEjercicio(progress.rank, profile.classification, "abs", modalidad)}
        value={metaSesion.abs}
        base={metaDia.abs}
        min={0}
        max={Math.round(modo === "recovery" ? metaDia.abs * 0.5 : metaDia.abs * 1.5)}
        onChange={(valor) => setMetaSesion((previa) => ({ ...previa, abs: valor }))}
        tip={alternativaEjercicio(progress.rank, "abs", modalidad) || regresiones.abs}
        guia={sdcGuia(progress.rank, "abs", modalidad)}
        abrir={!sdcVistos(player)[sdcEjNom("abs")]}
        onWeight={modalidad === "gym" ? (serie, texto) => sdcKgSet("abs", serie, texto) : void 0}
        kgv={modalidad === "gym" ? (serie) => sdcKgVer("abs", serie) : void 0}
        kgPrev={modalidad === "gym" ? (sdcGymUlt(player)[sdcEjNom("abs")] || {}).kgs || null : null}
        sug={
          modalidad === "gym"
            ? {
                s: sdcSugKg(player, "abs", sdcEjNom("abs")),
                fn: (kg) => sdcKgUsar("abs", kg),
              }
            : null
        }
        done={sdcSer.abs}
        onSet={(marcadas) => sdcSerie("abs", marcadas)}
        accent={colorDelRango}
        aj={sdcAjuste.abs}
        onAj={(serie, reps) => sdcAjustar("abs", serie, reps)}
      />
      <button
        onClick={registrar}
        className="w-full py-3 text-sm mt-4"
        style={{ background: colorDelRango, color: "#0a0e1a", fontWeight: 700 }}
      >
        Completar rutina · {sdcTotalHechas()}/{sdcTotalMeta()} reps
      </button>
      <div style={{ height: 22 }} />
      {sdcConfDesc ? (
        <div
          className="p-2"
          style={{ border: "1px solid #ffb84f", background: "rgba(255,184,79,0.08)" }}
        >
          <div className="text-xs mb-2" style={{ color: "#ffb84f" }}>
            El día de descanso no da XP y solo tenés uno por semana. ¿Seguro?
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                (sdcSetConfDesc(!1), tomarDescanso());
              }}
              className="flex-1 py-2 text-xs"
              style={{ background: "#ffb84f", color: "#0a0e1a", fontWeight: 700 }}
            >
              Sí, usarlo
            </button>
            <button
              onClick={() => sdcSetConfDesc(!1)}
              className="flex-1 py-2 text-xs"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#e8ecf7",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => sdcSetConfDesc(!0)}
          disabled={week.restDayUsed}
          className="w-full py-2 text-xs disabled:opacity-30"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#9aa4bd",
          }}
        >
          {week.restDayUsed ? "Día de descanso ya usado esta semana" : "Usar mi día de descanso"}
        </button>
      )}
    </Plegable>
  );
}
