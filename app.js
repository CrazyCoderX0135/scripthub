const langBadge = { python: "badge-py", javascript: "badge-js", shell: "badge-sh", powershell: "badge-ps" };
const langLabel = { python: "python", javascript: "javascript", shell: "shell", powershell: "powershell" };

let activeTag = "all";
let searchVal = "";

function renderGrid() {
  const grid = document.getElementById("grid");
  const noResults = document.getElementById("no-results");
  if (!grid) return;

  const filtered = SCRIPTS.filter(s => {
    const matchTag = activeTag === "all" || s.tag === activeTag;
    const matchSearch = s.name.includes(searchVal) || s.desc.toLowerCase().includes(searchVal);
    return matchTag && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  grid.innerHTML = filtered.map(s => `
    <a class="card" href="script.html?id=${s.id}">
      <div class="card-top">
        <span class="card-icon">${s.icon}</span>
        <span class="card-name">${s.name}</span>
      </div>
      <div class="card-desc">${s.desc}</div>
      <div class="card-footer">
        <span class="badge ${langBadge[s.lang] || 'badge-py'}">${langLabel[s.lang] || s.lang}</span>
        <span class="badge" style="color:#8b949e;border-color:#30363d;background:transparent;">${s.tag}</span>
      </div>
    </a>
  `).join("");
}

// Tags
const tagButtons = document.querySelectorAll(".tag");
tagButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tagButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeTag = btn.dataset.tag;
    renderGrid();
  });
});

// Search
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    searchVal = e.target.value.toLowerCase().trim();
    renderGrid();
  });
}

renderGrid();
