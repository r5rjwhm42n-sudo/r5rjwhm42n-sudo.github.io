/* Danvers Falcons Soccer — page rendering. Content lives in data.js. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const page = document.body.dataset.page;
  const LOGO = "images/falcons-logo.png";

  /* ---------- Which team: ?team= in the address wins, then the last one viewed ---------- */
  const asked = new URLSearchParams(location.search).get("team");
  let saved = null;
  try { saved = localStorage.getItem("dhs-soccer-team"); } catch (e) { /* storage blocked: fall through */ }
  const teamKey = TEAMS[asked] ? asked : TEAMS[saved] ? saved : DEFAULT_TEAM;
  try { localStorage.setItem("dhs-soccer-team", teamKey); } catch (e) { /* fine without it */ }
  const T = TEAMS[teamKey];
  const to = (href, key = teamKey) => `${href}?team=${key}`;
  document.title = document.title.replace("Soccer", T.label);
  $$("[data-t]").forEach((el) => { el.textContent = { label: T.label, season: SEASON, intro: T.historyIntro }[el.dataset.t]; });

  const SCHEDULE = T.schedule.filter((g) => !g.scrimmage);
  const PRESEASON = T.schedule.filter((g) => g.scrimmage);
  const played = SCHEDULE.filter((g) => g.result);
  const NOW = Date.now();
  const awaiting = (g) => !g.result && !g.cancelled && new Date(g.date) < NOW - 3 * 36e5;
  const upcoming = SCHEDULE.filter((g) => !g.result && !g.cancelled);
  const next = upcoming.find((g) => !awaiting(g));
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
  const kind = (g) => (g.scrimmage ? "Scrimmage" : g.league ? "NEC" : "Non-league");
  const pending = (g) => (g.scrimmage ? "No score" : "Score TBD");
  const rankLine = T.ranking ? `MIAA D${T.division.replace(/\D/g, "")} No. ${T.ranking.rank}` : "";
  const outcome = { W: "Win", L: "Loss", T: "Tie" };
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const last = (name) => name.split(" ").slice(1).join(" ") || name;
  const tile = ([k, v, d]) => `<div class="card tile"><div class="k">${k}</div><div class="v count ${String(v).length > 8 ? "long" : ""}">${v}</div><div class="d">${d}</div></div>`;

  /* ---------- Player numbers, added up from the game lists in data.js ---------- */
  const tally = {};
  const line = (name) => (tally[name] ??= { g: 0, a: 0, so: 0, games: {} });
  const mark = (name, id) => (line(name).games[id] ??= { g: 0, a: 0, so: 0, shared: false, cited: false });
  played.forEach((g) => {
    (g.scorers || []).forEach(([name, n]) => { line(name).g += n; mark(name, g.id).g += n; });
    (g.assists || []).forEach(([name, n]) => { line(name).a += n; mark(name, g.id).a += n; });
    (g.shutout || []).forEach((name, _, all) => {
      line(name).so += 1 / all.length;
      Object.assign(mark(name, g.id), { so: 1, shared: all.length > 1 });
    });
    (g.standouts || []).forEach((name) => { mark(name, g.id).cited = true; });
  });
  const PLAYERS = T.players.map((p) => {
    const t = tally[p.name] || { g: 0, a: 0, so: 0, games: {} };
    const goals = p.totals?.g ?? t.g, assists = p.totals?.a ?? t.a;
    return { ...p, goals, assists, points: goals + assists, shutouts: t.so, games: t.games };
  });
  const logLine = (x) => [
    x.g && plural(x.g, "goal"), x.a && plural(x.a, "assist"), x.so && (x.shared ? "Shared shutout" : "Shutout")
  ].filter(Boolean).join(", ") || "Standout in the recap";

  /* ---------- Top bar, header, scoreboard strip, footer ---------- */
  const NAV = [["index.html", "Home", "home"], ["stats.html", "Stats", "stats"], ["schedule.html", "Schedule", "schedule"],
               ["history.html", "History", "history"], ["media.html", "Media", "media"]];
  const here = (NAV.find((n) => n[2] === page) || NAV[0])[0];
  const header = $("#site-header");
  header.insertAdjacentHTML("beforebegin", `
    <div class="topbar"><div class="wrap">
      <div class="teamswitch" role="group" aria-label="Choose a team">
        ${Object.entries(TEAMS).map(([key, t]) => `<a href="${to(here, key)}" class="${key === teamKey ? "on" : ""}"${key === teamKey ? ' aria-current="true"' : ""}>${esc(t.short)}</a>`).join("")}
      </div>
      <span class="tb-info">${esc(SCHOOL.school)} · ${esc(SCHOOL.conference)} · ${esc(T.division)}</span>
      <span class="tb-links"><a href="${T.links.hudl}" target="_blank" rel="noopener">Hudl</a><a href="${SCHOOL.athletics}" target="_blank" rel="noopener">Falcons Athletics</a><a href="../">All Sports</a></span>
    </div></div>`);
  header.innerHTML = `
    <div class="wrap hbar">
      <a class="brand" href="${to("index.html")}">
        <span class="badge"><img src="${LOGO}" alt="Danvers Falcons logo"></span>
        <span class="brand-text">Danvers Falcons<small>${esc(T.label)}</small></span>
      </a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">Menu</button>
      <nav class="nav" aria-label="Main">
        ${NAV.map(([href, label, id]) => `<a href="${to(href)}" class="${id === page ? "active" : ""}">${label}</a>`).join("")}
      </nav>
    </div>`;
  header.insertAdjacentHTML("afterend", `
    <div class="scores"><div class="wrap">
      <div class="scores-label">${SEASON}<br>Schedule</div>
      <div class="scores-track">${SCHEDULE.map((g) => `
        <button class="sc ${g === next ? "next" : ""}" data-game="${g.id}">
          <div class="when">${dateShort(g.date)}${g.result ? " · Final" : ""}</div>
          <div class="who">${vs(g)} ${esc(g.opponent)}</div>
          <div class="res ${g.cancelled ? "cx" : g.result || (awaiting(g) ? "cx" : "up")}">${g.cancelled ? "Cancelled" : g.result ? `${g.result} ${g.us}–${g.them}` : awaiting(g) ? pending(g) : timeOf(g.date)}</div>
        </button>`).join("")}</div>
    </div></div>`);
  /* Start the strip at the latest results instead of the season opener */
  const track = $(".scores-track"), focus = $(".sc.next", track) || $(".sc:last-child", track);
  if (focus) track.scrollLeft = Math.max(0, focus.offsetLeft - track.offsetLeft - track.clientWidth + focus.offsetWidth * 2);
  $(".nav-toggle").addEventListener("click", (e) => {
    const open = $(".nav").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });
  const otherKey = Object.keys(TEAMS).find((k) => k !== teamKey);
  $("#site-footer").innerHTML = `
    <div class="wrap foot-top">
      <span class="badge"><img src="${LOGO}" alt=""></span>
      <div class="go">Go Falcons<small>${esc(SCHOOL.school)} ${esc(T.label)}</small></div>
    </div>
    <div class="wrap foot-bot">
      <div>
        ${esc(SCHOOL.address)}<br>
        ${esc(SCHOOL.conference)} · ${esc(T.division)} · Head Coach ${esc(T.headCoach)}
      </div>
      <div class="links">
        <a href="${to(here, otherKey)}">${esc(TEAMS[otherKey].label)}</a>
        <a href="${T.links.hudl}" target="_blank" rel="noopener">Hudl</a>
        <a href="${T.links.arbiter}" target="_blank" rel="noopener">School schedule</a>
        <a href="${T.links.maxpreps}" target="_blank" rel="noopener">MaxPreps</a>
        <a href="${SCHOOL.athletics}" target="_blank" rel="noopener">Falcons Athletics</a>
      </div>
    </div>`;
  /* Links written in the HTML pages keep the chosen team too */
  $$('main a[href$=".html"]').forEach((a) => { a.href = to(a.getAttribute("href")); });

  /* ---------- Pieces reused across pages ---------- */
  function gameRow(g) {
    const d = new Date(g.date);
    const res = g.cancelled
      ? `<div class="result cancelled">Cancelled</div>`
      : g.result
      ? `<div class="result"><span class="wl ${g.result}">${g.result}</span>${g.us}–${g.them}</div>`
      : awaiting(g) ? `<div class="result cancelled">${pending(g)}</div>`
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
    else if (!g.result) body += `<h4>${awaiting(g) ? pending(g) : "Kickoff"}</h4><p>${dateLong(g.date)} · ${timeOf(g.date)}<br>${esc(g.site)}</p>`;
    if (g.result && !g.scrimmage) {
      body += `<h4>Score by Half</h4>`;
      body += g.halves
        ? `<table class="line"><tr><th></th><th>1st</th><th>2nd</th><th>F</th></tr>
             <tr><td>Danvers</td>${g.halves.us.map((h) => `<td>${h}</td>`).join("")}<td>${g.us}</td></tr>
             <tr><td>${esc(g.opponent)}</td>${g.halves.them.map((h) => `<td>${h}</td>`).join("")}<td>${g.them}</td></tr></table>`
        : `<p><span class="tbd">Half scores TBD</span></p>`;
      body += `<h4>Danvers Goals</h4>`;
      if (g.plays) {
        body += `<div class="plays">${g.plays.map((s) => `<div class="row"><span class="q">${esc(s.when)}</span><span>${esc(s.play)}</span>${s.score ? `<span class="sc">${esc(s.score)}</span>` : ""}</div>`).join("")}</div>`;
      } else if (g.scorers?.length) {
        body += `<div class="perf">${g.scorers.map(([name, n]) => `<div class="row"><span class="n">${esc(name)}</span><span>${n === 3 ? "Hat trick" : plural(n, "goal")}</span></div>`).join("")}</div>`;
        if (g.assists?.length) body += `<p class="assist-line"><b>Assists:</b> ${g.assists.map(([name, n]) => esc(name) + (n > 1 ? ` ${n}` : "")).join(", ")}</p>`;
      } else {
        body += g.us ? `<p><span class="tbd">Goal scorers TBD</span></p>` : `<p>Danvers was held scoreless.</p>`;
      }
      if (g.shutout?.length) body += `<h4>In Goal</h4><p>${g.shutout.map(esc).join(" and ")} ${g.shutout.length > 1 ? "shared" : "earned"} the shutout.</p>`;
    }
    if (g.standouts?.length) body += `<h4>Also Stood Out</h4><div class="srcs">${g.standouts.map((n) => `<span class="tag">${esc(n)}</span>`).join("")}</div>`;
    if (g.notes?.length) body += `<h4>Notes</h4><ul>${g.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [
      ...(g.video ? [{ label: "Highlights on Hudl", url: g.video }] : []),
      ...(g.replay ? [{ label: "Full game replay on Hudl", url: g.replay }] : []),
      ...(g.sources || []),
      ...(g.result || g.cancelled || awaiting(g) ? [] : [{ label: "Watch live on Hudl", url: T.links.hudl }])
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
    dlg.innerHTML = gameModal(T.schedule.find((g) => g.id === +btn.dataset.game));
    dlg.showModal();
  });

  function leaders() {
    return [["goals", "Goals"], ["assists", "Assists"], ["points", "Points"]].map(([key, title]) => {
      const best = Math.max(...PLAYERS.map((p) => p[key]), 0);
      const who = PLAYERS.filter((p) => best && p[key] === best).map((p) => p.name);
      const names = who.slice(0, 2).join(" & ") + (who.length > 2 ? ` +${who.length - 2}` : "");
      return `<div class="card leader"><div class="big count">${best}</div><div><div class="cat">${title}</div><div class="who">${esc(names) || "—"}</div></div></div>`;
    }).join("");
  }

  /* ---------- HOME ---------- */
  function home() {
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
          <a class="btn btn-ghost" href="${to("schedule.html")}">Full schedule</a>
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
        <h1>${esc(SCHOOL.name)} ${esc(T.label)}</h1>
        <p>Scores, stats, history and highlights from ${esc(SCHOOL.school)} ${esc(T.label.toLowerCase())}.</p>
        <div class="btn-row"><a class="btn btn-primary" href="${to("schedule.html")}">Full schedule</a></div>`;
    }

    const n = played.length || 1;
    $("#scorestrip").innerHTML =
      tile(["Record", record, `NEC ${rec((g) => g.league)}${rankLine ? ` · ${rankLine}` : ""}`]) +
      (next ? `<button class="card next-game" data-game="${next.id}">
        <div>
          <div class="k">Next game</div>
          <h3>${vs(next)} ${esc(next.opponent)}</h3>
          <div class="meta">${dateLong(next.date)} · ${timeOf(next.date)} · ${esc(next.site)}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : `<div class="card next-game"><div><div class="k">Regular season complete</div><h3>Final record ${record}</h3></div></div>`) +
      tile(["Goals", `${gf}–${ga}`, `${(gf / n).toFixed(1)} scored · ${(ga / n).toFixed(1)} allowed per game`]);

    $("#home-leaders").innerHTML = leaders();
    const ahead = next ? upcoming.slice(upcoming.indexOf(next)) : [];
    $("#home-games").innerHTML = [...SCHEDULE.filter((g) => !ahead.includes(g)).slice(-2), ...ahead.slice(0, 3)].map(gameRow).join("");

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
    $("#stats-asof").textContent = T.statsAsOf;
    $("#stats-note").textContent = T.statsNote;
    $("#coach-line").textContent = `Head coach ${T.headCoach} (${T.coachNote}). Assistants: ${T.assistants.join(", ")}.`;
    $("#team-tiles").innerHTML = [
      ["Record", record, `${SCHOOL.conference} · W–L–T`],
      ["Goals per game", (gf / n).toFixed(1), `${gf} scored`],
      ["Allowed per game", (ga / n).toFixed(1), `${ga} allowed`],
      ["Goal difference", (diff > 0 ? "+" : diff < 0 ? "−" : "") + Math.abs(diff), plural(played.length, "game")]
    ].map(tile).join("");
    $("#leaders").innerHTML = leaders();

    const scorers = PLAYERS.filter((p) => p.points).sort((a, b) => b.points - a.points || b.goals - a.goals);
    const max = Math.max(...scorers.map((p) => p.points), 1);
    $("#scoring").innerHTML = scorers.length ? `
      <div class="legend-row"><span><i class="s2"></i>Goals</span><span><i class="s4"></i>Assists</span></div>
      ${scorers.map((p) => `<div class="bar-row">
          <div class="nm">${esc(p.name)}<small>${p.pos.join(" / ") || "Position TBD"}${p.grade ? ` · ${p.grade}` : ""}</small></div>
          <div class="bar-track"><div class="bar-fill" style="--w:${(p.points / max * 100).toFixed(1)}%">
            ${p.goals ? `<span class="s2" style="flex:${p.goals}" title="${plural(p.goals, "goal")}">${p.goals}</span>` : ""}
            ${p.assists ? `<span class="s4" style="flex:${p.assists}" title="${plural(p.assists, "assist")}">${p.assists}</span>` : ""}
          </div></div>
          <div class="tot">${p.points}<small>${p.goals} G · ${p.assists} A</small></div>
        </div>`).join("")}` : `<div class="empty">No goals recorded yet.</div>`;

    const groupOf = (p) => Object.keys(POSITION_GROUPS).filter((grp) => p.pos.some((x) => POSITION_GROUPS[grp].includes(x)));
    const groups = ["All", ...Object.keys(POSITION_GROUPS).filter((grp) => PLAYERS.some((p) => groupOf(p).includes(grp)))];
    if (PLAYERS.some((p) => !p.pos.length)) groups.push("Position TBD");
    let active = "All", q = "";

    $("#filters").innerHTML = groups.map((grp) => `<button class="chip" aria-pressed="${grp === "All"}" data-group="${grp}">${grp}</button>`).join("")
      + `<input class="search" type="search" placeholder="Search players…" aria-label="Search players">`;

    const statBoxes = (p) => [
      ...(p.points ? [["Goals", p.goals], ["Assists", p.assists], ["Points", p.points]] : []),
      ...(p.shutouts ? [["Shutouts", p.shutouts]] : [])
    ];
    const draw = () => {
      const list = PLAYERS.filter((p) =>
        (active === "All" || (active === "Position TBD" ? !p.pos.length : groupOf(p).includes(active))) &&
        p.name.toLowerCase().includes(q));
      $("#players").innerHTML = list.length ? list.map((p) => `
        <article class="card player">
          <div class="player-top">
            <div class="jersey ${p.num == null ? "unknown" : ""}" title="${p.num == null ? "Jersey number TBD" : ""}">${p.num ?? "#"}</div>
            <div>
              <h3>${esc(p.name)}</h3>
              <div class="posline">
                ${p.pos.length ? p.pos.map((x) => `<span class="pos">${x}</span>`).join("") : `<span class="tbd">Position TBD</span>`}
                ${p.grade ? `<span>${p.grade}</span>` : ""}
                ${p.captain ? `<span class="cap">CAPTAIN</span>` : ""}
              </div>
            </div>
          </div>
          ${statBoxes(p).length ? `<div class="player-stats">${statBoxes(p).map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>` : ""}
          <div class="player-log">
            ${played.filter((g) => p.games[g.id]).map((g) =>
              `<div class="row"><span class="opp">${vs(g)} ${esc(g.opponent)}</span><span>${logLine(p.games[g.id])}</span></div>`).join("")
              || `<span class="tbd">Stats TBD</span>`}
          </div>
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
      ["Overall", record, `Home ${rec((g) => g.home)} · Away ${rec((g) => !g.home)}`],
      ["NEC", rec((g) => g.league), "Conference games"],
      ...(T.ranking ? [["MIAA power rank", T.ranking.rank, `${T.division} · of ${T.ranking.of} teams · ${T.ranking.asOf}`]] : []),
      ["Goals", `${gf}–${ga}`, `${plural(played.length, "game")} played`]
    ].map(tile).join("");
    const done = SCHEDULE.filter((g) => g.result || g.cancelled || awaiting(g));
    const ahead = SCHEDULE.filter((g) => !done.includes(g));
    $("#results").innerHTML = done.length ? [...done].reverse().map(gameRow).join("") : `<div class="empty">No games played yet.</div>`;
    $("#upcoming").innerHTML = ahead.length ? ahead.map(gameRow).join("") : `<div class="empty">Regular season complete.</div>`;
    $("#preseason-block").hidden = !PRESEASON.length;
    $("#preseason").innerHTML = PRESEASON.map(gameRow).join("");
  }

  /* ---------- HISTORY ---------- */
  const SEASONS = T.seasons.map(([year, w, l, t, coach, finish, post, caveat]) => ({ year, w, l, t, coach, finish, post, caveat }));
  const pct = (s) => (s.w + s.t / 2) / (s.w + s.l + s.t);
  const isTitle = (s) => T.necTitles.includes(s.year);

  function winChart() {
    const data = SEASONS.filter((s) => s.w != null).reverse();
    const W = 900, H = 290, L = 34, R = 18, T0 = 24, B = 36, top = 20;
    const x = (i) => L + i * (W - L - R) / (data.length - 1);
    const y = (w) => T0 + (1 - w / top) * (H - T0 - B);
    const pts = data.map((s, i) => [x(i), y(s.w)]);
    const path = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
    return `
      <div class="key"><span><i></i>Wins per season</span><span><i class="t"></i>NEC title year</span></div>
      <div class="table-scroll"><svg viewBox="0 0 ${W} ${H}" style="min-width:720px" role="img" aria-label="Wins per season, ${data[0].year} to ${data[data.length - 1].year}">
        ${[0, 5, 10, 15, 20].map((v) => `<line class="gridl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        <path class="area" d="${path} L${x(data.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z"/>
        <path class="ln" pathLength="1" d="${path}"/>
        ${data.map((s, i) => `
          <circle class="pt ${isTitle(s) ? "title" : ""}" cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="${isTitle(s) ? 5.5 : 3.5}"><title>${s.year}: ${s.w}–${s.l}–${s.t}${s.finish ? " · " + esc(s.finish) : ""}${s.post ? " · " + esc(s.post) : ""}</title></circle>
          ${s.year % 5 === 0 ? `<text x="${pts[i][0].toFixed(1)}" y="${H - 10}" text-anchor="middle">${s.year}</text>` : ""}`).join("")}
      </svg></div>`;
  }

  function history() {
    const full = SEASONS.filter((s) => s.w != null);
    $("#banners").innerHTML = T.banners.map((b) => `<div class="banner"><img src="${LOGO}" alt=""><div class="y">${b.year}</div><div class="l">${esc(b.label)}</div></div>`).join("");
    $("#nec-titles").innerHTML = `
      <div><div class="big count">${T.necTitles.length}</div><div class="cat">Northeastern Conference titles</div></div>
      <div class="years">${T.necTitles.map((yr) => `<span>${yr}</span>`).join("")}</div>`;
    $("#history-note").textContent = T.historyNote;
    $("#chart-span").textContent = `${full[full.length - 1].year} to ${full[0].year}`;
    $("#win-chart").innerHTML = winChart();

    const sum = (k) => full.reduce((n, s) => n + s[k], 0);
    const best = [...full].sort((a, b) => pct(b) - pct(a) || b.w - a.w)[0];
    $("#history-tiles").innerHTML = [
      ["NEC titles", T.necTitles.length, `First in ${T.necTitles[0]} · latest in ${T.necTitles[T.necTitles.length - 1]}`],
      ["All-time record", `${sum("w")}–${sum("l")}–${sum("t")}`, `${full.length} seasons in the record book`],
      ["Best season", `${best.w}–${best.l}–${best.t}`, `${best.year} · ${best.coach}`],
      T.historyTile
    ].map(tile).join("");

    $("#legends").innerHTML = T.legends.map((p, i) => `
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

    const book = (title, lists) => `
      <h3 class="book-head">${title}</h3>
      <div class="grid g4">${Object.entries(lists).map(([cat, rows]) => `
        <div class="card book"><div class="k">${cat}</div><ol>${rows.map(([name, num, when]) =>
          `<li><b>${num}</b><span>${esc(name)}${when ? `<small>${esc(when)}</small>` : ""}</span></li>`).join("")}</ol></div>`).join("")}</div>`;
    $("#record-book").innerHTML = T.records
      ? book("Single Season", T.records.season) + book("Career", T.records.career)
      : `<div class="notice"><strong>Still to come:</strong> the individual-records page of the ${esc(T.label.toLowerCase())} record book (goals, assists, points, saves, shutouts) hasn't been filled in yet.</div>`;
    $("#record-book-link").href = T.links.recordBook;

    const SHOWN = 15;
    $("#records").innerHTML = SEASONS.map((s, i) => `<tr${i >= SHOWN ? ' class="older" hidden' : ""}>
        <td class="yr">${s.year}</td>
        <td class="rec">${s.w == null ? `<span class="tbd">TBD</span>` : `${s.w}–${s.l}–${s.t}`}${s.caveat ? `<small>${esc(s.caveat)}</small>` : ""}</td>
        <td>${s.w == null ? "" : `<div class="bar" title="${(pct(s) * 100).toFixed(0)}% (ties count as half a win)"><i style="width:${pct(s) * 100}%"></i></div>`}</td>
        <td>${esc(s.coach)}</td>
        <td>${/Champ/.test(s.finish) ? `<span class="note-pill">${esc(s.finish)}</span>` : esc(s.finish)}</td>
        <td>${esc(s.post)}</td>
      </tr>`).join("");
    const more = $("#records-more");
    more.textContent = `Show all ${SEASONS.length} seasons`;
    more.addEventListener("click", () => { $$("#records .older").forEach((tr) => { tr.hidden = false; }); more.hidden = true; });

    $("#timeline").innerHTML = T.milestones.map((m) => `<div class="item"><div class="y">${esc(m.year)}</div><p>${esc(m.text)}</p></div>`).join("");
  }

  /* ---------- MEDIA ---------- */
  function media() {
    $("#hudl-home").href = T.links.hudl;
    $("#hudl-video").href = T.links.hudlVideo;
    /* Full-game replays come straight from the schedule's replay links */
    const replays = [...played].reverse().filter((g) => g.replay).map((g) => ({
      title: `Danvers ${vs(g) === "vs" ? "vs." : "at"} ${g.opponent}`, sub: `Full game · ${g.result} ${g.us}–${g.them}`,
      season: SEASON, len: "Full game", url: g.replay, full: true }));
    const all = [...T.videos, ...replays];
    const seasons = ["All", ...(replays.length ? ["Full games"] : []), ...new Set(T.videos.map((v) => v.season))];
    let active = "All";
    $("#video-filters").innerHTML = seasons.map((s) => `<button class="chip" aria-pressed="${s === "All"}" data-season="${s}">${s}</button>`).join("");
    const draw = () => {
      $("#videos").innerHTML = all.filter((v) => active === "All" || (active === "Full games" ? v.full : !v.full && v.season === +active)).map((v) => `
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
    $("#photos").innerHTML = T.photos.length
      ? T.photos.map((p) => `<figure class="photo has-img"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy"><figcaption>${esc(p.caption)}</figcaption></figure>`).join("")
      : Array.from({ length: 8 }, (_, i) => `<div class="photo">Photo ${i + 1}<br>coming soon</div>`).join("");
    $("#photo-note").hidden = T.photos.length > 0;
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
