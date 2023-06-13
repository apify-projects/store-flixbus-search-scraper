/**
 * This template is a production ready boilerplate for developing with `PlaywrightCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

// For more information, see https://docs.apify.com/sdk/js
import { Actor } from 'apify';
// For more information, see https://crawlee.dev
import { PlaywrightCrawler } from 'crawlee';
import { reformatInputToFlixbusDateString } from './utils/reformatDate.js';
import { router } from './routes.js';

// Initialize the Apify SDK
await Actor.init();

interface InputData {
    website: string;
    from: string;
    to: string;
    rideDate: string;
    adult: number;
    student: number;
    children_0_5: number;
    children_6_17: number;
    bike_slot: number;
    senior: number;
}

let {website, from, to, rideDate, adult, student, children_0_5, children_6_17, bike_slot, senior}: InputData = await Actor.getInput() as InputData;

rideDate = reformatInputToFlixbusDateString(rideDate) // for example 2023-06-19 > 19.06.2023

// Validate input
const passengers: number[] = [adult, student, children_0_5, children_6_17, senior]
let sumOfPassengers = 0
for (const passenger of passengers) sumOfPassengers += passenger
if (sumOfPassengers <= 0) {
    Actor.fail()
}

const proxyConfiguration = await Actor.createProxyConfiguration({
    groups: ['RESIDENTIAL'],
    countryCode: 'FR',
});

const crawler = new PlaywrightCrawler({
    proxyConfiguration,
    requestHandler: router,
    headless: false
});

await crawler.run([
    {
        url: `https://flixbus.${website}/`,
        label: "START",
        userData: {
            data: {
                rideDate,
                website,
                from,
                to,
                adult,
                student,
                children_0_5,
                children_6_17,
                senior,
                bike_slot
            }
        }
    }
]);

// Exit successfully
await Actor.exit();
