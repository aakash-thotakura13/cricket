export default function addRuns(runs = []) {
  return runs
    .reduce((total, run) => {
      return typeof run === "number" ? total + run : total;
    }, 0);
};
