import { ProxyConfigurationOptions } from 'apify';
import { Request, PlaywrightCrawlingContext, Dictionary } from 'crawlee';

export interface InputType {
    lang: string;
    from: string;
    to: string;
    rideDate: string;
    adult: number;
    student: number;
    children_0_5: number;
    children_6_17: number;
    bike_slot: number;
    senior: number;
    proxyConfiguration: ProxyConfigurationOptions
}

export interface DurationResult {
    text: string | undefined;
    value: number;
}

export interface FromToResult {
    from: string | undefined;
    to: string | undefined;
  }

export interface Handler extends Omit<PlaywrightCrawlingContext<Dictionary>, 'request'> {
    request: Request<Dictionary>;
}

export interface DepArr {
    time: DepArrTime,
    place: string
}

export interface DepArrTime {
    text: string,
    timestamp: number
}

export interface Duration {
    text: string,
    value: number
}

export interface Fare {
    text: string,
    symbol: string,
    price: number
}

export interface Route {
    isSoldOut: boolean,
    arrival: DepArr
    departure: DepArr
    fare: Fare | undefined
    amenities: string[],
    duration: Duration,
    transfers: number
}

export interface Output {
    passengers: string[]
    lang: string,
    url: string;
    date: string;
    from: string;
    to: string;
    currency: string;
    routes: Route[];
}

export interface Currencies {
    [key: string]: string
}

export interface Domains {
    [key: string]: string
}
