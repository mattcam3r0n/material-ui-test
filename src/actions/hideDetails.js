export function hideDetails() {
  return function(dispatch) {
    dispatch({
      type: "HIDE_DETAILS",
      value: false,
    });
  };
}
