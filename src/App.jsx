import {  useEffect, useState } from 'react';
import './App.css';

import generateRuns from './function/generateRuns';
import addRuns from './function/addRuns';
import HeaderComponent from './components/Header';
import { Outlet } from 'react-router';

import { useAtom } from 'jotai';
import { teamOne, teamTwo } from './jotai/atom';


function App() {

  const [playerOne, setPlayerOne] = useState({ playerName: "", runs: [], });
  const [playerTwo, setPlayerTwo] = useState({ playerName: "", runs: [], });
  const [onStrike, setOnStrike] = useState(true);


  const [partnerOne, setPartnerOne] = useState({ playerName: "", runs: [], });
  const [partnerTwo, setPartnerTwo] = useState({ playerName: "", runs: [], });

  const [bowler, setBowler] = useState({ playerName: "", runs: [], onStrike: true, });

  const [battingTeam, setBattingTeam] = useAtom(teamOne);
  const [bowlingTeam, setBowlingTeam] = useAtom(teamTwo);

  const [run, setRun] = useState(0);
  const [overRuns, setOverRuns] = useState([]);

  const [inningsOneBattingScoreCard, setInningsOneBattingScoreCard] = useState([]);
  const [inningsOneBowlingScoreCard, setInningsOneBowlingScoreCard] = useState([]);
  const [inningsOnePartnership, setInningsOnePartnership] = useState([]);

  const [inningsTwoBattingScoreCard, setInningsTwoBattingScoreCard] = useState([]);
  const [inningsTwoBowlingScoreCard, setInningsTwoBowlingScoreCard] = useState([]);
  const [inningsTwoPartnership, setInningsTwoPartnership] = useState([]);

  useEffect(() => {

    if (overRuns.length > 5 && overRuns.length === 6) {

      overUp();
      setOverRuns([]);

    }
  }, [playerOne, playerTwo, bowler, onStrike, overUp]);


  function overUp() {

    if (overRuns.length === 6) {

      console.log(bowler.runs);

      const oversCount = bowler.runs.length / 6;
      const remainingBalls = bowler.runs.length - oversCount;

      const economy = addRuns(bowler.runs) / oversCount

      const newEntry = {
        playerName: bowler.playerName,
        runs: bowler.runs,
        overs: `${oversCount}.${remainingBalls}`,
        totalRuns: addRuns(bowler.runs),
        strikeRate: economy.toFixed(2),
      };

      const findBowlerIndex = inningsOneBowlingScoreCard.findIndex(bowler => bowler.playerName === newEntry.playerName);
      console.log(findBowlerIndex);

      if (findBowlerIndex === -1) {
        setInningsOneBowlingScoreCard([...inningsOneBowlingScoreCard, newEntry]);
      } else {
        const updatedArray = inningsOneBowlingScoreCard.map((bowler, index) => index === findBowlerIndex ? newEntry : bowler);
        setInningsOneBowlingScoreCard(updatedArray);
      }

      setBowler({ playerName: "", runs: [], onStrike: true, });

    }
  };


  function addBatsman(player) {

    if (playerOne.playerName.length > 0 && playerTwo.playerName.length > 0) {
      alert(`${playerOne.playerName} & ${playerTwo.playerName} are already on-field`);
      return;

    } else {

      if (playerOne.playerName === "") {

        setPlayerOne({ playerName: player, runs: [], });
        setPartnerOne({ playerName: player, runs: [], });

      } else if (playerTwo.playerName === "") {

        setPlayerTwo({ playerName: player, runs: [], });
        setPartnerTwo({ playerName: player, runs: [], });

      }

      setBattingTeam(battingTeam.filter((p) => p !== player));

    };

  };


  function addBowler(player) {

    const findBowler = inningsOneBowlingScoreCard.find(bowler => bowler.playerName === player.playerName);

    if (findBowler) {
      setBowler(findBowler);
    } else {
      setBowler({ playerName: player, runs: [], });
    }

  };


  function game() {

    const run = generateRuns();
    setRun(run);
    setOverRuns([...overRuns, run]);

    setBowler({ ...bowler, runs: [...bowler.runs, run] });

    if (typeof run === "string") {

      if (onStrike) {

        const batsmanEntry = {
          playerName: playerOne.playerName,
          runs: [...playerOne.runs, 0],
          totalRuns: addRuns([...playerOne.runs, 0]),
          strikeRate: (addRuns([...playerOne.runs, 0]) * 100 / [...playerOne.runs, 0].length).toFixed(2),
          ballsFaced: [...playerOne.runs, 0].length,
          fours: playerOne.runs.filter(run => run === 4).length,
          sixes: playerOne.runs.filter(run => run === 6).length
        }
        setInningsOneBattingScoreCard([...inningsOneBattingScoreCard, batsmanEntry]);

        const partnership = {
          player1: playerOne.playerName,
          player2: playerTwo.playerName,
          runs: addRuns([...playerOne.runs, 0, ...playerTwo.runs]),
          totalRuns: addRuns([...playerOne.runs, 0, ...playerTwo.runs]),
          strikeRate: (addRuns([...playerOne.runs, 0, ...playerTwo.runs]) * 100 / [...playerOne.runs, 0, ...playerTwo.runs].length).toFixed(2),
          ballsFaced: [...playerOne.runs, 0, ...playerTwo.runs].length,
          fours: playerOne.runs.filter(run => run === 4).length,
          sixes: playerOne.runs.filter(run => run === 6).length
        }

        setInningsOnePartnership([...inningsOnePartnership, partnership]);

        setPartnerOne({ playerName: "", runs: [], });
        setPartnerTwo({ playerName: "", runs: [], });

      } else {

        const batsmanEntry = {
          playerName: playerTwo.playerName,
          runs: [...playerTwo.runs, 0],
          totalRuns: addRuns([...playerTwo.runs, 0]),
          strikeRate: (addRuns([...playerTwo.runs, 0]) * 100 / [...playerTwo.runs, 0].length).toFixed(2),
          ballsFaced: playerTwo.runs.length + 1,
          fours: playerTwo.runs.filter(run => run === 4).length,
          sixes: playerTwo.runs.filter(run => run === 6).length
        }
        setInningsOneBattingScoreCard([...inningsOneBattingScoreCard, batsmanEntry]);

        const partnership = {
          player1: playerTwo.playerName,
          player2: playerOne.playerName,
          runs: addRuns([...playerTwo.runs, 0, ...playerOne.runs]),
          totalRuns: addRuns([...playerTwo.runs, 0, ...playerOne.runs]),
          strikeRate: (addRuns([...playerTwo.runs, 0, ...playerOne.runs]) * 100 / [...playerTwo.runs, 0, ...playerOne.runs].length).toFixed(2),
          ballsFaced: [...playerTwo.runs, 0, ...playerOne.runs].length,
          fours: playerTwo.runs.filter(run => run === 4).length,
          sixes: playerTwo.runs.filter(run => run === 6).length
        }

        setInningsOnePartnership([...inningsOnePartnership, partnership]);

        setPartnerOne({ playerName: "", runs: [], });
        setPartnerTwo({ playerName: "", runs: [], });

      };


    } else {

      if (run % 2 !== 0) {
        setOnStrike(!onStrike);
      }

      if (onStrike) {
        setPlayerOne({ ...playerOne, runs: [...playerOne.runs, run] });
        setPartnerOne({ ...playerOne, runs: [...playerOne.runs, run] });
      } else {
        setPlayerTwo({ ...playerTwo, runs: [...playerTwo.runs, run] });
        setPartnerTwo({ ...playerTwo, runs: [...playerTwo.runs, run] });
      }

    };

  };

  // console.table(inningsOneBattingScoreCard)
  // console.table(inningsOneBowlingScoreCard)
  // console.log(bowler)


  return (
    <>

    <HeaderComponent />
    <Outlet />



    </>
  )
}

export default App



