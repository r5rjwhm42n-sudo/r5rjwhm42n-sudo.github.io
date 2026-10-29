/* Danvers Falcons Volleyball — page rendering. Content lives in data.js. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const page = document.body.dataset.page;
  const LOGO = "images/falcons-logo.png";

  const T = TEAM;
  const SEASON = TEAM.season;

  const REGULAR = SCHEDULE.filter((g) => !g.scrimmage);
  const PRESEASON = SCHEDULE.filter((g) => g.scrimmage);
  const played = REGULAR.filter((g) => g.result);
  const upcoming = REGULAR.filter((g) => !g.result && !g.cancelled);
  const past = REGULAR.filter((g) => g.result || g.cancelled);
  const count = (list, r) => list.filter((g) => g.result === r).length;
  const rec = (f = () => true) => {
    const g = played.filter(f);
    return `${count(g, "W")}–${count(g, "L")}`;
  };
  const record = rec();
  const setsWon = played.reduce((n, g) => n + g.us, 0);
  const setsLost = played.reduce((n, g) => n + g.them, 0);
  const sweeps = played.filter((g) => g.result === "W" && !g.them).length;
  const fiveSetWins = played.filter((g) => g.result === "W" && g.us + g.them === 5).length;

  const fmt = (iso, opts) => new Date(iso).toLocaleString("en-US", opts);
  const dateLong = (iso) => fmt(iso, { weekday: "long", month: "long", day: "numeric" });
  const dateShort = (iso) => fmt(iso, { weekday: "short", month: "short", day: "numeric" });
  const timeOf = (iso) => fmt(iso, { hour: "numeric", minute: "2-digit" });
  const vs = (g) => (g.home ? "vs" : "at");
  const kind = (g) => (g.scrimmage ? "Preseason" : g.league ? "NEC" : "Non-league");
  const outcome = { W: "Win", L: "Loss" };
  const plural = (n, word, s = "s") => `${n} ${word}${n === 1 ? "" : s}`;
  const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const tile = ([k, v, d]) => `<div class="card tile"><div class="k">${k}</div><div class="v count ${String(v).length > 8 ? "long" : ""}">${v}</div><div class="d">${d}</div></div>`;

  /* ---------- Player and team numbers, added up from the box lines in data.js ---------- */
  const KEYS = ["sp", "k", "a", "b", "d", "as", "att", "e", "r"];
  const LABELS = { sp: "SP", k: "K", a: "A", b: "B", d: "D", as: "AST", att: "ATT", e: "E", r: "R", hit: "HIT" };
  const blank = () => Object.fromEntries(KEYS.map((key) => [key, 0]));
  const lineOf = (row) => Object.fromEntries(KEYS.map((key, i) => [key, row[i]]));
  const add = (into, x) => { KEYS.forEach((key) => { into[key] += x[key]; }); return into; };
  const teamLine = (g) => Object.values(g.box || {}).reduce((t, row) => add(t, lineOf(row)), blank());
  const hitVal = (x) => (x.att ? (x.k - x.e) / x.att : null);
  const pct3 = (v) => (v == null ? "—" : v.toFixed(3).replace(/^(-?)0\./, "$1."));
  const hitPct = (x) => pct3(hitVal(x));

  const tally = {};
  played.forEach((g) => Object.entries(g.box || {}).forEach(([name, row]) => {
    const t = (tally[name] ??= { ...blank(), games: {} });
    add(t, t.games[g.id] = lineOf(row));
  }));
  const ROSTER = PLAYERS.map((p) => {
    const t = { ...blank(), games: {}, ...tally[p.name], ...p.totals };
    return { ...p, line: t, sets: t.sp, kills: t.k, aces: t.a, blocks: t.b, digs: t.d, assists: t.as, receptions: t.r,
             hit: hitVal(t), points: t.k + t.a + t.b, games: t.games };
  });
  const TOTALS = played.reduce((t, g) => add(t, { ...teamLine(g), sp: g.us + g.them }), blank());
  const logLine = (x) => ["k", "a", "b", "d", "as", "r"].filter((key) => x[key]).map((key) => `${x[key]} ${LABELS[key]}`).join(" · ") || "Played";
  const streak = (() => {
    const last = played[played.length - 1];
    if (!last) return "";
    let n = 0;
    for (let i = played.length - 1; i >= 0 && played[i].result === last.result; i--) n++;
    return `${last.result === "W" ? "Won" : "Lost"} ${n}`;
  })();
  const R = T.ranking;
  const seed = T.bracket?.seeds ? T.bracket.seeds.findIndex((s) => /^Danvers\b/.test(s)) + 1 : 0;   // once the MIAA bracket is out

  /* ---------- Top bar, header, scoreboard strip, footer ---------- */
  const NAV = [["index.html", "Home", "home"], ["stats.html", "Stats", "stats"], ["schedule.html", "Schedule", "schedule"],
               ["history.html", "History", "history"], ["media.html", "Media", "media"]];
  const header = $("#site-header");
  header.insertAdjacentHTML("beforebegin", `
    <div class="topbar"><div class="wrap">
      <span class="tb-info">${esc(T.school)} · ${esc(T.conference)} · ${esc(T.division)}</span>
      <span class="tb-links"><a href="${T.links.hudl}" target="_blank" rel="noopener">Hudl</a><a href="${T.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a><a href="../">All Sports</a></span>
    </div></div>`);
  header.innerHTML = `
    <div class="wrap hbar">
      <a class="brand" href="index.html">
        <span class="badge"><img src="${LOGO}" alt="Danvers Falcons logo"></span>
        <span class="brand-text">Danvers Falcons<small>${esc(T.sport)}</small></span>
      </a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">Menu</button>
      <nav class="nav" aria-label="Main">
        ${NAV.map(([href, label, id]) => `<a href="${href}" class="${id === page ? "active" : ""}">${label}</a>`).join("")}
      </nav>
    </div>`;
  header.insertAdjacentHTML("afterend", `
    <div class="scores"><div class="wrap">
      <div class="scores-label">${SEASON}<br>Schedule</div>
      <div class="scores-track">${REGULAR.map((g) => `
        <button class="sc ${g === upcoming[0] ? "next" : ""}" data-game="${g.id}">
          <div class="when">${dateShort(g.date)}${g.result ? " · Final" : ""}</div>
          <div class="who">${vs(g)} ${esc(g.opponent)}</div>
          <div class="res ${g.cancelled ? "cx" : g.result || "up"}">${g.cancelled ? "Cancelled" : g.result ? `${g.result} ${g.us}–${g.them}` : timeOf(g.date)}</div>
        </button>`).join("")}</div>
    </div></div>`);
  $(".nav-toggle").addEventListener("click", (e) => {
    const open = $(".nav").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });
  $("#site-footer").innerHTML = `
    <div class="wrap foot-top">
      <span class="badge"><img src="${LOGO}" alt=""></span>
      <div class="go">Go Falcons<small>${esc(T.school)} ${esc(T.sport)}</small></div>
    </div>
    <div class="wrap foot-bot">
      <div>
        ${esc(T.address)}<br>
        ${esc(T.conference)} · ${esc(T.division)} · Head Coach ${esc(T.headCoach)}
      </div>
      <div class="links">
        <a href="${T.links.hudl}" target="_blank" rel="noopener">Hudl</a>
        <a href="${T.links.maxpreps}" target="_blank" rel="noopener">MaxPreps</a>
        <a href="${T.links.school}" target="_blank" rel="noopener">School Page</a>
        <a href="${T.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a>
      </div>
    </div>`;
  /* ---------- Pieces reused across pages ---------- */
  function gameRow(g) {
    const d = new Date(g.date);
    const res = g.cancelled
      ? `<div class="result cancelled">Cancelled</div>`
      : g.result
      ? `<div class="result"><span class="wl ${g.result}">${g.result}</span>${g.us}–${g.them}</div>`
      : g.scrimmage
      ? `<div class="result cancelled">Scrimmage</div>`
      : `<div class="result upcoming">${timeOf(g.date)}</div>`;
    return `
      <button class="game ${g.cancelled ? "is-cancelled" : ""}" data-game="${g.id}">
        <div class="datebox">
          <div class="m">${fmt(g.date, { month: "short" })}</div>
          <div class="d">${d.getDate()}</div>
          <div class="w">${fmt(g.date, { weekday: "short" })}</div>
        </div>
        <div>
          <div class="opp"><small>${vs(g).toUpperCase()}</small>${esc(g.opponent)}</div>
          <div class="meta">
            <span class="tag ${g.home ? "home" : ""}">${g.home ? "Home" : "Away"}</span>
            <span class="tag">${kind(g)}</span>
            <span>${esc(g.site)}</span>
          </div>
        </div>
        ${res}
        <div class="chev" aria-hidden="true">›</div>
      </button>`;
  }

  function gameModal(g) {
    const head = g.result
      ? `<div class="scoreline">
           <div class="team"><img src="${LOGO}" alt="">Danvers</div>
           <div class="nums">${g.us}<i>–</i>${g.them}</div>
           <div class="team">${esc(g.opponent)}</div>
         </div>`
      : `<h2>${vs(g)} ${esc(g.opponent)} ${esc(g.mascot || "")}</h2>`;
    let body = "";
    if (g.summary) body += `<h4>Recap</h4><p>${esc(g.summary)}</p>`;
    if (g.cancelled) body += `<h4>Cancelled</h4><p>Originally scheduled for ${dateLong(g.date)} at ${timeOf(g.date)}, ${esc(g.site)}.</p>`;
    else if (g.scrimmage && !g.result) body += `<h4>Preseason</h4><p>${dateLong(g.date)} · ${timeOf(g.date)}<br>${esc(g.site)}</p><p>Scrimmage — no result is kept.</p>`;
    else if (!g.result) body += `<h4>Match Time</h4><p>${dateLong(g.date)} · ${timeOf(g.date)}<br>${esc(g.site)}</p>`;
    if (g.result && !g.scrimmage) {
      const cells = (i) => g.sets.map((set) => `<td class="${set[i] > set[1 - i] ? "w" : ""}">${set[i]}</td>`).join("");
      body += g.sets?.length
        ? `<h4>Set Scores</h4><table class="line"><tr><th></th>${g.sets.map((_, i) => `<th>${i + 1}</th>`).join("")}<th>Sets</th></tr>
             <tr><td>Danvers</td>${cells(0)}<td>${g.us}</td></tr>
             <tr><td>${esc(g.opponent)}</td>${cells(1)}<td>${g.them}</td></tr></table>`
        : "";
      if (g.box) {
        const t = teamLine(g);
        body += `<h4>Danvers Box Score</h4>`;
        /* columns marked opt are dropped on phones so the table fits */
        const COLS = [["sp", 1], ["k"], ["e", 1], ["att", 1], ["hit"], ["a"], ["b"], ["d"], ["as"], ["r", 1]];
        const cell = (x, key, opt, tot) => {
          const v = key === "hit" ? (x.att ? hitPct(x) : "") : x[key];
          return `<td class="${opt ? "opt " : ""}${!tot && !v ? "z" : ""}">${v === "" ? "–" : v}</td>`;
        };
        body += `<div class="table-scroll"><table class="box">
          <tr><th>Player</th>${COLS.map(([key, opt]) => `<th class="${opt ? "opt" : ""}">${LABELS[key]}</th>`).join("")}</tr>
          ${Object.entries(g.box).map(([name, row]) => `<tr><td>${esc(name)}</td>${COLS.map(([key, opt]) => cell(lineOf(row), key, opt)).join("")}</tr>`).join("")}
          <tr class="tot"><td>Team</td>${COLS.map(([key, opt]) => cell({ ...t, sp: g.us + g.them }, key, opt, true)).join("")}</tr>
        </table></div>
        <p class="box-key">SP sets played · K kills · E attack errors · ATT attempts · HIT hitting % · A aces · B blocks · D digs · AST assists · R serve receptions</p>`;
        if (t.att) body += `<p class="assist-line"><b>Team hitting:</b> ${hitPct(t)} (${plural(t.k, "kill")}, ${plural(t.e, "error")}, ${t.att} attempts)</p>`;
      }
    }
    if (g.standouts?.length) body += `<h4>Also Stood Out</h4><div class="srcs">${g.standouts.map((n) => `<span class="tag">${esc(n)}</span>`).join("")}</div>`;
    if (g.notes?.length) body += `<h4>Notes</h4><ul>${g.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [
      ...(g.sources || []),
      ...(g.result || g.cancelled || g.scrimmage ? [] : [{ label: "Watch live on Hudl", url: T.links.hudl }])
    ];
    if (srcs.length) body += `<h4>Links &amp; Sources</h4><div class="srcs">${srcs.map((s) => s.url
      ? `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`
      : `<span class="src-text">${esc(s.label)}</span>`).join("")}</div>`;

    return `
      <div class="modal-head">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="eyebrow">${dateLong(g.date)} · ${g.home ? "Home" : "Away"} · ${kind(g)}${g.cancelled ? " · Cancelled" : g.result ? ` · ${outcome[g.result]}` : ""}</div>
        ${head}
      </div>
      <div class="modal-body">${body}</div>`;
  }

  /* Any element with data-game (schedule rows, the top strip, the hero) opens the game popup */
  const dlg = document.createElement("dialog");
  dlg.className = "modal";
  document.body.appendChild(dlg);
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target.closest(".modal-close")) dlg.close();
  });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-game]");
    if (!btn) return;
    dlg.innerHTML = gameModal(SCHEDULE.find((g) => g.id === +btn.dataset.game));
    dlg.showModal();
  });

  const LEADER_CATS = { kills: "Kills", aces: "Aces", blocks: "Blocks", digs: "Digs", assists: "Assists", points: "Points Won" };
  function leaders(keys) {
    return keys.map((key) => {
      const best = Math.max(...ROSTER.map((p) => p[key]), 0);
      const who = ROSTER.filter((p) => best && p[key] === best).map((p) => p.name);
      const names = who.slice(0, 2).join(" & ") + (who.length > 2 ? ` +${who.length - 2}` : "");
      return `<div class="card leader"><div class="big count">${best}</div><div><div class="cat">${LEADER_CATS[key]}</div><div class="who">${esc(names) || "—"}</div></div></div>`;
    }).join("");
  }

  /* ---------- HOME ---------- */
  function home() {
    const next = upcoming[0];
    const prev = played[played.length - 1];

    if (prev) {
      const headline = {
        W: `Falcons beat ${esc(prev.opponent)} ${prev.us}–${prev.them}, move to ${record}`,
        L: `Falcons fall to ${esc(prev.opponent)}, ${prev.them}–${prev.us}`
      }[prev.result];
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(prev.date)}</div>
        <h1>${headline}</h1>
        <p>${esc(prev.summary || `The Falcons are ${record} through ${plural(played.length, "match", "es")}.`)}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-game="${prev.id}">Match recap</button>
          <a class="btn btn-ghost" href="schedule.html">Full schedule</a>
        </div>`;
      const row = (name, pts, win, logo) => `
        <div class="sb-row ${win ? "win" : ""}">
          ${logo ? `<img src="${LOGO}" alt="">` : `<span class="dot">${esc(name[0])}</span>`}
          <span class="nm">${esc(name)}</span><span class="pts">${pts}</span>
        </div>`;
      const dan = row("Danvers", prev.us, prev.us >= prev.them, true);
      const opp = row(prev.opponent, prev.them, prev.them >= prev.us, false);
      const setLine = (prev.sets || []).map(([us, them]) => `${us}–${them}`).join(", ");
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard" data-game="${prev.id}" aria-label="Last match details">
          <div class="sb-top"><span>Final</span><span>${prev.home ? "Home" : "Away"} · ${kind(prev)}</span></div>
          ${prev.home ? opp + dan : dan + opp}
          <div class="sb-foot"><span>${setLine ? `Sets: ${setLine}` : ""}</span><b>Match details ›</b></div>
        </button>`;
    } else {
      $("#hero-story").innerHTML = `
        <div class="eyebrow">${SEASON} season</div>
        <h1>${esc(T.name)} ${esc(T.sport)}</h1>
        <p>Scores, stats, history and highlights from ${esc(T.school)} ${esc(T.sport.toLowerCase())}.</p>
        <div class="btn-row"><a class="btn btn-primary" href="schedule.html">Full schedule</a></div>`;
    }

    $("#scorestrip").innerHTML =
      tile(["Record", record, `NEC ${rec((g) => g.league)} · Sets ${setsWon}–${setsLost} · ${streak}`]) +
      (next ? `<button class="card next-game" data-game="${next.id}">
        <div>
          <div class="k">Next match</div>
          <h3>${vs(next)} ${esc(next.opponent)}</h3>
          <div class="meta">${dateLong(next.date)} · ${timeOf(next.date)} · ${esc(next.site)}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : `<div class="card next-game"><div><div class="k">Regular season complete</div><h3>Final record ${record}</h3></div></div>`) +
      (seed ? `<a class="card tile rank-tile" href="/#bracket-volleyball"><div class="k">State tournament</div><div class="v">#${seed}</div><div class="d">seed in ${esc(T.division.replace("MIAA ", ""))} · see the bracket →</div></a>`
       : R ? `<a class="card tile rank-tile" href="${R.url}" target="_blank" rel="noopener"><div class="k">MIAA ${esc(T.division.replace("MIAA ", ""))}</div><div class="v">#${R.rank}</div><div class="d">of ${R.of} in the power rankings · ${esc(R.asOf)} ↗</div></a>`
         : tile(["Sets", `${setsWon}–${setsLost}`, `${plural(sweeps, "sweep")} · ${plural(fiveSetWins, "five-set win")}`]));

    $("#home-leaders").innerHTML = leaders(["kills", "assists", "digs"]);
    $("#home-games").innerHTML = [...past.slice(-2), ...upcoming.slice(0, 3)].map(gameRow).join("");

    if (next) {
      const tick = () => {
        const ms = Math.max(0, new Date(next.date) - new Date());
        const parts = [["Days", ms / 864e5], ["Hrs", (ms / 36e5) % 24], ["Min", (ms / 6e4) % 60]];
        $("#countdown").innerHTML = ms
          ? parts.map(([l, v]) => `<div><b>${String(Math.floor(v)).padStart(2, "0")}</b><span>${l}</span></div>`).join("")
          : `<div><b>Match day</b><span>Go Falcons</span></div>`;
      };
      tick();
      setInterval(tick, 30000);
    }
  }

  /* ---------- STATS ---------- */
  function stats() {
    const n = TOTALS.sp || 1;
    $("#stats-asof").textContent = STATS_AS_OF;
    $("#coach-line").textContent = `Head coach ${T.headCoach} (${T.coachNote}). Program coaches: ${T.assistants.join(", ")}.`;
    $("#stat-sheet-link").href = T.links.maxprepsStats;
    $("#team-tiles").innerHTML = [
      ["Record", record, `NEC ${rec((g) => g.league)}${R ? ` · No. ${R.rank} in ${T.division.replace("MIAA ", "")}` : ""}`],
      ["Sets", `${setsWon}–${setsLost}`, `${plural(sweeps, "sweep")} · ${plural(fiveSetWins, "five-set win")}`],
      ["Kills per set", (TOTALS.k / n).toFixed(1), `${TOTALS.k} kills · ${hitPct(TOTALS)} hitting`],
      ["Aces per set", (TOTALS.a / n).toFixed(1), `${TOTALS.a} aces in ${TOTALS.sp} sets`]
    ].map(tile).join("");
    $("#leaders").innerHTML = leaders(["kills", "aces", "blocks", "digs", "assists", "points"]);

    const scorers = ROSTER.filter((p) => p.points).sort((a, b) => b.points - a.points || b.kills - a.kills);
    const max = Math.max(...scorers.map((p) => p.points), 1);
    const seg = (cls, v, word) => (v ? `<span class="${cls}" style="flex:${v}" title="${plural(v, word)}">${v}</span>` : "");
    $("#scoring").innerHTML = scorers.length ? `
      <div class="legend-row"><span><i class="s2"></i>Kills</span><span><i class="s3"></i>Aces</span><span><i class="s4"></i>Blocks</span></div>
      ${scorers.map((p) => `<div class="bar-row">
          <div class="nm">${esc(p.name)}<small>${[p.pos.join(" / "), p.grade].filter(Boolean).join(" · ")}</small></div>
          <div class="bar-track"><div class="bar-fill" style="--w:${(p.points / max * 100).toFixed(1)}%">
            ${seg("s2", p.kills, "kill")}${seg("s3", p.aces, "ace")}${seg("s4", p.blocks, "block")}
          </div></div>
          <div class="tot">${p.points}<small>${p.kills} K · ${p.aces} A · ${p.blocks} B</small></div>
        </div>`).join("")}` : `<div class="empty">No points recorded yet.</div>`;

    /* Season stat sheet — click a column heading to sort by it */
    const SHEET = [
      ["num", "#", (p) => p.num ?? "", "asc"], ["name", "Player", (p) => p.name, "asc"],
      ["sp", "SP", (p) => p.sets], ["k", "K", (p) => p.kills], ["ks", "K/S", (p) => p.kills / (p.sets || 1), "", 1],
      ["e", "E", (p) => p.line.e], ["att", "ATT", (p) => p.line.att], ["hit", "HIT", (p) => p.hit ?? -9, "", 3],
      ["a", "A", (p) => p.aces], ["b", "B", (p) => p.blocks], ["d", "D", (p) => p.digs], ["ds", "D/S", (p) => p.digs / (p.sets || 1), "", 1],
      ["as", "AST", (p) => p.assists], ["r", "R", (p) => p.receptions], ["pts", "PTS", (p) => p.points]
    ];
    const show = (col, p) => {
      const v = col[2](p);
      if (col[0] === "hit") return pct3(p.hit);
      return col[4] ? v.toFixed(col[4]) : esc(v);
    };
    let sortKey = "pts", sortDir = -1;
    const drawSheet = () => {
      const col = SHEET.find((c) => c[0] === sortKey);
      const rows = ROSTER.filter((p) => p.sets).sort((a, b) => {
        const x = col[2](a), y = col[2](b);
        return (typeof x === "string" ? String(x).localeCompare(y) : x - y) * sortDir || b.points - a.points;
      });
      const team = { num: "", name: "Team", sets: TOTALS.sp, kills: TOTALS.k, aces: TOTALS.a, blocks: TOTALS.b, digs: TOTALS.d,
                     assists: TOTALS.as, receptions: TOTALS.r, points: TOTALS.k + TOTALS.a + TOTALS.b, hit: hitVal(TOTALS), line: TOTALS };
      $("#sheet").innerHTML = `<table class="box sheet">
        <thead><tr>${SHEET.map((c) => `<th><button data-sort="${c[0]}" class="${c[0] === sortKey ? (sortDir < 0 ? "down" : "up") : ""}">${c[1]}</button></th>`).join("")}</tr></thead>
        <tbody>${rows.map((p) => `<tr>${SHEET.map((c) => `<td>${show(c, p)}</td>`).join("")}</tr>`).join("")}</tbody>
        <tfoot><tr class="tot">${SHEET.map((c) => `<td>${show(c, team)}</td>`).join("")}</tr></tfoot>
      </table>`;
    };
    $("#sheet").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-sort]");
      if (!btn) return;
      const col = SHEET.find((c) => c[0] === btn.dataset.sort);
      sortDir = btn.dataset.sort === sortKey ? -sortDir : col[3] === "asc" ? 1 : -1;
      sortKey = btn.dataset.sort;
      drawSheet();
    });
    drawSheet();

    const groupOf = (p) => Object.keys(POSITION_GROUPS).filter((grp) => p.pos.some((x) => POSITION_GROUPS[grp].includes(x)));
    const groups = ["All", ...Object.keys(POSITION_GROUPS).filter((grp) => ROSTER.some((p) => groupOf(p).includes(grp)))];
    let active = "All", q = "";

    $("#filters").innerHTML = groups.map((grp) => `<button class="chip" aria-pressed="${grp === "All"}" data-group="${grp}">${grp}</button>`).join("")
      + `<input class="search" type="search" placeholder="Search players…" aria-label="Search players">`;

    const statBoxes = (p) => (p.sets
      ? [["Kills", p.kills], ["Hit %", pct3(p.hit)], ["Aces", p.aces], ["Blocks", p.blocks],
         ["Digs", p.digs], ["Assists", p.assists], ["Receptions", p.receptions], ["Sets", p.sets]]
      : []);
    const draw = () => {
      const list = ROSTER.filter((p) =>
        (active === "All" || groupOf(p).includes(active)) &&
        p.name.toLowerCase().includes(q));
      $("#players").innerHTML = list.length ? list.map((p) => `
        <article class="card player">
          <div class="player-top">
            <div class="jersey ${p.num == null ? "unknown" : ""}">${p.num ?? esc(initials(p.name))}</div>
            <div>
              <h3>${esc(p.name)}</h3>
              <div class="posline">
                ${p.pos.map((x) => `<span class="pos">${x}</span>`).join("")}
                ${p.grade ? `<span>${p.grade}</span>` : ""}
                ${p.captain ? `<span class="cap">CAPTAIN</span>` : ""}
              </div>
            </div>
          </div>
          ${statBoxes(p).length ? `<div class="player-stats eight">${statBoxes(p).map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>` : ""}
          ${played.some((g) => p.games[g.id]) ? `<div class="player-log">
            ${played.filter((g) => p.games[g.id]).map((g) =>
              `<div class="row"><span class="opp">${vs(g)} ${esc(g.opponent)}</span><span>${logLine(p.games[g.id])}</span></div>`).join("")}
          </div>` : ""}
        </article>`).join("") : `<div class="empty card" style="grid-column:1/-1">No players match.</div>`;
    };
    $("#filters").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      active = chip.dataset.group;
      $$("#filters .chip").forEach((c) => c.setAttribute("aria-pressed", c === chip));
      draw();
    });
    $("#filters .search").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
    draw();
  }

  /* ---------- SCHEDULE ---------- */
  function schedule() {
    $("#sched-tiles").innerHTML = [
      ["Overall", record, `${SEASON} season · W–L`],
      ["NEC", rec((g) => g.league), "Conference opponents"],
      ["Home", rec((g) => g.home), T.stadium],
      ["Away", rec((g) => !g.home), "On the road"]
    ].map(tile).join("");
    $("#results").innerHTML = past.length ? [...past].reverse().map(gameRow).join("") : `<div class="empty">No matches played yet.</div>`;
    if (seed) $("#rank-pill").innerHTML = `<a href="/#bracket-volleyball">No. ${seed} seed in the ${esc(T.division)} tournament · see the bracket →</a>`;
    else if (R) $("#rank-pill").innerHTML = `<a href="${R.url}" target="_blank" rel="noopener">MIAA ${esc(T.division.replace("MIAA ", ""))} power ranking: No. ${R.rank} of ${R.of} · ${esc(R.asOf)}</a>`;
    $("#upcoming").innerHTML = upcoming.length ? upcoming.map(gameRow).join("") : `<div class="empty">Regular season complete.</div>`;
    $("#preseason-block").hidden = !PRESEASON.length;
    $("#preseason").innerHTML = PRESEASON.map(gameRow).join("");
  }

  /* ---------- HISTORY ---------- */
  const YEARS = SEASONS.map(([year, w, l, t, coach, finish, post, caveat]) => ({ year, w, l, t, coach, finish, post, caveat }));
  const pct = (s) => (s.w + s.t / 2) / (s.w + s.l + s.t);
  const wl = (s) => `${s.w}–${s.l}${s.t ? `–${s.t}` : ""}`;
  const isTitle = (s) => NEC_TITLES.includes(s.year);

  /* Wins by year. Seasons the record book has no record for leave a gap in the line. */
  function winChart() {
    const data = YEARS.filter((s) => s.w != null).reverse();
    const first = data[0].year, lastYr = data[data.length - 1].year;
    const W = 900, H = 290, L = 34, R = 18, T0 = 24, B = 36, top = 25;
    const x = (yr) => L + (yr - first) * (W - L - R) / (lastYr - first);
    const y = (w) => T0 + (1 - w / top) * (H - T0 - B);
    const runs = data.reduce((all, s, i) => {
      if (i && s.year === data[i - 1].year + 1) all[all.length - 1].push(s); else all.push([s]);
      return all;
    }, []);
    const d = (run) => run.map((s, i) => `${i ? "L" : "M"}${x(s.year).toFixed(1)} ${y(s.w).toFixed(1)}`).join(" ");
    const labels = [];
    for (let yr = first; yr <= lastYr; yr += 2) labels.push(yr);
    return `
      <div class="key"><span><i></i>Wins per season</span><span><i class="t"></i>NEC title year</span></div>
      <div class="table-scroll"><svg viewBox="0 0 ${W} ${H}" style="min-width:720px" role="img" aria-label="Wins per season, ${first} to ${lastYr}">
        ${[0, 5, 10, 15, 20, 25].map((v) => `<line class="gridl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        ${labels.map((yr) => `<text x="${x(yr).toFixed(1)}" y="${H - 10}" text-anchor="middle">${yr}</text>`).join("")}
        ${runs.map((run) => `
          <path class="area" d="${d(run)} L${x(run[run.length - 1].year).toFixed(1)} ${y(0)} L${x(run[0].year).toFixed(1)} ${y(0)} Z"/>
          <path class="ln" pathLength="1" d="${d(run)}"/>`).join("")}
        ${data.map((s) => `
          <circle class="pt ${isTitle(s) ? "title" : ""}" cx="${x(s.year).toFixed(1)}" cy="${y(s.w).toFixed(1)}" r="${isTitle(s) ? 5.5 : 3.5}"><title>${s.year}: ${wl(s)}${isTitle(s) ? " · NEC Champions" : ""}${s.post ? " · " + esc(s.post) : ""}</title></circle>`).join("")}
      </svg></div>`;
  }

  function history() {
    const full = YEARS.filter((s) => s.w != null);
    $("#history-intro").textContent = HISTORY_INTRO;
    $("#banners").innerHTML = BANNERS.map((b) => `<div class="banner"><img src="${LOGO}" alt=""><div class="y">${b.year}</div><div class="l">${esc(b.label)}</div></div>`).join("");
    $("#nec-titles").innerHTML = `
      <div><div class="big count">${NEC_TITLES.length}</div><div class="cat">Northeastern Conference titles</div></div>
      <div class="years">${NEC_TITLES.map((yr) => `<span>${yr}</span>`).join("")}</div>`;
    $("#history-note").textContent = HISTORY_NOTE;
    $("#chart-span").textContent = `${full[full.length - 1].year} to ${full[0].year}`;
    $("#win-chart").innerHTML = winChart();

    const sum = (k) => full.reduce((n, s) => n + s[k], 0);
    const best = full.filter((s) => !s.caveat).sort((a, b) => b.w - a.w || pct(b) - pct(a))[0];
    $("#history-tiles").innerHTML = [
      ["NEC titles", NEC_TITLES.length, `First in ${NEC_TITLES[0]} · latest in ${NEC_TITLES[NEC_TITLES.length - 1]}`],
      ["All-time record", wl({ w: sum("w"), l: sum("l"), t: sum("t") }), `${full.length} seasons in the record book`],
      ["Most wins", wl(best), `${best.year} · ${best.post}`],
      HISTORY_TILE
    ].map(tile).join("");

    $("#legends").innerHTML = LEGENDS.map((p, i) => `
      <article class="card legend">
        <div class="top">
          <div><h3>${esc(p.name)}</h3><div class="role">${esc(p.role)}</div></div>
          <div class="rank">${i + 1}</div>
        </div>
        <div class="body">
          <p>${esc(p.bio)}</p>
          <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </article>`).join("");

    $("#record-book").innerHTML = Object.entries(RECORDS).map(([title, lists]) => `
      <h3 class="book-head">${title}</h3>
      <div class="grid g4">${Object.entries(lists).map(([cat, rows]) => `
        <div class="card book"><div class="k">${cat}</div><ol>${rows.map(([name, num, when]) =>
          `<li><b>${num}</b><span>${esc(name)}${when ? `<small>${esc(when)}</small>` : ""}</span></li>`).join("")}</ol></div>`).join("")}</div>`).join("");
    $("#record-book-link").href = T.links.recordBook;

    const SHOWN = 15;
    $("#records").innerHTML = YEARS.map((s, i) => `<tr${i >= SHOWN ? ' class="older" hidden' : ""}>
        <td class="yr">${s.year}</td>
        <td class="rec">${s.w == null ? "–" : wl(s)}${s.caveat ? `<small>${esc(s.caveat)}</small>` : ""}</td>
        <td>${s.w == null ? "" : `<div class="bar" title="${(pct(s) * 100).toFixed(0)}% (ties count as half a win)"><i style="width:${pct(s) * 100}%"></i></div>`}</td>
        <td>${esc(s.coach)}</td>
        <td>${isTitle(s) ? `<span class="note-pill">NEC Champions</span>${s.finish ? ` ${esc(s.finish)}` : ""}` : esc(s.finish)}</td>
        <td>${esc(s.post)}</td>
      </tr>`).join("");
    const more = $("#records-more");
    more.textContent = `Show all ${YEARS.length} seasons`;
    more.addEventListener("click", () => { $$("#records .older").forEach((tr) => { tr.hidden = false; }); more.hidden = true; });

    $("#timeline").innerHTML = MILESTONES.map((m) => `<div class="item"><div class="y">${esc(m.year)}</div><p>${esc(m.text)}</p></div>`).join("");
  }

  /* ---------- MEDIA ---------- */
  function media() {
    $("#hudl-home").href = T.links.hudl;
    $("#hudl-video").href = T.links.hudlVideo;
    const seasons = ["All", ...new Set(VIDEOS.map((v) => v.season))];
    let active = "All";
    $("#video-filters").innerHTML = seasons.map((s) => `<button class="chip" aria-pressed="${s === "All"}" data-season="${s}">${s}</button>`).join("");
    const draw = () => {
      $("#videos").innerHTML = VIDEOS.filter((v) => active === "All" || v.season === +active).map((v) => `
        <a class="card lift video" href="${v.url || T.links.hudlVideo}" target="_blank" rel="noopener">
          <div class="thumb"><img src="${LOGO}" alt=""><span class="yr">${v.season}</span><span class="play"></span><span class="len">${v.len}</span></div>
          <div class="cap-txt"><h3>${esc(v.title)}</h3><span>${esc(v.sub)} · Watch on Hudl ↗</span></div>
        </a>`).join("");
    };
    $("#video-filters").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      active = chip.dataset.season;
      $$("#video-filters .chip").forEach((c) => c.setAttribute("aria-pressed", c === chip));
      draw();
    });
    draw();
    $("#photos").innerHTML = PHOTOS.map((p) => `<figure class="photo has-img"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy"><figcaption>${esc(p.caption)}</figcaption></figure>`).join("");
    $("#photos").closest("section").hidden = !PHOTOS.length;   // no photos yet: leave the section out
  }

  ({ home, stats, schedule, history, media })[page]?.();

  /* ---------- Light motion: sections fade in, big numbers count up once ---------- */
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function countUp(el) {
    const m = el.textContent.trim().match(/^(\+?)(\d+(?:\.\d+)?)$/);
    if (!m || still) return;
    const end = +m[2], dec = (m[2].split(".")[1] || "").length, t0 = performance.now(), dur = 800;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = m[1] + (end * e).toFixed(dec);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const show = (s) => { s.classList.add("in"); $$(".count", s).forEach(countUp); };
  const blocks = $$("section.block");
  if ("IntersectionObserver" in window && !still) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    }), { threshold: 0.08 });
    blocks.forEach((s) => { s.classList.add("reveal"); io.observe(s); });
  } else {
    blocks.forEach(show);
  }
})();
