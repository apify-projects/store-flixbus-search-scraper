import { Handler } from "../interafaces";

export default async ({ request, page, log, crawler }: Handler) => {
    const { from, to, website, senior, children_0_5, children_6_17, rideDate, adult, student, bike_slot } = request.userData.data

    log.info(`Running START handler`)

    log.info(request.url)

    try {
        // Accept cookies
        await page.click('button[data-testid="uc-accept-all-button"]')
    } catch (err) {
        // Means that pag
        console.log("Accept all button not found")
    }

    // Get keyboard to select from - to
    const keyboard = page.keyboard

    // Type and select from place -> to place
    await page.click("#searchInput-from")
    //await page.type("#searchInput-from", from)
    async function slowType(page: any, selector: string, text: string, delay: number) {
        const element = await page.$(selector);
        for (let i = 0; i < text.length; i++) {
          await element.type(text[i], { delay });
          await page.waitForTimeout(delay);
        }
    }

    await slowType(page, "#searchInput-from", from, 200)


    await page.waitForTimeout(500)
    await keyboard.press("ArrowDown")
    await keyboard.press("Enter")

    await page.click("#searchInput-to")
    await slowType(page, "#searchInput-to", to, 200)
    await page.waitForTimeout(500)
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
};