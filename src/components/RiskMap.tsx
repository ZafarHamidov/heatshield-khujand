import { Fragment, useEffect, useMemo, useState } from "react";
import { Pause, Play } from "lucide-react";
import { CircleMarker, MapContainer, Polygon, Polyline, Popup, Rectangle, TileLayer } from "react-leaflet";
import type { CityProfile } from "../config/cities";
import type { RiskZone } from "../data/riskZones";
import type { LocaleCopy } from "../i18n";
import { buildHotspotFrames, hottestHourIndex, hotspotTone } from "../lib/hotspots";
import type { HourlyForecastResult } from "../lib/hourlyForecast";
import { getCityScientificModel } from "../lib/cityScreeningGrid";
import { buildScientificCellFrames } from "../lib/scientificRisk";
import type { ScientificCellInput } from "../lib/scientificRisk";
import type { DataLoad } from "../types/dataLoad";

type RiskMapProps = {
  copy: LocaleCopy;
  city: CityProfile;
  riskZones: RiskZone[];
  hourlyLoad: DataLoad<HourlyForecastResult>;
};

export function RiskMap({ copy, city, riskZones, hourlyLoad }: RiskMapProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCooling, setShowCooling] = useState(false);
  const [showScientificGrid, setShowScientificGrid] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showCenters, setShowCenters] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const hourly = hourlyLoad.data;
  const points = hourly?.points ?? [];
  const hasHourly = points.length > 0 && (hourlyLoad.status === "live" || hourlyLoad.status === "fallback");
  const safeIndex = Math.min(selectedIndex, Math.max(0, points.length - 1));
  const selectedPoint = points[safeIndex];
  const cityScientificModel = useMemo(() => getCityScientificModel(city), [city]);
  const frames = useMemo(() => buildHotspotFrames(hourly, safeIndex, riskZones), [hourly, riskZones, safeIndex]);
  const frameByZone = useMemo(() => new Map(frames.map((frame) => [frame.zoneId, frame])), [frames]);
  const scientificFrames = useMemo(
    () => buildScientificCellFrames(cityScientificModel.cells, cityScientificModel.generatedAt, hourly, safeIndex, hourlyLoad.status),
    [cityScientificModel, hourly, hourlyLoad.status, safeIndex],
  );
  const scientificFrameByCell = useMemo(
    () => new Map(scientificFrames.map((frame) => [frame.cellId, frame])),
    [scientificFrames],
  );
  const strongestFrame = frames.reduce((strongest, frame) => {
    if (!strongest || frame.score0to100 > strongest.score0to100) return frame;
    return strongest;
  }, frames[0]);
  const strongestZone = riskZones.find((zone) => zone.id === strongestFrame?.zoneId);
  const strongestZoneCopy = strongestZone ? copy.zones[strongestZone.id] : undefined;
  const topScientificCell =
    scientificFrames.reduce((strongest, frame) => {
      if (!strongest || frame.score0to100 > strongest.score0to100) return frame;
      return strongest;
    }, scientificFrames[0]);
  const availableDates = useMemo(() => Array.from(new Set(points.map((point) => point.timeIso.slice(0, 10)))), [points]);

  useEffect(() => {
    if (points.length) {
      setSelectedIndex(hottestHourIndex(points));
    }
  }, [hourly?.metadata.fetchedAtIso, points.length]);

  useEffect(() => {
    if (!isPlaying || points.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setSelectedIndex((current) => (current + 1) % points.length);
    }, 900);

    return () => window.clearInterval(timer);
  }, [isPlaying, points.length]);

  const bounds: [[number, number], [number, number]] = [
    [city.bbox.south, city.bbox.west],
    [city.bbox.north, city.bbox.east],
  ];

  const cityPolygon: [number, number][] = [
    [city.bbox.south, city.bbox.west],
    [city.bbox.south, city.bbox.east],
    [city.bbox.north, city.bbox.east],
    [city.bbox.north, city.bbox.west],
  ];

  return (
    <section className="map-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.map.eyebrow}</p>
          <h2>{copy.map.title}</h2>
        </div>
        <span className="badge">{mapStatusLabel(copy, hourlyLoad.status)}</span>
      </div>

      <div className="map-toolbar" aria-label="Hotspot time controls">
        <label>
          <span>{copy.map.date}</span>
          <select
            disabled={!hasHourly}
            value={selectedPoint?.timeIso.slice(0, 10) ?? ""}
            onChange={(event) => {
              const nextIndex = points.findIndex((point) => point.timeIso.startsWith(event.target.value));
              if (nextIndex >= 0) setSelectedIndex(nextIndex);
            }}
          >
            {availableDates.length ? (
              availableDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))
            ) : (
              <option>{copy.common.loading}</option>
            )}
          </select>
        </label>

        <label className="time-control">
          <span>
            {copy.map.hour}: <strong>{selectedPoint ? formatHour(selectedPoint.timeIso) : copy.common.loading}</strong>
          </span>
          <input
            className="time-slider"
            disabled={!hasHourly}
            type="range"
            min={0}
            max={Math.max(0, points.length - 1)}
            value={safeIndex}
            onChange={(event) => setSelectedIndex(Number(event.target.value))}
          />
        </label>

        <button className="play-button" disabled={!hasHourly} type="button" onClick={() => setIsPlaying((value) => !value)}>
          {isPlaying ? <Pause aria-hidden="true" size={17} /> : <Play aria-hidden="true" size={17} />}
          {isPlaying ? copy.map.pause : copy.map.play}
        </button>
      </div>

      <div className="toggle-row" aria-label="Map layers">
        <label>
          <input type="checkbox" checked={showScientificGrid} onChange={(event) => setShowScientificGrid(event.target.checked)} />
          {copy.scientific.showGrid}
        </label>
        <label>
          <input type="checkbox" checked={showBoundaries} onChange={(event) => setShowBoundaries(event.target.checked)} />
          {copy.map.showBoundary}
        </label>
        <label>
          <input type="checkbox" checked={showCenters} onChange={(event) => setShowCenters(event.target.checked)} />
          {copy.map.showCenters}
        </label>
        <label>
          <input type="checkbox" checked={showCooling} onChange={(event) => setShowCooling(event.target.checked)} />
          {copy.map.showCooling}
        </label>
      </div>

      <div className="hotspot-summary">
        <strong>{copy.map.selectedHour}: {selectedPoint ? formatFullTime(selectedPoint.timeIso) : copy.common.loading}</strong>
        <span>
          {strongestZone && strongestFrame
            ? `${strongestZoneCopy?.name ?? strongestZone.name}: ${copy.map.riskScore} ${strongestFrame.score0to100}/100, ${copy.common.level} ${strongestFrame.riskLevel0to4}`
            : copy.map.nonOfficial}
        </span>
        {showScientificGrid && topScientificCell ? (
          <span>
            {copy.scientific.topCells}: {topScientificCell.cellId}, {copy.scientific.dynamicScore} {topScientificCell.score0to100}/100,{" "}
            {copy.common.level} {topScientificCell.riskLevel0to4}
          </span>
        ) : null}
      </div>

      <MapContainer key={city.id} center={[city.center.lat, city.center.lon]} zoom={city.id === "khujand" ? 13 : 11} scrollWheelZoom className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Rectangle bounds={bounds} pathOptions={{ color: "#0f6b63", weight: 2, dashArray: "6 8", fillOpacity: 0.04 }} />
        <Polygon positions={cityPolygon} pathOptions={{ color: "#0f6b63", weight: 1, fillOpacity: 0.03 }} />
        {showCooling && city.riverCorridor?.length ? (
          <Polyline positions={city.riverCorridor} pathOptions={{ color: "#2d80b3", weight: 2, opacity: 0.38, dashArray: "4 8" }}>
            <Popup>{copy.map.riverContext}</Popup>
          </Polyline>
        ) : null}
        {showScientificGrid
          ? cityScientificModel.cells.map((cell) => {
              const frame = scientificFrameByCell.get(cell.id);
              const score = frame?.score0to100 ?? cell.score0to100;
              const tone = hotspotTone(frame?.riskLevel0to4 ?? cell.riskLevel0to4);
              return (
                <Polygon
                  key={cell.id}
                  positions={cell.boundary.map(([lat, lon]) => [lat, lon] as [number, number])}
                  pathOptions={{
                    color: tone.stroke,
                    fillColor: tone.fill,
                    fillOpacity: 0.05 + score / 420,
                    opacity: 0.42,
                    weight: 1,
                  }}
                >
                  <Popup>
                    <strong>
                      {copy.scientific.gridCell}: {cell.id}
                    </strong>
                    <br />
                    {copy.scientific.dynamicScore}: {frame?.score0to100 ?? cell.score0to100}/100, {copy.common.level}{" "}
                    {frame?.riskLevel0to4 ?? cell.riskLevel0to4}
                    {frame ? (
                      <>
                        <br />
                        {copy.scientific.microclimateTemp}:{" "}
                        {typeof frame.adjustedApparentTempC === "number"
                          ? `${frame.adjustedApparentTempC.toFixed(1)}C`
                          : copy.common.unavailable}
                        <br />
                        {copy.scientific.uncertainty}: +/-{frame.uncertaintyPlusMinus} {copy.scientific.scorePoints}
                        <br />
                        {copy.scientific.hazard}: {percent(frame.hazard)}
                        <br />
                        {copy.scientific.exposure}: {percent(frame.exposure)}
                        <br />
                        {copy.scientific.vulnerability}: {percent(frame.vulnerability)}
                        <br />
                        {copy.scientific.adaptiveCapacityGap}: {percent(frame.adaptiveCapacityGap)}
                      </>
                    ) : null}
                    <br />
                    {copy.scientific.confidence}: {frame ? `${frame.confidence0to100}/100` : cell.confidence}
                    <br />
                    {copy.scientific.drivers}: {(frame?.topDrivers ?? cell.drivers).map((driver) => driverLabel(copy, driver)).join(", ")}
                    <br />
                    {copy.scientific.components}:
                    <br />
                    {componentRows(copy, cell.components).map((row) => (
                      <span key={row.label}>
                        {row.label}: {row.value}
                        <br />
                      </span>
                    ))}
                  </Popup>
                </Polygon>
              );
            })
          : null}
        <CircleMarker
          center={[city.center.lat, city.center.lon]}
          radius={7}
          pathOptions={{ color: "#111827", fillColor: "#ffffff", fillOpacity: 1 }}
        >
          <Popup>{copy.map.cityCenter}</Popup>
        </CircleMarker>
        {riskZones.map((zone) => {
          const frame = frameByZone.get(zone.id);
          const zoneCopy = copy.zones[zone.id];
          const zoneName = zoneCopy?.name ?? zone.name;
          const zoneActions = zoneCopy?.actions ?? zone.actions;
          const tone = hotspotTone(frame?.riskLevel0to4 ?? 0);
          const fillOpacity = frame ? 0.14 + frame.score0to100 / 420 : 0.12;
          const dashArray = zone.boundaryConfidence === "OSM-derived" ? undefined : "6 6";

          return (
            <Fragment key={zone.id}>
              {showBoundaries ? (
                <Polygon
                  positions={zone.boundary}
                  pathOptions={{
                    color: tone.stroke,
                    dashArray,
                    fillColor: tone.fill,
                    fillOpacity: Math.min(0.38, fillOpacity),
                    opacity: 0.95,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <strong>{zoneName}</strong>
                    <br />
                    {copy.map.estimatedBoundary}
                    <br />
                    {copy.map.boundaryConfidence}: {zone.boundaryConfidence}
                  </Popup>
                </Polygon>
              ) : null}
              {showCenters ? (
                <CircleMarker
                  center={zone.position}
                  radius={frame ? Math.min(14, 6 + frame.score0to100 / 16) : 7}
                  pathOptions={{
                    color: tone.stroke,
                    fillColor: tone.fill,
                    fillOpacity: 0.86,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <strong>{zoneName}</strong>
                    <br />
                    {copy.map.prototypeZone}
                    <br />
                    {frame ? (
                      <>
                        {copy.map.riskScore}: {frame.score0to100}/100, {copy.common.level} {frame.riskLevel0to4}
                        <br />
                        {copy.map.apparentTemp}: {frame.apparentTempC.toFixed(1)}C
                        <br />
                        {copy.map.wetBulb}: {typeof frame.wetBulbC === "number" ? `${frame.wetBulbC.toFixed(1)}C` : copy.common.unavailable}
                        <br />
                        {copy.map.topDrivers}: {frame.topDrivers.join(", ")}
                        <br />
                        <em>{copy.map.recommendedAction}: {zoneActions[0] ?? frame.recommendedAction}</em>
                      </>
                    ) : (
                      copy.map.loadingHourly
                    )}
                  </Popup>
                </CircleMarker>
              ) : null}
            </Fragment>
          );
        })}
      </MapContainer>

      <div className="map-legend" aria-label="HeatRisk-style legend">
        {[copy.map.legendLow, copy.map.legendMinor, copy.map.legendModerate, copy.map.legendMajor, copy.map.legendExtreme].map((label, level) => {
          const tone = hotspotTone(level as 0 | 1 | 2 | 3 | 4);
          return (
            <span className="legend-item" key={label}>
              <i style={{ background: tone.fill }} />
              {label}
            </span>
          );
        })}
      </div>
      <p className="muted">{copy.map.nonOfficial}</p>
    </section>
  );
}

function mapStatusLabel(copy: LocaleCopy, status: DataLoad<HourlyForecastResult>["status"]) {
  if (status === "live") return copy.common.live;
  if (status === "fallback") return copy.map.fallbackHourly;
  if (status === "error") return copy.common.unavailable;
  return copy.map.loadingHourly;
}

function formatHour(timeIso: string) {
  return timeIso.split("T")[1]?.slice(0, 5) ?? timeIso;
}

function formatFullTime(timeIso: string) {
  const [date, time] = timeIso.split("T");
  return `${date} ${time?.slice(0, 5) ?? ""}`.trim();
}

function componentRows(copy: LocaleCopy, components: ScientificCellInput["components"]) {
  return [
    { label: copy.scientific.surfaceHeatProxy, value: percent(components.surfaceHeatProxy) },
    { label: copy.scientific.lowShadeProxy, value: percent(components.lowShadeProxy) },
    { label: copy.scientific.populationExposureProxy, value: percent(components.populationExposureProxy) },
    { label: copy.scientific.vulnerableFacilities, value: percent(components.vulnerableFacilities) },
    { label: copy.scientific.transportMarketExposure, value: percent(components.transportMarketExposure) },
  ];
}

function percent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function driverLabel(copy: LocaleCopy, driver: string) {
  const labels: Record<string, string> = {
    "hourly heat hazard": copy.scientific.hazard,
    "population exposure": copy.scientific.populationExposureProxy,
    "vulnerable facilities": copy.scientific.vulnerableFacilities,
    "low shade / cooling gap": copy.scientific.adaptiveCapacityGap,
    "built-surface heat proxy": copy.scientific.surfaceHeatProxy,
    "market / transport exposure": copy.scientific.transportMarketExposure,
    "apparent temperature": copy.map.apparentTemp,
    "wet-bulb stress": copy.map.wetBulb,
    "solar radiation": copy.scientific.solarRadiation,
    "heat persistence": copy.scientific.heatPersistence,
    "low wind": copy.scientific.lowWind,
    surfaceHeatProxy: copy.scientific.surfaceHeatProxy,
    lowShadeProxy: copy.scientific.lowShadeProxy,
    populationExposureProxy: copy.scientific.populationExposureProxy,
    vulnerableFacilities: copy.scientific.vulnerableFacilities,
    transportMarketExposure: copy.scientific.transportMarketExposure,
  };

  return labels[driver] ?? driver;
}
