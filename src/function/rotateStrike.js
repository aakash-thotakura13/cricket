export default function rotateStrike(run, setOnStrike) {
  if (typeof run === "number" && run % 2 !== 0) {
    setOnStrike(prev => !prev);
  }
}
