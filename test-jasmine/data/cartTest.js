import { cart } from '../../data/cart-class.js';

describe('test suite: addTocart', () => {

  beforeEach(() => {
    cart.cartItems = [];

    spyOn(localStorage, 'setItem').and.callFake(() => {
    });
  });

  it('adds a new product to the cart', () => {

    cart.addToCart(
      'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      1
    );

    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop',
      JSON.stringify(cart.cartItems)
    );

    expect(cart.cartItems[0].productId)
      .toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItems[0].quantity).toEqual(1);
  });
});


describe('test suite: removeFromCart', () => {

  beforeEach(() => {

    cart.cartItems = [
      {
        productId: 'product-1',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: 'product-2',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];

    spyOn(localStorage, 'setItem').and.callFake(() => {
    });
  });

  it('removes a product that is in the cart', () => {

    cart.removeFromCart('product-1');

    expect(cart.cartItems.length).toEqual(1);

    expect(cart.cartItems[0].productId).toEqual('product-2');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});


describe('test suite: updateDeliveryOption', () => {

  beforeEach(() => {

    cart.cartItems = [
      {
        productId: 'product-1',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: 'product-2',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];

    spyOn(localStorage, 'setItem').and.callFake(() => {
    });
  });

  it('update the delivery option of the product in the cart', () => {

    cart.updateDeliveryOption('product-1', '3');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart-oop',
      JSON.stringify([
        {
          productId: 'product-1',
          quantity: 2,
          deliveryOptionId: '3'
        },
        {
          productId: 'product-2',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ])
    );
  });

  it('update the delivery option of productId that is not in the cart', () => {

    cart.updateDeliveryOption('product-4', '2');

    expect(cart.cartItems).toEqual([
      {
        productId: 'product-1',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: 'product-2',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ]);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});