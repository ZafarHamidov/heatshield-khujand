import { ThermometerSun } from "lucide-react";
import type { CityProfile } from "../config/cities";
import { formatCoordinate, formatDate, formatDateTime } from "../utils/format";
import type { ForecastResult } from "../lib/openMeteo";
import { heatStateTone, type HeatAssessment } from "../lib/risk";
import type { DataLoad } from "../types/dataLoad";
import type { LocaleCopy } from "../i18n";

type ForecastPanelProps = {
  copy: LocaleCopy;
  city: CityProfile;
  forecastLoad: DataLoad<ForecastResult>;
  assessment?: HeatAssessment;
};

export function ForecastPanel({ copy, city, forecastLoad, assessment }: ForecastPanelProps) {
  const latest = forecastLoad.data?.days[0];
  const hottest = assessment?.hottestDay ?? latest;
  const metadata = forecastLoad.data?.metadata;
  const tone = assessment ? heatStateTone(assessment.state) : "neutral";
  const high = assessment?.maxTempC ?? latest?.maxTempC;
  const gridPoint =
    metadata?.resolvedLatitude && metadata.resolvedLongitude
      ? `${formatCoordinate(metadata.resolvedLatitude)}, ${formatCoordinate(metadata.resolvedLongitude)}`
      : copy.common.loading;

  return (
    <article className={`panel forecast-panel tone-${tone}`}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{copy.forecast.eyebrow}</p>
          <h2>{headlineFor(copy, forecastLoad, assessment)}</h2>
        </div>
        <ThermometerSun aria-hidden="true" size={32} />
      </div>
      <div className="temperature-readout">
        <span>{typeof high === "number" ? `${Math.round(high)}C` : "--C"}</span>
        <small>{copy.forecast.high}</small>
      </div>
      <p>{descriptionFor(copy, forecastLoad, assessment)}</p>
      {forecastLoad.status === "fallback" && forecastLoad.error ? (
        <p className="forecast-warning">
          {copy.forecast.failure}: {forecastLoad.error}
        </p>
      ) : null}
      <div className="metric-row">
        <Metric label={copy.forecast.hottestDay} value={formatDate(hottest?.date)} />
        <Metric label={copy.forecast.triggerStreak} value={assessment ? `${assessment.consecutiveTriggerDays} ${copy.common.days}` : copy.common.loading} />
        <Metric label={copy.forecast.data} value={dataLabelFor(copy, forecastLoad.status)} />
      </div>
      <dl className="forecast-meta">
        <div>
          <dt>{copy.forecast.gridPoint}</dt>
          <dd>{gridPoint}</dd>
        </div>
        <div>
          <dt>{copy.forecast.timezone}</dt>
          <dd>{metadata?.timezone ?? city.timezone}</dd>
        </div>
        <div>
          <dt>{copy.forecast.elevation}</dt>
          <dd>{typeof metadata?.elevationM === "number" ? `${Math.round(metadata.elevationM)} m` : copy.common.unavailable}</dd>
        </div>
        <div>
          <dt>{copy.forecast.fetched}</dt>
          <dd>{formatDateTime(metadata?.fetchedAtIso)}</dd>
        </div>
      </dl>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function headlineFor(copy: LocaleCopy, forecastLoad: DataLoad<ForecastResult>, assessment?: HeatAssessment) {
  if (forecastLoad.status === "loading") return copy.common.loading;
  if (forecastLoad.status === "error") return copy.common.unavailable;
  return assessment ? copy.forecast.state[assessment.state] : copy.common.unavailable;
}

function descriptionFor(copy: LocaleCopy, forecastLoad: DataLoad<ForecastResult>, assessment?: HeatAssessment) {
  if (forecastLoad.status === "loading") {
    return copy.forecast.loadingDescription;
  }

  if (forecastLoad.status === "fallback") {
    return `${copy.forecast.fallbackPrefix}: ${assessment ? copy.forecast.explanation[assessment.state] : copy.forecast.unavailableDescription}`;
  }

  if (forecastLoad.status === "error") {
    return copy.forecast.unavailableDescription;
  }

  return assessment ? copy.forecast.explanation[assessment.state] : copy.forecast.unavailableDescription;
}

function dataLabelFor(copy: LocaleCopy, status: DataLoad<ForecastResult>["status"]) {
  if (status === "live") return copy.common.live;
  if (status === "fallback") return copy.common.sample;
  if (status === "loading") return copy.common.loading;
  return copy.common.unavailable;
}
