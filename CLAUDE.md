# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

"Dominio Corporal" is a gamified bodyweight-training web app in Rioplatense Spanish (ranks, XP, long cardio sessions called *travesias*, a pet companion). It used to be called "Sistema de Dominio Corporal" and its whole lexicon was borrowed from Solo Leveling; that was removed deliberately (see **The world and its lexicon**). It is a **single-page app with no build step**: `index.html` (~440 KB) contains an already-minified React 19 bundle inline.

**There is no source code for the bundle.** It began life as a Claude Artifact and was ported to a standalone site. You cannot rebuild it â every change is a surgical text edit to minified JavaScript. Treat `index.html` as the source of truth and edit it in place.

`diseno/DISENO.md` is the design brief the author loads into a claude.ai Project to design from the phone, with `diseno/instrucciones-proyecto.md` as that Project's instructions. It is written in Spanish, for a reader without the code. **When a system, a number or a design rule changes, update it in the same commit**, or the phone Claude designs against a game that no longer exists.

Deployed files: `index.html`, `storage.js`, `sw.js`, `manifest.webmanifest`, `privacidad.html`, `fuentes/` (five woff2 files), and three icons â `icon-192`, `icon-512` and `icon-maskable-512`, the last one padded to 78% so a round Android mask does not crop the logo. `PENDIENTES.md` tracks what is left before publishing and is worth reading before starting work.

`storage.js` must load **before** the bundle: it defines `window.claude.use("db")` against `localStorage`, replacing the Claude Artifacts database the app was written for. All progress lives in one key, `dominio-corporal:player/state`. There is no server and no account.

## Editing the minified bundle

This is the part that will bite you. Follow it exactly.

**Always verify the match count before replacing.** Never run a blind `s///`. Count occurrences, abort unless the count is what you expect, then replace. A pattern that silently matches zero times leaves you debugging a change that never landed; one that matches twice corrupts unrelated code.

**Beware perl variable interpolation in patterns.** `"$Qtienda$Q,"` parses as the variable `$Qtienda`, not `$Q . "tienda" . $Q`. This exact bug once deleted the first `",` in the whole file â inside React's own code â producing a `SyntaxError` far from anything being edited. Use `${Q}tienda${Q}` or build strings with explicit concatenation.

**Two incompatible encodings coexist.** The original bundle writes non-ASCII as escapes (`m\xE1s`, `â`, `\xBF`), while text added later is real UTF-8. When matching original strings you must reproduce the literal backslash sequences â build them with `chr(92)."xE1"` rather than typing them, because an em dash typed as `â` can arrive as a real `â` byte and silently fail to match. For **new** strings prefer real UTF-8 (the file is UTF-8 and `<meta charset>` is set); write them via the Write tool to a scratch file and splice that in, which sidesteps escaping entirely.

**Name everything you add with an `sdc` prefix.** The minifier's own identifiers are one or two characters (`Is`, `jd`, `Aa`, `b5`), so a plain name risks colliding with one you have not read yet, and a collision inside a 450 KB single line is close to undebuggable. `sdcBase`, `sdcSplit`, `sdcSerie`, `sdcTier` and friends are all hand-written; `grep -o 'sdcFoo' index.html | wc -l` before adding one tells you instantly whether the name is free. Note that `grep -c` is useless here â the file is one line, so it always answers 1.

**Check what a grep actually matched before "fixing" it, in both directions.** An audit once flagged `coger` three times as peninsular Spanish; all three were `encoger`. But the same audit declared `el movil` a false positive, and it was real: the neuromotor section said `deja el movil apoyado`. A term being absent from one spelling does not mean it is absent. The app now speaks **voseo rioplatense** in the game's voice; only the medical text and the exercise-execution register stay in neutral Spanish.


**Validate after every edit:**

```bash
perl -MEncode -0777 -ne 'my $ok=eval{Encode::decode("UTF-8",$_,Encode::FB_CROAK);1}; print $ok?"UTF-8 valido\n":"BYTES INVALIDOS\n";' index.html
```

**If the app breaks with a syntax error**, find the corruption by diffing against the last good commit â the first divergence should be inside your edit, and if it is not, that is the damage:

```bash
git show HEAD:index.html > /tmp/head.html && perl -0777 -e '
sub rd { my $p=shift; open(my $f,"<:raw",$p); local $/; my $c=<$f>; close $f; $c }
my $a=rd("/tmp/head.html"); my $b=rd("index.html");
my $m=length($a)<length($b)?length($a):length($b); my $i=0;
$i++ while $i<$m && substr($a,$i,1) eq substr($b,$i,1);
print "divergencia en $i\n", substr($a,$i-90,180), "\n---\n", substr($b,$i-90,180), "\n";'
```

### Extracting or moving a whole element

To remove or relocate a React element you need its exact end, and naive paren counting breaks on parens inside strings and template literals. Recreate this helper at `/tmp/jsx.pm` and call `jsx::span($html, $startIndex)`:

```perl
package jsx;
my $BT = chr(96); my $BS = chr(92);
sub span {
  my ($h, $from) = @_;
  my $open = index($h, '(', $from);
  return (-1,-1) if $open < 0;
  my $depth = 0; my $i = $open; my $n = length($h);
  my $q = ''; my @tpl;
  while ($i < $n) {
    my $c = substr($h,$i,1);
    if ($q ne '') {
      if ($c eq $BS) { $i += 2; next; }
      if ($q eq $BT && $c eq '$' && substr($h,$i+1,1) eq '{') { push @tpl,1; $q=''; $i+=2; next; }
      if ($c eq $q) { $q = ''; }
      $i++; next;
    }
    if ($c eq '"' || $c eq "'" || $c eq $BT) { $q = $c; $i++; next; }
    if ($c eq '(') { $depth++; }
    elsif ($c eq ')') { $depth--; return ($from,$i+1) if $depth==0; }
    elsif ($c eq '}' && @tpl) { pop @tpl; $q=$BT; }
    $i++;
  }
  return (-1,-1);
}
1;
```

Start from the index of `i.default.createElement(ge,{id:"<cardId>"`. Children are comma-separated, so removing a block means removing it *and* its trailing comma.

**Prefer not moving blocks at all.** To reorder cards, wrap the container in a flex column and set `order` on the one card that must move â that is how "Rutina de hoy" is pinned to the top of the Entreno tab. Moving text risks far more than a style property does.

### The metronome

`D5({active, tempo})` is the tempo guide above the four exercise rows. It cycles BAJA → PAUSA → SUBE with a beep per phase and counts nothing: it never sees your target, your sets or the rest timer.

Its default is 2s/1s/2s, but `sdcTempoMod(modifier)` overrides that from the day’s modifier text, because otherwise the screen contradicted itself — on a **Tempo** day the modifier said "baja en 3 segundos" while the metronome insisted on 2, and following one broke the other. It reads `/baja(?: el peso)? en (\d+) segundos?/i` and doubles both movement phases on "mitad de velocidad". Three of the eighteen modifiers adjust: Tempo (bodyweight and gym) to 3/1/2 and flow’s Control to 4/1/4. **If you reword a modifier, re-check that regex** — "Drop set" says *baja el peso* and "Carga alta" says *baja las repeticiones*, and both must keep falling through to the default.

The fitness test used to run a **different** cadence (2s down, 1s up, no pause: 3s per rep against the metronome’s 5s), so the test measured more reps than a player could then do at routine tempo — reported as "me da muchas sentadillas". It now runs the metronome's own 2/1/2 (see **Fitness test and calibre**). One gap is still open and it is a design call: one global metronome sits above four exercises even when one of them is a hold, where an up/down cycle means nothing. The help topic says so out loud rather than pretending otherwise.

### The body diagram

`g5({view, colors, glow, ratios, selected, onSelect})` draws the figure in "Tu cuerpo". It used to be six rounded rectangles; it is now an angular anatomical figure built from paths, but **the contract is unchanged** and must stay that way: `viewBox "0 0 200 300"`, the same four groups (`squat`, `pushup`, `back`, `abs`), and every interactive part spreading `r(group)` so it gets its fill from `Rs(ratio)` â a ramp from `rgb(42,49,72)` to `#ff6b4a` â plus the white stroke when selected and `sdcPulse` at 100%.

Three local helpers keep it readable: `sdcPar(d, group)` draws a path and its mirror (`translate(200,0) scale(-1,1)`, so x becomes 200-x), `sdcSim(d, group)` draws a part that is already symmetric and must not be doubled, and `sdcIne(d, dup)` draws inert anatomy. Parts that the game does not measure separately are folded in rather than given their own colour: forearms and hands go with `pushup`, calves with `squat`, and neck, hips, knees and feet stay inert. **Do not colour a part as its own group unless the game actually tracks it** â the figure would be claiming to measure something it does not.

### Touch targets

Measured, not guessed: the tab bar was 34 px tall and the meta steppers 32 px, both well under the 44â48 px that Android and iOS ask for. They are now `minHeight:48` and `44Ã44`. `button` also carries `touch-action:manipulation`, which drops the 300 ms double-tap-zoom delay. Still small and not yet raised, because raising them changes the visual density of every card: the collapsible headers (21 px, but full width), `ð¡ alternativa` (21 px) and the `?` in the header (22 px).

### Fonts

**The app makes zero network requests after it loads.** Chakra Petch (400/500/600/700) and Inter (one variable file, 100â900) live in `fuentes/` and are declared with `@font-face` at the top of the head `<style>`, latin subset only â which covers every accent and `Â¿Â¡` Spanish needs. They used to come from Google Fonts, twice: a `<link>` in `<head>` and an `@import` React injected in `w5`.

Self-hosting was not only about speed. A request to `fonts.googleapis.com` hands Google the user's IP, which a privacy policy has to declare; now `privacidad.html` can say "ninguna" and mean it. If you ever add a CDN, a web font or an analytics tag, **section 4 of `privacidad.html` becomes false** and has to be updated in the same commit.

### Styling constraint

The CSS at the top of `index.html` is a small hand-written subset that *looks* like Tailwind but is not. Only the classes defined there exist â `justify-end`, for example, does **not**, and silently does nothing. Check the `<style>` block before using a utility class, or use an inline `style` object.

## Running locally

Node and Python are not installed on this machine (`python` is the Microsoft Store stub). `.claude/serve.ps1` serves the folder with a PowerShell `System.Net.HttpListener`, and `.claude/launch.json` points the Browser pane's `preview_start` at it (config name `dominio-corporal`, port 8787). It binds to `http://localhost:<port>/`, which needs no elevation, sends `Cache-Control: no-store`, and rejects paths that escape the root. `localhost` is not reachable from a phone on the LAN â to test on a real device, deploy.

Testing notes that save time:
- **15â20 s pass before the first button appears, but only ~5 s of that is the typewriter** (140 characters at 28â40 ms). The rest is the 450 KB bundle. Wait for it; do not assume a blank page is a crash.
- Driving the app by clicking a `ref` is unreliable here: refs resolve to stale coordinates when the page scrolls between the `find` and the click, and a miss can silently hit "Usar mi dÃ­a de descanso" and burn the day. Prefer `javascript_tool` to click by text when scripting a test run.
- Reuse a **fresh browser tab** to read console errors. The console buffer persists across navigations, so a fixed error keeps reappearing.
- Clear `localStorage`, unregister the service worker and delete caches between runs, otherwise you test a stale bundle.
- "Saltar y empezar con valores por defecto" skips onboarding, but only activates the bodyweight modality.
- `get_page_text` returns DOM order, not visual order â it will not reflect flexbox `order`. Use a screenshot.
- The Perfil tab still has the **Panel de pruebas** for jumping ranks and forcing ascension without training, but it no longer announces itself: the entry point is a dim `v1.0` at the bottom of Perfil that opens it after **five taps** (`sdcDevN`). Sixteen destructive actions, one of them `Desbloquear todos los logros`, should not be one tap away from a curious player.

### The first paint, the first card, and the day you forgot

Three things that a distracted person feels and a developer never does, all measured before being touched.

**`index.html` now paints something at ~170 ms.** The HTML arrives in 42 ms and `domInteractive` is ~170 ms, but the app's first button took **4.4 s on a fast desktop** — realistically 8–12 s on a mid-range phone — because 498 KB of inline React has to parse. Nothing can be done about the parse without a build step, so `<body>` now opens with `#sdcSplash`: a fixed overlay with the product name, `Hola de nuevo, <name> · Nv. N` read straight from `localStorage`, and a sliding bar, removed by a `MutationObserver` on `#root` the moment React mounts (plus a 25 s failsafe). The same seconds, but the app looks alive instead of broken.

> Two traps here. The script has to sit **after** `<div id="root">` or `getElementById('root')` returns null and the splash never leaves — which is exactly what happened first. And `raw.charAt(0)==='{'` put a lone `{` inside a string and broke the `{}` delta check for every future session; the try/catch around `JSON.parse` already covered that case, so the test was dropped.

**"Rutina de hoy" starts at y=478 instead of y=1222.** The body map was pinned above it (`order:-2` against the routine's `-1`), which is right the day you discover the app and a scroll-and-a-half tax every day after. The routine is now `order:-4` and the map is `c.completed ? -4 : -2`, so the map returns to the top once you have trained — there it is a reward, not an obstacle.

**A day you forgot can be logged.** Tapping an `empty`, `skipped` or `missed` square in Constancia offers *"Entrené este día y me olvidé de anotarlo"*, behind a confirm step. `sdcDiaPasado` writes `history[f]="partial"`, marks `dayLog[f].acts` as `"Anotado después"`, adds the date to `week.sessionDates` when it falls inside the current week, and **gives no XP** — there is no way to know how many reps you did, and the notice says so. `sdcRachaCalc` then walks back from today through `history` counting `full`/`partial` (with `rest`/`shield` preserving but not adding) and the result is applied **only if it raises** `streak.current`. A retro-log can never shorten a streak, which is what makes it safe to get wrong.

## Deploying

`git push` to `main` is the deploy. GitHub Pages serves the repo root from `main` at **https://santiagoarague.github.io/dominio-corporal/**, usually live about 30 seconds after the push. There is no build command; `.nojekyll` keeps Pages from running Jekyll, which would otherwise drop anything starting with a dot â including the `.well-known/assetlinks.json` a TWA needs.

Netlify was dropped: it silently stopped deploying and sat five commits behind while every push reported success. `netlify.toml` has been deleted. The repo had to be made **public**, because Pages on a private repo requires a paid plan. The old Netlify site is still online serving stale code and should be deleted by hand.

Always confirm the change actually reached production rather than trusting the push:

```bash
until curl -s "https://santiagoarague.github.io/dominio-corporal/" | grep -q '<marcador>'; do sleep 10; done
```

Note for packaging: the app lives in a **subdirectory**, so `assetlinks.json` cannot sit at the domain root. A TWA will need the repo renamed to `santiagoarague.github.io` or a custom domain.

## The service worker

`sw.js` is network-first, so with a connection the player always sees the latest deploy and without one they get the last copy. Two things about it are load-bearing and were both wrong until recently:

**The HTML is fetched with `cache: 'reload'`.** Without it, network-first was a lie: the service worker's own `fetch()` goes through the browser's HTTP cache, GitHub Pages sends `max-age=600`, and the worker cheerfully served â and then re-cached â a copy up to ten minutes old. Measured in production: the plain fetch returned 470,323 bytes (the previous deploy) while `cache: 'reload'` returned 470,860 (the one just pushed). This is exactly the "why can't I see my changes on my phone" symptom. Only documents get this treatment; fonts and icons are fetched normally.

**Only same-origin 200s are cached.** It used to cache any response, so a 404 or a 500 became the stored offline copy.

Bump `CACHE` when the asset list changes; `activate` deletes every other cache name. If the app seems frozen on an old version during testing, unregister the worker and delete caches rather than assuming the deploy failed â but check production with `curl` first, because that distinction is the whole reason Netlify went unnoticed for five commits.

## Architecture


### State and persistence

One plain object holds everything, deep-cloned with `M(e)` before mutation and saved with `K(e)`. Key branches: `profile` (name, modalities, classification, focusProfile, weeklyGoal), `progress` (rank, level, currentXP), `today`, `week`, `month`, `streak`, `dominion`, `missions`, `lifetimeReps`, `lastTrained`, `history`, `dayLog`, `ui`.

`ei(state)` is the load/migration path: it backfills missing fields, rolls the day and week over, and ends by calling `misRevisar` then `Ea`. **Any new state field needs a default here**, or old saves crash. Existing saves in the wild predate every field added recently.

### The two functions that matter

`i5(state, mode, reps)` records a completed routine: accumulates reps into lifetime/week/month, updates records and `lastTrained`, awards Dominion Points, applies the streak and history bookkeeping, computes XP, then runs `misRevisar` â `Ea` â `da` (achievements) â `ni` (training-load warning).

`Ea(state, notices)` is the level-up loop: while `currentXP >= li(level)` it levels up; when `level >= au[rank]` it flags an Umbral instead. `li(e)` is the XP cost curve: `e<50 ? 45+3e : 5e-55`. The two branches used to be `45+3e` and `125+5e`, which met badly â `li(49)` was 192 and `li(50)` was **375**, a 95% jump inside one level. The second branch was rebased so the curve is continuous at 50 while keeping the steeper slope. `li(1)` is still 48, and it has to stay there. Because XP only converts to levels inside `Ea`, **anything that grants XP must be followed by `Ea`**, and `ei` calls it on load so curve changes apply retroactively.

### Multi-session days

A day can hold one routine per modality. `today.doneModalities` lists the ones finished; the second and third sessions get +25% and +50% XP. Day-level bookkeeping â streak, `week.trained`, `week.fullDays`, `history`, the low-effort penalty and Dominion Points â must fire **only on the first session**, gated on that array being empty. `Dl()` is already idempotent per day for the streak, but the rest is not.

**`today.reps` is the *session*, `dayLog[date].reps` is the *day*, and anything showing "hoy" has to read the second one.** `i5` **assigns** `o.today.reps = l` and `mmNueva` zeroes it to open the next session, while `dayLog[date].reps` accumulates. The body map's Hoy view read `today.reps`, so after a bodyweight session followed by a flow one it showed 24 · 19 · 22 · 24 — only flow — while the very same card's XP line read 264, the sum of both. `sdcHoyReps(state)` returns the day total (`dayLog` first, `today.reps` as the fallback for a day whose log entry does not exist yet).

The denominator had the same shape of problem, so `dayLog[date].meta` now accumulates each session's target the same way its reps do. It is written by **`sdcMetaHook`, wrapped around `sdcPrimerasHook` in `pg()`** — `i5` stays byte-for-byte unchanged, same as the Primeras veces hook — and read through `sdcHoyMeta(state, fallback)`, which falls back to the current routine's target for saves that predate the field.

While a session is unregistered, both numbers add the live part: `sdcRepsHechas()` for the reps and `J` for the target, gated on `c.completed || doneModalities.includes(B)` so a registered session is never counted twice. The result is that Hoy finally means what its caption says:

```
antes de entrenar          0/33    (era 33/33 — pintaba el cuerpo entero al 100%)
una serie marcada         13/33
sesión 1 registrada       33/33
empieza la 2ª modalidad   33/57    (el denominador crece, el numerador se conserva)
ambas registradas         57/57    (era 24/24)
```

`v5`, the zone panel, takes the same two numbers, so "Hoy: 57 / 57 reps" agrees with the row above it. Undo restores `dayLog` from the snapshot, `meta` included, so it rolls back with everything else — verified.

### Undo has to undo everything the session wrote

`s5` rolled back XP, level, PD, lifetime and weekly reps, records, history and streak, but **not** `month.reps`, the three modality counters (`week.modalities`, `month.modalities`, `lifetimeModalities`) or the achievements the session unlocked. Found by the test suite on the `modernizacion` branch: three register → undo cycles left the month at 36 squats for 12 done, the modality count at 3 for one session, and — because `s5` subtracted the achievements' PD while the achievements stayed unlocked — re-registering paid 3 PD instead of 5. Monthly missions read `month.reps` and nine achievements read `lifetimeModalities`, so an honest player who undid one mistaken registration was already inflating both.

Both functions stay untouched; the fix wraps them like the other hooks. `pg()` now ends in `sdcDeshacerHook(f, …)`, which stores the pre-session `achievements` in `undoSnapshot.ach`, and the undo button calls `sdcDeshacer(f)`, which runs `s5` and then subtracts the snapshot's reps from `month.reps`, takes one off each modality counter for `Md(profile, today.date, today.modality)` (the restored `today`, so it is the modality of the session being undone) and restores the achievement list. A snapshot written before this change has no `ach`, and undo then behaves as before for that one day.

### Exercise selection

Rank (`ve` = EâZ) picks the exercise **variant**; the fitness test picks the **volume**. Tables: `by` (bodyweight), `F2` (gym), `P2` (flow â only `squat` and `abs`; push and pull fall back to `by`), resolved by `_d(group, rank, modality)`. Every entry has an `alt` string, surfaced by the "ð¡ alternativa" button, which must name a real equipment-free substitute rather than a technique tip. Targets come from `Oy(state)`; the four groups are always `squat`, `pushup`, `back`, `abs`

**A rung can hold one exercise or several.** `_d(group, rank, modality, date)` returns a plain entry unchanged, and picks from an array with `Dd(date|group|rank|modality, n)` — the same hash `sdcModDia` uses. Mixed shapes coexist on purpose, so a table can be widened one modality at a time without touching the other two.

That matters because the routine had **zero** day-to-day variation in the exercise itself: `_d` never saw the date, so your rank fixed the four movements and the only thing that changed was one of six modifiers. Rank E runs to level 50, which is **5.880 XP** — about 36 sessions for a player with a strong fitness test and **~85 for a beginner** at ~70 XP a session. Two to seven months of the identical four exercises.

All three tables now carry **three per rung**. Counts today: bodyweight 4×7×3 = 84, gym 4×7×3 = 84, flow 4×7×3 = 84 — **252 exercises**, from 70.

**`P2` is complete: all four patterns, 84 entries.** The pull table was the hard one and it was built from movements that **genuinely pull**, not from bridges and scorpions dressed up as pulling. Breakdance and capoeira have no vertical pull, so the ladder draws on the three places where this world does pull: **hanging** (passive → active → swing → skin the cat → front lever, which is core to movement practice and to what LeoMoves teaches), **floor dragging** (arrastre con trapos, de comando, de foca — lat-driven and needs no equipment), and the **macaco**, where you genuinely pull yourself over the planted arm. If you add rungs here, keep that test: it belongs only if the lat or the bicep does the work, because `Fo.back` promises "dorsal ancho, trapecio, bíceps" and the body map pays out on that promise.

The flow vocabulary is drawn from the two references the author named — **LeoMoves** (Leandro Fornito: breakdance and acrobatics, animal locomotion, handstands) and **HIIT the Beat** (Peter "Petair" Sowinski, three-time German breakdance champion: HIIT with breaking elements at graded levels) — plus capoeira and breaking fundamentals. The ladders follow the real teaching order: breaking runs toprock → footwork (2-step, 6-step, CC) → freezes (baby → elbow → shoulder) → powermoves (windmill); capoeira runs ginga → negativa → rolê → aú → queda de rins → macaco → bananeira. **Keep that order if you add rungs** — a freeze before footwork is not a difficulty choice, it is a wrong curriculum.

`F2` has no `label` field (only `by` does) and its `alt` strings are loading and technique cues rather than equipment-free substitutes, which is right in a gym — but the new ones name a real fallback whenever the machine can be taken or missing ("Sin máquina: fondos entre dos bancos"), because the rotation can land you on a day whose implement is not free.

### The exercise has to teach itself, because there is nowhere to send the player

The app makes zero network requests after it loads and `privacidad.html` says so, so **a link to a video is not available as an answer** — it would hand the player's IP to Google and make section 4 false. Whatever a video would have taught has to be in the text.

It was not. Each of the 252 exercises carried exactly one instruction string, `alt`, and that string was doing three jobs at once: how to execute, what to do without the implement, and how reps convert to seconds. Measured, 56 of the 252 were under 50 characters, and the short ones were not short because the movement is obvious:

```
Plancha lateral      → "Cuenta 1 rep por cada 3 segundos por lado."
Hollow body hold     → "En hollow hold, cuenta 1 rep por cada 3 segundos."
```

The second defines the term with the term. And the only door to any of it was a button labelled **💡 alternativa** — nobody who does not know the movement taps a button called "alternative".

**Three fields, one question each.** All **252** entries — `by`, `F2` and `P2` — carry `pos`, `mov` and `err` beside their `alt`:

| field | the question it answers |
|---|---|
| `pos` | where your body is before rep 1 |
| `mov` | what moves, and where it stops |
| `err` | the one thing that ruins it or hurts you |

`sdcGuia(rank, group, modality)` returns the entry when any of the three is present, `null` otherwise. Nothing falls back any more, but keep that branch: it is what let the three tables be filled one at a time across three deploys, and it is what a new rung gets before anybody writes its guide.

**In the gym the `err` line is the safety line.** A wrong cue on a leg extension is a wasted set; a wrong cue on a barbell squat is a disc. So the gym errors name the failure that hurts and what to do about it — *si la espalda baja se redondea al final, para justo antes: eso es lo que lesiona*, *nunca hagas esto sin seguros: la pausa es justo donde una serie se cae* — rather than a form nicety.

**In flow the `pos` line carries the whole load, because the names teach nothing.** *Macaco*, *queda de rins*, *rolê*, *aú*, *6-step*, *baby freeze* — a player reads those and knows exactly as much as before. So the flow guides never use a term the table has not already placed on the floor: `pos` describes bones and angles (*en cuclillas con una mano en el suelo detrás de la cadera, dedos hacia ti*), and when a position has a name that recurs — bestia, cangrejo, la negativa — it is spelled out the first time it appears at each rung rather than assumed. Same for the breaking vocabulary: the 6-step is *seis pasos en círculo alrededor de las manos*, not "el círculo básico".

The measured cost is the same in all three: the routine card runs about 1120 px closed and about 2000 px with the four panels open, and the `vistos` gate closes them after the first session.

**The register is neutral Spanish**, like every other execution instruction (see **Voice**): `Baja el pecho`, never `Bajá el pecho`. And the panel is **14 px at 1.5 line-height in `#c8d0e4`**, not the shared `text-xs`, for the same reason the guide moved off it: 12 px at 1.0 was never meant for paragraphs.

**Density is paid for by opening it only when it helps.** Four panels cost 860 px — the routine card goes 1117 → 1977 px with all of them open, measured — which is unacceptable every day and exactly right on day one. So `state.vistos[exerciseName]` records that you registered a session containing that exercise, written by **`sdcPrimerasHook`** in the same loop that already resolves the four names (so `i5` stays untouched, and `sdcVistos` self-defaults to `{}` — the no-migration pattern). `Is` takes `abrir:!sdcVistos(e)[name]` and starts open for a movement you have never done.

The open flag is therefore **tri-state**: `useState(null)` means "follow `abrir`", and a tap writes an explicit `true`/`false`. An effect resets it to `null` on `[label]` so the next exercise gets its own default rather than inheriting your last tap. Verified: open on a new player, closed after registering, open again when a rank change brings a new movement, and the button toggles both ways in either state.

### Holds: `repFactor` has to pay for the seconds

An exercise whose `alt` says "1 rep = 3 segundos" costs three times what a dynamic rep costs, and nothing in `jd` knows that — the model multiplies `base × W2 × repFactor` and hands the result to a UI that prints it as seconds. An audit of all 252 variants found the damage concentrated exactly there:

| | was | is |
|---|---|---|
| Longest hold, first set | **60 s of freestanding handstand** | 30 s |
| Gym `Plancha con disco`, total | **120 s** | 54 |
| Gym `Pallof press pesado`, total | **135 s** | 42 |
| Flow `Pino libre`, total | **96 s** | 36 |
| Biggest single set | 24 reps | 20 |
| Flow reps/day (salud) | 141–223 | 94–141 |

Two changes. `sdcModBase.flow` dropped from `{60,55,55,60}` to `{40,36,36,40}` — flow's base was *above* gym's while its reps are slower and half of them are holds. And every hold whose total passed 75 s had its `repFactor` recomputed against a target curve of 60 s at rank E sliding to 30 s at Z, using the **same regex `sdcSegs` uses** so the audit and the UI agree.

**So: when you add a hold, set its `repFactor` from the seconds you want, not from how hard the movement feels.** `rf = target_seconds / (seconds_per_rep × base × W2[rank])`.

One thing was left alone deliberately: **gym reps still climb with rank** (117/day at E to 190 at C) although the section above says "in the gym the variable is the load, not the reps". A rank C gym player is asked for 20 reps of barbell squat in the first set — hard but real. Flattening `W2` for gym would fix the inconsistency and change XP per session for every gym player, so it is a design call, not a bug fix.

**Every `alt` that needs an object has to say what to do without it, and 51 of them did not.** The rule was already written for `by` — "the `alt` must name a real equipment-free substitute" — but it had only ever been applied to the rungs where the object was in the *name*. An audit of all 252 found the gap in the ones where the object hides in the instruction: `Remo invertido con pausa arriba` says "el pecho pegado a la mesa", `Remo a un brazo con mochila` assumes you own a backpack, and half of `P2.back` quietly assumes a pull-up bar because only the first rung said `Sin barra`.

Two kinds of missing exit were fixed:

- **The object you may not own.** A towel, two rags, a backpack, a bar, a table, a loading belt, an ab wheel, a cable station, a machine. Each now names a substitute you can reach: a water jug or a pillowcase of books for the backpack, an inverted row under a table for the bar, dumbbells for the cable, a barbell with plates that roll for the ab wheel.
- **The object you own that does not work where you are.** `Arrastre con trapos` and both ab-wheel rollouts need a **floor the rags slide on**; on carpet they do nothing, and nothing said so. Those now open with "sobre alfombra no deslizan" and give the movement that replaces them.

Coverage after the pass: `by` 39/84 alts carry an explicit way out, `F2` 53/84, `P2` 37/84 — the rest need no object at all.

**The register for these is neutral Spanish, not voseo** (see **Voice**), so the new clauses say `lleva`, `deja caer`, `sujétate`, never `llevá`. And the substitute still has to be the same movement pattern: `Fo.back` promises "dorsal ancho, trapecio, bíceps" and the body map pays out on that promise, so a missing bar falls back to a row, never to a bridge.

**When adding a variant, `repFactor` is the safety valve.** It scales the prescribed reps, so a harder option at the same rung must carry a lower one — the arrow push-up at `.5` against the strict at `1`. And the `alt` still has to name a real equipment-free substitute, because the rotation means a player can land on the barbell-free day and still need somewhere to go.
.

Everyone starts at **rank E, level 1** regardless of the test. The test sets volume and calibre only, so stronger players do more work and climb faster without being handed dangerous movements. This is deliberate â do not wire the test's `rank` field (it is computed in `vy` and intentionally discarded).

### Volume

`jd(rank, classification, focus, modality, testResults)` = `round(base Ã W2[rank] Ã repFactor Ã repMult[focus])`, per group. `Oy(state, rank)` is the only caller that has the state, and it passes `state.profile.testResults`; `I2` (ascension test) and `hd`/`uy` (combat) take it as a trailing argument so every path prescribes the same volume.

`base` comes from `sdcBase(testResults, classification, modality)`, and **each modality has its own model** because they are programmed differently:

- **bodyweight** â derived from the player's measured maxima: `max(yy[classification][g], min(340, round(testMax Ã 1.15)))`. `W2.E` is `0.6`, so at rank E the daily total lands near 0.7Ã a single all-out set. `back` uses the measured pull result, falling back to `pushup Ã 0.85` only for saves that predate the pull test.
- **gym / flow** â fixed tables in `sdcModBase`, ignoring the test. In the gym the variable is the load, not the reps, and the player adjusts with the `kg` field; `repMult` then lands the sets in the right ranges (fuerza 8/7/5, salud 12/10/8, resistencia 17/14/11).

`yy[classification]` survives only as a **floor** on the bodyweight path, so this can raise a target but never lower one. Before this existed, the ceiling at rank E was 14 squats a day for everyone, including a player who did 114 in the test.

### Sets

The daily target is split into tappable sets. `sdcNSets(total)` gives 3 sets at â¥6 reps, 2 at â¥3, else 1 â so no set is ever worth 0. `sdcSplit(total, n)` distributes them **descending** (40/33/27, or 55/45 for two) because a flat split pretends the last set is as cheap as the first; it is not, and the fatigue lands exactly where the player is least able to absorb it. `sdcSuma(total, n, k)` returns the reps inside the first `k` sets.

`Is` renders the chips and `sdcSerie(group, k)` handles the tap. Tapping chip `k` marks sets 1..k, so a player who did three sets in a row confirms with one tap and undoes the last with a second.

The **pending** set also carries a `â N +`, so a player who fell short on the last set records that without disturbing the others (`sdcAjuste[group][index]`, read through `sdcRepsSerie`). Adjusting a set changes what you *did*, never the day's goal: `sdcTotalMeta()` deliberately sums the raw `Aa` targets, because `i5` grades against `Oy()` and a button reading `30/30` would claim a completion the game scores as 94%.

**`i5` is still the only function that settles XP,** and the XP shown in the header during a session is a live projection: `u.currentXP + sdcTotalHechas()`. `pg` passes `sdcRepsHechas()` to `i5`, not the raw targets. Keep it that way — moving the **ledger** into the tap would break `Deshacer registro de hoy` and risk double counting.

**The marks, however, are persisted, and that is a different thing.** `sdcSer` and `sdcAjuste` used to be component state only, so closing the app mid-session lost every set you had tapped — verified: two of three marked, reload, all gone. For a phone that locks, or an app the system evicts while you answer a message, that is the moment a person quits, and it makes them feel stupid rather than interrupted. Every tap now also writes a memo:

```js
today.marcas = { "<modality>|<mode>": { ser, aj, mok } }
```

**One slot per modality *and* per mode, because a single slot made supersets lose work.** The memo was originally one object carrying its own `{mod, mode}`, and the effect rehydrated it only when both matched. That is correct for *switching* — but somebody alternating a bodyweight set with a flow set is writing to the same slot on every tap: the flow tap overwrote the bodyweight memo, and going back to bodyweight found `mk.mod !== B` and reset the chips to zero. **Reproduced exactly as reported**: mark set 1 in bodyweight → switch to flow → mark set 1 there → switch back → set 1 unmarked. Keying by `modality|mode` lets all four slots (two modalities × Normal/Recuperación) coexist, and verified they survive a full reload.

`sdcMarcaOk(ser, aj, mok)` writes it from `sdcSerie`, `sdcAjustar`, `sdcMarcarTodo` and the modifier-claim button; `sdcMarca(state, key)` reads it and still accepts the **old single-object shape** when its `mod|mode` matches the key, so a session already in progress at deploy time is not thrown away. `ei` builds a fresh `today` on rollover, so a new day clears the whole map with no cleanup code.

The `[De,u.rank,B]` effect rehydrates the slot unless the day is registered **or the modality is already in `today.doneModalities`**. That second condition is new and it matters: `mmNueva` clears `today.completed` to open the second session, so without it, switching back to a modality you already registered would re-offer its old marks under a fresh routine card and invite registering it twice. Undo (`s5`) restores the whole `today` from the snapshot, marks included, which is why it keeps working.

Verified: marks survive a reload, each modality keeps its own set of chips while alternating, Recuperación gets its own slot, `today.reps` stays at zero until `pg()` runs, registration still yields the same reps and XP, and a new day starts clean.


When the day is registered the card is replaced by a summary: reps per group, the personal best in each, and the week's totals. The â only appears when `lifetimeReps[g]` exceeds today's reps, because otherwise every group is a record in the first session and the mark means nothing.

Exercises measured in time rather than reps declare it in their own `alt` ("1 rep = 3 segundosâ¦"). `sdcSegs(alt)` parses that and the UI shows the seconds without the player opening anything. It **ignores conversions in parentheses**, which describe the substitute: the pull-group `alt` mentions "superman en el suelo (1 rep = 3 s)" and that does not make towel rows a hold.

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
- **The text you typed today lives in `today.marcas[key].kg`, not in `gymWeights`.** `sdcKgSet` writes three places at once: the raw string into component state and into the day's slot, and the parsed number into `gymWeights[g]` (set 0) or `gymSerieKg[g][k]` (the rest). That looks redundant until you switch modality mid-superset: the effect clears `sdcKgS`, and `sdcKgVer` has no branch that reads `gymWeights[g]`, so **set 1's kilos came back empty** while sets 2 and 3 survived through `gymSerieKg`. Measured: typed 60 · 62,5 · 65, switched to bodyweight and back, got `"" · 62,5 · 65`, and registering then recorded 1.272 kg of volume instead of 2.052 — a 38% undercount of a session, silently. Rehydrating from the day's slot fixes it and stays correct across exercises, because `ei` rebuilds `today` on rollover; making `sdcKgVer` fall back to `gymWeights[g]` would not, since that field survives the day and would print yesterday's leg-press number under today's quad extension.
- `state.gymUlt[g] = {kgs, fecha}` is written by `sdcGymHook` in `pg()` and feeds the "La última vez" line. Both new fields use the **no-migration pattern** (`sdcGymSer`, `sdcGymUlt` return `{}`), so `ei` is untouched.

**`i5` takes a fifth argument, `gvol`.** `pg()` computes `{group:{vol,max,kgs}}` from the per-set kilos and the per-set reps — the only place both are known — and the gym block uses it, falling back to `gymWeights[b] × totalReps` when it is absent. So volume is now `Σ kg_k × reps_k` (30×12 + 32,5×10 + 35×8 = **965**, where the old formula said 900) and `bestLiftKg[b]` records the heaviest set, not the only one.

**The "= 450 kg movidos" line next to the exercise is gone.** Tonnage is a workload total; printed beside one exercise mid-set it reads as a claim about a single lift, and it is trivially misleading — 20 kg × 30 reps outscores 60 kg × 8. It was also the *only* place `lifetimeVolumeKg` was ever shown, despite 16 achievements depending on it. It now lives in Perfil → **Tus números**, which is where a lifetime figure belongs.

> A reorder is invisible to the bracket check. Moving the kilos row above the "Llevás N de M reps" line by splitting a region and concatenating the halves the other way round left the `Fragment` unclosed, and `{}`/`[]`/`()` deltas were all still perfect because a permutation preserves them. **After reordering siblings, load the app** — and assert that each half ends with a comma before swapping.

### Unlocks

`au` is the rank ladder â the level at which each rank offers its Umbral: `{E:50, D:100, C:140, B:180, A:220, S:260}`. It used to be `{E:50, D:100, C:300, B:700, A:1500, S:3000}`, which with the XP curve meant rank B cost 255k XP (about 12 years of training four times a week) and rank Z 22.9M. The game had three reachable ranks out of seven. The current ladder puts D at ~5 months, C at 1.3 years, B at 2.6, A at 4.4, S at 6.7 and Z at 9.4. Z has no entry because there is nothing above it, and the header correctly hides the Umbral line there.

`$e` maps systems to a required level and rank; `ye(state, id)` and `yt(state, id)` test it. The rank requirements are all `"E"` on purpose: rank D needs level 50 and rank C level 100, so the original level-8/12/15 gates paired with rank D/C were unreachable. Keep new entries at rank `"E"` and gate by level alone. Levels in use: 1, 3, 8, 10, 12, 15, 20, 25, 30. **Logros is deliberately level 1**: `da()` is called from thirteen places and none of them is gated, so a player already earned achievements and Dominion Points from their first routine while the tab that explains them stayed locked until level 5 — the reward arrived before the room it lives in. The tab bar is a three-column grid and level 1 shows only Entreno and Perfil, so this fills the empty cell. Categories whose system is still locked start collapsed, via `sdcCatAbierta` and the `sdcCatSis` map.

### UI composition

`Q` is a plain card; `ge` is a collapsible card taking `{id, title, accent, collapsed, onToggle, right, style}`. Collapse state lives in `ui.collapsed[id]`, read with `me(id)` and toggled with `fe(id)`. Active tab is `[Da, $t]`.

`fe(id, shown)` toggles a card. It takes the **currently displayed** state from `ge`, not just the id, and that second argument is load-bearing: `fe` used to do `collapsed[id] = !collapsed[id]`, which from `undefined` produced `true` — still collapsed. Every card using the collapsed-by-default pattern below therefore needed **two taps to open the first time**, because the first tap only wrote down what the screen already showed. Eleven cards had it. If you add a caller that skips the second argument it silently goes back to the old behaviour.

Two patterns worth knowing:

- **Collapsed by default, migration-safe:** `collapsed: H&&H.collapsed&&H.collapsed.X!==void 0 ? me("X") : !0`. Inverting the flag instead breaks saves that already stored it.
- **Hidden until requested:** the help panel and the shop render only when their flag is truthy, so nothing shows when closed â not even a title bar. The `?` button and the PD badge toggle those flags.

`af` lists the ids that "Minimizar todo" collapses; remove an id from it when a card stops being an ordinary collapsible.

### The streak grid shows your history, not a calendar

`x5(history, today, todayStatus, 28)` used to build all 28 days unconditionally, so anything with no record fell to `empty` (#161b2e, "Sin registro") — a near-invisible square you can tap and learn nothing from. **A player on day one saw 27 of them and one real square**, four rows of a past they were not there for, under a six-item legend for colours they had never had.

`x5` now drops `empty` days **from the front only**, and the legend filters to the statuses actually present (plus "Hoy" for `pending`, and "Sin registro" when a gap really is in view — `h5` items take an optional `borde` so those two near-black swatches are distinguishable). Day one: 1 square, 1 legend entry, card 326→220 px. A player returning after 40 idle days gets one square too, which is the truth.

**Gaps in the middle are kept on purpose.** `ei`'s rollover only writes a status for the day that is ending, so a week of not opening the app leaves five days with no record at all. Those are days the player did miss; collapsing them would draw a continuous streak that never happened. The trim is leading-only for exactly this reason. Verified with a save carrying all eight statuses plus a two-day hole: the hole survives, the 28-day cap still holds for a veteran.

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

Almost all of it was one thing: **the guide rendered open by default, on all six tabs.** It is not a tab card — it sits above the tab bar, so 1976 px of manual (17 topics, 3852 characters) pushed the game's own navigation nearly three screens down, on every tab, from the first launch. `af` does not contain `"ayuda"`, so "Minimizar todo" never touched it. Three things changed:

- `ei` now defaults `collapsed.ayuda` to `!1`, and `ui.ayudaAuto` hides it **once** for saves that already had it open. A stored `true` from an old save is not a preference — it is the old default.
- The topics are individually collapsible (`sdcTema`, component state, an object of open titles). It opens with **Tu rutina de hoy, Cómo se anota lo que hacés and Niveles y XP** already expanded, so the first thing a player reads is the core loop and not an index.

### The guide has to work for someone who has never played anything

`j2` holds **18** topics, each carrying a `g` (group) so the render emits a section header whenever the group changes: **PARA EMPEZAR (4) · CÓMO PROGRESÁS (3) · LOS SISTEMAS (7) · LO DEMÁS (4)**.

It was 17, then 26 when the missing subjects were added, then 18 after an audit: **a topic has to be a question a player would actually ask, not a fact the code happens to contain.** Seven rows were one answer split in pieces, and merging them cost nothing:

| merged into | what came in |
|---|---|
| **Tu semana** | ¿Qué cuenta como sesión? · El calendario de Constancia |
| **Si hoy no podés** | Modo Recuperación · Día de descanso · Escudo de Racha — three one-sentence topics answering one question |
| **Los rangos y el Umbral** | El Umbral (it only exists as the gate between ranks) · El último rango |
| **Niveles y XP** | Se abren solos — what levelling unlocks belongs with levelling |
| **Puntos de Dominio** | Logros — achievements are a source of the currency |

The index dropped from 1653 px to 1209, and the four opening titles now read as the four questions a beginner has: *Tu rutina de hoy · Cómo se anota lo que hacés · Tu semana · Si hoy no podés*. **The three pre-expanded titles in `sdcTema` must keep matching real `j2` titles** — merging renamed "Los rangos" and "Meta semanal", and a stale key there silently opens nothing.

Two things were wrong and neither was the writing style:

**It explained the game in the game's own words.** "Los rangos" used *Umbral* three topics before Umbral was defined; "El Umbral" said "los cuatro patrones" and **nothing in the app ever said what a patrón is**; "Modalidades" never said what *flow* means. Every term is now defined the first time it appears, and `patrones` is introduced in the very first topic.

**The most important things were missing.** There was no topic for the daily routine, none for **how you record a set** (the single interaction the whole game runs on), none for the stretching rework, Primeras veces, the body map, the streak calendar, achievements, calibre, or why systems appear as you level. The worst omission: **nothing told the player their save lives only on this phone.** There is no account and no server, so "Guardá tu progreso" is now the closing topic and says so plainly.

Presentation, for readers who are not 25: topic titles at 16 px, body at **15 px with 1.65 line-height in `#c8d0e4`** — the shared `text-xs` (12 px / 1.0 line-height) in `#9aa4bd` was never meant for paragraphs. Rows measure 49 px, above the 44 px floor. Closed, the guide still costs nothing: the tab bar stays at y=362.

**When you change a system, change its topic.** The guide now describes combat's "Empezar", the two stretching routines and the weekly flexibility check — reword any of those and the manual starts lying.
- The `?` circle became a labelled `¿Cómo funciona?` button. A bare glyph is not discoverable enough to be the only door to the manual, and the circle was the one `borderRadius` in the file.

The collapsed cards themselves were never the problem — they are 54–55 px each and read fine stacked. What was wrong in Perfil was **eight of them**, three of which were the same kind of thing: `atributos`, `volumen` and `hazanas` were all numbers you read and never touch. They are now one card, `numeros` ("Tus números"), with three labelled sections and the lifetime rep total on the collapsed bar. Six bars left, and the three old ids are gone from `af`. Stale keys left behind in a real save's `ui.collapsed` are harmless.

**The header is permanent UI, not a card.** It carries the name, the calibre, the PD badge, the XP bar (`qa`), `Ascenso: level/threshold` and the next system to unlock. All of that used to live inside the `rango` collapsible, which started closed â so a new player never saw their XP bar move and never learned anything was coming. That card is gone; do not reintroduce one that duplicates the header.

### Feedback

There were two `@keyframes` in the whole app and neither fired on a reward. Now the head `<style>` also defines `sdcPop` (floating `+N XP`), `sdcRise` (notices) and `.sdc-chip`, all suppressed under `prefers-reduced-motion` â the browser pane has that on, so animations will look dead there while the numbers still render.

`sdcWakeUse()` is a hook that holds a screen wake lock for as long as its component is mounted, re-acquiring it on `visibilitychange` because the browser drops the lock whenever the tab is hidden. `sdcWakeSi(on)` is the conditional variant, for a timer that lives inside a component that is always mounted; the main component calls it with the combat and Primal countdowns. `T5` (rest timer) and `Ly` (fitness test) call the mount-based `sdcWakeUse()` â the two moments where the phone is on the floor and the screen used to sleep mid-set. It swallows its own errors, so it is safe to add to any other component.

`sdcBeep(hz, ms)` wraps the existing `Ie()` oscillator and `sdcVib(pattern)` guards `navigator.vibrate`; both swallow their own errors, so call them anywhere. A set tap beeps, vibrates, floats the XP gained (`sdcFlota`) and starts the rest timer. `sdcDesc` scales that rest with the size of the set just completed (`base + reps Ã 1.5`, capped at 180 s) â `ag` alone gave Resistencia the most reps and the shortest rest.

`b5` classifies each notice string with `sdcTier` into `epic` / `good` / `bad` / `info`, sorts epic to the top and styles it accordingly, plus a "Cerrar todo". Tiering is done by matching the text because the notice pipeline (`i5` â `misRevisar` â `Ea` â `da` â `ni`) passes plain strings; **if you reword "Subiste a nivel" or "Ascendiste", update `sdcTier` too** or a level-up will render like a bookkeeping line again.

### Variety

`Oy()` never received the date, so the routine was byte-identical every day for the ~50 levels rank E lasts. `sdcMods` now holds **six modifiers per modality** â they are not interchangeable, so gym gets drop sets and sets to failure while flow gets longer holds and unbroken transitions â and `sdcModDia(modality, date)` picks one by hashing both together. The bonus only applies when the player claims it (`sdcModOk`, passed to `i5` as a fourth argument); nothing can verify it, but it demands a deliberate act rather than handing out XP.

The *travesias* (long cardio sessions, formerly "dungeons") draw from `sdcPortales`, ten name/challenge pairs. The identifier kept its old name; only the data changed. Each name states the quality of the body the session reveals (La Guardia, El Rebote, La Cuesta), never a monster. They used to be two independent lists, so "Guarida del Lobo SombrÃ­o" could ask for thirty minutes on a bike.

`sdcMascota(state, pct, isPR)` gives the pet a line about the session just recorded â a personal best, a streak of seven or more, a full routine or a partial one. It used to speak only when you failed. Keep new phrases species-neutral: the pet can be a dog or a cat.

### Combat

The attack was typing the word "hecho" into an input. It now reuses the routine's set chips: `sdcCombChips(phase, reps)` renders them, `sdcCombTocar` handles the tap, and `sdcGolpe` lands the hit â the same thing the old `Rd` did minus the text check. The strike button stays disabled until every phase is complete, and bosses keep their superset by rendering one chip row per phase. `sdcCombSer` resets on any change of villain, exercise or phase, and on cancel.

**The clock never starts on its own.** It used to: entering `phase:"resting"` — which happens when you pick a pattern *and after every successful strike* — armed a 12 s (20 s boss) prep countdown that rolled straight into the attack window, and letting that window run out costs a heart via `x2`. So the game started counting against you while you were still reading the screen, once per hit. Now that effect only loads the numbers (`mu`/`ql`) and leaves `du`/`fu` false; a **"Cuando estés listo"** card shows the prescription and the seconds you will get, and its `Empezar` button is the only thing that sets `_l(!0)`. Three render states share `phase:"resting"`: `!du&&!fu` (ready), `du` (prep, skippable with "Comenzar ahora"), `fu` (window). The time limit itself is untouched — it is what makes combat different from the routine — it just cannot start without you.

Two related holes closed with it: leaving the combat tab mid-window used to keep the countdown running in the always-mounted component and take a heart while you were somewhere else (the effect's `Da!=="combat"` branch now cancels instead), and `dg` ("Cancelar (sin perder vida)") re-armed the prep countdown without clearing `sdcCombSer`, so the next window opened with `GOLPEAR` already enabled.

### Dates

Use `__fechaLocal(date)` / `ue()`. **Never `toISOString().slice(0,10)`** â that is UTC, which rolled the day over at 21:00 in Argentina and broke streaks for anyone training at night. The same bug existed in five places.

### Economy

Dominion Points: 3 for a 100% routine, 1 for â¥50%, first session of the day only. The shop is `Ey` (id, cost, name, desc) and `M2(state, id)` applies each purchase; add a branch there for every new item. The XP buff multiplier is `dominion.xpBuffMult`, read by `Ka()` â do not hardcode 1.25 again.

XP base is literally the reps performed, plus a flat **30** for a 100% routine. That bonus was 20, which made the first routine worth 44 XP against the 48 `li(1)` costs â a new player could not level up in their first session. **Any change to `li`, to the bonus, or to the volume model must keep that first level-up intact;** it is the cheapest, most load-bearing reward in the game.

**The three focus profiles have to pay the same for equivalent work, and one of them did not.** `repMult` sets how many reps a profile does and `xpMult` is supposed to buy that back: `fuerza` does 65% of the reps at 1.5× XP, which nets 0.975. But `resistencia` did **140% of the reps at 1× XP** — it was paid in full for volume the other two trade away. Measured at gym rank C, same session, no streak: fuerza 210, salud 200, **resistencia 268**. `resistencia.xpMult` is now `.8`, which lands it at 214 — still ~2% ahead of fuerza, deliberately, because 238 reps takes longer than 110.

**The load is in the XP now, but only where it is earned.** Ten reps at 20 kg used to pay exactly what ten reps at 100 kg paid: `v` starts as the raw rep count and `gymWeights` was never consulted. Progressive overload — the entire point of a gym — was invisible. The gym block in `i5` now collects a `sdcPRb` list when `gb.max` beats `bestLiftKg[b]`, and **+25 XP per pattern** is added after all the multipliers (flat on purpose, so it reads the same every time) with a notice that starts with `+`, so `sdcTier` styles it as good:

```
+25 XP: nueva marca de carga. Piernas y glúteos 60 → 65 kg
```

It fires **only when there was a previous mark**. Without that guard the first gym session of a player's life would hand out +100 for merely writing down four numbers. Verified both ways.

**The gym suggests the next load, and the suggestion is earned.** Recording what you lifted is a notebook; telling you what to lift next is the job. `sdcSugKg(state, group, name)` reads `gymUlt[name]` and applies double progression: **you only go up if you finished the prescribed reps last time**. That is why `i5` stores `pct: C/u[b]` alongside the weights — without it the app would push more load onto someone who is already failing sets, which is how people get hurt.

```
completaste  →  "Hoy probá 65 kg →"
te faltó     →  "Repetí 70 kg y cerralo →"
sin historia →  nada
```

The increment is `sdcIncKg`: 5 kg for `squat` at 40 kg or more, otherwise 2.5, dropping to 1 under 20 kg — a lateral raise and a leg press cannot share a step size. The line is a **button**: tapping it fills every set, so the player still performs the deliberate act. It is never auto-filled, because the kilos field records what you *did*, and a suggestion written into it before you lift is the app putting words in your mouth.

**The gym's memory is keyed by exercise name, not by pattern** — `state.gymUlt["Sentadilla con barra"] = {kgs, fecha, best}` — and that distinction became load-bearing the moment each rung grew to three variants. Before the rotation, one exercise per rung meant pattern-keying and exercise-keying were the same thing. After it, `squat` at gym rank E covers *Prensa de piernas*, *Extensión de cuádriceps* and *Curl femoral*, where 120 kg is routine on the first and absurd on the others. Keyed by pattern, the app would have shown "La última vez: 120 kg" under a quad extension, pre-filled the field with it, and paid a PR for switching to an easier machine. **A weight suggestion that is wrong is worse than none**, so an exercise you have not done yet shows an empty field and no history line. `bestLiftKg[pattern]` is still written alongside because sixteen achievements read it through `Object.values`.

The multipliers stack in `i5`, each with its own `Math.round`: `t5` (focus, plus the `salud`-only +15% at streak â¥3), `sdcRacha` (+2% per consecutive day, capped at +30%, every profile), `flexBuff`, `Ka` (day buffs from the shop), `sdcPerk` (permanent perks) and the multi-modality bonus. A 12-day streak with both perks turns a 62 XP routine into 97.

`Ey` now ends with two **permanent** purchases, `memoria` (40 PD, +5% XP) and `nucleo` (90 PD, raises it to +10% and requires `memoria`). They live in `dominion.perks`, which `ei` backfills and `Ay()` creates â the first array that needed a migration default in a while, so treat it as the worked example. Everything else in the shop is a consumable.

`da()` pays PD by achievement tier (E/D 1, C/B 2, A 3, S 4, Z 5). The 88 entries in `Jo` used to grant nothing at all.

**There is no XP penalty any more.** Both sites that had one â a sub-50% session in `i5` and a missed day in `ei` â took a percentage of `currentXP`, which meant the game punished hardest right before a level-up and not at all just after. Losing the streak is the whole consequence now. If you reintroduce a penalty, do not make it proportional to `currentXP`.

### Fitness test and calibre

`Ly` runs **four** timed tests at the routine metronome's cadence — **2 s down, 1 s pause, 2 s up** — after a **10 s** "PONETE EN POSICIÓN" lead-in (it was 3 s, not enough to put the phone down and get into a plank). It counts one rep per full cycle by itself; what the player does between beeps does not change the count. It used to be 2 s / 1 s with no pause, and that mismatch with the routine is why targets felt too high.

**Results measured at the new cadence carry `testResults.ritmo = 5`,** set by `l5(…, 5)` from the Perfil retest and by the onboarding when the numbers came from `Ly` (`sdcRitOnb`; typing numbers or picking a self-assessment clears it). The volume model reads the raw numbers, so a retest lowers the daily targets in proportion — that is the point. The **calibre bands** are scaled for tagged results only: `sdcRitmoF(profile)` returns `sdcRitmoK` (0.6) or 1, `sdcBandaMin(k, f)` rounds `vy[k].min × f` and `sdcBandaIx(n, f)` picks the last band whose scaled minimum `n` reaches; `wy`/`Uy` take that factor as a fifth argument. Perfil prints the scaled ranges (0–17, 18–39, 40–68, 69–100, 101–129, 130+) so the raw score, the formula line and the ladder still add up. Untagged saves — every save before this change, manual entries, self-assessments, the skip defaults — keep the original bands and targets until they retest. **0.6 is an estimate** (constant time-to-failure: 3 s ÷ 5 s per rep); re-measure it the first time a player has both an old and a new result for the same pattern.

The four test exercises are `sq`, `pu`, `ab`, `bk` (inverted rows, superman as the equipment-free fallback). The arrays are `J` (onboarding) and `ci` (retest in Perfil) â they hold different hint text, so a new exercise has to be added to both, along with its state, its `onFinish` branch, the numeric shortcut and the summary row.

`iu(sq, pu, ab, bk)` = `sq + 2Â·pu + ab + 2Â·bk`, and `wy`/`Uy` band it through `vy`. The pull term was added later and the six band thresholds were **rescaled ~20%** to absorb it, so nobody changed calibre just because a term appeared. Results persist as `profile.testResults` and feed the volume model.

Two axes, kept separate on purpose:

- **Rank** is what you earn. Same ladder and same ascensions for everybody.
- **Calibre** is what you measure â `sdcCalibre(profile)` returns the `vy` label, `sdcPuntaje(profile)` the score. It shows under the name, and Perfil â Prueba de aptitud lists all six bands with the current one marked and the points still missing.

`vy` also carries `rank` and `focus` fields. `focus` is display text; `rank` is dead by design (see Exercise selection).

**The four test exercises are bodyweight on purpose, and that is a decision, not an oversight.** A gym player is measured with squats, push-ups, sit-ups and inverted rows because the test's job is to find a base that carries into *all three* modalities with no equipment at all — the inverted row already ships `superman en el suelo` as its fallback. Do not "fix" this by adding a barbell variant: the moment the test needs a gym, it stops measuring the thing it is for.

**What does change per modality is what the number is called.** `vy`'s own labels were a player-level ladder (`Principiante Base` → `Élite / Dominio Total`) and its `focus` strings were written in one voice — `"Calistenia / Flow de alto impacto"` was shown to someone who only lifts. `sdcCalTit` and `sdcCalFoco` are 3×6 arrays, read through `sdcCalT(i, profile)` and `sdcCalF(i, profile)`, which resolve the set with the **same `sdcJuego(profile)`** the rank titles use — so the header reads `Nv. 1 · Gateo` over `Tránsito largo` for a flow player and `Barra` over `Sesión larga` for a gym one, instead of mixing vocabularies.

```
bodyweight  Primeros apoyos · Base firme · Aguante propio · Trabajo largo · Fuerza relativa · Fuera de la tabla
gym         Primeros pesos · Base para cargar · Aguante entre series · Sesión larga · Carga alta · Fuera de la tabla
flow        Primeras posiciones · Piso firme · Aguante continuo · Tránsito largo · Control fino · Fuera de la tabla
```

**The rule that shaped those 36 strings: a calibre label describes capacity, never skill.** The test measures how much work your body absorbs; it does not know whether you can do a handstand or a 100 kg squat. So the gym ladder talks about series and volume and never about kilos, the flow ladder talks about sustaining and linking and never names a freeze, and the top band is `Fuera de la tabla` — you exceeded the *scale*, which is what actually happened — rather than `Élite`. The `focus` line is the one place that may name a movement family, because a focus is what to work on next, not a claim about what you already have.

`vy.label` and `vy.focus` survive as the fallback (`||(vy[i]&&vy[i].label)`), same as `zl`/`J2` do for ranks. Four display sites read the new helpers: the header badge (through `sdcCalibre`, which now returns `sdcCalT(vy.indexOf(b), p)`), the six-rung ladder and the "Te faltan N pts para…" line in Perfil → Prueba de aptitud, and the onboarding *Calibración completa* screen. Nothing touched `classification`, so the volume model is byte-identical.

**The Perfil card also prints the current band's `focus`,** gated on `sdcCalibre(s)` rather than on the band index: a save that predates the test scores 0, which `findIndex` happily maps to band 0, and a focus line for a measurement that never happened would be an invention.

### Stretching

It was the last screen in the app you **watched** instead of doing: one 300-second countdown, `_2(elapsed)` deriving which of nine stretches you were "on", no beep, no acknowledgment, nothing to tap. Four separate defects made that worse:

- **No wake lock.** `sdcWakeSi` listed combat and Primal but not `ja`. Five minutes on the floor with the screen going dark.
- **`setTimeout(()=>Tl(d=>d-1),1e3)`.** The decrementing pattern CLAUDE.md warns about, at 5 minutes — it drifts and stalls when the phone locks, which the missing wake lock guaranteed.
- **Four of the nine stretches were per side** ("20 s por pierna", "15 s por lado") and *nothing signalled the switch*. You were doing half of each, or both in one slot.
- **All or nothing.** "Cancelar (sin XP)" at minute four of five paid zero.

Now `Pt` entries carry `seconds` (per side, not split), optional `lados:1` and optional `corta:1`. `sdcEstLista(corta)` flattens that into **steps**, expanding a bilateral stretch into two with `lado:"lado derecho"/"lado izquierdo"`, so the switch is a step like any other and gets its own beep. Two routines: **Corta / 6 pasos** (what helps right after training) and **Completa / 13 pasos** — 3:44 and 7:33 since the lead-ins went per step. Elapsed comes from `sdcEstIni` via `setInterval` recomputing `Date.now()-start`, so leaving the tab no longer freezes it — **verified**: away 16 s, came back 16 s further along, not where it was.

**Every step is preceded by a lead-in** (it was a flat `sdcEstPrep` = 5 s; now 10/8/5 per step, see the warm-up), because the beep told you to change and the hold was already running: you spent the first seconds of a 25-second stretch getting down on the floor, and the worst case was a per-side switch, where you had to stand up, turn around and start again against a clock that never stopped. `sdcEstPaso(list, elapsed)` now walks `prep + seconds` per step and returns `{index, left, prep}`; during the lead-in the card shows **PONETE EN POSICIÓN** (first step) or **PREPARATE**, the name, side and description of the stretch you are about to do, and an amber countdown. `sdcEstTotal` includes the lead-ins, which is why both routines got longer — that time was always being spent, it just used to come out of the stretch.

Two beeps instead of one: a low 520 Hz when the lead-in starts and the usual 760 Hz when the hold does. The effect tracks `index*2 + (prep?0:1)` in `sdcEstIdx` so one counter covers both transitions and neither fires twice. Grading is untouched: `Terminar acá` still passes `p.index`, so a step you are only preparing for does not count as done.

`c5(e, hechos, total)` grades: under 34% pays nothing and leaves `today.stretchDone` false so you can come back; at or over it pays `round(25 × fraction)` and marks the day; only a full run increments `week.stretchCount` toward the weekly 2. The notice keeps starting with `+` so `sdcTier` still renders it as good.

**The flexibility check is what makes the section mean anything.** Stretching was the only system that measured nothing and argued for itself purely with XP. Once a week (`sdcFlexToca`, 7 days) it asks how far you reach sitting with your legs straight — five concrete descriptions in `sdcFlexNiv`, knees → palms on the floor. `sdcFlexSet` is a **reducer returning `{state, notices}`** and beating your own best writes a real **Primera vez** (`origen:"medida"`), which `sdcTier` renders epic. This is the one place the dropped "measured" source is safe: the ladder has five rungs, so it can fire at most four times in a lifetime, unlike rep records.

State lives in `state.flex` and uses the **no-migration pattern** — `sdcFlex(e)` returns `{}` — so `ei` is untouched.

> The bug that cost a test run: `sdcFlexSet` first returned the bare state instead of `{state, notices}`. `Ne` destructures `{state:m}`, got `undefined`, and `K(undefined)` wrote the literal string `"undefined"` into `dominio-corporal:player/state`, wiping the save. **Anything passed to `Ne` must return `{state, notices}`**, and a save that comes back as the string `"undefined"` is this mistake.

### Warm-up (Calentamiento)

The card above "Rutina de hoy" (`id:"calentamiento"`, `order:-5`, open by default, in `af`). It is a RAMP protocol in four phases, and **its identifiers use the `sdcCalor` prefix because `sdcCal` is already taken** by the calibre helpers (`sdcCalibre`, `sdcCalT`, `sdcCalF`).

| phase | what | how it advances |
|---|---|---|
| 1 · PULSO | trote en el lugar, saltos de tijera | timer |
| 2 · MOVILIDAD | brazos, cadera, balanceo de pierna por lado, muñecas | timer |
| 3 · ACTIVACIÓN | one drill per pattern, chosen by modality | timer |
| 4 · ENSAYO | today's four exercises, exact names from `_d`, light dose | a tap per exercise |

**The four patterns are always the four patterns.** The routine never picks patterns per day; what varies is the modality, the rank and the date rotation of the exercise. So activation keys on **modality** (`sdcCalorAct`, with `sdcCalorActF` overriding three groups for flow: cuclillas, bestia, hollow) and each drill carries an `ev` regex: if today's exercise already *is* that drill (bodyweight E has `Puente de glúteos` and `deadbug asistido`, flow E has `Sentadilla profunda con balanceo`), the next option in the list is used instead, so the same movement never appears three times in a row.

**Ensayo is tapped, not timed,** because the dose is reps and a gym player may be loading a machine. The dose comes from the first set of today's target (`Aa`, so Recuperación halves it too): ~40% of it clamped to 1–6 reps, a third of the seconds (5–15) for holds via `sdcSegs`, and in the gym 4–8 reps at **half of `sdcSugKg`**, rounded with `sdcIncKg`. The gym step also offers *"Lo hago antes de su primera serie"*, because ramp sets belong at each machine and nobody should cross the gym twice.

**Lead-in is per step, and it must give time to get there.** `sdcEstPaso` and `sdcEstTotal` read `step.prep || sdcEstPrep`: 10 s before the first step (put the phone down), 8 s whenever the body changes position (wall, floor, supine, plank), 5 s when it does not (a side switch). Stretching now follows the same rule: `Pt` entries that change position carry `pr:8` and `sdcEstLista` gives the first step 10, which moved the routines to **3:44 and 7:33**. "Ya estoy →" skips the rest of a lead-in by moving `ini` back; nothing skips a hold. See **Guided timers never start without you** for the first-time wait and the pause.

State is `today.calentamiento = {mod, ini, pot, xp, hecho}` (no-migration: `sdcCalor(e)` returns `{}`; `ei` rebuilds `today` on rollover). Elapsed time is `Date.now() - ini`, so a reload resumes mid-step — verified. A run older than the timed part plus 20 minutes counts as abandoned. `sdcCalorCard` is a real component with its own ticker and `sdcWakeSi`, so it only runs while the card is open and Entreno is showing; the clock itself never stops.

**Reward: 10 XP, once a day, graded like `c5`** — under 34% pays nothing, partial pays `round(10 × fraction)`, with `flexBuff` and `Ka`. It is the smallest reward in the game on purpose (skill step and neuromotor 15, joint care and Primal 20, stretching 25, travesía 40+). It does **not** call `Dl`: warming up is not a session and does not touch the week or the streak. **It can be repeated without XP** ("Calentar de nuevo"), because a second modality in the evening needs its own warm-up; the stretching-style hard lock would have been wrong here. The card hides once the day is registered and returns with `mmNueva`.

Its cost, measured at 375×812 on a fresh save: open, 204 px, which puts the "Rutina de hoy" header at y=635, still on the first screen; collapsed, 54 px. The start view is kept to one button and one line on purpose — the explanation lives in the guide ("Tu rutina de hoy"), not in the card.

### Guided timers never start without you

Reported from the phone: someone who does not know a movement needs to *read* it, and the clock was already running, so they did nothing. A 5–10 s lead-in is enough to move, not to learn. Every timed flow now waits for the player the first time and can be paused:

- **First time, the lead-in waits.** `state.pasosVistos` (no-migration: `sdcPasosV(e)` returns `{}`) records every step name the player has completed. `sdcPasoEspera(list, k, vistos)` is true for a step never done — except the second side of a bilateral step. While it is true the lead-in freezes at its full length, shows **LEÉ Y PONETE EN POSICIÓN** with the description at 15 px, and waits for **Listo, empezar →**, which leaves 3 s of lead-in and records the step as acknowledged (`ok`, so it does not re-freeze). Steps are marked seen when a run ends — `sdcPasosHook` wraps `c5` for stretching and `sdcCalorFin` marks the warm-up — for every step before the one you stopped on.
- **Pause** freezes elapsed time: `pz` is the pause timestamp, elapsed is `(pz || now) − ini`, and resuming adds the paused span to `ini`. The warm-up keeps `pz`/`ok` in `today.calentamiento` (it survives reloads); stretching keeps `sdcEstPz`/`sdcEstOk` in the main component, like the rest of its state. The auto-wait is the same mechanism: it writes `pz` at the step's start (`sdcEstDesde(list, k)`).
- **`sdcPasoVista`** renders one timed step for both — label, name, side, description, countdown, bar, next step, and the Listo / Seguir / Ya estoy / Pausa / Terminar buttons — so the two cannot drift apart again.
- **Instinto Primal** no longer starts on tap: `og` opens a `"listo"` state with the description and an **Empezar**, which runs a 10 s lead-in through the existing `resting` branch with `Qd = 0` (labelled PONETE EN POSICIÓN). Round start and end now beep; they were silent.
- **Neuromotor** and the **fitness test** count down 10 s instead of 3, beeping only the last three.
- **Travesías** start `startedAt = now + 10 s`. `sdcTravCrono` keeps the raw, possibly negative elapsed in state (`u1`) and clamps it for display (`u`): with the clamp in the state itself, nothing changed during the lead-in, nothing re-rendered and the countdown froze on its first number — found in testing.

**The routine had the same shape of problem in two places.** The rest timer `T5` rendered *inside* the card above the four rows, so every set tap inserted ~100 px and pushed the rows under your finger, and at the fourth exercise you had to scroll up to see how long was left. It is now a **fixed bar at the bottom** (`DESCANSO m:ss`, progress, **Saltar →**), timestamp-based from `sdcDescIni`, with no layout shift at all. And a completed exercise **folds into one line** (`✓ name · N reps`, tap to reopen, "Hecho · ocultar" to fold again) so a stray tap cannot unmark it. The fold waits **1.2 s** after the last set (`sdcCierra`), because collapsing instantly would move the next row up under the same finger; a row that is already complete on mount starts folded.

> Testing trap: the Browser pane's screenshots **do not draw `position:fixed` elements**, and at some emulated sizes they crop the viewport. The rest bar looked missing in every capture while `document.elementFromPoint` at the bottom of the screen returned its timer and its button. Check fixed UI with hit-testing, not with a screenshot.

### Cómo llegás (the check-in)

Asked for by the author: on a day without energy it is easy to skip, and a little activity changes how you feel. The point is not the question — it is the **before/after comparison**, which is the thesis made measurable: *llegaste con pocas ganas y te vas a full*, and over time *días que no querías: 12, en 10 terminaste mejor*.

It is a system in `$e` (`id:"animo"`, level 1), so it gets a switch in Perfil → Sistemas del juego for free and `sdcAnimoOn(e)` is just `ye(e,"animo")`. State is `state.animo[date] = {antes, cuerpo, modo, ack, ahora, ahoraOk, despues, carga, no}` behind the no-migration getter `sdcAnimo(e)`, capped at 400 days by `sdcAnimoPut`. Scale `sdcAnimoEsc`, five faces drawn by `sdcCara`: **Sin ganas · Pocas ganas · Normal · Con ganas · A full** — each with a `f` phrase ("con pocas ganas") so the sentences read in Spanish, and none of them gendered (the mockup's "Flojo" was dropped for that reason).

1. **Before** — `sdcAnimoAntes`, a card at `order:-6` above the warm-up. Shown only on the day's first session, before any set is marked or the warm-up has started, and never blocking: "Hoy no" hides it for the day. Normal or better → the card shrinks to one line, *Llegás normal.* with **Cambiar respuesta**, which stays until the first set or the warm-up, same as the card. A low answer that has been acted on (`ack`) shrinks to the same line. Low (≤2) → **"¿Y el cuerpo?"**: Cansancio · Músculos cargados · Me duele algo · Bien.
   - Not pain → the routine switches to **Recuperación** (`On("recovery")`, and `modo` is stored so the choice survives a reload — `De` is initialised from it) and the card says *Hoy alcanza con empezar*, with **Empezar calentamiento** (starts the warm-up and un-collapses its card) or **Ir directo a la rutina**. When there are ≥3 past low days with an after-answer, it adds the player's own evidence: *Las últimas N veces que llegaste así, en M terminaste mejor* — only if M ≥ 2, and never invented.
   - **Me duele algo** → no training suggestion. It prints *Si es un dolor agudo o punzante, no entrenes esa zona hoy* followed by `X2`, the pain rule, in its neutral medical register, offers the weekly rest day behind a confirm, and *Entrenar suave, sin esa zona*.
2. **After the warm-up** — `sdcAnimoAhora`, inside the warm-up's done view, only for low days, before any set: **"¿Y ahora?"**. Normal or better offers *Te vino el envión. ¿Hacés la rutina normal?*. The switch lives here and not mid-routine on purpose: marks are stored per `modality|mode`, so changing mode after marking sets would move you to an empty slot.
3. **After the routine** — `sdcAnimoDespues`, first thing in the completed summary (not on a rest day): **"¿Cómo te vas?"** with the same five faces, then **"¿Cómo te quedó la rutina?"** Corta · Justa · Mucha. Three answers in a row that agree and are not *justa* (`sdcCargaRacha`) produce *Repetí la prueba de aptitud para ajustarla* with a button that opens Perfil and un-collapses the aptitud card — the only remedy there is today for a target that never fits, since the − stepper resets daily.

**Every answer can be corrected**, because a face is tapped by accident: reported from the phone, a player hit *Normal* while arriving tired and sore, and the card vanished with no way back — "Cambiar respuesta" existed, but only in the low branches. Arrival: `cambiar` clears `{antes, cuerpo, modo, ack}` and asks again, and it only calls `om("normal")` when `h.modo` is set, i.e. when the check-in itself had switched the routine to Recuperación. Departure: `sdcAnimoOtra` (the same underlined button, pushed right) clears `{despues, carga}` in both the carga view and the final summary; achievements already paid by the first answer stay, which is harmless. The arrival correction deliberately ends at the first set, for the same reason `sdcAnimoAhora` does.

**No XP for answering.** Paying for a checkbox is the `z_hybrid` mistake. The reward is the evidence line and seven achievements in a new category, **Días que no querías** (the phrase already names a place in Explorar): *Viniste igual* (D), *El envión* (D), *Cinco días que no querías* (C), *Te cambió el día* (C, 10 better-than-arrival sessions), *Veinte días que no querías* (B), *Entrenar te cambia el día* (B, 50), *Cincuenta días que no querías* (A). They count through `sdcAnimoCuenta(e)`, defined **next to `Jo`** so the checks resolve in the same scope; "trained" means `history[date]` is `full` or `partial`. Lying to them is possible and pointless — there is no one to beat. The after-answer reducer calls `da()` itself, because `i5` runs `da()` before the question exists. The answers also show in Perfil → Tus números and in the Constancia day detail (`C5` takes `animo`).

`privacidad.html` section 2 lists these answers; if the check-in ever stores anything else, update it in the same commit. Answering once marks `"animo"` in `seenUnlocks`, because `_y` only runs on level-ups: an existing player would otherwise get "Nuevo sistema desbloqueado" days after using it.

### Backup reminder

A card in Entreno asks for a backup once the player has 10 days of `history`, and hides for a week on "MÃ¡s tarde" or for a month after an actual export. Its two dates live in **`localStorage` directly** â `dominio-corporal:ultimoRespaldo` and `:respaldoPospuesto` â and deliberately **not** in the game state. They describe this device, not this player: restoring a backup on a new phone should not carry over "you already backed up". Keeping them out of the state object also means no new default in `ei` and no migration risk.

`sdcRespaldoOk()` is called from both export paths (`bkDescargar` and `ug`). Neither of those dates triggers a re-render on its own, so the "MÃ¡s tarde" button also pushes a notice â that state change is what makes the card disappear.

### Achievements

147 entries in `Jo` (the last seven are **Días que no querías**, see **Cómo llegás**), checked by `da()`, which pays Dominion Points by tier (E/D 1, C/B 2, A 3, S 4, Z 5). `da()` is **not** called from `ei`, so nothing unlocks on load — everything is evaluated when the player finishes something. Unlocked ids live in `state.achievements`, so **removing an entry orphans its id harmlessly** — but it also changes the `X/147` denominator, and the guide topic that quotes the number has to move with it.

**`tier` is a difficulty, not a rank, and the UI used to print it as one.** The group headers said `RANGO Z`, which survived the identity pass untouched: rank letters appear nowhere else in prose, and the visible rank name is modality-specific anyway, so a player at "Quietud" was reading about "Rango Z". The keys stay `E..Z` — `Z2` orders them and `pd` pays by them — and `sdcDific` maps them to what the player reads:

```
E FÁCIL · D ACCESIBLE · C EXIGENTE · B DIFÍCIL · A MUY DIFÍCIL · S PARA POCOS · Z EXCEPCIONAL
```

**The tiers themselves were not sorted by difficulty, and the top one was the worst offender.** `z_hybrid` ("Atleta Híbrido") checked `qn(e.profile).length>=3` — **it paid the game's highest tier for ticking three modalities in onboarding**, without training anything, while its own text promised "entrená con los tres métodos". The four `z_pr_*` entries asked for 60 leg reps, 40 push, 30 pull and 60 core *in one session*, which a rank E player on a `resistencia` profile clears on an ordinary day. Twenty-one entries were re-tiered:

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
- **Modalidades** (9) needed the one new state field, `lifetimeModalities`, because `week.modalities` resets weekly and `dayLog` stores `{acts, reps, xp}` with no modality. It is incremented in `i5` beside `week.modalities`, defaulted in the initial state and backfilled in `ei`. Existing saves start at zero; there is no way to reconstruct history.

**When more than five unlock at once, `da()` collapses them into one notice.** Adding a batch of achievements makes every established player unlock a pile on their next routine — 33 notices and +50 Dominion Points for a three-month save, measured. The points and the unlocks are all still awarded; only the wall of notices is replaced. Note that `sdcTier` had to learn the plural "logros desbloqueados" to keep styling it as good news.

`sdcCatAbierta` decides which category cards start collapsed: `sdcCatSis` maps a category to a system and asks `ye()`, and `sdcCatMod` maps one to a modality, so a bodyweight-only player finds **Gimnasio** folded away.

### Missions


Unlocked at level 10. `misRevisar` generates one weekly and one monthly objective from `lastTrained` (most-neglected muscle group) or from an unused modality, tracks them against `week`/`month` counters, and pays out. Targets are deliberately ~50% above what the prescribed routine yields, so they cannot be satisfied by training normally. There are intentionally **no daily missions** â the routine, dungeon, combat and Primal already fill that role.

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

The 27 nodes of `pt` are now **what distance shows you** — places that exist and observations that are true (*La Subida de Siempre*, *El Último Farol*, *El Kilómetro Aburrido*, *El Día que No Querías*). Each `relic` is something you genuinely take away: Aliento Corto, Vista Larga, Pendiente Vencida, Señal Temprana. The last node kept its name and relic because it already said the right thing.

`Po` runs outward from the city (La Manzana → Tu Propio Mapa) and `ay` is the walker's ladder (Primeros Pasos → Sin Distancia). **Four km achievements mirror `ay` by design** — change one, change the other.

**Do not reintroduce a narrating entity.** When a sentence needed an actor, the real actor already existed and it was the metronome, not a system.

Rank names no longer appear as letters anywhere in prose. Anything that said "Rango S" now says an ordinal ("el sexto rango") because the visible name depends on the modality.

## Rank titles: three sets, one per modality

The modalities' own display names live in `ra`: **Calistenia** · Fuerza de Acero · Movilidad & Primal Flow. Bodyweight used to be called *Dominio Corporal*, the product's own name, so the routine card read "Rutina de hoy / Dominio Corporal"; it was renamed for that reason. The short chips in Perfil and the achievement texts still say *peso corporal*, which is a description, not a name.

The rank already *was* modality-specific (`_d(group, rank, modality)` resolves `by`, `F2` or `P2`), but `J2` had one set of descriptors written in bodyweight terms, so a gym player was being lied to.

```
bodyweight  Suelo · Eje · Recorrido · Palanca · Lado · Sostén · Oficio
gym         Barra · Disco · Forma · Carga · Tope · Máxima · Hierro
flow        Gateo · Apoyo · Giro · Enlace · Inversión · Quietud · Vuelo
```

`sdcTitulos` and `sdcDescs` hold them; `sdcRango(rank, profile)` and `sdcDescRango(rank, profile)` read them. **`zl` and `J2` are untouched and survive as the fallback.** Internal keys `E..Z` are unchanged everywhere (`ve`, `au`, `Cl`, `W2`, the exercise tables) — only the display changed. A player with one modality never sees a choice; with two or three, a selector appears in Perfil → Métodos de entrenamiento.

## The no-migration pattern — prefer it over `ei`

`ei` is where old saves crash. Three fields were added without touching it at all, because **the getter self-defaults**:

```js
profile.tituloSet   → sdcJuego(p)    falls back to the first modality, then "bodyweight"
state.primeras      → sdcPrimeras(e) returns []
state.podia         → sdcPodia(e)    returns {}
```

Nothing is backfilled, so nothing can break on load. Verified by deleting all three from a real save: it boots with level, PD and history intact. **Reach for this before adding a default to `ei`.**

## Primeras veces

The app counted reps for a lifetime and never recorded the day you first did something you could not do — which is the thesis itself.

**The rule: the app never declares a first it did not witness.** Tying it to rank changes would be guessing; a player who already did pull-ups would be congratulated for something years old, and one lie destroys the feature. So it asks, once, non-blocking, one movement at a time (the first unanswered of today's four): *¿Alguna vez hiciste X?* → `Nunca pude` / `Ya podía`. Answering "nunca" sets the starting line; completing reps of that pattern later confirms it. Plus a manual button for what the app cannot see.

The third source in the original plan — *measured*, a personal record beaten — was **deliberately dropped**: almost every early session beats a record, so the list would fill with noise in week one.

**The hook is in `pg()`, not in `i5`.** `i5` is the only function that settles XP and is the highest-risk code in the file:

```js
Ne(f => sdcPrimerasHook(i5(f, De, h, sdcModOk), h))
```

`sdcPrimerasHook` receives the finished `{state, notices}` and only appends. `i5` is byte-for-byte unchanged.

## `sdcTier` — the paired edits

`sdcTier` classifies notices by matching their **text**, so a notice and its matcher must change together or a reward renders as a grey bookkeeping line. Current epic matchers: `"Primera vez:"`, `"Cruzaste a"`, `"Subiste a nivel"`, `"Volviste al último rango"`.

Two rewards were already mis-tiered before anyone noticed: **winning a combat** and **clearing a dungeon** both fell through to `info`. Combat is fixed via `"Recuperaste"`; the travesía notice now says `"¡Travesía completada!"` so it matches the existing `"completada"`.

Pairs that must move together: the Umbral notice, the level-up, the return to the last rank, the weekly-streak loss, the short session, achievements, system unlocks, and **`"Rutina completa"`, which has five sites** — including the *Deshacer registro de hoy* filter.

## Voice: what is voseo and what is not

The game speaks **voseo rioplatense**. Two registers stay in neutral Spanish on purpose:

- **Medical**: `H2` (red flags), `X2` (the pain rule), `Dy` (the eight joint protocols) and their render. The right voice there is clinical, not the author's.
- **Execution instructions**: skill steps in `El`, `alt`/`cue`/`how`/`dose` in `by`/`F2`/`P2`, `Js`, and the Primal movement descriptions in `Oa` (which are descriptive, not second person).

`sdcMods` **cannot** be voseado regardless: `sdcTempoMod` reads `/baja(?: el peso)? en (\d+) segundos?/i` and `bajá` breaks it.

**The app states rules; it never defends them.** Say what something does and what it gives ("Da 10 XP una vez por día", "Cuenta como día entrenado, sin XP"), never why we designed it that way. Eighteen strings were cut for this: *poca a propósito, porque es preparación*, *para no abrumarte al empezar*, *para no estorbarte*, *eso es a propósito: la prueba ajusta…*, *es la única forma de que veas…*, *porque no hay forma de saber cuánto hiciste*, *el último rango exige constancia*. The reasoning belongs in this file, not on the player's screen. Instructions about the body are a different thing and stay — *es un ensayo, no una serie* tells you how hard to go, it does not excuse a number. One of the cut strings was also false: the fitness test warned that inflating your reps would "fail your daily missions, lose your streak and earn no XP", and none of the three is true.

**Never run a word-level replacement blind.** A dry run over the whole file caught nine false positives that a global `sed` would have broken silently: `"skills completas"` and `"Repeticiones base bajas"` (adjectives), `"Las marcas sirven"` and `"Marca del Caminante"` (nouns), `"Marca el tempo"` and `"Sube al alcanzar"` (third person), `"varias activas"` (adjective) — and **`misRevisar(e, notas)`, where `notas` is a minified parameter, not the verb.** That one would have broken missions entirely. Same family as the documented `ti(e)` trap.

## Editing technique that worked

Build the edit list in a file, then apply it **all-or-nothing**: count every match first and abort the whole batch if any count differs from what you expect. A partial batch is much worse than none. For word-level passes, compute protected byte ranges from *anchors* (never fixed offsets — they shift after the first edit) and print every match with context before writing anything.

Two traps found the hard way:

- **`Encode::decode` with `FB_CROAK` consumes the source scalar.** Validate UTF-8 on a copy or your byte counts silently become zero.
- **`core.autocrlf` is `true` at system level on this machine.** Without `.gitattributes` (`* -text`), a checkout converts LF→CRLF: 193 extra bytes and every offset shifted, which turns `git checkout -- index.html` — the recovery path — into a new source of corruption. Verified fixed.

The quote count is **odd** in this file by design (double quotes inside single-quoted strings and regexes). Compare it against the previous run rather than expecting it to be even; `{}`, `[]` and `()` deltas are the real structural check (`0`, `0`, `+1`).

## Timers: the fix for "botones de honor"

Two systems used to hand you a form: the *travesía* ("Completar travesía") and Explorar (type your km). The instinct is to call this a cheating problem and add verification. It is not — there is no account, no server and no leaderboard, so the only person a false number fools is the one who typed it.

The real defect is visible next to the routine: there you tap each set *while doing it* and the app answers (beep, vibration, floating XP, rest timer). The travesía asked you to file a report afterwards, and **a form cannot teach you anything about your body**, which is the whole thesis.

So both became accompanied sessions:

- `sdcTravCrono` runs the challenge's real duration with the screen awake, and only then enables completion. Five travesías carry their own intervals in `sdcPortales` (`on`/`off` seconds) and show **FUERTE / SUAVE** with a beep at each change; La Guardia uses real 3′/1′ boxing rounds. The continuous ones beep every 5 minutes.
- `sdcCamCrono` times a walk and estimates km from a pace picked once (`profile.ritmoKmH`). It **does not add the km itself**: it drops the number into the existing manual field so you confirm it with `+ Tramo`. An estimate must never disguise itself as a measurement, and the whole downstream flow stays untouched.

**Elapsed time is computed from a stored timestamp, never by decrementing.** `T5` (rest) used to count down with `setTimeout` each second, which drifts and freezes when the phone locks or you switch apps; it now takes `ini` (`sdcDescIni`, stamped by `sdcSerie`) and computes the rest from it too. `sdcTravCrono` and `sdcCamCrono` store `startedAt` / `walkStart` in state and compute `Date.now() - start`, so a full page reload resumes exactly where it was. Verified.

**Both keep an escape hatch** — "Ya la hice, sin el teléfono", and the manual km field. Going for a run without your phone is not cheating, it is Tuesday. Let it exist; just do not make it the first thing.
