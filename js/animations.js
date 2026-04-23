(function () {
  'use strict';

  var STAGGER_MS = 80;
  var THRESHOLD  = 0.05;

  /* ── Group elements by their immediate parent ────────────────────────── */
  function groupByParent(elements) {
    var map = new Map();
    elements.forEach(function (el) {
      var p = el.parentElement;
      if (!map.has(p)) map.set(p, []);
      map.get(p).push(el);
    });
    return map;
  }

  /* ── Pre-stamp stagger delays on siblings ────────────────────────────── */
  function stampDelays(siblings) {
    siblings.forEach(function (el, i) {
      el.style.transitionDelay = (i * STAGGER_MS) + 'ms';
    });
  }

  function init() {
    /* ── New .animate-on-scroll system ─────────────────────────────────── */
    var animEls = Array.from(document.querySelectorAll('.animate-on-scroll'));

    if (animEls.length) {
      /* Apply per-sibling stagger delays upfront */
      groupByParent(animEls).forEach(function (siblings) {
        if (siblings.length > 1) stampDelays(siblings);
      });

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: THRESHOLD });

      animEls.forEach(function (el) { observer.observe(el); });
    }

    /* ── Legacy .fade-up system (backward-compatible) ───────────────────── */
    var fadeEls = Array.from(document.querySelectorAll('.fade-up'));

    if (fadeEls.length) {
      var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: THRESHOLD });

      fadeEls.forEach(function (el) { fadeObserver.observe(el); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
