import { useAtom } from "jotai"
import { inningsOneBattingScoreCard, inningsOneBowlingScoreCard } from "../jotai/atom"
import addRuns from "../function/addRuns";


export const ScoreCard = () => {

  const [_inningsOneBattingScoreCard, setInningsOneBattingScoreCard] = useAtom(inningsOneBattingScoreCard);
  const [_inningsOneBowlingScoreCard, setInningsOneBowlingScoreCard] = useAtom(inningsOneBowlingScoreCard);

  // console.clear();
  // console.log(..._inningsOneBattingScoreCard);
  // console.log(..._inningsOneBowlingScoreCard);


  return (
    <div>
      <h2>Scorecard</h2>

      <div style={{ fontSize: "0.8em", }}>

        <p style={{ cursor: "pointer", listStyle: "none", textAlign: "left", fontSize: "1.5em", backgroundColor: "grey", padding: "0.35em 0.7em", borderRadius: "1em", fontWeight: "bold", }}>Innings One</p>

        <h2 style={{ textAlignLast: "left" }}>Batting Scorecard</h2>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr", borderBottom: "3px solid whitesmoke", }}>
          <span style={{ margin: "2px 0px", textAlign: "left" }}>Player</span>
          <span style={{ margin: "2px 0px", }}>Runs</span>
          <span style={{ margin: "2px 0px", }}>4s</span>
          <span style={{ margin: "2px 0px", }}>6s</span>
          <span style={{ margin: "2px 0px", }}>SR</span>
        </div>

        <div>
          {
            _inningsOneBattingScoreCard?.map((player, id) => {

              return (
                <div key={id} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr", fontSize: "0.9em", borderBottom: "1px solid whitesmoke", }}>
                  <details style={{ margin: "0.7em 0em", textAlign: "left", }}>
                    <summary>{player.playerName}</summary>
                    <p>{player.bowler}</p>
                  </details>
                  <span style={{ margin: "0.7em 0em", textAlign: "right", }}>{player.totalRuns} ({player.runs.length})</span>
                  <span style={{ margin: "0.7em 0em", textAlign: "center", }}>{player.fours}</span>
                  <span style={{ margin: "0.7em 0em", textAlign: "center", }}>{player.sixes}</span>
                  <span style={{ margin: "0.7em 0em", textAlign: "center", }}>{player.strikeRate}</span>
                </div>
              )
            }
            )
          }
        </div>


        <h2 style={{ textAlignLast: "left" }}>Bowling Scorecard</h2>

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
            _inningsOneBowlingScoreCard?.map((player, id) => {

              const ballsDelivered = player.runs.length;
              const oversCount = `${Math.trunc(ballsDelivered / 6)}`;
              const remainingBalls = ballsDelivered - (oversCount * 6)
              const runsConceded = addRuns(player.runs);
              const wickets = player.runs.filter(run => typeof run === "string").length;
              const economy = (runsConceded / oversCount).toFixed(2);

              return (
                <div key={id} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr", fontSize: "0.9em", borderBottom: "1px solid whitesmoke", }}>
                  <span style={{ margin: "0.7em 0em", textAlign: "left" }}>{player.playerName}</span>
                  <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{oversCount}.{remainingBalls}</span>
                  <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{runsConceded}</span>
                  <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{wickets}</span>
                  <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{player.maidens}</span>
                  <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{economy}</span>
                </div>
              )
            }
            )
          }
        </div>

      </div>

    </div>
  )
}