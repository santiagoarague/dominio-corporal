// Como llegas: chequeo de animo.
import { useState } from "react";
import { reglaDolor } from "../datos/salud.js";
import { sistemaActivo } from "../logica/sistemas.js";
import { revisarLogros, sdcAnimo, sdcAnimoCuenta } from "../datos/logros.js";
import { clonar } from "../logica/partida.js";
import { sdcBeep, sdcVib } from "../logica/series.js";
import { sdcCalorIni } from "./calentamiento.jsx";

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
function sdcAnimoHoy(partida) {
  return partida && partida.today ? sdcAnimo(partida)[partida.today.date] || {} : {};
}
function sdcAnimoOn(partida) {
  return sistemaActivo(partida, "animo");
}
function sdcAnimoOtra(alTocar) {
  return (
    <button
      onClick={alTocar}
      className="text-xs"
      style={{
        color: "#7a83a0",
        minHeight: 40,
        padding: "0 4px",
        marginLeft: "auto",
        flexShrink: 0,
        background: "transparent",
        border: "none",
        textDecoration: "underline",
      }}
    >
      Cambiar respuesta
    </button>
  );
}
function sdcAnimoFrase(valor) {
  var cara = sdcAnimoEsc[(valor || 3) - 1];
  return cara ? cara.f : "";
}
function sdcAnimoPut(original, cambios) {
  var partida = clonar(original),
    fecha = partida.today.date,
    mapa = {},
    clave,
    previo = sdcAnimo(partida),
    delDia,
    nuevo = {},
    claves;
  for (clave in previo) mapa[clave] = previo[clave];
  delDia = mapa[fecha] || {};
  for (clave in delDia) nuevo[clave] = delDia[clave];
  for (clave in cambios) nuevo[clave] = cambios[clave];
  mapa[fecha] = nuevo;
  partida.seenUnlocks &&
    partida.seenUnlocks.indexOf("animo") < 0 &&
    partida.seenUnlocks.push("animo");
  claves = Object.keys(mapa).sort();
  for (clave = 0; clave < claves.length - 400; clave++) delete mapa[claves[clave]];
  partida.animo = mapa;
  return partida;
}
function sdcAnimoSet(partida, cambios) {
  return { state: sdcAnimoPut(partida, cambios), notices: [] };
}
function sdcAnimoSetDa(partida, cambios) {
  var revisado = revisarLogros(sdcAnimoPut(partida, cambios));
  return { state: revisado.state, notices: revisado.notices };
}
function sdcAnimoCalor(partida, modalidad) {
  var resultado = sdcCalorIni(sdcAnimoPut(partida, { ack: 1 }), modalidad),
    nueva = resultado.state;
  nueva.ui = nueva.ui || { collapsed: {} };
  nueva.ui.collapsed = nueva.ui.collapsed || {};
  nueva.ui.collapsed.calentamiento = !1;
  return resultado;
}
function sdcAbrirCard(original, id) {
  var partida = clonar(original);
  partida.ui = partida.ui || { collapsed: {} };
  partida.ui.collapsed = partida.ui.collapsed || {};
  partida.ui.collapsed[id] = !1;
  return { state: partida, notices: [] };
}
function sdcAnimoEvid(partida) {
  var respuestas = sdcAnimo(partida),
    hoy = partida.today.date,
    claves = Object.keys(respuestas)
      .filter(function (fecha) {
        var dia = respuestas[fecha];
        return fecha < hoy && dia && dia.antes && dia.antes <= 2 && dia.despues;
      })
      .sort()
      .slice(-5),
    mejor = 0;
  claves.forEach(function (fecha) {
    respuestas[fecha].despues > respuestas[fecha].antes && mejor++;
  });
  return { n: claves.length, m: mejor };
}
function sdcCargaRacha(partida) {
  var respuestas = sdcAnimo(partida),
    claves = Object.keys(respuestas)
      .filter(function (fecha) {
        return respuestas[fecha] && respuestas[fecha].carga;
      })
      .sort()
      .slice(-3),
    carga,
    i;
  if (claves.length < 3) return null;
  carga = respuestas[claves[0]].carga;
  for (i = 1; i < 3; i++) if (respuestas[claves[i]].carga !== carga) return null;
  return carga === "justa" ? null : carga;
}
function Cara({ n: nivel, size, color }) {
  var boca = [
    "M8 16.6 Q12 12.6 16 16.6",
    "M8.5 16 Q12 14.3 15.5 16",
    "M8.5 15.2 L15.5 15.2",
    "M8.5 14.4 Q12 17.6 15.5 14.4",
    "M7.5 13.4 H16.5 Q12 20.2 7.5 13.4 Z",
  ][(nivel || 3) - 1];
  return (
    <svg width={size || 26} height={size || 26} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx={12} cy={12} r={9.5} stroke={color} strokeWidth={1.8} />
      <circle cx={9} cy={10} r={1.2} fill={color} />
      <circle cx={15} cy={10} r={1.2} fill={color} />
      <path
        d={boca}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={nivel === 5 ? color : "none"}
      />
    </svg>
  );
}
function Caras({ sel, onPick }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 4 }}>
      {sdcAnimoEsc.map(function (cara) {
        var elegida = sel === cara.n,
          color = elegida ? "#4f9dff" : "#c8d0e4";
        return (
          <button
            key={cara.n}
            onClick={function () {
              (sdcBeep(560 + cara.n * 60, 70), sdcVib(12), onPick(cara.n));
            }}
            aria-pressed={elegida}
            style={{
              minHeight: 66,
              padding: "6px 2px",
              background: elegida ? "rgba(79,157,255,0.15)" : "rgba(255,255,255,0.03)",
              border: "1px solid " + (elegida ? "#4f9dff" : "rgba(255,255,255,0.12)"),
              color,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 4,
              paddingTop: 8,
            }}
          >
            <Cara n={cara.n} size={26} color={color} />
            <span
              style={{
                fontSize: 11,
                lineHeight: 1.2,
                textAlign: "center",
                minHeight: 27,
                display: "flex",
                alignItems: "center",
              }}
            >
              {cara.t}
            </span>
          </button>
        );
      })}
    </div>
  );
}
function AnimoAntes({ player, aplicar, mod, onModo, descLibre, onDescanso }) {
  let [confirmando, setConfirmando] = useState(!1),
    animo = sdcAnimoHoy(player),
    cambiar = (
      <button
        onClick={() => {
          (setConfirmando(!1),
            animo.modo && onModo("normal"),
            aplicar((partida) => sdcAnimoSet(partida, { antes: 0, cuerpo: 0, modo: 0, ack: 0 })));
        }}
        className="text-xs"
        style={{
          color: "#7a83a0",
          minHeight: 40,
          padding: "0 4px",
          background: "transparent",
          border: "none",
          textDecoration: "underline",
        }}
      >
        Cambiar respuesta
      </button>
    );
  if (!animo.antes)
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <span style={sdcAnimoTit}>¿Cómo llegás hoy?</span>
          <button
            onClick={() => aplicar((partida) => sdcAnimoSet(partida, { no: 1 }))}
            className="text-xs"
            style={{
              color: "#7a83a0",
              minHeight: 40,
              padding: "0 4px",
              background: "transparent",
              border: "none",
            }}
          >
            Hoy no
          </button>
        </div>
        <Caras
          sel={0}
          onPick={(valor) => aplicar((partida) => sdcAnimoSet(partida, { antes: valor }))}
        />
      </div>
    );
  if (animo.antes >= 3 || animo.ack)
    return (
      <div className="flex items-center gap-2" style={sdcAnimoTx}>
        <Cara n={animo.antes} size={22} color="#c8d0e4" />
        {"Llegás " + sdcAnimoFrase(animo.antes) + "."}
        <span style={{ marginLeft: "auto" }}>{cambiar}</span>
      </div>
    );
  if (!animo.cuerpo)
    return (
      <div>
        <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
          Llegás {sdcAnimoFrase(animo.antes)}.
        </div>
        <div className="mb-2" style={sdcAnimoTit}>
          ¿Y el cuerpo?
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sdcAnimoCuerpo.map((opcion) => (
            <button
              key={opcion.k}
              onClick={() => {
                (sdcVib(12),
                  opcion.k !== "dolor" && onModo("recovery"),
                  aplicar((partida) =>
                    sdcAnimoSet(
                      partida,
                      opcion.k !== "dolor"
                        ? { cuerpo: opcion.k, modo: "recovery" }
                        : { cuerpo: opcion.k },
                    ),
                  ));
              }}
              className="py-2 text-sm"
              style={sdcAnimoB2}
            >
              {opcion.t}
            </button>
          ))}
        </div>
        <div className="text-right">{cambiar}</div>
      </div>
    );
  if (animo.cuerpo === "dolor")
    return (
      <div>
        <div className="mb-1" style={sdcAnimoTit}>
          Hoy el cuerpo primero
        </div>
        <div className="mb-3" style={sdcAnimoTx}>
          Si es un dolor agudo o punzante, no entrenes esa zona hoy. {reglaDolor}
        </div>
        {descLibre ? (
          confirmando ? (
            <div className="mb-2">
              <div className="text-xs mb-2" style={{ color: "#ffb84f" }}>
                El día de descanso no da XP y solo tenés uno por semana.
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    (setConfirmando(!1), onDescanso());
                  }}
                  className="py-2 text-sm"
                  style={sdcAnimoB1}
                >
                  Sí, descansar
                </button>
                <button
                  onClick={() => setConfirmando(!1)}
                  className="py-2 text-sm"
                  style={sdcAnimoB2}
                >
                  Mejor no
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmando(!0)}
              className="w-full py-2 text-sm mb-2"
              style={sdcAnimoB2}
            >
              Usar mi día de descanso
            </button>
          )
        ) : null}
        <button
          onClick={() => {
            (onModo("recovery"),
              aplicar((partida) => sdcAnimoSet(partida, { modo: "recovery", ack: 1 })));
          }}
          className="w-full py-2 text-sm"
          style={sdcAnimoB2}
        >
          Entrenar suave, sin esa zona
        </button>
        <div className="text-right">{cambiar}</div>
      </div>
    );
  let evidencia = sdcAnimoEvid(player);
  return (
    <div>
      <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
        Llegás {sdcAnimoFrase(animo.antes)}.
      </div>
      <div className="mb-2" style={sdcAnimoTit}>
        Hoy alcanza con empezar
      </div>
      <div style={sdcAnimoTx}>
        Hacé el calentamiento y la rutina en Recuperación, con la mitad de las repeticiones. Si
        después del calentamiento te vino el envión, pasás a la normal.
      </div>
      {evidencia.n >= 3 && evidencia.m >= 2 ? (
        <div className="mt-2 p-2 text-sm" style={sdcAnimoEvBox}>
          Las últimas {evidencia.n} veces que llegaste así, en {evidencia.m} terminaste mejor.
        </div>
      ) : null}
      <button
        onClick={() => {
          (sdcBeep(660, 100), aplicar((partida) => sdcAnimoCalor(partida, mod)));
        }}
        className="w-full mt-3 py-3 text-sm"
        style={sdcAnimoB1}
      >
        Empezar calentamiento
      </button>
      <button
        onClick={() => aplicar((partida) => sdcAnimoSet(partida, { ack: 1 }))}
        className="w-full mt-2 py-2 text-sm"
        style={sdcAnimoB2}
      >
        Ir directo a la rutina
      </button>
      <div className="text-right">{cambiar}</div>
    </div>
  );
}
function AnimoAhora({ player, aplicar, onModo, sinSeries }) {
  let animo = sdcAnimoHoy(player),
    caja = { border: "1px solid rgba(79,157,255,0.35)", background: "rgba(79,157,255,0.06)" };
  if (
    !sdcAnimoOn(player) ||
    !animo.antes ||
    animo.antes > 2 ||
    animo.cuerpo === "dolor" ||
    animo.ahoraOk ||
    !sinSeries ||
    (player.today.doneModalities || []).length
  )
    return null;
  if (!animo.ahora)
    return (
      <div className="mt-3 p-2" style={caja}>
        <div className="mb-2" style={sdcAnimoTit}>
          ¿Y ahora?
        </div>
        <Caras
          sel={0}
          onPick={(valor) =>
            aplicar((partida) => {
              let resultado = sdcAnimoSet(
                partida,
                valor <= 2 ? { ahora: valor, ahoraOk: 1 } : { ahora: valor },
              );
              valor <= 2 && (resultado.notices = ["Seguí en Recuperación: con eso alcanza."]);
              return resultado;
            })
          }
        />
      </div>
    );
  return (
    <div className="mt-3 p-2" style={caja}>
      <div className="mb-2" style={sdcAnimoTx}>
        Te vino el envión. ¿Hacés la rutina normal?
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            (onModo("normal"),
              aplicar((partida) => sdcAnimoSet(partida, { modo: "normal", ahoraOk: 1 })));
          }}
          className="py-2 text-sm"
          style={sdcAnimoB1}
        >
          Normal
        </button>
        <button
          onClick={() => aplicar((partida) => sdcAnimoSet(partida, { ahoraOk: 1 }))}
          className="py-2 text-sm"
          style={sdcAnimoB2}
        >
          Sigo en Recuperación
        </button>
      </div>
    </div>
  );
}
function AnimoDespues({ player, aplicar, onPrueba }) {
  let animo = sdcAnimoHoy(player),
    bloque = {
      marginBottom: 12,
      paddingBottom: 12,
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    };
  if (animo.no) return null;
  let delta = animo.despues
    ? animo.antes
      ? "Llegaste " +
        sdcAnimoFrase(animo.antes) +
        " y te vas " +
        (animo.despues === animo.antes ? "igual" : sdcAnimoFrase(animo.despues)) +
        "."
      : "Te vas " + sdcAnimoFrase(animo.despues) + "."
    : "";
  if (!animo.despues)
    return (
      <div style={bloque}>
        <div className="mb-2" style={sdcAnimoTit}>
          ¿Cómo te vas?
        </div>
        <Caras
          sel={0}
          onPick={(valor) => aplicar((partida) => sdcAnimoSetDa(partida, { despues: valor }))}
        />
      </div>
    );
  if (!animo.carga)
    return (
      <div style={bloque}>
        <div className="mb-2 flex items-center gap-2" style={sdcAnimoTx}>
          {delta}
          {sdcAnimoOtra(() => aplicar((partida) => sdcAnimoSet(partida, { despues: 0, carga: 0 })))}
        </div>
        <div className="mb-2" style={sdcAnimoTit}>
          ¿Cómo te quedó la rutina?
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["corta", "Corta"],
            ["justa", "Justa"],
            ["mucha", "Mucha"],
          ].map((opcion) => (
            <button
              key={opcion[0]}
              onClick={() => {
                (sdcVib(12), aplicar((partida) => sdcAnimoSet(partida, { carga: opcion[0] })));
              }}
              className="py-2 text-sm"
              style={sdcAnimoB2}
            >
              {opcion[1]}
            </button>
          ))}
        </div>
      </div>
    );
  let cuenta = sdcAnimoCuenta(player),
    racha = sdcCargaRacha(player);
  return (
    <div style={bloque}>
      <div className="flex items-center gap-2" style={sdcAnimoTx}>
        <Cara
          n={animo.despues}
          size={22}
          color={animo.antes && animo.despues > animo.antes ? "#3ecf8e" : "#c8d0e4"}
        />
        {delta}
        {sdcAnimoOtra(() => aplicar((partida) => sdcAnimoSet(partida, { despues: 0, carga: 0 })))}
      </div>
      {animo.antes && animo.antes <= 2 && cuenta.noResp >= 2 ? (
        <div className="mt-2 p-2 text-sm" style={sdcAnimoEvBox}>
          Días que no querías: {cuenta.noResp}. En {cuenta.noMejor} terminaste mejor.
        </div>
      ) : null}
      {racha ? (
        <div className="mt-2">
          <div style={sdcAnimoTx}>
            Las últimas 3 veces la rutina te quedó {racha}. Repetí la prueba de aptitud para
            ajustarla.
          </div>
          <button onClick={onPrueba} className="w-full mt-2 py-2 text-sm" style={sdcAnimoB2}>
            Ir a la prueba de aptitud
          </button>
        </div>
      ) : null}
    </div>
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
