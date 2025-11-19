import { useMemo, useState } from "react";
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
};


function BattingComponent({ battingScoreCard, battingTeam, allDeliveries }) {

  const battingNames = battingScoreCard?.map(p => p.playerName);
  const remainingPlayers =
    battingTeam.teamMembers?.filter(name => !battingNames.includes(name)) || [];


  const totalRuns = useMemo(
    () => addRuns(allDeliveries),
    [allDeliveries]
  );

  const totalWickets = useMemo(
    () => wicketsCounter(allDeliveries),
    [allDeliveries]
  );

  return (
    <>
      <h2 style={{ textAlignLast: "left" }}>Batting Scorecard</h2>

      <BattingHeader />

      <div>
        {battingScoreCard.map((player, idx) => (
          <BattingRow key={idx} player={player} />
        ))}
      </div>

      <TotalScore totalRuns={totalRuns} totalWickets={totalWickets} />

      <YetToBat players={remainingPlayers} />
    </>
  );
}

const BattingHeader = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr",
        borderBottom: "3px solid whitesmoke",
      }}>
      <span style={{ margin: "2px 0px", textAlign: "left" }}>Player</span>
      <span style={{ margin: "2px 0px", }}>Runs</span>
      <span style={{ margin: "2px 0px", }}>4s</span>
      <span style={{ margin: "2px 0px", }}>6s</span>
      <span style={{ margin: "2px 0px", }}>SR</span>
    </div>
  )
}

const BattingRow = ({ player }) => {
  const convertedData = useMemo(
    () => countOccurrences(player.runs),
    [player.runs]
  );

  const shotTypes = Object.keys(convertedData).filter(r => r !== 5);

  return (
    <div style={{ fontSize: "0.9em", borderbottom: "1px solit whitesmoke", }}>
      <details
        open={player.totalRuns > 50}
        style={{
          fontSize: "0.9em",
          borderBottom: "1px solid whitesmoke",
          padding: "0.3em 0"
        }}>
        <summary
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr",
            padding: "0.7em 0.35em",
            backgroundColor: player.totalRuns > 50 ? "#3c3c3ccc" : "#1c1c1c",
            borderRadius: "6px",
          }}>
          <span style={{ textAlign: "left", }}>
            {player.playerName} &nbsp;
            {player.status === "not out" && <strong>*</strong>}
          </span>
          <span>{player.totalRuns} ({player.runs.length})</span>
          <span>{player.fours}</span>
          <span>{player.sixes}</span>
          <span>{isNaN(player.strikeRate) ? "0.00" : player.strikeRate}</span>
        </summary>

        <div className="details-content" style={{ padding: "0.75em 0.5em" }}>
          {/* OUT info */}
          {
            player.status !== "not out" && (
              <p style={{ color: "#ccc", fontSize: "0.9em" }}>
                {player.status}
              </p>
            )
          }
        </div>

        {/* shots breakdown */}
        <div
          style={{
            marginTop: "0.4em",
            display: "flex",
            justifyContent: "space-around",
          }}>
          {shotTypes.map((runType, id) => (
            <div
              key={id}
              style={{
                borderLeft: "2px solid #ccc",
                borderRight: "2px solid #ccc",
                padding: "0em 1.2em",
                borderRadius: "1em",
              }}>
              <span style={{ fontWeight: "600" }}>{runType}s</span> <br />
              <span>{convertedData[runType]}</span>
            </div>
          ))}
        </div>

      </details>
    </div>
  )
};

const TotalScore = ({ totalRuns, totalWickets }) => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.45em",
    margin: "1em 0em",
    fontWeight: "700"
  }}>
    <p>Total Score</p>
    <p>{totalRuns} / {totalWickets}</p>
  </div>
);

const YetToBat = ({ players }) => (
  <div style={{ textAlign: "left", margin: "1em 0em" }}>
    <p style={{ fontWeight: "bold", fontSize: "1.1em" }}><em>Yet to Bat</em></p>
    <div style={{ display: "flex", flexWrap: "wrap", fontSize: "0.95em" }}>
      {players.map((p, idx) => (
        <p key={idx}>{p},&nbsp;</p>
      ))}
    </div>
  </div>
);



function BowlingComponent({ bowlingScoreCard }) {

  return (
    <>
      <h2 style={{ textAlignLast: "left" }}>Bowling Scorecard</h2>

      <BowlingHeader />

      <div>
        {bowlingScoreCard?.map((player, idx) => (
          <BowlingRow key={idx} player={player} />
        ))}
      </div>
    </>
  );
}


const BowlingRow = ({ player }) => {

  const { overs, remaining, runs, wickets, economy } = useMemo(() => {
    const balls = player.runs.length;
    const overs = Math.floor(balls / 6);
    const remaining = balls % 6;
    const runs = addRuns(player.runs);
    const wickets = player.runs.filter(r => typeof r === "string").length;
    const totalOvers = overs + remaining / 6;
    const economy = totalOvers === 0 ? "0.00" : (runs / totalOvers).toFixed(2);


    return { overs, remaining, runs, wickets, economy };
  }, [player.runs]);

  const chartData = useMemo(
    () => convertToBowlerChartData(player.bowlerOvers),
    [player.bowlerOvers]
  );

  return (
    <details style={{ fontSize: "0.9em", borderBottom: "1px solid whitesmoke" }}>
      <summary style={{
        padding: "0.7em 0.35em",
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr",
      }}>
        <span style={{ textAlign: "left" }}>{player.playerName}</span>
        <span style={{ textAlign: "center" }}>{overs}.{remaining}</span>
        <span style={{ textAlign: "center" }}>{runs}</span>
        <span style={{ textAlign: "center" }}>{wickets}</span>
        <span style={{ textAlign: "center" }}>{player.maidens}</span>
        <span style={{ textAlign: "center" }}>{economy}</span>
      </summary>

      <StackedBarChart data={chartData} />
    </details>
  );
};


const BowlingHeader = () => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr",
    borderBottom: "3px solid whitesmoke"
  }}>
    <span style={{ textAlign: "left" }}>Player</span>
    <span>O</span>
    <span>R</span>
    <span>W</span>
    <span>M</span>
    <span>Econ</span>
  </div>
);
