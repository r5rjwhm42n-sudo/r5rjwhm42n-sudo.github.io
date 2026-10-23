/* =====================================================================
   Hub: Road to the State Tournament. One card per team still playing for
   an MIAA bracket: its power ranking on a bar with the cut line, a status
   worked out from the live record in its data.js, and the key dates.

   To update: change the rankings in each team's data.js (TEAM.ranking)
   and the dates below. Once brackets are out, add  bracket: { seed,
   opponent, date, home }  to a team here and its card shows the matchup.
   ===================================================================== */
(function () {
  const ROAD = [
    { sport: "football", name: "Football", href: "football/", division: "Division 4", of: 36, cut: 16,
      rule: "Top 16 make the bracket", ruleOnly: true,
      dates: [["Ranking cutoff", "2026-10-31"], ["Brackets out", "2026-11-01T13:00"], ["Playoffs begin", "2026-11-05", "From"]] },
    { sport: "soccer", squad: "girls", name: "Girls Soccer", href: "soccer/?team=girls", of: 63, cut: 32,
      dates: [["Ranking cutoff", "2026-11-03"], ["Brackets out", "2026-11-05"], ["First round", "2026-11-06"], ["State finals", "2026-11-20", "Nov. 20–21"]] },
    { sport: "volleyball", name: "Volleyball", href: "volleyball/", of: 68, cut: 32,
      dates: [["Ranking cutoff", "2026-11-01"], ["Brackets out", "2026-11-03"], ["First round", "2026-11-05"], ["State finals", "2026-11-20", "Nov. 20–21"]] },
    { sport: "field-hockey", name: "Field Hockey", href: "field-hockey/", of: 54, cut: 32,
      dates: [["Ranking cutoff", "2026-11-01"], ["Brackets out", "2026-11-03"], ["First round", "2026-11-05"], ["State finals", "2026-11-20", "Nov. 20–21"]] },
    { sport: "cross-country", name: "Cross Country", href: "cross-country/", path: true,
      dates: [["NEC Championship", "2026-10-31T10:00", null, "Stage Fort Park, Gloucester", "NEC"], ["Division 2 meet", "2026-11-14", null, "Wrentham Developmental Center", "Div. 2"],
              ["All-State meet", "2026-11-21T14:00", null, "Devens", "State"]] },
    { sport: "golf", name: "Golf", href: "golf/", path: true, done: { big: "11", pre: "", post: "th", line: "of 15 teams at the D2 North sectional",
        detail: "The top three teams went on to the state final" },
      dates: [["D2 North sectional", "2026-10-20", null, "Bradford Country Club", "Sectional"], ["NEC Open", "2026-10-21", null, "Tedesco Country Club", "NEC Open"]] }
  ];
  const REVEALS = [["Football brackets", "2026-11-01T13:00"], ["Volleyball & field hockey brackets", "2026-11-03T12:00"], ["Soccer brackets", "2026-11-05T12:00"]];
  const RULE = "MIAA power rankings. In soccer, volleyball and field hockey the top 32 in each division qualify, plus any team at .500 or better (ties count as half a win). Football takes the top 16.";

  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const day = (iso) => new Date(iso.length === 10 ? `${iso}T12:00` : iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function start() {
    const H = window.DFAHub;
    if (!H || $("#road")?.dataset.built) return;
    const box = $("#road");
    box.dataset.built = "1";

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
      if (t.bracket) {
        status = `No. ${t.bracket.seed} seed`; cls = "in";
        detail = `${t.bracket.home ? "vs" : "at"} ${t.bracket.opponent}${t.bracket.date ? ` · ${day(t.bracket.date)}` : ""}`;
      }

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
    box.innerHTML = `<div class="wrap">
      <div class="section-head"><h2>Road to the State Tournament</h2><span class="sub">${reveal ? `${esc(reveal)}` : "Where each team stands in the MIAA power rankings"}</span></div>
      <div class="rd-grid">${cards.join("")}</div>
      <p class="credit">Rankings as of ${esc(asOf)} from the ${RULE}</p>
    </div>`;
    box.hidden = false;

    /* the shaded bars fill in once the section scrolls into view, like the title bars below */
    if (calm || !("IntersectionObserver" in window)) box.classList.add("in");
    else new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { box.classList.add("in"); o.disconnect(); } }, { threshold: .2 }).observe(box);
  }

  if (window.DFAHub) start();
  document.addEventListener("dfa:hub", start);
})();
