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
    heroTitle: "Falcons are back in the pool Nov. 30",
    preview: "The co-ed swimming and diving team begins practice Monday, Nov. 30 at St. John's Prep, its home pool. This winter's meets will be added here as soon as the schedule is posted.",
    stripTile: ["Home pool", "8 lanes", "St. John's Prep · 25 yards"],
    noScheduleNote: "This winter's meets haven't been posted yet. Practice begins Monday, Nov. 30 at St. John's Prep.",
    scheduleNote: "The meet schedule will be added as soon as it is posted. The school's ArbiterLive page has the latest.",
    links: { school: "https://danverspublicschools.org/dhs/athletics/swimming-and-diving/", schedule: "https://www.arbiterlive.com/Teams?entityId=5538" },
    staff: [["Head coach", "Meghan Beaulieu", "A Danvers High graduate who swam at Babson College"], ["Assistant coaches", "Graham Beck, Ezra Lombardi & Maddie Butler"]],
    about: [
      "Danvers has a co-ed swimming and diving program at the varsity and junior varsity levels. Boys and girls practice together five to six days a week, with a meet most weeks.",
      "Home meets are at St. John's Prep, an eight-lane, 25-yard pool with starting blocks and a diving board. The Falcons swim in the Northeastern Conference against Beverly, Marblehead, Peabody and Swampscott, and swimmers and divers qualify each year for the NEC meet at Salem State University.",
      "Head coach Meghan Beaulieu played soccer, swam and played softball at Danvers High before swimming at Babson College. She teaches business at the high school. Program information from the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted after practice begins Monday, Nov. 30.",
    schedule: [],
    players: [],
    pastIntro: "Last winter's record and honors.",
    past: [
      {
        season: "2025–26",
        record: "2–4",
        coach: "Meghan Beaulieu",
        games: [],
        note: "The school's team page lists these honors for 2024–25: NEC All-Conference Zachary Cotter and Max Scott, NEC All-Star Caleb Clark.",
        gamesNote: "Meet-by-meet results for this season aren't on file. The season record is from the school's team page.",
        photo: { src: "../images/teams/swim-dive.jpg", caption: "The 2025–26 Danvers swim and dive team. Photo from the Danvers High School athletics page." }
      }
    ],
    historyIntro: "A co-ed program with a Northeastern Conference championship to its name.",
    banners: [],
    necTitles: [1991],
    historyNote: "From the school's team page.",
    seasons: [],
    honors: [],
    legends: [],
    milestones: [{ year: "1991", text: "Danvers wins the Northeastern Conference swimming championship." }],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every meet, time and change on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/swimming-and-diving/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" }
    ],
    news: [],
    photos: []
  }
};
