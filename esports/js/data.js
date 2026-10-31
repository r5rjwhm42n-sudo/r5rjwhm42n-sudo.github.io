/* =====================================================================
   DANVERS FALCONS ESPORTS — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left
   off the site until it is known.

   FROM THE SCHOOL (2025–26 DHS student activities guide):
     · adviser Ms. Kristina Aste-Mayer, rooms A120 and A328, meeting
       times vary; PC and Nintendo Switch games; state tournament each year

   FROM MS. ASTE-MAYER (email, Oct. 31): the Falcons play Super Smash
   Bros. Ultimate and Rocket League, as "Falcons SURGE"; opponents and
   scores for Weeks 1–6, the MSAA standings, and the two Falcons on the
   state Rocket League leaderboards.

   STILL NEEDED FROM THE TEAM:
     · the full roster (PLAYERS)
     · set-by-set and player numbers for each match (sets / stats below)
     · past seasons, playoff runs and when the program started (SEASONS,
       BANNERS, MILESTONES)
   ===================================================================== */

const MSAA = "https://www.msaa.net/activities/msaa-esports";
const PLAYVS = "https://help.playvs.com/en/articles/";

const TEAM = {
  school: "Danvers High School",
  name: "Danvers Falcons",
  sport: "Esports",
  season: 2026,
  seasonLabel: "Fall 2026",
  location: "Danvers, MA",
  league: "MSAA Esports",          // the state league, run with PlayVS
  teamName: "Falcons SURGE",       // what the Falcons go by in the league
  platform: "PlayVS",
  matchTime: "3:30 PM",            // the league's weekday start time for Massachusetts
  headCoach: "Kristina Aste-Mayer",   // E Sports adviser in the 2025–26 activities guide
  coachTitle: "Adviser",
  coachNote: "DHS English teacher",
  assistants: [],
  room: "Rooms A120 and A328",
  meets: "Meeting times vary",
  about: "A competitive and collaborative group built on strategy, teamwork and skill development in PC and Nintendo Switch games. Each year the Falcons play for a state title.",
  address: "60 Cabot Road, Danvers, MA 01923",
  links: {
    school: "https://danverspublicschools.org/dhs/athletics/e-sports/",
    league: MSAA,
    platform: "https://www.playvs.com/massachusetts",
    athletics: "https://www.danversfalconsathletics.com/",
    register: "https://students.arbitersports.com/organizations/danvers-public-schools",
    activities: "https://drive.google.com/file/d/1l3lFY9T7Fr_Ou05FHNe9uRIh4fUkHRrj/view"
  }
};

/* ---------------------------------------------------------------------
   GAMES
   The games the Falcons field. (The MSAA also runs Mario Kart 8 Deluxe;
   Danvers doesn't have a team in it this fall.) Delete a block and its
   matches, records and roster section disappear with it.
   id:     short code used in SCHEDULE and PLAYERS
   size:   players in the lineup at one time
   --------------------------------------------------------------------- */
const GAMES = [
  { id: "ssbu", name: "Super Smash Bros. Ultimate", short: "Smash", day: "Wednesday", size: 3, system: "Nintendo Switch",
    series: "Best of 5 sets",
    how: "Three players a side. A match is a best-of-five series of one-on-one sets, and each set is itself best of three games. The first three sets pair the lineups off in order; the coaches pick who plays sets four and five.",
    rules: PLAYVS + "4919168-playvs-scholastic-super-smash-bros-ultimate-rulebook" },

  { id: "rl", name: "Rocket League", short: "Rocket League", day: "Thursday", size: 3, system: "PC or console",
    series: "Best of 5 games",
    how: "Three-on-three car soccer. Games are five minutes, with sudden-death overtime if it is tied. The regular season is best of five games; playoff series go to best of seven.",
    rules: PLAYVS + "4919221-rocket-league-rulebook" }
];

/* ---------------------------------------------------------------------
   SCHEDULE
   One row per match. Matches are played online, so there is no home/away.
   Dates are the league's Fall 2026 match days (Smash on Wednesdays, Rocket
   League and Mario Kart on Thursdays, 3:30 PM). Every school plays seven
   matches in the eight weeks and takes one week off — mark that week with
   off: "Break week". Change or delete any row that does not apply.

   game:     "ssbu" | "rl" | "mk"
   week:     regular-season week number, or use round: "Quarterfinal" etc.
   opponent: the other school, or null until it is known
   result:   "W" | "L" | null (null = not played / no score typed in yet)
   us / them: the series score as the team reports it
   off:      "Break week" (or "Forfeit", "Not fielded") — kept on the list,
             left out of the record
   summary:  a sentence or two for the recap
   scores:   Rocket League — goals in each game            [[3, 1], [2, 4], ...]
             Mario Kart    — team points in each game      [[412, 368], ...]
   sets:     Smash — one row per set: [player, games won, games lost, opponent's player]
   stats:    Rocket League — [player, goals, assists, saves]
   points:   Mario Kart — [player, points scored in the match]
   notes:    extra bullet points          sources: [{ label, url }]

   A finished row looks like this:
     { id: 203, game: "rl", week: 3, date: "2026-10-08T15:30", opponent: "Peabody",
       result: "W", us: 3, them: 1,
       summary: "The Falcons dropped the opener and then won three straight.",
       scores: [[1, 3], [4, 2], [2, 1], [5, 0]],
       stats: [["First Last", 6, 3, 9], ["First Last", 4, 5, 7], ["First Last", 2, 2, 12]] },

   Player numbers on the Roster page are added up from sets / stats /
   points, so a result is typed in once. Names must match PLAYERS below.
   --------------------------------------------------------------------- */
const SCHEDULE = [
  /* Super Smash Bros. Ultimate — Wednesdays */
  { id: 101, game: "ssbu", week: 1, date: "2026-09-23T15:30", opponent: "Tewksbury Memorial", result: "W", us: 3, them: 2 },
  { id: 102, game: "ssbu", week: 2, date: "2026-09-30T15:30", opponent: "Oliver Ames", result: "L", us: 0, them: 6 },
  { id: 103, game: "ssbu", week: 3, date: "2026-10-07T15:30", opponent: "Natick", result: "L", us: 4, them: 7 },
  { id: 104, game: "ssbu", week: 4, date: "2026-10-14T15:30", opponent: "Attleboro", result: "L", us: 2, them: 3 },
  { id: 105, game: "ssbu", week: 5, date: "2026-10-21T15:30", opponent: "Littleton", result: "W", us: 6, them: 4 },
  { id: 106, game: "ssbu", week: 6, date: "2026-10-28T15:30", opponent: "Burlington", result: "W", us: 7, them: 5 },
  { id: 107, game: "ssbu", week: 7, date: "2026-11-04T15:30", opponent: null, result: null },
  { id: 108, game: "ssbu", week: 8, date: "2026-11-11T15:30", opponent: null, result: null,
    notes: ["Veterans Day — the league does not move holiday matches on its own, so the coaches agree on a new time"] },

  /* Rocket League — Thursdays */
  { id: 201, game: "rl", week: 1, date: "2026-09-24T15:30", opponent: "Tewksbury Memorial", result: "W", us: 3, them: 0 },
  { id: 202, game: "rl", week: 2, date: "2026-10-01T15:30", opponent: "Dracut", result: "W", us: 6, them: 0 },
  { id: 203, game: "rl", week: 3, date: "2026-10-08T15:30", opponent: "Natick", result: "W", us: 7, them: 4 },
  { id: 204, game: "rl", week: 4, date: "2026-10-15T15:30", opponent: "Leicester", result: "W", us: 3, them: 1 },
  { id: 205, game: "rl", week: 5, date: "2026-10-22T15:30", opponent: "Littleton", result: "L", us: 0, them: 3 },
  { id: 206, game: "rl", week: 6, date: "2026-10-29T15:30", opponent: "Tri-County", result: "L", us: 0, them: 3 },
  { id: 207, game: "rl", week: 7, date: "2026-11-05T15:30", opponent: null, result: null },
  { id: 208, game: "rl", week: 8, date: "2026-11-12T15:30", opponent: null, result: null }
];

/* The road after the regular season. Dates are from the league platform's
   Fall 2026 high school calendar; the MSAA sets its own bracket sizes. */
const POSTSEASON = [
  { when: "Nov. 9", text: "Last week of the regular season. Seven matches decide who moves on." },
  { when: "Nov. 16–17", text: "Playoffs open — Smash brackets on Monday, Rocket League and Mario Kart on Tuesday. A team that forfeits three regular-season matches is not eligible." },
  { when: "Nov. 23–27", text: "Thanksgiving week. No matches." },
  { when: "Nov. 30 – Dec. 4", text: "Later playoff rounds, down to the final two in each game." },
  { when: "Dec. 9–10", text: "Championship week: Smash on Wednesday, Rocket League and Mario Kart on Thursday." }
];
const POSTSEASON_NOTE = "In Spring 2026 the MSAA took the top 32 teams in Smash, the top 8 in Rocket League and the top 4 in Mario Kart.";

/* ---------------------------------------------------------------------
   ROSTER
   name:    as the school lists it
   tag:     in-game name (optional)
   grade:   "Sr." | "Jr." | "So." | "Fr." | null
   titles:  which games the player is on — ["ssbu"], ["rl", "mk"], ...
   captain: true | false
   main:    Smash character or Rocket League role (optional)
   note:    anything else (optional)

   Example:
     { name: "First Last", tag: "FalconOne", grade: "Jr.", titles: ["rl"], captain: true, main: "Striker" },
   --------------------------------------------------------------------- */
const STATS_AS_OF = "Through Week 6 (Oct. 29, 2026)";

/* MSAA state standings (PlayVS), as the team sent them. pos = place in
   Massachusetts. OMW% = opponents' match-win percentage and OOMW% =
   their opponents' — the league's strength-of-schedule tiebreakers. */
const STANDINGS_AS_OF = "Oct. 31, 2026";
const STANDINGS = [
  { game: "ssbu", team: "DHS Falcons SURGE", pos: 24, match: "3–3", series: "13–12", games: "29–28", omw: "48.28%", oomw: "50%" },
  { game: "rl", team: "Falcons SURGE", pos: 5, match: "4–2", games: "12–7", omw: "66.67%", oomw: "50.88%" }
];

/* Falcons on the MSAA statewide leaderboards: [game, stat, place, player, value] */
const STATE_LEADERS = [
  ["rl", "Goals per shot", 4, "Darrian Harris", "70.00%"],
  ["rl", "Score per game", 5, "Julian LaMontagne", "381.67"]
];

const PLAYERS = [
  { name: "Darrian Harris", grade: null, titles: ["rl"], captain: false, note: "4th in the state in goals per shot (70%)" },
  { name: "Julian LaMontagne", grade: null, titles: ["rl"], captain: false, note: "5th in the state in score per game (381.67)" },
  { name: "Leo Zou", grade: null, titles: [], captain: false }
];

/* ---------------------------------------------------------------------
   HISTORY
   BANNERS: the Falcons' own titles and playoff runs — { year, label }
   SEASONS: past seasons, newest first —
            { season: "Spring 2026", game: "rl", w: 5, l: 2, note: "Reached the quarterfinals" }
   --------------------------------------------------------------------- */
const BANNERS = [];
const SEASONS = [];

/* Program and league milestones. Add the Falcons' own as they are confirmed. */
const MILESTONES = [
  { year: "Fall 2018", text: "The MSAA and PlayVS launch state esports for Massachusetts high schools. League of Legends is the only game in “Season 0,” and Shrewsbury wins it." },
  { year: "Spring 2019", text: "Rocket League joins. Shrewsbury takes the first of five straight state titles." },
  { year: "Fall 2021", text: "Super Smash Bros. Ultimate crowns its first Massachusetts champion, Northbridge." },
  { year: "Spring 2024", text: "Mario Kart 8 Deluxe gets its first state champion, Sutton." },
  { year: "May 2026", text: "The first New England Interscholastic Esports Championships are held, with the finals played in person at Southern New Hampshire University's esports arena in Manchester." },
  { year: "2025–26", text: "The DHS activities guide lists E Sports, advised by English teacher Kristina Aste-Mayer: PC and Nintendo Switch games, with a state tournament every year." },
  { year: "Fall 2026", text: "Esports is listed with Danvers High's fall and spring teams." },
  { year: "Fall 2026", text: "Falcons SURGE go 4–2 in Rocket League through six weeks, fifth in the state standings." }
];

/* MSAA state finals, newest first: [champion, runner-up] for each game.
   From the MSAA's list of past champions. null = no final listed. */
const CHAMPIONS = [
  { season: "Spring 2026", ssbu: ["Millbury", "Swampscott"], rl: null, mk: ["Medford", "Southeastern Regional"], note: "Rocket League final moved online after a technical problem; no result listed" },
  { season: "Fall 2025", ssbu: ["Swampscott", "Millbury"], rl: ["Braintree", "Tewksbury Memorial"], mk: ["Medford", "Sutton"] },
  { season: "Spring 2025", ssbu: ["Attleboro", "Swampscott"], rl: ["Tewksbury Memorial", "Braintree"], mk: ["Medford", "Methuen"] },
  { season: "Fall 2024", ssbu: ["Fitchburg", "Millbury"], rl: ["Braintree", "Tri-County"], mk: ["Sutton", "Methuen"] },
  { season: "Spring 2024", ssbu: ["Swampscott", "Oliver Ames"], rl: ["Tewksbury Memorial", "Tri-County"], mk: ["Sutton", "Methuen"] },
  { season: "Fall 2023", ssbu: ["Fitchburg", "Oliver Ames"], rl: ["Tewksbury Memorial", "Shrewsbury"], mk: null },
  { season: "Spring 2023", ssbu: ["Swampscott", "Dartmouth"], rl: ["Tewksbury Memorial", "Shrewsbury"], mk: null },
  { season: "Fall 2022", ssbu: ["Swampscott", "Dartmouth"], rl: ["Tewksbury Memorial", "Shrewsbury"], mk: null },
  { season: "Spring 2022", ssbu: ["Northbridge", "Swampscott"], rl: ["David Prouty", "Tewksbury Memorial"], mk: null },
  { season: "Fall 2021", ssbu: ["Northbridge", "Minnechaug"], rl: ["Shrewsbury", "Tewksbury Memorial"], mk: null },
  { season: "Spring 2021", ssbu: null, rl: ["Shrewsbury", "Wachusett"], mk: null },
  { season: "Fall 2020", ssbu: null, rl: ["Shrewsbury", "David Prouty"], mk: null },
  { season: "Fall 2019", ssbu: null, rl: ["Shrewsbury", "Andover"], mk: null },
  { season: "Spring 2019", ssbu: null, rl: ["Shrewsbury", "Oliver Ames"], mk: null }
];
/* Schools from Danvers' own conference, the Northeastern Conference — highlighted in the table */
const NEIGHBORS = ["Swampscott"];

/* ---------------------------------------------------------------------
   MEDIA
   NEWS:    { date: "2026-10-08", title, blurb, source: "Salem News", url }
   STREAMS: where to watch — { label: "Twitch", url }
   To add photos: drop image files in /photos and list them in PHOTOS.
   --------------------------------------------------------------------- */
const NEWS = [];
const STREAMS = [];

/* Example: { src: "photos/match-01.jpg", caption: "Rocket League trio during Week 4" } */
const PHOTOS = [];
