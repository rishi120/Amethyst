const servicePaths = () => {
  const [, serviceType] = window.location.pathname.split("/services/");
  return serviceType
    ? `../assets/images/long-banner.avif`
    : "./assets/images/long-banner.avif";
};

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
                  Don’t let pain hold you back. Contact us today to book an
                  appointment and take the first step toward a pain-free, active
                  life.
                </p>
                <div class="address-wrapper">
                <h5>Amethyst Physiotherapy & Rehabilitation Services</h5>
                <ul>
                <li><i class="bi bi-geo-alt"></i> 123 Wellness Street, Cityville</li>
                <li><i class="bi bi-telephone"></i> (123) 456-7890</li>
                <li><i class="bi bi-envelope"></i> <a href="mailto:info@amethystphysio.com">info@amethystphysio.com</a></li>
                </ul>
                </div>
              </div>

              <!-- Right: Form -->
              <div class="col-md-4">
                <form class="cta-form" id="appointment-form" novalidate>
                  <div class="mb-3">
                    <input
                      type="email"
                      id="appointment-email"
                      name="email"
                      class="form-control"
                      placeholder="Email Address"
                      autocomplete="email"
                      aria-describedby="appointment-email-error"
                      required
                    />
                    <div class="form-error" id="appointment-email-error"></div>
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      id="appointment-name"
                      name="full-name"
                      class="form-control"
                      placeholder="Full Name"
                      autocomplete="name"
                      minlength="2"
                      maxlength="50"
                      pattern="^[A-Za-z][A-Za-z\s.'-]{1,49}$"
                      aria-describedby="appointment-name-error"
                      required
                    />
                    <div class="form-error" id="appointment-name-error"></div>
                  </div>

                  <div class="mb-3">
                    <input
                      type="tel"
                      id="appointment-phone"
                      name="phone"
                      class="form-control"
                      placeholder="Phone Number"
                      autocomplete="tel"
                      inputmode="tel"
                      minlength="7"
                      maxlength="20"
                      pattern="^\+?[\d\s().-]{7,20}$"
                      aria-describedby="appointment-phone-error"
                      required
                    />
                    <div class="form-error" id="appointment-phone-error"></div>
                  </div>

                  <div class="mb-3">
                    <select
                      class="form-select"
                      id="appointment-service"
                      name="service"
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
                    ></div>
                  </div>

                  <button type="submit" class="btn btn-primary-custom w-100">
                    Book Appointment
                  </button>
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
                  &copy; <span id="footer-year"></span> Amethyst Physiotherapy.
                  All rights reserved.
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
