export const productPriceMap = products => {
  const priceMap = new Map();
  products.forEach(each => {
    priceMap.set(each.productid, each.price);
  });
  return priceMap;
};

export const productQuantityMap = products => {
  const quantityMap = new Map();
  products.forEach(each => {
    quantityMap.set(each.productid, each.quantity);
  });
  return quantityMap;
};

export const calculateTotalCosts = (priceMap, quantityMap) => {
  let totalCost = 0;
  for (let [k, v] of quantityMap) {
    console.log("key: ", k, " value: ", v);

    totalCost += v * priceMap.get(k);
    console.log("totalCost: ", totalCost);
  }
  console.log("What is this? ", totalCost);

  return totalCost.toFixed(2);
};
