/* =====================================================================
   TRACK LAB — interactive extras for the indoor track site (lab.html)
   Everything here is drawn from official results:
     · LAB_RACES / LAB_DUALS / LAB_MAP / LAB_VENUES from js/labdata.js
       (Lancer Timing's NEC meet results and the MIAA's state meet results)
     · TEAMS from js/data.js, archive.js, results.js and athletes.js
       (every Danvers result on the site)
   Features: Race Replay, Lap Splits, Beat the Falcon, Life-size Marks,
   Then vs Now, Pace Calculator, Dual Meet Scoring, PR Wall, Where the
   Points Come From, Meet Map.
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";
  const store = {
    get(k, d) { try { const v = localStorage.getItem("dfa-lab-" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("dfa-lab-" + k, JSON.stringify(v)); } catch (e) { /* storage blocked: fine */ } }
  };
  const S = (tag, attrs = {}, parent) => {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) if (attrs[k] != null) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const MONTHS = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  const isoDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const dateText = (d) => `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  const parseDate = (s) => { const m = String(s || "").match(/([A-Z][a-z]{2})[a-z]*\.? (\d{1,2}), (\d{4})/); return m ? new Date(+m[3], MON[m[1]], +m[2]) : null; };
  const ord = (n) => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
  const VENUE = Object.fromEntries(LAB_VENUES.map((v) => [v.key, v]));

  /* ---------- marks ---------- */
  const FIELD = new Set(["High jump", "Long jump", "Shot put", "Triple jump", "Pole vault"]);
  const toSec = (m) => {
    const s = String(m ?? "").trim();
    if (!/^\d+(:\d{2}){0,2}(\.\d+)?$/.test(s)) return null;
    return s.split(":").map(Number).reduce((a, x) => a * 60 + x, 0);
  };
  const toInches = (m) => {
    const s = String(m ?? "").trim().replace("½", ".5").replace("¼", ".25").replace("¾", ".75");
    const mm = s.match(/^(\d+)-(\d+(?:\.\d+)?)$/);
    return mm ? +mm[1] * 12 + +mm[2] : null;
  };
  const markVal = (ev, m) => (FIELD.has(ev) ? toInches(m) : toSec(m));
  const isBetter = (ev, a, b) => (FIELD.has(ev) ? a > b : a < b);
  const fmtT = (s, d = 2) => {
    if (s == null || !isFinite(s)) return "—";
    const m = Math.floor(s / 60), r = s - m * 60;
    return m ? `${m}:${r.toFixed(d).padStart(d ? 3 + d : 2, "0")}` : r.toFixed(d);
  };
  const fmtFt = (inch) => { const f = Math.floor(inch / 12), i = Math.round((inch - f * 12) * 4) / 4; return `${f} ft ${i % 1 ? i : Math.round(i)} in`; };
  const ftIn = (inch) => fmtFt(inch).replace(/^0 ft /, "");           // "9.5 in" rather than "0 ft 9.5 in"
  const EVENT_ORDER = ["55 meters", "55 hurdles", "300 meters", "600 meters", "1000 meters", "Mile", "Two-mile", "4x200 relay", "4x400 relay", "4x800 relay", "High jump", "Long jump", "Shot put"];
  const evSort = (a, b) => (EVENT_ORDER.indexOf(a) + 1 || 99) - (EVENT_ORDER.indexOf(b) + 1 || 99);

  /* ---------- every Danvers result on the site, as performances ---------- */
  const PERF = { boys: [], girls: [] };
  const SEASONS = { boys: [], girls: [] };
  for (const g of ["boys", "girls"]) {
    for (const p of TEAMS[g].past || []) {
      if ((p.results || []).length && !SEASONS[g].includes(p.season)) SEASONS[g].push(p.season);
      for (const m of p.results || []) {
        for (const [ev, who, place, mark] of m.rows) {
          const v = markVal(ev, mark);
          PERF[g].push({ g, season: p.season, meet: m.meet.replace(/ · .*/, ""), date: parseDate(m.date), dateText: m.date, ev, who, place, mark, v,
                         relay: /relay/i.test(ev), prelim: /prelim/i.test(place), team: m.team || "" });
        }
      }
    }
    SEASONS[g].sort();
  }
  const records = (g) => Object.values(TEAMS[g].records || {})[0] || {};

  /* ---------- Boys / Girls, for the whole page ---------- */
  let G = store.get("g", "boys");
  if (!TEAMS[G]) G = "boys";
  const subs = [];
  const onGender = (fn) => { subs.push(fn); };
  function setGender(g) {
    G = g; store.set("g", g);
    $$(".lab-g button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.g === g)));
    subs.forEach((fn) => fn(g));
  }
  $$(".lab-g button").forEach((b) => b.addEventListener("click", () => setGender(b.dataset.g)));
  $$(".lab-g button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.g === G)));

  /* run a section's animation the first time it comes into view */
  const onView = (el, fn, margin = "0px 0px -15% 0px") => {
    if (!("IntersectionObserver" in window)) { fn(); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); fn(); } }, { rootMargin: margin });
    io.observe(el);
  };

  /* =====================================================================
     THE TRACK: a 200-meter indoor oval, drawn in meters
     lane 1's measured line has a 17.5 m radius, so each straight is 45 m.
     s = meters run since the finish line, counterclockwise as races are run.
     ===================================================================== */
  const TR = { r: 17.5, lanes: 6, lw: 1.0 };
  TR.L = (200 - 2 * Math.PI * TR.r) / 2;
  const ovalPt = (s, rr) => {
    const { r, L } = TR, a = Math.PI * r;
    s = ((s % 200) + 200) % 200;
    if (s < a) { const f = s / r; return [L / 2 + rr * Math.sin(f), rr * Math.cos(f)]; }
    s -= a; if (s < L) return [L / 2 - s, -rr];
    s -= L; if (s < a) { const f = s / r; return [-L / 2 - rr * Math.sin(f), -rr * Math.cos(f)]; }
    s -= a; return [-L / 2 + s, rr];
  };
  const stadium = (R) => { const h = TR.L / 2; return `M${-h},${R}L${h},${R}A${R},${R} 0 0 0 ${h},${-R}L${-h},${-R}A${R},${R} 0 0 0 ${-h},${R}Z`; };
  function drawOval(svg, { label = "DANVERS" } = {}) {
    const inner = TR.r - .35, outer = inner + TR.lanes * TR.lw;
    svg.setAttribute("viewBox", `${-(TR.L / 2 + outer + 2)} ${-(outer + 2)} ${TR.L + 2 * (outer + 2)} ${2 * (outer + 2)}`);
    const defs = S("defs", {}, svg);
    const pat = S("pattern", { id: svg.id + "-chk", width: .6, height: .6, patternUnits: "userSpaceOnUse" }, defs);
    S("rect", { width: .6, height: .6, fill: "#fff" }, pat); S("rect", { width: .3, height: .3, fill: "#0b1f4d" }, pat); S("rect", { x: .3, y: .3, width: .3, height: .3, fill: "#0b1f4d" }, pat);
    S("path", { d: stadium(outer + .6), class: "tk-apron" }, svg);
    S("path", { d: stadium(outer), class: "tk-surface" }, svg);
    S("path", { d: stadium(inner), class: "tk-infield" }, svg);
    for (let i = 1; i < TR.lanes; i++) S("path", { d: stadium(inner + i * TR.lw), class: "tk-lane" }, svg);
    S("path", { d: stadium(inner), class: "tk-curb" }, svg);
    S("path", { d: stadium(outer), class: "tk-edge" }, svg);
    S("rect", { x: TR.L / 2 - .3, y: inner, width: .6, height: outer - inner, fill: `url(#${svg.id}-chk)`, class: "tk-finish" }, svg);
    const t = S("text", { x: 0, y: 1.6, class: "tk-word", "text-anchor": "middle" }, svg); t.textContent = label;
    const ft = S("text", { x: TR.L / 2, y: outer + 1.6, class: "tk-tag", "text-anchor": "middle" }, svg); ft.textContent = "FINISH";
    for (let i = 1; i <= TR.lanes; i++) {
      const n = S("text", { x: TR.L / 2 - 2.2, y: inner + (i - .5) * TR.lw + .32, class: "tk-ln", "text-anchor": "middle" }, svg); n.textContent = i;
    }
    return { runners: S("g", { class: "tk-runners" }, svg) };
  }
  /* the straightaway, for the 55 meters and the hurdles */
  const STR = { start: 4, len: 55, lw: 1.22 };
  function drawStraight(svg, lanes, hurdles, lw = STR.lw) {
    const H = lanes * lw;
    svg.setAttribute("viewBox", `0 ${-1.6} ${STR.start + STR.len + 6} ${H + 3.4}`);
    const defs = S("defs", {}, svg);
    const pat = S("pattern", { id: svg.id + "-chk", width: .4, height: .4, patternUnits: "userSpaceOnUse" }, defs);
    S("rect", { width: .4, height: .4, fill: "#fff" }, pat); S("rect", { width: .2, height: .2, fill: "#0b1f4d" }, pat); S("rect", { x: .2, y: .2, width: .2, height: .2, fill: "#0b1f4d" }, pat);
    S("rect", { x: 0, y: -.4, width: STR.start + STR.len + 6, height: H + .8, class: "tk-apron" }, svg);
    S("rect", { x: 0, y: 0, width: STR.start + STR.len + 6, height: H, class: "tk-surface" }, svg);
    for (let i = 0; i <= lanes; i++) S("line", { x1: 0, x2: STR.start + STR.len + 6, y1: i * lw, y2: i * lw, class: "tk-lane" }, svg);
    S("line", { x1: STR.start, x2: STR.start, y1: 0, y2: H, class: "tk-start" }, svg);
    S("rect", { x: STR.start + STR.len - .2, y: 0, width: .4, height: H, fill: `url(#${svg.id}-chk)` }, svg);
    for (let m = 10; m < 55; m += 10) {
      const t = S("text", { x: STR.start + m, y: H + 1.15, class: "tk-tag", "text-anchor": "middle" }, svg); t.textContent = m + "m";
    }
    const f = S("text", { x: STR.start + STR.len, y: -.7, class: "tk-tag", "text-anchor": "middle" }, svg); f.textContent = "FINISH";
    if (hurdles) {
      const [first, gap] = hurdles === "boys" ? [13.72, 9.14] : [13, 8.5];
      for (let k = 0; k < 5; k++) for (let i = 0; i < lanes; i++) {
        const x = STR.start + first + k * gap;
        S("line", { x1: x, x2: x, y1: i * lw + .18, y2: (i + 1) * lw - .18, class: "tk-hurdle" }, svg);
      }
    }
    for (let i = 1; i <= lanes; i++) { const n = S("text", { x: 1.6, y: (i - .5) * lw + .3, class: "tk-ln", "text-anchor": "middle" }, svg); n.textContent = i; }
    return { runners: S("g", { class: "tk-runners" }, svg) };
  }

  /* how far a runner has gone t seconds into the race: from the lap splits when the timers recorded them; otherwise a
     standard sprint start (55 m to 300 m) or a short pickup to an even pace (600 m and up), set so they finish on their time */
  function motion(e, D) {
    const T = e.t;
    if (T == null) return null;
    const after = (t) => D + Math.min(7, (t - T) * 3.2);
    if (e.sp && e.sp.length) {
      const pts = [[0, 0], ...e.sp];
      return (t) => {
        if (t <= 0) return 0;
        for (let i = 1; i < pts.length; i++) {
          if (t <= pts[i][0]) { const [t0, d0] = pts[i - 1], [t1, d1] = pts[i]; return d0 + (d1 - d0) * (t - t0) / (t1 - t0); }
        }
        return after(t);
      };
    }
    const tau = D <= 60 ? .85 : D <= 300 ? 1.1 : 1.6;
    const vmax = D / (T - tau * (1 - Math.exp(-T / tau)));
    return (t) => (t <= 0 ? 0 : t < T ? vmax * (t - tau * (1 - Math.exp(-t / tau))) : after(t));
  }
  const shortSchool = (s) => s.replace(/ Vet\. Mem\.| Memorial| Regional| Senior| High School/g, "").replace(/\s+/g, " ").trim();
  const lastName = (n) => { const p = n.split(" "); return p.length > 1 ? p.slice(1).join(" ") : n; };

  /* a race on a drawn track. setRace(race) then frame(t) */
  function RaceView(svg, { labels = true } = {}) {
    let race = null, R = [], kind = "oval";
    function setRace(r) {
      race = r;
      while (svg.firstChild) svg.firstChild.remove();
      const runnable = r.entries.filter((e) => e.t != null);
      kind = r.dist <= 55 ? "straight" : "oval";
      const lanes = Math.max(4, Math.min(8, runnable.length));
      const g = kind === "straight" ? drawStraight(svg, lanes, /hurdles/.test(r.event) ? r.gender : null).runners : drawOval(svg).runners;
      svg.classList.toggle("straight", kind === "straight");
      /* lanes on the straight: fastest in the middle, like a seeded heat (the real lane draw isn't in the results) */
      const middle = [4, 5, 3, 6, 2, 7, 1, 8].filter((x) => x <= lanes);
      R = runnable.map((e, i) => {
        const grp = S("g", { class: "tk-r" + (e.dv ? " dv" : "") + (i === 0 ? " win" : "") }, g);
        S("circle", { r: kind === "straight" ? .42 : .95, class: "tk-dot" }, grp);
        let label = null;
        if (labels && e.dv) {
          label = S("text", { class: "tk-name", "text-anchor": "middle", y: kind === "straight" ? -.62 : -1.45 }, grp);
          label.textContent = e.legs ? "DANVERS" : lastName(e.n).toUpperCase();
        }
        return { e, f: motion(e, r.dist), grp, idx: i, lane: middle[i % middle.length], rr: TR.r + .35 + (i % 6) * .92, d: 0 };
      });
      R.sort((a, b) => (a.e.dv ? 1 : 0) - (b.e.dv ? 1 : 0)).forEach((x) => g.appendChild(x.grp));   // Falcons on top
      return { kind, end: Math.max(...runnable.map((e) => e.t), 1) };
    }
    function frame(t) {
      if (!race) return [];
      for (const x of R) x.d = x.f(t);
      if (kind === "straight") {
        for (const x of R) {
          const px = STR.start + clamp(x.d, 0, STR.len + 6), py = (x.lane - .5) * STR.lw;
          x.grp.setAttribute("transform", `translate(${px.toFixed(3)},${py.toFixed(3)})`);
        }
      } else {
        /* the start: a waterfall line across the lanes (two rows for a big field), folding in over the first few meters.
           after that, packs: a runner moves out a lane when someone is right beside them */
        const order = [...R].sort((a, b) => b.d - a.d), placed = [];
        for (const x of order) {
          const fold = clamp(1 - x.d / 6, 0, 1);
          let slot = 0;
          while (placed.some((p) => p.slot === slot && Math.abs(p.d - x.d) < 1.7) && slot < 5) slot++;
          placed.push({ slot, d: x.d });
          const target = TR.r + .35 + (fold > 0 ? (x.idx % 6) * fold + slot * (1 - fold) : slot) * .92;
          x.rr += (target - x.rr) * (fold > 0 ? 1 : .25);
          const back = fold * Math.floor(x.idx / 6) * 1.8;
          const [px, py] = ovalPt(-(race.dist - Math.min(x.d, race.dist + 7)) - back, x.rr);
          x.grp.setAttribute("transform", `translate(${px.toFixed(3)},${py.toFixed(3)})`);
        }
      }
      return R;
    }
    return { setRace, frame, get race() { return race; } };
  }

  const raceTitle = (r) => `${r.gender === "boys" ? "Boys" : "Girls"} ${r.event}${r.round === "Final" ? " final" : r.round === "Prelims" ? ` prelims, heat ${r.heat}` : r.heat ? `, heat ${r.heat}` : ""}`;
  const raceWhen = (r) => `${r.meet} · ${dateText(isoDate(r.date))}`;
  const hasSplits = (r) => r.entries.some((e) => e.sp && e.sp.length);
  const falcons = (r) => r.entries.filter((e) => e.dv).map((e) => (e.legs ? "Danvers relay" : e.n));

  /* ---------- the hero: a real race on loop ---------- */
  (function hero() {
    const svg = $("#hero-track");
    if (!svg) return;
    const r = LAB_RACES.find((x) => x.date === "2023-01-22" && x.gender === "boys" && x.event === "Two-mile") || LAB_RACES.find(hasSplits);
    const view = RaceView(svg, { labels: true });
    const { end } = view.setRace(r);
    const cap = $("#hero-cap");
    if (cap) cap.innerHTML = `<b>Now replaying</b> ${esc(raceTitle(r))} · ${esc(raceWhen(r))}${hasSplits(r) ? " · from the official lap splits" : ""}`;
    const nums = $("#hero-nums");
    if (nums) {
      const runners = LAB_RACES.reduce((a, x) => a + x.entries.length, 0), split = LAB_RACES.reduce((a, x) => a + x.entries.filter((e) => e.sp).length, 0);
      nums.innerHTML = [[LAB_RACES.length, "races to replay"], [runners, "runners"], [split, "with every lap timed"], [10, "ways to explore"]]
        .map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("");
    }
    if (REDUCED) { view.frame(end * .62); return; }
    const SPEED = end / 22;               // the whole race in about 22 seconds
    let t0 = null, visible = true;
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(svg);
    const tick = (now) => {
      if (t0 == null) t0 = now;
      const t = ((now - t0) / 1000 * SPEED) % (end + 8) - 2;
      if (visible && !document.hidden) view.frame(t);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  })();

  /* =====================================================================
     1 · RACE REPLAY
     ===================================================================== */
  const replay = (function () {
    const sec = $("#replay");
    if (!sec) return null;
    const svg = $("#replay-track"), sel = $("#replay-pick"), board = $("#replay-board"), clock = $("#replay-clock"), lapEl = $("#replay-lap");
    const scrub = $("#replay-scrub"), playBtn = $("#replay-play"), speeds = $("#replay-speed"), note = $("#replay-note"), title = $("#replay-title");
    const view = RaceView(svg);
    let race = null, end = 1, t = -1, playing = false, speed = 1, last = null, raf = 0, lastBoard = 0, onChange = [];
    const SPEEDS = [.25, .5, 1, 2, 5, 10, 20, 40];
    speeds.innerHTML = SPEEDS.map((s) => `<button type="button" class="chip" data-s="${s}" aria-pressed="false">${s < 1 ? (s === .5 ? "½" : "¼") : s}×</button>`).join("");
    const setSpeed = (s) => { speed = s; $$("button", speeds).forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.s === s))); };
    speeds.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setSpeed(+b.dataset.s); });
    /* featured races */
    const FEATURED = [
      ["Sean Moore wins the Division 4 two-mile", (r) => r.date === "2024-02-18" && r.event === "Two-mile" && r.entries.some((e) => e.n === "Sean Moore")],
      ["Moore and Conklin: an NEC two-mile, every lap timed", (r) => r.date === "2023-01-22" && r.gender === "boys" && r.event === "Two-mile"],
      ["Zachary Dunn, 2nd in the Division 4 55-meter final", (r) => r.date === "2026-02-13" && r.event === "55 meters" && r.round === "Final"],
      ["Tess Ryan, 3rd in the Division 4 55-meter final", (r) => r.date === "2026-02-14" && r.event === "55 meters" && r.round === "Final"],
      ["Grace Conklin, 6th in the Division 4 two-mile", (r) => r.date === "2026-02-14" && r.event === "Two-mile" && r.entries.some((e) => e.n === "Grace Conklin")],
      ["Emma Eagan's NEC two-mile, every lap timed", (r) => r.date === "2023-01-22" && r.gender === "girls" && r.event === "Two-mile"]
    ].map(([label, test]) => [label, LAB_RACES.find(test)]).filter(([, r]) => r);
    $("#replay-featured").innerHTML = FEATURED.map(([label, r]) => `<button type="button" class="lab-feat" data-id="${r.id}"><span>${r.gender === "boys" ? "Boys" : "Girls"} · ${esc(String(isoDate(r.date).getFullYear()))}</span>${esc(label)}</button>`).join("");
    $("#replay-featured").addEventListener("click", (e) => {
      const b = e.target.closest(".lab-feat"); if (!b) return;
      const r = LAB_RACES[+b.dataset.id];
      if (r.gender !== G) setGender(r.gender);
      load(r, true);
    });
    function fillPicker() {
      const groups = {};
      for (const r of LAB_RACES) if (r.gender === G) (groups[r.date + "|" + r.meet] = groups[r.date + "|" + r.meet] || []).push(r);
      sel.innerHTML = Object.keys(groups).sort().reverse().map((k) => {
        const [d, m] = k.split("|");
        return `<optgroup label="${esc(m)} · ${esc(dateText(isoDate(d)))}">${groups[k].map((r) => `<option value="${r.id}">${esc(raceTitle(r).replace(/^(Boys|Girls) /, ""))} — ${esc(falcons(r).map(lastName).join(", "))}${hasSplits(r) ? " · lap splits" : ""}</option>`).join("")}</optgroup>`;
      }).join("");
    }
    sel.addEventListener("change", () => load(LAB_RACES[+sel.value], true));
    function load(r, autoplay) {
      race = r; sel.value = String(r.id);
      ({ end } = view.setRace(r));
      end += 1.2;
      scrub.max = String(end); scrub.step = "0.01";
      const auto = SPEEDS.find((s) => r.entries[0].t / s <= 24) || 40;
      setSpeed(r.dist <= 60 ? .5 : auto);
      title.innerHTML = `<span class="lab-kicker">${esc(raceWhen(r))} · ${esc(VENUE[r.venue] ? VENUE[r.venue].name : "")}</span>${esc(raceTitle(r))}`;
      const sp = hasSplits(r);
      note.textContent = (sp ? "Every runner's position comes from their official 200-meter splits." :
        r.dist <= 300 ? "These results have finishing times only, so each runner moves on a standard sprint start set to finish on their time." :
          "These results have finishing times only, so each runner moves at an even pace set to finish on their time.") +
        (r.dist <= 55 ? " Lanes are drawn by finish, fastest in the middle; the real lane draw isn't in the results." : " Everyone is drawn in the inside lanes.") +
        ` Results: ${r.src === "lancer" ? "Lancer Timing" : "the MIAA"}.`;
      t = -.6; playing = !!autoplay && !REDUCED;
      if (REDUCED) t = end;
      draw(true);
      playBtn.textContent = playing ? "Pause" : "Play";
      if (playing) start();
      onChange.forEach((fn) => fn(r));
    }
    function start() { cancelAnimationFrame(raf); last = null; raf = requestAnimationFrame(step); }
    function step(now) {
      if (!playing) return;
      if (last != null) t += (now - last) / 1000 * speed;
      last = now;
      if (t >= end) { t = end; playing = false; playBtn.textContent = "Replay"; }
      draw(false);
      if (playing) raf = requestAnimationFrame(step);
    }
    function draw(force) {
      const R = view.frame(t);
      scrub.value = String(Math.max(0, t));
      const leader = Math.max(...R.map((x) => x.d), 0);
      const lastT = Math.max(...race.entries.filter((e) => e.t != null).map((e) => e.t));
      clock.textContent = fmtT(clamp(t, 0, lastT), t >= lastT ? 2 : 1);
      if (race.dist > 300) {
        /* the lap counter: the mile and two-mile start behind the line, so their first partial lap doesn't count */
        const left = Math.max(0, race.dist - leader), extra = race.dist % 200;
        const laps = left > extra ? Math.ceil((left - extra) / 200 - 1e-6) : 0;
        lapEl.textContent = left <= 0 ? "Finished" : laps <= 1 ? "Bell lap" : `${laps} laps to go`;
      } else lapEl.textContent = t < 0 ? "On your marks" : leader >= race.dist ? "Finished" : `${Math.round(leader)} m`;
      const now = performance.now();
      if (!force && now - lastBoard < 140) return;
      lastBoard = now;
      const done = (x) => x.d >= race.dist;
      const order = [...R].sort((a, b) => (done(b) - done(a)) || (done(a) ? a.e.t - b.e.t : b.d - a.d));
      const dnf = race.entries.filter((e) => e.t == null);
      board.innerHTML = order.map((x, i) => `<li class="${x.e.dv ? "dv" : ""}${done(x) ? " done" : ""}">
          <span class="bp">${i + 1}</span>
          <span class="bn">${esc(x.e.legs ? `${shortSchool(x.e.s)} relay` : x.e.n)}<small>${esc(x.e.legs ? x.e.legs.map(lastName).join(" · ") : shortSchool(x.e.s))}</small></span>
          <span class="bt">${done(x) ? esc(x.e.m) : t <= 0 ? "" : i === 0 ? "Leader" : `−${Math.max(0, leader - x.d).toFixed(0)} m`}</span></li>`).join("") +
        dnf.map((e) => `<li class="${e.dv ? "dv" : ""} out"><span class="bp">—</span><span class="bn">${esc(e.legs ? `${shortSchool(e.s)} relay` : e.n)}<small>${esc(shortSchool(e.s))}</small></span><span class="bt">${esc(e.m)}</span></li>`).join("");
    }
    playBtn.addEventListener("click", () => {
      if (!playing && t >= end) t = -.6;
      playing = !playing; playBtn.textContent = playing ? "Pause" : "Play";
      if (playing) start();
    });
    $("#replay-restart").addEventListener("click", () => { t = -.6; playing = true; playBtn.textContent = "Pause"; start(); });
    scrub.addEventListener("input", () => { t = +scrub.value; draw(true); });
    onGender(() => { fillPicker(); const first = LAB_RACES.find((r) => r.gender === G && FEATURED.some(([, f]) => f === r)) || LAB_RACES.find((r) => r.gender === G); load(first, false); });
    fillPicker();
    load(FEATURED.find(([, r]) => r.gender === G)?.[1] || LAB_RACES.find((r) => r.gender === G), false);
    onView(sec, () => { if (!playing && t < 0 && !REDUCED) { playing = true; playBtn.textContent = "Pause"; start(); } });
    return { onRace: (fn) => { onChange.push(fn); if (race) fn(race); }, load };
  })();

  /* =====================================================================
     2 · LAP SPLITS
     ===================================================================== */
  (function splits() {
    const sec = $("#splits");
    if (!sec || !replay) return;
    const box = $("#splits-chart"), table = $("#splits-table"), head = $("#splits-head"), pick = $("#splits-pick");
    const lapsOf = (e) => {
      const pts = [[0, 0], ...e.sp];
      return pts.slice(1).map(([t1, d1], i) => { const [t0, d0] = pts[i]; return { t: t1 - t0, d: d1 - d0, per200: (t1 - t0) * 200 / (d1 - d0), at: d1 }; });
    };
    let shown = null;
    function render(r) {
      /* a race without splits in the replay: show the closest race that has them */
      let lead = "";
      if (!hasSplits(r)) {
        const alt = LAB_RACES.filter((x) => x.gender === r.gender && hasSplits(x));
        const keep = shown && shown.gender === r.gender && hasSplits(shown) ? shown : null;
        const pickR = keep || alt.find((x) => x.event === r.event && x.entries.some((e) => e.dv && r.entries.some((y) => y.dv && y.n === e.n))) || alt.find((x) => x.event === r.event) || alt.find((x) => x.event === "Two-mile") || alt[0];
        if (!pickR) { head.textContent = "No lap splits on file."; box.innerHTML = ""; table.innerHTML = ""; pick.hidden = true; return; }
        lead = `The race in the replay (${esc(raceTitle(r).replace(/^(Boys|Girls) /, "").toLowerCase())}) has no lap splits in the results, so this is `;
        r = pickR;
      }
      shown = r;
      const withSp = r.entries.filter((e) => e.sp && e.sp.length && e.t != null);
      pick.hidden = false;
      pick.innerHTML = `<span class="sp-pick-l">Races with lap splits:</span>` + LAB_RACES.filter((x) => x.gender === r.gender && hasSplits(x)).map((x) => `<button type="button" class="chip" data-id="${x.id}" aria-pressed="${x === r}">${esc(raceTitle(x).replace(/^(Boys|Girls) /, ""))} · ${esc(isoDate(x.date).getFullYear())} <small>${esc(falcons(x).map(lastName).join(", "))}</small></button>`).join("");
      head.innerHTML = `${lead}<b>${esc(raceTitle(r))}</b> · ${esc(raceWhen(r))}. Each line is a runner's pace for every lap, as seconds per 200 meters; lower is faster. <span class="lg"><i class="k-dv"></i>Danvers <i class="k-win"></i>Winner <i class="k-oth"></i>Everyone else</span>`;
      const all = withSp.map((e) => ({ e, laps: lapsOf(e) }));
      const n = Math.max(...all.map((a) => a.laps.length));
      const vals = all.flatMap((a) => a.laps.map((l) => l.per200));
      /* the scale fits the Falcons and the winner; anyone slower runs off the bottom of the chart (clipped, not squashed) */
      const key = all.filter((a) => a.e.dv || a.e.t === Math.min(...all.map((b) => b.e.t))).flatMap((a) => a.laps.map((l) => l.per200));
      const lo = Math.floor(Math.min(...vals) - 1);
      const hi = Math.min(Math.ceil(Math.max(...vals) + 1), Math.max(lo + 10, Math.ceil(Math.max(...key) + 3)));
      const off = vals.some((v) => v > hi);
      const W = 720, H = 300, P = { l: 46, r: 16, t: 14, b: 34 };
      const x = (i) => P.l + (n === 1 ? .5 : i / (n - 1)) * (W - P.l - P.r);
      const y = (v) => P.t + (v - lo) / (hi - lo) * (H - P.t - P.b);
      const svg = S("svg", { viewBox: `0 0 ${W} ${H}`, class: "sp-svg", role: "img", "aria-label": "Lap-by-lap pace chart" });
      const cid = "sp-clip-" + r.id;
      S("rect", { x: P.l - 6, y: 0, width: W - P.l - P.r + 12, height: H - P.b + 4 }, S("clipPath", { id: cid }, S("defs", {}, svg)));
      if (off) head.insertAdjacentHTML("beforeend", ` Slower laps run off the bottom of the chart.`);
      for (let v = Math.ceil(lo); v <= hi; v += (hi - lo > 16 ? 4 : 2)) {
        S("line", { x1: P.l, x2: W - P.r, y1: y(v), y2: y(v), class: "sp-grid" }, svg);
        const tx = S("text", { x: P.l - 8, y: y(v) + 4, "text-anchor": "end", class: "sp-ax" }, svg); tx.textContent = fmtT(v, 0) + "s";
      }
      for (let i = 0; i < n; i++) { const tx = S("text", { x: x(i), y: H - 12, "text-anchor": "middle", class: "sp-ax" }, svg); tx.textContent = i === n - 1 ? "Last lap" : `Lap ${i + 1}`; if (n > 9 && i % 2 && i !== n - 1) tx.textContent = ""; }
      const winner = all.reduce((a, b) => (b.e.t < a.e.t ? b : a));
      const order = [...all].sort((a, b) => (a.e.dv - b.e.dv) || (a === winner) - (b === winner));
      const tip = $("#splits-tip");
      for (const a of order) {
        const cls = a.e.dv ? "dv" : a === winner ? "win" : "oth";
        const offs = n - a.laps.length;        // a missing split: line the laps up from the finish
        const d = a.laps.map((l, i) => `${i ? "L" : "M"}${x(i + offs).toFixed(1)},${y(l.per200).toFixed(1)}`).join("");
        const p = S("path", { d, class: "sp-line " + cls, tabindex: "0", "clip-path": `url(#${cid})` }, svg);
        if (a.e.dv || a === winner) a.laps.forEach((l, i) => { if (l.per200 <= hi) S("circle", { cx: x(i + offs), cy: y(l.per200), r: 3.4, class: "sp-pt " + cls }, svg); });
        const show = () => { tip.hidden = false; tip.innerHTML = `<b>${esc(a.e.n)}</b> ${esc(shortSchool(a.e.s))} · ${esc(a.e.m)}<br>${a.laps.map((l) => fmtT(l.t)).join(" · ")}`; p.classList.add("hot"); };
        const hide = () => { tip.hidden = true; p.classList.remove("hot"); };
        p.addEventListener("pointerenter", show); p.addEventListener("pointerleave", hide); p.addEventListener("focus", show); p.addEventListener("blur", hide);
      }
      box.innerHTML = ""; box.appendChild(svg);
      /* the Falcons' laps, fastest lap starred, and how the two halves compare */
      const mine = all.filter((a) => a.e.dv);
      table.innerHTML = mine.length ? mine.map((a) => {
        /* fastest lap: of the full 200-meter laps (the mile's first split is 209 m, and a missing split makes a double lap) */
        const full = a.laps.map((l, i) => [l, i]).filter(([l]) => Math.abs(l.d - 200) < .6);
        const fast = (full.length ? full : a.laps.map((l, i) => [l, i])).reduce((b, [l, i]) => (b == null || l.per200 < a.laps[b].per200 ? i : b), null);
        const half = Math.floor(a.laps.length / 2), t1 = a.laps.slice(0, half).reduce((s, l) => s + l.t, 0), t2 = a.laps.slice(half).reduce((s, l) => s + l.t, 0);
        const d1 = a.laps.slice(0, half).reduce((s, l) => s + l.d, 0), d2 = a.laps.slice(half).reduce((s, l) => s + l.d, 0);
        const neg = t2 / d2 < t1 / d1;
        return `<div class="sp-card"><div class="sp-top"><b>${esc(a.e.n)}</b><span>${esc(a.e.m)} · ${a.e.p && a.e.p !== "--" ? esc(ord(+a.e.p)) + " in the event" : ""}</span></div>
          <ol class="sp-laps">${a.laps.map((l, i) => `<li class="${i === fast ? "fast" : ""}" title="${l.d.toFixed(0)} m"><small>${l.d > 205 && i ? `${Math.round(l.d / 200)} laps` : i === 0 && l.d > 200.5 ? `${l.d.toFixed(0)} m` : `Lap ${i + 1}`}</small>${fmtT(l.t)}</li>`).join("")}</ol>
          <p class="sp-sum">${halves(neg, t1, t2, d1, d2)} Fastest lap: <b>${fmtT(a.laps[fast].t)}</b>.</p></div>`;
      }).join("") : "";
    }
    function halves(neg, t1, t2, d1, d2) {
      const p1 = t1 / d1 * 200, p2 = t2 / d2 * 200;
      return neg ? `<b>Negative split:</b> faster in the second half (${p2.toFixed(1)}s per lap vs ${p1.toFixed(1)}s).` : `Second half ${(p2 - p1).toFixed(1)}s per lap slower than the first (${p1.toFixed(1)}s, then ${p2.toFixed(1)}s).`;
    }
    /* picking a race here loads it into the replay too, so the two always match */
    pick.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) replay.load(LAB_RACES[+b.dataset.id], true); });
    replay.onRace(render);
  })();

  /* =====================================================================
     3 · BEAT THE FALCON — a 55-meter tap race against a real Danvers time
     ===================================================================== */
  (function beat() {
    const sec = $("#beat");
    if (!sec) return;
    const svg = $("#beat-track"), opp = $("#beat-opp"), btn = $("#beat-tap"), go = $("#beat-go"), msg = $("#beat-msg"), out = $("#beat-out"), speedo = $("#beat-speed");
    let foe = null, state = "idle", tGo = 0, raf = 0, taps = [], v = 0, vTop = 0, d = 0, react = null, gunTimer = 0, myTime = null;
    let ghost = null, you = null, ghostF = null;
    const BLW = 3.2;          // two wide lanes, drawn bigger than a real 1.22 m lane so the race is easy to follow
    const final = (g) => LAB_RACES.find((r) => r.gender === g && r.event === "55 meters" && r.round === "Final");
    function setup() {
      const list = (records(G)["55 meters"] || []).slice(0, 5);
      opp.innerHTML = list.map(([n, m, w], i) => `<button type="button" class="chip" data-i="${i}" aria-pressed="${i === 0}">${esc(n)} <b>${esc(m)}</b></button>`).join("");
      foe = list[0] ? { n: list[0][0], m: list[0][1], w: list[0][2], t: toSec(list[0][1]) } : null;
      reset();
    }
    opp.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || state === "running" || state === "set") return;
      const [n, m, w] = records(G)["55 meters"][+b.dataset.i];
      foe = { n, m, w, t: toSec(m) };
      $$("button", opp).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      reset();
    });
    function reset() {
      cancelAnimationFrame(raf); clearTimeout(gunTimer);
      while (svg.firstChild) svg.firstChild.remove();
      const g = drawStraight(svg, 2, null, BLW).runners;
      ghost = S("g", { class: "tk-r dv ghost" }, g); S("circle", { r: .95, class: "tk-dot" }, ghost);
      const gl = S("text", { class: "tk-name", "text-anchor": "middle", y: .45 }, ghost); gl.textContent = foe ? lastName(foe.n).toUpperCase() : "FALCON";
      you = S("g", { class: "tk-r you" }, g); S("circle", { r: .95, class: "tk-dot" }, you);
      const yl = S("text", { class: "tk-name", "text-anchor": "middle", y: .45 }, you); yl.textContent = "YOU";
      ghostF = foe ? motion({ t: foe.t }, 55) : null;
      state = "idle"; d = 0; v = 0; vTop = 0; taps = []; react = null; myTime = null; lastT = 0;
      place(0);
      msg.innerHTML = foe ? `Race <b>${esc(foe.n)}</b>, who ran <b>${esc(foe.m)}</b> (${esc(foe.w)}). Press <b>Start</b>, wait for the gun, then tap as fast as you can.` : "No 55-meter times on file.";
      go.textContent = "Start"; go.disabled = !foe; btn.disabled = true; speedo.textContent = "0.0 m/s";
      out.hidden = true;
    }
    function place(tt) {
      const gd = ghostF ? ghostF(tt) : 0;
      ghost.setAttribute("transform", `translate(${(STR.start + clamp(gd, 0, 61)).toFixed(3)},${(.5 * BLW).toFixed(3)})`);
      you.setAttribute("transform", `translate(${(STR.start + clamp(d, 0, 61)).toFixed(3)},${(1.5 * BLW).toFixed(3)})`);
    }
    let audio = null;
    function bang() {
      try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        const len = audio.sampleRate * .35, buf = audio.createBuffer(1, len, audio.sampleRate), ch = buf.getChannelData(0);
        for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
        const src = audio.createBufferSource(), gain = audio.createGain(), f = audio.createBiquadFilter();
        f.type = "lowpass"; f.frequency.value = 2600; gain.gain.value = .55;
        src.buffer = buf; src.connect(f); f.connect(gain); gain.connect(audio.destination); src.start();
      } catch (e) { /* no sound: fine */ }
    }
    go.addEventListener("click", () => {
      if (state === "running" || state === "set") { reset(); return; }
      reset();
      state = "set"; go.textContent = "Reset"; btn.disabled = false;
      msg.innerHTML = "<b>On your marks…</b>";
      try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); audio.resume && audio.resume(); } catch (e) { /* fine */ }
      gunTimer = setTimeout(() => {
        msg.innerHTML = "<b>Set…</b>";
        gunTimer = setTimeout(() => {
          state = "running"; tGo = performance.now(); bang();
          msg.innerHTML = '<b class="go">GO!</b> Tap, tap, tap!';
          sec.classList.add("gun"); setTimeout(() => sec.classList.remove("gun"), 260);
          raf = requestAnimationFrame(run);
        }, 1100 + Math.random() * 1500);
      }, 1100);
      btn.focus({ preventScroll: true });
    });
    function tap() {
      const now = performance.now();
      if (state === "set") {
        clearTimeout(gunTimer); state = "done"; btn.disabled = true; go.textContent = "Try again";
        msg.innerHTML = "<b>False start!</b> You went before the gun. In a real race that's a disqualification.";
        return;
      }
      if (state !== "running") return;
      if (react == null) react = (now - tGo) / 1000;
      taps.push(now);
      btn.classList.remove("hit"); void btn.offsetWidth; btn.classList.add("hit");
    }
    let lastT = 0;
    function run(now) {
      const tt = (now - tGo) / 1000, dt = Math.min(.05, (now - (lastT || now)) / 1000);
      lastT = now;
      taps = taps.filter((x) => now - x < 600);
      const rate = taps.length / .6;                    // taps per second, over the last 0.6 s
      const target = Math.min(9.6, rate * .9);         // about 10 taps a second keeps pace with a 6.6 sprinter
      v += (target - v) * (1 - Math.exp(-dt / .25));
      d += v * dt; vTop = Math.max(vTop, v);
      speedo.textContent = `${v.toFixed(1)} m/s`;
      place(tt);
      if (d >= 55 && myTime == null) myTime = tt - (d - 55) / Math.max(v, .1);
      if (myTime != null && tt > Math.max(myTime, foe.t) + .6) return finish();
      if (tt > 30) { myTime = myTime ?? null; return finish(); }
      raf = requestAnimationFrame(run);
    }
    function finish() {
      state = "done"; btn.disabled = true; go.textContent = "Race again"; lastT = 0;
      if (myTime == null) { msg.innerHTML = "Time's up. Tap faster next time!"; return; }
      const best = store.get("beat-best-" + G, null);
      const pb = best == null || myTime < best;
      if (pb) store.set("beat-best-" + G, myTime);
      const gap = myTime - foe.t;
      const f = final(G);
      let where = "";
      if (f) {
        const times = f.entries.filter((e) => e.t).map((e) => e.t);
        const placeN = times.filter((x) => x < myTime).length + 1;
        where = `<li>In the ${esc(f.meet.replace("MIAA ", ""))} final (${esc(isoDate(f.date).getFullYear())}) you'd have been <b>${placeN > times.length ? "last" : ord(placeN)}</b>.</li>`;
      }
      msg.innerHTML = gap < 0 ? `<b>You beat ${esc(foe.n)}!</b> ${fmtT(myTime)} to ${esc(foe.m)}.` : `<b>${esc(foe.n)} wins</b> by ${gap.toFixed(2)} s. You ran ${fmtT(myTime)}.`;
      out.hidden = false;
      out.innerHTML = `<ul class="beat-stats">
        <li>Your time: <b>${fmtT(myTime)}</b>${pb ? ' <span class="pb">Best yet</span>' : best != null ? ` · your best ${fmtT(best)}` : ""}</li>
        <li>Reaction to the gun: <b>${react != null ? react.toFixed(3) : "—"} s</b>${react != null && react < .1 ? " (that's faster than a legal start allows!)" : ""}</li>
        <li>Your top speed: <b>${vTop.toFixed(1)} m/s</b>; ${esc(foe.n)} averaged <b>${(55 / foe.t).toFixed(2)} m/s</b>.</li>
        ${where}</ul>`;
    }
    btn.addEventListener("pointerdown", (e) => { e.preventDefault(); tap(); });
    btn.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") e.preventDefault(); });
    document.addEventListener("keydown", (e) => {
      if (e.repeat || (state !== "set" && state !== "running")) return;
      if (e.key === " " || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); tap(); }
    });
    onGender(setup);
    setup();
  })();

  /* =====================================================================
     4 · LIFE-SIZE MARKS
     ===================================================================== */
  (function lifesize() {
    const sec = $("#lifesize");
    if (!sec) return;
    const box = $("#life-scenes");
    function scene(ev, rec) {
      if (!rec) return "";
      const [who, mark, when] = rec, inch = toInches(mark);
      if (inch == null) return "";
      const ftv = inch / 12;
      if (ev === "High jump") {
        const top = 14, W = 360, H = 440, base = H - 26, px = (base - 10) / top, Y = (f) => base - f * px;
        const ticks = Array.from({ length: top + 1 }, (_, i) => `<line x1="34" x2="${i % 5 ? 40 : 44}" y1="${Y(i)}" y2="${Y(i)}" class="ls-tick"/>${i % 2 ? "" : `<text x="28" y="${Y(i) + 4}" class="ls-ax" text-anchor="end">${i} ft</text>`}`).join("");
        return `<figure class="ls-card"><figcaption><span class="lab-kicker">High jump</span><b>${esc(mark)}</b> <span class="ls-sub">${esc(fmtFt(inch))} · ${esc(who)} · ${esc(when)}</span></figcaption>
          <svg viewBox="0 0 ${W} ${H}" class="ls-svg" role="img" aria-label="${esc(who)}'s ${esc(mark)} high jump bar next to a doorway and a basketball rim">
            <rect x="0" y="${base}" width="${W}" height="26" class="ls-ground"/>${ticks}
            <g class="ls-door"><rect x="64" y="${Y(80 / 12)}" width="${3 * px}" height="${(80 / 12) * px}" rx="2"/><circle cx="${64 + 3 * px - 9}" cy="${Y(3.2)}" r="3"/><text x="${64 + 1.5 * px}" y="${Y(80 / 12) - 8}" text-anchor="middle" class="ls-lab">Door · 6 ft 8 in</text></g>
            <g class="ls-hoop"><rect x="${W - 40}" y="${Y(13.2)}" width="7" height="${13.2 * px}"/><rect x="${W - 58}" y="${Y(13.5)}" width="6" height="${3.5 * px}"/><line x1="${W - 58}" x2="${W - 58 - 1.5 * px}" y1="${Y(10)}" y2="${Y(10)}" class="ls-rim"/><text x="${W - 58 - .8 * px}" y="${Y(10) + 18}" text-anchor="middle" class="ls-lab">Rim · 10 ft</text></g>
            <g class="ls-hj"><rect x="${150}" y="${Y(ftv + .6)}" width="6" height="${(ftv + .6) * px}" class="ls-std"/><rect x="${236}" y="${Y(ftv + .6)}" width="6" height="${(ftv + .6) * px}" class="ls-std"/>
              <rect x="153" y="${Y(ftv) - 2.5}" width="86" height="5" rx="2.5" class="ls-bar" style="--from:${(base - 12 - Y(ftv)).toFixed(1)}px"/><rect x="150" y="${base - 2}" width="92" height="4" class="ls-mat"/></g>
            <text x="196" y="${Y(ftv) - 12}" text-anchor="middle" class="ls-mark ls-fade">${esc(mark)}</text>
          </svg><p class="ls-cmp">${cmpHJ(inch)}</p></figure>`;
      }
      const span = ev === "Long jump" ? Math.max(25, Math.ceil(ftv / 5) * 5 + 5) : Math.max(65, Math.ceil(ftv / 10) * 10 + 10);
      const W = 640, H = ev === "Long jump" ? 210 : 230, x0 = 34, px = (W - x0 - 20) / span, X = (f) => x0 + f * px;
      const ticks = Array.from({ length: span / 5 + 1 }, (_, i) => `<line x1="${X(i * 5)}" x2="${X(i * 5)}" y1="${H - 34}" y2="${H - 28}" class="ls-tick"/><text x="${X(i * 5)}" y="${H - 14}" text-anchor="middle" class="ls-ax">${i * 5} ft</text>`).join("");
      const refs = ev === "Long jump" ? [[15, "Free-throw line · 15 ft from the backboard"], [19.75, "High school 3-point line · 19 ft 9 in"]]
        : [[19.75, "3-point line · 19 ft 9 in"], [42, "Half a high school court · 42 ft"], [60, "Bowling lane · 60 ft to the head pin"]];
      const refSvg = refs.filter(([f]) => f <= span).map(([f, l], i) => { const end = X(f) > W - 230; return `<g class="ls-ref"><line x1="${X(f)}" x2="${X(f)}" y1="${28 + i * 22}" y2="${H - 34}"/><text x="${end ? X(f) - 5 : X(f) + 5}" y="${40 + i * 22}" text-anchor="${end ? "end" : "start"}" class="ls-lab">${esc(l)}</text></g>`; }).join("");
      const peak = ev === "Long jump" ? 70 : 110;
      const arc = `M${X(0)},${H - 40} Q${X(ftv / 2)},${H - 40 - peak * 2} ${X(ftv)},${H - 40}`;
      return `<figure class="ls-card wide"><figcaption><span class="lab-kicker">${esc(ev)}</span><b>${esc(mark)}</b> <span class="ls-sub">${esc(fmtFt(inch))} · ${esc(who)} · ${esc(when)}</span></figcaption>
        <svg viewBox="0 0 ${W} ${H}" class="ls-svg" role="img" aria-label="${esc(who)}'s ${esc(mark)} ${esc(ev.toLowerCase())} drawn to scale against basketball and bowling distances">
          <rect x="0" y="${H - 34}" width="${W}" height="34" class="ls-ground"/>
          ${ev === "Long jump" ? `<rect x="${X(-1.2)}" y="${H - 38}" width="${px * 1.2}" height="4" class="ls-board"/><rect x="${X(Math.max(2, ftv - 9))}" y="${H - 38}" width="${X(span) - X(Math.max(2, ftv - 9))}" height="6" rx="3" class="ls-sand"/>`
            : `<circle cx="${X(0) - 7}" cy="${H - 40}" r="7" class="ls-circle"/>`}
          ${ticks}${refSvg}
          <path d="${arc}" class="ls-arc"/><circle r="${ev === "Shot put" ? 6 : 5}" cx="${X(ftv)}" cy="${H - 40}" class="ls-ball"/>
          <g class="ls-fade"><line x1="${X(ftv)}" x2="${X(ftv)}" y1="${H - 48}" y2="${H - 28}" class="ls-land"/><text x="${X(ftv)}" y="${H - 54}" text-anchor="middle" class="ls-mark">${esc(mark)}</text></g>
        </svg><p class="ls-cmp">${cmpFlat(ev, ftv)}</p></figure>`;
    }
    function cmpHJ(inch) {
      const door = 80, rim = 120;
      return inch > door ? `Higher than a standard doorway by ${ftIn(inch - door)}, and ${ftIn(rim - inch)} short of a basketball rim.`
        : `${ftIn(door - inch)} under the top of a standard doorway.`;
    }
    function cmpFlat(ev, f) {
      if (ev === "Long jump") return f > 15 ? `Farther than the free-throw line is from the backboard, by ${ftIn((f - 15) * 12)}.` : `${ftIn((15 - f) * 12)} short of free-throw distance.`;
      return f > 42 ? `Past half court on a high school basketball floor.` : f > 19.75 ? `${f >= 39.5 ? "More than twice the 3-point distance" : "Past the 3-point line"}, and ${ftIn((42 - f) * 12)} short of half court.` : `Inside the 3-point line.`;
    }
    function render() {
      const R = records(G);
      box.innerHTML = ["High jump", "Long jump", "Shot put"].map((ev) => scene(ev, (R[ev] || [])[0])).join("") || '<p class="lab-empty">No field-event marks on file.</p>';
      box.classList.remove("on", "landed-all");
      if (REDUCED) { box.classList.add("on"); return; }
      onView(box, () => requestAnimationFrame(() => { box.classList.add("on"); fly(); }));
    }
    /* the jump and the throw: the ball follows its arc out to the mark */
    function fly() {
      $$(".ls-card.wide", box).forEach((c) => {
        const path = $(".ls-arc", c), ball = $(".ls-ball", c), L = path.getTotalLength();
        let t0 = null;
        const step = (now) => {
          if (t0 == null) t0 = now;
          const f = Math.min(1, (now - t0) / 1300), e = 1 - Math.pow(1 - f, 2.2), pt = path.getPointAtLength(e * L);
          ball.setAttribute("cx", pt.x); ball.setAttribute("cy", pt.y);
          if (f < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }
    onGender(render);
    render();
  })();

  /* =====================================================================
     5 · THEN VS NOW — each winter's best mark on file, event by event
     ===================================================================== */
  (function thenNow() {
    const sec = $("#thenvsnow");
    if (!sec) return;
    const box = $("#tvn-grid");
    function render() {
      const seasons = SEASONS[G];
      const evs = [...new Set(PERF[G].filter((p) => p.v != null).map((p) => p.ev))].sort(evSort);
      box.innerHTML = evs.map((ev) => {
        const best = seasons.map((s) => {
          const ps = PERF[G].filter((p) => p.ev === ev && p.season === s && p.v != null);
          return ps.length ? ps.reduce((a, b) => (isBetter(ev, b.v, a.v) ? b : a)) : null;
        });
        const have = best.filter(Boolean);
        if (have.length < 2) return "";
        const vals = have.map((p) => p.v), lo = Math.min(...vals), hi = Math.max(...vals), pad = (hi - lo) * .18 || 1;
        const W = 300, H = 140, P = 24, top = 30, bot = H - 30;
        const x = (i) => P + i * (W - 2 * P) / Math.max(1, seasons.length - 1);
        const y = (v) => { const f = (v - (lo - pad)) / (hi - lo + 2 * pad); return FIELD.has(ev) ? bot - f * (bot - top) : top + f * (bot - top); };   // up is always better
        const pts = best.map((p, i) => (p ? [x(i), y(p.v), p] : null)).filter(Boolean);
        const first = have[0], last = have[have.length - 1];
        const top1 = have.reduce((a, b) => (isBetter(ev, b.v, a.v) ? b : a));
        const better = isBetter(ev, last.v, first.v);
        const sum = top1 === last ? `Best yet: ${last.season}` : `Best winter on file: ${top1.season}`;
        return `<article class="tvn-card ${better ? "up" : "down"}"><header><h3>${esc(ev)}</h3><span class="tvn-sum">${esc(sum)}</span></header>
          <svg viewBox="0 0 ${W} ${H}" class="tvn-svg" role="img" aria-label="${esc(ev)}: best mark on file each winter">
            <polyline points="${pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ")}" class="tvn-line"/>
            ${pts.map(([a, b, p], i) => `<g class="tvn-pt"><circle cx="${a}" cy="${b}" r="5"/><text x="${a}" y="${b - 10}" text-anchor="${i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}">${esc(p.mark)}</text></g>`).join("")}
            ${seasons.map((s, i) => `<text x="${x(i)}" y="${H - 2}" text-anchor="middle" class="tvn-ax">${esc(s.replace(/^20(\d\d)–(\d\d)$/, "’$1–’$2"))}</text>`).join("")}
          </svg>
          <ul class="tvn-who">${best.map((p, i) => (p ? `<li><span>${esc(seasons[i])}</span><b>${esc(p.mark)}</b> ${esc(p.relay ? p.who.split(/, | and /).map(lastName).join(" · ") : p.who)}<small>${esc(p.meet)}</small></li>` : "")).join("")}</ul></article>`;
      }).join("");
    }
    onGender(render);
    render();
  })();

  /* =====================================================================
     6 · PACE CALCULATOR
     ===================================================================== */
  (function pace() {
    const sec = $("#pace");
    if (!sec) return;
    const evSel = $("#pace-ev"), inp = $("#pace-time"), out = $("#pace-out"), near = $("#pace-near"), ring = $("#pace-ring"), err = $("#pace-err");
    const EV = { "600 meters": 600, "1000 meters": 1000, Mile: 1609.34, "Two-mile": 3218.69 };
    const DEF = { "600 meters": "1:45.00", "1000 meters": "3:00.00", Mile: "5:30.00", "Two-mile": "11:30.00" };
    evSel.innerHTML = Object.keys(EV).map((e) => `<option>${esc(e)}</option>`).join("");
    evSel.value = store.get("pace-ev", "Mile");
    inp.value = store.get("pace-t-" + evSel.value, DEF[evSel.value]);
    const segs = (D) => { const n = Math.round(D / 200), first = D - 200 * (n - 1); return [first, ...Array(n - 1).fill(200)]; };
    let anim = 0;
    function calc() {
      const ev = evSel.value, D = EV[ev], T = toSec(inp.value.replace(/\s/g, ""));
      store.set("pace-ev", ev);
      if (T == null || T < D / 11 || T > D / 1.2) { err.hidden = false; err.textContent = "Enter a time like 5:30 or 5:30.25"; return; }
      err.hidden = true; store.set("pace-t-" + ev, inp.value);
      const sg = segs(D);
      let cum = 0;
      const rows = sg.map((m, i) => { const lt = T * m / D; cum += lt; return { i, m, lt, cum }; });
      out.innerHTML = `<div class="pace-big"><div><b>${fmtT(T * 200 / D)}</b><span>every 200 m lap</span></div><div><b>${fmtT(T * 400 / D)}</b><span>per 400 m</span></div><div><b>${fmtT(T * 1609.34 / D)}</b><span>per mile</span></div><div><b>${(D / T).toFixed(2)}</b><span>meters a second</span></div></div>
        <table class="pace-tbl"><thead><tr><th>Lap</th><th>At</th><th>Lap time</th><th>Clock</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${r.i + 1}</td><td>${Math.round(sg.slice(0, r.i + 1).reduce((a, b) => a + b, 0))} m</td><td>${fmtT(r.lt)}</td><td><b>${fmtT(r.cum)}</b></td></tr>`).join("")}</tbody></table>
        ${sg[0] > 200.5 ? `<p class="lab-fine">The ${esc(ev.toLowerCase())} starts ${(sg[0] - 200).toFixed(1)} m behind the finish line, so the first split comes at ${sg[0].toFixed(0)} m.</p>` : ""}`;
      /* Falcons who've run close to it */
      const mine = ["boys", "girls"].flatMap((g) => PERF[g].filter((p) => p.ev === ev && p.v != null).map((p) => ({ ...p, g })));
      const bestBy = {};
      for (const p of mine) if (!bestBy[p.who] || p.v < bestBy[p.who].v) bestBy[p.who] = p;
      const list = Object.values(bestBy).sort((a, b) => Math.abs(a.v - T) - Math.abs(b.v - T)).slice(0, 5).sort((a, b) => a.v - b.v);
      near.innerHTML = list.length ? `<h3>Falcons closest to ${fmtT(T)}</h3><ul>${list.map((p) => `<li class="${p.v <= T ? "faster" : "slower"}"><b>${esc(p.who)}</b> ${esc(p.mark)} <small>${esc(p.meet)}, ${esc(p.season)} · ${p.v <= T ? `${(T - p.v).toFixed(2)} s faster than your goal` : `${(p.v - T).toFixed(2)} s slower`}</small></li>`).join("")}</ul>` : "";
      /* a dot that laps the ring at this pace, sped up so a lap takes about 2 s */
      cancelAnimationFrame(anim);
      const svg = ring; while (svg.firstChild) svg.firstChild.remove();
      const g = drawOval(svg, { label: fmtT(T * 200 / D) + " / LAP" }).runners;
      const dot = S("g", { class: "tk-r dv" }, g); S("circle", { r: 1.1, class: "tk-dot" }, dot);
      const lap = T * 200 / D, scale = lap / 2.2;
      let t0 = null;
      const step = (now) => { if (t0 == null) t0 = now; const tt = (now - t0) / 1000 * scale; const [px, py] = ovalPt(tt / lap * 200, TR.r + 1.2); dot.setAttribute("transform", `translate(${px},${py})`); anim = requestAnimationFrame(step); };
      if (REDUCED) { const [px, py] = ovalPt(60, TR.r + 1.2); dot.setAttribute("transform", `translate(${px},${py})`); } else anim = requestAnimationFrame(step);
    }
    evSel.addEventListener("change", () => { inp.value = store.get("pace-t-" + evSel.value, DEF[evSel.value]); calc(); });
    inp.addEventListener("input", calc);
    $("#pace-form").addEventListener("submit", (e) => { e.preventDefault(); calc(); });
    calc();
  })();

  /* =====================================================================
     7 · DUAL MEET SCORING
     ===================================================================== */
  (function dual() {
    const sec = $("#dual");
    if (!sec) return;
    const pickEl = $("#dual-pick"), board = $("#dual-board"), list = $("#dual-events"), prev = $("#dual-prev"), next = $("#dual-next"), playB = $("#dual-play"), allB = $("#dual-all"), fin = $("#dual-final");
    let M = null, i = -1, timer = 0;
    pickEl.innerHTML = LAB_DUALS.map((d, k) => `<button type="button" class="chip" data-k="${k}" aria-pressed="false">${esc(d.title)}</button>`).join("");
    pickEl.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) load(LAB_DUALS[+b.dataset.k]); });
    const short = (s) => (s === "Peabody Vet. Mem." ? "Peabody" : s);
    function totals(upto) {
      const t = { [M.a]: 0, [M.b]: 0 };
      M.events.slice(0, upto + 1).forEach((ev) => ev.rows.forEach((r) => { t[r.s] += r.pts; }));
      return t;
    }
    function load(d) {
      clearInterval(timer); playB.textContent = "Play the meet";
      M = d; i = -1;
      $$("button", pickEl).forEach((b) => b.setAttribute("aria-pressed", String(LAB_DUALS[+b.dataset.k] === d)));
      list.innerHTML = M.events.map((ev, k) => `<li class="dual-ev" data-k="${k}"><button type="button" class="dual-h" aria-expanded="false"><span class="dn">${k + 1}</span><span class="de">${esc(ev.event)}</span><span class="dp"></span></button>
        <div class="dual-body" hidden><table><thead><tr><th>Place</th><th>${ev.relay ? "Relay" : "Athlete"}</th><th>Mark</th><th>Pts</th></tr></thead><tbody>${ev.rows.map((r, j) => `<tr class="${r.s === "Danvers" ? "dv" : ""}"><td>${ev.relay ? (j ? "2nd" : "1st") : ord(j + 1)}<small>${esc(ord(+r.pl))} overall</small></td><td>${esc(r.legs ? short(r.s) : r.n)}<small>${esc(r.legs ? r.legs.map(lastName).join(" · ") : short(r.s))}</small></td><td>${esc(r.m)}</td><td><b>${r.pts}</b></td></tr>`).join("") || `<tr><td colspan="4">No one from either team scored.</td></tr>`}</tbody></table></div></li>`).join("");
      $$(".dual-h", list).forEach((h) => h.addEventListener("click", () => { clearInterval(timer); playB.textContent = "Play the meet"; go(+h.parentElement.dataset.k, true); }));
      go(-1);
    }
    function go(k, toggle) {
      i = clamp(k, -1, M.events.length - 1);
      const t = i < 0 ? { [M.a]: 0, [M.b]: 0 } : totals(i);
      board.innerHTML = [M.a, M.b].map((s) => `<div class="dual-team ${s === "Danvers" ? "dv" : ""}"><span>${esc(short(s))}</span><b>${t[s]}</b></div>`).join('<span class="dual-vs">vs</span>');
      $$(".dual-ev", list).forEach((li, k2) => {
        const ev = M.events[k2], on = k2 <= i;
        li.classList.toggle("scored", on); li.classList.toggle("cur", k2 === i);
        const pa = ev.rows.filter((r) => r.s === M.a).reduce((a, r) => a + r.pts, 0), pb = ev.rows.filter((r) => r.s === M.b).reduce((a, r) => a + r.pts, 0);
        $(".dp", li).textContent = on ? `${short(M.a)} ${pa} · ${short(M.b)} ${pb}` : "";
        const open = k2 === i;
        $(".dual-body", li).hidden = !open; $(".dual-h", li).setAttribute("aria-expanded", String(open));
      });
      prev.disabled = i < 0; next.disabled = i >= M.events.length - 1;
      fin.hidden = i < M.events.length - 1;
      if (!fin.hidden) {
        const [a, b] = M.score, win = a > b ? M.a : M.b;
        fin.innerHTML = `<b>Final: ${esc(short(win))} ${Math.max(a, b)}, ${esc(short(win === M.a ? M.b : M.a))} ${Math.min(a, b)}.</b> The same score Lancer Timing posted for this meet (${esc(M.meet)}, ${esc(dateText(isoDate(M.date)))}).`;
      }
    }
    prev.addEventListener("click", () => go(i - 1));
    next.addEventListener("click", () => go(i + 1));
    allB.addEventListener("click", () => { clearInterval(timer); playB.textContent = "Play the meet"; go(M.events.length - 1); });
    playB.addEventListener("click", () => {
      if (timer) { clearInterval(timer); timer = 0; playB.textContent = "Play the meet"; return; }
      if (i >= M.events.length - 1) go(-1);
      playB.textContent = "Pause";
      timer = setInterval(() => { if (i >= M.events.length - 1) { clearInterval(timer); timer = 0; playB.textContent = "Play again"; return; } go(i + 1); }, REDUCED ? 600 : 1700);
    });
    const pickFor = () => LAB_DUALS.find((d) => d.gender === G) || LAB_DUALS[0];
    onGender(() => load(pickFor()));
    load(pickFor());
  })();

  /* =====================================================================
     8 · PR WALL — season bests that beat everything earlier on file
     ===================================================================== */
  (function prwall() {
    const sec = $("#prwall");
    if (!sec) return;
    const chips = $("#pr-seasons"), wall = $("#pr-wall"), debut = $("#pr-debuts");
    let season = null, shot = false, armed = false;
    function render() {
      const ss = SEASONS[G];
      if (!ss.includes(season)) season = ss[ss.length - 1];
      chips.innerHTML = ss.map((s) => `<button type="button" class="chip" data-s="${esc(s)}" aria-pressed="${s === season}">${esc(s)}</button>`).join("");
      const ind = PERF[G].filter((p) => !p.relay && p.v != null && p.date);
      const byKey = {};
      for (const p of ind) (byKey[p.who + "|" + p.ev] = byKey[p.who + "|" + p.ev] || []).push(p);
      const prs = [], firsts = [];
      for (const ps of Object.values(byKey)) {
        ps.sort((a, b) => a.date - b.date);
        const inS = ps.filter((p) => p.season === season);
        if (!inS.length) continue;
        const best = inS.reduce((a, b) => (isBetter(a.ev, b.v, a.v) ? b : a));
        const before = ps.filter((p) => p.date < inS[0].date);
        if (!before.length) { firsts.push(best); continue; }
        const prevBest = before.reduce((a, b) => (isBetter(a.ev, b.v, a.v) ? b : a));
        if (isBetter(best.ev, best.v, prevBest.v)) prs.push({ best, prev: prevBest });
      }
      prs.sort((a, b) => evSort(a.best.ev, b.best.ev) || a.best.v - b.best.v);
      wall.innerHTML = prs.length ? prs.map(({ best, prev }) => {
        const gain = Math.abs(best.v - prev.v);
        const amt = FIELD.has(best.ev) ? `+${ftIn(gain)}` : `−${gain.toFixed(2)} s`;
        return `<article class="pr-card"><span class="pr-badge">Best on file</span><h3>${esc(best.who)}</h3><p class="pr-ev">${esc(best.ev)}</p>
          <p class="pr-mark">${esc(best.mark)} <span class="pr-gain">${esc(amt)}</span></p>
          <p class="pr-meta">${esc(best.meet)}, ${esc(best.dateText)}<br>Up from ${esc(prev.mark)} at the ${esc(prev.meet)} (${esc(prev.dateText)})</p></article>`;
      }).join("") : `<p class="lab-empty">No marks this winter beat an earlier mark on file.</p>`;
      firsts.sort((a, b) => evSort(a.ev, b.ev) || a.v - b.v);
      debut.innerHTML = firsts.length ? `<h3>First marks on file this winter</h3><ul>${firsts.map((p) => `<li><b>${esc(p.who)}</b> ${esc(p.ev)} <span>${esc(p.mark)}</span></li>`).join("")}</ul>` : "";
      if (!shot && !armed && prs.length && !REDUCED) { armed = true; onView(wall, () => { if (shot) return; shot = true; confetti(); }); }
    }
    chips.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { season = b.dataset.s; render(); } });
    onGender(render);
    render();
    function confetti() {
      const c = document.createElement("canvas"); c.className = "pr-confetti"; c.setAttribute("aria-hidden", "true");
      sec.appendChild(c);
      const r = sec.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
      c.width = r.width * dpr; c.height = Math.min(r.height, 700) * dpr;
      const ctx = c.getContext("2d"); ctx.scale(dpr, dpr);
      const COLORS = ["#18479f", "#9cbaf2", "#ffffff", "#0b1f4d", "#6c8fd6", "#f0b429"];
      const P = Array.from({ length: 130 }, () => ({ x: r.width / 2 + (Math.random() - .5) * 80, y: 60, vx: (Math.random() - .5) * 9, vy: -Math.random() * 9 - 3, s: 4 + Math.random() * 5, a: Math.random() * 6, va: (Math.random() - .5) * .4, c: COLORS[Math.floor(Math.random() * COLORS.length)] }));
      let n = 0;
      const step = () => {
        ctx.clearRect(0, 0, r.width, r.height);
        for (const p of P) { p.vy += .22; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); }
        if (++n < 160) requestAnimationFrame(step); else c.remove();
      };
      requestAnimationFrame(step);
    }
  })();

  /* =====================================================================
     9 · WHERE THE POINTS COME FROM — state meet points by event
     ===================================================================== */
  (function points() {
    const sec = $("#points");
    if (!sec) return;
    const box = $("#pts-grid"), det = $("#pts-detail");
    const PTS = [0, 10, 8, 6, 5, 4, 3, 2, 1];
    function render() {
      const meets = [];
      for (const s of SEASONS[G]) {
        const rows = PERF[G].filter((p) => p.season === s && /Division/.test(p.meet) && !/Meet of Champions|All-State/.test(p.meet));
        if (!rows.length) continue;
        const meet = rows[0].meet, official = +(rows[0].team.match(/(\d+(?:\.\d+)?) points?/) || [])[1];
        const scored = rows.filter((p) => !p.prelim && parseInt(p.place) >= 1 && parseInt(p.place) <= 8).map((p) => ({ ...p, pts: PTS[parseInt(p.place)] }));
        meets.push({ s, meet, official, scored, total: scored.reduce((a, p) => a + p.pts, 0) });
      }
      const evs = [...new Set(meets.flatMap((m) => m.scored.map((p) => p.ev)))].sort(evSort);
      const max = Math.max(1, ...meets.flatMap((m) => evs.map((ev) => m.scored.filter((p) => p.ev === ev).reduce((a, p) => a + p.pts, 0))));
      const cell = (m, ev) => { const ps = m.scored.filter((p) => p.ev === ev), v = ps.reduce((a, p) => a + p.pts, 0); return { v, ps }; };
      box.innerHTML = `<table class="pts-tbl"><thead><tr><th>Event</th>${meets.map((m) => `<th>${esc(m.s)}<small>${esc(m.meet.replace("MIAA ", "").replace(" Championship", ""))}</small></th>`).join("")}<th>Total</th></tr></thead>
        <tbody>${evs.map((ev) => `<tr><th>${esc(ev)}</th>${meets.map((m, k) => { const { v } = cell(m, ev); return `<td>${v ? `<button type="button" class="pts-c" style="--a:${(.18 + .82 * v / max).toFixed(2)}" data-m="${k}" data-ev="${esc(ev)}">${v}</button>` : '<span class="pts-0">·</span>'}</td>`; }).join("")}<td class="pts-t">${meets.reduce((a, m) => a + cell(m, ev).v, 0)}</td></tr>`).join("")}</tbody>
        <tfoot><tr><th>Team total</th>${meets.map((m) => `<td><b>${m.total}</b>${m.official === m.total ? '<span class="pts-ok" title="Matches the official team score">✓ official</span>' : m.official ? `<span class="pts-x">official ${m.official}</span>` : ""}</td>`).join("")}<td class="pts-t"><b>${meets.reduce((a, m) => a + m.total, 0)}</b></td></tr></tfoot></table>`;
      det.innerHTML = "Tap a score to see who earned it.";
      box.onclick = (e) => {
        const b = e.target.closest(".pts-c"); if (!b) return;
        const m = meets[+b.dataset.m], { ps } = cell(m, b.dataset.ev);
        $$(".pts-c", box).forEach((x) => x.classList.toggle("on", x === b));
        det.innerHTML = `<b>${esc(b.dataset.ev)}, ${esc(m.meet)} (${esc(m.s)})</b>: ${ps.map((p) => `${esc(p.relay ? "the relay (" + p.who + ")" : p.who)}, ${esc(p.place)} in ${esc(p.mark)} — ${p.pts} point${p.pts === 1 ? "" : "s"}`).join("; ")}`;
      };
    }
    onGender(render);
    render();
  })();

  /* =====================================================================
     10 · MEET MAP
     ===================================================================== */
  (function map() {
    const sec = $("#map");
    if (!sec) return;
    const svg = $("#map-svg"), card = $("#map-card"), listEl = $("#map-list");
    const [W, E, So, N] = LAB_MAP.box, VW = LAB_MAP.vw, VH = LAB_MAP.vh;
    const P = (lat, lon) => [(lon - W) / (E - W) * VW, (N - lat) / (N - So) * VH];
    const miles = (a, b) => {
      const R = 3958.8, toR = Math.PI / 180, dLat = (b.lat - a.lat) * toR, dLon = (b.lon - a.lon) * toR;
      const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLon / 2) ** 2;
      return 2 * R * Math.asin(Math.sqrt(h));
    };
    const KEYOF = (site) => /Danvers High/.test(site) ? "danvers" : /Gloucester/.test(site) ? "gloucester" : /Marblehead/.test(site) ? "marblehead" : /Swampscott/.test(site) ? "swampscott" : /Reggie Lewis/.test(site) ? "reggie" : /New Balance/i.test(site) ? "trackNB" : null;
    /* this winter's meets at each site (boys and girls meets on the same day and site count once) */
    const winter = {};
    for (const g of ["boys", "girls"]) for (const m of TEAMS[g].schedule || []) {
      const k = KEYOF(m.site || ""); if (!k) continue;
      (winter[k] = winter[k] || new Map()).set(m.date.slice(0, 10), m);
    }
    /* races on file at each site */
    const onFile = {};
    for (const r of LAB_RACES) { const k = r.venue; (onFile[k] = onFile[k] || new Set()).add(`${r.meet} (${dateText(isoDate(r.date))})`); }
    const home = VENUE.danvers;
    svg.setAttribute("viewBox", `0 0 ${VW} ${VH}`);
    S("rect", { width: VW, height: VH, class: "mp-water" }, svg);
    for (let i = 1; i < 8; i++) S("line", { x1: i * VW / 8, x2: i * VW / 8, y1: 0, y2: VH, class: "mp-gl" }, svg);
    for (let i = 1; i < 6; i++) S("line", { y1: i * VH / 6, y2: i * VH / 6, x1: 0, x2: VW, class: "mp-gl" }, svg);
    S("path", { d: LAB_MAP.d, class: "mp-land" }, svg);
    [["BOSTON", 42.358, -71.06], ["Atlantic Ocean", 42.40, -70.70], ["Cape Ann", 42.655, -70.64]].forEach(([t, la, lo]) => { const [x, y] = P(la, lo); const tx = S("text", { x, y, class: t === "BOSTON" ? "mp-city" : "mp-sea", "text-anchor": "middle" }, svg); tx.textContent = t; });
    const [hx, hy] = P(home.lat, home.lon);
    const routes = S("g", { class: "mp-routes" }, svg), pins = S("g", {}, svg);
    for (const v of LAB_VENUES) {
      const [x, y] = P(v.lat, v.lon);
      if (!v.home) S("path", { d: `M${hx},${hy} Q${(hx + x) / 2 + (y - hy) * .15},${(hy + y) / 2 - (x - hx) * .15} ${x},${y}`, class: "mp-route", "data-k": v.key }, routes);
      const g = S("g", { class: "mp-pin" + (v.home ? " home" : ""), transform: `translate(${x},${y})`, tabindex: "0", role: "button", "aria-label": v.name, "data-k": v.key }, pins);
      if (v.home) S("path", { d: "M0,-16 L4.6,-5 16,-5 7,2 10.5,14 0,7 -10.5,14 -7,2 -16,-5 -4.6,-5Z", class: "mp-star" }, g);
      else { S("circle", { r: 16, class: "mp-halo" }, g); S("circle", { r: 9.5, class: "mp-dot" }, g); }
      const lbl = S("text", { x: v.key === "trackNB" ? -18 : 18, y: 7, class: "mp-lbl", "text-anchor": v.key === "trackNB" ? "end" : "start" }, g);
      lbl.textContent = v.home ? "Danvers" : v.key === "reggie" ? "Reggie Lewis Center" : v.key === "trackNB" ? "The TRACK at New Balance" : v.place;
    }
    function show(k) {
      const v = VENUE[k], mi = v.home ? 0 : miles(home, v);
      $$(".mp-pin", svg).forEach((p) => p.classList.toggle("on", p.dataset.k === k));
      $$(".mp-route", svg).forEach((p) => p.classList.toggle("on", p.dataset.k === k));
      const meets = winter[k] ? [...winter[k].values()].sort((a, b) => a.date.localeCompare(b.date)) : [];
      const files = onFile[k] ? [...onFile[k]] : [];
      card.innerHTML = `<span class="lab-kicker">${esc(v.place)}</span><h3>${esc(v.name)}</h3>
        <p class="mp-dist">${v.home ? "Home: the Falcons' own field house" : `About <b>${mi.toFixed(1)} miles</b> from Danvers High in a straight line`}${v.approx ? " · pin at the town center" : ""}</p>
        ${meets.length ? `<p><b>This winter:</b> ${meets.map((m) => `${esc(dateText(isoDate(m.date.slice(0, 10))))}${m.name ? ` (${esc(m.name)})` : m.opponent ? ` vs. ${esc(m.opponent)}` : ""}`).join("; ")}</p>` : "<p>No meets here on this winter's schedule.</p>"}
        ${files.length ? `<p><b>Races to replay from here:</b> ${files.map(esc).join("; ")}</p>` : ""}`;
    }
    pins.addEventListener("click", (e) => { const p = e.target.closest(".mp-pin"); if (p) show(p.dataset.k); });
    pins.addEventListener("keydown", (e) => { const p = e.target.closest(".mp-pin"); if (p && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); show(p.dataset.k); } });
    listEl.innerHTML = LAB_VENUES.map((v) => `<li><button type="button" data-k="${v.key}"><b>${esc(v.home ? "Danvers High School (home)" : v.name)}</b><span>${v.home ? "0" : miles(home, v).toFixed(1)} mi · ${winter[v.key] ? winter[v.key].size : 0} meet${winter[v.key] && winter[v.key].size === 1 ? "" : "s"} this winter</span></button></li>`).join("");
    listEl.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) show(b.dataset.k); });
    show("trackNB");
    if (!REDUCED) onView(svg, () => svg.classList.add("drawn"));
    else svg.classList.add("drawn");
  })();

  /* the lab bar: which feature is on screen */
  (function bar() {
    const links = $$(".lab-bar a[href^='#']");
    if (!("IntersectionObserver" in window) || !links.length) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });
  })();
})();
