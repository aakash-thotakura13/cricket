
import { useCallback, useEffect, useRef } from "react";
import { useAtom } from "jotai";

// states
import { activePartnership, bowler, onStrike, overRuns, partnerOne, partnerTwo, playerOne, playerTwo, prevBowler, run, } from "../jotai/atom";

// components
import { Overview } from "./Overview";
import { ScoreBar } from "./ScoreBar";

// functions
import addRuns from "../function/addRuns"
import { addBatsman, addBowler } from "../function/addPlayers";
import generateRuns from "../function/generateRuns";
import wicketsCounter from "../function/wicketsCounter";
import { updateBowler, updateOver } from "../function/updateBowler";
import updateBatsman from "../function/updateBatsman";


export const Pitch = ({
  battingTeam, setBattingTeam,
  bowlingTeam, setBowlingTeam,
  battingCard, setBattingCard,
  bowlingCard, setBowlingCard,
  partnershipData, setPartnershipData,
  allOvers, setAllOvers, setStatus
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

  }, [_playerOne, _playerTwo, _bowler, _overRuns]);

  function inningUp() {

    const partnershipUpdate = {
      partnerOne: _partnerOne,
      partnerTwo: _partnerTwo,
    };

    setPartnershipData([...partnershipData, partnershipUpdate]);
    console.table("partnership updated", partnershipUpdate)

    setStatus(true);
    setPlayerOne({}); setPlayerTwo({});
    setPartnerOne({}); setPartnerTwo({});
    setBowler({}); setPrevBowler({});
    setOnStrike(true);

    console.log("Innings Over");
    setActivePartnership([]);
    
  }


  useEffect(() => {
    if (_overRuns.length === 6) {
      const updatedArray = updateOver(_bowler, bowlingCard, _overRuns);
      setBowlingCard(updatedArray);
      overUp();
    }
  }, [_overRuns]);


  useEffect(() => {
    if (allOvers.length === 20) {
      inningUp();
    }
  }, [allOvers]);


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

      if (_onStrike) {

        alert(`${_playerOne.playerName} is ${run}`);
        outPlayer.current = "playerOne";

        // update player state
        const { updatedArray } = updateBatsman(run, _playerOne, battingCard, _bowler.playerName, bowlingTeam,);
        setBattingCard(updatedArray);
        setPlayerOne({});

        // update partner state
        const newPartnershipEntry = {
          partnerOne: { ..._partnerOne, runs: [..._partnerOne.runs, run], },
          partnerTwo: _partnerTwo,
        };
        setPartnershipData([...partnershipData, newPartnershipEntry]);

        const updateActivePartnership = {
          partnerOne: {},
          partnerTwo: { playerName: _partnerTwo.playerName, runs: [], },
        };
        setActivePartnership(updateActivePartnership);

        setPartnerOne({});
        setPartnerTwo({ playerName: _partnerTwo.playerName, runs: [] });

      } else {

        alert(`${_playerTwo.playerName} is ${run}`);
        outPlayer.current = "playerTwo";

        // update player state
        const { updatedArray } = updateBatsman(run, _playerTwo, battingCard, _bowler.playerName, bowlingTeam,);
        setBattingCard(updatedArray);
        setPlayerTwo({});

        // update partner state
        const newPartnershipEntry = {
          partnerOne: _partnerOne,
          partnerTwo: { ..._partnerTwo, runs: [..._partnerTwo.runs, run], },
        };
        setPartnershipData([...partnershipData, newPartnershipEntry]);

        const updateActivePartnership = {
          partnerOne: { playerName: _partnerOne.playerName, runs: [], },
          partnerTwo: {},
        };
        setActivePartnership(updateActivePartnership);

        setPartnerTwo({});
        setPartnerOne({ playerName: _partnerOne.playerName, runs: [] });

      }
    } else {

      if (run % 2 !== 0) {
        setOnStrike(!_onStrike)
      };

      if (_onStrike) {

        // update player state
        const { playerEntry, updatedArray } = updateBatsman(run, _playerOne, battingCard, null, bowlingTeam,);
        setPlayerOne(playerEntry);
        setBattingCard(updatedArray);

        // update partner state
        const singlePartnerUpdate = {
          playerName: _partnerOne.playerName,
          runs: [..._partnerOne.runs, run],
        };
        setPartnerOne(singlePartnerUpdate);

        const updatePartnership = {
          partnerOne: singlePartnerUpdate,
          partnerTwo: _partnerTwo,
        };
        setActivePartnership(updatePartnership);

      } else {

        const { playerEntry, updatedArray } = updateBatsman(run, _playerTwo, battingCard, null, bowlingTeam,);

        setPlayerTwo(playerEntry);
        setBattingCard(updatedArray);

        const singlePartnerUpdate = {
          playerName: _partnerTwo.playerName,
          runs: [..._partnerTwo.runs, run],
        }
        setPartnerTwo(singlePartnerUpdate);

        const updatePartnership = {
          partnerOne: _partnerOne,
          partnerTwo: singlePartnerUpdate,
        };
        setActivePartnership(updatePartnership);

      }
    }
  };


  return (
    <div style={{ width: "100%", margin: "auto" }}>

      <ScoreBar team={battingTeam} allOvers={allOvers} activeOver={_overRuns} />

      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "1em", overflowX: "auto", }}>

        {/* Pitch Component Display */}
        <div style={{ minWidth: "350px", margin: "1.5em auto", }}>
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
                          backgroundColor: battingCard.some(playerEntry => playerEntry.playerName === player) ? "#ccc" : "",
                          color: battingCard.some(playerEntry => playerEntry.playerName === player) ? "black" : "",
                          fontWeight: "400",
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

        {/* Innings Overview Display */}
        <Overview playerOne={_playerOne} playerTwo={_playerTwo} bowler={_bowler} prevBowler={_prevBowler} battingCard={battingCard} bowlingCard={bowlingCard} />

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