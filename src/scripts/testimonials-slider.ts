import { getEl } from './types';

function initTestimonialsSlider(): void {
  const container = getEl('testimonios-slider');
  if (!container) return;

  const slides = container.querySelectorAll<HTMLElement>('.testimonio-slide');
  const dots = container.querySelectorAll<HTMLElement>('.testimonio-dot');
  const btnPrev = getEl<HTMLButtonElement>('test-slider-prev');
  const btnNext = getEl<HTMLButtonElement>('test-slider-next');
  let current = 0;
  let timer: ReturnType<typeof setInterval> | null = null;

  function goTo(index: number): void {
    slides.forEach((s) => {
      s.classList.remove('opacity-100', 'pointer-events-auto');
      s.classList.add('opacity-0', 'pointer-events-none');
    });
    dots.forEach((d) => {
      const dot = d.querySelector('span');
      if (dot) {
        dot.classList.remove('bg-brand');
        dot.classList.add('bg-brand/30');
      }
    });

    slides[index].classList.remove('opacity-0', 'pointer-events-none');
    slides[index].classList.add('opacity-100', 'pointer-events-auto');
    const activeDot = dots[index].querySelector('span');
    if (activeDot) {
      activeDot.classList.remove('bg-brand/30');
      activeDot.classList.add('bg-brand');
    }
    current = index;
    resetTimer();
  }

  function next(): void {
    goTo((current + 1) % slides.length);
  }

  function prev(): void {
    goTo((current - 1 + slides.length) % slides.length);
  }

  function resetTimer(): void {
    if (timer) clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.slide));
    });
  });

  if (btnNext) btnNext.addEventListener('click', next);
  if (btnPrev) btnPrev.addEventListener('click', prev);

  // touch swipe
  (() => {
    let x0 = 0;
    const track = getEl('test-slides-track') || container;
    track.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        x0 = e.changedTouches[0].screenX;
      },
      { passive: true },
    );
    track.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        const dx = e.changedTouches[0].screenX - x0;
        if (Math.abs(dx) < 50) return;
        if (dx < 0) next();
        else prev();
      },
      { passive: true },
    );
  })();

  // keyboard
  document.addEventListener('keydown', (e) => {
    const rect = container.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  goTo(0);
}

initTestimonialsSlider();
