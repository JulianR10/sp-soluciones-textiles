import { queryAll } from './types';

function initScrollReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.13 },
  );

  queryAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
}

initScrollReveal();
