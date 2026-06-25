import type { CityProfile } from "../config/cities";
import { scientificModel } from "../data/generated/scientificHotspots";
import { riskLevelFromScore, type ScientificCellInput } from "./scientificRisk";

export type CityScientificModel = {
  generatedAt: string;
  modelVersion: string;
  cellSizeMeters: number;
  weights: Readonly<Record<string, number>>;
  sourceCounts: Readonly<Record<string, number>>;
  overpassFailures: readonly string[];
  integratedLayers: readonly string[];
  proxyLayers: readonly string[];
  missingValidatedLayers: readonly string[];
  topCellIds: readonly string[];
  cells: readonly ScientificCellInput[];
};

export function getCityScientificModel(city: CityProfile): CityScientificModel {
  if (city.id === "khujand") return scientificModel as CityScientificModel;

  const cells = createScreeningCells(city);
  const topCellIds = [...cells]
    .sort((a, b) => b.score0to100 - a.score0to100)
    .slice(0, 8)
    .map((cell) => cell.id);

  return {
    generatedAt: new Date("2026-06-25T00:00:00.000Z").toISOString(),
    modelVersion: "global-city-screening-v0.1-profile-proxy",
    cellSizeMeters: Math.round(estimateCellSizeMeters(city)),
    weights: {
      surfaceHeatProxy: 0.35,
      lowShadeProxy: 0.2,
      populationExposureProxy: 0.2,
      vulnerableFacilities: 0.15,
      transportMarketExposure: 0.1,
    },
    sourceCounts: {
      cityProfiles: 1,
      liveForecast: 1,
      localOsmExtract: 0,
      processedSatelliteRasters: 0,
      localHeatTools: city.dataCoverage.filter((item) => item.status === "local").length,
    },
    overpassFailures: [],
    integratedLayers: [
      "Selected city center, bbox, timezone, and heat-planning threshold",
      "Open-Meteo live forecast is applied dynamically",
      "NASA POWER historical context is fetched for the selected city",
      "Global open datasets are available for future Landsat/Sentinel/WorldPop processing",
    ],
    proxyLayers: [
      "Screening grid uses city-level urban heat profile priors until local OSM extraction is generated",
      "Surface heat, shade deficit, exposure, vulnerability, and cooling-access gap are profile-derived proxies",
      "Higher-data cities are prioritized because they have stronger local heat tools or open geospatial ecosystems",
    ],
    missingValidatedLayers: [
      "City-specific OSM building/facility extraction",
      "Landsat land surface temperature raster",
      "Sentinel-2 NDVI/NDWI/NDBI raster",
      "WorldPop/GHSL population raster",
      "Official local warning rules and station observations",
      "Local field sensor observations",
    ],
    topCellIds,
    cells,
  };
}

function createScreeningCells(city: CityProfile): ScientificCellInput[] {
  const rows = 9;
  const cols = 11;
  const cells: ScientificCellInput[] = [];
  const latStep = (city.bbox.north - city.bbox.south) / rows;
  const lonStep = (city.bbox.east - city.bbox.west) / cols;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const south = city.bbox.south + row * latStep;
      const north = south + latStep;
      const west = city.bbox.west + col * lonStep;
      const east = west + lonStep;
      const center: [number, number] = [roundCoord((south + north) / 2), roundCoord((west + east) / 2)];
      const centrality = centralityScore(city, center);
      const streetPattern = 0.5 + 0.5 * Math.sin((row + 1) * 1.7 + (col + 1) * 0.9);
      const profile = city.urbanHeatProfile;
      const components = {
        surfaceHeatProxy: clamp01(profile.builtIntensity * 0.62 + centrality * 0.26 + streetPattern * 0.12),
        lowShadeProxy: clamp01(profile.shadeGap * 0.7 + profile.builtIntensity * 0.18 + (1 - centrality) * 0.04),
        populationExposureProxy: clamp01(profile.populationExposure * 0.63 + centrality * 0.3 + streetPattern * 0.07),
        vulnerableFacilities: clamp01(profile.vulnerableFacilities * 0.62 + centrality * 0.23 + streetPattern * 0.08),
        transportMarketExposure: clamp01(profile.transportMarketExposure * 0.58 + centrality * 0.34 + streetPattern * 0.08),
      };
      const score0to100 = Math.round(
        (components.surfaceHeatProxy * 0.35 +
          components.lowShadeProxy * 0.2 +
          components.populationExposureProxy * 0.2 +
          components.vulnerableFacilities * 0.15 +
          components.transportMarketExposure * 0.1) *
          100,
      );

      cells.push({
        id: `${city.id}-cell-r${String(row).padStart(2, "0")}-c${String(col).padStart(2, "0")}`,
        center,
        boundary: [
          [roundCoord(south), roundCoord(west)],
          [roundCoord(south), roundCoord(east)],
          [roundCoord(north), roundCoord(east)],
          [roundCoord(north), roundCoord(west)],
        ],
        score0to100,
        riskLevel0to4: riskLevelFromScore(score0to100),
        components,
        drivers: driversFor(components),
        confidence: "profile-derived screening",
      });
    }
  }

  return cells;
}

function centralityScore(city: CityProfile, point: [number, number]) {
  const latRadius = Math.max(0.0001, (city.bbox.north - city.bbox.south) / 2);
  const lonRadius = Math.max(0.0001, (city.bbox.east - city.bbox.west) / 2);
  const latNorm = Math.abs(point[0] - city.center.lat) / latRadius;
  const lonNorm = Math.abs(point[1] - city.center.lon) / lonRadius;
  const distance = Math.sqrt(latNorm * latNorm + lonNorm * lonNorm) / Math.SQRT2;

  return clamp01(1 - distance);
}

function driversFor(components: ScientificCellInput["components"]) {
  return Object.entries(components)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);
}

function estimateCellSizeMeters(city: CityProfile) {
  const latStep = (city.bbox.north - city.bbox.south) / 9;
  const lonStep = (city.bbox.east - city.bbox.west) / 11;
  const latMeters = latStep * 111_320;
  const lonMeters = lonStep * 111_320 * Math.cos((city.center.lat * Math.PI) / 180);

  return Math.sqrt(Math.abs(latMeters * lonMeters));
}

function roundCoord(value: number) {
  return Number(value.toFixed(6));
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}
