import extractNumberAndSymbol from './extractPriceAndSymbol.js';

const getFare = (result$: any) => {
  const fareElement = result$.find('span[data-e2e="search-result-prices"]');
  if (fareElement.length) {
    const textFare = fareElement.eq(0)?.text()?.trim();
    return extractNumberAndSymbol(textFare);
  }
  return undefined
};

export default getFare;
