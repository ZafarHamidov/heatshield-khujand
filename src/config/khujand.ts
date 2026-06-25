import { getCityProfile } from "./cities";

export const KHUJAND = getCityProfile("khujand");

export const RIVER_CORRIDOR: [number, number][] = KHUJAND.riverCorridor ?? [];
