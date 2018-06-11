import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import Egauge from "../lib/Egauge";

import {
  XYPlot,
  // LineSeries
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  XAxis,
  YAxis,
  Hint,
} from "react-vis";

class CurrentUsage extends Component {
  constructor(props) {
    super(props);
    this.setHoverValue = this.setHoverValue.bind(this);
    this.clearHoverValue = this.clearHoverValue.bind(this);
  }

  state = {
    hoverValue: null,
    usedData: [],
    generatedData: [],
  };

  setHoverValue(value) {
    this.setState({ hoverValue: value });
  }

  clearHoverValue() {
    this.setState({
      hoverValue: null,
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.updateData();
    }, 2000);
  }

  componentWillUnmount() {}

  render() {
    const { hoverValue, usedData, generatedData } = this.state;
    return (
      <div className="App">
        <XYPlot
          width={200}
          height={300}
          stackBy="y"
          xType="ordinal"
          colorType="linear"
          // colorDomain={[0, 1]}
          colorRange={["yellow", "red"]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickFormat={(t) => t / 1000 + "kW"} />
          <VerticalBarSeries
            color="green"
            data={generatedData}
            onValueMouseOver={this.setHoverValue}
            onValueMouseOut={this.clearHoverValue}
          />
          {hoverValue ? (
            <Hint
              value={hoverValue}
              format={(val) => [
                { title: val.name, value: val.kW / 1000 + " kW" },
              ]}
            />
          ) : null}
          <VerticalBarSeries
            onValueMouseOver={this.setHoverValue}
            onValueMouseOut={this.clearHoverValue}
            // color="orange"
            data={usedData}
          />
          {hoverValue ? (
            <Hint
              value={hoverValue}
              format={(val) => [
                { title: val.name, value: val.kW / 1000 + " kW" },
              ]}
            />
          ) : null}
        </XYPlot>
      </div>
    );
  }

  updateData() {
    const eg = new Egauge();
    eg.getInstantaneousData().then((data) => {
      const usedData = data.filter((d) => d.type === "Used").map((d, i) => {
        return {
          x: d.type,
          y: d.kW,
          color: i,
          name: d.name,
          kW: Math.abs(Number(d.kW)),
        };
      });
      const generatedData = data
        .filter((d) => d.type === "Generated")
        .map((d) => {
          return {
            x: d.type,
            y: d.kW,
            name: d.name,
            kW: Math.abs(Number(d.kW)),
          };
        });
      console.log("updateData", usedData, generatedData);

      this.setState({
        usedData,
        generatedData,
      });
    });
  }
}

export default CurrentUsage;
