import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

// El service worker tiene que guardar para uso sin conexion los archivos del
// bundle, pero sus nombres llevan un hash que cambia con cada build. Este
// plugin escribe dist/sw.js a partir de src/sw.js con esa lista y con un nombre
// de cache nuevo por version, asi el activate borra la cache anterior.
function serviceWorker() {
  return {
    name: "dominio-service-worker",
    apply: "build",
    generateBundle(_, bundle) {
      const plantilla = readFileSync("src/sw.js", "utf8");
      const archivos = Object.keys(bundle)
        .filter((f) => f !== "index.html" && !f.endsWith(".map"))
        .sort();
      const version = createHash("sha256")
        .update(plantilla + archivos.join("\n"))
        .digest("hex")
        .slice(0, 10);

      const conCache = plantilla.replace(
        /const CACHE = ['"][^'"]*['"];/,
        `const CACHE = 'dominio-corporal-${version}';`,
      );
      const sw = conCache.replace(
        "/* __BUNDLE__ */",
        archivos.map((f) => `'./${f}',`).join("\n  "),
      );
      if (conCache === plantilla || sw === conCache) {
        this.error("src/sw.js ya no tiene las marcas que reemplaza el build");
      }
      this.emitFile({ type: "asset", fileName: "sw.js", source: sw });
    },
  };
}

export default defineConfig({
  // Rutas relativas: la app vive en /dominio-corporal/ en GitHub Pages.
  base: "./",
  plugins: [serviceWorker()],
  test: {
    include: ["tests/**/*.test.js"],
    // La zona del jugador: el dia cambia a medianoche de Argentina, no de UTC.
    env: { TZ: "America/Argentina/Buenos_Aires" },
  },
});
