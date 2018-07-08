import App from "./App";
import "./App.css";
import { connect } from "react-redux";
import { loadUsageSummary, loadUsageDetail } from "./actions";

function mapStateToProps() {
  return {
    // stocks: state.stocks,
    // prices: state.prices,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsageSummary() {
      dispatch(loadUsageSummary());
    },
    loadUsageDetail() {
      dispatch(loadUsageDetail());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
