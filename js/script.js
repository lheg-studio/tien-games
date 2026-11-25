const WHATSAPP = "595993420918";

const games = {
  "free-fire": {
    name: "Free Fire",
    currency: "diamantes",
    symbol: "FF",
    packages: [
      [110, 7200],
      [341, 20000],
      [572, 33000],
      [1166, 62000],
      [2398, 126000],
      [6160, 310000]
    ]
  },
  "blood-strike": {
    name: "Blood Strike",
    currency: "oro",
    symbol: "BS",
    packages: [
      [105, 6500],
      [320, 19500],
      [540, 32000],
      [645, 38500],
      [1100, 64000],
      [2260, 128000],
      [3120, 180000],
      [5800, 320000],
      [10320, 576000]
    ]
  },
  "pubg-mobile": {
    name: "PUBG Mobile",
    currency: "UC",
    symbol: "PUBG",
    packages: [
      [60, 7500],
      [325, 35000],
      [385, 43000],
      [660, 73000],
      [1800, 185000],
      [3850, 350000],
      [8100, 697000]
    ]
  },
  "roblox": {
    name: "Roblox",
    currency: "Robux",
    symbol: "R",
    packages: [
      [10, 1000],
      [50, 4000],
      [100, 7500],
      [150, 11500],
      [200, 15000],
      [400, 30000],
      [500, 36000],
      [600, 43500],
      [800, 58000],
      [1000, 71500]
    ]
  }
};

const money = value => "Gs. " + Number(value).toLocaleString("es-PY");

function orderLink(game, amount, price) {
  const message = `Hola TIEN GAMES. Quiero solicitar ${amount} ${game.currency} de ${game.name}. Precio: ${money(price)}.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function renderPackages(slug, target) {
  const game = games[slug];
  const element = document.querySelector(target);
  if (!game || !element) return;

  element.innerHTML = game.packages.map(([amount, price]) => `
    <article class="package fade-in">
      <strong>${amount.toLocaleString("es-PY")} ${game.currency}</strong>
      <span>${money(price)}</span>
      <a href="${orderLink(game, amount, price)}" target="_blank" rel="noopener">
        SOLICITAR RECARGA
      </a>
    </article>
  `).join("");
}

function renderHomePackages() {
  const element = document.querySelector("#home-packages");
  if (!element) return;

  const all = Object.values(games).flatMap(game =>
    game.packages.map(([amount, price]) => ({game, amount, price}))
  );

  element.innerHTML = all.map(item => `
    <article class="package">
      <strong>${item.amount.toLocaleString("es-PY")} ${item.game.currency}</strong>
      <small style="color:#91a5c2">${item.game.name}</small>
      <span>${money(item.price)}</span>
      <a href="${orderLink(item.game, item.amount, item.price)}" target="_blank" rel="noopener">
        SOLICITAR
      </a>
    </article>
  `).join("");
}

function setupSearch() {
  const search = document.querySelector("#game-search");
  if (!search) return;

  search.addEventListener("input", () => {
    const query = search.value.toLowerCase();
    document.querySelectorAll(".game-card").forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? "" : "none";
    });
  });
}

function setupMenu() {
  const button = document.querySelector(".menu-button");
  const links = document.querySelector(".nav-links");
  if (button && links) {
    button.addEventListener("click", () => links.classList.toggle("open"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupSearch();
  renderHomePackages();

  const page = document.body.dataset.game;
  if (page) renderPackages(page, "#game-packages");
});
