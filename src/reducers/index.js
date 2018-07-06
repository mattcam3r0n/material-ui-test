import { combineReducers } from "redux";

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
  usageSummary,
  usageDetail
});

export default rootReducer;
