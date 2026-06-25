import type { RiskZone } from "../data/riskZones";
import type { HourlyForecastResult, HourlyWeatherPoint } from "./hourlyForecast";

export type ZoneHotspotFrame = {
  timeIso: string;
  zoneId: string;
  score0to100: number;
  riskLevel0to4: 0 | 1 | 2 | 3 | 4;
  apparentTempC: number;
  wetBulbC?: number;
  topDrivers: string[];
  recommendedAction: string;
};

export function buildHotspotFrames(
  hourly: HourlyForecastResult | undefined,
  selectedIndex: number,
  riskZones: RiskZone[],
): ZoneHotspotFrame[] {
  if (!hourly?.points.length) return [];

  return riskZones.map((zone) => {
    const zonePoints = hourly.byZone[zone.id] ?? hourly.points;
    const point = zonePoints[Math.min(selectedIndex, zonePoints.length - 1)] ?? hourly.points[0];
    return scoreZoneAtHour(zone, point);
  });
}

export function hottestHourIndex(points: HourlyWeatherPoint[]) {
  if (!points.length) return 0;
  return points.reduce((bestIndex, point, index) => {
    return point.apparentTempC > points[bestIndex].apparentTempC ? index : bestIndex;
  }, 0);
}

function scoreZoneAtHour(zone: RiskZone, point: HourlyWeatherPoint): ZoneHotspotFrame {
  const exposure = zone.exposureProfile;
  const exposureScore =
    exposure.shadeDeficit * 14 +
    exposure.crowding * 10 +
    exposure.pavementExposure * 12 +
    exposure.criticalService * 8 +
    exposure.nightRetention * 7 +
    exposure.coolingAccessGap * 9;
  const heatScore = Math.max(0, (point.apparentTempC - 28) * 3.2);
  const wetBulbScore = Math.max(0, ((point.wetBulbC ?? 20) - 22) * 2.1);
  const radiationScore = Math.min(12, (point.shortwaveRadiation ?? 0) / 60);
  const nightPenalty = point.isDay === false ? exposure.nightRetention * 7 : 0;
  const score0to100 = Math.round(Math.min(100, heatScore + exposureScore + wetBulbScore + radiationScore + nightPenalty));

  return {
    timeIso: point.timeIso,
    zoneId: zone.id,
    score0to100,
    riskLevel0to4: riskLevel(score0to100),
    apparentTempC: point.apparentTempC,
    wetBulbC: point.wetBulbC,
    topDrivers: topDrivers(zone),
    recommendedAction: zone.actions[0],
  };
}

function riskLevel(score: number): 0 | 1 | 2 | 3 | 4 {
  if (score >= 82) return 4;
  if (score >= 66) return 3;
  if (score >= 48) return 2;
  if (score >= 30) return 1;
  return 0;
}

function topDrivers(zone: RiskZone) {
  const entries = [
    ["shade deficit", zone.exposureProfile.shadeDeficit],
    ["crowding", zone.exposureProfile.crowding],
    ["hot pavement", zone.exposureProfile.pavementExposure],
    ["critical service", zone.exposureProfile.criticalService],
    ["night heat retention", zone.exposureProfile.nightRetention],
    ["low cooling access", zone.exposureProfile.coolingAccessGap],
  ];

  return entries
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 3)
    .map(([label]) => String(label));
}

export function hotspotTone(level: ZoneHotspotFrame["riskLevel0to4"]) {
  switch (level) {
    case 0:
      return { stroke: "#18735f", fill: "#38c793", label: "0" };
    case 1:
      return { stroke: "#9b6a00", fill: "#f5c542", label: "1" };
    case 2:
      return { stroke: "#b54708", fill: "#f79009", label: "2" };
    case 3:
      return { stroke: "#b42318", fill: "#f04438", label: "3" };
    case 4:
      return { stroke: "#8f1d7a", fill: "#d444b8", label: "4" };
  }
}
