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
      {categoriasLogros.map((f) => {
        let d = logros.filter((N) => N.category === f);
        if (!d.length) return null;
        let m = d.filter((N) => achievements.includes(N.id)).length;
        return (
          <Plegable
            key={f}
            id={"ach-" + f}
            title={f}
            accent="#5a6178"
            style={{ marginBottom: 16 }}
            collapsed={
              ui && ui.collapsed && ui.collapsed["ach-" + f] !== void 0
                ? plegado("ach-" + f)
                : !sdcCatAbierta(player, f)
            }
            onToggle={alternarPlegable}
            right={`${m}/${d.length}`}
          >
            {ordenDificultad.map((N) => {
              let _ = d.filter((X) => X.tier === N);
              return _.length ? (
                <div key={N} className="mb-2">
                  <div
                    className="text-xs mb-1"
                    style={{ color: colorRango[N], letterSpacing: 1, fontWeight: 700 }}
                  >
                    {sdcDific[N] || N}
                  </div>
                  {_.map((X) => {
                    let de = achievements.includes(X.id);
                    return (
                      <div
                        key={X.id}
                        className="flex items-start gap-2 py-2"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        {de ? (
                          <IconoTrofeo size={16} color="#ffb84f" />
                        ) : (
                          <IconoCandado size={16} color="#7a83a0" />
                        )}
                        <div>
                          <div
                            className="text-sm"
                            style={{
                              color: de ? "#e8ecf7" : "#5a6178",
                              fontWeight: de ? 600 : 400,
                            }}
                          >
                            {X.name}
                          </div>
                          <div className="text-xs" style={{ color: de ? "#8a93ad" : "#5a6178" }}>
                            {X.desc}
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
