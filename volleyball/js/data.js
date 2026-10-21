/* =====================================================================
   DANVERS FALCONS VOLLEYBALL — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) shows up on the site
   as "TBD" so it is obvious what still needs to come from the team.
   ===================================================================== */

const HUDL_TEAM = "https://fan.hudl.com/usa/ma/danvers/organization/17204/danvers-high-school/team/752824/girls-varsity-volleyball";
const MP = "https://www.maxpreps.com/ma/volleyball/match/";
const HOME = "DHS Field House, Danvers";

const TEAM = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  sport: "Volleyball",
  season: 2026,
  location: "Danvers, MA",
  conference: "Northeastern Conference",
  division: "MIAA Division 3",
  headCoach: "Sarah Griffin",
  coachNote: "1st season",
  assistants: ["Savannah Cortez (JV)", "Samantha Tenney (JV2)"],
  stadium: "DHS Field House",
  /* MIAA power ranking (published every Tuesday and Friday in season) —
     update rank, of and asOf from miaa.net/power-rankings (Volleyball · Fall · Division 3) */
  ranking: { rank: 20, of: 68, asOf: "Oct. 20", url: "https://www.miaa.net/power-rankings" },
  address: "60 Cabot Road, Danvers, MA 01923",
  links: {
    hudl: HUDL_TEAM,
    hudlVideo: HUDL_TEAM + "/video",
    athletics: "https://www.danversfalconsathletics.com/",
    maxpreps: "https://www.maxpreps.com/ma/danvers/danvers-falcons/volleyball/schedule/",
    maxprepsStats: "https://www.maxpreps.com/ma/danvers/danvers-falcons/volleyball/stats/",
    school: "https://danverspublicschools.org/dhs/athletics/volleyball/",
    recordBook: "https://docs.google.com/spreadsheets/d/1T5IAEUabydSg9TbqgNsedSzoUtJyk6RzH5mvsHLk88U/edit#gid=1756060361"
  }
};

/* ---------------------------------------------------------------------
   SCHEDULE
   result:   "W" | "L" | null (null = not played yet)
   us / them: SETS won by each team (3–1 means Danvers won in four)
   sets:     the score of every set, Danvers first: [[25, 18], [25, 10], ...]
   home: true | false
   league:   true for matches that count in the Northeastern Conference
   scrimmage: true = preseason (listed, but left out of the record)
   cancelled: true = called off (kept on the schedule, left out of the record)
   box:      one line per Danvers player who got in, from the MaxPreps box score:
             "Player Name": [sets played, kills, aces, blocks, digs, assists,
                             attack attempts, attack errors, serve receptions]
             Hitting % is (kills − errors) ÷ attempts, for players and the team.
   standouts: extra players to call out (optional)

   Player totals, the season stat sheet and match logs on the Stats page
   are added up from the box lines, so a result is typed in once. Player names here must match
   the names in PLAYERS below.
   --------------------------------------------------------------------- */
const SCHEDULE = [
  { id: 101, date: "2026-08-29T12:00", opponent: "Stoneham", mascot: "Spartans", home: true, league: false, site: HOME,
    scrimmage: true, result: null, notes: [] },
  { id: 102, date: "2026-09-02T16:30", opponent: "Wakefield & 2 others", home: true, league: false, site: HOME,
    scrimmage: true, result: null, notes: ["Preseason play day hosted by Danvers"] },
  { id: 103, date: "2026-09-04T17:00", opponent: "Hamilton-Wenham", mascot: "Generals", home: false, league: false, site: "Hamilton-Wenham Regional HS",
    scrimmage: true, result: null, notes: [] },

  { id: 1, date: "2026-09-07T12:30", opponent: "Barnstable", mascot: "Red Hawks", home: false, league: false, site: "Barnstable High School, Hyannis",
    result: "L", us: 0, them: 3,
    sets: [[20, 25], [18, 25], [8, 25]],
    summary: "The Sarah Griffin era opened with a Labor Day trip to Cape Cod. Gabrielle Lindeman had eight kills and Hadley Brown 12 digs, but Barnstable took it in three.",
    box: {
      "Gabrielle Lindeman": [3, 8, 2, 0, 4, 0, 21, 2, 12],
      "Sienna Lynch":       [3, 3, 0, 2, 0, 0, 8, 1, 0],
      "Lauren Garofalo":    [3, 2, 2, 0, 6, 1, 18, 3, 15],
      "Kendall Murphy":     [3, 2, 1, 1, 2, 1, 8, 1, 2],
      "Brooke Bernard":     [3, 2, 0, 1, 1, 0, 9, 2, 1],
      "Gracie Monteiro":    [3, 1, 0, 1, 0, 2, 9, 3, 0],
      "Hadley Brown":       [3, 0, 2, 0, 12, 0, 0, 0, 27],
      "Lila Osborne":       [3, 0, 0, 0, 8, 5, 0, 0, 0],
      "Hannah Tersolo":     [3, 0, 0, 0, 4, 8, 0, 0, 0],
      "Hannah Laskin":      [2, 0, 0, 0, 2, 0, 0, 0, 1],
      "Emma Coffin":        [1, 0, 0, 0, 0, 0, 0, 0, 2]
    },
    notes: ["Season opener and Sarah Griffin's first match as head coach"],
    sources: [
      { label: "MaxPreps box score", url: MP + "barnstable-hyannis-vs-danvers/9-7-2026/?c=fa299626-1812-472e-871b-a1cf2d75c92c" },
      { label: "Full-match replay on Hudl", url: HUDL_TEAM + "/video" }
    ] },

  { id: 2, date: "2026-09-09T17:15", opponent: "Triton", mascot: "Vikings", home: false, league: false, site: "Triton Regional HS, Byfield",
    result: "W", us: 3, them: 0,
    sets: [[25, 18], [25, 10], [25, 21]],
    summary: "Danvers served its way to Sarah Griffin's first win with 19 aces, six from Lauren Garofalo and five from Hadley Brown. Gabrielle Lindeman had seven kills and 12 digs, and setters Hannah Tersolo and Lila Osborne each handed out 11 assists.",
    box: {
      "Gabrielle Lindeman": [3, 7, 2, 0, 12, 0, 22, 3, 7],
      "Sienna Lynch":       [3, 5, 0, 2, 0, 0, 10, 0, 0],
      "Brooke Bernard":     [3, 3, 3, 2, 2, 0, 12, 4, 0],
      "Gracie Monteiro":    [3, 3, 0, 0, 2, 0, 7, 0, 0],
      "Tess Crowley":       [2, 2, 0, 0, 2, 0, 5, 1, 3],
      "Kendall Murphy":     [3, 2, 0, 1, 0, 1, 9, 2, 0],
      "Hadley Brown":       [3, 1, 5, 0, 6, 1, 3, 2, 26],
      "Hannah Tersolo":     [3, 1, 3, 0, 5, 11, 4, 0, 0],
      "Lauren Garofalo":    [3, 1, 6, 0, 4, 1, 9, 3, 5],
      "Hannah Laskin":      [2, 0, 0, 0, 1, 0, 0, 0, 1],
      "Lila Osborne":       [3, 0, 0, 0, 0, 11, 0, 0, 0],
      "Emma Coffin":        [1, 0, 0, 0, 0, 0, 1, 1, 0],
      "Isabella DeSouza":   [1, 0, 0, 0, 0, 1, 1, 0, 0]
    },
    notes: ["First win of the season", "All 13 players on the roster got into the match"],
    sources: [{ label: "MaxPreps box score", url: MP + "danvers-vs-triton-regional-byfield/9-9-2026/?c=690a2b85-553c-4017-8bbe-544be33814ce" }] },

  { id: 3, date: "2026-09-10T17:15", opponent: "Gloucester", mascot: "Fishermen", home: true, league: false, site: HOME,
    result: "W", us: 3, them: 0,
    sets: [[25, 14], [25, 17], [25, 15]],
    summary: "The home opener was a sweep. The Falcons hit .267 as a team, with seven kills from Gabrielle Lindeman, six aces from Lauren Garofalo and 14 assists from Hannah Tersolo.",
    box: {
      "Gabrielle Lindeman": [3, 7, 0, 0, 10, 0, 17, 2, 5],
      "Brooke Bernard":     [3, 5, 1, 1, 2, 0, 12, 2, 0],
      "Kendall Murphy":     [3, 4, 1, 1, 3, 2, 9, 0, 0],
      "Gracie Monteiro":    [3, 4, 0, 0, 1, 0, 6, 0, 0],
      "Hannah Tersolo":     [3, 2, 5, 0, 5, 14, 3, 0, 0],
      "Lauren Garofalo":    [3, 2, 6, 0, 4, 1, 11, 0, 8],
      "Hadley Brown":       [3, 1, 4, 0, 5, 0, 4, 1, 19],
      "Lila Osborne":       [3, 1, 0, 0, 2, 7, 1, 0, 0],
      "Sienna Lynch":       [3, 1, 0, 1, 1, 1, 6, 1, 0],
      "Tess Crowley":       [3, 0, 0, 0, 3, 0, 4, 0, 0],
      "Emma Coffin":        [1, 0, 0, 0, 0, 0, 2, 1, 2],
      "Hannah Laskin":      [1, 0, 0, 0, 0, 0, 0, 0, 1]
    },
    notes: ["Home opener", "MaxPreps counts the two Gloucester matches as league matches; the school's schedule lists both as non-league"],
    sources: [
      { label: "MaxPreps box score", url: MP + "danvers-vs-gloucester/9-10-2026/?c=dbb2c681-c9c7-483a-9298-6db1d01abb5a" },
      { label: "Match replay on NFHS Network", url: "https://www.nfhsnetwork.com/events/danvers-high-school-danvers-ma/gameeab0e6382" }
    ] },

  { id: 4, date: "2026-09-14T17:30", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Marblehead High School",
    result: "L", us: 0, them: 3,
    sets: [[17, 25], [12, 25], [12, 25]],
    summary: "Marblehead took the conference opener in three sets. Sienna Lynch led the Falcons with three kills and a block, and Hannah Tersolo had two aces and three assists.",
    box: {
      "Sienna Lynch":       [3, 3, 0, 1, 1, 0, 12, 1, 0],
      "Lauren Garofalo":    [3, 1, 1, 0, 5, 2, 12, 1, 6],
      "Tess Crowley":       [3, 1, 1, 0, 4, 0, 8, 0, 13],
      "Kendall Murphy":     [3, 1, 0, 1, 3, 1, 3, 1, 0],
      "Brooke Bernard":     [3, 1, 1, 0, 2, 0, 7, 1, 0],
      "Gabrielle Lindeman": [3, 1, 1, 0, 0, 0, 2, 1, 8],
      "Hannah Tersolo":     [3, 0, 2, 0, 3, 3, 0, 0, 0],
      "Hadley Brown":       [3, 0, 0, 0, 2, 0, 4, 1, 40],
      "Lila Osborne":       [3, 0, 0, 0, 2, 2, 0, 0, 0],
      "Gracie Monteiro":    [3, 0, 0, 0, 0, 0, 1, 0, 0]
    },
    notes: ["Conference opener", "Marblehead also won the rematch in Danvers, 3–1, on Oct. 14"],
    sources: [
      { label: "Salem News roundup, Sept. 14", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-marblehead/9-14-2026/?c=2acda208-dfb7-40cc-bea9-2716d7ee46af" }
    ] },

  { id: 5, date: "2026-09-16T17:15", opponent: "Stoneham", mascot: "Spartans", home: true, league: false, site: HOME,
    result: "W", us: 3, them: 0,
    sets: [[25, 14], [25, 5], [25, 21]],
    summary: "Gabrielle Lindeman served nine aces to go with six kills and 20 digs, and Hannah Tersolo had 17 assists and 10 digs, as the Falcons gave up just five points in the second set.",
    box: {
      "Gabrielle Lindeman": [3, 6, 9, 0, 20, 0, 13, 3, 10],
      "Lauren Garofalo":    [3, 6, 0, 0, 10, 2, 28, 2, 6],
      "Sienna Lynch":       [3, 4, 2, 1, 5, 0, 7, 0, 0],
      "Brooke Bernard":     [2, 4, 0, 0, 5, 0, 8, 0, 0],
      "Lila Osborne":       [3, 4, 1, 0, 4, 6, 8, 1, 0],
      "Emma Coffin":        [2, 2, 0, 0, 1, 0, 4, 1, 0],
      "Gracie Monteiro":    [3, 2, 0, 0, 0, 0, 11, 3, 0],
      "Hannah Tersolo":     [3, 1, 1, 0, 10, 17, 1, 0, 0],
      "Hadley Brown":       [3, 0, 1, 0, 6, 1, 2, 0, 17],
      "Hannah Laskin":      [1, 0, 0, 0, 0, 0, 0, 0, 1]
    },
    notes: ["Nine aces for Lindeman, on 20 digs"],
    sources: [
      { label: "Salem News roundup, Sept. 17", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-stoneham/9-16-2026/?c=9a84952e-6fbb-4c32-b364-0ad08b8684c3" }
    ] },

  { id: 6, date: "2026-09-17T17:15", opponent: "Gloucester", mascot: "Fishermen", home: false, league: false, site: "Gloucester HS Field House",
    result: "W", us: 3, them: 2,
    sets: [[25, 23], [18, 25], [25, 17], [22, 25], [15, 9]],
    summary: "A week after sweeping Gloucester, the Falcons needed all five sets in the rematch. Kendall Murphy had five aces, three blocks and three kills, Lauren Garofalo eight kills, and Danvers served 25 aces as a team before closing out the fifth set 15–9.",
    box: {
      "Lauren Garofalo":    [5, 8, 3, 0, 9, 0, 25, 5, 25],
      "Gracie Monteiro":    [5, 7, 0, 0, 2, 0, 13, 0, 0],
      "Gabrielle Lindeman": [5, 6, 5, 0, 14, 0, 26, 6, 24],
      "Brooke Bernard":     [5, 3, 3, 2, 9, 0, 13, 4, 0],
      "Kendall Murphy":     [5, 3, 5, 3, 5, 0, 12, 1, 1],
      "Sienna Lynch":       [5, 3, 0, 1, 3, 0, 22, 8, 0],
      "Hadley Brown":       [5, 1, 3, 0, 8, 1, 2, 0, 26],
      "Lila Osborne":       [5, 0, 1, 0, 6, 12, 3, 1, 1],
      "Hannah Tersolo":     [5, 0, 5, 0, 6, 15, 0, 0, 1]
    },
    notes: ["First five-set match of the season", "25 aces as a team"],
    sources: [
      { label: "Salem News roundup, Sept. 17", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-gloucester/9-17-2026/?c=93e0a4f3-4e4f-45ee-8989-46f72289a29b" },
      { label: "Match replay on NFHS Network", url: "https://www.nfhsnetwork.com/events/gloucester-high-school-gloucester-ma/gamb3db8b3998" }
    ] },

  { id: 7, date: "2026-09-23T17:15", opponent: "Beverly", mascot: "Panthers", home: true, league: true, site: HOME,
    result: "W", us: 3, them: 0,
    sets: [[25, 23], [25, 19], [25, 23]],
    summary: "Two 25–23 sets decided a tight rivalry match at the Field House. Gabrielle Lindeman and Lauren Garofalo each had eight kills, and setters Hannah Tersolo and Lila Osborne finished with 14 assists apiece.",
    box: {
      "Gabrielle Lindeman": [3, 8, 2, 0, 12, 0, 30, 3, 28],
      "Lauren Garofalo":    [3, 8, 1, 0, 10, 0, 29, 7, 14],
      "Brooke Bernard":     [3, 6, 0, 1, 2, 1, 20, 0, 0],
      "Gracie Monteiro":    [3, 5, 0, 0, 0, 0, 9, 2, 0],
      "Kendall Murphy":     [3, 3, 3, 1, 2, 0, 11, 1, 0],
      "Hadley Brown":       [3, 2, 5, 0, 9, 1, 6, 1, 24],
      "Lila Osborne":       [3, 0, 5, 0, 11, 14, 6, 3, 0],
      "Hannah Tersolo":     [3, 0, 2, 0, 6, 14, 1, 0, 0]
    },
    notes: ["Rivalry match", "First conference win of the season", "Beverly won the rematch in five sets on Oct. 19"],
    sources: [
      { label: "Salem News roundup, Sept. 23", url: null },
      { label: "MaxPreps box score", url: MP + "beverly-vs-danvers/9-23-2026/?c=15a06c0b-ee40-4541-972a-4bbff2df95b3" }
    ] },

  { id: 8, date: "2026-09-25T17:30", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "Peabody Veterans Memorial HS",
    result: "W", us: 3, them: 1,
    sets: [[21, 25], [25, 14], [25, 21], [25, 22]],
    summary: "Danvers dropped the first set and then won three straight. Lauren Garofalo and Tess Crowley each put down 11 kills, Hadley Brown had 23 digs, and Hannah Tersolo and Lila Osborne combined for 33 assists.",
    box: {
      "Lauren Garofalo": [4, 11, 5, 1, 15, 1, 47, 9, 16],
      "Tess Crowley":    [4, 11, 0, 0, 14, 0, 35, 4, 20],
      "Brooke Bernard":  [4, 8, 0, 2, 3, 0, 24, 3, 0],
      "Kendall Murphy":  [4, 4, 1, 2, 5, 1, 15, 1, 0],
      "Gracie Monteiro": [4, 2, 0, 0, 2, 0, 12, 6, 1],
      "Hadley Brown":    [4, 1, 3, 0, 23, 2, 10, 4, 36],
      "Lila Osborne":    [4, 0, 3, 2, 11, 15, 13, 4, 0],
      "Hannah Tersolo":  [4, 0, 1, 0, 9, 18, 3, 0, 0]
    },
    notes: ["Gabrielle Lindeman does not appear in the box score for this match"],
    sources: [
      { label: "MaxPreps box score", url: MP + "danvers-vs-peabody-veterans-memorial/9-25-2026/?c=c2fb8032-37cb-47cb-899a-c0701c7e0b3c" },
      { label: "Full-match replay on Hudl", url: HUDL_TEAM + "/video" }
    ] },

  { id: 9, date: "2026-09-28T17:30", opponent: "Saugus", mascot: "Sachems", home: false, league: true, site: "Saugus Middle High School",
    result: "W", us: 3, them: 0,
    sets: [[25, 21], [25, 11], [25, 23]],
    summary: "Gabrielle Lindeman put down 12 kills, Lauren Garofalo added eight with 11 digs, and Hannah Tersolo had 17 assists in a sweep, the Falcons' fifth win in a row.",
    box: {
      "Gabrielle Lindeman": [3, 12, 3, 0, 8, 1, 24, 1, 17],
      "Lauren Garofalo":    [3, 8, 3, 0, 11, 2, 17, 5, 7],
      "Brooke Bernard":     [3, 7, 0, 1, 2, 0, 22, 5, 0],
      "Kendall Murphy":     [3, 2, 2, 0, 1, 0, 6, 1, 0],
      "Lila Osborne":       [3, 1, 2, 0, 1, 6, 7, 1, 0],
      "Hadley Brown":       [3, 0, 3, 0, 10, 1, 1, 1, 22],
      "Hannah Tersolo":     [3, 0, 3, 0, 7, 17, 0, 0, 0],
      "Gracie Monteiro":    [3, 0, 0, 0, 0, 0, 4, 2, 0],
      "Emma Coffin":        [1, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    notes: [],
    sources: [{ label: "MaxPreps box score", url: MP + "danvers-vs-saugus/9-28-2026/?c=87ba35df-b08f-4076-9ccf-04f7f1f711f2" }] },

  { id: 10, date: "2026-09-30T17:30", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true, site: "Masconomet Regional HS, Boxford",
    result: "W", us: 3, them: 2,
    sets: [[25, 19], [25, 10], [23, 25], [14, 25], [15, 11]],
    summary: "Danvers won the first two sets, watched the Chieftains force a fifth, then steadied itself to take it 15–11. Gabrielle Lindeman had 10 kills and 25 digs, Hadley Brown 21 digs, and Brooke Bernard five blocks.",
    box: {
      "Gabrielle Lindeman": [5, 10, 5, 0, 25, 0, 32, 1, 21],
      "Lauren Garofalo":    [5, 9, 0, 1, 17, 0, 32, 3, 26],
      "Gracie Monteiro":    [5, 3, 0, 0, 2, 0, 9, 0, 0],
      "Brooke Bernard":     [5, 3, 0, 5, 1, 1, 15, 0, 0],
      "Kendall Murphy":     [5, 2, 0, 3, 2, 0, 10, 2, 0],
      "Lila Osborne":       [5, 1, 1, 1, 19, 11, 9, 1, 0],
      "Hannah Tersolo":     [5, 1, 5, 0, 14, 12, 5, 0, 0],
      "Hadley Brown":       [5, 0, 5, 0, 21, 4, 7, 4, 26],
      "Tess Crowley":       [1, 0, 0, 0, 0, 0, 1, 0, 0],
      "Emma Coffin":        [1, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    notes: ["The teams meet again in Danvers on Oct. 28"],
    sources: [
      { label: "Salem News roundup, Sept. 30", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-masconomet-regional-boxford/9-30-2026/?c=0c72f484-e18c-497d-b1e3-90a3f54bbc74" }
    ] },

  { id: 11, date: "2026-10-02T17:15", opponent: "Bishop Fenwick", mascot: "Crusaders", home: true, league: false, site: HOME,
    result: "W", us: 3, them: 0,
    sets: [[25, 13], [25, 18], [25, 10]],
    summary: "A comfortable sweep at the Field House. Lauren Garofalo had six kills and nine digs, Hannah Tersolo handed out 16 assists, and the Falcons served 15 aces.",
    box: {
      "Lauren Garofalo":    [3, 6, 2, 0, 9, 0, 21, 2, 6],
      "Gabrielle Lindeman": [3, 5, 3, 0, 8, 0, 16, 2, 13],
      "Gracie Monteiro":    [3, 3, 0, 1, 3, 0, 10, 2, 0],
      "Kendall Murphy":     [3, 3, 0, 1, 0, 0, 8, 0, 0],
      "Brooke Bernard":     [3, 2, 0, 0, 0, 0, 9, 2, 0],
      "Tess Crowley":       [3, 1, 2, 0, 3, 0, 2, 0, 0],
      "Hannah Tersolo":     [3, 0, 4, 0, 9, 16, 2, 0, 0],
      "Hadley Brown":       [3, 0, 4, 0, 7, 1, 2, 0, 19]
    },
    notes: [],
    sources: [{ label: "MaxPreps box score", url: MP + "bishop-fenwick-peabody-vs-danvers/10-2-2026/?c=3e6a69d7-b1fc-4d87-b321-e144730ecfbb" }] },

  { id: 12, date: "2026-10-07T17:45", opponent: "Winthrop", mascot: "Vikings", home: false, league: true, site: "Winthrop High School",
    result: "W", us: 3, them: 2,
    sets: [[25, 14], [23, 25], [25, 17], [23, 25], [15, 10]],
    summary: "The Falcons' third five-set win of the season was also their eighth victory in a row. Gabrielle Lindeman had 14 kills, six aces and 23 digs, Lauren Garofalo 11 kills, and Hannah Tersolo 21 assists.",
    box: {
      "Gabrielle Lindeman": [5, 14, 6, 0, 23, 1, 47, 3, 18],
      "Lauren Garofalo":    [5, 11, 2, 0, 7, 0, 38, 8, 24],
      "Brooke Bernard":     [5, 7, 1, 1, 6, 1, 24, 5, 2],
      "Kendall Murphy":     [5, 6, 2, 0, 5, 0, 26, 5, 0],
      "Gracie Monteiro":    [5, 5, 0, 0, 4, 0, 11, 4, 0],
      "Hadley Brown":       [4, 1, 3, 0, 15, 3, 3, 0, 18],
      "Hannah Tersolo":     [5, 1, 0, 0, 9, 21, 5, 0, 0],
      "Tess Crowley":       [5, 0, 0, 0, 6, 0, 6, 2, 8],
      "Emma Coffin":        [2, 0, 0, 1, 0, 0, 0, 0, 0]
    },
    notes: ["Eighth win in a row", "Third five-set win of the season"],
    sources: [
      { label: "MaxPreps box score", url: MP + "danvers-vs-winthrop/10-7-2026/?c=dcf22755-2d21-4eff-85fa-da4ecd248e0a" },
      { label: "Full-match replay on Hudl", url: HUDL_TEAM + "/video" }
    ] },

  { id: 13, date: "2026-10-09T17:30", opponent: "Stoneham", mascot: "Spartans", home: false, league: false, site: "Stoneham High School",
    result: "W", us: 3, them: 0,
    sets: [[25, 11], [25, 10], [25, 20]],
    summary: "Danvers swept Stoneham for the second time this season and hit .302, its best attacking night of the year. Gabrielle Lindeman had nine kills and 12 digs, Kendall Murphy five kills and five blocks, and Hannah Tersolo 17 assists as the Falcons served 13 aces.",
    box: {
      "Gabrielle Lindeman": [3, 9, 3, 0, 12, 0, 20, 3, 19],
      "Kendall Murphy":     [3, 5, 1, 5, 2, 0, 13, 0, 0],
      "Lauren Garofalo":    [3, 4, 4, 1, 13, 0, 15, 1, 6],
      "Gracie Monteiro":    [3, 3, 0, 0, 4, 0, 6, 0, 0],
      "Brooke Bernard":     [3, 2, 0, 1, 2, 0, 5, 1, 0],
      "Hannah Tersolo":     [3, 1, 0, 0, 13, 17, 1, 0, 0],
      "Hadley Brown":       [3, 1, 4, 0, 9, 3, 2, 1, 11],
      "Emma Coffin":        [3, 0, 0, 1, 2, 0, 1, 0, 0],
      "Tess Crowley":       [2, 0, 1, 0, 0, 0, 0, 0, 0]
    },
    notes: ["Ninth win in a row", "Season sweep of Stoneham"],
    sources: [
      { label: "MaxPreps box score", url: MP + "danvers-vs-stoneham/10-9-2026/?c=91ec865f-4aee-4be8-94c8-328c4e288385" },
      { label: "Full-match replay on Hudl", url: HUDL_TEAM + "/video" }
    ] },

  { id: 14, date: "2026-10-12T10:30", opponent: "Mystic Valley", mascot: "Eagles", home: true, league: false, site: HOME,
    result: "W", us: 3, them: 0,
    sets: [[25, 19], [25, 20], [25, 17]],
    summary: "Brooke Bernard led a Monday-morning sweep with 10 kills, three aces and two blocks. Gabrielle Lindeman served seven aces to go with 20 digs, Lauren Garofalo had 13 digs and 22 serve receptions, and Hannah Tersolo handed out 20 assists.",
    box: {
      "Brooke Bernard":     [3, 10, 3, 2, 3, 0, 26, 1, 0],
      "Lauren Garofalo":    [3, 6, 2, 0, 13, 0, 11, 0, 22],
      "Gracie Monteiro":    [3, 5, 0, 3, 1, 0, 13, 5, 1],
      "Kendall Murphy":     [3, 4, 0, 3, 0, 0, 11, 1, 0],
      "Gabrielle Lindeman": [3, 2, 7, 0, 20, 0, 20, 3, 11],
      "Tess Crowley":       [3, 2, 0, 0, 2, 0, 9, 1, 0],
      "Hadley Brown":       [3, 0, 0, 0, 11, 1, 2, 1, 21],
      "Lila Osborne":       [3, 0, 3, 0, 10, 7, 0, 0, 0],
      "Hannah Tersolo":     [3, 0, 0, 0, 9, 20, 0, 0, 0]
    },
    notes: ["10th win in a row — the longest streak of the season", "12–2 overall after the win"],
    sources: [
      { label: "Salem News roundup, Oct. 13", url: null },
      { label: "MaxPreps box score", url: MP + "danvers-vs-mystic-valley-regional-malden/10-12-2026/?c=5d640047-ec89-4671-ae4f-bad70885b787" }
    ] },

  { id: 15, date: "2026-10-14T17:15", opponent: "Marblehead", mascot: "Magicians", home: true, league: true, site: HOME,
    result: "L", us: 1, them: 3,
    sets: [[25, 19], [18, 25], [19, 25], [14, 25]],
    summary: "The Falcons took the first set 25–19, but Marblehead won the next three to complete a season sweep and end Danvers' 10-match winning streak. Gabrielle Lindeman had eight kills, 26 digs and 36 serve receptions, Hadley Brown added 25 digs and Lila Osborne 19.",
    box: {
      "Gabrielle Lindeman": [4, 8, 1, 0, 26, 0, 37, 3, 36],
      "Kendall Murphy":     [4, 4, 0, 1, 9, 0, 13, 0, 0],
      "Gracie Monteiro":    [4, 4, 0, 1, 5, 0, 11, 1, 0],
      "Brooke Bernard":     [4, 4, 0, 1, 4, 1, 17, 3, 0],
      "Lauren Garofalo":    [4, 3, 4, 0, 8, 0, 27, 7, 14],
      "Tess Crowley":       [4, 1, 0, 0, 5, 0, 7, 0, 0],
      "Hadley Brown":       [4, 0, 3, 0, 25, 1, 1, 0, 24],
      "Lila Osborne":       [4, 0, 0, 0, 19, 8, 1, 0, 0],
      "Hannah Tersolo":     [4, 0, 1, 0, 10, 12, 0, 0, 0]
    },
    notes: ["Ended a 10-match winning streak", "Marblehead also won the first meeting, 3–0, on Sept. 14"],
    sources: [{ label: "MaxPreps box score", url: MP + "danvers-vs-marblehead/10-14-2026/?c=2236cf88-1a72-4938-bd72-db57cd22d502" }] },

  { id: 16, date: "2026-10-19T17:30", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Beverly High School",
    result: "L", us: 2, them: 3,
    sets: [[29, 27], [12, 25], [13, 25], [25, 20], [7, 15]],
    summary: "Danvers came back from nine points down to win a 29–27 first set and forced a fifth after dropping the next two, but Beverly pulled away late in the deciding set to split the rivalry series. Lauren Garofalo had nine kills, three aces and 24 digs, Brooke Bernard seven kills and two blocks, and Kendall Murphy four aces.",
    box: {
      "Lauren Garofalo":    [5, 9, 3, 0, 24, 0, 32, 6, 30],
      "Brooke Bernard":     [5, 7, 1, 2, 5, 0, 18, 2, 1],
      "Tess Crowley":       [5, 5, 0, 0, 9, 0, 21, 1, 16],
      "Kendall Murphy":     [5, 3, 4, 1, 7, 0, 12, 1, 0],
      "Gabrielle Lindeman": [5, 2, 2, 0, 12, 0, 19, 4, 15],
      "Gracie Monteiro":    [5, 2, 1, 0, 9, 0, 17, 3, 0],
      "Sienna Lynch":       [5, 2, 0, 0, 5, 0, 9, 0, 0],
      "Hadley Brown":       [5, 0, 0, 0, 17, 3, 3, 1, 37],
      "Hannah Tersolo":     [5, 0, 1, 0, 15, 16, 2, 0, 0],
      "Lila Osborne":       [5, 0, 2, 0, 9, 10, 2, 1, 0],
      "Isabelle Maffei":    [2, 0, 0, 0, 2, 0, 0, 0, 2],
      "Emma Coffin":        [1, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    notes: [
      "Rivalry match — Danvers won the first meeting 3–0 on Sept. 23",
      "A Morgan's Message match: both teams wore blue ribbons for student-athlete mental health",
      "Sophomore libero Isabelle Maffei was called up from the JV",
      "First back-to-back losses of the season"
    ],
    sources: [
      { label: "Salem News game story, Oct. 20", url: null },
      { label: "MaxPreps box score", url: MP + "beverly-vs-danvers/10-19-2026/?c=397f2426-aeda-4d7a-b961-d8db165946e7" }
    ] },

  { id: 17, date: "2026-10-21T17:15", opponent: "Swampscott", mascot: "Big Blue", home: true, league: true, site: HOME, result: null, notes: [] },
  { id: 18, date: "2026-10-26T17:15", opponent: "Peabody", mascot: "Tanners", home: true, league: true, site: HOME, result: null,
    notes: ["Second meeting — Danvers won 3–1 on Sept. 25"] },
  { id: 19, date: "2026-10-28T17:15", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: HOME, result: null,
    notes: ["Second meeting — Danvers won 3–2 on Sept. 30"] },
  { id: 20, date: "2026-10-29T17:15", opponent: "Salem", mascot: "Witches", home: true, league: true, site: HOME, result: null,
    notes: ["Regular-season finale"] }
];

/* ---------------------------------------------------------------------
   ROSTER
   num:   jersey number (null = TBD)
   pos:   ["OH"] outside hitter · ["MB"] middle blocker · ["OPP"] opposite ·
          ["S"] setter · ["L"] libero · ["DS"] defensive specialist  ([] = TBD)
   grade: "Sr." | "Jr." | "So." | "Fr." | null
   totals: { sp, k, a, b, d, as, att, e, r } — official season numbers.
           Leave it out and the site adds them up from the box lines above.

   Names, numbers, grades and positions are from the team's MaxPreps
   roster; captains are from the Salem News preview (Sept. 11).
   --------------------------------------------------------------------- */
const STATS_AS_OF = "Through 16 matches (Oct. 19, 2026)";
const STATS_NOTE = "every number here is added up from the team's MaxPreps box scores, match by match, and matches the team's MaxPreps season stat sheet. Hitting percentage is (kills − attack errors) ÷ attempts. Digs reported to the Salem News are sometimes higher than the MaxPreps box score for the same match; this site uses MaxPreps throughout.";

const PLAYERS = [
  { name: "Gabrielle Lindeman", num: 3, pos: ["OH"], grade: "Sr.", captain: true },
  { name: "Lauren Garofalo", num: 1, pos: ["OH"], grade: "Jr.", captain: true },
  { name: "Kendall Murphy", num: 12, pos: ["MB"], grade: "Sr.", captain: true },
  { name: "Hadley Brown", num: 4, pos: ["L"], grade: "Sr.", captain: false },
  { name: "Hannah Tersolo", num: 7, pos: ["S"], grade: "Jr.", captain: false },
  { name: "Brooke Bernard", num: 9, pos: ["OPP", "MB"], grade: "So.", captain: false },
  { name: "Gracie Monteiro", num: 16, pos: ["OPP", "S"], grade: "Jr.", captain: false },
  { name: "Lila Osborne", num: 15, pos: ["S", "DS"], grade: "So.", captain: false },
  { name: "Tess Crowley", num: 11, pos: ["OH"], grade: "Jr.", captain: false },
  { name: "Sienna Lynch", num: 2, pos: ["MB"], grade: "Jr.", captain: false },
  { name: "Emma Coffin", num: 8, pos: ["OPP", "OH"], grade: "Sr.", captain: false },
  { name: "Hannah Laskin", num: 13, pos: ["DS"], grade: "So.", captain: false },
  { name: "Isabelle Maffei", num: 17, pos: ["L"], grade: "So.", captain: false },
  { name: "Isabella DeSouza", num: 20, pos: ["S"], grade: "Sr.", captain: false }
];

/* Position → group used by the filter buttons on the Stats page */
const POSITION_GROUPS = {
  "Outside Hitters": ["OH"],
  "Middles": ["MB"],
  "Opposites": ["OPP"],
  "Setters": ["S"],
  "Defense": ["L", "DS"]
};

/* ---------------------------------------------------------------------
   HISTORY — from the school's athletics page and the Danvers Girls
   Volleyball Record Book (the Google Sheet linked from that page).
   --------------------------------------------------------------------- */
const HISTORY_INTRO = "From 0–16 in the first season on file to a 25–1 run to the state final six years later — the seasons, coaches and players behind six straight Northeastern Conference titles.";

const BANNERS = [
  { year: 2019, label: "Division 2 State Finalists" },
  { year: 2019, label: "North Sectional Champions" },
  { year: 2020, label: "15–0 Unbeaten Season" },
  { year: 2017, label: "Division 2 North Finalists" }
];

/* Northeastern Conference title years, as listed on the school's athletics page */
const NEC_TITLES = [2015, 2016, 2017, 2018, 2019, 2020];
const HISTORY_TILE = ["NEC Players of the Year", "4", "Grace Leete 2017–18 · Lily Eldridge 2019–20"];
const HISTORY_NOTE = "Title years follow the school's athletics page. The record book lists 2015 as a shared title (co-champions) and 2016–20 as NEC North championships.";

/* [year, wins, losses, ties, coach, NEC finish, postseason, caveat]
   null record = not in the record book. Title years come from NEC_TITLES,
   so "NEC finish" only needs filling in for the other seasons. */
const SEASONS = [
  [2025, 4, 16, 0, "Thalia Urena", "5th", "Did not qualify"],
  [2024, 11, 11, 0, "John Gehan", "3rd", "Round of 32"],
  [2023, 12, 10, 0, "George LeVasseur", "3rd", "Round of 16"],
  [2022, 8, 14, 0, "George LeVasseur", "", "Round of 32"],
  [2021, 7, 15, 1, "George LeVasseur", "", "Second round"],
  [2020, 15, 0, 0, "George LeVasseur", "NEC North", "No tournament (COVID)"],
  [2019, 25, 1, 0, "George LeVasseur", "NEC North", "Division 2 state final"],
  [2018, 18, 3, 0, "George LeVasseur", "NEC North", "First round"],
  [2017, 20, 3, 0, "George LeVasseur", "NEC North", "Division 2 North final"],
  [2016, 17, 2, 0, "George LeVasseur", "NEC North", "Qualified"],
  [2015, 15, 6, 0, "George LeVasseur", "Co-champions", "Sectional semifinals"],
  [2014, 12, 7, 0, "George LeVasseur", "", "First round"],
  [2013, 0, 16, 0, "George LeVasseur", "", "Did not qualify"]
];

const MILESTONES = [
  { year: "2013", text: "The earliest season in the record book: 0–16 under coach George LeVasseur." },
  { year: "2014", text: "A 12-win turnaround and a trip to the state tournament. LeVasseur is named NEC Coach of the Year." },
  { year: "2015", text: "The first Northeastern Conference title, shared, and a run to the sectional semifinals." },
  { year: "2016", text: "17–2 and the first of five straight NEC North championships." },
  { year: "2017", text: "A 20–3 team reaches the Division 2 North final. Grace Leete is the conference MVP and sets the season digs record with 232." },
  { year: "2018", text: "18–3, a fourth straight title and a second MVP award for Grace Leete." },
  { year: "2019", text: "25–1: North sectional champions and Division 2 state finalists. Lily Eldridge hands out a record 724 assists and Carly Goodhue a record 287 kills." },
  { year: "2020", text: "A perfect 15–0 in the shortened COVID season, with no state tournament to play. Lily Eldridge is NEC Player of the Year again." },
  { year: "2023", text: "George LeVasseur's 11th and final season ends in the Round of 16." },
  { year: "2024", text: "11–11 and a tournament win under coach John Gehan." },
  { year: "2026", text: "Sarah Griffin takes over a team that went 4–16. Her Falcons win 10 matches in a row and are back in the state tournament by mid-October." }
];

const LEGENDS = [
  { name: "George LeVasseur", role: "Head coach · 2013–2023",
    bio: "Took over a team that went 0–16 in 2013 and had it in the state final six years later. His teams went 149–77–1, won six straight conference titles from 2015 to 2020, and he was named NEC Coach of the Year four times.",
    tags: ["149 wins", "6 NEC titles", "4× Coach of the Year"] },
  { name: "Lily Eldridge", role: "NEC Player of the Year 2019, 2020 · Captain 2020",
    bio: "The career leader in assists (1,558) and digs (1,200). Her 724 assists in 2019 and 49 in a single match are both program records, and she once served 13 aces in a match.",
    tags: ["1,558 assists", "1,200 digs", "2× Player of the Year"] },
  { name: "Carly Goodhue", role: "All-Conference 2018, 2019, 2020 · Captain 2020",
    bio: "The program's all-time kills leader with 474. Her 287 kills for the 2019 state finalists are the single-season record, and her 21 in one match are the single-match record.",
    tags: ["474 career kills", "287 in 2019", "3× All-Conference"] },
  { name: "Grace Leete", role: "NEC MVP 2017, 2018 · Captain 2017, 2018",
    bio: "The conference's Most Valuable Player in back-to-back seasons. Her 232 digs in 2017 are the season record, and she served 80 aces in 2018.",
    tags: ["2× NEC MVP", "232 digs in 2017"] },
  { name: "Shannon Veilleux", role: "All-Conference 2016 · Captain 2015, 2016",
    bio: "The career aces leader with 209, including a record-tying 88 in 2014, and she topped 400 assists in three straight seasons as the program rose to the top of the league.",
    tags: ["209 career aces", "3 seasons of 400+ assists"] },
  { name: "Holly Tobin", role: "All-Conference 2016",
    bio: "The career blocks leader with 143, anchoring the net for the 2015 and 2016 conference champions.",
    tags: ["143 career blocks"] }
];

/* Record book: each list is [name, number, detail] in rank order. */
const RECORDS = {
  "Single Season": {
    Kills: [["Carly Goodhue", 287, "2019"], ["Elizabeth Montanari", 215, "2017"], ["Carly Goodhue", 186, "2018"], ["Madelyn Montanari", 181, "2019"], ["Angela Saggese", 179, "2015"]],
    Aces: [["Shannon Veilleux", 88, "2014"], ["Lily Eldridge", 88, "2019"], ["Grace Leete", 80, "2018"], ["Brynn O'Neill", 74, "2015"], ["Megan Murphy", 68, "2020"]],
    Digs: [["Grace Leete", 232, "2017"], ["Erin St. Pierre", 198, "2014"], ["Erin St. Pierre", 188, "2015"], ["Tess Vontzaldes", 174, "2021"], ["Grace Leete", 170, "2018"]],
    Assists: [["Lily Eldridge", 724, "2019"], ["Kayla Robinson", 545, "2017"], ["Lily Eldridge", 476, "2018"], ["Shannon Veilleux", 440, "2016"], ["Jamie Walsh", 414, "2021"]],
    Blocks: [["Abbey Skinner", 75, "2017"], ["Madelyn Montanari", 59, "2018"], ["Shayla Saad", 59, "2019"], ["Lauren McKinnon", 55, "2014"], ["Megan Murphy", 53, "2019"]]
  },
  "Career": {
    Kills: [["Carly Goodhue", 474, ""]],
    Aces: [["Shannon Veilleux", 209, ""]],
    Digs: [["Lily Eldridge", "1,200", ""]],
    Assists: [["Lily Eldridge", "1,558", ""]],
    Blocks: [["Holly Tobin", 143, ""]],
    "Coaching Wins": [["George LeVasseur", 149, "2013–23"], ["John Gehan", 11, "2024"], ["Thalia Urena", 4, "2025"]]
  },
  "Single Match": {
    Kills: [["Carly Goodhue", 21, ""]],
    Aces: [["Lily Eldridge", 13, ""]],
    Digs: [["Erin St. Pierre", 27, ""]],
    Assists: [["Lily Eldridge", 49, ""]],
    Blocks: [["Abbey Skinner", 8, ""]]
  }
};

/* ---------------------------------------------------------------------
   MEDIA
   Hudl doesn't allow its videos to be embedded on other sites, so each
   card opens the video on Hudl. url: null falls back to the team's full
   video page.
   To add photos: drop image files in /photos and list them in PHOTOS.
   Example: { src: "photos/beverly-01.jpg", caption: "Lindeman attacks vs. Beverly" }
   --------------------------------------------------------------------- */
const VIDEOS = [
  { title: "Danvers at Stoneham", sub: "Full-Match Replay · Oct. 9", season: 2026, len: "Replay", url: null },
  { title: "Danvers at Winthrop", sub: "Full-Match Replay · Oct. 7", season: 2026, len: "Replay", url: null },
  { title: "Danvers at Peabody", sub: "Full-Match Replay · Sept. 25", season: 2026, len: "Replay", url: null },
  { title: "Danvers at Triton", sub: "Match Recap · Sept. 9", season: 2026, len: "2:02", url: null },
  { title: "Danvers at Barnstable", sub: "Full-Match Replay · Sept. 7", season: 2026, len: "Replay", url: null },
  { title: "Danvers vs. Bishop Fenwick", sub: "Highlights · Oct. 24", season: 2025, len: "1:38", url: null },
  { title: "Danvers vs. Marblehead", sub: "Highlights · Oct. 21", season: 2025, len: "1:38", url: null },
  { title: "Danvers vs. Andover", sub: "Highlights · Oct. 9", season: 2025, len: "1:38", url: null },
  { title: "Danvers vs. Bishop Fenwick", sub: "Highlights · Sept. 5", season: 2025, len: "1:38", url: null },
  { title: "Danvers vs. Peabody", sub: "Highlights · Sept. 3", season: 2025, len: "1:38", url: null },
  { title: "Danvers vs. Taconic", sub: "Tournament Highlights · Nov. 1", season: 2024, len: "1:38", url: null },
  { title: "Danvers vs. Billerica", sub: "Highlights · Oct. 25", season: 2024, len: "1:38", url: null },
  { title: "Danvers vs. Marblehead", sub: "Highlights · Oct. 22", season: 2024, len: "1:38", url: null },
  { title: "Danvers vs. Wakefield", sub: "Highlights · Oct. 21", season: 2024, len: "1:38", url: null },
  { title: "Danvers vs. Andover", sub: "Highlights · Oct. 19", season: 2024, len: "1:38", url: null },
  { title: "Danvers vs. Ipswich", sub: "Highlights · Oct. 18", season: 2024, len: "1:38", url: null },
  { title: "Danvers vs. Masconomet", sub: "Highlights · Oct. 16", season: 2024, len: "1:38", url: null },
  { title: "Danvers vs. Beverly", sub: "Highlights · Oct. 7", season: 2024, len: "1:38", url: null },
  { title: "Danvers vs. Saugus", sub: "Highlights · Sept. 6", season: 2024, len: "1:38", url: null }
];

const PHOTOS = [];
