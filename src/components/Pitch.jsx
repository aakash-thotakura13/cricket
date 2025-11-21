
import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";

// states
import { activePartnership, bowler, onStrike, overRuns, partnerOne, partnerTwo, playerOne, playerTwo, prevBowler, run, } from "../jotai/atom";

// components
import { Overview } from "./Overview";
import { ScoreBar } from "./ScoreBar";
import DisplayBattingTeam from "./DisplayBattingTeam";
import DisplayBowlingTeam from "./DisplayBowlingTeam";

// functions
import addRuns from "../function/addRuns"
import generateRuns from "../function/generateRuns";
import wicketsCounter from "../function/wicketsCounter";
import { updateBowler, updateOver } from "../function/updateBowler";
import updateBatsman from "../function/updateBatsman";
import rotateStrike from "../function/rotateStrike";
import updateActivePartnership from "../function/updatePartnership";
import updatePartnershipData from "../function/updatePartnershipData";


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

  const striker = _onStrike ? _playerOne : _playerTwo;
  const nonStriker = !_onStrike ? _playerOne : _playerTwo;


  const overUp = useCallback(() => {

    setOverRuns([]);
    setBowler({});
    setOnStrike(prev => !prev);
    setPrevBowler(() => _bowler);

  }, [_playerOne, _playerTwo, _bowler, _overRuns, setAllOvers, setOverRuns, setBowler, setPrevBowler, setOnStrike]);


  const inningUp = () => {

    const partnershipUpdate = {
      partnerOne: _partnerOne,
      partnerTwo: _partnerTwo,
    };

    setPartnershipData(prev => [...prev, partnershipUpdate]);

    setStatus(true);
    setPlayerOne({});
    setPlayerTwo({});
    setPartnerOne({});
    setPartnerTwo({});
    setBowler({});
    setPrevBowler({});
    setOnStrike(true);
    setActivePartnership([]);
  };


  useEffect(() => {

    if (_overRuns.length === 6) {
      const updatedArray = updateOver(_bowler, bowlingCard, _overRuns);
      setBowlingCard(updatedArray);
      overUp();
    }

  }, [_overRuns, _bowler, bowlingCard, setBowlingCard, overUp]);


  useEffect(() => {
    if (allOvers.length === 20) {
      inningUp();
    }
  }, [allOvers]);


  function updateAllOversPerBall(run) {

    // adding a new over, if the last over the allOvers array has 6 entries
    if (allOvers.length === 0 || allOvers.at(-1).overRuns.length === 6) {
      const newOver = {
        playerOne: _playerOne,
        playerTwo: _playerTwo,
        bowler: _bowler,
        overRuns: [run],
      };

      setAllOvers(prev => [...prev, newOver]);
      return;
    }

    const updatedOver = {
      ...allOvers.at(-1),
      playerOne: _playerOne,
      playerTwo: _playerTwo,
      bowler: _bowler,
      overRuns: [...allOvers.at(-1).overRuns, run],
    };

    setAllOvers(prev => {
      const copy = [...prev];
      copy[copy.length - 1] = updatedOver;
      return copy;
    });
  };


  function game() {

    if (Object.keys(_bowler).length === 0) {
      alert(`Select a bowler`);
      return;
    }

    const run = generateRuns();
    setRun(run);

    const overRuns = [..._overRuns, run,];
    setOverRuns(overRuns);
    updateAllOversPerBall(run);

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
        const { newPartnershipEntry, updatePartnership } = updatePartnershipData(_onStrike, run, _partnerOne, _partnerTwo);
        setPartnershipData([...partnershipData, newPartnershipEntry]);
        setActivePartnership(updatePartnership)

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
        const { newPartnershipEntry, updatePartnership } = updatePartnershipData(_onStrike, run, _partnerTwo, _partnerOne);
        setPartnershipData([...partnershipData, newPartnershipEntry]);
        setActivePartnership(updatePartnership)

        setPartnerTwo({});
        setPartnerOne({ playerName: _partnerOne.playerName, runs: [] });

      }
    } else {

      rotateStrike(run, setOnStrike);

      if (_onStrike) {

        // update player state
        const { playerEntry, updatedArray } = updateBatsman(run, _playerOne, battingCard, null, bowlingTeam,);
        setPlayerOne(playerEntry);
        setBattingCard(updatedArray);

        // update partner state
        const { singlePartnerUpdate, updatePartnership } = updateActivePartnership(_onStrike, run, _partnerOne, _partnerTwo);
        setPartnerOne(singlePartnerUpdate);
        setActivePartnership(updatePartnership);

      } else {

        // update player state
        const { playerEntry, updatedArray } = updateBatsman(run, _playerTwo, battingCard, null, bowlingTeam,);
        setPlayerTwo(playerEntry);
        setBattingCard(updatedArray);

        // update partner state
        const { singlePartnerUpdate, updatePartnership } = updateActivePartnership(_onStrike, run, _partnerTwo, _partnerOne);
        setPartnerTwo(singlePartnerUpdate);
        setActivePartnership(updatePartnership);

      }
    }
  };


  return (
    <div style={{ width: "100%", margin: "auto" }}>

      <ScoreBar team={battingTeam} allOvers={allOvers} activeOver={_overRuns} />

      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", gap: "1em", overflowX: "auto", }}>

        {/* Pitch Component Display */}
        <div style={{ minWidth: "350px", margin: "1.5em auto", }}>

          <div>
            {
              Object.keys(_playerOne).length > 0 && Object.keys(_playerTwo).length > 0
                ? <div
                  onClick={game}
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

                  {/* striker display */}
                  <BatsmanDisplay player={striker} />

                  <div>
                    <p style={{ fontSize: "2.7em", margin: "0em", padding: "0em", }}>
                      <span>{_run}</span>
                      <span style={{ fontSize: "0.5em", marginLeft: "0.25em" }}>
                        {
                          _overRuns.length > 0
                            ? addRuns(_overRuns)
                            : addRuns(allOvers?.at(-1)?.overRuns || [])
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

                  {/* nonStriker display */}
                  <BatsmanDisplay player={nonStriker} />

                </div>
                : <DisplayBattingTeam
                  battingTeam={battingTeam} battingCard={battingCard}
                  playerOne={_playerOne} setPlayerOne={setPlayerOne}
                  playerTwo={_playerTwo} setPlayerTwo={setPlayerTwo}
                  setPartnerOne={setPartnerOne} setPartnerTwo={setPartnerTwo}
                  setBattingCard={setBattingCard} outPlayer={outPlayer.current}
                />
            }
          </div>

          <hr style={{ margin: "1.5em" }} />

          <div>
            {
              Object.keys(_bowler).length > 0
                ?
                <>
                  <BowlerDisplay player={_bowler} />
                  <BowlerDisplay player={_prevBowler} />
                </>
                : <DisplayBowlingTeam
                  bowlingTeam={bowlingTeam} bowler={_bowler} setBowler={setBowler}
                  bowlingCard={bowlingCard} setBowlingCard={setBowlingCard}
                  prevBowler={_prevBowler}
                />
            }
          </div>

        </div>

        <div>
          {/* Innings Overview Display */}
          <Overview />
        </div>

      </div>

    </div>
  )
};

function BatsmanDisplay({ player }) {
  return (
    <p style={{ padding: "0em", }}>
      <span>{player?.playerName}</span> <br />
      <span>{addRuns(player?.runs)} ({player?.runs?.length})</span>
    </p>
  )
};

function BowlerDisplay({ player }) {
  return (
    <p style={{ display: "flex", justifyContent: "space-between", margin: "0.25em 0em", }}>
      <span>{player.playerName}</span>
      <span>{addRuns(player?.runs)}/{wicketsCounter(player?.runs)} ({Math.trunc(player?.runs?.length / 6)}.{player?.runs?.length % 6}) </span>
    </p>
  )
}