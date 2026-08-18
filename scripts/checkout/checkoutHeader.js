import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let cartQuantity = calculateCartQuantity();

  let checkoutHeaderHTML = `
    <div>Checkout(${cartQuantity} items)</div>
  `;

  const checkoutHeader = document.querySelector('.js-checkout-header');

  if (checkoutHeader) {
    checkoutHeader.innerHTML = checkoutHeaderHTML;
  }
}