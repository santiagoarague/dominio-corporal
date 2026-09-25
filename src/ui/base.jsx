// Tarjeta simple y barra de XP.

function Tarjeta({ children, accent = "#4f9dff", style = {} }) {
  return (
    <div
      className="relative border"
      style={{
        borderColor: accent + "55",
        background: "linear-gradient(180deg, rgba(18,24,43,0.9), rgba(10,14,26,0.9))",
        ...style,
      }}
    >
      <span
        className="absolute w-3 h-3 border-t-2 border-l-2"
        style={{ top: -1, left: -1, borderColor: accent }}
      />
      <span
        className="absolute w-3 h-3 border-t-2 border-r-2"
        style={{ top: -1, right: -1, borderColor: accent }}
      />
      <span
        className="absolute w-3 h-3 border-b-2 border-l-2"
        style={{ bottom: -1, left: -1, borderColor: accent }}
      />
      <span
        className="absolute w-3 h-3 border-b-2 border-r-2"
        style={{ bottom: -1, right: -1, borderColor: accent }}
      />
      <div className="p-4">{children}</div>
    </div>
  );
}
function BarraXp({ value, max, color }) {
  let pct = max > 0 ? Math.min(100, (value / max) * 100) : 100;
  return (
    <div
      className="w-full h-2 overflow-hidden"
      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div
        className="h-full transition-all duration-500"
        style={{ width: pct + "%", background: `linear-gradient(90deg, ${color}, #ffffff66)` }}
      />
    </div>
  );
}

export { Tarjeta, BarraXp };
