import { ShieldAlert } from "lucide-react";
import { CITY_PROFILES, type CityId, type CityProfile } from "../config/cities";
import { languageOptions, type LanguageCode, type LocaleCopy } from "../i18n";

type TopBarProps = {
  copy: LocaleCopy;
  city: CityProfile;
  language: LanguageCode;
  setCityId: (cityId: CityId) => void;
  setLanguage: (language: LanguageCode) => void;
};

export function TopBar({ copy, city, language, setCityId, setLanguage }: TopBarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{copy.app.eyebrow}</p>
        <h1>{copy.app.title}</h1>
      </div>
      <div className="topbar-actions">
        <label className="language-select">
          <span>{copy.app.cityLabel}</span>
          <select value={city.id} onChange={(event) => setCityId(event.target.value as CityId)}>
            {CITY_PROFILES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}, {option.country}
              </option>
            ))}
          </select>
        </label>
        <label className="language-select">
          <span>{copy.app.languageLabel}</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)}>
            {languageOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="official-note">
          <ShieldAlert aria-hidden="true" size={18} />
          <span>{copy.app.officialNote}</span>
        </div>
      </div>
    </header>
  );
}
