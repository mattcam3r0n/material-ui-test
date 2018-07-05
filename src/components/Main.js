import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CurrentUsage from "./CurrentUsage";
import TwentyFourHourUsage from "./TwentyFourHourUsage";
import EGaugeService from "../lib/EGaugeService";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper className={classes.summary}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell numeric>Calories</TableCell>
                      <TableCell numeric>Fat (g)</TableCell>
                      <TableCell numeric>Carbs (g)</TableCell>
                      <TableCell numeric>Protein (g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        test
                      </TableCell>
                      <TableCell numeric>x</TableCell>
                      <TableCell numeric>x</TableCell>
                      <TableCell numeric>x</TableCell>
                      <TableCell numeric>x</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.summary}>Usage By Category</Paper>
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
