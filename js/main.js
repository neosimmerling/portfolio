// ============================================================
//  MAIN JS – Gallery (Album-Cover), Lightbox, Nav
// ============================================================

(function () {
  "use strict";

  const data = PORTFOLIO_DATA;

  // ── DOM refs ──────────────────────────────────────────────
  const navEl       = document.getElementById("nav");
  const burgerEl    = document.getElementById("burger");
  const mobileMenu  = document.getElementById("mobileMenu");
  const galleryGrid = document.getElementById("gallery-grid");
  const filterBtns  = document.querySelectorAll(".filter-btn");

  // ── Persönliche Daten befüllen ────────────────────────────
  function populatePersonalData() {
    const p = data.photographer;

    document.title = `Portfolio – ${p.name} | Fotograf`;
    document.querySelectorAll("#footerName").forEach(el => el.textContent = p.name);
    document.getElementById("aboutName").textContent = p.name;

    const bioEl = document.getElementById("aboutBio");
    bioEl.innerHTML = p.bio.map(t => `<p>${t}</p>`).join("");

    const statsEl = document.getElementById("aboutStats");
    statsEl.innerHTML = p.stats.map(s =>
      `<div class="stat">
        <span class="stat-num">${s.num}</span>
        <span class="stat-label">${s.label}</span>
      </div>`
    ).join("");

    const tagsEl = document.getElementById("aboutTagsWrap");
    tagsEl.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join("");

    if (p.portrait) {
      const img = document.getElementById("aboutImg");
      const fallback = document.getElementById("aboutFallback");
      img.src = p.portrait;
      img.style.display = "block";
      if (fallback) fallback.style.display = "none";
    }

    const mailEl = document.getElementById("contactMailto");
    mailEl.href = `mailto:${p.email}`;
    mailEl.textContent = p.email;

    document.getElementById("contactSub").textContent =
      "Interesse an einer Zusammenarbeit oder einem Projekt? Schreib mir gerne.";

    const socialsEl = document.getElementById("contactSocials");
    socialsEl.innerHTML = p.socials.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener" class="social-link">${s.label}</a>`
    ).join("");

    document.getElementById("year").textContent = new Date().getFullYear();
  }

  // ── Galerie: Album-Cover anzeigen ────────────────────────
  const catLabels = {
    sport: "Sport", street: "Street",
    portrait: "Porträt", travel: "Reise"
  };

  function buildGallery(filter) {
    // Alben mit visible: false werden ausgeblendet
    const visible = data.albums.filter(a => a.visible !== false);
    const albums = filter === "all"
      ? visible
      : visible.filter(a => a.category === filter);

    galleryGrid.innerHTML = albums.map((album, idx) => {
      const catLabel   = catLabels[album.category] || album.category;
      const dateStr    = album.date ? `<p class="item-date">${album.date}</p>` : "";
      const photoCount = album.photos.length;
      return `
        <a class="masonry-item album-card fade-in"
           href="galerie.html?album=${encodeURIComponent(album.id)}"
           aria-label="${album.title} öffnen">
          <div class="img-wrap">
            ${album.isNew ? `<span class="album-badge-new">Neu</span>` : ""}
            <img
              src="${album.cover}"
              alt="${album.title}"
              loading="lazy"
              oncontextmenu="return false"
              onload="this.classList.add('img-loaded'); this.nextElementSibling.style.opacity='0';"
            />
            <div class="img-skeleton"></div>
          </div>
          <div class="item-overlay">
            <div>
              <p class="item-title">${album.title}</p>
              <p class="item-cat">${catLabel}</p>
              ${dateStr}
            </div>
            ${photoCount > 0 ? `<span class="album-count">${photoCount}&nbsp;Fotos</span>` : ""}
          </div>
        </a>
      `;
    }).join("");

    // Farben per JS setzen – verhindert lila Browser-Linkfarbe in <a>-Tags
    galleryGrid.querySelectorAll(".album-card").forEach(card => {
      card.querySelectorAll(".item-title, .item-cat, .item-date, .album-count").forEach(el => {
        if (el.classList.contains("item-title")) el.style.color = "#f0ebe3";
        if (el.classList.contains("item-cat"))   el.style.color = "#c8a564";
        if (el.classList.contains("item-date"))  el.style.color = "rgba(232,226,217,0.45)";
        if (el.classList.contains("album-count")) el.style.color = "#c8a564";
      });

      // Hover: Badge einblenden
      const badge = card.querySelector(".album-count");
      if (!badge) return;
      card.addEventListener("mouseenter", () => { badge.style.opacity = "1"; badge.style.transform = "translateY(0)"; });
      card.addEventListener("mouseleave", () => { badge.style.opacity = "0"; badge.style.transform = "translateY(4px)"; });
    });

    requestAnimationFrame(() => {
      document.querySelectorAll(".masonry-item.fade-in").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 50);
      });
    });
  }

  // ── Filter ────────────────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      buildGallery(btn.dataset.filter);
    });
  });

  // ── Download-Schutz ───────────────────────────────────────
  document.addEventListener("contextmenu", e => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });
  document.addEventListener("dragstart", e => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "u")) {
      e.preventDefault();
    }
  });

  // ── Sticky Nav ────────────────────────────────────────────
  window.addEventListener("scroll", () => {
    navEl.classList.toggle("scrolled", window.scrollY > 60);
  });

  // ── Mobile Menu ───────────────────────────────────────────
  burgerEl.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });

  // ── Scroll fade-in observer ───────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeFadeIns() {
    document.querySelectorAll(".about-content, .contact-inner, .about-img-wrap").forEach(el => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  // ── Seiten-Übergang ───────────────────────────────────────
  const pageTransition = document.getElementById("pageTransition");
  window.addEventListener("load", () => {
    requestAnimationFrame(() => pageTransition.classList.remove("fade-out"));
  });
  document.addEventListener("click", e => {
    const link = e.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
    e.preventDefault();
    pageTransition.classList.add("fade-out");
    setTimeout(() => { window.location.href = href; }, 360);
  });

  // ── Init ──────────────────────────────────────────────────
  populatePersonalData();
  buildGallery("all");
  observeFadeIns();
})();