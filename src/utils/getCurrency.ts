import { CheerioAPI } from 'cheerio';

const getCurrency = ($: CheerioAPI) => {
  const currencyElement = $('span[data-e2e="currency-selected"]');
  const currency = currencyElement?.text().trim();
  if (currency) return currency;
  return "";
};

export default getCurrency;
