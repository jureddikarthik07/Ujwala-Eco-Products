console.log("cart.js loaded");

// Get cart from localStorage
let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("ujwalaCart")) || [];
} catch (e) {
  cart = [];
}
console.log(cart);

// HTML Elements
const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const grandTotal = document.getElementById("grandTotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

// Initial Render
renderCart();

function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="text-center py-5">
                <h3>Your cart is empty</h3>
            </div>
        `;

    subtotal.textContent = "₹0";
    grandTotal.textContent = "₹0";
    return;
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
        <div class="cart-card">

            <div class="row align-items-center">

                <div class="col-md-3 text-center">
                    <img src="${item.image}" class="cart-img">
                </div>

                <div class="col-md-6">

                    <div class="product-title">
                        ${item.name}
                    </div>
                        <div class="text-muted small">
                        Color: ${item.color}
                    </div>

                    <div class="product-price mt-2">
                        ₹${item.price}
                    </div>

                    <div class="mt-4 d-flex align-items-center gap-3">

                        <button
                          class="qty-btn decrease-btn"
                             data-id="${item.id}"
                             data-color="${item.color}"> −
                        </button>

                        <div class="qty-number">
                           ${item.quantity}
                        </div>

                        <button
                            class="qty-btn increase-btn"
                            data-id="${item.id}"
                            data-color="${item.color}"> +
                        </button>

                    </div>

                </div>

                <div class="col-md-3 text-end">

                    <h4>
                        ₹${item.price * item.quantity}
                    </h4>

                    <div
                       class="remove-btn mt-3"
                       data-id="${item.id}"
                       data-color="${item.color}">
                       🗑 Remove
                    </div>

                </div>

            </div>

        </div>
        `;
  });

  subtotal.textContent = `₹${total}`;
  grandTotal.textContent = `₹${total}`;
}

function saveCart() {
  localStorage.setItem("ujwalaCart", JSON.stringify(cart));
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("increase-btn")) {
    const id = e.target.dataset.id;
    const color = e.target.dataset.color;
    increaseQuantity(id, color);
  }

  if (e.target.classList.contains("decrease-btn")) {
    const id = e.target.dataset.id;
    const color = e.target.dataset.color;
    decreaseQuantity(id, color);
  }

  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.dataset.id;
    const color = e.target.dataset.color;
    removeItem(id, color);
  }
});

function increaseQuantity(id, color) {
  const product = cart.find((item) => item.id === id && item.color === color);

  if (!product) return;

  product.quantity++;

  saveCart();

  renderCart();
}

function decreaseQuantity(id, color) {
  const product = cart.find((item) => item.id === id && item.color === color);

  if (!product) return;

  product.quantity--;

  if (product.quantity <= 0) {
    cart = cart.filter((item) => !(item.id === id && item.color === color));
  }

  saveCart();

  renderCart();
}

function removeItem(id, color) {
  cart = cart.filter((item) => !(item.id === id && item.color === color));

  saveCart();

  renderCart();
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function () {
    const confirmDelete = confirm("Are you sure you want to empty your cart?");

    if (!confirmDelete) return;

    cart = [];

    saveCart();

    renderCart();
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty.");

      return;
    }

    window.location.href = "checkout.html";
  });
}
