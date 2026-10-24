/* =====================================================================
   Season story, at the top of each team's History page. It replays the
   season one game at a time: the record line climbs with every win and
   dips with every loss, the record ticks over, and the team's leaders
   race each other (rushing yards, goals or kills) as the games go by.
   Built from the site's data.js, so it grows with every result.
   ===================================================================== */
(function () {
  const SPORT = location.pathname.split("/").filter(Boolean)[0];
  if (SPORT === "esports" || document.body.dataset.page !== "history") return;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const md = (iso) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const squad = document.body.dataset.team || (typeof DEFAULT_TEAM !== "undefined" ? DEFAULT_TEAM : "girls");
  const abbr = (name) => {
    const w = String(name).replace(/^St\.\s*/, "").split(/[\s-]+/).filter((x) => !/^(of|the)$/i.test(x));
    return (w.length > 1 ? w.map((x) => x[0]).join("") : w[0].slice(0, 3)).toUpperCase();
  };
  const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);

  /* ---------- The season as a list of results ---------- */
  function season() {
    const vs = (g) => `${g.home ? "vs" : "at"} ${g.opponent}`;
    if (SPORT === "cross-country") {
      const lines = [["boys", "Boys"], ["girls", "Girls"]].map(([k, label]) => ({
        label,
        games: MEETS.filter((m) => m[k]?.result).map((m) => ({ id: m.id, date: m.date, abbr: m.short || abbr(m.opponent), title: vs(m), result: m[k].result,
          score: `${m[k].us}–${m[k].them}`, margin: m[k].them - m[k].us, home: m.home }))
      }));
      return { lines, attr: "data-meet", unit: "meet", ahead: MEETS.filter((m) => !m.cancelled && new Date(m.date) > Date.now() - 3 * 36e5).slice(0, 3)
        .map((m) => ({ id: m.id, date: m.date, abbr: m.short || abbr(m.opponent || m.name), title: m.name || vs(m) })) };
    }
    const list = SPORT === "soccer" ? TEAMS[squad].schedule : SCHEDULE;
    const real = list.filter((g) => !g.scrimmage && !g.cancelled && !g.noResult && !(g.tournament && !g.result));
    const games = real.filter((g) => g.result).map((g) => ({ id: g.id, date: g.date, abbr: abbr(g.opponent), title: vs(g), result: g.result,
      score: `${g.us}–${g.them}`, us: g.us, them: g.them, margin: g.us - g.them, home: g.home, sets: g.sets, raw: g }));
    const ahead = real.filter((g) => !g.result && new Date(g.date) > Date.now() - 3 * 36e5).slice(0, 4)
      .map((g) => ({ id: g.id, date: g.date, abbr: abbr(g.opponent), title: vs(g) }));
    return { lines: [{ label: null, games }], attr: "data-game", unit: SPORT === "volleyball" || SPORT === "golf" ? "match" : "game", ahead };
  }

  /* ---------- The leaders race: running totals after each game ---------- */
  function race(games) {
    let label, per;
    if (SPORT === "football") {
      label = "Rushing yards";
      const yds = (line) => +((line.match(/\d+ car, (\d+) yds/) || line.match(/(\d+) rushing yds/) || [])[1] || 0);
      per = (g) => Object.fromEntries(PLAYERS.map((p) => [p.name, p.log?.[g.id] ? yds(p.log[g.id]) : 0]));
    } else if (SPORT === "soccer" || SPORT === "field-hockey") {
      label = "Goals";
      per = (g) => Object.fromEntries((g.raw.scorers || []).map(([n, k]) => [n, k || 1]));
    } else if (SPORT === "volleyball") {
      label = "Kills";
      per = (g) => Object.fromEntries(Object.entries(g.raw.box || {}).map(([n, row]) => [n, row[1] || 0]));
    } else return null;
    const total = {};
    const steps = games.map((g) => {
      for (const [n, v] of Object.entries(per(g))) total[n] = (total[n] || 0) + v;
      return { ...total };
    });
    return steps.length && sum(steps[steps.length - 1]) ? { label, steps } : null;
  }

  /* ---------- Story beats worked out from the results ---------- */
  function beats(S, R) {
    const out = [];
    if (SPORT === "cross-country") {
      S.lines.forEach((l) => {
        const w = l.games.filter((g) => g.result === "W").length;
        if (l.games.length) out.push([`${l.label} dual meets`, `${w}–${l.games.length - w}`, l.games.length ? `Best: ${[...l.games].sort((a, b) => b.margin - a.margin)[0].title}, ${[...l.games].sort((a, b) => b.margin - a.margin)[0].score}` : ""]);
      });
      const best = (typeof RUNNERS !== "undefined" ? RUNNERS : []).filter((r) => r.pr).sort((a, b) => a.pr.localeCompare(b.pr));
      ["boys", "girls"].forEach((k) => {
        const r = best.find((x) => x.squad === k);
        if (r) out.push([`Fastest ${k === "boys" ? "boy" : "girl"}`, r.pr, `${r.name}'s personal record this fall`]);
      });
      return out.slice(0, 4);
    }
    const g = S.lines[0].games;
    if (!g.length) return out;
    /* longest winning streak */
    let best = [0, 0], run = 0;
    g.forEach((x, i) => { run = x.result === "W" ? run + 1 : 0; if (run > best[0]) best = [run, i]; });
    if (best[0] >= 2) out.push(["Longest win streak", `${best[0]}`, `${md(g[best[1] - best[0] + 1].date)} – ${md(g[best[1]].date)}`]);
    /* biggest win */
    const wins = g.filter((x) => x.result === "W");
    if (SPORT === "volleyball") {
      const sweeps = wins.filter((x) => x.them === 0).length;
      if (sweeps) out.push(["Sweeps", `${sweeps}`, "Matches won 3–0"]);
      const sw = g.reduce((n, x) => n + (x.us || 0), 0), sl = g.reduce((n, x) => n + (x.them || 0), 0);
      out.push(["Sets won", `${sw}–${sl}`, `Across ${g.length} matches`]);
    } else {
      const big = [...wins].sort((a, b) => b.margin - a.margin)[0];
      if (big) out.push([wins.length > 1 ? "Biggest win" : "Signature win", `+${+big.margin.toFixed(1)}`, `${big.score} ${big.title}`]);
    }
    if (SPORT !== "volleyball") {
      if (SPORT !== "golf") {
        const pf = g.reduce((n, x) => n + x.us, 0), pa = g.reduce((n, x) => n + x.them, 0);
        if (pf >= pa) out.push([SPORT === "football" ? "Points" : "Goals", `${pf}–${pa}`, `Scored and allowed in ${g.length} games`]);
        const so = g.filter((x) => x.them === 0).length;
        if (so) out.push(["Shutouts", `${so}`, `Games the defense didn't allow a ${SPORT === "football" ? "point" : "goal"}`]);
      }
    }
    const rec = (f) => { const l = g.filter(f), w = l.filter((x) => x.result === "W").length, t = l.filter((x) => x.result === "T").length; return [`${w}–${l.length - w - t}${t ? `–${t}` : ""}`, w >= l.length - w - t]; };
    const [hr, hGood] = rec((x) => x.home), [ar, aGood] = rec((x) => !x.home);
    if (hGood || aGood) out.push(hGood ? ["At home", hr, `${ar} on the road`] : ["On the road", ar, `${hr} at home`]);
    /* a thin season still gets four tiles: add the team's leader */
    if (R && out.length < 4) {
      const [name, v] = Object.entries(R.steps[R.steps.length - 1]).sort((a, b) => b[1] - a[1])[0];
      out.splice(Math.min(1, out.length), 0, [`${R.label} leader`, `${v}`, name]);
    }
    return out.slice(0, 4);
  }

  /* ---------- Draw ---------- */
  const S = season();
  const games = S.lines[0].games;
  if (!S.lines.some((l) => l.games.length)) return;
  const R = SPORT === "cross-country" ? null : race(games);
  const B = beats(S, R);
  const steps = Math.max(...S.lines.map((l) => l.games.length));
  const total = steps + S.ahead.length;

  const PADX = 46, H = 314, TOP = 54, BOT = 80;
  const GAP = Math.max(70, Math.min(130, (1080 - PADX * 2) / Math.max(1, total - 1)));   // a short season spreads out instead of scaling up
  const W = PADX * 2 + Math.max(1, total - 1) * GAP;
  const levels = S.lines.map((l) => { let v = 0; return [0, ...l.games.map((x) => (v += x.result === "W" ? 1 : x.result === "L" ? -1 : 0))]; });
  const lo = Math.min(-1, ...levels.flat()), hi = Math.max(1, ...levels.flat());
  const yOf = (v) => TOP + ((hi - v) / (hi - lo)) * (H - TOP - BOT);
  const xOf = (i) => PADX + i * GAP;
  const COLORS = ["#18479f", "#e0a01c"];

  const lineSvg = S.lines.map((l, li) => {
    const off = S.lines.length > 1 ? (li ? 9 : -9) : 0;   // two lines side by side, even when the records match
    const pts = l.games.map((_, i) => [xOf(i), yOf(levels[li][i + 1]) + off]);
    const start = [xOf(0) - GAP * .55, yOf(0) + off];
    const all = [start, ...pts];
    const d = all.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    const cum = [0];
    for (let i = 1; i < all.length; i++) cum.push(cum[i - 1] + Math.hypot(all[i][0] - all[i - 1][0], all[i][1] - all[i - 1][1]));
    l._cum = cum;
    const area = `${d} L${pts[pts.length - 1][0]} ${H - BOT + 18} L${start[0]} ${H - BOT + 18} Z`;
    const label = l.label ? `<text class="st-tag" x="${pts[pts.length - 1][0] + 22}" y="${pts[pts.length - 1][1] + (li ? 16 : -6)}" fill="${COLORS[li]}">${l.label}</text>` : "";
    return `
      ${li === 0 && S.lines.length === 1 ? `<path class="st-area" d="${area}"/>` : ""}
      <path class="st-line" d="${d}" stroke="${COLORS[li]}" style="stroke-dasharray:${cum[cum.length - 1]};stroke-dashoffset:${cum[cum.length - 1]}" data-len="${cum[cum.length - 1]}"/>
      ${l.games.map((x, i) => {
        const [cx, cy] = pts[i], up = x.result !== "L";
        return `<g class="st-node ${x.result}" ${S.attr}="${x.id}" data-step="${i}" style="--x:${cx}px;--y:${cy}px" tabindex="0" role="button" aria-label="${esc(`${md(x.date)} ${x.title}, ${x.result} ${x.score}`)}">
          <title>${esc(`${md(x.date)} · ${x.title} · ${x.result} ${x.score}`)}</title>
          <circle cx="${cx}" cy="${cy}" r="15" ${S.lines.length > 1 ? `stroke="${COLORS[li]}"` : ""}/>
          <text class="st-r" x="${cx}" y="${cy + 5}">${x.result}</text>
          ${S.lines.length === 1 ? `<text class="st-score" x="${cx}" y="${up ? cy - 24 : cy + 34}">${esc(x.score)}</text>` : ""}
        </g>`;
      }).join("")}
      ${label}`;
  }).join("");

  const lastY = S.lines.length === 1 ? yOf(levels[0][levels[0].length - 1]) : yOf(0);
  const aheadSvg = S.ahead.length ? `
    <path class="st-ahead" d="M${xOf(steps - 1)} ${lastY} L${xOf(total - 1)} ${lastY}"/>
    ${S.ahead.map((x, i) => `<g class="st-next" ${S.attr}="${x.id}" tabindex="0" role="button" aria-label="${esc(`${md(x.date)} ${x.title}`)}">
      <title>${esc(`${md(x.date)} · ${x.title}`)}</title>
      <circle cx="${xOf(steps + i)}" cy="${lastY}" r="12"/><text x="${xOf(steps + i)}" y="${lastY + 4}">?</text></g>`).join("")}` : "";
  const axis = [...games.map((x) => x), ...S.ahead].map((x, i) => (S.lines.length > 1 && i < steps ? null : `<text class="st-ab ${i >= steps ? "fut" : ""}" x="${xOf(i)}" y="${H - 22}">${esc(x.abbr)}</text><text class="st-dt" x="${xOf(i)}" y="${H - 6}">${esc(md(x.date))}</text>`)).join("");
  const xcAxis = S.lines.length > 1 ? S.lines[0].games.map((x, i) => `<text class="st-ab" x="${xOf(i)}" y="${H - 22}">${esc(x.abbr)}</text><text class="st-dt" x="${xOf(i)}" y="${H - 6}">${esc(md(x.date))}</text>`).join("") : "";

  const svg = `<svg class="st-svg" viewBox="0 0 ${W + (S.lines.length > 1 ? 50 : 0)} ${H}" style="min-width:${Math.round((W + (S.lines.length > 1 ? 50 : 0)) * .78)}px" role="img" aria-label="The season's record, game by game">
    <defs><linearGradient id="st-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#18479f" stop-opacity=".2"/><stop offset="1" stop-color="#18479f" stop-opacity="0"/></linearGradient></defs>
    ${Array.from({ length: hi - lo + 1 }, (_, i) => hi - i).map((v) => `<line class="st-grid ${v === 0 ? "zero" : ""}" x1="${PADX - 34}" x2="${W - 8}" y1="${yOf(v)}" y2="${yOf(v)}"/>`).join("")}
    <text class="st-500" x="${W - 8}" y="${yOf(0) - 7}">.500</text>
    ${aheadSvg}${lineSvg}${axis}${xcAxis}
  </svg>`;

  const sec = document.createElement("section");
  sec.className = "block st";
  sec.innerHTML = `<div class="wrap">
    <div class="section-head"><h2>${new Date(games[0]?.date || S.lines[1]?.games[0]?.date || Date.now()).getFullYear()} Season Story</h2>
      <button class="st-play" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/></svg>Replay the season</button></div>
    <div class="card st-card">
      <div class="st-top">
        <div class="st-rec"><span>${SPORT === "cross-country" ? "Dual meets" : "Record"}</span><b id="st-rec">${S.lines.map(() => "0–0").join(" · ")}</b></div>
        <div class="st-now" id="st-now"><span>${esc(S.unit === "meet" ? "Meet" : S.unit === "match" ? "Match" : "Game")} by ${esc(S.unit)}</span><b>Ready</b></div>
        ${S.lines.length > 1 ? `<div class="st-key">${S.lines.map((l, i) => `<span><i style="background:${COLORS[i]}"></i>${l.label}</span>`).join("")}</div>` : `<div class="st-form" id="st-form"></div>`}
      </div>
      <div class="st-scroll">${svg}</div>
      <p class="st-hint">Above the .500 line, the Falcons have won more than they've lost. Tap any ${S.unit} for the full ${S.unit === "game" ? "box score" : "result"}.</p>
    </div>
    <div class="st-grid2 ${R ? "" : "solo"}">
      ${R ? `<div class="card st-race"><div class="st-race-h"><h3>${R.label}</h3><span id="st-race-at">Season leaders</span></div><div class="st-bars" id="st-bars"></div></div>` : ""}
      <div class="st-beats">${B.map(([k, v, d], i) => `<div class="card st-beat" style="--i:${i}"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div><div class="d">${esc(d)}</div></div>`).join("")}</div>
    </div>
  </div>`;
  const banner = document.querySelector("main .page-banner");
  banner ? banner.after(sec) : document.querySelector("main")?.prepend(sec);

  /* ---------- Playback ---------- */
  const lines = [...sec.querySelectorAll(".st-line")];
  const nodes = [...sec.querySelectorAll(".st-node")];
  const recEl = sec.querySelector("#st-rec"), nowEl = sec.querySelector("#st-now b"), formEl = sec.querySelector("#st-form");
  const bars = sec.querySelector("#st-bars"), raceAt = sec.querySelector("#st-race-at");
  const TOPN = 6;
  let timer = null;

  const recAt = (l, n) => {
    const g = l.games.slice(0, n), w = g.filter((x) => x.result === "W").length, t = g.filter((x) => x.result === "T").length;
    return `${w}–${g.length - w - t}${t || (SPORT === "soccer" || SPORT === "field-hockey") && g.some((x) => x.result === "T") ? `–${t}` : ""}`;
  };
  function drawBars(n) {
    if (!bars || !R) return;
    const totals = n ? R.steps[n - 1] : {};
    const top = Object.entries(totals).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, TOPN);
    const peak = Math.max(1, ...Object.values(R.steps[R.steps.length - 1]));   // bars grow toward the season's final leader
    const seen = new Set();
    top.forEach(([name, v], rank) => {
      let row = bars.querySelector(`[data-n="${CSS.escape(name)}"]`);
      if (!row) {
        row = document.createElement("div");
        row.className = "st-bar";
        row.dataset.n = name;
        row.innerHTML = `<span class="nm">${esc(name)}</span><span class="tr"><i></i></span><b>0</b>`;
        row.style.setProperty("--r", TOPN);
        bars.appendChild(row);
        void row.offsetWidth;
      }
      seen.add(name);
      row.style.setProperty("--r", rank);
      row.style.setProperty("--w", `${(v / peak) * 100}%`);
      row.classList.toggle("lead", rank === 0);
      row.querySelector("b").textContent = v;
      row.classList.add("on");
    });
    bars.querySelectorAll(".st-bar").forEach((row) => { if (!seen.has(row.dataset.n)) { row.classList.remove("on"); row.style.setProperty("--r", TOPN); } });
    bars.style.height = `${Math.max(1, top.length) * 44}px`;
  }
  function show(n) {
    S.lines.forEach((l, li) => {
      const k = Math.min(n, l.games.length);
      const len = +lines[li].dataset.len;
      lines[li].style.strokeDashoffset = len - l._cum[k];
    });
    nodes.forEach((el) => el.classList.toggle("on", +el.dataset.step < n));
    recEl.textContent = S.lines.map((l) => (S.lines.length > 1 ? `${l.label[0]} ${recAt(l, n)}` : recAt(l, n))).join(" · ");
    const g = games[n - 1];
    nowEl.innerHTML = g ? `${esc(md(g.date))} · ${esc(g.title)} <em class="${g.result}">${g.result} ${esc(g.score)}</em>` : "Ready";
    if (formEl) formEl.innerHTML = `<span>Last 5</span>${games.slice(Math.max(0, n - 5), n).map((x) => `<i class="${x.result}">${x.result}</i>`).join("")}`;
    drawBars(n);
    if (raceAt) raceAt.textContent = n ? `After ${S.unit} ${n}` : "Season leaders";
  }
  function play() {
    clearInterval(timer);
    if (calm) { show(steps); sec.classList.add("done"); return; }
    /* jump back to the start without animating backwards */
    sec.classList.add("reset", "playing");
    sec.classList.remove("done");
    show(0);
    void sec.offsetWidth;
    sec.classList.remove("reset");
    let n = 0;
    timer = setInterval(() => {
      n++;
      show(n);
      if (n >= steps) { clearInterval(timer); sec.classList.remove("playing"); sec.classList.add("done"); }
    }, Math.max(380, Math.min(800, 9000 / steps)));
  }
  sec.querySelector(".st-play").addEventListener("click", play);
  /* the nodes open the game popup through the site's own [data-game] handler; Enter does the same */
  sec.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches?.(".st-node, .st-next")) e.target.dispatchEvent(new MouseEvent("click", { bubbles: true })); });

  show(0);
  if (calm || !("IntersectionObserver" in window)) { show(steps); sec.classList.add("done"); }
  else new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { o.disconnect(); setTimeout(play, 250); } }, { threshold: .35 }).observe(sec.querySelector(".st-card"));

  /* ---------- Styles ---------- */
  const css = document.createElement("style");
  css.textContent = `
    .st .section-head { align-items: center; }
    .st-play { display: inline-flex; align-items: center; gap: 8px; border: 2px solid var(--royal); background: #fff; color: var(--royal); border-radius: 4px; padding: 7px 15px 6px;
      font: 700 15px/1 var(--display); letter-spacing: .08em; text-transform: uppercase; transition: background .15s, color .15s; }
    .st-play:hover { background: var(--royal); color: #fff; }
    .st-play svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .st.playing .st-play svg { animation: st-spin 1s linear infinite; }
    @keyframes st-spin { to { transform: rotate(360deg); } }
    .st-card { overflow: hidden; padding: 0; }
    .st-top { display: flex; align-items: center; gap: 14px 28px; flex-wrap: wrap; padding: 16px 20px; color: #fff; background: linear-gradient(115deg, var(--navy), var(--royal) 70%, #2459c2); }
    .st-top span { display: block; font: 700 12.5px/1 var(--display); letter-spacing: .14em; text-transform: uppercase; color: #b9c6e6; margin-bottom: 4px; }
    .st-rec b { font: 800 44px/1 var(--display); font-variant-numeric: tabular-nums; }
    .st-now { flex: 1; min-width: 220px; padding-left: 24px; border-left: 1px solid rgba(255,255,255,.2); }
    .st-now b { font: 700 22px/1.15 var(--display); text-transform: uppercase; }
    .st-now em { font-style: normal; margin-left: 6px; white-space: nowrap; display: inline-block; padding: 2px 8px 1px; border-radius: 4px; background: var(--royal); }
    .st-now em.W { background: var(--win); } .st-now em.L { background: var(--loss); } .st-now em.T { background: #5b647a; }
    .st-form { display: flex; align-items: center; gap: 5px; }
    .st-form span { margin: 0 6px 0 0; }
    .st-form i { width: 26px; height: 26px; border-radius: 4px; display: grid; place-items: center; font: 800 14px/1 var(--display); font-style: normal; animation: st-pop .35s cubic-bezier(.2,1.6,.4,1); }
    .st-form i.W { background: var(--win); } .st-form i.L { background: var(--loss); } .st-form i.T { background: #5b647a; }
    .st-key { display: flex; gap: 14px; font: 700 15px/1 var(--display); letter-spacing: .08em; text-transform: uppercase; }
    .st-key span { display: flex; align-items: center; gap: 6px; color: #fff; margin: 0; font-size: 15px; }
    .st-key i { width: 22px; height: 5px; border-radius: 3px; }
    .st-scroll { overflow-x: auto; padding: 8px 10px 0; }
    .st-svg { display: block; width: 100%; height: auto; overflow: visible; }
    .st-grid { stroke: #e7ebf3; stroke-width: 1; }
    .st-grid.zero { stroke: #9aa6c2; stroke-dasharray: 5 5; }
    .st-500 { font: 700 12px var(--display); fill: #8a95ad; letter-spacing: .06em; text-anchor: end; }
    .st-area { fill: url(#st-fill); opacity: 0; transition: opacity .8s; }
    .st.done .st-area { opacity: 1; }
    .st.reset .st-line, .st.reset .st-node, .st.reset .st-bar, .st.reset .st-bar .tr i, .st.reset .st-area { transition: none !important; }
    .st-line { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; transition: stroke-dashoffset .55s cubic-bezier(.3,.7,.3,1); }
    .st-node { cursor: pointer; outline: none; }
    .st-node circle { fill: #5b647a; stroke: #fff; stroke-width: 3; transition: r .15s; }
    .st-node.W circle { fill: var(--win); } .st-node.L circle { fill: var(--loss); }
    .st-node .st-r { font: 800 14px var(--display); fill: #fff; text-anchor: middle; pointer-events: none; }
    .st-node .st-score { font: 700 13px var(--display); fill: var(--navy); text-anchor: middle; letter-spacing: .02em; }
    .st-node { opacity: 0; transform-box: fill-box; transform-origin: center; transform: scale(.2); transition: opacity .25s, transform .45s cubic-bezier(.2,1.6,.4,1); }
    .st-node.on { opacity: 1; transform: none; }
    .st-node:hover circle, .st-node:focus-visible circle { r: 18; }
    .st-node:focus-visible circle { stroke: var(--gold); }
    .st-ahead { stroke: #c3cde2; stroke-width: 3; stroke-dasharray: 2 9; stroke-linecap: round; fill: none; }
    .st-next { cursor: pointer; }
    .st-next circle { fill: #fff; stroke: #c3cde2; stroke-width: 2.5; stroke-dasharray: 4 4; }
    .st-next text { font: 800 13px var(--display); fill: #8a95ad; text-anchor: middle; }
    .st-next:hover circle { stroke: var(--royal); }
    .st-ab { font: 700 13px var(--display); fill: var(--navy); text-anchor: middle; letter-spacing: .06em; }
    .st-ab.fut { fill: #8a95ad; }
    .st-dt { font: 600 10.5px var(--body); fill: #8a95ad; text-anchor: middle; }
    .st-tag { font: 800 14px var(--display); letter-spacing: .08em; text-transform: uppercase; }
    .st-hint { margin: 0; padding: 4px 20px 14px; font-size: 13px; color: var(--muted); }
    .st-grid2 { display: grid; grid-template-columns: 1.1fr .9fr; gap: 18px; margin-top: 18px; align-items: start; }
    .st-grid2.solo { grid-template-columns: 1fr; }
    .st-grid2.solo .st-beats { grid-template-columns: repeat(4, 1fr); }
    .st-race { padding: 16px 18px 18px; }
    .st-race-h { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
    .st-race-h h3 { font-size: 26px; color: var(--navy); }
    .st-race-h span { font: 700 13px var(--display); letter-spacing: .12em; text-transform: uppercase; color: var(--royal); }
    .st-bars { position: relative; transition: height .4s; }
    .st-bar { position: absolute; left: 0; right: 0; top: 0; height: 36px; display: grid; grid-template-columns: 150px 1fr 54px; align-items: center; gap: 10px;
      transform: translateY(calc(var(--r) * 44px)); opacity: 0; transition: transform .5s cubic-bezier(.3,.7,.3,1), opacity .35s; }
    .st-bar.on { opacity: 1; }
    .st-bar .nm { font-weight: 700; font-size: 14.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .st-bar .tr { height: 26px; border-radius: 4px; background: #eef2f9; overflow: hidden; }
    .st-bar .tr i { display: block; height: 100%; width: var(--w, 0); border-radius: 4px; background: linear-gradient(90deg, var(--royal), #3a6fd8); transition: width .55s cubic-bezier(.3,.7,.3,1); }
    .st-bar.lead .tr i { background: linear-gradient(90deg, #d79a12, var(--gold)); }
    .st-bar b { font: 800 22px var(--display); color: var(--navy); text-align: right; font-variant-numeric: tabular-nums; }
    .st-beats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
    .st-beat { padding: 14px 16px; border-top: 4px solid var(--gold); }
    .st-beat .k { font: 700 13px var(--display); letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
    .st-beat .v { font: 800 46px/1 var(--display); color: var(--royal); margin: 6px 0 4px; font-variant-numeric: tabular-nums; }
    .st-beat .d { font-size: 13.5px; color: var(--muted); line-height: 1.35; }
    @keyframes st-pop { from { transform: scale(.3); opacity: 0; } }
    @media (max-width: 900px) { .st-grid2 { grid-template-columns: 1fr; } .st-grid2.solo .st-beats { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) {
      .st-now { padding-left: 0; border-left: 0; min-width: 100%; order: 3; }
      .st-rec b { font-size: 38px; }
      .st-bar { grid-template-columns: 112px 1fr 44px; }
      .st-beat .v { font-size: 38px; }
    }
    @media (prefers-reduced-motion: reduce) { .st-line, .st-node, .st-bar, .st-bar .tr i, .st-area { transition: none; } .st-form i { animation: none; } }`;
  document.head.appendChild(css);
})();
