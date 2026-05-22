# 📷 Fotografen-Portfolio

Professionelles, statisches Portfolio für Fotografen – optimiert für GitHub Pages.

## Struktur

```
portfolio/
├── index.html          # Hauptseite (Portfolio)
├── admin.html          # Admin-Toolbox (passwortgeschützt)
├── css/
│   ├── style.css       # Portfolio-Styles
│   └── admin.css       # Admin-Styles
├── js/
│   ├── data.js         # ★ ALLE Inhalte hier anpassen
│   ├── main.js         # Portfolio-Logik
│   └── admin.js        # Admin-Logik
└── images/             # Bilder hier ablegen
    ├── portrait.jpg
    ├── sport-01.jpg
    └── ...
```

## Schnellstart

### 1. Bilder hinzufügen
Bilder in den Ordner `images/` legen.

### 2. Inhalte anpassen
Datei `js/data.js` öffnen und alles anpassen:
- Name, Bio, Stats, Tags, E-Mail, Socials
- Foto-Liste mit Titeln, Kategorien und Bildpfaden

### 3. Lokal testen
Da Browser lokale Dateien einschränken, am besten mit einem einfachen Server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```
Dann `http://localhost:8000` öffnen.

---

## neues Album hinzufügen:

### Schritt 1:
- Ordner anlegen (Bspw. in `images/football-suhl-2025/`)
- Fotos reinkopieren

### Schritt 2:
- neuer Eintrag in `js/data.js` in Liste `albums`:

```js
    {
        id: "football-jena-2025",        // → URL: galerie.html?album=football-jena-2025
        title: "FC Jena vs. Bayern",
        date: "12.04.2025",              // optional
        category: "sport",               // sport | street | portrait | travel
        cover: "images/football-jena-2025/cover.jpg",  // Cover für die Hauptgalerie
        photos: [
            { src: "images/football-jena-2025/foto1.jpg", title: "Tor im letzten Moment" },
            { src: "images/football-jena-2025/foto2.jpg", title: "Zweikampf" },
            // weitere Fotos...
        ]
    }
```
- Cover erscheint automatisch auf `index.html`, Klick führt auf Detailseite


---

## Auf GitHub Pages deployen

### Repository erstellen
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/DEIN-USER/portfolio.git
git push -u origin main
```

### GitHub Pages aktivieren
1. GitHub Repository öffnen
2. **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main`, Folder: `/ (root)`
5. **Save** klicken
6. Nach 1-2 Minuten ist die Seite unter `https://DEIN-USER.github.io/portfolio` erreichbar

### Updates pushen
```bash
git add .
git commit -m "Portfolio aktualisiert"
git push
```

---

## Admin-Toolbox

Erreichbar unter `/admin.html` (Link ist im Footer als unauffälliges ⚙-Symbol).

**Standard-Passwort:** `foto2024`

**Passwort ändern:** Im Admin-Bereich unter *Einstellungen → Passwort ändern* (wird im Browser-LocalStorage gespeichert).

### Workflow mit Admin-Toolbox:
1. `admin.html` öffnen und einloggen
2. Fotos hinzufügen/bearbeiten/löschen
3. Steckbrief anpassen
4. Unter *Einstellungen → data.js exportieren* herunterladen
5. Heruntergeladene `data.js` in `js/` ersetzen
6. Ergebnis mit Git pushen

---

## Download-Schutz

Folgende Maßnahmen schützen deine Bilder:
- Rechtsklick auf Bilder deaktiviert
- Drag & Drop von Bildern blockiert
- Strg+S / Cmd+S blockiert
- `user-drag: none` CSS-Attribut
- `pointer-events: none` auf `<img>`-Elementen

> ⚠️ **Hinweis:** 100%igen Schutz gibt es nicht – wer ein Bild auf einem Bildschirm sehen kann, kann es auch screenshotten. Der Schutz hält Casual-Downloader ab.

---

## Anpassungen

### Neue Kategorie hinzufügen
In `js/data.js` ein Foto mit neuer Kategorie eintragen, dann in `index.html` einen neuen Filter-Button ergänzen:
```html
<button class="filter-btn" data-filter="wedding">Hochzeit</button>
```

### Farben ändern
In `css/style.css` die CSS-Variable `#c8a564` (Gold) durch eine andere Farbe ersetzen.

### Hero-Bild setzen
In `index.html` den `<div class="hero-placeholder">` durch ein `<img>` ersetzen:
```html
<img src="images/hero.jpg" alt="Hero" class="hero-img" style="width:100%;height:100%;object-fit:cover" />
```

---

## Lizenz
Eigener Code – frei verwendbar. Google Fonts (Playfair Display, DM Sans) unterliegen der [OFL](https://scripts.sil.org/OFL).
