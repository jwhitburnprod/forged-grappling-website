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
