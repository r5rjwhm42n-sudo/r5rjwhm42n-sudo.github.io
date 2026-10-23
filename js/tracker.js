/* =====================================================================
   Hub: Road to the State Tournament. One card per team still playing for
   an MIAA bracket: its power ranking on a gauge with the cut line, a
   status worked out from the live record in its data.js, the key dates,
   and a countdown to the next bracket reveal.

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
    { sport: "golf", name: "Golf", href: "golf/", path: true, done: { big: "11", pre: "", post: "th", line: "of 15 teams<br>D2 North sectional",
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

      const dates = t.dates.map(([k, iso, label, where]) => {
        const past = new Date(iso.length === 10 ? `${iso}T23:59` : iso) < Date.now();
        return `<li class="${past ? "past" : ""}"><span>${esc(k)}</span><b>${esc(label && label.startsWith("From") ? `From ${day(iso)}` : label || day(iso))}</b>${where && t.path ? `<small>${esc(where)}</small>` : ""}</li>`;
      });
      const nextIdx = t.dates.findIndex(([, iso]) => new Date(iso.length === 10 ? `${iso}T23:59` : iso) >= Date.now());

      const gauge = t.path ? `
        <div class="rd-path" style="--done:${nextIdx < 0 ? 1 : nextIdx / (t.dates.length - 1)}">
          <div class="rd-line"><i></i></div>
          <ol>${t.dates.map(([k, , , , tag], j) => `<li class="${nextIdx < 0 || j < nextIdx ? "past" : j === nextIdx ? "now" : ""}"><span></span><em>${esc(tag || k)}</em></li>`).join("")}</ol>
        </div>` : rank ? `
        <div class="rd-gauge" style="--cut:${(t.cut / of) * 100}%; --at:${((rank - 1) / (of - 1)) * 100}%">
          <div class="rd-track"><span class="rd-zone"></span><span class="rd-line-cut"></span><span class="rd-pin"><img src="images/falcons-logo.png" alt=""></span></div>
          <div class="rd-scale"><span>No. 1</span><span class="rd-cutlabel">Top ${t.cut}</span><span>No. ${of}</span></div>
        </div>` : "";

      return `<a class="rd-card ${cls}" href="${esc(t.href)}" style="--i:${i}">
        <div class="rd-top"><svg aria-hidden="true"><use href="#i-${t.sport}"/></svg><span>${esc(t.name)}</span>${division && !t.path ? `<em>${esc(division)}</em>` : ""}</div>
        <div class="rd-main">
          ${t.done ? `<div class="rd-big"><b>${t.done.big}</b><small class="post">${t.done.post}</small><span>${t.done.line}</span></div>`
            : t.path ? (() => {
              const [k, iso] = t.dates[Math.max(0, nextIdx)];
              const days = Math.max(0, Math.ceil((new Date(iso.slice(0, 10) + "T00:00") - new Date(new Date().toDateString())) / 864e5));
              return `<div class="rd-big"><b>${days}</b><span>${days === 1 ? "day" : "days"} to the<br>${esc(k)}</span></div>`;
            })()
            : `<div class="rd-big"><small>No.</small><b data-n="${rank || ""}" data-from="${of}">${rank || "—"}</b><span>of ${of}<br>${esc(division)}</span></div>`}
          <div class="rd-status"><span class="chip">${esc(status)}</span><small>${esc(detail)}</small></div>
        </div>
        ${gauge}
        ${t._rec ? `<div class="rd-rec"><span><b>${t._rec}</b> record</span><span><b>${t._pct}</b> win pct</span><span><b>${t._left}</b> before cutoff</span></div>` : ""}
        <ol class="rd-dates">${dates.join("")}</ol>
      </a>`;
    });

    const asOf = H.raw["field-hockey"]?.TEAM?.ranking?.asOf || "Oct. 20";
    const next = REVEALS.find(([, iso]) => new Date(iso) > Date.now());
    box.innerHTML = `<div class="wrap">
      <div class="rd-head">
        <div>
          <div class="eyebrow">MIAA state tournaments · Fall 2026</div>
          <h2>Road to the State Tournament</h2>
          <p>Where every Falcons team stands in the power rankings, how close each is to a bracket, and the dates that decide it.</p>
        </div>
        ${next ? `<div class="rd-clock">
          <div class="k"><span class="dot"></span>Next bracket reveal</div>
          <div class="v">${esc(next[0])} · ${new Date(next[1]).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).replace(":00", "")}</div>
          <div class="rd-cd" id="rd-cd"></div>
        </div>` : ""}
      </div>
      <div class="rd-grid">${cards.join("")}</div>
      <p class="rd-note">Rankings as of ${esc(asOf)} from the ${RULE}</p>
    </div>`;
    box.hidden = false;

    if (next) {
      const end = new Date(next[1]).getTime(), cd = $("#rd-cd");
      const tick = () => {
        const ms = Math.max(0, end - Date.now());
        const cell = (v, l) => `<div><b>${String(Math.floor(v)).padStart(2, "0")}</b><span>${l}</span></div>`;
        cd.innerHTML = cell(ms / 864e5, "Days") + cell((ms / 36e5) % 24, "Hrs") + cell((ms / 6e4) % 60, "Min") + cell((ms / 1e3) % 60, "Sec");
      };
      tick();
      setInterval(tick, 1000);
    }

    /* cards rise in, pins slide to their rank and the numbers count up once the section is on screen */
    const go = () => {
      box.classList.add("in");
      if (calm) return;
      box.querySelectorAll("[data-n]").forEach((el) => {
        const end = +el.dataset.n, from = +el.dataset.from || 60, t0 = performance.now();
        if (!end) return;
        const step = (t) => {
          const p = Math.min(1, (t - t0) / 1100);
          el.textContent = Math.max(1, Math.round(end + (from - end) * Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };
    if (calm || !("IntersectionObserver" in window)) go();
    else new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { go(); o.disconnect(); } }, { threshold: .18 }).observe(box);
  }

  if (window.DFAHub) start();
  document.addEventListener("dfa:hub", start);
})();
