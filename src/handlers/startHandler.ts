import { Actor, Dataset } from "apify";
import { START } from "../constants.js";
import { Handler } from "../interafaces.js";
import generateOutput from "../utils/generateOutput.js";
import typeWithDelay from "../utils/typeWithDelay.js";
import {load} from "cheerio"

export default async ({ request, page, log }: Handler) => {
    if (request.retryCount > 2) Actor.fail("Max retries exceeded")
    
    const {data} = request.userData
    const { from, to, lang, finalResultPageUrl, rideDate } = data

    log.info(`Running ${START} handler`)

    // Get keyboard to select from - to
    const keyboard = page.keyboard

    try {
        // ==== FROM place ====
        
        await page.waitForSelector("#searchInput-from")

        // Click on input so that the typing works as expected
        await page.click("#searchInput-from")

        // Type from place with delay to correctly load autocomplete
        await typeWithDelay(page, "#searchInput-from", from, 200)

        // Wait for places to load
        await page.waitForTimeout(450)

        // Select place from
        await keyboard.press("ArrowDown")
        await keyboard.press("Enter")

        // ==== FROM place ====

        // ==== TO place ====

        // Click on input so that the typing works as expected 
        await page.click("#searchInput-to")

        // Type from place with delay to correctly load autocomplete
        await typeWithDelay(page, "#searchInput-to", to, 200)

        // Wait for places to load
        await page.waitForTimeout(450)

        // ==== TO place ====

        // Select place to
        await keyboard.press("ArrowDown")
        await keyboard.press("Enter")

    } catch (err) {
        Actor.fail("Something went wrong while trying to enter the from - to place. Make sure that you are using proxies from the country, where there is no cookies acceptance required")
    }
    
    // This will ensure that user entered valid input and that we can search
    await Promise.race([
        page.click('div[data-e2e="search-button"] > button'),
        page.waitForEvent('console', { timeout: 500 }) // Wait for a console event to occur within .5 seconds
    ]);

    // Wait for final  output
    await page.waitForSelector('ul[data-e2e="search-result-list"]')

    const content = await page.content();
    const $ = load(content);
    
    // Generate output
    const output = generateOutput($, finalResultPageUrl, rideDate, lang)

    await Dataset.pushData(output)
};