import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSettings } from "../context/Settings.jsx";

export default function Hero({ total, onBrowse, onPlayground }) {
  const { reduceMotion } = useSettings();
  const animate = reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
  const stats = [
    [String(total), "Animated features"],
    ["11", "Categories"],
    ["100%", "Copy-ready prompts"],
  ];


  return (
    <section className="ml-hero" id="top">
      <motion.p className="ml-eyebrow" {...animate} transition={{ duration: 0.6 }}>
        <Sparkles size={14} /> Interactive UI design library
      </motion.p>
      <motion.h1 className="ml-hero-title" {...animate} transition={{ duration: 0.7, delay: 0.05 }}>
        Every animation you need,
        <br />
        <span className="ml-gradient-text">ready to copy.</span>
      </motion.h1>
      <motion.p className="ml-hero-sub" {...animate} transition={{ duration: 0.7, delay: 0.12 }}>
        Browse {total} hand-crafted motion features with live previews, usage guidance and a detailed
        prompt you can paste straight into your AI coding tool.
      </motion.p>
      <motion.div className="ml-hero-cta" {...animate} transition={{ duration: 0.7, delay: 0.18 }}>
        <button className="ml-btn ml-btn-primary" onClick={onBrowse}>
          Browse the library <ArrowRight size={16} />
        </button>
        <button className="ml-btn ml-btn-ghost" onClick={onPlayground}>
          Open the playground
        </button>
      </motion.div>

      <motion.dl className="ml-stats" {...animate} transition={{ duration: 0.7, delay: 0.24 }}>
        {stats.map(([value, label]) => (
          <div key={label}>
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
