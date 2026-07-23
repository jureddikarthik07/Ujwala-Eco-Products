/* ==========================================================
   SCROLL REVEAL ANIMATION
   Goal: elements with the class "reveal" start off invisible
   (see the CSS), and fade/slide into view as the user scrolls
   down and they enter the screen.
   ========================================================== */

// 1. Grab every element on the page that has the "reveal" class
const revealEls = document.querySelectorAll(".reveal");

// 2. Create an "IntersectionObserver" — a built-in browser tool
//    that watches elements and tells us when they scroll into
//    (or out of) the visible part of the screen.
const observer = new IntersectionObserver(
  (entries) => {
    // "entries" is a list of all the elements being watched,
    // each with info about whether it's currently visible.
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // isIntersecting = true means this element has scrolled
        // into view. Adding the "in" class triggers the CSS
        // transition that fades it in and slides it up.
        entry.target.classList.add("in");
      }
    });
  },
  {
    threshold: 0.15, // trigger once 15% of the element is visible on screen
  },
);

// 3. Tell the observer to start watching each "reveal" element
revealEls.forEach((el) => observer.observe(el));

/* ==========================================================
   AJAX FORM SUBMISSION (NO REDIRECT)
   ========================================================== */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Stop the page from redirecting to Formspree

    const data = new FormData(contactForm);

    // Show a loading/sending state
    formStatus.className = "mt-3 p-3 rounded text-center bg-light text-muted";
    formStatus.textContent = "Sending your inquiry...";
    formStatus.classList.remove("d-none");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Success Styling (Green text box)
        formStatus.className =
          "mt-3 p-3 rounded text-center bg-success-subtle text-success-emphasis border border-success-subtle";
        formStatus.textContent =
          "Thank you! Your message has been sent successfully.";
        contactForm.reset(); // Clear out the form inputs for the user
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }
    } catch (error) {
      // Error Styling (Red text box)
      formStatus.className =
        "mt-3 p-3 rounded text-center bg-danger-subtle text-danger-emphasis border border-danger-subtle";
      formStatus.textContent =
        "Oops! There was a problem submitting your form. Please try again.";
    }
  });
}

/* ==========================================================
   COLOR SWATCH SELECTION & DYNAMIC HOVER SWAP

   IMPORTANT: product.js injects the product cards AFTER this
   script has already run once (it fetches from the API, which
   takes time). So this logic is wrapped in a function that runs
   once now (in case any cards are already in the DOM) AND is
   re-run by product.js every time it finishes rendering cards,
   via window.wireUpProductCards(). A "data-wired" flag stops the
   same card from getting duplicate listeners on re-runs.
   ========================================================== */
function wireUpColorSwatches() {
  document.querySelectorAll(".color-swatches").forEach((group) => {
    if (group.dataset.wired === "true") return; // already wired, skip
    group.dataset.wired = "true";

    const productCard = group.closest(".product-card");
    if (!productCard) return;

    const mainImage = productCard.querySelector(".main-product-img");

    // 1. Handle clicking the color swatches
    group.querySelectorAll(".swatch").forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const newImageSrc = swatch.getAttribute("data-image");

        if (mainImage && newImageSrc) {
          mainImage.src = newImageSrc;
        }

        // Toggle active states
        group.querySelectorAll(".swatch").forEach((s) => {
          s.classList.remove("active");
          s.setAttribute("aria-pressed", "false");
        });
        swatch.classList.add("active");
        swatch.setAttribute("aria-pressed", "true");
      });
    });

    // 2. Handle hovering strictly on the image area
    const imageContainer = productCard.querySelector(".product-image-swap");
    if (imageContainer && mainImage) {
      // When mouse enters the image area
      imageContainer.addEventListener("mouseenter", () => {
        const activeSwatch = group.querySelector(".swatch.active");
        const hoverImageSrc = activeSwatch
          ? activeSwatch.getAttribute("data-hover")
          : null;

        if (hoverImageSrc) {
          mainImage.src = hoverImageSrc;
        }
      });

      // When mouse leaves the image area
      imageContainer.addEventListener("mouseleave", () => {
        const activeSwatch = group.querySelector(".swatch.active");
        const defaultImageSrc = activeSwatch
          ? activeSwatch.getAttribute("data-image")
          : null;

        if (defaultImageSrc) {
          mainImage.src = defaultImageSrc;
        }
      });
    }
  });
}

wireUpColorSwatches();

/* ==========================================================
   LANGUAGE SWITCHER
   Goal: swap all the page text between English, Hindi, and
   Telugu using the dictionary in translations.js — no page
   reload, no external translation service.
   ========================================================== */

function applyLanguage(lang) {
  // Fall back to English if an unknown language code sneaks in
  const dict = translations[lang] || translations.en;

  // Update normal text/HTML content
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] === undefined) return; // skip if no translation exists for this key

    if (el.hasAttribute("data-i18n-html")) {
      el.innerHTML = dict[key];
    } else {
      el.textContent = dict[key];
    }
  });

  // Update form placeholders separately, since placeholder
  // isn't part of an element's visible text content
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  // Update the <html lang="..."> attribute to match (good for
  // accessibility and screen readers)
  document.documentElement.lang = lang;

  // Remember the choice so it's still selected next time this
  // visitor comes back to the site
  localStorage.setItem("siteLanguage", lang);
}

// Wire up the dropdown in the navbar
const langSelect = document.getElementById("langSelect");

if (langSelect) {
  // On page load: use the visitor's previously saved language,
  // or default to English if they've never picked one
  const savedLang = localStorage.getItem("siteLanguage") || "en";
  langSelect.value = savedLang;
  applyLanguage(savedLang);

  // Whenever the visitor picks a different option, re-run applyLanguage
  langSelect.addEventListener("change", (e) => {
    applyLanguage(e.target.value);
  });
}

// PAYMENT //

/* ==========================================================
   DYNAMIC SHOPPING CART & LOCALSTORAGE SYSTEM
   ========================================================== */
let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("ujwalaCart")) || [];
} catch {
  cart = [];
} // Fetch existing cache item entries

const cartToggleBtn = document.getElementById("cartToggleBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsList = document.getElementById("cartItemsList");
const cartCount = document.getElementById("cartCount");
const cartTotalSum = document.getElementById("cartTotalSum");
const checkoutPayBtn = document.getElementById("checkoutPayBtn");

// Open/Close Sidebar Drawer View State
if (cartToggleBtn)
  cartToggleBtn.addEventListener("click", () =>
    cartDrawer.classList.toggle("open"),
  );
if (closeCartBtn)
  closeCartBtn.addEventListener("click", () =>
    cartDrawer.classList.remove("open"),
  );

// Locate this block in script.js and update it:
document.addEventListener("click", (e) => {
  // Use .closest() so it triggers even if clicking the inner text
  const targetBtn = e.target.closest(".add-to-cart-btn");

  if (targetBtn) {
    const id = targetBtn.dataset.id;
    const name = targetBtn.dataset.name;
    const price = Number(targetBtn.dataset.price);

    const productCard = targetBtn.closest(".product-card");
    if (!productCard) return;

    const activeSwatch = productCard.querySelector(".swatch.active");

    if (!activeSwatch) {
      alert("Please select a color.");
      return;
    }

    const image = activeSwatch.dataset.image || "";
    const color = activeSwatch.dataset.color || "Default";

    addToCart(id, name, price, image, color);
    showToast(`✔ ${name} added to cart`);

    // Optional: Open the cart drawer automatically when an item is added so you can see it!
    if (cartDrawer) {
      cartDrawer.classList.add("open");
    }
  }
});

// Add Item Element Function Block
function addToCart(id, name, price, image, color) {
  const existingItem = cart.find(
    (item) => item.id === id && item.color === color,
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id,
      name,
      color,
      image,
      price,
      quantity: 1,
    });
  }

  updateCartUI();
}

// Remove Single Item completely
window.removeItemFromCart = function (id, color) {
  cart = cart.filter((item) => !(item.id === id && item.color === color));
  updateCartUI();
};

// Update Totals and Render DOM Layout
function updateCartUI() {
  if (!cartItemsList || !cartTotalSum) return;
  localStorage.setItem("ujwalaCart", JSON.stringify(cart)); // Update Local Browser Cache Data

  // Update badge numerical element count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalItems;

  // Render Itemized Rows
  if (cart.length === 0) {
    cartItemsList.innerHTML = `<p class="text-muted text-center py-4">Your cart is currently empty.</p>`;
    cartTotalSum.textContent = "₹0.00";
    return;
  }

  let totalSum = 0;
  cartItemsList.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.quantity; //
      totalSum += itemTotal;
      return `
<div class="d-flex mb-3 border-bottom pb-3 align-items-center">

    <img src="${item.image}"
         width="70"
         height="70"
         style="object-fit:cover;border-radius:10px;">

    <div class="ms-3 flex-grow-1">
        <h6 class="mb-1">${item.name}</h6>

          <small class="text-muted">
            Color: ${item.color}
          </small>

        <br>

        <small class="text-muted">
          ₹${item.price}
        </small>

        <br>

        <small>
       Qty : ${item.quantity}
       </small>

    </div>

    <div class="text-end">

        <strong>₹${itemTotal}</strong>

        <br>

    <button
    onclick="removeItemFromCart('${item.id}','${item.color}')"
    class="btn btn-sm btn-outline-danger mt-2">
    Remove
    </button>

    </div>

</div>
`;
    })
    .join("");

  cartTotalSum.textContent = `₹${totalSum.toFixed(2)}`;
}

// Initial boot calculation run on reload
updateCartUI();

if (checkoutPayBtn) {
  checkoutPayBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    window.location.href = "cart.html";
  });
}

// SEARCH BAR

const searchInput = document.getElementById("searchProduct");
const filterBtns = document.querySelectorAll(".filter-btn");
const noResultsMsg = document.getElementById("noResultsMsg");

let activeCategory = "all";

function applyProductFilter() {
  // Queried fresh every time (not cached) because product.js loads
  // cards asynchronously — a cached NodeList from page-load would
  // always be empty and make search/filter look broken.
  const productCards = document.querySelectorAll("#products .product-card");
  const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const category = (card.dataset.category || "all").toLowerCase();
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";

    const matchesCategory =
      activeCategory === "all" || category === activeCategory.toLowerCase();
    const matchesSearch = query === "" || title.includes(query);

    const wrapper = card.closest(".col-md-6") || card;

    if (matchesCategory && matchesSearch) {
      wrapper.style.display = "";
      visibleCount++;
    } else {
      wrapper.style.display = "none";
    }
  });

  if (noResultsMsg) {
    noResultsMsg.classList.toggle("d-none", visibleCount !== 0);
  }
}

if (searchInput) {
  searchInput.addEventListener("input", applyProductFilter);
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.filter;
    applyProductFilter();
  });
});

// TOAST Notification

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/* ==========================================================
   PRODUCT QUICK VIEW
   Same re-runnable pattern as the swatches above — the button is
   only appended to cards that don't already have one.
   ========================================================== */
function wireUpQuickViewButtons() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const icon = card.querySelector(".product-icon");
    if (!icon || icon.querySelector(".quick-view-btn")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quick-view-btn";
    btn.textContent = "👁 Quick View";
    icon.appendChild(btn);

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openQuickView(card);
    });
  });
}

wireUpQuickViewButtons();

// Called by product.js after it finishes rendering cards fetched
// from the API, so swatches / hover-swap / quick view all work on
// cards that didn't exist yet when this file first ran.
window.wireUpProductCards = function () {
  wireUpColorSwatches();
  wireUpQuickViewButtons();
};

const quickViewModal = new bootstrap.Modal(
  document.getElementById("quickViewModal"),
);

document.getElementById("qvCloseBtn").addEventListener("click", () => {
  quickViewModal.hide();
});

function openQuickView(card) {
  const mainImage = card.querySelector(".main-product-img");
  const title = card.querySelector("h3")?.textContent.trim() || "";
  const label = card.querySelector(".mono")?.textContent.trim() || "";
  const desc = card.querySelector(".small")?.textContent.trim() || "";
  const priceTag = card.querySelector(".price-tag")?.textContent.trim() || "";
  const addBtn = card.querySelector(".add-to-cart-btn");
  const swatchGroup = card.querySelector(".color-swatches");

  document.getElementById("qvImage").src = mainImage ? mainImage.src : "";
  document.getElementById("qvTitle").textContent = title;
  document.getElementById("qvLabel").textContent = label;
  document.getElementById("qvDesc").textContent = desc;
  document.getElementById("qvPrice").textContent = priceTag;

  const qvSwatches = document.getElementById("qvSwatches");
  qvSwatches.innerHTML = "";
  let activeColor = null;
  let activeImage = null;

  if (swatchGroup) {
    swatchGroup.querySelectorAll(".swatch").forEach((swatch) => {
      const clone = swatch.cloneNode(true);
      qvSwatches.appendChild(clone);

      if (clone.classList.contains("active")) {
        activeColor = clone.dataset.color;
        activeImage = clone.dataset.image;
      }

      clone.addEventListener("click", () => {
        qvSwatches
          .querySelectorAll(".swatch")
          .forEach((s) => s.classList.remove("active"));
        clone.classList.add("active");
        document.getElementById("qvImage").src = clone.dataset.image;
        activeColor = clone.dataset.color;
        activeImage = clone.dataset.image;
      });
    });
  }

  const qvAddToCart = document.getElementById("qvAddToCart");
  const newAddBtn = qvAddToCart.cloneNode(true);
  qvAddToCart.parentNode.replaceChild(newAddBtn, qvAddToCart);

  newAddBtn.addEventListener("click", () => {
    if (!addBtn) return;
    const id = addBtn.dataset.id;
    const name = addBtn.dataset.name;
    const price = Number(addBtn.dataset.price);
    addToCart(
      id,
      name,
      price,
      activeImage || addBtn.dataset.image,
      activeColor || "Default",
    );
    showToast(`✔ ${name} added to cart`);
    quickViewModal.hide();
  });

  quickViewModal.show();
}