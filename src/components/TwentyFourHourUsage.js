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
  Hint,
} from "react-vis";
import EGaugeService from "../lib/EGaugeService";

const timestamp = new Date().getTime();
const ONE_DAY = 24 * 60 * 60 * 1000; // ms in day

const colors = [
  "#FFFE0F",
  "#FCE30D",
  "#FAC90B",
  "#F8AE0A",
  "#F69408",
  "#F37906",
  "#F15F05",
  "#EF4403",
  "#ED2A01",
  "#EB1000",
];

class CurrentUsage extends Component {
  constructor(props) {
    super(props);
    this.setHoverSeries = this.setHoverSeries.bind(this);
    this.setHoverValue = this.setHoverValue.bind(this);
    this.clearHoverValue = this.clearHoverValue.bind(this);
  }

  state = {
    usedData: [],
    generatedData: {},
    hoverSeries: null,
    hoverValue: null,
  };

  componentDidMount() {
    this.updateData();
    const intervalId = setInterval(() => {
      this.updateData();
    }, 60000);
    this.setState({
      intervalId,
    });
  }

  componentWillUnmount() {}

  setHoverSeries(seriesName) {
    this.setState({ hoverSeries: seriesName });
  }

  setHoverValue(value) {
    this.setState({ hoverValue: value });
  }

  clearHoverValue() {
    this.setState({
      hoverSeries: null,
      hoverValue: null,
    });
  }

  render() {
    const { usedData, generatedData, hoverSeries, hoverValue } = this.state;
    return (
      <div className="App">
        <XYPlot
          width={800}
          height={300}
          xType="time"
          xDomain={[timestamp - ONE_DAY, timestamp]}
          yDomain={[0, 6000]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={-45} />
          <YAxis tickFormat={(v) => v / 1000 + " kW"} />
          <AreaSeries
            className="area-elevated-series-1"
            color="green"
            data={generatedData.series}
            opacity={0.75}
            onSeriesMouseOver={() => {
              this.setHoverSeries(generatedData.name);
            }}
            onSeriesMouseOut={() => {
              this.setHoverSeries(null);
            }}
            onNearestXY={(datapoint) => {
              if (hoverSeries === generatedData.name) {
                this.setHoverValue(datapoint);
              }
            }}
          />
          {usedData.map((s, i) => {
            return (
              <AreaSeries
                key={i}
                className="area-elevated-series-1"
                color={colors[i]}
                data={s.series}
                opacity={0.5}
                onSeriesMouseOver={() => {
                  this.setHoverSeries(s.name);
                }}
                onSeriesMouseOut={() => {
                  this.setHoverSeries(null);
                }}
                onNearestXY={(datapoint) => {
                  if (hoverSeries === s.name) {
                    this.setHoverValue(datapoint);
                  }
                }}
              />
            );
          })}
          {hoverSeries && hoverValue ? (
            <Hint
              value={hoverValue}
              format={(val) => [
                { title: val.name, value: (val.kW / 1000).toFixed(1) + " kW" },
              ]}
            />
          ) : null}
        </XYPlot>
      </div>
    );
  }

  updateData() {
    const egService = new EGaugeService();
    egService.getHistoricalUsage().then((usage) => {
      const mappedData = mapData(usage);
      this.setState({
        usedData: mappedData.used,
        generatedData: mappedData.generated,
      });
    });
  }
}

function mapData(data) {
  const stackedData = data.used.map((d, i) => {
    return {
      name: d.name,
      type: d.type,
      color: i, // assign a color index
      series: d.series.map((s, j) => {
        const yOffset = sumKW(data.used, i, j);
        return {
          x: s.timeStamp,
          y: yOffset + s.kW,
          y0: yOffset,
          kW: s.kW,
          name: d.name,
        };
      }),
    };
  });
  const gen = data.generated[0];
  const generatedData = {
    name: gen.name,
    type: gen.type,
    series: gen.series.map((s) => {
      return {
        x: s.timeStamp,
        y: s.kW,
        kW: s.kW,
        name: gen.name,
      };
    }),
  };
  return {
    used: stackedData,
    generated: generatedData,
  };
}

function sumKW(data, seriesIndex, valueIndex) {
  return data
    .filter((s, j) => j < seriesIndex)
    .reduce((sum, s) => sum + s.series[valueIndex].kW, 0);
}

export default CurrentUsage;
