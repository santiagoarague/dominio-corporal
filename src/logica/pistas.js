// El compañero se asoma una vez por sesión (por día y modalidad), en el descanso
// entre series o en el resumen de la rutina, y cuenta algo de la app que todavía no
// usaste; cuando ya usaste todo, un consejo de entrenamiento. El primer día no sale:
// ese día las explicaciones de los ejercicios ya se abren solas.
// partida.pistas = { sesion, vistas: {id: fecha}, usadas: {id: fecha} }, sin migración.
import { pistas } from "../datos/pistas.js";
import { consejos, hashDia } from "./primal.js";
import { sistemaActivo } from "./sistemas.js";
import { clonar } from "./partida.js";

function pistasDe(partida) {
  return partida.pistas || {};
}
function companeroListo(partida, clave, fecha) {
  if (!sistemaActivo(partida, "companero") || pistasDe(partida).sesion === clave) return !1;
  let historia = partida.history || {};
  return Object.keys(historia).some(
    (dia) => dia < fecha && (historia[dia] === "full" || historia[dia] === "partial"),
  );
}
// enPantalla: los ids cuyo botón se ve ahora mismo.
function elegirPista(partida, momento, enPantalla, fecha) {
  let registro = pistasDe(partida),
    vistas = registro.vistas || {},
    usadas = registro.usadas || {};
  for (let pista of pistas) {
    if (pista.cuando && pista.cuando !== momento) continue;
    if (vistas[pista.id] || usadas[pista.id] || (pista.hecha && pista.hecha(partida))) continue;
    if (pista.sinBoton || enPantalla.includes(pista.id)) return pista;
  }
  // Un consejo distinto del que muestra la tarjeta de arriba ese día.
  let delDia = hashDia(fecha, consejos.length),
    otro = (delDia + 1 + hashDia(fecha + "|companero", consejos.length - 1)) % consejos.length;
  return { id: null, texto: consejos[otro] };
}
// Asomarse lo marca como visto en seenUnlocks: el aviso de sistema nuevo solo sale al
// subir de nivel, y llegaría días después de haberlo conocido.
function anotarCompanero(partida, clave) {
  let copia = clonar(partida);
  copia.pistas = { ...pistasDe(copia), sesion: clave };
  copia.seenUnlocks || (copia.seenUnlocks = []);
  copia.seenUnlocks.includes("companero") || copia.seenUnlocks.push("companero");
  return copia;
}
function anotarPistaVista(partida, id, fecha) {
  if (!id) return partida;
  let copia = clonar(partida),
    registro = pistasDe(copia);
  return ((copia.pistas = { ...registro, vistas: { ...registro.vistas, [id]: fecha } }), copia);
}
// Devuelve la misma partida si ya estaba anotada: no se guarda ni se redibuja nada.
function anotarPistaUsada(partida, id, fecha) {
  let usadas = pistasDe(partida).usadas || {};
  if (usadas[id]) return partida;
  let copia = clonar(partida);
  return ((copia.pistas = { ...pistasDe(copia), usadas: { ...usadas, [id]: fecha } }), copia);
}

export {
  pistasDe,
  companeroListo,
  elegirPista,
  anotarCompanero,
  anotarPistaVista,
  anotarPistaUsada,
};
