import { useState } from 'react'
import './App.css'
import { indianW, southAfricaW } from './database'
import { generateRuns } from './function/generateRuns';

function App() {

  const [playerOne, setPlayerOne] = useState({ playerName: "", runs: [], });
  const [playerTwo, setPlayerTwo] = useState({ playerName: "", runs: [], });
  const [onStrike, setOnStrike] = useState(true);

  const [bowler, setBowler] = useState({ playerName: "", runs: [], onStrike: true, });

  const [battingTeam, setBattingTeam] = useState([...indianW]);
  const [bowlingTeam, setBowlingTeam] = useState([...southAfricaW]);

  const [inningsOneBattingScoreCard, setInningsOneBattingScoreCard] = useState([]);
  const [inningsOneBowlingScoreCard, setInningsOneBowlingScoreCard] = useState([]);
  const [inningsTwoBattingScoreCard, setInningsTwoBattingScoreCard] = useState([]);
  const [inningsTwoBowlingScoreCard, setInningsTwoBowlingScoreCard] = useState([]);



  function addBatsman(player) {

    if (player === playerOne.playerName || player === playerTwo.playerName) {
      alert(`${player} is already on-field`);
      return;

    } else {

      if (playerOne.playerName === "") {
        setPlayerOne({ playerName: player, runs: [], });
      } else if (playerTwo.playerName === "") {
        setPlayerTwo({ playerName: player, runs: [], });
      }

      setBattingTeam(battingTeam.filter((p) => p !== player));

    };

  };

  function addBowler(player) {
    setBowler({ playerName: player, runs: [], });
  };


  function game() {

    const run = generateRuns();

    if (typeof run === "string") {

      if (onStrike) {
        setPlayerOne({ playerName: "", runs: 0, });
      } else {
        setPlayerTwo({ playerName: "", runs: 0, });
      }

      console.log(run, onStrike,)

    } else {

      if (run % 2 !== 0) {
        setOnStrike(!onStrike);
      }

      if (onStrike) {
        setPlayerOne({ ...playerOne, runs: [...playerOne.runs, run] });
      } else {
        setPlayerTwo({ ...playerTwo, runs: [...playerTwo.runs, run] });
      }

    };


  }

  return (
    <>
      <h1>Cricket</h1>
      <p>On striker: {playerOne.playerName} {playerOne.runs}</p>
      <p>Non striker: {playerTwo.playerName} {playerTwo.runs}</p>
      <p>Bowler: {bowler.playerName}</p>

      <button onClick={game}>Game</button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {
          indianW.map((player) => (
            <li key={player} onClick={() => addBatsman(player)}>{player}</li>
          ))
        }
      </div>
      
      <hr />
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {
          southAfricaW.map((player) => (
            <li key={player} onClick={() => addBowler(player)}>{player}</li>
          ))
        }
      </div>
    </>
  )
}

export default App



