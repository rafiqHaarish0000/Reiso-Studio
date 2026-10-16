import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bell, Check, ChevronDown, Inbox, Loader2, LogOut, Quote, Search, Send, Settings, Star, User, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE, center, useAutoScroll } from "./_shared.jsx";

export function AnimatedLogo({ reduce }) {
  return (
    <div style={center}>
      <svg viewBox="0 0 120 120" width="120" height="120">
        <motion.circle cx="60" cy="60" r="40" fill="none" stroke="var(--accent)" strokeWidth="4"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: EASE }}
          whileHover={reduce ? {} : { scale: 1.08 }} style={{ transformOrigin: "center" }} />
        <motion.path d="M40,78 L60,40 L80,78" fill="none" stroke="var(--fg)" strokeWidth="5" strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6, ease: EASE }} />
      </svg>
    </div>
  );
}

export function Preloader({ reduce }) {
  const [p, setP] = useState(reduce ? 100 : 0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setP((v) => Math.min(100, v + 4)), 60);
    return () => clearInterval(id);
  }, [reduce]);
  const done = p >= 100;
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", display: "grid", placeItems: "center", background: "var(--bg)" }}>
      <motion.div animate={{ opacity: done ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ display: "grid", placeItems: "center", gap: 12 }}>
        <span style={{ fontSize: 40, fontWeight: 800 }}>{Math.round(p)}%</span>
        <div style={{ width: 160, height: 3, borderRadius: 3, background: "var(--line)", overflow: "hidden" }}>
          <div style={{ width: `${p}%`, height: "100%", background: "var(--accent)" }} />
        </div>
      </motion.div>
      <motion.div animate={{ y: done ? "-101%" : "0%" }} transition={{ duration: 0.7, ease: EASE }} style={{ position: "absolute", inset: 0, background: "var(--surface)", display: "grid", placeItems: "center", color: "var(--muted)" }}>Revealed content</motion.div>
    </div>
  );
}

export function TestimonialCarousel() {
  const quotes = [
    ["MotionLab made our ship date.", "Ada L."],
    ["The prompts are absurdly good.", "Kenji T."],
    ["Our marketing site finally feels alive.", "Priya S."],
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 3000);
    return () => clearInterval(id);
  }, [quotes.length]);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 16 }}>
      <div style={{ position: "relative", width: "80%", maxWidth: 380, minHeight: 96 }}>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} style={{ textAlign: "center" }}>
            <Quote size={20} color="var(--accent)" />
            <p style={{ fontSize: 16, fontStyle: "italic", margin: "8px 0 6px" }}>“{quotes[i][0]}”</p>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{quotes[i][1]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {quotes.map((_, n) => <button key={n} onClick={() => setI(n)} aria-label={`testimonial ${n + 1}`} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", background: n === i ? "var(--accent)" : "var(--line)" }} />)}
      </div>
    </div>
  );
}

export function FaqSection() {
  const items = [
    ["Do I own the code?", "Yes — copy any prompt and adapt the result freely."],
    ["Which stacks are supported?", "Any — the prompts stay framework-agnostic."],
    ["Is there a free tier?", "The whole library is browsable without an account."],
  ];
  const [open, setOpen] = useState(0);
  return (
    <div style={{ ...center, width: "100%" }}>
      <div style={{ width: "80%", maxWidth: 400 }}>
        {items.map(([q, a], i) => (
          <div key={q} style={{ borderBottom: "1px solid var(--line)" }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", background: "none", border: "none", padding: "14px 0", color: "var(--fg)", cursor: "pointer", fontSize: 14, fontWeight: 600, textAlign: "left" }}>
              {q}
              <ChevronDown size={16} style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE }} style={{ overflow: "hidden" }}>
                  <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--muted)" }}>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingCards() {
  const plans = [["Starter", "$0"], ["Pro", "$24"], ["Team", "$79"]];
  const [hover, setHover] = useState(1);
  return (
    <div style={{ ...center, gap: 12, alignItems: "stretch" }}>
      {plans.map(([name, price], i) => (
        <motion.div key={name} onMouseEnter={() => setHover(i)} animate={{ y: hover === i ? -8 : 0, borderColor: hover === i ? "var(--accent)" : "var(--line)" }} transition={{ duration: 0.3 }} style={{ width: 110, padding: 16, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line)", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>{name}</p>
          <p style={{ margin: "6px 0", fontSize: 24, fontWeight: 800 }}>{price}</p>
          <span style={{ fontSize: 11, color: "var(--accent)" }}>Choose</span>
        </motion.div>
      ))}
    </div>
  );
}

export function ContactForm() {
  const [email, setEmail] = useState("hello@studio");
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState("idle");
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const submit = () => {
    setTouched(true);
    if (!valid) return;
    setState("loading");
    setTimeout(() => { setState("done"); setTimeout(() => setState("idle"), 1800); }, 1200);
  };
  return (
    <div style={{ ...center, flexDirection: "column", gap: 10, width: "100%" }}>
      <div style={{ width: "75%", maxWidth: 320 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="you@studio.com"
          style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${touched && !valid ? "#e05f7f" : "var(--line)"}`, background: "var(--surface)", color: "var(--fg)", outline: "none" }}
        />
        <AnimatePresence>
          {touched && !valid && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ margin: "6px 0 0", fontSize: 12, color: "#e05f7f" }}>Enter a valid email address.</motion.p>
          )}
        </AnimatePresence>
        <button onClick={submit} style={{ marginTop: 10, width: "100%", display: "inline-flex", gap: 8, alignItems: "center", justifyContent: "center", background: state === "done" ? "#3fbf7f" : "var(--accent)", color: "#0b0b11", border: "none", borderRadius: 10, padding: "11px 16px", fontWeight: 700, cursor: "pointer" }}>
          {state === "idle" && "Send message"}
          {state === "loading" && (<><Loader2 size={16} className="spin" /> Sending…</>)}
          {state === "done" && (<><Check size={16} /> Sent</>)}
        </button>
      </div>
    </div>
  );
}

export function AnimatedFooter({ reduce, paused }) {
  const cols = ["Product", "Company", "Legal"];
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflowY: "auto" }}>
      <div style={{ height: 200 }} />
      <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.5 }} variants={{ show: { transition: { staggerChildren: 0.08 } } }} style={{ padding: 20, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 14 }}>
        <motion.strong variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>Reiso</motion.strong>
        {cols.map((c) => (
          <motion.div key={c} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600 }}>{c}</p>
            <p style={{ margin: "3px 0", fontSize: 11, color: "var(--muted)" }}>Link</p>
            <p style={{ margin: "3px 0", fontSize: 11, color: "var(--muted)" }}>Link</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee({ reduce }) {
  const [rev, setRev] = useState(false);
  return (
    <div onMouseEnter={() => setRev(true)} onMouseLeave={() => setRev(false)} style={{ ...center, overflow: "hidden", width: "100%" }}>
      <div style={{ display: "flex", width: "200%", animation: reduce ? "none" : `ml-marquee 16s linear infinite`, animationDirection: rev ? "reverse" : "normal" }}>
        {[0, 1].map((k) => (
          <div key={k} style={{ display: "flex", gap: 40, paddingRight: 40 }}>
            {["MotionLab", "Framer", "GSAP", "Three.js", "Lenis"].map((w) => <span key={w} style={{ fontSize: 26, fontWeight: 800, color: "var(--muted)", whiteSpace: "nowrap" }}>{w}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoWall() {
  const logos = ["A", "N", "V", "E", "K", "O", "S", "T"];
  return (
    <div style={center}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {logos.map((l, i) => (
          <motion.div key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ opacity: 1, scale: 1.06, color: "var(--fg)" }} style={{ width: 54, height: 54, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center", fontWeight: 800, color: "var(--muted)", cursor: "pointer" }}>
            {l}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function BackToTop({ reduce, paused }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useAutoScroll(ref, paused, reduce);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden" }}>
      <div ref={ref} onScroll={(e) => setShow(e.currentTarget.scrollTop > 40)} style={{ height: "100%", overflowY: "auto" }}>
        <div style={{ height: 220, display: "grid", placeItems: "center", color: "var(--muted)", fontSize: 13 }}>scroll down</div>
        <div style={{ height: 400 }} />
      </div>
      <AnimatePresence>
        {show && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => ref.current?.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" style={{ position: "absolute", right: 16, bottom: 16, width: 44, height: 44, borderRadius: "50%", border: "none", background: "var(--accent)", color: "#0b0b11", display: "grid", placeItems: "center", cursor: "pointer" }}>
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NotificationBell() {
  const [count, setCount] = useState(3);
  return (
    <div style={{ ...center, flexDirection: "column", gap: 18, minHeight: 240 }}>
      <div style={{ position: "relative" }}>
        <button onClick={() => setCount(0)} aria-label="Notifications" style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--fg)", display: "grid", placeItems: "center", cursor: "pointer" }}>
          <Bell size={20} />
        </button>
        <AnimatePresence>
          {count > 0 && (
            <motion.span key={count} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ type: "spring", stiffness: 500, damping: 18 }} style={{ position: "absolute", top: -4, right: -4, minWidth: 22, height: 22, padding: "0 6px", borderRadius: 11, background: "#e05f7f", color: "#fff", fontSize: 12, fontWeight: 800, display: "grid", placeItems: "center" }}>
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <button onClick={() => setCount((c) => c + 1)} style={{ background: "var(--accent)", color: "#0b0b11", border: "none", borderRadius: 10, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
        Notify
      </button>
    </div>
  );
}

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const rows = [
    [User, "Profile"],
    [Settings, "Settings"],
    [LogOut, "Logout"],
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 48 }}>
      {open && <div onClick={() => setOpen(false)} style={{ position: "absolute", inset: 0, background: "transparent" }} />}
      <div style={{ position: "relative", zIndex: 1 }}>
        <button onClick={() => setOpen((v) => !v)} aria-label="Profile menu" style={{ width: 52, height: 52, borderRadius: "50%", border: "2px solid var(--accent)", background: "var(--surface)", color: "var(--fg)", display: "grid", placeItems: "center", cursor: "pointer", fontWeight: 800, fontSize: 18 }}>
          <User size={22} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, scale: 0.92, y: -6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 26 }} style={{ position: "absolute", top: 60, right: -40, width: 180, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}>
              {rows.map(([Icon, label]) => (
                <button key={label} onClick={() => setOpen(false)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "none", border: "none", color: "var(--fg)", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
                  <Icon size={15} color="var(--muted)" />
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 240, overflow: "hidden", background: "var(--bg)" }}>
      <div style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--muted)", fontSize: 13 }}>
        Page content
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.55, delay: 0.5, ease: EASE }} style={{ position: "absolute", left: 12, right: 12, bottom: 12, borderRadius: 14, background: "var(--surface)", border: "1px solid var(--line)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "var(--muted)", flex: 1 }}>We use cookies to improve your experience.</span>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 8, padding: "8px 12px", fontSize: 12, cursor: "pointer" }}>
                Preferences
              </button>
              <button onClick={() => setVisible(false)} style={{ background: "var(--accent)", color: "#0b0b11", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                Accept
              </button>
              <button onClick={() => setVisible(false)} aria-label="Dismiss" style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", display: "grid", placeItems: "center" }}>
                <X size={14} />
              </button>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(0);
  const [done, setDone] = useState(false);
  const submit = () => {
    if (!/.+@.+/.test(email)) {
      setError(true);
      setShake((s) => s + 1);
      return;
    }
    setError(false);
    setDone(true);
  };
  return (
    <div style={{ ...center, flexDirection: "column", minHeight: 240 }}>
      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 22 }} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 22px", fontWeight: 700 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#3fbf7f", display: "grid", placeItems: "center", color: "#fff" }}>
            <Check size={16} />
          </span>
          You&apos;re in
        </motion.div>
      ) : (
        <motion.div key={shake} animate={shake > 0 ? { x: [0, -9, 9, -5, 5, 0] } : { x: 0 }} transition={{ duration: 0.4 }} style={{ display: "flex", gap: 8, width: "80%", maxWidth: 340 }}>
          <div style={{ flex: 1 }}>
            <input value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(false); }} placeholder="you@studio.com" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${error ? "#e05f7f" : "var(--line)"}`, background: "var(--surface)", color: "var(--fg)", outline: "none" }} />
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ margin: "6px 0 0", fontSize: 12, color: "#e05f7f", textAlign: "left" }}>
                  Please enter a valid email.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <button onClick={submit} aria-label="Subscribe" style={{ height: 41, padding: "0 18px", borderRadius: 10, border: "none", background: "var(--accent)", color: "#0b0b11", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Send size={14} />
            Join
          </button>
        </motion.div>
      )}
    </div>
  );
}

export function SearchAutocomplete() {
  const items = ["Framer Motion", "React Hooks", "Tailwind CSS", "Motion Playground", "GSAP Timeline", "Lenis Scroll"];
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  const filtered = items.filter((s) => s.toLowerCase().includes(value.toLowerCase()));
  const show = focus && filtered.length > 0;
  return (
    <div style={{ ...center, minHeight: 240, alignItems: "flex-start", paddingTop: 48 }}>
      <div style={{ position: "relative", width: "80%", maxWidth: 320 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 10, padding: "10px 14px" }}>
          <Search size={15} color="var(--muted)" />
          <input value={value} onChange={(e) => setValue(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 120)} placeholder="Search components…" style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--fg)", fontSize: 13 }} />
        </div>
        <AnimatePresence>
          {show && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease: EASE }} style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 6, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
              {filtered.map((s) => (
                <button key={s} onMouseDown={() => setValue(s)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 14px", fontSize: 13, color: "var(--fg)", cursor: "pointer" }}>
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div style={{ ...center, minHeight: 240 }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ border: "1.5px dashed var(--line)", borderRadius: 18, padding: "32px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "var(--surface)" }}>
        <span style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--muted)" }}>
          <Inbox size={22} />
        </span>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Nothing here yet</p>
        <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>Create your first item to get started.</p>
        <button style={{ marginTop: 6, background: "var(--accent)", color: "#0b0b11", border: "none", borderRadius: 10, padding: "10px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          Create item
        </button>
      </motion.div>
    </div>
  );
}

export function DataTable() {
  const rows = [
    { name: "Ada Lovelace", plan: "Pro", status: "Active" },
    { name: "Kenji Tanaka", plan: "Team", status: "Trial" },
    { name: "Priya Shah", plan: "Starter", status: "Past due" },
    { name: "Marco Ruiz", plan: "Pro", status: "Active" },
  ];
  const [key, setKey] = useState("name");
  const [dir, setDir] = useState(1);
  const [hover, setHover] = useState(-1);
  const toggle = (k) => {
    if (k === key) setDir((d) => -d);
    else { setKey(k); setDir(1); }
  };
  const sorted = [...rows].sort((a, b) => {
    const av = a[key].toLowerCase();
    const bv = b[key].toLowerCase();
    if (av < bv) return -dir;
    if (av > bv) return dir;
    return 0;
  });
  const pill = (s) => s === "Active" ? { bg: "rgba(63,191,127,0.15)", fg: "#3fbf7f" } : s === "Trial" ? { bg: "rgba(224,178,31,0.15)", fg: "#e0b21f" } : { bg: "rgba(224,95,127,0.15)", fg: "#e05f7f" };
  return (
    <div style={{ ...center, minHeight: 240 }}>
      <table style={{ width: "88%", maxWidth: 440, borderCollapse: "collapse", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", fontSize: 12 }}>
        <thead>
          <tr>
            {["name", "plan", "status"].map((c) => (
              <th key={c} style={{ textAlign: "left", padding: "10px 12px", borderBottom: "1px solid var(--line)", color: "var(--muted)", textTransform: "capitalize" }}>
                <button onClick={() => toggle(c)} style={{ background: "none", border: "none", color: "inherit", font: "inherit", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, textTransform: "capitalize" }}>
                  {c}
                  <ChevronDown size={12} style={{ transform: key === c ? (dir === 1 ? "rotate(180deg)" : "none") : "none", opacity: key === c ? 1 : 0.35, transition: "transform .25s" }} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={r.name} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} style={{ background: hover === i ? "var(--bg)" : "transparent", transition: "background .2s" }}>
              <td style={{ padding: "10px 12px", fontWeight: 600 }}>{r.name}</td>
              <td style={{ padding: "10px 12px", color: "var(--muted)" }}>{r.plan}</td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ background: pill(r.status).bg, color: pill(r.status).fg, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ChatBubbles({ reduce }) {
  const [ready, setReady] = useState(!!reduce);
  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(id);
  }, [reduce]);
  const bubbles = [
    { from: "them", text: "Hey, is the new drop live?" },
    { from: "me", text: "Almost — shipping it tonight." },
    { from: "them", text: "Can't wait to try the playground." },
  ];
  return (
    <div style={{ ...center, minHeight: 240 }}>
      <motion.div initial={reduce ? false : "hidden"} animate="show" variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.35 } } }} style={{ display: "flex", flexDirection: "column", gap: 8, width: "80%", maxWidth: 320 }}>
        {bubbles.map((b) => (
          <motion.div key={b.text} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.4, ease: EASE }} style={{ alignSelf: b.from === "me" ? "flex-end" : "flex-start", background: b.from === "me" ? "var(--accent)" : "var(--surface)", color: b.from === "me" ? "#0b0b11" : "var(--fg)", border: b.from === "me" ? "none" : "1px solid var(--line)", borderRadius: 14, padding: "9px 13px", fontSize: 13, maxWidth: "85%" }}>
            {b.text}
          </motion.div>
        ))}
        {!ready ? (
          <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} style={{ alignSelf: "flex-start", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 14, padding: "10px 14px", display: "flex", gap: 5 }}>
            {[0, 1, 2].map((d) => (
              <motion.span key={d} animate={reduce ? {} : { y: [0, -5, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.15 }} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted)", display: "block" }} />
            ))}
          </motion.div>
        ) : (
          <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} style={{ alignSelf: "flex-end", background: "var(--accent)", color: "#0b0b11", borderRadius: 14, padding: "9px 13px", fontSize: 13, maxWidth: "85%" }}>
            You&apos;ll love it — 40 new motions.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export function OnboardingSteps() {
  const steps = [
    { icon: User, title: "Create your profile", text: "Tell us who you are so we can personalize the space." },
    { icon: Star, title: "Pick your style", text: "Choose motion presets that match your brand energy." },
    { icon: Send, title: "Ship it", text: "Export prompts and launch your animated site today." },
  ];
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (n) => { setDir(n > i ? 1 : -1); setI(Math.max(0, Math.min(steps.length - 1, n))); };
  const Icon = steps[i].icon;
  return (
    <div style={{ ...center, flexDirection: "column", gap: 14, minHeight: 240 }}>
      <div style={{ position: "relative", width: "82%", maxWidth: 320, minHeight: 150, overflow: "hidden" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={i} initial={{ opacity: 0, x: 48 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -48 * dir }} transition={{ duration: 0.35, ease: EASE }} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--accent)" }}>
              <Icon size={20} />
            </span>
            <strong style={{ fontSize: 15 }}>{steps[i].title}</strong>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{steps[i].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {steps.map((_, n) => (
          <button key={n} onClick={() => go(n)} aria-label={`step ${n + 1}`} style={{ width: n === i ? 22 : 8, height: 8, borderRadius: 5, border: "none", cursor: "pointer", background: n === i ? "var(--accent)" : "var(--line)", transition: "width .3s" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => go(i - 1)} disabled={i === 0} style={{ background: "none", border: "1px solid var(--line)", color: "var(--fg)", borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: i === 0 ? "default" : "pointer", opacity: i === 0 ? 0.4 : 1 }}>
          Back
        </button>
        <button onClick={() => go(i + 1)} disabled={i === steps.length - 1} style={{ background: "var(--accent)", color: "#0b0b11", border: "none", borderRadius: 10, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: i === steps.length - 1 ? "default" : "pointer", opacity: i === steps.length - 1 ? 0.5 : 1, display: "inline-flex", alignItems: "center", gap: 6 }}>
          Next
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function NotFoundState({ reduce }) {
  return (
    <div style={{ ...center, flexDirection: "column", gap: 8, minHeight: 240 }}>
      <motion.span animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, color: "var(--fg)" }}>
        404
      </motion.span>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Lost in space</p>
        <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>The page you want drifted out of orbit.</p>
        <button style={{ marginTop: 6, background: "var(--accent)", color: "#0b0b11", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          Go home
        </button>
      </motion.div>
    </div>
  );
}
