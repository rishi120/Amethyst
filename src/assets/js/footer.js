const servicePaths = () => {
  const [, serviceType] = window.location.pathname.split("/services/");
  return serviceType
    ? "../assets/images/long-banner.avif"
    : "./assets/images/long-banner.avif";
};

const clinicLocations = [
  {
    label: "Andheri West Clinic",
    address:
      "Samrock Apt, 302B, CD Barfiwala Road, Zalawad Nagar, Shree Ram Nagar, Andheri West, Mumbai, Maharashtra 400058",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Samrock%20Apt%2C%20302B%2C%20CD%20Barfiwala%20Road%2C%20Zalawad%20Nagar%2C%20Shree%20Ram%20Nagar%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400058",
  },
  {
    label: "Andheri East Clinic",
    address:
      "Sunteck Crest, Near Airport road metro, behind Mukund Hospital, Andheri East, Mumbai, Maharashtra 400059",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sunteck%20Crest%2C%20Near%20Airport%20road%20metro%2C%20behind%20Mukund%20Hospital%2C%20Andheri%20East%2C%20Mumbai%2C%20Maharashtra%20400059",
  },
];

const renderLocationCards = () =>
  clinicLocations
    .map(
      (location) => `
                  <div class="col-md-6">
                    <article class="clinic-location-card">
                      <div class="clinic-location-header">
                        <i class="bi bi-geo-alt-fill" aria-hidden="true"></i>
                        <div>
                          <span class="clinic-location-label">${location.label}</span>
                          <address>${location.address}</address>
                        </div>
                      </div>
                      <a
                        class="clinic-location-link"
                        href="${location.mapsUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open ${location.label} in Google Maps"
                      >
                        View on map
                      </a>
                    </article>
                  </div>`,
    )
    .join("");

const renderFooter = () => {
  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = `  <div class="container">
          <div class="cta-img-wrapper">
            <img
              src="${servicePaths()}"
              class="img-fluid cta-img"
              alt="footer banner"
            />

            <!-- overlay -->
            <div class="cta-overlay"></div>

            <!-- content -->
            <div class="cta-content row align-items-center">
              <!-- Left: Text -->
              <div class="col-md-8 cta-text">
                <h2>Ready to Start Your Recovery Journey?</h2>
                <p>
                  Don't let pain hold you back. Contact us today to book an
                  appointment and take the first step toward a pain-free, active
                  life.
                </p>
                <div class="address-wrapper">
                  <h5>Visit Our Clinics in Mumbai</h5>
                  <p class="address-intro">
                    Choose the branch that is most convenient for you.
                  </p>
                  <div class="row clinic-location-list">
                    ${renderLocationCards()}
                  </div>
                </div>
              </div>

              <!-- Right: Form -->
              <div class="col-md-4">
                <form class="cta-form" id="appointment-form" novalidate action="https://formspree.io/f/mlgvjngv" method="POST">
                  <div class="mb-3">
                    <input
                      type="email"
                      id="appointment-email"
                      name="email"
                      class="form-control"
                      data-fs-field
                      placeholder="Email Address"
                      autocomplete="email"
                      aria-describedby="appointment-email-error"
                      required
                    />
                    <div class="form-error" id="appointment-email-error" data-fs-error="email"></div>
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      id="appointment-name"
                      name="full-name"
                      class="form-control"
                      data-fs-field
                      placeholder="Full Name"
                      autocomplete="name"
                      minlength="2"
                      maxlength="50"
                      pattern="^[A-Za-z][A-Za-z\\s.'-]{1,49}$"
                      aria-describedby="appointment-name-error"
                      required
                    />
                    <div class="form-error" id="appointment-name-error" data-fs-error="full-name"></div>
                  </div>

                  <div class="mb-3">
                    <input
                      type="tel"
                      id="appointment-phone"
                      name="phone"
                      class="form-control"
                      data-fs-field
                      placeholder="Phone Number"
                      autocomplete="tel"
                      inputmode="tel"
                      minlength="7"
                      maxlength="20"
                      pattern="^\\+?[\\d\\s().-]{7,20}$"
                      aria-describedby="appointment-phone-error"
                      required
                    />
                    <div class="form-error" id="appointment-phone-error" data-fs-error="phone"></div>
                  </div>

                  <div class="mb-3">
                    <select
                      class="form-select"
                      id="appointment-service"
                      name="service"
                      data-fs-field
                      aria-describedby="appointment-service-error"
                      required
                    >
                      <option value="" selected disabled>Select Service</option>
                      <option>Orthopedic Physiotherapy</option>
                      <option>Sports Physiotherapy</option>
                      <option>Neuro Physiotherapy</option>
                      <option>Geriatric Physiotherapy</option>
                      <option>Pediatric Physiotherapy</option>
                      <option>Cardiopulmonary Physiotherapy</option>
                    </select>
                    <div
                      class="form-error"
                      id="appointment-service-error"
                      data-fs-error="service"
                    ></div>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary-custom w-100"
                    data-fs-submit-btn
                  >
                    Book Appointment
                  </button>
                  <div
                    class="form-status form-status-error"
                    id="appointment-form-error"
                    data-fs-error
                    role="alert"
                    aria-live="polite"
                  ></div>
                  <div
                    class="form-status form-status-success"
                    id="appointment-form-success"
                    data-fs-success
                    role="status"
                    aria-live="polite"
                  ></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-6 text-center text-md-start">
                <p class="mb-0">
                  &copy; <span id="footer-year"></span> Amethyst Physiotherapy & Rehabilitation Services.
                </p>
                <div class="social-media-wrapper">
                  <ul>
                    <li>
                      <a
                        href="https://www.instagram.com/amethystphysiotherapy/"
                        target="_blank"
                        ><i class="bi bi-instagram"></i
                      ></a>
                    </li>
                    <li>
                      <a href="#" target="_blank"
                        ><i class="bi bi-linkedin"></i
                      ></a>
                    </li>
                    <li>
                      <a href="#" target="_blank"
                        ><i class="bi bi-facebook"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6 text-center text-md-end">
                <p class="mb-0 creator-name">
                  Created by
                  <a href="https://chandanbaruah.com/" target="_blank"
                    >Chandan Baruah</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>`;
  }
};

export default renderFooter;
