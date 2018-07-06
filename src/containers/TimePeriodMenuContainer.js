import { connect } from "react-redux";
import TimePeriodMenu from "../components/TimePeriodMenu";
import { loadUsageSummary } from "../actions";

// function mapStateToProps(state) {
//   return {
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    loadUsageSummary(period) {
      dispatch(loadUsageSummary(period));
    },
  };
}


export default connect(
  null,
  mapDispatchToProps
)(TimePeriodMenu);
