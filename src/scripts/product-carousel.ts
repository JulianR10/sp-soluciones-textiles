function initProductCarousel(): void {
  const track = document.getElementById('product-track');
  const prev = document.getElementById('product-prev');
  const next = document.getElementById('product-next');
  if (!track || !prev || !next) return;

  prev.addEventListener('click', () => {
    const t = document.getElementById('product-track');
    if (!t) return;
    const card = t.querySelector('.product-snap');
    if (!(card instanceof HTMLElement)) return;
    t.scrollBy({ left: -(card.offsetWidth + 16), behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    const t = document.getElementById('product-track');
    if (!t) return;
    const card = t.querySelector('.product-snap');
    if (!(card instanceof HTMLElement)) return;
    t.scrollBy({ left: card.offsetWidth + 16, behavior: 'smooth' });
  });
}

initProductCarousel();
