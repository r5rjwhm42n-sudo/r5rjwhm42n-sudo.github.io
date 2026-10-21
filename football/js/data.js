/* =====================================================================
   DANVERS FALCONS FOOTBALL — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or marked tbd: true) shows up on the site as
   "TBD" so it is obvious what still needs to come from the team.
   ===================================================================== */

const HUDL_TEAM = "https://fan.hudl.com/usa/ma/danvers/organization/17204/danvers-high-school/team/33811";

const TEAM = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  season: 2026,
  location: "Danvers, MA",
  conference: "Northeastern Conference",
  division: "MIAA Division 4",
  headCoach: "Ryan Nolan",
  assistants: ["Bryan Ibbitson", "Jon Babula", "Angel Adamas", "Tom Walfield", "Kyle Brennan",
               "Andrew Barton", "Sean Dunn", "Jeff Smith", "Tom Ladd"],
  stadium: "Dr. Deering Stadium",
  address: "60 Cabot Road, Danvers, MA 01923",
  links: {
    hudl: HUDL_TEAM + "/boys-varsity-football",
    hudlVideo: HUDL_TEAM + "/video",
    athletics: "https://www.danversfalconsathletics.com/",
    maxpreps: "https://www.maxpreps.com/ma/danvers/danvers-falcons/football/"
  }
};

/* ---------------------------------------------------------------------
   SCHEDULE
   result: "W" | "L" | null (null = not played yet)
   cancelled: true marks a game that was called off (kept on the schedule,
              shown as "Cancelled", left out of the record and countdown)
   us / them: final score        home: true | false
   quarters: { us:[q1,q2,q3,q4], them:[...] }  (optional)
   scoring: list of scoring plays (optional)
   performers: top performers    notes: short bullet points
   --------------------------------------------------------------------- */
const SCHEDULE = [
  {
    id: 1, date: "2026-09-10T18:30", opponent: "Concord-Carlisle", mascot: "Patriots",
    home: true, league: false, site: "Dr. Deering Stadium, Danvers",
    result: "W", us: 16, them: 0,
    quarters: { us: [7, 0, 3, 6], them: [0, 0, 0, 0] },
    summary: "Three different Falcons ran for 100+ yards and the defense pitched a shutout in the season opener. Danvers piled up 343 yards of offense, held the ball for roughly 40 minutes and allowed just 6 rushing yards.",
    scoring: [
      { q: "1st half", play: "Zach Fultz 26-yd run (Colby Medeiros kick)", score: "7–0" },
      { q: "3rd", play: "Colby Medeiros 19-yd field goal", score: "10–0" },
      { q: "4th · 5:43", play: "Evan Kaciki 1-yd run (kick blocked)", score: "16–0" }
    ],
    performers: [
      { name: "Zach Fultz", line: "12 carries, 120 yds, TD" },
      { name: "Evan Kaciki", line: "115 rushing yds, TD" },
      { name: "Jack Houston", line: "105 rushing yds" },
      { name: "Tim Nikiforov", line: "1 catch, 21 yds" }
    ],
    notes: ["343 total yards for Danvers", "Concord-Carlisle held to 6 rushing yards", "O-line: McGloin (LT), Travers (LG), Mahler (C), Kinney (RG)"],
    sources: [
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/trio-of-100-yard-runners-dominant-defense-propel-danvers-to-season-opening-win/article_d2a33c47-f2a5-4bca-b56d-0f0ed3b1b565.html" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/concord-carlisle-vs-danvers/9-10-2026/?c=8b2fa199-c0f7-480b-90f5-b59095f1dcef" }
    ]
  },
  {
    id: 2, date: "2026-09-18T19:00", opponent: "Melrose", mascot: "Red Raiders",
    home: false, league: false, site: "Melrose, MA",
    result: "W", us: 17, them: 7,
    quarters: null,
    summary: "Zach Fultz punched in two short touchdowns before halftime — the second with three seconds left in the half — and Colby Medeiros added a 35-yard field goal as the Falcons won on the road.",
    scoring: [
      { q: "1st half", play: "Zach Fultz 1-yd run", score: null },
      { q: "2nd · 0:03", play: "Zach Fultz 2-yd run", score: null },
      { q: "—", play: "Colby Medeiros 35-yd field goal", score: null }
    ],
    performers: [
      { name: "Jack Houston", line: "79 rushing yds · 2 catches, 45 yds" },
      { name: "Zach Fultz", line: "56 rushing yds, 2 TD" },
      { name: "Colby Medeiros", line: "35-yd FG · onside kick to open 2nd half" },
      { name: "Juan Martinez", line: "Onside kick recovery" },
      { name: "Nick Xerras", line: "Blocked punt (4th quarter)" }
    ],
    notes: ["Quarter-by-quarter scoring still needed from the team"],
    sources: [
      { label: "Salem News roundup", url: "https://www.salemnews.com/sports/friday-football-roundup-danvers-goes-on-road-to-defeat-melrose-fenwick-blows-out-putnam/article_93a74153-d54b-4dd4-9fa8-fc39598bc604.html" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/uySKp6oB8EOg49Tp-axluw/football-recap-danvers-handles-melrose.htm" }
    ]
  },
  {
    id: 3, date: "2026-09-25T18:00", opponent: "Reading", mascot: "Rockets",
    home: false, league: false, site: "Reading, MA",
    result: "W", us: 37, them: 20,
    quarters: null,
    summary: "The ground game erupted for five rushing touchdowns. Jack Houston and Zach Fultz both cleared 100 yards, and Colby Medeiros chipped in a 36-yard field goal and an interception in a non-league road win.",
    scoring: null,
    performers: [
      { name: "Jack Houston", line: "135 rushing yds, 2 TD" },
      { name: "Zach Fultz", line: "101 rushing yds, 3 TD" },
      { name: "Colby Medeiros", line: "36-yd FG · interception" }
    ],
    notes: ["Scoring summary and quarter scores still needed from the team", "Full game livestream replay is on Hudl"],
    sources: [
      { label: "Boston Globe roundup", url: "https://www.bostonglobe.com/2026/09/25/sports/miaa-high-school-football-scores-week-3/" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/jNgJBQqC9kmjtMIKO3zvCQ/football-recap-higher-ranked-danvers-takes-care-of-reading-memorial.htm" }
    ]
  },
  { id: 4, date: "2026-10-02T19:00", opponent: "Marblehead", mascot: "Magicians", home: true,  league: true,  site: "Dr. Deering Stadium, Danvers", result: null,
    cancelled: true,   // set to false and fix the date if the game is rescheduled
    notes: ["This game was cancelled and does not count toward the record."] },
  { id: 5, date: "2026-10-09T19:00", opponent: "Beverly", mascot: "Panthers", home: true,  league: true,  site: "Dr. Deering Stadium, Danvers", result: null,
    notes: ["Rivalry game", "Kickoff to confirm — listed as 7:00 PM on Hudl, 6:30 PM on MaxPreps"] },
  { id: 6, date: "2026-10-16T18:30", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true,  site: "Boxford, MA", result: null, notes: [] },
  { id: 7, date: "2026-10-23T18:30", opponent: "Salem", mascot: "Witches", home: true,  league: false, site: "Dr. Deering Stadium, Danvers", result: null, notes: [] },
  { id: 8, date: "2026-10-30T19:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true,  site: "Peabody, MA", result: null, notes: [] },
  { id: 9, date: "2026-11-26T10:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: false, site: "Gloucester, MA", result: null,
    notes: ["Thanksgiving Day rivalry — a Turkey Day tradition since 1964"] }
];

/* ---------------------------------------------------------------------
   ROSTER + PLAYER STATS (2026 season only)
   num:   jersey number (null = TBD)
   pos:   list of positions, e.g. ["RB","LB"]  ([] = TBD)
   grade: "Sr." | "Jr." | "So." | "Fr." | null
   stats: [ [label, value], ... ] season totals
   log:   { gameId: "stat line" } per-game breakdown

   NOTE: No official stat sheet is published for 2026 yet. Everything
   below was compiled from newspaper game recaps, so totals are PARTIAL.
   Replace with the team's official numbers when you get them.
   --------------------------------------------------------------------- */
const STATS_AS_OF = "Through 3 games (Sept. 25, 2026)";

const PLAYERS = [
  { name: "Jack Houston", num: null, pos: ["RB", "LB"], grade: "Sr.", captain: true,
    stats: [["Rush Yds", 319], ["Rush TD", 2], ["Rec", 2], ["Rec Yds", 45]],
    log: { 1: "105 rushing yds", 2: "79 rushing yds · 2 rec, 45 yds", 3: "135 rushing yds, 2 TD" } },
  { name: "Zach Fultz", num: null, pos: ["RB"], grade: "Jr.", captain: false,
    stats: [["Rush Yds", 277], ["Rush TD", 6], ["Points", 36]],
    log: { 1: "12 car, 120 yds, TD", 2: "56 rushing yds, 2 TD", 3: "101 rushing yds, 3 TD" } },
  { name: "Evan Kaciki", num: null, pos: ["RB"], grade: "So.", captain: false,
    stats: [["Rush Yds", 115], ["Rush TD", 1]],
    log: { 1: "115 rushing yds, TD" } },
  { name: "Colby Medeiros", num: null, pos: ["K"], grade: "Sr.", captain: true,
    stats: [["FG Made", 3], ["Long FG", 36], ["INT", 1]],
    log: { 1: "19-yd FG, 1 PAT", 2: "35-yd FG, onside kick", 3: "36-yd FG, INT" } },
  { name: "Nick Xerras", num: null, pos: [], grade: null, captain: true,
    stats: [["Blocked Punts", 1]],
    log: { 2: "Blocked punt" } },
  { name: "Dylan Kinney", num: null, pos: ["OL", "DL"], grade: null, captain: true,
    stats: [], log: { 1: "Started at right guard" } },
  { name: "Matt Nikiforov", num: null, pos: ["FB", "LB"], grade: null, captain: false,
    stats: [], log: { 1: "Lead blocker for three 100-yd rushers" } },
  { name: "Tim Nikiforov", num: null, pos: [], grade: null, captain: false,
    stats: [["Rec", 1], ["Rec Yds", 21]],
    log: { 1: "1 rec, 21 yds" } },
  { name: "Lucas McGloin", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at left tackle" } },
  { name: "Logan Travers", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at left guard" } },
  { name: "Cole Mahler", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at center" } },
  { name: "Nate Wise", num: null, pos: [], grade: null, captain: false,
    stats: [["Carries", 3], ["Rush Yds", 13]],
    log: { 1: "3 car, 13 yds" } },
  { name: "Ethan Schweitzer", num: null, pos: [], grade: null, captain: false,
    stats: [["Carries", 1], ["Rush Yds", 2]],
    log: { 1: "1 car, 2 yds" } },
  { name: "Juan Martinez", num: null, pos: [], grade: null, captain: false,
    stats: [["Fumble/Kick Rec", 1]],
    log: { 2: "Recovered onside kick" } }
];

/* Position → group used by the filter buttons on the Stats page */
const POSITION_GROUPS = {
  "Backs": ["QB", "RB", "FB"],
  "Receivers": ["WR", "TE"],
  "Linemen": ["OL", "DL", "C", "G", "T", "DE", "DT"],
  "Linebackers": ["LB"],
  "Secondary": ["DB", "CB", "S"],
  "Specialists": ["K", "P", "LS"]
};

/* ---------------------------------------------------------------------
   HISTORY
   --------------------------------------------------------------------- */
const TITLES = [
  { year: 1941, label: "NEC Champions" },
  { year: 2004, label: "NEC Champions" },
  { year: 2005, label: "NEC Champions" },
  { year: 2013, label: "NEC Champions" },
  { year: 2019, label: "NEC Champions" },
  { year: 2023, label: "MIAA D5 Final Four" }
];

/* w/l = overall, lw/ll = league. note is optional. */
const SEASONS = [
  { year: 2025, w: 6, l: 5, lw: 2, ll: 2, note: "MIAA Division 4 Round of 16" },
  { year: 2024, w: 6, l: 6, lw: 3, ll: 2 },
  { year: 2023, w: 8, l: 4, lw: 3, ll: 1, note: "MIAA Division 5 Final Four" },
  { year: 2022, w: 5, l: 6, lw: 2, ll: 2 },
  { year: 2021, w: 5, l: 9, lw: 0, ll: 4 },
  { year: 2020, w: 3, l: 6, lw: 2, ll: 3, note: "Season played in spring 2021" },
  { year: 2019, w: 9, l: 2, lw: 4, ll: 0, note: "NEC Champions" },
  { year: 2018, w: 8, l: 4, lw: 2, ll: 2 },
  { year: 2017, w: 6, l: 5, lw: 3, ll: 1 },
  { year: 2016, w: 9, l: 2, lw: 5, ll: 1 },
  { year: 2015, w: 9, l: 4, lw: 3, ll: 2 },
  { year: 2014, w: 5, l: 5, lw: 3, ll: 2 },
  { year: 2013, w: 7, l: 5, lw: 5, ll: 0, note: "NEC Champions" },
  { year: 2012, w: 5, l: 9, lw: 2, ll: 4 },
  { year: 2011, w: 4, l: 7, lw: 1, ll: 4 },
  { year: 2010, w: 1, l: 9, lw: 1, ll: 4 },
  { year: 2009, w: 6, l: 5, lw: 3, ll: 2 },
  { year: 2008, w: 1, l: 10, lw: 0, ll: 5 },
  { year: 2007, w: 0, l: 11, lw: 0, ll: 5 },
  { year: 2006, w: 3, l: 7, lw: 2, ll: 6 },
  { year: 2005, w: 8, l: 3, lw: 5, ll: 0, note: "NEC Champions" },
  { year: 2004, w: 8, l: 3, lw: 8, ll: 1, note: "NEC Champions" }
];

const MILESTONES = [
  { year: "1895", text: "First meeting in the Danvers–Gloucester series, one of the oldest rivalries on the North Shore." },
  { year: "1941", text: "Danvers wins its first Northeastern Conference championship." },
  { year: "1964", text: "Danvers and Gloucester begin meeting on Thanksgiving morning — a tradition that continues today." },
  { year: "1969", text: "The Falcons go 8–1, their best record in 28 years, and set a then-school record with 269 points." },
  { year: "2004–05", text: "Back-to-back NEC championships." },
  { year: "2019", text: "A 9–2 season and a perfect 4–0 league record deliver another NEC title." },
  { year: "2023", text: "An 8–4 run carries Danvers to the MIAA Division 5 Final Four." }
];

const LEGENDS = [
  { name: "Mark Bavaro", pos: "Tight End", era: "Class of 1981",
    bio: "All-American at Notre Dame, then one of the best tight ends of his era with the New York Giants: two-time First-Team All-Pro and a two-time Super Bowl champion (XXI, XXV).",
    tags: ["Notre Dame", "New York Giants", "2× Super Bowl champ"] },
  { name: "David Bavaro", pos: "Linebacker", era: "Early 1980s",
    bio: "A hard-hitting all-star at Danvers who starred at Syracuse and went on to an NFL career that included stops with the Cardinals, Bills, Vikings and Patriots.",
    tags: ["Syracuse", "NFL linebacker"] },
  { name: "Ken St. Pierre", pos: "Fullback", era: "Mid 1980s",
    bio: "A bruising runner who broke the school's single-season rushing and scoring records and led the area in scoring, before playing football and baseball at Rhode Island.",
    tags: ["School rushing record", "URI"] },
  { name: "Duke St. Pierre", pos: "Quarterback / Safety", era: "Early 1980s",
    bio: "A two-time All-Northeastern Conference quarterback who threw for more than 2,700 yards and 33 touchdowns in his Danvers career — and led the team in rushing, too.",
    tags: ["2× All-NEC QB", "33 TD passes"] },
  { name: "Brian Forster", pos: "Tight End", era: "Early 1980s",
    bio: "Caught 22 passes for 600 yards and 10 touchdowns as a senior, then helped lead Rhode Island to two NCAA Division I-AA playoff appearances.",
    tags: ["URI", "10 TD senior year"] }
];

/* ---------------------------------------------------------------------
   MEDIA
   Hudl doesn't allow its videos to be embedded on other sites, so each
   card opens the video on Hudl. url: null falls back to the full
   highlights page.
   To add photos: drop image files in /photos and list them in PHOTOS.
   --------------------------------------------------------------------- */
const HL = HUDL_TEAM + "/boys-varsity-football/watch?ot=TEAM&oi=33811&hr=";
const VIDEOS = [
  { title: "Danvers at Concord-Carlisle", sub: "Game Recap", season: 2025, len: "1:42", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YTliMDBiNmM2NzUyOTZjZmI1MGZlZGE%3D" },
  { title: "Danvers vs. Peabody", sub: "Game Recap", season: 2025, len: "1:41", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OThmYTBhOWE2NmUzZGMxZWMxMzBjMjY%3D" },
  { title: "Danvers vs. Reading", sub: "Game Recap", season: 2025, len: "2:00", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OTFjYTYyNmU2MzY4NzdmZTg3ZGI4ZGM%3D" },
  { title: "Danvers vs. Salem", sub: "Game Recap", season: 2024, len: "1:53", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzRkZTgzZjk2MzE0NmUyYmQyNzM2Y2U%3D" },
  { title: "Danvers vs. Tewksbury", sub: "Game Recap", season: 2024, len: "1:46", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzM5MjJmYTJjMjFmYjJlNDE2NmEyN2E%3D" },
  { title: "Danvers vs. Peabody", sub: "Game Recap", season: 2024, len: "1:23", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzIyNWQ5YTJkMGJhMzI4N2ZmNDQ0ZmI%3D" },
  { title: "Danvers vs. Masconomet", sub: "Game Recap", season: 2024, len: "1:40", url: null },
  { title: "Danvers vs. Reading", sub: "Game Recap", season: 2024, len: "1:43", url: null },
  { title: "Danvers vs. Hanover", sub: "Playoff Recap", season: 2023, len: "1:10", url: null },
  { title: "Danvers vs. Gloucester", sub: "Thanksgiving Recap", season: 2023, len: "2:14", url: null },
  { title: "Danvers vs. Masconomet", sub: "Game Recap", season: 2023, len: "1:33", url: null },
  { title: "Danvers vs. Tewksbury", sub: "Game Recap", season: 2023, len: "1:45", url: null }
];

/* Example: { src: "photos/marblehead-01.jpg", caption: "Houston breaks one vs. Marblehead", game: "vs. Marblehead" } */
const PHOTOS = [];
