import { CheerioAPI } from 'cheerio';
import { Currencies } from '../interafaces';

// List of currencies that will be returned if the website is not showing selected currency
const currencies: Currencies = {
  "pl": "PLN",
  "cs": "CZK",
  "sk": "EUR",
  "en-gb": "EUR",
  "es": "EUR",
  "en-us": "USD",
  "hr": "EUR",
  "fr": "EUR"
}

const getCurrency = ($: CheerioAPI, lang: string) => {
  const currencyElement = $('span[data-e2e="currency-selected"]');
  const currency = currencyElement?.text().trim();
  if (currency) return currency;
  if (currencies[lang]) return currencies[lang]
  return ""
};

export default getCurrency;
