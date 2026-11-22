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
    pastIntro: "The last two winters: dual meets, the MIAA Division 4 championship and the athletes who scored there.",
    past: [
      {
        season: "2025–26",
        record: "3–6",
        coach: "Tom Walsh",
        allLeague: "Zach Dunn",
        allStars: "Julian Capece",
        games: [
          ["2025-12-17", 1, "Masconomet", "NEC", "L", 37, 49, ""],
          ["2026-01-14", 0, "Peabody", "NEC", null, null, null, "No score on file"],
          ["2026-01-28", 0, "Marblehead", "NEC", "L", 37, 45, ""],
          ["2026-02-05", 1, "Beverly", "NEC", "L", 39, 47, ""],
          ["2026-02-13", 0, "MIAA Division 4 Championship", "State", "13th", "13 pts", null, "The Track at New Balance, Boston"]
        ],
        photo: { src: "../images/teams/boys-indoor-track.jpg", caption: "The 2025–26 Danvers boys indoor track team. Photo from the Danvers High School athletics page." },
        tiles: [["Record", "3–6", "Coach Tom Walsh"], ["Division 4 meet", "13th", "13 points · The Track at New Balance"], ["MSTCA ranking", "Unranked", "Not in the Division 4 top 10 (Jan. 28)"]],
        note: "Dual meets as reported to the Boston Globe, so the list may be incomplete. Division 4 places and points from the meet's official results; the season record is from the school's team page.",
        keyPlayers: [
          { name: "Zach Dunn", grade: "Jr.", note: "NEC All-Conference. 2nd in the 55 meters at the MIAA Division 4 meet in 6.59, the Falcons' best finish there." },
          { name: "Julian Capece", grade: "So.", note: "NEC All-Star. 5th in the high jump at Division 4, clearing 6 feet." },
          { name: "Jack Curcuru", grade: "Sr.", note: "8th in the 55 meters at Division 4 (6.75 in the prelims)." },
          { name: "Mason Ellsworth", grade: "Sr.", note: "10th in the shot put at Division 4 (41-2½)." }
        ]
      },
      {
        season: "2024–25",
        games: [["2025-01-22", 0, "Salem", "NEC", "W", 64, 18, ""], ["2025-02-15", 0, "MIAA Division 4 Championship", "State", "7th", "19 pts", null, "Reggie Lewis Center, Boston"]],
        tiles: [["Division 4 meet", "7th", "19 points · Reggie Lewis Center"]],
        note: "Dual meets as reported to the Boston Globe, so the list may be incomplete. Division 4 places and points from the meet's official results.",
        keyPlayers: [
          { name: "William Conklin", grade: "Sr.", note: "MIAA Division 4 champion in the two-mile, 9:32.79." },
          { name: "JJ Rooney", grade: "Sr.", note: "2nd in the mile at Division 4 in 4:25.03." },
          { name: "Chuck Garlin", grade: "Sr.", note: "8th in the 600 meters at Division 4 (1:25.68)." },
          { name: "Julian Capece", grade: "Fr.", note: "Cleared 5-8 in the high jump at Division 4 as a freshman." }
        ]
      }
    ],
    historyIntro: "",
    banners: [],
    necTitles: [],
    seasons: [],
    honors: [],
    legends: [],
    milestones: [],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every meet, time and change on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/winter-track-and-field/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" }
    ],
    news: [],
    photos: [],
    returning: [
      { name: "Zach Dunn", grade: "Sr.", note: "2nd in the Division 4 55 meters last winter (6.59)." },
      { name: "Julian Capece", grade: "Jr.", note: "Cleared 6 feet for 5th in the Division 4 high jump." },
      { name: "Marcus Morais", grade: "Sr.", note: "Ran the mile at Division 4 last winter (5:04.62) and won a cross country race at Salem this fall." }
    ],
    returningNote: "Picked from last winter's results and game stories.",
    returningTitle: "Returning athletes to watch",
    division: "MIAA Division 4"
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
    pastIntro: "The last two winters: dual meets, the MIAA Division 4 championship and the athletes who scored there.",
    past: [
      {
        season: "2025–26",
        record: "3–5–1",
        coach: "Erin St. Pierre",
        allLeague: "Tess Ryan",
        allStars: "Grace Conklin",
        games: [
          ["2025-12-17", 1, "Masconomet", "NEC", "L", 34, 52, ""],
          ["2026-01-14", 0, "Peabody", "NEC", "L", 18, 68, "", "Ayanna Cirame won both the 55-meter hurdles and the high jump for the Tanners (3-0) in the Northeastern win."],
          ["2026-01-28", 0, "Marblehead", "NEC", "L", 32, 39, ""],
          ["2026-02-14", 0, "MIAA Division 4 Championship", "State", "19th", "13 pts", null, "The Track at New Balance, Boston"]
        ],
        photo: { src: "../images/teams/girls-indoor-track.jpg", caption: "The 2025–26 Danvers girls indoor track team. Photo from the Danvers High School athletics page." },
        tiles: [["Record", "3–5–1", "Coach Erin St. Pierre"], ["Division 4 meet", "19th", "13 points · The Track at New Balance"], ["MSTCA ranking", "Unranked", "Not in the Division 4 top 10 (Jan. 22)"]],
        note: "Dual meets as reported to the Boston Globe, so the list may be incomplete. Division 4 places and points from the meet's official results; the season record is from the school's team page.",
        keyPlayers: [
          { name: "Tess Ryan", grade: "Jr.", note: "NEC All-Conference. 3rd in the 55 meters at the MIAA Division 4 meet in 7.30." },
          { name: "Grace Conklin", grade: "Jr.", note: "NEC All-Star. 6th in the two-mile at Division 4 in 11:58.46." },
          { name: "Madyson Danish", grade: "So.", note: "Ran the two-mile at Division 4 (12:51.31)." }
        ]
      },
      {
        season: "2024–25",
        games: [["2025-01-15", 1, "Peabody", "NEC", "L", 33, 48, ""], ["2025-02-15", 0, "MIAA Division 4 Championship", "State", "19th", "8 pts", null, "Reggie Lewis Center, Boston"]],
        tiles: [["Division 4 meet", "19th", "8 points · Reggie Lewis Center"]],
        note: "Dual meets as reported to the Boston Globe, so the list may be incomplete. Division 4 places and points from the meet's official results.",
        keyPlayers: [
          { name: "Grace Conklin", grade: "So.", note: "4th in the two-mile at the MIAA Division 4 meet in 12:08.43." },
          { name: "Tess Ryan", grade: "So.", note: "7th in the 55 meters at Division 4 (7.57)." },
          { name: "Addison Lamar", grade: "Jr.", note: "8th in the two-mile at Division 4 (12:21.92)." }
        ]
      }
    ],
    historyIntro: "",
    banners: [],
    necTitles: [],
    seasons: [],
    honors: [],
    legends: [],
    milestones: [],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every meet, time and change on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/winter-track-and-field/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" }
    ],
    news: [],
    photos: [],
    returning: [
      { name: "Tess Ryan", grade: "Sr.", note: "3rd in the Division 4 55 meters last winter (7.30)." },
      { name: "Grace Conklin", grade: "Sr.", note: "Top-six finishes in the Division 4 two-mile the last two winters, and a state cross country qualifier this fall." },
      { name: "Madyson Danish", grade: "Jr.", note: "A Division 4 two-miler last winter." }
    ],
    returningNote: "Picked from last winter's results and game stories.",
    returningTitle: "Returning athletes to watch",
    division: "MIAA Division 4"
  }
};
