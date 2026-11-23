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
        name: "Preseason practice meet",
        opponent: "Triton and three more teams",
        home: false,
        league: false,
        scrimmage: true,
        site: "Site to be announced",
        result: null,
        notes: ["A preseason practice meet with Triton and three other teams", "Not counted in the record", "The school's schedule first listed it at Marblehead with five other teams; it now lists Triton, with the site to be announced"]
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
        date: "2026-12-23T12:30",
        name: "Meet at Marshfield",
        opponent: "Marshfield and four more teams",
        home: false,
        league: false,
        tournament: true,
        site: "Marshfield High School, Marshfield",
        result: null,
        notes: ["A holiday-week meet at Marshfield High School with Marshfield and four other teams", "Starts at 12:30 PM"]
      },
      {
        id: 7,
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
      { id: 8, date: "2027-01-06T17:30", opponent: "Salem", mascot: "Witches", home: true, league: true, site: "Danvers High School (Vye Gym), Danvers", result: null },
      {
        id: 9,
        date: "2027-01-09T09:00",
        name: "Tri-meet at Wilmington",
        opponent: "Wilmington and one more team",
        home: false,
        league: false,
        tag: "Tri-meet",
        site: "Wilmington High School, Wilmington",
        result: null,
        notes: ["A Saturday-morning meet at Wilmington High School with Wilmington and one other team"]
      },
      { id: 10, date: "2027-01-13T19:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: true, site: "Gloucester High School, Gloucester", result: null },
      { id: 11, date: "2027-01-20T18:30", opponent: "Marblehead/Swampscott", home: false, league: true, site: "Marblehead High School, Marblehead", result: null, notes: ["Marblehead and Swampscott wrestle as one co-op team"] },
      {
        id: 12,
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
      { id: 13, date: "2027-01-27T19:30", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Beverly High School, Beverly", result: null },
      { id: 14, date: "2027-02-02T17:30", opponent: "Pentucket", mascot: "Panthers", home: true, league: false, site: "Danvers High School (Vye Gym), Danvers", result: null }
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
        games: [
          ["2025-12-13", 0, "Winchester and 13 more teams", "Non-league", null, null, null, "Tournament"],
          ["2025-12-17", 0, "Salem", "NEC", "L", 24, 48, ""],
          ["2025-12-18", 0, "Triton", "Non-league", "W", 46, 36, "", "Logan Jacques, Tommy Duval, and Drew McMahon picked up wins as the Falcons (1-1) secured a nonleague road win."],
          ["2025-12-20", 0, "Marlborough and 20 more teams", "Non-league", null, null, null, "Tournament"],
          ["2025-12-23", 0, "Marshfield and four more teams", "Non-league", null, null, null, "Tournament"],
          ["2025-12-30", 0, "Wayland", "Non-league", "L", 12, 71, ""],
          ["2026-01-03", 1, "Lynnfield/North Reading", "Non-league", "L", 23, 53, ""],
          ["2026-01-07", 0, "Gloucester", "NEC", "L", 34, 48, "", "Aiden DeCoste (138 pounds) earned a quick pin to start the comeback from down 22-6 for the Fishermen (6-4), who dominated from that point to take the Northeastern Conference tilt."],
          ["2026-01-10", 0, "Canton and 13 more teams", "Tournament", null, null, null, "Tournament"],
          [
            "2026-01-14",
            1,
            "Marblehead/Swampscott",
            "NEC",
            "L",
            33,
            42,
            "",
            "James Carey (113), Kenney Drolete (120), Liam O'Brien (138), Nolan Glass (150), Andrew Delisle (157), Colin Hart (175), and Colin Homan (190) won by pin for the Magicians in a Northeastern road win."
          ],
          ["2026-01-15", 1, "Essex Tech", "NEC", "L", 28, 42, ""],
          ["2026-01-17", 1, "Hope (R.I.)", "Non-league", "L", 12, 67, ""],
          ["2026-01-17", 0, "King Philip", "Non-league", "L", 24, 50, ""],
          ["2026-01-21", 1, "Beverly", "NEC", "L", 18, 57, ""],
          ["2026-01-24", 0, "Whittier and two more teams", "NEC", null, null, null, "Tournament"],
          ["2026-01-27", 0, "Beverly", "NEC", null, null, null, "No score on file"],
          ["2026-01-28", 1, "Quincy Upper", "Non-league", "W", 48, 18, ""],
          ["2026-01-28", 1, "Saugus/Peabody", "NEC", "L", 21, 54, ""],
          ["2026-01-31", 0, "Beverly and two more teams", "NEC", null, null, null, "Tournament"],
          ["2026-01-31", 0, "CAL/NEC Open", "Tournament", null, null, null, "Tournament"],
          ["2026-02-04", 0, "Pentucket", "Non-league", "L", 15, 57, ""],
          ["2026-02-07", 0, "North Andover and five more teams", "Non-league", null, null, null, "Tournament"],
          ["2026-02-14", 0, "MIAA Division 3 North Sectional", "State", "12th", "61 pts", null, "14 teams scored"]
        ],
        photo: { src: "../images/teams/wrestling.jpg", caption: "The 2025–26 Danvers wrestling team. Photo from the Danvers High School athletics page." },
        note: "Every meet on the school's ArbiterLive schedule for the season. Scores come from ArbiterLive and the Boston Globe; tournaments are scored for individuals, and a few duals have no score on file. The season record is from the school's record book. Game stories from the Boston Globe's high school scoreboard. Open a meet to read its story. At the Division 3 state meet Logan Jacques (126 pounds) placed 6th and Dylan Kinney wrestled at 285; Danvers scored 11.5 points, 40th in the state. At the Division 3 North sectional Danvers scored 61 points with a 3rd-place finisher, a 4th and three 6ths; Tyngsborough/Dracut won.",
        keyPlayers: [
          { name: "Logan Jacques", note: "NEC All-Star. Placed 6th at 126 pounds at the Division 3 state meet, a year after placing 5th at the North sectional." },
          { name: "Tommy Duval and Drew McMahon", note: "Won their bouts in the win at Triton." },
          { name: "Dylan Kinney", note: "Qualified for the Division 3 state meet at 285 pounds from the North sectional." }
        ],
        post: "12th of 14 at the Division 3 North sectional; Logan Jacques 6th at 126 pounds at the Division 3 state meet"
      },
      {
        season: "2024–25",
        record: "1–13–2",
        coach: "Jake Almon",
        finish: "10th",
        allLeague: "Logan Jacques, JJ Rand",
        games: [
          ["2024-12-14", 1, "Foxborough", "Non-league", "L", 9, 67, ""],
          ["2024-12-14", 0, "Northeast/Bishop Fenwick", "Non-league", "L", 30, 45, ""],
          ["2024-12-14", 0, "Westford", "Non-league", "L", 18, 59, ""],
          ["2024-12-18", 0, "Gloucester", "NEC", "L", 12, 71, "", "The Fishermen (1-0-0) soared past their Northeastern Conference opponents, winning 10 events by pin and sophomore Anthony Murawski won by technical fall."],
          [
            "2024-12-19",
            1,
            "Triton",
            "Non-league",
            "L",
            6,
            78,
            "",
            "With pins from Riley-Anne Tamry (106 pounds), Alex Sabino (126), Austin Scolamiero (132), Sam Imlach (138), Ben Imlach (144), Jake Mies (157), Jared Coady (165), Amir Almami (175), Nolan Merrill (190), and Anthony Navaroli (285), the Vikings (5-0) picked up a nonleague road win."
          ],
          ["2024-12-27", 0, "Pentucket and 17 more teams", "NEC", null, null, null, "Tournament"],
          ["2025-01-02", 0, "Excel Academy", "Non-league", "L", 15, 66, ""],
          ["2025-01-04", 0, "Lynnfield/North Reading", "Non-league", "L", 15, 54, ""],
          ["2025-01-08", 1, "Lynn Tech", "Non-league", "W", 62, 18, ""],
          ["2025-01-08", 1, "Marblehead/Swampscott", "NEC", "L", 18, 66, ""],
          ["2025-01-16", 1, "Essex Tech/Masconomet", "NEC", "T", 42, 42, ""],
          ["2025-01-22", 0, "Saugus/Peabody", "NEC", "L", 21, 54, ""],
          ["2025-01-28", 1, "Salem", "NEC", "L", 12, 59, ""],
          ["2025-02-01", 0, "Triton and five more teams", "NEC", null, null, null, "Tournament"],
          ["2025-02-05", 0, "Pentucket", "Non-league", null, null, null, "No score on file"],
          ["2025-02-12", 0, "Beverly", "NEC", "L", 18, 53, ""]
        ],
        note: "Every meet on the school's ArbiterLive schedule for the season. Scores come from ArbiterLive and the Boston Globe; tournaments are scored for individuals, and a few duals have no score on file. The season record is from the school's record book. Game stories from the Boston Globe's high school scoreboard. Open a meet to read its story. At the Division 3 North sectional Danvers scored 43 points, 13th, with two 5th-place finishers: JJ Rand at 113 pounds and Logan Jacques at 126.",
        post: "13th at the Division 3 North sectional (43 points)",
        keyPlayers: [{ name: "Logan Jacques", note: "NEC All-Conference; 5th at 126 pounds at the Division 3 North sectional." }, { name: "JJ Rand", note: "NEC All-Conference; 5th at 113 pounds at the Division 3 North sectional." }]
      },
      {
        season: "2023–24",
        record: "2–18",
        coach: "Jake Almon",
        finish: "8th",
        captains: "Mark Haskins, Adam Guzofski, Zach Trohon",
        allLeague: "Adam Guzofski",
        awards: "Adam Guzofski, Division 3 state champion at 285 pounds and All-State qualifier · Salem News all-star: Adam Guzofski",
        games: [
          ["2023-12-09", 0, "Methuen and two more teams", "NEC", null, null, null, "Tournament"],
          ["2023-12-13", 1, "Marblehead", "NEC", "W", 46, 36, ""],
          ["2023-12-14", 0, "Triton", "NEC", "L", 27, 54, ""],
          ["2023-12-20", 1, "Beverly", "NEC", "L", 24, 58, ""],
          ["2023-12-30", 1, "Lynnfield and one more team", "Non-league", null, null, null, "Tournament"],
          ["2023-12-30", 1, "North Middlesex", "Non-league", null, null, null, "No score on file"],
          ["2024-01-03", 1, "Excel Academy East Boston", "Non-league", "L", 19, 54, ""],
          ["2024-01-10", 1, "Saugus", "NEC", null, null, null, "No score on file"],
          ["2024-01-17", 0, "Salem", "NEC", "L", 13, 60, ""],
          ["2024-01-19", 1, "Essex Tech and one more team", "Non-league", "L", 33, 36, ""],
          ["2024-01-24", 1, "Gloucester", "NEC", "L", 21, 60, ""],
          ["2024-01-27", 0, "Gloucester and ten more teams", "NEC", null, null, null, "Tournament"],
          ["2024-01-31", 1, "Pentucket", "NEC", "L", 26, 51, ""]
        ],
        note: "Every meet on the school's ArbiterLive schedule for the season. Scores come from ArbiterLive and the Boston Globe; tournaments are scored for individuals, and a few duals have no score on file. The season record is from the school's record book."
      }
    ],
    historyIntro: "A program that started in 2011, won its first conference title four years later and has sent seven wrestlers to the top of the state podium.",
    banners: [],
    necTitles: [2015, 2016, 2018, 2022],
    historyNote: "Title seasons follow the record book, listed by the year each season ended. The school's team page lists NEC championships in 2014, 2015, 2016 and 2018.",
    historyTile: ["State champions", 13, "7 wrestlers · 2015 to 2024"],
    seasons: [
      [2026, 3, 23, 0, "Tom Savage", "9th", "Jacques 6th at states (126)"],
      [2025, 1, 13, 2, "Jake Almon", "10th", "13th at the D3 North sectional"],
      [2024, 2, 18, 0, "Jake Almon", "8th", "State champion: Adam Guzofski (285)"],
      [2023, 3, 6, 0, "Jake Almon", "", ""],
      [2022, 10, 1, 0, "Mike Anderson", "NEC Champions", ""],
      [2021, 3, 4, 1, "Mike Anderson", "", ""],
      [2020, 4, 3, 0, "", "", "State champions: Max Leete (126), Russell Canova (182)"],
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
      { year: 2026, captains: "", allLeague: "Logan Jacques (NEC All-Star)", note: "Logan Jacques, 6th at the Division 3 state meet (126)" },
      { year: 2025, captains: "", allLeague: "Logan Jacques, JJ Rand", note: "5th at the Division 3 North sectional: JJ Rand (113), Logan Jacques (126)" },
      { year: 2024, captains: "Mark Haskins, Adam Guzofski, Zach Trohon", allLeague: "Adam Guzofski", note: "Adam Guzofski: Division 3 state champion at 285 pounds and All-State qualifier; Salem News all-star: Adam Guzofski" },
      { year: 2023, captains: "Matt Dowling, Mark Haskins, Reagan Little, Zachary Zoladz", allLeague: "", note: "" },
      { year: 2021, captains: "", allLeague: "", note: "Salem News all-stars: Max Leete (126 pounds), Isaac Flores (heavyweight)" },
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
        bio: "The program's all-time wins leader with 207, and the holder of the single-season record with 57. Leete won three straight Division 2 titles and three straight All-State titles, moving up a weight class each year: 113, 120 and 126 pounds.",
        tags: ["207 career wins", "57 wins in a season", "3 All-State titles"]
      },
      {
        name: "Colby Holland",
        role: "State champion 2015, 2016, 2017",
        bio: "The program's first three-time state champion. Holland won at 113 pounds in 2015, at 132 in 2016 and at 145 in 2017, with the Falcons winning NEC titles along the way.",
        tags: ["3 state titles", "113 · 132 · 145 lbs."]
      },
      { name: "Quintin Holland", role: "State champion 2015, 2017", bio: "A two-time state champion, at 152 pounds in 2015 and at 170 in 2017. He and Colby Holland each won a title in both of those years.", tags: ["2 state titles", "152 · 170 lbs."] },
      {
        name: "Russell Canova",
        role: "State champion 2019, 2020",
        bio: "Won back-to-back Division 2 titles in the upper weights, at 170 pounds in 2019 and 182 in 2020, when he also won the All-State title alongside Max Leete.",
        tags: ["2 state titles", "All-State champion 2020", "170 · 182 lbs."]
      },
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
      ["2020", "Max Leete", "All-State and Division 2 champion · 126 lbs."],
      ["2020", "Russell Canova", "All-State and Division 2 champion · 182 lbs."],
      ["2019", "Max Leete", "All-State and Division 2 champion · 120 lbs."],
      ["2019", "Russell Canova", "Division 2 state champion · 170 lbs."],
      ["2018", "Max Leete", "All-State and Division 2 champion · 113 lbs."],
      ["2017", "Jack Anderson", "Division 3 state champion · 160 lbs."],
      ["2017", "Colby Holland", "Division 3 state champion · 145 lbs."],
      ["2017", "Quintin Holland", "Division 3 state champion · 170 lbs."],
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
      { year: "2020", text: "Max Leete wins his third straight All-State title, at 126 pounds, and Russell Canova takes the All-State crown at 182." },
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
      },
      { kind: "Instagram", title: "@danversfalconsathletics", text: "The Danvers High School athletic department's Instagram: game days, results and photos for every team.", url: "https://www.instagram.com/danversfalconsathletics/", go: "Instagram" }
    ],
    news: [],
    photos: [],
    division: "MIAA Division 3"
  }
};
