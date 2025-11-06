
export default function wicketsCounter(runs) {

  if (runs.length === 0) {

    return 0;

  } else {

    const updateRuns = runs.filter(run => typeof run === "string");
    // return updateRuns.reduce((acc, run) => acc + run, 0);
    return updateRuns.length;

  };

};