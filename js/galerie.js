// ============================================================
//  GALERIE JS – Album-Detailseite mit JS-Masonry
// ============================================================

(function () {
  "use strict";

  const data = PORTFOLIO_DATA;

  const params  = new URLSearchParams(window.location.search);
  const albumId = params.get("album");
  const album   = data.albums.find(a => a.id === albumId);

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

  const catLabels = { sport:"Sport", street:"Street", portrait:"Porträt", travel:"Reise" };
  let currentIndex = 0;

  if (!album) {
    if (notFound) notFound.style.display = "block";
    document.title = "Album nicht gefunden";
    return;
  }

  // ── Header befüllen ───────────────────────────────────────
  document.title = `${album.title} – ${data.photographer.name}`;
  document.getElementById("footerName").textContent = data.photographer.name;
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("albumTitle").textContent    = album.title;
  document.getElementById("albumCategory").textContent = catLabels[album.category] || album.category;
  const dateEl = document.getElementById("albumDate");
  if (album.date && dateEl) dateEl.textContent = album.date;
  const countEl = document.getElementById("albumPhotoCount");
  if (countEl && album.photos.length > 0) countEl.textContent = `${album.photos.length} Fotos`;
  document.getElementById("albumHeaderBg").style.backgroundImage = `url('${album.cover}')`;

  // Wasserzeichen
  const wmStyle = document.createElement("style");
  wmStyle.textContent = `
    #album-grid .masonry-item::after,
    .lb-img-wrap::after {
      content: '© ${data.photographer.name}';
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'Playfair Display', serif;
      font-size: 0.72rem;
      font-style: italic;
      letter-spacing: 0.18em;
      color: rgba(255,255,255,0.5);
      text-shadow: 0 1px 6px rgba(0,0,0,0.9);
      z-index: 5;
      pointer-events: none;
      user-select: none;
      white-space: nowrap;
    }
  `;
  document.head.appendChild(wmStyle);

  // ── JS Masonry ────────────────────────────────────────────
  const GAP = 6;

  function getColumnCount() {
    const w = window.innerWidth;
    if (w <= 480) return 2;
    if (w <= 900) return 3;
    return 4;
  }

  function layoutMasonry() {
    const cols       = getColumnCount();
    const total      = grid.offsetWidth;
    const colWidth   = (total - GAP * (cols - 1)) / cols;
    const colHeights = new Array(cols).fill(0);

    items.forEach(item => {
      const minH   = Math.min(...colHeights);
      const colIdx = colHeights.indexOf(minH);
      const x = colIdx * (colWidth + GAP);
      const y = colHeights[colIdx];

      item.style.width = colWidth + "px";
      item.style.left  = x + "px";
      item.style.top   = y + "px";

      const img = item.querySelector("img");
      let itemH = colWidth;
      if (img && img.naturalWidth > 0) {
        itemH = (img.naturalHeight / img.naturalWidth) * colWidth;
      }

      colHeights[colIdx] += itemH + GAP;
      item.classList.add("visible");
    });

    grid.style.height = Math.max(...colHeights) + "px";
  }

  // ── Grid aufbauen ─────────────────────────────────────────
  grid.innerHTML = album.photos.map((photo, idx) => `
    <div class="masonry-item" data-idx="${idx}"
         tabindex="0" role="button" aria-label="${photo.title || 'Foto'} öffnen">
      <img src="${photo.src}" alt="${photo.title || ''}"
        oncontextmenu="return false"
        onerror="this.closest('.masonry-item').classList.add('img-error')"
      />
      <div class="item-overlay">
        <p class="item-title">${photo.title || ''}</p>
      </div>
    </div>
  `).join("");

  const items = Array.from(grid.querySelectorAll(".masonry-item"));
  let loadedCount = 0;

  function onImageSettled() {
    loadedCount++;
    layoutMasonry();
  }

  items.forEach(item => {
    const img = item.querySelector("img");
    if (!img) { onImageSettled(); return; }
    if (img.complete) { onImageSettled(); }
    else {
      img.addEventListener("load",  onImageSettled, { once: true });
      img.addEventListener("error", onImageSettled, { once: true });
    }
  });

  items.forEach(item => {
    item.addEventListener("click",   () => openLightbox(parseInt(item.dataset.idx)));
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") openLightbox(parseInt(item.dataset.idx));
    });
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutMasonry, 100);
  });

  // ── Lightbox ──────────────────────────────────────────────
  function openLightbox(idx) {
    currentIndex = idx;
    const photo = album.photos[idx];
    lbImg.classList.remove("img-loaded");
    lbImg.src    = photo.src;
    lbImg.alt    = photo.title || "";
    lbImg.onload = () => lbImg.classList.add("img-loaded");
    if (lbTitle)   lbTitle.textContent   = photo.title || "";
    if (lbCounter) lbCounter.textContent = `${idx + 1} / ${album.photos.length}`;
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
  lbPrev.addEventListener("click",  prevPhoto);
  lbNext.addEventListener("click",  nextPhoto);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft")  prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  });

  // ── Swipe ─────────────────────────────────────────────────
  let touchStartX = 0, touchStartY = 0;
  lightbox.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  lightbox.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < -50) nextPhoto();
      else if (dx > 50) prevPhoto();
    } else {
      if (dy > 80) closeLightbox();
    }
  }, { passive: true });

  // ── Download-Schutz ───────────────────────────────────────
  document.addEventListener("contextmenu", e => { if (e.target.tagName === "IMG") e.preventDefault(); });
  document.addEventListener("dragstart",   e => { if (e.target.tagName === "IMG") e.preventDefault(); });

  // ── Nav ───────────────────────────────────────────────────
  window.addEventListener("scroll", () => {
    navEl.classList.toggle("scrolled", window.scrollY > 60);
  });
  burgerEl.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });

})();