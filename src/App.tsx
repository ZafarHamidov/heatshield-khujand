import { useMemo } from "react";
import { ActionGuide } from "./components/ActionGuide";
import { EvidenceStrip } from "./components/EvidenceStrip";
import { ForecastChart } from "./components/ForecastChart";
import { ForecastPanel } from "./components/ForecastPanel";
import { HistoricalChart } from "./components/HistoricalChart";
import { InterventionPlanner } from "./components/InterventionPlanner";
import { BenchmarkPanels, CityDataPanel, DataLimitationsPanel, MethodPanel, PriorityPanel, ScientificModelPanel, TriggerPanel } from "./components/Panels";
import { RiskMap } from "./components/RiskMap";
import { SourceAudit } from "./components/SourceAudit";
import { TopBar } from "./components/TopBar";
import { getRiskZonesForCity } from "./data/riskZones";
import { useCity } from "./hooks/useCity";
import { useForecastData } from "./hooks/useForecastData";
import { useHistoricalData } from "./hooks/useHistoricalData";
import { useHourlyForecast } from "./hooks/useHourlyForecast";
import { useLanguage } from "./hooks/useLanguage";
import { assessHeatRisk } from "./lib/risk";

function App() {
  const { language, setLanguage, copy } = useLanguage();
  const { city, setCityId } = useCity();
  const riskZones = useMemo(() => getRiskZonesForCity(city), [city]);
  const forecastLoad = useForecastData(city);
  const historicalLoad = useHistoricalData(city);
  const hourlyLoad = useHourlyForecast(city, riskZones);
  const forecastDays = forecastLoad.data?.days;
  const assessment = useMemo(() => {
    if (!forecastDays || (forecastLoad.status !== "live" && forecastLoad.status !== "fallback")) return undefined;

    return assessHeatRisk(forecastDays, city);
  }, [city, forecastDays, forecastLoad.status]);

  return (
    <main className="app-shell">
      <TopBar copy={copy} city={city} language={language} setCityId={setCityId} setLanguage={setLanguage} />

      <section className="dashboard-grid">
        <ForecastPanel copy={copy} city={city} forecastLoad={forecastLoad} assessment={assessment} />
        <TriggerPanel copy={copy} city={city} />
        <CityDataPanel copy={copy} city={city} />
        <PriorityPanel copy={copy} riskZones={riskZones} />
      </section>

      <section className="map-and-chart">
        <RiskMap copy={copy} city={city} riskZones={riskZones} hourlyLoad={hourlyLoad} />
        <ForecastChart copy={copy} city={city} forecastLoad={forecastLoad} />
      </section>

      <EvidenceStrip copy={copy} city={city} />

      <section className="content-grid">
        <ActionGuide copy={copy} />
        <InterventionPlanner copy={copy} riskZones={riskZones} />
      </section>

      <section className="benchmark-grid">
        <BenchmarkPanels copy={copy} />
      </section>

      <ScientificModelPanel copy={copy} city={city} />

      <section className="chart-section">
        <HistoricalChart copy={copy} city={city} historicalLoad={historicalLoad} />
        <MethodPanel copy={copy} />
        <DataLimitationsPanel copy={copy} forecastLoad={forecastLoad} />
      </section>

      <SourceAudit copy={copy} />
    </main>
  );
}

export default App;
