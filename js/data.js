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
  // Album ausblenden (z. B. noch keine Bilder):
  //   visible: false   → taucht nicht in der Galerie auf
  //
  // Neues Album hinzufügen:
  //   1. Ordner anlegen, z. B. images/mein-album/
  //   2. Fotos reinkopieren
  //   3. Neuen Eintrag hier unten ergänzen – fertig!

  albums: [
    {
      id: "test-album",
      title: "Gunslingers x Hanfrieds",
      date: "03.05.2026",
      category: "sport",
      cover: "images/test/15-_MG_1038.jpg",
      isNew: true,
      photos: [
        { src: "images/test/1-_MG_0677.jpg",  title: "1-_MG_0677" },
        { src: "images/test/2-_MG_0678.jpg",  title: "2-_MG_0678" },
        { src: "images/test/3-_MG_0681.jpg",  title: "3-_MG_0681" },
        { src: "images/test/4-_MG_0682.jpg",  title: "4-_MG_0682" },
        { src: "images/test/5-_MG_0729.jpg",  title: "5-_MG_0729" },
        { src: "images/test/6-_MG_0762.jpg",  title: "6-_MG_0762" },
        { src: "images/test/7-_MG_0763.jpg",  title: "7-_MG_0763" },
        { src: "images/test/8-_MG_0768.jpg",  title: "8-_MG_0768" },
        { src: "images/test/9-_MG_0877.jpg",  title: "9-_MG_0877" },
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

    // ── Platzhalter-Alben – auf visible: false setzen sobald Fotos da sind ──
    {
      id: "gunslingers-details-letzter-sonntag",
      title: "Gunslingers - Details",
      date: "17.05.2026",
      category: "sport",
      cover: "images/test2/21-_MG_0490.jpg",
      isNew: false,
      photos: [
        { src: "images/test2/1-_MG_0016.jpg", title: "1-_MG_0016" },
        { src: "images/test2/2-_MG_0020.jpg", title: "2-_MG_0020" },
        { src: "images/test2/3-_MG_0021.jpg", title: "3-_MG_0021" },
        { src: "images/test2/4-_MG_0044.jpg", title: "4-_MG_0044" },
        { src: "images/test2/5-_MG_0150.jpg", title: "5-_MG_0150" },
        { src: "images/test2/6-_MG_0151.jpg", title: "6-_MG_0151" },
        { src: "images/test2/7-_MG_0152.jpg", title: "7-_MG_0152" },
        { src: "images/test2/8-_MG_0367.jpg", title: "8-_MG_0367" },
        { src: "images/test2/9-_MG_0368.jpg", title: "9-_MG_0368" },
        { src: "images/test2/10-_MG_0371.jpg", title: "10-_MG_0371" },
        { src: "images/test2/11-_MG_0378.jpg", title: "11-_MG_0378" },
        { src: "images/test2/12-_MG_0379.jpg", title: "12-_MG_0379" },
        { src: "images/test2/13-_MG_0396.jpg", title: "13-_MG_0396" },
        { src: "images/test2/14-_MG_0398.jpg", title: "14-_MG_0398" },
        { src: "images/test2/15-_MG_0431.jpg", title: "15-_MG_0431" },
        { src: "images/test2/16-_MG_0446.jpg", title: "16-_MG_0446" },
        { src: "images/test2/17-_MG_0452.jpg", title: "17-_MG_0452" },
        { src: "images/test2/18-_MG_0462.jpg", title: "18-_MG_0462" },
        { src: "images/test2/19-_MG_0470.jpg", title: "19-_MG_0470" },
        { src: "images/test2/20-_MG_0474.jpg", title: "20-_MG_0474" },
        { src: "images/test2/21-_MG_0490.jpg", title: "21-_MG_0490" },
        { src: "images/test2/22-_MG_0513.jpg", title: "22-_MG_0513" },
        { src: "images/test2/23-_MG_0520.jpg", title: "23-_MG_0520" },
        { src: "images/test2/24-_MG_0521.jpg", title: "24-_MG_0521" },
        { src: "images/test2/25-_MG_0535.jpg", title: "25-_MG_0535" },
        { src: "images/test2/26-_MG_0614.jpg", title: "26-_MG_0614" },
        { src: "images/test2/27-_MG_0662.jpg", title: "27-_MG_0662" },
        { src: "images/test2/28-_MG_0687.jpg", title: "28-_MG_0687" },
        { src: "images/test2/29-_MG_0725.jpg", title: "29-_MG_0725" },
        { src: "images/test2/30-_MG_0740.jpg", title: "30-_MG_0740" },
        { src: "images/test2/31-_MG_0741.jpg", title: "31-_MG_0741" }
  ]
},
  {
    id: "ibiza",
    title: "Ibiza",
    date: "September 2024",
    category: "travel",
    cover: "images/ibiza/22-DSC09585.jpg",
    isNew: false,
    photos: [
      { src: "images/ibiza/1-DSC09539.jpg", title: "1-DSC09539" },
      { src: "images/ibiza/2-DSC09541.jpg", title: "2-DSC09541" },
      { src: "images/ibiza/3-DSC09542.jpg", title: "3-DSC09542" },
      { src: "images/ibiza/4-DSC09546.jpg", title: "4-DSC09546" },
      { src: "images/ibiza/5-DSC09547.jpg", title: "5-DSC09547" },
      { src: "images/ibiza/6-DSC09549.jpg", title: "6-DSC09549" },
      { src: "images/ibiza/7-DSC09550.jpg", title: "7-DSC09550" },
      { src: "images/ibiza/8-DSC09545.jpg", title: "8-DSC09545" },
      { src: "images/ibiza/9-DSC09551.jpg", title: "9-DSC09551" },
      { src: "images/ibiza/10-DSC09556.jpg", title: "10-DSC09556" },
      { src: "images/ibiza/11-DSC09562.jpg", title: "11-DSC09562" },
      { src: "images/ibiza/12-DSC09563.jpg", title: "12-DSC09563" },
      { src: "images/ibiza/13-DSC09565.jpg", title: "13-DSC09565" },
      { src: "images/ibiza/14-DSC09567.jpg", title: "14-DSC09567" },
      { src: "images/ibiza/15-DSC09569.jpg", title: "15-DSC09569" },
      { src: "images/ibiza/16-DSC09570.jpg", title: "16-DSC09570" },
      { src: "images/ibiza/17-DSC09572.jpg", title: "17-DSC09572" },
      { src: "images/ibiza/18-DSC09573.jpg", title: "18-DSC09573" },
      { src: "images/ibiza/19-DSC09579.jpg", title: "19-DSC09579" },
      { src: "images/ibiza/20-DSC09582.jpg", title: "20-DSC09582" },
      { src: "images/ibiza/21-DSC09583.jpg", title: "21-DSC09583" },
      { src: "images/ibiza/22-DSC09585.jpg", title: "22-DSC09585" },
      { src: "images/ibiza/23-DSC09586.jpg", title: "23-DSC09586" },
      { src: "images/ibiza/24-DSC09593.jpg", title: "24-DSC09593" },
      { src: "images/ibiza/25-DSC09594.jpg", title: "25-DSC09594" },
      { src: "images/ibiza/26-DSC09597.jpg", title: "26-DSC09597" },
      { src: "images/ibiza/27-DSC09601.jpg", title: "27-DSC09601" },
      { src: "images/ibiza/28-DSC09607.jpg", title: "28-DSC09607" },
      { src: "images/ibiza/29-DSC09614.jpg", title: "29-DSC09614" },
      { src: "images/ibiza/30-DSC09616.jpg", title: "30-DSC09616" },
      { src: "images/ibiza/31-DSC09618.jpg", title: "31-DSC09618" },
      { src: "images/ibiza/32-DSC09623.jpg", title: "32-DSC09623" },
      { src: "images/ibiza/33-DSC09741.jpg", title: "33-DSC09741" },
      { src: "images/ibiza/34-DSC09742.jpg", title: "34-DSC09742" },
      { src: "images/ibiza/35-DSC09744.jpg", title: "35-DSC09744" },
      { src: "images/ibiza/36-DSC09745.jpg", title: "36-DSC09745" },
      { src: "images/ibiza/37-DSC09754.jpg", title: "37-DSC09754" },
      { src: "images/ibiza/38-DSC09757.jpg", title: "38-DSC09757" },
      { src: "images/ibiza/39-DSC09760.jpg", title: "39-DSC09760" },
      { src: "images/ibiza/40-DSC09763.jpg", title: "40-DSC09763" },
      { src: "images/ibiza/41-DSC09764.jpg", title: "41-DSC09764" },
      { src: "images/ibiza/42-DSC09765.jpg", title: "42-DSC09765" },
      { src: "images/ibiza/43-DSC09767.jpg", title: "43-DSC09767" },
      { src: "images/ibiza/44-DSC09768.jpg", title: "44-DSC09768" },
      { src: "images/ibiza/45-DSC09769.jpg", title: "45-DSC09769" },
      { src: "images/ibiza/46-DSC09770.jpg", title: "46-DSC09770" },
      { src: "images/ibiza/47-DSC09773.jpg", title: "47-DSC09773" },
      { src: "images/ibiza/48-DSC09779.jpg", title: "48-DSC09779" },
      { src: "images/ibiza/49-DSC09780.jpg", title: "49-DSC09780" },
      { src: "images/ibiza/50-DSC09783.jpg", title: "50-DSC09783" },
      { src: "images/ibiza/51-DSC09784.jpg", title: "51-DSC09784" },
      { src: "images/ibiza/52-DSC09786.jpg", title: "52-DSC09786" },
      { src: "images/ibiza/53-DSC09790.jpg", title: "53-DSC09790" },
      { src: "images/ibiza/54-DSC09794.jpg", title: "54-DSC09794" },
      { src: "images/ibiza/55-DSC09797.jpg", title: "55-DSC09797" },
      { src: "images/ibiza/56-DSC09799.jpg", title: "56-DSC09799" },
      { src: "images/ibiza/57-DSC09801.jpg", title: "57-DSC09801" },
      { src: "images/ibiza/58-DSC09804.jpg", title: "58-DSC09804" },
      { src: "images/ibiza/59-DSC09805.jpg", title: "59-DSC09805" },
      { src: "images/ibiza/60-DSC09806.jpg", title: "60-DSC09806" },
      { src: "images/ibiza/61-DSC09807.jpg", title: "61-DSC09807" },
      { src: "images/ibiza/62-DSC09812.jpg", title: "62-DSC09812" },
      { src: "images/ibiza/63-DSC09814.jpg", title: "63-DSC09814" },
      { src: "images/ibiza/64-DSC09817.jpg", title: "64-DSC09817" },
      { src: "images/ibiza/65-DSC09827.jpg", title: "65-DSC09827" },
      { src: "images/ibiza/66-DSC09830.jpg", title: "66-DSC09830" },
      { src: "images/ibiza/67-DSC09833.jpg", title: "67-DSC09833" },
      { src: "images/ibiza/68-DSC09836.jpg", title: "68-DSC09836" },
      { src: "images/ibiza/69-DSC09845.jpg", title: "69-DSC09845" },
      { src: "images/ibiza/70-DSC09848.jpg", title: "70-DSC09848" },
      { src: "images/ibiza/71-DSC09850.jpg", title: "71-DSC09850" },
      { src: "images/ibiza/72-DSC09879.jpg", title: "72-DSC09879" }
    ]
  },

  // ─────────────────────────────────────────────
  // FRANKFURT (April 2024)
  // ─────────────────────────────────────────────
  {
    id: "frankfurt",
    title: "Frankfurt",
    date: "April 2024",
    category: "travel",
    cover: "images/frankfurt/11-_MG_4820.jpg",
    isNew: false,
    photos: [
      { src: "images/frankfurt/1-_MG_4744.jpg", title: "1-_MG_4744" },
      { src: "images/frankfurt/2-_MG_4746.jpg", title: "2-_MG_4746" },
      { src: "images/frankfurt/3-_MG_4747.jpg", title: "3-_MG_4747" },
      { src: "images/frankfurt/4-_MG_4748.jpg", title: "4-_MG_4748" },
      { src: "images/frankfurt/5-_MG_4752.jpg", title: "5-_MG_4752" },
      { src: "images/frankfurt/6-_MG_4758.jpg", title: "6-_MG_4758" },
      { src: "images/frankfurt/7-_MG_4784.jpg", title: "7-_MG_4784" },
      { src: "images/frankfurt/8-_MG_4785.jpg", title: "8-_MG_4785" },
      { src: "images/frankfurt/9-_MG_4787.jpg", title: "9-_MG_4787" },
      { src: "images/frankfurt/10-_MG_4817.jpg", title: "10-_MG_4817" },
      { src: "images/frankfurt/11-_MG_4820.jpg", title: "11-_MG_4820" },
      { src: "images/frankfurt/12-_MG_4827.jpg", title: "12-_MG_4827" },
      { src: "images/frankfurt/13-_MG_4840.jpg", title: "13-_MG_4840" },
      { src: "images/frankfurt/14-_MG_4867.jpg", title: "14-_MG_4867" },
      { src: "images/frankfurt/15-_MG_4875.jpg", title: "15-_MG_4875" },
      { src: "images/frankfurt/16-_MG_4877.jpg", title: "16-_MG_4877" },
      { src: "images/frankfurt/17-_MG_4878.jpg", title: "17-_MG_4878" },
      { src: "images/frankfurt/18-_MG_4879.jpg", title: "18-_MG_4879" },
      { src: "images/frankfurt/19-_MG_4880.jpg", title: "19-_MG_4880" },
      { src: "images/frankfurt/20-_MG_4891.jpg", title: "20-_MG_4891" },
      { src: "images/frankfurt/21-_MG_4898.jpg", title: "21-_MG_4898" },
      { src: "images/frankfurt/22-_MG_4914.jpg", title: "22-_MG_4914" },
      { src: "images/frankfurt/23-_MG_4957.jpg", title: "23-_MG_4957" },
      { src: "images/frankfurt/24-_MG_4979.jpg", title: "24-_MG_4979" },
      { src: "images/frankfurt/25-_MG_5006.jpg", title: "25-_MG_5006" },
      { src: "images/frankfurt/26-_MG_5012.jpg", title: "26-_MG_5012" },
      { src: "images/frankfurt/27-_MG_5020.jpg", title: "27-_MG_5020" },
      { src: "images/frankfurt/28-_MG_5023.jpg", title: "28-_MG_5023" },
      { src: "images/frankfurt/29-_MG_5024.jpg", title: "29-_MG_5024" },
      { src: "images/frankfurt/30-_MG_5027.jpg", title: "30-_MG_5027" }
    ]
  },

  // ─────────────────────────────────────────────
  // SKY / NACHTHIMMEL
  // ─────────────────────────────────────────────
  {
    id: "sky",
    title: "Nachthimmel",
    date: "2024",
    category: "travel",
    cover: "images/sky/6-IMG_0473.jpg",
    isNew: false,
    photos: [
      { src: "images/sky/1-IMG_0455.jpg", title: "1-IMG_0455" },
      { src: "images/sky/2-IMG_0462.jpg", title: "2-IMG_0462" },
      { src: "images/sky/3-IMG_0464.jpg", title: "3-IMG_0464" },
      { src: "images/sky/4-IMG_0469.jpg", title: "4-IMG_0469" },
      { src: "images/sky/5-IMG_0470.jpg", title: "5-IMG_0470" },
      { src: "images/sky/6-IMG_0473.jpg", title: "6-IMG_0473" },
      { src: "images/sky/7-IMG_0475.jpg", title: "7-IMG_0475" },
      { src: "images/sky/8-IMG_0477.jpg", title: "8-IMG_0477" },
      { src: "images/sky/9-IMG_0482.jpg", title: "9-IMG_0482" },
      { src: "images/sky/10-IMG_0486.jpg", title: "10-IMG_0486" },
      { src: "images/sky/11-IMG_0492.jpg", title: "11-IMG_0492" },
      { src: "images/sky/12-IMG_0495.jpg", title: "12-IMG_0495" }
    ]
  },
    {
      id: "portraits-2025",
      title: "Porträts 2025",
      date: "2025",
      category: "portrait",
      visible: false,
      cover: "images/portraits-2025/cover.jpg",
      photos: []
    },
    {
      id: "lissabon",
      title: "Lissabon",
      date: "Sommer 2024",
      category: "travel",
      visible: false,
      cover: "images/lissabon/cover.jpg",
      photos: []
    }
  ]
};
