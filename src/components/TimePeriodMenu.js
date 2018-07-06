import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class TimePeriodMenu extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeTab: "last24hours",
  };

  componentDidMount() {}

  componentWillUnmount() {}

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
};

export default TimePeriodMenu;
