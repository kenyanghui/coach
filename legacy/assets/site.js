/* 正行明熙 · 子页面共享交互：导航折叠 + 揭示动画 */
(function () {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? '关闭导航' : '打开导航');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', '打开导航');
      });
    });
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.card, .step, .spec, .fit-card, .resource-card, .reveal').forEach(function (el, index) {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', String(Math.min(index % 6, 5) * 70) + 'ms');
      revealObserver.observe(el);
    });
  }
})();
