export default class EGaugeService {

  getCurrentUsage() {
    return fetch("/current")
      .then((response) => response.json())
      .then((json) => {
        return json;
      });
  }

  getHistoricalUsage() {
    return fetch("/history")
      .then((response) => response.json())
      .then((json) => {
        return json;
      });    
  }
}
