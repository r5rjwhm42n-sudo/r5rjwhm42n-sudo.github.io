/* =====================================================================
   DANVERS FALCONS FOOTBALL — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left
   off the site until it is known.
   ===================================================================== */

const HUDL_TEAM = "https://fan.hudl.com/usa/ma/danvers/organization/17204/danvers-high-school/team/33811";
const REPLAY = HUDL_TEAM + "/boys-varsity-football/watch?b=";   // full-game livestream replays on Hudl

const TEAM = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  season: 2026,
  location: "Danvers, MA",
  conference: "Northeastern Conference",
  division: "MIAA Division 4",
  ranking: "No. 2 in the MIAA Division 4 power rankings (Oct. 20)",   // null hides it
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

const HOME_FIELD = "Morse Field at Dr. Deering Stadium, Danvers";

/* ---------------------------------------------------------------------
   SCHEDULE
   result: "W" | "L" | null (null = not played yet)
   cancelled: true marks a game that was called off (kept on the schedule,
              shown as "Cancelled", left out of the record and countdown)
   us / them: final score        home: true | false
   quarters: { us:[q1,q2,q3,q4], them:[...] }  (optional)
   half: [us, them] halftime score, used when quarters aren't published
   scoring: list of scoring plays (optional; q "—" = quarter not published)
   performers: top performers    notes: short bullet points
   --------------------------------------------------------------------- */
const SCHEDULE = [
  {
    id: 1, date: "2026-09-10T18:30", opponent: "Concord-Carlisle", mascot: "Patriots",
    home: true, league: false, site: HOME_FIELD,
    result: "W", us: 16, them: 0,
    quarters: { us: [0, 7, 3, 6], them: [0, 0, 0, 0] },
    summary: "Three Falcons ran for 100-plus yards and the defense never let Concord-Carlisle run a play in Danvers territory. Danvers rolled up 382 yards, 353 of them on the ground, and allowed no first downs and just 15 yards of offense in the season opener.",
    scoring: [
      { q: "2nd", play: "Zach Fultz 23 run (Colby Medeiros kick)", score: "7–0" },
      { q: "3rd", play: "Colby Medeiros 19 field goal", score: "10–0" },
      { q: "4th", play: "Evan Kaciqi 1 run (kick blocked)", score: "16–0" }
    ],
    performers: [
      { name: "Zach Fultz", line: "14 carries, 121 yds, TD" },
      { name: "Evan Kaciqi", line: "21 carries, 114 yds, TD" },
      { name: "Jack Houston", line: "16 carries, 106 yds" },
      { name: "Nate Wise", line: "2-of-4 passing, 29 yds" }
    ],
    notes: [
      "Concord-Carlisle: 0 first downs, 15 total yards, 6 rushing",
      "Danvers had the ball for more than 33 of the 48 minutes",
      "Offensive line: McGloin (LT), Travers (LG), Mahler (C), Kinney (RG), Haskell (RT)"
    ],
    sources: [
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/trio-of-100-yard-runners-dominant-defense-propel-danvers-to-season-opening-win/article_d2a33c47-f2a5-4bca-b56d-0f0ed3b1b565.html" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/concord-carlisle-vs-danvers/9-10-2026/?c=8b2fa199-c0f7-480b-90f5-b59095f1dcef" }
    ]
  },
  {
    id: 2, date: "2026-09-18T19:00", opponent: "Melrose", mascot: "Red Raiders",
    home: false, league: false, site: "Fred Green Memorial Stadium, Melrose",
    result: "W", us: 17, them: 7,
    quarters: { us: [7, 7, 3, 0], them: [0, 7, 0, 0] },
    summary: "Zach Fultz scored on the opening drive and again with three seconds left in the half, after Melrose had tied it 7–7, and Colby Medeiros added a 35-yard field goal in the third quarter. The defense held Melrose to 136 yards.",
    scoring: [
      { q: "1st", play: "Zach Fultz 1 run, on the opening drive", score: "7–0" },
      { q: "2nd · 3:57", play: "Melrose touchdown", score: "7–7" },
      { q: "2nd · 0:03", play: "Zach Fultz 2 run", score: "14–7" },
      { q: "3rd", play: "Colby Medeiros 35 field goal", score: "17–7" }
    ],
    performers: [
      { name: "Jack Houston", line: "79 rushing yds · 2 catches, 45 yds" },
      { name: "Zach Fultz", line: "56 rushing yds, 2 TD" },
      { name: "Colby Medeiros", line: "35-yd FG · onside kick to open the 2nd half" },
      { name: "Juan Martinez", line: "Recovered the onside kick" },
      { name: "Nick Xerras", line: "Blocked punt (4th quarter)" }
    ],
    notes: ["Melrose held to 136 yards, 3.7 per play"],
    sources: [
      { label: "Danvers Falcons live updates on X", url: "https://x.com/WeAreDanvers/status/2101111710316695852" },
      { label: "Salem News roundup", url: "https://www.salemnews.com/sports/friday-football-roundup-danvers-st-johns-prep-earn-big-road-wins/article_4d9c0799-dc34-4429-8822-55c36ca84e8d.html" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/uySKp6oB8EOg49Tp-axluw/football-recap-danvers-handles-melrose.htm" }
    ]
  },
  {
    id: 3, date: "2026-09-25T18:00", opponent: "Reading", mascot: "Rockets",
    home: false, league: false, site: "Hollingsworth Field, Reading",
    result: "W", us: 37, them: 20,
    quarters: { us: [0, 10, 13, 14], them: [8, 6, 0, 6] },
    summary: "Danvers trailed 8–0 after a quarter and 14–10 at halftime, then outscored Reading 27–6 after the break. The ground game produced five rushing touchdowns: Jack Houston and Zach Fultz both cleared 100 yards, and Colby Medeiros added a 36-yard field goal and an interception in a non-league road win.",
    scoring: null,
    performers: [
      { name: "Jack Houston", line: "135 rushing yds, 2 TD" },
      { name: "Zach Fultz", line: "101 rushing yds, 3 TD" },
      { name: "Colby Medeiros", line: "36-yd FG · interception" }
    ],
    notes: [
      "First time trailing at halftime this season",
      "Danvers went ahead 10–8 late in the second quarter before Reading retook the lead",
      "Reading's touchdown early in the fourth (conversion failed) cut it to 23–20, and Danvers answered to lead 30–20 with nine minutes left"
    ],
    sources: [
      { label: "Danvers Falcons live updates on X", url: "https://x.com/WeAreDanvers/status/2103629294874309060" },
      { label: "Full-game replay on Hudl", url: REPLAY + "QnJvYWRjYXN0NDQ5MzkzNQ%3D%3D" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/danvers-vs-reading-memorial/9-25-2026/?c=f11d41e9-7f18-40d5-bd55-eef839236282" },
      { label: "Boston Globe roundup", url: "https://www.bostonglobe.com/2026/09/25/sports/miaa-high-school-football-scores-week-3/" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/jNgJBQqC9kmjtMIKO3zvCQ/football-recap-higher-ranked-danvers-takes-care-of-reading-memorial.htm" }
    ]
  },
  {
    id: 4, date: "2026-10-03T11:00", opponent: "Marblehead", mascot: "Magicians",
    home: true, league: true, site: HOME_FIELD, result: null,
    cancelled: true,   // set to false and fix the date if the game is ever rescheduled
    notes: [
      "Moved from Friday night to Saturday morning, then cancelled after the death of Marblehead captain Owen Coyne.",
      "The game is not expected to be made up and does not count toward the record."
    ],
    sources: [
      { label: "Salem News", url: "https://www.salemnews.com/sports/danvers-marblehead-varsity-football-game-cancelled-this-weekend/article_f5c72aa8-6eed-486b-bc81-3b114a27df1b.html" }
    ]
  },
  {
    id: 5, date: "2026-10-09T18:30", opponent: "Beverly", mascot: "Panthers",
    home: true, league: true, site: HOME_FIELD,
    result: "W", us: 38, them: 0,
    quarters: null, half: [24, 0],
    summary: "In new all-black uniforms, Danvers debuted a shotgun double wing. Captain Nate Wise threw for a career-high 120 yards and two touchdowns, both to Jack Houston, and the defense forced three fumbles and held Beverly to 38 yards.",
    scoring: [
      { q: "—", play: "Nate Wise 15 pass to Jack Houston", score: null },
      { q: "—", play: "Nate Wise 11 pass to Jack Houston", score: null },
      { q: "—", play: "Zach Fultz rushing touchdown", score: null },
      { q: "—", play: "Zach Fultz rushing touchdown", score: null },
      { q: "—", play: "Matt Nikiforov 1 run", score: null },
      { q: "End of 2nd", play: "Colby Medeiros 40 field goal as the half ended", score: "24–0 at half" }
    ],
    performers: [
      { name: "Nate Wise", line: "120 passing yds (career high), 2 TD" },
      { name: "Jack Houston", line: "TD catches of 15 and 11 yards" },
      { name: "Zach Fultz", line: "125 rushing yds, 2 TD" },
      { name: "Matt Nikiforov", line: "1-yd TD run, his first career touchdown" },
      { name: "Colby Medeiros", line: "40-yd FG on the last play of the half" },
      { name: "DeDominicis, Capece, Mimo", line: "One fumble recovery each" }
    ],
    notes: [
      "Beverly: 5 first downs (3 by penalty) and 38 total yards",
      "243 rushing yards as a team",
      "Danvers led 7–0 after one quarter and 14–0 with 2:40 left in the half before scoring 10 more points by halftime",
      "First game in 14 days, after the Marblehead cancellation",
      "91st meeting. Beverly leads the series 60–29–2, but Danvers has won nine of the meetings since 2015"
    ],
    sources: [
      { label: "Full-game replay on Hudl", url: REPLAY + "QnJvYWRjYXN0NDU5MTI0Mw%3D%3D" },
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/back-in-black-danvers-opens-up-its-offense-rolls-all-over-beverly/article_f184c7c4-6046-4bb5-a29d-ffe49f8eb165.html" },
      { label: "Boston Globe roundup", url: "https://www.bostonglobe.com/2026/10/09/sports/miaa-high-school-football-roundup-october-9/" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/beverly-vs-danvers/10-9-2026/?c=29748a55-fb2f-41c1-873a-84a48f00c882" }
    ]
  },
  {
    id: 6, date: "2026-10-16T18:30", opponent: "Masconomet", mascot: "Chieftains",
    home: false, league: true, site: "Masconomet Regional, Boxford",
    result: "W", us: 35, them: 0,
    quarters: { us: [14, 14, 0, 7], them: [0, 0, 0, 0] },
    summary: "Danvers scored four times in the first half, piled up 399 yards and shut out the defending NEC champions in the rain. Zach Fultz ran for 179 yards, and the defense turned Masconomet away twice deep in Danvers territory.",
    scoring: [
      { q: "1st", play: "Jack Houston 2 run", score: null },
      { q: "1st half", play: "Zach Fultz 1 run", score: null },
      { q: "1st half", play: "Zach Fultz 4 run", score: null },
      { q: "1st half", play: "Nate Wise 11 pass to Jack Houston", score: "28–0 at half" },
      { q: "4th", play: "Evan Kaciqi 25 run", score: "35–0" }
    ],
    performers: [
      { name: "Zach Fultz", line: "15 carries, 179 yds, 2 TD" },
      { name: "Evan Kaciqi", line: "12 carries, 111 yds, TD" },
      { name: "Jack Houston", line: "59 rushing yds, rushing TD and receiving TD" },
      { name: "Nate Wise", line: "5-of-6 passing, 43 yds, TD" },
      { name: "Colby Medeiros", line: "5-for-5 on extra points" },
      { name: "Alexander Mimo", line: "Fumble recovery on 4th-and-goal at the 7" }
    ],
    notes: [
      "Third shutout in five games; 27 points allowed all season",
      "Ranked No. 17 in the Boston Globe Top 20 going in",
      "First win over Masconomet since 2023 (Danvers is 4–7 all-time in the series)"
    ],
    sources: [
      { label: "Full-game replay on Hudl", url: REPLAY + "QnJvYWRjYXN0NDUwNzQ3MQ%3D%3D" },
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/defense-continues-to-dominate-for-danvers-while-offense-kicks-into-gear-in-shutout-over-masco/article_575aac00-4d6e-4d9b-8891-26367b290445.html" },
      { label: "Danvers Falcons live updates on X", url: "https://x.com/WeAreDanvers/status/2111236801679511760" },
      { label: "Boston Globe roundup", url: "https://www.bostonglobe.com/2026/10/16/sports/miaa-high-school-football-october-16-roundup/" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/FoPI_SuzhEqh08J-rgB0Sw/football-recap-danvers-skates-past-masconomet-regional-with-ease.htm" }
    ]
  },
  { id: 7, date: "2026-10-23T18:30", opponent: "Salem", mascot: "Witches", home: true, league: false, site: HOME_FIELD, result: null, notes: [] },
  { id: 8, date: "2026-10-30T19:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "Peabody Veterans Memorial Stadium", result: null,
    notes: ["Last NEC game of the regular season", "Danvers won last year's meeting 30–12"] },
  { id: 9, date: "2026-11-26T10:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: false, site: "Newell Stadium, Gloucester", result: null,
    notes: ["Thanksgiving Day rivalry, played every Thanksgiving morning since 1964"] }
];

/* ---------------------------------------------------------------------
   ROSTER + PLAYER STATS (2026 season only)
   num:   jersey number (null = TBD)
   pos:   list of positions, e.g. ["RB","LB"]  ([] = TBD)
   grade: "Sr." | "Jr." | "So." | "Fr." | null
   stats: [ [label, value], ... ] season totals
   log:   { gameId: "stat line" } per-game breakdown. The rushing chart reads
          the first "<number> yds" in each line, so write rushing yards first
          and use "yards" (not "yds") for passing and receiving.

   NOTE: No official stat sheet is published for 2026 yet. Everything
   below was compiled from newspaper box scores and recaps, so totals are
   PARTIAL. Replace with the team's official numbers when you get them.
   --------------------------------------------------------------------- */
const STATS_AS_OF = "Through 5 games (Oct. 16, 2026)";

const PLAYERS = [
  { name: "Zach Fultz", num: null, pos: ["RB", "DB"], grade: "Jr.", captain: false,
    stats: [["Rush Yds", 582], ["Rush TD", 10], ["Points", 60]],
    log: { 1: "14 car, 121 yds, 23-yd TD run", 2: "56 rushing yds, TD runs of 1 and 2 yards", 3: "101 rushing yds, 3 TD",
           5: "125 rushing yds, 2 TD", 6: "15 car, 179 yds, TD runs of 1 and 4 yards" } },
  { name: "Jack Houston", num: null, pos: ["RB", "LB"], grade: "Sr.", captain: true,
    stats: [["Rush Yds", 379], ["Rush TD", 3], ["Rec TD", 3], ["Points", 36]],
    log: { 1: "16 car, 106 yds", 2: "79 rushing yds · 2 catches for 45 yards", 3: "135 rushing yds, 2 TD",
           5: "TD catches of 15 and 11 yards from Nate Wise", 6: "59 rushing yds, 2-yd TD run · 11-yard TD catch" } },
  { name: "Evan Kaciqi", num: null, pos: ["RB", "DB"], grade: "So.", captain: false,
    stats: [["Rush Yds", 225], ["Rush TD", 2]],
    log: { 1: "21 car, 114 yds, 1-yd TD run (varsity debut)", 6: "12 car, 111 yds, 25-yd TD run" } },
  { name: "Nate Wise", num: null, pos: ["QB"], grade: "Sr.", captain: true,
    stats: [["Pass Yds", 192], ["Pass TD", 3], ["Rush Yds", 13]],
    log: { 1: "3 car, 13 yds · 2-of-4 passing for 29 yards", 5: "120 passing yards (career high), 2 TD",
           6: "5-of-6 passing for 43 yards, TD" } },
  { name: "Colby Medeiros", num: 11, pos: ["K"], grade: "Sr.", captain: true,
    stats: [["FG Made", 4], ["Long FG", 40], ["INT", 1]],
    log: { 1: "19-yd FG · extra point", 2: "35-yd FG · onside kick to open the 2nd half", 3: "36-yd FG · interception",
           5: "40-yd FG on the last play of the half", 6: "5-for-5 on extra points" } },
  { name: "Matt Nikiforov", num: null, pos: ["FB", "LB"], grade: "Sr.", captain: false,
    stats: [["Rush TD", 1], ["Rec", 1], ["Fum Rec", 1]],
    log: { 1: "1 catch for 8 yards · lead blocker for three 100-yard rushers", 5: "1-yd TD run, his first career touchdown",
           6: "Fumble recovery" } },
  { name: "Nick Xerras", num: 10, pos: ["DE"], grade: null, captain: true,
    stats: [["Blocked Punts", 1]],
    log: { 2: "Blocked punt in the 4th quarter", 6: "Pressure off the edge all night" } },
  { name: "Hunter DeDominicis", num: 8, pos: ["DE", "OL"], grade: null, captain: true,
    stats: [["Fum Rec", 1]],
    log: { 5: "Fumble recovery · filled in at right tackle", 6: "Pressure off the edge" } },
  { name: "Dylan Kinney", num: null, pos: ["OL", "DL"], grade: "Sr.", captain: true,
    stats: [], log: { 1: "Started at right guard" } },
  { name: "Tim Nikiforov", num: null, pos: ["LB"], grade: "So.", captain: false,
    stats: [["Rec", 1], ["Rec Yds", 21], ["Forced Fum", 1]],
    log: { 1: "1 catch for 21 yards", 5: "Forced a fumble · tipped a pass" } },
  { name: "Alexander Mimo", num: null, pos: ["DL"], grade: null, captain: false,
    stats: [["Fum Rec", 2]],
    log: { 5: "Fumble recovery", 6: "Fumble recovery on 4th-and-goal at the 7" } },
  { name: "Julian Capece", num: null, pos: ["DB"], grade: null, captain: false,
    stats: [["Fum Rec", 1]],
    log: { 5: "Fumble recovery" } },
  { name: "Juan Martinez", num: null, pos: [], grade: null, captain: false,
    stats: [["Onside Rec", 1]],
    log: { 2: "Recovered the onside kick to open the 2nd half", 5: "Nearly blocked a punt" } },
  { name: "Grayson Haskell", num: null, pos: ["OL", "DL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at right tackle", 6: "Pressure on the Masconomet quarterback" } },
  { name: "Lucas McGloin", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at left tackle" } },
  { name: "Logan Travers", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at left guard" } },
  { name: "Cole Mahler", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at center" } },
  { name: "Thomas Pinto", num: null, pos: ["TE"], grade: null, captain: false,
    stats: [], log: {} },
  { name: "Ethan Schweitzer", num: null, pos: [], grade: null, captain: false,
    stats: [["Carries", 1], ["Rush Yds", -2]],
    log: { 1: "1 car, -2 yds" } }
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
  { title: "Danvers at Masconomet", sub: "Full-Game Replay · Oct. 16", season: 2026, len: "Replay", url: REPLAY + "QnJvYWRjYXN0NDUwNzQ3MQ%3D%3D" },
  { title: "Danvers vs. Beverly", sub: "Full-Game Replay · Oct. 9", season: 2026, len: "Replay", url: REPLAY + "QnJvYWRjYXN0NDU5MTI0Mw%3D%3D" },
  { title: "Danvers at Reading", sub: "Full-Game Replay · Sept. 25", season: 2026, len: "Replay", url: REPLAY + "QnJvYWRjYXN0NDQ5MzkzNQ%3D%3D" },
  { title: "Danvers at Concord-Carlisle", sub: "Game Recap", season: 2025, len: "1:42", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YTliMDBiNmM2NzUyOTZjZmI1MGZlZGE%3D" },
  { title: "Danvers vs. Peabody", sub: "Game Recap", season: 2025, len: "1:41", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OThmYTBhOWE2NmUzZGMxZWMxMzBjMjY%3D" },
  { title: "Danvers vs. Reading", sub: "Game Recap", season: 2025, len: "2:00", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OTFjYTYyNmU2MzY4NzdmZTg3ZGI4ZGM%3D" },
  { title: "Danvers vs. Salem", sub: "Game Recap", season: 2024, len: "1:53", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzRkZTgzZjk2MzE0NmUyYmQyNzM2Y2U%3D" },
  { title: "Danvers vs. Tewksbury", sub: "Game Recap", season: 2024, len: "1:46", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzM5MjJmYTJjMjFmYjJlNDE2NmEyN2E%3D" },
  { title: "Danvers vs. Peabody", sub: "Game Recap", season: 2024, len: "1:23", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzIyNWQ5YTJkMGJhMzI4N2ZmNDQ0ZmI%3D" },
  { title: "Danvers vs. Masconomet", sub: "Game Recap", season: 2024, len: "1:40", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzBiMTlkNDE2MmI1ZmMyMTM4MmIyMGY%3D" },
  { title: "Danvers vs. Reading", sub: "Game Recap", season: 2024, len: "1:43", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NmVmNzgwODAzMzhjMmExYWIyZjBiODg%3D" },
  { title: "Danvers vs. Hanover", sub: "Playoff Recap", season: 2023, len: "1:10", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NTcyMDJlZGI1MzUxMTBhZDg1MDY5ZTk%3D" },
  { title: "Danvers vs. Gloucester", sub: "Thanksgiving Recap", season: 2023, len: "2:14", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NTcxZjZlZDVjYTk3MjBhNDgyZjNjZTE%3D" },
  { title: "Danvers vs. Masconomet", sub: "Game Recap", season: 2023, len: "1:33", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NTQxNDExNjJhYTdjYjBkYTBkMzRjOTE%3D" },
  { title: "Danvers vs. Tewksbury", sub: "Game Recap", season: 2023, len: "1:45", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NTAwOWM2OGMxMTliOTBkZGM2ZjNiZmE%3D" }
];

/* Example: { src: "photos/marblehead-01.jpg", caption: "Houston breaks one vs. Marblehead", game: "vs. Marblehead" } */
const PHOTOS = [];
