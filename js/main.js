// ============================================================
//  MAIN JS – Gallery, Lightbox, Nav, Download-Schutz
// ============================================================

(function () {
  "use strict";

  const data = PORTFOLIO_DATA;
  let currentPhotos = [];
  let currentIndex = 0;

  // ── DOM refs ──────────────────────────────────────────────
  const navEl        = document.getElementById("nav");
  const burgerEl     = document.getElementById("burger");
  const mobileMenu   = document.getElementById("mobileMenu");
  const galleryGrid  = document.getElementById("gallery-grid");
  const filterBtns   = document.querySelectorAll(".filter-btn");
  const lightbox     = document.getElementById("lightbox");
  const lbImg        = document.getElementById("lbImg");
  const lbTitle      = document.getElementById("lbTitle");
  const lbCat        = document.getElementById("lbCat");
  const lbClose      = document.getElementById("lbClose");
  const lbPrev       = document.getElementById("lbPrev");
  const lbNext       = document.getElementById("lbNext");

  // ── Populate personal data ────────────────────────────────
  function populatePersonalData() {
    const p = data.photographer;

    // Nav / footer name
    document.title = `Portfolio – ${p.name} | Fotograf`;
    document.querySelectorAll("#footerName").forEach(el => el.textContent = p.name);
    document.getElementById("aboutName").textContent = p.name;

    // Bio
    const bioEl = document.getElementById("aboutBio");
    bioEl.innerHTML = p.bio.map(t => `<p>${t}</p>`).join("");

    // Stats
    const statsEl = document.getElementById("aboutStats");
    statsEl.innerHTML = p.stats.map(s =>
      `<div class="stat">
        <span class="stat-num">${s.num}</span>
        <span class="stat-label">${s.label}</span>
      </div>`
    ).join("");

    // Tags
    const tagsEl = document.getElementById("aboutTagsWrap");
    tagsEl.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join("");

    // Portrait
    if (p.portrait) {
      const img = document.getElementById("aboutImg");
      const fallback = document.getElementById("aboutFallback");
      img.src = p.portrait;
      img.style.display = "block";
      if (fallback) fallback.style.display = "none";
    }

    // Email
    const mailEl = document.getElementById("contactMailto");
    mailEl.href = `mailto:${p.email}`;
    mailEl.textContent = p.email;

    // Sub text
    document.getElementById("contactSub").textContent =
      "Interesse an einer Zusammenarbeit oder einem Projekt? Schreib mir gerne.";

    // Socials
    const socialsEl = document.getElementById("contactSocials");
    socialsEl.innerHTML = p.socials.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener" class="social-link">${s.label}</a>`
    ).join("");

    // Footer year
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  // ── Build gallery ─────────────────────────────────────────
  function buildGallery(filter) {
    const photos = filter === "all"
      ? data.photos
      : data.photos.filter(p => p.category === filter);

    currentPhotos = photos;

    galleryGrid.innerHTML = photos.map((photo, idx) => {
      const catLabels = {
        sport: "Sport", street: "Street",
        portrait: "Porträt", travel: "Reise"
      };
      const catLabel = catLabels[photo.category] || photo.category;

      // Check if image file probably exists (we show placeholder if not)
      return `
        <div class="masonry-item fade-in" data-idx="${idx}" tabindex="0"
             role="button" aria-label="${photo.title} öffnen">
          <div class="img-placeholder" data-src="${photo.thumb}" data-loaded="false">
            <img
              src="${photo.thumb}"
              alt="${photo.title}"
              loading="lazy"
              oncontextmenu="return false"
              onerror="this.parentElement.querySelector('.ph-text') && (this.parentElement.querySelector('.ph-text').style.display='flex'); this.style.display='none';"
            />
            <span class="ph-text" style="display:none;width:100%;height:100%;min-height:220px;align-items:center;justify-content:center;font-size:0.72rem;color:rgba(255,255,255,0.15);letter-spacing:.1em;text-transform:uppercase;">
              ${photo.title}
            </span>
          </div>
          <div class="item-overlay">
            <div>
              <p class="item-title">${photo.title}</p>
              <p class="item-cat">${catLabel}</p>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Remove img-placeholder wrapper div for layout
    galleryGrid.querySelectorAll(".img-placeholder").forEach(wrap => {
      const img = wrap.querySelector("img");
      if (img) {
        img.style.width = "100%";
        img.style.display = "block";
      }
    });

    // Bind click events
    galleryGrid.querySelectorAll(".masonry-item").forEach(item => {
      item.addEventListener("click", () => openLightbox(parseInt(item.dataset.idx)));
      item.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") openLightbox(parseInt(item.dataset.idx));
      });
    });

    // Trigger fade-in
    requestAnimationFrame(() => {
      document.querySelectorAll(".masonry-item.fade-in").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 40);
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

  // ── Lightbox ──────────────────────────────────────────────
  const catLabels = {
    sport: "Sport", street: "Street",
    portrait: "Porträt", travel: "Reise"
  };

  function openLightbox(idx) {
    currentIndex = idx;
    const photo = currentPhotos[idx];
    lbImg.src = photo.src;
    lbImg.alt = photo.title;
    lbTitle.textContent = photo.title;
    lbCat.textContent = catLabels[photo.category] || photo.category;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
    openLightbox(currentIndex);
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % currentPhotos.length;
    openLightbox(currentIndex);
  }

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", prevPhoto);
  lbNext.addEventListener("click", nextPhoto);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  });

  // ── Download-Schutz ───────────────────────────────────────
  document.addEventListener("contextmenu", e => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });
  document.addEventListener("dragstart", e => {
    if (e.target.tagName === "IMG") e.preventDefault();
  });
  // Keyboard shortcut block (Ctrl+S, Ctrl+U)
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

  // ── Scroll fade-in observer ────────────────────────────────
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

  // ── Init ──────────────────────────────────────────────────
  populatePersonalData();
  buildGallery("all");
  observeFadeIns();
})();
