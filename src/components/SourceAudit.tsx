import { useMemo, useState } from "react";
import { ExternalLink, Filter, Search } from "lucide-react";
import { sourceAuditStats, sources, type SourceCategory } from "../data/sources";
import type { LocaleCopy } from "../i18n";
import { interpolate } from "../i18n";

const categoryOrder: SourceCategory[] = [
  "Heat health",
  "Tajikistan evidence",
  "Satellite/geospatial",
  "Population/facilities",
  "Hazard datasets",
  "Climate context",
  "Materials/interventions",
  "Benchmark projects",
  "Language/health guidance",
  "Project process",
];

export function SourceAudit({ copy }: { copy: LocaleCopy }) {
  const [sourceFilter, setSourceFilter] = useState<SourceCategory | "All">("All");
  const [sourceQuery, setSourceQuery] = useState("");
  const addedReferences = sourceAuditStats.addedBenchmarkSources + sourceAuditStats.addedLanguageSources;
  const filteredSources = useMemo(() => {
    const query = sourceQuery.trim().toLowerCase();

    return sources.filter((source) => {
      const categoryMatch = sourceFilter === "All" || source.category === sourceFilter;
      const queryMatch =
        query.length === 0 ||
        source.title.toLowerCase().includes(query) ||
        source.url.toLowerCase().includes(query) ||
        source.relevance.toLowerCase().includes(query);
      return categoryMatch && queryMatch;
    });
  }, [sourceFilter, sourceQuery]);

  return (
    <section className="sources-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{copy.sources.eyebrow}</p>
          <h2>{copy.sources.title}</h2>
        </div>
        <span className="badge">
          {interpolate(copy.sources.badge, {
            original: sourceAuditStats.originalHtmlLinks,
            api: sourceAuditStats.addedLiveApis,
            added: addedReferences,
          })}
        </span>
      </div>
      <div className="source-stats" aria-label="Source audit stats">
        <Stat label={copy.sources.originalCoverage} value={`${sourceAuditStats.originalHtmlLinks} ${copy.common.links}`} />
        <Stat label={copy.sources.addedApi} value={`${sourceAuditStats.addedLiveApis} ${copy.common.source}`} />
        <Stat label={copy.sources.addedReferences} value={`${addedReferences} ${copy.common.links}`} />
        <Stat label={copy.sources.primarySources} value={`${sourceAuditStats.primarySources} ${copy.common.marked}`} />
      </div>
      <div className="source-controls">
        <label className="search-box">
          <Search aria-hidden="true" size={18} />
          <input value={sourceQuery} onChange={(event) => setSourceQuery(event.target.value)} placeholder={copy.sources.search} />
        </label>
        <div className="filter-row" aria-label="Source categories">
          <button className={sourceFilter === "All" ? "active" : ""} onClick={() => setSourceFilter("All")}>
            <Filter aria-hidden="true" size={16} />
            {copy.common.all}
          </button>
          {categoryOrder.map((category) => (
            <button className={sourceFilter === category ? "active" : ""} key={category} onClick={() => setSourceFilter(category)}>
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="source-table">
        {filteredSources.map((source) => (
          <article className="source-row" key={source.id}>
            <div>
              <span>{source.category}</span>
              <h3>{source.title}</h3>
              <p>{source.relevance}</p>
            </div>
            <a href={source.url} target="_blank" rel="noreferrer">
              <ExternalLink aria-hidden="true" size={17} />
              {copy.common.open}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
