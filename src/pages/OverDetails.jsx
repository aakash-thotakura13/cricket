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
    <div style={{ fontSize: "0.9em", }}>

      {
        _inningsOneAllOvers.map((entry, id) => {
          return (
            <div key={id} style={{ border: "0.1em thin whitesmoke", margin: "0.7em 0em", padding: "0.7em 1.4em 0.7em 0.7em", borderRadius: "2.5em", display: "grid", gridTemplateColumns: "1fr 3fr 1fr", alignItems: "center", gap: "1em", }}>

              <p style={{ fontSize: "3em", backgroundColor: "#ccc", color: "black", borderRadius: "50%", }}>{id + 1}</p>

              <div>

                <p style={{  textAlign: "left", background: "#ccc", color: "black", borderRadius:"0.5em 0.7em", margin: "0.25em 0em", padding: "0em 0.3em", }}>{entry.bowler.playerName}</p>


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

            </div>
          )
        })
      }

    </div>
  )
}