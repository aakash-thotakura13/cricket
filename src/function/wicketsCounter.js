export default function wicketsCounter(runs = []) {
  return runs.filter((run) => typeof run === "string").length;
}
