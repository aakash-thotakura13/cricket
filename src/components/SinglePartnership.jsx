import addRuns from "../function/addRuns";

export const SinglePartnership = ({ partnerOne, partnerTwo }) => {

  const partnerOneTotalRuns = addRuns(partnerOne?.runs) || 0;
  const partnerOneBallsFaced = partnerOne?.runs?.length || 0;

  const partnerTwoTotalRuns = addRuns(partnerTwo?.runs) || 0;
  const partnerTwoBallsFaced = partnerTwo?.runs?.length || 0;

  const totalRuns = partnerOneTotalRuns + partnerTwoTotalRuns;
  const totalBalls = partnerOneBallsFaced + partnerTwoBallsFaced;

  const strikeRate = totalBalls > 0 ? ((totalRuns / totalBalls) * 100).toFixed(2) : 0.00;


  return (
    <div style={{ minWidth: "350px", margin: "1.5em auto", border: "5px double #ccc", borderRadius: "2em" }}>

      <h3>Active Partnership</h3>

      <div style={{ fontSize: "0.9em", margin: "0.75em 0.75em", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center", }} >

        <p style={{ textAlign: "left" }}>

          <span>{partnerOne?.playerName}</span> <br />
          <span>{partnerOneTotalRuns} ({partnerOneBallsFaced})</span>

        </p>

        <p style={{ backgroundColor: "#ccc", color: "black", padding: "0em", borderRadius: "1em", width: "100px", aspectRatio: "1.2/1", placeContent: "center", placeItems: "center", }}>
          <span style={{ fontSize: "1.4em", }}>{totalRuns} ({totalBalls})</span> <br />
          <span>{strikeRate}</span>
        </p>

        <p style={{ textAlign: "right" }}>

          <span>{partnerTwo?.playerName}</span> <br />
          <span>{partnerTwoTotalRuns} ({partnerTwoBallsFaced})</span>

        </p>
      </div>

    </div>
  )
}