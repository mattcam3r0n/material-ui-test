import timePeriods from "../timePeriods";
import { usageSummaryLoaded } from "./usageSummaryLoaded";
export default function loadUsageSummary(period = timePeriods.last24hours) {
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
