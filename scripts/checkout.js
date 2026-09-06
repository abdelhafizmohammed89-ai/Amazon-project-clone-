import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary
 } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
 //import'../data/cart-class.js';
//import'../data/backend-practice.js';

 
  async function loadPage(){
    try{
       //throw 'error1';
    await loadProductsFetch();

   const value = await new Promise((resolve, reject)=>{
    // throw 'error2';
      loadCart(()=>{
        // reject('error3');
       resolve('value 2');
      });
  });
 } 
   catch(error){
   console.log('unxpected error, please try again latar')
  }
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
/*
 Promise.all([
 loadProductsFetch(),
 
  new Promise((resolve)=>{
      loadCart(()=>{
        resolve('value 2');
      });
  })

 ]).then((values)=>{
    renderOrderSummary();
    renderPaymentSummary();
    console.log(values)
 });
*/


/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value 1');
  });
}).then((value)=>{

 console.log(value);

  return new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      });
  });
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();

});

*/

/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/