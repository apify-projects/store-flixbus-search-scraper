import { CheerioAPI } from 'cheerio';

export const getAmenities = (result$: any, $: CheerioAPI): string[] => {
    const amenities: string[] = [];
    const amenitiesContainerElement = result$.find('div[data-e2e="search-results-amenities"] > span');
    amenitiesContainerElement.children().each((i: number, item: any) => {
        const titleElement = $(item).find('title');
        amenities.push(titleElement.eq(i).text().trim());
    });
    return amenities;
};
