import Egauge from "../Egauge";

export function current(request, response) {
  const eg = new Egauge();
  eg.getInstantaneousData().then((data) => {
    response.json(data);
  });
}
