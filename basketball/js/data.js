/* =====================================================================
   DANVERS FALCONS BASKETBALL — SITE DATA (boys and girls)
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left off
   the site until it is known.

   A GAME on a team's schedule:
     id, date ("2026-12-11T19:00", Eastern time), opponent, mascot,
     home (true/false), league (true = NEC game), site,
     scrimmage: true   not counted in the record
     result: "W" / "L" (null until it's played), us, them
     line:   { us: [12, 15, 9, 18], them: [10, 11, 14, 16] }   points by quarter
     stats:  { "Player Name": { pts: 18, reb: 7, ast: 3 }, ... }   adds up into the roster
     summary: a short recap    notes: ["bullet", ...]
     sources: [{ label, url }]    replay: a full-game video link

   A PLAYER on a roster: { name, num, pos: ["G"], grade: "Sr.", captain: true }

   PAST SEASONS list each game as
     [date, home (1/0), opponent, type, result, us, them, note]
   Sources: the school's record books and team pages, and the schedules
   and scores on High School on SI (https://www.si.com/high-school/stats/massachusetts/).
   ===================================================================== */

const SPORT = {
  key: "basketball", name: "Basketball", season: "2026–27",
  game: "game", games: "games", players: "players", start: "Tip-off",
  scoreWord: "Points", lineTitle: "Score by Quarter", periods: ["1st", "2nd", "3rd", "4th"], boxTitle: "Scoring",
  stats: [["pts", "Points", "point"], ["reb", "Rebounds", "rebound"], ["ast", "Assists", "assist"]],
  ties: false, spanYears: true
};

const SCHOOL = {
  school: "Danvers High School", name: "Danvers Falcons", location: "Danvers, MA",
  conference: "Northeastern Conference", athletics: "https://www.danversfalconsathletics.com/"
};

const TEAMS = {
  /* ================================ BOYS ================================ */
  boys: {
    label: "Boys Basketball",
    short: "Boys",
    headCoach: "Jabari Clarke",
    heroTitle: "Falcons open Dec. 11 at Marblehead",
    preview: "Danvers went 9–11 last winter under Jabari Clarke, now in his fourth season. Tryouts begin Monday, Nov. 30, and the 18-game schedule tips off Friday, Dec. 11 at Marblehead.",
    stripTile: ["State titles", 3, "2012 · 2013 · 2015"],
    scheduleNote: "Dates and times are from the schedule posted for 2026–27 and can change; the school's ArbiterLive page has the latest.",
    links: {
      school: "https://danverspublicschools.org/dhs/athletics/boys-basketball/",
      schedule: "https://www.arbiterlive.com/Teams?entityId=5538",
      recordBook: "https://docs.google.com/spreadsheets/d/1qf7e1RGZkG9hAWzIqTPi8bHVbajBI5YpY_EwnUyab4w/edit?gid=1756060361#gid=1756060361",
      watch: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma"
    },
    staff: [["Head coach", "Jabari Clarke", "Fourth season"], ["Assistant coach", "Jared McCarron"], ["JV coaches", "Ted Cottrell & Ryan Dumont"], ["Freshman coach", "Peter Spiros"]],
    about: [
      "Danvers boys basketball has won seven Northeastern Conference titles and three state championships. All three state titles came in a four-year run under coach John Walsh: Division 3 in 2012 and 2013, then Division 2 in 2015, when the Falcons went 27–0.",
      "The Falcons play their home games in the Danvers High School Field House and face Northeastern Conference rivals Beverly, Peabody, Marblehead, Masconomet, Gloucester, Salem, Saugus, Swampscott and Winthrop.",
      "Coaching staff as listed on the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted after tryouts, which begin Monday, Nov. 30.",
    schedule: [
      { id: 1, date: "2026-12-11T17:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: false, site: "Marblehead High School, Marblehead", result: null },
      { id: 2, date: "2026-12-16T18:30", opponent: "Essex Tech", mascot: "Hawks", home: false, league: false, site: "Essex Tech, Hathorne", result: null },
      { id: 3, date: "2026-12-18T19:00", opponent: "Winthrop", mascot: "Vikings", home: false, league: true, site: "Winthrop High School, Winthrop", result: null },
      { id: 4, date: "2026-12-28T16:30", opponent: "Excel Academy", home: true, league: false, site: "Danvers High School Field House, Danvers", result: null },
      { id: 5, date: "2027-01-04T19:00", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true, site: "Masconomet Regional High School, Boxford", result: null },
      { id: 6, date: "2027-01-07T19:00", opponent: "Marblehead", mascot: "Magicians", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 7, date: "2027-01-10T13:00", opponent: "Peabody", mascot: "Tanners", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 8, date: "2027-01-12T19:00", opponent: "Salem", mascot: "Witches", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 9, date: "2027-01-15T19:00", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Beverly High School, Beverly", result: null },
      { id: 10, date: "2027-01-19T19:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "Peabody Veterans Memorial High School, Peabody", result: null },
      { id: 11, date: "2027-01-22T19:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: true, site: "Gloucester High School, Gloucester", result: null },
      { id: 12, date: "2027-01-29T19:00", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 13, date: "2027-02-02T19:00", opponent: "Saugus", mascot: "Sachems", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 14, date: "2027-02-04T19:00", opponent: "Bishop Fenwick", mascot: "Crusaders", home: true, league: false, site: "Danvers High School Field House, Danvers", result: null },
      { id: 15, date: "2027-02-05T19:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Marblehead High School, Marblehead", result: null },
      { id: 16, date: "2027-02-08T19:00", opponent: "Beverly", mascot: "Panthers", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 17, date: "2027-02-11T19:00", opponent: "Swampscott", mascot: "Big Blue", home: false, league: true, site: "Swampscott High School, Swampscott", result: null },
      {
        id: 19,
        date: "2027-02-14T10:00",
        name: "Home game: opponent to be announced",
        opponent: "Opponent to be announced",
        home: true,
        league: false,
        site: "Danvers High School Field House, Danvers",
        result: null,
        notes: ["On the Falcons athletics site for Sunday, Feb. 14 at 10:00 AM, with no opponent listed yet"]
      },
      { id: 18, date: "2027-02-16T19:00", opponent: "Wakefield", mascot: "Warriors", home: true, league: false, site: "Danvers High School Field House, Danvers", result: null }
    ],
    players: [],
    past: [
      {
        season: "2025–26",
        record: "9–11",
        coach: "Jabari Clarke",
        finish: "4th in Lynch",
        captains: "Connor DiTomaso, Luca Tirella, Kyle Sillars",
        photo: { src: "../images/teams/boys-basketball.jpg", caption: "The 2025–26 Danvers boys basketball team. Photo from the Danvers High School athletics page." },
        allStars: "Kyle Sillars, Luca Tirella",
        games: [
          ["2025-12-12", 0, "Marblehead", "NEC", "L", 51, 58, ""],
          ["2025-12-13", 1, "Bishop Fenwick", "Non-league", "L", 51, 63, ""],
          ["2025-12-17", 0, "Wakefield", "Non-league", "W", 63, 49, ""],
          ["2025-12-19", 1, "Winthrop", "NEC", "W", 60, 56, ""],
          ["2025-12-29", 0, "Gloucester", "NEC", "W", 72, 70, ""],
          ["2025-12-30", 1, "Salem Academy", "Non-league", "W", 58, 30, ""],
          ["2026-01-05", 1, "Beverly", "NEC", "L", 36, 80, ""],
          ["2026-01-08", 0, "Masconomet", "NEC", "L", 43, 81, ""],
          ["2026-01-13", 0, "Salem", "NEC", "L", 48, 76, ""],
          ["2026-01-16", 1, "Peabody", "NEC", "W", 66, 62, ""],
          ["2026-01-20", 1, "Marblehead", "NEC", "L", 56, 71, ""],
          ["2026-01-23", 1, "Gloucester", "NEC", "W", 70, 47, ""],
          ["2026-01-26", 1, "Bishop Fenwick", "Non-league", null, null, null, "Cancelled"],
          ["2026-01-30", 0, "Beverly", "NEC", "L", 52, 89, ""],
          ["2026-02-02", 0, "Saugus", "NEC", "L", 57, 60, ""],
          ["2026-02-04", 1, "Essex Tech", "Non-league", "W", 65, 52, ""],
          ["2026-02-06", 1, "Masconomet", "NEC", "L", 43, 87, ""],
          ["2026-02-09", 0, "Peabody", "NEC", "L", 44, 62, ""],
          ["2026-02-12", 1, "Swampscott", "NEC", "L", 60, 76, ""],
          ["2026-02-15", 1, "Salem Academy", "Non-league", "W", 57, 48, ""],
          ["2026-02-17", 1, "Bishop Fenwick", "Non-league", "W", 64, 63, ""]
        ]
      },
      {
        season: "2024–25",
        record: "7–13",
        coach: "Jabari Clarke",
        finish: "5th in Lynch",
        captains: "Kevin Ahearn, Zach Calabro, Connor DiTomaso",
        games: [
          ["2024-12-13", 1, "Marblehead", "NEC", "L", 47, 54, ""],
          ["2024-12-14", 0, "Salem Academy", "Non-league", "W", 82, 24, ""],
          ["2024-12-18", 0, "Bishop Fenwick", "Non-league", "W", 78, 61, ""],
          ["2024-12-20", 0, "Winthrop", "NEC", "W", 58, 51, ""],
          ["2024-12-23", 0, "Somerville", "Non-league", "W", 60, 48, ""],
          ["2024-12-27", 1, "Salem Academy", "Non-league", "W", 52, 40, ""],
          ["2024-12-28", 0, "Gloucester", "Tournament", "L", 53, 67, ""],
          ["2025-01-03", 0, "Beverly", "NEC", "L", 65, 79, ""],
          ["2025-01-06", 1, "Masconomet", "NEC", "L", 63, 85, ""],
          ["2025-01-09", 1, "Salem", "NEC", "L", 54, 65, ""],
          ["2025-01-14", 0, "Peabody", "NEC", "L", 47, 59, ""],
          ["2025-01-17", 0, "Marblehead", "NEC", "L", 57, 68, ""],
          ["2025-01-21", 0, "Gloucester", "NEC", "L", 47, 53, ""],
          ["2025-01-28", 1, "Beverly", "NEC", "L", 63, 90, ""],
          ["2025-01-30", 1, "Saugus", "NEC", "W", 86, 59, ""],
          ["2025-02-04", 0, "Masconomet", "NEC", "L", 46, 92, ""],
          ["2025-02-07", 1, "Peabody", "NEC", "L", 59, 71, ""],
          ["2025-02-11", 0, "Swampscott", "NEC", "L", 55, 68, ""],
          ["2025-02-14", 1, "Bishop Fenwick", "Non-league", "L", 55, 58, ""],
          ["2025-02-16", 1, "Salem Academy", "Non-league", "W", 64, 45, ""]
        ]
      },
      {
        season: "2023–24",
        record: "8–12",
        coach: "Jabari Clarke",
        finish: "3rd in Dunn",
        captains: "Logan Meteivier, Luke Meteivier, and Michal Kazprzak",
        note: "The record book lists this season as 8–12; one game isn't in the results on file.",
        games: [
          ["2023-12-08", 0, "Salem Academy", "Non-league", "L", 53, 54, ""],
          ["2023-12-08", 0, "Salem", "NEC", "L", 53, 54, ""],
          ["2023-12-09", 0, "Winthrop", "NEC", "W", 62, 39, ""],
          ["2023-12-12", 0, "Gloucester", "NEC", "W", 57, 46, ""],
          ["2023-12-28", 0, "Gloucester", "NEC", "L", 42, 45, ""],
          ["2024-01-02", 0, "Beverly", "NEC", "L", 47, 76, ""],
          ["2024-01-05", 1, "Swampscott", "NEC", "L", 47, 67, ""],
          ["2024-01-08", 0, "Winthrop", "NEC", "L", 67, 68, ""],
          ["2024-01-11", 1, "Salem", "NEC", "L", 55, 67, ""],
          ["2024-01-16", 1, "Saugus", "NEC", "W", 57, 50, ""],
          ["2024-01-19", 1, "Gloucester", "NEC", "W", 55, 42, ""],
          ["2024-01-22", 0, "Peabody", "NEC", "L", 44, 71, ""],
          ["2024-01-24", 1, "Bishop Fenwick", "Non-league", "L", 52, 69, ""],
          ["2024-01-30", 0, "Swampscott", "NEC", "L", 56, 70, ""],
          ["2024-02-02", 1, "Marblehead", "NEC", "L", 52, 72, ""],
          ["2024-02-06", 1, "Winthrop", "NEC", "W", 49, 42, ""],
          ["2024-02-08", 0, "Saugus", "NEC", "W", 75, 62, ""],
          ["2024-02-12", 0, "Bishop Fenwick", "Non-league", "L", 74, 79, ""],
          ["2024-02-14", 0, "Masconomet", "NEC", "L", 58, 71, ""],
          ["2024-02-18", 1, "Essex Tech", "Non-league", "W", 68, 48, ""]
        ]
      }
    ],
    historyIntro: "Seven conference titles, three state championships and a 27–0 season. The seasons and players behind Danvers boys basketball.",
    banners: [{ year: 2015, label: "Division 2 State Champions" }, { year: 2013, label: "Division 3 State Champions" }, { year: 2012, label: "Division 3 State Champions" }],
    necTitles: [1964, 1975, 2012, 2013, 2014, 2015, 2016],
    historyNote: "Title years follow the school's team page. The record book also marks 1970 and 2011 as NEC championship seasons and has no entry for 1964.",
    historyTile: ["Perfect season", "27–0", "2015 · Division 2 state champions"],
    seasons: [
      [2026, 9, 11, 0, "Jabari Clarke", "4th in Lynch", ""],
      [2025, 7, 13, 0, "Jabari Clarke", "5th in Lynch", ""],
      [2024, 8, 12, 0, "Jabari Clarke", "3rd in Dunn", ""],
      [2023, 5, 15, 0, "Chris Timson", "", ""],
      [2022, 2, 18, 0, "Chris Timson", "5th", ""],
      [2021, 5, 10, 0, "Chris Timson", "", ""],
      [2020, 5, 15, 0, "Chris Timson", "", ""],
      [2019, 10, 11, 0, "Chris Timson", "3rd", "1st Round Loss to Gloucester"],
      [2018, 2, 18, 0, "Chris Timson", "", ""],
      [2017, 3, 17, 0, "Jahron Giddings", "", ""],
      [2016, 16, 4, 0, "John Walsh", "NEC Champs", "Loss Sectional Quarters vs. Brighton"],
      [2015, 27, 0, 0, "John Walsh", "NEC Champs", "MIAA DII State Champions"],
      [2014, 19, 3, 0, "John Walsh", "NEC Champs", "2nd Round Loss"],
      [2013, 21, 2, 0, "John Walsh", "NEC Champs", "MIAA DIII State Champions"],
      [2012, 21, 4, 0, "John Walsh", "NEC Champs", "MIAA DIII State Champions"],
      [2011, 11, 9, 0, "John Walsh", "NEC Champs", "2nd Round Loss"],
      [2010, 9, 10, 0, "Peter Sklars", "", ""],
      [2009, 2, 18, 0, "Peter Sklars", "", ""],
      [2008, 2, 18, 0, "Mark Malley", "", ""],
      [2007, 3, 17, 0, "Mark Malley", "", ""],
      [2006, 1, 19, 0, "Mark Malley", "", ""],
      [2005, 13, 8, 0, "Mark Malley", "", "1st Round loss vs. Masco"],
      [2004, 11, 11, 0, "Mark Malley", "12th", "2nd Round Loss vs. Lynn Classical"],
      [2003, 12, 8, 0, "Mark Malley", "", "1st Round loss"],
      [2002, 6, 14, 0, "Mark Malley", "", ""],
      [2001, null, null, null, "Mark Malley", "", ""],
      [2000, 1, 19, 0, "John Valve", "", ""],
      [1999, 1, 19, 0, "Mark Malley", "", ""],
      [1998, 13, 9, 0, "Pat Veilleux", "", "2nd Round Loss"],
      [1997, 4, 16, 0, "Pat Veilleux", "", ""],
      [1996, 7, 13, 0, "Pat Veilleux", "", ""],
      [1995, null, null, null, "Pat Veilleux", "", ""],
      [1994, null, null, null, "Pat Veilleux", "", ""],
      [1993, null, null, null, "Pat Veilleux", "", ""],
      [1992, null, null, null, "Pat Veilleux", "", ""],
      [1991, null, null, null, "Pat Veilleux", "", ""],
      [1990, null, null, null, "Pat Veilleux", "", ""],
      [1983, 14, 6, 0, "Rich Butterworth", "2nd", ""],
      [1978, 5, 13, 0, "John McGrath", "", ""],
      [1975, 16, 6, 0, "John McGrath", "NEC Champs", ""],
      [1972, 8, 10, 0, "John McGrath", "", ""],
      [1970, 14, 2, 0, "John McGrath", "NEC Champs", "1st round loss"],
      [1967, 12, 8, 0, "John McGrath", "", ""],
      [1966, 14, 6, 0, "John McGrath", "", ""]
    ],
    honors: [
      { year: 2026, captains: "Connor DiTomaso, Luca Tirella, Kyle Sillars", allLeague: "", note: "" },
      { year: 2025, captains: "Kevin Ahearn, Zach Calabro, Connor DiTomaso", allLeague: "", note: "" },
      { year: 2024, captains: "Logan Meteivier, Luke Meteivier, and Michal Kazprzak", allLeague: "", note: "" },
      { year: 2019, captains: "", allLeague: "Justin DiTomaso", note: "Chris Timson: Salem News Coach of the Year" },
      { year: 2016, captains: "Devonn Allen, Tre Crittendon, Rashad Francois", allLeague: "Devonn Allen, Rashad Francois", note: "" },
      { year: 2015, captains: "Devonn Allen, Vinny Clifford, Devan Harris, Peter Merry", allLeague: "Peter Merry NEC Player of the Year, Vinny Clifford, Devan Harris", note: "John Walsh: Boston Globe Coach of the Year" },
      { year: 2014, captains: "Kieran Beck, Mark McCarthy, Peter Merry, Vinny Clifford", allLeague: "", note: "" },
      { year: 2013, captains: "Eric Martin, Nick McKenna, Nick Bates, Dan Connors", allLeague: "", note: "" },
      { year: 2012, captains: "George Merry, Jon Amico, Eric Martin", allLeague: "", note: "" },
      { year: 2011, captains: "Cormick Powers, Sean Mahegan", allLeague: "", note: "" },
      { year: 2010, captains: "Mike Warren, Greg Ladd", allLeague: "Dan Skinner", note: "" },
      { year: 2009, captains: "Mike Warren, Kevin Coughlin", allLeague: "", note: "" },
      { year: 2008, captains: "Benjamin Wood, Christopher Perry", allLeague: "", note: "" },
      { year: 2007, captains: "Peter Spiros, Timothy Calabrese, Jordan Burke, Andrew Green", allLeague: "", note: "" },
      { year: 2006, captains: "Alex Perry, Mat Procopio", allLeague: "", note: "" },
      { year: 2005, captains: "J.B Macdonald, Dan Powers", allLeague: "Dan Powers, J.B Macdonald", note: "" },
      { year: 2003, captains: "Chris Small, Dan Aspesi", allLeague: "", note: "" },
      { year: 2002, captains: "Mike Carroll, Jon Peterson", allLeague: "", note: "" },
      { year: 2001, captains: "Jon Peterson, Adam Crawford, Mark Herzog", allLeague: "", note: "" },
      { year: 2000, captains: "Dan Kilbride", allLeague: "", note: "" },
      { year: 1999, captains: "Larry Conroy, Howard Winokur, Ryan Holt", allLeague: "", note: "" },
      { year: 1998, captains: "", allLeague: "Craig Dorion, Nick Williamson", note: "Pat Veilleux: NEC Coach of the Year" },
      { year: 1997, captains: "Dan Conroy", allLeague: "", note: "" },
      { year: 1996, captains: "Steve Crowe, Brendan Maloy, Ben Gamer", allLeague: "Steve Crowe", note: "" },
      { year: 1994, captains: "Mark Conroy", allLeague: "Mark Conroy", note: "" },
      { year: 1978, captains: "Dave Powers", allLeague: "", note: "" },
      { year: 1975, captains: "ED Gieras", allLeague: "", note: "" },
      { year: 1970, captains: "Dennis Goode, Dana White, Eddie Weiner", allLeague: "", note: "" }
    ],
    legendsNote: "From the program's record book.",
    legends: [
      {
        name: "Ed Gieras",
        role: "Class of 1975 · 1,024 points",
        bio: "The only 1,000-point scorer in program history. Gieras captained the 1975 team that went 16–6 and won the Northeastern Conference, and his 45-point game is still the school record.",
        tags: ["1,024 career points", "45 in a game", "1975 NEC champions"]
      },
      {
        name: "Peter Merry",
        role: "Class of 2015 · NEC Player of the Year",
        bio: "A two-year captain, Merry was the Northeastern Conference Player of the Year in 2015, when Danvers finished 27–0 and won the Division 2 state title.",
        tags: ["NEC Player of the Year", "Captain 2014, 2015", "27–0 state champions"]
      },
      {
        name: "John Walsh",
        role: "Head coach · 2011–2016",
        bio: "In six seasons Walsh's teams went 115–22, won six straight conference titles in the record book and brought home three state championships. He was the Boston Globe's Coach of the Year in 2015.",
        tags: ["3 state titles", "115–22", "Globe Coach of the Year"]
      }
    ],
    records: { Career: { Points: [["Ed Gieras", "1,024", "Class of 1975"]] }, "Single Game": { Points: [["Ed Gieras", "45", ""]] } },
    milestones: [
      { year: "1964", text: "First Northeastern Conference championship." },
      { year: "1975", text: "Ed Gieras, the program's only 1,000-point scorer, captains the Falcons to a 16–6 season and the NEC title." },
      { year: "2012", text: "First state championship: Danvers goes 21–4 and wins the MIAA Division 3 title." },
      { year: "2013", text: "Back-to-back. A 21–2 season ends with a second straight Division 3 state championship." },
      { year: "2015", text: "A perfect 27–0 and the Division 2 state championship. Peter Merry is the NEC Player of the Year and John Walsh the Globe's Coach of the Year." },
      { year: "2016", text: "A 16–4 season brings a fifth straight NEC championship on the school's list." },
      { year: "2023", text: "Jabari Clarke takes over as head coach for the 2023–24 season." }
    ],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every level's games, times and changes on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "Watch", title: "Home games on NFHS Network", text: "Danvers High School streams home games on the NFHS Network.", url: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma", go: "NFHS Network" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/boys-basketball/", go: "danverspublicschools.org" },
      {
        kind: "History",
        title: "Record book",
        text: "Season records, captains and all-league picks kept by the athletic department.",
        url: "https://docs.google.com/spreadsheets/d/1qf7e1RGZkG9hAWzIqTPi8bHVbajBI5YpY_EwnUyab4w/edit?gid=1756060361#gid=1756060361",
        go: "Record book"
      }
    ],
    news: [],
    photos: []
  },

  /* ================================ GIRLS ================================ */
  girls: {
    label: "Girls Basketball",
    short: "Girls",
    headCoach: "David Chisholm",
    heroTitle: "After a record 19–2, Falcons open Dec. 11 at Peabody",
    preview: "Danvers won the Northeastern Conference and set a school record at 19–2 last winter. Tryouts begin Monday, Nov. 30, with a scrimmage against Somerville on Dec. 7 and the opener Friday, Dec. 11 at Peabody.",
    stripTile: ["NEC titles", 5, "Latest in 2026"],
    scheduleNote: "Dates and times are from the schedule posted for 2026–27 and can change; the school's ArbiterLive page has the latest.",
    links: {
      school: "https://danverspublicschools.org/dhs/athletics/94341-2/",
      schedule: "https://www.arbiterlive.com/Teams?entityId=5538",
      recordBook: "https://docs.google.com/spreadsheets/d/1QoAjMBsgvHdUGnr3C75JJzgyqOdt6L9BBpcLU_QlNJs/edit?gid=1756060361#gid=1756060361",
      watch: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma"
    },
    staff: [["Head coach", "David Chisholm", "Fifth season · 2026 NEC Coach of the Year"], ["Assistant coaches", "Dave Anderson & Taylor Cross"], ["JV coach", "Scott Shairs"]],
    about: [
      "Danvers girls basketball is coming off the best season in program history: 19–2, a Northeastern Conference championship and the conference's Player of the Year in Angie Djoko, who finished her career with 1,001 points.",
      "The program has won five conference titles in the record book and has four 1,000-point scorers. One of the most anticipated games each winter is the rivalry game with Beverly, when family and friends pack the field house.",
      "Coaching staff as listed on the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted after tryouts, which begin Monday, Nov. 30.",
    schedule: [
      { id: 1, date: "2026-12-07T18:00", opponent: "Somerville", mascot: "Highlanders", home: true, league: false, scrimmage: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 2, date: "2026-12-11T19:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "Peabody Veterans Memorial High School, Peabody", result: null },
      { id: 3, date: "2026-12-14T18:00", opponent: "Melrose", mascot: "Red Hawks", home: false, league: false, site: "Melrose High School, Melrose", result: null },
      { id: 4, date: "2026-12-18T18:30", opponent: "Winthrop", mascot: "Vikings", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 5, date: "2026-12-28T17:00", opponent: "Hamilton-Wenham", mascot: "Generals", home: true, league: false, site: "Danvers High School Field House, Danvers", result: null },
      {
        id: 6,
        date: "2027-01-04T15:30",
        opponent: "Masconomet",
        mascot: "Chieftains",
        home: true,
        league: true,
        site: "Danvers High School Field House, Danvers",
        result: null,
        notes: ["The Falcons athletics site lists a 3:30 PM start; another listing has 6:30 PM. Check the school's schedule before you go."]
      },
      { id: 7, date: "2027-01-07T18:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Marblehead High School, Marblehead", result: null },
      { id: 8, date: "2027-01-11T18:30", opponent: "Wakefield", mascot: "Warriors", home: false, league: false, site: "Wakefield Memorial High School, Wakefield", result: null },
      { id: 9, date: "2027-01-13T18:30", opponent: "Melrose", mascot: "Red Hawks", home: true, league: false, site: "Danvers High School Field House, Danvers", result: null },
      { id: 10, date: "2027-01-19T18:30", opponent: "Peabody", mascot: "Tanners", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      {
        id: 11,
        date: "2027-01-22T18:30",
        opponent: "Gloucester",
        mascot: "Fishermen",
        home: true,
        league: true,
        site: "Danvers High School Field House, Danvers",
        result: null,
        notes: ["The Falcons athletics site lists a 6:30 PM start; another listing has 7:00 PM. Check the school's schedule before you go."]
      },
      { id: 12, date: "2027-01-27T18:30", opponent: "Manchester Essex", mascot: "Hornets", home: false, league: false, site: "Manchester Essex Regional High School, Manchester", result: null },
      { id: 13, date: "2027-01-29T18:15", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true, site: "Masconomet Regional High School, Boxford", result: null },
      { id: 14, date: "2027-02-02T18:00", opponent: "Saugus", mascot: "Sachems", home: false, league: true, site: "Saugus High School, Saugus", result: null },
      { id: 15, date: "2027-02-04T17:30", opponent: "Manchester Essex", mascot: "Hornets", home: true, league: false, site: "Danvers High School Field House, Danvers", result: null },
      { id: 16, date: "2027-02-05T18:30", opponent: "Marblehead", mascot: "Magicians", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 17, date: "2027-02-08T18:00", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Beverly High School, Beverly", result: null },
      { id: 18, date: "2027-02-11T18:30", opponent: "Swampscott", mascot: "Big Blue", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 19, date: "2027-02-14T16:00", opponent: "Beverly", mascot: "Panthers", home: true, league: true, site: "Danvers High School Field House, Danvers", result: null },
      { id: 20, date: "2027-02-16T17:30", opponent: "Greater Lawrence Tech", mascot: "Reggies", home: true, league: false, site: "Danvers High School Field House, Danvers", result: null }
    ],
    players: [],
    past: [
      {
        season: "2025–26",
        record: "19–2",
        coach: "Dave Chisholm",
        finish: "NEC Champions",
        post: "Lost in the Round of 32 at Mansfield, 51–48",
        captains: "Angie Djoko, Lila Flynn, Kayda Brown",
        photo: { src: "../images/teams/girls-basketball.jpg", caption: "The 2025–26 Danvers girls basketball team. Photo from the Danvers High School athletics page." },
        allStars: "Kayda Brown, Annabel Boyd, Sienna Lynch",
        awards: "Angie Djoko, NEC Player of the Year · Dave Chisholm, NEC Coach of the Year · 19–2 is the school record",
        games: [
          ["2025-12-12", 1, "Marblehead", "NEC", "W", 54, 25, ""],
          ["2025-12-18", 0, "Manchester Essex", "Non-league", "W", 61, 44, ""],
          ["2025-12-19", 0, "Winthrop", "NEC", "W", 65, 23, ""],
          ["2025-12-29", 1, "Hamilton-Wenham", "Non-league", "L", 21, 26, ""],
          ["2025-12-30", 1, "Essex Tech", "Non-league", "W", 38, 33, ""],
          ["2026-01-05", 0, "Beverly", "NEC", "W", 59, 46, ""],
          ["2026-01-08", 1, "Masconomet", "NEC", "W", 58, 29, ""],
          ["2026-01-13", 1, "Salem", "NEC", "W", 59, 10, ""],
          ["2026-01-16", 0, "Peabody", "NEC", "W", 57, 52, ""],
          ["2026-01-20", 0, "Marblehead", "NEC", "W", 47, 29, ""],
          ["2026-01-21", 1, "Manchester Essex", "Non-league", "W", 54, 45, ""],
          ["2026-01-23", 0, "Gloucester", "NEC", "W", 52, 38, ""],
          ["2026-01-28", 1, "Revere", "Non-league", "W", 46, 25, ""],
          ["2026-01-30", 1, "Revere", "Non-league", null, null, null, "Cancelled"],
          ["2026-02-03", 1, "Saugus", "NEC", "W", 47, 19, ""],
          ["2026-02-04", 0, "Hamilton-Wenham", "Non-league", "W", 38, 35, ""],
          ["2026-02-06", 0, "Masconomet", "NEC", "W", 59, 19, ""],
          ["2026-02-09", 1, "Peabody", "NEC", "W", 52, 28, ""],
          ["2026-02-12", 0, "Swampscott", "NEC", "W", 37, 31, ""],
          ["2026-02-15", 1, "Beverly", "NEC", "W", 39, 36, ""],
          ["2026-02-17", 0, "Revere", "Non-league", "W", 50, 36, ""],
          ["2026-02-27", 0, "Mansfield", "MIAA tournament", "L", 48, 51, ""]
        ]
      },
      {
        season: "2024–25",
        record: "14–7",
        coach: "Dave Chisholm",
        finish: "3rd Lynch",
        post: "Lost in the preliminary round at Holliston, 53–38",
        captains: "Kayda Brown, Angie Djoko, Gianna Ferrero, Maddie Shairs",
        allLeague: "Angie Djoko",
        games: [
          ["2024-12-13", 0, "Marblehead", "NEC", "L", 23, 28, ""],
          ["2024-12-18", 0, "Ipswich", "Non-league", "W", 36, 11, ""],
          ["2024-12-20", 1, "Winthrop", "NEC", "W", 41, 40, ""],
          ["2024-12-23", 0, "Triton", "Non-league", "W", 45, 30, ""],
          ["2024-12-27", 1, "Hamilton-Wenham", "Non-league", "W", 47, 26, ""],
          ["2024-12-30", 1, "Manchester Essex", "Non-league", "W", 51, 40, ""],
          ["2025-01-03", 1, "Beverly", "NEC", null, null, null, "Cancelled"],
          ["2025-01-06", 0, "Masconomet", "NEC", "L", 24, 47, ""],
          ["2025-01-08", 0, "Hamilton-Wenham", "Non-league", "W", 39, 30, ""],
          ["2025-01-09", 0, "Salem", "NEC", "W", 60, 9, ""],
          ["2025-01-14", 1, "Peabody", "NEC", "L", 34, 39, ""],
          ["2025-01-17", 1, "Marblehead", "NEC", "L", 30, 31, ""],
          ["2025-01-21", 1, "Gloucester", "NEC", "W", 46, 40, ""],
          ["2025-01-23", 1, "Ipswich", "Non-league", "W", 52, 11, ""],
          ["2025-01-28", 0, "Beverly", "NEC", "W", 59, 31, ""],
          ["2025-01-30", 0, "Saugus", "NEC", "L", 59, 72, ""],
          ["2025-02-04", 1, "Masconomet", "NEC", "L", 39, 42, ""],
          ["2025-02-07", 0, "Peabody", "NEC", "W", 48, 47, ""],
          ["2025-02-11", 1, "Swampscott", "NEC", "W", 58, 34, ""],
          ["2025-02-14", 0, "Manchester Essex", "Non-league", "W", 33, 30, ""],
          ["2025-02-16", 1, "Beverly", "NEC", "W", 45, 20, ""],
          ["2025-02-25", 0, "Holliston", "MIAA tournament", "L", 38, 53, ""]
        ]
      },
      {
        season: "2023–24",
        record: "7–13",
        coach: "Dave Chisholm",
        finish: "3rd",
        captains: "Reese Holland, Aundrea Guadino, Molly Godfried",
        allLeague: "Angie Djoko",
        games: [
          ["2023-12-12", 1, "Gloucester", "NEC", "W", 40, 36, ""],
          ["2023-12-19", 1, "Marblehead", "NEC", "L", 32, 46, ""],
          ["2023-12-27", 1, "Melrose", "Tournament", "L", 27, 42, ""],
          ["2023-12-29", 0, "North Reading", "Non-league", "L", 24, 61, ""],
          ["2024-01-03", 1, "Manchester Essex", "Non-league", "L", 30, 36, ""],
          ["2024-01-05", 0, "Swampscott", "NEC", "W", 38, 27, ""],
          ["2024-01-08", 1, "Winthrop", "NEC", "W", 49, 45, ""],
          ["2024-01-10", 1, "Ipswich", "Non-league", "W", 47, 32, ""],
          ["2024-01-11", 0, "Salem", "NEC", "W", 58, 23, ""],
          ["2024-01-16", 0, "Saugus", "NEC", "L", 22, 51, ""],
          ["2024-01-19", 0, "Gloucester", "NEC", "W", 47, 46, ""],
          ["2024-01-22", 1, "Peabody", "NEC", "L", 37, 50, ""],
          ["2024-01-24", 0, "Ipswich", "Non-league", "W", 55, 44, ""],
          ["2024-01-30", 1, "Swampscott", "NEC", "L", 20, 37, ""],
          ["2024-02-02", 0, "Marblehead", "NEC", "L", 27, 39, ""],
          ["2024-02-06", 0, "Winthrop", "NEC", "L", 37, 59, ""],
          ["2024-02-08", 1, "Saugus", "NEC", "L", 40, 50, ""],
          ["2024-02-14", 1, "Masconomet", "NEC", "L", 51, 57, ""],
          ["2024-02-16", 0, "Manchester Essex", "Non-league", "L", 46, 49, ""],
          ["2024-02-18", 1, "Beverly", "NEC", "L", 40, 46, ""]
        ]
      }
    ],
    historyIntro: "Five conference titles, four 1,000-point scorers and a school-record 19–2 season in 2026. The seasons and players behind Danvers girls basketball.",
    banners: [],
    necTitles: [2010, 2011, 2018, 2019, 2026],
    historyNote: "Title years are the seasons the record book marks as NEC champions.",
    historyTile: ["1,000-point club", 4, "Sherry · Wright · Macdonald · Djoko"],
    seasons: [
      [2026, 19, 2, 0, "Dave Chisholm", "NEC Champions", "Lost Round of 32 51-48 @ Mansfield"],
      [2025, 14, 7, 0, "Dave Chisholm", "3rd Lynch", "Prelim Lost @ Holliston 53-38"],
      [2024, 7, 13, 0, "Dave Chisholm", "3rd", ""],
      [2023, 5, 15, 0, "Dave Chisholm", "4th", ""],
      [2022, 6, 14, 0, "Pat Veilleux", "", ""],
      [2021, 7, 8, 0, "Pat Veilleux", "", ""],
      [2020, 11, 10, 0, "Pat Veilleux", "2nd", "1st Round Loss vs. Tewksbury"],
      [2019, 13, 8, 0, "Pat Veilleux", "NEC Champions", "D2N Quarterfinal Loss vs. Melrose"],
      [2018, 16, 6, 0, "Pat Veilleux", "NEC Champions", "D2N Quarterfinal Loss vs. Melrose"],
      [2017, 10, 11, 0, "Pat Veilleux", "", "1st Round Loss vs. Arlington Catholic"],
      [2016, 12, 8, 0, "Pat Veilleux", "", "2nd Round Loss vs. Watertown"],
      [2015, 10, 11, 0, "Pat Veilleux", "", "1st Round Loss"],
      [2014, 11, 10, 0, "Pat Veilleux", "", "1st Round Loss"],
      [2013, 12, 9, 0, "Pat Veilleux", "", ""],
      [2012, 5, 15, 0, "Pat Veilleux", "", ""],
      [2011, 16, 6, 0, "Pat Veilleux", "NEC Champions", "2nd Round Loss vs."],
      [2010, 15, 7, 0, "Pat Veilleux", "NEC Champions", "2nd Rounds Loss vs. Reading"],
      [2009, 11, 8, 0, "Pat Veilleux", "2nd", "1st Round Loss vs."],
      [2008, 12, 9, 0, "Pat Veilleux", "3rd", "1st Round Loss vs. Lincoln Sudbury"],
      [2007, 11, 9, 0, "Pat Veilleux", "2nd", "1st"],
      [2006, 6, 14, 0, "Tiffany DeCoff", "", ""],
      [2005, 13, 8, 0, "Tiffany DeCoff", "", "Loss Reading 56, Danvers 42"],
      [2004, 12, 9, 0, "Tiffany DeCoff", "", "loss vs lynn"],
      [2003, 11, 9, 0, "Tiffany DeCoff", "", "2nd Round loss vs Salem"],
      [2002, 14, 4, 0, "Paul Moran", "", ""],
      [2001, 12, 7, 0, "Paul Moran", "", ""],
      [2000, 18, 5, 0, "Paul Moran", "3rd", "Won 2 Tournament Games lost to CC 55-42 D2 North Quarters"],
      [1999, 5, 13, 0, "Kevin McLaughlin", "", ""],
      [1998, 14, 5, 0, "Kevin McLaughlin", "", "Lost to Bishop Fenwick 51-48 1st Round"],
      [1997, 16, 6, 0, "Jen Mscisz", "", "1-1 lost to Masco 63-48 2nd Round"],
      [1996, 12, 9, 0, "Jen Mscisz", "", "1-1 lost to Concord Carlise 49-35 2nd Round"],
      [1995, 5, 14, 0, "Jen Mscisz", "", ""],
      [1994, 4, 15, 0, "Jen Mscisz", "", ""]
    ],
    honors: [
      { year: 2026, captains: "Angie Djoko, Lila Flynn, Kayda Brown", allLeague: "", note: "Dave Chisholm: NEC Coach of the Year" },
      { year: 2025, captains: "Kayda Brown, Angie Djoko, Gianna Ferrero, Maddie Shairs", allLeague: "Angie Djoko", note: "" },
      { year: 2024, captains: "Reese Holland, Aundrea Guadino, Molly Godfried", allLeague: "Angie Djoko", note: "" },
      { year: 2023, captains: "Eliana Anderson, Kaylee Marsello, Emma McCullough", allLeague: "", note: "" },
      { year: 2022, captains: "Kristina Yebba, Gabby Chisolm", allLeague: "", note: "" },
      { year: 2021, captains: "Julia Vaillancourt, Gabby Chisolm", allLeague: "", note: "" },
      { year: 2020, captains: "Cheyenne Nessinger, Maddie Montanari", allLeague: "Cheyenne Nessinger", note: "" },
      { year: 2019, captains: "Hailey Chisholm, Ava Lanning", allLeague: "Autumn James", note: "Pat Veilleux: NEC Coach of the Year" },
      { year: 2018, captains: "Siobhan Moriarty, Sarah Unczur, Lilly Montanari", allLeague: "Sarah Unczur", note: "" },
      { year: 2017, captains: "Elena Clifford, Julia McNulty, Nicole White", allLeague: "Nicole White", note: "" },
      { year: 2016, captains: "Hannah Llewellyn, Devan Walsh", allLeague: "", note: "" },
      { year: 2014, captains: "Ashley Arnoldy, Emily McNulty, Allison Walsh, Delaney Zecha", allLeague: "", note: "" },
      { year: 2013, captains: "Kasey Sherry, Sarah Potter", allLeague: "", note: "" },
      { year: 2012, captains: "Katie McKenna", allLeague: "", note: "" },
      { year: 2011, captains: "Kellie Macdonald, Allison Tivnan", allLeague: "Sarah Palazola, Kasey Sherry, Kellie Macdonald", note: "" },
      { year: 2010, captains: "Kellie Macdonald, Joanna Zecha", allLeague: "Joanna Zecha, Kellie Macdonald, Sarah Palazola", note: "" },
      { year: 2006, captains: "Becky Davison, Jes Hudon", allLeague: "", note: "" },
      { year: 2005, captains: "Katrina Crotts, Vicki Andruszkiewicz", allLeague: "", note: "" },
      { year: 2004, captains: "Amanda Chase, Missy Jackman", allLeague: "", note: "" },
      { year: 2003, captains: "Kelleen Forlizzi, Liz Fitzgerald", allLeague: "", note: "" },
      { year: 2002, captains: "Lindsay Frederick, Shannon Parker, Jeanne Powers, Melissa Simbliaris", allLeague: "", note: "" },
      { year: 2001, captains: "Sarah Cormier, Lindsay Frederick, Melissa Simbaliaris", allLeague: "Lindsay Frederick", note: "" },
      { year: 2000, captains: "Kim Kasprzyk, Jaime Morgan, Jen Scott", allLeague: "", note: "" }
    ],
    legendsNote: "The program's 1,000-point scorers, from the record book.",
    legends: [
      { name: "Danielle Sherry", role: "Class of 2008 · 1,202 points", bio: "The program's all-time leading scorer. Sherry also holds the single-game record with 33 points.", tags: ["1,202 career points", "33 in a game"] },
      { name: "Lindsay Wright", role: "Class of 1998 · 1,059 points", bio: "Second on the all-time scoring list, Wright played on teams that reached the state tournament in three straight seasons from 1996 to 1998.", tags: ["1,059 career points"] },
      { name: "Kellie Macdonald", role: "Class of 2011 · 1,058 points", bio: "A two-year captain and an all-league pick in 2010 and 2011, when Danvers won back-to-back NEC championships.", tags: ["1,058 career points", "Two NEC titles"] },
      {
        name: "Angie Djoko",
        role: "Class of 2026 · 1,001 points",
        bio: "The 2026 Northeastern Conference Player of the Year and a three-time all-league pick. Djoko captained the 19–2 team and holds the single-game rebounding record with 26.",
        tags: ["1,001 career points", "NEC Player of the Year", "26 rebounds in a game"]
      }
    ],
    records: {
      Career: { Points: [["Danielle Sherry", "1,202", "Class of 2008"], ["Lindsay Wright", "1,059", "Class of 1998"], ["Kellie Macdonald", "1,058", "Class of 2011"], ["Angie Djoko", "1,001", "Class of 2026"]] },
      "Single Game": { Points: [["Danielle Sherry", "33", ""]], Rebounds: [["Angie Djoko", "26", ""]] }
    },
    milestones: [
      { year: "2000", text: "An 18–5 season and two state tournament wins before a loss in the Division 2 North quarterfinals." },
      { year: "2008", text: "Danielle Sherry graduates as the program's all-time leading scorer with 1,202 points." },
      { year: "2010", text: "First of back-to-back NEC championships under Pat Veilleux; the 2011 team goes 16–6." },
      { year: "2018", text: "A 16–6 season starts another pair of conference titles. Veilleux is the NEC Coach of the Year in 2019." },
      { year: "2026", text: "A school-record 19–2 season and the NEC title. Angie Djoko reaches 1,000 points and is the conference Player of the Year, and Dave Chisholm is Coach of the Year." }
    ],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every level's games, times and changes on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "Watch", title: "Home games on NFHS Network", text: "Danvers High School streams home games on the NFHS Network.", url: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma", go: "NFHS Network" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/94341-2/", go: "danverspublicschools.org" },
      {
        kind: "History",
        title: "Record book",
        text: "Season records, captains and all-league picks kept by the athletic department.",
        url: "https://docs.google.com/spreadsheets/d/1QoAjMBsgvHdUGnr3C75JJzgyqOdt6L9BBpcLU_QlNJs/edit?gid=1756060361#gid=1756060361",
        go: "Record book"
      }
    ],
    news: [
      {
        date: "2026",
        title: "Danvers star Djoko named NEC Player of the Year",
        blurb: "The Salem News on Angie Djoko's senior season and the conference's top award.",
        source: "Salem News",
        url: "https://www.salemnews.com/sports/danvers-star-djoko-named-nec-player-of-the-year/article_cbe94190-178b-4ec5-969d-576d0f0b71fc.html"
      }
    ],
    photos: []
  }
};
