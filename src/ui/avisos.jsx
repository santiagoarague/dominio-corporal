// Lista de avisos.
import { IconoCerrar } from "./iconos.jsx";
import { sdcEstilo, sdcOrden, sdcTier } from "../logica/extras.js";

function Avisos({ notices: e, onDismiss: a, onDismissAll: d }) {
  if (!e || e.length === 0) return null;
  var li = e.map(function (t, k) {
    return { t: t, k: k, g: sdcTier(t) };
  });
  li.sort(function (x, y) {
    return sdcOrden[x.g] - sdcOrden[y.g] || x.k - y.k;
  });
  return (
    <div className="mb-4">
      <div className="space-y-2">
        {li.map(function (it) {
          var ep = it.g === "epic",
            st = sdcEstilo[it.g];
          return (
            <div
              key={it.k}
              className={
                "sdc-rise flex items-start justify-between gap-2 px-3 " + (ep ? "py-3" : "py-2")
              }
              style={{ background: st.background, border: st.border, color: st.color }}
            >
              <span
                style={
                  ep
                    ? {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }
                    : { fontSize: 14 }
                }
              >
                {it.t}
              </span>
              <button
                onClick={function () {
                  a(it.k);
                }}
                className="opacity-60"
                aria-label="Cerrar"
              >
                <IconoCerrar size={14} />
              </button>
            </div>
          );
        })}
      </div>
      {e.length > 1 && d && (
        <button
          onClick={d}
          className="w-full py-2 text-xs mt-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#9aa4bd",
          }}
        >
          Cerrar todo ({e.length})
        </button>
      )}
    </div>
  );
}

export { Avisos };
