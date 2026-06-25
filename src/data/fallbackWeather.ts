import type { ForecastDay } from "../lib/openMeteo";
import type { HourlyForecastResult, HourlyWeatherPoint } from "../lib/hourlyForecast";
import type { HistoricalDay } from "../lib/nasaPower";
import { riskZones } from "./riskZones";

export const fallbackForecast: ForecastDay[] = [
  {
    date: "Sample D1",
    maxTempC: 38.2,
    minTempC: 24.1,
    apparentMaxC: 39.6,
    humidityMeanPct: 31,
    windMaxKmh: 17,
    uvIndexMax: 8,
    wetBulbMaxC: 24.4,
  },
  {
    date: "Sample D2",
    maxTempC: 39.8,
    minTempC: 25.0,
    apparentMaxC: 41.0,
    humidityMeanPct: 29,
    windMaxKmh: 15,
    uvIndexMax: 9,
    wetBulbMaxC: 25.0,
  },
  {
    date: "Sample D3",
    maxTempC: 40.3,
    minTempC: 25.4,
    apparentMaxC: 41.4,
    humidityMeanPct: 28,
    windMaxKmh: 13,
    uvIndexMax: 9,
    wetBulbMaxC: 25.2,
  },
  {
    date: "Sample D4",
    maxTempC: 39.6,
    minTempC: 24.7,
    apparentMaxC: 40.8,
    humidityMeanPct: 30,
    windMaxKmh: 16,
    uvIndexMax: 8,
    wetBulbMaxC: 25.1,
  },
];

export const fallbackHistorical: HistoricalDay[] = [
  { date: "2025-07-01", maxTempC: 38.7, minTempC: 23.9, humidityPct: 27.6, windMs: 2.3, solarMjM2: 29.4 },
  { date: "2025-07-02", maxTempC: 39.4, minTempC: 24.2, humidityPct: 26.8, windMs: 2.1, solarMjM2: 30.0 },
  { date: "2025-07-03", maxTempC: 40.1, minTempC: 25.1, humidityPct: 25.9, windMs: 2.0, solarMjM2: 30.2 },
  { date: "2025-07-04", maxTempC: 40.0, minTempC: 25.3, humidityPct: 26.1, windMs: 1.8, solarMjM2: 29.8 },
  { date: "2025-07-05", maxTempC: 39.7, minTempC: 24.8, humidityPct: 27.2, windMs: 2.5, solarMjM2: 29.1 },
];

const fallbackHourlyPoints: HourlyWeatherPoint[] = Array.from({ length: 72 }, (_, index) => {
  const date = new Date("2025-07-03T00:00:00+05:00");
  date.setHours(date.getHours() + index);
  const hour = date.getHours();
  const daytimeCurve = Math.max(0, Math.sin(((hour - 7) / 14) * Math.PI));
  const nightHeat = hour < 6 ? 1.2 : 0;
  const temperatureC = 27 + daytimeCurve * 13 + nightHeat;
  const humidityPct = Math.round(34 - daytimeCurve * 8 + (hour < 7 ? 8 : 0));

  return {
    timeIso: date.toISOString().slice(0, 16),
    temperatureC,
    apparentTempC: temperatureC + 1.6 + humidityPct / 60,
    humidityPct,
    windKmh: 11 + daytimeCurve * 5,
    uvIndex: daytimeCurve > 0 ? Math.round(daytimeCurve * 9) : 0,
    shortwaveRadiation: Math.round(daytimeCurve * 780),
    wetBulbC: 21 + daytimeCurve * 4.2 + humidityPct / 100,
    isDay: hour >= 6 && hour <= 19,
  };
});

export const fallbackHourlyForecast: HourlyForecastResult = {
  points: fallbackHourlyPoints,
  byZone: Object.fromEntries(
    riskZones.map((zone, zoneIndex) => [
      zone.id,
      fallbackHourlyPoints.map((point) => ({
        ...point,
        temperatureC: point.temperatureC + zoneIndex * 0.18,
        apparentTempC: point.apparentTempC + zone.exposureProfile.pavementExposure * 1.1,
      })),
    ]),
  ),
  metadata: {
    fetchedAtIso: new Date().toISOString(),
    timezone: "Asia/Dushanbe",
    source: "Local sample",
  },
};
