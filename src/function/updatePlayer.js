export default function updateBowler(run, _bowler, bowlingCard) {
  const bowlerEntry = {
    ..._bowler,
    runs: [..._bowler.runs, run],
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
