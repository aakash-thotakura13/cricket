import addRuns from "./addRuns";

export default function updateBatsman(
  run,
  selectedPlayer,
  battingCard,
  bowler,
  bowlingTeam
) {
  let runs = [...selectedPlayer.runs, run];
  let totalRuns = addRuns(runs);
  let totalDeliveries = runs.length;
  let strikeRate =
    totalDeliveries > 0
      ? ((totalRuns * 100) / totalDeliveries).toFixed(2)
      : 0.0;
  let fielder =
    bowlingTeam.teamMembers[
      Math.floor(Math.random() * bowlingTeam.teamMembers.length)
    ];

  const wicketFormats = {
    LBW: () => `lbw b ${bowler}`,
    Bowled: () => `b ${bowler}`,
    Caught: () => `c ${fielder} b ${bowler}`,
    Stumped: () => `st ${bowlingTeam?.wicketKeeper} b ${bowler}`,
  };

  const batsmanStatus =
    typeof run === "string" ? wicketFormats[run]?.() : "not out";

  let playerEntry = {
    ...selectedPlayer,
    runs: runs,
    totalRuns: totalRuns,
    totalDeliveries: totalDeliveries,
    strikeRate: strikeRate,
    status: batsmanStatus,
    fours: runs.filter((run) => run === 4).length,
    sixes: runs.filter((run) => run === 6).length,
  };

  const findPlayer = battingCard.findIndex(
    (player) => player.playerName === selectedPlayer.playerName
  );
  const updatedArray = battingCard.map((player, index) =>
    index === findPlayer ? playerEntry : player
  );

  return {
    playerEntry,
    updatedArray,
  };
}
