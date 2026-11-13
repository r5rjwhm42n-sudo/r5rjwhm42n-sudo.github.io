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
    pastIntro: "Last winter's record and honors.",
    past: [
      {
        season: "2025–26",
        record: "0–6",
        coach: "Jen Habeeb",
        allLeague: "Delainy Murphy",
        games: [],
        gamesNote: "Meet-by-meet results for this season aren't on file. The season record is from the school's team page.",
        photo: { src: "../images/teams/gymnastics.jpg", caption: "The 2025–26 Danvers gymnastics team. Photo from the Danvers High School athletics page." }
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
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/gymnastics/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" }
    ],
    news: [],
    photos: []
  }
};
