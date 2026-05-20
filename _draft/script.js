(function () {
  var nav = document.getElementById("site-nav");
  var hamburger = document.getElementById("hamburger");
  var mobileNav = document.getElementById("mobile-nav");
  window.addEventListener(
    "scroll",
    function () {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true },
  );
  function openMenu() {
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("open");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", function () {
    mobileNav.classList.contains("open") ? closeMenu() : openMenu();
  });
  document.querySelectorAll(".mobile-nav-link").forEach(function (l) {
    l.addEventListener("click", closeMenu);
  });
  document
    .querySelector(".mobile-nav-cta-wrap a")
    .addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("open")) closeMenu();
  });
})();
(function () {
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = this.closest(".faq-item");
      var answer = item.querySelector(".faq-a");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = "0";
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        this.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
(function () {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  els.forEach(function (el) {
    io.observe(el);
  });
})();
(function () {
  var KEY = "fg_cookie_consent";
  var banner = document.getElementById("cookie-banner");
  if (!localStorage.getItem(KEY)) banner.style.display = "";
  document
    .getElementById("cookie-accept")
    .addEventListener("click", function () {
      localStorage.setItem(KEY, "accepted");
      banner.style.display = "none";
      gtag("event", "cookie_consent", {
        event_category: "consent",
        event_label: "accepted",
      });
    });
  document
    .getElementById("cookie-decline")
    .addEventListener("click", function () {
      localStorage.setItem(KEY, "declined");
      banner.style.display = "none";
      gtag("event", "cookie_consent", {
        event_category: "consent",
        event_label: "declined",
      });
    });
})();
