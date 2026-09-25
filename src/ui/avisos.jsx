// Lista de avisos.
import { IconoCerrar } from "./iconos.jsx";
import { sdcEstilo, sdcOrden, sdcTier } from "../logica/extras.js";

function Avisos({ notices, onDismiss, onDismissAll }) {
  if (!notices || notices.length === 0) return null;
  var lista = notices.map(function (texto, indice) {
    return { t: texto, k: indice, g: sdcTier(texto) };
  });
  lista.sort(function (uno, otro) {
    return sdcOrden[uno.g] - sdcOrden[otro.g] || uno.k - otro.k;
  });
  return (
    <div className="mb-4">
      <div className="space-y-2">
        {lista.map(function (aviso) {
          var epico = aviso.g === "epic",
            estilo = sdcEstilo[aviso.g];
          return (
            <div
              key={aviso.k}
              className={
                "sdc-rise flex items-start justify-between gap-2 px-3 " + (epico ? "py-3" : "py-2")
              }
              style={{ background: estilo.background, border: estilo.border, color: estilo.color }}
            >
              <span
                style={
                  epico
                    ? {
                        fontFamily: "Chakra Petch, sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }
                    : { fontSize: 14 }
                }
              >
                {aviso.t}
              </span>
              <button
                onClick={function () {
                  onDismiss(aviso.k);
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
      {notices.length > 1 && onDismissAll && (
        <button
          onClick={onDismissAll}
          className="w-full py-2 text-xs mt-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#9aa4bd",
          }}
        >
          Cerrar todo ({notices.length})
        </button>
      )}
    </div>
  );
}

export { Avisos };
