import { cart } from "../../data/cart-class.js";
import { getDeliveryOPtion } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency} from "../utils/money.js";

export function renderPaymentSummary(){
let cartQuantity = cart.calculateCartQuantity();

let productPriceCents=0;
let shippingPriceCents = 0;

 cart.cartItems.forEach((cartItem)=>{
  let product = getProduct(cartItem.productId);
  productPriceCents += product.priceCents * cartItem.quantity;

   let deliveryOption = getDeliveryOPtion(cartItem.deliveryOptionId);
   shippingPriceCents += deliveryOption.priceCents;
 });

 let totalBeforeTaxCents = productPriceCents + shippingPriceCents;
 let taxCents = totalBeforeTaxCents * 0.1;
 let totalCents = totalBeforeTaxCents + taxCents;

  let paymentSummaryHTML = `
    
      <div class="payment-summary-title">
      Order Summary
      </div>

      <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">
      $${formatCurrency(productPriceCents)}
      </div>
      </div>

      <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money  js-shipping-price">
      $${formatCurrency(shippingPriceCents)}
      </div>
      </div>

      <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalBeforeTaxCents)}
      </div>
      </div>

      <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      $${formatCurrency(taxCents)}
      </div>
      </div>

      <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalCents)}
      </div>
      </div>

      <button class="place-order-button button-primary js-place-order-button">
      Place your order
      </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

document.querySelectorAll('.js-place-order-button')