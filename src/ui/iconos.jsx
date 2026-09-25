// Iconos SVG.

function Icono({ size = 16, style, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {children}
    </svg>
  );
}
function IconoLlama({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path
        d="M12 2 C8 8 6 11 6 15 a6 6 0 0 0 12 0 c0 -2 -1 -4 -2 -5 c0 2 -1 3 -2 3 c1 -3 -1 -7 -2 -11 Z"
        fill={color}
      />
    </Icono>
  );
}
function IconoTrofeo({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path d="M7 4 h10 v4 a5 5 0 0 1 -10 0 Z" fill={color} />
      <path d="M9 13 h6 v3 h-6 Z" fill={color} />
      <rect x="7" y="16" width="10" height="2" fill={color} />
      <path
        d="M7 5 H4 a1 1 0 0 0 -1 1 v1 a3 3 0 0 0 3 3"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M17 5 H20 a1 1 0 0 1 1 1 v1 a3 3 0 0 1 -3 3"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
    </Icono>
  );
}
function IconoDestello({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path d="M12 3 L13.5 9 L19 10.5 L13.5 12 L12 18 L10.5 12 L5 10.5 L10.5 9 Z" fill={color} />
    </Icono>
  );
}
function IconoPesa({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <rect x="1" y="9" width="3" height="6" fill={color} />
      <rect x="20" y="9" width="3" height="6" fill={color} />
      <rect x="5" y="7" width="2.5" height="10" fill={color} />
      <rect x="16.5" y="7" width="2.5" height="10" fill={color} />
      <rect x="7.5" y="11" width="9" height="2" fill={color} />
    </Icono>
  );
}
function IconoMas({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <rect x="10.5" y="3" width="3" height="18" fill={color} />
      <rect x="3" y="10.5" width="18" height="3" fill={color} />
    </Icono>
  );
}
function IconoMenos({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <rect x="3" y="10.5" width="18" height="3" fill={color} />
    </Icono>
  );
}
function IconoCheck({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path
        d="M4 12 L9 17 L20 5"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icono>
  );
}
function IconoCerrar({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path d="M5 5 L19 19 M19 5 L5 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </Icono>
  );
}
function IconoRayo({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path d="M13 2 L4 14 h6 l-1 8 l9 -12 h-6 Z" fill={color} />
    </Icono>
  );
}
function IconoReloj({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 7 V12 L16 14" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </Icono>
  );
}
function IconoFlecha({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path
        d="M9 4 L16 12 L9 20"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icono>
  );
}
function IconoUbicacion({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path d="M12 22 C12 22 5 14 5 9 a7 7 0 0 1 14 0 C19 14 12 22 12 22 Z" fill={color} />
      <circle cx="12" cy="9" r="2.5" fill="#0a0e1a" />
    </Icono>
  );
}
function IconoCandado({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <rect x="5" y="11" width="14" height="10" rx="1" fill={color} />
      <path d="M8 11 V7 a4 4 0 0 1 8 0 v4" stroke={color} strokeWidth="2" fill="none" />
    </Icono>
  );
}
function IconoPasos({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <ellipse cx="8" cy="7" rx="3" ry="4" fill={color} />
      <ellipse cx="16" cy="16" rx="3" ry="4" fill={color} />
    </Icono>
  );
}
function IconoEspadas({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <path
        d="M3 21 L14 10 M11 7 L17 13 M17 3 L21 7 L14 14"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M21 21 L10 10 M13 7 L7 13 M7 3 L3 7 L10 14"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </Icono>
  );
}
function IconoCorazon({ size = 16, color = "currentColor", fill = "none" }) {
  return (
    <Icono size={size}>
      <path
        d="M12 21 C12 21 3 14.5 3 8.5 A4.5 4.5 0 0 1 12 6 A4.5 4.5 0 0 1 21 8.5 C21 14.5 12 21 12 21 Z"
        fill={fill === "none" ? "none" : color}
        stroke={color}
        strokeWidth="2"
      />
    </Icono>
  );
}
function IconoPata({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <circle cx="12" cy="15" r="4" fill={color} />
      <circle cx="6" cy="10" r="2" fill={color} />
      <circle cx="18" cy="10" r="2" fill={color} />
      <circle cx="9" cy="5" r="1.8" fill={color} />
      <circle cx="15" cy="5" r="1.8" fill={color} />
    </Icono>
  );
}
function IconoPersona({ size = 16, color = "currentColor" }) {
  return (
    <Icono size={size}>
      <circle cx="12" cy="8" r="4" fill={color} />
      <path d="M4 21 a8 8 0 0 1 16 0 Z" fill={color} />
    </Icono>
  );
}

export {
  Icono,
  IconoLlama,
  IconoTrofeo,
  IconoDestello,
  IconoPesa,
  IconoMas,
  IconoMenos,
  IconoCheck,
  IconoCerrar,
  IconoRayo,
  IconoReloj,
  IconoFlecha,
  IconoUbicacion,
  IconoCandado,
  IconoPasos,
  IconoEspadas,
  IconoCorazon,
  IconoPata,
  IconoPersona,
};
