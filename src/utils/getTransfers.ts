export const getTransfers = (result$: any) => {
    const meansOfTransportElements = result$.find('span[data-e2e="search-result-means-of-transport-icon"]');
    const transfers = meansOfTransportElements?.children().length;
    return transfers ? transfers - 1 : -1;
};
