import addRuns from "./addRuns";
import wicketsCounter from "./wicketsCounter";

export function combineData(inningsOne, inningsTwo) {

  const one = inningsOne.map((over) => addRuns(over.overRuns || []));
  const two = inningsTwo.map((over) => addRuns(over.overRuns || []));

  const ballsOne = inningsOne.flatMap((over) => over.overRuns || []);
  const ballsTwo = inningsTwo.flatMap((over) => over.overRuns || []);

  const maxOvers = Math.max(inningsOne.length, inningsTwo.length);
  const result = [];

  for (let i = 0; i < maxOvers; i++) {

    const overIndex = i + 1;

    const oneTotalRuns = addRuns(one.slice(0, overIndex));
    const oneTotalWickets = wicketsCounter(ballsOne.slice(0, 6 * overIndex));
    const oneRunRate = oneTotalRuns / overIndex;
    
    const oneWickets = inningsOne[i]
      ? wicketsCounter(inningsOne[i].overRuns)
      : 0;

    const twoTotalRuns = addRuns(two.slice(0, overIndex));
    const twoTotalWickets = wicketsCounter(ballsTwo.slice(0, 6 * overIndex));
    const twoRunRate = twoTotalRuns / overIndex;
   
    const twoWickets = inningsTwo[i]
      ? wicketsCounter(inningsTwo[i].overRuns)
      : 0;

    result.push({
      over: overIndex,
      oneRun: one[i] || 0,
      twoRun: two[i] || 0,
      oneTotalRuns,
      twoTotalRuns,
      oneTotalWickets,
      twoTotalWickets,
      oneRunRate,
      twoRunRate,
      oneWickets,
      twoWickets,
    });
  }

  return result;
}
