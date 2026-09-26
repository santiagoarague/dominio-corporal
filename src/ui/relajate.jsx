// Relajate: un rato con el compañero para el descanso entre series o para bajar los
// nervios. Sin puntos, sin reloj en contra, nada que ganar ni perder.
// - Jugar: flota y rebota despacio como un salvapantallas y cambia de color en cada
//   borde; tocarlo lo aplasta con chispas; se arrastra y se lanza. Suben mancuernas,
//   pesas rusas y discos (tocalos: vuelan hacia él y los levanta) y gotas de agua
//   (llenan la botella de arriba, que al llenarse te dice que tomes agua).
// - Respirar: va al centro y se infla 4 s y se desinfla 6 s, con los ojos cerrados.
// Lo que da gusto es lo que se ve y la vibración: mucha gente entrena con música. Los
// sonidos pasan por pitido, así que el parlante de arriba los calla. El movimiento
// corre fuera de React (refs y el DOM del área), como un juego; React dibuja solo el
// marco y al compañero cuando cambia de gesto o de color.
import { useState, useEffect, useRef } from "react";
import { DibujoMascota } from "./tarjetas.jsx";
import { pitido } from "./prueba.jsx";
import { sdcVib } from "../logica/series.js";
import { sdcEstMMSS } from "../logica/estiramiento.js";
import { usePantallaEncendida } from "./pantalla.js";

var coloresRelax = ["#ffb84f", "#5fd3b5", "#b9a5ff", "#ff8fb0", "#7cc4ff"],
  notasRelax = [523, 587, 659, 784, 880, 1047, 1175, 1319],
  tamPet = 76,
  velocidadRelax = 44,
  gotasBotella = 6,
  inhalar = 4,
  exhalar = 6,
  dibujosRelax = {
    mancuerna:
      '<svg viewBox="0 0 60 26" width="100%" height="100%"><rect x="12" y="11" width="36" height="4" rx="2" fill="#c8d0e4"/><rect x="4" y="3" width="8" height="20" rx="2" fill="#8a93ad"/><rect x="48" y="3" width="8" height="20" rx="2" fill="#8a93ad"/><rect x="0" y="7" width="4" height="12" rx="1" fill="#8a93ad"/><rect x="56" y="7" width="4" height="12" rx="1" fill="#8a93ad"/></svg>',
    pesa: '<svg viewBox="0 0 40 40" width="100%" height="100%"><path d="M11,16 Q11,4 20,4 Q29,4 29,16" stroke="#8a93ad" stroke-width="4" fill="none"/><circle cx="20" cy="26" r="13" fill="#6b7390"/><rect x="15" y="22" width="10" height="3" rx="1.5" fill="#c8d0e4"/></svg>',
    disco:
      '<svg viewBox="0 0 40 40" width="100%" height="100%"><circle cx="20" cy="20" r="18" fill="#4a5270"/><circle cx="20" cy="20" r="12" fill="none" stroke="#8a93ad" stroke-width="2"/><circle cx="20" cy="20" r="4" fill="#070b16"/></svg>',
    gota: '<svg viewBox="0 0 30 40" width="100%" height="100%"><path d="M15,2 Q27,20 27,27 A12,12 0 0 1 3,27 Q3,20 15,2 Z" fill="#6fc3ff"/><ellipse cx="10" cy="26" rx="3" ry="5" fill="#dff2ff" opacity=".7"/></svg>',
  },
  tamanosRelax = { mancuerna: [46, 20], pesa: [34, 34], disco: [34, 34], gota: [24, 32] };
function botellaRelax(gotas, llena) {
  let alto = Math.round((40 * gotas) / gotasBotella);
  return (
    '<svg viewBox="0 0 30 54" width="100%" height="100%"><rect x="10" y="0" width="10" height="6" rx="1.5" fill="#8a93ad"/><rect x="3" y="7" width="24" height="45" rx="6" fill="rgba(111,195,255,.08)" stroke="' +
    (llena ? "#6fc3ff" : "#8a93ad") +
    '" stroke-width="2"/><rect x="5" y="' +
    (50 - alto) +
    '" width="20" height="' +
    alto +
    '" rx="4" fill="#6fc3ff"/></svg>'
  );
}

// descanso: {ini, seg} si se abrió desde la barra de descanso (arriba se ve lo que
// queda; App la cierra cuando el descanso termina), o null.
function Relajate({ tipo, colorInicial, descanso, onSalir }) {
  usePantallaEncendida();
  let [modo, setModo] = useState("jugar"),
    [gesto, setGesto] = useState(""),
    [color, setColor] = useState(colorInicial || coloresRelax[0]),
    area = useRef(null),
    pet = useRef(null),
    pesa = useRef(null),
    botella = useRef(null),
    texto = useRef(null),
    reloj = useRef(null),
    modoRef = useRef(modo),
    descansoRef = useRef(descanso);
  ((modoRef.current = modo), (descansoRef.current = descanso));
  useEffect(() => {
    let zona = area.current,
      quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      base = quieto ? 0 : velocidadRelax,
      x = 60,
      y = 80,
      vx = base * 0.8,
      vy = base * 0.6,
      aplasta = 0,
      fase = 0,
      feliz = 0,
      levanta = 0,
      arrastre = null,
      objetos = [],
      proximo = 0.6,
      gotas = 0,
      aviso = 0,
      ciclo = 0,
      faseResp = -1,
      indiceColor = Math.max(0, coloresRelax.indexOf(colorInicial)),
      gestoActual = "",
      ultimo = performance.now(),
      cuadro = 0,
      modoPrevio = "jugar",
      esperas = [];
    let ponerGesto = (nuevo) => {
      nuevo !== gestoActual && ((gestoActual = nuevo), setGesto(nuevo));
    };
    let nota = (hz, ms) => pitido(hz, ms || 500);
    let chispas = (px, py, tinte, cuantas, fuerza) => {
      if (quieto) return;
      for (let i = 0; i < cuantas; i++) {
        let chispa = document.createElement("div"),
          angulo = Math.random() * 6.28,
          largo = fuerza * (0.5 + Math.random() * 0.7),
          lado = 4 + Math.random() * 5;
        chispa.style.cssText =
          "position:absolute;pointer-events:none;left:" +
          px +
          "px;top:" +
          py +
          "px;width:" +
          lado +
          "px;height:" +
          lado +
          "px;background:" +
          tinte +
          ";border-radius:" +
          (i % 2 ? "50%" : "1px");
        zona.appendChild(chispa);
        if (!chispa.animate) {
          chispa.remove();
          continue;
        }
        chispa.animate(
          [
            { transform: "translate(-50%,-50%)", opacity: 1 },
            {
              transform:
                "translate(" +
                (Math.cos(angulo) * largo - lado / 2) +
                "px," +
                (Math.sin(angulo) * largo - lado / 2) +
                "px) rotate(" +
                Math.round(angulo * 200) +
                "deg)",
              opacity: 0,
            },
          ],
          { duration: 650 + Math.random() * 250, easing: "cubic-bezier(.15,.8,.3,1)" },
        ).onfinish = () => chispa.remove();
      }
    };
    let onda = (px, py, tinte) => {
      let anillo = document.createElement("div");
      anillo.style.cssText =
        "position:absolute;pointer-events:none;border-radius:50%;width:40px;height:40px;left:" +
        (px - 20) +
        "px;top:" +
        (py - 20) +
        "px;border:2px solid " +
        tinte;
      zona.appendChild(anillo);
      if (!anillo.animate) return void setTimeout(() => anillo.remove(), 300);
      anillo.animate(
        [
          { transform: "scale(.2)", opacity: 0.9 },
          { transform: "scale(3)", opacity: 0 },
        ],
        { duration: 800, easing: "ease-out" },
      ).onfinish = () => anillo.remove();
    };
    let mensaje = (frase, segundos) => {
      texto.current && (texto.current.textContent = frase);
      aviso = segundos;
    };
    let nuevoObjeto = (alto) => {
      let clase = ["gota", "gota", "mancuerna", "pesa", "disco"][Math.floor(Math.random() * 5)],
        [ancho, altura] = tamanosRelax[clase],
        el = document.createElement("div");
      el.style.cssText =
        "position:absolute;left:0;top:0;pointer-events:none;width:" +
        ancho +
        "px;height:" +
        altura +
        "px";
      el.innerHTML = dibujosRelax[clase];
      zona.appendChild(el);
      objetos.push({
        el,
        clase,
        ancho,
        altura,
        x: 16 + Math.random() * Math.max(10, zona.clientWidth - 32 - ancho),
        y: alto + 10,
        cx: 0,
        v: (22 + Math.random() * 14) * (quieto ? 0.5 : 1),
        f: Math.random() * 6,
        giro: quieto ? 0 : (Math.random() - 0.5) * 40,
      });
    };
    let vuela = (objeto, tx, ty, alLlegar) => {
      let desde =
        "translate(" +
        (objeto.cx - objeto.ancho / 2) +
        "px," +
        (objeto.y - objeto.altura / 2) +
        "px)";
      if (!objeto.el.animate) return (objeto.el.remove(), alLlegar());
      objeto.el.animate(
        [
          { transform: desde + " scale(1.25)" },
          {
            transform:
              "translate(" +
              (tx - objeto.ancho / 2) +
              "px," +
              (ty - objeto.altura / 2) +
              "px) scale(.5)",
            opacity: 0.6,
          },
        ],
        { duration: 420, easing: "cubic-bezier(.5,0,.3,1)", fill: "forwards" },
      ).onfinish = () => (objeto.el.remove(), alLlegar());
    };
    let pintarBotella = (llena) => {
      botella.current && (botella.current.innerHTML = botellaRelax(gotas, llena));
    };
    pintarBotella(!1);
    let paso = (ahora) => {
      let dt = Math.min(0.05, (ahora - ultimo) / 1000),
        ancho = zona.clientWidth,
        alto = zona.clientHeight,
        escala = 1;
      ultimo = ahora;
      let pausa = descansoRef.current;
      if (pausa && reloj.current)
        reloj.current.textContent = sdcEstMMSS(
          Math.max(0, pausa.seg - Math.floor((Date.now() - pausa.ini) / 1000)),
        );
      aviso > 0 &&
        ((aviso -= dt),
        aviso <= 0 &&
          modoRef.current === "jugar" &&
          texto.current &&
          (texto.current.textContent = ""));
      modoRef.current !== modoPrevio &&
        ((modoPrevio = modoRef.current), (ciclo = 0), (faseResp = -1));
      fase += dt * 22;
      aplasta *= Math.pow(0.02, dt);
      feliz -= dt;
      if (modoRef.current === "respirar") {
        ciclo = (ciclo + dt) % (inhalar + exhalar);
        x += ((ancho - tamPet) / 2 - x) * Math.min(1, dt * 3);
        y += ((alto - tamPet) / 2 - y) * Math.min(1, dt * 3);
        let suave = (v) => 0.5 - 0.5 * Math.cos(Math.PI * v),
          adentro = ciclo < inhalar,
          ahoraFase = adentro ? 0 : 1;
        escala = adentro
          ? 1 + 0.7 * suave(ciclo / inhalar)
          : 1.7 - 0.7 * suave((ciclo - inhalar) / exhalar);
        if (ahoraFase !== faseResp)
          ((faseResp = ahoraFase),
            sdcVib(adentro ? 25 : [15, 60, 15]),
            adentro ? pitido(700, 350, 900) : pitido(900, 450, 700));
        texto.current &&
          (texto.current.textContent = adentro
            ? "Inhalá… " + Math.ceil(inhalar - ciclo)
            : "Exhalá… " + Math.ceil(inhalar + exhalar - ciclo));
        ponerGesto("calma");
      } else if (!arrastre) {
        x += vx * dt;
        y += vy * dt;
        let rebote = !1;
        (x < 0 && ((x = 0), (vx = Math.abs(vx)), (rebote = !0)),
          x > ancho - tamPet && ((x = ancho - tamPet), (vx = -Math.abs(vx)), (rebote = !0)),
          y < 0 && ((y = 0), (vy = Math.abs(vy)), (rebote = !0)),
          y > alto - tamPet && ((y = alto - tamPet), (vy = -Math.abs(vy)), (rebote = !0)));
        if (rebote) {
          indiceColor = (indiceColor + 1) % coloresRelax.length;
          (setColor(coloresRelax[indiceColor]),
            chispas(x + tamPet / 2, y + tamPet / 2, coloresRelax[indiceColor], 6, 40));
        }
        let rapidez = Math.hypot(vx, vy);
        if (rapidez > base) {
          let freno = Math.max(rapidez > 0 ? base / rapidez : 0, Math.pow(0.25, dt));
          ((vx *= freno), (vy *= freno));
          Math.hypot(vx, vy) < 1 && base === 0 && ((vx = 0), (vy = 0));
        }
        ponerGesto(feliz > 0 || levanta > 0 ? "feliz" : "");
      } else ponerGesto("feliz");
      let estira = 1 + 0.3 * aplasta * Math.cos(fase),
        achica = 1 - 0.3 * aplasta * Math.cos(fase);
      pet.current &&
        (pet.current.style.transform =
          "translate(" +
          x +
          "px," +
          y +
          "px) scale(" +
          escala * estira +
          "," +
          escala * achica +
          ")");
      if (levanta > 0 && pesa.current) {
        levanta -= dt;
        let sube = Math.abs(Math.sin(((1.4 - levanta) * Math.PI * 2) / 0.7)) * 18;
        pesa.current.style.display = "block";
        pesa.current.style.transform =
          "translate(" + (x + tamPet / 2 - 28) + "px," + (y - 14 - sube) + "px)";
        levanta <= 0 &&
          ((pesa.current.style.display = "none"),
          chispas(x + tamPet / 2, y - 4, "#ffb84f", 10, 50));
      }
      proximo -= dt;
      proximo <= 0 &&
        modoRef.current === "jugar" &&
        (nuevoObjeto(alto), (proximo = 1.2 + Math.random() * 0.8));
      objetos = objetos.filter((objeto) => {
        if (objeto.fue) return !1;
        objeto.y -= objeto.v * dt;
        objeto.f += dt * 1.4;
        objeto.cx = objeto.x + objeto.ancho / 2 + Math.sin(objeto.f) * (quieto ? 0 : 8);
        objeto.el.style.transform =
          "translate(" +
          (objeto.cx - objeto.ancho / 2) +
          "px," +
          (objeto.y - objeto.altura / 2) +
          "px) rotate(" +
          Math.sin(objeto.f) * objeto.giro +
          "deg)";
        if (objeto.y < -40 || modoRef.current !== "jugar") return (objeto.el.remove(), !1);
        return !0;
      });
      cuadro = requestAnimationFrame(paso);
    };
    cuadro = requestAnimationFrame(paso);
    let punto = (evento) => {
      let caja = zona.getBoundingClientRect();
      return [evento.clientX - caja.left, evento.clientY - caja.top];
    };
    let alTocar = (evento) => {
      let [px, py] = punto(evento);
      if (modoRef.current === "jugar")
        for (let objeto of objetos) {
          if (objeto.fue) continue;
          if (
            Math.hypot(px - objeto.cx, py - objeto.y) >
            Math.max(objeto.ancho, objeto.altura) / 2 + 14
          )
            continue;
          objeto.fue = !0;
          (sdcVib(10),
            chispas(objeto.cx, objeto.y, objeto.clase === "gota" ? "#6fc3ff" : "#c8d0e4", 8, 36));
          if (objeto.clase === "gota") {
            let caja = botella.current.getBoundingClientRect(),
              marco = zona.getBoundingClientRect();
            vuela(objeto, caja.left - marco.left + 15, caja.top - marco.top + 30, () => {
              gotas = Math.min(gotasBotella, gotas + 1);
              (pintarBotella(gotas >= gotasBotella), nota(1047, 300));
              if (gotas >= gotasBotella) {
                (mensaje("Tomá un trago de agua", 3), sdcVib([30, 60, 30]));
                esperas.push(setTimeout(() => ((gotas = 0), pintarBotella(!1)), 3000));
              }
            });
          } else
            vuela(objeto, x + tamPet / 2, y + tamPet / 2, () => {
              ((levanta = 1.4), (aplasta = 0.8), sdcVib(20), nota(784, 400));
            });
          return;
        }
      if (Math.hypot(px - (x + tamPet / 2), py - (y + tamPet / 2)) < tamPet * 0.6) {
        ((aplasta = 1),
          (feliz = 1.2),
          sdcVib(15),
          nota(notasRelax[4 + Math.floor(Math.random() * 4)], 600),
          chispas(x + tamPet / 2, y + tamPet / 2, coloresRelax[indiceColor], 14, 70),
          onda(x + tamPet / 2, y + tamPet / 2, coloresRelax[indiceColor]));
        if (modoRef.current === "jugar") {
          arrastre = { dx: px - x, dy: py - y, huella: [[px, py, performance.now()]] };
          try {
            zona.setPointerCapture(evento.pointerId);
          } catch (err) {}
        }
        return;
      }
      (onda(px, py, "rgba(207,216,255,.55)"),
        chispas(px, py, "#cfd8ff", 5, 26),
        nota(
          notasRelax[Math.max(0, Math.min(7, Math.round((1 - py / zona.clientHeight) * 7)))],
          700,
        ));
    };
    let alMover = (evento) => {
      if (!arrastre) return;
      let [px, py] = punto(evento);
      x = Math.max(0, Math.min(zona.clientWidth - tamPet, px - arrastre.dx));
      y = Math.max(0, Math.min(zona.clientHeight - tamPet, py - arrastre.dy));
      arrastre.huella.push([px, py, performance.now()]);
      arrastre.huella.length > 5 && arrastre.huella.shift();
    };
    let alSoltar = () => {
      if (!arrastre) return;
      let huella = arrastre.huella,
        primero = huella[0],
        ultimoPunto = huella[huella.length - 1],
        tiempo = Math.max(16, ultimoPunto[2] - primero[2]) / 1000;
      vx = Math.max(-700, Math.min(700, (ultimoPunto[0] - primero[0]) / tiempo));
      vy = Math.max(-700, Math.min(700, (ultimoPunto[1] - primero[1]) / tiempo));
      Math.hypot(vx, vy) < 30 && ((vx = base * 0.8), (vy = base * 0.6));
      ((arrastre = null), (aplasta = 0.7));
    };
    let alTeclado = (evento) => evento.key === "Escape" && onSalir();
    (zona.addEventListener("pointerdown", alTocar),
      zona.addEventListener("pointermove", alMover),
      zona.addEventListener("pointerup", alSoltar),
      zona.addEventListener("pointercancel", alSoltar),
      window.addEventListener("keydown", alTeclado));
    return () => {
      (cancelAnimationFrame(cuadro),
        esperas.forEach(clearTimeout),
        zona.removeEventListener("pointerdown", alTocar),
        zona.removeEventListener("pointermove", alMover),
        zona.removeEventListener("pointerup", alSoltar),
        zona.removeEventListener("pointercancel", alSoltar),
        window.removeEventListener("keydown", alTeclado));
    };
  }, []);
  useEffect(() => {
    texto.current && (texto.current.textContent = "");
  }, [modo]);
  let boton = (activo) => ({
    flex: 1,
    minHeight: 48,
    background: activo ? "#5fd3b5" : "rgba(255,255,255,0.05)",
    border: "1px solid " + (activo ? "#5fd3b5" : "rgba(255,255,255,0.25)"),
    color: activo ? "#062a22" : "#e8ecf7",
    fontWeight: 700,
    fontSize: 16,
  });
  return (
    <div
      role="dialog"
      aria-label="Relajate"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        background: "#070b16",
        display: "flex",
        flexDirection: "column",
        touchAction: "none",
        userSelect: "none",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: "8px 16px", borderBottom: "1px solid rgba(255,184,79,0.25)" }}
      >
        {descanso ? (
          <div>
            <div className="text-xs" style={{ color: "#9aa4bd", letterSpacing: 2 }}>
              DESCANSO
            </div>
            <div
              ref={reloj}
              style={{
                fontFamily: "Chakra Petch, sans-serif",
                fontSize: 26,
                color: "#ffb84f",
                lineHeight: 1.1,
              }}
            />
          </div>
        ) : (
          <div
            style={{ fontFamily: "Chakra Petch, sans-serif", color: "#e8ecf7", fontWeight: 700 }}
          >
            Relajate
          </div>
        )}
        <button
          onClick={onSalir}
          style={{
            minHeight: 44,
            padding: "0 16px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.28)",
            color: "#e8ecf7",
            fontWeight: 700,
          }}
        >
          Salir
        </button>
      </div>
      <div ref={area} style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <div
          ref={botella}
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 14,
            top: 12,
            width: 30,
            height: 54,
            pointerEvents: "none",
            display: modo === "jugar" ? "block" : "none",
          }}
        />
        <div
          ref={pesa}
          aria-hidden="true"
          style={{ position: "absolute", left: 0, top: 0, width: 56, height: 24, display: "none" }}
          dangerouslySetInnerHTML={{ __html: dibujosRelax.mancuerna }}
        />
        <div
          ref={pet}
          data-relax="companero"
          style={{ position: "absolute", left: 0, top: 0, width: tamPet, height: tamPet }}
        >
          <DibujoMascota type={tipo || "dog"} size={tamPet} color={color} gesto={gesto} />
        </div>
        <div
          ref={texto}
          aria-live="polite"
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 16,
            textAlign: "center",
            color: "#e8ecf7",
            fontSize: 18,
            fontWeight: 600,
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="flex gap-2" style={{ padding: "10px 16px 12px" }}>
        <button
          onClick={() => setModo("jugar")}
          aria-pressed={modo === "jugar"}
          style={boton(modo === "jugar")}
        >
          Jugar
        </button>
        <button
          onClick={() => setModo("respirar")}
          aria-pressed={modo === "respirar"}
          style={boton(modo === "respirar")}
        >
          Respirar
        </button>
      </div>
    </div>
  );
}

export { Relajate };
