// Change this to match the same value in cart.js — keeping both in sync
// means the amount shown on the cart page matches what's charged here.
const SHIPPING_COST = 0;

// Load cart from localStorage
let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("ujwalaCart")) || [];
} catch (e) {
  cart = [];
}

const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutShippingCostEl = document.getElementById("checkoutShippingCost");
const placeOrderBtn = document.getElementById("placeOrderBtn");

function renderCheckout() {
  if (!checkoutItems) return;

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
            <p class="text-center text-muted">
                Your cart is empty.
            </p>
        `;

    checkoutSubtotal.textContent = "₹0";
    checkoutTotal.textContent = "₹0";

    return;
  }

  let total = 0;

  checkoutItems.innerHTML = "";

  cart.forEach((item) => {
    const amount = item.price * item.quantity;
    total += amount;

    checkoutItems.innerHTML += `

        <div class="cart-product">

            <img
                src="${item.image}"
                class="cart-product-img"
                alt="${item.name}">

            <div class="cart-product-info">

                <h6>${item.name}</h6>

                <small>
                    Color :
                    <strong>${item.color}</strong>
                </small>

                <br>

                <small>
                    Qty :
                    ${item.quantity}
                </small>

            </div>

            <div class="cart-product-price">

                ₹${amount}

            </div>

        </div>

        `;
  });

  checkoutSubtotal.textContent = `₹${total}`;

  if (checkoutShippingCostEl) {
    checkoutShippingCostEl.textContent =
      SHIPPING_COST === 0 ? "FREE" : `₹${SHIPPING_COST}`;
  }

  checkoutTotal.textContent = `₹${total + SHIPPING_COST}`;
}

renderCheckout();

placeOrderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const city = document.getElementById("customerCity").value.trim();
  const state = document.getElementById("customerState").value.trim();
  const pin = document.getElementById("customerPin").value.trim();

  if (!name || !phone || !address || !city || !state || !pin) {
    alert("Please fill all required fields.");
    return;
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Please enter a valid name.");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (email !== "" && !/^\S+@\S+\.\S+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!/^\d{6}$/.test(pin)) {
    alert("Please enter a valid 6-digit PIN code.");
    return;
  }

  placeOrder();
});

function placeOrder() {
  let total = 0;

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const city = document.getElementById("customerCity").value.trim();
  const state = document.getElementById("customerState").value.trim();
  const pin = document.getElementById("customerPin").value.trim();

  let message = `Hello Ujwala Eco Products!

I would like to place the following order.

=========================

CUSTOMER DETAILS

Name: ${name}

Phone: ${phone}

Email: ${email}

Address:
${address}

${city}, ${state}

PIN: ${pin}

=========================

ORDER DETAILS

`;

  cart.forEach((item) => {
    const amount = item.price * item.quantity;

    total += amount;

    message += `Product : ${item.name}

Color : ${item.color}

Quantity : ${item.quantity}

Price : ₹${item.price}

Amount : ₹${amount}

-----------------------

`;
  });

  message += `Shipping : ${SHIPPING_COST === 0 ? "FREE" : "₹" + SHIPPING_COST}

`;

  message += `Grand Total : ₹${total + SHIPPING_COST}`;

  window.open(
    `https://wa.me/919701347838?text=${encodeURIComponent(message)}`,
    "_blank",
  );

  localStorage.setItem(
    "lastOrder",
    JSON.stringify({
      customer: { name, phone, email, address, city, state, pin },
      items: cart,
      total: total + SHIPPING_COST,
      date: new Date().toLocaleString("en-IN"),
    }),
  );

  localStorage.removeItem("ujwalaCart");

  cart = [];

  setTimeout(() => {
    window.location.href = "order-success.html";
  }, 1500);
}