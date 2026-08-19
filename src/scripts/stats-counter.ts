import { getEl, queryAll } from './types';

function initStatsCounter(): void {
  const statsSection = getEl('estadisticas');
  if (!statsSection) return;

  const counters = queryAll<HTMLElement>('[data-count]');
  let countersAnimated = false;

  function animateCounters(): void {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);
      const duration = Math.min(target * 20, 2000);
      const start = performance.now();

      function update(now: number): void {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        const current = Math.floor(eased * target);
        counter.textContent = String(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = String(target);
        }
      }

      requestAnimationFrame(update);
    });
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 },
  );

  counterObserver.observe(statsSection);
}

initStatsCounter();
