import { Copy, Heart, Maximize2 } from "lucide-react";
import { useSettings } from "../context/Settings.jsx";
import { useToast } from "../context/Toast.jsx";
import PreviewSurface from "./previews/PreviewSurface.jsx";

export default function FeatureCard({ feature, onOpen, onTagClick }) {
  const { isFavorite, toggleFavorite } = useSettings();
  const toast = useToast();
  const favorite = isFavorite(feature.id);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(feature.prompt);
      toast.push(`Prompt for “${feature.title}” copied`);
    } catch {
      toast.push("Clipboard blocked by the browser", "info");
    }
  };

  return (
    <article className="ml-card">
      <div className="ml-card-preview">
        <PreviewSurface feature={feature} variant="card" />
        <span className="ml-card-number">{String(feature.number).padStart(3, "0")}</span>
        <button
          className={`ml-fav ${favorite ? "is-on" : ""}`}
          onClick={() => toggleFavorite(feature.id)}
          aria-pressed={favorite}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={15} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="ml-card-body">
        <div className="ml-card-meta">
          <button className="ml-badge" onClick={() => onTagClick(feature.category)}>
            {feature.category}
          </button>
          <span className="ml-diff" data-level={feature.difficulty}>
            {feature.difficulty}
          </span>
        </div>

        <h3 className="ml-card-title">{feature.title}</h3>
        <p className="ml-card-desc">{feature.description}</p>

        <div className="ml-card-foot">
          <button className="ml-mini-btn" onClick={() => onOpen(feature)}>
            <Maximize2 size={14} /> Details
          </button>
          <button className="ml-mini-btn primary" onClick={copyPrompt}>
            <Copy size={14} /> Copy prompt
          </button>
        </div>
      </div>
    </article>
  );
}
