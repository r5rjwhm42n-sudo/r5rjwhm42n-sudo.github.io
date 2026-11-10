/* =====================================================================
   Extras for every team site (loaded after the site's own site.js):
     · Share result: a finished game's popup can turn into a 1080×1350
       final-score graphic, ready for Instagram or a group chat
     · Forecast and directions in upcoming games' popups
     · Game-day bar across the top of the site on game days, with a
       pulsing LIVE badge while the game is on
     · Search deep links: #p=Name scrolls to that player's card
   Needs js/common.js (window.DFA) and the site's data.js.
   ===================================================================== */
(function () {
  const SPORT = location.pathname.split("/").filter(Boolean)[0];
  const SITE = "danversfalconsathletics.org";
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (iso, o) => new Date(iso).toLocaleString("en-US", o);
  const squad = () => document.body.dataset.team || (typeof DEFAULT_TEAM !== "undefined" ? DEFAULT_TEAM : "girls");
  const LABELS = { football: "Football", "field-hockey": "Field Hockey", volleyball: "Volleyball", golf: "Golf", "cross-country": "Cross Country", esports: "Esports" };
  const label = () => (SPORT === "soccer" ? `${squad() === "boys" ? "Boys" : "Girls"} Soccer` : LABELS[SPORT] || "");

  /* ---------- this sport's games ---------- */
  function games() {
    if (SPORT === "soccer") return TEAMS[squad()].schedule;
    if (SPORT === "cross-country") return MEETS;
    return typeof SCHEDULE !== "undefined" ? SCHEDULE : [];
  }
  const team = () => (SPORT === "soccer" ? TEAMS[squad()] : typeof TEAM !== "undefined" ? TEAM : {});
  const ran = (m, k) => m[k] && (m[k].result || m[k].place || m[k].finishers?.length);
  const finished = (g) => (SPORT === "cross-country" ? ran(g, "boys") || ran(g, "girls") : !!(g.result || g.finish));
  const matchup = (g) => (g.name ? g.name : g.tournament ? g.opponent : `${g.home === false || (!g.home && SPORT !== "cross-country") ? "at" : "vs"} ${g.opponent}`);
  const kind = (g) => (g.scrimmage ? "Scrimmage" : g.postseason ? "Postseason" : g.tournament ? (g.league ? "NEC tournament" : "MIAA tournament") : g.league ? "NEC" : "Non-league");

  function watchUrl(g) {
    const own = (g.sources || []).find((s) => s.url && /livestream|watch live/i.test(s.label));
    if (own) return own.url;
    const links = team().links || {};
    if (SPORT === "volleyball" && g.home) return "https://www.nfhsnetwork.com/schools/6d1b1b0797";
    if (["football", "soccer", "field-hockey", "volleyball"].includes(SPORT)) return links.hudl || null;
    return null;
  }

  /* =================================================================
     SHARE RESULT
     ================================================================= */
  const short = (name) => { const p = name.split(" "); return p.length > 1 ? `${p[0][0]}. ${p.slice(1).join(" ")}` : name; };
  const list = (pairs) => pairs.map(([n, k]) => (k > 1 ? `${n} ${k}` : n)).join(", ");

  /* What the graphic shows for each sport */
  function model(g) {
    const m = { sport: label(), date: g.date, kind: "score", result: g.result, us: g.us, them: g.them,
                opponent: g.opponent, matchup: matchup(g), tag: kind(g), heading: "Top performers", lines: [] };
    if (SPORT === "football") m.lines = (g.performers || []).slice(0, 3).map((p) => [p.name, p.line]);
    if (SPORT === "soccer" || SPORT === "field-hockey") {
      m.heading = "Scoring";
      if (g.scorers?.length) m.lines.push(["Goals", list(g.scorers)]);
      if (g.assists?.length) m.lines.push(["Assists", list(g.assists)]);
      if (g.saves?.length) m.lines.push(["Saves", g.saves.map(([n, k]) => `${n} ${k}`).join(", ")]);
      else if (g.shutout?.length) m.lines.push(["Shutout", g.shutout.join(" & ")]);
      if (!m.lines.length) m.heading = "";
    }
    if (SPORT === "volleyball") {
      m.heading = "Match leaders";
      if (g.sets?.length) m.lines.push(["Sets", g.sets.map(([a, b]) => `${a}–${b}`).join("   ")]);
      const box = Object.entries(g.box || {});
      [["Kills", 1], ["Digs", 4], ["Assists", 5], ["Aces", 2]].forEach(([stat, i]) => {
        const top = box.reduce((best, row) => (row[1][i] > (best?.[1][i] ?? 0) ? row : best), null);
        if (top && m.lines.length < 4) m.lines.push([stat, `${top[0]} ${top[1][i]}`]);
      });
    }
    if (SPORT === "golf") {
      if (g.finish) {
        Object.assign(m, { kind: "place", place: g.finish, of: g.fieldSize, detail: `${g.us} · ${g.toPar}`, matchup: g.opponent });
        m.heading = "Falcons' scores";
        m.lines = (g.rounds || []).slice(0, 4).map(([n, s]) => [n, `${s}`]);
      } else {
        m.heading = "Falcons' results";
        m.lines = [...(g.cards || []).filter(([, f, a]) => f > a).map(([n, f, a]) => [n, `Won ${f}–${a}`]),
                   ...(g.points || []).map(([n, p]) => [n, `${p} points`]),
                   ...(g.rounds || []).map(([n, s]) => [n, `Shot ${s}`])].slice(0, 4);
      }
    }
    if (SPORT === "cross-country") {
      m.kind = "xc";
      m.rows = [["Boys", g.boys], ["Girls", g.girls]].filter(([, r]) => r && (r.result || r.finishers?.length));
      m.heading = "Front runners";
      m.lines = m.rows.map(([k, r]) => {
        const f = r.finishers?.[0];
        return f ? [k, [f.name, f.place ? ordinal(f.place) : null, f.time].filter(Boolean).join(" · ")] : null;
      }).filter(Boolean);
    }
    if (!m.lines.length) m.heading = "";
    return m;
  }
  const ordinal = (n) => n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");

  let logo = null;
  const loadLogo = () => (logo = logo || new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = "images/falcons-logo.png"; }));
  const fontsReady = () => Promise.all(['800 120px "Saira Condensed"', '700 40px "Saira Condensed"', '600 34px "Source Sans 3"', '700 34px "Source Sans 3"']
    .map((f) => document.fonts.load(f).catch(() => null)));
  const D = '"Saira Condensed", "Arial Narrow", Impact, sans-serif', B = '"Source Sans 3", -apple-system, "Segoe UI", sans-serif';

  async function draw(m) {
    const W = 1080, H = 1350, P = 92;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const x = c.getContext("2d");
    const [img] = await Promise.all([loadLogo(), fontsReady()]);
    const spaced = (em) => { if ("letterSpacing" in x) x.letterSpacing = `${em}em`; };
    const font = (w, px, fam = D) => { x.font = `${w} ${px}px ${fam}`; };
    const fit = (text, max, px, w = 800) => { do { font(w, px); } while (x.measureText(text).width > max && (px -= 4) > 20); return px; };
    const pill = (text, cx, y, bg, fg, px = 34, align = "left") => {
      spaced(.12); font(800, px);
      const w = x.measureText(text).width + px * 1.1, h = px * 1.45, left = align === "right" ? cx - w : cx;
      x.fillStyle = bg; x.beginPath(); x.roundRect(left, y, w, h, 4); x.fill();
      x.fillStyle = fg; x.textBaseline = "middle"; x.fillText(text, left + px * .55, y + h / 2 + 2); x.textBaseline = "alphabetic";
      spaced(0);
      return w;
    };

    /* backdrop: the site's hero gradient, light bars and a falcon watermark */
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#0b1f4d"); g.addColorStop(.62, "#18479f"); g.addColorStop(1, "#2459c2");
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.save(); x.translate(W * .6, 0); x.transform(1, 0, -.32, 1, 0, 0);
    x.fillStyle = "rgba(255,255,255,.06)"; x.fillRect(0, 0, 120, H);
    x.fillStyle = "rgba(255,255,255,.035)"; x.fillRect(175, 0, 70, H); x.fillRect(300, 0, 36, H);
    x.restore();
    if (img) {
      const t = document.createElement("canvas"); t.width = t.height = 680;
      const tx = t.getContext("2d"); tx.drawImage(img, 0, 0, 680, 680);
      tx.globalCompositeOperation = "source-in"; tx.fillStyle = "#fff"; tx.fillRect(0, 0, 680, 680);
      x.globalAlpha = .08; x.drawImage(t, W - 520, H - 620, 680, 680); x.globalAlpha = 1;
    }

    /* header: badge, school, sport, FINAL + date */
    x.beginPath(); x.arc(P + 58, 136, 64, 0, Math.PI * 2); x.fillStyle = "#fff"; x.fill();
    x.lineWidth = 7; x.strokeStyle = "#f0b429"; x.beginPath(); x.arc(P + 58, 136, 60, 0, Math.PI * 2); x.stroke();
    if (img) x.drawImage(img, P + 58 - 46, 136 - 46, 92, 92);
    x.fillStyle = "#c5d4f5"; spaced(.18); font(700, 30); x.fillText("DANVERS FALCONS", P + 150, 116); spaced(.01);
    x.fillStyle = "#fff"; fit(m.sport.toUpperCase(), 520, 72); x.fillText(m.sport.toUpperCase(), P + 148, 180); spaced(0);
    pill("FINAL", W - P, 82, "#f0b429", "#0b1f4d", 34, "right");
    x.fillStyle = "#dbe5fb"; font(600, 30, B); x.textAlign = "right";
    x.fillText(fmt(m.date, { weekday: "short", month: "short", day: "numeric", year: "numeric" }), W - P, 188); x.textAlign = "left";

    /* matchup line with a gold slash */
    x.save(); x.translate(P, 262); x.transform(1, 0, -.25, 1, 0, 0); x.fillStyle = "#f0b429"; x.fillRect(0, 0, 14, 54); x.restore();
    spaced(.14); font(700, 24);
    const tw = m.tag ? x.measureText(m.tag.toUpperCase()).width + 30 : 0;
    x.fillStyle = "#fff"; spaced(.06);
    const line = `${m.matchup}`.toUpperCase();
    fit(line, W - P * 2 - 34 - tw - 24, 50); x.fillText(line, P + 34, 307); spaced(0);
    if (m.tag) {
      spaced(.14); font(700, 24);
      x.strokeStyle = "rgba(197,212,245,.55)"; x.lineWidth = 2; x.beginPath(); x.roundRect(W - P - tw, 266, tw, 44, 4); x.stroke();
      x.fillStyle = "#dbe5fb"; x.textAlign = "center"; x.fillText(m.tag.toUpperCase(), W - P - tw / 2, 297); x.textAlign = "left"; spaced(0);
    }

    /* the result (centered in the card when there's no stats panel below it) */
    const panel = !!(m.heading && m.lines.length);
    const tall = m.kind === "score" ? 560 : m.kind === "place" ? 400 : (m.rows?.length || 1) * 190 + 60;
    let y = panel ? 360 : 360 + Math.max(0, (840 - tall) / 2 - 30);
    if (m.kind === "score") {
      const win = m.result === "W", tie = m.result === "T";
      const rows = [["DANVERS", m.us, win || tie], [String(m.opponent).toUpperCase(), m.them, !win || tie]];
      rows.forEach(([name, score, lead], i) => {
        const top = y + i * 230;
        x.globalAlpha = lead ? 1 : .5;
        x.fillStyle = "#fff"; font(800, 230); x.textAlign = "right"; x.fillText(String(score), W - P, top + 205); x.textAlign = "left";
        const room = W - P * 2 - x.measureText(String(score)).width - 40;
        x.fillStyle = "#fff"; spaced(.01); fit(name, room, 104); x.fillText(name, P, top + 175); spaced(0);
        x.globalAlpha = 1;
      });
      x.fillStyle = "rgba(255,255,255,.18)"; x.fillRect(P, y + 222, W - P * 2, 3);
      const word = { W: "WIN", L: "LOSS", T: "TIE" }[m.result] || "FINAL";
      pill(word, P, y + 470, m.result === "W" ? "#1a8a4a" : m.result === "L" ? "#c8322b" : "#5b647a", "#fff", 30);
      y += 560;
    } else if (m.kind === "place") {
      x.fillStyle = "#fff"; font(800, 330); x.fillText(String(m.place).toUpperCase(), P - 6, y + 300);
      const w = x.measureText(String(m.place).toUpperCase()).width;
      x.fillStyle = "#dbe5fb"; spaced(.06); font(700, 54); x.fillText(`OF ${m.of} TEAMS`, P + w + 26, y + 220);
      x.fillStyle = "#f0b429"; font(800, 54); x.fillText(m.detail, P + w + 26, y + 290); spaced(0);
      y += 400;
    } else if (m.kind === "xc") {
      m.rows.forEach(([k, r], i) => {
        const top = y + i * 190;
        x.fillStyle = "#fff"; spaced(.02); font(800, 110); x.fillText(k.toUpperCase(), P, top + 130); spaced(0);
        if (r.result) {
          x.textAlign = "right"; font(800, 150); x.fillText(`${r.us}–${r.them}`, W - P, top + 140); x.textAlign = "left";
          const kw = (font(800, 110), x.measureText(k.toUpperCase()).width);
          pill(r.result === "W" ? "WIN" : "LOSS", P + kw + 30, top + 66, r.result === "W" ? "#1a8a4a" : "#c8322b", "#fff", 30);
        } else if (r.race) {
          x.fillStyle = "#dbe5fb"; font(600, 34, B); x.textAlign = "right"; x.fillText(r.race, W - P, top + 124); x.textAlign = "left";
        }
      });
      if (m.rows.some(([, r]) => r.result)) {
        x.fillStyle = "#c5d4f5"; spaced(.14); font(700, 26); x.fillText("LOW SCORE WINS", P, y + m.rows.length * 190 + 20); spaced(0);
      }
      y += m.rows.length * 190 + 60;
    }

    /* details panel: sized to what it holds, centered in the space left above the footer */
    if (m.heading && m.lines.length) {
      spaced(.06); font(700, 30);
      const kw = Math.min(330, Math.max(150, ...m.lines.map(([k]) => x.measureText(String(k).toUpperCase()).width + 34)));
      spaced(0); font(600, 32, B);
      const maxw = W - P * 2 - 72 - kw;
      const wrap = (v) => {
        const out = [];
        let text = "";
        for (const w of String(v).split(" ")) {
          if (text && x.measureText(`${text} ${w}`).width > maxw) { out.push(text); text = w; }
          else text = text ? `${text} ${w}` : w;
        }
        if (text) out.push(text);
        return out.slice(0, 2);
      };
      const rows = m.lines.map(([k, v]) => [k, wrap(v)]);
      const room = H - 150 - Math.max(y, 860);
      let fit = rows, h = (r) => 92 + r.reduce((n, [, l]) => n + 58 + (l.length - 1) * 42, 0);
      while (fit.length > 1 && h(fit) > room) fit = fit.slice(0, -1);
      const top = Math.max(y, 860) + Math.max(0, (room - h(fit)) / 2);
      x.fillStyle = "rgba(255,255,255,.08)"; x.strokeStyle = "rgba(255,255,255,.18)"; x.lineWidth = 2;
      x.beginPath(); x.roundRect(P, top, W - P * 2, h(fit), 6); x.fill(); x.stroke();
      x.fillStyle = "#f0b429"; spaced(.16); font(800, 28); x.fillText(m.heading.toUpperCase(), P + 36, top + 54); spaced(0);
      let ly = top + 108;
      for (const [k, lines] of fit) {
        x.fillStyle = "#c5d4f5"; spaced(.06); font(700, 30); x.fillText(String(k).toUpperCase(), P + 36, ly); spaced(0);
        x.fillStyle = "#fff"; font(600, 32, B);
        lines.forEach((l, i) => x.fillText(l, P + 36 + kw, ly + i * 42));
        ly += 58 + (lines.length - 1) * 42;
      }
    }

    /* footer */
    x.fillStyle = "#c5d4f5"; spaced(.16); font(700, 28); x.fillText(SITE.toUpperCase(), P, H - 70);
    x.fillStyle = "#f0b429"; x.textAlign = "right"; x.fillText("#GOFALCONS", W - P, H - 70); x.textAlign = "left"; spaced(0);
    return c;
  }

  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  async function share(g, btn) {
    btn.disabled = true;
    const old = btn.innerHTML;
    btn.innerHTML = `${SHARE_ICON}Making graphic…`;
    try {
      const m = model(g);
      const canvas = await draw(m);
      const blob = await new Promise((ok) => canvas.toBlob(ok, "image/png"));
      const name = `danvers-${slug(m.sport)}-${slug(m.opponent || m.matchup)}-${g.date.slice(0, 10)}.png`;
      const file = new File([blob], name, { type: "image/png" });
      const text = `${m.sport}: ${m.kind === "score" ? `Danvers ${m.us}, ${m.opponent} ${m.them}` : m.matchup} · ${SITE}`;
      if (matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [file] })) {
        try { await navigator.share({ files: [file], title: `Danvers ${m.sport}`, text }); return; }
        catch (e) { if (e.name === "AbortError") return; }
      }
      preview(canvas, blob, name, file, text);
    } finally {
      btn.disabled = false;
      btn.innerHTML = old;
    }
  }

  /* A sheet over the game popup with the graphic and its buttons (a second dialog, so it sits on top) */
  function preview(canvas, blob, name, file, text) {
    const url = URL.createObjectURL(blob);
    const sheet = document.createElement("dialog");
    sheet.className = "dfa-sheet";
    const canCopy = !!(navigator.clipboard && window.ClipboardItem);
    const canShare = !!navigator.canShare?.({ files: [file] });
    sheet.innerHTML = `
      <figure>
        <img src="${url}" alt="Final score graphic">
        <figcaption class="row">
          <a class="dfa-btn solid" href="${url}" download="${esc(name)}">${DOWNLOAD_ICON}Download</a>
          ${canShare ? `<button class="dfa-btn" data-act="share">${SHARE_ICON}Share</button>` : ""}
          ${canCopy ? `<button class="dfa-btn" data-act="copy">${COPY_ICON}Copy image</button>` : ""}
          <button class="dfa-btn" data-act="close">Close</button>
        </figcaption>
      </figure>`;
    document.body.appendChild(sheet);
    sheet.showModal();
    const close = () => { sheet.close(); sheet.remove(); URL.revokeObjectURL(url); };
    sheet.addEventListener("click", async (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (e.target === sheet || act === "close") close();
      if (act === "share") navigator.share({ files: [file], text }).catch(() => {});
      if (act === "copy") {
        const b = e.target.closest("button");
        try { await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]); b.innerHTML = `${COPY_ICON}Copied!`; }
        catch (err) { b.innerHTML = `${COPY_ICON}Couldn't copy`; }
      }
    });
    sheet.addEventListener("close", () => sheet.remove());
  }

  const SHARE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>';
  const DOWNLOAD_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>';
  const COPY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>';
  const PIN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
  const PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  const TICKET_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9V6h18v3a3 3 0 0 0 0 6v3H3v-3a3 3 0 0 0 0-6zM14 6v12" stroke-dasharray="2 2.5"/></svg>';

  /* =================================================================
     GAME POPUPS: share button for finals, forecast + directions before
     ================================================================= */
  let clicked = null;
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-game],[data-meet]");
    if (!b) return;
    clicked = +(b.dataset.game || b.dataset.meet);
    setTimeout(() => {
      const dlg = document.querySelector("dialog.modal[open]");
      const g = games().find((x) => x.id === clicked);
      if (dlg && g && !dlg.querySelector(".dfa-share, .dfa-gd")) augment(dlg, g);
    }, 0);
  }, true);

  function augment(dlg, g) {
    /* the opponent's color badge beside its name */
    if (g.opponent && DFA.hasColors(g.opponent)) {
      const side = dlg.querySelector(".scoreline .team:last-child");
      if (side) side.insertAdjacentHTML("beforeend", DFA.badge(g.opponent, "md"));
      else dlg.querySelector(".modal-head h2")?.insertAdjacentHTML("afterbegin", DFA.badge(g.opponent, "md"));
    }
    if (finished(g) && SPORT !== "esports") {
      const head = dlg.querySelector(".modal-head");
      const btn = document.createElement("button");
      btn.className = "dfa-share";
      btn.innerHTML = `${SHARE_ICON}Share result`;
      btn.addEventListener("click", () => share(g, btn));
      head?.appendChild(btn);
      return;
    }
    if (g.result || g.cancelled || g.noResult || SPORT === "esports") return;
    const body = dlg.querySelector(".modal-body");
    if (!body) return;
    const box = document.createElement("div");
    box.className = "dfa-gd";
    box.innerHTML = `
      <h4>Forecast &amp; Directions</h4>
      <div class="dfa-gd-row">
        <span class="dfa-wx-slot"></span>
        <a class="dfa-btn ink" href="${DFA.mapsUrl(g)}" target="_blank" rel="noopener">${PIN_ICON}Get directions</a>
      </div>`;
    const links = [...body.querySelectorAll("h4")].find((h) => /^Links/.test(h.textContent));
    body.insertBefore(box, links || null);
    DFA.weather(g).then((w) => {
      const slot = box.querySelector(".dfa-wx-slot");
      if (w) slot.innerHTML = `<span class="dfa-wx">${w.icon}<b>${w.temp}°</b> ${esc(w.label)}${w.rain >= 20 ? ` · ${w.rain}% rain` : ""}${w.wind >= 12 ? ` · wind ${w.wind} mph` : ""}</span>`;
      else slot.remove();
    });
  }

  /* =================================================================
     ACTION PHOTOS: the newest one behind the home page hero, and a
     credit line under the Photos grid on the Media page
     ================================================================= */
  const photos = () => (SPORT === "soccer" ? TEAMS[squad()].photos : typeof PHOTOS !== "undefined" ? PHOTOS : []) || [];
  function actionPhotos() {
    const list = photos();
    const hero = document.querySelector(".hero.hero-home");
    if (hero && list[0]) {
      hero.style.setProperty("--shot", `url("${list[0].src}")`);
      hero.classList.add("has-shot");
    }
    const grid = document.getElementById("photos");
    const credits = [...new Set(list.map((p) => p.credit).filter(Boolean))];
    if (grid && credits.length && !document.querySelector(".dfa-credit")) {
      grid.insertAdjacentHTML("afterend", `<p class="dfa-credit">Photos: ${credits.map((c) => c.startsWith("@")
        ? `<a href="https://www.instagram.com/${esc(c.slice(1))}/" target="_blank" rel="noopener">${esc(c)}</a> on Instagram` : esc(c)).join(", ")}</p>`);
    }
  }

  /* =================================================================
     OPPONENT COLOR BADGES on the home scoreboard and schedule rows
     (kept up as lists re-render, e.g. after a filter)
     ================================================================= */
  function badges() {
    document.querySelectorAll(".sb-row .dot").forEach((dot) => {
      const name = dot.parentElement.querySelector(".nm")?.textContent.trim();
      if (name && DFA.hasColors(name) && dot.textContent.trim() === name.charAt(0)) dot.outerHTML = DFA.badge(name, "md");
    });
    document.querySelectorAll(".game[data-game] .opp, .game[data-meet] .opp").forEach((opp) => {
      if (opp.querySelector(".opp-badge")) return;
      const row = opp.closest(".game");
      const g = games().find((x) => x.id === +(row.dataset.game || row.dataset.meet));
      if (!g?.opponent || g.name || !DFA.hasColors(g.opponent)) return;
      const label = opp.querySelector("small");
      label ? label.insertAdjacentHTML("afterend", DFA.badge(g.opponent)) : opp.insertAdjacentHTML("afterbegin", DFA.badge(g.opponent));
    });
  }

  /* =================================================================
     GAME-DAY BAR
     ================================================================= */
  function gameDay() {
    const today = games().filter((g) => DFA.state(g, SPORT));
    let bar = document.querySelector(".dfa-gameday");
    if (!today.length) { bar?.remove(); return; }
    const g = today[0], live = DFA.state(g, SPORT) === "live";
    const tickets = team().tickets && g.home ? team().tickets : g.tickets || null;
    const watch = watchUrl(g);
    const html = `
      <div class="wrap">
        <span class="dfa-state ${live ? "live" : ""}">${live ? "<i></i>Live now" : "Game day"}</span>
        <div class="dfa-what">
          <div class="dfa-match">${esc(label())} ${esc(matchup(g))}</div>
          <div class="dfa-meta">
            <span>${g.timeTbd ? "" : `${live ? "Started" : "Today"} ${fmt(g.date, { hour: "numeric", minute: "2-digit" })}`}${g.site ? ` · ${esc(g.site)}` : ""}</span>
            <span class="dfa-wx-slot"></span>
          </div>
        </div>
        <div class="dfa-actions">
          ${watch ? `<a class="dfa-btn solid" href="${watch}" target="_blank" rel="noopener">${PLAY_ICON}${live ? "Watch live" : "Where to watch"}</a>` : ""}
          ${SPORT !== "esports" ? `<a class="dfa-btn" href="${DFA.mapsUrl(g)}" target="_blank" rel="noopener">${PIN_ICON}Directions</a>` : ""}
          ${tickets ? `<a class="dfa-btn" href="${esc(tickets.url)}" target="_blank" rel="noopener">${TICKET_ICON}Tickets</a>` : ""}
          <button class="dfa-btn" ${SPORT === "cross-country" ? "data-meet" : "data-game"}="${g.id}">Details</button>
        </div>
      </div>`;
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "dfa-gameday";
      document.querySelector("main")?.prepend(bar);
    }
    if (bar.dataset.key !== `${g.id}-${live}`) {
      bar.dataset.key = `${g.id}-${live}`;
      bar.innerHTML = html;
      DFA.weather(g).then((w) => { const s = bar.querySelector(".dfa-wx-slot"); if (w && s) s.innerHTML = `<span class="dfa-wx">${w.icon}${esc(DFA.weatherText(w))}</span>`; });
    }
  }

  /* =================================================================
     SEARCH DEEP LINKS: #p=Player Name (stats/runners) · #g=id (schedule)
     ================================================================= */
  const unhash = () => history.replaceState(null, "", location.pathname + location.search);
  function deepLink(tries = 0) {
    const p = location.hash.match(/^#p=(.+)$/), g = location.hash.match(/^#g=(\d+)$/);
    if (g) {
      const row = document.querySelector(`main .game[data-game="${g[1]}"], main .game[data-meet="${g[1]}"]`)
        || document.querySelector(`[data-game="${g[1]}"], [data-meet="${g[1]}"]`);
      if (!row) { if (tries < 20) setTimeout(() => deepLink(tries + 1), 150); return; }
      row.scrollIntoView({ block: "center" });
      row.click();
      unhash();
      return;
    }
    if (!p) return;
    const want = decodeURIComponent(p[1]).toLowerCase();
    const card = [...document.querySelectorAll(".player")].find((c) => (c.querySelector("h3")?.textContent || "").toLowerCase().includes(want));
    if (!card) { if (tries < 20) setTimeout(() => deepLink(tries + 1), 150); return; }
    card.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    card.classList.remove("dfa-found");
    void card.offsetWidth;
    card.classList.add("dfa-found");
    setTimeout(() => card.classList.remove("dfa-found"), 4200);
    unhash();
  }

  /* ---------- styles ---------- */
  const css = document.createElement("style");
  css.textContent = `
    .dfa-btn { display: inline-flex; align-items: center; gap: 7px; font: 700 15px/1 var(--display); letter-spacing: .08em; text-transform: uppercase;
      padding: 9px 14px 8px; border-radius: 4px; border: 2px solid #fff; color: #fff; background: transparent; text-decoration: none; cursor: pointer;
      transition: background .15s, color .15s, transform .15s; }
    .dfa-btn:hover { background: rgba(255,255,255,.14); transform: translateY(-1px); }
    .dfa-btn.solid { background: #fff; color: var(--royal); }
    .dfa-btn.solid:hover { background: #e6edfc; }
    .dfa-btn.ink { border-color: var(--royal); color: var(--royal); }
    .dfa-btn.ink:hover { background: #eef2fb; }
    .hero.has-shot { background: linear-gradient(115deg, rgba(11,31,77,.97) 0%, rgba(11,31,77,.9) 40%, rgba(24,71,159,.74) 72%, rgba(36,89,194,.58) 100%), var(--shot) center 32% / cover; }
    @media (max-width: 720px) { .hero.has-shot { background: linear-gradient(180deg, rgba(11,31,77,.9) 0%, rgba(11,31,77,.78) 55%, rgba(24,71,159,.72) 100%), var(--shot) center 30% / cover; } }
    .dfa-credit { margin: 12px 0 0; font-size: 13.5px; color: var(--muted); }
    .dfa-credit a { color: var(--royal); font-weight: 600; }
    .game .opp .opp-badge { width: 38px; height: 38px; font-size: 15px; margin: -6px 10px 0 0; }
    .modal-head h2 .opp-badge { margin: -6px 12px 0 0; }
    .scoreline .team .opp-badge { order: 2; }
    .dfa-btn svg, .dfa-share svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
    .dfa-share { display: inline-flex; align-items: center; gap: 8px; margin-top: 16px; font: 800 16px/1 var(--display); letter-spacing: .1em; text-transform: uppercase;
      padding: 10px 17px 9px; border: 0; border-radius: 4px; background: #f0b429; color: #0b1f4d; cursor: pointer;
      box-shadow: 0 8px 20px rgba(0,0,0,.28); transition: transform .15s, box-shadow .15s; }
    .dfa-share:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(0,0,0,.34); }
    .dfa-share:disabled { opacity: .8; cursor: progress; }
    .modal-body .dfa-gd h4:first-child { margin-top: 24px; }
    .modal-body > .dfa-gd:first-child h4 { margin-top: 0; }
    .dfa-gd-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .dfa-wx { display: inline-flex; align-items: center; gap: 7px; }
    .dfa-wx-icon { width: 22px; height: 22px; flex: none; }
    .dfa-gd .dfa-wx { font-size: 17px; color: var(--ink); } .dfa-gd .dfa-wx b { font-family: var(--display); font-size: 24px; }
    .dfa-gd .dfa-wx-icon { color: var(--royal); }

    dialog.dfa-sheet { border: 0; padding: 0; background: transparent; max-width: 100vw; max-height: 100vh; overflow: visible; }
    dialog.dfa-sheet::backdrop { background: rgba(5,14,40,.84); backdrop-filter: blur(6px); }
    .dfa-sheet figure { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 16px; animation: dfa-rise .4s cubic-bezier(.2,.8,.2,1); }
    .dfa-sheet img { display: block; height: min(70vh, 860px); max-width: calc(100vw - 32px); object-fit: contain; border-radius: 4px; box-shadow: 0 30px 80px rgba(0,0,0,.55); }
    .dfa-sheet .row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
    @keyframes dfa-rise { from { opacity: 0; transform: translateY(24px) scale(.96); } }

    .dfa-gameday { position: relative; overflow: hidden; color: #fff; border-bottom: 3px solid #f0b429;
      background: linear-gradient(90deg, #0b1f4d, #18479f 55%, #0b1f4d); }
    .dfa-gameday::before { content: ""; position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(100deg, transparent 35%, rgba(255,255,255,.13) 48%, transparent 60%);
      transform: translateX(-100%); animation: dfa-sheen 4s ease-in-out infinite; }
    .dfa-gameday .wrap { position: relative; display: flex; align-items: center; gap: 12px 20px; flex-wrap: wrap; padding-top: 14px; padding-bottom: 14px; }
    .dfa-state { display: inline-flex; align-items: center; gap: 8px; font: 800 15px/1 var(--display); letter-spacing: .16em; text-transform: uppercase;
      padding: 8px 12px 7px; border-radius: 4px; background: #f0b429; color: #0b1f4d; }
    .dfa-state.live { background: #d92d27; color: #fff; }
    .dfa-state.live i { width: 9px; height: 9px; border-radius: 50%; background: #fff; animation: dfa-pulse 1.3s ease-out infinite; }
    .dfa-match { font: 800 24px/1.05 var(--display); text-transform: uppercase; letter-spacing: .01em; }
    .dfa-meta { display: flex; flex-wrap: wrap; gap: 4px 14px; margin-top: 3px; font-size: 15px; color: #dbe5fb; }
    .dfa-actions { margin-left: auto; display: flex; flex-wrap: wrap; gap: 8px; }
    @keyframes dfa-sheen { 60%, 100% { transform: translateX(100%); } }
    @keyframes dfa-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,.8); } 100% { box-shadow: 0 0 0 10px rgba(255,255,255,0); } }

    .dfa-found { outline: 4px solid #f0b429; outline-offset: 4px; animation: dfa-glow 1.1s ease-in-out 3; }
    @keyframes dfa-glow { 50% { outline-color: rgba(240,180,41,.25); transform: translateY(-3px); } }
    @media (prefers-reduced-motion: reduce) { .dfa-gameday::before, .dfa-state.live i, .dfa-found { animation: none; } }
    @media (max-width: 640px) { .dfa-actions { margin-left: 0; } .dfa-match { font-size: 21px; } }`;
  document.head.appendChild(css);

  /* Fetch a page of this site when a link to it is hovered or pressed, so the page change is instant */
  if (HTMLScriptElement.supports?.("speculationrules")) {
    const rules = document.createElement("script");
    rules.type = "speculationrules";
    rules.textContent = JSON.stringify({ prefetch: [{ where: { href_matches: `/${SPORT}/*` }, eagerness: "moderate" }] });
    document.head.appendChild(rules);
  }

  actionPhotos();
  badges();
  const main = document.querySelector("main");
  if (main) new MutationObserver(() => badges()).observe(main, { childList: true, subtree: true });
  gameDay();
  setInterval(gameDay, 60000);
  deepLink();
  addEventListener("hashchange", () => deepLink());
})();
