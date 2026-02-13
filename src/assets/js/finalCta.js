const finalCta = document.getElementById("renderFinalCta");

const ctaContentByRoute = {
  orthopedic: {
    eyebrow: "Ready to start?",
    title: "Start your orthopedic recovery with a plan built for your stage",
    description:
      "Share your pain points, movement limits, and daily goals. We will design a focused rehab roadmap to reduce pain and restore function safely.",
    primaryLabel: "Book orthopedic consult",
  },
  sports: {
    eyebrow: "Ready to start?",
    title: "Get a focused sports recovery plan in your first visit",
    description:
      "Tell us your sport, injury history, and timeline. We will map the next best steps for recovery and return-to-performance.",
    primaryLabel: "Book sports consult",
  },
  neuro: {
    eyebrow: "Ready to start?",
    title: "Begin neuro rehabilitation with clear, step-by-step support",
    description:
      "We assess movement, balance, coordination, and daily function to create a practical plan that improves confidence and independence.",
    primaryLabel: "Book neuro consult",
  },
  geriatric: {
    eyebrow: "Ready to start?",
    title: "Support healthy aging with a personalized mobility plan",
    description:
      "From balance training to strength and fall-risk reduction, we build a safe and progressive program for long-term independence.",
    primaryLabel: "Book geriatric consult",
  },
  default: {
    eyebrow: "Ready to start?",
    title: "Book your physiotherapy consultation today",
    description:
      "Tell us what you are dealing with and we will guide you toward the right treatment pathway for your needs.",
    primaryLabel: "Book consultation",
  },
};

const getServiceFromPath = () => {
  const fileName = window.location.pathname.split("/").pop() || "";
  const routeKey = fileName.replace(".html", "").toLowerCase();
  return ctaContentByRoute[routeKey] ? routeKey : "default";
};

const renderFinalCta = () => {
  if (finalCta) {
    const routeKey = getServiceFromPath();
    const ctaContent = ctaContentByRoute[routeKey];

    finalCta.innerHTML = `
     <div class="container">
          <div class="sports-final-cta-card">
            <p class="eyebrow">${ctaContent.eyebrow}</p>
            <h2>${ctaContent.title}</h2>
            <p>
              ${ctaContent.description}
            </p>
            <div class="cta-actions">
              <a href="#footer" class="btn btn-dark">${ctaContent.primaryLabel}</a>
              <a href="tel:+10000000000" class="btn btn-outline-dark"
                >Call clinic</a
              >
            </div>
          </div>
        </div>
    `;
  }
};

export default renderFinalCta;
