import { CheerioAPI } from 'cheerio';

interface FromToResult {
  from: string | undefined;
  to: string | undefined;
}

const getFromTo = ($: CheerioAPI): FromToResult => {
  const fromElement: any = $('#searchInput-from');
  const toElement: any = $('#searchInput-to');

  return {
    from: fromElement?.val()?.trim(),
    to: toElement?.val()?.trim(),
  };
};

export default getFromTo;
