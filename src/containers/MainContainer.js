import { connect } from "react-redux";
import Main from "../components/Main";
import { hideDetails } from "../actions/hideDetails";

function mapStateToProps(state) {
  return {
    timePeriod: state.timePeriod,
    isDetailVisible: state.isDetailVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideDetails() {
      dispatch(hideDetails());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
