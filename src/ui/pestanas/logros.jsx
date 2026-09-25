// Pestana Logros: los logros por categoria y dificultad.
import { logros, categoriasLogros, ordenDificultad, sdcDific } from "../../datos/logros.js";
import { sdcCatAbierta } from "../../logica/series.js";
import { colorRango } from "../../datos/rangos.js";
import { Tarjeta } from "../base.jsx";
import { Plegable } from "../tarjetas.jsx";
import { IconoTrofeo, IconoCandado } from "../iconos.jsx";

export function PestanaLogros({ achievements, alternarPlegable, player, plegado, ui }) {
  return (
    <>
      <Tarjeta accent="#ffb84f" style={{ marginBottom: 16 }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase" style={{ letterSpacing: 2, color: "#ffb84f" }}>
              Logros
            </div>
            <div
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 22,
                color: "#e8ecf7",
                fontWeight: 700,
              }}
            >
              {achievements.length} / {logros.length}
            </div>
          </div>
          <IconoTrofeo size={26} color="#ffb84f" />
        </div>
      </Tarjeta>
      {categoriasLogros.map((categoria) => {
        let lista = logros.filter((logro) => logro.category === categoria);
        if (!lista.length) return null;
        let hechos = lista.filter((logro) => achievements.includes(logro.id)).length;
        return (
          <Plegable
            key={categoria}
            id={"ach-" + categoria}
            title={categoria}
            accent="#5a6178"
            style={{ marginBottom: 16 }}
            collapsed={
              ui && ui.collapsed && ui.collapsed["ach-" + categoria] !== void 0
                ? plegado("ach-" + categoria)
                : !sdcCatAbierta(player, categoria)
            }
            onToggle={alternarPlegable}
            right={`${hechos}/${lista.length}`}
          >
            {ordenDificultad.map((dificultad) => {
              let delNivel = lista.filter((logro) => logro.tier === dificultad);
              return delNivel.length ? (
                <div key={dificultad} className="mb-2">
                  <div
                    className="text-xs mb-1"
                    style={{ color: colorRango[dificultad], letterSpacing: 1, fontWeight: 700 }}
                  >
                    {sdcDific[dificultad] || dificultad}
                  </div>
                  {delNivel.map((logro) => {
                    let hecho = achievements.includes(logro.id);
                    return (
                      <div
                        key={logro.id}
                        className="flex items-start gap-2 py-2"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        {hecho ? (
                          <IconoTrofeo size={16} color="#ffb84f" />
                        ) : (
                          <IconoCandado size={16} color="#7a83a0" />
                        )}
                        <div>
                          <div
                            className="text-sm"
                            style={{
                              color: hecho ? "#e8ecf7" : "#5a6178",
                              fontWeight: hecho ? 600 : 400,
                            }}
                          >
                            {logro.name}
                          </div>
                          <div className="text-xs" style={{ color: hecho ? "#8a93ad" : "#5a6178" }}>
                            {logro.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null;
            })}
          </Plegable>
        );
      })}
    </>
  );
}
