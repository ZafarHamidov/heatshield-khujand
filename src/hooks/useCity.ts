import { useEffect, useState } from "react";
import { DEFAULT_CITY_ID, getCityProfile, type CityId } from "../config/cities";

const STORAGE_KEY = "heatshield-city";

export function useCity() {
  const [cityId, setCityIdState] = useState<CityId>(() => {
    if (typeof window === "undefined") return DEFAULT_CITY_ID;

    const fromUrl = new URLSearchParams(window.location.search).get("city");
    if (fromUrl) return getCityProfile(fromUrl).id;

    return getCityProfile(window.localStorage.getItem(STORAGE_KEY)).id;
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, cityId);
  }, [cityId]);

  return {
    city: getCityProfile(cityId),
    cityId,
    setCityId: (nextCityId: CityId) => setCityIdState(getCityProfile(nextCityId).id),
  };
}
