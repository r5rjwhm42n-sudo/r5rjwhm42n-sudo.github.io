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
      "Danvers gymnastics is a varsity co-op: the Falcons practice and compete together with Lynnfield at the Yellow Jackets gym in Peabody. North Reading gymnasts were part of the team through 2022–23.",
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
        awards: "Delainy Murphy, Boston Globe All-Scholastic honorable mention",
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
        tiles: [["Record", "0–6", "From the school's team page"], ["Season high", "127.8", "vs. Hamilton-Wenham/Manchester Essex, Jan. 17"], ["MIAA seeding average", "123.68", "Average of the four best scores"]]
      },
      {
        season: "2024–25",
        record: "6–1",
        coach: "Jen Habeeb",
        post: "4th at the MIAA state meet (146.325)",
        captains: "Maddie Wescott, Camryn Donovan",
        allLeague: "Kaylee Wescott, Camryn Donovan, Callie Donovan, Sophia Catinazzo",
        awards: "Kaylee Wescott: NEC/CAL MVP, MIAA State Individuals all-around champion, Boston Globe All-Scholastic and team MVP · Camryn Donovan: Boston Globe All-Scholastic and the team's Unsung Hero Award",
        games: [
          ["2024-12-22", 1, "Masconomet", "", "L", 145.95, 147.35, ""],
          ["2025-01-05", 1, "Marblehead/Swampscott", "", "W", 141.6, 127.3, "Entered on the schedule as a 127.3–141.6 loss; the Salem News reported Masconomet as the season's only loss"],
          ["2025-01-19", 1, "Bishop Fenwick", "", "W", 144.45, 119.95, ""],
          ["2025-01-19", 1, "Peabody", "", "W", 144.45, 64.7, ""],
          ["2025-01-30", 1, "Hamilton-Wenham/Manchester Essex", "", "W", 144.1, 133.65, ""],
          ["2025-02-07", 0, "Winthrop", "NEC", "W", null, null, "A win (the Salem News reported a 6–1 season); no score on file"],
          ["2025-02-09", 1, "Essex Tech", "", "W", 148.4, 126.45, ""]
        ],
        note: "Every meet on the school's ArbiterLive schedule, with scores from ArbiterLive and the Boston Globe. The 6–1 record, the captains and the honors are from the Salem News, the Boston Globe and Local Headline News; the season high, 148.4 against Essex Tech, was the best regular-season score of the winter.",
        keyPlayers: [
          { name: "Kaylee Wescott", note: "NEC/CAL MVP and Boston Globe All-Scholastic as a sophomore. Won the MIAA State Individuals all-around, then took 2nd in the all-around at both the North sectional and the state meet." },
          { name: "Camryn Donovan", note: "Senior captain, NEC/CAL all-star and Boston Globe All-Scholastic; 4th in the all-around at the state meet." },
          { name: "Maddie Wescott", note: "Senior captain, a captain for three winters." },
          { name: "Sophia Catinazzo", note: "NEC/CAL all-star as a sophomore; 7th on vault at the North sectional." },
          { name: "Callie Donovan", note: "NEC/CAL all-star for the second straight winter." }
        ],
        tiles: [["Record", "6–1", "Regular season, per the Salem News"], ["Season high", "148.4", "vs. Essex Tech, Feb. 9"]]
      },
      {
        season: "2023–24",
        games: [
          ["2023-12-27", 1, "Bishop Fenwick", "NEC", "W", 145.4, 127.5, ""],
          ["2024-01-06", 1, "Peabody", "NEC", null, null, null, "No score on file"],
          ["2024-01-15", 1, "Hamilton-Wenham", "NEC", "W", 145.95, 136.9, "A tri-meet with Masconomet"],
          ["2024-01-15", 1, "Masconomet", "NEC", "L", 145.95, 149.35, "A tri-meet with Hamilton-Wenham; score from Masconomet's results page"],
          ["2024-01-21", 1, "Beverly", "NEC", "W", 143.45, 128.4, ""],
          ["2024-01-28", 0, "Marblehead", "NEC", "W", 146.05, 140.05, ""],
          ["2024-02-11", 0, "Essex Tech", "NEC", "W", 144.2, 118, ""]
        ],
        coach: "Jen Habeeb",
        post: "3rd at the MIAA state meet; 3rd at the North sectional (145.5)",
        captains: "Maddie Wescott",
        allLeague: "Kaylee Wescott, Camryn Donovan, Callie Donovan",
        awards: "Kaylee Wescott, North sectional all-around champion (38.725)",
        note: "Every meet on the school's ArbiterLive schedule, with the scores entered there and Masconomet's score from its own results page. Postseason results are from the Salem News.",
        record: "5–1",
        keyPlayers: [
          { name: "Kaylee Wescott", note: "Won the North sectional all-around title (38.725) as a freshman and was the NEC all-around all-star." },
          { name: "Camryn Donovan", note: "NEC all-star on bars (9.525 average) and 7th in the all-around at the North sectional." },
          { name: "Callie Donovan", note: "NEC all-star on vault (9.225 average)." },
          { name: "Maddie Wescott", note: "Team captain for the second straight winter." }
        ],
        tiles: [["Record", "5–1", "In meets with a score on file"], ["Season high", "146.05", "at Marblehead, Jan. 28"]]
      }
    ],
    historyIntro: "Six MIAA state championships, in 1984, 1986, three straight from 1996 to 1998, and 2005, plus North sectional titles in 2005 and 2010. The Danvers/Lynnfield co-op was back on the podium in 2023 and 2024, and Kaylee Wescott won the state all-around title in 2025.",
    banners: [
      { year: 2010, label: "North Sectional Champions" },
      { year: 2005, label: "State and North Sectional Champions" },
      { year: 1998, label: "MIAA State Champions" },
      { year: 1997, label: "MIAA State Champions" },
      { year: 1996, label: "MIAA State Champions" },
      { year: 1986, label: "MIAA State Champions" },
      { year: 1984, label: "MIAA State Champions" }
    ],
    necTitles: [1984, 1986, 1996, 1997, 1998, 2005],
    seasons: [
      [2026, 0, 6, 0, "Jen Habeeb", "", ""],
      [2025, 6, 1, 0, "Jen Habeeb", "", "4th at the MIAA state meet (146.325); 3rd at the North sectional (146.525)"],
      [2024, 5, 1, 0, "Jen Habeeb", "", "3rd at the MIAA state meet (145.5); 3rd at the North sectional"],
      [2023, 4, 1, 0, "Jen Habeeb", "", "2nd at the MIAA state meet (148.15); 3rd at the North sectional (146.475)"],
      [2022, 2, 4, 0, "", "", ""],
      [2020, null, null, null, "", "", "9th at the North sectional (132.35)"],
      [2019, null, null, null, "", "", "9th at the North sectional (138.225)"],
      [2016, null, null, null, "", "", "12th at the North sectional (128.725)"],
      [2015, null, null, null, "", "", "8th at the MIAA state meet (136.975); 2nd at the North sectional (141.355, behind Andover's 142.325)"]
    ],
    honors: [
      { year: 2026, captains: "", allLeague: "Delainy Murphy", note: "Delainy Murphy, Boston Globe All-Scholastic honorable mention" },
      {
        year: 2025,
        captains: "Maddie Wescott, Camryn Donovan",
        allLeague: "Kaylee Wescott (MVP), Camryn Donovan, Callie Donovan, Sophia Catinazzo",
        note: "Boston Globe All-Scholastics: Kaylee Wescott, all-around champion at the MIAA State Individuals, and Camryn Donovan. At the state team meet (March 1) Wescott was 2nd in the all-around (38.4) and won vault (9.7), and Donovan was 4th; at the North sectional Wescott won floor (9.875) and was 2nd in the all-around (38.275)"
      },
      { year: 2024, captains: "Maddie Wescott", allLeague: "Kaylee Wescott (all-around), Camryn Donovan (bars), Callie Donovan (vault)", note: "Kaylee Wescott, North sectional all-around (38.725) and beam (9.6) champion; Camryn Donovan 7th all-around and 4th on floor" },
      { year: 2023, captains: "Maddie Wescott", allLeague: "Maddie Wescott, Kaylee Wescott, Maddie Migliero, Camryn Donovan", note: "Salem News all-stars: Camryn Donovan, Maddie Migliero, Kaylee Wescott (team MVP as an eighth grader), Maddie Wescott. State meet: Wescott tied for 2nd in the all-around (38.6), Migliero 5th (36.75); North sectional: Wescott 3rd all-around and 1st on floor (9.8)" },
      { year: 2022, captains: "Allie Taylor", allLeague: "Maddie Wescott (all-around)", note: "A Danvers–North Reading co-op that season; Maddie Wescott competed at State Individuals as a freshman" },
      { year: 2020, captains: "", allLeague: "", note: "North sectional: Jessica Mandri 15th in the all-around and 7th on beam; Allie Taylor 16th" },
      { year: 2019, captains: "", allLeague: "", note: "North sectional: Jessica Mandri and Allie Taylor tied for 14th and 15th in the all-around (35.35)" },
      { year: 2016, captains: "", allLeague: "", note: "North sectional: Rachel Hill 11th in the all-around (34.625), Alyson Kelleher 17th" },
      { year: 2015, captains: "", allLeague: "", note: "State meet all-around: Jacquelyn Veatch 13th (34.375), Julia Valenti 14th (34.35). North sectional: Rachel Hill 4th on beam (9.175), Jacquelyn Veatch 5th; Julia Valenti 9th all-around" }
    ],
    legends: [],
    milestones: [
      { year: "1984", text: "Danvers wins its first MIAA state gymnastics championship." },
      { year: "1986", text: "A second state title." },
      { year: "1996", text: "The first of three straight state championships, 1996 through 1998." },
      { year: "2005", text: "State champions for the sixth time, and North sectional champions too." },
      { year: "2010", text: "North sectional champions." },
      { year: "2015", text: "2nd at the North sectional and 8th at the MIAA state meet, led by Jacquelyn Veatch and Julia Valenti, 13th and 14th in the state all-around." },
      { year: "2022", text: "Gymnasts from Danvers and North Reading compete as one team. Freshman Maddie Wescott is an NEC/CAL all-star in the all-around and competes at State Individuals." },
      { year: "2023", text: "Runners-up at the MIAA state meet, 0.45 behind Masconomet (148.6 to 148.15). Eighth grader Kaylee Wescott ties for 2nd in the all-around (38.6) and freshman Maddie Migliero is 5th." },
      { year: "2024", text: "Kaylee Wescott wins the North sectional all-around title as a freshman (38.725), and the Falcons place 3rd in the state." },
      {
        year: "2025",
        text: "A 6–1 regular season, with the only loss to Masconomet by 1.4 points. Kaylee Wescott is the NEC/CAL MVP and wins the MIAA State Individuals all-around; at the state meet she is 2nd in the all-around and Camryn Donovan 4th, and the team finishes 4th, 0.075 out of 3rd."
      }
    ],
    follow: [
      { kind: "Schedule", title: "Official schedule", text: "Every meet, time and change on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "Instagram", title: "@dhs_gymnastics", text: "The team's own Instagram, Danvers Varsity Gymnastics: meet days, scores and photos.", url: "https://www.instagram.com/dhs_gymnastics/", go: "Instagram" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/gymnastics/", go: "danverspublicschools.org" },
      { kind: "Athletics", title: "Falcons Athletics", text: "The athletic department's site, with schedules for every level.", url: "https://www.danversfalconsathletics.com/", go: "danversfalconsathletics.com" },
      { kind: "Instagram", title: "@danversfalconsathletics", text: "The Danvers High School athletic department's Instagram: game days, results and photos for every team.", url: "https://www.instagram.com/danversfalconsathletics/", go: "Instagram" }
    ],
    news: [],
    photos: [],
    historyNote: "State and sectional titles from the MIAA's all-time gymnastics champions list. State and North sectional finishes since 2015 from the MIAA's official results (Danvers didn't reach the state meet in 2017, 2018, 2022 or 2026); captains and honors from Salem News and Boston Globe stories reprinted on Masconomet gymnastics' site.",
    titlesLabel: "MIAA state championships",
    titlesShort: "State titles",
    titleYear: "State title year",
    seasonsLabel: "on file",
    recordsNote: "A season is listed by the year it ended. Records count the meets with a score on the school's ArbiterLive schedule, Masconomet's results page and Local Headline News; 2024–25 (6–1) is from the Salem News and 2025–26 from the school's team page. Two scores were entered the wrong way round on the schedule and are counted as wins: Marblehead/Swampscott in 2025 (the Salem News reported Masconomet as the only loss) and Beverly in 2023, entered as 127.15–145.55 when Danvers scored 146 or more in every other meet that month.",
    honorsNote: "Captains, NEC/CAL all-stars and Salem News all-stars from the Salem News; 2026 from the school's team page; 2015 from the MIAA's state meet results.",
    champions: [["2025", "Kaylee Wescott", "MIAA State Individuals all-around champion"], ["2025", "Kaylee Wescott", "Vault champion at the MIAA state meet (9.7)"], ["2024", "Kaylee Wescott", "MIAA North sectional all-around champion (38.725)"]]
  }
};
