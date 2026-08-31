import { Product, Clothing, Appliance } from "../../data/products.js";

describe('test for exercise questions: product, clothing and appliance', () => {

  it('product test', () => {

    let productDetails = {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      priceCents: 1090,
      rating: {
        stars: 4.5,
        count: 87
      }
    };

    let product1 = new Product(productDetails);

    expect(product1.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(product1.getPrice()).toEqual('$10.90');

    expect(product1.getStarUrl()).toEqual(
      'images/ratings/rating-45.png'
    );
      
      expect(product1.extraInfoHTML()).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs')
  });
});

 describe('test suite: clothing ', ()=>{
  it('creates a clothing object tes', ()=>{

  let productDetails = {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  };
    
   let clothing = new Clothing(productDetails);

   expect(clothing.size).toEqual('M');
   expect(clothing.color).toEqual('black');

     expect(clothing.extraInfoHTML()).toContain('size');
  });
 });

 describe('test suite: appliance', ()=>{
   it('creates an appliance object test', ()=>{

    let productDetails = {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
     type: "appliances",
     instructionsLink: "images/appliance-instructions.png",
     warrantyLink:"images/appliance-warranty.png"
  };
    let appliance = new Appliance(productDetails);

    expect(appliance.type).toEqual('appliances');

    expect(appliance.extraInfoHTML()).toContain('Instructions');

    expect(appliance.extraInfoHTML()).toContain('Warranty');
   });
 });