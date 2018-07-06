import { connect } from "react-redux";
import TimePeriodMenu from "../components/TimePeriodMenu";
import { loadUsageSummary, loadUsageDetail } from "../actions";

// function mapStateToProps(state) {
//   return {
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    loadUsageSummary(period) {
      dispatch(loadUsageSummary(period));
    },
    loadUsageDetail(period) {
      dispatch(loadUsageDetail(period));
    }
  };
}


export default connect(
  null,
  mapDispatchToProps
)(TimePeriodMenu);
