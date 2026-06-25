import { Building2, HeartPulse, Hospital, School, ShieldAlert, Users } from "lucide-react";
import type { LocaleCopy } from "../i18n";

export function ActionGuide({ copy }: { copy: LocaleCopy }) {
  const actionGroups = [
    {
      title: copy.action.residents,
      icon: Users,
      actions: copy.action.residentsActions,
    },
    {
      title: copy.action.schools,
      icon: School,
      actions: copy.action.schoolActions,
    },
    {
      title: copy.action.clinics,
      icon: Hospital,
      actions: copy.action.clinicActions,
    },
    {
      title: copy.action.workers,
      icon: Building2,
      actions: copy.action.workerActions,
    },
  ];

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.action.eyebrow}</p>
          <h2>{copy.action.title}</h2>
        </div>
        <HeartPulse aria-hidden="true" size={28} />
      </div>
      <div className="action-grid">
        {actionGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article className="action-card" key={group.title}>
              <Icon aria-hidden="true" size={22} />
              <h3>{group.title}</h3>
              <ul>
                {group.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="emergency-box">
        <ShieldAlert aria-hidden="true" size={22} />
        <div>
          <h3>{copy.action.emergencyTitle}</h3>
          <ul>
            {copy.action.emergencySteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p>{copy.action.emergencyCaveat}</p>
        </div>
      </div>
    </section>
  );
}
