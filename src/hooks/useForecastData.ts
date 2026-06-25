import { useEffect, useState } from "react";
import type { CityProfile } from "../config/cities";
import { fallbackForecast } from "../data/fallbackWeather";
import { fetchOpenMeteoForecast, type ForecastResult } from "../lib/openMeteo";
import type { DataLoad } from "../types/dataLoad";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Forecast request failed.";
}

function fallbackForecastResult(city: CityProfile): ForecastResult {
  return {
    days: fallbackForecast,
    metadata: {
      requestedLatitude: city.center.lat,
      requestedLongitude: city.center.lon,
      timezone: city.timezone,
      fetchedAtIso: new Date().toISOString(),
      source: "Local sample",
    },
  };
}

export function useForecastData(city: CityProfile) {
  const [forecastLoad, setForecastLoad] = useState<DataLoad<ForecastResult>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const forceFailure = new URLSearchParams(window.location.search).has("forceForecastFailure");

    setForecastLoad({ status: "loading" });

    fetchOpenMeteoForecast(city, { forceFailure, signal: controller.signal })
      .then((result) => {
        setForecastLoad({ status: "live", data: result });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setForecastLoad({
          status: "fallback",
          data: fallbackForecastResult(city),
          error: errorMessage(error),
        });
      });

    return () => {
      controller.abort();
    };
  }, [city]);

  return forecastLoad;
}
