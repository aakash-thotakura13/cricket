import addRuns from "../function/addRuns";
import wicketsCounter from "../function/wicketsCounter";

export const ScoreBar = ({ team, allOvers, activeOver }) => {

  const overs = allOvers?.map(over => over.overRuns)?.flat();
  
  const totalRuns = addRuns([...overs, ...activeOver])
  const wickets = wicketsCounter([...overs, ...activeOver]);

  const overCount = allOvers?.length;
  const activeOverLength = activeOver?.length;

  return (
    <p style={{ fontSize: "1em", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ccc", color: "black", margin: "1em 0em", padding: "0em 0.5em", borderRadius: "0.35em 0.35em 0.7em 0.7em", }}>
      <span style={{ fontWeight:"500", fontSize:"1.1em" }}>{team.tag}: {totalRuns}/{wickets}</span>
      <span style={{ fontSize: "0.9rem" }}>RunRate: {(totalRuns / `${overCount}.${activeOverLength}`).toFixed(2)}</span>
      <span style={{ fontSize: "0.9rem" }}>Over: {overCount}.{activeOverLength}</span>
    </p>
  )
}