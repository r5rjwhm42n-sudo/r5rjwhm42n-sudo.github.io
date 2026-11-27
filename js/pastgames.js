/* Past seasons, game by game — shared by the fall team sites. Each site's js/pastgames.js sets window.PAST_GAMES
   ({ source, seasons: { "2025": { record, note, rows } } }, or one of those per team for soccer); this draws it as a
   section right after the Year by Year table on the history page. Load it after the site's own site.js.
   A row: [date "2025-09-03", home 1/0, opponent, tag ("Postseason", "Thanksgiving", …), "W"/"L"/"T"/null, us, them, note] */
(function () {
  const P = window.PAST_GAMES;
  if (!P) return;
  const D = P.seasons ? P : P[document.body.dataset.team];   // soccer: one set per team
  const anchor = document.getElementById("records");
  if (!D || !anchor) return;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const MON = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  const DAY = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  const when = (iso) => { const d = new Date(iso + "T12:00:00"); return `<span class="pg-dow">${DAY[d.getDay()]} </span>${MON[d.getMonth()]} ${d.getDate()}`; };
  const years = Object.keys(D.seasons).sort((a, b) => b - a);
  const block = anchor.closest("section");
  block.insertAdjacentHTML("afterend", `<section class="block" id="past-games"><div class="wrap">
  <div class="section-head"><h2>Game by Game</h2></div>
  <p class="sub">The last ${["", "", "two", "three", "four", "five", "six"][years.length] || years.length} completed seasons, game by game, with the scores.</p>
  <div class="filters" role="group" aria-label="Season">${years.map((y, i) => `<button class="chip" type="button" aria-pressed="${i === 0}" data-year="${y}">${y}</button>`).join("")}</div>
  <p class="pg-sum" id="pg-sum" aria-live="polite"></p>
  <div class="card table-scroll"><table class="records pg-table">
    <thead><tr><th>Date</th><th>Result</th><th>Opponent</th></tr></thead>
    <tbody id="pg-rows"></tbody>
  </table></div>
  <p class="sub fine" id="pg-note"></p>
</div></section>`);
  const sec = document.getElementById("past-games");
  const draw = (y) => {
    const S = D.seasons[y];
    const n = S.rows.length;
    sec.querySelector("#pg-sum").innerHTML = `<b>${esc(y)}</b> · ${n} game${n === 1 ? "" : "s"} on file · results ${esc(S.record)}`;
    sec.querySelector("#pg-rows").innerHTML = S.rows.map(([date, home, opp, tag, res, us, them, note]) => `<tr>
      <td>${when(date)}</td>
      <td>${res ? `<b class="pg-res pg-${res.toLowerCase()}">${esc(res)}</b> ${esc(us)}–${esc(them)}` : '<span class="pg-none">—</span>'}</td>
      <td><span class="pg-va">${home ? "vs" : "at"}</span> ${esc(opp)}${tag ? ` <span class="pg-tag">${esc(tag)}</span>` : ""}${note ? `<span class="pg-note">${esc(note)}</span>` : ""}</td>
    </tr>`).join("");
    sec.querySelector("#pg-note").textContent = [S.note, D.source].filter(Boolean).join(" ");
  };
  sec.querySelector(".filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    sec.querySelectorAll(".filters .chip").forEach((c) => c.setAttribute("aria-pressed", c === chip));
    draw(chip.dataset.year);
  });
  draw(years[0]);
})();
