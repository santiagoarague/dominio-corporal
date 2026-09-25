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
        let flex = sdcFlex(player);
        if (!flex.nivel) return null;
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
              {sdcFlexTxt(flex.nivel)}
            </div>
            {flex.primero && flex.primero < flex.nivel ? (
              <div className="text-xs mt-1" style={{ color: "#9aa4bd" }}>
                Cuando empezaste llegabas {sdcFlexTxt(flex.primero).toLowerCase()}.
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
          {sdcFlexNiv.map((opcion) => (
            <button
              key={opcion.n}
              onClick={() => aplicar((partida) => sdcFlexSet(partida, opcion.n))}
              className="w-full text-left px-3 py-2 mb-1 text-sm"
              style={{
                background: "rgba(62,207,142,0.08)",
                border: "1px solid rgba(62,207,142,0.4)",
                color: "#e8ecf7",
              }}
            >
              {opcion.t}
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
          let pasos = sdcEstPasos,
            total = sdcEstTotal(pasos),
            paso = sdcEstPaso(pasos, estSegundos),
            esp =
              paso.prep > 0 &&
              sdcEstOk < paso.index &&
              sdcPasoEspera(pasos, paso.index, sdcPasosV(player));
          return (
            <PasoGuiado
              lista={pasos}
              paso={paso}
              cabecera={
                <div className="text-xs text-center mb-1" style={{ color: "#9aa4bd" }}>
                  Paso {paso.index + 1} de {pasos.length}
                </div>
              }
              acento="#3ecf8e"
              esperando={esp}
              pausado={!!sdcEstPz && !esp}
              fin="Último estiramiento"
              resto={" · queda " + sdcEstMMSS(total - estSegundos)}
              onListo={() => {
                let hasta =
                  sdcEstDesde(pasos, paso.index) +
                  Math.max(0, (pasos[paso.index].prep || sdcEstPrep) - 3);
                (sdcBeep(660, 100),
                  sdcSetEstOk(paso.index),
                  sdcSetEstPz(0),
                  sdcSetEstIni(Date.now() - hasta * 1e3),
                  setEstSegundos(hasta));
              }}
              onYa={() => {
                let falta = paso.prep;
                (sdcSetEstIni((previo) => previo - falta * 1e3),
                  setEstSegundos(estSegundos + falta));
              }}
              onPausa={() => sdcSetEstPz(Date.now())}
              onSeguir={() => {
                let pausado = Date.now() - sdcEstPz;
                (sdcSetEstIni((previo) => previo + pausado), sdcSetEstPz(0));
              }}
              onTerminar={() => {
                let hechos = paso.index;
                (setEstirando(!1),
                  sdcSetEstPz(0),
                  aplicar((partida) =>
                    sdcPasosHook(
                      registrarEstiramiento(partida, hechos, pasos.length),
                      pasos,
                      hechos,
                    ),
                  ));
              }}
            />
          );
        })()
      ) : (
        <>
          {[
            { c: 1, lb: "Corta", su: "Lo que más se agradece justo después de entrenar" },
            { c: 0, lb: "Completa", su: "Todo el cuerpo, de la cabeza a las caderas" },
          ].map((rutina) => {
            let lista = sdcEstLista(rutina.c),
              total = sdcEstTotal(lista);
            return (
              <button
                key={rutina.lb}
                onClick={() => {
                  (sdcSetEstPasos(lista),
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
                    {rutina.lb}
                  </span>
                  <span className="text-xs">
                    {sdcEstMMSS(total)} · {lista.length} pasos
                  </span>
                </div>
                <div className="text-xs mt-1" style={{ color: "#9aa4bd", fontWeight: 400 }}>
                  {rutina.su}
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
