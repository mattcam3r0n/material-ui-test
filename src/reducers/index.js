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

const currentUsage = (state = {}, action) => {
  if (action.type === "CURRENT_USAGE_LOADED") {
    return action.value;
  }
  return state;
};

const usageDetailIsLoading = (state = false, action) => {
  if (action.type === "LOAD_USAGE_DETAIL") {
    return true;
  }
  if (action.type === "USAGE_DETAIL_LOADED") {
    return false;
  }
  return state;
};

const rootReducer = combineReducers({
  timePeriod,
  usageSummary,
  usageDetail,
  currentUsage,
  usageDetailIsLoading
});

export default rootReducer;
