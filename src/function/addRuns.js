export default function addRuns(runs = []) {
  return runs
    .filter((run) => typeof run === "number")
    .reduce((total, run) => total + run, 0);
}
