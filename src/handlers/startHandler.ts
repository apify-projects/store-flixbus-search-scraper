import { Actor } from "apify";
import { START } from "../constants.js";
import { Handler } from "../interafaces.js";
import getFinalResultPageURL from "../utils/getFinalResultPageURL.js";
import typeWithDelay from "../utils/typeWithDelay.js";

export default async ({ request, page, log, crawler }: Handler) => {
    const {data} = request.userData
    const { from, to } = data

    log.info(`Running ${START} handler`)

    // await page.click('button[data-testid="uc-accept-all-button"]')

    // Get keyboard to select from - to
    const keyboard = page.keyboard

    try {
        //
        // FROM place
        //
        
        // Click on input so that the typing works as expected
        await page.click("#searchInput-from")

        // Type from place with delay to correctly load autocomplete
        await typeWithDelay(page, "#searchInput-from", from, 150)

        // Wait for places to load
        await page.waitForTimeout(400)

        // Select place from
        await keyboard.press("ArrowDown")
        await keyboard.press("Enter")

        // 
        // TO place
        //

        // Click on input so that the typing works as expected 
        await page.click("#searchInput-to")

        // Type from place with delay to correctly load autocomplete
        await typeWithDelay(page, "#searchInput-to", to, 150)

        // Wait for places to load
        await page.waitForTimeout(400)

        // Select place to
        await keyboard.press("ArrowDown")
        await keyboard.press("Enter")
    } catch (err) {
        Actor.fail("Something went wrong while trying to enter the from - to place. Make sure that you are using proxies from the country, where there is no cookies acceptance required")
    }
    

    // Search for routes
    await page.click('div[data-e2e="search-button"] > button')

    // Get the current url
    const initialResultUrl = await page.url();

    const finalResultPageUrl = getFinalResultPageURL(data, initialResultUrl)
    
    crawler.addRequests([
        {
            url: finalResultPageUrl,
            label: "FINAL_RESULT_PAGE",
            userData: data
        }
    ])
};