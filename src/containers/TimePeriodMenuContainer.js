import { connect } from "react-redux";
import TimePeriodMenu from "../components/TimePeriodMenu";
import { loadUsageDetail } from "../actions/loadUsageDetail";
import loadUsageSummary from "../actions/loadUsageSummary";
import { setTimePeriod } from "../actions/setTimePeriod";

function mapStateToProps(state) {
  return {
    timePeriod: state.timePeriod
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTimePeriod(period) {
      dispatch(setTimePeriod(period));
    },
    loadUsageSummary(period) {
      dispatch(loadUsageSummary(period));
    },
    loadUsageDetail(period) {
      dispatch(loadUsageDetail(period));
    }
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimePeriodMenu);
