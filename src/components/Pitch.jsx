
import { useAtom } from "jotai";

import { activePartnership, bowler, onStrike, overRuns, partnerOne, partnerTwo, playerOne, playerTwo, prevBowler, run, } from "../jotai/atom";
import { ScoreBar } from "./ScoreBar";

import addRuns from "../function/addRuns"
import { addBatsman, addBowler } from "../function/addPlayers";
import generateRuns from "../function/generateRuns";
import { useCallback, useEffect, useRef } from "react";
import wicketsCounter from "../function/wicketsCounter";
import { updateBowler, updateOver } from "../function/updateBowler";
import updateBatsman from "../function/updateBatsman";


export const Pitch = ({
  battingTeam, setBattingTeam,
  bowlingTeam, setBowlingTeam,
  battingCard, setBattingCard,
  bowlingCard, setBowlingCard,
  partnershipData, setPartnershipData,
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
  const [_activePartnership, setActivePartnership] = useAtom(activePartnership);
  const outPlayer = useRef(null);


  console.log(bowlingCard.map(entry => entry.maidens))


  const overUp = useCallback(() => {

    const eachOver = {
      playerOne: _playerOne,
      playerTwo: _playerTwo,
      bowler: _bowler,
      overRuns: _overRuns,
    };

    setAllOvers([...allOvers, eachOver]);

    setOverRuns([]);
    setBowler({});
    setPrevBowler(prev => _bowler);
    setOnStrike(!_onStrike);

  }, [_bowler]);


  useEffect(() => {
    if (_overRuns.length > 5 && _overRuns.length === 6) {

      const updatedArray = updateOver(_bowler, bowlingCard, _overRuns,);
      setBowlingCard(updatedArray);

      overUp();
    };
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


    if (typeof run === "string") {

      // console.log("Wicket! onStrike:", _onStrike ? "playerOne" : "playerTwo");

      if (_onStrike) {

        alert(`${_playerOne.playerName} is ${run}`);
        outPlayer.current = "playerOne";

        const { playerEntry, updatedArray } = updateBatsman(run, _playerOne, battingCard, _bowler.playerName, bowlingTeam,);

        setBattingCard(updatedArray);

        const partnershipEntry = {
          playerOne: playerEntry,
          playerTwo: _playerTwo,
        };

        setPartnershipData([...partnershipData, partnershipEntry]);

        setPlayerOne({});
        setPartnerOne({});
        setPartnerTwo({ ..._playerTwo, runs: [] });

      } else {

        alert(`${_playerTwo.playerName} is ${run}`);
        outPlayer.current = "playerTwo";

        const { playerEntry, updatedArray } = updateBatsman(run, _playerTwo, battingCard, _bowler.playerName, bowlingTeam,);

        setBattingCard(updatedArray);

        const partnershipEntry = {
          playerOne: _playerOne,
          playerTwo: playerEntry,
        };

        setPartnershipData([...partnershipData, partnershipEntry]);

        setPlayerTwo({});
        setPartnerTwo({});
        setPartnerOne({ ..._playerOne, runs: [] });

      }
    } else {

      if (run % 2 !== 0) {
        setOnStrike(!_onStrike)
      };


      if (_onStrike) {

        const { playerEntry, updatedArray } = updateBatsman(run, _playerOne, battingCard, null, bowlingTeam,);

        setPlayerOne(playerEntry);
        setBattingCard(updatedArray);

        setPartnerOne(playerEntry);
        const updatePartnership = {
          playerOne: playerEntry,
          playerTwo: _partnerTwo,
        };

        setActivePartnership(updatePartnership);

      } else {

        const { playerEntry, updatedArray } = updateBatsman(run, _playerTwo, battingCard, null, bowlingTeam,);

        setPlayerTwo(playerEntry);
        setBattingCard(updatedArray);

        setPartnerTwo(playerEntry);
        const updatePartnership = {
          playerOne: _partnerOne,
          playerTwo: playerEntry,
        };

        setActivePartnership(updatePartnership);

      }
    }
  };


  return (
    <div style={{ width: "100%", margin: "auto" }}>

      <ScoreBar team={battingTeam} allOvers={allOvers} activeOver={_overRuns} />

      <div>
        {
          Object.keys(_playerOne).length > 0 && Object.keys(_playerTwo).length > 0
            ? <div
              onClick={() => game()}
              style={{
                width: "350px",
                padding: "0.5em 0.25em",
                margin: "0em auto",
                aspectRatio: "1.35/1",
                backgroundColor: "green",
                borderRadius: "45%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>

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
                <p style={{ fontSize: "2.7em", margin: "0em", padding: "0em", }}>
                  <span>{_run}</span>
                  <span style={{ fontSize: "0.5em", marginLeft: "0.25em" }}>
                    {
                      _overRuns.length > 0
                        ? addRuns(_overRuns)
                        : allOvers.length > 0 && addRuns(allOvers.at(-1).overRuns)
                    }
                  </span>
                </p>
                <hr style={{ width: "80%", margin: "auto", padding: "0em", }} />
                {
                  _overRuns.length > 0
                    ? _overRuns.map((run, id) => <span key={id}>{run}, </span>)
                    : allOvers.length > 0 && allOvers.at(-1).overRuns.map((run, id) => <span key={id}>{run}, </span>)
                }
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
                        padding: "0.35em 0.7em",
                        textAlign: "left",
                      }}
                      onClick={() => addBatsman(player, _playerOne, setPlayerOne, _playerTwo, setPlayerTwo, setPartnerOne, setPartnerTwo, battingCard, setBattingCard, outPlayer.current)}
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
                <span>{addRuns(_bowler?.runs)}/{wicketsCounter(_bowler?.runs)} ({Math.trunc(_bowler?.runs?.length / 6)}.{_bowler?.runs?.length % 6}) </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between", margin: "0.25em 0em", }}>
                <span>{_prevBowler.playerName}</span>
                <span>{addRuns(_prevBowler?.runs)}/{wicketsCounter(_prevBowler?.runs)} ({Math.trunc(_prevBowler?.runs?.length / 6)}.{_prevBowler?.runs?.length % 6}) </span>
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
                        padding: "0.35em 0.7em",
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

    </div>
  )
}