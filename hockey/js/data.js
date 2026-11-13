/* =====================================================================
   DANVERS FALCONS HOCKEY — SITE DATA
   boys, and the girls co-op team with Beverly and Ipswich
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left off
   the site until it is known.

   A GAME on a team's schedule:
     id, date ("2026-12-14T16:00", Eastern time), opponent, mascot,
     home (true/false), neutral: true, league (true = NEC game), site (the rink),
     tournament: true, tag: "Tournament name"    timeTbd: true (time not set)
     result: "W" / "L" / "T" (null until it's played), us, them
     line:   { us: [1, 2, 0], them: [0, 1, 1] }   goals by period (a 4th number = overtime)
     stats:  { "Player Name": { g: 2, a: 1 }, "Goalie Name": { sv: 27 } }   adds up into the roster
     summary: a short recap    notes: ["bullet", ...]    sources: [{ label, url }]

   A PLAYER on a roster: { name, num, pos: ["F"], grade: "Sr.", captain: true }

   PAST SEASONS list each game as
     [date, home (1/0), opponent, type, result, us, them, note]
   Sources: the school's record book and team pages, High School on SI
   (boys schedules and scores) and MyHockeyLive (rinks, girls schedule).
   ===================================================================== */

const SPORT = {
  key: "hockey", name: "Hockey", season: "2026–27",
  game: "game", games: "games", players: "players", start: "Puck Drop",
  scoreWord: "Goals", lineTitle: "Score by Period", periods: ["1st", "2nd", "3rd"], boxTitle: "Scoring",
  stats: [["g", "Goals", "goal"], ["a", "Assists", "assist"], ["sv", "Saves", "save"]],
  ties: true, spanYears: true
};

const SCHOOL = {
  school: "Danvers High School", name: "Danvers Falcons", location: "Danvers, MA",
  conference: "Northeastern Conference", athletics: "https://www.danversfalconsathletics.com/"
};

const TEAMS = {
  /* ================================ BOYS ================================ */
  boys: {
    label: "Boys Hockey",
    short: "Boys",
    division: "MIAA Division 3",
    headCoach: "Bill Sheehan",
    heroTitle: "Falcons drop the puck Dec. 14 against Somerville",
    preview: "Danvers went 10–10–2 last winter, finished second in the conference and won a state tournament game at Westfield before falling in the Round of 16. Tryouts begin Monday, Nov. 30, and the season opens Monday, Dec. 14 at Bourque Arena.",
    stripTile: ["State titles", 2, "1994 · 2001"],
    scheduleNote: "This is the schedule posted so far for 2026–27; more games are expected and times can change. The school's ArbiterLive page has the latest.",
    links: {
      school: "https://danverspublicschools.org/dhs/athletics/boys-hockey/",
      schedule: "https://www.arbiterlive.com/Teams?entityId=5538",
      recordBook: "https://docs.google.com/spreadsheets/d/1vf0NtXTt-mCHhaf4qSfU9y2mp_HIP2uRHK4gkjEYRLA/edit?gid=1756060361#gid=1756060361",
      watch: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma"
    },
    staff: [["Head coach", "Bill Sheehan", "Third season"], ["Assistant coaches", "Matt Churchill & Trevor McNeill"], ["JV coach", "Shane Swanton"]],
    about: [
      "Danvers boys hockey has two state championships, in 1994 and 2001, and 11 Northeastern Conference titles. The Falcons play their home games at the Raymond J. Bourque Arena at Endicott College in Beverly.",
      "The Falcons skate in the Northeastern Conference against Gloucester, Marblehead, Masconomet, Saugus and Winthrop. The most anticipated games each winter are against rivals Beverly and Peabody.",
      "The Danvers Hockey Boosters support the program at danversfalconshockey.com. Coaching staff as listed on the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted after tryouts, which begin Monday, Nov. 30.",
    schedule: [
      { id: 1, date: "2026-12-14T16:00", opponent: "Somerville", mascot: "Highlanders", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 2, date: "2026-12-19T19:30", opponent: "Saugus", mascot: "Sachems", home: false, league: true, site: "Kasabuski Rink, Saugus", result: null },
      {
        id: 3,
        date: "2026-12-26T16:00",
        opponent: "Marblehead",
        mascot: "Magicians",
        home: false,
        league: false,
        tournament: true,
        site: "Dorothy Talbot Rink, Gloucester",
        result: null,
        neutral: true,
        tag: "Cape Ann Savings Bank Holiday Tournament",
        notes: ["First round of the Cape Ann Savings Bank Holiday Tournament", "A consolation or championship game follows; its date and time haven't been announced"]
      },
      { id: 4, date: "2026-12-30T12:00", opponent: "Swampscott", mascot: "Big Blue", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 5, date: "2027-01-08T19:30", opponent: "Winthrop", mascot: "Vikings", home: true, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 6, date: "2027-01-13T19:00", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 7, date: "2027-01-16T20:00", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 8, date: "2027-01-18T12:00", opponent: "Stoneham", mascot: "Spartans", home: false, league: false, site: "Stoneham Arena, Stoneham", result: null },
      { id: 9, date: "2027-01-23T15:00", opponent: "Winthrop", mascot: "Vikings", home: false, league: true, site: "Larsen Rink, Winthrop", result: null },
      { id: 10, date: "2027-02-06T18:00", opponent: "Beverly", mascot: "Panthers", home: true, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 11, date: "2027-02-10T20:15", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true, site: "Valley Forum, Haverhill", result: null },
      { id: 12, date: "2027-02-13T15:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "O'Keefe Center, Salem State University, Salem", result: null },
      {
        id: 13,
        date: "2027-02-15T15:00",
        opponent: "Triton",
        mascot: "Vikings",
        home: false,
        league: false,
        site: "Graf Rink, Newburyport",
        result: null,
        tournament: true,
        tag: "Newburyport Bank Classic",
        notes: ["First round of the Newburyport Bank Classic", "A consolation or championship game follows on Tuesday, Feb. 16"]
      }
    ],
    players: [],
    past: [
      {
        season: "2025–26",
        record: "10–10–2",
        coach: "Bill Sheehan",
        finish: "2nd",
        post: "Won at Westfield 4–1, then lost in the Round of 16 at Shawsheen Tech, 4–0",
        captains: "Drew Godfried and Thomas Fish",
        allLeague: "Drew Godfried and Cooper Dunham",
        allStars: "Owen Swanton, Evan Morey",
        awards: "Thomas Fish, MIAA Bruins Sportsmanship Award",
        games: [
          ["2025-12-13", 0, "Gloucester", "NEC", "W", 5, 2, ""],
          ["2025-12-16", 1, "Amesbury", "Non-league", "L", 4, 6, ""],
          ["2025-12-18", 1, "Essex Tech", "Non-league", "L", 0, 5, ""],
          ["2025-12-23", 1, "Shawsheen Tech", "Non-league", "L", 1, 5, ""],
          ["2025-12-27", 1, "Triton", "Non-league", "W", 9, 0, ""],
          ["2025-12-31", 0, "Wakefield", "Non-league", "L", 0, 4, ""],
          ["2026-01-03", 1, "Beverly", "NEC", "T", 4, 4, ""],
          ["2026-01-07", 1, "Winthrop", "NEC", "W", 5, 1, ""],
          ["2026-01-10", 1, "Peabody", "NEC", "W", 5, 2, ""],
          ["2026-01-17", 0, "Marblehead", "NEC", "L", 5, 6, ""],
          ["2026-01-19", 0, "Stoneham", "Non-league", "L", 1, 4, ""],
          ["2026-01-21", 0, "Masconomet", "NEC", "W", 3, 1, ""],
          ["2026-01-24", 1, "Gloucester", "NEC", "W", 2, 1, ""],
          ["2026-01-28", 0, "Beverly", "NEC", "L", 0, 4, ""],
          ["2026-01-31", 0, "Winthrop", "NEC", "T", 1, 1, ""],
          ["2026-02-05", 1, "Peabody", "NEC", "W", 6, 1, ""],
          ["2026-02-10", 1, "Marblehead", "NEC", "L", 3, 4, ""],
          ["2026-02-13", 1, "Masconomet", "NEC", "W", 3, 1, ""],
          ["2026-02-16", 0, "Triton", "Non-league", "W", 7, 0, ""],
          ["2026-02-18", 1, "Norwell", "Tournament", "L", 2, 3, ""],
          ["2026-02-25", 0, "Westfield", "MIAA tournament", "W", 4, 1, ""],
          ["2026-02-28", 0, "Shawsheen Tech", "Non-league", "L", 0, 4, ""]
        ]
      },
      {
        season: "2024–25",
        record: "8–12–2",
        coach: "Bill Sheehan",
        post: "Lost in the Round of 16 at Nauset",
        captains: "Josh Henry and Seamus Cary",
        allLeague: "Josh Henry",
        games: [
          ["2024-12-14", 1, "Gloucester", "NEC", "L", 4, 5, ""],
          ["2024-12-18", 0, "Amesbury", "Non-league", "L", 0, 1, ""],
          ["2024-12-23", 1, "Marblehead", "NEC", "L", 2, 3, ""],
          ["2024-12-26", 0, "Chelmsford", "Tournament", "L", 4, 6, ""],
          ["2024-12-28", 1, "Lowell Catholic", "Tournament", "T", 4, 4, ""],
          ["2024-12-30", 1, "Beverly", "NEC", "W", 3, 2, ""],
          ["2025-01-01", 0, "Stoneham", "Non-league", "L", 1, 4, ""],
          ["2025-01-11", 0, "Beverly", "NEC", "W", 5, 2, ""],
          ["2025-01-15", 0, "Essex Tech", "Non-league", "L", 1, 3, ""],
          ["2025-01-18", 0, "Peabody", "NEC", "T", 5, 5, ""],
          ["2025-01-23", 1, "Winthrop", "NEC", "L", 1, 3, ""],
          ["2025-01-25", 1, "Masconomet", "NEC", "W", 6, 3, ""],
          ["2025-01-29", 0, "Gloucester", "NEC", "L", 1, 3, ""],
          ["2025-02-01", 1, "Littleton", "Non-league", "W", 5, 3, ""],
          ["2025-02-05", 0, "Bedford", "Non-league", "L", 1, 5, ""],
          ["2025-02-08", 0, "Marblehead", "NEC", "L", 0, 5, ""],
          ["2025-02-12", 0, "Winthrop", "NEC", "W", 3, 2, ""],
          ["2025-02-14", 1, "Amesbury", "Non-league", "L", 1, 4, ""],
          ["2025-02-17", 0, "Haverhill", "Non-league", "W", 4, 0, ""],
          ["2025-02-19", 0, "Norwell", "Tournament", "W", 3, 0, ""],
          ["2025-02-27", 1, "Nashoba", "Tournament", "W", 4, 3, ""],
          ["2025-03-01", 0, "Nauset", "MIAA tournament", "L", 0, 9, ""]
        ]
      },
      {
        season: "2023–24",
        record: "11–7–3",
        coach: "Kevin Fessette",
        finish: "2nd",
        post: "Lost in the Round of 32 to West Springfield",
        captains: "Ty Langlais and Nick Anderson",
        allLeague: "Ty Langlais",
        note: "The record book lists this season as 11–7–3; one game isn't in the results on file.",
        games: [
          ["2023-12-09", 0, "Littleton", "Non-league", "W", 5, 1, ""],
          ["2023-12-13", 1, "Masconomet", "NEC", "W", 4, 2, ""],
          ["2023-12-16", 0, "Winthrop", "NEC", "L", 1, 7, ""],
          ["2023-12-20", 1, "Lowell Catholic", "Non-league", "T", 4, 4, ""],
          ["2023-12-27", 1, "Triton", "Non-league", "L", 1, 3, ""],
          ["2023-12-29", 1, "Lowell Catholic", "Tournament", "T", 2, 2, ""],
          ["2024-01-03", 1, "Peabody", "NEC", "W", 6, 0, ""],
          ["2024-01-10", 1, "Marblehead", "NEC", "W", 3, 0, ""],
          ["2024-01-17", 0, "Essex Tech", "Non-league", "L", 1, 4, ""],
          ["2024-01-20", 0, "Gloucester", "NEC", "L", 1, 2, ""],
          ["2024-01-24", 0, "Masconomet", "NEC", "W", 6, 5, ""],
          ["2024-01-27", 1, "Swampscott", "NEC", "W", 6, 0, ""],
          ["2024-01-31", 1, "Winthrop", "NEC", "L", 1, 5, ""],
          ["2024-02-03", 1, "Everett", "Non-league", "W", 11, 3, ""],
          ["2024-02-07", 0, "Beverly", "NEC", "W", 4, 1, ""],
          ["2024-02-10", 0, "Marblehead", "NEC", "T", 3, 3, ""],
          ["2024-02-14", 0, "Gloucester", "NEC", "L", 3, 5, ""],
          ["2024-02-19", 1, "Wakefield", "Non-league", "W", 5, 4, ""],
          ["2024-02-21", 1, "Beverly", "NEC", "W", 5, 2, ""],
          ["2024-02-29", 1, "West Springfield", "Tournament", "L", 0, 3, ""]
        ]
      }
    ],
    historyIntro: "Two state championships, 11 conference titles and a record book full of 100-point scorers. The seasons and players behind Danvers boys hockey.",
    banners: [{ year: 2001, label: "Division 2 State Champions" }, { year: 1994, label: "Division 2 State Champions" }],
    necTitles: [1981, 1990, 1991, 1992, 1993, 1994, 1996, 2002, 2012, 2017, 2018],
    historyNote: "Title years follow the school's team page. The 1991 team was the first in NEC history to go 16–0–0 in the conference.",
    historyTile: ["100-point club", 17, "Newest: Cooper Dunham, 2026"],
    seasons: [
      [2026, 10, 10, 2, "Bill Sheehan", "2nd", "Lost in the Round of 16 to Shawsheen Tech (4-0)"],
      [2025, 8, 12, 2, "Bill Sheehan", "", "Lost in Round of 16 @ Nauset"],
      [2024, 11, 7, 3, "Kevin Fessette", "2nd", "Lost Round of 32 vs. West Springfield"],
      [2023, 6, 12, 3, "Kevin Fessette", "", "Lost Round of 32 vs. Triton"],
      [2022, 9, 7, 4, "Kevin Fessette", "", "Lost Round of 8 vs. Marlboro"],
      [2021, 6, 7, 0, "Andrew O'Neill, Steve Baldassare", "", ""],
      [2020, 9, 10, 2, "Steve Baldassare", "", "Lost First Round to Lincoln Sudbury"],
      [2019, 12, 9, 2, "Steve Baldassare", "", "North Semi-Finals Lost to Tewksbury"],
      [2018, 16, 5, 1, "Steve Baldassare", "NEC North Champs", "North Quarterfinals Lost to North Andover"],
      [2017, 15, 4, 2, "Steve Baldassare", "NEC North Champs", "North Quarterfinals Lost to Stoneham"],
      [2016, 7, 10, 3, "Steve Baldassare", "", ""],
      [2015, 11, 7, 4, "Kevin Brown", "", "Lost 1st Round to Peabody in OT"],
      [2014, 11, 11, 1, "Kevin Brown", "", "Lost to Beverly in shootout"],
      [2013, 13, 7, 4, "Kevin Brown", "", "Lost in Div. 2 North final to Wilmington"],
      [2012, 16, 6, 0, "Kevin Brown", "NEC North Champs", "Lost in Div. 2 2nd round to No. Andover"],
      [2011, 10, 7, 5, "Kevin Brown", "", "Lost in Div. 2 2nd round to Wilmington"],
      [2010, 8, 9, 4, "Kevin Brown", "", "Lost in Div. 2 first round to Peabody"],
      [2009, 3, 17, 0, "Kevin Brown", "", ""],
      [2008, 13, 7, 2, "Kevin Brown", "", "Lost in Div. 2 2nd round to Wilmington"],
      [2007, 9, 7, 5, "Kevin Brown", "", "Lost in Division 2 first round to Gloucester"],
      [2006, 14, 7, 1, "Kevin Flynn", "2nd", "Lost to Watertown in 2nd round"],
      [2005, 14, 8, 1, "Kevin Flynn", "", "Lost to Saugus in Div. 2 North final"],
      [2004, 11, 7, 3, "Kevin Flynn", "", "Lost to Peabody in first round"],
      [2003, 16, 6, 0, "Kevin Flynn", "", "Lost in Div. 2 North semis to Saugus in OT"],
      [2002, 20, 4, 0, "Kevin Flynn", "NEC Champs", "Lost Div. 2 North final to St. Mary's Lynn"],
      [2001, 18, 4, 3, "Kevin Flynn", "", "Won the Div. 2 state title over Boston Latin"],
      [2000, 15, 7, 1, "Kevin Flynn", "", "Lost in Div. 2 North semis to St. Bernard's"],
      [1999, 12, 9, 1, "Kevin Flynn", "4th", "Lost in second round to Saugus"],
      [1998, 9, 7, 6, "Kevin Flynn", "4th", "Lost in second round to Saugus"],
      [1997, 16, 4, 3, "Kevin Flynn", "2nd", "Lost to Newburyport in Div. 2 North final"],
      [1996, 19, 1, 2, "Kevin Flynn", "NEC Champs", "Lost to Hingham in Div. 2 state semifinals"],
      [1995, 13, 6, 3, "Kevin Flynn", "2nd", "Lost to Whitman-Hanson in 2nd round"],
      [1994, 20, 1, 3, "Kevin Flynn", "NEC Champs", "Won the Div. 2 state title over Taunton (OT)"],
      [1993, 17, 1, 2, "Kevin Flynn", "NEC Champs", "Lost as No. 1 seed in first round to Marshfield"],
      [1992, 13, 4, 4, "Kevin Flynn", "NEC Champs", "Lost in Div. 1 first round to Medford"],
      [1991, 17, 3, 1, "Kevin Flynn", "NEC Champs", "Lost in Div. 1 first round to Don Bosco"],
      [1990, 13, 4, 3, "Kevin Flynn", "NEC Champs", "Lost in Div. 1 first round to Framingham South"],
      [1989, 13, 4, 3, "Kevin Flynn", "2nd", "Lost in Div. 1 first round to Malden Catholic"],
      [1988, 7, 7, 4, "Kevin Flynn", "6th", ""],
      [1987, 3, 14, 1, "Kevin Flynn", "9th", ""],
      [1986, 9, 7, 2, "John Gillis", "5th", ""],
      [1985, 11, 8, 0, "John Gillis", "4th", "Lost to Watertown in Div. 1 first round"],
      [1984, 13, 4, 4, "John Gillis", "2nd", "Lost to Watertown in Div. 1 first round"],
      [1983, 9, 10, 0, "John Gillis", "4th", ""],
      [1982, 16, 3, 3, "John Gillis", "2nd", "Lost to Arlington in Div. 1 second round"],
      [1981, 17, 5, 2, "John Gillis", "NEC Champs (13-3-2)", "Lost to Matignon in state semis Boston Garden"],
      [1980, 14, 6, 1, "John Gillis", "3rd NEC", "Lost in Div. 1 2nd round to Don Bosco"],
      [1979, 8, 9, 2, "John Gillis", "6th NEC", ""],
      [1978, 8, 6, 6, "John Gillis", "5th NEC", "Lost in Div. 1 first round to Acton-Boxboro"],
      [1977, 8, 9, 2, "John Gillis", "5th NEC", ""],
      [1976, 8, 8, 3, "John Gillis", "5th NEC", ""],
      [1975, 5, 12, 1, "John Hartnett", "8th NEC", ""],
      [1974, 3, 13, 3, "John Hartnett", "9th NEC", ""],
      [1973, 5, 15, 0, "John Hartnett", "", ""],
      [1972, 2, 16, 2, "", "", ""],
      [1971, null, null, null, "", "5th in North Shore League", ""],
      [1960, null, null, null, "", "", "Lost to Weymouth"],
      [1957, null, null, null, "", "", "Lost to Braintree"],
      [1955, null, null, null, "", "", "Lost to Boston Tech"],
      [1954, null, null, null, "", "", "Beat Malden Catholic; lost to Needham"],
      [1946, null, null, null, "Ray Funchion", "", ""]
    ],
    honors: [
      { year: 2026, captains: "Drew Godfried and Thomas Fish", allLeague: "Drew Godfried and Cooper Dunham", note: "" },
      { year: 2025, captains: "Josh Henry and Seamus Cary", allLeague: "Josh Henry", note: "" },
      { year: 2024, captains: "Ty Langlais and Nick Anderson", allLeague: "Ty Langlais", note: "" },
      { year: 2023, captains: "Trevor McNeil and Bobby Joyce", allLeague: "Trevor McNeil", note: "" },
      { year: 2022, captains: "Connor Horn, Aidan Lanphere", allLeague: "", note: "" },
      { year: 2021, captains: "Brian Taylor, Michael Papamechail", allLeague: "", note: "Andrew O'Neill, Steve Baldassare: 10 games" },
      { year: 2020, captains: "Calvin Mansfield, Tyler Puska, Cam DiMeglio", allLeague: "Cal Mansfield", note: "" },
      { year: 2019, captains: "Jared Mscisz, Jack Thibodeau", allLeague: "Jared Mscisz", note: "" },
      { year: 2018, captains: "Tommy Mento, Conor Purtell, Nic DiSciullo, Matt Taylor", allLeague: "Yegor Bublik, Mat Taylor, Conor Purtell", note: "" },
      { year: 2017, captains: "", allLeague: "Matt Taylor", note: "" },
      { year: 2016, captains: "", allLeague: "Tom Mento, Matt Taylor, Rob Tibbetts", note: "" },
      { year: 2015, captains: "", allLeague: "Stephen Ganley", note: "" },
      { year: 1993, captains: "", allLeague: "David Finn", note: "" },
      { year: 1991, captains: "", allLeague: "", note: "First NEC team to go 16-0-0" },
      { year: 1987, captains: "Mark Lombard, George Stamulis, Mike Thibodeau", allLeague: "", note: "" },
      { year: 1986, captains: "Mike Mscisz, John O'Neill", allLeague: "", note: "" },
      { year: 1985, captains: "Adam Belanger, Steve Horn, Jamie Whitmyer", allLeague: "", note: "" },
      { year: 1984, captains: "Duke St. Pierre, Ron Trentini", allLeague: "", note: "" },
      { year: 1983, captains: "Steve Charette, Scott Griffin", allLeague: "", note: "" },
      { year: 1982, captains: "Chris Hillick, Bob Russell", allLeague: "", note: "" },
      { year: 1981, captains: "Peter Marshall", allLeague: "", note: "" },
      { year: 1980, captains: "Mike Palmer, Bill Rossi", allLeague: "", note: "" },
      { year: 1979, captains: "Skip Day, Jack Purcell", allLeague: "", note: "" },
      { year: 1978, captains: "Gary Munzing, Ted St. Pierre, John Lawrence", allLeague: "", note: "" },
      { year: 1977, captains: "Doug Weymouth", allLeague: "", note: "" },
      { year: 1976, captains: "Mark Finnegan, Ted Kontos", allLeague: "", note: "" },
      { year: 1971, captains: "Loren Kelley (C) (senior) Gary Famigletti", allLeague: "", note: "" }
    ],
    legendsNote: "Record holders and championship builders from the program's record book.",
    legends: [
      {
        name: "Jeff McGonagle",
        role: "1993–96 · 169 points",
        bio: "The program's all-time leading scorer with 72 goals and 97 assists. His 47 assists in 1995–96 are still the single-season record, and he skated on the 1994 state championship team.",
        tags: ["169 career points", "47 assists in a season", "1994 state champion"]
      },
      {
        name: "Chris McNeill",
        role: "1994–96 · 150 points",
        bio: "Holds the single-season records for goals (42) and points (76), both set in 1995–96, when Danvers went 19–1–2 and reached the state semifinals. Tied for the career goals record with 80.",
        tags: ["42 goals in a season", "76 points in a season", "80 career goals"]
      },
      { name: "Kyle McCullough", role: "1999–2002 · 151 points", bio: "Shares the career goals record with 80 and scored 37 in 2000–01, the winter Danvers won its second state title.", tags: ["80 career goals", "2001 state champion"] },
      {
        name: "Kevin Flynn",
        role: "Head coach · 1987–2006",
        bio: "Coached the Falcons for 20 seasons and to both of the program's state championships: an overtime win over Taunton in 1994 and a win over Boston Latin in 2001.",
        tags: ["2 state titles", "7 NEC titles", "20 seasons"]
      },
      {
        name: "Tommy Mento",
        role: "2015–18 · 137 points",
        bio: "Second in program history with 79 career goals, including 30 in 2016–17. A captain of the 2018 team that went 16–5–1 and won a second straight NEC North title.",
        tags: ["79 career goals", "Two NEC North titles"]
      },
      {
        name: "Steve Baldassare",
        role: "Player 1988–91 · Head coach 2016–2020",
        bio: "A 100-point scorer as a player, with 31 goals in 1990–91, Baldassare came back to coach the Falcons to NEC North championships in 2017 and 2018.",
        tags: ["101 career points", "NEC North champions 2017, 2018"]
      }
    ],
    records: {
      "Single Season": {
        Goals: [["Chris McNeill", "42", "1995–96"], ["Chris Hillick", "40", "1981–82"], ["Kyle McCullough", "37", "2000–01"], ["Steve Baldassare", "31", "1990–91"], ["Tommy Mento", "30", "2016–17"]],
        Assists: [["Jeff McGonagle", "47", "1995–96"], ["Bryan Duggan", "43", "2000–01"], ["Brian Thibodeau", "35", "1990–91"], ["Bobby Caron", "33", "1993–94"]],
        Points: [
          ["Chris McNeill", "76", "42 goals, 34 assists · 1995–96"],
          ["Jeff McGonagle", "71", "24 goals, 47 assists · 1995–96"],
          ["Chris Hillick", "69", "40 goals, 29 assists · 1981–82"],
          ["Kyle McCullough", "64", "37 goals, 27 assists · 2000–01"],
          ["Bobby Caron", "62", "29 goals, 33 assists · 1993–94"]
        ]
      },
      Career: {
        Goals: [["Kyle McCullough", "80", "1999–2002"], ["Chris McNeill", "80", "1994–96"], ["Tommy Mento", "79", "2015–18"], ["Ryan Hayes", "77", "2000–03"], ["Jeff McGonagle", "72", "1993–96"]],
        Assists: [["Dustin Hayes", "101", "2003–06"], ["Jeff McGonagle", "97", "1993–96"], ["Bryan Duggan", "97", "1999–2002"], ["Ryan Hayes", "83", "2000–03"], ["Connor Purtell", "77", "2015–18"]],
        Points: [["Jeff McGonagle", "169", "1993–96"], ["Ryan Hayes", "160", "2000–03"], ["Kyle McCullough", "151", "1999–2002"], ["Chris McNeill", "150", "1994–96"], ["Dustin Hayes", "150", "2003–06"]],
        "Goalie Wins": [
          ["Scott Bevan", "37", "1999–2001 · 37–16–6 · 2.46 GAA · 8 shutouts"],
          ["Alex Taylor", "35", "2012–15 · 35–26–7 · 2.25 GAA · 9 shutouts"],
          ["CJ Sullivan", "34", "2001–03 · 34–10–0 · 2.02 GAA · 11 shutouts"],
          ["Yegor Bublik", "33", "2014–18 · 33–16–3 · 2.55 GAA · 4 shutouts"]
        ]
      },
      "100-Point Club": {
        "Career points": [["Jeff McGonagle", "169", "1993–96"], ["Ryan Hayes", "160", "2000–03"], ["Kyle McCullough", "151", "1999–2002"], ["Chris McNeill", "150", "1994–96"], ["Dustin Hayes", "150", "2003–06"], ["Bryan Duggan", "142", "1999–2002"]],
        "\u200b": [["Tommy Mento", "137", "2015–18"], ["Bob Caron", "124", "1991–93"], ["Gary Munzing", "123", "1976–78"], ["Sean McNeill", "121", "1990–94"], ["Connor Purtell", "119", "2015–18"], ["Joe Stangie", "114", "2010–13"]],
        "\u200b\u200b": [["John O'Neill", "107", "1984–86"], ["Brian Thibodeau", "104", "1988–91"], ["Duke St. Pierre", "102", "1981–84"], ["Cooper Dunham", "101", "2023–26"], ["Steve Baldassare", "101", "1988–91"]]
      }
    },
    milestones: [
      { year: "1981", text: "First Northeastern Conference championship. The Falcons go 17–5–2 and reach the state semifinals at Boston Garden." },
      { year: "1991", text: "The Falcons become the first NEC team to go 16–0–0 in the conference, the second of five straight league titles." },
      { year: "1994", text: "State champions. A 20–1–3 season ends with an overtime win over Taunton for the Division 2 title." },
      { year: "1996", text: "A 19–1–2 team reaches the state semifinals. Chris McNeill sets the single-season marks of 42 goals and 76 points." },
      { year: "2001", text: "A second state title: Danvers goes 18–4–3 and beats Boston Latin for the Division 2 championship." },
      { year: "2018", text: "A 16–5–1 season brings a second straight NEC North championship." },
      { year: "2026", text: "The Falcons win a state tournament game at Westfield and reach the Division 3 Round of 16. Cooper Dunham joins the 100-point club." }
    ],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every level's games, times and changes on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "Boosters", title: "Danvers Hockey Boosters", text: "News, fundraisers and team information from the boosters.", url: "https://www.danversfalconshockey.com/", go: "danversfalconshockey.com" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/boys-hockey/", go: "danverspublicschools.org" },
      {
        kind: "History",
        title: "Record book",
        text: "Season records, captains, scoring leaders and the 100-point club.",
        url: "https://docs.google.com/spreadsheets/d/1vf0NtXTt-mCHhaf4qSfU9y2mp_HIP2uRHK4gkjEYRLA/edit?gid=1756060361#gid=1756060361",
        go: "Record book"
      },
      { kind: "Scores", title: "MyHockeyLive", text: "Statewide high school hockey scores, standings and schedules.", url: "https://www.myhockeylive.com/miaa/teams/3912-danvers", go: "MyHockeyLive" }
    ],
    news: [],
    photos: []
  },

  /* ====================== GIRLS (co-op with Beverly and Ipswich) ====================== */
  girls: {
    label: "Girls Hockey",
    short: "Girls (co-op)",
    teamName: "Beverly/Danvers/Ipswich",
    league: "Northeast Hockey League",
    noLeague: true,
    headCoach: "Chris LeBlanc",
    heroTitle: "League champions open Dec. 11 against Gloucester",
    preview: "Danvers girls skate on a co-op varsity team with Beverly and Ipswich. The team went 15–6 and won the Northeast Hockey League last winter, and opens Friday, Dec. 11 at Bourque Arena.",
    stripTile: ["Co-op since", "2005", "Danvers · Beverly · Ipswich"],
    scheduleNote: "The co-op team's schedule is from MyHockeyLive and can change. Home games are at Bourque Arena.",
    links: { school: "https://danverspublicschools.org/dhs/athletics/girls-hockey/", watch: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma" },
    staff: [["Head coach", "Chris LeBlanc"]],
    about: [
      "The girls hockey program is a co-operative varsity team of players from Danvers, Beverly and Ipswich high schools. It began play in 2005 and has grown into one of the area's established programs, facing teams such as Marblehead, Masconomet and Winthrop.",
      "Teammates work together across three towns, and the players often describe each other as a second family. Home games are at the Raymond J. Bourque Arena at Endicott College in Beverly.",
      "The team plays as the Beverly/Danvers/Ipswich Panthers. Information from the Danvers High School team page."
    ],
    rosterNote: "The 2026–27 roster will be posted once the team is set.",
    schedule: [
      { id: 1, date: "2026-12-11T18:00", opponent: "Gloucester", mascot: "Fishermen", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 2, date: "2026-12-16T19:00", opponent: "St. Mary's", mascot: "Spartans", home: false, league: false, site: "Connery Memorial Rink, Lynn", result: null },
      { id: 3, date: "2026-12-19T16:00", opponent: "Peabody/Lynnfield/North Reading", mascot: "Tanners", home: false, league: false, site: "McVann-O'Keefe Rink, Peabody", result: null },
      { id: 4, date: "2026-12-23T16:00", opponent: "Grafton", home: false, league: false, site: "Buffone Arena, Worcester", result: null },
      { id: 5, date: "2026-12-26T16:40", opponent: "Masconomet", mascot: "Chieftains", home: false, league: false, site: "Valley Forum, Haverhill", result: null },
      { id: 6, date: "2026-12-30T14:00", opponent: "Woburn", mascot: "Tanners", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 7, date: "2027-01-02T14:00", opponent: "Wakefield", mascot: "Warriors", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 8, date: "2027-01-06T16:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: false, site: "Dorothy Talbot Rink, Gloucester", result: null },
      { id: 9, date: "2027-01-09T18:00", opponent: "Brookline", mascot: "Warriors", home: false, league: false, site: "Walter Brown Arena, Boston", result: null },
      { id: 10, date: "2027-01-11T19:30", opponent: "Melrose", mascot: "Red Hawks", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 11, date: "2027-01-13T16:30", opponent: "Medford/Malden", mascot: "Mustangs", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 12, date: "2027-01-16T18:00", opponent: "Winthrop", mascot: "Vikings", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 13, date: "2027-01-20T17:30", opponent: "Masconomet", mascot: "Chieftains", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 14, date: "2027-01-23T12:10", opponent: "Bishop Fenwick", mascot: "Crusaders", home: false, league: false, site: "Essex Sports Center, Middleton", result: null },
      { id: 15, date: "2027-01-27T19:00", opponent: "Medford/Malden", mascot: "Mustangs", home: false, league: false, site: "LoConte Rink, Medford", result: null },
      { id: 16, date: "2027-02-03T19:30", opponent: "Marblehead", mascot: "Magicians", home: false, league: false, site: "O'Keefe Center, Salem State University, Salem", result: null },
      { id: 17, date: "2027-02-06T13:00", opponent: "Winthrop", mascot: "Vikings", home: false, league: false, site: "Larsen Rink, Winthrop", result: null },
      { id: 18, date: "2027-02-10T19:30", opponent: "Newburyport", mascot: "Clippers", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 19, date: "2027-02-13T18:00", opponent: "Peabody/Lynnfield/North Reading", mascot: "Tanners", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 20, date: "2027-02-17T12:00", opponent: "Andover", mascot: "Golden Warriors", home: false, league: false, site: "Breakaway Ice Center, Tewksbury", result: null, timeTbd: true }
    ],
    players: [],
    pastIntro: "Last winter's record and honors for the co-op team.",
    past: [
      {
        season: "2025–26",
        record: "15–6",
        coach: "Chris LeBlanc",
        finish: "NEHL Champions",
        post: "Lost in the Round of 32 to Malden Catholic",
        awards: "Ashley Freitas, NEHL All-Star and MIAA Bruins Sportsmanship Award",
        games: [],
        gamesNote: "Game-by-game results for the co-op team aren't on file yet."
      }
    ],
    historyIntro: "A three-town team since 2005, and Northeast Hockey League champions in 2026.",
    banners: [],
    necTitles: [],
    seasons: [],
    honors: [],
    legends: [],
    milestones: [
      { year: "2005", text: "The co-operative girls hockey program begins play, bringing together players from Danvers, Beverly and Ipswich." },
      { year: "2026", text: "A 15–6 season and the Northeast Hockey League championship. Ashley Freitas is a league all-star and wins the MIAA Bruins Sportsmanship Award." }
    ],
    follow: [
      { kind: "Schedule", title: "MyHockeyLive", text: "The co-op team's schedule, scores and standings.", url: "https://www.myhockeylive.com/miaa/teams/4397-beverly-danvers-ipswich", go: "MyHockeyLive" },
      { kind: "School", title: "Team page", text: "Program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/girls-hockey/", go: "danverspublicschools.org" }
    ],
    news: [],
    photos: []
  }
};
