import timePeriods from "../timePeriods";
import { loadUsageDetail } from "./loadUsageDetail";
import loadUsageSummary from "./loadUsageSummary";
export function setTimePeriod(period = timePeriods.last24hours) {
  return function(dispatch) {
    dispatch({
      type: "SET_TIME_PERIOD",
      value: period,
    });
    dispatch(loadUsageSummary(period));
    dispatch(loadUsageDetail(period));
  };
}
