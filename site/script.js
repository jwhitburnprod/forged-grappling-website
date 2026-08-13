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
    // Start the reveal 200px before the element scrolls into view so
    // nothing visibly pops in at the screen edge.
    { rootMargin: "0px 0px 200px 0px", threshold: 0 },
  );
  els.forEach(function (el) {
    io.observe(el);
  });
})();
function loadAnalytics() {
  if (window.dataLayer) return;
  var gaId = "G-KMVGE5L8JL";
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + gaId;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    dataLayer.push(arguments);
  };
  gtag("js", new Date());
  gtag("config", gaId);
}
(function () {
  var KEY = "fg_cookie_consent";
  var banner = document.getElementById("cookie-banner");
  if (localStorage.getItem(KEY) === "accepted") {
    loadAnalytics();
  } else if (!localStorage.getItem(KEY)) {
    banner.style.display = "";
  }
  document
    .getElementById("cookie-accept")
    .addEventListener("click", function () {
      localStorage.setItem(KEY, "accepted");
      banner.style.display = "none";
      loadAnalytics();
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
    });
})();
(function () {
  // Sticky trial bar: hidden while the hero (with its own CTA) is on screen,
  // slides in once the visitor scrolls past it. Stays gone after dismissal.
  var bar = document.getElementById("stickyTrial");
  var hero = document.getElementById("hero");
  if (!bar || !hero || !("IntersectionObserver" in window)) return;
  var dismissed = false;
  bar.querySelector(".sticky-trial-close").addEventListener("click", function () {
    dismissed = true;
    bar.classList.add("sticky-trial--hidden");
  });
  var io = new IntersectionObserver(function (entries) {
    if (dismissed) return;
    bar.classList.toggle("sticky-trial--hidden", entries[0].isIntersecting);
  });
  io.observe(hero);
})();
(function () {
  document.querySelectorAll("a[data-cta]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (typeof gtag !== "function") return;
      gtag("event", "cta_click", {
        event_category: "trial_cta",
        event_label: a.getAttribute("data-cta"),
      });
    });
  });
})();
