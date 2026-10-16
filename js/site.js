(function () {
  // Wake the platform's free-tier backend (it sleeps after ~15 min idle and
  // takes 30-60 s to boot) while the visitor reads this site. no-cors: the
  // response is opaque, but the request still reaches the server. At most
  // once every 10 minutes per tab session.
  try {
    var last = +sessionStorage.getItem("api-wake") || 0;
    if (Date.now() - last > 10 * 60 * 1000) {
      sessionStorage.setItem("api-wake", String(Date.now()));
      fetch("https://equity-research-platform-ryanappuhamy.onrender.com/health", { mode: "no-cors", cache: "no-store" }).catch(function () {});
    }
  } catch (e) {}
})();
