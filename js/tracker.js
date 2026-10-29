/* =====================================================================
   Hub: Road to the State Tournament. One card per team still playing for
   an MIAA bracket: its power ranking on a bar with the cut line, a status
   worked out from the live record in its data.js, and the key dates.

   To update: change the rankings in each team's data.js (TEAM.ranking)
   and the dates below. Once the MIAA posts a team's bracket, fill in
   `bracket` in that team's data.js: the card leaves the grid and the
   section turns into the State Tournament, with a tab per team showing
   its whole division bracket (drawn by bracket.js) and Danvers' games.
   ===================================================================== */
(function () {
  const ROAD = [
    { sport: "football", name: "Football", href: "football/", division: "Division 4", of: 36, cut: 16,
      ruleOnly: true,
      dates: [["Ranking cutoff", "2026-10-31"], ["Brackets out", "2026-11-01T13:00"], ["Playoffs begin", "2026-11-05", "From"]] },
    { sport: "soccer", squad: "girls", name: "Girls Soccer", href: "soccer/?team=girls", of: 63, cut: 32,
      dates: [["Ranking cutoff", "2026-11-03"], ["Brackets out", "2026-11-05T13:00"], ["First round", "2026-11-06"], ["State finals", "2026-11-20", "Nov. 20–21"]] },
    { sport: "volleyball", name: "Volleyball", href: "volleyball/", of: 68, cut: 32,
      dates: [["Ranking cutoff", "2026-11-01"], ["Brackets out", "2026-11-03T13:00"], ["First round", "2026-11-05"], ["State finals", "2026-11-20", "Nov. 20–21"]] },
    { sport: "field-hockey", name: "Field Hockey", href: "field-hockey/", of: 54, cut: 32,
      dates: [["Ranking cutoff", "2026-11-01"], ["Brackets out", "2026-11-03T11:00"], ["First round", "2026-11-05"], ["State finals", "2026-11-20", "Nov. 20–21"]] },
    { sport: "cross-country", name: "Cross Country", href: "cross-country/", path: true,
      dates: [["NEC Championship", "2026-10-31T10:00", null, "Stage Fort Park, Gloucester", "NEC"], ["Division 2 meet", "2026-11-14", null, "Wrentham Developmental Center", "Div. 2"],
              ["All-State meet", "2026-11-21T14:00", null, "Devens", "State"]] },
    { sport: "golf", name: "Golf", href: "golf/", path: true, done: { big: "11", pre: "", post: "th", line: "of 15 teams at the D2 North sectional",
        detail: "The top three teams went on to the state final" },
      dates: [["D2 North sectional", "2026-10-20", null, "Bradford Country Club", "Sectional"], ["NEC Open", "2026-10-21", null, "Tedesco Country Club", "NEC Open"]] }
  ];
  const REVEALS = [["Football brackets", "2026-11-01T13:00"], ["Field hockey brackets", "2026-11-03T11:00"], ["Volleyball brackets", "2026-11-03T13:00"], ["Soccer brackets", "2026-11-05T13:00"]];
  const RULE = "MIAA power rankings. In soccer, volleyball and field hockey the top 32 in each division qualify, and teams below that at .500 or better (ties count as half a win) get a play-in game. Football takes the top 16 teams with at least three wins.";

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const day = (iso) => new Date(iso.length === 10 ? `${iso}T12:00` : iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function start() {
    const H = window.DFAHub;
    if (!H || $("#road")?.dataset.built) return;
    const box = $("#road");
    box.dataset.built = "1";

    const brackets = [];   // teams whose bracket is out, shown as tabs instead of cards
    let ranked = false;
    const cards = ROAD.map((t, i) => {
      const d = H.raw[t.sport];
      if (!d) return "";
      const team = t.squad ? d.TEAMS[t.squad] : d.TEAM;
      const games = (t.squad ? team.schedule : d.SCHEDULE || []).filter((g) => !g.scrimmage && !g.postseason && !g.tournament);
      const n = (r) => games.filter((g) => g.result === r).length;
      const W = n("W"), L = n("L"), T = n("T"), N = W + L + T;
      /* games still to play before the ranking cutoff (they're the ones that count) */
      const cutoff = new Date(`${(t.dates.find(([k]) => /cutoff/i.test(k)) || [, "2100-01-01"])[1].slice(0, 10)}T23:59`);
      const left = games.filter((g) => !g.result && !g.cancelled && !g.noResult && new Date(g.date) > Date.now() - 3 * 36e5 && new Date(g.date) <= cutoff).length;
      let rank = null, asOf = null;
      if (team?.ranking && typeof team.ranking === "object") ({ rank, asOf } = team.ranking);
      else if (typeof team?.ranking === "string") {
        rank = +(team.ranking.match(/No\. (\d+)/) || [])[1] || null;
        asOf = (team.ranking.match(/\(([^)]+)\)/) || [])[1];
      }
      const of = team?.ranking?.of || t.of;
      const division = t.division || (team?.division || "").replace(/^MIAA /, "");

      /* status */
      let status, cls, detail;
      if (t.path) {
        const next = t.dates.find(([, iso]) => new Date(iso) > Date.now() - 864e5);
        if (t.done) { status = "Season complete"; cls = "done"; detail = t.done.detail; }
        else { status = next ? "Up next" : "Season complete"; cls = "go"; detail = next ? `${day(next[1])}${next[3] ? ` · ${next[3]}` : ""}` : ""; }
      } else {
        const pct = N ? (W + T / 2) / N : 0;
        const need = t.ruleOnly ? null : [...Array(left + 1).keys()].find((w) => (W + w + T / 2) / (N + left) >= .5);
        if (need === 0) { status = "Clinched"; cls = "in"; detail = "Locked in at .500 or better"; }
        else if (rank && rank <= t.cut - 6) { status = "In position"; cls = "in"; detail = t.ruleOnly ? `Inside the top ${t.cut} of ${division}` : `Inside the top ${t.cut}${need ? ` · ${need === 1 ? "one more win" : `${need} wins`} locks it up` : ""}`; }
        else if (rank && rank <= t.cut + 8) { status = "On the bubble"; cls = "bubble"; detail = need ? `${need === 1 ? "One more win" : `${need} more wins`} clinches a spot` : `Right around the top-${t.cut} line`; }
        else if (need != null) { status = "Still alive"; cls = "bubble"; detail = `${need === 1 ? "One more win" : `${need} more wins`} reaches .500`; }
        else { status = "Building"; cls = "done"; detail = "Outside the cut line"; }
        t._rec = `${W}–${L}${T ? `–${T}` : ""}`;
        t._pct = pct.toFixed(3).replace(/^0/, "");
        t._left = left;
      }
      /* once the bracket is out the team moves to the bracket tabs (or its season is over) */
      const B = !t.path && team?.bracket;
      if (B?.seeds?.length) {
        if (DFABracket.seedOf(B)) { brackets.push({ t, B, division, key: t.squad ? `${t.squad}-${t.sport}` : t.sport }); return ""; }
        status = "Season complete"; cls = "done"; detail = `Finished ${t._rec}`;
      } else if (!t.path) ranked = true;

      const nextIdx = t.dates.findIndex(([, iso]) => new Date(iso.length === 10 ? `${iso}T23:59` : iso) >= Date.now());
      const dates = t.dates.map(([k, iso, label, where], j) => {
        const past = nextIdx < 0 || j < nextIdx;
        const when = label && label.startsWith("From") ? `From ${day(iso)}` : label || day(iso);
        return `<div class="${past ? "past" : j === nextIdx ? "next" : ""}"><dt>${esc(k)}</dt><dd>${esc(when)}${where && t.path ? `<small>${esc(where)}</small>` : ""}</dd></div>`;
      });

      let big;
      if (t.done) big = `<b>${t.done.big}${t.done.post}</b><span>${t.done.line}</span>`;
      else if (t.path) {
        const [k, iso] = t.dates[Math.max(0, nextIdx)];
        const days = Math.max(0, Math.ceil((new Date(iso.slice(0, 10) + "T00:00") - new Date(new Date().toDateString())) / 864e5));
        big = `<b>${days}</b><span>${days === 1 ? "day" : "days"} to the ${esc(k)}</span>`;
      } else big = `<b>${rank ? `No. ${rank}` : "—"}</b><span>of ${of} in ${esc(division)}</span>`;

      /* the division as a bar: qualifying spots shaded, Danvers' spot marked */
      const gauge = !t.path && rank ? `
        <div class="rd-gauge" style="--cut:${(t.cut / of) * 100}%; --at:${((rank - .5) / of) * 100}%" aria-hidden="true">
          <div class="rd-track"><span class="rd-zone"></span><span class="rd-mark"></span></div>
          <div class="rd-scale"><span>No. 1</span><span class="rd-cutlabel">Top ${t.cut}</span><span>No. ${of}</span></div>
        </div>` : "";

      return `<a class="rd-card card lift" href="${esc(t.href)}">
        <div class="rd-top"><svg aria-hidden="true"><use href="#i-${t.sport}"/></svg><span>${esc(t.name)}</span>${division && !t.path ? `<span class="rd-div">${esc(division)}</span>` : ""}</div>
        <div class="rd-body">
          <div class="rd-main"><div class="rd-big">${big}</div><span class="rd-chip ${cls}">${esc(status)}</span></div>
          ${detail ? `<p class="rd-detail">${esc(detail)}</p>` : ""}
          ${gauge}
          ${t._rec ? `<dl class="rd-recs"><div><dt>Record</dt><dd>${t._rec}</dd></div><div><dt>Win pct</dt><dd>${t._pct}</dd></div><div><dt>Before cutoff</dt><dd>${t._left}</dd></div></dl>` : ""}
          <dl class="rd-dates">${dates.join("")}</dl>
        </div>
      </a>`;
    });

    const asOf = H.raw["field-hockey"]?.TEAM?.ranking?.asOf || "Oct. 20";
    const next = REVEALS.find(([, iso]) => new Date(iso) > Date.now());
    const reveal = next && `${next[0]} come out ${new Date(next[1]).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).replace(":00", "").replace(/, (\d+ [AP]M)$/, " at $1")}`;
    const tour = brackets.length > 0;
    const rest = cards.filter(Boolean);
    box.innerHTML = `<div class="wrap">
      <div class="section-head"><h2>${tour ? "State Tournament" : "Road to the State Tournament"}</h2><span class="sub">${reveal ? esc(reveal) : tour ? "The full MIAA bracket for every Danvers team in the field" : "Where each team stands in the MIAA power rankings"}</span></div>
      ${tour ? `<div class="bk-tabs" role="tablist" aria-label="State tournament brackets">${brackets.map((x) => `<button type="button" role="tab" id="bkt-${x.key}" aria-controls="bk-panel" aria-selected="false" data-k="${x.key}"><svg aria-hidden="true"><use href="#i-${x.t.sport}"/></svg><span><b>${esc(x.t.name)}</b><small>No. ${DFABracket.seedOf(x.B)} seed · ${esc(x.division)}</small></span></button>`).join("")}</div>
      <div class="bk-panel card" id="bk-panel" role="tabpanel"></div>` : ""}
      ${rest.length ? `<div class="rd-grid">${rest.join("")}</div>` : ""}
      <p class="credit">${tour ? "Brackets and seeds from the MIAA. " : ""}${ranked ? `Rankings as of ${esc(asOf)} from the ${RULE}` : ""}</p>
    </div>`;
    box.hidden = false;

    /* the bracket tabs: one division bracket at a time, linkable as #bracket-<team> */
    function show(x) {
      const P = $("#bk-panel"), size = x.t.cut, st = DFABracket.status(x.B, size), road = DFABracket.road(x.B, size);
      box.querySelectorAll(".bk-tabs [role=tab]").forEach((b) => b.setAttribute("aria-selected", b.dataset.k === x.key));
      P.setAttribute("aria-labelledby", `bkt-${x.key}`);
      P.innerHTML = `
        <div class="bk-head">
          <div class="rd-big"><b>No. ${DFABracket.seedOf(x.B)}</b><span>seed of ${x.B.seeds.length} in ${esc(x.division)}</span></div>
          <div class="bk-now"><span class="rd-chip ${st.cls}">${esc(st.chip)}</span>${st.detail ? `<p>${esc(st.detail)}</p>` : ""}</div>
          <div class="bk-links"><a href="${esc(x.t.href)}">${esc(x.t.name)} site</a>${x.B.url ? `<a href="${esc(x.B.url)}" target="_blank" rel="noopener">MIAA bracket ↗</a>` : ""}</div>
        </div>
        ${road ? `<ol class="bk-road">${road}</ol>` : ""}
        <div class="bk-scroll">${DFABracket.draw(x.B, size)}</div>`;
      /* when the bracket is wider than the screen, scroll just far enough to show Danvers' latest game */
      const sc = $(".bk-scroll", P), col = [...P.querySelectorAll(".bk-m.on")].pop()?.closest(".bk-col");
      if (col) sc.scrollLeft = Math.max(0, col.offsetLeft + col.offsetWidth + 20 - sc.clientWidth);
    }
    const fromHash = () => {
      const k = (location.hash.match(/^#bracket-(.+)/) || [])[1];
      const x = k && brackets.find((b) => b.key === k);
      if (x) show(x);
      if (k) box.scrollIntoView();
      return x;
    };
    if (tour) {
      $(".bk-tabs", box).addEventListener("click", (e) => {
        const b = e.target.closest("[role=tab]");
        if (!b) return;
        show(brackets.find((x) => x.key === b.dataset.k));
        history.replaceState(null, "", `#bracket-${b.dataset.k}`);
      });
      if (!fromHash()) show(brackets[0]);
    } else fromHash();
    addEventListener("hashchange", fromHash);

    /* the shaded bars fill in once the section scrolls into view, like the title bars below */
    if (calm || !("IntersectionObserver" in window)) box.classList.add("in");
    else new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { box.classList.add("in"); o.disconnect(); } }, { threshold: .2 }).observe(box);
  }

  if (window.DFAHub) start();
  document.addEventListener("dfa:hub", start);
})();
