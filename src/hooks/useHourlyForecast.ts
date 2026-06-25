import { useEffect, useState } from "react";
import { fallbackHourlyForecast } from "../data/fallbackWeather";
import { fetchOpenMeteoHourlyForecast, type HourlyForecastResult } from "../lib/hourlyForecast";
import type { DataLoad } from "../types/dataLoad";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Hourly forecast request failed.";
}

export function useHourlyForecast() {
  const [hourlyLoad, setHourlyLoad] = useState<DataLoad<HourlyForecastResult>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const forceFailure = new URLSearchParams(window.location.search).has("forceHourlyFailure");

    fetchOpenMeteoHourlyForecast({ forceFailure, signal: controller.signal })
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
  }, []);

  return hourlyLoad;
}
