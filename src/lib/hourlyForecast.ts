import { KHUJAND } from "../config/khujand";
import { riskZones } from "../data/riskZones";

export type HourlyWeatherPoint = {
  timeIso: string;
  temperatureC: number;
  apparentTempC: number;
  humidityPct?: number;
  windKmh?: number;
  uvIndex?: number;
  shortwaveRadiation?: number;
  wetBulbC?: number;
  isDay?: boolean;
};

export type HourlyForecastResult = {
  points: HourlyWeatherPoint[];
  byZone: Record<string, HourlyWeatherPoint[]>;
  metadata: {
    fetchedAtIso: string;
    timezone?: string;
    source: "Open-Meteo" | "Local sample";
  };
};

type OpenMeteoHourlyResponse = {
  timezone?: string;
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    apparent_temperature?: number[];
    relative_humidity_2m?: number[];
    wind_speed_10m?: number[];
    uv_index?: number[];
    shortwave_radiation?: number[];
    wet_bulb_temperature_2m?: number[];
    is_day?: number[];
  };
};

type FetchHourlyOptions = {
  forceFailure?: boolean;
  signal?: AbortSignal;
};

export async function fetchOpenMeteoHourlyForecast(options: FetchHourlyOptions = {}): Promise<HourlyForecastResult> {
  if (options.forceFailure) {
    throw new Error("Forced Open-Meteo hourly failure for local verification.");
  }

  const locations = [{ id: "city", position: [KHUJAND.center.lat, KHUJAND.center.lon] as [number, number] }, ...riskZones];
  const params = new URLSearchParams({
    latitude: locations.map((location) => location.position[0]).join(","),
    longitude: locations.map((location) => location.position[1]).join(","),
    timezone: "Asia/Dushanbe",
    forecast_days: "7",
    hourly:
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,uv_index,shortwave_radiation,wet_bulb_temperature_2m,is_day",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
    signal: options.signal,
  });
  if (!response.ok) {
    throw new Error(`Open-Meteo hourly request failed with ${response.status}`);
  }

  const payload = (await response.json()) as OpenMeteoHourlyResponse | OpenMeteoHourlyResponse[];
  const responses = Array.isArray(payload) ? payload : [payload];
  const cityPoints = parseHourlyResponse(responses[0]);

  if (!cityPoints.length) {
    throw new Error("Open-Meteo hourly response did not include usable hourly arrays.");
  }

  const byZone = Object.fromEntries(
    riskZones.map((zone, index) => {
      const zonePoints = parseHourlyResponse(responses[index + 1]);
      return [zone.id, zonePoints.length ? zonePoints : cityPoints];
    }),
  );

  return {
    points: cityPoints,
    byZone,
    metadata: {
      fetchedAtIso: new Date().toISOString(),
      timezone: responses[0]?.timezone,
      source: "Open-Meteo",
    },
  };
}

function parseHourlyResponse(payload?: OpenMeteoHourlyResponse): HourlyWeatherPoint[] {
  const hourly = payload?.hourly;
  if (!hourly?.time?.length || !hourly.temperature_2m?.length) return [];

  return hourly.time.map((timeIso, index) => ({
    timeIso,
    temperatureC: hourly.temperature_2m?.[index] ?? 0,
    apparentTempC: hourly.apparent_temperature?.[index] ?? hourly.temperature_2m?.[index] ?? 0,
    humidityPct: hourly.relative_humidity_2m?.[index],
    windKmh: hourly.wind_speed_10m?.[index],
    uvIndex: hourly.uv_index?.[index],
    shortwaveRadiation: hourly.shortwave_radiation?.[index],
    wetBulbC: hourly.wet_bulb_temperature_2m?.[index],
    isDay: typeof hourly.is_day?.[index] === "number" ? hourly.is_day[index] === 1 : undefined,
  }));
}
