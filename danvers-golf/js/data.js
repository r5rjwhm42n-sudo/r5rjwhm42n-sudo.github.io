/* =====================================================================
   DANVERS FALCONS GOLF — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) shows up on the site
   as "TBD" so it is obvious what still needs to come from the team.
   ===================================================================== */

const SN = "https://www.salemnews.com/sports/";
const HOME = "Wenham Country Club, Wenham";

const TEAM = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  sport: "Golf",
  season: 2026,
  location: "Danvers, MA",
  conference: "Northeastern Conference",
  division: "MIAA Division 2",   // Division 2 North in the MIAA's 2026 fall golf alignment
  headCoach: "Ryan Hayes",
  coachNote: "6th season · 43–41–3 with the Falcons entering 2026",
  assistants: ["Matt Regis (JV)"],
  homeCourse: "Wenham Country Club",
  address: "60 Cabot Road, Danvers, MA 01923",
  links: {
    schedule: "https://www.arbiterlive.com/Teams/Schedule/9416930?activeEntityId=5538",
    athletics: "https://www.danversfalconsathletics.com/",
    school: "https://danverspublicschools.org/dhs/athletics/golf/"
  }
};

/* ---------------------------------------------------------------------
   SCHEDULE
   result:  "W" | "L" | "T" | null (null = not played yet)
   us / them: team score         home: true | false
   league:  true for matches that count in the Northeastern Conference
   format:  how the match is scored
            "match"      NEC match play. Eight players a side over nine
                         holes; each head-to-head match is worth 9 points,
                         so 72 are on offer. Higher total wins.
            "stableford" points for each hole. Higher total wins.
            "stroke"     total strokes. LOWER total wins.
   cards:   individual results in match play — [player, points won, points lost]
   points:  individual Stableford totals    — [player, points]
   rounds:  individual stroke-play scores   — [player, strokes]
   opp:     notes on the other team's top players
   noResult: true = on the school's schedule but no score was ever posted
             (kept on the list, left out of the record)
   cancelled: true = called off (same treatment)
   tournament: true = a multi-team event instead of a head-to-head match.
             Once played it gets finish ("11th"), fieldSize, us (team total),
             toPar, holes, rounds and field (the leaders: [team, total]);
             it is listed with the results but left out of the record.
   holes:   18 for an 18-hole round (matches are 9 holes unless it says so)

   Player wins, halves, points and match logs on the Players page are
   added up from cards / points / rounds, so a result is typed in once.
   Player names here must match the names in PLAYERS below.
   --------------------------------------------------------------------- */
const SCHEDULE = [
  { id: 1, date: "2026-08-31T16:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "The Meadow at Peabody",
    format: "match", result: "W", us: 65, them: 7,
    summary: "The Falcons opened the season with a runaway win at The Meadow, taking 65 of the 72 points on offer.",
    cards: [],
    notes: ["Individual results still needed from the team"],
    sources: [{ label: "Salem News roundup, Aug. 31", url: SN + "mondays-area-roundup-beverly-danvers-prep-golfers-all-win-season-openers/article_29aa7a69-1fbc-4203-bf2e-a71cfb272375.html" }] },

  { id: 2, date: "2026-09-01T13:00", opponent: "St. Mary's", mascot: "Spartans", home: false, league: false, site: "Gannon Golf Course, Lynn",
    format: "stableford", result: "L", us: 170, them: 174,
    summary: "A four-point loss at Gannon in the first non-league match of the year, less than 24 hours after the opener.",
    points: [],
    notes: ["Individual results still needed from the team", "Scoring format and which side had 170 are taken from the school's schedule page — to confirm"],
    sources: [] },

  { id: 3, date: "2026-09-02T15:00", opponent: "St. John's Prep", mascot: "Eagles", home: false, league: false, site: "Turner Hill, Ipswich",
    format: "stroke", result: "L", us: 253, them: 227,
    summary: "The Falcons' crosstown rival won a stroke-play match at Turner Hill. Tommy Surette led Danvers with a 39.",
    rounds: [["Tommy Surette", 39]],
    opp: ["Seamus O'Holleran 36", "AJ Bodnar 37", "Zach Enners 37", "LB Manning 38"],
    notes: ["Stroke play — the lower team total wins"],
    sources: [{ label: "Salem News roundup, Sept. 2", url: SN + "wednesdays-area-roundup-prep-golfers-stay-unbeaten-endicott-womens-soccer-wins-opener/article_335a3e2c-6bbf-4dea-81f3-af9ee1aa5442.html" }] },

  { id: 4, date: "2026-09-03T15:00", opponent: "Salem", mascot: "Witches", home: false, league: true, site: "Olde Salem Greens, Salem",
    format: "match", result: "W", us: 47, them: 25,
    summary: "Playing for the fourth time in four days to start the season, Danvers won on the road at Olde Salem Greens to get back to 2–2.",
    cards: [],
    notes: ["Individual results still needed from the team"],
    sources: [{ label: "Salem News roundup, Sept. 3", url: SN + "thursdays-area-roundup-danvers-golfers-slip-by-salem/article_141f2e3b-a61a-4bd6-904c-dcffb5058867.html" }] },

  { id: 5, date: "2026-09-04T15:00", opponent: "Rockport", mascot: "Vikings", home: false, league: false, site: "Rockport Golf Club",
    format: "stableford", result: "L", us: 149, them: 155,
    summary: "A six-point loss at Rockport closed out a stretch of five road matches in five days.",
    points: [],
    notes: ["Individual results still needed from the team", "Scoring format and which side had 149 are taken from the school's schedule page — to confirm"],
    sources: [] },

  { id: 101, date: "2026-09-07T14:50", opponent: "Bishop Fenwick", mascot: "Crusaders", home: true, league: false, site: HOME,
    format: "stableford", result: "W", us: 174, them: 164,
    summary: "A ten-point win over Bishop Fenwick at Wenham on Labor Day, the first of two wins over the Crusaders in four days.",
    points: [],
    notes: ["Individual results still needed from the team"],
    sources: [] },

  { id: 6, date: "2026-09-09T15:00", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: HOME,
    format: "match", result: "L", us: 33, them: 39,
    summary: "Wes Maylor, Cole Andrews and Austin Patuto all won their matches in the home opener, but Masconomet took it by six points behind a 2-under 32 from Brendan O'Connor.",
    cards: [["Austin Patuto", 6, 3], ["Wes Maylor", 5.5, 3.5], ["Cole Andrews", 5, 4]],
    opp: ["Brendan O'Connor 32 (2 under on the back nine)", "Cooper Wassung 36", "Hayes Maher 37"],
    notes: [],
    sources: [{ label: "Salem News roundup, Sept. 9", url: SN + "wednesdays-area-roundup-beverly-girls-cross-country-shades-danvers/article_aa72c861-635a-4fb7-b41d-9d3825d17ac5.html" }] },

  { id: 7, date: "2026-09-10T15:30", opponent: "Bishop Fenwick", mascot: "Crusaders", home: false, league: false, site: "The Meadow at Peabody",
    format: "stableford", result: "W", us: 172, them: 166,
    summary: "Ben Campbell put up 32 points and three teammates were right behind him as Danvers edged Bishop Fenwick by six in a Stableford match.",
    points: [["Ben Campbell", 32], ["Tommy Surette", 28], ["Lucas Silva", 27], ["Anthony Sheehan", 25]],
    notes: ["Stableford scoring — the higher team total wins"],
    sources: [{ label: "Salem News roundup, Sept. 10", url: SN + "thursdays-area-roundup-eagles-take-down-lasalle-on-pitch/article_604f56ae-37a6-4f8b-9345-211d145d25e9.html" }] },

  { id: 8, date: "2026-09-14T15:00", opponent: "Beverly", mascot: "Panthers", home: true, league: true, site: HOME,
    format: "match", result: "L", us: 32.5, them: 39.5,
    summary: "Wes Maylor (7–2) and Lucas Silva (6.5–2.5) won their matches, but rival Beverly left Wenham with a seven-point win.",
    cards: [["Wes Maylor", 7, 2], ["Lucas Silva", 6.5, 2.5]],
    notes: [],
    sources: [{ label: "Salem News roundup, Sept. 14", url: SN + "mondays-area-roundup-beverly-volleyball-rallies-past-masco-for-dramatic-win/article_492309cf-e6d6-452c-ba7a-7f00d3b9cece.html" }] },

  { id: 102, date: "2026-09-14T15:30", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: "Ferncroft Country Club, Middleton",
    format: "match", result: null, noResult: true,
    notes: ["Listed on the school's schedule for the same afternoon as the Beverly match, with no score posted. Not counted in the record."] },

  { id: 9, date: "2026-09-17T16:00", opponent: "Winthrop", mascot: "Vikings", home: false, league: true, site: "Winthrop Golf Club",
    format: "match", result: "W", us: 37, them: 35,
    summary: "Three wins and three halved matches added up to a two-point road victory, the closest result of the season so far.",
    cards: [["Ben Blum", 6, 3], ["Wes Maylor", 6, 3], ["Tommy Surette", 5, 4],
            ["Anthony Sheehan", 4.5, 4.5], ["Brady Swanton", 4.5, 4.5], ["Lucas Silva", 4.5, 4.5]],
    notes: [],
    sources: [{ label: "Salem News roundup, Sept. 17", url: SN + "thursdays-area-roundup-moschellas-first-two-varsity-goals-lead-beverly-field-hockey/article_078139fa-d6e6-497f-b113-512ad43d8d67.html" }] },

  { id: 10, date: "2026-09-22T15:30", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Tedesco Country Club, Marblehead",
    format: "match", result: "L", us: 27, them: 45,
    summary: "Sophomore Anthony Sheehan halved his match at Tedesco to lead the Falcons against unbeaten Marblehead.",
    cards: [["Anthony Sheehan", 4.5, 4.5]],
    notes: [],
    sources: [{ label: "Salem News roundup, Sept. 22", url: SN + "tuesdays-area-roundup-captains-beauparlant-mcmanus-guide-salem-boys-soccer-to-win/article_7ef3b1f7-0bc0-4283-a55e-12623314faf1.html" }] },

  { id: 11, date: "2026-09-23T16:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "The Meadow at Peabody",
    format: "match", result: "W", us: 57.5, them: 14.5,
    summary: "Five seniors won big — three of them dropping just half a point — as the Falcons swept the season series with Peabody.",
    cards: [["Tommy Surette", 8.5, 0.5], ["Cole Andrews", 8.5, 0.5], ["Ryan Moore", 8.5, 0.5], ["Ben Blum", 8, 1], ["Austin Patuto", 7.5, 1.5]],
    notes: [],
    sources: [{ label: "Salem News roundup, Sept. 23", url: SN + "wednesdays-area-roundup-salem-boys-girls-cross-country-teams-each-win-twice/article_ed9c0566-4030-4ac7-916b-dab7ca2e622e.html" }] },

  { id: 12, date: "2026-09-29T15:30", opponent: "Swampscott", mascot: "Big Blue", home: false, league: true, site: "Tedesco Country Club, Marblehead",
    format: "match", result: "W", us: 39, them: 33,
    summary: "Tommy Surette, Wes Maylor and Lucas Silva all won 6–3 and Brady Swanton took his match 5–4 to pull the Falcons back to .500.",
    cards: [["Tommy Surette", 6, 3], ["Wes Maylor", 6, 3], ["Lucas Silva", 6, 3], ["Brady Swanton", 5, 4]],
    notes: [],
    sources: [{ label: "Salem News roundup, Sept. 29", url: SN + "tuesdays-area-roundup-abells-last-second-goal-enables-danvers-to-tie-fenwick/article_1fc650a5-97fd-4ebd-9c0d-54fa57c03004.html" }] },

  { id: 13, date: "2026-09-30T15:00", opponent: "Marblehead", mascot: "Magicians", home: true, league: true, site: HOME,
    format: "match", result: "L", us: 26, them: 46,
    summary: "Wes Maylor won his match 5–4 and Cole Andrews halved his, but Marblehead stayed unbeaten with a win at Wenham.",
    cards: [["Wes Maylor", 5, 4], ["Cole Andrews", 4.5, 4.5]],
    notes: [],
    sources: [{ label: "Salem News roundup, Sept. 30", url: SN + "wednesdays-area-roundup-corbetts-strong-finish-drives-panthers/article_30d4075f-7e97-48e8-8508-f8d636f3a1f2.html" }] },

  { id: 14, date: "2026-10-01T16:30", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Beverly Golf & Tennis Club",
    format: "match", result: "T", us: 36, them: 36,
    summary: "The rivals split the 72 points right down the middle. Brady Swanton won 7.5–1.5, Cole Andrews took his match and freshman Dom Onorio earned a half.",
    cards: [["Brady Swanton", 7.5, 1.5], ["Cole Andrews", 5.5, 3.5], ["Dom Onorio", 4.5, 4.5]],
    notes: [],
    sources: [{ label: "Salem News roundup, Oct. 1", url: SN + "thursdays-area-roundup-prep-golfers-prevail-beverly-danvers-settle-for-a-tie/article_00674a8f-2f05-4a88-9d1f-f4335e9dd1a6.html" }] },

  { id: 15, date: "2026-10-05T15:25", opponent: "Gloucester", mascot: "Fishermen", home: true, league: true, site: HOME,
    format: "match", result: "W", us: 43.5, them: 28.5,
    summary: "Cole Andrews won 7–2 and four more Falcons took their matches as Danvers snapped Gloucester's four-match win streak at Wenham.",
    cards: [["Cole Andrews", 7, 2], ["Anthony Sheehan", 6.5, 2.5], ["Dom Onorio", 6.5, 2.5], ["Wes Maylor", 6, 3], ["Brady Swanton", 5.5, 3.5]],
    opp: ["Will Linn 33, won his match", "Crofton Parsons won his match"],
    notes: [],
    sources: [{ label: "Salem News roundup, Oct. 5", url: SN + "mondays-area-roundup-masconomet-boys-girls-soccer-field-hockey-all-score-victories/article_17fadb6a-e3ca-4a28-8b9d-eb8021971a13.html" }] },

  { id: 16, date: "2026-10-07T15:00", opponent: "Saugus", mascot: "Sachems", home: false, league: true, site: "Cedar Glen Golf Course, Saugus",
    format: "match", result: "W", us: 48.5, them: 23.5,
    summary: "Freshman Dom Onorio swept all nine points in his match, and Cole Andrews (8.5–0.5) and Austin Patuto (7–2) also won big as the Falcons moved a game over .500.",
    cards: [["Dom Onorio", 9, 0], ["Cole Andrews", 8.5, 0.5], ["Austin Patuto", 7, 2], ["Brady Swanton", 5.5, 3.5]],
    notes: ["Onorio's 9–0 is the first clean sweep by a Falcon in a reported match this season"],
    sources: [{ label: "Salem News roundup, Oct. 7", url: SN + "wednesdays-area-roundup-sullivan-earns-100th-career-point-in-beverly-boys-soccer-win/article_c800b2c7-9306-49f2-b583-622af94054b3.html" }] },

  { id: 17, date: "2026-10-12T14:50", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true, site: "Rowley Country Club",
    format: "match", result: "L", us: 30.5, them: 41.5,
    summary: "Lucas Silva (6–3), Wes Maylor (5–4) and Brady Swanton (5–4) won their matches and Anthony Sheehan earned a half in the regular-season finale, but Masconomet's Brendan O'Connor shot a 2-under 33 to lead the Chieftains to a season sweep.",
    cards: [["Lucas Silva", 6, 3], ["Wes Maylor", 5, 4], ["Brady Swanton", 5, 4], ["Anthony Sheehan", 4.5, 4.5]],
    opp: ["Brendan O'Connor 33 (2 under)", "Cooper Wassung 37, won his match", "Jaxon DiBartolomeo won his match"],
    notes: [
      "Final regular-season match — Danvers finishes 9–8–1, 7–5–1 in the NEC"
    ],
    sources: [{ label: "Salem News roundup, Oct. 12", url: SN + "mondays-area-roundup-oconnor-sparks-masconomet-golfers-to-victory/article_3e1e8437-9990-4635-9963-19a465cf4c27.html" }] },

  { id: 19, date: "2026-10-20T09:00", opponent: "Division 2 North Sectional", tournament: true, home: false, league: false, site: "Bradford Country Club, Haverhill",
    format: "stroke", holes: 18, result: null,
    finish: "11th", fieldSize: 15, us: 348, toPar: "+64",
    summary: "In the last MIAA sectional before the state switches formats in 2027, the Falcons placed 11th of 15 teams at Bradford. Junior Wes Maylor led Danvers with a 9-over 81. Masconomet won with 294, and Newburyport and Milton took the other two spots in the state final.",
    rounds: [["Wes Maylor", 81], ["Brady Swanton", 85], ["Tommy Surette", 90], ["Anthony Sheehan", 92], ["Ben Campbell", 96], ["Cole Andrews", 98]],
    field: [["Masconomet", 294], ["Newburyport", 300], ["Milton", 302]],
    formatNote: "MIAA sectional: 18 holes of stroke play, par 71. Six golfers per team and the best four scores count. The top three teams advance to the Division 2 state final at Franklin Country Club on Oct. 26.",
    notes: [
      "Danvers qualified as one of 15 full teams in the Division 2 North field",
      "Maylor tied for 32nd individually; no Falcon qualified for the state final as an individual"
    ],
    sources: [{ label: "Official results (Golf Genius)", url: "https://www.golfgenius.com/ggid/26d2nsect" }] },

  { id: 18, date: "2026-10-21T09:00", opponent: "NEC Open", tournament: true, home: false, league: true, site: "Tedesco Country Club, Marblehead",
    format: "stroke", result: null,
    notes: ["The Northeastern Conference's season-ending tournament — nine teams on the school's schedule listing", "NEC all-conference and all-star picks are usually announced after the Open"] }
];

/* ---------------------------------------------------------------------
   ROSTER (from the school's schedule page)
   grade:   "Sr." | "Jr." | "So." | "Fr." | null
   captain: true | false   (captains have not been confirmed yet)

   Individual numbers are NOT typed here — they are added up from the
   match results above. Newspaper roundups mostly print the winners, so
   a player's wins and points are "reported" totals, not a full record.
   --------------------------------------------------------------------- */
const STATS_AS_OF = "Regular season complete + sectional (Oct. 20, 2026)";

const PLAYERS = [
  { name: "Cole Andrews", grade: "Sr.", captain: false },
  { name: "Ben Blum", grade: "Sr.", captain: false },
  { name: "Ryan Moore", grade: "Sr.", captain: false },
  { name: "Austin Patuto", grade: "Sr.", captain: false },
  { name: "Tommy Surette", grade: "Sr.", captain: false },
  { name: "Ben Campbell", grade: "Jr.", captain: false },
  { name: "Wes Maylor", grade: "Jr.", captain: false, note: "2025 NEC All-Star" },
  { name: "Anthony Sheehan", grade: "So.", captain: false },
  { name: "Lucas Silva", grade: "So.", captain: false },
  { name: "Brady Swanton", grade: "So.", captain: false },
  { name: "Drew Carlson", grade: "Fr.", captain: false },
  { name: "Dom Onorio", grade: "Fr.", captain: false }
];

/* Class → label used by the filter buttons on the Players page */
const CLASSES = { "Sr.": "Seniors", "Jr.": "Juniors", "So.": "Sophomores", "Fr.": "Freshmen" };

/* ---------------------------------------------------------------------
   HISTORY
   Title years come from the Danvers High athletics golf page.
   --------------------------------------------------------------------- */
const NEC_TITLES = [1980, 1990, 1992, 1993, 2005, 2006, 2008, 2009, 2010, 2011, 2015, 2016, 2017, 2018];
const SECTIONAL_TITLES = [2006, 2016];

/* The banners shown at the top of the History page */
const TITLES = [
  { year: 2005, label: "NEC Champions" },
  { year: 2006, label: "NEC & Sectional Champions" },
  { year: 2011, label: "Fourth Straight NEC Title" },
  { year: 2016, label: "NEC & Sectional Champions" },
  { year: 2017, label: "NEC Champions" },
  { year: 2018, label: "NEC Champions · State Runner-Up" }
];

/* w/l/t = overall, lw/ll/lt = league. note is optional.
   2021–2026 are regular-season results from the school's schedule page. */
const SEASONS = [
  { year: 2026, w: 9, l: 8, t: 1, lw: 7, ll: 5, lt: 1, note: "11th at Division 2 North sectional" },
  { year: 2025, w: 8, l: 9, t: 1, lw: 5, ll: 7, lt: 1, note: "Thomas Fish NEC All-Conference" },
  { year: 2024, w: 8, l: 11, t: 1, lw: 5, ll: 7, lt: 1 },
  { year: 2023, w: 5, l: 9, t: 1, lw: 3, ll: 9, lt: 1, note: "Bobby Fish NEC Player of the Year" },
  { year: 2022, w: 13, l: 3, t: 0, lw: 12, ll: 2, lt: 0, note: "Best record under Coach Hayes" },
  { year: 2021, w: 9, l: 8, t: 0, lw: 8, ll: 5, lt: 0, note: "Ryan Hayes' first season" }
];

const MILESTONES = [
  { year: "1980", text: "The first Northeastern Conference golf championship listed in the school's records." },
  { year: "1990–93", text: "Three NEC titles in four seasons: 1990, 1992 and 1993." },
  { year: "2005–06", text: "Back-to-back NEC championships, capped by a sectional title in 2006." },
  { year: "2008–11", text: "Four straight NEC championships — the longest run in program history." },
  { year: "2015–18", text: "Four more in a row, with a second sectional title in 2016." },
  { year: "2018", text: "NEC Player of the Year Jared Mscisz shares medalist honors with a 1-under 71 as Danvers wins the Division 2 North tournament with a 305, then finishes second in the state, six shots behind Hopkinton." },
  { year: "2021", text: "Ryan Hayes takes over as head coach." },
  { year: "2023", text: "Bobby Fish goes 10–0–2 in the regular season, is named NEC Player of the Year and finishes 11th at the Division 2 state final." },
  { year: "2026", text: "A 9–8–1 season and a trip to the last MIAA sectional — from 2027 every fall golf match in Massachusetts switches to stroke play and sectionals give way to divisional championships." }
];

const LEGENDS = [
  { name: "Jared Mscisz", pos: "NEC Player of the Year", era: "2018 season",
    bio: "The conference's top player on the last Danvers team to win the NEC. He shot a 1-under 71 to share first place at the Division 2 North tournament and led the Falcons to a runner-up finish at the state final.",
    tags: ["2018 NEC Player of the Year", "Sectional co-medalist", "State runner-up team"] },
  { name: "Bobby Fish", pos: "NEC Player of the Year", era: "Class of 2024",
    bio: "A three-time team MVP who went unbeaten in the 2023 regular season at 10–0–2. He tied for fourth with a 74 at the Division 2 North sectional at Stow Acres and placed 11th at the state final.",
    tags: ["2023 NEC Player of the Year", "3× team MVP", "11th in the state"] },
  { name: "Thomas Fish", pos: "NEC All-Conference", era: "2025 season",
    bio: "The Falcons' All-Conference selection in 2025, the program's most recent player to earn the league's top all-star honor.",
    tags: ["2025 NEC All-Conference"] }
];

/* ---------------------------------------------------------------------
   MEDIA
   NEWS: newspaper coverage. Each card opens the story on the paper's site
   (the Salem News may ask readers to subscribe).
   To add photos: drop image files in /photos and list them in PHOTOS.
   --------------------------------------------------------------------- */
const NEWS = [
  { date: "2026-10-20", title: "Division 2 North sectional results", blurb: "Danvers places 11th of 15 at Bradford; Wes Maylor leads the Falcons with an 81.", source: "Golf Genius",
    url: "https://www.golfgenius.com/ggid/26d2nsect" },
  { date: "2026-10-12", title: "O'Connor sparks Masconomet golfers to victory", blurb: "Silva, Maylor and Swanton win their matches in the regular-season finale at Rowley.", source: "Salem News",
    url: SN + "mondays-area-roundup-oconnor-sparks-masconomet-golfers-to-victory/article_3e1e8437-9990-4635-9963-19a465cf4c27.html" },
  { date: "2026-10-01", title: "Beverly, Danvers settle for a tie", blurb: "The rivals finish 36–36 at Beverly Golf & Tennis.", source: "Salem News",
    url: SN + "thursdays-area-roundup-prep-golfers-prevail-beverly-danvers-settle-for-a-tie/article_00674a8f-2f05-4a88-9d1f-f4335e9dd1a6.html" },
  { date: "2026-09-04", title: "Previewing the 2026 high school golf season", blurb: "The paper's team-by-team look at every North Shore golf program.", source: "Salem News",
    url: SN + "previewing-the-2026-high-school-golf-season/article_85ed0c0d-79bb-407d-a23c-b491a19d3d1f.html" },
  { date: "2026-09-03", title: "Danvers golfers slip by Salem", blurb: "A 47–25 road win in the Falcons' fourth match in four days.", source: "Salem News",
    url: SN + "thursdays-area-roundup-danvers-golfers-slip-by-salem/article_141f2e3b-a61a-4bd6-904c-dcffb5058867.html" },
  { date: "2026-08-31", title: "Beverly, Danvers, Prep golfers all win season openers", blurb: "Danvers starts 2026 with a 65–7 win at Peabody.", source: "Salem News",
    url: SN + "mondays-area-roundup-beverly-danvers-prep-golfers-all-win-season-openers/article_29aa7a69-1fbc-4203-bf2e-a71cfb272375.html" }
];

/* Example: { src: "photos/wenham-01.jpg", caption: "Maylor on the 9th green at Wenham", game: "vs. Gloucester" } */
const PHOTOS = [];
