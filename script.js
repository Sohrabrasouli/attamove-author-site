const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const readingLight = document.querySelector(".reading-light");

if (readingLight && window.matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("has-pointer");

  window.addEventListener("pointermove", (event) => {
    readingLight.style.transform = `translate3d(${event.clientX - 75}px, ${event.clientY}px, 0)`;
  });
}

const scrollProgress = document.querySelector(".scroll-progress");
const quickDockLinks = document.querySelectorAll(".quick-dock a");
const dockTargets = [...quickDockLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateScrollUi() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${Math.min(Math.max(progress, 0), 1) * 100}%`;
  }

  let activeId = "";
  dockTargets.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.42) {
      activeId = section.id;
    }
  });

  quickDockLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
}

window.addEventListener("scroll", updateScrollUi, { passive: true });
window.addEventListener("resize", updateScrollUi);
updateScrollUi();

const journeyItems = document.querySelectorAll(".journey-item");

journeyItems.forEach((item) => {
  item.addEventListener("click", () => {
    journeyItems.forEach((entry) => entry.classList.remove("is-active"));
    item.classList.add("is-active");
  });
});

const pathCopy = {
  reader: {
    label: "Reader path",
    title: "Find the book that meets your moment.",
    text:
      "Start with the books. Move from memory to practical self-sufficiency and choose the work that fits where life is asking you to stand.",
    cta: "Explore books",
    href: "#books",
  },
  organizer: {
    label: "Organizer path",
    title: "Bring Atta into a room that needs responsibility.",
    text:
      "Review the speaking topics, choose the right format, and start an event request with the context your audience needs.",
    cta: "See speaking topics",
    href: "#speaking",
  },
  media: {
    label: "Media path",
    title: "Get the public record, biography, and assets quickly.",
    text:
      "Move through interviews, public links, headshots, book covers, and the short or long bio needed for serious coverage.",
    cta: "Open press kit",
    href: "#press",
  },
  circle: {
    label: "Circle path",
    title: "Enter only if you are ready for high standards.",
    text:
      "The Circle is for people seeking responsibility, discipline, dignity, and practical ownership in a serious community.",
    cta: "Apply to the Circle",
    href: "#circle",
  },
};

const pathTabs = document.querySelectorAll(".path-tab");
const pathLabel = document.querySelector("#pathLabel");
const pathTitle = document.querySelector("#pathTitle");
const pathText = document.querySelector("#pathText");
const pathCta = document.querySelector("#pathCta");

pathTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const next = pathCopy[tab.dataset.path];

    if (!next || !pathLabel || !pathTitle || !pathText || !pathCta) return;

    pathTabs.forEach((entry) => entry.classList.remove("is-active"));
    tab.classList.add("is-active");
    pathLabel.textContent = next.label;
    pathTitle.textContent = next.title;
    pathText.textContent = next.text;
    pathCta.textContent = next.cta;
    pathCta.setAttribute("href", next.href);
  });
});

const bookExperience = {
  immigrant: {
    cover: "./assets/self-sufficient-immigrant-cover.png",
    alt: "The Self-Sufficient Immigrant cover",
    kicker: "Selected guidebook",
    title: "The Self-Sufficient Immigrant",
    text:
      "A roadmap for modern immigrants and restarting families: responsibility, judgment, work, language, family stability, and practical ownership.",
    primaryHref: "#sample-reader",
    secondaryHref: "#contact",
    sampleTitle: "Chapter One: Restart",
    sampleText:
      "Begin with the facts of your life, not the shame around them. What papers matter this week? What appointment cannot be missed? What one action would make tomorrow less fragile?",
    guide:
      "Atta's guidance: do not try to rebuild a whole life in one heroic motion. Name the next honest step and protect it.",
  },
  lost: {
    cover: "./assets/lost-decency-cover.png",
    alt: "Lost Decency cover",
    kicker: "Memoir and moral record",
    title: "Lost Decency",
    text:
      "A moral reckoning with Afghanistan, rupture, exile, and the human cost behind public history.",
    primaryHref: "https://amzn.to/4bXBaed",
    secondaryHref: "#contact",
    sampleTitle: "Sample: Memory and Loss",
    sampleText:
      "The opening question is not only what happened to a country. It is what happens to dignity when power, fear, and silence are allowed to become normal.",
    guide:
      "Atta's guidance: read this as memory with responsibility. Do not make suffering decorative. Ask what must be remembered so it is not repeated.",
  },
  global: {
    cover: "./assets/global-citizen-cover.jpg",
    alt: "The Self-Sufficient Global Citizen cover",
    kicker: "Family and community guide",
    title: "The Self-Sufficient Global Citizen",
    text:
      "A guidebook for responsible families and communities starting fresh in the Western world.",
    primaryHref: "https://amzn.to/411jpFT",
    secondaryHref: "#contact",
    sampleTitle: "Sample: The Responsible Household",
    sampleText:
      "A steady family is not built by one decision. It is built by the small systems that protect health, documents, money, learning, and trust.",
    guide:
      "Atta's guidance: self-sufficiency is not isolation. It is the ability to receive help without surrendering responsibility.",
  },
  planning: {
    cover: "",
    alt: "Immigrant Success Planning visual plate",
    kicker: "Practical planning resource",
    title: "Immigrant Success Planning",
    text:
      "A practical family resource for daily life, work, documents, citizenship, responsibility, and self-sufficiency.",
    primaryHref: "#contact",
    secondaryHref: "#contact",
    sampleTitle: "Sample: First Practical Steps",
    sampleText:
      "Write down the office, the form, the deadline, the document, and the person responsible. A plan becomes real when it survives the week.",
    guide:
      "Atta's guidance: do not let life stay vague. Put names, dates, papers, and next actions where the whole family can see them.",
  },
};

const activeBookCover = document.querySelector("#activeBookCover");
const activeBookPlaceholder = document.querySelector("#activeBookPlaceholder");
const activeBookKicker = document.querySelector("#activeBookKicker");
const activeBookTitle = document.querySelector("#activeBookTitle");
const activeBookText = document.querySelector("#activeBookText");
const activeBookPrimary = document.querySelector("#activeBookPrimary");
const activeBookSecondary = document.querySelector("#activeBookSecondary");
const sampleTitle = document.querySelector("#sampleTitle");
const sampleText = document.querySelector("#sampleText");
const sampleGuide = document.querySelector("#sampleGuide");
const bookCards = document.querySelectorAll("[data-active-book]");

bookCards.forEach((card) => {
  card.addEventListener("click", () => {
    const next = bookExperience[card.dataset.activeBook];

    if (!next) return;

    bookCards.forEach((entry) => entry.classList.remove("is-active"));
    card.classList.add("is-active");

    if (activeBookCover && activeBookPlaceholder && next.cover) {
      activeBookCover.src = next.cover;
      activeBookCover.alt = next.alt;
      activeBookCover.style.visibility = "visible";
      activeBookPlaceholder.classList.remove("is-visible");
    } else if (activeBookCover) {
      activeBookCover.style.visibility = "hidden";
      activeBookPlaceholder?.classList.add("is-visible");
    }

    if (activeBookKicker) activeBookKicker.textContent = next.kicker;
    if (activeBookTitle) activeBookTitle.textContent = next.title;
    if (activeBookText) activeBookText.textContent = next.text;
    if (activeBookPrimary) {
      activeBookPrimary.href = next.primaryHref;
      activeBookPrimary.textContent = next.primaryHref.startsWith("#") ? "Read sample" : "Open book link";
    }
    if (activeBookSecondary) activeBookSecondary.href = next.secondaryHref;
    if (sampleTitle) sampleTitle.textContent = next.sampleTitle;
    if (sampleText) sampleText.textContent = next.sampleText;
    if (sampleGuide) sampleGuide.textContent = next.guide;
  });
});

const bookFinderCopy = {
  restart: {
    title: "The Self-Sufficient Immigrant",
    text:
      "Start here if life is asking for structure now: work, language, documents, household systems, judgment, and practical ownership.",
    href: "#contact",
  },
  memory: {
    title: "Lost Decency",
    text:
      "Start here if you want the Afghan story: rupture, moral loss, exile, and the human cost behind public history.",
    href: "https://amzn.to/4bXBaed",
  },
  family: {
    title: "The Self-Sufficient Global Citizen",
    text:
      "Start here if your question is family stability: responsibility, resources, systems, and the long road of becoming steady.",
    href: "https://amzn.to/411jpFT",
  },
  planning: {
    title: "Immigrant Success Planning",
    text:
      "Start here if you need practical planning: daily life, documents, citizenship, work, and responsibility in a new country.",
    href: "#contact",
  },
};

const finderOptions = document.querySelectorAll(".finder-option");
const finderTitle = document.querySelector("#finderTitle");
const finderText = document.querySelector("#finderText");
const finderLink = document.querySelector("#finderLink");

finderOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const next = bookFinderCopy[option.dataset.book];

    if (!next || !finderTitle || !finderText || !finderLink) return;

    finderOptions.forEach((entry) => entry.classList.remove("is-active"));
    option.classList.add("is-active");
    finderTitle.textContent = next.title;
    finderText.textContent = next.text;
    finderLink.setAttribute("href", next.href);
    finderLink.textContent = next.href.startsWith("#") ? "Ask about this book" : "Open book link";
  });
});

const briefAudience = document.querySelector("#briefAudience");
const briefFormat = document.querySelector("#briefFormat");
const briefTheme = document.querySelector("#briefTheme");
const briefText = document.querySelector("#briefText");
const copyBrief = document.querySelector("#copyBrief");
const copyNote = document.querySelector(".copy-note");

function sentenceCase(value) {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : "";
}

function updateBrief() {
  if (!briefAudience || !briefFormat || !briefTheme || !briefText) return;

  briefText.textContent = `We would like to invite Atta Arghandiwal for a ${sentenceCase(
    briefFormat.value,
  )} with ${sentenceCase(briefAudience.value)} on ${sentenceCase(
    briefTheme.value,
  )}. The audience is seeking a direct conversation about ownership, dignity, and the practical work of standing again.`;
}

[briefAudience, briefFormat, briefTheme].forEach((control) => {
  control?.addEventListener("change", updateBrief);
});

copyBrief?.addEventListener("click", async () => {
  if (!briefText || !copyNote) return;

  try {
    await navigator.clipboard.writeText(briefText.textContent.trim());
    copyNote.textContent = "Brief copied.";
  } catch {
    copyNote.textContent = "Copy is blocked in this browser. Select the text manually.";
  }
});

const pressCopy = {
  "short-bio":
    "Atta Arghandiwal is an Afghan American author, humanitarian, and mentor whose work centers responsibility, dignity, immigrant self-sufficiency, and the memory of Afghanistan.",
  "long-bio":
    "Born in Kabul, shaped by displacement, and rebuilt through a 29-year banking career in the United States, Atta Arghandiwal now writes and speaks for people who are trying to stand again without losing honor, judgment, or responsibility.",
};

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = pressCopy[button.dataset.copyTarget];
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select bio text";
    }
  });
});

const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const reason = data.get("reason") || "message";
    formNote.textContent = `Draft prepared for: ${reason}. Email sending can be connected in the next build.`;
    contactForm.reset();
  });
}
