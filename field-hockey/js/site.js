/* Danvers Falcons Field Hockey — page rendering. Content lives in data.js. */
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
    return `${count(g, "W")}–${count(g, "L")}–${count(g, "T")}`;
  };
  const record = rec();
  const gf = played.reduce((n, g) => n + g.us, 0);
  const ga = played.reduce((n, g) => n + g.them, 0);

  const fmt = (iso, opts) => new Date(iso).toLocaleString("en-US", opts);
  const dateLong = (iso) => fmt(iso, { weekday: "long", month: "long", day: "numeric" });
  const dateShort = (iso) => fmt(iso, { weekday: "short", month: "short", day: "numeric" });
  const timeOf = (iso) => fmt(iso, { hour: "numeric", minute: "2-digit" });
  const vs = (g) => (g.home ? "vs" : "at");
  const kind = (g) => (g.scrimmage ? "Preseason" : g.league ? "NEC" : "Non-league");
  const outcome = { W: "Win", L: "Loss", T: "Tie" };
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const last = (name) => name.split(" ").slice(1).join(" ") || name;
  const R = T.ranking;
  const divShort = T.division.replace("MIAA ", "");
  const rankText = R ? `MIAA ${divShort} power ranking: No. ${R.rank} of ${R.of} · ${R.asOf}` : "";
  const fullName = (p) => p.nick ? p.name.replace(" ", ` “${p.nick}” `) : p.name;
  const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const tile = ([k, v, d]) => `<div class="card tile"><div class="k">${k}</div><div class="v count ${String(v).length > 8 ? "long" : ""}">${v}</div><div class="d">${d}</div></div>`;

  /* ---------- Player numbers, added up from the game lists in data.js ---------- */
  const tally = {};
  const line = (name) => (tally[name] ??= { g: 0, a: 0, sv: 0, so: 0, games: {} });
  const mark = (name, id) => (line(name).games[id] ??= { g: 0, a: 0, sv: null, so: 0, shared: false });
  played.forEach((g) => {
    (g.scorers || []).forEach(([name, n]) => { line(name).g += n; mark(name, g.id).g += n; });
    (g.assists || []).forEach(([name, n]) => { line(name).a += n; mark(name, g.id).a += n; });
    (g.saves || []).forEach(([name, n]) => { line(name).sv += n; mark(name, g.id).sv = n; });
    (g.shutout || []).forEach((name, _, all) => {
      line(name).so += 1 / all.length;
      Object.assign(mark(name, g.id), { so: 1, shared: all.length > 1 });
    });
    (g.standouts || []).forEach((name) => { mark(name, g.id); });
  });
  const ROSTER = PLAYERS.map((p) => {
    const t = tally[p.name] || { g: 0, a: 0, sv: 0, so: 0, games: {} };
    const goals = p.totals?.g ?? t.g, assists = p.totals?.a ?? t.a;
    return { ...p, goals, assists, points: goals + assists, saves: p.totals?.sv ?? t.sv, shutouts: t.so, games: t.games,
             inGoal: Object.values(t.games).filter((x) => x.sv != null).length };
  });
  const logLine = (x) => [
    x.g && plural(x.g, "goal"), x.a && plural(x.a, "assist"), x.sv != null && plural(x.sv, "save"),
    x.so && (x.shared ? "Shared shutout" : "Shutout")
  ].filter(Boolean).join(", ") || "Standout in the recap";

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
    else if (g.scrimmage && !g.result) body += `<h4>Preseason</h4><p>${dateLong(g.date)} · ${timeOf(g.date)}<br>${esc(g.site)}</p><p>Scrimmage — no score is kept.</p>`;
    else if (!g.result) body += `<h4>Game Time</h4><p>${dateLong(g.date)} · ${timeOf(g.date)}<br>${esc(g.site)}</p>`;
    if (g.result && !g.scrimmage) {
      body += g.quarters
        ? `<h4>Score by Quarter</h4><table class="line"><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>F</th></tr>
             <tr><td>Danvers</td>${g.quarters.us.map((q) => `<td>${q}</td>`).join("")}<td>${g.us}</td></tr>
             <tr><td>${esc(g.opponent)}</td>${g.quarters.them.map((q) => `<td>${q}</td>`).join("")}<td>${g.them}</td></tr></table>`
        : g.halftime ? `<h4>Score by Quarter</h4><p>Halftime: Danvers ${g.halftime[0]}, ${esc(g.opponent)} ${g.halftime[1]}</p>` : "";
      const named = (g.scorers || []).reduce((n, [, goals]) => n + goals, 0);
      if (g.plays) {
        body += `<h4>Danvers Goals</h4><div class="plays">${g.plays.map((s) => `<div class="row"><span class="q">${esc(s.when)}</span><span>${esc(s.play)}</span>${s.score ? `<span class="sc">${esc(s.score)}</span>` : ""}</div>`).join("")}</div>`;
      } else if (named) {
        body += `<h4>Danvers Goals</h4><div class="perf">${g.scorers.map(([name, n]) => `<div class="row"><span class="n">${esc(name)}</span><span>${n === 3 ? "Hat trick" : plural(n, "goal")}</span></div>`).join("")}</div>`;
      } else if (!g.us) {
        body += `<h4>Danvers Goals</h4><p>Danvers was held scoreless.</p>`;
      }
      if (g.assists?.length) body += `<p class="assist-line"><b>Assists:</b> ${g.assists.map(([name, n]) => esc(name) + (n > 1 ? ` ${n}` : "")).join(", ")}</p>`;
      if (g.saves?.length) body += `<h4>In Goal</h4><div class="perf">${g.saves.map(([name, n]) => `<div class="row"><span class="n">${esc(name)}</span><span>${plural(n, "save")}</span></div>`).join("")}</div>`;
      if (g.shutout?.length) body += `<p class="assist-line">${g.shutout.map(esc).join(" and ")} ${g.shutout.length > 1 ? "shared" : "earned"} the shutout.</p>`;
    }
    if (g.standouts?.length) body += `<h4>Also Stood Out</h4><div class="srcs">${g.standouts.map((n) => `<span class="tag">${esc(n)}</span>`).join("")}</div>`;
    if (g.notes?.length) body += `<h4>Notes</h4><ul>${g.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [
      ...(g.video ? [{ label: "Full-game replay on Hudl", url: g.video }] : []),
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

  function leaders() {
    return [["goals", "Goals"], ["assists", "Assists"], ["points", "Points"]].map(([key, title]) => {
      const best = Math.max(...ROSTER.map((p) => p[key]), 0);
      const who = ROSTER.filter((p) => best && p[key] === best).map((p) => p.name);
      const names = who.slice(0, 2).join(" & ") + (who.length > 2 ? ` +${who.length - 2}` : "");
      return `<div class="card leader"><div class="big count">${best}</div><div><div class="cat">${title}</div><div class="who">${esc(names) || "—"}</div></div></div>`;
    }).join("");
  }

  /* ---------- HOME ---------- */
  function home() {
    const next = upcoming[0];
    const prev = played[played.length - 1];

    if (prev) {
      const headline = {
        W: `Falcons beat ${esc(prev.opponent)} ${prev.us}–${prev.them}, move to ${record}`,
        L: `Falcons fall to ${esc(prev.opponent)}, ${prev.them}–${prev.us}`,
        T: `Falcons and ${esc(prev.opponent)} play to a ${prev.us}–${prev.them} draw`
      }[prev.result];
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(prev.date)}</div>
        <h1>${headline}</h1>
        <p>${esc(prev.summary || `The Falcons are ${record} through ${plural(played.length, "game")}.`)}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-game="${prev.id}">Game recap</button>
          <a class="btn btn-ghost" href="schedule.html">Full schedule</a>
        </div>`;
      const row = (name, pts, win, logo) => `
        <div class="sb-row ${win ? "win" : ""}">
          ${logo ? `<img src="${LOGO}" alt="">` : `<span class="dot">${esc(name[0])}</span>`}
          <span class="nm">${esc(name)}</span><span class="pts">${pts}</span>
        </div>`;
      const dan = row("Danvers", prev.us, prev.us >= prev.them, true);
      const opp = row(prev.opponent, prev.them, prev.them >= prev.us, false);
      const scorers = (prev.scorers || []).map(([name, n]) => last(name) + (n > 1 ? ` ${n}` : "")).join(", ");
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard" data-game="${prev.id}" aria-label="Last game details">
          <div class="sb-top"><span>Final</span><span>${prev.home ? "Home" : "Away"} · ${kind(prev)}</span></div>
          ${prev.home ? opp + dan : dan + opp}
          <div class="sb-foot"><span>${scorers ? `Goals: ${esc(scorers)}` : ""}</span><b>Game details ›</b></div>
        </button>`;
    } else {
      $("#hero-story").innerHTML = `
        <div class="eyebrow">${SEASON} season</div>
        <h1>${esc(T.name)} ${esc(T.sport)}</h1>
        <p>Scores, stats, history and highlights from ${esc(T.school)} ${esc(T.sport.toLowerCase())}.</p>
        <div class="btn-row"><a class="btn btn-primary" href="schedule.html">Full schedule</a></div>`;
    }

    const n = played.length || 1;
    $("#scorestrip").innerHTML =
      tile(["Record", record, `NEC ${rec((g) => g.league)} · Home ${rec((g) => g.home)} · Away ${rec((g) => !g.home)}`]) +
      (next ? `<button class="card next-game" data-game="${next.id}">
        <div>
          <div class="k">Next game</div>
          <h3>${vs(next)} ${esc(next.opponent)}</h3>
          <div class="meta">${dateLong(next.date)} · ${timeOf(next.date)} · ${esc(next.site)}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : `<div class="card next-game"><div><div class="k">Regular season complete</div><h3>Final record ${record}</h3></div></div>`) +
      (R ? `<a class="card tile rank-tile" href="${R.url}" target="_blank" rel="noopener"><div class="k">MIAA ${esc(divShort)}</div><div class="v">#${R.rank}</div><div class="d">of ${R.of} in the power rankings · ${esc(R.asOf)} ↗</div></a>`
         : tile(["Goals", `${gf}–${ga}`, `${(gf / n).toFixed(1)} scored · ${(ga / n).toFixed(1)} allowed per game`]));

    $("#home-leaders").innerHTML = leaders();
    $("#home-games").innerHTML = [...past.slice(-2), ...upcoming.slice(0, 3)].map(gameRow).join("");

    if (next) {
      const tick = () => {
        const ms = Math.max(0, new Date(next.date) - new Date());
        const parts = [["Days", ms / 864e5], ["Hrs", (ms / 36e5) % 24], ["Min", (ms / 6e4) % 60]];
        $("#countdown").innerHTML = ms
          ? parts.map(([l, v]) => `<div><b>${String(Math.floor(v)).padStart(2, "0")}</b><span>${l}</span></div>`).join("")
          : `<div><b>Game day</b><span>Go Falcons</span></div>`;
      };
      tick();
      setInterval(tick, 30000);
    }
  }

  /* ---------- STATS ---------- */
  function stats() {
    const n = played.length || 1, diff = gf - ga;
    $("#stats-asof").textContent = STATS_AS_OF;
    $("#coach-line").textContent = `Head coach ${T.headCoach} (${T.coachNote}). Assistants: ${T.assistants.join(", ")}.`;
    $("#team-tiles").innerHTML = [
      ["Record", record, `${T.conference} · W–L–T`],
      ["Goals per game", (gf / n).toFixed(1), `${gf} scored`],
      ["Allowed per game", (ga / n).toFixed(1), `${ga} allowed`],
      ["Goal difference", (diff > 0 ? "+" : diff < 0 ? "−" : "") + Math.abs(diff), plural(played.length, "game")]
    ].map(tile).join("");
    $("#leaders").innerHTML = leaders();

    const scorers = ROSTER.filter((p) => p.points).sort((a, b) => b.points - a.points || b.goals - a.goals);
    const max = Math.max(...scorers.map((p) => p.points), 1);
    $("#scoring").innerHTML = scorers.length ? `
      <div class="legend-row"><span><i class="s2"></i>Goals</span><span><i class="s4"></i>Assists</span></div>
      ${scorers.map((p) => `<div class="bar-row">
          <div class="nm">${esc(p.name)}<small>${[p.pos.join(" / "), p.grade].filter(Boolean).join(" · ")}</small></div>
          <div class="bar-track"><div class="bar-fill" style="--w:${(p.points / max * 100).toFixed(1)}%">
            ${p.goals ? `<span class="s2" style="flex:${p.goals}" title="${plural(p.goals, "goal")}">${p.goals}</span>` : ""}
            ${p.assists ? `<span class="s4" style="flex:${p.assists}" title="${plural(p.assists, "assist")}">${p.assists}</span>` : ""}
          </div></div>
          <div class="tot">${p.points}<small>${p.goals} G · ${p.assists} A</small></div>
        </div>`).join("")}` : `<div class="empty">No goals recorded yet.</div>`;

    const groupOf = (p) => Object.keys(POSITION_GROUPS).filter((grp) => p.pos.some((x) => POSITION_GROUPS[grp].includes(x)));
    const groups = ["All", ...Object.keys(POSITION_GROUPS).filter((grp) => ROSTER.some((p) => groupOf(p).includes(grp)))];
    let active = "All", q = "";

    $("#filters").innerHTML = groups.map((grp) => `<button class="chip" aria-pressed="${grp === "All"}" data-group="${grp}">${grp}</button>`).join("")
      + `<input class="search" type="search" placeholder="Search players…" aria-label="Search players">`;

    const statBoxes = (p) => [
      ...(p.points ? [["Goals", p.goals], ["Assists", p.assists], ["Points", p.points]] : []),
      ...(p.inGoal ? [["Saves", p.saves], ["Games", p.inGoal]] : []),
      ...(p.shutouts ? [["Shutouts", p.shutouts]] : [])
    ];
    const draw = () => {
      const list = ROSTER.filter((p) =>
        (active === "All" || groupOf(p).includes(active)) &&
        fullName(p).toLowerCase().includes(q));
      $("#players").innerHTML = list.length ? list.map((p) => `
        <article class="card player">
          <div class="player-top">
            <div class="jersey ${p.num == null ? "unknown" : ""}">${p.num ?? esc(initials(p.name))}</div>
            <div>
              <h3>${esc(fullName(p))}</h3>
              <div class="posline">
                ${p.pos.map((x) => `<span class="pos">${x}</span>`).join("")}
                ${p.grade ? `<span>${p.grade}</span>` : ""}
                ${p.captain ? `<span class="cap">CAPTAIN</span>` : ""}
              </div>
            </div>
          </div>
          ${statBoxes(p).length ? `<div class="player-stats">${statBoxes(p).map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>` : ""}
          ${played.some((g) => p.games[g.id]) ? `<div class="player-log">
            ${played.filter((g) => p.games[g.id]).map((g) =>
              `<div class="row"><span class="opp">${vs(g)} ${esc(g.opponent)}</span><span>${logLine(p.games[g.id])}</span></div>`).join("")}
          </div>` : ""}
        </article>`).join("") : `<div class="empty card" style="grid-column:1/-1">No players match.</div>`;
    };
    /* Roster table: every player, sortable by any column */
    const COLS = [["num", "#"], ["name", "Player"], ["grade", "Class"], ["pos", "Pos"], ["goals", "G"], ["assists", "A"], ["points", "Pts"], ["saves", "Saves"]];
    const ORDER = { "Sr.": 4, "Jr.": 3, "So.": 2, "Fr.": 1 };
    const sortVal = (p, k) => k === "grade" ? ORDER[p.grade] || 0 : k === "pos" ? p.pos.join("/") : k === "name" ? p.name.split(" ").slice(-1)[0] : k === "saves" ? (p.inGoal ? p.saves : -1) : p[k];
    let sortKey = "num", sortDir = 1;
    const drawSheet = () => {
      const rows = [...ROSTER].sort((a, b) => {
        const x = sortVal(a, sortKey), y = sortVal(b, sortKey);
        return (typeof x === "string" ? x.localeCompare(y) : x - y) * sortDir || a.num - b.num;
      });
      const tot = (k) => ROSTER.reduce((n, p) => n + (p[k] || 0), 0);
      $("#sheet").innerHTML = `
        <thead><tr>${COLS.map(([k, label]) => `<th><button data-sort="${k}" class="${k === sortKey ? (sortDir > 0 ? "up" : "down") : ""}">${label}</button></th>`).join("")}</tr></thead>
        <tbody>${rows.map((p) => `<tr>
          <td>${p.num ?? "–"}</td><td>${esc(fullName(p))}${p.captain ? ` <span class="cap">C</span>` : ""}</td><td>${p.grade || "–"}</td><td>${p.pos.join(" / ") || "–"}</td>
          <td>${p.goals || "–"}</td><td>${p.assists || "–"}</td><td><b>${p.points || "–"}</b></td><td>${p.inGoal ? p.saves : "–"}</td></tr>`).join("")}</tbody>
        <tfoot><tr><td></td><td>Team (${ROSTER.length} players)</td><td></td><td></td><td>${tot("goals")}</td><td>${tot("assists")}</td><td><b>${tot("points")}</b></td><td>${ROSTER.reduce((n, p) => n + (p.inGoal ? p.saves : 0), 0)}</td></tr></tfoot>`;
    };
    const named = ROSTER.reduce((n, p) => n + p.goals, 0);
    $("#sheet-note").textContent = "Official 2026 varsity roster from the school's schedule site. C = captain." +
      (named < gf ? ` Danvers has scored ${gf} goals; ${plural(gf - named, "goal")} ${gf - named === 1 ? "has" : "have"} no scorer on record yet.` : "");
    $("#sheet").addEventListener("click", (e) => {
      const b = e.target.closest("[data-sort]");
      if (!b) return;
      const k = b.dataset.sort;
      sortDir = k === sortKey ? -sortDir : ["num", "name", "pos"].includes(k) ? 1 : -1;
      sortKey = k;
      drawSheet();
    });
    drawSheet();

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
      ["Overall", record, `${SEASON} season · W–L–T`],
      ["NEC", rec((g) => g.league), "Conference opponents"],
      ["Home", rec((g) => g.home), T.stadium],
      ["Away", rec((g) => !g.home), "On the road"]
    ].map(tile).join("");
    $("#results").innerHTML = past.length ? [...past].reverse().map(gameRow).join("") : `<div class="empty">No games played yet.</div>`;
    $("#upcoming").innerHTML = upcoming.length ? upcoming.map(gameRow).join("") : `<div class="empty">Regular season complete.</div>`;
    if (R) $("#rank-pill").innerHTML = `<a href="${R.url}" target="_blank" rel="noopener">${esc(rankText)} ↗</a>`;
    const pctOf = (w, l, t) => (w + l + t ? (w + t / 2) / (w + l + t) : 0);
    $("#standings").innerHTML = `
      <thead><tr><th>#</th><th>Team</th><th>NEC</th><th>Pct.</th><th>Overall</th></tr></thead>
      <tbody>${STANDINGS.map(([team, w, l, t, ow, ol, ot], i) => `<tr class="${team === "Danvers" ? "us" : ""}">
        <td>${i + 1}</td><td>${esc(team)}</td><td>${w}–${l}–${t}</td><td>${pctOf(w, l, t).toFixed(3).replace(/^0/, "")}</td><td>${ow}–${ol}–${ot}</td></tr>`).join("")}</tbody>`;
    $("#standings-note").innerHTML = `As of ${esc(STANDINGS_AS_OF)}, from the <a href="${T.links.standings}" target="_blank" rel="noopener">MaxPreps league standings ↗</a>. Ties count as half a win.`;
    $("#preseason-block").hidden = !PRESEASON.length;
    $("#preseason").innerHTML = PRESEASON.map(gameRow).join("");
  }

  /* ---------- HISTORY ---------- */
  const YEARS = SEASONS.map(([year, w, l, t, coach, finish, post, caveat]) => ({ year, w, l, t, coach, finish, post, caveat }));
  const pct = (s) => (s.w + s.t / 2) / (s.w + s.l + s.t);
  const isTitle = (s) => NEC_TITLES.includes(s.year);

  /* Wins by year. Seasons the record book has no record for leave a gap in the line. */
  function winChart() {
    const data = YEARS.filter((s) => s.w != null).reverse();
    const first = data[0].year, lastYr = data[data.length - 1].year;
    const W = 900, H = 290, L = 34, R = 18, T0 = 24, B = 36, top = 20;
    const x = (yr) => L + (yr - first) * (W - L - R) / (lastYr - first);
    const y = (w) => T0 + (1 - w / top) * (H - T0 - B);
    const runs = data.reduce((all, s, i) => {
      if (i && s.year === data[i - 1].year + 1) all[all.length - 1].push(s); else all.push([s]);
      return all;
    }, []);
    const d = (run) => run.map((s, i) => `${i ? "L" : "M"}${x(s.year).toFixed(1)} ${y(s.w).toFixed(1)}`).join(" ");
    const labels = [];
    for (let yr = Math.ceil(first / 5) * 5; yr <= lastYr; yr += 5) labels.push(yr);
    return `
      <div class="key"><span><i></i>Wins per season</span><span><i class="t"></i>NEC title year</span></div>
      <div class="table-scroll"><svg viewBox="0 0 ${W} ${H}" style="min-width:720px" role="img" aria-label="Wins per season, ${first} to ${lastYr}">
        ${[0, 5, 10, 15, 20].map((v) => `<line class="gridl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        ${labels.map((yr) => `<text x="${x(yr).toFixed(1)}" y="${H - 10}" text-anchor="middle">${yr}</text>`).join("")}
        ${runs.map((run) => `
          <path class="area" d="${d(run)} L${x(run[run.length - 1].year).toFixed(1)} ${y(0)} L${x(run[0].year).toFixed(1)} ${y(0)} Z"/>
          <path class="ln" pathLength="1" d="${d(run)}"/>`).join("")}
        ${data.map((s) => `
          <circle class="pt ${isTitle(s) ? "title" : ""}" cx="${x(s.year).toFixed(1)}" cy="${y(s.w).toFixed(1)}" r="${isTitle(s) ? 5.5 : 3.5}"><title>${s.year}: ${s.w}–${s.l}–${s.t}${isTitle(s) ? " · NEC Champions" : ""}${s.post ? " · " + esc(s.post) : ""}</title></circle>`).join("")}
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
    const best = full.filter((s) => !s.caveat).sort((a, b) => pct(b) - pct(a) || b.w - a.w)[0];
    $("#history-tiles").innerHTML = [
      ["NEC titles", NEC_TITLES.length, `First in ${NEC_TITLES[0]} · latest in ${NEC_TITLES[NEC_TITLES.length - 1]}`],
      ["All-time record", `${sum("w")}–${sum("l")}–${sum("t")}`, `${full.length} seasons in the record book`],
      ["Best season", `${best.w}–${best.l}–${best.t}`, `${best.year} · ${best.coach}`],
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
        <td class="rec">${s.w == null ? "–" : `${s.w}–${s.l}–${s.t}`}${s.caveat ? `<small>${esc(s.caveat)}</small>` : ""}</td>
        <td>${s.w == null ? "" : `<div class="bar" title="${(pct(s) * 100).toFixed(0)}% (ties count as half a win)"><i style="width:${pct(s) * 100}%"></i></div>`}</td>
        <td>${esc(s.coach)}</td>
        <td>${isTitle(s) ? `<span class="note-pill">NEC Champions</span>${s.finish ? ` ${esc(s.finish)}` : ""}` : esc(s.finish)}</td>
        <td>${esc(s.post)}</td>
      </tr>`).join("");
    const more = $("#records-more");
    more.textContent = `Show all ${YEARS.length} seasons`;
    more.addEventListener("click", () => { $$("#records .older").forEach((tr) => { tr.hidden = false; }); more.hidden = true; });

    $("#honors").innerHTML = HONORS.map((h, i) => `<tr${i >= SHOWN ? ' class="older" hidden' : ""}>
        <td class="yr">${h.year}</td>
        <td>${esc(h.captains || "")}</td>
        <td>${esc(h.allLeague || "")}</td>
        <td>${[["Best of 60", h.best60], ["All-Scholastic", h.allScholastic]].filter(([, v]) => v)
          .map(([k, v]) => `<div><small>${k}</small>${esc(v)}</div>`).join("")}</td>
        <td>${esc(h.note || "")}</td>
      </tr>`).join("");
    const moreHonors = $("#honors-more");
    moreHonors.textContent = `Show all ${HONORS.length} seasons`;
    moreHonors.hidden = HONORS.length <= SHOWN;
    moreHonors.addEventListener("click", () => { $$("#honors .older").forEach((tr) => { tr.hidden = false; }); moreHonors.hidden = true; });

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
