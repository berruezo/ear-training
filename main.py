import collections
import hashlib
import http.server
import io
import json
import os
import random
import re
import secrets
import threading
import time
import wave
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import fluidsynth
import numpy as np

VERSION = "0.4.2"

SOUNDFONT = "/usr/share/sounds/sf2/TimGM6mb.sf2"
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")
HOST = os.environ.get("HOST", "127.0.0.1")
PORT = int(os.environ.get("PORT", "8080"))
HTTPS = os.environ.get("HTTPS", "0") == "1"

STATIC_FILES = {
    "/": ("index.html", "text/html; charset=utf-8"),
    "/interval-recognition": ("index.html", "text/html; charset=utf-8"),
    "/interval-recognition/play": ("index.html", "text/html; charset=utf-8"),
    "/interval-recognition/results": ("index.html", "text/html; charset=utf-8"),
    "/chord-recognition": ("index.html", "text/html; charset=utf-8"),
    "/chord-recognition/play": ("index.html", "text/html; charset=utf-8"),
    "/chord-recognition/results": ("index.html", "text/html; charset=utf-8"),
    "/scale-recognition": ("index.html", "text/html; charset=utf-8"),
    "/scale-recognition/play": ("index.html", "text/html; charset=utf-8"),
    "/scale-recognition/results": ("index.html", "text/html; charset=utf-8"),
    "/debug": ("index.html", "text/html; charset=utf-8"),
    "/account": ("index.html", "text/html; charset=utf-8"),
    "/stats": ("index.html", "text/html; charset=utf-8"),
    "/admin": ("index.html", "text/html; charset=utf-8"),
    "/robots.txt": ("robots.txt", "text/plain; charset=utf-8"),
    "/google3d2df6effca9ce93.html": ("google3d2df6effca9ce93.html", "text/html; charset=utf-8"),
    "/sitemap.xml": ("sitemap.xml", "application/xml; charset=utf-8"),
    "/style.css": ("style.css", "text/css; charset=utf-8"),
    "/app.js": ("app.js", "application/javascript; charset=utf-8"),
    "/favicon.svg": ("favicon.svg", "image/svg+xml"),
    "/vexflow.js": ("vexflow.js", "application/javascript; charset=utf-8"),
}

CHORD_TYPES: dict[str, list[int]] = {
    "major":      [0, 4, 7],
    "minor":      [0, 3, 7],
    "augmented":  [0, 4, 8],
    "diminished": [0, 3, 6],
}

# Ascending semitone offsets from root (including the octave on top).
# Used as the canonical "up" pattern; descending plays the reverse, with
# special handling for classical melodic minor (natural minor on the way
# down).
SCALE_TYPES: dict[str, list[int]] = {
    "major":            [0, 2, 4, 5, 7, 9, 11, 12],
    "natural_minor":    [0, 2, 3, 5, 7, 8, 10, 12],
    "harmonic_minor":   [0, 2, 3, 5, 7, 8, 11, 12],
    "melodic_minor":    [0, 2, 3, 5, 7, 9, 11, 12],
    "dorian":           [0, 2, 3, 5, 7, 9, 10, 12],
    "phrygian":         [0, 1, 3, 5, 7, 8, 10, 12],
    "lydian":           [0, 2, 4, 6, 7, 9, 11, 12],
    "mixolydian":       [0, 2, 4, 5, 7, 9, 10, 12],
    "locrian":          [0, 1, 3, 5, 6, 8, 10, 12],
    "major_pentatonic": [0, 2, 4, 7, 9, 12],
    "minor_pentatonic": [0, 3, 5, 7, 10, 12],
    "blues":            [0, 3, 5, 6, 7, 10, 12],
    "chromatic":        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    "whole_tone":       [0, 2, 4, 6, 8, 10, 12],
    "diminished_wh":    [0, 2, 3, 5, 6, 8, 9, 11, 12],
    "diminished_hw":    [0, 1, 3, 4, 6, 7, 9, 10, 12],
}

# Classical convention: melodic minor uses the natural-minor pattern when
# descending. Everything else mirrors the ascending pattern.
SCALE_DESCENDING_OVERRIDES: dict[str, list[int]] = {
    "melodic_minor": [0, 2, 3, 5, 7, 8, 10, 12],
}

VALID_SCALE_DIRECTIONS = ("ascendent", "descendent", "any", "both")
DEFAULT_SCALE_DIRECTION = "any"

LOWEST_MIDI_NOTE = 45   # A2
HIGHEST_MIDI_NOTE = 72  # C5
SAMPLE_RATE = 44100
VELOCITY = 96
NOTES_PER_EXERCISE = 2

MIN_TEMPO = 30
MAX_TEMPO = 400
DEFAULT_TEMPO = 120

HARMONIC_DURATION_S = 1.0  # fixed hold time when both notes sound together
VALID_MODES = ("melodic", "harmonic")
DEFAULT_MODE = "melodic"

VALID_DIRECTIONS = ("ascendent", "descendent", "any")
DEFAULT_DIRECTION = "any"

_synth = fluidsynth.Synth(samplerate=SAMPLE_RATE)
_sfid = _synth.sfload(SOUNDFONT)
_synth.program_select(0, _sfid, 0, 0)  # Acoustic Grand Piano
_synth_lock = threading.Lock()


VALID_RANGES = ("octave", "beyond", "any")
DEFAULT_RANGE = "octave"


DATA_DIR = Path(os.environ.get("DATA_DIR", os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")))
USERS_FILE = DATA_DIR / "users.json"
CONNECTIONS_FILE = DATA_DIR / "connections.json"
USERNAME_RE = re.compile(r"^[a-zA-Z0-9_-]{3,32}$")
PASSWORD_MIN_LEN = 6
SESSION_TTL_S = 30 * 86400
SESSION_COOKIE = "session"
PBKDF2_ITERS = 200_000

MAX_FAILED_ATTEMPTS = 5                       # consecutive wrong passwords before temp lock
LOCKOUT_DURATION_S = 60 * 60                  # length of a temp lock (1 hour)
MAX_LOCKOUTS = 3                              # consecutive temp locks before permanent lock
ADMIN_USERNAME = "admin"                      # exempt from permanent lock

_users_lock = threading.Lock()
_sessions: dict[str, tuple[str, float]] = {}  # token -> (username, expires_at)
_last_access_cache: dict[str, float] = {}     # username -> last time we persisted last_access
LAST_ACCESS_THROTTLE_S = 60                   # min interval between persisted last_access updates

_connections_lock = threading.Lock()
_connection_log: collections.deque = collections.deque(maxlen=500)
CONNECTION_LOG_LIMIT = 500


def load_users() -> dict:
    if not USERS_FILE.exists():
        return {}
    try:
        return json.loads(USERS_FILE.read_text())
    except Exception:
        return {}


def save_users(users: dict) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    tmp = USERS_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(users, indent=2, sort_keys=True))
    tmp.replace(USERS_FILE)


def load_connections() -> list:
    if not CONNECTIONS_FILE.exists():
        return []
    try:
        return json.loads(CONNECTIONS_FILE.read_text())
    except Exception:
        return []


def save_connections(entries: list) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    tmp = CONNECTIONS_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(entries))
    tmp.replace(CONNECTIONS_FILE)


def hash_password(password: str, salt: bytes | None = None) -> tuple[bytes, bytes]:
    if salt is None:
        salt = secrets.token_bytes(16)
    h = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERS)
    return salt, h


def check_password(password: str, salt_hex: str, hash_hex: str) -> bool:
    salt = bytes.fromhex(salt_hex)
    _, candidate = hash_password(password, salt)
    return secrets.compare_digest(candidate, bytes.fromhex(hash_hex))


def lookup_user(users: dict, username: str) -> str | None:
    """Case-insensitive lookup; returns the stored (case-preserving) key or None."""
    lower = username.lower()
    for key in users:
        if key.lower() == lower:
            return key
    return None


def create_session(username: str) -> str:
    token = secrets.token_urlsafe(32)
    _sessions[token] = (username, time.time() + SESSION_TTL_S)
    return token


def resolve_session(token: str | None) -> str | None:
    if not token:
        return None
    entry = _sessions.get(token)
    if not entry:
        return None
    username, expires = entry
    if time.time() > expires:
        _sessions.pop(token, None)
        return None
    _touch_last_access(username)
    return username


def _touch_last_access(username: str) -> None:
    """Persist `last_access_at` for a user, throttled to once per
    LAST_ACCESS_THROTTLE_S seconds (per-process)."""
    now = time.time()
    if now - _last_access_cache.get(username, 0.0) < LAST_ACCESS_THROTTLE_S:
        return
    _last_access_cache[username] = now
    with _users_lock:
        users = load_users()
        if username in users:
            users[username]["last_access_at"] = now
            save_users(users)


def drop_session(token: str) -> None:
    _sessions.pop(token, None)


def drop_sessions_for(username: str) -> None:
    for tok in [t for t, (u, _) in _sessions.items() if u == username]:
        _sessions.pop(tok, None)


def rename_sessions(old_username: str, new_username: str) -> None:
    for tok, (u, exp) in list(_sessions.items()):
        if u == old_username:
            _sessions[tok] = (new_username, exp)


def make_session_cookie(token: str, max_age: int = SESSION_TTL_S) -> str:
    parts = [f"{SESSION_COOKIE}={token}", f"Max-Age={max_age}", "Path=/", "HttpOnly", "SameSite=Lax"]
    if HTTPS:
        parts.append("Secure")
    return "; ".join(parts)


def pick_chord(allowed: list[str] | None = None) -> tuple[str, list[int]]:
    pool = [c for c in (allowed or []) if c in CHORD_TYPES] or list(CHORD_TYPES.keys())
    name = random.choice(pool)
    intervals = CHORD_TYPES[name]
    max_offset = max(intervals)
    root = random.randint(LOWEST_MIDI_NOTE, HIGHEST_MIDI_NOTE - max_offset)
    return name, [root + i for i in intervals]


def apply_chord_inversion(notes: list[int]) -> list[int]:
    """Rotate notes to a random inversion (including root position) by raising
    the lowest note one octave at a time."""
    result = list(notes)
    inversion = random.randint(0, len(result) - 1)
    for _ in range(inversion):
        result[0] += 12
        result.sort()
    return result


def pick_scale(direction: str, allowed: list[str] | None = None) -> tuple[str, str, list[int]]:
    """Pick a scale at random and produce its MIDI note sequence.

    Returns (scale_name, resolved_direction, midi_notes). `resolved_direction`
    is the concrete direction actually used ("ascendent"/"descendent"/"both"),
    after collapsing "any" into one of the simple options.
    """
    pool = [s for s in (allowed or []) if s in SCALE_TYPES] or list(SCALE_TYPES.keys())
    name = random.choice(pool)

    if direction == "any":
        resolved = random.choice(("ascendent", "descendent"))
    elif direction in VALID_SCALE_DIRECTIONS:
        resolved = direction
    else:
        resolved = "ascendent"

    up_intervals = SCALE_TYPES[name]
    down_intervals = SCALE_DESCENDING_OVERRIDES.get(name, up_intervals)
    max_offset = max(max(up_intervals), max(down_intervals))
    root = random.randint(LOWEST_MIDI_NOTE, HIGHEST_MIDI_NOTE - max_offset)

    up_notes = [root + i for i in up_intervals]
    down_notes = [root + i for i in reversed(down_intervals)]

    if resolved == "ascendent":
        notes = up_notes
    elif resolved == "descendent":
        notes = down_notes
    else:  # "both" — ascending then descending, top note sounded twice
        notes = up_notes + down_notes

    return name, resolved, notes


def pick_note_pair(
    direction: str,
    range_mode: str,
    allowed_classes: list[int] | None = None,
) -> list[int]:
    if not allowed_classes:
        allowed_classes = list(range(13))
    span = HIGHEST_MIDI_NOTE - LOWEST_MIDI_NOTE

    # For each allowed class, collect the semitone offsets compatible with the
    # selected range_mode. "octave" keeps only simple intervals (0..12);
    # "beyond" keeps only compound intervals (>12); "any" keeps everything.
    by_class: dict[int, list[int]] = {}
    for c in allowed_classes:
        opts: list[int] = []
        if c == 0:
            if range_mode in ("octave", "any"):
                opts.append(0)
        else:
            level = 0
            while c + 12 * level <= span:
                s = c + 12 * level
                if range_mode == "octave" and s > 12:
                    pass
                elif range_mode == "beyond" and s <= 12:
                    pass
                else:
                    opts.append(s)
                level += 1
        if opts:
            by_class[c] = opts

    # Fallback if the user's allowed set + range_mode has no valid combinations
    # (e.g., only Unison selected with range_mode="beyond").
    if not by_class:
        by_class = {c: [c] for c in allowed_classes if c != 0} or {c: [c] for c in range(13)}

    chosen_class = random.choice(list(by_class.keys()))
    semitones = random.choice(by_class[chosen_class])

    lower = random.randint(LOWEST_MIDI_NOTE, HIGHEST_MIDI_NOTE - semitones)
    higher = lower + semitones
    if direction == "ascendent":
        return [lower, higher]
    if direction == "descendent":
        return [higher, lower]
    # "any" — pick order uniformly at random
    return [lower, higher] if random.random() < 0.5 else [higher, lower]


RELEASE_TAIL_S = 0.4   # natural decay captured after the final noteoff
FADE_IN_S = 0.008      # short linear ramp at the start, kills the click
FADE_OUT_S = 0.030     # short linear ramp at the end, smooths into silence


def _apply_fades(stereo_i16: np.ndarray, fade_in: int, fade_out: int) -> np.ndarray:
    """In-place fade-in/fade-out on int16 interleaved stereo samples."""
    n_frames = stereo_i16.size // 2
    if n_frames < fade_in + fade_out:
        return stereo_i16
    arr = stereo_i16.reshape(-1, 2).astype(np.float32)
    if fade_in > 0:
        ramp = np.linspace(0.0, 1.0, fade_in, dtype=np.float32)[:, np.newaxis]
        arr[:fade_in] *= ramp
    if fade_out > 0:
        ramp = np.linspace(1.0, 0.0, fade_out, dtype=np.float32)[:, np.newaxis]
        arr[-fade_out:] *= ramp
    return arr.astype(np.int16).flatten()


def render_notes_wav(
    midi_notes: list[int],
    note_duration_s: float,
    simultaneous: bool = False,
) -> bytes:
    hold_samples = int(SAMPLE_RATE * note_duration_s)
    release_samples = int(SAMPLE_RATE * RELEASE_TAIL_S)
    fade_in_samples = int(SAMPLE_RATE * FADE_IN_S)
    fade_out_samples = int(SAMPLE_RATE * FADE_OUT_S)

    chunks: list[np.ndarray] = []
    with _synth_lock:
        if simultaneous:
            for note in midi_notes:
                _synth.noteon(0, note, VELOCITY)
            chunks.append(_synth.get_samples(hold_samples))
            for note in midi_notes:
                _synth.noteoff(0, note)
        else:
            for note in midi_notes:
                _synth.noteon(0, note, VELOCITY)
                chunks.append(_synth.get_samples(hold_samples))
                _synth.noteoff(0, note)
        # Capture the natural release tail of the final note(s).
        chunks.append(_synth.get_samples(release_samples))

    samples = np.concatenate(chunks).astype(np.int16)
    samples = _apply_fades(samples, fade_in_samples, fade_out_samples)
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        wav.writeframes(samples.tobytes())
    return buf.getvalue()


class Handler(http.server.BaseHTTPRequestHandler):
    # -- helpers --------------------------------------------------------
    def _send_json(self, status: int, payload: dict, set_cookie: str | None = None) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        if set_cookie:
            self.send_header("Set-Cookie", set_cookie)
        self.end_headers()
        self.wfile.write(body)

    def _read_json_body(self) -> dict:
        try:
            length = int(self.headers.get("Content-Length", "0") or "0")
        except ValueError:
            length = 0
        if length <= 0 or length > 65536:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            return {}

    def _session_token(self) -> str | None:
        raw = self.headers.get("Cookie", "")
        for part in raw.split(";"):
            part = part.strip()
            if part.startswith(SESSION_COOKIE + "="):
                return part[len(SESSION_COOKIE) + 1:]
        return None

    def _current_user(self) -> str | None:
        return resolve_session(self._session_token())

    # -- auth & account endpoints --------------------------------------
    def _handle_register(self) -> None:
        data = self._read_json_body()
        username = (data.get("username") or "").strip()
        password = data.get("password") or ""
        if not USERNAME_RE.match(username):
            return self._send_json(400, {"error": "invalid_username"})
        if len(password) < PASSWORD_MIN_LEN:
            return self._send_json(400, {"error": "password_too_short"})
        with _users_lock:
            users = load_users()
            if lookup_user(users, username):
                return self._send_json(409, {"error": "username_taken"})
            salt, pwhash = hash_password(password)
            created_at = int(time.time())
            users[username] = {
                "salt": salt.hex(),
                "hash": pwhash.hex(),
                "created_at": created_at,
                "settings": {},
            }
            save_users(users)
        token = create_session(username)
        self._send_json(200, {"ok": True, "username": username, "settings": {},
                              "createdAt": created_at},
                        set_cookie=make_session_cookie(token))

    def _handle_login(self) -> None:
        data = self._read_json_body()
        username = (data.get("username") or "").strip()
        password = data.get("password") or ""
        now = time.time()
        with _users_lock:
            users = load_users()
            key = lookup_user(users, username)
            if not key:
                return self._send_json(401, {"error": "invalid_credentials"})
            entry = users[key]
            if entry.get("permanently_locked"):
                return self._send_json(423, {"error": "account_locked_permanent"})
            lock_until = entry.get("lock_until") or 0
            if lock_until > now:
                return self._send_json(423, {"error": "account_locked_temporary",
                                             "lockedUntil": lock_until})
            # Expired lock — clear the timestamp, keep lock_count for the 3-strikes rule
            if lock_until:
                entry["lock_until"] = 0
            if not check_password(password, entry["salt"], entry["hash"]):
                entry["failed_attempts"] = (entry.get("failed_attempts") or 0) + 1
                if entry["failed_attempts"] >= MAX_FAILED_ATTEMPTS:
                    entry["failed_attempts"] = 0
                    entry["lock_count"] = (entry.get("lock_count") or 0) + 1
                    if entry["lock_count"] >= MAX_LOCKOUTS and key != ADMIN_USERNAME:
                        entry["permanently_locked"] = True
                        save_users(users)
                        return self._send_json(423, {"error": "account_locked_permanent"})
                    entry["lock_until"] = now + LOCKOUT_DURATION_S
                    save_users(users)
                    return self._send_json(423, {"error": "account_locked_temporary",
                                                 "lockedUntil": entry["lock_until"]})
                save_users(users)
                return self._send_json(401, {"error": "invalid_credentials"})
            # Successful login — reset all lock state
            entry["failed_attempts"] = 0
            entry["lock_count"] = 0
            entry["lock_until"] = 0
            entry["last_access_at"] = now
            _last_access_cache[key] = now
            save_users(users)
            settings = entry.get("settings", {})
            created_at = entry.get("created_at")
        token = create_session(key)
        self._send_json(200, {"ok": True, "username": key, "settings": settings,
                              "createdAt": created_at},
                        set_cookie=make_session_cookie(token))

    def _handle_logout(self) -> None:
        token = self._session_token()
        if token:
            drop_session(token)
        self._send_json(200, {"ok": True}, set_cookie=make_session_cookie("", max_age=0))

    def _handle_me(self) -> None:
        user = self._current_user()
        if not user:
            return self._send_json(200, {"logged_in": False})
        with _users_lock:
            users = load_users()
            entry = users.get(user, {})
            settings = entry.get("settings", {})
            created_at = entry.get("created_at")
        self._send_json(200, {"logged_in": True, "username": user, "settings": settings,
                              "createdAt": created_at})

    def _empty_exercise_stats(self) -> dict:
        return {
            "gamesFinished": 0,
            "totalGuesses": 0,
            "totalCorrect": 0,
            "totalTimeMs": 0,
            "longestStreak": 0,
            "firstPlayedAt": None,
            "lastPlayedAt": None,
            "perClass": {},
            "byPlayMode": {},
        }

    def _handle_admin_users(self) -> None:
        if self._current_user() != ADMIN_USERNAME:
            return self._send_json(403, {"error": "forbidden"})
        with _users_lock:
            users = load_users()
            rows = [
                {
                    "username": name,
                    "createdAt": data.get("created_at"),
                    "lastAccessAt": data.get("last_access_at"),
                    "lockUntil": data.get("lock_until") or 0,
                    "lockCount": data.get("lock_count") or 0,
                    "permanentlyLocked": bool(data.get("permanently_locked")),
                    "failedAttempts": data.get("failed_attempts") or 0,
                }
                for name, data in users.items()
            ]
        # Most recent registrations first
        rows.sort(key=lambda r: r["createdAt"] or 0, reverse=True)
        self._send_json(200, {"users": rows})

    def _handle_admin_unlock(self) -> None:
        if self._current_user() != ADMIN_USERNAME:
            return self._send_json(403, {"error": "forbidden"})
        data = self._read_json_body()
        target = (data.get("username") or "").strip()
        if not target:
            return self._send_json(400, {"error": "invalid_username"})
        with _users_lock:
            users = load_users()
            key = lookup_user(users, target)
            if not key:
                return self._send_json(404, {"error": "user_not_found"})
            entry = users[key]
            entry["failed_attempts"] = 0
            entry["lock_count"] = 0
            entry["lock_until"] = 0
            entry["permanently_locked"] = False
            save_users(users)
        self._send_json(200, {"ok": True, "username": key})

    def _handle_admin_connections(self) -> None:
        if self._current_user() != ADMIN_USERNAME:
            return self._send_json(403, {"error": "forbidden"})
        with _connections_lock:
            entries = list(_connection_log)
        entries.reverse()  # newest first
        self._send_json(200, {"connections": entries[:100]})

    def _handle_get_stats(self) -> None:
        user = self._current_user()
        if not user:
            return self._send_json(401, {"error": "unauthorized"})
        with _users_lock:
            users = load_users()
            stats = users.get(user, {}).get("stats", {})
        self._send_json(200, {"stats": stats})

    def _handle_post_stats(self) -> None:
        user = self._current_user()
        if not user:
            return self._send_json(401, {"error": "unauthorized"})
        d = self._read_json_body()
        exercise = d.get("exercise")
        if exercise not in ("interval", "chord", "scale"):
            return self._send_json(400, {"error": "invalid_exercise"})
        gtotal = int(d.get("totalGuesses") or 0)
        if gtotal <= 0:
            return self._send_json(200, {"ok": True})  # ignore empty rounds
        gcorrect = max(0, min(gtotal, int(d.get("totalCorrect") or 0)))
        gtime = max(0, int(d.get("totalTimeMs") or 0))
        gstreak = max(0, int(d.get("longestStreak") or 0))
        play_mode = d.get("playMode")
        with _users_lock:
            users = load_users()
            if user not in users:
                return self._send_json(404, {"error": "user_not_found"})
            stats = users[user].setdefault("stats", {})
            e = stats.setdefault(exercise, self._empty_exercise_stats())
            e["gamesFinished"] = int(e.get("gamesFinished") or 0) + 1
            e["totalGuesses"] = int(e.get("totalGuesses") or 0) + gtotal
            e["totalCorrect"] = int(e.get("totalCorrect") or 0) + gcorrect
            e["totalTimeMs"] = int(e.get("totalTimeMs") or 0) + gtime
            if gstreak > int(e.get("longestStreak") or 0):
                e["longestStreak"] = gstreak
            now = time.time()
            if not e.get("firstPlayedAt"):
                e["firstPlayedAt"] = now
            e["lastPlayedAt"] = now
            # Per-class delta merge
            per_in = d.get("perClass") or {}
            if isinstance(per_in, dict):
                pc = e.setdefault("perClass", {})
                for cls, info in per_in.items():
                    if not isinstance(info, dict):
                        continue
                    bucket = pc.setdefault(str(cls), {"correct": 0, "wrong": 0, "timeMs": 0})
                    bucket["correct"] += max(0, int(info.get("correct") or 0))
                    bucket["wrong"]   += max(0, int(info.get("wrong") or 0))
                    bucket["timeMs"]  += max(0, int(info.get("timeMs") or 0))
            # Per-play-mode delta
            if play_mode in ("free", "timed", "streak"):
                bp = e.setdefault("byPlayMode", {})
                b = bp.setdefault(play_mode, {"games": 0, "correct": 0, "wrong": 0, "timeMs": 0})
                b["games"]   += 1
                b["correct"] += gcorrect
                b["wrong"]   += (gtotal - gcorrect)
                b["timeMs"]  += gtime
            save_users(users)
        self._send_json(200, {"ok": True})

    def _handle_put_settings(self) -> None:
        user = self._current_user()
        if not user:
            return self._send_json(401, {"error": "unauthorized"})
        data = self._read_json_body()
        settings = data.get("settings")
        if not isinstance(settings, dict):
            return self._send_json(400, {"error": "invalid_body"})
        with _users_lock:
            users = load_users()
            if user not in users:
                return self._send_json(404, {"error": "user_not_found"})
            users[user]["settings"] = settings
            save_users(users)
        self._send_json(200, {"ok": True})

    def _handle_change_username(self) -> None:
        user = self._current_user()
        if not user:
            return self._send_json(401, {"error": "unauthorized"})
        data = self._read_json_body()
        new_name = (data.get("newUsername") or "").strip()
        current_pw = data.get("currentPassword") or ""
        if not USERNAME_RE.match(new_name):
            return self._send_json(400, {"error": "invalid_username"})
        with _users_lock:
            users = load_users()
            if user not in users:
                return self._send_json(404, {"error": "user_not_found"})
            if not check_password(current_pw, users[user]["salt"], users[user]["hash"]):
                return self._send_json(401, {"error": "invalid_password"})
            existing = lookup_user(users, new_name)
            if existing and existing != user:
                return self._send_json(409, {"error": "username_taken"})
            users[new_name] = users.pop(user)
            save_users(users)
        rename_sessions(user, new_name)
        self._send_json(200, {"ok": True, "username": new_name})

    def _handle_change_password(self) -> None:
        user = self._current_user()
        if not user:
            return self._send_json(401, {"error": "unauthorized"})
        data = self._read_json_body()
        current_pw = data.get("currentPassword") or ""
        new_pw = data.get("newPassword") or ""
        if len(new_pw) < PASSWORD_MIN_LEN:
            return self._send_json(400, {"error": "password_too_short"})
        with _users_lock:
            users = load_users()
            if user not in users:
                return self._send_json(404, {"error": "user_not_found"})
            if not check_password(current_pw, users[user]["salt"], users[user]["hash"]):
                return self._send_json(401, {"error": "invalid_password"})
            salt, pwhash = hash_password(new_pw)
            users[user]["salt"] = salt.hex()
            users[user]["hash"] = pwhash.hex()
            save_users(users)
        self._send_json(200, {"ok": True})

    def _handle_delete_account(self) -> None:
        user = self._current_user()
        if not user:
            return self._send_json(401, {"error": "unauthorized"})
        data = self._read_json_body()
        current_pw = data.get("currentPassword") or ""
        with _users_lock:
            users = load_users()
            if user not in users:
                return self._send_json(404, {"error": "user_not_found"})
            if not check_password(current_pw, users[user]["salt"], users[user]["hash"]):
                return self._send_json(401, {"error": "invalid_password"})
            del users[user]
            save_users(users)
        drop_sessions_for(user)
        self._send_json(200, {"ok": True}, set_cookie=make_session_cookie("", max_age=0))

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/auth/register":
            return self._handle_register()
        if parsed.path == "/auth/login":
            return self._handle_login()
        if parsed.path == "/auth/logout":
            return self._handle_logout()
        if parsed.path == "/api/stats":
            return self._handle_post_stats()
        if parsed.path == "/api/admin/unlock":
            return self._handle_admin_unlock()
        self.send_response(404)
        self.end_headers()

    def do_PUT(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/settings":
            return self._handle_put_settings()
        if parsed.path == "/api/account/username":
            return self._handle_change_username()
        if parsed.path == "/api/account/password":
            return self._handle_change_password()
        self.send_response(404)
        self.end_headers()

    def do_DELETE(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/account":
            return self._handle_delete_account()
        self.send_response(404)
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)

        if parsed.path in STATIC_FILES:
            filename, content_type = STATIC_FILES[parsed.path]
            try:
                with open(os.path.join(STATIC_DIR, filename), "rb") as f:
                    data = f.read()
            except FileNotFoundError:
                self.send_response(404)
                self.end_headers()
                return
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)
            if filename == "index.html":
                entry = {
                    "ts": time.time(),
                    "ip": self.client_address[0],
                    "path": parsed.path,
                    "user": self._current_user(),
                    "ua": (self.headers.get("User-Agent") or "")[:200],
                }
                with _connections_lock:
                    _connection_log.append(entry)
                    save_connections(list(_connection_log))
            return

        if parsed.path == "/api/version":
            return self._send_json(200, {"version": VERSION})

        if parsed.path == "/auth/me":
            return self._handle_me()

        if parsed.path == "/api/settings":
            user = self._current_user()
            if not user:
                return self._send_json(401, {"error": "unauthorized"})
            with _users_lock:
                users = load_users()
                settings = users.get(user, {}).get("settings", {})
            return self._send_json(200, {"settings": settings})

        if parsed.path == "/api/stats":
            return self._handle_get_stats()

        if parsed.path == "/api/admin/users":
            return self._handle_admin_users()

        if parsed.path == "/api/admin/connections":
            return self._handle_admin_connections()

        if parsed.path == "/debug/info":
            payload = json.dumps({
                "lowest": LOWEST_MIDI_NOTE,
                "highest": HIGHEST_MIDI_NOTE,
            }).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(payload)
            return

        if parsed.path == "/chord/exercise":
            qs = parse_qs(parsed.query)
            allowed_str = qs.get("allowed", [""])[0]
            allowed_chords = [c for c in (chunk.strip() for chunk in allowed_str.split(",")) if c in CHORD_TYPES]
            use_inversions = qs.get("inversions", ["0"])[0] == "1"
            chord_name, notes = pick_chord(allowed_chords or None)
            root_notes = notes[:]
            if use_inversions:
                notes = apply_chord_inversion(notes)
            data = render_notes_wav(notes, 1.0, simultaneous=True)
            self.send_response(200)
            self.send_header("Content-Type", "audio/wav")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Chord", chord_name)
            self.send_header("X-Notes", ",".join(str(n) for n in notes))
            self.send_header("X-Root-Notes", ",".join(str(n) for n in root_notes))
            self.end_headers()
            self.wfile.write(data)
            return

        if parsed.path == "/scale/exercise":
            qs = parse_qs(parsed.query)
            try:
                tempo = int(qs.get("tempo", [DEFAULT_TEMPO])[0])
            except ValueError:
                tempo = DEFAULT_TEMPO
            tempo = max(MIN_TEMPO, min(MAX_TEMPO, tempo))
            note_duration_s = 60.0 / tempo

            direction = qs.get("direction", [DEFAULT_SCALE_DIRECTION])[0]
            if direction not in VALID_SCALE_DIRECTIONS:
                direction = DEFAULT_SCALE_DIRECTION

            allowed_str = qs.get("allowed", [""])[0]
            allowed_scales = [s for s in (chunk.strip() for chunk in allowed_str.split(",")) if s in SCALE_TYPES]

            scale_name, resolved_direction, notes = pick_scale(direction, allowed_scales)
            data = render_notes_wav(notes, note_duration_s, simultaneous=False)
            self.send_response(200)
            self.send_header("Content-Type", "audio/wav")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Scale", scale_name)
            self.send_header("X-Direction", resolved_direction)
            self.send_header("X-Notes", ",".join(str(n) for n in notes))
            self.end_headers()
            self.wfile.write(data)
            return

        if parsed.path == "/debug/notes":
            qs = parse_qs(parsed.query)
            tokens = qs.get("notes", [""])[0]
            notes: list[int] = []
            for tok in tokens.split(","):
                t = tok.strip().lower()
                if t == "lowest":
                    notes.append(LOWEST_MIDI_NOTE)
                elif t == "highest":
                    notes.append(HIGHEST_MIDI_NOTE)
                elif t.isdigit():
                    n = int(t)
                    if 0 <= n <= 127:
                        notes.append(n)
            if not notes:
                notes = [LOWEST_MIDI_NOTE, HIGHEST_MIDI_NOTE]
            data = render_notes_wav(notes, 1.0, simultaneous=False)
            self.send_response(200)
            self.send_header("Content-Type", "audio/wav")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)
            return

        if parsed.path == "/hint":
            qs = parse_qs(parsed.query)
            hint_type = qs.get("type", [""])[0]
            notes_str = qs.get("notes", [""])[0]
            notes: list[int] = []
            for tok in notes_str.split(","):
                tok = tok.strip()
                if tok.isdigit():
                    n = int(tok)
                    if 0 <= n <= 127:
                        notes.append(n)
            if not notes or hint_type not in ("interval", "chord", "scale"):
                self.send_response(400)
                self.end_headers()
                return
            play_simultaneous = qs.get("simultaneous", ["0"])[0] == "1"
            if hint_type == "chord":
                if play_simultaneous:
                    data = render_notes_wav(notes, 1.0, simultaneous=True)
                else:
                    note_duration_s = 60.0 / 80
                    data = render_notes_wav(notes, note_duration_s, simultaneous=False)
            else:
                try:
                    tempo = int(qs.get("tempo", ["120"])[0])
                except ValueError:
                    tempo = 120
                tempo = max(MIN_TEMPO, min(MAX_TEMPO, tempo))
                slow_tempo = max(40, tempo // 2)
                note_duration_s = 60.0 / slow_tempo
                data = render_notes_wav(notes, note_duration_s, simultaneous=False)
            self.send_response(200)
            self.send_header("Content-Type", "audio/wav")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)
            return

        if parsed.path == "/exercise":
            qs = parse_qs(parsed.query)
            mode = qs.get("mode", [DEFAULT_MODE])[0]
            if mode not in VALID_MODES:
                mode = DEFAULT_MODE

            range_mode = qs.get("range", [DEFAULT_RANGE])[0]
            if range_mode not in VALID_RANGES:
                range_mode = DEFAULT_RANGE

            if mode == "harmonic":
                note_duration_s = HARMONIC_DURATION_S
                simultaneous = True
                direction = DEFAULT_DIRECTION
            else:
                try:
                    tempo = int(qs.get("tempo", [DEFAULT_TEMPO])[0])
                except ValueError:
                    tempo = DEFAULT_TEMPO
                tempo = max(MIN_TEMPO, min(MAX_TEMPO, tempo))
                note_duration_s = 60.0 / tempo
                simultaneous = False
                direction = qs.get("direction", [DEFAULT_DIRECTION])[0]
                if direction not in VALID_DIRECTIONS:
                    direction = DEFAULT_DIRECTION

            allowed_str = qs.get("allowed", [""])[0]
            allowed_classes: list[int] = []
            for chunk in allowed_str.split(","):
                chunk = chunk.strip()
                if chunk.isdigit():
                    n = int(chunk)
                    if 0 <= n <= 12:
                        allowed_classes.append(n)
            allowed_classes = sorted(set(allowed_classes)) or list(range(13))

            notes = pick_note_pair(direction, range_mode, allowed_classes)
            interval = abs(notes[1] - notes[0])
            data = render_notes_wav(notes, note_duration_s, simultaneous=simultaneous)
            self.send_response(200)
            self.send_header("Content-Type", "audio/wav")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Interval", str(interval))
            self.send_header("X-Notes", ",".join(str(n) for n in notes))
            self.end_headers()
            self.wfile.write(data)
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, *args, **kwargs):
        pass


def main() -> None:
    for entry in load_connections()[-CONNECTION_LOG_LIMIT:]:
        _connection_log.append(entry)
    server = http.server.ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Serving on http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
