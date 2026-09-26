# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

"Dominio Corporal" is a gamified bodyweight-training web app in Rioplatense Spanish (ranks, XP, long cardio sessions called *travesias*, a pet companion). It used to be called "Sistema de Dominio Corporal" and its whole lexicon was borrowed from Solo Leveling; that was removed deliberately (see **The world and its lexicon**). It is a React 19 single-page app built with **Vite**, with no server and no account.

`diseno/DISENO.md` is the design brief the author loads into a claude.ai Project to design from the phone, with `diseno/instrucciones-proyecto.md` as that Project's instructions. It is written in Spanish, for a reader without the code. **When a system, a number or a design rule changes, update it in the same commit**, or the phone Claude designs against a game that no longer exists. `PENDIENTES.md` tracks what is left before publishing and is worth reading before starting work.

`storage.js` must load **before** the game: it defines `window.claude.use("db")` against `localStorage`, replacing the Claude Artifacts database the app was written for. All progress lives in one key, `dominio-corporal:player/state`. **Never change that key or the site's URL**: a player's whole history lives there and nowhere else.

## Working on the code

| path | what it is |
|---|---|
| `src/datos/` | tables: `ejercicios.js` (`ejerciciosPeso`, `ejerciciosGym`, `ejerciciosFlow`, `factorRango`, `modalidades`), `logros.js` (`logros` and `revisarLogros`), `guia.js` (`guia`, skills `habilidades`), `salud.js` (`alarmas`, `reglaDolor`, `cuidadoArticular`, neuromotor), `rangos.js` (`rangos`, `nivelUmbral`, titles), `pistas.js` (what the companion tells) |
| `src/logica/` | rules without UI: `partida.js` (`crearPartida`, `cargarPartida`, `registrarRutina`, `subirNiveles`, undo, missions, Umbral), `rutina.js` (`modalidadDelDia`, `ejercicioDe`, `volumen`, `metaDelDia`, `costoNivel`, dates), `extras.js` (primeras veces, streak recount, set marks, gym helpers, `sdcTier`), `tienda.js`, `estiramiento.js`, `combate.js`, `explorar.js`, `primal.js` (also `hashDia`, the day hash), `sistemas.js`, `series.js`, `atributos.js`, `respaldo.js`, `pistas.js` (when the companion peeks and what it picks), `mejora.js` (the dated fitness-test history), `mes.js` (the monthly summary), `compartir.js` (what the shared week image says) |
| `src/ui/` | JSX components: `App.jsx` (`App`: state, effects, handlers and what surrounds the tabs — header, notices, shop, guide, tab bar; 2.297 lines), `pestanas/` (one file per tab: `entreno.jsx` `PestanaEntreno` — its six big cards in `pestanas/entreno/`: `rutina.jsx` `TarjetaRutina`, `estiramiento.jsx`, `constancia.jsx`, `cuerpo.jsx`, `travesia.jsx`, `umbral.jsx` — `combate.jsx`, `primal.jsx`, `explorar.jsx`, `logros.jsx`, `perfil.jsx`, plus `pruebas.jsx` `PanelPruebas`), `Inicio.jsx` (`Inicio`, onboarding), `Raiz.jsx` (`Raiz`), and one file per piece: `ejercicio.jsx` (`FilaEjercicio`), `cuerpo.jsx` (`FiguraCuerpo`), `constancia.jsx`, `calentamiento.jsx` (also `PasoGuiado`, shared with stretching), `animo.jsx`, `tarjetas.jsx` (`Plegable`), `metronomo.jsx`, `descanso.jsx`, `prueba.jsx` (also `pitido`, the beep), `neuromotor.jsx`, `companero.jsx` (`Companero`, the one that peeks, and the dog/cat/face choice), `relajate.jsx` (`Relajate`, the screensaver-like break with the companion), `compartir.jsx` (the week image and `BotonCompartir`), `iconos.jsx`; `pantalla.js` (wake lock) has no markup |
| `src/juego.js` | re-exports every module, so tests can `import * as J from "../src/juego.js"` |
| `src/main.js` | mounts `Raiz` and registers the service worker in production |
| `index.html` | the Vite entry: the head `<style>` (fonts and the utility classes), the splash, `storage.js`, the service-worker registration |
| `src/sw.js` | the service worker as a **template**: the build writes `dist/sw.js` with a new `CACHE` name per build and the hashed bundle files added to `ASSETS` (plugin in `vite.config.js`, which fails the build if its two markers disappear) |
| `public/` | copied verbatim to `dist/`: `storage.js`, `manifest.webmanifest`, `privacidad.html`, `fuentes/`, the three icons (`icon-maskable-512` is padded to 78% so a round Android mask does not crop the logo) |
| `tests/` | Vitest, against the real functions |
| `e2e/` | Playwright, against the built app |

**Commands:** `npm install` · `npm run dev` (5173, hot reload) · `npm test` · `npm run build` → `dist/` · `npm run preview` (4173) · `npm run test:e2e` · `npm run lint` · `npm run format`. The Vite warnings about `./fuentes/*.woff2` and `storage.js` are expected: they stay runtime paths into `public/`.

**Run `npm run lint` and `npm test` before every commit that touches `src/`.** 159 cases in about 3 s, with the clock pinned to a Thursday in Buenos Aires time: the XP curve, the first level-up for every classification × focus × modality × test result, the Umbral gate, no-penalty sessions, multi-session bookkeeping, undo, the retro-logged day, save loading and migration, dates, sets, the metronome modifiers, notice tiering *using the notices `registrarRutina` really emits*, the exact duration of every XP buff, and what every metronome and Primal sound is (`tests/sonidos.test.js`, against a fake `AudioContext`). The deploy runs the linter and the tests and publishes nothing if either fails. `npm run test:e2e` builds, serves `dist/` on 4180 and, in the installed Edge (`channel: "msedge"`, no browser download), plays the new-player path with undo, the mood correction, an offline reload and the companion peeking during a rest, in `e2e/sonidos.spec.js` listens to the metronome, a whole Primal round and the hold clock through a fake `AudioContext` that logs each tone against `page.clock`, and in `e2e/legibilidad.spec.js` measures every tab for text under 14 px, taps under 44, contrast under 4,5:1 and anything wider than the phone. **When you change a rule, change its test in the same commit** — a test that no longer describes the game is worse than none.

**React is pinned to 19.2.5**, the exact version the original bundle carried. The UI is **JSX with the automatic runtime** (Vite's default for `.jsx`), and hooks are plain imports: `import { useState, useEffect } from "react"`. No element is a `createElement` call any more. The last one was each tab's icon in `App`'s tab bar: its type arrived in a variable called `m`, and JSX reads a lowercase `<m>` as an HTML tag; with the variable named `IconoTab` it is `<IconoTab size={13} />`. The other was inside `BotonSistema`, a component nothing rendered, removed with the rest of the dead code. Only `src/main.js`, a plain `.js` file, still mounts `Raiz` with `React.createElement`.

**How the JSX was proven equal.** 1.281 `i.default.createElement(...)` calls were converted by a script that writes text children as JSX text only when they hold no `{}<>&`, line breaks or bare whitespace (otherwise `{"…"}`, because JSX decodes `&amp;` and trims across lines), and falls back to `createElement` whenever an element cannot be expressed exactly. Then each `.jsx` was compiled back with esbuild (classic runtime, factory `i.default.createElement`) and its AST compared with the old `.js` also passed through esbuild — both sides get esbuild's own rewrites (`!0`→`true`, renamed duplicate locals, export order) — normalizing only what React cannot tell apart: `{...p}` as the whole props equals `p`, `{}` equals `null`, and adjacent string children merge (Prettier splits `"Llegás "` into `Llegás{" "}`). Equal before and after Prettier. Finally a Playwright script played the same path on the published build and on the new one, with `Math.random` seeded, and compared `#root`'s HTML on six screens (≈265 KB): identical. The old alias `i` and `src/react.js` are gone.

**Modules are split by topic, and each imports exactly what it uses.** The split was mechanical and verified — all 318 top-level statements of the old single file landed in exactly one module with an identical AST, and the 380 exported names matched. Two rules came out of it. **A module cannot assign to an import**: `sdcDevN`, the five-tap counter, is written by `App.js`, so it lives there — a top-level `var` that another file writes has to move to that file. **Top-level data must not read another module's data before that module has loaded**: the split checked every load-time reference against the real evaluation order (from `ui/Raiz.js`, and from the `juego.js` barrel the tests use) and found none; if you add a table built from another module's table, import it and make sure the dependency does not go the other way.

**`npm run lint` is ESLint, and it only flags what is a bug.** `eslint.config.js` turns on the recommended JavaScript rules — an undeclared variable (the `care` `ReferenceError` below would have been caught), code nothing uses, an empty block — and the one React rule that catches crashes, `rules-of-hooks`: a hook called inside an `if` or a loop. ESLint 10 sees JSX, so `<Inexistente />` is an undeclared variable and a component used only as a tag does not count as unused. `catch (x) {}` is allowed, because the beep, the vibration and the wake lock are meant to fail silently on a phone without them. **Three React rules are off on purpose.** `exhaustive-deps` asks every effect to re-run whenever anything it reads changes, and many timers here are armed only when their phase changes: listing everything would restart them on every save. `set-state-in-effect` and `purity` are for the React Compiler, which this app does not use, and the timers compute from `Date.now()` during render because that is what keeps them on time. Its first run found one real bug (see **Body weight**, below) and a dozen dead values, all removed and checked on the same 41 screens: the combat typing handler `combGolpeTexto` and its `combTexto` state from when you typed "hecho" to strike, `ponerKg` (replaced by per-set kilos), and values computed and never shown. It also renamed the two wake-lock hooks: they were `sdcWakeUse` and `sdcWakeSi`, and `rules-of-hooks` only checks the callers of a function whose name starts with `use` — so they are `usePantallaEncendida` and `usePantallaSi`. The bundle stayed byte-identical after that rename. **`no-shadow` is on for `src/` too**: a variable inside a function named like one outside it is an error, because the inner one silently hides the outer one from everything below it. When the UI's one-letter locals got names there were none left, and the rule keeps it that way.

**New names need no prefix.** `sdcBase`, `sdcSplit`, `sdcSerie`, `sdcTier` and friends carry an `sdc` prefix from the years when every other name was the minifier's one or two letters and a new `d` could collide with one you had not read. There are no minified names left and `no-shadow` catches the collision, so name new things in plain Spanish (a hook still starts with `use`). Leave the existing `sdc` names alone: renaming them is churn with no bug behind it.

**Every name is a real word now.** 95 top-level names of logic and data were renamed scope-aware across all modules (977 identifiers), refusing any new name already declared in any scope of a file, and checked by renaming back and comparing ASTs. The production bundle came out **byte-identical** — same content hash — because the minifier shortens every name again, which is the proof that nothing changed but the source. Commits and notes from before use the old names:

`M` clonar · `K` guardarPartida · `p5` leerPartida · `n5` crearPartida · `Ea` subirNiveles · `ei` cargarPartida · `o5` nivelDesdeXp · `i5` registrarRutina · `s5` deshacerRegistroBase · `u5` usarDescanso · `c5` registrarEstiramiento · `r5` completarTravesia · `d5` cruzarUmbralBase · `yd` sumarTramo · `f5` descartarTramos · `hy` consolidarKm · `qn` modalidadesDe · `Md` modalidadDelDia · `$2` tablaEjercicios · `yy` baseClase · `_d` ejercicioDe · `gy` pruebaUmbral · `Nd` enfoques · `R2` rachaBonoSalud · `qd` metaSemanalDefecto · `Dl` anotarDia · `_n` metaSemanal · `qy` diasRestantesSemana · `Od` enfoqueDe · `e5` mejoraMinimaZ · `a5` diasParaBajarZ · `Oy` metaDelDia · `jd` volumen · `t5` multEnfoque · `li` costoNivel · `jy` xpTotal · `__fechaLocal` fechaLocal · `ue` fechaHoy · `By` inicioSemana · `vy` bandasCalibre · `iu` puntajePrueba · `wy` bandaCalibre · `Uy` claseCalibre · `l5` guardarPrueba · `kl` nombreEjercicio · `$s` alternativaEjercicio · `Ey` tienda · `Ay` dominioInicial · `Ka` multImpulso · `Sd` sesionesPrimalHoy · `M2` comprar · `$e` sistemas · `My` rangoAlcanza · `ye` sistemaActivo · `yt` sistemaAbierto · `_y` avisarSistemasNuevos · `py` categoriasLogros · `Z2` ordenDificultad · `Jo` logros · `da` revisarLogros · `K2` cargaDelDia · `V2` nivelCarga · `ni` avisoCarga · `Q2` ultimos60Dias · `ve` rangos · `au` nivelUmbral · `Cl` colorRango · `zl` nombresRango · `W2` factorRango · `J2` descRango · `by` ejerciciosPeso · `ra` modalidades · `F2` ejerciciosGym · `P2` ejerciciosFlow · `j2` guia · `El` habilidades · `L2` marcarPasoHabilidad · `H2` alarmas · `X2` reglaDolor · `Dy` cuidadoArticular · `Pt` estiramientos · `pt` nodosExplorar · `Po` sectores · `ay` escalaCaminante · `ai` travesiaDelDia · `Oa` movimientosPrimal · `Js` regresiones · `Dd` hashDia · `hd` repsCombate · `uy` repsCombateSuave · `ti` golpesNecesarios · `x2` perderVida · `Fo` gruposCuerpo · `Rs` colorProgreso · `x5` diasConstancia · `Ie` pitido

`ue` became `fechaHoy`, not `hoy`, because `sdcDiaPasado` has a local `hoy` that would have shadowed it; the rename tool refuses exactly that.

The components got PascalCase names in a second pass (368 identifiers, bundle again byte-identical), because JSX reads a lowercase tag as an HTML element: `B5` App · `w5` Raiz · `j5` Inicio · `Is` FilaEjercicio · `g5` FiguraCuerpo · `v5` PanelZonas · `h5` LeyendaConstancia · `S5` GrillaConstancia · `C5` DetalleDia · `ge` Plegable · `Q` Tarjeta · `qa` BarraXp · `b5` Avisos · `D5` Metronomo · `T5` BarraDescanso · `Ly` PruebaAptitud · `M5` Reaccion · `_5` Secuencia · `q5` TareaDual · `O5` Ritmo · `gd` MaquinaEscribir · `z5` Bienvenida · `Qo` BotonSistema · `Cd` DibujoMascota · `sdcCara` Cara · `sdcCaras` Caras · `sdcAnimoAntes/Ahora/Despues` AnimoAntes/Ahora/Despues · `sdcCalorCard` Calentamiento · `sdcPasoVista` PasoGuiado · `sdcTravCrono` CronoTravesia · `sdcCamCrono` CronoCaminata · `Ae` Icono, and the twenty icons by what they draw (`Ph` IconoLlama, `Vs` IconoTrofeo, `Mn` IconoCheck, `zd` IconoCerrar, `Vo` IconoEspadas…).

`App`'s own variables — its props, state, derived values and handlers, 186 of them (1.386 identifiers) — got names in a third pass, with the same tool extended to JSX (`acorn-jsx`, and `<Foo>` tags resolved against scope by hand, since `eslint-scope` does not see them). The bundle was **not** byte-identical this time, and the reason is Prettier, not the rename: longer names re-wrapped some JSX text, so `" / "` became `" /"` + `" "`. Compared with adjacent text children merged, the two bundles are identical, and the DOM on six screens matches the published build. The ones you will meet:

`e` player · `a` setPlayer · `o` avisar · `n` avisos · `Ne` aplicar · `s` profile · `u` progress · `c` today · `r` week · `H` ui · `B` modalidad · `J` metaDia · `[Aa, Va]` metaSesion · `[De, On]` modo · `[Da, $t]` pestana · `me` plegado · `fe` alternarPlegable · `af` plegablesTodos · `tf` todoPlegado · `pg` registrar · `hg` deshacerRegistro · `yg` cruzarUmbral · `bg` tomarDescanso · `mmNueva` unchanged · `Rt` repsHoy · `Re` metaSemana · `ag` descansoBase · `ja` estirando · `fa` estSegundos · `du`/`fu`/`xt` combPrep/combVentana/combSegundos · `Qa`/`jl`/`Qd`/`pu` primalFase/primalSegundos/primalRonda/primalMov · `ci` repruebaEjercicios · `Se` panelPruebas · `Og` forzarUmbral

The last 79 top-level names — the internals of combat, Primal, exploration, joint care and the neuromotor drills, attributes, skills — got names in a fourth pass (431 identifiers in 21 files), with one tool that does both jobs of the earlier two: across modules like the first, and aware of JSX tags and shorthand properties like the third. It refuses a new name that already exists in any scope of a file it touches (it caught `guardarPuntoRetorno`, already `App`'s button handler, so the storage function is `escribirPuntoRetorno`), and checks every file by renaming back. The bundle equals the published one with adjacent text children merged, and the 41 screens plus the save after each one match. One test read `J.cy` and moved to `J.descansoPrimal`. Three components nothing rendered (`IconoLuna`, `IconoCalavera` — leftovers from the Solo Leveling lexicon — and `BotonSistema`) and two constants nothing read (`E5`/`A5`, the fitness test's old 2 s/1 s cadence) were deleted; the bundle did not change, because the build was already dropping them.

`ty` terrenosComunes · `ly` terrenosDificiles · `ny` terrenosJefe · `oy` sufijosTerreno · `iy` nombresTren · `Cy` grupoDeTren · `c2` xpTerrenoBase · `r2` multXpJefe · `d2` victoriasConXp · `za` terreno · `$o` trenesJefe · `f2` xpTerreno · `sy` ejercicioDeTren · `m2` segundosVentana · `p2` segundosVentanaJefe · `Ad` combateInicial · `b2` elegirTren · `y2` reintentarRonda · `g2` ajustarCarga · `v2` cambiarTren · `h2` golpear · `S2` siguienteTerreno · `N2` reintentarSinVidas · `dd` rondasPrimal · `C2` segundosPrimalPorRango · `Ws` segundosRondaPrimal · `Ty` xpCuidado · `Y2` registrarCuidado · `fy` senalesReaccion · `my` movimientosSecuencia · `md` sostenesDual · `pd` tareasMentales · `bd` patronesCruzados · `G2` xpNeuromotor · `Fs` bpmRitmo · `Al` neuroInicial · `Ps` registrarNeuromotor · `cy` descansoPrimal · `k2` sesionesPrimalBase · `xd` vecesParaDominar · `z2` xpPrimal · `ky` primalInicial · `E2` registrarPrimal · `ou` consejos · `A2` consejoDelDia · `D2` frasesVolver · `T2` frasesDiaDificil · `zy` fraseMascota · `l2` caminanteDe · `n2` xpPorKm · `Ny` bonoReliquia · `o2` multReliquias · `i2` inicioSector · `s2` sectorDeKm · `u2` probTravesia · `Ed` xpTravesia · `Io` listaAtributos · `tu` valorAtributo · `Ro` nivelAtributo · `q2` progresoAtributo · `O2` nivelesZonas · `ry` atributosDeZona · `B2` xpPasoHabilidad · `w2` xpHabilidad · `dy` pdHabilidad · `Td` pasosHabilidad · `U2` habilidadCompleta · `Wo` habilidadesCompletas · `Bd` nivelZona · `y5` progresoZona · `wd` diasEntre · `m5` escribirPuntoRetorno · `xy` leerPuntoRetorno · `kd` velocidadesReaccion · `eu` senalesPorPrueba · `bt` coloresEstado · `N5` nombresEstado · `k5` colorDeRango · `vd` metrosPorPaso

**The logic and data layers have no minified names left** (`src/logica/`, `src/datos/`): a fifth pass named the parameters and locals of every function there — 828 variables, 3.627 identifiers, in 162 functions and the two tables that hold functions (the `check` of the 147 achievements and the attribute formulas) — so `registrarRutina(original, modo, repsSesion, modificadorOk, gvol)` reads `partida`, `metaHoy`, `pct`, `xp`, `bono`, and `volumen(rango, clase, enfoque, modalidad, prueba)` reads like its formula. What is left short there is a deliberate abbreviation (`xp`, `km`, `pd`, `db`, `ej`). The tool renames inside a function, nested scopes included (keys `"h"` or `"h@471"` for one declared on that line), and refuses unless three things hold: no new name already exists in the function or at module level, **every reference in the file resolves to the same declaration as before** (a map that makes an inner arrow shadow an outer variable is rejected — tried on purpose), and renaming back gives the same AST. Every file came out with a **byte-identical bundle**. One dead value surfaced and went: `y` in `registrarRutina`, a count of the groups that met the target, which nothing read. `repsCombate` and `repsCombateSuave` take the train and the focus in opposite orders — `(rango, clase, tren, enfoque, …)` against `(rango, clase, enfoque, tren, …)` — which looked like a bug under one-letter names; every caller respects both orders, and now it is visible.

**The UI has no minified names left either** (`src/ui/`). A sixth pass named the props, state, handlers and closures of every file there, `App`'s 332 inner variables (1.062 identifiers) among them: of 1.217 variables of one or two letters, 67 remain, and every one is a word or a deliberate abbreviation (`i`, `j`, `id`, `ui`, `on`, `ok`, `kg`, `km`, `xp`, `ms`, `hz`, `db`, `ej`). The same tool now also renames `<X/>` tags that name a variable, and refuses a new name that would start lowercase there; when a new name equals its key it writes `{ children }` rather than `{ children: children }`. The bundle stayed the same file after file, with two kinds of noise that are not changes: Prettier re-wrapping JSX text (compared with adjacent text children merged), and once the minifier folding `"1px solid " + acento` into one string — `acento` is the constant `"#ff8f5a"` — which it had not done before; with that same fold applied to the published bundle (it finds exactly two), the two are identical. Every batch was also checked on the 41 screens plus the save after each one, and two new walk-throughs were played on both builds: the whole onboarding (the timed fitness test and the typed numbers, an invalid backup, Atrás) and the whole warm-up (the first-step wait, pause, Ya estoy, the ensayo taps, the XP), identical down to the stored save.

Then the props that still carried minified names were renamed on both sides, in the destructuring and in every tag: `st`/`Ne` → `player`/`aplicar` on `AnimoAntes`, `AnimoAhora`, `AnimoDespues` and `Calentamiento`, and `ls`/`p`/`cab`/`col`/`esp`/`pz` → `lista`/`paso`/`cabecera`/`acento`/`esperando`/`pausado` on `PasoGuiado`. The script refuses a component that receives a spread, is used outside JSX or collects `...rest`. Prop names are object keys, so this is the one step that grew the bundle (159 bytes); the 41 screens, the warm-up and the e2e tests match.

**Each tab is its own component, and it reads `App`'s variables as props.** `App` was 5.940 lines with every tab inline as `{pestana === "x" && …}`; each block moved verbatim into `src/ui/pestanas/` (Logros 5 props, Combate 19, Explorar 22, Primal 24, Perfil 41, Entreno 95, and the test panel 18), taking with it the imports only it used. Entreno was then split the same way, one level down: the routine card (47 props), stretching, Constancia, Tu cuerpo, the travesía and the Umbral each became a `Tarjeta…` component in `pestanas/entreno/`, and `entreno.jsx` went from 1.484 lines to 448 — checked with the same comparison, now 41 screens plus the stored save after each one, the Umbral card included. A block written as an IIFE, `(() => { let f = …; return …; })()`, became the component's body as is. The move was done by a script that refuses when a block writes one of `App`'s variables, when any of those variables is reassigned anywhere, or when the block calls a hook or uses `this` or `arguments` — the conditions under which a prop holds exactly what the closure used to read. Checked by comparing `#root`'s HTML against the published build on 38 screens (≈1,3 MB): every tab with every system unlocked, again with every card expanded, and combat, Primal, stretching, a travesía and the test panel in motion with the clock stopped (`page.clock`). The bundle grew 6,7 KB (613,9 → 620,6), because prop names are object keys and the minifier leaves those alone.

Two things follow. **A tab that needs another value from `App` needs it passed**: add it to the `<PestanaX …/>` in `App` and to the component's destructuring, or it is `undefined` there. And **do not reassign a variable of `App` that a tab reads** — the tab got its value at render time, so a later `x = …` inside a handler would no longer reach it. The `v1.0` button that opens the test panel stayed in `App`, because it writes `sdcDevN`, and a module cannot assign to an import.

**Entreno receives one bundle per card, not 95 props.** 73 of its 95 props were never read by `PestanaEntreno` itself — each went to exactly one card and nowhere else, so adding a value to the routine card meant touching four places (the attribute in `App`, Entreno's destructuring, the attribute on `<TarjetaRutina>`, the card's destructuring), and forgetting the middle two left it silently `undefined`. Now `App` passes `propsRutina` (33), `propsCuerpo` (15), `propsEstiramiento` (12), `propsConstancia` (8), `propsTravesia` (3) and `propsUmbral` (2) as object literals, and Entreno spreads each one onto its card (`<TarjetaRutina {...propsRutina} …/>`); it destructures only the 22 values it reads or shares between cards, plus the six bundles. The cards did not change. **A value only one Entreno card needs goes into that card's bundle in `App` and into the card's destructuring — two places.** A value two cards share, or one Entreno itself reads, is still a plain prop. The move was done by a script that checked, before writing, that every card receives exactly the same set of names as before and that `App` still sends exactly what Entreno used to receive; the 41 screens and the save after each one match the published build, and the bundle got 2 KB smaller, since the names are no longer repeated as JSX attribute keys.

**Check what a search actually matched before "fixing" it, in both directions.** An audit once flagged `coger` three times as peninsular Spanish; all three were `encoger`. But the same audit declared `el movil` a false positive, and it was real: the neuromotor section said `deja el movil apoyado`. The app speaks **voseo rioplatense** in the game's voice; only the medical text and the exercise-execution register stay in neutral Spanish (see **Voice**).

**Prefer not moving blocks.** To reorder cards, set `order` on the one that must move inside the flex column — that is how "Rutina de hoy" and the warm-up are pinned in Entreno. In JSX, moving an element is moving its tag, but the surrounding `{cond && …}` and `order` usually do the job with less risk.

## How the source came back

Until the tag **`v1-html`** there was no source code: the app had begun as a Claude Artifact, and `index.html` was a 643 KB single line with React compiled inside, edited in place with count-verified perl substitutions. `git checkout v1-html` still gets that shape back, and `dominio-corporal-v1-html.zip` next to the repo folder is a copy of it.

The extraction was proven, not assumed. The game code became an ES module, which runs in strict mode, and a scope analysis found no undeclared assignment and no `this`, so nothing could change meaning. The formatted file (Prettier, plus `\xE1`-style escapes rewritten as UTF-8 in string literals only) parsed to **the same AST** as the bundle, once quoted and bare object keys were treated as equal; the same flow on the old and new builds left the same save, except the day's travesía, which `travesiaDelDia()` draws with `Math.random()`. For the weeks when both versions coexisted, `src/juego.js` was regenerated from `main` by a script that refused to write unless that AST equality held.

What the move turned up, all fixed: `marcarPasoHabilidad`, `alternarTodo` and `alternarPlegable` (then `kg` and `fe`) backfilled `care` with a `t` declared nowhere (a `ReferenceError` for any save without `care`); undo inflated the month and modality counters (see **Undo has to undo everything the session wrote**); and the service worker could not serve the separate bundle offline (see **The service worker**).

## UI details that bite

### The metronome

`Metronomo({active, tempo})` is the tempo guide above the four exercise rows. It cycles BAJA → PAUSA → SUBE and counts nothing: it never sees your target, your sets or the rest timer.

**Each phase has its own sound, and the pause sounds like neither of the other two.** `sdcSonidoFase(phase)` in `prueba.jsx` plays a tone gliding down (1047 → 698 Hz) for BAJA, the same glide upwards for SUBE, and a dry double tick — two 45 ms triangle-wave clicks at 1568 Hz — for PAUSA. They used to be three sine beeps of the same length at 440, 560 and 660 Hz, the pause sitting between the other two, and a player reported losing control at the turn because the pause could not be told apart. The fitness test calls the same function, so its cadence sounds the same; its counting did not change. `pitido(hz, ms, hasta, tipo)` gained the glide and the waveform for this, and with two arguments it is still the old beep.

Its default is 2s/1s/2s, but `sdcTempoMod(modifier)` overrides that from the day’s modifier text, because otherwise the screen contradicted itself — on a **Tempo** day the modifier said "baja en 3 segundos" while the metronome insisted on 2, and following one broke the other. It reads `/baja(?: el peso)? en (\d+) segundos?/i` and doubles both movement phases on "mitad de velocidad". Three of the eighteen modifiers adjust: Tempo (bodyweight and gym) to 3/1/2 and flow’s Control to 4/1/4. **If you reword a modifier, re-check that regex** — "Drop set" says *baja el peso* and "Carga alta" says *baja las repeticiones*, and both must keep falling through to the default.

The fitness test used to run a **different** cadence (2s down, 1s up, no pause: 3s per rep against the metronome’s 5s), so the test measured more reps than a player could then do at routine tempo — reported as "me da muchas sentadillas". It now runs the metronome's own 2/1/2 (see **Fitness test and calibre**).

### Holds have their own clock

One global metronome sits above the four exercises, and on a hold (a plank, a hollow, a hang) an up/down cycle means nothing. So a row whose exercise is measured in seconds (`sdcSegs(alt) > 0`) shows **"Sostener N s"** under its set chips, N being the pending set's reps × seconds per rep — so the − / + on that chip is how the player sets the time. The clock follows the guided-timer rules: **10 s "Ponete en posición"** (`sdcSostenPrep`, skippable with "Ya estoy →" or cancelled), then the hold, with the Primal sounds — 3-2-1 ticks before the start and before the end, the start note and the two falling notes of a finished round. **Pausa** freezes it. At zero the set is marked by itself (`onSet`), which starts the rest like a tap would. **"Terminé antes"** records what was held: `floor(seconds / segs)` reps, at least 1 or nothing.

The state is component state in `FilaEjercicio` (`reloj = {ini, pz, prep, total, serie}`), timed from `Date.now()` through the pure `sdcSostenEstado(ini, pausa, prep, total, ahora)` in `series.js` (tested in `tests/series.test.js`); a hold is under a minute, so a reload simply drops it. `TarjetaRutina` keeps which group is holding: only one hold runs at a time, **the metronome goes quiet** while it does (`active={metronomoOn && !sosten}`), and starting a hold ends the rest bar.

**One trap, and it is why "Terminé antes" takes two renders.** Marking a shorter set means two App handlers, `sdcAjustar` (the reps) and `sdcSerie` (the mark). They used to write the day's marks memo whole, from *their own render's* copy of the other one's state, so called in the same tap the second put back the first one's stale value — the adjusted reps were lost from the save. That is fixed at the root now (`cambiarMarca`, see **Sets**), but the row still calls `onAj` first, keeps `marcarLuego` and calls `onSerie` in an effect once the new `aj` prop has come back, so the floating "+N" and the rest length use the corrected reps. `e2e/sonidos.spec.js` checks both paths, tones and save included.

### The body diagram

`FiguraCuerpo({view, colors, glow, ratios, selected, onSelect})` draws the figure in "Tu cuerpo". It used to be six rounded rectangles; it is now an angular anatomical figure built from paths, but **the contract is unchanged** and must stay that way: `viewBox "0 0 200 300"`, the same four groups (`squat`, `pushup`, `back`, `abs`), and every interactive part spreading `propsDe(grupo)` so it gets its fill from `colorProgreso(ratio)` — a ramp from `rgb(42,49,72)` to `#ff6b4a` — plus the white stroke when selected and `sdcPulse` at 100%.

Three local helpers keep it readable: `sdcPar(trazo, grupo)` draws a path and its mirror (`translate(200,0) scale(-1,1)`, so x becomes 200-x), `sdcSim(trazo, grupo)` draws a part that is already symmetric and must not be doubled, and `sdcIne(trazo, doble)` draws inert anatomy. Parts that the game does not measure separately are folded in rather than given their own colour: forearms and hands go with `pushup`, calves with `squat`, and neck, hips, knees and feet stay inert. **Do not colour a part as its own group unless the game actually tracks it** — the figure would be claiming to measure something it does not.

### Legible from 13 to past 70

The audience runs from 13 to over 70, and it was measured before anything moved: across the 41 screens, **61,5% of all characters were 12 px** and 31% were 14; 107 different tap targets were under 44 px; the locked grey `#5a6178` read at 3,1:1; disabled buttons at 2:1, so a disabled "Marcá las series para golpear" was an instruction nobody could read. The rule now, checked on every tab at 375 and 320 px by `e2e/legibilidad.spec.js`:

- **No text under 14 px; primary text at 16.** `.text-xs` is 14 px (it was 12) and `.text-sm` 16 (it was 14), which moved most of the app at once; the five inline sizes under 14 went to 14–15.
- **Every button and input at least 44 × 44**, from one rule in the head `<style>` (`min-height`/`min-width` on `button`, `min-height` on inputs). The Constancia day squares opt out of the width (`minWidth: 0`) — seven 44 px squares do not fit a 320 px phone — and are 40 tall. An `<input>` with `flex: 1` needs `minWidth: 0` or it refuses to shrink and pushes its button off the screen.
- **Contrast 4,5:1, locked things included.** A locked achievement or movement tells you what is missing, so it has to be read: `#7a83a0` and the text uses of `#5a6178` became `#8a93ad` (5,8:1 on a card); `#5a6178` survives only as a card border. Violet text and violet buttons with dark text moved from `#7c5cff` (4,1:1) to `#9278ff`. Disabled buttons are `opacity .6` (was .3/.4), about 3:1: visibly off, still legible. The locked Primal movements drop that opacity, since the lock and the grey already say it.
- **Always-visible text is one or two sentences.** Eleven card intros were cut (for example stretching's 264 characters to 99); the explaining lives in the guide.

The one deliberate exception is `v1.0`, the hidden door to the test panel. The exercise row had to change shape for the bigger text: the stepper wraps under the name when the row is narrow (`flexWrap` with the name at `flex: "1 1 130px"`), and "¿Cómo se hace?" drops to its own line rather than breaking "Meta: 12 reps" in two. `button` also carries `touch-action:manipulation`, which drops the 300 ms double-tap-zoom delay.

### Fonts

**The app makes zero network requests after it loads.** Chakra Petch (400/500/600/700) and Inter (one variable file, 100–900) live in `fuentes/` and are declared with `@font-face` at the top of the head `<style>`, latin subset only — which covers every accent and `¿¡` Spanish needs. They used to come from Google Fonts, twice: a `<link>` in `<head>` and an `@import` React injected in `Raiz`.

Self-hosting was not only about speed. A request to `fonts.googleapis.com` hands Google the user's IP, which a privacy policy has to declare; now `privacidad.html` can say "ninguna" and mean it. If you ever add a CDN, a web font or an analytics tag, **section 4 of `privacidad.html` becomes false** and has to be updated in the same commit.

### Styling constraint

The CSS at the top of `index.html` is a small hand-written subset that *looks* like Tailwind but is not. Only the classes defined there exist — `justify-end`, for example, does **not**, and silently does nothing. `text-xs` is 14 px and `text-sm` 16 (see **Legible from 13 to past 70**), and `button`/`input` carry a 44 px minimum there, so an inline `minHeight` below 44 is a mistake. Check the `<style>` block before using a utility class, or use an inline `style` object.

## Running locally

`npm run dev` for work, `npm run build && npm run preview` to see exactly what gets published (the service worker only exists in the build). `.claude/launch.json` has both for `preview_start`: `dominio-corporal` (5173) and `dominio-corporal-build` (4173). Node 24 is installed; Python is not (`python` is the Microsoft Store stub). `localhost` is not reachable from a phone on the LAN — to test on a real device, deploy.

Testing notes that save time:
- **15–20 s pass before the first button appears, but only ~5 s of that is the typewriter** (140 characters at 28–40 ms). The rest is parsing the ~620 KB bundle. Wait for it; do not assume a blank page is a crash.
- Driving the app by clicking a `ref` is unreliable here: refs resolve to stale coordinates when the page scrolls between the `find` and the click, and a miss can silently hit "Usar mi día de descanso" and burn the day. Prefer `javascript_tool` to click by text when scripting a test run.
- `page.clock.runFor(n)` only fires timers that already exist, and every countdown here schedules its next tick after React re-renders, so one long jump advances a single step. Advance 100 ms at a time with a short real wait, as `e2e/sonidos.spec.js` does.
- Reuse a **fresh browser tab** to read console errors. The console buffer persists across navigations, so a fixed error keeps reappearing.
- Clear `localStorage`, unregister the service worker and delete caches between runs, otherwise you test a stale bundle.
- "Saltar y empezar con valores por defecto" skips onboarding, but only activates the bodyweight modality.
- `get_page_text` returns DOM order, not visual order — it will not reflect flexbox `order`. Use a screenshot.
- The Perfil tab still has the **Panel de pruebas** for jumping ranks and forcing ascension without training, but it no longer announces itself: the entry point is a dim `v1.0` at the bottom of Perfil that opens it after **five taps** (`sdcDevN`). Sixteen destructive actions, one of them `Desbloquear todos los logros`, should not be one tap away from a curious player.

### The first paint, the first card, and the day you forgot

Three things that a distracted person feels and a developer never does, all measured before being touched.

**`index.html` now paints something at ~170 ms.** The HTML arrives in 42 ms and `domInteractive` is ~170 ms, but the app's first button took **4.4 s on a fast desktop** — realistically 8–12 s on a mid-range phone — because ~500 KB of React and game code has to parse. The build step now makes that a separate, cacheable file. **Loading the other tabs on demand was tried and reverted:** with `lazy()` and `Suspense`, Combate, Primal, Explorar, Logros, Perfil and the test panel came to ~70 KB of the 620, because what weighs is React and the data tables Entreno needs anyway, and a returning player saw "Rutina de hoy" at the same moment — median 1.10 s before and 1.12 s after, 7 cold loads each at 4× CPU throttling, both builds served from the same machine. Measure before retrying it. Meanwhile `<body>` now opens with `#sdcSplash`: a fixed overlay with the product name, **Hola de nuevo, <name>** and **Nivel N** read straight from `localStorage`, and a sliding bar, removed by a `MutationObserver` on `#root` when React mounts (plus a 25 s failsafe). The same seconds, but the app looks alive instead of broken. **A returning player keeps it at least 2,5 s** from the moment the page starts: once the bundle is cached the app mounts in about 0,1 s, and the greeting went by before anyone could read it (reported). Measured on the build: mounted at ~0,1 s, gone at ~2,8 s with the fade; a tap anywhere removes it as soon as the app is mounted (~0,4 s), and a new player, who has no greeting, is not held at all. The text is 18 px for the name of the app, 22 px for the greeting and 17 px for the level.

> Two traps here. The script has to sit **after** `<div id="root">` or `getElementById('root')` returns null and the splash never leaves — which is exactly what happened first. And `raw.charAt(0)==='{'` put a lone `{` inside a string and broke the `{}` delta check for every future session; the try/catch around `JSON.parse` already covered that case, so the test was dropped.

**"Rutina de hoy" starts at y=478 instead of y=1222.** The body map was pinned above it (`order:-2` against the routine's `-1`), which is right the day you discover the app and a scroll-and-a-half tax every day after. The routine is now `order:-4` and the map is `today.completed ? -4 : -2`, so the map returns to the top once you have trained — there it is a reward, not an obstacle.

**A day you forgot can be logged.** Tapping an `empty`, `skipped` or `missed` square in Constancia offers *"Entrené este día y me olvidé de anotarlo"*, behind a confirm step. `sdcDiaPasado` writes `history[f]="partial"`, marks `dayLog[f].acts` as `"Anotado después"`, adds the date to `week.sessionDates` when it falls inside the current week, and **gives no XP** — there is no way to know how many reps you did, and the notice says so. `sdcRachaCalc` then walks back from today through `history` counting `full`/`partial` (with `rest`/`shield` preserving but not adding) and the result is applied **only if it raises** `streak.current`. A retro-log can never shorten a streak, which is what makes it safe to get wrong.

## Deploying

`git push` to `main` is the deploy. `.github/workflows/publicar.yml` runs `npm ci`, `npm run lint`, `npm test` and `npm run build`, and publishes `dist/` to GitHub Pages at **https://santiagoarague.github.io/dominio-corporal/** — about two minutes after the push. **If the linter or a test fails, nothing is published** and the previous version stays online. Pages is set to *GitHub Actions* as its source (`build_type: workflow`); until the switch it served the repo root of `main` as is, which today would publish the raw Vite source and break the site, so do not switch it back without restoring a built `index.html` to the root. `gh run watch` follows a deploy; `gh workflow run publicar.yml` re-runs one.

Only `dist/` is published now, so `CLAUDE.md`, `PENDIENTES.md` and `diseno/` are no longer served to the world as they were under the old setup. The flip side: a future `.well-known/assetlinks.json` has to go in `public/`, and check that it actually reaches the site, because the Pages artifact may leave dotfiles out.

Netlify was dropped: it silently stopped deploying and sat five commits behind while every push reported success. `netlify.toml` has been deleted. The repo had to be made **public**, because Pages on a private repo requires a paid plan. The old Netlify site (`glittering-snickerdoodle-2b7928.netlify.app`) was deleted by hand on 2026-09-25, with its team; the address now answers Netlify's "site not found".

Always confirm the change actually reached production rather than trusting the push:

```bash
until curl -s "https://santiagoarague.github.io/dominio-corporal/" | grep -q '<marcador>'; do sleep 10; done
```

Note for packaging: the app lives in a **subdirectory**, so `assetlinks.json` cannot sit at the domain root. A TWA will need the repo renamed to `santiagoarague.github.io` or a custom domain.

## The service worker

`src/sw.js` is network-first, so with a connection the player always sees the latest deploy and without one they get the last copy. It is a template: the build names the cache after a hash of the bundle's file names (`activate` deletes every other cache, so there is nothing to bump by hand) and adds the hashed files to the precache list. Four things about it are load-bearing:

**The HTML is fetched with `cache: 'reload'`.** Without it, network-first was a lie: the service worker's own `fetch()` goes through the browser's HTTP cache, GitHub Pages sends `max-age=600`, and the worker cheerfully served — and then re-cached — a copy up to ten minutes old. Measured in production: the plain fetch returned 470,323 bytes (the previous deploy) while `cache: 'reload'` returned 470,860 (the one just pushed). This is exactly the "why can't I see my changes on my phone" symptom. Only documents get this treatment; the bundle has a hash in its name and fonts and icons do not change.

**Only same-origin 200s are cached.** It used to cache any response, so a 404 or a 500 became the stored offline copy.

**Offline lookups use `ignoreVary`.** With the game in its own file, an offline reload came up stuck on the splash: `vite preview` sends `Vary: Origin`, the module script and the fonts are CORS requests, and the copies `cache.addAll` stored without an `Origin` header did not match. GitHub Pages sends `Vary: Accept-Encoding` and would probably have been fine, but offline must not depend on a server header.

**`index.html` is the fallback for documents only.** It used to be the answer to *any* miss, so the missing script above was answered with HTML and the browser refused it with a MIME error. Anything else that is not cached now fails as a network error.

If the app seems frozen on an old version, unregister the worker and delete caches rather than assuming the deploy failed — but check production with `curl` first, because that distinction is the whole reason Netlify went unnoticed for five commits. Playwright's `context.setOffline` does not reach the worker in Edge, so the e2e test simulates an outage with `context.route("**/*", abort)`.

## Architecture


### State and persistence

One plain object holds everything, deep-cloned with `clonar(e)` before mutation and saved with `guardarPartida(e)`. **The save happens in one place:** an effect in `Raiz` calls `guardarPartida(player)` every time the player object changes, and nothing else calls it. App, the onboarding and a restored backup only hand `Raiz` a new object; restarting sets it to `null`, which is never written. It used to be 50 calls scattered through `App` and `Raiz`, each inside the updater passed to `setPlayer` — a side effect React is allowed to run twice, and one more line every new handler had to remember. Before they were removed a script checked that every one of them saved exactly the object its updater returned, and that the only `setPlayer` without one was the restart; then the same route was played on the published build and the new one and the stored save compared after every step (40 screens, identical), plus restoring a backup, restarting and starting again. **The consequence to keep in mind: a change is saved only if it produces a new object.** Return `clonar(d)` from the updater, as every handler does; mutating the current object in place would neither re-render nor save. Key branches: `profile` (name, modalities, classification, focusProfile, weeklyGoal), `progress` (rank, level, currentXP), `today`, `week`, `month`, `streak`, `dominion`, `missions`, `lifetimeReps`, `lastTrained`, `history`, `dayLog`, `ui`.

`cargarPartida(state)` is the load/migration path: it backfills missing fields, rolls the day and week over, and ends by calling `misRevisar` then `subirNiveles`. **Any new state field needs a default here**, or old saves crash. Existing saves in the wild predate every field added recently.

### The two functions that matter

`registrarRutina(state, mode, reps)` records a completed routine: accumulates reps into lifetime/week/month, updates records and `lastTrained`, awards Dominion Points, applies the streak and history bookkeeping, computes XP, then runs `misRevisar` → `subirNiveles` → `revisarLogros` (achievements) → `avisoCarga` (training-load warning).

`subirNiveles(state, notices)` is the level-up loop: while `currentXP >= costoNivel(level)` it levels up; when `level >= nivelUmbral[rank]` it flags an Umbral instead. `costoNivel(e)` is the XP cost curve: `e<50 ? 45+3e : 5e-55`. The two branches used to be `45+3e` and `125+5e`, which met badly — `costoNivel(49)` was 192 and `costoNivel(50)` was **375**, a 95% jump inside one level. The second branch was rebased so the curve is continuous at 50 while keeping the steeper slope. `costoNivel(1)` is still 48, and it has to stay there. Because XP only converts to levels inside `subirNiveles`, **anything that grants XP must be followed by `subirNiveles`**, and `cargarPartida` calls it on load so curve changes apply retroactively.

### Multi-session days

A day can hold one routine per modality. `today.doneModalities` lists the ones finished; the second and third sessions get +25% and +50% XP. Day-level bookkeeping — streak, `week.trained`, `week.fullDays`, `history`, the low-effort penalty and Dominion Points — must fire **only on the first session**, gated on that array being empty. `anotarDia()` is already idempotent per day for the streak, but the rest is not.

**`today.reps` is the *session*, `dayLog[date].reps` is the *day*, and anything showing "hoy" has to read the second one.** `registrarRutina` **assigns** `o.today.reps = l` and `mmNueva` zeroes it to open the next session, while `dayLog[date].reps` accumulates. The body map's Hoy view read `today.reps`, so after a bodyweight session followed by a flow one it showed 24 · 19 · 22 · 24 — only flow — while the very same card's XP line read 264, the sum of both. `sdcHoyReps(state)` returns the day total (`dayLog` first, `today.reps` as the fallback for a day whose log entry does not exist yet).

The denominator had the same shape of problem, so `dayLog[date].meta` now accumulates each session's target the same way its reps do. It is written by **`sdcMetaHook`, wrapped around `sdcPrimerasHook` in `registrar()`** — `registrarRutina` stays byte-for-byte unchanged, same as the Primeras veces hook — and read through `sdcHoyMeta(state, fallback)`, which falls back to the current routine's target for saves that predate the field.

While a session is unregistered, both numbers add the live part: `sdcRepsHechas()` for the reps and `metaDia` for the target, gated on `today.completed || doneModalities.includes(modalidad)` so a registered session is never counted twice. The result is that Hoy finally means what its caption says:

```
antes de entrenar          0/33    (era 33/33 — pintaba el cuerpo entero al 100%)
una serie marcada         13/33
sesión 1 registrada       33/33
empieza la 2ª modalidad   33/57    (el denominador crece, el numerador se conserva)
ambas registradas         57/57    (era 24/24)
```

`PanelZonas`, the zone panel, takes the same two numbers, so "Hoy: 57 / 57 reps" agrees with the row above it. Undo restores `dayLog` from the snapshot, `meta` included, so it rolls back with everything else — verified.

### Undo has to undo everything the session wrote

`deshacerRegistroBase` rolled back XP, level, PD, lifetime and weekly reps, records, history and streak, but **not** `month.reps`, the three modality counters (`week.modalities`, `month.modalities`, `lifetimeModalities`) or the achievements the session unlocked. Found by the test suite on the `modernizacion` branch: three register → undo cycles left the month at 36 squats for 12 done, the modality count at 3 for one session, and — because `deshacerRegistroBase` subtracted the achievements' PD while the achievements stayed unlocked — re-registering paid 3 PD instead of 5. Monthly missions read `month.reps` and nine achievements read `lifetimeModalities`, so an honest player who undid one mistaken registration was already inflating both.

Both functions stay untouched; the fix wraps them like the other hooks. `registrar()` now ends in `sdcDeshacerHook(f, …)`, which stores the pre-session `achievements` in `undoSnapshot.ach`, and the undo button calls `sdcDeshacer(f)`, which runs `deshacerRegistroBase` and then subtracts the snapshot's reps from `month.reps`, takes one off each modality counter for `modalidadDelDia(profile, today.date, today.modality)` (the restored `today`, so it is the modality of the session being undone) and restores the achievement list. A snapshot written before this change has no `ach`, and undo then behaves as before for that one day.

### Exercise selection

Rank (`rangos` = E→Z) picks the exercise **variant**; the fitness test picks the **volume**. Tables: `ejerciciosPeso` (bodyweight), `ejerciciosGym` (gym), `ejerciciosFlow` (flow), resolved by `ejercicioDe(group, rank, modality)`, which falls back to `ejerciciosPeso` for a group a table lacks — none does any more: all three cover the four patterns at every rank. `alt` is the grey line at the bottom of "¿Cómo se hace?", and it carries only what `pos`/`mov`/`err` do not say: the way out without the implement ("Sin barra: …"), the reps-to-seconds conversion that `sdcSegs` reads, per-side counting, a difficulty tip. When there is nothing of that, the entry has no `alt` and the row shows nothing — the generic `regresiones` that used to stand in for a missing `alt` are gone. Targets come from `metaDelDia(state)`; the four groups are always `squat`, `pushup`, `back`, `abs`

**A rung can hold one exercise or several.** `ejercicioDe(group, rank, modality, date)` returns a plain entry unchanged, and picks from an array with `hashDia(date|group|rank|modality, n)` — the same hash `sdcModDia` uses. Mixed shapes coexist on purpose, so a table can be widened one modality at a time without touching the other two.

That matters because the routine had **zero** day-to-day variation in the exercise itself: `ejercicioDe` never saw the date, so your rank fixed the four movements and the only thing that changed was one of six modifiers. Rank E runs to level 50, which is **5.880 XP** — about 36 sessions for a player with a strong fitness test and **~85 for a beginner** at ~70 XP a session. Two to seven months of the identical four exercises.

All three tables now carry **three per rung**. Counts today: bodyweight 4×7×3 = 84, gym 4×7×3 = 84, flow 4×7×3 = 84 — **252 exercises**, from 70.

**`ejerciciosFlow` is complete: all four patterns, 84 entries.** The pull table was the hard one and it was built from movements that **genuinely pull**, not from bridges and scorpions dressed up as pulling. Breakdance and capoeira have no vertical pull, so the ladder draws on the three places where this world does pull: **hanging** (passive → active → swing → skin the cat → front lever, the "palanca frontal" in the app, which is core to movement practice and to what LeoMoves teaches), **floor dragging** (arrastre con trapos, de comando, de foca — lat-driven and needs no equipment), and the **macaco**, where you genuinely pull yourself over the planted arm. If you add rungs here, keep that test: it belongs only if the lat or the bicep does the work, because `gruposCuerpo.back` promises "dorsal ancho, trapecio, bíceps" and the body map pays out on that promise.

The flow vocabulary is drawn from the two references the author named — **LeoMoves** (Leandro Fornito: breakdance and acrobatics, animal locomotion, handstands) and **HIIT the Beat** (Peter "Petair" Sowinski, three-time German breakdance champion: HIIT with breaking elements at graded levels) — plus capoeira and breaking fundamentals. The ladders follow the real teaching order: breaking runs toprock → footwork (2-step, 6-step, CC) → freezes (baby → elbow → shoulder) → powermoves (windmill); capoeira runs ginga → negativa → rolê → aú → queda de rins → macaco → bananeira. **Keep that order if you add rungs** — a freeze before footwork is not a difficulty choice, it is a wrong curriculum.

`ejerciciosGym` has no `label` field (only `ejerciciosPeso` does) and its `alt` strings are loading and technique cues rather than equipment-free substitutes, which is right in a gym — but the new ones name a real fallback whenever the machine can be taken or missing ("Sin máquina: fondos entre dos bancos"), because the rotation can land you on a day whose implement is not free.

### The exercise has to teach itself, because there is nowhere to send the player

The app makes zero network requests after it loads and `privacidad.html` says so, so **a link to a video is not available as an answer** — it would hand the player's IP to Google and make section 4 false. Whatever a video would have taught has to be in the text.

It was not. Each of the 252 exercises carried exactly one instruction string, `alt`, and that string was doing three jobs at once: how to execute, what to do without the implement, and how reps convert to seconds. Measured, 56 of the 252 were under 50 characters, and the short ones were not short because the movement is obvious:

```
Plancha lateral      → "Cuenta 1 rep por cada 3 segundos por lado."
Hollow body hold     → "En hollow hold, cuenta 1 rep por cada 3 segundos."
```

The second defines the term with the term. And the only door to any of it was a button labelled **💡 alternativa** — nobody who does not know the movement taps a button called "alternative".

**Three fields, one question each.** All **252** entries — `ejerciciosPeso`, `ejerciciosGym` and `ejerciciosFlow` — carry `pos`, `mov` and `err` beside their `alt`:

| field | the question it answers |
|---|---|
| `pos` | where your body is before rep 1 |
| `mov` | what moves, and where it stops |
| `err` | the one thing that ruins it or hurts you |

`sdcGuia(rank, group, modality)` returns the entry when any of the three is present, `null` otherwise. Nothing falls back any more, but keep that branch: it is what let the three tables be filled one at a time across three deploys, and it is what a new rung gets before anybody writes its guide.

**In the gym the `err` line is the safety line.** A wrong cue on a leg extension is a wasted set; a wrong cue on a barbell squat is a disc. So the gym errors name the failure that hurts and what to do about it — *si la espalda baja se redondea al final, para justo antes: eso es lo que lesiona*, *nunca hagas esto sin seguros: la pausa es justo donde una serie se cae* — rather than a form nicety.

**In flow the `pos` line carries the whole load, because the names teach nothing.** *Macaco*, *queda de rins*, *rolê*, *aú*, *6-step*, *baby freeze* — a player reads those and knows exactly as much as before. So the flow guides never use a term the table has not already placed on the floor: `pos` describes bones and angles (*en cuclillas con una mano en el suelo detrás de la cadera, dedos hacia ti*), and when a position has a name that recurs — bestia, cangrejo, la negativa — it is spelled out the first time it appears at each rung rather than assumed. Same for the breaking vocabulary: the 6-step is *seis pasos en círculo alrededor de las manos*, not "el círculo básico".

The measured cost is the same in all three: the routine card runs about 1120 px closed and about 2000 px with the four panels open, and the `vistos` gate closes them after the first session.

**The grey line was saying it twice, and five words taught nothing.** Measured on all 252 (2026-09-25): the three fields were already short — 13 words each at the median, 4 sentences over 20 words out of 889 — so shortening them would have cut exactly what a first-timer needs. What was long was the `alt` underneath, which in 151 exercises repeated `pos`/`mov`/`err` in other words (*"Rodillas apoyadas, cuerpo recto desde rodilla a hombro"* under a `pos` that says the same). A script dropped every `alt` sentence whose content words were mostly already in the three fields, and never one with "Sin …:", "sobre alfombra", "1 rep = …" or "Cuenta 1 rep"; every removal was read by hand, and 45 entries were left with no `alt` at all. The grey text went from 19.638 to 11.791 characters, and the script refused to write unless all 252 kept the same `sdcSegs` value, the same names and every other field untouched. **An `alt` that holds a conversion must keep it**: `sdcSegs(alt)` is what makes a row a hold (the seconds, the hold clock, `sdcGymFijo`, the warm-up dose). The same pass replaced the jargon a beginner does not know, in the descriptions only: *escápulas* → **omóplatos** (with the gender: *los omóplatos juntos*), *tempo* → **ritmo**, *rango* → **recorrido**, *isquio* → **la parte de atrás del muslo**, and *hollow hold* spelled out. **Names were not touched**, because `gymUlt` and `vistos` are keyed by exercise name: renaming "Remo invertido a tempo" would drop its "La última vez" and reopen its guide as new. A second pass took the rest, in the exercises and in the Skills (`habilidades`) too: *dorsal* → la espalda, *trapecios* → la parte alta de la espalda, *deltoides delanteros* → la parte de adelante de los hombros, *esternón* → el pecho, *cuadrupedia* → a cuatro patas, *colgado muerto* and *agarre falso* spelled out, *anti-rotación* / *anti-extensión*, *compresión*, *unilateral*, *manna*, and the English step names ("Tuck lever", "Beast hold", "Wall walk"). **"Lever" became *palanca***, because a player had never heard it: the Skill is "Palanca frontal" and five exercise names changed with it ("Remo en palanca agrupada", "Palanca frontal agrupada/completa", "Remo en palanca completa", "Skin the cat a palanca frontal"). That is the one exception to not renaming exercises, and it is safe only because all five sit at the sixth and seventh ranks, years into the game: a save that had met them would just see "¿Cómo se hace?" open once more and the Primeras veces question again (`vistos` and `podia` are keyed by name; `gymUlt` does not apply outside the gym). The Skills keep their `id`, and their progress is stored by step position, so renaming a step is free. The Instinto Primal movements and the neuromotor lists lost their English too — "Patinador lateral", "Paso lateral al ritmo", "Rodillas arriba al ritmo", "Burpee con salto lateral", "Bestia quieta", "Cambio por debajo", "Patada cruzada", and in the dual task "A cuatro patas con las rodillas flotando" / "Boca arriba con hombros y piernas despegados" — which is free, because Primal stores progress by position. **The exercise names stay as they are, English included** (decided by the author, 2026-09-25): "Remo Pendlay", "Sentadilla goblet", "Pallof press", "Smith", "deadbug", "bird dog" and the rest are what the movements are called in a gym and in the flow world, the description under "¿Cómo se hace?" already explains each one, and renaming them would need a migration of `gymUlt`, `vistos` and `podia`. Do not propose translating them again. Left on purpose as well: *paralelas* and *paraletas* (equipment), *tríceps* and *cuádriceps* (common words, and the body map names the muscles), the muscle list in `gruposCuerpo`, and the joint-care protocols, which keep their clinical register.

**The register is neutral Spanish**, like every other execution instruction (see **Voice**): `Baja el pecho`, never `Bajá el pecho`. And the panel is **14 px at 1.5 line-height in `#c8d0e4`**, not the shared `text-xs`, for the same reason the guide moved off it: 12 px at 1.0 was never meant for paragraphs.

**Density is paid for by opening it only when it helps.** Four panels cost 860 px — the routine card goes 1117 → 1977 px with all of them open, measured — which is unacceptable every day and exactly right on day one. So `state.vistos[exerciseName]` records that you registered a session containing that exercise, written by **`sdcPrimerasHook`** in the same loop that already resolves the four names (so `registrarRutina` stays untouched, and `sdcVistos` self-defaults to `{}` — the no-migration pattern). `FilaEjercicio` takes `abrir:!sdcVistos(e)[name]` and starts open for a movement you have never done.

The open flag is therefore **tri-state**: `useState(null)` means "follow `abrir`", and a tap writes an explicit `true`/`false`. An effect resets it to `null` on `[label]` so the next exercise gets its own default rather than inheriting your last tap. Verified: open on a new player, closed after registering, open again when a rank change brings a new movement, and the button toggles both ways in either state.

### Holds: `repFactor` has to pay for the seconds

An exercise whose `alt` says "1 rep = 3 segundos" costs three times what a dynamic rep costs, and nothing in `volumen` knows that — the model multiplies `base × factorRango × repFactor` and hands the result to a UI that prints it as seconds. An audit of all 252 variants found the damage concentrated exactly there:

| | was | is |
|---|---|---|
| Longest hold, first set | **60 s of freestanding handstand** | 30 s |
| Gym `Plancha con disco`, total | **120 s** | 54 |
| Gym `Pallof press pesado`, total | **135 s** | 42 |
| Flow `Pino libre`, total | **96 s** | 36 |
| Biggest single set | 24 reps | 20 |
| Flow reps/day (salud) | 141–223 | 94–141 |

Two changes. `sdcModBase.flow` dropped from `{60,55,55,60}` to `{40,36,36,40}` — flow's base was *above* gym's while its reps are slower and half of them are holds. And every hold whose total passed 75 s had its `repFactor` recomputed against a target curve of 60 s at rank E sliding to 30 s at Z, using the **same regex `sdcSegs` uses** so the audit and the UI agree.

**So: when you add a hold, set its `repFactor` from the seconds you want, not from how hard the movement feels.** `rf = target_seconds / (seconds_per_rep × base × factorRango[rank])`.

**Gym reps no longer climb with rank; XP per session did not move.** They used to (117/day at E, 176 at C for salud; the first set of barbell squat was 20, 28 on resistencia and 13 on fuerza, outside the strength range) although the rule is that in the gym the variable is the load. Now `volumen` gives every **dynamic** gym exercise `factorRango.E` and ignores its `repFactor` (`sdcGymFijo`), so each set sits in the focus's range at every rank — fuerza 8/7/5, salud 12/10/8, resistencia 17/14/11 — while the exercise and the suggested load climb. Holds keep the common formula: their reps are seconds and `repFactor` calibrates them. Simply pinning the factor was not enough: the heavy rungs carry `repFactor` < 1, so the top ranks came out at 3/3/2. To keep progression where it was, `registrarRutina` values each gym rep at `sdcGymXp(group, rank)` = `factorRango[rank] × repFactor / factorRango.E`, which makes a full routine pay exactly the old reps — measured with the real functions, XP per session per rank and sessions per rank did not change. `tests/gimnasio.test.js` holds both. Lifetime reps, records and the rep achievements count the real, lower reps. Rank Z still takes its target from records (`metaDelDia`), so it can ask for more than the focus range there.

**Every `alt` that needs an object has to say what to do without it, and 51 of them did not.** The rule was already written for `ejerciciosPeso` — "the `alt` must name a real equipment-free substitute" — but it had only ever been applied to the rungs where the object was in the *name*. An audit of all 252 found the gap in the ones where the object hides in the instruction: `Remo invertido con pausa arriba` says "el pecho pegado a la mesa", `Remo a un brazo con mochila` assumes you own a backpack, and half of `ejerciciosFlow.back` quietly assumes a pull-up bar because only the first rung said `Sin barra`.

Two kinds of missing exit were fixed:

- **The object you may not own.** A towel, two rags, a backpack, a bar, a table, a loading belt, an ab wheel, a cable station, a machine. Each now names a substitute you can reach: a water jug or a pillowcase of books for the backpack, an inverted row under a table for the bar, dumbbells for the cable, a barbell with plates that roll for the ab wheel.
- **The object you own that does not work where you are.** `Arrastre con trapos` and both ab-wheel rollouts need a **floor the rags slide on**; on carpet they do nothing, and nothing said so. Those now open with "sobre alfombra no deslizan" and give the movement that replaces them.

Coverage after the pass: `ejerciciosPeso` 39/84 alts carry an explicit way out, `ejerciciosGym` 53/84, `ejerciciosFlow` 37/84 — the rest need no object at all.

**The register for these is neutral Spanish, not voseo** (see **Voice**), so the new clauses say `lleva`, `deja caer`, `sujétate`, never `llevá`. And the substitute still has to be the same movement pattern: `gruposCuerpo.back` promises "dorsal ancho, trapecio, bíceps" and the body map pays out on that promise, so a missing bar falls back to a row, never to a bridge.

**When adding a variant, `repFactor` is the safety valve.** It scales the prescribed reps, so a harder option at the same rung must carry a lower one — the arrow push-up at `.5` against the strict at `1`. And the `alt` still has to name a real equipment-free substitute, because the rotation means a player can land on the barbell-free day and still need somewhere to go.
.

Everyone starts at **rank E, level 1** regardless of the test. The test sets volume and calibre only, so stronger players do more work and climb faster without being handed dangerous movements. This is deliberate — do not wire the test's `rank` field (it is computed in `bandasCalibre` and intentionally discarded).

### Volume

`volumen(rank, classification, focus, modality, testResults)` = `round(base × factorRango[rank] × repFactor × repMult[focus])`, per group. `metaDelDia(state, rank)` is the only caller that has the state, and it passes `state.profile.testResults`; `sdcUmbralPrueba` (the Umbral test) and `repsCombate`/`repsCombateSuave` (combat) pass it too so every path prescribes the same volume.

`base` comes from `sdcBase(testResults, classification, modality)`, and **each modality has its own model** because they are programmed differently:

- **bodyweight** — derived from the player's measured maxima: `max(baseClase[classification][g], min(340, round(testMax × 1.15)))`. `factorRango.E` is `0.6`, so at rank E the daily total lands near 0.7× a single all-out set. `back` uses the measured pull result, falling back to `pushup × 0.85` only for saves that predate the pull test.
- **gym / flow** — fixed tables in `sdcModBase`, ignoring the test. In the gym the variable is the load, not the reps, and the player adjusts with the `kg` field; `repMult` then lands the sets in the right ranges (fuerza 8/7/5, salud 12/10/8, resistencia 17/14/11).

`baseClase[classification]` survives only as a **floor** on the bodyweight path, so this can raise a target but never lower one. Before this existed, the ceiling at rank E was 14 squats a day for everyone, including a player who did 114 in the test.

### Sets

The daily target is split into tappable sets. `sdcNSets(total)` gives 3 sets at ≥6 reps, 2 at ≥3, else 1 — so no set is ever worth 0. `sdcSplit(total, n)` distributes them **descending** (40/33/27, or 55/45 for two) because a flat split pretends the last set is as cheap as the first; it is not, and the fatigue lands exactly where the player is least able to absorb it. `sdcSuma(total, n, k)` returns the reps inside the first `k` sets.

`FilaEjercicio` renders the chips and `sdcSerie(group, index, marcar)` handles the tap, and **each chip toggles its own set and nothing else**. It used to store only *how many* sets were done (always the first k), so tapping chip k marked 1..k — and a player who had marked all three and tapped the first to unmark it lost the other two as well (reported from the phone). The marks are now an array per group, `[false, true, true]`, read everywhere through `sdcMarcadas(valor, n)` in `series.js`, which also reads the old shape: a number k is the first k marked, so a session saved before the change comes back exactly as it was, and the next tap rewrites it as an array. The **pending set** — the one with the − N + and the hold clock — is the first unmarked one, wherever it is. **MARCAR TODAS** and **DESMARCAR TODAS** sit side by side under the instructions (the metronome toggle moved to its own row below them); Desmarcar todas clears every exercise, stops the rest bar and is disabled when nothing is marked. `e2e/juego.spec.js` marks three, unmarks only the first and clears all.

**Every change to the marks goes through `cambiarMarca(campo, cambio)`**, one field at a time (`ser`, `aj` or `mok`) and always as a function of the latest value, in the screen state (a functional `setState`) and in the save (inside the `setPlayer` updater) at once. Before, each handler rewrote all three from the copy it saw in its render, so two taps that landed before React redrew overwrote each other — a second set marked in the same instant, or two quick "+" — and **the + and − now send a delta** (`onAj(serie, reps, ±1)`), so two fast taps add two. The claim button of the day's modifier uses the same path (`sdcMarcarMod`). A slot the kilos created first is filled from the screen state before the patch. `e2e/juego.spec.js` clicks two "+" and two chips inside one JavaScript tick and checks screen and save; with the old handlers it fails.

**"Ajustar series" lets the player plan every set before doing it** (asked for from the phone: someone who already means to do 15-15-12, or 8-12-8, sets that and then marks). The − N + used to live only on the pending chip, and three chips with two 44 px buttons each do not fit a phone, so it is a mode: the button sits at the right of the "Llevás X de Y reps" line, and while it is on every chip becomes a column — **+** above, the chip (still a tap to mark), **−** below — and the button reads "Listo". It writes the same `sdcAjuste` the pending chip does, one index per set, so **the day's goal does not change**: planning more counts as more done ("Completar rutina · 39/35"), planning less is scored against the goal as before. MARCAR TODAS now floats the reps it actually adds (the sum of the sets it marks) instead of goal minus done, which was wrong once sets were planned. The mode closes when the exercise changes. `e2e/juego.spec.js` plans 7-7-2 over a 5-4-3 split and checks the chips, the float, the button and the save.

The **pending** set also carries a `− N +`, so a player who fell short on the last set records that without disturbing the others (`sdcAjuste[group][index]`, read through `sdcRepsSerie`). Adjusting a set changes what you *did*, never the day's goal: `sdcTotalMeta()` deliberately sums the raw `metaSesion` targets, because `registrarRutina` grades against `metaDelDia()` and a button reading `30/30` would claim a completion the game scores as 94%.

**`registrarRutina` is still the only function that settles XP,** and the XP shown in the header during a session is a live projection: `progress.currentXP + sdcTotalHechas()`. `registrar` passes `sdcRepsHechas()` to `registrarRutina`, not the raw targets. Keep it that way — moving the **ledger** into the tap would break `Deshacer registro de hoy` and risk double counting.

**The marks, however, are persisted, and that is a different thing.** `sdcSer` and `sdcAjuste` used to be component state only, so closing the app mid-session lost every set you had tapped — verified: two of three marked, reload, all gone. For a phone that locks, or an app the system evicts while you answer a message, that is the moment a person quits, and it makes them feel stupid rather than interrupted. Every tap now also writes a memo:

```js
today.marcas = { "<modality>|<mode>": { ser, aj, mok } }   // ser: { squat: [true, false, true], … } (a number in older saves)
```

**One slot per modality *and* per mode, because a single slot made supersets lose work.** The memo was originally one object carrying its own `{mod, mode}`, and the effect rehydrated it only when both matched. That is correct for *switching* — but somebody alternating a bodyweight set with a flow set is writing to the same slot on every tap: the flow tap overwrote the bodyweight memo, and going back to bodyweight found `mk.mod !== B` and reset the chips to zero. **Reproduced exactly as reported**: mark set 1 in bodyweight → switch to flow → mark set 1 there → switch back → set 1 unmarked. Keying by `modality|mode` lets all four slots (two modalities × Normal/Recuperación) coexist, and verified they survive a full reload.

`cambiarMarca(campo, cambio)` writes it, one field at a time, from `sdcSerie`, `sdcAjustar`, `sdcMarcarTodo`, `sdcDesmarcarTodo` and the modifier-claim button (`sdcMarcarMod`); `sdcMarca(state, key)` reads it and still accepts the **old single-object shape** when its `mod|mode` matches the key, so a session already in progress at deploy time is not thrown away. `cargarPartida` builds a fresh `today` on rollover, so a new day clears the whole map with no cleanup code.

The `[modo, progress.rank, modalidad]` effect rehydrates the slot unless the day is registered **or the modality is already in `today.doneModalities`**. That second condition is new and it matters: `mmNueva` clears `today.completed` to open the second session, so without it, switching back to a modality you already registered would re-offer its old marks under a fresh routine card and invite registering it twice. Undo (`deshacerRegistroBase`) restores the whole `today` from the snapshot, marks included, which is why it keeps working.

Verified: marks survive a reload, each modality keeps its own set of chips while alternating, Recuperación gets its own slot, `today.reps` stays at zero until `registrar()` runs, registration still yields the same reps and XP, and a new day starts clean.


When the day is registered the card is replaced by a summary: reps per group, the personal best in each, and the week's totals. The ★ only appears when `lifetimeReps[g]` exceeds today's reps, because otherwise every group is a record in the first session and the mark means nothing.

Exercises measured in time rather than reps declare it in their own `alt` ("1 rep = 3 segundos…"). `sdcSegs(alt)` parses that and the UI shows the seconds without the player opening anything. It **ignores conversions in parentheses**, which describe the substitute: the pull-group `alt` mentions "superman en el suelo (1 rep = 3 s)" and that does not make towel rows a hold.

### Gym: one weight per set, and tonnage is not a scoreboard

`gymWeights[group]` was a **single** number per pattern, so the app could only describe a gym session as "30 kg × 30 reps". Ramping the load set to set — the most ordinary thing in a gym, and something the app's own `sdcMods` asks for with drop sets — could not be recorded at all. Worse, the input was controlled by the parsed number (`value: c||""`, `onChange` → `parseFloat`), so **you could not type a decimal**: "32," parsed to 32, the field redrew as "32", and the next keystroke produced 325.

Now each set has its own field, rendered in a `flex gap-2` row directly under the chips so reps and kilos line up column by column:

```
[ 12 ] [ 10 ] [ 8 ]     ← reps
[ 30 ] [32,5] [ 35 ]    ← kg
La última vez: 30 · 32,5 · 35 kg
```

- **Editing text lives in component state** (`sdcKgS`, raw strings, so decimals type normally); the parsed numbers persist as `gymWeights[g]` for set 0 and `state.gymSerieKg[g][k]` for the rest.
- `sdcKgVer(g,k)` **cascades downward**: an explicit value for a later set, else the nearest earlier one, else the last session's kilos for *that exercise name* (`gymUlt`). Typing 30 into set 1 fills 2 and 3; bumping 2 to 32,5 carries into 3.
- **The text you typed today lives in `today.marcas[key].kg`, not in `gymWeights`.** `sdcKgSet` writes three places at once: the raw string into component state and into the day's slot, and the parsed number into `gymWeights[g]` (set 0) or `gymSerieKg[g][k]` (the rest). That looks redundant until you switch modality mid-superset: the effect clears `sdcKgS`, and `sdcKgVer` has no branch that reads `gymWeights[g]`, so **set 1's kilos came back empty** while sets 2 and 3 survived through `gymSerieKg`. Measured: typed 60 · 62,5 · 65, switched to bodyweight and back, got `"" · 62,5 · 65`, and registering then recorded 1.272 kg of volume instead of 2.052 — a 38% undercount of a session, silently. Rehydrating from the day's slot fixes it and stays correct across exercises, because `cargarPartida` rebuilds `today` on rollover; making `sdcKgVer` fall back to `gymWeights[g]` would not, since that field survives the day and would print yesterday's leg-press number under today's quad extension.
- `state.gymUlt[exerciseName] = {kgs, fecha, best}` is written by `registrarRutina` from the `gvol` that `registrar()` passes, and feeds the "La última vez" line. Both new fields use the **no-migration pattern** (`sdcGymSer`, `sdcGymUlt` return `{}`), so `cargarPartida` is untouched.

**`registrarRutina` takes a fifth argument, `gvol`.** `registrar()` computes `{group:{vol,max,kgs}}` from the per-set kilos and the per-set reps — the only place both are known — and the gym block uses it, falling back to `gymWeights[b] × totalReps` when it is absent. So volume is now `Σ kg_k × reps_k` (30×12 + 32,5×10 + 35×8 = **965**, where the old formula said 900) and `bestLiftKg[b]` records the heaviest set, not the only one.

**The "= 450 kg movidos" line next to the exercise is gone.** Tonnage is a workload total; printed beside one exercise mid-set it reads as a claim about a single lift, and it is trivially misleading — 20 kg × 30 reps outscores 60 kg × 8. It was also the *only* place `lifetimeVolumeKg` was ever shown, despite 16 achievements depending on it. It now lives in Perfil → **Tus números**, which is where a lifetime figure belongs.

**Body weight is entered in Perfil → Tus números too**, below the lifetime kilos, and only shown when the gym is one of the player's modalities or a weight is already stored. `profile.bodyWeight` feeds three achievements — *Tu Propio Peso*, *Uno y Medio*, *Doble Cuerpo* — through `bestLiftKg`, and nothing else. The field used to live in the "Poder actual" card; when that card was deleted (commit `048d961`, 2026-09-20) the field went with it and `ponerPesoCorporal` was left with no caller, so for five days those three achievements could not be earned by anyone who had not typed a weight before. ESLint found it as an unused function. It takes the text on blur (or Enter), like the old one, so a decimal comma types normally, and shows the stored number back with `sdcKgTxt`. `e2e/juego.spec.js` now fails if the field disappears again.

> A reorder is invisible to the bracket check. Moving the kilos row above the "Llevás N de M reps" line by splitting a region and concatenating the halves the other way round left the `Fragment` unclosed, and `{}`/`[]`/`()` deltas were all still perfect because a permutation preserves them. **After reordering siblings, load the app** — and assert that each half ends with a comma before swapping.

### Unlocks

`nivelUmbral` is the rank ladder — the level at which each rank offers its Umbral: `{E:50, D:100, C:140, B:180, A:220, S:260}`. It used to be `{E:50, D:100, C:300, B:700, A:1500, S:3000}`, which with the XP curve meant rank B cost 255k XP (about 12 years of training four times a week) and rank Z 22.9M. The game had three reachable ranks out of seven. The current ladder puts D at ~5 months, C at 1.3 years, B at 2.6, A at 4.4, S at 6.7 and Z at 9.4. Z has no entry because there is nothing above it, and the header correctly hides the Umbral line there.

**Crossing the Umbral takes three things now: the level, a minimum of complete routines in the rank, and a test that is one full routine of the next rank.** The level alone could be rushed: simulated with the real functions, a beginner who trains every day reached the first Umbral in 7 weeks (50 sessions, against 90 at three a week), because the streak adds up to +30% and salud another +15% — while the shop's boosts shaved only ~10%, since PD run out. And the test (`I2`, removed) prescribed rounds of the *current* rank's exercises, which the player already did every day, so nothing checked whether the next rank's movements were within reach.

- `sdcUmbralMin[rank]` full routines — 24, 36, 48, 60, 72 and 84 from E to S, read through `sdcUmbralMinDe(rank)` — counted by `sdcRangoCompletas` as `history` days equal to `"full"` **after** `state.rangoDesde.date`. The crossing day belongs to the rank you leave. It is derived from `history`, so undo, retro-logging (which writes `"partial"`) and old saves need no bookkeeping: a save without `rangoDesde`, or whose `rangoDesde.rank` is not the current rank (the Z demotion, the test panel's rank jump), counts its whole history, which grandfathers every existing player.
- `sdcUmbralPrueba(state, modality)` takes the rounds and the note from `pruebaUmbral` of the rank being left, and the volume (`volumen`) and exercise names (`ejercicioDe` with today's date) from the next one, and splits that one routine across the rounds (`round(volume / rounds)`, at least 1). Each round used to be 60–80% of the next rank's routine, so on top of the day's own routine the test added 2 to 6 routines — 69 reps for a beginner's first Umbral against a 35-rep day, 575 for gym going into the sixth rank. It now tests exactly what the player will do every day after crossing. The growing minimum never binds a player who registers full routines — simulated, even a daily gym player (the fastest) spends 26, 56, 66, 89, 136 and 152 full sessions in the six ranks; it stops levelling on partial routines, several sessions a day or XP from the side systems.
- `sdcCruzar` wraps `cruzarUmbralBase`: it refuses with *Te faltan N rutinas completas…* (`sdcFaltanTxt`, singular at 1) and on success writes `rangoDesde = {rank, date}`. The card shows *Rutinas completas en este rango: X de N* and keeps the button disabled until both the count and today's 100% hold. The test panel's *Forzar Umbral* sets `umbralForzado = rank`, which skips the count for that rank only.

`sistemas` maps systems to a required level and rank; `sistemaActivo(state, id)` and `sistemaAbierto(state, id)` test it. The rank requirements are all `"E"` on purpose: rank D needs level 50 and rank C level 100, so the original level-8/12/15 gates paired with rank D/C were unreachable. Keep new entries at rank `"E"` and gate by level alone. Levels in use: 1, 3, 8, 10, 12, 15, 20, 25, 30. **Logros is deliberately level 1**: `revisarLogros()` is called from thirteen places and none of them is gated, so a player already earned achievements and Dominion Points from their first routine while the tab that explains them stayed locked until level 5 — the reward arrived before the room it lives in. The tab bar is a three-column grid and level 1 shows only Entreno and Perfil, so this fills the empty cell. Categories whose system is still locked start collapsed, via `sdcCatAbierta` and the `sdcCatSis` map.

### UI composition

`Tarjeta` is a plain card; `Plegable` is a collapsible card taking `{id, title, accent, collapsed, onToggle, right, style}`. Collapse state lives in `ui.collapsed[id]`, read with `plegado(id)` and toggled with `alternarPlegable(id)`. Active tab is `[pestana, setPestana]`.

`alternarPlegable(id, shown)` toggles a card. It takes the **currently displayed** state from `Plegable`, not just the id, and that second argument is load-bearing: it used to do `collapsed[id] = !collapsed[id]`, which from `undefined` produced `true` — still collapsed. Every card using the collapsed-by-default pattern below therefore needed **two taps to open the first time**, because the first tap only wrote down what the screen already showed. Eleven cards had it. If you add a caller that skips the second argument it silently goes back to the old behaviour.

Two patterns worth knowing:

- **Collapsed by default, migration-safe:** `collapsed: ui&&ui.collapsed&&ui.collapsed.X!==void 0 ? plegado("X") : !0`. Inverting the flag instead breaks saves that already stored it.
- **Hidden until requested:** the help panel and the shop render only when their flag is truthy, so nothing shows when closed — not even a title bar. The `?` button and the PD badge toggle those flags.

`plegablesTodos` lists the ids that "Minimizar todo" collapses; remove an id from it when a card stops being an ordinary collapsible.

### The streak grid shows your history, not a calendar

`diasConstancia(history, today, todayStatus, 28)` used to build all 28 days unconditionally, so anything with no record fell to `empty` (#161b2e, "Sin registro") — a near-invisible square you can tap and learn nothing from. **A player on day one saw 27 of them and one real square**, four rows of a past they were not there for, under a six-item legend for colours they had never had.

`diasConstancia` now drops `empty` days **from the front only**, and the legend filters to the statuses actually present (plus "Hoy" for `pending`, and "Sin registro" when a gap really is in view — `LeyendaConstancia` items take an optional `borde` so those two near-black swatches are distinguishable). Day one: 1 square, 1 legend entry, card 326→220 px. A player returning after 40 idle days gets one square too, which is the truth.

**Gaps in the middle are kept on purpose.** `cargarPartida`'s rollover only writes a status for the day that is ending, so a week of not opening the app leaves five days with no record at all. Those are days the player did miss; collapsing them would draw a continuous streak that never happened. The trim is leading-only for exactly this reason. Verified with a save carrying all eight statuses plus a two-day hole: the hole survives, the 28-day cap still holds for a veteran.

### Density: what a tab costs before you touch anything

Measured at 375×812 with every card collapsed. **This is the number to re-measure after adding a card**, because nothing else makes the cost visible:

| | was | is |
|---|---|---|
| Entreno | 3242 px | 1256 |
| Explorar | 3424 | 1437 |
| Logros | 3382 | 1399 |
| Perfil | 3286 | 1159 |
| Combate | 2918 | 931 |
| Primal | 2751 | 812 |
| **tab bar starts at** | **y=2354** | **y=363** |

Almost all of it was one thing: **the guide rendered open by default, on all six tabs.** It is not a tab card — it sits above the tab bar, so 1976 px of manual (17 topics, 3852 characters) pushed the game's own navigation nearly three screens down, on every tab, from the first launch. `plegablesTodos` does not contain `"ayuda"`, so "Minimizar todo" never touched it. Three things changed:

- `cargarPartida` now defaults `collapsed.ayuda` to `!1`, and `ui.ayudaAuto` hides it **once** for saves that already had it open. A stored `true` from an old save is not a preference — it is the old default.
- The topics are individually collapsible (`sdcTema`, component state, an object of open titles). It opens with **Tu rutina de hoy, Cómo se anota lo que hacés and Niveles y XP** already expanded, so the first thing a player reads is the core loop and not an index.

### The guide has to work for someone who has never played anything

`guia` holds **19** topics, each carrying a `g` (group) so the render emits a section header whenever the group changes: **PARA EMPEZAR (4) · CÓMO PROGRESÁS (3) · LOS SISTEMAS (7) · LO DEMÁS (5)**.

It was 17, then 26 when the missing subjects were added, then 18 after an audit: **a topic has to be a question a player would actually ask, not a fact the code happens to contain.** Seven rows were one answer split in pieces, and merging them cost nothing:

| merged into | what came in |
|---|---|
| **Tu semana** | ¿Qué cuenta como sesión? · El calendario de Constancia |
| **Si hoy no podés** | Modo Recuperación · Día de descanso · Escudo de Racha — three one-sentence topics answering one question |
| **Los rangos y el Umbral** | El Umbral (it only exists as the gate between ranks) · El último rango |
| **Niveles y XP** | Se abren solos — what levelling unlocks belongs with levelling |
| **Puntos de Dominio** | Logros — achievements are a source of the currency |

The index dropped from 1653 px to 1209, and the four opening titles now read as the four questions a beginner has: *Tu rutina de hoy · Cómo se anota lo que hacés · Tu semana · Si hoy no podés*. **The three pre-expanded titles in `sdcTema` must keep matching real `guia` titles** — merging renamed "Los rangos" and "Meta semanal", and a stale key there silently opens nothing.

Two things were wrong and neither was the writing style:

**It explained the game in the game's own words.** "Los rangos" used *Umbral* three topics before Umbral was defined; "El Umbral" said "los cuatro patrones" and **nothing in the app ever said what a patrón is**; "Modalidades" never said what *flow* means. Every term is now defined the first time it appears, and `patrones` is introduced in the very first topic.

**The most important things were missing.** There was no topic for the daily routine, none for **how you record a set** (the single interaction the whole game runs on), none for the stretching rework, Primeras veces, the body map, the streak calendar, achievements, calibre, or why systems appear as you level. The worst omission: **nothing told the player their save lives only on this phone.** There is no account and no server, so "Guardá tu progreso" is now the closing topic and says so plainly.

Presentation, for readers who are not 25: topic titles at 16 px, body at **15 px with 1.65 line-height in `#c8d0e4`** — the shared `text-xs` (12 px / 1.0 line-height) in `#9aa4bd` was never meant for paragraphs. Rows measure 49 px, above the 44 px floor. Closed, the guide still costs nothing: the tab bar stays at y=362.

**When you change a system, change its topic.** The guide now describes combat's "Empezar", the two stretching routines and the weekly flexibility check — reword any of those and the manual starts lying.
- The `?` circle became a labelled `¿Cómo funciona?` button. A bare glyph is not discoverable enough to be the only door to the manual, and the circle was the one `borderRadius` in the file.

The collapsed cards themselves were never the problem — they are 54–55 px each and read fine stacked. What was wrong in Perfil was **eight of them**, three of which were the same kind of thing: `atributos`, `volumen` and `hazanas` were all numbers you read and never touch. They are now one card, `numeros` ("Tus números"), with three labelled sections and the lifetime rep total on the collapsed bar. Six bars left, and the three old ids are gone from `plegablesTodos`. Stale keys left behind in a real save's `ui.collapsed` are harmless.

**The header is permanent UI, not a card.** It carries the name, the calibre, the PD badge, the XP bar (`BarraXp`), `Ascenso: level/threshold` and the next system to unlock. All of that used to live inside the `rango` collapsible, which started closed — so a new player never saw their XP bar move and never learned anything was coming. That card is gone; do not reintroduce one that duplicates the header.

### Notices are added in a microtask

`App`'s `avisar(x)` is not the state setter: it is `queueMicrotask(() => sdcSetAvisos(x))`. `aplicar` and a dozen handlers call `avisar(...)` from inside `setPlayer(updater)` (Raiz's player setter), and React runs an updater while it renders `Raiz`, so updating `App` there logged *Cannot update a component (App) while rendering a different component (Raiz)* in `npm run dev`. The original bundle shipped production React, which does not print it, so it went unseen until the build step. Deferring the one setter fixed every call site at once. The updaters no longer write `localStorage` either: see **The save happens in one place** under *State and persistence*.

### Feedback

There were two `@keyframes` in the whole app and neither fired on a reward. Now the head `<style>` also defines `sdcPop` (floating `+N XP`), `sdcRise` (notices) and `.sdc-chip`, all suppressed under `prefers-reduced-motion` — the browser pane has that on, so animations will look dead there while the numbers still render.

`usePantallaEncendida()` is a hook that holds a screen wake lock for as long as its component is mounted, re-acquiring it on `visibilitychange` because the browser drops the lock whenever the tab is hidden. `usePantallaSi(on)` is the conditional variant, for a timer that lives inside a component that is always mounted; the main component calls it with the combat and Primal countdowns. `BarraDescanso` (rest timer) and `PruebaAptitud` (fitness test) call the mount-based `usePantallaEncendida()` — the two moments where the phone is on the floor and the screen used to sleep mid-set. It swallows its own errors, so it is safe to add to any other component.

**The lock is counted, and it covers the whole routine session.** There is one wake lock for the whole app and several parts hold it at once — on every set, the session and the rest timer — so `sdcWakeOn` adds a request, `sdcWakeOff` removes one, and the screen is released only when none is left; the `visibilitychange` handlers re-request through `sdcWakePedir`, which does not count. It used to be released by the first part that let go, so the end of a rest turned the screen off in the middle of a routine, and two requests racing before the first one resolved leaked a second lock that nothing ever released. `App` now also holds it for the session itself: on Entreno, from the first marked set until the routine is registered. `tests/pantalla.test.js` covers the counting and `e2e/pantalla.spec.js` the session, with a fake `navigator.wakeLock` — and it fails on the old code.

**One switch silences the whole app.** Many people train with music, in a gym or with someone asleep, and the metronome toggle was the only way to quiet anything: a set tap always beeped. Every sound in the app goes through `pitido()` — `sdcBeep`, `sdcSonidoFase`, `sdcPrimalSon`, the rest bar, the travesías, neuromotor, the companion — so `pitido.silencio` stops them all. `App` sets it from `ui.silencio` (the speaker button 🔊/🔇 next to *¿Cómo funciona?*, labelled *Silenciar sonidos* / *Activar sonidos* for screen readers) and clears it on unmount, so a restarted game's onboarding is not born silent. Vibration is untouched. `e2e/sonidos.spec.js` marks a set, mutes, marks another with the metronome on and hears nothing, then reloads and finds the button still muted. **Anything new that makes a sound must go through `pitido`**, or the switch lies.

`sdcBeep(hz, ms)` wraps the existing `pitido()` oscillator and `sdcVib(pattern)` guards `navigator.vibrate`; both swallow their own errors, so call them anywhere. A set tap beeps, vibrates, floats the XP gained (`sdcFlota`) and starts the rest timer. `sdcDesc` scales that rest with the size of the set just completed (`base + reps × 1.5`, capped at 180 s) — `descansoBase` alone gave Resistencia the most reps and the shortest rest.

`Avisos` classifies each notice string with `sdcTier` into `epic` / `good` / `bad` / `info`, sorts epic to the top and styles it accordingly, plus a "Cerrar todo". Tiering is done by matching the text because the notice pipeline (`registrarRutina` → `misRevisar` → `subirNiveles` → `revisarLogros` → `avisoCarga`) passes plain strings; **if you reword "Subiste a nivel" or "Ascendiste", update `sdcTier` too** or a level-up will render like a bookkeeping line again.

### Variety

`metaDelDia()` never received the date, so the routine was byte-identical every day for the ~50 levels rank E lasts. `sdcMods` now holds **six modifiers per modality** — they are not interchangeable, so gym gets drop sets and sets to failure while flow gets longer holds and unbroken transitions — and `sdcModDia(modality, date)` picks one by hashing both together. The bonus only applies when the player claims it (`sdcModOk`, passed to `registrarRutina` as a fourth argument); nothing can verify it, but it demands a deliberate act rather than handing out XP.

The *travesias* (long cardio sessions, formerly "dungeons") draw from `sdcPortales`, ten name/challenge pairs. The identifier kept its old name; only the data changed. Each name states the quality of the body the session reveals (La Guardia, El Rebote, La Cuesta), never a monster. They used to be two independent lists, so "Guarida del Lobo Sombrío" could ask for thirty minutes on a bike.

`sdcMascota(state, pct, isPR)` gives the pet a line about the session just recorded — a personal best, a streak of seven or more, a full routine or a partial one. It used to speak only when you failed. Keep new phrases species-neutral: the pet can be a dog, a cat or a face. A gesture only an animal makes ("apoya la cabeza en tu pierna") needs its face version in `gestosCara` (`primal.js`), which `fraseMascota` and `sdcMascota` apply when `pet.type` is `"face"`; `tests/pistas.test.js` fails if a face line mentions a head, a paw or a door.

### Combat

The attack was typing the word "hecho" into an input. It now reuses the routine's set chips: `sdcCombChips(phase, reps)` renders them, `sdcCombTocar(phase, index, nSets, marcar)` handles the tap — each chip toggles only itself, like the routine's, and `sdcCombSer` holds one array per phase read through `sdcMarcadas` — and `sdcGolpe` lands the hit — the same thing the old `Rd` did minus the text check. The strike button stays disabled until every phase is complete, and bosses keep their superset by rendering one chip row per phase. `sdcCombSer` resets on any change of villain, exercise or phase, and on cancel.

**The clock never starts on its own.** It used to: entering `phase:"resting"` — which happens when you pick a pattern *and after every successful strike* — armed a 12 s (20 s boss) prep countdown that rolled straight into the attack window, and letting that window run out costs a heart via `perderVida`. So the game started counting against you while you were still reading the screen, once per hit. Now that effect only loads the numbers (`setCombSegundosMax`/`setCombSegundos`) and leaves `combPrep`/`combVentana` false; a **"Cuando estés listo"** card shows the prescription and the seconds you will get, and its `Empezar` button is the only thing that sets `combPrep`. Three render states share `phase:"resting"`: `!combPrep&&!combVentana` (ready), `combPrep` (prep, skippable with "Comenzar ahora"), `combVentana` (window). The time limit itself is untouched — it is what makes combat different from the routine — it just cannot start without you.

Two related holes closed with it: leaving the combat tab mid-window used to keep the countdown running in the always-mounted component and take a heart while you were somewhere else (the effect's `pestana!=="combat"` branch now cancels instead), and `combCancelar` ("Cancelar (sin perder vida)") re-armed the prep countdown without clearing `sdcCombSer`, so the next window opened with `GOLPEAR` already enabled.

### Dates

Use `fechaLocal(date)` / `fechaHoy()`. **Never `toISOString().slice(0,10)`** — that is UTC, which rolled the day over at 21:00 in Argentina and broke streaks for anyone training at night. The same bug existed in five places.

### Economy

Dominion Points: 3 for a 100% routine, 1 for ≥50%, first session of the day only. The shop is `tienda` (id, cost, name, desc) and `comprar(state, id)` applies each purchase; add a branch there for every new item. The XP buff multiplier is `dominion.xpBuffMult`, read by `multImpulso()` — do not hardcode 1.25 again.

XP base is literally the reps performed, plus a flat **30** for a 100% routine. That bonus was 20, which made the first routine worth 44 XP against the 48 `costoNivel(1)` costs — a new player could not level up in their first session. **Any change to `costoNivel`, to the bonus, or to the volume model must keep that first level-up intact;** it is the cheapest, most load-bearing reward in the game.

**The three focus profiles have to pay the same for equivalent work, and one of them did not.** `repMult` sets how many reps a profile does and `xpMult` is supposed to buy that back: `fuerza` does 65% of the reps at 1.5× XP, which nets 0.975. But `resistencia` did **140% of the reps at 1× XP** — it was paid in full for volume the other two trade away. Measured at gym rank C, same session, no streak: fuerza 210, salud 200, **resistencia 268**. `resistencia.xpMult` went to `.8`, which landed it at 214 — still ~2% ahead of fuerza, deliberately, because 238 reps takes longer than 110.

**That balance only held because the +30 completion bonus was multiplied too.** Fuerza's 1.5 applied to it, so where the target is small the bonus dominated and fuerza earned ~20% more than salud for fewer reps in bodyweight (10–14% in gym and flow at rank E) — and a player picking fuerza reached the first Umbral in 72 sessions instead of 90. The bonus is now outside the focus multiplier (`sdcBono` in `registrarRutina`: `(v − bono) × multEnfoque + bono`; the streak, perks and buffs still multiply it). With the bonus flat, resistencia's 1.4 × 0.8 = 1.12 per rep showed through at 12–13% ahead in gym and flow, so `xpMult` is now **0.72** (≈1.008 per rep). Measured across the three modalities × ranks E, C, S, the three profiles now pay within **3.4%**, resistencia slightly ahead; `tests/progresion.test.js` holds them under 5%.

**The load is in the XP now, but only where it is earned.** Ten reps at 20 kg used to pay exactly what ten reps at 100 kg paid: `v` starts as the raw rep count and `gymWeights` was never consulted. Progressive overload — the entire point of a gym — was invisible. The gym block in `registrarRutina` now collects a `sdcPRb` list when `gb.max` beats `bestLiftKg[b]`, and **+25 XP per pattern** is added after all the multipliers (flat on purpose, so it reads the same every time) with a notice that starts with `+`, so `sdcTier` styles it as good:

```
+25 XP: nueva marca de carga. Piernas y glúteos 60 → 65 kg
```

It fires **only when there was a previous mark**. Without that guard the first gym session of a player's life would hand out +100 for merely writing down four numbers. Verified both ways.

**The gym suggests the next load, and the suggestion is earned.** Recording what you lifted is a notebook; telling you what to lift next is the job. `sdcSugKg(state, group, name)` reads `gymUlt[name]` and applies double progression: **you only go up if you finished the prescribed reps last time**. That is why `registrarRutina` stores `pct: C/u[b]` alongside the weights — without it the app would push more load onto someone who is already failing sets, which is how people get hurt.

```
completaste  →  "Hoy probá 65 kg →"
te faltó     →  "Repetí 70 kg y cerralo →"
sin historia →  nada
```

The increment is `sdcIncKg`: 5 kg for `squat` at 40 kg or more, otherwise 2.5, dropping to 1 under 20 kg — a lateral raise and a leg press cannot share a step size. The line is a **button**: tapping it fills every set, so the player still performs the deliberate act. It is never auto-filled, because the kilos field records what you *did*, and a suggestion written into it before you lift is the app putting words in your mouth.

**The gym's memory is keyed by exercise name, not by pattern** — `state.gymUlt["Sentadilla con barra"] = {kgs, fecha, best}` — and that distinction became load-bearing the moment each rung grew to three variants. Before the rotation, one exercise per rung meant pattern-keying and exercise-keying were the same thing. After it, `squat` at gym rank E covers *Prensa de piernas*, *Extensión de cuádriceps* and *Curl femoral*, where 120 kg is routine on the first and absurd on the others. Keyed by pattern, the app would have shown "La última vez: 120 kg" under a quad extension, pre-filled the field with it, and paid a PR for switching to an easier machine. **A weight suggestion that is wrong is worse than none**, so an exercise you have not done yet shows an empty field and no history line. `bestLiftKg[pattern]` is still written alongside because sixteen achievements read it through `Object.values`.

The multipliers stack in `registrarRutina`, each with its own `Math.round`: `multEnfoque` (focus, plus the `salud`-only +15% at streak ≥3), `sdcRacha` (+2% per consecutive day, capped at +30%, every profile), `flexBuff`, `multImpulso` (day buffs from the shop), `sdcPerk` (permanent perks) and the multi-modality bonus. A 12-day streak with both perks turns a 62 XP routine into 97.

`tienda` now ends with two **permanent** purchases, `memoria` (40 PD, +5% XP) and `nucleo` (90 PD, raises it to +10% and requires `memoria`). They live in `dominion.perks`, which `cargarPartida` backfills and `dominioInicial()` creates — the first array that needed a migration default in a while, so treat it as the worked example. Everything else in the shop is a consumable.

`revisarLogros()` pays PD by achievement tier (E/D 1, C/B 2, A 3, S 4, Z 5). The 88 entries in `logros` used to grant nothing at all.

**The modalities do not pay the same per session, and that was kept on purpose** (decided 2026-09-24). A full routine for a beginner is worth 150 XP in the gym, 124 in flow and 66 in bodyweight at rank E, because XP is the reps and gym and flow read fixed tables (`sdcModBase`) while bodyweight scales with the fitness test; the gym reaches the first Umbral in 41 sessions at three a week, bodyweight in 90. A gym session takes more time and work than 35 bodyweight reps, bodyweight volume grows with the player's measured strength, and the Umbral test still demands the next rank's exercises. Do not "fix" it without asking.

**There is no XP penalty any more.** Both sites that had one — a sub-50% session in `registrarRutina` and a missed day in `cargarPartida` — took a percentage of `currentXP`, which meant the game punished hardest right before a level-up and not at all just after. Losing the streak is the whole consequence now. If you reintroduce a penalty, do not make it proportional to `currentXP`.

**A short session is never worse than not training** (decided by the author, 2026-09-25). A first session under 50% used to mark the day `missed`, add to `streak.missed` and zero the daily streak on the spot — before the XP was computed, so it also lost the streak bonus — while a day with no training at all, with the week still reachable, only became `skipped` at rollover. Registering 40% was punished more than doing nothing. Now `registrarRutina` leaves streak, history and `missed` alone, pays the XP with the streak bonus, and sets `today.corta`; `cargarPartida` evaluates that day exactly like one without a session (`sinSesion`: shield, `skipped` or `missed`), and any real session that same day — another modality at 50% or more (which clears `today.corta`), a travesía, a combat win — makes it count. The notice says so and is `info`, no longer `bad`. Undo now restores the daily streak from `snap.streakCurrent` instead of subtracting one, which also fixes undoing a short session: it used to leave the streak at 0.

**The ending day is evaluated before the week closes.** `cargarPartida` used to reset the week first and judge the old `today` afterwards, so a Sunday opened without a routine was measured against the new week — zero sessions, no days left — and came out `missed`, with *Ya no podés alcanzar tus 3 sesiones esta semana* right after *Semana cumplida: 3 de 3*. The day block now runs first, with its own week's numbers, and a skipped day in a week whose goal is already met adds no notice. `tests/progresion.test.js` holds both Sundays, the short session against a day of nothing, the rescue by a second session, and the undo.

### Fitness test and calibre

`PruebaAptitud` runs **four** timed tests at the routine metronome's cadence — **2 s down, 1 s pause, 2 s up** — after a **10 s** "PONETE EN POSICIÓN" lead-in (it was 3 s, not enough to put the phone down and get into a plank). It counts one rep per full cycle by itself; what the player does between beeps does not change the count. It used to be 2 s / 1 s with no pause, and that mismatch with the routine is why targets felt too high.

**Results measured at the new cadence carry `testResults.ritmo = 5`,** set by `guardarPrueba(…, 5)` from the Perfil retest and by the onboarding when the numbers came from `PruebaAptitud` (`sdcRitOnb`; typing numbers or picking a self-assessment clears it). The volume model reads the raw numbers, so a retest lowers the daily targets in proportion — that is the point. The **calibre bands** are scaled for tagged results only: `sdcRitmoF(profile)` returns `sdcRitmoK` (0.6) or 1, `sdcBandaMin(k, f)` rounds `bandasCalibre[k].min × f` and `sdcBandaIx(n, f)` picks the last band whose scaled minimum `n` reaches; `bandaCalibre`/`claseCalibre` take that factor as a fifth argument. Perfil prints the scaled ranges (0–17, 18–39, 40–68, 69–100, 101–129, 130+) so the raw score, the formula line and the ladder still add up. Untagged saves — every save before this change, manual entries, self-assessments, the skip defaults — keep the original bands and targets until they retest. **0.6 is an estimate** (constant time-to-failure: 3 s ÷ 5 s per rep); re-measure it the first time a player has both an old and a new result for the same pattern.

The four test exercises are `sq`, `pu`, `ab`, `bk` (inverted rows, superman as the equipment-free fallback). The arrays are `ejerciciosPrueba` in `Inicio` (onboarding) and `repruebaEjercicios` in `App` (retest in Perfil) — they hold different hint text, so a new exercise has to be added to both, along with its state, its `onFinish` branch, the numeric shortcut and the summary row.

`puntajePrueba(sq, pu, ab, bk)` = `sq + 2·pu + ab + 2·bk`, and `bandaCalibre`/`claseCalibre` band it through `bandasCalibre`. The pull term was added later and the six band thresholds were **rescaled ~20%** to absorb it, so nobody changed calibre just because a term appeared. Results persist as `profile.testResults` and feed the volume model.

Two axes, kept separate on purpose:

- **Rank** is what you earn. Same ladder and same ascensions for everybody.
- **Calibre** is what you measure — `sdcCalibre(profile)` returns the `bandasCalibre` label, `sdcPuntaje(profile)` the score. It shows under the name, and Perfil → Prueba de aptitud lists all six bands with the current one marked and the points still missing.

`bandasCalibre` also carries `rank` and `focus` fields. `focus` is display text; `rank` is dead by design (see Exercise selection).

**The four test exercises are bodyweight on purpose, and that is a decision, not an oversight.** A gym player is measured with squats, push-ups, sit-ups and inverted rows because the test's job is to find a base that carries into *all three* modalities with no equipment at all — the inverted row already ships `superman en el suelo` as its fallback. Do not "fix" this by adding a barbell variant: the moment the test needs a gym, it stops measuring the thing it is for.

**What does change per modality is what the number is called.** `bandasCalibre`'s own labels were a player-level ladder (`Principiante Base` → `Élite / Dominio Total`) and its `focus` strings were written in one voice — `"Calistenia / Flow de alto impacto"` was shown to someone who only lifts. `sdcCalTit` and `sdcCalFoco` are 3×6 arrays, read through `sdcCalT(i, profile)` and `sdcCalF(i, profile)`, which resolve the set with the **same `sdcJuego(profile)`** the rank titles use — so the header reads `Nv. 1 · Gateo` over `Tránsito largo` for a flow player and `Barra` over `Sesión larga` for a gym one, instead of mixing vocabularies.

```
bodyweight  Primeros apoyos · Base firme · Aguante propio · Trabajo largo · Fuerza relativa · Fuera de la tabla
gym         Primeros pesos · Base para cargar · Aguante entre series · Sesión larga · Carga alta · Fuera de la tabla
flow        Primeras posiciones · Piso firme · Aguante continuo · Tránsito largo · Control fino · Fuera de la tabla
```

**The rule that shaped those 36 strings: a calibre label describes capacity, never skill.** The test measures how much work your body absorbs; it does not know whether you can do a handstand or a 100 kg squat. So the gym ladder talks about series and volume and never about kilos, the flow ladder talks about sustaining and linking and never names a freeze, and the top band is `Fuera de la tabla` — you exceeded the *scale*, which is what actually happened — rather than `Élite`. The `focus` line is the one place that may name a movement family, because a focus is what to work on next, not a claim about what you already have.

`bandasCalibre.label` and `bandasCalibre.focus` survive as the fallback (`||(bandasCalibre[i]&&bandasCalibre[i].label)`), the way `nombresRango`/`descRango` once did for ranks. Four display sites read the new helpers: the header badge (through `sdcCalibre`, which now returns `sdcCalT(bandasCalibre.indexOf(b), p)`), the six-rung ladder and the "Te faltan N pts para…" line in Perfil → Prueba de aptitud, and the onboarding *Calibración completa* screen. Nothing touched `classification`, so the volume model is byte-identical.

**The Perfil card also prints the current band's `focus`,** gated on `sdcCalibre(s)` rather than on the band index: a save that predates the test scores 0, which `findIndex` happily maps to band 0, and a focus line for a measurement that never happened would be an invention.

### ¿Cuánto mejoraste?

The fitness test measured you once and then threw the number away: `profile.testResults` held only the latest result, with no date, so the app could never say "in September you did 15 squats in a row, today 23" — the most direct form of the thesis there is. Now every test is kept.

- **`state.pruebas`** is a list of `{fecha, squat, pushup, abs, back, ritmo}` (the last 24), behind `historialPruebas(e)` in `logica/mejora.js` (no migration: without the list it returns the current `testResults` with `fecha: null`). `crearPartida` starts it with the onboarding test **only when the app measured it** (`ritmo: 5`); typed numbers, self-assessments and the skip defaults are not measurements to compare against.
- **Saving a retest** goes through `guardarPruebaConHistoria`, which calls `guardarPrueba` unchanged and then appends the dated entry and a notice: *¡Mejoraste! Tu puntaje pasó de 62 a 78 (+16).* (`sdcTier` → good, via `"Mejoraste"`) or, if it went down, the plain *Tu puntaje pasó de 62 a 57.* (info — no alarm).
- **Only the same `ritmo` is compared** (`compararPruebas` returns `null` otherwise): a result from before the metronome cadence, or the defaults, measured something else. `primeraYUltima` pairs the latest with the first entry of the same rhythm.
- **Perfil → Prueba de aptitud** opens with *¿Cuánto mejoraste?*: first against latest, exercise by exercise, with dates, differences in green (a drop is grey, never red) and the score, plus *Tu última prueba fue hace N días*.
- **Every four weeks it asks** (`diasParaRepetir` 28, `tocaRepetirPrueba`): a card at the very top of Entreno, only before the day's first set — because a max test after the routine measures fatigue, not you. *Hacer la prueba* (`irAPrueba` in `App`) opens Perfil with the aptitud card open and the test already started; *Más tarde* writes `ui.pruebaPospuesta` and hides it for 7 days. An entry without a date counts from `profile.createdDate`, the earliest it can be.

`tests/mejora.test.js` holds the history, the notices, the rhythm rule, the old-save seed and the four-week timing; `e2e/juego.spec.js` plays the card, *Hacer la prueba*, *Más tarde* and the Perfil table. `privacidad.html` section 2 says results are kept with their dates.

### Stretching

It was the last screen in the app you **watched** instead of doing: one 300-second countdown, `_2(elapsed)` deriving which of nine stretches you were "on", no beep, no acknowledgment, nothing to tap. Four separate defects made that worse:

- **No wake lock.** `usePantallaSi` listed combat and Primal but not `estirando`. Five minutes on the floor with the screen going dark.
- **`setTimeout(()=>Tl(d=>d-1),1e3)`.** The decrementing pattern CLAUDE.md warns about, at 5 minutes — it drifts and stalls when the phone locks, which the missing wake lock guaranteed.
- **Four of the nine stretches were per side** ("20 s por pierna", "15 s por lado") and *nothing signalled the switch*. You were doing half of each, or both in one slot.
- **All or nothing.** "Cancelar (sin XP)" at minute four of five paid zero.

Now `estiramientos` entries carry `seconds` (per side, not split), optional `lados:1` and optional `corta:1`. `sdcEstLista(corta)` flattens that into **steps**, expanding a bilateral stretch into two with `lado:"lado derecho"/"lado izquierdo"`, so the switch is a step like any other and gets its own beep. Two routines: **Corta / 6 pasos** (what helps right after training) and **Completa / 13 pasos** — 3:44 and 7:33 since the lead-ins went per step. Elapsed comes from `sdcEstIni` via `setInterval` recomputing `Date.now()-start`, so leaving the tab no longer freezes it — **verified**: away 16 s, came back 16 s further along, not where it was.

**Every step is preceded by a lead-in** (it was a flat `sdcEstPrep` = 5 s; now 10/8/5 per step, see the warm-up), because the beep told you to change and the hold was already running: you spent the first seconds of a 25-second stretch getting down on the floor, and the worst case was a per-side switch, where you had to stand up, turn around and start again against a clock that never stopped. `sdcEstPaso(list, elapsed)` now walks `prep + seconds` per step and returns `{index, left, prep}`; during the lead-in the card shows **PONETE EN POSICIÓN** (first step) or **PREPARATE**, the name, side and description of the stretch you are about to do, and an amber countdown. `sdcEstTotal` includes the lead-ins, which is why both routines got longer — that time was always being spent, it just used to come out of the stretch.

Two beeps instead of one: a low 520 Hz when the lead-in starts and the usual 760 Hz when the hold does. The effect tracks `index*2 + (prep?0:1)` in `sdcEstIdx` so one counter covers both transitions and neither fires twice. Grading is untouched: `Terminar acá` still passes `p.index`, so a step you are only preparing for does not count as done.

`registrarEstiramiento(e, hechos, total)` grades: under 34% pays nothing and leaves `today.stretchDone` false so you can come back; at or over it pays `round(25 × fraction)` and marks the day; only a full run increments `week.stretchCount` toward the weekly 2. The notice keeps starting with `+` so `sdcTier` still renders it as good.

**The flexibility check is what makes the section mean anything.** Stretching was the only system that measured nothing and argued for itself purely with XP. Once a week (`sdcFlexToca`, 7 days) it asks how far you reach sitting with your legs straight — five concrete descriptions in `sdcFlexNiv`, knees → palms on the floor. `sdcFlexSet` is a **reducer returning `{state, notices}`** and beating your own best writes a real **Primera vez** (`origen:"medida"`), which `sdcTier` renders epic. This is the one place the dropped "measured" source is safe: the ladder has five rungs, so it can fire at most four times in a lifetime, unlike rep records.

State lives in `state.flex` and uses the **no-migration pattern** — `sdcFlex(e)` returns `{}` — so `cargarPartida` is untouched.

> The bug that cost a test run: `sdcFlexSet` first returned the bare state instead of `{state, notices}`. `aplicar` destructures `{state:m}`, got `undefined`, and `guardarPartida(undefined)` wrote the literal string `"undefined"` into `dominio-corporal:player/state`, wiping the save. Since the save moved into `Raiz`, an `undefined` player is no longer written — the stored save survives and a reload brings it back — but the screen still falls to the onboarding, and finishing it there would overwrite everything. **Anything passed to `aplicar` must still return `{state, notices}`.**

### Warm-up (Calentamiento)

The card above "Rutina de hoy" (`id:"calentamiento"`, `order:-5`, open by default, in `plegablesTodos`). It is a RAMP protocol in four phases, and **its identifiers use the `sdcCalor` prefix because `sdcCal` is already taken** by the calibre helpers (`sdcCalibre`, `sdcCalT`, `sdcCalF`).

| phase | what | how it advances |
|---|---|---|
| 1 · PULSO | trote en el lugar, saltos de tijera | timer |
| 2 · MOVILIDAD | brazos, cadera, balanceo de pierna por lado, muñecas | timer |
| 3 · ACTIVACIÓN | one drill per pattern, chosen by modality | timer |
| 4 · ENSAYO | today's four exercises, exact names from `ejercicioDe`, light dose | a tap per exercise |

**The four patterns are always the four patterns.** The routine never picks patterns per day; what varies is the modality, the rank and the date rotation of the exercise. So activation keys on **modality** (`sdcCalorAct`, with `sdcCalorActF` overriding three groups for flow: cuclillas, bestia, hollow) and each drill carries an `ev` regex: if today's exercise already *is* that drill (bodyweight E has `Puente de glúteos` and `deadbug asistido`, flow E has `Sentadilla profunda con balanceo`), the next option in the list is used instead, so the same movement never appears three times in a row.

**Ensayo is tapped, not timed,** because the dose is reps and a gym player may be loading a machine. The dose comes from the first set of today's target (`metaSesion`, so Recuperación halves it too): ~40% of it clamped to 1–6 reps, a third of the seconds (5–15) for holds via `sdcSegs`, and in the gym 4–8 reps at **half of `sdcSugKg`**, rounded with `sdcIncKg`. The gym step also offers *"Lo hago antes de su primera serie"*, because ramp sets belong at each machine and nobody should cross the gym twice.

**Lead-in is per step, and it must give time to get there.** `sdcEstPaso` and `sdcEstTotal` read `step.prep || sdcEstPrep`: 10 s before the first step (put the phone down), 8 s whenever the body changes position (wall, floor, supine, plank), 5 s when it does not (a side switch). Stretching now follows the same rule: `estiramientos` entries that change position carry `pr:8` and `sdcEstLista` gives the first step 10, which moved the routines to **3:44 and 7:33**. "Ya estoy →" skips the rest of a lead-in by moving `ini` back; nothing skips a hold. See **Guided timers never start without you** for the first-time wait and the pause.

State is `today.calentamiento = {mod, ini, pot, xp, hecho}` (no-migration: `sdcCalor(e)` returns `{}`; `cargarPartida` rebuilds `today` on rollover). Elapsed time is `Date.now() - ini`, so a reload resumes mid-step — verified. A run older than the timed part plus 20 minutes counts as abandoned. `Calentamiento` is a real component with its own ticker and `usePantallaSi`, so it only runs while the card is open and Entreno is showing; the clock itself never stops.

**Reward: 10 XP, once a day, graded like `registrarEstiramiento`** — under 34% pays nothing, partial pays `round(10 × fraction)`, with `flexBuff` and `multImpulso`. It is the smallest reward in the game on purpose (skill step and neuromotor 15, joint care and Primal 20, stretching 25, travesía 40+). It does **not** call `anotarDia`: warming up is not a session and does not touch the week or the streak. **It can be repeated without XP** ("Calentar de nuevo"), because a second modality in the evening needs its own warm-up; the stretching-style hard lock would have been wrong here. The card hides once the day is registered and returns with `mmNueva`.

Its cost, measured at 375×812 on a fresh save: open, 204 px, which puts the "Rutina de hoy" header at y=635, still on the first screen; collapsed, 54 px. The start view is kept to one button and one line on purpose — the explanation lives in the guide ("Tu rutina de hoy"), not in the card.

### Guided timers never start without you

Reported from the phone: someone who does not know a movement needs to *read* it, and the clock was already running, so they did nothing. A 5–10 s lead-in is enough to move, not to learn. Every timed flow now waits for the player the first time and can be paused:

- **First time, the lead-in waits.** `state.pasosVistos` (no-migration: `sdcPasosV(e)` returns `{}`) records every step name the player has completed. `sdcPasoEspera(list, k, vistos)` is true for a step never done — except the second side of a bilateral step. While it is true the lead-in freezes at its full length, shows **LEÉ Y PONETE EN POSICIÓN** with the description at 15 px, and waits for **Listo, empezar →**, which leaves 3 s of lead-in and records the step as acknowledged (`ok`, so it does not re-freeze). Steps are marked seen when a run ends — `sdcPasosHook` wraps `registrarEstiramiento` for stretching and `sdcCalorFin` marks the warm-up — for every step before the one you stopped on.
- **Pause** freezes elapsed time: `pz` is the pause timestamp, elapsed is `(pz || now) − ini`, and resuming adds the paused span to `ini`. The warm-up keeps `pz`/`ok` in `today.calentamiento` (it survives reloads); stretching keeps `sdcEstPz`/`sdcEstOk` in the main component, like the rest of its state. The auto-wait is the same mechanism: it writes `pz` at the step's start (`sdcEstDesde(list, k)`).
- **`PasoGuiado`** renders one timed step for both — label, name, side, description, countdown, bar, next step, and the Listo / Seguir / Ya estoy / Pausa / Terminar buttons — so the two cannot drift apart again.
- **Instinto Primal** no longer starts on tap: `primalElegir` opens a `"listo"` state with the description and an **Empezar**, which runs a 10 s lead-in through the existing `resting` branch with `primalRonda = 0` (labelled PONETE EN POSICIÓN). **Every round is announced by ear**: `sdcPrimalSon` plays a 3-2-1 tick before a round starts and before it ends, a high note to start, two falling notes when a round ends and three rising ones when the session does. The 15 s between rounds (`descansoPrimal`) reads *Ronda N/3 terminada · Descanso* and turns into **PREPARATE · RONDA N+1/3** for its last `sdcPrimalPrep` (5) seconds, opened by its own double cue; `sdcPrimalEtapa(fase, ronda, seg)` picks the label and `sdcPrimalTic(fase, seg)` the ticks. Reported from the phone: the end of a round was a 160 ms sine at 520 Hz, which a phone speaker barely plays, so the rest started with no sign that the round was over. **Keep alert sounds above ~700 Hz.** It also has **Pausa** now, and its clock is a timestamp: `primalFin` marks when the current phase ends, a 250 ms `setInterval` derives `primalSegundos` from it, pausing stores `primalPausa` and resuming pushes `primalFin` forward by the paused span. It used to subtract one second per `setTimeout`, so a phone that throttled timers fell behind; `e2e/sonidos.spec.js` jumps 12 s in one `runFor` and expects the display to follow. Each new phase starts its clock from the moment the previous one was seen to end (not chained from the old `primalFin`), so coming back to the app after a long time ends only the phase in progress instead of racing through the whole session. Combat still counts down by decrementing, on purpose for now: its window is a challenge, not a guided step, and a wall clock there would cost a heart for switching apps.
- **Neuromotor** and the **fitness test** count down 10 s instead of 3, beeping only the last three.
- **Travesías** start `startedAt = now + 10 s`. `CronoTravesia` keeps the raw, possibly negative elapsed in state (`transcurridoCrudo`) and clamps it for display (`transcurrido`): with the clamp in the state itself, nothing changed during the lead-in, nothing re-rendered and the countdown froze on its first number — found in testing.

**The routine had the same shape of problem in two places.** The rest timer `BarraDescanso` rendered *inside* the card above the four rows, so every set tap inserted ~100 px and pushed the rows under your finger, and at the fourth exercise you had to scroll up to see how long was left. It is now a **fixed bar at the bottom** (`DESCANSO m:ss`, progress, **Saltar →**), timestamp-based from `sdcDescIni`, with no layout shift at all. And a completed exercise **folds into one line** (`✓ name · N reps`, tap to reopen, "Hecho · ocultar" to fold again) so a stray tap cannot unmark it. The fold waits **1.2 s** after the last set (`sdcCierra`), because collapsing instantly would move the next row up under the same finger; a row that is already complete on mount starts folded.

> Testing trap: the Browser pane's screenshots **do not draw `position:fixed` elements**, and at some emulated sizes they crop the viewport. The rest bar looked missing in every capture while `document.elementFromPoint` at the bottom of the screen returned its timer and its button. Check fixed UI with hit-testing, not with a screenshot.

### Cómo llegás (the check-in)

Asked for by the author: on a day without energy it is easy to skip, and a little activity changes how you feel. The point is not the question — it is the **before/after comparison**, which is the thesis made measurable: *llegaste con pocas ganas y te vas a full*, and over time *días que no querías: 12, en 10 terminaste mejor*.

It is a system in `sistemas` (`id:"animo"`, level 1), so it gets a switch in Perfil → Sistemas del juego for free and `sdcAnimoOn(e)` is just `sistemaActivo(e,"animo")`. State is `state.animo[date] = {antes, cuerpo, modo, ack, ahora, ahoraOk, despues, carga, no}` behind the no-migration getter `sdcAnimo(e)`, capped at 400 days by `sdcAnimoPut`. Scale `sdcAnimoEsc`, five faces drawn by `Cara`: **Sin ganas · Pocas ganas · Normal · Con ganas · A full** — each with a `f` phrase ("con pocas ganas") so the sentences read in Spanish, and none of them gendered (the mockup's "Flojo" was dropped for that reason).

1. **Before** — `AnimoAntes`, a card at `order:-6` above the warm-up. Shown only on the day's first session, before any set is marked or the warm-up has started, and never blocking: "Hoy no" hides it for the day. Normal or better → the card shrinks to one line, *Llegás normal.* with **Cambiar respuesta**, which stays until the first set or the warm-up, same as the card. A low answer that has been acted on (`ack`) shrinks to the same line. Low (≤2) → **"¿Y el cuerpo?"**: Cansancio · Músculos cargados · Me duele algo · Bien.
   - Not pain → the routine switches to **Recuperación** (`setModo("recovery")`, and the answer stores `modo` so the choice survives a reload — the `modo` state is initialised from it) and the card says *Hoy alcanza con empezar*, with **Empezar calentamiento** (starts the warm-up and un-collapses its card) or **Ir directo a la rutina**. When there are ≥3 past low days with an after-answer, it adds the player's own evidence: *Las últimas N veces que llegaste así, en M terminaste mejor* — only if M ≥ 2, and never invented.
   - **Me duele algo** → no training suggestion. It prints *Si es un dolor agudo o punzante, no entrenes esa zona hoy* followed by `reglaDolor`, the pain rule, in its neutral medical register, offers the weekly rest day behind a confirm, and *Entrenar suave, sin esa zona*.
2. **After the warm-up** — `AnimoAhora`, inside the warm-up's done view, only for low days, before any set: **"¿Y ahora?"**. Normal or better offers *Te vino el envión. ¿Hacés la rutina normal?*. The switch lives here and not mid-routine on purpose: marks are stored per `modality|mode`, so changing mode after marking sets would move you to an empty slot.
3. **After the routine** — `AnimoDespues`, first thing in the completed summary (not on a rest day): **"¿Cómo te vas?"** with the same five faces, then **"¿Cómo te quedó la rutina?"** Corta · Justa · Mucha. Three answers in a row that agree and are not *justa* (`sdcCargaRacha`) produce *Repetí la prueba de aptitud para ajustarla* with a button that opens Perfil and un-collapses the aptitud card — the only remedy there is today for a target that never fits, since the − stepper resets daily.

**Every answer can be corrected**, because a face is tapped by accident: reported from the phone, a player hit *Normal* while arriving tired and sore, and the card vanished with no way back — "Cambiar respuesta" existed, but only in the low branches. Arrival: `cambiar` clears `{antes, cuerpo, modo, ack}` and asks again, and it only calls `om("normal")` when `h.modo` is set, i.e. when the check-in itself had switched the routine to Recuperación. Departure: `sdcAnimoOtra` (the same underlined button, pushed right) clears `{despues, carga}` in both the carga view and the final summary; achievements already paid by the first answer stay, which is harmless. The arrival correction deliberately ends at the first set, for the same reason `AnimoAhora` does.

**No XP for answering.** Paying for a checkbox is the `z_hybrid` mistake. The reward is the evidence line and seven achievements in a new category, **Días que no querías** (the phrase already names a place in Explorar): *Viniste igual* (D), *El envión* (D), *Cinco días que no querías* (C), *Te cambió el día* (C, 10 better-than-arrival sessions), *Veinte días que no querías* (B), *Entrenar te cambia el día* (B, 50), *Cincuenta días que no querías* (A). They count through `sdcAnimoCuenta(e)`, defined **next to `logros`** so the checks resolve in the same scope; "trained" means `history[date]` is `full` or `partial`. Lying to them is possible and pointless — there is no one to beat. The after-answer reducer calls `revisarLogros()` itself, because `registrarRutina` runs `revisarLogros()` before the question exists. The answers also show in Perfil → Tus números and in the Constancia day detail (`DetalleDia` takes `animo`).

`privacidad.html` section 2 lists these answers; if the check-in ever stores anything else, update it in the same commit. Answering once marks `"animo"` in `seenUnlocks`, because `avisarSistemasNuevos` only runs on level-ups: an existing player would otherwise get "Nuevo sistema desbloqueado" days after using it.

### Tu compañero se asoma

Asked for by the author: the pet card at the top, with one tip a day, goes unnoticed, and features like *Ajustar series* are written down but a player who does not explore never taps them. The first idea was a pet that escapes every 15–30 minutes, bounces around the screen and has to be caught. It was changed before building, for this audience: a routine lasts 20–40 minutes, so a timer lands mid-set with the phone on the floor; a moving target is hard to hit at 70; bouncing over the chips turns a miss into a marked set; and forcing a tap is what made Clippy hated. What was kept is the core: **the companion teaches the app, one thing at a time, at the moment it applies.**

- **When**: `Companero` (`companero.jsx`, mounted by `App` while the system is on) peeks **3 s into a rest** (`descansando`) or **4 s into the routine summary** (`today.completed`, not a rest day), only on Entreno. `companeroListo(state, key, date)` in `logica/pistas.js` allows it **once per session** — the key is `date|modality`, stored as `pistas.sesion` — and **never on the first day** (it needs a `full`/`partial` day in `history` before today, because on day one the exercise guides already open by themselves).
- **How**: still, bottom-left, just above the rest bar (`sobreDescanso`, 118 px), with **¡Psst!** and `sonidoCompanero()` — two quick rising whistles (1250 → 1900 / 2300 Hz), above every metronome and Primal note so it cannot be mistaken for a cue, and silent while the metronome plays. The face version looks sideways with an *o* mouth (`gesto="curioso"`). Untouched, it leaves after 20 s, or as soon as the rest ends. Under `prefers-reduced-motion` nothing slides or wiggles.
- **What**: `elegirPista(state, moment, onScreen, date)` walks `pistas` (`datos/pistas.js`) in priority order and returns the first one for this moment that was **neither told** (`pistas.vistas`, written when the player opens it) **nor used** (`pistas.usadas`, or its `hecha(state)`), and whose button is on screen now — except `sinBoton` tips (Recuperación, told in the summary, where its button is gone, because switching mode mid-routine moves you to an empty marks slot). With nothing left, it tells a training tip that is not the one the top card shows that day.
- **Every tip id is a `data-pista` in the UI.** "Mostrame" finds the visible element with that attribute, scrolls it to the centre and adds `.sdc-luz` (an amber outline) for 4,5 s. And one capture-phase click listener in `App` records `pistas.usadas[id]` whenever **any** element carrying `data-pista` is tapped, told or not — so a player who already found *Ajustar series* is never told about it. `anotarPistaUsada` returns the same object when the id is already there, so repeated taps neither save nor re-render. The marked set chips carry `data-pista="desmarcar"` only while marked; `Plegable` takes a `pista` prop for its header (Estiramiento, Constancia). **Adding a tip means a catalog entry and the attribute on its button**; `tests/pistas.test.js` fails if an id has no `data-pista` in `src/ui`.
- **The choice**: dog, cat or **a face** (`DibujoMascota` `type="face"`), for people who do not want an animal; the name is now optional (empty shows *Tu compañero*). `OpcionesCompanero` is shared by the onboarding and `EditarCompanero` in Perfil's top card, the one place it can be changed. Opening the companion also puts `"companero"` in `seenUnlocks`, like the check-in, so an existing player does not get *Nuevo sistema desbloqueado* days later.

State is `state.pistas = {sesion, vistas, usadas}` behind `pistasDe(e)` (no migration). `privacidad.html` section 2 lists it. `e2e/juego.spec.js` plays it: nothing on day one, a peek 3 s into a rest the next day, the tip, Mostrame lighting the marked chip, the tap recorded, and no second peek in the session.

### Relajate: a break with the companion

The author asked for a game to catch the companion; the first mockup (it runs away, you catch it, you get a time and a record) was rejected: it had to be **a screensaver you enjoy touching**, for the rest between sets or for nerves — nothing to win, nothing to lose, no clock against you. And the satisfaction cannot depend on sound, because many people train with music. `Relajate` (`relajate.jsx`) is a fixed full-screen layer (`zIndex` 70, above the rest bar and the peeking companion) with two modes:

- **Jugar**: the companion drifts at 44 px/s and bounces off the edges like the DVD logo, changing colour on each bounce (`coloresRelax`). Tapping it squashes it (a wobbling scale), makes it smile, bursts sparks of its colour and a ring, and vibrates. It can be dragged and flung; it slows back to the drift. Dumbbells, kettlebells, plates and water drops rise from the bottom: a weight you tap flies to the companion and it **lifts it** twice over its head; a drop flies to the **bottle** at the top right, and six of them fill it: *Tomá un trago de agua* — a useful reminder, right in the rest. A tap on the background leaves a ring.
- **Respirar**: the companion goes to the centre with its eyes closed and inflates for 4 s (*Inhalá… N*) and deflates for 6 (*Exhalá… N*), with a short vibration and a soft glide at each change.

**Two ways in.** *Relajate* in the rest bar (`BarraDescanso`'s `onRelajar`, via `propsRutina.abrirRelax`) opens it with the rest's countdown on top; the rest keeps running underneath and, when it ends, `App` closes the layer (`relax === "descanso" && !descansando`), so the player is back at the routine with the usual end-of-rest beep. Tapping the companion in the top card opens it with no clock (`relax = "libre"`), for a moment of nerves on any day. *Salir* or Escape close it. The companion tip `relajar` points at the rest-bar button.

**How it is built.** Movement runs outside React, like a game: one `requestAnimationFrame` loop in an effect moves the companion and the objects by writing `style.transform` through refs, and sparks, rings and flying objects are plain DOM nodes animated with the Web Animations API and removed on finish. React renders only the frame and `DibujoMascota`, which re-renders when the gesture (`feliz`, `calma`, or none — the three companions have both now, through `ojosGesto`) or the colour changes. Every sound goes through `pitido`, so the speaker button silences it; the vibration stays. Under `prefers-reduced-motion` the companion does not drift (only a fling moves it, and it slows to a stop), objects rise at half speed and no sparks fly. It holds the wake lock while open. No XP, on purpose: it is a break, not a task. `e2e/juego.spec.js` opens it from a rest, taps the companion, breathes, leaves, reopens and watches it close when the rest ends, and opens it from the top card with no clock.

### The monthly summary

There was a weekly report and nothing longer, and a week is too short to see a body change. In the first **10 days** of a month (`tocaResumenMes`, `logica/mes.js`), Entreno shows **Tu mes: septiembre**: days trained, perfect days, reps, the XP of your routines and first times, each against the month before (green `+N`, grey `=` or `−N` — a drop is never red), and **Entendido** writes `ui.resumenMesVisto`. After day 10 it is no longer news and does not appear, which also keeps an August recap from surfacing on September 26 the day this shipped.

It is computed, not stored: `resumenMes(state, "2026-09")` walks `dayLog`, which is never pruned (`history` keeps only 60 days, too short for the month before). A day counts as trained if its `acts` holds any session — every `anotarDia` caller is a session (routine, travesía, combat, Primal, expedition, neuromotor) and a retro-logged day carries *Anotado después*; *Rutina completa* makes it perfect. The XP is `dayLog.xp`, which only routines write, hence the label *XP de tus rutinas* rather than the weekly card's looser *XP ganada*. Rows where both months are zero are hidden. `tests/mes.test.js` and `e2e/juego.spec.js` hold it.

### Share your week

**Compartir mi semana**, at the bottom of Constancia, turns the current week into a 1080 × 1350 PNG (the portrait size social networks take) drawn on a canvas in the phone: the app's name, *Mi semana* and its dates (`rangoSemana`, which spans two months when needed), the sessions against the goal in large type (green once met), the seven days coloured like the Constancia grid (today dashed, the rest of the week dark), reps, the daily streak, the level and rank title, the player's name, and the companion — copied from the header's own SVG through `XMLSerializer`, so it is whichever of the three the player chose, in the rank's colour, with no second drawing to keep in sync. The data come from `datosSemana(state, today)` in `logica/compartir.js`; the drawing waits for `document.fonts` so Chakra Petch and Inter are used.

**Nothing leaves the phone unless the player sends it.** `navigator.share({files})` opens the phone's own share menu (WhatsApp, Instagram, a chat…); where the browser cannot share files it downloads the image instead (*Se descargó la imagen de tu semana.*), and a cancelled share says nothing. There is no URL in the image, on purpose, while the app's address is still going to change for Play Store. `privacidad.html` section 3 says so. `e2e/juego.spec.js` stubs `navigator.share` and checks the PNG, and removes `canShare` to check the download.

### Backup reminder

A card in Entreno asks for a backup once the player has 10 days of `history`, and hides for a week on "Más tarde" or for a month after an actual export. Its two dates live in **`localStorage` directly** — `dominio-corporal:ultimoRespaldo` and `:respaldoPospuesto` — and deliberately **not** in the game state. They describe this device, not this player: restoring a backup on a new phone should not carry over "you already backed up". Keeping them out of the state object also means no new default in `cargarPartida` and no migration risk.

`sdcRespaldoOk()` is called from both export paths (`bkDescargar` and `ug`). Neither of those dates triggers a re-render on its own, so the "Más tarde" button also pushes a notice — that state change is what makes the card disappear.

### Achievements

147 entries in `logros` (the last seven are **Días que no querías**, see **Cómo llegás**), checked by `revisarLogros()`, which pays Dominion Points by tier (E/D 1, C/B 2, A 3, S 4, Z 5). `revisarLogros()` is **not** called from `cargarPartida`, so nothing unlocks on load — everything is evaluated when the player finishes something. Unlocked ids live in `state.achievements`, so **removing an entry orphans its id harmlessly** — but it also changes the `X/147` denominator, and the guide topic that quotes the number has to move with it.

**`tier` is a difficulty, not a rank, and the UI used to print it as one.** The group headers said `RANGO Z`, which survived the identity pass untouched: rank letters appear nowhere else in prose, and the visible rank name is modality-specific anyway, so a player at "Quietud" was reading about "Rango Z". The keys stay `E..Z` — `ordenDificultad` orders them and `pd` pays by them — and `sdcDific` maps them to what the player reads:

```
E FÁCIL · D ACCESIBLE · C EXIGENTE · B DIFÍCIL · A MUY DIFÍCIL · S PARA POCOS · Z EXCEPCIONAL
```

**The tiers themselves were not sorted by difficulty, and the top one was the worst offender.** `z_hybrid` ("Atleta Híbrido") checked `modalidadesDe(e.profile).length>=3` — **it paid the game's highest tier for ticking three modalities in onboarding**, without training anything, while its own text promised "entrená con los tres métodos". The four `z_pr_*` entries asked for 60 leg reps, 40 push, 30 pull and 60 core *in one session*, which a rank E player on a `resistencia` profile clears on an ordinary day. Twenty-one entries were re-tiered:

| | was | is | why |
|---|---|---|---|
| Atleta Híbrido | Z | B | check rewritten to `today.doneModalities.length>=3` |
| PR de Piernas / Empuje / Core | Z | C | an ordinary `resistencia` day |
| PR de Tracción | Z | B | pull carries the lowest target, so 30 costs more |
| Doble Cuerpo · Uno y Medio · Tu Propio Peso | Z·S·A | S·A·B | `Math.max` over all four patterns, and a 2× bodyweight leg press is common |
| 26 / 12 / 4 semanas de racha | Z·S·A | S·A·B | |
| 1º / 2º / 3º Umbral · quinto rango | D·C·B·A | C·B·A·S | the first Umbral is ~5 months and shared a tier with a 3-day streak |
| 50 / 200 sesiones de una modalidad | D·C | C·A | 200 sessions is two to four years |

The top tier now holds six entries and every one of them is years of work: the last rank, a full year of weekly goals, 250 terrenos, an attribute at level 30, every skill, and 25.000 pull reps. **When you add an entry, place it against that list, not against how impressive the name sounds** — and check what the `check` actually reads, because `z_hybrid` looked right in the table and paid out for a checkbox.

Re-tiering is safe for existing saves: `achievements` holds ids, never tiers, so nothing un-unlocks and nothing is re-paid. A player who already has one at the old tier keeps it.

**Gimnasio was rebalanced from 16 entries to 12.** Nine of the sixteen graded `lifetimeVolumeKg` — the same tonnage figure that was pulled out of the exercise row for being misleading — and the ladder ran 0 → 500 → 2.500 → 10.000 → 25.000 → 100.000 → 250.000 → 500.000 → **1.000.000**. At a realistic 1.500–4.000 kg per logged session, that last rung is four to eight years, in a category of twelve. Dropped `gym_first` (tier D for "record any volume at all", a duplicate of `gymv_500`), `gymv_25000` (redundant between 10k and 50k), `gymv_500000` and `gym_1m`. The survivors were only ever lowered — 100k → 50k, 250k → 150k — so nothing already unlocked can un-unlock. The wording moved from "N kg movidos de por vida" to **"N kg sumando todas tus series"**, which is what the number actually is.

The 56 added most recently are deliberately shaped:

- **Repeticiones** (30) is one ladder — 100, 250, 500, 1000, 2500, 5000, 10000, 25000 — applied to all four groups off `lifetimeReps`. Same round numbers for every group, because "1000 flexiones" is a number a person can brag about and a tuned 1140 is not. The groups accumulate at very different rates (at rank E the daily targets were roughly 51 squat / 27 push / 11 pull / 32 core), so **`back` carries one tier higher at every rung** instead of getting easier numbers. Two rungs are missing on purpose: `c_squat250` and `b_back500` already existed, so the ladder reuses them rather than duplicating the threshold under a new id.
- **Marcas personales** (8) reads `records` — best reps of a group in a single session — and only covers the low end, because the `z_pr_*` entries already own 30–60. It rewards intensity where the ladder rewards accumulation.
- **Gimnasio** (16) is the seven old `gym_*` entries moved into their own category plus nine new ones, filling what were absurd gaps: `lifetimeVolumeKg` jumped 0 → 10.000 → 100.000 → 1.000.000 with nothing between.
- **Modalidades** (9) needed the one new state field, `lifetimeModalities`, because `week.modalities` resets weekly and `dayLog` stores `{acts, reps, xp}` with no modality. It is incremented in `registrarRutina` beside `week.modalities`, defaulted in the initial state and backfilled in `cargarPartida`. Existing saves start at zero; there is no way to reconstruct history.

**When more than five unlock at once, `revisarLogros()` collapses them into one notice.** Adding a batch of achievements makes every established player unlock a pile on their next routine — 33 notices and +50 Dominion Points for a three-month save, measured. The points and the unlocks are all still awarded; only the wall of notices is replaced. Note that `sdcTier` had to learn the plural "logros desbloqueados" to keep styling it as good news.

`sdcCatAbierta` decides which category cards start collapsed: `sdcCatSis` maps a category to a system and asks `sistemaActivo()`, and `sdcCatMod` maps one to a modality, so a bodyweight-only player finds **Gimnasio** folded away.

### Missions


Unlocked at level 10. `misRevisar` generates one weekly and one monthly objective from `lastTrained` (most-neglected muscle group) or from an unused modality, tracks them against `week`/`month` counters, and pays out. Targets are deliberately ~50% above what the prescribed routine yields, so they cannot be satisfied by training normally. There are intentionally **no daily missions** — the routine, dungeon, combat and Primal already fill that role.

---

## The thesis

> **Cualquiera ama entrenar cuando descubre de qué es capaz su cuerpo.**

This is not a tagline, it is the rule for saying no. For any decision, ask: *does this make someone discover something about their body, or only comply?* It is why combat stopped framing the body as an adversary, why the body map is pinned to the top of Entreno, and why **Primeras veces** exists.

## The world and its lexicon

The app used to carry the complete Solo Leveling set — `"El Sistema ha despertado"`, ranks E→S, Monarca, Modo Sombra, Cazador, Portales, Mazmorras, Ascensión, Anomalías — and, worse, **three fictions that did not share a world**: a catalogue fantasy bestiary in the dungeons, a clinical-abstract register in combat, and sci-fi isekai in exploration. Three separate generations from one prompt. That incoherence gave it away more than the borrowing did.

One world now: **your body is the territory you are surveying.** `Dominio` in Spanish means both mastery and territory, so the title was already carrying the right meaning.

| Was | Is |
|---|---|
| El Sistema (narrator, 22 sites) | no narrator; the app speaks in second person |
| Ascensión / Ascenso / evolucionar | **Umbral** |
| Anomalías · neutralizar | **terrenos** · **recuperar** |
| Mazmorras · Portales | **Travesías** |
| Modo Sombra (Rango Z) | *el último rango* |
| Cazador (default name) · Sombra (default pet) | Atleta · (empty → "Tu compañero") |
| Ruinas Orbitales · Cartógrafo del Vacío | see **Explorar** below |

### Explorar: the one place where the map is literal

Exploration counted real kilometres and dressed them as haunted castles → space stations → a multiverse. It was the third incompatible fiction, and the odd part is that this system never needed one: you are actually covering ground with your own body.

The 27 nodes of `nodosExplorar` are now **what distance shows you** — places that exist and observations that are true (*La Subida de Siempre*, *El Último Farol*, *El Kilómetro Aburrido*, *El Día que No Querías*). Each `relic` is something you genuinely take away: Aliento Corto, Vista Larga, Pendiente Vencida, Señal Temprana. The last node kept its name and relic because it already said the right thing.

`sectores` runs outward from the city (La Manzana → Tu Propio Mapa) and `escalaCaminante` is the walker's ladder (Primeros Pasos → Sin Distancia). **Four km achievements mirror `escalaCaminante` by design** — change one, change the other.

**Do not reintroduce a narrating entity.** When a sentence needed an actor, the real actor already existed and it was the metronome, not a system.

Rank names no longer appear as letters anywhere in prose. Anything that said "Rango S" now says an ordinal ("el sexto rango") because the visible name depends on the modality.

## Rank titles: three sets, one per modality

The modalities' own display names live in `modalidades`: **Calistenia** · Fuerza de Acero · **Flow**. Flow used to be *Movilidad & Primal Flow*, described as "Patrones primal, animal flow y control articular": it shared a word with the Instinto Primal system (animal locomotion — Oso, Pato, Cangrejo) and described neither what its tables hold nor what that system is. Its exercises are capoeira, breaking footwork and freezes, handstands and hanging, which is what the description says now. Bodyweight used to be called *Dominio Corporal*, the product's own name, so the routine card read "Rutina de hoy / Dominio Corporal"; it was renamed for that reason. The short chips in Perfil and the achievement texts still say *peso corporal*, which is a description, not a name.

The rank already *was* modality-specific (`ejercicioDe(group, rank, modality)` resolves `ejerciciosPeso`, `ejerciciosGym` or `ejerciciosFlow`), but `descRango` had one set of descriptors written in bodyweight terms, so a gym player was being lied to.

```
bodyweight  Suelo · Eje · Recorrido · Palanca · Lado · Sostén · Oficio
gym         Barra · Disco · Forma · Carga · Tope · Máxima · Hierro
flow        Gateo · Apoyo · Giro · Enlace · Inversión · Quietud · Vuelo
```

`sdcTitulos` and `sdcDescs` hold them; `sdcRango(rank, profile)` and `sdcDescRango(rank, profile)` read them. **`nombresRango` and `descRango`, the old fallback, are gone**: `sdcJuego` always returns one of the three sets and each set carries all seven ranks, so the fallback could never be reached — `tests/rangos.test.js` holds both facts, and a new set or rank that misses one fails there. `nombresRango` was literally "Rango E"…"Rango Z", the letter-rank prose the identity pass removed from the screen. Internal keys `E..Z` are unchanged everywhere (`rangos`, `nivelUmbral`, `colorRango`, `factorRango`, the exercise tables) — only the display changed. A player with one modality never sees a choice; with two or three, a selector appears in Perfil → Métodos de entrenamiento.

## The no-migration pattern — prefer it over `cargarPartida`

`cargarPartida` is where old saves crash. Three fields were added without touching it at all, because **the getter self-defaults**:

```js
profile.tituloSet   → sdcJuego(p)    falls back to the first modality, then "bodyweight"
state.primeras      → sdcPrimeras(e) returns []
state.podia         → sdcPodia(e)    returns {}
```

Nothing is backfilled, so nothing can break on load. Verified by deleting all three from a real save: it boots with level, PD and history intact. **Reach for this before adding a default to `cargarPartida`.**

## Primeras veces

The app counted reps for a lifetime and never recorded the day you first did something you could not do — which is the thesis itself.

**The rule: the app never declares a first it did not witness.** Tying it to rank changes would be guessing; a player who already did pull-ups would be congratulated for something years old, and one lie destroys the feature. So it asks, once, non-blocking, one movement at a time (the first unanswered of today's four): *¿Alguna vez hiciste X?* → `Nunca pude` / `Ya podía`. Answering "nunca" sets the starting line; completing reps of that pattern later confirms it. Plus a manual button for what the app cannot see: `AnotarPrimera` in `perfil.jsx`, a field inside the card (it used to be `window.prompt()`, and `e2e/juego.spec.js` fails if a browser dialog ever comes back).

The third source in the original plan — *measured*, a personal record beaten — was **deliberately dropped**: almost every early session beats a record, so the list would fill with noise in week one.

**The hook is in `registrar()`, not in `registrarRutina`.** `registrarRutina` is the only function that settles XP and is the highest-risk code in the file:

```js
aplicar(f => sdcPrimerasHook(registrarRutina(f, modo, h, sdcModOk), h))
```

`sdcPrimerasHook` receives the finished `{state, notices}` and only appends. `registrarRutina` is byte-for-byte unchanged.

## `sdcTier` — the paired edits

`sdcTier` classifies notices by matching their **text**, so a notice and its matcher must change together or a reward renders as a grey bookkeeping line. Current epic matchers: `"Primera vez:"`, `"Cruzaste a"`, `"Subiste a nivel"`, `"Volviste al último rango"`.

Two rewards were already mis-tiered before anyone noticed: **winning a combat** and **clearing a dungeon** both fell through to `info`. Combat is fixed via `"Recuperaste"`; the travesía notice now says `"¡Travesía completada!"` so it matches the existing `"completada"`.

Pairs that must move together: the Umbral notice, the level-up, the return to the last rank, the weekly-streak loss, achievements, system unlocks, and **`"Rutina completa"`, which has five sites** — including the *Deshacer registro de hoy* filter.

## Voice: what is voseo and what is not

The game speaks **voseo rioplatense**. Two registers stay in neutral Spanish on purpose:

- **Medical**: `alarmas` (red flags), `reglaDolor` (the pain rule), `cuidadoArticular` (the eight joint protocols) and their render. The right voice there is clinical, not the author's.
- **Execution instructions**: skill steps in `habilidades`, `alt`/`cue`/`how`/`dose` in `ejerciciosPeso`/`ejerciciosGym`/`ejerciciosFlow`, and the Primal movement descriptions in `movimientosPrimal` (which are descriptive, not second person).

`sdcMods` **cannot** be voseado regardless: `sdcTempoMod` reads `/baja(?: el peso)? en (\d+) segundos?/i` and `bajá` breaks it.

**The last tuteo in the game's voice went on 2026-09-26**, found by scanning every string for second-person *tú* forms (present, imperative, and the accented enclitics a *tú* imperative carries: *asegúrate*, *guárdalo*, *Prepárate*, against voseo *asegurate*, *guardalo*, *Preparate*) and reading each hit, since most were false positives — nouns (*Marcas personales*), third persons (*la racha sigue*) and forms that are the same in voseo (*te vas*, *sé paciente*, *la XP es tuya*). Thirteen changed, all-or-nothing with counted matches: *Considerá parar por hoy*, *Aprendés el gesto*, *seleccioná todo* (twice), *Tenés que dejar al menos un método activo*, *usá* in the test panel, *Pegá acá tu respaldo y recuperás…*, the two *Pegá acá* placeholders, *Anotalos acá*, *asegurate de descansar bien*, *copiá este texto y guardalo*, *Preparate…*, and *usalo* in the joint-care intro. **Left in neutral on purpose**: every execution instruction (exercises, skill steps, warm-up and stretching descriptions, Primal), the day's modifiers (`sdcMods` — *Termina cada serie*, *Mantén*, and the `baja` that `sdcTempoMod` reads), and the medical text, which includes the joint-care disclaimer *Si ya tienes una lesión, consúltalo…*. *Aquí* became *acá* where the game speaks.

**The app states rules; it never defends them.** Say what something does and what it gives ("Da 10 XP una vez por día", "Cuenta como día entrenado, sin XP"), never why we designed it that way. Eighteen strings were cut for this: *poca a propósito, porque es preparación*, *para no abrumarte al empezar*, *para no estorbarte*, *eso es a propósito: la prueba ajusta…*, *es la única forma de que veas…*, *porque no hay forma de saber cuánto hiciste*, *el último rango exige constancia*. The reasoning belongs in this file, not on the player's screen. Instructions about the body are a different thing and stay — *es un ensayo, no una serie* tells you how hard to go, it does not excuse a number. One of the cut strings was also false: the fitness test warned that inflating your reps would "fail your daily missions, lose your streak and earn no XP", and none of the three is true.

**Never run a word-level replacement blind.** A dry run over the whole file caught nine false positives that a global `sed` would have broken silently: `"skills completas"` and `"Repeticiones base bajas"` (adjectives), `"Las marcas sirven"` and `"Marca del Caminante"` (nouns), `"Marca el tempo"` and `"Sube al alcanzar"` (third person), `"varias activas"` (adjective) — and **`misRevisar(e, notas)`, where `notas` is a minified parameter, not the verb.** That one would have broken missions entirely. Same family as the documented `golpesNecesarios(e)` trap.

## Text passes over the whole game

For a word-level pass (voseo, a renamed system, a lexicon change), build the list first and apply it **all-or-nothing**: count every match, print each one with context, and abort the whole batch if any count differs from what you expect. A partial batch is much worse than none. Protect ranges by *anchors*, never by fixed offsets.

`core.autocrlf` is `true` at system level on this machine; `.gitattributes` (`* -text`) keeps git from converting the repo to CRLF. It mattered most for the byte-offset editing of the old single file, and it still keeps diffs clean.

## Timers: the fix for "botones de honor"

Two systems used to hand you a form: the *travesía* ("Completar travesía") and Explorar (type your km). The instinct is to call this a cheating problem and add verification. It is not — there is no account, no server and no leaderboard, so the only person a false number fools is the one who typed it.

The real defect is visible next to the routine: there you tap each set *while doing it* and the app answers (beep, vibration, floating XP, rest timer). The travesía asked you to file a report afterwards, and **a form cannot teach you anything about your body**, which is the whole thesis.

So both became accompanied sessions:

- `CronoTravesia` runs the challenge's real duration with the screen awake, and only then enables completion. Five travesías carry their own intervals in `sdcPortales` (`on`/`off` seconds) and show **FUERTE / SUAVE** with a beep at each change; La Guardia uses real 3′/1′ boxing rounds. The continuous ones beep every 5 minutes.
- `CronoCaminata` times a walk and estimates km from a pace picked once (`profile.ritmoKmH`). It **does not add the km itself**: it drops the number into the existing manual field so you confirm it with `+ Tramo`. An estimate must never disguise itself as a measurement, and the whole downstream flow stays untouched.

**Elapsed time is computed from a stored timestamp, never by decrementing.** `BarraDescanso` (rest) used to count down with `setTimeout` each second, which drifts and freezes when the phone locks or you switch apps; it now takes `ini` (`sdcDescIni`, stamped by `sdcSerie`) and computes the rest from it too. `CronoTravesia` and `CronoCaminata` store `startedAt` / `walkStart` in state and compute `Date.now() - start`, so a full page reload resumes exactly where it was. Verified.

**Both keep an escape hatch** — "Ya la hice, sin el teléfono", and the manual km field. Going for a run without your phone is not cheating, it is Tuesday. Let it exist; just do not make it the first thing.
