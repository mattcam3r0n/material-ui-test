
import React, { Component } from "react";
import PropTypes from "prop-types";
// import logo from "./logo.svg";
import "./App.css";

// import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
// import MiniDrawer from './components/scratch';

const styles = () => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    // backgroundColor: "#e5e6e6"
  },
});

class App extends Component {
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
};

export default withStyles(styles, { withTheme: true })(App);

// export default App;
