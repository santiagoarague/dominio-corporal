// El cuerpo: figura y panel de zonas.
import { IconoCerrar } from "./iconos.jsx";
import { atributosDeZona } from "../logica/atributos.js";
import { nombreEjercicio } from "../logica/rutina.js";
import { BarraXp } from "./base.jsx";

function colorProgreso(ratio) {
  let desde = [42, 49, 72],
    hasta = [255, 107, 74],
    mezcla = Math.max(0, Math.min(1, ratio || 0)),
    rojo = Math.round(desde[0] + (hasta[0] - desde[0]) * mezcla),
    verde = Math.round(desde[1] + (hasta[1] - desde[1]) * mezcla),
    azul = Math.round(desde[2] + (hasta[2] - desde[2]) * mezcla);
  return `rgb(${rojo},${verde},${azul})`;
}
var gruposCuerpo = {
  pushup: { label: "Pecho y hombros", muscles: "Pectoral, deltoides, tríceps" },
  back: { label: "Espalda", muscles: "Dorsal ancho, trapecio, bíceps" },
  squat: { label: "Piernas y glúteos", muscles: "Cuádriceps, isquios, glúteo" },
  abs: { label: "Core", muscles: "Recto abdominal, oblicuos, transverso" },
};
function nivelZona(reps) {
  return Math.floor(Math.sqrt((reps || 0) / 25)) + 1;
}
function progresoZona(reps) {
  let nivel = nivelZona(reps),
    piso = Math.pow(nivel - 1, 2) * 25,
    techo = Math.pow(nivel, 2) * 25;
  return { cur: (reps || 0) - piso, need: techo - piso, next: techo };
}
function diasEntre(desde, hasta) {
  return desde
    ? Math.round((new Date(hasta + "T00:00:00") - new Date(desde + "T00:00:00")) / 864e5)
    : null;
}
function FiguraCuerpo({ view, colors, glow, ratios, selected, onSelect }) {
  let relleno = "#161b2e",
    borde = "#2a3148",
    propsDe = (grupo) => ({
      fill: colors[grupo],
      stroke: selected === grupo ? "#ffffff" : borde,
      strokeWidth: selected === grupo ? 2 : 1,
      onClick: () => onSelect(selected === grupo ? null : grupo),
      style: {
        cursor: "pointer",
        animation: ratios && ratios[grupo] >= 1 ? "sdcPulse 1.6s ease-in-out infinite" : "none",
      },
    }),
    sdcMir = "translate(200,0) scale(-1,1)",
    sdcSim = (trazo, grupo) => <path d={trazo} {...propsDe(grupo)} />,
    sdcPar = (trazo, grupo) => (
      <g>
        <path d={trazo} {...propsDe(grupo)} />
        <path d={trazo} transform={sdcMir} {...propsDe(grupo)} />
      </g>
    ),
    sdcIne = (trazo, doble) =>
      doble ? (
        <g>
          <path d={trazo} fill={relleno} stroke={borde} strokeWidth="1" />
          <path d={trazo} transform={sdcMir} fill={relleno} stroke={borde} strokeWidth="1" />
        </g>
      ) : (
        <path d={trazo} fill={relleno} stroke={borde} strokeWidth="1" />
      );
  return (
    <svg
      viewBox="0 0 200 300"
      style={{
        width: "100%",
        maxWidth: 200,
        margin: "0 auto",
        display: "block",
        filter: glow ? "drop-shadow(0 0 8px rgba(62,207,142,0.65))" : "none",
      }}
    >
      {sdcIne("M100,8 L113,17 L115,35 L107,48 L93,48 L85,35 L87,17 Z")}
      {sdcIne("M94,47 L106,47 L107,58 L93,58 Z")}
      {view === "front" ? (
        <>
          {sdcIne("M89,57 L111,57 L119,67 L81,67 Z")}
          {sdcPar("M84,58 L74,61 L64,72 L62,88 L76,84 L84,70 Z", "pushup")}
          {sdcPar("M88,62 L99,60 L99,92 L83,89 L84,72 Z", "pushup")}
          {sdcPar("M62,90 L76,86 L74,120 L60,116 Z", "pushup")}
          {sdcPar(
            "M88,96 L99,96 L99,108 L87,108 Z M87,110 L99,110 L99,122 L88,122 Z M88,124 L99,124 L99,136 L89,136 Z",
            "abs",
          )}
          {sdcPar("M83,93 L87,94 L89,138 L83,127 Z", "abs")}
          {sdcIne("M88,139 L112,139 L114,150 L86,150 Z")}
          {sdcPar("M86,150 L99,150 L99,208 L82,204 L83,166 Z", "squat")}
        </>
      ) : (
        <>
          {sdcSim("M89,57 L111,57 L120,69 L100,77 L80,69 Z", "back")}
          {sdcPar("M84,58 L74,61 L64,72 L62,88 L76,84 L84,70 Z", "pushup")}
          {sdcPar("M83,71 L99,75 L99,112 L85,104 L80,85 Z", "back")}
          {sdcSim("M89,114 L111,114 L109,137 L91,137 Z", "back")}
          {sdcPar("M62,90 L76,86 L74,120 L60,116 Z", "pushup")}
          {sdcPar("M84,139 L99,139 L99,162 L82,159 Z", "squat")}
          {sdcPar("M83,163 L99,163 L99,208 L85,205 Z", "squat")}
        </>
      )}
      {sdcPar("M60,122 L74,126 L72,156 L61,154 Z", "pushup")}
      {sdcIne("M61,158 L72,160 L71,170 L62,168 Z", 1)}
      {sdcIne("M87,209 L99,209 L99,216 L86,216 Z", 1)}
      {sdcPar("M87,217 L99,217 L98,264 L89,264 Z", "squat")}
      {sdcIne("M89,266 L98,266 L99,276 L79,276 L79,270 Z", 1)}
    </svg>
  );
}
function PanelZonas({
  zoneKey,
  rank,
  classification,
  lifetime,
  target,
  doneToday,
  lastTrained,
  today,
  modality,
  onClose,
}) {
  let grupo = gruposCuerpo[zoneKey],
    nivel = nivelZona(lifetime),
    progreso = progresoZona(lifetime),
    dias = diasEntre(lastTrained, today);
  return (
    <div
      className="mt-3 p-3"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <div style={{ fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 }}>
          {grupo.label}
        </div>
        <button
          onClick={onClose}
          className="text-xs"
          style={{ color: "#9aa4bd" }}
          aria-label="Cerrar"
        >
          <IconoCerrar size={14} color="#9aa4bd" />
        </button>
      </div>
      <div className="text-xs mb-1" style={{ color: "#9aa4bd" }}>
        {grupo.muscles}
      </div>
      {atributosDeZona(zoneKey) && (
        <div className="text-xs mb-2" style={{ color: "#b084f5" }}>
          Alimenta: {atributosDeZona(zoneKey)}
        </div>
      )}
      <div className="text-xs mb-1" style={{ color: "#e8ecf7" }}>
        Ejercicio: {nombreEjercicio(rank, classification, zoneKey, modality)}
      </div>
      <div className="text-xs mb-2" style={{ color: "#9aa4bd" }}>
        Hoy: {doneToday} / {target} reps
      </div>
      <div className="flex justify-between text-xs mb-1" style={{ color: "#9aa4bd" }}>
        <span>Desarrollo · Nivel {nivel}</span>
        <span>
          {progreso.cur} / {progreso.need}
        </span>
      </div>
      <BarraXp value={progreso.cur} max={progreso.need} color="#3ecf8e" />
      <div className="text-xs mt-2" style={{ color: "#9aa4bd" }}>
        {lifetime.toLocaleString("es")} reps de por vida ·{" "}
        {dias === null
          ? "sin estímulo registrado"
          : dias === 0
            ? "entrenado hoy"
            : dias === 1
              ? "último estímulo: ayer"
              : `último estímulo: hace ${dias} días`}
      </div>
      {dias !== null && dias >= 3 && (
        <div className="text-xs mt-2" style={{ color: "#ffb84f" }}>
          Esta zona lleva {dias} días sin estímulo.
        </div>
      )}
    </div>
  );
}

export {
  colorProgreso,
  gruposCuerpo,
  nivelZona,
  progresoZona,
  diasEntre,
  FiguraCuerpo,
  PanelZonas,
};
