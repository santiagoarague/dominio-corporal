// Estiramiento: elegir la rutina corta o la completa, los pasos guiados y el control semanal de flexibilidad.
import {
  sdcFlexToca,
  sdcFlexNiv,
  sdcFlex,
  sdcFlexTxt,
  sdcFlexSet,
  sdcEstTotal,
  sdcEstPaso,
  sdcEstMMSS,
  sdcEstPrep,
  sdcEstLista,
} from "../../../logica/estiramiento.js";
import {
  sdcPasoEspera,
  sdcPasosV,
  sdcEstDesde,
  sdcPasosHook,
  PasoGuiado,
} from "../../calentamiento.jsx";
import { sdcBeep } from "../../../logica/series.js";
import { registrarEstiramiento } from "../../../logica/partida.js";
import { Plegable } from "../../tarjetas.jsx";
import { IconoCheck, IconoReloj } from "../../iconos.jsx";

export function TarjetaEstiramiento({
  alternarPlegable,
  aplicar,
  estirando,
  estSegundos,
  player,
  plegado,
  sdcEstOk,
  sdcEstPasos,
  sdcEstPz,
  sdcSetEstIdx,
  sdcSetEstIni,
  sdcSetEstOk,
  sdcSetEstPasos,
  sdcSetEstPz,
  setEstirando,
  setEstSegundos,
  today,
  week,
}) {
  return (
    <Plegable
      id="stretch"
      title="Estiramiento"
      accent="#3ecf8e"
      collapsed={plegado("stretch")}
      onToggle={alternarPlegable}
      right={`${week.stretchCount}/2 esta semana`}
    >
      <div className="text-xs mb-3" style={{ color: "#9aa4bd" }}>
        Es lo que más rápido cambia de todo lo que hacés acá: en pocas semanas llegás más lejos y lo
        notás en el cuerpo. Dos veces por semana te dan +10% de XP la semana siguiente.
      </div>
      {(() => {
        let fx = sdcFlex(player);
        if (!fx.nivel) return null;
        return (
          <div
            className="mb-3 p-2"
            style={{
              background: "rgba(62,207,142,0.08)",
              border: "1px solid rgba(62,207,142,0.3)",
            }}
          >
            <div className="text-xs uppercase mb-1" style={{ letterSpacing: 2, color: "#3ecf8e" }}>
              TU ALCANCE
            </div>
            <div className="text-sm" style={{ color: "#e8ecf7", fontWeight: 600 }}>
              {sdcFlexTxt(fx.nivel)}
            </div>
            {fx.primero && fx.primero < fx.nivel ? (
              <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                Cuando empezaste llegabas {sdcFlexTxt(fx.primero).toLowerCase()}.
              </div>
            ) : null}
          </div>
        );
      })()}
      {sdcFlexToca(player) && !estirando && !today.stretchDone ? (
        <div
          className="mb-3 p-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="text-xs uppercase mb-1" style={{ letterSpacing: 2, color: "#9aa4bd" }}>
            UNA VEZ POR SEMANA
          </div>
          <div className="text-sm mb-1" style={{ color: "#e8ecf7", fontWeight: 600 }}>
            Sentado con las piernas estiradas, ¿hasta dónde llegás?
          </div>
          <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
            Sin rebotar, hasta donde llegues sin dolor.
          </div>
          {sdcFlexNiv.map((fx) => (
            <button
              key={fx.n}
              onClick={() => aplicar((d) => sdcFlexSet(d, fx.n))}
              className="w-full text-left px-3 py-2 mb-1 text-sm"
              style={{
                background: "rgba(62,207,142,0.08)",
                border: "1px solid rgba(62,207,142,0.4)",
                color: "#e8ecf7",
              }}
            >
              {fx.t}
            </button>
          ))}
        </div>
      ) : null}
      {today.stretchDone ? (
        <div className="flex items-center gap-2 text-sm" style={{ color: "#3ecf8e" }}>
          <IconoCheck size={16} /> Estiramiento de hoy completado
        </div>
      ) : estirando ? (
        (() => {
          let ps = sdcEstPasos,
            tt = sdcEstTotal(ps),
            p = sdcEstPaso(ps, estSegundos),
            esp = p.prep > 0 && sdcEstOk < p.index && sdcPasoEspera(ps, p.index, sdcPasosV(player));
          return (
            <PasoGuiado
              ls={ps}
              p={p}
              cab={
                <div className="text-xs text-center mb-1" style={{ color: "#9aa4bd" }}>
                  Paso {p.index + 1} de {ps.length}
                </div>
              }
              col="#3ecf8e"
              esp={esp}
              pz={!!sdcEstPz && !esp}
              fin="Último estiramiento"
              resto={" · queda " + sdcEstMMSS(tt - estSegundos)}
              onListo={() => {
                let d0 =
                  sdcEstDesde(ps, p.index) + Math.max(0, (ps[p.index].prep || sdcEstPrep) - 3);
                (sdcBeep(660, 100),
                  sdcSetEstOk(p.index),
                  sdcSetEstPz(0),
                  sdcSetEstIni(Date.now() - d0 * 1e3),
                  setEstSegundos(d0));
              }}
              onYa={() => {
                let q = p.prep;
                (sdcSetEstIni((v) => v - q * 1e3), setEstSegundos(estSegundos + q));
              }}
              onPausa={() => sdcSetEstPz(Date.now())}
              onSeguir={() => {
                let dd = Date.now() - sdcEstPz;
                (sdcSetEstIni((v) => v + dd), sdcSetEstPz(0));
              }}
              onTerminar={() => {
                let hh = p.index;
                (setEstirando(!1),
                  sdcSetEstPz(0),
                  aplicar((N) => sdcPasosHook(registrarEstiramiento(N, hh, ps.length), ps, hh)));
              }}
            />
          );
        })()
      ) : (
        <>
          {[
            { c: 1, lb: "Corta", su: "Lo que más se agradece justo después de entrenar" },
            { c: 0, lb: "Completa", su: "Todo el cuerpo, de la cabeza a las caderas" },
          ].map((op) => {
            let ls = sdcEstLista(op.c),
              tt = sdcEstTotal(ls);
            return (
              <button
                key={op.lb}
                onClick={() => {
                  (sdcSetEstPasos(ls),
                    sdcSetEstIdx(0),
                    sdcSetEstPz(0),
                    sdcSetEstOk(-1),
                    sdcSetEstIni(Date.now()),
                    setEstSegundos(0),
                    setEstirando(!0));
                }}
                className="w-full py-3 px-3 text-sm mb-2 text-left"
                style={{
                  background: "rgba(62,207,142,0.12)",
                  border: "1px solid #3ecf8e",
                  color: "#3ecf8e",
                  fontWeight: 700,
                }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <IconoReloj size={16} />
                    {op.lb}
                  </span>
                  <span className="text-xs">
                    {sdcEstMMSS(tt)} · {ls.length} pasos
                  </span>
                </div>
                <div className="text-xs mt-1" style={{ color: "#9aa4bd", fontWeight: 400 }}>
                  {op.su}
                </div>
              </button>
            );
          })}
          <div className="text-xs" style={{ color: "#7a83a0" }}>
            Antes de cada posición tenés unos segundos para acomodarte, con el nombre de la que
            viene ya en pantalla. La primera vez que te toca una, el reloj espera a que toques
            Listo. Un sonido grave avisa que te prepares y uno agudo que empieces, y la pantalla no
            se apaga.
          </div>
        </>
      )}
    </Plegable>
  );
}
