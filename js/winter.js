/* =====================================================================
   Danvers Falcons winter team sites (basketball, hockey, wrestling):
   page rendering. Each site's content lives in its own js/data.js:
     SPORT  what the sport calls things (game, start, periods, stats)
     SCHOOL the school
     TEAMS  one entry per team on the site (boys, girls); a site with
            one team shows no team switch
   Anything null or an empty list is left off the page until it's known.
   Loaded by <sport>/index.html after js/data.js and before the shared
   scripts (common.js, extras.js, search.js, fx.js).
   ===================================================================== */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const LOGO = "images/falcons-logo.png";
  const S = SPORT;

  /* ---------- Which team: ?team= in the address wins, then the last one viewed ---------- */
  const KEYS = Object.keys(TEAMS);
  const asked = new URLSearchParams(location.search).get("team");
  let saved = null;
  try { saved = localStorage.getItem(`dhs-${S.key}-team`); } catch (e) { /* storage blocked: fall through */ }
  const teamKey = TEAMS[asked] ? asked : TEAMS[saved] ? saved : KEYS[0];
  try { localStorage.setItem(`dhs-${S.key}-team`, teamKey); } catch (e) { /* fine without it */ }
  const T = TEAMS[teamKey];
  const MANY = KEYS.length > 1;
  document.body.dataset.team = teamKey;
  document.body.dataset.sportLabel = T.label;   // read by the shared share-a-result image
  const to = (href, key = teamKey) => (MANY ? `${href}?team=${key}` : href);
  if (MANY) document.title = document.title.replace(S.name, T.label);
  $$("[data-t]").forEach((el) => { el.textContent = { label: T.label, season: S.season, intro: T.historyIntro || "", past: T.pastIntro || "The last three winters, game by game, with each season's record, captains and honors." }[el.dataset.t]; });
  const US = T.teamName || "Danvers";   // a co-op team plays under its own name

  /* the shared scripts (share image, forecast, game-day bar) read these */
  window.SCHEDULE = T.schedule;
  window.TEAM = { ...T, links: { ...(T.links || {}) } };
  window.PHOTOS = T.photos || [];

  const GAMES = T.schedule.filter((g) => !g.scrimmage);
  const PRESEASON = T.schedule.filter((g) => g.scrimmage);
  const played = GAMES.filter((g) => g.result);
  const NOW = Date.now();
  const awaiting = (g) => !g.result && !g.cancelled && !g.dateTbd && new Date(g.date) < NOW - 3 * 36e5;
  const upcoming = GAMES.filter((g) => !g.result && !g.cancelled);
  const next = upcoming.find((g) => !awaiting(g));
  const count = (list, r) => list.filter((g) => g.result === r).length;
  const TIES = S.ties !== false;
  const wlt = (w, l, t) => `${w}–${l}${TIES || t ? `–${t}` : ""}`;
  const rec = (f = () => true) => { const g = played.filter(f); return wlt(count(g, "W"), count(g, "L"), count(g, "T")); };
  const record = rec();
  const pf = played.reduce((n, g) => n + g.us, 0);
  const pa = played.reduce((n, g) => n + g.them, 0);

  const fmt = (iso, opts) => new Date(iso).toLocaleString("en-US", opts);
  const dateLong = (iso) => fmt(iso, { weekday: "long", month: "long", day: "numeric" });
  const dateShort = (iso) => fmt(iso, { weekday: "short", month: "short", day: "numeric" });
  const timeOf = (iso) => fmt(iso, { hour: "numeric", minute: "2-digit" });
  const dayOf = (g, f) => (g.dateTbd ? g.dates : f(g.date));
  const startOf = (g) => (g.dateTbd || g.timeTbd ? "" : timeOf(g.date));
  const multi = (g) => !!g.name;   // a tournament or multi-team meet goes by its own name
  const vs = (g) => (multi(g) ? "" : g.home ? "vs" : "at");
  const who = (g) => (multi(g) ? g.name : g.opponent);
  const kind = (g) => (g.scrimmage ? "Scrimmage" : g.postseason ? `MIAA ${g.round || "tournament"}` : g.tournament ? "Tournament" : g.league ? "NEC" : "Non-league");
  const outcome = { W: "Win", L: "Loss", T: "Tie" };
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : word.endsWith("s") ? "es" : "s"}`;
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const last = (name) => name.split(" ").slice(1).join(" ") || name;
  const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const tile = ([k, v, d]) => `<div class="card tile"><div class="k">${k}</div><div class="v count ${String(v).length > 8 ? "long" : ""}">${v}</div><div class="d">${d}</div></div>`;
  /* a winter season is listed by the year it ended: 2026 reads "2025–26" */
  const span = (year) => (S.spanYears && /^\d{4}$/.test(String(year)) ? `${year - 1}–${String(year).slice(2)}` : String(year));
  /* a conference finish from the record book ("4th in Lynch", "NEC Champs") as a big word and a small line */
  const finishOf = (text) => {
    const t = String(text || "").trim();
    const m = t.match(/^(\d+(?:st|nd|rd|th))(?:\s+in)?\s*(Lynch|Dunn|North|South)?$/i);
    if (m) return [m[1], m[2] ? `NEC ${m[2]} Division` : "Northeastern Conference"];
    if (/champ/i.test(t)) return ["Champions", t.replace(/champs?(ions)?/i, "").trim() || "Northeastern Conference"];
    return [t, ""];
  };
  const finishLine = (text) => { const [big, small] = finishOf(text); return big && small ? (big === "Champions" ? `${small} champions` : `${big} in the ${small}`) : big; };
  const hide = (el, yes) => { const sec = el && el.closest("section"); if (sec) sec.hidden = yes; };

  /* ---------- Player numbers, added up from each game's stats in data.js ----------
     a game's stats: { "Player Name": { pts: 18 }, ... } using the keys in SPORT.stats */
  const STATS = S.stats || [];
  const tally = {};
  played.forEach((g) => Object.entries(g.stats || {}).forEach(([name, line]) => {
    const t = (tally[name] ??= { totals: {}, games: {} });
    t.games[g.id] = line;
    STATS.forEach(([key]) => { if (line[key]) t.totals[key] = (t.totals[key] || 0) + line[key]; });
  }));
  const PLAYERS = (T.players || []).map((p) => {
    const t = tally[p.name] || { totals: {}, games: {} };
    return { ...p, pos: p.pos || [], totals: { ...t.totals, ...(p.totals || {}) }, games: t.games };
  });
  const logLine = (line) => STATS.filter(([key]) => line[key]).map(([key, , word]) => plural(line[key], word)).join(", ");
  const hasStats = PLAYERS.some((p) => Object.keys(p.totals).length);

  /* ---------- Top bar, header, schedule strip ---------- */
  const NAV = [["index.html", "Home"], ["schedule.html", "Schedule"], ["stats.html", "Team"], ["seasons.html", "Past seasons"],
               ["history.html", "History"], ["media.html", "Media"]];
  const header = $("#site-header");
  header.insertAdjacentHTML("beforebegin", `
    <div class="topbar"><div class="wrap">
      ${MANY ? `<div class="teamswitch" role="group" aria-label="Choose a team">
        ${KEYS.map((key) => `<a href="${to("./", key)}" class="${key === teamKey ? "on" : ""}"${key === teamKey ? ' aria-current="true"' : ""}>${esc(TEAMS[key].short)}</a>`).join("")}
      </div>` : ""}
      <span class="tb-info">${esc([SCHOOL.school, T.league || SCHOOL.conference, T.division].filter(Boolean).join(" · "))}</span>
      <span class="tb-links">${T.links?.school ? `<a href="${T.links.school}" target="_blank" rel="noopener">DHS ${esc(T.label)}</a>` : ""}<a href="${SCHOOL.athletics}" target="_blank" rel="noopener">Falcons Athletics</a><a href="../">All Sports</a></span>
    </div></div>`);
  header.innerHTML = `
    <div class="wrap hbar">
      <a class="brand" href="${to("./")}">
        <span class="badge"><img src="${LOGO}" alt="Danvers Falcons logo"></span>
        <span class="brand-text">Danvers Falcons<small>${esc(T.label)}</small></span>
      </a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">Menu</button>
      <nav class="nav" aria-label="Main">
        ${NAV.map(([href, label], i) => `<a href="${to(href)}" class="${i ? "" : "active"}">${label}</a>`).join("")}
      </nav>
    </div>`;
  if (GAMES.length) {
    header.insertAdjacentHTML("afterend", `
      <div class="scores"><div class="wrap">
        <div class="scores-label">${esc(S.season)}<br>Schedule</div>
        <div class="scores-track">${GAMES.map((g) => `
          <button class="sc ${g === next ? "next" : ""}" data-game="${g.id}">
            <div class="when">${esc(dayOf(g, dateShort))}${g.result ? " · Final" : ""}</div>
            <div class="who">${vs(g)} ${esc(who(g))}</div>
            <div class="res ${g.cancelled ? "cx" : g.result || (awaiting(g) ? "cx" : "up")}">${g.cancelled ? "Cancelled" : g.result ? `${g.result} ${g.us}–${g.them}` : awaiting(g) ? "" : startOf(g) || esc(g.round || "Time TBA")}</div>
          </button>`).join("")}</div>
      </div></div>`);
    const track = $(".scores-track"), focus = $(".sc.next", track) || $(".sc:last-child", track);
    if (focus) track.scrollLeft = Math.max(0, focus.offsetLeft - track.offsetLeft - track.clientWidth + focus.offsetWidth * 2);
  }
  $(".nav-toggle").addEventListener("click", (e) => {
    const open = $(".nav").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });

  /* ---------- Pieces reused across sections ---------- */
  function gameRow(g) {
    const d = new Date(g.date);
    const res = g.cancelled
      ? `<div class="result cancelled">Cancelled</div>`
      : g.result
      ? `<div class="result"><span class="wl ${g.result}">${g.result}</span>${g.us}–${g.them}</div>`
      : g.place ? `<div class="result upcoming">${esc(g.place)}</div>`
      : awaiting(g) ? `<div class="result cancelled">${g.scrimmage ? "Scrimmage" : ""}</div>`
      : `<div class="result upcoming">${startOf(g) || "Time TBA"}</div>`;
    return `
      <button class="game ${g.cancelled ? "is-cancelled" : ""}" data-game="${g.id}">
        <div class="datebox">
          <div class="m">${fmt(g.date, { month: "short" })}</div>
          <div class="d">${g.dateTbd ? esc(g.dates.replace(/^\D+/, "")) : d.getDate()}</div>
          <div class="w">${g.dateTbd ? "&nbsp;" : fmt(g.date, { weekday: "short" })}</div>
        </div>
        <div>
          <div class="opp">${vs(g) ? `<small>${vs(g).toUpperCase()}</small>` : ""}${esc(who(g))}</div>
          <div class="meta">
            <span class="tag ${g.home ? "home" : ""}">${g.home ? "Home" : g.neutral ? "Neutral" : "Away"}</span>
            <span class="tag">${kind(g)}</span>
            ${g.tag ? `<span class="tag">${esc(g.tag)}</span>` : ""}
            <span>${esc(g.site || "")}</span>
          </div>
        </div>
        ${res}
        <div class="chev" aria-hidden="true">›</div>
      </button>`;
  }

  function gameModal(g) {
    const head = g.result
      ? `<div class="scoreline">
           <div class="team"><img src="${LOGO}" alt="">${esc(US)}</div>
           <div class="nums">${g.us}<i>–</i>${g.them}</div>
           <div class="team">${esc(g.opponent)}</div>
         </div>`
      : `<h2>${vs(g)} ${esc(who(g))} ${esc(multi(g) ? "" : g.mascot || "")}</h2>`;
    let body = "";
    if (g.summary) body += `<h4>Recap</h4><p>${esc(g.summary)}</p>`;
    if (g.cancelled) body += `<h4>Cancelled</h4><p>Originally scheduled for ${dateLong(g.date)} at ${timeOf(g.date)}${g.site ? `, ${esc(g.site)}` : ""}.</p>`;
    else if (!g.result) body += `<h4>${g.scrimmage ? "Scrimmage" : esc(S.start)}</h4><p>${esc([dayOf(g, dateLong), startOf(g) || "Time to be announced"].filter(Boolean).join(" · "))}${g.site ? `<br>${esc(g.site)}` : ""}</p>`;
    if (g.field?.length) body += `<h4>The Field</h4><div class="srcs">${g.field.map((n) => `<span class="tag">${esc(n)}</span>`).join("")}</div>`;
    if (g.result && g.line) {
      body += `<h4>${esc(S.lineTitle)}</h4><table class="line"><tr><th></th>${g.line.us.map((_, i) => `<th>${S.periods[i] || "OT"}</th>`).join("")}<th>F</th></tr>
          <tr><td>${esc(US)}</td>${g.line.us.map((n) => `<td>${n}</td>`).join("")}<td>${g.us}</td></tr>
          <tr><td>${esc(g.opponent)}</td>${g.line.them.map((n) => `<td>${n}</td>`).join("")}<td>${g.them}</td></tr></table>`;
    }
    const lines = Object.entries(g.stats || {});
    if (lines.length) {
      const first = STATS[0][0];
      body += `<h4>${esc(US)} ${esc(S.boxTitle)}</h4><div class="perf">${lines.sort((a, b) => (b[1][first] || 0) - (a[1][first] || 0)).map(([name, line]) =>
        `<div class="row"><span class="n">${esc(name)}</span><span>${esc(logLine(line))}</span></div>`).join("")}</div>`;
    }
    if (g.bouts?.length) {
      body += `<h4>Bout by Bout</h4><div class="plays">${g.bouts.map(([weight, name, res, how]) =>
        `<div class="row"><span class="q">${esc(weight)}</span><span>${esc(name)}${how ? ` · ${esc(how)}` : ""}</span><span class="sc">${esc(res)}</span></div>`).join("")}</div>`;
    }
    if (g.notes?.length) body += `<h4>Notes</h4><ul>${g.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [
      ...(g.replay ? [{ label: `Full replay on ${g.replayBy || "NFHS Network"}`, url: g.replay }] : []),
      ...(g.sources || []),
      ...(!g.result && !g.cancelled && T.links?.schedule ? [{ label: "Official schedule (ArbiterLive)", url: T.links.schedule }] : [])
    ];
    if (srcs.length) body += `<h4>Links &amp; Sources</h4><div class="srcs">${srcs.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("")}</div>`;

    return `
      <div class="modal-head">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="eyebrow">${esc(dayOf(g, dateLong))} · ${g.home ? "Home" : g.neutral ? "Neutral site" : "Away"} · ${kind(g)}${g.cancelled ? " · Cancelled" : g.result ? ` · ${outcome[g.result]}` : ""}</div>
        ${head}
      </div>
      <div class="modal-body">${body}</div>`;
  }

  /* Any element with data-game (schedule rows, the top strip, the hero) opens the game popup */
  const dlg = document.createElement("dialog");
  dlg.className = "modal";
  document.body.appendChild(dlg);
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".modal-close")) dlg.close(); });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-game]");
    if (!btn) return;
    dlg.innerHTML = gameModal(T.schedule.find((g) => g.id === +btn.dataset.game));
    dlg.showModal();
  });

  function leaders() {
    return STATS.slice(0, 3).map(([key, title]) => {
      const best = Math.max(...PLAYERS.map((p) => p.totals[key] || 0), 0);
      const names = PLAYERS.filter((p) => best && p.totals[key] === best).map((p) => p.name);
      const shown = names.slice(0, 2).join(" & ") + (names.length > 2 ? ` +${names.length - 2}` : "");
      return `<div class="card leader"><div class="big count">${best}</div><div><div class="cat">${title}</div><div class="who">${esc(shown) || "—"}</div></div></div>`;
    }).join("");
  }

  /* ---------- HOME ---------- */
  function home() {
    const prev = played[played.length - 1];
    const lastYear = (T.past || [])[0];
    const row = (name, right, win, logo) => `
      <div class="sb-row ${win ? "win" : ""}">
        ${logo ? `<img src="${LOGO}" alt="">` : `<span class="dot">${esc(name[0])}</span>`}
        <span class="nm">${esc(name).replace(/\//g, "/<wbr>")}</span><span class="${typeof right === "number" ? "pts" : "rec"}">${right}</span>
      </div>`;

    if (prev) {
      const headline = {
        W: `Falcons beat ${esc(prev.opponent)} ${prev.us}–${prev.them}, move to ${record}`,
        L: `Falcons fall to ${esc(prev.opponent)}, ${prev.them}–${prev.us}`,
        T: `Falcons and ${esc(prev.opponent)} skate to a ${prev.us}–${prev.them} tie`
      }[prev.result];
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(prev.date)}</div>
        <h1>${headline}</h1>
        <p>${esc(prev.summary || `The Falcons are ${record} through ${plural(played.length, S.game)}.`)}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-game="${prev.id}">${cap(S.game)} recap</button>
          <a class="btn btn-ghost" href="#schedule">Full schedule</a>
        </div>`;
      const dan = row(US, prev.us, prev.us >= prev.them, true);
      const opp = row(prev.opponent, prev.them, prev.them >= prev.us, false);
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard" data-game="${prev.id}" aria-label="Last ${S.game} details">
          <div class="sb-top"><span>Final</span><span>${prev.home ? "Home" : "Away"} · ${kind(prev)}</span></div>
          ${prev.home ? opp + dan : dan + opp}
          <div class="sb-foot"><span>${esc(prev.site || "")}</span><b>${cap(S.game)} details ›</b></div>
        </button>`;
    } else {
      /* before the first game: the season ahead, with the opener on the board */
      $("#hero-story").innerHTML = `
        <div class="eyebrow">${esc(S.season)} season${next ? ` · Opens ${esc(dayOf(next, dateShort))}` : ""}</div>
        <h1>${esc(T.heroTitle || `${SCHOOL.name} ${T.label}`)}</h1>
        <p>${esc(T.preview || "")}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="#schedule">Full schedule</a>
          ${lastYear ? `<a class="btn btn-ghost" href="#seasons">Last season</a>` : ""}
        </div>`;
      if (next) {
        const dan = row(US, lastYear ? esc(lastYear.record) : "", false, true);
        const opp = row(who(next), "", false, false);
        $("#scoreboard").innerHTML = `
          <button class="card scoreboard spot-board" data-game="${next.id}" aria-label="Season opener details">
            <div class="sb-top"><span>Season opener</span><span>${esc(dayOf(next, dateShort))}</span></div>
            ${next.home ? opp + dan : dan + opp}
            <div class="sb-foot"><span>${esc([next.site, startOf(next)].filter(Boolean).join(" · "))}</span><b>Details ›</b></div>
          </button>`;
      }
    }

    const n = played.length || 1;
    $("#scorestrip").innerHTML =
      (played.length ? tile(["Record", record, T.noLeague ? esc(T.league || "") : `NEC ${rec((g) => g.league)}`])
        : lastYear ? tile(["Last season", esc(lastYear.record), esc(finishLine(lastYear.finish) || lastYear.post || "")]) : "") +
      (next ? `<button class="card next-game" data-game="${next.id}">
        <div>
          <div class="k">${played.length ? `Next ${S.game}` : "Season opener"}</div>
          <h3>${vs(next)} ${esc(who(next))}</h3>
          <div class="meta">${esc([dayOf(next, dateLong), startOf(next), next.site].filter(Boolean).join(" · "))}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : GAMES.length ? `<div class="card next-game"><div><div class="k">Regular season complete</div><h3>Final record ${record}</h3></div></div>` : "") +
      (played.length ? tile([S.scoreWord, `${pf}–${pa}`, `${(pf / n).toFixed(1)} scored · ${(pa / n).toFixed(1)} allowed per ${S.game}`])
        : T.stripTile ? tile(T.stripTile) : "");

    if (next && startOf(next)) {
      const tick = () => {
        const ms = Math.max(0, new Date(next.date) - new Date());
        const parts = [["Days", ms / 864e5], ["Hrs", (ms / 36e5) % 24], ["Min", (ms / 6e4) % 60]];
        $("#countdown").innerHTML = ms
          ? parts.map(([l, v]) => `<div><b>${String(Math.floor(v)).padStart(2, "0")}</b><span>${l}</span></div>`).join("")
          : `<div><b>${cap(S.game)} day</b><span>Go Falcons</span></div>`;
      };
      tick();
      setInterval(tick, 30000);
    }
  }

  /* ---------- SCHEDULE ---------- */
  function schedule() {
    const homeN = GAMES.filter((g) => g.home).length;
    $("#sched-tiles").innerHTML = [
      ["Overall", record, played.length ? `Home ${rec((g) => g.home)} · Away ${rec((g) => !g.home)}` : `Opens ${next ? esc(dayOf(next, dateShort)) : "soon"}`],
      ...(T.noLeague ? [] : [["NEC", rec((g) => g.league), `${GAMES.filter((g) => g.league).length} conference ${S.games}`]]),
      [cap(S.games), GAMES.length, `${homeN} home · ${GAMES.length - homeN} away${T.scheduleNote ? "" : ""}`],
      ...(played.length ? [[S.scoreWord, `${pf}–${pa}`, `${plural(played.length, S.game)} played`]]
        : next ? [["Opener", fmt(next.date, { month: "short", day: "numeric" }), esc(`${vs(next)} ${who(next)}${startOf(next) ? ` · ${startOf(next)}` : ""}`.trim())]] : [])
    ].map(tile).join("");
    const done = GAMES.filter((g) => g.result || g.cancelled || awaiting(g));
    const ahead = GAMES.filter((g) => !done.includes(g));
    $("#upcoming").innerHTML = ahead.length ? ahead.map(gameRow).join("") : `<div class="empty">Regular season complete.</div>`;
    $("#results").innerHTML = [...done].reverse().map(gameRow).join("");
    hide($("#results"), !done.length);
    $("#preseason").innerHTML = PRESEASON.map(gameRow).join("");
    hide($("#preseason"), !PRESEASON.length);
    const note = $("#schedule-note");
    note.textContent = T.scheduleNote || "";
    note.hidden = !T.scheduleNote;
  }

  /* ---------- TEAM ---------- */
  function team() {
    $("#staff").innerHTML = (T.staff || []).map(([role, name, note]) => `
      <div class="card staffer"><div class="k">${esc(role)}</div><h3>${esc(name)}</h3>${note ? `<p>${esc(note)}</p>` : ""}</div>`).join("");
    hide($("#staff"), !(T.staff || []).length);
    $("#about").innerHTML = (T.about || []).map((p) => `<p>${esc(p)}</p>`).join("");
    hide($("#about"), !(T.about || []).length);

    $("#stats-asof").textContent = T.statsAsOf || "";
    $("#stats-asof").hidden = !T.statsAsOf;
    $("#leaders").innerHTML = hasStats ? leaders() : "";
    hide($("#leaders"), !hasStats);

    const box = $("#players");
    if (!PLAYERS.length) {
      box.innerHTML = `<div class="empty card" style="grid-column:1/-1">${esc(T.rosterNote || "The roster will be posted once the team is set.")}</div>`;
      $("#filters").hidden = true;
      return;
    }
    let q = "";
    $("#filters").innerHTML = `<input class="search" type="search" placeholder="Search ${esc(S.players)}…" aria-label="Search ${esc(S.players)}">`;
    const boxes = (p) => STATS.filter(([key]) => p.totals[key]).map(([key, title]) => [title, p.totals[key]]);
    const draw = () => {
      const list = PLAYERS.filter((p) => p.name.toLowerCase().includes(q));
      box.innerHTML = list.length ? list.map((p) => `
        <article class="card player">
          <div class="player-top">
            <div class="jersey ${p.num == null ? "unknown" : ""}">${p.num ?? esc(initials(p.name))}</div>
            <div>
              <h3>${esc(p.name)}</h3>
              <div class="posline">
                ${p.pos.map((x) => `<span class="pos">${esc(x)}</span>`).join("")}
                ${p.grade ? `<span>${esc(p.grade)}</span>` : ""}
                ${p.captain ? `<span class="cap">CAPTAIN</span>` : ""}
              </div>
            </div>
          </div>
          ${boxes(p).length ? `<div class="player-stats">${boxes(p).map(([k, v]) => `<div><b>${v}</b><span>${k}</span></div>`).join("")}</div>` : ""}
          ${played.some((g) => p.games[g.id]) ? `<div class="player-log">
            ${played.filter((g) => p.games[g.id]).map((g) =>
              `<div class="row"><span class="opp">${vs(g)} ${esc(g.opponent)}</span><span>${esc(logLine(p.games[g.id]))}</span></div>`).join("")}
          </div>` : ""}
        </article>`).join("") : `<div class="empty card" style="grid-column:1/-1">No ${esc(S.players)} match.</div>`;
    };
    $("#filters").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
    draw();
  }

  /* ---------- PAST SEASONS: the last few winters, game by game ----------
     a past game: [date, home (1/0), opponent, type, result, us, them, note] */
  function seasons() {
    const past = T.past || [];
    const chapter = $("#seasons");
    if (!past.length) { chapter.hidden = true; return; }
    let active = 0;
    $("#season-tabs").innerHTML = past.map((s, i) => `<button class="chip" role="tab" aria-selected="${!i}" data-i="${i}">${esc(s.season)}</button>`).join("");
    const pastRow = ([date, isHome, opp, type, result, us, them, note]) => {
      const d = new Date(`${date}T12:00`);
      const res = result ? `<div class="result"><span class="wl ${result}">${result}</span>${us}–${them}</div>`
        : `<div class="result cancelled">${esc(note || "No score")}</div>`;
      return `
        <div class="game past ${result ? "" : "is-cancelled"}">
          <div class="datebox">
            <div class="m">${fmt(d, { month: "short" })}</div>
            <div class="d">${d.getDate()}</div>
            <div class="w">${fmt(d, { weekday: "short" })}</div>
          </div>
          <div>
            <div class="opp"><small>${isHome ? "VS" : "AT"}</small>${esc(opp)}</div>
            <div class="meta">
              <span class="tag ${isHome ? "home" : ""}">${isHome ? "Home" : "Away"}</span>
              <span class="tag">${esc(type)}</span>
              ${result && note ? `<span>${esc(note)}</span>` : ""}
            </div>
          </div>
          ${res}
        </div>`;
    };
    const draw = () => {
      const s = past[active];
      const games = s.games || [];
      const done = games.filter((g) => g[4]);
      const us = done.reduce((n, g) => n + g[5], 0), them = done.reduce((n, g) => n + g[6], 0);
      $("#season-tiles").innerHTML = [
        ["Record", esc(s.record), esc(s.coach ? `Coach ${s.coach}` : "")],
        ...(s.finish ? [["Conference", finishOf(s.finish)[0].length > 5 ? `<span class="words">${esc(finishOf(s.finish)[0])}</span>` : esc(finishOf(s.finish)[0]), esc(finishOf(s.finish)[1] || T.league || SCHOOL.conference)]] : []),
        ...(s.post ? [["Postseason", `<span class="words">${esc(s.post)}</span>`, "MIAA state tournament"]] : []),
        ...(done.length ? [[S.scoreWord, `${us}–${them}`, `${(us / done.length).toFixed(1)} scored · ${(them / done.length).toFixed(1)} allowed per ${S.game}`]] : [])
      ].map(tile).join("");
      $("#season-honors").innerHTML = [
        s.captains && ["Captains", s.captains], s.allLeague && ["All-conference", s.allLeague], s.allStars && ["NEC All-Stars", s.allStars], s.awards && ["Awards", s.awards]
      ].filter(Boolean).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");
      $("#season-honors").hidden = !$("#season-honors").innerHTML;
      $("#season-games").innerHTML = games.length ? games.map(pastRow).join("") : `<div class="empty">${esc(s.gamesNote || "Game-by-game results for this season aren't on file.")}</div>`;
      $("#season-note").textContent = s.note || "";
      $("#season-note").hidden = !s.note;
      $("#season-photo").innerHTML = s.photo ? `<img src="${esc(s.photo.src)}" alt="${esc(s.photo.caption)}" loading="lazy"><figcaption>${esc(s.photo.caption)}</figcaption>` : "";
      $("#season-photo").hidden = !s.photo;
    };
    $("#season-tabs").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      active = +chip.dataset.i;
      $$("#season-tabs .chip").forEach((c) => c.setAttribute("aria-selected", c === chip));
      draw();
    });
    draw();
  }

  /* ---------- HISTORY ---------- */
  const SEASONS = (T.seasons || []).map(([year, w, l, t, coach, finish, post]) => ({ year, w, l, t: t || 0, coach, finish, post }));
  const pct = (s) => (s.w + s.t / 2) / ((s.w + s.l + s.t) || 1);
  const TITLES = T.necTitles || [];
  const isTitle = (s) => TITLES.includes(s.year);

  function winChart(data) {
    const W = 900, H = 290, L = 34, R = 18, T0 = 24, B = 36;
    const top = Math.max(20, Math.ceil(Math.max(...data.map((s) => s.w)) / 5) * 5);
    const x = (i) => L + i * (W - L - R) / (data.length - 1);
    const y = (w) => T0 + (1 - w / top) * (H - T0 - B);
    const pts = data.map((s, i) => [x(i), y(s.w)]);
    const path = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
    const grid = []; for (let v = 0; v <= top; v += 5) grid.push(v);
    return `
      <div class="key"><span><i></i>Wins per season</span><span><i class="t"></i>NEC title year</span></div>
      <div class="table-scroll"><svg viewBox="0 0 ${W} ${H}" style="min-width:720px" role="img" aria-label="Wins per season, ${data[0].year} to ${data[data.length - 1].year}">
        ${grid.map((v) => `<line class="gridl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        <path class="area" d="${path} L${x(data.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z"/>
        <path class="ln" pathLength="1" d="${path}"/>
        ${data.map((s, i) => `
          <circle class="pt ${isTitle(s) ? "title" : ""}" cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="${isTitle(s) ? 5.5 : 3.5}"><title>${span(s.year)}: ${wlt(s.w, s.l, s.t)}${s.finish ? " · " + esc(s.finish) : ""}${s.post ? " · " + esc(s.post) : ""}</title></circle>
          ${s.year % 5 === 0 ? `<text x="${pts[i][0].toFixed(1)}" y="${H - 10}" text-anchor="middle">${s.year}</text>` : ""}`).join("")}
      </svg></div>`;
  }

  function history() {
    const chapter = $("#history");
    const full = SEASONS.filter((s) => s.w != null);
    if (!SEASONS.length && !(T.banners || []).length && !(T.milestones || []).length) { chapter.hidden = true; return; }

    $("#banners").innerHTML = (T.banners || []).map((b) => `<div class="banner"><img src="${LOGO}" alt=""><div class="y">${b.year}</div><div class="l">${esc(b.label)}</div></div>`).join("");
    $("#banners").hidden = !(T.banners || []).length;
    $("#nec-titles").innerHTML = TITLES.length ? `
      <div><div class="big count">${TITLES.length}</div><div class="cat">${esc(T.titlesLabel || "Northeastern Conference titles")}</div></div>
      <div class="years">${TITLES.map((yr) => `<span>${yr}</span>`).join("")}</div>` : "";
    $("#nec-titles").hidden = !TITLES.length;
    $("#history-note").textContent = T.historyNote || "";
    hide($("#banners"), !(T.banners || []).length && !TITLES.length);

    const chartData = full.filter((s) => s.w + s.l + s.t > 0).reverse();
    if (chartData.length > 2) {
      $("#chart-span").textContent = `${span(chartData[0].year)} to ${span(chartData[chartData.length - 1].year)}`;
      $("#win-chart").innerHTML = winChart(chartData);
    }
    hide($("#win-chart"), chartData.length <= 2);

    if (full.length) {
      const sum = (k) => full.reduce((n, s) => n + s[k], 0);
      const best = [...full].sort((a, b) => pct(b) - pct(a) || b.w - a.w)[0];
      $("#history-tiles").innerHTML = [
        ...(TITLES.length ? [["NEC titles", TITLES.length, `First in ${TITLES[0]} · latest in ${TITLES[TITLES.length - 1]}`]] : []),
        ["Record on file", wlt(sum("w"), sum("l"), sum("t")), `${full.length} seasons in the record book`],
        ["Best season", wlt(best.w, best.l, best.t), `${span(best.year)} · ${esc(best.coach || "")}`],
        ...(T.historyTile ? [T.historyTile] : [])
      ].map(tile).join("");
    }
    hide($("#history-tiles"), !full.length);

    $("#legends").innerHTML = (T.legends || []).map((p, i) => `
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
    hide($("#legends"), !(T.legends || []).length);
    $("#legends-sub").textContent = T.legendsNote || "";

    $("#champions").innerHTML = (T.champions || []).map(([year, name, what]) => `<tr><td class="yr">${esc(year)}</td><td><b>${esc(name)}</b></td><td>${esc(what)}</td></tr>`).join("");
    hide($("#champions"), !(T.champions || []).length);

    const book = (title, lists) => `
      <h3 class="book-head">${title}</h3>
      <div class="grid g4">${Object.entries(lists).map(([cat, rows]) => `
        <div class="card book"><div class="k">${cat}</div><ol>${rows.map(([name, num, when]) =>
          `<li><b>${num}</b><span>${esc(name)}${when ? `<small>${esc(when)}</small>` : ""}</span></li>`).join("")}</ol></div>`).join("")}</div>`;
    $("#record-book").innerHTML = T.records ? Object.entries(T.records).map(([title, lists]) => book(esc(title), lists)).join("") : "";
    hide($("#record-book"), !T.records);
    if (T.links?.recordBook) $("#record-book-link").href = T.links.recordBook; else $("#record-book-link").hidden = true;

    const SHOWN = 15;
    $("#records").innerHTML = SEASONS.map((s, i) => `<tr${i >= SHOWN ? ' class="older" hidden' : ""}>
        <td class="yr">${esc(span(s.year))}</td>
        <td class="rec">${s.w == null ? "–" : wlt(s.w, s.l, s.t)}</td>
        <td>${s.w == null ? "" : `<div class="bar" title="${(pct(s) * 100).toFixed(0)}%${TIES ? " (ties count as half a win)" : ""}"><i style="width:${pct(s) * 100}%"></i></div>`}</td>
        <td>${esc(s.coach || "")}</td>
        <td>${/Champ/i.test(s.finish || "") ? `<span class="note-pill">${esc(s.finish)}</span>` : esc(s.finish || "")}</td>
        <td>${esc(s.post || "")}</td>
      </tr>`).join("");
    hide($("#records"), !SEASONS.length);
    const more = $("#records-more");
    more.textContent = `Show all ${SEASONS.length} seasons`;
    more.hidden = SEASONS.length <= SHOWN;
    more.addEventListener("click", () => { $$("#records .older").forEach((tr) => { tr.hidden = false; }); more.hidden = true; });

    const HON = T.honors || [];
    $("#honors").innerHTML = HON.map((h, i) => `<tr${i >= SHOWN ? ' class="older" hidden' : ""}>
        <td class="yr">${esc(span(h.year))}</td>
        <td>${esc(h.captains || "")}</td>
        <td>${esc(h.allLeague || "")}</td>
        <td>${esc(h.note || "")}</td>
      </tr>`).join("");
    hide($("#honors"), !HON.length);
    const moreHonors = $("#honors-more");
    moreHonors.textContent = `Show all ${HON.length} seasons`;
    moreHonors.hidden = HON.length <= SHOWN;
    moreHonors.addEventListener("click", () => { $$("#honors .older").forEach((tr) => { tr.hidden = false; }); moreHonors.hidden = true; });

    $("#timeline").innerHTML = (T.milestones || []).map((m) => `<div class="item"><div class="y">${esc(m.year)}</div><p>${esc(m.text)}</p></div>`).join("");
    hide($("#timeline"), !(T.milestones || []).length);
  }

  /* ---------- MEDIA ---------- */
  function media() {
    $("#follow").innerHTML = (T.follow || []).map((f) => `
      <a class="card lift news" href="${f.url}" target="_blank" rel="noopener">
        <span class="when">${esc(f.kind)}</span><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p><span class="go">${esc(f.go || "Open")} ↗</span>
      </a>`).join("");
    hide($("#follow"), !(T.follow || []).length);
    $("#news").innerHTML = (T.news || []).map((n) => `
      <a class="card lift news" href="${n.url}" target="_blank" rel="noopener">
        <span class="when">${esc(n.date)}</span><h3>${esc(n.title)}</h3><p>${esc(n.blurb)}</p><span class="go">${esc(n.source)} ↗</span>
      </a>`).join("");
    hide($("#news"), !(T.news || []).length);
    const photos = T.photos || [];
    $("#photos").innerHTML = photos.map((p) => `<figure class="photo has-img"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy"><figcaption>${esc(p.caption)}</figcaption></figure>`).join("");
    hide($("#photos"), !photos.length);
  }

  /* one long page: every part fills its own section (a problem in one doesn't stop the rest) */
  for (const part of [home, schedule, team, seasons, history, media]) {
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
