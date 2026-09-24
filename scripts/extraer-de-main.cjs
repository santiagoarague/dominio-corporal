// Regenera src/juego.js a partir del index.html de main.
//
// Mientras main siga siendo la version publicada, los cambios al juego se
// hacen alli (sobre el bundle minificado) y esta rama los recibe corriendo
// `npm run extraer`. El resultado se verifica contra el original: si el arbol
// sintactico no es identico, no se escribe nada.
//
//   npm run extraer             lee `git show main:index.html`
//   npm run extraer -- <ruta>   lee un index.html concreto

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');
const acorn = require('acorn');
const walk = require('acorn-walk');
const escope = require('eslint-scope');
const prettier = require('prettier');

const RAIZ = path.join(__dirname, '..');
const DESTINO = path.join(RAIZ, 'src', 'juego.js');
const BS = String.fromCharCode(92);

// El React que traia el bundle (19.2.5, mas los ayudantes de esbuild). Si esta
// parte cambia, alguien toco React adentro del bundle y hay que mirarlo a mano.
const REACT_SHA = 'a7732532ee9f79cf3264ab2ab1edd7f30d9b7b9600937d3c7bc773a86bb786b3';
const IMPORTA_REACT = 'var i=nf(bi()),Sy=nf(Fb());';
const GLOBALES_OK = new Set(
  ('Array Blob Boolean Date Error FileReader JSON Math Number Object String URL clearInterval ' +
    'clearTimeout console document isFinite localStorage navigator parseFloat parseInt ' +
    'setInterval setTimeout window').split(' ')
);

const CABECERA = `// Dominio Corporal: el codigo del juego.
//
// ARCHIVO GENERADO por scripts/extraer-de-main.cjs a partir del index.html de
// main, que sigue siendo la version publicada. No lo edites a mano: se pisa en
// la proxima extraccion. Los cambios al juego se hacen en main y despues se
// corre \`npm run extraer\`.
//
// Es el bundle original sin React adentro (viene de npm, 19.2.5) y formateado.
// Los nombres de una o dos letras son los del minificador; CLAUDE.md es el mapa.
import React from "react";
import * as ReactDOMClient from "react-dom/client";

// El bundle importaba React con el ayudante __toESM de esbuild, que deja el
// modulo en .default y copia sus exportaciones al primer nivel. El juego usa
// las dos formas: i.default.createElement e i.useState.
const i = { ...React, default: React };
const Sy = ReactDOMClient;
`;
const CABECERA_MIN =
  'import React from "react";import * as ReactDOMClient from "react-dom/client";' +
  'const i={...React,default:React};const Sy=ReactDOMClient;\n';

function falla(msg) {
  console.error('ERROR: ' + msg + '\nNo se escribio nada.');
  process.exit(1);
}

function leerMain() {
  const ruta = process.argv[2];
  if (ruta) return fs.readFileSync(ruta, 'utf8');
  return execSync('git show main:index.html', { cwd: RAIZ, encoding: 'utf8', maxBuffer: 64 << 20 });
}

function parsear(src) {
  // ranges: eslint-scope los necesita para resolver nombres.
  return acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module', ranges: true });
}

// Arbol sin posiciones ni texto crudo, con las claves de objeto normalizadas:
// {"a":1} y {a:1} son lo mismo, y prettier quita las comillas que sobran.
function normalizar(ast) {
  walk.full(ast, (n) => {
    const conClave =
      n.type === 'Property' || n.type === 'MethodDefinition' || n.type === 'PropertyDefinition';
    if (conClave && !n.computed && n.key) {
      const k = n.key;
      n.key = { type: 'Key', name: k.type === 'Identifier' ? k.name : String(k.value) };
    }
  });
  return JSON.stringify(ast, (k, v) =>
    k === 'start' || k === 'end' || k === 'raw' || k === 'loc' || k === 'range' ? undefined : v
  );
}

// --- escapes \xHH / \uHHHH de los textos como caracteres reales -------------

const invisible = (c) =>
  c <= 0xa0 || c === 0xad || (c >= 0x200b && c <= 0x200f) || (c >= 0x2028 && c <= 0x202e) ||
  (c >= 0x2060 && c <= 0x206f) || (c >= 0xfe00 && c <= 0xfe0f) || c === 0xfeff ||
  (c >= 0xd800 && c <= 0xdfff);

function hex(s, n) {
  if (s.length !== n || !/^[0-9a-fA-F]+$/.test(s)) return -1;
  return parseInt(s, 16);
}

function leerEscape(raw, j) {
  const c = raw[j + 1];
  if (c === 'x') {
    const h = hex(raw.substr(j + 2, 2), 2);
    return h >= 0 ? [h, 4] : null;
  }
  if (c === 'u') {
    if (raw[j + 2] === '{') {
      const e = raw.indexOf('}', j + 3);
      const s = raw.slice(j + 3, e);
      const h = hex(s, s.length);
      return e > 0 && h >= 0 ? [h, e - j + 1] : null;
    }
    const h = hex(raw.substr(j + 2, 4), 4);
    return h >= 0 ? [h, 6] : null;
  }
  return null;
}

function decodificar(raw, comilla) {
  let out = '';
  let n = 0;
  for (let i = 0; i < raw.length; ) {
    if (raw[i] !== BS) {
      out += raw[i++];
      continue;
    }
    const e = leerEscape(raw, i);
    if (!e) {
      out += raw.substr(i, 2);
      i += 2;
      continue;
    }
    let [cod, largo] = e;
    let total = largo;
    if (cod >= 0xd800 && cod <= 0xdbff && raw[i + largo] === BS) {
      const e2 = leerEscape(raw, i + largo);
      if (e2 && e2[0] >= 0xdc00 && e2[0] <= 0xdfff) {
        cod = 0x10000 + ((cod - 0xd800) << 10) + (e2[0] - 0xdc00);
        total = largo + e2[1];
      }
    }
    const ch = String.fromCodePoint(cod);
    const dejar = (cod <= 0xffff && invisible(cod)) || ch === comilla || ch === BS ||
      ch === '`' || ch === '$' || ch === '\n' || ch === '\r';
    if (dejar) out += raw.substr(i, total);
    else {
      out += ch;
      n++;
    }
    i += total;
  }
  return [out, n];
}

function sinEscapes(src) {
  const ast = parsear(src);
  const etiquetados = new Set();
  walk.full(ast, (n) => {
    if (n.type === 'TaggedTemplateExpression') for (const q of n.quasi.quasis) etiquetados.add(q.start);
  });
  const cambios = [];
  walk.full(ast, (n) => {
    if (n.type === 'Literal' && typeof n.value === 'string') {
      const raw = src.slice(n.start, n.end);
      const [dentro, c] = decodificar(raw.slice(1, -1), raw[0]);
      if (c) cambios.push([n.start + 1, n.end - 1, dentro]);
    }
    if (n.type === 'TemplateElement' && !etiquetados.has(n.start)) {
      const [dentro, c] = decodificar(src.slice(n.start, n.end), '`');
      if (c) cambios.push([n.start, n.end, dentro]);
    }
  });
  cambios.sort((a, b) => b[0] - a[0]);
  let out = src;
  for (const [s, e, t] of cambios) out = out.slice(0, s) + t + out.slice(e);
  return out;
}

// ---------------------------------------------------------------------------

async function main() {
  const html = leerMain();
  const abre = '<script>\n(()=>{var Rg';
  const ini = html.indexOf(abre);
  if (ini < 0 || html.indexOf(abre, ini + 1) >= 0) falla('no encuentro un unico bundle en index.html');
  const bundle = html.slice(ini + '<script>\n'.length, html.lastIndexOf('</script>'));

  const corte = bundle.indexOf(IMPORTA_REACT);
  if (corte < 0 || bundle.indexOf(IMPORTA_REACT, corte + 1) >= 0) falla('no encuentro el import de React');
  const sha = crypto.createHash('sha256').update(bundle.slice(0, corte)).digest('hex');
  if (REACT_SHA.startsWith('__')) console.log('sha de React:', sha);
  else if (sha !== REACT_SHA) falla('cambio la parte de React del bundle (sha ' + sha + ')');

  const fin = bundle.lastIndexOf('})();');
  const app = bundle.slice(corte + IMPORTA_REACT.length, fin);
  const original = CABECERA_MIN + app;
  const ast = parsear(original);

  // Modo estricto: un modulo no admite asignar variables sin declarar.
  const scope = escope.analyze(ast, { ecmaVersion: 2022, sourceType: 'module' });
  const escrituras = [];
  const nuevas = new Set();
  for (const r of scope.globalScope.through) {
    const n = r.identifier.name;
    if (r.isWrite()) escrituras.push(n);
    else if (!GLOBALES_OK.has(n)) nuevas.add(n);
  }
  if (escrituras.length) falla('asignaciones a variables sin declarar: ' + escrituras.join(', '));
  if (nuevas.size) console.warn('AVISO: se leen globales nuevas o sin declarar: ' + [...nuevas].join(', '));

  // Las dos ultimas sentencias montan la app; eso vive en src/main.js.
  const cuerpo = ast.body;
  const [monta, dibuja] = cuerpo.slice(-2);
  const textoMonta = original.slice(monta.start, monta.end);
  const textoDibuja = original.slice(dibuja.start, dibuja.end);
  const m1 = /^var (\w+)=\(0,Sy\.createRoot\)\(document\.getElementById\("root"\)\);?$/.exec(textoMonta);
  const m2 = /^(\w+)\.render\(i\.default\.createElement\((\w+),null\)\);?$/.exec(textoDibuja);
  if (!m1 || !m2 || m1[1] !== m2[1]) falla('el final del bundle ya no es el montaje esperado');
  const raiz = m2[2];
  const mainJs = fs.readFileSync(path.join(RAIZ, 'src', 'main.js'), 'utf8');
  if (!mainJs.includes('import { ' + raiz + ' } from "./juego.js"')) {
    falla('el componente raiz ahora es ' + raiz + ' y src/main.js importa otro');
  }

  // Todo lo declarado en el primer nivel se exporta, para que las pruebas
  // puedan usar cualquier funcion del juego.
  const nombres = [];
  for (const s of cuerpo.slice(0, -2)) {
    if (s.type === 'FunctionDeclaration') nombres.push(s.id.name);
    else if (s.type === 'VariableDeclaration') {
      for (const d of s.declarations) {
        if (d.id.type !== 'Identifier') falla('declaracion con desestructuracion en el primer nivel');
        nombres.push(d.id.name);
      }
    }
  }
  const exportables = nombres.filter((n) => n !== 'i' && n !== 'Sy' && n !== 'React' && n !== 'ReactDOMClient');

  const sinMontar = CABECERA + app.slice(0, monta.start - CABECERA_MIN.length) +
    '\nexport {\n' + exportables.join(',\n') + '\n};\n';
  const legible = await prettier.format(sinEscapes(sinMontar), {
    parser: 'babel',
    printWidth: 100,
  });

  // Verificacion: mismo arbol que el original, sin el montaje y sin el export.
  const esperado = parsear(original);
  esperado.body = esperado.body.slice(0, -2);
  const obtenido = parsear(legible);
  const ultimo = obtenido.body[obtenido.body.length - 1];
  if (ultimo.type !== 'ExportNamedDeclaration') falla('falta el export final');
  obtenido.body = obtenido.body.slice(0, -1);
  if (normalizar(esperado) !== normalizar(obtenido)) falla('el arbol sintactico no coincide con el original');

  const antes = fs.existsSync(DESTINO) ? fs.readFileSync(DESTINO, 'utf8') : '';
  fs.writeFileSync(DESTINO, legible);
  console.log(
    antes === legible ? 'src/juego.js ya estaba al dia.' : 'src/juego.js regenerado.',
    legible.split('\n').length + ' lineas, ' + exportables.length + ' nombres exportados, arbol identico.'
  );
}

main().catch((e) => falla(e.stack || String(e)));
