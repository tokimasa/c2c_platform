const categories = [
  "Games & Toys",
  "Books & Manga",
  "Menswear",
  "Womenswear",
  "Kids",
  "Electronics",
  "Home",
  "Collectibles",
  "Beauty",
];

const products = [
  {
    id: 1,
    title: "Nintendo Switch OLED with gray Joy-Con and travel case",
    category: "Games & Toys",
    brand: "Nintendo",
    price: 31800,
    condition: "Good",
    seller: "Yuna",
    rating: 4.9,
    city: "Tokyo",
    age: "3 min",
    image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?auto=format&fit=crop&w=900&q=80",
    tags: ["verified", "freeShipping", "new"],
    likes: 84,
  },
  {
    id: 2,
    title: "Minimal black shoulder bag with silver hardware",
    category: "Womenswear",
    brand: "Uniqlo",
    price: 2400,
    condition: "Like new",
    seller: "Mika",
    rating: 5,
    city: "Yokohama",
    age: "12 min",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
    tags: ["verified", "new"],
    likes: 31,
  },
  {
    id: 3,
    title: "Set of 14 trading cards in protective sleeves",
    category: "Collectibles",
    brand: "Pokemon",
    price: 300,
    condition: "Used",
    seller: "Kei",
    rating: 4.8,
    city: "Osaka",
    age: "20 min",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=900&q=80",
    tags: ["deal", "freeShipping", "new"],
    likes: 119,
  },
  {
    id: 4,
    title: "Clean white running shoes, lightweight training pair",
    category: "Menswear",
    brand: "Nike",
    price: 6200,
    condition: "Good",
    seller: "Haru",
    rating: 4.7,
    city: "Saitama",
    age: "34 min",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    tags: ["freeShipping"],
    likes: 46,
  },
  {
    id: 5,
    title: "iPhone 14 silicone case, lavender, barely used",
    category: "Electronics",
    brand: "Apple",
    price: 1800,
    condition: "Like new",
    seller: "Aya",
    rating: 5,
    city: "Nagoya",
    age: "41 min",
    image: "https://images.unsplash.com/photo-1603313011107-4f2cdfbdd967?auto=format&fit=crop&w=900&q=80",
    tags: ["verified"],
    likes: 22,
  },
  {
    id: 6,
    title: "Four-volume manga bundle with original covers",
    category: "Books & Manga",
    brand: "Shueisha",
    price: 1200,
    condition: "Good",
    seller: "Ren",
    rating: 4.9,
    city: "Kyoto",
    age: "1 hr",
    image: "https://images.unsplash.com/photo-1610613660607-1e7d8bbc2a6c?auto=format&fit=crop&w=900&q=80",
    tags: ["deal"],
    likes: 58,
  },
  {
    id: 7,
    title: "Compact espresso maker for small kitchen counters",
    category: "Home",
    brand: "DeLonghi",
    price: 9800,
    condition: "Used",
    seller: "Sora",
    rating: 4.6,
    city: "Kobe",
    age: "2 hr",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    tags: ["verified"],
    likes: 77,
  },
  {
    id: 8,
    title: "Baby knit cardigan, soft cotton, 90 cm",
    category: "Kids",
    brand: "Muji",
    price: 900,
    condition: "Good",
    seller: "Nana",
    rating: 4.9,
    city: "Fukuoka",
    age: "2 hr",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80",
    tags: ["deal", "freeShipping"],
    likes: 25,
  },
  {
    id: 9,
    title: "Sony wireless headphones with charging cable",
    category: "Electronics",
    brand: "Sony",
    price: 7400,
    condition: "Good",
    seller: "Daichi",
    rating: 4.8,
    city: "Chiba",
    age: "4 hr",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    tags: ["verified", "freeShipping"],
    likes: 96,
  },
  {
    id: 10,
    title: "Rare character figure with display stand",
    category: "Games & Toys",
    brand: "Bandai",
    price: 300,
    condition: "Used",
    seller: "Tomo",
    rating: 4.7,
    city: "Tokyo",
    age: "6 hr",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=900&q=80",
    tags: ["deal", "new"],
    likes: 141,
  },
  {
    id: 11,
    title: "Red lipstick and blush set, unopened",
    category: "Beauty",
    brand: "Shiseido",
    price: 2600,
    condition: "Like new",
    seller: "Rina",
    rating: 5,
    city: "Sendai",
    age: "8 hr",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    tags: ["verified", "freeShipping"],
    likes: 39,
  },
  {
    id: 12,
    title: "Selvedge denim jacket, relaxed fit",
    category: "Menswear",
    brand: "Levi's",
    price: 11800,
    condition: "Good",
    seller: "Kaito",
    rating: 4.8,
    city: "Nara",
    age: "1 day",
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=900&q=80",
    tags: ["verified"],
    likes: 64,
  },
];

let listings = [...products];
let activeCategory = "all";
let activeRail = "all";
let activeBrand = "all";
const liked = new Set();

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

const elements = {
  categoryStrip: document.querySelector("#categoryStrip"),
  categorySelect: document.querySelector("#categorySelect"),
  conditionSelect: document.querySelector("#conditionSelect"),
  priceRange: document.querySelector("#priceRange"),
  priceValue: document.querySelector("#priceValue"),
  brandCloud: document.querySelector("#brandCloud"),
  listingGrid: document.querySelector("#listingGrid"),
  emptyState: document.querySelector("#emptyState"),
  sortSelect: document.querySelector("#sortSelect"),
  searchInput: document.querySelector("#searchInput"),
  searchForm: document.querySelector("#searchForm"),
  resultsTitle: document.querySelector("#resultsTitle"),
  itemModal: document.querySelector("#itemModal"),
  itemDetails: document.querySelector("#itemDetails"),
  sellModal: document.querySelector("#sellModal"),
  sellForm: document.querySelector("#sellForm"),
  toast: document.querySelector("#toast"),
};

function init() {
  renderCategories();
  renderBrands();
  renderListings();
  bindEvents();
}

function renderCategories() {
  const tabs = ["All", ...categories]
    .map((category) => {
      const value = category === "All" ? "all" : category;
      return `<button class="category-tab ${value === activeCategory ? "active" : ""}" data-category="${value}">${category}</button>`;
    })
    .join("");

  elements.categoryStrip.innerHTML = tabs;
  elements.categorySelect.innerHTML += categories.map((category) => `<option value="${category}">${category}</option>`).join("");
  elements.sellForm.category.innerHTML = categories.map((category) => `<option>${category}</option>`).join("");
}

function renderBrands() {
  const brands = ["all", ...new Set(listings.map((item) => item.brand))];
  elements.brandCloud.innerHTML = brands
    .map((brand) => {
      const label = brand === "all" ? "All" : brand;
      return `<button class="brand-pill ${brand === activeBrand ? "active" : ""}" data-brand="${brand}">${label}</button>`;
    })
    .join("");
}

function getFilteredListings() {
  const query = elements.searchInput.value.trim().toLowerCase();
  const maxPrice = Number(elements.priceRange.value);
  const condition = elements.conditionSelect.value;

  let filtered = listings.filter((item) => {
    const matchesQuery = [item.title, item.category, item.brand, item.seller].join(" ").toLowerCase().includes(query);
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesRail = activeRail === "all" || item.tags.includes(activeRail);
    const matchesBrand = activeBrand === "all" || item.brand === activeBrand;
    const matchesCondition = condition === "all" || item.condition === condition;
    return matchesQuery && matchesCategory && matchesRail && matchesBrand && matchesCondition && item.price <= maxPrice;
  });

  if (elements.sortSelect.value === "low") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  } else if (elements.sortSelect.value === "high") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  } else if (elements.sortSelect.value === "newest") {
    filtered = filtered.sort((a, b) => b.id - a.id);
  } else {
    filtered = filtered.sort((a, b) => b.likes - a.likes);
  }

  return filtered;
}

function renderListings() {
  const filtered = getFilteredListings();
  const title = activeRail === "all" ? "Recommended for you" : document.querySelector(`.rail[data-filter="${activeRail}"]`).textContent;
  elements.resultsTitle.textContent = title;
  elements.priceValue.textContent = `Up to ${yen.format(Number(elements.priceRange.value))}`;
  elements.emptyState.hidden = filtered.length > 0;

  elements.listingGrid.innerHTML = filtered
    .map(
      (item) => `
        <article class="listing-card">
          <button class="image-button" data-open="${item.id}" aria-label="Open ${escapeHtml(item.title)}">
            <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" />
            ${item.tags.includes("deal") ? '<span class="badge">¥300 start</span>' : ""}
            <span class="price-tag">${yen.format(item.price)}</span>
          </button>
          <div class="card-body">
            <p class="card-title">${escapeHtml(item.title)}</p>
            <div class="card-meta">
              <span>${item.condition}</span>
              <span>${item.age}</span>
            </div>
            <div class="card-actions">
              <button class="mini-button ${liked.has(item.id) ? "liked" : ""}" data-like="${item.id}">
                ${liked.has(item.id) ? "Saved" : "Save"} · ${item.likes + (liked.has(item.id) ? 1 : 0)}
              </button>
              <button class="mini-button" data-open="${item.id}">Details</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function bindEvents() {
  elements.categoryStrip.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    elements.categorySelect.value = activeCategory;
    document.querySelectorAll(".category-tab").forEach((tab) => tab.classList.toggle("active", tab === button));
    renderListings();
  });

  document.querySelector(".quick-rails").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeRail = button.dataset.filter;
    document.querySelectorAll(".rail").forEach((rail) => rail.classList.toggle("active", rail === button));
    renderListings();
  });

  elements.brandCloud.addEventListener("click", (event) => {
    const button = event.target.closest("[data-brand]");
    if (!button) return;
    activeBrand = button.dataset.brand;
    document.querySelectorAll(".brand-pill").forEach((pill) => pill.classList.toggle("active", pill === button));
    renderListings();
  });

  elements.listingGrid.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open]");
    const likeButton = event.target.closest("[data-like]");
    if (openButton) openItem(Number(openButton.dataset.open));
    if (likeButton) toggleLike(Number(likeButton.dataset.like));
  });

  elements.searchForm.addEventListener("submit", (event) => event.preventDefault());
  elements.searchInput.addEventListener("input", renderListings);
  elements.categorySelect.addEventListener("change", (event) => {
    activeCategory = event.target.value;
    document.querySelectorAll(".category-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.category === activeCategory));
    renderListings();
  });
  elements.conditionSelect.addEventListener("change", renderListings);
  elements.priceRange.addEventListener("input", renderListings);
  elements.sortSelect.addEventListener("change", renderListings);

  document.querySelector("#openSell").addEventListener("click", openSellForm);
  document.querySelector("#openSellMobile").addEventListener("click", openSellForm);
  document.querySelector("#closeSell").addEventListener("click", () => elements.sellModal.close());
  document.querySelector("#closeItem").addEventListener("click", () => elements.itemModal.close());

  elements.sellForm.addEventListener("submit", publishListing);

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => showToast(`${button.textContent.trim()} is ready for your next workflow.`));
  });
}

function openItem(id) {
  const item = listings.find((listing) => listing.id === id);
  if (!item) return;

  elements.itemDetails.innerHTML = `
    <div class="item-detail">
      <img src="${item.image}" alt="${escapeHtml(item.title)}" />
      <div class="detail-copy">
        <p class="eyebrow">${item.category}</p>
        <h2>${escapeHtml(item.title)}</h2>
        <p class="detail-price">${yen.format(item.price)}</p>
        <p>${item.condition} condition from ${item.city}. Seller usually ships within two days and accepts protected checkout.</p>
        <ul class="trust-list">
          <li><span>Seller</span><strong>${item.seller}</strong></li>
          <li><span>Rating</span><strong>${item.rating.toFixed(1)} / 5</strong></li>
          <li><span>Brand</span><strong>${item.brand}</strong></li>
          <li><span>Shipping</span><strong>${item.tags.includes("freeShipping") ? "Free" : "Buyer paid"}</strong></li>
        </ul>
        <div class="detail-actions">
          <button class="sell-button" onclick="showToast('Protected checkout preview opened.')">Buy now</button>
          <button class="ghost-button" onclick="showToast('Offer sent to ${item.seller}.')">Make offer</button>
        </div>
      </div>
    </div>
  `;

  elements.itemModal.showModal();
}

function toggleLike(id) {
  if (liked.has(id)) {
    liked.delete(id);
    showToast("Removed from watchlist.");
  } else {
    liked.add(id);
    showToast("Saved to watchlist.");
  }
  renderListings();
}

function openSellForm() {
  elements.sellForm.reset();
  elements.sellModal.showModal();
}

function publishListing(event) {
  event.preventDefault();
  const data = new FormData(elements.sellForm);
  const title = data.get("title").toString().trim();
  const price = Number(data.get("price"));
  const image = data.get("image").toString().trim() || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80";

  listings = [
    {
      id: Date.now(),
      title,
      category: data.get("category"),
      brand: "Your closet",
      price,
      condition: data.get("condition"),
      seller: "You",
      rating: 5,
      city: "Local",
      age: "now",
      image,
      tags: ["new", "verified"],
      likes: 0,
    },
    ...listings,
  ];

  activeRail = "all";
  activeCategory = "all";
  activeBrand = "all";
  document.querySelectorAll(".rail").forEach((rail) => rail.classList.toggle("active", rail.dataset.filter === "all"));
  document.querySelectorAll(".category-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.category === "all"));
  elements.categorySelect.value = "all";
  renderBrands();
  renderListings();
  elements.sellModal.close();
  showToast("Your listing is live.");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => elements.toast.classList.remove("show"), 2400);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}

init();
