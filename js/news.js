/* =====================================================================
   Hub strip for the Athletic Department newsletter: names the newest
   issue from newsletter/issues.js and links to it. It stays up for 45
   days after the issue comes out, so an old issue never sits on the hub.
   ===================================================================== */
(function () {
  const issue = (window.NEWSLETTERS || [])[0];
  const strip = document.getElementById("news-strip");
  if (!issue || !strip) return;
  const age = (Date.now() - new Date(issue.published + "T12:00:00")) / 864e5;
  if (!(age < 45)) return;
  const titles = issue.sections.filter((s) => s.title).map((s) => s.title.replace(/\s*\(.*\)$/, ""));
  strip.querySelector(".ns-title").textContent = issue.title.replace(/\s+(and|&)\s+.*$/i, "");   // "October Newsletter"
  strip.querySelector(".ns-sub").textContent = titles.slice(0, 3).join(" · ") + (titles.length > 3 ? " and more" : "");
  strip.hidden = false;
})();
