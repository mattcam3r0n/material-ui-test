import { connect } from "react-redux";
import BillingEstimate from "../components/BillingEstimate";

function mapStateToProps(state) {
  return {
    data: state.usageSummary
  };
}

export default connect(
  mapStateToProps,
  null
)(BillingEstimate);
