import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";

import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  XAxis,
  YAxis,
  Hint,
} from "react-vis";

import EGaugeService from "../lib/EGaugeService";

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
    this.updateData();
    const intervalId = setInterval(() => {
      this.updateData();
    }, 2000);
    this.setState({
      intervalId,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { hoverValue, usedData, generatedData } = this.state;
    return (
      <div className="App">
        <XYPlot
          width={200}
          height={300}
          stackBy="y"
          yDomain={[0, 6000]}
          xType="ordinal"
          colorType="linear"
          // colorDomain={[0, 1]}
          colorRange={["yellow", "red"]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis
            tickFormat={(t) => t / 1000 + " kW"}
            // title="kW"
          />
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
            stroke="white"
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
    const egService = new EGaugeService();
    egService.getCurrentUsage().then((usage) => {
      this.setState({
        usedData: usage.used.sort(sortKW).map((x, i) => {
          x.color = i;
          return x;
        }),
        generatedData: usage.generated,
      });
    });
  }
}

function sortKW(a, b) {
  if (a.kW < b.kW) {
    return -1;
  }
  if (a.kW > b.kW) {
    return 1;
  }
  return 0;
}

export default CurrentUsage;
