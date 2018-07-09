import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import numeral from "numeral";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  tableCell: {
    padding: 10
  },
});

class BillingEstimate extends Component {
  state = {
    used: [],
    generated: [],
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { classes } = this.props;
    const { usage } = this.props.data;
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              Energy Used
            </TableCell>
            <TableCell numeric className={classes.tableCell}>
              {numeral(usage[0].kWh).format("0,0.0")} kWh
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              Energy Generated
            </TableCell>
            <TableCell numeric className={classes.tableCell}>
              {numeral(usage[1].kWh).format("0,0.0")} kWh
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              Net
            </TableCell>
            <TableCell numeric className={classes.tableCell}>
              {numeral(usage[0].kWh - usage[1].kWh).format("0,0.0")} kWh
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

BillingEstimate.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(BillingEstimate);