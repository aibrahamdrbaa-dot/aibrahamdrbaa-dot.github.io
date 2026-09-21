(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.documentElement.classList.add("js");

  const progress = document.createElement("div");
  progress.className = "fx-progress";
  progress.innerHTML = "<span></span>";
  document.body.appendChild(progress);

  if (finePointer && !reduceMotion) {
    document.body.classList.add("fx-pointer");
    let px = innerWidth * 0.5, py = innerHeight * 0.35, tx = px, ty = py;
    const cursor = document.createElement("div");
    cursor.className = "fx-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);

    addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      document.body.style.setProperty("--spot-x", tx + "px");
      document.body.style.setProperty("--spot-y", ty + "px");
    }, {passive:true});

    const tick = () => {
      px += (tx - px) * 0.14;
      py += (ty - py) * 0.14;
      cursor.style.transform = "translate3d(" + px + "px," + py + "px,0)";
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    document.addEventListener("pointerover", (e) => {
      const hit = e.target.closest("a,button,.card,.category,.panel,.step");
      cursor.classList.toggle("is-hover", !!hit);
    });
  }

  const veil = document.createElement("div");
  veil.className = "fx-veil";
  veil.innerHTML = '<div class="fx-veil-mark">M!</div><div class="fx-veil-line"><span></span></div>';
  document.body.appendChild(veil);

  const revealTargets = document.querySelectorAll("main section, .card, .category, .panel, .step, .heroSide, footer");
  revealTargets.forEach((el, i) => {
    el.classList.add("fx-reveal");
    el.style.setProperty("--fx-i", String(i % 6));
  });

  const runReveal = () => {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, {threshold:0.08, rootMargin:"0px 0px -8% 0px"});
    revealTargets.forEach(el => io.observe(el));
  };

  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".navBtn,.buy,.bannerBtn,.mobileOrder,.kicker,.pill").forEach(btn => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) / r.width;
        const y = (e.clientY - r.top - r.height/2) / r.height;
        btn.style.setProperty("--mx", (x * 10) + "px");
        btn.style.setProperty("--my", (y * 6) + "px");
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.setProperty("--mx", "0px");
        btn.style.setProperty("--my", "0px");
      });
    });
  }

  const photos = document.querySelectorAll(".visual.photo img");
  if (!reduceMotion && photos.length) {
    let raf = 0;
    const updatePhotos = () => {
      raf = 0;
      photos.forEach(img => {
        const box = img.closest(".visual");
        if (!box) return;
        const r = box.getBoundingClientRect();
        if (r.bottom < -40 || r.top > innerHeight + 40) return;
        const p = ((r.top + r.height/2) / innerHeight) - 0.5;
        img.style.transform = "scale(1.065) translate3d(0," + (p * -12) + "px,0)";
      });
    };
    addEventListener("scroll", () => {
      if (!raf) raf = requestAnimationFrame(updatePhotos);
    }, {passive:true});
    updatePhotos();
  }

  if (!reduceMotion) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const raw = a.getAttribute("href");
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") ||
          a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const url = new URL(raw, location.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      document.body.classList.add("page-leave");
      setTimeout(() => { location.href = url.href; }, 240);
    });
  }

  let progressRaf = 0;
  const updateProgress = () => {
    progressRaf = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    const pct = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    progress.firstElementChild.style.transform = "scaleX(" + pct + ")";
  };
  addEventListener("scroll", () => {
    if (!progressRaf) progressRaf = requestAnimationFrame(updateProgress);
  }, {passive:true});
  updateProgress();

  addEventListener("load", () => {
    document.body.classList.add("is-ready");
    runReveal();
  }, {once:true});
  setTimeout(() => {
    document.body.classList.add("is-ready");
    runReveal();
  }, 900);
})();