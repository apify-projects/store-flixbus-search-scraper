import { CheerioAPI } from 'cheerio';
import { FromToResult } from '../interafaces';

export const getFromTo = ($: CheerioAPI): FromToResult => {
    const fromElement: any = $('#searchInput-from');
    const toElement: any = $('#searchInput-to');

    return {
        from: fromElement?.val()?.trim(),
        to: toElement?.val()?.trim(),
    };
};
