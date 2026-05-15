const langBadge = { python:"badge-py", javascript:"badge-js", shell:"badge-sh", powershell:"badge-ps" };

let activeTag = "all", searchVal = "";

function makeCard(s, featured) {
  const a = document.createElement('a');
  a.className = 'card' + (featured ? ' featured-card' : '');
  a.href = `script.html?id=${s.id}`;
  a.innerHTML = `
    <div class="card-top">
      <span class="card-icon">${s.icon}</span>
      <span class="card-name">${s.name}</span>
    </div>
    <div class="card-desc">${s.desc}</div>
    <div class="card-footer">
      <span class="badge ${langBadge[s.lang]||'badge-py'}">${s.lang}</span>
      <span class="badge" style="color:var(--muted);border-color:var(--border);background:transparent;">${s.tag}</span>
    </div>`;
  return a;
}

function renderFeatured() {
  const fg = document.getElementById('featured-grid');
  if (!fg) return;
  fg.innerHTML = '';
  const featured = SCRIPTS.filter(s => FEATURED_IDS.includes(s.id));
  featured.forEach(s => fg.appendChild(makeCard(s, true)));
}

function renderGrid() {
  const grid = document.getElementById('grid');
  const noRes = document.getElementById('no-results');
  const featSec = document.getElementById('featured-section');
  const allLabel = document.getElementById('all-label');
  if (!grid) return;

  const filtered = SCRIPTS.filter(s => {
    const matchTag = activeTag === 'all' || s.tag === activeTag;
    const matchSearch = s.name.includes(searchVal) || s.desc.toLowerCase().includes(searchVal);
    return matchTag && matchSearch;
  });

  // Hide featured section when searching/filtering
  const isFiltering = activeTag !== 'all' || searchVal !== '';
  if (featSec) featSec.style.display = isFiltering ? 'none' : 'block';
  if (allLabel) allLabel.style.display = isFiltering ? 'none' : 'flex';

  grid.innerHTML = '';
  if (filtered.length === 0) {
    noRes.style.display = 'block'; return;
  }
  noRes.style.display = 'none';
  filtered.forEach(s => grid.appendChild(makeCard(s, false)));
}

function updateCount() {
  const el = document.getElementById('count-badge');
  if (el) el.textContent = `✦ ${SCRIPTS.length} scripts and counting`;
}

// Tags
document.querySelectorAll('.tag').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tag').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTag = btn.dataset.tag;
    renderGrid();
  });
});

// Search
const si = document.getElementById('search');
if (si) si.addEventListener('input', e => { searchVal = e.target.value.toLowerCase().trim(); renderGrid(); });

renderFeatured();
renderGrid();
updateCount();
