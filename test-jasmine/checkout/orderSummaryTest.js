import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: renderOrderSummary', () => {

  let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  let productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {

    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
    `;

    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });


  it('displays the cart', () => {

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(
        `.js-product-quantity-${productId1}`
      ).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(
        `.js-product-quantity-${productId2}`
      ).innerText
    ).toContain('Quantity: 1');

  });


  it('removes the product', () => {

    document
      .querySelector(`.js-delete-link-${productId1}`)
      .click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(
        `.js-cart-item-container-${productId1}`
      )
    ).toEqual(null);

    expect(
      document.querySelector(
        `.js-cart-item-container-${productId2}`
      )
    ).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);

    expect(cart.cartItems[0].productId).toEqual(productId2);

  });


  it('checking out the product name', () => {

    let productName = getProduct(
      cart.cartItems[0].productId
    );

    expect(
      document.querySelector('.js-product-name').innerHTML.trim()
    ).toEqual(productName.name);

  });


  it('checking out the price', () => {

    let productPrice = getProduct(
      cart.cartItems[0].productId
    );

    expect(
      document.querySelector('.js-product-price').innerHTML.trim()
    ).toEqual(
      `$${formatCurrency(productPrice.priceCents)}`
    );

  });


  it('updating the delivery option', () => {

    let productId = cart.cartItems[0].productId;

    let deliveryOption = document.querySelector(
      `.js-delivery-option-input-${productId}-3`
    );

    deliveryOption.click();

    expect(deliveryOption.checked).toEqual(true);

    expect(
      cart.cartItems[0].deliveryOptionId
    ).toEqual('3');

    let shippingPrice = document.querySelector(
      '.js-shipping-price'
    );

    expect(shippingPrice.innerText).toContain('$14.98');

  });

});