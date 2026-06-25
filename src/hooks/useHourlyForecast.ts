import { useEffect, useState } from "react";
import type { CityProfile } from "../config/cities";
import type { RiskZone } from "../data/riskZones";
import { fallbackHourlyForecast } from "../data/fallbackWeather";
import { fetchOpenMeteoHourlyForecast, type HourlyForecastResult } from "../lib/hourlyForecast";
import type { DataLoad } from "../types/dataLoad";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Hourly forecast request failed.";
}

export function useHourlyForecast(city: CityProfile, riskZones: RiskZone[]) {
  const [hourlyLoad, setHourlyLoad] = useState<DataLoad<HourlyForecastResult>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const forceFailure = new URLSearchParams(window.location.search).has("forceHourlyFailure");

    setHourlyLoad({ status: "loading" });

    fetchOpenMeteoHourlyForecast(city, riskZones, { forceFailure, signal: controller.signal })
      .then((result) => {
        setHourlyLoad({ status: "live", data: result });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setHourlyLoad({
          status: "fallback",
          data: fallbackHourlyForecast,
          error: errorMessage(error),
        });
      });

    return () => {
      controller.abort();
    };
  }, [city, riskZones]);

  return hourlyLoad;
}
