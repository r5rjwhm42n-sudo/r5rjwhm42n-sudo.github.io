/* Danvers Falcons Football — page rendering. Content lives in data.js. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  /* where a video lives, for the "Watch on …" labels (a video's `by` names the channel) */
  const host = (url) => (/youtu/.test(url || "") ? "YouTube" : /nfhsnetwork/.test(url || "") ? "NFHS Network" : "Hudl");
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
  /* a playoff game can go on the schedule before the MIAA sets its day (dateTbd, with the
     round's days in `dates`) or its kickoff time (timeTbd) */
  const dayOf = (g, f) => (g.dateTbd ? g.dates : f(g.date));
  const startOf = (g) => (g.dateTbd || g.timeTbd ? "" : timeOf(g.date));
  const kind = (g) => (g.postseason ? `MIAA ${g.round || "tournament"}` : g.league ? "NEC" : "Non-league");
  const vs = (g) => (g.home ? "vs" : "at");
  const seed = TEAM.bracket?.seeds ? TEAM.bracket.seeds.findIndex((s) => /^Danvers\b/.test(s)) + 1 : 0;   // once the MIAA bracket is out
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
          <div class="when">${esc(dayOf(g, dateShort))}${g.result ? " · Final" : ""}</div>
          <div class="who">${vs(g)} ${esc(g.opponent)}</div>
          <div class="res ${g.cancelled ? "cx" : g.result || "up"}">${g.cancelled ? "Cancelled" : g.result ? `${g.result} ${g.us}–${g.them}` : startOf(g) || esc(g.round || "")}</div>
        </button>`).join("")}</div>
    </div></div>`);
  $(".nav-toggle").addEventListener("click", (e) => {
    const open = $(".nav").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });

  /* ---------- Pieces reused across pages ---------- */
  function gameRow(g) {
    const d = new Date(g.date);
    const res = g.cancelled
      ? `<div class="result cancelled">Cancelled</div>`
      : g.result
      ? `<div class="result"><span class="wl ${g.result}">${g.result}</span>${g.us}–${g.them}</div>`
      : `<div class="result upcoming">${startOf(g)}</div>`;
    return `
      <button class="game ${g.cancelled ? "is-cancelled" : ""}" data-game="${g.id}">
        <div class="datebox">
          <div class="m">${fmt(g.date, { month: "short" })}</div>
          <div class="d">${g.dateTbd ? esc(g.dates.replace(/^\D+/, "")) : d.getDate()}</div>
          <div class="w">${g.dateTbd ? "&nbsp;" : fmt(g.date, { weekday: "short" })}</div>
        </div>
        <div>
          <div class="opp"><small>${vs(g).toUpperCase()}</small>${esc(g.opponent)}</div>
          <div class="meta">
            <span class="tag ${g.home ? "home" : ""}">${g.home ? "Home" : "Away"}</span>
            <span class="tag">${kind(g)}</span>
            ${g.tag ? `<span class="tag big">${esc(g.tag)}</span>` : ""}
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
    else if (!g.result) body += `<h4>Kickoff</h4><p>${esc([dayOf(g, dateLong), startOf(g)].filter(Boolean).join(" · "))}<br>${esc(g.site)}</p>`;
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
    if (g.notes?.length) body += `<h4>Notes</h4><ul>${g.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [...(g.sources || []), ...(g.cancelled ? [] : [{ label: g.result ? "Film on Hudl" : "Watch live on Hudl", url: TEAM.links.hudl }])];
    if (srcs.length) body += `<h4>Links</h4><div class="srcs">${srcs.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("")}</div>`;

    return `
      <div class="modal-head">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="eyebrow">${esc(dayOf(g, dateLong))} · ${g.home ? "Home" : "Away"} · ${kind(g)}${g.cancelled ? " · Cancelled" : g.result ? ` · ${g.result === "W" ? "Win" : "Loss"}` : ""}</div>
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
    /* a game with spotlight: {...} leads the page from a week out until it's played */
    const big = SCHEDULE.find((g) => g.spotlight && !g.result && !g.cancelled &&
      Date.now() > new Date(g.date).getTime() - 7 * 864e5 && Date.now() < new Date(g.date).getTime() + 12 * 36e5);

    if (big) {
      const sp = big.spotlight;
      const when = new Date(big.date).toDateString() === new Date().toDateString() ? "Tonight" : dateShort(big.date);
      const slug = big.opponent.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      $(".hero-home").classList.add("spot");
      $("#hero-story").innerHTML = `
        <div class="eyebrow spot-eyebrow">${esc(big.tag || sp.kicker)} · ${esc(when)} ${timeOf(big.date)}</div>
        <h1>Danvers ${vs(big)} <em>${esc(big.opponent)}</em></h1>
        <p>${esc(sp.blurb)}</p>
        <div class="btn-row">
          ${sp.watch ? `<a class="btn btn-gold" href="${esc(sp.watch)}" target="_blank" rel="noopener">Watch live</a>` : ""}
          <button class="btn btn-ghost" data-game="${big.id}">Game preview</button>
        </div>`;
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard spot-board" data-game="${big.id}" aria-label="Title game details">
          <div class="sb-top"><span>${esc(big.tag || sp.kicker)}</span><span>${esc(when)}</span></div>
          <div class="sb-row"><img src="${LOGO}" alt=""><span class="nm">Danvers</span><span class="rec">${record}</span></div>
          <div class="sb-row"><img src="../images/opponents/${slug}.png" alt="" class="opp-img" onerror="this.style.visibility='hidden'"><span class="nm">${esc(big.opponent)}</span><span class="rec">${esc((sp.oppRecord || "").split(" · ")[0])}</span></div>
          <div class="sb-foot"><span>${vs(big) === "at" ? "At " : ""}${esc(big.site)} · ${timeOf(big.date)}</span><b>Preview ›</b></div>
        </button>`;
    } else if (last) {
      const won = last.result === "W";
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(last.date)}</div>
        <h1>${won ? `Falcons beat ${esc(last.opponent)} ${last.us}–${last.them}, move to ${record}` : `Falcons fall to ${esc(last.opponent)}, ${last.them}–${last.us}`}</h1>
        <p>${esc(last.summary || "")}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-game="${last.id}">Game recap</button>
          <a class="btn btn-ghost" href="#schedule">Full schedule</a>
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
          <div class="sb-top"><span>Final</span><span>${last.home ? "Home" : "Away"} · ${kind(last)}</span></div>
          ${last.home ? opp + dan : dan + opp}
          <div class="sb-foot"><span>${esc(last.site || "")}</span><b>Box score ›</b></div>
        </button>`;
    } else {
      $("#hero-story").innerHTML = `
        <div class="eyebrow">${TEAM.season} season</div>
        <h1>${esc(TEAM.name)} Football</h1>
        <p>Scores, stats, history and highlights from ${esc(TEAM.school)} football.</p>
        <div class="btn-row"><a class="btn btn-primary" href="#schedule">Full schedule</a></div>`;
    }

    $("#scorestrip").innerHTML =
      tile(["Record", record, `NEC ${rec((g) => g.league)} · Home ${rec((g) => g.home)} · Away ${rec((g) => !g.home)}${seed ? `<br><a href="/#bracket-football">No. ${seed} seed in the ${esc(TEAM.division.replace("MIAA ", ""))} tournament · see the bracket →</a>` : TEAM.ranking ? `<br>${esc(TEAM.ranking)}` : ""}`]) +
      (next ? `<button class="card next-game" data-game="${next.id}">
        <div>
          <div class="k">Next game</div>
          <h3>${vs(next)} ${esc(next.opponent)}</h3>
          <div class="meta">${esc([dayOf(next, dateLong), startOf(next), next.site].filter(Boolean).join(" · "))}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : `<div class="card next-game"><div><div class="k">Season complete</div><h3>Final record ${record}</h3></div></div>`) +
      tile(["Points", `${pf}–${pa}`, `${(pf / (played.length || 1)).toFixed(1)} scored · ${(pa / (played.length || 1)).toFixed(1)} allowed per game`]);

    if (next && startOf(next)) {   // counts down once the kickoff is set
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
  const PLAYED = SEASONS.filter((s) => s.w != null);
  const pct = (s) => (s.w + s.t / 2) / (s.w + s.l + s.t);
  const wlt = (s) => `${s.w}–${s.l}${s.t ? `–${s.t}` : ""}`;
  const leagueTitle = (yr) => TITLES.find((t) => t.year === yr && /NEC|League/.test(t.label));

  function winChart() {
    const data = [...PLAYED].reverse();
    const W = 900, H = 290, L = 34, R = 18, T = 24, B = 36, top = 10;
    const y0 = data[0].year, y1 = data[data.length - 1].year;
    const x = (yr) => L + (yr - y0) * (W - L - R) / (y1 - y0);   // by year, so seasons with no team leave a gap
    const y = (w) => T + (1 - w / top) * (H - T - B);
    const pts = data.map((s) => [x(s.year), y(s.w)]);
    const runs = [];   // unbroken stretches of seasons
    data.forEach((s, i) => { if (!i || s.year - data[i - 1].year > 1) runs.push([]); runs[runs.length - 1].push(pts[i]); });
    const trace = (run) => run.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
    const area = runs.map((run) => `${trace(run)} L${run[run.length - 1][0].toFixed(1)} ${y(0)} L${run[0][0].toFixed(1)} ${y(0)} Z`).join(" ");
    const isTitle = (s) => TITLES.some((t) => t.year === s.year);
    return `
      <div class="key"><span><i></i>Wins per season</span><span><i class="t"></i>Title or Final Four year</span></div>
      <div class="table-scroll"><svg viewBox="0 0 ${W} ${H}" style="min-width:720px" role="img" aria-label="Wins per season, ${y0} to ${y1}">
        ${[0, 5, 10].map((v) => `<line class="gridl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        <path class="area" d="${area}"/>
        ${runs.map((run) => `<path class="ln" pathLength="1" d="${trace(run)}"/>`).join("")}
        ${data.map((s, i) => `
          <circle class="pt ${isTitle(s) ? "title" : ""}" cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="${isTitle(s) ? 5.5 : 3}"><title>${s.year}: ${wlt(s)} · ${esc(s.coach)}${s.post && s.post !== "Did not qualify" ? " · " + esc(s.post) : ""}</title></circle>
          ${s.year % 10 === 0 ? `<text x="${pts[i][0].toFixed(1)}" y="${H - 10}" text-anchor="middle">${s.year}</text>` : ""}`).join("")}
      </svg></div>`;
  }

  function history() {
    $("#banners").innerHTML = TITLES.map((t) => `<div class="banner"><img src="${LOGO}" alt=""><div class="y">${t.year}</div><div class="l">${esc(t.label)}</div></div>`).join("");
    $("#chart-span").textContent = `${PLAYED[PLAYED.length - 1].year} to ${PLAYED[0].year}`;
    $("#win-chart").innerHTML = winChart();
    $("#timeline").innerHTML = MILESTONES.map((m) => `<div class="item"><div class="y">${esc(m.year)}</div><p>${esc(m.text)}</p></div>`).join("");

    const SHOWN = 15;
    $("#records").innerHTML = SEASONS.map((s, i) => {
      const hide = i >= SHOWN ? ' class="older" hidden' : "";
      if (s.w == null) return `<tr${hide}><td class="yr">${s.year}</td><td class="rec">–<small>${esc(s.note || "")}</small></td><td></td><td></td><td></td><td></td></tr>`;
      const title = leagueTitle(s.year);
      return `<tr${hide}>
        <td class="yr">${s.year}</td>
        <td class="rec">${wlt(s)}${s.lw != null ? `<small>League ${s.lw}–${s.ll}</small>` : ""}${s.note ? `<small>${esc(s.note)}</small>` : ""}</td>
        <td><div class="bar" title="${(pct(s) * 100).toFixed(0)}% (ties count as half a win)"><i style="width:${pct(s) * 100}%"></i></div></td>
        <td>${esc(s.coach)}</td>
        <td>${title ? `<span class="note-pill">${esc(title.label)}</span>${s.nec ? ` ${esc(s.nec)}` : ""}` : esc(s.nec || "")}</td>
        <td>${esc(s.post || "")}</td>
      </tr>`;
    }).join("");
    const more = $("#records-more");
    more.textContent = `Show all ${SEASONS.length} seasons`;
    more.addEventListener("click", () => { $$("#records .older").forEach((tr) => { tr.hidden = false; }); more.hidden = true; });

    $("#honors").innerHTML = HONORS.map((h, i) => `<tr${i >= SHOWN ? ' class="older" hidden' : ""}>
        <td class="yr">${h.year}</td>
        <td>${esc(h.captains || "")}</td>
        <td>${esc(h.allLeague || "")}</td>
        <td>${esc(h.note || "")}</td>
      </tr>`).join("");
    const moreHonors = $("#honors-more");
    moreHonors.textContent = `Show all ${HONORS.length} seasons`;
    moreHonors.hidden = HONORS.length <= SHOWN;
    moreHonors.addEventListener("click", () => { $$("#honors .older").forEach((tr) => { tr.hidden = false; }); moreHonors.hidden = true; });

    const sum = (k) => PLAYED.reduce((n, s) => n + s[k], 0);
    const best = [...PLAYED].sort((a, b) => pct(b) - pct(a) || b.w - a.w)[0];
    const nec = TITLES.filter((t) => /NEC/.test(t.label));
    $("#history-tiles").innerHTML = [
      ["NEC titles", nec.length, nec.map((t) => t.year).join(" · ")],
      ["All-time record", `${sum("w")}–${sum("l")}`, `Plus ${sum("t")} ties · ${PLAYED.length} seasons since ${PLAYED[PLAYED.length - 1].year}`],
      ["Best season", wlt(best), `${best.year} · ${best.coach}`],
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
          <div class="cap-txt"><h3>${esc(v.title)}</h3><span>${esc(v.sub)} · Watch on ${esc(v.by || host(v.url))} ↗</span></div>
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

  /* one long page: every part fills its own section (a problem in one doesn't stop the rest) */
  for (const part of [home, schedule, stats, history, media]) {
    try { part(); } catch (e) { console.error(e); }
  }

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
