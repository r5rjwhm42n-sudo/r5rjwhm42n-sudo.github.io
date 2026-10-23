/* Danvers Falcons Football — page rendering. Content lives in data.js. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const page = document.body.dataset.page;
  const LOGO = "images/falcons-logo.png";

  const played = SCHEDULE.filter((g) => g.result);
  const upcoming = SCHEDULE.filter((g) => !g.result && !g.cancelled);
  const past = SCHEDULE.filter((g) => g.result || g.cancelled);
  const wins = played.filter((g) => g.result === "W").length;
  const losses = played.filter((g) => g.result === "L").length;
  const pf = played.reduce((n, g) => n + g.us, 0);
  const pa = played.reduce((n, g) => n + g.them, 0);
  const record = `${wins}–${losses}`;
  const rec = (f) => {
    const g = played.filter(f), w = g.filter((x) => x.result === "W").length;
    return `${w}–${g.length - w}`;
  };

  const fmt = (iso, opts) => new Date(iso).toLocaleString("en-US", opts);
  const dateLong = (iso) => fmt(iso, { weekday: "long", month: "long", day: "numeric" });
  const dateShort = (iso) => fmt(iso, { weekday: "short", month: "short", day: "numeric" });
  const timeOf = (iso) => fmt(iso, { hour: "numeric", minute: "2-digit" });
  const vs = (g) => (g.home ? "vs" : "at");
  const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const tile = ([k, v, d]) => `<div class="card tile"><div class="k">${k}</div><div class="v count">${v}</div><div class="d">${d}</div></div>`;

  /* ---------- Top bar, header, scoreboard strip, footer ---------- */
  const NAV = [["index.html", "Home", "home"], ["stats.html", "Stats", "stats"], ["schedule.html", "Schedule", "schedule"],
               ["history.html", "History", "history"], ["media.html", "Media", "media"]];
  const header = $("#site-header");
  header.insertAdjacentHTML("beforebegin", `
    <div class="topbar"><div class="wrap">
      <span>${esc(TEAM.school)} · ${esc(TEAM.conference)} · ${esc(TEAM.division)}</span>
      <span><a href="${TEAM.links.hudl}" target="_blank" rel="noopener">Hudl</a><a href="${TEAM.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a><a href="../">All Sports</a></span>
    </div></div>`);
  header.innerHTML = `
    <div class="wrap hbar">
      <a class="brand" href="index.html">
        <span class="badge"><img src="${LOGO}" alt="Danvers Falcons logo"></span>
        <span class="brand-text">Danvers Falcons<small>Football</small></span>
      </a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">Menu</button>
      <nav class="nav" aria-label="Main">
        ${NAV.map(([href, label, id]) => `<a href="${href}" class="${id === page ? "active" : ""}">${label}</a>`).join("")}
      </nav>
    </div>`;
  header.insertAdjacentHTML("afterend", `
    <div class="scores"><div class="wrap">
      <div class="scores-label">${TEAM.season}<br>Schedule</div>
      <div class="scores-track">${SCHEDULE.map((g) => `
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
      <div class="go">Go Falcons<small>${esc(TEAM.school)} Football</small></div>
    </div>
    <div class="wrap foot-bot">
      <div>
        ${esc(TEAM.address)}<br>
        ${esc(TEAM.conference)} · ${esc(TEAM.division)} · Head Coach ${esc(TEAM.headCoach)}<br>
        <span class="disclaimer">A Danvers High School DECA student project. Not the official school website.</span>
      </div>
      <div class="links">
        <a href="${TEAM.links.hudl}" target="_blank" rel="noopener">Hudl</a>
        <a href="${TEAM.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a>
        <a href="${TEAM.links.maxpreps}" target="_blank" rel="noopener">MaxPreps</a>
      </div>
    </div>`;

  /* ---------- Pieces reused across pages ---------- */
  function gameRow(g) {
    const d = new Date(g.date);
    const res = g.cancelled
      ? `<div class="result cancelled">Cancelled</div>`
      : g.result
      ? `<div class="result"><span class="wl ${g.result}">${g.result}</span>${g.us}–${g.them}</div>`
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
            <span class="tag">${g.league ? "NEC" : "Non-league"}</span>
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
    else if (!g.result) body += `<h4>Kickoff</h4><p>${dateLong(g.date)} · ${timeOf(g.date)}<br>${esc(g.site)}</p>`;
    if (g.result) {
      body += g.quarters
        ? `<h4>Line Score</h4><table class="line"><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>F</th></tr>
             <tr><td>Danvers</td>${g.quarters.us.map((q) => `<td>${q}</td>`).join("")}<td>${g.us}</td></tr>
             <tr><td>${esc(g.opponent)}</td>${g.quarters.them.map((q) => `<td>${q}</td>`).join("")}<td>${g.them}</td></tr></table>`
        : g.half
        ? `<h4>Line Score</h4><p>Halftime: Danvers ${g.half[0]}, ${esc(g.opponent)} ${g.half[1]}</p>`
        : "";
      body += g.scoring
        ? `<h4>Scoring Summary</h4><div class="plays">${g.scoring.map((s) => `<div class="row"><span class="q">${esc(s.q)}</span><span>${esc(s.play)}</span>${s.score ? `<span class="sc">${esc(s.score)}</span>` : ""}</div>`).join("")}</div>`
        : "";
    }
    if (g.performers?.length) {
      body += `<h4>Top Performers</h4><div class="perf">${g.performers.map((p) => `<div class="row"><span class="n">${esc(p.name)}</span><span>${esc(p.line)}</span></div>`).join("")}</div>`;
    }
    if (g.notes?.length) body += `<h4>Notes</h4><ul>${g.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [...(g.sources || []), ...(g.cancelled ? [] : [{ label: g.result ? "Film on Hudl" : "Watch live on Hudl", url: TEAM.links.hudl }])];
    if (srcs.length) body += `<h4>Links</h4><div class="srcs">${srcs.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("")}</div>`;

    return `
      <div class="modal-head">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="eyebrow">${dateLong(g.date)} · ${g.home ? "Home" : "Away"} · ${g.league ? "NEC" : "Non-league"}${g.cancelled ? " · Cancelled" : g.result ? ` · ${g.result === "W" ? "Win" : "Loss"}` : ""}</div>
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

  const statOf = (p, label) => (p.stats.find((s) => s[0] === label) || [])[1] || 0;
  function leaders() {
    const top = (label) => [...PLAYERS].sort((a, b) => statOf(b, label) - statOf(a, label))[0];
    return [["Rush Yds", "Rushing yards"], ["Rush TD", "Rushing touchdowns"], ["FG Made", "Field goals"]].map(([label, title]) => {
      const p = top(label);
      return `<div class="card leader"><div class="big count">${statOf(p, label)}</div><div><div class="cat">${title}</div><div class="who">${esc(p.name)}</div></div></div>`;
    }).join("");
  }

  /* ---------- HOME ---------- */
  function home() {
    const next = upcoming[0];
    const last = played[played.length - 1];

    if (last) {
      const won = last.result === "W";
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(last.date)}</div>
        <h1>${won ? `Falcons beat ${esc(last.opponent)} ${last.us}–${last.them}, move to ${record}` : `Falcons fall to ${esc(last.opponent)}, ${last.them}–${last.us}`}</h1>
        <p>${esc(last.summary || "")}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-game="${last.id}">Game recap</button>
          <a class="btn btn-ghost" href="schedule.html">Full schedule</a>
        </div>`;
      const row = (name, pts, win, logo) => `
        <div class="sb-row ${win ? "win" : ""}">
          ${logo ? `<img src="${LOGO}" alt="">` : `<span class="dot">${esc(name[0])}</span>`}
          <span class="nm">${esc(name)}</span><span class="pts">${pts}</span>
        </div>`;
      const dan = row("Danvers", last.us, won, true);
      const opp = row(last.opponent, last.them, !won, false);
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard" data-game="${last.id}" aria-label="Last game details">
          <div class="sb-top"><span>Final</span><span>${last.home ? "Home" : "Away"} · ${last.league ? "NEC" : "Non-league"}</span></div>
          ${last.home ? opp + dan : dan + opp}
          <div class="sb-foot"><span>${esc((last.performers || []).slice(0, 2).map((p) => `${p.name.split(" ").pop()}: ${p.line}`).join(" · "))}</span><b>Box score ›</b></div>
        </button>`;
    } else {
      $("#hero-story").innerHTML = `
        <div class="eyebrow">${TEAM.season} season</div>
        <h1>${esc(TEAM.name)} Football</h1>
        <p>Scores, stats, history and highlights from ${esc(TEAM.school)} football.</p>
        <div class="btn-row"><a class="btn btn-primary" href="schedule.html">Full schedule</a></div>`;
    }

    $("#scorestrip").innerHTML =
      tile(["Record", record, `NEC ${rec((g) => g.league)} · Home ${rec((g) => g.home)} · Away ${rec((g) => !g.home)}${TEAM.ranking ? `<br>${esc(TEAM.ranking)}` : ""}`]) +
      (next ? `<button class="card next-game" data-game="${next.id}">
        <div>
          <div class="k">Next game</div>
          <h3>${vs(next)} ${esc(next.opponent)}</h3>
          <div class="meta">${dateLong(next.date)} · ${timeOf(next.date)} · ${esc(next.site)}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : `<div class="card next-game"><div><div class="k">Season complete</div><h3>Final record ${record}</h3></div></div>`) +
      tile(["Points", `${pf}–${pa}`, `${(pf / (played.length || 1)).toFixed(1)} scored · ${(pa / (played.length || 1)).toFixed(1)} allowed per game`]);

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
    const n = played.length || 1;
    $("#stats-asof").textContent = STATS_AS_OF;
    $("#team-tiles").innerHTML = [
      ["Record", record, TEAM.conference],
      ["Points per game", (pf / n).toFixed(1), `${pf} total`],
      ["Allowed per game", (pa / n).toFixed(1), `${pa} total`],
      ["Average margin", (pf - pa >= 0 ? "+" : "") + ((pf - pa) / n).toFixed(1), `${played.length} games`]
    ].map(tile).join("");
    $("#leaders").innerHTML = leaders();

    const yds = (p, g) => +(((p.log[g.id] || "").match(/(\d+)\s*(?:rushing )?yds/) || [])[1] || 0);
    const rushers = PLAYERS.filter((p) => statOf(p, "Rush Yds") > 0).sort((a, b) => statOf(b, "Rush Yds") - statOf(a, "Rush Yds"));
    const max = Math.max(...rushers.map((p) => statOf(p, "Rush Yds")), 1);
    $("#rushing").innerHTML = `
      <div class="legend-row">${played.map((g, i) => `<span><i class="s${i % 6 + 1}"></i>${vs(g)} ${esc(g.opponent)}</span>`).join("")}</div>
      ${rushers.map((p) => {
        const total = statOf(p, "Rush Yds");
        return `<div class="bar-row">
          <div class="nm">${esc(p.name)}<small>${p.pos.join(" / ")}</small></div>
          <div class="bar-track"><div class="bar-fill" style="--w:${(total / max * 100).toFixed(1)}%">
            ${played.map((g, i) => yds(p, g) ? `<span class="s${i % 6 + 1}" style="flex:${yds(p, g)}" title="${yds(p, g)} yds ${vs(g)} ${esc(g.opponent)}">${yds(p, g)}</span>` : "").join("")}
          </div></div>
          <div class="tot">${total}<small>${statOf(p, "Rush TD")} TD</small></div>
        </div>`;
      }).join("")}`;

    const groupOf = (p) => Object.keys(POSITION_GROUPS).filter((grp) => p.pos.some((x) => POSITION_GROUPS[grp].includes(x)));
    const groups = ["All", ...Object.keys(POSITION_GROUPS).filter((grp) => PLAYERS.some((p) => groupOf(p).includes(grp)))];
    let active = "All", q = "";

    $("#filters").innerHTML = groups.map((grp) => `<button class="chip" aria-pressed="${grp === "All"}" data-group="${grp}">${grp}</button>`).join("")
      + `<input class="search" type="search" placeholder="Search players…" aria-label="Search players">`;

    const draw = () => {
      const list = PLAYERS.filter((p) =>
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
          ${p.stats.length ? `<div class="player-stats">${p.stats.map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>` : ""}
          ${Object.keys(p.log).length ? `<div class="player-log">
            ${Object.entries(p.log).map(([id, line]) => {
              const g = SCHEDULE.find((x) => x.id === +id);
              return `<div class="row"><span class="opp">${vs(g)} ${esc(g.opponent)}</span><span>${esc(line)}</span></div>`;
            }).join("")}
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
      ["Home", rec((g) => g.home), TEAM.stadium],
      ["Away", rec((g) => !g.home), "On the road"]
    ].map(tile).join("");
    $("#results").innerHTML = past.length ? [...past].reverse().map(gameRow).join("") : `<div class="empty">No games played yet.</div>`;
    $("#upcoming").innerHTML = upcoming.length ? upcoming.map(gameRow).join("") : `<div class="empty">Season complete.</div>`;
  }

  /* ---------- HISTORY ---------- */
  function winChart() {
    const data = [...SEASONS].reverse();
    const W = 900, H = 290, L = 34, R = 18, T = 30, B = 36, top = 10;
    const x = (i) => L + i * (W - L - R) / (data.length - 1);
    const y = (w) => T + (1 - w / top) * (H - T - B);
    const pts = data.map((s, i) => [x(i), y(s.w)]);
    const line = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
    const isTitle = (s) => TITLES.some((t) => t.year === s.year);
    return `
      <div class="key"><span><i></i>Wins per season</span><span><i class="t"></i>Title or Final Four year</span></div>
      <div class="table-scroll"><svg viewBox="0 0 ${W} ${H}" style="min-width:720px" role="img" aria-label="Wins per season, ${data[0].year} to ${data[data.length - 1].year}">
        ${[0, 5, 10].map((v) => `<line class="gridl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        <path class="area" d="${line} L${x(data.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z"/>
        <path class="ln" pathLength="1" d="${line}"/>
        ${data.map((s, i) => `
          <circle class="pt ${isTitle(s) ? "title" : ""}" cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="${isTitle(s) ? 6.5 : 4.5}"><title>${s.year}: ${s.w}–${s.l}${s.note ? " · " + esc(s.note) : ""}</title></circle>
          <text class="wv" x="${pts[i][0].toFixed(1)}" y="${(pts[i][1] - 13).toFixed(1)}" text-anchor="middle">${s.w}</text>
          <text x="${pts[i][0].toFixed(1)}" y="${H - 10}" text-anchor="middle">’${String(s.year).slice(2)}</text>`).join("")}
      </svg></div>`;
  }

  function history() {
    $("#banners").innerHTML = TITLES.map((t) => `<div class="banner"><img src="${LOGO}" alt=""><div class="y">${t.year}</div><div class="l">${esc(t.label)}</div></div>`).join("");
    $("#win-chart").innerHTML = winChart();
    $("#timeline").innerHTML = MILESTONES.map((m) => `<div class="item"><div class="y">${esc(m.year)}</div><p>${esc(m.text)}</p></div>`).join("");
    $("#records").innerHTML = SEASONS.map((s) => {
      const p = s.w / (s.w + s.l);
      return `<tr>
        <td class="yr">${s.year}</td>
        <td class="rec">${s.w}–${s.l}</td>
        <td>${s.lw}–${s.ll}</td>
        <td><div class="bar" title="${(p * 100).toFixed(0)}% wins"><i style="width:${p * 100}%"></i></div></td>
        <td>${s.note ? `<span class="note-pill">${esc(s.note)}</span>` : ""}</td>
      </tr>`;
    }).join("");
    const tw = SEASONS.reduce((n, s) => n + s.w, 0), tl = SEASONS.reduce((n, s) => n + s.l, 0);
    const best = [...SEASONS].sort((a, b) => b.w / (b.w + b.l) - a.w / (a.w + a.l))[0];
    $("#history-tiles").innerHTML = [
      ["NEC titles", TITLES.filter((t) => /NEC/.test(t.label)).length, "1941 · 2004 · 2005 · 2013 · 2019"],
      [`Since ${SEASONS[SEASONS.length - 1].year}`, `${tw}–${tl}`, `${SEASONS.length} seasons`],
      ["Best recent season", `${best.w}–${best.l}`, `${best.year}`],
      ["Turkey Day rival", "1964", "Gloucester, every Thanksgiving since"]
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
    const seasons = ["All", ...new Set(VIDEOS.map((v) => v.season))];
    let active = "All";
    $("#video-filters").innerHTML = seasons.map((s) => `<button class="chip" aria-pressed="${s === "All"}" data-season="${s}">${s}</button>`).join("");
    const draw = () => {
      $("#videos").innerHTML = VIDEOS.filter((v) => active === "All" || v.season === +active).map((v) => `
        <a class="card lift video" href="${v.url || TEAM.links.hudlVideo}" target="_blank" rel="noopener">
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
