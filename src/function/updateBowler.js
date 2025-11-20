import addRuns from "./addRuns";
import wicketsCounter from "./wicketsCounter";

export function updateBowler(run, _bowler, bowlingCard) {
  const runs = [..._bowler.runs, run];

  const ballsDelivered = runs.length;

  const totalRuns = addRuns(runs);
  const wickets = wicketsCounter(runs);

  const completedOvers = Math.floor(ballsDelivered / 6);
  const balls = ballsDelivered % 6;

  const economy = (totalRuns / (ballsDelivered / 6)).toFixed(2);

  const maidens = _bowler.bowlerOvers
    .map((over) => addRuns(over))
    .filter((runsInOver) => runsInOver === 0).length;

  const bowlerEntry = {
    ..._bowler,
    runs,
    totalRuns,
    overs: `${completedOvers}.${balls}`,
    wickets,
    economy,
    maidens,
  };

  const updatedArray = bowlingCard.map((bowler) =>
    bowler.playerName === bowlerEntry.playerName ? bowlerEntry : bowler
  );

  return {
    bowlerEntry,
    updatedArray,
  };
}

export function updateOver(_bowler, bowlingCard, over) {
  const bowlerEntry = {
    ..._bowler,
    bowlerOvers: [..._bowler.bowlerOvers, over],
  };

  const updatedArray = bowlingCard.map((bowler) =>
    bowler.playerName === bowlerEntry.playerName ? bowlerEntry : bowler
  );

  return updatedArray;
}
