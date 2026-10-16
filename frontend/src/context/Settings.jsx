import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SettingsContext = createContext(null);

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
};

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(() => read("ml:theme", "dark"));
  const [reduceMotion, setReduceMotion] = useState(() => read("ml:reduce", false));
  const [favorites, setFavorites] = useState(() => new Set(read("ml:favs", [])));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ml:theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("ml:reduce", JSON.stringify(reduceMotion));
  }, [reduceMotion]);

  useEffect(() => {
    localStorage.setItem("ml:favs", JSON.stringify([...favorites]));
  }, [favorites]);

  const value = useMemo(() => {
    const toggleFavorite = (id) =>
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    return {
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      reduceMotion,
      toggleReduceMotion: () => setReduceMotion((v) => !v),
      favorites,
      isFavorite: (id) => favorites.has(id),
      toggleFavorite,
      favoriteCount: favorites.size,
    };
  }, [theme, reduceMotion, favorites]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
