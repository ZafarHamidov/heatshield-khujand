export type CityId =
  | "khujand"
  | "dushanbe"
  | "tashkent"
  | "bishkek"
  | "almaty"
  | "new-york"
  | "phoenix"
  | "london"
  | "paris"
  | "singapore"
  | "delhi"
  | "tokyo"
  | "sydney"
  | "sao-paulo";

export type CityProfile = {
  id: CityId;
  name: string;
  country: string;
  region: string;
  center: {
    lat: number;
    lon: number;
  };
  bbox: {
    south: number;
    north: number;
    west: number;
    east: number;
  };
  timezone: string;
  climateContext: string;
  dataTier: "Central Asia priority" | "High-data benchmark" | "Global high-data city";
  dataScore0to100: number;
  dataCoverage: Array<{
    label: string;
    status: "live" | "global" | "local" | "prototype" | "planned";
    note: string;
  }>;
  trigger: {
    temperatureC: number;
    consecutiveDays: number;
    season: string;
    leadTime: string;
    official: boolean;
    officialSource: string;
  };
  emergency: {
    caveat: string;
    ambulance?: string;
    fire?: string;
    police?: string;
  };
  urbanHeatProfile: {
    builtIntensity: number;
    shadeGap: number;
    populationExposure: number;
    vulnerableFacilities: number;
    transportMarketExposure: number;
    nightRetention: number;
    coolingAccessGap: number;
  };
  riverCorridor?: [number, number][];
};

const localEmergencyCaveat =
  "Emergency numbers and clinical advice should be verified locally. The dashboard does not replace medical care or official warnings.";

export const CITY_PROFILES: CityProfile[] = [
  {
    id: "khujand",
    name: "Khujand",
    country: "Tajikistan",
    region: "Central Asia",
    center: { lat: 40.2842191, lon: 69.6191174 },
    bbox: { south: 40.2623896, north: 40.3316825, west: 69.5612523, east: 69.6740681 },
    timezone: "Asia/Dushanbe",
    climateContext: "Syr Darya valley city with an IFRC/Tajikistan EAP heat trigger.",
    dataTier: "Central Asia priority",
    dataScore0to100: 78,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "NASA POWER", status: "global", note: "Global meteorological history." },
      { label: "OpenStreetMap", status: "local", note: "Generated OSM building/facility grid is available." },
      { label: "IFRC/Tajikistan EAP", status: "local", note: "Official trigger context for Khujand/Sughd." },
      { label: "Satellite rasters", status: "planned", note: "Landsat/Sentinel processing is still future work." },
    ],
    trigger: {
      temperatureC: 39.5,
      consecutiveDays: 4,
      season: "July-August",
      leadTime: "about 5 days",
      official: true,
      officialSource: "IFRC Tajikistan heatwave Early Action Protocol, based on Tajik Hydromet warning logic.",
    },
    emergency: {
      caveat: localEmergencyCaveat,
      ambulance: "03 from landline / 103 from mobile",
      fire: "01 from landline / 101 from mobile",
      police: "02 from landline / 102 from mobile",
    },
    urbanHeatProfile: {
      builtIntensity: 0.66,
      shadeGap: 0.68,
      populationExposure: 0.62,
      vulnerableFacilities: 0.55,
      transportMarketExposure: 0.64,
      nightRetention: 0.58,
      coolingAccessGap: 0.72,
    },
    riverCorridor: [
      [40.319, 69.56],
      [40.309, 69.585],
      [40.299, 69.612],
      [40.29, 69.642],
      [40.279, 69.674],
    ],
  },
  {
    id: "dushanbe",
    name: "Dushanbe",
    country: "Tajikistan",
    region: "Central Asia",
    center: { lat: 38.5598, lon: 68.787 },
    bbox: { south: 38.49, north: 38.64, west: 68.68, east: 68.9 },
    timezone: "Asia/Dushanbe",
    climateContext: "Capital city in a mountain-valley setting with growing summer heat exposure.",
    dataTier: "Central Asia priority",
    dataScore0to100: 72,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "NASA POWER", status: "global", note: "Global meteorological history." },
      { label: "OpenStreetMap", status: "prototype", note: "Suitable for an OSM-derived grid run." },
      { label: "Satellite rasters", status: "planned", note: "Landsat/Sentinel/WorldPop validation needed." },
    ],
    trigger: {
      temperatureC: 40,
      consecutiveDays: 4,
      season: "summer",
      leadTime: "3-5 days",
      official: false,
      officialSource: "Prototype planning threshold. Replace with Tajik Hydromet/local warning rules before operations.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.7,
      shadeGap: 0.64,
      populationExposure: 0.72,
      vulnerableFacilities: 0.62,
      transportMarketExposure: 0.7,
      nightRetention: 0.62,
      coolingAccessGap: 0.67,
    },
    riverCorridor: [
      [38.62, 68.72],
      [38.59, 68.75],
      [38.56, 68.79],
      [38.53, 68.84],
      [38.5, 68.88],
    ],
  },
  {
    id: "tashkent",
    name: "Tashkent",
    country: "Uzbekistan",
    region: "Central Asia",
    center: { lat: 41.2995, lon: 69.2401 },
    bbox: { south: 41.18, north: 41.41, west: 69.13, east: 69.38 },
    timezone: "Asia/Tashkent",
    climateContext: "Large irrigated Central Asian capital with dense transport corridors and summer heat.",
    dataTier: "Central Asia priority",
    dataScore0to100: 76,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "NASA POWER", status: "global", note: "Global meteorological history." },
      { label: "OpenStreetMap", status: "prototype", note: "Good candidate for a generated facilities/buildings grid." },
      { label: "Satellite rasters", status: "planned", note: "Landsat/Sentinel/WorldPop validation needed." },
    ],
    trigger: {
      temperatureC: 40,
      consecutiveDays: 3,
      season: "summer",
      leadTime: "3-5 days",
      official: false,
      officialSource: "Prototype planning threshold. Replace with Uzhydromet/local warning rules before operations.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.74,
      shadeGap: 0.61,
      populationExposure: 0.76,
      vulnerableFacilities: 0.64,
      transportMarketExposure: 0.78,
      nightRetention: 0.65,
      coolingAccessGap: 0.59,
    },
  },
  {
    id: "bishkek",
    name: "Bishkek",
    country: "Kyrgyzstan",
    region: "Central Asia",
    center: { lat: 42.8746, lon: 74.5698 },
    bbox: { south: 42.8, north: 42.94, west: 74.44, east: 74.72 },
    timezone: "Asia/Bishkek",
    climateContext: "Mountain-front capital with hot summers, irrigation corridors, and strong OSM coverage.",
    dataTier: "Central Asia priority",
    dataScore0to100: 71,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "NASA POWER", status: "global", note: "Global meteorological history." },
      { label: "OpenStreetMap", status: "prototype", note: "Good candidate for a generated grid." },
      { label: "Satellite rasters", status: "planned", note: "Validation needed." },
    ],
    trigger: {
      temperatureC: 38,
      consecutiveDays: 3,
      season: "summer",
      leadTime: "3-5 days",
      official: false,
      officialSource: "Prototype planning threshold. Replace with official local warning rules before operations.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.65,
      shadeGap: 0.57,
      populationExposure: 0.67,
      vulnerableFacilities: 0.58,
      transportMarketExposure: 0.69,
      nightRetention: 0.54,
      coolingAccessGap: 0.6,
    },
  },
  {
    id: "almaty",
    name: "Almaty",
    country: "Kazakhstan",
    region: "Central Asia",
    center: { lat: 43.2389, lon: 76.8897 },
    bbox: { south: 43.15, north: 43.35, west: 76.75, east: 77.05 },
    timezone: "Asia/Almaty",
    climateContext: "Large mountain-front city with strong open mapping and urban heat-island relevance.",
    dataTier: "Central Asia priority",
    dataScore0to100: 77,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "NASA POWER", status: "global", note: "Global meteorological history." },
      { label: "OpenStreetMap", status: "prototype", note: "Good candidate for a generated grid." },
      { label: "Satellite rasters", status: "planned", note: "Validation needed." },
    ],
    trigger: {
      temperatureC: 37,
      consecutiveDays: 3,
      season: "summer",
      leadTime: "3-5 days",
      official: false,
      officialSource: "Prototype planning threshold. Replace with official local warning rules before operations.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.72,
      shadeGap: 0.55,
      populationExposure: 0.74,
      vulnerableFacilities: 0.66,
      transportMarketExposure: 0.74,
      nightRetention: 0.58,
      coolingAccessGap: 0.54,
    },
  },
  {
    id: "new-york",
    name: "New York City",
    country: "United States",
    region: "North America",
    center: { lat: 40.7128, lon: -74.006 },
    bbox: { south: 40.49, north: 40.92, west: -74.27, east: -73.68 },
    timezone: "America/New_York",
    climateContext: "High-data benchmark city with official HVI, open data, dense OSM, and public health evidence.",
    dataTier: "High-data benchmark",
    dataScore0to100: 96,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "NYC HVI", status: "local", note: "Neighborhood heat vulnerability reference exists." },
      { label: "Open data", status: "local", note: "Extensive city open data and health indicators." },
      { label: "Satellite/population", status: "global", note: "Landsat, Sentinel, WorldPop/GHSL available." },
    ],
    trigger: {
      temperatureC: 35,
      consecutiveDays: 2,
      season: "summer",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official alerts remain with NWS/New York City authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.9,
      shadeGap: 0.66,
      populationExposure: 0.95,
      vulnerableFacilities: 0.8,
      transportMarketExposure: 0.92,
      nightRetention: 0.78,
      coolingAccessGap: 0.52,
    },
  },
  {
    id: "phoenix",
    name: "Phoenix",
    country: "United States",
    region: "North America",
    center: { lat: 33.4484, lon: -112.074 },
    bbox: { south: 33.29, north: 33.92, west: -112.33, east: -111.93 },
    timezone: "America/Phoenix",
    climateContext: "High-data extreme-heat benchmark with heat response plans, cooling maps, and regional heat surveillance.",
    dataTier: "High-data benchmark",
    dataScore0to100: 95,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "Heat response data", status: "local", note: "Heat plans, cooling centers, and mortality surveillance exist." },
      { label: "OpenStreetMap", status: "local", note: "Strong mapping coverage." },
      { label: "Satellite/population", status: "global", note: "High value for LST and shade validation." },
    ],
    trigger: {
      temperatureC: 43,
      consecutiveDays: 2,
      season: "summer",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official alerts remain with NWS/local authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.86,
      shadeGap: 0.86,
      populationExposure: 0.78,
      vulnerableFacilities: 0.72,
      transportMarketExposure: 0.72,
      nightRetention: 0.86,
      coolingAccessGap: 0.62,
    },
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    center: { lat: 51.5074, lon: -0.1278 },
    bbox: { south: 51.28, north: 51.7, west: -0.51, east: 0.33 },
    timezone: "Europe/London",
    climateContext: "High-data benchmark city with climate risk maps, open geospatial data, and strong research coverage.",
    dataTier: "High-data benchmark",
    dataScore0to100: 93,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "Climate risk maps", status: "local", note: "Heat exposure/vulnerability mapping exists." },
      { label: "Open geospatial data", status: "local", note: "Rich public geodata and OSM coverage." },
      { label: "Satellite/population", status: "global", note: "Strong validation candidate." },
    ],
    trigger: {
      temperatureC: 30,
      consecutiveDays: 2,
      season: "summer",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official heat-health alerts remain with UK/local authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.82,
      shadeGap: 0.55,
      populationExposure: 0.86,
      vulnerableFacilities: 0.76,
      transportMarketExposure: 0.88,
      nightRetention: 0.72,
      coolingAccessGap: 0.48,
    },
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    center: { lat: 48.8566, lon: 2.3522 },
    bbox: { south: 48.815, north: 48.902, west: 2.224, east: 2.47 },
    timezone: "Europe/Paris",
    climateContext: "High-data compact city with strong heat-action policy relevance and dense open mapping.",
    dataTier: "Global high-data city",
    dataScore0to100: 89,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "OpenStreetMap", status: "local", note: "Dense building and transport mapping." },
      { label: "Satellite/population", status: "global", note: "Excellent raster validation candidate." },
      { label: "Local heat policy", status: "local", note: "Known heat-action planning context." },
    ],
    trigger: {
      temperatureC: 34,
      consecutiveDays: 2,
      season: "summer",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official alerts remain with Meteo-France/local authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.92,
      shadeGap: 0.7,
      populationExposure: 0.9,
      vulnerableFacilities: 0.8,
      transportMarketExposure: 0.91,
      nightRetention: 0.82,
      coolingAccessGap: 0.52,
    },
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Southeast Asia",
    center: { lat: 1.3521, lon: 103.8198 },
    bbox: { south: 1.2, north: 1.48, west: 103.6, east: 104.05 },
    timezone: "Asia/Singapore",
    climateContext: "High-data tropical city-state with continuous heat stress, humidity, and strong urban-climate research.",
    dataTier: "Global high-data city",
    dataScore0to100: 91,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "Humidity/wet-bulb", status: "live", note: "Important for tropical heat-stress scoring." },
      { label: "Open geospatial data", status: "local", note: "Strong mapping and planning data ecosystem." },
      { label: "Satellite/population", status: "global", note: "Good validation candidate." },
    ],
    trigger: {
      temperatureC: 33,
      consecutiveDays: 3,
      season: "year-round hot season",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official alerts remain with national/local authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.85,
      shadeGap: 0.5,
      populationExposure: 0.88,
      vulnerableFacilities: 0.76,
      transportMarketExposure: 0.86,
      nightRetention: 0.78,
      coolingAccessGap: 0.36,
    },
  },
  {
    id: "delhi",
    name: "Delhi",
    country: "India",
    region: "South Asia",
    center: { lat: 28.6139, lon: 77.209 },
    bbox: { south: 28.4, north: 28.88, west: 76.84, east: 77.35 },
    timezone: "Asia/Kolkata",
    climateContext: "Major heat-risk megacity with strong exposure, high heat extremes, and global raster data coverage.",
    dataTier: "Global high-data city",
    dataScore0to100: 88,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "OpenStreetMap", status: "prototype", note: "Large candidate for OSM extraction." },
      { label: "Satellite/population", status: "global", note: "Strong WorldPop/GHSL and LST use case." },
      { label: "Local warning rules", status: "planned", note: "Must be connected before operational use." },
    ],
    trigger: {
      temperatureC: 42,
      consecutiveDays: 2,
      season: "pre-monsoon and summer",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official alerts remain with IMD/local authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.88,
      shadeGap: 0.78,
      populationExposure: 0.96,
      vulnerableFacilities: 0.82,
      transportMarketExposure: 0.9,
      nightRetention: 0.82,
      coolingAccessGap: 0.74,
    },
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "East Asia",
    center: { lat: 35.6762, lon: 139.6503 },
    bbox: { south: 35.52, north: 35.82, west: 139.55, east: 139.92 },
    timezone: "Asia/Tokyo",
    climateContext: "High-data megacity with dense transport, high humidity, and strong urban-climate research coverage.",
    dataTier: "Global high-data city",
    dataScore0to100: 92,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "OpenStreetMap", status: "local", note: "Dense buildings and transport features." },
      { label: "Satellite/population", status: "global", note: "Excellent validation candidate." },
      { label: "Humidity/wet-bulb", status: "live", note: "Important for summer heat stress." },
    ],
    trigger: {
      temperatureC: 35,
      consecutiveDays: 2,
      season: "summer",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official alerts remain with Japanese/local authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.9,
      shadeGap: 0.58,
      populationExposure: 0.94,
      vulnerableFacilities: 0.84,
      transportMarketExposure: 0.96,
      nightRetention: 0.8,
      coolingAccessGap: 0.34,
    },
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    center: { lat: -33.8688, lon: 151.2093 },
    bbox: { south: -34.05, north: -33.7, west: 150.95, east: 151.35 },
    timezone: "Australia/Sydney",
    climateContext: "High-data city with heat-health planning, open geospatial data, and coastal/inland gradients.",
    dataTier: "Global high-data city",
    dataScore0to100: 87,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "Open geospatial data", status: "local", note: "Strong urban planning and climate data ecosystem." },
      { label: "Satellite/population", status: "global", note: "Good validation candidate." },
      { label: "Coastal gradient", status: "prototype", note: "Needs local station/sensor calibration." },
    ],
    trigger: {
      temperatureC: 36,
      consecutiveDays: 2,
      season: "summer",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official alerts remain with Australian/local authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.76,
      shadeGap: 0.57,
      populationExposure: 0.78,
      vulnerableFacilities: 0.7,
      transportMarketExposure: 0.78,
      nightRetention: 0.58,
      coolingAccessGap: 0.42,
    },
  },
  {
    id: "sao-paulo",
    name: "Sao Paulo",
    country: "Brazil",
    region: "South America",
    center: { lat: -23.5505, lon: -46.6333 },
    bbox: { south: -23.75, north: -23.35, west: -46.83, east: -46.36 },
    timezone: "America/Sao_Paulo",
    climateContext: "High-data Latin American megacity with dense exposure, strong OSM, and satellite validation potential.",
    dataTier: "Global high-data city",
    dataScore0to100: 86,
    dataCoverage: [
      { label: "Open-Meteo forecast", status: "live", note: "Live non-official forecast." },
      { label: "OpenStreetMap", status: "local", note: "Strong urban feature coverage." },
      { label: "Satellite/population", status: "global", note: "Good validation candidate." },
      { label: "Local warning rules", status: "planned", note: "Must be connected before operational use." },
    ],
    trigger: {
      temperatureC: 34,
      consecutiveDays: 2,
      season: "warm season",
      leadTime: "2-5 days",
      official: false,
      officialSource: "Prototype dashboard threshold. Official alerts remain with Brazilian/local authorities.",
    },
    emergency: { caveat: localEmergencyCaveat },
    urbanHeatProfile: {
      builtIntensity: 0.84,
      shadeGap: 0.62,
      populationExposure: 0.9,
      vulnerableFacilities: 0.78,
      transportMarketExposure: 0.88,
      nightRetention: 0.72,
      coolingAccessGap: 0.58,
    },
  },
];

export const DEFAULT_CITY_ID: CityId = "khujand";

export function getCityProfile(cityId: string | null | undefined): CityProfile {
  return CITY_PROFILES.find((city) => city.id === cityId) ?? CITY_PROFILES[0];
}
