import { Heart, Search, X } from "lucide-react";

export default function LibraryControls({
  query,
  onQuery,
  category,
  onCategory,
  categories,
  counts,
  total,
  sort,
  onSort,
  favoritesOnly,
  onFavoritesOnly,
  favoriteCount,
  resultCount,
}) {
  return (
    <div className="ml-controls" id="library">
      <div className="ml-search">
        <Search size={17} />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
            placeholder={`Search ${total} features, keywords, categories…`}
          aria-label="Search features"
        />
        {query && (
          <button onClick={() => onQuery("")} aria-label="Clear search">
            <X size={15} />
          </button>
        )}
      </div>

      <div className="ml-controls-row">
        <div className="ml-chips scroll-x" role="tablist" aria-label="Categories">
          <button
            role="tab"
            aria-selected={category === "All"}
            className={`ml-chip-btn ${category === "All" ? "is-active" : ""}`}
            onClick={() => onCategory("All")}
          >
            All <span>{total}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              className={`ml-chip-btn ${category === c ? "is-active" : ""}`}
              onClick={() => onCategory(c)}
            >
              {c} <span>{counts[c]}</span>
            </button>
          ))}
        </div>

        <div className="ml-controls-tools">
          <button
            className={`ml-toggle ${favoritesOnly ? "on" : ""}`}
            onClick={onFavoritesOnly}
            aria-pressed={favoritesOnly}
          >
            <Heart size={14} fill={favoritesOnly ? "currentColor" : "none"} /> Favorites{favoriteCount ? ` (${favoriteCount})` : ""}
          </button>
          <label className="ml-select compact">
            <span className="sr-only">Sort</span>
            <select value={sort} onChange={(e) => onSort(e.target.value)}>
              <option value="default">Sort: Default</option>
              <option value="az">Title A–Z</option>
              <option value="za">Title Z–A</option>
              <option value="category">Category</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </label>
        </div>
      </div>

      <p className="ml-result-count">{resultCount} of {total} features</p>
    </div>
  );
}
