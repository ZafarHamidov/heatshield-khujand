import { KHUJAND } from "../config/khujand";

export type HistoricalDay = {
  date: string;
  maxTempC: number;
  minTempC: number;
  humidityPct: number;
  windMs: number;
  solarMjM2: number;
};

type NasaPowerResponse = {
  properties?: {
    parameter?: Record<string, Record<string, number>>;
  };
};

export async function fetchNasaPowerSample(): Promise<HistoricalDay[]> {
  const params = new URLSearchParams({
    parameters: "T2M_MAX,T2M_MIN,RH2M,WS10M,ALLSKY_SFC_SW_DWN",
    community: "AG",
    longitude: String(KHUJAND.center.lon),
    latitude: String(KHUJAND.center.lat),
    start: "20250701",
    end: "20250707",
    format: "JSON",
  });

  const response = await fetch(`https://power.larc.nasa.gov/api/temporal/daily/point?${params}`);
  if (!response.ok) {
    throw new Error(`NASA POWER request failed with ${response.status}`);
  }

  const payload = (await response.json()) as NasaPowerResponse;
  const parameter = payload.properties?.parameter;
  if (!parameter?.T2M_MAX) {
    throw new Error("NASA POWER response did not include T2M_MAX.");
  }

  return Object.keys(parameter.T2M_MAX).map((dateKey) => ({
    date: `${dateKey.slice(0, 4)}-${dateKey.slice(4, 6)}-${dateKey.slice(6, 8)}`,
    maxTempC: parameter.T2M_MAX[dateKey],
    minTempC: parameter.T2M_MIN?.[dateKey] ?? 0,
    humidityPct: parameter.RH2M?.[dateKey] ?? 0,
    windMs: parameter.WS10M?.[dateKey] ?? 0,
    solarMjM2: parameter.ALLSKY_SFC_SW_DWN?.[dateKey] ?? 0,
  }));
}
