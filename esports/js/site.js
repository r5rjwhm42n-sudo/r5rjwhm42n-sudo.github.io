/* Danvers Falcons Esports — page rendering. Content lives in data.js. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const page = document.body.dataset.page;
  const LOGO = "images/falcons-logo.png";

  const GAME = Object.fromEntries(GAMES.map((g) => [g.id, g]));
  /* A match day counts as "gone by" a few hours after its start time */
  const gone = (m) => new Date(m.date).getTime() + 6 * 36e5 < Date.now();
  /* Match days that have gone by with no score typed in are left off the site */
  const SEASON_DAYS = SCHEDULE.filter((m) => GAME[m.game]).map((m) => m.date).sort();
  const MATCHES = SCHEDULE.filter((m) => GAME[m.game] && (m.result || m.off || !gone(m))).sort((a, b) => new Date(a.date) - new Date(b.date));
  const played = MATCHES.filter((m) => m.result);
  const ahead = MATCHES.filter((m) => !m.result && !gone(m));      /* still to come, break weeks included */
  const upcoming = ahead.filter((m) => !m.off);
  const past = MATCHES.filter((m) => !ahead.includes(m));
  const count = (list, r) => list.filter((m) => m.result === r).length;
  const rec = (f = () => true) => {
    const g = played.filter(f);
    return `${count(g, "W")}–${count(g, "L")}`;
  };
  const record = rec();
  const of = (id) => (m) => m.game === id;
  const gamesWon = played.reduce((n, m) => n + m.us, 0);
  const gamesLost = played.reduce((n, m) => n + m.them, 0);

  const fmt = (iso, opts) => new Date(iso).toLocaleString("en-US", opts);
  const dateLong = (iso) => fmt(iso, { weekday: "long", month: "long", day: "numeric" });
  const dateShort = (iso) => fmt(iso, { weekday: "short", month: "short", day: "numeric" });
  const timeOf = (iso) => fmt(iso, { hour: "numeric", minute: "2-digit" });
  const stage = (m) => m.round || `Week ${m.week}`;
  const stageShort = (m) => m.round || `Wk ${m.week}`;
  const kind = (m) => (m.round ? "Playoffs" : "Regular season");
  const title = (m) => `${GAME[m.game].short} ${m.opponent ? `vs ${m.opponent}` : stage(m)}`;
  const outcome = { W: "Win", L: "Loss" };
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
  const or = (v) => esc(v || "");
  const tile = ([k, v, d]) => `<div class="card tile"><div class="k">${k}</div><div class="v count ${String(v).length > 8 ? "long" : ""}">${v}</div><div class="d">${d}</div></div>`;
  const gameList = GAMES.map((g) => g.short).join(" · ");

  /* ---------- Player numbers, added up from the match lists in data.js ---------- */
  const tally = {};
  const line = (name) => (tally[name] ??= { seen: new Set(), goals: 0, assists: 0, saves: 0, setsW: 0, setsL: 0, pts: 0, log: [] });
  const setText = (w, l, opp) => `${w > l ? "Won" : "Lost"} set ${w}–${l}${opp ? ` vs ${opp}` : ""}`;
  const statText = (g, a, s) => `${plural(g, "goal")} · ${plural(a, "assist")} · ${plural(s, "save")}`;
  played.forEach((m) => {
    (m.sets || []).forEach(([name, w, l, opp]) => {
      const t = line(name);
      t.seen.add(m.id);
      t[w > l ? "setsW" : "setsL"]++;
      t.log.push({ m, text: setText(w, l, opp) });
    });
    (m.stats || []).forEach(([name, g = 0, a = 0, s = 0]) => {
      const t = line(name);
      t.seen.add(m.id);
      t.goals += g; t.assists += a; t.saves += s;
      t.log.push({ m, text: statText(g, a, s) });
    });
    (m.points || []).forEach(([name, p]) => {
      const t = line(name);
      t.seen.add(m.id);
      t.pts += p;
      t.log.push({ m, text: `${p} points` });
    });
  });
  const ROSTER = PLAYERS.map((p) => ({ titles: [], ...p, ...(tally[p.name] || line(p.name)) }));
  const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const hasStats = ROSTER.some((p) => p.log.length);

  /* ---------- Top bar, header, scoreboard strip, footer ---------- */
  const NAV = [["index.html", "Home", "home"], ["stats.html", "Team", "stats"], ["schedule.html", "Schedule", "schedule"],
               ["history.html", "History", "history"], ["media.html", "Media", "media"]];
  const header = $("#site-header");
  header.insertAdjacentHTML("beforebegin", `
    <div class="topbar"><div class="wrap">
      <span class="tb-info">${esc(TEAM.school)} · ${esc(TEAM.league)} · ${esc(TEAM.seasonLabel)}</span>
      <span class="tb-links"><a href="${TEAM.links.league}" target="_blank" rel="noopener">State League</a><a href="${TEAM.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a><a href="../">All Sports</a></span>
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
  const stripRes = (m) => (m.off ? esc(m.off) : m.result ? `${m.result} ${m.us}–${m.them}${m.opponent ? ` · ${esc(m.opponent)}` : ""}`
    : m.opponent ? `vs ${esc(m.opponent)}` : timeOf(m.date));
  header.insertAdjacentHTML("afterend", `
    <div class="scores"><div class="wrap">
      <div class="scores-label">${esc(TEAM.seasonLabel)}<br>Schedule</div>
      <div class="scores-track">${MATCHES.map((m) => `
        <button class="sc ${m === upcoming[0] ? "next" : ""}" data-game="${m.id}">
          <div class="when">${dateShort(m.date)} · ${esc(stageShort(m))}</div>
          <div class="who">${esc(GAME[m.game].short)}</div>
          <div class="res ${m.off ? "cx" : m.result || "up"}">${stripRes(m)}</div>
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
        ${esc(TEAM.address)} · Matches are played online<br>
        ${esc(TEAM.league)} · ${esc(gameList)}${TEAM.headCoach ? ` · ${esc(TEAM.coachTitle || "Head Coach")} ${esc(TEAM.headCoach)}` : ""}
      </div>
      <div class="links">
        <a href="${TEAM.links.school}" target="_blank" rel="noopener">DHS Esports</a>
        <a href="${TEAM.links.league}" target="_blank" rel="noopener">State League</a>
        <a href="${TEAM.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a>
      </div>
    </div>`;
  /* Scroll the top strip so the next match is in view */
  const nextChip = $(".sc.next");
  if (nextChip) $(".scores-track").scrollLeft = Math.max(0, nextChip.offsetLeft - $(".scores-track").offsetLeft - 340);

  /* ---------- Pieces reused across pages ---------- */
  function gameRow(m) {
    const d = new Date(m.date);
    const res = m.off ? `<div class="result noresult">${esc(m.off)}</div>`
      : m.result ? `<div class="result"><span class="wl ${m.result}">${m.result}</span>${m.us}–${m.them}</div>`
      : `<div class="result upcoming">${timeOf(m.date)}</div>`;
    return `
      <button class="game ${m.off ? "is-cancelled" : ""}" data-game="${m.id}" data-title="${m.game}">
        <div class="datebox">
          <div class="m">${fmt(m.date, { month: "short" })}</div>
          <div class="d">${d.getDate()}</div>
          <div class="w">${fmt(m.date, { weekday: "short" })}</div>
        </div>
        <div>
          <div class="opp">${esc(GAME[m.game].short)}</div>
          <div class="meta">
            <span class="tag home">${esc(stage(m))}</span>
            ${m.opponent ? `<b class="vs">vs ${esc(m.opponent)}</b>` : ""}
            <span>${esc(GAME[m.game].series)} · Online</span>
          </div>
        </div>
        ${res}
        <div class="chev" aria-hidden="true">›</div>
      </button>`;
  }

  function matchModal(m) {
    const g = GAME[m.game];
    const head = m.result
      ? `<div class="scoreline">
           <div class="team"><img src="${LOGO}" alt="">Danvers</div>
           <div class="nums">${m.us}<i>–</i>${m.them}</div>
           <div class="team">${esc(m.opponent || "Opponent")}</div>
         </div>`
      : `<h2>${esc(g.short)}${m.opponent ? ` vs ${esc(m.opponent)}` : ""}</h2>`;
    let body = "";
    if (m.summary) body += `<h4>Recap</h4><p>${esc(m.summary)}</p>`;
    if (m.off) body += `<h4>${esc(m.off)}</h4><p>No ${esc(g.short)} match for the Falcons on ${dateLong(m.date)}.</p>`;
    else if (!m.result) body += `<h4>Match Time</h4><p>${dateLong(m.date)} · ${timeOf(m.date)}<br>Played online on ${esc(TEAM.platform)}</p>`;

    if (m.result) {
      if (m.scores?.length) {
        const unit = m.game === "mk" ? "Team points in each game" : "Goals in each game";
        const row = (name, i) => `<tr><td>${esc(name)}</td>${m.scores.map((s) => `<td>${s[i]}</td>`).join("")}<td>${i ? m.them : m.us}</td></tr>`;
        body += `<h4>Game by Game</h4>
          <div class="table-scroll"><table class="line">
            <thead><tr><th>${unit}</th>${m.scores.map((_, i) => `<th>G${i + 1}</th>`).join("")}<th>Series</th></tr></thead>
            <tbody>${row("Danvers", 0)}${row(m.opponent || "Opponent", 1)}</tbody>
          </table></div>`;
      }
      const rows = [
        ...(m.sets || []).map(([n, w, l, opp]) => [n, `<span class="res-pill ${w > l ? "W" : "L"}">${w > l ? "W" : "L"}</span>${w}–${l}${opp ? ` vs ${esc(opp)}` : ""}`]),
        ...(m.stats || []).map(([n, gl = 0, a = 0, s = 0]) => [n, statText(gl, a, s)]),
        ...(m.points || []).map(([n, p]) => [n, `${p} points`])
      ];
      if (rows.length) body += `<h4>${m.sets?.length ? "Set by Set" : "Falcons' Lineup"}</h4><div class="perf">${rows.map(([n, r]) => `<div class="row"><span class="n">${esc(n)}</span><span>${r}</span></div>`).join("")}</div>`;
    }
    body += `<h4>Format</h4><p>${esc(g.name)}: ${esc(g.how)}</p>`;
    if (m.notes?.length) body += `<h4>Notes</h4><ul>${m.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [...(m.sources || []), { label: `${g.short} rulebook`, url: g.rules }, { label: "State league", url: TEAM.links.league }];
    body += `<h4>Links</h4><div class="srcs">${srcs.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("")}</div>`;

    return `
      <div class="modal-head">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="eyebrow">${dateLong(m.date)} · ${esc(g.short)} · ${esc(stage(m))}${m.off ? ` · ${esc(m.off)}` : m.result ? ` · ${outcome[m.result]}` : ""}</div>
        ${head}
      </div>
      <div class="modal-body">${body}</div>`;
  }

  /* Any element with data-game (schedule rows, the top strip, the hero) opens the match popup */
  const dlg = document.createElement("dialog");
  dlg.className = "modal";
  document.body.appendChild(dlg);
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target.closest(".modal-close")) dlg.close();
  });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-game]");
    if (!btn) return;
    dlg.innerHTML = matchModal(MATCHES.find((m) => m.id === +btn.dataset.game));
    dlg.showModal();
  });

  /* One card per game: lineup size, match day, format and the Falcons' record in it */
  function gameCards() {
    return GAMES.map((g) => {
      const n = played.filter(of(g.id)).length;
      return `<div class="card leader gamecard">
        <div class="big">${g.size}v${g.size}</div>
        <div>
          <div class="cat">${esc(g.day)}s</div>
          <div class="who">${esc(g.name)}</div>
          <div class="d">${n ? `<b>${rec(of(g.id))}</b> this season · ` : ""}${esc(TEAM.matchTime)} · ${esc(g.series)} · ${esc(g.system)}</div>
        </div>
      </div>`;
    }).join("");
  }

  function leaders() {
    const top = (f) => [...ROSTER].sort((a, b) => f(b) - f(a))[0];
    const picks = [
      [(p) => p.setsW, "Smash sets won"],
      [(p) => p.goals, "Rocket League goals"],
      [(p) => p.pts, "Mario Kart points"],
      [(p) => p.saves, "Rocket League saves"],
      [(p) => p.assists, "Rocket League assists"]
    ].map(([f, cat]) => [f(top(f) || {}), cat, top(f)]).filter(([n]) => n > 0).slice(0, 3);
    if (!picks.length) return "";
    return picks.map(([big, cat, p]) => `<div class="card leader"><div class="big count">${big}</div><div><div class="cat">${cat}</div><div class="who">${esc(p.name)}</div></div></div>`).join("");
  }

  /* ---------- HOME ---------- */
  function home() {
    const next = upcoming[0];
    const lastG = played[played.length - 1];

    if (lastG) {
      const r = lastG.result, g = GAME[lastG.game], opp = lastG.opponent;
      const headline = r === "W"
        ? (opp ? `Falcons beat ${esc(opp)} ${lastG.us}–${lastG.them} in ${esc(g.short)}` : `Falcons win ${esc(g.short)} series, ${lastG.us}–${lastG.them}`)
        : (opp ? `Falcons fall to ${esc(opp)}, ${lastG.them}–${lastG.us}, in ${esc(g.short)}` : `Falcons drop ${esc(g.short)} series, ${lastG.them}–${lastG.us}`);
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(lastG.date)} · ${esc(stage(lastG))}</div>
        <h1>${headline}</h1>
        <p>${esc(lastG.summary || `The Falcons are ${rec(of(g.id))} in ${g.short} and ${record} across all games this season.`)}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-game="${lastG.id}">Match recap</button>
          <a class="btn btn-ghost" href="schedule.html">Full schedule</a>
        </div>`;
      const row = (name, pts, win, logo) => `
        <div class="sb-row ${win ? "win" : ""}">
          ${logo ? `<img src="${LOGO}" alt="">` : `<span class="dot">${esc(name[0])}</span>`}
          <span class="nm">${esc(name)}</span><span class="pts">${pts}</span>
        </div>`;
      const detail = lastG.scores?.length ? lastG.scores.map((s) => `${s[0]}–${s[1]}`).join(" · ")
        : lastG.sets?.length ? `${lastG.sets.filter(([, w, l]) => w > l).length} of ${lastG.sets.length} sets won` : g.series;
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard" data-game="${lastG.id}" aria-label="Last match details">
          <div class="sb-top"><span>Final</span><span>${esc(g.short)} · ${esc(stage(lastG))}</span></div>
          ${row("Danvers", lastG.us, r === "W", true)}${row(opp || "Opponent", lastG.them, r === "L", false)}
          <div class="sb-foot"><span>${esc(detail)}</span><b>Details ›</b></div>
        </button>`;
    } else {
      $("#hero-story").innerHTML = `
        <div class="eyebrow">${esc(TEAM.seasonLabel)} season</div>
        <h1>${esc(TEAM.name)} ${esc(TEAM.sport)}</h1>
        <p>${esc(GAMES.map((g) => g.name).join(", ").replace(/, ([^,]*)$/, " and $1"))}. The Falcons compete online in the Massachusetts state league, with a state title on the line in every game.</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="schedule.html">Full schedule</a>
          <a class="btn btn-ghost" href="schedule.html#format">How matches work</a>
        </div>`;
      $("#scoreboard").innerHTML = `
        <a class="card scoreboard matchdays" href="schedule.html">
          <div class="sb-top"><span>Match days</span><span>${esc(TEAM.matchTime)} · Online</span></div>
          ${GAMES.map((g) => `
            <div class="sb-row win">
              <span class="dot">${g.size}v${g.size}</span>
              <span class="nm">${esc(g.short)}</span><span class="pts">${esc(g.day.slice(0, 3))}</span>
            </div>`).join("")}
          <div class="sb-foot"><span>Regular season ${fmt(SEASON_DAYS[0], { month: "short", day: "numeric" })} – ${fmt(SEASON_DAYS[SEASON_DAYS.length - 1], { month: "short", day: "numeric" })}</span><b>Schedule ›</b></div>
        </a>`;
    }

    const also = next ? upcoming.filter((m) => m !== next && m.date.slice(0, 10) === next.date.slice(0, 10)).map((m) => GAME[m.game].short) : [];
    $("#scorestrip").innerHTML =
      tile(played.length
        ? ["Record", record, GAMES.map((g) => `${g.short} ${rec(of(g.id))}`).join(" · ")]
        : ["Season", esc(TEAM.seasonLabel), `${GAMES.length} games · played online`]) +
      (next ? `<button class="card next-game" data-game="${next.id}">
        <div>
          <div class="k">Next match</div>
          <h3>${esc(GAME[next.game].short)}${next.opponent ? ` vs ${esc(next.opponent)}` : ""}</h3>
          <div class="meta">${dateLong(next.date)} · ${timeOf(next.date)} · ${esc(stage(next))}${also.length ? ` · ${esc(also.join(" and "))} the same day` : ""}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : `<div class="card next-game"><div><div class="k">Season complete</div><h3>Final record ${record}</h3></div></div>`) +
      tile(played.length
        ? ["Games won", `${gamesWon}–${gamesLost}`, `Across ${played.length} series`]
        : ["Games", GAMES.length, gameList]);

    $("#home-games-cards").innerHTML = gameCards();
    $("#about").innerHTML = `
      <div><div class="k">About the team</div><p>${esc(TEAM.about)}</p></div>
      <dl>
        ${TEAM.headCoach ? `<div><dt>${esc(TEAM.coachTitle || "Coach")}</dt><dd>${or(TEAM.headCoach)}</dd></div>` : ""}
        ${TEAM.room ? `<div><dt>Home base</dt><dd>${or(TEAM.room)}</dd></div>` : ""}
        ${TEAM.meets ? `<div><dt>Practice</dt><dd>${or(TEAM.meets)}</dd></div>` : ""}
        <div><dt>League</dt><dd>${esc(TEAM.league)} · ${esc(TEAM.platform)}</dd></div>
      </dl>`;
    $("#home-games").innerHTML = [...played.slice(-2), ...upcoming.slice(0, 4)].map(gameRow).join("");

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

  /* ---------- ROSTER / STATS ---------- */
  function stats() {
    $("#stats-asof").textContent = STATS_AS_OF || (played.length ? `Through ${played.length} series` : TEAM.seasonLabel);
    $("#team-tiles").innerHTML = (played.length
      ? [["Overall", record, `${TEAM.seasonLabel} · all games`], ...GAMES.map((g) => [g.short, rec(of(g.id)), `${g.day}s · ${g.size}v${g.size}`])]
      : [["Games", GAMES.length, "Played online"], ...GAMES.map((g) => [g.short, `${g.size}v${g.size}`, `${g.day}s · ${TEAM.matchTime}`])]
    ).map(tile).join("");
    $("#coach-line").innerHTML = [
      TEAM.headCoach && `<strong>${esc(TEAM.coachTitle || "Head coach")}:</strong> ${esc(TEAM.headCoach)}${TEAM.coachNote ? ` (${esc(TEAM.coachNote)})` : ""}`,
      TEAM.assistants.length && `<strong>Assistants:</strong> ${esc(TEAM.assistants.join(", "))}`,
      TEAM.room && `<strong>Plays in:</strong> ${esc(TEAM.room)}${TEAM.meets ? ` (${esc(TEAM.meets.toLowerCase())})` : ""}`,
      `<strong>League:</strong> ${esc(TEAM.league)} on ${esc(TEAM.platform)}`
    ].filter(Boolean).join(" · ");
    if (TEAM.headCoach) $("#join-text").textContent = `Esports runs in the fall and the spring and is open to every grade and skill level. Talk to ${TEAM.coachTitle || "Coach"} ${TEAM.headCoach}${TEAM.room ? ` in ${TEAM.room.replace(/^Rooms? /, "").replace(" and ", " or ")}` : ""}.`;
    $("#leaders").innerHTML = leaders();
    $("#leaders").closest("section").hidden = !$("#leaders").innerHTML;
    /* No roster published yet: leave the lineup and player sections out */
    $("#lineups").closest("section").hidden = !ROSTER.length;
    $("#players").closest("section").hidden = !ROSTER.length;

    /* One lineup card per game */
    $("#lineups").innerHTML = GAMES.map((g) => {
      const list = ROSTER.filter((p) => p.titles.includes(g.id));
      return `<div class="card book">
        <div class="k">${g.size}v${g.size} · ${esc(g.day)}s</div>
        <h3>${esc(g.name)}</h3>
        ${list.length
          ? `<ol>${list.map((p) => `<li><b>${esc(p.grade || "—")}</b><span>${esc(p.name)}${p.captain ? ` <span class="cap">C</span>` : ""}<small>${esc([p.tag, p.main].filter(Boolean).join(" · "))}</small></span></li>`).join("")}</ol>`
          : `<p class="slot">${g.size} players a side</p>`}
      </div>`;
    }).join("");

    const groups = [["all", "All"], ...GAMES.map((g) => [g.id, g.short])];
    let active = "all", q = "";
    $("#filters").innerHTML = groups.map(([id, label]) => `<button class="chip" aria-pressed="${id === "all"}" data-group="${id}">${esc(label)}</button>`).join("")
      + `<input class="search" type="search" placeholder="Search players…" aria-label="Search players">`;

    const statBox = (p) => [
      p.seen.size && ["Matches", p.seen.size],
      (p.setsW || p.setsL) && ["Sets", `${p.setsW}–${p.setsL}`],
      p.goals && ["Goals", p.goals],
      p.assists && ["Assists", p.assists],
      p.saves && ["Saves", p.saves],
      p.pts && ["MK points", p.pts]
    ].filter(Boolean).slice(0, 4);

    const draw = () => {
      if (!ROSTER.length) return;
      const list = ROSTER.filter((p) => (active === "all" || p.titles.includes(active)) && `${p.name} ${p.tag || ""}`.toLowerCase().includes(q));
      $("#players").innerHTML = list.length ? list.map((p) => `
        <article class="card player">
          <div class="player-top">
            <div class="jersey initials">${esc(initials(p.name))}</div>
            <div>
              <h3>${esc(p.name)}</h3>
              <div class="posline">
                ${p.grade ? `<span class="pos">${esc(p.grade)}</span>` : ""}
                ${p.titles.map((t) => (GAME[t] ? `<span class="pos">${esc(GAME[t].short)}</span>` : "")).join("")}
                ${p.captain ? `<span class="cap">CAPTAIN</span>` : ""}
                ${p.tag ? `<span>“${esc(p.tag)}”</span>` : ""}
              </div>
            </div>
          </div>
          ${statBox(p).length ? `<div class="player-stats">${statBox(p).map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>` : ""}
          <div class="player-log">
            ${[p.main && `Main: ${p.main}`, p.note].filter(Boolean).map((t) => `<div class="row"><span>${esc(t)}</span></div>`).join("")}
            ${p.log.map((x) => `<div class="row"><span class="opp">${esc(title(x.m))}</span><span>${esc(x.text)}</span></div>`).join("")}
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
    $("#sched-tiles").innerHTML = (played.length
      ? [["Overall", record, `${TEAM.seasonLabel} · all games`], ...GAMES.map((g) => [g.short, rec(of(g.id)), `${g.day}s · ${TEAM.matchTime}`])]
      : [["Season", esc(TEAM.seasonLabel), "Played online"], ...GAMES.map((g) => [g.short, `${g.day.slice(0, 3)}s`, `${TEAM.matchTime} · ${g.size}v${g.size}`])]
    ).map(tile).join("");
    $("#formats").innerHTML = GAMES.map((g) => `
      <div class="card howto">
        <div class="k">${g.size}v${g.size} · ${esc(g.series)}</div>
        <h3>${esc(g.name)}</h3>
        <p>${esc(g.how)}</p>
        <p class="fine"><a href="${g.rules}" target="_blank" rel="noopener">Full rulebook ↗</a> · ${esc(g.system)}</p>
      </div>`).join("");

    let active = "all";
    $("#sched-filters").innerHTML = [["all", "All games"], ...GAMES.map((g) => [g.id, g.short])]
      .map(([id, label]) => `<button class="chip" aria-pressed="${id === "all"}" data-group="${id}">${esc(label)}</button>`).join("");
    const draw = () => {
      const pick = (m) => active === "all" || m.game === active;
      const up = ahead.filter(pick), done = past.filter(pick);
      $("#upcoming").innerHTML = up.length ? up.map(gameRow).join("") : `<div class="empty">No matches left on the schedule.</div>`;
      $("#results").innerHTML = done.length ? [...done].reverse().map(gameRow).join("") : `<div class="empty">No results for this game yet.</div>`;
    };
    $("#sched-filters").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      active = chip.dataset.group;
      $$("#sched-filters .chip").forEach((c) => c.setAttribute("aria-pressed", c === chip));
      draw();
    });
    draw();
    $("#results").closest("section").hidden = !past.length;

    $("#postseason").innerHTML = POSTSEASON.map((p) => `<div class="item"><div class="y">${esc(p.when)}</div><p>${esc(p.text)}</p></div>`).join("");
    $("#postseason-note").textContent = POSTSEASON_NOTE;
  }

  /* ---------- HISTORY ---------- */
  function history() {
    $("#banners").innerHTML = BANNERS.map((t) => `<div class="banner"><img src="${LOGO}" alt=""><div class="y">${esc(t.year)}</div><div class="l">${esc(t.label)}</div></div>`).join("");
    $("#banners").closest("section").hidden = !BANNERS.length;

    const wins = (id, school) => CHAMPIONS.filter((c) => c[id]?.[0] === school).length;
    const smashNeighbor = NEIGHBORS.map((s) => [s, wins("ssbu", s)]).sort((a, b) => b[1] - a[1])[0];
    $("#history-tiles").innerHTML = [
      ["State titles a year", GAMES.length * 2, `${GAMES.length} games, fall and spring seasons`],
      ["League seasons", CHAMPIONS.length + 1, "State champions crowned since Fall 2018"],
      smashNeighbor?.[1] ? [`${smashNeighbor[0]} Smash titles`, smashNeighbor[1], "A Northeastern Conference school, like Danvers"] : ["Games", GAMES.length, gameList],
      BANNERS.length ? ["Falcons banners", BANNERS.length, "And counting"] : ["First state season", "2018", "Massachusetts high school esports began in the fall of 2018"]
    ].map(tile).join("");

    const cell = (c) => (c
      ? `<b class="${NEIGHBORS.includes(c[0]) ? "near" : ""}">${esc(c[0])}</b><small>def. <span class="${NEIGHBORS.includes(c[1]) ? "near" : ""}">${esc(c[1])}</span></small>`
      : `<span class="none">—</span>`);
    $("#champions").innerHTML = CHAMPIONS.map((c) => `<tr>
        <td class="yr">${esc(c.season)}</td>
        ${GAMES.map((g) => `<td>${cell(c[g.id])}</td>`).join("")}
      </tr>`).join("");
    $("#champions-head").innerHTML = `<th>Season</th>${GAMES.map((g) => `<th>${esc(g.short)}</th>`).join("")}`;

    $("#records").innerHTML = SEASONS.length ? SEASONS.map((s) => `<tr>
        <td class="yr">${esc(s.season)}</td>
        <td>${esc(GAME[s.game]?.short || s.game)}</td>
        <td class="rec">${s.w}–${s.l}</td>
        <td>${s.note ? `<span class="note-pill">${esc(s.note)}</span>` : ""}</td>
      </tr>`).join("") : "";
    if (!SEASONS.length) {   // no past seasons yet: milestones take the full width
      const col = $("#records").closest(".grid > div");
      col.parentElement.classList.remove("g2");
      col.remove();
    }
    $("#timeline").innerHTML = MILESTONES.map((m) => `<div class="item"><div class="y">${esc(m.year)}</div><p>${esc(m.text)}</p></div>`).join("");
  }

  /* ---------- MEDIA ---------- */
  function media() {
    $("#news").innerHTML = NEWS.length ? NEWS.map((n) => `
      <a class="card lift news" href="${n.url}" target="_blank" rel="noopener">
        <div class="when">${fmt(n.date + "T12:00", { month: "long", day: "numeric", year: "numeric" })}</div>
        <h3>${esc(n.title)}</h3>
        <p>${esc(n.blurb)}</p>
        <span class="go">Read at ${esc(n.source)} ↗</span>
      </a>`).join("") : "";
    $("#streams").innerHTML = STREAMS.map((s) => `<a class="btn btn-primary" href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("");
    $("#photos").innerHTML = PHOTOS.map((p) => `<figure class="photo has-img"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy"><figcaption>${esc(p.caption)}</figcaption></figure>`).join("");
    /* Leave out any section with nothing in it yet */
    $("#news").closest("section").hidden = !NEWS.length;
    $("#streams").closest("section").hidden = !STREAMS.length;
    $("#photos").closest("section").hidden = !PHOTOS.length;
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
