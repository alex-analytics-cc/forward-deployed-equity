/* Forward Deployed Equity — light interactions only */
(function () {
  'use strict';

  // Year stamp in footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Masthead — toggle bottom rule once the page has scrolled
  var mast = document.querySelector('.masthead');
  if (mast) {
    var onScroll = function () {
      if (window.scrollY > 12) mast.classList.add('is-scrolled');
      else mast.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Reveal-on-scroll for major blocks
  var revealTargets = document.querySelectorAll(
    '.section h2.display, .section .prose, .pillars li, .fit-card, .about__card, .hub, .contact, .hero__rail, .hero__lede'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Smooth-scroll active section highlight in the nav (light touch)
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');
  var sections = Array.prototype.map.call(navLinks, function (l) {
    var id = l.getAttribute('href').slice(1);
    return document.getElementById(id);
  }).filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--accent)';
          } else {
            a.style.color = '';
          }
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
