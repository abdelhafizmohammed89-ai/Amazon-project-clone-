export const cart=[];

export function addToCart( productId,quantity){
      
           let matchingItem;

          cart.forEach((cartItem)=>{
            if(productId===cartItem.productId){
              matchingItem=cartItem;
            }
            else{
              
            }
          });

          if(matchingItem){
            matchingItem.quantity+=quantity;
          }
          else{
          cart.push({
          productId:productId,
          quantity:quantity
         });
          }
     }

    export function updateCartQuantity(){
         let cartQuantity=0;

          cart.forEach((cartItem)=>{
              cartQuantity+=cartItem.quantity;
          })
            
          document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
     } 
 