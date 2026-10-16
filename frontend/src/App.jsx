import { useMemo, useRef, useState } from "react";
import { CATEGORIES, FEATURES } from "./data/features.js";
import { useSettings } from "./context/Settings.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import LibraryControls from "./components/LibraryControls.jsx";
import FeatureCard from "./components/FeatureCard.jsx";
import FeatureModal from "./components/FeatureModal.jsx";
import Playground from "./components/Playground.jsx";

const DIFFICULTY_ORDER = { Beginner: 0, Intermediate: 1, Advanced: 2 };

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [openId, setOpenId] = useState(null);
  const { favorites, favoriteCount } = useSettings();

  const libraryRef = useRef(null);
  const playgroundRef = useRef(null);

  const counts = useMemo(() => {
    const map = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
    for (const f of FEATURES) map[f.category] += 1;
    return map;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = FEATURES.filter((f) => {
      if (favoritesOnly && !favorites.has(f.id)) return false;
      if (category !== "All" && f.category !== category) return false;
      if (!q) return true;
      return (
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });

    if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "za") list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    else if (sort === "category") list = [...list].sort((a, b) => a.category.localeCompare(b.category) || a.number - b.number);
    else if (sort === "difficulty") list = [...list].sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.number - b.number);

    return list;
  }, [query, category, sort, favoritesOnly, favorites]);

  const openIndex = results.findIndex((f) => f.id === openId);
  const openFeature = openIndex >= 0 ? results[openIndex] : null;
  const step = (delta) => {
    if (results.length === 0) return;
    const next = (openIndex + delta + results.length) % results.length;
    setOpenId(results[next].id);
  };

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="ml-app">
      <Navbar
        onHome={() => scrollTo(libraryRef)}
        onFavorites={() => {
          setFavoritesOnly(true);
          scrollTo(libraryRef);
        }}
        onPlayground={() => scrollTo(playgroundRef)}
      />

      <main>
        <Hero
          total={FEATURES.length}
          onBrowse={() => scrollTo(libraryRef)}
          onPlayground={() => scrollTo(playgroundRef)}
        />

        <section className="ml-library" ref={libraryRef}>
          <LibraryControls
            query={query}
            onQuery={setQuery}
            category={category}
            onCategory={setCategory}
            categories={CATEGORIES}
            counts={counts}
            total={FEATURES.length}
            sort={sort}
            onSort={setSort}
            favoritesOnly={favoritesOnly}
            onFavoritesOnly={() => setFavoritesOnly((v) => !v)}
            favoriteCount={favoriteCount}
            resultCount={results.length}
          />

          {results.length === 0 ? (
            <div className="ml-empty">
              <h3>No features match your filters</h3>
              <p>Try a different search term or clear the category filter.</p>
              <button
                className="ml-btn ml-btn-primary"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setFavoritesOnly(false);
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="ml-grid">
              {results.map((f) => (
                <FeatureCard
                  key={f.id}
                  feature={f}
                  onOpen={(feat) => setOpenId(feat.id)}
                  onTagClick={(c) => {
                    setCategory(c);
                    setFavoritesOnly(false);
                    scrollTo(libraryRef);
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <div ref={playgroundRef}>
          <Playground />
        </div>
      </main>

      <footer className="ml-footer">
        <span>Reiso MotionLab</span>
        <span>{FEATURES.length} animated features · built with React, Vite and Framer Motion</span>
      </footer>

      <FeatureModal
        feature={openFeature}
        onClose={() => setOpenId(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onPlayground={() => {
          setOpenId(null);
          scrollTo(playgroundRef);
        }}
      />
    </div>
  );
}
