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

export function loadUsageDetail(period = "last24hours") {
  return function(dispatch) {
    dispatch({
      type: "LOAD_USAGE_DETAIL",
    });
    fetch("/usage/" + period)
      .then((response) => {
        return response.json();
      })
      .then((detail) => {
        dispatch(usageDetailLoaded(detail));
      });
  };
}

export function usageDetailLoaded(detail) {
  return {
    type: "USAGE_SUMMARY_DETAIL",
    value: detail,
  };
}
