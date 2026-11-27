/* Swim & dive: every Danvers swimmer at the MIAA North sectional and the Division 2 state meet, from the MIAA's official
   results (miaa.net). Loaded after archive.js. */
(function () {
  const R = {
    "2025–26": [
      { meet: "MIAA North sectional", date: "Feb. 8, 2026", team: "29th as a team, 3 points",
        rows: [["100 freestyle", "Zachary Cotter", "14th", "50.80"], ["100 backstroke", "Zachary Cotter", "17th", "58.20"], ["100 breaststroke", "Max Scott", "26th", "1:06.41"]] },
      { meet: "MIAA Division 2 state meet", date: "Feb. 15, 2026", team: "36th as a team, 6 points",
        rows: [["100 backstroke", "Zachary Cotter", "11th", "57.70"], ["100 freestyle", "Zachary Cotter", "17th", "51.13"], ["100 breaststroke", "Max Scott", "20th", "1:06.18"]] }
    ],
    "2024–25": [
      { meet: "MIAA North sectional", date: "Feb. 9, 2025", team: "",
        rows: [["100 backstroke", "Zachary Cotter", "23rd", "59.27"]] },
      { meet: "MIAA Division 2 state meet", date: "Feb. 16, 2025", team: "40th as a team, 1 point",
        rows: [["100 backstroke", "Zachary Cotter", "16th", "57.84"]] }
    ]
  };
  for (const p of TEAMS.varsity.past) if (R[p.season]) p.results = R[p.season];
})();
