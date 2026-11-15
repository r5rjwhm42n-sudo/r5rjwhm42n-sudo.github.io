/* =====================================================================
   DANVERS FALCONS CHEER — SITE DATA
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.
   Anything set to null (or left as an empty list) is simply left off
   the site until it is known.

   A COMPETITION on the schedule:
     id, date ("2026-11-15T16:15", Eastern time), name, site
     kind: "NEC" / "MSAA regional" / "MSAA state finals"   tag: "Division 3"
     timeTbd: true (time not set)     field: ["Burlington", ...] the other teams in the division
     place: "3rd of 12" once it's over, and score: 87.5 (left off when it isn't published)
     summary: a short recap    notes: ["bullet", ...]    sources: [{ label, url }]

   A PAST SEASON lists each competition as
     [date, 0, name, division, place, score, null, note]
   with tiles: [[title, place, line], ...] for the season's finishes.

   resultNote: "Results not posted" for a competition that's over without a published place

   Sources: the school's team page and ArbiterLive schedule, the MSAA
   (results, orders of appearance and state programs), Patch and The
   Swampscott Tides.
   ===================================================================== */

const SPORT = {
  key: "cheer", name: "Cheer", season: "2026",
  game: "competition", games: "competitions", players: "cheerleaders", start: "Report to warm-up",
  scoreWord: "Score", lineTitle: "", periods: [], boxTitle: "", stats: [],
  ties: false, spanYears: false, compete: true
};

const SCHOOL = {
  school: "Danvers High School", name: "Danvers Falcons", location: "Danvers, MA",
  conference: "Northeastern Conference", athletics: "https://www.danversfalconsathletics.com/"
};

const TEAMS = {
  varsity: {
    label: "Cheer",
    short: "Varsity",
    headCoach: "Rita Mirandi",
    heroTitle: "NEC champions compete at the North Regional",
    preview: "Danvers cheer won the small division at the NEC Championship on Nov. 7. The Falcons compete in Division 3 at the MSAA North Regional at Billerica Memorial High School on Sunday, Nov. 15, with awards at 5:30 PM, and a top finish sends them to the state finals at Worcester State on Nov. 22.",
    boardTag: "Div. 3",
    stripTile: ["State finals", "3 straight", "2023 · 2024 · 2025"],
    schedTiles: [["Division", "3", "MSAA North · set by enrollment"]],
    scheduleNote: "The squad also cheers at every Danvers football game, home and away. Times for the state finals are set after the regionals.",
    links: { school: "https://danverspublicschools.org/dhs/athletics/football-cheerleading/", schedule: "https://www.arbiterlive.com/Teams/Schedule/9424643?activeEntityId=5538" },
    staff: [["Head coach", "Rita Mirandi", "Also coaches basketball cheer"], ["JV coach", "Julia Saggese"], ["Assistant coach", "Melanie Delande"]],
    about: [
      "Danvers cheerleading has a long tradition of leadership and spirit. The squad cheers at every Danvers football game, home and away, which is uncommon in the Northeastern Conference, and gives Friday nights at Deering Stadium their sound.",
      "Each fall the varsity competes for the Northeastern Conference title and then in the MSAA cheerleading tournament: the North Regional at Billerica, and the state finals at Worcester State University for the teams that qualify. Danvers competes in Division 3, which the MSAA sets by school enrollment.",
      "Judges score each routine's stunts, pyramids, jumps and tumbling for difficulty and technique, and teams are ranked within their division. The program stresses commitment, teamwork and sportsmanship. Program information from the school's team page and the MSAA."
    ],
    rosterNote: "This fall's roster hasn't been published. Last year's state finals team is under Past Seasons.",
    schedule: [
      {
        id: 1,
        date: "2026-10-24T09:00",
        name: "Think Pink Invitational",
        opponent: "Think Pink Invitational",
        home: false,
        league: false,
        kind: "Invitational",
        site: "Billerica Memorial High School, Billerica",
        result: null,
        resultNote: "Results not posted",
        notes: ["Think Pink Invitational, hosted by Billerica Memorial High School", "The competition starts at 9:00 AM", "Results from this competition haven't been published"],
        sources: [
          { label: "Cheer schedule (ArbiterLive)", url: "https://www.arbiterlive.com/Teams/Schedule/9424643?activeEntityId=5538" },
          { label: "MSAA sanctioned events", url: "https://www.msaa.net/sites/default/files/2026-04/msaa-cheerleading-sanction-event-26-27.pdf" }
        ]
      },
      {
        id: 2,
        date: "2026-10-25T12:00",
        name: "Claw Out Cancer Invitational",
        opponent: "Claw Out Cancer Invitational",
        home: false,
        league: false,
        kind: "Invitational",
        site: "Beverly High School, Beverly",
        result: null,
        resultNote: "Results not posted",
        notes: ["Claw Out Cancer Invitational, hosted by Beverly High School", "The competition starts at 12:00 PM", "Results from this competition haven't been published"],
        sources: [
          { label: "Cheer schedule (ArbiterLive)", url: "https://www.arbiterlive.com/Teams/Schedule/9424643?activeEntityId=5538" },
          { label: "MSAA sanctioned events", url: "https://www.msaa.net/sites/default/files/2026-04/msaa-cheerleading-sanction-event-26-27.pdf" }
        ]
      },
      {
        id: 3,
        date: "2026-10-31T10:00",
        name: "Raider Invitational",
        opponent: "Raider Invitational",
        home: false,
        league: false,
        kind: "Invitational",
        site: "Central Catholic High School, Lawrence",
        result: null,
        resultNote: "Results not posted",
        notes: ["Raider Invitational, hosted by Central Catholic High School", "The competition starts at 10:00 AM", "Results from this competition haven't been published"],
        sources: [
          { label: "Cheer schedule (ArbiterLive)", url: "https://www.arbiterlive.com/Teams/Schedule/9424643?activeEntityId=5538" },
          { label: "MSAA sanctioned events", url: "https://www.msaa.net/sites/default/files/2026-04/msaa-cheerleading-sanction-event-26-27.pdf" }
        ]
      },
      {
        id: 4,
        date: "2026-11-07T13:00",
        name: "NEC Championship",
        opponent: "NEC Championship",
        home: false,
        league: true,
        kind: "NEC",
        site: "Gloucester High School, Gloucester",
        place: "Champions",
        division: "NEC small division",
        summary: "Danvers won the small division at the Northeastern Conference Championship at Gloucester High School, its second NEC small-division title in three falls (2024 and 2026), and earned a spot at the MSAA North Regional.",
        notes: [
          "NEC small division champions, at Gloucester High School",
          "The meet started at 1:00 PM",
          "Swampscott was third in the small division",
          "Every team has to compete in its league meet to qualify for the regional and state tournaments",
          "Gloucester won the NEC title in 2025, with Danvers second"
        ],
        sources: [
          { label: "The team's titles (@danverscheerleading)", url: "https://www.instagram.com/danverscheerleading/" },
          { label: "NEC meet coverage (The Swampscott Tides)", url: "https://swampscotttides.org/news/swampscott-cheerleaders-finish-strong-at-nec-championships/" },
          { label: "MSAA North Regional order of appearance", url: "https://www.msaa.net/sites/default/files/2026-11/f26-north-order-of-appearance.pdf" }
        ]
      },
      {
        id: 5,
        date: "2026-11-15T16:15",
        name: "MSAA North Regional",
        opponent: "MSAA North Regional",
        home: false,
        league: false,
        tournament: true,
        kind: "MSAA regional",
        tag: "Division 3",
        site: "Billerica Memorial High School, Billerica",
        field: ["Wakefield", "Wayland", "Winthrop", "Tewksbury", "Lynnfield", "North Reading", "Pentucket", "Dracut", "Stoneham", "Burlington", "Wilmington", "Lynn Tech"],
        result: null,
        notes: [
          "Danvers competes in Division 3 and is 7th of 13 teams to take the mat (No. 44 in the day's order)",
          "Registration at 3:35 PM and report to warm-up at 4:15 PM; the afternoon session starts at 2:30 PM",
          "Awards for Divisions 1 and 3 at 5:30 PM",
          "Tickets are $16.75 on GoFan; doors open at 9:30 AM",
          "The top teams in each division, plus at-large picks, go on to the state finals on Sunday, Nov. 22"
        ],
        sources: [
          { label: "Order of appearance (MSAA)", url: "https://www.msaa.net/sites/default/files/2026-11/f26-north-order-of-appearance.pdf" },
          { label: "Tickets on GoFan", url: "https://gofan.co/app/school/MSAA" },
          { label: "MSAA cheerleading", url: "https://www.msaa.net/activities/msaa-cheerleading" }
        ]
      },
      {
        id: 6,
        date: "2026-11-22T10:30",
        timeTbd: true,
        name: "MSAA State Finals",
        opponent: "MSAA State Finals",
        home: false,
        league: false,
        tournament: true,
        kind: "MSAA state finals",
        tag: "If qualified",
        site: "Worcester State University, Worcester",
        result: null,
        notes: [
          "For the teams that qualify at the regionals",
          "Session 1 starts at 10:30 AM and session 2 at about 2:45 PM; the order of appearance comes out after the regionals",
          "Tickets are $16.75 on GoFan; doors open at 9:30 AM",
          "Danvers made the state finals in 2023, 2024 and 2025"
        ],
        sources: [{ label: "State competition guide (MSAA)", url: "https://www.msaa.net/sites/default/files/2026-11/state-competition-guide-wsu-fall-2026.pdf" }, { label: "Tickets on GoFan", url: "https://gofan.co/app/school/MSAA" }]
      }
    ],
    players: [],
    pastIntro: "The last three falls: every competition on file, with each place and score, and the team that went to the state finals.",
    past: [
      {
        season: "2025",
        record: "5th",
        post: "North Regional, Division 3 · 13th at the state finals",
        tiles: [["NEC Championship", "2nd", "Northeastern Conference"], ["North Regional", "5th", "of 14 in Division 3 · 84.6"], ["State finals", "13th", "of 20 in Division 3 · 81.0"]],
        rosterTitle: "State finals team",
        roster: "Serena Bettencourt, Hailey Booth, Abby Brogna, Marlene Catalano, Amanda Hartley, Madeline Hillier, Alyssa Joe, Arianna Makrakis, Mya McNeill, Brenna Newton, Cass Roberts, Alexis Vramis",
        note: "Places and scores from the MSAA results. The NEC finish is from the school's team page, and the team is as listed in the MSAA state finals program.",
        games: [
          ["2025-11-08", 0, "NEC Championship", "NEC", "2nd", null, null, "Gloucester won the title"],
          ["2025-11-16", 0, "MSAA North Regional", "Division 3", "5th of 14", "84.6", null, "Billerica Memorial High School · advanced to the state finals"],
          ["2025-11-22", 0, "MSAA State Finals", "Division 3", "13th of 20", "81.0", null, "Worcester State University"]
        ]
      },
      {
        season: "2024",
        record: "4th",
        post: "North Regional, Division 3 · 7th at the state finals",
        tiles: [["NEC Championship", "1st", "Small division champions"], ["North Regional", "4th", "of 16 in Division 3 · 81.3"], ["State finals", "7th", "of 14 in Division 3 · 85.5"]],
        rosterTitle: "State finals team",
        roster: "Serena Bettencourt, Abby Brogna, Marlene Catalano, Lizzie Farrell, Abby Harvey, Maddy Hillier, Alyssa Joe, Emily Mahoney, Arianna Makrakis, Mya McNeill, Ava Nadeau, Brenna Newton, Kylie Redford, Lili Teheen, Alexis Vramis",
        note: "Places and scores from the MSAA results, and the team as listed in the MSAA state finals program. The NEC title is from the team's own list of championships.",
        games: [
          ["2024-11-17", 0, "MSAA North Regional", "Division 3", "4th of 16", "81.3", null, "Billerica Memorial High School · advanced to the state finals"],
          ["2024-11-24", 0, "MSAA State Finals", "Division 3", "7th of 14", "85.5", null, "Worcester State University"]
        ]
      },
      {
        season: "2023",
        record: "3rd",
        post: "North Regional, Division 3 · 5th at the state finals",
        tiles: [["NEC Championship", "2nd", "Northeastern Conference"], ["North Regional", "3rd", "of 12 in Division 3 · 87.5"], ["State finals", "5th", "of 16 in Division 3 · 89.0"]],
        note: "Places and scores from the MSAA results; the NEC finish from Patch. The date of the 2023 NEC meet isn't on file.",
        games: [
          ["2023-11-12", 0, "MSAA North Regional", "Division 3", "3rd of 12", "87.5", null, "Billerica Memorial High School · advanced to the state finals"],
          ["2023-11-19", 0, "MSAA State Finals", "Division 3", "5th of 16", "89.0", null, "Worcester State University"]
        ]
      }
    ],
    historyIntro: "Nine NEC championships by the team's own count, a New England winter title in 2011, three North Regional winter titles, and the MSAA state finals in each of the last three falls.",
    banners: [{ year: 2026, label: "NEC Small Division Champions" }, { year: 2024, label: "NEC Small Division Champions" }, { year: 2011, label: "New England Winter Champions" }],
    historyNote: "Titles from the team's own list (@danverscheerleading): 9 NEC championships, 3 North Regional winter titles, the 2011 New England winter title, the 2024 and 2026 NEC small-division titles and the 2022 JV NEC title. The years of the other NEC and regional titles aren't on file.",
    necTitles: [],
    seasons: [],
    honors: [],
    legends: [],
    historyTiles: [["NEC championships", "9", "The team's count, the latest in 2026"], ["New England title", "Winter 2011", "New England champions"], ["North Regional winter titles", "3", "The team's count"], ["State finals", "3 straight", "2023 · 2024 · 2025"]],
    records: {
      "MSAA Results": {
        "Top scores": [["2023 state finals", "89.0", "5th of 16"], ["2023 North Regional", "87.5", "3rd of 12"], ["2024 state finals", "85.5", "7th of 14"], ["2025 North Regional", "84.6", "5th of 14"]],
        "Best finishes": [["State finals", "5th", "2023 · Division 3"], ["North Regional", "3rd", "2023 · Division 3"], ["NEC Championship", "1st", "Small division, 2024 and 2026"]]
      }
    },
    milestones: [
      { year: "2011", text: "Danvers wins the New England championship in the winter season." },
      { year: "2022", text: "The JV squad wins the NEC football-season championship." },
      { year: "2023", text: "Danvers is 2nd at the NEC Championship and 3rd in Division 3 at the North Regional with 87.5, then finishes 5th of 16 at the state finals with 89.0, its best state finish in the MSAA results on file." },
      { year: "2024", text: "NEC small division champions, then 4th of 16 at the North Regional and 7th of 14 at the state finals with 85.5." },
      { year: "2025", text: "2nd at the NEC Championship behind Gloucester, 5th of 14 at the North Regional and 13th of 20 at the state finals: a third straight trip to Worcester State." },
      { year: "2026", text: "NEC small division champions again, at Gloucester High School, and back to the North Regional." }
    ],
    follow: [
      { kind: "Instagram", title: "@danverscheerleading", text: "Photos, results and news from the Danvers High cheer team.", url: "https://www.instagram.com/danverscheerleading/", go: "Instagram" },
      { kind: "Tournament", title: "MSAA cheerleading", text: "Regional and state schedules, orders of appearance and results from the MSAA.", url: "https://www.msaa.net/activities/msaa-cheerleading", go: "msaa.net" },
      { kind: "Tickets", title: "Regionals and states on GoFan", text: "MSAA tournament tickets are sold online only, $16.75 general admission.", url: "https://gofan.co/app/school/MSAA", go: "GoFan" },
      { kind: "School", title: "Team page", text: "Coaches and program notes from Danvers High School.", url: "https://danverspublicschools.org/dhs/athletics/football-cheerleading/", go: "danverspublicschools.org" },
      { kind: "Schedule", title: "Official schedule", text: "The squad's competitions on the school's ArbiterLive page.", url: "https://www.arbiterlive.com/Teams/Schedule/9424643?activeEntityId=5538", go: "ArbiterLive" },
      { kind: "Game days", title: "Danvers football", text: "The squad cheers at every football game. See where the Falcons play next.", url: "../football/", go: "Football site" }
    ],
    news: [
      {
        date: "Nov. 8, 2026",
        title: "Swampscott cheerleaders finish strong at NEC Championships",
        blurb: "Coverage of this year's NEC Championship meet at Gloucester High School, from Swampscott's student paper.",
        url: "https://swampscotttides.org/news/swampscott-cheerleaders-finish-strong-at-nec-championships/",
        source: "The Swampscott Tides"
      },
      {
        date: "Nov. 13, 2023",
        title: "Danvers High football set for Final 4 showdown",
        blurb: "A fall roundup: the cheerleaders finished 2nd at the NEC Championships and 3rd at regionals on their way to the state finals.",
        url: "https://patch.com/massachusetts/danvers/danvers-high-football-team-set-final-4-showdown",
        source: "Patch"
      }
    ],
    photos: [{ src: "images/team-2026.jpg", caption: "The 2026 Danvers cheer team at Deering Stadium. Photo from the Danvers High School athletics page." }]
  }
};
