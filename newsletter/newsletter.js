/* =====================================================================
   Athletic Department newsletter page. Builds the issue from issues.js
   (made by tools/build-newsletter.py from the Smore newsletter):
   /newsletter/ shows the newest issue, /newsletter/?issue=<key> an older one.

   Each time someone opens an issue here, it counts as a view of that
   newsletter on Smore, the same way opening it on Smore does, so the
   Athletic Department sees readers from this site in its Smore view count.
   One view per visit: reloading or coming back in the same tab doesn't
   count again, and local copies and previews of the site never count.
   ===================================================================== */
(function () {
  const ISSUES = window.NEWSLETTERS || [];
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const day = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const kb = (n) => (n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB");
  const pad = (n) => String(n).padStart(2, "0");

  const want = new URLSearchParams(location.search).get("issue");
  const issue = ISSUES.find((i) => i.key === want) || ISSUES[0];
  if (!issue) return;

  /* ---------- Smore view ---------- */
  function countView() {
    if (!/(^|\.)danversfalconsathletics\.org$/.test(location.hostname)) return;
    if (navigator.webdriver || /bot|crawl|spider|slurp|preview|lighthouse/i.test(navigator.userAgent)) return;
    const flag = "dfa-smore-view-" + issue.key;
    try { if (sessionStorage.getItem(flag)) return; sessionStorage.setItem(flag, "1"); } catch (e) { /* private mode: count it */ }
    fetch("https://secure.smore.com/app/reporting/view/" + encodeURIComponent(issue.key),
      { mode: "no-cors", credentials: "include", cache: "no-store", keepalive: true }).catch(() => {});
  }
  if (document.visibilityState === "visible") countView();
  else document.addEventListener("visibilitychange", function once() {
    if (document.visibilityState !== "visible") return;
    document.removeEventListener("visibilitychange", once);
    countView();
  });

  /* ---------- Hero ---------- */
  const words = issue.sections.reduce((n, s) => n + s.blocks.reduce((m, b) =>
    m + ((b.html || []).join(" ") + " " + (b.heading || "") + " " + (b.details || "")).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length, 0), 0);
  const minutes = Math.max(1, Math.round(words / 230));
  document.title = `${issue.title} · Danvers Falcons`;
  const hero = $("#nl-hero");
  if (issue.cover) {
    hero.insertAdjacentHTML("afterbegin", `<img class="nl-hero-img" src="${esc(issue.cover.src)}" alt="" fetchpriority="high">`);
    hero.classList.add("has-img");
  }
  $("#nl-title").textContent = issue.title;
  $(".nl-hero-in").insertAdjacentHTML("beforeend", `
    ${issue.subtitle ? `<p class="lede">${esc(issue.subtitle)}</p>` : ""}
    <div class="nl-meta">
      ${issue.author ? `<span>By <b>${esc(issue.author)}</b></span>` : ""}
      ${issue.published ? `<span>${day(issue.published)}</span>` : ""}
      <span>${minutes} min read</span>
    </div>
    <div class="btn-row">
      <a class="btn btn-primary" href="#${esc(issue.sections[0]?.id || "")}">Start reading</a>
      ${ISSUES.length > 1 ? `<a class="btn btn-ghost" href="#nl-past">Past issues</a>` : ""}
    </div>`);

  /* ---------- Sections ---------- */
  const fileIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.5h8l4.5 4.5v14.5h-12.5z"/><path d="M14 2.5v4.5h4.5"/><path d="M9 13.5l3 3 3-3M12 9.5v7"/></svg>`;
  const linkify = (line) => esc(line).replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" target="_blank" rel="noopener">${u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a>`);

  function block(b) {
    if (b.type === "text") {
      const pic = b.image ? `<figure class="nl-pic"><button type="button" data-full="${esc(b.image.src)}" aria-label="See the photo full size">
          <img src="${esc(b.image.src)}" alt="${esc(b.image.alt || b.heading || "")}" width="${b.image.w}" height="${b.image.h}" loading="lazy"></button></figure>` : "";
      const copy = (b.heading ? `<h3>${esc(b.heading)}</h3>` : "") + (b.html || []).join("");
      return `<div class="nl-text${pic ? " has-pic" : ""}${b.image && b.image.w <= b.image.h ? " tall" : ""}">${pic}<div class="nl-copy">${copy}</div></div>`;
    }
    if (b.type === "button") {
      const lines = (b.details || "").split("\n").map((l) => l.trim()).filter(Boolean);
      return `<div class="nl-cta"><a class="nl-btn" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.text)}<span aria-hidden="true">→</span></a>
        ${lines.length ? `<p class="nl-details">${lines.map(linkify).join("<br>")}</p>` : ""}</div>`;
    }
    if (b.type === "file") {
      const name = b.name.replace(/\s*\.(pdf|docx?|pptx?|xlsx?)$/i, "").trim();
      return `<a class="nl-file" href="${esc(b.url)}" target="_blank" rel="noopener">${fileIcon}
        <span class="nl-file-name">${esc(name)}<small>${[b.kind, b.size ? kb(b.size) : ""].filter(Boolean).join(" · ")}</small></span>
        <span class="nl-file-go">Download</span></a>`;
    }
    return "";
  }

  const titled = issue.sections.filter((s) => s.title);
  let n = 0;
  $("#nl-article").innerHTML = issue.sections.map((s) => `
    <section class="nl-sec card${s.title ? "" : " plain"}" id="${esc(s.id)}">
      ${s.title ? `<h2 class="nl-sec-head"><span class="nl-num">${pad(++n)}</span>${esc(s.title)}</h2>` : ""}
      <div class="nl-sec-body">${s.blocks.map(block).join("")}</div>
    </section>`).join("") + `
    <p class="nl-source">From the Danvers Athletic Department${issue.author ? `, by ${esc(issue.author)}` : ""}. Also on <a href="${esc(issue.url)}" target="_blank" rel="noopener">Smore</a>.</p>`;

  /* ---------- In this issue ---------- */
  const side = $("#nl-side");
  side.hidden = false;
  side.innerHTML = `<details class="nl-toc card" open>
      <summary>In this issue <span>${titled.length} sections</span></summary>
      <ol>${titled.map((s, i) => `<li><a href="#${esc(s.id)}"><span class="nl-num">${pad(i + 1)}</span>${esc(s.title)}</a></li>`).join("")}</ol>
    </details>`;
  const toc = $(".nl-toc", side);
  const small = matchMedia("(max-width: 900px)");
  const fold = () => { toc.open = !small.matches; };
  fold();
  small.addEventListener("change", fold);
  side.addEventListener("click", (e) => { if (e.target.closest("a") && small.matches) toc.open = false; });

  /* highlight the section being read */
  const links = new Map([...side.querySelectorAll("a")].map((a) => [a.hash.slice(1), a]));
  if ("IntersectionObserver" in window) {
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
      const first = issue.sections.find((s) => seen.has(s.id) && links.has(s.id));
      if (!first) return;
      links.forEach((a, id) => a.classList.toggle("on", id === first.id));
    }, { rootMargin: "-90px 0px -55% 0px" });
    issue.sections.forEach((s) => io.observe(document.getElementById(s.id)));
  }

  /* ---------- Past issues ---------- */
  if (ISSUES.length > 1) {
    $("#nl-past").hidden = false;
    $("#nl-past-list").innerHTML = ISSUES.map((i) => `
      <a class="nl-issue card lift${i.key === issue.key ? " current" : ""}" href="${i === ISSUES[0] ? "./" : "?issue=" + encodeURIComponent(i.key)}">
        ${i.cover ? `<img src="${esc(i.cover.src)}" alt="" loading="lazy">` : ""}
        <span class="nl-issue-body"><small>${i.published ? day(i.published) : ""}${i.key === issue.key ? " · Reading now" : ""}</small><b>${esc(i.title)}</b></span>
      </a>`).join("");
  }

  /* ---------- Photos full size ---------- */
  const dlg = $("#viewer");
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".nl-pic button");
    if (!btn || !dlg.showModal) return;
    $("img", dlg).src = btn.dataset.full;
    $("img", dlg).alt = btn.querySelector("img").alt;
    $("figcaption", dlg).textContent = btn.closest(".nl-sec").querySelector(".nl-sec-head")?.textContent.replace(/^\d+/, "") || "";
    dlg.showModal();
  });
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".viewer-close")) dlg.close(); });

  if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());
})();
