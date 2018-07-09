import { currentUsageLoaded } from "./currentUsageLoaded";
export function loadCurrentUsage() {
  return function(dispatch) {
    dispatch({
      type: "LOAD_CURRENT_USAGE",
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
