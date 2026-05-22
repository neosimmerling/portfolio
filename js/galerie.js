// ============================================================
//  GALERIE JS – Album-Detailseite
// ============================================================

(function () {
  "use strict";

  const data = PORTFOLIO_DATA;

  // ── URL-Parameter lesen ───────────────────────────────────
  const params   = new URLSearchParams(window.location.search);
  const albumId  = params.get("album");
  const album    = data.albums.find(a => a.id === albumId);

  // ── DOM refs ──────────────────────────────────────────────
  const navEl      = document.getElementById("nav");
  const burgerEl   = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const grid       = document.getElementById("album-grid");
  const notFound   = document.getElementById("albumNotFound");
  const lightbox   = document.getElementById("lightbox");
  const lbImg      = document.getElementById("lbImg");
  const lbTitle    = document.getElementById("lbTitle");
  const lbCounter  = document.getElementById("lbCounter");
  const lbClose    = document.getElementById("lbClose");
  const lbPrev     = document.getElementById("lbPrev");
  const lbNext     = document.getElementById("lbNext");

  const catLabels = {
    sport: "Sport", street: "Street",
    portrait: "Porträt", travel: "Reise"
  };

  let currentIndex = 0;

  // ── Album nicht gefunden ──────────────────────────────────
  if (!album) {
    notFound.style.display = "block";
    document.title = "Album nicht gefunden";
    return;
  }

  // ── Seite befüllen ────────────────────────────────────────
  document.title = `${album.title} – ${data.photographer.name}`;
  document.getElementById("footerName").textContent = data.photographer.name;
  document.getElementById("year").textContent = new Date().getFullYear();

  document.getElementById("albumTitle").textContent    = album.title;
  document.getElementById("albumCategory").textContent = catLabels[album.category] || album.category;

  const dateEl = document.getElementById("albumDate");
  if (album.date) dateEl.textContent = album.date;

  const countEl = document.getElementById("albumPhotoCount");
  if (album.photos.length > 0) countEl.textContent = `${album.photos.length} Fotos`;

  // Cover als Header-Hintergrund
  const headerBg = document.getElementById("albumHeaderBg");
  headerBg.style.backgroundImage = `url('${album.cover}')`;

  // ── Foto-Grid bauen ───────────────────────────────────────
  grid.innerHTML = album.photos.map((photo, idx) => `
    <div class="masonry-item fade-in" data-idx="${idx}"
         tabindex="0" role="button" aria-label="${photo.title} öffnen">
      <div class="img-wrap">
        <img
          src="${photo.src}"
          alt="${photo.title}"
          loading="lazy"
          oncontextmenu="return false"
          onload="this.classList.add('img-loaded'); this.nextElementSibling.style.opacity='0';"
          onerror="this.closest('.masonry-item').classList.add('img-error')"
        />
        <div class="img-skeleton"></div>
      </div>
      <div class="item-overlay">
        <div>
          <p class="item-title">${photo.title}</p>
        </div>
      </div>
    </div>
  `).join("");

  // Klick-Events
  grid.querySelectorAll(".masonry-item").forEach(item => {
    item.addEventListener("click",   () => openLightbox(parseInt(item.dataset.idx)));
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") openLightbox(parseInt(item.dataset.idx));
    });
  });

  // Fade-in
  requestAnimationFrame(() => {
    document.querySelectorAll(".masonry-item.fade-in").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 40);
    });
  });

  // ── Lightbox ──────────────────────────────────────────────
  function openLightbox(idx) {
    currentIndex = idx;
    const photo = album.photos[idx];
    lbImg.classList.remove("img-loaded");
    lbImg.src        = photo.src;
    lbImg.alt        = photo.title;
    lbImg.onload     = () => lbImg.classList.add("img-loaded");
    lbTitle.textContent   = photo.title;
    lbCounter.textContent = `${idx + 1} / ${album.photos.length}`;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + album.photos.length) % album.photos.length;
    openLightbox(currentIndex);
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % album.photos.length;
    openLightbox(currentIndex);
  }

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", prevPhoto);
  lbNext.addEventListener("click", nextPhoto);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape")      closeLightbox();
    if (e.key === "ArrowLeft")   prevPhoto();
    if (e.key === "ArrowRight")  nextPhoto();
  });

  // ── Download-Schutz ───────────────────────────────────────
  document.addEventListener("contextmenu", e => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });
  document.addEventListener("dragstart", e => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });

  // ── Sticky Nav ────────────────────────────────────────────
  window.addEventListener("scroll", () => {
    navEl.classList.toggle("scrolled", window.scrollY > 60);
  });

  // ── Mobile Menu ───────────────────────────────────────────
  burgerEl.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });

})();