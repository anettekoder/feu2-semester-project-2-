import { homeUrl, baseUrl } from "./settings/api.js";

const featuredProducts = document.querySelector("#featured-products");

let image = "";
(async function () {
  try {
    const response = await fetch(homeUrl);
    const data = await response.json();

    const heroImage =
      "http://localhost:1337" + data.hero_banner.formats.large.url;

    const altTxt = data.hero_banner_alt_text;

    image = `
    <section class="hero"> 
   
    <div class="jumbotron hero-image" style="background: url('${heroImage}') center center no-repeat; height:300px;" alt="${altTxt}"></div>
    </section>`;

    document.querySelector(".container").innerHTML = image;
  } catch (error) {
    console.log(error);
  }
})();

export const displayProducts = (products) => {
  const htmlString = products.map((items) => {
    return `
           <div class="col-12 col-md-6 col-lg-3 >
       <div class="card">
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
           <a href="details.html?id=${items.id}"> <button class="btn btn-primary btn-sm cart-button">View more</button></a>
              
          </div>
        </div>
       </div>

        `;
  });

  featuredProducts.innerHTML = htmlString.join("");
};

// Featured products

async function loadFeatured() {
  const response = await fetch(baseUrl);
  const products = await response.json();
  const featured = products.filter((product) => product.featured == true);
  displayProducts(featured);
}

loadFeatured();
