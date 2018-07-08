import timePeriods from "./timePeriods";

export default {
  timePeriod: timePeriods.last24hours,
  usageSummary: {
    usage: [{
      name: "use",
      kWh: 0
    },
    {
      name: "gen",
      kWh: 0
    }]
  },
  usageDetail: {},
  usageDetailIsLoading: false
};
