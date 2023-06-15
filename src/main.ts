// Imports
import { Actor, log } from 'apify';
import { PlaywrightCrawler } from 'crawlee';
import { reformatInputToFlixbusDateString } from './utils/reformatDate.js';
import { router } from './routes.js';
import { InputType } from './interafaces.js';
import { checkProxy } from './utils/checkProxy.js';
import getDomainFromLang from './utils/getDomainFromLang.js';

// Initialize the Apify SDK
await Actor.init();

// Get users input
let inputData: InputType = await Actor.getInput() as InputType;
const {lang, adult, student, children_0_5, children_6_17, senior, bike_slot, proxyConfiguration} = inputData

// Reformat date from input
inputData.rideDate = reformatInputToFlixbusDateString(inputData.rideDate) // for example 2023-06-19 > 19.06.2023

// Validate input
const passengers: number[] = [adult, student, children_0_5, children_6_17, senior]
let sumOfPassengers = 0
for (const passenger of passengers) sumOfPassengers += passenger
if (sumOfPassengers <= 0) {
    Actor.fail("You have to enter atleast one passenger")
}

// Set up proxies
const proxyConfig = await checkProxy({
    proxyConfig: proxyConfiguration,
});

log.info('headless mode: ' + (process.env.HEADLESS === "false" ? false : true));

// Configure PlaywrightCrawler
const crawler = new PlaywrightCrawler({
    proxyConfiguration: proxyConfig,
    requestHandler: router,
    headless: process.env.HEADLESS === "false" ? false : true,
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
    rideDate: inputData.rideDate
};

const searchParams = new URLSearchParams(params)

// Run crawler
await crawler.run([
    {
        url: `https://shop.flixbus${getDomainFromLang(lang)}/search?${searchParams}`,
        label: "START",
        userData: {
            data: inputData
        }
    }
]);

// Exit successfully
await Actor.exit();
