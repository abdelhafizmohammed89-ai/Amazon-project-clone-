import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from '../../data/cart.js'; 
 
describe('test suite: addTocart', ()=>{ 
 beforeEach(()=>{
       spyOn(localStorage, 'setItem') 
    })
  it('adds an existing product to the cart', ()=>{ 
    spyOn(localStorage, 'getItem').and.callFake(()=>{ 
      return JSON.stringify([{ 
          productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
          quantity:2, 
          deliveryOptionId:'1' 
        }]); 

         addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1); 
    expect(cart.length).toEqual(1); 
 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
 
    expect(cart[0].quantity).toEqual(1); 

    }); 
  }); 

  loadFromStorage();
 
  it('adds a new product to the cart', ()=>{ 
    spyOn(localStorage, 'getItem').and.callFake(()=>{ 
      return JSON.stringify([]); 
    }); 
 
    loadFromStorage(); 
 
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1); 
    expect(cart.length).toEqual(1); 
 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
 
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
 
    expect(cart[0].quantity).toEqual(1); 
  }); 
});

describe('test suite: removeFromCart',()=>{
  beforeEach(()=>{
     spyOn(localStorage, 'getItem').and.callFake(() => {
  return JSON.stringify([
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
});
     spyOn(localStorage, 'setItem').and.callFake(() => {
     });
});

it('removes a product that is in the cart', () => {
  loadFromStorage();
  removeFromCart('product-1');

  expect(cart.length).toEqual(1);
  expect(cart[0].productId).toEqual('product-2')

  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
});
});

describe('test suite: updateDeliveryOption', ()=>{
   beforeEach(()=>{
      spyOn(localStorage, 'getItem').and.callFake(() => {
  return JSON.stringify([
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
}); 
  spyOn(localStorage, 'setItem').and.callFake(() => {
     });

     loadFromStorage();
});

it('update the delivery option of the product in the cart', ()=>{
   updateDeliveryOption('product-1', '3');

  expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  expect(localStorage.setItem).toHaveBeenCalledWith('cart',
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

it('update the delivery option of productId that is not in the cart', ()=>{
    updateDeliveryOption('product-4','2');

     expect(cart).toEqual([
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
