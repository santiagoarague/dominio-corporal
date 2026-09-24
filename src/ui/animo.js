// Como llegas: chequeo de animo.
import { i } from "../react.js";
import { reglaDolor } from "../datos/salud.js";
import { sistemaActivo } from "../logica/sistemas.js";
import { revisarLogros, sdcAnimo, sdcAnimoCuenta } from "../datos/logros.js";
import { clonar } from "../logica/partida.js";
import { sdcBeep, sdcVib } from "../logica/series.js";
import { sdcCalorIni } from "./calentamiento.js";

var sdcAnimoEsc = [
  { n: 1, t: "Sin ganas", f: "sin ganas" },
  { n: 2, t: "Pocas ganas", f: "con pocas ganas" },
  { n: 3, t: "Normal", f: "normal" },
  { n: 4, t: "Con ganas", f: "con ganas" },
  { n: 5, t: "A full", f: "a full" },
];
var sdcAnimoCuerpo = [
  { k: "cansancio", t: "Cansancio" },
  { k: "cargado", t: "Músculos cargados" },
  { k: "dolor", t: "Me duele algo" },
  { k: "bien", t: "Bien" },
];
var sdcAnimoTx = { fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" },
  sdcAnimoB2 = {
    minHeight: 44,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#e8ecf7",
    fontWeight: 600,
  },
  sdcAnimoB1 = {
    minHeight: 48,
    background: "#4f9dff",
    border: "1px solid #4f9dff",
    color: "#0a0e1a",
    fontWeight: 700,
  },
  sdcAnimoTit = {
    fontFamily: "Chakra Petch, sans-serif",
    fontSize: 16,
    color: "#e8ecf7",
    fontWeight: 700,
  },
  sdcAnimoEvBox = {
    background: "rgba(62,207,142,0.1)",
    border: "1px solid rgba(62,207,142,0.4)",
    color: "#bdf0d9",
  };
function sdcAnimoHoy(e) {
  return e && e.today ? sdcAnimo(e)[e.today.date] || {} : {};
}
function sdcAnimoOn(e) {
  return sistemaActivo(e, "animo");
}
function sdcAnimoOtra(f) {
  return i.default.createElement(
    "button",
    {
      onClick: f,
      className: "text-xs",
      style: {
        color: "#7a83a0",
        minHeight: 40,
        padding: "0 4px",
        marginLeft: "auto",
        flexShrink: 0,
        background: "transparent",
        border: "none",
        textDecoration: "underline",
      },
    },
    "Cambiar respuesta",
  );
}
function sdcAnimoFrase(n) {
  var x = sdcAnimoEsc[(n || 3) - 1];
  return x ? x.f : "";
}
function sdcAnimoPut(e, cp) {
  var a = clonar(e),
    d = a.today.date,
    m = {},
    k,
    v = sdcAnimo(a),
    o,
    h = {},
    ks;
  for (k in v) m[k] = v[k];
  o = m[d] || {};
  for (k in o) h[k] = o[k];
  for (k in cp) h[k] = cp[k];
  m[d] = h;
  a.seenUnlocks && a.seenUnlocks.indexOf("animo") < 0 && a.seenUnlocks.push("animo");
  ks = Object.keys(m).sort();
  for (k = 0; k < ks.length - 400; k++) delete m[ks[k]];
  a.animo = m;
  return a;
}
function sdcAnimoSet(e, cp) {
  return { state: sdcAnimoPut(e, cp), notices: [] };
}
function sdcAnimoSetDa(e, cp) {
  var o = revisarLogros(sdcAnimoPut(e, cp));
  return { state: o.state, notices: o.notices };
}
function sdcAnimoCalor(e, B) {
  var r = sdcCalorIni(sdcAnimoPut(e, { ack: 1 }), B),
    a = r.state;
  a.ui = a.ui || { collapsed: {} };
  a.ui.collapsed = a.ui.collapsed || {};
  a.ui.collapsed.calentamiento = !1;
  return r;
}
function sdcAbrirCard(e, id) {
  var a = clonar(e);
  a.ui = a.ui || { collapsed: {} };
  a.ui.collapsed = a.ui.collapsed || {};
  a.ui.collapsed[id] = !1;
  return { state: a, notices: [] };
}
function sdcAnimoEvid(e) {
  var v = sdcAnimo(e),
    hoy = e.today.date,
    ks = Object.keys(v)
      .filter(function (k) {
        var x = v[k];
        return k < hoy && x && x.antes && x.antes <= 2 && x.despues;
      })
      .sort()
      .slice(-5),
    m = 0;
  ks.forEach(function (k) {
    v[k].despues > v[k].antes && m++;
  });
  return { n: ks.length, m: m };
}
function sdcCargaRacha(e) {
  var v = sdcAnimo(e),
    ks = Object.keys(v)
      .filter(function (k) {
        return v[k] && v[k].carga;
      })
      .sort()
      .slice(-3),
    c,
    j;
  if (ks.length < 3) return null;
  c = v[ks[0]].carga;
  for (j = 1; j < 3; j++) if (v[ks[j]].carga !== c) return null;
  return c === "justa" ? null : c;
}
function Cara({ n: n, size: s, color: c }) {
  var bo = [
    "M8 16.6 Q12 12.6 16 16.6",
    "M8.5 16 Q12 14.3 15.5 16",
    "M8.5 15.2 L15.5 15.2",
    "M8.5 14.4 Q12 17.6 15.5 14.4",
    "M7.5 13.4 H16.5 Q12 20.2 7.5 13.4 Z",
  ][(n || 3) - 1];
  return i.default.createElement(
    "svg",
    { width: s || 26, height: s || 26, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
    i.default.createElement("circle", { cx: 12, cy: 12, r: 9.5, stroke: c, strokeWidth: 1.8 }),
    i.default.createElement("circle", { cx: 9, cy: 10, r: 1.2, fill: c }),
    i.default.createElement("circle", { cx: 15, cy: 10, r: 1.2, fill: c }),
    i.default.createElement("path", {
      d: bo,
      stroke: c,
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: n === 5 ? c : "none",
    }),
  );
}
function Caras({ sel: sl, onPick: op }) {
  return i.default.createElement(
    "div",
    { style: { display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 4 } },
    sdcAnimoEsc.map(function (x) {
      var on = sl === x.n,
        cc = on ? "#4f9dff" : "#c8d0e4";
      return i.default.createElement(
        "button",
        {
          key: x.n,
          onClick: function () {
            (sdcBeep(560 + x.n * 60, 70), sdcVib(12), op(x.n));
          },
          "aria-pressed": on,
          style: {
            minHeight: 66,
            padding: "6px 2px",
            background: on ? "rgba(79,157,255,0.15)" : "rgba(255,255,255,0.03)",
            border: "1px solid " + (on ? "#4f9dff" : "rgba(255,255,255,0.12)"),
            color: cc,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 4,
            paddingTop: 8,
          },
        },
        i.default.createElement(Cara, { n: x.n, size: 26, color: cc }),
        i.default.createElement(
          "span",
          {
            style: {
              fontSize: 11,
              lineHeight: 1.2,
              textAlign: "center",
              minHeight: 27,
              display: "flex",
              alignItems: "center",
            },
          },
          x.t,
        ),
      );
    }),
  );
}
function AnimoAntes({ st: e, Ne: Ne, mod: B, onModo: om, descLibre: dl, onDescanso: odc }) {
  let [cf, scf] = (0, i.useState)(!1),
    h = sdcAnimoHoy(e),
    cambiar = i.default.createElement(
      "button",
      {
        onClick: () => {
          (scf(!1),
            h.modo && om("normal"),
            Ne((d) => sdcAnimoSet(d, { antes: 0, cuerpo: 0, modo: 0, ack: 0 })));
        },
        className: "text-xs",
        style: {
          color: "#7a83a0",
          minHeight: 40,
          padding: "0 4px",
          background: "transparent",
          border: "none",
          textDecoration: "underline",
        },
      },
      "Cambiar respuesta",
    );
  if (!h.antes)
    return i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "div",
        { className: "flex items-center justify-between mb-2" },
        i.default.createElement("span", { style: sdcAnimoTit }, "¿Cómo llegás hoy?"),
        i.default.createElement(
          "button",
          {
            onClick: () => Ne((d) => sdcAnimoSet(d, { no: 1 })),
            className: "text-xs",
            style: {
              color: "#7a83a0",
              minHeight: 40,
              padding: "0 4px",
              background: "transparent",
              border: "none",
            },
          },
          "Hoy no",
        ),
      ),
      i.default.createElement(Caras, {
        sel: 0,
        onPick: (n) => Ne((d) => sdcAnimoSet(d, { antes: n })),
      }),
    );
  if (h.antes >= 3 || h.ack)
    return i.default.createElement(
      "div",
      { className: "flex items-center gap-2", style: sdcAnimoTx },
      i.default.createElement(Cara, { n: h.antes, size: 22, color: "#c8d0e4" }),
      "Llegás " + sdcAnimoFrase(h.antes) + ".",
      i.default.createElement("span", { style: { marginLeft: "auto" } }, cambiar),
    );
  if (!h.cuerpo)
    return i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "div",
        { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
        "Llegás ",
        sdcAnimoFrase(h.antes),
        ".",
      ),
      i.default.createElement("div", { className: "mb-2", style: sdcAnimoTit }, "¿Y el cuerpo?"),
      i.default.createElement(
        "div",
        { className: "grid grid-cols-2 gap-2" },
        sdcAnimoCuerpo.map((x) =>
          i.default.createElement(
            "button",
            {
              key: x.k,
              onClick: () => {
                (sdcVib(12),
                  x.k !== "dolor" && om("recovery"),
                  Ne((d) =>
                    sdcAnimoSet(
                      d,
                      x.k !== "dolor" ? { cuerpo: x.k, modo: "recovery" } : { cuerpo: x.k },
                    ),
                  ));
              },
              className: "py-2 text-sm",
              style: sdcAnimoB2,
            },
            x.t,
          ),
        ),
      ),
      i.default.createElement("div", { className: "text-right" }, cambiar),
    );
  if (h.cuerpo === "dolor")
    return i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "div",
        { className: "mb-1", style: sdcAnimoTit },
        "Hoy el cuerpo primero",
      ),
      i.default.createElement(
        "div",
        { className: "mb-3", style: sdcAnimoTx },
        "Si es un dolor agudo o punzante, no entrenes esa zona hoy. ",
        reglaDolor,
      ),
      dl
        ? cf
          ? i.default.createElement(
              "div",
              { className: "mb-2" },
              i.default.createElement(
                "div",
                { className: "text-xs mb-2", style: { color: "#ffb84f" } },
                "El día de descanso no da XP y solo tenés uno por semana.",
              ),
              i.default.createElement(
                "div",
                { className: "grid grid-cols-2 gap-2" },
                i.default.createElement(
                  "button",
                  {
                    onClick: () => {
                      (scf(!1), odc());
                    },
                    className: "py-2 text-sm",
                    style: sdcAnimoB1,
                  },
                  "Sí, descansar",
                ),
                i.default.createElement(
                  "button",
                  { onClick: () => scf(!1), className: "py-2 text-sm", style: sdcAnimoB2 },
                  "Mejor no",
                ),
              ),
            )
          : i.default.createElement(
              "button",
              { onClick: () => scf(!0), className: "w-full py-2 text-sm mb-2", style: sdcAnimoB2 },
              "Usar mi día de descanso",
            )
        : null,
      i.default.createElement(
        "button",
        {
          onClick: () => {
            (om("recovery"), Ne((d) => sdcAnimoSet(d, { modo: "recovery", ack: 1 })));
          },
          className: "w-full py-2 text-sm",
          style: sdcAnimoB2,
        },
        "Entrenar suave, sin esa zona",
      ),
      i.default.createElement("div", { className: "text-right" }, cambiar),
    );
  let ev = sdcAnimoEvid(e);
  return i.default.createElement(
    "div",
    null,
    i.default.createElement(
      "div",
      { className: "text-xs mb-1", style: { color: "#9aa4bd" } },
      "Llegás ",
      sdcAnimoFrase(h.antes),
      ".",
    ),
    i.default.createElement(
      "div",
      { className: "mb-2", style: sdcAnimoTit },
      "Hoy alcanza con empezar",
    ),
    i.default.createElement(
      "div",
      { style: sdcAnimoTx },
      "Hacé el calentamiento y la rutina en Recuperación, con la mitad de las repeticiones. Si después del calentamiento te vino el envión, pasás a la normal.",
    ),
    ev.n >= 3 && ev.m >= 2
      ? i.default.createElement(
          "div",
          { className: "mt-2 p-2 text-sm", style: sdcAnimoEvBox },
          "Las últimas ",
          ev.n,
          " veces que llegaste así, en ",
          ev.m,
          " terminaste mejor.",
        )
      : null,
    i.default.createElement(
      "button",
      {
        onClick: () => {
          (sdcBeep(660, 100), Ne((d) => sdcAnimoCalor(d, B)));
        },
        className: "w-full mt-3 py-3 text-sm",
        style: sdcAnimoB1,
      },
      "Empezar calentamiento",
    ),
    i.default.createElement(
      "button",
      {
        onClick: () => Ne((d) => sdcAnimoSet(d, { ack: 1 })),
        className: "w-full mt-2 py-2 text-sm",
        style: sdcAnimoB2,
      },
      "Ir directo a la rutina",
    ),
    i.default.createElement("div", { className: "text-right" }, cambiar),
  );
}
function AnimoAhora({ st: e, Ne: Ne, onModo: om, sinSeries: ss }) {
  let h = sdcAnimoHoy(e),
    bx = { border: "1px solid rgba(79,157,255,0.35)", background: "rgba(79,157,255,0.06)" };
  if (
    !sdcAnimoOn(e) ||
    !h.antes ||
    h.antes > 2 ||
    h.cuerpo === "dolor" ||
    h.ahoraOk ||
    !ss ||
    (e.today.doneModalities || []).length
  )
    return null;
  if (!h.ahora)
    return i.default.createElement(
      "div",
      { className: "mt-3 p-2", style: bx },
      i.default.createElement("div", { className: "mb-2", style: sdcAnimoTit }, "¿Y ahora?"),
      i.default.createElement(Caras, {
        sel: 0,
        onPick: (n) =>
          Ne((d) => {
            let r = sdcAnimoSet(d, n <= 2 ? { ahora: n, ahoraOk: 1 } : { ahora: n });
            n <= 2 && (r.notices = ["Seguí en Recuperación: con eso alcanza."]);
            return r;
          }),
      }),
    );
  return i.default.createElement(
    "div",
    { className: "mt-3 p-2", style: bx },
    i.default.createElement(
      "div",
      { className: "mb-2", style: sdcAnimoTx },
      "Te vino el envión. ¿Hacés la rutina normal?",
    ),
    i.default.createElement(
      "div",
      { className: "grid grid-cols-2 gap-2" },
      i.default.createElement(
        "button",
        {
          onClick: () => {
            (om("normal"), Ne((d) => sdcAnimoSet(d, { modo: "normal", ahoraOk: 1 })));
          },
          className: "py-2 text-sm",
          style: sdcAnimoB1,
        },
        "Normal",
      ),
      i.default.createElement(
        "button",
        {
          onClick: () => Ne((d) => sdcAnimoSet(d, { ahoraOk: 1 })),
          className: "py-2 text-sm",
          style: sdcAnimoB2,
        },
        "Sigo en Recuperación",
      ),
    ),
  );
}
function AnimoDespues({ st: e, Ne: Ne, onPrueba: op }) {
  let h = sdcAnimoHoy(e),
    bx = { marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" };
  if (h.no) return null;
  let delta = h.despues
    ? h.antes
      ? "Llegaste " +
        sdcAnimoFrase(h.antes) +
        " y te vas " +
        (h.despues === h.antes ? "igual" : sdcAnimoFrase(h.despues)) +
        "."
      : "Te vas " + sdcAnimoFrase(h.despues) + "."
    : "";
  if (!h.despues)
    return i.default.createElement(
      "div",
      { style: bx },
      i.default.createElement("div", { className: "mb-2", style: sdcAnimoTit }, "¿Cómo te vas?"),
      i.default.createElement(Caras, {
        sel: 0,
        onPick: (n) => Ne((d) => sdcAnimoSetDa(d, { despues: n })),
      }),
    );
  if (!h.carga)
    return i.default.createElement(
      "div",
      { style: bx },
      i.default.createElement(
        "div",
        { className: "mb-2 flex items-center gap-2", style: sdcAnimoTx },
        delta,
        sdcAnimoOtra(() => Ne((d) => sdcAnimoSet(d, { despues: 0, carga: 0 }))),
      ),
      i.default.createElement(
        "div",
        { className: "mb-2", style: sdcAnimoTit },
        "¿Cómo te quedó la rutina?",
      ),
      i.default.createElement(
        "div",
        { className: "grid grid-cols-3 gap-2" },
        [
          ["corta", "Corta"],
          ["justa", "Justa"],
          ["mucha", "Mucha"],
        ].map((x) =>
          i.default.createElement(
            "button",
            {
              key: x[0],
              onClick: () => {
                (sdcVib(12), Ne((d) => sdcAnimoSet(d, { carga: x[0] })));
              },
              className: "py-2 text-sm",
              style: sdcAnimoB2,
            },
            x[1],
          ),
        ),
      ),
    );
  let ct = sdcAnimoCuenta(e),
    cr = sdcCargaRacha(e);
  return i.default.createElement(
    "div",
    { style: bx },
    i.default.createElement(
      "div",
      { className: "flex items-center gap-2", style: sdcAnimoTx },
      i.default.createElement(Cara, {
        n: h.despues,
        size: 22,
        color: h.antes && h.despues > h.antes ? "#3ecf8e" : "#c8d0e4",
      }),
      delta,
      sdcAnimoOtra(() => Ne((d) => sdcAnimoSet(d, { despues: 0, carga: 0 }))),
    ),
    h.antes && h.antes <= 2 && ct.noResp >= 2
      ? i.default.createElement(
          "div",
          { className: "mt-2 p-2 text-sm", style: sdcAnimoEvBox },
          "Días que no querías: ",
          ct.noResp,
          ". En ",
          ct.noMejor,
          " terminaste mejor.",
        )
      : null,
    cr
      ? i.default.createElement(
          "div",
          { className: "mt-2" },
          i.default.createElement(
            "div",
            { style: sdcAnimoTx },
            "Las últimas 3 veces la rutina te quedó ",
            cr,
            ". Repetí la prueba de aptitud para ajustarla.",
          ),
          i.default.createElement(
            "button",
            { onClick: op, className: "w-full mt-2 py-2 text-sm", style: sdcAnimoB2 },
            "Ir a la prueba de aptitud",
          ),
        )
      : null,
  );
}

export {
  sdcAnimoEsc,
  sdcAnimoCuerpo,
  sdcAnimoTx,
  sdcAnimoB2,
  sdcAnimoB1,
  sdcAnimoTit,
  sdcAnimoEvBox,
  sdcAnimoHoy,
  sdcAnimoOn,
  sdcAnimoOtra,
  sdcAnimoFrase,
  sdcAnimoPut,
  sdcAnimoSet,
  sdcAnimoSetDa,
  sdcAnimoCalor,
  sdcAbrirCard,
  sdcAnimoEvid,
  sdcCargaRacha,
  Cara,
  Caras,
  AnimoAntes,
  AnimoAhora,
  AnimoDespues,
};
