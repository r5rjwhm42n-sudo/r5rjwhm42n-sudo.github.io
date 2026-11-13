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
    heroTitle: "Falcons open Dec. 17 at Swampscott",
    preview: "The indoor season starts Thursday, Dec. 17 with a conference meet at Swampscott. The Falcons host two meets in the field house in January, and the NEC Championship is Saturday, Jan. 30 at the Reggie Lewis Center. Practice begins Monday, Nov. 30.",
    stripTile: ["NEC Championship", "Jan 30", "Reggie Lewis Center, Boston"],
    scheduleNote: "The schedule is from the Falcons athletics site and can change. State divisional and All-State meets follow the conference championship for athletes who qualify.",
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
    pastIntro: "Last winter's record and honors.",
    past: [
      {
        season: "2025–26",
        record: "3–6",
        coach: "Tom Walsh",
        allLeague: "Zach Dunn",
        allStars: "Julian Capece",
        games: [],
        gamesNote: "Meet-by-meet results for this season aren't on file. The season record is from the school's team page.",
        photo: { src: "../images/teams/boys-indoor-track.jpg", caption: "The 2025–26 Danvers boys indoor track team. Photo from the Danvers High School athletics page." }
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
    photos: []
  },

  /* ================================ GIRLS ================================ */
  girls: {
    label: "Girls Indoor Track",
    short: "Girls",
    headCoach: "Erin St. Pierre",
    heroTitle: "Falcons open Dec. 17 at Swampscott",
    preview: "The indoor season starts Thursday, Dec. 17 with a conference meet at Swampscott. The Falcons host two meets in the field house in January, and the NEC Championship is Saturday, Jan. 30 at the Reggie Lewis Center. Practice begins Monday, Nov. 30.",
    stripTile: ["NEC Championship", "Jan 30", "Reggie Lewis Center, Boston"],
    scheduleNote: "The schedule is from the Falcons athletics site and can change. State divisional and All-State meets follow the conference championship for athletes who qualify.",
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
    pastIntro: "Last winter's record and honors.",
    past: [
      {
        season: "2025–26",
        record: "3–5–1",
        coach: "Erin St. Pierre",
        allLeague: "Tess Ryan",
        allStars: "Grace Conklin",
        games: [],
        gamesNote: "Meet-by-meet results for this season aren't on file. The season record is from the school's team page.",
        photo: { src: "../images/teams/girls-indoor-track.jpg", caption: "The 2025–26 Danvers girls indoor track team. Photo from the Danvers High School athletics page." }
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
    photos: []
  }
};
