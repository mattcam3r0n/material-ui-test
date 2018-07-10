import Egauge from "../Egauge";
import moment from "moment";

const timePeriods = {
  last24hours() {
    return {
      a: null,
      T:
        moment().unix() +
        "," +
        moment()
          .subtract(1, "days")
          .unix(),
    };
  },
  last7days() {
    return {
      a: null,
      T:
        moment().unix() +
        "," +
        moment()
          .subtract(7, "days")
          .unix(),
    };
  },
  last30days() {
    return {
      a: null,
      T:
        moment().unix() +
        "," +
        moment()
          .subtract(30, "days")
          .unix(),
    };
  },
};

export function usageSummary(request, response) {
  const { period } = request.params;
  const options = timePeriods[period]();
  const eg = new Egauge();
  eg.getStoredData(options).then((data) => {
    response.json(mapData(data));
  });
}

function mapData(data) {
  const useIndex = data.columns.findIndex((c) => c.name === "use");
  const genIndex = data.columns.findIndex((c) => c.name === "gen");

  // for each column, create a series object
  return {
    from: Number(data.rows[1].timeStamp) * 1000,
    to: Number(data.rows[0].timeStamp) * 1000,
    use: getKWH(data, useIndex),
    gen: getKWH(data, genIndex),
    usage: data.columns.map((c, i) => {
      return {
        type: c.type,
        name: c.name,
        kWh: getKWH(data, i)
      };
    }),
  };
}

function getKWH(data, index) {
  return Math.abs(data.rows[0].cells[index] - data.rows[1].cells[index]) / 3600000;
}
