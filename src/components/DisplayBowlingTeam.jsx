import { addBowler } from "../function/addPlayers";

const DisplayBowlingTeam = ({ bowlingTeam, bowler, setBowler, bowlingCard, setBowlingCard, prevBowler}) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.25em", fontSize: "0.85em", }}>
      {
        bowlingTeam.teamMembers.map((player, id) => {
          return (
            <button
              key={player}
              style={{
                backgroundColor: player === bowler.playerName || player === prevBowler.playerName ? "grey" : "",
                border: "2px solid #ccc",
                borderRadius: "1em",
                cursor: "pointer",
                padding: "0.35em 0.7em",
                textAlign: "left",
              }}
              onClick={() => addBowler(player, setBowler, bowlingCard, setBowlingCard,)}
            >
              {player}
            </button>
          )
        })
      }
    </div>
  )
}

export default DisplayBowlingTeam;