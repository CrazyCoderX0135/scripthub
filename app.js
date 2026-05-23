const langBadge = { python:"badge-py", javascript:"badge-js", shell:"badge-sh", powershell:"badge-ps" };
let activeTag = "all", searchVal = "", activeDiff = "all";

// ── CARD BUILDER ─────────────────────────────────────────────
function makeCard(s, featured) {
  const a = document.createElement('a');
  a.className = 'card' + (featured ? ' featured-card' : '');
  a.href = `script.html?id=${s.id}`;
  const preview = s.code.split('\n').slice(0, 6).join('\n').slice(0, 220);
  const isNew = (typeof SCRIPT_NEW !== 'undefined') && Array.isArray(SCRIPT_NEW) && SCRIPT_NEW.includes(s.id);
  const newBadge = isNew ? `<span class="badge badge-new">✦ new</span>` : '';
  a.innerHTML = `
    <div class="card-top">
      <span class="card-icon">${s.icon}</span>
      <span class="card-name">${s.name}</span>
      ${newBadge}
    </div>
    <div class="card-desc">${s.desc}</div>
    <div class="card-footer">
      <span class="badge ${langBadge[s.lang]||'badge-py'}">${s.lang}</span>
      <span class="badge" style="color:var(--muted);border-color:var(--border);background:transparent;">${s.tag}</span>
    </div>
    <div class="card-preview">${escHtml(preview)}</div>`;
  return a;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── RECENTLY VIEWED ───────────────────────────────────────────
function getRV() {
  try { return JSON.parse(localStorage.getItem('sh-rv') || '[]'); } catch { return []; }
}

function renderRecentlyViewed() {
  const sec = document.getElementById('rv-section');
  if (!sec) return;
  const ids = getRV();
  if (ids.length === 0) { sec.style.display = 'none'; return; }
  const scripts = ids.map(id => SCRIPTS.find(s => s.id === id)).filter(Boolean);
  if (scripts.length === 0) { sec.style.display = 'none'; return; }
  sec.style.display = 'block';
  const scrollEl = document.getElementById('rv-scroll');
  if (scrollEl) {
    scrollEl.innerHTML = scripts.map(s =>
      `<a class="rv-chip" href="script.html?id=${s.id}"><span>${s.icon}</span>${s.name}</a>`
    ).join('');
  }
}

// ── FEATURED ─────────────────────────────────────────────────
function renderFeatured() {
  const fg = document.getElementById('featured-grid');
  if (!fg) return;
  fg.innerHTML = '';
  SCRIPTS.filter(s => FEATURED_IDS.includes(s.id)).forEach(s => fg.appendChild(makeCard(s, true)));
}

// ── SCRIPT OF THE DAY ─────────────────────────────────────────
function renderSOTD() {
  const el = document.getElementById('sotd-wrap');
  if (!el) return;
  const d = new Date();
  const n = d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
  const s = SCRIPTS[n % SCRIPTS.length];
  el.innerHTML = `
    <a class="sotd-card" href="script.html?id=${s.id}">
      <div class="sotd-icon">${s.icon}</div>
      <div class="sotd-text">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
      </div>
      <div class="sotd-badge">⭐ script of the day</div>
    </a>`;
}

// ── MAIN GRID ─────────────────────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('grid');
  const noRes = document.getElementById('no-results');
  const featSec = document.getElementById('featured-section');
  const sotdSec = document.getElementById('sotd-section');
  const allLabel = document.getElementById('all-label');
  const rvSec = document.getElementById('rv-section');
  if (!grid) return;

  const filtered = SCRIPTS.filter(s => {
    const matchTag = activeTag === 'all' || s.tag === activeTag;
    const matchSearch = s.name.toLowerCase().includes(searchVal) || s.desc.toLowerCase().includes(searchVal);
    const matchDiff = activeDiff === 'all' ||
      (SCRIPT_META && SCRIPT_META[s.id] && SCRIPT_META[s.id].difficulty === activeDiff);
    return matchTag && matchSearch && matchDiff;
  });

  const isFiltering = activeTag !== 'all' || searchVal !== '' || activeDiff !== 'all';
  if (featSec) featSec.style.display = isFiltering ? 'none' : 'block';
  if (sotdSec) sotdSec.style.display = isFiltering ? 'none' : 'block';
  if (allLabel) allLabel.style.display = isFiltering ? 'none' : 'flex';
  if (rvSec && isFiltering) rvSec.style.display = 'none';
  else if (rvSec && !isFiltering) renderRecentlyViewed();

  grid.innerHTML = '';
  if (filtered.length === 0) { noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';
  filtered.forEach(s => grid.appendChild(makeCard(s, false)));
}

function updateCount() {
  const el = document.getElementById('count-badge');
  if (el) el.textContent = `✦ ${SCRIPTS.length} scripts and counting`;
}

// ── TAGS ──────────────────────────────────────────────────────
document.querySelectorAll('.tag').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tag').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTag = btn.dataset.tag;
    renderGrid();
  });
});

// ── DIFFICULTY FILTER ─────────────────────────────────────────
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeDiff = btn.dataset.diff;
    renderGrid();
  });
});

// ── SEARCH + HISTORY ──────────────────────────────────────────
const si = document.getElementById('search');
const historyBox = document.getElementById('search-history');
let searchTimer;

function getHistory() {
  try { return JSON.parse(localStorage.getItem('sh-search-history') || '[]'); } catch { return []; }
}
function saveToHistory(val) {
  if (!val || val.length < 2) return;
  let h = getHistory().filter(x => x !== val);
  h.unshift(val);
  h = h.slice(0, 5);
  localStorage.setItem('sh-search-history', JSON.stringify(h));
}
function renderHistory() {
  if (!historyBox) return;
  const h = getHistory();
  if (h.length === 0) { historyBox.classList.remove('visible'); return; }
  historyBox.innerHTML = `<div class="history-label">recent searches</div><div class="history-chips">${h.map(t => `<span class="history-chip" data-val="${escHtml(t)}">${escHtml(t)}</span>`).join('')}</div>`;
  historyBox.querySelectorAll('.history-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      si.value = chip.dataset.val;
      searchVal = chip.dataset.val.toLowerCase();
      historyBox.classList.remove('visible');
      renderGrid();
    });
  });
}

if (si) {
  si.addEventListener('focus', () => { renderHistory(); if (getHistory().length > 0) historyBox.classList.add('visible'); });
  si.addEventListener('blur', () => setTimeout(() => historyBox && historyBox.classList.remove('visible'), 200));
  si.addEventListener('input', e => {
    searchVal = e.target.value.toLowerCase().trim();
    renderGrid();
    clearTimeout(searchTimer);
    if (searchVal.length >= 2) searchTimer = setTimeout(() => saveToHistory(searchVal), 1500);

    // Easter egg: sudo
    if (si.value.toLowerCase().includes('sudo rm')) {
      si.value = '';
      searchVal = '';
      renderGrid();
      showEasterEggMsg('❌ Permission denied. You are not root.');
    }
    // Easter egg: matrix
    if (si.value.toLowerCase() === 'matrix') {
      si.value = '';
      searchVal = '';
      renderGrid();
      triggerMatrixEasterEgg();
    }
    // Easter egg: scripthub
    if (si.value.toLowerCase() === 'scripthub') {
      si.value = '';
      searchVal = '';
      renderGrid();
      showEasterEggMsg('👾 you found the secret! welcome to scripthub.');
    }
  });
}

// ── KEYBOARD SHORTCUTS ────────────────────────────────────────
document.addEventListener('keydown', e => {
  const tag = document.activeElement?.tagName;
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

  // / → focus search
  if (e.key === '/' && !isTyping) {
    e.preventDefault();
    if (si) { si.focus(); si.select(); }
    return;
  }
  // Escape → blur search / clear
  if (e.key === 'Escape') {
    if (document.activeElement === si && si) {
      si.blur();
    }
    // Close guide modal if open
    closeGuide && closeGuide();
    return;
  }
  // R → random script (only on index page)
  if ((e.key === 'r' || e.key === 'R') && !isTyping) {
    if (typeof goRandom === 'function') goRandom();
    return;
  }
  // F → go to favorites
  if ((e.key === 'f' || e.key === 'F') && !isTyping) {
    window.location.href = 'favorites.html';
    return;
  }
});

// ── EASTER EGGS ───────────────────────────────────────────────
function showEasterEggMsg(msg) {
  let el = document.getElementById('easter-msg-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'easter-msg-toast';
    el.style.cssText = 'position:fixed;bottom:5rem;left:50%;transform:translateX(-50%);background:var(--bg2);border:1px solid var(--green);color:var(--green);padding:0.6rem 1.5rem;border-radius:8px;font-size:0.82rem;font-family:Courier New,monospace;z-index:9999;transition:opacity 0.5s;';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = '1';
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.style.opacity = '0'; }, 2500);
}

function triggerMatrixEasterEgg() {
  const overlay = document.getElementById('easter-egg');
  if (!overlay) return;
  overlay.style.display = 'flex';
  const canvas = document.getElementById('easter-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  startMatrixCanvas(canvas, '#00ff41', 0);
  setTimeout(() => { overlay.style.display = 'none'; }, 6000);
}

document.getElementById('easter-egg')?.addEventListener('click', () => {
  document.getElementById('easter-egg').style.display = 'none';
});

// ── MATRIX RAIN ───────────────────────────────────────────────
function startMatrixCanvas(canvas, color, bgAlpha) {
  const ctx = canvas.getContext('2d');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アイウエオカキクケコサシスセソ';
  const fs = 13;
  const cols = Math.floor(canvas.width / fs);
  const drops = Array(cols).fill(1);
  return setInterval(() => {
    ctx.fillStyle = `rgba(0,0,0,${bgAlpha || 0.05})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color || '#3fb950';
    ctx.font = fs + 'px Courier New';
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
      if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 50);
}

// Hero matrix (subtle)
const heroCanvas = document.getElementById('matrix-canvas');
if (heroCanvas) {
  heroCanvas.width = heroCanvas.offsetWidth;
  heroCanvas.height = heroCanvas.offsetHeight;
  startMatrixCanvas(heroCanvas, '#3fb950', 0.15);
  window.addEventListener('resize', () => {
    heroCanvas.width = heroCanvas.offsetWidth;
    heroCanvas.height = heroCanvas.offsetHeight;
  });
}

// ── BACK TO TOP ───────────────────────────────────────────────
const backTop = document.getElementById('back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── THEME & TERMINAL MODE ─────────────────────────────────────
function toggleTheme() {
  document.documentElement.classList.add('theme-transitioning');
  const curr = document.documentElement.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('sh-theme', next);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = next === 'dark' ? '🌙' : '☀️';
  setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 420);
}
function toggleTerminal() {
  const curr = document.documentElement.getAttribute('data-mode');
  const next = curr === 'terminal' ? '' : 'terminal';
  document.documentElement.setAttribute('data-mode', next);
  localStorage.setItem('sh-mode', next);
  const btn = document.getElementById('terminal-btn');
  if (btn) btn.classList.toggle('active', next === 'terminal');
}
// Init theme + terminal mode
(function() {
  const t = localStorage.getItem('sh-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = t === 'dark' ? '🌙' : '☀️';
  const m = localStorage.getItem('sh-mode') || '';
  document.documentElement.setAttribute('data-mode', m);
  const tb = document.getElementById('terminal-btn');
  if (tb) tb.classList.toggle('active', m === 'terminal');
})();

// ── HAMBURGER NAV ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ── GUIDE MODAL ───────────────────────────────────────────────
function openGuide()  { document.getElementById('guide-modal')?.classList.add('open'); document.body.style.overflow='hidden'; }
function closeGuide() { document.getElementById('guide-modal')?.classList.remove('open'); document.body.style.overflow=''; }
function closeOnOverlay(e) { if (e.target === document.getElementById('guide-modal')) closeGuide(); }
function switchOS(os, btn) {
  document.querySelectorAll('.os-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.os-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('os-'+os).classList.add('active');
  btn.classList.add('active');
}

// ── RANDOM SCRIPT ─────────────────────────────────────────────
function goRandom() {
  const s = SCRIPTS[Math.floor(Math.random() * SCRIPTS.length)];
  window.location.href = `script.html?id=${s.id}`;
}

// ── INIT ──────────────────────────────────────────────────────
renderFeatured();
renderSOTD();
renderRecentlyViewed();
renderGrid();
updateCount();
