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
  // for each column, create a series object
  return {
    from: Number(data.rows[1].timeStamp) * 1000,
    to: Number(data.rows[0].timeStamp) * 1000,
    usage: data.columns.map((c, i) => {
      return {
        type: c.type,
        name: c.name,
        kWh: Math.abs(data.rows[0].cells[i] - data.rows[1].cells[i]) / 3600000,
      };
    }),
  };
}
