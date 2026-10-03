 import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch, products } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

    let url = new URL(window.location.href);
    let productId = url.searchParams.get('productId');
    let orderId = url.searchParams.get('orderId');

  let matchingOrder;
   orders.forEach((order)=>{
 if(order.id===orderId){
    matchingOrder = order;
 }
   });

    
  await loadProductsFetch();

   let matchingProduct=
   getProduct(productId); 

  let matchingProductDetails;
  matchingOrder.products.forEach((productDetails)=>{
    if(productDetails.productId===productId){
     matchingProductDetails = productDetails;
    }
  });

  let deliveryTime = dayjs(matchingProductDetails.estimatedDeliveryTime);
  let deliveryDate = deliveryTime.format('dddd, MMMM D');
  let orderTime = matchingOrder.orderTime;

  let currentTime = dayjs();

  let percentProgress = ((currentTime.diff(orderTime))/(deliveryTime .diff(orderTime)))*100;

  let status='';
  if(percentProgress < 50){
    status = 'Preparing';
  }
  else if(percentProgress < 100){
    status = 'Shipped';
  }
  else{
    status = 'Delivered';
  }

    let html='';
      let preparingClass = '';
      let shippedClass = '';
      let deliveredClass = '';

    if(status ==='Preparing'){
      preparingClass = 'current-status';
    }
    else if(status === 'Shipped'){
      shippedClass = 'current-status';
    }
    else if(status === 'Delivered'){
      deliveredClass = 'current-status';
    }
    
    
    html+=`
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
        Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          ${matchingProductDetails.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label  ${preparingClass}">
            Preparing
          </div>
          <div class="progress-label ${shippedClass}">
            Shipped
          </div>
          <div class="progress-label ${deliveredClass}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%"></div>
        </div>
    `;

     document.querySelector('.order-tracking').innerHTML = html;
     