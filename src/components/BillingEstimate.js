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
    padding: 10,
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
    const { lineItems = [] } = this.props.data;
    return (
      <Table>
        <TableBody>
          {lineItems.map((li, i) => {
            return (
              <TableRow key={i}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableCell}
                >
                  {li.name}
                </TableCell>
                <TableCell numeric className={classes.tableCell}>
                  {numeral(li.amount).format("$0,0.00")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {/* <TableRow>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              Energy Used
            </TableCell>
            <TableCell numeric className={classes.tableCell}>
              {numeral(usedAmount).format("$0,0.00")}
            </TableCell>
          </TableRow> */}
        {/* <TableRow>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              Energy Generated
            </TableCell>
            <TableCell numeric className={classes.tableCell}>
              {numeral(generatedAmount).format("$0,0.00")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              Net
            </TableCell>
            <TableCell numeric className={classes.tableCell}>
              {numeral(total).format("$0,0.00")}
            </TableCell>
          </TableRow> */}
      </Table>
    );
  }
}

BillingEstimate.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(BillingEstimate);
