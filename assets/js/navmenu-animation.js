const hamburgerButton = document.getElementById("hamburger-button");
const navMenuDesktop = document.getElementById("nav-menu-desktop");
const navMenuTabletMobile = document.getElementById("nav-menu-tablet-mobile");
const closeMenuDesktop = navMenuDesktop.querySelector("#close-menu");
const closeMenuTabletMobile = navMenuTabletMobile.querySelector("#close-menu");
const menuImageDesktop = navMenuDesktop.querySelector("#menu-image");
const menuImageTabletMobile = navMenuTabletMobile.querySelector("#menu-image");
const linksDesktop = navMenuDesktop.querySelectorAll(
  ".right-panel a[data-image]"
);
const linksTabletMobile = navMenuTabletMobile.querySelectorAll("a[data-image]");
const mobileMenuContainer = navMenuTabletMobile.querySelector(
  ".mobile-tablet-menu-container-scroll"
);

let scrollPosition = 0;

function disableBodyScroll() {
  scrollPosition = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";
}

function enableBodyScroll() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollPosition);
}

const tlDesktop = gsap.timeline({
  paused: true,
  onStart: () => {
    disableBodyScroll();
    gsap.set(navMenuDesktop, { display: "flex" });
  },
  onReverseComplete: () => {
    gsap.set(navMenuDesktop, { display: "none" });
    enableBodyScroll();
  },
});
tlDesktop
  .set(menuImageDesktop, { attr: { src: linksDesktop[0].dataset.image } }, 0)
  .from(
    ".left-panel",
    {
      yPercent: -100,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    },
    0
  )
  .from(
    ".right-panel",
    {
      yPercent: 100,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    },
    0
  );

const tlMobileTablet = gsap.timeline({
  paused: true,
  onStart: () => {
    disableBodyScroll();
    gsap.set(navMenuTabletMobile, { display: "block" });
  },
  onReverseComplete: () => {
    gsap.set(navMenuTabletMobile, { display: "none" });
    enableBodyScroll();
  },
});
tlMobileTablet
  .set(
    menuImageTabletMobile,
    { attr: { src: linksTabletMobile[0].dataset.image } },
    0
  )
  .from(
    navMenuTabletMobile,
    {
      yPercent: -100,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    },
    0
  );

const mediaQuery = window.matchMedia("(max-width: 906px)");

hamburgerButton.addEventListener("click", () => {
  if (mediaQuery.matches) {
    gsap.set(navMenuDesktop, { display: "none" });
    tlMobileTablet.play();
  } else {
    gsap.set(navMenuTabletMobile, { display: "none" });
    tlDesktop.play();
  }
});

closeMenuDesktop.addEventListener("click", () => {
  tlDesktop.reverse();
});
closeMenuTabletMobile.addEventListener("click", () => {
  tlMobileTablet.reverse();
});

linksDesktop.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    menuImageDesktop.src = link.dataset.image;
  });
});

linksTabletMobile.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    menuImageTabletMobile.src = link.dataset.image;
  });
  link.addEventListener("touchstart", (e) => {
    e.preventDefault();
    menuImageTabletMobile.src = link.dataset.image;
  });
});

if (window.lenis) {
  const stopLenis = () => window.lenis.stop();
  const startLenis = () => window.lenis.start();

  mobileMenuContainer.addEventListener("touchstart", stopLenis);
  mobileMenuContainer.addEventListener("touchend", startLenis);
  mobileMenuContainer.addEventListener("wheel", stopLenis);
  mobileMenuContainer.addEventListener("wheel", startLenis, { once: true });
}

mediaQuery.addEventListener("change", () => {
  tlDesktop.reverse();
  tlMobileTablet.reverse();
  navMenuDesktop.style.display = "none";
  navMenuTabletMobile.style.display = "none";
});

mobileMenuContainer.addEventListener("wheel", (e) => {
  e.stopPropagation();
});
