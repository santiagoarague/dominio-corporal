// Fila de un ejercicio de la rutina.
import { useState, useEffect } from "react";
import { IconoMas, IconoCheck, IconoMenos, IconoFlecha } from "./iconos.jsx";
import { sdcKgTxt } from "../logica/extras.js";
import { sdcNSets, sdcSegs, sdcSplit } from "../logica/series.js";

function sdcGuiaLin(t, v) {
  return v ? (
    <div style={{ marginBottom: 5 }}>
      <span style={{ color: "#ffb84f", fontWeight: 700 }}>{t}: </span>
      {v}
    </div>
  ) : null;
}
function FilaEjercicio({
  label: e,
  value: a,
  base: l,
  min: n,
  max: o,
  onChange: s,
  tip: u,
  weight: c,
  onWeight: r,
  done: sd,
  onSet: so,
  accent: sa,
  aj: sj,
  onAj: soa,
  kgv: skg,
  kgPrev: spv,
  sug: ssug,
  guia: sgu,
  abrir: sab,
}) {
  let p = Math.max(1, Math.round(l * 0.1)),
    [sv, x] = useState(null),
    v = sv === null ? !!sab : sv,
    sn = sdcNSets(a),
    sp = sdcSplit(a, sn),
    sf = function (k, v) {
      return sj && sj[k] !== void 0 ? sj[k] : v;
    },
    sh = sp.reduce(function (ac, vv, kk) {
      return kk < (sd || 0) ? ac + sf(kk, vv) : ac;
    }, 0),
    sc = sa || "#4f9dff",
    sl = (sd || 0) >= sn && a > 0,
    sg = sdcSegs(u),
    [sdcAbre, sdcSetAbre] = useState(!1),
    [sdcCierra, sdcSetCierra] = useState(() => !!(sl && so));
  useEffect(
    function () {
      (x(null), sdcSetAbre(!1));
    },
    [e],
  );
  useEffect(
    function () {
      if (sl && so) {
        if (sdcCierra) return;
        var t = setTimeout(function () {
          sdcSetCierra(!0);
        }, 1200);
        return function () {
          clearTimeout(t);
        };
      }
      (sdcCierra && sdcSetCierra(!1), sdcAbre && sdcSetAbre(!1));
    },
    [sl],
  );
  if (sl && so && sdcCierra && !sdcAbre)
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
          {e}
        </span>
        <span
          className="flex items-center gap-1 text-xs"
          style={{ color: "#3ecf8e", whiteSpace: "nowrap" }}
        >
          {sg > 0 ? sh * sg + " s" : sh + " reps"}
          <IconoFlecha size={12} color="#5a6178" />
        </span>
      </button>
    );
  return (
    <div className="py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {sl && so && sdcCierra && sdcAbre ? (
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
              {e}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#9aa4bd" }}>
            <span>
              Meta: {a} reps{sg > 0 ? " · " + a * sg + "s de sostén" : ""}
            </span>
            {(u || sgu) && (
              <button
                onClick={() => x(!v)}
                className="text-xs"
                style={{
                  color: "#ffb84f",
                  whiteSpace: "nowrap",
                  padding: "15px 8px",
                  margin: "-15px -8px",
                }}
                aria-label="Cómo se hace"
              >
                {sgu ? "¿Cómo se hace?" : "💡 alternativa"}
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => s(Math.max(n, a - p))}
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
            {a}
          </div>
          <button
            onClick={() => s(Math.min(o, a + p))}
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
      {so && (
        <div className="flex gap-2 mt-2">
          {sp.map(function (sr, sk) {
            var ef = sf(sk, sr),
              hc = sk < (sd || 0),
              sx = sk === (sd || 0) && !!soa,
              cu =
                sg > 0 ? (
                  <div>
                    <div>{hc ? "✓ " + ef : ef}</div>
                    <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.8 }}>{ef * sg}s</div>
                  </div>
                ) : hc ? (
                  "✓ " + ef
                ) : (
                  ef
                );
            if (sx)
              return (
                <div
                  key={sk}
                  className="sdc-chip flex-1 flex items-stretch"
                  style={{
                    border: "1px solid rgba(255,255,255,0.28)",
                    background: "rgba(255,255,255,0.04)",
                    minHeight: 48,
                  }}
                >
                  <button
                    onClick={function () {
                      soa(sk, ef - 1);
                    }}
                    style={{ width: 28, color: "#9aa4bd", fontSize: 17 }}
                    aria-label={"Una repetición menos en la serie " + (sk + 1)}
                  >
                    −
                  </button>
                  <button
                    onClick={function () {
                      so(sk + 1);
                    }}
                    className="flex-1"
                    aria-label={"Marcar serie " + (sk + 1) + " de " + sn + " con " + ef + " reps"}
                    style={{
                      fontFamily: "Chakra Petch, sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#e8ecf7",
                    }}
                  >
                    {cu}
                  </button>
                  <button
                    onClick={function () {
                      soa(sk, ef + 1);
                    }}
                    style={{ width: 28, color: "#9aa4bd", fontSize: 17 }}
                    aria-label={"Una repetición más en la serie " + (sk + 1)}
                  >
                    +
                  </button>
                </div>
              );
            return (
              <button
                key={sk}
                onClick={function () {
                  so(sd === sk + 1 ? sk : sk + 1);
                }}
                className="sdc-chip flex-1 py-3"
                aria-label={"Serie " + (sk + 1) + " de " + sn + (hc ? ", hecha" : ", pendiente")}
                style={{
                  background: hc ? sc : "rgba(255,255,255,0.04)",
                  border: "1px solid " + (hc ? sc : "rgba(255,255,255,0.18)"),
                  color: hc ? "#0a0e1a" : "#8a93ad",
                  fontFamily: "Chakra Petch, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  minHeight: 48,
                }}
              >
                {cu}
              </button>
            );
          })}
        </div>
      )}
      {r && (
        <>
          <div className="flex gap-2 mt-2">
            {sp.map(function (sr, sk) {
              return (
                <input
                  key={sk}
                  type="text"
                  inputMode="decimal"
                  value={skg ? skg(sk) : ""}
                  onChange={(y) => r(sk, y.target.value.replace(/[^0-9.,]/g, ""))}
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
                  aria-label={"Kilos de la serie " + (sk + 1) + " de " + sn}
                />
              );
            })}
          </div>
          <div className="text-xs mt-1" style={{ color: "#7a83a0" }}>
            {spv && spv.length ? (
              <>La última vez: {spv.map(sdcKgTxt).join(" · ")} kg</>
            ) : (
              "Kilos de cada serie. Podés subirlos serie a serie."
            )}
          </div>
          {ssug && ssug.s ? (
            <button
              onClick={() => ssug.fn(ssug.s.kg)}
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
              {ssug.s.sube
                ? "Hoy probá " + sdcKgTxt(ssug.s.kg) + " kg →"
                : "Repetí " + sdcKgTxt(ssug.s.kg) + " kg y cerralo →"}
            </button>
          ) : null}
        </>
      )}
      {so && (
        <div className="text-xs mt-1" style={{ color: sl ? "#3ecf8e" : "#5a6178" }}>
          {sl
            ? "✓ Series hechas · " + sh + " reps" + (sg > 0 ? " (" + sh * sg + "s)" : "")
            : "Llevás " + sh + " de " + a + " reps" + (sg > 0 ? " (" + sh * sg + "s)" : "")}
        </div>
      )}
      {v && (u || sgu) && (
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
          {sgu ? (
            <>
              {sdcGuiaLin("Posición", sgu.pos)}
              {sdcGuiaLin("Movimiento", sgu.mov)}
              {sdcGuiaLin("Error común", sgu.err)}
            </>
          ) : null}
          {u ? <div style={{ color: "#9aa4bd", marginTop: sgu ? 6 : 0 }}>{u}</div> : null}
        </div>
      )}
    </div>
  );
}

export { sdcGuiaLin, FilaEjercicio };
