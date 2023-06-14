import { CheerioAPI } from 'cheerio';
import { Currencies } from '../interafaces';

// List of currencies that will be returned if the website is not showing selected currency
const currencies: Currencies = {
  "pl": "PLN",
  "cz": "CZK",
  "sk": "EUR",
  "com": "EUR",
  "es": "EUR",
  "in": "INR"
}

const getCurrency = ($: CheerioAPI, website: string) => {
  const currencyElement = $('span[data-e2e="currency-selected"]');
  const currency = currencyElement?.text().trim();
  if (currency) return currency;
  if (currencies[website]) return currencies[website]
  return ""
};

export default getCurrency;
