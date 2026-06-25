import { useMemo } from "react";
import { ActionGuide } from "./components/ActionGuide";
import { EvidenceStrip } from "./components/EvidenceStrip";
import { ForecastChart } from "./components/ForecastChart";
import { ForecastPanel } from "./components/ForecastPanel";
import { HistoricalChart } from "./components/HistoricalChart";
import { InterventionPlanner } from "./components/InterventionPlanner";
import { BenchmarkPanels, DataLimitationsPanel, MethodPanel, PriorityPanel, ScientificModelPanel, TriggerPanel } from "./components/Panels";
import { RiskMap } from "./components/RiskMap";
import { SourceAudit } from "./components/SourceAudit";
import { TopBar } from "./components/TopBar";
import { useForecastData } from "./hooks/useForecastData";
import { useHistoricalData } from "./hooks/useHistoricalData";
import { useHourlyForecast } from "./hooks/useHourlyForecast";
import { useLanguage } from "./hooks/useLanguage";
import { assessHeatRisk } from "./lib/risk";

function App() {
  const { language, setLanguage, copy } = useLanguage();
  const forecastLoad = useForecastData();
  const historicalLoad = useHistoricalData();
  const hourlyLoad = useHourlyForecast();
  const forecastDays = forecastLoad.data?.days;
  const assessment = useMemo(() => {
    if (!forecastDays || (forecastLoad.status !== "live" && forecastLoad.status !== "fallback")) return undefined;

    return assessHeatRisk(forecastDays);
  }, [forecastDays, forecastLoad.status]);

  return (
    <main className="app-shell">
      <TopBar copy={copy} language={language} setLanguage={setLanguage} />

      <section className="dashboard-grid">
        <ForecastPanel copy={copy} forecastLoad={forecastLoad} assessment={assessment} />
        <TriggerPanel copy={copy} />
        <PriorityPanel copy={copy} />
      </section>

      <section className="map-and-chart">
        <RiskMap copy={copy} hourlyLoad={hourlyLoad} />
        <ForecastChart copy={copy} forecastLoad={forecastLoad} />
      </section>

      <EvidenceStrip copy={copy} />

      <section className="content-grid">
        <ActionGuide copy={copy} />
        <InterventionPlanner copy={copy} />
      </section>

      <section className="benchmark-grid">
        <BenchmarkPanels copy={copy} />
      </section>

      <ScientificModelPanel copy={copy} />

      <section className="chart-section">
        <HistoricalChart copy={copy} historicalLoad={historicalLoad} />
        <MethodPanel copy={copy} />
        <DataLimitationsPanel copy={copy} forecastLoad={forecastLoad} />
      </section>

      <SourceAudit copy={copy} />
    </main>
  );
}

export default App;
