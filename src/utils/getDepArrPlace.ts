const getDepArrPlace = (result$: any, departure = true): string | undefined => {
  const depArrPlaceElement = result$.find(
    `div[data-e2e="search-result-${departure ? 'departure' : 'arrival'}-station"] > span:eq(1)`
  );

  return depArrPlaceElement?.text().trim();
};

export default getDepArrPlace;
