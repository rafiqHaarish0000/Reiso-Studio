import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const push = useCallback(
    (message, tone = "success") => {
      const id = ++idRef.current;
      setToasts((list) => [...list, { id, message, tone }]);
      setTimeout(() => dismiss(id), 2800);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true" style={{ position: "fixed", right: 20, bottom: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ pointerEvents: "auto", display: "flex", alignItems: "center", gap: 10, minWidth: 240, maxWidth: 360, padding: "12px 14px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "0 24px 48px rgba(0,0,0,.45)", color: "var(--fg)", fontSize: 13 }}
            >
              <span style={{ display: "grid", placeItems: "center", width: 22, height: 22, borderRadius: "50%", background: t.tone === "info" ? "var(--line)" : "var(--accent)", color: "#0b0b12", flex: "none" }}>
                {t.tone === "info" ? <Info size={13} /> : <Check size={13} />}
              </span>
              <span style={{ flex: 1 }}>{t.message}</span>
              <button onClick={() => dismiss(t.id)} aria-label="Dismiss" style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "grid", placeItems: "center" }}>
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
