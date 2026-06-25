import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KHUJAND } from "../config/khujand";
import type { LocaleCopy } from "../i18n";
import type { HistoricalDay } from "../lib/nasaPower";
import type { DataLoad } from "../types/dataLoad";
import { formatDate, formatShortDate } from "../utils/format";

export function HistoricalChart({ copy, historicalLoad }: { copy: LocaleCopy; historicalLoad: DataLoad<HistoricalDay[]> }) {
  const historical = historicalLoad.data ?? [];
  const hasData = historical.length > 0 && (historicalLoad.status === "live" || historicalLoad.status === "fallback");

  return (
    <section className="panel chart-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.charts.historicalEyebrow}</p>
          <h2>{copy.charts.historicalTitle}</h2>
        </div>
        <span className="badge">{historicalLoad.status === "live" ? copy.charts.apiLoaded : historicalLoad.status}</span>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={historical} margin={{ top: 12, right: 32, bottom: 8, left: 0 }}>
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f04438" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f04438" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d9e0df" />
            <XAxis dataKey="date" interval="preserveStartEnd" tickFormatter={formatShortDate} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} unit="C" />
            <Tooltip formatter={(value: number) => [`${value.toFixed(1)}C`, "Daily max"]} labelFormatter={formatDate} />
            <ReferenceLine y={KHUJAND.trigger.temperatureC} stroke="#b42318" strokeDasharray="5 5" />
            <Area
              type="monotone"
              dataKey="maxTempC"
              stroke="#b42318"
              strokeWidth={2}
              fill="url(#tempFill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="empty-chart">
          <p>{copy.charts.loading}</p>
        </div>
      )}
      <p className="muted">{copy.charts.historicalNote}</p>
    </section>
  );
}
