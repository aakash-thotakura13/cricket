
export default function addRuns(runs) {

  if (runs === undefined || runs.length === 0) {
    return 0;
  } else {
    const updateRuns = runs.map(run => typeof run === "string" ? 0 : run);
    return updateRuns.reduce((acc, run) => acc + run, 0);
  }


}