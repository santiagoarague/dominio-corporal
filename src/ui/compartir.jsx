// «Compartir mi semana»: una imagen de 1080 × 1350 (la que aceptan las redes en
// vertical) dibujada en un canvas del teléfono, con los datos de logica/compartir.js
// y el dibujo del compañero copiado del encabezado. Se comparte con el menú del
// teléfono (navigator.share con el archivo) y, si el navegador no puede, se descarga.
import { useState } from "react";
import { datosSemana } from "../logica/compartir.js";
import { fechaHoy } from "../logica/rutina.js";
import { coloresEstado } from "./constancia.jsx";

var anchoImagen = 1080,
  altoImagen = 1350,
  letrasDia = ["L", "M", "M", "J", "V", "S", "D"];

// El compañero del encabezado, como imagen. Si no está, la tarjeta sale sin él.
function imagenCompanero() {
  let svg = document.querySelector('[aria-label="Relajate con tu compañero"] svg');
  if (!svg) return Promise.resolve(null);
  let copia = svg.cloneNode(!0);
  (copia.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
    copia.setAttribute("width", "240"),
    copia.setAttribute("height", "240"),
    copia.removeAttribute("style"));
  return new Promise((listo) => {
    let imagen = new Image();
    ((imagen.onload = () => listo(imagen)),
      (imagen.onerror = () => listo(null)),
      (imagen.src =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(new XMLSerializer().serializeToString(copia))));
  });
}
async function dibujarSemana(datos) {
  try {
    await Promise.all([
      document.fonts.load('700 96px "Chakra Petch"'),
      document.fonts.load('400 40px "Inter"'),
    ]);
  } catch (err) {}
  let lienzo = document.createElement("canvas");
  ((lienzo.width = anchoImagen), (lienzo.height = altoImagen));
  let c = lienzo.getContext("2d"),
    titulo = '"Chakra Petch", sans-serif',
    texto = '"Inter", sans-serif';
  ((c.fillStyle = "#0a0e1a"), c.fillRect(0, 0, anchoImagen, altoImagen));
  // Las esquinas de las tarjetas de la app.
  ((c.strokeStyle = "#ffb84f"), (c.lineWidth = 6));
  for (let [x, y, dx, dy] of [
    [40, 40, 1, 1],
    [1040, 40, -1, 1],
    [40, 1310, 1, -1],
    [1040, 1310, -1, -1],
  ])
    (c.beginPath(), c.moveTo(x, y + 60 * dy), c.lineTo(x, y), c.lineTo(x + 60 * dx, y), c.stroke());
  ((c.textBaseline = "alphabetic"), (c.fillStyle = "#4f9dff"), (c.font = "600 34px " + titulo));
  "letterSpacing" in c && (c.letterSpacing = "6px");
  c.fillText("DOMINIO CORPORAL", 96, 150);
  "letterSpacing" in c && (c.letterSpacing = "0px");
  ((c.fillStyle = "#e8ecf7"), (c.font = "700 100px " + titulo), c.fillText("Mi semana", 96, 270));
  ((c.fillStyle = "#9aa4bd"), (c.font = "400 40px " + texto), c.fillText(datos.rango, 96, 330));
  let companero = await imagenCompanero();
  companero && c.drawImage(companero, 760, 110, 240, 240);
  // Las sesiones contra la meta, en grande.
  ((c.fillStyle = datos.sesiones >= datos.meta ? "#3ecf8e" : "#ffb84f"),
    (c.font = "700 170px " + titulo));
  let sesiones = String(datos.sesiones);
  c.fillText(sesiones, 96, 560);
  let anchoNumero = c.measureText(sesiones).width;
  ((c.fillStyle = "#e8ecf7"), (c.font = "700 64px " + titulo));
  c.fillText("de " + datos.meta, 96 + anchoNumero + 24, 560);
  ((c.fillStyle = "#9aa4bd"), (c.font = "400 38px " + texto));
  c.fillText(
    datos.sesiones >= datos.meta ? "sesiones: meta cumplida" : "sesiones de mi meta",
    96,
    620,
  );
  // Los siete días.
  datos.dias.forEach((dia, i) => {
    let x = 96 + i * 130,
      y = 690;
    ((c.fillStyle =
      dia.estado === "futuro" ? "#11172a" : coloresEstado[dia.estado] || coloresEstado.empty),
      c.fillRect(x, y, 110, 110));
    dia.estado === "pending" &&
      ((c.strokeStyle = "rgba(255,255,255,0.35)"),
      (c.lineWidth = 3),
      c.setLineDash([10, 8]),
      c.strokeRect(x + 2, y + 2, 106, 106),
      c.setLineDash([]));
    ((c.fillStyle = "#8a93ad"),
      (c.font = "600 34px " + texto),
      (c.textAlign = "center"),
      c.fillText(letrasDia[i], x + 55, y + 160),
      (c.textAlign = "left"));
  });
  // Repeticiones, racha y nivel.
  [
    [datos.reps.toLocaleString("es-AR"), "repeticiones"],
    [String(datos.racha), datos.racha === 1 ? "día seguido" : "días seguidos"],
    ["Nv. " + datos.nivel, datos.titulo],
  ].forEach(([valor, nombre], i) => {
    let x = 96 + i * 310;
    ((c.fillStyle = "#e8ecf7"), (c.font = "700 72px " + titulo), c.fillText(valor, x, 1010));
    ((c.fillStyle = "#9aa4bd"), (c.font = "400 34px " + texto), c.fillText(nombre, x, 1060));
  });
  ((c.fillStyle = "#e8ecf7"), (c.font = "600 40px " + texto));
  datos.nombre && c.fillText(datos.nombre, 96, 1230);
  return lienzo;
}
async function compartirSemana(partida) {
  let datos = datosSemana(partida, fechaHoy()),
    lienzo = await dibujarSemana(datos),
    blob = await new Promise((listo) => lienzo.toBlob(listo, "image/png"));
  if (!blob) throw new Error("sin imagen");
  let nombre = "mi-semana-" + datos.desde + ".png",
    archivo = new File([blob], nombre, { type: "image/png" }),
    frase = "Mi semana en Dominio Corporal: " + datos.sesiones + " de " + datos.meta + " sesiones.";
  if (navigator.canShare && navigator.canShare({ files: [archivo] }))
    try {
      return (await navigator.share({ files: [archivo], text: frase }), "compartida");
    } catch (err) {
      if (err && err.name === "AbortError") return "cancelada";
    }
  let url = URL.createObjectURL(blob),
    enlace = document.createElement("a");
  ((enlace.href = url),
    (enlace.download = nombre),
    document.body.appendChild(enlace),
    enlace.click(),
    document.body.removeChild(enlace),
    setTimeout(() => URL.revokeObjectURL(url), 1e3));
  return "descargada";
}
function BotonCompartir({ player, aplicar }) {
  let [armando, setArmando] = useState(!1);
  return (
    <button
      onClick={async () => {
        if (armando) return;
        setArmando(!0);
        let aviso = null;
        try {
          (await compartirSemana(player)) === "descargada" &&
            (aviso = "Se descargó la imagen de tu semana.");
        } catch (err) {
          aviso = "No se pudo armar la imagen.";
        }
        (setArmando(!1), aviso && aplicar((partida) => ({ state: partida, notices: [aviso] })));
      }}
      className="w-full py-3 text-sm mt-3"
      style={{
        background: "rgba(62,207,142,0.1)",
        border: "1px solid #3ecf8e",
        color: "#3ecf8e",
        fontWeight: 700,
      }}
    >
      {armando ? "Armando la imagen…" : "Compartir mi semana"}
    </button>
  );
}

export { dibujarSemana, compartirSemana, BotonCompartir };
