// Fila de un ejercicio de la rutina.
import { useState, useEffect } from "react";
import { IconoMas, IconoCheck, IconoMenos, IconoFlecha, IconoReloj } from "./iconos.jsx";
import { sdcKgTxt } from "../logica/extras.js";
import {
  sdcNSets,
  sdcSegs,
  sdcSplit,
  sdcSostenEstado,
  sdcSostenPrep,
  sdcPrimalSon,
  sdcMarcadas,
} from "../logica/series.js";
import { BarraXp } from "./base.jsx";
import { usePantallaSi } from "./pantalla.js";

function sdcGuiaLin(titulo, texto) {
  return texto ? (
    <div style={{ marginBottom: 5 }}>
      <span style={{ color: "#ffb84f", fontWeight: 700 }}>{titulo}: </span>
      {texto}
    </div>
  ) : null;
}
// El reloj de un sostén en marcha: la preparación, los segundos que quedan y sus botones.
function PanelSosten({ estado, total, pausado, onYa, onCancelar, onPausa, onTerminar }) {
  let preparando = estado.fase === "prep",
    tono = pausado ? "#8a93ad" : preparando ? "#ffb84f" : "#4f9dff",
    boton = {
      minHeight: 48,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#e8ecf7",
      fontWeight: 600,
    };
  return (
    <div
      className="mt-2 p-3 text-center"
      style={{ border: "1px solid " + tono, background: "rgba(255,255,255,0.03)" }}
    >
      <div className="text-xs uppercase" style={{ letterSpacing: 2, fontWeight: 700, color: tono }}>
        {pausado ? "En pausa" : preparando ? "Ponete en posición" : "Sostené"}
      </div>
      <div
        style={{
          fontFamily: "Chakra Petch, sans-serif",
          fontSize: 48,
          lineHeight: 1.1,
          color: tono,
        }}
      >
        {estado.quedan}
      </div>
      {!preparando && (
        <div className="mt-1">
          <BarraXp value={estado.hecho} max={total} color="#4f9dff" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 mt-3">
        {preparando ? (
          <>
            <button onClick={onYa} className="text-sm" style={boton}>
              Ya estoy →
            </button>
            <button onClick={onCancelar} className="text-sm" style={boton}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button onClick={onPausa} className="text-sm" style={boton}>
              {pausado ? "Seguir →" : "Pausa"}
            </button>
            <button onClick={onTerminar} className="text-sm" style={boton}>
              Terminé antes
            </button>
          </>
        )}
      </div>
    </div>
  );
}
function FilaEjercicio({
  label,
  value,
  base,
  min,
  max,
  onChange,
  tip,
  onWeight,
  marcadas: marcadasGuardadas,
  onSerie,
  accent,
  aj: ajustes,
  onAj,
  kgv,
  kgPrev,
  sug,
  guia,
  abrir,
  sostenLibre,
  onSosten,
}) {
  let paso = Math.max(1, Math.round(base * 0.1)),
    [guiaTocada, setGuiaTocada] = useState(null),
    guiaAbierta = guiaTocada === null ? !!abrir : guiaTocada,
    nSeries = sdcNSets(value),
    series = sdcSplit(value, nSeries),
    repsSerie = function (i, porDefecto) {
      return ajustes && ajustes[i] !== void 0 ? ajustes[i] : porDefecto;
    },
    marcadas = sdcMarcadas(marcadasGuardadas, nSeries),
    hechas = series.reduce(function (suma, reps, i) {
      return marcadas[i] ? suma + repsSerie(i, reps) : suma;
    }, 0),
    color = accent || "#4f9dff",
    completa = marcadas.every(Boolean) && value > 0,
    segs = sdcSegs(tip),
    [sdcAbre, sdcSetAbre] = useState(!1),
    [sdcCierra, sdcSetCierra] = useState(() => !!(completa && onSerie)),
    // El reloj de un sostén: { ini, pz, prep, total, serie } mientras corre.
    [reloj, setReloj] = useState(null),
    [, setTic] = useState(0),
    [marcarLuego, setMarcarLuego] = useState(null),
    estadoReloj = reloj
      ? sdcSostenEstado(reloj.ini, reloj.pz, reloj.prep, reloj.total, Date.now())
      : null,
    // La serie pendiente: la primera sin marcar.
    serieActual = marcadas.indexOf(!1) < 0 ? nSeries : marcadas.indexOf(!1),
    segsPendiente =
      segs > 0 && serieActual < nSeries ? repsSerie(serieActual, series[serieActual]) * segs : 0,
    marcaReloj = estadoReloj && !reloj.pz ? estadoReloj.fase + estadoReloj.quedan : "";
  useEffect(
    function () {
      (setGuiaTocada(null), sdcSetAbre(!1), reloj && cancelarSosten());
    },
    [label],
  );
  usePantallaSi(!!reloj);
  useEffect(
    function () {
      if (!reloj || reloj.pz) return;
      var cada = setInterval(function () {
        setTic((previo) => previo + 1);
      }, 250);
      return function () {
        clearInterval(cada);
      };
    },
    [reloj],
  );
  // Un sonido por cambio: 3-2-1 antes de arrancar y antes de terminar, otro al arrancar.
  useEffect(
    function () {
      if (!marcaReloj) return;
      if (estadoReloj.fase === "fin") return terminarSosten(reloj.total);
      if (estadoReloj.fase === "sosten" && estadoReloj.quedan === reloj.total)
        sdcPrimalSon("arranca");
      else if (estadoReloj.quedan <= 3) sdcPrimalSon("tic");
    },
    [marcaReloj],
  );
  // Si la serie se marca a mano mientras el reloj corre, el reloj se va.
  useEffect(
    function () {
      reloj && serieActual !== reloj.serie && cancelarSosten();
    },
    [serieActual],
  );
  // Terminé antes: primero se corrigen las reps de la serie y, ya con ese valor, se
  // marca. Marcarla en el mismo toque guardaria el ajuste viejo.
  useEffect(
    function () {
      if (!marcarLuego) return;
      if (repsSerie(marcarLuego.serie, series[marcarLuego.serie]) !== marcarLuego.reps) return;
      (setMarcarLuego(null), onSerie(marcarLuego.serie, !0));
    },
    [marcarLuego, ajustes],
  );
  function empezarSosten() {
    (setReloj({
      ini: Date.now(),
      pz: 0,
      prep: sdcSostenPrep,
      total: segsPendiente,
      serie: serieActual,
    }),
      onSosten && onSosten(!0));
  }
  function cancelarSosten() {
    (setReloj(null), onSosten && onSosten(!1));
  }
  function pausarSosten() {
    setReloj(
      reloj.pz
        ? { ...reloj, ini: reloj.ini + (Date.now() - reloj.pz), pz: 0 }
        : { ...reloj, pz: Date.now() },
    );
  }
  function yaEstoy() {
    setReloj({ ...reloj, ini: Date.now() - reloj.prep * 1e3, pz: 0 });
  }
  function terminarSosten(segundos) {
    var serie = reloj.serie,
      meta = repsSerie(serie, series[serie]),
      reps = Math.min(meta, Math.floor(segundos / segs));
    cancelarSosten();
    if (reps < 1) return;
    sdcPrimalSon("fin");
    reps < meta && onAj
      ? (onAj(serie, reps), setMarcarLuego({ serie: serie, reps: reps }))
      : onSerie(serie, !0);
  }
  useEffect(
    function () {
      if (completa && onSerie) {
        if (sdcCierra) return;
        var espera = setTimeout(function () {
          sdcSetCierra(!0);
        }, 1200);
        return function () {
          clearTimeout(espera);
        };
      }
      (sdcCierra && sdcSetCierra(!1), sdcAbre && sdcSetAbre(!1));
    },
    [completa],
  );
  if (completa && onSerie && sdcCierra && !sdcAbre)
    return (
      <button
        onClick={function () {
          sdcSetAbre(!0);
        }}
        className="w-full flex items-center justify-between gap-2 py-2 text-left"
        style={{
          minHeight: 48,
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="flex items-center gap-2 text-sm" style={{ color: "#9aa4bd" }}>
          <IconoCheck size={16} color="#3ecf8e" />
          {label}
        </span>
        <span
          className="flex items-center gap-1 text-xs"
          style={{ color: "#3ecf8e", whiteSpace: "nowrap" }}
        >
          {segs > 0 ? hechas * segs + " s" : hechas + " reps"}
          <IconoFlecha size={12} color="#8a93ad" />
        </span>
      </button>
    );
  return (
    <div className="py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {completa && onSerie && sdcCierra && sdcAbre ? (
        <button
          onClick={function () {
            sdcSetAbre(!1);
          }}
          className="w-full flex items-center gap-2 text-xs mb-1 text-left"
          style={{ minHeight: 44, background: "transparent", border: "none", color: "#3ecf8e" }}
        >
          <IconoCheck size={12} color="#3ecf8e" />
          Hecho · ocultar
        </button>
      ) : null}
      <div className="flex items-center justify-between gap-3" style={{ flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 130px", minWidth: 0 }}>
          <div className="flex items-center gap-1">
            <span className="text-sm" style={{ color: "#e8ecf7" }}>
              {label}
            </span>
          </div>
          <div
            className="flex items-center text-xs"
            style={{ color: "#9aa4bd", flexWrap: "wrap", columnGap: 8 }}
          >
            <span>
              Meta: {value} reps{segs > 0 ? " · " + value * segs + "s de sostén" : ""}
            </span>
            {(tip || guia) && (
              <button
                onClick={() => setGuiaTocada(!guiaAbierta)}
                className="text-xs"
                style={{
                  color: "#ffb84f",
                  whiteSpace: "nowrap",
                  padding: "15px 8px",
                  margin: "-15px -8px",
                }}
                aria-label="Cómo se hace"
              >
                {guia ? "¿Cómo se hace?" : "💡 alternativa"}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2" style={{ marginLeft: "auto" }}>
          <button
            onClick={() => onChange(Math.max(min, value - paso))}
            className="flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            aria-label="Bajar meta"
          >
            <IconoMenos size={14} color="#e8ecf7" />
          </button>
          <div
            className="text-center"
            style={{
              width: 36,
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 18,
              color: "#e8ecf7",
            }}
          >
            {value}
          </div>
          <button
            onClick={() => onChange(Math.min(max, value + paso))}
            className="flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            aria-label="Subir meta"
          >
            <IconoMas size={14} color="#e8ecf7" />
          </button>
        </div>
      </div>
      {onSerie && (
        <div className="flex gap-2 mt-2">
          {series.map(function (reps, i) {
            var efectivas = repsSerie(i, reps),
              hecha = marcadas[i],
              ajustable = i === serieActual && !!onAj,
              contenido =
                segs > 0 ? (
                  <div>
                    <div>{hecha ? "✓ " + efectivas : efectivas}</div>
                    <div style={{ fontSize: 14, fontWeight: 400, opacity: 0.85 }}>
                      {efectivas * segs}s
                    </div>
                  </div>
                ) : hecha ? (
                  "✓ " + efectivas
                ) : (
                  efectivas
                );
            if (ajustable)
              return (
                <div
                  key={i}
                  className="sdc-chip flex-1 flex items-stretch"
                  style={{
                    border: "1px solid rgba(255,255,255,0.28)",
                    background: "rgba(255,255,255,0.04)",
                    minHeight: 48,
                  }}
                >
                  <button
                    onClick={function () {
                      onAj(i, efectivas - 1);
                    }}
                    style={{ width: 28, color: "#9aa4bd", fontSize: 17 }}
                    aria-label={"Una repetición menos en la serie " + (i + 1)}
                  >
                    −
                  </button>
                  <button
                    onClick={function () {
                      onSerie(i, !0);
                    }}
                    className="flex-1"
                    aria-label={
                      "Marcar serie " + (i + 1) + " de " + nSeries + " con " + efectivas + " reps"
                    }
                    style={{
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#e8ecf7",
                    }}
                  >
                    {contenido}
                  </button>
                  <button
                    onClick={function () {
                      onAj(i, efectivas + 1);
                    }}
                    style={{ width: 28, color: "#9aa4bd", fontSize: 17 }}
                    aria-label={"Una repetición más en la serie " + (i + 1)}
                  >
                    +
                  </button>
                </div>
              );
            return (
              <button
                key={i}
                onClick={function () {
                  onSerie(i, !hecha);
                }}
                className="sdc-chip flex-1 py-3"
                aria-label={
                  "Serie " + (i + 1) + " de " + nSeries + (hecha ? ", hecha" : ", pendiente")
                }
                style={{
                  background: hecha ? color : "rgba(255,255,255,0.04)",
                  border: "1px solid " + (hecha ? color : "rgba(255,255,255,0.18)"),
                  color: hecha ? "#0a0e1a" : "#8a93ad",
                  fontFamily: "Chakra Petch, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  minHeight: 48,
                }}
              >
                {contenido}
              </button>
            );
          })}
        </div>
      )}
      {onSerie && segsPendiente > 0 && !reloj && (
        <button
          onClick={empezarSosten}
          disabled={sostenLibre === !1}
          className="w-full mt-2 flex items-center justify-center gap-2 text-sm disabled:opacity-40"
          style={{
            minHeight: 48,
            background: "rgba(79,157,255,0.1)",
            border: "1px solid #4f9dff",
            color: "#4f9dff",
            fontWeight: 700,
          }}
        >
          <IconoReloj size={16} color="#4f9dff" />
          Sostener {segsPendiente} s
        </button>
      )}
      {reloj && estadoReloj && (
        <PanelSosten
          estado={estadoReloj}
          total={reloj.total}
          pausado={!!reloj.pz}
          onYa={yaEstoy}
          onCancelar={cancelarSosten}
          onPausa={pausarSosten}
          onTerminar={() => terminarSosten(estadoReloj.hecho)}
        />
      )}
      {onWeight && (
        <>
          <div className="flex gap-2 mt-2">
            {series.map(function (reps, i) {
              return (
                <input
                  key={i}
                  type="text"
                  inputMode="decimal"
                  value={kgv ? kgv(i) : ""}
                  onChange={(evento) => onWeight(i, evento.target.value.replace(/[^0-9.,]/g, ""))}
                  placeholder="kg"
                  className="flex-1 px-1 py-2 text-center text-xs"
                  style={{
                    width: 0,
                    minWidth: 0,
                    minHeight: 44,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e8ecf7",
                  }}
                  aria-label={"Kilos de la serie " + (i + 1) + " de " + nSeries}
                />
              );
            })}
          </div>
          <div className="text-xs mt-1" style={{ color: "#8a93ad" }}>
            {kgPrev && kgPrev.length ? (
              <>La última vez: {kgPrev.map(sdcKgTxt).join(" · ")} kg</>
            ) : (
              "Kilos de cada serie. Podés subirlos serie a serie."
            )}
          </div>
          {sug && sug.s ? (
            <button
              onClick={() => sug.fn(sug.s.kg)}
              className="text-xs text-left"
              style={{
                display: "block",
                width: "100%",
                color: "#3ecf8e",
                fontWeight: 600,
                padding: "12px 0",
                minHeight: 44,
                marginBottom: -6,
              }}
            >
              {sug.s.sube
                ? "Hoy probá " + sdcKgTxt(sug.s.kg) + " kg →"
                : "Repetí " + sdcKgTxt(sug.s.kg) + " kg y cerralo →"}
            </button>
          ) : null}
        </>
      )}
      {onSerie && (
        <div className="text-xs mt-1" style={{ color: completa ? "#3ecf8e" : "#8a93ad" }}>
          {completa
            ? "✓ Series hechas · " +
              hechas +
              " reps" +
              (segs > 0 ? " (" + hechas * segs + "s)" : "")
            : "Llevás " +
              hechas +
              " de " +
              value +
              " reps" +
              (segs > 0 ? " (" + hechas * segs + "s)" : "")}
        </div>
      )}
      {guiaAbierta && (tip || guia) && (
        <div
          className="mt-2 p-2"
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: "#c8d0e4",
            background: "rgba(255,184,79,0.08)",
            border: "1px solid rgba(255,184,79,0.25)",
          }}
        >
          {guia ? (
            <>
              {sdcGuiaLin("Posición", guia.pos)}
              {sdcGuiaLin("Movimiento", guia.mov)}
              {sdcGuiaLin("Error común", guia.err)}
            </>
          ) : null}
          {tip ? <div style={{ color: "#9aa4bd", marginTop: guia ? 6 : 0 }}>{tip}</div> : null}
        </div>
      )}
    </div>
  );
}

export { sdcGuiaLin, FilaEjercicio };
