import { combineReducers } from "redux";
import BillEstimator from "../BillEstimator";
const estimator = new BillEstimator();

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

const estimatedBill = (state = null, action) => {
  if (action.type === "USAGE_SUMMARY_LOADED") {
    return estimator.calculate(action.value.use, action.value.gen);
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

const isDetailVisible = (state = false, action) => {
  if (action.type === "SHOW_DETAILS") {
    return true;
  }
  if (action.type === "HIDE_DETAILS") {
    return false;
  }
  return state;
};

const rootReducer = combineReducers({
  timePeriod,
  usageSummary,
  estimatedBill,
  usageDetail,
  currentUsage,
  usageDetailIsLoading,
  isDetailVisible
});

export default rootReducer;
