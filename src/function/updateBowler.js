import addRuns from "./addRuns";

export default function updateBowler(run, _bowler, bowlingCard) {
  const runs = [..._bowler.runs, run];
  const ballsDelivered = runs.length;
  const runsConceded = addRuns(runs);
  const oversCount = ballsDelivered / 6;
  const deliveries = ballsDelivered - oversCount * 6;
  const wickets = _bowler.runs.filter((run) => typeof run === "string").length;
  const economy = (runsConceded / ballsDelivered).toFixed(2);

  const bowlerEntry = {
    ..._bowler,
    runs,
    runsConceded,
    overs: `${oversCount}.${deliveries}`,
    wickets,
    economy,
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
