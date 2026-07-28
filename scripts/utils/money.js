export function formatCurrency(priceCents){
  return (priceCents/100).tofixed(2);
}