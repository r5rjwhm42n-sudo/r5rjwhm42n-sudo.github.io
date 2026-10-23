/* =====================================================================
   Shared by every page, hub and team sites alike:
     · registers the service worker (offline use + install as an app)
     · DFA game-day helpers used by extras.js and the hub: where a
       game is, its forecast, directions, and whether it's on right now.
   ===================================================================== */
(function () {
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
  }

  /* Town centers for every venue the teams play at, for the forecast.
     Checked in order, so longer names come before shorter ones. */
  const PLACES = [
    ["North Reading", 42.575, -71.079], ["Lynn Classical", 42.47, -70.95], ["Malden Catholic", 42.425, -71.066],
    ["Bishop Fenwick", 42.528, -70.929], ["St. Mary", 42.467, -70.949], ["St. John's Prep", 42.575, -70.93],
    ["Essex Tech", 42.575, -70.95], ["Mystic Valley", 42.425, -71.066], ["Pioneer", 42.408, -71.054],
    ["Masconomet", 42.661, -71.004], ["Bradley Palmer", 42.637, -70.95], ["Boxford", 42.661, -71.004],
    ["Hamilton", 42.618, -70.857], ["Wenham", 42.604, -70.891], ["Triton", 42.755, -70.946], ["Byfield", 42.755, -70.946],
    ["Barnstable", 41.652, -70.288], ["Hyannis", 41.652, -70.288], ["Concord", 42.46, -71.349],
    ["Tedesco", 42.5, -70.857], ["Gannon", 42.467, -70.949], ["Turner Hill", 42.679, -70.841], ["Ferncroft", 42.595, -71.016],
    ["Stage Fort", 42.616, -70.662], ["Wrentham", 42.067, -71.328], ["Devens", 42.545, -71.612],
    ["Beverly", 42.558, -70.88], ["Peabody", 42.528, -70.929], ["Salem", 42.519, -70.896], ["Marblehead", 42.5, -70.857],
    ["Swampscott", 42.471, -70.918], ["Gloucester", 42.616, -70.662], ["Saugus", 42.465, -71.01], ["Winthrop", 42.375, -70.983],
    ["Lynnfield", 42.539, -71.048], ["Lynn", 42.467, -70.949], ["Melrose", 42.459, -71.066], ["Reading", 42.526, -71.095],
    ["Andover", 42.658, -71.137], ["Ipswich", 42.679, -70.841], ["Manchester", 42.578, -70.769], ["Rockport", 42.656, -70.62],
    ["Newburyport", 42.812, -70.877], ["Haverhill", 42.776, -71.077], ["Bradford", 42.776, -71.077], ["Stoneham", 42.48, -71.099],
    ["Malden", 42.425, -71.066], ["Everett", 42.408, -71.054], ["Wakefield", 42.506, -71.073], ["Arlington", 42.415, -71.157],
    ["Medford", 42.418, -71.106], ["Weston", 42.367, -71.303], ["Middleton", 42.595, -71.016], ["Topsfield", 42.637, -70.95],
    ["Danvers", 42.575, -70.93]
  ];
  const HOME = [42.575, -70.93];

  /* Where a game is: the first known name in the venue, then (away games only) the opponent */
  function place(g) {
    const find = (text) => PLACES.find(([name]) => text.includes(name));
    const hit = find(g.site || "") || (g.home ? null : find(`${g.opponent || ""} ${g.name || ""}`));
    return hit ? [hit[1], hit[2]] : HOME;
  }

  const mapsUrl = (g) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    !g.site || /Danvers/.test(g.site) && g.home !== false ? "Danvers High School, 60 Cabot Road, Danvers, MA" : `${g.site}, MA`)}`;

  /* Weather codes from Open-Meteo, grouped into what a fan cares about */
  const SKY = [
    [[0], "Clear", "sun"], [[1, 2], "Partly cloudy", "partly"], [[3], "Cloudy", "cloud"], [[45, 48], "Fog", "cloud"],
    [[51, 53, 55, 56, 57], "Drizzle", "rain"], [[61, 63, 65, 66, 67, 80, 81, 82], "Rain", "rain"],
    [[71, 73, 75, 77, 85, 86], "Snow", "snow"], [[95, 96, 99], "Thunderstorms", "storm"]
  ];
  const ICONS = {
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
    partly: '<circle cx="9" cy="9" r="3.5"/><path d="M9 2.5v1.5M2.5 9H4M4.4 4.4l1 1M13.6 4.4l-1 1"/><path d="M8 19h9a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.4 1.7A3.2 3.2 0 0 0 8 19z"/>',
    cloud: '<path d="M7 19h10a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 11.5 3.8 3.8 0 0 0 7 19z"/>',
    rain: '<path d="M7 15h10a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 7.5 3.8 3.8 0 0 0 7 15z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',
    snow: '<path d="M7 15h10a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 7.5 3.8 3.8 0 0 0 7 15z"/><path d="M8 19h.01M12 20h.01M16 19h.01"/>',
    storm: '<path d="M7 14h10a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 6.5 3.8 3.8 0 0 0 7 14z"/><path d="M12 15l-2 4h3l-2 4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    "partly-night": '<path d="M13.5 3.5a5 5 0 0 0 5.5 7 5 5 0 0 1-5.5-7z"/><path d="M7 20h9a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.4 1.7A3.2 3.2 0 0 0 7 20z"/>'
  };
  const icon = (kind) => `<svg class="dfa-wx-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[kind] || ICONS.cloud}</svg>`;

  /* Forecast for a game's start time (free Open-Meteo service, no key). Resolves to null when it's
     too far out, already over, or the service can't be reached. */
  const memo = {};
  function weather(g) {
    const start = new Date(g.date).getTime();
    if (!g.date || g.timeTbd || start < Date.now() - 3 * 36e5 || start > Date.now() + 15 * 864e5) return Promise.resolve(null);
    const [lat, lon] = place(g);
    const key = `${lat},${lon}`;
    memo[key] = memo[key] || fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
        + "&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m,is_day"
        + "&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York&forecast_days=16")
      .then((r) => (r.ok ? r.json() : null)).catch(() => null);
    return memo[key].then((data) => {
      if (!data?.hourly) return null;
      const hour = g.date.slice(0, 13) + ":00";   // the game's local start hour
      const i = data.hourly.time.indexOf(hour);
      if (i < 0) return null;
      const code = data.hourly.weather_code[i];
      let [, label, kind] = SKY.find(([codes]) => codes.includes(code)) || [null, "Cloudy", "cloud"];
      if (data.hourly.is_day?.[i] === 0 && (kind === "sun" || kind === "partly")) kind = kind === "sun" ? "moon" : "partly-night";
      return {
        temp: Math.round(data.hourly.temperature_2m[i]), rain: data.hourly.precipitation_probability[i] ?? 0,
        wind: Math.round(data.hourly.wind_speed_10m[i]), label, kind, icon: icon(kind)
      };
    });
  }
  const weatherText = (w) => `${w.temp}° · ${w.label}${w.rain >= 20 ? ` · ${w.rain}% rain` : ""}${w.wind >= 12 ? ` · wind ${w.wind} mph` : ""}`;

  /* How long each sport's events usually run, for the "live now" window */
  const LENGTH = { football: 150, soccer: 120, "field-hockey": 120, volleyball: 120, golf: 240, "cross-country": 120, esports: 90 };
  function state(g, sport) {
    if (!g.date || g.timeTbd || g.cancelled || g.result || g.finish) return "";
    const start = new Date(g.date).getTime(), now = Date.now();
    if (now >= start - 10 * 6e4 && now <= start + (LENGTH[sport] || 120) * 6e4) return "live";
    if (new Date(g.date).toDateString() === new Date().toDateString() && now < start) return "today";
    return "";
  }

  /* Each opponent's school colors (main, trim), from the school's MaxPreps page */
  const SCHOOL_COLORS = {
    "Andover": ["#022C66", "#C8880A"], "Arlington": ["#CC0022", "#454444"], "Barnstable": ["#CC0022", "#FFFFFF"],
    "Beverly": ["#222222", "#D5350B"], "Bishop Fenwick": ["#222222", "#C8880A"], "Concord-Carlisle": ["#8F0018", "#FFFFFF"],
    "Essex Tech": ["#00824B", "#FFFFFF"], "Gloucester": ["#8F0018", "#C8880A"], "Hamilton-Wenham": ["#034CB2", "#FFFFFF"],
    "Ipswich": ["#222222", "#D5350B"], "Lynn Classical": ["#00824B", "#C8880A"], "Lynnfield": ["#034CB2", "#C8880A"],
    "Malden Catholic": ["#034CB2", "#C8880A"], "Marblehead": ["#222222", "#CC0022"], "Masconomet": ["#CC0022", "#FFFFFF"],
    "Medford": ["#034CB2", "#FFFFFF"], "Melrose": ["#CC0022", "#FFFFFF"], "Mystic Valley": ["#8F0018", "#C8880A"],
    "North Reading": ["#00824B", "#C8880A"], "Peabody": ["#034CB2", "#FFFFFF"], "Pingree": ["#00824B", "#FFFFFF"],
    "Pioneer Charter": ["#022C66", "#046DFF"], "Reading": ["#222222", "#CC0022"], "Rockport": ["#8F0018", "#454444"],
    "Salem": ["#CC0022", "#FFFFFF"], "Saugus": ["#CC0022", "#FFFFFF"], "St. John's Prep": ["#022C66", "#FFFFFF"],
    "St. Mary's": ["#034CB2", "#C8880A"], "Stoneham": ["#034CB2", "#FFFFFF"], "Swampscott": ["#034CB2", "#FFFFFF"],
    "Triton": ["#034CB2", "#FFFFFF"], "Wakefield": ["#CC0022", "#FFFFFF"], "Weston": ["#CC0022", "#FFFFFF"],
    "Wilmington": ["#022C66", "#FFFFFF"], "Winthrop": ["#022C66", "#C8880A"]
  };
  const school = (name) => String(name || "").split(/\s*(?:\/|&)\s*/)[0].trim();
  const hasColors = (name) => !!SCHOOL_COLORS[school(name)];
  /* A round badge in the opponent's colors with its initials ("BF" for Bishop Fenwick, "S" for Salem) */
  function badge(name, size = "") {
    const s = school(name);
    const [c1, c2] = SCHOOL_COLORS[s] || ["#5b647a", "#ffffff"];
    const words = s.replace(/^St\.\s*/, "St ").split(/[\s-]+/).filter((w) => /^[A-Za-z]/.test(w));
    const letters = (words.length > 1 ? words.slice(0, 2).map((w) => w[0]).join("") : s.charAt(0)).toUpperCase();
    return `<span class="opp-badge ${size}" style="--c1:${c1};--c2:${c2}" aria-hidden="true">${letters}</span>`;
  }
  const css = document.createElement("style");
  css.textContent = `
    .opp-badge { display: inline-grid; place-items: center; flex: none; width: 30px; height: 30px; border-radius: 50%; vertical-align: middle;
      background: var(--c1); color: #fff; box-shadow: inset 0 0 0 2.5px var(--c2), 0 0 0 1px rgba(11, 31, 77, .12);
      font: 800 13px/1 "Saira Condensed", "Arial Narrow", sans-serif; letter-spacing: .02em; text-transform: uppercase; }
    .opp-badge.md { width: 46px; height: 46px; font-size: 19px; box-shadow: inset 0 0 0 3px var(--c2), 0 0 0 1px rgba(11, 31, 77, .12); }
    .opp-badge.lg { width: 56px; height: 56px; font-size: 22px; box-shadow: inset 0 0 0 3.5px var(--c2), 0 0 0 2px rgba(255, 255, 255, .9); }`;
  document.head.appendChild(css);

  window.DFA = { place, mapsUrl, weather, weatherText, state, icon, badge, hasColors };
})();
