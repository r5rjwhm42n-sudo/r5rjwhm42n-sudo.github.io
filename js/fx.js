/* =====================================================================
   Shared effects for every page (hub, newsletter and all team sites).
   Load it last: <script src="(path to)/js/fx.js"></script>
     · the site footer, drawn into <footer id="site-footer">
     · team sites: a round Menu button with a full-screen menu, which holds
       "All sports" / "[Sport] home" and every page of every sport
     · hover effects: button sweeps and arrows, a pull toward the mouse, card tilt
       and shine, and a dot-and-ring cursor (the last three for a mouse only)
   ===================================================================== */
(function () {
  const ROOT = new URL("..", document.currentScript.src).href;   // the site root, from /js/fx.js
  const ON_HUB = !!document.querySelector(".hub-hero");
  const OUT = 'target="_blank" rel="noopener"';
  const FX = { sound: { hover() {}, click() {}, swish() {}, chime() {} } };   // the sounds come in below

  /* ---------- Footer ---------- */
  const TEAMS = [["football", "Football"], ["soccer", "Soccer"], ["field-hockey", "Field hockey"], ["volleyball", "Volleyball"],
                 ["cross-country", "Cross country"], ["golf", "Golf"], ["esports", "Esports"]];
  /* homepage sections; "State tournament" and "Latest results" only show when there's something in them */
  const SEASON = [["week", "Coming up"], ["road", "State tournament"], ["latest", "Latest results"], ["photos", "Photos"], ["tradition", "A winning tradition"]];

  function footer() {
    const foot = document.getElementById("site-footer");
    if (!foot) return;
    const home = (id) => (ON_HUB ? `#${id}` : `${ROOT}#${id}`);
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
          </ul></nav>
          <nav aria-labelledby="fx-season"><h2 id="fx-season">This season</h2><ul>
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

  /* ---------- Sport pages: one round Menu button, plus "All sports" and "[Sport] home" ---------- */
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const here = location.href.startsWith(ROOT) ? location.href.slice(ROOT.length).split(/[?#]/)[0] : "";
  const SPORT = TEAMS.find(([dir]) => here.split("/")[0] === dir);
  /* the sport's own pages, in this order, with the names visitors know them by */
  const PAGE_ORDER = ["index.html", "schedule.html", "stats.html", "runners.html", "history.html", "media.html"];
  const FILM = ["football", "soccer", "field-hockey", "volleyball"];   // their media pages are game film and highlights
  const pageName = (file, label, dir) =>
    file === "stats.html" && label === "Stats" ? "Roster & stats" : file === "media.html" ? (FILM.includes(dir) ? "Highlights" : "Media") : label;

  function sportMenu() {
    const bar = document.querySelector(".site-header .hbar");
    const siteNav = bar && bar.querySelector(".nav");
    if (!SPORT || !siteNav) return;
    const [dir, name] = SPORT;
    document.documentElement.classList.add("fx-sport");
    const file = (here.split("/")[1] || "index.html");
    const onHome = file === "index.html";

    /* the sport's pages come from the site's own menu, so soccer keeps its ?team= */
    const pages = [...siteNav.querySelectorAll("a")].map((a) => {
      const f = a.getAttribute("href").split("?")[0];
      return { href: a.getAttribute("href"), file: f, label: pageName(f, a.textContent.trim(), dir), current: a.classList.contains("active") };
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
    const pill = (href, label) => `<a class="fx-pill" href="${href}" style="--i:${i++}"><span class="fx-arr" aria-hidden="true">←</span>${label}</a>`;
    const backs = pill(`${ROOT}#teams`, "All sports") + (onHome ? "" : pill(homeHref, `${name} home`));
    const link = (href, label, current) =>
      `<li><a href="${href}" style="--i:${i++}"${current ? ' aria-current="page"' : ""}>${label}${current ? '<small aria-hidden="true">You’re here</small>' : ""}</a></li>`;
    menu.innerHTML = `
      <div class="wrap fx-menu-top">
        <span class="fx-menu-tag">Danvers Falcons · ${team ? team.textContent : name}</span>
        <button class="fx-menu-close" type="button" aria-label="Close menu">×</button>
      </div>
      <div class="wrap fx-menu-back">${backs}</div>
      <div class="wrap fx-menu-body">
        <nav aria-labelledby="fx-m-this"><h2 id="fx-m-this">This sport</h2><ul>${pages.map((p) => link(p.href, p.label, p.current)).join("")}</ul></nav>
        <nav aria-labelledby="fx-m-other"><h2 id="fx-m-other">Other sports</h2><ul>${TEAMS.filter(([d]) => d !== dir).map(([d, n]) => link(`${ROOT}${d}/`, n, false)).join("")}</ul></nav>
      </div>`;
    document.body.appendChild(menu);

    const focusables = () => [...menu.querySelectorAll("a[href], button")];
    const open = () => {
      const r = btn.getBoundingClientRect();
      menu.style.setProperty("--cx", `${r.left + r.width / 2}px`);
      menu.style.setProperty("--cy", `${r.top + r.height / 2}px`);
      menu.hidden = false;
      menu.classList.remove("open");
      void menu.offsetWidth;   // restart the opening animation
      menu.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("fx-menu-open");
      FX.sound.swish();
      menu.querySelector(".fx-menu-close").focus();
    };
    const close = () => {
      if (menu.hidden) return;
      menu.hidden = true;
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("fx-menu-open");
      btn.focus();
    };
    btn.addEventListener("click", open);
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

  /* custom cursor: a small dot, and a ring that follows a beat behind and grows over anything clickable */
  const CLICKABLE = `a[href], button, [role="button"], [role="tab"], input, select, textarea, label, summary, ${CARDS}`;
  /* rows and buttons that turn royal under the mouse, and buttons that turn white */
  const TURNS_DARK = ".game, .tb, .addcal.light .btn";
  const TURNS_LIGHT = ".btn, .fx-pill, .fx-menu-btn, .fx-menu-close";
  function onDark(el, x, y) {
    if (el.closest(TURNS_DARK)) return true;
    if (el.closest(TURNS_LIGHT)) return false;
    /* look down through everything under the mouse until something solid: a photo, or a background color */
    for (const n of document.elementsFromPoint(x, y)) {
      if (n.tagName === "IMG" || n.tagName === "VIDEO") return true;
      const cs = getComputedStyle(n);
      if (/url\(/.test(cs.backgroundImage)) return true;   // photos
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
    document.body.append(ring, dot);
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
      /* windows that open on top of the page (videos, the app sheet) keep the normal pointer */
      const away = t.tagName === "IFRAME" || !!t.closest("dialog[open]");
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
})();
