import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class UsageSummary extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    used: [],
    generated: [],
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    console.log(this.props.data);
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
            <TableCell numeric>{usage[0].kWh}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Energy Generated
            </TableCell>
            <TableCell numeric>{usage[1].kWh}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Net
            </TableCell>
            <TableCell numeric>{usage[1].kWh - usage[0].kWh}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  // updateData() {
  //   const egService = new EGaugeService();
  //   egService.getCurrentUsage().then((usage) => {
  //     this.setState({
  //       used: usage.used.sort(sortKW).map((x, i) => {
  //         x.color = i;
  //         return x;
  //       }),
  //       generated: usage.generated,
  //     });
  //   });
  // }
}

UsageSummary.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UsageSummary;
