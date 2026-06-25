import { HeartPulse, Sun, ThermometerSun, Waves } from "lucide-react";
import { KHUJAND } from "../config/khujand";
import type { LocaleCopy } from "../i18n";

export function EvidenceStrip({ copy }: { copy: LocaleCopy }) {
  return (
    <section className="evidence-strip" aria-label="Data evidence">
      <EvidenceItem icon={ThermometerSun} label={copy.evidence.trigger} value={`${KHUJAND.trigger.temperatureC}C x 4 days`} />
      <EvidenceItem icon={Sun} label={copy.evidence.forecast} value={copy.evidence.forecastValue} />
      <EvidenceItem icon={Waves} label={copy.evidence.context} value={copy.evidence.contextValue} />
      <EvidenceItem icon={HeartPulse} label={copy.evidence.health} value={copy.evidence.healthValue} />
    </section>
  );
}

function EvidenceItem({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return (
    <div className="evidence-item">
      <Icon aria-hidden="true" size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
