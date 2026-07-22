document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.site-header').forEach((header) => {
    const toggle = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.main-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('is-nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      nav.classList.toggle('is-open', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 720) {
          header.classList.remove('is-nav-open');
          toggle.setAttribute('aria-expanded', 'false');
          nav.classList.remove('is-open');
        }
      });
    });
  });
});
