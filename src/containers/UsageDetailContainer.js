import { connect } from "react-redux";
import UsageDetail from "../components/UsageDetail";
import { showDetails } from "../actions/showDetails";

function mapStateToProps(state) {
  return {
    usageDetail: state.usageDetail,
    usageDetailIsLoading: state.usageDetailIsLoading,
    isDetailVisible: state.isDetailVisible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showDetails() {
      dispatch(showDetails());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsageDetail);
