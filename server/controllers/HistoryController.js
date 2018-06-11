import Egauge from "../Egauge";

export function history(request, response) {
  const eg = new Egauge();
  eg.getStoredData().then((data) => {
    console.log("componentDidMount storedData", data);
    response.json(data);
  });
}
