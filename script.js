/* Portfolio interactions */

document.documentElement.classList.add("js");

/* Smooth reveal on scroll */
const revealEls = document.querySelectorAll(
  ".project, .notebook, .indice, .chapter-hero__script, .footer__content"
);

revealEls.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

revealEls.forEach((el) => io.observe(el));

/* Subtle parallax on chapter heroes */
const chapters = document.querySelectorAll(".chapter-hero__bg, .hero__bg, .footer__bg");

window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    chapters.forEach((bg) => {
      const parent = bg.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.08;
      bg.style.transform = `scale(1.05) translate3d(0, ${offset}px, 0)`;
    });
  },
  { passive: true }
);

/* Pause marquees when off-screen (perf) */
const marquees = document.querySelectorAll(".marquee__track");
const marqueeIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
    });
  },
  { rootMargin: "100px" }
);
marquees.forEach((m) => marqueeIO.observe(m));

/* Hire bar stays visible — do not disable on footer */

