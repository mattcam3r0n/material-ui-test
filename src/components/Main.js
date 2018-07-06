import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CurrentUsage from "./CurrentUsage";
import TwentyFourHourUsage from "./TwentyFourHourUsage";
import EGaugeService from "../lib/EGaugeService";
import UsageSummary from "../containers/UsageSummaryContainer";
import UsageBreakdown from "../containers/UsageBreakdownContainer";
import TimePeriodMenu from "../containers/TimePeriodMenuContainer";

const styles = (theme) => ({
  root: {
    marginTop: 80,
    marginLeft: 20,
    marginRight: 20,
    flexGrow: 1,
    overflow: "auto",
  },
  twentyFourHourUsage: {
    height: 320,
    width: 820,
    padding: 20,
  },
  toolbar: {},
  summary: {
    padding: 20,
  },
  currentUsage: {
    height: 320,
    width: 220,
    padding: 20,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class GuttersGrid extends React.Component {
  state = {
    spacing: "16",
    data: {},
  };

  handleChange = (key) => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={8}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(spacing)}
          >
            <Grid item xs={12}>
              <Paper className={classes.toolbar}>
                <TimePeriodMenu />
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper className={classes.summary}>
                <UsageSummary />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.summary}>
                <UsageBreakdown />
              </Paper>
            </Grid>

            <Grid item>
              <Paper className={classes.twentyFourHourUsage}>
                <TwentyFourHourUsage />
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.currentUsage}>
                <CurrentUsage />
              </Paper>
            </Grid>
            {/* <Grid item>
              <Paper className={classes.currentUsage}>
                <Usage
                  data={this.state.data}
                  height={120}
                  width={120}
                  yDomain={null}
                />
              </Paper>
            </Grid> */}
          </Grid>
          {/* 
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(spacing)}
          >
            {[0, 1, 2].map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid> */}
        </Grid>
      </Grid>
    );
  }

  getData() {
    const egService = new EGaugeService();
    egService.getCurrentUsage().then((usage) => {
      this.setState({
        data: usage,
      });
    });
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);
