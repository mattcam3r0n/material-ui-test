import Egauge from "../Egauge";

export function current(request, response) {
  const eg = new Egauge();
  eg.getInstantaneousData().then((data) => {
    const usedData = data.filter((d) => d.type === "Used").map((d, i) => {
      return {
        x: d.type,
        y: d.kW,
        color: i,
        name: d.name,
        kW: Math.abs(Number(d.kW)),
      };
    });
    const generatedData = data
      .filter((d) => d.type === "Generated")
      .map((d) => {
        return {
          x: d.type,
          y: d.kW,
          name: d.name,
          kW: Math.abs(Number(d.kW)),
        };
      });

    response.json({
      used: usedData,
      generated: generatedData,
    });
  });
}
// import fetch from "node-fetch";
// // const fetch = require('node-fetch');

// fetch("http://egauge17632.egaug.es/cgi-bin/egauge-show?e&m&C&s=1&n=720", {
//   method: "GET",
//   headers: {
//     "Content-Type": "text/xml",
//     "cache-control": "no-cache",
//   },
//   mode: "no-cors",
// })
//   .then((response) => {
//     return response.text();
//   })
//   .then((text) => {
//     console.log(text);
//     // return xmlToJson(text);
//   })
//   .then((json) => {
//     console.log(json);
//     return json;
//   })
