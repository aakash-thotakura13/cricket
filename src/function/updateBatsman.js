import addRuns from "./addRuns";

export default function updateBatsman(
  run,
  selectedPlayer,
  battingCard,
  bowler,
  bowlingTeam
) {
  const isWicket = typeof run === "string";

  // ensure runs array exists
  const updatedRuns = [...(selectedPlayer.runs || []), isWicket ? 0 : run];

  let totalRuns = addRuns(updatedRuns);
  let totalDeliveries = updatedRuns.length;

  // let runs = [...selectedPlayer.runs, run];
  let strikeRate =
    totalDeliveries > 0
      ? ((totalRuns * 100) / totalDeliveries).toFixed(2)
      : 0.0;

  // picking a random fielder to be displayed in the batsmen section
  let fielders = bowlingTeam?.teamMembers;
  let fielder =
    fielders.length > 0
      ? fielders[Math.floor(Math.random() * fielders.length)]
      : "";

  // predefined wicket fall formats
  const wicketFormats = {
    LBW: () => `lbw b ${bowler}`,
    Bowled: () => `b ${bowler}`,
    Caught: () => `c ${fielder} b ${bowler}`,
    Stumped: () => `st ${bowlingTeam?.wicketKeeper} b ${bowler}`,
    RunOut: () => `run out ${fielder}`,
  };

  const batsmanStatus = isWicket ? wicketFormats[run]() : "";

  // count boundaries
  const fours = updatedRuns.filter((run) => run === 4).length;
  const sixes = updatedRuns.filter((run) => run === 6).length;

  let playerEntry = {
    ...selectedPlayer,
    runs: updatedRuns,
    totalRuns,
    totalDeliveries,
    strikeRate,
    status: batsmanStatus,
    fours,
    sixes,
  };

  const updatedArray = battingCard.map((player) =>
    player.playerName === selectedPlayer.playerName ? playerEntry : player
  );

  return {
    playerEntry,
    updatedArray,
  };
}
