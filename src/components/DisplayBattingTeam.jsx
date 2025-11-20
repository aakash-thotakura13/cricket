import { addBatsman } from "../function/addPlayers";

const DisplayBattingTeam = ({battingTeam, battingCard, playerOne, setPlayerOne, playerTwo, setPlayerTwo, setPartnerOne, setPartnerTwo, setBattingCard, outPlayer }) => {

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.25em", fontSize: "0.85em", }}>
      {
        battingTeam.teamMembers.map((player, id) => {
          return (
            <button
              key={player}
              style={{
                backgroundColor: battingCard.some(playerEntry => playerEntry.playerName === player) ? "#ccc" : "",
                color: battingCard.some(playerEntry => playerEntry.playerName === player) ? "black" : "",
                fontWeight: "400",
                border: "2px solid #ccc",
                borderRadius: "1em",
                cursor: "pointer",
                padding: "0.35em 0.7em",
                textAlign: "left",
              }}
              onClick={() => addBatsman(player, playerOne, setPlayerOne, playerTwo, setPlayerTwo, setPartnerOne, setPartnerTwo, battingCard, setBattingCard, outPlayer)}
            >
              {player}
            </button>
          )
        })
      }
    </div>
  )
}

export default DisplayBattingTeam;