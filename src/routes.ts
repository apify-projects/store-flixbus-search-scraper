import { Dataset, createPlaywrightRouter } from 'crawlee';
import generateOutput from './utils/generateOutput.js';
import { load } from "cheerio"

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ log }) => {
    log.info(`Default handler`);
});

router.addHandler('START', async ({ request, page, log, crawler }) => {
    const { from, to, website, senior, children_0_5, children_6_17, rideDate, adult, student, bike_slot } = request.userData.data

    log.info(`Running START handler`)

    log.info(request.url)

    // Accept cookies
    await page.click('button[data-testid="uc-accept-all-button"]')

    // Get keyboard to select from - to
    const keyboard = page.keyboard

    // Type and select from place -> to place
    await page.type("#searchInput-from", from)
    await page.waitForTimeout(650)
    await keyboard.press("ArrowDown")
    await keyboard.press("Enter")

    await page.type("#searchInput-to", to)
    await page.waitForTimeout(650)
    await keyboard.press("ArrowDown")
    await keyboard.press("Enter")

    // Search for routes
    await page.click('div[data-e2e="search-button"] > button')

    // Get the current url
    const initialResultUrl = await page.url();

    // Get encoded cities and params I can't recreate from the URL
    const initialResultPageParams = new URLSearchParams(new URL(initialResultUrl).search);
    const departureCity = initialResultPageParams.get('departureCity');
    const arrivalCity = initialResultPageParams.get('arrivalCity');
    const route = initialResultPageParams.get('route');
    
    // Create and go to the next URL with filters
    const params: Record<string, string> = {
      departureCity: departureCity || '',
      arrivalCity: arrivalCity || '',
      rideDate: rideDate || '',
      route: route || '',
      adult: String(adult),
      student: String(student),
      children_0_5: String(children_0_5),
      children_6_17: String(children_6_17),
      bike_slot: String(bike_slot),
      senior: String(senior),
    };
    
    const finalResultPageUrl = `https://shop.flixbus.${website}/search?${new URLSearchParams(params)}`;
    
    crawler.addRequests([
        {
            url: finalResultPageUrl,
            label: "FINAL_RESULT_PAGE",
            userData: {
                data: {
                    finalResultPageUrl,
                    rideDate
                }
            }
        }
    ])
});


router.addHandler('FINAL_RESULT_PAGE', async ({ request, page, log }) => {
    log.info(`Running FINAL_RESULT_PAGE handler`)

    const { rideDate, finalResultPageUrl } = request.userData.data

    console.log(finalResultPageUrl)

    // Wait for content to load
    await page.waitForSelector('ul[data-e2e="search-result-list"]')

    // Get and load content to cheerio parser
    const content = await page.content();
    const $ = load(content);

    // Generate output
    const output = generateOutput($, finalResultPageUrl, rideDate)

    await Dataset.pushData(output)
});