import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CurrentUsage from "../containers/CurrentUsageContainer";
import UsageDetail from "../containers/UsageDetailContainer";
import UsageSummary from "../containers/UsageSummaryContainer";
import BillingEstimate from "../containers/BillingEstimate";
import UsageBreakdown from "../containers/UsageBreakdownContainer";
import TimePeriodMenu from "../containers/TimePeriodMenuContainer";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({
  root: {
    marginTop: 80,
    marginLeft: 20,
    marginRight: 20,
    flexGrow: 1,
    overflow: "auto",
  },
  cardHeader: {
    padding: 10
  },
  cardContent: {
    padding: 10
  },
  usageDetail: {
    padding: 10,
  },
  toolbar: {},
  summary: {
    padding: 10,
  },
  currentUsage: {
    padding: 10,
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

            <Grid item xs={3}>
              <Card>
                <CardHeader subheader="Usage Summary" className={classes.cardHeader} />
                <CardContent className={classes.cardContent}>
                  <UsageSummary />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card>
                <CardHeader subheader="Usage Breakdown" className={classes.cardHeader} />
                <CardContent className={classes.cardContent}>
                  <UsageBreakdown />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card>
                <CardHeader subheader="Billing Estimate" />
                <CardContent className={classes.cardContent}>
                  <BillingEstimate />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={9}>
              <Card>
                <CardHeader subheader="Usage Over Time Period" />
                <CardContent>
                  <UsageDetail />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardHeader subheader="Current Usage" />
                <CardContent>
                  <CurrentUsage />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);
