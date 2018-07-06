import React, { Component } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class TimePeriodMenu extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeTab: "last24hours",
  };

  handleTabChange = (e, value) => {
    this.setState({ activeTab: value }, () => {
      // load data
      this.props.loadUsageSummary(value);
      this.props.loadUsageDetail(value);
    });
  };

  render() {
    return (
      <Tabs
        fullWidth
        value={this.state.activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={this.handleTabChange}
      >
        <Tab label="Last 24 Hours" value="last24hours" />
        <Tab label="Last 7 Days" value="last7days" />
        <Tab label="Last 30 Days" value="last30days" />
        <Tab label="Since Last Bill" value="lastBill" />
      </Tabs>
    );
  }
}

TimePeriodMenu.propTypes = {
  loadUsageSummary: PropTypes.func.isRequired,
  loadUsageDetail: PropTypes.func.isRequired,
};

export default TimePeriodMenu;
