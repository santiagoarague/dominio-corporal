# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

"Sistema de Dominio Corporal" is a gamified bodyweight-training web app in Spanish (RPG framing: ranks, XP, dungeons, a pet companion). It is a **single-page app with no build step**: `index.html` (~440 KB) contains an already-minified React 19 bundle inline.

**There is no source code for the bundle.** It began life as a Claude Artifact and was ported to a standalone site. You cannot rebuild it — every change is a surgical text edit to minified JavaScript. Treat `index.html` as the source of truth and edit it in place.

Deployed files: `index.html`, `storage.js`, `sw.js`, `manifest.webmanifest`, the two icons, `netlify.toml`.

`storage.js` must load **before** the bundle: it defines `window.claude.use("db")` against `localStorage`, replacing the Claude Artifacts database the app was written for. All progress lives in one key, `dominio-corporal:player/state`. There is no server and no account.

## Editing the minified bundle

This is the part that will bite you. Follow it exactly.

**Always verify the match count before replacing.** Never run a blind `s///`. Count occurrences, abort unless the count is what you expect, then replace. A pattern that silently matches zero times leaves you debugging a change that never landed; one that matches twice corrupts unrelated code.

**Beware perl variable interpolation in patterns.** `"$Qtienda$Q,"` parses as the variable `$Qtienda`, not `$Q . "tienda" . $Q`. This exact bug once deleted the first `",` in the whole file — inside React's own code — producing a `SyntaxError` far from anything being edited. Use `${Q}tienda${Q}` or build strings with explicit concatenation.

**Two incompatible encodings coexist.** The original bundle writes non-ASCII as escapes (`m\xE1s`, `—`, `\xBF`), while text added later is real UTF-8. When matching original strings you must reproduce the literal backslash sequences — build them with `chr(92)."xE1"` rather than typing them, because an em dash typed as `—` can arrive as a real `—` byte and silently fail to match. For **new** strings prefer real UTF-8 (the file is UTF-8 and `<meta charset>` is set); write them via the Write tool to a scratch file and splice that in, which sidesteps escaping entirely.

**Name everything you add with an `sdc` prefix.** The minifier's own identifiers are one or two characters (`Is`, `jd`, `Aa`, `b5`), so a plain name risks colliding with one you have not read yet, and a collision inside a 450 KB single line is close to undebuggable. `sdcBase`, `sdcSplit`, `sdcSerie`, `sdcTier` and friends are all hand-written; `grep -o 'sdcFoo' index.html | wc -l` before adding one tells you instantly whether the name is free. Note that `grep -c` is useless here — the file is one line, so it always answers 1.

**Validate after every edit:**

```bash
perl -MEncode -0777 -ne 'my $ok=eval{Encode::decode("UTF-8",$_,Encode::FB_CROAK);1}; print $ok?"UTF-8 valido\n":"BYTES INVALIDOS\n";' index.html
```

**If the app breaks with a syntax error**, find the corruption by diffing against the last good commit — the first divergence should be inside your edit, and if it is not, that is the damage:

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

**Prefer not moving blocks at all.** To reorder cards, wrap the container in a flex column and set `order` on the one card that must move — that is how "Rutina de hoy" is pinned to the top of the Entreno tab. Moving text risks far more than a style property does.

### Styling constraint

The CSS at the top of `index.html` is a small hand-written subset that *looks* like Tailwind but is not. Only the classes defined there exist — `justify-end`, for example, does **not**, and silently does nothing. Check the `<style>` block before using a utility class, or use an inline `style` object.

## Running locally

Node and Python are not installed on this machine (`python` is the Microsoft Store stub). `.claude/serve.ps1` serves the folder with a PowerShell `System.Net.HttpListener`, and `.claude/launch.json` points the Browser pane's `preview_start` at it (config name `dominio-corporal`, port 8787). It binds to `http://localhost:<port>/`, which needs no elevation, sends `Cache-Control: no-store`, and rejects paths that escape the root. `localhost` is not reachable from a phone on the LAN — to test on a real device, deploy.

Testing notes that save time:
- **15–20 s pass before the first button appears, but only ~5 s of that is the typewriter** (140 characters at 28–40 ms). The rest is the 450 KB bundle plus a render-blocking Google Fonts `@import` that React injects in `w5` — duplicating the `<link>` already in `<head>`. Wait for it; do not assume a blank page is a crash.
- Driving the app by clicking a `ref` is unreliable here: refs resolve to stale coordinates when the page scrolls between the `find` and the click, and a miss can silently hit "Usar mi día de descanso" and burn the day. Prefer `javascript_tool` to click by text when scripting a test run.
- Reuse a **fresh browser tab** to read console errors. The console buffer persists across navigations, so a fixed error keeps reappearing.
- Clear `localStorage`, unregister the service worker and delete caches between runs, otherwise you test a stale bundle.
- "Saltar y empezar con valores por defecto" skips onboarding, but only activates the bodyweight modality.
- `get_page_text` returns DOM order, not visual order — it will not reflect flexbox `order`. Use a screenshot.
- The Perfil tab has a **Panel de pruebas** for jumping ranks and forcing ascension without training.

## Deploying

`git push` to `main` is the deploy. GitHub (`santiagoarague/dominio-corporal`, private) triggers Netlify, which publishes the repo root per `netlify.toml`. There is no build command.

Always confirm the change actually reached production rather than trusting the push:

```bash
until curl -s "https://glittering-snickerdoodle-2b7928.netlify.app/" | grep -q '<marcador>'; do sleep 10; done
```

## Architecture

### State and persistence

One plain object holds everything, deep-cloned with `M(e)` before mutation and saved with `K(e)`. Key branches: `profile` (name, modalities, classification, focusProfile, weeklyGoal), `progress` (rank, level, currentXP), `today`, `week`, `month`, `streak`, `dominion`, `missions`, `lifetimeReps`, `lastTrained`, `history`, `dayLog`, `ui`.

`ei(state)` is the load/migration path: it backfills missing fields, rolls the day and week over, and ends by calling `misRevisar` then `Ea`. **Any new state field needs a default here**, or old saves crash. Existing saves in the wild predate every field added recently.

### The two functions that matter

`i5(state, mode, reps)` records a completed routine: accumulates reps into lifetime/week/month, updates records and `lastTrained`, awards Dominion Points, applies the streak and history bookkeeping, computes XP, then runs `misRevisar` → `Ea` → `da` (achievements) → `ni` (training-load warning).

`Ea(state, notices)` is the level-up loop: while `currentXP >= li(level)` it levels up; when `level >= au[rank]` it flags an Ascension instead. `li(e)` is the XP cost curve, cheaper below level 50. Because XP only converts to levels inside `Ea`, **anything that grants XP must be followed by `Ea`**, and `ei` calls it on load so curve changes apply retroactively.

### Multi-session days

A day can hold one routine per modality. `today.doneModalities` lists the ones finished; the second and third sessions get +25% and +50% XP. Day-level bookkeeping — streak, `week.trained`, `week.fullDays`, `history`, the low-effort penalty and Dominion Points — must fire **only on the first session**, gated on that array being empty. `Dl()` is already idempotent per day for the streak, but the rest is not.

### Exercise selection

Rank (`ve` = E→Z) picks the exercise **variant**; the fitness test picks the **volume**. Tables: `by` (bodyweight), `F2` (gym), `P2` (flow — only `squat` and `abs`; push and pull fall back to `by`), resolved by `_d(group, rank, modality)`. Every entry has an `alt` string, surfaced by the "💡 alternativa" button, which must name a real equipment-free substitute rather than a technique tip. Targets come from `Oy(state)`; the four groups are always `squat`, `pushup`, `back`, `abs`.

Everyone starts at **rank E, level 1** regardless of the test. The test sets volume and calibre only, so stronger players do more work and climb faster without being handed dangerous movements. This is deliberate — do not wire the test's `rank` field (it is computed in `vy` and intentionally discarded).

### Volume

`jd(rank, classification, focus, modality, testResults)` = `round(base × W2[rank] × repFactor × repMult[focus])`, per group. `Oy(state, rank)` is the only caller that has the state, and it passes `state.profile.testResults`; `I2` (ascension test) and `hd`/`uy` (combat) take it as a trailing argument so every path prescribes the same volume.

`base` comes from `sdcBase(testResults, classification, modality)`, and **each modality has its own model** because they are programmed differently:

- **bodyweight** — derived from the player's measured maxima: `max(yy[classification][g], min(340, round(testMax × 1.15)))`. `W2.E` is `0.6`, so at rank E the daily total lands near 0.7× a single all-out set. `back` uses the measured pull result, falling back to `pushup × 0.85` only for saves that predate the pull test.
- **gym / flow** — fixed tables in `sdcModBase`, ignoring the test. In the gym the variable is the load, not the reps, and the player adjusts with the `kg` field; `repMult` then lands the sets in the right ranges (fuerza 8/7/5, salud 12/10/8, resistencia 17/14/11).

`yy[classification]` survives only as a **floor** on the bodyweight path, so this can raise a target but never lower one. Before this existed, the ceiling at rank E was 14 squats a day for everyone, including a player who did 114 in the test.

### Sets

The daily target is split into tappable sets. `sdcNSets(total)` gives 3 sets at ≥6 reps, 2 at ≥3, else 1 — so no set is ever worth 0. `sdcSplit(total, n)` distributes them **descending** (40/33/27, or 55/45 for two) because a flat split pretends the last set is as cheap as the first; it is not, and the fatigue lands exactly where the player is least able to absorb it. `sdcSuma(total, n, k)` returns the reps inside the first `k` sets.

`Is` renders the chips and `sdcSerie(group, k)` handles the tap. Tapping chip `k` marks sets 1..k, so a player who did three sets in a row confirms with one tap and undoes the last with a second.

**`i5` is still the only function that settles XP.** `sdcSer` (completed set counts) is component state, never persisted, and the XP shown in the header during a session is a live projection: `u.currentXP + sdcTotalHechas()`. `pg` passes `sdcRepsHechas()` to `i5`, not the raw targets. Keep it that way — moving the ledger into the tap would break `Deshacer registro de hoy` and risk double counting.

Exercises measured in time rather than reps declare it in their own `alt` ("1 rep = 3 segundos…"). `sdcSegs(alt)` parses that and the UI shows the seconds without the player opening anything. It **ignores conversions in parentheses**, which describe the substitute: the pull-group `alt` mentions "superman en el suelo (1 rep = 3 s)" and that does not make towel rows a hold.

### Unlocks

`$e` maps systems to a required level and rank; `ye(state, id)` and `yt(state, id)` test it. The rank requirements are all `"E"` on purpose: rank D needs level 50 and rank C level 100, so the original level-8/12/15 gates paired with rank D/C were unreachable. Keep new entries at rank `"E"` and gate by level alone. Levels in use: 3, 5, 8, 10, 12, 15, 20, 25, 30.

### UI composition

`Q` is a plain card; `ge` is a collapsible card taking `{id, title, accent, collapsed, onToggle, right, style}`. Collapse state lives in `ui.collapsed[id]`, read with `me(id)` and toggled with `fe(id)`. Active tab is `[Da, $t]`.

Two patterns worth knowing:
- **Collapsed by default, migration-safe:** `collapsed: H&&H.collapsed&&H.collapsed.X!==void 0 ? me("X") : !0`. Inverting the flag instead breaks saves that already stored it.
- **Hidden until requested:** the help panel and the shop render only when their flag is truthy, so nothing shows when closed — not even a title bar. The `?` button and the PD badge toggle those flags.

`af` lists the ids that "Minimizar todo" collapses; remove an id from it when a card stops being an ordinary collapsible.

**The header is permanent UI, not a card.** It carries the name, the calibre, the PD badge, the XP bar (`qa`), `Ascenso: level/threshold` and the next system to unlock. All of that used to live inside the `rango` collapsible, which started closed — so a new player never saw their XP bar move and never learned anything was coming. That card is gone; do not reintroduce one that duplicates the header.

### Feedback

There were two `@keyframes` in the whole app and neither fired on a reward. Now the head `<style>` also defines `sdcPop` (floating `+N XP`), `sdcRise` (notices) and `.sdc-chip`, all suppressed under `prefers-reduced-motion` — the browser pane has that on, so animations will look dead there while the numbers still render.

`sdcBeep(hz, ms)` wraps the existing `Ie()` oscillator and `sdcVib(pattern)` guards `navigator.vibrate`; both swallow their own errors, so call them anywhere. A set tap beeps, vibrates, floats the XP gained (`sdcFlota`) and starts the rest timer. `sdcDesc` scales that rest with the size of the set just completed (`base + reps × 1.5`, capped at 180 s) — `ag` alone gave Resistencia the most reps and the shortest rest.

`b5` classifies each notice string with `sdcTier` into `epic` / `good` / `bad` / `info`, sorts epic to the top and styles it accordingly, plus a "Cerrar todo". Tiering is done by matching the text because the notice pipeline (`i5` → `misRevisar` → `Ea` → `da` → `ni`) passes plain strings; **if you reword "Subiste a nivel" or "Ascendiste", update `sdcTier` too** or a level-up will render like a bookkeeping line again.

### Dates

Use `__fechaLocal(date)` / `ue()`. **Never `toISOString().slice(0,10)`** — that is UTC, which rolled the day over at 21:00 in Argentina and broke streaks for anyone training at night. The same bug existed in five places.

### Economy

Dominion Points: 3 for a 100% routine, 1 for ≥50%, first session of the day only. The shop is `Ey` (id, cost, name, desc) and `M2(state, id)` applies each purchase; add a branch there for every new item. The XP buff multiplier is `dominion.xpBuffMult`, read by `Ka()` — do not hardcode 1.25 again.

XP base is literally the reps performed, plus a flat **30** for a 100% routine. That bonus was 20, which made the first routine worth 44 XP against the 48 `li(1)` costs — a new player could not level up in their first session. **Any change to `li`, to the bonus, or to the volume model must keep that first level-up intact;** it is the cheapest, most load-bearing reward in the game.

Known gaps, deliberate and unfixed: the streak has four counters and pays only the `salud` profile (+15% at ≥3), the 88 achievements in `Jo` grant nothing, every shop item is a consumable so PD has no long-term sink, and the low-effort penalty takes a percentage of `currentXP` — which means it bites hardest right before a level-up and not at all just after.

### Fitness test and calibre

`Ly` runs **four** timed tests at a 2 s / 1 s cadence: `sq`, `pu`, `ab`, `bk` (inverted rows, superman as the equipment-free fallback). The arrays are `J` (onboarding) and `ci` (retest in Perfil) — they hold different hint text, so a new exercise has to be added to both, along with its state, its `onFinish` branch, the numeric shortcut and the summary row.

`iu(sq, pu, ab, bk)` = `sq + 2·pu + ab + 2·bk`, and `wy`/`Uy` band it through `vy`. The pull term was added later and the six band thresholds were **rescaled ~20%** to absorb it, so nobody changed calibre just because a term appeared. Results persist as `profile.testResults` and feed the volume model.

Two axes, kept separate on purpose:

- **Rank** is what you earn. Same ladder and same ascensions for everybody.
- **Calibre** is what you measure — `sdcCalibre(profile)` returns the `vy` label, `sdcPuntaje(profile)` the score. It shows under the name, and Perfil → Prueba de aptitud lists all six bands with the current one marked and the points still missing.

`vy` also carries `rank` and `focus` fields. `focus` is display text; `rank` is dead by design (see Exercise selection).

### Missions

Unlocked at level 10. `misRevisar` generates one weekly and one monthly objective from `lastTrained` (most-neglected muscle group) or from an unused modality, tracks them against `week`/`month` counters, and pays out. Targets are deliberately ~50% above what the prescribed routine yields, so they cannot be satisfied by training normally. There are intentionally **no daily missions** — the routine, dungeon, combat and Primal already fill that role.
