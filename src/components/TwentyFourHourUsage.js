import React, { Component } from "react";
// import "./App.css";
// import Egauge from "../lib/Egauge";

import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  AreaSeries,
} from "react-vis";
import EGaugeService from "../lib/EGaugeService";

const timestamp = new Date().getTime();
const ONE_DAY = 24 * 60 * 60 * 1000; // ms in day

class CurrentUsage extends Component {
  componentDidMount() {
    this.updateData();
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="App">
        <XYPlot
          width={800}
          height={300}
          xType="time"
          xDomain={[timestamp - ONE_DAY, timestamp]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={-45} />
          <YAxis />
          <AreaSeries
            className="area-elevated-series-1"
            color="#79c7e3"
            data={[
              { x: new Date(), y: 10 },
              { x: new Date(), y: 25 },
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

  updateData() {
    const egService = new EGaugeService();
    egService.getHistoricalUsage().then((usage) => {
      console.log(usage);
    });
  }
}

export default CurrentUsage;
