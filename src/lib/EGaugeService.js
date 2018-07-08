import timePeriods from "../timePeriods";

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
    return fetch("/usage-summary/" + period).then((response) =>
      response.json(period)
    );
  }

  getHistoricalUsage(period = defaultPeriod) {
    return fetch("/usage/" + period).then((response) => response.json());
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
