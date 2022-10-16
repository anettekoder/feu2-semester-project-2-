import { baseUrl } from "./settings/api.js";
import { addProductToCart } from "./components/cartFunctions.js";

const detailContainer = document.querySelector("#detail-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const newUrl = baseUrl + id;

async function loadProducts() {
  try {
    const response = await fetch(newUrl);
    const product = await response.json();

    createHtml(product);
    const buyButton = document.querySelector(`[data-buy-${product.id}]`);

    buyButton.addEventListener("click", () =>
      addProductToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image.formats.small.url,
        quantity: 1,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

loadProducts();

function createHtml(details) {
  detailContainer.innerHTML = `
  <h1 class="card-title detail-title">${details.title}</h1>
  <div class="card"       
         <div class="img-container">
            <img
              src="http://localhost:1337${details.image.formats.small.url}"
              alt="${details.image.alternativeText}"
              width="100%"
              height="400px"
              class="image card-img-top"/>
            </div>
          <div class="card-body text-center">
            
            <p class="text-center">${details.description}</p>
            <h4 class="card-subtitle mb-2 text-muted">$ ${details.price}</h4>
            
            <button data-buy-${details.id} class="btn btn-outline-primary btn-sm cart-button" >
            <i class="fas fa-cart-plus mr2" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-image="${details.image.formats.small.url}"></i>
                 Add to Cart
              </button>
              
          </div>
        </div>`;
}
