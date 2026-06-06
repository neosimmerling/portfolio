// ============================================================
//  GALERIE JS – Album-Detailseite mit JS-Masonry
// ============================================================

(function () {
  "use strict";

  const data = PORTFOLIO_DATA;

  // Album-ID: erst aus data-album am <body> (generierte Seiten),
  // dann aus URL-Parameter (galerie.html?album=ID)
  const bodyAlbumId = document.body.dataset.album;
  const params      = new URLSearchParams(window.location.search);
  const albumId     = bodyAlbumId || params.get("album");
  const album       = data.albums.find(a => a.id === albumId);

  const navEl      = document.getElementById("nav");
  const burgerEl   = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const grid       = document.getElementById("album-grid");
  const notFound   = document.getElementById("albumNotFound");
  const lightbox   = document.getElementById("lightbox");
  const lbImg      = document.getElementById("lbImg");
  const lbTitle    = document.getElementById("lbTitle");
  const lbCounter  = document.getElementById("lbCounter");
  const lbShare    = document.getElementById("lbShare");
  const lbShareToast = document.getElementById("lbShareToast");
  const lbClose    = document.getElementById("lbClose");
  const lbPrev     = document.getElementById("lbPrev");
  const lbNext     = document.getElementById("lbNext");

  const catLabels = { sport:"Sport", street:"Street", portrait:"Porträt", travel:"Reise" };
  let currentIndex = 0;

  // Pfad-Präfix: generierte Seiten liegen unter galerie/<id>/ → Bilder sind ../../images/...
  // galerie.html liegt im Root → kein Präfix nötig
  const pathPrefix = bodyAlbumId ? "../../" : "";
  function p(src) { return src ? pathPrefix + src : src; }

  // ── Seiten-Übergang ───────────────────────────────────────
  const pageTransition = document.getElementById("pageTransition");
  requestAnimationFrame(() => {
    if (pageTransition) pageTransition.classList.remove("active");
  });
  window.addEventListener("pageshow", e => {
    if (e.persisted && pageTransition) {
      pageTransition.classList.remove("active");
    }
  });
  document.addEventListener("click", e => {
    const link = e.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
    e.preventDefault();
    if (pageTransition) pageTransition.classList.add("active");
    setTimeout(() => { window.location.href = href; }, 360);
  });

  if (!album) {
    if (notFound) notFound.style.display = "block";
    document.title = "Album nicht gefunden";
    return;
  }

  // ── Dark / Light Mode ─────────────────────────────────────
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(savedTheme);
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      document.body.classList.add("theme-transitioning");
      document.body.classList.remove("dark", "light");
      document.body.classList.add(isDark ? "light" : "dark");
      localStorage.setItem("theme", isDark ? "light" : "dark");
      setTimeout(() => document.body.classList.remove("theme-transitioning"), 350);
    });
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
  document.getElementById("albumHeaderBg").style.backgroundImage = `url('${p(album.cover)}')`;

  // ── Ähnliche Alben ────────────────────────────────────────
  function buildRelated() {
    const related = data.albums.filter(a =>
      a.id !== album.id &&
      a.visible !== false &&
      a.category === album.category
    ).slice(0, 3);

    const fallback = related.length < 3
      ? data.albums.filter(a =>
          a.id !== album.id &&
          a.visible !== false &&
          !related.find(r => r.id === a.id)
        ).slice(0, 3 - related.length)
      : [];

    const all = [...related, ...fallback].slice(0, 3);
    if (all.length === 0) return;

    const section = document.getElementById("relatedSection");
    const relGrid = document.getElementById("relatedGrid");
    section.style.display = "block";

    relGrid.innerHTML = all.map(a => `
      <a class="related-card" href="../${encodeURIComponent(a.id)}/">
        <img src="${p(a.cover)}" alt="${a.title}" oncontextmenu="return false" />
        <div class="related-card-overlay">
          <div>
            <p class="related-card-title">${a.title}</p>
            <p class="related-card-cat">${catLabels[a.category] || a.category}</p>
          </div>
        </div>
      </a>
    `).join("");
  }

  buildRelated();

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
      <img src="${p(photo.src)}" alt="${photo.title || ''}"
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
    lbImg.src    = p(photo.src);
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

  // ── Bild teilen ───────────────────────────────────────────
  lbShare.addEventListener("click", async () => {
    const photo = album.photos[currentIndex];
    const imageUrl = window.location.origin + "/" + p(photo.src);
    const shareText = `${photo.title || album.title} – ${data.photographer.name}`;

    // Web Share API (nativ auf Mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Abgebrochen oder nicht unterstützt → fallback
      }
    }

    // Fallback: URL in Zwischenablage kopieren
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (e) {
      // Ältere Browser
      const ta = document.createElement("textarea");
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    // Toast anzeigen
    lbShareToast.classList.add("show");
    setTimeout(() => lbShareToast.classList.remove("show"), 2000);
  });

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

  // ── Scroll-to-Top ─────────────────────────────────────────
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-top";
  scrollBtn.setAttribute("aria-label", "Nach oben");
  scrollBtn.innerHTML = "↑";
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("visible", window.scrollY > 600);
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

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