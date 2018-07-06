import { connect } from "react-redux";
import UsageBreakdown from "../components/UsageBreakdown";

function mapStateToProps(state) {
  return {
    data: state.usageSummary
  };
}

export default connect(
  mapStateToProps,
  null
)(UsageBreakdown);
