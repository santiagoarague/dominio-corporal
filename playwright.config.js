import { defineConfig } from "@playwright/test";

// Prueba la app compilada (dist/), que es lo que se publica, en el Edge que
// trae Windows: no hace falta descargar navegadores.
export default defineConfig({
  testDir: "e2e",
  timeout: 90_000,
  expect: { timeout: 30_000 },
  workers: 1,
  use: {
    baseURL: "http://localhost:4180",
    channel: "msedge",
    viewport: { width: 375, height: 812 },
    locale: "es-AR",
    timezoneId: "America/Argentina/Buenos_Aires",
    serviceWorkers: "allow",
  },
  webServer: {
    command: "npm run build && npx vite preview --port 4180 --strictPort",
    port: 4180,
    timeout: 120_000,
    reuseExistingServer: false,
  },
});
