import { cart} from "../../data/cart-class.js";

export function renderCheckoutHeader() {
  let cartQuantity = cart.calculateCartQuantity();

  let checkoutHeaderHTML = `
    <div>Checkout(${cartQuantity} items)</div>
  `;

  const checkoutHeader = document.querySelector('.js-checkout-header');

  if (checkoutHeader) {
    checkoutHeader.innerHTML = checkoutHeaderHTML;
  }
}