import { useState } from "react";
import { useAtom } from "jotai";

// states
import {
  teamOne, teamTwo,
  inningsOneBattingScoreCard, inningsOneBowlingScoreCard,
  inningsTwoBattingScoreCard, inningsTwoBowlingScoreCard,
  inningsOneScore, inningsTwoScore,
} from "../jotai/atom";

// components
import { StackedBarChart } from "../components/chart/StackedBarChart";
import { PageTitle } from "../components/PageTitle";
import { PageNavBar } from "../components/PageNavBar";

// functions
import addRuns from "../function/addRuns";
import { countOccurrences } from "../function/countOccurrences";
import { convertToBowlerChartData } from "../function/convertToBowlerChartData";
import wicketsCounter from "../function/wicketsCounter";


export const ScoreCard = () => {

  const [_teamOne] = useAtom(teamOne);
  const [_teamTwo] = useAtom(teamTwo);

  const [_inningsOneBattingScoreCard] = useAtom(inningsOneBattingScoreCard);
  const [_inningsOneBowlingScoreCard] = useAtom(inningsOneBowlingScoreCard);

  const [_inningsTwoBattingScoreCard] = useAtom(inningsTwoBattingScoreCard);
  const [_inningsTwoBowlingScoreCard] = useAtom(inningsTwoBowlingScoreCard);

  const [_inningsOneScore] = useAtom(inningsOneScore)
  const [_inningsTwoScore] = useAtom(inningsTwoScore)

  const [displayInnings, setDisplayInnings] = useState(true);

  const inningsConfig = displayInnings
    ? {
      battingScoreCard: _inningsOneBattingScoreCard,
      bowlingScoreCard: _inningsOneBowlingScoreCard,
      battingTeam: _teamOne,
      allDeliveries: _inningsOneScore
    }
    : {
      battingScoreCard: _inningsTwoBattingScoreCard,
      bowlingScoreCard: _inningsTwoBowlingScoreCard,
      battingTeam: _teamTwo,
      allDeliveries: _inningsTwoScore
    };

  return (
    <div>
      <PageTitle title="Scorecard" />
      <PageNavBar displayInnings={displayInnings} setDisplayInnings={setDisplayInnings} />

      <div style={{ fontSize: "0.8em" }}>
        <BattingComponent
          battingScoreCard={inningsConfig.battingScoreCard}
          battingTeam={inningsConfig.battingTeam}
          allDeliveries={inningsConfig.allDeliveries}
        />

        <BowlingComponent
          bowlingScoreCard={inningsConfig.bowlingScoreCard}
        />
      </div>

    </div>
  )
}

function BattingComponent({ battingScoreCard, battingTeam, allDeliveries }) {

  const battingCardBatsmanPlayerName = [...battingScoreCard].map(player => player.playerName);
  const selectedBattingTeam = battingTeam.teamMembers;

  const remainingPlayers = selectedBattingTeam?.filter(player => !battingCardBatsmanPlayerName.includes(player)) || [];

  const totalRuns = addRuns(allDeliveries);
  const totalWickets = wicketsCounter(allDeliveries);


  return (
    <>
      {/* batting-card display */}
      <h2 style={{ textAlignLast: "left" }}>Batting Scorecard</h2>

      {/* batting-card header component */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr", borderBottom: "3px solid whitesmoke", }}>
        <span style={{ margin: "2px 0px", textAlign: "left" }}>Player</span>
        <span style={{ margin: "2px 0px", }}>Runs</span>
        <span style={{ margin: "2px 0px", }}>4s</span>
        <span style={{ margin: "2px 0px", }}>6s</span>
        <span style={{ margin: "2px 0px", }}>SR</span>
      </div>

      <div>
        {
          battingScoreCard?.map((player, id) => {

            const convertData = countOccurrences(player.runs)
            const arrayDisplay = Object.keys(convertData);

            return (
              <div key={id} style={{ fontSize: "0.9em", borderBottom: "1px solid whitesmoke", }}>
                <details style={{ textAlign: "left", }} open={player.totalRuns > 50 ? true : false}>
                  <summary style={{ padding: "0.7em 0.35em", display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr", alignItems: "center", backgroundColor: player.totalRuns > 50 ? "#5f5d5dff" : "" }}>
                    <span style={{ textAlign: "left", }}>{player.playerName}{player.status === "not out" ? <strong>*</strong> : ""}</span>
                    <span style={{ textAlign: "right", }}>{player.totalRuns} ({player.runs.length})</span>
                    <span style={{ textAlign: "center", }}>{player.fours}</span>
                    <span style={{ textAlign: "center", }}>{player.sixes}</span>
                    <span style={{ textAlign: "center", }}>{player.strikeRate}</span>
                  </summary>
                  <p style={{ margin: "0em 0.7em", color: "#ccc", fontSize: "0.9em", }}>{player.status === "not out" ? "" : player.status}</p>

                  <div style={{ margin: "0em 0.7em", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                    {
                      arrayDisplay
                        .filter((data) => data !== "5")
                        .map((data, id) => {
                          return (
                            <div key={id} style={{ borderLeft: "3px solid #ccc", borderRight: "3px solid #ccc", padding: "0em 1.3em", borderRadius: "1em" }}>
                              <span style={{ fontWeight: "600" }}>{data}s</span> <br />
                              <span>{convertData[data]}</span>
                            </div>
                          )
                        })
                    }
                  </div>

                </details>
              </div>
            )
          }
          )
        }
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.45em", margin: "1em 0em", fontWeight: "700" }}>
        <p>Total Score</p>
        <p>
          <span>{totalRuns}</span> / <span>{totalWickets}</span>
        </p>
      </div>

      {/* remaining team members */}
      <div style={{ textAlign: "left", margin: "1em 0em" }}>
        <p style={{ fontWeight: "bold", fontSize: "1.1em", }}><em>Yet to Bat</em></p>
        <div style={{ display: "flex", fontSize: "0.95em", flexWrap: "wrap", }}>
          {
            remainingPlayers?.map((player, id) => {
              return (
                <p key={id}>{player},&nbsp;</p>
              )
            })
          }
        </div>
      </div>

    </>
  )
};

function BowlingComponent({ bowlingScoreCard }) {

  return (
    <>
      {/* bowling-card display */}
      <h2 style={{ textAlignLast: "left" }}>Bowling Scorecard</h2>

      {/* bowling-card header component */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr", borderBottom: "3px solid whitesmoke", }}>
        <span style={{ margin: "2px 0px", textAlign: "left" }}>Player</span>
        <span style={{ margin: "2px 0px", }}>O</span>
        <span style={{ margin: "2px 0px", }}>R</span>
        <span style={{ margin: "2px 0px", }}>W</span>
        <span style={{ margin: "2px 0px", }}>M</span>
        <span style={{ margin: "2px 0px", }}>Econ</span>
      </div>

      <div>
        {
          bowlingScoreCard?.map((player, id) => {

            const ballsDelivered = player.runs.length;
            const oversCount = `${Math.trunc(ballsDelivered / 6)}`;
            const remainingBalls = ballsDelivered - (oversCount * 6)
            const totalRuns = addRuns(player.runs);
            const wickets = player.runs.filter(run => typeof run === "string").length;
            const economy = (totalRuns / `${oversCount}.${remainingBalls}`).toFixed(2);

            const convertToChartData = convertToBowlerChartData(player.bowlerOvers);

            return (
              <details key={id} style={{ fontSize: "0.9em", borderBottom: "1px solid whitesmoke", }}>

                <summary style={{ padding: "0.7em 0.35em", display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr", }}>
                  <span style={{ textAlign: "left" }}>{player.playerName}</span>
                  <span style={{ textAlign: "center" }}>{oversCount}.{remainingBalls}</span>
                  <span style={{ textAlign: "center" }}>{totalRuns}</span>
                  <span style={{ textAlign: "center" }}>{wickets}</span>
                  <span style={{ textAlign: "center" }}>{player.maidens}</span>
                  <span style={{ textAlign: "center" }}>{economy}</span>
                </summary>

                <StackedBarChart data={convertToChartData} />

              </details>
            )
          })
        }
      </div>

    </>
  )
};