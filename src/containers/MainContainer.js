import { connect } from "react-redux";
import Main from "../components/Main";

function mapStateToProps(state) {
  return {
    timePeriod: state.timePeriod
  };
}

export default connect(
  mapStateToProps,
  null
)(Main);
