/* ==========================================================
   PRODUCT LOADER
   Fetches products from the backend and renders cards that
   match what script.js and style.css expect:
   - .product-icon > .product-image-swap > img.product-img.main-product-img
   - .color-swatches > .swatch (with data-image / data-hover / data-color)
   - .price-tag, .small (description), .add-to-cart-btn
   - data-category on the card itself (used by the search/filter bar)
   ========================================================== */

// Use localhost only while you're developing on your own machine.
// Once the SITE is live (e.g. on GitHub Pages), visitors' browsers
// can't reach "localhost:5000" — that only exists on YOUR laptop.
// You must deploy the backend somewhere public (Render, Railway,
// Fly.io, Cyclic, etc.) and put that URL below instead.
const DEPLOYED_API_URL = "https://ujwala-eco-products.onrender.com/api/products";

const API_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000/api/products"
    : DEPLOYED_API_URL;

// Best-guess mapping from category -> asset folder, used ONLY as a
// fallback for older records that just stored a bare filename.
// Going forward, store the image1/image2 fields as a path relative
// to /assets, e.g. "market-bag/blue-market-bag-1.png" — then this
// mapping isn't needed at all and nothing can go out of sync.
const CATEGORY_FOLDER_FALLBACK = {
  pouch: "pencil-pouch",
  bottle: "bottle-carrybag",
  gift: "Gift-carrybags",
  shopping: "market-bag",
};

const PLACEHOLDER_IMAGE = "./assets/test img.png";

function resolveImagePath(category, filename) {
  if (!filename) return PLACEHOLDER_IMAGE;
  // Already a path (e.g. "market-bag/foo.png") -> use as-is.
  if (filename.includes("/")) return `./assets/${filename}`;
  // Bare filename -> guess the folder from category (case-insensitive,
  // since the database has categories stored as "Pouch", "Bottle", etc.
  // while this mapping's keys are lowercase).
  const normalizedCategory = (category || "").toLowerCase();
  const folder = CATEGORY_FOLDER_FALLBACK[normalizedCategory] || category;
  return `./assets/${folder}/${filename}`;
}

async function loadProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = `<p class="text-center text-muted py-5">Loading products...</p>`;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      container.innerHTML = `<p class="text-center text-muted py-5">No products available yet.</p>`;
      return;
    }

    displayProducts(data.products);
  } catch (error) {
    console.error("Failed to load products:", error);
    container.innerHTML = `
      <div class="text-center py-5">
        <p class="text-muted mb-1">Couldn't load products right now.</p>
        <p class="text-muted small">${
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "Make sure your backend server is running on port 5000."
            : "The backend may not be deployed/reachable yet."
        }</p>
      </div>`;
  }
}

function displayProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach((product) => {
    const colors = product.colors && product.colors.length ? product.colors : [];
    const firstColor = colors[0] || {};
    const defaultImage = resolveImagePath(product.category, firstColor.image1);

    const swatchesHtml = colors
      .map((color, index) => {
        const isActive = index === 0;
        const defaultImg = resolveImagePath(product.category, color.image1);
        const hoverImg = resolveImagePath(product.category, color.image2);
        return `
          <button
            type="button"
            class="swatch${isActive ? " active" : ""}"
            style="--swatch-color:${color.hexCode || "#ccc"};"
            data-image="${defaultImg}"
            data-hover="${hoverImg}"
            data-color="${color.name || "Default"}"
            aria-pressed="${isActive ? "true" : "false"}"
            aria-label="${color.name || "Color option"}">
          </button>`;
      })
      .join("");

    const card = `
      <div class="col-md-6 col-lg-4 reveal">
        <div class="product-card p-4" data-category="${(product.category || "").toLowerCase()}">

          <div class="product-icon">
            <span class="product-image-swap">
              <img
                src="${defaultImage}"
                class="product-img main-product-img"
                alt="${product.name || ""}"
                onerror="this.src='${PLACEHOLDER_IMAGE}'">
            </span>
          </div>

          <span class="mono d-block mb-2">${product.category || ""}</span>
          <h3 class="h5">${product.name || ""}</h3>
          <p class="small">${product.description || ""}</p>

          <div class="color-swatches mb-3">
            ${swatchesHtml}
          </div>

          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="price-tag">₹${product.price}</span>
          </div>

          <button
            class="btn btn-sm btn-gold add-to-cart-btn w-100"
            data-id="${product._id}"
            data-name="${product.name || ""}"
            data-price="${product.price}"
            data-image="${defaultImage}">
            Add To Cart
          </button>

        </div>
      </div>
    `;

    container.innerHTML += card;
  });

  // Re-run the quick view / hover-swap wiring in script.js now that
  // new cards exist in the DOM (it only wires up elements that exist
  // at the time it runs, so cards added by this fetch need re-wiring).
  if (typeof window.wireUpProductCards === "function") {
    window.wireUpProductCards();
  }
}

loadProducts();