import timePeriods from "../timePeriods";
import { usageDetailLoaded } from "./usageDetailLoaded";
export function loadUsageDetail(period = timePeriods.last24hours) {
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
