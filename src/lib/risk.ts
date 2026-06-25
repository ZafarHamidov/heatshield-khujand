import { KHUJAND } from "../config/khujand";
import type { ForecastDay } from "./openMeteo";

export type HeatState = "Normal" | "Watch" | "Danger" | "Trigger-like";

export type HeatAssessment = {
  state: HeatState;
  hottestDay?: ForecastDay;
  maxTempC?: number;
  consecutiveTriggerDays: number;
  explanation: string;
};

export function assessHeatRisk(days: ForecastDay[]): HeatAssessment {
  if (days.length === 0) {
    return {
      state: "Watch",
      consecutiveTriggerDays: 0,
      explanation: "Forecast data is unavailable. Use official local warnings and heat precautions.",
    };
  }

  const threshold = KHUJAND.trigger.temperatureC;
  const hottestDay = [...days].sort((a, b) => b.maxTempC - a.maxTempC)[0];
  const maxTempC = hottestDay.maxTempC;
  const consecutiveTriggerDays = longestThresholdRun(days, threshold);

  if (consecutiveTriggerDays >= KHUJAND.trigger.consecutiveDays) {
    return {
      state: "Trigger-like",
      hottestDay,
      maxTempC,
      consecutiveTriggerDays,
      explanation:
        "Forecast temperatures resemble the official heatwave trigger pattern. Treat this as non-official early intelligence and follow Tajik Hydromet or local authority warnings.",
    };
  }

  if (maxTempC >= threshold) {
    return {
      state: "Danger",
      hottestDay,
      maxTempC,
      consecutiveTriggerDays,
      explanation:
        "At least one forecast day meets or exceeds the Khujand/Sughd heat threshold. Prioritize vulnerable people and outdoor activities.",
    };
  }

  if (maxTempC >= threshold - 3) {
    return {
      state: "Watch",
      hottestDay,
      maxTempC,
      consecutiveTriggerDays,
      explanation:
        "Forecast heat is near the official threshold. Prepare cooling actions before conditions intensify.",
    };
  }

  return {
    state: "Normal",
    hottestDay,
    maxTempC,
    consecutiveTriggerDays,
    explanation:
      "Forecast heat is below the official trigger threshold, but hot-weather precautions still matter for vulnerable groups.",
  };
}

export function longestThresholdRun(days: ForecastDay[], threshold: number): number {
  let longest = 0;
  let current = 0;

  days.forEach((day) => {
    if (day.maxTempC >= threshold) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  });

  return longest;
}

export function heatStateTone(state: HeatState): "green" | "amber" | "orange" | "red" {
  switch (state) {
    case "Normal":
      return "green";
    case "Watch":
      return "amber";
    case "Danger":
      return "orange";
    case "Trigger-like":
      return "red";
  }
}
