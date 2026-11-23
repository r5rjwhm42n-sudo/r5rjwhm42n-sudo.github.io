/* =====================================================================
   DANVERS FALCONS SWIM & DIVE — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left off
   the site until it is known.

   A MEET on the schedule:
     id, date ("2026-12-15T16:00", Eastern time), opponent, mascot,
     home (true/false), league (true = NEC meet), site (the pool)
     name: "NEC Championship"               a meet with several teams
     result: "W" / "L" / "T" (null until it's swum), us, them    the team score
     place: "3rd of 10"                     the finish at a meet with several teams
     summary: a short recap    notes: ["bullet", ...]    sources: [{ label, url }]

   An ATHLETE on the roster: { name, pos: ["Freestyle"], grade: "Sr.", captain: true }

   Sources: the school's team page.
   ===================================================================== */

const SPORT = {
  key: "swim-dive", name: "Swim & Dive", season: "2026–27",
  game: "meet", games: "meets", players: "swimmers and divers", start: "Start Time",
  scoreWord: "Points", lineTitle: "", periods: [], boxTitle: "Results",
  stats: [],
  ties: false, spanYears: true
};

const SCHOOL = {
  school: "Danvers High School", name: "Danvers Falcons", location: "Danvers, MA",
  conference: "Northeastern Conference", athletics: "https://www.danversfalconsathletics.com/"
};

const TEAMS = {
  varsity: {
    label: "Swim & Dive",
    short: "Varsity",
    headCoach: "Meghan Beaulieu",
    heroTitle: "Falcons open Dec. 17 at Peabody",
    preview: "The co-ed swimming and diving team opens Thursday, Dec. 17 at Peabody, at the Peabody YMCA. Eight meets are on the schedule, with three at home at St. John's Prep in January. Practice begins Monday, Nov. 30.",
    stripTile: ["State tournament", "D2 North", "Boys and girls · MIAA"],
    noScheduleNote: "This winter's meets haven't been posted yet. Practice begins Monday, Nov. 30 at St. John's Prep.",
    scheduleNote: "The schedule is from the school's ArbiterLive page and can change. The NEC meet and the MIAA state meets follow for swimmers and divers who qualify.",
    links: { school: "https://danverspublicschools.org/dhs/athletics/swimming-and-diving/", schedule: "https://www.arbiterlive.com/Teams?entityId=5538" },
    staff: [["Head coach", "Meghan Beaulieu", "A Danvers High graduate who swam at Babson College"], ["Assistant coaches", "Graham Beck, Ezra Lombardi & Maddie Butler"]],
    about: [
      "Danvers has a co-ed swimming and diving program at the varsity and junior varsity levels. Boys and girls practice together five to six days a week, with a meet most weeks.",
      "Home meets are at St. John's Prep, an eight-lane, 25-yard pool with starting blocks and a diving board. The Falcons swim in the Northeastern Conference against Beverly, Marblehead, Peabody and Swampscott, and swimmers and divers qualify each year for the NEC meet at Salem State University. In the MIAA state tournament, the boys and girls both compete in Division 2 North.",
      "Head coach Meghan Beaulieu played soccer, swam and played softball at Danvers High before swimming at Babson College. She teaches business at the high school. Program information from the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted after practice begins Monday, Nov. 30.",
    schedule: [
      { id: 1, date: "2026-12-17T19:30", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "Peabody YMCA, Peabody", result: null },
      { id: 2, date: "2026-12-23T19:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Lynch/van Otterloo YMCA, Marblehead", result: null },
      { id: 3, date: "2027-01-06T19:00", opponent: "Swampscott", mascot: "Big Blue", home: false, league: true, site: "Jewish Community Center, Marblehead", result: null },
      { id: 4, date: "2027-01-07T20:00", opponent: "Hamilton-Wenham", mascot: "Generals", home: false, league: true, site: "Gordon College, Wenham", result: null },
      { id: 5, date: "2027-01-11T17:00", opponent: "Lynn Classical", home: false, league: false, site: "Lynn Vocational Technical Institute, Lynn", result: null },
      { id: 6, date: "2027-01-13T19:30", opponent: "Gloucester", mascot: "Fishermen", home: true, league: true, site: "St. John's Prep, 72 Spring Street, Danvers", result: null, notes: ["A home meet at St. John's Prep"] },
      { id: 7, date: "2027-01-20T19:30", opponent: "Salem", mascot: "Witches", home: true, league: true, site: "St. John's Prep, 72 Spring Street, Danvers", result: null, notes: ["A home meet at St. John's Prep"] },
      { id: 8, date: "2027-01-27T19:30", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: "St. John's Prep, 72 Spring Street, Danvers", result: null, notes: ["A home meet at St. John's Prep"] }
    ],
    players: [],
    pastIntro: "The last three winters, meet by meet, with team scores.",
    past: [
      {
        season: "2025–26",
        record: "2–4",
        coach: "Meghan Beaulieu",
        games: [
          ["2025-12-19", 0, "Masconomet", "NEC", "L", 74, 88, ""],
          ["2025-12-20", 0, "NEC Dive", "NEC", null, null, null, "7 teams"],
          ["2026-01-06", 1, "Marblehead", "NEC", "L", 81, 92, ""],
          ["2026-01-11", 0, "NEC Dive", "NEC", null, null, null, "8 teams"],
          ["2026-01-14", 1, "Swampscott", "NEC", "W", 88, 79, ""],
          ["2026-01-19", 0, "Salem", "NEC", null, null, null, "No score on file"],
          ["2026-01-23", 1, "Peabody", "NEC", "L", 88, 92, ""],
          ["2026-01-28", 0, "Gloucester", "NEC", null, null, null, "No score on file"],
          ["2026-01-30", 0, "NEC Dive Championships", "NEC", null, null, null, "7 teams"],
          ["2026-01-31", 0, "NEC Swim Championships", "NEC", null, null, null, "7 teams"]
        ],
        note: "Every meet on the school's ArbiterLive schedule, with the scores entered there; two duals have no score on file. The season record is from the school's team page.",
        photo: { src: "../images/teams/swim-dive.jpg", caption: "The 2025–26 Danvers swim and dive team. Photo from the Danvers High School athletics page." },
        post: "Zachary Cotter and Max Scott swam at the Division 2 state meet",
        keyPlayers: [
          { name: "Zachary Cotter", note: "Senior. Qualified for the Division 2 state meet in the 100 freestyle and the 100 backstroke; NEC All-Conference the winter before." },
          { name: "Max Scott", note: "Qualified for the Division 2 state meet in the 100 breaststroke (seeded 1:06.41); NEC All-Conference the winter before." }
        ]
      },
      {
        season: "2024–25",
        games: [
          ["2024-12-19", 1, "Beverly", "NEC", null, null, null, "No score on file"],
          ["2024-12-19", 1, "Peabody", "NEC", "L", 80, 102, ""],
          ["2025-01-09", 1, "Masconomet", "NEC", "L", 81, 103, ""],
          ["2025-01-15", 0, "Swampscott", "NEC", "W", 94, 89, ""],
          ["2025-01-16", 1, "Salem", "NEC", "W", 93, 57, ""],
          ["2025-01-21", 0, "Peabody", "NEC", "L", 84, 102, ""],
          ["2025-01-23", 0, "Marblehead", "NEC", "L", 75, 103, ""],
          ["2025-01-28", 1, "Gloucester", "NEC", "W", 95, 88, ""]
        ],
        allLeague: "Zachary Cotter, Max Scott",
        allStars: "Caleb Clark",
        note: "Every meet on the school's ArbiterLive schedule, with the scores entered there; the record counts the meets with a score. Honors from the school's team page.",
        record: "3–4",
        keyPlayers: [{ name: "Zachary Cotter", note: "NEC All-Conference and a Salem News all-star." }, { name: "Max Scott", note: "NEC All-Conference." }, { name: "Caleb Clark", note: "NEC All-Star." }]
      },
      {
        season: "2023–24",
        games: [
          ["2023-12-07", 1, "Beverly", "NEC", "W", 93, 65, ""],
          ["2023-12-20", 1, "Marblehead", "NEC", "L", 74, 96, ""],
          ["2024-01-03", 1, "Swampscott", "NEC", "W", 96, 82, ""],
          ["2024-01-10", 0, "Salem", "NEC", "W", 100, 66, ""],
          ["2024-01-17", 1, "Peabody", "NEC", "L", 83, 94, ""],
          ["2024-01-19", 0, "Masconomet", "NEC", "L", 85, 93, ""],
          ["2024-01-23", 0, "Gloucester", "NEC", null, null, null, "No score on file"]
        ],
        note: "Every meet on the school's ArbiterLive schedule, with the scores entered there; the record counts the meets with a score.",
        record: "3–3"
      }
    ],
    historyIntro: "A co-ed program with the 1991 Northeastern Conference championship, two NEC Male Swimmers of the Year in Graham Beck (2011) and Jared Casey (2019), and a coach, Meghan Beaulieu, twice named NEC Coach of the Year.",
    banners: [],
    necTitles: [1991],
    historyNote: "No swim and dive record book is posted. The NEC title is from the school's team page; season records since 2021–22 count the dual meets with a score on ArbiterLive, except 2021–22 (4–3), from the Salem News, and 2025–26, from the school's team page.",
    seasons: [[2026, 2, 4, 0, "Meghan Beaulieu", "", "2 swimmers at the Division 2 state meet"], [2025, 3, 4, 0, "", "", ""], [2024, 3, 3, 0, "", "", ""], [2023, 1, 2, 0, "", "", ""], [2022, 4, 3, 0, "", "", "3rd at the NEC Championships"]],
    honors: [
      { year: 2026, captains: "", allLeague: "", note: "Division 2 state meet: Zachary Cotter (100 free, 100 back), Max Scott (100 breaststroke)" },
      { year: 2025, captains: "", allLeague: "Zachary Cotter, Max Scott", note: "NEC All-Star: Caleb Clark; Salem News all-star: Zachary Cotter" },
      { year: 2023, captains: "", allLeague: "Spencer Keyes", note: "NEC All-Stars: Kylee McGraw, Zachary Cotter" },
      { year: 2019, captains: "", allLeague: "", note: "Jared Casey, NEC Male Swimmer of the Year; Jack O'Neill, NEC Male Diver of the Year; Meghan Beaulieu, NEC Coach of the Year" },
      { year: 2017, captains: "", allLeague: "", note: "Meghan Beaulieu, NEC Coach of the Year" },
      { year: 2011, captains: "", allLeague: "", note: "Graham Beck, NEC Male Swimmer of the Year" }
    ],
    legends: [],
    milestones: [
      { year: "1991", text: "Danvers wins the Northeastern Conference swimming championship." },
      { year: "2008", text: "Danvers and Marblehead meet unbeaten for the NEC title at the Danvers YMCA; Marblehead wins, 58–41." },
      { year: "2011", text: "Graham Beck is named NEC Male Swimmer of the Year." },
      { year: "2017", text: "Meghan Beaulieu is named NEC Coach of the Year." },
      { year: "2019", text: "Three of the NEC's top swimming awards go to Danvers: Jared Casey is Male Swimmer of the Year, Jack O'Neill Male Diver of the Year, and Meghan Beaulieu Coach of the Year for the second time." },
      { year: "2022", text: "After an 0–3 start the Falcons win their last four meets, against Salem, Peabody, Gloucester and Masconomet, and place 3rd at the NEC Championships." },
      { year: "2025", text: "Zachary Cotter and Max Scott are named NEC All-Conference and Caleb Clark an NEC All-Star." },
      { year: "2026", text: "Zachary Cotter (100 freestyle, 100 backstroke) and Max Scott (100 breaststroke) swim at the MIAA Division 2 state meet." }
    ],
    follow: [
      { kind: "Instagram", title: "@dhs_swimstagram", text: "Danvers Swim, the swim and dive team's own Instagram.", url: "https://www.instagram.com/dhs_swimstagram/", go: "Instagram" },
      { kind: "Schedule", title: "Official schedule", text: "Every meet, time and change on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/swimming-and-diving/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" },
      { kind: "Instagram", title: "@danversfalconsathletics", text: "The Danvers High School athletic department's Instagram: game days, results and photos for every team.", url: "https://www.instagram.com/danversfalconsathletics/", go: "Instagram" }
    ],
    news: [],
    photos: [],
    seasonsLabel: "on file",
    recordsNote: "A season is listed by the year it ended, and blank cells are details not on file.",
    honorsNote: "NEC awards from the Daily Item and the Salem News, 2025 picks from the school's team page and state qualifiers from the MIAA's meet program. Captains aren't posted for these seasons."
  }
};
