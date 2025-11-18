import addRuns from "../function/addRuns";
import wicketsCounter from "../function/wicketsCounter";

export const ScoreBar = ({ team, allOvers, activeOver }) => {

  const overs = allOvers?.map(over => over.overRuns)?.flat();
  
  const totalRuns = addRuns([...overs, ...activeOver])
  const wickets = wicketsCounter([...overs, ...activeOver]);

  const overCount = allOvers?.length;
  const activeOverLength = activeOver?.length;

  return (
    <p style={{ fontSize: "1em", display: "flex", justifyContent: "space-between", alignItems: "end", backgroundColor: "#ccc", color: "black", margin: "1em 0em", padding: "0.7em 1.4em", borderRadius: "3em", }}>
      <span style={{ fontWeight:"500", fontSize:"1.3em" }}>{team.tag}: {totalRuns}/{wickets}</span>
      <span style={{ fontSize: "1em" }}>RR: {(totalRuns / `${overCount}.${activeOverLength}`).toFixed(2)}</span>
      <span style={{ fontSize: "1.1em" }}>Ovr: {overCount}.{activeOverLength}</span>
    </p>
  )
}