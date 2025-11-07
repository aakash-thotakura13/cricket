import addRuns from "../function/addRuns";

export const ScoreBar = ({ team, allOvers }) => {

  const overs = allOvers?.map(over => over.overRuns)?.flat();
  const overCount = allOvers.length;
  const deliveryCount = overs.length;

  console.log(...allOvers);

  return (
    <p style={{ fontSize: "1.2em", display: "flex", justifyContent: "space-between", }}>
      <span>{team.tag}</span>

      <span>{addRuns(overs)}/{allOvers.length}.{overs.length - (allOvers.length * 6)}</span>
    </p>
  )
}