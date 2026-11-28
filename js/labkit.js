/* =====================================================================
   LAB KIT — helpers shared by the winter sport labs (basketball/lab.html,
   hockey/lab.html, …). Load it after the sport's data files and before the
   sport's js/lab.js, which uses window.LabKit.
   Everything a lab shows comes from the sport's own data files (TEAMS).
   ===================================================================== */
window.LabKit = (function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const NS = "http://www.w3.org/2000/svg";
  const S = (tag, attrs = {}, parent) => {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) if (attrs[k] != null) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  };
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const ord = (n) => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
  const MONTHS = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  const isoDate = (s) => { const [y, m, d] = String(s).slice(0, 10).split("-").map(Number); return new Date(y, m - 1, d); };
  const dateText = (s) => { const d = isoDate(s); return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; };
  const shortDate = (s) => { const d = isoDate(s); return `${MONTHS[d.getMonth()]} ${d.getDate()}`; };
  const pct = (w, l, t = 0) => (w + l + t ? (w + t / 2) / (w + l + t) : 0);
  const rec = (w, l, t) => `${w}–${l}${t ? `–${t}` : ""}`;
  function store(ns) {
    return {
      get(k, d) { try { const v = localStorage.getItem(`dfa-${ns}-${k}`); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
      set(k, v) { try { localStorage.setItem(`dfa-${ns}-${k}`, JSON.stringify(v)); } catch (e) { /* storage blocked: fine */ } }
    };
  }
  /* run fn the first time el comes into view */
  function onView(el, fn, margin = "0px 0px -15% 0px") {
    if (!el) return;
    if (!("IntersectionObserver" in window)) { fn(); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); fn(); } }, { rootMargin: margin });
    io.observe(el);
  }
  /* the boys/girls switch in the feature bar (hidden for a sport with one team). onChange(key) runs on every switch */
  function teams(ns, keys) {
    const st = store(ns);
    let cur = st.get("team", keys[0]);
    if (!keys.includes(cur)) cur = keys[0];
    const subs = [];
    const box = $(".lk-team");
    if (box) {
      if (keys.length < 2) box.hidden = true;
      $$("button", box).forEach((b) => {
        b.setAttribute("aria-pressed", String(b.dataset.t === cur));
        b.addEventListener("click", () => set(b.dataset.t));
      });
    }
    function set(k) {
      if (!keys.includes(k)) return;
      cur = k; st.set("team", k);
      if (box) $$("button", box).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.t === k)));
      subs.forEach((fn) => fn(k));
    }
    return { get key() { return cur; }, on(fn) { subs.push(fn); }, set };
  }
  /* the feature bar marks the section on screen */
  function barSpy() {
    const links = $$(".lk-links a[href^='#']");
    if (!("IntersectionObserver" in window) || !links.length) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });
  }
  /* every game on file for a team, as objects. A games row: [date, home, opponent, type, result, us, them, note, story] */
  function games(team) {
    const out = [];
    for (const p of team.past || []) {
      for (const g of p.games || []) {
        const [date, home, opp, type, res, us, them, note, story] = g;
        out.push({ season: p.season, date, home: !!home, opp, type: type || "", res: res || null, us, them, note: note || "", story: story || "",
                   scored: (res === "W" || res === "L" || res === "T") && typeof us === "number" && typeof them === "number" });
      }
    }
    return out.sort((a, b) => a.date.localeCompare(b.date));
  }
  /* "Peabody/Lynnfield/North Reading" stays whole; a trailing " (R.I.)" and the like stay too */
  const oppKey = (o) => String(o || "").replace(/\s+/g, " ").trim();
  return { $, $$, esc, S, REDUCED, clamp, ord, isoDate, dateText, shortDate, pct, rec, store, onView, teams, barSpy, games, oppKey };
})();
