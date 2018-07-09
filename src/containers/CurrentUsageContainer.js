import { connect } from "react-redux";
import CurrentUsage from "../components/CurrentUsage";

function mapStateToProps(state) {
  return {
    data: state.currentUsage
  };
}

export default connect(
  mapStateToProps,
  null
)(CurrentUsage);
