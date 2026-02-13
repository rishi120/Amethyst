import navbar from "../../assets/js/navbar.js";
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.7/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.7/ScrollTrigger/+esm";

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

const scrollToHashTarget = () => {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const hidePageLoader = () => {
  if (!pageLoader || pageLoader.classList.contains("is-hidden")) return;
  pageLoader.classList.add("is-hidden");
  document.documentElement.classList.remove("loader-active");
  document.body.classList.remove("loader-active");
  const storedScrollY = Number(document.body.dataset.scrollY || "0");
  document.body.style.top = "";
  document.body.dataset.scrollY = "";
  window.scrollTo(0, storedScrollY);
  // After restoring scroll, honor any hash navigation (e.g. /index.html#about).
  scrollToHashTarget();
  const removeLoader = () => {
    pageLoader.removeEventListener("transitionend", removeLoader);
    if (pageLoader.parentElement) {
      pageLoader.remove();
    }
  };
  pageLoader.addEventListener("transitionend", removeLoader);
  setTimeout(removeLoader, 5000);
};

window.addEventListener("load", () => {
  setTimeout(hidePageLoader, 2000);
});
import renderFooter from "./footer.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  navbar();
  renderFooter();
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

  let lastScrollY = 0;
  const scrollTopTrigger = 220;

  const onScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      navbarEl.classList.add("navbar-scrolled");
    } else {
      navbarEl.classList.remove("navbar-scrolled");
    }

    if (scrollToTopButton) {
      if (currentScrollY > scrollTopTrigger) {
        scrollToTopButton.classList.add("is-visible");
      } else {
        scrollToTopButton.classList.remove("is-visible");
      }
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", onScroll, { passive: true });

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

  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    // console.log(e)
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

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
