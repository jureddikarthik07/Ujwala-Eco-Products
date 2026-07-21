const order = JSON.parse(localStorage.getItem("lastOrder"));

const orderDetails = document.getElementById("orderDetails");

if (!order) {
  orderDetails.innerHTML = `
        <p>No recent order found.</p>
    `;
} else {
  let itemsHTML = "";

  order.items.forEach((item) => {
    itemsHTML += `

        <div class="order-item">

            <img src="${item.image}" class="order-img">

            <div>

                <strong>${item.name}</strong>

                <br>

                Color :
                ${item.color}

                <br>

                Quantity :
                ${item.quantity}

            </div>

            <div>

                ₹${item.price * item.quantity}

            </div>

        </div>

        `;
  });

  orderDetails.innerHTML = `

        <h4>Order Details</h4>

        <p>

            <strong>Customer :</strong>

            ${order.customer.name}

        </p>

        <p>

            <strong>Phone :</strong>

            ${order.customer.phone}

        </p>

        <p>

            <strong>Date :</strong>

            ${order.date}

        </p>

        <hr>

        ${itemsHTML}

        <hr>

        <h3>

            Total :

            ₹${order.total}

        </h3>

    `;
}
