// =========================================================
// Sushmitha Portfolio - JavaScript ES6+
// Features: theme switching, project filtering,
// form validation, dynamic year and back-to-top button.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");
  const backToTop = document.getElementById("backToTop");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  // Dynamic year
  year.textContent = new Date().getFullYear();

  // ---------------- Theme switching ----------------
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  root.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === "dark"
      ? '<i class="bi bi-moon-stars-fill"></i>'
      : '<i class="bi bi-sun-fill"></i>';
  }

  // ---------------- Project filtering ----------------
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-primary");
      });
      button.classList.add("active", "btn-primary");
      button.classList.remove("btn-outline-primary");

      projectItems.forEach((item) => {
        const category = item.dataset.category;
        item.classList.toggle("d-none", filter !== "all" && category !== filter);
      });
    });
  });

  // ---------------- Contact form validation ----------------
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [...contactForm.querySelectorAll("input, textarea")];
    let isValid = true;

    fields.forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");

      if (!field.checkValidity()) {
        field.classList.add("is-invalid");
        isValid = false;
      } else {
        field.classList.add("is-valid");
      }
    });

    formMessage.classList.remove("d-none", "alert-success", "alert-danger");

    if (!isValid) {
      formMessage.classList.add("alert-danger");
      formMessage.textContent = "Please correct the highlighted fields and try again.";
      return;
    }

    formMessage.classList.add("alert-success");
    formMessage.textContent = "Thank you! Your message has been validated successfully. This demo form does not send data to a server.";
    contactForm.reset();
    fields.forEach((field) => field.classList.remove("is-valid"));
  });

  // ---------------- Back to top ----------------
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 450);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------------- Accessible keyboard feedback ----------------
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (nav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
});
