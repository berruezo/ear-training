# Ear Training

A small web app for practising musical ear training. Three exercises, browser-based UI, audio synthesised server-side from a General-MIDI soundfont.

## Exercises

- **Intervals** — identify the interval between two notes (melodic or harmonic, ascending / descending, configurable allowed intervals and tempo).
- **Chords** — identify the chord type (major / minor / augmented / diminished), always harmonic.
- **Scales** — identify the scale being played. 16 scales available (major, three minor variants, the seven church modes, major / minor pentatonic, blues, chromatic, whole tone, two diminished). Configurable direction (ascending / descending / both / random) and tempo.

Each exercise has three game modes: **Free** (open-ended practice), **Timed** (1-minute sprint) and **Streak** (play until the first mistake).

Other features: user accounts with per-user settings sync, persistent stats per exercise, light / dark theme, English / Spanish UI, admin control panel for unlocking accounts.

## Running with Docker

The simplest path — bundles libfluidsynth and the TimGM6mb soundfont.

```bash
docker compose up --build
```

Open <http://localhost:8080>. Data persists in `./data/` (volume-mounted).

## Running locally

Requires Python 3.12+, [libfluidsynth](https://www.fluidsynth.org/), and a General-MIDI soundfont at `/usr/share/sounds/sf2/TimGM6mb.sf2` (Debian / Ubuntu: `apt install libfluidsynth3 timgm6mb-soundfont`).

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

Defaults to `http://127.0.0.1:8080`. Override with `HOST` / `PORT` env vars.

## Tech stack

- Python standard-library `http.server` (no framework).
- [pyFluidSynth](https://github.com/nwhitehead/pyfluidsynth) + NumPy for audio rendering.
- [VexFlow](https://www.vexflow.com/) for the post-guess music notation.
- Vanilla JS + CSS for the frontend, no build step.

## Project layout

```
main.py                Server, auth, audio rendering, exercise picking
static/index.html      Single-page app shell with hidden per-route views
static/app.js          Routing, exercise / game / stats logic
static/style.css       Theme and component styles
static/vexflow.js      VexFlow library (bundled)
data/users.json        Per-user data (auto-created, gitignored)
Dockerfile             Container image
docker-compose.yml     Compose service definition
```

## License

Released under the [MIT License](LICENSE) — © 2026 Álvaro Berruezo.

The bundled `static/vexflow.js` is part of [VexFlow](https://github.com/vexflow/vexflow) and is distributed under its own MIT license; the original copyright notice is preserved at the top of the file.
