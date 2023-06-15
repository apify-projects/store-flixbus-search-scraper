import { ProxyConfiguration, ProxyConfigurationOptions, Actor } from 'apify';

export const checkProxy = async ({
    proxyConfig,
    required = true,
}: {
    proxyConfig: ProxyConfigurationOptions | undefined;
    required?: boolean;
}): Promise<ProxyConfiguration | undefined> => {
    const configuration = await Actor.createProxyConfiguration(proxyConfig);

    if (Actor.isAtHome() && required) {
        if (!configuration || !configuration.newUrl()) {
            // eslint-disable-next-line no-throw-literal
            throw '\nWrong Input! You must use Apify proxy or custom proxies with this scraper!\n\n=======';
        }
    }

    return configuration;
};
