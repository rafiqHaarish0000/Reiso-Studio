// Nav scroll state + mobile menu + footer year + active link
(() => {
  const nav = document.querySelector("[data-nav]");
  const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const btn = document.querySelector("[data-menu-btn]");
  const drawer = document.querySelector("[data-drawer]");
  btn?.addEventListener("click", () => {
    const open = drawer?.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(!!open));
  });
  drawer?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => drawer.classList.remove("open")));

  const y = document.querySelector("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());

  // magnetic buttons (desktop only)
  if (matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * 0.12}px`);
        el.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * 0.18}px`);
      });
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
      });
    });
  }
})();
