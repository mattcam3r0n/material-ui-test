import { combineReducers } from "redux";

const timePeriod = (state = "last24hours", action) => {
  if (action.type === "SET_TIME_PERIOD") {
    return action.value;
  }
  return state;
};

const usageSummary = (state = {}, action) => {
  if (action.type === "USAGE_SUMMARY_LOADED") {
    return action.value;
  }
  return state;
};

const usageDetail = (state = {}, action) => {
  if (action.type === "USAGE_DETAIL_LOADED") {
    return action.value;
  }
  return state;
};

const rootReducer = combineReducers({
  timePeriod,
  usageSummary,
  usageDetail
});

export default rootReducer;
