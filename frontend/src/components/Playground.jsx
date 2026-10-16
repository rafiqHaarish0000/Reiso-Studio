import { Copy, Shuffle, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { FEATURES } from "../data/features.js";
import { useSettings } from "../context/Settings.jsx";
import { useToast } from "../context/Toast.jsx";
import PreviewSurface from "./previews/PreviewSurface.jsx";

export default function Playground() {
  const [id, setId] = useState(FEATURES[0].id);
  const { theme, toggleTheme, reduceMotion, toggleReduceMotion } = useSettings();
  const toast = useToast();
  const feature = FEATURES.find((f) => f.id === id) ?? FEATURES[0];

  const random = () => setId(FEATURES[Math.floor(Math.random() * FEATURES.length)].id);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(feature.prompt);
      toast.push("Prompt copied to clipboard");
    } catch {
      toast.push("Clipboard blocked by the browser", "info");
    }
  };

  return (
    <section className="ml-playground" id="playground">
      <div className="ml-section-head">
        <div>
          <span className="ml-eyebrow">Sandbox</span>
          <h2>Playground</h2>
          <p>Pick any feature, replay it, pause it, and grab its prompt.</p>
        </div>
        <div className="ml-playground-controls">
          <button className={`ml-toggle ${reduceMotion ? "on" : ""}`} onClick={toggleReduceMotion} aria-pressed={reduceMotion}>
            Reduced motion
          </button>
          <button className="ml-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>

      <div className="ml-playground-toolbar">
        <label className="ml-select">
          <span>Feature</span>
          <select value={id} onChange={(e) => setId(e.target.value)}>
            {FEATURES.map((f) => (
              <option key={f.id} value={f.id}>
                {String(f.number).padStart(3, "0")} · {f.title}
              </option>
            ))}
          </select>
        </label>
        <button className="ml-btn ml-btn-ghost" onClick={random}>
          <Shuffle size={15} /> Surprise me
        </button>
      </div>

      <div className="ml-playground-stage">
        <PreviewSurface feature={feature} variant="large" controls />
        <aside className="ml-playground-info">
          <span className="ml-badge">{feature.category}</span>
          <h3>{feature.title}</h3>
          <p>{feature.behavior}</p>
          <div className="ml-prompt">
            <div className="ml-prompt-head">
              <span>Prompt</span>
              <button className="ml-mini-btn primary" onClick={copy}>
                <Copy size={14} /> Copy
              </button>
            </div>
            <pre>{feature.prompt}</pre>
          </div>
        </aside>
      </div>
    </section>
  );
}
