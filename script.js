/**
 * Real Adventures – minimal JS for stats and smooth UX
 */

(function () {
  // Optional: animate stat numbers on scroll into view
  var statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var value = parseInt(el.getAttribute('data-value'), 10);
        if (isNaN(value) || el.dataset.animated === 'true') return;
        el.dataset.animated = 'true';
        animateValue(el, 0, value, 800);
      });
    },
    { threshold: 0.3, rootMargin: '0px' }
  );

  statNumbers.forEach(function (el) {
    observer.observe(el);
  });

  function animateValue(element, start, end, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 2);
      var current = Math.floor(start + (end - start) * easeOut);
      element.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    }
    requestAnimationFrame(step);
  }
})();
