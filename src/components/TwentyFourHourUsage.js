import React, { Component } from "react";
// import "./App.css";
import "../../node_modules/react-vis/dist/style.css";
import { XYPlot,
  // LineSeries 
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  AreaSeries,
  // LineMarkSeries
} from "react-vis";

class CurrentUsage extends Component {
  render() {
    return (
      <div className="App">
        <XYPlot width={800} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <AreaSeries
            className="area-elevated-series-1"
            color="#79c7e3"
            data={[
              { x: 1, y: 10, y0: 1 },
              { x: 2, y: 25, y0: 5 },
              { x: 3, y: 15, y0: 3 },
            ]}
            opacity={0.5}
          />
          <AreaSeries
            className="area-elevated-series-2"
            color="#12939a"
            data={[
              { x: 1, y: 15, y0: 6 },
              { x: 2, y: 20, y0: 11 },
              { x: 3, y: 10, y0: 9 },
            ]}
            opacity={0.5}
          />
          {/* <LineMarkSeries
            className="area-elevated-line-series"
            data={[{ x: 1, y: 5.5 }, { x: 2, y: 15 }, { x: 3, y: 9 }]}
          /> */}
        </XYPlot>
      </div>
    );
  }
}

export default CurrentUsage;
