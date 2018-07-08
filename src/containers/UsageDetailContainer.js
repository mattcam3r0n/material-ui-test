import { connect } from "react-redux";
import UsageDetail from "../components/UsageDetail";

function mapStateToProps(state) {
  return {
    usageDetail: state.usageDetail,
    usageDetailIsLoading: state.usageDetailIsLoading
  };
}

export default connect(
  mapStateToProps,
  null
)(UsageDetail);
