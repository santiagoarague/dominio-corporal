// Metronomo.
import { i } from "../react.js";
import { pitido } from "./prueba.js";

function sdcTempoMod(mo) {
  var b = 2,
    p = 1,
    s = 2,
    d = mo && mo.d ? String(mo.d) : "",
    m = d.match(/baja(?:\s+el\s+peso)?\s+en\s+(\d+)\s*segundos?/i);
  m && (b = Math.max(1, Math.min(8, parseInt(m[1], 10))));
  /mitad de velocidad/i.test(d) && ((b *= 2), (s *= 2));
  return { b: b, p: p, s: s };
}
function D5({ active: e, tempo: tm }) {
  let t = tm && tm.b ? tm : { b: 2, p: 1, s: 2 },
    [a, l] = (0, i.useState)("down");
  if (
    ((0, i.useEffect)(() => {
      if (!e) return;
      let s = (a === "down" ? t.b : a === "hold" ? t.p : t.s) * 1e3;
      pitido(a === "down" ? 440 : a === "hold" ? 560 : 660, 120);
      let u = setTimeout(() => l((c) => (c === "down" ? "hold" : c === "hold" ? "up" : "down")), s);
      return () => clearTimeout(u);
    }, [e, a, t.b, t.p, t.s]),
    !e)
  )
    return null;
  let n =
      a === "down"
        ? "BAJA (" + t.b + "s)"
        : a === "hold"
          ? "PAUSA (" + t.p + "s)"
          : "SUBE (" + t.s + "s)",
    o = a === "down" ? "#4f9dff" : a === "hold" ? "#ffb84f" : "#3ecf8e";
  return i.default.createElement(
    "div",
    {
      className: "text-center py-2 mb-2",
      style: { border: "1px solid " + o + "55", background: "rgba(255,255,255,0.03)" },
    },
    i.default.createElement(
      "div",
      {
        style: { fontFamily: "Chakra Petch, sans-serif", fontSize: 24, color: o, letterSpacing: 1 },
      },
      n,
    ),
  );
}

export { sdcTempoMod, D5 };
