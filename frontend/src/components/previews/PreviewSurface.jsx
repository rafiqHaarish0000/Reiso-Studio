import { Component, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useSettings } from "../../context/Settings.jsx";
import { PREVIEWS } from "./index.jsx";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return <div className="ml-canvas-fallback">Preview unavailable on this device.</div>;
    }
    return this.props.children;
  }
}

export default function PreviewSurface({ feature, variant = "card", controls = false }) {
  const { reduceMotion } = useSettings();
  const [paused, setPaused] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "240px 0px" });
  const Preview = PREVIEWS[feature.preview];

  return (
    <div
      ref={ref}
      className={`ml-canvas${paused ? " is-paused" : ""}${variant === "large" ? " is-large" : ""}`}
    >
      {inView && Preview ? (
        <ErrorBoundary key={`${feature.id}-${playKey}`}>
          <Preview reduce={reduceMotion} playKey={playKey} paused={paused} />
        </ErrorBoundary>
      ) : (
        <div className="ml-canvas-placeholder" />
      )}

      {controls && inView && (
        <div className="ml-canvas-controls">
          <button onClick={() => setPlayKey((k) => k + 1)} aria-label="Replay animation" title="Replay">
            <RotateCcw size={15} />
          </button>
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume animation" : "Pause animation"}
            title={paused ? "Resume" : "Pause"}
            disabled={reduceMotion}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      )}
    </div>
  );
}
