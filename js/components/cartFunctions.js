const CART_KEY = "cartProducts";

export function getExistingProduct() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addProductToCart(product) {
  const cart = getExistingProduct();

  if (cart.find((cartProduct) => product.id === cartProduct.id)) {
    throw new Error("Item already in the cart");
  }

  cart.push(product);
  saveCart(cart);
}

export function setProductQuantity(productId, quantity) {
  const cart = getExistingProduct();

  const product = cart.find((cartProduct) => productId == cartProduct.id);

  if (!product) throw new Error("Product do not exists in the cart");
  if (isNaN(quantity) || quantity <= 0) quantity = 1;
  product.quantity = quantity;

  saveCart(cart);
}

export function removeProductFromCart(productId) {
  const cartItems = getExistingProduct();
  const newCartItems = cartItems.filter((product) => product.id != productId);
  saveCart(newCartItems);
}

export function getProductById(productId) {
  return getExistingProduct().find((product) => {
    return product.id === productId;
  });
}
