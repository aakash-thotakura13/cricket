import addRuns from "./addRuns";

export function updateBowler(run, _bowler, bowlingCard) {
  
  const runs = [..._bowler.runs, run];
  const ballsDelivered = runs.length;
  const runsConceded = addRuns(runs);
  const oversCount = ballsDelivered / 6;
  const deliveries = ballsDelivered - oversCount * 6;
  const wickets = _bowler.runs.filter((run) => typeof run === "string").length;
  const economy = (runsConceded / ballsDelivered).toFixed(2);
  const maidens = _bowler.bowlerOvers.map(over => addRuns(over)).filter(over => over === 0).length;

  const bowlerEntry = {
    ..._bowler,
    runs,
    runsConceded,
    overs: `${oversCount}.${deliveries}`,
    wickets,
    economy,
    maidens,
  };

  const findBowlerId = bowlingCard.findIndex(
    (bowler) => bowler.playerName === bowlerEntry.playerName
  );

  const updatedArray = bowlingCard.map((bowler, index) =>
    index === findBowlerId ? bowlerEntry : bowler
  );

  return {
    bowlerEntry,
    updatedArray,
  };
}


export function updateOver(_bowler, bowlingCard, over) {

  const bowlerEntry = {
    ..._bowler,
    bowlerOvers: [..._bowler.bowlerOvers, over,],
  }

  const findBowlerId = bowlingCard.findIndex(
    (bowler) => bowler.playerName === bowlerEntry.playerName
  );

  const updatedArray = bowlingCard.map((bowler, index) =>
    index === findBowlerId ? bowlerEntry : bowler
  );

  return updatedArray;

}