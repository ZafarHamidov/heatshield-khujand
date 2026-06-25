import type { CityProfile } from "../config/cities";

export type RiskZone = {
  id: string;
  name: string;
  type: "Residential" | "School" | "Clinic" | "Market" | "Transport" | "Cooling corridor";
  position: [number, number];
  boundary: [number, number][];
  boundaryType: "polygon" | "influence-zone";
  boundaryConfidence: "prototype" | "OSM-derived" | "needs local validation";
  priority: "Very high" | "High" | "Medium";
  confidence: "Prototype" | "Source-backed proxy";
  exposureProfile: {
    shadeDeficit: number;
    crowding: number;
    pavementExposure: number;
    criticalService: number;
    nightRetention: number;
    coolingAccessGap: number;
  };
  interventionOptions: Array<{
    key: "coolRoof" | "shade" | "water" | "coolingRoom" | "transitShade";
    estimatedReduction: number;
  }>;
  why: string;
  actions: string[];
};

export const riskZones: RiskZone[] = [
  {
    id: "panjshanbe-market",
    name: "Panjshanbe market and central public space",
    type: "Market",
    position: [40.2829, 69.6277],
    boundary: [
      [40.2862, 69.6231],
      [40.2856, 69.6322],
      [40.2811, 69.6340],
      [40.2798, 69.6264],
      [40.2822, 69.6227],
    ],
    boundaryType: "polygon",
    boundaryConfidence: "OSM-derived",
    priority: "Very high",
    confidence: "Source-backed proxy",
    exposureProfile: {
      shadeDeficit: 0.72,
      crowding: 0.95,
      pavementExposure: 0.78,
      criticalService: 0.56,
      nightRetention: 0.48,
      coolingAccessGap: 0.68,
    },
    interventionOptions: [
      { key: "shade", estimatedReduction: 12 },
      { key: "water", estimatedReduction: 9 },
      { key: "coolingRoom", estimatedReduction: 8 },
    ],
    why: "Crowded outdoor and semi-outdoor activity raises exposure during peak heat, especially for vendors, older visitors, and people travelling by foot.",
    actions: ["Shade queues and stalls", "Public water point", "Heat warning posters", "First-aid check point"],
  },
  {
    id: "central-clinics",
    name: "Central clinic and pharmacy cluster",
    type: "Clinic",
    position: [40.2867, 69.6206],
    boundary: [
      [40.2894, 69.6168],
      [40.2890, 69.6240],
      [40.2840, 69.6251],
      [40.2828, 69.6196],
      [40.2852, 69.6158],
    ],
    boundaryType: "influence-zone",
    boundaryConfidence: "needs local validation",
    priority: "Very high",
    confidence: "Prototype",
    exposureProfile: {
      shadeDeficit: 0.56,
      crowding: 0.72,
      pavementExposure: 0.64,
      criticalService: 0.98,
      nightRetention: 0.52,
      coolingAccessGap: 0.54,
    },
    interventionOptions: [
      { key: "coolingRoom", estimatedReduction: 15 },
      { key: "water", estimatedReduction: 8 },
      { key: "coolRoof", estimatedReduction: 7 },
    ],
    why: "Clinics and pharmacies need to stay reachable and cool when heat illness rises.",
    actions: ["Cooling room", "Backup water", "Volunteer check-ins", "Priority SMS to vulnerable patients"],
  },
  {
    id: "school-microdistrict",
    name: "Dense school microdistrict",
    type: "School",
    position: [40.2939, 69.6098],
    boundary: [
      [40.2980, 69.6036],
      [40.2973, 69.6154],
      [40.2904, 69.6168],
      [40.2887, 69.6085],
      [40.2925, 69.6024],
    ],
    boundaryType: "polygon",
    boundaryConfidence: "needs local validation",
    priority: "High",
    confidence: "Prototype",
    exposureProfile: {
      shadeDeficit: 0.74,
      crowding: 0.68,
      pavementExposure: 0.66,
      criticalService: 0.82,
      nightRetention: 0.42,
      coolingAccessGap: 0.58,
    },
    interventionOptions: [
      { key: "shade", estimatedReduction: 13 },
      { key: "coolRoof", estimatedReduction: 9 },
      { key: "water", estimatedReduction: 6 },
    ],
    why: "Children are heat-vulnerable and schoolyards can be high-exposure if shade is limited.",
    actions: ["Morning-only outdoor activity", "Shade canopy", "Cool roof audit", "Classroom hydration routine"],
  },
  {
    id: "dense-residential-east",
    name: "Dense eastern residential blocks",
    type: "Residential",
    position: [40.2794, 69.6555],
    boundary: [
      [40.2852, 69.6460],
      [40.2843, 69.6666],
      [40.2752, 69.6688],
      [40.2710, 69.6535],
      [40.2763, 69.6442],
    ],
    boundaryType: "polygon",
    boundaryConfidence: "needs local validation",
    priority: "High",
    confidence: "Prototype",
    exposureProfile: {
      shadeDeficit: 0.70,
      crowding: 0.76,
      pavementExposure: 0.84,
      criticalService: 0.42,
      nightRetention: 0.86,
      coolingAccessGap: 0.78,
    },
    interventionOptions: [
      { key: "coolRoof", estimatedReduction: 14 },
      { key: "shade", estimatedReduction: 10 },
      { key: "coolingRoom", estimatedReduction: 8 },
    ],
    why: "Dense housing, paved surfaces, and limited cooling access can increase indoor and nighttime heat stress.",
    actions: ["Cool roof pilots", "Door-to-door vulnerable checks", "Night ventilation guidance", "Shared cooling space"],
  },
  {
    id: "transport-corridor",
    name: "Main transport and bus-stop corridor",
    type: "Transport",
    position: [40.2716, 69.6116],
    boundary: [
      [40.2750, 69.5995],
      [40.2740, 69.6245],
      [40.2686, 69.6266],
      [40.2660, 69.6030],
      [40.2695, 69.5968],
    ],
    boundaryType: "influence-zone",
    boundaryConfidence: "needs local validation",
    priority: "High",
    confidence: "Prototype",
    exposureProfile: {
      shadeDeficit: 0.82,
      crowding: 0.70,
      pavementExposure: 0.90,
      criticalService: 0.58,
      nightRetention: 0.50,
      coolingAccessGap: 0.72,
    },
    interventionOptions: [
      { key: "transitShade", estimatedReduction: 15 },
      { key: "water", estimatedReduction: 9 },
      { key: "shade", estimatedReduction: 8 },
    ],
    why: "People waiting for transport are exposed to direct sun, hot pavement, and limited water access.",
    actions: ["Shade bus stops", "Water refill points", "Heat signage", "Peak-hour service continuity"],
  },
  {
    id: "syr-darya-cooling",
    name: "Syr Darya river cooling-gradient check",
    type: "Cooling corridor",
    position: [40.3004, 69.6101],
    boundary: [
      [40.3075, 69.5920],
      [40.3053, 69.6260],
      [40.2954, 69.6276],
      [40.2938, 69.5980],
      [40.2990, 69.5885],
    ],
    boundaryType: "polygon",
    boundaryConfidence: "OSM-derived",
    priority: "Medium",
    confidence: "Source-backed proxy",
    exposureProfile: {
      shadeDeficit: 0.38,
      crowding: 0.44,
      pavementExposure: 0.42,
      criticalService: 0.28,
      nightRetention: 0.32,
      coolingAccessGap: 0.36,
    },
    interventionOptions: [
      { key: "shade", estimatedReduction: 6 },
      { key: "water", estimatedReduction: 5 },
      { key: "coolingRoom", estimatedReduction: 4 },
    ],
    why: "River and vegetation corridors may provide cooling contrast that helps validate urban heat island patterns.",
    actions: ["Compare nearby street temperatures", "Protect tree cover", "Map cool routes", "Sensor validation transect"],
  },
];

export function getRiskZonesForCity(city: CityProfile): RiskZone[] {
  if (city.id === "khujand") return riskZones;

  const { bbox } = city;
  const latSpan = bbox.north - bbox.south;
  const lonSpan = bbox.east - bbox.west;
  const profile = city.urbanHeatProfile;

  return [
    {
      id: `${city.id}-central-core`,
      name: `${city.name} central public-space core`,
      type: "Market",
      position: pointInBbox(city, 0.51, 0.51),
      boundary: boxBoundary(pointInBbox(city, 0.51, 0.51), latSpan * 0.12, lonSpan * 0.16),
      boundaryType: "influence-zone",
      boundaryConfidence: "needs local validation",
      priority: "Very high",
      confidence: "Prototype",
      exposureProfile: {
        shadeDeficit: clamp(profile.shadeGap + 0.08),
        crowding: clamp(profile.populationExposure + 0.09),
        pavementExposure: clamp(profile.builtIntensity + 0.07),
        criticalService: clamp(profile.vulnerableFacilities - 0.05),
        nightRetention: clamp(profile.nightRetention),
        coolingAccessGap: clamp(profile.coolingAccessGap),
      },
      interventionOptions: [
        { key: "shade", estimatedReduction: 12 },
        { key: "water", estimatedReduction: 9 },
        { key: "coolingRoom", estimatedReduction: 8 },
      ],
      why: "Central public areas concentrate outdoor exposure, pedestrian activity, markets, and transit transfers.",
      actions: ["Shade queues and waiting areas", "Public water point", "Heat warning signage", "First-aid check point"],
    },
    {
      id: `${city.id}-clinics`,
      name: `${city.name} clinic and pharmacy access cluster`,
      type: "Clinic",
      position: pointInBbox(city, 0.58, 0.47),
      boundary: boxBoundary(pointInBbox(city, 0.58, 0.47), latSpan * 0.1, lonSpan * 0.13),
      boundaryType: "influence-zone",
      boundaryConfidence: "needs local validation",
      priority: "Very high",
      confidence: "Prototype",
      exposureProfile: {
        shadeDeficit: clamp(profile.shadeGap),
        crowding: clamp(profile.populationExposure),
        pavementExposure: clamp(profile.builtIntensity),
        criticalService: clamp(profile.vulnerableFacilities + 0.2),
        nightRetention: clamp(profile.nightRetention),
        coolingAccessGap: clamp(profile.coolingAccessGap - 0.04),
      },
      interventionOptions: [
        { key: "coolingRoom", estimatedReduction: 15 },
        { key: "water", estimatedReduction: 8 },
        { key: "coolRoof", estimatedReduction: 7 },
      ],
      why: "Health services need continuity and cool triage capacity during heat illness surges.",
      actions: ["Cooling room", "Backup water", "Vulnerable patient check-ins", "Priority outreach messages"],
    },
    {
      id: `${city.id}-schools`,
      name: `${city.name} school and child-safety zone`,
      type: "School",
      position: pointInBbox(city, 0.38, 0.58),
      boundary: boxBoundary(pointInBbox(city, 0.38, 0.58), latSpan * 0.1, lonSpan * 0.13),
      boundaryType: "influence-zone",
      boundaryConfidence: "needs local validation",
      priority: "High",
      confidence: "Prototype",
      exposureProfile: {
        shadeDeficit: clamp(profile.shadeGap + 0.04),
        crowding: clamp(profile.populationExposure - 0.02),
        pavementExposure: clamp(profile.builtIntensity - 0.03),
        criticalService: clamp(profile.vulnerableFacilities + 0.08),
        nightRetention: clamp(profile.nightRetention - 0.08),
        coolingAccessGap: clamp(profile.coolingAccessGap),
      },
      interventionOptions: [
        { key: "shade", estimatedReduction: 13 },
        { key: "coolRoof", estimatedReduction: 9 },
        { key: "water", estimatedReduction: 6 },
      ],
      why: "Children are heat-vulnerable, and schoolyards can have high exposure when shade is limited.",
      actions: ["Morning-only outdoor activity", "Shade canopy", "Cool classroom routine", "Water-break schedule"],
    },
    {
      id: `${city.id}-residential-night-heat`,
      name: `${city.name} residential night-heat retention area`,
      type: "Residential",
      position: pointInBbox(city, 0.66, 0.64),
      boundary: boxBoundary(pointInBbox(city, 0.66, 0.64), latSpan * 0.15, lonSpan * 0.18),
      boundaryType: "polygon",
      boundaryConfidence: "needs local validation",
      priority: "High",
      confidence: "Prototype",
      exposureProfile: {
        shadeDeficit: clamp(profile.shadeGap + 0.06),
        crowding: clamp(profile.populationExposure + 0.04),
        pavementExposure: clamp(profile.builtIntensity + 0.08),
        criticalService: clamp(profile.vulnerableFacilities - 0.08),
        nightRetention: clamp(profile.nightRetention + 0.14),
        coolingAccessGap: clamp(profile.coolingAccessGap + 0.09),
      },
      interventionOptions: [
        { key: "coolRoof", estimatedReduction: 14 },
        { key: "shade", estimatedReduction: 10 },
        { key: "coolingRoom", estimatedReduction: 8 },
      ],
      why: "Dense residential blocks can hold heat overnight, increasing risk for older people and people without cooling.",
      actions: ["Cool roof pilots", "Door-to-door vulnerable checks", "Night ventilation guidance", "Shared cooling space"],
    },
    {
      id: `${city.id}-transport`,
      name: `${city.name} main transport exposure corridor`,
      type: "Transport",
      position: pointInBbox(city, 0.48, 0.36),
      boundary: boxBoundary(pointInBbox(city, 0.48, 0.36), latSpan * 0.09, lonSpan * 0.24),
      boundaryType: "influence-zone",
      boundaryConfidence: "needs local validation",
      priority: "High",
      confidence: "Prototype",
      exposureProfile: {
        shadeDeficit: clamp(profile.shadeGap + 0.1),
        crowding: clamp(profile.transportMarketExposure + 0.05),
        pavementExposure: clamp(profile.builtIntensity + 0.12),
        criticalService: clamp(profile.vulnerableFacilities - 0.04),
        nightRetention: clamp(profile.nightRetention),
        coolingAccessGap: clamp(profile.coolingAccessGap + 0.05),
      },
      interventionOptions: [
        { key: "transitShade", estimatedReduction: 15 },
        { key: "water", estimatedReduction: 9 },
        { key: "shade", estimatedReduction: 8 },
      ],
      why: "Transit users are exposed to direct sun, hot pavement, and waiting-time heat stress.",
      actions: ["Shade bus stops", "Water refill points", "Heat signage", "Peak-hour service continuity"],
    },
    {
      id: `${city.id}-cooling-gradient`,
      name: `${city.name} cooling-gradient validation zone`,
      type: "Cooling corridor",
      position: pointInBbox(city, 0.32, 0.38),
      boundary: boxBoundary(pointInBbox(city, 0.32, 0.38), latSpan * 0.13, lonSpan * 0.17),
      boundaryType: "influence-zone",
      boundaryConfidence: "needs local validation",
      priority: "Medium",
      confidence: "Prototype",
      exposureProfile: {
        shadeDeficit: clamp(profile.shadeGap - 0.18),
        crowding: clamp(profile.populationExposure - 0.18),
        pavementExposure: clamp(profile.builtIntensity - 0.22),
        criticalService: clamp(profile.vulnerableFacilities - 0.18),
        nightRetention: clamp(profile.nightRetention - 0.18),
        coolingAccessGap: clamp(profile.coolingAccessGap - 0.16),
      },
      interventionOptions: [
        { key: "shade", estimatedReduction: 6 },
        { key: "water", estimatedReduction: 5 },
        { key: "coolingRoom", estimatedReduction: 4 },
      ],
      why: "Lower-risk corridors help compare hot streets against possible cooling gradients and sensor transects.",
      actions: ["Compare nearby street temperatures", "Protect tree cover", "Map cool routes", "Sensor validation transect"],
    },
  ];
}

function pointInBbox(city: CityProfile, lonFraction: number, latFraction: number): [number, number] {
  const lat = city.bbox.south + (city.bbox.north - city.bbox.south) * latFraction;
  const lon = city.bbox.west + (city.bbox.east - city.bbox.west) * lonFraction;

  return [roundCoord(lat), roundCoord(lon)];
}

function boxBoundary(center: [number, number], latSpan: number, lonSpan: number): [number, number][] {
  const [lat, lon] = center;
  const halfLat = latSpan / 2;
  const halfLon = lonSpan / 2;

  return [
    [roundCoord(lat + halfLat), roundCoord(lon - halfLon)],
    [roundCoord(lat + halfLat), roundCoord(lon + halfLon)],
    [roundCoord(lat - halfLat), roundCoord(lon + halfLon)],
    [roundCoord(lat - halfLat), roundCoord(lon - halfLon)],
  ];
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function roundCoord(value: number) {
  return Number(value.toFixed(6));
}
