import type { DataLoad } from "../types/dataLoad";
import type { HourlyForecastResult, HourlyWeatherPoint } from "./hourlyForecast";

export type ScientificRiskComponent = {
  value0to1: number;
  label: "hazard" | "exposure" | "vulnerability" | "adaptiveCapacityGap";
};

export type ScientificCellRiskFrame = {
  timeIso: string;
  cellId: string;
  score0to100: number;
  riskLevel0to4: 0 | 1 | 2 | 3 | 4;
  adjustedApparentTempC?: number;
  hazard: number;
  exposure: number;
  vulnerability: number;
  adaptiveCapacityGap: number;
  confidence0to100: number;
  uncertaintyPlusMinus: number;
  topDrivers: string[];
};

export type ScientificCellInput = {
  id: string;
  center: readonly [number, number];
  boundary: readonly (readonly [number, number])[];
  score0to100: number;
  riskLevel0to4: 0 | 1 | 2 | 3 | 4;
  components: {
    surfaceHeatProxy: number;
    lowShadeProxy: number;
    populationExposureProxy: number;
    vulnerableFacilities: number;
    transportMarketExposure: number;
  };
  drivers: readonly string[];
  confidence: string;
};

export const scientificRiskMethod = {
  modelVersion: "dynamic-ipcc-heatrisk-v0.3",
  equation: "Risk = hourly heat hazard + exposure + vulnerability + adaptive-capacity gap + interaction boost",
  hazardWeights: {
    apparentTemperature: 0.34,
    wetBulb: 0.18,
    solarRadiation: 0.14,
    hotNightOrPersistence: 0.24,
    lowWind: 0.1,
  },
  placeWeights: {
    hazard: 0.44,
    exposure: 0.21,
    vulnerability: 0.2,
    adaptiveCapacityGap: 0.15,
  },
  benchmarkPatterns: [
    "NWS/CDC HeatRisk: 0-4 impact levels, duration, overnight relief, and health-sensitive categories",
    "IPCC AR6 risk framing: hazard, exposure, vulnerability, uncertainty, and response capacity",
    "NYC HVI: surface heat, green space/shade, income/cooling access, and neighborhood-level vulnerability",
    "WRI/SOLWEIG-UTCI pattern: microclimate and shade-aware urban heat exposure as the target future model",
  ],
  currentDataCeiling:
    "Confidence is capped because the dashboard has live weather and OSM proxies, but not processed Landsat LST, Sentinel-2 shade/vegetation, WorldPop population, Hydromet station data, or field sensors yet.",
} as const;

export function buildScientificCellFrames(
  cells: readonly ScientificCellInput[],
  generatedAt: string,
  hourly: HourlyForecastResult | undefined,
  selectedIndex: number,
  loadStatus: DataLoad<HourlyForecastResult>["status"],
): ScientificCellRiskFrame[] {
  const hasWeather = Boolean(hourly?.points.length && (loadStatus === "live" || loadStatus === "fallback"));
  const point = hasWeather ? hourly?.points[Math.min(selectedIndex, hourly.points.length - 1)] : undefined;

  return cells.map((cell) => {
    if (!point || !hourly?.points.length) {
      return baselineFrame(cell, generatedAt);
    }

    return scoreCellAtHour(cell, point, hourly.points, selectedIndex, loadStatus);
  });
}

export function riskLevelFromScore(score: number): 0 | 1 | 2 | 3 | 4 {
  if (score >= 80) return 4;
  if (score >= 60) return 3;
  if (score >= 40) return 2;
  if (score >= 22) return 1;
  return 0;
}

function baselineFrame(cell: ScientificCellInput, generatedAt: string): ScientificCellRiskFrame {
  const exposure = exposureScore(cell);
  const vulnerability = vulnerabilityScore(cell);
  const adaptiveCapacityGap = adaptiveCapacityGapScore(cell);
  const hazard = clamp01(0.55 * cell.components.surfaceHeatProxy + 0.45 * cell.components.lowShadeProxy);
  const score0to100 = Math.round(cell.score0to100);
  const confidence0to100 = confidenceScore(cell, "loading");

  return {
    timeIso: generatedAt,
    cellId: cell.id,
    score0to100,
    riskLevel0to4: riskLevelFromScore(score0to100),
    hazard,
    exposure,
    vulnerability,
    adaptiveCapacityGap,
    confidence0to100,
    uncertaintyPlusMinus: uncertaintyBand(confidence0to100),
    topDrivers: topDrivers(cell, hazard, exposure, vulnerability, adaptiveCapacityGap),
  };
}

function scoreCellAtHour(
  cell: ScientificCellInput,
  point: HourlyWeatherPoint,
  allPoints: HourlyWeatherPoint[],
  selectedIndex: number,
  loadStatus: DataLoad<HourlyForecastResult>["status"],
): ScientificCellRiskFrame {
  const adjustedApparentTempC = localApparentTemperature(point, cell);
  const wetBulbC = point.wetBulbC ?? approximateWetBulbC(point.temperatureC, point.humidityPct ?? 35);
  const persistence = persistenceScore(allPoints, selectedIndex);
  const hotNight = point.isDay === false ? ramp(adjustedApparentTempC, 28, 36) : 0;
  const radiation = point.isDay === false ? 0 : ramp(point.shortwaveRadiation ?? 0, 260, 850);
  const lowWind = 1 - ramp(point.windKmh ?? 8, 4, 22);
  const hazard = clamp01(
    scientificRiskMethod.hazardWeights.apparentTemperature * ramp(adjustedApparentTempC, 30, 43) +
      scientificRiskMethod.hazardWeights.wetBulb * ramp(wetBulbC, 21, 30) +
      scientificRiskMethod.hazardWeights.solarRadiation * radiation +
      scientificRiskMethod.hazardWeights.hotNightOrPersistence * Math.max(persistence, hotNight) +
      scientificRiskMethod.hazardWeights.lowWind * lowWind,
  );
  const exposure = exposureScore(cell);
  const vulnerability = vulnerabilityScore(cell);
  const adaptiveCapacityGap = adaptiveCapacityGapScore(cell);
  const placeRisk =
    scientificRiskMethod.placeWeights.hazard * hazard +
    scientificRiskMethod.placeWeights.exposure * exposure +
    scientificRiskMethod.placeWeights.vulnerability * vulnerability +
    scientificRiskMethod.placeWeights.adaptiveCapacityGap * adaptiveCapacityGap;
  const interactionBoost = 0.14 * hazard * Math.max(exposure, vulnerability) + 0.06 * hazard * adaptiveCapacityGap;
  const score0to100 = Math.round(clamp01(placeRisk + interactionBoost) * 100);
  const confidence0to100 = confidenceScore(cell, loadStatus);

  return {
    timeIso: point.timeIso,
    cellId: cell.id,
    score0to100,
    riskLevel0to4: riskLevelFromScore(score0to100),
    adjustedApparentTempC,
    hazard,
    exposure,
    vulnerability,
    adaptiveCapacityGap,
    confidence0to100,
    uncertaintyPlusMinus: uncertaintyBand(confidence0to100),
    topDrivers: topDrivers(cell, hazard, exposure, vulnerability, adaptiveCapacityGap, {
      adjustedApparentTempC,
      wetBulbC,
      radiation,
      persistence,
      lowWind,
    }),
  };
}

function localApparentTemperature(point: HourlyWeatherPoint, cell: ScientificCellInput) {
  const builtSurfaceBoost = cell.components.surfaceHeatProxy * 2.1;
  const shadePenalty = cell.components.lowShadeProxy * 1.25;
  const crowdingStreetPenalty = cell.components.transportMarketExposure * 0.75;
  const windRelief = ramp(point.windKmh ?? 8, 12, 28) * 0.8;

  return point.apparentTempC + builtSurfaceBoost + shadePenalty + crowdingStreetPenalty - windRelief;
}

function exposureScore(cell: ScientificCellInput) {
  return clamp01(
    0.58 * cell.components.populationExposureProxy +
      0.27 * cell.components.transportMarketExposure +
      0.15 * cell.components.surfaceHeatProxy,
  );
}

function vulnerabilityScore(cell: ScientificCellInput) {
  return clamp01(
    0.62 * cell.components.vulnerableFacilities +
      0.23 * cell.components.populationExposureProxy +
      0.15 * cell.components.lowShadeProxy,
  );
}

function adaptiveCapacityGapScore(cell: ScientificCellInput) {
  return clamp01(
    0.48 * cell.components.lowShadeProxy +
      0.27 * cell.components.transportMarketExposure +
      0.25 * cell.components.surfaceHeatProxy,
  );
}

function persistenceScore(points: HourlyWeatherPoint[], selectedIndex: number) {
  const start = Math.max(0, selectedIndex - 12);
  const end = Math.min(points.length, selectedIndex + 13);
  const window = points.slice(start, end);
  if (!window.length) return 0;

  const hotHours = window.filter((point) => point.apparentTempC >= 35).length / window.length;
  const nightPoints = window.filter((point) => point.isDay === false);
  const hotNightHours = nightPoints.length
    ? nightPoints.filter((point) => point.apparentTempC >= 30 || point.temperatureC >= 29).length / nightPoints.length
    : 0;

  return clamp01(0.62 * hotHours + 0.38 * hotNightHours);
}

function confidenceScore(cell: ScientificCellInput, loadStatus: DataLoad<HourlyForecastResult>["status"]) {
  const osmSignal = clamp01(
    (cell.components.surfaceHeatProxy +
      cell.components.populationExposureProxy +
      cell.components.vulnerableFacilities +
      cell.components.transportMarketExposure) /
      4,
  );
  const weatherContribution = loadStatus === "live" ? 0.23 : loadStatus === "fallback" ? 0.1 : 0.02;
  const confidence = 0.32 + weatherContribution + 0.18 * osmSignal;
  const cap = loadStatus === "live" ? 0.69 : loadStatus === "fallback" ? 0.51 : 0.43;

  return Math.round(Math.min(cap, confidence) * 100);
}

function uncertaintyBand(confidence0to100: number) {
  return Math.round(7 + (1 - confidence0to100 / 100) * 20);
}

function topDrivers(
  cell: ScientificCellInput,
  hazard: number,
  exposure: number,
  vulnerability: number,
  adaptiveCapacityGap: number,
  weather?: {
    adjustedApparentTempC: number;
    wetBulbC: number;
    radiation: number;
    persistence: number;
    lowWind: number;
  },
) {
  const entries: Array<[string, number]> = [
    ["hourly heat hazard", hazard],
    ["population exposure", exposure],
    ["vulnerable facilities", vulnerability],
    ["low shade / cooling gap", adaptiveCapacityGap],
    ["built-surface heat proxy", cell.components.surfaceHeatProxy],
    ["market / transport exposure", cell.components.transportMarketExposure],
  ];

  if (weather) {
    entries.push(
      ["apparent temperature", ramp(weather.adjustedApparentTempC, 30, 43)],
      ["wet-bulb stress", ramp(weather.wetBulbC, 21, 30)],
      ["solar radiation", weather.radiation],
      ["heat persistence", weather.persistence],
      ["low wind", weather.lowWind],
    );
  }

  return entries
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([label]) => label);
}

function approximateWetBulbC(tempC: number, humidityPct: number) {
  const rh = clamp(humidityPct, 1, 100);

  return (
    tempC * Math.atan(0.151977 * Math.sqrt(rh + 8.313659)) +
    Math.atan(tempC + rh) -
    Math.atan(rh - 1.676331) +
    0.00391838 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh) -
    4.686035
  );
}

function ramp(value: number, low: number, high: number) {
  if (high <= low) return 0;
  return clamp01((value - low) / (high - low));
}

function clamp01(value: number) {
  return clamp(value, 0, 1);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
