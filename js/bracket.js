/* =====================================================================
   Hub: MIAA state tournament brackets. Draws a division's bracket from a
   team's `bracket` in its data.js: the seeds in order (No. 1 first) and
   the games, each named by the two seeds in it. The preliminary (play-in)
   round, byes and every later round are worked out from the number of
   seeds and the field size (16 for football, 32 for the others), the same
   way the MIAA builds its brackets.
   ===================================================================== */
window.DFABracket = (function () {
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const DAN = /^Danvers\b/;
  const NAMES = { 2: "State final", 4: "Semifinals", 8: "Quarterfinals" };
  const lower = (r) => (r === "Preliminary" ? "preliminary round" : r[0].toLowerCase() + r.slice(1));

  /* standard bracket order: 1 v 16, 8 v 9, 4 v 13, 5 v 12, 2 v 15 ... */
  function order(size) {
    let o = [1, 2];
    while (o.length < size) { const n = o.length * 2 + 1; o = o.flatMap((s) => [s, n - s]); }
    return o;
  }

  const winner = (g) => {
    if (!g) return null;
    if (g.winner) return g.winner;
    if (!g.score || g.score[0] === g.score[1]) return null;
    return g.score[0] > g.score[1] ? g.seeds[0] : g.seeds[1];
  };

  /* rounds: [{ name, pre, games }]. Each game is { a, b, g, win, from }: a and b are
     seed numbers (0 = a bye, null = not decided yet), g is the game from data.js and
     from[0] / from[1] are the games that decide a and b. The preliminary round's
     games are grouped by the first-round game they feed so they line up beside it. */
  function build(B, size) {
    const n = B.seeds.length, games = B.games || [];
    const find = (a, b) => games.find((g) => g.seeds.includes(a) && g.seeds.includes(b));
    const match = (a, b, from = []) => {
      const g = a && b ? find(a, b) : null;
      return { a, b, g, win: (a === 0 ? b : b === 0 ? a : winner(g)) ?? null, from };
    };
    const play = Math.max(0, n - size);
    const pre = {};
    for (let s = size - play + 1; s <= size; s++) pre[s] = match(s, 2 * size + 1 - s);
    const entrant = (s) => (s > n ? 0 : pre[s] ? pre[s].win : s);

    const o = order(size);
    let cur = [];
    for (let i = 0; i < o.length; i += 2) cur.push(match(entrant(o[i]), entrant(o[i + 1]), [pre[o[i]] || null, pre[o[i + 1]] || null]));
    const rounds = play ? [{ name: "Preliminary", pre: true, games: cur.map((m) => m.from.filter(Boolean)) }] : [];
    for (let teams = size; cur.length; teams /= 2) {
      rounds.push({ name: NAMES[teams] || `Round of ${teams}`, games: cur });
      if (cur.length === 1) break;
      const next = [];
      for (let i = 0; i < cur.length; i += 2) next.push(match(cur[i].win, cur[i + 1].win, [cur[i], cur[i + 1]]));
      cur = next;
    }
    return rounds;
  }

  const when = (iso) => {
    const d = new Date(iso.length === 10 ? `${iso}T12:00` : iso);
    const day = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    return iso.length === 10 ? day : `${day} · ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).replace(":00", "")}`;
  };
  const info = (g) => [g?.date && when(g.date), g?.site].filter(Boolean).join(" · ");
  const score = (m, s) => (m.g?.score ? m.g.score[m.g.seeds.indexOf(s)] : "");
  const line = (m, s) => `${score(m, s)}–${score(m, m.a === s ? m.b : m.a)}${m.g.note ? ` (${m.g.note})` : ""}`;
  const name = (B, s) => `No. ${s} ${B.seeds[s - 1]}`;
  const seedOf = (B) => B.seeds.findIndex((s) => DAN.test(s)) + 1;

  /* Danvers' games so far plus the next one (byes left out) */
  function path(B, size) {
    const d = seedOf(B);
    const rounds = build(B, size);
    const games = [];
    for (const r of rounds) {
      const m = (r.pre ? r.games.flat() : r.games).find((x) => x.a === d || x.b === d);
      if (m && m.a !== 0 && m.b !== 0) games.push({ round: r.name, m, opp: m.a === d ? m.b : m.a });
    }
    return { d, rounds, games };
  }

  /* "the No. 14 Wakefield–No. 19 Saugus winner" while the opponent is still being decided */
  const pending = (B, m, d) => {
    const f = m.from.find((x) => x && x.a !== d && x.b !== d);
    return f && f.a && f.b ? `the ${name(B, f.a)}–${name(B, f.b)} winner` : "";
  };

  /* chip + one line for the panel head */
  function status(B, size) {
    const P = path(B, size);
    const last = P.games[P.games.length - 1];
    if (!last) return { chip: "In the bracket", cls: "in", detail: "" };
    const { m, round, opp } = last;
    if (m.win === P.d && round === NAMES[2]) return { chip: "State champions", cls: "in", detail: `Won the state final ${line(m, P.d)} over ${name(B, opp)}` };
    if (m.win) return { chip: "Season complete", cls: "done", detail: `Lost ${line(m, P.d)} to ${name(B, opp)} in the ${lower(round)}` };
    const vs = opp ? name(B, opp) : pending(B, m, P.d);
    return { chip: "Still alive", cls: "in", detail: `Next: ${round}${vs ? ` vs. ${vs}` : ""}${m.g?.date ? ` · ${when(m.g.date)}` : ""}` };
  }

  function draw(B, size) {
    const P = path(B, size);
    const row = (m, s, f) => {
      if (s === 0) return `<div class="bk-t bye"><i></i><span>Bye</span><b></b></div>`;
      if (s == null) return `<div class="bk-t tbd"><i></i><span>${f && !f.from.length ? `${f.a}/${f.b} winner` : ""}</span><b></b></div>`;
      const cls = [s === P.d && "dan", m.win && (m.win === s ? "w" : "l")].filter(Boolean).join(" ");
      const t = B.seeds[s - 1];
      return `<div class="bk-t ${cls}"><i>${s}</i><span title="${esc(t)}">${esc(t)}</span><b>${score(m, s)}</b></div>`;
    };
    const box = (m, fed) => {
      const tip = [info(m.g), m.g?.note].filter(Boolean).join(" · ");
      return `<div class="bk-m${m.a === P.d || m.b === P.d ? " on" : ""}${fed ? " fed" : ""}"${tip ? ` title="${esc(tip)}"` : ""}>${row(m, m.a, m.from[0])}${row(m, m.b, m.from[1])}</div>`;
    };
    const first = P.rounds[0].pre ? 1 : 0;
    const cols = P.rounds.map((r, k) => {
      const slots = r.games.map((m) => `<div class="bk-slot">${r.pre ? m.map((x) => box(x)).join("") : box(m, k === first && m.from.some(Boolean))}</div>`);
      return `<div class="bk-col${r.pre ? " pre" : ""}"><h4>${esc(r.name)}</h4><div class="bk-list">${slots.join("")}</div></div>`;
    });
    /* a first-round game fed by two play-in games needs room for both beside it */
    const tall = first && P.rounds[0].games.some((g) => g.length > 1);
    return `<div class="bk" style="--slots: ${size / 2}${tall ? "; --h: 104px" : ""}">${cols.join("")}</div>`;
  }

  /* Danvers' games as a row of small cards: round, opponent, when and where, result */
  function road(B, size) {
    const P = path(B, size);
    return P.games.map(({ round, m, opp }) => {
      const vs = opp ? name(B, opp) : pending(B, m, P.d);
      if (!vs) return "";
      const res = m.win ? `${m.win === P.d ? "W" : "L"} ${line(m, P.d)}` : "";
      return `<li class="${m.win ? (m.win === P.d ? "w" : "l") : "next"}"><span>${esc(round)}</span><b>vs. ${esc(vs)}</b>${info(m.g) ? `<small>${esc(info(m.g))}</small>` : ""}${res ? `<em>${esc(res)}</em>` : ""}</li>`;
    }).join("");
  }

  return { build, draw, road, status, seedOf };
})();
