import fetch from "node-fetch";
import xml2js from "xml2js";

class Egauge {
  constructor(host = "egauge17632.egaug.es") {
    this.host = host;
    this.instantUri = `http://${host}/cgi-bin/egauge`;
    this.storedUri = `http://${host}/cgi-bin/egauge-show`;
  }

  getInstantaneousData() {
    const excludedCategories = ["Grid", "Solar +"];
    const generatedCategories = ["Solar "];
    return getData(this.instantUri, { inst: "" })
      .then(transformInstantaneous)
      .then((result) => {
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

  getStoredData() {
    // const excludedCategories = ["Grid", "Solar +"];
    // const generatedCategories = ["Solar "];
    return getData(this.storedUri, { e: null, m: null, C: null, s: 1, n: 720 })
      .then((result) => {
        return transformStored(result);
      })
      .then((result) => {
        return result;
      });
  }
}

function getData(uri, options = {}) {
  const uriWithOptions = uri + buildQueryString(options);
  return fetch(uriWithOptions, {
    method: "GET",
    headers: {
      "Content-Type": "text/xml",
      "cache-control": "no-cache",
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
  return qs.substring(0, qs.length - 1);
}

function xmlToJson(xml) {
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

function transformStored(json) {
  const data = {
    serial: json.group.$.serial,
    delta: json.group.data[0].$.delta,
    epoch: json.group.data[0].$.epoch,
    timeDelta: json.group.data[0].$.time_delta,
    timeStamp: json.group.data[0].$.time_stamp,
    columns: json.group.data[0].cname.map((c) => {
      return {
        type: c.$.t,
        name: c._
      };
    }),
    rows: json.group.data[0].r.map((r) => {
      return {
        cells: r.c.map((v) => Number(v))
      };
    }),
  };
  return Promise.resolve(data);
}

export default Egauge;
