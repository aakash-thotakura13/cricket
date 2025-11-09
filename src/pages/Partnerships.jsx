import { useAtom } from "jotai"
import { activePartnership } from "../jotai/atom";
import addRuns from "../function/addRuns";


export function Partnerships() {

  return (
    <div>

      <ActivePartnership />

    </div>
  )
};


function ActivePartnership() {

  const [_activePartnership, setActivePartnership] = useAtom(activePartnership);

  const totalRuns = addRuns([_activePartnership.playerOne.runs, _activePartnership.playerTwo.runs].flat());
  const totalDeliveries = _activePartnership.playerOne.totalDeliveries + _activePartnership.playerTwo.totalDeliveries;
  const strikeRate = ((totalRuns / totalDeliveries) * 100).toFixed(2);

  return (
    <div style={{ fontSize: "0.85em", }}>

      <h1>Partnerships</h1>

      <div style={{display:"grid", gridTemplateColumns:"1.5fr 1fr 1.5fr",}}>

        <div style={{ textAlign: "left", }}>
          <p>{_activePartnership.playerOne.playerName}</p>
          <p>{_activePartnership.playerOne.totalRuns} ({_activePartnership.playerOne.totalDeliveries})</p>
        </div>

        <div style={{ backgroundColor: "#ccc", color: "black", padding: "0.7em 1.4em 0.35em", borderRadius: "1em", }}>
          <p style={{ marginBottom: "1em", padding: "0em", margin: "0em", }}>{totalRuns} ({totalDeliveries})</p>
          <p style={{ fontWeight: "bold", fontSize: "0.9em" }}>{strikeRate}</p>
        </div>

        <div style={{ textAlign: "right", }}>
          <p>{_activePartnership.playerTwo.playerName}</p>
          <p>{_activePartnership.playerTwo.totalRuns} ({_activePartnership.playerTwo.totalDeliveries})</p>
        </div>

      </div>

    </div>
  )
};