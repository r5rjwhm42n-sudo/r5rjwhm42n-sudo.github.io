/* =====================================================================
   DANVERS FALCONS FOOTBALL — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left
   off the site until it is known.
   ===================================================================== */

const HUDL_TEAM = "https://fan.hudl.com/usa/ma/danvers/organization/17204/danvers-high-school/team/33811";
const REPLAY = HUDL_TEAM + "/boys-varsity-football/watch?b=";   // full-game livestream replays on Hudl

const TEAM = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  season: 2026,
  location: "Danvers, MA",
  conference: "Northeastern Conference",
  division: "MIAA Division 4",
  ranking: "No. 3 in the MIAA Division 4 power rankings (Oct. 30)",   // null hides it
  /* MIAA state tournament bracket: null until the MIAA posts it (Sun., Nov. 1, 1 p.m.) at
     https://www.miaa.net/miaa-football-2026-division-4-state-tournament
     Then fill it in from that page and the hub's State Tournament section draws it:
       url:   that bracket page
       seeds: every team in seed order, No. 1 first, as the page's SEEDS line lists them
       games: one entry per game, named by the two seeds in it, with the score in the same order:
              { seeds: [3, 14], score: [28, 7], date: "2026-11-06T19:00", site: "Morse Field, Danvers" }
              note: "OT", "2OT" or "PKs 4–3" (optional) · winner: the winning seed, only when the score is tied
     Add each game once it's set (date and site) and its score once it's played. */
  bracket: {
    url: "https://www.miaa.net/miaa-football-2026-division-4-state-tournament",
    seeds: ["Scituate", "Tewksbury Memorial", "Danvers", "Duxbury", "Walpole", "Tantasqua Regional",
            "Shepherd Hill Regional", "Grafton", "South High Community", "Canton", "Wayland",
            "Westfield", "Nashoba Regional", "Bedford", "Wakefield Memorial", "Ashland"],
    games: [
      { seeds: [1, 16], score: [21, 0], date: "2026-11-05T18:00", site: "Scituate High School, Scituate" },
      { seeds: [8, 9], score: [17, 12], date: "2026-11-06T18:00", site: "Grafton High School, Grafton" },
      { seeds: [4, 13], score: [35, 0], date: "2026-11-05T19:00", site: "Duxbury High School, Duxbury" },
      { seeds: [5, 12], score: [48, 18], date: "2026-11-06T18:30", site: "Walpole High School, Walpole" },
      { seeds: [2, 15], score: [35, 7], date: "2026-11-06T19:00", site: "Doucette Stadium, Tewksbury" },
      { seeds: [7, 10], score: [22, 0], date: "2026-11-06T19:00", site: "Shepherd Hill Regional High School, Dudley" },
      { seeds: [3, 14], score: [30, 27], date: "2026-11-06T18:30", site: "Morse Field, Danvers" },
      { seeds: [6, 11], score: [27, 21], date: "2026-11-06T19:00", site: "Tantasqua Regional High School, Sturbridge" },
      { seeds: [1, 8], date: "2026-11-13T19:00" },
      { seeds: [4, 5], date: "2026-11-13T19:00" },
      { seeds: [2, 7], date: "2026-11-13T19:00", site: "Doucette Stadium, Tewksbury" },
      { seeds: [3, 6], date: "2026-11-13T18:30", site: "Morse Field, Danvers" }
    ]
  },
  headCoach: "Ryan Nolan",
  assistants: ["Bryan Ibbitson", "Jon Babula", "Angel Adamas", "Tom Walfield", "Kyle Brennan",
               "Andrew Barton", "Sean Dunn", "Jeff Smith", "Tom Ladd"],
  stadium: "Dr. Deering Stadium",
  address: "60 Cabot Road, Danvers, MA 01923",
  /* Home games are sold on GoFan (the Falcon Pass there covers every home game).
     Shows a Tickets button next to Add to calendar; set to null to hide it. */
  tickets: { label: "Buy tickets", note: "Tickets on GoFan", url: "https://gofan.co/app/school/MA14553" },
  links: {
    hudl: HUDL_TEAM + "/boys-varsity-football",
    hudlVideo: HUDL_TEAM + "/video",
    athletics: "https://www.danversfalconsathletics.com/",
    maxpreps: "https://www.maxpreps.com/ma/danvers/danvers-falcons/football/"
  }
};

const HOME_FIELD = "Morse Field at Dr. Deering Stadium, Danvers";

/* ---------------------------------------------------------------------
   SCHEDULE
   result: "W" | "L" | null (null = not played yet)
   cancelled: true marks a game that was called off (kept on the schedule,
              shown as "Cancelled", left out of the record and countdown)
   us / them: final score        home: true | false
   quarters: { us:[q1,q2,q3,q4], them:[...] }  (optional)
   half: [us, them] halftime score, used when quarters aren't published
   scoring: list of scoring plays (optional; q "—" = quarter not published)
   performers: top performers    notes: short bullet points
   postseason: true for an MIAA state tournament game; round names it ("Round of 16",
               "Quarterfinals", "Semifinals", "State final") and it is listed as
               "MIAA <round>" instead of NEC / Non-league
   dateTbd:  true until the MIAA sets the day: date then only places the game in the
             list and dates (the round's days, e.g. "Nov 6–7") is shown instead
   timeTbd:  true when the day is set but the kickoff time isn't
   --------------------------------------------------------------------- */
const SCHEDULE = [
  {
    id: 1, date: "2026-09-10T18:30", opponent: "Concord-Carlisle", mascot: "Patriots",
    home: true, league: false, site: HOME_FIELD,
    result: "W", us: 16, them: 0,
    quarters: { us: [0, 7, 3, 6], them: [0, 0, 0, 0] },
    summary: "Three Falcons ran for 100-plus yards and the defense never let Concord-Carlisle run a play in Danvers territory. Danvers rolled up 382 yards, 353 of them on the ground, and allowed no first downs and just 15 yards of offense in the season opener.",
    scoring: [
      { q: "2nd", play: "Zach Fultz 23 run (Colby Medeiros kick)", score: "7–0" },
      { q: "3rd", play: "Colby Medeiros 19 field goal", score: "10–0" },
      { q: "4th", play: "Evan Kaciqi 1 run (kick blocked)", score: "16–0" }
    ],
    performers: [
      { name: "Zach Fultz", line: "14 carries, 121 yds, TD" },
      { name: "Evan Kaciqi", line: "21 carries, 114 yds, TD" },
      { name: "Jack Houston", line: "16 carries, 106 yds" },
      { name: "Nate Wise", line: "2-of-4 passing, 29 yds" }
    ],
    notes: [
      "Concord-Carlisle: 0 first downs, 15 total yards, 6 rushing",
      "Danvers had the ball for more than 33 of the 48 minutes",
      "Offensive line: McGloin (LT), Travers (LG), Maylor (C), Kinney (RG), Haskell (RT)"
    ],
    sources: [
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/trio-of-100-yard-runners-dominant-defense-propel-danvers-to-season-opening-win/article_d2a33c47-f2a5-4bca-b56d-0f0ed3b1b565.html" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/concord-carlisle-vs-danvers/9-10-2026/?c=8b2fa199-c0f7-480b-90f5-b59095f1dcef" },
      { label: "Full-game replay on DCAT (YouTube)", url: "https://www.youtube.com/watch?v=MQH2xTfdNwE" }
    ]
  },
  {
    id: 2, date: "2026-09-18T19:00", opponent: "Melrose", mascot: "Red Raiders",
    home: false, league: false, site: "Fred Green Memorial Stadium, Melrose",
    result: "W", us: 17, them: 7,
    quarters: { us: [7, 7, 3, 0], them: [0, 7, 0, 0] },
    summary: "Zach Fultz scored on the opening drive and again with three seconds left in the half, after Melrose had tied it 7–7, and Colby Medeiros added a 35-yard field goal in the third quarter. The defense held Melrose to 136 yards.",
    scoring: [
      { q: "1st", play: "Zach Fultz 1 run, on the opening drive", score: "7–0" },
      { q: "2nd · 3:57", play: "Melrose touchdown", score: "7–7" },
      { q: "2nd · 0:03", play: "Zach Fultz 2 run", score: "14–7" },
      { q: "3rd", play: "Colby Medeiros 35 field goal", score: "17–7" }
    ],
    performers: [
      { name: "Jack Houston", line: "79 rushing yds · 2 catches, 45 yds" },
      { name: "Zach Fultz", line: "56 rushing yds, 2 TD" },
      { name: "Colby Medeiros", line: "35-yd FG · onside kick to open the 2nd half" },
      { name: "Juan Martinez", line: "Recovered the onside kick" },
      { name: "Nick Xerras", line: "Blocked punt (4th quarter)" }
    ],
    notes: ["Melrose held to 136 yards, 3.7 per play"],
    sources: [
      { label: "Danvers Falcons live updates on X", url: "https://x.com/WeAreDanvers/status/2101111710316695852" },
      { label: "Salem News roundup", url: "https://www.salemnews.com/sports/friday-football-roundup-danvers-st-johns-prep-earn-big-road-wins/article_4d9c0799-dc34-4429-8822-55c36ca84e8d.html" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/uySKp6oB8EOg49Tp-axluw/football-recap-danvers-handles-melrose.htm" }
    ]
  },
  {
    id: 3, date: "2026-09-25T18:00", opponent: "Reading", mascot: "Rockets",
    home: false, league: false, site: "Hollingsworth Field, Reading",
    result: "W", us: 37, them: 20,
    quarters: { us: [0, 10, 13, 14], them: [8, 6, 0, 6] },
    summary: "Danvers trailed 8–0 after a quarter and 14–10 at halftime, then outscored Reading 27–6 after the break. The ground game produced five rushing touchdowns: Jack Houston and Zach Fultz both cleared 100 yards, and Colby Medeiros added a 36-yard field goal and an interception in a non-league road win.",
    scoring: null,
    performers: [
      { name: "Jack Houston", line: "135 rushing yds, 2 TD" },
      { name: "Zach Fultz", line: "101 rushing yds, 3 TD" },
      { name: "Colby Medeiros", line: "36-yd FG · interception" }
    ],
    notes: [
      "First time trailing at halftime this season",
      "Danvers went ahead 10–8 late in the second quarter before Reading retook the lead",
      "Reading's touchdown early in the fourth (conversion failed) cut it to 23–20, and Danvers answered to lead 30–20 with nine minutes left"
    ],
    sources: [
      { label: "Danvers Falcons live updates on X", url: "https://x.com/WeAreDanvers/status/2103629294874309060" },
      { label: "Full-game replay on Hudl", url: REPLAY + "QnJvYWRjYXN0NDQ5MzkzNQ%3D%3D" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/danvers-vs-reading-memorial/9-25-2026/?c=f11d41e9-7f18-40d5-bd55-eef839236282" },
      { label: "Boston Globe roundup", url: "https://www.bostonglobe.com/2026/09/25/sports/miaa-high-school-football-scores-week-3/" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/jNgJBQqC9kmjtMIKO3zvCQ/football-recap-higher-ranked-danvers-takes-care-of-reading-memorial.htm" }
    ]
  },
  {
    id: 4, date: "2026-10-03T11:00", opponent: "Marblehead", mascot: "Magicians",
    home: true, league: true, site: HOME_FIELD, result: null,
    cancelled: true,   // set to false and fix the date if the game is ever rescheduled
    notes: [
      "Moved from Friday night to Saturday morning, then cancelled after the death of Marblehead captain Owen Coyne.",
      "The game is not expected to be made up and does not count toward the record."
    ],
    sources: [
      { label: "Salem News", url: "https://www.salemnews.com/sports/danvers-marblehead-varsity-football-game-cancelled-this-weekend/article_f5c72aa8-6eed-486b-bc81-3b114a27df1b.html" }
    ]
  },
  {
    id: 5, date: "2026-10-09T18:30", opponent: "Beverly", mascot: "Panthers",
    home: true, league: true, site: HOME_FIELD,
    result: "W", us: 38, them: 0,
    quarters: null, half: [24, 0],
    summary: "In new all-black uniforms, Danvers debuted a shotgun double wing. Captain Nate Wise threw for a career-high 120 yards and two touchdowns, both to Jack Houston, and the defense forced three fumbles and held Beverly to 38 yards.",
    scoring: [
      { q: "—", play: "Nate Wise 15 pass to Jack Houston", score: null },
      { q: "—", play: "Nate Wise 11 pass to Jack Houston", score: null },
      { q: "—", play: "Zach Fultz rushing touchdown", score: null },
      { q: "—", play: "Zach Fultz rushing touchdown", score: null },
      { q: "—", play: "Matt Nikiforov 1 run", score: null },
      { q: "End of 2nd", play: "Colby Medeiros 40 field goal as the half ended", score: "24–0 at half" }
    ],
    performers: [
      { name: "Nate Wise", line: "120 passing yds (career high), 2 TD" },
      { name: "Jack Houston", line: "TD catches of 15 and 11 yards" },
      { name: "Zach Fultz", line: "125 rushing yds, 2 TD" },
      { name: "Matt Nikiforov", line: "1-yd TD run, his first career touchdown" },
      { name: "Colby Medeiros", line: "40-yd FG on the last play of the half" },
      { name: "DeDominicis, Capece, Mimo", line: "One fumble recovery each" }
    ],
    notes: [
      "Beverly: 5 first downs (3 by penalty) and 38 total yards",
      "243 rushing yards as a team",
      "Danvers led 7–0 after one quarter and 14–0 with 2:40 left in the half before scoring 10 more points by halftime",
      "First game in 14 days, after the Marblehead cancellation",
      "91st meeting. Beverly leads the series 60–29–2, but Danvers has won nine of the meetings since 2015"
    ],
    sources: [
      { label: "Full-game replay on Hudl", url: REPLAY + "QnJvYWRjYXN0NDU5MTI0Mw%3D%3D" },
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/back-in-black-danvers-opens-up-its-offense-rolls-all-over-beverly/article_f184c7c4-6046-4bb5-a29d-ffe49f8eb165.html" },
      { label: "Boston Globe roundup", url: "https://www.bostonglobe.com/2026/10/09/sports/miaa-high-school-football-roundup-october-9/" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/beverly-vs-danvers/10-9-2026/?c=29748a55-fb2f-41c1-873a-84a48f00c882" }
    ]
  },
  {
    id: 6, date: "2026-10-16T18:30", opponent: "Masconomet", mascot: "Chieftains",
    home: false, league: true, site: "Masconomet Regional, Boxford",
    result: "W", us: 35, them: 0,
    quarters: { us: [14, 14, 0, 7], them: [0, 0, 0, 0] },
    summary: "Danvers scored four times in the first half, piled up 399 yards and shut out the defending NEC champions in the rain. Zach Fultz ran for 179 yards, and the defense turned Masconomet away twice deep in Danvers territory.",
    scoring: [
      { q: "1st", play: "Jack Houston 2 run", score: null },
      { q: "1st half", play: "Zach Fultz 1 run", score: null },
      { q: "1st half", play: "Zach Fultz 4 run", score: null },
      { q: "1st half", play: "Nate Wise 11 pass to Jack Houston", score: "28–0 at half" },
      { q: "4th", play: "Evan Kaciqi 25 run", score: "35–0" }
    ],
    performers: [
      { name: "Zach Fultz", line: "15 carries, 179 yds, 2 TD" },
      { name: "Evan Kaciqi", line: "12 carries, 111 yds, TD" },
      { name: "Jack Houston", line: "59 rushing yds, rushing TD and receiving TD" },
      { name: "Nate Wise", line: "5-of-6 passing, 43 yds, TD" },
      { name: "Colby Medeiros", line: "5-for-5 on extra points" },
      { name: "Alexander Mimo", line: "Fumble recovery on 4th-and-goal at the 7" }
    ],
    notes: [
      "Third shutout in five games; 27 points allowed all season",
      "Ranked No. 17 in the Boston Globe Top 20 going in",
      "First win over Masconomet since 2023 (Danvers is 4–7 all-time in the series)"
    ],
    sources: [
      { label: "Full-game replay on Hudl", url: REPLAY + "QnJvYWRjYXN0NDUwNzQ3MQ%3D%3D" },
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/defense-continues-to-dominate-for-danvers-while-offense-kicks-into-gear-in-shutout-over-masco/article_575aac00-4d6e-4d9b-8891-26367b290445.html" },
      { label: "Danvers Falcons live updates on X", url: "https://x.com/WeAreDanvers/status/2111236801679511760" },
      { label: "Boston Globe roundup", url: "https://www.bostonglobe.com/2026/10/16/sports/miaa-high-school-football-october-16-roundup/" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/FoPI_SuzhEqh08J-rgB0Sw/football-recap-danvers-skates-past-masconomet-regional-with-ease.htm" }
    ]
  },
  {
    id: 7, date: "2026-10-23T18:30", opponent: "Salem", mascot: "Witches",
    home: true, league: false, site: HOME_FIELD,
    result: "W", us: 41, them: 0,
    half: [35, 0],
    summary: "Danvers celebrated Senior Night with its third straight shutout. Jack Houston scored three touchdowns, a 32-yard run and two catches from Nate Wise, Wise ran one in from a yard out, and captain Nick Xerras returned an interception 41 yards for another as the Falcons built a 14–0 lead in the first quarter and a 35–0 lead at halftime.",
    scoring: [
      { q: "—", play: "Jack Houston 32 run", score: null },
      { q: "—", play: "Nate Wise pass to Jack Houston", score: null },
      { q: "—", play: "Nate Wise pass to Jack Houston", score: null },
      { q: "—", play: "Nate Wise 1 run", score: null },
      { q: "—", play: "Nick Xerras 41 interception return", score: null }
    ],
    performers: [
      { name: "Jack Houston", line: "32-yd TD run · 2 TD catches" },
      { name: "Nate Wise", line: "2 TD passes to Houston · 1-yd TD run" },
      { name: "Nick Xerras", line: "41-yard interception return for a TD" }
    ],
    notes: [
      "Senior Night at Deering Stadium",
      "Third straight shutout and fourth in six games; 27 points allowed all season"
    ],
    sources: [
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/unbeaten-danvers-football-pitches-third-straight-shutout-hammers-salem/article_c6f8caf9-e058-4b62-8e4b-de3e94a209ac.html" },
      { label: "Boston Globe roundup", url: "https://www.bostonglobe.com/2026/10/23/sports/eastern-mass-football-st-johns-shrewsbury/" },
      { label: "Full-game replay on Hudl", url: REPLAY + "QnJvYWRjYXN0NDUwNzQ3NQ%3D%3D" },
      { label: "Danvers Falcons final score on X", url: "https://x.com/WeAreDanvers/status/2113792959753900212" },
      { label: "Danvers Falcons halftime update on X", url: "https://x.com/WeAreDanvers/status/2113776620670517517" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/danvers-vs-salem/10-23-2026/?c=26259630-cdea-40b0-ba76-b8203791a81c" }
    ]
  },
  { id: 8, date: "2026-10-30T19:00", opponent: "Peabody", mascot: "Tanners", home: false, league: true, site: "Peabody Veterans Memorial Stadium",
    result: "W", us: 17, them: 14,
    quarters: { us: [7, 3, 7, 0], them: [0, 7, 7, 0] },
    summary: "Danvers clinched the NEC Dunn Division title and a perfect 7–0 regular season. Zach Fultz scored on the opening drive, Peabody went ahead 14–10 on Drake Dixon's 3-yard run late in the third quarter, and four minutes later senior Colby Medeiros returned a punt 66 yards for his first varsity touchdown. The defense held the Tanners scoreless the rest of the way, with senior captain Nick Xerras stopping two fourth-down tries in the final quarter.",
    scoring: [
      { q: "1st", play: "Zach Fultz 4 run, on the opening drive (Colby Medeiros kick)", score: "7–0" },
      { q: "2nd", play: "Colby Medeiros field goal", score: null },
      { q: "2nd", play: "Peabody: Dominik Mercier pass to Mark Mendonca", score: null },
      { q: "3rd · 5:35", play: "Peabody: Drake Dixon 3 run", score: "10–14" },
      { q: "3rd", play: "Colby Medeiros 66 punt return (Medeiros kick)", score: "17–14" }
    ],
    performers: [
      { name: "Colby Medeiros", line: "66-yd punt return TD (his first varsity TD) · FG · 2 extra points" },
      { name: "Zach Fultz", line: "4-yd TD run on the opening drive" },
      { name: "Nick Xerras", line: "Two fourth-down stops in the 4th: a sack with 7:06 left and a tipped pass at the line with 2:01 left" }
    ],
    tag: "NEC Title Game",
    /* spotlight: a big-game banner across the top of the hub and the football home page.
       It shows for the week before the game and for two days after the final. The
       background is the first photo in PHOTOS below. */
    spotlight: {
      kicker: "NEC Title Game",
      blurb: "A Danvers win clinches the Northeastern Conference title, the program's first since 2019.",
      oppRecord: "6–2",   // Peabody's record after the game
      watch: "https://www.youtube.com/results?search_query=Peabody+TV+Danvers+vs+Peabody+football+live",   // Peabody TV's YouTube broadcast
      tickets: { label: "Tickets", note: "Peabody sells tickets on GoFan", url: "https://gofan.co/" },
      won: "NEC Dunn Division Champions",
      lost: "Final"
    },
    notes: [
      "Clinched the NEC Dunn Division title, 3–0 in league play",
      "A perfect 7–0 regular season",
      "Peabody's only lead, 14–10, lasted about four minutes",
      "Peabody coach Mark Bettencourt: \"Offense and defense didn't decide this game, it happened on special teams with the punt return.\"",
      "Danvers came in No. 17 in the Boston Globe Top 20; Peabody came in 6–1"
    ],
    sources: [
      { label: "Full-game replay on Peabody TV (YouTube)", url: "https://www.youtube.com/watch?v=JtIVvNMIin8" },
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/danvers-holds-off-peabody-in-classic-to-claim-nec-title/article_efb3db10-eee2-4c34-8635-bde6dac40ffa.html" },
      { label: "Boston Globe game story", url: "https://www.bostonglobe.com/2026/10/30/sports/danvers-peabody-football/" },
      { label: "Daily Item game story", url: "https://itemlive.com/2026/10/30/peabody-comes-up-short-against-unbeaten-danvers/" },
      { label: "New England Football Journal", url: "https://nefootballjournal.com/danvers-17-peabody-14-falcons-defense-holds-on-against-tanners/" },
      { label: "MaxPreps recap", url: "https://www.maxpreps.com/news/zjHXfVc68k2APXOq1YAq7g/football-recap-danvers-edges-past-peabody-veterans-memorial.htm" }
    ] },
  { id: 10, date: "2026-11-06T18:30", opponent: "Bedford", mascot: "Buccaneers",
    home: true, league: false, postseason: true, round: "Round of 16", site: HOME_FIELD,
    result: "W", us: 30, them: 27,
    quarters: { us: [0, 22, 0, 8], them: [7, 12, 0, 8] },
    summary: "No. 3 Danvers held off No. 14 Bedford 30–27 in a downpour at Deering Stadium in the MIAA Division 4 Round of 16. Bedford led 7–0 after a quarter, Danvers scored 22 points in the second to lead 22–19 at halftime, and Bedford went back in front 27–22 with 7:30 left. The Falcons answered with a touchdown pass to Jack Houston and a two-point conversion to retake the lead with under five minutes to play. Zach Fultz ran for 137 yards and three touchdowns and scored 22 points as Danvers stayed unbeaten at 8–0.",
    scoring: [
      { q: "1st", play: "Bedford touchdown", score: "0–7" },
      { q: "2nd", play: "Zach Fultz runs for three touchdowns as Danvers scores 22 points in the quarter", score: "22–19 at half" },
      { q: "4th · 7:30", play: "Bedford touchdown and two-point conversion", score: "22–27" },
      { q: "4th", play: "Jack Houston touchdown catch and two-point conversion, with under five minutes left", score: "30–27" }
    ],
    performers: [
      { name: "Zach Fultz", line: "137 rushing yds, 3 TD (all in the 2nd quarter), 22 points" },
      { name: "Jack Houston", line: "Go-ahead TD catch in the 4th quarter" }
    ],
    tag: "State Tournament",
    spotlight: {
      kicker: "Division 4 Round of 16",
      blurb: "No. 3 Danvers opens the MIAA Division 4 state tournament at home against No. 14 Bedford. A win sends the Falcons to the quarterfinals.",
      oppRecord: "5–4",   // Bedford's record after the game
      watch: REPLAY + "QnJvYWRjYXN0NDczNjA0NA%3D%3D",   // Hudl livestream
      tickets: { label: "Tickets", note: "Tickets on GoFan", url: "https://gofan.co/app/school/MA14553" },
      won: "On to the Quarterfinals",
      lost: "Final"
    },
    notes: ["A 30–27 win in the MIAA Division 4 Round of 16 keeps Danvers unbeaten at 8–0", "Bedford's 27 points were the most Danvers allowed this season", "Bedford came in 5–3 on a two-game win streak: 55–30 over Wayland and 44–34 over Acton-Boxborough", "Danvers came in No. 16 in the Globe Top 20 (Nov. 2)", "Danvers hosts No. 6 Tantasqua Regional, a 27–21 winner over No. 11 Wayland, in the quarterfinals on Fri., Nov. 13"],
    sources: [
      { label: "Full-game replay on Hudl", url: REPLAY + "QnJvYWRjYXN0NDczNjA0NA%3D%3D" },
      { label: "MaxPreps box score", url: "https://www.maxpreps.com/ma/football/game/bedford-vs-danvers/11-6-2026/?c=48b36cbd-abb6-4f44-9163-fe865e696ac7" },
      { label: "Danvers Falcons final score on X", url: "https://x.com/WeAreDanvers/status/2118892918195007890" },
      { label: "Danvers Falcons fourth-quarter updates on X", url: "https://x.com/WeAreDanvers/status/2118884101331566614" },
      { label: "Salem News recap", url: "https://www.salemnews.com/sports/fultzs-3-tds-late-scoring-pass-to-houston-help-unbeaten-danvers-fend-off-bedford-in/article_9ee03880-4780-4181-a35d-141cf63aa4b2.html" },
      { label: "MIAA Division 4 bracket", url: "https://www.miaa.net/miaa-football-2026-division-4-state-tournament" },
      { label: "Bedford's last game (MaxPreps)", url: "https://www.maxpreps.com/news/dfoe0HM3N0uRjdKP0slKdg/football-recap-bedford-handles-acton-boxborough.htm" },
      { label: "Globe Top 20, Nov. 2", url: "https://www.bostonglobe.com/2026/11/02/sports/eastern-mass-football-and-globe-top-20/" },
      { label: "Globe playoff preview", url: "https://www.bostonglobe.com/2026/11/01/sports/miaa-football-playoff-preview/" }
    ] },
  { id: 11, date: "2026-11-13T18:30", opponent: "Tantasqua", mascot: "Warriors",
    home: true, league: false, postseason: true, round: "Quarterfinals", site: HOME_FIELD, result: null,
    notes: ["No. 3 Danvers hosts No. 6 Tantasqua Regional in the MIAA Division 4 quarterfinals", "Tantasqua (7–2) beat No. 11 Wayland 27–21 in the Round of 16", "The winner meets No. 2 Tewksbury or No. 7 Shepherd Hill in the semifinals"],
    sources: [
      { label: "MIAA Division 4 bracket", url: "https://www.miaa.net/miaa-football-2026-division-4-state-tournament" },
      { label: "MaxPreps game page", url: "https://www.maxpreps.com/ma/football/game/danvers-vs-tantasqua-regional-fiskdale/11-13-2026/?c=40762c35-8a74-435e-ad4e-2d92f6fca15e" }
    ] },
  { id: 9, date: "2026-11-26T10:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: false, site: "Newell Stadium, Gloucester", result: null,
    notes: ["Thanksgiving Day rivalry, played every Thanksgiving morning since 1964"],
    sources: [{ label: "Watch live on NFHS Network", url: "https://www.nfhsnetwork.com/events/gloucester-high-school-gloucester-ma/gam6c9d84ba83" }] }
];

/* ---------------------------------------------------------------------
   ROSTER + PLAYER STATS (2026 season only)
   num:   jersey number (null = TBD)
   pos:   list of positions, e.g. ["RB","LB"]  ([] = TBD)
   grade: "Sr." | "Jr." | "So." | "Fr." | null
   stats: [ [label, value], ... ] season totals
   log:   { gameId: "stat line" } per-game breakdown. The rushing chart reads
          the first "<number> yds" in each line, so write rushing yards first
          and use "yards" (not "yds") for passing and receiving.

   NOTE: No official stat sheet is published for 2026 yet. Rushing totals
   for Fultz and Houston and Wise's passing line are from the newspaper's
   area leaders (Thursday, Oct. 29). Houston's receiving yards and
   Kaciqi's rushing yards are from the Boston Globe notebook of Oct. 26.
   Both cover six games; everything else was compiled from newspaper box
   scores and recaps, so it is PARTIAL. Touchdown and points totals are
   complete through Bedford (Nov. 6): Danvers scored four touchdowns there,
   Fultz's three in the 2nd quarter and Houston's in the 4th.
   Replace with the team's official numbers when you get them.
   --------------------------------------------------------------------- */
const STATS_AS_OF = "Touchdowns and points through 8 games (Nov. 6, 2026) · yardage through Oct. 23";

const PLAYERS = [
  { name: "Zach Fultz", num: null, pos: ["RB", "DB"], grade: "Jr.", captain: false,
    stats: [["Carries", 99], ["Rush Yds", 646], ["Rush TD", 15], ["Points", 94]],
    log: { 1: "14 car, 121 yds, 23-yd TD run", 2: "56 rushing yds, TD runs of 1 and 2 yards", 3: "101 rushing yds, 3 TD",
           5: "125 rushing yds, 2 TD", 6: "15 car, 179 yds, TD runs of 1 and 4 yards", 8: "4-yd TD run on the opening drive", 10: "137 rushing yds, 3 TD runs in the 2nd quarter, 22 points" } },
  { name: "Jack Houston", num: null, pos: ["RB", "LB"], grade: "Sr.", captain: true,
    stats: [["Carries", 86], ["Rush Yds", 577], ["Rush TD", 4], ["Rec Yds", 231], ["Rec TD", 6], ["Points", 60]],
    log: { 1: "16 car, 106 yds", 2: "79 rushing yds · 2 catches for 45 yards", 3: "135 rushing yds, 2 TD",
           5: "TD catches of 15 and 11 yards from Nate Wise", 6: "59 rushing yds, 2-yd TD run · 11-yard TD catch",
           7: "32-yd TD run · 2 TD catches from Nate Wise", 10: "Go-ahead TD catch in the 4th quarter" } },
  { name: "Evan Kaciqi", num: null, pos: ["RB", "DB"], grade: "So.", captain: false,
    stats: [["Rush Yds", 295], ["Rush TD", 2]],
    log: { 1: "21 car, 114 yds, 1-yd TD run (varsity debut)", 6: "12 car, 111 yds, 25-yd TD run" } },
  { name: "Nate Wise", num: null, pos: ["QB"], grade: "Sr.", captain: true,
    stats: [["Comp/Att", "20/29"], ["Pass Yds", 294], ["Pass TD", 5], ["Rush TD", 1]],
    log: { 1: "3 car, 13 yds · 2-of-4 passing for 29 yards", 5: "120 passing yards (career high), 2 TD",
           6: "5-of-6 passing for 43 yards, TD", 7: "2 TD passes to Jack Houston · 1-yd TD run" } },
  { name: "Colby Medeiros", num: 11, pos: ["K"], grade: "Sr.", captain: true,
    stats: [["FG Made", 5], ["Long FG", 40], ["INT", 1], ["Punt Ret TD", 1]],
    log: { 1: "19-yd FG · extra point", 2: "35-yd FG · onside kick to open the 2nd half", 3: "36-yd FG · interception",
           5: "40-yd FG on the last play of the half", 6: "5-for-5 on extra points",
           8: "66-yard punt return TD, his first varsity touchdown · FG · 2 extra points" } },
  { name: "Matt Nikiforov", num: null, pos: ["FB", "LB"], grade: "Sr.", captain: false,
    stats: [["Rush TD", 1], ["Rec", 1], ["Fum Rec", 1]],
    log: { 1: "1 catch for 8 yards · lead blocker for three 100-yard rushers", 5: "1-yd TD run, his first career touchdown",
           6: "Fumble recovery" } },
  { name: "Nick Xerras", num: 10, pos: ["DE"], grade: "Sr.", captain: true,
    stats: [["Blocked Punts", 1], ["INT", 1], ["Def TD", 1], ["Sacks", 1]],
    log: { 2: "Blocked punt in the 4th quarter", 6: "Pressure off the edge all night", 7: "41-yard interception return for a TD",
           8: "Late sack on Dominik Mercier to force 3rd-and-long" } },
  { name: "Hunter DeDominicis", num: 8, pos: ["DE", "OL"], grade: null, captain: true,
    stats: [["Fum Rec", 1]],
    log: { 5: "Fumble recovery · filled in at right tackle", 6: "Pressure off the edge" } },
  { name: "Dylan Kinney", num: 75, pos: ["OL", "DL"], grade: "Sr.", captain: true,
    stats: [], log: { 1: "Started at right guard" } },
  { name: "Tim Nikiforov", num: null, pos: ["LB"], grade: "So.", captain: false,
    stats: [["Rec", 1], ["Rec Yds", 21], ["Forced Fum", 1]],
    log: { 1: "1 catch for 21 yards", 5: "Forced a fumble · tipped a pass" } },
  { name: "Alexander Mimo", num: null, pos: ["DL"], grade: null, captain: false,
    stats: [["Fum Rec", 2]],
    log: { 5: "Fumble recovery", 6: "Fumble recovery on 4th-and-goal at the 7" } },
  { name: "Julian Capece", num: null, pos: ["DB"], grade: null, captain: false,
    stats: [["Fum Rec", 1]],
    log: { 5: "Fumble recovery" } },
  { name: "Juan Martinez", num: null, pos: [], grade: null, captain: false,
    stats: [["Onside Rec", 1]],
    log: { 2: "Recovered the onside kick to open the 2nd half", 5: "Nearly blocked a punt" } },
  { name: "Grayson Haskell", num: 59, pos: ["OL", "DL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at right tackle", 6: "Pressure on the Masconomet quarterback" } },
  { name: "Lucas McGloin", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at left tackle" } },
  { name: "Logan Travers", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at left guard" } },
  { name: "Cole Maylor", num: null, pos: ["OL"], grade: null, captain: false,
    stats: [], log: { 1: "Started at center" } },
  { name: "Thomas Pinto", num: null, pos: ["TE"], grade: null, captain: false,
    stats: [], log: {} },
  { name: "Ethan Schweitzer", num: null, pos: [], grade: null, captain: false,
    stats: [["Carries", 1], ["Rush Yds", -2]],
    log: { 1: "1 car, -2 yds" } }
];

/* Position → group used by the filter buttons on the Stats page */
const POSITION_GROUPS = {
  "Backs": ["QB", "RB", "FB"],
  "Receivers": ["WR", "TE"],
  "Linemen": ["OL", "DL", "C", "G", "T", "DE", "DT"],
  "Linebackers": ["LB"],
  "Secondary": ["DB", "CB", "S"],
  "Specialists": ["K", "P", "LS"]
};

/* ---------------------------------------------------------------------
   HISTORY
   --------------------------------------------------------------------- */
const TITLES = [
  { year: 1932, label: "Essex County League Champions" },
  { year: 1941, label: "NEC Champions" },
  { year: 2004, label: "NEC Champions" },
  { year: 2005, label: "NEC Champions" },
  { year: 2013, label: "NEC Champions" },
  { year: 2019, label: "NEC Champions" },
  { year: 2023, label: "MIAA D5 Final Four" },
  { year: 2026, label: "NEC Dunn Division Champions" }
];

/* Every season in the Danvers Football Record Book. w/l/t = overall record
   (from the record book), lw/ll = league record where known (MaxPreps,
   2004 on), nec = conference finish, post = MIAA tournament. Title years come
   from TITLES. w: null = no team that year. */
const SEASONS = [
  { year: 2025, w: 6, l: 5, t: 0, lw: 2, ll: 2, coach: "Ryan Nolan", nec: "2nd", post: "Division 4 Round of 16 — lost 36–20 to Ashland" },
  { year: 2024, w: 5, l: 6, t: 0, lw: 3, ll: 2, coach: "Ryan Nolan", nec: "3rd", post: "Lost 27–0 to Foxborough" },
  { year: 2023, w: 8, l: 4, t: 0, lw: 3, ll: 1, coach: "Ryan Nolan", nec: "2nd", post: "Division 5 Final Four — went 2–1, lost 27–24 to Hanover" },
  { year: 2022, w: 5, l: 6, t: 0, lw: 2, ll: 2, coach: "Ryan Nolan" },
  { year: 2021, w: 5, l: 6, t: 0, lw: 0, ll: 4, coach: "Ryan Nolan", post: "Went 1–1" },
  { year: 2020, w: 3, l: 4, t: 0, lw: 2, ll: 3, coach: "Ryan Nolan", note: "Played in spring 2021" },
  { year: 2019, w: 9, l: 2, t: 0, lw: 4, ll: 0, coach: "Ryan Nolan", post: "Went 1–1" },
  { year: 2018, w: 8, l: 3, t: 0, lw: 2, ll: 2, coach: "Ryan Nolan", post: "Went 2–1" },
  { year: 2017, w: 6, l: 5, t: 0, lw: 3, ll: 1, coach: "Ryan Nolan" },
  { year: 2016, w: 9, l: 2, t: 0, lw: 5, ll: 1, coach: "Shawn Theriault" },
  { year: 2015, w: 8, l: 4, t: 0, lw: 3, ll: 2, coach: "Shawn Theriault" },
  { year: 2014, w: 6, l: 5, t: 0, lw: 3, ll: 2, coach: "Shawn Theriault" },
  { year: 2013, w: 7, l: 4, t: 0, lw: 5, ll: 0, coach: "Sean Rogers" },
  { year: 2012, w: 5, l: 6, t: 0, lw: 2, ll: 4, coach: "Sean Rogers" },
  { year: 2011, w: 4, l: 7, t: 0, lw: 1, ll: 4, coach: "Sean Rogers" },
  { year: 2010, w: 3, l: 8, t: 0, lw: 1, ll: 4, coach: "Sean Rogers" },
  { year: 2009, w: 6, l: 5, t: 0, lw: 3, ll: 2, coach: "John Sullivan", nec: "Tied for 2nd" },
  { year: 2008, w: 1, l: 10, t: 0, lw: 0, ll: 5, coach: "John Sullivan" },
  { year: 2007, w: 0, l: 11, t: 0, lw: 0, ll: 5, coach: "John Sullivan" },
  { year: 2006, w: 3, l: 7, t: 0, lw: 2, ll: 6, coach: "Mike Stellato" },
  { year: 2005, w: 8, l: 3, t: 0, lw: 5, ll: 0, coach: "John Sullivan" },
  { year: 2004, w: 8, l: 3, t: 0, lw: 8, ll: 1, coach: "John Sullivan", nec: "The first title in 63 years", post: "First round — the program's first playoff game" },
  { year: 2003, w: 7, l: 3, t: 0, coach: "John Sullivan", nec: "3rd", post: "Did not qualify" },
  { year: 2002, w: 6, l: 4, t: 0, coach: "John Sullivan", post: "Did not qualify" },
  { year: 2001, w: 5, l: 5, t: 0, coach: "John Sullivan", post: "Did not qualify" },
  { year: 2000, w: 3, l: 7, t: 0, coach: "John Sullivan", post: "Did not qualify" },
  { year: 1999, w: 3, l: 7, t: 0, coach: "John Sullivan", post: "Did not qualify" },
  { year: 1998, w: 1, l: 9, t: 0, coach: "John Sullivan", post: "Did not qualify" },
  { year: 1997, w: 5, l: 6, t: 0, coach: "John Sullivan", post: "Did not qualify" },
  { year: 1996, w: 2, l: 9, t: 0, coach: "John Sullivan", post: "Did not qualify" },
  { year: 1995, w: 1, l: 9, t: 0, coach: "John Sullivan", post: "Did not qualify" },
  { year: 1994, w: 6, l: 4, t: 0, coach: "Butch Dzierzak", post: "Did not qualify" },
  { year: 1993, w: 7, l: 3, t: 0, coach: "Butch Dzierzak", nec: "3rd", post: "Did not qualify" },
  { year: 1992, w: 4, l: 6, t: 0, coach: "Butch Dzierzak", post: "Did not qualify" },
  { year: 1991, w: 4, l: 7, t: 0, coach: "Butch Dzierzak", post: "Did not qualify" },
  { year: 1990, w: 2, l: 7, t: 1, coach: "Butch Dzierzak", post: "Did not qualify" },
  { year: 1989, w: 2, l: 8, t: 0, coach: "Paul Ingram", post: "Did not qualify" },
  { year: 1988, w: 0, l: 10, t: 0, coach: "Paul Ingram", post: "Did not qualify" },
  { year: 1987, w: 3, l: 7, t: 0, coach: "Paul Ingram", post: "Did not qualify" },
  { year: 1986, w: 3, l: 7, t: 0, coach: "Ernest Smith", post: "Did not qualify" },
  { year: 1985, w: 0, l: 10, t: 0, coach: "Ernest Smith", post: "Did not qualify" },
  { year: 1984, w: 4, l: 6, t: 0, coach: "Ernest Smith", post: "Did not qualify" },
  { year: 1983, w: 7, l: 2, t: 1, coach: "Ernest Smith", nec: "Tied for 2nd", post: "Did not qualify" },
  { year: 1982, w: 6, l: 4, t: 0, coach: "Ernest Smith" },
  { year: 1981, w: 3, l: 7, t: 0, coach: "Ernest Smith" },
  { year: 1980, w: 7, l: 3, t: 0, coach: "Ernest Smith", nec: "Tied for 2nd" },
  { year: 1979, w: 7, l: 3, t: 0, coach: "Ernest Smith" },
  { year: 1978, w: 5, l: 5, t: 0, coach: "Ernest Smith" },
  { year: 1977, w: 2, l: 8, t: 0, coach: "Ernest Smith", nec: "7th" },
  { year: 1976, w: 4, l: 5, t: 1, coach: "Ernest Smith" },
  { year: 1975, w: 2, l: 8, t: 0, coach: "Ernest Smith", nec: "9th" },
  { year: 1974, w: 5, l: 5, t: 0, coach: "Ernest Smith", nec: "5th" },
  { year: 1973, w: 4, l: 4, t: 1, coach: "Brian Karrick" },
  { year: 1972, w: 3, l: 6, t: 1, coach: "Russ Fravel" },
  { year: 1971, w: 4, l: 5, t: 0, coach: "Russ Fravel" },
  { year: 1970, w: 7, l: 2, t: 0, coach: "Russ Fravel" },
  { year: 1969, w: 8, l: 1, t: 0, coach: "Russ Fravel" },
  { year: 1968, w: 5, l: 4, t: 0, coach: "Russ Fravel" },
  { year: 1967, w: 0, l: 9, t: 0, coach: "Russ Fravel" },
  { year: 1966, w: 4, l: 4, t: 1, coach: "Russ Fravel" },
  { year: 1965, w: 2, l: 6, t: 0, coach: "Jim McKinnon" },
  { year: 1964, w: 0, l: 9, t: 0, coach: "Jim McKinnon" },
  { year: 1963, w: 4, l: 5, t: 0, coach: "Jim McKinnon" },
  { year: 1962, w: 3, l: 4, t: 2, coach: "Jim McKinnon" },
  { year: 1961, w: 6, l: 3, t: 0, coach: "Glenn O'Brien" },
  { year: 1960, w: 5, l: 4, t: 0, coach: "Glenn O'Brien" },
  { year: 1959, w: 5, l: 3, t: 1, coach: "Glenn O'Brien" },
  { year: 1958, w: 3, l: 4, t: 2, coach: "Glenn O'Brien" },
  { year: 1957, w: 4, l: 3, t: 0, coach: "Glenn O'Brien" },
  { year: 1956, w: 3, l: 6, t: 0, coach: "Glenn O'Brien" },
  { year: 1955, w: 2, l: 7, t: 0, coach: "George Radulski" },
  { year: 1954, w: 2, l: 7, t: 0, coach: "George Radulski" },
  { year: 1953, w: 1, l: 7, t: 1, coach: "George Radulski" },
  { year: 1952, w: 8, l: 2, t: 0, coach: "George Radulski" },
  { year: 1951, w: 6, l: 4, t: 0, coach: "George Radulski" },
  { year: 1950, w: 4, l: 5, t: 1, coach: "George Radulski" },
  { year: 1949, w: 5, l: 3, t: 2, coach: "George Radulski" },
  { year: 1948, w: 3, l: 5, t: 2, coach: "George Radulski" },
  { year: 1947, w: 5, l: 5, t: 0, coach: "Richard Whitmore" },
  { year: 1946, w: 5, l: 3, t: 2, coach: "Richard Whitmore" },
  { year: 1945, w: 3, l: 7, t: 0, coach: "Richard Whitmore" },
  { year: 1944, w: 0, l: 7, t: 1, coach: "Charlie Vye" },
  { year: 1943, w: 0, l: 8, t: 0, coach: "Charlie Vye" },
  { year: 1942, w: 2, l: 5, t: 2, coach: "Charlie Vye" },
  { year: 1941, w: 9, l: 1, t: 0, coach: "Charlie Vye" },
  { year: 1940, w: 2, l: 8, t: 0, coach: "Charlie Vye" },
  { year: 1939, w: 2, l: 5, t: 2, coach: "Charlie Vye" },
  { year: 1938, w: 4, l: 6, t: 0, coach: "Charlie Vye" },
  { year: 1937, w: 2, l: 7, t: 1, coach: "Charlie Vye" },
  { year: 1936, w: 3, l: 5, t: 2, coach: "Charlie Vye" },
  { year: 1935, w: 4, l: 5, t: 1, coach: "Charlie Vye" },
  { year: 1934, w: 1, l: 8, t: 0, coach: "Charlie Vye" },
  { year: 1933, w: 4, l: 5, t: 1, coach: "Charlie Vye" },
  { year: 1932, w: 9, l: 0, t: 1, coach: "Charlie Vye" },
  { year: 1931, w: 4, l: 4, t: 2, coach: "Charlie Vye" },
  { year: 1930, w: 4, l: 6, t: 0, coach: "Lester Ayers" },
  { year: 1929, w: 1, l: 7, t: 2, coach: "Lester Ayers" },
  { year: 1928, w: 5, l: 4, t: 1, coach: "Harry Rice" },
  { year: 1927, w: 9, l: 2, t: 0, coach: "Lou Crosby" },
  { year: 1926, w: 8, l: 2, t: 0, coach: "Lou Crosby" },
  { year: 1925, w: 7, l: 3, t: 0, coach: "Lou Crosby" },
  { year: 1924, w: 4, l: 4, t: 2, coach: "Lou Crosby" },
  { year: 1923, w: 4, l: 7, t: 0, coach: "Lou Crosby" },
  { year: 1922, w: 2, l: 8, t: 3, coach: "Fred Barry" },
  { year: 1921, w: 3, l: 7, t: 2, coach: "Joe Feeney" },
  { year: 1920, w: 3, l: 5, t: 0, coach: "Clarence Lombard" },
  { year: 1919, w: null, note: "No team" },
  { year: 1918, w: null, note: "No team" },
  { year: 1917, w: null, note: "No team" },
  { year: 1916, w: null, note: "No team" },
  { year: 1915, w: null, note: "No team" },
  { year: 1914, w: null, note: "No team" },
  { year: 1913, w: 5, l: 0, t: 3, coach: "Clinton Lowe" },
  { year: 1912, w: 1, l: 9, t: 0, coach: "Rev. Chauncy Colten" },
  { year: 1911, w: null, note: "No team" },
  { year: 1910, w: 7, l: 1, t: 1, coach: "John Flaherty" },
  { year: 1909, w: 5, l: 4, t: 0, coach: "Reginald Wade" },
  { year: 1908, w: 8, l: 2, t: 2, coach: "Percy Prince" },
  { year: 1907, w: 4, l: 8, t: 2, coach: "Edward Cody" },
  { year: 1906, w: 3, l: 4, t: 1, coach: "Percy Prince" },
  { year: 1905, w: 2, l: 7, t: 1, coach: "Lenny Larkin" },
  { year: 1904, w: 3, l: 3, t: 2, coach: "John French" },
  { year: 1903, w: 3, l: 3, t: 0, coach: "Edward Kearns" },
  { year: 1902, w: 5, l: 1, t: 1, coach: "Edward Kearns" }
];

/* Captains and honors by season, from the record book.
   allLeague: NEC All-League picks. Leave out anything the book doesn't
   have. "…" marks a list the book doesn't finish. */
const HONORS = [
  { year: 2025, captains: "Mason Ellsworth, Dylan Kinney, Nate Wise, Jack Houston, Caleb Hosler",
    allLeague: "Jack Houston, Mason Ellsworth, Colby Medeiros, Zach Fultz, Nick Xerras" },
  { year: 2024, captains: "Aidan Perry, Owen Shanbar, Michael Albano, plus game-day captains",
    allLeague: "Owen Shanbar, Michael Albano, George Daaboul, Aidan Perry" },
  { year: 2023, captains: "Owen Gasinowski, Adam Guzofski, Kevin Burke, Travis Voisine, Logan Metivier", allLeague: "Owen Gasinowski (NEC MVP)" },
  { year: 2022, captains: "Aris Xerras, Steve Reardon" },
  { year: 2021, captains: "Brad Wilichoski, Evan Glynos, Colin Kelter, Mike Leon, Joe Parisi" },
  { year: 2020, captains: "Isaac Flores, Andrew Chronis, Darren McDermott" },
  { year: 2019, captains: "Tom Walfield, Ezra Lombardi, Rich Canova, Russ Canova, Jack Strangie, JP Kelter" },
  { year: 2018, captains: "Tom Walfield, Matt McCarthy, plus game-day captains" },
  { year: 2017, captains: "Zach Dillon, Justin Mullaney" },
  { year: 2016, captains: "Matt Andreas, Quinn Holland, Kieran Moriarty" },
  { year: 2015, captains: "Mike Nestor, Danny Lynch, Sam Vitale, Marco LaGambina" },
  { year: 2014, captains: "Chris Behen, Richie Martino, Cris Valles, Nick Andreas" },
  { year: 2013, captains: "Anthony Cordoba, Michael Favreau, Alex Valles", allLeague: "Mike Favreau, Alex Valles" },
  { year: 2012, captains: "Alex Grant, Connor Morrison, Jake Cawlina" },
  { year: 2011, captains: "Nick Valle, Mike Connors, Paul Nicolo, Scott Hovey" },
  { year: 2010, captains: "Greg Little, Zach Ryan" },
  { year: 2009, captains: "Greg Ladd, Eric Burgos" },
  { year: 2008, captains: "Josh Levesque, Cody Croft, John Gikas" },
  { year: 2007, captains: "Chris Martin, Kevin Keogh, Pat Hennessey", allLeague: "Chris Martin" },
  { year: 2006, captains: "Nick Steele, Pete Spiros, Brett Fravel" },
  { year: 2005, captains: "Alexander Perry, Kevin McCarthy, Derek McDonald", note: "Unbeaten at home since Thanksgiving 2002" },
  { year: 2004, captains: "Chris Small, Anthony Wijeyesinghe, Ned Grady", note: "An estimated 7,000 fans at the Thanksgiving game" },
  { year: 2003, captains: "Nick Hennessy, Nick Pisanelli, Sete King" },
  { year: 2002, captains: "Matt Smith, Jared Newbegin, Pat McGlaughlin" },
  { year: 2001, captains: "Chris Horn, Bryan Duggan, Brett Mullen, Daryle Crowley" },
  { year: 2000, captains: "Aaron Larcom" },
  { year: 1999, captains: "Jovan Tyler, Nathaniel Tiplady, Jason Ingemi" },
  { year: 1998, captains: "Jim Mysliwy, Nate Leung, Pat Negegin", note: "Randy Dinsmore ran for more than 1,000 yards, the single-season school record at the time" },
  { year: 1997, captains: "Brian Drozdowicz, Bob Mullen" },
  { year: 1996, captains: "Joey Campbell, P. Martin" },
  { year: 1995, captains: "Matt Haibon, Derel Estella, Matt Newbegin, Steve Crowe" },
  { year: 1994, captains: "M. Munzing, M. Thibault, J.M. Flint" },
  { year: 1993, captains: "T. McGraw, T. Mullen, B. Lumb" },
  { year: 1992, captains: "Kevin Brown, Jason Carter, Jeff Sawulski" },
  { year: 1987, captains: "Jeff Rich, Scott Gourley, Sean Dunn" },
  { year: 1986, captains: "Jonathan Dirks, Jamie Dembowski, Robbie Gibson" },
  { year: 1985, captains: "Tim Landers, Brian Roach" },
  { year: 1984, captains: "Tom Eagan, Adam Belanger, Dave Bavaro" },
  { year: 1983, captains: "John Arnold, Wally Dembowski, Steve Dionne, Duke St. Pierre",
    allLeague: "Duke St. Pierre, Wally Dembowski, John Arnold, Brian Richard, Tim Keenan" },
  { year: 1982, captains: "Mike Farley, Mike Landers", allLeague: "Scott Powers" },
  { year: 1981, captains: "Tom Cote, John Reddy", allLeague: "John Reddy" },
  { year: 1980, captains: "Jeff Doherty, Mar Bedrosian, …", allLeague: "John Doherty, Mark Bavaro" },
  { year: 1979, captains: "Mike Ciesinski, Bill Rossi, Nick DiPaolo", allLeague: "Bill Rossi, Mike Ciesinski, Nick DiPaolo, Jeff Doherty, Mark Bavaro" },
  { year: 1978, captains: "John Mathieu, Chuck McGrath" },
  { year: 1977, captains: "Ted St. Pierre, Tom Bouchard", allLeague: "Ted St. Pierre, Tom Bouchard" },
  { year: 1975, captains: "Dave Bevan" },
  { year: 1974, captains: "Sam Brown" },
  { year: 1973, captains: "Paul Prisby, Tom Pike, Gary Moran" },
  { year: 1972, captains: "Paul Doherty, Dick Goode, Paul Toomey" },
  { year: 1970, captains: "Chuck Flint, Del Ike, Butch Dzierzak", note: "Butch Dzierzak came back to coach the Falcons from 1990 to 1994" },
  { year: 1969, captains: "Bruce Madden, Steve Amico, Kenny St. Pierre" }
];

const MILESTONES = [
  { year: "1895", text: "First meeting in the Danvers–Gloucester series, one of the oldest rivalries on the North Shore." },
  { year: "1902", text: "The earliest season in the record book: 5–1–1 under coach Edward Kearns." },
  { year: "1932", text: "Charlie Vye's Falcons go 9–0–1 and win the Essex County League." },
  { year: "1941", text: "Danvers wins its first Northeastern Conference championship." },
  { year: "1964", text: "Danvers and Gloucester begin meeting on Thanksgiving morning — a tradition that continues today." },
  { year: "1969", text: "The Falcons go 8–1, their best record in 28 years, and set a then-school record with 269 points." },
  { year: "2004–05", text: "Back-to-back NEC championships." },
  { year: "2019", text: "A 9–2 season and a perfect 4–0 league record deliver another NEC title." },
  { year: "2023", text: "An 8–4 run carries Danvers to the MIAA Division 5 Final Four." },
  { year: "2026", text: "A perfect 7–0 regular season and the NEC Dunn Division title, clinched 17–14 at Peabody on Colby Medeiros's 66-yard punt return." }
];

const LEGENDS = [
  { name: "Mark Bavaro", pos: "Tight End", era: "Class of 1981",
    bio: "All-American at Notre Dame, then one of the best tight ends of his era with the New York Giants: two-time First-Team All-Pro and a two-time Super Bowl champion (XXI, XXV).",
    tags: ["Notre Dame", "New York Giants", "2× Super Bowl champ"] },
  { name: "David Bavaro", pos: "Linebacker", era: "Early 1980s",
    bio: "A hard-hitting all-star at Danvers who starred at Syracuse and went on to an NFL career that included stops with the Cardinals, Bills, Vikings and Patriots.",
    tags: ["Syracuse", "NFL linebacker"] },
  { name: "Ken St. Pierre", pos: "Fullback", era: "Mid 1980s",
    bio: "A bruising runner who broke the school's single-season rushing and scoring records and led the area in scoring, before playing football and baseball at Rhode Island.",
    tags: ["School rushing record", "URI"] },
  { name: "Duke St. Pierre", pos: "Quarterback / Safety", era: "Early 1980s",
    bio: "A two-time All-Northeastern Conference quarterback who threw for more than 2,700 yards and 33 touchdowns in his Danvers career — and led the team in rushing, too.",
    tags: ["2× All-NEC QB", "33 TD passes"] },
  { name: "Brian Forster", pos: "Tight End", era: "Early 1980s",
    bio: "Caught 22 passes for 600 yards and 10 touchdowns as a senior, then helped lead Rhode Island to two NCAA Division I-AA playoff appearances.",
    tags: ["URI", "10 TD senior year"] }
];

/* ---------------------------------------------------------------------
   MEDIA
   Hudl doesn't allow its videos to be embedded on other sites, so each
   card opens the video on Hudl. url: null falls back to the full
   highlights page.
   Every game's full replay belongs here, wherever it lives: Hudl, another
   school's or town's channel on YouTube (DCAT, Peabody TV, BevCam…) or the
   NFHS Network. by: names the channel when it isn't Hudl, e.g. "DCAT (YouTube)".
   To add photos: drop image files in /photos and list them in PHOTOS.
   --------------------------------------------------------------------- */
const HL = HUDL_TEAM + "/boys-varsity-football/watch?ot=TEAM&oi=33811&hr=";
const VIDEOS = [
  { title: "Danvers vs. Bedford", sub: "Full-Game Replay · Nov. 6", season: 2026, len: "Replay", url: REPLAY + "QnJvYWRjYXN0NDczNjA0NA%3D%3D" },
  { title: "Danvers at Peabody", sub: "Full-Game Replay · Oct. 30", season: 2026, len: "Replay", by: "Peabody TV (YouTube)", url: "https://www.youtube.com/watch?v=JtIVvNMIin8" },
  { title: "Danvers vs. Salem", sub: "Full-Game Replay · Oct. 23", season: 2026, len: "Replay", url: REPLAY + "QnJvYWRjYXN0NDUwNzQ3NQ%3D%3D" },
  { title: "Danvers at Masconomet", sub: "Full-Game Replay · Oct. 16", season: 2026, len: "Replay", url: REPLAY + "QnJvYWRjYXN0NDUwNzQ3MQ%3D%3D" },
  { title: "Danvers vs. Beverly", sub: "Full-Game Replay · Oct. 9", season: 2026, len: "Replay", url: REPLAY + "QnJvYWRjYXN0NDU5MTI0Mw%3D%3D" },
  { title: "Danvers at Reading", sub: "Full-Game Replay · Sept. 25", season: 2026, len: "Replay", url: REPLAY + "QnJvYWRjYXN0NDQ5MzkzNQ%3D%3D" },
  { title: "Danvers vs. Concord-Carlisle", sub: "Full-Game Replay · Sept. 10", season: 2026, len: "Replay", by: "DCAT (YouTube)", url: "https://www.youtube.com/watch?v=MQH2xTfdNwE" },
  { title: "Danvers at Concord-Carlisle", sub: "Game Recap", season: 2025, len: "1:42", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2YTliMDBiNmM2NzUyOTZjZmI1MGZlZGE%3D" },
  { title: "Danvers vs. Peabody", sub: "Game Recap", season: 2025, len: "1:41", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OThmYTBhOWE2NmUzZGMxZWMxMzBjMjY%3D" },
  { title: "Danvers vs. Reading", sub: "Game Recap", season: 2025, len: "2:00", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2OTFjYTYyNmU2MzY4NzdmZTg3ZGI4ZGM%3D" },
  { title: "Danvers vs. Salem", sub: "Game Recap", season: 2024, len: "1:53", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzRkZTgzZjk2MzE0NmUyYmQyNzM2Y2U%3D" },
  { title: "Danvers vs. Tewksbury", sub: "Game Recap", season: 2024, len: "1:46", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzM5MjJmYTJjMjFmYjJlNDE2NmEyN2E%3D" },
  { title: "Danvers vs. Peabody", sub: "Game Recap", season: 2024, len: "1:23", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzIyNWQ5YTJkMGJhMzI4N2ZmNDQ0ZmI%3D" },
  { title: "Danvers vs. Masconomet", sub: "Game Recap", season: 2024, len: "1:40", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NzBiMTlkNDE2MmI1ZmMyMTM4MmIyMGY%3D" },
  { title: "Danvers vs. Reading", sub: "Game Recap", season: 2024, len: "1:43", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NmVmNzgwODAzMzhjMmExYWIyZjBiODg%3D" },
  { title: "Danvers vs. Hanover", sub: "Playoff Recap", season: 2023, len: "1:10", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NTcyMDJlZGI1MzUxMTBhZDg1MDY5ZTk%3D" },
  { title: "Danvers vs. Gloucester", sub: "Thanksgiving Recap", season: 2023, len: "2:14", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NTcxZjZlZDVjYTk3MjBhNDgyZjNjZTE%3D" },
  { title: "Danvers vs. Masconomet", sub: "Game Recap", season: 2023, len: "1:33", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NTQxNDExNjJhYTdjYjBkYTBkMzRjOTE%3D" },
  { title: "Danvers vs. Tewksbury", sub: "Game Recap", season: 2023, len: "1:45", url: HL + "SGlnaGxpZ2h0UmVlbFN1bW1hcnk2NTAwOWM2OGMxMTliOTBkZGM2ZjNiZmE%3D" }
];

/* Example: { src: "photos/marblehead-01.jpg", caption: "Houston breaks one vs. Marblehead", game: "vs. Marblehead" }
   credit shows under the Photos grid; the first photo is also the home page backdrop and link preview. */
const PHOTOS = [
  { src: "images/action/football-under-the-lights.jpg", caption: "The Falcons under the lights", credit: "@danversfalconsathletics" }
];
