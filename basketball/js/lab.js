/* =====================================================================
   BASKETBALL LAB (basketball/lab.html). Uses ../js/labkit.js.
   Everything is drawn from the site's own data (js/data.js, archive.js):
   every game on file, and the season-by-season history.
     1 · Season Pulse: every game of a season as a beat, by the margin
     2 · Road to the Garden: each state tournament run, game by game
     3 · Clutch Meter: close games, blowouts, home, road, league
     4 · Free Throw Challenge: a timing game (just for fun)
     5 · Era Timeline: every season on file, 1966 to now
   ===================================================================== */
(function () {
  "use strict";
  const K = window.LabKit, { $, $$, esc, S, REDUCED, clamp, ord, dateText, shortDate, pct, rec } = K;
  const st = K.store("bb-lab");
  const team = K.teams("bb-lab", Object.keys(TEAMS));
  const T = () => TEAMS[team.key];
  const G = () => K.games(T());
  const scoredGames = () => G().filter((g) => g.scored);
  const seasonsOnFile = () => [...new Set(G().map((g) => g.season))].sort();
  const short = (o) => o.replace(/ Regional| Memorial| High School/g, "");

  /* ---------- hero numbers ---------- */
  function hero() {
    const all = Object.values(TEAMS);
    const games = all.reduce((a, t) => a + K.games(t).filter((g) => g.scored).length, 0);
    const years = all.reduce((a, t) => a + (t.seasons || []).length, 0);
    const titles = all.reduce((a, t) => a + (t.banners || []).filter((b) => /State Champ/i.test(b.label)).length, 0);
    $("#hero-stats").innerHTML = [[games, "games on file, with the score"], [years, "seasons of history"], [titles, "state championships"]]
      .map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("");
    /* the scoreboard in the art: the boys' 27–0 season */
    const perfect = (TEAMS.boys?.seasons || []).find((s) => s[2] === 0 && s[1] >= 20);
    if (perfect) $("#hero-board").textContent = `${perfect[1]}–${perfect[2]}`, $("#hero-board-cap").textContent = `${perfect[0] - 1}–${String(perfect[0]).slice(2)} boys · perfect season`;
  }

  /* =====================================================================
     1 · SEASON PULSE
     ===================================================================== */
  const pulse = (function () {
    const box = $("#pulse-chart"), chips = $("#pulse-seasons"), det = $("#pulse-detail"), tiles = $("#pulse-tiles"), form = $("#pulse-form");
    let season = null;
    function render() {
      const ss = seasonsOnFile();
      if (!ss.includes(season)) season = ss[ss.length - 1];
      chips.innerHTML = ss.map((s) => `<button type="button" class="chip" data-s="${esc(s)}" aria-pressed="${s === season}">${esc(s)}</button>`).join("");
      const gs = G().filter((g) => g.season === season);
      const sc = gs.filter((g) => g.scored);
      const W = 900, H = 260, P = { l: 34, r: 10, t: 14, b: 24 }, mid = P.t + (H - P.t - P.b) / 2;
      const maxM = Math.max(10, ...sc.map((g) => Math.abs(g.us - g.them)));
      const yS = (m) => (m / maxM) * ((H - P.t - P.b) / 2);
      const bw = (W - P.l - P.r) / Math.max(gs.length, 1);
      const svg = S("svg", { viewBox: `0 0 ${W} ${H}`, class: "lk-svg pulse-svg", role: "img", "aria-label": `${season}: every game by the margin` });
      for (const m of [-maxM, -maxM / 2, 0, maxM / 2, maxM]) {
        const y = mid - yS(m);
        S("line", { x1: P.l, x2: W - P.r, y1: y, y2: y, class: "lk-gl" + (m === 0 ? " zero" : "") }, svg);
        const tx = S("text", { x: P.l - 6, y: y + 4, "text-anchor": "end", class: "lk-ax" }, svg); tx.textContent = m > 0 ? `+${Math.round(m)}` : Math.round(m);
      }
      /* the pulse line through the tops of the bars */
      const pts = [];
      gs.forEach((g, i) => {
        const x = P.l + i * bw + bw / 2;
        if (!g.scored) { S("circle", { cx: x, cy: mid, r: 3, class: "pl-none" }, svg); pts.push([x, mid]); return; }
        const m = g.us - g.them, h = yS(Math.abs(m));
        const r = S("rect", { x: x - bw * .32, y: m >= 0 ? mid - h : mid, width: bw * .64, height: Math.max(2, h), rx: 2, class: "pl-bar " + (m > 0 ? "w" : "l") + (/Tourn|MIAA/.test(g.type) ? " t" : ""), tabindex: "0", "data-i": i }, svg);
        r.addEventListener("pointerenter", () => show(g)); r.addEventListener("focus", () => show(g)); r.addEventListener("click", () => show(g));
        pts.push([x, mid - (m >= 0 ? h : -h)]);
      });
      if (pts.length > 1) S("polyline", { points: pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" "), class: "pl-line" }, svg);
      box.innerHTML = ""; box.appendChild(svg);
      if (!REDUCED) { svg.classList.add("draw"); requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.remove("draw"))); }
      /* the form strip and the numbers */
      form.innerHTML = gs.map((g) => `<span class="${g.scored ? g.res.toLowerCase() : "n"}" title="${esc(shortDate(g.date))} ${g.home ? "vs" : "at"} ${esc(g.opp)}">${g.scored ? g.res : "·"}</span>`).join("");
      const w = sc.filter((g) => g.res === "W").length, l = sc.filter((g) => g.res === "L").length;
      const pf = sc.reduce((a, g) => a + g.us, 0) / (sc.length || 1), pa = sc.reduce((a, g) => a + g.them, 0) / (sc.length || 1);
      let run = 0, best = 0; for (const g of sc) { run = g.res === "W" ? run + 1 : 0; best = Math.max(best, run); }
      const big = sc.reduce((a, g) => (!a || g.us - g.them > a.us - a.them ? g : a), null);
      tiles.innerHTML = [[rec(w, l), "Record in the games on file"], [pf.toFixed(1), "Points a game"], [pa.toFixed(1), "Points allowed a game"], [best, "Longest winning streak"],
        [big && big.us > big.them ? `+${big.us - big.them}` : "—", big && big.us > big.them ? `Biggest win: ${big.us}–${big.them} ${big.home ? "vs" : "at"} ${short(big.opp)}` : "Biggest win"]]
        .map(([b, s]) => `<div class="lk-tile lk-hud"><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("");
      det.innerHTML = "Tap a bar to see the game. Bars above the line are wins, below are losses; outlined bars are tournament games.";
    }
    function show(g) {
      det.innerHTML = `<b>${esc(dateText(g.date))} · ${g.home ? "vs." : "at"} ${esc(g.opp)}</b> · ${g.scored ? `${g.res} ${g.us}–${g.them}` : "no score on file"}${g.type ? ` · ${esc(g.type)}` : ""}${g.note ? ` · ${esc(g.note)}` : ""}${g.story ? `<br><span class="pl-story">${esc(g.story)}</span>` : ""}`;
    }
    chips.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { season = b.dataset.s; render(); } });
    return { render };
  })();

  /* =====================================================================
     2 · ROAD TO THE GARDEN — the state tournament runs, read from the history
     ===================================================================== */
  const road = (function () {
    const chips = $("#road-years"), box = $("#road-path"), head = $("#road-head");
    let year = null;
    /* a run, from a line like "MIAA Division 3 state champions as the North's No. 2 seed: beat No. 10 Stoneham 64–54, …, then Wareham 68–45 at TD Garden and St. Joseph's Central 59–47 in the final" */
    function parse(post) {
      const m = String(post || "").match(/^(.*?) as the (?:North's )?No\. (\d+) seed(, after a bye)?:\s*(.+)$/);
      if (!m) return null;
      let [, reached, seed, bye, body] = m;
      const nm = body.match(/\s*\(([^)]*)\)\s*$/); const note = nm ? nm[1] : "";
      if (nm) body = body.slice(0, nm.index);
      const parts = body.split(/,\s*then\s+|,\s+|\s+and\s+(?=(?:No\. \d+ )?[A-Z])/).map((x) => x.trim()).filter(Boolean);
      const games = []; let mode = "beat";
      if (bye) games.push({ bye: true });
      for (let p of parts) {
        if (/^a first-round bye$/i.test(p)) { games.push({ bye: true }); continue; }
        if (/^then\s/i.test(p)) p = p.replace(/^then\s+/i, "");
        let lm = p.match(/^lost (\d+)–(\d+)( in overtime)? (to|at) (?:No\. (\d+) )?(.+?)$/);
        if (lm) { games.push({ res: "L", us: +lm[2], them: +lm[1], ot: !!lm[3], away: lm[4] === "at", seed: lm[5] ? +lm[5] : null, opp: lm[6] }); mode = "lost"; continue; }
        p = p.replace(/^beat\s+/i, "");
        const wm = p.match(/^(?:No\. (\d+) )?(.+?) (\d+)–(\d+)(.*)$/);
        if (wm) games.push({ res: "W", us: +wm[3], them: +wm[4], seed: wm[1] ? +wm[1] : null, opp: wm[2], tail: wm[5].trim() });
      }
      if (!games.some((g) => !g.bye)) return null;
      /* round names: the tails say which games were the North final, at TD Garden and the state final; the rest count back
         from the round the run reached */
      const champs = /state champions/i.test(reached);
      const modern = /Round of \d+|preliminary round/i.test(reached) && !/North/.test(reached);
      const ladder = modern ? ["Preliminary round", "Round of 32", "Round of 16", "Quarterfinal", "Semifinal", "Final"]
        : ["Preliminary round", "First round", "Quarterfinal", "Semifinal", "North final", "State semifinal", "State final"];
      const reachedName = /finalists/i.test(reached) ? "North final" : /semifinals/i.test(reached) ? "Semifinal" : /quarterfinals/i.test(reached) ? "Quarterfinal"
        : /first round/i.test(reached) ? "First round" : /second round/i.test(reached) ? "Second round" : /preliminary/i.test(reached) ? "Preliminary round"
        : (reached.match(/Round of \d+/) || [])[0] || (champs ? "State final" : "");
      games.forEach((g) => {
        if (/North title/i.test(g.tail || "")) g.round = "North final";
        else if (/TD Garden/i.test(g.tail || "")) g.round = "State semifinal · TD Garden";
        else if (/in the final/i.test(g.tail || "")) g.round = "State final";
        else if (/preliminary round/i.test(g.tail || "")) g.round = "Preliminary round";
      });
      /* count back from a named game: each earlier game (or bye) is the round before */
      const back = (idx, name) => {
        let k = ladder.indexOf(name);
        for (let i = idx; i >= 0; i--, k--) if (!games[i].round) games[i].round = k >= 0 ? ladder[k] : `Game ${i + 1}`;
      };
      const nf = games.findIndex((g) => g.round === "North final");
      if (champs && nf >= 0) back(nf, "North final");
      else if (ladder.includes(reachedName)) back(games.length - 1, reachedName);
      else games.forEach((g, i) => {
        if (g.round) return;
        g.round = i === games.length - 1 && reachedName ? reachedName : games[i - 1]?.round === "Preliminary round" ? "First round" : `Game ${i + 1}`;
      });
      return { reached, seed: +seed, games, note, champs };
    }
    function runs() { return (T().seasons || []).map((s) => ({ s, run: parse(s[6]) })).filter((x) => x.run).sort((a, b) => b.s[0] - a.s[0]); }
    function render() {
      const R = runs();
      if (!R.length) { box.innerHTML = '<p class="lk-detail">No tournament runs on file.</p>'; chips.innerHTML = ""; head.innerHTML = ""; return; }
      if (!R.some((x) => x.s[0] === year)) {
        /* open on the deepest run: titles first, then the most wins */
        year = [...R].sort((a, b) => (b.run.champs - a.run.champs) || (b.run.games.filter((g) => g.res === "W").length - a.run.games.filter((g) => g.res === "W").length) || b.s[0] - a.s[0])[0].s[0];
      }
      chips.innerHTML = R.map(({ s, run }) => `<button type="button" class="chip${run.champs ? " gold" : ""}" data-y="${s[0]}" aria-pressed="${s[0] === year}">${s[0] - 1}–${String(s[0]).slice(2)}${run.champs ? " ★" : ""}</button>`).join("");
      const { s, run } = R.find((x) => x.s[0] === year);
      head.innerHTML = `<span class="lk-k">${s[0] - 1}–${String(s[0]).slice(2)} · ${rec(s[1], s[2], s[3])} · coach ${esc(s[4])}</span><h3>${esc(run.reached.replace(/^MIAA /, ""))}</h3><p>Seeded <b>No. ${run.seed}</b>${run.games[0]?.bye ? ", with a first-round bye" : ""}.${run.note ? ` <span class="lk-fine">${esc(run.note[0].toUpperCase() + run.note.slice(1))}.</span>` : ""}</p>`;
      box.innerHTML = run.games.map((g, i) => g.bye ? `<li class="rd bye"><span class="rd-r">Bye</span><b>Advanced without playing</b></li>` :
        `<li class="rd ${g.res.toLowerCase()}" style="--i:${i}"><span class="rd-r">${esc(g.round || `Game ${i + 1}`)}</span>
          <span class="rd-o">${g.seed ? `<i>No. ${g.seed}</i> ` : ""}${esc(g.opp)}${g.away ? " (away)" : ""}</span>
          <span class="rd-s"><b>${g.res}</b> ${g.us}–${g.them}${g.ot ? " OT" : ""}</span></li>`).join("") +
        (run.champs ? `<li class="rd champ" style="--i:${run.games.length}"><span class="rd-r">Champions</span><b>${esc(run.reached.match(/Division \d+/)?.[0] || "")} state title</b><span class="rd-s">★</span></li>` : "");
      box.classList.remove("on");
      if (REDUCED) box.classList.add("on"); else requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add("on")));
    }
    chips.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { year = +b.dataset.y; render(); } });
    return { render, reset() { year = null; } };
  })();

  /* =====================================================================
     3 · CLUTCH METER
     ===================================================================== */
  const clutch = (function () {
    const chips = $("#clutch-scope"), box = $("#clutch-gauges");
    let scope = "all";
    function gauge(label, list, sub) {
      const w = list.filter((g) => g.res === "W").length, l = list.filter((g) => g.res === "L").length, t = list.filter((g) => g.res === "T").length;
      const p = pct(w, l, t), R = 46, C = Math.PI * R;
      return `<div class="lk-hud cl-g"><svg viewBox="0 0 120 70" class="cl-svg" aria-hidden="true"><path d="M14,62 A${R},${R} 0 0 1 106,62" class="cl-bg"/><path d="M14,62 A${R},${R} 0 0 1 106,62" class="cl-fg" style="stroke-dasharray:${(C * p).toFixed(1)} ${C.toFixed(1)}"/></svg>
        <b>${list.length ? Math.round(p * 100) + "%" : "—"}</b><span class="cl-l">${esc(label)}</span><span class="cl-r">${list.length ? rec(w, l, t) : "No games"}${sub ? ` · ${esc(sub)}` : ""}</span></div>`;
    }
    function render() {
      const ss = seasonsOnFile();
      if (scope !== "all" && !ss.includes(scope)) scope = "all";
      chips.innerHTML = [["all", `All ${ss.length} seasons`], ...ss.map((s) => [s, s])].map(([v, l]) => `<button type="button" class="chip" data-v="${esc(v)}" aria-pressed="${v === scope}">${esc(l)}</button>`).join("");
      const gs = scoredGames().filter((g) => scope === "all" || g.season === scope);
      const m = (g) => Math.abs(g.us - g.them);
      box.innerHTML = [
        gauge("Close games", gs.filter((g) => m(g) <= 5), "5 points or fewer"),
        gauge("Blowouts", gs.filter((g) => m(g) >= 20), "20 points or more"),
        gauge("At home", gs.filter((g) => g.home)),
        gauge("On the road", gs.filter((g) => !g.home)),
        gauge("League games", gs.filter((g) => g.type === "NEC")),
        gauge("Everything else", gs.filter((g) => g.type !== "NEC"), "non-league and tournaments"),
      ].join("");
    }
    chips.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { scope = b.dataset.v; render(); } });
    return { render };
  })();

  /* =====================================================================
     4 · FREE THROW CHALLENGE — stop the meter in the green; ten shots
     ===================================================================== */
  (function freeThrows() {
    const svg = $("#ft-svg"), meter = $("#ft-meter"), needle = $("#ft-needle"), zone = $("#ft-zone"), go = $("#ft-go"), shoot = $("#ft-shoot"), msg = $("#ft-msg"), score = $("#ft-score"), bestEl = $("#ft-best");
    let state = "idle", made = 0, taken = 0, streak = 0, pos = 0, dir = 1, speed = .9, zW = .2, zC = .5, raf = 0, last = 0, flying = false;
    const ball = $("#ft-ball"), path = $("#ft-path");
    const best = () => st.get("ft-best", 0);
    bestEl.textContent = best() ? `Best: ${best()}/10` : "";
    function setZone() {
      zW = Math.max(.07, .2 - streak * .018);                     // the green gets smaller with every make in a row
      zC = .35 + Math.random() * .3;
      zone.style.left = `${(zC - zW / 2) * 100}%`; zone.style.width = `${zW * 100}%`;
    }
    function loop(now) {
      if (state !== "aim") return;
      const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
      pos += dir * speed * dt;
      if (pos > 1) { pos = 1; dir = -1; } if (pos < 0) { pos = 0; dir = 1; }
      needle.style.left = `${pos * 100}%`;
      raf = requestAnimationFrame(loop);
    }
    function start() {
      made = 0; taken = 0; streak = 0; speed = .9; state = "aim"; last = 0;
      go.textContent = "Restart"; shoot.disabled = false; shoot.focus({ preventScroll: true });
      msg.textContent = "Tap Shoot (or press Space) when the needle is in the green.";
      score.textContent = "0/10"; setZone(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
    }
    function fire() {
      if (state !== "aim" || flying) return;
      state = "shot"; cancelAnimationFrame(raf);
      const off = (pos - zC) / (zW / 2);                          // -1..1 inside the green
      const make = Math.abs(off) <= 1, swish = Math.abs(off) <= .35;
      taken++;
      if (make) { made++; streak++; speed *= 1.08; } else streak = 0;
      fly(make, swish, off, () => {
        score.textContent = `${made}/${taken}`;
        if (taken >= 10) return finish();
        msg.textContent = make ? (swish ? "Swish!" : "In off the rim.") + (streak > 1 ? ` ${streak} in a row.` : "") : off > 0 ? "Long, off the back iron." : "Short. Front rim.";
        setZone(); state = "aim"; last = 0; raf = requestAnimationFrame(loop);
      });
    }
    /* the ball's flight: along the arc to the rim, then down through the net or off the iron */
    function fly(make, swish, off, done) {
      flying = true;
      const L = path.getTotalLength(), t0 = performance.now(), dur = REDUCED ? 1 : 750;
      const endX = make ? 0 : off > 0 ? 9 : -10, drop = make ? 26 : 10;
      const step = (now) => {
        const f = Math.min(1, (now - t0) / dur), p = path.getPointAtLength(f * L);
        ball.setAttribute("cx", (p.x + endX * f * f).toFixed(1)); ball.setAttribute("cy", p.y.toFixed(1));
        if (f < 1) return requestAnimationFrame(step);
        svg.classList.toggle("made", make); svg.classList.toggle("miss", !make);
        ball.setAttribute("cy", (p.y + drop).toFixed(1));
        setTimeout(() => { svg.classList.remove("made", "miss"); const p0 = path.getPointAtLength(0); ball.setAttribute("cx", p0.x); ball.setAttribute("cy", p0.y); flying = false; done(); }, REDUCED ? 200 : 520);
      };
      requestAnimationFrame(step);
    }
    function finish() {
      state = "done"; shoot.disabled = true; go.textContent = "Shoot ten more";
      const b = best(), pb = made > b; if (pb) { st.set("ft-best", made); bestEl.textContent = `Best: ${made}/10`; }
      msg.innerHTML = `<b>${made} for 10.</b> ${made === 10 ? "Perfect!" : made >= 8 ? "Ice in your veins." : made >= 5 ? "Not bad. The green shrinks as you get hot." : "Keep shooting."}${pb ? " That's your best yet." : ""}`;
    }
    go.addEventListener("click", start);
    shoot.addEventListener("pointerdown", (e) => { e.preventDefault(); fire(); });
    shoot.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); fire(); } });
    document.addEventListener("keydown", (e) => { if (state === "aim" && e.key === " " && document.activeElement !== shoot) { e.preventDefault(); fire(); } });
    /* stop when scrolled away */
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { if (!es[es.length - 1].isIntersecting && state === "aim") { cancelAnimationFrame(raf); state = "paused"; msg.textContent = "Paused. Press Restart to shoot again."; shoot.disabled = true; } }).observe(svg);
  })();

  /* =====================================================================
     5 · ERA TIMELINE
     ===================================================================== */
  const era = (function () {
    const box = $("#era-chart"), det = $("#era-detail"), key = $("#era-key");
    function render() {
      const t = T(), rows = (t.seasons || []).filter((s) => s[1] != null).sort((a, b) => a[0] - b[0]);
      if (!rows.length) { box.innerHTML = ""; return; }
      const y0 = rows[0][0], y1 = rows[rows.length - 1][0], n = y1 - y0 + 1;
      const W = 1000, H = 300, P = { l: 30, r: 8, t: 30, b: 34 }, bw = (W - P.l - P.r) / n;
      const titles = new Set(t.necTitles || []), states = new Map((t.banners || []).filter((b) => /State Champ/i.test(b.label)).map((b) => [b.year, b.label]));
      const coaches = [...new Set(rows.map((s) => s[4]).filter(Boolean))];
      const shade = (c) => `c${coaches.indexOf(c) % 4}`;
      const svg = S("svg", { viewBox: `0 0 ${W} ${H}`, class: "lk-svg era-svg", role: "img", "aria-label": `Every ${t.label.toLowerCase()} season on file, by winning percentage` });
      for (const p of [0, .25, .5, .75, 1]) {
        const y = H - P.b - p * (H - P.t - P.b);
        S("line", { x1: P.l, x2: W - P.r, y1: y, y2: y, class: "lk-gl" + (p === .5 ? " zero" : "") }, svg);
        const tx = S("text", { x: P.l - 5, y: y + 4, "text-anchor": "end", class: "lk-ax" }, svg); tx.textContent = `${p * 100}%`;
      }
      for (let y = Math.ceil(y0 / 10) * 10; y <= y1; y += 10) { const tx = S("text", { x: P.l + (y - y0) * bw + bw / 2, y: H - 12, "text-anchor": "middle", class: "lk-ax" }, svg); tx.textContent = y; }
      rows.forEach((s, i) => {
        const [yr, w, l, ti, coach, finish, post] = s, p = pct(w, l, ti || 0), x = P.l + (yr - y0) * bw, h = p * (H - P.t - P.b);
        const r = S("rect", { x: x + bw * .12, y: H - P.b - h, width: Math.max(2, bw * .76), height: Math.max(1.5, h), class: "era-bar " + shade(coach) + (states.has(yr) ? " state" : titles.has(yr) ? " nec" : ""), tabindex: "0", style: `--i:${i}` }, svg);
        if (states.has(yr)) { const tx = S("text", { x: x + bw / 2, y: H - P.b - h - 6, "text-anchor": "middle", class: "era-star" }, svg); tx.textContent = "★"; }
        else if (titles.has(yr)) S("circle", { cx: x + bw / 2, cy: H - P.b - h - 6, r: 2.6, class: "era-dot" }, svg);
        const show = () => { det.innerHTML = `<b>${yr - 1}–${String(yr).slice(2)}: ${rec(w, l, ti)}</b>${coach ? ` · coach ${esc(coach)}` : ""}${states.has(yr) ? ` · <b>${esc(states.get(yr))}</b>` : ""}${finish ? ` · ${esc(finish)}` : ""}${post ? `<br>${esc(post)}` : ""}`; $$(".era-bar.on", svg).forEach((b) => b.classList.remove("on")); r.classList.add("on"); };
        r.addEventListener("pointerenter", show); r.addEventListener("focus", show); r.addEventListener("click", show);
      });
      box.innerHTML = ""; box.appendChild(svg);
      box.classList.remove("on");
      if (REDUCED) box.classList.add("on"); else K.onView(box, () => box.classList.add("on"));
      const gaps = n - rows.length;
      key.innerHTML = `<span><i class="k-star">★</i> State champions</span><span><i class="k-dot"></i> NEC champions</span><span>Shades change with the coach</span>${gaps ? `<span>${gaps} season${gaps === 1 ? "" : "s"} between ${y0} and ${y1} have no record on file</span>` : ""}`;
      const best = rows.reduce((a, s) => (pct(s[1], s[2], s[3] || 0) > pct(a[1], a[2], a[3] || 0) ? s : a));
      det.innerHTML = `Tap a season. The best on file: <b>${best[0] - 1}–${String(best[0]).slice(2)}, ${rec(best[1], best[2], best[3])}</b>${best[4] ? ` under ${esc(best[4])}` : ""}.`;
    }
    return { render };
  })();

  function all() { pulse.render(); road.render(); clutch.render(); era.render(); }
  team.on(() => road.reset());          // a new team opens on its own deepest run
  team.on(all);
  hero(); all(); K.barSpy();
})();
