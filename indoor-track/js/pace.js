/* Indoor track: the pace calculator on the home page (#pace). Pick a race and a goal time and get the split for every
   lap of a 200-meter indoor track, plus the Falcons with the closest marks on file (from every result on this site).
   Loaded after ../js/winter.js, which picks the boys or girls team. */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const ev = $("#pace-ev"), inp = $("#pace-time"), out = $("#pace-out"), near = $("#pace-near"), err = $("#pace-err");
  if (!ev || !inp) return;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("dfa-pace-" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("dfa-pace-" + k, JSON.stringify(v)); } catch (e) { /* storage blocked: fine */ } }
  };
  const toSec = (m) => { const s = String(m ?? "").trim(); return /^\d+(:\d{2}){0,2}(\.\d+)?$/.test(s) ? s.split(":").map(Number).reduce((a, x) => a * 60 + x, 0) : null; };
  const fmt = (s) => { const m = Math.floor(s / 60), r = s - m * 60; return m ? `${m}:${r.toFixed(2).padStart(5, "0")}` : r.toFixed(2); };
  /* the mile and two-mile start behind the finish line, so their first split comes a few meters past one lap */
  const EV = { "600 meters": 600, "1000 meters": 1000, Mile: 1609.34, "Two-mile": 3218.69 };
  const DEF = { "600 meters": "1:45.00", "1000 meters": "3:00.00", Mile: "5:30.00", "Two-mile": "11:30.00" };
  ev.innerHTML = Object.keys(EV).map((e) => `<option>${esc(e)}</option>`).join("");
  ev.value = store.get("ev", "Mile");
  if (!EV[ev.value]) ev.value = "Mile";
  inp.value = store.get("t-" + ev.value, DEF[ev.value]);
  const team = TEAMS[document.body.dataset.team] || Object.values(TEAMS)[0];
  const marks = (name) => (team.past || []).flatMap((p) => (p.results || []).flatMap((m) => m.rows.filter((r) => r[0] === name).map((r) => ({ who: r[1], mark: r[3], v: toSec(r[3]), meet: m.meet.replace(/ · .*/, ""), season: p.season }))))
    .filter((r) => r.v != null);
  function calc() {
    const name = ev.value, D = EV[name], T = toSec(inp.value.replace(/\s/g, ""));
    store.set("ev", name);
    if (T == null || T < D / 11 || T > D / 1.2) { err.hidden = false; err.textContent = "Enter a time like 5:30 or 5:30.25."; return; }
    err.hidden = true; store.set("t-" + name, inp.value);
    const n = Math.round(D / 200), segs = [D - 200 * (n - 1), ...Array(n - 1).fill(200)];
    let cum = 0, at = 0;
    const rows = segs.map((m, i) => { const lt = T * m / D; cum += lt; at += m; return `<tr><td>${i + 1}</td><td>${Math.round(at)} m</td><td>${fmt(lt)}</td><td><b>${fmt(cum)}</b></td></tr>`; });
    out.innerHTML = `<div class="pace-big"><div><b>${fmt(T * 200 / D)}</b><span>every 200 m lap</span></div><div><b>${fmt(T * 400 / D)}</b><span>per 400 m</span></div><div><b>${fmt(T * 1609.34 / D)}</b><span>per mile</span></div></div>
      <div class="table-scroll"><table class="records pace-tbl"><thead><tr><th>Lap</th><th>At</th><th>Lap time</th><th>Clock</th></tr></thead><tbody>${rows.join("")}</tbody></table></div>
      ${segs[0] > 200.5 ? `<p class="sub fine">The ${esc(name.toLowerCase())} starts ${(segs[0] - 200).toFixed(1)} m behind the finish line, so the first split comes at ${segs[0].toFixed(0)} m. The table assumes an even pace.</p>` : `<p class="sub fine">The table assumes an even pace.</p>`}`;
    const best = {};
    for (const r of marks(name)) if (!best[r.who] || r.v < best[r.who].v) best[r.who] = r;
    const list = Object.values(best).sort((a, b) => Math.abs(a.v - T) - Math.abs(b.v - T)).slice(0, 4).sort((a, b) => a.v - b.v);
    near.innerHTML = list.length ? `<h3>${esc(team.short || "")} Falcons closest to ${fmt(T)}</h3><ul>${list.map((r) => `<li><b>${esc(r.who)}</b> ${esc(r.mark)} <small>${esc(r.meet)}, ${esc(r.season)} · ${r.v <= T ? `${(T - r.v).toFixed(2)} s faster than the goal` : `${(r.v - T).toFixed(2)} s slower`}</small></li>`).join("")}</ul>` : "";
  }
  ev.addEventListener("change", () => { inp.value = store.get("t-" + ev.value, DEF[ev.value]); calc(); });
  inp.addEventListener("input", calc);
  $("#pace-form").addEventListener("submit", (e) => { e.preventDefault(); calc(); });
  calc();
})();
