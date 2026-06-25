import { KHUJAND } from "../config/khujand";

export type ForecastDay = {
  date: string;
  maxTempC: number;
  minTempC: number;
  apparentMaxC: number;
  humidityMeanPct?: number;
  windMaxKmh: number;
  uvIndexMax?: number;
  wetBulbMaxC?: number;
};

export type ForecastMetadata = {
  requestedLatitude: number;
  requestedLongitude: number;
  resolvedLatitude?: number;
  resolvedLongitude?: number;
  timezone?: string;
  timezoneAbbreviation?: string;
  elevationM?: number;
  generationTimeMs?: number;
  fetchedAtIso: string;
  source: "Open-Meteo" | "Local sample";
};

export type ForecastResult = {
  days: ForecastDay[];
  metadata: ForecastMetadata;
};

type OpenMeteoDailyResponse = {
  latitude?: number;
  longitude?: number;
  generationtime_ms?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  daily?: {
    time?: string[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    apparent_temperature_max?: number[];
    relative_humidity_2m_mean?: number[];
    wind_speed_10m_max?: number[];
    uv_index_max?: number[];
    wet_bulb_temperature_2m_max?: number[];
  };
};

type FetchOpenMeteoForecastOptions = {
  forceFailure?: boolean;
  signal?: AbortSignal;
};

export async function fetchOpenMeteoForecast(options: FetchOpenMeteoForecastOptions = {}): Promise<ForecastResult> {
  if (options.forceFailure) {
    throw new Error("Forced Open-Meteo failure for local verification.");
  }

  const params = new URLSearchParams({
    latitude: String(KHUJAND.center.lat),
    longitude: String(KHUJAND.center.lon),
    timezone: "Asia/Dushanbe",
    forecast_days: "7",
    daily:
      "temperature_2m_max,temperature_2m_min,apparent_temperature_max,relative_humidity_2m_mean,wind_speed_10m_max,uv_index_max,wet_bulb_temperature_2m_max",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
    signal: options.signal,
  });
  if (!response.ok) {
    throw new Error(`Open-Meteo request failed with ${response.status}`);
  }

  const payload = (await response.json()) as OpenMeteoDailyResponse;
  const daily = payload.daily;

  if (!daily?.time?.length || !daily.temperature_2m_max || !daily.temperature_2m_min) {
    throw new Error("Open-Meteo response did not include daily temperature arrays.");
  }

  return {
    days: daily.time.map((date, index) => ({
      date,
      maxTempC: daily.temperature_2m_max?.[index] ?? 0,
      minTempC: daily.temperature_2m_min?.[index] ?? 0,
      apparentMaxC: daily.apparent_temperature_max?.[index] ?? daily.temperature_2m_max?.[index] ?? 0,
      humidityMeanPct: daily.relative_humidity_2m_mean?.[index],
      windMaxKmh: daily.wind_speed_10m_max?.[index] ?? 0,
      uvIndexMax: daily.uv_index_max?.[index],
      wetBulbMaxC: daily.wet_bulb_temperature_2m_max?.[index],
    })),
    metadata: {
      requestedLatitude: KHUJAND.center.lat,
      requestedLongitude: KHUJAND.center.lon,
      resolvedLatitude: payload.latitude,
      resolvedLongitude: payload.longitude,
      timezone: payload.timezone,
      timezoneAbbreviation: payload.timezone_abbreviation,
      elevationM: payload.elevation,
      generationTimeMs: payload.generationtime_ms,
      fetchedAtIso: new Date().toISOString(),
      source: "Open-Meteo",
    },
  };
}
