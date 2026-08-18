import{cart, removeFromCart, calculateCartQuantity, updateCartQuantity} from '../../data/cart.js';
import{products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { updateQuantity } from '../../data/cart.js';
import{hello} from'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; 
import dayjs from'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOPtion, calculateDeliveryDate  } from '../../data/deliveryOptions.js';
import { updateDeliveryOption, loadFromStorage } from '../../data/cart.js' ;
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

loadFromStorage();

let today=dayjs();
let deliveryDate=today.add(7,'days');

export function renderOrderSummary(){
       let cartSummaryHTML='';

    cart.forEach((cartItem)=>{
    let productId=cartItem.productId;
        
    let matchingProduct=getProduct(productId);

    let deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption
 = getDeliveryOPtion(deliveryOptionId);

    let dateString = calculateDeliveryDate(deliveryOption)

    cartSummaryHTML+=`
    <div class="cart-item-container 
    js-cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
    Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
    <img class="product-image"
    src="${matchingProduct.image}">

    <div class="cart-item-details">
    <div class="product-name">
    ${matchingProduct.name}
    </div>
    <div class="product-price">
    $${formatCurrency(matchingProduct.priceCents)}
    </div>
    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
    <span class="quantity-container">
    Quantity:
    <span class="quantity-label js-quantity-label-${matchingProduct.id} ">
    ${cartItem.quantity}
    </span>
    </span>

    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
      Update
    </span>

    <input type="number" class="js-input-number">

    <span class="link-primary js-save-link" data-product-id="${matchingProduct.id}">
    save
    </span>

    <span class="delete-quantity-link link-primary  js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
      Delete
    </span>
    </div>
    </div>

    <div class="delivery-options">
    <div class="delivery-options-title">
    Choose a delivery option:
    </div>
    ${delievryOptionsHTML(matchingProduct,cartItem)}
    </div>
    </div>
    </div>
    `;
    });

    function delievryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
    let today = dayjs();

  let dateString = calculateDeliveryDate(deliveryOption);
    let priceString = deliveryOption.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)} - `;

    let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
    <div class="delivery-option js-delivery-option"  data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
    <input type="radio"
    ${isChecked ? 'checked' : ''}
    class="delivery-option-input"
    name="delivery-option-${matchingProduct.id}">

    <div>
    <div class="delivery-option-date">
    ${dateString}
    </div>

    <div class="delivery-option-price">
    ${priceString} Shipping
    </div>
    </div>
    </div>
    `;
    });

    return html;
    }
    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
    let productId = link.dataset.productId;
    removeFromCart(productId);
    renderOrderSummary();

    renderCheckoutHeader();
    renderPaymentSummary();
    });
    });


    document.querySelectorAll('.js-update-link').forEach((update) => {
    update.addEventListener('click', () => {
    const productId = update.dataset.productId;

    const save = update.parentElement.querySelector('.js-save-link');
    save.innerHTML = 'Save';

    const quantityLabel = document.querySelector(
    `.js-quantity-label-${productId}`
    );

    const currentQuantity = quantityLabel.textContent.trim();

    let container = document.querySelector(`.js-cart-item-container-${productId}`);

    let input = container.querySelector('.js-input-number');
    input.value = currentQuantity;

    container.classList.add('is-editing-quantity');

          renderPaymentSummary();
    });

    });

    document.querySelectorAll('.js-save-link').forEach((saveLink)=>{
    saveLink.addEventListener('click',()=>{
    let productId=saveLink.dataset.productId;

    let container=document.querySelector(`.js-cart-item-container-${productId}`);

    let input=container.querySelector('.js-input-number');

    let newQuantity=Number(input.value);

    if(newQuantity>0 && newQuantity<1000){
    updateQuantity(productId,newQuantity);

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
    }
    else{
    alert('Quantity must be between 1 and 999');
    }
    });
    });

    document.querySelectorAll('.js-input-number').forEach((input)=>{
    input.addEventListener('keydown', (event)=>{
    if(event.key==='Enter'){
    input.parentElement.querySelector('.js-save-link').click();
    }
    });
    });

    document.querySelectorAll('.js-delivery-option').forEach((optionEvent) => {

    optionEvent.addEventListener('click', () => {

    let {productId, deliveryOptionId}=optionEvent.dataset;

    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
    });
    });
 }
 
  renderCheckoutHeader();