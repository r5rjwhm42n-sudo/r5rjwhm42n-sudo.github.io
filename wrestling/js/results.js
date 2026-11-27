/* Wrestling: every Danvers place-winner at the MIAA Division 3 North sectional, the Division 3 state meet and All-States,
   read from the MIAA's official bracket results (miaa.net). Each season's places were checked against the meet's team-score
   table, which counts every school's place-winners; 2021–22's PDFs have no team table, so its places were checked bout by
   bout. The 2023–24 PDFs can't be read as text, so that season isn't here. Loaded after archive.js. */
(function () {
  const H = ["Weight", "Wrestler", "Place", "Note"];
  const Q = "Qualified for the state meet";
  const R = {
    "2025–26": [
      { meet: "MIAA Division 3 North sectional", date: "Feb. 14, 2026", head: H, notes: true,
        team: "12th of 14 teams with 61 points; Tyngsborough/Dracut won with 196.5",
        rows: [["113 lbs.", "Branden Bridges", "6th", ""], ["120 lbs.", "Joseph Moreschi", "6th", ""], ["126 lbs.", "Logan Jacques", "4th", Q],
               ["132 lbs.", "Cameron Stewart", "6th", ""], ["285 lbs.", "Dylan Kinney", "3rd", Q]] },
      { meet: "MIAA Division 3 state meet", head: H, notes: true, team: "40th with 11.5 points",
        rows: [["126 lbs.", "Logan Jacques", "6th", ""], ["285 lbs.", "Dylan Kinney", "—", "Didn't place"]] }
    ],
    "2024–25": [
      { meet: "MIAA Division 3 North sectional", head: H, notes: true, team: "13th with 43 points; Wakefield won with 220",
        rows: [["113 lbs.", "JJ Rand", "5th", ""], ["126 lbs.", "Logan Jacques", "5th", ""]] }
    ],
    "2022–23": [
      { meet: "MIAA Division 3 North sectional", head: H, notes: true, team: "7th with 119 points; Tewksbury won with 260",
        rows: [["126 lbs.", "Logan Jacques", "4th", Q], ["132 lbs.", "Matthew Dowling", "4th", Q], ["138 lbs.", "Mark Haskins", "4th", Q],
               ["160 lbs.", "Joseph Baker", "1st", "Sectional champion"], ["170 lbs.", "Zachary Zoladz", "3rd", Q], ["285 lbs.", "Adam Guzofski", "3rd", Q]] },
      { meet: "MIAA Division 3 state meet", head: H, notes: true, team: "18th with 39.5 points; Melrose won with 179",
        rows: [["126 lbs.", "Logan Jacques", "—", "Didn't place"], ["132 lbs.", "Matthew Dowling", "—", "Didn't place"], ["138 lbs.", "Mark Haskins", "8th", ""],
               ["160 lbs.", "Joseph Baker", "4th", "Qualified for All-States"], ["170 lbs.", "Zachary Zoladz", "—", "Didn't place"],
               ["285 lbs.", "Adam Guzofski", "5th", "Qualified for All-States"]] },
      { meet: "MIAA All-State meet", head: H, notes: true, team: "52nd with 11 points; St. John's Prep won with 117.5",
        rows: [["160 lbs.", "Joseph Baker", "6th", ""], ["285 lbs.", "Adam Guzofski", "—", "Didn't place"]] }
    ],
    "2021–22": [
      { meet: "MIAA Division 3 North sectional", head: H, notes: true, team: "No team scores in the MIAA's results",
        rows: [["120 lbs.", "Mark Haskins", "3rd", Q], ["132 lbs.", "Connor McCarthy", "5th", ""], ["138 lbs.", "Matthew Dowling", "4th", Q],
               ["145 lbs.", "Seth Fagone", "4th", Q], ["160 lbs.", "Joseph Baker", "3rd", Q], ["170 lbs.", "Michael Ambliotis", "1st", "Sectional champion"],
               ["195 lbs.", "Brendan Whalen", "4th", "Forfeited the 3rd-place bout and didn't wrestle at the state meet"], ["285 lbs.", "Joey Parisi", "6th", ""]] },
      { meet: "MIAA Division 3 state meet", head: H, notes: true, team: "",
        rows: [["120 lbs.", "Mark Haskins", "7th", "Won the 7th-place bout by fall"], ["138 lbs.", "Matthew Dowling", "—", "Didn't place"],
               ["145 lbs.", "Seth Fagone", "—", "Didn't place"], ["160 lbs.", "Joseph Baker", "—", "Didn't place"], ["170 lbs.", "Michael Ambliotis", "—", "Didn't place"]] }
    ]
  };
  for (const p of TEAMS.varsity.past) if (R[p.season]) {
    p.results = R[p.season];
    p.note = (p.note ? p.note + " " : "") + "Tournament places below are from the MIAA's official brackets.";
  }
})();
