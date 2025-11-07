
import { useAtom } from "jotai";

import { bowler, onStrike, overRuns, partnerOne, partnerTwo, playerOne, playerTwo, prevBowler, run, } from "../jotai/atom";
import { ScoreBar } from "./ScoreBar";

import addRuns from "../function/addRuns"
import { addBatsman, addBowler } from "../function/addPlayers";
import generateRuns from "../function/generateRuns";
import { useCallback, useEffect } from "react";
import wicketsCounter from "../function/wicketsCounter";
import updateBowler from "../function/updatePlayer";


export const Pitch = ({
  battingTeam, setBattingTeam,
  bowlingTeam, setBowlingTeam,
  battingCard, setBattingCard,
  bowlingCard, setBowlingCard,
  partnershipData, setpartnershipData,
  allOvers, setAllOvers
}) => {

  const [_playerOne, setPlayerOne] = useAtom(playerOne);
  const [_playerTwo, setPlayerTwo] = useAtom(playerTwo);

  const [_partnerOne, setPartnerOne] = useAtom(partnerOne);
  const [_partnerTwo, setPartnerTwo] = useAtom(partnerTwo);

  const [_bowler, setBowler] = useAtom(bowler);
  const [_prevBowler, setPrevBowler] = useAtom(prevBowler);

  const [_run, setRun] = useAtom(run);
  const [_overRuns, setOverRuns] = useAtom(overRuns);
  const [_onStrike, setOnStrike] = useAtom(onStrike);


  const overUp = useCallback(() => {
    setOverRuns([]);
    setPrevBowler(prev => _bowler);
    setBowler({});
  }, [_bowler]);

  useEffect(() => {
    if (_overRuns.length > 5 && _overRuns.length === 6) {
      overUp();
      console.log("overUp")
    }
  }, [_overRuns, overUp]);



  function game() {

    if (Object.keys(_bowler).length === 0) {
      alert(`Select a bowler`);
      return;
    }

    const run = generateRuns();
    setRun(run);

    const overRuns = [..._overRuns, run,];
    setOverRuns(overRuns);

    const { bowlerEntry, updatedArray } = updateBowler(run, _bowler, bowlingCard,)
    setBowler(bowlerEntry);
    setBowlingCard(updatedArray);

    if (run % 2 !== 0) {
      setOnStrike(!_onStrike);
    }

    if (typeof run === "string") {

      if (_onStrike) {

        let runs = [..._playerOne.runs, run];
        let totalRuns = addRuns(runs);
        let totalDeliveries = runs.length;
        let strikeRate = (totalRuns * 100 / totalDeliveries).toFixed(2);

        const playerEntry = {
          playerName: _playerOne.playerName,
          runs,
          totalRuns,
          totalDeliveries,
          strikeRate,
          fours: _playerOne.runs.filter(run => run === 4).length,
          sixes: _playerOne.runs.filter(run => run === 6).length
        };

        setBattingCard([...battingCard, playerEntry]);

        let partnershipRuns = [..._playerOne.runs, run, ..._playerTwo.runs];
        let partnershipTotalRuns = addRuns(partnershipRuns);
        let partnershipTotalDeliveries = partnershipRuns.length;
        let partnershipStrikeRate = (partnershipTotalRuns * 100 / partnershipTotalDeliveries).toFixed(2);

        const partnershipEntry = {
          player1: _playerOne.playerName,
          player2: _playerTwo.playerName,
          runs: partnershipRuns,
          totalRuns: partnershipTotalRuns,
          strikeRate: partnershipStrikeRate,
          ballsFaced: partnershipTotalDeliveries,
          fours: [..._playerOne.runs, run, ..._playerTwo.runs].filter(run => run === 4).length,
          sixes: [..._playerOne.runs, run, ..._playerTwo.runs].filter(run => run === 6).length
        };

        setpartnershipData([...partnershipData, partnershipEntry]);

        setPlayerOne({});
        setPartnerOne({});
        setPartnerTwo({ playerName: _partnerTwo.playerName, runs: [] });

      } else {

        let runs = [..._playerTwo.runs, run];
        let totalRuns = addRuns(runs);
        let totalDeliveries = runs.length;
        let strikeRate = (totalRuns * 100 / totalDeliveries).toFixed(2);

        const playerEntry = {
          playerName: _playerTwo.playerName,
          runs,
          totalRuns,
          totalDeliveries,
          strikeRate,
          fours: _playerTwo.runs.filter(run => run === 4).length,
          sixes: _playerTwo.runs.filter(run => run === 6).length
        };

        setBattingCard([...battingCard, playerEntry]);

        let partnershipRuns = [..._playerTwo.runs, run, ..._playerTwo.runs];
        let partnershipTotalRuns = addRuns(partnershipRuns);
        let partnershipTotalDeliveries = partnershipRuns.length;
        let partnershipStrikeRate = (partnershipTotalRuns * 100 / partnershipTotalDeliveries).toFixed(2);

        const partnershipEntry = {
          player1: _playerTwo.playerName,
          player2: _playerOne.playerName,
          runs: partnershipRuns,
          totalRuns: partnershipTotalRuns,
          strikeRate: partnershipStrikeRate,
          ballsFaced: partnershipTotalDeliveries,
          fours: [..._playerOne.runs, run, ..._playerTwo.runs].filter(run => run === 4).length,
          sixes: [..._playerOne.runs, run, ..._playerTwo.runs].filter(run => run === 6).length,
        };

        setpartnershipData([...partnershipData, partnershipEntry]);

        setPlayerTwo({});
        setPartnerOne({ playerName: _partnerOne.playerName, runs: [] });
        setPartnerTwo({});

      }
    } else {

      if (_onStrike) {

        let runs = [..._playerOne.runs, run];
        let totalRuns = addRuns(runs);
        let totalDeliveries = runs.length;
        let strikeRate = (totalRuns * 100 / totalDeliveries).toFixed(2);

        const playerEntry = {
          ..._playerOne,
          runs,
          totalRuns,
          totalDeliveries,
          strikeRate,
          fours: _playerOne.runs.filter(run => run === 4).length,
          sixes: _playerOne.runs.filter(run => run === 6).length
        };

        console.log("_playerOne", playerEntry)

        setPlayerOne(playerEntry);
        setPartnerOne(playerEntry);

        const findPlayer = battingCard.findIndex(player => player.playerName === _playerOne.playerName);
        const updatedArray = battingCard.map((player, index) => index === findPlayer ? playerEntry : player);
        setBattingCard(updatedArray);

        const eachOver = {
          playerOne: playerEntry,
          playerTwo: _playerTwo,
          bowler: bowlerEntry,
          overRuns,
        };

        setAllOvers([...allOvers, eachOver]);

      } else {

        let runs = [..._playerTwo.runs, run];
        let totalRuns = addRuns(runs);
        let totalDeliveries = runs.length;
        let strikeRate = (totalRuns * 100 / totalDeliveries).toFixed(2);

        const playerEntry = {
          ..._playerTwo,
          runs,
          totalRuns,
          totalDeliveries,
          strikeRate,
          fours: _playerTwo.runs.filter(run => run === 4).length,
          sixes: _playerTwo.runs.filter(run => run === 6).length
        };

        console.log("_playerTwo", playerEntry)

        setPlayerTwo(playerEntry);
        setPartnerTwo(playerEntry);

        const findPlayer = battingCard.findIndex(player => player.playerName === _playerTwo.playerName);

        const updatedArray = battingCard.map((player, index) => index === findPlayer ? playerEntry : player);
        setBattingCard(updatedArray);

        const eachOver = {
          playerOne: _playerOne,
          playerTwo: playerEntry,
          bowler: bowlerEntry,
          overRuns,
        };

        setAllOvers([...allOvers, eachOver]);

      }
    }


  };


  return (
    <>

      <ScoreBar team={battingTeam} allOvers={allOvers} />

      <div>
        {
          Object.keys(_playerOne).length > 0 && Object.keys(_playerTwo).length > 0
            ? <div onClick={() => game()} style={{ width: "350px", margin: "0em auto 1em", aspectRatio: "1.35/1", backgroundColor: "green", borderRadius: "45%", display: "flex", flexDirection: "column", justifyContent: "space-between", }}>

              <p style={{ padding: "0em", }}>
                {
                  _onStrike
                    ? <>
                      <span>{_playerOne.playerName}</span> <br />
                      <span>{addRuns(_playerOne?.runs)} ({_playerOne?.runs?.length})</span>
                    </>
                    : <>
                      <span>{_playerTwo.playerName}</span> <br />
                      <span>{addRuns(_playerTwo?.runs)} ({_playerTwo?.runs?.length})</span>
                    </>
                }
              </p>

              <div>
                <p style={{ fontSize: "2.7em", margin: "0em", padding: "0em", }}>{_run}</p>
                <hr style={{ width: "80%", margin: "auto", padding: "0em", }} />
                {_overRuns?.map((run, id) => <span key={id}>{run}, </span>)}
              </div>

              <p style={{ padding: "0em", }}>
                {
                  _onStrike
                    ? <>
                      <span>{_playerTwo.playerName}</span> <br />
                      <span>{addRuns(_playerTwo?.runs)} ({_playerTwo?.runs?.length})</span>
                    </>
                    : <>
                      <span>{_playerOne.playerName}</span> <br />
                      <span>{addRuns(_playerOne?.runs)} ({_playerOne?.runs?.length})</span>
                    </>
                }
              </p>

            </div>
            : <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.25em", fontSize: "0.85em" }}>
              {
                battingTeam.teamMembers.map((player, id) => {
                  return (
                    <li
                      key={id}
                      style={{
                        backgroundColor: player === _playerOne.playerName || player === _playerTwo.playerName ? "grey" : "",
                        border: "2px solid #ccc",
                        borderRadius: "1em",
                        cursor: "pointer",
                        padding: "0.25em 0.5em",
                        textAlign: "left",
                      }}
                      onClick={() => addBatsman(player, _playerOne, setPlayerOne, _playerTwo, setPlayerTwo, setPartnerOne, setPartnerTwo, battingCard, setBattingCard)}
                    >
                      {player}
                    </li>
                  )
                })
              }
            </div>
        }
      </div>

      <br />

      <div>
        {
          Object.keys(_bowler).length > 0
            ?
            <>
              <p style={{ display: "flex", justifyContent: "space-between", margin: "0.25em 0em", }}>
                <span>{_bowler.playerName}</span>
                <span>{addRuns(_bowler?.runs)} / {wicketsCounter(_bowler?.runs)}</span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between", margin: "0.25em 0em", }}>
                <span>{_prevBowler.playerName}</span>
                <span>{addRuns(_prevBowler?.runs)} / {wicketsCounter(_prevBowler?.runs)}</span>
              </p>
            </>
            :
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.25em", fontSize: "0.85em" }}>
              {
                bowlingTeam.teamMembers.map((player, id) => {
                  return (
                    <li
                      key={id}
                      style={{
                        backgroundColor: player === _bowler.playerName || player === _prevBowler.playerName ? "grey" : "",
                        border: "2px solid #ccc",
                        borderRadius: "1em",
                        cursor: "pointer",
                        padding: "0.25em 0.5em",
                        textAlign: "left",
                      }}
                      onClick={() => addBowler(player, setBowler, bowlingCard, setBowlingCard,)}
                    >
                      {player}
                    </li>
                  )
                })
              }
            </div>
        }
      </div>

    </>
  )
}