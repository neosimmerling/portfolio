// ============================================================
//  ADMIN TOOLBOX JS
//  Passwort ändern: ADMIN_PASSWORD unten
// ============================================================

(function () {
  "use strict";

  // ── Passwort (hier ändern) ────────────────────────────────
  const DEFAULT_PASSWORD = "foto2024";

  // ── State ─────────────────────────────────────────────────
  let adminData = JSON.parse(JSON.stringify(PORTFOLIO_DATA)); // deep copy
  let editingPhotoId = null;

  // ── DOM ───────────────────────────────────────────────────
  const loginScreen = document.getElementById("loginScreen");
  const adminPanel  = document.getElementById("adminPanel");
  const pwInput     = document.getElementById("pwInput");
  const loginBtn    = document.getElementById("loginBtn");
  const loginHint   = document.getElementById("loginHint");
  const logoutBtn   = document.getElementById("logoutBtn");

  // ── Login ─────────────────────────────────────────────────
  function getStoredPw() {
    return localStorage.getItem("admin_pw") || DEFAULT_PASSWORD;
  }

  function doLogin() {
    const pw = getStoredPw();
    if (pwInput.value === pw) {
      loginScreen.style.display = "none";
      adminPanel.style.display = "flex";
      initAdmin();
    } else {
      loginHint.textContent = "Falsches Passwort.";
      pwInput.value = "";
      pwInput.focus();
    }
  }

  loginBtn.addEventListener("click", doLogin);
  pwInput.addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
  logoutBtn.addEventListener("click", () => {
    adminPanel.style.display = "none";
    loginScreen.style.display = "flex";
    pwInput.value = "";
    loginHint.textContent = "";
  });

  // ── Tabs ──────────────────────────────────────────────────
  document.querySelectorAll(".snav-item").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll(".snav-item").forEach(i => i.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
      item.classList.add("active");
      const tab = document.getElementById("tab-" + item.dataset.tab);
      if (tab) tab.classList.add("active");
    });
  });

  // ── Photo Table ───────────────────────────────────────────
  function renderPhotoTable() {
    const tbody = document.getElementById("photoTableBody");
    const catLabels = {
      sport: "Sport", street: "Street",
      portrait: "Porträt", travel: "Reise"
    };
    tbody.innerHTML = adminData.photos.map(p => `
      <tr data-id="${p.id}">
        <td style="color:rgba(212,207,200,0.3)">${p.id}</td>
        <td>${p.title}</td>
        <td><span class="cat-badge">${catLabels[p.category] || p.category}</span></td>
        <td style="font-family:'DM Mono',monospace;font-size:0.75rem;color:rgba(212,207,200,0.4)">${p.src}</td>
        <td>
          <button class="btn-edit" onclick="adminEditPhoto(${p.id})">✎ Edit</button>
          <button class="btn-danger" onclick="adminDeletePhoto(${p.id})">✕</button>
        </td>
      </tr>
    `).join("");
  }

  // ── Add/Edit Photo Modal ──────────────────────────────────
  const photoModal  = document.getElementById("photoModal");
  const modalTitle  = document.getElementById("modalTitle");
  const mTitle      = document.getElementById("mTitle");
  const mCategory   = document.getElementById("mCategory");
  const mSrc        = document.getElementById("mSrc");
  const mThumb      = document.getElementById("mThumb");

  function openModal(id) {
    editingPhotoId = id || null;
    if (id) {
      const photo = adminData.photos.find(p => p.id === id);
      modalTitle.textContent = "Foto bearbeiten";
      mTitle.value = photo.title;
      mCategory.value = photo.category;
      mSrc.value = photo.src;
      mThumb.value = photo.thumb !== photo.src ? photo.thumb : "";
    } else {
      modalTitle.textContent = "Foto hinzufügen";
      mTitle.value = ""; mCategory.value = "sport";
      mSrc.value = ""; mThumb.value = "";
    }
    photoModal.style.display = "flex";
    mTitle.focus();
  }

  function closeModal() {
    photoModal.style.display = "none";
    editingPhotoId = null;
  }

  document.getElementById("addPhotoBtn").addEventListener("click", () => openModal(null));
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalCancel").addEventListener("click", closeModal);

  document.getElementById("modalSave").addEventListener("click", () => {
    const title = mTitle.value.trim();
    const src = mSrc.value.trim();
    if (!title || !src) { alert("Titel und Bildpfad sind Pflichtfelder."); return; }
    const thumb = mThumb.value.trim() || src;

    if (editingPhotoId) {
      const idx = adminData.photos.findIndex(p => p.id === editingPhotoId);
      if (idx !== -1) {
        adminData.photos[idx] = {
          ...adminData.photos[idx],
          title, category: mCategory.value, src, thumb
        };
      }
    } else {
      const maxId = adminData.photos.reduce((m, p) => Math.max(m, p.id), 0);
      adminData.photos.push({
        id: maxId + 1,
        title,
        category: mCategory.value,
        src,
        thumb
      });
    }
    closeModal();
    renderPhotoTable();
  });

  // Close modal on overlay click
  photoModal.addEventListener("click", e => { if (e.target === photoModal) closeModal(); });

  // ── Edit / Delete (global fns for inline onclick) ─────────
  window.adminEditPhoto = function(id) { openModal(id); };
  window.adminDeletePhoto = function(id) {
    if (!confirm("Foto wirklich entfernen?")) return;
    adminData.photos = adminData.photos.filter(p => p.id !== id);
    renderPhotoTable();
  };

  // ── About Tab ─────────────────────────────────────────────
  function loadAboutForm() {
    const p = adminData.photographer;
    document.getElementById("aName").value = p.name;
    document.getElementById("aEmail").value = p.email;
    document.getElementById("aBio1").value = p.bio[0] || "";
    document.getElementById("aBio2").value = p.bio[1] || "";
    document.getElementById("aStat1Num").value = p.stats[0]?.num || "";
    document.getElementById("aStat1Label").value = p.stats[0]?.label || "";
    document.getElementById("aStat2Num").value = p.stats[1]?.num || "";
    document.getElementById("aStat2Label").value = p.stats[1]?.label || "";
    document.getElementById("aStat3Num").value = p.stats[2]?.num || "";
    document.getElementById("aStat3Label").value = p.stats[2]?.label || "";
    document.getElementById("aTags").value = p.tags.join(", ");
    document.getElementById("aPortrait").value = p.portrait || "";
    const ig = p.socials.find(s => s.label === "Instagram");
    const li = p.socials.find(s => s.label === "LinkedIn");
    document.getElementById("aInstagram").value = ig?.url || "";
    document.getElementById("aLinkedin").value = li?.url || "";
  }

  document.getElementById("saveAboutBtn").addEventListener("click", () => {
    adminData.photographer.name = document.getElementById("aName").value.trim();
    adminData.photographer.email = document.getElementById("aEmail").value.trim();
    adminData.photographer.bio = [
      document.getElementById("aBio1").value.trim(),
      document.getElementById("aBio2").value.trim()
    ].filter(Boolean);
    adminData.photographer.stats = [
      { num: document.getElementById("aStat1Num").value.trim(), label: document.getElementById("aStat1Label").value.trim() },
      { num: document.getElementById("aStat2Num").value.trim(), label: document.getElementById("aStat2Label").value.trim() },
      { num: document.getElementById("aStat3Num").value.trim(), label: document.getElementById("aStat3Label").value.trim() }
    ].filter(s => s.num);
    adminData.photographer.tags = document.getElementById("aTags").value.split(",").map(t => t.trim()).filter(Boolean);
    adminData.photographer.portrait = document.getElementById("aPortrait").value.trim();

    const socials = [];
    const ig = document.getElementById("aInstagram").value.trim();
    const li = document.getElementById("aLinkedin").value.trim();
    if (ig) socials.push({ label: "Instagram", url: ig });
    if (li) socials.push({ label: "LinkedIn", url: li });
    adminData.photographer.socials = socials;

    alert("Steckbrief gespeichert! Exportiere jetzt data.js unter Einstellungen.");
  });

  // ── Password change ───────────────────────────────────────
  document.getElementById("savePwBtn").addEventListener("click", () => {
    const pw1 = document.getElementById("newPw").value;
    const pw2 = document.getElementById("newPw2").value;
    const hint = document.getElementById("pwHint");
    if (!pw1) { hint.className = "hint error"; hint.textContent = "Bitte Passwort eingeben."; return; }
    if (pw1 !== pw2) { hint.className = "hint error"; hint.textContent = "Passwörter stimmen nicht überein."; return; }
    localStorage.setItem("admin_pw", pw1);
    hint.className = "hint success";
    hint.textContent = "Passwort gespeichert!";
    document.getElementById("newPw").value = "";
    document.getElementById("newPw2").value = "";
  });

  // ── Export data.js ────────────────────────────────────────
  document.getElementById("exportBtn").addEventListener("click", () => {
    const content = generateDataJs();
    const blob = new Blob([content], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.js";
    a.click();
    URL.revokeObjectURL(url);
  });

  function generateDataJs() {
    const p = adminData.photographer;
    const photos = adminData.photos;

    const photosStr = photos.map(ph => `    {
      id: ${ph.id},
      title: ${JSON.stringify(ph.title)},
      category: ${JSON.stringify(ph.category)},
      src: ${JSON.stringify(ph.src)},
      thumb: ${JSON.stringify(ph.thumb)}
    }`).join(",\n");

    const statsStr = p.stats.map(s =>
      `      { num: ${JSON.stringify(s.num)}, label: ${JSON.stringify(s.label)} }`
    ).join(",\n");

    const socialsStr = p.socials.map(s =>
      `      { label: ${JSON.stringify(s.label)}, url: ${JSON.stringify(s.url)} }`
    ).join(",\n");

    const bioStr = p.bio.map(b => `      ${JSON.stringify(b)}`).join(",\n");
    const tagsStr = p.tags.map(t => `      ${JSON.stringify(t)}`).join(",\n");

    return `// ============================================================
//  PORTFOLIO DATEN – generiert via Admin-Toolbox
//  ${new Date().toLocaleString("de-DE")}
// ============================================================

const PORTFOLIO_DATA = {

  photographer: {
    name: ${JSON.stringify(p.name)},
    tagline: "Fotograf & Bildgestalter",
    bio: [
${bioStr}
    ],
    stats: [
${statsStr}
    ],
    tags: [
${tagsStr}
    ],
    portrait: ${JSON.stringify(p.portrait || "images/portrait.jpg")},
    email: ${JSON.stringify(p.email)},
    socials: [
${socialsStr}
    ]
  },

  photos: [
${photosStr}
  ]
};
`;
  }

  // ── Init Admin ────────────────────────────────────────────
  function initAdmin() {
    renderPhotoTable();
    loadAboutForm();
  }

})();
