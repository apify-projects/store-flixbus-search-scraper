import generateOutput from '../utils/generateOutput.js';
import { Dataset } from 'apify';
import {load} from "cheerio"
import { Handler } from '../interafaces.js';
import { FINAL_RESULT_PAGE } from '../constants.js';

export default async ({ request, page, log }: Handler) => {
    log.info(`Running ${FINAL_RESULT_PAGE} handler`)

    const { rideDate, finalResultPageUrl } = request.userData

    log.info("Scraping", finalResultPageUrl)

    // Wait for content to load
    await page.waitForSelector('ul[data-e2e="search-result-list"]')

    // Get and load content to cheerio parser
    const content = await page.content();
    const $ = load(content);

    // Generate output
    const output = generateOutput($, finalResultPageUrl, rideDate)

    await Dataset.pushData(output)
}