/* =====================================================================
   DANVERS FALCONS SOCCER — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   The site covers both varsity teams. Everything for the girls lives in
   TEAMS.girls and everything for the boys in TEAMS.boys; the Boys / Girls
   switch at the top of every page picks which one is shown.
   Anything set to null (or left as an empty list) shows up on the site
   as "TBD" so it is obvious what still needs to come from the team.
   ===================================================================== */

const SEASON = 2026;
const DEFAULT_TEAM = "girls";   // which team a first-time visitor sees: "girls" or "boys"

const SCHOOL = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  location: "Danvers, MA",
  conference: "Northeastern Conference",
  stadium: "Dr. Deering Stadium",
  address: "60 Cabot Road, Danvers, MA 01923",
  athletics: "https://www.danversfalconsathletics.com/"
};

const HUDL_ORG = "https://fan.hudl.com/usa/ma/danvers/organization/17204/danvers-high-school/team/";
const HOME = "Dr. Deering Stadium, Danvers";
const MORSE = "Morse Field, Danvers";

/* ---------------------------------------------------------------------
   HOW A GAME IS WRITTEN (same for both teams)
   result:   "W" | "L" | "T" | null (null = not played yet)
   us / them: final score        home: true | false
   league:   true for Northeastern Conference opponents
   scrimmage: true = scrimmage (listed, but left out of the record)
   cancelled: true = called off (kept on the schedule, left out of the record)
   halves:   { us:[1st,2nd], them:[1st,2nd] }  (optional)
   scorers:  [ [player, goals], ... ]    assists: [ [player, assists], ... ]
   shutout:  [ goalkeeper(s) who kept the clean sheet ]
   plays:    goal-by-goal summary, when it is known (optional)
   standouts: players the game recap singled out
   video:    link to the Hudl game recap (optional)
   replay:   link to the full-game replay on Hudl (optional)

   Player goals, assists, shutouts and game logs on the Stats page are
   added up from these lists, so a result only has to be typed in once.
   --------------------------------------------------------------------- */

const GIRLS_HUDL = HUDL_ORG + "752826/girls-varsity-soccer";
const GIRLS_WATCH = GIRLS_HUDL + "/watch?ot=TEAM&oi=752826&hr=";
const GIRLS_REPLAY = GIRLS_HUDL + "/watch?b=";
const GIRLS_MP = "https://www.maxpreps.com/ma/soccer/girls/match/";
const X = "https://x.com/GirlsDanvers/status/";   // the team's own posts on X

const BOYS_HUDL = HUDL_ORG + "752825/boys-varsity-soccer";
const BOYS_WATCH = BOYS_HUDL + "/watch?ot=TEAM&oi=752825&hr=";
const BOYS_REPLAY = BOYS_HUDL + "/watch?b=";
const BOYS_MP = "https://www.maxpreps.com/ma/danvers/danvers-falcons/soccer/schedule/";

const TEAMS = {

  /* ===================================================================
     GIRLS
     =================================================================== */
  girls: {
    label: "Girls Soccer",
    short: "Girls",
    division: "MIAA Division 2",
    ranking: { rank: 16, of: 63, asOf: "Oct. 20" },   // MIAA power ranking within the division
    headCoach: "Jimmy Hinchion",
    coachNote: "28th season · 425th career win on Oct. 21, 2026",
    assistants: ["Ashley Gawrys", "Shawn Hills", "Taylor Orlando", "Emma Hatch (JV)"],
    links: {
      hudl: GIRLS_HUDL,
      hudlVideo: HUDL_ORG + "752826/video",
      maxpreps: "https://www.maxpreps.com/ma/danvers/danvers-falcons/soccer/girls/fall/schedule/",
      arbiter: "https://www.arbiterlive.com/Teams/Schedule/5746365?activeEntityId=5538",
      school: "https://danverspublicschools.org/dhs/athletics/girls-soccer/",
      recordBook: "https://docs.google.com/spreadsheets/d/1aEta7OUlu2jtN1_9Fnpnbcnx-u_ATxXd1bkvDhLocrY/edit?gid=1756060361"
    },

    statsAsOf: "Through 16 games (Oct. 21, 2026)",
    statsNote: "the school doesn't publish full game stats, so goals, assists and game logs come from the team's own posts on X (@GirlsDanvers) and Salem News game recaps, checked against the school's Arbiter Live game stats where they exist, and season totals are added up from the games. The paper's weekly leaders list differs by one in a few places (on Oct. 15 it had Emma Sutherland at 8 goals, where her games add up to 7 through Oct. 13); the site follows the team's game-by-game posts. Roster, jersey numbers and classes are from the school's team page.",

    schedule: [
      /* Scrimmages — listed on the school's schedule, not counted in the record */
      { id: 101, date: "2026-08-27T18:00", opponent: "Medford", mascot: "Mustangs", home: false, league: false, site: "Medford High School, Medford",
        scrimmage: true, result: "T", us: 0, them: 0, notes: [] },
      { id: 102, date: "2026-08-28T09:30", opponent: "Pingree", mascot: "Highlanders", home: false, league: false, site: "Pingree School, South Hamilton",
        scrimmage: true, result: null, notes: [] },
      { id: 103, date: "2026-08-31T16:00", opponent: "Arlington", mascot: "Spy Ponders", home: false, league: false, site: "Peirce Field, Arlington",
        scrimmage: true, result: null, notes: [] },
      { id: 104, date: "2026-09-01T16:00", opponent: "Weston", mascot: "Wildcats", home: false, league: false, site: "Weston High School, Weston",
        scrimmage: true, result: null, notes: [] },
      { id: 105, date: "2026-09-02T16:00", opponent: "Lynnfield", mascot: "Pioneers", home: false, league: false, site: "Lynnfield High School, Lynnfield",
        scrimmage: true, result: null, notes: [] },

      { id: 1, date: "2026-09-08T18:30", opponent: "Marblehead", mascot: "Magicians", home: true, league: true, site: HOME,
        result: "T", us: 2, them: 2,
        halves: { us: [2, 0], them: [2, 0] },
        summary: "The Falcons twice came back from a goal down in the first half of the season opener but couldn't find a winner despite a 20–7 edge in shots. Mia St. Pierre scored from a tough angle and Emma Sutherland got the second equalizer.",
        scorers: [["Mia St. Pierre", 1], ["Emma Sutherland", 1]],
        assists: [["Cassidy Randall", 1]],
        plays: [
          { when: "1st half", play: "Mia St. Pierre, from a tough angle", score: null },
          { when: "1st half", play: "Emma Sutherland (Cassidy Randall)", score: "2–2" }
        ],
        standouts: ["Ali Doucette", "Kaia Glover"],
        notes: ["Danvers outshot Marblehead 20–7", "Mia St. Pierre's first varsity goal"],
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDM5NjcyNQ%3D%3D",
        sources: [
          { label: "Salem News roundup, Sept. 9", url: null },
          { label: "Danvers Girls Soccer on X", url: X + "2097495320779190281" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-marblehead/9-8-2026/?c=77568c4d-2f22-425e-bcaf-b91fb7e630f0" }
        ] },

      { id: 2, date: "2026-09-14T16:30", opponent: "Winthrop", mascot: "Vikings", home: true, league: true, site: HOME,
        result: "W", us: 9, them: 1,
        halves: { us: [5, 4], them: [0, 1] },
        summary: "Mia St. Pierre and Rylee Sullivan both had hat tricks, and Emma Sutherland added two goals and two assists as Danvers rolled to its first win.",
        scorers: [["Mia St. Pierre", 3], ["Rylee Sullivan", 3], ["Emma Sutherland", 2], ["Maddie Hanas", 1]],
        assists: [["Emma Sutherland", 2], ["Kaitlyn Rosa", 2], ["Ella Cangiano", 1], ["Maggie Lamar", 1]],
        standouts: ["Kaitlyn Rosa"],
        notes: [],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWFhNzAyYmIxMGQ0NDkwYzAxMzM4YTc%3D",
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDQyMjI1Nw%3D%3D",
        sources: [
          { label: "Salem News roundup, Sept. 14", url: null },
          { label: "Danvers Girls Soccer on X", url: X + "2099625700567191902" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-winthrop/9-14-2026/?c=c9b7185f-d18f-4681-93af-2a5f7ca18fb2" }
        ] },

      { id: 3, date: "2026-09-16T16:00", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Beverly High School, Beverly",
        result: "L", us: 2, them: 3,
        halves: null,
        summary: "Rylee Sullivan scored both Danvers goals and the Falcons led 2–1, but Beverly came back to win by a goal. Taylor Landry played well in goal.",
        scorers: [["Rylee Sullivan", 2]],
        assists: [],
        standouts: ["Taylor Landry"],
        notes: ["Danvers led 2–1 before Beverly scored twice"],
        sources: [
          { label: "Salem News Athlete of the Week, Sept. 23", url: null },
          { label: "Danvers Girls Soccer on X", url: X + "2100354234021511653" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/beverly-vs-danvers/9-16-2026/?c=9db0d860-ee7f-47a9-b656-b39ae5e6c2e8" }
        ] },

      { id: 4, date: "2026-09-18T18:30", opponent: "North Reading", mascot: "Hornets", home: true, league: false, site: MORSE,
        result: "W", us: 2, them: 1,
        halves: null,
        summary: "Emma Sutherland set up Rylee Sullivan's sixth goal of the season and then scored the go-ahead goal herself in a non-league win on Danvers Youth Soccer Night.",
        scorers: [["Rylee Sullivan", 1], ["Emma Sutherland", 1]],
        assists: [["Emma Sutherland", 1], ["Mia St. Pierre", 1]],
        plays: [
          { when: "—", play: "Rylee Sullivan (Emma Sutherland)", score: null },
          { when: "—", play: "Emma Sutherland (Mia St. Pierre), go-ahead goal", score: null }
        ],
        standouts: ["Kaitlyn Rosa", "Maddie Hanas", "Ali Doucette", "Maggie Lamar"],
        notes: ["Danvers Youth Soccer Night"],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWIwNDJhZmIyNjk2MThmNzk3NWRhZjc%3D",
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDQ2MjIzMA%3D%3D",
        sources: [
          { label: "Salem News roundup", url: "https://www.salemnews.com/sports/fridays-area-roundup-sutherland-nets-the-game-winner-for-danvers-girls-soccer/article_c44299e5-4c84-4466-8763-1a39f5668cb5.html" },
          { label: "Danvers Girls Soccer on X", url: X + "2101104164214653233" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-north-reading/9-18-2026/?c=eb038759-92c2-41af-8598-df1887b3cd33" }
        ] },

      { id: 5, date: "2026-09-21T16:00", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true, site: "Masconomet Regional, Boxford",
        result: "L", us: 1, them: 5,
        halves: null,
        summary: "A tough loss to a very talented Masconomet team. Mia St. Pierre scored a beautiful goal and played well in the middle of the field.",
        scorers: [["Mia St. Pierre", 1]],
        assists: [],
        standouts: ["Mia St. Pierre"],
        notes: [],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWJhMzZmYjU2NWUyYzcxNzI0MDM4YTA%3D",
        sources: [
          { label: "Danvers Girls Soccer on X", url: X + "2102154083750551992" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-masconomet-regional-boxford/9-21-2026/?c=ff57359e-31d3-4935-b469-31ea06c3b12f" }
        ] },

      { id: 6, date: "2026-09-23T17:30", opponent: "Saugus", mascot: "Sachems", home: true, league: true, site: HOME,
        result: "W", us: 6, them: 0,
        halves: { us: [3, 3], them: [0, 0] },
        summary: "Kaia Glover scored twice and Mia St. Pierre had a goal and two assists in a home shutout. Goalkeepers Taylor Landry and Stella Shairs shared the clean sheet.",
        scorers: [["Kaia Glover", 2], ["Mia St. Pierre", 1], ["Rylee Sullivan", 1], ["Maggie Lamar", 1], ["Emma Sutherland", 1]],
        assists: [["Mia St. Pierre", 2], ["Rylee Sullivan", 1], ["Maggie Lamar", 1]],
        shutout: ["Taylor Landry", "Stella Shairs"],
        standouts: ["Maddie Hanas", "Ali Doucette", "Ella Cangiano", "Scarlet Chung"],
        notes: ["The team's post also credits an assist to Paige, who isn't on the varsity roster"],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWI4MGRkZDU2NWUyYzcxNzIzMjhiZDg%3D",
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDQ5MjE2NA%3D%3D",
        sources: [
          { label: "Salem News roundup, Sept. 23", url: null },
          { label: "Danvers Girls Soccer on X", url: X + "2102910796091015403" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-saugus/9-23-2026/?c=2d1e5f1b-b447-4004-a031-2bd7eb7b79bc" }
        ] },

      { id: 7, date: "2026-09-25T16:00", opponent: "Melrose", mascot: "Red Hawks", home: true, league: false, site: MORSE,
        result: "T", us: 1, them: 1,
        halves: { us: [0, 1], them: [1, 0] },
        summary: "Nine minutes into the second half, Mia St. Pierre took a feed from Emma Sutherland and scored the tying goal.",
        scorers: [["Mia St. Pierre", 1]],
        assists: [["Emma Sutherland", 1]],
        plays: [{ when: "49'", play: "Mia St. Pierre (Emma Sutherland)", score: "1–1" }],
        standouts: ["Maddie Hanas", "Ali Doucette", "Kaia Glover", "Maggie Lamar"],
        notes: [],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWJhMjE1NDRjMzdiZDk4OTFkMmVmMGI%3D",
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDUwNzQ0OA%3D%3D",
        sources: [
          { label: "Salem News roundup, Sept. 25", url: null },
          { label: "Danvers Girls Soccer on X", url: X + "2103616918863454313" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-melrose-red-hawks/9-25-2026/?c=8aac035f-eba0-4dfe-b882-0b824e5775a6" }
        ] },

      { id: 8, date: "2026-09-28T16:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "Peabody Veterans Memorial HS, Peabody",
        result: "W", us: 2, them: 1,
        halves: { us: [1, 1], them: [1, 0] },
        summary: "In a rain and wind storm, Rylee Sullivan tied it before halftime off an Emma Sutherland pass, then set up Mia St. Pierre's winner in the first minute of the second half as the Falcons stretched their unbeaten run to three.",
        scorers: [["Rylee Sullivan", 1], ["Mia St. Pierre", 1]],
        assists: [["Emma Sutherland", 1], ["Rylee Sullivan", 1]],
        plays: [
          { when: "1st half", play: "Rylee Sullivan (Emma Sutherland)", score: "1–1" },
          { when: "41'", play: "Mia St. Pierre (Rylee Sullivan)", score: "2–1" }
        ],
        standouts: ["Ali Doucette", "Maddie Hanas", "Maggie Lamar", "Raegan Cassidy", "Kaia Glover"],
        notes: [],
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDQ2MjIyNg%3D%3D",
        sources: [
          { label: "Salem News roundup, Sept. 28", url: null },
          { label: "Danvers Girls Soccer on X", url: X + "2104697292322115833" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-peabody-veterans-memorial/9-28-2026/?c=63a0fedc-525d-4b84-9f4d-b7d311d18ad1" }
        ] },

      { id: 9, date: "2026-09-30T16:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Piper Field, Marblehead",
        result: "L", us: 0, them: 3,
        halves: null,
        summary: "Danvers carried the play early but fell behind and couldn't recover, getting shut out for the first time this fall.",
        scorers: [], assists: [],
        standouts: ["Maggie Lamar", "Kaia Glover", "Ali Doucette"],
        notes: [],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWMwMTczOWI2NGUyMjliNmU1ZTI5YzA%3D",
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDI0OTg4MA%3D%3D",
        sources: [
          { label: "Salem News roundup, Sept. 30", url: null },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-marblehead/9-30-2026/?c=8e6be50c-9bc7-46f0-959b-b8a0740f4e91" }
        ] },

      { id: 10, date: "2026-10-02T16:00", opponent: "Bishop Fenwick", mascot: "Crusaders", home: false, league: false, site: "Donaldson Field, Peabody",
        result: "T", us: 2, them: 2,
        halves: null,
        summary: "Rylee Sullivan scored with five minutes left to earn a draw on the road. Emma Sutherland had put Danvers ahead in the 12th minute, and the Falcons held a big edge in shots on goal.",
        scorers: [["Emma Sutherland", 1], ["Rylee Sullivan", 1]],
        assists: [["Rylee Sullivan", 1]],
        plays: [
          { when: "12'", play: "Emma Sutherland (Rylee Sullivan)", score: "1–0" },
          { when: "75'", play: "Rylee Sullivan, penalty kick", score: "2–2" }
        ],
        standouts: ["Kaia Glover", "Ella Cangiano"],
        notes: [],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWMyNmY1Y2U1N2Q2YTZiOWI0OTRkYTk%3D",
        sources: [
          { label: "Salem News roundup, Oct. 2", url: null },
          { label: "Danvers Girls Soccer on X", url: X + "2106169059670892560" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/bishop-fenwick-peabody-vs-danvers/10-2-2026/?c=8aa9be7f-dea8-417a-b8bd-1bf0a17ff16f" }
        ] },

      { id: 11, date: "2026-10-05T16:30", opponent: "Swampscott", mascot: "Big Blue", home: false, league: true, site: "Blocksidge Field, Swampscott",
        result: "W", us: 3, them: 0,
        halves: { us: [1, 2], them: [0, 0] },
        summary: "In what coach Jimmy Hinchion called his team's best win of the season, Rylee Sullivan scored in the first half and Mia St. Pierre and Emma Sutherland added goals after the break. Taylor Landry earned the shutout in goal.",
        scorers: [["Rylee Sullivan", 1], ["Mia St. Pierre", 1], ["Emma Sutherland", 1]],
        assists: [["Rylee Sullivan", 2], ["Emma Sutherland", 1]],
        shutout: ["Taylor Landry"],
        plays: [
          { when: "1st half", play: "Rylee Sullivan (Emma Sutherland)", score: "1–0" },
          { when: "2nd half", play: "Mia St. Pierre (Rylee Sullivan)", score: "2–0" },
          { when: "2nd half", play: "Emma Sutherland (Rylee Sullivan)", score: "3–0" }
        ],
        standouts: ["Maddie Hanas", "Kaia Glover", "Maggie Lamar"],
        notes: [],
        sources: [
          { label: "Salem News roundup, Oct. 5", url: null },
          { label: "Danvers Girls Soccer on X", url: X + "2107237857806922097" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-swampscott/10-5-2026/?c=02153da1-cb12-4eea-8264-ee710ab1bc7f" }
        ] },

      { id: 12, date: "2026-10-10T18:00", opponent: "Lynnfield", mascot: "Pioneers", home: true, league: false, site: HOME,
        result: "W", us: 4, them: 0,
        halves: { us: [2, 2], them: [0, 0] },
        summary: "In what coach Jimmy Hinchion called the team's most complete game of the season, Rylee Sullivan scored twice, Mia St. Pierre had a goal and an assist, and Taylor Landry kept another clean sheet.",
        scorers: [["Rylee Sullivan", 2], ["Mia St. Pierre", 1], ["Maggie Lamar", 1]],
        assists: [["Mia St. Pierre", 1], ["Emma Sutherland", 1], ["Sophia Blodgett", 1]],
        shutout: ["Taylor Landry"],
        notes: [],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWNkNDQzM2U0N2VmMzkwYmY3MjBhMzU%3D",
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDYwNjc3MQ%3D%3D",
        sources: [{ label: "Salem News roundup, Oct. 11", url: null }, { label: "Danvers Girls Soccer on X", url: X + "2109079255401607219" }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-lynnfield/10-10-2026/?c=9a0b9792-d8c2-4784-bd1d-8e479647cbcd" }] },

      { id: 13, date: "2026-10-13T18:30", opponent: "Beverly", mascot: "Panthers", home: true, league: true, site: HOME,
        result: "L", us: 0, them: 2,
        halves: { us: [0, 0], them: [0, 2] },
        summary: "Beverly scored twice in the second half to complete a season sweep. Danvers had its chances but couldn't crack the Panthers' defense, which posted its fourth straight shutout.",
        scorers: [], assists: [],
        standouts: ["Raegan Cassidy", "Ali Doucette"],
        notes: [],
        video: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWQwYzg0YjkyMTNhY2YxMDlmN2RlNDU%3D",
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDYxOTA0Ng%3D%3D",
        sources: [{ label: "Salem News roundup, Oct. 13", url: null }, { label: "Danvers Girls Soccer on X", url: X + "2110173343882342743" }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/beverly-vs-danvers/10-13-2026/?c=4bf97627-a495-4524-9478-f7862595213a" }] },

      { id: 14, date: "2026-10-17T15:00", opponent: "Andover", mascot: "Golden Warriors", home: false, league: false, site: "Lovely Stadium, Andover",
        result: "T", us: 1, them: 1,
        halves: null,
        summary: "Junior captain Maddie Hanas scored in the first half off a Rylee Sullivan assist, and the Falcons held on through a defensive second half for a road draw that moved them a step closer to the state tournament.",
        scorers: [["Maddie Hanas", 1]],
        assists: [["Rylee Sullivan", 1]],
        plays: [{ when: "1st half", play: "Maddie Hanas (Rylee Sullivan)", score: null }],
        standouts: ["Maggie Lamar", "Ella Cangiano"],
        notes: [],
        sources: [{ label: "Salem News roundup, Oct. 18", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/andover-vs-danvers/10-17-2026/?c=dd4ade73-c6a6-404f-acf2-8fe72ef72741" }] },

      { id: 15, date: "2026-10-19T16:30", opponent: "Salem", mascot: "Witches", home: false, league: true, site: "Bertram Field, Salem",
        result: "L", us: 1, them: 2,
        halves: { us: [0, 1], them: [1, 1] },
        summary: "Mia St. Pierre scored with eight minutes to go, but Danvers couldn't find the equalizer. A long-range strike by Jackie Fritz held up as the winner, and Salem beat Danvers for the first time in close to 20 years.",
        scorers: [["Mia St. Pierre", 1]],
        assists: [],
        plays: [{ when: "72'", play: "Mia St. Pierre", score: "1–2" }],
        notes: ["Salem's goalkeeper made 10 saves"],
        sources: [
          { label: "Salem News roundup, Oct. 19", url: null },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-salem/10-19-2026/?c=56ac466e-b500-4c56-b53d-0b6e3227390e" }
        ] },

      { id: 16, date: "2026-10-21T18:30", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: HOME,
        result: "W", us: 3, them: 2,
        halves: null,
        summary: "On Pink Out night, Rylee Sullivan, Emma Sutherland and Mia St. Pierre scored and the Falcons held a 3–2 lead through the last 15 minutes to beat Masconomet, a month after losing 5–1 in Boxford. The win clinched a state tournament berth for the 35th straight season and was coach Jimmy Hinchion's 425th career victory.",
        scorers: [["Rylee Sullivan", 1], ["Emma Sutherland", 1], ["Mia St. Pierre", 1]],
        assists: [["Rylee Sullivan", 1], ["Kaia Glover", 1], ["Ali Doucette", 1]],
        notes: [
          "Clinched a spot in the MIAA tournament for the 35th year in a row, which the team calls the longest streak in Eastern Mass.",
          "Jimmy Hinchion's 425th career win",
          "Pink Out game for Breast Cancer Awareness Month",
          "Masconomet came in 11–1–2 and won the first meeting 5–1 on Sept. 21",
          "Goals and assists are from the team's own post; the order of the goals wasn't reported"
        ],
        replay: GIRLS_REPLAY + "QnJvYWRjYXN0NDY1OTc2NA%3D%3D",
        sources: [
          { label: "Danvers Girls Soccer on X", url: X + "2113068827408056577" },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/girls/match/danvers-vs-masconomet-regional-boxford/10-21-2026/?c=b30f279d-1ca6-4537-9dd2-26ca53204cbf" }
        ] },
      { id: 17, date: "2026-10-26T18:30", opponent: "Peabody", mascot: "Tanners", home: true, league: true, site: HOME, result: null, notes: [] },
      { id: 18, date: "2026-10-28T16:30", opponent: "Gloucester", mascot: "Fishermen", home: false, league: true, site: "Newell Stadium, Gloucester", result: null, notes: [] },

      { id: 106, date: "2026-11-02T16:00", opponent: "Lynnfield", mascot: "Pioneers", home: false, league: false, site: "Lynnfield High School, Lynnfield",
        scrimmage: true, result: null, notes: ["Scrimmage after the regular season"] }
    ],

    /* -----------------------------------------------------------------
       ROSTER — numbers and classes from the school's team page (Arbiter
       Live); positions from the Salem News 2026 preview.
       num:   jersey number (null = TBD)
       pos:   ["F"] forward · ["M"] midfielder · ["D"] defender · ["GK"] goalkeeper
       grade: "Sr." | "Jr." | "So." | "Fr." | null
       totals: { g, a } — season goals/assists. Leave it out and the site
               adds them up from the game recaps above.
       ----------------------------------------------------------------- */
    players: [
      { name: "Emma Sutherland", num: 5, pos: ["F"], grade: "Sr.", captain: true },
      { name: "Rylee Sullivan", num: 9, pos: ["F"], grade: "So.", captain: false },
      { name: "Mia St. Pierre", num: 20, pos: ["M"], grade: "Jr.", captain: false },
      { name: "Maddie Hanas", num: 3, pos: ["D", "F"], grade: "Jr.", captain: true },
      { name: "Ali Doucette", num: 24, pos: ["D"], grade: "Jr.", captain: true },
      { name: "Cassidy Randall", num: 2, pos: ["D"], grade: "Jr.", captain: true },
      { name: "Kaia Glover", num: 8, pos: ["M"], grade: "Jr.", captain: false },
      { name: "Maggie Lamar", num: 22, pos: ["M"], grade: "So.", captain: false },
      { name: "Kaitlyn Rosa", num: 7, pos: ["F"], grade: "Jr.", captain: false },
      { name: "Ella Cangiano", num: 6, pos: ["D"], grade: "So.", captain: false },
      { name: "Taylor Landry", num: 13, pos: ["GK"], grade: "Sr.", captain: false },
      { name: "Stella Shairs", num: 18, pos: ["GK"], grade: "So.", captain: false },
      { name: "Sophia Blodgett", num: 12, pos: ["M"], grade: "Jr.", captain: false },
      { name: "Scarlet Chung", num: 14, pos: ["M"], grade: "Jr.", captain: false },
      { name: "Raegan Cassidy", num: 11, pos: ["D"], grade: "So.", captain: false },
      { name: "Dani Scarpaci", num: 15, pos: ["M"], grade: "Jr.", captain: false },
      { name: "Flavia Locilento", num: 4, pos: ["F"], grade: "Jr.", captain: false },
      { name: "Ari Fajardo", num: 10, pos: ["D"], grade: "Sr.", captain: false }
    ],

    /* -----------------------------------------------------------------
       HISTORY — from the school's athletics page and the Danvers High
       Girls Soccer Record Book.
       ----------------------------------------------------------------- */
    historyIntro: "A state championship, 18 conference titles and 35 straight trips to the state tournament — the seasons and the players behind one of the North Shore's most consistent programs.",
    banners: [
      { year: 2017, label: "MIAA D2 State Champions" },
      { year: 2009, label: "North Sectional Champions" },
      { year: 2007, label: "North Sectional Champions" },
      { year: 2003, label: "North & Eastern Mass. Champions" },
      { year: 2002, label: "North Sectional Champions" }
    ],
    necTitles: [1995, 1996, 1998, 2000, 2001, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2012, 2013, 2017, 2018, 2019, 2021],
    historyTile: ["State tournaments", "35", "Straight MIAA tournament trips, through 2026"],
    historyNote: "Title years follow the school's athletics page. The record book also lists the unbeaten 2020 season as an NEC title.",

    /* [year, wins, losses, ties, coach, NEC finish, postseason] — null record = not in the record book */
    seasons: [
      [2025, 11, 7, 2, "Jimmy Hinchion", "4th", "Round of 32 — lost 1–0 at Newburyport"],
      [2024, 14, 4, 3, "Jimmy Hinchion", "2nd", "Elite 8 — lost 5–3 at Medfield"],
      [2023, 14, 4, 2, "Jimmy Hinchion", "2nd", "Round of 16"],
      [2022, 11, 4, 2, "Jimmy Hinchion", "2nd", "Round of 16"],
      [2021, 13, 2, 1, "Jimmy Hinchion", "NEC Champions", "Elite 8"],
      [2020, 11, 0, 0, "Jimmy Hinchion", "NEC Champions", "No tournament (COVID)"],
      [2019, 15, 2, 2, "Jimmy Hinchion", "NEC Champions", "First round"],
      [2018, 18, 3, 1, "Jimmy Hinchion", "NEC Champions", "North final — lost 3–1 to Winchester"],
      [2017, 15, 2, 1, "Jimmy Hinchion", "NEC Champions", "D2 State Champions — beat Medway 3–2 on penalty kicks"],
      [2016, 13, 4, 1, "Jimmy Hinchion", "3rd", "North final"],
      [2015, 16, 4, 1, "Jimmy Hinchion", "Runner-up", "Third round — lost 5–1 to Concord-Carlisle"],
      [2014, 11, 6, 1, "Jimmy Hinchion", "3rd", "First round — lost to North Andover on penalty kicks"],
      [2013, 11, 6, 1, "Jimmy Hinchion", "NEC Champions", "Second round — lost 2–1 to Wilmington in OT"],
      [2012, 14, 2, 2, "Jimmy Hinchion", "NEC Champions", "First round — lost 2–1 to Wayland in OT"],
      [2011, 11, 5, 2, "Jimmy Hinchion", "Runner-up", "Second round — lost 4–1 to Stoneham"],
      [2010, 14, 2, 2, "Jimmy Hinchion", "Runner-up", "North final"],
      [2009, 15, 0, 3, "Jimmy Hinchion", "NEC Champions", "North Champions"],
      [2008, 16, 1, 1, "Jimmy Hinchion", "NEC Champions", "First round"],
      [2007, 15, 3, 0, "Jimmy Hinchion", "NEC Champions", "North Champions"],
      [2006, 14, 2, 2, "Jimmy Hinchion", "NEC Champions", "North semifinals"],
      [2005, 14, 1, 3, "Jimmy Hinchion", "NEC Champions", "North final"],
      [2004, 15, 4, 3, "Jimmy Hinchion", "NEC Champions", "North semifinals"],
      [2003, 17, 1, 3, "Jimmy Hinchion", "NEC Champions", "North and Eastern Mass. Champions"],
      [2002, 16, 2, 0, "Jimmy Hinchion", "Runner-up", "North Champions"],
      [2001, 17, 0, 1, "Jimmy Hinchion", "NEC Champions", "North semifinals"],
      [2000, 15, 2, 1, "Jimmy Hinchion", "NEC Champions", "North semifinals"],
      [1999, 14, 3, 1, "Jimmy Hinchion", "Runner-up", "First round — lost to Wakefield on penalty kicks"],
      [1998, 18, 0, 0, "Kristen Ockvist", "NEC Champions", ""],
      [1997, 16, 1, 1, "Kristen Ockvist", "", "North quarterfinals"],
      [1996, 20, 0, 1, "Gerry Hills", "NEC Champions", "North final"],
      [1995, 18, 0, 0, "Gerry Hills", "NEC Champions", ""],
      [1994, 12, 1, 5, "Gerry Hills", "", ""],
      [1993, 11, 5, 2, "Gerry Hills", "3rd", "North final"],
      [1992, 14, 3, 1, "Gerry Hills", "Runner-up", "North semifinals"],
      [1991, 9, 5, 0, "Gerry Hills", "", "First round"],
      [1990, 8, 7, 3, "Gerry Hills & D. Ellard", "", ""],
      [1989, 4, 12, 2, "Gerry Hills & D. Ellard", "", ""],
      [1988, 4, 12, 1, "Phillip Sullivan", "", ""],
      [1987, 2, 14, 0, "Phillip Sullivan", "", ""],
      [1986, 3, 13, 0, "Jim White", "", ""],
      [1985, 1, 12, 1, "Beverly Guarino", "", ""],
      [1984, 6, 10, 0, "Beverly Guarino", "", ""],
      [1983, 6, 9, 3, "Nancy Feldman", "", ""],
      [1982, 4, 2, 1, "Phil Abbott", "", ""],
      [1981, 7, 6, 1, "Phil Abbott", "", ""],
      [1980, 4, 4, 1, "Doug Macdonald", "", ""]
    ],

    milestones: [
      { year: "1980", text: "The earliest season in the record book: 4–4–1 under coach Doug Macdonald." },
      { year: "1995", text: "An 18–0 season brings the program's first Northeastern Conference title." },
      { year: "1996", text: "The Falcons go 20–0–1 and reach the North sectional final." },
      { year: "1999", text: "Jimmy Hinchion takes over as head coach. 2026 is his 28th season." },
      { year: "2003", text: "A 17–1–3 team wins the North and Eastern Massachusetts championships." },
      { year: "2003–09", text: "Seven straight NEC titles, with North sectional crowns in 2007 and 2009." },
      { year: "2009", text: "An unbeaten 15–0–3 season. Corey Persson scores 42 goals, still the single-season record." },
      { year: "2017", text: "State champions: Danvers beats Medway 3–2 on penalty kicks for the program's first MIAA Division 2 title." },
      { year: "2020", text: "A perfect 11–0–0 in the shortened COVID season, with no state tournament to follow." },
      { year: "2024", text: "Georgia Prouty finishes her career with a program-record 146 points." }
    ],

    legends: [
      { name: "Corey Persson", role: "2008–2011 · NEC MVP 2009",
        bio: "The program's all-time leading goal scorer with 106. Her 42 goals and 55 points in 2009 are both single-season records, set while Danvers went 15–0–3.",
        tags: ["106 career goals", "42 goals in 2009"] },
      { name: "Georgia Prouty", role: "2021–2024 · NEC MVP 2023, 2024",
        bio: "The career points leader with 146, on 83 goals and a record 63 assists. Her 26 assists in 2023 are the most in a season, and she was the conference MVP twice.",
        tags: ["146 career points", "2× NEC MVP"] },
      { name: "Brittany Russo", role: "2007–2010 · Captain 2010",
        bio: "One of two Falcons with 100 career goals, finishing with 101 goals and 139 points. She scored 38 times in 2009 alongside Persson.",
        tags: ["101 career goals", "139 points"] },
      { name: "Becky Landers", role: "2008–2010 · NEC MVP 2008",
        bio: "The playmaker of the late-2000s title teams. Her 61 career assists are second in the record book, and she was the conference MVP in 2008.",
        tags: ["61 career assists", "NEC MVP"] },
      { name: "Hannah Lejeune", role: "2015–2017 · Captain 2017",
        bio: "Scored 29 goals as a senior captain in 2017, the fifth-highest total in program history, as Danvers won its first state championship.",
        tags: ["29 goals in 2017", "State champion"] },
      { name: "Emily Goddard", role: "2021–2022 · Captain 2022",
        bio: "Holds the program records for shutouts in a season (8, in both 2021 and 2022) and in a career (16), and was an NEC All-Star both years.",
        tags: ["16 career shutouts", "2× NEC All-Star"] }
    ],

    /* Record book: each list is [player, number, detail] in rank order */
    records: {
      season: {
        Goals: [["Corey Persson", 42, "2009"], ["Brittany Russo", 38, "2009"], ["Lindsay Williamson", 31, "1999"], ["Georgia Prouty", 30, "2024"], ["Hannah Lejeune", 29, "2017"]],
        Assists: [["Georgia Prouty", 26, "2023"], ["Olivia St. Pierre", 20, "2023"], ["Abby Cash", 20, "2019"], ["Arianna Bezanson", 20, "2019"], ["Riley DiGilio", 17, "2019"]],
        Points: [["Corey Persson", 55, "2009"], ["Brittany Russo", 54, "2009"], ["Georgia Prouty", 52, "2023"], ["Georgia Prouty", 44, "2024"], ["Lindsay Williamson", 42, "1999"]],
        Shutouts: [["Emily Goddard", 8, "2021 and 2022"], ["Maddie Dembowski", 6, "2023"], ["Maddie Dembowski", 5, "2024"], ["Holly DeAngelis", 5, "2020"]]
      },
      career: {
        Goals: [["Corey Persson", 106, ""], ["Brittany Russo", 101, ""], ["Georgia Prouty", 83, ""]],
        Assists: [["Georgia Prouty", 63, ""], ["Becky Landers", 61, ""], ["Corey Persson", 39, ""], ["Brittany Russo", 38, ""]],
        Points: [["Georgia Prouty", 146, ""], ["Corey Persson", 145, ""], ["Brittany Russo", 139, ""]],
        Shutouts: [["Emily Goddard", 16, ""], ["Maddie Dembowski", 11, ""]]
      }
    },

    /* -----------------------------------------------------------------
       MEDIA — Hudl doesn't allow its videos to be embedded on other
       sites, so each card opens the video on Hudl. url: null falls back
       to the team's full video page.
       To add photos: drop image files in /photos and list them in photos.
       Example: { src: "photos/swampscott-01.jpg", caption: "Sullivan scores at Swampscott" }
       ----------------------------------------------------------------- */
    videos: [
      { title: "Danvers vs. Beverly", sub: "Game Recap", season: 2026, len: "1:17", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWQwYzg0YjkyMTNhY2YxMDlmN2RlNDU%3D" },
      { title: "Danvers vs. Lynnfield", sub: "Game Recap", season: 2026, len: "1:34", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWNkNDQzM2U0N2VmMzkwYmY3MjBhMzU%3D" },
      { title: "Danvers at Bishop Fenwick", sub: "Game Recap", season: 2026, len: "1:25", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWMyNmY1Y2U1N2Q2YTZiOWI0OTRkYTk%3D" },
      { title: "Danvers at Marblehead", sub: "Game Recap", season: 2026, len: "1:16", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWMwMTczOWI2NGUyMjliNmU1ZTI5YzA%3D" },
      { title: "Danvers vs. Melrose", sub: "Game Recap", season: 2026, len: "1:25", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWJhMjE1NDRjMzdiZDk4OTFkMmVmMGI%3D" },
      { title: "Danvers vs. Saugus", sub: "Game Recap", season: 2026, len: "1:19", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWI4MGRkZDU2NWUyYzcxNzIzMjhiZDg%3D" },
      { title: "Danvers at Masconomet", sub: "Game Recap", season: 2026, len: "1:17", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWJhMzZmYjU2NWUyYzcxNzI0MDM4YTA%3D" },
      { title: "Danvers vs. North Reading", sub: "Game Recap", season: 2026, len: "1:33", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWIwNDJhZmIyNjk2MThmNzk3NWRhZjc%3D" },
      { title: "Danvers vs. Winthrop", sub: "Game Recap", season: 2026, len: "0:42", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWFhNzAyYmIxMGQ0NDkwYzAxMzM4YTc%3D" },
      { title: "Danvers vs. Chelsea", sub: "Playoff Highlights", season: 2025, len: "1:33", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OTBhMTdkYjMxNGMyZWJjZjIzOWQ1ZWM%3D" },
      { title: "Danvers vs. Andover", sub: "Game Highlights", season: 2025, len: "1:18", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OTAyODU0NmQ1NzUyMDg0ZWI2MjEzNGY%3D" },
      { title: "Danvers vs. Bishop Feehan", sub: "Game Highlights", season: 2025, len: "0:41", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OTAyMDJmNmY2MjYyZWQ3ZGUwYjJjZTI%3D" },
      { title: "Danvers vs. Lynnfield", sub: "Game Highlights", season: 2025, len: "1:31", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OGY0NzRkNDczMTE5MWIwNDllYzY2ZjE%3D" },
      { title: "Danvers vs. Marblehead", sub: "Game Highlights", season: 2025, len: "0:46", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OGY1MTg2NDliMTE3MDdhNmM5YzRkMjI%3D" },
      { title: "Danvers vs. Swampscott", sub: "Game Highlights", season: 2025, len: "1:27", url: GIRLS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OGY1MjIzMzgzNTY3MjRmMTc3NzhiZmI%3D" },
      { title: "Danvers vs. Bishop Fenwick", sub: "Game Highlights", season: 2025, len: "1:12", url: null },
      { title: "Danvers vs. Gloucester", sub: "Game Highlights", season: 2025, len: "1:33", url: null }
    ],
    photos: []
  },

  /* ===================================================================
     BOYS
     =================================================================== */
  boys: {
    label: "Boys Soccer",
    short: "Boys",
    division: "MIAA Division 2",
    ranking: { rank: 60, of: 61, asOf: "Oct. 20" },   // MIAA power ranking within the division
    headCoach: "Sam Perel",
    coachNote: "3rd season · 17–16–6 entering 2026",
    assistants: ["Nathan Dos Santos", "Jamie Kidney (JV)"],
    links: {
      hudl: BOYS_HUDL,
      hudlVideo: HUDL_ORG + "752825/video",
      maxpreps: BOYS_MP,
      arbiter: "https://www.arbiterlive.com/Teams/Schedule/5746364?activeEntityId=5538",
      school: "https://danverspublicschools.org/dhs/athletics/boys-soccer/",
      recordBook: "https://docs.google.com/spreadsheets/d/18a7tVEOYReMH80QCl6_rTqgiZfDyWE195MJkjmbHhLQ/edit?gid=1756060361"
    },

    statsAsOf: "Through 15 games (Oct. 21, 2026)",
    statsNote: "the school doesn't publish full game stats, so goals, assists and game logs come from Salem News game recaps — the scorer of the Oct. 16 goal at Gloucester wasn't reported. Roster, jersey numbers and classes are from the school's team page; positions are known only for the captains.",

    schedule: [
      /* Scrimmages — listed on the school's schedule, not counted in the record */
      { id: 101, date: "2026-08-29T09:00", opponent: "St. Mary's", mascot: "Spartans", home: true, league: false, site: HOME,
        scrimmage: true, result: null, notes: [] },
      { id: 102, date: "2026-08-31T16:00", opponent: "Mystic Valley", mascot: "Eagles", home: false, league: false, site: "Mystic Valley athletic complex, Malden",
        scrimmage: true, result: "T", us: 0, them: 0, notes: [] },

      { id: 1, date: "2026-09-08T16:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Piper Field, Marblehead",
        result: "L", us: 0, them: 7,
        halves: { us: [0, 0], them: [4, 3] },
        scorers: [], assists: [],
        notes: ["Season opener"],
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDM5MDEyNg%3D%3D",
        sources: [{ label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-marblehead/9-8-2026/?c=6107b017-a490-4a30-be2d-361e7d030547" }] },

      { id: 2, date: "2026-09-14T16:30", opponent: "Winthrop", mascot: "Vikings", home: false, league: true, site: "Miller Field, Winthrop",
        result: "L", us: 0, them: 7,
        halves: null,
        scorers: [], assists: [],
        notes: [],
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDQzMjU2MA%3D%3D",
        sources: [{ label: "Salem News roundup, Sept. 14", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-winthrop/9-14-2026/?c=6671ae04-02e7-467d-9be0-f444fae9cb7f" }] },

      { id: 3, date: "2026-09-16T17:30", opponent: "Beverly", mascot: "Panthers", home: true, league: true, site: HOME,
        result: "L", us: 0, them: 5,
        halves: { us: [0, 0], them: [1, 4] },
        summary: "Danvers trailed by a goal at halftime, but four second-half Beverly goals put it away. The Falcons, who don't have a single starter back from last year, lost five players to cramping early in the second half.",
        scorers: [], assists: [],
        standouts: ["Lucas St. Pierre", "Matthew McCrea", "Adrian Sazo"],
        notes: ["Five Danvers players left the game early in the second half with cramps"],
        video: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWFlOWRlNGE3NmY1YzlhMGIyZjhiYzE%3D",
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDQ1Mzc3Ng%3D%3D",
        sources: [{ label: "Salem News roundup, Sept. 16", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/beverly-vs-danvers/9-16-2026/?c=b309f7ec-5e7d-46e5-9cba-c635d26de734" }] },

      { id: 4, date: "2026-09-18T16:00", opponent: "Pioneer Charter", mascot: "", home: true, league: false, site: MORSE,
        result: "L", us: 0, them: 4,
        halves: { us: [0, 0], them: [1, 3] },
        summary: "Down just a goal at halftime, the young Falcons couldn't find the equalizer and gave up three in the second half.",
        scorers: [], assists: [],
        notes: ["Opponent: Pioneer Charter School of Science (Everett)"],
        video: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWI1MDAyNzk5NTc1MDYwMzM3MGNhYjY%3D",
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDQ2MjI0OQ%3D%3D",
        sources: [{ label: "Salem News roundup, Sept. 18", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-pioneer-charter-school-of-science-everett/9-18-2026/?c=8f4f221e-814b-4ebd-8907-c3c7cc5e7621" }] },

      { id: 5, date: "2026-09-21T16:00", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: HOME,
        result: "L", us: 0, them: 7,
        halves: { us: [0, 0], them: [4, 3] },
        scorers: [], assists: [],
        notes: ["Masconomet came in unbeaten"],
        video: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWI1MDFmNDk5NTc1MDYwMzM3MGQzNjU%3D",
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDQ4NDQ1Mg%3D%3D",
        sources: [{ label: "Salem News roundup, Sept. 21", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-masconomet-regional-boxford/9-21-2026/?c=c40fa034-938e-402b-919b-75fcb25ffbe0" }] },

      { id: 6, date: "2026-09-23T16:30", opponent: "Saugus", mascot: "Sachems", home: false, league: true, site: "Serino Field, Saugus",
        result: "W", us: 2, them: 1,
        halves: null,
        summary: "Nathan Kounga scored both goals — one off an Andrew Morse free kick, the other off a cross from Alejandro Henry — to give the Falcons their first win of the season.",
        scorers: [["Nathan Kounga", 2]],
        assists: [["Andrew Morse", 1], ["Alejandro Henry", 1]],
        plays: [
          { when: "—", play: "Nathan Kounga, off an Andrew Morse free kick", score: null },
          { when: "—", play: "Nathan Kounga, off an Alejandro Henry cross", score: null }
        ],
        standouts: ["Matthew McCrea", "Mateo Musta", "Luke Wynott", "Lucas St. Pierre", "Cam Sillars", "Bradley Powers", "Adrian Sazo", "Gideon Achilles"],
        notes: ["First win of the season"],
        sources: [{ label: "Salem News roundup, Sept. 23", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-saugus/9-23-2026/?c=bfc64097-bc8f-4364-9ea9-8f1c1db94296" }] },

      { id: 7, date: "2026-09-28T18:00", opponent: "Peabody", mascot: "Tanners", home: true, league: true, site: HOME,
        result: "L", us: 0, them: 3,
        halves: { us: [0, 0], them: [1, 2] },
        summary: "Peabody led 1–0 at the half on a penalty kick and added two more after the break.",
        scorers: [], assists: [],
        notes: [],
        video: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWJkNjhhZDI5MmYxMDIzODVhZmI0YWE%3D",
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDUyOTI4NA%3D%3D",
        sources: [{ label: "Salem News roundup, Sept. 28", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-peabody-veterans-memorial/9-28-2026/?c=3425d68f-bfe6-4097-a5af-188752707a09" }] },

      { id: 8, date: "2026-09-30T18:00", opponent: "Marblehead", mascot: "Magicians", home: true, league: true, site: HOME,
        result: "L", us: 0, them: 7,
        halves: { us: [0, 0], them: [6, 1] },
        summary: "Missing three starters to injury, the Falcons played much better in the second half, giving up just one goal after the break.",
        scorers: [], assists: [],
        standouts: ["Nathan Kounga", "Eoannis Nako", "Landon Raftery", "Lucas St. Pierre", "Gideon Achilles", "Matthew McCrea", "Bryce Page"],
        notes: ["Three starters out injured"],
        video: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWMwMDRmNGM0NGFmNDUyMWFkYzgzNTk%3D",
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDU0MDY4MA%3D%3D",
        sources: [{ label: "Salem News roundup, Sept. 30", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-marblehead/9-30-2026/?c=e0b34b4d-c3ad-46f6-9516-1e75d936b589" }] },

      { id: 9, date: "2026-10-05T18:30", opponent: "Swampscott", mascot: "Big Blue", home: true, league: true, site: HOME,
        result: "L", us: 0, them: 3,
        halves: null,
        scorers: [], assists: [],
        notes: [],
        video: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWM2YzNjZjA5M2Y3MjQ1NGUxZDc1MTk%3D",
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDU3NzcxOA%3D%3D",
        sources: [{ label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-swampscott/10-5-2026/?c=477c3af4-6bdc-4842-bbe6-90643a06c925" }] },

      { id: 10, date: "2026-10-10T12:00", opponent: "Bishop Fenwick", mascot: "Crusaders", home: false, league: false, site: "Donaldson Field, Peabody",
        result: "L", us: 0, them: 2,
        halves: null,
        scorers: [], assists: [],
        notes: [],
        sources: [{ label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/bishop-fenwick-peabody-vs-danvers/10-10-2026/?c=975bff4e-b5f0-4fca-90aa-cccdcac34e72" }] },

      { id: 11, date: "2026-10-12T16:30", opponent: "Lynn Classical", mascot: "Rams", home: false, league: false, site: "Manning Field, Lynn",
        result: "L", us: 1, them: 2,
        halves: null,
        summary: "Sophomore Andrew Morse finished a pass from classmate Mateo Musta to give the Falcons the lead, but Lynn Classical answered with two goals.",
        scorers: [["Andrew Morse", 1]],
        assists: [["Mateo Musta", 1]],
        plays: [{ when: "—", play: "Andrew Morse (Mateo Musta)", score: "1–0" }],
        standouts: ["Lucas St. Pierre", "Luke Wynott", "Matthew McCrea", "Cam Sillars", "Bradley Powers", "Drew Maioli"],
        notes: [],
        sources: [{ label: "Salem News roundup, Oct. 12", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-lynn-classical/10-12-2026/?c=9b3bc863-7734-4c04-82a8-c1112463e67b" }] },

      { id: 12, date: "2026-10-14T16:00", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Beverly High School, Beverly",
        result: "L", us: 0, them: 7,
        halves: null,
        summary: "Beverly completed the season sweep with a convincing home win.",
        scorers: [], assists: [],
        notes: [],
        sources: [{ label: "Salem News roundup, Oct. 14", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/beverly-vs-danvers/10-14-2026/?c=b89e44aa-a16e-4734-8511-a008f63a1487" }] },

      { id: 13, date: "2026-10-16T16:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: false, site: "Newell Stadium, Gloucester",
        result: "L", us: 1, them: 2,
        halves: { us: [1, 0], them: [0, 2] },
        summary: "The Falcons led 1–0 at halftime, but Gloucester tied it on a shot that deflected off a Danvers defender and won it about five minutes from the end off a corner kick. \"Danvers is a nice young team, they put up a good fight,\" Gloucester coach Armando Marnoto said.",
        scorers: [], assists: [],
        notes: ["Danvers' goal scorer wasn't named in the recap", "The first of two meetings with Gloucester; the Oct. 28 game is the NEC one"],
        sources: [
          { label: "Area roundup, Oct. 18", url: null },
          { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-gloucester/10-16-2026/?c=c3e0e5c5-02fb-4af2-b37a-c11e670ee07b" },
          { label: "Full-game replay on NFHS Network", url: "https://www.nfhsnetwork.com/events/gloucester-high-school-gloucester-ma/gama87b0df8a2" }
        ] },

      { id: 14, date: "2026-10-19T17:30", opponent: "Salem", mascot: "Witches", home: true, league: true, site: HOME,
        result: "L", us: 0, them: 2,
        halves: { us: [0, 0], them: [0, 2] },
        summary: "A scoreless first half gave way to two second-half goals from Salem senior captain Henry Beauparlant.",
        scorers: [], assists: [],
        notes: [],
        video: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWQ5YzFjY2RlNzVlNzkzNmQ1ZmViOTA%3D",
        replay: BOYS_REPLAY + "QnJvYWRjYXN0NDY1NTQ1Mw%3D%3D",
        sources: [{ label: "Salem News roundup, Oct. 19", url: null }, { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-salem/10-19-2026/?c=0e4ae061-c418-407b-b2c5-b3089fe6e0aa" }] },

      { id: 15, date: "2026-10-21T16:00", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true, site: "Masconomet Regional, Boxford",
        result: "L", us: 0, them: 7,
        halves: null,
        summary: "Masconomet won 7–0 on its home field, the same score as the first meeting in Danvers.",
        scorers: [], assists: [],
        notes: ["Second meeting — Masconomet also won 7–0 on Sept. 21"],
        sources: [{ label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/soccer/match/danvers-vs-masconomet-regional-boxford/10-21-2026/?c=72a09f70-101c-453e-998a-ab39c39bedac" }] },
      { id: 16, date: "2026-10-26T16:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "Peabody Veterans Memorial HS, Peabody", result: null, notes: [] },
      { id: 17, date: "2026-10-28T18:30", opponent: "Gloucester", mascot: "Fishermen", home: true, league: true, site: HOME, result: null, notes: [] },
      { id: 18, date: "2026-10-30T18:30", opponent: "Essex Tech", mascot: "Hawks", home: true, league: false, site: MORSE, result: null, notes: [] }
    ],

    /* -----------------------------------------------------------------
       ROSTER — numbers and classes from the school's team page (Arbiter
       Live). Captains and their positions per the Salem News 2026
       preview; other positions are still TBD.
       ----------------------------------------------------------------- */
    players: [
      { name: "Nathan Kounga", num: 3, pos: ["F"], grade: "Sr.", captain: true },
      { name: "Bryce Page", num: 13, pos: ["D"], grade: "Sr.", captain: true },
      { name: "Matthew McCrea", num: 7, pos: ["M"], grade: "Jr.", captain: true },
      { name: "Luke Wynott", num: 2, pos: ["M"], grade: "Jr.", captain: true },
      { name: "Andrew Morse", num: 16, pos: [], grade: "So.", captain: false },
      { name: "Alejandro Henry", num: 18, pos: [], grade: "So.", captain: false },
      { name: "Mateo Musta", num: 14, pos: [], grade: "So.", captain: false },
      { name: "Lucas St. Pierre", num: 10, pos: [], grade: "Fr.", captain: false },
      { name: "Adrian Sazo", num: 17, pos: [], grade: "Jr.", captain: false },
      { name: "Eoannis Nako", num: 20, pos: [], grade: "Sr.", captain: false },
      { name: "Gideon Achilles", num: 21, pos: [], grade: "Fr.", captain: false },
      { name: "Cam Sillars", num: 15, pos: [], grade: "Fr.", captain: false },
      { name: "Bradley Powers", num: 11, pos: [], grade: "So.", captain: false },
      { name: "Landon Raftery", num: 9, pos: [], grade: "So.", captain: false },
      { name: "Drew Maioli", num: 24, pos: [], grade: "Jr.", captain: false },
      { name: "Arthur Dos Santos", num: 1, pos: [], grade: "Sr.", captain: false },
      { name: "Beckett Serino", num: 4, pos: [], grade: "So.", captain: false },
      { name: "Joseph Moreschi", num: 5, pos: [], grade: "Sr.", captain: false },
      { name: "Atharva Aher", num: 6, pos: [], grade: "Jr.", captain: false },
      { name: "Liam Winterton", num: 8, pos: [], grade: "So.", captain: false },
      { name: "Jayko Lora", num: 12, pos: [], grade: "So.", captain: false },
      { name: "Jeronimo Silva", num: 25, pos: [], grade: "Jr.", captain: false },
      { name: "Conner Cassidy", num: null, pos: [], grade: "Sr.", captain: false }
    ],

    /* -----------------------------------------------------------------
       HISTORY — from the school's athletics page and the Danvers Boys
       Soccer Record Book.
       ----------------------------------------------------------------- */
    historyIntro: "Sixteen conference titles, three sectional crowns and more than fifty seasons of Danvers soccer — the teams, the coaches and the players who wore royal blue.",
    banners: [
      { year: 2004, label: "Sectional Champions" },
      { year: 2003, label: "Sectional Champions" },
      { year: 1993, label: "D2 North & Eastern Mass. Champions" }
    ],
    necTitles: [1974, 1977, 1978, 1993, 1994, 1996, 1998, 1999, 2002, 2004, 2010, 2011, 2012, 2013, 2014, 2016],
    historyTile: ["Sectional titles", "3", "1993 · 2003 · 2004"],
    historyNote: "Title years follow the school's athletics page; the season notes follow the record book, and the two don't always agree (the record book also credits 2009).",

    seasons: [
      [2025, 8, 8, 3, "Sam Perel", "4th", "Preliminary round — lost 2–1 to Chelsea"],
      [2024, 9, 8, 3, "Sam Perel", "4th", "Round of 32 — lost 2–0 to Weston"],
      [2023, 4, 12, 2, "Tony Vatousios", "5th", ""],
      [2022, 3, 14, 1, "Tony Vatousios", "5th", ""],
      [2021, 6, 7, 5, "Tony Vatousios", "3rd", ""],
      [2020, 2, 6, 1, "Michael Chase", "", ""],
      [2019, 3, 11, 4, "Michael Chase", "5th", ""],
      [2018, 6, 9, 3, "Pawel Brzykcy", "4th", ""],
      [2017, 12, 4, 4, "Pawel Brzykcy", "", "D2 North quarterfinals — lost 2–1 to Masconomet"],
      [2016, 17, 2, 1, "Pawel Brzykcy", "NEC Champions", "D2 North semifinals — lost 2–1 to Beverly in OT"],
      [2015, 11, 3, 5, "Michael Chase", "2nd", "First round — lost 2–0 to Masconomet"],
      [2014, 8, 8, 2, "Michael Chase", "NEC Champions", "First round"],
      [2013, 12, 3, 6, "Michael Chase", "NEC Champions", ""],
      [2012, 15, 4, 1, "Michael Chase", "NEC Champions", ""],
      [2011, 16, 4, 2, "Michael Chase", "NEC Champions", "Third round"],
      [2010, null, null, null, "Michael Chase", "NEC Co-Champions", ""],
      [2009, 15, 3, 4, "Antonio Large", "NEC Champions", "North semifinals"],
      [2008, 8, 7, 4, "Antonio Large", "2nd", "Second round"],
      [2007, 11, 8, 0, "Antonio Large", "", "First round"],
      [2006, 12, 6, 0, "Antonio Large", "", "First round"],
      [2005, 11, 3, 1, "Michael Chase", "", ""],
      [2004, 18, 3, 2, "Michael Chase", "NEC Champions", ""],
      [2003, 18, 5, 0, "Michael Chase", "", "Semifinals"],
      [2002, 15, 3, 1, "Phil Sullivan", "NEC Champions", "First round"],
      [2001, 14, 2, 2, "Phil Sullivan", "2nd", "Second round"],
      [2000, 12, 4, 2, "Phil Sullivan", "", "Semifinals"],
      [1999, 16, 2, 0, "Phil Sullivan", "NEC Champions", ""],
      [1998, 14, 2, 3, "Phil Sullivan", "Tied for 1st", ""],
      [1997, 12, 3, 3, "Phil Sullivan", "2nd", "Third round"],
      [1996, 17, 1, 2, "Phil Sullivan", "", ""],
      [1995, 14, 4, 2, "Phil Sullivan", "", "Second round"],
      [1994, 16, 0, 2, "Phil Sullivan", "", ""],
      [1993, 20, 2, 2, "Phil Sullivan", "NEC Champions", "D2 North and Eastern Mass. Champions"],
      [1992, 15, 3, 2, "Phil Sullivan", "2nd", ""],
      [1991, 14, 2, 2, "Phil Sullivan", "", "North final"],
      [1990, 13, 3, 2, "Phil Sullivan", "", ""],
      [1989, 11, 6, 1, "Phil Sullivan", "", "Quarterfinals"],
      [1988, 11, 5, 2, "Doug MacDonald", "3rd", ""],
      [1987, 3, 10, 4, "Phil Grayton", "", ""],
      [1986, null, null, null, "Phil Grayton", "", ""],
      [1985, 1, 13, 4, "Phil Grayton", "", ""],
      [1984, 6, 11, 1, "Phil Grayton", "", ""],
      [1983, 11, 5, 2, "John Greene", "5th", ""],
      [1982, 6, 8, 0, "John Greene", "", "", "NEC games only"],
      [1981, 9, 3, 2, "John Greene", "2nd", "First round", "NEC games only"],
      [1980, null, null, null, "John Greene", "4th", ""],
      [1979, 10, 5, 3, "John Greene", "", ""],
      [1978, 12, 3, 3, "John Greene", "NEC Champions", ""],
      [1977, 13, 3, 2, "John Greene", "NEC Champions", "State semifinals"],
      [1976, 6, 6, 6, "John Greene", "", ""],
      [1975, 8, 5, 5, "John Greene", "", ""],
      [1974, 15, 3, 0, "John Greene", "NEC Champions", ""],
      [1973, 10, 5, 1, "John Greene", "3rd", ""],
      [1972, 10, 2, 3, "", "", ""],
      [1971, 3, 10, 1, "", "", ""]
    ],

    milestones: [
      { year: "1971", text: "The earliest season with a record in the record book: 3–10–1." },
      { year: "1974", text: "A 15–3 season under John Greene brings the first Northeastern Conference title." },
      { year: "1977", text: "NEC champions again, and a run to the state semifinals." },
      { year: "1993", text: "The Falcons go 20–2–2 and win the Division 2 North and Eastern Massachusetts championships." },
      { year: "1994", text: "An unbeaten 16–0–2 season under Phil Sullivan." },
      { year: "2004", text: "An 18–3–2 NEC title team led by Joe Dattoli, the conference Player of the Year and an All-New England pick." },
      { year: "2010–14", text: "Five straight conference titles." },
      { year: "2016", text: "17–2–1 and NEC champions. Jay McPherson is the conference MVP and Pawel Brzykcy the NEC Coach of the Year." },
      { year: "2024", text: "Sam Perel's first season: a 9–8–3 record and a state tournament win, the program's first trip back since 2017." }
    ],

    legends: [
      { name: "Joe Dattoli", role: "Captain 2004 · NEC Player of the Year",
        bio: "The conference Player of the Year and an All-New England selection in 2004, when he captained an 18–3–2 team to the NEC title.",
        tags: ["NEC Player of the Year", "All-New England"] },
      { name: "Eric Martin", role: "2009–2012 · NEC Player of the Year 2009",
        bio: "Named the NEC Player of the Year in 2009, then captain of the 2011 and 2012 conference championship teams.",
        tags: ["NEC Player of the Year", "2× captain"] },
      { name: "Jay McPherson", role: "2015–2017 · NEC MVP 2016",
        bio: "A three-time all-league pick and the conference MVP on the 17–2–1 team that won the 2016 NEC title and reached the Division 2 North semifinals.",
        tags: ["NEC MVP", "3× all-league"] },
      { name: "Spencer Persson", role: "2014–2016 · Captain 2015, 2016",
        bio: "An all-league selection three years running and a two-time captain, including on the 2016 NEC championship team.",
        tags: ["3× all-league", "2× captain"] },
      { name: "Gianluca Locilento", role: "2024–2025 · Captain 2025",
        bio: "The program's all-league selection in both 2024 and 2025, and an NEC All-Conference pick as a senior captain.",
        tags: ["2× all-league", "NEC All-Conference"] },
      { name: "Seth Klaiman", role: "Captain 1987 · NEC MVP 1988",
        bio: "The conference MVP in 1988, when Danvers went 11–5–2 a year after winning three games.",
        tags: ["NEC MVP", "1988"] }
    ],

    /* The individual-records tab of the boys record book is still blank. */
    records: null,

    videos: [
      { title: "Danvers vs. Salem", sub: "Game Recap", season: 2026, len: "1:17", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWQ5YzFjY2RlNzVlNzkzNmQ1ZmViOTA%3D" },
      { title: "Danvers vs. Swampscott", sub: "Game Recap", season: 2026, len: "0:47", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWM2YzNjZjA5M2Y3MjQ1NGUxZDc1MTk%3D" },
      { title: "Danvers vs. Marblehead", sub: "Game Recap", season: 2026, len: "0:46", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWMwMDRmNGM0NGFmNDUyMWFkYzgzNTk%3D" },
      { title: "Danvers vs. Peabody", sub: "Game Recap", season: 2026, len: "0:32", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWJkNjhhZDI5MmYxMDIzODVhZmI0YWE%3D" },
      { title: "Danvers vs. Masconomet", sub: "Game Recap", season: 2026, len: "1:17", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWI1MDFmNDk5NTc1MDYwMzM3MGQzNjU%3D" },
      { title: "Danvers vs. Pioneer Charter", sub: "Game Recap", season: 2026, len: "0:47", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWI1MDAyNzk5NTc1MDYwMzM3MGNhYjY%3D" },
      { title: "Danvers vs. Beverly", sub: "Game Recap", season: 2026, len: "1:02", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YWFlOWRlNGE3NmY1YzlhMGIyZjhiYzE%3D" },
      { title: "Danvers vs. Weston", sub: "Playoff Highlights", season: 2024, len: "0:33", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzJjMDUwMWQwMmM2NmVlZmUwMTc1ZGI%3D" },
      { title: "Danvers vs. Taconic", sub: "Playoff Highlights", season: 2024, len: "1:33", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzI5OTQ3YmJmMzIzMjU0YzE4ODU3OGM%3D" },
      { title: "Danvers vs. Essex Tech", sub: "Game Highlights", season: 2024, len: "1:26", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzE4MGNkODg5MDJhOTJmY2RlYzViM2I%3D" },
      { title: "Danvers vs. Salem", sub: "Game Highlights", season: 2024, len: "1:39", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzEzYTRlMTVmNjMzNmVmYmNkZjdlYjc%3D" },
      { title: "Danvers vs. Marblehead", sub: "Game Highlights", season: 2024, len: "1:14", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzExMGMwODY5M2I5ODkwMDA1ODBjNjQ%3D" },
      { title: "Danvers vs. Pioneer Charter", sub: "Game Highlights", season: 2024, len: "1:19", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzBlM2IyODRhNjdiMjM1MWJiMzU3ZjQ%3D" },
      { title: "Danvers vs. Bishop Fenwick", sub: "Game Highlights", season: 2024, len: "1:38", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzAxZDliODczMDNiMTk5NzRkMmRmZWE%3D" },
      { title: "Danvers vs. Swampscott", sub: "Game Highlights", season: 2024, len: "1:02", url: BOYS_WATCH + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NmZhZjllZDljMTdlMzQ4OTNiNWFhYmU%3D" }
    ],
    photos: []
  }
};

/* Position → group used by the filter buttons on the Stats page */
const POSITION_GROUPS = {
  "Forwards": ["F"],
  "Midfielders": ["M"],
  "Defenders": ["D"],
  "Goalkeepers": ["GK"]
};
