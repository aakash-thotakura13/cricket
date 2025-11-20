export function countOccurrences(arr = []) {
  // Initialize counts for 0–6
  const result = Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => [i, 0])
  );

  for (const value of arr) {
    if (typeof value === "number" && value >= 0 && value <= 6) {
      result[value]++;
    }
  }

  return result;
}
