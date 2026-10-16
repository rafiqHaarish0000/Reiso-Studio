import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Copy, Heart, X } from "lucide-react";
import { useEffect } from "react";
import { useSettings } from "../context/Settings.jsx";
import { useToast } from "../context/Toast.jsx";
import PreviewSurface from "./previews/PreviewSurface.jsx";

function Section({ title, children }) {
  return (
    <div className="ml-detail-section">
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}

export default function FeatureModal({ feature, onClose, onPrev, onNext, onPlayground }) {
  const { isFavorite, toggleFavorite } = useSettings();
  const toast = useToast();

  useEffect(() => {
    if (!feature) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [feature, onClose, onPrev, onNext]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(feature.prompt);
      toast.push("Prompt copied to clipboard");
    } catch {
      toast.push("Clipboard blocked by the browser", "info");
    }
  };

  const favorite = feature ? isFavorite(feature.id) : false;

  return (
    <AnimatePresence>
      {feature && (
        <motion.div
          className="ml-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="ml-modal"
            role="dialog"
            aria-modal="true"
            aria-label={feature.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="ml-modal-head">
              <div>
                <span className="ml-modal-eyebrow">
                  #{String(feature.number).padStart(3, "0")} · {feature.category}
                </span>
                <h2>{feature.title}</h2>
              </div>
              <div className="ml-modal-head-actions">
                <button className={`ml-icon-btn ${favorite ? "is-on" : ""}`} onClick={() => toggleFavorite(feature.id)} aria-label="Toggle favorite">
                  <Heart size={17} fill={favorite ? "currentColor" : "none"} />
                </button>
                <button className="ml-icon-btn" onClick={onClose} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="ml-modal-scroll">
              <PreviewSurface feature={feature} variant="large" controls />

              <p className="ml-modal-desc">{feature.description}</p>

              <div className="ml-detail-grid">
                <Section title="Interaction">{feature.interaction}</Section>
                <Section title="Responsive">{feature.responsive}</Section>
                <Section title="Accessibility">{feature.accessibility}</Section>
                <Section title="Performance">{feature.performance}</Section>
              </div>

              <div className="ml-detail-section">
                <h4>Great for</h4>
                <div className="ml-chips">
                  {feature.useCases.map((u) => (
                    <span key={u} className="ml-chip">{u}</span>
                  ))}
                </div>
              </div>

              <div className="ml-detail-section">
                <h4>Keywords</h4>
                <div className="ml-chips">
                  {feature.keywords.map((k) => (
                    <span key={k} className="ml-chip subtle">{k}</span>
                  ))}
                </div>
              </div>

              <div className="ml-prompt">
                <div className="ml-prompt-head">
                  <span>Prompt</span>
                  <button className="ml-mini-btn primary" onClick={copyPrompt}>
                    <Copy size={14} /> Copy prompt
                  </button>
                </div>
                <pre>{feature.prompt}</pre>
              </div>
            </div>

            <footer className="ml-modal-foot">
              <button className="ml-mini-btn" onClick={onPrev}>
                <ChevronLeft size={15} /> Previous
              </button>
              <button className="ml-mini-btn" onClick={onPlayground}>
                Open in playground
              </button>
              <button className="ml-mini-btn" onClick={onNext}>
                Next <ChevronRight size={15} />
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
