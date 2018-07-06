import { connect } from "react-redux";
import UsageSummary from "../components/UsageSummary";

function mapStateToProps(state) {
  return {
    data: state.usageSummary
  };
}

export default connect(
  mapStateToProps,
  null
)(UsageSummary);
