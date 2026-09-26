// Tarjeta plegable, color de rango y dibujo de la mascota.
import { IconoFlecha } from "./iconos.jsx";
import { colorRango } from "../datos/rangos.js";
import { Tarjeta } from "./base.jsx";

// pista: el id del consejo del compañero que habla de esta tarjeta (ver datos/pistas.js).
function Plegable({ id, title, accent, collapsed, onToggle, right, children, style, pista }) {
  let abierto = !collapsed;
  return (
    <Tarjeta accent={accent} style={style}>
      <button
        onClick={() => onToggle(id, !!collapsed)}
        data-pista={pista}
        className="w-full flex items-center justify-between"
        style={{ background: "transparent", border: "none", padding: "12px 0", margin: "-12px 0" }}
      >
        <div className="flex items-center gap-2">
          <span
            style={{
              display: "inline-block",
              transform: abierto ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform .2s",
            }}
          >
            <IconoFlecha size={14} color="#9aa4bd" />
          </span>
          <span
            style={{ fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 }}
          >
            {title}
          </span>
        </div>
        <span className="text-xs" style={{ color: "#9aa4bd" }}>
          {right}
        </span>
      </button>
      {abierto && <div className="mt-3">{children}</div>}
    </Tarjeta>
  );
}
function colorDeRango(rango) {
  return colorRango[rango] || "#ffb84f";
}
// type: "dog", "cat" o "face" (una cara, para quien no quiere un animal). gesto solo
// cambia la cara: "curioso" mira de costado con la boca en o, para cuando se asoma.
function DibujoMascota({ type, size = 56, color = "#ffb84f", rank, gesto }) {
  let conCorona = rank && ["A", "S", "Z"].includes(rank),
    brilla = rank && ["S", "Z"].includes(rank),
    estilo = {
      width: size,
      height: size,
      display: "block",
      flexShrink: 0,
      filter: brilla ? `drop-shadow(0 0 6px ${color})` : "none",
    },
    corona = conCorona ? (
      <path d="M32,6 L40,16 L50,4 L60,16 L68,6 L66,22 L34,22 Z" fill={color} opacity="0.95" />
    ) : null;
  if (type === "face") {
    let curioso = gesto === "curioso",
      mira = curioso ? 3 : 0;
    return (
      <svg viewBox="0 0 100 100" style={estilo}>
        {corona}
        <circle cx="50" cy="55" r="30" fill={color} />
        <ellipse cx={39 + mira} cy="50" rx="4" ry="5" fill="#161b2e" />
        <ellipse cx={61 + mira} cy="50" rx="4" ry="5" fill="#161b2e" />
        {curioso ? (
          <>
            <path d="M33,39 Q39,35 45,39" stroke="#161b2e" strokeWidth="2.5" fill="none" />
            <circle cx="52" cy="68" r="4.5" fill="#161b2e" />
          </>
        ) : (
          <path
            d="M37,63 Q50,75 63,63"
            stroke="#161b2e"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
        <circle cx="31" cy="61" r="5" fill="#ff8f7a" opacity="0.35" />
        <circle cx="69" cy="61" r="5" fill="#ff8f7a" opacity="0.35" />
      </svg>
    );
  }
  return type === "cat" ? (
    <svg viewBox="0 0 100 100" style={estilo}>
      <path d="M25,38 L33,10 L45,32 Z" fill={color} />
      <path d="M75,38 L67,10 L55,32 Z" fill={color} />
      {corona}
      <circle cx="50" cy="55" r="28" fill={color} />
      <circle cx="40" cy="52" r="4" fill="#161b2e" />
      <circle cx="60" cy="52" r="4" fill="#161b2e" />
      <path d="M46,62 L54,62 L50,67 Z" fill="#161b2e" />
      <path d="M50,67 Q50,71 44,71" stroke="#161b2e" strokeWidth="2" fill="none" />
      <path d="M50,67 Q50,71 56,71" stroke="#161b2e" strokeWidth="2" fill="none" />
      <line x1="14" y1="58" x2="30" y2="60" stroke="#161b2e" strokeWidth="1.5" />
      <line x1="14" y1="65" x2="30" y2="65" stroke="#161b2e" strokeWidth="1.5" />
      <line x1="86" y1="58" x2="70" y2="60" stroke="#161b2e" strokeWidth="1.5" />
      <line x1="86" y1="65" x2="70" y2="65" stroke="#161b2e" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 100 100" style={estilo}>
      <ellipse cx="21" cy="46" rx="11" ry="19" transform="rotate(-15 21 46)" fill={color} />
      <ellipse cx="79" cy="46" rx="11" ry="19" transform="rotate(15 79 46)" fill={color} />
      {corona}
      <circle cx="50" cy="55" r="27" fill={color} />
      <ellipse cx="50" cy="66" rx="15" ry="11" fill="#ffe0b3" />
      <circle cx="41" cy="50" r="4" fill="#161b2e" />
      <circle cx="59" cy="50" r="4" fill="#161b2e" />
      <ellipse cx="50" cy="63" rx="4" ry="3" fill="#161b2e" />
      <path d="M50,66 Q50,70 44,71" stroke="#161b2e" strokeWidth="2" fill="none" />
      <path d="M50,66 Q50,70 56,71" stroke="#161b2e" strokeWidth="2" fill="none" />
      <path d="M43,73 Q50,78 57,73" stroke="#161b2e" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export { Plegable, colorDeRango, DibujoMascota };
