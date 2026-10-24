/* =====================================================================
   Search across every sport: athletes, games, opponents and team pages.
   Opens from the magnifier in the header, or with ⌘K / Ctrl+K or "/".
   It reads each team site's js/data.js the first time it opens, so new
   players and results show up here as soon as a site is updated.
   Athletes link to their card on the stats page (#p=Name) and games open
   their popup on the schedule page (#g=id); js/extras.js handles both.
   ===================================================================== */
(function () {
  const ROOT = new URL("..", document.currentScript.src).href;   // the site root, from /js/search.js
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fold = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const fmt = (iso, o) => new Date(iso).toLocaleString("en-US", o);
  const ord = (n) => n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");

  const SPORTS = [["football", "Football"], ["soccer", "Soccer"], ["field-hockey", "Field Hockey"], ["volleyball", "Volleyball"],
                  ["cross-country", "Cross Country"], ["golf", "Golf"], ["esports", "Esports"]];
  const NAMES = ["TEAM", "TEAMS", "SCHEDULE", "MEETS", "GAMES", "PLAYERS", "RUNNERS"];

  /* Sport icons, the same drawings as the hub's (added to the page when it doesn't have them) */
  const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <symbol id="i-football" viewBox="0 0 64 64"><g transform="rotate(-35 32 32)"><path d="M5 32C13 17 51 17 59 32C51 47 13 47 5 32Z"/><path d="M23 32h18M27 28v8M32 28v8M37 28v8"/><path d="M14 25.5v13M50 25.5v13"/></g></symbol>
    <symbol id="i-soccer" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26"/><path d="M32 22l9.5 6.9-3.6 11.2H26.1l-3.6-11.2z" fill="currentColor"/><path d="M32 22V6M41.5 28.9l15.2-4.9M37.9 40.1l9.4 12.9M26.1 40.1l-9.4 12.9M22.5 28.9L7.3 24"/></symbol>
    <symbol id="i-field-hockey" viewBox="0 0 64 64"><path d="M48 5L24 45c-3 6-10 8-14 5-3-2-2-6 1-6"/><circle cx="44" cy="52" r="5" fill="currentColor"/></symbol>
    <symbol id="i-volleyball" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26"/><path d="M32 32c0-11 5-20 14-24.5M32 32c-9.5 5.5-20 5.5-27.5.5M32 32c9.5 5.5 14.5 14.5 13.5 24.5"/></symbol>
    <symbol id="i-cross-country" viewBox="0 0 64 64"><circle cx="32" cy="36" r="22"/><path d="M26 6h12M32 6v8M48 18l4-4M32 36l9-9"/><circle cx="32" cy="36" r="2.5" fill="currentColor"/></symbol>
    <symbol id="i-golf" viewBox="0 0 64 64"><path d="M26 54V7"/><path d="M26 8l22 8-22 8z" fill="currentColor"/><ellipse cx="26" cy="54" rx="18" ry="4.5"/><circle cx="47" cy="47" r="3.5" fill="currentColor"/></symbol>
    <symbol id="i-esports" viewBox="0 0 64 64"><path d="M20 20h24c7 0 11 5 12.5 13l2.2 12.5c1 6-5.5 9.5-9.5 5.2L42 43H22l-7.2 7.7c-4 4.3-10.5.8-9.5-5.2L7.5 33C9 25 13 20 20 20z"/><path d="M19 28v10M14 33h10"/><circle cx="43" cy="30" r="2.4" fill="currentColor"/><circle cx="49" cy="36" r="2.4" fill="currentColor"/></symbol>
    <symbol id="i-page" viewBox="0 0 64 64"><path d="M16 6h22l12 12v40H16z"/><path d="M38 6v12h12M24 32h18M24 41h18M24 50h10"/></symbol>
  </defs></svg>`;
  const ICON_SEARCH = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';

  /* ---------- Load every site's data ---------- */
  let INDEX = null;
  const load = (sport) => fetch(`${ROOT}${sport}/js/data.js`)
    .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
    .then((src) => new Function(`${src}\n;return {${NAMES.map((n) => `${n}: typeof ${n} === "undefined" ? undefined : ${n}`).join(",")}};`)())
    .catch(() => null);

  function build(all) {
    const out = [];
    const add = (e) => out.push({ ...e, hay: fold(`${e.title} ${e.sub || ""} ${e.keys || ""}`), words: fold(e.title).split(/[^a-z0-9]+/) });
    const tally = (games, key) => {
      const t = {};
      games.forEach((g) => (g[key] || []).forEach(([n, k]) => (t[n] = (t[n] || 0) + (k || 1))));
      return t;
    };
    const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;
    const record = (list, ties) => {
      const n = (r) => list.filter((g) => g.result === r).length;
      return list.some((g) => g.result) ? `${n("W")}–${n("L")}${ties || n("T") ? `–${n("T")}` : ""}` : "";
    };

    SPORTS.forEach(([sport, label], i) => {
      const d = all[i];
      if (!d) return;
      const site = `${ROOT}${sport}/`;

      /* the team site and its pages */
      const squads = sport === "soccer" ? [["girls", "Girls Soccer"], ["boys", "Boys Soccer"]] : [[null, label]];
      squads.forEach(([k, name]) => {
        const q = k ? `?team=${k}` : "";
        const games = sport === "soccer" ? d.TEAMS[k].schedule.filter((g) => !g.scrimmage) : (d.SCHEDULE || []).filter((g) => !g.scrimmage);
        const rec = sport === "cross-country" ? "" : record(games, /soccer|field-hockey/.test(sport));
        add({ type: "team", sport, title: name, sub: [rec && `${rec} this fall`, "Team site"].filter(Boolean).join(" · "), right: "Team", href: `${site}index.html${q}`,
              keys: `${sport} falcons team home ${k || ""}` });
        const pages = sport === "cross-country" ? [["schedule", "Schedule & results"], ["runners", "Runners"], ["history", "History"], ["media", "Media"]]
          : [["schedule", "Schedule & results"], ["stats", "Stats & roster"], ["history", "History"], ["media", "Media & highlights"]];
        pages.forEach(([p, what]) => add({ type: "page", sport, title: `${name} ${what}`, right: "Page", href: `${site}${p}.html${q}`, keys: `${p} roster scores` }));
      });

      /* athletes */
      if (sport === "soccer") {
        ["girls", "boys"].forEach((k) => {
          const T = d.TEAMS[k], goals = tally(T.schedule, "scorers"), assists = tally(T.schedule, "assists");
          T.players.forEach((p) => add({ type: "athlete", sport, title: p.name, href: `${site}stats.html?team=${k}#p=${encodeURIComponent(p.name)}`,
            sub: [T.short ? `${T.short} Soccer` : T.label, p.pos?.join("/"), p.grade, p.num != null && `#${p.num}`,
                  goals[p.name] && plural(goals[p.name], "goal"), assists[p.name] && plural(assists[p.name], "assist")].filter(Boolean).join(" · "),
            right: p.captain ? "Captain" : "", keys: "player athlete" }));
        });
      } else if (sport === "cross-country") {
        (d.RUNNERS || []).forEach((p) => add({ type: "athlete", sport, title: p.name, href: `${site}runners.html#p=${encodeURIComponent(p.name)}`,
          sub: [`${p.squad === "girls" ? "Girls" : "Boys"} Cross Country`, p.grade, p.pr && `PR ${p.pr}`].filter(Boolean).join(" · "),
          right: p.captain ? "Captain" : "", keys: "runner athlete" }));
      } else {
        const sched = d.SCHEDULE || [];
        const goals = tally(sched, "scorers");
        const kills = {};
        sched.forEach((g) => Object.entries(g.box || {}).forEach(([n, row]) => (kills[n] = (kills[n] || 0) + (row[1] || 0))));
        (d.PLAYERS || []).forEach((p) => {
          const stat = sport === "football" ? p.stats?.[0] && `${p.stats[0][1]} ${p.stats[0][0].toLowerCase()}`
            : sport === "field-hockey" ? goals[p.name] && plural(goals[p.name], "goal")
            : sport === "volleyball" ? kills[p.name] && `${kills[p.name]} kills` : null;
          add({ type: "athlete", sport, title: p.name, href: `${site}stats.html#p=${encodeURIComponent(p.name)}`,
            sub: [label, p.pos?.join("/"), p.grade, p.num != null && `#${p.num}`, stat].filter(Boolean).join(" · "),
            right: p.captain ? "Captain" : "", keys: "player athlete" });
        });
      }

      /* games, matches and meets */
      const gameRows = (list, name, q) => list.forEach((g) => {
        if (sport === "esports" && !g.opponent) return;
        const vs = g.tournament || g.name ? (g.name || g.opponent) : `${g.home === false || (!g.home && sport !== "cross-country") ? "at" : "vs"} ${g.opponent}`;
        let right = "", cls = "";
        if (sport === "cross-country") {
          const parts = [["Boys", g.boys], ["Girls", g.girls]].filter(([, r]) => r && (r.result || r.place));
          right = parts.map(([k, r]) => (r.result ? `${k[0]} ${r.result}` : `${k[0]} ${ord(r.place)}`)).join(" · ");
          cls = parts.length ? "done" : "";
        } else if (g.result) { right = `${g.result} ${g.us}–${g.them}`; cls = g.result; }
        else if (g.finish) { right = `${g.finish}${g.fieldSize ? ` of ${g.fieldSize}` : ""}`; cls = "done"; }
        else if (g.cancelled || g.off || g.noResult) right = "Off";
        else if (!g.dateTbd && new Date(g.date) > Date.now() - 3 * 36e5) { right = "Upcoming"; cls = "up"; }
        add({ type: "game", sport, title: `${name} ${vs}`, date: g.date, right, cls,
              sub: [!g.dateTbd && fmt(g.date, { weekday: "short", month: "short", day: "numeric" }), !g.timeTbd && !g.dateTbd && fmt(g.date, { hour: "numeric", minute: "2-digit" }), g.site].filter(Boolean).join(" · "),
              href: `${site}schedule.html${q}#g=${g.id}`,
              keys: `${g.opponent || ""} ${g.mascot || ""} ${g.postseason || g.tournament ? "playoff tournament postseason" : ""} ${g.date ? fmt(g.date, { month: "long" }) : ""} game match` });
      });
      if (sport === "soccer") ["girls", "boys"].forEach((k) => gameRows(d.TEAMS[k].schedule.filter((g) => !g.scrimmage), d.TEAMS[k].short ? `${d.TEAMS[k].short} Soccer` : d.TEAMS[k].label, `?team=${k}`));
      else if (sport === "cross-country") gameRows(d.MEETS || [], "Cross Country", "");
      else if (sport === "esports") {
        const title = Object.fromEntries((d.GAMES || []).map((x) => [x.id, x.short]));
        gameRows((d.SCHEDULE || []).filter((m) => title[m.game]), "Esports", "");
      } else gameRows((d.SCHEDULE || []).filter((g) => !g.scrimmage), label, "");
    });

    return out;
  }

  /* ---------- Matching ---------- */
  const WEIGHT = { team: 4, athlete: 3, page: 1, game: 2 };
  function score(e, terms) {
    let s = 0;
    for (const t of terms) {
      if (!e.hay.includes(t)) return 0;
      if (e.words.some((w) => w === t)) s += 6;
      else if (e.words.some((w) => w.startsWith(t))) s += 4;
      else if (fold(e.title).includes(t)) s += 2;
      else s += 1;
    }
    return s * 10 + WEIGHT[e.type] + (e.cls === "up" ? 1 : 0);
  }
  const mark = (text, terms) => {
    let html = esc(text);
    for (const t of terms.filter((x) => x.length > 1).sort((a, b) => b.length - a.length)) {
      html = html.replace(new RegExp(`(^|[^\\w&])(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "$1<mark>$2</mark>");
    }
    return html;
  };

  /* ---------- The palette ---------- */
  let dlg, input, list, filter = "all", items = [], at = 0;

  function ui() {
    if (dlg) return;
    if (!document.getElementById("i-page")) document.body.insertAdjacentHTML("afterbegin", SPRITE);
    dlg = document.createElement("dialog");
    dlg.className = "dfs";
    dlg.setAttribute("aria-label", "Search every Danvers team");
    dlg.innerHTML = `
      <div class="dfs-panel">
        <div class="dfs-bar">
          ${ICON_SEARCH}
          <input type="search" placeholder="Athletes, teams, opponents…" aria-label="Search" autocomplete="off" spellcheck="false" enterkeyhint="go">
          <button class="dfs-x" type="button" aria-label="Close search">Esc</button>
        </div>
        <div class="dfs-tabs" role="tablist">
          ${[["all", "All"], ["athlete", "Athletes"], ["game", "Games"], ["team", "Teams"]].map(([k, l]) => `<button type="button" role="tab" data-f="${k}" aria-selected="${k === "all"}">${l}</button>`).join("")}
        </div>
        <div class="dfs-list" role="listbox" aria-label="Results"><div class="dfs-wait"><i></i><i></i><i></i></div></div>
        <div class="dfs-foot"><span><kbd>↑</kbd><kbd>↓</kbd> move <kbd>↵</kbd> open <kbd>esc</kbd> close</span><span class="dfs-count"></span></div>
      </div>`;
    document.body.appendChild(dlg);
    input = dlg.querySelector("input");
    list = dlg.querySelector(".dfs-list");

    input.addEventListener("input", () => { at = 0; render(); });
    dlg.querySelector(".dfs-tabs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-f]");
      if (!b) return;
      filter = b.dataset.f;
      dlg.querySelectorAll("[data-f]").forEach((x) => x.setAttribute("aria-selected", x === b));
      at = 0; render(); input.focus();
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".dfs-x")) close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!items.length) return;
        at = (at + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
        highlight(true);
      } else if (e.key === "Enter" && items[at] && !e.isComposing) {
        e.preventDefault();
        go(items[at], e.metaKey || e.ctrlKey);
      }
    });
    list.addEventListener("mousemove", (e) => {
      const a = e.target.closest(".dfs-item");
      if (a && +a.dataset.i !== at) { at = +a.dataset.i; highlight(false); }
    });
    /* a picked result: close first so a page transition (hub) or the popup (same page) shows on top */
    list.addEventListener("click", (e) => {
      const a = e.target.closest(".dfs-item");
      if (a && !(e.metaKey || e.ctrlKey || e.shiftKey)) close();
    });
  }

  function go(a, newTab) {
    if (newTab) { window.open(a.href, "_blank", "noopener"); return; }
    const r = a.getBoundingClientRect();
    a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window, clientX: r.left + 40, clientY: r.top + r.height / 2 }));
  }

  function highlight(scroll) {
    items.forEach((a, i) => { a.classList.toggle("on", i === at); a.setAttribute("aria-selected", i === at); });
    if (scroll) items[at]?.scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", items[at]?.id || "");
  }

  const row = (e, terms, i) => `
    <a class="dfs-item ${e.type}" id="dfs-${i}" role="option" data-i="${i}" href="${esc(e.href)}">
      <span class="dfs-ic ${e.sport}"><svg><use href="#i-${e.type === "page" ? "page" : e.sport}"/></svg></span>
      <span class="dfs-txt"><b>${mark(e.title, terms)}</b>${e.sub ? `<small>${mark(e.sub, terms)}</small>` : ""}</span>
      ${e.right ? `<span class="dfs-tag ${e.cls || ""}">${esc(e.right)}</span>` : ""}
      <span class="dfs-go" aria-hidden="true">↵</span>
    </a>`;

  function render() {
    if (!INDEX) return;
    const q = fold(input.value).trim();
    const terms = q.split(/\s+/).filter(Boolean);
    const groups = [];
    const pick = (type) => filter === "all" || filter === type || (filter === "team" && type === "page");
    if (!terms.length) {
      /* nothing typed: what's next, then every team */
      const soon = INDEX.filter((e) => e.type === "game" && e.cls === "up" && pick("game")).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);
      const teams = INDEX.filter((e) => e.type === "team" && pick(e.type));
      const people = filter === "athlete" ? INDEX.filter((e) => e.type === "athlete" && e.right === "Captain").slice(0, 30) : [];
      if (soon.length) groups.push(["Coming up", soon]);
      if (people.length) groups.push(["Captains", people]);
      if (teams.length && filter !== "game") groups.push(["Teams", teams]);
    } else {
      const hits = INDEX.map((e) => [e, pick(e.type) ? score(e, terms) : 0]).filter(([, s]) => s > 0)
        .sort((a, b) => b[1] - a[1] || (a[0].date && b[0].date ? Math.abs(new Date(a[0].date) - Date.now()) - Math.abs(new Date(b[0].date) - Date.now()) : 0))
        .map(([e]) => e);
      const of = (types, n) => hits.filter((e) => types.includes(e.type)).slice(0, filter === "all" ? n : 40);
      const sets = [["Teams & pages", of(["team", "page"], 5)], ["Athletes", of(["athlete"], 8)], ["Games & meets", of(["game"], 8)]].filter(([, l]) => l.length);
      /* the group with the best match goes first */
      sets.sort((a, b) => hits.indexOf(a[1][0]) - hits.indexOf(b[1][0]));
      groups.push(...sets);
    }
    let i = 0;
    list.innerHTML = groups.length
      ? groups.map(([h, l]) => `<div class="dfs-group"><div class="dfs-h">${h}</div>${l.map((e) => row(e, terms, i++)).join("")}</div>`).join("")
      : `<div class="dfs-none"><b>No matches for “${esc(input.value.trim())}”</b>Try a last name, an opponent like <button type="button" data-try="Gloucester">Gloucester</button> or a sport like <button type="button" data-try="volleyball">volleyball</button>.</div>`;
    list.querySelectorAll("[data-try]").forEach((b) => b.addEventListener("click", () => { input.value = b.dataset.try; at = 0; render(); input.focus(); }));
    items = [...list.querySelectorAll(".dfs-item")];
    at = Math.min(at, Math.max(0, items.length - 1));
    highlight(false);
    list.scrollTop = 0;
  }

  async function open() {
    ui();
    if (!dlg.open) dlg.showModal();
    input.select();
    if (!INDEX) {
      const all = await Promise.all(SPORTS.map(([s]) => load(s)));
      INDEX = build(all);
      const n = (t) => INDEX.filter((e) => e.type === t).length;
      dlg.querySelector(".dfs-count").textContent = `${n("athlete")} athletes · ${n("game")} games · 7 sports`;
    }
    render();
  }
  function close() {
    if (!dlg?.open) return;
    dlg.close();
  }
  window.DFASearch = { open };

  /* ---------- Header button + keyboard shortcuts ---------- */
  function button() {
    const bar = document.querySelector(".site-header .hbar");
    if (!bar || bar.querySelector(".dfs-open")) return !!bar;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dfs-open";
    b.setAttribute("aria-label", "Search every team");
    b.title = "Search every team (⌘K)";
    b.innerHTML = `${ICON_SEARCH}<span>Search</span>`;
    b.addEventListener("click", open);
    bar.appendChild(b);
    return true;
  }
  if (!button()) addEventListener("DOMContentLoaded", button);
  document.addEventListener("click", (e) => { if (e.target.closest("[data-search]")) { e.preventDefault(); open(); } });
  addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey)) {
      e.preventDefault();
      dlg?.open ? close() : open();
    }
  });

  /* ---------- Styles ---------- */
  const css = document.createElement("style");
  css.textContent = `
    .site-header .hbar .nav { margin-left: auto; }
    .dfs-open { display: inline-flex; align-items: center; gap: 8px; flex: none; height: 40px; margin-left: 14px; padding: 0 14px 0 11px; border-radius: 4px;
      border: 1.5px solid rgba(255,255,255,.4); background: rgba(255,255,255,.1); color: #fff; font: 700 16px/1 var(--display); letter-spacing: .08em; text-transform: uppercase;
      transition: background .15s, border-color .15s, transform .15s; }
    .dfs-open:hover { background: rgba(255,255,255,.2); border-color: #fff; transform: translateY(-1px); }
    .dfs-open svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; }
    @media (max-width: 1240px) { .dfs-open { width: 40px; padding: 0; justify-content: center; } .dfs-open span { display: none; } }
    @media (max-width: 1080px) { .dfs-open { margin-left: auto; } }
    @media (max-width: 720px) { .site-header .hbar .nav-toggle { order: 3; margin-left: 10px; } .dfs-open { order: 2; } }
    @media (max-width: 420px) {
      .site-header .brand { gap: 10px; }
      .site-header .brand-text { font-size: 20px; white-space: nowrap; }
      .site-header .hbar .nav-toggle { margin-left: 8px; padding-left: 11px; padding-right: 11px; }
    }

    dialog.dfs { width: min(680px, calc(100vw - 24px)); max-width: none; max-height: none; margin: max(10vh, 24px) auto auto; padding: 0; border: 0; background: transparent; overflow: visible; color: #131a2b; }
    dialog.dfs::backdrop { background: radial-gradient(120% 80% at 50% 0%, rgba(24,71,159,.55), rgba(5,14,40,.86)); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
    dialog.dfs[open] .dfs-panel { animation: dfs-in .28s cubic-bezier(.2,.9,.25,1); }
    dialog.dfs[open]::backdrop { animation: dfs-fade .25s ease; }
    @keyframes dfs-in { from { opacity: 0; transform: translateY(-14px) scale(.97); } }
    @keyframes dfs-fade { from { opacity: 0; } }
    .dfs-panel { display: flex; flex-direction: column; max-height: min(640px, 80vh); background: #fff; border-radius: 4px; overflow: hidden;
      box-shadow: 0 0 0 1px rgba(255,255,255,.12), 0 30px 80px rgba(3,10,30,.55); }
    .dfs-bar { position: relative; display: flex; align-items: center; gap: 12px; padding: 16px 16px 16px 20px;
      background: linear-gradient(115deg, #0b1f4d, #18479f 70%, #2459c2); color: #fff; }
    .dfs-bar::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: linear-gradient(90deg, #f0b429, #ffd36b 50%, #f0b429); }
    .dfs-bar > svg { width: 24px; height: 24px; flex: none; fill: none; stroke: #f0b429; stroke-width: 2.6; stroke-linecap: round; }
    .dfs-bar input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: #fff; font: 700 26px/1.2 var(--display); letter-spacing: .02em; text-transform: uppercase; padding: 4px 0; }
    .dfs-bar input::placeholder { color: rgba(219,229,251,.62); }
    .dfs-bar input::-webkit-search-cancel-button { display: none; }
    .dfs-x { flex: none; border: 1.5px solid rgba(255,255,255,.4); background: transparent; color: #dbe5fb; border-radius: 4px; padding: 5px 9px 4px; font: 700 13px/1 var(--display); letter-spacing: .1em; text-transform: uppercase; }
    .dfs-x:hover { background: rgba(255,255,255,.15); color: #fff; }
    .dfs-tabs { display: flex; flex: none; gap: 6px; padding: 12px 16px 6px; overflow-x: auto; scrollbar-width: none; }
    .dfs-tabs button { flex: none; border: 1.5px solid #dfe4ee; background: #fff; color: #5b647a; border-radius: 4px; padding: 7px 14px 6px; font: 700 14px/1.1 var(--display); letter-spacing: .08em; text-transform: uppercase; transition: all .15s; }
    .dfs-tabs button:hover { border-color: #18479f; color: #18479f; }
    .dfs-tabs button[aria-selected="true"] { background: #18479f; border-color: #18479f; color: #fff; }
    .dfs-list { flex: 1; overflow-y: auto; overscroll-behavior: contain; padding: 4px 10px 12px; scroll-padding: 34px 0 8px; }
    .dfs-group { padding-top: 6px; }
    .dfs-h { position: sticky; top: 0; z-index: 1; padding: 8px 10px 6px; background: linear-gradient(#fff 75%, rgba(255,255,255,0)); font: 800 13px/1 var(--display); letter-spacing: .16em; text-transform: uppercase; color: #18479f; }
    .dfs-item { position: relative; display: grid; grid-template-columns: 42px 1fr auto 18px; align-items: center; gap: 12px; padding: 9px 10px; border-radius: 4px; color: inherit; text-decoration: none; }
    .dfs-item.on { background: #eef3fd; box-shadow: inset 3px 0 0 #18479f; }
    .dfs-ic { width: 42px; height: 42px; border-radius: 4px; display: grid; place-items: center; background: linear-gradient(135deg, #0b1f4d, #18479f); color: #fff; }
    .dfs-item.athlete .dfs-ic { border-radius: 50%; }
    .dfs-item.page .dfs-ic { background: #eef3fd; color: #18479f; }
    .dfs-ic svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 4.2; stroke-linecap: round; stroke-linejoin: round; }
    .dfs-txt { min-width: 0; display: grid; }
    .dfs-txt b { font: 700 20px/1.1 var(--display); text-transform: uppercase; letter-spacing: .01em; color: #0b1f4d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .dfs-txt small { font-size: 13.5px; color: #5b647a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .dfs-txt mark { background: linear-gradient(transparent 55%, rgba(240,180,41,.55) 55%); color: inherit; padding: 0 1px; }
    .dfs-tag { font: 800 13px/1 var(--display); letter-spacing: .08em; text-transform: uppercase; padding: 5px 8px 4px; border-radius: 5px; background: #f3f5f9; color: #5b647a; white-space: nowrap; }
    .dfs-tag.W { background: #1a8a4a; color: #fff; } .dfs-tag.L { background: #c8322b; color: #fff; } .dfs-tag.T { background: #5b647a; color: #fff; }
    .dfs-tag.up { background: #f0b429; color: #0b1f4d; } .dfs-tag.done { background: #18479f; color: #fff; }
    .dfs-go { color: #18479f; font-weight: 700; opacity: 0; transform: translateX(-4px); transition: all .15s; }
    .dfs-item.on .dfs-go { opacity: 1; transform: none; }
    .dfs-none { padding: 34px 18px 30px; text-align: center; color: #5b647a; font-size: 15px; }
    .dfs-none b { display: block; margin-bottom: 6px; font: 800 24px/1.1 var(--display); text-transform: uppercase; color: #0b1f4d; }
    .dfs-none button { border: 0; background: #eef3fd; color: #18479f; font-weight: 700; border-radius: 4px; padding: 1px 6px; }
    .dfs-wait { display: flex; justify-content: center; gap: 8px; padding: 40px 0; }
    .dfs-wait i { width: 10px; height: 10px; border-radius: 50%; background: #18479f; animation: dfs-dot 1s ease-in-out infinite; }
    .dfs-wait i:nth-child(2) { animation-delay: .15s; } .dfs-wait i:nth-child(3) { animation-delay: .3s; }
    @keyframes dfs-dot { 50% { transform: translateY(-8px); opacity: .4; } }
    .dfs-foot { display: flex; justify-content: space-between; gap: 12px; padding: 10px 18px; border-top: 1px solid #dfe4ee; background: #f8f9fc; font-size: 12.5px; color: #5b647a; }
    .dfs-foot kbd { display: inline-block; min-width: 20px; margin-right: 3px; padding: 1px 5px; border: 1px solid #dfe4ee; border-bottom-width: 2px; border-radius: 4px; background: #fff; font: 600 11.5px/1.4 var(--body); text-align: center; color: #131a2b; }
    @media (max-width: 640px) {
      dialog.dfs { width: 100vw; height: 100dvh; margin: 0; }
      .dfs-panel { height: 100dvh; max-height: none; border-radius: 0; }
      .dfs-bar { padding-top: max(16px, env(safe-area-inset-top)); }
      .dfs-bar input { font-size: 22px; }
      .dfs-foot span:first-child { display: none; }
      .dfs-item { grid-template-columns: 38px 1fr auto; gap: 10px; }
      .dfs-ic { width: 38px; height: 38px; }
      .dfs-go { display: none; }
      .dfs-txt b { font-size: 18px; }
    }
    @media (prefers-reduced-motion: reduce) { dialog.dfs[open] .dfs-panel, dialog.dfs[open]::backdrop, .dfs-wait i { animation: none; } }`;
  document.head.appendChild(css);
})();
