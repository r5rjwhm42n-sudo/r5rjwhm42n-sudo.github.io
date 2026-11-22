/* =====================================================================
   DANVERS FALCONS GYMNASTICS — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left off
   the site until it is known.

   A MEET on the schedule:
     id, date ("2026-12-18T19:30", Eastern time), opponent, mascot,
     home (true/false), league (true = NEC meet), site (the gym)
     result: "W" / "L" / "T" (null until it's held), us, them    team scores (128.45)
     stats:  { "Gymnast Name": { aa: 34.2 } }                    adds up into the roster
     summary: a short recap    notes: ["bullet", ...]    sources: [{ label, url }]

   A GYMNAST on the roster: { name, pos: ["All-around"], grade: "Sr.", captain: true }

   Sources: the school's team page (coaches, record, honors) and the
   Falcons athletics site (schedule).
   ===================================================================== */

const SPORT = {
  key: "gymnastics", name: "Gymnastics", season: "2026–27",
  game: "meet", games: "meets", players: "gymnasts", start: "Start Time",
  scoreWord: "Team score", lineTitle: "", periods: [], boxTitle: "Scores",
  stats: [],
  ties: false, spanYears: true
};

const SCHOOL = {
  school: "Danvers High School", name: "Danvers Falcons", location: "Danvers, MA",
  conference: "Northeastern Conference", athletics: "https://www.danversfalconsathletics.com/"
};

const TEAMS = {
  varsity: {
    label: "Gymnastics",
    short: "Varsity",
    headCoach: "Jen Habeeb",
    heroTitle: "Falcons open Dec. 18 at Beverly",
    preview: "The gymnastics season starts Friday, Dec. 18 against rival Beverly, then moves to the team's home gym at Yellow Jackets for four meets, beginning Sunday, Dec. 20 against Masconomet.",
    stripTile: ["Home meets", 4, "Yellow Jackets Gymnastics"],
    scheduleNote: "The schedule is from the Falcons athletics site and can change. The school's team page lists home meets at Yellow Jackets Gymnastics, 274 Newbury Street, Peabody.",
    links: { school: "https://danverspublicschools.org/dhs/athletics/gymnastics/", schedule: "https://www.arbiterlive.com/Teams?entityId=5538" },
    staff: [["Head coach", "Jen Habeeb"], ["Assistant coach", "Aimee Sinewitz"]],
    about: [
      "Danvers gymnastics is a varsity co-op: the Falcons practice and compete together with Lynnfield at the Yellow Jackets gym in Peabody.",
      "The program has won Northeastern Conference championships in multiple seasons and often advances to sectional and state competition. The Falcons face Peabody, Salem, Masconomet and Winthrop, and the meet with Beverly is the most anticipated of the season.",
      "Teammates work together across town lines, which makes the team different from most at Danvers High. Program information from the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted once the team is set.",
    schedule: [
      { id: 1, date: "2026-12-18T19:30", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Sterling YMCA, Beverly", result: null },
      { id: 2, date: "2026-12-20T12:00", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: "Yellow Jackets Gymnastics, Peabody", result: null },
      { id: 3, date: "2027-01-03T14:00", opponent: "Hamilton-Wenham", mascot: "Generals", home: true, league: false, site: "Yellow Jackets Gymnastics, Peabody", result: null },
      { id: 4, date: "2027-01-16T17:30", opponent: "Winthrop", mascot: "Vikings", home: true, league: true, site: "Yellow Jackets Gymnastics, Peabody", result: null },
      { id: 5, date: "2027-01-17T12:00", opponent: "Essex Tech", mascot: "Hawks", home: true, league: false, site: "Yellow Jackets Gymnastics, Peabody", result: null },
      { id: 6, date: "2027-01-31T17:00", opponent: "Bishop Fenwick", mascot: "Crusaders", home: false, league: false, site: "Legends Gymnastics, North Andover", result: null }
    ],
    players: [],
    pastIntro: "The last three winters, meet by meet, with team scores.",
    past: [
      {
        season: "2025–26",
        record: "0–6",
        coach: "Jen Habeeb",
        allLeague: "Delainy Murphy",
        games: [
          ["2025-12-21", 0, "Essex Tech", "", "L", 109.35, 119.7, ""],
          ["2025-12-28", 0, "Masconomet", "", "L", 122, 139, ""],
          ["2026-01-08", 0, "Hamilton-Wenham/Manchester Essex", "", "L", 121.95, 133.05, ""],
          ["2026-01-08", 0, "Marblehead/Swampscott", "", "L", 121.95, 123.5, ""],
          ["2026-01-12", 0, "Beverly", "", "L", 121.75, 132.4, ""],
          ["2026-01-17", 1, "Hamilton-Wenham/Manchester Essex", "", "L", 127.8, 136.05, ""],
          ["2026-01-18", 0, "Bishop Fenwick", "", "L", 122.5, 123.15, ""],
          ["2026-02-02", 0, "Beverly", "", "L", 101.5, 133.55, ""],
          ["2026-02-07", 0, "Beverly and eight more teams", "NEC", null, null, null, "Multi-team meet"]
        ],
        photo: { src: "../images/teams/gymnastics.jpg", caption: "The 2025–26 Danvers gymnastics team. Photo from the Danvers High School athletics page." },
        note: "Every meet on the school's ArbiterLive schedule, with scores from ArbiterLive and the Boston Globe; the season record is from the school's team page. A meet against two teams counts as two. The MIAA seeds the state tournament on the average of a team's four best scores: Danvers' was 123.68.",
        tiles: [["Record", "0–6", "Coach Jen Habeeb"], ["Season high", "127.8", "vs. Hamilton-Wenham/Manchester Essex, Jan. 17"], ["MIAA seeding average", "123.68", "Average of the four best scores"]]
      },
      {
        season: "2024–25",
        record: "4–2",
        games: [
          ["2024-12-22", 1, "Masconomet", "", "L", 145.95, 147.35, ""],
          ["2025-01-05", 1, "Marblehead/Swampscott", "", "L", 127.3, 141.6, ""],
          ["2025-01-19", 1, "Bishop Fenwick", "", "W", 144.45, 119.95, ""],
          ["2025-01-19", 1, "Peabody", "", "W", 144.45, 64.7, ""],
          ["2025-01-30", 1, "Hamilton-Wenham/Manchester Essex", "", "W", 144.1, 133.65, ""],
          ["2025-02-07", 0, "Winthrop", "NEC", null, null, null, "No score on file"],
          ["2025-02-09", 1, "Essex Tech", "", "W", 148.4, 126.45, ""]
        ],
        note: "Every meet on the school's ArbiterLive schedule, with scores from ArbiterLive and the Boston Globe. The 4–2 record is as reported to the Globe.",
        tiles: [["Record", "4–2", "As reported to the Boston Globe"], ["Season high", "148.4", "vs. Essex Tech, Feb. 9"]]
      },
      {
        season: "2023–24",
        games: [
          ["2023-12-27", 1, "Bishop Fenwick", "NEC", "W", 145.4, 127.5, ""],
          ["2024-01-06", 1, "Peabody", "NEC", null, null, null, "No score on file"],
          ["2024-01-15", 1, "Hamilton-Wenham and one more team", "NEC", "W", 145.95, 136.9, ""],
          ["2024-01-21", 1, "Beverly", "NEC", "W", 143.45, 128.4, ""],
          ["2024-01-28", 0, "Marblehead", "NEC", "W", 146.05, 140.05, ""],
          ["2024-02-11", 0, "Essex Tech", "NEC", "W", 144.2, 118, ""]
        ],
        note: "Every meet on the school's ArbiterLive schedule, with the scores entered there: unbeaten in the five meets that have one.",
        record: "5–0",
        tiles: [["Record", "5–0", "In meets with a score on file"], ["Season high", "146.05", "at Marblehead, Jan. 28"]]
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
      { kind: "Instagram", title: "@dhs_gymnastics", text: "The team's own Instagram, Danvers Varsity Gymnastics: meet days, scores and photos.", url: "https://www.instagram.com/dhs_gymnastics/", go: "Instagram" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/gymnastics/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" }
    ],
    news: [],
    photos: []
  }
};
