document.addEventListener('DOMContentLoaded', () => {
  const imgs = Array.from(document.querySelectorAll('.gallery-grid img'));
  if (!imgs.length) return;

  // Create lightbox elements
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <div class="lb-content">
      <button class="lb-close" aria-label="Fermer">×</button>
      <button class="lb-prev" aria-label="Précédent">‹</button>
      <img class="lb-image" src="" alt="">
      <button class="lb-next" aria-label="Suivant">›</button>
      <div class="lb-caption"></div>
    </div>
  `;
  document.body.appendChild(lb);

  const lbImage = lb.querySelector('.lb-image');
  const lbCaption = lb.querySelector('.lb-caption');
  const btnClose = lb.querySelector('.lb-close');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');

  let current = 0;

  function open(index) {
    current = index;
    const img = imgs[current];
    lbImage.src = img.src;
    lbImage.alt = img.alt || '';
    lbCaption.textContent = img.nextElementSibling ? img.nextElementSibling.textContent : '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function next() { open((current + 1) % imgs.length); }
  function prev() { open((current - 1 + imgs.length) % imgs.length); }

  imgs.forEach((img, i) => {
    img.addEventListener('click', () => open(i));
  });

  btnClose.addEventListener('click', close);
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // Click outside to close
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
});
