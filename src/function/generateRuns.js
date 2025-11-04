export function generateRuns() {
  const runsArray = [0, 1, 2, 3, 4, 6, "Out"];
  
  return runsArray[Math.floor(Math.random() * runsArray.length)];
}

