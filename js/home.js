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
    sport, team, href, date: g.date, timeTbd: g.timeTbd, home: g.home, site: g.site,
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
        squadResults: squads.filter(([k]) => m[k]?.result).map(([k, label]) => [label, m[k].result, `${m[k].us}–${m[k].them}`]) }));
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

  rotatePhotos();
  lightbox();

  Promise.all(FOLDERS.map(load)).then((all) => {
    const S = {};
    FOLDERS.forEach((f, i) => {
      if (!all[i]) return;
      try { S[f] = ADAPT[f](all[i]); S[f].photos = all[i].PHOTOS || []; } catch (e) { console.warn(`Hub: could not read ${f} data`, e); }
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
    renderNext(UPCOMING[0]);
    renderHeroStats(S, UPCOMING);
    renderCards(S);
    renderWeek(UPCOMING.slice(0, 8));
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

  /* ---------- Next game + countdown ---------- */
  function renderNext(e) {
    const box = $("#next-up");
    if (!e) return;
    const start = new Date(e.date).getTime();
    box.innerHTML = `
      <div class="nu-top"><span>Next up</span><span>${esc(e.team)}</span></div>
      <div class="nu-body">
        <div class="nu-when">${[fmt(e.date, { weekday: "long", month: "short", day: "numeric" }), timeOf(e)].filter(Boolean).map(esc).join(" · ")}</div>
        <div class="nu-match">
          <span class="nu-logo"><img src="images/falcons-logo.png" alt=""></span>
          <div><div class="nu-title">${esc(e.title)}</div>${e.mascot ? `<div class="nu-mascot">${esc(e.mascot)}</div>` : ""}</div>
        </div>
        <div class="clock" id="clock" aria-live="off"></div>
        <div class="nu-site">${[esc(e.site || ""), e.home ? "<b>Home</b>" : e.home === false ? "Away" : ""].filter(Boolean).join(" · ")}</div>
        ${window.DFA ? `<div class="nu-extra">
          <span class="nu-wx" id="nu-wx"></span>
          <span class="nu-acts">
            <a href="${DFA.mapsUrl(e)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>Directions</a>
            ${e.tickets ? `<a href="${esc(e.tickets.url)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9V6h18v3a3 3 0 0 0 0 6v3H3v-3a3 3 0 0 0 0-6z"/><path d="M14 6v12" stroke-dasharray="2 2.5"/></svg>Tickets</a>` : ""}
          </span>
        </div>` : ""}
      </div>
      <a class="nu-foot" href="${esc(e.href)}">Game details <span aria-hidden="true">→</span></a>`;
    const clock = $("#clock");
    const tick = () => {
      const ms = start - Date.now();
      if (ms <= 0) { clock.innerHTML = `<div class="clock-live">Under way now</div>`; return false; }
      const d = Math.floor(ms / 864e5), h = Math.floor(ms / HOUR) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      const cell = (v, l) => `<div class="cl"><b>${String(v).padStart(2, "0")}</b><span>${l}</span></div>`;
      clock.innerHTML = cell(d, "Days") + cell(h, "Hrs") + cell(m, "Min") + cell(s, "Sec");
      clock.setAttribute("aria-label", `Starts in ${d} days, ${h} hours and ${m} minutes`);
      return true;
    };
    if (tick()) { const id = setInterval(() => tick() || clearInterval(id), 1000); }
    box.hidden = false;
    window.DFA?.weather(e).then((w) => { if (w) $("#nu-wx").innerHTML = `${w.icon}<b>${w.temp}°</b><span>${esc(w.label)}${w.rain >= 30 ? ` · ${w.rain}% rain` : ""}</span>`; });
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
          return `<a class="td-g ${on ? "on" : ""}" href="${esc(e.href)}">
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

  /* ---------- Team cards ---------- */
  function renderCards(S) {
    $$(".team-card[data-sport]").forEach((card) => {
      const s = S[card.dataset.sport];
      if (!s) return;
      const all = s.meets || s.teams.flatMap((t) => t.events);
      const last = finalsOf(all)[0];
      const next = upcomingOf(all)[0];
      const recs = s.teams.filter((t) => t.record).map((t) => `<span class="rec">${t.label ? `<small>${esc(t.label)}</small>` : ""}<b>${esc(t.record)}</b></span>`).join("");
      const rank = s.rank || s.teams.map((t) => t.rank && `${t.label}: ${t.rank.replace(/ power rankings$/, "")}`).filter(Boolean).join(" · ");
      const lastRes = last && (last.squadResults?.length
        ? last.squadResults.map(([lab, r, sc]) => `${lab} <b class="${r}">${r} ${sc}</b>`).join(", ")
        : `<b class="${resClass(last.result)}">${esc(resText(last))}</b>`);
      const sport = (e) => (s.teams.length > 1 && !s.meets ? `${e.team.split(" ")[0]} · ` : "");
      card.querySelector(".tc-live").innerHTML = `
        ${recs ? `<div class="tc-recs">${recs}<span class="tc-recs-k">${s.teams.length > 1 ? "Records" : "Record"}</span></div>` : `<div class="tc-recs"><span class="tc-recs-k">Season under way</span></div>`}
        ${rank ? `<div class="tc-rank">${esc(rank)}</div>` : ""}
        <dl class="tc-games">
          ${last ? `<div><dt>Last</dt><dd>${sport(last)}${esc(last.title)} · ${lastRes}</dd></div>` : ""}
          ${next ? `<div><dt>Next</dt><dd>${sport(next)}${esc(next.title)} · ${dayShort(next.date)}${next.timeTbd ? "" : `, ${timeOf(next)}`}</dd></div>` : ""}
        </dl>`;
    });
  }

  /* ---------- Coming up ---------- */
  function renderWeek(list) {
    const box = $("#week-list");
    if (!list.length) { box.innerHTML = `<p class="empty">No games on the calendar right now. Check each team's schedule for the postseason.</p>`; return; }
    box.innerHTML = list.map((e) => `<a class="wk card lift" href="${esc(e.href)}">
        <div class="wk-date"><span>${fmt(e.date, { weekday: "short" })}</span><b>${fmt(e.date, { day: "numeric" })}</b><span>${fmt(e.date, { month: "short" })}</span></div>
        <div class="wk-main">
          <div class="wk-team"><svg aria-hidden="true"><use href="#i-${e.sport}"/></svg>${esc(e.team)}</div>
          <div class="wk-title">${esc(e.title)}</div>
          <div class="wk-meta">${[timeOf(e), e.site].filter(Boolean).map(esc).join(" · ")}</div>
        </div>
        ${e.home ? `<span class="wk-ha home">Home</span>` : e.home === false ? `<span class="wk-ha">Away</span>` : ""}
      </a>`).join("");
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
      if (e.tournament || !e.result) return `Falcons place ${e.score} at the ${e.title}`;
      const who = e.opponent;
      return e.result === "W" ? `Falcons beat ${who} ${e.score}` : e.result === "T" ? `Falcons and ${who} tie ${e.score}` : `${who} tops the Falcons ${e.score.split("–").reverse().join("–")}`;
    };
    const score = (e) => e.squadResults?.length
      ? e.squadResults.map(([lab, r, sc]) => `<span class="ls-chip ${r}">${lab} ${r} ${sc}</span>`).join("")
      : `<span class="ls-chip ${resClass(e.result)}">${esc(resText(e))}</span>`;
    $("#latest-list").innerHTML = stories.slice(0, 6).map((e) => `<a class="story card lift" href="${esc(e.href)}">
        <div class="ls-top"><svg aria-hidden="true"><use href="#i-${e.sport}"/></svg><span>${esc(e.sport === "cross-country" ? "Cross Country" : e.team)}</span><span class="ls-date">${fmt(e.date, { month: "short", day: "numeric" })}</span></div>
        <div class="ls-body">
          <div class="ls-score">${score(e)}</div>
          <h3>${esc(head(e))}</h3>
          <p>${esc(e.summary)}</p>
          <span class="more">Full recap <span aria-hidden="true">→</span></span>
        </div>
      </a>`).join("");
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
    const extra = Object.keys(NAMES_BY).flatMap((key) => (S[key]?.photos || []).map((p) => ({ ...p, src: `${key}/${p.src}`, team: NAMES_BY[key] })));
    if (!extra.length) return;
    $("#gallery-grid").insertAdjacentHTML("beforeend", extra.slice(0, 12).map((p) => `<figure class="gal">
        <button type="button" data-full="${esc(p.src)}" data-cap="${esc(p.caption)}"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy"></button>
        <figcaption><b>${esc(p.team)}</b> ${esc(p.caption)}</figcaption></figure>`).join(""));
  }

  /* ---------- Soccer and cross country cards fade between the girls and boys photos ---------- */
  function rotatePhotos() {
    $$(".tc-media").forEach((m, i) => {
      const imgs = $$("img", m);
      if (imgs.length < 2) return;
      const tag = $(".tc-squad", m);
      let at = 0;
      const show = (n) => { imgs.forEach((im, j) => im.classList.toggle("on", j === n)); if (tag) tag.textContent = imgs[n].dataset.squad || ""; };
      show(0);
      if (calm) return;
      setTimeout(() => setInterval(() => show((at = (at + 1) % imgs.length)), 5000), i * 700);
    });
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
