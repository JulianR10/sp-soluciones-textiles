import { getEl, queryAll } from './types';

function initHeader(): void {
  const btn = getEl<HTMLButtonElement>('menu-btn');
  const menu = getEl<HTMLElement>('mobile-menu');
  const overlay = getEl<HTMLElement>('menu-overlay');
  const drawerClose = getEl<HTMLElement>('drawer-close');
  const hamburger = getEl<HTMLElement>('menu-icon');
  const close = getEl<HTMLElement>('close-icon');
  const headerLine = getEl<HTMLElement>('header-line');

  if (!btn || !menu || !overlay || !drawerClose || !hamburger || !close || !headerLine) return;

  const openMenu = (): void => {
    menu.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    hamburger.classList.add('hidden');
    close.classList.remove('hidden');
    btn.classList.add('text-brand', 'border-brand/60');
    headerLine.classList.remove('w-0');
    headerLine.classList.add('w-full');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = (): void => {
    menu.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    hamburger.classList.remove('hidden');
    close.classList.add('hidden');
    btn.classList.remove('text-brand', 'border-brand/60');
    headerLine.classList.remove('w-full');
    headerLine.classList.add('w-0');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => {
    if (menu.classList.contains('translate-x-full')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);
  drawerClose.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });

  // Active nav highlight
  const navLinks = queryAll('[data-nav]');
  const sections: Array<{ link: Element; section: HTMLElement }> = [];

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      const section = document.getElementById(href.slice(1));
      if (section) sections.push({ link, section });
    }
  });

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => {
            l.classList.remove('active');
          });
          const active = sections.find((s) => s.section === entry.target);
          if (active) active.link.classList.add('active');
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px 0px -20% 0px',
    },
  );

  sections.forEach(({ section }) => {
    navObserver.observe(section);
  });
}

initHeader();
