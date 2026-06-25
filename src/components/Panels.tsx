import { AlertTriangle, Building2, CheckCircle2, Droplets, Hospital, MapPin, School, Users, Waves } from "lucide-react";
import { KHUJAND } from "../config/khujand";
import { scientificModel } from "../data/generated/scientificHotspots";
import { riskZones, type RiskZone } from "../data/riskZones";
import type { LocaleCopy } from "../i18n";
import { interpolate } from "../i18n";
import type { ForecastResult } from "../lib/openMeteo";
import { scientificRiskMethod } from "../lib/scientificRisk";
import type { DataLoad } from "../types/dataLoad";

const zoneIcon = {
  Residential: Building2,
  School,
  Clinic: Hospital,
  Market: Users,
  Transport: MapPin,
  "Cooling corridor": Waves,
} satisfies Record<RiskZone["type"], typeof MapPin>;

export function TriggerPanel({ copy }: { copy: LocaleCopy }) {
  return (
    <article className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{copy.trigger.eyebrow}</p>
          <h2>{copy.trigger.title}</h2>
        </div>
        <AlertTriangle aria-hidden="true" size={28} />
      </div>
      <p>
        {interpolate(copy.trigger.body, {
          temp: KHUJAND.trigger.temperatureC,
          days: KHUJAND.trigger.consecutiveDays,
          season: KHUJAND.trigger.season,
        })}
      </p>
      <div className="callout">
        <CheckCircle2 aria-hidden="true" size={18} />
        <span>{KHUJAND.trigger.officialSource}</span>
      </div>
    </article>
  );
}

export function PriorityPanel({ copy }: { copy: LocaleCopy }) {
  const topZones = riskZones.slice(0, 4);

  return (
    <article className="panel priority-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{copy.priority.eyebrow}</p>
          <h2>{copy.priority.title}</h2>
        </div>
        <MapPin aria-hidden="true" size={28} />
      </div>
      <div className="zone-list">
        {topZones.map((zone) => {
          const Icon = zoneIcon[zone.type];
          const zoneCopy = copy.zones[zone.id];
          return (
            <div className="zone-row" key={zone.id}>
              <Icon aria-hidden="true" size={18} />
              <div>
                <strong>{zoneCopy?.name ?? zone.name}</strong>
                <span>
                  {zoneCopy?.priority ?? zone.priority} {copy.priority.priority}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export function MethodPanel({ copy }: { copy: LocaleCopy }) {
  return (
    <section className="panel method-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.method.eyebrow}</p>
          <h2>{copy.method.title}</h2>
        </div>
        <Droplets aria-hidden="true" size={28} />
      </div>
      <p>{copy.method.body}</p>
      <div className="formula">{copy.method.formula}</div>
      <p className="muted">{copy.method.note}</p>
    </section>
  );
}

export function BenchmarkPanels({ copy }: { copy: LocaleCopy }) {
  return (
    <>
      <article className="panel benchmark-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{copy.benchmark.riskEyebrow}</p>
            <h2>{copy.benchmark.riskTitle}</h2>
          </div>
          <AlertTriangle aria-hidden="true" size={28} />
        </div>
        <p>{copy.benchmark.riskBody}</p>
        <div className="risk-level-list">
          {copy.benchmark.levels.map((level, index) => (
            <span key={level} className={`risk-level risk-level-${index}`}>
              {level}
            </span>
          ))}
        </div>
      </article>

      <article className="panel benchmark-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{copy.benchmark.workflowEyebrow}</p>
            <h2>{copy.benchmark.workflowTitle}</h2>
          </div>
          <CheckCircle2 aria-hidden="true" size={28} />
        </div>
        <ol className="workflow-list">
          {copy.benchmark.workflowSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>

      <article className="panel benchmark-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{copy.benchmark.vulnerabilityEyebrow}</p>
            <h2>{copy.benchmark.vulnerabilityTitle}</h2>
          </div>
          <Users aria-hidden="true" size={28} />
        </div>
        <ul className="factor-list">
          {copy.benchmark.vulnerabilityFactors.map((factor) => (
            <li key={factor}>{factor}</li>
          ))}
        </ul>
      </article>
    </>
  );
}

export function ScientificModelPanel({ copy }: { copy: LocaleCopy }) {
  const topCells = scientificModel.topCellIds
    .map((id) => scientificModel.cells.find((cell) => cell.id === id))
    .filter((cell): cell is (typeof scientificModel.cells)[number] => Boolean(cell))
    .slice(0, 5);

  return (
    <section className="panel scientific-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.scientific.eyebrow}</p>
          <h2>{copy.scientific.title}</h2>
        </div>
        <Droplets aria-hidden="true" size={28} />
      </div>
      <p>{copy.scientific.body}</p>

      <div className="science-meta-grid">
        <ScienceStat label={copy.scientific.modelVersion} value={scientificRiskMethod.modelVersion} />
        <ScienceStat label={copy.scientific.riskEquation} value={copy.method.formula} />
        <ScienceStat label={copy.scientific.cellSize} value={`${scientificModel.cellSizeMeters} m`} />
        <ScienceStat label={copy.scientific.generated} value={scientificModel.generatedAt.slice(0, 10)} />
      </div>

      <div className="science-columns">
        <div>
          <h3>{copy.scientific.riskEquation}</h3>
          <ul className="compact-list">
            {Object.entries(scientificRiskMethod.placeWeights).map(([key, value]) => (
              <li key={key}>
                {componentLabel(copy, key)}: {Math.round(value * 100)}%
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{copy.scientific.weights}</h3>
          <ul className="compact-list">
            {Object.entries(scientificRiskMethod.hazardWeights).map(([key, value]) => (
              <li key={key}>
                {key}: {Math.round(value * 100)}%
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{copy.scientific.sourceCounts}</h3>
          <ul className="compact-list">
            {Object.entries(scientificModel.sourceCounts).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="science-columns science-two-columns">
        <div>
          <h3>{copy.scientific.topCells}</h3>
          <ul className="compact-list">
            {topCells.map((cell) => (
              <li key={cell.id}>
                {cell.id}: {cell.score0to100}/100, {copy.common.level} {cell.riskLevel0to4}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{copy.scientific.benchmarkPatterns}</h3>
          <ul className="compact-list">
            {copy.scientific.benchmarkItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="science-layer-grid">
        <LayerList title={copy.scientific.integratedLayers} items={scientificModel.integratedLayers} />
        <LayerList title={copy.scientific.proxyLayers} items={scientificModel.proxyLayers} />
        <LayerList title={copy.scientific.missingLayers} items={scientificModel.missingValidatedLayers} />
      </div>
      {scientificModel.overpassFailures.length ? (
        <div className="science-warning">
          <strong>{copy.scientific.dataWarnings}</strong>
          <span>{scientificModel.overpassFailures.join("; ")}</span>
        </div>
      ) : null}
      <div className="science-warning science-note">
        <strong>{copy.scientific.confidenceLimit}</strong>
        <span>{copy.scientific.confidenceLimitBody}</span>
      </div>
    </section>
  );
}

export function DataLimitationsPanel({ copy, forecastLoad }: { copy: LocaleCopy; forecastLoad: DataLoad<ForecastResult> }) {
  return (
    <section className="panel limitations-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.limits.eyebrow}</p>
          <h2>{copy.limits.title}</h2>
        </div>
        <AlertTriangle aria-hidden="true" size={28} />
      </div>
      <ul className="limit-list">
        {copy.limits.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="callout subtle-callout">
        <CheckCircle2 aria-hidden="true" size={18} />
        <span>
          {copy.limits.status}: {forecastLoad.status === "fallback" ? copy.common.sample : forecastLoad.status}
        </span>
      </div>
    </section>
  );
}

function ScienceStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LayerList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="science-layer-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function componentLabel(copy: LocaleCopy, key: string) {
  const labels: Record<string, string> = {
    surfaceHeatProxy: copy.scientific.surfaceHeatProxy,
    lowShadeProxy: copy.scientific.lowShadeProxy,
    populationExposureProxy: copy.scientific.populationExposureProxy,
    vulnerableFacilities: copy.scientific.vulnerableFacilities,
    transportMarketExposure: copy.scientific.transportMarketExposure,
    hazard: copy.scientific.hazard,
    exposure: copy.scientific.exposure,
    vulnerability: copy.scientific.vulnerability,
    adaptiveCapacityGap: copy.scientific.adaptiveCapacityGap,
    apparentTemperature: copy.map.apparentTemp,
    wetBulb: copy.map.wetBulb,
    solarRadiation: copy.scientific.solarRadiation,
    hotNightOrPersistence: copy.scientific.heatPersistence,
    lowWind: copy.scientific.lowWind,
  };

  return labels[key] ?? key;
}
