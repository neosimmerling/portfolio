// ============================================================
//  PORTFOLIO DATEN – hier alles anpassen!
// ============================================================

const PORTFOLIO_DATA = {

  // ── Persönliche Infos ──────────────────────────────────────
  photographer: {
    name: "Max Mustermann",
    tagline: "Fotograf & Bildgestalter",
    bio: [
      "Ich bin Fotograf mit Leidenschaft für das Besondere im Alltäglichen. Mit meiner Kamera halte ich Momente fest – von der Dynamik des Sports bis zur Stille der Straße.",
      "Seit Jahren begleite ich Sportevents, streife durch Städte und schaffe Porträts, die echte Persönlichkeiten zeigen. Jedes Bild erzählt eine Geschichte – und ich möchte, dass du sie spürst."
    ],
    stats: [
      { num: "7+",   label: "Jahre Erfahrung" },
      { num: "800+", label: "Projekte" },
      { num: "4",    label: "Kategorien" }
    ],
    tags: ["Lightroom Mobile", "Sony Alpha", "Sport", "Street", "Porträt", "Reise", "Events"],
    // Pfad zu deinem Porträt (relativ zur index.html)
    portrait: "images/portrait.jpg",
    email: "deine@email.de",
    socials: [
      { label: "Instagram", url: "https://instagram.com/dein_handle" },
      { label: "LinkedIn",  url: "https://linkedin.com/in/dein-profil" }
      // weitere Socials hier hinzufügen
    ]
  },

  // ── Fotos ──────────────────────────────────────────────────
  // Kategorien: "sport" | "street" | "portrait" | "travel"
  // Bilder in den Ordner images/ legen und hier eintragen.
  // src: Pfad zum Bild, thumb: optional kleinere Version für Grid
  photos: [
    {
      id: 1,
      title: "Tor im letzten Moment",
      category: "sport",
      src: "images/sport-01.jpg",
      thumb: "images/sport-01.jpg"
    },
    {
      id: 2,
      title: "Straßen-Jazz",
      category: "street",
      src: "images/street-01.jpg",
      thumb: "images/street-01.jpg"
    },
    {
      id: 3,
      title: "Blick in die Ferne",
      category: "portrait",
      src: "images/portrait-01.jpg",
      thumb: "images/portrait-01.jpg"
    },
    {
      id: 4,
      title: "Sonnenuntergang Lissabon",
      category: "travel",
      src: "images/travel-01.jpg",
      thumb: "images/travel-01.jpg"
    },
    {
      id: 5,
      title: "Zweikampf",
      category: "sport",
      src: "images/sport-02.jpg",
      thumb: "images/sport-02.jpg"
    },
    {
      id: 6,
      title: "Nachtmarkt",
      category: "street",
      src: "images/street-02.jpg",
      thumb: "images/street-02.jpg"
    },
    {
      id: 7,
      title: "Stille",
      category: "portrait",
      src: "images/portrait-02.jpg",
      thumb: "images/portrait-02.jpg"
    },
    {
      id: 8,
      title: "Bergpanorama",
      category: "travel",
      src: "images/travel-02.jpg",
      thumb: "images/travel-02.jpg"
    }
  ]
};
