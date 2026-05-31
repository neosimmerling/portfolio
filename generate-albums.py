#!/usr/bin/env python3
"""
generate-albums.py
==================
Ausführen: python generate-albums.py

Erstellt für jedes sichtbare Album in js/data.js:
  galerie/<album-id>/index.html
"""

import os
import re

with open("js/data.js", encoding="utf-8") as f:
    raw = f.read()

# Alben-Block zwischen "albums: [" und dem abschließenden "]" extrahieren
albums_match = re.search(r'albums\s*:\s*\[(.+)\]\s*\}?\s*;?\s*$', raw, re.DOTALL)
if not albums_match:
    print("Fehler: albums-Array nicht gefunden.")
    exit(1)

albums_raw = albums_match.group(1)

# Alle id: "..." Einträge finden
ids_with_pos = [(m.start(), m.group(1)) for m in re.finditer(r'id\s*:\s*["\']([^"\']+)["\']', albums_raw)]

# Für jede ID prüfen ob visible: false in der Nähe steht (innerhalb ±300 Zeichen)
albums = []
for pos, aid in ids_with_pos:
    surrounding = albums_raw[max(0, pos-50):pos+500]
    if 'visible' in surrounding and 'false' in surrounding:
        print(f"  (übersprungen: {aid} – visible: false)")
        continue
    albums.append(aid)

if not albums:
    print("Keine sichtbaren Alben gefunden.")
    exit(1)

depth = "../../"

def make_html(album_id):
    return f"""<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Album – Neo Simmerling</title>
  <meta name="description" content="Fotogalerie von Neo Simmerling" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{depth}css/style.css" />
  <link rel="stylesheet" href="{depth}css/galerie.css" />
</head>
<body data-album="{album_id}">
  <div class="page-transition fade-out" id="pageTransition"></div>

  <nav class="nav" id="nav">
    <a href="{depth}index.html" class="nav-logo">Neo Simmerling<span>.</span></a>
    <div class="nav-links">
      <a href="{depth}index.html#gallery">Galerie</a>
      <a href="{depth}index.html#about">Über mich</a>
      <a href="{depth}index.html#contact">Kontakt</a>
    </div>
    <button class="burger" id="burger" aria-label="Menü öffnen">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <a href="{depth}index.html#gallery" class="mobile-link">Galerie</a>
    <a href="{depth}index.html#about" class="mobile-link">Über mich</a>
    <a href="{depth}index.html#contact" class="mobile-link">Kontakt</a>
  </div>

  <header class="album-header" id="albumHeader">
    <div class="album-header-bg" id="albumHeaderBg"></div>
    <div class="album-header-overlay"></div>
    <div class="album-header-content">
      <a href="{depth}index.html#gallery" class="back-link">← Zurück zur Galerie</a>
      <p class="section-eyebrow" id="albumCategory">Kategorie</p>
      <h1 class="album-title" id="albumTitle">Album</h1>
      <div class="album-header-meta">
        <p class="album-date" id="albumDate"></p>
        <p class="album-photo-count" id="albumPhotoCount"></p>
      </div>
    </div>
  </header>

  <section class="album-section">
    <div class="masonry" id="album-grid"></div>
    <div class="album-not-found" id="albumNotFound" style="display:none">
      <p>Album nicht gefunden.</p>
      <a href="{depth}index.html" class="btn-hero" style="margin-top:1.5rem;display:inline-block">Zur Startseite</a>
    </div>
  </section>

  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Bildvorschau">
    <button class="lb-close" id="lbClose" aria-label="Schließen">&#x2715;</button>
    <button class="lb-prev"  id="lbPrev"  aria-label="Vorheriges Bild">&#8592;</button>
    <button class="lb-next"  id="lbNext"  aria-label="Nächstes Bild">&#8594;</button>
    <div class="lb-img-wrap">
      <img class="lb-img" id="lbImg" src="" alt="" draggable="false" />
    </div>
    <div class="lb-meta">
      <p class="lb-title"   id="lbTitle"></p>
      <p class="lb-counter" id="lbCounter"></p>
    </div>
  </div>

  <section class="related-section" id="relatedSection" style="display:none">
    <div class="related-inner">
      <p class="section-eyebrow">Mehr entdecken</p>
      <h2 class="section-title">Ähnliche Alben</h2>
      <div class="related-grid" id="relatedGrid"></div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">Neo Simmerling<span>.</span></span>
        <p class="footer-tagline">Fotograf & Bildgestalter</p>
      </div>
      <div class="footer-nav">
        <p class="footer-nav__label">Navigation</p>
        <a href="{depth}index.html#gallery">Galerie</a>
        <a href="{depth}index.html#about">Über mich</a>
        <a href="{depth}index.html#contact">Kontakt</a>
      </div>
      <div class="footer-nav">
        <p class="footer-nav__label">Rechtliches</p>
        <a href="{depth}impressum.html">Impressum</a>
        <a href="{depth}datenschutz.html">Datenschutz</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="year"></span> <span id="footerName">Neo Simmerling</span>. Alle Bilder urheberrechtlich geschützt.</p>
    </div>
  </footer>

  <script src="{depth}js/data.js"></script>
  <script src="{depth}js/galerie.js"></script>
</body>
</html>"""

os.makedirs("galerie", exist_ok=True)

for album_id in albums:
    folder = os.path.join("galerie", album_id)
    os.makedirs(folder, exist_ok=True)
    filepath = os.path.join(folder, "index.html")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(make_html(album_id))
    print(f"✓  galerie/{album_id}/index.html")

print(f"\n{len(albums)} Seite(n) generiert.")
print("URLs: /galerie/<album-id>/")