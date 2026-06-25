import { Trees } from "lucide-react";
import { riskZones } from "../data/riskZones";
import type { LocaleCopy } from "../i18n";

export function InterventionPlanner({ copy }: { copy: LocaleCopy }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.interventions.eyebrow}</p>
          <h2>{copy.interventions.title}</h2>
        </div>
        <Trees aria-hidden="true" size={28} />
      </div>
      <div className="intervention-table">
        {riskZones.map((zone) => {
          const zoneCopy = copy.zones[zone.id];

          return (
            <div className="intervention-row" key={zone.id}>
              <div>
                <strong>{zoneCopy?.name ?? zone.name}</strong>
                <span>
                  {zoneCopy?.type ?? zone.type} | {zone.boundaryConfidence}
                </span>
              </div>
              <ul className="scenario-list">
                {zone.interventionOptions.map((option) => (
                  <li key={option.key}>
                    <strong>{copy.interventions[option.key]}</strong>
                    <span>
                      {option.estimatedReduction}/100 {copy.interventions.reduction} - {copy.interventions.prototype}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
