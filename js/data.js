// ============================================================
//  PORTFOLIO DATEN – hier alles anpassen!
// ============================================================

const PORTFOLIO_DATA = {

  // ── Persönliche Infos ──────────────────────────────────────
  photographer: {
    name: "Neo Simmerling",
    tagline: "Fotograf & Bildgestalter",
    bio: [
      "Ich bin Fotograf mit Leidenschaft für das Besondere im Alltäglichen. Mit meiner Kamera halte ich Momente fest – von der Dynamik des Sports bis zur Stille der Straße.",
      "Seit Jahren begleite ich Sportevents, streife durch Städte und schaffe Porträts, die echte Persönlichkeiten zeigen. Jedes Bild erzählt eine Geschichte – und ich möchte, dass du sie spürst."
    ],
    stats: [
      { num: "4+",   label: "Jahre Erfahrung" },
      { num: "zig",  label: "Projekte" },
      { num: "viele", label: "Kategorien" }
    ],
    tags: ["Lightroom Mobile", "Canon", "Sport", "Street", "Porträt", "Reise", "Events"],
    portrait: "images/about/aboutme.jpg",
    email: "neosimmerling@gmail.com",
    socials: [
      { label: "Instagram", url: "https://instagram.com/neo4shots" },
      { label: "LinkedIn",  url: "https://www.linkedin.com/in/neo-simmerling" }
    ]
  },

  // ── Alben ──────────────────────────────────────────────────
  // Ein Album = eine Galerie-Detailseite (galerie.html?album=ID)
  //
  // Felder:
  //   id       → URL-Schlüssel, z. B. "football-jena-2025"
  //   title    → Angezeigter Titel
  //   date     → Datum (optional, nur zur Anzeige)
  //   category → "sport" | "street" | "portrait" | "travel"
  //   cover    → Pfad zum Cover-Bild (wird in der Hauptgalerie angezeigt)
  //   photos   → Array von { src, title } – alle Fotos des Albums
  //
  // Neues Album hinzufügen:
  //   1. Ordner anlegen, z. B. images/football-jena-2025/
  //   2. Fotos reinkopieren
  //   3. Neuen Eintrag hier unten ergänzen – fertig!

  albums: [
    {
      id: "test-album",
      title: "Gunslingers x Hanfrieds",
      date: "03.05.2026",
      category: "sport",
      cover: "images/test/15-_MG_1038.jpg",
      photos: [
        { src: "images/test/1-_MG_0677.jpg", title: "1-_MG_0677" },
      { src: "images/test/2-_MG_0678.jpg", title: "2-_MG_0678" },
      { src: "images/test/3-_MG_0681.jpg", title: "3-_MG_0681" },
      { src: "images/test/4-_MG_0682.jpg", title: "4-_MG_0682" },
      { src: "images/test/5-_MG_0729.jpg", title: "5-_MG_0729" },
      { src: "images/test/6-_MG_0762.jpg", title: "6-_MG_0762" },
      { src: "images/test/7-_MG_0763.jpg", title: "7-_MG_0763" },
      { src: "images/test/8-_MG_0768.jpg", title: "8-_MG_0768" },
      { src: "images/test/9-_MG_0877.jpg", title: "9-_MG_0877" },
      { src: "images/test/10-_MG_0880.jpg", title: "10-_MG_0880" },
      { src: "images/test/11-_MG_0900.jpg", title: "11-_MG_0900" },
      { src: "images/test/12-_MG_0902.jpg", title: "12-_MG_0902" },
      { src: "images/test/13-_MG_0904.jpg", title: "13-_MG_0904" },
      { src: "images/test/14-_MG_1036.jpg", title: "14-_MG_1036" },
      { src: "images/test/15-_MG_1038.jpg", title: "15-_MG_1038" },
      { src: "images/test/16-_MG_1052.jpg", title: "16-_MG_1052" },
      { src: "images/test/17-_MG_1053.jpg", title: "17-_MG_1053" },
      { src: "images/test/18-_MG_1057.jpg", title: "18-_MG_1057" },
      { src: "images/test/19-_MG_1059.jpg", title: "19-_MG_1059" },
      { src: "images/test/20-_MG_1179.jpg", title: "20-_MG_1179" },
      { src: "images/test/21-_MG_1286.jpg", title: "21-_MG_1286" },
      { src: "images/test/22-_MG_1287.jpg", title: "22-_MG_1287" },
      { src: "images/test/23-_MG_1289.jpg", title: "23-_MG_1289" },
      { src: "images/test/24-_MG_1292.jpg", title: "24-_MG_1292" },
      { src: "images/test/25-_MG_1308.jpg", title: "25-_MG_1308" },
      { src: "images/test/26-_MG_1312.jpg", title: "26-_MG_1312" },
      { src: "images/test/27-_MG_1316.jpg", title: "27-_MG_1316" }
      ]
    },
    {
      id: "street-berlin",
      title: "Berlin Streets",
      date: "März 2025",
      category: "street",
      cover: "images/street-01.jpg",
      photos: [
        { src: "images/street-01.jpg", title: "Straßen-Jazz" },
        { src: "images/street-02.jpg", title: "Nachtmarkt" }
      ]
    },
    {
      id: "portraits-2025",
      title: "Porträts 2025",
      date: "2025",
      category: "portrait",
      cover: "images/portrait-01.jpg",
      photos: [
        { src: "images/portrait-01.jpg", title: "Blick in die Ferne" },
        { src: "images/portrait-02.jpg", title: "Stille" }
      ]
    },
    {
      id: "lissabon",
      title: "Lissabon",
      date: "Sommer 2024",
      category: "travel",
      cover: "images/travel-01.jpg",
      photos: [
        { src: "images/travel-01.jpg", title: "Sonnenuntergang Lissabon" },
        { src: "images/travel-02.jpg", title: "Bergpanorama" }
      ]
    }
  ]
};
