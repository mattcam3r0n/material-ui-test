import App from "./App";
import "./App.css";
import { connect } from "react-redux";
import loadUsageSummary from "./actions/loadUsageSummary";
import { loadUsageDetail } from "./actions/loadUsageDetail";
import { loadCurrentUsage } from "./actions/loadCurrentUsage";

function mapStateToProps(state) {
  return {
    timePeriod: state.timePeriod
    // stocks: state.stocks,
    // prices: state.prices,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsageSummary(period) {
      dispatch(loadUsageSummary(period));
    },
    loadUsageDetail(period) {
      dispatch(loadUsageDetail(period));
    },
    loadCurrentUsage() {
      dispatch(loadCurrentUsage());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
