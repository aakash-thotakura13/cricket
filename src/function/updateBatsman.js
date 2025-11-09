import addRuns from "./addRuns";

export default function updateBatsman(run, selectedPlayer, battingCard, bowler, bowlingTeam) {

  let runs = [...selectedPlayer.runs, run];
  let totalRuns = addRuns(runs);
  let totalDeliveries = runs.length;
  let strikeRate = ((totalRuns * 100) / totalDeliveries).toFixed(2);
  let fielder = "";

  if (run === "Caught") {
    fielder = bowlingTeam[Math.floor(Math.random() * bowlingTeam.length)];
  }

  let playerEntry = {
    ...selectedPlayer,
    runs: runs,
    totalRuns: totalRuns,
    totalDeliveries: totalDeliveries,
    strikeRate: strikeRate,
    bowler,
    fielder,
    fours: selectedPlayer.runs.filter((run) => run === 4).length,
    sixes: selectedPlayer.runs.filter((run) => run === 6).length,
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
