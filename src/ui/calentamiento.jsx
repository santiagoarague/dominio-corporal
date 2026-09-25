// Calentamiento y los pasos guiados que comparte con el estiramiento.
import { useState, useEffect } from "react";
import { IconoCheck, IconoLlama } from "./iconos.jsx";
import { multImpulso } from "../logica/tienda.js";
import { sdcEstMMSS, sdcEstPaso, sdcEstPrep, sdcEstTotal } from "../logica/estiramiento.js";
import { revisarLogros } from "../datos/logros.js";
import { alternativaEjercicio, ejercicioDe } from "../logica/rutina.js";
import { subirNiveles, clonar } from "../logica/partida.js";
import { BarraXp } from "./base.jsx";
import { sdcIncKg, sdcKgTxt, sdcSugKg } from "../logica/extras.js";
import { sdcBeep, sdcNSets, sdcSegs, sdcSplit, sdcVib } from "../logica/series.js";
import { usePantallaSi } from "./pantalla.js";
import { AnimoAhora } from "./animo.jsx";

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
function sdcCalor(partida) {
  return (partida && partida.today && partida.today.calentamiento) || {};
}
function sdcCalorLista(mod, rango) {
  var lista = [],
    i,
    paso,
    grupo,
    opciones,
    nombre,
    j,
    elegida,
    grupos = ["squat", "pushup", "back", "abs"];
  for (i = 0; i < sdcCalorPasos.length; i++) {
    paso = sdcCalorPasos[i];
    if (paso.lados) {
      lista.push({
        f: paso.f,
        name: paso.name,
        desc: paso.desc,
        seconds: paso.seconds,
        lado: "lado derecho",
        prep: paso.pr,
      });
      lista.push({
        f: paso.f,
        name: paso.name,
        desc: paso.desc,
        seconds: paso.seconds,
        lado: "lado izquierdo",
      });
    } else
      lista.push({
        f: paso.f,
        name: paso.name,
        desc: paso.desc,
        seconds: paso.seconds,
        lado: null,
        prep: paso.pr,
      });
  }
  for (i = 0; i < grupos.length; i++) {
    grupo = grupos[i];
    opciones = (mod === "flow" && sdcCalorActF[grupo]) || sdcCalorAct[grupo];
    nombre = (ejercicioDe(grupo, rango, mod) || {}).name || "";
    elegida = opciones[0];
    for (j = 0; j < opciones.length; j++)
      if (!opciones[j].ev || !opciones[j].ev.test(nombre)) {
        elegida = opciones[j];
        break;
      }
    lista.push({ f: 3, name: elegida.name, desc: elegida.desc, seconds: 20, lado: null, prep: 8 });
  }
  return lista;
}
function sdcCalorEnsayo(partida, mod, metas) {
  var grupos = ["squat", "pushup", "back", "abs"],
    lista = [],
    i,
    grupo,
    ej,
    meta,
    primera,
    segs,
    cant,
    texto,
    sug,
    kg,
    rango = partida.progress.rank;
  for (i = 0; i < grupos.length; i++) {
    grupo = grupos[i];
    meta = Math.max(0, Math.round((metas && metas[grupo]) || 0));
    if (!meta) continue;
    ej = ejercicioDe(grupo, rango, mod) || {};
    if (!ej.name) continue;
    primera = sdcSplit(meta, sdcNSets(meta))[0] || meta;
    segs = sdcSegs(alternativaEjercicio(rango, grupo, mod));
    if (segs > 0) {
      cant = Math.max(5, Math.min(15, Math.round((primera * segs) / 15) * 5));
      texto = cant + " segundos, " + (mod === "gym" ? "sin carga extra" : "sin llegar al temblor");
    } else if (mod === "gym") {
      cant = Math.max(4, Math.min(8, Math.round(primera * 0.6)));
      sug = sdcSugKg(partida, grupo, ej.name);
      kg = sug && sug.kg ? sug.kg / 2 : 0;
      if (kg > 0) {
        var paso = sdcIncKg(kg, grupo);
        kg = Math.round(kg / paso) * paso;
      }
      texto =
        cant +
        " repeticiones con la mitad del peso" +
        (kg > 0 ? " (≈ " + sdcKgTxt(kg) + " kg)" : " que vas a usar");
    } else {
      cant = Math.max(primera >= 5 ? 2 : 1, Math.min(6, Math.round(primera * 0.4)));
      texto = cant + (cant === 1 ? " repetición suave" : " repeticiones suaves");
    }
    lista.push({ g: grupo, name: ej.name, dosis: texto, sost: segs > 0 });
  }
  return lista;
}
function sdcEstDesde(lista, indice) {
  var segundos = 0,
    i;
  for (i = 0; i < indice && i < lista.length; i++)
    segundos += (lista[i].prep || sdcEstPrep) + lista[i].seconds;
  return segundos;
}
function sdcPasosV(partida) {
  return (partida && partida.pasosVistos) || {};
}
function sdcPasoEspera(lista, indice, vistos) {
  var paso = lista && lista[indice];
  if (!paso) return !1;
  if (indice > 0 && lista[indice - 1].name === paso.name) return !1;
  return !(vistos && vistos[paso.name]);
}
function sdcPasosMarcar(partida, lista, hasta) {
  if (!partida || !lista) return partida;
  var vistos = {},
    clave,
    previos = partida.pasosVistos || {},
    i;
  for (clave in previos) vistos[clave] = previos[clave];
  for (i = 0; i < hasta && i < lista.length; i++) vistos[lista[i].name] = 1;
  partida.pasosVistos = vistos;
  return partida;
}
function sdcPasosHook(resultado, lista, hasta) {
  resultado && resultado.state && sdcPasosMarcar(resultado.state, lista, hasta);
  return resultado;
}
function PasoGuiado({
  lista,
  paso,
  cabecera,
  acento,
  esperando,
  pausado,
  fin,
  resto,
  onListo,
  onYa,
  onPausa,
  onSeguir,
  onTerminar,
}) {
  let actual = lista[paso.index],
    siguiente = lista[paso.index + 1],
    preparando = paso.prep > 0,
    color = esperando || preparando ? "#ffb84f" : acento,
    bSec = {
      minHeight: 44,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#e8ecf7",
      fontWeight: 600,
    },
    bPri = {
      minHeight: 48,
      background: acento,
      border: "1px solid " + acento,
      color: "#0a0e1a",
      fontWeight: 700,
    },
    etiqueta = esperando
      ? "LEÉ Y PONETE EN POSICIÓN"
      : pausado
        ? "EN PAUSA"
        : preparando
          ? paso.index === 0
            ? "PONETE EN POSICIÓN"
            : "PREPARATE"
          : null;
  return (
    <div>
      {cabecera}
      <div className="text-center">
        {etiqueta ? (
          <div
            className="text-xs uppercase"
            style={{
              letterSpacing: 2,
              color: pausado && !esperando ? "#9aa4bd" : "#ffb84f",
              fontWeight: 700,
              marginTop: 2,
            }}
          >
            {etiqueta}
          </div>
        ) : null}
        <div
          style={{
            fontFamily: "Chakra Petch, sans-serif",
            fontSize: 20,
            color: "#e8ecf7",
            fontWeight: 700,
          }}
        >
          {actual.name}
        </div>
        {actual.lado ? (
          <div className="text-sm" style={{ color, fontWeight: 700 }}>
            {actual.lado}
          </div>
        ) : null}
        <div
          className="mt-1"
          style={{ fontSize: esperando ? 15 : 14, lineHeight: 1.5, color: "#c8d0e4" }}
        >
          {actual.desc}
        </div>
        {esperando ? null : (
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 34,
              color: pausado ? "#8a93ad" : color,
              marginTop: 6,
            }}
          >
            {preparando ? paso.prep : paso.left}s
          </div>
        )}
      </div>
      {esperando ? null : (
        <BarraXp
          value={preparando ? (actual.prep || sdcEstPrep) - paso.prep : actual.seconds - paso.left}
          max={preparando ? actual.prep || sdcEstPrep : actual.seconds}
          color={pausado ? "#8a93ad" : color}
        />
      )}
      <div className="text-xs mt-2 text-center" style={{ color: "#8a93ad" }}>
        {siguiente
          ? siguiente.name === actual.name
            ? "Ahora el otro lado"
            : "Sigue: " + siguiente.name
          : fin}
        {resto}
      </div>
      {esperando ? (
        <button onClick={onListo} className="w-full mt-3 py-3 text-sm" style={bPri}>
          Listo, empezar →
        </button>
      ) : pausado ? (
        <button onClick={onSeguir} className="w-full mt-3 py-3 text-sm" style={bPri}>
          Seguir →
        </button>
      ) : preparando ? (
        <button
          onClick={onYa}
          className="w-full mt-3 py-2 text-sm"
          style={{
            minHeight: 44,
            background: "rgba(255,184,79,0.12)",
            border: "1px solid #ffb84f",
            color: "#ffb84f",
            fontWeight: 700,
          }}
        >
          Ya estoy →
        </button>
      ) : null}
      {esperando || pausado ? (
        <button onClick={onTerminar} className="w-full mt-2 py-2 text-sm" style={bSec}>
          Terminar acá
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button onClick={onPausa} className="py-2 text-sm" style={bSec}>
            Pausa
          </button>
          <button onClick={onTerminar} className="py-2 text-sm" style={bSec}>
            Terminar acá
          </button>
        </div>
      )}
    </div>
  );
}
function sdcCalorCorre(estado, mod, total) {
  return (
    estado.ini > 0 &&
    estado.mod === mod &&
    (estado.pz || Date.now()) - estado.ini < (total + 1200) * 1e3
  );
}
function sdcCalorT(estado) {
  return Math.max(0, Math.floor(((estado.pz || Date.now()) - estado.ini) / 1e3));
}
function sdcCalorIni(original, mod) {
  var partida = clonar(original),
    previo = sdcCalor(partida);
  partida.today.calentamiento = {
    mod: mod,
    ini: Date.now(),
    pot: 0,
    xp: !!previo.xp,
    hecho: !!previo.hecho,
    pz: 0,
    ok: -1,
  };
  return { state: partida, notices: [] };
}
function sdcCalorPrep(original, segundos) {
  var partida = clonar(original),
    estado = partida.today.calentamiento;
  estado && estado.ini && !estado.pz && (estado.ini -= segundos * 1e3);
  return { state: partida, notices: [] };
}
function sdcCalorPausa(original) {
  var partida = clonar(original),
    estado = partida.today.calentamiento;
  estado && estado.ini && !estado.pz && (estado.pz = Date.now());
  return { state: partida, notices: [] };
}
function sdcCalorSeguir(original) {
  var partida = clonar(original),
    estado = partida.today.calentamiento;
  estado && estado.ini && estado.pz && ((estado.ini += Date.now() - estado.pz), (estado.pz = 0));
  return { state: partida, notices: [] };
}
function sdcCalorEspera(original, desde) {
  var partida = clonar(original),
    estado = partida.today.calentamiento;
  estado && estado.ini && !estado.pz && (estado.pz = desde);
  return { state: partida, notices: [] };
}
function sdcCalorListo(original, indice, hasta) {
  var partida = clonar(original),
    estado = partida.today.calentamiento;
  estado &&
    estado.ini &&
    ((estado.ini = Date.now() - hasta * 1e3), (estado.pz = 0), (estado.ok = indice));
  return { state: partida, notices: [] };
}
function sdcCalorPot(original) {
  var partida = clonar(original),
    estado = partida.today.calentamiento;
  estado && estado.ini && (estado.pot = (estado.pot || 0) + 1);
  return { state: partida, notices: [] };
}
function sdcCalorFin(original, hechos, total, lista) {
  var partida = clonar(original),
    estado = sdcCalor(partida),
    avisos = [],
    fraccion,
    xp,
    revisado;
  if (!estado.ini) return { state: partida, notices: avisos };
  fraccion = total > 0 ? Math.max(0, Math.min(1, (hechos || 0) / total)) : 1;
  partida.today.calentamiento = {
    mod: estado.mod,
    ini: 0,
    pot: 0,
    xp: !!estado.xp,
    hecho: !!estado.hecho || fraccion >= 0.34,
  };
  sdcPasosMarcar(partida, lista, Math.min(hechos || 0, lista ? lista.length : 0));
  if (fraccion < 0.34)
    return {
      state: partida,
      notices: [
        "Calentamiento cortado muy temprano, sin XP. Si vas a entrenar igual, hacé las primeras series más livianas.",
      ],
    };
  if (estado.xp)
    return { state: partida, notices: ["Calentamiento hecho. La XP de hoy ya la habías sumado."] };
  partida.today.calentamiento.xp = !0;
  xp = Math.round(10 * fraccion);
  partida.streak.flexBuff && (xp = Math.round(xp * 1.1));
  xp = Math.round(xp * multImpulso(partida));
  partida.progress.currentXP += xp;
  partida.today.xpEarned = (partida.today.xpEarned || 0) + xp;
  avisos.push(
    fraccion >= 0.999
      ? "+" + xp + " XP por calentar. Ahora sí, la rutina."
      : "+" + xp + " XP por lo que alcanzaste a calentar.",
  );
  partida = subirNiveles(partida, avisos);
  revisado = revisarLogros(partida);
  return { state: revisado.state, notices: avisos.concat(revisado.notices) };
}
function sdcCalorDer(partida, mod, metas) {
  var estado = sdcCalor(partida),
    lista = sdcCalorLista(mod, partida.progress.rank),
    total = sdcEstTotal(lista);
  if (sdcCalorCorre(estado, mod, total)) return "en curso";
  if (estado.hecho) return "hecho ✓";
  return (
    "≈ " +
    Math.max(1, Math.round((total + sdcCalorEnsayo(partida, mod, metas).length * 20) / 60)) +
    " min"
  );
}
function Calentamiento({ player, mod, metas, aplicar, onModo, sinSeries }) {
  let [, setTic] = useState(0),
    [ultimaFase, setUltimaFase] = useState(-1),
    estado = sdcCalor(player),
    lista = sdcCalorLista(mod, player.progress.rank),
    ensayo = sdcCalorEnsayo(player, mod, metas),
    totalSeg = sdcEstTotal(lista),
    tot = lista.length + ensayo.length,
    corre = sdcCalorCorre(estado, mod, totalSeg),
    transcurrido = corre ? sdcCalorT(estado) : 0,
    ensayados = estado.pot || 0,
    enE = corre && transcurrido >= totalSeg,
    paso = corre && !enE ? sdcEstPaso(lista, transcurrido) : null,
    ok = estado.ok === void 0 ? -1 : estado.ok,
    esp = !!(
      paso &&
      paso.prep > 0 &&
      ok < paso.index &&
      sdcPasoEspera(lista, paso.index, sdcPasosV(player))
    ),
    fase = !corre ? -1 : enE ? 1e3 + ensayados : paso.index * 2 + (paso.prep > 0 ? 0 : 1),
    acento = "#ff8f5a",
    fin = (hechos) => aplicar((partida) => sdcCalorFin(partida, hechos, tot, lista)),
    arr = () => {
      (sdcBeep(660, 120), sdcVib(22), aplicar((partida) => sdcCalorIni(partida, mod)));
    },
    bSec = {
      minHeight: 44,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.28)",
      color: "#e8ecf7",
      fontWeight: 600,
    };
  usePantallaSi(corre);
  useEffect(() => {
    if (!corre) return;
    let reloj = setInterval(() => setTic((previo) => previo + 1), 300);
    return () => clearInterval(reloj);
  }, [corre, estado.ini, estado.pz]);
  useEffect(() => {
    if (fase < 0) return;
    if (ultimaFase < 0 || fase < ultimaFase) {
      setUltimaFase(fase);
      return;
    }
    if (fase === ultimaFase) return;
    setUltimaFase(fase);
    fase === 1e3
      ? (sdcBeep(880, 160), sdcVib([30, 50, 30]))
      : fase < 1e3 &&
        (paso && paso.prep > 0 ? (sdcBeep(520, 120), sdcVib(18)) : (sdcBeep(760, 140), sdcVib(22)));
  }, [fase]);
  useEffect(() => {
    esp &&
      !estado.pz &&
      aplicar((partida) =>
        sdcCalorEspera(partida, estado.ini + sdcEstDesde(lista, paso.index) * 1e3),
      );
  }, [esp, estado.pz]);
  useEffect(() => {
    corre &&
      enE &&
      ensayados >= ensayo.length &&
      (sdcBeep(880, 200),
      setTimeout(() => sdcBeep(1175, 340), 210),
      sdcVib([40, 60, 140]),
      fin(tot));
  }, [corre, enE, ensayados, ensayo.length]);
  let cab = (numFase, numero) => (
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs" style={{ letterSpacing: 2, color: acento, fontWeight: 700 }}>
        {numFase} · {sdcCalorFases[numFase - 1]}
      </span>
      <span className="text-xs" style={{ color: "#9aa4bd" }}>
        Paso {numero} de {tot}
      </span>
    </div>
  );
  if (!corre) {
    if (estado.hecho)
      return (
        <div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#3ecf8e" }}>
            <IconoCheck size={16} /> Calentaste hoy
          </div>
          <AnimoAhora
            player={player}
            aplicar={aplicar}
            onModo={onModo || function () {}}
            sinSeries={sinSeries}
          />
          <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
            Si más tarde entrenás otra vez, conviene repetirlo.
          </div>
          <button
            onClick={arr}
            className="w-full mt-2 py-2 text-xs"
            style={{
              minHeight: 44,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#9aa4bd",
            }}
          >
            Calentar de nuevo (sin XP)
          </button>
        </div>
      );
    return (
      <div>
        <button
          onClick={arr}
          className="w-full py-3 px-3 text-sm text-left"
          style={{
            background: "rgba(255,143,90,0.12)",
            border: "1px solid " + acento,
            color: acento,
            fontWeight: 700,
          }}
        >
          <div className="flex items-center justify-between">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <IconoLlama size={16} />
              Empezar
            </span>
            <span className="text-xs" style={{ whiteSpace: "nowrap" }}>
              ≈ {Math.max(1, Math.round((totalSeg + ensayo.length * 20) / 60))} min · {tot} pasos
            </span>
          </div>
          <div className="text-xs mt-1" style={{ color: "#9aa4bd", fontWeight: 400 }}>
            Pulso, movilidad, activación y un ensayo suave de tus ejercicios de hoy
          </div>
        </button>
        <div className="text-xs mt-2" style={{ color: "#8a93ad" }}>
          Da 10 XP una vez por día.
        </div>
      </div>
    );
  }
  if (!enE)
    return (
      <PasoGuiado
        lista={lista}
        paso={paso}
        cabecera={cab(lista[paso.index].f, paso.index + 1)}
        acento={acento}
        esperando={esp}
        pausado={!!estado.pz && !esp}
        fin={ensayo.length ? "Sigue: el ensayo de tus ejercicios" : "Último paso"}
        resto={
          ensayo.length
            ? " · " + sdcEstMMSS(totalSeg - transcurrido) + " hasta el ensayo"
            : " · queda " + sdcEstMMSS(totalSeg - transcurrido)
        }
        onListo={() => {
          let hasta =
            sdcEstDesde(lista, paso.index) +
            Math.max(0, (lista[paso.index].prep || sdcEstPrep) - 3);
          (sdcBeep(660, 100), aplicar((partida) => sdcCalorListo(partida, paso.index, hasta)));
        }}
        onYa={() => aplicar((partida) => sdcCalorPrep(partida, paso.prep))}
        onPausa={() => aplicar((partida) => sdcCalorPausa(partida))}
        onSeguir={() => aplicar((partida) => sdcCalorSeguir(partida))}
        onTerminar={() => fin(paso.index)}
      />
    );
  if (ensayados < ensayo.length) {
    let ej = ensayo[ensayados],
      esGym = mod === "gym",
      sig = () => {
        (sdcBeep(760, 120), sdcVib(22), aplicar((partida) => sdcCalorPot(partida)));
      };
    return (
      <div>
        {cab(4, lista.length + ensayados + 1)}
        <div className="text-center">
          <div
            className="text-xs uppercase"
            style={{ letterSpacing: 2, color: "#9aa4bd", marginTop: 2 }}
          >
            Ejercicio {ensayados + 1} de {ensayo.length} · el mismo de tu rutina
          </div>
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 20,
              color: "#e8ecf7",
              fontWeight: 700,
            }}
          >
            {ej.name}
          </div>
          <div
            style={{
              fontFamily: "Chakra Petch, sans-serif",
              fontSize: 18,
              color: acento,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            {ej.dosis}
          </div>
          <div className="mt-1" style={{ fontSize: 14, lineHeight: 1.5, color: "#c8d0e4" }}>
            {ej.sost
              ? "En la posición exacta y sin apurarte: es un ensayo, no una serie."
              : "Con todo el recorrido y lejos del cansancio: es un ensayo, no una serie."}
            {esGym ? " Si la máquina está ocupada, hazlo justo antes de su primera serie." : ""}
          </div>
        </div>
        <button
          onClick={sig}
          className="w-full mt-3 py-3 text-sm"
          style={{
            minHeight: 48,
            background: acento,
            border: "1px solid " + acento,
            color: "#0a0e1a",
            fontWeight: 700,
          }}
        >
          {ensayados + 1 < ensayo.length ? "Hecho →" : "Hecho, terminar"}
        </button>
        {esGym ? (
          <button
            onClick={sig}
            className="w-full mt-2 py-2 text-xs"
            style={{
              minHeight: 44,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#9aa4bd",
            }}
          >
            Lo hago antes de su primera serie
          </button>
        ) : null}
        <button
          onClick={() => fin(lista.length + ensayados)}
          className="w-full mt-2 py-2 text-sm"
          style={bSec}
        >
          Terminar acá
        </button>
      </div>
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
  PasoGuiado,
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
  Calentamiento,
};
