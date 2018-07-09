import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../node_modules/react-vis/dist/style.css";
import Usage from "./Usage";

class CurrentUsage extends Component {
  constructor(props) {
    super(props);
    this.setHoverValue = this.setHoverValue.bind(this);
    this.clearHoverValue = this.clearHoverValue.bind(this);
  }

  state = {
    hoverValue: null,
    used: [],
    generated: [],
  };

  setHoverValue(value) {
    this.setState({ hoverValue: value });
  }

  clearHoverValue() {
    this.setState({
      hoverValue: null,
    });
  }

  render() {
    const { used = [], generated = [] } = this.props.data;
    return (
      <Usage
        data={{
          used,
          generated,
        }}
      />
    );
  }

}

CurrentUsage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CurrentUsage;
