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
  var featToggle = document.querySelector(".pricing-features-toggle");
  if (featToggle) {
    featToggle.addEventListener("click", function () {
      var expanded = this.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".pricing-feat-extra").forEach(function (el) {
        el.classList.toggle("visible", !expanded);
      });
      this.setAttribute("aria-expanded", String(!expanded));
      this.textContent = expanded ? "+ 4 more included features" : "− Show fewer features";
    });
  }
  var menuToggle = document.querySelector(".pricing-menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      var expanded = this.getAttribute("aria-expanded") === "true";
      var body = this.closest(".pricing-menu").querySelector(".pricing-menu-body");
      body.classList.toggle("visible", !expanded);
      this.setAttribute("aria-expanded", String(!expanded));
    });
  }
})();
(function () {
  var target = new Date("2026-06-01T17:00:00Z"); /* 6pm BST = 17:00 UTC */
  var dEl = document.getElementById("cd-days");
  var hEl = document.getElementById("cd-hours");
  var mEl = document.getElementById("cd-mins");
  var sEl = document.getElementById("cd-secs");
  if (!dEl) return;
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    var diff = target - new Date();
    if (diff <= 0) {
      dEl.textContent = "0"; hEl.textContent = "00"; mEl.textContent = "00"; sEl.textContent = "00";
      return;
    }
    dEl.textContent = Math.floor(diff / 86400000);
    hEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    mEl.textContent = pad(Math.floor((diff % 3600000) / 60000));
    sEl.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tick();
  setInterval(tick, 1000);
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
