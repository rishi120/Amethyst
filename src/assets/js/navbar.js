const navbar = () => {
  const navbarEl = document.querySelector("#navbar");

  if (!navbarEl) return;

  const path = window.location.pathname.replace(/\\/g, "/");
  const isServicesPage = path.includes("/services/");
  const homeUrl = isServicesPage ? "../index.html" : "#";
  const aboutUrl = isServicesPage ? "../index.html#about" : "#about";
  const servicesUrl = isServicesPage
    ? "../index.html#expertise"
    : "#expertise";
  const contactUrl = isServicesPage ? "../index.html#footer" : "#footer";

  navbarEl.innerHTML = `
    <div class="container">
      <a class="navbar-brand custom-navbar-brand" href="${homeUrl}">Amethyst</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse custom-navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="${homeUrl}">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${aboutUrl}">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${servicesUrl}">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${contactUrl}">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  `;
};

export default navbar;
