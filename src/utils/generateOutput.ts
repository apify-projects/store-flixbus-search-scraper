import { CheerioAPI } from 'cheerio';
import { getAmenities } from './getAmenities.js';
import { getDepArrPlace } from './getDepArrPlace.js';
import { getDepArrTime } from './getDepArrTime.js';
import { getDuration } from './getDuration.js';
import { getFare } from './getFare.js';
import { getTransfers } from './getTransfers.js';
import { getFromTo } from './getFromTo.js';
import { getCurrency } from './getCurrency.js';
import { DepArr, DepArrTime, Duration, Output, Route } from '../interafaces.js';

export const generateOutput = ($: CheerioAPI, finalResultPageUrl: string, rideDate: string, lang: string) => {
    const results = $('ul[data-e2e="search-result-list"]');

    const output: Output = { url: finalResultPageUrl, date: rideDate, lang, passengers: [], from: '', to: '', currency: '', routes: [] };

    // Iterate over the children of the <ul> element
    results.children().each((_i, result) => {
        const result$ = $(result);

        // If fare is undefined it is Sold out
        const fare = getFare(result$);
        const isSoldOut = !fare;

        const depTime: DepArrTime = getDepArrTime(result$, rideDate);
        const arrTime: DepArrTime = getDepArrTime(result$, rideDate, false);

        const newRoute: Route = {
            isSoldOut,
            fare,
            departure: { place: getDepArrPlace(result$), time: depTime } as DepArr,
            arrival: { place: getDepArrPlace(result$, false), time: arrTime } as DepArr,
            duration: getDuration(result$, depTime.timestamp, arrTime.timestamp) as Duration,
            amenities: getAmenities(result$, $),
            transfers: getTransfers(result$),
        };

        // Add route
        output.routes.push(newRoute);
    });

    output.passengers = $('input[id="productSummary"]').val()?.toString().toLowerCase()
        .split(', ') as string[];

    const fromTo: any = getFromTo($);
    output.from = fromTo.from;
    output.to = fromTo.to;

    output.currency = getCurrency($, lang);

    return output;
};
