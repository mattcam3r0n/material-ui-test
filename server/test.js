import Egauge from "./Egauge";
console.log(Egauge);

const eg = new Egauge();

/* NOTES
* use d to get data in days, then skip N-1 days.
* use data from row 1 (not 0). always ignore first row.
* divide 3,600,000 to get kWh
* s should be 1 less than you're looking for.  if you want 3d usage, use 2. 1d, use 0.
* n should be 1 more than you'd expect.  n = 3 to get two rows back. and use row 2 (1).
* 
* Examples
* 1 day usage: d, s = 0, n = 3
* 3 day usage: d, s = 2, n = 3
* 30 day usage: d, s = 29, n = 3 
* 1 day usage from given start date: d, s=0, n=3, f=1529686996 (unix timestamp)


* fetch two specific points in time (more recent ts first)
http://egauge17632.egaug.es/cgi-bin/egauge-show?n=1&d&T=1529730000,1529470800

*/

eg.getStoredData({
  a: null,
  d: null, // data in days
  C: null,
  s: 0, // number of days - 1.  eg, 30 days, use 29.  3 days, use 2.
  n: 4,
  f: 1529730000
}).then((data) => {
  console.log(data.rows);
  console.log("use:", data.rows[1].cells[0] / 3600000);
  console.log("gen:", data.rows[1].cells[1] / 3600000);
});
