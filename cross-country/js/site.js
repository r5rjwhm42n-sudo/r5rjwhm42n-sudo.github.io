/* Danvers Falcons Cross Country — page rendering. Content lives in data.js. */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const page = document.body.dataset.page;
  const LOGO = "images/falcons-logo.png";
  const SQUADS = [["boys", "Boys"], ["girls", "Girls"]];

  const ran = (m, k) => m[k] && (m[k].result || m[k].place || m[k].finishers?.length);
  const isDone = (m) => SQUADS.some(([k]) => ran(m, k));
  const done = MEETS.filter(isDone);
  /* On the schedule, date has passed, but no results entered */
  const stale = (m) => !isDone(m) && !m.cancelled && !m.dateTbd && new Date(m.date).getTime() + 12 * 36e5 < Date.now();
  const status = (m) => (m.cancelled ? "Cancelled" : null);
  const upcoming = MEETS.filter((m) => !isDone(m) && !m.cancelled && !stale(m));
  const past = MEETS.filter((m) => isDone(m) || m.cancelled || stale(m));
  const rec = (k) => {
    const d = done.filter((m) => m[k]?.result), w = d.filter((m) => m[k].result === "W").length;
    return `${w}–${d.length - w}`;
  };

  const ord = (n) => n + (["th", "st", "nd", "rd"][(n % 100 - 20) % 10] || ["th", "st", "nd", "rd"][n % 100] || "th");
  const fmt = (iso, opts) => new Date(iso).toLocaleString("en-US", opts);
  const dateLong = (m) => (m.dateTbd ? "Date TBD" : fmt(m.date, { weekday: "long", month: "long", day: "numeric" }));
  const dateShort = (m) => (m.dateTbd ? "Date TBD" : fmt(m.date, { weekday: "short", month: "short", day: "numeric" }));
  const timeOf = (m) => (m.dateTbd || m.timeTbd ? "" : fmt(m.date, { hour: "numeric", minute: "2-digit" }));
  const vs = (m) => (m.home === false ? "at" : "vs");
  const title = (m) => (m.name ? esc(m.name) : `${vs(m)} ${esc(m.opponent)}`);
  const where = (m) => (m.home == null ? "" : m.home ? "Home" : "Away");
  const kind = (m) => (m.league ? "NEC" : m.postseason ? "Postseason" : m.name ? "Invitational" : "Non-league");
  const last2 = (name) => name.split(" ").pop();
  /* "W 28–29" for a dual meet, "3rd of 9" for a scored big meet, else the top Falcon ("Conklin 15th") */
  const resText = (r) => {
    if (r.result) return `${r.result} ${r.us}–${r.them}`;
    if (r.place) return `${ord(r.place)}${r.of ? ` of ${r.of}` : ""}`;
    const top = r.finishers[0];
    return `${esc(last2(top.name))} ${top.place ? ord(top.place) : esc(top.time || "")}`;
  };
  /* "2nd · 17:54 · PR" */
  const line = (x) => [x.place ? ord(x.place) : null, x.time, x.note].filter(Boolean).map(esc).join(" · ") || "Ran";
  const tile = ([k, v, d]) => `<div class="card tile"><div class="k">${k}</div><div class="v count">${v}</div><div class="d">${d}</div></div>`;

  /* Every race a runner has run this season, pulled from the meets' finishers lists */
  const races = (r) => done.flatMap((m) => {
    const f = m[r.squad]?.finishers?.find((x) => x.name === r.name);
    return f ? [{ m, ...f }] : [];
  });
  /* Places only compare across dual meets, so averages and bests leave the big meets out */
  const places = (r) => races(r).filter((x) => x.m.opponent).map((x) => x.place).filter(Boolean);
  const avg = (r) => { const p = places(r); return p.length ? p.reduce((a, b) => a + b, 0) / p.length : Infinity; };

  /* ---------- Top bar, header, scoreboard strip, footer ---------- */
  const NAV = [["index.html", "Home", "home"], ["runners.html", "Runners", "runners"], ["schedule.html", "Schedule", "schedule"],
               ["history.html", "History", "history"], ["media.html", "Media", "media"]];
  const league = [TEAM.school, TEAM.conference, TEAM.division].filter(Boolean).map(esc).join(" · ");
  const header = $("#site-header");
  header.insertAdjacentHTML("beforebegin", `
    <div class="topbar"><div class="wrap">
      <span>${league}</span>
      <span><a href="${TEAM.links.school}" target="_blank" rel="noopener">DHS Cross Country</a><a href="${TEAM.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a><a href="../">All Sports</a></span>
    </div></div>`);
  header.innerHTML = `
    <div class="wrap hbar">
      <a class="brand" href="index.html">
        <span class="badge"><img src="${LOGO}" alt="Danvers Falcons logo"></span>
        <span class="brand-text">Danvers Falcons<small>Cross Country</small></span>
      </a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">Menu</button>
      <nav class="nav" aria-label="Main">
        ${NAV.map(([href, label, id]) => `<a href="${href}" class="${id === page ? "active" : ""}">${label}</a>`).join("")}
      </nav>
    </div>`;
  header.insertAdjacentHTML("afterend", `
    <div class="scores"><div class="wrap">
      <div class="scores-label">${TEAM.season}<br>Meets</div>
      <div class="scores-track">${MEETS.map((m) => `
        <button class="sc ${m === upcoming[0] ? "next" : ""}" data-meet="${m.id}">
          <div class="when">${dateShort(m)}${isDone(m) ? " · Final" : ""}</div>
          <div class="who">${title(m)}</div>
          <div class="res ${isDone(m) ? "" : status(m) ? "cx" : "up"}">${isDone(m)
            ? SQUADS.filter(([k]) => ran(m, k)).map(([k, label]) => `<span class="${m[k].result || ""}">${label[0]} ${resText(m[k])}</span>`).join(" · ")
            : status(m) || (stale(m) ? "" : timeOf(m))}</div>
        </button>`).join("")}</div>
    </div></div>`);
  $(".nav-toggle").addEventListener("click", (e) => {
    const open = $(".nav").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", open);
  });
  $("#site-footer").innerHTML = `
    <div class="wrap foot-top">
      <span class="badge"><img src="${LOGO}" alt=""></span>
      <div class="go">Go Falcons<small>${esc(TEAM.school)} Cross Country</small></div>
    </div>
    <div class="wrap foot-bot">
      <div>
        ${esc(TEAM.address)}<br>
        ${[TEAM.conference, TEAM.division].filter(Boolean).map(esc).join(" · ")} · Head Coach ${esc(TEAM.headCoach)}
      </div>
      <div class="links">
        <a href="${TEAM.links.school}" target="_blank" rel="noopener">DHS Cross Country</a>
        <a href="${TEAM.links.athletics}" target="_blank" rel="noopener">Falcons Athletics</a>
        <a href="${TEAM.links.athleticNet}" target="_blank" rel="noopener">athletic.net</a>
        <a href="${TEAM.links.news}" target="_blank" rel="noopener">Salem News</a>
      </div>
    </div>`;

  /* ---------- Pieces reused across pages ---------- */
  function meetRow(m) {
    const d = new Date(m.date);
    const res = isDone(m)
      ? `<div class="result xc">${SQUADS.filter(([k]) => ran(m, k)).map(([k, label]) => `
          <div><small>${label}</small>${m[k].result ? `<span class="wl ${m[k].result}">${m[k].result}</span>${m[k].us}–${m[k].them}` : resText(m[k])}</div>`).join("")}</div>`
      : status(m) ? `<div class="result cancelled">${status(m)}</div>`
      : `<div class="result upcoming">${stale(m) ? "" : timeOf(m)}</div>`;
    return `
      <button class="game ${m.cancelled ? "is-cancelled" : ""}" data-meet="${m.id}">
        <div class="datebox ${m.dateTbd ? "tbd-date" : ""}">
          <div class="m">${m.dateTbd ? "Date" : fmt(m.date, { month: "short" })}</div>
          <div class="d">${m.dateTbd ? "TBD" : d.getDate()}</div>
          <div class="w">${m.dateTbd ? "&nbsp;" : fmt(m.date, { weekday: "short" })}</div>
        </div>
        <div>
          <div class="opp">${m.name ? esc(m.name) : `<small>${vs(m).toUpperCase()}</small>${esc(m.opponent)}`}</div>
          <div class="meta">
            ${where(m) ? `<span class="tag ${m.home ? "home" : ""}">${where(m)}</span>` : ""}
            <span class="tag">${kind(m)}</span>
            ${m.tag ? `<span class="tag special">${esc(m.tag)}</span>` : ""}
            <span>${esc([m.site, m.distance].filter(Boolean).join(" · "))}</span>
          </div>
        </div>
        ${res}
        <div class="chev" aria-hidden="true">›</div>
      </button>`;
  }

  function squadBlock(m, k, label) {
    const r = m[k];
    if (!ran(m, k)) return "";
    const them = m.opponent || "Opponent";
    let html = `<h4>${label} · ${r.result ? `${r.result === "W" ? "Win" : "Loss"}, Danvers ${r.us} · ${esc(them)} ${r.them}` : esc(r.race) || resText(r)}</h4>`;
    if (r.finishers?.length) html += `<div class="perf">${r.finishers.map((f) => `<div class="row"><span class="n">${esc(f.name)}</span><span>${line(f)}</span></div>`).join("")}</div>`;
    if (r.winner && r.winner.school !== "Danvers") html += `<p class="fine">Race winner: ${esc(r.winner.name)} (${esc(r.winner.school)})${r.winner.time ? `, ${esc(r.winner.time)}` : ""}</p>`;
    return html;
  }

  function meetModal(m) {
    let body = "";
    if (m.summary) body += `<h4>Recap</h4><p>${esc(m.summary)}</p>`;
    if (!isDone(m)) body += `<h4>${m.cancelled ? "Cancelled" : stale(m) ? "Meet" : "Race day"}</h4><p>${m.cancelled ? "Originally scheduled for " : ""}${[dateLong(m), timeOf(m)].filter(Boolean).join(" · ")}<br>${esc([m.site, m.distance].filter(Boolean).join(" · "))}</p>`;
    body += SQUADS.map(([k, label]) => squadBlock(m, k, label)).join("");
    if (m.notes?.length) body += `<h4>Notes</h4><ul>${m.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
    const srcs = [...(m.sources || []), ...(isDone(m) || m.cancelled ? [] : [{ label: "Falcons Athletics schedule", url: TEAM.links.schedule }])];
    if (srcs.length) body += `<h4>Links</h4><div class="srcs">${srcs.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("")}</div>`;

    return `
      <div class="modal-head">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="eyebrow">${[dateLong(m), where(m), kind(m)].filter(Boolean).join(" · ")}${m.tag ? ` · ${esc(m.tag)}` : ""}${m.cancelled ? " · Cancelled" : ""}</div>
        <h2>${title(m)} ${esc(m.mascot || "")}</h2>
        ${isDone(m) ? `<div class="modal-res">${SQUADS.filter(([k]) => ran(m, k)).map(([k, label]) => `<span>${label} <b>${resText(m[k])}</b></span>`).join("")}<span class="low">${m.opponent ? "Low score wins" : esc(m.distance || "")}</span></div>` : ""}
      </div>
      <div class="modal-body">${body}</div>`;
  }

  /* Any element with data-meet (schedule rows, the top strip, the hero) opens the meet popup */
  const dlg = document.createElement("dialog");
  dlg.className = "modal";
  document.body.appendChild(dlg);
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg || e.target.closest(".modal-close")) dlg.close();
  });
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-meet]");
    if (!btn) return;
    dlg.innerHTML = meetModal(MEETS.find((m) => m.id === +btn.dataset.meet));
    dlg.showModal();
  });

  function leaders() {
    const top = (k) => RUNNERS.filter((r) => r.squad === k).sort((a, b) => avg(a) - avg(b))[0];
    const winners = RUNNERS.map((r) => [r, places(r).filter((p) => p === 1).length]).filter(([, n]) => n);
    const cards = SQUADS.map(([k, label]) => {
      const r = top(k);
      return [isFinite(avg(r)) ? avg(r).toFixed(1) : "–", `Best average finish · ${label}`, r.name];
    });
    cards.push([winners.reduce((n, [, w]) => n + w, 0), "Individual race wins", winners.map(([r]) => last2(r.name)).join(" · ") || "None yet"]);
    return cards.map(([big, cat, who]) => `<div class="card leader"><div class="big count">${big}</div><div><div class="cat">${cat}</div><div class="who">${esc(who)}</div></div></div>`).join("");
  }

  /* ---------- HOME ---------- */
  function home() {
    const next = upcoming[0];
    const last = done[done.length - 1];

    if (last) {
      const res = SQUADS.map(([k]) => last[k]?.result).filter(Boolean);
      const w = res.filter((x) => x === "W").length;
      const head = last.headline ? esc(last.headline)
        : last.name ? `Falcons run at ${esc(last.name)}`
        : w === res.length ? `Falcons ${res.length > 1 ? "sweep" : "beat"} ${esc(last.opponent)}`
        : w ? `Falcons split with ${esc(last.opponent)}`
        : `Falcons fall to ${esc(last.opponent)}`;
      $("#hero-story").innerHTML = `
        <div class="eyebrow">Final · ${dateShort(last)}</div>
        <h1>${head}</h1>
        <p>${esc(last.summary || "")}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-meet="${last.id}">Meet recap</button>
          <a class="btn btn-ghost" href="schedule.html">Full schedule</a>
        </div>`;
      const firsts = SQUADS.flatMap(([k]) => (last[k]?.finishers || []).filter((f) => f.place).slice(0, 1).map((f) => `${last2(f.name)} ${ord(f.place)}`));
      $("#scoreboard").innerHTML = `
        <button class="card scoreboard" data-meet="${last.id}" aria-label="Last meet details">
          <div class="sb-top"><span>Final</span><span>${last.opponent ? "Low score wins" : esc(last.distance || "")}</span></div>
          ${SQUADS.filter(([k]) => ran(last, k)).map(([k, label]) => {
            const r = last[k], top = r.finishers?.[0];
            return r.result ? `
            <div class="sb-row xc ${r.result === "W" ? "win" : ""}">
              <span class="dot ${r.result}">${r.result}</span>
              <span class="nm">${label}<small>Danvers ${r.us} · ${esc(last.opponent)} ${r.them}</small></span>
              <span class="pts">${r.us}–${r.them}</span>
            </div>` : `
            <div class="sb-row xc win">
              <span class="dot">${label[0]}</span>
              <span class="nm">${label}<small>${top ? `${esc(top.name)} · ${esc(top.time || "")}` : ""}</small></span>
              <span class="pts">${r.place ? ord(r.place) : top?.place ? ord(top.place) : "–"}</span>
            </div>`;
          }).join("")}
          <div class="sb-foot"><span>${esc(last.opponent ? firsts.join(" · ") : last.site || "")}</span><b>Meet recap ›</b></div>
        </button>`;
    } else {
      $("#hero-story").innerHTML = `
        <div class="eyebrow">${TEAM.season} season</div>
        <h1>${esc(TEAM.name)} Cross Country</h1>
        <p>Results, runners, history and photos from ${esc(TEAM.school)} boys and girls cross country.</p>
        <div class="btn-row"><a class="btn btn-primary" href="schedule.html">Full schedule</a></div>`;
    }

    $("#scorestrip").innerHTML =
      tile(["Boys", rec("boys"), "Dual-meet record"]) +
      (next ? `<button class="card next-game" data-meet="${next.id}">
        <div>
          <div class="k">Next meet</div>
          <h3>${title(next)}</h3>
          <div class="meta">${[dateLong(next), timeOf(next), esc(next.site || "")].filter(Boolean).join(" · ")}</div>
        </div>
        <div class="countdown" id="countdown"></div>
      </button>` : `<div class="card next-game"><div><div class="k">Season complete</div><h3>Boys ${rec("boys")} · Girls ${rec("girls")}</h3></div></div>`) +
      tile(["Girls", rec("girls"), "Dual-meet record"]);

    $("#home-leaders").innerHTML = leaders();
    $("#home-meets").innerHTML = [...past.slice(-2), ...upcoming.slice(0, 3)].map(meetRow).join("");

    if (next && !next.dateTbd) {
      const tick = () => {
        const ms = Math.max(0, new Date(next.date) - new Date());
        const parts = [["Days", ms / 864e5], ["Hrs", (ms / 36e5) % 24], ["Min", (ms / 6e4) % 60]];
        $("#countdown").innerHTML = ms
          ? parts.map(([l, v]) => `<div><b>${String(Math.floor(v)).padStart(2, "0")}</b><span>${l}</span></div>`).join("")
          : `<div><b>Race day</b><span>Go Falcons</span></div>`;
      };
      tick();
      setInterval(tick, 30000);
    }
  }

  /* ---------- RUNNERS ---------- */
  function runners() {
    const all = RUNNERS.flatMap(places);
    $("#stats-asof").textContent = STATS_AS_OF;
    $("#team-tiles").innerHTML = [
      ["Boys", rec("boys"), "Dual-meet record"],
      ["Girls", rec("girls"), "Dual-meet record"],
      ["Top-5 finishes", all.filter((p) => p <= 5).length, "In dual meets, boys and girls"],
      ["Race wins", all.filter((p) => p === 1).length, "Individual dual-meet victories"]
    ].map(tile).join("");
    $("#leaders").innerHTML = leaders();

    /* Race-by-race grid: one row per runner, one column per meet, time with the overall place under it */
    const cell = (x) => {
      if (!x) return `<span class="tm none">–</span>`;
      const dual = !!x.m.opponent;
      const pill = x.place ? `<span class="pl ${dual && x.place === 1 ? "p1" : dual && x.place <= 5 ? "top" : ""}">${ord(x.place)}</span>` : "";
      return `<span class="tm ${x.time ? "" : "none"}" title="${esc(x.note || "")}">${esc(x.time || (x.place ? "" : "✓"))}</span>${pill}`;
    };
    /* Preseason time trial, shown ahead of the meets */
    const hasTT = RUNNERS.some((r) => r.tt);
    const ttCell = (r) => (r.tt ? `<span class="tm">${esc(r.tt)}</span>${r.ttDistance ? `<span class="pl">${esc(r.ttDistance)}</span>` : ""}` : `<span class="tm none">–</span>`);
    $("#places").innerHTML = SQUADS.map(([k, label]) => `
      <div class="card chart">
        <h3>${label}</h3>
        <div class="table-scroll"><table class="places">
          <thead><tr><th>Runner</th>${hasTT ? `<th title="Preseason 2K time trial">TT<small>Preseason · 2K</small></th>` : ""}${done.map((m) => `<th title="${title(m)}">${esc(m.short)}<small>${fmt(m.date, { month: "short", day: "numeric" })}${m.distance ? ` · ${esc(m.distance)}` : ""}</small></th>`).join("")}</tr></thead>
          <tbody>${RUNNERS.filter((r) => r.squad === k).sort((a, b) => avg(a) - avg(b)).map((r) => {
            const rs = races(r);
            return `<tr><td class="nm">${esc(r.name)}${r.grade ? `<small>${r.grade}</small>` : ""}</td>${hasTT ? `<td>${ttCell(r)}</td>` : ""}${done.map((m) => `<td>${cell(rs.find((x) => x.m === m))}</td>`).join("")}</tr>`;
          }).join("")}</tbody>
        </table></div>
      </div>`).join("");

    const groups = ["All", "Boys", "Girls", "Captains"];
    let active = "All", q = "";
    $("#filters").innerHTML = groups.map((grp) => `<button class="chip" aria-pressed="${grp === "All"}" data-group="${grp}">${grp}</button>`).join("")
      + `<input class="search" type="search" placeholder="Search runners…" aria-label="Search runners">`;

    const draw = () => {
      const list = RUNNERS.filter((r) =>
        (active === "All" || (active === "Captains" ? r.captain : r.squad === active.toLowerCase())) &&
        r.name.toLowerCase().includes(q));
      $("#players").innerHTML = list.length ? list.map((r) => {
        const rs = races(r), p = places(r);
        return `
        <article class="card player">
          <div class="player-top">
            <div class="jersey">${esc(r.name.split(" ").map((w) => w[0]).join("").slice(0, 2))}</div>
            <div>
              <h3>${esc(r.name)}</h3>
              <div class="posline">
                <span class="pos">${r.squad === "boys" ? "Boys" : "Girls"}</span>
                ${r.grade ? `<span>${r.grade}</span>` : ""}
                ${r.captain ? `<span class="cap">CAPTAIN</span>` : ""}
              </div>
            </div>
          </div>
          <div class="player-stats">
            <div><b>${rs.length}</b><span>Races</span></div>
            <div><b>${p.length ? ord(Math.min(...p)) : "–"}</b><span>Dual best</span></div>
            <div><b>${p.length ? avg(r).toFixed(1) : "–"}</b><span>Dual avg.</span></div>
            <div><b class="${r.pr ? "pr" : "dim"}">${esc(r.pr || "–")}</b><span>5K PR</span></div>
          </div>
          ${rs.length || r.tt ? `<div class="player-log">
            ${r.tt ? `<div class="row"><span class="opp">${esc(r.ttDistance || "2K")} time trial</span><span>${esc(r.tt)}</span></div>` : ""}
            ${rs.map((x) => `<div class="row"><span class="opp">${title(x.m)}</span><span>${line(x)}</span></div>`).join("")}
          </div>` : ""}
        </article>`;
      }).join("") : `<div class="empty card" style="grid-column:1/-1">No runners match.</div>`;
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
    const next = upcoming[0];
    $("#sched-tiles").innerHTML = [
      ["Boys", rec("boys"), "Dual-meet record"],
      ["Girls", rec("girls"), "Dual-meet record"],
      ["Meets run", done.length, `of ${MEETS.filter((m) => !m.cancelled).length} on the schedule`],
      ["Next up", next && !next.dateTbd ? fmt(next.date, { month: "short", day: "numeric" }) : "–", next ? title(next) : "Season complete"]
    ].map(tile).join("");
    $("#results").innerHTML = past.length ? [...past].reverse().map(meetRow).join("") : `<div class="empty">No meets run yet.</div>`;
    $("#upcoming").innerHTML = upcoming.length ? upcoming.map(meetRow).join("") : `<div class="empty">Season complete.</div>`;
  }

  /* ---------- HISTORY ---------- */
  function history() {
    const count = (k, re) => TITLES.filter((t) => t.squad === k && re.test(t.label)).length;
    $("#banners").innerHTML = SQUADS.map(([k, label]) => `
      <h3 class="banner-title">${label}</h3>
      <div class="banners">${TITLES.filter((t) => t.squad === k).map((t) => `<div class="banner"><img src="${LOGO}" alt=""><div class="y">${t.year}</div><div class="l">${esc(t.label)}</div></div>`).join("")}</div>`).join("");
    $("#history-tiles").innerHTML = [
      ["Girls NEC titles", count("girls", /NEC/), "1996 to 2025"],
      ["Boys NEC titles", count("boys", /NEC/), "1980 · 2018 · 2021"],
      ["State champions", "2023", "Boys · MIAA Division II"],
      ["Head coach", esc(TEAM.headCoach.split(" ").pop()), esc(TEAM.coachNote || "")]
    ].map(tile).join("");
    $("#timeline").innerHTML = MILESTONES.map((m) => `<div class="item"><div class="y">${esc(m.year)}</div><p>${esc(m.text)}</p></div>`).join("");
    const cell = (s) => (s ? `${s.w}–${s.l}` : "–");
    $("#records").innerHTML = [
      `<tr><td class="yr">${TEAM.season}</td><td class="rec">${rec("boys")}</td><td class="rec">${rec("girls")}</td><td><span class="note-pill">Season in progress</span></td></tr>`,
      ...SEASONS.map((s) => `<tr>
        <td class="yr">${s.year}</td>
        <td class="rec">${cell(s.boys)}</td>
        <td class="rec">${cell(s.girls)}</td>
        <td>${s.note ? `<span class="note-pill">${esc(s.note)}</span>` : ""}</td>
      </tr>`)
    ].join("");
    $("#alltime").innerHTML = SQUADS.map(([k, label]) => `
      <div class="card table-scroll"><table class="records alltime">
        <thead><tr><th>#</th><th>${label}</th><th>5K</th><th>Year</th></tr></thead>
        <tbody>${ALL_TIME[k].map(([name, time, year, grade], i) => `<tr>
          <td class="yr">${i + 1}</td>
          <td>${esc(name)}${grade ? ` <small>${grade}</small>` : ""}${year === TEAM.season ? ` <span class="note-pill">This season</span>` : ""}</td>
          <td class="rec">${time}</td>
          <td>${year}</td>
        </tr>`).join("")}</tbody>
      </table></div>`).join("");
    $("#alltime-src").href = ALL_TIME_SOURCE;
    $("#standouts").innerHTML = STANDOUTS.map((p) => `
      <article class="card legend">
        <div class="top">
          <div><h3>${esc(p.name)}</h3><div class="role">${esc(p.role)}</div></div>
          <div class="rank">${esc(p.year)}</div>
        </div>
        <div class="body">
          <p>${esc(p.bio)}</p>
          <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
  }

  /* ---------- MEDIA ---------- */
  function media() {
    $("#news").innerHTML = NEWS.map((n) => `
      <a class="card lift video" href="${n.url}" target="_blank" rel="noopener">
        <div class="thumb news"><img src="${LOGO}" alt=""><span class="yr">${esc(n.sub)}</span><span class="len">${esc(n.date)}</span></div>
        <div class="cap-txt"><h3>${esc(n.title)}</h3><span>${n.site ? `View on ${esc(n.site)}` : "Read at the Salem News"} ↗</span></div>
      </a>`).join("");
    $("#photos").innerHTML = PHOTOS.map((p) => `<figure class="photo has-img"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy"><figcaption>${esc(p.caption)}</figcaption></figure>`).join("");
    $("#photos").closest("section").hidden = !PHOTOS.length;   // no photos yet: leave the section out
  }

  ({ home, runners, schedule, history, media })[page]?.();

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
