(() => {
  "use strict";

  const root = document.documentElement;
  const menuButton = document.querySelector(".m2-menu-btn");
  const nav = document.querySelector("#m2-nav");
  const themeButton = document.querySelector(".m2-theme-btn");
  const year = document.querySelector("#m2-year");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const savedTheme = localStorage.getItem("maniac-theme");
  if (savedTheme === "dark") root.dataset.maniacTheme = "dark";

  const syncThemeLabel = () => {
    if (!themeButton) return;
    const dark = root.dataset.maniacTheme === "dark";
    themeButton.setAttribute("aria-pressed", String(dark));
    themeButton.setAttribute("title", dark ? "الانتقال للوضع الفاتح" : "الانتقال للوضع الداكن");
    themeButton.setAttribute("aria-label", dark ? "الانتقال للوضع الفاتح" : "الانتقال للوضع الداكن");
  };

  syncThemeLabel();

  themeButton?.addEventListener("click", () => {
    const next = root.dataset.maniacTheme === "dark" ? "light" : "dark";
    if (next === "dark") root.dataset.maniacTheme = "dark";
    else delete root.dataset.maniacTheme;
    localStorage.setItem("maniac-theme", next);
    syncThemeLabel();
  });

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(Boolean(open)));
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (event) => {
    if (!nav || !menuButton || !nav.classList.contains("is-open")) return;
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = [...document.querySelectorAll(".m2-reveal")];
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.14 });

    revealItems.forEach((el) => observer.observe(el));
  }

  const stage = document.querySelector(".m2-stage-frame");
  if (stage && !reducedMotion && window.matchMedia("(pointer:fine)").matches) {
    let raf = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      raf = 0;
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      stage.style.transform = "perspective(1100px) rotateX(" + (-y * 2.4) + "deg) rotateY(" + (x * 2.4) + "deg)";
      if (Math.abs(targetX - x) > 0.001 || Math.abs(targetY - y) > 0.001) raf = requestAnimationFrame(render);
    };

    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = requestAnimationFrame(render);
    });

    stage.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(render);
    });
  }
})();
