import { Heart, Moon, Sun } from "lucide-react";
import { useSettings } from "../context/Settings.jsx";
import logo from "../assets/images/reiso-logo.png";

export default function Navbar({ onHome, onPlayground, onFavorites }) {
  const { theme, toggleTheme, favoriteCount, reduceMotion, toggleReduceMotion } = useSettings();

  return (
    <header className="ml-nav">
      <div className="ml-nav-inner">
        <button className="ml-brand" onClick={onHome} aria-label="MotionLab home">
          <img src={logo} alt="Reiso" width={28} height={28} />
          <span>
            Reiso <b>MotionLab</b>
          </span>
        </button>

        <nav className="ml-nav-links" aria-label="Primary">
          <button onClick={onHome}>Library</button>
          <button onClick={onFavorites}>
            <Heart size={15} /> Favorites{favoriteCount > 0 ? ` (${favoriteCount})` : ""}
          </button>
          <button onClick={onPlayground}>Playground</button>
        </nav>

        <div className="ml-nav-actions">
          <button
            className={`ml-toggle ${reduceMotion ? "on" : ""}`}
            onClick={toggleReduceMotion}
            aria-pressed={reduceMotion}
            title="Toggle reduced motion"
          >
            Reduce motion
          </button>
          <button className="ml-icon-btn" onClick={toggleTheme} aria-label="Toggle colour theme">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}
