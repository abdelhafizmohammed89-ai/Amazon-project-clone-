import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
 let cartQuantity = calculateCartQuantity();
 let checkoutHeaderHTML=`
 <div>Checkout(${cartQuantity} items)</div>
 `;

 document.querySelector('.js-checkout-header').innerHTML=checkoutHeaderHTML;
}