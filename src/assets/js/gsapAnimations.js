// GSAP animation helpers for the homepage.
// These functions are imported and called from `main.js` after GSAP and
// ScrollTrigger are registered.
// - `initHeroHeaderAnimation(gsap)` handles the header intro animation.
// - `initAboutSectionAnimation(gsap, ScrollTrigger)` handles the About section reveal.
// - `initViewportVideoPlayback(ScrollTrigger)` controls About video playback on scroll.

// Homepage hero intro animation:
// Reveals the title block on page load with a soft stagger.
export const initHeroHeaderAnimation = (gsap) => {
  const heroCopy = document.querySelector(".header .hero-copy");
  if (!heroCopy) return;

  const heroKicker = heroCopy.querySelector("h2");
  const heroTitle = heroCopy.querySelector("h1");
  const heroHighlight = heroTitle?.querySelector("span");
  const heroDescription = heroCopy.querySelector("p");
  const heroActions = heroCopy.querySelector(".hero-actions");

  const heroItems = [
    heroKicker,
    heroTitle,
    heroDescription,
    heroActions,
  ].filter(Boolean);

  if (!heroItems.length) return;

  const shouldReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (shouldReduceMotion) {
    gsap.set(heroItems, { clearProps: "all" });
    if (heroHighlight) {
      gsap.set(heroHighlight, { clearProps: "all" });
    }
    return;
  }

  gsap.set(heroCopy, { perspective: 900 });
  gsap.set(heroItems, {
    autoAlpha: 0,
    y: 34,
    scale: 0.985,
    willChange: "transform, opacity",
  });

  if (heroHighlight) {
    gsap.set(heroHighlight, {
      autoAlpha: 0,
      y: 16,
      scale: 0.96,
      willChange: "transform, opacity",
    });
  }

  const timeline = gsap.timeline({
    defaults: {
      ease: "expo.out",
      duration: 1,
    },
  });

  timeline.to(heroItems, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    stagger: 0.11,
    clearProps: "willChange",
  });

  if (heroHighlight) {
    timeline.to(
      heroHighlight,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "willChange",
      },
      "-=0.72",
    );
  }
};

// About section scroll reveal:
// Staggers the heading, paragraph, button, and video as the section enters view.
export const initAboutSectionAnimation = (gsap, ScrollTrigger) => {
  const aboutSection = document.querySelector(".about .section-header");
  if (!aboutSection) return;

  const aboutHeading = aboutSection.querySelector(".content-center h2");
  const aboutDescription = aboutSection.querySelector(".content-center p");
  const aboutButton = aboutSection.querySelector(
    ".content-center #button-scroll-indicator",
  );
  const aboutVideo = aboutSection.querySelector(".physio-video");

  const aboutItems = [
    aboutHeading,
    aboutDescription,
    aboutButton,
    aboutVideo,
  ].filter(Boolean);

  if (!aboutItems.length) return;

  const shouldReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (shouldReduceMotion) {
    gsap.set(aboutItems, { clearProps: "all" });
    return;
  }

  gsap.set(aboutItems, {
    autoAlpha: 0,
    y: 36,
    willChange: "transform, opacity",
  });

  gsap.to(aboutItems, {
    autoAlpha: 1,
    y: 0,
    duration: 0.85,
    ease: "power2.out",
    stagger: 0.14,
    clearProps: "willChange",
    scrollTrigger: {
      trigger: aboutSection,
      start: "top 78%",
      once: true,
    },
  });
};

// About grid cards reveal:
// Animates each card inside `.about-grid-wrapper` one after another with a fluid stagger.
export const initAboutGridAnimation = (gsap, ScrollTrigger) => {
  const aboutGrid = document.querySelector(".about .about-grid-wrapper");
  if (!aboutGrid) return;

  const aboutCards = Array.from(aboutGrid.querySelectorAll(".about-box"));
  if (!aboutCards.length) return;

  const shouldReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (shouldReduceMotion) {
    gsap.set(aboutCards, { clearProps: "all" });
    return;
  }

  gsap.set(aboutCards, {
    autoAlpha: 0,
    y: 42,
  });

  gsap.to(aboutCards, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    duration: 0.4,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: aboutGrid,
      start: "top 82%",
      once: true,
    },
  });
};

// About section video playback control:
// Keeps the video paused by default and only plays it while the video is in view.
export const initViewportVideoPlayback = (ScrollTrigger) => {
  const video = document.querySelector(".about .video-player");
  if (!video) return;

  video.pause();

  const playVideo = () => {
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {});
    }
  };

  ScrollTrigger.create({
    trigger: video,
    start: "top 85%",
    end: "bottom 15%",
    onEnter: playVideo,
    onEnterBack: playVideo,
    onLeave: () => video.pause(),
    onLeaveBack: () => video.pause(),
  });
};
