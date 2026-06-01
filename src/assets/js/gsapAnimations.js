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
  const heroPanel = document.querySelector(".header .hero-panel");
  const heroImageWrap = document.querySelector(".header .hero-image-wrap");
  const heroImage = heroImageWrap?.querySelector("img");

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
    if (heroImageWrap) {
      gsap.set(heroImageWrap, { clearProps: "all" });
    }
    if (heroPanel) {
      gsap.set(heroPanel, { clearProps: "all" });
    }
    return;
  }

  const waitForNextPaint = () =>
    new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });

  const waitForFonts = async () => {
    if (!document.fonts?.ready) return;

    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => window.setTimeout(resolve, 450)),
      ]);
    } catch {
      // Ignore font readiness issues and continue animating.
    }
  };

  const waitForHeroImage = async () => {
    if (!heroImage) return;
    if (heroImage.complete && heroImage.naturalWidth > 0) return;

    try {
      if (typeof heroImage.decode === "function") {
        await Promise.race([
          heroImage.decode(),
          new Promise((resolve) => window.setTimeout(resolve, 450)),
        ]);
        return;
      }
    } catch {
      // Fall back to the load event path below.
    }

    await new Promise((resolve) => {
      const cleanup = () => {
        heroImage.removeEventListener("load", cleanup);
        heroImage.removeEventListener("error", cleanup);
        resolve();
      };

      heroImage.addEventListener("load", cleanup, { once: true });
      heroImage.addEventListener("error", cleanup, { once: true });
      window.setTimeout(cleanup, 450);
    });
  };

  const animateHero = async () => {
    await Promise.all([waitForFonts(), waitForHeroImage()]);
    await waitForNextPaint();

    gsap.set(heroCopy, {
      perspective: 900,
      transformStyle: "preserve-3d",
    });

    if (heroPanel) {
      gsap.set(heroPanel, {
        autoAlpha: 0,
        scale: 0.97,
        force3D: true,
        willChange: "transform, opacity",
      });
    }

    gsap.set(heroItems, {
      autoAlpha: 0,
      y: 32,
      force3D: true,
      willChange: "transform, opacity",
    });

    if (heroImageWrap) {
      gsap.set(heroImageWrap, {
        autoAlpha: 0,
        x: 30,
        scale: 1.03,
        force3D: true,
        willChange: "transform, opacity",
      });
    }

    if (heroHighlight) {
      gsap.set(heroHighlight, {
        autoAlpha: 0.01,
        y: 10,
        force3D: true,
        willChange: "transform, opacity",
      });
    }

    const timeline = gsap.timeline({
      defaults: {
        ease: "expo.out",
        duration: 1.1,
      },
    });

    // Panel scales up first as the backdrop
    if (heroPanel) {
      timeline.to(
        heroPanel,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          clearProps: "willChange",
        },
        0,
      );
    }

    // Image slides in from right, overlapping with panel
    if (heroImageWrap) {
      timeline.to(
        heroImageWrap,
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 1.3,
          ease: "expo.out",
          clearProps: "willChange",
        },
        0.1,
      );
    }

    // Text items cascade in with stagger
    timeline.to(
      heroItems,
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.12,
        clearProps: "willChange",
      },
      0.18,
    );

    // Highlight color word fades in after title
    if (heroHighlight) {
      timeline.to(
        heroHighlight,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "willChange",
        },
        0.42,
      );
    }
  };

  void animateHero();
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
    y: 40,
    scale: 0.95,
    force3D: true,
    willChange: "transform, opacity",
  });

  gsap.to(aboutCards, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "expo.out",
    stagger: 0.15,
    clearProps: "willChange",
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

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealElements = (
  gsap,
  ScrollTrigger,
  trigger,
  elements,
  {
    start = "top 72%",
    y = 28,
    duration = 0.82,
    stagger = 0.12,
    scale = 1,
  } = {},
) => {
  const items = elements.filter(Boolean);
  if (!trigger || !items.length) return;

  if (prefersReducedMotion()) {
    gsap.set(items, { clearProps: "all" });
    return;
  }

  const fromState = {
    autoAlpha: 0,
    y,
    force3D: true,
    willChange: "transform, opacity",
  };

  if (scale !== 1) {
    fromState.scale = scale;
  }

  gsap.set(items, fromState);

  gsap.to(items, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    duration,
    stagger,
    ease: "power3.out",
    clearProps: "willChange",
    scrollTrigger: {
      trigger,
      start,
      once: true,
    },
  });
};

const revealSelector = (gsap, ScrollTrigger, triggerSelector, itemSelectors, options) => {
  const trigger = document.querySelector(triggerSelector);
  if (!trigger) return;

  const elements = itemSelectors.flatMap((selector) =>
    Array.from(trigger.querySelectorAll(selector)),
  );

  revealElements(gsap, ScrollTrigger, trigger, elements, options);
};

export const initHomepageSectionAnimations = (gsap, ScrollTrigger) => {
  revealSelector(
    gsap,
    ScrollTrigger,
    ".meet-our-team",
    [
      ".description-center > h2",
      ".description-center > p",
      ".team-member-image",
      ".team-member-description",
      ".our-story .story-img",
      ".our-story .story > *",
    ],
    {
      start: "top 70%",
      y: 30,
      duration: 0.84,
      stagger: 0.11,
      scale: 0.985,
    },
  );

  revealSelector(
    gsap,
    ScrollTrigger,
    ".faq-wrapper",
    [
      ".faq-heading-wrapper .text-style-tagline",
      ".faq-heading-wrapper h2",
      ".accordion-item",
    ],
    {
      start: "top 72%",
      y: 24,
      duration: 0.78,
      stagger: 0.1,
      scale: 0.99,
    },
  );

  revealSelector(
    gsap,
    ScrollTrigger,
    ".expertise",
    [".content-center > *", ".expertise-box"],
    {
      start: "top 71%",
      y: 26,
      duration: 0.8,
      stagger: 0.1,
      scale: 0.985,
    },
  );

  revealSelector(
    gsap,
    ScrollTrigger,
    ".testimonials",
    [".content-center > *", ".testimonial-card", ".testimonial-controls"],
    {
      start: "top 72%",
      y: 24,
      duration: 0.76,
      stagger: 0.09,
      scale: 0.99,
    },
  );
};
