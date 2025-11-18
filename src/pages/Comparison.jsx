import { useAtom } from "jotai";

// states
import { inningsOneAllOvers, inningsTwoAllOvers } from "../jotai/atom";

// functions
import { combineData } from "../function/combineData";

export const Comparison = () => {

  const [_inningsOneAllovers, setInningsOneAllOvers] = useAtom(inningsOneAllOvers);
  const [_inningsTwoAllovers, setInningsTwoAllOvers] = useAtom(inningsTwoAllOvers);

  const displayData = combineData(_inningsOneAllovers, _inningsTwoAllovers) || [];

  return (
    <div>
      {
        displayData.map((entry, id) => {
          return (
            <div key={id} style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr 1fr", gap: "0.5em", alignItems: "center", borderBottom: "1px solid #ccc", }}>

              <Section totalRuns={entry.oneTotalRuns} totalWickets={entry.oneTotalWickets} run={entry.oneRun} wicket={entry.oneWickets} strikeRate={entry.oneRunRate} />

              <h2 style={{ aspectRatio: "1.25", placeContent: "center", borderRadius: "0.25em", backgroundColor: "#ccc", color: "black", }}>{entry.over}</h2>

              <Section totalRuns={entry.twoTotalRuns} totalWickets={entry.twoTotalWickets} run={entry.twoRun} wicket={entry.twoWickets} strikeRate={entry.twoRunRate} />

            </div>
          )
        })
      }
    </div>
  )
};

function Section({ totalRuns, totalWickets, run, wicket, strikeRate }) {
  return (
    <div style={{ borderRadius: "1em", border: "1px solid #ccc", overflow: "hidden" }}>

      <p style={{ fontSize: "1.2em", fontWeight: "bold", padding: "0em", margin: "0em", borderBottom: "1px solid #ccc", }}>{totalRuns}-{totalWickets}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", }}>
        <p style={{ fontSize: "0.9em", margin: "0em", borderRight: "1px solid #ccc", }}>{run}-{wicket}</p>
        <p style={{ fontSize: "0.9em", margin: "0em", borderLeft: "1px solid #ccc", }}>{(strikeRate).toFixed(2)}</p>
      </div>

    </div>
  )
}