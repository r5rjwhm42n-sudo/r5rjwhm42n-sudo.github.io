/* =====================================================================
   CALENDAR FEEDS
   Builds the subscribable calendars in calendars/ (one per team, plus one
   with every sport) from each team's js/data.js. Phones and calendar apps
   that subscribe re-check the feed every few hours, so new games, time
   changes and final scores show up on their own.

   Runs two ways, with identical output:
     on a Mac:          osascript -l JavaScript tools/build-calendars.js "$PWD"
     anywhere with Node: node tools/build-calendars.js
   The GitHub Action in .github/workflows/calendars.yml reruns it on every
   push that changes a data.js, so the feeds can't fall out of date.
   ===================================================================== */

const SITE = "https://danversfalconsathletics.org";
const STAMP = "20260801T000000Z";   // fixed, so an unchanged schedule gives an identical file

/* ---------- files: macOS JavaScript (osascript) or Node ---------- */
let readText, writeText, makeDir;
if (typeof ObjC !== "undefined") {
  ObjC.import("Foundation");
  readText = (p) => $.NSString.stringWithContentsOfFileEncodingError(p, $.NSUTF8StringEncoding, null).js;
  writeText = (p, s) => $(s).writeToFileAtomicallyEncodingError(p, true, $.NSUTF8StringEncoding, null);
  makeDir = (p) => $.NSFileManager.defaultManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(p, true, $(), null);
} else {
  const fs = require("fs");
  readText = (p) => fs.readFileSync(p, "utf8");
  writeText = (p, s) => fs.writeFileSync(p, s);
  makeDir = (p) => fs.mkdirSync(p, { recursive: true });
}

/* Each data.js declares its content as top-level consts; run it and hand back the ones asked for */
const load = (root, dir, names) => new Function(`${readText(`${root}/${dir}/js/data.js`)}\n;return { ${names} };`)();

/* ---------- iCalendar text ---------- */
const text = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const bytes = (ch) => { const c = ch.codePointAt(0); return c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4; };
/* Lines longer than 75 bytes are folded onto continuation lines that start with a space */
const fold = (line) => {
  const out = [];
  let cur = "", n = 0;
  for (const ch of line) {
    if (n + bytes(ch) > 75) { out.push(cur); cur = " "; n = 1; }
    cur += ch; n += bytes(ch);
  }
  out.push(cur);
  return out.join("\r\n");
};
const stamp = (d) => d.replace(/[-:]/g, "") + "00";   // "2026-10-23T18:30" -> "20261023T183000"
const day = (d) => d.slice(0, 10).replace(/-/g, "");
const nextDay = (d) => {
  const t = new Date(Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10) + 1));
  return t.toISOString().slice(0, 10).replace(/-/g, "");
};
const duration = (min) => `PT${Math.floor(min / 60)}H${min % 60 ? `${min % 60}M` : ""}`;

const TIMEZONE = [
  "BEGIN:VTIMEZONE", "TZID:America/New_York",
  "BEGIN:DAYLIGHT", "TZOFFSETFROM:-0500", "TZOFFSETTO:-0400", "TZNAME:EDT", "DTSTART:19700308T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU", "END:DAYLIGHT",
  "BEGIN:STANDARD", "TZOFFSETFROM:-0400", "TZOFFSETTO:-0500", "TZNAME:EST", "DTSTART:19701101T020000", "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU", "END:STANDARD",
  "END:VTIMEZONE"
];

const vevent = (e) => [
  "BEGIN:VEVENT",
  `UID:${e.uid}@danversfalconsathletics.org`,
  `DTSTAMP:${STAMP}`,
  ...(e.allDay
    ? [`DTSTART;VALUE=DATE:${day(e.date)}`, `DTEND;VALUE=DATE:${nextDay(e.date)}`]
    : [`DTSTART;TZID=America/New_York:${stamp(e.date)}`, `DURATION:${duration(e.minutes)}`]),
  `SUMMARY:${text(e.title)}`,
  ...(e.location ? [`LOCATION:${text(e.location)}`] : []),
  `DESCRIPTION:${text([...e.lines.filter(Boolean), `Schedule and results: ${e.url}`].join("\n"))}`,
  `URL:${e.url}`,
  "END:VEVENT"
];

const calendar = (name, about, events) => [
  "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Danvers Falcons Team Sites//Schedules//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
  `X-WR-CALNAME:${text(name)}`, `X-WR-CALDESC:${text(about)}`, "X-WR-TIMEZONE:America/New_York",
  "REFRESH-INTERVAL;VALUE=DURATION:PT6H", "X-PUBLISHED-TTL:PT6H",
  ...TIMEZONE,
  ...[...events].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.uid < b.uid ? -1 : 1)).flatMap(vevent),
  "END:VCALENDAR"
].map(fold).join("\r\n") + "\r\n";

/* ---------- one adapter per site: its data.js -> a list of events ---------- */
const vs = (home) => (home === false ? "at" : "vs");
const final = (g) => (g.result ? ` (${g.result} ${g.us}–${g.them})` : "");
const page = (dir, query = "") => `${SITE}/${dir}/schedule.html${query}`;

/* Football, soccer, field hockey and volleyball games all look alike */
const games = (key, label, dir, list, minutes, query, extra = () => []) => list
  .filter((g) => !g.cancelled)
  .map((g) => ({
    uid: `${key}-${g.id}`, date: g.date, minutes, url: page(dir, query),
    title: `Danvers ${label} ${vs(g.home)} ${g.opponent}${g.scrimmage ? " (scrimmage)" : ""}${final(g)}`,
    location: g.site,
    lines: [
      g.scrimmage ? "Scrimmage" : g.league ? "Northeastern Conference" : "Non-league",
      g.result ? `Final: Danvers ${g.us}, ${g.opponent} ${g.them}` : null,
      g.summary || null,
      ...extra(g)
    ]
  }));

function feeds(root) {
  const fb = load(root, "football", "TEAM, SCHEDULE");
  const sc = load(root, "soccer", "TEAMS");
  const fh = load(root, "field-hockey", "SCHEDULE");
  const vb = load(root, "volleyball", "SCHEDULE");
  const gf = load(root, "golf", "SCHEDULE");
  const xc = load(root, "cross-country", "MEETS");
  const es = load(root, "esports", "GAMES, SCHEDULE");

  const ticketLine = (t) => (t ? `${t.note || "Tickets"}: ${t.url}` : null);
  const football = games("football", "Football", "football", fb.SCHEDULE, 150, "",
    (g) => [g.home && !g.result ? ticketLine(fb.TEAM.tickets) : null]);
  const girls = games("girls-soccer", "Girls Soccer", "soccer", sc.TEAMS.girls.schedule, 120, "?team=girls");
  const boys = games("boys-soccer", "Boys Soccer", "soccer", sc.TEAMS.boys.schedule, 120, "?team=boys");
  const hockey = games("field-hockey", "Field Hockey", "field-hockey", fh.SCHEDULE, 120, "");
  const volleyball = games("volleyball", "Volleyball", "volleyball", vb.SCHEDULE, 120, "");

  const golf = gf.SCHEDULE.filter((g) => !g.cancelled && !g.noResult).map((g) => ({
    uid: `golf-${g.id}`, date: g.date, minutes: g.tournament ? 300 : 180, url: page("golf"),
    title: g.tournament
      ? `Danvers Golf: ${g.opponent}${g.finish ? ` (${g.finish} of ${g.fieldSize})` : ""}`
      : `Danvers Golf ${vs(g.home)} ${g.opponent}${final(g)}`,
    location: g.site,
    lines: [g.tournament ? (g.league ? "Northeastern Conference tournament" : "MIAA tournament") : g.league ? "Northeastern Conference" : "Non-league",
            g.finish ? `Finished ${g.finish} of ${g.fieldSize} with ${g.us} (${g.toPar})` : g.result ? `Final: Danvers ${g.us}, ${g.opponent} ${g.them}` : null,
            g.summary || null]
  }));

  const squadLine = (label, r) => (!r ? null
    : r.result ? `${label}: ${r.result === "W" ? "won" : "lost"} ${r.us}–${r.them}`
    : r.finishers?.length ? `${label}: ${r.finishers[0].name}${r.finishers[0].place ? `, ${r.finishers[0].place}` : ""}${r.finishers[0].time ? ` in ${r.finishers[0].time}` : ""}`
    : null);
  const crossCountry = xc.MEETS.filter((m) => !m.cancelled && !m.dateTbd).map((m) => ({
    uid: `cross-country-${m.id}`, date: m.date, allDay: !!m.timeTbd, minutes: 120, url: page("cross-country"),
    title: m.name ? `Danvers Cross Country: ${m.name}` : `Danvers Cross Country ${vs(m.home)} ${m.opponent}`,
    location: m.site,
    lines: [m.league ? "Northeastern Conference" : m.postseason ? "Postseason" : m.name ? "Invitational" : "Non-league",
            squadLine("Boys", m.boys), squadLine("Girls", m.girls), m.summary || null,
            m.tickets && !(m.boys || m.girls) ? ticketLine(m.tickets) : null]
  }));

  const GAME = Object.fromEntries(es.GAMES.map((g) => [g.id, g]));
  const esports = es.SCHEDULE.filter((m) => GAME[m.game] && !m.off).map((m) => ({
    uid: `esports-${m.id}`, date: m.date, minutes: 90, url: page("esports"),
    title: `Danvers Esports: ${GAME[m.game].short}${m.opponent ? ` vs ${m.opponent}` : ` (${m.round || `Week ${m.week}`})`}${final(m)}`,
    location: "Online (PlayVS)",
    lines: [`${GAME[m.game].name} · ${GAME[m.game].series}`, m.result ? `Final: Danvers ${m.us}, ${m.opponent || "opponent"} ${m.them}` : null, m.summary || null]
  }));

  const all = [football, girls, boys, hockey, volleyball, golf, crossCountry, esports].flat();
  return [
    ["football", "Danvers Football", football],
    ["girls-soccer", "Danvers Girls Soccer", girls],
    ["boys-soccer", "Danvers Boys Soccer", boys],
    ["field-hockey", "Danvers Field Hockey", hockey],
    ["volleyball", "Danvers Volleyball", volleyball],
    ["golf", "Danvers Golf", golf],
    ["cross-country", "Danvers Cross Country", crossCountry],
    ["esports", "Danvers Esports", esports],
    ["all-sports", "Danvers Falcons", all]
  ];
}

function main(root) {
  makeDir(`${root}/calendars`);
  return feeds(root).map(([file, name, events]) => {
    writeText(`${root}/calendars/${file}.ics`,
      calendar(name, `${name} schedule and results from ${SITE.replace("https://", "")}`, events));
    return `${file}.ics: ${events.length} events`;
  }).join("\n");
}

/* osascript calls run(); Node runs the last line */
function run(argv) { return main(argv[0] || "."); }
if (typeof ObjC === "undefined" && typeof process !== "undefined") console.log(main(process.argv[2] || process.cwd()));
