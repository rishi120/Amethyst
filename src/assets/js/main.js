document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const aboutSection = document.querySelector("#about");
  const buttonScrollToTeam = document.querySelector("#button-scroll-indicator");
  const ourTeamSection = document.querySelector("#team");

  let lastScrollY = 0;

  const onScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
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
  if (buttonScrollToTeam && ourTeamSection) {
    buttonScrollToTeam.addEventListener("click", () => {
      console.log("Button clicked");
      ourTeamSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
});
