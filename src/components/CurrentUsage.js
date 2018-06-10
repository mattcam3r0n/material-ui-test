import React, { Component } from "react";
// import "./App.css";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  // LineSeries
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  XAxis,
  YAxis,
} from "react-vis";

class CurrentUsage extends Component {
  render() {
    return (
      <div className="App">
        <XYPlot
          width={200}
          height={300}
          stackBy="y"
          xType="ordinal"
          colorType="linear"
          // colorDomain={[0, 1]}
          colorRange={["orange", "red"]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            color="green"
            data={[
              { x: "Generated", y: 5 },
              // {x: 1, y: 15}
            ]}
          />
          <VerticalBarSeries
            data={[
              { x: "Used", y: 2, color: 0 },
            ]}
          />
          <VerticalBarSeries
            // color="orange"
            data={[
              { x: "Used", y: 5, color: 1 },
            ]}
          />
          <VerticalBarSeries
            data={[
              { x: "Used", y: 2, color: 3 },
            ]}
          />
        </XYPlot>
      </div>
    );
  }
}

export default CurrentUsage;
