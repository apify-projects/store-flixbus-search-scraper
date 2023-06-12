import { CheerioAPI } from 'cheerio';
import getAmenities from './getAmenities.js';
import getDepArrPlace from './getDepArrPlace.js';
import getDepArrTime from './getDepArrTime.js';
import getDuration from './getDuration.js';
import getPrice from './getPrice.js';
import getTransfers from './getTransfers.js';
import getFromTo from './getFromTo.js';
import getCurrency from './getCurrency.js';

const generateOutput = ($: CheerioAPI, finalResultPageUrl: string, rideDate: string) => {
  const results = $('ul[data-e2e="search-result-list"]');

  const output: any = { url: finalResultPageUrl, date: rideDate, from: '', to: '', currency: '', routes: [] };

  // Iterate over the children of the <ul> element
  results.children().each((_i, result) => {
    const result$ = $(result);

    // If price is undefined it is Sold out
    const price = getPrice(result$);
    const isSoldOut = price ? false : true;

    const depTime: any = getDepArrTime(result$, rideDate);
    const arrTime: any = getDepArrTime(result$, rideDate, false);

    const newRoute = {
      isSoldOut,
      price,
      departure: { place: getDepArrPlace(result$), time: depTime },
      arrival: { place: getDepArrPlace(result$, false), time: arrTime },
      duration: getDuration(result$, depTime.timestamp, arrTime.timestamp),
      amenities: getAmenities(result$, $),
      transfers: getTransfers(result$),
    };

    // Add route
    output.routes.push(newRoute);
  });

  const fromTo: any = getFromTo($);
  output.from = fromTo.from;
  output.to = fromTo.to;

  output.currency = getCurrency($);

  return output;
};

export default generateOutput;
