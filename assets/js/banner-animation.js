gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

gsap.to(".banner-image", {
  scale: 1.3,
  ease: "none",
  scrollTrigger: {
    trigger: "#banner-section",
    start: "top top",
    end: "bottom top",
    scrub: true,
    invalidateOnRefresh: true,
  },
});

const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
const subtitleId = isDesktop
  ? "#desktop-banner-subtitle"
  : "#mobile-banner-subtitle";
const titleId = isDesktop ? "#desktop-banner-title" : "#mobile-banner-title";

const subtitleSplit = new SplitText(subtitleId, { type: "chars" });
const titleSplit = new SplitText(titleId, { type: "words,chars" });

gsap.set([subtitleId, titleId], { opacity: 1 });

const tl = gsap.timeline();

tl.from(subtitleSplit.chars, {
  y: 20,
  autoAlpha: 0,
  stagger: 0.02,
  duration: 0.4,
}).from(
  titleSplit.words,
  {
    y: 20,
    autoAlpha: 0,
    stagger: 0.1,
    duration: 0.5,
    // onStart: function () {
    //   titleSplit.words.forEach((word) => {
    //     const chars = word.querySelectorAll(".char");
    //     gsap.from(chars, {
    //       y: 20,
    //       autoAlpha: 0,
    //       stagger: 0.05,
    //       duration: 0.9,
    //     });
    //   });
    // },
  },
  "-=0.3"
);
