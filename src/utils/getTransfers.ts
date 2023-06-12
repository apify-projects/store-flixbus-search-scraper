const getTransfers = (result$: any) => {
    const meansOfTransportElements = result$.find('span[data-e2e="search-result-means-of-transport-icon"]');
    return meansOfTransportElements?.children().length - 1
}

export default getTransfers