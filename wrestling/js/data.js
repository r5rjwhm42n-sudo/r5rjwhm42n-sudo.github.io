/* =====================================================================
   DANVERS FALCONS WRESTLING — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left off
   the site until it is known.

   A MEET on the schedule:
     id, date ("2026-12-16T17:30", Eastern time), opponent, mascot,
     home (true/false), league (true = NEC meet), site,
     tag: "Home quad"    timeTbd: true (time not set)
     name: "Tournament name"   for a tournament or practice meet with no single opponent
     scrimmage: true           not counted in the record
     result: "W" / "L" / "T" (null until it's wrestled), us, them   (team points)
     bouts:  [["113", "Wrestler Name", "W", "Pin, 1:42"], ...]       weight, Falcon, result, how
     stats:  { "Wrestler Name": { w: 1, pin: 1 } }                  adds up into the lineup
     summary: a short recap    notes: ["bullet", ...]    sources: [{ label, url }]
   A quad or tri-meet is one entry per opponent, so each dual counts in the record.

   A WRESTLER in the lineup: { name, pos: ["138"], grade: "Sr.", captain: true }

   Sources: the school's record book and team page, and the Falcons
   athletics site (schedule).
   ===================================================================== */

const SPORT = {
  key: "wrestling", name: "Wrestling", season: "2026–27",
  game: "meet", games: "meets", players: "wrestlers", start: "Start Time",
  scoreWord: "Team points", lineTitle: "", periods: [], boxTitle: "Results",
  stats: [["w", "Wins", "win"], ["pin", "Pins", "pin"]],
  ties: false, spanYears: true
};

const SCHOOL = {
  school: "Danvers High School", name: "Danvers Falcons", location: "Danvers, MA",
  conference: "Northeastern Conference", athletics: "https://www.danversfalconsathletics.com/"
};

const TEAMS = {
  varsity: {
    label: "Wrestling",
    short: "Varsity",
    headCoach: "Tom Savage",
    heroTitle: "Falcons hit the mat Dec. 16 at Saugus",
    preview: "Danvers opens its dual-meet season Wednesday, Dec. 16 at Saugus, then hosts Triton, Essex Tech and East Boston in a quad meet on Saturday, Dec. 19. Practice begins Monday, Nov. 30, with a preseason practice meet at Marblehead on Dec. 5.",
    stripTile: ["State champions", 13, "7 wrestlers · 2015 to 2024"],
    scheduleNote: "The 2026–27 meets from the school's ArbiterLive schedule. Tournaments are added as they're announced, and times can change; ArbiterLive has the latest.",
    links: {
      school: "https://danverspublicschools.org/dhs/athletics/wrestling/",
      schedule: "https://www.arbiterlive.com/Teams?entityId=5538",
      recordBook: "https://docs.google.com/spreadsheets/d/1smxaVhd4j4EcqWxkuHkSh6I80dgGpbHQutp4sVk-qz0/edit?gid=1756060361#gid=1756060361",
      watch: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma"
    },
    staff: [["Head coach", "Tom Savage", "Second season"], ["Assistant coach", "Adam Guzofski", "Class of 2024 · Division 3 state champion at 285 pounds"]],
    about: [
      "Danvers wrestling began in 2011 and grew quickly from a young, inexperienced team into a Northeastern Conference contender. Falcons have won 13 individual state championships since 2015.",
      "Some wrestlers arrive with experience, but many are multi-sport athletes trying the sport for the first time. The team wrestles NEC rivals such as Beverly, Peabody and Salem, faces area prep schools and travels to tournaments through the winter.",
      "Wrestling is an individual sport and a team sport at once: every bout is one-on-one, and every result adds to the team score. Home meets are at Danvers High School, 60 Cabot Road. Program information from the school's team page."
    ],
    rosterNote: "The 2026–27 lineup will be posted after practice begins Monday, Nov. 30.",
    schedule: [
      {
        id: 1,
        date: "2026-12-05T09:00",
        name: "North Shore Practice Meet",
        opponent: "North Shore Practice Meet",
        home: false,
        league: false,
        scrimmage: true,
        site: "Marblehead High School, Marblehead",
        result: null,
        notes: ["A preseason practice meet with Triton, Masconomet, Essex Tech, Lynn Classical and Salem", "Not counted in the record"]
      },
      { id: 2, date: "2026-12-16T17:30", opponent: "Saugus", mascot: "Sachems", home: false, league: true, site: "Saugus High School, Saugus", result: null },
      {
        id: 3,
        date: "2026-12-19T09:00",
        opponent: "Triton",
        mascot: "Vikings",
        home: true,
        league: false,
        site: "Danvers High School (Vye Gym), Danvers",
        result: null,
        tag: "Home quad",
        notes: ["Quad meet at Danvers High: the Falcons wrestle Triton, Essex Tech and East Boston", "Each dual counts in the team record"]
      },
      {
        id: 4,
        date: "2026-12-19T09:00",
        opponent: "Essex Tech",
        mascot: "Hawks",
        home: true,
        league: false,
        site: "Danvers High School (Vye Gym), Danvers",
        result: null,
        tag: "Home quad",
        timeTbd: true,
        notes: ["Quad meet at Danvers High: the Falcons wrestle Triton, Essex Tech and East Boston", "Each dual counts in the team record"]
      },
      {
        id: 5,
        date: "2026-12-19T09:00",
        opponent: "East Boston",
        mascot: "Jets",
        home: true,
        league: false,
        site: "Danvers High School (Vye Gym), Danvers",
        result: null,
        tag: "Home quad",
        timeTbd: true,
        notes: ["Quad meet at Danvers High: the Falcons wrestle Triton, Essex Tech and East Boston", "Each dual counts in the team record"]
      },
      {
        id: 6,
        date: "2027-01-02T09:00",
        name: "Home quad meet: Foxborough and two more teams",
        opponent: "Foxborough and two more teams",
        home: true,
        league: false,
        tag: "Home quad",
        site: "Danvers High School (Vye Gym), Danvers",
        result: null,
        notes: ["A Saturday-morning quad meet in the Vye Gym at Danvers High: the Falcons wrestle Foxborough and two other teams", "The other two teams haven't been listed yet"]
      },
      { id: 7, date: "2027-01-06T17:30", opponent: "Salem", mascot: "Witches", home: true, league: true, site: "Danvers High School (Vye Gym), Danvers", result: null },
      { id: 8, date: "2027-01-13T19:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: true, site: "Gloucester High School, Gloucester", result: null },
      { id: 9, date: "2027-01-20T18:30", opponent: "Marblehead/Swampscott", home: false, league: true, site: "Marblehead High School, Marblehead", result: null, notes: ["Marblehead and Swampscott wrestle as one co-op team"] },
      {
        id: 10,
        date: "2027-01-23T10:00",
        name: "Quad meet at North Reading",
        opponent: "Lynnfield and two more teams",
        home: false,
        league: false,
        tag: "Quad meet",
        site: "North Reading High School, North Reading",
        result: null,
        notes: ["A Saturday quad meet at North Reading High School: the Falcons wrestle Lynnfield and two other teams"]
      },
      { id: 11, date: "2027-01-27T19:30", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Beverly High School, Beverly", result: null },
      { id: 12, date: "2027-02-02T17:30", opponent: "Pentucket", mascot: "Panthers", home: true, league: false, site: "Danvers High School (Vye Gym), Danvers", result: null }
    ],
    players: [],
    pastIntro: "The last three winters: each season's record, coach, captains and honors.",
    past: [
      {
        season: "2025–26",
        record: "3–23",
        coach: "Tom Savage",
        finish: "9th",
        allStars: "Logan Jacques",
        games: [],
        gamesNote: "Meet-by-meet results for this season aren't on file. The season record is from the school's record book.",
        photo: { src: "../images/teams/wrestling.jpg", caption: "The 2025–26 Danvers wrestling team. Photo from the Danvers High School athletics page." }
      },
      { season: "2024–25", record: "1–13–2", coach: "Jake Almon", finish: "10th", allLeague: "Logan Jacques, JJ Rand", games: [], gamesNote: "Meet-by-meet results for this season aren't on file. The season record is from the school's record book." },
      {
        season: "2023–24",
        record: "2–18",
        coach: "Jake Almon",
        finish: "8th",
        captains: "Mark Haskins, Adam Guzofski, Zach Trohon",
        allLeague: "Adam Guzofski",
        awards: "Adam Guzofski, Division 3 state champion at 285 pounds and All-State qualifier",
        games: [],
        gamesNote: "Meet-by-meet results for this season aren't on file. The season record is from the school's record book."
      }
    ],
    historyIntro: "A program that started in 2011, won its first conference title four years later and has sent seven wrestlers to the top of the state podium.",
    banners: [],
    necTitles: [2015, 2016, 2018, 2022],
    historyNote: "Title seasons follow the record book, listed by the year each season ended. The school's team page lists NEC championships in 2014, 2015, 2016 and 2018.",
    historyTile: ["State champions", 13, "7 wrestlers · 2015 to 2024"],
    seasons: [
      [2026, 3, 23, 0, "Tom Savage", "9th", ""],
      [2025, 1, 13, 2, "Jake Almon", "10th", ""],
      [2024, 2, 18, 0, "Jake Almon", "8th", "State champion: Adam Guzofski (285)"],
      [2023, 3, 6, 0, "Jake Almon", "", ""],
      [2022, 10, 1, 0, "Mike Anderson", "NEC Champions", ""],
      [2021, 3, 4, 1, "Mike Anderson", "", ""],
      [2020, 4, 3, 0, "", "", "State champions: Max Leete (126), Russell Canova (175)"],
      [2019, 6, 2, 0, "", "", "State champions: Max Leete (120), Russell Canova (170)"],
      [2018, 8, 0, 0, "Tim Rich", "NEC Champions", "State champion: Max Leete (113)"],
      [2017, 12, 7, 1, "", "", "State champions: Jack Anderson (160), Colby Holland (145), Quintin Holland (170)"],
      [2016, 7, 0, 0, "Mark DeCiccio", "NEC Champions", "State champion: Colby Holland (132)"],
      [2015, 12, 6, 0, "Mark DeCiccio", "NEC Champions", "State champions: Chris Behen (138), Colby Holland (113), Quintin Holland (152)"],
      [2014, 9, 11, 0, "Mark DeCiccio", "", ""],
      [2013, 5, 15, 0, "Mark DeCiccio", "", ""],
      [2012, null, null, null, "Mark DeCiccio", "", ""],
      [2011, null, null, null, "Mark DeCiccio", "", ""]
    ],
    honors: [
      { year: 2026, captains: "", allLeague: "Logan Jacques (NEC All-Star)", note: "" },
      { year: 2025, captains: "", allLeague: "Logan Jacques, JJ Rand", note: "" },
      { year: 2024, captains: "Mark Haskins, Adam Guzofski, Zach Trohon", allLeague: "Adam Guzofski", note: "Adam Guzofski: Division 3 state champion at 285 pounds and All-State qualifier" },
      { year: 2023, captains: "Matt Dowling, Mark Haskins, Reagan Little, Zachary Zoladz", allLeague: "", note: "" },
      { year: 2018, captains: "", allLeague: "", note: "Tim Rich: NEC Coach of the Year" },
      { year: 2016, captains: "", allLeague: "", note: "Mark DeCiccio: NEC Coach of the Year" },
      { year: 2015, captains: "", allLeague: "", note: "Mark DeCiccio: NEC Coach of the Year" },
      { year: 2014, captains: "Chris Behen, Sam Anderson, Chris Davis", allLeague: "", note: "" },
      { year: 2013, captains: "Matt Chigas, Sam Anderson", allLeague: "", note: "" }
    ],
    legendsNote: "State champions and record holders from the school's team page and record book.",
    legends: [
      {
        name: "Max Leete",
        role: "State champion 2018, 2019, 2020",
        bio: "The program's all-time wins leader with 207, and the holder of the single-season record with 57. Leete won three straight state titles, moving up a weight class each year: 113, 120 and 126 pounds.",
        tags: ["207 career wins", "57 wins in a season", "3 state titles"]
      },
      {
        name: "Colby Holland",
        role: "State champion 2015, 2016, 2017",
        bio: "The program's first three-time state champion. Holland won at 113 pounds in 2015, at 132 in 2016 and at 145 in 2017, with the Falcons winning NEC titles along the way.",
        tags: ["3 state titles", "113 · 132 · 145 lbs."]
      },
      { name: "Quintin Holland", role: "State champion 2015, 2017", bio: "A two-time state champion, at 152 pounds in 2015 and at 170 in 2017. He and Colby Holland each won a title in both of those years.", tags: ["2 state titles", "152 · 170 lbs."] },
      { name: "Russell Canova", role: "State champion 2019, 2020", bio: "Won back-to-back state titles in the upper weights, at 170 pounds in 2019 and 175 in 2020.", tags: ["2 state titles", "170 · 175 lbs."] },
      {
        name: "Adam Guzofski",
        role: "State champion 2024 · Assistant coach",
        bio: "The Division 3 state champion at 285 pounds in 2024, an All-State qualifier and a team captain. His 36 wins are second on the single-season list. He now coaches the Falcons as an assistant.",
        tags: ["D3 state champion", "36 wins in a season", "Captain"]
      },
      {
        name: "Mark DeCiccio",
        role: "Head coach · 2011–2016",
        bio: "The program's first head coach. DeCiccio built the team from its first season to back-to-back NEC championships in 2015 and 2016 and was the conference's Coach of the Year both winters.",
        tags: ["First head coach", "2 NEC titles", "2× NEC Coach of the Year"]
      }
    ],
    champions: [
      ["2024", "Adam Guzofski", "Division 3 state champion · 285 lbs."],
      ["2020", "Max Leete", "State champion · 126 lbs."],
      ["2020", "Russell Canova", "State champion · 175 lbs."],
      ["2019", "Max Leete", "State champion · 120 lbs."],
      ["2019", "Russell Canova", "State champion · 170 lbs."],
      ["2018", "Max Leete", "State champion · 113 lbs."],
      ["2017", "Jack Anderson", "State champion · 160 lbs."],
      ["2017", "Colby Holland", "State champion · 145 lbs."],
      ["2017", "Quintin Holland", "State champion · 170 lbs."],
      ["2016", "Colby Holland", "State champion · 132 lbs."],
      ["2015", "Chris Behen", "State champion · 138 lbs."],
      ["2015", "Colby Holland", "State champion · 113 lbs."],
      ["2015", "Quintin Holland", "State champion · 152 lbs."]
    ],
    records: {
      "Program Records": {
        "Career wins": [["Max Leete", "207", ""]],
        "Wins in a season": [["Max Leete", "57", ""], ["Adam Guzofski", "36", ""]],
        "State titles": [["Colby Holland", "3", "2015 · 2016 · 2017"], ["Max Leete", "3", "2018 · 2019 · 2020"], ["Quintin Holland", "2", "2015 · 2017"], ["Russell Canova", "2", "2019 · 2020"]],
        "Best dual-meet seasons": [["2017–18", "8–0", "Coach Tim Rich · NEC champions"], ["2015–16", "7–0", "Coach Mark DeCiccio · NEC champions"], ["2021–22", "10–1", "Coach Mike Anderson · NEC champions"]]
      }
    },
    milestones: [
      { year: "2011", text: "Danvers High School wrestling begins under head coach Mark DeCiccio." },
      { year: "2015", text: "A 12–6 season brings the program's first NEC championship in the record book, and three Falcons win state titles: Chris Behen at 138 pounds, Colby Holland at 113 and Quintin Holland at 152." },
      { year: "2016", text: "The Falcons go 7–0 in dual meets and win the NEC again. Colby Holland takes his second state title, at 132 pounds." },
      { year: "2017", text: "Three more state champions: Jack Anderson at 160 pounds, Colby Holland at 145 and Quintin Holland at 170." },
      { year: "2018", text: "An 8–0 dual-meet season and another NEC championship under Tim Rich, the conference's Coach of the Year. Max Leete wins his first state title, at 113 pounds." },
      { year: "2020", text: "Max Leete wins his third straight state title, at 126 pounds, and Russell Canova his second, at 175." },
      { year: "2022", text: "The Falcons go 10–1 under Mike Anderson and are NEC champions." },
      { year: "2024", text: "Adam Guzofski wins the Division 3 state championship at 285 pounds and qualifies for All-States." }
    ],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every meet, time and change on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "Watch", title: "Home meets on NFHS Network", text: "Danvers High School streams home events on the NFHS Network.", url: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma", go: "NFHS Network" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/wrestling/", go: "danverspublicschools.org" },
      {
        kind: "History",
        title: "Record book",
        text: "Season records, coaches, captains and the program's wins leaders.",
        url: "https://docs.google.com/spreadsheets/d/1smxaVhd4j4EcqWxkuHkSh6I80dgGpbHQutp4sVk-qz0/edit?gid=1756060361#gid=1756060361",
        go: "Record book"
      }
    ],
    news: [],
    photos: []
  }
};
