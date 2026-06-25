import type { HeatState } from "./lib/risk";

export type LanguageCode = "en" | "ru" | "tg";

export type LocaleCopy = {
  languageName: string;
  app: {
    title: string;
    eyebrow: string;
    officialNote: string;
    languageLabel: string;
  };
  common: {
    loading: string;
    live: string;
    sample: string;
    fallback: string;
    unavailable: string;
    open: string;
    all: string;
    links: string;
    source: string;
    marked: string;
    days: string;
    level: string;
  };
  forecast: {
    eyebrow: string;
    high: string;
    hottestDay: string;
    triggerStreak: string;
    data: string;
    gridPoint: string;
    timezone: string;
    elevation: string;
    fetched: string;
    loadingDescription: string;
    unavailableDescription: string;
    fallbackPrefix: string;
    failure: string;
    state: Record<HeatState, string>;
    explanation: Record<HeatState, string>;
  };
  trigger: {
    eyebrow: string;
    title: string;
    body: string;
  };
  priority: {
    eyebrow: string;
    title: string;
    priority: string;
  };
  zones: Record<
    string,
    {
      name: string;
      type: string;
      priority: string;
      actions: string[];
    }
  >;
  map: {
    eyebrow: string;
    title: string;
    badge: string;
    cityCenter: string;
    prototypeZone: string;
    estimatedBoundary: string;
    boundaryConfidence: string;
    selectedHour: string;
    riskScore: string;
    apparentTemp: string;
    wetBulb: string;
    topDrivers: string;
    recommendedAction: string;
    date: string;
    hour: string;
    play: string;
    pause: string;
    showCooling: string;
    showBoundary: string;
    showCenters: string;
    hottestDefault: string;
    nonOfficial: string;
    legendLow: string;
    legendMinor: string;
    legendModerate: string;
    legendMajor: string;
    legendExtreme: string;
    loadingHourly: string;
    fallbackHourly: string;
    riverContext: string;
  };
  charts: {
    outlookEyebrow: string;
    outlookTitle: string;
    thresholdLine: string;
    sampleFallback: string;
    loading: string;
    unavailable: string;
    waiting: string;
    forecastNote: string;
    historicalEyebrow: string;
    historicalTitle: string;
    apiLoaded: string;
    historicalNote: string;
  };
  evidence: {
    trigger: string;
    forecast: string;
    context: string;
    health: string;
    forecastValue: string;
    contextValue: string;
    healthValue: string;
  };
  action: {
    eyebrow: string;
    title: string;
    residents: string;
    schools: string;
    clinics: string;
    workers: string;
    residentsActions: string[];
    schoolActions: string[];
    clinicActions: string[];
    workerActions: string[];
    emergencyTitle: string;
    emergencySteps: string[];
    emergencyCaveat: string;
  };
  interventions: {
    eyebrow: string;
    title: string;
    reduction: string;
    prototype: string;
    coolRoof: string;
    shade: string;
    water: string;
    coolingRoom: string;
    transitShade: string;
  };
  benchmark: {
    riskEyebrow: string;
    riskTitle: string;
    riskBody: string;
    levels: string[];
    workflowEyebrow: string;
    workflowTitle: string;
    workflowSteps: string[];
    vulnerabilityEyebrow: string;
    vulnerabilityTitle: string;
    vulnerabilityFactors: string[];
  };
  scientific: {
    eyebrow: string;
    title: string;
    body: string;
    showGrid: string;
    gridCell: string;
    score: string;
    dynamicScore: string;
    microclimateTemp: string;
    uncertainty: string;
    scorePoints: string;
    hazard: string;
    exposure: string;
    vulnerability: string;
    adaptiveCapacityGap: string;
    solarRadiation: string;
    heatPersistence: string;
    lowWind: string;
    confidence: string;
    drivers: string;
    components: string;
    integratedLayers: string;
    proxyLayers: string;
    missingLayers: string;
    benchmarkPatterns: string;
    benchmarkItems: string[];
    riskEquation: string;
    confidenceLimit: string;
    confidenceLimitBody: string;
    dataWarnings: string;
    sourceCounts: string;
    topCells: string;
    generated: string;
    cellSize: string;
    weights: string;
    modelVersion: string;
    surfaceHeatProxy: string;
    lowShadeProxy: string;
    populationExposureProxy: string;
    vulnerableFacilities: string;
    transportMarketExposure: string;
  };
  method: {
    eyebrow: string;
    title: string;
    body: string;
    formula: string;
    note: string;
  };
  limits: {
    eyebrow: string;
    title: string;
    items: string[];
    status: string;
  };
  sources: {
    eyebrow: string;
    title: string;
    search: string;
    originalCoverage: string;
    addedApi: string;
    addedReferences: string;
    primarySources: string;
    badge: string;
  };
};

const en: LocaleCopy = {
  languageName: "English",
  app: {
    eyebrow: "HeatShield Khujand",
    title: "Live Heat-Risk Dashboard",
    officialNote: "Official warnings: Tajik Hydromet and local authorities.",
    languageLabel: "Language",
  },
  common: {
    loading: "Loading",
    live: "Live",
    sample: "Sample",
    fallback: "Fallback",
    unavailable: "Unavailable",
    open: "Open",
    all: "All",
    links: "links",
    source: "source",
    marked: "marked",
    days: "days",
    level: "level",
  },
  forecast: {
    eyebrow: "Non-official forecast",
    high: "forecast high",
    hottestDay: "Hottest day",
    triggerStreak: "Trigger streak",
    data: "Data",
    gridPoint: "Grid point",
    timezone: "Timezone",
    elevation: "Elevation",
    fetched: "Fetched",
    loadingDescription: "Checking Open-Meteo for Khujand. The risk state remains neutral until the live request resolves.",
    unavailableDescription: "Forecast data is unavailable. Use official local warnings and heat precautions.",
    fallbackPrefix: "Sample fallback only",
    failure: "Live forecast failed",
    state: {
      Normal: "Normal",
      Watch: "Watch",
      Danger: "Danger",
      "Trigger-like": "Trigger-like",
    },
    explanation: {
      Normal: "Forecast heat is below the official trigger threshold, but hot-weather precautions still matter for vulnerable groups.",
      Watch: "Forecast heat is near the official threshold. Prepare cooling actions before conditions intensify.",
      Danger: "At least one forecast day meets or exceeds the Khujand/Sughd heat threshold. Prioritize vulnerable people and outdoor activities.",
      "Trigger-like": "Forecast temperatures resemble the official heatwave trigger pattern. Treat this as non-official early intelligence.",
    },
  },
  trigger: {
    eyebrow: "IFRC/Tajikistan EAP",
    title: "Khujand trigger context",
    body: "Khujand and nearby Sughd districts are listed under a northern heatwave threshold of {temp}C for {days} consecutive days in {season}.",
  },
  priority: {
    eyebrow: "Action ranking",
    title: "Priority places",
    priority: "priority",
  },
  zones: {
    "panjshanbe-market": {
      name: "Panjshanbe market and central public space",
      type: "Market",
      priority: "Very high",
      actions: ["Shade queues and stalls", "Public water point", "Heat warning posters", "First-aid check point"],
    },
    "central-clinics": {
      name: "Central clinic and pharmacy cluster",
      type: "Clinic",
      priority: "Very high",
      actions: ["Cooling room", "Backup water", "Volunteer check-ins", "Priority SMS to vulnerable patients"],
    },
    "school-microdistrict": {
      name: "Dense school microdistrict",
      type: "School",
      priority: "High",
      actions: ["Morning-only outdoor activity", "Shade canopy", "Cool roof audit", "Classroom hydration routine"],
    },
    "dense-residential-east": {
      name: "Dense eastern residential blocks",
      type: "Residential",
      priority: "High",
      actions: ["Cool roof pilots", "Door-to-door vulnerable checks", "Night ventilation guidance", "Shared cooling space"],
    },
    "transport-corridor": {
      name: "Main transport and bus-stop corridor",
      type: "Transport",
      priority: "High",
      actions: ["Shade bus stops", "Water refill points", "Heat signage", "Peak-hour service continuity"],
    },
    "syr-darya-cooling": {
      name: "Syr Darya river cooling-gradient check",
      type: "Cooling corridor",
      priority: "Medium",
      actions: ["Compare nearby street temperatures", "Protect tree cover", "Map cool routes", "Sensor validation transect"],
    },
  },
  map: {
    eyebrow: "City risk story",
    title: "Khujand heat action map",
    badge: "prototype zones",
    cityCenter: "Khujand city center",
    prototypeZone: "prototype heat planning zone",
    estimatedBoundary: "estimated heat-region boundary",
    boundaryConfidence: "Boundary confidence",
    selectedHour: "Selected hour",
    riskScore: "Risk score",
    apparentTemp: "Apparent temp",
    wetBulb: "Wet-bulb",
    topDrivers: "Top drivers",
    recommendedAction: "Recommended action",
    date: "Date",
    hour: "Hour",
    play: "Play",
    pause: "Pause",
    showCooling: "Cooling context",
    showBoundary: "Region boundaries",
    showCenters: "Center markers",
    hottestDefault: "Defaulted to hottest forecast hour.",
    nonOfficial: "Hourly hotspot scores are non-official prototype planning intelligence.",
    legendLow: "0 Little/no risk",
    legendMinor: "1 Minor",
    legendModerate: "2 Moderate",
    legendMajor: "3 Major",
    legendExtreme: "4 Extreme",
    loadingHourly: "Loading hourly forecast",
    fallbackHourly: "Sample hourly fallback",
    riverContext: "Syr Darya cooling context, optional layer",
  },
  charts: {
    outlookEyebrow: "7-day outlook",
    outlookTitle: "Forecast threshold check",
    thresholdLine: "39.5C trigger line",
    sampleFallback: "sample fallback",
    loading: "loading",
    unavailable: "unavailable",
    waiting: "Waiting for Open-Meteo before drawing the threshold check.",
    forecastNote: "Apparent temperature helps show why humidity and wind matter. This panel is not an official warning.",
    historicalEyebrow: "NASA POWER sample",
    historicalTitle: "Historical heat context",
    apiLoaded: "API loaded",
    historicalNote: "The sample provides context only. Official station records and Tajik Hydromet warnings should be incorporated through partnership.",
  },
  evidence: {
    trigger: "Official trigger",
    forecast: "Forecast source",
    context: "Heat context",
    health: "Health focus",
    forecastValue: "Open-Meteo, non-official",
    contextValue: "Syr Darya valley city",
    healthValue: "Children, elderly, pregnant people, chronic disease",
  },
  action: {
    eyebrow: "Dangerous heat actions",
    title: "What to do first",
    residents: "Residents",
    schools: "Schools",
    clinics: "Clinics",
    workers: "Outdoor Workers",
    residentsActions: ["Spend 2-3 daytime hours in a cool place.", "Drink water before thirst.", "Check on older neighbors and people living alone."],
    schoolActions: ["Move sport and outdoor work to early morning.", "Keep shaded water breaks.", "Use a cool room for symptoms or high-risk children."],
    clinicActions: ["Prepare oral rehydration supplies.", "Keep triage space cool.", "Flag elderly, pregnant, disabled, and chronic-disease patients."],
    workerActions: ["Use water-rest-shade routines.", "Pair workers for symptom checks.", "Stop heavy tasks during peak afternoon heat."],
    emergencyTitle: "Heat stroke response",
    emergencySteps: [
      "Confusion, collapse, seizure, very hot body, or unconsciousness is an emergency.",
      "Call local emergency help: ambulance 03 from landline / 103 from mobile.",
      "Move the person to shade or a cool room and start cooling immediately.",
      "Use wet cloths, cool water, fanning, or an ice bath if safe and available.",
      "Do not wait for symptoms to pass if heat stroke is suspected.",
    ],
    emergencyCaveat: "Emergency numbers and clinical advice should be verified locally. The dashboard does not replace medical care or official warnings.",
  },
  interventions: {
    eyebrow: "Adaptation planner",
    title: "Cooling scenario planner",
    reduction: "estimated score reduction",
    prototype: "prototype estimate",
    coolRoof: "Cool roofs",
    shade: "Trees / shade",
    water: "Water point",
    coolingRoom: "Cooling room",
    transitShade: "Shaded transport stop",
  },
  benchmark: {
    riskEyebrow: "Benchmark pattern",
    riskTitle: "HeatRisk-style levels",
    riskBody: "The dashboard borrows a clear 0-4 risk language from operational heat-health tools while keeping Tajik Hydromet as the official warning source.",
    levels: ["0 Little/no risk", "1 Minor: sensitive people", "2 Moderate: vulnerable groups", "3 Major: most people without cooling", "4 Extreme: rare or long-duration heat"],
    workflowEyebrow: "Heat action workflow",
    workflowTitle: "Assess / Plan / Act / Monitor",
    workflowSteps: ["Assess hotspots and vulnerable groups", "Plan cooling and outreach", "Act before peak heat", "Monitor results and data gaps"],
    vulnerabilityEyebrow: "Vulnerability factors",
    vulnerabilityTitle: "What drives local risk",
    vulnerabilityFactors: ["Surface and pavement exposure", "Crowding and outdoor activity", "Critical services and clinics", "Night heat retention", "Low cooling access"],
  },
  scientific: {
    eyebrow: "Scientific risk surface",
    title: "650 m OSM-derived heat-risk grid",
    body: "This pass replaces pure hand-drawn priority zones with a reproducible grid model. It uses mapped buildings, schools, healthcare, markets, and transit from OpenStreetMap, then keeps satellite/population layers marked as next validated inputs.",
    showGrid: "Scientific grid",
    gridCell: "Grid cell",
    score: "Scientific score",
    dynamicScore: "Dynamic risk score",
    microclimateTemp: "Microclimate apparent temperature",
    uncertainty: "Uncertainty band",
    scorePoints: "score points",
    hazard: "Hourly heat hazard",
    exposure: "Exposure",
    vulnerability: "Vulnerability",
    adaptiveCapacityGap: "Adaptive-capacity gap",
    solarRadiation: "Solar radiation",
    heatPersistence: "Heat persistence / hot night",
    lowWind: "Low wind",
    confidence: "Confidence",
    drivers: "Drivers",
    components: "Components",
    integratedLayers: "Integrated layers",
    proxyLayers: "Proxy layers",
    missingLayers: "Still missing validation",
    benchmarkPatterns: "SOTA patterns used",
    benchmarkItems: [
      "NWS/CDC HeatRisk: 0-4 impact levels, duration, overnight relief, and health-sensitive categories",
      "IPCC AR6: hazard, exposure, vulnerability, uncertainty, and response capacity",
      "NYC HVI: surface heat, green space/shade, cooling access, income, and neighborhood vulnerability",
      "WRI/SOLWEIG-UTCI: microclimate and shade-aware heat exposure as the future target model",
    ],
    riskEquation: "Dynamic risk equation",
    confidenceLimit: "Confidence ceiling",
    confidenceLimitBody:
      "Confidence is capped because this dashboard has live weather and OSM proxies, but not yet processed Landsat LST, Sentinel-2 shade/vegetation, WorldPop population, Tajik Hydromet observations, or field sensors.",
    dataWarnings: "Data warnings",
    sourceCounts: "Source counts",
    topCells: "Highest-scoring cells",
    generated: "Generated",
    cellSize: "Cell size",
    weights: "Model weights",
    modelVersion: "Model version",
    surfaceHeatProxy: "Surface heat proxy",
    lowShadeProxy: "Low shade proxy",
    populationExposureProxy: "Population exposure proxy",
    vulnerableFacilities: "Vulnerable facilities",
    transportMarketExposure: "Transport/market exposure",
  },
  method: {
    eyebrow: "Scientific method",
    title: "How HeatShield scores risk",
    body: "The live state still checks the IFRC/Tajikistan trigger, but the map now follows a climate-risk structure: hourly heat hazard is combined with place exposure, vulnerability, adaptive-capacity gaps, and an uncertainty band.",
    formula: "Risk = hazard + exposure + vulnerability + adaptive-capacity gap + heat-vulnerability interaction",
    note: "This is a transparent scientific prototype. It becomes validation-grade only after Landsat LST, Sentinel-2 shade/vegetation, WorldPop population, Hydromet observations, and local sensor calibration are processed.",
  },
  limits: {
    eyebrow: "Data limits",
    title: "Trust boundaries",
    items: [
      "Open-Meteo is a non-official forecast; official warnings remain with Tajik Hydromet and local authorities.",
      "Hotspot boundaries are prototype planning zones, not official administrative boundaries.",
      "Emergency numbers, clinic workflows, and public alerts should be verified with local partners before launch.",
    ],
    status: "Forecast status",
  },
  sources: {
    eyebrow: "Source audit",
    title: "Evidence inventory",
    search: "Search sources",
    originalCoverage: "Original HTML coverage",
    addedApi: "Added live APIs",
    addedReferences: "Added benchmarks/language",
    primarySources: "Primary sources",
    badge: "{original} source links + {api} live API + {added} added references",
  },
};

const ru: LocaleCopy = {
  ...en,
  languageName: "Русский",
  app: {
    eyebrow: "HeatShield Худжанд",
    title: "Панель теплового риска",
    officialNote: "Официальные предупреждения: Таджикгидромет и местные органы.",
    languageLabel: "Язык",
  },
  common: {
    loading: "Загрузка",
    live: "Онлайн",
    sample: "Пример",
    fallback: "Резерв",
    unavailable: "Недоступно",
    open: "Открыть",
    all: "Все",
    links: "ссылок",
    source: "источник",
    marked: "отмечено",
    days: "дней",
    level: "уровень",
  },
  forecast: {
    ...en.forecast,
    eyebrow: "Неофициальный прогноз",
    high: "максимум прогноза",
    hottestDay: "Самый жаркий день",
    triggerStreak: "Дней у порога",
    data: "Данные",
    gridPoint: "Точка сетки",
    timezone: "Часовой пояс",
    elevation: "Высота",
    fetched: "Обновлено",
    loadingDescription: "Проверяем Open-Meteo для Худжанда. Статус риска остается нейтральным до загрузки данных.",
    unavailableDescription: "Прогноз недоступен. Используйте официальные местные предупреждения и меры защиты от жары.",
    fallbackPrefix: "Только пример резервных данных",
    failure: "Онлайн-прогноз не загрузился",
    state: {
      Normal: "Норма",
      Watch: "Наблюдение",
      Danger: "Опасность",
      "Trigger-like": "Похоже на триггер",
    },
    explanation: {
      Normal: "Прогноз ниже официального порога, но меры защиты важны для уязвимых групп.",
      Watch: "Жара близка к официальному порогу. Подготовьте охлаждающие действия заранее.",
      Danger: "Хотя бы один день достигает или превышает порог для Худжанда/Согда. Приоритет — уязвимые люди и работа на улице.",
      "Trigger-like": "Прогноз похож на официальный тепловой триггер. Это неофициальная ранняя аналитика.",
    },
  },
  trigger: {
    eyebrow: "IFRC/Tajikistan EAP",
    title: "Официальный контекст порога",
    body: "Худжанд и близлежащие районы Согда указаны с северным порогом жары {temp}C в течение {days} дней подряд в сезон {season}.",
  },
  priority: {
    eyebrow: "Приоритет действий",
    title: "Важные места",
    priority: "приоритет",
  },
  zones: {
    "panjshanbe-market": {
      name: "Рынок Панчшанбе и центральные общественные пространства",
      type: "Рынок",
      priority: "Очень высокий",
      actions: ["Тень для очередей и прилавков", "Общественная точка воды", "Плакаты о жаре", "Пункт первой помощи"],
    },
    "central-clinics": {
      name: "Кластер центральных клиник и аптек",
      type: "Клиники",
      priority: "Очень высокий",
      actions: ["Прохладная комната", "Запас воды", "Проверки волонтерами", "Приоритетные SMS уязвимым пациентам"],
    },
    "school-microdistrict": {
      name: "Плотный школьный микрорайон",
      type: "Школы",
      priority: "Высокий",
      actions: ["Активности на улице только утром", "Теневой навес", "Аудит прохладной крыши", "Режим питья в классах"],
    },
    "dense-residential-east": {
      name: "Плотные восточные жилые кварталы",
      type: "Жилой район",
      priority: "Высокий",
      actions: ["Пилоты прохладных крыш", "Проверки уязвимых жителей", "Советы по ночной вентиляции", "Общее прохладное помещение"],
    },
    "transport-corridor": {
      name: "Главный транспортный коридор и остановки",
      type: "Транспорт",
      priority: "Высокий",
      actions: ["Тень на остановках", "Точки пополнения воды", "Тепловые объявления", "Стабильность сервиса в пик жары"],
    },
    "syr-darya-cooling": {
      name: "Проверка охлаждающего коридора Сырдарьи",
      type: "Охлаждающий коридор",
      priority: "Средний",
      actions: ["Сравнить температуру соседних улиц", "Защитить деревья", "Карта прохладных маршрутов", "Сенсорный маршрут проверки"],
    },
  },
  map: {
    ...en.map,
    eyebrow: "Городская карта риска",
    title: "Карта действий при жаре",
    badge: "прототип зон",
    cityCenter: "Центр Худжанда",
    prototypeZone: "прототип зоны теплового планирования",
    estimatedBoundary: "оценочная граница hotspot-региона",
    boundaryConfidence: "Надежность границы",
    selectedHour: "Выбранный час",
    riskScore: "Оценка риска",
    apparentTemp: "Ощущаемая температура",
    wetBulb: "Влажный термометр",
    topDrivers: "Главные факторы",
    recommendedAction: "Рекомендуемое действие",
    date: "Дата",
    hour: "Час",
    play: "Пуск",
    pause: "Пауза",
    showCooling: "Контекст охлаждения",
    showBoundary: "Границы регионов",
    showCenters: "Центры зон",
    hottestDefault: "По умолчанию выбран самый жаркий прогнозный час.",
    nonOfficial: "Почасовые оценки hotspot-регионов — неофициальный прототип для планирования.",
    legendLow: "0 Низкий риск",
    legendMinor: "1 Небольшой",
    legendModerate: "2 Умеренный",
    legendMajor: "3 Высокий",
    legendExtreme: "4 Экстремальный",
    loadingHourly: "Загрузка почасового прогноза",
    fallbackHourly: "Пример почасовых данных",
    riverContext: "Контекст охлаждения Сырдарьи, необязательный слой",
  },
  charts: {
    ...en.charts,
    outlookEyebrow: "Прогноз на 7 дней",
    outlookTitle: "Проверка порога",
    thresholdLine: "линия порога 39.5C",
    sampleFallback: "пример данных",
    loading: "загрузка",
    unavailable: "недоступно",
    waiting: "Ждем Open-Meteo перед построением графика.",
    forecastNote: "Ощущаемая температура показывает влияние влажности и ветра. Это не официальное предупреждение.",
    historicalEyebrow: "Пример NASA POWER",
    historicalTitle: "Исторический контекст жары",
    apiLoaded: "API загружен",
    historicalNote: "Пример дает только контекст. Официальные наблюдения и предупреждения Таджикгидромета нужно подключать через партнерство.",
  },
  evidence: {
    trigger: "Официальный порог",
    forecast: "Источник прогноза",
    context: "Контекст жары",
    health: "Фокус здоровья",
    forecastValue: "Open-Meteo, неофициально",
    contextValue: "Город в долине Сырдарьи",
    healthValue: "Дети, пожилые, беременные, хронические болезни",
  },
  action: {
    ...en.action,
    eyebrow: "Действия при опасной жаре",
    title: "Что делать сначала",
    residents: "Жители",
    schools: "Школы",
    clinics: "Клиники",
    workers: "Работники на улице",
    residentsActions: ["Проводить 2-3 дневных часа в прохладном месте.", "Пить воду до появления жажды.", "Проверять пожилых соседей и людей, живущих одних."],
    schoolActions: ["Перенести спорт и работы на раннее утро.", "Делать перерывы в тени с водой.", "Выделить прохладную комнату для детей с симптомами."],
    clinicActions: ["Подготовить растворы для регидратации.", "Сохранять прохладную зону триажа.", "Отмечать пожилых, беременных и пациентов с хроническими болезнями."],
    workerActions: ["Ввести режим вода-отдых-тень.", "Работать парами для проверки симптомов.", "Остановить тяжелые задачи в пик дневной жары."],
    emergencyTitle: "Ответ на тепловой удар",
    emergencySteps: [
      "Спутанность, обморок, судороги, очень горячее тело или потеря сознания — экстренная ситуация.",
      "Вызовите местную помощь: скорая 03 со стационарного / 103 с мобильного.",
      "Переместите человека в тень или прохладное помещение и начните охлаждать.",
      "Используйте влажные ткани, прохладную воду, обдув или ледяную ванну, если это безопасно.",
      "Не ждите, если есть подозрение на тепловой удар.",
    ],
    emergencyCaveat: "Номера экстренной помощи и медицинские советы нужно проверить локально. Панель не заменяет медицинскую помощь и официальные предупреждения.",
  },
  interventions: {
    eyebrow: "План адаптации",
    title: "Сценарии охлаждения",
    reduction: "оценочное снижение риска",
    prototype: "прототипная оценка",
    coolRoof: "Холодные крыши",
    shade: "Деревья / тень",
    water: "Точка воды",
    coolingRoom: "Прохладная комната",
    transitShade: "Тень на остановках",
  },
  benchmark: {
    riskEyebrow: "Шаблон лучших систем",
    riskTitle: "Уровни в стиле HeatRisk",
    riskBody: "Панель использует понятный язык риска 0-4 из тепловых систем, но официальным источником предупреждений остается Таджикгидромет.",
    levels: ["0 Низкий риск", "1 Небольшой: чувствительные люди", "2 Умеренный: уязвимые группы", "3 Высокий: большинство людей без охлаждения", "4 Экстремальный: редкая или длительная жара"],
    workflowEyebrow: "Процесс действий",
    workflowTitle: "Оценить / Планировать / Действовать / Отслеживать",
    workflowSteps: ["Оценить hotspot-регионы и уязвимые группы", "Спланировать охлаждение и информирование", "Действовать до пика жары", "Отслеживать результаты и пробелы данных"],
    vulnerabilityEyebrow: "Факторы уязвимости",
    vulnerabilityTitle: "Что усиливает местный риск",
    vulnerabilityFactors: ["Покрытия и асфальт", "Скопление людей и активность на улице", "Критические службы и клиники", "Ночная задержка тепла", "Ограниченный доступ к охлаждению"],
  },
  scientific: {
    eyebrow: "Научная поверхность риска",
    title: "650-метровая grid-модель на основе OSM",
    body: "Эта версия добавляет воспроизводимую сетку риска вместо только ручных зон. Модель использует здания, школы, медицину, рынки и транспорт из OpenStreetMap, а спутниковые и демографические слои честно отмечает как следующий этап валидации.",
    showGrid: "Научная сетка",
    gridCell: "Ячейка сетки",
    score: "Научный score",
    dynamicScore: "Динамический индекс риска",
    microclimateTemp: "Ощущаемая температура микроклимата",
    uncertainty: "Диапазон неопределенности",
    scorePoints: "пунктов индекса",
    hazard: "Почасовая тепловая опасность",
    exposure: "Экспозиция",
    vulnerability: "Уязвимость",
    adaptiveCapacityGap: "Дефицит адаптационной способности",
    solarRadiation: "Солнечная радиация",
    heatPersistence: "Длительность жары / жаркая ночь",
    lowWind: "Слабый ветер",
    confidence: "Уверенность",
    drivers: "Факторы",
    components: "Компоненты",
    integratedLayers: "Интегрированные слои",
    proxyLayers: "Прокси-слои",
    missingLayers: "Еще нужна валидация",
    benchmarkPatterns: "Использованные SOTA-подходы",
    benchmarkItems: [
      "NWS/CDC HeatRisk: уровни воздействия 0-4, длительность жары, ночное облегчение и группы риска",
      "IPCC AR6: опасность, экспозиция, уязвимость, неопределенность и способность реагировать",
      "NYC HVI: температура поверхности, зеленые зоны/тень, доступ к охлаждению, доход и уязвимость района",
      "WRI/SOLWEIG-UTCI: микроклимат и тень как целевая модель будущего геопайплайна",
    ],
    riskEquation: "Динамическая формула риска",
    confidenceLimit: "Потолок уверенности",
    confidenceLimitBody:
      "Уверенность ограничена, потому что сейчас есть live-погода и OSM-прокси, но еще нет обработанных Landsat LST, Sentinel-2 тени/растительности, WorldPop, наблюдений Таджикгидромета и полевых сенсоров.",
    dataWarnings: "Предупреждения по данным",
    sourceCounts: "Количество объектов",
    topCells: "Самые рискованные ячейки",
    generated: "Сгенерировано",
    cellSize: "Размер ячейки",
    weights: "Веса модели",
    modelVersion: "Версия модели",
    surfaceHeatProxy: "Прокси нагрева поверхности",
    lowShadeProxy: "Прокси нехватки тени",
    populationExposureProxy: "Прокси экспозиции населения",
    vulnerableFacilities: "Уязвимые объекты",
    transportMarketExposure: "Транспорт/рынки",
  },
  method: {
    eyebrow: "Научный метод",
    title: "Как HeatShield оценивает риск",
    body: "Общий статус по-прежнему сверяет прогноз с порогом IFRC/Tajikistan, но карта теперь использует климатическую структуру риска: почасовая тепловая опасность объединяется с экспозицией места, уязвимостью, дефицитом адаптационной способности и диапазоном неопределенности.",
    formula: "Риск = опасность + экспозиция + уязвимость + дефицит адаптации + взаимодействие жары и уязвимости",
    note: "Это прозрачный научный прототип. До уровня валидации ему нужны обработанные Landsat LST, Sentinel-2 тень/растительность, WorldPop, наблюдения Таджикгидромета и калибровка локальными сенсорами.",
  },
  limits: {
    eyebrow: "Ограничения данных",
    title: "Границы доверия",
    items: [
      "Open-Meteo — неофициальный прогноз; официальные предупреждения остаются за Таджикгидрометом и местными органами.",
      "Границы hotspot-регионов — прототипные зоны планирования, а не официальные административные границы.",
      "Номера экстренной помощи, процессы клиник и публичные предупреждения нужно проверить с местными партнерами.",
    ],
    status: "Статус прогноза",
  },
  sources: {
    eyebrow: "Аудит источников",
    title: "Инвентарь доказательств",
    search: "Поиск источников",
    originalCoverage: "Покрытие исходного HTML",
    addedApi: "Добавленные API",
    addedReferences: "Бенчмарки и языковые источники",
    primarySources: "Основные источники",
    badge: "{original} исходных ссылок + {api} live API + {added} новых источников",
  },
};

const tg: LocaleCopy = {
  ...ru,
  languageName: "Тоҷикӣ",
  app: {
    eyebrow: "HeatShield Хуҷанд",
    title: "Панели зиндаи хатари гармӣ",
    officialNote: "Огоҳии расмӣ: Агентии обуҳавошиносӣ ва мақомоти маҳаллӣ.",
    languageLabel: "Забон",
  },
  common: {
    loading: "Бор мешавад",
    live: "Зинда",
    sample: "Намуна",
    fallback: "Захиравӣ",
    unavailable: "Дастнорас",
    open: "Кушодан",
    all: "Ҳама",
    links: "пайванд",
    source: "манбаъ",
    marked: "нишоншуда",
    days: "рӯз",
    level: "сатҳ",
  },
  forecast: {
    ...ru.forecast,
    eyebrow: "Пешгӯии ғайрирасмӣ",
    high: "ҳарорати баланд",
    hottestDay: "Рӯзи гармтарин",
    triggerStreak: "Рӯзҳои остона",
    data: "Маълумот",
    loadingDescription: "Open-Meteo барои Хуҷанд санҷида мешавад. То бор шудани маълумот ҳолати риск бетараф мемонад.",
    fallbackPrefix: "Танҳо маълумоти намунавии захиравӣ",
    failure: "Пешгӯии зинда бор нашуд",
  },
  trigger: {
    eyebrow: "IFRC/Tajikistan EAP",
    title: "Контексти остонаи расмӣ",
    body: "Хуҷанд ва ноҳияҳои наздики Суғд барои шимол остонаи гармии {temp}C дар давоми {days} рӯзи пайдарпай дар мавсими {season} доранд.",
  },
  priority: {
    eyebrow: "Афзалияти амал",
    title: "Ҷойҳои муҳим",
    priority: "афзалият",
  },
  zones: {
    "panjshanbe-market": {
      name: "Бозори Панҷшанбе ва фазои марказии ҷамъиятӣ",
      type: "Бозор",
      priority: "Хеле баланд",
      actions: ["Соя барои навбат ва дӯконҳо", "Нуқтаи оби ҷамъиятӣ", "Плакатҳои огоҳӣ аз гармӣ", "Нуқтаи ёрии аввал"],
    },
    "central-clinics": {
      name: "Кластери клиникаҳо ва дорухонаҳои марказӣ",
      type: "Клиника",
      priority: "Хеле баланд",
      actions: ["Ҳуҷраи хунук", "Захираи об", "Санҷиши ихтиёриён", "SMS-и афзалиятнок ба беморони осебпазир"],
    },
    "school-microdistrict": {
      name: "Микрорайони зичи мактабҳо",
      type: "Мактаб",
      priority: "Баланд",
      actions: ["Фаъолияти беруна танҳо саҳар", "Соябон", "Санҷиши боми сард", "Реҷаи нӯшидани об дар синф"],
    },
    "dense-residential-east": {
      name: "Кварталҳои зичи истиқоматии шарқӣ",
      type: "Истиқоматӣ",
      priority: "Баланд",
      actions: ["Пилоти бомҳои сард", "Санҷиши сокинони осебпазир", "Маслиҳати вентилятсияи шабона", "Фазои хунуки муштарак"],
    },
    "transport-corridor": {
      name: "Коридори асосии нақлиёт ва истгоҳҳо",
      type: "Нақлиёт",
      priority: "Баланд",
      actions: ["Соя дар истгоҳҳо", "Нуқтаҳои пур кардани об", "Огоҳии гармӣ", "Идома додани хизматрасонӣ дар авҷи гармӣ"],
    },
    "syr-darya-cooling": {
      name: "Санҷиши коридори хунуккунандаи Сирдарё",
      type: "Коридори хунуккунӣ",
      priority: "Миёна",
      actions: ["Муқоисаи ҳарорати кӯчаҳои наздик", "Муҳофизати дарахтон", "Харитаи роҳҳои салқин", "Масири санҷиши сенсорҳо"],
    },
  },
  map: {
    ...ru.map,
    eyebrow: "Харитаи хатари шаҳр",
    title: "Харитаи амал ҳангоми гармӣ",
    cityCenter: "Маркази Хуҷанд",
    prototypeZone: "минтақаи прототипии банақшагирии гармӣ",
    selectedHour: "Соати интихобшуда",
    date: "Сана",
    hour: "Соат",
    play: "Оғоз",
    pause: "Таваққуф",
  },
  evidence: {
    trigger: "Остонаи расмӣ",
    forecast: "Манбаи пешгӯӣ",
    context: "Контексти гармӣ",
    health: "Фокуси саломатӣ",
    forecastValue: "Open-Meteo, ғайрирасмӣ",
    contextValue: "Шаҳри водии Сирдарё",
    healthValue: "Кӯдакон, пиронсолон, ҳомиладорҳо, бемориҳои музмин",
  },
  action: {
    ...ru.action,
    eyebrow: "Амалҳо ҳангоми гармии хатарнок",
    title: "Аввал чӣ бояд кард",
    residents: "Сокинон",
    schools: "Мактабҳо",
    clinics: "Клиникаҳо",
    workers: "Коргарони берунӣ",
  },
  interventions: {
    eyebrow: "Нақшаи мутобиқшавӣ",
    title: "Сенарияҳои хунуккунӣ",
    reduction: "коҳиши тахминии риск",
    prototype: "арзёбии прототипӣ",
    coolRoof: "Бомҳои сард",
    shade: "Дарахт / соя",
    water: "Нуқтаи об",
    coolingRoom: "Ҳуҷраи хунук",
    transitShade: "Соя дар истгоҳҳо",
  },
  sources: {
    eyebrow: "Аудити манбаъҳо",
    title: "Феҳристи далелҳо",
    search: "Ҷустуҷӯи манбаъҳо",
    originalCoverage: "Фарогирии HTML-и аввал",
    addedApi: "API-ҳои иловашуда",
    addedReferences: "Бенчмаркҳо ва манбаъҳои забонӣ",
    primarySources: "Манбаъҳои асосӣ",
    badge: "{original} пайванди аввал + {api} live API + {added} манбаи нав",
  },
};

export const translations: Record<LanguageCode, LocaleCopy> = { en, ru, tg };

export const languageOptions: Array<{ code: LanguageCode; label: string }> = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "tg", label: "Тоҷикӣ" },
];

export function interpolate(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce((text, [key, value]) => text.split(`{${key}}`).join(String(value)), template);
}
