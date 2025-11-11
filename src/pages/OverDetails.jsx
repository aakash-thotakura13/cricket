import { useAtom } from "jotai"
import { inningsOneAllOvers, inningsTwoAllOvers } from "../jotai/atom"
import addRuns from "../function/addRuns";
import wicketsCounter from "../function/wicketsCounter";

export const OverDetails = () => {

  const [_inningsOneAllOvers, setInningsOneAllOvers] = useAtom(inningsOneAllOvers);
  const [_inningsTwoAllOvers, setInningsTwoAllOvers] = useAtom(inningsTwoAllOvers);

  console.clear()
  console.log(_inningsOneAllOvers)


  return (
    <div style={{ fontSize: "0.8em", }}>

      <h2 style={{ textAlignLast: "right", padding: "0.25em 0.5em", backgroundColor: "#ccc", color: "black", borderRadius: "0.55em 0.55em 1em 1em" }}>Innings One</h2>

      {
        _inningsOneAllOvers.map((entry, id) => {

          const hasStringRun = entry.overRuns.some(run => typeof run === "string");

          return (
            <details key={id} style={{ padding: "0em", margin: "0.5em 0em", border: hasStringRun ? "0.1em solid red" : "1px solid #ccc", borderRadius: "2.5em", }} open={hasStringRun}>

              <summary style={{ margin: "0em 0em", padding: "0.7em 1.4em 0.7em 0.7em", display: "grid", gridTemplateColumns: "1fr 3fr 1fr", alignItems: "center", gap: "1em", }}>

                <p style={{ width: "60px", height: "60px", display: "flex", placeContent: "center", placeItems: "center", fontSize: "3em", backgroundColor: "#ccc", color: "black", borderRadius: "50%", }}>{id + 1}</p>

                <div>

                  <p style={{ textAlign: "left", background: "#ccc", color: "black", borderRadius: "0.5em 0.7em", margin: "0.5em 0em", padding: "0em 0.3em", }}>{entry.bowler.playerName}</p>

                  <p style={{ display: "flex", justifyContent: "space-between", margin: "0.25em 0em", padding: "0em 0.3em", }}>
                    <span>{entry.playerOne.playerName}</span>
                    <span>{entry.playerOne.totalRuns} ({entry.playerOne.totalDeliveries})</span>
                  </p>
                  <p style={{ display: "flex", justifyContent: "space-between", margin: "0.25em 0em", padding: "0em 0.3em", }}>
                    <span>{entry.playerTwo.playerName}</span>
                    <span>{entry.playerTwo.totalRuns} ({entry.playerTwo.totalDeliveries})</span>
                  </p>

                </div>

                <div style={{ fontSize: "1.5em" }}>
                  <p>{addRuns(entry.overRuns)}</p>
                  <hr />
                  <p>{wicketsCounter(entry.overRuns)}</p>
                </div>

              </summary>

              <hr style={{ width: "90%", margin: "auto" }} />

              <div style={{ display: "flex", justifyContent: "space-evenly", margin: "0.5em 0em", }}>
                {
                  entry.overRuns.map((run, id) => {
                    return (
                      <span key={id} style={{ width: "30px", height: "30px", fontSize: "1.7em", backgroundColor: "#ccc", color: "black", borderRadius: "50%", }} >
                        {typeof run === "string" ? "W" : run}
                      </span>
                    )
                  })
                }
              </div>

            </details>
          )
        })
      }

    </div>
  )
}