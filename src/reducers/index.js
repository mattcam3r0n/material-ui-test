import { combineReducers } from "redux";

const usageSummary = (state = {}, action) => {
  console.log('usageSummary reducer', state);
  return state;
};

const usageDetail = (state = {}, action) => {
  return state;
};

const rootReducer = combineReducers({
  usageSummary,
  usageDetail
});

export default rootReducer;
