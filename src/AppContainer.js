import App from "./App";
import "./App.css";
import { connect } from "react-redux";
import { loadUsageSummary } from "./actions";

function mapStateToProps(state) {
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
    // loadPrices(tickers) {
    //   dispatch(loadPrices(tickers));
    // },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
