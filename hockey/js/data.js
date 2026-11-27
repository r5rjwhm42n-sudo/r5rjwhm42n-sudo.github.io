/* =====================================================================
   DANVERS FALCONS HOCKEY — SITE DATA
   boys, and the girls co-op team with Beverly and Ipswich
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left off
   the site until it is known.

   A GAME on a team's schedule:
     id, date ("2026-12-14T16:00", Eastern time), opponent, mascot,
     home (true/false), neutral: true, league (true = NEC game), site (the rink),
     tournament: true, tag: "Tournament name"    timeTbd: true (time not set)
     result: "W" / "L" / "T" (null until it's played), us, them
     line:   { us: [1, 2, 0], them: [0, 1, 1] }   goals by period (a 4th number = overtime)
     stats:  { "Player Name": { g: 2, a: 1 }, "Goalie Name": { sv: 27 } }   adds up into the roster
     summary: a short recap    notes: ["bullet", ...]    sources: [{ label, url }]

   A PLAYER on a roster: { name, num, pos: ["F"], grade: "Sr.", captain: true }

   PAST SEASONS list each game as
     [date, home (1/0), opponent, type, result, us, them, note]
   Sources: the school's record book and team pages, High School on SI
   (this winter's boys schedule) and MyHockeyLive (scores, rinks, girls schedule).
   ===================================================================== */

const SPORT = {
  key: "hockey", name: "Hockey", season: "2026–27",
  game: "game", games: "games", players: "players", start: "Puck Drop",
  scoreWord: "Goals", lineTitle: "Score by Period", periods: ["1st", "2nd", "3rd"], boxTitle: "Scoring",
  stats: [["g", "Goals", "goal"], ["a", "Assists", "assist"], ["sv", "Saves", "save"]],
  ties: true, spanYears: true
};

const SCHOOL = {
  school: "Danvers High School", name: "Danvers Falcons", location: "Danvers, MA",
  conference: "Northeastern Conference", athletics: "https://www.danversfalconsathletics.com/"
};

const TEAMS = {
  /* ================================ BOYS ================================ */
  boys: {
    label: "Boys Hockey",
    short: "Boys",
    division: "MIAA Division 3",
    headCoach: "Bill Sheehan",
    heroTitle: "Falcons drop the puck Dec. 14 against Somerville",
    preview: "Danvers went 10–10–2 last winter, finished second in the conference and won a state tournament game at Westfield before falling in the Round of 16. Tryouts begin Monday, Nov. 30, and the season opens Monday, Dec. 14 at Bourque Arena.",
    stripTile: ["State titles", 2, "1994 · 2001"],
    scheduleNote: "The 2026–27 schedule and rinks are from the school's ArbiterLive page and can change; it has the latest.",
    links: {
      school: "https://danverspublicschools.org/dhs/athletics/boys-hockey/",
      schedule: "https://www.arbiterlive.com/Teams?entityId=5538",
      recordBook: "https://docs.google.com/spreadsheets/d/1vf0NtXTt-mCHhaf4qSfU9y2mp_HIP2uRHK4gkjEYRLA/edit?gid=1756060361#gid=1756060361",
      watch: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma"
    },
    staff: [["Head coach", "Bill Sheehan", "Third season"], ["Assistant coaches", "Matt Churchill & Trevor McNeill"], ["JV coach", "Shane Swanton"]],
    about: [
      "Danvers boys hockey has two state championships, in 1994 and 2001, and 11 Northeastern Conference titles. The Falcons play their home games at the Raymond J. Bourque Arena at Endicott College in Beverly.",
      "The Falcons skate in the Northeastern Conference against Gloucester, Marblehead, Masconomet, Saugus and Winthrop. The most anticipated games each winter are against rivals Beverly and Peabody.",
      "The Danvers Hockey Boosters support the program at danversfalconshockey.com. Coaching staff as listed on the school's team page."
    ],
    rosterNote: "The 2026–27 roster will be posted after tryouts, which begin Monday, Nov. 30.",
    schedule: [
      { id: 1, date: "2026-12-14T19:30", opponent: "Somerville", mascot: "Highlanders", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 2, date: "2026-12-16T18:30", opponent: "Essex Tech", mascot: "Hawks", home: false, league: false, site: "Essex Sports Center, Middleton", result: null },
      { id: 3, date: "2026-12-19T19:30", opponent: "Saugus", mascot: "Sachems", home: false, league: true, site: "Kasabuski Rink, Saugus", result: null },
      { id: 4, date: "2026-12-23T15:30", opponent: "Winthrop", mascot: "Vikings", home: true, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      {
        id: 5,
        date: "2026-12-26T16:00",
        opponent: "Marblehead",
        mascot: "Magicians",
        home: false,
        league: false,
        tournament: true,
        site: "Dorothy Talbot Rink, Gloucester",
        result: null,
        neutral: true,
        tag: "Cape Ann Savings Bank Holiday Tournament",
        notes: ["First round of the Cape Ann Savings Bank Holiday Tournament at Gloucester's Talbot Rink", "A championship or consolation game follows on Sunday, Dec. 27"]
      },
      {
        id: 6,
        date: "2026-12-27T12:00",
        opponent: "Opponent to be announced",
        home: false,
        league: false,
        timeTbd: true,
        site: "Site to be announced",
        result: null,
        name: "Holiday Tournament: final round",
        tournament: true,
        neutral: true,
        tag: "Cape Ann Savings Bank Holiday Tournament",
        notes: ["The championship or consolation game of the Cape Ann Savings Bank Holiday Tournament", "The opponent, time and rink depend on Saturday's results"]
      },
      { id: 7, date: "2026-12-30T12:00", opponent: "Swampscott", mascot: "Big Blue", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 8, date: "2027-01-06T18:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: true, site: "Dorothy Talbot Rink, Gloucester", result: null },
      {
        id: 9,
        date: "2027-01-09T14:00",
        opponent: "Newton North",
        mascot: "Tigers",
        home: false,
        league: false,
        tournament: true,
        site: "Walter Brown Arena, Boston University, Boston",
        result: null,
        neutral: true,
        tag: "Travis Roy Jr. Beanpot",
        notes: ["Danvers plays Newton North in the Travis Roy Jr. Beanpot at Boston University's Walter Brown Arena", "The tournament runs Jan. 9 and 10"]
      },
      { id: 10, date: "2027-01-13T19:00", opponent: "Beverly", mascot: "Panthers", home: false, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 11, date: "2027-01-16T20:00", opponent: "Masconomet", mascot: "Chieftains", home: true, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 12, date: "2027-01-18T12:00", opponent: "Stoneham", mascot: "Spartans", home: false, league: false, site: "Stoneham Arena, Stoneham", result: null },
      { id: 13, date: "2027-01-23T15:00", opponent: "Winthrop", mascot: "Vikings", home: false, league: true, site: "Larsen Rink, Winthrop", result: null },
      { id: 14, date: "2027-01-30T20:00", opponent: "Gloucester", mascot: "Fishermen", home: true, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 15, date: "2027-02-06T18:00", opponent: "Beverly", mascot: "Panthers", home: true, league: true, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 16, date: "2027-02-10T20:15", opponent: "Masconomet", mascot: "Chieftains", home: false, league: true, site: "Valley Forum, Haverhill", result: null },
      { id: 17, date: "2027-02-13T15:00", opponent: "Marblehead", mascot: "Magicians", home: false, league: true, site: "Rockett Arena, Salem State University, Salem", result: null },
      {
        id: 18,
        date: "2027-02-15T15:00",
        opponent: "Triton",
        mascot: "Vikings",
        home: false,
        league: false,
        site: "Graf Rink, Newburyport",
        result: null,
        tournament: true,
        tag: "Newburyport Bank Classic",
        notes: ["First round of the Newburyport Bank Classic, against Triton at Graf Rink", "A championship or consolation game follows on Wednesday, Feb. 17"]
      },
      {
        id: 19,
        date: "2027-02-17T12:00",
        opponent: "Opponent to be announced",
        home: false,
        league: false,
        timeTbd: true,
        site: "Site to be announced",
        result: null,
        name: "Newburyport Bank Classic: final round",
        tournament: true,
        neutral: true,
        tag: "Newburyport Bank Classic",
        notes: ["The championship or consolation game of the Newburyport Bank Classic", "The opponent, time and rink depend on Monday's result"]
      }
    ],
    players: [],
    past: [
      {
        season: "2025–26",
        record: "10–10–2",
        coach: "Bill Sheehan",
        finish: "2nd",
        post: "Division 3 Round of 16 as the No. 21 seed: won 4–1 at No. 12 Westfield, then lost 4–0 at No. 5 Shawsheen Valley Tech",
        captains: "Drew Godfried and Thomas Fish",
        allLeague: "Drew Godfried and Cooper Dunham",
        photo: { src: "../images/teams/boys-hockey.jpg", caption: "The 2025–26 Danvers boys hockey team. Photo from the Danvers High School athletics page." },
        allStars: "Owen Swanton, Evan Morey",
        awards: "Thomas Fish, MIAA Bruins Sportsmanship Award",
        games: [
          [
            "2025-12-13",
            0,
            "Gloucester",
            "NEC",
            "W",
            5,
            2,
            "Dorothy Talbot Rink",
            "Cooper Dunham scored two goals in the third period to lift the Falcons (1-0) to a Northeastern Conference victory at Dorothy Talbot Rink. In his first game in net, Evan Morey made 22 saves."
          ],
          [
            "2025-12-16",
            1,
            "Amesbury",
            "Non-league",
            "L",
            4,
            6,
            "Bourque Arena",
            "Grady Stickney tallied three goals and assisted on another, Tommy Puorro collected two goals and two assists, and Eli Gaeta made 26 stops for the Red Hawks (2-0) in the nonleague win at Bourque Arena."
          ],
          ["2025-12-18", 0, "Essex Tech", "Non-league", "L", 0, 5, "Essex Sports Center", "Ryan Wilson scored two goals in a nonleague win for the Hawks (2-0). Brian Delisio (3 points) and Cam Casey (2 points) contributed."],
          ["2025-12-23", 1, "Shawsheen Tech", "Non-league", "L", 1, 5, "Chelmsford Forum", "Josh Baker and Justin Thibert score two goals apiece for the Rams (4-1) in a nonleague win. Bode MacKenzie netted his first varsity goal."],
          [
            "2025-12-27",
            1,
            "Triton/Pentucket",
            "Non-league",
            "W",
            9,
            0,
            "Chelmsford Forum",
            "Thomas Fish netted a hat trick with one assist and Evan Morey turned in a 16-save shutout as the Falcons (2-3) won the consolation game of the Lions Tournament at Chelmsford Forum. Defenseman Aidan Hockney added a goal and a pair of assists."
          ],
          [
            "2025-12-31",
            0,
            "Wakefield",
            "Non-league",
            "L",
            0,
            4,
            "Stoneham Arena",
            "John Taylor had a goal and two assists and Jack Simoneau, JP Casey, and Eddie Palmer netted one goal apiece en route to a dominant nonleague victory for the Warriors (3-2) at Stoneham Arena."
          ],
          ["2026-01-03", 1, "Beverly", "NEC", "T", 4, 4, "Bourque Arena"],
          [
            "2026-01-07",
            1,
            "Winthrop",
            "NEC",
            "W",
            5,
            1,
            "Bourque Arena",
            "Senior Cooper Dunham tallied two goals, while junior Owen Swanton, and sophomores Aidan Hockney and Connor Dembowski added a goal a piece in a Northeastern Conference win for the Falcons (3-4-1) at Endicott College. Dembowski's goal was his first at the varsity level."
          ],
          ["2026-01-10", 0, "Peabody", "NEC", "W", 5, 2, "McVann-O'Keefe Rink", "Connor Dembowski led with two goals as the Falcons (4-4-1) flew to a Northeastern road win at McVann-O'Keefe Memorial Rink."],
          ["2026-01-17", 0, "Marblehead", "NEC", "L", 5, 6, "O'Keefe Center, Salem State"],
          ["2026-01-19", 0, "Stoneham", "Non-league", "L", 1, 4, "Stoneham Arena", "Cosmo Ciccarello tallied twice as the Spartans (6-5-0) pulled away for a nonleague win at Stoneham Arena."],
          [
            "2026-01-21",
            0,
            "Masconomet",
            "NEC",
            "W",
            3,
            1,
            "Valley Forum, Haverhill",
            "Owen Swanton, Colby Medeiros, and Gaven Cooper lit the lamp for the Falcons (5-6-1, 4-1-1) in a Northeastern Conference victory over the Chieftains (2-9, 2-4). Thomas Finn had the lone goal for Masco at Haverhill Valley Forum."
          ],
          [
            "2026-01-24",
            1,
            "Gloucester",
            "NEC",
            "W",
            2,
            1,
            "Overtime · Bourque Arena",
            "Junior forward Owen Swanton sniped an overtime winner with 1:49 remaining to give the host Falcons (6-6-1) a Northeast win at Endicott. Cooper Dunham scored the first goal on a setup by Hunter DeDominicis."
          ],
          [
            "2026-01-28",
            0,
            "Beverly",
            "NEC",
            "L",
            0,
            4,
            "Bourque Arena",
            "Ty Chin-Aleong recorded a 23-save shutout as the Panthers (7-4-2) secured a Northeastern Conference win at Endicott College. Teddy Fisher, Mikey O'Leary, Logan Bowen, and Nate Wheeler tallied for the hosts."
          ],
          [
            "2026-01-31",
            0,
            "Winthrop",
            "NEC",
            "T",
            1,
            1,
            "Larsen Rink",
            "Junior forward Mike D'Ambrosio scored the lone goal for the host Vikings (8-5-1) as they played to a Northeastern tie at Larsen Rink. Senior defenseman Jake Langlais netted the sole tally for the Falcons' (6-7-2) on an assist by Cooper Dunham."
          ],
          [
            "2026-02-05",
            1,
            "Peabody",
            "NEC",
            "W",
            6,
            1,
            "Bourque Arena",
            "Junior Owen Swanton registered a game-leading 3 points for the host Falcons (7-7-2, 6-2-2) with a goal and two assists in a Northeastern win at Endicott College. Anthony Sheehan and Reardon Zaccaria recorded their first career goals and Lucas Silva grabbed his first career point."
          ],
          ["2026-02-10", 1, "Marblehead", "NEC", "L", 3, 4, "Bourque Arena"],
          [
            "2026-02-13",
            1,
            "Masconomet",
            "NEC",
            "W",
            3,
            1,
            "Bourque Arena",
            "Cooper Dunham tallied twice less than a minute apart and Anthony Sheehan added another for the Falcons (8-8-2, 7-3-2) in a Northeastern Conference victory over the Chieftains (2-16, 2-10) at Raymond J. Bourque Arena."
          ],
          [
            "2026-02-16",
            0,
            "Triton/Pentucket",
            "Tournament",
            "W",
            7,
            0,
            "Newburyport Bank Classic · Graf Rink",
            "Gaven Cooper tallied twice for the Falcons (9-8-2) to beat the Vikings (0-19-0) and advance in the Newburyport Bank Classic at Henry Graf Skating Rink."
          ],
          [
            "2026-02-18",
            0,
            "Norwell",
            "Tournament",
            "L",
            2,
            3,
            "Newburyport Bank Classic championship · Graf Rink",
            "Trailing by a goal with three minutes remaining, Bryce Campanale netted the equalizer before Jaxson Hoey delivered the dagger with six seconds remaining in regulation to give the Clippers (12-5-3) the title in the Newburyport Bank Classic over the Falcons (9-9-2) at Henry Graf Skating Rink. Hoey (two goals, assist) and Campanale (goal, two assists) each had 3-point contests for Norwell."
          ],
          [
            "2026-02-25",
            0,
            "Westfield",
            "MIAA tournament",
            "W",
            4,
            1,
            "Round of 32 · Amelia Park Rink",
            "Senior Cooper Dunham was dynamic, factoring in every goal by posting a hat trick and adding an assist in a first-round win for the No. 21 Falcons (10-9-2), upending No. 12 Westfield (15-8-0) at Amelia Park Rink. Owen Swanton also scored and Colby Medeiros dished out two assists."
          ],
          [
            "2026-02-28",
            0,
            "Shawsheen Tech",
            "MIAA tournament",
            "L",
            0,
            4,
            "Round of 16 · Hallenborg Memorial Pavilion",
            "Josh Baker, Justin Harrington, Kyle MacKeen and Jacoby Patterson handled the scoring and Dylan Mainini was perfect in goal for the fifth-seeded Rams (19-2-1) in a second-round victory over the 21st-seeded Falcons (10-10-2) at Hallenborg Pavilion in Billerica."
          ]
        ],
        note: "Game stories from the Boston Globe's high school scoreboard. Open a game to read its story.",
        keyPlayers: [
          { name: "Cooper Dunham", grade: "Sr.", note: "NEC All-Conference. Factored in every goal of the 4–1 tournament win at Westfield with a hat trick and an assist, and scored twice against Gloucester, Winthrop and Masconomet." },
          { name: "Owen Swanton", grade: "Jr.", note: "NEC All-Star. Scored the overtime winner against Gloucester, had a goal and two assists against Peabody and scored at Westfield." },
          { name: "Evan Morey", note: "NEC All-Star in goal. 22 saves in his first game in net, at Gloucester, and a 16-save shutout of Triton." },
          { name: "Thomas Fish", note: "Captain. A hat trick and an assist in the 9–0 win over Triton, and the MIAA Bruins Sportsmanship Award." },
          { name: "Drew Godfried", note: "Captain and NEC All-Conference." },
          { name: "Connor Dembowski", grade: "So.", note: "His first varsity goal came against Winthrop; three days later he scored twice at Peabody." }
        ]
      },
      {
        season: "2024–25",
        record: "8–12–2",
        coach: "Bill Sheehan",
        post: "Division 3 Round of 16 as the No. 16 seed: beat No. 17 Nashoba 4–3, lost 9–0 at No. 1 Nauset, the eventual state champion",
        captains: "Josh Henry and Seamus Cary",
        allLeague: "Josh Henry",
        games: [
          [
            "2024-12-14",
            1,
            "Gloucester",
            "NEC",
            "L",
            4,
            5,
            "Bourque Arena",
            "Down two goals heading into the third period, Jackson Harnish and Colby Warren slotted home two goals to force overtime at Endicott College. Trey Marrone made two crucial saves to keep the Fisherman (1-0) afloat before a minute passed in the extra frame, and Kam Francis ripped a slap shot to seal the comeback win in the Northeastern Dunn affair."
          ],
          [
            "2024-12-18",
            0,
            "Amesbury",
            "Non-league",
            "L",
            0,
            1,
            "Salem Ice Center",
            "Grady Stickney scored thanks to an assist from Wes Ackerman and Vincenzo Foster stopped all 34 shots he faced for his first career shutout in a nonleague win at Salem Icenter for the Red Hawks (2-1). Cody Sanding turned aside 32 shots for the Falcons (0-2)."
          ],
          [
            "2024-12-23",
            1,
            "Marblehead",
            "NEC",
            "L",
            2,
            3,
            "Overtime · Bourque Arena",
            "London McDonald got loose on a breakaway and sniped home the winner 43 seconds into overtime to lift the Magicians (4-0) to a Northeastern win at Bourque Arena. Avin Rodovsky and Kyle Hart produced first-period goals for Marblehead."
          ],
          [
            "2024-12-26",
            0,
            "Chelmsford",
            "Tournament",
            "L",
            4,
            6,
            "Lions Cup · Chelmsford Forum",
            "Senior Michael Spitz led the way with four goals and an assist and freshman Rowan MacDonald added a goal and an assist to help the Lions (2-2) hold on for a tight victory in the first round of the Lions Cup at Chelmsford Forum. The Lions also received a goal from senior Matt Hall, and seniors Will Morgan, Nick Lupoli, and Austin Marmo and sophomore Thomas Gonsalves added two assists apiece."
          ],
          ["2024-12-28", 1, "Lowell Catholic", "Tournament", "T", 4, 4, "Lions Cup · Chelmsford Forum"],
          [
            "2024-12-30",
            0,
            "Beverly",
            "NEC",
            "W",
            3,
            2,
            "Overtime · Bourque Arena",
            "Cooper Dunham had a goal and an assist and Gaven Cooper and Josh Henry also scored for the Falcons (1-4-1, 1-2) in a Northeastern Conference win over the Panthers (2-3, 0-2) at Bourque Arena."
          ],
          ["2025-01-01", 0, "Stoneham", "Non-league", "L", 1, 4, "Stoneham Arena", "Jacob Minsk, Michael Taranto, Dylan Krasco, and Cosmo Ciccarello each scored a goal for the Spartans (2-3) in a nonleague home win at Stoneham Arena."],
          [
            "2025-01-11",
            0,
            "Beverly",
            "NEC",
            "W",
            5,
            2,
            "Bourque Arena",
            "Seamus Cary netted a hat trick, and Colby Medeiros added two goals for the Falcons (2-5-1) in the Northeastern win at Bourque Arena. \"This was the first game this year we played a full 45 minutes,\" said Danvers coach Bill Sheehan. \"Seamus Cary led the way. His first hat trick. We stressed the whole physicality piece during practice.\""
          ],
          ["2025-01-15", 0, "Essex Tech", "Non-league", "L", 1, 3, "Essex Sports Center", "Senior Brady Leonard recorded a hat trick with senior Jaydan Vargas assisting on all three scores to lead the Hawks (8-1-1) to a nonleague win at Essex Sports Center."],
          ["2025-01-18", 0, "Peabody", "NEC", "T", 5, 5, "McVann-O'Keefe Rink"],
          [
            "2025-01-23",
            1,
            "Winthrop",
            "NEC",
            "L",
            1,
            3,
            "Bourque Arena",
            "Sophomore Nate Previte scored the go-ahead goal early in the third period and senior Michael Holgersen closed it out with an empty-netter to lead the Vikings (8-4) to a Northeastern league win at Endicott College."
          ],
          ["2025-01-25", 1, "Masconomet", "NEC", "W", 6, 3, "Bourque Arena"],
          ["2025-01-29", 0, "Gloucester", "NEC", "L", 1, 3, "Dorothy Talbot Rink", "Jackson Harnish, Giacomo Martell, and Cade Cooper each lit the lamp for the Fishermen (6-7-1) in a Northeastern win at Dorothy Talbot Rink."],
          ["2025-02-01", 1, "Littleton/Bromfield", "Non-league", "W", 5, 3, "Bourque Arena"],
          [
            "2025-02-05",
            0,
            "Bedford",
            "Non-league",
            "L",
            1,
            5,
            "Edge Sports Center",
            "Sophomore Matthew Savage, senior Charlie Siciliano, and senior James Nichol all scored once en route to a dominant nonleague win for the Buccaneers (13-2) at Edge Sports Center."
          ],
          [
            "2025-02-08",
            0,
            "Marblehead",
            "NEC",
            "L",
            0,
            5,
            "O'Keefe Center, Salem State",
            "Senior captain Leo Burdge defended the net to perfection behind two goals from junior London McDonald as the Magicians (14-2-1) grabbed a Northeastern League victory at O'Keefe Athletic Center."
          ],
          ["2025-02-12", 0, "Winthrop", "NEC", "W", 3, 2, "Larsen Rink", "Colby Medeiros tallied three first-period goals to spark the Falcons (5-10-2) who got 18 saves from freshman Foster Bittner in the Northeastern Dunn road win at Larsen Rink."],
          ["2025-02-14", 1, "Amesbury", "Non-league", "L", 1, 4, "Bourque Arena", "Grady Stickney, Bodie Marcotte, Gavin Stickney, and Colin Brown each picked up a goal for the Redhawks (7-10-1) in a nonleague win. Nick Boothroyd picked up the win in net."],
          [
            "2025-02-17",
            0,
            "Haverhill",
            "Tournament",
            "W",
            4,
            0,
            "Newburyport Bank Classic · Graf Rink",
            "Cody Standring made 21 saves to notch his first shutout of the season as the Falcons (6-11-2) recorded a win in the first round of the Newburyport Bank Classic at Henry Graf Skating Rink. Josh Henry potted a pair of goals, and Jacob Langlais and Gaven Cooper added one apiece."
          ],
          ["2025-02-19", 0, "Norwell", "Tournament", "W", 3, 0, "Newburyport Bank Classic championship · Graf Rink"],
          [
            "2025-02-27",
            1,
            "Nashoba",
            "MIAA tournament",
            "W",
            4,
            3,
            "Round of 32 · McVann-O'Keefe Rink",
            "Josh Henry, Cooper Dunham, and Keegan Crowley struck consecutively in the second period and Seamus Cary added a tally in the third frame to lift the 16th-seeded Falcons (8-11-2) to a tight victory over the No. 17 Wolves (12-7-2) in a first-round clash at McVann-O'Keefe Memorial Rink in Peabody."
          ],
          [
            "2025-03-01",
            0,
            "Nauset",
            "MIAA tournament",
            "L",
            0,
            9,
            "Round of 16 · Charles Moore Arena",
            "Seniors Colin Ward and Logan Poulin and junior Jake Eldredge each tallied hat tricks to propel the top-seeded Warriors (21-0-2) past the 16th-seeded Falcons in a second-round matchup in front of a sellout crowd at Charles Moore Arena in Orleans. Nauset will face No. 8 Marblehead (17-5-1) in a rematch of last year's state final, won by the latter, 1-0. \"It just adds a little more juice,\" Nauset coach Connor Brickley said of the Marblehead rematch. \"They're a great team and obviously they got the best of us last year. It's a great opportunity for us.\""
          ]
        ],
        note: "Game stories from the Boston Globe's high school scoreboard. Open a game to read its story.",
        keyPlayers: [
          { name: "Seamus Cary", note: "Captain. A hat trick in the 5–2 win at Beverly and a goal in the 4–3 tournament win over Nashoba." },
          { name: "Josh Henry", note: "Captain and NEC All-Conference. Two goals at Haverhill in the Newburyport Bank Classic and a goal against Nashoba. Salem News all-star." },
          { name: "Colby Medeiros", note: "A first-period hat trick in the 3–2 win at Winthrop and two goals at Beverly." },
          { name: "Cody Standring", note: "A 21-save shutout at Haverhill." }
        ],
        awards: "Salem News all-stars: Cooper Dunham, Josh Henry"
      },
      {
        season: "2023–24",
        record: "11–7–3",
        coach: "Kevin Fessette",
        finish: "2nd",
        post: "Division 3 Round of 32 as the No. 13 seed: lost 3–0 to No. 20 West Springfield",
        captains: "Ty Langlais and Nick Anderson",
        allLeague: "Ty Langlais",
        games: [
          ["2023-12-09", 0, "Littleton/Bromfield", "Non-league", "W", 5, 1, "O'Brien Arena"],
          ["2023-12-13", 1, "Masconomet", "NEC", "W", 4, 2, "Bourque Arena"],
          ["2023-12-16", 0, "Winthrop", "NEC", "L", 1, 7, "Larsen Rink"],
          ["2023-12-20", 1, "Lowell Catholic", "Non-league", "T", 4, 4, "Bourque Arena"],
          ["2023-12-27", 1, "Triton/Pentucket", "Non-league", "L", 1, 3, "Chelmsford Forum"],
          ["2023-12-29", 0, "Lowell Catholic", "Tournament", "T", 2, 2, "Lions Cup · Overtime · Chelmsford Forum"],
          ["2024-01-03", 1, "Peabody", "NEC", "W", 6, 0, "Bourque Arena"],
          ["2024-01-06", 0, "Everett/Revere", "Non-league", "W", 8, 1, "Allied Veterans Rink"],
          ["2024-01-10", 1, "Marblehead", "NEC", "W", 3, 0, "Bourque Arena"],
          ["2024-01-17", 0, "Essex Tech", "Non-league", "L", 1, 4, "Essex Sports Center"],
          ["2024-01-20", 0, "Gloucester", "NEC", "L", 1, 2, "Dorothy Talbot Rink"],
          ["2024-01-24", 0, "Masconomet", "NEC", "W", 6, 5, "Valley Forum, Haverhill"],
          ["2024-01-27", 1, "Swampscott", "NEC", "W", 6, 0, "Bourque Arena"],
          ["2024-01-31", 1, "Winthrop", "NEC", "L", 1, 5, "Bourque Arena"],
          ["2024-02-03", 1, "Everett/Revere", "Non-league", "W", 11, 3, "Bourque Arena"],
          ["2024-02-07", 0, "Beverly", "NEC", "W", 4, 1, "Bourque Arena"],
          ["2024-02-10", 0, "Marblehead", "NEC", "T", 3, 3, "Rockett Arena"],
          ["2024-02-14", 0, "Gloucester", "NEC", "L", 3, 5, "Dorothy Talbot Rink"],
          ["2024-02-19", 1, "Wakefield", "Non-league", "W", 5, 4, "Bourque Arena"],
          ["2024-02-21", 1, "Beverly", "NEC", "W", 5, 2, "Bourque Arena"],
          ["2024-02-29", 1, "West Springfield", "MIAA tournament", "L", 0, 3, "Round of 32 · Driscoll Arena"]
        ],
        awards: "Salem News all-stars: Mike DeLisio, Ty Langlais"
      }
    ],
    historyIntro: "Two state championships, 11 conference titles and a record book full of 100-point scorers. The seasons and players behind Danvers boys hockey.",
    banners: [{ year: 2001, label: "Division 2 State Champions" }, { year: 1994, label: "Division 2 State Champions" }],
    necTitles: [1981, 1990, 1991, 1992, 1993, 1994, 1996, 2002, 2012, 2017, 2018],
    historyNote: "Title years follow the school's team page. The 1991 team was the first in NEC history to go 16–0–0 in the conference. Tournament seeds and scores for every year since 1998 are from the MIAA's bracket archive, and they match the record book's results; the record book adds that the 2003 semifinal went to overtime.",
    historyTile: ["100-point club", 17, "Newest: Cooper Dunham, 2026"],
    seasons: [
      [2026, 10, 10, 2, "Bill Sheehan", "2nd", "Division 3 Round of 16 as the No. 21 seed: beat No. 12 Westfield 4–1 at Westfield, lost 4–0 to No. 5 Shawsheen Valley Tech"],
      [2025, 8, 12, 2, "Bill Sheehan", "", "Division 3 Round of 16 as the No. 16 seed: beat No. 17 Nashoba 4–3, lost 9–0 at No. 1 Nauset, the eventual state champion"],
      [2024, 11, 7, 3, "Kevin Fessette", "2nd", "Division 3 Round of 32 as the No. 13 seed: lost 3–0 to No. 20 West Springfield"],
      [2023, 6, 12, 3, "Kevin Fessette", "", "Division 3 Round of 32 as the No. 23 seed: lost 3–2 to No. 10 Triton"],
      [2022, 9, 7, 4, "Kevin Fessette", "", "Division 3 quarterfinals as the No. 8 seed: beat No. 25 Southeastern 6–1 and No. 24 North Quincy 5–1, lost 4–3 in overtime to No. 1 Marlborough, the eventual state champion"],
      [2021, 6, 7, 0, "Andrew O'Neill, Steve Baldassare", "", ""],
      [2020, 9, 10, 2, "Steve Baldassare", "", "Division 2 North first round as the No. 15 seed: lost 5–3 to No. 2 Lincoln-Sudbury"],
      [2019, 12, 9, 2, "Steve Baldassare", "", "Division 2 North semifinals as the No. 14 seed: beat No. 3 Gloucester 6–5 (2OT) and Marblehead 3–0, lost 4–1 to Tewksbury"],
      [2018, 16, 5, 1, "Steve Baldassare", "NEC North Champs", "Division 2 North quarterfinals as the No. 1 seed: beat No. 16 North Reading 5–2, lost 5–2 to No. 8 North Andover"],
      [2017, 15, 4, 2, "Steve Baldassare", "NEC North Champs", "Division 2 North quarterfinals as the No. 3 seed: a first-round bye, then lost 4–0 to No. 11 Stoneham"],
      [2016, 7, 10, 3, "Steve Baldassare", "", ""],
      [2015, 11, 7, 4, "Kevin Brown", "", "Division 2 North first round as the No. 7 seed: lost 5–4 in overtime to No. 10 Peabody"],
      [2014, 11, 11, 1, "Kevin Brown", "", "Division 2 North quarterfinals as the No. 8 seed: beat No. 9 Amesbury 4–2, lost to No. 1 Beverly in a shootout (2–1)"],
      [2013, 13, 7, 4, "Kevin Brown", "", "Division 2 North finalists as the No. 8 seed: beat Somerville 9–1, No. 1 Beverly 4–3 and Concord-Carlisle 5–3, lost 7–2 to Wilmington"],
      [2012, 16, 6, 0, "Kevin Brown", "NEC North Champs", "Division 2 North quarterfinals as the No. 4 seed: beat No. 13 Methuen 4–2, lost 1–0 to No. 5 North Andover"],
      [2011, 10, 7, 5, "Kevin Brown", "", "Division 2 North as the No. 16 seed: beat No. 17 Lynnfield 2–1 in overtime in the preliminary round, lost 4–2 to No. 1 Wilmington"],
      [2010, 8, 9, 4, "Kevin Brown", "", "Division 2 North first round as the No. 14 seed: lost 3–1 to No. 3 Peabody"],
      [2009, 3, 17, 0, "Kevin Brown", "", ""],
      [2008, 13, 7, 2, "Kevin Brown", "", "Division 2 North quarterfinals as the No. 8 seed: beat No. 9 Bishop Fenwick 7–2, lost 2–1 to No. 1 Wilmington"],
      [2007, 9, 7, 5, "Kevin Brown", "", "Division 2 North first round as the No. 13 seed: lost 4–1 to No. 4 Gloucester"],
      [2006, 14, 7, 1, "Kevin Flynn", "2nd", "Division 2 North quarterfinals as the No. 9 seed: beat No. 8 Revere 5–2, lost 3–1 to No. 16 Watertown, which had upset No. 1 Triton"],
      [2005, 14, 8, 1, "Kevin Flynn", "", "Division 2 North finalists as the No. 9 seed: beat Gloucester 4–2, No. 1 St. Mary's 4–2 and Newburyport 6–2, lost 5–1 to Saugus"],
      [2004, 11, 7, 3, "Kevin Flynn", "", "Division 2 North first round as the No. 8 seed: lost 9–4 to No. 9 Peabody"],
      [2003, 16, 6, 0, "Kevin Flynn", "", "Division 2 North semifinals as the No. 6 seed: beat No. 11 Andover 5–4 and unbeaten No. 3 Pentucket (16–0–4) 4–2, lost 3–2 in overtime to No. 2 Saugus"],
      [2002, 20, 4, 0, "Kevin Flynn", "NEC Champs", "Division 2 North finalists as the No. 1 seed: beat Newburyport 4–0, Lynnfield 6–1 and Amesbury 4–0, lost 5–4 to St. Mary's of Lynn"],
      [2001, 18, 4, 3, "Kevin Flynn", "", "MIAA Division 2 state champions: beat Bishop Fenwick 4–3, Saugus 4–2, Wilmington 5–2 and Lynnfield 4–2 for the North title, then Boston Latin 4–3 at the FleetCenter"],
      [2000, 15, 7, 1, "Kevin Flynn", "", "Division 2 North semifinals as the No. 7 seed: beat No. 10 Methuen 5–3 and No. 2 Saugus 2–0, lost 3–2 to No. 6 St. Bernard's at Chelmsford Arena"],
      [1999, 12, 9, 1, "Kevin Flynn", "4th", "Division 2 North quarterfinals as the No. 9 seed: beat No. 8 North Andover 4–1, lost 4–2 to No. 1 Saugus"],
      [1998, 9, 7, 6, "Kevin Flynn", "4th", "Division 2 North quarterfinals as the No. 10 seed: beat No. 7 Wilmington 8–5, lost 10–5 to No. 2 Saugus"],
      [1997, 16, 4, 3, "Kevin Flynn", "2nd", "Lost to Newburyport in Div. 2 North final"],
      [1996, 19, 1, 2, "Kevin Flynn", "NEC Champs", "Lost to Hingham in Div. 2 state semifinals"],
      [1995, 13, 6, 3, "Kevin Flynn", "2nd", "Lost to Whitman-Hanson in 2nd round"],
      [1994, 20, 1, 3, "Kevin Flynn", "NEC Champs", "Won the Div. 2 state title over Taunton (OT)"],
      [1993, 17, 1, 2, "Kevin Flynn", "NEC Champs", "Lost as No. 1 seed in first round to Marshfield"],
      [1992, 13, 4, 4, "Kevin Flynn", "NEC Champs", "Lost in Div. 1 first round to Medford"],
      [1991, 17, 3, 1, "Kevin Flynn", "NEC Champs", "Lost in Div. 1 first round to Don Bosco"],
      [1990, 13, 4, 3, "Kevin Flynn", "NEC Champs", "Lost in Div. 1 first round to Framingham South"],
      [1989, 13, 4, 3, "Kevin Flynn", "2nd", "Lost in Div. 1 first round to Malden Catholic"],
      [1988, 7, 7, 4, "Kevin Flynn", "6th", ""],
      [1987, 3, 14, 1, "Kevin Flynn", "9th", ""],
      [1986, 9, 7, 2, "John Gillis", "5th", ""],
      [1985, 11, 8, 0, "John Gillis", "4th", "Lost to Watertown in Div. 1 first round"],
      [1984, 13, 4, 4, "John Gillis", "2nd", "Lost to Watertown in Div. 1 first round"],
      [1983, 9, 10, 0, "John Gillis", "4th", ""],
      [1982, 16, 3, 3, "John Gillis", "2nd", "Lost to Arlington in Div. 1 second round"],
      [1981, 17, 5, 2, "John Gillis", "NEC Champs (13-3-2)", "Lost to Matignon in state semis Boston Garden"],
      [1980, 14, 6, 1, "John Gillis", "3rd NEC", "Lost in Div. 1 2nd round to Don Bosco"],
      [1979, 8, 9, 2, "John Gillis", "6th NEC", ""],
      [1978, 8, 6, 6, "John Gillis", "5th NEC", "Lost in Div. 1 first round to Acton-Boxboro"],
      [1977, 8, 9, 2, "John Gillis", "5th NEC", ""],
      [1976, 8, 8, 3, "John Gillis", "5th NEC", ""],
      [1975, 5, 12, 1, "John Hartnett", "8th NEC", ""],
      [1974, 3, 13, 3, "John Hartnett", "9th NEC", ""],
      [1973, 5, 15, 0, "John Hartnett", "", ""],
      [1972, 2, 16, 2, "", "", ""],
      [1971, null, null, null, "", "5th in North Shore League", ""],
      [1960, null, null, null, "", "", "Lost to Weymouth"],
      [1957, null, null, null, "", "", "Lost to Braintree"],
      [1955, null, null, null, "", "", "Lost to Boston Tech"],
      [1954, null, null, null, "", "", "Beat Malden Catholic; lost to Needham"],
      [1946, null, null, null, "Ray Funchion", "", ""]
    ],
    honors: [
      { year: 2026, captains: "Drew Godfried and Thomas Fish", allLeague: "Drew Godfried and Cooper Dunham", note: "NEC All-Stars: Evan Morey, Owen Swanton" },
      { year: 2025, captains: "Josh Henry and Seamus Cary", allLeague: "Josh Henry", note: "Salem News all-stars: Cooper Dunham, Josh Henry" },
      { year: 2024, captains: "Ty Langlais and Nick Anderson", allLeague: "Ty Langlais", note: "Salem News all-stars: Mike DeLisio, Ty Langlais" },
      { year: 2023, captains: "Trevor McNeil and Bobby Joyce", allLeague: "Trevor McNeil", note: "" },
      { year: 2022, captains: "Connor Horn, Aidan Lanphere", allLeague: "", note: "" },
      { year: 2021, captains: "Brian Taylor, Michael Papamechail", allLeague: "", note: "Andrew O'Neill, Steve Baldassare: 10 games" },
      { year: 2020, captains: "Calvin Mansfield, Tyler Puska, Cam DiMeglio", allLeague: "Cal Mansfield", note: "" },
      { year: 2019, captains: "Jared Mscisz, Jack Thibodeau", allLeague: "Jared Mscisz", note: "" },
      { year: 2018, captains: "Tommy Mento, Conor Purtell, Nic DiSciullo, Matt Taylor", allLeague: "Yegor Bublik, Mat Taylor, Conor Purtell", note: "" },
      { year: 2017, captains: "", allLeague: "Matt Taylor", note: "" },
      { year: 2016, captains: "", allLeague: "Tom Mento, Matt Taylor, Rob Tibbetts", note: "" },
      { year: 2015, captains: "", allLeague: "Stephen Ganley", note: "" },
      { year: 1993, captains: "", allLeague: "David Finn", note: "" },
      { year: 1991, captains: "", allLeague: "", note: "First NEC team to go 16-0-0" },
      { year: 1987, captains: "Mark Lombard, George Stamulis, Mike Thibodeau", allLeague: "", note: "" },
      { year: 1986, captains: "Mike Mscisz, John O'Neill", allLeague: "", note: "" },
      { year: 1985, captains: "Adam Belanger, Steve Horn, Jamie Whitmyer", allLeague: "", note: "" },
      { year: 1984, captains: "Duke St. Pierre, Ron Trentini", allLeague: "", note: "" },
      { year: 1983, captains: "Steve Charette, Scott Griffin", allLeague: "", note: "" },
      { year: 1982, captains: "Chris Hillick, Bob Russell", allLeague: "", note: "" },
      { year: 1981, captains: "Peter Marshall", allLeague: "", note: "" },
      { year: 1980, captains: "Mike Palmer, Bill Rossi", allLeague: "", note: "" },
      { year: 1979, captains: "Skip Day, Jack Purcell", allLeague: "", note: "" },
      { year: 1978, captains: "Gary Munzing, Ted St. Pierre, John Lawrence", allLeague: "", note: "" },
      { year: 1977, captains: "Doug Weymouth", allLeague: "", note: "" },
      { year: 1976, captains: "Mark Finnegan, Ted Kontos", allLeague: "", note: "" },
      { year: 1971, captains: "Loren Kelley (C) (senior) Gary Famigletti", allLeague: "", note: "" }
    ],
    legendsNote: "Record holders and championship builders from the program's record book.",
    legends: [
      {
        name: "Jeff McGonagle",
        role: "1993–96 · 169 points",
        bio: "The program's all-time leading scorer with 72 goals and 97 assists. His 47 assists in 1995–96 are still the single-season record, and he skated on the 1994 state championship team.",
        tags: ["169 career points", "47 assists in a season", "1994 state champion"]
      },
      {
        name: "Chris McNeill",
        role: "1994–96 · 150 points",
        bio: "Holds the single-season records for goals (42) and points (76), both set in 1995–96, when Danvers went 19–1–2 and reached the state semifinals. Tied for the career goals record with 80.",
        tags: ["42 goals in a season", "76 points in a season", "80 career goals"]
      },
      { name: "Kyle McCullough", role: "1999–2002 · 151 points", bio: "Shares the career goals record with 80 and scored 37 in 2000–01, the winter Danvers won its second state title.", tags: ["80 career goals", "2001 state champion"] },
      {
        name: "Kevin Flynn",
        role: "Head coach · 1987–2006",
        bio: "Coached the Falcons for 20 seasons and to both of the program's state championships: an overtime win over Taunton in 1994 and a win over Boston Latin in 2001.",
        tags: ["2 state titles", "7 NEC titles", "20 seasons"]
      },
      {
        name: "Tommy Mento",
        role: "2015–18 · 137 points",
        bio: "Second in program history with 79 career goals, including 30 in 2016–17. A captain of the 2018 team that went 16–5–1 and won a second straight NEC North title.",
        tags: ["79 career goals", "Two NEC North titles"]
      },
      {
        name: "Steve Baldassare",
        role: "Player 1988–91 · Head coach 2016–2020",
        bio: "A 100-point scorer as a player, with 31 goals in 1990–91, Baldassare came back to coach the Falcons to NEC North championships in 2017 and 2018.",
        tags: ["101 career points", "NEC North champions 2017, 2018"]
      }
    ],
    records: {
      "Single Season": {
        Goals: [["Chris McNeill", "42", "1995–96"], ["Chris Hillick", "40", "1981–82"], ["Kyle McCullough", "37", "2000–01"], ["Steve Baldassare", "31", "1990–91"], ["Tommy Mento", "30", "2016–17"]],
        Assists: [["Jeff McGonagle", "47", "1995–96"], ["Bryan Duggan", "43", "2000–01"], ["Brian Thibodeau", "35", "1990–91"], ["Bobby Caron", "33", "1993–94"]],
        Points: [
          ["Chris McNeill", "76", "42 goals, 34 assists · 1995–96"],
          ["Jeff McGonagle", "71", "24 goals, 47 assists · 1995–96"],
          ["Chris Hillick", "69", "40 goals, 29 assists · 1981–82"],
          ["Kyle McCullough", "64", "37 goals, 27 assists · 2000–01"],
          ["Bobby Caron", "62", "29 goals, 33 assists · 1993–94"]
        ]
      },
      Career: {
        Goals: [["Kyle McCullough", "80", "1999–2002"], ["Chris McNeill", "80", "1994–96"], ["Tommy Mento", "79", "2015–18"], ["Ryan Hayes", "77", "2000–03"], ["Jeff McGonagle", "72", "1993–96"]],
        Assists: [["Dustin Hayes", "101", "2003–06"], ["Jeff McGonagle", "97", "1993–96"], ["Bryan Duggan", "97", "1999–2002"], ["Ryan Hayes", "83", "2000–03"], ["Connor Purtell", "77", "2015–18"]],
        Points: [["Jeff McGonagle", "169", "1993–96"], ["Ryan Hayes", "160", "2000–03"], ["Kyle McCullough", "151", "1999–2002"], ["Chris McNeill", "150", "1994–96"], ["Dustin Hayes", "150", "2003–06"]],
        "Goalie Wins": [
          ["Scott Bevan", "37", "1999–2001 · 37–16–6 · 2.46 GAA · 8 shutouts"],
          ["Alex Taylor", "35", "2012–15 · 35–26–7 · 2.25 GAA · 9 shutouts"],
          ["CJ Sullivan", "34", "2001–03 · 34–10–0 · 2.02 GAA · 11 shutouts"],
          ["Yegor Bublik", "33", "2014–18 · 33–16–3 · 2.55 GAA · 4 shutouts"]
        ]
      },
      "100-Point Club": {
        "Career points": [["Jeff McGonagle", "169", "1993–96"], ["Ryan Hayes", "160", "2000–03"], ["Kyle McCullough", "151", "1999–2002"], ["Chris McNeill", "150", "1994–96"], ["Dustin Hayes", "150", "2003–06"], ["Bryan Duggan", "142", "1999–2002"]],
        "\u200b": [["Tommy Mento", "137", "2015–18"], ["Bob Caron", "124", "1991–93"], ["Gary Munzing", "123", "1976–78"], ["Sean McNeill", "121", "1990–94"], ["Connor Purtell", "119", "2015–18"], ["Joe Stangie", "114", "2010–13"]],
        "\u200b\u200b": [["John O'Neill", "107", "1984–86"], ["Brian Thibodeau", "104", "1988–91"], ["Duke St. Pierre", "102", "1981–84"], ["Cooper Dunham", "101", "2023–26"], ["Steve Baldassare", "101", "1988–91"]]
      }
    },
    milestones: [
      { year: "1981", text: "First Northeastern Conference championship. The Falcons go 17–5–2 and reach the state semifinals at Boston Garden." },
      { year: "1991", text: "The Falcons become the first NEC team to go 16–0–0 in the conference, the second of five straight league titles." },
      { year: "1994", text: "State champions. A 20–1–3 season ends with an overtime win over Taunton for the Division 2 title." },
      { year: "1996", text: "A 19–1–2 team reaches the state semifinals. Chris McNeill sets the single-season marks of 42 goals and 76 points." },
      { year: "2001", text: "A second state title. Seeded fifth in Division 2 North, Danvers beats Bishop Fenwick, Saugus, top-seeded Wilmington and Lynnfield, then Boston Latin 4–3 at the FleetCenter on March 18 to finish 18–4–3." },
      { year: "2018", text: "A 16–5–1 season brings a second straight NEC North championship." },
      { year: "2026", text: "The Falcons win a state tournament game at Westfield and reach the Division 3 Round of 16. Cooper Dunham joins the 100-point club." }
    ],
    follow: [
      { kind: "Instagram", title: "@danversfalconshockey", text: "The official Instagram of DHS Falcons boys hockey: game days, scores and photos.", url: "https://www.instagram.com/danversfalconshockey/", go: "Instagram" },
      { kind: "Schedule", title: "Official schedule", text: "Every level's games, times and changes on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams?entityId=5538", go: "ArbiterLive" },
      { kind: "School", title: "Team page", text: "Coaches, program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/boys-hockey/", go: "danverspublicschools.org" },
      {
        kind: "History",
        title: "Record book",
        text: "Season records, captains, scoring leaders and the 100-point club.",
        url: "https://docs.google.com/spreadsheets/d/1vf0NtXTt-mCHhaf4qSfU9y2mp_HIP2uRHK4gkjEYRLA/edit?gid=1756060361#gid=1756060361",
        go: "Record book"
      },
      { kind: "Scores", title: "MyHockeyLive", text: "Statewide high school hockey scores, standings and schedules.", url: "https://www.myhockeylive.com/miaa/teams/3912-danvers", go: "MyHockeyLive" },
      { kind: "Instagram", title: "@danversfalconsathletics", text: "The Danvers High School athletic department's Instagram: game days, results and photos for every team.", url: "https://www.instagram.com/danversfalconsathletics/", go: "Instagram" }
    ],
    news: [],
    photos: [],
    returning: [
      { name: "Owen Swanton", grade: "Sr.", note: "NEC All-Star last winter and the overtime hero against Gloucester." },
      { name: "Connor Dembowski", grade: "Jr.", note: "Two goals at Peabody as a sophomore." },
      { name: "Aidan Hockney", grade: "Jr.", note: "A defenseman with a goal and two assists against Triton last winter." }
    ],
    returningNote: "Picked from last winter's results and game stories."
  },

  /* ====================== GIRLS (co-op with Beverly and Ipswich) ====================== */
  girls: {
    label: "Girls Hockey",
    short: "Girls (co-op)",
    teamName: "Beverly/Danvers/Ipswich",
    league: "Northeast Hockey League",
    noLeague: true,
    headCoach: "Chris LeBlanc",
    heroTitle: "League champions open Dec. 11 against Gloucester",
    preview: "Danvers girls skate on a co-op varsity team with Beverly and Ipswich. The team went 15–6 and won the Northeast Hockey League last winter, and opens Friday, Dec. 11 at Bourque Arena.",
    stripTile: ["Co-op since", "2005", "Danvers · Beverly · Ipswich"],
    scheduleNote: "The co-op team's schedule is from MyHockeyLive and can change. Home games are at Bourque Arena.",
    links: { school: "https://danverspublicschools.org/dhs/athletics/girls-hockey/", watch: "https://www.nfhsnetwork.com/schools/danvers-high-school-danvers-ma" },
    staff: [["Head coach", "Chris LeBlanc"]],
    about: [
      "The girls hockey program is a co-operative varsity team of players from Danvers, Beverly and Ipswich high schools. It began play in 2005 and has grown into one of the area's established programs, facing teams such as Marblehead, Masconomet and Winthrop.",
      "Teammates work together across three towns, and the players often describe each other as a second family. Home games are at the Raymond J. Bourque Arena at Endicott College in Beverly.",
      "The team plays as the Beverly/Danvers/Ipswich Panthers. Information from the Danvers High School team page."
    ],
    rosterNote: "The 2026–27 roster will be posted once the team is set.",
    schedule: [
      { id: 1, date: "2026-12-11T18:00", opponent: "Gloucester", mascot: "Fishermen", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 2, date: "2026-12-16T19:00", opponent: "St. Mary's", mascot: "Spartans", home: false, league: false, site: "Connery Memorial Rink, Lynn", result: null },
      {
        id: 3,
        date: "2026-12-19T16:00",
        opponent: "Peabody/Lynnfield/North Reading",
        mascot: "Tanners",
        home: false,
        league: false,
        site: "McVann-O'Keefe Rink, Peabody",
        result: null,
        notes: ["Listed on MyHockeyLive; it isn't on the school's ArbiterLive schedule yet, so check before you go"]
      },
      { id: 4, date: "2026-12-23T16:00", opponent: "Grafton", home: false, league: false, site: "Buffone Arena, Worcester", result: null },
      { id: 5, date: "2026-12-26T16:40", opponent: "Masconomet", mascot: "Chieftains", home: false, league: false, site: "Valley Forum, Haverhill", result: null },
      { id: 6, date: "2026-12-30T14:00", opponent: "Woburn", mascot: "Tanners", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 7, date: "2027-01-02T14:00", opponent: "Wakefield", mascot: "Warriors", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 8, date: "2027-01-06T16:00", opponent: "Gloucester", mascot: "Fishermen", home: false, league: false, site: "Dorothy Talbot Rink, Gloucester", result: null },
      { id: 9, date: "2027-01-09T18:00", opponent: "Brookline", mascot: "Warriors", home: false, league: false, site: "Walter Brown Arena, Boston", result: null },
      { id: 10, date: "2027-01-11T19:30", opponent: "Melrose", mascot: "Red Hawks", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 11, date: "2027-01-13T16:30", opponent: "Medford/Malden", mascot: "Mustangs", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 12, date: "2027-01-16T18:00", opponent: "Winthrop", mascot: "Vikings", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 13, date: "2027-01-20T17:30", opponent: "Masconomet", mascot: "Chieftains", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 14, date: "2027-01-23T12:10", opponent: "Bishop Fenwick", mascot: "Crusaders", home: false, league: false, site: "Essex Sports Center, Middleton", result: null },
      { id: 15, date: "2027-01-27T19:00", opponent: "Medford/Malden", mascot: "Mustangs", home: false, league: false, site: "LoConte Rink, Medford", result: null },
      { id: 16, date: "2027-02-03T19:30", opponent: "Marblehead", mascot: "Magicians", home: false, league: false, site: "O'Keefe Center, Salem State University, Salem", result: null },
      { id: 17, date: "2027-02-06T13:00", opponent: "Winthrop", mascot: "Vikings", home: false, league: false, site: "Larsen Rink, Winthrop", result: null },
      { id: 18, date: "2027-02-10T19:30", opponent: "Newburyport", mascot: "Clippers", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 19, date: "2027-02-13T18:00", opponent: "Peabody/Lynnfield/North Reading", mascot: "Tanners", home: true, league: false, site: "Raymond J. Bourque Arena, Endicott College, Beverly", result: null },
      { id: 20, date: "2027-02-17T14:45", opponent: "Andover", mascot: "Golden Warriors", home: false, league: false, site: "Breakaway Ice Center, Tewksbury", result: null }
    ],
    players: [],
    past: [
      {
        season: "2025–26",
        record: "15–6",
        coach: "Chris LeBlanc",
        finish: "NEHL Champions",
        post: "Lost in a shootout at Malden Catholic in the Round of 32",
        allLeague: "Asuka Keough, Meredith Johnston", allStars: "Morgan Linskey, Ashley Freitas, Avery LeBlanc",
        awards: "Chris LeBlanc, NEHL Coach of the Year · Asuka Keough, Boston Globe All-Scholastic honorable mention · Ashley Freitas, MIAA Bruins Sportsmanship Award",
        photo: { src: "../images/teams/girls-hockey.jpg", caption: "Members of the 2025–26 Beverly/Danvers/Ipswich girls hockey team. Photo from the Danvers High School athletics page." },
        games: [
          ["2025-12-13", 0, "Gloucester", "", "W", 7, 5, "Dorothy Talbot Rink"],
          ["2025-12-20", 1, "Peabody/Lynnfield/North Reading", "", "W", 3, 1, "Bourque Arena", "Asuka Keough scored twice for the Panthers (2-0-0) in the Northeastern win at Endicott."],
          ["2025-12-23", 1, "Medfield", "", "W", 4, 2, "Bourque Arena", "Zoie Abell scored to break a 2-2 tie for the Panthers (3-0) en route to upsetting No. 13 Medfield in a nonleague win."],
          ["2025-12-27", 1, "Wakefield", "", "W", 5, 2, "Bourque Arena", "Junior Emily Tibbetts set the tone with an early goal for BDI (4-0) en route to a nonleague win at Endicott College."],
          ["2025-12-30", 0, "Wakefield", "", "L", 1, 2, "Stoneham Arena", "Olivia Raposa notched a goal and an assist, and Rita Bishop picked up her first varsity tally as the Warriors (3-3) won in nonleague play at Stoneham Arena."],
          ["2026-01-03", 1, "Gloucester", "", "W", 5, 2, "Bourque Arena", "Asuka Keough and Emily Tibbetts each tallied a goal and assist and Zoie Abell added two assists for the Panthers (5-1-0) in the Northeast win."],
          [
            "2026-01-07",
            1,
            "Medford/Malden",
            "",
            "W",
            4,
            2,
            "Bourque Arena",
            "Meredith Johnston tallied a goal and assist and Asuka Keough dished out a pair of helpers for the Panthers (6-1-0) in the Northeastern win at Endicott. Zoie Abell, Avery LeBlanc, and Meghan Ryan also scored for Beverly/Danvers."
          ],
          ["2026-01-10", 1, "Newburyport", "", "W", 10, 1, "Bourque Arena"],
          ["2026-01-14", 0, "Winthrop", "", "L", 1, 2, "Larsen Rink", "Senior Reese Ferrara and junior Amelia Serino each found the back of the net in a Northeast win for the Vikings (5-2-2) at Larsen Rink."],
          ["2026-01-17", 0, "Masconomet", "", "W", 4, 2, "Kasabuski Arena", "Zoie Abell scored a pair and Avery LeBlanc dished out two helpers for the Panthers (8-2-0) in the Northeastern win at Kasabuski Rink."],
          [
            "2026-01-19",
            0,
            "Winchester",
            "",
            "L",
            0,
            3,
            "O'Brien Arena",
            "Clare McCabe, Millie McDonald, and Claire McCoy (first career) supplied the scoring in a nonleague triumph for the Red & Black (7-5) at O'Brien Arena. Riley Pimentel secured the shutout."
          ],
          [
            "2026-01-22",
            1,
            "Andover",
            "",
            "W",
            5,
            2,
            "Bourque Arena",
            "Avery LeBlanc dished out four assists and Asuka Keough completed a 4-point night with two goals and two assists to lead the Panthers (9-3) to their first Colleen Ritzer Memorial Game win in five years. Meredith Johnston added two goals and an assist during a nonleague home win at Endicott College."
          ],
          [
            "2026-01-24",
            0,
            "Peabody/Lynnfield/North Reading",
            "",
            "W",
            2,
            0,
            "McVann-O'Keefe Rink",
            "Junior Asuka Keough propelled the offense with a pair of goals, both assisted by sophomore Avery LeBlanc, in a Northeastern win for Beverly/Danvers (10-3) at McVann-O'Keefe Memorial Rink."
          ],
          [
            "2026-01-28",
            0,
            "Medford/Malden",
            "",
            "W",
            6,
            0,
            "LoConte Rink",
            "Meredith Johnston tallied a first-period hat trick to set the tone, Asuka Keough tallied a goal and two assists, and Avery LeBlanc dished out three assists for the Panthers (11-3-0) in the Northeastern win at LoConte Rink."
          ],
          ["2026-01-31", 1, "Marblehead", "", "W", 6, 2, "Bourque Arena"],
          ["2026-02-03", 1, "Stoneham/Wilmington", "", "W", 6, 1, "Bourque Arena"],
          ["2026-02-07", 0, "Newburyport", "", "W", 4, 2, "Graf Rink"],
          ["2026-02-11", 1, "Winthrop", "", "W", 7, 1, "Bourque Arena", "Asuka Keough scored a hat trick to power the Panthers (14-3-0) to the Northeastern win, clinching the league title at Endicott."],
          ["2026-02-14", 0, "Melrose", "", "L", 3, 4, "Flynn Memorial Rink", "Grace Doyle fired in a hat trick to power the Red Hawks (9-8-1) to the nonleague win at Flynn Memorial Rink."],
          ["2026-02-16", 0, "Woburn", "", "L", 1, 3, "O'Brien Arena", "Aislin Grammer, Nora Kennedy, and Avery Tapp provided the scoring in a nonleague win for the No. 17 Tanners (14-5-0) at O'Brien Arena."],
          [
            "2026-02-26",
            0,
            "Malden Catholic",
            "MIAA tournament",
            "L",
            2,
            3,
            "Round of 32 · Shootout · Kasabuski Arena",
            "After three scoreless overtime periods, the No. 14 Lancers (8-11-2) won a shootout, 2-0, to defeat No. 19 BDI (15-6) in a first-round marathon contest at Kasabuski Rink. Senior Abbie Poole netted a pair of goals, including the tying goal with 2:07 remaining in regulation, and sophomore Isabella Silva posted 27 saves in the win."
          ]
        ],
        note: "Game stories from the Boston Globe's high school scoreboard. Open a game to read its story.",
        keyPlayers: [
          { name: "Asuka Keough", grade: "Jr.", note: "NEHL All-Conference and a Boston Globe All-Scholastic honorable mention. The Panthers' top scorer in the Globe's stories: a hat trick against Winthrop to clinch the league title, and two goals and two assists against Andover." },
          { name: "Avery LeBlanc", grade: "So.", note: "NEHL All-Star. The playmaker: four assists against Andover, three at Medford and two on Keough's goals at Peabody." },
          { name: "Meredith Johnston", grade: "Sr.", note: "NEHL All-Conference. A first-period hat trick at Medford and two goals and an assist against Andover." },
          { name: "Zoie Abell", note: "Broke a 2–2 tie in the upset of No. 13 Medfield and scored twice at Masconomet." },
          { name: "Ashley Freitas", note: "NEHL All-Star and the MIAA Bruins Sportsmanship Award." }
        ]
      },
      {
        season: "2024–25",
        record: "8–13",
        coach: "Kristen McCarthy",
        post: "Division 2 Round of 32 as the No. 28 seed: lost 9–2 at No. 5 Burlington/Central Catholic",
        games: [
          [
            "2024-12-12",
            0,
            "Central Catholic",
            "",
            "L",
            2,
            4,
            "Breakaway Ice Center",
            "Lucy Irwin led the way with two goals and one assist and Angie Cardillo tallied one goal and one assist to lead the Rams (1-0) to a nonleague win at Breakaway Ice Center. Sofia Powers also scored a goal and Sofia FloresQuero notched three assists in the winning effort."
          ],
          [
            "2024-12-21",
            1,
            "Gloucester",
            "",
            "L",
            4,
            5,
            "Overtime · Bourque Arena",
            "Junior Keagan Jewell rifled in three goals and Elliana Parsons fired home the overtime winner for Gloucester (2-1-0) in a Northeast Hockey League contest at Bourque Arena in Beverly. Parsons latched onto a rebound moments after leaping out of the penalty box, racing down the ice to pot the winner with 22 seconds remaining. For Parsons, sidelined her entire sophomore hockey season (knee), it was a big moment to provide a key 2 points in conference play. \"This is the kind of thing I think will push her to feel like she's contributing, just jumping back into the thing,\" said Gloucester coach Rob Parsons, Elliana's dad."
          ],
          [
            "2024-12-23",
            0,
            "Billerica/Chelmsford",
            "",
            "L",
            2,
            8,
            "Hallenborg Memorial Pavilion",
            "Giovanna Gulinello logged a hat trick and added an assist, Kara Gambale provided a goal and two helpers, and Aly Roark and AJ Caterino scored their first varsity goals for the Lions (5-0-0) in the nonleague win at Hallenborg Pavilion. Nine players found their way onto the scoresheet for Billerica/Chelmsford."
          ],
          [
            "2024-12-27",
            0,
            "Andover",
            "",
            "L",
            3,
            7,
            "Breakaway Ice Center",
            "Senior Scarlet Glass and junior Abby Walles potted two goals each, senior Nora Hurley (one goal, three assists) recorded four points, and junior goalie Catie Edwards had 15 saves for the Golden Warriors (3-1) in the Colleen Ritzer Memorial game at Breakaway Ice Center in Tewksbury. Junior Meredith Johnston scored twice and junior Victoria Willington had 26 saves for Beverly/Danvers (0-4)."
          ],
          [
            "2024-12-30",
            0,
            "Peabody/Lynnfield/North Reading",
            "",
            "L",
            1,
            5,
            "McVann-O'Keefe Rink",
            "Ava Buckley (2 goals), Eleni Spack (1 goal, 1 assist), Chloe Gromko (1 goal, 1 assist), Daniella White (2 assists), and Sydney Zizza (2 assists) all had multiple-point efforts for No. 5 Peabody/Lynnfield/North Reading (4-0-1) in a Northeast home win at McVann-O'Keefe Memorial Rink. \"This was a big two league points,\" said P/L/NR coach Michelle Roach. \"It was a total team effort today with emphasis on possession and pressure.\""
          ],
          [
            "2025-01-01",
            0,
            "Plymouth",
            "",
            "L",
            3,
            6,
            "Armstrong Arena",
            "Jordan Berry lit the lamp twice and Sabrina Andrews, Abigail Gabriel, Ava Grennell, and Emerson Spinale each tacked on a score to lift Plymouth (4-2) to a nonleague win at Armstrong Arena."
          ],
          [
            "2025-01-04",
            0,
            "Gloucester",
            "",
            "W",
            3,
            1,
            "Dorothy Talbot Rink",
            "Meredith Johnston picked up two goals, the first assisted by Meg Ryan and the second assisted by Asuka Keough and Ryan as the Panthers (1-6) picked up a Northeastern Conference win. Emily Tibbetts scored her first varsity goal in the third period from Caroline Horn and Bradie Arnold. Victoria Willington made 20 saves."
          ],
          [
            "2025-01-08",
            1,
            "Medford/Malden",
            "",
            "W",
            3,
            0,
            "Bourque Arena",
            "Junior Meredith Johnston notched a hat trick and junior Victoria Willington recorded her first shutout of the season to lift the Panthers (2-6-1) to their second straight win in a Northeast North battle at Endicott College."
          ],
          ["2025-01-11", 0, "Masconomet", "", "W", 8, 1, "Valley Forum, Haverhill"],
          [
            "2025-01-15",
            1,
            "Winthrop",
            "",
            "L",
            1,
            9,
            "Bourque Arena",
            "Sophomore Abby Githinji scored her first varsity goal en route to a dominant Northeast win for the No. 13 Vikings (6-1-1) at Endicott College. Amelia Spencer, Talia Martucci, and Angie Coscia all scored twice for Winthrop."
          ],
          ["2025-01-18", 1, "Masconomet", "", "W", 3, 1, "Bourque Arena", "Meredith Johnston scored twice and Bradie Arnold dished out two assists for the Panthers (4-7-0) in a Northeastern win at Endicott."],
          [
            "2025-01-22",
            0,
            "Newburyport",
            "",
            "L",
            5,
            6,
            "Graf Rink",
            "Olivia Wilson racked up two goals and two assists, Allie Simons scored twice, and Holly Sullivan and Riley Freeman each added one goal and one assist to propel the Clippers (6-6-1) to a Northeast win at Henry Graf Skating Rink."
          ],
          ["2025-01-25", 1, "Peabody/Lynnfield/North Reading", "", "L", 0, 3, "Bourque Arena"],
          ["2025-01-29", 0, "Medford/Malden", "", "L", 1, 2, "LoConte Rink", "Alessandra Madarese provided a goal and assist and Sarah Aborn added the other tally for the Mustangs (5-9-0) in the Northeastern win at LoConte Rink."],
          ["2025-02-01", 0, "Marblehead", "", "W", 9, 3, "O'Keefe Center, Salem State", "Meredith Johnston and Bradie Arnold each tallied hat tricks for the Panthers (5-10-0) in the Northeastern win at O'Keefe Athletic Center."],
          ["2025-02-05", 1, "Melrose", "", "W", 4, 3, "Overtime · Bourque Arena", "Morgan Linskey netted the winner in overtime for the Panthers (6-10-0) in a nonleague triumph at Endicott College. Asuka Keough scored twice for Beverly/Danvers."],
          [
            "2025-02-08",
            1,
            "Newburyport",
            "",
            "W",
            5,
            3,
            "Bourque Arena",
            "Morgan Linskey found the back of the net twice alongside goal-scorers Ashley Freitas, Meg Ryan, and Asuka Keough to lift the Panthers (7-10) to a Northeastern Conference win. Ashley Freitas contributed with three assists."
          ],
          ["2025-02-11", 0, "Winthrop", "", "L", 1, 6, "Larsen Rink"],
          [
            "2025-02-15",
            1,
            "Marblehead",
            "",
            "W",
            4,
            0,
            "Bourque Arena",
            "Asuka Keough (2 goals, assist), Sarah Belford (goal, assist), and Victoria Willington (10 saves, shutout) provided the spark for the Panthers (8-11-0) in the Northeastern win at Endicott College."
          ],
          ["2025-02-20", 0, "Medfield", "", "L", 1, 5, "Bourque Arena"],
          [
            "2025-02-26",
            0,
            "Burlington/Central Catholic",
            "MIAA tournament",
            "L",
            2,
            9,
            "Round of 32 · Burlington Ice Palace",
            "Caitlyn Tremblay, Chloe Rabazzi, Emma Steiner, and Samantha Cicolini netted two goals apiece and Sofia Cleary also scored for the No. 5 Red Devils (15-6) in a first round victory over the No. 28 Panthers (9-12) at Burlington Ice Palace."
          ]
        ],
        note: "Game stories from the Boston Globe's high school scoreboard. Open a game to read its story.",
        keyPlayers: [
          { name: "Meredith Johnston", grade: "Jr.", note: "Hat tricks against Medford and at Marblehead, plus two goals against Gloucester, Andover and Masconomet." },
          { name: "Bradie Arnold", note: "A hat trick in the 9–3 win at Marblehead and two assists against Masconomet." },
          { name: "Victoria Willington", grade: "Jr.", note: "In goal: shutouts of Medford and Marblehead, and 26 saves at Andover." },
          { name: "Asuka Keough", grade: "So.", note: "Two goals and an assist in the shutout of Marblehead and two goals against Melrose." },
          { name: "Morgan Linskey", note: "The overtime winner against Melrose and two goals against Newburyport." }
        ]
      },
      {
        season: "2023–24",
        record: "11–9–1",
        coach: "Matt Lampert",
        post: "Lost in the first round at Plymouth",
        games: [
          ["2023-12-09", 1, "Peabody/Lynnfield/North Reading", "", "L", 0, 4, "Bourque Arena"],
          ["2023-12-13", 0, "Newburyport", "", "W", 8, 0, "Graf Rink"],
          ["2023-12-16", 1, "Marblehead", "", "W", 6, 1, "Bourque Arena"],
          ["2023-12-20", 0, "Medford/Malden", "", "W", 5, 2, "LoConte Rink"],
          ["2023-12-23", 0, "Tewksbury/Methuen", "", "L", 0, 2, "Methuen High rink"],
          ["2023-12-27", 0, "Shawsheen/Bedford/Lowell", "", "W", 5, 3, "Hallenborg Memorial Pavilion"],
          ["2023-12-30", 0, "Pope Francis", "", "L", 1, 5, "Amelia Park Rink"],
          ["2024-01-06", 0, "Gloucester", "", "W", 5, 4, "Dorothy Talbot Rink"],
          ["2024-01-07", 1, "Masconomet", "", "W", 4, 1, "Bourque Arena"],
          ["2024-01-20", 1, "Winthrop", "", "T", 2, 2, "Overtime · Bourque Arena"],
          ["2024-01-24", 1, "Shawsheen/Bedford/Lowell", "", "L", 2, 4, "Bourque Arena"],
          ["2024-01-27", 0, "Peabody/Lynnfield/North Reading", "", "L", 2, 5, "McVann-O'Keefe Rink"],
          ["2024-01-31", 1, "Newburyport", "", "W", 5, 1, "Bourque Arena"],
          ["2024-02-03", 0, "Marblehead", "", "W", 5, 0, "Rockett Arena"],
          ["2024-02-07", 1, "Medford/Malden", "", "W", 7, 0, "Bourque Arena"],
          ["2024-02-10", 0, "Masconomet", "", "W", 3, 1, "Valley Forum, Haverhill"],
          ["2024-02-11", 1, "Andover", "", "L", 0, 3, "Bourque Arena"],
          ["2024-02-14", 1, "Gloucester", "", "W", 4, 2, "Bourque Arena"],
          ["2024-02-17", 0, "St. Mary's", "", "L", 2, 6, "Connery Memorial Arena"],
          ["2024-02-21", 0, "Winthrop", "", "L", 2, 4, "Larsen Rink"],
          ["2024-02-29", 0, "Plymouth", "MIAA tournament", "L", 1, 3, "First round · Gallo Arena"]
        ],
        awards: "Salem News all-stars: Halle Greenleaf, Meredith Johnston"
      }
    ],
    historyIntro: "A three-town team since 2005: seven straight state tournaments from 2011 to 2017, No. 2 seeds in Division 1 three times, the Northeast Hockey League title in 2026 and five more straight tournament trips.",
    historyNote: "No girls hockey record book is posted. Records for 2011–2017 are the regular-season records in the MIAA's tournament brackets plus the tournament games (a shootout counts as a loss); 2018–2025 are from MyHockeyLive and 2025–26 from the school's team page. Brian Seabury's six seasons add up to the 87–35–10 the Salem News reported. Head coaches from MyHockeyLive and the Salem News. Tournament seeds and scores are from the MIAA's bracket archive, which has no girls bracket posted for 2024 or 2026.",
    seasonsLabel: "on file",
    recordsNote: "A season is listed by the year it ended. The NEC column is the team's conference record where MyHockeyLive has one, and blank cells are details not on file.",
    honorsNote: "League and MIAA honors from the school's team page. Captains aren't posted for these seasons.",
    historyTile: ["State tournament", "12 trips", "2011 to 2017 and 2022 to 2026"],
    banners: [{ year: 2026, label: "Northeast Hockey League Champions" }],
    necTitles: [],
    legends: [],
    seasons: [
      [2026, 15, 6, 0, "Chris LeBlanc", "NEHL Champions (10–1)", "Round of 32 (lost in a shootout at Malden Catholic)"],
      [2025, 8, 13, 0, "Kristen McCarthy", "5–7", "Division 2 Round of 32 as the No. 28 seed: lost 9–2 at No. 5 Burlington/Central Catholic"],
      [2024, 11, 9, 1, "Matt Lampert", "11–4–1", "First round (lost 3–1 at Plymouth)"],
      [2023, 10, 10, 2, "Matt Lampert", "10–4–1", "Division 1 Round of 32 as the No. 23 seed: lost 2–1 at No. 10 Arlington"],
      [2022, 9, 9, 2, "Matt Lampert", "", "Division 1 Round of 32 as the No. 30 seed: lost 7–2 at No. 3 Notre Dame Academy (Hingham)"],
      [2021, 5, 9, 1, "Danielle Finocchiaro", "", ""],
      [2020, 6, 12, 2, "Danielle Finocchiaro", "3–7", ""],
      [2019, 6, 13, 0, "Danielle Finocchiaro", "2–9", ""],
      [2018, 4, 15, 1, "Brian Seabury", "3–6–1", ""],
      [2017, 17, 2, 3, "Brian Seabury", "9–1–1", "Division 1 first round as the No. 2 seed: lost to Masconomet in a shootout"],
      [2016, 17, 6, 1, "Brian Seabury", "", "Division 1 quarterfinals: beat Arlington 4–1, lost 5–0 to Austin Prep"],
      [2015, 14, 6, 1, "Brian Seabury", "", "Division 1 quarterfinals: beat Haverhill/North Andover 3–1, lost 3–0 at Reading"],
      [2014, 18, 3, 2, "Brian Seabury", "", "Division 1 quarterfinals as the No. 2 seed: beat Hingham 3–2, lost 2–0 to Austin Prep"],
      [2013, 17, 3, 2, "Brian Seabury", "", "Division 1 quarterfinals as the No. 2 seed: beat Medford 8–1, lost 4–0 to Arlington Catholic"],
      [2012, 10, 9, 2, "", "", "Division 1 first round: lost 4–1 to Lexington"],
      [2011, 13, 8, 0, "", "", "Division 1 preliminary round: lost to Shrewsbury in a shootout"]
    ],
    honors: [{ year: 2026, captains: "", allLeague: "Asuka Keough, Meredith Johnston", note: "NEHL All-Stars: Morgan Linskey, Ashley Freitas, Avery LeBlanc; Chris LeBlanc, NEHL Coach of the Year; Asuka Keough, Boston Globe All-Scholastic honorable mention; Ashley Freitas, MIAA Bruins Sportsmanship Award. The league's award list and the Globe name all five; the school's team page lists only Freitas." }, { year: 2024, captains: "", allLeague: "", note: "Salem News all-stars: Halle Greenleaf, Meredith Johnston" }],
    milestones: [
      { year: "2005", text: "The co-operative girls hockey program begins play, bringing together players from Danvers, Beverly and Ipswich, with Fiona Rice as its first coach." },
      { year: "2012", text: "Brian Seabury takes over. In six seasons his teams go 87–35–10 and win four league titles." },
      { year: "2013", text: "A 16–2–2 regular season earns the No. 2 seed in Division 1; the Panthers beat Medford 8–1 before falling to Arlington Catholic in the quarterfinals." },
      { year: "2014", text: "No. 2 seed again at 17–2–2, and an 18–3–2 finish, the most wins on file." },
      { year: "2017", text: "17–1–3 in the regular season and a third No. 2 seed, before Masconomet wins a first-round shootout. It closes seven straight state tournament trips." },
      { year: "2021", text: "Matt Lampert, a Beverly High hockey alum who had coached goalies and assisted the three coaches before him, becomes the program's fourth head coach." },
      { year: "2022", text: "Back in the state tournament for the first time in five seasons, in Division 1." },
      { year: "2024", text: "An 11–9–1 season and a trip to the state tournament, ending in the first round at Plymouth." },
      { year: "2025", text: "Back in the state tournament despite an 8–13 record, with a Round of 32 game at Burlington/Central Catholic." },
      { year: "2026", text: "A 15–6 season and the Northeast Hockey League championship, won as Dunn Division champions. Chris LeBlanc is the league's Coach of the Year, Asuka Keough and Meredith Johnston are All-Conference, and Ashley Freitas wins the MIAA Bruins Sportsmanship Award." }
    ],
    follow: [
      { kind: "Schedule", title: "MyHockeyLive", text: "The co-op team's schedule, scores and standings.", url: "https://www.myhockeylive.com/miaa/teams/4397-beverly-danvers-ipswich", go: "MyHockeyLive" },
      { kind: "School", title: "Team page", text: "Program notes and announcements from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/girls-hockey/", go: "danverspublicschools.org" },
      { kind: "Instagram", title: "@danversfalconsathletics", text: "The Danvers High School athletic department's Instagram: game days, results and photos for every team.", url: "https://www.instagram.com/danversfalconsathletics/", go: "Instagram" }
    ],
    news: [],
    photos: [],
    returning: [
      { name: "Asuka Keough", grade: "Sr.", note: "Last winter's top scorer, an NEHL All-Conference pick and a Boston Globe All-Scholastic honorable mention, with the title-clinching hat trick against Winthrop." },
      { name: "Avery LeBlanc", grade: "Jr.", note: "An NEHL All-Star last winter, with four assists in one game against Andover." },
      { name: "Emily Tibbetts", grade: "Sr.", note: "Scored against Wakefield/Wilmington and Gloucester last winter." }
    ],
    returningNote: "Picked from last winter's results and game stories.",
    returningTitle: "Returning Panthers to watch",
    division: "MIAA Division 1"
  }
};
