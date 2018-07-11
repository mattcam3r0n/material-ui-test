export function showDetails() {
  return function(dispatch) {
    dispatch({
      type: "SHOW_DETAILS",
      value: true,
    });
  };
}
