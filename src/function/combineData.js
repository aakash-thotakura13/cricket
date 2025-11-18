import addRuns from "./addRuns";
import wicketsCounter from "./wicketsCounter";

export function combineData(inningsOne, inningsTwo) {

  const one = [...inningsOne].map(over => over.overRuns).map(over => addRuns(over)) || [];
  const two = [...inningsTwo].map(over => over.overRuns).map(over => addRuns(over)) || [];

  const oneWicket = [...inningsOne].map(over => over.overRuns).flat() || 0;
  const twoWicket = [...inningsTwo].map(over => over.overRuns).flat() || 0;

  let tempArr = [];

  for (let i = 0; i < Math.max(inningsOne.length, inningsTwo.length); i++) {

    const oneTotalRuns = addRuns(one.slice(0, i + 1));
    const oneTotalWickets = wicketsCounter(oneWicket.slice(0, 6 * (i + 1)));
    const oneRunRate = oneTotalRuns / (i + 1);
    const oneWickets = inningsOne[i] ? wicketsCounter(inningsOne[i].overRuns) : 0;

    const twoTotalRuns = addRuns(two.slice(0, i + 1));
    const twoTotalWickets = wicketsCounter(twoWicket.slice(0, 6 * (i + 1)));
    const twoRunRate = twoTotalRuns / (i + 1);
    const twoWickets = inningsTwo[i] ? wicketsCounter(inningsTwo[i].overRuns) : 0;

    console.log(oneWicket.slice(0, 6 * (i + 1)));

    let entry = {
      over: i + 1,
      oneRun: one[i] || 0,
      twoRun: two[i] || 0,
      oneTotalRuns, twoTotalRuns,
      oneTotalWickets, twoTotalWickets,
      oneRunRate, twoRunRate,
      oneWickets, twoWickets
    }

    tempArr.push(entry);

  }

  return tempArr
};