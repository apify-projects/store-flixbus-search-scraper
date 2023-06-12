import extractNumberAndSymbol from './extractPriceAndSymbol.js';

const getPrice = (result$: any) => {
  const priceElement = result$.find('span[data-e2e="search-result-prices"]');
  if (priceElement.length) {
    const textPrice = priceElement.eq(0)?.text()?.trim();
    return extractNumberAndSymbol(textPrice);
  }
  return undefined
};

export default getPrice;
