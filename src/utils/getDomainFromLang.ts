import { Domains } from '../interafaces';

const domains: Domains = {
    pl: '.pl',
    cs: '.cz',
    sk: '.sk',
    'en-gb': '.co.uk',
    es: '.es',
    'en-us': '.com',
    hr: '.hr',
    fr: '.fr',
};

export const getDomainFromLang = (lang: string) => {
    return domains[lang];
};
