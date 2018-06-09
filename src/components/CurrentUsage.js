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
        <XYPlot width={200} height={300} stackBy="y">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            data={[
              {x: 2, y: 10},
              {x: 4, y: 5},
              // {x: 5, y: 15}
            ]}
          />
          <VerticalBarSeries
            data={[
              {x: 2, y: 12},
              {x: 4, y: 2},
              // {x: 5, y: 11}
            ]}
          />
        </XYPlot>
      </div>
    );
  }
}

export default CurrentUsage;
