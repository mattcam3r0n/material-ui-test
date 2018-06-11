const xml2js = require("xml2js");

class Egauge {
  constructor(host = "egauge17632.egaug.es") {
    this.host = host;
    this.instantUri = "/cgi-bin/egauge";
    this.storedUri = "/cgi-bin/egauge-show";
  }

  getInstantaneousData() {
    const excludedCategories = ["Grid", "Solar +"];
    const generatedCategories = ["Solar "];
    return getData(this.instantUri, { inst: "" })
      .then(transformInstantaneous)
      .then((result) => {
        // const used = result.r.filter((r) => !usedCategories.includes(r.n));
        // const generated = result.r.filter(
        //   (r) => !generatedCategories.includes(r.n)
        // );
        return result.r
          .filter((r) => !excludedCategories.includes(r.n))
          .map((r) => {
            return {
              type: generatedCategories.includes(r.n) ? "Generated" : "Used",
              name: r.n,
              kW: Math.abs(Number(r.i)),
            };
          });
      });
  }

  getStoredData() {}
}

function getData(uri, options = {}) {
  const uriWithOptions = uri + buildQueryString(options);
  return fetch(uriWithOptions, {
    method: "GET",
    headers: {
      "Content-Type": "text/xml",
    },
    mode: "no-cors",
  })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      return xmlToJson(text);
    })
    .then((json) => {
      return json;
    });
}

function buildQueryString(options) {
  let qs = "?";
  Object.keys(options).forEach((k) => {
    qs += k + (options[k] ? "=" + options[k] : "") + "&";
  });
  return qs;
}

function xmlToJson(xml) {
  console.log("xml", xml);
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function transformInstantaneous(json) {
  const data = {
    serial: json.data.$.serial,
    ts: json.data.ts,
    r: json.data.r.map((r) => {
      const reg = {
        t: r.$.t,
        n: r.$.n,
        v: r.v[0],
      };
      if (r.i) {
        reg.i = r.i[0];
      }
      if (r.$.rt) {
        reg.rt = r.$.rt;
      }
      return reg;
    }),
  };
  return Promise.resolve(data);
}

// function transformStored(json) {}

export default Egauge;
