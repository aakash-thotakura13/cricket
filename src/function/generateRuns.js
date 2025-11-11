export default function generateRuns() {
  const outComes = [
    { value: 0, weight: 48 },
    { value: 1, weight: 32 },
    { value: 2, weight: 16 },
    { value: 3, weight: 2 },
    { value: 4, weight: 8 },
    { value: 6, weight: 4 },
    { value: "Bowled", weight: 2 },
    { value: "Caught", weight: 1 },
    { value: "LBW", weight: 1 },
    { value: "Stumped", weight: 1 },
  ];

  const weighted = outComes.flatMap((outCome) =>
    Array(outCome.weight).fill(outCome.value)
  );
  return weighted[Math.floor(Math.random() * weighted.length)];
}
