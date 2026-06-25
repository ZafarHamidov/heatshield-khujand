import { useEffect, useState } from "react";
import { KHUJAND } from "../config/khujand";
import { fallbackForecast } from "../data/fallbackWeather";
import { fetchOpenMeteoForecast, type ForecastResult } from "../lib/openMeteo";
import type { DataLoad } from "../types/dataLoad";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Forecast request failed.";
}

function fallbackForecastResult(): ForecastResult {
  return {
    days: fallbackForecast,
    metadata: {
      requestedLatitude: KHUJAND.center.lat,
      requestedLongitude: KHUJAND.center.lon,
      fetchedAtIso: new Date().toISOString(),
      source: "Local sample",
    },
  };
}

export function useForecastData() {
  const [forecastLoad, setForecastLoad] = useState<DataLoad<ForecastResult>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const forceFailure = new URLSearchParams(window.location.search).has("forceForecastFailure");

    fetchOpenMeteoForecast({ forceFailure, signal: controller.signal })
      .then((result) => {
        setForecastLoad({ status: "live", data: result });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setForecastLoad({
          status: "fallback",
          data: fallbackForecastResult(),
          error: errorMessage(error),
        });
      });

    return () => {
      controller.abort();
    };
  }, []);

  return forecastLoad;
}
