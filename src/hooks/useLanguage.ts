import { useEffect, useState } from "react";
import { translations, type LanguageCode } from "../i18n";

const storageKey = "heatshield-language";

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "en" || value === "ru" || value === "tg";
}

export function useLanguage() {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    if (isLanguageCode(queryLanguage)) return queryLanguage;

    const stored = window.localStorage.getItem(storageKey);
    return isLanguageCode(stored) ? stored : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, language);
    document.documentElement.lang = language;
  }, [language]);

  return {
    language,
    setLanguage,
    copy: translations[language],
  };
}
