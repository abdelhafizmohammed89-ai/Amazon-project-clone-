import { getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import { loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";


async function loadPage(){
  await loadProductsFetch();

   let html = '';
orders.forEach((order)=>{
order.products.forEach((product)=>{
 let productId = product.productId;
 let matchingProduct=getProduct(productId);

   html+=`
    <div class="order-details-grid">
            <div class="product-image-container">
             <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
               ${matchingProduct.name}
             </div>
              <div class="product-delivery-date">
                Arriving on: June 17
              </div>
              <div class="product-quantity">
                ${product.quantity}
              </div>
              <button class="buy-again-button button-primary  js-buy-again" data-product-id="${matchingProduct.id}" data-quantity="${product.quantity}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
              <div class="product-actions">
                <button class="track-package-button button-secondary  js-tracking-package-button" data-order-id="${order.id}"
                data-product-id="${product.productId}">
                  Track package
                </button>
            </div>
            </div>
          </div>
   `;
   });
 });

  document.querySelector('.js-orders-grid').innerHTML=html;

  document.querySelectorAll('.js-buy-again').forEach((buy)=>{
    buy.addEventListener('click', ()=>{
      let productId = buy.dataset.productId;
      let quantity = Number(buy.dataset.quantity);

    cart.addToCart(productId,quantity);
    });
  });

  document.querySelectorAll('.js-tracking-package-button').forEach((track)=>{
    track.addEventListener('click', ()=>{  
      let orderID= track.dataset.orderId;
      let productID = track.dataset.productId;
    window.location.href = `tracking.html?orderId=${orderID}&productId=${productID}`;
    });
  });
}
   loadPage();