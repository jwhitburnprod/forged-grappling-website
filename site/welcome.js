/* Welcome pages: shared behaviour.
   1. Fills the page's placeholders from welcome-config.js plus the page's own
      window.WELCOME_PAGE block.
   2. Draws the timetable.
   3. Trims the cookie banner wording (the Meta Pixel loads on accept).
   4. Loads the Meta Pixel after consent and fires this page's one event,
      once per visit.
   Load order: welcome-config.js, shared.js, welcome.js. */
(function () {
  var cfg = {};
  [window.WELCOME || {}, window.WELCOME_PAGE || {}].forEach(function (src) {
    for (var k in src) if (Object.prototype.hasOwnProperty.call(src, k)) cfg[k] = src[k];
  });

  var unfilled = [];
  function isPlaceholder(v) { return typeof v === "string" && /^\[[A-Z0-9_]+\]$/.test(v); }
  function val(key) {
    var v = cfg[key];
    if (v === undefined || v === null || v === "") v = "[" + key + "]";
    if (isPlaceholder(v) && unfilled.indexOf(key) === -1) unfilled.push(key);
    return v;
  }

  /* ─── 1. PLACEHOLDERS ─── */
  [].forEach.call(document.querySelectorAll("[data-cfg]"), function (el) {
    el.textContent = val(el.getAttribute("data-cfg"));
  });

  [].forEach.call(document.querySelectorAll("[data-cfg-href]"), function (el) {
    var v = val(el.getAttribute("data-cfg-href"));
    var scheme = el.getAttribute("data-scheme") || "";
    if (isPlaceholder(v)) { el.setAttribute("href", "#"); return; }
    if (scheme === "tel:") v = v.replace(/\s+/g, "");
    el.setAttribute("href", scheme + v);
  });

  [].forEach.call(document.querySelectorAll("[data-map]"), function (el) {
    el.setAttribute(
      "href",
      "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("Forged Grappling, " + val("ADDRESS"))
    );
  });

  /* ─── 2. TIMETABLE ─── */
  [].forEach.call(document.querySelectorAll("[data-timetable]"), function (mount) {
    (cfg.TIMETABLE || []).forEach(function (s) {
      var row = document.createElement("div");
      row.className = "wl-slot";

      var when = document.createElement("div");
      when.className = "wl-slot-when";
      var days = document.createElement("span");
      days.textContent = s.days;
      var time = document.createElement("strong");
      time.textContent = s.time;
      when.appendChild(days);
      when.appendChild(time);

      var what = document.createElement("div");
      var h = document.createElement("h3");
      h.textContent = s.name;
      var p = document.createElement("p");
      p.textContent = s.desc;
      what.appendChild(h);
      what.appendChild(p);

      row.appendChild(when);
      row.appendChild(what);
      mount.appendChild(row);
    });
  });

  if (unfilled.length && window.console) {
    console.warn("Welcome page: placeholders still to fill: " + unfilled.join(", "));
  }

  /* ─── 3. COOKIE BANNER WORDING ───
     Same trim as /free-trial/. The pixel loads on accept, which the
     site-wide wording does not mention. */
  (function () {
    var body = document.getElementById("cookie-banner-body");
    if (!body) return;
    body.innerHTML =
      'Cookies help us measure traffic and ads. ' +
      '<a href="/cookies/" target="_blank" rel="noopener">Cookie policy</a>';
    var d = document.getElementById("cookie-decline");
    if (d) d.textContent = "Decline";
    var a = document.getElementById("cookie-accept");
    if (a) a.textContent = "Accept";
  })();

  /* ─── 4. META PIXEL + THE PAGE'S EVENT ───
     The pixel only loads once cookies are accepted (same rule as
     /free-trial/). The event goes out straight after it loads, guarded by
     sessionStorage so a refresh in the same visit does not count twice.
     Declined or undecided visitors send nothing. */
  var firedThisLoad = false;

  function hasConsent() {
    try { return localStorage.getItem("fg_cookie_consent") === "accepted"; }
    catch (e) { return false; }
  }

  function fireOnce() {
    var ev = cfg.PIXEL_EVENT;
    if (!ev || !window.fbq || firedThisLoad) return;
    var key = "fg_welcome_fired:" + ev + ":" + location.pathname;
    try { if (sessionStorage.getItem(key)) return; } catch (e) {}
    firedThisLoad = true;
    window.fbq("track", ev);
    try { sessionStorage.setItem(key, "1"); } catch (e) {}
  }

  function loadPixel() {
    if (!cfg.META_PIXEL_ID || window.fbq) return;
    /* Standard Meta base code */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq("init", cfg.META_PIXEL_ID);
    window.fbq("track", "PageView");
    fireOnce();
  }

  function start() {
    if (!hasConsent()) return;
    loadPixel();
  }

  start();
  /* shared.js writes consent on click, so re-check just after. */
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "cookie-accept") setTimeout(start, 60);
  });
})();
