/* =====================================================================
   DANVERS FALCONS FIELD HOCKEY — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) shows up on the site
   as "TBD" so it is obvious what still needs to come from the team.
   ===================================================================== */

const HUDL_TEAM = "https://fan.hudl.com/usa/ma/danvers/organization/17204/danvers-high-school/team/356796/girls-varsity-field-hockey";
const MP = "https://www.maxpreps.com/ma/field-hockey/game/";
const HOME = "Dr. Deering Stadium, Danvers";

const TEAM = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  sport: "Field Hockey",
  season: 2026,
  location: "Danvers, MA",
  conference: "Northeastern Conference",
  division: "MIAA Division 3",
  headCoach: "Jill McGinnity",
  coachNote: "2nd season back at Danvers, 10th overall · 88–48–20 with the Falcons entering 2026",
  assistants: ["Elizabeth Swenson", "Meghan Henrichon (JV)"],
  stadium: "Dr. Deering Stadium",
  address: "60 Cabot Road, Danvers, MA 01923",
  /* MIAA power ranking (published every Tuesday and Friday in season) —
     update rank, of and asOf from miaa.net/power-rankings (Field Hockey · Girls · Division 3) */
  ranking: { rank: 32, of: 54, asOf: "Oct. 20", url: "https://www.miaa.net/power-rankings" },
  links: {
    hudl: HUDL_TEAM,
    hudlVideo: HUDL_TEAM + "/video",
    athletics: "https://www.danversfalconsathletics.com/",
    maxpreps: "https://www.maxpreps.com/ma/danvers/danvers-falcons/field-hockey/schedule/",
    school: "https://danverspublicschools.org/dhs/athletics/field-hockey/",
    arbiter: "https://www.arbiterlive.com/Teams/Schedule/4285268?activeEntityId=5538",
    standings: "https://www.maxpreps.com/ma/field-hockey/26-27/league/northeast/?leagueid=37b680b2-833c-438b-be63-ea7041bbe02d",
    recordBook: "https://docs.google.com/spreadsheets/d/1jEHroi6pC-NbIG6HTWR2c3VpSZvV-oJg03icwzpfk0Y/edit?gid=1756060361"
  }
};

/* ---------------------------------------------------------------------
   SCHEDULE
   result:   "W" | "L" | "T" | null (null = not played yet)
   us / them: final score        home: true | false
   league:   true for games that count in the Northeastern Conference
   scrimmage: true = preseason (listed, but left out of the record)
   cancelled: true = called off (kept on the schedule, left out of the record)
   quarters: { us:[q1,q2,q3,q4], them:[...] }  (optional)
   halftime: [us, them] — used when the quarter scores aren't known
   scorers:  [ [player, goals], ... ]    assists: [ [player, assists], ... ]
   saves:    [ [goalkeeper, saves], ... ]
   shutout:  [ goalkeeper(s) who kept the clean sheet ]
   plays:    goal-by-goal summary, when it is known (optional)
   standouts: players the game recap singled out
   video:    link to the full-game replay (optional)

   Player goals, assists, saves, shutouts and game logs on the Stats
   page are added up from these lists, so a result is typed in once.
   Player names here must match the names in PLAYERS below.
   --------------------------------------------------------------------- */
const SCHEDULE = [
  { id: 101, date: "2026-08-27T15:00", opponent: "Wilmington", mascot: "Wildcats", home: false, league: false, site: "Wilmington, MA",
    scrimmage: true, result: null, notes: [] },
  { id: 102, date: "2026-08-31T16:00", opponent: "Weston", mascot: "Wildcats", home: false, league: false, site: "Weston, MA",
    scrimmage: true, result: null, notes: [] },
  { id: 103, date: "2026-09-04T08:00", opponent: "Manchester Essex & 8 others", home: true, league: false, site: "Danvers High School",
    scrimmage: true, result: null, notes: ["Preseason play day hosted by Danvers"] },

  { id: 1, date: "2026-09-07T10:00", opponent: "Marblehead", mascot: "Magicians", home: true, league: true, site: HOME,
    result: "L", us: 2, them: 6,
    quarters: null,
    summary: "Senior captain Kyla Moroney and freshman Zoie Abell each had a goal and an assist in the Labor Day opener, but Marblehead pulled away on the Falcons' home turf.",
    scorers: [["Kyla Moroney", 1], ["Zoie Abell", 1]],
    assists: [["Kyla Moroney", 1], ["Zoie Abell", 1]],
    saves: [["Eva Selaya-Mendez", 4], ["Ellie Barnes", 3]],
    standouts: ["Olivia Henry", "Addie Moore"],
    notes: ["Both goalkeepers saw time in the cage", "Quarter scores still needed from the team"],
    video: HUDL_TEAM + "/watch?b=QnJvYWRjYXN0NDM2MDI5Ng%3D%3D",
    sources: [
      { label: "Salem News roundup, Sept. 8", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-marblehead/9-7-2026/?c=082823ea-f631-4b35-80ac-f8b5c5996cbb" }
    ] },

  { id: 2, date: "2026-09-08T16:00", opponent: "Hamilton-Wenham", mascot: "Generals", home: true, league: false, site: HOME,
    result: "W", us: 4, them: 3,
    quarters: null,
    summary: "The Falcons came from behind three separate times for their first win. Kyla Moroney had a hat trick and set up Zoie Abell's goal, and freshman goalkeeper Ellie Barnes made 14 saves.",
    scorers: [["Kyla Moroney", 3], ["Zoie Abell", 1]],
    assists: [["Kyla Moroney", 1], ["Mia Calabro", 1]],
    saves: [["Ellie Barnes", 14]],
    standouts: ["Olivia Henry", "Addie Moore", "Caden Diozzi"],
    notes: ["Hamilton-Wenham was held without a goal over the final two quarters"],
    video: HUDL_TEAM + "/watch?b=QnJvYWRjYXN0NDM2MDMwMQ%3D%3D",
    sources: [
      { label: "Salem News roundup, Sept. 8", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-hamilton-wenham-regional-south-hamilton/9-8-2026/?c=7e011654-3635-4e36-968f-c1390f58f7fe" }
    ] },

  { id: 3, date: "2026-09-15T16:00", opponent: "Peabody", mascot: "Tanners", home: true, league: true, site: HOME,
    result: "W", us: 8, them: 3,
    quarters: null, halftime: [5, 0],
    summary: "Freshman Zoie Abell scored four goals, and Kyla Moroney (a goal and three assists) and Addie Moore (four assists) also finished with four points as Danvers built a 5–0 halftime lead at Deering Stadium.",
    scorers: [["Zoie Abell", 4], ["Charlotte Walfield", 2], ["Isabella Latusky", 1], ["Kyla Moroney", 1]],
    assists: [["Addie Moore", 4], ["Kyla Moroney", 3], ["Olivia Henry", 1]],
    saves: [["Eva Selaya-Mendez", 1], ["Ellie Barnes", 4]],
    standouts: ["Olivia Henry", "Elizabeth Sher", "Rylee Sheppard"],
    notes: [
      "Abell's four goals match the single-game mark listed in the program's record book",
      "Peabody goalkeeper Mia Covey made 37 saves",
      "Selaya-Mendez played the first half in goal and Barnes the second"
    ],
    video: HUDL_TEAM + "/watch?b=QnJvYWRjYXN0NDQzNTkxOQ%3D%3D",
    sources: [
      { label: "Salem News game story, Sept. 15", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-peabody-veterans-memorial/9-15-2026/?c=21a88b77-594c-4303-b191-32173d1f0a75" }
    ] },

  { id: 4, date: "2026-09-17T19:00", opponent: "Saugus", mascot: "Sachems", home: true, league: true, site: HOME,
    result: "W", us: 2, them: 1,
    quarters: null, halftime: [1, 1],
    summary: "Under the lights at Deering Stadium, Kyla Moroney tied it 50 seconds before halftime and won it on a penalty stroke in the third quarter. Danvers earned 15 corners and put 27 shots on goal in its third straight win.",
    scorers: [["Kyla Moroney", 2]],
    assists: [["Zoie Abell", 1]],
    saves: [["Eva Selaya-Mendez", 6], ["Ellie Barnes", 1]],
    plays: [
      { when: "2nd · 0:50 left", play: "Kyla Moroney, tying goal", score: "1–1" },
      { when: "3rd", play: "Kyla Moroney, penalty stroke", score: "2–1" }
    ],
    notes: ["15 penalty corners and 27 shots on goal for Danvers"],
    video: HUDL_TEAM + "/watch?b=QnJvYWRjYXN0NDQ1Mzk4Nw%3D%3D",
    sources: [
      { label: "Salem News roundup, Sept. 17", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-saugus/9-17-2026/?c=2f7e0701-9628-4937-8a07-66505da51bf4" }
    ] },

  { id: 5, date: "2026-09-21T16:00", opponent: "Ipswich", mascot: "Tigers", home: false, league: false, site: "Ipswich High School",
    result: "L", us: 2, them: 6,
    quarters: null,
    summary: "It was 1–1 after one quarter before Ipswich took control in the second. Kyla Moroney had a goal and an assist, and the two Danvers goalkeepers combined for 11 saves.",
    scorers: [["Kyla Moroney", 1]],
    assists: [["Kyla Moroney", 1]],
    saves: [["Eva Selaya-Mendez", 6], ["Ellie Barnes", 5]],
    notes: ["The scorer of Danvers' other goal is still needed from the team"],
    sources: [
      { label: "Salem News roundup, Sept. 21", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-ipswich/9-21-2026/?c=8269720e-63a5-4c90-91ec-8d2e7203a27d" }
    ] },

  { id: 6, date: "2026-09-24T16:00", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Forti Field, Beverly",
    result: "L", us: 0, them: 2,
    quarters: { us: [0, 0, 0, 0], them: [0, 0, 1, 1] },
    summary: "The Falcons played their rival to a scoreless first half and held Beverly to six corners, but the unbeaten-in-the-league Panthers scored in the third and fourth quarters. Eva Selaya-Mendez made 11 saves.",
    scorers: [], assists: [],
    saves: [["Eva Selaya-Mendez", 11]],
    standouts: ["Olivia Henry", "Addie Moore", "Lia Chiarenza"],
    notes: ["Rivalry game", "Lia Chiarenza was voted the team's Player of the Game by her teammates"],
    sources: [
      { label: "Salem News game story, Sept. 25", url: null },
      { label: "MaxPreps box score", url: MP + "beverly-vs-danvers/9-24-2026/?c=7a95ad11-7240-44c0-84bf-1f819ca52f52" }
    ] },

  { id: 7, date: "2026-09-29T16:00", opponent: "Bishop Fenwick", mascot: "Crusaders", home: false, league: false, site: "Bishop Fenwick, Peabody",
    result: "T", us: 2, them: 2,
    quarters: null,
    summary: "Zoie Abell buried a pass from Kyla Moroney off a penalty corner with no time left on the clock to earn a tie at one-loss Bishop Fenwick. Moroney scored the first Danvers goal and Eva Selaya-Mendez stopped 11 shots.",
    scorers: [["Kyla Moroney", 1], ["Zoie Abell", 1]],
    assists: [["Addie Moore", 1], ["Kyla Moroney", 1]],
    saves: [["Eva Selaya-Mendez", 11]],
    plays: [
      { when: "—", play: "Kyla Moroney (Addie Moore)", score: null },
      { when: "4th · 0:00", play: "Zoie Abell (Kyla Moroney), off a penalty corner", score: "2–2" }
    ],
    notes: ["Fenwick came in at 6–1"],
    sources: [
      { label: "Salem News roundup, Sept. 29", url: null },
      { label: "MaxPreps box score", url: MP + "bishop-fenwick-peabody-vs-danvers/9-29-2026/?c=2e34ecf1-cf89-4404-a931-9ab560ee06af" }
    ] },

  { id: 8, date: "2026-10-01T16:30", opponent: "Gloucester", mascot: "Fishermen", home: false, league: true, site: "Newell Stadium, Gloucester",
    result: "L", us: 2, them: 5,
    quarters: null, halftime: [2, 2],
    summary: "First-half goals from Zoie Abell and Addie Moore, both set up by Kyla Moroney, had Danvers level with unbeaten Gloucester at halftime before a tough third quarter. Eva Selaya-Mendez made a career-high 21 saves.",
    scorers: [["Zoie Abell", 1], ["Addie Moore", 1]],
    assists: [["Kyla Moroney", 2]],
    saves: [["Eva Selaya-Mendez", 21]],
    standouts: ["Elizabeth Sher"],
    notes: ["Elizabeth Sher made two defensive saves", "Gloucester improved to 8–0"],
    sources: [
      { label: "Salem News roundup, Oct. 1", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-gloucester/10-1-2026/?c=d11bc06e-0b5b-4eae-adb7-05b2c2f1fa2f" },
      { label: "Full-game replay on NFHS Network", url: "https://www.nfhsnetwork.com/events/gloucester-high-school-gloucester-ma/gamd65855a3ea" }
    ] },

  { id: 9, date: "2026-10-02T16:30", opponent: "Swampscott", mascot: "Big Blue", home: false, league: true, site: "Blocksidge Field, Swampscott",
    result: "W", us: 4, them: 2,
    quarters: null, halftime: [1, 2],
    summary: "Down a goal at halftime, the Falcons scored three unanswered in the second half. Olivia Henry and Kyla Moroney each had a goal and an assist, Addie Moore scored, and sophomore Elynne Silva got her first varsity goal.",
    scorers: [["Olivia Henry", 1], ["Kyla Moroney", 1], ["Addie Moore", 1], ["Elynne Silva", 1]],
    assists: [["Zoie Abell", 2], ["Olivia Henry", 1], ["Kyla Moroney", 1]],
    saves: [["Eva Selaya-Mendez", 7]],
    notes: ["Elynne Silva's first varsity goal"],
    sources: [
      { label: "Salem News roundup, Oct. 2", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-swampscott/10-2-2026/?c=b8f5f204-0f9f-433b-a90d-d9b18384a04b" }
    ] },

  { id: 10, date: "2026-10-06T17:30", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: HOME,
    result: "L", us: 1, them: 3,
    quarters: null,
    summary: "Kyla Moroney finished a pass from Olivia Henry just 50 seconds in for a 1–0 lead, but the defending conference champions answered with three. Eva Selaya-Mendez made six saves.",
    scorers: [["Kyla Moroney", 1]],
    assists: [["Olivia Henry", 1]],
    saves: [["Eva Selaya-Mendez", 6]],
    plays: [
      { when: "1st · 0:50 in", play: "Kyla Moroney (Olivia Henry)", score: "1–0" }
    ],
    standouts: ["Olivia Henry", "Rylee Sheppard", "Lia Chiarenza"],
    notes: ["Quarter scores still needed from the team"],
    video: HUDL_TEAM + "/watch?b=QnJvYWRjYXN0NDU4MDI4OA%3D%3D",
    sources: [
      { label: "Salem News roundup, Oct. 6", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-masconomet-regional-boxford/10-6-2026/?c=2527bbfe-959b-4236-a5df-91cbbcc041d2" }
    ] },

  { id: 11, date: "2026-10-09T15:45", opponent: "Gloucester", mascot: "Fishermen", home: true, league: true, site: HOME,
    result: "L", us: 0, them: 5,
    quarters: null,
    summary: "Unbeaten Gloucester, the conference leader, kept a clean sheet and clinched a state tournament berth. Olivia Henry made plays at both ends, Rylee Sheppard was strong on defense, and Kyla Moroney was double-teamed for most of the afternoon. Eva Selaya-Mendez made seven saves.",
    scorers: [], assists: [],
    saves: [["Eva Selaya-Mendez", 7]],
    standouts: ["Olivia Henry", "Rylee Sheppard", "Kyla Moroney"],
    notes: ["Second meeting in nine days — Gloucester also won 5–2 on Oct. 1", "Gloucester improved to 10–0 and qualified for the Division 3 tournament", "Gloucester goalkeeper Aleena Brown made eight saves"],
    video: HUDL_TEAM + "/watch?b=QnJvYWRjYXN0NDU5NTcyOA%3D%3D",
    sources: [
      { label: "Salem News roundups, Oct. 9 and Oct. 11", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-gloucester/10-9-2026/?c=1da8bf2a-41e8-4316-b297-d5c266da4c58" }
    ] },

  { id: 12, date: "2026-10-13T16:00", opponent: "Malden Catholic", mascot: "Lancers", home: true, league: false, site: HOME,
    result: "W", us: 5, them: 1,
    quarters: null,
    summary: "Captain Kyla Moroney had her second hat trick of the season and an assist, and freshman Zoie Abell added two goals and two assists in a convincing non-league win.",
    scorers: [["Kyla Moroney", 3], ["Zoie Abell", 2]],
    assists: [["Zoie Abell", 2], ["Kyla Moroney", 1], ["Olivia Henry", 1], ["Sabrina Stoney", 1]],
    saves: [["Ellie Barnes", 3], ["Eva Selaya-Mendez", 6]],
    standouts: ["Rylee Sheppard", "Isabella Latusky", "Addie Moore"],
    notes: ["Barnes played the first half in goal (3 saves on 4 shots) and Selaya-Mendez the second (6 saves, no goals allowed)"],
    video: HUDL_TEAM + "/watch?b=QnJvYWRjYXN0NDYxOTA2MA%3D%3D",
    sources: [
      { label: "Salem News roundup, Oct. 13", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-malden-catholic/10-13-2026/?c=71d161ee-a654-4dce-8908-b79fcb17fde2" }
    ] },

  { id: 13, date: "2026-10-15T18:30", opponent: "Swampscott", mascot: "Big Blue", home: false, league: true, site: "Blocksidge Field, Swampscott",
    result: "T", us: 3, them: 3,
    quarters: null,
    summary: "A back-and-forth game under the lights at Blocksidge Field ended level. Freshman Zoie Abell scored twice and Kyla Moroney had a goal and an assist.",
    scorers: [["Zoie Abell", 2], ["Kyla Moroney", 1]],
    assists: [["Kyla Moroney", 1], ["Olivia Henry", 1]],
    saves: [["Eva Selaya-Mendez", 3], ["Ellie Barnes", 4]],
    standouts: ["Lia Chiarenza"],
    notes: ["Selaya-Mendez made 3 saves on 6 shots and Barnes 4 saves on 4 shots", "Second meeting — Danvers won 4–2 at Swampscott on Oct. 2"],
    sources: [
      { label: "Salem News roundup, Oct. 15", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-swampscott/10-15-2026/?c=e0f7f8ca-f898-432b-a205-9a27d0f25d1f" }
    ] },

  { id: 14, date: "2026-10-16T16:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Piper Field, Marblehead",
    result: "W", us: 5, them: 3,
    quarters: null,
    summary: "Down 2–0 after the first quarter, the Falcons came back behind their captains: Kyla Moroney (a goal and two assists), Olivia Henry (a goal and an assist) and Addie Moore (a goal). Senior Mia Calabro and freshman Zoie Abell each added a goal and an assist.",
    scorers: [["Kyla Moroney", 1], ["Olivia Henry", 1], ["Addie Moore", 1], ["Mia Calabro", 1], ["Zoie Abell", 1]],
    assists: [["Kyla Moroney", 2], ["Olivia Henry", 1], ["Mia Calabro", 1], ["Zoie Abell", 1]],
    saves: [["Eva Selaya-Mendez", 8]],
    standouts: ["Elizabeth Sher", "Sophia Goudreau"],
    notes: ["Danvers trailed 2–0 after one quarter", "Revenge for the 6–2 opening-day loss to Marblehead"],
    video: HUDL_TEAM + "/watch?b=QnJvYWRjYXN0NDU0MDU2Mg%3D%3D",
    sources: [
      { label: "Salem News roundup, Oct. 16", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-marblehead/10-16-2026/?c=f79313c9-8814-4ecf-831d-31d44454528f" }
    ] },

  { id: 15, date: "2026-10-20T19:00", opponent: "Saugus", mascot: "Sachems", home: false, league: true, site: "Serino Field, Saugus", result: null,
    notes: ["Second meeting — Danvers won 2–1 at home on Sept. 17"] },
  { id: 16, date: "2026-10-21T16:00", opponent: "St. Mary's", mascot: "Spartans", home: false, league: false, site: "Manning Bowl, Lynn", result: null, notes: [] },
  { id: 17, date: "2026-10-27T17:30", opponent: "Bishop Fenwick", mascot: "Crusaders", home: true, league: false, site: HOME, result: null,
    notes: ["Second meeting — the teams tied 2–2 on Sept. 29"] },
  { id: 18, date: "2026-10-30T16:00", opponent: "Masconomet", mascot: "Chieftains", home: false, league: false, site: "Boxford Commons turf field, Boxford", result: null,
    notes: ["Regular-season finale", "Second meeting — Masconomet won 3–1 on Oct. 6"] }
];

/* ---------------------------------------------------------------------
   ROSTER — the official 2026 varsity roster from the school's schedule
   site (Arbiter Live): jersey numbers, class and positions.
   num:   jersey number (null = TBD)
   pos:   ["F"] forward · ["M"] midfielder · ["D"] defender · ["GK"] goalkeeper
   grade: "Sr." | "Jr." | "So." | "Fr." | null
   nick:  what she goes by, when it isn't her first name (optional)
   totals: { g, a, sv } — official season goals / assists / saves. Leave
           it out and the site adds them up from the game recaps above.
   Names in the game lists above must match these names exactly.
   --------------------------------------------------------------------- */
const STATS_AS_OF = "Through 14 games (Oct. 16, 2026)";
const STATS_NOTE = "no official stat sheet is published for 2026. Goals, assists, saves and game logs are added up from Salem News game recaps, so they can differ slightly from the paper's own leaders list — on Oct. 15 it had Kyla Moroney at 14 goals and 10 assists and Eva Selaya-Mendez at 79 saves through the Oct. 13 game, where the recaps add up to 14 goals, 11 assists and 86 saves. The roster, numbers and positions are the school's official list.";

const PLAYERS = [
  { name: "Ellie Barnes", num: 0, pos: ["GK"], grade: "Fr.", captain: false },
  { name: "Hannah Moccia", num: 2, pos: ["F"], grade: "Sr.", captain: false },
  { name: "Charlotte Walfield", num: 3, pos: ["F"], grade: "Jr.", captain: false },
  { name: "Audrey Silva", num: 6, pos: ["M"], grade: "Jr.", captain: false },
  { name: "Elizabeth Sher", nick: "Libby", num: 7, pos: ["D"], grade: "Jr.", captain: false },
  { name: "Mia Calabro", num: 8, pos: ["D"], grade: "Sr.", captain: false },
  { name: "Isabella Latusky", nick: "Izzy", num: 9, pos: ["M"], grade: "Jr.", captain: false },
  { name: "Zoie Abell", num: 10, pos: ["F"], grade: "Fr.", captain: false },
  { name: "Sabrina Stoney", num: 11, pos: ["D"], grade: "Jr.", captain: false },
  { name: "Elynne Silva", num: 12, pos: ["F"], grade: "So.", captain: false },
  { name: "Kyla Moroney", num: 13, pos: ["F"], grade: "Sr.", captain: true },
  { name: "Olivia Henry", num: 14, pos: ["M", "D"], grade: "Sr.", captain: true },
  { name: "Rylee Sheppard", num: 15, pos: ["D"], grade: "Sr.", captain: false },
  { name: "Sophia Goudreau", num: 17, pos: ["F"], grade: "Jr.", captain: false },
  { name: "Lia Chiarenza", num: 18, pos: ["M"], grade: "Jr.", captain: false },
  { name: "Addie Moore", num: 23, pos: ["F", "M"], grade: "Sr.", captain: true },
  { name: "Caden Diozzi", num: 25, pos: ["D"], grade: "Sr.", captain: false },
  { name: "Delia Smith", num: 26, pos: ["D"], grade: "Sr.", captain: false },
  { name: "Eva Selaya-Mendez", num: 99, pos: ["GK"], grade: "So.", captain: false }
];

/* ---------------------------------------------------------------------
   NORTHEASTERN CONFERENCE STANDINGS — copy from the MaxPreps league page
   (TEAM.links.standings). [team, league W, L, T, overall W, L, T]
   --------------------------------------------------------------------- */
const STANDINGS_AS_OF = "Oct. 20";
const STANDINGS = [
  ["Gloucester", 10, 0, 0, 13, 0, 0],
  ["Masconomet", 6, 2, 1, 8, 3, 2],
  ["Beverly", 6, 2, 1, 8, 4, 1],
  ["Swampscott", 3, 3, 1, 3, 6, 2],
  ["Danvers", 4, 5, 1, 6, 6, 2],
  ["Marblehead", 4, 7, 1, 4, 8, 2],
  ["Saugus", 2, 6, 1, 6, 6, 2],
  ["Peabody", 0, 10, 0, 3, 12, 0]
];

/* Position → group used by the filter buttons on the Stats page */
const POSITION_GROUPS = {
  "Forwards": ["F"],
  "Midfielders": ["M"],
  "Defenders": ["D"],
  "Goalkeepers": ["GK"]
};

/* ---------------------------------------------------------------------
   HISTORY — from the school's athletics page and the Danvers Field
   Hockey Record Book (the Google Sheet linked from that page).
   --------------------------------------------------------------------- */
const HISTORY_INTRO = "Thirty conference titles, three sectional crowns and an 87-game league winning streak — the seasons, coaches and players behind one of the Northeastern Conference's proudest programs.";

const BANNERS = [
  { year: 2022, label: "MIAA Division 2 Final Four" },
  { year: 1989, label: "North Sectional & Eastern Mass. Champions" },
  { year: 1988, label: "North Sectional Champions" },
  { year: 1981, label: "North Sectional Champions" }
];

/* Northeastern Conference title years, as listed on the school's athletics page */
const NEC_TITLES = [1971, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1983, 1984, 1985, 1986,
                    1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,
                    2000, 2002, 2003, 2014, 2015, 2019, 2023];
const HISTORY_TILE = ["NEC win streak", "87", "Straight conference wins, 1987 to 1995"];
const HISTORY_NOTE = "Title years follow the school's athletics page. The record book doesn't mark 1971 or 1986 as title seasons, and it has no win–loss record on file for 1975–77, 1981 or 1998.";

/* [year, wins, losses, ties, coach, NEC finish, postseason, caveat]
   null record = not in the record book. Title years come from NEC_TITLES,
   so "NEC finish" only needs filling in for the other seasons. */
const SEASONS = [
  [2025, 4, 11, 3, "Jill McGinnity", "4th", "Did not qualify"],
  [2024, 4, 10, 4, "Kristen McCarthy", "6th", "Did not qualify"],
  [2023, 14, 3, 3, "Kristen McCarthy", "13–0–1 in the NEC", "Second round"],
  [2022, 16, 3, 3, "Kristen McCarthy", "11–3–1 in the NEC", "State semifinals (Final Four)"],
  [2021, 15, 2, 4, "Kristen McCarthy", "11–2–1 in the NEC", "State quarterfinals"],
  [2020, 7, 3, 0, "Jill McGinnity", "", "No tournament (COVID)"],
  [2019, 15, 1, 2, "Jill McGinnity", "11–0–1 in the NEC", "Quarterfinals"],
  [2018, 11, 6, 1, "Jill McGinnity", "", "First round"],
  [2017, 8, 4, 6, "Jill McGinnity", "", "First round"],
  [2016, 10, 5, 2, "Jill McGinnity", "", "First round"],
  [2015, 13, 1, 4, "Jill McGinnity", "", "Quarterfinals"],
  [2014, 15, 5, 0, "Jill McGinnity", "", "First round"],
  [2013, 11, 5, 2, "Jill McGinnity", "", "First round"],
  [2012, 9, 6, 3, "Barb Damon", "", "Quarterfinals"],
  [2011, 14, 3, 1, "Barb Damon", "", "First round"],
  [2010, 10, 7, 1, "Barb Damon", "", "First round"],
  [2009, 8, 7, 3, "Barb Damon", "NEC Sportsmanship Award", "Preliminary round"],
  [2008, 8, 7, 3, "Barb Damon", "", "Preliminary round"],
  [2007, 3, 10, 5, "Barb Damon", "", "Did not qualify"],
  [2006, 5, 9, 4, "Barb Damon", "NEC Sportsmanship Award", "Did not qualify"],
  [2005, 6, 9, 2, "Jen Hicks", "", "Did not qualify"],
  [2004, 7, 8, 1, "Jen Hicks", "", "Preliminary round"],
  [2003, 9, 3, 3, "Jen Brown", "", "First round"],
  [2002, 10, 2, 0, "Barb Damon", "", "Second round"],
  [2001, 10, 2, 3, "Barb Damon", "2nd", ""],
  [2000, 14, 0, 2, "Barb Damon", "", "Second round"],
  [1999, 7, 3, 4, "Barb Damon", "", "Quarterfinals"],
  [1998, null, null, null, "Barb Damon", "", "Semifinals", "Unbeaten — exact record not on file"],
  [1997, 11, 0, 1, "Barb Damon", "", "Second round"],
  [1996, 11, 0, 1, "Barb Damon", "", "North sectional runner-up"],
  [1995, 9, 5, 0, "Barb Damon", "", ""],
  [1994, 12, 1, 1, "Barb Damon", "", ""],
  [1993, 14, 1, 2, "Barb Damon", "", "Division 1 North runner-up"],
  [1992, 9, 0, 3, "Barb Damon", "", "North sectional runner-up"],
  [1991, 14, 1, 2, "Barb Damon", "", "Semifinals"],
  [1990, 11, 1, 3, "Barb Damon", "", "Third round"],
  [1989, 12, 1, 1, "Barb Damon", "", "North sectional champions"],
  [1988, 15, 1, 0, "Barb Damon", "", "North sectional champions"],
  [1987, 11, 1, 2, "Barb Damon", "", "North sectional runner-up"],
  [1986, 11, 2, 1, "Barb Damon", "", "North sectional runner-up"],
  [1985, 13, 1, 0, "Barb Damon", "", "Semifinals"],
  [1984, 14, 0, 0, "Patricia Blanchard & Barb Damon", "", "First round", "Regular season only"],
  [1983, 13, 1, 0, "Patricia Blanchard", "", "Second round"],
  [1982, 7, 5, 2, "Tara Carney Runnals", "", ""],
  [1981, null, null, null, "Lynn Ellison", "", "North sectional champions"],
  [1980, 20, 2, 0, "Lynn Ellison", "", "Semifinals"],
  [1979, 12, 1, 1, "Lynn Ellison", "", "Qualified"],
  [1978, 9, 2, 3, "Lynn Ellison", "", "Did not qualify"],
  [1977, null, null, null, "Lynn Ellison", "", "Third round"],
  [1976, null, null, null, "Lynn Ellison", "", "Second round"],
  [1975, null, null, null, "Lynn Ellison", "", "Qualified"],
  [1974, 4, 3, 2, "Lynn Ellison", "", ""],
  [1973, 3, 4, 1, "Lynn Ellison", "", ""],
  [1972, 2, 2, 4, "", "", ""],
  [1971, 4, 4, 1, "", "", ""],
  [1970, 0, 7, 4, "", "", ""],
  [1969, 2, 6, 1, "", "", ""]
];

const MILESTONES = [
  { year: "1969", text: "The earliest season in the record book: 2–6–1." },
  { year: "1974", text: "The program plays its first season on a field of its own." },
  { year: "1975–81", text: "Seven straight Northeastern Conference titles under coach Lynn Ellison." },
  { year: "1980", text: "A 20–2 season, still the most wins in program history, with 12 shutouts from goalkeeper Kathleen Sherman." },
  { year: "1981", text: "North sectional champions. Nancy Skarmeas scores 26 goals and 39 points, the single-season points record." },
  { year: "1987–95", text: "An 87-game winning streak in Northeastern Conference play under coach Barb Damon." },
  { year: "1988–89", text: "Back-to-back North sectional titles; the 1989 team goes on to win the Eastern Massachusetts championship." },
  { year: "1992", text: "A 9–0–3 team is not scored on, according to the record book, and Amanda Noyes posts 12 shutouts." },
  { year: "1994", text: "Barb Damon earns her 100th win and is named Coach of the Year. She finishes with 251." },
  { year: "2000", text: "An unbeaten 14–0–2 season with 55 goals, the most the program had scored to that point." },
  { year: "2019", text: "Emma Thibodeau is the conference Player of the Year as Danvers goes 15–1–2 and 11–0–1 in the league." },
  { year: "2022", text: "A 16–3–3 team reaches the MIAA Division 2 Final Four." },
  { year: "2023", text: "The most recent conference title: 14–3–3 overall and 13–0–1 in the NEC." }
];

const LEGENDS = [
  { name: "Barb Damon", role: "Head coach · 1985–2002, 2006–2012",
    bio: "The winningest coach in program history with 251 victories and 13 conference championships, 11 of them in a row. Her teams won 87 straight NEC games from 1987 to 1995, and she received the MIAA's Distinguished Women in Sports award in 2001.",
    tags: ["251 wins", "13 NEC titles", "New Agenda Hall of Fame"] },
  { name: "Liz Flood", role: "Captain 1998 · NEC Player of the Year 1997",
    bio: "Her 34 goals are the single-season record. A Globe and Herald All-Scholastic in 1997, she captained the unbeaten 1998 team that reached the semifinals.",
    tags: ["34 goals in a season", "All-Scholastic"] },
  { name: "Emma Thibodeau", role: "Captain 2019 · NEC Player of the Year 2019",
    bio: "The career leader in goals (36) and points (66) in the record book, and a Globe and Herald All-Scholastic on the 15–1–2 conference champions of 2019.",
    tags: ["36 career goals", "66 career points"] },
  { name: "Megan McGinnity", role: "Goalkeeper · Captain 2023",
    bio: "Made a program-record 313 career saves with 27 shutouts. Her 12 shutouts in 2021 share the single-season record, and she once stopped 30 shots in a game.",
    tags: ["313 career saves", "27 shutouts"] },
  { name: "Kristen McCarthy", role: "Captain 2015 · NEC Player of the Year 2015",
    bio: "The career assists leader with 32, including a record five in one game, and a Globe and Herald All-Scholastic. She came back as head coach and took the 2022 Falcons to the Final Four.",
    tags: ["32 career assists", "Coached 2021–24"] },
  { name: "Kathleen Sherman", role: "Goalkeeper · Captain 1982",
    bio: "The goalkeeper behind the title teams of 1979 to 1981, credited with about 34 career shutouts, including 12 in the 20-win season of 1980.",
    tags: ["≈34 career shutouts", "3× All-League"] }
];

/* Record book: each list is [name, number, detail] in rank order.
   Only what the school's record book has on file, so the lists are short. */
const RECORDS = {
  "Single Season": {
    Goals: [["Liz Flood", 34, ""], ["Jacki Lapointe", 28, "2004"], ["Nancy Skarmeas", 26, "1981"], ["Laurie Griffin", 23, "1980"]],
    Points: [["Nancy Skarmeas", 39, "1981 · 26 goals, 13 assists"]],
    Saves: [["Grace McLaughlin", 124, "2024"], ["Megan McGinnity", 117, "2023"], ["Megan McGinnity", 114, "2021"], ["Molly Verhoosly", 104, "2025"], ["Herwig", 91, "2000"]],
    Shutouts: [["Amanda Noyes", 12, "1992"], ["Megan McGinnity", 12, "2021"], ["Kathleen Sherman", 12, "1980"], ["Megan McGinnity", 10, "2023"]]
  },
  "Career": {
    Goals: [["Emma Thibodeau", 36, ""], ["Bobbi Serino", 34, ""]],
    Assists: [["Kristen McCarthy", 32, ""]],
    Points: [["Emma Thibodeau", 66, ""]],
    Saves: [["Megan McGinnity", 313, ""], ["Grace McLaughlin", 127, ""]],
    Shutouts: [["Kathleen Sherman", "≈34", "Approximate"], ["Megan McGinnity", 27, ""]],
    "Coaching Wins": [["Barb Damon", 251, ""], ["Jill McGinnity", 94, ""], ["Lynn Ellison", 84, ""], ["Kristen McCarthy", 45, ""]]
  },
  "Single Game": {
    Goals: [["Ashley Curcuru", 4, ""], ["Zoie Abell", 4, "vs. Peabody, 2026"]],
    Assists: [["Kristen McCarthy", 5, ""]],
    Saves: [["Megan McGinnity", 30, ""]]
  }
};

/* ---------------------------------------------------------------------
   MEDIA
   Hudl doesn't allow its videos to be embedded on other sites, so each
   card opens the video on Hudl. url: null falls back to the team's full
   video page To add one, open it on the team's Hudl video page and copy
   the address (watch?b=… for a replay, watch?hr=… for a highlight).
   To add photos: drop image files in /photos and list them in PHOTOS.
   Example: { src: "photos/peabody-01.jpg", caption: "Abell scores vs. Peabody" }
   --------------------------------------------------------------------- */
const WATCH = HUDL_TEAM + "/watch?b=";                                      // full-game livestream replays
const REEL = (id) => HUDL_TEAM + "/watch?hr=" + id + "&ot=TEAM&oi=356796";   // highlight reels
const VIDEOS = [
  { title: "Danvers at Marblehead", sub: "Full-Game Replay · Oct. 16", season: 2026, len: "Replay", url: WATCH + "QnJvYWRjYXN0NDU0MDU2Mg%3D%3D" },
  { title: "Danvers vs. Malden Catholic", sub: "Full-Game Replay · Oct. 13", season: 2026, len: "Replay", url: WATCH + "QnJvYWRjYXN0NDYxOTA2MA%3D%3D" },
  { title: "Danvers vs. Gloucester", sub: "Full-Game Replay · Oct. 9", season: 2026, len: "Replay", url: WATCH + "QnJvYWRjYXN0NDU5NTcyOA%3D%3D" },
  { title: "Danvers vs. Masconomet", sub: "Full-Game Replay · Oct. 6", season: 2026, len: "Replay", url: WATCH + "QnJvYWRjYXN0NDU4MDI4OA%3D%3D" },
  { title: "Danvers vs. Saugus", sub: "Full-Game Replay · Sept. 17", season: 2026, len: "Replay", url: WATCH + "QnJvYWRjYXN0NDQ1Mzk4Nw%3D%3D" },
  { title: "Danvers vs. Peabody", sub: "Full-Game Replay · Sept. 15", season: 2026, len: "Replay", url: WATCH + "QnJvYWRjYXN0NDQzNTkxOQ%3D%3D" },
  { title: "Danvers vs. Hamilton-Wenham", sub: "Full-Game Replay · Sept. 8", season: 2026, len: "Replay", url: WATCH + "QnJvYWRjYXN0NDM2MDMwMQ%3D%3D" },
  { title: "Danvers vs. Marblehead", sub: "Full-Game Replay · Sept. 7", season: 2026, len: "Replay", url: WATCH + "QnJvYWRjYXN0NDM2MDI5Ng%3D%3D" },
  { title: "Kyla Moroney", sub: "Player Highlights", season: 2025, len: "0:40", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OTA4ZWU1ODBjMDJjYzc4OGU3MjkxMWU%3D") },
  { title: "Danvers at Marblehead", sub: "Game Highlights", season: 2025, len: "0:40", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OTA3ZmI0MDYwMzFmNmZlMjRiYmMwYzc%3D") },
  { title: "Danvers at Marblehead", sub: "Full-Game Replay · Oct. 20", season: 2025, len: "Replay", url: WATCH + "QnJvYWRjYXN0MjgyOTQ3NA%3D%3D" },
  { title: "Danvers vs. Essex Tech", sub: "Full-Game Replay · Oct. 11", season: 2024, len: "Replay", url: WATCH + "QnJvYWRjYXN0MTQyNDg4OQ%3D%3D" },
  { title: "Danvers vs. Peabody", sub: "Full-Game Replay · Oct. 4", season: 2024, len: "Replay", url: WATCH + "QnJvYWRjYXN0MTM5NjczMw%3D%3D" },
  { title: "Danvers vs. Gloucester", sub: "Full-Game Replay · Sept. 24", season: 2024, len: "Replay", url: WATCH + "QnJvYWRjYXN0MTM1NTE5Ng%3D%3D" },
  { title: "Danvers vs. Saugus", sub: "Full-Game Replay · Sept. 20", season: 2024, len: "Replay", url: WATCH + "QnJvYWRjYXN0MTMzODI1Mg%3D%3D" },
  { title: "Danvers vs. Marblehead", sub: "Full-Game Replay · Sept. 5", season: 2024, len: "Replay", url: WATCH + "QnJvYWRjYXN0MTI3MzExNw%3D%3D" },
  { title: "Danvers vs. Andover", sub: "Full-Game Replay · Sept. 3", season: 2024, len: "Replay", url: WATCH + "QnJvYWRjYXN0MTI1OTI5OQ%3D%3D" },
  { title: "Danvers vs. Westwood", sub: "Tournament Highlights", season: 2021, len: "3:54", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk2MThlODg4NzE5YWYyMjBjYThjNGRhZjA%3D") },
  { title: "Danvers vs. Central Catholic", sub: "Game Highlights", season: 2019, len: "2:17", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk1ZDdhZTk2MGMxMWIyMTE2NjQxODQ4NjM%3D") },
  { title: "Danvers vs. Gloucester", sub: "Game Highlights", season: 2019, len: "2:13", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk1ZDdhY2ZjMGY1NmEyZDExNDg0MDc3MDQ%3D") },
  { title: "Marblehead at Danvers", sub: "Game Highlights", season: 2019, len: "1:07", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk1ZDczMzI0NWMxMjQyYTE0YjAyZjY5ZmI%3D") },
  { title: "Danvers vs. Manchester Essex", sub: "Scrimmage Highlights", season: 2019, len: "2:01", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk1ZDZhYWY1ZGYzMWNkMzA1NjAyODRhNmE%3D") },
  { title: "Danvers vs. North Andover", sub: "Game Highlights", season: 2018, len: "1:58", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk1YmM2OGRkN2EwMjJhYzA0YzBiZTQzZjc%3D") },
  { title: "Danvers vs. Marblehead", sub: "Game Highlights", season: 2018, len: "3:17", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk1YmI2MTJhNDY2NTY2MjBhZDgwZDJkYmY%3D") },
  { title: "Danvers vs. Malden", sub: "Game Highlights", season: 2018, len: "1:14", url: REEL("SGlnaGxpZ2h0UmVlbFN1bW1hcnk1YmFmOTZjMjlhOWMwYjBlMzBiYWQ0OGY%3D") }
];

const PHOTOS = [];
