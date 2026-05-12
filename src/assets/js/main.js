import navbar from "./navbar.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.7/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.7/ScrollTrigger/+esm";
import renderFinalCta from "./finalCta.js";
import renderFooter from "./footer.js";
import {
  initAboutGridAnimation,
  initAboutSectionAnimation,
  initHeroHeaderAnimation,
  initViewportVideoPlayback,
} from "./gsapAnimations.js";

// ---------- Global page loader ----------
// const pageLoader = (() => {
//   let loader = document.querySelector("#page-loader");
//   if (!loader) {
//     loader = document.createElement("div");
//     loader.id = "page-loader";
//     loader.className = "page-loader";
//     loader.setAttribute("role", "status");
//     loader.setAttribute("aria-live", "polite");
//     loader.innerHTML = `
//       <div class="loader-card">
//         <div class="loader-icon">
//           <i class="bi bi-heart-pulse"></i>
//         </div>
//         <div class="loader-title">Amethyst</div>
//         <div class="loader-subtitle">Preparing your recovery journey...</div>
//         <div class="loader-dots" aria-hidden="true">
//           <span></span><span></span><span></span>
//         </div>
//       </div>
//     `;
//     document.body.appendChild(loader);
//   }
//   const scrollY = window.scrollY || window.pageYOffset;
//   document.documentElement.classList.add("loader-active");
//   document.body.classList.add("loader-active");
//   document.body.style.top = `-${scrollY}px`;
//   document.body.dataset.scrollY = String(scrollY);
//   return loader;
// })();

let lenisInstance = null;
const pendingHomeHashKey = "amethyst:pending-home-hash";
const pageTransitionDuration = 180;

const getNormalizedPath = () => window.location.pathname.replace(/\\/g, "/");
const isServicesPage = () => getNormalizedPath().includes("/services/");
const isHomePage = () => !isServicesPage();
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const consumePendingHomeHash = () => {
  const pendingHash = sessionStorage.getItem(pendingHomeHashKey);
  if (!pendingHash || !pendingHash.startsWith("#")) return "";

  sessionStorage.removeItem(pendingHomeHashKey);
  return pendingHash;
};

const scrollToHashTarget = (hashValue = window.location.hash) => {
  const hash = hashValue;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;

  const navbarEl = document.querySelector(".navbar");
  const navbarOffset = navbarEl ? navbarEl.offsetHeight : 0;
  const targetTop =
    target.getBoundingClientRect().top + window.scrollY - navbarOffset;

  if (lenisInstance) {
    lenisInstance.scrollTo(Math.max(targetTop, 0), {
      immediate: false,
      force: true,
    });
    return;
  }

  window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
};

const scheduleHashScroll = (hashValue) => {
  if (!hashValue) return;

  const runScroll = () => {
    scrollToHashTarget(hashValue);
  };

  requestAnimationFrame(runScroll);
  window.setTimeout(runScroll, 250);
  window.setTimeout(runScroll, 700);

  if (document.readyState !== "complete") {
    window.addEventListener("load", runScroll, { once: true });
  }
};

const setupCrossPageHomeNavigation = () => {
  if (!isServicesPage()) return;

  const homeSectionLinks = Array.from(
    document.querySelectorAll('a[href*="index.html#"]'),
  );

  homeSectionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const parsedUrl = new URL(href, window.location.href);
      if (!parsedUrl.hash) return;

      event.preventDefault();
      sessionStorage.setItem(pendingHomeHashKey, parsedUrl.hash);

      if (prefersReducedMotion()) {
        window.location.href = parsedUrl.pathname;
        return;
      }

      document.body.classList.add("page-transition-leave");
      window.setTimeout(() => {
        window.location.href = parsedUrl.pathname;
      }, pageTransitionDuration);
    });
  });
};

const initPageTransition = () => {
  document.body.classList.add("page-transition-ready");

  if (prefersReducedMotion()) return;

  document.body.classList.add("page-transition-enter");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove("page-transition-enter");
    });
  });
};

// const hidePageLoader = () => {
//   if (!pageLoader || pageLoader.classList.contains("is-hidden")) return;
//   pageLoader.classList.add("is-hidden");
//   document.documentElement.classList.remove("loader-active");
//   document.body.classList.remove("loader-active");
//   const storedScrollY = Number(document.body.dataset.scrollY || "0");
//   document.body.style.top = "";
//   document.body.dataset.scrollY = "";
//   window.scrollTo(0, storedScrollY);
//   // After restoring scroll, honor any hash navigation (e.g. /index.html#about).
//   scrollToHashTarget();
//   const removeLoader = () => {
//     pageLoader.removeEventListener("transitionend", removeLoader);
//     if (pageLoader.parentElement) {
//       pageLoader.remove();
//     }
//   };
//   pageLoader.addEventListener("transitionend", removeLoader);
//   setTimeout(removeLoader, 5000);
// };

// window.addEventListener("load", () => {
//   setTimeout(hidePageLoader, 2000);
// });

document.addEventListener("DOMContentLoaded", () => {
  initPageTransition();
  gsap.registerPlugin(ScrollTrigger);
  initHeroHeaderAnimation(gsap);
  initAboutSectionAnimation(gsap, ScrollTrigger);
  initAboutGridAnimation(gsap, ScrollTrigger);
  initViewportVideoPlayback(ScrollTrigger);
  navbar();
  renderFinalCta();
  renderFooter();
  setupCrossPageHomeNavigation();
  window.addEventListener("hashchange", () => {
    scheduleHashScroll(window.location.hash);
  });
  const pendingHomeHash = isHomePage() ? consumePendingHomeHash() : "";
  const navbarEl = document.querySelector(".navbar");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const aboutSection = document.querySelector("#about");
  const buttonScrollToTeam = document.querySelector("#button-scroll-indicator");
  const footer = document.querySelector("#footer");
  const footerYear = document.querySelector("#footer-year");
  const scrollToTopButton = (() => {
    let existingButton = document.querySelector("#scroll-to-top");
    if (!existingButton) {
      existingButton = document.createElement("button");
      existingButton.type = "button";
      existingButton.id = "scroll-to-top";
      existingButton.className = "scroll-to-top";
      existingButton.setAttribute("aria-label", "Scroll to top");
      existingButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
      document.body.appendChild(existingButton);
    }
    return existingButton;
  })();

  const scrollTopTrigger = 220;

  const onScroll = () => {
    const currentScrollY = window.scrollY;

    if (navbarEl && currentScrollY > 50) {
      navbarEl.classList.add("navbar-scrolled");
    } else if (navbarEl) {
      navbarEl.classList.remove("navbar-scrolled");
    }

    if (scrollToTopButton) {
      if (currentScrollY > scrollTopTrigger) {
        scrollToTopButton.classList.add("is-visible");
      } else {
        scrollToTopButton.classList.remove("is-visible");
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Scroll to About section ----------
  if (scrollIndicator && aboutSection) {
    scrollIndicator.addEventListener("click", () => {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  // ---------- Scroll to Our Team section ----------
  if (buttonScrollToTeam && footer) {
    buttonScrollToTeam.addEventListener("click", () => {
      footer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------- Geriatric tabs fallback ----------
  const geriatricTabs = Array.from(
    document.querySelectorAll("#geriatricCareTabs [data-bs-target]"),
  );
  const geriatricTabContent = document.querySelector(
    "#geriatricCareTabsContent",
  );

  if (geriatricTabs.length && geriatricTabContent) {
    const geriatricPanes = Array.from(
      geriatricTabContent.querySelectorAll(".tab-pane"),
    );

    const activateGeriatricTab = (tabButton) => {
      const targetSelector = tabButton.getAttribute("data-bs-target");
      if (!targetSelector) return;

      const targetPane = geriatricTabContent.querySelector(targetSelector);
      if (!targetPane) return;

      geriatricTabs.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });

      geriatricPanes.forEach((pane) => {
        pane.classList.remove("show", "active");
      });

      tabButton.classList.add("active");
      tabButton.setAttribute("aria-selected", "true");
      targetPane.classList.add("show", "active");
    };

    geriatricTabs.forEach((tabButton) => {
      tabButton.addEventListener("click", () =>
        activateGeriatricTab(tabButton),
      );
    });
  }

  // ---------- Who section floating CTA ----------
  const whoServiceSection = document.querySelector(".who-service-for");
  const whoAssessmentCta = document.querySelector("#who-assessment-cta");

  if (whoServiceSection && whoAssessmentCta) {
    const whoSectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        whoAssessmentCta.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    whoSectionObserver.observe(whoServiceSection);

    whoAssessmentCta.addEventListener("click", () => {
      const assessmentTarget =
        document.querySelector("#appointment-form") ||
        document.querySelector("#footer");

      if (assessmentTarget) {
        assessmentTarget.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // ---------- Orthopedic pathway reveal ----------
  const pathwaySteps = Array.from(
    document.querySelectorAll(".orthopedic-pathway .pathway-step"),
  );

  if (pathwaySteps.length) {
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!shouldReduceMotion) {
      gsap.set(pathwaySteps, {
        autoAlpha: 0,
        y: 22,
        scale: 0.985,
      });

      gsap.to(pathwaySteps, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.58,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".orthopedic-pathway .pathway-track",
          start: "top 80%",
          once: true,
        },
      });
    } else {
      gsap.set(pathwaySteps, { clearProps: "all" });
    }
  }

  // ---------- Sports section reveal ----------
  const sportsRevealBlocks = Array.from(
    document.querySelectorAll(".sports-glm-reveal"),
  );

  if (sportsRevealBlocks.length) {
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!shouldReduceMotion) {
      sportsRevealBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 84%",
              once: true,
            },
          },
        );
      });
    } else {
      gsap.set(sportsRevealBlocks, { clearProps: "all" });
    }
  }

  // ---------- Appointment form validation ----------
  const appointmentForm = document.querySelector("#appointment-form");

  const setFieldState = (field, message) => {
    const errorEl = field ? document.querySelector(`#${field.id}-error`) : null;

    if (message) {
      field.classList.add("is-invalid");
      field.classList.remove("is-valid");
      field.setAttribute("aria-invalid", "true");
      if (errorEl) {
        errorEl.textContent = message;
      }
      return false;
    }

    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    field.removeAttribute("aria-invalid");
    if (errorEl) {
      errorEl.textContent = "";
    }
    return true;
  };

  const validateAppointmentField = (field) => {
    if (!field) return true;

    if (field.value.trim() === "") {
      return setFieldState(field, "This field is required.");
    }

    if (field.id === "appointment-email") {
      if (field.validity.typeMismatch) {
        return setFieldState(field, "Please enter a valid email address.");
      }
    }

    if (field.id === "appointment-name") {
      if (field.validity.patternMismatch || field.value.trim().length < 2) {
        return setFieldState(
          field,
          "Please enter a full name (letters, spaces, or .'- only).",
        );
      }
    }

    if (field.id === "appointment-phone") {
      if (field.validity.patternMismatch) {
        return setFieldState(
          field,
          "Use 7-20 characters: numbers, spaces, or + ( ) - .",
        );
      }
    }

    if (field.id === "appointment-service") {
      if (!field.value) {
        return setFieldState(field, "Please select a service.");
      }
    }

    return setFieldState(field, "");
  };

  if (appointmentForm) {
    const formFields = Array.from(
      appointmentForm.querySelectorAll("input, select"),
    );

    formFields.forEach((field) => {
      field.addEventListener("blur", () => validateAppointmentField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) {
          validateAppointmentField(field);
        }
      });
      field.addEventListener("change", () => {
        if (field.classList.contains("is-invalid")) {
          validateAppointmentField(field);
        }
      });
    });

    appointmentForm.addEventListener("submit", (event) => {
      let isValid = true;

      formFields.forEach((field) => {
        if (!validateAppointmentField(field)) {
          isValid = false;
        }
      });

      if (!isValid) {
        event.preventDefault();
        const firstInvalid = appointmentForm.querySelector(".is-invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  // lenis config

  lenisInstance = new Lenis();

  lenisInstance.on("scroll", (e) => {
    // console.log(e)
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  requestAnimationFrame(() => {
    const targetHash = pendingHomeHash || window.location.hash;

    if (!targetHash) return;

    if (pendingHomeHash) {
      window.history.replaceState(null, "", targetHash);
    }

    scheduleHashScroll(targetHash);
  });

  const swiper = new Swiper(".testimonials-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    a11y: {
      enabled: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 3,
      },
    },
  });
});
