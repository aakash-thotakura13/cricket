export function convertToBowlerChartData(arr=[]) {
  return arr.map((over=[], id) => {
    const result = { name: id + 1 };

    let runs = 0;
    let wicketCount = 0;

    for (const ball of over) {
      if (typeof ball === "number") {
        runs += ball;
      } else if (typeof ball === "string" && ball.trim() !== "") {
        wicketCount++;
        result[`wicket${wicketCount}`] = 3.5;
      }
    }

    result.runs = runs;

    return result;
  });
}
