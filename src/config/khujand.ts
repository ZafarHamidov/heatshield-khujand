export const KHUJAND = {
  name: "Khujand",
  country: "Tajikistan",
  center: {
    lat: 40.2842191,
    lon: 69.6191174,
  },
  bbox: {
    south: 40.2623896,
    north: 40.3316825,
    west: 69.5612523,
    east: 69.6740681,
  },
  trigger: {
    temperatureC: 39.5,
    consecutiveDays: 4,
    season: "July-August",
    leadTime: "about 5 days",
    officialSource:
      "IFRC Tajikistan heatwave Early Action Protocol, based on Tajik Hydromet warning logic.",
  },
  emergency: {
    caveat:
      "Emergency numbers and clinical advice should be verified locally. The dashboard does not replace medical care or official warnings.",
    ambulance: "03 from landline / 103 from mobile",
    fire: "01 from landline / 101 from mobile",
    police: "02 from landline / 102 from mobile",
  },
};

export const RIVER_CORRIDOR: [number, number][] = [
  [40.319, 69.560],
  [40.309, 69.585],
  [40.299, 69.612],
  [40.290, 69.642],
  [40.279, 69.674],
];
