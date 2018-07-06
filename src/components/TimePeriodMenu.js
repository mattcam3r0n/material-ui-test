import React, { Component } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import timePeriods from "../timePeriods";

class TimePeriodMenu extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeTab: timePeriods.last24hours,
  };

  handleTabChange = (e, value) => {
    this.props.setTimePeriod(value);
    // this.setState({ activeTab: value }, () => {
    //   // load data
    //   this.props.loadUsageSummary(value);
    //   this.props.loadUsageDetail(value);
    // });
  };

  render() {
    return (
      <Tabs
        fullWidth
        value={this.props.timePeriod}
        indicatorColor="primary"
        textColor="primary"
        onChange={this.handleTabChange}
      >
        <Tab label="Last 24 Hours" value={timePeriods.last24hours} />
        <Tab label="Last 7 Days" value={timePeriods.last7days} />
        <Tab label="Last 30 Days" value={timePeriods.last30days} />
        <Tab label="Since Last Bill" value={timePeriods.lastBill} />
      </Tabs>
    );
  }
}

TimePeriodMenu.propTypes = {
  timePeriod: PropTypes.string,
  setTimePeriod: PropTypes.func.isRequired,
  loadUsageSummary: PropTypes.func.isRequired,
  loadUsageDetail: PropTypes.func.isRequired,
};

export default TimePeriodMenu;
