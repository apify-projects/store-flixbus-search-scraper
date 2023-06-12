interface DurationResult {
  text: string | undefined;
  value: number;
}

const getDuration = (result$: any, depTimestamp: number, arrTimestamp: number): DurationResult => {
  const durationElement = result$.find('span[data-e2e="search-result-duration"]');
  return {
    text: durationElement?.text().trim(),
    value: (arrTimestamp - depTimestamp) / 1000, // Converted to seconds
  };
};

export default getDuration;
