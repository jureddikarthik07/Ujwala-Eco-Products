const API_URL = "http://localhost:5000/api/products";

async function loadProducts() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        displayProducts(data.products);

    }

    catch (error) {

        console.error(error);

    }

}

function displayProducts(products) {

    const container = document.getElementById("products-container");

    container.innerHTML = "";

    products.forEach(product => {

        const firstColor = product.colors[0];

        const card = `
        <div class="col-md-6 col-lg-4 reveal">

            <div class="product-card p-4">

                <div class="product-icon">

                    <img
                    src="./assets/pencil-pouch/${firstColor.image1}"
                    class="product-img main-product-img">

                </div>

                <span class="mono d-block mb-2">

                    ${product.category}

                </span>

                <h3 class="h5">

                    ${product.name}

                </h3>

                <p>

                    ${product.description}

                </p>

                <div class="mb-3">

                    ₹${product.price}

                </div>

                <button
                    class="btn btn-sm btn-gold">

                    Add To Cart

                </button>

            </div>

        </div>
        `;

        container.innerHTML += card;

    });

}

loadProducts();