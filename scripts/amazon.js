import{cart} from '../data/cart-class.js';//we use as variable to avoid the naming conflict and but before we use the as keyword we must decelare or use the module keyqord inside the html file
import{products, loadProducts} from '../data/products.js'
import formatCurrency from './utils/money.js';

   let url = new URL(window.location.href);
  let search = url.searchParams.get('search') || '';

  console.log(search);
  document.querySelector('.search-button').addEventListener('click', ()=>{
    let search = document.querySelector('.search-bar').value; 
    url.searchParams.set('search', search);
    window.location.href = url.toString();
  });

    loadProducts(renderProductsGrid);

  function renderProductsGrid(){
  let productHTML="";

  products.forEach((product)=>{
      console.log(product.name, product.name.toLowerCase().includes(search.toLowerCase()));
      console.log(product.name, product.keywords);
      let keywordMatch = product.keywords?.some((keyword)=>{
        console.log(keyword)
        return keyword.toLowerCase().includes(search.toLowerCase());
      });
    if (!product.name.toLowerCase().includes(search.toLowerCase()) && !keywordMatch) {
  return;
}
  let html=`
  <div class="product-container">
  <div class="product-image-container">
  <img class="product-image"
  src="${product.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
  ${product.name}
  </div>

  <div class="product-rating-container">
  <img class="product-rating-stars"
  src="${product.getStarUrl()} ">
  <div class="product-rating-count link-primary">
  ${product.rating.count}
  </div>
  </div>

  <div class="product-price">
  ${product.getPrice()}
  </div>

  <div class="product-quantity-container">
  <select class="js-quantity-selector-${product.id}" >
  <option selected value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  </select>
  </div>

  <div>
  ${product.extraInfoHTML()}
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart  js-added-to-cart-${product.id}">
  <img src="images/icons/checkmark.png">
  Added
  </div>

  <button class="add-to-cart-button button-primary  js-add-to-cart" data-product-id="${product.id}">
  Add to Cart
  </button>
  </div>


  `;
  productHTML+=html;
  })

  document.querySelector('.js-products-grid').innerHTML=productHTML;


  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
  const productId=button.dataset.productId;

  let quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  cart.addToCart(productId,quantity);
  cart.updateCartQuantity();

  let added= document.querySelector(`.js-added-to-cart-${productId}`);

  added.classList.add('added-to-cart-visible')


    let settime;
  clearTimeout(settime);
  settime=setTimeout(()=>{
  added.classList.remove('added-to-cart-visible');
  },2000);
   }); 
  });
}

