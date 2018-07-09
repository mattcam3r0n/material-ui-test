export function usageSummaryLoaded(summary) {
  return {
    type: "USAGE_SUMMARY_LOADED",
    value: summary,
  };
}
