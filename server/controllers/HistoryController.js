import Egauge from "../Egauge";

export function history(request, response) {
  const eg = new Egauge();
  eg.getStoredData().then((data) => {
    response.json(mapData(data));
  });
}

function mapData(data) {
  // for each column, create a series object
  return {
    serial: data.serial,
    delta: data.delta,
    epoch: data.epoch,
    timeDelta: Number(data.timeDelta),
    timeStamp: Number(data.timeStamp) * 1000, // convert to ms
    columns: data.columns.map((c, i) => {
      return {
        type: c.type,
        name: c.name,
        series: data.rows.slice(1).map((r, j) => {
          // calc timestamp from starting value, multiply by 1000
          const ts = (data.timeStamp - data.timeDelta * j) * 1000;
          return {
            timeStamp: ts,
            kW: Math.abs(r.cells[i]),
          };
        }),
      };
    }),
  };
}
