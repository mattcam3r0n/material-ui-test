import timePeriods from "timePeriods";

const excludedCategories = ["Grid", "Solar +"];
const generatedCategories = ["Solar "];

const defaultPeriod = timePeriods.last24hours;

export default class EGaugeService {
  getCurrentUsage() {
    return fetch("/current")
      .then((response) => response.json())
      .then((data) => {
        return filterInstantaneousData(data);
      });
  }

  getUsageDetail() {}

  getUsageSummary(period = defaultPeriod) {
    return fetch("/usage-summary/" + period).then((response) => response.json(period));
    // .then((data) => {
    //   return filterInstantaneousData(data);
    // });
  }

  getHistoricalUsage(period = defaultPeriod) {
    // return fetch("/history")
    return fetch("/usage/" + period)
      .then((response) => response.json())
      .then((data) => {
        return filterHistoricalData(data);
      });
  }
}

function filterInstantaneousData(data) {
  const usedData = data.filter((d) => d.type === "Used").map((d) => {
    return {
      x: d.type,
      y: d.kW,
      name: d.name,
      kW: Math.abs(Number(d.kW)),
    };
  });
  const generatedData = data.filter((d) => d.type === "Generated").map((d) => {
    return {
      x: d.type,
      y: d.kW,
      name: d.name,
      kW: Math.abs(Number(d.kW)),
    };
  });
  return {
    used: usedData,
    generated: generatedData,
  };
}

function filterHistoricalData(data) {
  const filteredData = data.columns
    .filter((d) => !excludedCategories.includes(d.name))
    .map((d) => {
      return {
        type: generatedCategories.includes(d.name) ? "Generated" : "Used",
        name: d.name,
        series: d.series.map((s) => {
          return {
            timeStamp: s.timeStamp,
            kW: s.kW / data.timeDelta,
          };
        }),
      };
    });
  return {
    used: filteredData.filter((d) => d.type === "Used"),
    generated: filteredData.filter((d) => d.type === "Generated"),
  };
}
