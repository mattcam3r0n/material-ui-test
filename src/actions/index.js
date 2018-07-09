import timePeriods from "../timePeriods";

export function setTimePeriod(period = timePeriods.last24hours) {
  return function(dispatch) {
    dispatch({
      type: "SET_TIME_PERIOD",
      value: period
    });
    dispatch(loadUsageSummary(period));
    dispatch(loadUsageDetail(period));
  };
}

export function loadUsageSummary(period = timePeriods.last24hours) {
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

export function loadUsageDetail(period = timePeriods.last24hours) {
  return function(dispatch) {
    dispatch({
      type: "LOAD_USAGE_DETAIL"
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
    type: "USAGE_DETAIL_LOADED",
    value: detail,
  };
}

export function loadCurrentUsage() {
  return function(dispatch) {
    dispatch({
      type: "LOAD_CURRENT_USAGE"
    });
    fetch("/current/")
      .then((response) => {
        return response.json();
      })
      .then((usage) => {
        dispatch(currentUsageLoaded(usage));
      });
  };
}

export function currentUsageLoaded(usage) {
  return {
    type: "CURRENT_USAGE_LOADED",
    value: usage,
  };
}
