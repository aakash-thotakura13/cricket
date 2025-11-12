import { useAtom } from "jotai"
import { inningsOneBattingScoreCard, inningsOneBowlingScoreCard } from "../jotai/atom"
import addRuns from "../function/addRuns";
import { countOccurrences } from "../function/countOccurrences";
import { StackedBarChart } from "../components/chart";
import { convertToBowlerChartData } from "../function/convertToBowlerChartData";


export const ScoreCard = () => {

  const [_inningsOneBattingScoreCard, setInningsOneBattingScoreCard] = useAtom(inningsOneBattingScoreCard);
  const [_inningsOneBowlingScoreCard, setInningsOneBowlingScoreCard] = useAtom(inningsOneBowlingScoreCard);


  return (
    <div>
      <h2>Scorecard</h2>

      <div style={{ fontSize: "0.85em", }}>

        <p style={{ cursor: "pointer", listStyle: "none", textAlign: "left", fontSize: "1.5em", backgroundColor: "grey", padding: "0.35em 0.7em", borderRadius: "1em", fontWeight: "bold", }}>Innings One</p>

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
            _inningsOneBattingScoreCard?.map((player, id) => {

              const convertData = countOccurrences(player.runs)
              const arrayDisplay = Object.keys(convertData);

              return (
                <div key={id} style={{ fontSize: "0.9em", borderBottom: "1px solid whitesmoke", }}>
                  <details style={{ textAlign: "left", }} open={player.totalRuns > 50 ? true : false}>
                    <summary style={{ padding: "0.7em", display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr", alignItems: "center", backgroundColor: player.totalRuns > 50 ? "#7e7e7eff" : "" }}>
                      <span>{player.playerName} {player.status === "not out" ? <strong>*</strong> : ""}</span>
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
            _inningsOneBowlingScoreCard?.map((player, id) => {

              const ballsDelivered = player.runs.length;
              const oversCount = `${Math.trunc(ballsDelivered / 6)}`;
              const remainingBalls = ballsDelivered - (oversCount * 6)
              const runsConceded = addRuns(player.runs);
              const wickets = player.runs.filter(run => typeof run === "string").length;
              const economy = (runsConceded / oversCount).toFixed(2);

              const convertToChartData = convertToBowlerChartData(player.bowlerOvers);

              return (
                <details key={id} style={{ fontSize: "0.9em", borderBottom: "1px solid whitesmoke", }}>

                  <summary style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr", }}>
                    <span style={{ margin: "0.7em 0em", textAlign: "left" }}>{player.playerName}</span>
                    <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{oversCount}.{remainingBalls}</span>
                    <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{runsConceded}</span>
                    <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{wickets}</span>
                    <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{player.maidens}</span>
                    <span style={{ margin: "0.7em 0em", textAlign: "center" }}>{economy}</span>
                  </summary>

                  <StackedBarChart data={convertToChartData} />

                </details>
              )
            })
          }
        </div>

      </div>

    </div>
  )
}