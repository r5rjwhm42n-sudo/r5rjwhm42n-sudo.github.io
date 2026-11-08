/* Danvers Falcons hub page. It reads every team site's js/data.js, so the
   records, scores, countdown and schedule here update whenever a team site
   is updated. The team photos are plain <img> tags in index.html (files in
   images/teams/); photos listed in a team site's PHOTOS are added to the
   photo section here automatically. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const NOW = Date.now();
  const HOUR = 36e5;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fmt = (iso, opts) => new Date(iso).toLocaleString("en-US", opts);
  const dayShort = (iso) => fmt(iso, { weekday: "short", month: "short", day: "numeric" });
  const timeOf = (e) => (e.timeTbd ? "" : fmt(e.date, { hour: "numeric", minute: "2-digit" }));
  const ord = (n) => n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");

  /* ---------- Load each team's data.js in its own scope ---------- */
  const NAMES = ["TEAM", "TEAMS", "SCHEDULE", "MEETS", "GAMES", "TITLES", "NEC_TITLES", "HISTORY_TILE", "PHOTOS"];
  const load = (folder) =>
    fetch(`${folder}/js/data.js`)
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((src) => new Function(`${src}\n;return {${NAMES.map((n) => `${n}: typeof ${n} === "undefined" ? undefined : ${n}`).join(",")}};`)())
      .catch(() => null);

  /* ---------- Turn each site's data into one list of events ----------
     ev: { sport, team, href, date, title, opponent, home, site, result, score, final, summary, headline } */
  const vs = (g) => (g.home ? "vs" : "at");
  const gameEvent = (sport, team, href, g) => ({
    sport, team, href, date: g.date, timeTbd: g.timeTbd, dateTbd: !!g.dateTbd, home: g.home, site: g.site,
    opponent: g.opponent, mascot: g.mascot,
    title: g.tournament ? g.opponent : `${vs(g)} ${g.opponent}`,
    result: g.result || null,
    score: g.result ? `${g.us}–${g.them}` : g.finish ? `${g.finish}${g.fieldSize ? ` of ${g.fieldSize}` : ""}` : null,
    final: !!(g.result || g.finish),
    off: !!(g.cancelled || g.noResult),
    tournament: !!g.tournament,
    summary: g.summary || null
  });
  const record = (list, ties) => {
    const n = (r) => list.filter((e) => e.result === r).length;
    const t = n("T");
    return list.length ? `${n("W")}–${n("L")}${ties || t ? `–${t}` : ""}` : null;
  };
  /* the cards only call out a power ranking in the top half of the division */
  const rankText = (r, division) =>
    !r ? null : typeof r === "string" ? r.replace(/\s*\(.*\)$/, "") : r.rank > r.of / 2 ? null : `No. ${r.rank} of ${r.of} in ${division || "the MIAA"} power rankings`;

  const ADAPT = {
    football(d) {
      const ev = d.SCHEDULE.map((g) => ({ ...gameEvent("football", "Football", "football/schedule.html", g), tickets: g.home ? d.TEAM.tickets : g.tickets }));
      return { teams: [{ label: null, events: ev, record: record(ev.filter((e) => e.result)) }],
        rank: rankText(d.TEAM.ranking),
        titles: [{ name: "Football", href: "football/history.html", years: d.TITLES.filter((t) => /NEC/.test(t.label)).map((t) => t.year) }] };
    },
    soccer(d) {
      const teams = ["girls", "boys"].map((k) => {
        const T = d.TEAMS[k];
        const ev = T.schedule.filter((g) => !g.scrimmage).map((g) => gameEvent("soccer", T.label, `soccer/schedule.html?team=${k}`, g));
        return { key: k, label: T.short, events: ev, record: record(ev.filter((e) => e.result), true),
          rank: rankText(T.ranking, T.division), tile: T.historyTile, titleLabel: T.label, necTitles: T.necTitles };
      });
      return { teams, rank: null,
        titles: teams.map((t) => ({ name: t.titleLabel, href: `soccer/history.html?team=${t.key}`, years: t.necTitles || [] })),
        tiles: teams.filter((t) => t.tile).map((t) => [t.titleLabel, ...t.tile]) };
    },
    "field-hockey"(d) {
      const ev = d.SCHEDULE.filter((g) => !g.scrimmage).map((g) => gameEvent("field-hockey", "Field Hockey", "field-hockey/schedule.html", g));
      return { teams: [{ label: null, events: ev, record: record(ev.filter((e) => e.result), true) }],
        rank: rankText(d.TEAM.ranking, d.TEAM.division),
        titles: [{ name: "Field Hockey", href: "field-hockey/history.html", years: d.NEC_TITLES || [] }],
        tiles: d.HISTORY_TILE ? [["Field Hockey", ...d.HISTORY_TILE]] : [] };
    },
    volleyball(d) {
      const ev = d.SCHEDULE.filter((g) => !g.scrimmage).map((g) => gameEvent("volleyball", "Volleyball", "volleyball/schedule.html", g));
      return { teams: [{ label: null, events: ev, record: record(ev.filter((e) => e.result)) }],
        rank: rankText(d.TEAM.ranking, d.TEAM.division),
        titles: [{ name: "Volleyball", href: "volleyball/history.html", years: d.NEC_TITLES || [] }],
        tiles: d.HISTORY_TILE ? [["Volleyball", ...d.HISTORY_TILE]] : [] };
    },
    golf(d) {
      const ev = d.SCHEDULE.map((g) => gameEvent("golf", "Golf", "golf/schedule.html", g));
      return { teams: [{ label: null, events: ev, record: record(ev.filter((e) => e.result)) }],
        rank: null,
        titles: [{ name: "Golf", href: "golf/history.html", years: d.NEC_TITLES || [] }] };
    },
    "cross-country"(d) {
      const squads = [["boys", "Boys"], ["girls", "Girls"]];
      const ran = (m, k) => m[k] && (m[k].result || m[k].place || m[k].finishers?.length);
      const meetEvent = (m, k, label) => {
        const s = (k && m[k]) || {};
        return {
          sport: "cross-country", team: label ? `${label} Cross Country` : "Cross Country", href: "cross-country/schedule.html",
          date: m.date, timeTbd: m.timeTbd || m.dateTbd, home: m.home, site: m.site, opponent: m.opponent || null,
          title: m.name || `${m.home === false ? "at" : "vs"} ${m.opponent}`,
          result: s.result || null,
          score: s.result ? `${s.us}–${s.them}` : s.place ? `${ord(s.place)}${s.of ? ` of ${s.of}` : ""}` : null,
          final: !!(s.result || s.place), off: !!m.cancelled, dateTbd: !!m.dateTbd, tickets: m.tickets || null,
          summary: m.summary || null, headline: m.headline || null
        };
      };
      const teams = squads.map(([k, label]) => {
        const ev = d.MEETS.filter((m) => ran(m, k)).map((m) => meetEvent(m, k, label));
        return { key: k, label, events: ev, record: record(ev.filter((e) => e.result)) };
      });
      /* one entry per meet for the schedule, and one for its write-up */
      const meets = d.MEETS.map((m) => ({ ...meetEvent(m, null, null), final: squads.some(([k]) => ran(m, k)),
        squadResults: squads.filter(([k]) => m[k]?.result).map(([k, label]) => [label, m[k].result, `${m[k].us}–${m[k].them}`]),
        squadPlaces: squads.filter(([k]) => m[k]?.place).map(([k, label]) => [label, m[k].place]) }));
      const tiles = d.TITLES.filter((t) => /State Champions/.test(t.label)).map((t) => [`${t.squad === "boys" ? "Boys" : "Girls"} Cross Country`, "State champions", String(t.year), t.label]);
      return { teams, meets, rank: null,
        titles: squads.map(([k, label]) => ({ name: `${label} Cross Country`, href: "cross-country/history.html", years: d.TITLES.filter((t) => t.squad === k && /NEC/.test(t.label)).map((t) => t.year) })),
        tiles };
    },
    esports(d) {
      const game = Object.fromEntries((d.GAMES || []).map((g) => [g.id, g]));
      const ev = d.SCHEDULE.filter((m) => game[m.game]).map((m) => ({
        sport: "esports", team: `Esports · ${game[m.game].short}`, href: "esports/schedule.html", date: m.date,
        opponent: m.opponent, title: m.opponent ? `${m.home === false ? "at" : "vs"} ${m.opponent}` : `${game[m.game].short} · ${m.round || `Week ${m.week}`}`,
        result: m.result || null, score: m.result ? `${m.us}–${m.them}` : null, final: !!m.result, off: !!m.off, summary: m.summary || null
      }));
      return { teams: [{ label: null, events: ev, record: record(ev.filter((e) => e.result)) }], rank: null, titles: [] };
    }
  };

  const FOLDERS = Object.keys(ADAPT);
  const upcomingOf = (ev) => ev.filter((e) => !e.final && !e.off && !e.dateTbd && new Date(e.date).getTime() > NOW - 3 * HOUR)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const finalsOf = (ev) => ev.filter((e) => e.final).sort((a, b) => new Date(b.date) - new Date(a.date));
  const resClass = (r) => (r === "W" || r === "L" || r === "T" ? r : "F");
  const resText = (e) => (e.result ? `${e.result} ${e.score}` : e.score || "Final");

  heroFrame();
  lightbox();

  Promise.all(FOLDERS.map(load)).then((all) => {
    const S = {};
    FOLDERS.forEach((f, i) => {
      if (!all[i]) return;
      try {
        S[f] = ADAPT[f](all[i]);
        /* soccer keeps a photo list per team */
        S[f].photos = all[i].PHOTOS || (all[i].TEAMS ? ["girls", "boys"].flatMap((k) => (all[i].TEAMS[k].photos || []).map((p) => ({ ...p, team: all[i].TEAMS[k].label }))) : []);
      } catch (e) { console.warn(`Hub: could not read ${f} data`, e); }
    });
    if (!Object.keys(S).length) return;

    /* every game/meet once, for the countdown, schedule and ticker */
    const EVENTS = [];
    for (const [f, s] of Object.entries(S)) {
      if (s.meets) EVENTS.push(...s.meets);
      else s.teams.forEach((t) => EVENTS.push(...t.events));
    }
    /* XC results ticker uses one item per squad */
    const RESULT_ITEMS = [];
    for (const s of Object.values(S)) s.teams.forEach((t) => RESULT_ITEMS.push(...t.events.filter((e) => e.final)));
    const listed = (e) => e.opponent || e.tournament || e.sport === "cross-country";
    const UPCOMING = upcomingOf(EVENTS.filter(listed));
    const FINALS = finalsOf(RESULT_ITEMS.filter(listed));

    renderTicker(FINALS.slice(0, 16));
    renderToday(UPCOMING);
    renderPanels(UPCOMING, FINALS);
    renderSpotlight(all[FOLDERS.indexOf("football")]);
    renderHeroStats(S, UPCOMING);
    renderTeamRows(S);
    renderMatchCentre(FINALS.slice(0, 8), UPCOMING.slice(0, 12), EVENTS);
    renderLatest(S);
    renderTitles(S);
    renderGallery(S);
    document.documentElement.classList.add("hub-ready");
    /* the tournament tracker (js/tracker.js) builds on the same data */
    window.DFAHub = { S, raw: Object.fromEntries(FOLDERS.map((f, i) => [f, all[i]])), UPCOMING };
    document.dispatchEvent(new CustomEvent("dfa:hub"));
  });

  /* ---------- Scores ticker ---------- */
  function renderTicker(items) {
    const bar = $("#ticker");
    if (!items.length) return;
    const one = items.map((e) => `<a class="tk" href="${esc(e.href)}">
        <span class="tk-when">${esc(e.team)} · ${fmt(e.date, { month: "short", day: "numeric" })}</span>
        <span class="tk-who">${esc(e.title)}</span>
        <span class="tk-res ${resClass(e.result)}">${esc(resText(e))}</span></a>`).join("");
    $("#ticker-track").innerHTML = `<div class="tk-run">${one}</div>${calm ? "" : `<div class="tk-run" aria-hidden="true">${one.replace(/<a /g, '<a tabindex="-1" ')}</div>`}`;
    $("#ticker-track").style.setProperty("--dur", `${Math.max(40, items.length * 5)}s`);
    bar.hidden = false;
  }

  /* ---------- Next game and last game, side by side ---------- */
  function renderPanels(upcoming, finals) {
    const next = upcoming.find((e) => e.opponent && !e.tournament) || upcoming[0];
    const last = finals.find((e) => e.opponent && !e.tournament && e.result);
    if (!next && !last) return;
    const crest = `<span class="gp-crest"><img src="images/falcons-logo.png" alt=""></span>`;
    const opp = (e) => (window.DFA && e.opponent ? DFA.badge(e.opponent, "lg") : "");
    const side = (logo, name) => `<div class="gp-side">${logo}<b>${esc(name)}</b></div>`;
    const panels = [];
    if (next) {
      const match = next.opponent && !next.tournament
        ? `<div class="gp-match">${side(crest, "Danvers")}<span class="gp-vs">${next.home ? "vs" : "at"}</span>${side(opp(next), next.opponent)}</div>`
        : `<div class="gp-match single"><b>${esc(next.title)}</b></div>`;
      panels.push(`<article class="gp-panel next">
        <div class="gp-h"><span>Next game</span><span>${esc(next.team)}</span></div>
        <p class="gp-meta">${[fmt(next.date, { weekday: "long", month: "long", day: "numeric" }), timeOf(next), next.home ? "Home" : next.home === false ? "Away" : ""].filter(Boolean).map(esc).join(" · ")}</p>
        ${match}
        <div class="gp-clock" id="gp-clock" aria-live="off"></div>
        <p class="gp-site">${esc(next.site || "")}</p>
        <div class="gp-acts"><a class="btn btn-primary" href="${esc(next.href)}">Game preview</a>${window.DFA ? `<a class="btn btn-line" href="${DFA.mapsUrl(next)}" target="_blank" rel="noopener">Directions</a>` : ""}</div>
      </article>`);
    }
    if (last) {
      const [us, them] = String(last.score).split("–");
      panels.push(`<article class="gp-panel last">
        <div class="gp-h"><span>Last game</span><span>${esc(last.team)}</span></div>
        <p class="gp-meta">${esc(fmt(last.date, { weekday: "long", month: "long", day: "numeric" }))} · Final</p>
        <div class="gp-match">${side(crest, "Danvers")}
          <div class="gp-score ${resClass(last.result)}"><b>${esc(us)}</b><i>–</i><b>${esc(them)}</b></div>
          ${side(opp(last), last.opponent)}</div>
        ${last.summary ? `<p class="gp-sum">${esc(last.summary)}</p>` : ""}
        <div class="gp-acts"><a class="btn btn-primary" href="${esc(last.href)}">Read the recap</a></div>
      </article>`);
    }
    $("#gp-grid").innerHTML = panels.join("");
    $("#gp").hidden = false;
    const clock = $("#gp-clock");
    if (!next || !clock) return;
    const start = new Date(next.date).getTime();
    const tick = () => {
      const ms = start - Date.now();
      if (ms <= 0) { clock.innerHTML = `<div class="clock-live">Under way now</div>`; return false; }
      const d = Math.floor(ms / 864e5), h = Math.floor(ms / HOUR) % 24, m = Math.floor(ms / 6e4) % 60, sec = Math.floor(ms / 1e3) % 60;
      const cell = (v, l) => `<div class="cl"><b>${String(v).padStart(2, "0")}</b><span>${l}</span></div>`;
      clock.innerHTML = cell(d, "Days") + cell(h, "Hrs") + cell(m, "Min") + cell(sec, "Sec");
      clock.setAttribute("aria-label", `Starts in ${d} days, ${h} hours and ${m} minutes`);
      return true;
    };
    if (tick()) { const id = setInterval(() => tick() || clearInterval(id), 1000); }
  }

  let SPOT_ON = false;   // a football spotlight game is coming up or under way: its Game Day button glows

  /* ---------- Big-game spotlight ----------
     A football game with spotlight: {...} in its data.js gets a banner across the top of the hub,
     from a week before kickoff until two days after the final. */
  function renderSpotlight(d) {
    const box = $("#spotlight");
    const g = d?.SCHEDULE?.find((x) => {
      const t = new Date(x.date).getTime();
      return x.spotlight && !x.cancelled && NOW > t - 7 * 864e5 && NOW < t + (x.result ? 2 * 864e5 : 12 * HOUR);
    });
    if (!box || !g) return;
    const sp = g.spotlight, start = new Date(g.date).getTime(), done = !!g.result;
    const games = d.SCHEDULE.filter((x) => x.result && !x.cancelled);
    const ours = `${games.filter((x) => x.result === "W").length}–${games.filter((x) => x.result === "L").length}`;
    const photo = d.PHOTOS?.[0]?.src;
    const page = new URL("football/", location.href).href;
    const recap = `football/schedule.html#g=${g.id}`;
    const opp = window.DFA ? DFA.badge(g.opponent, "sp-logo") : "";
    const side = (logo, name, line, pts, win) => `
      <div class="sp-side ${win ? "win" : ""}">${logo}<div class="sp-name"><b>${esc(name)}</b><small>${esc(line)}</small></div>${pts == null ? "" : `<span class="sp-pts">${pts}</span>`}</div>`;
    const today = new Date(g.date).toDateString() === new Date().toDateString();

    if (photo) box.style.setProperty("--sp-photo", `url("${new URL(`football/${photo}`, location.href).href}")`);
    box.innerHTML = `<div class="wrap sp-in">
      <div class="sp-label"><span class="sp-flag" id="sp-flag"></span><span>${esc(done ? (g.result === "W" ? sp.won : sp.lost) : sp.kicker)}</span></div>
      <div class="sp-matchup">
        ${side(`<span class="sp-logo us"><img src="images/falcons-logo.png" alt=""></span>`, "Danvers", ours, done ? g.us : null, done && g.result === "W")}
        <span class="sp-vs">${g.home ? "vs" : "at"}</span>
        ${side(opp, g.opponent, sp.oppRecord || "", done ? g.them : null, done && g.result === "L")}
      </div>
      <p class="sp-info">${done ? esc(sp.kicker) : `${today ? "" : `${esc(fmt(g.date, { weekday: "long", month: "short", day: "numeric" }))} · `}${esc(timeOf(g))}`} · ${esc(g.site || "")}<span id="sp-wx"></span></p>
      ${done ? "" : `<p class="sp-blurb">${esc(sp.blurb || "")}</p><div class="sp-clock" id="sp-clock" aria-live="off"></div>`}
      <div class="sp-actions">
        ${done ? `<a class="btn btn-gold" href="${recap}">Game recap</a>` : sp.watch ? `<a class="btn btn-gold" href="${esc(sp.watch)}" target="_blank" rel="noopener">Watch live</a>` : ""}
        <a class="btn btn-ghost" href="${done ? "football/" : recap}">${done ? "Football site" : "Game preview"}</a>
      </div>
      <div class="sp-links">
        ${!done && window.DFA ? `<a href="${DFA.mapsUrl(g)}" target="_blank" rel="noopener">Directions</a>` : ""}
        ${!done && sp.tickets ? `<a href="${esc(sp.tickets.url)}" target="_blank" rel="noopener" title="${esc(sp.tickets.note || "")}">${esc(sp.tickets.label)}</a>` : ""}
        <button type="button" id="sp-share">${done ? "Share the final score" : "Share this game"}</button>
      </div>
    </div>`;

    const flag = $("#sp-flag"), clock = $("#sp-clock");
    const tick = () => {
      const ms = start - Date.now();
      const live = !done && ms <= 0;
      flag.className = `sp-flag ${live ? "live" : ""}`;
      flag.innerHTML = done ? "Final" : live ? "<i></i>Live" : today ? "Tonight" : esc(fmt(g.date, { weekday: "short" }));
      if (!clock) return false;
      if (live) { clock.hidden = true; return false; }
      const dd = Math.floor(ms / 864e5), h = Math.floor(ms / HOUR) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      const cell = (v, l) => `<span class="cl"><b>${String(v).padStart(2, "0")}</b><small>${l}</small></span>`;
      clock.innerHTML = (dd ? cell(dd, "days") : "") + cell(h, "hrs") + cell(m, "min") + cell(s, "sec");
      clock.setAttribute("aria-label", `Kickoff in ${dd ? `${dd} days, ` : ""}${h} hours and ${m} minutes`);
      return true;
    };
    if (tick()) { const id = setInterval(() => tick() || clearInterval(id), 1000); }
    if (!done) window.DFA?.weather(g).then((w) => { if (w) $("#sp-wx").textContent = ` · ${w.temp}° ${w.label.toLowerCase()}${w.rain >= 30 ? `, ${w.rain}% rain` : ""}`; });

    $("#sp-share").addEventListener("click", async (ev) => {
      const btn = ev.currentTarget;
      const text = done ? `${g.result === "W" ? sp.won : sp.lost}: Danvers ${g.us}, ${g.opponent} ${g.them}`
        : `${sp.kicker}: Danvers ${g.home ? "vs" : "at"} ${g.opponent}, ${fmt(g.date, { weekday: "long", month: "short", day: "numeric" })} at ${timeOf(g)}. Go Falcons!`;
      try {
        if (navigator.share) await navigator.share({ title: "Danvers Falcons Football", text, url: page });
        else { await navigator.clipboard.writeText(`${text} ${page}`); btn.textContent = "Link copied"; }
      } catch (e) { /* share sheet closed */ }
    });
    box.hidden = false;

    /* until the final, the Football menu link and team card glow gold, and the card carries a tag */
    if (!done) {
      SPOT_ON = true;
      $$('.nav a[href="football/"], .team-card[data-sport="football"], #today .td-g[data-sport="football"]').forEach((el) => el.classList.add("sp-glow"));
      const media = $('.team-card[data-sport="football"] .tc-media');
      if (media) media.insertAdjacentHTML("beforeend", `<span class="tc-ribbon">${esc(g.tag || sp.kicker)}${today ? " · tonight" : ""}</span>`);
    }
  }

  /* ---------- Game day: a strip under the scores for every game today, LIVE while it's on ---------- */
  function renderToday(upcoming) {
    if (!window.DFA) return;
    const strip = $("#today");
    const draw = () => {
      const today = upcoming.filter((e) => DFA.state({ ...e, finish: e.final }, e.sport));
      strip.hidden = !today.length;
      if (!today.length) return;
      const live = today.filter((e) => DFA.state({ ...e, finish: e.final }, e.sport) === "live").length;
      strip.innerHTML = `<div class="wrap">
        <span class="td-flag ${live ? "live" : ""}">${live ? "<i></i>Live now" : "Game day"}</span>
        <div class="td-games">${today.map((e) => {
          const on = DFA.state({ ...e, finish: e.final }, e.sport) === "live";
          const glow = SPOT_ON && e.sport === "football" ? " sp-glow" : "";
          return `<a class="td-g ${on ? "on" : ""}${glow}" data-sport="${esc(e.sport)}" href="${esc(e.href)}">
            <svg aria-hidden="true"><use href="#i-${e.sport}"/></svg>
            <span><b>${esc(e.team)} ${esc(e.title)}</b><small>${on ? "Under way" : timeOf(e) || "Today"}${e.home ? " · Home" : ""}</small></span></a>`;
        }).join("")}</div></div>`;
    };
    draw();
    setInterval(draw, 60000);
  }

  /* ---------- Hero numbers ---------- */
  function renderHeroStats(S, upcoming) {
    let w = 0, titles = 0;
    for (const s of Object.values(S)) {
      s.teams.forEach((tm) => tm.events.forEach((e) => (w += e.result === "W")));
      s.titles.forEach((x) => (titles += x.years.length));
    }
    const week = upcoming.filter((e) => new Date(e.date).getTime() < NOW + 7 * 24 * HOUR).length;
    const stat = (v, k, d) => `<div class="hs"><div class="hs-v" data-count="${v}">${v}</div><div class="hs-k">${k}</div><div class="hs-d">${d}</div></div>`;
    $("#hero-stats").innerHTML =
      stat(w, "Wins this fall", "Games, matches and meets won") +
      stat(week, week === 1 ? "Game this week" : "Games this week", "Meets and matches included") +
      stat(titles, "Conference titles", "All-time, across the programs");
    countUp($$("#hero-stats [data-count]"));
  }

  function countUp(els) {
    if (calm) return;
    els.forEach((el) => {
      const end = +el.dataset.count, t0 = performance.now(), dur = 900;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------- Photos for each team: its newest action shot, else its team photo ---------- */
  const TEAM_PHOTO = { football: "football", "field-hockey": "field-hockey", volleyball: "volleyball", golf: "golf", "cross-country": "boys-xc" };
  const SPORTS = [["football", "Football"], ["soccer", "Soccer"], ["field-hockey", "Field Hockey"], ["volleyball", "Volleyball"],
                  ["cross-country", "Cross Country"], ["golf", "Golf"], ["esports", "Esports"]];
  function photoFor(S, sport, team) {
    const own = (S[sport]?.photos || []).find((p) => !team || !p.team || p.team === team);
    if (own) return `${sport}/${own.src}`;
    if (sport === "soccer") return `images/teams/${/boys/i.test(team || "") ? "boys" : "girls"}-soccer.jpg`;
    return TEAM_PHOTO[sport] ? `images/teams/${TEAM_PHOTO[sport]}.jpg` : null;
  }
  const recsOf = (s) => s.teams.filter((t) => t.record);

  /* ---------- Pick your team: each row gets its record and next game ---------- */
  function renderTeamRows(S) {
    $$(".trow[data-sport]").forEach((row) => {
      const s = S[row.dataset.sport];
      if (!s) return;
      const all = s.meets || s.teams.flatMap((t) => t.events);
      const next = upcomingOf(all)[0];
      $(".trow-rec", row).innerHTML = recsOf(s).map((t) => `<span>${t.label ? `<small>${esc(t.label)}</small>` : ""}${esc(t.record)}</span>`).join("");
      const who = (e) => (s.teams.length > 1 && !s.meets ? `${e.team.split(" ")[0]} · ` : "");
      $(".trow-next", row).innerHTML = next
        ? `<small>Next</small>${esc(who(next))}${esc(next.title)} · ${esc(dayShort(next.date))}`
        : `<small>Season</small>${finalsOf(all).length ? "Complete" : "Under way"}`;
    });
  }

  /* ---------- Hero: team photos wipe through the slanted frame ---------- */
  function heroFrame() {
    const imgs = $$("#hero-frame img"), cap = $("#frame-cap");
    if (imgs.length < 2 || calm) return;
    let at = 0;
    setInterval(() => {
      imgs[at].classList.remove("on");
      at = (at + 1) % imgs.length;
      const img = imgs[at];
      if (img.loading === "lazy") img.loading = "eager";
      img.classList.add("on");
      if (cap) cap.textContent = img.dataset.team;
    }, 4800);
  }

  /* ---------- Match Centre: recent results, then what's next, in one row ---------- */
  function renderMatchCentre(finals, upcoming, events) {
    const box = $("#week-list");
    if (!finals.length && !upcoming.length) { box.innerHTML = `<p class="empty">No games on the calendar right now. Check each team's schedule for the postseason.</p>`; return; }
    const crest = `<span class="mc-crest"><img src="images/falcons-logo.png" alt=""></span>`;
    const opp = (e) => (window.DFA && e.opponent ? DFA.badge(e.opponent, "md") : `<span class="mc-crest none"></span>`);
    const sideUs = `<div class="mc-side">${crest}<b>Danvers</b></div>`;
    const sideThem = (e) => `<div class="mc-side">${opp(e)}<b>${esc(e.opponent)}</b></div>`;
    /* a meet's write-up entry knows both squads' places; per-squad result items don't */
    const meetOf = (e) => (e.sport === "cross-country" ? events.find((m) => m.sport === "cross-country" && m.date === e.date && m.title === e.title) : null);
    const seen = new Set();
    const finalCards = [...finals].reverse().filter((e) => {
      const key = `${e.sport}|${e.date}|${e.title}`;   // one card per cross country meet, not one per squad
      if (seen.has(key)) return false;
      seen.add(key); return true;
    }).map((e) => {
      const m = meetOf(e);
      const parts = m?.squadResults?.length ? m.squadResults.map(([lab, r, sc]) => `<span class="${r}">${lab} ${r} ${sc}</span>`)
        : m?.squadPlaces?.length ? m.squadPlaces.map(([lab, p]) => `<span>${lab} ${ord(p)}</span>`)
        : [`<span class="${resClass(e.result)}">${esc(resText(e))}</span>`];
      const head = e.opponent && !e.tournament && !m ? `<div class="mc-teams">${sideUs}<div class="mc-mid mc-score">${parts.join("")}</div>${sideThem(e)}</div>`
        : `<div class="mc-event"><b>${esc(e.title)}</b><div class="mc-score">${parts.join("")}</div></div>`;
      return `<a class="mc-card final" href="${esc(e.href)}">
        <div class="mc-top"><span>${esc(e.sport === "cross-country" ? "Cross Country" : e.team)}</span><span>Final · ${fmt(e.date, { month: "short", day: "numeric" })}</span></div>
        ${head}
        <div class="mc-foot">${esc(e.site || "")}</div></a>`;
    });
    const upCards = upcoming.map((e, i) => {
      const when = `<b>${fmt(e.date, { weekday: "short" })}</b>${esc(fmt(e.date, { month: "short", day: "numeric" }))}${e.timeTbd ? "" : `<span>${esc(timeOf(e))}</span>`}`;
      const head = e.opponent && !e.tournament ? `<div class="mc-teams">${sideUs}<div class="mc-mid mc-when">${when}</div>${sideThem(e)}</div>`
        : `<div class="mc-event"><b>${esc(e.title)}</b><div class="mc-when">${when}</div></div>`;
      return `<a class="mc-card upcoming${i === 0 ? " next" : ""}" href="${esc(e.href)}">
        <div class="mc-top"><span>${esc(e.team)}</span><span>${i === 0 ? "Next up" : e.home ? "Home" : e.home === false ? "Away" : ""}</span></div>
        ${head}
        <div class="mc-foot">${esc(e.site || "")}</div></a>`;
    });
    box.innerHTML = finalCards.join("") + upCards.join("");
    /* open on the next game, with the recent results a scroll to the left */
    const first = $(".mc-card.next", box);
    if (first) box.scrollLeft = first.offsetLeft - box.offsetLeft - 4;
    const step = () => Math.max(260, box.clientWidth * 0.8);
    $(".mc-prev")?.addEventListener("click", () => box.scrollBy({ left: -step(), behavior: calm ? "auto" : "smooth" }));
    $(".mc-next")?.addEventListener("click", () => box.scrollBy({ left: step(), behavior: calm ? "auto" : "smooth" }));
  }

  /* ---------- Latest result from every team ---------- */
  function renderLatest(S) {
    const stories = [];
    for (const [key, s] of Object.entries(S)) {
      const all = finalsOf(s.meets || s.teams.flatMap((t) => t.events)).filter((e) => e.summary);
      if (all[0]) stories.push(all[0]);
    }
    stories.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!stories.length) return;
    const head = (e) => {
      if (e.headline) return e.headline;
      if (e.sport === "cross-country" && e.squadResults?.length) {
        const won = e.squadResults.filter(([, r]) => r === "W").length;
        return won === 2 ? `Falcons sweep ${e.opponent}` : won ? `Split with ${e.opponent}` : `${e.opponent} takes both races`;
      }
      if (!e.score && e.squadPlaces?.length) {   // championship meets: each team's place, not a dual-meet score
        const places = [...new Set(e.squadPlaces.map(([, p]) => p))];
        return places.length === 1 ? `Falcons place ${ord(places[0])} at the ${e.title}`
          : `${e.squadPlaces.map(([lab, p]) => `${lab} ${ord(p)}`).join(", ")} at the ${e.title}`;
      }
      if (e.tournament || !e.result) return e.score ? `Falcons place ${e.score} at the ${e.title}` : `Falcons run at the ${e.title}`;
      const who = e.opponent;
      return e.result === "W" ? `Falcons beat ${who} ${e.score}` : e.result === "T" ? `Falcons and ${who} tie ${e.score}` : `${who} tops the Falcons ${e.score.split("–").reverse().join("–")}`;
    };
    const score = (e) => e.squadResults?.length
      ? e.squadResults.map(([lab, r, sc]) => `<span class="ls-chip ${r}">${lab} ${r} ${sc}</span>`).join("")
      : !e.score && e.squadPlaces?.length ? e.squadPlaces.map(([lab, p]) => `<span class="ls-chip">${lab} ${ord(p)}</span>`).join("")
      : `<span class="ls-chip ${resClass(e.result)}">${esc(resText(e))}</span>`;
    const name = (e) => (e.sport === "cross-country" ? "Cross Country" : e.team);
    const when = (e) => fmt(e.date, { month: "short", day: "numeric" });
    const [lead, ...rest] = stories;
    const photo = photoFor(S, lead.sport, lead.team);
    $("#latest-list").innerHTML = `
      <a class="news-lead" href="${esc(lead.href)}">
        ${photo ? `<img src="${esc(photo)}" alt="" loading="lazy">` : ""}
        <div class="nl-box">
          <span class="nl-meta">${esc(name(lead))} · ${esc(when(lead))}</span>
          <div class="ls-score">${score(lead)}</div>
          <h3>${esc(head(lead))}</h3>
          <p>${esc(lead.summary)}</p>
          <span class="more">Read the full recap <span aria-hidden="true">→</span></span>
        </div>
      </a>
      <div class="news-list">${rest.slice(0, 5).map((e, i) => `<a class="news-item${i === 0 ? " hot" : ""}" href="${esc(e.href)}">
          <span class="ni-meta">${esc(name(e))} · ${esc(when(e))}</span>
          <b>${esc(head(e))}</b>
          <span class="ls-score">${score(e)}</span>
        </a>`).join("")}</div>`;
    $("#latest").hidden = false;
  }

  /* ---------- Conference titles by program ---------- */
  function renderTitles(S) {
    const rows = Object.values(S).flatMap((s) => s.titles).filter((t) => t.years.length).sort((a, b) => b.years.length - a.years.length);
    if (!rows.length) return;
    const total = rows.reduce((n, r) => n + r.years.length, 0);
    const max = rows[0].years.length;
    $("#titles-total").textContent = total;
    $("#titles-programs").textContent = rows.length;
    $("#title-bars").innerHTML = rows.map((r) => {
      const ys = [...r.years].sort((a, b) => a - b);
      return `<a class="tb" href="${esc(r.href)}" data-tip="${esc(`${r.name}: ${ys.join(", ")}`)}" aria-label="${esc(`${r.name}, ${ys.length} conference titles, most recent ${ys[ys.length - 1]}`)}">
        <span class="tb-name">${esc(r.name)}</span>
        <span class="tb-track"><span class="tb-bar" style="--w:${(ys.length / max) * 100}%"></span></span>
        <span class="tb-n">${ys.length}</span>
        <span class="tb-last">Latest: ${ys[ys.length - 1]}</span>
      </a>`;
    }).join("");
    /* one fact per program first, then any extras */
    const lists = ["field-hockey", "cross-country", "soccer", "volleyball"].map((k) => [...(S[k]?.tiles || [])]);
    const tiles = [];
    while (tiles.length < 4 && lists.some((l) => l.length)) lists.forEach((l) => l.length && tiles.length < 4 && tiles.push(l.shift()));
    $("#tradition-tiles").innerHTML = tiles.map(([team, k, v, d]) => `<div class="card fact">
        <div class="fact-team">${esc(team)}</div><div class="fact-v">${esc(v)}</div><div class="fact-k">${esc(k)}</div><div class="fact-d">${esc(d)}</div></div>`).join("");

    /* bars grow in once they scroll into view; the tooltip lists the title years */
    const box = $("#title-bars");
    if (calm || !("IntersectionObserver" in window)) box.classList.add("in");
    else new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { box.classList.add("in"); o.disconnect(); } }, { threshold: .3 }).observe(box);
    const tip = $("#tip");
    const show = (el, x, y) => { tip.textContent = el.dataset.tip; tip.hidden = false; const r = tip.getBoundingClientRect(); tip.style.left = `${Math.min(innerWidth - r.width - 12, Math.max(12, x - r.width / 2))}px`; tip.style.top = `${y - r.height - 12}px`; };
    $$(".tb", box).forEach((el) => {
      el.addEventListener("mousemove", (ev) => show(el, ev.clientX, ev.clientY));
      el.addEventListener("focus", () => { const r = el.getBoundingClientRect(); show(el, r.left + r.width / 2, r.top); });
      el.addEventListener("mouseleave", () => (tip.hidden = true));
      el.addEventListener("blur", () => (tip.hidden = true));
    });
  }

  /* ---------- Photos: action shots from every site's PHOTOS join the team photos ---------- */
  function renderGallery(S) {
    const NAMES_BY = { football: "Football", soccer: "Soccer", "field-hockey": "Field Hockey", volleyball: "Volleyball", "cross-country": "Cross Country", golf: "Golf", esports: "Esports" };
    const extra = Object.keys(NAMES_BY).flatMap((key) => (S[key]?.photos || []).map((p) => ({ ...p, src: `${key}/${p.src}`, team: p.team || NAMES_BY[key] })));
    if (!extra.length) return;
    const credits = [...new Set(extra.map((p) => p.credit).filter(Boolean))];
    if (credits.length) $(".credit").insertAdjacentHTML("beforeend", ` Action shots: ${credits.map((c) => c.startsWith("@") ? `<a href="https://www.instagram.com/${esc(c.slice(1))}/" target="_blank" rel="noopener">${esc(c)}</a> on Instagram` : esc(c)).join(", ")}.`);
    $("#gallery-grid").insertAdjacentHTML("beforeend", extra.slice(0, 12).map((p) => `<figure class="gal">
        <button type="button" data-full="${esc(p.src)}" data-cap="${esc(p.caption)}"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy"></button>
        <figcaption><b>${esc(p.team)}</b> ${esc(p.caption)}</figcaption></figure>`).join(""));
  }

  /* ---------- Full-size team photos ---------- */
  function lightbox() {
    const dlg = $("#viewer");
    if (!dlg || !dlg.showModal) return;
    document.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-full]");
      if (!b) return;
      $("img", dlg).src = b.dataset.full;
      $("img", dlg).alt = b.dataset.cap;
      $("figcaption", dlg).textContent = b.dataset.cap;
      dlg.showModal();
    });
    dlg.addEventListener("click", (ev) => { if (ev.target === dlg || ev.target.closest(".viewer-close")) dlg.close(); });
  }
})();
