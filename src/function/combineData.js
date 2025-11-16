import addRuns from "./addRuns";
import wicketsCounter from "./wicketsCounter";

export function combineData(inningsOne, inningsTwo) {

    const one = [...inningsOne].map(over => over.overRuns).map(over => addRuns(over)) || [];
    const two = [...inningsTwo].map(over => over.overRuns).map(over => addRuns(over)) || [];

    let tempArr = [];

    for (let i = 0; i < Math.max(inningsOne.length, inningsTwo.length); i++) {

      const oneTotalRuns = addRuns(one.slice(0, i + 1));
      const oneRunRate = oneTotalRuns / (i + 1);
      const oneWickets = inningsOne[i] ? wicketsCounter(inningsOne[i].overRuns) : 0;

      const twoTotalRuns = addRuns(two.slice(0, i + 1));
      const twoRunRate = twoTotalRuns / (i + 1);
      const twoWickets = inningsTwo[i] ? wicketsCounter(inningsTwo[i].overRuns) : 0;

      let entry = {
        over: i + 1,
        oneRun: one[i] || 0,
        twoRun: two[i] || 0,
        oneTotalRuns,
        twoTotalRuns,
        oneRunRate,
        twoRunRate,
        oneWickets,
        twoWickets
      }

      tempArr.push(entry);

    }

    return tempArr
  };