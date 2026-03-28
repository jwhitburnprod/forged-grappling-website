// ── Cookie banner ──
(function() {
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.style.display = 'none';
  banner.innerHTML =
    '<div id="cookie-banner-inner">' +
      '<div id="cookie-banner-text">' +
        '<p id="cookie-banner-title">We use cookies</p>' +
        '<p id="cookie-banner-body">We use essential cookies to make this site work. We\'d also like to set analytics cookies to help us understand how you use it — these will only be set with your consent. <a href="/cookies">Cookie Policy</a> · <a href="/privacy">Privacy Policy</a></p>' +
      '</div>' +
      '<div id="cookie-banner-actions">' +
        '<button id="cookie-decline" onclick="cookieChoice(false)">Decline analytics</button>' +
        '<button id="cookie-accept" onclick="cookieChoice(true)">Accept all</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(banner);

  var consent = localStorage.getItem('fg_cookie_consent');
  if (consent === 'accepted') {
    loadAnalytics();
  } else if (!consent) {
    banner.style.display = 'block';
  }
})();

function cookieChoice(accepted) {
  document.getElementById('cookie-banner').style.display = 'none';
  if (accepted) {
    localStorage.setItem('fg_cookie_consent', 'accepted');
    loadAnalytics();
  } else {
    localStorage.setItem('fg_cookie_consent', 'declined');
  }
}

function loadAnalytics() {
  var gaId = 'G-KMVGE5L8JL';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', gaId);
}

function toggleMobileNav() {
  var btn = document.querySelector('.nav-hamburger');
  var nav = document.getElementById('mobile-nav');
  var isOpen = nav.classList.contains('open');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}
function closeMobileNav() {
  document.querySelector('.nav-hamburger').classList.remove('open');
  document.getElementById('mobile-nav').classList.remove('open');
  document.querySelector('.nav-hamburger').setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
