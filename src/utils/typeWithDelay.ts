const typeWithDelay = async (page: any, selector: string, text: string, delay: number) => {
    const element = await page.$(selector);
    for (let i = 0; i < text.length; i++) {
      await element.type(text[i], { delay });
      await page.waitForTimeout(delay);
    }
}

export default typeWithDelay