export function convertToBowlerChartData(arr) {

  return arr.map((over, id) => {
    const result = {name: id + 1};
    let runs = 0;
    let wicketCount= 0;

    for (const val of over) {
      if (typeof val === "number") {
        runs += val;
      } else if (typeof val === "string" && val.trim() !== "") {
        wicketCount += 1;
        result[`wicket${wicketCount}`] = 3.5;
      }
    }

    result.runs = runs;

    return result

  })

}
