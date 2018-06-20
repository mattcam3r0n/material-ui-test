import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import Usage from "./Usage";

import EGaugeService from "../lib/EGaugeService";

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

  componentDidMount() {
    this.updateData();
    const intervalId = setInterval(() => {
      this.updateData();
    }, 2000);
    this.setState({
      intervalId,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { used, generated } = this.state;
    return (
      <Usage data={{
        used,
        generated
      }} />
    );
  }

  updateData() {
    const egService = new EGaugeService();
    egService.getCurrentUsage().then((usage) => {
      this.setState({
        used: usage.used,
        generated: usage.generated,
      });
    });
  }
}

export default CurrentUsage;
