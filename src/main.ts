/**
 * This template is a production ready boilerplate for developing with `PlaywrightCrawler`.
 * Use this to bootstrap your projects using the most up-to-date code.
 * If you're looking for examples or want to learn more, see README.
 */

// For more information, see https://docs.apify.com/sdk/js
import { Actor, ProxyConfiguration } from 'apify';
// For more information, see https://crawlee.dev
import { PlaywrightCrawler } from 'crawlee';
import { reformatInputToFlixbusDateString } from './utils/reformatDate.js';
import { router } from './routes.js';
import { InputType } from './interafaces.js';
import { checkProxy } from './utils/checkProxy.js';

// Initialize the Apify SDK
await Actor.init();

// Get users input
let inputData: InputType = await Actor.getInput() as InputType;
const {website, adult, student, children_0_5, children_6_17, senior, proxyConfiguration} = inputData

inputData.rideDate = reformatInputToFlixbusDateString(inputData.rideDate) // for example 2023-06-19 > 19.06.2023

// Validate input
const passengers: number[] = [adult, student, children_0_5, children_6_17, senior]
let sumOfPassengers = 0
for (const passenger of passengers) sumOfPassengers += passenger
if (sumOfPassengers <= 0) {
    Actor.fail("You have to enter atleast one passenger")
}

console.log("BEFORE", proxyConfiguration)

const proxyConfig = await checkProxy({
    proxyConfig: proxyConfiguration,
});

console.log("AFTER", proxyConfig)

const crawler = new PlaywrightCrawler({
    proxyConfiguration: proxyConfig,
    requestHandler: router,
    headless: true
});

await crawler.run([
    {
        url: `https://flixbus.${website}/`,
        label: "START",
        userData: {
            data: inputData
        }
    }
]);

// Exit successfully
await Actor.exit();
