import { Sun } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CityProfile } from "../config/cities";
import type { ForecastResult } from "../lib/openMeteo";
import type { DataLoad } from "../types/dataLoad";
import { formatDate, formatShortDate, labelForChart } from "../utils/format";
import type { LocaleCopy } from "../i18n";

export function ForecastChart({ copy, city, forecastLoad }: { copy: LocaleCopy; city: CityProfile; forecastLoad: DataLoad<ForecastResult> }) {
  const forecast = forecastLoad.data?.days ?? [];
  const hasData = forecast.length > 0 && (forecastLoad.status === "live" || forecastLoad.status === "fallback");

  return (
    <section className="panel chart-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.charts.outlookEyebrow}</p>
          <h2>{copy.charts.outlookTitle}</h2>
        </div>
        <span className="badge">{badgeFor(copy, forecastLoad.status)}</span>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={310}>
          <LineChart data={forecast} margin={{ top: 12, right: 32, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d9e0df" />
            <XAxis dataKey="date" interval="preserveStartEnd" tickFormatter={formatShortDate} tick={{ fontSize: 12 }} />
            <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 12 }} unit="C" />
            <Tooltip formatter={(value: number, name) => [`${value.toFixed(1)}C`, labelForChart(name)]} labelFormatter={formatDate} />
            <ReferenceLine y={city.trigger.temperatureC} stroke="#b42318" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="maxTempC"
              name="maxTempC"
              stroke="#b42318"
              strokeWidth={3}
              dot={{ r: 3 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="apparentMaxC"
              name="apparentMaxC"
              stroke="#7a3f8f"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="minTempC"
              name="minTempC"
              stroke="#0f6b63"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="empty-chart">
          <Sun aria-hidden="true" size={28} />
          <p>{copy.charts.waiting}</p>
        </div>
      )}
      <p className="muted">{copy.charts.forecastNote}</p>
    </section>
  );
}

function badgeFor(copy: LocaleCopy, status: DataLoad<ForecastResult>["status"]) {
  if (status === "live") return copy.charts.thresholdLine;
  if (status === "fallback") return copy.charts.sampleFallback;
  if (status === "loading") return copy.charts.loading;
  return copy.charts.unavailable;
}
