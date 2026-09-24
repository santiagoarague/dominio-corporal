// Calentamiento y los pasos guiados que comparte con el estiramiento.
import { i } from "../react.js";
import { Mn, Ph } from "./iconos.js";
import { regresiones } from "../logica/primal.js";
import { multImpulso } from "../logica/tienda.js";
import { sdcEstMMSS, sdcEstPaso, sdcEstPrep, sdcEstTotal } from "../logica/estiramiento.js";
import { revisarLogros } from "../datos/logros.js";
import { alternativaEjercicio, ejercicioDe } from "../logica/rutina.js";
import { subirNiveles, clonar } from "../logica/partida.js";
import { qa } from "./base.js";
import { sdcIncKg, sdcKgTxt, sdcSugKg } from "../logica/extras.js";
import { sdcBeep, sdcNSets, sdcSegs, sdcSplit, sdcVib } from "../logica/series.js";
import { sdcWakeSi } from "./pantalla.js";
import { sdcAnimoAhora } from "./animo.js";

var sdcCalorFases = ["PULSO", "MOVILIDAD", "ACTIVACIÓN", "ENSAYO"];
var sdcCalorPasos = [
  {
    f: 1,
    name: "Trote en el lugar",
    desc: "Trote corto y suave, con los brazos sueltos. Tiene que dejarte hablar sin jadear.",
    seconds: 40,
    pr: 10,
  },
  {
    f: 1,
    name: "Saltos de tijera",
    desc: "Abre y cierra piernas y brazos a un ritmo cómodo. Sin impacto: un paso al costado en lugar del salto.",
    seconds: 30,
  },
  {
    f: 2,
    name: "Círculos de brazos",
    desc: "Brazos estirados a los costados, círculos cada vez más amplios. A mitad de tiempo, cambia de sentido.",
    seconds: 20,
  },
  {
    f: 2,
    name: "Círculos de cadera",
    desc: "Pies al ancho de los hombros y manos en la cintura. Dibuja círculos grandes con la cadera y, a mitad de tiempo, cambia de sentido.",
    seconds: 20,
  },
  {
    f: 2,
    name: "Balanceo de pierna",
    desc: "De costado a una pared, con una mano apoyada. Balancea la pierna libre adelante y atrás, cada vez un poco más alto, sin forzar el final.",
    seconds: 15,
    lados: 1,
    pr: 8,
  },
  {
    f: 2,
    name: "Muñecas",
    desc: "En cuatro apoyos, manos bajo los hombros. Lleva el peso adelante y atrás sobre las palmas, despacio y sin despegarlas del suelo.",
    seconds: 20,
    pr: 8,
  },
];
var sdcCalorPuente = {
    name: "Puente de glúteos",
    desc: "Boca arriba, rodillas dobladas y pies apoyados. Sube la cadera apretando los glúteos, pausa un segundo arriba y baja lento.",
    ev: /puente de gl/i,
  },
  sdcCalorEscap = {
    name: "Flexiones escapulares",
    desc: "En plancha con los brazos estirados. Sin doblar los codos, deja que el pecho baje un poco juntando los omóplatos y después empuja el suelo para separarlos.",
    ev: /escapular/i,
  },
  sdcCalorDead = {
    name: "Deadbug",
    desc: "Boca arriba, brazos hacia el techo y rodillas dobladas en el aire. Estira un brazo y la pierna contraria sin despegar la zona lumbar del suelo, vuelve y alterna.",
    ev: /dead ?bug|bicho muerto/i,
  },
  sdcCalorHollow = {
    name: "Hollow con rodillas dobladas",
    desc: "Boca arriba con la zona lumbar pegada al suelo. Despega un poco los hombros y los pies, con las rodillas dobladas, y sostén respirando.",
    ev: /hollow/i,
  };
var sdcCalorAct = {
  squat: [
    sdcCalorPuente,
    {
      name: "Sentadilla lenta",
      desc: "Pies al ancho de los hombros. Baja en tres segundos hasta donde llegues con la espalda larga y sube a ritmo normal.",
    },
  ],
  pushup: [
    sdcCalorEscap,
    {
      name: "Toques de hombro en plancha",
      desc: "En plancha con los brazos estirados. Toca con una mano el hombro contrario y alterna, sin que la cadera se balancee.",
    },
  ],
  back: [
    {
      name: "Y boca abajo",
      desc: "Boca abajo, brazos estirados por encima de la cabeza formando una Y, pulgares hacia el techo. Levanta los brazos del suelo juntando los omóplatos y baja lento.",
    },
  ],
  abs: [sdcCalorDead, sdcCalorHollow],
};
var sdcCalorActF = {
  squat: [
    {
      name: "Cuclillas con balanceo",
      desc: "Baja a cuclillas profundas, pies al ancho de los hombros y talones en el suelo si se puede. Pasa el peso de un pie al otro sin levantarte.",
      ev: /profunda|cuclillas/i,
    },
    sdcCalorPuente,
  ],
  pushup: [
    {
      name: "Balanceo en bestia",
      desc: "En cuatro apoyos con las rodillas a un palmo del suelo, sin apoyarlas: esa es la bestia. Lleva los hombros por delante de las manos y vuelve, despacio.",
      ev: /bestia|beast|cuadrupedia|\boso\b/i,
    },
    sdcCalorEscap,
  ],
  abs: [sdcCalorHollow, sdcCalorDead],
};
function sdcCalor(e) {
  return (e && e.today && e.today.calentamiento) || {};
}
function sdcCalorLista(mod, rk) {
  var l = [],
    k,
    s,
    g,
    op,
    nm,
    j,
    a,
    gs = ["squat", "pushup", "back", "abs"];
  for (k = 0; k < sdcCalorPasos.length; k++) {
    s = sdcCalorPasos[k];
    if (s.lados) {
      l.push({
        f: s.f,
        name: s.name,
        desc: s.desc,
        seconds: s.seconds,
        lado: "lado derecho",
        prep: s.pr,
      });
      l.push({ f: s.f, name: s.name, desc: s.desc, seconds: s.seconds, lado: "lado izquierdo" });
    } else
      l.push({ f: s.f, name: s.name, desc: s.desc, seconds: s.seconds, lado: null, prep: s.pr });
  }
  for (k = 0; k < gs.length; k++) {
    g = gs[k];
    op = (mod === "flow" && sdcCalorActF[g]) || sdcCalorAct[g];
    nm = (ejercicioDe(g, rk, mod) || {}).name || "";
    a = op[0];
    for (j = 0; j < op.length; j++)
      if (!op[j].ev || !op[j].ev.test(nm)) {
        a = op[j];
        break;
      }
    l.push({ f: 3, name: a.name, desc: a.desc, seconds: 20, lado: null, prep: 8 });
  }
  return l;
}
function sdcCalorEnsayo(e, mod, mt) {
  var gs = ["squat", "pushup", "back", "abs"],
    l = [],
    k,
    g,
    x,
    t,
    pr,
    sg,
    n,
    tx,
    sk,
    kg,
    rk = e.progress.rank;
  for (k = 0; k < gs.length; k++) {
    g = gs[k];
    t = Math.max(0, Math.round((mt && mt[g]) || 0));
    if (!t) continue;
    x = ejercicioDe(g, rk, mod) || {};
    if (!x.name) continue;
    pr = sdcSplit(t, sdcNSets(t))[0] || t;
    sg = sdcSegs(alternativaEjercicio(rk, g, mod) || regresiones[g]);
    if (sg > 0) {
      n = Math.max(5, Math.min(15, Math.round((pr * sg) / 15) * 5));
      tx = n + " segundos, " + (mod === "gym" ? "sin carga extra" : "sin llegar al temblor");
    } else if (mod === "gym") {
      n = Math.max(4, Math.min(8, Math.round(pr * 0.6)));
      sk = sdcSugKg(e, g, x.name);
      kg = sk && sk.kg ? sk.kg / 2 : 0;
      if (kg > 0) {
        var pa = sdcIncKg(kg, g);
        kg = Math.round(kg / pa) * pa;
      }
      tx =
        n +
        " repeticiones con la mitad del peso" +
        (kg > 0 ? " (≈ " + sdcKgTxt(kg) + " kg)" : " que vas a usar");
    } else {
      n = Math.max(pr >= 5 ? 2 : 1, Math.min(6, Math.round(pr * 0.4)));
      tx = n + (n === 1 ? " repetición suave" : " repeticiones suaves");
    }
    l.push({ g: g, name: x.name, dosis: tx, sost: sg > 0 });
  }
  return l;
}
function sdcEstDesde(l, k) {
  var a = 0,
    j;
  for (j = 0; j < k && j < l.length; j++) a += (l[j].prep || sdcEstPrep) + l[j].seconds;
  return a;
}
function sdcPasosV(e) {
  return (e && e.pasosVistos) || {};
}
function sdcPasoEspera(l, k, v) {
  var s = l && l[k];
  if (!s) return !1;
  if (k > 0 && l[k - 1].name === s.name) return !1;
  return !(v && v[s.name]);
}
function sdcPasosMarcar(a, l, n) {
  if (!a || !l) return a;
  var v = {},
    q,
    o = a.pasosVistos || {},
    j;
  for (q in o) v[q] = o[q];
  for (j = 0; j < n && j < l.length; j++) v[l[j].name] = 1;
  a.pasosVistos = v;
  return a;
}
function sdcPasosHook(r, l, n) {
  r && r.state && sdcPasosMarcar(r.state, l, n);
  return r;
}
function sdcPasoVista({
  ls: ls,
  p: p,
  cab: cab,
  col: col,
  esp: esp,
  pz: pz,
  fin: fn,
  resto: rs,
  onListo: oL,
  onYa: oY,
  onPausa: oP,
  onSeguir: oS,
  onTerminar: oT,
}) {
  let s = ls[p.index],
    m = ls[p.index + 1],
    pr = p.prep > 0,
    cc = esp || pr ? "#ffb84f" : col,
    bSec = {
      minHeight: 44,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#e8ecf7",
      fontWeight: 600,
    },
    bPri = {
      minHeight: 48,
      background: col,
      border: "1px solid " + col,
      color: "#0a0e1a",
      fontWeight: 700,
    },
    et = esp
      ? "LEÉ Y PONETE EN POSICIÓN"
      : pz
        ? "EN PAUSA"
        : pr
          ? p.index === 0
            ? "PONETE EN POSICIÓN"
            : "PREPARATE"
          : null;
  return i.default.createElement(
    "div",
    null,
    cab,
    i.default.createElement(
      "div",
      { className: "text-center" },
      et
        ? i.default.createElement(
            "div",
            {
              className: "text-xs uppercase",
              style: {
                letterSpacing: 2,
                color: pz && !esp ? "#9aa4bd" : "#ffb84f",
                fontWeight: 700,
                marginTop: 2,
              },
            },
            et,
          )
        : null,
      i.default.createElement(
        "div",
        {
          style: {
            fontFamily: "Chakra Petch, sans-serif",
            fontSize: 20,
            color: "#e8ecf7",
            fontWeight: 700,
          },
        },
        s.name,
      ),
      s.lado
        ? i.default.createElement(
            "div",
            { className: "text-sm", style: { color: cc, fontWeight: 700 } },
            s.lado,
          )
        : null,
      i.default.createElement(
        "div",
        {
          className: "mt-1",
          style: { fontSize: esp ? 15 : 14, lineHeight: 1.5, color: "#c8d0e4" },
        },
        s.desc,
      ),
      esp
        ? null
        : i.default.createElement(
            "div",
            {
              style: {
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 34,
                color: pz ? "#7a83a0" : cc,
                marginTop: 6,
              },
            },
            pr ? p.prep : p.left,
            "s",
          ),
    ),
    esp
      ? null
      : i.default.createElement(qa, {
          value: pr ? (s.prep || sdcEstPrep) - p.prep : s.seconds - p.left,
          max: pr ? s.prep || sdcEstPrep : s.seconds,
          color: pz ? "#5a6178" : cc,
        }),
    i.default.createElement(
      "div",
      { className: "text-xs mt-2 text-center", style: { color: "#7a83a0" } },
      m ? (m.name === s.name ? "Ahora el otro lado" : "Sigue: " + m.name) : fn,
      rs,
    ),
    esp
      ? i.default.createElement(
          "button",
          { onClick: oL, className: "w-full mt-3 py-3 text-sm", style: bPri },
          "Listo, empezar →",
        )
      : pz
        ? i.default.createElement(
            "button",
            { onClick: oS, className: "w-full mt-3 py-3 text-sm", style: bPri },
            "Seguir →",
          )
        : pr
          ? i.default.createElement(
              "button",
              {
                onClick: oY,
                className: "w-full mt-3 py-2 text-sm",
                style: {
                  minHeight: 44,
                  background: "rgba(255,184,79,0.12)",
                  border: "1px solid #ffb84f",
                  color: "#ffb84f",
                  fontWeight: 700,
                },
              },
              "Ya estoy →",
            )
          : null,
    esp || pz
      ? i.default.createElement(
          "button",
          { onClick: oT, className: "w-full mt-2 py-2 text-sm", style: bSec },
          "Terminar acá",
        )
      : i.default.createElement(
          "div",
          { className: "grid grid-cols-2 gap-2 mt-2" },
          i.default.createElement(
            "button",
            { onClick: oP, className: "py-2 text-sm", style: bSec },
            "Pausa",
          ),
          i.default.createElement(
            "button",
            { onClick: oT, className: "py-2 text-sm", style: bSec },
            "Terminar acá",
          ),
        ),
  );
}
function sdcCalorCorre(c, mod, tt) {
  return c.ini > 0 && c.mod === mod && (c.pz || Date.now()) - c.ini < (tt + 1200) * 1e3;
}
function sdcCalorT(c) {
  return Math.max(0, Math.floor(((c.pz || Date.now()) - c.ini) / 1e3));
}
function sdcCalorIni(e, mod) {
  var a = clonar(e),
    c = sdcCalor(a);
  a.today.calentamiento = {
    mod: mod,
    ini: Date.now(),
    pot: 0,
    xp: !!c.xp,
    hecho: !!c.hecho,
    pz: 0,
    ok: -1,
  };
  return { state: a, notices: [] };
}
function sdcCalorPrep(e, s) {
  var a = clonar(e),
    c = a.today.calentamiento;
  c && c.ini && !c.pz && (c.ini -= s * 1e3);
  return { state: a, notices: [] };
}
function sdcCalorPausa(e) {
  var a = clonar(e),
    c = a.today.calentamiento;
  c && c.ini && !c.pz && (c.pz = Date.now());
  return { state: a, notices: [] };
}
function sdcCalorSeguir(e) {
  var a = clonar(e),
    c = a.today.calentamiento;
  c && c.ini && c.pz && ((c.ini += Date.now() - c.pz), (c.pz = 0));
  return { state: a, notices: [] };
}
function sdcCalorEspera(e, w) {
  var a = clonar(e),
    c = a.today.calentamiento;
  c && c.ini && !c.pz && (c.pz = w);
  return { state: a, notices: [] };
}
function sdcCalorListo(e, k, d0) {
  var a = clonar(e),
    c = a.today.calentamiento;
  c && c.ini && ((c.ini = Date.now() - d0 * 1e3), (c.pz = 0), (c.ok = k));
  return { state: a, notices: [] };
}
function sdcCalorPot(e) {
  var a = clonar(e),
    c = a.today.calentamiento;
  c && c.ini && (c.pot = (c.pot || 0) + 1);
  return { state: a, notices: [] };
}
function sdcCalorFin(e, hh, tt, ls) {
  var a = clonar(e),
    c = sdcCalor(a),
    l = [],
    fr,
    n,
    o;
  if (!c.ini) return { state: a, notices: l };
  fr = tt > 0 ? Math.max(0, Math.min(1, (hh || 0) / tt)) : 1;
  a.today.calentamiento = {
    mod: c.mod,
    ini: 0,
    pot: 0,
    xp: !!c.xp,
    hecho: !!c.hecho || fr >= 0.34,
  };
  sdcPasosMarcar(a, ls, Math.min(hh || 0, ls ? ls.length : 0));
  if (fr < 0.34)
    return {
      state: a,
      notices: [
        "Calentamiento cortado muy temprano, sin XP. Si vas a entrenar igual, hacé las primeras series más livianas.",
      ],
    };
  if (c.xp)
    return { state: a, notices: ["Calentamiento hecho. La XP de hoy ya la habías sumado."] };
  a.today.calentamiento.xp = !0;
  n = Math.round(10 * fr);
  a.streak.flexBuff && (n = Math.round(n * 1.1));
  n = Math.round(n * multImpulso(a));
  a.progress.currentXP += n;
  a.today.xpEarned = (a.today.xpEarned || 0) + n;
  l.push(
    fr >= 0.999
      ? "+" + n + " XP por calentar. Ahora sí, la rutina."
      : "+" + n + " XP por lo que alcanzaste a calentar.",
  );
  a = subirNiveles(a, l);
  o = revisarLogros(a);
  return { state: o.state, notices: l.concat(o.notices) };
}
function sdcCalorDer(e, mod, mt) {
  var c = sdcCalor(e),
    ls = sdcCalorLista(mod, e.progress.rank),
    tt = sdcEstTotal(ls);
  if (sdcCalorCorre(c, mod, tt)) return "en curso";
  if (c.hecho) return "hecho ✓";
  return (
    "≈ " + Math.max(1, Math.round((tt + sdcCalorEnsayo(e, mod, mt).length * 20) / 60)) + " min"
  );
}
function sdcCalorCard({ st: e, mod: B, metas: mt, Ne: Ne, onModo: om, sinSeries: ss }) {
  let [, tk] = (0, i.useState)(0),
    [ul, sul] = (0, i.useState)(-1),
    c = sdcCalor(e),
    ls = sdcCalorLista(B, e.progress.rank),
    en = sdcCalorEnsayo(e, B, mt),
    tt = sdcEstTotal(ls),
    tot = ls.length + en.length,
    corre = sdcCalorCorre(c, B, tt),
    t = corre ? sdcCalorT(c) : 0,
    k = c.pot || 0,
    enE = corre && t >= tt,
    p = corre && !enE ? sdcEstPaso(ls, t) : null,
    ok = c.ok === void 0 ? -1 : c.ok,
    esp = !!(p && p.prep > 0 && ok < p.index && sdcPasoEspera(ls, p.index, sdcPasosV(e))),
    fs = !corre ? -1 : enE ? 1e3 + k : p.index * 2 + (p.prep > 0 ? 0 : 1),
    ac = "#ff8f5a",
    fin = (hh) => Ne((d) => sdcCalorFin(d, hh, tot, ls)),
    arr = () => {
      (sdcBeep(660, 120), sdcVib(22), Ne((d) => sdcCalorIni(d, B)));
    },
    bSec = {
      minHeight: 44,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#e8ecf7",
      fontWeight: 600,
    };
  sdcWakeSi(corre);
  (0, i.useEffect)(() => {
    if (!corre) return;
    let x = setInterval(() => tk((n) => n + 1), 300);
    return () => clearInterval(x);
  }, [corre, c.ini, c.pz]);
  (0, i.useEffect)(() => {
    if (fs < 0) return;
    if (ul < 0 || fs < ul) {
      sul(fs);
      return;
    }
    if (fs === ul) return;
    sul(fs);
    fs === 1e3
      ? (sdcBeep(880, 160), sdcVib([30, 50, 30]))
      : fs < 1e3 &&
        (p && p.prep > 0 ? (sdcBeep(520, 120), sdcVib(18)) : (sdcBeep(760, 140), sdcVib(22)));
  }, [fs]);
  (0, i.useEffect)(() => {
    esp && !c.pz && Ne((d) => sdcCalorEspera(d, c.ini + sdcEstDesde(ls, p.index) * 1e3));
  }, [esp, c.pz]);
  (0, i.useEffect)(() => {
    corre &&
      enE &&
      k >= en.length &&
      (sdcBeep(880, 200),
      setTimeout(() => sdcBeep(1175, 340), 210),
      sdcVib([40, 60, 140]),
      fin(tot));
  }, [corre, enE, k, en.length]);
  let cab = (f, n) =>
    i.default.createElement(
      "div",
      { className: "flex items-center justify-between mb-1" },
      i.default.createElement(
        "span",
        { className: "text-xs", style: { letterSpacing: 2, color: ac, fontWeight: 700 } },
        f,
        " · ",
        sdcCalorFases[f - 1],
      ),
      i.default.createElement(
        "span",
        { className: "text-xs", style: { color: "#9aa4bd" } },
        "Paso ",
        n,
        " de ",
        tot,
      ),
    );
  if (!corre) {
    if (c.hecho)
      return i.default.createElement(
        "div",
        null,
        i.default.createElement(
          "div",
          { className: "flex items-center gap-2 text-sm", style: { color: "#3ecf8e" } },
          i.default.createElement(Mn, { size: 16 }),
          " Calentaste hoy",
        ),
        i.default.createElement(sdcAnimoAhora, {
          st: e,
          Ne: Ne,
          onModo: om || function () {},
          sinSeries: ss,
        }),
        i.default.createElement(
          "div",
          { className: "text-xs mt-1", style: { color: "#9aa4bd" } },
          "Si más tarde entrenás otra vez, conviene repetirlo.",
        ),
        i.default.createElement(
          "button",
          {
            onClick: arr,
            className: "w-full mt-2 py-2 text-xs",
            style: {
              minHeight: 44,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#9aa4bd",
            },
          },
          "Calentar de nuevo (sin XP)",
        ),
      );
    return i.default.createElement(
      "div",
      null,
      i.default.createElement(
        "button",
        {
          onClick: arr,
          className: "w-full py-3 px-3 text-sm text-left",
          style: {
            background: "rgba(255,143,90,0.12)",
            border: "1px solid " + ac,
            color: ac,
            fontWeight: 700,
          },
        },
        i.default.createElement(
          "div",
          { className: "flex items-center justify-between" },
          i.default.createElement(
            "span",
            { style: { display: "inline-flex", alignItems: "center", gap: 8 } },
            i.default.createElement(Ph, { size: 16 }),
            "Empezar",
          ),
          i.default.createElement(
            "span",
            { className: "text-xs", style: { whiteSpace: "nowrap" } },
            "≈ ",
            Math.max(1, Math.round((tt + en.length * 20) / 60)),
            " min · ",
            tot,
            " pasos",
          ),
        ),
        i.default.createElement(
          "div",
          { className: "text-xs mt-1", style: { color: "#9aa4bd", fontWeight: 400 } },
          "Pulso, movilidad, activación y un ensayo suave de tus ejercicios de hoy",
        ),
      ),
      i.default.createElement(
        "div",
        { className: "text-xs mt-2", style: { color: "#7a83a0" } },
        "Da 10 XP una vez por día.",
      ),
    );
  }
  if (!enE)
    return i.default.createElement(sdcPasoVista, {
      ls: ls,
      p: p,
      cab: cab(ls[p.index].f, p.index + 1),
      col: ac,
      esp: esp,
      pz: !!c.pz && !esp,
      fin: en.length ? "Sigue: el ensayo de tus ejercicios" : "Último paso",
      resto: en.length
        ? " · " + sdcEstMMSS(tt - t) + " hasta el ensayo"
        : " · queda " + sdcEstMMSS(tt - t),
      onListo: () => {
        let d0 = sdcEstDesde(ls, p.index) + Math.max(0, (ls[p.index].prep || sdcEstPrep) - 3);
        (sdcBeep(660, 100), Ne((d) => sdcCalorListo(d, p.index, d0)));
      },
      onYa: () => Ne((d) => sdcCalorPrep(d, p.prep)),
      onPausa: () => Ne((d) => sdcCalorPausa(d)),
      onSeguir: () => Ne((d) => sdcCalorSeguir(d)),
      onTerminar: () => fin(p.index),
    });
  if (k < en.length) {
    let x = en[k],
      gy = B === "gym",
      sig = () => {
        (sdcBeep(760, 120), sdcVib(22), Ne((d) => sdcCalorPot(d)));
      };
    return i.default.createElement(
      "div",
      null,
      cab(4, ls.length + k + 1),
      i.default.createElement(
        "div",
        { className: "text-center" },
        i.default.createElement(
          "div",
          {
            className: "text-xs uppercase",
            style: { letterSpacing: 2, color: "#9aa4bd", marginTop: 2 },
          },
          "Ejercicio ",
          k + 1,
          " de ",
          en.length,
          " · el mismo de tu rutina",
        ),
        i.default.createElement(
          "div",
          {
            style: {
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 20,
              color: "#e8ecf7",
              fontWeight: 700,
            },
          },
          x.name,
        ),
        i.default.createElement(
          "div",
          {
            style: {
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 18,
              color: ac,
              fontWeight: 700,
              marginTop: 4,
            },
          },
          x.dosis,
        ),
        i.default.createElement(
          "div",
          { className: "mt-1", style: { fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" } },
          x.sost
            ? "En la posición exacta y sin apurarte: es un ensayo, no una serie."
            : "Con todo el recorrido y lejos del cansancio: es un ensayo, no una serie.",
          gy ? " Si la máquina está ocupada, hazlo justo antes de su primera serie." : "",
        ),
      ),
      i.default.createElement(
        "button",
        {
          onClick: sig,
          className: "w-full mt-3 py-3 text-sm",
          style: {
            minHeight: 48,
            background: ac,
            border: "1px solid " + ac,
            color: "#0a0e1a",
            fontWeight: 700,
          },
        },
        k + 1 < en.length ? "Hecho →" : "Hecho, terminar",
      ),
      gy
        ? i.default.createElement(
            "button",
            {
              onClick: sig,
              className: "w-full mt-2 py-2 text-xs",
              style: {
                minHeight: 44,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#9aa4bd",
              },
            },
            "Lo hago antes de su primera serie",
          )
        : null,
      i.default.createElement(
        "button",
        { onClick: () => fin(ls.length + k), className: "w-full mt-2 py-2 text-sm", style: bSec },
        "Terminar acá",
      ),
    );
  }
  return null;
}

export {
  sdcCalorFases,
  sdcCalorPasos,
  sdcCalorPuente,
  sdcCalorEscap,
  sdcCalorDead,
  sdcCalorHollow,
  sdcCalorAct,
  sdcCalorActF,
  sdcCalor,
  sdcCalorLista,
  sdcCalorEnsayo,
  sdcEstDesde,
  sdcPasosV,
  sdcPasoEspera,
  sdcPasosMarcar,
  sdcPasosHook,
  sdcPasoVista,
  sdcCalorCorre,
  sdcCalorT,
  sdcCalorIni,
  sdcCalorPrep,
  sdcCalorPausa,
  sdcCalorSeguir,
  sdcCalorEspera,
  sdcCalorListo,
  sdcCalorPot,
  sdcCalorFin,
  sdcCalorDer,
  sdcCalorCard,
};
