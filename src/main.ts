// Imports
import { Actor, log } from 'apify';
import { PlaywrightCrawler } from 'crawlee';
import { reformatInputToFlixbusDateString } from './utils/reformatDate.js';
import { router } from './routes.js';
import { InputType } from './interafaces.js';
import { checkProxy } from './utils/checkProxy.js';
import { getDomainFromLang } from './utils/getDomainFromLang.js';

await Actor.init();

const inputData: InputType = await Actor.getInput() as InputType;
// eslint-disable-next-line camelcase
const { lang, adult, student, children_0_5, children_6_17, senior, bike_slot, proxyConfiguration } = inputData;

// Reformat date format from input to format that flix uses
inputData.rideDate = reformatInputToFlixbusDateString(inputData.rideDate); // for example 2023-06-19 > 19.06.2023

// Validate input by checking if the sum of passengers is above 0
// eslint-disable-next-line camelcase
const passengers: number[] = [adult, student, children_0_5, children_6_17, senior];
for (const passenger of passengers) {
    if (passenger < 0) Actor.fail('You have to enter invalid passenger amount');
}
const proxyConfig = await checkProxy({
    proxyConfig: proxyConfiguration,
});

log.info(`headless mode: ${process.env.HEADLESS !== 'false'}`);

const crawler = new PlaywrightCrawler({
    proxyConfiguration: proxyConfig,
    requestHandler: router,
    headless: process.env.HEADLESS !== 'false',
    sessionPoolOptions: {
        sessionOptions: {
            maxUsageCount: 5,
            maxErrorScore: 1,
        },
    },
});

// Create params for initial page
const params: Record<string, string> = {
    adult: String(adult),
    student: String(student),
    children_0_5: String(children_0_5),
    children_6_17: String(children_6_17),
    bike_slot: String(bike_slot),
    senior: String(senior),
    rideDate: inputData.rideDate,
};

const searchParams = new URLSearchParams(params);

await crawler.run([
    {
        url: `https://shop.flixbus${getDomainFromLang(lang)}/search?${searchParams}`,
        label: 'START',
        userData: {
            data: inputData,
        },
    },
]);

await Actor.exit();
