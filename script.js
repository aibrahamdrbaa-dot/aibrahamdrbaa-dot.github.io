(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.documentElement.classList.add("js");

  const progress = document.createElement("div");
  progress.className = "fx-progress";
  const progressBar = document.createElement("span");
  progress.appendChild(progressBar);
  document.body.appendChild(progress);

  if (finePointer && !reduceMotion) {
    document.body.classList.add("fx-pointer");
    let px = innerWidth * 0.5, py = innerHeight * 0.35, tx = px, ty = py;
    const cursor = document.createElement("div");
    cursor.className = "fx-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);

    let cursorFrame = 0;
    const tick = () => {
      cursorFrame = 0;
      if (document.hidden) return;
      px += (tx - px) * 0.14;
      py += (ty - py) * 0.14;
      cursor.style.transform = "translate3d(" + px + "px," + py + "px,0)";
      cursorFrame = requestAnimationFrame(tick);
    };

    addEventListener("pointermove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      document.body.style.setProperty("--spot-x", tx + "px");
      document.body.style.setProperty("--spot-y", ty + "px");
    }, { passive: true });

    const resumeCursor = () => {
      if (!document.hidden && !cursorFrame) cursorFrame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", resumeCursor);
    resumeCursor();

    document.addEventListener("pointerover", (e) => {
      if (!(e.target instanceof Element)) return;
      const hit = e.target.closest("a,button,.card,.cat,.panel,.step");
      cursor.classList.toggle("is-hover", !!hit);
    });
  }

  const veil = document.createElement("div");
  veil.className = "fx-veil";

  const veilMark = document.createElement("div");
  veilMark.className = "fx-veil-mark";
  veilMark.textContent = "M!";

  const veilLine = document.createElement("div");
  veilLine.className = "fx-veil-line";
  const veilLineFill = document.createElement("span");
  veilLine.appendChild(veilLineFill);

  veil.append(veilMark, veilLine);
  document.body.appendChild(veil);

  const revealTargets = document.querySelectorAll("main section, .card, .cat, .panel, .step, .heroSide, footer");
  revealTargets.forEach((el, i) => {
    el.classList.add("fx-reveal");
    el.style.setProperty("--fx-i", String(i % 6));
  });

  const runReveal = () => {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    revealTargets.forEach((el) => io.observe(el));
  };

  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".navBtn,.buy,.bannerBtn,.mobileOrder,.kicker,.pill").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
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
      photos.forEach((img) => {
        const box = img.closest(".visual");
        if (!box) return;
        const r = box.getBoundingClientRect();
        if (r.bottom < -40 || r.top > innerHeight + 40) return;
        const p = ((r.top + r.height / 2) / innerHeight) - 0.5;
        img.style.transform = "scale(1.065) translate3d(0," + (p * -12) + "px,0)";
      });
    };

    addEventListener("scroll", () => {
      if (!raf) raf = requestAnimationFrame(updatePhotos);
    }, { passive: true });

    updatePhotos();
  }

  if (!reduceMotion) {
    document.addEventListener("click", (e) => {
      if (!(e.target instanceof Element)) return;
      const a = e.target.closest("a[href]");
      if (!a) return;

      const raw = a.getAttribute("href");
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") ||
          a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      let url;
      try {
        url = new URL(raw, location.href);
      } catch {
        return;
      }

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
    progressBar.style.transform = "scaleX(" + pct + ")";
  };

  addEventListener("scroll", () => {
    if (!progressRaf) progressRaf = requestAnimationFrame(updateProgress);
  }, { passive: true });
  updateProgress();

  const ready = () => {
    document.body.classList.add("is-ready");
    runReveal();
  };

  addEventListener("load", ready, { once: true });
  setTimeout(ready, 900);

  const productCatalog = [
    {id:"font-maniac-pack",name:"Font Maniac Pack",price:"$9",category:"TYPE",theme:"black",summary:"مجموعة فونتات إبداعية.",display:["TYPE","PACK"]},
    {id:"capcut-master",name:"CapCut Master",price:"$19",category:"CAPCUT",theme:"lime",summary:"كورس عملي خطوة بخطوة.",display:["CAP","CUT"]},
    {id:"creator-box",name:"Creator Box",price:"$29",category:"CREATOR",theme:"pink",summary:"قوالب + أدوات + موارد.",display:["CREATOR","BOX"]},
    {id:"ai-creator-kit",name:"AI Creator Kit",price:"$15",category:"AI",theme:"black",summary:"موارد ذكية للمحتوى.",display:["AI","KIT"]},
    {id:"social-pack",name:"Social Pack",price:"$12",category:"SOCIAL",theme:"lime",summary:"قوالب سوشال.",display:["SOCIAL","SET"]},
    {id:"video-flow",name:"Video Flow",price:"$17",category:"VIDEO",theme:"pink",summary:"موارد للمونتاج.",display:["VIDEO","FLOW"]},
    {id:"arabic-display-pack",name:"Arabic Display Pack",price:"$9",category:"TYPE",theme:"black",summary:"مجموعة عربية للعناوين.",display:["TYPE","01"]},
    {id:"modern-sans-pack",name:"Modern Sans Pack",price:"$8",category:"TYPE",theme:"lime",summary:"فونتات إنكليزية نظيفة.",display:["TYPE","02"]},
    {id:"poster-type-pack",name:"Poster Type Pack",price:"$11",category:"TYPE",theme:"pink",summary:"ستايل جريء للبوسترات.",display:["TYPE","03"]},
    {id:"capcut-editing-pack",name:"CapCut Editing Pack",price:"$14",category:"CAPCUT",theme:"black",summary:"حزمة موارد للمونتاج.",display:["EDIT","PRO"]},
    {id:"reels-template-set",name:"Reels Template Set",price:"$12",category:"CAPCUT",theme:"pink",summary:"قوالب للسوشال.",display:["REEL","SET"]},
    {id:"ai-for-creators",name:"AI for Creators",price:"$24",category:"COURSES",theme:"black",summary:"استخدام AI للمحتوى.",display:["AI","101"]},
    {id:"design-essentials",name:"Design Essentials",price:"$21",category:"COURSES",theme:"pink",summary:"أساسيات التصميم.",display:["DESIGN","101"]},
    {id:"creator-plan",name:"Creator Plan",price:"$25 / mo",category:"TOOLS",theme:"lime",summary:"خطة خدمات للمبدعين.",display:["PRO","PLAN"]},
    {id:"everything-pack",name:"Everything Pack",price:"$39",category:"TOOLS",theme:"pink",summary:"حزمة متنوعة.",display:["ALL","IN"]},
    {id:"starter-pack",name:"Starter Pack",price:"$19",category:"BUNDLES",theme:"black",summary:"فونتات + قوالب + موارد.",display:["START","PACK"]},
    {id:"creator-pro",name:"Creator Pro",price:"$39",category:"BUNDLES",theme:"lime",summary:"كورسات + أدوات + موارد.",display:["CREATOR","PRO"]},
    {id:"maniac-max",name:"Maniac Max",price:"$59",category:"BUNDLES",theme:"pink",summary:"الحزمة الشاملة.",display:["MANIAC","MAX"]}
  ];

  const findProduct = (id) => productCatalog.find((product) => product.id === id);

  const makeOrderUrl = (product) => {
    const message = "مرحباً، أريد تفاصيل وطلب: " + product.name + ".";
    return "https://t.me/aabrahamdrbaa?text=" + encodeURIComponent(message);
  };

  const setupSmartProductLinks = () => {
    document.querySelectorAll(".card .buy").forEach((link) => {
      const card = link.closest(".card");
      const title = card?.querySelector("h3")?.textContent.trim();
      const product = productCatalog.find((item) => item.name === title);
      if (!product) return;
      link.href = "product.html?item=" + encodeURIComponent(product.id);
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.textContent = "شوف التفاصيل ↗";
    });
  };

  const setupProductPage = () => {
    const root = document.querySelector("[data-product-page]");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("item");
    const product = findProduct(id);
    if (!product) {
      document.title = "MANIAC — المنتج غير موجود";
      root.querySelector("[data-product-title]").textContent = "المنتج غير موجود.";
      root.querySelector("[data-product-summary]").textContent = "المنتج المطلوب غير موجود في الكتالوج الحالي. ارجع للمتجر لمشاهدة المنتجات المتاحة.";
      root.querySelector("[data-product-order]").setAttribute("href", "shop.html");
      root.querySelector("[data-product-order]").textContent = "العودة للمتجر ↗";
      root.querySelector("[data-product-price]").textContent = "—";
      return;
    }

    document.title = product.name + " — MANIAC";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", product.name + " — " + product.summary + " من MANIAC. الطلب عبر Telegram.");
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", product.name + " — MANIAC");
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", product.summary + " الطلب عبر Telegram.");

    root.querySelector("[data-product-title]").textContent = product.name;
    root.querySelector("[data-product-summary]").textContent = product.summary;
    root.querySelector("[data-product-price]").textContent = product.price;
    root.querySelector("[data-product-category]").textContent = product.category;
    root.querySelector("[data-product-category-copy]").textContent = product.category;
    root.querySelector("[data-product-fact-category]").textContent = product.category;
    root.querySelector("[data-product-fact-price]").textContent = product.price;
    root.querySelector("[data-product-about]").textContent = product.summary + " التفاصيل الإضافية وبيانات الوصول يرسلها الفريق عبر Telegram عند الطلب.";
    root.querySelector("[data-product-visual-copy]").textContent = "منتج من قسم " + product.category + " في متجر MANIAC.";

    const theme = root.querySelector("[data-product-theme]");
    theme.classList.remove("theme-lime","theme-pink");
    if (product.theme === "lime") theme.classList.add("theme-lime");
    if (product.theme === "pink") theme.classList.add("theme-pink");

    const mark = root.querySelector("[data-product-mark]");
    mark.replaceChildren();
    product.display.forEach((line) => {
      const span = document.createElement("span");
      span.textContent = line;
      mark.appendChild(span);
    });

    const order = root.querySelector("[data-product-order]");
    order.href = makeOrderUrl(product);

    const related = root.querySelector("[data-related-products]");
    const sameCategory = productCatalog.filter((item) => item.id !== product.id && item.category === product.category).slice(0,3);
    const fallback = productCatalog.filter((item) => item.id !== product.id && item.category !== product.category).slice(0,3);
    const picks = sameCategory.length ? sameCategory : fallback;
    related.replaceChildren();
    picks.forEach((item) => {
      const card = document.createElement("article");
      card.className = "relatedCard";
      const top = document.createElement("div");
      top.className = "relatedTop";
      const name = document.createElement("span");
      name.className = "relatedName";
      name.textContent = item.name;
      const price = document.createElement("span");
      price.className = "relatedPrice";
      price.textContent = item.price;
      top.append(name, price);
      const desc = document.createElement("p");
      desc.className = "relatedDesc";
      desc.textContent = item.summary;
      const link = document.createElement("a");
      link.className = "relatedLink";
      link.href = "product.html?item=" + encodeURIComponent(item.id);
      link.textContent = "التفاصيل ↗";
      card.append(top, desc, link);
      related.appendChild(card);
    });
  };

  setupSmartProductLinks();
  setupProductPage();

})();