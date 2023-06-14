// Imports
import { Actor } from 'apify';
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

// Reformat date from input
inputData.rideDate = reformatInputToFlixbusDateString(inputData.rideDate) // for example 2023-06-19 > 19.06.2023

// Validate input
const passengers: number[] = [adult, student, children_0_5, children_6_17, senior]
let sumOfPassengers = 0
for (const passenger of passengers) sumOfPassengers += passenger
if (sumOfPassengers <= 0) {
    Actor.fail("You have to enter atleast one passenger")
}

const proxyConfig = await checkProxy({
    proxyConfig: proxyConfiguration,
});

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
            data: {...inputData}
        }
    }
]);

// Exit successfully
await Actor.exit();
