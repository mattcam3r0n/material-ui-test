import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Usage from "./Usage";
import timePeriods from "../timePeriods";

import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineSeries,
  AreaSeries,
  Hint,
} from "react-vis";
import EGaugeService from "../lib/EGaugeService";

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

const styles = () => ({
  progress: {
    marginTop: 125,
  },
  detailsDiv: {
    border: "solid 1px black",
    backgroundColor: "white",
    padding: 5,
  },
});

class UsageDetail extends Component {
  constructor(props) {
    super(props);
    this.setHoverSeries = this.setHoverSeries.bind(this);
    this.setHoverValue = this.setHoverValue.bind(this);
    this.setDetailsValue = this.setDetailsValue.bind(this);
    this.clearHoverValue = this.clearHoverValue.bind(this);
  }

  state = {
    hoverSeries: null,
    hoverValue: null,
    detailsValue: null,
    activeTab: timePeriods.last24hours,
  };

  componentDidMount() {
    // this.updateData();
    // const intervalId = setInterval(() => {
    //   this.updateData();
    // }, 60000);
    // this.setState({
    //   intervalId,
    // });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setHoverSeries(seriesName) {
    this.setState({ hoverSeries: seriesName });
  }

  setHoverValue(value) {
    this.setState({ hoverValue: value });
  }

  setDetailsValue(value, info) {
    const { usageDetail } = this.props;
    if (
      !info ||
      !info.index ||
      !usageDetail.used ||
      usageDetail.used.length === 0
    ) {
      return;
    }
    const used = usageDetail.used.map((d) => {
      const s = d.series[info.index];
      return {
        name: d.name,
        x: d.type,
        y: s.kW,
        kW: s.kW,
      };
    });
    const gend = {
      name: usageDetail.generated[0].name,
      x: usageDetail.generated[0].type,
      y: usageDetail.generated[0].series[info.index].kW,
      kW: usageDetail.generated[0].series[info.index].kW,
    };
    this.setState({
      detailsValue: {
        x: value.x,
        y: 0,
        maxY: 6000,
        used,
        generated: gend,
      },
    });
  }

  clearHoverValue() {
    this.setState({
      hoverSeries: null,
      hoverValue: null,
    });
  }

  render() {
    const { classes } = this.props;
    const { hoverSeries, hoverValue, detailsValue } = this.state;
    const isLoading = this.props.usageDetailIsLoading;
    const { generated = { series: [] }, used = [] } = mapData(
      this.props.usageDetail
    );
    return (
      <div className="App">
        <XYPlot
          width={800}
          height={280}
          xType="time"
          // xDomain={[timestamp - ONE_DAY, timestamp]}
          yDomain={[0, 6000]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={-45} />
          <YAxis tickFormat={(v) => v / 1000 + " kW"} />
          <AreaSeries
            className="area-elevated-series-1"
            color="green"
            data={generated.series}
            opacity={0.75}
            onSeriesMouseOver={() => {
              this.setHoverSeries(generated.name);
            }}
            onSeriesMouseOut={() => {
              this.setHoverSeries(null);
            }}
            onNearestXY={(datapoint) => {
              if (hoverSeries === generated.name) {
                this.setHoverValue(datapoint);
              }
            }}
          />
          {used.map((s, i) => {
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
                // onNearestX={(datapoint, info) => {
                //   this.setDetailsValue(datapoint, info);
                // }}
                onNearestXY={(datapoint, info) => {
                  this.setDetailsValue(datapoint, info);
                  if (hoverSeries === s.name) {
                    this.setHoverValue(datapoint);
                  }
                }}
              />
            );
          })}
          {hoverValue ? (
            <Hint
              value={hoverValue}
              format={this.hintFormat}
              // align={{ horizontal: Hint.AUTO, vertical: Hint.ALIGN.TOP_EDGE }}
            />
          ) : null}
          {detailsValue ? (
            <LineSeries
              data={[
                { x: detailsValue.x, y: detailsValue.y },
                { x: detailsValue.x, y: detailsValue.maxY },
              ]}
              stroke="black"
            />
          ) : null}
          {detailsValue ? (
            <Hint
              value={detailsValue}
              format={this.hintFormat}
              align={{ horizontal: Hint.AUTO, vertical: Hint.ALIGN.TOP_EDGE }}
            >
              <div className={classes.detailsDiv}>
                <Usage
                  data={{
                    used: detailsValue.used,
                    generated: [detailsValue.generated],
                  }}
                  height={120}
                  width={120}
                  yDomain={null}
                />
              </div>
            </Hint>
          ) : null}
        </XYPlot>
        <br />
        {isLoading ? <LinearProgress /> : null}
      </div>
    );
  }

  hintFormat(val) {
    const labels = [
      {
        title: val.name,
        value: (val.kW / 1000).toFixed(1) + " kW",
      },
    ];
    if (val.type === "Used") {
      labels.push({
        title: "Total",
        value: (val.totalKW / 1000).toFixed(1) + " kW",
      });
    }
    return labels;
  }

  updateData() {
    const egService = new EGaugeService();
    this.setState({ isLoading: true }, () => {
      egService.getHistoricalUsage(this.state.activeTab).then((usage) => {
        const mappedData = mapData(usage);
        this.setState({
          usedData: mappedData.used,
          generatedData: mappedData.generated,
          isLoading: false,
        });
      });
    });
  }
}

function mapData(data) {
  if (!data || !data.used) {
    return {
      used: [],
      generated: [],
    };
  }
  const stackedData = data.used.map((d, i) => {
    return {
      name: d.name,
      type: d.type,
      series: d.series.map((s, j) => {
        const yOffset = sumKW(data.used, i, j);
        const totalKW = sumKW(data.used, data.used.length, j);
        return {
          x: s.timeStamp,
          y: yOffset + s.kW,
          y0: yOffset,
          kW: s.kW,
          totalKW,
          name: d.name,
          type: d.type,
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

UsageDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  usageDetail: PropTypes.object.isRequired,
  usageDetailIsLoading: PropTypes.bool,
};

export default withStyles(styles)(UsageDetail);
