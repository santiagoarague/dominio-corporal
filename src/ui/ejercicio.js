// Fila de un ejercicio de la rutina.
import { i } from "../react.js";
import { IconoMas, IconoCheck, IconoMenos, IconoFlecha } from "./iconos.js";
import { sdcKgTxt } from "../logica/extras.js";
import { sdcNSets, sdcSegs, sdcSplit } from "../logica/series.js";

function sdcGuiaLin(t, v) {
  return v
    ? i.default.createElement(
        "div",
        { style: { marginBottom: 5 } },
        i.default.createElement("span", { style: { color: "#ffb84f", fontWeight: 700 } }, t, ": "),
        v,
      )
    : null;
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
    [sv, x] = (0, i.useState)(null),
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
    [sdcAbre, sdcSetAbre] = (0, i.useState)(!1),
    [sdcCierra, sdcSetCierra] = (0, i.useState)(() => !!(sl && so));
  (0, i.useEffect)(
    function () {
      (x(null), sdcSetAbre(!1));
    },
    [e],
  );
  (0, i.useEffect)(
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
    return i.default.createElement(
      "button",
      {
        onClick: function () {
          sdcSetAbre(!0);
        },
        className: "w-full flex items-center justify-between gap-2 py-2 text-left",
        style: {
          minHeight: 48,
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        },
      },
      i.default.createElement(
        "span",
        { className: "flex items-center gap-2 text-sm", style: { color: "#9aa4bd" } },
        i.default.createElement(IconoCheck, { size: 16, color: "#3ecf8e" }),
        e,
      ),
      i.default.createElement(
        "span",
        {
          className: "flex items-center gap-1 text-xs",
          style: { color: "#3ecf8e", whiteSpace: "nowrap" },
        },
        sg > 0 ? sh * sg + " s" : sh + " reps",
        i.default.createElement(IconoFlecha, { size: 12, color: "#5a6178" }),
      ),
    );
  return i.default.createElement(
    "div",
    { className: "py-2", style: { borderBottom: "1px solid rgba(255,255,255,0.06)" } },
    sl && so && sdcCierra && sdcAbre
      ? i.default.createElement(
          "button",
          {
            onClick: function () {
              sdcSetAbre(!1);
            },
            className: "w-full flex items-center gap-2 text-xs mb-1 text-left",
            style: { minHeight: 36, background: "transparent", border: "none", color: "#3ecf8e" },
          },
          i.default.createElement(IconoCheck, { size: 12, color: "#3ecf8e" }),
          "Hecho · ocultar",
        )
      : null,
    i.default.createElement(
      "div",
      { className: "flex items-center justify-between gap-3" },
      i.default.createElement(
        "div",
        null,
        i.default.createElement(
          "div",
          { className: "flex items-center gap-1" },
          i.default.createElement("span", { className: "text-sm", style: { color: "#e8ecf7" } }, e),
        ),
        i.default.createElement(
          "div",
          { className: "flex items-center gap-2 text-xs", style: { color: "#9aa4bd" } },
          i.default.createElement(
            "span",
            null,
            "Meta: ",
            a,
            " reps",
            sg > 0 ? " · " + a * sg + "s de sostén" : "",
          ),
          (u || sgu) &&
            i.default.createElement(
              "button",
              {
                onClick: () => x(!v),
                className: "text-xs",
                style: {
                  color: "#ffb84f",
                  whiteSpace: "nowrap",
                  padding: "15px 8px",
                  margin: "-15px -8px",
                },
                "aria-label": "Cómo se hace",
              },
              sgu ? "¿Cómo se hace?" : "💡 alternativa",
            ),
        ),
      ),
      i.default.createElement(
        "div",
        { className: "flex items-center gap-2" },
        i.default.createElement(
          "button",
          {
            onClick: () => s(Math.max(n, a - p)),
            className: "flex items-center justify-center",
            style: {
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            },
            "aria-label": "Bajar meta",
          },
          i.default.createElement(IconoMenos, { size: 14, color: "#e8ecf7" }),
        ),
        i.default.createElement(
          "div",
          {
            className: "text-center",
            style: {
              width: 36,
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 18,
              color: "#e8ecf7",
            },
          },
          a,
        ),
        i.default.createElement(
          "button",
          {
            onClick: () => s(Math.min(o, a + p)),
            className: "flex items-center justify-center",
            style: {
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
            },
            "aria-label": "Subir meta",
          },
          i.default.createElement(IconoMas, { size: 14, color: "#e8ecf7" }),
        ),
      ),
    ),
    so &&
      i.default.createElement(
        "div",
        { className: "flex gap-2 mt-2" },
        sp.map(function (sr, sk) {
          var ef = sf(sk, sr),
            hc = sk < (sd || 0),
            sx = sk === (sd || 0) && !!soa,
            cu =
              sg > 0
                ? i.default.createElement(
                    "div",
                    null,
                    i.default.createElement("div", null, hc ? "✓ " + ef : ef),
                    i.default.createElement(
                      "div",
                      { style: { fontSize: 11, fontWeight: 400, opacity: 0.8 } },
                      ef * sg,
                      "s",
                    ),
                  )
                : hc
                  ? "✓ " + ef
                  : ef;
          if (sx)
            return i.default.createElement(
              "div",
              {
                key: sk,
                className: "sdc-chip flex-1 flex items-stretch",
                style: {
                  border: "1px solid rgba(255,255,255,0.28)",
                  background: "rgba(255,255,255,0.04)",
                  minHeight: 48,
                },
              },
              i.default.createElement(
                "button",
                {
                  onClick: function () {
                    soa(sk, ef - 1);
                  },
                  style: { width: 28, color: "#9aa4bd", fontSize: 17 },
                  "aria-label": "Una repetición menos en la serie " + (sk + 1),
                },
                "−",
              ),
              i.default.createElement(
                "button",
                {
                  onClick: function () {
                    so(sk + 1);
                  },
                  className: "flex-1",
                  "aria-label": "Marcar serie " + (sk + 1) + " de " + sn + " con " + ef + " reps",
                  style: {
                    fontFamily: "Chakra Petch, sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#e8ecf7",
                  },
                },
                cu,
              ),
              i.default.createElement(
                "button",
                {
                  onClick: function () {
                    soa(sk, ef + 1);
                  },
                  style: { width: 28, color: "#9aa4bd", fontSize: 17 },
                  "aria-label": "Una repetición más en la serie " + (sk + 1),
                },
                "+",
              ),
            );
          return i.default.createElement(
            "button",
            {
              key: sk,
              onClick: function () {
                so(sd === sk + 1 ? sk : sk + 1);
              },
              className: "sdc-chip flex-1 py-3",
              "aria-label": "Serie " + (sk + 1) + " de " + sn + (hc ? ", hecha" : ", pendiente"),
              style: {
                background: hc ? sc : "rgba(255,255,255,0.04)",
                border: "1px solid " + (hc ? sc : "rgba(255,255,255,0.18)"),
                color: hc ? "#0a0e1a" : "#8a93ad",
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 16,
                fontWeight: 700,
                minHeight: 48,
              },
            },
            cu,
          );
        }),
      ),
    r &&
      i.default.createElement(
        i.default.Fragment,
        null,
        i.default.createElement(
          "div",
          { className: "flex gap-2 mt-2" },
          sp.map(function (sr, sk) {
            return i.default.createElement("input", {
              key: sk,
              type: "text",
              inputMode: "decimal",
              value: skg ? skg(sk) : "",
              onChange: (y) => r(sk, y.target.value.replace(/[^0-9.,]/g, "")),
              placeholder: "kg",
              className: "flex-1 px-1 py-2 text-center text-xs",
              style: {
                width: 0,
                minWidth: 0,
                minHeight: 44,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#e8ecf7",
              },
              "aria-label": "Kilos de la serie " + (sk + 1) + " de " + sn,
            });
          }),
        ),
        i.default.createElement(
          "div",
          { className: "text-xs mt-1", style: { color: "#7a83a0" } },
          spv && spv.length
            ? i.default.createElement(
                i.default.Fragment,
                null,
                "La última vez: ",
                spv.map(sdcKgTxt).join(" · "),
                " kg",
              )
            : "Kilos de cada serie. Podés subirlos serie a serie.",
        ),
        ssug && ssug.s
          ? i.default.createElement(
              "button",
              {
                onClick: () => ssug.fn(ssug.s.kg),
                className: "text-xs text-left",
                style: {
                  display: "block",
                  width: "100%",
                  color: "#3ecf8e",
                  fontWeight: 600,
                  padding: "12px 0",
                  minHeight: 44,
                  marginBottom: -6,
                },
              },
              ssug.s.sube
                ? "Hoy probá " + sdcKgTxt(ssug.s.kg) + " kg →"
                : "Repetí " + sdcKgTxt(ssug.s.kg) + " kg y cerralo →",
            )
          : null,
      ),
    so &&
      i.default.createElement(
        "div",
        { className: "text-xs mt-1", style: { color: sl ? "#3ecf8e" : "#5a6178" } },
        sl
          ? "✓ Series hechas · " + sh + " reps" + (sg > 0 ? " (" + sh * sg + "s)" : "")
          : "Llevás " + sh + " de " + a + " reps" + (sg > 0 ? " (" + sh * sg + "s)" : ""),
      ),
    v &&
      (u || sgu) &&
      i.default.createElement(
        "div",
        {
          className: "mt-2 p-2",
          style: {
            fontSize: 14,
            lineHeight: 1.5,
            color: "#c8d0e4",
            background: "rgba(255,184,79,0.08)",
            border: "1px solid rgba(255,184,79,0.25)",
          },
        },
        sgu
          ? i.default.createElement(
              i.default.Fragment,
              null,
              sdcGuiaLin("Posición", sgu.pos),
              sdcGuiaLin("Movimiento", sgu.mov),
              sdcGuiaLin("Error común", sgu.err),
            )
          : null,
        u
          ? i.default.createElement(
              "div",
              { style: { color: "#9aa4bd", marginTop: sgu ? 6 : 0 } },
              u,
            )
          : null,
      ),
  );
}

export { sdcGuiaLin, FilaEjercicio };
