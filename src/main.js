// Punto de entrada: monta el juego. Esta separado de juego.js para que las
// pruebas puedan importar las funciones del juego sin dibujar la app.
import React from "react";
import { createRoot } from "react-dom/client";
import { w5 } from "./juego.js";

createRoot(document.getElementById("root")).render(React.createElement(w5, null));

// sw.js es una plantilla que solo existe en dist/: con `npm run dev` no hay
// service worker, y asi tampoco hay una cache vieja escondiendo los cambios.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
