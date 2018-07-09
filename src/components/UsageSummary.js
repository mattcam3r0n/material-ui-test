import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
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
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell numeric>Calories</TableCell>
            <TableCell numeric>Fat (g)</TableCell>
            <TableCell numeric>Carbs (g)</TableCell>
            <TableCell numeric>Protein (g)</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Energy Used
            </TableCell>
            <TableCell numeric>{numeral(usage[0].kWh).format("0,0.0")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Energy Generated
            </TableCell>
            <TableCell numeric>{numeral(usage[1].kWh).format("0,0.0")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Net
            </TableCell>
            <TableCell numeric>{numeral(usage[1].kWh - usage[0].kWh).format("0,0.0")}</TableCell>
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
