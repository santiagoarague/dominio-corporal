// Revisor automatico: `npm run lint`. Corre tambien antes de publicar.
//
// Solo marca lo que es un error de verdad: una variable que no existe (el
// ReferenceError que rompia las partidas sin `care`), codigo que nadie usa, un
// hook llamado dentro de un `if`. No opina de estilo; de eso se ocupa Prettier.
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  { ignores: ["dist/", "test-results/", "playwright-report/"] },
  js.configs.recommended,
  {
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      // `catch (x) {}` es a proposito: el pitido, la vibracion o la pantalla
      // encendida fallan en silencio si el telefono no los tiene.
      "no-unused-vars": ["error", { caughtErrors: "none" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      // Una variable interna con el mismo nombre que una de afuera la tapa: un
      // `d` nuevo adentro de App leia otro `d` que no era el que uno creia. Hoy
      // no hay ninguna, y asi sigue.
      "no-shadow": "error",
      // Apagadas a proposito. exhaustive-deps pide que cada efecto se repita
      // cuando cambia cualquier cosa que lee, y aca muchos relojes se arman
      // solo cuando cambia la fase: con todo en la lista se reiniciarian con
      // cada cambio de la partida. Las demas (setState en un efecto, Date.now
      // al dibujar) son para el React Compiler, que esta app no usa; los
      // relojes calculan desde Date.now al dibujar y eso es lo que los
      // mantiene al dia.
    },
  },
  { files: ["src/sw.js"], languageOptions: { globals: globals.serviceworker } },
  {
    files: ["public/**/*.js"],
    languageOptions: { sourceType: "script", globals: globals.browser },
  },
  {
    files: ["tests/**/*.js", "*.config.js"],
    languageOptions: { globals: globals.node },
  },
  {
    // Las funciones que se pasan a page.evaluate corren en el navegador.
    files: ["e2e/**/*.js"],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
];
