/* =====================================================================
   Shared effects for every page (hub, newsletter and all team sites).
   Load it last: <script src="(path to)/js/fx.js"></script>
     · the site footer, drawn into <footer id="site-footer">
   ===================================================================== */
(function () {
  const ROOT = new URL("..", document.currentScript.src).href;   // the site root, from /js/fx.js
  const ON_HUB = !!document.querySelector(".hub-hero");
  const OUT = 'target="_blank" rel="noopener"';

  /* ---------- Footer ---------- */
  const TEAMS = [["football", "Football"], ["soccer", "Soccer"], ["field-hockey", "Field hockey"], ["volleyball", "Volleyball"],
                 ["cross-country", "Cross country"], ["golf", "Golf"], ["esports", "Esports"]];
  /* homepage sections; "State tournament" and "Latest results" only show when there's something in them */
  const SEASON = [["week", "Coming up"], ["road", "State tournament"], ["latest", "Latest results"], ["photos", "Photos"], ["tradition", "A winning tradition"]];

  function footer() {
    const foot = document.getElementById("site-footer");
    if (!foot) return;
    const home = (id) => (ON_HUB ? `#${id}` : `${ROOT}#${id}`);
    foot.className = "fx-foot";
    foot.innerHTML = `
      <div class="wrap">
        <div class="fx-foot-grid">
          <div>
            <a class="fx-brand" href="${ROOT}"><img src="${ROOT}images/falcons-logo.png" alt=""><span><b>Danvers Falcons</b><small>Team sites</small></span></a>
            <address>Danvers High School<br>60 Cabot Road, Danvers, MA 01923</address>
          </div>
          <nav aria-labelledby="fx-teams"><h2 id="fx-teams">Teams</h2><ul>
            ${TEAMS.map(([dir, name]) => `<li><a href="${ROOT}${dir}/">${name}</a></li>`).join("")}
          </ul></nav>
          <nav aria-labelledby="fx-season"><h2 id="fx-season">This season</h2><ul>
            ${SEASON.map(([id, name]) => `<li data-section="${id}"><a href="${home(id)}">${name}</a></li>`).join("")}
          </ul></nav>
          <nav aria-labelledby="fx-follow"><h2 id="fx-follow">Follow</h2><ul>
            <li><a href="${ROOT}newsletter/">Newsletter</a></li>
            <li><a href="https://www.instagram.com/danversfalconsathletics/" ${OUT} aria-label="Instagram, @danversfalconsathletics">Instagram</a></li>
            <li><a href="${ROOT}calendars/all-sports.ics">Calendar feed</a></li>
            <li><a href="https://www.danversfalconsathletics.com/" ${OUT}>Official Falcons Athletics</a></li>
          </ul></nav>
        </div>
        <div class="fx-word" aria-hidden="true">${[..."Falcons"].map((c) => `<span>${c}</span>`).join("")}</div>
        <div class="fx-legal">
          <span>A Danvers High School DECA student project. Not the official school website.</span>
          <a href="https://www.danversfalconsathletics.com/" ${OUT}>Official Falcons Athletics ↗</a>
        </div>
      </div>`;

    /* on the homepage, a link only shows while its section does */
    if (ON_HUB) {
      const sync = () => foot.querySelectorAll("li[data-section]").forEach((li) => {
        const sec = document.getElementById(li.dataset.section);
        li.hidden = !sec || sec.hidden;
      });
      sync();
      SEASON.forEach(([id]) => {
        const sec = document.getElementById(id);
        if (sec) new MutationObserver(sync).observe(sec, { attributes: true, attributeFilter: ["hidden"] });
      });
    }
  }

  footer();
})();
