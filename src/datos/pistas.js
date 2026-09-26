// Lo que el compañero cuenta cuando se asoma, en orden de prioridad. Cada id es
// también el data-pista del botón del que habla: "Mostrame" lo busca en pantalla, y
// tocar ese botón (con o sin el compañero) lo anota como usado, así no se vuelve a
// contar. cuando: "descanso" (entre series), "resumen" (con la rutina registrada) o
// sin cuando (los dos). sinBoton: se cuenta aunque su botón no esté en pantalla, y
// entonces no hay "Mostrame". hecha: lo que ya se sabe usado mirando la partida.
var pistas = [
  {
    id: "desmarcar",
    cuando: "descanso",
    texto:
      "Si marcaste una serie sin querer, tocala de nuevo y se desmarca. Las otras quedan como estaban.",
  },
  {
    id: "ajustar",
    cuando: "descanso",
    texto:
      "¿Ya sabés cuántas vas a hacer en cada serie? Tocá Ajustar series y armá tu plan, por ejemplo 15, 15 y 12.",
  },
  {
    id: "relajar",
    cuando: "descanso",
    texto:
      "En el descanso tocá Relajate: podés jugar conmigo o respirar conmigo mientras corre el reloj.",
  },
  {
    id: "sostener",
    cuando: "descanso",
    texto:
      "En los ejercicios que se aguantan, tocá Sostener: la app cuenta los segundos y suena al empezar y al terminar.",
  },
  {
    id: "comoSeHace",
    cuando: "descanso",
    texto:
      "Si no te acordás cómo era un ejercicio, tocá ¿Cómo se hace?: dice cómo ponerte, qué se mueve y qué evitar.",
  },
  {
    id: "kilos",
    cuando: "descanso",
    texto:
      "Tocá la sugerencia de kilos y se completan todas las series. Solo te propone subir si la última vez completaste las repeticiones.",
  },
  {
    id: "estirar",
    cuando: "resumen",
    texto:
      "Recién terminás: es el mejor momento para estirar. El estiramiento corto dura menos de 4 minutos.",
    hecha: (partida) =>
      !!(
        (partida.today && partida.today.stretchDone) ||
        (partida.week && partida.week.stretchCount)
      ),
  },
  {
    id: "constancia",
    cuando: "resumen",
    texto:
      "En Constancia podés tocar cualquier día para ver qué hiciste. Si entrenaste y no lo anotaste, lo anotás ahí.",
  },
  {
    id: "recuperacion",
    cuando: "resumen",
    sinBoton: !0,
    texto:
      "El día que llegues cansado, tocá Recuperación arriba de la rutina: son la mitad de las repeticiones y la racha sigue.",
    hecha: (partida) => !!(partida.today && partida.today.mode === "recovery"),
  },
  {
    id: "minimizar",
    texto: "Si se te llena la pantalla, Minimizar todo cierra todas las tarjetas de una vez.",
  },
  {
    id: "guia",
    texto: "Todo lo que hace la app está explicado en ¿Cómo funciona?, arriba de todo.",
  },
];

export { pistas };
