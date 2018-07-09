const rateSchedule = [
  {
    type: "tiered",
    name: "Tier 1: 0 - 500 kWh",
    min: 0,
    max: 500,
    rate: 0.037
  },
  {
    type: "tiered",
    name: "Tier 2: 501 - 1000 kWh",
    min: 500,
    max: 1000,
    rate: 0.056
  },
  {
    type: "tiered",
    name: "Tier 3: 1001 - 1500 kWh",
    min: 1000,
    max: 1500,
    rate: 0.07868
  },
  {
    type: "tiered",
    name: "Tier 4: 1501 - 2500 kWh",
    min: 1500,
    max: 2500,
    rate: 0.0768
  },
  {
    type: "tiered",
    name: "Tier 5: > 250 kWh",
    min: 2500,
    max: Number.MAX_SAFE_INTEGER,
    rate: 0.0768
  },
  {
    type: "flat",
    name: "Power Supply Adjustment",
    rate: 0.03007
  },
  {
    type: "flat",
    name: "Customer Assistance Program",
    rate: 0.00118
  },
  {
    type: "flat",
    name: "Service Area Street Lighting",
    rate: 0.0
  },
  {
    type: "flat",
    name: "Energy Efficiency Programs",
    rate: 0.00251
  },
  {
    type: "flat",
    name: "Regulatory Charge",
    rate: 0.01362
  },
  {
    type: "flat",
    usageType: "generated",
    name: "Solar Credit",
    rate: -0.097
  },
];

export default class BillEstimator {
  calculate(usedKWH, generatedKWH) {
    let total = 0;
    const lineItems = rateSchedule.map((item) => {
      const kWh = item.usageType === "generated" ? generatedKWH : usedKWH;
      const lineItem = item.type === "tiered" ?
        this.calculateTiered(item, kWh) :
        this.calculateFlat(item, kWh);
      total += lineItem.amount;
      return lineItem;
    });
    return {
      total,
      lineItems
    };
  }

  calculateTiered(rateInfo, usedKWH) {
    if (rateInfo.type !== "tiered") {
      return 0;
    }
    const { name, rate } = rateInfo;
    const eligibleKWH = Math.max(Math.min((usedKWH - rateInfo.min), rateInfo.max - rateInfo.min), 0);
    const amount = eligibleKWH * rateInfo.rate;
    return {
      name,
      rate,
      eligibleKWH,
      amount
    };
  }

  calculateFlat(rateInfo, usedKWH) {
    if (rateInfo.type !== "flat") {
      return 0;
    }
    const { rate, name } = rateInfo;
    const amount = usedKWH * rate;
    return {
      name,
      rate,
      eligibleKWH: usedKWH,
      amount
    };
  }
}


