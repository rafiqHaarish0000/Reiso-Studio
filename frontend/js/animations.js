// Framer-like scroll reveals + stagger + parallax hero
(() => {
  const els = document.querySelectorAll(".reveal");
  // auto-assign stagger index inside .stagger containers
  document.querySelectorAll(".stagger").forEach((wrap) => {
    [...wrap.children].forEach((child, i) => child.style.setProperty("--i", i));
  });

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("reveal--visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("reveal--visible"), io.unobserve(e.target))),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));

  // subtle hero parallax
  const heroInner = document.querySelector("[data-parallax]");
  if (heroInner && matchMedia("(pointer:fine)").matches) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, 600);
      heroInner.style.transform = `translateY(${y * 0.08}px)`;
    }, { passive: true });
  }
})();
