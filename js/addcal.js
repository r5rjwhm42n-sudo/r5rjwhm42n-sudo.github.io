/* =====================================================================
   "Add to calendar" and "Tickets" buttons, shared by every team site and
   the hub. Any element with data-addcal="<feed>" gets them:
     data-addcal  football · soccer (follows the Boys/Girls switch) ·
                  field-hockey · volleyball · golf · cross-country ·
                  esports · all-sports
     data-label   optional button text (default "Add to calendar")
     class light  for a light background
   The feeds are the files in /calendars, built from each team's data.js by
   tools/build-calendars.js. The Tickets button appears only while a
   ticketed event is still to come: a home game for a team whose TEAM has
   tickets (football), or a meet with tickets of its own (cross country).
   ===================================================================== */
(function () {
  const HOST = "danversfalconsathletics.org";
  const NAMES = {
    football: "Danvers Football", "girls-soccer": "Danvers Girls Soccer", "boys-soccer": "Danvers Boys Soccer",
    "field-hockey": "Danvers Field Hockey", volleyball: "Danvers Volleyball", golf: "Danvers Golf",
    "cross-country": "Danvers Cross Country", esports: "Danvers Esports", "all-sports": "Danvers Falcons"
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ahead = (iso) => new Date(iso).getTime() + 12 * 36e5 > Date.now();

  function tickets() {
    if (typeof TEAM !== "undefined" && TEAM.tickets && typeof SCHEDULE !== "undefined" &&
        SCHEDULE.some((g) => g.home && !g.result && !g.cancelled && ahead(g.date))) return TEAM.tickets;
    if (typeof MEETS !== "undefined") {
      const m = MEETS.find((x) => x.tickets && !x.cancelled && !(x.boys || x.girls) && ahead(x.date));
      if (m) return m.tickets;
    }
    return null;
  }

  const css = document.createElement("style");
  css.textContent = `
    .addcal { margin-top: 22px; }
    .addcal .btn { cursor: pointer; }
    .addcal-toggle::after { content: "▾"; font-size: .75em; }
    .addcal-toggle[aria-expanded="true"]::after { content: "▴"; }
    .addcal .addcal-menu { margin-top: 14px; max-width: 640px; padding: 14px 16px; border-radius: var(--r, 10px);
      background: rgba(255, 255, 255, .1); border: 1px solid rgba(255, 255, 255, .28); }
    .addcal .addcal-menu p { margin: 0 0 12px; max-width: none; font-size: 15px; line-height: 1.45; color: inherit; }
    .addcal-links { display: flex; flex-wrap: wrap; gap: 8px; }
    .addcal-links a { display: inline-flex; align-items: center; padding: 8px 14px; border-radius: 999px; background: #fff;
      color: var(--royal); font-weight: 700; font-size: 15px; text-decoration: none; }
    .addcal-links a:hover, .addcal-links a:focus-visible { background: #e6edfc; }
    .addcal.light .btn-primary { background: var(--royal); border-color: var(--royal); color: #fff; }
    .addcal.light .btn-primary:hover { background: var(--navy); border-color: var(--navy); }
    .addcal.light .btn-ghost { color: var(--royal); border-color: var(--royal); }
    .addcal.light .btn-ghost:hover { background: #e6edfc; }
    .addcal.light .addcal-menu { background: #fff; border-color: var(--line, #dfe4ee); color: var(--ink); box-shadow: var(--shadow); }
    .addcal.light .addcal-links a { background: #eef2fb; }
    .addcal.light .addcal-links a:hover, .addcal.light .addcal-links a:focus-visible { background: #dde6f8; }`;
  document.head.appendChild(css);

  document.querySelectorAll("[data-addcal]").forEach((el, i) => {
    let feed = el.dataset.addcal;
    if (feed === "soccer") feed = `${document.body.dataset.team || "girls"}-soccer`;
    const path = `${HOST}/calendars/${feed}.ics`;
    const links = [
      ["Apple Calendar", `webcal://${path}`],
      ["Google Calendar", `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(`webcal://${path}`)}`],
      ["Outlook", `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(`https://${path}`)}&name=${encodeURIComponent(NAMES[feed])}`],
      ["Download (.ics)", `https://${path}`]
    ];
    const t = tickets();
    const id = `addcal-menu-${i + 1}`;
    el.classList.add("addcal");
    el.innerHTML = `
      <div class="btn-row">
        <button type="button" class="btn btn-primary addcal-toggle" aria-expanded="false" aria-controls="${id}">${esc(el.dataset.label || "Add to calendar")}</button>
        ${t ? `<a class="btn btn-ghost" href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.label)} ↗</a>` : ""}
      </div>
      <div class="addcal-menu" id="${id}" hidden>
        <p>Subscribe once and your calendar keeps itself up to date: new dates, time changes and final scores show up on their own.</p>
        <div class="addcal-links">${links.map(([label, url]) =>
          `<a href="${esc(url)}"${url.startsWith("webcal:") ? "" : ' target="_blank" rel="noopener"'}>${label}</a>`).join("")}</div>
      </div>`;
    const btn = el.querySelector(".addcal-toggle");
    const menu = el.querySelector(".addcal-menu");
    btn.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      btn.setAttribute("aria-expanded", String(!menu.hidden));
    });
  });
})();
