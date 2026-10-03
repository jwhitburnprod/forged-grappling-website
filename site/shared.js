// ── Cookie banner ──
(function() {
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.style.display = 'none';
  banner.innerHTML =
    '<div id="cookie-banner-inner">' +
      '<div id="cookie-banner-text">' +
        '<p id="cookie-banner-title">We use cookies</p>' +
        '<p id="cookie-banner-body">We use essential cookies to make this site work. We\'d also like to set analytics cookies to help us understand how you use it — these will only be set with your consent. <a href="/cookies/">Cookie Policy</a> · <a href="/privacy/">Privacy Policy</a></p>' +
      '</div>' +
      '<div id="cookie-banner-actions">' +
        '<button id="cookie-decline" onclick="cookieChoice(false)">Decline analytics</button>' +
        '<button id="cookie-accept" onclick="cookieChoice(true)">Accept all</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(banner);

  // The Google tag is in each page's <head> with consent denied by default; an earlier
  // "accepted" choice is re-applied there, so the banner only needs to show when undecided.
  if (!localStorage.getItem('fg_cookie_consent')) {
    banner.style.display = 'block';
  }
})();

function cookieChoice(accepted) {
  document.getElementById('cookie-banner').style.display = 'none';
  if (accepted) {
    localStorage.setItem('fg_cookie_consent', 'accepted');
    if (window.fgGrantConsent) window.fgGrantConsent();
  } else {
    localStorage.setItem('fg_cookie_consent', 'declined');
  }
}

function toggleMobileNav() {
  var btn = document.querySelector('.nav-hamburger');
  var nav = document.getElementById('mobile-nav');
  var isOpen = nav.classList.contains('open');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
  btn.setAttribute('aria-expanded', !isOpen);
  btn.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}
function closeMobileNav() {
  var btn = document.querySelector('.nav-hamburger');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open navigation');
  document.getElementById('mobile-nav').classList.remove('open');
  document.body.style.overflow = '';
}
