import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

 export let deliveryOptions=[
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id:'2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id:'3',
    deliveryDays: 1,
    priceCents: 999
  }
];

 export function getDeliveryOPtion(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
    deliveryOption = option;
    }
    }); 

     return deliveryOption || deliveryOptions[0];
 }

 export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs();

  let remainningDays = deliveryOption.deliveryDays;

  while (remainningDays > 0) {
    deliveryDate = deliveryDate.add(1, 'days');

    let day = deliveryDate.format('dddd');

    if (day === 'Saturday' || day === 'Sunday') {

    } else {
      remainningDays--;
    }
  }

  let dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}