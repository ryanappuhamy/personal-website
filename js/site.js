(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pill nav: sliding indicator under the active link. On the home page the
  // active link follows the section in view; elsewhere it is aria-current="page".
  var nav = document.querySelector(".pill-nav");
  if (nav) {
    var pill = nav.querySelector(".pill-nav__indicator");
    var links = Array.prototype.slice.call(nav.querySelectorAll("a"));

    var place = function () {
      var el = nav.querySelector('a[aria-current]');
      if (!pill) return;
      if (!el) { pill.classList.remove("is-ready"); return; }
      pill.style.left = el.offsetLeft + "px";
      pill.style.width = el.offsetWidth + "px";
      pill.classList.add("is-ready");
    };
    var setActive = function (id) {
      links.forEach(function (a) {
        if (a.getAttribute("aria-current") === "page") return;
        if (a.hash === "#" + id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      place();
    };

    var sections = links
      .map(function (a) { return a.hash && document.getElementById(a.hash.slice(1)); })
      .filter(Boolean);
    if (sections.length) {
      var spy = function () {
        var y = window.scrollY + window.innerHeight * 0.35;
        var current = null;
        sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1].id;
        setActive(current);
      };
      window.addEventListener("scroll", spy, { passive: true });
      spy();
    }

    place();
    window.addEventListener("resize", place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  }

  // Entrance animation when an element scrolls into view.
  var risers = document.querySelectorAll(".rise");
  if (!("IntersectionObserver" in window) || reduce) {
    risers.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
        e.target.querySelectorAll("[data-count]").forEach(countUp);
        if (e.target.hasAttribute("data-count")) countUp(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    risers.forEach(function (el) { io.observe(el); });
  }

  // Number that rolls up to its value (easeOutQuart), like CountUp in the platform.
  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    var target = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split(".")[1] || "").length;
    var ms = reduce ? 0 : 900;
    var t0 = performance.now();
    var step = function (now) {
      var k = ms ? Math.min(1, (now - t0) / ms) : 1;
      el.textContent = (target * (1 - Math.pow(1 - k, 4))).toFixed(decimals);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  if (reduce || !("IntersectionObserver" in window)) document.querySelectorAll("[data-count]").forEach(countUp);
})();
