// Renders the game cards on the homepage from the games.json manifest.

/**
 * @typedef {Object} GameEntry
 * @property {string} id
 * @property {string} title
 * @property {string} tagline
 * @property {string} emoji
 * @property {string} url
 * @property {string} [accent]
 * @property {string[]} [tags]
 * @property {string} [players]
 */

async function loadGames() {
  const res = await fetch("games.json");
  if (!res.ok) throw new Error(`games.json: HTTP ${res.status}`);
  const data = await res.json();
  return data.games;
}

/**
 * @param {GameEntry} game
 */
function card(game) {
  const el = document.createElement("a");
  el.className = "game-card";
  el.href = game.url;
  if (game.accent) el.style.setProperty("--card-accent", game.accent);

  const tags = (game.tags ?? []).map((t) => `<span>${t}</span>`).join("");

  el.innerHTML = `
    <div class="cover">${game.emoji}</div>
    <h3>${game.title}</h3>
    <p class="tagline">${game.tagline}</p>
    <div class="tags">${tags}</div>
    <div class="meta">▶ ${game.players ?? "Play in browser"}</div>
  `;
  return el;
}

const grid = document.getElementById("game-grid");

async function init() {
  try {
    const games = await loadGames();
    for (const g of games) grid?.appendChild(card(g));
  } catch (err) {
    console.error("Failed to load games.json", err);
    if (grid)
      grid.innerHTML =
        '<p style="color:var(--text-dim)">Kon de spelijst niet laden. Sorry!</p>';
  }

  // "more coming soon" placeholder
  const soon = document.createElement("div");
  soon.className = "game-card soon";
  soon.innerHTML = `
    <div class="cover">🕹️</div>
    <h3>Binnenkort</h3>
    <p class="tagline">Nog een DP Game Bros original is in de maak…</p>
  `;
  grid?.appendChild(soon);
}

void init();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
