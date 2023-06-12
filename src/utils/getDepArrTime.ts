import { reformatFlixbusDateStringToJSDate } from './reformatDate.js';

const getDepArrTime = (result$: any, rideDate: string, departure = true) => {
  let depArrTime = '';

  if (departure) {
    const depArrTimeElement = result$.find(`div[data-e2e="search-result-departure-time"] > span:eq(1)`);
    depArrTime = depArrTimeElement?.text().trim();
  } else {
    const depArrTimeElement = result$.find(`div[data-e2e="search-result-arrival-time"]`);

    const depArrTimeChildren = depArrTimeElement.children();
    // True if arrival date is not different from today's date
    if (depArrTimeChildren?.length > 1) {
      depArrTime = depArrTimeChildren.eq(1)?.text().trim();
    } else {
      depArrTime = depArrTimeElement.find("span > span:eq(1)")?.text().trim();
    }
  }

  return {
    timestamp: reformatFlixbusDateStringToJSDate(rideDate, depArrTime),
    text: depArrTime,
  };
};

export default getDepArrTime;
