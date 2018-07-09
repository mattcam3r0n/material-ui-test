import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import PropTypes from "prop-types";

import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  XAxis,
  YAxis,
  Hint,
} from "react-vis";

class Usage extends Component {
  constructor(props) {
    super(props);
    this.setHoverValue = this.setHoverValue.bind(this);
    this.clearHoverValue = this.clearHoverValue.bind(this);
  }

  state = {
    hoverValue: null,
    used: [],
    generated: [],
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
    // this.updateData();
    // const intervalId = setInterval(() => {
    //   this.updateData();
    // }, 2000);
    // this.setState({
    //   intervalId,
    // });
  }

  componentWillUnmount() {
    // clearInterval(this.state.intervalId);
  }

  render() {
    const { used, generated } = sortData(this.props.data);
    const { width = 200, height = 300, yDomain = [0, 6000] } = this.props;
    const { hoverValue } = this.state;
    return (
      <div className="App">
        <XYPlot
          width={width}
          height={height}
          stackBy="y"
          yDomain={yDomain}
          xType="ordinal"
          colorType="linear"
          // colorDomain={[0, 1]}
          colorRange={["yellow", "red"]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis 
            style={{ fontSize: 8 }} />
          <YAxis
            tickFormat={(t) => t / 1000 + " kW"}
            style={{ fontSize: 8 }}
            // title="kW"
          />
          <VerticalBarSeries
            color="green"
            data={generated}
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
            data={used}
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

}

function sortData(data) {
  if (!data || !data.used) {
    return {
      used: [],
      generated: [],
    };
  }
  return {
    used: data.used.sort(sortKW).map((x, i) => {
      x.color = i;
      return x;
    }),
    generated: data.generated,
  };
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

Usage.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  yDomain: PropTypes.array
};

export default Usage;
