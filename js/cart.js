import {
  getExistingProduct,
  removeProductFromCart,
  setProductQuantity,
} from "./components/cartFunctions.js";

// Container containing all cart items
const cartContainer = document.querySelector(".cart-container");
const totalPriceElement = document.querySelector(".cart-total-price");
// Cart items
let cartProducts = getExistingProduct();

if (cartProducts.length === 0) {
  cartContainer.innerHTML = "You`r cart is empty!!";
}

// Produce the DOM elements for products
export default cartProducts.forEach((product) => {
  cartContainer.innerHTML += `
      <div data-product-id="${product.id}" class="card rounded-3 mb-4 product-list-item">
                <div class="card-body p-4">
                  <div class="cart-items row d-flex justify-content-between align-items-center">
                     <div class="cart-row col-md-2 col-lg-2 col-xl-2">
                         <img
                          src="http://localhost:1337${product.image}"
                          class="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                          />
                     </div>
                     <div class="cart-row col-md-3 col-lg-3 col-xl-3">
                         <a href="details.html?id=${product.id}"><p class="lead fw-normal mb-2">${product.title}</p></a>
                         
                     </div>
                     <div class="cart-row col-md-3 col-lg-3 col-xl-2 d-flex">
                         <div class="cart-quantity">
                             <input class="cart-quantity-input" type="number" min=1 value="${product.quantity}" aria-label="Quantity" />
                         </div>
                     </div>
                     <div class="cart-row col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                         <h5 class="cart-price mb-0">$${product.price}</h5>
                     </div>
                     <div class="cart-row col-md-1 col-lg-1 col-xl-1 text-end">
                          <button class="text-danger remove-button"><i class="fas fa-trash fa-lg"></i></button>
                          
                    </div>
                  </div>
                </div>
              </div>

`;
});

/**
 * Calculates and updates the total price display of all the items in the cart.
 */
export function updateCartTotal() {
  cartProducts = getExistingProduct();
  let total = 0;
  for (const product of cartProducts) {
    total += product.price * product.quantity;
  }
  total = Math.round(total * 100) / 100;
  totalPriceElement.innerText = `$ ${total}`;
}

// Find all product list items, and make them into an array.
let productsDom = [...cartContainer.querySelectorAll(".product-list-item")];

// Iterate over the products and bind the events and setup handlers
for (const product of productsDom) {
  const productId = product.dataset.productId;

  const button = product.querySelector(".remove-button");
  const quantityInput = product.querySelector(".cart-quantity-input");

  // Handles quantity change and call for updating the calculations
  function handleQuantityChange(e) {
    const value = e.target?.value;
    if (value <= 0) e.target.value = 1;

    setProductQuantity(productId, value);

    updateCartTotal();
  }

  // Remove the product from the dom, with event listeners and
  // Calls for updating the calculations
  function handleRemoveProduct(e) {
    button.removeEventListener("click", handleRemoveProduct);
    quantityInput.removeEventListener("change", handleQuantityChange);

    product.remove();

    removeProductFromCart(productId);

    updateCartTotal();
  }

  button.addEventListener("click", handleRemoveProduct);
  quantityInput.addEventListener("change", handleQuantityChange);
}

updateCartTotal();
