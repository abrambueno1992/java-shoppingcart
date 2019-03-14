export const productPriceMap = products => {
  console.log("products in calculator:", products);
  const priceMap = new Map();
  products.forEach(each => {
    priceMap.set(each.productid, each.price);
  });
  return priceMap;
};

export const productQuantityMap = products => {
  const quantityMap = new Map();
  console.log("products in calculator:", products);

  products.forEach(each => {
    quantityMap.set(each.productid, each.quantity);
  });
  return quantityMap;
};

export const calculateTotalCosts = (priceMap, quantityMap) => {
  let totalCost = 0;
  for (let [k, v] of quantityMap) {
    totalCost += v * priceMap.get(k);
  }

  return totalCost.toFixed(2);
};

export const orderData = (products, quantityMapping) => {
  // const nameOfProductsAlphabetical = new Map([...mapProducts.entries()].sort());
  // nameOfProductsAlphabetical.sort();
  // const orderedMap = new Map();
  // nameOfProductsAlphabetical.forEach(each => {
  //   orderedMap.set(each, quantityMapping.get(each))
  // })
};
