/* =====================================================================
   DANVERS FALCONS INDOOR TRACK — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left off
   the site until it is known.

   A MEET on a team's schedule:
     id, date ("2026-12-17T16:30", Eastern time), home (true/false), league (true = NEC meet), site
     opponent: "Gloucester"                 a dual meet
     name: "NEC Championship Meet"          a meet with several teams (field: ["Beverly", ...] lists them)
     result: "W" / "L" / "T" (null until it's run), us, them     a dual meet's team score
     place: "3rd of 10"                     the finish at a meet with several teams
     summary: a short recap    notes: ["bullet", ...]    sources: [{ label, url }]

   An ATHLETE on a roster: { name, pos: ["Sprints"], grade: "Sr.", captain: true }

   Sources: the school's team page (coaches, records, honors) and the
   Falcons athletics site (schedule).
   ===================================================================== */

const SPORT = {
  key: "indoor-track", name: "Indoor Track", season: "2026–27",
  game: "meet", games: "meets", players: "athletes", start: "Start Time",
  scoreWord: "Points", lineTitle: "", periods: [], boxTitle: "Results",
  stats: [],
  ties: true, spanYears: true
};

const SCHOOL = {
  school: "Danvers High School", name: "Danvers Falcons", location: "Danvers, MA",
  conference: "Northeastern Conference", athletics: "https://www.danversfalconsathletics.com/"
};

const TEAMS = {
  /* ================================ BOYS ================================ */
  boys: {
    label: "Boys Indoor Track",
    short: "Boys",
    headCoach: "Tom Walsh",
    heroTitle: "Falcons open Dec. 10 at Marblehead",
    preview: "The indoor season starts Thursday, Dec. 10 with a conference meet at Marblehead, then Swampscott on Dec. 17. The Falcons host two meets in the field house in January, and the NEC Championship is Saturday, Jan. 30 at the Reggie Lewis Center. Practice begins Monday, Nov. 30.",
    stripTile: ["NEC Championship", "Jan 30", "Reggie Lewis Center, Boston"],
    scheduleNote: "The schedule is from the school's ArbiterLive page and the Falcons athletics site, and can change. State divisional and All-State meets follow the conference championship for athletes who qualify.",
    links: { school: "https://danverspublicschools.org/dhs/athletics/winter-track-and-field/", schedule: "https://www.arbiterlive.com/Teams?entityId=5538" },
    staff: [["Head coach", "Tom Walsh"], ["Assistant coaches", "Tim West, Pat Hennessey & Jeff Bartlett"]],
    about: [
      "Danvers runs winter track and field for boys and girls of every experience level. No background is needed, and many Falcons are multi-sport athletes trying the sport for the first time. Athletes are encouraged to try different events through the season.",
      "The Falcons compete in the Northeastern Conference against schools such as Marblehead, Peabody and Saugus, and the meets with Beverly and Swampscott are the most anticipated of the winter. Each year Danvers athletes qualify for the state divisional and All-State meets.",
      "Boys and girls home meets are held together in the Danvers High School field house, 60 Cabot Road. Program information from the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted after practice begins Monday, Nov. 30.",
    schedule: [
      {
        id: 1,
        date: "2026-12-10T16:30",
        name: "NEC meet at Marblehead",
        opponent: "Marblehead and one more team",
        home: false,
        league: true,
        site: "Marblehead High School, Marblehead",
        result: null,
        notes: ["The season opener: a conference meet with Marblehead and one other team", "The school's schedule lists it at Marblehead"]
      },
      {
        id: 2,
        date: "2026-12-17T16:30",
        name: "NEC meet at Swampscott",
        opponent: "Swampscott, Masconomet and Salem",
        home: false,
        league: true,
        site: "Swampscott High School, Swampscott",
        field: ["Swampscott", "Masconomet", "Salem"],
        result: null,
        notes: ["The season opener: a conference meet with Swampscott, Masconomet and Salem"]
      },
      {
        id: 3,
        date: "2026-12-28T14:00",
        name: "NEC Invitational",
        opponent: "NEC Invitational",
        home: false,
        league: true,
        tournament: true,
        site: "The Track at New Balance, Brighton",
        field: ["Beverly", "Gloucester", "Marblehead", "Masconomet", "Peabody", "Salem", "Saugus", "Swampscott", "Winthrop"],
        result: null,
        notes: ["Doors open at 2:00 PM", "Every Northeastern Conference team in one meet"]
      },
      {
        id: 4,
        date: "2026-12-29T09:30",
        name: "NEC Freshman/Sophomore Championship",
        opponent: "NEC Freshman/Sophomore Championship",
        home: false,
        league: true,
        tournament: true,
        site: "Gloucester High School, Gloucester",
        field: ["Beverly", "Gloucester", "Marblehead", "Masconomet", "Peabody", "Salem", "Saugus", "Swampscott", "Winthrop"],
        result: null,
        notes: ["The conference championship for ninth and tenth graders"]
      },
      {
        id: 5,
        date: "2027-01-06T16:30",
        name: "Home meet: Beverly, Saugus and Winthrop",
        opponent: "Beverly, Saugus and Winthrop",
        home: true,
        league: true,
        site: "Danvers High School Field House, Danvers",
        field: ["Beverly", "Saugus", "Winthrop"],
        result: null,
        notes: ["Beverly, Saugus and Winthrop come to the Danvers field house"]
      },
      {
        id: 6,
        date: "2027-01-13T16:30",
        name: "NEC meet at Swampscott",
        opponent: "Swampscott and Peabody",
        home: false,
        league: true,
        site: "Swampscott High School, Swampscott",
        field: ["Swampscott", "Peabody"],
        result: null,
        notes: ["A conference meet with Swampscott and Peabody"]
      },
      {
        id: 7,
        date: "2027-01-20T16:30",
        opponent: "Gloucester",
        mascot: "Fishermen",
        home: false,
        league: true,
        site: "Gloucester High School, Gloucester",
        result: null,
        notes: ["A double dual at Gloucester: Danvers faces Gloucester while Winthrop faces Masconomet"]
      },
      {
        id: 8,
        date: "2027-01-27T16:30",
        name: "Home meet: Salem and Saugus",
        opponent: "Salem and Saugus",
        home: true,
        league: true,
        site: "Danvers High School Field House, Danvers",
        field: ["Salem", "Saugus"],
        result: null,
        notes: ["Salem and Saugus come to the Danvers field house"]
      },
      {
        id: 9,
        date: "2027-01-30T08:30",
        name: "NEC Championship Meet",
        opponent: "NEC Championship Meet",
        home: false,
        league: true,
        tournament: true,
        site: "Reggie Lewis Center, Boston",
        field: ["Beverly", "Gloucester", "Marblehead", "Masconomet", "Peabody", "Salem", "Saugus", "Swampscott", "Winthrop"],
        result: null,
        notes: ["The Northeastern Conference championship"]
      }
    ],
    players: [],
    pastIntro: "The last three winters: every meet on the school's schedule, the MIAA Division 4 championship and the athletes who scored there.",
    past: [
      {
        season: "2025–26",
        record: "3–6",
        coach: "Tom Walsh",
        allLeague: "Zach Dunn",
        allStars: "Julian Capece",
        games: [
          ["2025-12-12", 0, "Marblehead and eight more teams", "NEC", null, null, null, "Multi-team meet"],
          ["2025-12-17", 1, "Masconomet", "NEC", "L", 37, 49, ""],
          ["2025-12-29", 0, "Swampscott and eight more teams", "NEC", null, null, null, "Multi-team meet"],
          ["2026-01-07", 0, "Gloucester and one more team", "NEC", null, null, null, "Multi-team meet"],
          ["2026-01-14", 0, "Peabody", "NEC", null, null, null, "No score on file"],
          ["2026-01-22", 1, "Salem", "NEC", null, null, null, "No score on file"],
          ["2026-01-28", 0, "Marblehead", "NEC", "L", 37, 45, ""],
          ["2026-01-31", 0, "NEC Championship", "NEC", "7th", "34 pts", null, "Reggie Lewis Center, Roxbury · 7th of 10; Marblehead won with 93"],
          ["2026-02-05", 1, "Beverly", "NEC", "L", 39, 47, ""],
          ["2026-02-13", 0, "MIAA Division 4 Championship", "State", "13th", "13 pts", null, "The Track at New Balance, Boston"]
        ],
        photo: { src: "../images/teams/boys-indoor-track.jpg", caption: "The 2025–26 Danvers boys indoor track team. Photo from the Danvers High School athletics page." },
        tiles: [["Record", "3–6", "Coach Tom Walsh"], ["Division 4 meet", "13th", "13 points · The Track at New Balance"], ["MSTCA ranking", "Unranked", "Not in the Division 4 top 10 (Jan. 28)"]],
        note: "Every meet on the school's ArbiterLive schedule for the season, with scores from ArbiterLive and the Boston Globe; multi-team meets are scored by place, and some duals have no score on file. Division 4 places and points from the meet's official results. The season record is from the school's team page.",
        awards: "Salem News all-star: Zach Dunn"
      },
      {
        season: "2024–25",
        games: [
          ["2024-12-30", 0, "NEC Freshman/Sophomore meet", "NEC", "5th", "25 pts", null, "Gloucester High · 5th of 10; Swampscott won with 93"],
          ["2025-01-15", 0, "Marblehead", "NEC", "L", 21, 56, "A tri-meet at Swampscott; score from the Marblehead Current (the Swampscott score isn't on file)"],
          ["2025-01-22", 0, "Salem", "NEC", "W", 64, 18, ""],
          ["2025-01-30", 1, "Beverly", "NEC", null, null, null, "No score on file"],
          ["2025-02-09", 0, "NEC Championship", "NEC", "5th", "35 pts", null, "Reggie Lewis Center, Roxbury · 5th of 9; Peabody won with 132"],
          ["2025-02-15", 0, "MIAA Division 4 Championship", "State", "7th", "19 pts", null, "Reggie Lewis Center, Boston"]
        ],
        tiles: [["Dual meets with scores", "1–1", "Of the meets on file"], ["NEC meet", "5th", "35 points · Reggie Lewis Center"], ["Division 4 meet", "7th", "19 points · Reggie Lewis Center"]],
        note: "Every meet on the school's ArbiterLive schedule for the season, with scores from ArbiterLive and the Boston Globe; multi-team meets are scored by place, and some duals have no score on file. Division 4 places and points from the meet's official results. NEC meet standings, the Freshman/Sophomore meet and the Marblehead tri-meet from the Marblehead Current. Peabody Weekly News also reports a 53.5–27.5 loss to Peabody in a dual meet it doesn't date.",
        awards: "Salem News all-star: Will Conklin"
      },
      {
        season: "2023–24",
        games: [
          ["2023-12-09", 0, "NEC Winter Invitational", "NEC", null, null, null, "The Track at New Balance · No team scoring; every Danvers result is below, from Lancer Timing"],
          ["2023-12-13", 0, "Peabody and one more team", "NEC", null, null, null, "Multi-team meet"],
          ["2023-12-21", 0, "Beverly", "NEC", "L", 26, 60, ""],
          ["2024-01-04", 1, "Marblehead", "NEC", "L", 42, 44, "The school's schedule lists this home meet with Masconomet and two more teams; the Marblehead Current has the 44–42 Marblehead win"],
          ["2024-01-10", 0, "Gloucester", "NEC", null, null, null, "No score on file"],
          ["2024-02-10", 0, "NEC Championship", "NEC", "36 pts", null, null, "Reggie Lewis Center, Roxbury · Peabody won with 117.5"],
          ["2024-02-18", 0, "MIAA Division 4 Championship", "State", "7th", "23 pts", null, "Reggie Lewis Center, Boston"]
        ],
        tiles: [["Dual meets with scores", "0–2", "Of the meets on the school's schedule"], ["Division 4 meet", "7th", "23 points · Reggie Lewis Center"]],
        note: "Every meet on the school's ArbiterLive schedule for the season, with scores from ArbiterLive and the Boston Globe; multi-team meets are scored by place, and some duals have no score on file. Division 4 places and points from the meet's official results. The Marblehead meet and the NEC meet standings are from the Marblehead Current; its list of the boys' standings skips two places, so Danvers's place isn't shown.",
      }
    ],
    historyIntro: "Division 4 two-mile champions two winters running, Sean Moore in 2024 and William Conklin in 2025, 7th-place teams at the Division 4 meet both years, and a sprinter who ran 6.59 in 2026.",
    banners: [],
    necTitles: [],
    seasons: [
      [2026, 3, 6, 0, "Tom Walsh", "7th at the NEC meet", "13th at the Division 4 meet"],
      [2025, null, null, null, "", "", "7th at the Division 4 meet"],
      [2024, null, null, null, "", "", "7th at the Division 4 meet"],
      [2023, null, null, null, "", "", "27th at the Division 2 meet"],
      [2022, 4, 2, 0, "", "", ""],
      [2013, null, null, null, "John Norris", "Unbeaten in the NEC South (7–0)", ""]
    ],
    honors: [
      { year: 2026, captains: "", allLeague: "Zach Dunn", note: "NEC All-Star: Julian Capece; Salem News all-star: Zach Dunn" },
      { year: 2025, captains: "", allLeague: "Owen Shanbar, Will Conklin", note: "William Conklin, Division 4 two-mile champion; Meet of Champions: JJ Rooney (mile), William Conklin (two-mile); Salem News all-star: Will Conklin" },
      { year: 2024, captains: "", allLeague: "", note: "Sean Moore, Division 4 two-mile champion and 8th at the Meet of Champions; William Conklin 2nd in the Division 4 two-mile" },
      { year: 2023, captains: "", allLeague: "", note: "Will Conklin, 7th in the Division 2 two-mile as a sophomore; Chris McCrea, 8th in the 600" },
      { year: 2013, captains: "", allLeague: "", note: "NEC all-stars: James Bailey, Ryan Levesque, Joe Manson, Drew Piazza, Connor Rollins, John Thomas. John Norris, a Boston Globe Coach of the Year" }
    ],
    legends: [],
    milestones: [
      { year: "2013", text: "In his 30th year of coaching, John Norris leads the boys through an unbeaten NEC South season (7–0) and to 2nd at the Division 3 Coaches Relays, and the Boston Globe names him one of its Coaches of the Year. Between track and cross country he had been NEC Coach of the Year 17 times." },
      { year: "2022", text: "A 4–2 dual-meet winter, with wins over Gloucester, Swampscott, Masconomet and Beverly." },
      { year: "2024", text: "Sean Moore wins the Division 4 two-mile in 9:45.39 with William Conklin right behind him in 2nd, the 4x400 relay is 6th, and the Falcons place 7th with 23 points. Moore is 8th in the two-mile at the Meet of Champions." },
      { year: "2025", text: "William Conklin wins the Division 4 two-mile in 9:32.79, JJ Rooney is 2nd in the mile and the Falcons place 7th at the Division 4 meet." },
      { year: "2026", text: "Zach Dunn runs 6.59 for 2nd in the Division 4 55 meters, and Julian Capece clears 6 feet for 5th in the high jump." }
    ],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every meet, time and change on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/winter-track-and-field/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" },
      { kind: "Instagram", title: "@danversfalconsathletics", text: "The Danvers High School athletic department's Instagram: game days, results and photos for every team.", url: "https://www.instagram.com/danversfalconsathletics/", go: "Instagram" }
    ],
    news: [],
    photos: [],
    returningNote: "Every Falcon who competed at last winter's state meets and is back this winter. The cards are written in js/athletes.js.",
    returningTitle: "Returning athletes to watch",
    division: "MIAA Division 4",
    historyNote: "No indoor track record book is posted, so this history starts with the seasons on file. Every Danvers result at the state meets since 2023, and at the three NEC meets Lancer Timing posted (December 2022, January 2023 and December 2023), is under Past Seasons, with final marks rather than seed marks. The Record Book lists the best marks from those meets; it isn't a full school record book, since none is posted. Records are from the school's team page (2025–26) and the dual meets scored on ArbiterLive (2021–22); divisional and Meet of Champions results since 2023 from the MIAA's official results (Danvers ran in Division 2 in 2023 and Division 4 since).",
    seasonsLabel: "on file",
    recordsNote: "A season is listed by the year it ended. A dash means too few meets on file have a score to give a record, and blank cells are details not on file.",
    honorsNote: "NEC All-Conference picks and state honors from the school's team pages and the MIAA; 2012 and 2013 from the Boston Globe's All-Scholastic archive, which printed each league's all-star list. Captains aren't posted for these seasons.",
    champions: [["2025", "William Conklin", "MIAA Division 4 champion, two-mile (9:32.79)"], ["2024", "Sean Moore", "MIAA Division 4 champion, two-mile (9:45.39)"]]
  },

  /* ================================ GIRLS ================================ */
  girls: {
    label: "Girls Indoor Track",
    short: "Girls",
    headCoach: "Erin St. Pierre",
    heroTitle: "Falcons open Dec. 10 at Marblehead",
    preview: "The indoor season starts Thursday, Dec. 10 with a conference meet at Marblehead, then Swampscott on Dec. 17. The Falcons host two meets in the field house in January, and the NEC Championship is Saturday, Jan. 30 at the Reggie Lewis Center. Practice begins Monday, Nov. 30.",
    stripTile: ["NEC Championship", "Jan 30", "Reggie Lewis Center, Boston"],
    scheduleNote: "The schedule is from the school's ArbiterLive page and the Falcons athletics site, and can change. State divisional and All-State meets follow the conference championship for athletes who qualify.",
    links: { school: "https://danverspublicschools.org/dhs/athletics/winter-track-and-field/", schedule: "https://www.arbiterlive.com/Teams?entityId=5538" },
    staff: [["Head coach", "Erin St. Pierre"], ["Assistant coaches", "Tim West, Pat Hennessey & Jeff Bartlett"]],
    about: [
      "Danvers runs winter track and field for boys and girls of every experience level. No background is needed, and many Falcons are multi-sport athletes trying the sport for the first time. Athletes are encouraged to try different events through the season.",
      "The Falcons compete in the Northeastern Conference against schools such as Marblehead, Peabody and Saugus, and the meets with Beverly and Swampscott are the most anticipated of the winter. Each year Danvers athletes qualify for the state divisional and All-State meets.",
      "Boys and girls home meets are held together in the Danvers High School field house, 60 Cabot Road. Program information from the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted after practice begins Monday, Nov. 30.",
    schedule: [
      {
        id: 1,
        date: "2026-12-10T16:30",
        name: "NEC meet at Marblehead",
        opponent: "Marblehead and one more team",
        home: false,
        league: true,
        site: "Site to be announced",
        result: null,
        notes: [
          "The season opener: a conference meet with Marblehead and one other team",
          "The school's schedule lists it at Marblehead; the girls' site is still to be announced",
          "The Boston Globe's schedule lists the girls' opener as a home meet against Winthrop instead"
        ]
      },
      {
        id: 2,
        date: "2026-12-17T16:30",
        name: "NEC meet at Swampscott",
        opponent: "Swampscott, Masconomet and Salem",
        home: false,
        league: true,
        site: "Swampscott High School, Swampscott",
        field: ["Swampscott", "Masconomet", "Salem"],
        result: null,
        notes: ["The season opener: a conference meet with Swampscott, Masconomet and Salem"]
      },
      {
        id: 3,
        date: "2026-12-28T14:00",
        name: "NEC Invitational",
        opponent: "NEC Invitational",
        home: false,
        league: true,
        tournament: true,
        site: "The Track at New Balance, Brighton",
        field: ["Beverly", "Gloucester", "Marblehead", "Masconomet", "Peabody", "Salem", "Saugus", "Swampscott", "Winthrop"],
        result: null,
        notes: ["Doors open at 2:00 PM", "Every Northeastern Conference team in one meet"]
      },
      {
        id: 4,
        date: "2026-12-29T09:30",
        name: "NEC Freshman/Sophomore Championship",
        opponent: "NEC Freshman/Sophomore Championship",
        home: false,
        league: true,
        tournament: true,
        site: "Gloucester High School, Gloucester",
        field: ["Beverly", "Gloucester", "Marblehead", "Masconomet", "Peabody", "Salem", "Saugus", "Swampscott", "Winthrop"],
        result: null,
        notes: ["The conference championship for ninth and tenth graders"]
      },
      {
        id: 5,
        date: "2027-01-06T16:30",
        name: "Home meet: Beverly, Saugus and Winthrop",
        opponent: "Beverly, Saugus and Winthrop",
        home: true,
        league: true,
        site: "Danvers High School Field House, Danvers",
        field: ["Beverly", "Saugus", "Winthrop"],
        result: null,
        notes: ["Beverly, Saugus and Winthrop come to the Danvers field house"]
      },
      {
        id: 6,
        date: "2027-01-13T16:30",
        name: "NEC meet at Swampscott",
        opponent: "Swampscott and Peabody",
        home: false,
        league: true,
        site: "Swampscott High School, Swampscott",
        field: ["Swampscott", "Peabody"],
        result: null,
        notes: ["A conference meet with Swampscott and Peabody"]
      },
      {
        id: 7,
        date: "2027-01-20T16:30",
        opponent: "Gloucester",
        mascot: "Fishermen",
        home: false,
        league: true,
        site: "Gloucester High School, Gloucester",
        result: null,
        notes: ["A double dual at Gloucester: Danvers faces Gloucester while Winthrop faces Masconomet"]
      },
      {
        id: 8,
        date: "2027-01-27T16:30",
        name: "Home meet: Salem and Saugus",
        opponent: "Salem and Saugus",
        home: true,
        league: true,
        site: "Danvers High School Field House, Danvers",
        field: ["Salem", "Saugus"],
        result: null,
        notes: ["Salem and Saugus come to the Danvers field house"]
      },
      {
        id: 9,
        date: "2027-01-30T08:30",
        name: "NEC Championship Meet",
        opponent: "NEC Championship Meet",
        home: false,
        league: true,
        tournament: true,
        site: "Reggie Lewis Center, Boston",
        field: ["Beverly", "Gloucester", "Marblehead", "Masconomet", "Peabody", "Salem", "Saugus", "Swampscott", "Winthrop"],
        result: null,
        notes: ["The Northeastern Conference championship"]
      }
    ],
    players: [],
    pastIntro: "The last three winters: every meet on the school's schedule, the MIAA Division 4 championship and the athletes who scored there.",
    past: [
      {
        season: "2025–26",
        record: "3–5–1",
        coach: "Erin St. Pierre",
        allLeague: "Tess Ryan",
        allStars: "Grace Conklin",
        games: [
          ["2025-12-12", 0, "Marblehead and eight more teams", "NEC", null, null, null, "Multi-team meet"],
          ["2025-12-17", 1, "Masconomet", "NEC", "L", 34, 52, ""],
          ["2025-12-29", 0, "Salem and eight more teams", "NEC", null, null, null, "Multi-team meet"],
          ["2026-01-07", 0, "Gloucester and one more team", "NEC", null, null, null, "Multi-team meet"],
          ["2026-01-14", 0, "Peabody", "NEC", "L", 18, 68, "", "Ayanna Cirame won both the 55-meter hurdles and the high jump for the Tanners (3-0) in the Northeastern win."],
          ["2026-01-22", 1, "Salem", "NEC", null, null, null, "No score on file"],
          ["2026-01-28", 0, "Marblehead", "NEC", "L", 32, 39, ""],
          ["2026-01-31", 0, "NEC Championship", "NEC", "6th", "43 pts", null, "Reggie Lewis Center, Roxbury · 6th of 10; Peabody won with 121"],
          ["2026-02-05", 0, "Gloucester and two more teams", "NEC", null, null, null, "Multi-team meet"],
          ["2026-02-14", 0, "MIAA Division 4 Championship", "State", "19th", "13 pts", null, "The Track at New Balance, Boston"]
        ],
        photo: { src: "../images/teams/girls-indoor-track.jpg", caption: "The 2025–26 Danvers girls indoor track team. Photo from the Danvers High School athletics page." },
        tiles: [["Record", "3–5–1", "Coach Erin St. Pierre"], ["Division 4 meet", "19th", "13 points · The Track at New Balance"], ["MSTCA ranking", "Unranked", "Not in the Division 4 top 10 (Jan. 22)"]],
        note: "Every meet on the school's ArbiterLive schedule for the season, with scores from ArbiterLive and the Boston Globe; multi-team meets are scored by place, and some duals have no score on file. Division 4 places and points from the meet's official results. The season record is from the school's team page.",
      },
      {
        season: "2024–25",
        games: [["2024-12-30", 0, "NEC Freshman/Sophomore meet", "NEC", "4th", "49 pts", null, "Gloucester High · 4th of 10; Peabody won with 99"], ["2025-01-15", 1, "Peabody", "NEC", "L", 33, 48, ""], ["2025-01-22", 0, "Salem", "NEC", "W", 70, 0, "Score as reported to the Boston Globe"], ["2025-01-30", 1, "Beverly", "NEC", null, null, null, "No score on file"], ["2025-02-09", 0, "NEC Championship", "NEC", "5th", "48 pts", null, "Reggie Lewis Center, Roxbury · 5th of 8; Peabody won with 80"], ["2025-02-15", 0, "MIAA Division 4 Championship", "State", "19th", "8 pts", null, "Reggie Lewis Center, Boston"]],
        tiles: [["Dual meets with scores", "1–1", "Of the meets on file"], ["NEC meet", "5th", "48 points · Reggie Lewis Center"], ["Division 4 meet", "19th", "8 points · Reggie Lewis Center"]],
        note: "Every meet on the school's ArbiterLive schedule for the season, with scores from ArbiterLive and the Boston Globe; multi-team meets are scored by place, and some duals have no score on file. Division 4 places and points from the meet's official results. NEC meet standings and the Freshman/Sophomore meet from the Marblehead Current, which also reports a 55–22 loss to Marblehead in a tri-meet with Swampscott. It dates that meet Jan. 15, the day the school's schedule and the Globe have the girls at home against Peabody, so the date is left off here.",
        awards: "Salem News all-star: Tess Ryan"
      },
      {
        season: "2023–24",
        games: [
          ["2023-12-09", 0, "NEC Winter Invitational", "NEC", null, null, null, "The Track at New Balance · No team scoring; every Danvers result is below, from Lancer Timing"],
          ["2023-12-13", 0, "Peabody and one more team", "NEC", null, null, null, "Multi-team meet"],
          ["2023-12-21", 0, "Beverly", "NEC", "L", 15, 71, ""],
          ["2024-01-04", 1, "Marblehead", "NEC", "L", 26, 60, "Score from the Marblehead Current"],
          ["2024-01-10", 0, "Gloucester", "NEC", null, null, null, "No score on file"],
          ["2024-02-10", 0, "NEC Championship", "NEC", "6th", "16 pts", null, "Reggie Lewis Center, Roxbury · 6th of 8; Marblehead won"],
          ["2024-02-18", 0, "MIAA Division 4 Championship", "State", "34th", "1 pt", null, "Reggie Lewis Center, Boston"]
        ],
        tiles: [["Dual meets with scores", "0–2", "Of the meets on file"], ["NEC meet", "6th", "16 points · Reggie Lewis Center"], ["Division 4 meet", "34th", "1 pt · Reggie Lewis Center"]],
        note: "Every meet on the school's ArbiterLive schedule for the season, with scores from ArbiterLive and the Boston Globe; multi-team meets are scored by place, and some duals have no score on file. Division 4 places and points from the meet's official results. The Marblehead meet and the NEC meet standings are from the Marblehead Current.",
      }
    ],
    historyIntro: "State champions in 1978 and 1979 in the spring, and a sprinter and a distance runner scoring at the Division 4 meet the last two winters.",
    banners: [],
    necTitles: [],
    seasons: [
      [2026, 3, 5, 1, "Erin St. Pierre", "6th at the NEC meet", "19th at the Division 4 meet"],
      [2025, null, null, null, "", "", "19th at the Division 4 meet"],
      [2024, null, null, null, "", "", "34th at the Division 4 meet"],
      [2023, null, null, null, "", "", "13th at the Division 2 meet"],
      [2022, 2, 4, 0, "", "", ""]
    ],
    honors: [
      { year: 2026, captains: "", allLeague: "Tess Ryan", note: "NEC All-Star: Grace Conklin" },
      { year: 2025, captains: "", allLeague: "Tess Ryan, Jenea Cash, Flavia Locilento, Sabina Sturgeon", note: "Salem News all-star: Tess Ryan" },
      { year: 2024, captains: "", allLeague: "", note: "Bobbi Serino, 8th in the Division 4 mile" },
      { year: 2023, captains: "", allLeague: "", note: "3rd at the Division 2 meet: Emma Eagan (two-mile, 11:41.42) and Cali Abbatessa (shot put, 33-6); both went on to the All-State meet" },
      { year: 2013, captains: "", allLeague: "", note: "NEC all-stars: Ashley Brooks, Meghan Kellard, Xanthi Pantazelos" },
      { year: 2012, captains: "", allLeague: "", note: "NEC all-stars: Samantha DiBella, Catreida Dominick, Xanthi Pantazelos" }
    ],
    legends: [],
    milestones: [
      { year: "1978", text: "The Danvers girls win the MIAA state track championship, and repeat in 1979 (both in the spring season)." },
      { year: "2022", text: "Dual-meet wins over Gloucester and Swampscott." },
      { year: "2023", text: "Seniors Emma Eagan (two-mile) and Cali Abbatessa (shot put) each take 3rd at the Division 2 meet and qualify for All-States; the girls score 14 points for 13th." },
      { year: "2025", text: "Grace Conklin is 4th in the Division 4 two-mile as a sophomore and Tess Ryan 7th in the 55 meters." },
      { year: "2026", text: "Tess Ryan takes 3rd in the Division 4 55 meters in 7.30, and Grace Conklin is 6th in the two-mile." }
    ],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every meet, time and change on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/winter-track-and-field/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" },
      { kind: "Instagram", title: "@danversfalconsathletics", text: "The Danvers High School athletic department's Instagram: game days, results and photos for every team.", url: "https://www.instagram.com/danversfalconsathletics/", go: "Instagram" }
    ],
    news: [],
    photos: [],
    returningNote: "Every Falcon who competed at last winter's state meets and is back this winter. The cards are written in js/athletes.js.",
    returningTitle: "Returning athletes to watch",
    division: "MIAA Division 4",
    historyNote: "No indoor track record book is posted, so this history starts with the seasons on file. Every Danvers result at the state meets since 2023, and at the three NEC meets Lancer Timing posted (December 2022, January 2023 and December 2023), is under Past Seasons, with final marks rather than seed marks. The Record Book lists the best marks from those meets; it isn't a full school record book, since none is posted. Records are from the school's team page (2025–26) and the dual meets scored on ArbiterLive (2021–22); divisional and Meet of Champions results since 2023 from the MIAA's official results (Danvers ran in Division 2 in 2023 and Division 4 since).",
    seasonsLabel: "on file",
    recordsNote: "A season is listed by the year it ended. A dash means too few meets on file have a score to give a record, and blank cells are details not on file.",
    honorsNote: "NEC All-Conference picks and state honors from the school's team pages and the MIAA; 2012 and 2013 from the Boston Globe's All-Scholastic archive, which printed each league's all-star list. Captains aren't posted for these seasons."
  }
};
