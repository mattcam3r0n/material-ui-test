export function loadUsageSummary(period = "last24hours") {
  return function(dispatch) {
    dispatch({
      type: "LOAD_USAGE_SUMMARY",
    });
    fetch("/usage-summary/" + period)
      .then((response) => {
        return response.json();
      })
      .then((summary) => {
        dispatch(usageSummaryLoaded(summary));
      });
  };
}

export function usageSummaryLoaded(summary) {
  return {
    type: "USAGE_SUMMARY_LOADED",
    value: summary,
  };
}
