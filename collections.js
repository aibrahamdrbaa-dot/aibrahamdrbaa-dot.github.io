(() => {
  "use strict";

  const collections = [
    { id: "all", label: "الكل" },
    { id: "designers", label: "Designers", match: ["TYPE", "SOCIAL"] },
    { id: "editors", label: "Editors", match: ["CAPCUT", "VIDEO"] },
    { id: "creators", label: "Creators", match: ["CREATOR", "COURSES", "TOOLS"] },
    { id: "ai", label: "AI", match: ["AI"] },
    { id: "bundles", label: "Bundles", match: ["BUNDLES"] }
  ];

  const productCollections = {
    "Font Maniac Pack": ["designers", "creators"],
    "CapCut Master": ["editors", "creators"],
    "Creator Box": ["creators"],
    "AI Creator Kit": ["ai", "creators"],
    "Social Pack": ["designers", "creators"],
    "Video Flow": ["editors", "creators"],
    "Arabic Display Pack": ["designers"],
    "Modern Sans Pack": ["designers"],
    "Poster Type Pack": ["designers"],
    "CapCut Editing Pack": ["editors", "creators"],
    "Reels Template Set": ["editors", "creators"],
    "AI for Creators": ["ai", "creators"],
    "Design Essentials": ["designers", "creators"],
    "Creator Plan": ["creators"],
    "Everything Pack": ["creators"],
    "Starter Pack": ["bundles", "creators"],
    "Creator Pro": ["bundles", "creators"],
    "Maniac Max": ["bundles", "creators"]
  };

  const getCurrentCollection = () => {
    const value = new URLSearchParams(location.search).get("collection");
    return collections.some((item) => item.id === value) ? value : "all";
  };

  const buildFeaturedDrop = (cards) => {
    if (!cards.length || document.querySelector(".featuredDrop")) return;

    const source = Array.from(cards).find((card) =>
      card.querySelector("h3")?.textContent.trim() === "Creator Box"
    ) || cards[0];

    const name = source.querySelector("h3")?.textContent.trim() || "Creator Box";
    const summary = source.querySelector(".card p")?.textContent.trim() || "منتج رقمي جديد من MANIAC.";
    const image = source.querySelector("img");
    const buy = source.querySelector(".buy");
    const href = buy?.getAttribute("href") || "shop.html";

    const visual = document.createElement("section");
    visual.className = "featuredDrop";
    visual.setAttribute("aria-labelledby", "featuredDropTitle");

    const copy = document.createElement("div");
    copy.className = "featuredCopy";

    const eyebrow = document.createElement("div");
    eyebrow.className = "featuredEyebrow";
    eyebrow.textContent = "MANIAC / FEATURED DROP";

    const title = document.createElement("h2");
    title.className = "featuredTitle";
    title.id = "featuredDropTitle";
    title.textContent = name;

    const text = document.createElement("p");
    text.className = "featuredText";
    text.textContent = summary + " افتح التفاصيل وشوف طريقة الطلب عبر Telegram.";

    const action = document.createElement("a");
    action.className = "featuredAction";
    action.href = href;
    action.textContent = "شوف الـ Drop ↗";

    copy.append(eyebrow, title, text, action);

    const preview = document.createElement("div");
    preview.className = "featuredVisual";

    if (image?.currentSrc || image?.src) {
      const img = document.createElement("img");
      img.src = image.currentSrc || image.src;
      img.alt = image.alt || name;
      img.loading = "eager";
      img.fetchPriority = "high";
      img.decoding = "async";
      img.referrerPolicy = "no-referrer";
      preview.appendChild(img);
    }

    const badge = document.createElement("span");
    badge.className = "featuredBadge";
    badge.textContent = "FEATURED";
    preview.appendChild(badge);

    visual.append(copy, preview);
    document.querySelector(".pageHead")?.after(visual);
  };

  const setupCollections = () => {
    const products = document.querySelector(".products");
    if (!products) return;

    const cards = Array.from(products.querySelectorAll(".card"));
    buildFeaturedDrop(cards);

    const bar = document.createElement("div");
    bar.className = "collectionBar";
    bar.setAttribute("aria-label", "تصنيفات المتجر");

    const label = document.createElement("span");
    label.className = "collectionLabel";
    label.textContent = "COLLECTIONS";
    bar.appendChild(label);

    const active = getCurrentCollection();

    collections.forEach((collection) => {
      const chip = document.createElement("a");
      chip.className = "collectionChip";
      chip.href = collection.id === "all" ? "shop.html" : "shop.html?collection=" + encodeURIComponent(collection.id);
      if (collection.id === active) chip.setAttribute("aria-current", "page");
      chip.textContent = collection.label;
      bar.appendChild(chip);
    });

    const meta = document.createElement("div");
    meta.className = "collectionMeta";

    const count = document.createElement("span");
    const prefix = document.createElement("span");
    prefix.textContent = "عرض ";
    const total = document.createElement("strong");
    const suffix = document.createElement("span");
    suffix.textContent = " منتج";
    count.append(prefix, total, suffix);

    const note = document.createElement("span");
    const activeLabel = collections.find((item) => item.id === active)?.label || active;
    note.textContent = active === "all" ? "كل المنتجات" : "Collection: " + activeLabel;
    meta.append(count, note);

    const section = products.closest(".section");
    section?.insertBefore(bar, products);
    section?.insertBefore(meta, products);

    const empty = document.createElement("div");
    empty.className = "collectionEmpty";
    empty.textContent = "ما في منتجات ضمن هالمجموعة حاليًا.";
    empty.hidden = true;
    products.appendChild(empty);

    let visible = 0;

    cards.forEach((card) => {
      const title = card.querySelector("h3")?.textContent.trim() || "";
      const memberships = productCollections[title] || [];
      const match = active === "all" || memberships.includes(active);
      card.classList.toggle("is-filtered-out", !match);
      if (match) visible += 1;
    });

    total.textContent = String(visible);
    empty.hidden = visible !== 0;
  };

  setupCollections();
})();