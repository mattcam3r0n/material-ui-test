import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import numeral from "numeral";

class UsageSummary extends Component {
  state = {
    used: [],
    generated: [],
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { usage } = this.props.data;
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Energy Used
            </TableCell>
            <TableCell numeric>
              {numeral(usage[0].kWh).format("0,0.0")} kWh
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Energy Generated
            </TableCell>
            <TableCell numeric>
              {numeral(usage[1].kWh).format("0,0.0")} kWh
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Net
            </TableCell>
            <TableCell numeric>
              {numeral(usage[0].kWh - usage[1].kWh).format("0,0.0")} kWh
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

UsageSummary.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UsageSummary;
