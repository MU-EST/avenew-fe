gsap.registerPlugin(ScrollTrigger);

let scrollTriggers = [];

function initializeScrollAnimations() {
  scrollTriggers.forEach((trigger) => trigger.kill());
  scrollTriggers = [];

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      const sections = document.querySelectorAll(".text-scrolling");

      sections.forEach((section) => {
        const pinnedText = section.querySelector(".pinned-text");

        if (pinnedText) {
          const scrollTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => {
              const pinnedTextHeight = pinnedText.offsetHeight;
              const sectionHeight = section.offsetHeight;
              return `+=${
                sectionHeight + pinnedTextHeight - window.innerHeight - 176
              }`;
            },
            pin: true,
            scrub: true,
          });
          scrollTriggers.push(scrollTrigger);

          const gsapAnimation = gsap.to(pinnedText, {
            y: () => -(pinnedText.offsetHeight - window.innerHeight + 176),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => {
                const pinnedTextHeight = pinnedText.offsetHeight;
                const sectionHeight = section.offsetHeight;
                return `+=${
                  sectionHeight + pinnedTextHeight - window.innerHeight - 176
                }`;
              },
              scrub: true,
            },
          });
          scrollTriggers.push(gsapAnimation.scrollTrigger);
        }
      });
    },
  });
}

initializeScrollAnimations();

// window.addEventListener("resize", () => {
//   initializeScrollAnimations();
// });
