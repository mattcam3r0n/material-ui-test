import React, { Component } from "react";
import PropTypes from "prop-types";
// import logo from "./logo.svg";
import "./App.css";

// import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import timePeriods from "./timePeriods";
// import MiniDrawer from './components/scratch';

const styles = () => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    // backgroundColor: "#e5e6e6"
  },
});

class App extends Component {
  state = {
    intervalId: null
  }

  componentDidMount() {
    this.props.loadUsageSummary();
    this.props.loadUsageDetail();
    this.props.loadCurrentUsage();
    const usageIntervalId = setInterval(() => {
      console.log(this.props.timePeriod);
      this.props.loadUsageSummary(this.props.timePeriod || timePeriods.last24hours);
      this.props.loadUsageDetail(this.props.timePeriod || timePeriods.last24hours);
    }, 60000);
    const currentUsageIntervalId = setInterval(() => {
      this.props.loadCurrentUsage();
    }, 10000);
    this.setState({
      usageIntervalId,
      currentUsageIntervalId
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.usageIntervalId);
    clearInterval(this.state.currentUsageIntervalId);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Sidebar />
        <Main />
        {/* <MiniDrawer /> */}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loadUsageSummary: PropTypes.func.isRequired,
  loadUsageDetail: PropTypes.func.isRequired,
  loadCurrentUsage: PropTypes.func.isRequired,
  timePeriod: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(App);

// export default App;
