export function formatDate(value?: string) {
  if (!value) return "Waiting";
  if (value.startsWith("Sample")) return value;

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

export function formatShortDate(value: string) {
  if (!value) return value;
  if (value.startsWith("Sample")) return value.replace("Sample ", "");

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

export function formatDateTime(value?: string) {
  if (!value) return "Not loaded";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatCoordinate(value?: number) {
  return typeof value === "number" ? value.toFixed(3) : "n/a";
}

export function labelForChart(name: string | number) {
  const labels: Record<string, string> = {
    maxTempC: "Daily max",
    apparentMaxC: "Apparent max",
    minTempC: "Night minimum",
  };
  return labels[String(name)] ?? String(name);
}
