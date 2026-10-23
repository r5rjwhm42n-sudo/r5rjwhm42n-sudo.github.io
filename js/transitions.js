/* =====================================================================
   Sport transitions on the hub. Clicking any link into a team site plays
   a short full-screen animation themed to that sport, then opens the
   site, where js/arrive.js lifts the matching cover off the page.
   Scenes are drawn for the screen's own shape (900 units tall, as wide as
   the screen's aspect ratio), so phones and wide monitors both fit.
   Styles: css/transitions.css.
   ===================================================================== */
(function () {
  const SPORTS = { football: "Football", soccer: "Soccer", "field-hockey": "Field Hockey", volleyball: "Volleyball",
                   "cross-country": "Cross Country", golf: "Golf", esports: "Esports" };
  const DURATION = 1450;   // ms until the team site opens
  const R = (n) => Math.round(n * 10) / 10;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const base = new URL(".", location.href).pathname;
  let busy = false;

  /* A group that is hidden until `begin`, then travels along `path` */
  const mover = (path, begin, dur, inner, opts = "") => `
    <g visibility="hidden">
      <set attributeName="visibility" to="visible" begin="${begin}s" fill="freeze"/>
      <animateMotion path="${path}" begin="${begin}s" dur="${dur}s" fill="freeze" calcMode="spline" keyTimes="0;1" keyPoints="0;1" ${opts}/>
      ${inner}
    </g>`;

  const SCENES = {
    /* Down the field: yard lines rush past while the ball spirals deep */
    football(W) {
      const s = Math.max(.6, Math.min(1, W / 1000));
      const yards = [10, 20, 30, 40, 50, 40, 30, 20, 10];
      let lines = "", hash = "", nums = "";
      for (let i = 0; i < 26; i++) {
        const x = 80 + i * 160;
        lines += `M${x} 0V900`;
        if (i % 2 === 0) {
          const n = yards[(i / 2) % yards.length];
          nums += `<text x="${x}" y="200" text-anchor="middle" font-size="104">${n}</text>`
                + `<text x="${x}" y="700" text-anchor="middle" font-size="104" transform="rotate(180 ${x} 665)">${n}</text>`;
        }
      }
      for (let x = 0; x < 4300; x += 32) hash += `M${x} 352v26M${x} 522v26`;
      const path = `M-170 780Q${R(W * .46)} -60 ${R(W + 190)} 230`;
      return `
        <g class="field">
          <path d="${lines}" stroke="#fff" stroke-opacity=".22" stroke-width="5"/>
          <path d="${hash}" stroke="#fff" stroke-opacity=".16" stroke-width="3"/>
          <g fill="#fff" fill-opacity=".13">${nums}</g>
        </g>
        <path class="trail" d="${path}" pathLength="1" fill="none" stroke="#f0b429" stroke-width="${R(10 * s)}" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
        ${mover(path, .15, .95, `
          <g transform="scale(${s})"><g class="spiral fx">
            <ellipse rx="76" ry="43" fill="#fff"/>
            <path d="M-24 0h48M-14 -7v14M-4 -7v14M6 -7v14M16 -7v14" stroke="#18479f" stroke-width="4.5" stroke-linecap="round"/>
            <path d="M-50 -30v60M50 -30v60" stroke="#18479f" stroke-width="6" stroke-opacity=".35"/>
          </g></g>`, `keySplines=".3 .1 .3 1" rotate="auto"`)}`;
    },

    /* Top corner: the ball curls into the net and the net bulges */
    soccer(W) {
      const s = Math.min(1, W / 700);
      const gw = 400 * s, gh = 250 * s, ground = 560;
      const gx = Math.min(W * .58, W - gw - 30 * s), gy = ground - gh;
      let mesh = "";
      for (let d = -gh; d < gw; d += 26 * s) mesh += `M${R(gx + d)} ${R(gy)}l${R(gh)} ${R(gh)}M${R(gx + d + gh)} ${R(gy)}l${R(-gh)} ${R(gh)}`;
      const tx = gx + gw * .78, ty = gy + gh * .3;
      const path = `M-100 ${ground - 40}Q${R(W * .32)} ${R(gy - 300 * s)} ${R(tx)} ${R(ty)}`;
      const id = `tx-net-${Date.now()}`;
      return `
        <path class="fade" style="--d:.1s;--o:.25" d="M0 ${ground}H${W}" stroke="#fff" stroke-width="5"/>
        <path class="draw" style="--d:.15s;--t:.6s" pathLength="1" d="M${R(W * .08)} ${ground}A${R(260 * s)} ${R(110 * s)} 0 0 1 ${R(W * .08 + 520 * s)} ${ground}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="5"/>
        <defs><clipPath id="${id}"><rect x="${R(gx)}" y="${R(gy)}" width="${R(gw)}" height="${R(gh)}"/></clipPath></defs>
        <g class="net fx">
          <path clip-path="url(#${id})" d="${mesh}" stroke="#fff" stroke-opacity=".3" stroke-width="2.2"/>
          <path class="draw" style="--d:.1s;--t:.5s" pathLength="1" d="M${R(gx)} ${ground}V${R(gy)}H${R(gx + gw)}V${ground}" fill="none" stroke="#fff" stroke-width="${R(14 * s)}" stroke-linejoin="round"/>
        </g>
        <circle class="ring fx" style="--d:.88s" cx="${R(tx)}" cy="${R(ty)}" r="${R(70 * s)}" fill="none" stroke="#f0b429" stroke-width="6"/>
        <circle class="ring fx" style="--d:1s" cx="${R(tx)}" cy="${R(ty)}" r="${R(70 * s)}" fill="none" stroke="#fff" stroke-width="4"/>
        ${mover(path, .12, .75, `
          <g transform="scale(${R(1.8 * s)}) translate(-32 -32)"><g class="ball-in fx">
            <circle cx="32" cy="32" r="26" fill="#fff"/>
            <path d="M32 22l9.5 6.9-3.6 11.2H26.1l-3.6-11.2z" fill="#0b1f4d"/>
            <path d="M32 22V6M41.5 28.9l15.2-4.9M37.9 40.1l9.4 12.9M26.1 40.1l-9.4 12.9M22.5 28.9L7.3 24" stroke="#0b1f4d" stroke-width="2.4" fill="none"/>
          </g></g>`, `keySplines=".25 .15 .3 1"`)}`;
    },

    /* Drive: the stick swings through and sends the ball into the circle */
    "field-hockey"(W) {
      const s = Math.min(1, W / 700);
      let stripes = "";
      for (let x = -400; x < W + 900; x += 150) stripes += `M${x} 0h64l-260 900h-64z`;
      const cy = 400, r = 300 * s, ss = s * .72;
      const px = Math.max(W * .2, 110 * s), py = 60;
      const bx = px - 6 * ss, by = py + 618 * ss;
      const end = `${R(W - 130 * s - bx)} ${R(cy + 30 * s - by)}`;
      const rel = `M0 0Q${R(W * .5 - bx)} ${R(-90 * s)} ${end}`;
      return `
        <path class="turf" d="${stripes}" fill="#fff" fill-opacity=".045"/>
        <path class="draw" style="--d:.2s;--t:.7s" pathLength="1" d="M${W} ${R(cy - r)}A${R(r)} ${R(r)} 0 0 0 ${W} ${R(cy + r)}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="7"/>
        <path class="draw" style="--d:.3s;--t:.7s" pathLength="1" d="M${W} ${R(cy - r - 90 * s)}A${R(r + 90 * s)} ${R(r + 90 * s)} 0 0 0 ${W} ${R(cy + r + 90 * s)}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="5" stroke-dasharray="1"/>
        <rect class="fade" style="--d:.2s" x="${R(W - 26 * s)}" y="${R(cy - 70 * s)}" width="${R(26 * s)}" height="${R(140 * s)}" fill="none" stroke="#fff" stroke-width="6"/>
        <g class="stick" style="transform-box:view-box;transform-origin:${R(px)}px ${py}px">
          <g transform="translate(${R(px)} ${py}) scale(${R(ss)})">
            <path d="M0 0L26 520C33 586 12 634 -34 628C-60 624 -62 598 -42 592" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M-6 -6L4 150" stroke="#f0b429" stroke-width="24" stroke-linecap="round"/>
          </g>
        </g>
        <path class="draw" style="--d:.42s;--t:.5s" pathLength="1" d="M${R(bx)} ${R(by)}Q${R(W * .5)} ${R(by - 90 * s)} ${R(W - 130 * s)} ${R(cy + 30 * s)}" fill="none" stroke="#f0b429" stroke-width="${R(8 * s)}" stroke-linecap="round" stroke-opacity=".85"/>
        <g transform="translate(${R(bx)} ${R(by)})">
          <animateMotion path="${rel}" begin="0.42s" dur="0.5s" fill="freeze" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines=".1 .6 .3 1"/>
          <circle r="${R(22 * s)}" fill="#fff"/>
        </g>
        <circle class="ring fx" style="--d:.9s" cx="${R(W - 130 * s)}" cy="${R(cy + 30 * s)}" r="${R(60 * s)}" fill="none" stroke="#f0b429" stroke-width="6"/>`;
    },

    /* Set and spike: the ball floats over the net, then gets hammered down */
    volleyball(W) {
      const s = Math.min(1, W / 700);
      const netX = W * .55, floor = 820, land = W * .84;
      let mesh = "";
      for (let y = 290; y <= 470; y += 18) mesh += `M${R(netX - 16 * s)} ${y}h${R(32 * s)}`;
      const curve = `M-60 700C${R(W * .18)} 110 ${R(netX - 330 * s)} 50 ${R(netX - 110 * s)} 170`;
      const path = `${curve}L${R(land)} ${R(floor - 40 * s)}`;
      return `
        <path class="fade" style="--d:.1s;--o:.3" d="M0 ${floor}H${W}" stroke="#fff" stroke-width="5"/>
        <path class="draw" style="--d:.1s;--t:.45s" pathLength="1" d="M${R(netX)} ${floor}V250" stroke="#fff" stroke-opacity=".6" stroke-width="${R(9 * s)}"/>
        <g class="fade" style="--d:.25s">
          <rect x="${R(netX - 16 * s)}" y="280" width="${R(32 * s)}" height="200" fill="#fff" fill-opacity=".08" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>
          <path d="${mesh}" stroke="#fff" stroke-opacity=".4" stroke-width="2"/>
          <path d="M${R(netX - 22 * s)} 280h${R(44 * s)}" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
          <path d="M${R(netX)} 280V180" stroke="#f0b429" stroke-width="6" stroke-dasharray="14 10"/>
        </g>
        <path class="swing" pathLength="1" d="M${R(netX - 250 * s)} 70Q${R(netX - 60 * s)} 40 ${R(netX - 40 * s)} 250" fill="none" stroke="#f0b429" stroke-width="${R(12 * s)}" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
        <path class="floor-flash" d="M${R(land - 160 * s)} ${floor}H${R(land + 160 * s)}" stroke="#f0b429" stroke-width="8" stroke-linecap="round"/>
        <ellipse class="ring fx" style="--d:1.04s" cx="${R(land)}" cy="${floor}" rx="${R(90 * s)}" ry="${R(22 * s)}" fill="none" stroke="#f0b429" stroke-width="6"/>
        <ellipse class="ring fx" style="--d:1.14s" cx="${R(land)}" cy="${floor}" rx="${R(90 * s)}" ry="${R(22 * s)}" fill="none" stroke="#fff" stroke-width="4"/>
        <path class="vb-curve" d="${curve}" fill="none" stroke="none"/>
        ${mover(path, .12, .95, `
          <g transform="scale(${R(1.6 * s)}) translate(-32 -32)"><g class="spin fx" style="--t:.45s">
            <circle cx="32" cy="32" r="26" fill="#fff"/>
            <path d="M32 32c0-11 5-20 14-24.5M32 32c-9.5 5.5-20 5.5-27.5.5M32 32c9.5 5.5 14.5 14.5 13.5 24.5" stroke="#18479f" stroke-width="3" fill="none"/>
          </g></g>`, `keySplines=".25 .7 .45 1" class="vb-motion"`)}`;
    },

    /* The course: the route draws itself while a runner passes the mile flags */
    "cross-country"(W) {
      const s = Math.min(1, W / 700);
      const course = `M-40 520C${R(W * .14)} 390 ${R(W * .24)} 610 ${R(W * .38)} 480S${R(W * .58)} 260 ${R(W * .71)} 350S${R(W * .88)} 280 ${R(W + 60)} 130`;
      return `
        <path class="hills-back" d="M-200 900L-200 480C${R(W * .15)} 400 ${R(W * .3)} 460 ${R(W * .46)} 430S${R(W * .76)} 370 ${R(W + 260)} 450L${R(W + 260)} 900Z" fill="#06143a" fill-opacity=".3"/>
        <path class="hills-front" d="M-260 900L-260 640C${R(W * .2)} 570 ${R(W * .42)} 630 ${R(W * .62)} 585S${R(W * .9)} 570 ${R(W + 360)} 615L${R(W + 360)} 900Z" fill="#06143a" fill-opacity=".4"/>
        <path class="fade" style="--d:.1s;--o:.22" d="${course}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-dasharray="1 20"/>
        <path class="draw xc-course" style="--d:.15s;--t:.95s" pathLength="1" d="${course}" fill="none" stroke="#fff" stroke-width="${R(9 * s)}" stroke-linecap="round"/>
        <g class="xc-flags"></g>
        ${mover(course, .15, .95, `
          <circle class="runner-ring fx" r="${R(26 * s)}" fill="none" stroke="#f0b429" stroke-width="4"/>
          <circle r="${R(14 * s)}" fill="#f0b429" stroke="#fff" stroke-width="4"/>`, `keySplines=".45 .05 .2 1"`)}`;
    },

    /* Sink it: a breaking putt rolls across the green and drops */
    golf(W) {
      const s = Math.min(1, W / 700);
      const cx = W * .52, cy = 430, sx = W * .9, sy = 690;
      const aim = `M${R(sx)} ${sy}C${R(W * .74)} 720 ${R(W * .7)} 440 ${R(cx)} ${cy}`;
      const rel = `M0 0C${R(W * .74 - sx)} 30 ${R(W * .7 - sx)} -250 ${R(cx - sx)} ${cy - sy}`;
      const pole = 300 * s;
      return `
        <ellipse class="fade" style="--d:.1s" cx="${R(W * .6)}" cy="520" rx="${R(W * .5)}" ry="250" fill="#fff" fill-opacity=".07" stroke="#fff" stroke-opacity=".16" stroke-width="6"/>
        <ellipse class="fade" style="--d:.15s;--o:.5" cx="${R(W * .6)}" cy="520" rx="${R(W * .5 + 34)}" ry="276" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="22"/>
        <path class="fade" style="--d:.15s;--o:.45" d="${aim}" fill="none" stroke="#fff" stroke-width="${R(6 * s)}" stroke-linecap="round" stroke-dasharray="0 22"/>
        <ellipse cx="${R(cx)}" cy="${cy}" rx="${R(30 * s)}" ry="${R(11 * s)}" fill="#06102b" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>
        <g class="pop" style="--d:.12s;transform-box:fill-box;transform-origin:50% 100%">
          <path d="M${R(cx)} ${cy}V${R(cy - pole)}" stroke="#fff" stroke-width="${R(6 * s)}" stroke-linecap="round"/>
          <path class="flag" style="transform-box:fill-box;transform-origin:0 50%" d="M${R(cx)} ${R(cy - pole)}L${R(cx + 128 * s)} ${R(cy - pole + 36 * s)}L${R(cx)} ${R(cy - pole + 72 * s)}Z" fill="#f0b429"/>
        </g>
        <ellipse class="ring fx" style="--d:1.03s" cx="${R(cx)}" cy="${cy}" rx="${R(46 * s)}" ry="${R(16 * s)}" fill="none" stroke="#f0b429" stroke-width="5"/>
        <ellipse class="ring fx" style="--d:1.13s" cx="${R(cx)}" cy="${cy}" rx="${R(46 * s)}" ry="${R(16 * s)}" fill="none" stroke="#fff" stroke-width="4"/>
        <g transform="translate(${R(sx)} ${sy})">
          <animateMotion path="${rel}" begin="0.2s" dur="0.84s" fill="freeze" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines=".2 .7 .35 1"/>
          <g class="drop fx"><circle r="${R(17 * s)}" fill="#fff"/><circle cx="${R(-5 * s)}" cy="${R(-5 * s)}" r="${R(5 * s)}" fill="#dfe6f5"/></g>
        </g>`;
    },

    /* Press start: pixels burst out and a controller draws itself */
    esports(W) {
      const s = Math.min(1, W / 700);
      const cx = W > 900 ? W * .64 : W * .5, cy = 370;
      let seed = 7, px = "";
      const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
      const colors = ["#ffffff", "#f0b429", "#8fb0ff", "#ffffff"];
      for (let i = 0; i < 44; i++) {
        const a = (i / 44) * Math.PI * 2 + rnd() * .4, dist = (190 + rnd() * 340) * s, size = (12 + rnd() * 28) * s;
        px += `<rect class="px fx" x="${R(cx - size / 2)}" y="${R(cy - size / 2)}" width="${R(size)}" height="${R(size)}" fill="${colors[i % 4]}"`
            + ` style="--tx:${R(Math.cos(a) * dist)}px;--ty:${R(Math.sin(a) * dist)}px;--d:${R(.15 + rnd() * .3)}s"/>`;
      }
      let grid = "";
      for (let x = 0; x <= W; x += 60) grid += `M${x} 0V900`;
      for (let y = 0; y <= 900; y += 60) grid += `M0 ${y}H${W}`;
      const sc = 7.4 * s;
      return `
        <path class="fade" style="--d:.1s;--o:.06" d="${grid}" stroke="#fff" stroke-width="2"/>
        <rect class="scan" x="0" y="0" width="${W}" height="10" fill="#fff" fill-opacity=".12"/>
        ${px}
        <g transform="translate(${R(cx - 32 * sc)} ${R(cy - 35 * sc)}) scale(${R(sc)})">
          <path class="draw" style="--d:.2s;--t:.75s" pathLength="1" d="M20 20h24c7 0 11 5 12.5 13l2.2 12.5c1 6-5.5 9.5-9.5 5.2L42 43H22l-7.2 7.7c-4 4.3-10.5.8-9.5-5.2L7.5 33C9 25 13 20 20 20z" fill="none" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
          <path class="pop fx" style="--d:.78s" d="M19 28v10M14 33h10" stroke="#f0b429" stroke-width="2.4" stroke-linecap="round"/>
          <circle class="pop fx" style="--d:.86s" cx="43" cy="30" r="2.6" fill="#f0b429"/>
          <circle class="pop fx" style="--d:.92s" cx="49" cy="36" r="2.6" fill="#f0b429"/>
        </g>`;
    }
  };

  /* Touch-ups that need the scene in the page to measure it */
  const AFTER = {
    /* The set takes longer than the spike, so split the timing by the two parts' lengths */
    volleyball(svg) {
      const curve = svg.querySelector(".vb-curve"), motion = svg.querySelector(".vb-motion");
      const whole = document.createElementNS("http://www.w3.org/2000/svg", "path");
      whole.setAttribute("d", motion.getAttribute("path"));
      svg.appendChild(whole);
      const split = Math.min(.9, curve.getTotalLength() / whole.getTotalLength());
      whole.remove();
      motion.setAttribute("keyTimes", "0;0.72;1");
      motion.setAttribute("keyPoints", `0;${split.toFixed(3)};1`);
      motion.setAttribute("keySplines", ".25 .7 .45 1;.7 0 .95 .5");
    },
    /* Mile flags pop up where the runner reaches them */
    "cross-country"(svg, W) {
      const course = svg.querySelector(".xc-course"), len = course.getTotalLength();
      const s = Math.min(1, W / 700);
      svg.querySelector(".xc-flags").innerHTML = [[.24, "1 MI"], [.5, "2 MI"], [.74, "3 MI"]].map(([f, label]) => {
        const p = course.getPointAtLength(len * f);
        return `<g transform="translate(${R(p.x)} ${R(p.y)}) scale(${R(s)})">
          <g class="pop" style="--d:${R(.15 + .95 * f)}s;transform-box:fill-box;transform-origin:50% 100%">
            <path d="M0 0V-86" stroke="#fff" stroke-width="5"/>
            <path d="M0 -86L46 -72L0 -58Z" fill="#f0b429"/>
            <text x="0" y="-100" text-anchor="middle" font-size="30" fill="#fff">${label}</text>
          </g></g>`;
      }).join("");
    }
  };

  function play(sport, href, x, y, label) {
    busy = true;
    const W = Math.max(320, Math.round(900 * innerWidth / innerHeight));
    const tx = document.createElement("div");
    tx.className = `tx tx-${sport}`;
    tx.setAttribute("aria-hidden", "true");
    /* grow from the click, kept on screen, far enough to cover every corner */
    x = Math.min(Math.max(x, 0), innerWidth);
    y = Math.min(Math.max(y, 0), innerHeight);
    tx.style.setProperty("--x", `${x}px`);
    tx.style.setProperty("--y", `${y}px`);
    tx.style.setProperty("--r", `${Math.ceil(Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))) + 20}px`);
    tx.innerHTML = `
      <div class="tx-stage">
        <div class="tx-bg"></div>
        <svg class="tx-scene" viewBox="0 0 ${W} 900" preserveAspectRatio="xMidYMid slice">${SCENES[sport](W)}</svg>
        <div class="tx-title">
          <span class="tx-kicker">Danvers Falcons</span>
          <span class="tx-name"><b>${label}</b></span>
          ${sport === "esports" ? `<span class="tx-press">Press start</span>` : ""}
        </div>
      </div>`;
    document.body.appendChild(tx);
    AFTER[sport]?.(tx.querySelector(".tx-scene"), W);

    /* start fetching the team page now, and let it know to finish the move */
    const pre = document.createElement("link");
    pre.rel = "prefetch";
    pre.href = href;
    document.head.appendChild(pre);
    try { sessionStorage.setItem("dfa-arrive", String(Date.now() + DURATION)); } catch (e) { /* no handoff, still fine */ }
    setTimeout(() => { location.href = href; }, DURATION);
  }

  document.addEventListener("click", (e) => {
    if (busy || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !url.pathname.startsWith(base)) return;
    const sport = url.pathname.slice(base.length).split("/")[0];
    if (!SPORTS[sport] || reduce.matches) return;
    e.preventDefault();
    const squad = sport === "soccer" && url.searchParams.get("team");
    const label = squad === "boys" ? "Boys Soccer" : squad === "girls" ? "Girls Soccer" : SPORTS[sport];
    /* keyboard clicks have no pointer position: grow from the middle of the link */
    let x = e.clientX, y = e.clientY;
    if (!x && !y) { const r = a.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
    play(sport, url.href, x, y, label);
  });

  /* Coming back with the Back button: clear the old overlay */
  addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    document.querySelectorAll(".tx").forEach((n) => n.remove());
    busy = false;
  });
})();
