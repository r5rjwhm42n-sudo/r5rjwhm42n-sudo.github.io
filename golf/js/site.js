/* Danvers Falcons Golf — page rendering. Content lives in data.js. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const page = document.body.dataset.page;
  const LOGO = "images/falcons-logo.png";

  const off = (g) => g.cancelled || g.noResult;
  const played = SCHEDULE.filter((g) => g.result);          // head-to-head matches with a result (the record)
  const done = (g) => g.result || g.finish;                   // ...plus tournaments already played
  const finished = SCHEDULE.filter(done);
  const upcoming = SCHEDULE.filter((g) => !done(g) && !off(g));
  const past = SCHEDULE.filter((g) => done(g) || off(g));
  const count = (list, r) => list.filter((g) => g.result === r).length;
  const rec = (f = () => true) => {
    const g = played.filter(f), t = count(g, "T");
    return `${count(g, "W")}–${count(g, "L")}${t ? `–${t}` : ""}`;
  };
  const record = rec();
  /* NEC match play: 72 points on offer every time out */
  const mp = played.filter((g) => g.format === "match");
  const won = mp.reduce((n, g) => n + g.us, 0);
  const lost = mp.reduce((n, g) => n + g.them, 0);
  const perMatch = (won / (mp.length || 1)).toFixed(1);

  const fmt = (iso, opts) => new Date(iso).toLocaleString("en-US", opts);
  const dateLong = (iso) => fmt(iso, { weekday: "long", month: "long", day: "numeric" });
  const dateShort = (iso) => fmt(iso, { weekday: "short", month: "short", day: "numeric" });
  const timeOf = (iso) => fmt(iso, { hour: "numeric", minute: "2-digit" });
  const vs = (g) => (g.tournament ? "" : g.home ? "vs" : "at");
  const title = (g) => `${vs(g)} ${g.opponent}`.trim();
  const kind = (g) => (g.league ? "NEC" : "Non-league");
  const FORMAT = { match: "Match play", stableford: "Stableford", stroke: "Stroke play" };
  const outcome = { W: "Win", L: "Loss", T: "Tie" };
  const offLabel = (g) => (g.cancelled ? "Cancelled" : "No result");
  const last = (name) => name.split(" ").slice(1).join(" ") || name;
  const tile = ([k, v, d]) => `<div class="card tile"><div class="k">${k}</div><div class="v count ${String(v).length > 8 ? "long" : ""}">${v}</div><div class="d">${d}</div></div>`;

  /* ---------- Player numbers, added up from the match lists in data.js ---------- */
  const tally = {};
  const line = (name) => (tally[name] ??= { wins: 0, halves: 0, losses: 0, pts: 0, best: null, stb: null, low9: null, low18: null, log: [] });
  const cardRes = (f, a) => (f > a ? "W" : f < a ? "L" : "H");
  const cardText = (f, a) => `${{ W: "Won", L: "Lost", H: "Halved" }[cardRes(f, a)]} ${f}–${a}`;
  finished.forEach((g) => {
    (g.cards || []).forEach(([name, f, a]) => {
      const t = line(name), r = cardRes(f, a);
      t[{ W: "wins", H: "halves", L: "losses" }[r]]++;
      t.pts += f;
      if (!t.best || f > t.best.f) t.best = { f, a, g };
      t.log.push({ g, text: cardText(f, a), pts: f });
    });
    (g.points || []).forEach(([name, p]) => {
      const t = line(name);
      t.stb = Math.max(t.stb ?? 0, p);
      t.log.push({ g, text: `${p} Stableford points` });
    });
    (g.rounds || []).forEach(([name, s]) => {
      const t = line(name);
      const key = g.holes === 18 ? "low18" : "low9";
      t[key] = Math.min(t[key] ?? 999, s);
      t.log.push({ g, text: g.holes === 18 ? `Shot ${s} (18 holes)` : `Shot ${s}` });
    });
  });
  const ROSTER = PLAYERS.map((p) => ({ ...p, ...(tally[p.name] || line(p.name)) }));
  const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  /* ---------- Top bar, header, scoreboard strip, footer ---------- */
  const NAV = [["index.html", "Home", "home"], ["stats.html", "Players", "stats"], ["schedule.html", "Schedule", "schedule"],
               ["history.html", "History", "history"], ["media.html", "Media", "media"]];
  const header = $("#site-header");
  header.insertAdjacentHTML("beforebegin", `
    <div class="topbar"><div class="wrap">
      <span class="tb-info">${esc(TEAM.school)} · ${esc(TEAM.conference)} · ${esc(TEAM.division)}</span>
      <span class="tb-links"><a href="${TEAM.links.schedule}" target="_blank" rel="noopener">School Schedule</a><a href="${TEAM.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a><a href="../">All Sports</a></span>
    </div></div>`);
  header.innerHTML = `
    <div class="wrap hbar">
      <a class="brand" href="index.html">
        <span class="badge"><img src="${LOGO}" alt="Danvers Falcons logo"></span>
        <span class="brand-text">Danvers Falcons<small>${esc(TEAM.sport)}</small></span>
      </a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">Menu</button>
      <nav class="nav" aria-label="Main">
        ${NAV.map(([href, label, id]) => `<a href="${href}" class="${id === page ? "active" : ""}">${label}</a>`).join("")}
      </nav>
    </div>`;
  const stripRes = (g) => (off(g) ? offLabel(g) : g.result ? `${g.result} ${g.us}–${g.them}` : g.finish ? `${g.finish} · ${g.us}` : timeOf(g.date));
  header.insertAdjacentHTML("afterend", `
    <div class="scores"><div class="wrap">
      <div class="scores-label">${TEAM.season}<br>Schedule</div>
      <div class="scores-track">${SCHEDULE.map((g) => `
        <button class="sc ${g === upcoming[0] ? "next" : ""}" data-game="${g.id}">
          <div class="when">${dateShort(g.date)}${done(g) ? " · Final" : ""}</div>
          <div class="who">${esc(title(g))}</div>
          <div class="res ${off(g) ? "cx" : g.result || (g.finish ? "fin" : "up")}">${stripRes(g)}</div>
        </button>`).join("")}</div>
    </div></div>`);
  $(".nav-toggle").addEventListener("click", (e) => {
    const open = $(".nav").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });
  $("#site-footer").innerHTML = `
    <div class="wrap foot-top">
      <span class="badge"><img src="${LOGO}" alt=""></span>
      <div class="go">Go Falcons<small>${esc(TEAM.school)} ${esc(TEAM.sport)}</small></div>
    </div>
    <div class="wrap foot-bot">
      <div>
        ${esc(TEAM.address)} · Home course: ${esc(TEAM.homeCourse)}<br>
        ${esc(TEAM.conference)} · ${esc(TEAM.division)} · Head Coach ${esc(TEAM.headCoach)}
      </div>
      <div class="links">
        <a href="${TEAM.links.schedule}" target="_blank" rel="noopener">School Schedule</a>
        <a href="${TEAM.links.school}" target="_blank" rel="noopener">DHS Golf</a>
        <a href="${TEAM.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a>
      </div>
    </div>`;
  /* Scroll the top strip so the next match is in view */
  const nextChip = $(".sc.next");
  if (nextChip) $(".scores-track").scrollLeft = Math.max(0, nextChip.offsetLeft - $(".scores-track").offsetLeft - 340);

  /* ---------- Pieces reused across pages ---------- */
  function gameRow(g) {
    const d = new Date(g.date);
    const res = off(g)
      ? `<div class="result noresult">${offLabel(g)}</div>`
      : g.result
      ? `<div class="result"><span class="wl ${g.result}">${g.result}</span>${g.us}–${g.them}</div>`
      : g.finish
      ? `<div class="result">${g.finish}<small class="place">of ${g.fieldSize} · ${g.us} (${g.toPar})</small></div>`
      : `<div class="result upcoming">${timeOf(g.date)}</div>`;
    return `
      <button class="game ${off(g) ? "is-cancelled" : ""}" data-game="${g.id}">
        <div class="datebox">
          <div class="m">${fmt(g.date, { month: "short" })}</div>
          <div class="d">${d.getDate()}</div>
          <div class="w">${fmt(g.date, { weekday: "short" })}</div>
        </div>
        <div>
          <div class="opp">${vs(g) ? `<small>${vs(g).toUpperCase()}</small>` : ""}${esc(g.opponent)}</div>
          <div class="meta">
            <span class="tag ${g.home ? "home" : ""}">${g.tournament ? "Tournament" : g.home ? "Home" : "Away"}</span>
            <span class="tag">${kind(g)}</span>
            <span class="tag">${FORMAT[g.format]}</span>
            <span>${esc(g.site)}</span>
          </div>
        </div>
        ${res}
        <div class="chev" aria-hidden="true">›</div>
      </button>`;
  }

  const formatNote = {
    match: "NEC match play: eight players a side, nine holes. Each head-to-head match is worth 9 points, so 72 are on offer and 36.5 wins.",
    stableford: "Stableford: players earn points on every hole and the higher team total wins.",
    stroke: "Stroke play: the lower team total wins."
  };
  function gameModal(g) {
    const head = g.finish
      ? `<div class="scoreline">
           <div class="team"><img src="${LOGO}" alt="">Danvers</div>
           <div class="nums">${g.finish}</div>
           <div class="team">${g.us} · ${esc(g.toPar)}</div>
         </div>`
      : g.result
      ? `<div class="scoreline">
           <div class="team"><img src="${LOGO}" alt="">Danvers</div>
           <div class="nums">${g.us}<i>–</i>${g.them}</div>
           <div class="team">${esc(g.opponent)}</div>
         </div>`
      : `<h2>${esc(title(g))} ${esc(g.mascot || "")}</h2>`;
    let body = "";
    if (g.summary) body += `<h4>Recap</h4><p>${esc(g.summary)}</p>`;
    if (off(g)) body += `<h4>${offLabel(g)}</h4><p>Listed for ${dateLong(g.date)} at ${timeOf(g.date)}, ${esc(g.site)}.</p>`;
    else if (!done(g)) body += `<h4>Tee Time</h4><p>${dateLong(g.date)} · ${timeOf(g.date)}<br>${esc(g.site)}</p>`;
    if (g.formatNote || !g.tournament) body += `<h4>Format</h4><p>${esc(g.formatNote || formatNote[g.format])}</p>`;
    if (g.finish && g.field?.length) {
      body += `<h4>Leaderboard</h4><div class="perf">${g.field.map(([t, n], i) => `<div class="row"><span class="n">${i + 1}. ${esc(t)}</span><span>${n}</span></div>`).join("")}
        <div class="row"><span class="n">${parseInt(g.finish, 10)}. Danvers</span><span>${g.us} (${esc(g.toPar)})</span></div></div>`;
    }
    if (done(g)) {
      const rows = [
        ...(g.cards || []).map(([n, f, a]) => [n, `<span class="res-pill ${cardRes(f, a)}">${cardRes(f, a)}</span>${f}–${a}`]),
        ...(g.points || []).map(([n, p]) => [n, `${p} points`]),
        ...(g.rounds || []).map(([n, s]) => [n, `Shot ${s}`])
      ];
      if (rows.length) body += `<h4>Falcons' Results</h4><div class="perf">${rows.map(([n, r]) => `<div class="row"><span class="n">${esc(n)}</span><span>${r}</span></div>`).join("")}</div>`;
    }
    if (g.opp?.length) body += `<h4>${esc(g.opponent)}</h4><ul>${g.opp.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    if (g.notes?.length) body += `<h4>Notes</h4><ul>${g.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [...(g.sources || []), { label: "School schedule", url: TEAM.links.schedule }];
    body += `<h4>Links</h4><div class="srcs">${srcs.map((s) => s.url
      ? `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`
      : `<span class="src-text">${esc(s.label)}</span>`).join("")}</div>`;

    return `
      <div class="modal-head">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="eyebrow">${dateLong(g.date)} · ${g.tournament ? (g.league ? "NEC tournament" : "MIAA tournament") : `${g.home ? "Home" : "Away"} · ${kind(g)}`}${off(g) ? ` · ${offLabel(g)}` : g.result ? ` · ${outcome[g.result]}` : g.finish ? ` · ${g.finish} of ${g.fieldSize}` : ""}</div>
        ${head}
      </div>
      <div class="modal-body">${body}</div>`;
  }

  /* Any element with data-game (schedule rows, the top strip, the hero, chart rows) opens the match popup */
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
    const top = (f) => [...ROSTER].sort((a, b) => f(b) - f(a))[0];
    const w = top((p) => p.wins), pts = top((p) => p.pts), best = top((p) => p.best?.f ?? 0);
    if (!w.wins) return `<div class="empty card" style="grid-column:1/-1">Individual results will show up here as matches are played.</div>`;
    return [
      [w.wins, "Individual match wins", w.name],
      [pts.pts, "Match-play points won", pts.name],
      [`${best.best.f}–${best.best.a}`, "Best single match", `${best.name}`]
    ].map(([big, cat, who]) => `<div class="card leader"><div class="big count">${big}</div><div><div class="cat">${cat}</div><div class="who">${esc(who)}</div></div></div>`).join("");
  }

  /* ---------- HOME ---------- */
  function home() {
    const next = upcoming[0];
    const lastG = finished[finished.length - 1];

    if (lastG?.finish) {
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(lastG.date)}</div>
        <h1>Falcons finish ${esc(lastG.finish)} at the ${esc(lastG.opponent)}</h1>
        <p>${esc(lastG.summary || "")}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-game="${lastG.id}">Full results</button>
          <a class="btn btn-ghost" href="schedule.html">Full schedule</a>
        </div>`;
      const tops = (lastG.rounds || []).slice(0, 2).map(([n, s]) => `${last(n)} ${s}`);
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard" data-game="${lastG.id}" aria-label="Tournament results">
          <div class="sb-top"><span>Final</span><span>${esc(lastG.site.split(",")[0])} · ${lastG.holes || 9} holes</span></div>
          ${(lastG.field || []).map(([t, n], i) => `
            <div class="sb-row"><span class="dot">${i + 1}</span><span class="nm">${esc(t)}</span><span class="pts">${n}</span></div>`).join("")}
          <div class="sb-row win"><img src="${LOGO}" alt=""><span class="nm">${esc(lastG.finish)} Danvers</span><span class="pts">${lastG.us}</span></div>
          <div class="sb-foot"><span>${esc(tops.join(" · "))}</span><b>Leaderboard ›</b></div>
        </button>`;
    } else if (lastG) {
      const r = lastG.result;
      const headline = r === "W" ? `Falcons beat ${esc(lastG.opponent)} ${lastG.us}–${lastG.them}, move to ${record}`
        : r === "T" ? `Falcons and ${esc(lastG.opponent)} finish level, ${lastG.us}–${lastG.them}`
        : `Falcons fall to ${esc(lastG.opponent)}, ${lastG.them}–${lastG.us}`;
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(lastG.date)}</div>
        <h1>${headline}</h1>
        <p>${esc(lastG.summary || "")}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-game="${lastG.id}">Match recap</button>
          <a class="btn btn-ghost" href="schedule.html">Full schedule</a>
        </div>`;
      const row = (name, pts, win, logo) => `
        <div class="sb-row ${win ? "win" : ""}">
          ${logo ? `<img src="${LOGO}" alt="">` : `<span class="dot">${esc(name[0])}</span>`}
          <span class="nm">${esc(name)}</span><span class="pts">${pts}</span>
        </div>`;
      const dan = row("Danvers", lastG.us, r === "W", true);
      const opp = row(lastG.opponent, lastG.them, r === "L", false);
      const tops = (lastG.cards || []).slice(0, 2).map(([n, f, a]) => `${last(n)} ${f}–${a}`)
        .concat((lastG.points || []).slice(0, 2).map(([n, p]) => `${last(n)} ${p} pts`))
        .concat((lastG.rounds || []).slice(0, 2).map(([n, s]) => `${last(n)} ${s}`));
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard" data-game="${lastG.id}" aria-label="Last match details">
          <div class="sb-top"><span>Final</span><span>${lastG.home ? "Home" : "Away"} · ${kind(lastG)} · ${FORMAT[lastG.format]}</span></div>
          ${lastG.home ? opp + dan : dan + opp}
          <div class="sb-foot"><span>${esc(tops.slice(0, 2).join(" · "))}</span><b>Scorecard ›</b></div>
        </button>`;
    } else {
      $("#hero-story").innerHTML = `
        <div class="eyebrow">${TEAM.season} season</div>
        <h1>${esc(TEAM.name)} ${esc(TEAM.sport)}</h1>
        <p>Scores, results, history and coverage of ${esc(TEAM.school)} golf.</p>
        <div class="btn-row"><a class="btn btn-primary" href="schedule.html">Full schedule</a></div>`;
    }

    $("#scorestrip").innerHTML =
      tile(["Record", record, `NEC ${rec((g) => g.league)} · Home ${rec((g) => g.home)} · Away ${rec((g) => !g.home)}`]) +
      (next ? `<button class="card next-game" data-game="${next.id}">
        <div>
          <div class="k">${next.tournament ? "Next up" : "Next match"}</div>
          <h3>${esc(title(next))}</h3>
          <div class="meta">${dateLong(next.date)} · ${timeOf(next.date)} · ${esc(next.site)}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : `<div class="card next-game"><div><div class="k">Season complete</div><h3>Final record ${record}</h3></div></div>`) +
      tile(["Match-play points", `${won}–${lost}`, `${perMatch} of 72 per NEC match`]);

    $("#home-leaders").innerHTML = leaders();
    $("#home-games").innerHTML = [...finished.slice(-2), ...upcoming.slice(0, 3)].map(gameRow).join("");

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

  /* ---------- PLAYERS / STATS ---------- */
  function stats() {
    $("#stats-asof").textContent = STATS_AS_OF;
    const big = [...mp].sort((a, b) => (b.us - b.them) - (a.us - a.them))[0];
    $("#team-tiles").innerHTML = [
      ["Record", record, TEAM.conference],
      ["NEC record", rec((g) => g.league), `${played.filter((g) => g.league).length} league matches`],
      ["Points per match", perMatch, `${won} of ${mp.length * 72} in match play`],
      big ? ["Biggest win", `${big.us}–${big.them}`, `${title(big)}, ${fmt(big.date, { month: "short", day: "numeric" })}`] : ["Biggest win", "—", "No matches yet"]
    ].map(tile).join("");
    $("#coach-line").innerHTML = `<strong>Head coach:</strong> ${esc(TEAM.headCoach)} (${esc(TEAM.coachNote)}) · <strong>JV:</strong> ${esc(TEAM.assistants.join(", ").replace(" (JV)", ""))} · <strong>Home course:</strong> ${esc(TEAM.homeCourse)}`;
    $("#leaders").innerHTML = leaders();

    /* Team: share of the 72 points in every NEC match */
    $("#scorecard").innerHTML = mp.length ? `
      <p class="chart-note">Bar = Danvers' share of the 72 points. The line in the middle is 36 — past it is a win.</p>
      ${mp.map((g) => `
        <button class="bar-row clickable" data-game="${g.id}">
          <div class="nm">${esc(title(g))}<small>${fmt(g.date, { month: "short", day: "numeric" })} · ${g.home ? "Home" : "Away"}</small></div>
          <div class="bar-track half"><div class="bar-fill ${g.result}" style="--w:${(g.us / 72 * 100).toFixed(1)}%"></div></div>
          <div class="tot">${g.us}<small><b class="${g.result}">${outcome[g.result]}</b> ${g.us}–${g.them}</small></div>
        </button>`).join("")}` : `<div class="empty">No match-play results yet.</div>`;

    /* Players: points won in reported matches, one block per match */
    const scorers = ROSTER.filter((p) => p.pts).sort((a, b) => b.pts - a.pts);
    const max = Math.max(...scorers.map((p) => p.pts), 1);
    $("#points").innerHTML = scorers.length ? `
      <p class="chart-note">Each block is one match (9 points available).</p>
      ${scorers.map((p) => `
        <div class="bar-row">
          <div class="nm">${esc(p.name)}<small>${p.grade ? `${p.grade} · ` : ""}${p.wins} win${p.wins === 1 ? "" : "s"}${p.halves ? `, ${p.halves} halved` : ""}</small></div>
          <div class="bar-track"><div class="bar-fill" style="--w:${(p.pts / max * 100).toFixed(1)}%">
            ${p.log.filter((x) => x.pts != null).map((x, i) => `<span class="s${i % 2 ? 3 : 2}" style="flex:${x.pts || 0.01}" title="${x.pts} points ${esc(title(x.g))}">${x.pts}</span>`).join("")}
          </div></div>
          <div class="tot">${p.pts}<small>points</small></div>
        </div>`).join("")}` : `<div class="empty">No individual results yet.</div>`;

    const groups = ["All", ...Object.keys(CLASSES).filter((c) => PLAYERS.some((p) => p.grade === c)).map((c) => CLASSES[c])];
    let active = "All", q = "";
    $("#filters").innerHTML = groups.map((grp) => `<button class="chip" aria-pressed="${grp === "All"}" data-group="${grp}">${grp}</button>`).join("")
      + `<input class="search" type="search" placeholder="Search players…" aria-label="Search players">`;

    const statBox = (p) => [
      p.log.some((x) => x.pts != null) && ["Wins", p.wins],
      p.pts && ["Points", p.pts],
      p.best && ["Best", `${p.best.f}–${p.best.a}`],
      p.low18 != null && ["Low 18", p.low18],
      p.halves && ["Halved", p.halves],
      p.stb != null && ["Stableford", p.stb],
      p.low9 != null && ["Low 9", p.low9]
    ].filter(Boolean).slice(0, 4);

    const draw = () => {
      const list = ROSTER.filter((p) => (active === "All" || CLASSES[p.grade] === active) && p.name.toLowerCase().includes(q));
      $("#players").innerHTML = list.length ? list.map((p) => `
        <article class="card player">
          <div class="player-top">
            <div class="jersey initials">${esc(initials(p.name))}</div>
            <div>
              <h3>${esc(p.name)}</h3>
              <div class="posline">
                ${p.grade ? `<span class="pos">${p.grade}</span>` : ""}
                ${p.captain ? `<span class="cap">CAPTAIN</span>` : ""}
                ${p.note ? `<span>${esc(p.note)}</span>` : ""}
              </div>
            </div>
          </div>
          ${statBox(p).length ? `<div class="player-stats">${statBox(p).map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>` : ""}
          ${p.log.length ? `<div class="player-log">
            ${p.log.map((x) => `<div class="row"><span class="opp">${esc(title(x.g))}</span><span>${esc(x.text)}</span></div>`).join("")}
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
      ["Overall", record, `${TEAM.season} season`],
      ["NEC", rec((g) => g.league), "League play"],
      ["Home", rec((g) => g.home), TEAM.homeCourse],
      ["Away", rec((g) => !g.home), "On the road"]
    ].map(tile).join("");
    $("#results").innerHTML = past.length ? [...past].reverse().map(gameRow).join("") : `<div class="empty">No matches played yet.</div>`;
    $("#upcoming").innerHTML = upcoming.length ? upcoming.map(gameRow).join("") : `<div class="empty">Season complete.</div>`;
  }

  /* ---------- HISTORY ---------- */
  const recStr = (s) => `${s.w}–${s.l}${s.t ? `–${s.t}` : ""}`;
  const pct = (s) => (s.w + s.t / 2) / (s.w + s.l + s.t);
  function winChart() {
    const data = [...SEASONS].reverse();
    const W = 900, H = 290, L = 34, R = 28, T = 30, B = 36, top = 15;
    const x = (i) => L + 20 + i * (W - L - R - 40) / Math.max(1, data.length - 1);
    const y = (w) => T + (1 - w / top) * (H - T - B);
    const pts = data.map((s, i) => [x(i), y(s.w)]);
    const path = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
    return `
      <div class="key"><span><i></i>Regular-season wins</span></div>
      <div class="table-scroll"><svg viewBox="0 0 ${W} ${H}" style="min-width:560px" role="img" aria-label="Wins per season, ${data[0].year} to ${data[data.length - 1].year}">
        ${[0, 5, 10, 15].map((v) => `<line class="gridl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        <path class="area" d="${path} L${x(data.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z"/>
        <path class="ln" pathLength="1" d="${path}"/>
        ${data.map((s, i) => `
          <circle class="pt" cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="5"><title>${s.year}: ${recStr(s)}${s.note ? " · " + esc(s.note) : ""}</title></circle>
          <text class="wv" x="${pts[i][0].toFixed(1)}" y="${(pts[i][1] - 13).toFixed(1)}" text-anchor="middle">${recStr(s)}</text>
          <text x="${pts[i][0].toFixed(1)}" y="${H - 10}" text-anchor="middle">${s.year}</text>`).join("")}
      </svg></div>`;
  }

  function history() {
    $("#banners").innerHTML = TITLES.map((t) => `<div class="banner"><img src="${LOGO}" alt=""><div class="y">${t.year}</div><div class="l">${esc(t.label)}</div></div>`).join("");
    $("#nec-titles").innerHTML = `
      <div><div class="big count">${NEC_TITLES.length}</div><div class="cat">Northeastern Conference titles</div></div>
      <div class="years">${NEC_TITLES.map((y) => `<span>${y}</span>`).join("")}</div>`;
    $("#win-chart").innerHTML = winChart();
    $("#timeline").innerHTML = MILESTONES.map((m) => `<div class="item"><div class="y">${esc(m.year)}</div><p>${esc(m.text)}</p></div>`).join("");
    $("#records").innerHTML = SEASONS.map((s) => `<tr>
        <td class="yr">${s.year}</td>
        <td class="rec">${recStr(s)}</td>
        <td>${s.lw}–${s.ll}${s.lt ? `–${s.lt}` : ""}</td>
        <td><div class="bar" title="${(pct(s) * 100).toFixed(0)}% of matches"><i style="width:${pct(s) * 100}%"></i></div></td>
        <td>${s.note ? `<span class="note-pill">${esc(s.note)}</span>` : ""}</td>
      </tr>`).join("");
    const best = [...SEASONS].sort((a, b) => pct(b) - pct(a))[0];
    $("#history-tiles").innerHTML = [
      ["NEC titles", NEC_TITLES.length, `First in ${NEC_TITLES[0]} · latest in ${NEC_TITLES[NEC_TITLES.length - 1]}`],
      ["Sectional titles", SECTIONAL_TITLES.length, SECTIONAL_TITLES.join(" · ")],
      ["State runner-up", "2018", "Division 2, six shots off the lead"],
      ["Best recent season", recStr(best), `${best.year}`]
    ].map(tile).join("");
    $("#legends").innerHTML = LEGENDS.map((p, i) => `
      <article class="card legend">
        <div class="top">
          <div><h3>${esc(p.name)}</h3><div class="role">${esc(p.pos)} · ${esc(p.era)}</div></div>
          <div class="rank">${i + 1}</div>
        </div>
        <div class="body">
          <p>${esc(p.bio)}</p>
          <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
  }

  /* ---------- MEDIA ---------- */
  function media() {
    $("#news").innerHTML = NEWS.map((n) => `
      <a class="card lift news" href="${n.url}" target="_blank" rel="noopener">
        <div class="when">${fmt(n.date + "T12:00", { month: "long", day: "numeric", year: "numeric" })}</div>
        <h3>${esc(n.title)}</h3>
        <p>${esc(n.blurb)}</p>
        <span class="go">Read at ${esc(n.source)} ↗</span>
      </a>`).join("");
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
