import { ProxyConfigurationOptions } from 'apify';
import { Request } from 'crawlee';
import { PlaywrightCrawlingContext, Dictionary } from 'crawlee';

export interface InputType {
    website: string;
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

export interface Handler extends Omit<PlaywrightCrawlingContext<Dictionary>, 'request'> {
    request: Request<Dictionary>;
}
  