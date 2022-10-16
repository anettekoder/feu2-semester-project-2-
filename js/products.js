import { baseUrl } from "./settings/api.js";

const productContainer = document.getElementById("products-container");

let product = [];

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);
  const filteredProducts = product.filter((items) => {
    return items.title.toLowerCase().includes(searchString);
  });
  displayProducts(filteredProducts);
});

export const loadProduct = async () => {
  try {
    const res = await fetch(baseUrl);
    product = await res.json();
    displayProducts(product);
  } catch (error) {
    console.log(error);
  }
};

export const displayProducts = (products) => {
  const htmlString = products.map((items) => {
    return `
           <div class="col-12 col-md-6 col-lg-3 " >
       <div class="card" id="card">
          <div class="img-container">
            <a href="details.html?id=${items.id}">
            <img
              src="http://localhost:1337${items.image.formats.small.url}"
              alt="${items.image.alternativeText}"
              width="100%"
              height="400px"
              class="image card-img-top"/></a>
            </div>
         
          <div class="card-body text-center">
            <h3 class="card-title">${items.title}</h3>
            <h4 class="card-subtitle mb-2 text-muted">$ ${items.price}</h4>
            <a href="details.html?id=${items.id}" class="btn btn-outline-primary btn-lg view-button " role="button">Shop</a>              
          </div>
        </div>
       </div>

        `;
  });

  productContainer.innerHTML = htmlString.join("");
};

loadProduct();
