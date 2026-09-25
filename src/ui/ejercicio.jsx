// Fila de un ejercicio de la rutina.
import { useState, useEffect } from "react";
import { IconoMas, IconoCheck, IconoMenos, IconoFlecha } from "./iconos.jsx";
import { sdcKgTxt } from "../logica/extras.js";
import { sdcNSets, sdcSegs, sdcSplit } from "../logica/series.js";

function sdcGuiaLin(titulo, texto) {
  return texto ? (
    <div style={{ marginBottom: 5 }}>
      <span style={{ color: "#ffb84f", fontWeight: 700 }}>{titulo}: </span>
      {texto}
    </div>
  ) : null;
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
  done,
  onSet,
  accent,
  aj: ajustes,
  onAj,
  kgv,
  kgPrev,
  sug,
  guia,
  abrir,
}) {
  let paso = Math.max(1, Math.round(base * 0.1)),
    [guiaTocada, setGuiaTocada] = useState(null),
    guiaAbierta = guiaTocada === null ? !!abrir : guiaTocada,
    nSeries = sdcNSets(value),
    series = sdcSplit(value, nSeries),
    repsSerie = function (i, porDefecto) {
      return ajustes && ajustes[i] !== void 0 ? ajustes[i] : porDefecto;
    },
    hechas = series.reduce(function (suma, reps, i) {
      return i < (done || 0) ? suma + repsSerie(i, reps) : suma;
    }, 0),
    color = accent || "#4f9dff",
    completa = (done || 0) >= nSeries && value > 0,
    segs = sdcSegs(tip),
    [sdcAbre, sdcSetAbre] = useState(!1),
    [sdcCierra, sdcSetCierra] = useState(() => !!(completa && onSet));
  useEffect(
    function () {
      (setGuiaTocada(null), sdcSetAbre(!1));
    },
    [label],
  );
  useEffect(
    function () {
      if (completa && onSet) {
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
  if (completa && onSet && sdcCierra && !sdcAbre)
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
          <IconoFlecha size={12} color="#5a6178" />
        </span>
      </button>
    );
  return (
    <div className="py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {completa && onSet && sdcCierra && sdcAbre ? (
        <button
          onClick={function () {
            sdcSetAbre(!1);
          }}
          className="w-full flex items-center gap-2 text-xs mb-1 text-left"
          style={{ minHeight: 36, background: "transparent", border: "none", color: "#3ecf8e" }}
        >
          <IconoCheck size={12} color="#3ecf8e" />
          Hecho · ocultar
        </button>
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm" style={{ color: "#e8ecf7" }}>
              {label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#9aa4bd" }}>
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
        <div className="flex items-center gap-2">
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
      {onSet && (
        <div className="flex gap-2 mt-2">
          {series.map(function (reps, i) {
            var efectivas = repsSerie(i, reps),
              hecha = i < (done || 0),
              ajustable = i === (done || 0) && !!onAj,
              contenido =
                segs > 0 ? (
                  <div>
                    <div>{hecha ? "✓ " + efectivas : efectivas}</div>
                    <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.8 }}>
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
                      onSet(i + 1);
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
                  onSet(done === i + 1 ? i : i + 1);
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
          <div className="text-xs mt-1" style={{ color: "#7a83a0" }}>
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
      {onSet && (
        <div className="text-xs mt-1" style={{ color: completa ? "#3ecf8e" : "#5a6178" }}>
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
