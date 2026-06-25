import { useEffect, useState } from "react";
import type { CityProfile } from "../config/cities";
import { fallbackHistorical } from "../data/fallbackWeather";
import { fetchNasaPowerSample, type HistoricalDay } from "../lib/nasaPower";
import type { DataLoad } from "../types/dataLoad";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "NASA POWER request failed.";
}

export function useHistoricalData(city: CityProfile) {
  const [historicalLoad, setHistoricalLoad] = useState<DataLoad<HistoricalDay[]>>({ status: "loading" });

  useEffect(() => {
    let active = true;

    setHistoricalLoad({ status: "loading" });

    fetchNasaPowerSample(city)
      .then((days) => {
        if (!active) return;
        setHistoricalLoad({ status: "live", data: days });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setHistoricalLoad({
          status: "fallback",
          data: fallbackHistorical,
          error: errorMessage(error),
        });
      });

    return () => {
      active = false;
    };
  }, [city]);

  return historicalLoad;
}
