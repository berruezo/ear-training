# Notes for Claude

## GitHub account

This is a personal project owned by **`berruezo`** on GitHub. Every git, `gh`, or GitHub-related operation for this repo MUST use that personal account — never the owner's work account.

Before running any `gh` command or `git push`:

1. Check `gh auth status` and confirm the active account is `berruezo`. If it isn't, run `gh auth switch -u berruezo` first.
2. Do not change `origin` from HTTPS back to SSH on machines that may have other GitHub SSH keys loaded — the HTTPS + `gh auth git-credential` setup is what keeps pushes pinned to the active gh account.
3. Local `git config user.email` for this repo should be the personal address used by `berruezo`, never a work address.

This rule is permanent. Even small slips (a stray push, a `gh repo fork` under the wrong account) are considered mistakes to avoid, not minor.

## What goes into the repo

This is a public repository. Anything committed here ends up readable by the entire internet. Before adding, editing, or staging ANY file that will be committed, apply these rules:

1. **No credentials of any kind.** No app passwords, API keys, OAuth tokens, session secrets, database URLs with embedded creds, signed JWTs, SSH keys, GPG keys, `gh` tokens, `.env` files, `*.pem`, `*.key`, cloud-provider keys, service-account JSON — none of it. Not in source, not in comments, not in commit messages, not in fixture files, not in screenshots.
2. **No runtime user data.** The `data/` directory holds password hashes and per-user settings — it stays gitignored. Never commit a snapshot of it, even "scrubbed".
3. **No personal information beyond what's already public.** The public GitHub username (`berruezo`) and the personal email associated with commit authorship are already exposed by the commit log and the repo URL. Do not add new personal details: real-world location, full legal name beyond the existing commit author, phone numbers, other email addresses, family / coworker names, etc.
4. **No machine- or environment-specific paths or identifiers** that reveal who the developer is or where they work. Don't bake `/home/<username>/...` paths, work email domains, internal hostnames, VPN addresses, employer-internal URLs, or similar into source or docs.
5. **If there is the slightest doubt** — about whether a value is a secret, whether content is private, whether something is safe to be public, or whether a new file should even exist — STOP and ASK the user before committing or pushing. The user has explicitly asked for this. "I'll just be careful" is not an acceptable substitute for asking.

This rule is permanent and applies to every interaction in this repo.

## Commit / push policy

This is an **AI-first project** — code changes are expected to come from the assistant, not from hand-editing. Every prompt that modifies a tracked file ends with an automatic commit AND push to `origin/main`. Do not ask the user for permission to commit or push — standing approval has been granted.

- **One commit per prompt** by default. Bundle every change a prompt produced into a single commit. Split into multiple commits only when the work clearly covers unrelated topics.
- **Subject line:** short, imperative description of user intent. **Body:** brief explanation of what changed and why. Always include the `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>` trailer.
- **Push immediately** after each commit, after re-confirming `gh auth status` lists `berruezo` as the active account.
- **Reverts use new forward commits.** If the user asks to undo a prior change, create a new commit that reverses it and explain the reason in the message. Never `--amend` a pushed commit, never `push --force` to `main`.
- **Prompts that don't modify tracked files** (questions, explanations, debugging sessions without edits, running the app) require no commit.
- **This policy yields to the "What goes into the repo" rule above.** If a change might leak credentials or personal information, the "STOP and ASK" rule wins — do not auto-commit something that could be sensitive.

This policy is permanent and implicit. The user does NOT have to say "commit and push" — that's the default for every code-modifying prompt.

## Keeping documentation in sync

The project relies on `CLAUDE.md` (and to a lesser extent `README.md`) so any fresh Claude session can pick up work without re-reading the whole codebase. Every prompt that modifies tracked files MUST end with a deliberate doc-sync check: **does this change introduce context that a future cold-start agent would need to know, and that isn't already in the docs?**

If yes, update the docs **as part of the same commit** — not in a follow-up. The goal is that a cold-start agent reading the docs gains near-complete expertise about the project without needing to inspect the source. Source inspection should be confirmation, not first-time discovery.

**Changes that typically require a doc update:**
- New file, module, or significant function role.
- New server endpoint or a change to an existing endpoint's contract (params, headers, response shape).
- New frontend view, route, key state object, or convention.
- New external dependency or system requirement.
- New configuration option, setting, or environment variable.
- New pattern or convention that future contributors are expected to follow.
- New gotcha, edge case, or non-obvious constraint discovered while making the change.
- Anything that adds or removes a step from the existing "Adding a new exercise" checklist.

**Changes that typically do NOT require a doc update:**
- Bug fix that preserves behavior shape and the public contract.
- Pure refactor that preserves the existing API.
- Adding tests that don't change what's being tested.
- Internal helpers used by only one caller.

Default toward updating. If a fact would have helped you on this prompt and isn't in the docs, that's a sign the docs are missing context — add it. The cost of an extra paragraph in `CLAUDE.md` is trivial compared to the cost of a future agent making the wrong assumption from incomplete docs.

This rule is permanent. Doc updates are part of the change itself, not a separate task. The "no personal info" rule still applies — any doc update that might include sensitive information must pause for confirmation.

---

## How to approach tasks

**Consult this file before opening source files.** CLAUDE.md is written so a cold-start agent can understand the project's architecture, conventions, and patterns without reading the code. For any question about layout, structure, endpoints, frontend patterns, or conventions, derive the plan from the docs first. Only open source files for specifics the docs cannot provide — exact line numbers for edits, variable names not listed here, git remotes, and similar. Source inspection is confirmation, not first-time discovery.

---

# Project architecture

Read this before making non-trivial changes so cold-start sessions don't have to reverse-engineer the codebase.

## Layers

- **Server — `main.py`.** Single file using Python's stdlib `http.server.ThreadingHTTPServer`. No framework. Handles static files, exercise audio generation, auth (cookie sessions + PBKDF2), per-user settings and stats, and an admin panel.
- **Frontend — `static/`.** Vanilla JS SPA, no build step.
  - `index.html` — every screen is a `<section class="view" id="view-X" hidden>`; the router shows one at a time. Contains canonical/OG/Twitter Card meta tags, JSON-LD `WebApplication` structured data, and the theme-flash-prevention inline script.
  - `app.js` — routing, game state, audio playback, i18n strings (en + es), settings/stats sync, auth.
  - `style.css` — CSS-variable theming (`--bg`, `--text`, …) with light/dark variants on `[data-theme]`.
  - `vexflow.js` — bundled VexFlow. Don't modify.
  - `robots.txt` — allows all crawlers; includes `Sitemap:` pointer to `/sitemap.xml`.
  - `sitemap.xml` — lists all indexable URLs: canonical roots plus `?lang=en` and `?lang=es` variants for each page. Served via `STATIC_FILES` in `main.py`.

## Multilingual SEO

The site is fully translated (en + es). To signal this to search engines:
- `index.html` carries `hreflang` link tags pointing at `/?lang=en` and `/?lang=es`, plus `og:locale` / `og:locale:alternate`.
- `getInitialLang()` in `app.js` reads the `?lang=` URL query parameter first; if present it saves the value to `localStorage` and strips the param from the URL with `history.replaceState`. This means a Google result link like `https://ear-training.berruezo.es/?lang=es` lands in Spanish and then behaves like a normal navigation from that point on.
- The sitemap lists both language variants of every indexable page so Googlebot discovers and crawls them.
- **Audio.** Rendered server-side via `pyfluidsynth` against `TimGM6mb.sf2`. Central function: `render_notes_wav(midi_notes, note_duration_s, simultaneous=False)`.
- **Storage.** `data/users.json` (gitignored). Holds PBKDF2 password hashes, per-user `settings`, and per-user `stats`.

## Server endpoints

| Endpoint | Purpose |
|---|---|
| `/` and all SPA routes (`/interval-recognition`, `/chord-recognition/play`, `/scale-recognition/results`, `/account`, `/stats`, `/admin`, `/debug`, …) | Serve `index.html`. Listed in `STATIC_FILES`. Add new SPA routes here. |
| `/exercise?mode=&range=&direction=&tempo=&allowed=` | Interval exercise — returns WAV + `X-Interval`, `X-Notes`. |
| `/chord/exercise` | Chord exercise — returns WAV + `X-Chord`, `X-Notes`. |
| `/scale/exercise?direction=&tempo=&allowed=` | Scale exercise — returns WAV + `X-Scale`, `X-Direction`, `X-Notes`. |
| `/debug/notes?notes=…`, `/debug/info` | Internal debug tools (admin-only via UI). |
| `/auth/login`, `/auth/register`, `/auth/logout`, `/auth/me` | Session auth (cookie `session`). |
| `/api/settings` (GET/PUT), `/api/stats` (GET/POST) | Per-user state sync. |
| `/api/account/username`, `/api/account/password`, `/api/account` | Profile mutations. |
| `/api/admin/users`, `/api/admin/unlock` | Admin-only. |

## Frontend key objects (`app.js`)

- **`gameState`** — current game's state: `exercise`, `groups[]` (each with `audioUrl`, `notes`, `correctAnswer`, `userGuess`, timing, etc.), `currentIndex`, `score`, `playMode`, timer state, `allowedIntervals`, `allowedScales`. Reset on entry to `view-game` via `resetGameState()`.
- **`STRINGS`** — `{ en: {...}, es: {...} }`. Every user-visible string MUST exist in both. HTML uses `data-i18n="key"`, `data-i18n-aria-label="key"`, `data-i18n-title="key"`, `data-i18n-placeholder="key"`. `applyLanguage()` propagates.
- **`ROUTES`** — path → `view-X` id. The SPA router (`showRoute(path)` / `navigate(path)`) shows the matching view, handles `gameState.exercise` for exercise paths, and calls per-view init (`renderResults`, `renderStatsPage`, etc.).
- **`SCALE_I18N_KEY`** / similar lookup tables map exercise-specific values to i18n keys. Same pattern is the right one for any new exercise.

## Adding a new exercise — checklist

The three existing exercises (interval, chord, scale) all follow this pattern. To add a fourth, touch every item below or the integration will be partial.

### `main.py`
- [ ] Add the exercise's data dict near `CHORD_TYPES` / `SCALE_TYPES` (e.g. `MELODY_PATTERNS`).
- [ ] Add a picker function (`pick_<exercise>(...)`) returning the name + chosen MIDI notes (mirror `pick_chord` / `pick_scale`).
- [ ] Add a new endpoint `/<exercise>/exercise` in `Handler.do_GET` — parse query params, call picker, call `render_notes_wav`, write WAV + `X-<Exercise>` + `X-Notes` headers.
- [ ] Add three SPA routes to `STATIC_FILES`: `/<exercise>-recognition`, `/<exercise>-recognition/play`, `/<exercise>-recognition/results`.
- [ ] Accept `"<exercise>"` in `_handle_post_stats`'s `exercise not in (...)` check.

### `static/index.html`
- [ ] Add an `<a class="exercise-item">` tile in `#view-home`'s exercise-list, routing to `/<exercise>-recognition`.
- [ ] Add a `<section class="card view" id="view-<exercise>" hidden>` config view — Game mode (Free/Timed/Streak), exercise-specific config, allowed-items toggles, and a Start play-btn routed to `/<exercise>-recognition/play`.
- [ ] Add a `.<exercise>-grid` of guess buttons inside `#view-game`, hidden by default, alongside `#interval-answers` / `#chord-answers` / `#scale-answers`. Each button: `data-<exercise>="<value>"`.

### `static/app.js`
- [ ] Add en + es strings: name, description, any new labels, every answer value.
- [ ] Add the three routes to `ROUTES`.
- [ ] Update `showRoute()` so the config and play paths set `gameState.exercise = '<exercise>'` (do NOT set it for the `/results` path — results inherits).
- [ ] Update `exerciseBasePath()` to return `/<exercise>-recognition`.
- [ ] Update `syncExerciseUI()` — show/hide the new answer grid, set the title key.
- [ ] If the exercise has its own server params, add a `build<Exercise>Params()`; if it has its own tempo input, add the controls.
- [ ] Update `playCurrentGroup()` — fetch the new endpoint, read `X-<Exercise>` and `X-Notes`, set `g.correctAnswer`, set `g.unlockOffset` (0 if the user can guess as soon as audio starts).
- [ ] Update `updateGuessButtons()` — branch for the new exercise to apply correct/wrong/disabled classes to its buttons.
- [ ] Update `updateStaff()` if the exercise should render notation post-guess (skip if too many notes / different shape).
- [ ] Wire `.<exercise>-btn` click handlers: `handleGuess(btn.dataset.<exercise>)`.
- [ ] Wire allowed-items toggle clicks (mirror `.interval-toggle` / `.scale-toggle`).
- [ ] Update `answerKeysForExercise()`, `labelForKey()`, `exerciseTitle()` — all three.
- [ ] Update `capturePlayMode()` — switch on `gameState.exercise` to read the right `<exercise>-play-mode` radio.
- [ ] Update `makeEmptyGroup()` — add an `<exercise>: null` field.
- [ ] Update `resetGameState()` — capture exercise-specific allowed values.
- [ ] Update `gatherSettings()` / `applySettings()` — add the `<exercise>: { ... }` section so per-user settings persist.
- [ ] Update the global `change` event listener selector to include the new exercise's form controls; hook click handlers on toggle buttons and tempo +/- so they trigger `scheduleSettingsSave()`.
- [ ] Update `renderStatsPage()` — add `'<exercise>'` to the rendered sections list.

### `static/style.css`
- [ ] Add `.<exercise>-grid`, `.<exercise>-btn`, `.<exercise>-toggle` rules modelled on the `.scale-*` set, plus matching `@media` tweaks.

If any step is missed the app still partly works but breaks subtly — e.g. forgetting `applySettings` means the user's choices don't survive logout; forgetting `renderStatsPage` means games count but never appear in the stats page.

## Other recurring patterns

- **Adding a new setting** — `gatherSettings()` writes it, `applySettings()` reads it, and the change handler near the bottom of `app.js` schedules a save. All three must be touched.
- **Adding a new i18n string** — append to BOTH `en` and `es` blocks in `STRINGS`. Use a `data-i18n="key"` attribute in HTML (or call `STRINGS[lang][key]` in JS).
- **Routes shared across exercises** (`view-game` and `view-results`) — their back / finish buttons have their `data-route` rewritten dynamically by `syncExerciseUI()`. Don't hard-code per-exercise paths into those views.
- **Admin** — username literally `"admin"` (constant `ADMIN_USERNAME`). Exempt from permanent lock. Sees `/admin` and `/debug` entries on the home view.
- **Theme + language flash prevention** — the inline `<script>` in `index.html`'s `<head>` applies `data-theme` synchronously before CSS loads. Don't move it.

## Production deployment

The app is publicly hosted at **<https://ear-training.berruezo.es>**. There is no CI/CD pipeline — a manual deploy step (out of scope for this repo) is needed after pushing changes. When verifying a change end-to-end, prefer the local server; treat the public URL as the canonical live reference.

## Running locally for verification

System deps (Debian/Ubuntu): `apt install libfluidsynth3 timgm6mb-soundfont`. Soundfont path is hardcoded to `/usr/share/sounds/sf2/TimGM6mb.sf2`.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
PORT=8080 python main.py
```

Set `HTTPS=1` in production to add the `Secure` flag to session cookies. Omit it (or set it to `0`) for local HTTP development.

Then `curl http://127.0.0.1:8080/exercise?mode=melodic&tempo=120` (etc.) to smoke-test endpoints, or open the browser at the root.
