/* =====================================================================
   Shared effects for every page (hub, newsletter and all team sites).
   Load it last: <script src="(path to)/js/fx.js"></script>
     · the site footer, drawn into <footer id="site-footer">
     · team sites: a round Menu button with a full-screen menu that jumps to each
       section of the sport's one long page ("You're here" follows the scroll) and
       to the other sports (first visit: a one-time note under the button)
     · hover effects: button sweeps and arrows, a pull toward the mouse, card tilt
       and shine, and a dot-and-ring cursor (the last three for a mouse only)
     · sound effects made in the browser (no sound files), always on
   ===================================================================== */
(function () {
  const ROOT = new URL("..", document.currentScript.src).href;   // the site root, from /js/fx.js
  const ON_HUB = !!document.querySelector(".hub-hero");
  const OUT = 'target="_blank" rel="noopener"';

  /* ---------- Sound: always on; it plays from the visitor's first click, tap or key press (browsers allow nothing sooner) ---------- */
  const Sound = (function () {
    let ctx = null, master = null, last = 0, kicked = false;
    function make() {
      if (ctx) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = .9;
        master.connect(ctx.destination);
      } catch (e) { ctx = null; }
    }
    /* browsers only let a page play sound after a click, tap or key press on it; this runs on each of those */
    function unlock() {
      make();
      if (!ctx || ctx.state === "running") return;
      ctx.resume().catch(() => {});
      if (!kicked) {   // older iPhones only open up once something actually plays during the tap: a silent blip
        kicked = true;
        try { const s = ctx.createBufferSource(); s.buffer = ctx.createBuffer(1, 1, 22050); s.connect(ctx.destination); s.start(0); } catch (e) { /* not needed elsewhere */ }
      }
    }
    /* a visitor who already clicked on this site may hear sound on the next page straight away where the
       browser says so (Chrome, Edge, Firefox); everywhere else the player is made during the first click,
       which is the one way Safari reliably allows */
    function wake() {
      if (ctx) return;
      const policy = navigator.getAutoplayPolicy ? navigator.getAutoplayPolicy("audiocontext") : null;
      const ua = navigator.userActivation;
      let fromHere = false;
      try { fromHere = new URL(document.referrer).origin === location.origin; } catch (e) { /* no referrer */ }
      if (policy === "allowed" || (policy === null && fromHere && ua && ua.hasBeenActive)) make();
    }
    function ready() {
      if (!ctx) return false;
      if (ctx.state === "running") return true;
      ctx.resume().catch(() => {});
      /* not allowed to play yet: only queue a sound during the click or key press that starts it,
         so hover ticks don't pile up and all play at once later */
      const ua = navigator.userActivation;
      return !ua || ua.isActive;
    }
    function tone(o) {
      if (!ready()) return;
      const t = ctx.currentTime + (o.delay || 0), osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = o.type || "sine";
      osc.frequency.setValueAtTime(o.f, t);
      if (o.f2) osc.frequency.exponentialRampToValueAtTime(o.f2, t + o.d);
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(o.g, t + .008);
      g.gain.exponentialRampToValueAtTime(.0001, t + o.d);
      osc.connect(g); g.connect(master);
      osc.start(t); osc.stop(t + o.d + .03);
    }
    function noise(o) {
      if (!ready()) return;
      const t = ctx.currentTime, len = Math.floor(ctx.sampleRate * o.d), buf = ctx.createBuffer(1, len, ctx.sampleRate), data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = buf;
      f.type = "bandpass"; f.Q.value = 1.3;
      f.frequency.setValueAtTime(o.from, t);
      f.frequency.exponentialRampToValueAtTime(o.to, t + o.d);
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(o.g, t + o.d * .35);
      g.gain.exponentialRampToValueAtTime(.0001, t + o.d);
      src.connect(f); f.connect(g); g.connect(master);
      src.start(t); src.stop(t + o.d + .02);
    }
    return {
      unlock,
      wake,
      revive() { if (ctx && ctx.state !== "running") ctx.resume().catch(() => {}); },
      hover() { const n = performance.now(); if (n - last < 70) return; last = n; tone({ f: 2100, d: .035, g: .024, type: "triangle" }); },   // soft tick
      click() { tone({ f: 660, f2: 320, d: .09, g: .055 }); },                                     // tap
      swish() { noise({ d: .34, g: .06, from: 500, to: 5600 }); },                                 // a menu opens, a tab changes
    };
  })();

  /* ---------- Footer ---------- */
  /* The front page shows the season being played (winter); the fall sports keep their own front page, fall.html,
     one switch away. Footers and menus list the sports of the season the visitor is in, plus that switch. */
  const FALL = [["football", "Football"], ["soccer", "Soccer"], ["field-hockey", "Field hockey"], ["volleyball", "Volleyball"],
                ["cross-country", "Cross country"], ["golf", "Golf"], ["esports", "Esports"], ["cheer", "Cheer"]];
  const WINTER = [["basketball", "Basketball"], ["hockey", "Hockey"], ["wrestling", "Wrestling"],
                  ["indoor-track", "Indoor track"], ["swim-dive", "Swim & dive"], ["gymnastics", "Gymnastics"]];
  const here = location.href.startsWith(ROOT) ? location.href.slice(ROOT.length).split(/[?#]/)[0] : "";
  const IN_FALL = document.body.dataset.season === "fall" || FALL.some(([dir]) => here.split("/")[0] === dir);
  const TEAMS = IN_FALL ? FALL : WINTER;
  const FRONT = IN_FALL ? `${ROOT}fall.html` : ROOT;                       // this season's front page
  /* the Fall | Winter switch: the same control as a team site's Girls | Boys switch */
  const seasons = (cls = "", style = "") => `<div class="fx-seasons ${cls}" role="group" aria-label="Choose a season"${style}>
      <a href="${ROOT}fall.html"${IN_FALL ? ' class="on" aria-current="true"' : ""}>Fall</a><a href="${ROOT}"${IN_FALL ? "" : ' class="on" aria-current="true"'}>Winter</a></div>`;
  /* on the two front pages it sits at the start of the top bar, and beside "Pick Your Team" */
  if (ON_HUB) {
    const bar = document.querySelector(".topbar .wrap"), head = document.querySelector("#teams .section-head");
    if (bar) bar.insertAdjacentHTML("afterbegin", seasons());
    if (head) head.insertAdjacentHTML("beforeend", seasons("light"));
  }
  /* homepage sections; "State tournament" and "Latest results" only show when there's something in them */
  const SEASON = [["week", "Coming up"], ["road", "State tournament"], ["latest", "Latest results"], ["photos", "Photos"], ["tradition", "A winning tradition"]];

  function footer() {
    const foot = document.getElementById("site-footer");
    if (!foot) return;
    const home = (id) => (ON_HUB ? `#${id}` : `${FRONT}#${id}`);
    foot.className = "fx-foot";
    foot.innerHTML = `
      <div class="wrap">
        <div class="fx-foot-grid">
          <div>
            <a class="fx-brand" href="${ROOT}"><img src="${ROOT}images/falcons-logo.png" alt=""><span><b>Danvers Falcons</b><small>Team sites</small></span></a>
            <address>Danvers High School<br>60 Cabot Road, Danvers, MA 01923</address>
          </div>
          <nav aria-labelledby="fx-teams"><h2 id="fx-teams">Teams</h2><ul>
            ${TEAMS.map(([dir, name]) => `<li><a href="${ROOT}${dir}/">${name}</a></li>`).join("")}
          </ul>${seasons("light")}</nav>
          <nav aria-labelledby="fx-season"><h2 id="fx-season">${IN_FALL ? "Fall season" : "This season"}</h2><ul>
            ${SEASON.map(([id, name]) => `<li data-section="${id}"><a href="${home(id)}">${name}</a></li>`).join("")}
          </ul></nav>
          <nav aria-labelledby="fx-follow"><h2 id="fx-follow">Follow</h2><ul>
            <li><a href="${ROOT}newsletter/">Newsletter</a></li>
            <li><a href="https://www.instagram.com/danversfalconsathletics/" ${OUT} aria-label="Instagram, @danversfalconsathletics">Instagram</a></li>
            <li><a href="${ROOT}calendars/all-sports.ics">Calendar feed</a></li>
            <li><a href="https://www.danversfalconsathletics.com/" ${OUT}>Official Falcons Athletics</a></li>
          </ul></nav>
        </div>
        <div class="fx-word" aria-hidden="true">${[..."Falcons"].map((c) => `<span>${c}</span>`).join("")}</div>
        <div class="fx-legal">
          <span>A Danvers High School DECA student project. Not the official school website.</span>
          <a href="https://www.danversfalconsathletics.com/" ${OUT}>Official Falcons Athletics ↗</a>
        </div>
      </div>`;

    /* on the homepage, a link only shows while its section does */
    if (ON_HUB) {
      const sync = () => foot.querySelectorAll("li[data-section]").forEach((li) => {
        const sec = document.getElementById(li.dataset.section);
        li.hidden = !sec || sec.hidden;
      });
      sync();
      SEASON.forEach(([id]) => {
        const sec = document.getElementById(id);
        if (sec) new MutationObserver(sync).observe(sec, { attributes: true, attributeFilter: ["hidden"] });
      });
    }
  }

  footer();

  /* ---------- Team sites: one round Menu button and a full-screen menu ---------- */
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SPORT = TEAMS.find(([dir]) => here.split("/")[0] === dir);
  /* the sport's own pages, in this order, with the names visitors know them by */
  const PAGE_ORDER = ["index.html", "schedule.html", "stats.html", "runners.html", "seasons.html", "history.html", "media.html"];
  const FILM = ["football", "soccer", "field-hockey", "volleyball"];   // their media pages are game film and highlights
  const pageName = (file, label, dir) =>
    file === "stats.html" && label === "Stats" ? "Roster & stats" : file === "media.html" ? (FILM.includes(dir) ? "Highlights" : "Media") : label;
  /* each team site is one long page; the old pages are its sections */
  const SECTION_OF = { "index.html": "top", "schedule.html": "schedule", "stats.html": "stats", "runners.html": "runners", "seasons.html": "seasons", "history.html": "history", "media.html": "media" };

  function sportMenu() {
    const bar = document.querySelector(".site-header .hbar");
    const siteNav = bar && bar.querySelector(".nav");
    if (!SPORT || !siteNav) return;
    const [dir, name] = SPORT;
    document.documentElement.classList.add("fx-sport");
    const file = (here.split("/")[1] || "index.html");
    const onHome = file === "index.html";

    /* the sport's parts come from the site's own menu (names and order); on the one long page each is a jump to its section */
    const pages = [...siteNav.querySelectorAll("a")].map((a) => {
      const f = a.getAttribute("href").split("?")[0];
      const id = SECTION_OF[f], sec = id && document.getElementById(id);
      return { href: sec ? `#${id}` : a.getAttribute("href"), file: f, id: sec ? id : null, label: pageName(f, a.textContent.trim(), dir), current: !sec && a.classList.contains("active") };
    }).sort((a, b) => PAGE_ORDER.indexOf(a.file) - PAGE_ORDER.indexOf(b.file));
    const homeHref = (pages.find((p) => p.file === "index.html") || { href: "index.html" }).href;

    /* header: the Menu button at the end */
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "fx-menu-btn";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "fx-menu");
    btn.innerHTML = "Menu";
    bar.appendChild(btn);

    /* the full-screen menu */
    const team = document.querySelector(".brand-text small");
    const menu = document.createElement("div");
    menu.className = "fx-menu";
    menu.id = "fx-menu";
    menu.hidden = true;
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-modal", "true");
    menu.setAttribute("aria-label", "Menu");
    let i = 0;
    const HERE = '<small aria-hidden="true">You’re here</small>';
    const link = (href, label, current, section) =>
      `<li><a href="${href}" style="--i:${i++}"${section ? ` data-section="${section}"` : ""}${current ? ' aria-current="page"' : ""}>${label}${current ? HERE : ""}</a></li>`;
    /* "Back to": all sports, and this sport's home (not shown on the home page itself) */
    const backs = link(`${FRONT}#teams`, IN_FALL ? "Fall sports" : "All sports", false) + (onHome ? "" : link(homeHref, `${name} home`, false));
    menu.innerHTML = `
      <div class="wrap fx-menu-top">
        <span class="fx-menu-tag">Danvers Falcons · ${team ? team.textContent : name}</span>
        <button class="fx-menu-close" type="button" aria-label="Close menu">×</button>
      </div>
      <div class="wrap fx-menu-body">
        <nav class="fx-menu-back" aria-labelledby="fx-m-back"><h2 id="fx-m-back">Back to</h2><ul>${backs}</ul></nav>
        <nav aria-labelledby="fx-m-this"><h2 id="fx-m-this">This sport</h2><ul>${pages.map((p) => link(p.href, p.label, p.current, p.id)).join("")}</ul></nav>
        <nav aria-labelledby="fx-m-other"><h2 id="fx-m-other">Other sports</h2><ul>${TEAMS.filter(([d]) => d !== dir).map(([d, n]) => link(`${ROOT}${d}/`, n, false)).join("")}</ul>
          ${seasons("big", ` style="--i:${i++}"`)}</nav>
      </div>`;
    document.body.appendChild(menu);

    const focusables = () => [...menu.querySelectorAll("a[href], button")].filter((el) => el.getClientRects().length);   // only the ones showing

    /* "You're here": the section that's on screen when the menu opens (the last one whose top has passed
       a line a quarter of the way down the screen, under the header) */
    const chapters = pages.filter((p) => p.id).map((p) => document.getElementById(p.id));
    const header = document.querySelector(".site-header");
    const markHere = () => {
      if (!chapters.length) return;
      const line = (header ? header.getBoundingClientRect().bottom : 0) + innerHeight * .25;
      let cur = chapters[0];
      chapters.forEach((c) => { if (c.getBoundingClientRect().top <= line) cur = c; });
      menu.querySelectorAll("a[data-section]").forEach((a) => {
        const on = a.dataset.section === cur.id;
        a.querySelector("small")?.remove();
        if (on) { a.setAttribute("aria-current", "location"); a.insertAdjacentHTML("beforeend", HERE); }
        else a.removeAttribute("aria-current");
      });
    };

    const open = () => {
      markHere();
      const r = btn.getBoundingClientRect();
      menu.style.setProperty("--cx", `${r.left + r.width / 2}px`);
      menu.style.setProperty("--cy", `${r.top + r.height / 2}px`);
      menu.hidden = false;
      menu.classList.remove("open");
      void menu.offsetWidth;   // restart the opening animation
      menu.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("fx-menu-open");
      Sound.swish();
      menu.querySelector(".fx-menu-close").focus();
      hint.done();
    };
    const close = (refocus = true) => {
      if (menu.hidden) return;
      menu.hidden = true;
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("fx-menu-open");
      if (refocus) btn.focus();
    };
    btn.addEventListener("click", open);
    /* a section link: close the menu and glide there (straight there with reduced motion); keyboard focus moves with it */
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-section]");
      const sec = a && document.getElementById(a.dataset.section);
      if (!sec) return;
      e.preventDefault();
      close(false);
      jump(sec);
    });
    menu.querySelector(".fx-menu-close").addEventListener("click", close);
    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    /* leaving the page by a menu link: put the page back the way it was for the back button */
    addEventListener("pagehide", () => { menu.hidden = true; menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); document.documentElement.classList.remove("fx-menu-open"); });

    /* a visitor's first time on any team site: a one-time note under the Menu button, which pulses a few times.
       It goes when they open the Menu, close the note, or after 8 seconds, and never comes back. */
    const hint = menuHint(btn, name, pages);

    /* "Next up": a small note in the bottom corner names the section after the one on screen, so nobody stops
       scrolling too soon; it comes in once the visitor starts scrolling, goes on the last section, and a click glides there */
    const parts = pages.filter((p) => p.id && document.getElementById(p.id));
    if (parts.length > 1) {
      const nx = document.createElement("a");
      nx.className = "fx-next";
      nx.innerHTML = '<span class="fx-next-txt" aria-hidden="true"><span class="fx-next-k">Next up</span><b></b></span><span class="fx-next-arrow" aria-hidden="true"></span>';
      document.body.appendChild(nx);
      let next = null, queued = false;
      const place = () => {
        queued = false;
        const line = (header ? header.getBoundingClientRect().bottom : 0) + innerHeight * .25;
        let n = 0;
        parts.forEach((p, k) => { if (document.getElementById(p.id).getBoundingClientRect().top <= line) n = k; });
        const want = parts[n + 1] || null;
        if (want && want !== next) {
          nx.href = `#${want.id}`;
          nx.querySelector("b").textContent = want.label;
          nx.setAttribute("aria-label", `Next up: ${want.label}`);
        }
        next = want;
        const on = !!next && scrollY > 60;
        nx.classList.toggle("on", on);
        nx.tabIndex = on ? 0 : -1;
      };
      addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(place); } }, { passive: true });
      addEventListener("resize", place);
      addEventListener("load", place, { once: true });
      place();
      nx.addEventListener("click", (e) => {
        const sec = next && document.getElementById(next.id);
        if (!sec) return;
        e.preventDefault();
        jump(sec);
      });
    }

    /* sections sit just below the sticky header when jumped to */
    const headRoom = () => document.documentElement.style.setProperty("--fx-head", `${header ? header.offsetHeight : 0}px`);
    headRoom();
    addEventListener("resize", headRoom);
    /* arriving with a section in the address (an old page's address, a search result): land on it once everything is drawn */
    const want = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (want && chapters.includes(want)) addEventListener("load", () => jump(want, { smooth: false, focus: false }), { once: true });
    /* in-page links to a section ("Full schedule"): the same glide as the menu */
    document.addEventListener("click", (e) => {
      const a = e.target.closest('main a[href^="#"]');
      const sec = a && document.getElementById(a.getAttribute("href").slice(1));
      if (!sec || !chapters.includes(sec)) return;
      e.preventDefault();
      jump(sec);
    });
  }

  /* go to a section of the long page: a glide (straight there with reduced motion), then it stays lined up under the
     header while photos and logos above finish loading and push things down; scrolling yourself stops that at once */
  let jumpRun = 0;
  function jump(sec, { smooth = !REDUCED, focus = true } = {}) {
    const run = ++jumpRun;
    const html = document.documentElement, header = document.querySelector(".site-header");
    const toGo = () => (sec.id === "top" ? -scrollY : sec.getBoundingClientRect().top - (header ? header.getBoundingClientRect().bottom : 0));
    const instant = (dy) => { const was = html.style.scrollBehavior; html.style.scrollBehavior = "auto"; scrollBy(0, dy); html.style.scrollBehavior = was; };
    if (smooth) scrollBy({ top: toGo(), behavior: "smooth" }); else instant(toGo());
    history.replaceState(null, "", sec.id === "top" ? location.pathname + location.search : `#${sec.id}`);
    if (focus) { sec.setAttribute("tabindex", "-1"); sec.focus({ preventScroll: true }); }

    const TAKEOVER = ["wheel", "touchstart", "keydown", "pointerdown"];
    const stop = () => { if (run === jumpRun) jumpRun++; TAKEOVER.forEach((t) => removeEventListener(t, stop, true)); };
    TAKEOVER.forEach((t) => addEventListener(t, stop, { capture: true, passive: true }));
    const t0 = performance.now();
    let lastY = scrollY, still = t0;
    const tick = () => {
      if (run !== jumpRun) return;
      const now = performance.now();
      if (Math.abs(scrollY - lastY) > .5) { lastY = scrollY; still = now; }   // still gliding
      else if (now - still > 150) {   // settled: line it back up if something above changed height
        const d = toGo();
        if (Math.abs(d) > 2) { instant(d); lastY = scrollY; still = now; }
      }
      if (now - t0 < 2500) requestAnimationFrame(tick); else stop();
    };
    requestAnimationFrame(tick);
  }

  function menuHint(btn, name, pages) {
    const KEY = "df-menu-hint";
    const header = btn.closest(".site-header");
    let seen = true;
    try { seen = localStorage.getItem(KEY) === "seen"; } catch (e) { /* storage blocked: skip the note */ }
    const remember = () => { try { localStorage.setItem(KEY, "seen"); } catch (e) { /* this page only */ } };
    if (seen || !header) return { done() {} };

    const tip = document.createElement("div");
    tip.className = "fx-hint";
    tip.setAttribute("role", "status");
    const list = pages.filter((p) => p.file !== "index.html").map((p) => p.label).join(", ");
    tip.innerHTML = `<b>Jump to any part of the ${name.toLowerCase()} page</b><span>${list}</span><button type="button" class="fx-hint-x" aria-label="Close this note">×</button>`;
    header.appendChild(tip);
    /* sit just under the Menu button, with the little pointer under its middle */
    const place = () => {
      const r = btn.getBoundingClientRect(), h = header.getBoundingClientRect();
      const right = Math.max(12, h.right - r.right);
      tip.style.top = `${r.bottom - h.top + 12}px`;
      tip.style.right = `${right}px`;
      tip.style.setProperty("--ax", `${h.right - (r.left + r.width / 2) - right - 7}px`);
    };
    let timer = 0, gone = false;
    const done = () => {
      if (gone) return;
      gone = true;
      remember();
      clearTimeout(timer);
      removeEventListener("resize", place);
      btn.classList.remove("fx-nudge");
      tip.classList.remove("show");
      setTimeout(() => tip.remove(), 400);
    };
    tip.querySelector(".fx-hint-x").addEventListener("click", done);
    timer = setTimeout(() => {
      place();
      addEventListener("resize", place);
      tip.classList.add("show");
      btn.classList.add("fx-nudge");
      remember();   // shown once is enough, even if they leave before it closes
      timer = setTimeout(done, 8000);
    }, 1200);
    return { done };
  }

  sportMenu();

  /* ---------- Hover effects ---------- */
  /* every button gets an arrow that tilts on hover: a "↗" already in the label is used, otherwise a "→" is added
     (not on the calendar dropdown or buttons that carry their own icon) */
  const ARROW = /\s*([↗→])\s*$/;
  function arrow(btn) {
    if (btn.querySelector(".fx-ico, svg") || btn.classList.contains("addcal-toggle")) return;
    const last = btn.lastChild;
    const m = last && last.nodeType === 3 && last.data.match(ARROW);
    if (m) last.data = last.data.replace(ARROW, "");
    btn.insertAdjacentHTML("beforeend", `<span class="fx-ico${m && m[1] === "↗" ? " ext" : ""}" aria-hidden="true">${m ? m[1] : "→"}</span>`);
  }
  const arrows = (root) => root.querySelectorAll && root.querySelectorAll(".btn").forEach(arrow);
  arrows(document);
  /* the pages draw some buttons after loading, and some set a button's words later */
  new MutationObserver((list) => list.forEach((m) => {
    const btn = m.target.closest && m.target.closest(".btn");
    if (btn) arrow(btn);
    m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.matches(".btn")) arrow(n); else arrows(n); } });
  })).observe(document.body, { childList: true, subtree: true });

  /* tilt, pull and the custom cursor: only with a mouse, and never with reduced motion */
  const MOUSE = matchMedia("(hover: hover) and (pointer: fine)");
  const MOTION_OK = matchMedia("(prefers-reduced-motion: no-preference)");
  const fancy = (e) => e.pointerType === "mouse" && MOUSE.matches && MOTION_OK.matches;
  const CARDS = ".team-card, .card.lift, .card.scoreboard, .card.next-game";
  const PULL = ".btn, .fx-menu-btn";

  let tilted = null, pulled = null;
  const untilt = () => {
    if (!tilted) return;
    tilted.classList.remove("fx-tilting");
    tilted.style.removeProperty("transform");
    tilted = null;
  };
  const unpull = () => {
    if (!pulled) return;
    pulled.style.removeProperty("transform");
    pulled = null;
  };
  addEventListener("pointermove", (e) => {
    if (!fancy(e)) { untilt(); unpull(); return; }
    /* cards: lean toward the mouse, with a soft shine under it */
    const card = e.target.closest(CARDS);
    if (card !== tilted) untilt();
    if (card) {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const amt = r.width > 600 ? 3 : 6;
      tilted = card;
      card.classList.add("fx-tilting");
      card.style.transform = `perspective(1000px) rotateX(${(-(y / r.height - .5) * amt).toFixed(2)}deg) rotateY(${((x / r.width - .5) * amt).toFixed(2)}deg) translateY(-4px)`;
      card.style.setProperty("--fx-gx", `${x}px`);
      card.style.setProperty("--fx-gy", `${y}px`);
    }
    /* buttons: pull slightly toward the mouse */
    const btn = e.target.closest(PULL);
    if (btn !== pulled) unpull();
    if (btn) {
      pulled = btn;
      /* measure from where the button's center sits at rest, minus the pull it already has */
      const r = btn.getBoundingClientRect(), t = getComputedStyle(btn).transform;
      const now = t && t !== "none" ? new DOMMatrixReadOnly(t) : { e: 0, f: 0 };
      const dx = (e.clientX - (r.left + r.width / 2 - now.e)) * .2, dy = (e.clientY - (r.top + r.height / 2 - now.f)) * .32;
      btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)${btn.matches(".fx-menu-btn") ? " scale(1.06)" : ""}`;
    }
  }, { passive: true });
  document.addEventListener("pointerout", (e) => { if (!e.relatedTarget) { untilt(); unpull(); } });

  /* custom cursor (every page): a small dot right on the mouse (it is the pointer; the normal one never shows),
     and a ring that follows a beat behind and grows over anything clickable */
  const CLICKABLE = `a[href], button, [role="button"], [role="tab"], input, select, textarea, label, summary, ${CARDS}`;
  /* rows and buttons that turn royal under the mouse, and buttons that turn white */
  const TURNS_DARK = ".game, .tb, .addcal.light .btn";
  const TURNS_LIGHT = ".btn, .fx-menu-btn, .fx-menu-close";
  function onDark(el, x, y) {
    if (el.closest(TURNS_DARK)) return true;
    if (el.closest(TURNS_LIGHT)) return false;
    /* look down through everything under the mouse until something solid: a photo, or a background color */
    for (const n of document.elementsFromPoint(x, y)) {
      if (n.tagName === "IMG" || n.tagName === "VIDEO") return true;
      const cs = getComputedStyle(n);
      if (/url\(/.test(cs.backgroundImage)) return true;   // photos
      /* a gradient that fills the box (pop-up and banner tops), not a thin link underline: judge it by its colors */
      if (/gradient/.test(cs.backgroundImage) && /^(auto|cover|100% 100%)/.test(cs.backgroundSize)) {
        const cols = [...cs.backgroundImage.matchAll(/rgba?\(([^)]+)\)/g)].map((m) => m[1].split(",").map(Number)).filter((c) => c.length < 4 || c[3] > .5);
        if (cols.length) return cols.reduce((sum, c) => sum + .2126 * c[0] + .7152 * c[1] + .0722 * c[2], 0) / cols.length < 140;
      }
      const c = cs.backgroundColor.match(/[\d.]+/g);
      if (c && (c.length < 4 || +c[3] > .5)) return .2126 * c[0] + .7152 * c[1] + .0722 * c[2] < 140;
    }
    return false;
  }
  function cursor() {
    const dot = document.createElement("div"), ring = document.createElement("div");
    dot.className = "fx-cursor";
    ring.className = "fx-ring";
    dot.setAttribute("aria-hidden", "true");
    ring.setAttribute("aria-hidden", "true");
    /* pop-ups (game details, search) open on the browser's top layer, above everything on the page; the dot and
       circle sit on that layer too and step back on top whenever a pop-up opens, so the normal pointer never has
       to come back (browsers too old for this keep the normal pointer inside pop-ups) */
    const TOP = typeof HTMLElement.prototype.showPopover === "function";
    if (TOP) [ring, dot].forEach((el) => el.setAttribute("popover", "manual"));
    document.body.append(ring, dot);
    const lift = () => [ring, dot].forEach((el) => { try { if (el.matches(":popover-open")) el.hidePopover(); el.showPopover(); } catch (e) { /* not supported */ } });
    if (TOP) {
      lift();
      new MutationObserver((list) => { if (list.some((m) => m.target.matches("dialog[open]"))) lift(); })
        .observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    }
    document.documentElement.classList.add("fx-circle-pointer");   // the dot and circle replace the normal pointer (see fx.css)
    if (TOP) document.documentElement.classList.add("fx-cursor-top");
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0, shown = false;
    const follow = () => {
      rx += (mx - rx) * .2;
      ry += (my - ry) * .2;
      ring.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(1)}px)`;
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > .2 ? requestAnimationFrame(follow) : 0;
    };
    const hide = () => { document.documentElement.classList.remove("fx-has-cursor"); shown = false; };
    addEventListener("pointermove", (e) => {
      if (!fancy(e)) { hide(); return; }
      mx = e.clientX; my = e.clientY;
      if (!shown) { rx = mx; ry = my; shown = true; document.documentElement.classList.add("fx-has-cursor"); }
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!raf) raf = requestAnimationFrame(follow);
    }, { passive: true });
    addEventListener("pointerover", (e) => {
      if (e.pointerType !== "mouse") return;
      const t = e.target;
      /* another site's frame can't be reached, and without the top layer neither can a pop-up */
      const away = t.tagName === "IFRAME" || (!TOP && !!t.closest("dialog[open]"));
      const dark = !away && onDark(t, e.clientX, e.clientY);
      ring.classList.toggle("gone", away);
      dot.classList.toggle("gone", away);
      ring.classList.toggle("big", !away && !!t.closest(CLICKABLE));
      ring.classList.toggle("on-dark", dark);
      dot.classList.toggle("on-dark", dark);
    });
    document.addEventListener("pointerout", (e) => { if (!e.relatedTarget) hide(); });
  }
  if (MOUSE.matches && MOTION_OK.matches) cursor();

  /* ---------- Sound effects (always on) ---------- */
  /* sound can start on any click, tap or key press (browsers differ on which one counts) */
  Sound.wake();
  ["pointerdown", "pointerup", "mousedown", "touchend", "click"].forEach((type) => document.addEventListener(type, Sound.unlock, { capture: true, passive: true }));
  addEventListener("pageshow", (e) => { if (e.persisted) Sound.revive(); });   // back to a page the browser kept in memory

  /* a tap on every click: on press with a mouse; on phones when the tap lands (that's when they allow sound) */
  let pressType = "mouse";
  const tapTarget = (t) => t.closest("a, button");
  document.addEventListener("pointerdown", (e) => {
    pressType = e.pointerType;
    if (e.pointerType === "mouse" && tapTarget(e.target)) Sound.click();
  }, true);
  document.addEventListener("click", (e) => {
    if (pressType !== "mouse" && e.detail > 0 && tapTarget(e.target)) Sound.click();
    pressType = "mouse";
  }, true);
  document.addEventListener("keydown", (e) => {
    Sound.unlock();
    const a = document.activeElement;
    if ((e.key === "Enter" || e.key === " ") && a && a.matches("a, button")) Sound.click();
  }, true);

  /* a soft tick on hover (mouse only) */
  const HOVERABLE = `a[href], button, [role="button"], [role="tab"], summary, ${CARDS}`;
  let lastHover = null;
  document.addEventListener("pointerover", (e) => {
    if (e.pointerType !== "mouse") return;
    const t = e.target.closest(HOVERABLE);
    if (t && t !== lastHover) { lastHover = t; Sound.hover(); } else if (!t) lastHover = null;
  });

  /* a swish when a menu or dropdown opens, or a tab or filter changes */
  const SWITCHES = '[aria-expanded], [role="tab"], [aria-pressed]';
  const isOn = (el) => ["aria-expanded", "aria-selected", "aria-pressed"].some((a) => el.getAttribute(a) === "true");
  let pressed = null;
  document.addEventListener("click", (e) => {
    const el = e.target.closest(SWITCHES);
    pressed = el && !el.matches(".fx-menu-btn") ? { el, was: isOn(el) } : null;   // the Menu button swishes on its own
  }, true);
  document.addEventListener("click", () => {
    if (pressed && !pressed.was && (!pressed.el.isConnected || isOn(pressed.el))) Sound.swish();
    pressed = null;
  });
  /* pop-up windows: game details, search, the app sheet */
  new MutationObserver((list) => {
    if (list.some((m) => m.target.matches("dialog[open], details[open]"))) Sound.swish();
  }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
})();
