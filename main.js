document.addEventListener("DOMContentLoaded", () => {
    // Startar bara de funktioner som behövs för sidan vi är på
  if (document.querySelector("#listingGrid")) initIndex();
  if (document.querySelector("#loginForm")) initLogin();
});

function initIndex() {
  const grid = document.querySelector("#listingGrid");
  const search = document.querySelector("#search");
    // Data i JS (array med objekt) som bygger UI 
  const listings = seedData();
    // Visar alla annonser direkt när sidan laddas
  renderListings(listings, "");

  search.addEventListener("input", (e) => {
    // Filtrerar listan när användaren skriver
    const q = e.target.value.trim().toLowerCase();
    const filtered = filterListings(listings, q);
    renderListings(filtered, q);
  });
    // Event delegation: en click-listener på hela grid istället för på varje kort
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action='toggle-trend']");
    if (!btn) return;

    const card = e.target.closest("[data-id]");
    if (!card) return;

    const id = card.dataset.id;
    const item = listings.find((x) => x.id === id);

    if (!item) return;
    // Byter trend (up/down) och uppdaterar listan
    item.trend = item.trend === "up" ? "down" : "up";

    const q = search.value.trim().toLowerCase();
    renderListings(filterListings(listings, q), q);
  });

  function renderListings(data, q) {
     // Tömmer och bygger upp listan på nytt (så UI matchar datan)
    grid.innerHTML = "";

    if (data.length === 0) {
      const p = document.createElement("p");
      p.className = "empty-state";
      p.textContent = q ? `Inga matchningar för "${q}".` : "Inga bostäder att visa.";
      grid.append(p);
      return;
    }
    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "annons-div";
      card.dataset.id = item.id;

      const arrowIcon =
        item.trend === "up" ? "ICONS/grönpil.svg" : "ICONS/rödpil.svg";

      card.innerHTML = `
        <div class="bild-div">
          <img class="bild" src="${item.img}" alt="Bostadsbild" loading="lazy">
        </div>

        <div class="info-grid">
          <div class="annons-info">
            <p class="adress">${item.adress}</p>
            <p class="plats">${item.plats}</p>
            <p class="pris">${formatPrice(item.pris)}</p>
          </div>

          <div class="jämför">
            <button class="compare-btn" type="button" data-action="toggle-trend" aria-label="Växla trend">
              <img class="pilar" src="${arrowIcon}" alt="" loading="lazy">
            </button>
            <div class="tooltip">Jämför pris</div>
          </div>
        </div>
      `;
      grid.append(card);
    });
  }
}

function filterListings(arr, q) {
  if (!q) return arr;

  return arr.filter((x) => {
    const text = (x.adress + " " + x.plats).toLowerCase();
    return text.includes(q);
  });
}

function seedData() {
  return [
    {
      id: "seed-1",
      adress: "Lilla Nygatan 12, 123 45",
      plats: "Hornstull, Stockholm",
      pris: 5900000,
      trend: "up",
      img: "img/bostad-1.jpg",
    },
    {
      id: "seed-2",
      adress: "Bondegatan 45, 116 33",
      plats: "Södermalm, Stockholm",
      pris: 6450000,
      trend: "down",
      img: "img/1.jpg",
    },
    {
      id: "seed-3",
      adress: "Östra Hamngatan 12, 411 09",
      plats: "Hornstull, Stockholm",
      pris: 4875000,
      trend: "up",
      img: "img/2.jpg",
    },
    {
      id: "seed-4",
      adress: "Regementsgatan 85, 217 53",
      plats: "Slottsstaden, Malmö",
      pris: 3950000,
      trend: "down",
      img: "img/3.jpg",
    },
    {
      id: "seed-5",
      adress: "Norra Gubberogatan 28B, 416 63",
      plats: "Olskroken, Göteborg",
      pris: 2895000,
      trend: "up",
      img: "img/10.jpg",
    },
    {
      id: "seed-6",
      adress: "Valhallavägen 102, 114 27",
      plats: "Östermalm, Stockholm",
      pris: 9200000,
      trend: "up",
      img: "img/5.jpg",
    },
    {
      id: "seed-7",
      adress: "Hantverkargatan 18, 112 21",
      plats: "Kungsholmen, Stockholm",
      pris: 5675000,
      trend: "down",
      img: "img/6.jpg",
    },
    {
      id: "seed-8",
      adress: "Amiralsgatan 5, 211 55",
      plats: "Rörsjöstaden, Malmö",
      pris: 2750000,
      trend: "up",
      img: "img/7.jpg",
    },
    {
      id: "seed-9",
      adress: "Nygatan 7, 803 11",
      plats: "Gävle Centrum",
      pris: 1995000,
      trend: "up",
      img: "img/8.jpg",
    },
    {
      id: "seed-10",
      adress: "Östra gatan 17, 116 45",
      plats: "Slussen, Stockholm",
      pris: 8800000,
      trend: "up",
      img: "img/11.jpg",
    },
    {
      id: "seed-11",
      adress: "Hejsangatan 4, 450 11",
      plats: "Angered, Göteborg",
      pris: 2795000,
      trend: "down",
      img: "img/12.jpg",
    },
    {
      id: "seed-12",
      adress: "Vadervägen, 145 12",
      plats: "Norsborg Stockholm",
      pris: 2250000,
      trend: "up",
      img: "img/13.jpg",
    },
  ];
}

function initLogin() {
  const form = document.querySelector("#loginForm");
  const emailInput = document.querySelector("#emailInput");
  const msg = document.querySelector("#uiMessage");
  const errorEl = document.querySelector('[data-error-for="email"]');

  if (!form || !emailInput || !msg || !errorEl) return;

  form.addEventListener("submit", (e) => {
    // Förhindrar att sidan laddas om när man skickar formuläret
    e.preventDefault();
     // Nollställer gamla fel innan vi validerar igen
    msg.textContent = "";
    errorEl.textContent = "";

    const email = emailInput.value.trim();
    // Enkel validering: tomt + format
    if (email === "") {
      errorEl.textContent = "E-post får inte vara tom.";
      msg.textContent = "Kunde inte fortsätta. Kontrollera e-post.";
      return;
    }
    if (!isValidEmail(email)) {
      errorEl.textContent = "Ange en giltig e-postadress.";
      msg.textContent = "Kunde inte fortsätta. Kontrollera e-post.";
      return;
    }
    msg.textContent = "Klart! En länk har skickats till din e-post.";
    form.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatPrice(n) {
  return `${Number(n).toLocaleString("sv-SE")} kr`;
}
