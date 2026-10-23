/* =====================================================================
   DANVERS FALCONS CROSS COUNTRY — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left
   off the site until it is known.
   ===================================================================== */

const ATHLETICS = "https://www.danversfalconsathletics.com/";

const TEAM = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  season: 2026,
  location: "Danvers, MA",
  conference: "Northeastern Conference",
  division: "MIAA Division 2",  // MIAA cross country alignment for 2025-26 and 2026-27 (boys and girls)
  headCoach: "Jeff Bartlett",
  coachNote: "6th season",
  assistants: ["Andrew Russell"],
  homeCourse: "Danvers High School",
  courseDistance: "2.9 miles",
  address: "60 Cabot Road, Danvers, MA 01923",
  links: {
    athletics: ATHLETICS,
    schedule: ATHLETICS + "sport/girls-cross-country/schedule?team=7803757&year=2026-2027",
    school: "https://danverspublicschools.org/dhs/athletics/cross-country/",
    arbiter: "https://www.arbiterlive.com/Teams?entityId=5538",
    athleticNet: "https://www.athletic.net/team/19210/cross-country/2026",
    news: "https://www.salemnews.com/sports/"
  }
};

/* ---------------------------------------------------------------------
   MEETS
   Cross country is scored low-score-wins: add up the places of each
   team's top five runners.

   date:     "YYYY-MM-DDTHH:MM"
   timeTbd:  true if the start time isn't known (shows "Time TBD")
   dateTbd:  true if the date isn't set yet (date is then only used to
             keep the meet in order)
   opponent: the other school in a dual meet, OR
   name:     the meet's name for invitationals / championships
   short:    3–4 letter label used in the results grid
   cancelled: true keeps a called-off meet on the schedule, shown as "Cancelled"
   noResults: true marks a past meet whose results will never be added
              (shown as "No results" instead of "Results TBD")
   home:     true | false | null (null = site TBD)
   league:   true for Northeastern Conference meets
   distance: course length, e.g. "2.9 mi" or "5K"
   tag:      optional highlighted label, e.g. "Senior Night"
   headline: optional home-page headline for the meet (one is written
             automatically for dual meets)
   boys / girls:  null until the race is run, then
       dual meet:     { result: "W" | "L", us: 28, them: 29, finishers: [...] }
       invitational:  { race: "Varsity A · 135 finishers", finishers: [...] }
                      (add place: 3, of: 9 if there is a team score)
     finishers: Danvers runners in finishing order, written as
                  f("Name", place, "time", "note")
                Leave out (or use null for) anything not known yet.
     optional extras:
       winner:    { name, school, time }   the race winner
       check:     "what still needs confirming"
   --------------------------------------------------------------------- */
const f = (name, place, time, note) => ({ name, place: place ?? null, time: time ?? null, note: note ?? null });
const SN = "https://www.salemnews.com/sports/";
const MEETS = [
  {
    id: 1, date: "2026-09-09T16:00", opponent: "Beverly", mascot: "Panthers", short: "BEV",
    home: true, league: true, site: "Danvers High School", distance: "2.9 mi",
    summary: "Opening day against a Northeastern Conference rival. Marcus Morais ran 17:54 for second in the boys race — three seconds behind the winner — and Grace Conklin (19:30) and Madyson Danish (20:47) went 2–3 in the girls race, but Beverly's depth took both meets.",
    boys: {
      result: "L", us: 31, them: 24,
      winner: { name: "Jackson Oliver", school: "Beverly", time: "17:51" },
      finishers: [
        f("Marcus Morais", 2, "17:54"), f("Miles Pietal", 5, "18:43"), f("Jason Rooney", 6, "18:47"),
        f("Levi James", 8, "19:41"), f("Jakob Crandall", 10, "21:39"), f("Rowan Bartlett", 11, "21:43"),
        f("Miles LaMontagne", 13, "22:45"), f("Ethan Santiago", null, "24:19"), f("Colin Wilhelm", null, "24:34"),
        f("Samuel Lawler", null, "28:35"), f("Anis Lmal", null, "30:48")
      ]
    },
    girls: {
      result: "L", us: 32, them: 26,
      winner: { name: "Grace Corbett", school: "Beverly", time: "18:48" },
      finishers: [
        f("Grace Conklin", 2, "19:30"), f("Madyson Danish", 3, "20:47"), f("Emily Sullivan", 5, "22:05"),
        f("Paige Sherman", 10, "23:26"), f("Makayla Cheung", 12, "26:41"), f("Kylie Walsh", null, "26:46"),
        f("Norah Wright", null, "27:16"), f("Yara Azzazi", null, "31:48")
      ]
    },
    notes: ["Run on the 2.9-mile home course"],
    sources: [{ label: "Salem News roundup", url: SN + "wednesdays-area-roundup-beverly-girls-cross-country-shades-danvers/article_aa72c861-635a-4fb7-b41d-9d3825d17ac5.html" }]
  },
  {
    id: 11, date: "2026-09-12T09:15", name: "Clipper Relays", short: "CLP",
    home: false, league: false, site: "Maudslay State Park, Newburyport", distance: "3K / 2 mi",
    noResults: true,
    boys: null, girls: null,
    notes: []
  },
  {
    id: 2, date: "2026-09-16T16:00", opponent: "Salem", mascot: "Witches", short: "SAL",
    home: false, league: true, site: "Winter Island, Salem", distance: "3.1 mi",
    summary: "A sweep, and a one-point thriller on the boys side. Marcus Morais won the race in 19:20 as the Falcons edged Salem 28–29 for the boys' first dual-meet win since 2024. Grace Conklin (23:01) and Madyson Danish (23:02) crossed a second apart to go 1–2 and lead the girls to a 20–35 win.",
    boys: {
      result: "W", us: 28, them: 29,
      winner: { name: "Marcus Morais", school: "Danvers", time: "19:20" },
      finishers: [
        f("Marcus Morais", 1, "19:20"), f("Levi James", 4, "20:10"), f("Jason Rooney", 5, "20:58"),
        f("Miles Pietal", 6, "21:00"), f("Jakob Crandall", 12, "24:34"), f("Ethan Santiago", null, "24:38"),
        f("Miles LaMontagne", null, "25:14"), f("Rowan Bartlett", null, "25:40"), f("Colin Wilhelm", null, "26:38"),
        f("Anis Lmal", null, "27:25"), f("Samuel Lawler", null, "28:09")
      ]
    },
    girls: {
      result: "W", us: 20, them: 35,
      winner: { name: "Grace Conklin", school: "Danvers", time: "23:01" },
      finishers: [
        f("Grace Conklin", 1, "23:01"), f("Madyson Danish", 2, "23:02"), f("Emily Sullivan", 4, "24:13"),
        f("Paige Sherman", 6, "24:54"), f("Kylie Walsh", 7, "25:09"), f("Norah Wright", null, "27:35"),
        f("Makayla Cheung", null, "30:11")
      ]
    },
    notes: ["Boys' first cross country win since 2024", "3.1-mile course"],
    sources: [{ label: "Salem News roundup", url: SN + "wednesdays-area-roundup-danvers-boys-pick-up-first-cross-country-win-in-two-years/article_1805d4d3-c18d-49cb-a283-4d97eb895091.html" }]
  },
  {
    id: 3, date: "2026-09-23T16:30", opponent: "Swampscott", mascot: "Big Blue", short: "SWA",
    home: true, league: true, site: "Danvers High School", distance: "2.9 mi",
    summary: "Swampscott took both races, but the Falcons ran fast on the home course: Marcus Morais dropped to 17:12 and Grace Conklin to 18:51, each about 40 seconds quicker than they ran on the same course two weeks earlier.",
    boys: {
      result: "L", us: 45, them: 17,
      finishers: [
        f("Marcus Morais", null, "17:12"), f("Jason Rooney", null, "18:08"), f("Miles Pietal", null, "18:29"),
        f("Levi James", null, "18:57"), f("Rowan Bartlett", null, "21:14"), f("Jakob Crandall", null, "22:25"),
        f("Ethan Santiago", null, "22:25"), f("Anis Lmal", null, "28:24"), f("Samuel Lawler", null, "28:31")
      ]
    },
    girls: {
      result: "L", us: 33, them: 24,
      finishers: [
        f("Grace Conklin", null, "18:51"), f("Madyson Danish", null, "20:37"), f("Paige Sherman", null, "22:01"),
        f("Emily Sullivan", null, "22:12"), f("Makayla Cheung", null, "24:43"), f("Kylie Walsh", null, "24:48")
      ]
    },
    notes: ["Run on the 2.9-mile home course"],
    sources: [{ label: "Salem News roundup", url: SN + "wednesdays-area-roundup-salem-boys-girls-cross-country-teams-each-win-twice/article_ed9c0566-4030-4ac7-916b-dab7ca2e622e.html" }]
  },
  {
    id: 12, date: "2026-09-26T13:00", name: "Ocean State Invitational", short: "OSI",
    home: false, league: false, site: "Goddard Park, RI", distance: null,
    cancelled: true,
    boys: null, girls: null,
    notes: ["Cancelled. The team ran the MSTCA Bay State Invitational on Oct. 3 instead."]
  },
  {
    id: 4, date: "2026-09-30T16:30", opponent: "Saugus/Winthrop", mascot: null, short: "S/W",
    home: true, league: true, site: "Danvers High School", distance: "2.9 mi",
    summary: "Both squads got back to .500. Madyson Danish won the girls race and four more Falcons followed her into the scoring in a 16–40 rout, and the boys won 22–30.",
    boys: {
      result: "W", us: 22, them: 30,
      finishers: [
        f("Marcus Morais", null, "17:25"), f("Levi James", null, "18:52"), f("Miles Pietal", null, "19:02"),
        f("Jakob Crandall", null, "21:27"), f("Ethan Santiago", null, "24:03"), f("Anis Lmal", null, "25:31")
      ]
    },
    girls: {
      result: "W", us: 16, them: 40,
      winner: { name: "Madyson Danish", school: "Danvers", time: "21:31" },
      finishers: [
        f("Madyson Danish", 1, "21:31"), f("Grace Conklin", null, "21:31", "Scored"), f("Paige Sherman", null, "23:34", "Scored"),
        f("Emily Sullivan", null, "23:34", "Scored"), f("Kylie Walsh", null, "24:13", "Scored"), f("Norah Wright", null, "25:22"),
        f("Makayla Cheung", null, "26:11")
      ]
    },
    notes: ["Saugus and Winthrop run as a combined team", "Excel Academy also ran in the meet", "Run on the 2.9-mile home course"],
    sources: [{ label: "Salem News roundup", url: SN + "wednesdays-area-roundup-corbetts-strong-finish-drives-panthers/article_30d4075f-7e97-48e8-8508-f8d636f3a1f2.html" }]
  },
  {
    id: 5, date: "2026-10-03T17:00", name: "MSTCA Bay State Invitational", short: "BAY",
    home: false, league: false, site: "Wrentham Developmental Center", distance: "5K",
    headline: "Conklin runs 19:46 under the lights at Bay State",
    summary: "Under the lights at the MSTCA's Twilight Meet, Grace Conklin ran 19:46.7 to finish 15th in the Varsity A race — the fifth-fastest 5K by a Danvers girl on athletic.net's all-time list. Marcus Morais led the boys in a personal-best 18:00.4, one of four Falcon boys to set a 5K best.",
    boys: {
      race: "Varsity A 5K · 135 finishers",
      finishers: [
        f("Marcus Morais", 83, "18:00.4", "PR"), f("Levi James", 119, "19:20.8", "PR"), f("Jason Rooney", 120, "19:21.4", "PR"),
        f("Miles Pietal", 125, "19:37.1", "PR"), f("Ethan Santiago", 24, "13:02.1", "3K novice race"),
        f("Rowan Bartlett", 26, "13:03.8", "3K novice race"), f("Anis Lmal", 72, "16:35.8", "3K novice race")
      ]
    },
    girls: {
      race: "Varsity A 5K · 92 finishers",
      finishers: [
        f("Grace Conklin", 15, "19:46.7", "PR"), f("Madyson Danish", 62, "22:12.1"),
        f("Emily Sullivan", 77, "22:35.8"), f("Paige Sherman", 87, "23:38.5")
      ]
    },
    notes: ["Added to the schedule after the Ocean State Invitational was cancelled", "No team scores — Danvers ran four in each varsity race", "Three freshmen and sophomores ran the 3,000-meter novice race"],
    sources: [{ label: "Results on athletic.net", url: "https://www.athletic.net/CrossCountry/meet/278830/results" }]
  },
  {
    id: 6, date: "2026-10-07T16:00", opponent: "Marblehead", mascot: "Magicians", short: "MHD",
    home: false, league: true, site: "Lead Mills Conservation Area, Marblehead", distance: "2.97 mi",
    summary: "Marblehead swept both races at Lead Mills on the Magicians' senior day, winning the boys meet 19–43 and the girls meet 19–42. Marcus Morais split the Marblehead pack in second (18:14), and Grace Conklin (20:17) and Madyson Danish (21:25) were third and sixth in the girls race.",
    boys: {
      result: "L", us: 43, them: 19,
      winner: { name: "Filip Grubor", school: "Marblehead", time: null },
      finishers: [
        f("Marcus Morais", 2, "18:14"), f("Jason Rooney", 8, "19:26"), f("Miles Pietal", 10, "19:49"),
        f("Levi James", 11, "20:14"), f("Ethan Santiago", 12, "24:25"), f("Jakob Crandall", null, "24:31"),
        f("Miles LaMontagne", null, "24:35"), f("Samuel Lawler", null, "30:14"), f("Colin Wilhelm", null, null, "DNF")
      ]
    },
    girls: {
      result: "L", us: 42, them: 19,
      winner: { name: "Sarah Munroe", school: "Marblehead", time: null },
      finishers: [
        f("Grace Conklin", 3, "20:17"), f("Madyson Danish", 6, "21:25"), f("Emily Sullivan", 10, "23:19"),
        f("Paige Sherman", 11, "24:33"), f("Makayla Cheung", 12, "24:44"), f("Kylie Walsh", null, "24:45"),
        f("Norah Wright", null, null, "DNF")
      ]
    },
    notes: ["Places are scoring places: runners after a team's seventh finisher don't count toward the score"],
    sources: [{ label: "Marblehead Current notebook", url: "https://marbleheadcurrent.org/2026/10/12/magicians-notebook-from-the-pitch-to-the-links-successes-continue-for-the-local-teams/" }, { label: "Boys result on Arbiter Live", url: "https://www.arbiterlive.com/Teams/Schedule/9311100?activeEntityId=5538" }, { label: "Girls result on Arbiter Live", url: "https://www.arbiterlive.com/Teams/Schedule/9311101?activeEntityId=5538" }]
  },
  {
    id: 10, date: "2026-10-14T16:00", opponent: "Peabody", mascot: "Tanners", short: "PEA",
    home: true, league: true, site: "Danvers High School", distance: "2.9 mi", tag: "Senior Night",
    summary: "Peabody took both races on Senior Night at Danvers: 19–42 in the boys meet and 24–31 in the girls meet.",
    boys: { result: "L", us: 42, them: 19, finishers: null },
    girls: { result: "L", us: 31, them: 24, finishers: null },
    notes: ["Senior Night"],
    sources: [{ label: "Boys result on Arbiter Live", url: "https://www.arbiterlive.com/Teams/Schedule/9311100?activeEntityId=5538" }, { label: "Girls result on Arbiter Live", url: "https://www.arbiterlive.com/Teams/Schedule/9311101?activeEntityId=5538" }]
  },
  {
    id: 9, date: "2026-10-21T16:00", opponent: "Masconomet", mascot: "Chieftains", short: "MAS",
    home: false, league: true, site: "Bradley Palmer State Park", distance: null,
    summary: "Masconomet swept the last dual meet of the regular season at Bradley Palmer State Park. The Chieftains' boys took the first five places for a perfect 15–50 score, finishing 7–0 and clinching their first Northeastern Conference title, and the Masconomet girls won 25–34.",
    boys: { result: "L", us: 50, them: 15, finishers: null },
    girls: { result: "L", us: 34, them: 25, finishers: null },
    notes: ["Final dual meet of the regular season", "The Masconomet boys' first NEC title"],
    sources: [{ label: "Boys result on Arbiter Live", url: "https://www.arbiterlive.com/Teams/Schedule/9311100?activeEntityId=5538" }, { label: "Girls result on Arbiter Live", url: "https://www.arbiterlive.com/Teams/Schedule/9311101?activeEntityId=5538" }, { label: "Salem News roundup, Oct. 21", url: SN + "wednesdays-area-roundup-salem-boys-soccer-claims-first-playoff-berth-in-eight-years/article_7a036899-52f9-4d42-b3e3-91e435916861.html" }]
  },
  {
    id: 7, date: "2026-10-31T10:00", name: "NEC Championship Meet", short: "NEC",
    home: false, league: true, site: "Stage Fort Park, Gloucester", distance: null,
    boys: null, girls: null,
    notes: []
  },
  {
    id: 8, date: "2026-11-14T11:00", timeTbd: true, name: "MIAA Division 2 Championships", short: "MIAA", postseason: true,
    home: false, league: false, site: "Wrentham Developmental Center", distance: "5K",
    boys: null, girls: null,
    notes: [
      "Listed as \"States\" on the team schedule",
      "Division 2 runs in three waves (A, B, C): girls at 11:00 a.m., 12:30 and 2:00 p.m., boys at 11:45 a.m., 1:15 and 2:45 p.m.",
      "The top seven teams and the top ten other individuals in each wave qualify for the state meet"
    ],
    sources: [{ label: "MIAA cross country schedule (PDF)", url: "https://www.miaa.net/sites/default/files/2026-03/cross-country-2026-schedule.pdf" }]
  },
  {
    id: 14, date: "2026-11-21T14:00", name: "MIAA State Championship Meet", short: "STA", postseason: true,
    home: false, league: false, site: "Devens", distance: "5K",
    boys: null, girls: null,
    notes: ["For teams and runners who qualify at the divisional meet", "Division 2 girls race at 2:00 p.m., boys at 2:45 p.m."],
    sources: [{ label: "MIAA cross country schedule (PDF)", url: "https://www.miaa.net/sites/default/files/2026-03/cross-country-2026-schedule.pdf" }]
  }
];

/* ---------------------------------------------------------------------
   ROSTER
   squad:  "boys" | "girls"
   grade:  "Sr." | "Jr." | "So." | "Fr." | null
   pr:     5K personal best, e.g. "17:42" (null = TBD)
   Each runner's race-by-race results are pulled automatically from the
   finishers lists in MEETS above — spell names the same in both places.
   --------------------------------------------------------------------- */
const STATS_AS_OF = "Through 8 meets (Oct. 21, 2026)";

const RUNNERS = [
  { name: "Marcus Morais", squad: "boys", grade: "Sr.", captain: false, pr: "18:00.4" },
  { name: "Jason Rooney", squad: "boys", grade: "Jr.", captain: true, pr: "19:21.4" },
  { name: "Miles Pietal", squad: "boys", grade: "Jr.", captain: false, pr: "19:37.1" },
  { name: "Levi James", squad: "boys", grade: "So.", captain: false, pr: "19:20.8" },
  { name: "Jakob Crandall", squad: "boys", grade: "Sr.", captain: false, pr: null },
  { name: "Rowan Bartlett", squad: "boys", grade: "Fr.", captain: false, pr: null },
  { name: "Miles LaMontagne", squad: "boys", grade: "So.", captain: false, pr: null },
  { name: "Ethan Santiago", squad: "boys", grade: "Fr.", captain: false, pr: null },
  { name: "Colin Wilhelm", squad: "boys", grade: "Jr.", captain: false, pr: null },
  { name: "Anis Lmal", squad: "boys", grade: "So.", captain: false, pr: null },
  { name: "Samuel Lawler", squad: "boys", grade: "So.", captain: false, pr: null },

  { name: "Grace Conklin", squad: "girls", grade: "Sr.", captain: true, pr: "19:46.7" },
  { name: "Emily Sullivan", squad: "girls", grade: "Sr.", captain: true, pr: "20:46.8" },
  { name: "Madyson Danish", squad: "girls", grade: "Jr.", captain: false, pr: "21:20.8" },
  { name: "Paige Sherman", squad: "girls", grade: "Jr.", captain: false, pr: null },
  { name: "Kylie Walsh", squad: "girls", grade: "So.", captain: false, pr: null },
  { name: "Makayla Cheung", squad: "girls", grade: "So.", captain: false, pr: null },
  { name: "Norah Wright", squad: "girls", grade: "So.", captain: false, pr: null },
  { name: "Yara Azzazi", squad: "girls", grade: null, captain: false, pr: null }
];

/* ---------------------------------------------------------------------
   ALL-TIME 5K LIST
   Fastest 5,000-meter times by Danvers runners, from athletic.net's
   team records (results going back to about 2000). [name, time, year, grade]
   --------------------------------------------------------------------- */
const ALL_TIME_SOURCE = "https://www.athletic.net/CrossCountry/TeamRecords.aspx?SchoolID=19210";
const ALL_TIME = {
  boys: [
    ["William Conklin", "15:53.1", 2024, "Sr."], ["Mekonnen Eon", "16:02.2", 2021, "Sr."], ["Kevin Rogers", "16:07.8", 2021, "Sr."],
    ["Jonathan Rooney", "16:09.6", 2023, "Jr."], ["Sean Moore", "16:10.9", 2023, "Sr."], ["Luke Llewellyn", "16:29.0", 2021, "Sr."],
    ["Brian Hebert", "16:41.0", 2011, "Sr."], ["Joseph Lauretti-Pereira", "16:42.0", 2017, "Sr."], ["Charles (Chuck) Garlin", "16:42.4", 2023, "Jr."],
    ["Liam Breen", "16:45.0", 2018, "Sr."], ["James Bailey", "16:51.8", 2013, "Sr."], ["Zachary Powers", "16:59.0", 2015, "Sr."],
    ["Andy Oliver", "16:59.6", 2001, null], ["Kevin Hebert", "17:03.7", 2014, "Sr."], ["Christoper Chaprue", "17:06.0", 2009, null],
    ["William Dumont", "17:17.9", 2022, "Jr."], ["TJ Glowik", "17:21.0", 2019, "Jr."], ["Andrew Moriarty", "17:24.4", 2017, "Sr."],
    ["Christop Chapruet", "17:47.0", 2007, "So."], ["Evan Laws", "17:50.5", 2021, "Sr."]
  ],
  girls: [
    ["Catalina Dominick", "17:56.0", 2013, "Jr."], ["Shea Nemeskal", "19:20.4", 2022, "Sr."], ["Heather Wilson", "19:23.0", 2003, "Sr."],
    ["Emma Eagan", "19:46.3", 2022, "Sr."], ["Grace Conklin", "19:46.7", 2026, "Sr."], ["Haley Dyer", "19:53.8", 2009, "So."],
    ["Christina Montefusco", "20:08.8", 2008, "Sr."], ["Julie Kee", "20:16.0", 2018, "Jr."], ["Rachel Kaczynski", "20:23.0", 2008, "Fr."],
    ["Alison Barker", "20:31.1", 2013, "Sr."], ["Catherine Nemeskal", "20:37.0", 2018, "So."], ["Erin McGuirk", "20:39.1", 2001, null],
    ["Ivy O'Connor", "20:45.0", 2008, "Sr."], ["Emily Sullivan", "20:46.8", 2023, "Fr."], ["Katherine Crum", "21:03.9", 2016, "Sr."],
    ["Courtney Godfrey", "21:08.0", 2007, "Fr."], ["Astrid O'Connor", "21:10.0", 2008, "Sr."], ["Olivia Veil", "21:11.0", 2018, "So."],
    ["Addison Lamar", "21:19.9", 2024, "Fr."], ["Madyson Danish", "21:20.8", 2025, "So."]
  ]
};

/* ---------------------------------------------------------------------
   HISTORY
   --------------------------------------------------------------------- */
const TITLES = [
  { year: 1996, squad: "girls", label: "NEC Champions" },
  { year: 1997, squad: "girls", label: "NEC Champions" },
  { year: 1998, squad: "girls", label: "NEC Champions" },
  { year: 2000, squad: "girls", label: "NEC Champions" },
  { year: 2008, squad: "girls", label: "NEC Champions" },
  { year: 2017, squad: "girls", label: "NEC Champions" },
  { year: 2018, squad: "girls", label: "NEC Champions" },
  { year: 2025, squad: "girls", label: "NEC Lynch Div. Champions" },
  { year: 1980, squad: "boys", label: "NEC Champions" },
  { year: 2018, squad: "boys", label: "NEC Champions" },
  { year: 2021, squad: "boys", label: "NEC Champions" },
  { year: 2023, squad: "boys", label: "MIAA 2B Divisional Champions" },
  { year: 2023, squad: "boys", label: "MIAA Div. II State Champions" }
];

/* Dual-meet records. Use null for a squad's record if it isn't known. */
const SEASONS = [
  { year: 2025, boys: { w: 0, l: 7 }, girls: { w: 5, l: 2 }, note: "Girls: NEC Lynch Division Champions" }
];

const MILESTONES = [
  { year: "1980", text: "The boys win the program's first Northeastern Conference championship." },
  { year: "1996–98", text: "Three straight NEC titles for the girls." },
  { year: "2000", text: "The girls add a fourth conference crown in five years." },
  { year: "2008", text: "Another NEC championship for the girls." },
  { year: "2017–18", text: "The girls go back-to-back — and in 2018 the boys join them for a Danvers sweep of the NEC." },
  { year: "2021", text: "The boys win the NEC again." },
  { year: "2023", text: "The boys win the MIAA 2B divisional meet, then the MIAA Division II state championship." },
  { year: "2024", text: "Will Conklin is named NEC Boys Cross Country Runner of the Year and runs 15:53.1, the fastest 5K on the program's all-time list." },
  { year: "2025", text: "The girls go 5–2 and win the NEC Lynch Division. Grace Conklin is named NEC All-Conference." },
  { year: "2026", text: "Marcus Morais wins the race at Salem and the boys take a 28–29 thriller, their first dual-meet win since 2024. Grace Conklin runs 19:46.7 at the Bay State Invitational, fifth on the girls' all-time 5K list." }
];

const STANDOUTS = [
  { name: "2023 Boys Team", role: "Boys · State champions", year: "2023",
    bio: "Won the MIAA 2B divisional championship, then followed it with the MIAA Division II state title.",
    tags: ["MIAA Div. II champs", "2B divisional champs"] },
  { name: "Will Conklin", role: "Boys", year: "2024",
    bio: "Named Northeastern Conference Boys Cross Country Runner of the Year in 2024. His 15:53.1 that fall is the fastest 5K on the program's all-time list.",
    tags: ["NEC Runner of the Year", "15:53.1 5K"] },
  { name: "Grace Conklin", role: "Girls · Class of 2027", year: "2025",
    bio: "NEC All-Conference in 2025 and a senior captain in 2026. Her 19:46.7 at the 2026 Bay State Invitational ranks fifth on the girls' all-time 5K list.",
    tags: ["NEC All-Conference", "Captain", "19:46.7 5K"] },
  { name: "Madyson Danish", role: "Girls · Class of 2028", year: "2025",
    bio: "A 2025 NEC All-Star as a sophomore, and a race winner in 2026. Her 21:20.8 is 20th on the girls' all-time 5K list.",
    tags: ["NEC All-Star"] },
  { name: "Addison Lamar", role: "Girls", year: "2025",
    bio: "A 2025 NEC All-Star on the Lynch Division championship team.",
    tags: ["NEC All-Star"] }
];

/* ---------------------------------------------------------------------
   MEDIA
   NEWS: write-ups that open on the newspaper's site.
   To add photos: drop image files in /photos and list them in PHOTOS.
   --------------------------------------------------------------------- */
const src = (id) => MEETS.find((m) => m.id === id).sources[0].url;
const NEWS = [
  { title: "Bay State Invitational results", sub: "Results", date: "Oct. 3, 2026", site: "athletic.net", url: src(5) },
  { title: "Falcons sweep Saugus/Winthrop", sub: "Meet roundup", date: "Sept. 30, 2026", url: src(4) },
  { title: "Swampscott at Danvers", sub: "Meet roundup", date: "Sept. 23, 2026", url: src(3) },
  { title: "Boys pick up first win in two years", sub: "Meet roundup", date: "Sept. 16, 2026", url: src(2) },
  { title: "2026 cross country previews", sub: "Season preview", date: "Sept. 16, 2026", url: SN + "salem-news-2026-boys-and-girls-cross-country-previews/article_7aac22f9-ac33-4d60-8eda-5a3d4a3576c5.html" },
  { title: "Opening day vs. Beverly", sub: "Meet roundup", date: "Sept. 9, 2026", url: src(1) },
  { title: "Conklin named NEC Runner of the Year", sub: "Feature", date: "2024", url: SN + "danvers-conklin-marbleheads-oconnell-named-nec-cross-country-runners-of-the-year/article_dcf67136-97a6-11ef-8633-1f3581288c4a.html" }
];

/* Example: { src: "photos/marblehead-01.jpg", caption: "The start at Marblehead", meet: "at Marblehead" } */
const PHOTOS = [];
