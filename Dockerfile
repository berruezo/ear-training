FROM python:3.12-slim

# Runtime libraries: libfluidsynth (loaded via ctypes by pyFluidSynth)
# and the TimGM6mb General-MIDI soundfont that ships with the project.
# No build toolchain needed — pyFluidSynth is pure-Python ctypes, and
# numpy has prebuilt wheels for linux/glibc.
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        libfluidsynth3 \
        timgm6mb-soundfont \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python deps first so the dependency layer is cached when only app code changes.
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# App
COPY main.py ./
COPY static/ ./static/

# User-data directory (volume-mounted in docker-compose).
RUN mkdir -p /app/data

# Drop privileges
RUN useradd --create-home --uid 1000 app \
 && chown -R app:app /app
USER app

ENV HOST=0.0.0.0 \
    PORT=8080 \
    PYTHONUNBUFFERED=1

EXPOSE 8080

CMD ["python", "main.py"]
